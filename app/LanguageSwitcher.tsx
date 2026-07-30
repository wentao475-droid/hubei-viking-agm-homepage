"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  languagePathsFor,
  type SiteLocale
} from "./locales";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const localeCopy = {
  en: {
    short: "EN",
    name: "English",
    aria: "Current language English. Change language"
  },
  zh: {
    short: "中文",
    name: "中文",
    aria: "当前语言为中文。切换语言"
  },
  vi: {
    short: "VI",
    name: "Tiếng Việt",
    aria: "Ngôn ngữ hiện tại là tiếng Việt. Đổi ngôn ngữ"
  },
  ko: {
    short: "KO",
    name: "한국어",
    aria: "현재 언어는 한국어입니다. 언어 변경"
  },
  ja: {
    short: "JA",
    name: "日本語",
    aria: "現在の言語は日本語です。言語を変更"
  },
  es: {
    short: "ES",
    name: "Español",
    aria: "El idioma actual es español. Cambiar idioma"
  },
  pt: {
    short: "PT",
    name: "Português (Brasil)",
    aria: "O idioma atual é português. Alterar idioma"
  },
  ru: {
    short: "RU",
    name: "Русский",
    aria: "Текущий язык — русский. Изменить язык"
  }
} as const;

export function LanguageSwitcher({
  lang,
  alternatePath,
  compact = false
}: {
  lang: SiteLocale;
  alternatePath?: string;
  compact?: boolean;
}) {
  const pathname = usePathname() || "/";
  const paths = languagePathsFor(pathname, lang, alternatePath);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const current = localeCopy[lang];

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-label={current.aria}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-line bg-white px-3 text-sm font-semibold text-graphite transition hover:border-signal hover:text-signal focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 ${
          compact ? "min-w-[4.75rem]" : "min-w-[5.25rem]"
        }`}
      >
        <LocaleIcon locale={lang} />
        <span>{current.short}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 fill-current transition ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m5.25 7.5 4.75 4.75 4.75-4.75z" />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-[70] mt-2 max-h-[min(24rem,calc(100vh-5rem))] w-56 overflow-y-auto rounded-md border border-line bg-white p-1.5 shadow-industrial"
        >
          {(Object.keys(localeCopy) as SiteLocale[]).map((locale) => {
            const item = localeCopy[locale];
            const selected = locale === lang;

            return (
              <a
                key={locale}
                role="menuitem"
                href={`${basePath}${paths[locale]}`}
                lang={
                  locale === "zh"
                    ? "zh-CN"
                    : locale === "ko"
                      ? "ko-KR"
                      : locale === "ja"
                        ? "ja-JP"
                        : locale === "pt"
                          ? "pt-BR"
                          : locale === "ru"
                            ? "ru-RU"
                            : locale
                }
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-graphite transition hover:bg-frost hover:text-signal focus:bg-frost focus:text-signal focus:outline-none"
              >
                <LocaleIcon locale={locale} />
                <span className="flex-1">{item.name}</span>
                {selected && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-4 w-4 fill-signal"
                  >
                    <path d="m7.75 14.5-4.5-4.5 1.5-1.5 3 3 7.5-7.5 1.5 1.5z" />
                  </svg>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LocaleIcon({ locale }: { locale: SiteLocale }) {
  if (locale === "en") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 fill-none stroke-current"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 9h17M3.5 15h17M12 3c2.1 2.4 3.2 5.4 3.2 9S14.1 18.6 12 21c-2.1-2.4-3.2-5.4-3.2-9S9.9 5.4 12 3Z" />
      </svg>
    );
  }

  const flagFile = {
    zh: "cn",
    vi: "vn",
    ko: "kr",
    ja: "jp",
    es: "es",
    pt: "br",
    ru: "ru"
  }[locale];

  return (
    <Image
      aria-hidden="true"
      src={`${basePath}/icons/flags/${flagFile}.svg`}
      alt=""
      width={22}
      height={15}
      className="h-[15px] w-[22px] shrink-0 rounded-[2px] object-cover"
    />
  );
}
