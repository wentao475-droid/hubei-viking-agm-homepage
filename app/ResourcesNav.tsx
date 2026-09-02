"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteLocale } from "./locales";
import { secondaryResourceData } from "../content/secondary-resources.mjs";
import {
  getArticlesByCategory,
  getResourceCategoryPath,
  getResourcesPath,
  localizeHref,
  localizeText,
  resourceActions,
  resourceCategoryCopy,
  resourceCategoryOrder
} from "./resourceCatalog";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const resourcesNavCopy = {
  en: {
    start: "Start here",
    browse: "Browse by topic",
    viewAll: "View all resources",
    viewAllDescription: "Explore all buyer guides, manufacturing notes and industry articles."
  },
  zh: {
    start: "采购入口",
    browse: "按主题浏览",
    viewAll: "查看全部资料",
    viewAllDescription: "集中查看采购指南、生产质量说明和行业应用文章。"
  }
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function ResourcesNavDropdown({
  lang,
  label
}: {
  lang: SiteLocale;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t =
    lang === "en" || lang === "zh"
      ? resourcesNavCopy[lang]
      : {
          start: secondaryResourceData[lang].hub.actionEyebrow,
          browse: secondaryResourceData[lang].hub.libraryTitle,
          viewAll: secondaryResourceData[lang].hub.libraryEyebrow,
          viewAllDescription: secondaryResourceData[lang].hub.subtitle
        };

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="resources-navigation-panel"
        onClick={() => setOpen(true)}
        className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-graphite transition hover:text-signal focus:text-signal focus:outline-none"
      >
        {label}
        <span
          aria-hidden="true"
          className={`text-xs transition ${
            open ? "rotate-180 text-signal" : "text-steel"
          }`}
        >
          ▲
        </span>
      </button>

      <div
        id="resources-navigation-panel"
        className={`absolute left-1/2 top-full z-50 w-[min(820px,calc(100vw-2rem))] -translate-x-1/2 pt-4 transition ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-md border border-line bg-white p-3 shadow-industrial">
          <div className="grid gap-3 lg:grid-cols-[250px_1fr]">
            <section className="rounded-md bg-ink p-4 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">
                {t.start}
              </p>
              <div className="mt-3 divide-y divide-white/12">
                {resourceActions.map((item) => (
                  <a
                    key={item.id}
                    href={asset(localizeHref(item.href, lang))}
                    onClick={() => setOpen(false)}
                    className="group/action block py-3 first:pt-1 last:pb-1 focus:outline-none"
                  >
                    <span className="flex items-center justify-between gap-3 text-sm font-bold leading-6 text-white transition group-hover/action:text-sky-200 group-focus/action:text-sky-200">
                      {localizeText(item.title, lang)}
                      <span aria-hidden="true" className="shrink-0">
                        →
                      </span>
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-white/62">
                      {localizeText(item.description, lang)}
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section className="p-2">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-signal">
                {t.browse}
              </p>
              <div className="mt-4 grid gap-5 sm:grid-cols-3">
                {resourceCategoryOrder.map((category) => (
                  <div key={category}>
                    <a
                      href={asset(getResourceCategoryPath(category, lang))}
                      onClick={() => setOpen(false)}
                      className="text-sm font-bold text-ink transition hover:text-signal focus:text-signal focus:outline-none"
                    >
                      {localizeText(resourceCategoryCopy[category].title, lang)}
                    </a>
                    <div className="mt-2 grid gap-1">
                      {getArticlesByCategory(category, lang).map((article) => (
                        <a
                          key={article.id}
                          href={asset(localizeHref(article.href, lang))}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-2 py-2 text-xs font-semibold leading-5 text-graphite transition hover:bg-frost hover:text-signal focus:bg-frost focus:text-signal focus:outline-none"
                        >
                          {localizeText(article.title, lang)}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={asset(getResourcesPath(lang))}
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-between gap-4 border-t border-line px-2 pt-4 focus:outline-none"
              >
                <span>
                  <span className="block text-sm font-bold text-ink transition hover:text-signal">
                    {t.viewAll}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-steel">
                    {t.viewAllDescription}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-frost text-signal"
                >
                  →
                </span>
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResourcesNavMobileGroup({
  lang,
  label,
  onNavigate
}: {
  lang: SiteLocale;
  label: string;
  onNavigate?: () => void;
}) {
  const t =
    lang === "en" || lang === "zh"
      ? resourcesNavCopy[lang]
      : {
          start: secondaryResourceData[lang].hub.actionEyebrow,
          browse: secondaryResourceData[lang].hub.libraryTitle,
          viewAll: secondaryResourceData[lang].hub.libraryEyebrow,
          viewAllDescription: secondaryResourceData[lang].hub.subtitle
        };

  return (
    <div className="rounded-md border border-line bg-frost p-2">
      <div className="px-2 py-1 text-xs font-bold uppercase tracking-[0.16em] text-steel">
        {label}
      </div>
      <div className="mt-1 grid gap-1">
        {resourceActions.map((item, index) => (
          <a
            key={item.id}
            href={asset(localizeHref(item.href, lang))}
            onClick={onNavigate}
            className={`flex items-center justify-between gap-3 rounded-md px-3 py-3 text-sm font-semibold transition ${
              index === 0
                ? "bg-signal text-white"
                : "bg-white text-ink hover:text-signal"
            }`}
          >
            {localizeText(item.title, lang)}
            <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>

      <div className="mt-3 border-t border-line px-1 pt-3">
        <p className="px-2 text-[11px] font-bold uppercase tracking-[0.14em] text-steel">
          {t.browse}
        </p>
        <div className="mt-1 grid">
          {resourceCategoryOrder.map((category) => (
            <a
              key={category}
              href={asset(getResourceCategoryPath(category, lang))}
              onClick={onNavigate}
              className="flex items-center justify-between gap-3 rounded-md px-2 py-2.5 text-sm font-semibold text-graphite transition hover:bg-white hover:text-signal"
            >
              {localizeText(resourceCategoryCopy[category].title, lang)}
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>

      <a
        href={asset(getResourcesPath(lang))}
        onClick={onNavigate}
        className="mt-2 flex items-center justify-between gap-3 rounded-md border border-line bg-white px-3 py-3 text-sm font-bold text-signal"
      >
        {t.viewAll}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
