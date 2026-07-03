import fs from "node:fs";
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
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

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
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: false, limit: "32kb" }));
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/inquiry", async (request, response) => {
  if (!isAllowedOrigin(request)) {
    response.status(403).json({ ok: false, error: "forbidden_origin" });
    return;
  }

  const body = normalizeInquiry(request.body || {});
  if (String(request.body?.["bot-field"] || "").trim()) {
    response.status(204).end();
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
