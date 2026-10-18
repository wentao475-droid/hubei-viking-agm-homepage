import assert from "node:assert/strict";
import test from "node:test";
import Database from "better-sqlite3";
import { testApi } from "../crm-fixture.js";
import { crmDate, csvText, identityKeys, migrateCrm, CrmStore, validateLead } from "../crm-store.js";
import { CrmImports, parseLeadFile } from "../crm-import.js";
import { zipSync, strToU8 } from "fflate";
import { migrateGradeDefinitions, gradeMigrationName } from "../lead-grades.js";

const lead = (overrides = {}) => ({ name: "采购联系人", email: "buyer@example.net", source_channel: "wechat", ...overrides });

test("strict Shanghai dates, contact normalization and safe CSV", () => {
  assert.equal(crmDate("2026-10-18 09:00"), "2026-10-18T01:00:00.000Z");
  assert.equal(crmDate("2026-10-18T09:00:00+08:00"), "2026-10-18T01:00:00.000Z");
  for (const date of ["2026-02-30", "2026-13-01", "2026-10-18T25:30", "18/10/2026"]) assert.throws(() => crmDate(date));
  assert.deepEqual(identityKeys({ phone: "+86 (138) 0013-8000", email: "BUYER@EXAMPLE.NET" }), ["email:buyer@example.net", "phone:8613800138000"]);
  assert.match(csvText(["name"], [{ name: " \t=HYPERLINK(1)" }]), /' \t=HYPERLINK/);
  assert.throws(() => validateLead(lead({ name: "" })));
  assert.throws(() => validateLead(lead({ source_channel: "other" })));
});

test("CRM API: manual intake, duplicate confirmation, history, concurrency, filters and export", async (t) => {
  const api = await testApi(t);
  assert.equal((await fetch(api.base + "/admin/api/inquiries")).status, 401);
  assert.equal((await api.request("/inquiries", lead(), { Origin: "https://foreign.example" })).status, 403);
  let created = (await api.json("/inquiries", lead({ name: '<img src=x onerror="alert(1)">', initial_follow_up: "此前邮件沟通", follow_up_at: "2026-10-01 09:00", next_follow_up_at: "2026-10-19 09:00" }), 201)).inquiry;
  assert.equal(created.classification_source, "manual"); assert.equal(created.notification_status, "skipped");
  assert.equal(created.email_notification_status, "skipped"); assert.equal(created.feishu_notification_status, "skipped");
  assert.equal(created.lead_grade, "B");
  const conflict = await api.json("/inquiries", lead(), 409);
  assert.equal(conflict.duplicates[0].id, created.id);
  const newDemand = (await api.json("/inquiries", { ...lead(), duplicate_token: conflict.duplicate_token }, 201)).inquiry;
  assert.notEqual(newDemand.id, created.id);
  let saved = (await api.json(`/inquiries/${created.id}/follow-ups`, { version: created.version, content: "寄送样品讨论", method: "微信", happened_at: "2026-10-18 10:00", lead_grade: "B", next_action: "确认厚度", next_follow_up_at: "2026-10-20 09:00" })).inquiry;
  assert.equal(saved.lead_grade, "B");
  await api.json(`/inquiries/${created.id}/follow-ups`, { version: created.version, content: "另一个页面的过时内容" }, 409);
  saved = (await api.json(`/inquiries/${created.id}/follow-ups`, { version: saved.version, content: "补记早期沟通", happened_at: "2026-10-10 09:00" })).inquiry;
  assert.equal(saved.last_follow_up_at, "2026-10-18T02:00:00.000Z");
  const detail = await api.json(`/inquiries/${created.id}`);
  assert.equal(detail.activities.filter((a) => a.kind === "communication").length, 3);
  assert.equal(detail.activities.filter((a) => a.kind === "communication")[0].content, "寄送样品讨论");
  const oldVersion = saved.version;
  saved = (await api.json(`/inquiries/${created.id}/basic`, { version: saved.version, company: "电池制造商" })).inquiry;
  await api.json(`/inquiries/${created.id}/basic`, { version: oldVersion, company: "过时内容" }, 409);
  await api.json("/inquiries/bulk-grade", { ids: [created.id, newDemand.id], lead_grade: "E", versions: { [created.id]: oldVersion, [newDemand.id]: newDemand.version } }, 409);
  assert.equal((await api.json(`/inquiries/${newDemand.id}`)).inquiry.lead_grade, "B");
  saved = (await api.json(`/inquiries/${created.id}/follow-ups`, { version: saved.version, kind: "plan", next_action: "", next_follow_up_at: "" })).inquiry;
  assert.equal(saved.next_follow_up_at, null); assert.equal(saved.next_action, "");
  const filtered = await api.json("/inquiries?channel=wechat&q=寄送样品&grade=all"); assert.equal(filtered.total, 1); assert.equal(filtered.stats.B, 1);
  const csv = await (await api.request("/follow-ups.csv?channel=wechat&grade=all")).text();
  assert.match(csv, /寄送样品讨论/); assert.match(csv, /补记早期沟通/);

  const web = await fetch(api.base + "/api/inquiry", { method: "POST", headers: { Origin: api.base, "Content-Type": "application/json" }, body: JSON.stringify({ name: "官网客户", contact: "web@example.net", message: "Please quote AGM sheets", utm_source: "Google" }) });
  const webId = (await web.json()).id;
  const original = (await api.json(`/inquiries/${webId}`)).inquiry;
  const edited = (await api.json(`/inquiries/${webId}/basic`, { version: original.version, message: "篡改原始留言", source_channel: "email", company: "官网客户公司" })).inquiry;
  assert.equal(edited.message, original.message); assert.equal(edited.source_channel, "website"); assert.equal(edited.utm_source, "Google");
  const db = new Database(api.dbPath); t.after(() => db.close());
  db.prepare("UPDATE inquiries SET notes = '旧备注内容' WHERE id = ?").run(webId);
  db.prepare("DELETE FROM schema_migrations WHERE name = '20261018_crm_dates_v1'").run();
  migrateCrm(db); migrateCrm(db);
  assert.equal(db.prepare("SELECT count(*) n FROM crm_activities WHERE inquiry_id = ? AND kind = 'legacy_note'").get(webId).n, 1);
  assert.equal(db.prepare("SELECT happened_at FROM crm_activities WHERE inquiry_id = ? AND kind = 'legacy_note'").get(webId).happened_at, null);
  assert.equal(db.prepare("SELECT notes FROM inquiries WHERE id = ?").get(webId).notes, "旧备注内容");
  db.prepare("UPDATE inquiries SET next_follow_up_at = ? WHERE id = ?").run(new Date().toISOString(), newDemand.id);
  assert.ok((await api.json("/inquiries?follow_up=today&grade=all")).inquiries.some((r) => r.id === newDemand.id));
  db.prepare("UPDATE inquiries SET next_follow_up_at = '2001-01-01T00:00:00Z', lead_grade = 'E' WHERE id = ?").run(webId);
  assert.ok(!(await api.json("/inquiries?follow_up=overdue&grade=all")).inquiries.some((r) => r.id === webId));
  assert.ok((await api.json("/inquiries?follow_up=unscheduled&grade=all")).inquiries.some((r) => r.id === created.id));
});

test("import parser handles UTF-8 BOM, quoted lines, leading-zero text and workbook selection", async () => {
  const csv = Buffer.from('\uFEFF姓名,电话,需求\r\n"张,先生",00123456789,"首行\n第二行"');
  const parsed = await parseLeadFile({ originalname: "leads.csv", buffer: csv, size: csv.length });
  assert.deepEqual(parsed[0].data[1], ["张,先生", "00123456789", "首行\n第二行"]);
  const file = workbook();
  const sheets = await parseLeadFile({ originalname: "leads.xlsx", buffer: file, size: file.length });
  assert.equal(sheets.length, 2); assert.equal(sheets[1].sheet, "第二张表"); assert.equal(sheets[1].data[1][1], "00123456789");
  await assert.rejects(parseLeadFile({ originalname: "old.xls", buffer: csv, size: csv.length }), /xls/);
  await assert.rejects(parseLeadFile({ originalname: "large.csv", buffer: csv, size: 5 * 1024 * 1024 + 1 }), /5 MiB/);
  const rows = Buffer.from("姓名,邮箱\n" + "a,b@example.net\n".repeat(1001));
  await assert.rejects(parseLeadFile({ originalname: "too-many.csv", buffer: rows, size: rows.length }), /1,000/);
  const wide = Buffer.from(Array(51).fill("列").join(","));
  await assert.rejects(parseLeadFile({ originalname: "wide.csv", buffer: wide, size: wide.length }), /50/);
  const invalid = Buffer.from([0xff, 0xfe, 0x01]);
  await assert.rejects(parseLeadFile({ originalname: "bad.csv", buffer: invalid, size: invalid.length }));
});

test("imports preview before writing, flag duplicates, confirm once, expire drafts and roll back failures", async (t) => {
  const api = await testApi(t);
  const upload = async (text) => { const body = new FormData(); body.set("file", new Blob([text], { type: "text/csv" }), "名单.csv"); return api.json("/crm/imports", body, 201); };
  await api.json("/inquiries", lead(), 201);
  const draft = await upload('姓名,邮箱,电话,首次联系时间\n旧客户,buyer@example.net,,\n新客户,new@example.net,00123456789,2026-10-01 09:00\n同批重复,new@example.net,,\n日期错误,bad@example.net,,2026-02-30\n缺联系方式,,,');
  const body = { sheet: 0, mapping: ["name", "email", "phone", "first_contact_at"], default_channel: "exhibition" };
  const preview = await api.json(`/crm/imports/${draft.id}/preview`, body);
  assert.deepEqual(preview.counts, { valid: 1, duplicate: 2, error: 2, empty: 0 });
  assert.equal((await api.json("/inquiries?grade=all")).total, 1);
  assert.match(await (await api.request(`/crm/imports/${draft.id}/errors.csv`)).text(), /首次联系时间不是有效日期/);
  const confirm = { token: preview.token, include_rows: [3], allow_duplicate_rows: [] };
  const result = await api.json(`/crm/imports/${draft.id}/confirm`, confirm);
  assert.equal(result.imported, 1); assert.equal(result.skipped, 4);
  assert.deepEqual(await api.json(`/crm/imports/${draft.id}/confirm`, confirm), result);
  const imported = (await api.json(`/inquiries/${result.ids[0]}`)).inquiry;
  assert.equal(imported.record_origin, "import"); assert.equal(imported.phone, "00123456789"); assert.equal(imported.notification_status, "skipped");
  assert.equal((await api.json(`/inquiries?batch=${draft.id}&grade=all`)).total, 1);

  const late = await upload("姓名,邮箱\n第三位,late@example.net");
  const mapped = { sheet: 0, mapping: ["name", "email"], default_channel: "email" };
  const latePreview = await api.json(`/crm/imports/${late.id}/preview`, mapped);
  await api.json("/inquiries", lead({ email: "late@example.net" }), 201);
  await api.json(`/crm/imports/${late.id}/confirm`, { token: latePreview.token, include_rows: [2], allow_duplicate_rows: [] }, 409);
  const fresh = await api.json(`/crm/imports/${late.id}/preview`, mapped);
  await api.json(`/crm/imports/${late.id}/confirm`, { token: fresh.token, include_rows: [2], allow_duplicate_rows: [] }, 400);
  const duplicate = await api.json(`/crm/imports/${late.id}/confirm`, { token: fresh.token, include_rows: [2], allow_duplicate_rows: [2] }); assert.equal(duplicate.imported, 1);

  const db = new Database(api.dbPath); t.after(() => db.close()); const store = new CrmStore(db), imports = new CrmImports(store);
  const expire = imports.stage("expired.csv", [{ sheet: "CSV", data: [["姓名", "邮箱"], ["Expired", "expired@example.net"]] }], "admin");
  db.prepare("UPDATE crm_import_batches SET expires_at = '2000-01-01' WHERE id = ?").run(expire.id);
  imports.cleanup(); assert.equal(db.prepare("SELECT sheets_json FROM crm_import_batches WHERE id = ?").get(expire.id).sheets_json, null);
  assert.throws(() => imports.get(expire.id, "admin"), /失效/);
  const rollback = imports.stage("rollback.csv", [{ sheet: "CSV", data: [["姓名", "邮箱"], ["One", "one@example.net"], ["Two", "two@example.net"]] }], "admin");
  const rp = imports.preview(rollback.id, mapped, "admin");
  const originalCreate = store.create.bind(store); let calls = 0;
  store.create = (...args) => { if (++calls === 2) throw new Error("injected failure"); return originalCreate(...args); };
  const before = db.prepare("SELECT count(*) n FROM inquiries").get().n;
  assert.throws(() => imports.confirm(rollback.id, { token: rp.token, include_rows: [2, 3], allow_duplicate_rows: [] }, "admin"), /injected failure/);
  assert.equal(db.prepare("SELECT count(*) n FROM inquiries").get().n, before);
  assert.equal(imports.get(rollback.id, "admin").status, "draft");
  imports.cancel(rollback.id, "admin"); assert.equal(db.prepare("SELECT sheets_json FROM crm_import_batches WHERE id = ?").get(rollback.id).sheets_json, null);
});

test("grade definitions migrate old C/D exactly once, preserve snapshots and keep potential clients active", async (t) => {
  const api = await testApi(t);
  const db = new Database(api.dbPath); t.after(() => db.close());
  const ids = [];
  for (const grade of ["A", "B", "C", "D", "E"]) {
    const item = (await api.json("/inquiries", lead({ email: `${grade}@example.net`, name: `旧 ${grade}` }), 201)).inquiry;
    ids.push(item.id);
    db.prepare("UPDATE inquiries SET lead_grade = ?, notes = '原始备注', next_follow_up_at = '2020-01-01T00:00:00Z', email_notification_status = 'sent', utm_source = 'Google' WHERE id = ?").run(grade, item.id);
  }
  db.prepare("UPDATE crm_activities SET grade_schema_version = 1, lead_grade = 'C', changes_json = ? WHERE inquiry_id = ?").run(JSON.stringify({ before: { lead_grade: "D" }, after: { lead_grade: "C" } }), ids[2]);
  const originalActivity = db.prepare("SELECT * FROM crm_activities WHERE inquiry_id = ?").all(ids[2]);
  const oldRows = db.prepare("SELECT * FROM inquiries ORDER BY id").all();
  const imports = new CrmImports(new CrmStore(db));
  const draft = imports.stage("旧定义草稿.csv", [{ sheet: "CSV", data: [["姓名", "邮箱"], ["旧草稿", "draft@example.net"]] }], "admin");
  db.prepare("DELETE FROM schema_migrations WHERE name = ?").run(gradeMigrationName);
  assert.deepEqual(migrateGradeDefinitions(db), { applied: true, changed: 2 });
  const migrated = db.prepare("SELECT * FROM inquiries ORDER BY id").all();
  assert.deepEqual(migrated.map((row) => row.lead_grade), ["A", "B", "D", "B", "E"]);
  for (let i = 0; i < migrated.length; i++) {
    assert.equal(migrated[i].version, oldRows[i].version + ([2, 3].includes(i) ? 1 : 0));
    for (const key of ["notes", "next_follow_up_at", "notification_status", "email_notification_status", "feishu_notification_status", "classification_source", "classification_reason", "utm_source", "message", "contact", "created_at"]) assert.equal(migrated[i][key], oldRows[i][key]);
  }
  assert.deepEqual(db.prepare("SELECT * FROM crm_activities WHERE inquiry_id = ? AND kind <> 'grade_migration'").all(ids[2]), originalActivity);
  assert.equal(db.prepare("SELECT count(*) n FROM crm_activities WHERE kind = 'grade_migration'").get().n, 2);
  assert.equal(db.prepare("SELECT status FROM crm_import_batches WHERE id = ?").get(draft.id).status, "expired");
  assert.equal(db.prepare("SELECT sheets_json FROM crm_import_batches WHERE id = ?").get(draft.id).sheets_json, null);
  assert.deepEqual(migrateGradeDefinitions(db), { applied: false, changed: 0 });
  assert.equal(db.prepare("SELECT lead_grade FROM inquiries WHERE id = ?").get(ids[2]).lead_grade, "D");
  await api.json(`/inquiries/${ids[2]}/follow-ups`, { kind: "plan", version: oldRows[2].version, lead_grade: "B" }, 409);
  const potential = (await api.json("/inquiries", lead({ email: "potential@example.net", lead_grade: "C", next_follow_up_at: "2020-01-01 09:00" }), 201)).inquiry;
  const active = await api.json("/inquiries");
  assert.ok(active.inquiries.some((r) => r.id === potential.id));
  assert.ok(!active.inquiries.some((r) => r.id === ids[2]));
  const overdue = await api.json("/inquiries?follow_up=overdue&grade=all");
  assert.ok(overdue.inquiries.some((r) => r.id === potential.id));
  assert.ok(!overdue.inquiries.some((r) => r.id === ids[2]));
  assert.equal((await api.json("/inquiries?status=lost")).total, 1);
  const lost = (await api.json(`/inquiries/${potential.id}/status`, { status: "lost" })).inquiry;
  assert.equal(lost.lead_grade, "D");
  assert.equal((await api.json("/inquiries?grade=C")).total, 0);
  const options = await api.json("/crm/options");
  assert.equal(options.grades.C, "潜在客户池"); assert.equal(options.grades.D, "已流失"); assert.equal(options.gradeSchemaVersion, 2);
  assert.match(await (await api.request("/inquiries.csv?grade=D")).text(), /已流失/);
  assert.match(await (await api.request("/follow-ups.csv?grade=all")).text(), /grade_schema_version/);
});

function workbook() {
  const xml = (content) => strToU8(content);
  const sheet = '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData><row r="1"><c r="A1" t="inlineStr"><is><t>姓名</t></is></c><c r="B1" t="inlineStr"><is><t>电话</t></is></c></row><row r="2"><c r="A2" t="inlineStr"><is><t>测试客户</t></is></c><c r="B2" t="inlineStr"><is><t>00123456789</t></is></c></row></sheetData></worksheet>';
  return Buffer.from(zipSync({
    "[Content_Types].xml": xml('<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/></Types>'),
    "_rels/.rels": xml('<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'),
    "xl/workbook.xml": xml('<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="第一张表" sheetId="1" r:id="rId1"/><sheet name="第二张表" sheetId="2" r:id="rId2"/></sheets></workbook>'),
    "xl/_rels/workbook.xml.rels": xml('<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/></Relationships>'),
    "xl/worksheets/sheet1.xml": xml(sheet), "xl/worksheets/sheet2.xml": xml(sheet)
  }));
}
