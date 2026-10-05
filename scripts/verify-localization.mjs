import { existsSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { articleKinds, secondaryResourceLocales } from "../content/secondary-resources.mjs";

const root = process.cwd();
const out = join(root, "out");
const origin = "https://www.vikingagm.com";
const locales = ["en", "zh", ...secondaryResourceLocales];
const language = { en: "en", zh: "zh-CN", vi: "vi", ko: "ko", ja: "ja", es: "es", pt: "pt-BR", ru: "ru", ar: "ar" };
const hreflang = { ...language, vi: "vi-VN", ko: "ko-KR", ja: "ja-JP", ru: "ru-RU" };
const og = { en: "en_US", zh: "zh_CN", vi: "vi_VN", ko: "ko_KR", ja: "ja_JP", es: "es_LA", pt: "pt_BR", ru: "ru_RU", ar: "ar_AR" };
const routeCode = ts.transpileModule(readFileSync(join(root, "app/locales.ts"), "utf8"), {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext }
}).outputText.replace("../content/secondary-resources.mjs", pathToFileURL(join(root, "content/secondary-resources.mjs")).href);
const { localizedRouteGroups, languagePathsFor } = await import(`data:text/javascript;base64,${Buffer.from(routeCode).toString("base64")}`);
const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const htmlCache = new Map();
const failures = new Set();
const counts = Object.fromEntries(locales.map((l) => [l, 0]));
const decode = (s) => s.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]));
const bodyTexts = (html) => [...html.matchAll(/<(?:p|h[1-6]|label|option)\b[^>]*>([\s\S]*?)<\/(?:p|h[1-6]|label|option)>/g)].map((m) => m[1].replace(/<[^>]*>/g, "").trim());
const allowedEnglish = new Set(["AGM Battery Separator / Absorbent Glass Mat Separator", "Do not fill this out:"]);
const fileFor = (path) => join(out, path.slice(1), path.endsWith("/") ? "index.html" : "");
function htmlFor(path) {
  if (!htmlCache.has(path)) htmlCache.set(path, existsSync(fileFor(path)) ? readFileSync(fileFor(path), "utf8") : "");
  return htmlCache.get(path);
}
function check(condition, path, message) {
  if (!condition) failures.add(`${path}: ${message}`);
}

for (const path of paths) {
  const locale = locales.find((l) => l !== "en" && path.startsWith(`/${l}/`)) ?? "en";
  counts[locale] += 1;
  const html = htmlFor(path);
  check(Boolean(html), path, "missing static HTML");
  const htmlTag = attributes(html.match(/<html\b[^>]*>/)?.[0] ?? "");
  check(htmlTag.lang === language[locale], path, "incorrect HTML lang");
  if (locale === "ar") check(htmlTag.dir === "rtl", path, "missing RTL direction");
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attributes(m[0]));
  check(links.filter((l) => l.rel === "canonical").length === 1 && links.some((l) => l.rel === "canonical" && l.href === `${origin}${path}`), path, "canonical is not self-referential");
  const group = localizedRouteGroups.find((g) => Object.values(g).includes(path));
  check(Boolean(group), path, "not registered for exact language switching");
  if (group) {
    const switchTargets = languagePathsFor(path, locale);
    for (const targetLocale of locales) {
      const target = group[targetLocale];
      check(paths.includes(target), path, `missing ${targetLocale} counterpart`);
      check(switchTargets[targetLocale] === target, path, `${targetLocale} switch loses current page`);
      check(links.some((l) => l.rel === "alternate" && l.hreflang === hreflang[targetLocale] && l.href === `${origin}${target}`), path, `${targetLocale} hreflang missing or incorrect`);
    }
    check(links.some((l) => l.hreflang === "x-default" && l.href === `${origin}${group.en}`), path, "incorrect x-default");
    const title = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1];
    check(Boolean(title), path, "missing H1");
    if (locale !== "en") {
      check(title !== htmlFor(group.en).match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1], path, "English H1 fallback");
      const englishTexts = new Set(bodyTexts(htmlFor(group.en)));
      for (const text of bodyTexts(html)) {
        if (!englishTexts.has(text) || allowedEnglish.has(text) || /Hubei Viking|Viking Technology|EN\/ZH/.test(text)) continue;
        check(!/[A-Za-z]{3,}(?:[ ,.-]+[A-Za-z]{3,}){3}/.test(text), path, `untranslated English paragraph: ${text.slice(0,100)}`);
      }
    }
  }
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attributes(m[0]));
  check(meta.some((m) => m.property === "og:locale" && m.content === og[locale]), path, "incorrect Open Graph locale");
  check(meta.some((m) => m.name === "description" && m.content?.trim()), path, "missing description");
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  check(schemas.length > 0, path, "missing structured data");
  for (const [, json] of schemas) {
    try { JSON.parse(json); } catch { check(false, path, "invalid structured data JSON"); }
  }
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    const url = new URL(decode(match[1]), `${origin}${path}`);
    if (url.origin !== origin) continue;
    const target = url.pathname;
    check(existsSync(fileFor(target)), path, `broken internal link ${target}`);
    if (url.hash && (target.endsWith("/") || extname(target) === ".html")) {
      const id = decodeURIComponent(url.hash.slice(1));
      check(htmlFor(target).includes(`id="${id}"`), path, `missing fragment ${target}${url.hash}`);
    }
  }
}

for (const locale of locales) check(counts[locale] === 12 + articleKinds.length, locale, `expected ${12 + articleKinds.length} pages, got ${counts[locale]}`);
check(new Set(paths).size === paths.length, "sitemap", "duplicate public URLs");
if (failures.size) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`PASS ${paths.length} pages: language, RTL, canonical, reciprocal hreflang, exact language switching, metadata, structured data, internal links and fragments`);
  console.log(JSON.stringify(counts));
}
