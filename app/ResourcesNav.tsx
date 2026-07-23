"use client";

import { useState } from "react";
import type { Lang } from "./VikingHome";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const resourcesNavItems = {
  en: [
    {
      title: "Request a Sample",
      description:
        "Share your battery application, dimensions and roll or sheet requirements.",
      href: "/request-agm-separator-sample/"
    },
    {
      title: "Technical Capability PDF",
      description:
        "Download a bilingual overview of product forms, quality checks and packing.",
      href: "/downloads/viking-agm-technical-capability.pdf"
    },
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
    },
    {
      title: "AGM Separator Manufacturing",
      description:
        "Production, quality control and reliable delivery at Hubei Viking.",
      href: "/blog/agm-separator-manufacturing-quality-delivery/"
    },
    {
      title: "Why AGM Separator Consistency Matters",
      description:
        "Conductivity support, compression fit and batch consistency for VRLA projects.",
      href: "/blog/agm-separator-performance-consistency/"
    },
    {
      title: "AGM Separator Supply for Export Projects",
      description:
        "May export data and practical supply-readiness questions for battery projects.",
      href: "/blog/agm-separator-export-supply-readiness/"
    },
    {
      title: "Why UPS Projects Still Use VRLA",
      description:
        "System compatibility, operating requirements and AGM separator selection.",
      href: "/blog/why-ups-projects-still-use-vrla-batteries/"
    }
  ],
  zh: [
    {
      title: "申请样品与规格匹配",
      description: "提供电池应用、尺寸及卷材或片材需求，开始规格评审。",
      href: "/zh/request-agm-separator-sample/"
    },
    {
      title: "技术能力 PDF",
      description: "下载包含产品形式、质量检查和包装说明的中英文资料。",
      href: "/downloads/viking-agm-technical-capability.pdf"
    },
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
    },
    {
      title: "AGM 隔板生产与交付",
      description: "湖北维京的生产、检测与稳定交付说明。",
      href: "/zh/blog/agm-separator-manufacturing-quality-delivery/"
    },
    {
      title: "AGM 隔板为什么影响电池稳定性？",
      description: "从导通相关表现、受压贴合和批次一致性进行判断。",
      href: "/zh/blog/agm-separator-performance-consistency/"
    },
    {
      title: "出口项目的 AGM 隔板配套",
      description: "从出口数据看批次一致性、供货协同和交付准备。",
      href: "/zh/blog/agm-separator-export-supply-readiness/"
    },
    {
      title: "为什么 UPS 项目仍在使用 VRLA？",
      description: "从系统匹配、运维条件和 AGM 隔板选型进行判断。",
      href: "/zh/blog/why-ups-projects-still-use-vrla-batteries/"
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
