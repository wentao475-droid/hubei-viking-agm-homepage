import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { classifyInquiry } from "./inquiry-classifier.js";

const clearSpamReasons = new Set([
  "unrelated_solicitation", "bulk_messaging_solicitation", "known_spam_template"
]);

export function reviewInquiries(db) {
  const report = { automatic: [], manualReview: [] };
  for (const row of db.prepare("SELECT * FROM inquiries WHERE lead_grade IN ('B', 'D') ORDER BY id").all()) {
    const result = classifyInquiry({ inquiry: row });
    if (result.lead_grade !== "E") continue;
    const protections = [];
    if (row.classification_source !== "automatic") protections.push("manual_or_migrated_classification");
    if (row.notes?.trim()) protections.push("notes");
    if (row.next_follow_up_at) protections.push("scheduled_follow_up");
    if (row.handled_at || row.status !== "new") protections.push("previously_handled");
    if (!clearSpamReasons.has(result.classification_reason)) protections.push("needs_confirmation");
    const item = {
      id: row.id, before: row.lead_grade, after: "E",
      reason: result.classification_reason, protections
    };
    report[protections.length ? "manualReview" : "automatic"].push(item);
  }
  return report;
}

export async function applyReview(db, backupDirectory) {
  // SQLite's backup API includes committed WAL contents; do not copy the raw db file.
  fs.mkdirSync(backupDirectory, { recursive: true, mode: 0o700 });
  const runDirectory = fs.mkdtempSync(path.join(backupDirectory, "spam-review-"));
  const backup = path.join(runDirectory, "before.db");
  await db.backup(backup);
  fs.chmodSync(backup, 0o600);
  const report = db.transaction(() => {
    // Re-read inside the write transaction, protecting concurrent manual edits.
    const current = reviewInquiries(db);
    db.exec(`CREATE TABLE IF NOT EXISTS inquiry_spam_review_audit (
      id INTEGER PRIMARY KEY, inquiry_id INTEGER NOT NULL,
      before_json TEXT NOT NULL, after_grade TEXT NOT NULL,
      reason TEXT NOT NULL, backup_path TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);
    const audit = db.prepare(`INSERT INTO inquiry_spam_review_audit
      (inquiry_id, before_json, after_grade, reason, backup_path) VALUES (?, ?, 'E', ?, ?)`);
    const update = db.prepare(`UPDATE inquiries SET lead_grade = 'E',
      classification_source = 'automatic', classification_reason = ?,
      classified_at = CURRENT_TIMESTAMP, handled_at = CURRENT_TIMESTAMP,
      notification_status = CASE WHEN notification_status = 'pending' THEN 'skipped' ELSE notification_status END,
      email_notification_status = CASE WHEN email_notification_status = 'pending' THEN 'skipped' ELSE email_notification_status END,
      feishu_notification_status = CASE WHEN feishu_notification_status = 'pending' THEN 'skipped' ELSE feishu_notification_status END
      WHERE id = ?`);
    for (const item of current.automatic) {
      const before = db.prepare("SELECT * FROM inquiries WHERE id = ?").get(item.id);
      audit.run(item.id, JSON.stringify(before), item.reason, backup);
      update.run(item.reason, item.id);
    }
    return current;
  }).immediate();
  return { ...report, backup, applied: report.automatic.length };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1 || args.length > 2 || (args[1] && args[1] !== "--apply")) {
    throw new Error("Usage: node review-inquiries.js /absolute/path/inquiries.db [--apply]");
  }
  if (!path.isAbsolute(args[0])) throw new Error("An absolute database path is required");
  const apply = args[1] === "--apply";
  const db = new Database(args[0], { readonly: !apply, fileMustExist: true });
  try {
    console.log(JSON.stringify(apply
      ? await applyReview(db, path.join(path.dirname(args[0]), "backups"))
      : { ...reviewInquiries(db), applied: 0 }, null, 2));
  } finally {
    db.close();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
