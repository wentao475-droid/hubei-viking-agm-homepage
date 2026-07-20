const leadStatuses = [
  ["new", "New"],
  ["contacted", "Contacted"],
  ["qualified", "Qualified"],
  ["sample", "Sample"],
  ["quoted", "Quoted"],
  ["won", "Won"],
  ["lost", "Lost"]
];

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
  const statusOptions = leadStatuses
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");

  return renderShell({
    title: "Viking AGM Inquiries",
    body: `
      <main class="admin-shell">
        <header class="topbar">
          <div>
            <p class="eyebrow">Viking AGM</p>
            <h1>Inquiry Dashboard</h1>
            <p class="timezone-note">Times shown in Asia/Shanghai</p>
          </div>
          <div class="topbar-actions">
            <a class="secondary-button" href="/admin/api/inquiries.csv">Export CSV</a>
            <form method="POST" action="/admin/logout">
              <button class="ghost-button" type="submit">Logout</button>
            </form>
          </div>
        </header>

        <section class="stats-grid" aria-label="Inquiry summary">
          <article class="stat-card"><span>Total</span><strong id="stat-total">-</strong></article>
          <article class="stat-card"><span>New</span><strong id="stat-new">-</strong></article>
          <article class="stat-card"><span>Qualified+</span><strong id="stat-qualified">-</strong></article>
          <article class="stat-card"><span>Today</span><strong id="stat-today">-</strong></article>
        </section>

        <section class="panel">
          <div class="toolbar">
            <label class="search-field">
              <span>Search inquiries</span>
              <input id="search" type="search" placeholder="Name, company, contact, message, UTM..." />
            </label>
            <label class="filter-field">
              <span>Status</span>
              <select id="status-filter">
                <option value="">All</option>
                ${statusOptions}
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
        window.VIKING_LEAD_STATUSES = ${JSON.stringify(leadStatuses)};
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
      .inquiry-list {
        margin-top: 14px;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 8px;
      }
      .table-head, .inquiry-row {
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
      .inquiry-row:hover { background: #f8fbff; }
      .cell-main { color: var(--ink); font-weight: 900; }
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
      .badge.contacted { background: #f2f4f7; color: var(--graphite); }
      .badge.qualified { background: #fff7e6; color: #9a5b00; }
      .badge.sample { background: #f4edff; color: #6b35a5; }
      .badge.quoted { background: #e6f7ff; color: #075985; }
      .badge.won, .badge.sent { background: #ecfdf3; color: #166534; }
      .badge.lost, .badge.failed { background: #fef2f2; color: #991b1b; }
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

      @media (max-width: 860px) {
        .admin-shell { padding: 18px; }
        .topbar { align-items: flex-start; }
        .topbar-actions { flex-direction: column; align-items: stretch; }
        .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .toolbar { grid-template-columns: 1fr; }
        .table-head { display: none; }
        .inquiry-list { border: 0; display: grid; gap: 12px; }
        .inquiry-row { display: block; border: 1px solid var(--line); border-radius: 8px; }
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
const statuses = window.VIKING_LEAD_STATUSES;
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
  document.getElementById("stat-qualified").textContent = stats.qualified;
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
      const source = item.utm_source || item.referrer || item.landing_page || item.page_url || "-";
      return '<button type="button" class="inquiry-row" data-id="' + item.id + '">' +
        '<span><span class="cell-main">' + formatDate(item.created_at) + '</span><span class="cell-sub">#' + item.id + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(item.name || "-") + '</span><span class="cell-sub">' + escapeHtml(item.contact || item.email || "-") + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(item.company || "-") + '</span><span class="cell-sub">' + escapeHtml(item.country || "") + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(product) + '</span><span class="cell-sub">' + escapeHtml((item.message || "").slice(0, 90)) + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(compactSource(source)) + '</span><span class="cell-sub">' + escapeHtml(compactUrl(item.page_url)) + '</span></span>' +
        '<span><span class="badge ' + item.status + '">' + statusLabel(item.status) + '</span></span>' +
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
  const statusOptions = statuses.map(([value, label]) =>
    '<option value="' + value + '"' + (item.status === value ? ' selected' : '') + '>' + label + '</option>'
  ).join('');
  detailContent.innerHTML =
    '<h2 id="detail-title" class="detail-title">' + escapeHtml(item.name || "Inquiry #" + item.id) + '</h2>' +
    '<span class="badge ' + item.status + '">' + statusLabel(item.status) + '</span> ' +
    '<span class="badge ' + item.notification_status + '">' + escapeHtml(item.notification_status) + '</span>' +
    '<div class="detail-grid">' +
      detailItem("Created", formatDate(item.created_at)) +
      detailItem("Contact", item.contact) +
      detailItem("Company", item.company) +
      detailItem("Email", item.email) +
      detailItem("Country", item.country) +
      detailItem("Application", item.application) +
      detailItem("Product format", item.interested_product) +
      detailItem("Language", item.language) +
      detailItem("Source page", item.page_url) +
      detailItem("First landing page", item.landing_page) +
      detailItem("Referrer", item.referrer) +
      detailItem("UTM source", item.utm_source) +
      detailItem("UTM medium", item.utm_medium) +
      detailItem("UTM campaign", item.utm_campaign) +
      detailItem("UTM content", item.utm_content) +
      detailItem("UTM term", item.utm_term) +
      detailItem("Email notification", item.email_notification_status) +
      detailItem("Feishu notification", item.feishu_notification_status) +
      detailItem("IP", item.ip_address) +
      detailItem("User agent", item.user_agent) +
    '</div>' +
    '<div class="message-box"><span>Message</span><p>' + escapeHtml(item.message || "-") + '</p></div>' +
    (item.email_notification_error ? '<div class="message-box"><span>Email error</span><p>' + escapeHtml(item.email_notification_error) + '</p></div>' : '') +
    (item.feishu_notification_error ? '<div class="message-box"><span>Feishu error</span><p>' + escapeHtml(item.feishu_notification_error) + '</p></div>' : '') +
    '<div class="follow-up-box">' +
      '<label><span>Lead stage</span><select id="lead-status">' + statusOptions + '</select></label>' +
      '<label><span>Next follow-up</span><input id="next-follow-up" type="datetime-local" value="' + escapeHtml(toDateTimeLocal(item.next_follow_up_at)) + '" /></label>' +
      '<label><span>Internal notes</span><textarea id="lead-notes" placeholder="Call notes, sample requirement, quotation context...">' + escapeHtml(item.notes || "") + '</textarea></label>' +
      '<div class="detail-actions"><button class="primary-button" type="button" id="save-follow-up">Save follow-up</button></div>' +
    '</div>';
  document.getElementById("save-follow-up").addEventListener("click", () => saveFollowUp(item.id));
}

async function saveFollowUp(id) {
  const button = document.getElementById("save-follow-up");
  button.disabled = true;
  button.textContent = "Saving...";
  const response = await fetch("/admin/api/inquiries/" + id + "/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: document.getElementById("lead-status").value,
      notes: document.getElementById("lead-notes").value,
      next_follow_up_at: document.getElementById("next-follow-up").value
    })
  });
  button.disabled = false;
  button.textContent = response.ok ? "Saved" : "Save failed";
  if (!response.ok) return;
  const data = await response.json();
  renderDetail(data.inquiry);
  loadInquiries();
}

function detailItem(label, value) {
  return '<div class="detail-item"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value || "-") + '</strong></div>';
}

function statusLabel(value) {
  return statuses.find(([status]) => status === value)?.[1] || value || "-";
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
  const normalized = /Z$|[+-]\\d\\d:\\d\\d$/.test(value)
    ? value
    : String(value).replace(" ", "T") + "Z";
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function toDateTimeLocal(value) {
  if (!value) return "";
  return String(value).replace(" ", "T").slice(0, 16);
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

function compactSource(value) {
  if (!value) return "-";
  try {
    const url = new URL(value);
    return url.hostname;
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
