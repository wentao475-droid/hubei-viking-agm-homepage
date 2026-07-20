import assert from "node:assert/strict";
import test from "node:test";
import Database from "better-sqlite3";
import {
  applyLeadGradeMigration,
  leadGradeMigrationName
} from "../lead-grade-migration.js";

test("historical migration grades 19 known records without deleting data", () => {
  const db = new Database(":memory:");
  db.exec(`
    CREATE TABLE inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact TEXT,
      email TEXT,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      notification_status TEXT NOT NULL DEFAULT 'pending',
      email_notification_status TEXT NOT NULL DEFAULT 'pending',
      feishu_notification_status TEXT NOT NULL DEFAULT 'skipped',
      created_at TEXT NOT NULL
    );
  `);
  const insert = db.prepare(`
    INSERT INTO inquiries (id, contact, email, message, status, created_at)
    VALUES (@id, @contact, @email, @message, @status, @created_at)
  `);

  for (let id = 1; id <= 19; id += 1) {
    insert.run({
      id,
      contact: id >= 12 && id <= 15 ? "joanna@example.net" : `lead${id}@example.net`,
      email: id >= 12 && id <= 15 ? "joanna@example.net" : `lead${id}@example.net`,
      message: id >= 12 && id <= 15 ? "Repeated outreach" : `Message ${id}`,
      status: "new",
      created_at: "2026-07-20 12:00:00"
    });
  }
  insert.run({
    id: 20,
    contact: "customer@example.net",
    email: "customer@example.net",
    message: "Existing customer",
    status: "won",
    created_at: "2026-07-20 13:00:00"
  });
  db.exec(`
    UPDATE inquiries
    SET notification_status = 'sent', email_notification_status = 'sent'
    WHERE id = 1;
  `);

  assert.deepEqual(applyLeadGradeMigration(db), { applied: true });
  assert.equal(db.prepare("SELECT COUNT(*) AS count FROM inquiries").get().count, 20);
  assert.equal(
    db.prepare("SELECT COUNT(*) AS count FROM inquiries WHERE lead_grade = 'E'").get().count,
    19
  );
  assert.equal(db.prepare("SELECT lead_grade FROM inquiries WHERE id = 20").get().lead_grade, "A");
  assert.equal(db.prepare("SELECT duplicate_of_id FROM inquiries WHERE id = 6").get().duplicate_of_id, 5);
  assert.equal(db.prepare("SELECT duplicate_of_id FROM inquiries WHERE id = 15").get().duplicate_of_id, 11);
  assert.equal(
    db.prepare("SELECT classification_reason FROM inquiries WHERE id = 1").get().classification_reason,
    "historical_test"
  );
  assert.equal(
    db.prepare("SELECT notification_status FROM inquiries WHERE id = 1").get().notification_status,
    "sent"
  );
  assert.equal(
    db.prepare("SELECT classification_reason FROM inquiries WHERE id = 10").get().classification_reason,
    "historical_unrelated_solicitation"
  );
  assert.equal(
    db.prepare("SELECT COUNT(*) AS count FROM schema_migrations WHERE name = ?").get(leadGradeMigrationName).count,
    1
  );

  assert.deepEqual(applyLeadGradeMigration(db), { applied: false });
  assert.equal(db.prepare("SELECT COUNT(*) AS count FROM inquiries").get().count, 20);
  db.close();
});
