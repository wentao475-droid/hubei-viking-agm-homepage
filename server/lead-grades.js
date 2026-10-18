export const gradeLabels = { A: "服务中", B: "跟进中", C: "潜在客户池", D: "已流失", E: "无效" };
export const gradeDescriptions = {
  A: "正在服务的客户",
  B: "待联系或正在洽谈，需要继续跟进的线索",
  C: "同类有价值需求，但目前暂时无法满足，保留长期培育",
  D: "已确认流失的线索",
  E: "广告、垃圾或其他无效线索"
};
export const legacyGradeLabels = { A: "服务中", B: "洽谈中", C: "已流失", D: "待联系", E: "无效" };
export const defaultLeadGrade = "B";
export const gradeSchemaVersion = 2;
export const gradeMigrationName = "20261018_lead_grade_definitions_v2";

// Keep old activity snapshots in their original vocabulary; only current leads move.
export function migrateGradeDefinitions(db) {
  return db.transaction(() => {
    const columns = db.prepare("PRAGMA table_info(crm_activities)").all();
    if (!columns.some((row) => row.name === "grade_schema_version")) {
      db.exec("ALTER TABLE crm_activities ADD COLUMN grade_schema_version INTEGER NOT NULL DEFAULT 1");
    }
    if (db.prepare("SELECT 1 FROM schema_migrations WHERE name = ?").get(gradeMigrationName)) return { applied: false, changed: 0 };
    const rows = db.prepare("SELECT id, lead_grade FROM inquiries WHERE lead_grade IN ('C', 'D')").all();
    const update = db.prepare("UPDATE inquiries SET lead_grade = ?, version = version + 1 WHERE id = ?");
    const audit = db.prepare(`INSERT INTO crm_activities (inquiry_id, kind, happened_at, content, lead_grade, actor, changes_json, grade_schema_version)
      VALUES (?, 'grade_migration', CURRENT_TIMESTAMP, ?, ?, '系统迁移', ?, 2)`);
    for (const row of rows) {
      const grade = row.lead_grade === "C" ? "D" : "B";
      const before = `旧 ${row.lead_grade} · ${legacyGradeLabels[row.lead_grade]}`;
      const after = `${grade} · ${gradeLabels[grade]}`;
      update.run(grade, row.id);
      audit.run(row.id, `等级定义调整：${before} → ${after}`, grade, JSON.stringify({ grade_definition: { before, after } }));
    }
    // Old previews used old C/D meanings and must be re-uploaded under the new definitions.
    db.exec("UPDATE crm_import_batches SET status = 'expired', sheets_json = NULL, preview_json = NULL WHERE status = 'draft'");
    db.prepare("INSERT INTO schema_migrations(name) VALUES (?)").run(gradeMigrationName);
    return { applied: true, changed: rows.length };
  }).immediate();
}
