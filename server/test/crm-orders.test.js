import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import Database from "better-sqlite3";
import { testApi } from "../crm-fixture.js";
import { validateOrder, migrateOrders, OrderStore } from "../crm-orders.js";
import { CrmStore } from "../crm-store.js";
import { reviewInquiries } from "../review-inquiries.js";

const order = (extra = {}) => ({ request_key: randomUUID(), order_number: "VK-20261027-01", status: "confirmed", currency: "CNY", amount: "12000.00", delivery_date: "2026-11-20",
  items: [{ product: "AGM 隔板", form: "sheet", length: "276", width: "148", thickness: "1.8", quantity: "20000", unit_price: "0.6" }], ...extra });

test("order specifications retain exact dimensions, units, quantities and dates", () => {
  assert.equal(validateOrder(order()).items[0].thickness, "1.8");
  const roll = { product: "AGM", form: "roll", length: "100", width: "600", thickness: "0.8", quantity: "2" };
  assert.equal(validateOrder(order({ items: [roll] })).items[0].quantity, "2");
  for (const change of [{ items: [] }, { amount: "1e5" }, { amount: "-1" }, { currency: "人民币" }, { delivery_date: "2026-02-30" }, { status: "shipped" }, { status: "fake" }]) assert.throws(() => validateOrder(order(change)));
  for (const change of [{ thickness: "" }, { length: "0" }, { quantity: "1.5" }, { width: "<script>" }, { product: "" }]) assert.throws(() => validateOrder(order({ items: [{ ...order().items[0], ...change }] })));
});

test("orders and final contracts: auth, multiple orders, concurrency, audit, shipment and download", async (t) => {
  const api = await testApi(t);
  const lead = (await api.json("/inquiries", { name: "订单测试客户", email: "orders@example.net", source_channel: "wechat", lead_grade: "C" }, 201)).inquiry;
  const url = `/inquiries/${lead.id}/orders`, input = order();
  assert.equal((await fetch(api.base + "/admin/api" + url)).status, 401);
  assert.equal((await api.request(url, input, { Origin: "https://foreign.example" })).status, 403);
  let saved = (await api.json(url, input, 201)).order;
  assert.deepEqual(saved.items, validateOrder(input).items);
  assert.equal((await api.json(url, input, 201)).order.id, saved.id);
  await api.json(url, order(), 409);
  const second = (await api.json(url, order({ order_number: "VK-02" }), 201)).order;
  assert.equal((await api.json(url)).orders.length, 2);
  const other = (await api.json("/inquiries", { name: "另一客户", email: "other@example.net", source_channel: "email" }, 201)).inquiry;
  await api.json(`/inquiries/${other.id}/orders/${saved.id}`, { ...input, version: 0 }, 404);
  await api.json(url + `/${saved.id}`, { ...input, version: 0, status: "shipped" }, 400);
  saved = (await api.json(url + `/${saved.id}`, { ...input, version: saved.version, status: "shipped", shipped_date: "2026-10-27", logistics_company: "顺丰", tracking_number: "00123456" })).order;
  await api.json(url + `/${saved.id}`, { ...input, version: 0 }, 409);
  assert.equal(saved.tracking_number, "00123456");
  const upload = (filename, bytes, version = saved.version, replace = false) => {
    const body = new FormData(); body.set("file", new Blob([bytes]), filename); body.set("version", String(version));
    if (replace) body.set("replace", "true"); return body;
  };
  const contractUrl = `/orders/${saved.id}/contract`, pdf = Buffer.from("%PDF-1.4\nlocal test contract\n%%EOF");
  await api.json(contractUrl, undefined, 404);
  await api.json(contractUrl, upload("bad.pdf", "<html>bad</html>"), 400);
  assert.equal((await api.request(contractUrl, upload("合同.pdf", pdf), { Origin: "https://foreign.example" })).status, 403);
  saved = (await api.json(contractUrl, upload("合同.pdf", pdf))).order;
  assert.equal(saved.contract_filename, "合同.pdf");
  assert.equal(saved.contract_size, pdf.length);
  assert.equal((await fetch(api.base + "/admin/api" + contractUrl)).status, 401);
  let response = await api.request(contractUrl);
  assert.equal(response.headers.get("content-type"), "application/pdf");
  assert.match(response.headers.get("content-disposition"), /^inline/);
  assert.match(response.headers.get("content-security-policy"), /sandbox/);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), pdf);
  response = await api.request(contractUrl + "?download=1"); assert.match(response.headers.get("content-disposition"), /^attachment/);
  await api.json(contractUrl, upload("替换.pdf", pdf, saved.version - 1, true), 409);
  await api.json(contractUrl, upload("替换.pdf", pdf), 409);
  const doc = Buffer.from([208,207,17,224,161,177,26,225,0]);
  saved = (await api.json(contractUrl, upload("final.doc", doc, saved.version, true))).order;
  response = await api.request(contractUrl); assert.match(response.headers.get("content-disposition"), /^attachment/);
  assert.equal((await api.json(`/orders/${second.id}/contract`, undefined, 404)).ok, false);
  const detail = await api.json(`/inquiries/${lead.id}`);
  assert.equal(detail.inquiry.lead_grade, "C");
  assert.equal(detail.inquiry.notification_status, "skipped");
  assert.equal(detail.activities.filter((a) => a.kind === "order").length, 5);
  assert.ok(detail.activities.some((a) => a.content.includes("替换最终合同")));
  const db = new Database(api.dbPath); t.after(() => db.close()); migrateOrders(db); migrateOrders(db);
  assert.equal(db.prepare("SELECT count(*) n FROM crm_orders").get().n, 2);
  assert.equal(db.prepare("SELECT count(*) n FROM crm_order_contracts").get().n, 1);
  await api.json(contractUrl, upload("large.pdf", Buffer.alloc(10 * 1024 * 1024 + 1)), 413);
});

test("audit failure rolls back order and contract atomically; restart preserves original lead data", async (t) => {
  const api = await testApi(t);
  const lead = (await api.json("/inquiries", { name: "事务测试", phone: "00123456789", source_channel: "wechat" }, 201)).inquiry;
  const db = new Database(api.dbPath); t.after(() => db.close());
  const store = new OrderStore(new CrmStore(db));
  const before = db.prepare("SELECT * FROM inquiries WHERE id = ?").get(lead.id);
  db.exec("CREATE TRIGGER fail_order_audit BEFORE INSERT ON crm_activities WHEN NEW.kind = 'order' BEGIN SELECT RAISE(ABORT, 'injected audit failure'); END;");
  assert.throws(() => store.save(lead.id, null, order(), "admin"), /injected audit failure/);
  assert.equal(store.list(lead.id).length, 0);
  db.exec("DROP TRIGGER fail_order_audit");
  let saved = store.save(lead.id, null, order(), "admin");
  const pdf = Buffer.from("%PDF-1.4\nfirst"), file = { originalname: "contract.pdf", buffer: pdf, size: pdf.length };
  saved = store.contract(saved.id, file, { version: saved.version }, "admin");
  const first = db.prepare("SELECT * FROM crm_order_contracts WHERE order_id = ?").get(saved.id);
  db.exec("CREATE TRIGGER fail_order_audit BEFORE INSERT ON crm_activities WHEN NEW.kind = 'order' BEGIN SELECT RAISE(ABORT, 'injected audit failure'); END;");
  assert.throws(() => store.save(lead.id, saved.id, { ...order(), version: saved.version, amount: "500" }, "admin"), /injected audit failure/);
  assert.equal(store.get(saved.id).amount, saved.amount);
  const replacement = Buffer.from("%PDF-1.4\nreplacement");
  assert.throws(() => store.contract(saved.id, { ...file, buffer: replacement, size: replacement.length }, { version: saved.version, replace: "true" }, "admin"), /injected audit failure/);
  assert.deepEqual(db.prepare("SELECT * FROM crm_order_contracts WHERE order_id = ?").get(saved.id), first);
  assert.equal(store.get(saved.id).version, saved.version);
  assert.deepEqual(db.prepare("SELECT * FROM inquiries WHERE id = ?").get(lead.id), before);
  const restarted = new OrderStore(new CrmStore(db));
  assert.equal(restarted.get(saved.id).contract_sha256, saved.contract_sha256);
  db.prepare("UPDATE inquiries SET classification_source='automatic', message=? WHERE id=?").run("Our contact form service offers one million messages for $59 with a free trial.", lead.id);
  const review = reviewInquiries(db);
  assert.ok(!review.automatic.some((row) => row.id === lead.id));
  assert.ok(review.manualReview.find((row) => row.id === lead.id).protections.includes("has_order"));
});

test("independent order pages and global listing cover every lead, filters and pagination", async (t) => {
  const api = await testApi(t);
  const first = (await api.json("/inquiries", { name: "甲客户", company: "甲公司", email: "a@example.net", source_channel: "wechat", lead_grade: "E" }, 201)).inquiry;
  const second = (await api.json("/inquiries", { name: "乙客户", email: "b@example.net", source_channel: "website", lead_grade: "A" }, 201)).inquiry;
  const ids = [];
  for (let n = 0; n < 23; n++) ids.push((await api.json(`/inquiries/${n === 22 ? second.id : first.id}/orders`, order({ order_number: `GLOBAL-${String(n).padStart(2, "0")}`, status: n === 22 ? "shipped" : "confirmed", shipped_date: n === 22 ? "2026-10-28" : null }), 201)).order.id);
  assert.equal((await fetch(api.base + "/admin/api/orders")).status, 401);
  assert.equal((await fetch(api.base + `/admin/api/orders/${ids[0]}`)).status, 401);
  const all = await api.json("/orders");
  assert.equal(all.total, 23); assert.equal(all.orders.length, 20); assert.equal(all.totalPages, 2);
  assert.equal(all.orders[0].id, ids[22]); assert.equal(all.orders[0].lead_name, "乙客户");
  assert.equal((await api.json("/orders?page=2")).orders.length, 3);
  assert.equal((await api.json("/orders?status=shipped")).total, 1);
  assert.equal((await api.json("/orders?status=confirmed&q=" + encodeURIComponent("甲公司"))).total, 22);
  assert.equal((await api.json("/orders?q=GLOBAL-00")).orders[0].id, ids[0]);
  assert.equal((await api.json("/orders?q=276")).total, 23);
  assert.equal((await api.json("/orders?q=no-match")).total, 0);
  await api.json("/orders?status=invalid", undefined, 400);
  await api.json("/orders/999999", undefined, 404);
  const detail = await api.json(`/orders/${ids[0]}`);
  assert.equal(detail.lead.id, first.id); assert.equal(detail.order.inquiry_id, first.id);
  assert.equal((await api.json(`/inquiries/${second.id}/orders`)).orders.length, 1);
  for (const path of ["/admin", "/admin/orders", `/admin/orders/${ids[0]}`]) {
    const response = await fetch(api.base + path, { headers: { Cookie: api.cookie } });
    assert.equal(response.status, 200); assert.match(await response.text(), /后台主导航/);
  }
  assert.match(await (await fetch(api.base + `/admin/orders/${ids[0]}`)).text(), /Sign in/);
});
