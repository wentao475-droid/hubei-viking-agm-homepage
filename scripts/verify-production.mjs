import { resolve4, resolveCname } from "node:dns/promises";

const siteUrl = process.env.SITE_URL || "https://www.vikingagm.com";
const expectedHost = new URL(siteUrl).hostname;
const checks = [
  { path: "/", expectTypes: ["text/html"], expectText: "Hubei Viking Technology" },
  { path: "/zh/", expectTypes: ["text/html"], expectText: "AGM" },
  {
    path: "/sitemap.xml",
    expectTypes: ["application/xml", "text/xml"],
    expectText: "https://www.vikingagm.com/zh/"
  },
  {
    path: "/robots.txt",
    expectTypes: ["text/plain"],
    expectText: "Sitemap: https://www.vikingagm.com/sitemap.xml"
  }
];

function pass(message) {
  console.log(`PASS ${message}`);
}

function warn(message) {
  console.warn(`WARN ${message}`);
}

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
}

async function checkUrl({ path, expectTypes, expectText }) {
  const url = new URL(path, siteUrl);
  const response = await fetch(url, {
    headers: {
      "User-Agent": "vikingagm-production-check/1.0"
    }
  });

  if (!response.ok) {
    fail(`${url.href} returned ${response.status}`);
    return;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!expectTypes.some((type) => contentType.includes(type))) {
    fail(`${url.href} content-type is ${contentType || "missing"}`);
  } else {
    pass(`${url.href} content-type is ${contentType}`);
  }

  const text = await response.text();
  if (text.includes(expectText)) {
    pass(`${url.href} contains expected content`);
  } else {
    fail(`${url.href} does not contain expected content`);
  }
}

try {
  const cnames = await resolveCname(expectedHost);
  pass(`${expectedHost} CNAME: ${cnames.join(", ")}`);
  if (!cnames.some((name) => /volc|byte|cdn/i.test(name))) {
    warn(`${expectedHost} CNAME does not look like a Volcengine CDN hostname yet`);
  }
} catch {
  try {
    const addresses = await resolve4(expectedHost);
    pass(`${expectedHost} A: ${addresses.join(", ")}`);
    warn(`${expectedHost} has A records instead of a CDN CNAME`);
  } catch (error) {
    warn(`DNS lookup failed for ${expectedHost}: ${error.message}`);
  }
}

for (const check of checks) {
  try {
    await checkUrl(check);
  } catch (error) {
    fail(`${new URL(check.path, siteUrl).href} check failed: ${error.message}`);
  }
}
