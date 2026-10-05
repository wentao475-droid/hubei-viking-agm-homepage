import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyInquiry,
  createMessageFingerprint,
  normalizeContactIdentity
} from "../inquiry-classifier.js";

test("normal VRLA sample inquiry enters D", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      application: "VRLA battery",
      message: "Please recommend an AGM separator sample for our 12V battery."
    })
  });

  assert.equal(result.lead_grade, "D");
  assert.equal(result.classification_reason, null);
});

test("clear unrelated website solicitation enters E", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      application: "",
      message:
        "I noticed design-related issues on your website and wanted to reach out. We help manufacturers with website design."
    })
  });

  assert.equal(result.lead_grade, "E");
  assert.equal(result.classification_reason, "unrelated_solicitation");
});

test("exact duplicate enters E and links the original", () => {
  const result = classifyInquiry({
    inquiry: inquiry(),
    duplicateOfId: 42
  });

  assert.deepEqual(result, {
    lead_grade: "E",
    classification_source: "automatic",
    classification_reason: "duplicate_submission",
    duplicate_of_id: 42
  });
});

test("same contact with a different requirement is not a duplicate", () => {
  const first = createMessageFingerprint("Need 1.2 mm AGM separator rolls");
  const second = createMessageFingerprint("Need 2.0 mm AGM separator sheets");

  assert.notEqual(first, second);
  assert.equal(
    classifyInquiry({
      inquiry: inquiry({ message: "Need 2.0 mm AGM separator sheets" })
    }).lead_grade,
    "D"
  );
});

test("configured internal contact enters E", () => {
  const result = classifyInquiry({
    inquiry: inquiry({ email: "qa@vikingagm.com", contact: "qa@vikingagm.com" }),
    testContacts: ["qa@vikingagm.com"]
  });

  assert.equal(result.lead_grade, "E");
  assert.equal(result.classification_reason, "internal_test");
});

test("product intent prevents an unrelated-keyword false positive", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      application: "UPS battery",
      message:
        "We found your website through SEO and want pricing for AGM battery separator rolls. Please reach out."
    })
  });

  assert.equal(result.lead_grade, "D");
});

test("a selected product format cannot bypass a clear SEO solicitation", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      interested_product: "Rolls",
      message:
        "I noticed your website and can send our Google SEO services package to increase your organic traffic."
    })
  });

  assert.equal(result.lead_grade, "E");
  assert.equal(result.classification_reason, "unrelated_solicitation");
});

test("retail backpack promotion enters E", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      message:
        "Our new BANGE backpacks and sling bags just released. Order now at 50% off with FREE Shipping."
    })
  });

  assert.equal(result.lead_grade, "E");
  assert.equal(result.classification_reason, "unrelated_solicitation");
});

test("posture-corrector promotion enters E", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      message:
        "Our Medico Postura Body Posture Corrector is here to help. Grab it today at a fantastic 60% OFF with FREE shipping: https://medicopostura.com"
    })
  });

  assert.equal(result.lead_grade, "E");
  assert.equal(result.classification_reason, "unrelated_solicitation");
});

test("generic contact-by-email template is quarantined", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      company: "",
      message:
        "I would like more information. Please contact me by email — agm battery separator manufacturer."
    })
  });

  assert.equal(result.lead_grade, "E");
  assert.equal(result.classification_reason, "known_spam_template");
});

test("specific battery request remains allowed without a company name", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      company: "",
      message:
        "Please contact me by email with a quote for 1.2 mm AGM separator rolls and sample availability."
    })
  });

  assert.equal(result.lead_grade, "D");
});

test("high-risk gambling promotion enters E", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      message: "Visit our online casino for guaranteed returns from crypto trading."
    })
  });

  assert.equal(result.lead_grade, "E");
  assert.equal(result.classification_reason, "unrelated_solicitation");
});

test("generic retail campaign with a shop link enters E", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      message:
        "I hope this email finds you well. Our new collection is available now with free shipping: https://shop.example"
    })
  });

  assert.equal(result.lead_grade, "E");
  assert.equal(result.classification_reason, "unrelated_solicitation");
});

test("battery inquiry with a company link remains allowed", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      message:
        "We need AGM separator rolls for VRLA batteries. Our company details are at https://buyer.example."
    })
  });

  assert.equal(result.lead_grade, "D");
});

test("contact identity normalizes email casing and surrounding text", () => {
  assert.equal(
    normalizeContactIdentity({
      contact: "Sales <BUYER@Example.NET>",
      email: ""
    }),
    "buyer@example.net"
  );
});

for (const message of [
  "Commercial messages can be sent through contact forms. A free test is available. You can send 50,000 messages during the free trial. The service price for one million messages is $59. Contact us via Telegram https://t.me/FeedbackFormEU",
  "提供表单群发服务，免费试发，百万条消息优惠。",
  "I would like more information. Please contact me by email — agm battery separator manufacturer.",
  "I hope this email finds you well. Our new collection is available now with free shipping: https://shop.example"
]) {
  test(`campaign cannot bypass filtering with selected AGM product: ${message.slice(0, 35)}`, () => {
    assert.equal(classifyInquiry({ inquiry: inquiry({
      interested_product: "AGM separator sheets", company: "google", message
    }) }).lead_grade, "E");
  });
}

for (const message of [
  "Price?", "Please send a sample.", "I look forward to hearing from you.",
  "Please quote AGM sheets for casino UPS backup batteries.",
  "We need 1.2 mm AGM rolls. Contact me on WhatsApp or Telegram. https://buyer.example",
  "Can you send separator specifications? Our AGM battery product has a free trial.",
  "We use commercial messages for sales but need a quote for AGM separator samples."
]) {
  test(`legitimate or ambiguous request remains D: ${message}`, () => {
    assert.equal(classifyInquiry({ inquiry: inquiry({
      company: "", contact: "buyer@gmail.com", email: "buyer@gmail.com", message
    }) }).lead_grade, "D");
  });
}

function inquiry(overrides = {}) {
  return {
    name: "Buyer",
    contact: "buyer@battery.example",
    email: "buyer@battery.example",
    company: "Battery Co",
    application: "",
    interested_product: "",
    message: "Please send your separator specification.",
    ...overrides
  };
}
