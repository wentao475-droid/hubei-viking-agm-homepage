import { channels } from "./crm-store.js";

export function crmBody() {
  const options = Object.entries(channels).map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  return `<main class="admin-shell">
    <header class="topbar"><div><p class="eyebrow">Viking AGM</p><h1>线索管理</h1><p class="timezone-note">官网与其他渠道统一管理 · 时间均为上海时间</p></div>
      <div class="topbar-actions"><button id="new-lead" class="primary-button">新增线索</button><button id="import-leads" class="secondary-button">导入线索</button>
      <a class="secondary-button" href="/admin/api/crm/template.csv">下载导入模板</a><form method="POST" action="/admin/logout"><button class="ghost-button">退出</button></form></div></header>
    <div id="notice" role="status" aria-live="polite"></div>
    <section class="stats-grid" aria-label="线索等级统计">${[["A", "服务中"], ["B", "洽谈中"], ["C", "已流失"], ["D", "待联系"], ["E", "无效"]].map(([grade, label]) => `<button class="stat-card" data-grade="${grade}"><span>${grade} · ${label}</span><strong id="stat-${grade}">0</strong></button>`).join("")}</section>
    <section class="panel"><div class="toolbar crm-toolbar">
      <label><span>搜索线索及跟进内容</span><input id="search" type="search" placeholder="姓名、公司、联系方式、需求…"></label>
      <label><span>渠道</span><select id="channel-filter"><option value="all">全部渠道</option>${options}</select></label>
      <label><span>等级</span><select id="grade-filter"><option value="work">A/B/D 工作队列</option><option value="all">全部等级</option>${["A", "B", "C", "D", "E"].map((g) => `<option>${g}</option>`).join("")}</select></label>
      <label><span>跟进状态（A/B/D）</span><select id="follow-filter"><option value="all">全部</option><option value="today">今日待跟进</option><option value="overdue">已逾期</option><option value="unscheduled">未安排</option></select></label>
      <label><span>排序</span><select id="sort-filter"><option value="created">最新录入优先</option><option value="follow_up">下次跟进时间</option></select></label>
      <label><span>导入批次</span><select id="batch-filter"><option value="">全部批次</option></select></label>
    </div><div class="crm-actions"><a id="export-csv" class="secondary-button">导出线索 CSV</a><a id="export-follow-ups" class="secondary-button">导出完整跟进 CSV</a><span id="status-message" role="status"></span></div>
    <div id="bulk-actions" class="crm-actions" hidden><span id="selected-count"></span><select id="bulk-grade" aria-label="批量等级">${["A", "B", "C", "D", "E"].map((g) => `<option${g === "D" ? " selected" : ""}>${g}</option>`).join("")}</select><button id="apply-bulk-grade" class="primary-button">应用等级</button><button id="clear-selection" class="secondary-button">清除选择</button></div>
    <div id="inquiry-list" class="inquiry-list"></div><div class="pagination"><button id="prev-page" class="secondary-button">上一页</button><span id="page-label"></span><button id="next-page" class="secondary-button">下一页</button></div></section>
    <dialog id="detail-drawer" class="crm-drawer"><button class="close-button" data-close="detail-drawer" aria-label="关闭详情">关闭</button><div id="detail-content"></div></dialog>
    <dialog id="workspace-dialog" class="crm-dialog"><button class="close-button" data-close="workspace-dialog" aria-label="关闭窗口">关闭</button><div id="workspace-content"></div></dialog>
  </main><script src="/admin/api/crm.js" defer></script>`;
}

export const crmStyles = `
  .topbar-actions,.crm-actions { display:flex;gap:10px;flex-wrap:wrap;align-items:center; }
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
  const grades = { A: "服务中", B: "洽谈中", C: "已流失", D: "待联系", E: "无效" };
  const state = { page: 1, grade: "work", channel: "all", follow_up: "all", sort: "created", batch: "", q: "" };
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
  function changesHtml(json) {
    const changes = JSON.parse(json);
    const entries = changes.before && changes.after
      ? Object.keys(changes.after).map((key) => [key, { before: changes.before[key], after: changes.after[key] }])
      : Object.entries(changes);
    const value = (key, text) => text == null || text === "" ? "未设置" : key.endsWith("_at") ? format(text) : key === "lead_grade" ? `${text} · ${grades[text] || text}` : key === "source_channel" ? options.channels[text] || text : text;
    return '<ul>' + entries.filter(([, item]) => item.before !== item.after).map(([key, item]) => `<li>${esc(options.fields[key] || key)}：${esc(value(key, item.before))} → ${esc(value(key, item.after))}</li>`).join("") + '</ul>';
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
    $("inquiry-list").innerHTML = rows.length ? '<div class="table-head"><input id="select-all" type="checkbox" aria-label="选择本页"><span>录入时间</span><span>线索</span><span>公司</span><span>需求</span><span>渠道</span><span>跟进</span><span>等级</span></div>' + rows.map((row) => `<div class="inquiry-row" tabindex="0" role="button" data-id="${row.id}" aria-label="查看 ${esc(row.name)}"><input class="row-check" type="checkbox" value="${row.id}" aria-label="选择线索 ${row.id}">${cell(format(row.created_at), "#" + row.id)}${cell(row.name, row.contact)}${cell(row.company, row.country)}${cell(row.interested_product || row.application, row.message)}${cell(options.channels[row.source_channel], row.source_detail || row.utm_source || row.referrer)}${cell("下次：" + format(row.next_follow_up_at), row.last_follow_up_at ? "最近：" + format(row.last_follow_up_at) : row.latest_follow_up ? "最近：时间未知" : "暂无沟通记录")}<span class="badge grade-${row.lead_grade.toLowerCase()}">${row.lead_grade} · ${grades[row.lead_grade]}</span></div>`).join("") : '<p class="muted">没有符合条件的线索。</p>';
    document.querySelectorAll(".inquiry-row").forEach((el) => {
      el.onclick = (e) => { if (e.target.type !== "checkbox") openDetail(Number(el.dataset.id)); };
      el.onkeydown = (e) => { if ((e.key === "Enter" || e.key === " ") && e.target === el) { e.preventDefault(); openDetail(Number(el.dataset.id)); } };
    });
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

  async function openDetail(id) {
    try {
      const data = await api("/inquiries/" + id), row = data.inquiry;
      const pair = (label, value) => `<div class="detail-item"><span>${esc(label)}</span><strong>${esc(value || "—")}</strong></div>`;
      $("detail-content").innerHTML = `<h2 id="detail-title">${esc(row.name)}</h2><span class="badge grade-${row.lead_grade.toLowerCase()}">${row.lead_grade} · ${grades[row.lead_grade]}</span>
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
        <h3>跟进时间线</h3><ol class="timeline">${data.activities.map((a) => `<li><strong>${esc(a.kind === "legacy_note" ? "历史备注 · 时间未知" : a.kind === "communication" ? (a.happened_at ? format(a.happened_at) : "历史沟通 · 时间未知") + " · " + a.method : "操作记录 · " + format(a.happened_at))}</strong><p>${esc(a.content)}</p>${a.next_action ? `<p>下一步：${esc(a.next_action)}</p>` : ""}${a.changes_json ? `<details><summary>查看变更</summary>${changesHtml(a.changes_json)}</details>` : ""}<small>录入：${esc(format(a.recorded_at))} · ${esc(a.actor)}${a.next_follow_up_at ? " · 下次跟进：" + esc(format(a.next_follow_up_at)) : ""}</small></li>`).join("") || '<li>暂无跟进记录</li>'}</ol>`;
      $("detail-drawer").setAttribute("aria-labelledby", "detail-title"); if (!$("detail-drawer").open) $("detail-drawer").showModal();
      $("edit-basic").onclick = () => editLead(row); $("reload-detail").onclick = () => openDetail(id);
      const submit = async (plan) => {
        const form = $("follow-up-form"), data = Object.fromEntries(new FormData(form));
        const buttons = form.querySelectorAll("button"); buttons.forEach((b) => b.disabled = true);
        try { await api(`/inquiries/${id}/follow-ups`, { ...data, kind: plan ? "plan" : "communication", ...(plan ? { content: "" } : {}), version: row.version }); await openDetail(id); await load(); }
        catch (e) { $("follow-error").textContent = e.message; } finally { buttons.forEach((b) => b.disabled = false); }
      };
      $("follow-up-form").onsubmit = (e) => { e.preventDefault(); submit(false); }; $("save-plan").onclick = () => submit(true);
    } catch (e) { notice(e.message, true); }
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
      ${!editing ? `<label><span>等级</span><select name="lead_grade">${gradeOptions("D")}</select></label>${field("next_follow_up_at", "下次跟进时间（上海时间）", "", "datetime-local")}${field("next_action", "下一步")}${field("initial_follow_up", "初始跟进内容（可选）", "", "textarea", true)}${field("follow_up_at", "初始沟通时间（不填则标记时间未知）", "", "datetime-local")}` : ""}
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
  api("/crm/options").then(async (data) => { options = data; $("new-lead").disabled = false; $("import-leads").disabled = false; await batches(); await load(); }).catch((e) => notice(e.message, true));
}
