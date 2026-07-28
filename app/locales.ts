export type Lang = "en" | "zh";
export type SiteLocale = Lang | "vi";

export const localeHomePaths: Record<SiteLocale, string> = {
  en: "/",
  zh: "/zh/",
  vi: "/vi/"
};

export const localizedRouteGroups = [
  localeHomePaths,
  {
    en: "/products/agm-separator/",
    zh: "/zh/products/agm-separator/",
    vi: "/vi/products/agm-separator/"
  },
  {
    en: "/applications/agm-separator-for-motorcycle-battery/",
    zh: "/zh/applications/agm-separator-for-motorcycle-battery/",
    vi: "/vi/applications/agm-separator-for-motorcycle-battery/"
  },
  {
    en: "/request-agm-separator-sample/",
    zh: "/zh/request-agm-separator-sample/",
    vi: "/vi/request-agm-separator-sample/"
  }
] satisfies Array<Record<SiteLocale, string>>;

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
    return exactGroup;
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
