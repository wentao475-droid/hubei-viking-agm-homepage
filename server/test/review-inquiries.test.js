import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import Database from "better-sqlite3";
import { reviewInquiries, applyReview } from "../review-inquiries.js";

test("history review is read-only by default and protects followed-up leads", async (context) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "viking-review-test-"));
  const filename = path.join(directory, "inquiries.db");
  const db = new Database(filename);
  context.after(() => { db.close(); fs.rmSync(directory, { recursive: true, force: true }); });
  db.exec(`CREATE TABLE inquiries (
    id INTEGER PRIMARY KEY, name TEXT, message TEXT, company TEXT,
    lead_grade TEXT, classification_source TEXT, classification_reason TEXT,
    notes TEXT, next_follow_up_at TEXT, handled_at TEXT, status TEXT,
    classified_at TEXT, notification_status TEXT,
    email_notification_status TEXT, feishu_notification_status TEXT
  )`);
  const insert = db.prepare(`INSERT INTO inquiries
    (id, name, message, lead_grade, classification_source, notes, next_follow_up_at,
     handled_at, status, notification_status, email_notification_status, feishu_notification_status)
    VALUES (@id, 'Buyer', @message, @grade, @source, @notes, @followup, @handled,
     @status, 'sent', 'sent', 'pending')`);
  const base = {
    message: "Our contact form service offers one million messages for $59 with a free trial.",
    grade: "B", source: "automatic", notes: null, followup: null, handled: null, status: "new"
  };
  const fixtures = [
    {}, { grade: "D" }, { source: "manual" }, { notes: "Discussed sample" },
    { followup: "2026-10-10" }, { handled: "2026-10-01" }, { status: "quoted" },
    { source: "migration" }, { grade: "A" }, { grade: "C" },
    { message: "Price for AGM sheets?" }, { message: "Hi there! I'd like to hear more about your newsletter" }
  ];
  fixtures.forEach((item, i) => insert.run({ ...base, ...item, id: i + 1 }));
  const before = db.prepare("SELECT * FROM inquiries ORDER BY id").all();
  const bytesBefore = fs.readFileSync(filename);
  const cli = spawnSync(process.execPath, [new URL("../review-inquiries.js", import.meta.url).pathname, filename], { encoding: "utf8" });
  assert.equal(cli.status, 0, cli.stderr);
  assert.equal(JSON.parse(cli.stdout).applied, 0);
  assert.deepEqual(fs.readFileSync(filename), bytesBefore);
  const preview = reviewInquiries(db);
  assert.deepEqual(preview.automatic.map((row) => row.id), [1, 2]);
  assert.deepEqual(preview.manualReview.map((row) => row.id), [3, 4, 5, 6, 7, 8, 12]);
  assert.deepEqual(db.prepare("SELECT * FROM inquiries ORDER BY id").all(), before);

  // A non-directory backup target must fail before any database mutation.
  await assert.rejects(applyReview(db, filename));
  assert.deepEqual(db.prepare("SELECT * FROM inquiries ORDER BY id").all(), before);
  assert.equal(db.prepare("SELECT count(*) AS n FROM sqlite_master WHERE name = 'inquiry_spam_review_audit'").get().n, 0);

  const result = await applyReview(db, path.join(directory, "backups"));
  assert.equal(result.applied, 2);
  const backup = new Database(result.backup, { readonly: true });
  assert.deepEqual(backup.prepare("SELECT * FROM inquiries ORDER BY id").all(), before);
  backup.close();
  const changed = db.prepare("SELECT * FROM inquiries WHERE id = 1").get();
  assert.equal(changed.lead_grade, "E");
  assert.equal(changed.notification_status, "sent");
  assert.equal(changed.email_notification_status, "sent");
  assert.equal(changed.feishu_notification_status, "skipped");
  assert.deepEqual(db.prepare("SELECT * FROM inquiries WHERE id > 2 ORDER BY id").all(), before.slice(2));
  assert.equal(db.prepare("SELECT count(*) AS n FROM inquiry_spam_review_audit").get().n, 2);
  const audit = db.prepare("SELECT * FROM inquiry_spam_review_audit WHERE inquiry_id = 1").get();
  assert.deepEqual(JSON.parse(audit.before_json), before[0]);
  assert.equal(audit.after_grade, "E");
  assert.equal((await applyReview(db, path.join(directory, "backups"))).applied, 0);
  db.prepare("UPDATE inquiries SET lead_grade = 'B', classification_source = 'manual', handled_at = NULL WHERE id = 1").run();
  assert.equal(reviewInquiries(db).automatic.length, 0);
  assert.ok(reviewInquiries(db).manualReview.some((row) => row.id === 1));
});
