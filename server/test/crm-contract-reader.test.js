import assert from "node:assert/strict";
import test from "node:test";
import Database from "better-sqlite3";
import { zipSync, strToU8 } from "fflate";
import { randomUUID } from "node:crypto";
import { contractNumbers, readContract } from "../crm-contract-reader.js";
import { testApi } from "../crm-fixture.js";

export function contractPdf(lines = ["Contract No.: VK-20261028-003"]) {
  const content = `BT /F1 12 Tf 40 700 Td ${lines.map((line, index) => `${index ? "0 -20 Td " : ""}(${line.replace(/[\\()]/g, "\\$&")}) Tj`).join(" ")} ET`;
  const objects = ["<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>", "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 600 800] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>", `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`];
  let pdf = "%PDF-1.7\n", offsets = [0];
  objects.forEach((object, index) => { offsets.push(Buffer.byteLength(pdf)); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map((n) => `${String(n).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf);
}

const docx = (xml, header = "") => Buffer.from(zipSync({ "word/document.xml": strToU8(xml), ...(header ? { "word/header1.xml": strToU8(header) } : {}) }));
const file = (name, buffer) => ({ originalname: name, buffer, size: buffer.length });

test("contract numbers use explicit labels, support Chinese/English, deduplicate and never infer filenames", () => {
  assert.deepEqual(contractNumbers("合同编号：维京-2026-001\nContract No.: AGM/002\nAgreement Number: AGM/002").map((c) => c.number), ["维京-2026-001", "AGM/002"]);
  assert.deepEqual(contractNumbers("Invoice No.: IN-123\n采购电话：13800138000\n合同编号：\n签署日期：2026-10-28\nContract Notice: notice"), []);
  assert.deepEqual(contractNumbers("合同号：00123456").map((c) => c.number), ["00123456"]);
  assert.deepEqual(contractNumbers("合同编号：" + "A".repeat(101)), []);
});

test("PDF and docx text extraction handles split Word runs/headers, empty labels and rejects unsupported files", async () => {
  let result = await readContract(file("contract.pdf", contractPdf()));
  assert.equal(result.candidates[0].number, "VK-20261028-003");
  result = await readContract(file("合同.docx", docx('<w:document><w:p><w:r><w:t>合同编</w:t></w:r><w:r><w:t>号：VK-2026-004</w:t></w:r></w:p></w:document>', '<w:p><w:t>合同编号：VK-2026-004</w:t></w:p>')));
  assert.equal(result.candidates.length, 1); assert.equal(result.candidates[0].number, "VK-2026-004");
  result = await readContract(file("VK-FAKE-999.pdf", contractPdf(["No contract identifier here"])));
  assert.equal(result.candidates.length, 0); assert.equal(result.has_text, true);
  result = await readContract(file("empty.pdf", contractPdf([]))); assert.equal(result.candidates.length, 0);
  await assert.rejects(readContract(file("photo.png", Buffer.from("x"))), /PDF.*docx/);
  await assert.rejects(readContract(file("bad.pdf", Buffer.from("not a PDF"))), /格式无效/);
  await assert.rejects(readContract(file("bad.docx", docx("<!DOCTYPE w:document><w:p>合同号：VK-001</w:p>"))), /实体定义/);
  await assert.rejects(readContract({ ...file("big.pdf", contractPdf()), size: 10 * 1024 * 1024 + 1 }), /10 MiB/);
});

test("contract intake previews without orders, atomically attaches original, deduplicates, expires and cancels drafts", async (t) => {
  const api = await testApi(t), db = new Database(api.dbPath); t.after(() => db.close());
  const lead = (await api.json("/inquiries", { name: "识别客户", email: "parse@example.net", source_channel: "wechat" }, 201)).inquiry;
  const other = (await api.json("/inquiries", { name: "其他客户", email: "other@example.net", source_channel: "wechat" }, 201)).inquiry;
  const previewUrl = `/inquiries/${lead.id}/order-contract-preview`, ordersUrl = `/inquiries/${lead.id}/orders`;
  const pdf = contractPdf();
  const upload = (data = pdf, name = "合同.pdf") => { const body = new FormData(); body.set("file", new Blob([data]), name); return body; };
  assert.equal((await fetch(api.base + "/admin/api" + previewUrl, { method: "POST", body: upload() })).status, 401);
  assert.equal((await api.request(previewUrl, upload(), { Origin: "https://foreign.example" })).status, 403);
  const preview = await api.json(previewUrl, upload());
  assert.equal(preview.candidates[0].number, "VK-20261028-003");
  assert.equal((await api.json("/orders")).total, 0);
  const input = { request_key: randomUUID(), order_number: preview.candidates[0].number, status: "confirmed", currency: "CNY", amount: "12000", contract_draft_id: preview.draft_id,
    items: [{ form: "sheet", product: "AGM", length: "276", width: "148", thickness: "1.8", quantity: "20000" }] };
  await api.json(`/inquiries/${other.id}/orders`, input, 410);
  db.prepare("UPDATE crm_order_contract_drafts SET actor='someone-else' WHERE id=?").run(preview.draft_id);
  await api.json(ordersUrl, input, 410);
  db.prepare("UPDATE crm_order_contract_drafts SET actor='admin' WHERE id=?").run(preview.draft_id);
  await api.json(ordersUrl, { ...input, amount: "bad" }, 400);
  db.exec("CREATE TRIGGER fail_contract BEFORE INSERT ON crm_order_contracts BEGIN SELECT RAISE(ABORT, 'injected contract failure'); END;");
  await api.json(ordersUrl, input, 500);
  assert.equal((await api.json("/orders")).total, 0);
  assert.equal(db.prepare("SELECT count(*) n FROM crm_order_contract_drafts").get().n, 1);
  db.exec("DROP TRIGGER fail_contract");
  const created = (await api.json(ordersUrl, input, 201)).order;
  assert.equal(created.contract_filename, "合同.pdf");
  assert.deepEqual(Buffer.from(await (await api.request(`/orders/${created.id}/contract?download=1`)).arrayBuffer()), pdf);
  assert.equal((await api.json(ordersUrl, input, 201)).order.id, created.id);
  assert.equal(db.prepare("SELECT count(*) n FROM crm_order_contract_drafts").get().n, 0);
  const duplicate = await api.json(previewUrl, upload());
  assert.equal(duplicate.candidates[0].existing_order_id, created.id);
  await api.json(ordersUrl, { ...input, request_key: randomUUID(), contract_draft_id: duplicate.draft_id }, 409);
  const cancelUrl = `/orders/contract-drafts/${duplicate.draft_id}/cancel`;
  assert.equal((await api.request(cancelUrl, {}, { Origin: "https://foreign.example" })).status, 403);
  await api.json(cancelUrl, {}); await api.json(cancelUrl, {});
  assert.equal(db.prepare("SELECT count(*) n FROM crm_order_contract_drafts").get().n, 0);
  const expired = await api.json(previewUrl, upload());
  db.prepare("UPDATE crm_order_contract_drafts SET expires_at='2000-01-01' WHERE id=?").run(expired.draft_id);
  await api.json(ordersUrl, { ...input, request_key: randomUUID(), order_number: "NEW-123", contract_draft_id: expired.draft_id }, 410);
  // Cleanup is inside the failed transaction; a normal preview also clears expired drafts.
  const manual = await api.json(previewUrl, upload(contractPdf(["No identifier"]), "manual.pdf"));
  assert.equal(manual.candidates.length, 0);
  const handEntered = (await api.json(ordersUrl, { ...input, request_key: randomUUID(), order_number: "MANUAL-001", contract_draft_id: manual.draft_id }, 201)).order;
  assert.equal(handEntered.contract_filename, "manual.pdf");
  assert.equal(db.prepare("SELECT count(*) n FROM crm_order_contract_drafts").get().n, 0);
  assert.equal((await api.json(`/inquiries/${lead.id}`)).inquiry.lead_grade, "B");
  const word = docx('<w:document><w:p><w:t>合同编号：WORD-2026-001</w:t></w:p></w:document>');
  const wordPreview = await api.json(previewUrl, upload(word, "最终.docx"));
  const wordOrder = (await api.json(ordersUrl, { ...input, request_key: randomUUID(), order_number: wordPreview.candidates[0].number, contract_draft_id: wordPreview.draft_id }, 201)).order;
  const download = await api.request(`/orders/${wordOrder.id}/contract`);
  assert.match(download.headers.get("content-disposition"), /^attachment/);
  assert.deepEqual(Buffer.from(await download.arrayBuffer()), word);
  const drafts = [];
  for (let n = 0; n < 3; n++) drafts.push(await api.json(previewUrl, upload()));
  await api.json(previewUrl, upload(), 429);
  db.prepare("UPDATE crm_order_contract_drafts SET actor='another-account' WHERE id=?").run(drafts[0].draft_id);
  await api.json(`/orders/contract-drafts/${drafts[0].draft_id}/cancel`, {});
  assert.ok(db.prepare("SELECT id FROM crm_order_contract_drafts WHERE id=?").get(drafts[0].draft_id));
  db.prepare("UPDATE crm_order_contract_drafts SET expires_at='2000-01-01'").run();
  const fresh = await api.json(previewUrl, upload());
  assert.equal(db.prepare("SELECT count(*) n FROM crm_order_contract_drafts").get().n, 1);
  await api.json(`/orders/contract-drafts/${fresh.draft_id}/cancel`, {});
});
