import crypto from "node:crypto";

const productIntentPatterns = [
  /\bagm\b/i,
  /battery\s+separator/i,
  /separator\s+(roll|sheet)/i,
  /\bvrla\b/i,
  /lead[-\s]?acid/i,
  /\bups\s+batter/i,
  /energy\s+storage\s+batter/i,
  /隔板|铅酸|蓄电池|电池|卷材|片材|吸液/u
];

const unrelatedServicePatterns = [
  /\bseo\b/i,
  /web(site)?\s+(design|development|redesign)/i,
  /design[-\s]?related\s+issues?/i,
  /promotional\s+video|video\s+production/i,
  /guest\s+post|blog\s+writing|content\s+writing|backlinks?/i,
  /audio\s+(version|conversion)/i,
  /amusement\s+rides?/i,
  /increase\s+(your\s+)?(traffic|rankings?)/i,
  /网站设计|网站开发|搜索优化|推广视频|博客代写|外链|游乐设备/u
];

const solicitationPatterns = [
  /\bwe\s+help\b/i,
  /\bwould\s+you\s+like\b/i,
  /\bcan\s+i\s+send\b/i,
  /\breach(?:ing)?\s+out\b/i,
  /\bour\s+services?\b/i,
  /manufacturer\s+in\s+china/i,
  /looking\s+over\s+(your\s+)?(site|website|vikingagm\.com)/i,
  /noticed?.{0,50}(site|website|vikingagm\.com)/i,
  /推广|外链合作|内容合作|业务合作/u
];

const testNames = new Set([
  "test",
  "mailtest",
  "publictest",
  "测试线上",
  "测试线索"
]);

export function classifyInquiry({ inquiry, duplicateOfId = null, testContacts = [] }) {
  if (duplicateOfId) {
    return automaticGrade("E", "duplicate_submission", duplicateOfId);
  }

  if (isInternalTest(inquiry, testContacts)) {
    return automaticGrade("E", "internal_test");
  }

  const combined = normalizeText(
    [
      inquiry.name,
      inquiry.company,
      inquiry.application,
      inquiry.interested_product,
      inquiry.message
    ].join(" ")
  );
  const hasSelectedProductIntent = [
    inquiry.application,
    inquiry.interested_product
  ].some(hasMeaningfulSelection);
  const hasProductIntent =
    hasSelectedProductIntent ||
    productIntentPatterns.some((pattern) => pattern.test(combined));
  const hasUnrelatedService = unrelatedServicePatterns.some((pattern) =>
    pattern.test(combined)
  );
  const hasSolicitation = solicitationPatterns.some((pattern) =>
    pattern.test(combined)
  );

  if (!hasProductIntent && hasUnrelatedService && hasSolicitation) {
    return automaticGrade("E", "unrelated_solicitation");
  }

  return automaticGrade("D", null);
}

export function normalizeContactIdentity(inquiry) {
  const email = normalizeText(inquiry.email);
  const contact = normalizeText(inquiry.contact);
  const emailMatch = `${email} ${contact}`.match(
    /[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}/i
  );

  if (emailMatch) {
    return emailMatch[0].toLowerCase();
  }

  const phone = contact.replace(/[^\d+]/g, "");
  if (phone.replace(/\D/g, "").length >= 7) {
    return phone;
  }

  return contact;
}

export function createMessageFingerprint(message) {
  const normalized = normalizeText(message);
  if (!normalized) {
    return "";
  }

  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export function normalizeTestContacts(value) {
  if (value instanceof Set) {
    return value;
  }
  const entries = Array.isArray(value) ? value : String(value || "").split(",");
  return new Set(
    entries
      .map((entry) => normalizeContactIdentity({ contact: entry, email: entry }))
      .filter(Boolean)
  );
}

export function normalizeText(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/\u0000/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function automaticGrade(leadGrade, classificationReason, duplicateOfId = null) {
  return {
    lead_grade: leadGrade,
    classification_source: "automatic",
    classification_reason: classificationReason,
    duplicate_of_id: duplicateOfId
  };
}

function isInternalTest(inquiry, testContacts) {
  const identity = normalizeContactIdentity(inquiry);
  const configuredContacts = normalizeTestContacts(testContacts);
  const name = normalizeText(inquiry.name);
  const message = normalizeText(inquiry.message);
  const emailDomain = identity.includes("@") ? identity.split("@").pop() : "";

  return (
    emailDomain === "example.com" ||
    configuredContacts.has(identity) ||
    testNames.has(name) ||
    message.startsWith("[test]")
  );
}

function hasMeaningfulSelection(value) {
  const normalized = normalizeText(value);
  return Boolean(
    normalized &&
      !new Set(["-", "n/a", "na", "none", "not sure", "暂不确定"]).has(
        normalized
      )
  );
}
