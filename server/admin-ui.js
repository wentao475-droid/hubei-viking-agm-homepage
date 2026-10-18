import { crmBody, crmStyles } from "./crm-ui.js";

export function renderAdminUnavailable() {
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

export function renderLoginPage(error = "") {
  return renderShell({
    title: "Viking AGM Admin Login",
    body: `
      <main class="auth-shell">
        <section class="auth-card">
          <div class="brand-mark">V</div>
          <p class="eyebrow">Viking AGM</p>
          <h1>Inquiry Admin</h1>
          <p class="muted">Review website inquiries, record follow-up and move qualified leads toward samples and quotations.</p>
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

export function renderAdminPage() {
  return renderShell({ title: "Viking AGM CRM", body: crmBody(), lang: "zh-CN" });
}

function renderShell({ title, body, lang = "en" }) {
  return `<!doctype html>
<html lang="${lang}">
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
      a { color: inherit; text-decoration: none; }

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
      .muted, .timezone-note {
        margin: 12px 0 0;
        color: var(--steel);
        line-height: 1.7;
      }
      .timezone-note { font-size: 13px; }
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
      input, select, textarea {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--frost);
        color: var(--ink);
        padding: 12px 14px;
        outline: none;
      }
      textarea { min-height: 120px; resize: vertical; }
      input:focus, select:focus, textarea:focus {
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
      .topbar, .topbar-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .topbar { margin-bottom: 22px; }
      .ghost-button, .secondary-button, .close-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
        color: var(--graphite);
        padding: 10px 14px;
        font-weight: 800;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 14px;
        margin-bottom: 18px;
      }
      .stat-card {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
        padding: 18px;
        box-shadow: 0 8px 24px rgba(23, 32, 51, 0.06);
        color: inherit;
        text-align: left;
      }
      .stat-card:hover, .stat-card.active { border-color: var(--signal); background: #f8fbff; }
      .stat-card span { color: var(--steel); font-size: 13px; font-weight: 800; }
      .stat-card strong { display: block; margin-top: 8px; color: var(--ink); font-size: 30px; }
      .panel {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
        padding: 18px;
        box-shadow: var(--shadow);
      }
      .toolbar {
        display: grid;
        grid-template-columns: minmax(260px, 1fr) 190px;
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
      .list-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .bulk-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .bulk-actions[hidden] { display: none; }
      .bulk-actions select { width: min(260px, 32vw); padding: 10px 12px; }
      .bulk-actions strong { color: var(--graphite); white-space: nowrap; }
      .inquiry-list {
        margin-top: 14px;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 8px;
      }
      .table-head, .inquiry-row {
        display: grid;
        grid-template-columns: 34px 140px 1.1fr 1fr 1.15fr 1fr 110px;
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
        cursor: pointer;
      }
      .inquiry-row:hover, .inquiry-row.selected { background: #f8fbff; }
      .row-check, .select-all { width: 18px; height: 18px; margin: 0; accent-color: var(--signal); }
      .cell-main { display: block; color: var(--ink); font-weight: 900; overflow-wrap: anywhere; }
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
      .badge.grade-a, .badge.sent { background: #ecfdf3; color: #166534; }
      .badge.grade-b { background: #fff7e6; color: #9a5b00; }
      .badge.grade-c, .badge.failed { background: #fef2f2; color: #991b1b; }
      .badge.grade-d { background: #e8f4ff; color: var(--signal); }
      .badge.grade-e { background: #f2f4f7; color: var(--steel); }
      .badge.pending { background: #fff7e6; color: #9a5b00; }
      .badge.skipped { background: #f2f4f7; color: var(--steel); }
      .pagination {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;
        margin-top: 16px;
        color: var(--steel);
        font-weight: 800;
      }
      .secondary-button:disabled { cursor: not-allowed; opacity: 0.5; }

      .drawer { position: fixed; inset: 0; display: none; z-index: 50; }
      .drawer.open { display: block; }
      .drawer-backdrop { position: absolute; inset: 0; background: rgba(23, 32, 51, 0.42); }
      .drawer-panel {
        position: absolute;
        inset: 20px 20px 20px auto;
        width: min(620px, calc(100vw - 40px));
        overflow: auto;
        border-radius: 8px;
        background: #fff;
        padding: 22px;
        box-shadow: var(--shadow);
      }
      .close-button { float: right; }
      .detail-title { margin: 0 0 8px; font-size: 26px; }
      .detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 18px;
      }
      .detail-item, .message-box, .follow-up-box {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--frost);
        padding: 12px;
      }
      .detail-item span, .message-box span {
        display: block;
        color: var(--steel);
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
      }
      .detail-item strong, .message-box p {
        display: block;
        margin: 6px 0 0;
        color: var(--ink);
        line-height: 1.55;
        overflow-wrap: anywhere;
      }
      .message-box, .follow-up-box { margin-top: 12px; }
      .follow-up-box { display: grid; gap: 12px; background: #fff; }
      .detail-actions { display: flex; gap: 10px; margin-top: 14px; }
      .inline-link {
        border: 0;
        background: transparent;
        color: var(--signal);
        padding: 0;
        font-weight: 800;
        text-decoration: underline;
      }

      @media (max-width: 860px) {
        .admin-shell { padding: 18px; }
        .topbar { align-items: flex-start; }
        .topbar-actions { flex-direction: column; align-items: stretch; }
        .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .toolbar { grid-template-columns: 1fr; }
        .list-meta { align-items: stretch; flex-direction: column; }
        .bulk-actions { align-items: stretch; flex-direction: column; }
        .bulk-actions select { width: 100%; }
        .table-head { display: none; }
        .inquiry-list { border: 0; display: grid; gap: 12px; }
        .inquiry-row { display: block; border: 1px solid var(--line); border-radius: 8px; }
        .inquiry-row > span { display: block; margin-top: 10px; }
        .inquiry-row .row-check { display: inline-block; margin: 0 0 4px; }
        .drawer-panel { inset: 0; width: 100%; border-radius: 0; }
        .detail-grid { grid-template-columns: 1fr; }
      }
      ${crmStyles}
    </style>
  </head>
  <body>${body}</body>
</html>`;
}


function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
