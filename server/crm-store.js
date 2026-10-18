import { createMessageFingerprint, normalizeContactIdentity } from "./inquiry-classifier.js";
import { defaultLeadGrade, gradeSchemaVersion } from "./lead-grades.js";

export const channels = {
  website: "官网", wechat: "微信", whatsapp: "WhatsApp", email: "邮件",
  linkedin: "LinkedIn", tiktok: "TikTok", exhibition: "展会",
  b2b: "B2B 平台", referral: "转介绍", other: "其他"
};
export const leadFields = {
  name: "姓名/线索名称", company: "公司", country: "国家", email: "邮箱",
  phone: "电话", wechat: "微信号", whatsapp: "WhatsApp", contact: "其他联系方式",
  source_channel: "来源渠道", source_detail: "来源说明", message: "需求内容",
  interested_product: "产品", application: "应用", lead_grade: "等级",
  first_contact_at: "首次联系时间", next_follow_up_at: "下次跟进时间",
  next_action: "下一步", initial_follow_up: "初始跟进内容", follow_up_at: "初始沟通时间"
};

export function fail(message, status = 400, extra = {}) {
  throw Object.assign(new Error(message), { status, ...extra });
}

// Unzoned CRM dates are Shanghai wall time. SQLite and API dates are stored in UTC.
export function crmDate(value, field = "时间") {
  if (value == null || value === "") return null;
  if (value instanceof Date) value = value.toISOString().slice(0, 19);
  const text = String(value).trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})?)?$/);
  if (!match) fail(`${field}格式错误，请使用 YYYY-MM-DD HH:mm（上海时间）`);
  const [, y, m, d, h = "00", min = "00", s = "00", zone = "+08:00"] = match;
  const calendar = new Date(`${y}-${m}-${d}T${h}:${min}:${s}Z`);
  if (!Number.isFinite(calendar.getTime()) || calendar.toISOString().slice(0, 19) !== `${y}-${m}-${d}T${h}:${min}:${s}`) fail(`${field}不是有效日期`);
  const date = new Date(`${y}-${m}-${d}T${h}:${min}:${s}${zone}`);
  if (!Number.isFinite(date.getTime())) fail(`${field}不是有效日期`);
  return date.toISOString();
}

function textValue(input, key, max = 500) {
  const text = String(input[key] ?? "").replace(/\u0000/g, "").trim();
  if (text.length > max) fail(`${leadFields[key] || key}不能超过 ${max} 字符`);
  return text;
}

export function validateLead(input) {
  const result = {};
  for (const key of Object.keys(leadFields)) {
    if (!key.endsWith("_at")) result[key] = textValue(input, key, ["message", "initial_follow_up"].includes(key) ? 5000 : 500);
  }
  for (const key of ["first_contact_at", "next_follow_up_at", "follow_up_at"]) result[key] = crmDate(input[key], leadFields[key]);
  if (!result.name) fail("请填写姓名/线索名称");
  if (![result.contact, result.email, result.phone, result.wechat, result.whatsapp].some(Boolean)) fail("请至少填写一种联系方式");
  if (result.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) fail("邮箱格式错误");
  const channel = result.source_channel;
  result.source_channel = Object.keys(channels).find((key) => key === channel.toLowerCase() || channels[key] === channel);
  if (!result.source_channel) fail("请选择有效来源渠道");
  if (result.source_channel === "other" && !result.source_detail) fail("其他渠道需要填写来源说明");
  result.lead_grade = (result.lead_grade || defaultLeadGrade).toUpperCase();
  if (!/^[ABCDE]$/.test(result.lead_grade)) fail("等级必须为 A、B、C、D 或 E");
  if (result.follow_up_at && !result.initial_follow_up) fail("填写初始沟通时间时需要填写初始跟进内容");
  return result;
}

export function identityKeys(row) {
  const keys = new Set();
  const email = String(row.email || "").trim().toLowerCase();
  if (email) keys.add(`email:${email}`);
  for (const value of [row.phone, row.whatsapp]) {
    const phone = String(value || "").replace(/\D/g, "");
    if (phone.length >= 7) keys.add(`phone:${phone}`);
  }
  if (row.wechat) keys.add(`wechat:${String(row.wechat).normalize("NFKC").trim().toLowerCase()}`);
  const contact = String(row.contact || "").normalize("NFKC").trim().toLowerCase();
  const emailMatch = contact.match(/[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}/);
  if (emailMatch) keys.add(`email:${emailMatch[0]}`);
  else if (/^[+\d\s().-]+$/.test(contact) && contact.replace(/\D/g, "").length >= 7) keys.add(`phone:${contact.replace(/\D/g, "")}`);
  else if (contact) keys.add(`contact:${contact}`);
  return [...keys];
}

export function migrateCrm(db) {
  db.transaction(() => {
    const existing = new Set(db.prepare("PRAGMA table_info(inquiries)").all().map((row) => row.name));
    for (const [key, type] of Object.entries({
      source_channel: "TEXT NOT NULL DEFAULT 'website'", source_detail: "TEXT NOT NULL DEFAULT ''",
      record_origin: "TEXT NOT NULL DEFAULT 'website'", phone: "TEXT NOT NULL DEFAULT ''",
      wechat: "TEXT NOT NULL DEFAULT ''", whatsapp: "TEXT NOT NULL DEFAULT ''",
      first_contact_at: "TEXT", next_action: "TEXT NOT NULL DEFAULT ''", import_batch_id: "TEXT",
      version: "INTEGER NOT NULL DEFAULT 0"
    })) if (!existing.has(key)) db.exec(`ALTER TABLE inquiries ADD COLUMN ${key} ${type}`);
    db.exec(`
      CREATE TABLE IF NOT EXISTS crm_activities (
        id INTEGER PRIMARY KEY, inquiry_id INTEGER NOT NULL REFERENCES inquiries(id),
        kind TEXT NOT NULL, happened_at TEXT, recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        method TEXT NOT NULL DEFAULT '', content TEXT NOT NULL, next_action TEXT,
        next_follow_up_at TEXT, lead_grade TEXT, actor TEXT NOT NULL, changes_json TEXT
      );
      CREATE UNIQUE INDEX IF NOT EXISTS crm_legacy_note_once ON crm_activities(inquiry_id) WHERE kind = 'legacy_note';
      CREATE INDEX IF NOT EXISTS crm_activity_lead ON crm_activities(inquiry_id, happened_at, id);
      CREATE INDEX IF NOT EXISTS crm_channel ON inquiries(source_channel, next_follow_up_at);
      CREATE TABLE IF NOT EXISTS crm_import_batches (
        id TEXT PRIMARY KEY, actor TEXT NOT NULL, filename TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft',
        sheets_json TEXT, preview_json TEXT, result_json TEXT, created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      );
    `);
    const migration = "20261018_crm_dates_v1";
    if (!db.prepare("SELECT 1 FROM schema_migrations WHERE name = ?").get(migration)) {
      db.exec(`INSERT OR IGNORE INTO crm_activities (inquiry_id, kind, content, actor)
        SELECT id, 'legacy_note', notes, '历史记录' FROM inquiries WHERE trim(COALESCE(notes, '')) <> '';`);
      for (const row of db.prepare("SELECT id, next_follow_up_at FROM inquiries WHERE next_follow_up_at IS NOT NULL").all()) {
        try { db.prepare("UPDATE inquiries SET next_follow_up_at = ? WHERE id = ?").run(crmDate(row.next_follow_up_at), row.id); }
        catch { /* Preserve unparseable legacy values for manual correction. */ }
      }
      db.prepare("INSERT INTO schema_migrations(name) VALUES (?)").run(migration);
    }
  })();
}

export class CrmStore {
  constructor(db) { this.db = db; }
  get(id) {
    const row = this.db.prepare(`SELECT *, (SELECT max(happened_at) FROM crm_activities WHERE inquiry_id = inquiries.id AND kind = 'communication') AS last_follow_up_at FROM inquiries WHERE id = ?`).get(id);
    if (!row) fail("线索不存在", 404);
    return row;
  }
  activities(id) {
    return this.db.prepare("SELECT * FROM crm_activities WHERE inquiry_id = ? ORDER BY happened_at IS NULL, datetime(COALESCE(happened_at, recorded_at)) DESC, id DESC").all(id);
  }
  checkVersion(row, version, required = true) {
    if ((required || version != null) && (!Number.isInteger(version) || row.version !== version)) fail("此线索已更新，请重新打开后再保存", 409, { code: "stale_version" });
  }
  activity(id, actor, data) {
    this.db.prepare(`INSERT INTO crm_activities (inquiry_id, kind, happened_at, method, content, next_action, next_follow_up_at, lead_grade, actor, changes_json, grade_schema_version)
      VALUES (@id, @kind, @happened_at, @method, @content, @next_action, @next_follow_up_at, @lead_grade, @actor, @changes_json, @grade_schema_version)`).run({
      id, actor, kind: "update", happened_at: new Date().toISOString(), method: "", content: "资料更新",
      next_action: null, next_follow_up_at: null, lead_grade: null, changes_json: null, grade_schema_version: gradeSchemaVersion, ...data
    });
  }
  duplicates(lead, excludeId = null) {
    const keys = new Set(identityKeys(lead));
    return this.db.prepare("SELECT id, name, company, email, contact, phone, wechat, whatsapp FROM inquiries").all()
      .filter((row) => row.id !== excludeId && identityKeys(row).some((key) => keys.has(key)))
      .map(({ id, name, company }) => ({ id, name, company }));
  }
  create(lead, actor, origin = "manual", batch = null) {
    const contact = lead.contact || lead.email || lead.phone || lead.whatsapp || lead.wechat;
    const columns = ["name", "company", "country", "email", "phone", "wechat", "whatsapp", "source_channel", "source_detail", "message", "interested_product", "application", "lead_grade", "first_contact_at", "next_follow_up_at", "next_action"];
    const values = Object.fromEntries(columns.map((key) => [key, lead[key]]));
    const result = this.db.prepare(`INSERT INTO inquiries (${columns.join(",")}, contact, record_origin, import_batch_id, classification_source, classification_reason, classified_at, contact_identity, message_fingerprint, notification_status, email_notification_status, feishu_notification_status)
      VALUES (${columns.map((key) => `@${key}`).join(",")}, @contact, @origin, @batch, 'manual', @reason, CURRENT_TIMESTAMP, @identity, @fingerprint, 'skipped', 'skipped', 'skipped')`)
      .run({ ...values, contact, origin, batch, reason: origin === "import" ? "manual_import" : "manual_entry", identity: normalizeContactIdentity({ contact, email: lead.email }), fingerprint: createMessageFingerprint(lead.message) });
    const id = Number(result.lastInsertRowid);
    this.activity(id, actor, { content: origin === "import" ? "表格导入线索" : "手动新增线索", lead_grade: lead.lead_grade, next_action: lead.next_action, next_follow_up_at: lead.next_follow_up_at });
    if (lead.initial_follow_up) this.activity(id, actor, { kind: "communication", happened_at: lead.follow_up_at, method: "历史补录", content: lead.initial_follow_up });
    return this.get(id);
  }
  edit(id, input, actor) {
    return this.db.transaction(() => {
      const old = this.get(id); this.checkVersion(old, input.version);
      const next = validateLead({ ...old, ...input, lead_grade: old.lead_grade, initial_follow_up: "", follow_up_at: null });
      const editable = ["name", "company", "country", "email", "contact", "phone", "wechat", "whatsapp", "first_contact_at", "interested_product", "application"];
      if (old.record_origin !== "website") editable.push("message", "source_channel", "source_detail");
      const changes = Object.fromEntries(editable.filter((key) => old[key] !== next[key]).map((key) => [key, { before: old[key], after: next[key] }]));
      if (Object.keys(changes).length) {
        this.db.prepare(`UPDATE inquiries SET ${editable.map((key) => `${key} = @${key}`).join(",")}, version = version + 1 WHERE id = @id`).run({ ...next, id });
        this.activity(id, actor, { content: "编辑基本资料", changes_json: JSON.stringify(changes) });
      }
      return this.get(id);
    }).immediate();
  }
  followUp(id, input, actor, legacy = false) {
    return this.db.transaction(() => {
      const old = this.get(id); this.checkVersion(old, input.version, !legacy);
      const grade = input.lead_grade ?? old.lead_grade;
      if (!/^[ABCDE]$/.test(grade)) fail("无效等级");
      const nextDate = Object.hasOwn(input, "next_follow_up_at") ? crmDate(input.next_follow_up_at, "下次跟进时间") : old.next_follow_up_at;
      const nextAction = Object.hasOwn(input, "next_action") ? textValue(input, "next_action") : old.next_action;
      const content = textValue(input, "content", 5000);
      const method = textValue(input, "method", 100);
      const communicated = Boolean(content);
      if (!legacy && input.kind !== "plan" && !communicated) fail("请填写跟进内容");
      const changes = { before: { lead_grade: old.lead_grade, next_action: old.next_action, next_follow_up_at: old.next_follow_up_at }, after: { lead_grade: grade, next_action: nextAction, next_follow_up_at: nextDate } };
      this.db.prepare(`UPDATE inquiries SET lead_grade = ?, next_action = ?, next_follow_up_at = ?,
        classification_source = 'manual', classification_reason = CASE WHEN ? = 'E' THEN 'manual_invalid' ELSE 'manual_override' END, classified_at = CURRENT_TIMESTAMP,
        duplicate_of_id = CASE WHEN ? = 'E' THEN duplicate_of_id ELSE NULL END,
        notes = ?, handled_at = COALESCE(handled_at, CURRENT_TIMESTAMP), version = version + 1 WHERE id = ?`)
        .run(grade, nextAction, nextDate, grade, grade, input.notes ?? old.notes, id);
      this.activity(id, actor, {
        kind: communicated ? "communication" : "update", method,
        happened_at: communicated ? crmDate(input.happened_at || new Date().toISOString(), "沟通时间") : new Date().toISOString(),
        content: content || "调整等级或跟进计划", lead_grade: grade,
        next_action: nextAction, next_follow_up_at: nextDate, changes_json: JSON.stringify(changes)
      });
      return this.get(id);
    }).immediate();
  }
  filter(query, includeGrade = true) {
    const terms = [], params = {};
    const grade = query.grade || "work";
    if (includeGrade && grade === "work") terms.push("lead_grade IN ('A','B','C')");
    else if (includeGrade && /^[ABCDE]$/.test(grade)) { terms.push("lead_grade = @grade"); params.grade = grade; }
    if (query.channel && query.channel !== "all") { terms.push("source_channel = @channel"); params.channel = query.channel; }
    if (query.batch) { terms.push("import_batch_id = @batch"); params.batch = query.batch; }
    if (query.q) {
      params.q = `%${query.q}%`;
      terms.push(`(${["name", "contact", "company", "email", "country", "message", "phone", "wechat", "whatsapp", "source_detail", "interested_product", "application", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer", "page_url", "landing_page", "classification_reason", "notes", "next_action"].map((key) => `${key} LIKE @q`).join(" OR ")}
        OR EXISTS (SELECT 1 FROM crm_activities a WHERE a.inquiry_id = inquiries.id AND a.content LIKE @q))`);
    }
    if (["today", "overdue", "unscheduled"].includes(query.follow_up)) {
      terms.push("lead_grade IN ('A','B','C')");
      if (query.follow_up === "unscheduled") terms.push("next_follow_up_at IS NULL");
      if (query.follow_up === "today") terms.push("date(next_follow_up_at, '+8 hours') = date('now', '+8 hours')");
      if (query.follow_up === "overdue") terms.push("datetime(next_follow_up_at) < datetime('now')");
    }
    return { sql: terms.length ? `WHERE ${terms.join(" AND ")}` : "", params };
  }
  list(query, paginate = true) {
    const { sql, params } = this.filter(query);
    const total = this.db.prepare(`SELECT count(*) n FROM inquiries ${sql}`).get(params).n;
    const page = Math.max(1, Math.min(Math.ceil(total / 20) || 1, parseInt(query.page) || 1));
    const order = query.sort === "follow_up" ? "next_follow_up_at IS NULL, datetime(next_follow_up_at), id DESC" : "datetime(created_at) DESC, id DESC";
    const rows = this.db.prepare(`SELECT *, (SELECT max(happened_at) FROM crm_activities a WHERE a.inquiry_id = inquiries.id AND kind = 'communication') AS last_follow_up_at,
      (SELECT content FROM crm_activities a WHERE a.inquiry_id = inquiries.id AND kind = 'communication' ORDER BY datetime(happened_at) DESC, id DESC LIMIT 1) AS latest_follow_up
      FROM inquiries ${sql} ORDER BY ${order} ${paginate ? "LIMIT 20 OFFSET @offset" : ""}`).all(paginate ? { ...params, offset: (page - 1) * 20 } : params);
    const statFilter = this.filter(query, false);
    const stats = { total: 0, today: 0, A: 0, B: 0, C: 0, D: 0, E: 0 };
    for (const row of this.db.prepare(`SELECT lead_grade, count(*) n FROM inquiries ${statFilter.sql} GROUP BY lead_grade`).all(statFilter.params)) stats[row.lead_grade] = row.n;
    stats.total = ["A", "B", "C", "D", "E"].reduce((sum, key) => sum + stats[key], 0);
    stats.today = this.db.prepare(`SELECT count(*) n FROM inquiries ${statFilter.sql}${statFilter.sql ? " AND" : " WHERE"} date(created_at, '+8 hours') = date('now', '+8 hours')`).get(statFilter.params).n;
    return { ok: true, page, pageSize: 20, total, totalPages: Math.max(1, Math.ceil(total / 20)), inquiries: rows, stats };
  }
}

export function csvText(columns, rows) {
  const cell = (value) => {
    const text = String(value ?? "");
    const safe = /^[\s\u0000-\u001f]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text) ? `'${text}` : text;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  return "\uFEFF" + [columns, ...rows.map((row) => columns.map((key) => row[key]))].map((row) => row.map(cell).join(",")).join("\r\n");
}
