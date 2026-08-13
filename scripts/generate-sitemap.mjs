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
    es: "/es/",
    pt: "/pt/",
    ru: "/ru/",
    priority: "1.0",
    changefreq: "weekly",
    lastmod: "2026-07-30"
  },
  {
    en: "/products/agm-separator/",
    zh: "/zh/products/agm-separator/",
    vi: "/vi/products/agm-separator/",
    ko: "/ko/products/agm-separator/",
    ja: "/ja/products/agm-separator/",
    es: "/es/products/agm-separator/",
    pt: "/pt/products/agm-separator/",
    ru: "/ru/products/agm-separator/",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-07-30"
  },
  {
    en: "/request-agm-separator-sample/",
    zh: "/zh/request-agm-separator-sample/",
    vi: "/vi/request-agm-separator-sample/",
    ko: "/ko/request-agm-separator-sample/",
    ja: "/ja/request-agm-separator-sample/",
    es: "/es/request-agm-separator-sample/",
    pt: "/pt/request-agm-separator-sample/",
    ru: "/ru/request-agm-separator-sample/",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-07-30"
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
    vi: "/vi/products/agm-separator-rolls/",
    ko: "/ko/products/agm-separator-rolls/",
    ja: "/ja/products/agm-separator-rolls/",
    es: "/es/products/agm-separator-rolls/",
    pt: "/pt/products/agm-separator-rolls/",
    ru: "/ru/products/agm-separator-rolls/",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-07-31"
  },
  {
    en: "/products/agm-separator-sheets/",
    zh: "/zh/products/agm-separator-sheets/",
    vi: "/vi/products/agm-separator-sheets/",
    ko: "/ko/products/agm-separator-sheets/",
    ja: "/ja/products/agm-separator-sheets/",
    es: "/es/products/agm-separator-sheets/",
    pt: "/pt/products/agm-separator-sheets/",
    ru: "/ru/products/agm-separator-sheets/",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-07-31"
  },
  {
    en: "/products/glass-fiber-thermal-insulation-paper/",
    zh: "/zh/products/glass-fiber-thermal-insulation-paper/",
    vi: "/vi/products/glass-fiber-thermal-insulation-paper/",
    ko: "/ko/products/glass-fiber-thermal-insulation-paper/",
    ja: "/ja/products/glass-fiber-thermal-insulation-paper/",
    es: "/es/products/glass-fiber-thermal-insulation-paper/",
    pt: "/pt/products/glass-fiber-thermal-insulation-paper/",
    ru: "/ru/products/glass-fiber-thermal-insulation-paper/",
    priority: "0.9",
    changefreq: "monthly",
    lastmod: "2026-08-09"
  },
  {
    en: "/quality-control/agm-separator-testing/",
    zh: "/zh/quality-control/agm-separator-testing/",
    vi: "/vi/quality-control/agm-separator-testing/",
    ko: "/ko/quality-control/agm-separator-testing/",
    ja: "/ja/quality-control/agm-separator-testing/",
    es: "/es/quality-control/agm-separator-testing/",
    pt: "/pt/quality-control/agm-separator-testing/",
    ru: "/ru/quality-control/agm-separator-testing/",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: "2026-07-31"
  },
  {
    en: "/applications/agm-separator-for-vrla-battery/",
    zh: "/zh/applications/agm-separator-for-vrla-battery/",
    vi: "/vi/applications/agm-separator-for-vrla-battery/",
    ko: "/ko/applications/agm-separator-for-vrla-battery/",
    ja: "/ja/applications/agm-separator-for-vrla-battery/",
    es: "/es/applications/agm-separator-for-vrla-battery/",
    pt: "/pt/applications/agm-separator-for-vrla-battery/",
    ru: "/ru/applications/agm-separator-for-vrla-battery/",
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-07-31"
  },
  {
    en: "/applications/agm-separator-for-ups-battery/",
    zh: "/zh/applications/agm-separator-for-ups-battery/",
    vi: "/vi/applications/agm-separator-for-ups-battery/",
    ko: "/ko/applications/agm-separator-for-ups-battery/",
    ja: "/ja/applications/agm-separator-for-ups-battery/",
    es: "/es/applications/agm-separator-for-ups-battery/",
    pt: "/pt/applications/agm-separator-for-ups-battery/",
    ru: "/ru/applications/agm-separator-for-ups-battery/",
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-07-31"
  },
  {
    en: "/applications/agm-separator-for-motorcycle-battery/",
    zh: "/zh/applications/agm-separator-for-motorcycle-battery/",
    vi: "/vi/applications/agm-separator-for-motorcycle-battery/",
    ko: "/ko/applications/agm-separator-for-motorcycle-battery/",
    ja: "/ja/applications/agm-separator-for-motorcycle-battery/",
    es: "/es/applications/agm-separator-for-motorcycle-battery/",
    pt: "/pt/applications/agm-separator-for-motorcycle-battery/",
    ru: "/ru/applications/agm-separator-for-motorcycle-battery/",
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-07-31"
  },
  {
    en: "/applications/agm-separator-for-energy-storage-battery/",
    zh: "/zh/applications/agm-separator-for-energy-storage-battery/",
    vi: "/vi/applications/agm-separator-for-energy-storage-battery/",
    ko: "/ko/applications/agm-separator-for-energy-storage-battery/",
    ja: "/ja/applications/agm-separator-for-energy-storage-battery/",
    es: "/es/applications/agm-separator-for-energy-storage-battery/",
    pt: "/pt/applications/agm-separator-for-energy-storage-battery/",
    ru: "/ru/applications/agm-separator-for-energy-storage-battery/",
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-07-31"
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
  },
  {
    en: "/blog/agm-separator-for-data-center-backup-power/",
    zh: "/zh/blog/agm-separator-for-data-center-backup-power/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-08-07",
    secondaryLastmod: "2026-08-07"
  },
  {
    en: "/blog/how-chinas-earliest-lead-acid-batteries-were-made/",
    zh: "/zh/blog/how-chinas-earliest-lead-acid-batteries-were-made/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-08-11",
    secondaryLastmod: "2026-08-11"
  },
  {
    en: "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/",
    zh: "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-08-12",
    secondaryLastmod: "2026-08-12"
  },
  {
    en: "/blog/agm-separator-batch-consistency-and-process-control/",
    zh: "/zh/blog/agm-separator-batch-consistency-and-process-control/",
    priority: "0.75",
    changefreq: "monthly",
    lastmod: "2026-08-12",
    secondaryLastmod: "2026-08-12"
  }
];

const secondaryLocales = ["vi", "ko", "ja", "es", "pt", "ru"];
for (const page of pages.filter(
  ({ en }) => en === "/resources/" || en.startsWith("/blog/")
)) {
  for (const locale of secondaryLocales) {
    page[locale] = `/${locale}${page.en}`;
  }
  page.secondaryLastmod ??= "2026-08-05";
}

function absolute(path) {
  return `${SITE_URL}${path}`;
}

function urlEntry(path, alternate) {
  const isSecondaryLocale = secondaryLocales.some((locale) =>
    path.startsWith(`/${locale}/`)
  );
  const viAlternate = alternate.vi
    ? `\n    <xhtml:link rel="alternate" hreflang="vi-VN" href="${absolute(alternate.vi)}" />`
    : "";
  const koAlternate = alternate.ko
    ? `\n    <xhtml:link rel="alternate" hreflang="ko-KR" href="${absolute(alternate.ko)}" />`
    : "";
  const jaAlternate = alternate.ja
    ? `\n    <xhtml:link rel="alternate" hreflang="ja-JP" href="${absolute(alternate.ja)}" />`
    : "";
  const esAlternate = alternate.es
    ? `\n    <xhtml:link rel="alternate" hreflang="es" href="${absolute(alternate.es)}" />`
    : "";
  const ptAlternate = alternate.pt
    ? `\n    <xhtml:link rel="alternate" hreflang="pt-BR" href="${absolute(alternate.pt)}" />`
    : "";
  const ruAlternate = alternate.ru
    ? `\n    <xhtml:link rel="alternate" hreflang="ru-RU" href="${absolute(alternate.ru)}" />`
    : "";
  return `  <url>
    <loc>${absolute(path)}</loc>
    <lastmod>${isSecondaryLocale && alternate.secondaryLastmod ? alternate.secondaryLastmod : alternate.lastmod}</lastmod>
    <changefreq>${alternate.changefreq}</changefreq>
    <priority>${alternate.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${absolute(alternate.en)}" />
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${absolute(alternate.zh)}" />${viAlternate}${koAlternate}${jaAlternate}${esAlternate}${ptAlternate}${ruAlternate}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(alternate.en)}" />
  </url>`;
}

const entries = pages.flatMap((page) =>
  [page.en, page.zh, page.vi, page.ko, page.ja, page.es, page.pt, page.ru]
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
