"use client";

import { useState } from "react";
import type { SiteLocale } from "./locales";

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
    },
    {
      title: "Glass Fiber Thermal Insulation Paper",
      description:
        "Rolls, sheets and custom-cut glass fiber material for industrial thermal insulation.",
      href: "/products/glass-fiber-thermal-insulation-paper/"
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
    },
    {
      title: "玻璃纤维隔热纸",
      description: "面向工业隔热应用，可沟通卷材、片材和定制裁切形式。",
      href: "/zh/products/glass-fiber-thermal-insulation-paper/"
    }
  ],
  vi: [
    {
      title: "Tấm ngăn sợi thủy tinh AGM",
      description:
        "Dạng cuộn và tấm cho các ứng dụng ắc quy axit-chì VRLA.",
      href: "/vi/products/agm-separator/"
    },
    {
      title: "Tấm ngăn AGM dạng cuộn",
      description: "Cuộn AGM cho dây chuyền sản xuất, xẻ cuộn và cắt tại nhà máy.",
      href: "/vi/products/agm-separator-rolls/"
    },
    {
      title: "Tấm ngăn AGM dạng tấm",
      description: "Tấm cắt sẵn cho lắp ráp ắc quy VRLA và đánh giá mẫu.",
      href: "/vi/products/agm-separator-sheets/"
    },
    {
      title: "Giấy cách nhiệt sợi thủy tinh",
      description: "Dạng cuộn, tấm và cắt theo yêu cầu cho cách nhiệt công nghiệp.",
      href: "/vi/products/glass-fiber-thermal-insulation-paper/"
    }
  ],
  ko: [
    {
      title: "VRLA 배터리용 AGM 분리막",
      description: "VRLA 납축전지용 롤 및 시트 형태의 AGM 분리막.",
      href: "/ko/products/agm-separator/"
    },
    {
      title: "AGM 분리막 롤",
      description: "배터리 생산 라인, 슬리팅 및 사내 절단용 롤 공급.",
      href: "/ko/products/agm-separator-rolls/"
    },
    {
      title: "AGM 분리막 시트",
      description: "VRLA 배터리 조립 및 샘플 검토용 사전 절단 시트.",
      href: "/ko/products/agm-separator-sheets/"
    },
    {
      title: "유리섬유 단열지",
      description: "산업용 단열을 위한 롤, 시트 및 맞춤 재단 소재.",
      href: "/ko/products/glass-fiber-thermal-insulation-paper/"
    }
  ],
  ja: [
    {
      title: "VRLAバッテリー用AGMセパレーター",
      description: "VRLA鉛蓄電池向けのロール・シート形状に対応します。",
      href: "/ja/products/agm-separator/"
    },
    {
      title: "AGMセパレーター ロール",
      description: "電池生産ライン、スリット、社内裁断向けのロール供給。",
      href: "/ja/products/agm-separator-rolls/"
    },
    {
      title: "AGMセパレーター シート",
      description: "VRLA電池組立・サンプル確認向けのカットシート。",
      href: "/ja/products/agm-separator-sheets/"
    },
    {
      title: "ガラス繊維断熱紙",
      description: "産業用断熱向けのロール、シート、指定寸法カットに対応。",
      href: "/ja/products/glass-fiber-thermal-insulation-paper/"
    }
  ],
  es: [
    {
      title: "Separador AGM para baterías VRLA",
      description:
        "Separadores AGM en rollos y láminas para baterías de plomo-ácido VRLA.",
      href: "/es/products/agm-separator/"
    },
    {
      title: "Rollos de separador AGM",
      description: "Rollos para líneas de baterías, corte longitudinal y conversión interna.",
      href: "/es/products/agm-separator-rolls/"
    },
    {
      title: "Láminas de separador AGM",
      description: "Láminas precortadas para montaje VRLA y evaluación de muestras.",
      href: "/es/products/agm-separator-sheets/"
    },
    {
      title: "Papel aislante térmico de fibra de vidrio",
      description: "Rollos, láminas y cortes a medida para aislamiento térmico industrial.",
      href: "/es/products/glass-fiber-thermal-insulation-paper/"
    }
  ],
  pt: [
    {
      title: "Separador AGM para baterias VRLA",
      description:
        "Separadores AGM em rolos e folhas para baterias chumbo-ácido VRLA.",
      href: "/pt/products/agm-separator/"
    },
    {
      title: "Rolos de separador AGM",
      description: "Rolos para linhas de baterias, corte longitudinal e conversão interna.",
      href: "/pt/products/agm-separator-rolls/"
    },
    {
      title: "Folhas de separador AGM",
      description: "Folhas pré-cortadas para montagem VRLA e avaliação de amostras.",
      href: "/pt/products/agm-separator-sheets/"
    },
    {
      title: "Papel de isolamento térmico de fibra de vidro",
      description: "Rolos, folhas e cortes sob medida para isolamento térmico industrial.",
      href: "/pt/products/glass-fiber-thermal-insulation-paper/"
    }
  ],
  ru: [
    {
      title: "AGM-сепаратор для аккумуляторов VRLA",
      description:
        "AGM-сепараторы в рулонах и листах для свинцово-кислотных аккумуляторов VRLA.",
      href: "/ru/products/agm-separator/"
    },
    {
      title: "Рулоны AGM-сепаратора",
      description: "Рулоны для линий сборки аккумуляторов, продольной и внутренней резки.",
      href: "/ru/products/agm-separator-rolls/"
    },
    {
      title: "Листы AGM-сепаратора",
      description: "Нарезанные листы для сборки VRLA и оценки образцов.",
      href: "/ru/products/agm-separator-sheets/"
    },
    {
      title: "Теплоизоляционная бумага из стекловолокна",
      description: "Рулоны, листы и резка по размерам для промышленной теплоизоляции.",
      href: "/ru/products/glass-fiber-thermal-insulation-paper/"
    }
  ],
  ar: [
    { title: "فاصل AGM لبطاريات VRLA", description: "لفائف وألواح لتطبيقات بطاريات الرصاص الحمضية VRLA.", href: "/ar/products/agm-separator/" },
    { title: "لفائف فاصل AGM", description: "توريد لفائف لخطوط البطاريات والقص والتحويل الداخلي.", href: "/ar/products/agm-separator-rolls/" },
    { title: "ألواح فاصل AGM", description: "ألواح مقصوصة لتجميع بطاريات VRLA وتقييم العينات.", href: "/ar/products/agm-separator-sheets/" },
    { title: "ورق عزل حراري من الألياف الزجاجية", description: "لفائف وألواح وقطع مخصصة للعزل الحراري الصناعي.", href: "/ar/products/glass-fiber-thermal-insulation-paper/" }
  ]
} as const;

const productNavEyebrow = {
  en: "Product page",
  zh: "产品页面",
  vi: "Sản phẩm",
  ko: "제품",
  ja: "製品",
  es: "Producto",
  pt: "Produto",
  ru: "Продукция"
  ,
  ar: "المنتجات"
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function productPagePath(lang: SiteLocale) {
  return asset(productNavItems[lang][0].href);
}

export function ProductNavDropdown({
  lang,
  label
}: {
  lang: SiteLocale;
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
