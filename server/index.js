import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import process from "node:process";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const dbPath = process.env.INQUIRY_DB_PATH || "/var/lib/viking-agm/inquiries.db";
const allowedOrigins = parseList(process.env.INQUIRY_ALLOWED_ORIGINS);
const inquiryTo = process.env.INQUIRY_TO || "vikingsales@vikingagm.com";
const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
const feishuWebhook = process.env.FEISHU_WEBHOOK_URL || "";
const adminUsername = process.env.ADMIN_USERNAME || "";
const adminPassword = process.env.ADMIN_PASSWORD || "";
const adminSessionSecret = process.env.ADMIN_SESSION_SECRET || "";
const adminConfigured = Boolean(adminUsername && adminPassword && adminSessionSecret);
const adminCookieName = "viking_agm_admin";
const adminSessionTtlMs = 8 * 60 * 60 * 1000;
const inquiryRateLimitWindowMs = positiveIntegerEnv(
  "INQUIRY_RATE_LIMIT_WINDOW_MS",
  10 * 60 * 1000
);
const inquiryRateLimitMax = positiveIntegerEnv("INQUIRY_RATE_LIMIT_MAX", 10);
const inquiryRateLimits = new Map();

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    company TEXT,
    email TEXT,
    country TEXT,
    application TEXT,
    interested_product TEXT,
    message TEXT,
    language TEXT,
    page_url TEXT,
    ip_address TEXT,
    user_agent TEXT,
    notification_status TEXT NOT NULL DEFAULT 'pending',
    notification_error TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    handled_at TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

ensureColumn("status", "TEXT NOT NULL DEFAULT 'new'");
ensureColumn("handled_at", "TEXT");

const insertInquiry = db.prepare(`
  INSERT INTO inquiries (
    name,
    contact,
    company,
    email,
    country,
    application,
    interested_product,
    message,
    language,
    page_url,
    ip_address,
    user_agent
  ) VALUES (
    @name,
    @contact,
    @company,
    @email,
    @country,
    @application,
    @interested_product,
    @message,
    @language,
    @page_url,
    @ip_address,
    @user_agent
  )
`);

const updateNotification = db.prepare(`
  UPDATE inquiries
  SET notification_status = @status,
      notification_error = @error
  WHERE id = @id
`);

const inquiryStats = db.prepare(`
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count,
    SUM(CASE WHEN status = 'handled' THEN 1 ELSE 0 END) AS handled_count,
    SUM(CASE WHEN date(created_at) = date('now') THEN 1 ELSE 0 END) AS today_count
  FROM inquiries
`);

const inquiryById = db.prepare(`
  SELECT *
  FROM inquiries
  WHERE id = ?
`);

const updateInquiryStatus = db.prepare(`
  UPDATE inquiries
  SET status = @status,
      handled_at = CASE WHEN @status = 'handled' THEN CURRENT_TIMESTAMP ELSE NULL END
  WHERE id = @id
`);

const mailer = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  : null;

app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use(express.urlencoded({ extended: false, limit: "32kb" }));
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/inquiry", async (request, response) => {
  response.setHeader("Cache-Control", "no-store");

  if (!isAllowedOrigin(request)) {
    response.status(403).json({ ok: false, error: "forbidden_origin" });
    return;
  }

  const body = normalizeInquiry(request.body || {});
  if (String(request.body?.["bot-field"] || "").trim()) {
    response.status(204).end();
    return;
  }

  if (isInquiryRateLimited(request, response)) {
    return;
  }

  if (!body.name || !body.contact) {
    response.status(400).json({ ok: false, error: "missing_required_fields" });
    return;
  }

  const record = {
    ...body,
    ip_address: request.ip || "",
    user_agent: String(request.get("user-agent") || "").slice(0, 500)
  };

  const result = insertInquiry.run(record);
  const inquiry = { id: Number(result.lastInsertRowid), ...record };

  try {
    await notifyInquiry(inquiry);
    updateNotification.run({ id: inquiry.id, status: "sent", error: null });
    response.status(200).json({ ok: true, id: inquiry.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    updateNotification.run({ id: inquiry.id, status: "failed", error: message.slice(0, 1000) });
    response.status(202).json({ ok: true, id: inquiry.id, notification: "failed" });
  }
});

app.use("/admin", (request, response, next) => {
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
  response.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/admin", (request, response) => {
  if (!adminConfigured) {
    response.status(503).send(renderAdminUnavailable());
    return;
  }

  if (!getAdminSession(request)) {
    response.status(200).send(renderLoginPage());
    return;
  }

  response.status(200).send(renderAdminPage());
});

app.post("/admin/login", (request, response) => {
  if (!adminConfigured) {
    response.status(503).send(renderAdminUnavailable());
    return;
  }

  const username = String(request.body?.username || "");
  const password = String(request.body?.password || "");

  if (!safeEqual(username, adminUsername) || !safeEqual(password, adminPassword)) {
    response.status(401).send(renderLoginPage("Invalid username or password."));
    return;
  }

  setAdminSession(response, request);
  response.redirect(303, "/admin");
});

app.post("/admin/logout", (request, response) => {
  clearAdminSession(response, request);
  response.redirect(303, "/admin");
});

app.get("/admin/api/inquiries", requireAdmin, (request, response) => {
  const page = Math.max(1, Number.parseInt(String(request.query.page || "1"), 10) || 1);
  const pageSize = 20;
  const offset = (page - 1) * pageSize;
  const status = normalizeStatusFilter(request.query.status);
  const q = String(request.query.q || "").trim();
  const where = [];
  const params = {};

  if (status) {
    where.push("status = @status");
    params.status = status;
  }

  if (q) {
    where.push(`(
      name LIKE @q OR
      contact LIKE @q OR
      company LIKE @q OR
      email LIKE @q OR
      country LIKE @q OR
      application LIKE @q OR
      interested_product LIKE @q OR
      message LIKE @q OR
      page_url LIKE @q
    )`);
    params.q = `%${q}%`;
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const total = db.prepare(`SELECT COUNT(*) AS count FROM inquiries ${whereSql}`).get(params).count;
  const rows = db
    .prepare(`
      SELECT
        id,
        name,
        contact,
        company,
        email,
        country,
        application,
        interested_product,
        message,
        language,
        page_url,
        notification_status,
        status,
        handled_at,
        created_at
      FROM inquiries
      ${whereSql}
      ORDER BY datetime(created_at) DESC, id DESC
      LIMIT @limit OFFSET @offset
    `)
    .all({ ...params, limit: pageSize, offset });

  response.json({
    ok: true,
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    stats: normalizeStats(inquiryStats.get()),
    inquiries: rows
  });
});

app.get("/admin/api/inquiries/:id", requireAdmin, (request, response) => {
  const inquiry = inquiryById.get(Number(request.params.id));
  if (!inquiry) {
    response.status(404).json({ ok: false, error: "not_found" });
    return;
  }

  response.json({ ok: true, inquiry });
});

app.post("/admin/api/inquiries/:id/status", requireAdmin, (request, response) => {
  const id = Number(request.params.id);
  const status = normalizeLeadStatus(request.body?.status);

  if (!status) {
    response.status(400).json({ ok: false, error: "invalid_status" });
    return;
  }

  const result = updateInquiryStatus.run({ id, status });
  if (result.changes === 0) {
    response.status(404).json({ ok: false, error: "not_found" });
    return;
  }

  response.json({ ok: true, inquiry: inquiryById.get(id) });
});

app.use((_request, response) => {
  response.status(404).json({ ok: false, error: "not_found" });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Viking AGM inquiry API listening on 127.0.0.1:${port}`);
});

function parseList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function positiveIntegerEnv(name, fallback) {
  const value = Number.parseInt(String(process.env[name] || ""), 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function isInquiryRateLimited(request, response) {
  const now = Date.now();
  const ip = request.ip || "unknown";
  const current = inquiryRateLimits.get(ip);

  if (!current || now >= current.resetAt) {
    inquiryRateLimits.set(ip, { count: 1, resetAt: now + inquiryRateLimitWindowMs });
  } else if (current.count >= inquiryRateLimitMax) {
    const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    response.setHeader("Retry-After", String(retryAfterSeconds));
    response.status(429).json({ ok: false, error: "rate_limited" });
    return true;
  } else {
    current.count += 1;
  }

  if (inquiryRateLimits.size > 1000) {
    for (const [key, entry] of inquiryRateLimits) {
      if (now >= entry.resetAt) {
        inquiryRateLimits.delete(key);
      }
    }
  }

  return false;
}

function ensureColumn(name, definition) {
  const columns = db.prepare("PRAGMA table_info(inquiries)").all();
  if (!columns.some((column) => column.name === name)) {
    db.exec(`ALTER TABLE inquiries ADD COLUMN ${name} ${definition}`);
  }
}

function requireAdmin(request, response, next) {
  if (!adminConfigured) {
    response.status(503).json({ ok: false, error: "admin_not_configured" });
    return;
  }

  if (!getAdminSession(request)) {
    response.status(401).json({ ok: false, error: "unauthorized" });
    return;
  }

  next();
}

function getAdminSession(request) {
  const token = parseCookies(request)[adminCookieName];
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expected = signValue(payload);
  if (!safeEqual(signature, expected)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (session.username !== adminUsername || Number(session.expiresAt) < Date.now()) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function setAdminSession(response, request) {
  const payload = Buffer.from(
    JSON.stringify({
      username: adminUsername,
      expiresAt: Date.now() + adminSessionTtlMs
    })
  ).toString("base64url");
  const token = `${payload}.${signValue(payload)}`;
  const secure = request.get("x-forwarded-proto") === "https";
  response.setHeader(
    "Set-Cookie",
    `${adminCookieName}=${token}; Path=/admin; Max-Age=${Math.floor(
      adminSessionTtlMs / 1000
    )}; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`
  );
}

function clearAdminSession(response, request) {
  const secure = request.get("x-forwarded-proto") === "https";
  response.setHeader(
    "Set-Cookie",
    `${adminCookieName}=; Path=/admin; Max-Age=0; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`
  );
}

function signValue(value) {
  return crypto.createHmac("sha256", adminSessionSecret).update(value).digest("base64url");
}

function parseCookies(request) {
  return String(request.get("cookie") || "")
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const index = cookie.indexOf("=");
      if (index > -1) {
        cookies[cookie.slice(0, index)] = decodeURIComponent(cookie.slice(index + 1));
      }
      return cookies;
    }, {});
}

function safeEqual(value, expected) {
  const left = Buffer.from(String(value));
  const right = Buffer.from(String(expected));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function normalizeStatusFilter(value) {
  const status = String(value || "").trim();
  return status === "new" || status === "handled" ? status : "";
}

function normalizeLeadStatus(value) {
  const status = String(value || "").trim();
  return status === "new" || status === "handled" ? status : "";
}

function normalizeStats(stats) {
  return {
    total: Number(stats?.total || 0),
    new: Number(stats?.new_count || 0),
    handled: Number(stats?.handled_count || 0),
    today: Number(stats?.today_count || 0)
  };
}

function isAllowedOrigin(request) {
  if (allowedOrigins.length === 0) {
    return true;
  }

  const origin = request.get("origin");
  if (!origin) {
    return true;
  }

  return allowedOrigins.includes(origin);
}

function normalizeInquiry(input) {
  const contact = clean(input.contact || input.email || input.phone);

  return {
    name: clean(input.name),
    contact,
    company: clean(input.company),
    email: clean(input.email),
    country: clean(input.country),
    application: clean(input.application),
    interested_product: clean(input.interestedProduct || input.interested_product),
    message: clean(input.message, 5000),
    language: clean(input.language, 20),
    page_url: clean(input.page_url || input.pageUrl, 1000)
  };
}

function clean(value, maxLength = 500) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

async function notifyInquiry(inquiry) {
  const tasks = [];

  if (mailer) {
    tasks.push(sendInquiryEmail(inquiry));
  }

  if (feishuWebhook) {
    tasks.push(sendFeishuMessage(inquiry));
  }

  if (tasks.length === 0) {
    throw new Error("No notification channel configured");
  }

  await Promise.all(tasks);
}

async function sendInquiryEmail(inquiry) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const replyTo = inquiry.email || inquiry.contact || undefined;

  await mailer.sendMail({
    from,
    to: inquiryTo,
    replyTo,
    subject: `Viking AGM website inquiry #${inquiry.id}`,
    text: formatInquiryText(inquiry)
  });
}

async function sendFeishuMessage(inquiry) {
  const response = await fetch(feishuWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      msg_type: "text",
      content: {
        text: formatInquiryText(inquiry)
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Feishu webhook failed with ${response.status}`);
  }
}

function formatInquiryText(inquiry) {
  return [
    `New Viking AGM inquiry #${inquiry.id}`,
    "",
    `Name: ${inquiry.name}`,
    `Contact: ${inquiry.contact}`,
    `Email: ${inquiry.email}`,
    `Company: ${inquiry.company}`,
    `Country: ${inquiry.country}`,
    `Application: ${inquiry.application}`,
    `Interested product: ${inquiry.interested_product}`,
    `Language: ${inquiry.language}`,
    `Page URL: ${inquiry.page_url}`,
    `IP: ${inquiry.ip_address}`,
    `User agent: ${inquiry.user_agent}`,
    "",
    "Message:",
    inquiry.message
  ].join("\n");
}

function renderAdminUnavailable() {
  return renderShell({
    title: "Admin not configured",
    body: `
      <main class="auth-shell">
        <section class="auth-card">
          <p class="eyebrow">Viking AGM Admin</p>
          <h1>Admin is not configured</h1>
          <p class="muted">Set ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the inquiry API environment file, then restart the service.</p>
        </section>
      </main>
    `
  });
}

function renderLoginPage(error = "") {
  return renderShell({
    title: "Viking AGM Admin Login",
    body: `
      <main class="auth-shell">
        <section class="auth-card">
          <div class="brand-mark">V</div>
          <p class="eyebrow">Viking AGM</p>
          <h1>Inquiry Admin</h1>
          <p class="muted">Sign in to review website inquiries and mark leads as handled.</p>
          ${error ? `<div class="alert error">${escapeHtml(error)}</div>` : ""}
          <form method="POST" action="/admin/login" class="login-form">
            <label>
              <span>Username</span>
              <input name="username" autocomplete="username" required autofocus />
            </label>
            <label>
              <span>Password</span>
              <input name="password" type="password" autocomplete="current-password" required />
            </label>
            <button type="submit">Sign in</button>
          </form>
        </section>
      </main>
    `
  });
}

function renderAdminPage() {
  return renderShell({
    title: "Viking AGM Inquiries",
    body: `
      <main class="admin-shell">
        <header class="topbar">
          <div>
            <p class="eyebrow">Viking AGM</p>
            <h1>Inquiry Dashboard</h1>
          </div>
          <form method="POST" action="/admin/logout">
            <button class="ghost-button" type="submit">Logout</button>
          </form>
        </header>

        <section class="stats-grid" aria-label="Inquiry summary">
          <article class="stat-card"><span>Total</span><strong id="stat-total">-</strong></article>
          <article class="stat-card"><span>New</span><strong id="stat-new">-</strong></article>
          <article class="stat-card"><span>Handled</span><strong id="stat-handled">-</strong></article>
          <article class="stat-card"><span>Today</span><strong id="stat-today">-</strong></article>
        </section>

        <section class="panel">
          <div class="toolbar">
            <label class="search-field">
              <span>Search inquiries</span>
              <input id="search" type="search" placeholder="Name, company, contact, message..." />
            </label>
            <label class="filter-field">
              <span>Status</span>
              <select id="status-filter">
                <option value="">All</option>
                <option value="new">New</option>
                <option value="handled">Handled</option>
              </select>
            </label>
          </div>

          <div id="status-message" class="status-message">Loading inquiries...</div>
          <div id="inquiry-list" class="inquiry-list"></div>
          <div class="pagination">
            <button id="prev-page" class="secondary-button" type="button">Previous</button>
            <span id="page-label">Page 1</span>
            <button id="next-page" class="secondary-button" type="button">Next</button>
          </div>
        </section>

        <aside id="detail-drawer" class="drawer" aria-hidden="true">
          <div class="drawer-backdrop" data-close-detail></div>
          <section class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <button class="close-button" type="button" data-close-detail>Close</button>
            <div id="detail-content"></div>
          </section>
        </aside>
      </main>
      <script>
        ${adminClientScript()}
      </script>
    `
  });
}

function renderShell({ title, body }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        --ink: #172033;
        --graphite: #263241;
        --steel: #5b6877;
        --line: #d9e1ea;
        --frost: #f5f7fa;
        --signal: #0e6eb8;
        --copper: #b7791f;
        --shadow: 0 22px 70px rgba(23, 32, 51, 0.14);
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--frost);
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      button, input, select, textarea { font: inherit; }
      button { cursor: pointer; }

      .auth-shell {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background:
          radial-gradient(circle at 80% 18%, rgba(14, 110, 184, 0.16), transparent 30%),
          linear-gradient(180deg, #ffffff 0%, var(--frost) 100%);
      }
      .auth-card {
        width: min(440px, 100%);
        border: 1px solid var(--line);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.94);
        padding: 32px;
        box-shadow: var(--shadow);
      }
      .brand-mark {
        display: grid;
        width: 44px;
        height: 44px;
        place-items: center;
        border-radius: 8px;
        background: var(--signal);
        color: #fff;
        font-weight: 900;
        margin-bottom: 18px;
      }
      .eyebrow {
        margin: 0 0 8px;
        color: var(--signal);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        color: var(--ink);
        font-size: clamp(28px, 4vw, 40px);
        line-height: 1;
      }
      .muted {
        margin: 16px 0 0;
        color: var(--steel);
        line-height: 1.7;
      }
      .alert {
        margin-top: 20px;
        border-radius: 8px;
        padding: 12px 14px;
        font-size: 14px;
        font-weight: 700;
      }
      .alert.error {
        border: 1px solid #fecaca;
        background: #fef2f2;
        color: #991b1b;
      }
      .login-form {
        display: grid;
        gap: 16px;
        margin-top: 24px;
      }
      label span {
        display: block;
        margin-bottom: 8px;
        color: var(--graphite);
        font-size: 13px;
        font-weight: 800;
      }
      input, select {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--frost);
        color: var(--ink);
        padding: 12px 14px;
        outline: none;
      }
      input:focus, select:focus {
        border-color: var(--signal);
        background: #fff;
      }
      .login-form button,
      .primary-button {
        border: 0;
        border-radius: 8px;
        background: var(--signal);
        color: #fff;
        padding: 13px 18px;
        font-weight: 800;
      }

      .admin-shell {
        width: min(1360px, 100%);
        margin: 0 auto;
        padding: 28px;
      }
      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 22px;
      }
      .ghost-button,
      .secondary-button,
      .close-button {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
        color: var(--graphite);
        padding: 10px 14px;
        font-weight: 800;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
        margin-bottom: 18px;
      }
      .stat-card {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
        padding: 18px;
        box-shadow: 0 8px 24px rgba(23, 32, 51, 0.06);
      }
      .stat-card span {
        color: var(--steel);
        font-size: 13px;
        font-weight: 800;
      }
      .stat-card strong {
        display: block;
        margin-top: 8px;
        color: var(--ink);
        font-size: 30px;
      }
      .panel {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
        padding: 18px;
        box-shadow: var(--shadow);
      }
      .toolbar {
        display: grid;
        grid-template-columns: minmax(260px, 1fr) 180px;
        gap: 14px;
        align-items: end;
        margin-bottom: 14px;
      }
      .status-message {
        border-radius: 8px;
        background: var(--frost);
        color: var(--steel);
        padding: 12px 14px;
        font-weight: 700;
      }
      .inquiry-list {
        margin-top: 14px;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 8px;
      }
      .table-head,
      .inquiry-row {
        display: grid;
        grid-template-columns: 150px 1.1fr 1fr 1fr 1fr 120px;
        gap: 14px;
        align-items: center;
      }
      .table-head {
        background: var(--frost);
        color: var(--steel);
        padding: 12px 14px;
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
      }
      .inquiry-row {
        width: 100%;
        border: 0;
        border-top: 1px solid var(--line);
        background: #fff;
        padding: 14px;
        color: var(--graphite);
        text-align: left;
      }
      .inquiry-row:hover {
        background: #f8fbff;
      }
      .cell-main {
        color: var(--ink);
        font-weight: 900;
      }
      .cell-sub {
        margin-top: 4px;
        color: var(--steel);
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 900;
      }
      .badge.new { background: #e8f4ff; color: var(--signal); }
      .badge.handled { background: #ecfdf3; color: #166534; }
      .badge.failed { background: #fef2f2; color: #991b1b; }
      .badge.sent { background: #ecfdf3; color: #166534; }
      .pagination {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;
        margin-top: 16px;
        color: var(--steel);
        font-weight: 800;
      }
      .secondary-button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .drawer {
        position: fixed;
        inset: 0;
        display: none;
        z-index: 50;
      }
      .drawer.open {
        display: block;
      }
      .drawer-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(23, 32, 51, 0.42);
      }
      .drawer-panel {
        position: absolute;
        inset: 20px 20px 20px auto;
        width: min(560px, calc(100vw - 40px));
        overflow: auto;
        border-radius: 8px;
        background: #fff;
        padding: 22px;
        box-shadow: var(--shadow);
      }
      .close-button {
        float: right;
      }
      .detail-title {
        margin: 0 0 6px;
        font-size: 26px;
      }
      .detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 18px;
      }
      .detail-item,
      .message-box {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--frost);
        padding: 12px;
      }
      .detail-item span,
      .message-box span {
        display: block;
        color: var(--steel);
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
      }
      .detail-item strong,
      .message-box p {
        display: block;
        margin: 6px 0 0;
        color: var(--ink);
        line-height: 1.55;
        overflow-wrap: anywhere;
      }
      .message-box {
        margin-top: 12px;
      }
      .detail-actions {
        display: flex;
        gap: 10px;
        margin-top: 18px;
      }

      @media (max-width: 860px) {
        .admin-shell { padding: 18px; }
        .topbar { align-items: flex-start; }
        .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .toolbar { grid-template-columns: 1fr; }
        .table-head { display: none; }
        .inquiry-list { border: 0; display: grid; gap: 12px; }
        .inquiry-row {
          display: block;
          border: 1px solid var(--line);
          border-radius: 8px;
        }
        .inquiry-row > span { display: block; margin-top: 10px; }
        .drawer-panel { inset: 0; width: 100%; border-radius: 0; }
        .detail-grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>${body}</body>
</html>`;
}

function adminClientScript() {
  return `
const state = { page: 1, totalPages: 1, q: "", status: "" };
const list = document.getElementById("inquiry-list");
const statusMessage = document.getElementById("status-message");
const search = document.getElementById("search");
const statusFilter = document.getElementById("status-filter");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const pageLabel = document.getElementById("page-label");
const drawer = document.getElementById("detail-drawer");
const detailContent = document.getElementById("detail-content");
let searchTimer;

document.querySelectorAll("[data-close-detail]").forEach((node) => {
  node.addEventListener("click", closeDetail);
});

search.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.q = search.value.trim();
    state.page = 1;
    loadInquiries();
  }, 240);
});

statusFilter.addEventListener("change", () => {
  state.status = statusFilter.value;
  state.page = 1;
  loadInquiries();
});

prevPage.addEventListener("click", () => {
  if (state.page > 1) {
    state.page -= 1;
    loadInquiries();
  }
});

nextPage.addEventListener("click", () => {
  if (state.page < state.totalPages) {
    state.page += 1;
    loadInquiries();
  }
});

loadInquiries();

async function loadInquiries() {
  statusMessage.textContent = "Loading inquiries...";
  const params = new URLSearchParams({
    page: String(state.page),
    q: state.q,
    status: state.status
  });
  const response = await fetch("/admin/api/inquiries?" + params.toString());
  if (!response.ok) {
    statusMessage.textContent = "Could not load inquiries. Please sign in again.";
    return;
  }
  const data = await response.json();
  state.totalPages = data.totalPages;
  renderStats(data.stats);
  renderList(data.inquiries);
  statusMessage.textContent = data.total ? data.total + " inquiry records" : "No inquiries found";
  pageLabel.textContent = "Page " + data.page + " / " + data.totalPages;
  prevPage.disabled = data.page <= 1;
  nextPage.disabled = data.page >= data.totalPages;
}

function renderStats(stats) {
  document.getElementById("stat-total").textContent = stats.total;
  document.getElementById("stat-new").textContent = stats.new;
  document.getElementById("stat-handled").textContent = stats.handled;
  document.getElementById("stat-today").textContent = stats.today;
}

function renderList(inquiries) {
  if (!inquiries.length) {
    list.innerHTML = "";
    return;
  }
  list.innerHTML = [
    '<div class="table-head"><span>Time</span><span>Lead</span><span>Company</span><span>Product / Application</span><span>Source</span><span>Status</span></div>',
    ...inquiries.map((item) => {
      const product = item.interested_product || item.application || "-";
      return '<button type="button" class="inquiry-row" data-id="' + item.id + '">' +
        '<span><span class="cell-main">' + formatDate(item.created_at) + '</span><span class="cell-sub">#' + item.id + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(item.name || "-") + '</span><span class="cell-sub">' + escapeHtml(item.contact || item.email || "-") + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(item.company || "-") + '</span><span class="cell-sub">' + escapeHtml(item.country || "") + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(product) + '</span><span class="cell-sub">' + escapeHtml((item.message || "").slice(0, 90)) + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(item.language || "-") + '</span><span class="cell-sub">' + escapeHtml(compactUrl(item.page_url)) + '</span></span>' +
        '<span><span class="badge ' + item.status + '">' + item.status + '</span></span>' +
      '</button>';
    })
  ].join("");
  list.querySelectorAll(".inquiry-row").forEach((row) => {
    row.addEventListener("click", () => openDetail(row.dataset.id));
  });
}

async function openDetail(id) {
  detailContent.innerHTML = "<p class='muted'>Loading inquiry...</p>";
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  const response = await fetch("/admin/api/inquiries/" + id);
  if (!response.ok) {
    detailContent.innerHTML = "<p class='muted'>Inquiry not found.</p>";
    return;
  }
  const data = await response.json();
  renderDetail(data.inquiry);
}

function closeDetail() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function renderDetail(item) {
  const nextStatus = item.status === "handled" ? "new" : "handled";
  const actionLabel = item.status === "handled" ? "Mark as new" : "Mark as handled";
  detailContent.innerHTML =
    '<h2 id="detail-title" class="detail-title">' + escapeHtml(item.name || "Inquiry #" + item.id) + '</h2>' +
    '<span class="badge ' + item.status + '">' + item.status + '</span> ' +
    '<span class="badge ' + item.notification_status + '">' + item.notification_status + '</span>' +
    '<div class="detail-grid">' +
      detailItem("Created", formatDate(item.created_at)) +
      detailItem("Contact", item.contact) +
      detailItem("Company", item.company) +
      detailItem("Email", item.email) +
      detailItem("Country", item.country) +
      detailItem("Application", item.application) +
      detailItem("Interested product", item.interested_product) +
      detailItem("Language", item.language) +
      detailItem("Page URL", item.page_url) +
      detailItem("Handled at", item.handled_at) +
      detailItem("IP", item.ip_address) +
      detailItem("User agent", item.user_agent) +
    '</div>' +
    '<div class="message-box"><span>Message</span><p>' + escapeHtml(item.message || "-") + '</p></div>' +
    (item.notification_error ? '<div class="message-box"><span>Notification error</span><p>' + escapeHtml(item.notification_error) + '</p></div>' : '') +
    '<div class="detail-actions"><button class="primary-button" type="button" id="toggle-status">' + actionLabel + '</button></div>';
  document.getElementById("toggle-status").addEventListener("click", () => updateStatus(item.id, nextStatus));
}

async function updateStatus(id, status) {
  const response = await fetch("/admin/api/inquiries/" + id + "/status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  renderDetail(data.inquiry);
  loadInquiries();
}

function detailItem(label, value) {
  return '<div class="detail-item"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value || "-") + '</strong></div>';
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value) {
  if (!value) return "-";
  return String(value).replace("T", " ").replace(".000Z", "").slice(0, 16);
}

function compactUrl(value) {
  if (!value) return "-";
  try {
    const url = new URL(value);
    return url.pathname || "/";
  } catch {
    return value;
  }
}
`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
