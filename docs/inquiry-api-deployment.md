# Viking AGM Inquiry API Deployment

The production website is a static Next.js export served by Nginx. The inquiry API is a separate Express service using SQLite, SMTP and an optional Feishu webhook.

## Runtime layout

```text
/opt/viking-agm-inquiry/            API code and .env
/var/lib/viking-agm/inquiries.db    SQLite database
/var/lib/viking-agm/backups/        Daily local backups
/etc/systemd/system/                 API and backup units
```

The service runs as the dedicated `vikingagm` system user. It must not run as root.

## GitHub secrets

Both ECS workflows use:

- `VOLCENGINE_HOST`
- `VOLCENGINE_USER`
- `VOLCENGINE_SSH_KEY`
- `VOLCENGINE_KNOWN_HOSTS`

Create the pinned host entry on a trusted local machine:

```bash
ssh-keyscan -t ed25519 14.103.18.68 > /tmp/viking-known-hosts
ssh-keygen -lf /tmp/viking-known-hosts
cat /tmp/viking-known-hosts
```

Verify that the fingerprint is:

```text
SHA256:VbF3dwXmkxQelK0F/H3U6LWIlaQHtRgBT4u1uVvafQU
```

Store the complete `cat` output as `VOLCENGINE_KNOWN_HOSTS`. Do not use `ssh-keyscan` inside a deployment workflow without fingerprint verification.

## First-time server setup

Install runtime packages:

```bash
apt update
apt install -y nodejs npm sqlite3 rsync
```

Create the service user and directories:

```bash
id -u vikingagm >/dev/null 2>&1 || \
  useradd --system --home /nonexistent --shell /usr/sbin/nologin vikingagm

mkdir -p /opt/viking-agm-inquiry /var/lib/viking-agm
chown vikingagm:vikingagm /var/lib/viking-agm
chmod 750 /var/lib/viking-agm
```

Copy `server/.env.example` to `/opt/viking-agm-inquiry/.env`, then set real values:

```bash
nano /opt/viking-agm-inquiry/.env
chown root:vikingagm /opt/viking-agm-inquiry/.env
chmod 640 /opt/viking-agm-inquiry/.env
```

Required production values:

```text
INQUIRY_ALLOWED_ORIGINS=https://www.vikingagm.com,https://vikingagm.com
INQUIRY_TEST_CONTACTS=your-internal-test-address@example.net
SMTP_HOST=...
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
INQUIRY_TO=vikingsales@vikingagm.com
ADMIN_USERNAME=...
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...
```

Generate the session secret with:

```bash
openssl rand -hex 32
```

## Automatic API deployment

`.github/workflows/deploy-inquiry-api.yml` runs when `server/**` changes on `main`.

It:

1. runs tests, audits and syntax-checks the API;
2. synchronizes code while excluding `.env`, databases and `node_modules`;
3. installs production dependencies;
4. installs systemd, Nginx and backup files;
5. creates and restores a verified SQLite backup before migration;
6. restarts the API and applies idempotent schema migrations;
7. verifies `/health` and `/admin`.

The workflow preserves the existing `.env` and SQLite database.

## Inquiry behavior

The public form requires only:

- name;
- contact information.

Optional fields include company, country, application, product form, message and attribution data.

The API stores the inquiry first and returns HTTP `202` immediately. SMTP and Feishu notifications run asynchronously with a timeout and limited retry. Notification failure does not make the visitor resubmit the form.

New inquiries are classified locally. High-confidence tests, exact 30-day duplicates and unrelated sales solicitations enter grade `E`, remain stored for audit, and skip email and Feishu notifications. All other submissions enter grade `D`; the classifier never assigns `A`, `B` or `C`.

Tracked attribution fields:

- first landing page;
- source page;
- referrer;
- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`.

## Admin dashboard

Open:

```text
https://www.vikingagm.com/admin
```

Lead grades:

```text
A = serving customer
B = negotiating, sampling or quoting
C = confirmed lost
D = valid inquiry requiring contact or qualification
E = test, duplicate, unrelated solicitation or other invalid inquiry
```

The default work queue shows grades A, B and D. C and E have separate filters. The dashboard supports search, single and bulk grading (up to 100 records), notes, next follow-up date, duplicate links, notification diagnostics and CSV export. Reclassifying an E lead does not resend the original notification. Display and daily statistics use `Asia/Shanghai`.

## Nginx

The API workflow installs:

```text
/etc/nginx/conf.d/viking-agm-rate-limit.conf
/etc/nginx/snippets/viking-agm-security-headers.conf
/etc/nginx/snippets/viking-agm-static-cache.conf
/etc/nginx/snippets/viking-agm-inquiry-locations.conf
```

The canonical site config includes those snippets. After a manual Nginx change:

```bash
nginx -t
systemctl reload nginx
```

## Health and submission checks

```bash
curl -i http://127.0.0.1:3001/health

curl -i -X POST https://www.vikingagm.com/api/inquiry \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data "name=BatteryBuyer&contact=buyer@customer-domain.com&company=BatteryCo&application=VRLA&message=Please recommend an AGM separator sample"
```

The public POST should return `202 Accepted`. Confirm the row:

```bash
sqlite3 /var/lib/viking-agm/inquiries.db \
  "select id,name,contact,lead_grade,classification_reason,duplicate_of_id,email_notification_status,created_at from inquiries order by id desc limit 5;"
```

## Daily SQLite backup

The API workflow enables `viking-agm-inquiry-backup.timer`. Check it:

```bash
systemctl list-timers viking-agm-inquiry-backup.timer
systemctl status viking-agm-inquiry-backup.timer
```

Run a backup immediately:

```bash
systemctl start viking-agm-inquiry-backup.service
ls -lh /var/lib/viking-agm/backups/
```

Verify a restore without touching production:

```bash
/opt/viking-agm-inquiry/backup/verify-backup.sh \
  "$(ls -1t /var/lib/viking-agm/backups/inquiries-*.db.gz | head -1)"
```

The command must report `PRAGMA integrity_check` success and a readable inquiry row count.

For an offsite copy, install and configure `rclone`, then create:

```bash
nano /etc/viking-agm-backup.env
```

Example:

```text
RCLONE_CONFIG=/etc/rclone.conf
INQUIRY_BACKUP_REMOTE=remote-name:viking-agm/inquiry-backups
```

Protect the files:

```bash
chown root:vikingagm /etc/viking-agm-backup.env /etc/rclone.conf
chmod 640 /etc/viking-agm-backup.env /etc/rclone.conf
```

Test the remote copy before relying on it:

```bash
systemctl start viking-agm-inquiry-backup.service
journalctl -u viking-agm-inquiry-backup.service -n 50 --no-pager
```
