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

test("a selected product format prevents automatic E classification", () => {
  const result = classifyInquiry({
    inquiry: inquiry({
      interested_product: "Rolls",
      message:
        "I noticed your website and wanted to reach out about our content writing services."
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
