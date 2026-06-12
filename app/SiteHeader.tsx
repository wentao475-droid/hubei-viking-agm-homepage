"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductNavDropdown, ProductNavMobileGroup } from "./ProductNav";
import { QualityNavDropdown, QualityNavMobileGroup } from "./QualityNav";
import { ResourcesNavDropdown, ResourcesNavMobileGroup } from "./ResourcesNav";
import {
  ApplicationsNavDropdown,
  ApplicationsNavMobileGroup
} from "./ApplicationsNav";

type Lang = "en" | "zh";
type IconProps = { size?: number; className?: string };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const headerCopy = {
  en: {
    company: "Company",
    products: "Products",
    quality: "Quality",
    resources: "Resources",
    applications: "Applications",
    contact: "Contact",
    companyName: "Hubei Viking Technology Co., Ltd.",
    language: "中文",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu"
  },
  zh: {
    company: "公司",
    products: "产品",
    quality: "质量",
    resources: "资料",
    applications: "应用",
    contact: "联系",
    companyName: "湖北维京科技有限公司",
    language: "EN",
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单"
  }
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

function MenuIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ArrowRight({ size = 16, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function SiteHeader({
  lang,
  homePath,
  languagePath,
  quoteLabel
}: {
  lang: Lang;
  homePath: string;
  languagePath: string;
  quoteLabel: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = headerCopy[lang];
  const homeHref = asset(homePath);
  const languageHref = asset(languagePath);

  const navItemsBeforeProducts = [[t.company, `${homeHref}#company`]] as const;
  const navItemsAfterResources = [[t.contact, "#contact"]] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/25 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href={homeHref} className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-32 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white sm:h-10 sm:w-40 xl:w-44">
            <Image
              src={asset("/images/banner-logo-header.webp")}
              alt="Viking Technology logo"
              width={520}
              height={150}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="hidden min-w-0 max-w-[210px] md:block xl:max-w-[300px]">
            <span
              className="block truncate text-sm font-semibold leading-tight text-ink xl:text-base"
              title={t.companyName}
            >
              {t.companyName}
            </span>
            <span className="block text-[11px] font-semibold uppercase leading-5 tracking-[0.18em] text-steel">
              AGM SEPARATOR
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
          {navItemsBeforeProducts.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap text-sm font-medium text-graphite transition hover:text-signal"
            >
              {label}
            </a>
          ))}
          <ProductNavDropdown lang={lang} label={t.products} />
          <QualityNavDropdown lang={lang} label={t.quality} />
          <ResourcesNavDropdown lang={lang} label={t.resources} />
          <ApplicationsNavDropdown lang={lang} label={t.applications} />
          {navItemsAfterResources.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap text-sm font-medium text-graphite transition hover:text-signal"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          <a
            href={languageHref}
            className="whitespace-nowrap rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-graphite transition hover:border-signal hover:text-signal"
          >
            {t.language}
          </a>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ink xl:px-5 xl:py-3"
          >
            {quoteLabel}
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <a
            href={languageHref}
            className="inline-flex h-10 min-w-12 items-center justify-center rounded-md border border-line bg-white px-3 text-sm font-semibold text-graphite transition hover:border-signal hover:text-signal"
          >
            {t.language}
          </a>
          <button
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-white text-ink"
            type="button"
          >
            {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-line bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItemsBeforeProducts.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-graphite hover:bg-frost"
              >
                {label}
              </a>
            ))}
            <ProductNavMobileGroup
              lang={lang}
              label={t.products}
              onNavigate={() => setMenuOpen(false)}
            />
            <QualityNavMobileGroup
              lang={lang}
              label={t.quality}
              onNavigate={() => setMenuOpen(false)}
            />
            <ResourcesNavMobileGroup
              lang={lang}
              label={t.resources}
              onNavigate={() => setMenuOpen(false)}
            />
            <ApplicationsNavMobileGroup
              lang={lang}
              label={t.applications}
              onNavigate={() => setMenuOpen(false)}
            />
            {navItemsAfterResources.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-graphite hover:bg-frost"
              >
                {label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-md bg-signal px-3 py-2 text-center text-sm font-semibold text-white"
              >
                {quoteLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
