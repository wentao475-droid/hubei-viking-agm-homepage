import { randomUUID, createHash } from "node:crypto";
import path from "node:path";
import { Worker } from "node:worker_threads";
import { fail, identityKeys, leadFields, validateLead } from "./crm-store.js";

export async function parseLeadFile(file) {
  if (!file) fail("请选择文件");
  const extension = path.extname(file.originalname).toLowerCase();
  if (![".xlsx", ".csv"].includes(extension)) fail("只支持 .xlsx 和 UTF-8 CSV；.xls 请先另存为 .xlsx");
  if (file.size > 5 * 1024 * 1024) fail("文件不能超过 5 MiB", 413);
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./crm-import-worker.js", import.meta.url), {
      workerData: { buffer: file.buffer, extension }, resourceLimits: { maxOldGenerationSizeMb: 96 }
    });
    const timer = setTimeout(() => { worker.terminate(); reject(Object.assign(new Error("表格解析超时，请缩小文件后重试"), { status: 400 })); }, 10000);
    worker.once("message", (result) => {
      clearTimeout(timer); worker.terminate();
      if (result.error) reject(Object.assign(new Error(result.error), { status: 400 }));
      else resolve(result.sheets);
    });
    worker.once("error", () => { clearTimeout(timer); reject(Object.assign(new Error("文件无法解析或超过内存限制"), { status: 400 })); });
    worker.once("exit", (code) => { clearTimeout(timer); if (code !== 0) reject(Object.assign(new Error("文件解析已中止"), { status: 400 })); });
  });
}

const aliases = {
  姓名: "name", 联系人: "name", 名称: "name", name: "name", company: "company",
  国家地区: "country", 电话号码: "phone", 手机: "phone", 手机号: "phone",
  微信: "wechat", 来源: "source_channel", 渠道: "source_channel", source: "source_channel",
  需求: "message", 留言: "message", message: "message", 线索等级: "lead_grade",
  grade: "lead_grade", 备注: "initial_follow_up", 跟进内容: "initial_follow_up", notes: "initial_follow_up"
};
export function guessMapping(header) {
  return header.map((value) => Object.keys(leadFields).find((key) => key === value.trim().toLowerCase() || leadFields[key] === value.trim()) || aliases[value.trim().toLowerCase()] || "");
}

export class CrmImports {
  constructor(store) { this.store = store; this.db = store.db; }
  cleanup() {
    this.db.prepare("UPDATE crm_import_batches SET status = 'expired', sheets_json = NULL, preview_json = NULL WHERE status = 'draft' AND expires_at <= ?").run(new Date().toISOString());
  }
  get(id, actor, draft = true) {
    this.cleanup();
    const batch = this.db.prepare("SELECT * FROM crm_import_batches WHERE id = ? AND actor = ?").get(id, actor);
    if (!batch) fail("导入批次不存在", 404);
    if (draft && batch.status !== "draft") fail("导入草稿已失效，请重新上传", 410);
    return batch;
  }
  stage(filename, sheets, actor) {
    this.cleanup();
    if (this.db.prepare("SELECT count(*) n FROM crm_import_batches WHERE status = 'draft' AND actor = ?").get(actor).n >= 5) fail("最多同时保留 5 个导入草稿，请取消旧草稿", 429);
    const id = randomUUID(), now = Date.now();
    this.db.prepare("INSERT INTO crm_import_batches(id, actor, filename, sheets_json, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)")
      .run(id, actor, filename, JSON.stringify(sheets), new Date(now).toISOString(), new Date(now + 30 * 60000).toISOString());
    return { id, sheets: sheets.map((sheet, index) => ({ index, name: sheet.sheet, headers: sheet.data[0], count: sheet.data.length - 1, mapping: guessMapping(sheet.data[0]) })) };
  }
  build(batch, config) {
    const sheets = JSON.parse(batch.sheets_json);
    const sheet = sheets[config.sheet];
    if (!sheet) fail("请选择有效工作表");
    if (!Array.isArray(config.mapping) || config.mapping.length !== sheet.data[0].length || config.mapping.some((key) => key && !Object.hasOwn(leadFields, key))) fail("字段映射无效");
    const mapped = config.mapping.filter(Boolean);
    if (new Set(mapped).size !== mapped.length) fail("同一个字段不能映射到多列");
    const index = new Map();
    const add = (lead, reference) => { for (const key of identityKeys(lead)) { if (!index.has(key)) index.set(key, []); index.get(key).push(reference); } };
    for (const row of this.db.prepare("SELECT id, name, email, phone, wechat, whatsapp, contact FROM inquiries").all()) add(row, { id: row.id, name: row.name });
    const rows = sheet.data.slice(1).map((cells, offset) => {
      const rowNumber = offset + 2;
      const input = Object.fromEntries(config.mapping.flatMap((key, i) => key ? [[key, cells[i] ?? ""]] : []));
      if (!cells.some((cell) => cell.trim())) return { row: rowNumber, status: "empty", input };
      if (cells.length > config.mapping.length && cells.slice(config.mapping.length).some((cell) => cell.trim())) return { row: rowNumber, status: "error", input, error: "数据列超出表头范围，请补齐表头后重试" };
      if (!input.source_channel) input.source_channel = config.default_channel || "";
      if (!input.source_detail) input.source_detail = config.default_detail || "";
      try {
        const lead = validateLead(input);
        const duplicates = [...new Map(identityKeys(lead).flatMap((key) => index.get(key) || []).map((r) => [r.id ? `id:${r.id}` : `row:${r.row}`, r])).values()];
        add(lead, { row: rowNumber, name: lead.name });
        return { row: rowNumber, status: duplicates.length ? "duplicate" : "valid", lead, duplicates };
      } catch (error) { return { row: rowNumber, status: "error", input, error: error.message }; }
    });
    const token = createHash("sha256").update(JSON.stringify({ config, rows })).digest("hex");
    const counts = { valid: 0, duplicate: 0, error: 0, empty: 0 };
    rows.forEach((row) => counts[row.status]++);
    return { config, rows, counts, token };
  }
  preview(id, config, actor) {
    const batch = this.get(id, actor);
    const preview = this.build(batch, config);
    this.db.prepare("UPDATE crm_import_batches SET preview_json = ? WHERE id = ?").run(JSON.stringify(preview), id);
    return preview;
  }
  confirm(id, input, actor) {
    return this.db.transaction(() => {
      const batch = this.get(id, actor, false);
      if (batch.status === "completed") return JSON.parse(batch.result_json);
      if (batch.status !== "draft" || !batch.preview_json) fail("请重新预览导入", 410);
      const saved = JSON.parse(batch.preview_json);
      const fresh = this.build(batch, saved.config);
      if (input.token !== saved.token || fresh.token !== saved.token) fail("数据或重复项已变化，请重新预览后确认", 409, { code: "preview_changed" });
      if (!Array.isArray(input.include_rows) || !Array.isArray(input.allow_duplicate_rows)) fail("导入选择无效");
      const selected = new Set(input.include_rows), allowed = new Set(input.allow_duplicate_rows);
      if ([...selected].some((row) => !Number.isInteger(row) || !fresh.rows.some((r) => r.row === row && ["valid", "duplicate"].includes(r.status)))) fail("不能导入错误或不存在的行");
      const ids = [];
      for (const row of fresh.rows) {
        if (!selected.has(row.row)) continue;
        if (row.status === "duplicate" && !allowed.has(row.row)) fail(`第 ${row.row} 行需要确认作为新需求新增`);
        ids.push(this.store.create(row.lead, actor, "import", id).id);
      }
      const result = { ok: true, batch_id: id, imported: ids.length, skipped: fresh.rows.length - ids.length, ids };
      this.db.prepare("UPDATE crm_import_batches SET status = 'completed', sheets_json = NULL, preview_json = NULL, result_json = ? WHERE id = ?").run(JSON.stringify(result), id);
      return result;
    }).immediate();
  }
  cancel(id, actor) {
    const batch = this.get(id, actor, false);
    if (batch.status === "completed") fail("已完成的导入不能取消", 409);
    this.db.prepare("UPDATE crm_import_batches SET status = 'cancelled', sheets_json = NULL, preview_json = NULL WHERE id = ?").run(id);
  }
}
