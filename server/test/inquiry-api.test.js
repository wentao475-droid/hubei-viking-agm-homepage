import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import Database from "better-sqlite3";

const serverDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("API classifies, filters and manually grades inquiries", async (context) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "viking-inquiry-test-"));
  const dbPath = path.join(tempDir, "inquiries.db");
  const port = await freePort();
  let output = "";
  const child = spawn(process.execPath, ["index.js"], {
    cwd: serverDir,
    env: {
      ...process.env,
      PORT: String(port),
      INQUIRY_DB_PATH: dbPath,
      INQUIRY_ALLOWED_ORIGINS: "https://www.vikingagm.com",
      INQUIRY_TEST_CONTACTS: "qa@vikingagm.com",
      ADMIN_USERNAME: "admin",
      ADMIN_PASSWORD: "test-password",
      ADMIN_SESSION_SECRET: "test-session-secret-with-enough-length",
      SMTP_HOST: "",
      SMTP_USER: "",
      SMTP_PASS: "",
      FEISHU_WEBHOOK_URL: ""
    },
    stdio: ["ignore", "pipe", "pipe"]
  });
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });
  context.after(() => {
    child.kill("SIGTERM");
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  const baseUrl = `http://127.0.0.1:${port}`;
  await waitForHealth(baseUrl, child, () => output);

  const valid = await submit(baseUrl, {
    name: "VRLA Buyer",
    contact: "buyer@battery.example",
    email: "buyer@battery.example",
    company: "Battery Co",
    application: "VRLA",
    message: "Please quote AGM separator rolls for our VRLA battery."
  });
  assert.equal(valid.status, 202);

  const duplicate = await submit(baseUrl, {
    name: "VRLA Buyer",
    contact: "buyer@battery.example",
    email: "buyer@battery.example",
    company: "Battery Co",
    application: "VRLA",
    message: "Please quote AGM separator rolls for our VRLA battery."
  });
  const changedRequirement = await submit(baseUrl, {
    name: "VRLA Buyer",
    contact: "buyer@battery.example",
    email: "buyer@battery.example",
    company: "Battery Co",
    application: "Energy storage battery",
    message: "We now need 2.0 mm AGM separator sheets for a different project."
  });
  const ad = await submit(baseUrl, {
    name: "Web Agency",
    contact: "sales@agency.example",
    company: "Agency",
    message:
      "I noticed design-related issues on your website and wanted to reach out. We help manufacturers with website design."
  });
  const internal = await submit(baseUrl, {
    name: "QA",
    contact: "qa@vikingagm.com",
    email: "qa@vikingagm.com",
    message: "Form verification"
  });
  assert.equal(duplicate.status, 202);
  assert.equal(changedRequirement.status, 202);
  assert.equal(ad.status, 202);
  assert.equal(internal.status, 202);

  await new Promise((resolve) => setTimeout(resolve, 80));
  const db = new Database(dbPath, { readonly: true });
  context.after(() => db.close());
  const rows = db
    .prepare(
      "SELECT id, lead_grade, classification_reason, duplicate_of_id, notification_status FROM inquiries ORDER BY id"
    )
    .all();
  assert.equal(rows[0].lead_grade, "D");
  assert.equal(rows[1].lead_grade, "E");
  assert.equal(rows[1].classification_reason, "duplicate_submission");
  assert.equal(rows[1].duplicate_of_id, rows[0].id);
  assert.equal(rows[2].lead_grade, "D");
  assert.equal(rows[3].classification_reason, "unrelated_solicitation");
  assert.equal(rows[4].classification_reason, "internal_test");
  assert.equal(rows[1].notification_status, "skipped");

  const login = await fetch(`${baseUrl}/admin/login`, {
    method: "POST",
    redirect: "manual",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username: "admin", password: "test-password" })
  });
  assert.equal(login.status, 303);
  const cookie = login.headers.get("set-cookie").split(";", 1)[0];

  const workQueue = await adminJson(`${baseUrl}/admin/api/inquiries`, cookie);
  assert.equal(workQueue.total, 2);
  assert.equal(workQueue.inquiries[0].lead_grade, "D");
  assert.equal(workQueue.stats.D, 2);
  assert.equal(workQueue.stats.E, 3);

  const manual = await fetch(
    `${baseUrl}/admin/api/inquiries/${rows[0].id}/update`,
    {
      method: "POST",
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lead_grade: "B",
        notes: "Sample discussion active",
        next_follow_up_at: "2026-07-21T09:00"
      })
    }
  );
  assert.equal(manual.status, 200);
  assert.equal((await manual.json()).inquiry.lead_grade, "B");

  const legacy = await fetch(
    `${baseUrl}/admin/api/inquiries/${rows[3].id}/status`,
    {
      method: "POST",
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "won" })
    }
  );
  assert.equal(legacy.status, 200);
  const legacyInquiry = (await legacy.json()).inquiry;
  assert.equal(legacyInquiry.lead_grade, "A");
  assert.equal(legacyInquiry.notification_status, "skipped");

  const bulk = await fetch(`${baseUrl}/admin/api/inquiries/bulk-grade`, {
    method: "POST",
    headers: {
      Cookie: cookie,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ids: [rows[1].id, rows[4].id], lead_grade: "E" })
  });
  assert.equal(bulk.status, 200);
  assert.equal((await bulk.json()).updated, 2);
});

async function submit(baseUrl, fields) {
  return fetch(`${baseUrl}/api/inquiry`, {
    method: "POST",
    headers: {
      Origin: "https://www.vikingagm.com",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(fields)
  });
}

async function adminJson(url, cookie) {
  const response = await fetch(url, { headers: { Cookie: cookie } });
  assert.equal(response.status, 200);
  return response.json();
}

async function waitForHealth(baseUrl, child, getOutput) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`API exited before becoming healthy:\n${getOutput()}`);
    }
    try {
      const response = await fetch(`${baseUrl}/health`);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 40));
  }
  throw new Error(`API did not become healthy:\n${getOutput()}`);
}

async function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}
