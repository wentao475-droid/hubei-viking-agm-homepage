export type Lang = "en" | "zh";
export type SiteLocale = Lang | "vi" | "ko" | "ja" | "es" | "pt" | "ru";

export const localeHomePaths: Record<SiteLocale, string> = {
  en: "/",
  zh: "/zh/",
  vi: "/vi/",
  ko: "/ko/",
  ja: "/ja/",
  es: "/es/",
  pt: "/pt/",
  ru: "/ru/"
};

const synchronizedResourcePaths = [
  "resources",
  "blog/what-is-agm-separator",
  "blog/key-technical-parameters-of-agm-separator",
  "blog/how-to-choose-agm-separator",
  "blog/agm-glass-fiber-vs-pvc-battery-separator",
  "blog/agm-separator-manufacturing-quality-delivery",
  "blog/agm-separator-performance-consistency",
  "blog/agm-separator-export-supply-readiness",
  "blog/why-ups-projects-still-use-vrla-batteries"
] as const;

function allLocalePaths(suffix: string): Record<SiteLocale, string> {
  return {
    en: `/${suffix}/`,
    zh: `/zh/${suffix}/`,
    vi: `/vi/${suffix}/`,
    ko: `/ko/${suffix}/`,
    ja: `/ja/${suffix}/`,
    es: `/es/${suffix}/`,
    pt: `/pt/${suffix}/`,
    ru: `/ru/${suffix}/`
  };
}

export const localizedRouteGroups = [
  localeHomePaths,
  {
    en: "/products/agm-separator/",
    zh: "/zh/products/agm-separator/",
    vi: "/vi/products/agm-separator/",
    ko: "/ko/products/agm-separator/",
    ja: "/ja/products/agm-separator/",
    es: "/es/products/agm-separator/",
    pt: "/pt/products/agm-separator/",
    ru: "/ru/products/agm-separator/"
  },
  {
    en: "/products/agm-separator-rolls/",
    zh: "/zh/products/agm-separator-rolls/",
    vi: "/vi/products/agm-separator-rolls/",
    ko: "/ko/products/agm-separator-rolls/",
    ja: "/ja/products/agm-separator-rolls/",
    es: "/es/products/agm-separator-rolls/",
    pt: "/pt/products/agm-separator-rolls/",
    ru: "/ru/products/agm-separator-rolls/"
  },
  {
    en: "/products/agm-separator-sheets/",
    zh: "/zh/products/agm-separator-sheets/",
    vi: "/vi/products/agm-separator-sheets/",
    ko: "/ko/products/agm-separator-sheets/",
    ja: "/ja/products/agm-separator-sheets/",
    es: "/es/products/agm-separator-sheets/",
    pt: "/pt/products/agm-separator-sheets/",
    ru: "/ru/products/agm-separator-sheets/"
  },
  {
    en: "/quality-control/agm-separator-testing/",
    zh: "/zh/quality-control/agm-separator-testing/",
    vi: "/vi/quality-control/agm-separator-testing/",
    ko: "/ko/quality-control/agm-separator-testing/",
    ja: "/ja/quality-control/agm-separator-testing/",
    es: "/es/quality-control/agm-separator-testing/",
    pt: "/pt/quality-control/agm-separator-testing/",
    ru: "/ru/quality-control/agm-separator-testing/"
  },
  {
    en: "/applications/agm-separator-for-vrla-battery/",
    zh: "/zh/applications/agm-separator-for-vrla-battery/",
    vi: "/vi/applications/agm-separator-for-vrla-battery/",
    ko: "/ko/applications/agm-separator-for-vrla-battery/",
    ja: "/ja/applications/agm-separator-for-vrla-battery/",
    es: "/es/applications/agm-separator-for-vrla-battery/",
    pt: "/pt/applications/agm-separator-for-vrla-battery/",
    ru: "/ru/applications/agm-separator-for-vrla-battery/"
  },
  {
    en: "/applications/agm-separator-for-ups-battery/",
    zh: "/zh/applications/agm-separator-for-ups-battery/",
    vi: "/vi/applications/agm-separator-for-ups-battery/",
    ko: "/ko/applications/agm-separator-for-ups-battery/",
    ja: "/ja/applications/agm-separator-for-ups-battery/",
    es: "/es/applications/agm-separator-for-ups-battery/",
    pt: "/pt/applications/agm-separator-for-ups-battery/",
    ru: "/ru/applications/agm-separator-for-ups-battery/"
  },
  {
    en: "/applications/agm-separator-for-motorcycle-battery/",
    zh: "/zh/applications/agm-separator-for-motorcycle-battery/",
    vi: "/vi/applications/agm-separator-for-motorcycle-battery/",
    ko: "/ko/applications/agm-separator-for-motorcycle-battery/",
    ja: "/ja/applications/agm-separator-for-motorcycle-battery/",
    es: "/es/applications/agm-separator-for-motorcycle-battery/",
    pt: "/pt/applications/agm-separator-for-motorcycle-battery/",
    ru: "/ru/applications/agm-separator-for-motorcycle-battery/"
  },
  {
    en: "/applications/agm-separator-for-energy-storage-battery/",
    zh: "/zh/applications/agm-separator-for-energy-storage-battery/",
    vi: "/vi/applications/agm-separator-for-energy-storage-battery/",
    ko: "/ko/applications/agm-separator-for-energy-storage-battery/",
    ja: "/ja/applications/agm-separator-for-energy-storage-battery/",
    es: "/es/applications/agm-separator-for-energy-storage-battery/",
    pt: "/pt/applications/agm-separator-for-energy-storage-battery/",
    ru: "/ru/applications/agm-separator-for-energy-storage-battery/"
  },
  {
    en: "/request-agm-separator-sample/",
    zh: "/zh/request-agm-separator-sample/",
    vi: "/vi/request-agm-separator-sample/",
    ko: "/ko/request-agm-separator-sample/",
    ja: "/ja/request-agm-separator-sample/",
    es: "/es/request-agm-separator-sample/",
    pt: "/pt/request-agm-separator-sample/",
    ru: "/ru/request-agm-separator-sample/"
  },
  ...synchronizedResourcePaths.map(allLocalePaths)
] satisfies Array<Partial<Record<SiteLocale, string>>>;

export function languagePathsFor(
  pathname: string,
  currentLocale: SiteLocale,
  alternatePath?: string
) {
  const normalizedPath = normalizePath(pathname);
  const exactGroup = localizedRouteGroups.find((group) =>
    Object.values(group).some((path) => normalizePath(path) === normalizedPath)
  );

  if (exactGroup) {
    return {
      ...localeHomePaths,
      ...exactGroup
    };
  }

  const fallback = { ...localeHomePaths };
  if (alternatePath) {
    if (currentLocale === "en") {
      fallback.zh = alternatePath;
    } else if (currentLocale === "zh") {
      fallback.en = alternatePath;
    }
  }

  return fallback;
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return `${pathname.replace(/\/+$/, "")}/`;
}
