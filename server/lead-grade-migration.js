import {
  createMessageFingerprint,
  normalizeContactIdentity
} from "./inquiry-classifier.js";

export const leadGradeMigrationName = "20260720_lead_grades_v1";
export const historicalMigrationCutoff = "2026-07-20 12:24:02";

const historicalTests = [1, 2, 3, 4, 17, 18, 19];
const historicalSolicitations = [5, 10, 11, 16];
const historicalDuplicates = new Map([
  [6, 5],
  [7, 5],
  [8, 5],
  [9, 5],
  [12, 11],
  [13, 11],
  [14, 11],
  [15, 11]
]);

export function applyLeadGradeMigration(db) {
  ensureLeadGradeSchema(db);

  const applied = db
    .prepare("SELECT 1 FROM schema_migrations WHERE name = ?")
    .get(leadGradeMigrationName);
  if (applied) {
    return { applied: false };
  }

  const migrate = db.transaction(() => {
    populateInquiryFingerprints(db);
    db.exec(`
      UPDATE inquiries
      SET lead_grade = CASE
            WHEN status = 'won' THEN 'A'
            WHEN status IN ('qualified', 'sample', 'quoted') THEN 'B'
            WHEN status = 'lost' THEN 'C'
            ELSE 'D'
          END,
          classification_source = 'migration',
          classification_reason = 'legacy_status_mapping',
          classified_at = COALESCE(classified_at, CURRENT_TIMESTAMP);
    `);

    const classifyHistorical = db.prepare(`
      UPDATE inquiries
      SET lead_grade = 'E',
          classification_source = 'migration',
          classification_reason = @reason,
          duplicate_of_id = @duplicate_of_id,
          classified_at = CURRENT_TIMESTAMP
      WHERE id = @id
        AND datetime(created_at) <= datetime(@cutoff)
    `);

    for (const id of historicalTests) {
      classifyHistorical.run({
        id,
        cutoff: historicalMigrationCutoff,
        reason: "historical_test",
        duplicate_of_id: null
      });
    }
    for (const id of historicalSolicitations) {
      classifyHistorical.run({
        id,
        cutoff: historicalMigrationCutoff,
        reason: "historical_unrelated_solicitation",
        duplicate_of_id: null
      });
    }
    for (const [id, duplicateOfId] of historicalDuplicates) {
      classifyHistorical.run({
        id,
        cutoff: historicalMigrationCutoff,
        reason: "duplicate_submission",
        duplicate_of_id: duplicateOfId
      });
    }

    db.prepare("INSERT INTO schema_migrations (name) VALUES (?)").run(
      leadGradeMigrationName
    );
  });

  migrate();
  return { applied: true };
}

export function ensureLeadGradeSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  for (const [name, definition] of [
    ["lead_grade", "TEXT NOT NULL DEFAULT 'D'"],
    ["classification_source", "TEXT NOT NULL DEFAULT 'automatic'"],
    ["classification_reason", "TEXT"],
    ["duplicate_of_id", "INTEGER"],
    ["classified_at", "TEXT"],
    ["contact_identity", "TEXT"],
    ["message_fingerprint", "TEXT"]
  ]) {
    ensureColumn(db, name, definition);
  }

  db.exec(`
    CREATE INDEX IF NOT EXISTS inquiries_lead_grade_idx
      ON inquiries (lead_grade);
    CREATE INDEX IF NOT EXISTS inquiries_duplicate_lookup_idx
      ON inquiries (contact_identity, message_fingerprint, created_at);
  `);
}

function populateInquiryFingerprints(db) {
  const rows = db
    .prepare("SELECT id, contact, email, message FROM inquiries")
    .all();
  const update = db.prepare(`
    UPDATE inquiries
    SET contact_identity = @contact_identity,
        message_fingerprint = @message_fingerprint
    WHERE id = @id
  `);

  for (const row of rows) {
    update.run({
      id: row.id,
      contact_identity: normalizeContactIdentity(row),
      message_fingerprint: createMessageFingerprint(row.message)
    });
  }
}

function ensureColumn(db, name, definition) {
  const columns = db.prepare("PRAGMA table_info(inquiries)").all();
  if (!columns.some((column) => column.name === name)) {
    db.exec(`ALTER TABLE inquiries ADD COLUMN ${name} ${definition}`);
  }
}
