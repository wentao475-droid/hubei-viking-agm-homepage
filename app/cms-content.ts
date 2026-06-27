import siteContent from "../content/site-content.json";

export type CmsSiteContent = {
  home?: Record<string, unknown>;
  products?: Record<string, unknown>;
  articles?: Record<string, unknown>;
  seo?: Record<string, unknown>;
};

const cmsContent = siteContent as CmsSiteContent;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function mergeCmsContent<T>(defaults: T, override: unknown): T {
  if (Array.isArray(defaults)) {
    return Array.isArray(override) ? (override as T) : defaults;
  }

  if (!isPlainObject(defaults)) {
    return override === undefined ? defaults : (override as T);
  }

  if (!isPlainObject(override)) {
    return defaults;
  }

  const merged: Record<string, unknown> = { ...defaults };

  for (const [key, value] of Object.entries(override)) {
    merged[key] = mergeCmsContent(merged[key], value);
  }

  return merged as T;
}

export function homeContent<T>(lang: string, defaults: T): T {
  return mergeCmsContent(defaults, cmsContent.home?.[lang]);
}

export function productContent<T>(page: string, lang: string, defaults: T): T {
  const pageContent = cmsContent.products?.[page];
  const override = isPlainObject(pageContent) ? pageContent[lang] : undefined;
  return mergeCmsContent(defaults, override);
}

export function articleContent<T>(page: string, lang: string, defaults: T): T {
  const pageContent = cmsContent.articles?.[page];
  const override = isPlainObject(pageContent) ? pageContent[lang] : undefined;
  return mergeCmsContent(defaults, override);
}

export function seoContent<T>(page: string, lang: string, defaults: T): T {
  const pageContent = cmsContent.seo?.[page];
  const override = isPlainObject(pageContent) ? pageContent[lang] : undefined;
  return mergeCmsContent(defaults, override);
}
