import { writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = "https://www.vikingagm.com";
const pages = [
  {
    en: "/",
    zh: "/zh/",
    vi: "/vi/",
    ko: "/ko/",
    ja: "/ja/",
    priority: "1.0",
    changefreq: "weekly",
    lastmod: "2026-07-29"
  },
  {
    en: "/products/agm-separator/",
    zh: "/zh/products/agm-separator/",
    vi: "/vi/products/agm-separator/",
    ko: "/ko/products/agm-separator/",
    ja: "/ja/products/agm-separator/",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-07-29"
  },
  {
    en: "/request-agm-separator-sample/",
    zh: "/zh/request-agm-separator-sample/",
    vi: "/vi/request-agm-separator-sample/",
    ko: "/ko/request-agm-separator-sample/",
    ja: "/ja/request-agm-separator-sample/",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-07-29"
  },
  {
    en: "/resources/",
    zh: "/zh/resources/",
    priority: "0.8",
    changefreq: "weekly",
    lastmod: "2026-07-26"
  },
  {
    en: "/products/agm-separator-rolls/",
    zh: "/zh/products/agm-separator-rolls/",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-07-05"
  },
  {
    en: "/products/agm-separator-sheets/",
    zh: "/zh/products/agm-separator-sheets/",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-07-05"
  },
  {
    en: "/quality-control/agm-separator-testing/",
    zh: "/zh/quality-control/agm-separator-testing/",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: "2026-06-11"
  },
  {
    en: "/applications/agm-separator-for-vrla-battery/",
    zh: "/zh/applications/agm-separator-for-vrla-battery/",
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-06-11"
  },
  {
    en: "/applications/agm-separator-for-ups-battery/",
    zh: "/zh/applications/agm-separator-for-ups-battery/",
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-06-24"
  },
  {
    en: "/applications/agm-separator-for-motorcycle-battery/",
    zh: "/zh/applications/agm-separator-for-motorcycle-battery/",
    vi: "/vi/applications/agm-separator-for-motorcycle-battery/",
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-07-28"
  },
  {
    en: "/applications/agm-separator-for-energy-storage-battery/",
    zh: "/zh/applications/agm-separator-for-energy-storage-battery/",
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-06-24"
  },
  {
    en: "/blog/what-is-agm-separator/",
    zh: "/zh/blog/what-is-agm-separator/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-06-11"
  },
  {
    en: "/blog/key-technical-parameters-of-agm-separator/",
    zh: "/zh/blog/key-technical-parameters-of-agm-separator/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-06-13"
  },
  {
    en: "/blog/how-to-choose-agm-separator/",
    zh: "/zh/blog/how-to-choose-agm-separator/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-06-13"
  },
  {
    en: "/blog/agm-separator-manufacturing-quality-delivery/",
    zh: "/zh/blog/agm-separator-manufacturing-quality-delivery/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-07-07"
  },
  {
    en: "/blog/agm-separator-performance-consistency/",
    zh: "/zh/blog/agm-separator-performance-consistency/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-07-10"
  },
  {
    en: "/blog/agm-separator-export-supply-readiness/",
    zh: "/zh/blog/agm-separator-export-supply-readiness/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-07-11"
  },
  {
    en: "/blog/why-ups-projects-still-use-vrla-batteries/",
    zh: "/zh/blog/why-ups-projects-still-use-vrla-batteries/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-07-23"
  },
  {
    en: "/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    zh: "/zh/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-07-26"
  }
];

function absolute(path) {
  return `${SITE_URL}${path}`;
}

function urlEntry(path, alternate) {
  const viAlternate = alternate.vi
    ? `\n    <xhtml:link rel="alternate" hreflang="vi-VN" href="${absolute(alternate.vi)}" />`
    : "";
  const koAlternate = alternate.ko
    ? `\n    <xhtml:link rel="alternate" hreflang="ko-KR" href="${absolute(alternate.ko)}" />`
    : "";
  const jaAlternate = alternate.ja
    ? `\n    <xhtml:link rel="alternate" hreflang="ja-JP" href="${absolute(alternate.ja)}" />`
    : "";
  return `  <url>
    <loc>${absolute(path)}</loc>
    <lastmod>${alternate.lastmod}</lastmod>
    <changefreq>${alternate.changefreq}</changefreq>
    <priority>${alternate.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${absolute(alternate.en)}" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${absolute(alternate.zh)}" />${viAlternate}${koAlternate}${jaAlternate}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(alternate.en)}" />
  </url>`;
}

const entries = pages.flatMap((page) =>
  [page.en, page.zh, page.vi, page.ko, page.ja]
    .filter(Boolean)
    .map((path) => urlEntry(path, page))
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

writeFileSync(join(process.cwd(), "public", "sitemap.xml"), sitemap);
console.log(`Wrote public/sitemap.xml with ${entries.length} URLs`);
