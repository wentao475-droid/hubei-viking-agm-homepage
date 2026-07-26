import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const content = JSON.parse(
  readFileSync(join(root, "content/site-content.json"), "utf8")
);
const seoSource = readFileSync(join(root, "app/seo.tsx"), "utf8");
const sitemapSource = readFileSync(
  join(root, "scripts/generate-sitemap.mjs"),
  "utf8"
);
const resourceCatalogSource = readFileSync(
  join(root, "app/resourceCatalog.ts"),
  "utf8"
);

const articles = [
  ["whatIsAgmSeparator", "what-is-agm-separator"],
  ["keyTechnicalParameters", "key-technical-parameters-of-agm-separator"],
  ["howToChooseAgmSeparator", "how-to-choose-agm-separator"],
  [
    "agmSeparatorManufacturingQualityDelivery",
    "agm-separator-manufacturing-quality-delivery"
  ],
  ["agmSeparatorPerformanceConsistency", "agm-separator-performance-consistency"],
  [
    "agmSeparatorExportSupplyReadiness",
    "agm-separator-export-supply-readiness"
  ],
  [
    "upsVrlaTechnologySelection",
    "why-ups-projects-still-use-vrla-batteries"
  ],
  [
    "agmGlassFiberVsPvcSeparator",
    "agm-glass-fiber-vs-pvc-battery-separator"
  ]
];

let failed = false;

for (const [key, slug] of articles) {
  const article = content.articles?.[key];
  const seo = content.seo?.[key];
  const enRoute = join(root, "app/blog", slug, "page.tsx");
  const zhRoute = join(root, "app/zh/blog", slug, "page.tsx");

  check(article?.en && article?.zh, `${key} has English and Chinese article content`);
  check(seo?.en && seo?.zh, `${key} has English and Chinese SEO content`);
  check(existsSync(enRoute) && existsSync(zhRoute), `${key} has both route files`);
  check(
    seoSource.includes(`"${key}"`) || seoSource.includes(`${key}Seo`),
    `${key} is registered in app/seo.tsx`
  );
  check(
    sitemapSource.includes(`/blog/${slug}/`) &&
      sitemapSource.includes(`/zh/blog/${slug}/`),
    `${key} is registered in the sitemap`
  );
  check(
    resourceCatalogSource.includes(`/blog/${slug}/`) &&
      resourceCatalogSource.includes(`/zh/blog/${slug}/`),
    `${key} is registered in the resource catalog`
  );
}

check(
  existsSync(join(root, "app/resources/page.tsx")) &&
    existsSync(join(root, "app/zh/resources/page.tsx")),
  "resource hub has both route files"
);
check(
  sitemapSource.includes('en: "/resources/"') &&
    sitemapSource.includes('zh: "/zh/resources/"'),
  "resource hub is registered in the sitemap"
);

if (failed) {
  process.exit(1);
}

console.log(`PASS content registry is complete for ${articles.length} bilingual articles`);

function check(condition, message) {
  if (condition) {
    return;
  }

  failed = true;
  console.error(`FAIL ${message}`);
}
