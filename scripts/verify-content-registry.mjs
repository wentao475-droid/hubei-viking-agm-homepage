import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  articleDefinitions,
  articleKinds,
  secondaryResourceLocales
} from "../content/secondary-resources.mjs";

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
  ],
  [
    "dataCenterBackupPowerAgmSeparator",
    "agm-separator-for-data-center-backup-power"
  ],
  [
    "earlyChinaLeadAcidBatteryManufacturing",
    "how-chinas-earliest-lead-acid-batteries-were-made"
  ],
  [
    "agmSeparatorPressureRetention",
    "agm-separator-pressure-retention-after-acid-filling-and-cycling"
  ]
];
const allLocales = ["en", "zh", ...secondaryResourceLocales];

let failed = false;

for (const [key, slug] of articles) {
  const article = content.articles?.[key];
  const seo = content.seo?.[key];
  const enRoute = join(root, "app/blog", slug, "page.tsx");
  const zhRoute = join(root, "app/zh/blog", slug, "page.tsx");

  check(
    allLocales.every((locale) => article?.[locale]),
    `${key} has article content in all 8 languages`
  );
  check(
    allLocales.every((locale) => seo?.[locale]),
    `${key} has SEO content in all 8 languages`
  );
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
  articleKinds.length === articles.length &&
    articleKinds.every((kind) => articleDefinitions[kind]),
  "secondary article registry matches the 11 canonical articles"
);
check(
  existsSync(join(root, "app/[locale]/blog/[slug]/page.tsx")),
  "secondary articles use the shared localized route"
);

check(
  existsSync(join(root, "app/resources/page.tsx")) &&
    existsSync(join(root, "app/zh/resources/page.tsx")) &&
    existsSync(join(root, "app/[locale]/resources/page.tsx")),
  "resource hub has English, Chinese and shared secondary routes"
);
check(
  sitemapSource.includes('en: "/resources/"') &&
    sitemapSource.includes('zh: "/zh/resources/"'),
  "resource hub is registered in the sitemap"
);

const secondaryLocalizedPages = ["vi", "ko", "ja", "es", "pt", "ru"].flatMap((locale) => [
  {
    key: `home.${locale}`,
    route: `app/${locale}/page.tsx`,
    path: `/${locale}/`,
    content: content.home?.[locale],
    seo: content.seo?.home?.[locale]
  },
  {
    key: `agmSeparator.${locale}`,
    route: `app/${locale}/products/agm-separator/page.tsx`,
    path: `/${locale}/products/agm-separator/`,
    content: content.products?.agmSeparator?.[locale],
    seo: content.seo?.agmSeparator?.[locale]
  },
  {
    key: `agmSeparatorRolls.${locale}`,
    route: `app/${locale}/products/agm-separator-rolls/page.tsx`,
    path: `/${locale}/products/agm-separator-rolls/`,
    content: content.products?.agmSeparatorRolls?.[locale],
    seo: content.seo?.agmSeparatorRolls?.[locale]
  },
  {
    key: `agmSeparatorSheets.${locale}`,
    route: `app/${locale}/products/agm-separator-sheets/page.tsx`,
    path: `/${locale}/products/agm-separator-sheets/`,
    content: content.products?.agmSeparatorSheets?.[locale],
    seo: content.seo?.agmSeparatorSheets?.[locale]
  },
  {
    key: `glassFiberThermalInsulationPaper.${locale}`,
    route: `app/${locale}/products/glass-fiber-thermal-insulation-paper/page.tsx`,
    path: `/${locale}/products/glass-fiber-thermal-insulation-paper/`,
    content: content.products?.glassFiberThermalInsulationPaper?.[locale],
    seo: content.seo?.glassFiberThermalInsulationPaper?.[locale]
  },
  {
    key: `agmSeparatorTesting.${locale}`,
    route: `app/${locale}/quality-control/agm-separator-testing/page.tsx`,
    path: `/${locale}/quality-control/agm-separator-testing/`,
    content: content.products?.agmSeparatorTesting?.[locale],
    seo: content.seo?.agmSeparatorTesting?.[locale]
  },
  {
    key: `agmSeparatorVrlaApplication.${locale}`,
    route: `app/${locale}/applications/agm-separator-for-vrla-battery/page.tsx`,
    path: `/${locale}/applications/agm-separator-for-vrla-battery/`,
    content: content.products?.agmSeparatorVrlaApplication?.[locale],
    seo: content.seo?.agmSeparatorVrlaApplication?.[locale]
  },
  {
    key: `agmSeparatorUpsApplication.${locale}`,
    route: `app/${locale}/applications/agm-separator-for-ups-battery/page.tsx`,
    path: `/${locale}/applications/agm-separator-for-ups-battery/`,
    content: content.products?.agmSeparatorUpsApplication?.[locale],
    seo: content.seo?.agmSeparatorUpsApplication?.[locale]
  },
  {
    key: `agmSeparatorMotorcycleApplication.${locale}`,
    route: `app/${locale}/applications/agm-separator-for-motorcycle-battery/page.tsx`,
    path: `/${locale}/applications/agm-separator-for-motorcycle-battery/`,
    content: content.products?.agmSeparatorMotorcycleApplication?.[locale],
    seo: content.seo?.agmSeparatorMotorcycleApplication?.[locale]
  },
  {
    key: `agmSeparatorEnergyStorageApplication.${locale}`,
    route: `app/${locale}/applications/agm-separator-for-energy-storage-battery/page.tsx`,
    path: `/${locale}/applications/agm-separator-for-energy-storage-battery/`,
    content: content.products?.agmSeparatorEnergyStorageApplication?.[locale],
    seo: content.seo?.agmSeparatorEnergyStorageApplication?.[locale]
  },
  {
    key: `sampleRequest.${locale}`,
    route: `app/${locale}/request-agm-separator-sample/page.tsx`,
    path: `/${locale}/request-agm-separator-sample/`,
    content: content.sampleRequest?.[locale],
    seo: content.seo?.sampleRequest?.[locale]
  }
]);

for (const page of secondaryLocalizedPages) {
  check(Boolean(page.content), `${page.key} has localized page content`);
  check(Boolean(page.seo), `${page.key} has localized SEO content`);
  check(existsSync(join(root, page.route)), `${page.key} has a route`);
  check(
    sitemapSource.includes(`"${page.path}"`),
    `${page.key} is registered in the sitemap`
  );
}

for (const locale of ["en", "zh"]) {
  const prefix = locale === "en" ? "" : "/zh";
  const routePrefix = locale === "en" ? "app" : "app/zh";
  const key = `glassFiberThermalInsulationPaper.${locale}`;
  const path = `${prefix}/products/glass-fiber-thermal-insulation-paper/`;

  check(
    Boolean(content.products?.glassFiberThermalInsulationPaper?.[locale]),
    `${key} has localized page content`
  );
  check(
    Boolean(content.seo?.glassFiberThermalInsulationPaper?.[locale]),
    `${key} has localized SEO content`
  );
  check(
    existsSync(
      join(
        root,
        `${routePrefix}/products/glass-fiber-thermal-insulation-paper/page.tsx`
      )
    ),
    `${key} has a route`
  );
  check(
    sitemapSource.includes(`"${path}"`),
    `${key} is registered in the sitemap`
  );
}

if (failed) {
  process.exit(1);
}

console.log(
  `PASS content registry is complete for ${articles.length} articles in 8 languages and ${secondaryLocalizedPages.length} aligned secondary-language pages`
);

function check(condition, message) {
  if (condition) {
    return;
  }

  failed = true;
  console.error(`FAIL ${message}`);
}
