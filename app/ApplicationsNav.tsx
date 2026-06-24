"use client";

import { useState } from "react";
import type { Lang } from "./VikingHome";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const applicationsNavItems = {
  en: [
    {
      title: "Application Overview",
      description:
        "Main lead-acid battery segments served by AGM separator material.",
      href: "/#applications"
    },
    {
      title: "AGM Separator for VRLA Battery",
      description:
        "Application-focused separator discussion for VRLA lead-acid batteries.",
      href: "/applications/agm-separator-for-vrla-battery/"
    },
    {
      title: "UPS Battery Separator",
      description:
        "AGM separator discussion for UPS and standby VRLA batteries.",
      href: "/applications/agm-separator-for-ups-battery/"
    },
    {
      title: "Motorcycle Battery Separator",
      description:
        "Separator format discussion for compact motorcycle starting batteries.",
      href: "/applications/agm-separator-for-motorcycle-battery/"
    },
    {
      title: "Energy Storage Battery Separator",
      description:
        "AGM separator discussion for lead-acid storage and backup power batteries.",
      href: "/applications/agm-separator-for-energy-storage-battery/"
    }
  ],
  zh: [
    {
      title: "应用概览",
      description: "AGM 隔板材料服务的主要铅酸电池应用领域。",
      href: "/zh/#applications"
    },
    {
      title: "VRLA 电池 AGM 隔板应用",
      description: "面向 VRLA 铅酸电池应用的隔板选型说明。",
      href: "/zh/applications/agm-separator-for-vrla-battery/"
    },
    {
      title: "UPS 电池 AGM 隔板",
      description: "面向 UPS 和备用电源 VRLA 电池的隔板沟通。",
      href: "/zh/applications/agm-separator-for-ups-battery/"
    },
    {
      title: "摩托车电池 AGM 隔板",
      description: "面向紧凑型摩托车启动电池的隔板形式沟通。",
      href: "/zh/applications/agm-separator-for-motorcycle-battery/"
    },
    {
      title: "储能电池 AGM 隔板",
      description: "面向铅酸储能和后备电源电池的隔板沟通。",
      href: "/zh/applications/agm-separator-for-energy-storage-battery/"
    }
  ]
} as const;

const applicationsNavEyebrow = {
  en: "Application",
  zh: "应用"
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function ApplicationsNavDropdown({
  lang,
  label
}: {
  lang: Lang;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const items = applicationsNavItems[lang];

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
                {applicationsNavEyebrow[lang]}
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

export function ApplicationsNavMobileGroup({
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
        {applicationsNavItems[lang].map((item) => (
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
