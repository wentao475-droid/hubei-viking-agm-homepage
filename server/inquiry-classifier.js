import crypto from "node:crypto";

const unrelatedServicePatterns = [
  /\bseo\b/i,
  /web(site)?\s+(design|development|redesign)/i,
  /design[-\s]?related\s+issues?/i,
  /promotional\s+video|video\s+production/i,
  /guest\s+post|blog\s+writing|content\s+writing|backlinks?/i,
  /audio\s+(version|conversion)/i,
  /amusement\s+rides?/i,
  /digital\s+marketing|social\s+media\s+marketing|google\s+ads|ppc\b/i,
  /lead\s+generation|email\s+marketing|marketing\s+agency/i,
  /app\s+(design|development)|software\s+development|graphic\s+design/i,
  /virtual\s+assistant|data\s+scraping|call\s+center/i,
  /increase\s+(your\s+)?(traffic|rankings?)/i,
  /网站设计|网站开发|搜索优化|推广视频|博客代写|外链|游乐设备|数字营销|社媒营销|获客服务|邮件营销|软件开发/u
];

const unrelatedProductPatterns = [
  /\b(backpacks?|sling bags?|handbags?|luggage|wallets?|shoes|sneakers?|clothing|apparel|jewell?ry|watches?|cosmetics?|skincare|supplements?|toys?|pet\s+(food|supplies)|furniture|mattresses?|travel\s+packages?|car\s+rental)\b/i,
  /背包|双肩包|斜挎包|手提包|行李箱|钱包|鞋服|珠宝|手表|化妆品|护肤品|保健品|玩具|宠物用品|家具|床垫|旅游套餐|租车/u
];

const retailPromotionPatterns = [
  /\b(order|buy|shop)\s+(now|today|ours)\b/i,
  /\b\d{1,3}%\s+off\b/i,
  /\bfree\s+shipping\b/i,
  /\b(new|just)\s+released\b/i,
  /\b(available|on sale|limited offer|special offer)\b/i,
  /限时优惠|立即购买|免费配送|包邮|新品上市/u
];

const highRiskSpamPatterns = [
  /\b(casino|sportsbook|betting|slot\s+machine|porn|escort)\b/i,
  /\b(crypto\s+(investment|trading|signal)|guaranteed\s+returns?)\b/i,
  /博彩|赌博|色情|成人服务|虚拟币投资|稳赚/u
];

const genericPromotionPatterns = [
  /\b(i hope this email finds you well|wanted to let you know)\b/i,
  /\b(perfect for|high[-\s]quality materials|everyday use)\b/i,
  /\b(check out|visit our (store|shop)|learn more)\b/i,
  /希望这封邮件对您有帮助|新品推荐|欢迎选购/u
];

const relevantInquiryPatterns = [
  /\b(agm|separator|glass\s+fiber|vrla|lead[-\s]?acid|battery|ups|start[-\s]?stop)\b/i,
  /隔板|玻璃纤维|蓄电池|铅酸电池|启停电池|不间断电源/u
];

const solicitationPatterns = [
  /\bwe\s+help\b/i,
  /\bwould\s+you\s+like\b/i,
  /\bcan\s+i\s+send\b/i,
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
  const hasUnrelatedService = unrelatedServicePatterns.some((pattern) =>
    pattern.test(combined)
  );
  const hasSolicitation = solicitationPatterns.some((pattern) =>
    pattern.test(combined)
  );
  const hasUnrelatedProduct = unrelatedProductPatterns.some((pattern) =>
    pattern.test(combined)
  );
  const hasRetailPromotion = retailPromotionPatterns.some((pattern) =>
    pattern.test(combined)
  );
  const hasHighRiskSpam = highRiskSpamPatterns.some((pattern) =>
    pattern.test(combined)
  );
  const hasGenericPromotion = genericPromotionPatterns.some((pattern) =>
    pattern.test(combined)
  );
  const inquiryIntent = normalizeText(
    [inquiry.application, inquiry.interested_product, inquiry.message].join(" ")
  );
  const hasRelevantInquiry = relevantInquiryPatterns.some((pattern) =>
    pattern.test(inquiryIntent)
  );
  const hasExternalLink = /\bhttps?:\/\/|\bwww\./i.test(combined);

  if (
    hasHighRiskSpam ||
    (hasUnrelatedService && hasSolicitation) ||
    (hasUnrelatedProduct && (hasRetailPromotion || hasGenericPromotion)) ||
    (!hasRelevantInquiry &&
      hasExternalLink &&
      hasRetailPromotion &&
      hasGenericPromotion)
  ) {
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
