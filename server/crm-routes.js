import express from "express";
import multer from "multer";
import { createHash } from "node:crypto";
import { channels, leadFields, CrmStore, csvText, fail, validateLead } from "./crm-store.js";
import { CrmImports, parseLeadFile } from "./crm-import.js";
import { crmClientScript } from "./crm-ui.js";

export function crmRoutes(db, getSession) {
  const router = express.Router(), store = new CrmStore(db), imports = new CrmImports(store);
  imports.cleanup();
  const cleanup = setInterval(() => imports.cleanup(), 60000); cleanup.unref();
  const actor = (req) => getSession(req).username;
  const route = (fn) => (req, res, next) => Promise.resolve().then(() => fn(req, res)).catch(next);
  const write = (req, res, next) => {
    try {
      const origin = req.get("origin") || (req.get("referer") ? new URL(req.get("referer")).origin : "");
      const proto = req.get("x-forwarded-proto") || req.protocol;
      if (origin !== `${proto}://${req.get("host")}`) fail("请求来源无效，请从当前后台页面操作", 403);
      next();
    } catch (error) { next(error); }
  };
  const legacyWrite = (req, res, next) => req.get("origin") || req.get("referer") ? write(req, res, next) : next();
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 0 } }).single("file");
  const sendCsv = (res, filename, columns, rows) => res.set("Content-Disposition", `attachment; filename="${filename}"`).type("text/csv; charset=utf-8").send(csvText(columns, rows));
  const legacyGrades = { won: "A", qualified: "B", sample: "B", quoted: "B", lost: "C", new: "D", contacted: "D", handled: "D" };
  const normalizeGrade = (value) => /^[ABCDE]$/i.test(String(value || "")) ? String(value).toUpperCase() : legacyGrades[String(value || "").toLowerCase()] || "";
  const query = (req) => {
    const value = String(req.query.grade ?? req.query.status ?? "work");
    return { ...req.query, grade: ["work", "all"].includes(value.toLowerCase()) ? value.toLowerCase() : normalizeGrade(value) || "work" };
  };

  router.get("/crm.js", (_req, res) => res.type("application/javascript").send(crmClientScript()));
  router.get("/crm/options", (_req, res) => res.json({ ok: true, channels, fields: leadFields }));
  router.get("/crm/template.csv", (_req, res) => {
    const columns = Object.values(leadFields);
    sendCsv(res, "viking-crm-template.csv", columns, []);
  });
  router.get("/crm/imports", route((req, res) => {
    imports.cleanup();
    res.json({ ok: true, batches: db.prepare("SELECT id, filename, status, result_json, created_at FROM crm_import_batches WHERE actor = ? AND status = 'completed' ORDER BY created_at DESC LIMIT 100").all(actor(req)).map((r) => ({ ...r, result: JSON.parse(r.result_json), result_json: undefined })) });
  }));
  router.post("/crm/imports", write, upload, route(async (req, res) => {
    const sheets = await parseLeadFile(req.file);
    let filename = req.file.originalname;
    if ([...filename].every((c) => c.charCodeAt(0) <= 255)) {
      try { filename = new TextDecoder("utf-8", { fatal: true }).decode(Buffer.from(filename, "latin1")); } catch { /* Preserve genuine non-UTF-8 filenames. */ }
    }
    res.status(201).json({ ok: true, ...imports.stage(filename, sheets, actor(req)) });
  }));
  router.post("/crm/imports/:id/preview", write, route((req, res) => res.json({ ok: true, ...imports.preview(req.params.id, req.body, actor(req)) })));
  router.post("/crm/imports/:id/confirm", write, route((req, res) => res.json(imports.confirm(req.params.id, req.body, actor(req)))));
  router.post("/crm/imports/:id/cancel", write, route((req, res) => { imports.cancel(req.params.id, actor(req)); res.json({ ok: true }); }));
  router.get("/crm/imports/:id/errors.csv", route((req, res) => {
    const batch = imports.get(req.params.id, actor(req));
    if (!batch.preview_json) fail("请先校验预览");
    const rows = JSON.parse(batch.preview_json).rows.filter((r) => r.status === "error").map((r) => ({
      ...Object.fromEntries(Object.entries(leadFields).map(([key, label]) => [label, r.input[key] ?? ""])), 行号: r.row, 错误原因: r.error
    }));
    sendCsv(res, "viking-crm-import-errors.csv", [...Object.values(leadFields), "行号", "错误原因"], rows);
  }));

  router.get("/inquiries", route((req, res) => res.json(store.list(query(req)))));
  router.get("/inquiries.csv", route((req, res) => {
    const rows = store.list(query(req), false).inquiries;
    const columns = ["id", "created_at", "record_origin", "source_channel", "source_detail", "import_batch_id", ...Object.keys(leadFields).filter((k) => !["initial_follow_up", "follow_up_at", "source_channel", "source_detail"].includes(k)), "last_follow_up_at", "latest_follow_up", "notes", "classification_source", "classification_reason", "notification_status", "email_notification_status", "feishu_notification_status", "page_url", "landing_page", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    sendCsv(res, "viking-crm-leads.csv", columns, rows);
  }));
  router.get("/follow-ups.csv", route((req, res) => {
    const filter = store.filter(query(req));
    const rows = db.prepare(`SELECT a.*, inquiries.name, inquiries.company, inquiries.source_channel FROM crm_activities a JOIN inquiries ON inquiries.id = a.inquiry_id WHERE a.inquiry_id IN (SELECT id FROM inquiries ${filter.sql}) ORDER BY a.inquiry_id, a.id`).all(filter.params);
    sendCsv(res, "viking-crm-follow-ups.csv", ["inquiry_id", "name", "company", "source_channel", "kind", "happened_at", "recorded_at", "method", "content", "next_action", "next_follow_up_at", "lead_grade", "actor", "changes_json"], rows);
  }));
  router.post("/inquiries", write, route((req, res) => {
    const inquiry = db.transaction(() => {
      const lead = validateLead(req.body), duplicates = store.duplicates(lead);
      const token = createHash("sha256").update(JSON.stringify({ lead, duplicates })).digest("hex");
      if (duplicates.length && req.body.duplicate_token !== token) fail("发现相同联系方式，请确认是否作为新需求新增", 409, { code: "duplicates", duplicates, duplicate_token: token });
      return store.create(lead, actor(req));
    }).immediate();
    res.status(201).json({ ok: true, inquiry });
  }));
  router.post("/inquiries/bulk-grade", legacyWrite, route((req, res) => {
    const { versions } = req.body;
    const ids = Array.isArray(req.body.ids) ? req.body.ids.map(Number) : [];
    const grade = normalizeGrade(req.body.lead_grade ?? req.body.grade ?? req.body.status);
    if (!ids.length || ids.length > 100 || ids.some((id) => !Number.isSafeInteger(id)) || !grade) fail("请选择有效线索和等级");
    const unique = [...new Set(ids)];
    db.transaction(() => {
      for (const id of unique) {
        const row = store.get(id); store.checkVersion(row, versions?.[id], Boolean(versions));
        store.followUp(id, { kind: "plan", lead_grade: grade, version: row.version }, actor(req));
      }
    }).immediate();
    res.json({ ok: true, updated: unique.length });
  }));
  router.get("/inquiries/:id", route((req, res) => res.json({ ok: true, inquiry: store.get(Number(req.params.id)), activities: store.activities(Number(req.params.id)) })));
  router.get("/inquiries/:id/follow-ups", route((req, res) => { store.get(Number(req.params.id)); res.json({ ok: true, activities: store.activities(Number(req.params.id)) }); }));
  router.post("/inquiries/:id/basic", write, route((req, res) => res.json({ ok: true, inquiry: store.edit(Number(req.params.id), req.body, actor(req)) })));
  router.post("/inquiries/:id/follow-ups", write, route((req, res) => res.json({ ok: true, inquiry: store.followUp(Number(req.params.id), req.body, actor(req)) })));
  // Keep old clients functional; old notes now append to the history as well.
  router.post("/inquiries/:id/update", legacyWrite, route((req, res) => {
    const row = store.get(Number(req.params.id));
    const grade = normalizeGrade(req.body.lead_grade ?? req.body.grade ?? req.body.status);
    if (!grade) fail("无效等级");
    const input = { ...req.body, lead_grade: grade, content: req.body.notes && req.body.notes !== row.notes ? req.body.notes : "", kind: "plan" };
    res.json({ ok: true, inquiry: store.followUp(row.id, input, actor(req), true) });
  }));
  router.post("/inquiries/:id/status", legacyWrite, route((req, res) => {
    const grade = normalizeGrade(req.body.lead_grade ?? req.body.grade ?? req.body.status);
    if (!grade) fail("无效等级");
    res.json({ ok: true, inquiry: store.followUp(Number(req.params.id), { ...req.body, lead_grade: grade, kind: "plan" }, actor(req), true) });
  }));
  router.use((error, _req, res, _next) => {
    if (!error.status && !error.code?.startsWith("LIMIT_")) console.error("CRM request failed:", error);
    const status = error.status || (error.code?.startsWith("LIMIT_") ? 413 : 500);
    const message = error.code?.startsWith("LIMIT_") ? "上传超出限制：仅允许一个文件，大小不超过 5 MiB" : error.message;
    res.status(status).json({ ok: false, error: status === 500 ? "操作失败，请稍后重试" : message, code: error.code, duplicates: error.duplicates, duplicate_token: error.duplicate_token });
  });
  return router;
}
