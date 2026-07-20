#!/usr/bin/env bash
set -euo pipefail

archive="${1:-}"
if [[ -z "${archive}" || ! -f "${archive}" ]]; then
  echo "Usage: $0 /path/to/inquiries-YYYYMMDDTHHMMSSZ.db.gz" >&2
  exit 1
fi

temp_dir="$(mktemp -d)"
trap 'rm -rf "${temp_dir}"' EXIT
restored_db="${temp_dir}/restored.db"

gzip -dc "${archive}" > "${restored_db}"
sqlite3 "${restored_db}" "PRAGMA integrity_check;" | grep -qx "ok"
row_count="$(sqlite3 "${restored_db}" "SELECT COUNT(*) FROM inquiries;")"

echo "Backup restore verified: ${row_count} inquiry rows"
