import { channels } from "./crm-store.js";
import { gradeLabels, gradeDescriptions } from "./lead-grades.js";

export function crmBody() {
  const options = Object.entries(channels).map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  return `<main class="admin-shell">
    <header class="topbar"><div><p class="eyebrow">Viking AGM</p><h1 id="page-title">线索管理</h1><p class="timezone-note">官网与其他渠道统一管理 · 时间均为上海时间</p></div>
      <div id="lead-actions" class="topbar-actions"><button id="new-lead" class="primary-button">新增线索</button><button id="import-leads" class="secondary-button">导入线索</button>
      <a class="secondary-button" href="/admin/api/crm/template.csv">下载导入模板</a><form method="POST" action="/admin/logout"><button class="ghost-button">退出</button></form></div></header>
    <div id="notice" role="status" aria-live="polite"></div>
    <nav class="crm-actions crm-nav" aria-label="后台主导航"><a href="/admin" id="nav-leads" class="secondary-button">线索管理</a><a href="/admin/orders" id="nav-orders" class="secondary-button">订单管理</a></nav>
    <div id="leads-view">
    <section class="stats-grid" aria-label="线索等级统计">${Object.entries(gradeLabels).map(([grade, label]) => `<button class="stat-card" data-grade="${grade}"><span>${grade} · ${label}</span><strong id="stat-${grade}">0</strong><small>${gradeDescriptions[grade]}</small></button>`).join("")}</section>
    <section class="panel"><div class="toolbar crm-toolbar">
      <label><span>搜索线索及跟进内容</span><input id="search" type="search" placeholder="姓名、公司、联系方式、需求…"></label>
      <label><span>渠道</span><select id="channel-filter"><option value="all">全部渠道</option>${options}</select></label>
      <label><span>等级</span><select id="grade-filter"><option value="work">A/B/C 工作队列</option><option value="all">全部等级</option>${Object.entries(gradeLabels).map(([g, label]) => `<option value="${g}">${g} · ${label}</option>`).join("")}</select></label>
      <label><span>跟进状态（A/B/C）</span><select id="follow-filter"><option value="all">全部</option><option value="today">今日待跟进</option><option value="overdue">已逾期</option><option value="unscheduled">未安排</option></select></label>
      <label><span>排序</span><select id="sort-filter"><option value="created">最新录入优先</option><option value="follow_up">下次跟进时间</option></select></label>
      <label><span>导入批次</span><select id="batch-filter"><option value="">全部批次</option></select></label>
    </div><div class="crm-actions"><a id="export-csv" class="secondary-button">导出线索 CSV</a><a id="export-follow-ups" class="secondary-button">导出完整跟进 CSV</a><span id="status-message" role="status"></span></div>
    <div id="bulk-actions" class="crm-actions" hidden><span id="selected-count"></span><select id="bulk-grade" aria-label="批量等级">${Object.entries(gradeLabels).map(([g, label]) => `<option value="${g}"${g === "B" ? " selected" : ""}>${g} · ${label}</option>`).join("")}</select><button id="apply-bulk-grade" class="primary-button">应用等级</button><button id="clear-selection" class="secondary-button">清除选择</button></div>
    <div id="inquiry-list" class="inquiry-list"></div><div class="pagination"><button id="prev-page" class="secondary-button">上一页</button><span id="page-label"></span><button id="next-page" class="secondary-button">下一页</button></div></section>
    </div>
    <section id="orders-view" class="panel" hidden><div id="order-filters" class="crm-actions"><label><span>搜索订单</span><input type="search" id="order-search" placeholder="订单号、客户、公司、规格、物流单号"></label><label><span>订单状态</span><select id="order-status"><option value="all">全部状态</option></select></label></div><div id="orders-content"></div><div id="orders-pagination" class="pagination"><button id="orders-prev" class="secondary-button">上一页</button><span id="orders-page" role="status"></span><button id="orders-next" class="secondary-button">下一页</button></div></section>
    <dialog id="detail-drawer" class="crm-drawer"><button class="close-button" data-close="detail-drawer" aria-label="关闭详情">关闭</button><div id="detail-content"></div></dialog>
    <dialog id="workspace-dialog" class="crm-dialog"><button class="close-button" data-close="workspace-dialog" aria-label="关闭窗口">关闭</button><div id="workspace-content"></div></dialog>
  </main><script src="/admin/api/crm.js" defer></script>`;
}

export const crmStyles = `
  .topbar-actions,.crm-actions { display:flex;gap:10px;flex-wrap:wrap;align-items:center; }
  .stat-card small { display:block;margin-top:8px;color:var(--steel);font-size:12px;line-height:1.5; }
  .topbar-actions { justify-content:flex-end; }
  .topbar { gap:24px;align-items:flex-start; }
  h1 { line-height:1.2; }
  .crm-toolbar { grid-template-columns:repeat(5,minmax(130px,1fr)); }
  .crm-toolbar label:first-child { grid-column:span 2; }
  .crm-actions { margin:14px 0; }
  .crm-actions select { width:auto; }
  [hidden] { display:none!important; }
  .table-head,.inquiry-row { grid-template-columns:24px 110px minmax(100px,1fr) minmax(90px,.8fr) minmax(100px,1fr) 100px minmax(135px,1fr) 95px;gap:10px; }
  .cell-sub { display:block; }
  .inquiry-row > span { min-width:0; }
  .crm-dialog,.crm-drawer { color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:24px;max-height:94vh;overflow:auto;box-shadow:var(--shadow); }
  .crm-dialog { width:min(900px,calc(100% - 32px)); }
  .crm-drawer { margin:16px 16px 16px auto;width:min(700px,calc(100% - 32px));height:calc(100% - 32px);max-height:none; }
  dialog::backdrop { background:rgba(23,32,51,.45); }
  .crm-form { display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:20px; }
  .crm-form .wide { grid-column:1/-1; }
  .crm-form label { min-width:0; }
  .crm-form textarea { min-height:90px; }
  .crm-form small,.muted { color:var(--steel); }
  .order-item { min-width:0;border:1px solid var(--line);border-radius:6px;padding:14px;margin-bottom:14px; }
  #lead-orders p { overflow-wrap:anywhere; }
  .crm-nav a[aria-current=page],.detail-tabs button[aria-selected=true] { background:var(--ink);color:#fff; }
  .detail-tabs { border-bottom:1px solid var(--line);padding-bottom:12px; }
  .orders-table { width:100%;border-collapse:collapse;table-layout:fixed; }
  .orders-table th,.orders-table td { padding:12px 8px;text-align:left;border-bottom:1px solid var(--line);overflow-wrap:anywhere;vertical-align:top; }
  .orders-table small { display:block;color:var(--steel);margin-top:6px; }
  .order-overview { display:grid;gap:12px;overflow-wrap:anywhere; }
  .order-overview h3 { margin-bottom:4px; }
  .order-create { margin-top:8px;padding:6px 10px;font-size:13px; }
  @media(max-width:860px) { .orders-table thead { display:none; } .orders-table tr { display:block;border:1px solid var(--line);border-radius:6px;padding:10px;margin:12px 0; } .orders-table td { display:block;border:0;padding:6px; } .orders-table td::before { content:attr(data-label) '：';font-weight:700; } }
  .error-text { color:#991b1b;white-space:pre-wrap;overflow-wrap:anywhere; }
  .success-text { color:#166534; }
  .timeline { display:grid;gap:12px;padding:0;list-style:none; }
  .timeline li { border:1px solid var(--line);border-left:3px solid var(--signal);border-radius:6px;padding:14px; }
  .timeline p,.message-box p { white-space:pre-wrap; }
  .timeline small { display:block;color:var(--steel);line-height:1.8; }
  details { margin-top:16px; } summary { cursor:pointer;font-weight:700; }
  .duplicate-box { padding:12px;border:1px solid #e9c17e;background:#fff7e6;margin:14px 0;overflow-wrap:anywhere; }
  .preview-wrap { max-height:400px;overflow:auto;border:1px solid var(--line);margin:14px 0; }
  .preview-table { border-collapse:collapse;width:100%;font-size:13px; }
  .preview-table th,.preview-table td { border-bottom:1px solid var(--line);padding:10px;text-align:left;vertical-align:top;overflow-wrap:anywhere;min-width:65px; }
  .preview-table input[type=checkbox] { width:20px;height:20px; }
  .map-grid { display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px; }
  #notice:not(:empty) { margin-bottom:16px;padding:12px;background:#fff;border:1px solid var(--line);border-radius:6px; }
  button:disabled { opacity:.55;cursor:wait; } a:focus-visible,button:focus-visible { outline:3px solid var(--signal);outline-offset:2px; }
  @media(max-width:1000px) { .crm-toolbar { grid-template-columns:repeat(3,minmax(0,1fr)); } .topbar { flex-direction:column; } .topbar-actions { flex-direction:row;justify-content:flex-start; } }
  @media(max-width:860px) { .table-head { display:none; } .inquiry-row { display:block; } }
  @media(max-width:560px) { .admin-shell { padding:12px; } .panel { padding:12px; } .crm-toolbar,.crm-form,.map-grid { grid-template-columns:1fr; } .crm-toolbar label:first-child { grid-column:auto; } .crm-drawer { margin:0;width:100%;height:100%;max-width:none;border-radius:0; } .crm-dialog { padding:16px; } .stats-grid { gap:8px; } .stat-card { padding:12px; } .crm-actions select { max-width:100%; } }
`;

export function crmClientScript() { return `(${crmClient.toString()})();`; }

function crmClient() {
  const $ = (id) => document.getElementById(id);
  const esc = (text) => String(text ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  let grades;
  const state = { page: 1, grade: "work", channel: "all", follow_up: "all", sort: "created", batch: "", q: "" };
  const ordersPage = location.pathname.startsWith("/admin/orders"), orderId = Number(location.pathname.match(/^\/admin\/orders\/(\d+)\/?$/)?.[1]) || null;
  const orderState = { page: 1, status: "all", q: "" };
  let orderSequence = 0;
  let options, rows = [], selected = new Set(), sequence = 0, draft = null, preview = null, importData = null, importGeneration = 0;
  const format = (value) => {
    if (!value) return "未安排";
    const date = new Date(/Z$|[+-]\d\d:\d\d$/.test(value) ? value : value.replace(" ", "T") + "Z");
    if (!Number.isFinite(date.getTime())) return value;
    return new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
  };
  const local = (value) => {
    if (!value) return "";
    const date = new Date(/Z$|[+-]\d\d:\d\d$/.test(value) ? value : value.replace(" ", "T") + "Z");
    if (!Number.isFinite(date.getTime())) return "";
    const parts = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
    return parts.replace(" ", "T");
  };
  const gradeOptions = (value) => Object.entries(grades).map(([g, name]) => `<option value="${g}"${value === g ? " selected" : ""}>${g} · ${name}</option>`).join("");
  const channelOptions = (value = "", allowBlank = false) => (allowBlank ? '<option value="">请选择默认渠道</option>' : "") + Object.entries(options.channels).map(([key, name]) => `<option value="${key}"${value === key ? " selected" : ""}>${name}</option>`).join("");
  function changesHtml(json, schemaVersion) {
    const changes = JSON.parse(json);
    const entries = changes.before && changes.after
      ? Object.keys(changes.after).map((key) => [key, { before: changes.before[key], after: changes.after[key] }])
      : Object.entries(changes);
    const orderLabels = { order_number: "订单编号", status: "订单状态", currency: "币种", amount: "订单金额", items: "规格明细", delivery_date: "约定交期", shipped_date: "发货日期", logistics_company: "物流公司", tracking_number: "物流单号", notes: "订单备注", contract: "最终合同" };
    const value = (key, text) => text == null || text === "" ? "未设置" : key === "items" ? JSON.parse(text).map((item) => `${item.product}：${specification(item)}${item.unit_price ? ' · 单价 ' + item.unit_price : ''}`).join("；") : key === "status" ? orderStatuses[text] || text : key.endsWith("_at") ? format(text) : key === "lead_grade" ? `${schemaVersion === 1 ? "旧制 " : ""}${text} · ${(schemaVersion === 1 ? options.legacyGrades : grades)[text] || text}` : key === "source_channel" ? options.channels[text] || text : text;
    return '<ul>' + entries.filter(([, item]) => item.before !== item.after).map(([key, item]) => `<li>${esc(options.fields[key] || orderLabels[key] || (key === "grade_definition" ? "等级定义" : key))}：${esc(value(key, item.before))} → ${esc(value(key, item.after))}</li>`).join("") + '</ul>';
  }
  async function api(url, body) {
    const response = await fetch("/admin/api" + url, body === undefined ? {} : body instanceof FormData ? { method: "POST", body } : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await response.json();
    if (!response.ok) throw Object.assign(new Error(data.error || "请求失败"), data, { status: response.status });
    return data;
  }
  function notice(message, error = false) { $("notice").textContent = message; $("notice").className = error ? "error-text" : "success-text"; }
  function field(key, label, value = "", type = "text", wide = false, disabled = false) {
    return `<label class="${wide ? "wide" : ""}"><span>${esc(label)}</span>${type === "textarea" ? `<textarea name="${key}"${disabled ? " disabled" : ""}>${esc(value)}</textarea>` : `<input name="${key}" type="${type}" value="${esc(value)}"${disabled ? " disabled" : ""}${key === "name" ? " required" : ""}>`}</label>`;
  }
  function closeDialog(id) { $(id).close(); }
  document.querySelectorAll("[data-close]").forEach((el) => el.onclick = () => closeDialog(el.dataset.close));
  $("detail-drawer").addEventListener("close", () => {
    const url = new URL(location.href); url.searchParams.delete("lead"); url.searchParams.delete("tab"); history.replaceState(null, "", url);
  });
  document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }));
  async function load() {
    const request = ++sequence;
    try {
      const data = await api("/inquiries?" + new URLSearchParams(state)); if (request !== sequence) return;
      rows = data.inquiries; selected.clear(); syncSelection();
      Object.keys(grades).forEach((g) => { $("stat-" + g).textContent = data.stats[g]; document.querySelector(`[data-grade="${g}"]`).classList.toggle("active", state.grade === g); });
      $("status-message").textContent = `共 ${data.total} 条线索`;
      state.page = data.page; $("page-label").textContent = `${data.page} / ${data.totalPages}`;
      $("prev-page").disabled = data.page <= 1; $("next-page").disabled = data.page >= data.totalPages;
      const params = new URLSearchParams(state);
      $("export-csv").href = "/admin/api/inquiries.csv?" + params; $("export-follow-ups").href = "/admin/api/follow-ups.csv?" + params;
      renderRows();
    } catch (error) { notice(error.message, true); }
  }
  function renderRows() {
    const cell = (main, sub = "") => `<span><span class="cell-main">${esc(main || "—")}</span><span class="cell-sub">${esc(sub)}</span></span>`;
    $("inquiry-list").innerHTML = rows.length ? '<div class="table-head"><input id="select-all" type="checkbox" aria-label="选择本页"><span>录入时间</span><span>线索</span><span>公司</span><span>需求</span><span>渠道</span><span>跟进</span><span>等级 / 操作</span></div>' + rows.map((row) => `<div class="inquiry-row" tabindex="0" role="button" data-id="${row.id}" aria-label="查看 ${esc(row.name)}"><input class="row-check" type="checkbox" value="${row.id}" aria-label="选择线索 ${row.id}">${cell(format(row.created_at), "#" + row.id)}${cell(row.name, row.contact)}${cell(row.company, row.country)}${cell(row.interested_product || row.application, row.message)}${cell(options.channels[row.source_channel], row.source_detail || row.utm_source || row.referrer)}${cell("下次：" + format(row.next_follow_up_at), row.last_follow_up_at ? "最近：" + format(row.last_follow_up_at) : row.latest_follow_up ? "最近：时间未知" : "暂无沟通记录")}<span><span class="badge grade-${row.lead_grade.toLowerCase()}">${row.lead_grade} · ${grades[row.lead_grade]}</span><button class="secondary-button order-create" data-new-order="${row.id}" aria-label="为 ${esc(row.name)} 下单">下单</button></span></div>`).join("") : '<p class="muted">没有符合条件的线索。</p>';
    document.querySelectorAll(".inquiry-row").forEach((el) => {
      el.onclick = (e) => { if (e.target.type !== "checkbox" && !e.target.closest("button")) openDetail(Number(el.dataset.id)); };
      el.onkeydown = (e) => { if ((e.key === "Enter" || e.key === " ") && e.target === el) { e.preventDefault(); openDetail(Number(el.dataset.id)); } };
    });
    document.querySelectorAll("[data-new-order]").forEach((el) => el.onclick = () => editOrder(Number(el.dataset.newOrder)));
    document.querySelectorAll(".row-check").forEach((el) => el.onchange = () => { el.checked ? selected.add(Number(el.value)) : selected.delete(Number(el.value)); syncSelection(); });
    if ($("select-all")) $("select-all").onchange = (e) => { document.querySelectorAll(".row-check").forEach((el) => { el.checked = e.target.checked; el.dispatchEvent(new Event("change")); }); };
  }
  function syncSelection() { $("bulk-actions").hidden = selected.size === 0; $("selected-count").textContent = `已选 ${selected.size} 条`; }
  ["grade", "channel", "follow", "sort", "batch"].forEach((key) => $(key + "-filter").onchange = (e) => { state[key === "follow" ? "follow_up" : key] = e.target.value; state.page = 1; load(); });
  let timer; $("search").oninput = (e) => { clearTimeout(timer); timer = setTimeout(() => { state.q = e.target.value; state.page = 1; load(); }, 250); };
  document.querySelectorAll("[data-grade]").forEach((el) => el.onclick = () => { state.grade = el.dataset.grade; $("grade-filter").value = state.grade; state.page = 1; load(); });
  $("prev-page").onclick = () => { state.page--; load(); }; $("next-page").onclick = () => { state.page++; load(); };
  $("clear-selection").onclick = () => { selected.clear(); document.querySelectorAll(".row-check,#select-all").forEach((el) => el.checked = false); syncSelection(); };
  $("apply-bulk-grade").onclick = async () => {
    const button = $("apply-bulk-grade"); button.disabled = true;
    try { await api("/inquiries/bulk-grade", { ids: [...selected], lead_grade: $("bulk-grade").value, versions: Object.fromEntries(rows.map((row) => [row.id, row.version])) }); notice("已更新等级并记录操作历史"); await load(); }
    catch (e) { notice(e.message, true); } finally { button.disabled = false; }
  };

  async function openDetail(id, tab = "follow") {
    try {
      const data = await api("/inquiries/" + id), row = data.inquiry;
      $("detail-content").dataset.leadId = String(id);
      const pair = (label, value) => `<div class="detail-item"><span>${esc(label)}</span><strong>${esc(value || "—")}</strong></div>`;
      const timeline = (activities) => activities.map((a) => `<li><strong>${esc(a.kind === "legacy_note" ? "历史备注 · 时间未知" : a.kind === "communication" ? (a.happened_at ? format(a.happened_at) : "历史沟通 · 时间未知") + " · " + a.method : "操作记录 · " + format(a.happened_at))}</strong><p>${esc(a.content)}</p>${a.next_action ? `<p>下一步：${esc(a.next_action)}</p>` : ""}${a.changes_json ? `<details><summary>查看变更</summary>${changesHtml(a.changes_json, a.grade_schema_version)}</details>` : ""}<small>录入：${esc(format(a.recorded_at))} · ${esc(a.actor)}${a.next_follow_up_at ? " · 下次跟进：" + esc(format(a.next_follow_up_at)) : ""}</small></li>`).join("") || '<li>暂无记录</li>';
      $("detail-content").innerHTML = `<h2 id="detail-title">${esc(row.name)}</h2><span class="badge grade-${row.lead_grade.toLowerCase()}">${row.lead_grade} · ${grades[row.lead_grade]}</span>
        <div class="crm-actions"><button id="new-order" class="primary-button">为此线索下单</button></div>
        <div class="crm-actions detail-tabs" role="tablist" aria-label="线索详情分类"><button id="lead-follow-tab" class="secondary-button" role="tab" aria-controls="lead-follow-panel" aria-selected="true">线索信息与跟进</button><button id="lead-orders-tab" class="secondary-button" role="tab" aria-controls="lead-orders-panel" aria-selected="false" tabindex="-1">关联订单</button></div><div id="lead-follow-panel" role="tabpanel" aria-labelledby="lead-follow-tab">
        <div class="detail-grid">${[["公司", row.company], ["渠道", (options.channels[row.source_channel] || "") + " " + row.source_detail], ["邮箱", row.email], ["电话", row.phone], ["微信", row.wechat], ["WhatsApp", row.whatsapp], ["联系方式", row.contact], ["首次联系", row.first_contact_at ? format(row.first_contact_at) : "未记录"], ["国家", row.country], ["录入", format(row.created_at)]].map(([a,b]) => pair(a,b)).join("")}</div>
        <div class="message-box"><span>${row.record_origin === "website" ? "官网原始留言" : "需求内容"}</span><p>${esc(row.message || "—")}</p></div>
        <div class="crm-actions"><button id="edit-basic" class="secondary-button">编辑基本资料</button><button id="reload-detail" class="secondary-button">重新加载详情</button></div>
        ${row.record_origin === "website" ? `<details><summary>官网来源与通知信息</summary><div class="detail-grid">${["page_url","landing_page","referrer","utm_source","utm_medium","utm_campaign","utm_content","utm_term","classification_source","classification_reason","notification_status","email_notification_status","feishu_notification_status"].map((k) => pair(k,row[k])).join("")}</div></details>` : ""}
        <h3>添加跟进 / 调整计划</h3><form id="follow-up-form" class="crm-form">
          ${field("happened_at", "沟通时间（上海时间）", local(new Date().toISOString()), "datetime-local")}
          <label><span>沟通方式</span><select name="method">${["微信","WhatsApp","邮件","电话","视频会议","展会","其他"].map((x) => `<option>${x}</option>`).join("")}</select></label>
          ${field("content", "本次沟通内容（添加跟进时必填）", "", "textarea", true)}
          ${field("next_action", "当前下一步（留空可清除）", row.next_action, "textarea", true)}
          ${field("next_follow_up_at", "下次跟进（留空可清除）", local(row.next_follow_up_at), "datetime-local")}
          <label><span>线索等级</span><select name="lead_grade">${gradeOptions(row.lead_grade)}</select></label>
          <div id="follow-error" class="error-text wide" role="alert"></div><div class="crm-actions wide"><button class="primary-button" type="submit">添加跟进</button><button class="secondary-button" type="button" id="save-plan">仅更新计划/等级</button></div></form>
        <h3>跟进时间线</h3><ol class="timeline">${timeline(data.activities.filter((a) => a.kind !== "order"))}</ol></div><section id="lead-orders-panel" role="tabpanel" aria-labelledby="lead-orders-tab" hidden><h3>此线索的全部订单</h3><div id="lead-orders">加载订单…</div><details><summary>订单操作记录</summary><ol class="timeline">${timeline(data.activities.filter((a) => a.kind === "order"))}</ol></details></section>`;
      $("detail-drawer").setAttribute("aria-labelledby", "detail-title"); if (!$("detail-drawer").open) $("detail-drawer").showModal();
      $("edit-basic").onclick = () => editLead(row); $("reload-detail").onclick = () => openDetail(id);
      $("new-order").onclick = () => editOrder(id);
      const switchTab = (next) => {
        for (const key of ["follow", "orders"]) {
          $("lead-" + key + "-panel").hidden = key !== next;
          $("lead-" + key + "-tab").setAttribute("aria-selected", String(key === next));
          $("lead-" + key + "-tab").tabIndex = key === next ? 0 : -1;
        }
        const url = new URL(location.href);
        if (url.searchParams.get("lead") === String(id)) { url.searchParams.set("tab", next); history.replaceState(null, "", url); }
      };
      for (const key of ["follow", "orders"]) {
        const button = $("lead-" + key + "-tab"); button.onclick = () => switchTab(key);
        button.onkeydown = (event) => { if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? "follow" : event.key === "End" ? "orders" : key === "follow" ? "orders" : "follow"; switchTab(next); $("lead-" + next + "-tab").focus(); } };
      }
      switchTab(tab);
      loadOrders(id).catch((error) => { if ($("lead-orders")) $("lead-orders").textContent = error.message; });
      const submit = async (plan) => {
        const form = $("follow-up-form"), data = Object.fromEntries(new FormData(form));
        const buttons = form.querySelectorAll("button"); buttons.forEach((b) => b.disabled = true);
        try { await api(`/inquiries/${id}/follow-ups`, { ...data, kind: plan ? "plan" : "communication", ...(plan ? { content: "" } : {}), version: row.version }); await openDetail(id); await load(); }
        catch (e) { $("follow-error").textContent = e.message; } finally { buttons.forEach((b) => b.disabled = false); }
      };
      $("follow-up-form").onsubmit = (e) => { e.preventDefault(); submit(false); }; $("save-plan").onclick = () => submit(true);
    } catch (e) { notice(e.message, true); }
  }

  const orderStatuses = { draft: "待确认", confirmed: "已确认", preparing: "备货中", shipped: "已发货", completed: "已完成", cancelled: "已取消" };
  const specification = (item) => item.form === "sheet"
    ? `${item.length} × ${item.width} × ${item.thickness} mm · ${item.quantity} 片`
    : `厚 ${item.thickness} mm × 宽 ${item.width} mm × 长 ${item.length} m · ${item.quantity} 卷`;
  async function loadOrders(id) {
    const data = await api(`/inquiries/${id}/orders`);
    if ($("detail-content").dataset.leadId !== String(id)) return;
    $("lead-orders-tab").textContent = `关联订单（${data.orders.length}）`;
    $("lead-orders").innerHTML = data.orders.length ? '<ol class="timeline">' + data.orders.map((order) => `<li><a href="/admin/orders/${order.id}"><strong>${esc(order.order_number)}</strong></a> · ${esc(orderStatuses[order.status])}<p>${esc(order.amount)} ${esc(order.currency)} · 交期：${esc(order.delivery_date || "未安排")}</p><a class="secondary-button" href="/admin/orders/${order.id}">进入订单详情</a></li>`).join("") + '</ol>' : '<p class="muted">此线索暂无订单，可使用“为此线索下单”。订单资料在独立订单页面维护。</p>';
  }
  async function loadOrderList() {
    const request = ++orderSequence;
    try {
      const data = await api("/orders?" + new URLSearchParams(orderState));
      if (request !== orderSequence) return;
      orderState.page = data.page;
      $("orders-page").textContent = `共 ${data.total} 笔订单 · ${data.page} / ${data.totalPages}`;
      $("orders-prev").disabled = data.page <= 1; $("orders-next").disabled = data.page >= data.totalPages;
      $("orders-content").innerHTML = data.orders.length ? `<table class="orders-table"><thead><tr>${["订单 / 录入时间","客户 / 公司","完整规格","金额","状态 / 交期","操作"].map((label) => `<th scope="col">${label}</th>`).join("")}</tr></thead><tbody>${data.orders.map((order) => `<tr>
        <td data-label="订单"><a href="/admin/orders/${order.id}">${esc(order.order_number)}</a><small>${esc(format(order.created_at))}</small></td>
        <td data-label="客户"><a href="/admin?lead=${order.inquiry_id}&tab=orders">${esc(order.lead_name)}</a><small>${esc(order.lead_company || "未填公司")}</small></td>
        <td data-label="规格">${order.items.map((item) => `<p>${esc(item.product)}<br>${esc(specification(item))}</p>`).join("")}</td>
        <td data-label="金额">${esc(order.amount)} ${esc(order.currency)}</td><td data-label="进度">${esc(orderStatuses[order.status])}<small>交期：${esc(order.delivery_date || "未安排")}</small></td>
        <td data-label="操作"><div class="crm-actions"><a class="secondary-button" href="/admin/orders/${order.id}">查看</a><a class="secondary-button" href="/admin/orders/${order.id}?edit=1">编辑</a></div></td></tr>`).join("")}</tbody></table>` : '<p class="muted">暂无符合条件的订单。请在线索列表中选择客户后下单。</p>';
    } catch (error) { notice(error.message, true); }
  }
  async function loadOrderDetail(id, editing = false) {
    try {
      const { order, lead } = await api(`/orders/${id}`);
      $("page-title").textContent = "订单详情";
      $("order-filters").hidden = true; $("orders-pagination").hidden = true;
      $("orders-content").innerHTML = `<div class="order-overview"><div class="crm-actions"><a class="secondary-button" href="/admin/orders">返回全部订单</a><a class="secondary-button" href="/admin?lead=${lead.id}&tab=orders">查看来源线索</a></div>
        <h2>${esc(order.order_number)} · ${esc(orderStatuses[order.status])}</h2><p>客户：${esc(lead.name)} · ${esc(lead.company || "未填公司")} · ${esc(lead.contact || "")}</p>
        <h3>产品与完整规格</h3>${order.items.map((item) => `<p>${esc(item.product)}：${esc(specification(item))}${item.unit_price ? ` · 单价 ${esc(item.unit_price)} ${esc(order.currency)}/${item.form === "sheet" ? "片" : "卷"}` : ""}</p>`).join("")}
        <p>订单总金额：${esc(order.amount)} ${esc(order.currency)}<br>约定交期：${esc(order.delivery_date || "未安排")}</p>
        <h3>发货信息</h3><p>发货日期：${esc(order.shipped_date || "未记录")}<br>物流公司：${esc(order.logistics_company || "未记录")}<br>物流单号：${esc(order.tracking_number || "未记录")}</p>
        ${order.notes ? `<h3>订单备注</h3><p class="message-box">${esc(order.notes)}</p>` : ""}
        <div class="crm-actions"><button id="edit-order-detail" class="primary-button">编辑订单 / 发货</button><button id="reload-order-detail" class="secondary-button">重新加载订单</button></div>
        <h3>最终合同</h3><p>${esc(order.contract_filename || "尚未上传合同")}</p><div class="crm-actions">${order.contract_filename ? `${["application/pdf","image/png","image/jpeg"].includes(order.contract_mime) ? `<a class="secondary-button" href="/admin/api/orders/${order.id}/contract" target="_blank" rel="noopener">预览合同</a>` : '<span class="muted">Word 文件请下载查看</span>'}<a class="secondary-button" href="/admin/api/orders/${order.id}/contract?download=1">下载合同</a>` : ""}<button id="order-contract" class="secondary-button">${order.contract_filename ? "替换最终合同" : "上传最终合同"}</button></div>
        <small class="muted">录入：${esc(format(order.created_at))} · 更新：${esc(format(order.updated_at))}</small></div>`;
      $("edit-order-detail").onclick = () => editOrder(lead.id, order);
      $("order-contract").onclick = () => uploadContract(lead.id, order);
      $("reload-order-detail").onclick = () => loadOrderDetail(id);
      if (editing) { history.replaceState(null, "", `/admin/orders/${id}`); editOrder(lead.id, order); }
    } catch (error) { $("orders-content").textContent = error.message; notice(error.message, true); }
  }
  function showWorkspace() {
    $("workspace-dialog").setAttribute("aria-labelledby", "workspace-title");
    if (!$("workspace-dialog").open) $("workspace-dialog").showModal();
  }
  function editOrder(inquiryId, order = null) {
    const values = order || { status: "draft", currency: "CNY", items: [{ form: "sheet" }] }, requestKey = crypto.randomUUID();
    let contractDraft = null, recognitionRun = 0, inferredNumber = null;
    $("workspace-content").innerHTML = `<h2 id="workspace-title">${order ? "编辑订单 / 发货" : "新增订单"}</h2><p class="muted">一单可记录多种规格。片材单位：长/宽/厚均为 mm，数量为片；卷材单位：长 m、宽/厚 mm，数量为卷。订单金额为最终确认金额，不自动按单价计算。</p>
      <form id="order-form" class="crm-form">${!order ? `<section class="wide"><h3>从合同识别订单号（可选）</h3><p class="muted">支持可复制文字的 PDF、.docx，最大 10 MiB。只识别合同编号；请核对编号并手工填写规格、数量和金额。保存订单时一并保存本合同，草稿 30 分钟后过期。</p><label><span>选择用于识别的合同</span><input name="contract_file" id="order-contract-file" type="file" accept=".pdf,.docx"></label><div class="crm-actions"><button id="read-order-contract" class="secondary-button" type="button" disabled>识别合同编号</button><button id="clear-order-contract" class="secondary-button" type="button">取消所选合同</button></div><div id="contract-recognition" role="status" aria-live="polite"></div></section>` : ""}${field("order_number", "订单编号（必填且唯一）", values.order_number)}
      <label><span>订单状态</span><select name="status">${Object.entries(orderStatuses).map(([key, label]) => `<option value="${key}"${key === values.status ? " selected" : ""}>${label}</option>`).join("")}</select></label>
      ${field("amount", "订单总金额（必填）", values.amount)}${field("currency", "币种（如 CNY / USD）", values.currency)}
      ${field("delivery_date", "约定交期", values.delivery_date, "date")}${field("shipped_date", "发货日期（已发货/已完成必填）", values.shipped_date, "date")}
      ${field("logistics_company", "物流公司", values.logistics_company)}${field("tracking_number", "物流单号", values.tracking_number)}
      <section class="wide"><h3>产品与完整规格</h3><div id="order-items"></div><button type="button" id="add-order-item" class="secondary-button">增加规格</button></section>
      ${field("notes", "订单备注", values.notes, "textarea", true)}<div id="order-error" class="error-text wide" role="alert"></div><button class="primary-button wide" type="submit">保存订单</button></form>`;
    const addItem = (item = { form: "sheet" }) => {
      const wrapper = document.createElement("fieldset"); wrapper.className = "crm-form order-item";
      wrapper.innerHTML = `<legend>规格明细</legend>${field("product", "产品名称（必填）", item.product || "AGM 隔板")}
        <label><span>形态</span><select name="form"><option value="sheet"${item.form === "sheet" ? " selected" : ""}>片材</option><option value="roll"${item.form === "roll" ? " selected" : ""}>卷材</option></select></label>
        ${field("length", "长度（片材 mm / 卷材 m）", item.length)}${field("width", "宽度（mm）", item.width)}${field("thickness", "厚度（mm）", item.thickness)}${field("quantity", "数量（片 / 卷，整数）", item.quantity)}${field("unit_price", "每片 / 每卷单价（选填）", item.unit_price)}<button class="secondary-button" type="button">移除此规格</button>`;
      wrapper.querySelector("button").onclick = () => wrapper.remove(); $("order-items").append(wrapper);
    };
    values.items.forEach(addItem); $("add-order-item").onclick = () => { if ($("order-items").children.length < 50) addItem(); };
    showWorkspace();
    const releaseDraft = async () => { const id = contractDraft; contractDraft = null; if (id) await api(`/orders/contract-drafts/${id}/cancel`, {}).catch(() => {}); };
    if (!order) {
      const form = $("order-form"), fileInput = $("order-contract-file"), readButton = $("read-order-contract"), saveButton = form.querySelector('button[type="submit"]');
      const numberInput = form.elements.order_number;
      numberInput.oninput = () => { inferredNumber = null; };
      const changed = async () => {
        recognitionRun++; readButton.disabled = !fileInput.files.length; saveButton.disabled = false;
        if (inferredNumber && numberInput.value === inferredNumber) numberInput.value = "";
        inferredNumber = null; $("contract-recognition").textContent = "";
        await releaseDraft();
      };
      fileInput.onchange = changed;
      $("clear-order-contract").onclick = () => { fileInput.value = ""; changed(); };
      $("workspace-dialog").addEventListener("close", () => { recognitionRun++; releaseDraft(); }, { once: true });
      readButton.onclick = async () => {
        const run = ++recognitionRun; readButton.disabled = true; saveButton.disabled = true;
        $("contract-recognition").textContent = "正在本站服务器识别，请稍候…";
        try {
          await releaseDraft();
          const file = fileInput.files[0];
          if (!file || file.size > 10 * 1024 * 1024) throw new Error("请选择不超过 10 MiB 的 PDF 或 .docx 合同");
          const body = new FormData(); body.set("file", file);
          const result = await api(`/inquiries/${inquiryId}/order-contract-preview`, body);
          if (run !== recognitionRun || !form.isConnected || !$("workspace-dialog").open) { await api(`/orders/contract-drafts/${result.draft_id}/cancel`, {}); return; }
          contractDraft = result.draft_id;
          const candidates = result.candidates;
          $("contract-recognition").innerHTML = `<p>已关联合同：${esc(file.name)}。${candidates.length ? "请核对下列合同编号，确认后保存订单。" : "未识别到明确合同编号，请手工填写订单号；所选合同仍会随订单保存。"}</p>` + candidates.map((candidate, i) => `<div class="duplicate-box"><strong>${esc(candidate.number)}</strong><p>${esc(candidate.context)}</p>${candidate.existing_order_id ? `<p class="error-text">此编号已有订单 <a href="/admin/orders/${candidate.existing_order_id}">#${candidate.existing_order_id}</a>，不能重复创建。</p>` : ""}<button type="button" class="secondary-button" data-contract-number="${i}">使用此编号</button></div>`).join("");
          const applyNumber = (number) => { numberInput.value = number; inferredNumber = number; };
          if (candidates.length === 1 && !numberInput.value && !candidates[0].existing_order_id) applyNumber(candidates[0].number);
          $("contract-recognition").querySelectorAll("[data-contract-number]").forEach((button) => button.onclick = () => applyNumber(candidates[Number(button.dataset.contractNumber)].number));
        } catch (error) {
          if (run === recognitionRun && form.isConnected) $("contract-recognition").textContent = `${error.message}。合同尚未关联，可重试；也可取消所选合同后手动录入。`;
        } finally { if (run === recognitionRun) { readButton.disabled = !fileInput.files.length; saveButton.disabled = false; } }
      };
    }
    $("order-form").onsubmit = async (event) => {
      event.preventDefault(); const form = event.target, button = form.querySelector('button[type="submit"]'); button.disabled = true;
      try {
        const input = Object.fromEntries(new FormData(form));
        delete input.contract_file;
        if (!order && $("order-contract-file").files.length && !contractDraft) throw new Error("请先识别所选合同，或取消所选合同后再保存");
        input.items = [...form.querySelectorAll(".order-item")].map((element) => Object.fromEntries([...element.querySelectorAll("input,select")].map((el) => [el.name, el.value])));
        const data = await api(`/inquiries/${inquiryId}/orders${order ? '/' + order.id : ''}`, { ...input, version: order?.version, request_key: requestKey, contract_draft_id: contractDraft });
        contractDraft = null;
        $("workspace-dialog").close();
        if (!ordersPage) location.assign(`/admin/orders/${data.order.id}`);
        else { notice("订单已保存，客户等级保持不变"); await loadOrderDetail(data.order.id); }
      } catch (error) { $("order-error").textContent = error.message; } finally { button.disabled = false; }
    };
  }
  function uploadContract(inquiryId, order) {
    $("workspace-content").innerHTML = `<h2 id="workspace-title">${order.contract_filename ? "替换" : "上传"}最终合同 · ${esc(order.order_number)}</h2><p class="muted">每单保留一份最终确认文件；PDF、JPG、PNG 可在线预览，Word 文件可下载查看。最大 10 MiB。</p><form id="contract-form" class="crm-form"><label class="wide"><span>最终合同文件</span><input name="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" required></label>${order.contract_filename ? `<label class="wide"><span>当前：${esc(order.contract_filename)}。替换后旧文件不再保留，但操作记录保留。</span><input type="checkbox" name="replace" value="true" required aria-label="确认替换旧合同"></label>` : ""}<div id="contract-error" class="error-text wide" role="alert"></div><button class="primary-button" type="submit">保存最终合同</button></form>`;
    showWorkspace();
    $("contract-form").onsubmit = async (event) => {
      event.preventDefault(); const form = event.target, button = form.querySelector("button"); button.disabled = true;
      try {
        const body = new FormData(form); body.set("version", String(order.version));
        if (form.elements.file.files[0].size > 10 * 1024 * 1024) throw new Error("合同不能超过 10 MiB");
        await api(`/orders/${order.id}/contract`, body); $("workspace-dialog").close(); notice("最终合同已保存"); await loadOrderDetail(order.id);
      } catch (error) { $("contract-error").textContent = error.message; } finally { button.disabled = false; }
    };
  }

  function editLead(row = null) {
    const editing = Boolean(row), values = row || {}, website = row?.record_origin === "website";
    $("workspace-content").innerHTML = `<h2 id="workspace-title">${editing ? "编辑基本资料" : "新增线索"}</h2><form id="lead-form" class="crm-form">
      ${["name","company","country","email","phone","wechat","whatsapp","contact"].map((k) => field(k, options.fields[k], values[k], k === "email" ? "email" : "text")).join("")}
      <label><span>来源渠道</span><select name="source_channel"${website ? " disabled" : ""}>${channelOptions(values.source_channel || "wechat")}</select></label>
      ${field("source_detail", "来源说明（其他渠道必填）", values.source_detail, "text", false, website)}
      ${field("message", website ? "官网原始留言（只读）" : "需求内容", values.message, "textarea", true, website)}
      ${field("interested_product", "产品", values.interested_product)}${field("application", "应用", values.application)}
      ${field("first_contact_at", "首次联系时间（上海时间）", local(values.first_contact_at), "datetime-local")}
      ${!editing ? `<label><span>等级</span><select name="lead_grade">${gradeOptions("B")}</select></label>${field("next_follow_up_at", "下次跟进时间（上海时间）", "", "datetime-local")}${field("next_action", "下一步")}${field("initial_follow_up", "初始跟进内容（可选）", "", "textarea", true)}${field("follow_up_at", "初始沟通时间（不填则标记时间未知）", "", "datetime-local")}` : ""}
      <div id="lead-error" class="error-text wide" role="alert"></div><div id="lead-duplicates" class="wide"></div><div class="crm-actions wide"><button class="primary-button" type="submit">${editing ? "保存资料" : "新增线索"}</button></div></form>`;
    $("workspace-dialog").setAttribute("aria-labelledby", "workspace-title"); if (!$("workspace-dialog").open) $("workspace-dialog").showModal();
    let duplicateToken = null;
    const save = async (confirmDuplicate = false) => {
      const form = $("lead-form"), button = form.querySelector('button[type="submit"]'); button.disabled = true;
      try {
        const body = { ...Object.fromEntries(new FormData(form)), ...(editing ? { version: row.version } : { duplicate_token: confirmDuplicate ? duplicateToken : null }) };
        const data = await api(editing ? `/inquiries/${row.id}/basic` : "/inquiries", body);
        $("workspace-dialog").close(); notice(editing ? "资料已保存" : "线索已新增"); await load(); await openDetail(data.inquiry.id);
      } catch (error) {
        $("lead-error").textContent = error.message;
        if (error.code === "duplicates") {
          duplicateToken = error.duplicate_token;
          $("lead-duplicates").innerHTML = `<div class="duplicate-box">已有相同联系方式：${error.duplicates.map((d) => `#${d.id} ${esc(d.name)} ${esc(d.company || "")}`).join("；")}<div class="crm-actions"><button id="confirm-new-request" type="button" class="secondary-button">确认作为新需求新增</button><button type="button" id="cancel-new-request" class="secondary-button">跳过并关闭</button></div></div>`;
          $("confirm-new-request").onclick = () => save(true); $("cancel-new-request").onclick = () => $("workspace-dialog").close();
        }
      } finally { button.disabled = false; }
    };
    $("lead-form").onsubmit = (e) => { e.preventDefault(); save(); };
    $("lead-form").oninput = () => { duplicateToken = null; $("lead-duplicates").innerHTML = ""; };
  }
  $("new-lead").onclick = () => editLead();

  async function batches() {
    const data = await api("/crm/imports");
    $("batch-filter").innerHTML = '<option value="">全部批次</option>' + data.batches.map((b) => `<option value="${b.id}">${esc(format(b.created_at))} · ${esc(b.filename)} · ${b.result.imported} 条</option>`).join("");
    $("batch-filter").value = state.batch;
  }
  async function openImport() {
    const generation = ++importGeneration;
    if (draft) { try { await api(`/crm/imports/${draft}/cancel`, {}); } catch {} }
    draft = null; preview = null;
    $("workspace-content").innerHTML = '<h2 id="workspace-title">导入线索</h2><p class="muted">支持 .xlsx、UTF-8 CSV；最多 5 MiB、1,000 条线索、50 列。先预览，确认后才创建线索。日期按上海时间填写 YYYY-MM-DD HH:mm。</p><form id="upload-form" class="crm-form"><label class="wide"><span>选择文件</span><input name="file" type="file" accept=".xlsx,.csv" required></label><button class="primary-button">上传并选择字段</button></form><div id="import-error" class="error-text" role="alert"></div><div id="import-steps"></div>';
    $("workspace-dialog").setAttribute("aria-labelledby", "workspace-title"); if (!$("workspace-dialog").open) $("workspace-dialog").showModal();
    $("upload-form").onsubmit = async (e) => {
      e.preventDefault(); const button = e.target.querySelector("button"); button.disabled = true;
      try {
        const file = e.target.elements.file.files[0]; if (file.size > 5 * 1024 * 1024) throw new Error("文件不能超过 5 MiB");
        if (draft) await api(`/crm/imports/${draft}/cancel`, {});
        const staged = await api("/crm/imports", new FormData(e.target));
        if (generation !== importGeneration || !$("workspace-dialog").open) { await api(`/crm/imports/${staged.id}/cancel`, {}); return; }
        importData = staged; draft = staged.id; renderMapping(); $("import-error").textContent = "";
      } catch (error) { if (generation === importGeneration && $("import-error")) $("import-error").textContent = error.message; } finally { button.disabled = false; }
    };
  }
  function renderMapping() {
    $("import-steps").innerHTML = `<h3>工作表与列映射</h3><label><span>工作表</span><select id="sheet-select">${importData.sheets.map((s) => `<option value="${s.index}">${esc(s.name)}（${s.count} 行）</option>`).join("")}</select></label><div id="mapping-fields" class="map-grid"></div><div class="crm-form"><label><span>未填写渠道时使用</span><select id="default-channel">${channelOptions("", true)}</select></label><label><span>默认来源说明（可选）</span><input id="default-detail"></label></div><div class="crm-actions"><button id="preview-import" class="primary-button">校验并预览</button><button id="cancel-import" class="secondary-button">取消草稿</button></div><div id="preview-content"></div>`;
    const renderColumns = () => {
      const sheet = importData.sheets[Number($("sheet-select").value)];
      $("mapping-fields").innerHTML = sheet.headers.map((header, i) => `<label><span>${i + 1}. ${esc(header || "空表头")}</span><select data-column="${i}"><option value="">忽略该列</option>${Object.entries(options.fields).map(([key, label]) => `<option value="${key}"${sheet.mapping[i] === key ? " selected" : ""}>${esc(label)}</option>`).join("")}</select></label>`).join("");
      $("preview-content").innerHTML = ""; preview = null;
    };
    renderColumns(); $("sheet-select").onchange = renderColumns;
    $("cancel-import").onclick = async () => { try { await api(`/crm/imports/${draft}/cancel`, {}); draft = null; $("workspace-dialog").close(); } catch(e) { $("import-error").textContent = e.message; } };
    $("preview-import").onclick = async () => {
      const button = $("preview-import"); button.disabled = true;
      try {
        preview = await api(`/crm/imports/${draft}/preview`, { sheet: Number($("sheet-select").value), mapping: [...document.querySelectorAll("[data-column]")].map((el) => el.value), default_channel: $("default-channel").value, default_detail: $("default-detail").value });
        renderPreview(); $("import-error").textContent = "";
      } catch(e) { $("import-error").textContent = e.message; } finally { button.disabled = false; }
    };
    [$("mapping-fields"), $("default-channel"), $("default-detail")].forEach((el) => el.addEventListener("change", () => { preview = null; $("preview-content").innerHTML = ""; }));
  }
  function renderPreview() {
    const counts = preview.counts;
    $("preview-content").innerHTML = `<h3>导入预览</h3><p>正常 ${counts.valid} · 重复 ${counts.duplicate} · 错误 ${counts.error} · 空行 ${counts.empty}</p><p id="import-selection-count"></p><p class="muted">重复项默认跳过；勾选重复行表示确认“作为新需求新增”，不会覆盖原线索。</p>${counts.error ? `<a class="secondary-button" href="/admin/api/crm/imports/${draft}/errors.csv">下载错误行 CSV</a>` : ""}<div class="preview-wrap"><table class="preview-table"><thead><tr><th>导入</th><th>行号</th><th>姓名/名称</th><th>状态与原因</th></tr></thead><tbody>${preview.rows.map((r) => `<tr><td>${["valid","duplicate"].includes(r.status) ? `<input type="checkbox" data-import-row="${r.row}" data-duplicate="${r.status === "duplicate"}"${r.status === "valid" ? " checked" : ""} aria-label="${r.status === "duplicate" ? "作为新需求新增第" : "导入第"}${r.row}行">` : "—"}</td><td>${r.row}</td><td>${esc((r.lead || r.input).name || "—")}</td><td>${esc(r.error || (r.status === "duplicate" ? r.duplicates.map((d) => d.id ? `已有 #${d.id} ${d.name}` : `本批第 ${d.row} 行 ${d.name}`).join("；") : r.status === "empty" ? "空行跳过" : "正常"))}</td></tr>`).join("")}</tbody></table></div><button id="confirm-import" class="primary-button">确认导入所选有效行</button>`;
    const countSelection = () => { const n = document.querySelectorAll('[data-import-row]:checked').length; $("import-selection-count").textContent = `将导入 ${n} 条，跳过 ${preview.rows.length - n} 条`; };
    document.querySelectorAll("[data-import-row]").forEach((el) => el.onchange = countSelection); countSelection();
    $("confirm-import").onclick = async () => {
      const button = $("confirm-import"); button.disabled = true;
      const checked = [...document.querySelectorAll('[data-import-row]:checked')];
      try {
        const result = await api(`/crm/imports/${draft}/confirm`, { token: preview.token, include_rows: checked.map((el) => Number(el.dataset.importRow)), allow_duplicate_rows: checked.filter((el) => el.dataset.duplicate === "true").map((el) => Number(el.dataset.importRow)) });
        draft = null; state.batch = result.batch_id; state.grade = "all"; state.channel = "all"; state.follow_up = "all"; state.q = ""; state.page = 1;
        $("grade-filter").value = "all"; $("channel-filter").value = "all"; $("follow-filter").value = "all"; $("search").value = "";
        await batches(); await load(); $("workspace-dialog").close(); notice(`导入完成：新增 ${result.imported} 条，跳过 ${result.skipped} 条。正在查看本批线索。`);
      } catch (error) { $("import-error").textContent = error.message; if (error.code === "preview_changed") $("preview-content").innerHTML = '<p class="error-text">请点击“校验并预览”重新检查最新重复项。</p>'; }
      finally { button.disabled = false; }
    };
  }
  $("import-leads").onclick = openImport;
  $("workspace-dialog").addEventListener("close", () => { importGeneration++; if (draft) { const id = draft; draft = null; api(`/crm/imports/${id}/cancel`, {}).catch(() => {}); } });
  $("new-lead").disabled = true; $("import-leads").disabled = true;
  $("leads-view").hidden = ordersPage; $("orders-view").hidden = !ordersPage;
  $(ordersPage ? "nav-orders" : "nav-leads").setAttribute("aria-current", "page");
  if (ordersPage) {
    $("page-title").textContent = "订单管理";
    $("lead-actions").querySelectorAll("#new-lead,#import-leads,a").forEach((element) => element.hidden = true);
  }
  $("order-status").innerHTML += Object.entries(orderStatuses).map(([key, label]) => `<option value="${key}">${label}</option>`).join("");
  $("order-status").onchange = (event) => { orderState.status = event.target.value; orderState.page = 1; loadOrderList(); };
  let orderTimer; $("order-search").oninput = (event) => { clearTimeout(orderTimer); orderTimer = setTimeout(() => { orderState.q = event.target.value; orderState.page = 1; loadOrderList(); }, 250); };
  $("orders-prev").onclick = () => { orderState.page--; loadOrderList(); }; $("orders-next").onclick = () => { orderState.page++; loadOrderList(); };
  api("/crm/options").then(async (data) => {
    options = data; grades = data.grades; $("new-lead").disabled = false; $("import-leads").disabled = false;
    if (ordersPage) { if (orderId) await loadOrderDetail(orderId, new URLSearchParams(location.search).get("edit") === "1"); else await loadOrderList(); }
    else { await batches(); await load(); const params = new URLSearchParams(location.search); if (/^\d+$/.test(params.get("lead") || "")) await openDetail(Number(params.get("lead")), params.get("tab") === "orders" ? "orders" : "follow"); }
  }).catch((e) => notice(e.message, true));
}
