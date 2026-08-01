import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const synchronizedLocaleCodes = ["vi", "ko", "ja", "es", "pt", "ru"];
const synchronizedDetailFiles = synchronizedLocaleCodes.flatMap((locale) => [
  `${locale}/products/agm-separator-rolls/index.html`,
  `${locale}/products/agm-separator-sheets/index.html`,
  `${locale}/quality-control/agm-separator-testing/index.html`
]);
const synchronizedApplicationSlugs = [
  "agm-separator-for-vrla-battery",
  "agm-separator-for-ups-battery",
  "agm-separator-for-energy-storage-battery"
];
const synchronizedApplicationFiles = synchronizedLocaleCodes.flatMap((locale) =>
  synchronizedApplicationSlugs.map(
    (slug) => `${locale}/applications/${slug}/index.html`
  )
);
const requiredFiles = [
  "index.html",
  "zh/index.html",
  "vi/index.html",
  "ko/index.html",
  "ja/index.html",
  "resources/index.html",
  "zh/resources/index.html",
  "request-agm-separator-sample/index.html",
  "zh/request-agm-separator-sample/index.html",
  "vi/request-agm-separator-sample/index.html",
  "vi/products/agm-separator/index.html",
  "ko/request-agm-separator-sample/index.html",
  "ko/products/agm-separator/index.html",
  "ko/applications/agm-separator-for-motorcycle-battery/index.html",
  "ja/request-agm-separator-sample/index.html",
  "ja/products/agm-separator/index.html",
  "ja/applications/agm-separator-for-motorcycle-battery/index.html",
  "es/index.html",
  "es/request-agm-separator-sample/index.html",
  "es/products/agm-separator/index.html",
  "es/applications/agm-separator-for-motorcycle-battery/index.html",
  "pt/index.html",
  "pt/request-agm-separator-sample/index.html",
  "pt/products/agm-separator/index.html",
  "pt/applications/agm-separator-for-motorcycle-battery/index.html",
  "ru/index.html",
  "ru/request-agm-separator-sample/index.html",
  "ru/products/agm-separator/index.html",
  "ru/applications/agm-separator-for-motorcycle-battery/index.html",
  "applications/agm-separator-for-ups-battery/index.html",
  "zh/applications/agm-separator-for-ups-battery/index.html",
  "applications/agm-separator-for-motorcycle-battery/index.html",
  "zh/applications/agm-separator-for-motorcycle-battery/index.html",
  "vi/applications/agm-separator-for-motorcycle-battery/index.html",
  "applications/agm-separator-for-energy-storage-battery/index.html",
  "zh/applications/agm-separator-for-energy-storage-battery/index.html",
  "blog/why-ups-projects-still-use-vrla-batteries/index.html",
  "zh/blog/why-ups-projects-still-use-vrla-batteries/index.html",
  "blog/agm-glass-fiber-vs-pvc-battery-separator/index.html",
  "zh/blog/agm-glass-fiber-vs-pvc-battery-separator/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "favicon.ico",
  "videos/viking-agm-promo-480p.mp4",
  ...synchronizedDetailFiles,
  ...synchronizedApplicationFiles
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
const viHtml = readOutFile("vi/index.html");
const koHtml = readOutFile("ko/index.html");
const jaHtml = readOutFile("ja/index.html");
const viProductHtml = readOutFile("vi/products/agm-separator/index.html");
const viMotorcycleHtml = readOutFile(
  "vi/applications/agm-separator-for-motorcycle-battery/index.html"
);
const viSampleHtml = readOutFile(
  "vi/request-agm-separator-sample/index.html"
);
const koProductHtml = readOutFile("ko/products/agm-separator/index.html");
const koMotorcycleHtml = readOutFile(
  "ko/applications/agm-separator-for-motorcycle-battery/index.html"
);
const koSampleHtml = readOutFile(
  "ko/request-agm-separator-sample/index.html"
);
const jaProductHtml = readOutFile("ja/products/agm-separator/index.html");
const jaMotorcycleHtml = readOutFile(
  "ja/applications/agm-separator-for-motorcycle-battery/index.html"
);
const jaSampleHtml = readOutFile(
  "ja/request-agm-separator-sample/index.html"
);
const esHtml = readOutFile("es/index.html");
const esProductHtml = readOutFile("es/products/agm-separator/index.html");
const esMotorcycleHtml = readOutFile(
  "es/applications/agm-separator-for-motorcycle-battery/index.html"
);
const esSampleHtml = readOutFile(
  "es/request-agm-separator-sample/index.html"
);
const ptHtml = readOutFile("pt/index.html");
const ptProductHtml = readOutFile("pt/products/agm-separator/index.html");
const ptMotorcycleHtml = readOutFile(
  "pt/applications/agm-separator-for-motorcycle-battery/index.html"
);
const ptSampleHtml = readOutFile(
  "pt/request-agm-separator-sample/index.html"
);
const ruHtml = readOutFile("ru/index.html");
const ruProductHtml = readOutFile("ru/products/agm-separator/index.html");
const ruMotorcycleHtml = readOutFile(
  "ru/applications/agm-separator-for-motorcycle-battery/index.html"
);
const ruSampleHtml = readOutFile(
  "ru/request-agm-separator-sample/index.html"
);
const synchronizedDetailHtml = Object.fromEntries(
  synchronizedLocaleCodes.map((locale) => [
    locale,
    {
      rolls: readOutFile(
        `${locale}/products/agm-separator-rolls/index.html`
      ),
      sheets: readOutFile(
        `${locale}/products/agm-separator-sheets/index.html`
      ),
      testing: readOutFile(
        `${locale}/quality-control/agm-separator-testing/index.html`
      )
    }
  ])
);
const synchronizedApplicationHtml = Object.fromEntries(
  synchronizedLocaleCodes.map((locale) => [
    locale,
    Object.fromEntries(
      synchronizedApplicationSlugs.map((slug) => [
        slug,
        readOutFile(`${locale}/applications/${slug}/index.html`)
      ])
    )
  ])
);
const resourcesHtml = readOutFile("resources/index.html");
const zhResourcesHtml = readOutFile("zh/resources/index.html");
const upsVrlaArticleHtml = readOutFile(
  "blog/why-ups-projects-still-use-vrla-batteries/index.html"
);
const zhUpsVrlaArticleHtml = readOutFile(
  "zh/blog/why-ups-projects-still-use-vrla-batteries/index.html"
);
const agmVsPvcArticleHtml = readOutFile(
  "blog/agm-glass-fiber-vs-pvc-battery-separator/index.html"
);
const zhAgmVsPvcArticleHtml = readOutFile(
  "zh/blog/agm-glass-fiber-vs-pvc-battery-separator/index.html"
);
const sitemap = readOutFile("sitemap.xml");
const robots = readOutFile("robots.txt");
const sitemapUrlBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (match) => match[1]
);
const sitemapUrls = sitemapUrlBlocks
  .map((block) => block.match(/<loc>(.*?)<\/loc>/)?.[1])
  .filter(Boolean);
const socialProfileUrls = [
  "https://www.tiktok.com/@vikingagm",
  "https://www.linkedin.com/company/viking-agm/"
];

const pagesMissingSocialLinks = sitemapUrls.filter((url) => {
  const path = new URL(url).pathname;
  const file = path === "/" ? "index.html" : join(path.slice(1), "index.html");
  const html = readOutFile(file);

  return !socialProfileUrls.every((profileUrl) =>
    html.includes(`href="${profileUrl}"`)
  );
});

if (pagesMissingSocialLinks.length === 0) {
  pass("all public pages include TikTok and LinkedIn footer links");
} else {
  fail(
    `public pages are missing social links: ${pagesMissingSocialLinks.join(", ")}`
  );
}

if (
  socialProfileUrls.every((profileUrl) => indexHtml.includes(profileUrl)) &&
  indexHtml.includes('target="_blank"') &&
  indexHtml.includes('rel="noopener noreferrer"')
) {
  pass("social links use safe external-link attributes");
} else {
  fail("social links are missing URLs or safe external-link attributes");
}

if (
  indexHtml.includes(
    `"sameAs":["${socialProfileUrls[0]}","${socialProfileUrls[1]}"]`
  )
) {
  pass("Organization structured data identifies official social profiles");
} else {
  fail("Organization structured data is missing official social profiles");
}

const inquiryFormsUseSelects = [
  indexHtml,
  zhHtml,
  viHtml,
  viSampleHtml,
  koHtml,
  koProductHtml,
  koSampleHtml,
  jaHtml,
  jaProductHtml,
  jaSampleHtml,
  esHtml,
  esProductHtml,
  esSampleHtml,
  ptHtml,
  ptProductHtml,
  ptSampleHtml,
  ruHtml,
  ruProductHtml,
  ruSampleHtml,
  ...Object.values(synchronizedDetailHtml).flatMap(Object.values),
  ...Object.values(synchronizedApplicationHtml).flatMap(Object.values)
].every((html) =>
    /<select[^>]+name="application"/.test(html) &&
    /<select[^>]+name="interestedProduct"/.test(html) &&
    html.includes('value="UPS / standby power"') &&
    html.includes('value="AGM separator rolls"')
  );

if (inquiryFormsUseSelects) {
  pass("inquiry forms use battery application and product format selects");
} else {
  fail("inquiry forms are missing battery application or product format selects");
}

const resourceArticlePaths = [
  "/blog/what-is-agm-separator/",
  "/blog/key-technical-parameters-of-agm-separator/",
  "/blog/how-to-choose-agm-separator/",
  "/blog/agm-separator-manufacturing-quality-delivery/",
  "/blog/agm-separator-performance-consistency/",
  "/blog/agm-separator-export-supply-readiness/",
  "/blog/why-ups-projects-still-use-vrla-batteries/",
  "/blog/agm-glass-fiber-vs-pvc-battery-separator/"
];

if (
  resourceArticlePaths.every(
    (path) =>
      resourcesHtml.includes(`href="${path}"`) &&
      zhResourcesHtml.includes(`href="/zh${path}"`)
  )
) {
  pass("resource hubs list all English and Chinese articles");
} else {
  fail("resource hubs are missing one or more registered articles");
}

if (
  resourcesHtml.includes('"@type":"CollectionPage"') &&
  resourcesHtml.includes('"@type":"ItemList"') &&
  zhResourcesHtml.includes('"@type":"CollectionPage"') &&
  zhResourcesHtml.includes('"@type":"ItemList"')
) {
  pass("resource hubs include collection structured data");
} else {
  fail("resource hubs are missing collection structured data");
}

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

if (viHtml.includes('<html lang="vi"')) {
  pass("Vietnamese homepage declares lang=vi");
} else {
  fail("Vietnamese homepage does not declare lang=vi");
}

if (koHtml.includes('<html lang="ko"')) {
  pass("Korean homepage declares lang=ko");
} else {
  fail("Korean homepage does not declare lang=ko");
}

if (jaHtml.includes('<html lang="ja"')) {
  pass("Japanese homepage declares lang=ja");
} else {
  fail("Japanese homepage does not declare lang=ja");
}

if (esHtml.includes('<html lang="es"')) {
  pass("Spanish homepage declares lang=es");
} else {
  fail("Spanish homepage does not declare lang=es");
}

if (ptHtml.includes('<html lang="pt-BR"')) {
  pass("Portuguese homepage declares lang=pt-BR");
} else {
  fail("Portuguese homepage does not declare lang=pt-BR");
}

if (ruHtml.includes('<html lang="ru"')) {
  pass("Russian homepage declares lang=ru");
} else {
  fail("Russian homepage does not declare lang=ru");
}

const vietnamesePages = [
  [viHtml, "/vi/"],
  [viProductHtml, "/vi/products/agm-separator/"],
  [synchronizedDetailHtml.vi.rolls, "/vi/products/agm-separator-rolls/"],
  [synchronizedDetailHtml.vi.sheets, "/vi/products/agm-separator-sheets/"],
  [
    synchronizedDetailHtml.vi.testing,
    "/vi/quality-control/agm-separator-testing/"
  ],
  [
    viMotorcycleHtml,
    "/vi/applications/agm-separator-for-motorcycle-battery/"
  ],
  ...synchronizedApplicationSlugs.map((slug) => [
    synchronizedApplicationHtml.vi[slug],
    `/vi/applications/${slug}/`
  ]),
  [viSampleHtml, "/vi/request-agm-separator-sample/"]
];

const vietnameseSeoComplete = vietnamesePages.every(([html, path]) =>
  [
    `https://www.vikingagm.com${path}`,
    'hrefLang="vi-VN"',
    '"inLanguage":"vi-VN"',
    "vi_VN"
  ].every((value) => html.includes(value))
);

if (vietnameseSeoComplete) {
  pass("Vietnamese pages include canonical, hreflang and localized metadata");
} else {
  fail("one or more Vietnamese pages have incomplete localized metadata");
}

if (
  [
    viHtml,
    viProductHtml,
    viMotorcycleHtml,
    viSampleHtml,
    ...Object.values(synchronizedDetailHtml.vi),
    ...Object.values(synchronizedApplicationHtml.vi)
  ].every(
    (html) =>
      html.includes('value="Motorcycle battery"') &&
      html.includes('value="AGM separator rolls"') &&
      /name="language"\s+value="vi"/.test(html)
  )
) {
  pass("Vietnamese inquiry forms submit canonical values and language=vi");
} else {
  fail("Vietnamese inquiry form values are not canonical or language is missing");
}

const koreanJapanesePages = [
  [koHtml, "/ko/", "ko-KR", "ko_KR"],
  [
    koProductHtml,
    "/ko/products/agm-separator/",
    "ko-KR",
    "ko_KR"
  ],
  [
    synchronizedDetailHtml.ko.rolls,
    "/ko/products/agm-separator-rolls/",
    "ko-KR",
    "ko_KR"
  ],
  [
    synchronizedDetailHtml.ko.sheets,
    "/ko/products/agm-separator-sheets/",
    "ko-KR",
    "ko_KR"
  ],
  [
    synchronizedDetailHtml.ko.testing,
    "/ko/quality-control/agm-separator-testing/",
    "ko-KR",
    "ko_KR"
  ],
  [
    koMotorcycleHtml,
    "/ko/applications/agm-separator-for-motorcycle-battery/",
    "ko-KR",
    "ko_KR"
  ],
  ...synchronizedApplicationSlugs.map((slug) => [
    synchronizedApplicationHtml.ko[slug],
    `/ko/applications/${slug}/`,
    "ko-KR",
    "ko_KR"
  ]),
  [
    koSampleHtml,
    "/ko/request-agm-separator-sample/",
    "ko-KR",
    "ko_KR"
  ],
  [jaHtml, "/ja/", "ja-JP", "ja_JP"],
  [
    jaProductHtml,
    "/ja/products/agm-separator/",
    "ja-JP",
    "ja_JP"
  ],
  [
    synchronizedDetailHtml.ja.rolls,
    "/ja/products/agm-separator-rolls/",
    "ja-JP",
    "ja_JP"
  ],
  [
    synchronizedDetailHtml.ja.sheets,
    "/ja/products/agm-separator-sheets/",
    "ja-JP",
    "ja_JP"
  ],
  [
    synchronizedDetailHtml.ja.testing,
    "/ja/quality-control/agm-separator-testing/",
    "ja-JP",
    "ja_JP"
  ],
  [
    jaMotorcycleHtml,
    "/ja/applications/agm-separator-for-motorcycle-battery/",
    "ja-JP",
    "ja_JP"
  ],
  ...synchronizedApplicationSlugs.map((slug) => [
    synchronizedApplicationHtml.ja[slug],
    `/ja/applications/${slug}/`,
    "ja-JP",
    "ja_JP"
  ]),
  [
    jaSampleHtml,
    "/ja/request-agm-separator-sample/",
    "ja-JP",
    "ja_JP"
  ]
];

const koreanJapaneseSeoComplete = koreanJapanesePages.every(
  ([html, path, language, locale]) =>
    [
      `https://www.vikingagm.com${path}`,
      `hrefLang="${language}"`,
      `"inLanguage":"${language}"`,
      locale
    ].every((value) => html.includes(value))
);

if (koreanJapaneseSeoComplete) {
  pass("Korean and Japanese pages include canonical, hreflang and localized metadata");
} else {
  fail("one or more Korean or Japanese pages have incomplete localized metadata");
}

if (
  [
    koHtml,
    koProductHtml,
    koMotorcycleHtml,
    koSampleHtml,
    ...Object.values(synchronizedDetailHtml.ko),
    ...Object.values(synchronizedApplicationHtml.ko)
  ].every(
    (html) =>
      html.includes('value="Motorcycle battery"') &&
      html.includes('value="AGM separator rolls"') &&
      /name="language"\s+value="ko"/.test(html)
  ) &&
  [
    jaHtml,
    jaProductHtml,
    jaMotorcycleHtml,
    jaSampleHtml,
    ...Object.values(synchronizedDetailHtml.ja),
    ...Object.values(synchronizedApplicationHtml.ja)
  ].every(
    (html) =>
      html.includes('value="Motorcycle battery"') &&
      html.includes('value="AGM separator rolls"') &&
      /name="language"\s+value="ja"/.test(html)
  )
) {
  pass("Korean and Japanese inquiry forms submit canonical values and locale codes");
} else {
  fail("Korean or Japanese inquiry form values are not canonical or language is missing");
}

const spanishPortugueseRussianPages = [
  [esHtml, "/es/", "es", "es_LA"],
  [
    esProductHtml,
    "/es/products/agm-separator/",
    "es",
    "es_LA"
  ],
  [
    synchronizedDetailHtml.es.rolls,
    "/es/products/agm-separator-rolls/",
    "es",
    "es_LA"
  ],
  [
    synchronizedDetailHtml.es.sheets,
    "/es/products/agm-separator-sheets/",
    "es",
    "es_LA"
  ],
  [
    synchronizedDetailHtml.es.testing,
    "/es/quality-control/agm-separator-testing/",
    "es",
    "es_LA"
  ],
  [
    esMotorcycleHtml,
    "/es/applications/agm-separator-for-motorcycle-battery/",
    "es",
    "es_LA"
  ],
  ...synchronizedApplicationSlugs.map((slug) => [
    synchronizedApplicationHtml.es[slug],
    `/es/applications/${slug}/`,
    "es",
    "es_LA"
  ]),
  [
    esSampleHtml,
    "/es/request-agm-separator-sample/",
    "es",
    "es_LA"
  ],
  [ptHtml, "/pt/", "pt-BR", "pt_BR"],
  [
    ptProductHtml,
    "/pt/products/agm-separator/",
    "pt-BR",
    "pt_BR"
  ],
  [
    synchronizedDetailHtml.pt.rolls,
    "/pt/products/agm-separator-rolls/",
    "pt-BR",
    "pt_BR"
  ],
  [
    synchronizedDetailHtml.pt.sheets,
    "/pt/products/agm-separator-sheets/",
    "pt-BR",
    "pt_BR"
  ],
  [
    synchronizedDetailHtml.pt.testing,
    "/pt/quality-control/agm-separator-testing/",
    "pt-BR",
    "pt_BR"
  ],
  [
    ptMotorcycleHtml,
    "/pt/applications/agm-separator-for-motorcycle-battery/",
    "pt-BR",
    "pt_BR"
  ],
  ...synchronizedApplicationSlugs.map((slug) => [
    synchronizedApplicationHtml.pt[slug],
    `/pt/applications/${slug}/`,
    "pt-BR",
    "pt_BR"
  ]),
  [
    ptSampleHtml,
    "/pt/request-agm-separator-sample/",
    "pt-BR",
    "pt_BR"
  ],
  [ruHtml, "/ru/", "ru-RU", "ru_RU"],
  [
    ruProductHtml,
    "/ru/products/agm-separator/",
    "ru-RU",
    "ru_RU"
  ],
  [
    synchronizedDetailHtml.ru.rolls,
    "/ru/products/agm-separator-rolls/",
    "ru-RU",
    "ru_RU"
  ],
  [
    synchronizedDetailHtml.ru.sheets,
    "/ru/products/agm-separator-sheets/",
    "ru-RU",
    "ru_RU"
  ],
  [
    synchronizedDetailHtml.ru.testing,
    "/ru/quality-control/agm-separator-testing/",
    "ru-RU",
    "ru_RU"
  ],
  [
    ruMotorcycleHtml,
    "/ru/applications/agm-separator-for-motorcycle-battery/",
    "ru-RU",
    "ru_RU"
  ],
  ...synchronizedApplicationSlugs.map((slug) => [
    synchronizedApplicationHtml.ru[slug],
    `/ru/applications/${slug}/`,
    "ru-RU",
    "ru_RU"
  ]),
  [
    ruSampleHtml,
    "/ru/request-agm-separator-sample/",
    "ru-RU",
    "ru_RU"
  ]
];

const spanishPortugueseRussianSeoComplete =
  spanishPortugueseRussianPages.every(([html, path, language, locale]) =>
    [
      `https://www.vikingagm.com${path}`,
      `hrefLang="${language}"`,
      `"inLanguage":"${language}"`,
      locale
    ].every((value) => html.includes(value))
  );

if (spanishPortugueseRussianSeoComplete) {
  pass("Spanish, Portuguese and Russian pages include localized SEO metadata");
} else {
  fail("one or more Spanish, Portuguese or Russian pages have incomplete SEO metadata");
}

const newLocaleFormsComplete = [
  [
    "es",
    esHtml,
    esProductHtml,
    esMotorcycleHtml,
    esSampleHtml,
    ...Object.values(synchronizedDetailHtml.es),
    ...Object.values(synchronizedApplicationHtml.es)
  ],
  [
    "pt",
    ptHtml,
    ptProductHtml,
    ptMotorcycleHtml,
    ptSampleHtml,
    ...Object.values(synchronizedDetailHtml.pt),
    ...Object.values(synchronizedApplicationHtml.pt)
  ],
  [
    "ru",
    ruHtml,
    ruProductHtml,
    ruMotorcycleHtml,
    ruSampleHtml,
    ...Object.values(synchronizedDetailHtml.ru),
    ...Object.values(synchronizedApplicationHtml.ru)
  ]
].every(([language, ...pages]) =>
  pages.every(
    (html) =>
      html.includes('value="Motorcycle battery"') &&
      html.includes('value="AGM separator rolls"') &&
      new RegExp(`name="language"\\s+value="${language}"`).test(html)
  )
);

if (newLocaleFormsComplete) {
  pass("Spanish, Portuguese and Russian forms submit canonical values");
} else {
  fail("Spanish, Portuguese or Russian form values are not canonical");
}

if (
  upsVrlaArticleHtml.includes(
    "https://www.vikingagm.com/blog/why-ups-projects-still-use-vrla-batteries/"
  ) &&
  zhUpsVrlaArticleHtml.includes(
    "https://www.vikingagm.com/zh/blog/why-ups-projects-still-use-vrla-batteries/"
  ) &&
  upsVrlaArticleHtml.includes('"@type":"BlogPosting"') &&
  upsVrlaArticleHtml.includes('"datePublished":"2026-07-23"') &&
  zhUpsVrlaArticleHtml.includes('"@type":"BlogPosting"') &&
  zhUpsVrlaArticleHtml.includes('"datePublished":"2026-07-23"')
) {
  pass("UPS VRLA articles include canonical URLs and BlogPosting dates");
} else {
  fail("UPS VRLA articles are missing canonical or BlogPosting metadata");
}

const wechatPlaceholders = ["点赞", "在看", "转发", "滑动", ">图片<"];
if (
  wechatPlaceholders.every(
    (placeholder) => !zhUpsVrlaArticleHtml.includes(placeholder)
  )
) {
  pass("Chinese UPS VRLA article excludes WeChat-only placeholders");
} else {
  fail("Chinese UPS VRLA article still contains WeChat-only placeholders");
}

if (
  agmVsPvcArticleHtml.includes(
    "https://www.vikingagm.com/blog/agm-glass-fiber-vs-pvc-battery-separator/"
  ) &&
  zhAgmVsPvcArticleHtml.includes(
    "https://www.vikingagm.com/zh/blog/agm-glass-fiber-vs-pvc-battery-separator/"
  ) &&
  agmVsPvcArticleHtml.includes('"@type":"BlogPosting"') &&
  agmVsPvcArticleHtml.includes('"datePublished":"2026-07-26"') &&
  zhAgmVsPvcArticleHtml.includes('"@type":"BlogPosting"') &&
  zhAgmVsPvcArticleHtml.includes('"datePublished":"2026-07-26"')
) {
  pass("AGM vs PVC articles include canonical URLs and BlogPosting dates");
} else {
  fail("AGM vs PVC articles are missing canonical or BlogPosting metadata");
}

if (
  agmVsPvcArticleHtml.includes("AGM glass fiber separator") &&
  agmVsPvcArticleHtml.includes("Microporous PVC separator") &&
  agmVsPvcArticleHtml.includes(
    "https://batterycouncil.org/battery-facts-and-applications/about-battery-separators/"
  ) &&
  zhAgmVsPvcArticleHtml.includes("AGM 玻璃纤维隔板") &&
  zhAgmVsPvcArticleHtml.includes("微孔 PVC 隔板") &&
  wechatPlaceholders.every(
    (placeholder) => !zhAgmVsPvcArticleHtml.includes(placeholder)
  )
) {
  pass("AGM vs PVC comparison and reference content is present");
} else {
  fail("AGM vs PVC article content or references are incomplete");
}

if (
  sitemap.includes("https://www.vikingagm.com/") &&
  sitemap.includes("https://www.vikingagm.com/zh/")
) {
  pass("sitemap.xml lists both public pages");
} else {
  fail("sitemap.xml does not list both public pages");
}

const applicationLocalePrefixes = ["", "zh", ...synchronizedLocaleCodes];
const allApplicationSlugs = [
  "agm-separator-for-vrla-battery",
  "agm-separator-for-ups-battery",
  "agm-separator-for-motorcycle-battery",
  "agm-separator-for-energy-storage-battery"
];
const p0ApplicationUrls = applicationLocalePrefixes.flatMap((locale) =>
  allApplicationSlugs.map(
    (slug) =>
      `https://www.vikingagm.com/${locale ? `${locale}/` : ""}applications/${slug}/`
  )
);

if (p0ApplicationUrls.every((url) => sitemap.includes(url))) {
  pass("sitemap.xml lists P0 application pages");
} else {
  fail("sitemap.xml is missing one or more P0 application pages");
}

if (sitemapUrls.length === 98) {
  pass("sitemap.xml lists the expected 98 localized public URLs");
} else {
  fail(`sitemap.xml lists ${sitemapUrls.length} URLs instead of 98`);
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
  ["https://www.vikingagm.com/", "2026-07-30"],
  ["https://www.vikingagm.com/vi/", "2026-07-30"],
  [
    "https://www.vikingagm.com/vi/products/agm-separator/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/vi/applications/agm-separator-for-motorcycle-battery/",
    "2026-07-31"
  ],
  [
    "https://www.vikingagm.com/vi/request-agm-separator-sample/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/ko/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/ko/products/agm-separator/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/ko/applications/agm-separator-for-motorcycle-battery/",
    "2026-07-31"
  ],
  [
    "https://www.vikingagm.com/ko/request-agm-separator-sample/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/ja/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/ja/applications/agm-separator-for-motorcycle-battery/",
    "2026-07-31"
  ],
  [
    "https://www.vikingagm.com/es/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/es/applications/agm-separator-for-motorcycle-battery/",
    "2026-07-31"
  ],
  [
    "https://www.vikingagm.com/pt/products/agm-separator/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/pt/applications/agm-separator-for-motorcycle-battery/",
    "2026-07-31"
  ],
  [
    "https://www.vikingagm.com/ru/request-agm-separator-sample/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/ru/applications/agm-separator-for-motorcycle-battery/",
    "2026-07-31"
  ],
  [
    "https://www.vikingagm.com/ja/products/agm-separator/",
    "2026-07-30"
  ],
  [
    "https://www.vikingagm.com/ja/request-agm-separator-sample/",
    "2026-07-30"
  ],
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
    "https://www.vikingagm.com/blog/why-ups-projects-still-use-vrla-batteries/",
    "2026-07-23"
  ],
  [
    "https://www.vikingagm.com/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    "2026-07-26"
  ],
  [
    "https://www.vikingagm.com/resources/",
    "2026-07-26"
  ],
  ...synchronizedLocaleCodes.flatMap((locale) => [
    [
      `https://www.vikingagm.com/${locale}/products/agm-separator-rolls/`,
      "2026-07-31"
    ],
    [
      `https://www.vikingagm.com/${locale}/products/agm-separator-sheets/`,
      "2026-07-31"
    ],
    [
      `https://www.vikingagm.com/${locale}/quality-control/agm-separator-testing/`,
      "2026-07-31"
    ],
    ...allApplicationSlugs.map((slug) => [
      `https://www.vikingagm.com/${locale}/applications/${slug}/`,
      "2026-07-31"
    ])
  ])
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
