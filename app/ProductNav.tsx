"use client";

import { useState } from "react";
import type { Lang } from "./VikingHome";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const productNavItems = {
  en: [
    {
      title: "AGM Separator for VRLA Batteries",
      description:
        "Roll and sheet formats for VRLA lead-acid battery applications.",
      href: "/products/agm-separator/"
    },
    {
      title: "AGM Separator Rolls",
      description:
        "Roll supply for battery production lines, slitting and in-house cutting.",
      href: "/products/agm-separator-rolls/"
    },
    {
      title: "AGM Separator Sheets",
      description:
        "Pre-cut sheet supply for VRLA battery assembly and sample review.",
      href: "/products/agm-separator-sheets/"
    }
  ],
  zh: [
    {
      title: "AGM 玻璃纤维隔板",
      description: "用于 VRLA 铅酸电池应用，可沟通卷材和片材形式。",
      href: "/zh/products/agm-separator/"
    },
    {
      title: "AGM 隔板卷材",
      description: "面向电池生产线、分切和厂内裁切需求的卷材供应。",
      href: "/zh/products/agm-separator-rolls/"
    },
    {
      title: "AGM 隔板片材",
      description: "用于 VRLA 电池装配和样品确认的预裁切片材供应。",
      href: "/zh/products/agm-separator-sheets/"
    }
  ]
} as const;

const productNavEyebrow = {
  en: "Product page",
  zh: "产品页面"
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function productPagePath(lang: Lang) {
  return asset(productNavItems[lang][0].href);
}

export function ProductNavDropdown({
  lang,
  label
}: {
  lang: Lang;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const items = productNavItems[lang];

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
        className={`absolute left-1/2 top-full z-50 w-96 max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-4 transition ${
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
                {productNavEyebrow[lang]}
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

export function ProductNavMobileGroup({
  lang,
  label,
  onNavigate
}: {
  lang: Lang;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="rounded-md border border-line bg-frost p-2">
      <div className="px-2 py-1 text-xs font-bold uppercase tracking-[0.16em] text-steel">
        {label}
      </div>
      <div className="mt-1 grid gap-2">
        {productNavItems[lang].map((item) => (
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
