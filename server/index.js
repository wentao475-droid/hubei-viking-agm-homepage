import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import {
  renderAdminPage,
  renderAdminUnavailable,
  renderLoginPage
} from "./admin-ui.js";
import {
  classifyInquiry,
  createMessageFingerprint,
  normalizeContactIdentity,
  normalizeTestContacts
} from "./inquiry-classifier.js";
import { applyLeadGradeMigration } from "./lead-grade-migration.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const dbPath = process.env.INQUIRY_DB_PATH || "/var/lib/viking-agm/inquiries.db";
const allowedOrigins = parseList(process.env.INQUIRY_ALLOWED_ORIGINS);
const inquiryTo = process.env.INQUIRY_TO || "vikingsales@vikingagm.com";
const smtpConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
);
const feishuWebhook = process.env.FEISHU_WEBHOOK_URL || "";
const notificationRetryAttempts = Math.min(
  positiveIntegerEnv("NOTIFICATION_RETRY_ATTEMPTS", 2),
  3
);
const notificationTimeoutMs = positiveIntegerEnv(
  "NOTIFICATION_TIMEOUT_MS",
  10_000
);
const adminUsername = process.env.ADMIN_USERNAME || "";
const adminPassword = process.env.ADMIN_PASSWORD || "";
const adminSessionSecret = process.env.ADMIN_SESSION_SECRET || "";
const adminConfigured = Boolean(
  adminUsername && adminPassword && adminSessionSecret
);
const adminCookieName = "viking_agm_admin";
const adminSessionTtlMs = 8 * 60 * 60 * 1000;
const inquiryRateLimitWindowMs = positiveIntegerEnv(
  "INQUIRY_RATE_LIMIT_WINDOW_MS",
  10 * 60 * 1000
);
const inquiryRateLimitMax = positiveIntegerEnv("INQUIRY_RATE_LIMIT_MAX", 10);
const inquiryRateLimits = new Map();
const leadGrades = new Set(["A", "B", "C", "D", "E"]);
const inquiryTestContacts = normalizeTestContacts(
  process.env.INQUIRY_TEST_CONTACTS
);
const legacyStatusGrades = new Map([
  ["won", "A"],
  ["qualified", "B"],
  ["sample", "B"],
  ["quoted", "B"],
  ["lost", "C"],
  ["new", "D"],
  ["contacted", "D"],
  ["handled", "D"]
]);

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
    landing_page TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    ip_address TEXT,
    user_agent TEXT,
    notification_status TEXT NOT NULL DEFAULT 'pending',
    notification_error TEXT,
    email_notification_status TEXT NOT NULL DEFAULT 'pending',
    email_notification_error TEXT,
    feishu_notification_status TEXT NOT NULL DEFAULT 'skipped',
    feishu_notification_error TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    notes TEXT,
    next_follow_up_at TEXT,
    handled_at TEXT,
    lead_grade TEXT NOT NULL DEFAULT 'D',
    classification_source TEXT NOT NULL DEFAULT 'automatic',
    classification_reason TEXT,
    duplicate_of_id INTEGER,
    classified_at TEXT,
    contact_identity TEXT,
    message_fingerprint TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

for (const [name, definition] of [
  ["status", "TEXT NOT NULL DEFAULT 'new'"],
  ["handled_at", "TEXT"],
  ["landing_page", "TEXT"],
  ["referrer", "TEXT"],
  ["utm_source", "TEXT"],
  ["utm_medium", "TEXT"],
  ["utm_campaign", "TEXT"],
  ["utm_content", "TEXT"],
  ["utm_term", "TEXT"],
  ["email_notification_status", "TEXT NOT NULL DEFAULT 'pending'"],
  ["email_notification_error", "TEXT"],
  ["feishu_notification_status", "TEXT NOT NULL DEFAULT 'skipped'"],
  ["feishu_notification_error", "TEXT"],
  ["notes", "TEXT"],
  ["next_follow_up_at", "TEXT"]
]) {
  ensureColumn(name, definition);
}

db.exec(`
  UPDATE inquiries
  SET status = 'contacted'
  WHERE status = 'handled';

  UPDATE inquiries
  SET email_notification_status = notification_status
  WHERE notification_status IN ('sent', 'failed')
    AND email_notification_status = 'pending';
`);

applyLeadGradeMigration(db);

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
    landing_page,
    referrer,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    ip_address,
    user_agent,
    lead_grade,
    classification_source,
    classification_reason,
    duplicate_of_id,
    classified_at,
    contact_identity,
    message_fingerprint,
    notification_status,
    email_notification_status,
    feishu_notification_status
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
    @landing_page,
    @referrer,
    @utm_source,
    @utm_medium,
    @utm_campaign,
    @utm_content,
    @utm_term,
    @ip_address,
    @user_agent,
    @lead_grade,
    @classification_source,
    @classification_reason,
    @duplicate_of_id,
    CURRENT_TIMESTAMP,
    @contact_identity,
    @message_fingerprint,
    @notification_status,
    @email_notification_status,
    @feishu_notification_status
  )
`);

const duplicateInquiry = db.prepare(`
  SELECT id
  FROM inquiries
  WHERE contact_identity = @contact_identity
    AND message_fingerprint = @message_fingerprint
    AND message_fingerprint <> ''
    AND datetime(created_at) >= datetime('now', '-30 days')
  ORDER BY datetime(created_at) ASC, id ASC
  LIMIT 1
`);

const updateEmailNotification = db.prepare(`
  UPDATE inquiries
  SET email_notification_status = @status,
      email_notification_error = @error
  WHERE id = @id
`);

const updateFeishuNotification = db.prepare(`
  UPDATE inquiries
  SET feishu_notification_status = @status,
      feishu_notification_error = @error
  WHERE id = @id
`);

const updateAggregateNotification = db.prepare(`
  UPDATE inquiries
  SET notification_status = @status,
      notification_error = @error
  WHERE id = @id
`);

const inquiryStats = db.prepare(`
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN lead_grade = 'A' THEN 1 ELSE 0 END) AS grade_a,
    SUM(CASE WHEN lead_grade = 'B' THEN 1 ELSE 0 END) AS grade_b,
    SUM(CASE WHEN lead_grade = 'C' THEN 1 ELSE 0 END) AS grade_c,
    SUM(CASE WHEN lead_grade = 'D' THEN 1 ELSE 0 END) AS grade_d,
    SUM(CASE WHEN lead_grade = 'E' THEN 1 ELSE 0 END) AS grade_e,
    SUM(
      CASE
        WHEN date(datetime(created_at, '+8 hours')) = date('now', '+8 hours')
        THEN 1
        ELSE 0
      END
    ) AS today_count
  FROM inquiries
`);

const inquiryById = db.prepare(`
  SELECT *
  FROM inquiries
  WHERE id = ?
`);

const updateInquiry = db.prepare(`
  UPDATE inquiries
  SET lead_grade = @lead_grade,
      classification_source = 'manual',
      classification_reason = @classification_reason,
      duplicate_of_id = CASE
        WHEN @lead_grade = 'E' THEN duplicate_of_id
        ELSE NULL
      END,
      classified_at = CURRENT_TIMESTAMP,
      notes = @notes,
      next_follow_up_at = @next_follow_up_at,
      handled_at = CASE
        WHEN @lead_grade = 'D' THEN NULL
        ELSE COALESCE(handled_at, CURRENT_TIMESTAMP)
      END
  WHERE id = @id
`);

const bulkUpdateInquiryGrade = db.prepare(`
  UPDATE inquiries
  SET lead_grade = @lead_grade,
      classification_source = 'manual',
      classification_reason = @classification_reason,
      duplicate_of_id = CASE
        WHEN @lead_grade = 'E' THEN duplicate_of_id
        ELSE NULL
      END,
      classified_at = CURRENT_TIMESTAMP,
      handled_at = CASE
        WHEN @lead_grade = 'D' THEN NULL
        ELSE COALESCE(handled_at, CURRENT_TIMESTAMP)
      END
  WHERE id = @id
`);

const mailer = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      connectionTimeout: notificationTimeoutMs,
      greetingTimeout: notificationTimeoutMs,
      socketTimeout: notificationTimeoutMs,
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

app.post("/api/inquiry", (request, response) => {
  response.setHeader("Cache-Control", "no-store");

  if (!isAllowedOrigin(request)) {
    response.status(403).json({ ok: false, error: "forbidden_origin" });
    return;
  }

  if (String(request.body?.["bot-field"] || "").trim()) {
    response.status(204).end();
    return;
  }

  if (isInquiryRateLimited(request, response)) {
    return;
  }

  const body = normalizeInquiry(request.body || {});
  if (!body.name || !body.contact) {
    response.status(400).json({ ok: false, error: "missing_required_fields" });
    return;
  }

  const record = {
    ...body,
    ip_address: request.ip || "",
    user_agent: clean(request.get("user-agent"), 500)
  };
  const contactIdentity = normalizeContactIdentity(record);
  const messageFingerprint = createMessageFingerprint(record.message);
  const duplicate =
    contactIdentity && messageFingerprint
      ? duplicateInquiry.get({
          contact_identity: contactIdentity,
          message_fingerprint: messageFingerprint
        })
      : null;
  const classification = classifyInquiry({
    inquiry: record,
    duplicateOfId: duplicate?.id || null,
    testContacts: inquiryTestContacts
  });
  const skipNotifications = classification.lead_grade === "E";
  const storedRecord = {
    ...record,
    ...classification,
    contact_identity: contactIdentity,
    message_fingerprint: messageFingerprint,
    notification_status: skipNotifications ? "skipped" : "pending",
    email_notification_status: skipNotifications ? "skipped" : "pending",
    feishu_notification_status: skipNotifications
      ? "skipped"
      : feishuWebhook
        ? "pending"
        : "skipped"
  };
  const result = insertInquiry.run(storedRecord);
  const inquiry = { id: Number(result.lastInsertRowid), ...storedRecord };

  response.status(202).json({ ok: true, id: inquiry.id });

  if (!skipNotifications) {
    setImmediate(() => {
      processInquiryNotifications(inquiry).catch((error) => {
        console.error(
          `Inquiry #${inquiry.id} notification processing failed`,
          error
        );
      });
    });
  }
});

app.use("/admin", (_request, response, next) => {
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

  if (
    !safeEqual(username, adminUsername) ||
    !safeEqual(password, adminPassword)
  ) {
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

app.get("/admin/api/inquiries.csv", requireAdmin, (request, response) => {
  const grade = normalizeGradeFilter(
    request.query.grade ?? request.query.status,
    "work"
  );
  const q = clean(request.query.q);
  const { whereSql, params } = buildInquiryFilter({ grade, q });
  const rows = db
    .prepare(`
      SELECT *
      FROM inquiries
      ${whereSql}
      ORDER BY datetime(created_at) DESC, id DESC
    `)
    .all(params);

  const columns = [
    "id",
    "created_at",
    "lead_grade",
    "classification_source",
    "classification_reason",
    "duplicate_of_id",
    "classified_at",
    "status",
    "name",
    "contact",
    "company",
    "email",
    "country",
    "application",
    "interested_product",
    "message",
    "page_url",
    "landing_page",
    "referrer",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "notes",
    "next_follow_up_at",
    "notification_status",
    "email_notification_status",
    "feishu_notification_status"
  ];
  const csv = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))
  ].join("\r\n");

  response.setHeader(
    "Content-Disposition",
    `attachment; filename="viking-agm-inquiries-${new Date()
      .toISOString()
      .slice(0, 10)}.csv"`
  );
  response.type("text/csv; charset=utf-8").send(`\uFEFF${csv}`);
});

app.get("/admin/api/inquiries", requireAdmin, (request, response) => {
  const page = Math.max(
    1,
    Number.parseInt(String(request.query.page || "1"), 10) || 1
  );
  const pageSize = 20;
  const offset = (page - 1) * pageSize;
  const grade = normalizeGradeFilter(
    request.query.grade ?? request.query.status,
    "work"
  );
  const q = clean(request.query.q);
  const { whereSql, params } = buildInquiryFilter({ grade, q });
  const total = db
    .prepare(`SELECT COUNT(*) AS count FROM inquiries ${whereSql}`)
    .get(params).count;
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
        landing_page,
        referrer,
        utm_source,
        notification_status,
        lead_grade,
        classification_source,
        classification_reason,
        duplicate_of_id,
        status,
        next_follow_up_at,
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

app.post("/admin/api/inquiries/bulk-grade", requireAdmin, (request, response) => {
  const leadGrade = normalizeLeadGrade(
    request.body?.lead_grade ?? request.body?.grade ?? request.body?.status
  );
  const ids = Array.isArray(request.body?.ids)
    ? [...new Set(request.body.ids.map(Number).filter(Number.isInteger))]
    : [];

  if (!leadGrade) {
    response.status(400).json({ ok: false, error: "invalid_grade" });
    return;
  }
  if (ids.length === 0 || ids.length > 100) {
    response.status(400).json({ ok: false, error: "invalid_selection" });
    return;
  }

  const updateMany = db.transaction((selectedIds) => {
    let changes = 0;
    for (const id of selectedIds) {
      changes += bulkUpdateInquiryGrade.run({
        id,
        lead_grade: leadGrade,
        classification_reason: manualClassificationReason(leadGrade)
      }).changes;
    }
    return changes;
  });

  response.json({ ok: true, updated: updateMany(ids) });
});

app.get("/admin/api/inquiries/:id", requireAdmin, (request, response) => {
  const inquiry = inquiryById.get(Number(request.params.id));
  if (!inquiry) {
    response.status(404).json({ ok: false, error: "not_found" });
    return;
  }

  response.json({ ok: true, inquiry });
});

app.post("/admin/api/inquiries/:id/update", requireAdmin, (request, response) => {
  const id = Number(request.params.id);
  const leadGrade = normalizeLeadGrade(
    request.body?.lead_grade ?? request.body?.grade ?? request.body?.status
  );

  if (!leadGrade) {
    response.status(400).json({ ok: false, error: "invalid_grade" });
    return;
  }

  const result = updateInquiry.run({
    id,
    lead_grade: leadGrade,
    classification_reason: manualClassificationReason(leadGrade),
    notes: clean(request.body?.notes, 5000),
    next_follow_up_at:
      clean(request.body?.next_follow_up_at, 30) || null
  });
  if (result.changes === 0) {
    response.status(404).json({ ok: false, error: "not_found" });
    return;
  }

  response.json({ ok: true, inquiry: inquiryById.get(id) });
});

app.post("/admin/api/inquiries/:id/status", requireAdmin, (request, response) => {
  const id = Number(request.params.id);
  const existing = inquiryById.get(id);
  const leadGrade = normalizeLeadGrade(
    request.body?.lead_grade ?? request.body?.grade ?? request.body?.status
  );

  if (!existing) {
    response.status(404).json({ ok: false, error: "not_found" });
    return;
  }

  if (!leadGrade) {
    response.status(400).json({ ok: false, error: "invalid_grade" });
    return;
  }

  updateInquiry.run({
    id,
    lead_grade: leadGrade,
    classification_reason: manualClassificationReason(leadGrade),
    notes: existing.notes || "",
    next_follow_up_at: existing.next_follow_up_at || null
  });
  response.json({ ok: true, inquiry: inquiryById.get(id) });
});

app.use((_request, response) => {
  response.status(404).json({ ok: false, error: "not_found" });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Viking AGM inquiry API listening on 127.0.0.1:${port}`);
});

function buildInquiryFilter({ grade, q }) {
  const where = [];
  const params = {};

  if (grade === "work") {
    where.push("lead_grade IN ('A', 'B', 'D')");
  } else if (leadGrades.has(grade)) {
    where.push("lead_grade = @grade");
    params.grade = grade;
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
      page_url LIKE @q OR
      landing_page LIKE @q OR
      referrer LIKE @q OR
      utm_source LIKE @q OR
      utm_medium LIKE @q OR
      utm_campaign LIKE @q OR
      classification_reason LIKE @q OR
      notes LIKE @q
    )`);
    params.q = `%${q}%`;
  }

  return {
    whereSql: where.length ? `WHERE ${where.join(" AND ")}` : "",
    params
  };
}

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
    inquiryRateLimits.set(ip, {
      count: 1,
      resetAt: now + inquiryRateLimitWindowMs
    });
  } else if (current.count >= inquiryRateLimitMax) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((current.resetAt - now) / 1000)
    );
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
  if (!payload || !signature || !safeEqual(signature, signValue(payload))) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );
    if (
      session.username !== adminUsername ||
      Number(session.expiresAt) < Date.now()
    ) {
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
    `${adminCookieName}=; Path=/admin; Max-Age=0; HttpOnly; SameSite=Lax${
      secure ? "; Secure" : ""
    }`
  );
}

function signValue(value) {
  return crypto
    .createHmac("sha256", adminSessionSecret)
    .update(value)
    .digest("base64url");
}

function parseCookies(request) {
  return String(request.get("cookie") || "")
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const index = cookie.indexOf("=");
      if (index > -1) {
        cookies[cookie.slice(0, index)] = decodeURIComponent(
          cookie.slice(index + 1)
        );
      }
      return cookies;
    }, {});
}

function safeEqual(value, expected) {
  const left = Buffer.from(String(value));
  const right = Buffer.from(String(expected));
  return (
    left.length === right.length && crypto.timingSafeEqual(left, right)
  );
}

function normalizeGradeFilter(value, fallback = "all") {
  const raw = clean(value, 30);
  if (!raw) {
    return fallback;
  }
  if (raw.toLowerCase() === "work") {
    return "work";
  }
  if (raw.toLowerCase() === "all") {
    return "all";
  }

  return normalizeLeadGrade(raw) || fallback;
}

function normalizeLeadGrade(value) {
  const raw = clean(value, 30);
  const grade = raw.toUpperCase();
  if (leadGrades.has(grade)) {
    return grade;
  }

  return legacyStatusGrades.get(raw.toLowerCase()) || "";
}

function manualClassificationReason(leadGrade) {
  return leadGrade === "E" ? "manual_invalid" : "manual_override";
}

function normalizeStats(stats) {
  return {
    total: Number(stats?.total || 0),
    A: Number(stats?.grade_a || 0),
    B: Number(stats?.grade_b || 0),
    C: Number(stats?.grade_c || 0),
    D: Number(stats?.grade_d || 0),
    E: Number(stats?.grade_e || 0),
    today: Number(stats?.today_count || 0)
  };
}

function isAllowedOrigin(request) {
  if (allowedOrigins.length === 0) {
    return true;
  }

  const origin = request.get("origin");
  return !origin || allowedOrigins.includes(origin);
}

function normalizeInquiry(input) {
  const contact = clean(input.contact || input.email || input.phone);
  const email = clean(
    input.email || (isEmailAddress(contact) ? contact : "")
  );

  return {
    name: clean(input.name),
    contact,
    company: clean(input.company),
    email,
    country: clean(input.country),
    application: clean(input.application),
    interested_product: clean(
      input.interestedProduct || input.interested_product
    ),
    message: clean(input.message, 5000),
    language: clean(input.language, 20),
    page_url: clean(input.page_url || input.pageUrl, 1000),
    landing_page: clean(input.landing_page || input.landingPage, 1000),
    referrer: clean(input.referrer, 1000),
    utm_source: clean(input.utm_source, 300),
    utm_medium: clean(input.utm_medium, 300),
    utm_campaign: clean(input.utm_campaign, 300),
    utm_content: clean(input.utm_content, 300),
    utm_term: clean(input.utm_term, 300)
  };
}

function clean(value, maxLength = 500) {
  return String(value || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function isEmailAddress(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

async function processInquiryNotifications(inquiry) {
  const tasks = [];

  if (mailer) {
    tasks.push(
      runNotificationChannel({
        inquiry,
        channel: "email",
        task: () => sendInquiryEmail(inquiry)
      })
    );
  } else {
    updateEmailNotification.run({
      id: inquiry.id,
      status: "skipped",
      error: null
    });
  }

  if (feishuWebhook) {
    tasks.push(
      runNotificationChannel({
        inquiry,
        channel: "feishu",
        task: () => sendFeishuMessage(inquiry)
      })
    );
  } else {
    updateFeishuNotification.run({
      id: inquiry.id,
      status: "skipped",
      error: null
    });
  }

  await Promise.allSettled(tasks);
  updateAggregateNotificationStatus(inquiry.id);
}

async function runNotificationChannel({ inquiry, channel, task }) {
  const update =
    channel === "email" ? updateEmailNotification : updateFeishuNotification;
  update.run({ id: inquiry.id, status: "pending", error: null });

  try {
    await runWithRetry(task, notificationRetryAttempts);
    update.run({ id: inquiry.id, status: "sent", error: null });
  } catch (error) {
    update.run({
      id: inquiry.id,
      status: "failed",
      error: errorMessage(error)
    });
    throw error;
  }
}

async function runWithRetry(task, attempts) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await sleep(700 * attempt);
      }
    }
  }

  throw lastError;
}

function updateAggregateNotificationStatus(id) {
  const inquiry = inquiryById.get(id);
  const statuses = [
    inquiry.email_notification_status,
    inquiry.feishu_notification_status
  ].filter((status) => status !== "skipped");
  let status = "skipped";

  if (statuses.length > 0 && statuses.every((value) => value === "sent")) {
    status = "sent";
  } else if (statuses.some((value) => value === "pending")) {
    status = "pending";
  } else if (statuses.some((value) => value === "sent")) {
    status = "partial";
  } else if (statuses.length > 0) {
    status = "failed";
  }

  const errors = [
    inquiry.email_notification_error,
    inquiry.feishu_notification_error
  ].filter(Boolean);
  updateAggregateNotification.run({
    id,
    status,
    error: errors.length ? errors.join(" | ").slice(0, 1000) : null
  });
}

async function sendInquiryEmail(inquiry) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const replyTo = isEmailAddress(inquiry.email)
    ? inquiry.email
    : isEmailAddress(inquiry.contact)
      ? inquiry.contact
      : undefined;
  const context =
    inquiry.interested_product || inquiry.application || "AGM separator";
  const country = inquiry.country ? ` | ${inquiry.country}` : "";

  await mailer.sendMail({
    from,
    to: inquiryTo,
    replyTo,
    subject: `Viking AGM lead #${inquiry.id} | ${context}${country}`,
    text: formatInquiryText(inquiry)
  });
}

async function sendFeishuMessage(inquiry) {
  const response = await fetch(feishuWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(notificationTimeoutMs),
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
    `Product format: ${inquiry.interested_product}`,
    `Language: ${inquiry.language}`,
    `Source page: ${inquiry.page_url}`,
    `First landing page: ${inquiry.landing_page}`,
    `Referrer: ${inquiry.referrer}`,
    `UTM source: ${inquiry.utm_source}`,
    `UTM medium: ${inquiry.utm_medium}`,
    `UTM campaign: ${inquiry.utm_campaign}`,
    `UTM content: ${inquiry.utm_content}`,
    `UTM term: ${inquiry.utm_term}`,
    `IP: ${inquiry.ip_address}`,
    "",
    "Message:",
    inquiry.message
  ].join("\n");
}

function errorMessage(error) {
  return (error instanceof Error ? error.message : String(error)).slice(
    0,
    1000
  );
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function csvCell(value) {
  let text = String(value ?? "");
  if (/^[=+\-@]/.test(text)) {
    text = `'${text}`;
  }
  return `"${text.replace(/"/g, '""')}"`;
}
