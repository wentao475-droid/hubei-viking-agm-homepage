"use client";

import { useState } from "react";
import type { Lang } from "./VikingHome";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const resourcesNavItems = {
  en: [
    {
      title: "What Is AGM Separator?",
      description:
        "A practical buyer guide for VRLA lead-acid battery applications.",
      href: "/blog/what-is-agm-separator/"
    },
    {
      title: "Key Technical Parameters",
      description:
        "Thickness, basis weight, acid absorption, resistance, porosity and strength.",
      href: "/blog/key-technical-parameters-of-agm-separator/"
    },
    {
      title: "How to Choose AGM Separator",
      description:
        "A practical buyer checklist for comparing separator requirements.",
      href: "/blog/how-to-choose-agm-separator/"
    }
  ],
  zh: [
    {
      title: "什么是 AGM 隔板？",
      description: "面向 VRLA 铅酸电池买家的实用入门说明。",
      href: "/zh/blog/what-is-agm-separator/"
    },
    {
      title: "AGM 隔板技术参数",
      description: "厚度、克重、吸酸性能、电阻、孔隙率和强度说明。",
      href: "/zh/blog/key-technical-parameters-of-agm-separator/"
    },
    {
      title: "如何选择 AGM 隔板",
      description: "面向买家的隔板需求沟通和供应商比较清单。",
      href: "/zh/blog/how-to-choose-agm-separator/"
    }
  ]
} as const;

const resourcesNavEyebrow = {
  en: "Resource",
  zh: "资料"
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function ResourcesNavDropdown({
  lang,
  label
}: {
  lang: Lang;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const items = resourcesNavItems[lang];

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
                {resourcesNavEyebrow[lang]}
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

export function ResourcesNavMobileGroup({
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
        {resourcesNavItems[lang].map((item) => (
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
