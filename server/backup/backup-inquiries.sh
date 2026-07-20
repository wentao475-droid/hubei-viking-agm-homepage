#!/usr/bin/env bash
set -euo pipefail

db_path="${INQUIRY_DB_PATH:-/var/lib/viking-agm/inquiries.db}"
backup_dir="${INQUIRY_BACKUP_DIR:-/var/lib/viking-agm/backups}"
retention_days="${INQUIRY_BACKUP_RETENTION_DAYS:-30}"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
backup_file="${backup_dir}/inquiries-${timestamp}.db"
archive_file="${backup_file}.gz"

mkdir -p "${backup_dir}"
sqlite3 "${db_path}" ".timeout 10000" ".backup '${backup_file}'"
sqlite3 "${backup_file}" "PRAGMA integrity_check;" | grep -qx "ok"
gzip -9 "${backup_file}"
find "${backup_dir}" -type f -name 'inquiries-*.db.gz' -mtime "+${retention_days}" -delete

if [[ -n "${INQUIRY_BACKUP_REMOTE:-}" ]]; then
  if ! command -v rclone >/dev/null 2>&1; then
    echo "INQUIRY_BACKUP_REMOTE is set but rclone is not installed" >&2
    exit 1
  fi
  rclone copy "${archive_file}" "${INQUIRY_BACKUP_REMOTE}"
fi

echo "Created ${archive_file}"
