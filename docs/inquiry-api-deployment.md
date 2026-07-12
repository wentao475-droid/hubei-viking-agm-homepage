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
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

The default application-level form limit is 10 submissions per IP every 10 minutes. Keep the defaults unless a legitimate shared-network workflow requires a higher limit:

```txt
INQUIRY_RATE_LIMIT_WINDOW_MS=600000
INQUIRY_RATE_LIMIT_MAX=10
```

Generate a strong admin session secret:

```bash
openssl rand -hex 32
```

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

## 3. Configure Nginx rate limits and security headers

The rate-limit zone definitions must be loaded in Nginx's `http` context. On Ubuntu, copy the included file into `/etc/nginx/conf.d/`:

```bash
cp /opt/viking-agm-inquiry/nginx/rate-limit.conf /etc/nginx/conf.d/viking-agm-rate-limit.conf
```

Copy the security-header include file:

```bash
cp /opt/viking-agm-inquiry/nginx/security-headers.conf /etc/nginx/snippets/viking-agm-security-headers.conf
```

Inside the HTTPS `server` block for `vikingagm.com`, add:

```nginx
include /etc/nginx/snippets/viking-agm-security-headers.conf;
```

This enables HSTS. Add it only to the HTTPS server block after confirming both `vikingagm.com` and `www.vikingagm.com` work correctly over HTTPS.

## 4. Configure Nginx reverse proxy

Add the included Nginx snippet inside both existing `server` blocks for `vikingagm.com` if you have HTTP and HTTPS blocks:

```bash
cat /opt/viking-agm-inquiry/nginx/inquiry-api-location.conf
```

The location block is:

```nginx
location /api/inquiry {
    limit_req zone=viking_inquiry_per_ip burst=5 nodelay;
    limit_req_status 429;
    proxy_pass http://127.0.0.1:3001/api/inquiry;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location = /admin/login {
    limit_req zone=viking_admin_login_per_ip burst=3 nodelay;
    limit_req_status 429;
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /admin {
    proxy_pass http://127.0.0.1:3001/admin;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Test and reload Nginx after both includes and locations are in place:

```bash
nginx -t
systemctl reload nginx
```

## 5. Test from the server

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

## 6. Inspect inquiries

```bash
sqlite3 /var/lib/viking-agm/inquiries.db \
  "select id,name,contact,company,notification_status,created_at from inquiries order by id desc limit 10;"
```

## 7. Admin dashboard

After setting the admin environment variables and adding the `/admin` Nginx proxy, restart the API:

```bash
systemctl restart viking-agm-inquiry
```

Open:

```txt
https://www.vikingagm.com/admin
```

The dashboard supports search, status filtering, lead details, and marking leads as `new` or `handled`.
