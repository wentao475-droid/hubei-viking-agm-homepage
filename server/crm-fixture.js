import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

export async function testApi(context) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "viking-crm-test-"));
  const dbPath = path.join(directory, "inquiries.db");
  const port = await new Promise((resolve) => { const s = net.createServer(); s.listen(0, "127.0.0.1", () => { const port = s.address().port; s.close(() => resolve(port)); }); });
  const base = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ["index.js"], {
    cwd: path.dirname(fileURLToPath(import.meta.url)),
    env: { ...process.env, INQUIRY_DB_PATH: dbPath, PORT: String(port), ADMIN_USERNAME: "admin", ADMIN_PASSWORD: "test-password", ADMIN_SESSION_SECRET: "test-session-secret-crm-at-least-32", SMTP_HOST: "", SMTP_USER: "", SMTP_PASS: "", FEISHU_WEBHOOK_URL: "", INQUIRY_ALLOWED_ORIGINS: base, INQUIRY_RATE_LIMIT_MAX: "100" },
    stdio: ["ignore", "pipe", "pipe"]
  });
  let output = ""; child.stdout.on("data", (c) => output += c); child.stderr.on("data", (c) => output += c);
  context.after(async () => { child.kill(); await new Promise((resolve) => child.exitCode !== null ? resolve() : child.once("exit", resolve)); fs.rmSync(directory, { recursive: true, force: true }); });
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (child.exitCode !== null) throw new Error(output);
    try { if ((await fetch(base + "/health")).ok) { ready = true; break; } } catch {}
    await new Promise((r) => setTimeout(r, 40));
  }
  if (!ready) throw new Error(output || "Server did not start");
  const login = await fetch(base + "/admin/login", { method: "POST", redirect: "manual", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ username: "admin", password: "test-password" }) });
  const cookie = login.headers.get("set-cookie").split(";", 1)[0];
  const request = (url, body, headers = {}) => fetch(base + "/admin/api" + url, {
    method: body === undefined ? "GET" : "POST",
    headers: { Cookie: cookie, Origin: base, ...(body !== undefined && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}), ...headers },
    body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body)
  });
  const json = async (url, body, status = 200) => {
    const r = await request(url, body); const data = await r.json();
    if (r.status !== status) throw new Error(`${url}: expected ${status}, got ${r.status}: ${JSON.stringify(data)}\n${output}`);
    return data;
  };
  return { base, dbPath, cookie, request, json, child };
}
