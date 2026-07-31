"use client";

import { useState } from "react";
import type { SiteLocale } from "./locales";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const qualityNavItems = {
  en: [
    {
      title: "AGM Separator Testing",
      description:
        "Quality checks for thickness, basis weight, absorption, resistance and appearance.",
      href: "/quality-control/agm-separator-testing/"
    }
  ],
  zh: [
    {
      title: "AGM 隔板检测",
      description: "围绕厚度、克重、吸酸性能、电阻和外观等项目进行质量沟通。",
      href: "/zh/quality-control/agm-separator-testing/"
    }
  ],
  vi: [
    { title: "Kiểm tra tấm ngăn AGM", description: "Kiểm tra độ dày, định lượng, hút axit, điện trở và ngoại quan.", href: "/vi/quality-control/agm-separator-testing/" }
  ],
  ko: [
    { title: "AGM 분리막 시험", description: "두께, 평량, 산 흡수, 전기 저항 및 외관 품질을 확인합니다.", href: "/ko/quality-control/agm-separator-testing/" }
  ],
  ja: [
    { title: "AGMセパレーター試験", description: "厚さ、坪量、吸液、電気抵抗、外観を確認します。", href: "/ja/quality-control/agm-separator-testing/" }
  ],
  es: [
    { title: "Ensayos de separadores AGM", description: "Control de espesor, gramaje, absorción de ácido, resistencia y apariencia.", href: "/es/quality-control/agm-separator-testing/" }
  ],
  pt: [
    { title: "Ensaios de separadores AGM", description: "Controle de espessura, gramatura, absorção de ácido, resistência e aparência.", href: "/pt/quality-control/agm-separator-testing/" }
  ],
  ru: [
    { title: "Испытания AGM-сепаратора", description: "Контроль толщины, плотности, впитывания кислоты, сопротивления и внешнего вида.", href: "/ru/quality-control/agm-separator-testing/" }
  ]
} as const;

const qualityNavEyebrow = {
  en: "Quality page",
  zh: "质量页面",
  vi: "Chất lượng",
  ko: "품질",
  ja: "品質",
  es: "Calidad",
  pt: "Qualidade",
  ru: "Качество"
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function QualityNavDropdown({
  lang,
  label
}: {
  lang: SiteLocale;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const items = qualityNavItems[lang];

  return (
    <div
      className="group relative"
      onMouseLeave={() => setOpen(false)}
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
        onClick={() => setOpen((current) => !current)}
        className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-graphite transition hover:text-signal focus:outline-none focus:text-signal"
      >
        {label}
        <span
          aria-hidden="true"
          className={`text-xs transition ${
            open ? "rotate-180 text-signal" : "text-steel"
          } group-hover:rotate-180 group-hover:text-signal group-focus-within:rotate-180 group-focus-within:text-signal`}
        >
          ▲
        </span>
      </button>
      <div
        className={`absolute left-1/2 top-full z-50 w-80 max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-4 transition ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        } group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100`}
      >
        <div className="grid gap-2 rounded-md border border-line bg-white p-2 shadow-industrial">
          {items.map((item) => (
            <a
              key={item.href}
              href={asset(item.href)}
              onClick={() => setOpen(false)}
              className="block rounded-md border border-transparent p-4 transition hover:border-signal/20 hover:bg-frost focus:border-signal/30 focus:bg-frost focus:outline-none"
            >
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-signal">
                {qualityNavEyebrow[lang]}
              </span>
              <span className="mt-2 block text-sm font-bold leading-6 text-ink">
                {item.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-steel">
                {item.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function QualityNavMobileGroup({
  lang,
  label,
  onNavigate
}: {
  lang: SiteLocale;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="rounded-md border border-line bg-frost p-2">
      <div className="px-2 py-1 text-xs font-bold uppercase tracking-[0.16em] text-steel">
        {label}
      </div>
      <div className="mt-1 grid gap-2">
        {qualityNavItems[lang].map((item) => (
          <a
            key={item.href}
            href={asset(item.href)}
            onClick={onNavigate}
            className="block rounded-md bg-white px-3 py-3 text-sm font-semibold text-ink shadow-sm transition hover:text-signal"
          >
            <span className="block">{item.title}</span>
            <span className="mt-1 block text-xs font-normal leading-5 text-steel">
              {item.description}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
