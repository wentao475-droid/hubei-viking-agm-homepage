import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const requiredFiles = [
  "index.html",
  "zh/index.html",
  "request-agm-separator-sample/index.html",
  "zh/request-agm-separator-sample/index.html",
  "applications/agm-separator-for-ups-battery/index.html",
  "zh/applications/agm-separator-for-ups-battery/index.html",
  "applications/agm-separator-for-motorcycle-battery/index.html",
  "zh/applications/agm-separator-for-motorcycle-battery/index.html",
  "applications/agm-separator-for-energy-storage-battery/index.html",
  "zh/applications/agm-separator-for-energy-storage-battery/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "favicon.ico",
  "videos/viking-agm-promo-480p.mp4"
];

function pass(message) {
  console.log(`PASS ${message}`);
}

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
}

function readOutFile(path) {
  return readFileSync(join(outDir, path), "utf8");
}

if (!existsSync(outDir)) {
  fail("out/ does not exist. Run npm run build first.");
  process.exit();
}

for (const file of requiredFiles) {
  const fullPath = join(outDir, file);

  if (!existsSync(fullPath)) {
    fail(`${file} is missing from out/`);
    continue;
  }

  if (statSync(fullPath).size === 0) {
    fail(`${file} is empty`);
  } else {
    pass(`${file} exists`);
  }
}

if (process.exitCode) {
  process.exit();
}

const indexHtml = readOutFile("index.html");
const zhHtml = readOutFile("zh/index.html");
const sitemap = readOutFile("sitemap.xml");
const robots = readOutFile("robots.txt");
const sitemapUrlBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (match) => match[1]
);
const sitemapUrls = sitemapUrlBlocks
  .map((block) => block.match(/<loc>(.*?)<\/loc>/)?.[1])
  .filter(Boolean);

if (indexHtml.includes("https://www.vikingagm.com")) {
  pass("English homepage keeps www canonical URLs");
} else {
  fail("English homepage does not contain https://www.vikingagm.com");
}

if (zhHtml.includes("https://www.vikingagm.com/zh/")) {
  pass("Chinese homepage keeps /zh/ canonical URL");
} else {
  fail("Chinese homepage does not contain https://www.vikingagm.com/zh/");
}

if (indexHtml.includes('<html lang="en"')) {
  pass("English homepage declares lang=en");
} else {
  fail("English homepage does not declare lang=en");
}

if (zhHtml.includes('<html lang="zh-CN"')) {
  pass("Chinese homepage declares lang=zh-CN");
} else {
  fail("Chinese homepage does not declare lang=zh-CN");
}

if (
  sitemap.includes("https://www.vikingagm.com/") &&
  sitemap.includes("https://www.vikingagm.com/zh/")
) {
  pass("sitemap.xml lists both public pages");
} else {
  fail("sitemap.xml does not list both public pages");
}

const p0ApplicationUrls = [
  "https://www.vikingagm.com/applications/agm-separator-for-ups-battery/",
  "https://www.vikingagm.com/zh/applications/agm-separator-for-ups-battery/",
  "https://www.vikingagm.com/applications/agm-separator-for-motorcycle-battery/",
  "https://www.vikingagm.com/zh/applications/agm-separator-for-motorcycle-battery/",
  "https://www.vikingagm.com/applications/agm-separator-for-energy-storage-battery/",
  "https://www.vikingagm.com/zh/applications/agm-separator-for-energy-storage-battery/"
];

if (p0ApplicationUrls.every((url) => sitemap.includes(url))) {
  pass("sitemap.xml lists P0 application pages");
} else {
  fail("sitemap.xml is missing one or more P0 application pages");
}

if (sitemapUrls.length === 32) {
  pass("sitemap.xml lists the expected English and Chinese public URLs");
} else {
  fail(`sitemap.xml lists ${sitemapUrls.length} URLs instead of 32`);
}

const sitemapMetadataComplete = sitemapUrlBlocks.every(
  (block) =>
    block.includes("<lastmod>") &&
    block.includes("<changefreq>") &&
    block.includes("<priority>")
);

if (sitemapMetadataComplete) {
  pass("sitemap.xml includes lastmod, changefreq and priority for each URL");
} else {
  fail("sitemap.xml is missing URL metadata");
}

const expectedSitemapLastmod = [
  ["https://www.vikingagm.com/", "2026-07-05"],
  [
    "https://www.vikingagm.com/blog/agm-separator-manufacturing-quality-delivery/",
    "2026-07-07"
  ],
  [
    "https://www.vikingagm.com/blog/agm-separator-performance-consistency/",
    "2026-07-10"
  ],
  [
    "https://www.vikingagm.com/blog/agm-separator-export-supply-readiness/",
    "2026-07-11"
  ],
  [
    "https://www.vikingagm.com/request-agm-separator-sample/",
    "2026-07-16"
  ]
];

const staleLastmod = expectedSitemapLastmod.filter(([url, date]) => {
  const block = sitemapUrlBlocks.find((entry) => entry.includes(`<loc>${url}</loc>`));
  return !block?.includes(`<lastmod>${date}</lastmod>`);
});

if (staleLastmod.length === 0) {
  pass("sitemap.xml uses current dates for recently updated pages");
} else {
  fail(`sitemap.xml has stale dates: ${staleLastmod.map(([url]) => url).join(", ")}`);
}

const xDefaultTargets = sitemapUrlBlocks
  .map((block) => block.match(/hreflang="x-default" href="(.*?)"/)?.[1])
  .filter(Boolean);
const xDefaultTargetsEnglish = xDefaultTargets.every(
  (url) => !new URL(url).pathname.startsWith("/zh/")
);

if (xDefaultTargetsEnglish) {
  pass("sitemap.xml x-default alternates point to English default URLs");
} else {
  fail("sitemap.xml has x-default alternates pointing to localized URLs");
}

const missingSitemapTargets = sitemapUrls.filter((url) => {
  const path = new URL(url).pathname;
  const file = path === "/" ? "index.html" : join(path.slice(1), "index.html");

  return !existsSync(join(outDir, file));
});

if (missingSitemapTargets.length === 0) {
  pass("all sitemap URLs have matching static HTML files");
} else {
  fail(`sitemap.xml points to missing pages: ${missingSitemapTargets.join(", ")}`);
}

if (robots.includes("Sitemap: https://www.vikingagm.com/sitemap.xml")) {
  pass("robots.txt advertises the production sitemap");
} else {
  fail("robots.txt does not point to the production sitemap");
}

if (
  indexHtml.includes("baidu-site-verification") ||
  existsSync(join(outDir, "baidu_verify_codeva-KKQCucIOJa.html"))
) {
  pass("Baidu site verification is present");
} else {
  fail("Baidu site verification is missing");
}
