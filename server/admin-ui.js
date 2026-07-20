const leadGrades = [
  ["A", "A · Serving / 服务中"],
  ["B", "B · Negotiating / 洽谈中"],
  ["C", "C · Lost / 已流失"],
  ["D", "D · To contact / 待联系"],
  ["E", "E · Invalid / 无效"]
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
  const gradeOptions = leadGrades
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
            <a id="export-csv" class="secondary-button" href="/admin/api/inquiries.csv?grade=work">Export CSV</a>
            <form method="POST" action="/admin/logout">
              <button class="ghost-button" type="submit">Logout</button>
            </form>
          </div>
        </header>

        <section class="stats-grid" aria-label="Inquiry summary">
          <button type="button" class="stat-card" data-grade="A"><span>A · 服务中</span><strong id="stat-A">-</strong></button>
          <button type="button" class="stat-card" data-grade="B"><span>B · 洽谈中</span><strong id="stat-B">-</strong></button>
          <button type="button" class="stat-card" data-grade="C"><span>C · 已流失</span><strong id="stat-C">-</strong></button>
          <button type="button" class="stat-card" data-grade="D"><span>D · 待联系</span><strong id="stat-D">-</strong></button>
          <button type="button" class="stat-card" data-grade="E"><span>E · 无效</span><strong id="stat-E">-</strong></button>
        </section>

        <section class="panel">
          <div class="toolbar">
            <label class="search-field">
              <span>Search inquiries</span>
              <input id="search" type="search" placeholder="Name, company, contact, message, UTM..." />
            </label>
            <label class="filter-field">
              <span>Lead grade</span>
              <select id="grade-filter">
                <option value="work" selected>A/B/D · Work queue</option>
                <option value="all">All grades</option>
                ${gradeOptions}
              </select>
            </label>
          </div>

          <div class="list-meta">
            <div id="status-message" class="status-message">Loading inquiries...</div>
            <div id="bulk-actions" class="bulk-actions" hidden>
              <strong id="selected-count">0 selected</strong>
              <select id="bulk-grade" aria-label="Bulk lead grade">${gradeOptions}</select>
              <button id="apply-bulk-grade" class="primary-button" type="button">Apply grade</button>
              <button id="clear-selection" class="secondary-button" type="button">Clear</button>
            </div>
          </div>
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
        window.VIKING_LEAD_GRADES = ${JSON.stringify(leadGrades)};
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
    </style>
  </head>
  <body>${body}</body>
</html>`;
}

function adminClientScript() {
  return `
const state = { page: 1, totalPages: 1, q: "", grade: "work", selected: new Set() };
const grades = window.VIKING_LEAD_GRADES;
const list = document.getElementById("inquiry-list");
const statusMessage = document.getElementById("status-message");
const search = document.getElementById("search");
const gradeFilter = document.getElementById("grade-filter");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const pageLabel = document.getElementById("page-label");
const drawer = document.getElementById("detail-drawer");
const detailContent = document.getElementById("detail-content");
const bulkActions = document.getElementById("bulk-actions");
const selectedCount = document.getElementById("selected-count");
const bulkGrade = document.getElementById("bulk-grade");
const applyBulkGrade = document.getElementById("apply-bulk-grade");
const clearSelection = document.getElementById("clear-selection");
const exportCsv = document.getElementById("export-csv");
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

gradeFilter.addEventListener("change", () => {
  state.grade = gradeFilter.value;
  state.page = 1;
  loadInquiries();
});

document.querySelectorAll(".stat-card[data-grade]").forEach((card) => {
  card.addEventListener("click", () => {
    state.grade = card.dataset.grade;
    gradeFilter.value = state.grade;
    state.page = 1;
    loadInquiries();
  });
});

applyBulkGrade.addEventListener("click", applyBulkGradeChange);
clearSelection.addEventListener("click", () => {
  state.selected.clear();
  syncSelectionUi();
  list.querySelectorAll(".row-check").forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.closest(".inquiry-row")?.classList.remove("selected");
  });
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
    grade: state.grade
  });
  const response = await fetch("/admin/api/inquiries?" + params.toString());
  if (!response.ok) {
    statusMessage.textContent = "Could not load inquiries. Please sign in again.";
    return;
  }
  const data = await response.json();
  state.totalPages = data.totalPages;
  state.selected.clear();
  renderStats(data.stats);
  renderList(data.inquiries);
  syncSelectionUi();
  statusMessage.textContent = data.total ? data.total + " inquiry records" : "No inquiries found";
  pageLabel.textContent = "Page " + data.page + " / " + data.totalPages;
  prevPage.disabled = data.page <= 1;
  nextPage.disabled = data.page >= data.totalPages;
  exportCsv.href = "/admin/api/inquiries.csv?" + new URLSearchParams({
    q: state.q,
    grade: state.grade
  }).toString();
  document.querySelectorAll(".stat-card[data-grade]").forEach((card) => {
    card.classList.toggle("active", card.dataset.grade === state.grade);
  });
}

function renderStats(stats) {
  grades.forEach(([grade]) => {
    document.getElementById("stat-" + grade).textContent = stats[grade] || 0;
  });
}

function renderList(inquiries) {
  if (!inquiries.length) {
    list.innerHTML = "";
    return;
  }
  list.innerHTML = [
    '<div class="table-head"><input class="select-all" type="checkbox" aria-label="Select page" /><span>Time</span><span>Lead</span><span>Company</span><span>Product / Application</span><span>Source</span><span>Grade</span></div>',
    ...inquiries.map((item) => {
      const product = item.interested_product || item.application || "-";
      const source = item.utm_source || item.referrer || item.landing_page || item.page_url || "-";
      return '<div class="inquiry-row" role="button" tabindex="0" data-id="' + item.id + '">' +
        '<input class="row-check" type="checkbox" aria-label="Select inquiry #' + item.id + '" value="' + item.id + '" />' +
        '<span><span class="cell-main">' + formatDate(item.created_at) + '</span><span class="cell-sub">#' + item.id + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(item.name || "-") + '</span><span class="cell-sub">' + escapeHtml(item.contact || item.email || "-") + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(item.company || "-") + '</span><span class="cell-sub">' + escapeHtml(item.country || "") + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(product) + '</span><span class="cell-sub">' + escapeHtml((item.message || "").slice(0, 90)) + '</span></span>' +
        '<span><span class="cell-main">' + escapeHtml(compactSource(source)) + '</span><span class="cell-sub">' + escapeHtml(compactUrl(item.page_url)) + '</span></span>' +
        '<span><span class="badge ' + gradeClass(item.lead_grade) + '">' + gradeLabel(item.lead_grade) + '</span></span>' +
      '</div>';
    })
  ].join("");
  list.querySelectorAll(".inquiry-row").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.matches("input")) return;
      openDetail(row.dataset.id);
    });
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.target.matches("input")) {
        openDetail(row.dataset.id);
      }
    });
  });
  list.querySelectorAll(".row-check").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const id = Number(checkbox.value);
      if (checkbox.checked) state.selected.add(id);
      else state.selected.delete(id);
      checkbox.closest(".inquiry-row")?.classList.toggle("selected", checkbox.checked);
      syncSelectionUi();
    });
  });
  list.querySelector(".select-all")?.addEventListener("change", (event) => {
    list.querySelectorAll(".row-check").forEach((checkbox) => {
      checkbox.checked = event.target.checked;
      checkbox.dispatchEvent(new Event("change"));
    });
  });
}

function syncSelectionUi() {
  const count = state.selected.size;
  bulkActions.hidden = count === 0;
  selectedCount.textContent = count + " selected";
}

async function applyBulkGradeChange() {
  if (!state.selected.size || state.selected.size > 100) return;
  applyBulkGrade.disabled = true;
  applyBulkGrade.textContent = "Applying...";
  const response = await fetch("/admin/api/inquiries/bulk-grade", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ids: Array.from(state.selected),
      lead_grade: bulkGrade.value
    })
  });
  applyBulkGrade.disabled = false;
  applyBulkGrade.textContent = response.ok ? "Applied" : "Apply failed";
  if (!response.ok) return;
  await loadInquiries();
  applyBulkGrade.textContent = "Apply grade";
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
  const gradeOptions = grades.map(([value, label]) =>
    '<option value="' + value + '"' + (item.lead_grade === value ? ' selected' : '') + '>' + label + '</option>'
  ).join('');
  detailContent.innerHTML =
    '<h2 id="detail-title" class="detail-title">' + escapeHtml(item.name || "Inquiry #" + item.id) + '</h2>' +
    '<span class="badge ' + gradeClass(item.lead_grade) + '">' + gradeLabel(item.lead_grade) + '</span> ' +
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
      detailItem("Classification source", item.classification_source) +
      detailItem("Classification reason", reasonLabel(item.classification_reason)) +
      duplicateDetail(item.duplicate_of_id) +
      detailItem("IP", item.ip_address) +
      detailItem("User agent", item.user_agent) +
    '</div>' +
    '<div class="message-box"><span>Message</span><p>' + escapeHtml(item.message || "-") + '</p></div>' +
    (item.email_notification_error ? '<div class="message-box"><span>Email error</span><p>' + escapeHtml(item.email_notification_error) + '</p></div>' : '') +
    (item.feishu_notification_error ? '<div class="message-box"><span>Feishu error</span><p>' + escapeHtml(item.feishu_notification_error) + '</p></div>' : '') +
    '<div class="follow-up-box">' +
      '<label><span>Lead grade / 线索等级</span><select id="lead-grade">' + gradeOptions + '</select></label>' +
      '<label><span>Next follow-up</span><input id="next-follow-up" type="datetime-local" value="' + escapeHtml(toDateTimeLocal(item.next_follow_up_at)) + '" /></label>' +
      '<label><span>Internal notes</span><textarea id="lead-notes" placeholder="Call notes, sample requirement, quotation context...">' + escapeHtml(item.notes || "") + '</textarea></label>' +
      '<div class="detail-actions"><button class="primary-button" type="button" id="save-follow-up">Save follow-up</button></div>' +
    '</div>';
  document.getElementById("save-follow-up").addEventListener("click", () => saveFollowUp(item.id));
  document.querySelector("[data-duplicate-id]")?.addEventListener("click", (event) => {
    openDetail(event.currentTarget.dataset.duplicateId);
  });
}

async function saveFollowUp(id) {
  const button = document.getElementById("save-follow-up");
  button.disabled = true;
  button.textContent = "Saving...";
  const response = await fetch("/admin/api/inquiries/" + id + "/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lead_grade: document.getElementById("lead-grade").value,
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

function duplicateDetail(id) {
  if (!id) return detailItem("Duplicate of", "-");
  return '<div class="detail-item"><span>Duplicate of</span><strong><button type="button" class="inline-link" data-duplicate-id="' + id + '">Open inquiry #' + id + '</button></strong></div>';
}

function gradeLabel(value) {
  return grades.find(([grade]) => grade === value)?.[1] || value || "-";
}

function gradeClass(value) {
  return "grade-" + String(value || "D").toLowerCase();
}

function reasonLabel(value) {
  const labels = {
    duplicate_submission: "Duplicate submission / 重复提交",
    internal_test: "Internal test / 内部测试",
    unrelated_solicitation: "Unrelated solicitation / 无关推广",
    historical_test: "Historical test / 历史测试",
    historical_unrelated_solicitation: "Historical solicitation / 历史推广",
    legacy_status_mapping: "Migrated from legacy status / 旧状态迁移",
    manual_invalid: "Marked invalid manually / 人工标记无效",
    manual_override: "Adjusted manually / 人工调整"
  };
  return labels[value] || value || "-";
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
