"use client";

import Image from "next/image";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { SiteLocale } from "./locales";
import { ProductNavDropdown, ProductNavMobileGroup } from "./ProductNav";
import { QualityNavDropdown, QualityNavMobileGroup } from "./QualityNav";
import { ResourcesNavDropdown, ResourcesNavMobileGroup } from "./ResourcesNav";
import {
  ApplicationsNavDropdown,
  ApplicationsNavMobileGroup
} from "./ApplicationsNav";

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
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单"
  },
  vi: {
    company: "Công ty",
    products: "Sản phẩm",
    quality: "Chất lượng",
    resources: "Tài liệu",
    applications: "Ứng dụng",
    contact: "Liên hệ",
    companyName: "Công ty TNHH Công nghệ Hubei Viking",
    menuOpen: "Mở menu điều hướng",
    menuClose: "Đóng menu điều hướng"
  },
  ko: {
    company: "회사",
    products: "제품",
    quality: "품질",
    resources: "자료",
    applications: "적용 분야",
    contact: "문의",
    companyName: "후베이 바이킹 테크놀로지 유한회사",
    menuOpen: "내비게이션 메뉴 열기",
    menuClose: "내비게이션 메뉴 닫기"
  },
  ja: {
    company: "会社",
    products: "製品",
    quality: "品質",
    resources: "資料",
    applications: "用途",
    contact: "お問い合わせ",
    companyName: "湖北維京科技有限公司",
    menuOpen: "ナビゲーションメニューを開く",
    menuClose: "ナビゲーションメニューを閉じる"
  },
  es: {
    company: "Empresa",
    products: "Productos",
    quality: "Calidad",
    resources: "Recursos",
    applications: "Aplicaciones",
    contact: "Contacto",
    companyName: "Hubei Viking Technology Co., Ltd.",
    menuOpen: "Abrir menú de navegación",
    menuClose: "Cerrar menú de navegación"
  },
  pt: {
    company: "Empresa",
    products: "Produtos",
    quality: "Qualidade",
    resources: "Recursos",
    applications: "Aplicações",
    contact: "Contato",
    companyName: "Hubei Viking Technology Co., Ltd.",
    menuOpen: "Abrir menu de navegação",
    menuClose: "Fechar menu de navegação"
  },
  ru: {
    company: "Компания",
    products: "Продукция",
    quality: "Качество",
    resources: "Материалы",
    applications: "Применение",
    contact: "Контакты",
    companyName: "Hubei Viking Technology Co., Ltd.",
    menuOpen: "Открыть меню навигации",
    menuClose: "Закрыть меню навигации"
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
  lang: SiteLocale;
  homePath: string;
  languagePath: string;
  quoteLabel: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = headerCopy[lang];
  const homeHref = asset(homePath);
  const hasFullNavigation = lang === "en" || lang === "zh";
  const hasApplications = hasFullNavigation || lang === "vi";

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
          {hasFullNavigation && (
            <>
              <QualityNavDropdown lang={lang} label={t.quality} />
              <ResourcesNavDropdown lang={lang} label={t.resources} />
            </>
          )}
          {hasApplications && (
            <ApplicationsNavDropdown lang={lang} label={t.applications} />
          )}
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
          <LanguageSwitcher lang={lang} alternatePath={languagePath} />
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ink xl:px-5 xl:py-3"
          >
            {quoteLabel}
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <LanguageSwitcher
            lang={lang}
            alternatePath={languagePath}
            compact
          />
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
            {hasFullNavigation && (
              <>
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
              </>
            )}
            {hasApplications && (
              <ApplicationsNavMobileGroup
                lang={lang}
                label={t.applications}
                onNavigate={() => setMenuOpen(false)}
              />
            )}
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
