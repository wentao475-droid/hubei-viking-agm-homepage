import express from "express";
import multer from "multer";
import { createHash, randomUUID } from "node:crypto";
import { crmDate, fail } from "./crm-store.js";
import { readContract } from "./crm-contract-reader.js";

export const orderStatuses = { draft: "待确认", confirmed: "已确认", preparing: "备货中", shipped: "已发货", completed: "已完成", cancelled: "已取消" };
const maxContractSize = 10 * 1024 * 1024;
const text = (value, label, max = 500) => {
  const result = String(value ?? "").trim();
  if (result.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(result)) fail(`${label}无效或过长`);
  return result;
};
const decimal = (value, label, places = 3, zero = false) => {
  const result = String(value ?? "").trim();
  if (!new RegExp(`^\\d{1,10}(?:\\.\\d{1,${places}})?$`).test(result) || (!zero && Number(result) <= 0)) fail(`${label}需要填写${zero ? "非负" : "正"}数，最多 ${places} 位小数`);
  return result;
};
const date = (value, label) => {
  if (!value) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) fail(`${label}请使用 YYYY-MM-DD`);
  crmDate(value, label);
  return value;
};

export function validateOrder(input) {
  const result = {};
  for (const key of ["contract_number", "logistics_company", "tracking_number", "notes"]) result[key] = text(input[key], key, key === "notes" ? 5000 : 100);
  result.status = input.status || "confirmed";
  if (!Object.hasOwn(orderStatuses, result.status)) fail("无效订单状态");
  result.currency = text(input.currency, "币种", 3).toUpperCase();
  if (!/^[A-Z]{3}$/.test(result.currency)) fail("币种请填写三个英文字母，例如 CNY、USD");
  result.amount = decimal(input.amount, "订单金额", 2, true);
  result.delivery_date = date(input.delivery_date, "约定交期");
  result.shipped_date = date(input.shipped_date, "发货日期");
  if (["shipped", "completed"].includes(result.status) && !result.shipped_date) fail("已发货或已完成订单需要填写发货日期");
  if (!Array.isArray(input.items) || !input.items.length || input.items.length > 50) fail("每笔订单需要 1–50 个规格明细");
  result.items = input.items.map((item, index) => {
    const label = `第 ${index + 1} 项`;
    if (!item || !["sheet", "roll"].includes(item.form)) fail(`${label}请选择片材或卷材`);
    const row = { product: text(item.product, `${label}产品`, 200), form: item.form };
    if (!row.product) fail(`${label}请填写产品名称`);
    for (const key of ["length", "width", "thickness", "quantity"]) row[key] = decimal(item[key], `${label}${{ length: "长度", width: "宽度", thickness: "厚度", quantity: "数量" }[key]}`);
    if (!/^\d+$/.test(row.quantity)) fail(`${label}片数或卷数必须为整数`);
    row.unit_price = item.unit_price === "" || item.unit_price == null ? "" : decimal(item.unit_price, `${label}单价`, 4, true);
    return row;
  });
  return result;
}

export const preparationFields = {
  buyer_name: "客户姓名 / 公司名称", buyer_phone: "客户联系电话",
  account_name: "客户付款户名", bank_account: "客户付款账号", bank_name: "客户开户银行",
  delivery_address: "收货地址", recipient: "收货人", recipient_phone: "收货电话"
};
export const invoiceFields = {
  invoice_title: "发票抬头", tax_id: "纳税人识别号", invoice_address: "开票地址",
  invoice_phone: "开票电话", invoice_bank: "开票开户行", invoice_account: "开票银行账号",
  invoice_type: "发票类型", invoice_email: "收票邮箱"
};

function preparationDetails(input, complete) {
  const type = input.signing_type;
  if (!["personal", "company"].includes(type)) fail("请选择签约方式");
  const fields = { ...preparationFields, ...(type === "company" ? invoiceFields : {}) };
  const result = { signing_type: type };
  for (const [key, label] of Object.entries(fields)) result[key] = text(input[key], label);
  if (complete) {
    const required = [...Object.keys(preparationFields), ...(type === "company" ? ["invoice_title", "tax_id"] : [])];
    const missing = required.filter((key) => !result[key]).map((key) => fields[key]);
    if (missing.length) fail("请补齐：" + missing.join("、"));
  }
  return result;
}

export function migrateOrders(db) {
  db.transaction(() => {
    db.exec(`CREATE TABLE IF NOT EXISTS crm_orders (
    id INTEGER PRIMARY KEY, inquiry_id INTEGER NOT NULL REFERENCES inquiries(id),
    request_key TEXT NOT NULL UNIQUE, order_number TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL, currency TEXT NOT NULL, amount TEXT NOT NULL, items_json TEXT NOT NULL,
    delivery_date TEXT, shipped_date TEXT, logistics_company TEXT NOT NULL DEFAULT '',
    tracking_number TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '',
    version INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
    actor TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS crm_order_lead ON crm_orders(inquiry_id, id);
  CREATE TABLE IF NOT EXISTS crm_order_contracts (
    order_id INTEGER PRIMARY KEY REFERENCES crm_orders(id), filename TEXT NOT NULL,
    mime TEXT NOT NULL, data BLOB NOT NULL, sha256 TEXT NOT NULL,
    uploaded_at TEXT NOT NULL, actor TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS crm_order_contract_drafts (
    id TEXT PRIMARY KEY, inquiry_id INTEGER NOT NULL REFERENCES inquiries(id), actor TEXT NOT NULL,
    filename TEXT NOT NULL, data BLOB NOT NULL, expires_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS crm_contract_draft_expiry ON crm_order_contract_drafts(expires_at);
  CREATE TABLE IF NOT EXISTS crm_order_preparations (
    inquiry_id INTEGER PRIMARY KEY REFERENCES inquiries(id), version TEXT NOT NULL, data_json TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS crm_order_snapshots (
    order_id INTEGER PRIMARY KEY REFERENCES crm_orders(id), data_json TEXT NOT NULL
  );`);
    if (!db.prepare("PRAGMA table_info(crm_orders)").all().some((column) => column.name === "contract_number")) {
      db.exec("ALTER TABLE crm_orders ADD COLUMN contract_number TEXT NOT NULL DEFAULT ''");
    }
    db.exec("CREATE UNIQUE INDEX IF NOT EXISTS crm_order_contract_number ON crm_orders(contract_number) WHERE contract_number <> ''");
  }).immediate();
}

function contractFileType(file) {
  if (!file?.buffer?.length || file.size > maxContractSize) fail("请选择不超过 10 MiB 的合同文件");
  const data = file.buffer;
  const types = {
    pdf: ["application/pdf", data.subarray(0, 5).toString() === "%PDF-"],
    png: ["image/png", data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))],
    jpg: ["image/jpeg", data[0] === 255 && data[1] === 216 && data[2] === 255],
    jpeg: ["image/jpeg", data[0] === 255 && data[1] === 216 && data[2] === 255],
    docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", data.subarray(0, 4).equals(Buffer.from([80,75,3,4]))],
    doc: ["application/msword", data.subarray(0, 8).equals(Buffer.from([208,207,17,224,161,177,26,225]))]
  };
  const ext = String(file.originalname).split(".").pop().toLowerCase();
  if (!types[ext]?.[1]) fail("合同格式与文件内容不符，仅支持 PDF、PNG、JPG、DOC、DOCX");
  return types[ext][0];
}

export class OrderStore {
  constructor(store) { this.store = store; this.db = store.db; migrateOrders(this.db); }
  cleanupDrafts() { this.db.prepare("DELETE FROM crm_order_contract_drafts WHERE expires_at <= ?").run(new Date().toISOString()); }
  cancelDraft(id, actor) { this.db.prepare("DELETE FROM crm_order_contract_drafts WHERE id = ? AND actor = ?").run(id, actor); }
  preparation(inquiryId) {
    const lead = this.store.get(inquiryId);
    const row = this.db.prepare("SELECT version, data_json FROM crm_order_preparations WHERE inquiry_id = ?").get(inquiryId);
    if (row) return { version: row.version, values: JSON.parse(row.data_json), company: lead.company };
    return { version: null, values: {
      signing_type: "personal", buyer_name: lead.name, buyer_phone: lead.phone,
      recipient: lead.name, recipient_phone: lead.phone, currency: "CNY", items: [{ form: "sheet" }]
    }, company: lead.company };
  }
  checkPreparation(inquiryId, version) {
    if (this.preparation(inquiryId).version !== version) fail("合同准备资料已更新，请重新打开后再操作", 409);
  }
  savePreparation(inquiryId, input) {
    return this.db.transaction(() => {
      this.checkPreparation(inquiryId, input.preparation_version);
      const values = preparationDetails(input, input.ready === true);
      for (const key of ["amount", "currency", "delivery_date", "contract_number", "notes"]) {
        values[key] = text(input[key], key, key === "notes" ? 5000 : 100);
      }
      if (!Array.isArray(input.items) || input.items.length > 50) fail("最多填写 50 个规格明细");
      values.items = input.items.map((item) => Object.fromEntries(
        ["product", "form", "length", "width", "thickness", "quantity", "unit_price"].map((key) => [key, text(item?.[key], key, 200)])
      ));
      if (input.ready === true) validateOrder(values);
      const version = randomUUID();
      this.db.prepare(`INSERT INTO crm_order_preparations VALUES (?, ?, ?)
        ON CONFLICT(inquiry_id) DO UPDATE SET version=excluded.version, data_json=excluded.data_json`).run(inquiryId, version, JSON.stringify(values));
      return { version, values };
    }).immediate();
  }
  async stageContract(inquiryId, file, actor, recognize = true) {
    this.store.get(inquiryId); this.cleanupDrafts();
    if (this.db.prepare("SELECT count(*) n FROM crm_order_contract_drafts WHERE actor = ?").get(actor).n >= 3) fail("最多保留三份合同草稿，请关闭旧表单后重试", 429);
    contractFileType(file);
    const result = recognize ? await readContract(file) : { candidates: [], has_text: false };
    const id = randomUUID(), expires = new Date(Date.now() + 30 * 60000).toISOString();
    this.db.prepare("INSERT INTO crm_order_contract_drafts(id, inquiry_id, actor, filename, data, expires_at) VALUES (?, ?, ?, ?, ?, ?)").run(id, inquiryId, actor, file.originalname, file.buffer, expires);
    return { draft_id: id, expires_at: expires, ...result, candidates: result.candidates.map((candidate) => ({ ...candidate,
      existing_order_id: this.db.prepare("SELECT id FROM crm_orders WHERE contract_number = ?").get(candidate.number)?.id || null })) };
  }
  create(inquiryId, input, actor) {
    const preparing = Object.hasOwn(input, "preparation_version");
    if (preparing && !input.contract_draft_id) fail("请上传并关联最终签章合同");
    if (!input.contract_draft_id) return this.save(inquiryId, null, input, actor);
    return this.db.transaction(() => {
      const existing = this.db.prepare("SELECT id, inquiry_id FROM crm_orders WHERE request_key = ?").get(input.request_key || "");
      if (existing) {
        if (existing.inquiry_id !== inquiryId) fail("新增请求标识已使用", 409);
        return this.get(existing.id);
      }
      this.cleanupDrafts();
      const draft = this.db.prepare("SELECT * FROM crm_order_contract_drafts WHERE id = ? AND actor = ? AND inquiry_id = ?").get(input.contract_draft_id, actor, inquiryId);
      if (!draft) fail("合同草稿已失效或不属于当前线索，请重新上传识别", 410);
      let snapshot;
      if (preparing) {
        if (!input.preparation_version) fail("请先保存合同准备资料");
        this.checkPreparation(inquiryId, input.preparation_version);
        snapshot = preparationDetails(input, true);
        input = { ...input, status: "confirmed", shipped_date: null, logistics_company: "", tracking_number: "" };
      }
      const order = this.save(inquiryId, null, input, actor);
      const result = this.contract(order.id, { originalname: draft.filename, buffer: draft.data, size: draft.data.length }, { version: order.version }, actor);
      if (snapshot) {
        this.db.prepare("INSERT INTO crm_order_snapshots VALUES (?, ?)").run(order.id, JSON.stringify(snapshot));
        this.db.prepare("DELETE FROM crm_order_preparations WHERE inquiry_id = ?").run(inquiryId);
      }
      this.cancelDraft(draft.id, actor);
      return result;
    }).immediate();
  }
  get(id) {
    const row = this.db.prepare(`SELECT o.*, c.filename contract_filename, c.mime contract_mime,
      length(c.data) contract_size, c.sha256 contract_sha256, c.uploaded_at contract_uploaded_at
      FROM crm_orders o LEFT JOIN crm_order_contracts c ON c.order_id = o.id WHERE o.id = ?`).get(id);
    if (!row) fail("订单不存在", 404);
    return { ...row, items: JSON.parse(row.items_json), items_json: undefined };
  }
  list(inquiryId) {
    this.store.get(inquiryId);
    return this.db.prepare("SELECT id FROM crm_orders WHERE inquiry_id = ? ORDER BY id DESC").all(inquiryId).map(({ id }) => this.get(id));
  }
  search(query) {
    const terms = [], params = {};
    if (query.status && query.status !== "all") {
      if (!Object.hasOwn(orderStatuses, query.status)) fail("无效订单状态");
      terms.push("o.status = @status"); params.status = query.status;
    }
    if (query.q) {
      params.q = `%${text(query.q, "搜索内容", 200)}%`;
      terms.push("(o.order_number LIKE @q OR o.contract_number LIKE @q OR i.name LIKE @q OR i.company LIKE @q OR o.tracking_number LIKE @q OR o.items_json LIKE @q)");
    }
    const sql = terms.length ? `WHERE ${terms.join(" AND ")}` : "";
    const total = this.db.prepare(`SELECT count(*) n FROM crm_orders o JOIN inquiries i ON i.id=o.inquiry_id ${sql}`).get(params).n;
    const totalPages = Math.max(1, Math.ceil(total / 20));
    const page = Math.max(1, Math.min(totalPages, parseInt(query.page) || 1));
    const orders = this.db.prepare(`SELECT o.id, i.name lead_name, i.company lead_company FROM crm_orders o JOIN inquiries i ON i.id=o.inquiry_id ${sql} ORDER BY o.created_at DESC, o.id DESC LIMIT 20 OFFSET @offset`).all({ ...params, offset: (page - 1) * 20 }).map((row) => ({ ...this.get(row.id), lead_name: row.lead_name, lead_company: row.lead_company }));
    return { ok: true, orders, total, page, totalPages };
  }
  checkVersion(row, version) {
    if (!Number.isInteger(version) || row.version !== version) fail("此订单已更新，请重新打开后再保存", 409);
  }
  audit(row, actor, content, changes) {
    this.store.activity(row.inquiry_id, actor, { kind: "order", content: `订单 ${row.order_number}：${content}`, changes_json: JSON.stringify(changes) });
  }
  nextOrderNumber(now) {
    const day = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(now)).replaceAll("-", "");
    let sequence = this.db.prepare("SELECT coalesce(max(id), 0) + 1 n FROM crm_orders").get().n;
    let number;
    do {
      number = `VK-${day}-${String(sequence++).padStart(6, "0")}`;
    } while (this.db.prepare("SELECT id FROM crm_orders WHERE order_number = ?").get(number));
    return number;
  }
  save(inquiryId, id, input, actor) {
    return this.db.transaction(() => {
      this.store.get(inquiryId);
      const old = id ? this.get(id) : null;
      if (old && old.inquiry_id !== inquiryId) fail("订单不属于当前线索", 404);
      if (old) this.checkVersion(old, input.version);
      else {
        if (!/^[\w-]{16,100}$/.test(input.request_key || "")) fail("新增请求标识无效，请重新打开表单");
        const existing = this.db.prepare("SELECT id, inquiry_id FROM crm_orders WHERE request_key = ?").get(input.request_key);
        if (existing) {
          if (existing.inquiry_id !== inquiryId) fail("新增请求标识已使用", 409);
          return this.get(existing.id);
        }
      }
      const next = validateOrder({ ...input, contract_number: input.contract_number ?? old?.contract_number, status: input.status ?? old?.status });
      if (next.contract_number && this.db.prepare("SELECT id FROM crm_orders WHERE contract_number = ? AND id <> ?").get(next.contract_number, id || 0)) fail("合同编号已有订单，请核对现有订单", 409);
      const now = new Date().toISOString();
      next.order_number = old ? old.order_number : this.nextOrderNumber(now);
      const values = { ...next, items_json: JSON.stringify(next.items), now, actor };
      delete values.items;
      const columns = Object.keys(next).filter((key) => key !== "items").concat("items_json");
      if (old) this.db.prepare(`UPDATE crm_orders SET ${columns.map((key) => `${key} = @${key}`).join(",")}, version = version + 1, updated_at = @now, actor = @actor WHERE id = @id`).run({ ...values, id });
      else id = Number(this.db.prepare(`INSERT INTO crm_orders (inquiry_id, request_key, ${columns.join(",")}, created_at, updated_at, actor) VALUES (@inquiryId, @request_key, ${columns.map((key) => `@${key}`).join(",")}, @now, @now, @actor)`).run({ ...values, inquiryId, request_key: input.request_key }).lastInsertRowid);
      const row = this.get(id);
      const before = old ? { ...old, items: JSON.stringify(old.items) } : {};
      const after = { ...next, items: JSON.stringify(next.items) };
      this.audit(row, actor, old ? "更新订单资料/进度" : "新增订单", Object.fromEntries(Object.keys(after).filter((key) => before[key] !== after[key]).map((key) => [key, { before: before[key] ?? null, after: after[key] }])));
      return row;
    }).immediate();
  }
  contract(id, file, input, actor) {
    const mime = contractFileType(file), data = file.buffer;
    let filename = file.originalname;
    if ([...filename].every((c) => c.charCodeAt(0) <= 255)) {
      try { filename = new TextDecoder("utf-8", { fatal: true }).decode(Buffer.from(filename, "latin1")); } catch { /* Keep non-UTF8 names. */ }
    }
    filename = text(filename.replace(/[\\/\r\n]/g, "_"), "合同文件名", 200);
    return this.db.transaction(() => {
      if (!/^\d+$/.test(String(input.version ?? ""))) fail("订单版本无效，请重新打开后再保存", 409);
      const row = this.get(id); this.checkVersion(row, Number(input.version));
      if (row.contract_filename && input.replace !== "true") fail("此订单已有最终合同，请确认替换", 409);
      const sha256 = createHash("sha256").update(data).digest("hex"), now = new Date().toISOString();
      this.db.prepare(`INSERT INTO crm_order_contracts(order_id, filename, mime, data, sha256, uploaded_at, actor)
        VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(order_id) DO UPDATE SET filename=excluded.filename, mime=excluded.mime, data=excluded.data, sha256=excluded.sha256, uploaded_at=excluded.uploaded_at, actor=excluded.actor`).run(id, filename, mime, data, sha256, now, actor);
      this.db.prepare("UPDATE crm_orders SET version=version+1, updated_at=?, actor=? WHERE id=?").run(now, actor, id);
      this.audit(row, actor, row.contract_filename ? "替换最终合同" : "上传最终合同", { contract: { before: row.contract_filename ? `${row.contract_filename} SHA256:${row.contract_sha256}` : null, after: `${filename} SHA256:${sha256}` } });
      return this.get(id);
    }).immediate();
  }
}

export function orderRoutes(store, actor, write) {
  const router = express.Router(), orders = new OrderStore(store);
  orders.cleanupDrafts();
  const cleanup = setInterval(() => orders.cleanupDrafts(), 60000); cleanup.unref();
  const route = (fn) => (req, res, next) => Promise.resolve().then(() => fn(req, res)).catch(next);
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: maxContractSize, files: 1, fields: 2, fieldSize: 100 } }).single("file");
  const contractUpload = (req, res, next) => upload(req, res, (error) => {
    if (error) return next(Object.assign(error, { status: 413, message: "合同上传超出限制：仅允许一个文件，大小不超过 10 MiB" }));
    next();
  });
  router.post("/inquiries/:id/order-contract-preview", write, contractUpload, route(async (req, res) => res.json({ ok: true, ...await orders.stageContract(Number(req.params.id), req.file, actor(req), req.body.recognize !== "false") })));
  router.post("/orders/contract-drafts/:id/cancel", write, route((req, res) => { orders.cancelDraft(req.params.id, actor(req)); res.json({ ok: true }); }));
  router.get("/inquiries/:id/order-preparation", route((req, res) => res.json({ ok: true, ...orders.preparation(Number(req.params.id)) })));
  router.post("/inquiries/:id/order-preparation", write, route((req, res) => res.json({ ok: true, ...orders.savePreparation(Number(req.params.id), req.body) })));
  router.get("/orders", route((req, res) => res.json(orders.search(req.query))));
  router.get("/orders/:id", route((req, res) => {
    const order = orders.get(Number(req.params.id)), lead = store.get(order.inquiry_id);
    const snapshot = store.db.prepare("SELECT data_json FROM crm_order_snapshots WHERE order_id = ?").get(order.id);
    res.json({ ok: true, order, preparation: snapshot ? JSON.parse(snapshot.data_json) : null, lead: { id: lead.id, name: lead.name, company: lead.company, contact: lead.contact, email: lead.email, phone: lead.phone } });
  }));
  router.get("/inquiries/:id/orders", route((req, res) => res.json({ ok: true, orders: orders.list(Number(req.params.id)), statuses: orderStatuses })));
  router.post("/inquiries/:id/orders", write, route((req, res) => res.status(201).json({ ok: true, order: orders.create(Number(req.params.id), req.body, actor(req)) })));
  router.post("/inquiries/:id/orders/:orderId", write, route((req, res) => res.json({ ok: true, order: orders.save(Number(req.params.id), Number(req.params.orderId), req.body, actor(req)) })));
  router.post("/orders/:id/contract", write, contractUpload, route((req, res) => res.json({ ok: true, order: orders.contract(Number(req.params.id), req.file, req.body, actor(req)) })));
  router.get("/orders/:id/contract", route((req, res) => {
    orders.get(Number(req.params.id));
    const file = store.db.prepare("SELECT * FROM crm_order_contracts WHERE order_id = ?").get(Number(req.params.id));
    if (!file) fail("尚未上传合同", 404);
    const inline = req.query.download !== "1" && ["application/pdf", "image/png", "image/jpeg"].includes(file.mime);
    res.set({ "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "sandbox; default-src 'none'; style-src 'unsafe-inline'", "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="contract.${file.filename.split(".").pop().replace(/[^a-z0-9]/gi, "")}"; filename*=UTF-8''${encodeURIComponent(file.filename)}` }).type(file.mime).send(file.data);
  }));
  return router;
}
