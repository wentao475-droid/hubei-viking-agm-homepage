# Viking AGM Inquiry API Deployment

This site is statically hosted by Nginx. Form submissions are handled by a small Node API that writes to SQLite and sends notifications.

## 1. Install the API on the ECS server

```bash
mkdir -p /opt/viking-agm-inquiry
rsync -az server/ /opt/viking-agm-inquiry/
cd /opt/viking-agm-inquiry
npm ci --omit=dev
cp .env.example .env
nano .env
```

Set real values for:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `INQUIRY_TO`
- optionally `FEISHU_WEBHOOK_URL`

The SQLite database defaults to:

```txt
/var/lib/viking-agm/inquiries.db
```

## 2. Create a systemd service

Copy the included service template:

```bash
cp /opt/viking-agm-inquiry/systemd/viking-agm-inquiry.service /etc/systemd/system/viking-agm-inquiry.service
```

The service content is:

```ini
[Unit]
Description=Viking AGM inquiry API
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/viking-agm-inquiry
EnvironmentFile=/opt/viking-agm-inquiry/.env
ExecStart=/usr/bin/node /opt/viking-agm-inquiry/index.js
Restart=always
RestartSec=5
User=root

[Install]
WantedBy=multi-user.target
```

Start it:

```bash
systemctl daemon-reload
systemctl enable --now viking-agm-inquiry
systemctl status viking-agm-inquiry
```

## 3. Configure Nginx reverse proxy

Add the included Nginx snippet inside the existing `server` block for `vikingagm.com`:

```bash
cat /opt/viking-agm-inquiry/nginx/inquiry-api-location.conf
```

The location block is:

```nginx
location /api/inquiry {
    proxy_pass http://127.0.0.1:3001/api/inquiry;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Then reload:

```bash
nginx -t
systemctl reload nginx
```

## 4. Test from the server

```bash
curl -i -X POST http://127.0.0.1:3001/api/inquiry \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data "name=Test&contact=test@example.com&company=TestCo&message=Hello"
```

Expected response:

```json
{"ok":true,"id":1}
```

If SMTP is not configured yet, the API still stores the inquiry and returns `202` with `notification:"failed"`.

## 5. Inspect inquiries

```bash
sqlite3 /var/lib/viking-agm/inquiries.db \
  "select id,name,contact,company,notification_status,created_at from inquiries order by id desc limit 10;"
```
