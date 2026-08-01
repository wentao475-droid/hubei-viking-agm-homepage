"use client";

import { useState } from "react";
import type { SiteLocale } from "./locales";

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
  ],
  vi: [
    {
      title: "Tổng quan ứng dụng",
      description:
        "Các ứng dụng ắc quy axit-chì chính sử dụng vật liệu tấm ngăn AGM.",
      href: "/vi/#applications"
    },
    {
      title: "Tấm ngăn AGM cho ắc quy VRLA",
      description: "Trao đổi về tấm ngăn cho ắc quy axit-chì VRLA kín khí.",
      href: "/vi/applications/agm-separator-for-vrla-battery/"
    },
    {
      title: "Tấm ngăn AGM cho ắc quy UPS",
      description: "Trao đổi về thông số cho ắc quy UPS và nguồn điện dự phòng.",
      href: "/vi/applications/agm-separator-for-ups-battery/"
    },
    {
      title: "Tấm ngăn AGM cho ắc quy xe máy",
      description:
        "Trao đổi về kích thước và dạng tấm ngăn cho ắc quy khởi động xe máy.",
      href: "/vi/applications/agm-separator-for-motorcycle-battery/"
    },
    {
      title: "Tấm ngăn AGM cho ắc quy lưu trữ năng lượng",
      description: "Trao đổi về tấm ngăn cho hệ thống lưu trữ và nguồn dự phòng.",
      href: "/vi/applications/agm-separator-for-energy-storage-battery/"
    }
  ],
  ko: [
    {
      title: "적용 분야 개요",
      description: "AGM 분리막이 사용되는 주요 납축전지 적용 분야입니다.",
      href: "/ko/#applications"
    },
    {
      title: "VRLA 배터리용 AGM 분리막",
      description: "밀폐형 VRLA 납축전지용 분리막 사양을 검토합니다.",
      href: "/ko/applications/agm-separator-for-vrla-battery/"
    },
    {
      title: "UPS 배터리용 AGM 분리막",
      description: "UPS 및 대기전원용 VRLA 배터리 사양을 검토합니다.",
      href: "/ko/applications/agm-separator-for-ups-battery/"
    },
    {
      title: "오토바이 배터리용 AGM 분리막",
      description: "소형 시동 배터리용 규격, 롤 및 시트 형태를 검토합니다.",
      href: "/ko/applications/agm-separator-for-motorcycle-battery/"
    },
    {
      title: "에너지 저장 배터리용 AGM 분리막",
      description: "납축전지 에너지 저장 및 백업 전원용 분리막을 검토합니다.",
      href: "/ko/applications/agm-separator-for-energy-storage-battery/"
    }
  ],
  ja: [
    {
      title: "用途概要",
      description: "AGMセパレーターが使用される主な鉛蓄電池用途です。",
      href: "/ja/#applications"
    },
    {
      title: "VRLAバッテリー用AGMセパレーター",
      description: "密閉形VRLA鉛蓄電池向けの仕様を確認します。",
      href: "/ja/applications/agm-separator-for-vrla-battery/"
    },
    {
      title: "UPSバッテリー用AGMセパレーター",
      description: "UPS・待機電源用VRLAバッテリー向けの仕様を確認します。",
      href: "/ja/applications/agm-separator-for-ups-battery/"
    },
    {
      title: "二輪車用バッテリー向けAGMセパレーター",
      description: "小型始動用バッテリーの寸法、ロール・シート形状を確認します。",
      href: "/ja/applications/agm-separator-for-motorcycle-battery/"
    },
    {
      title: "蓄電用バッテリー向けAGMセパレーター",
      description: "鉛蓄電池の蓄電・バックアップ用途向けの仕様を確認します。",
      href: "/ja/applications/agm-separator-for-energy-storage-battery/"
    }
  ],
  es: [
    {
      title: "Resumen de aplicaciones",
      description: "Principales aplicaciones de baterías de plomo-ácido con separador AGM.",
      href: "/es/#applications"
    },
    {
      title: "Separador AGM para baterías VRLA",
      description: "Revisión de separadores para baterías VRLA selladas de plomo-ácido.",
      href: "/es/applications/agm-separator-for-vrla-battery/"
    },
    {
      title: "Separador AGM para baterías UPS",
      description: "Revisión de especificaciones para baterías UPS y de respaldo.",
      href: "/es/applications/agm-separator-for-ups-battery/"
    },
    {
      title: "Separador AGM para baterías de motocicleta",
      description: "Revisión de medidas y formatos para baterías compactas de arranque.",
      href: "/es/applications/agm-separator-for-motorcycle-battery/"
    },
    {
      title: "Separador AGM para almacenamiento de energía",
      description: "Revisión para baterías de almacenamiento y energía de respaldo.",
      href: "/es/applications/agm-separator-for-energy-storage-battery/"
    }
  ],
  pt: [
    {
      title: "Visão geral das aplicações",
      description: "Principais aplicações de baterias chumbo-ácido com separador AGM.",
      href: "/pt/#applications"
    },
    {
      title: "Separador AGM para baterias VRLA",
      description: "Análise de separadores para baterias VRLA seladas de chumbo-ácido.",
      href: "/pt/applications/agm-separator-for-vrla-battery/"
    },
    {
      title: "Separador AGM para baterias UPS",
      description: "Análise de especificações para baterias UPS e de reserva.",
      href: "/pt/applications/agm-separator-for-ups-battery/"
    },
    {
      title: "Separador AGM para baterias de motocicletas",
      description: "Análise de medidas e formatos para baterias compactas de partida.",
      href: "/pt/applications/agm-separator-for-motorcycle-battery/"
    },
    {
      title: "Separador AGM para armazenamento de energia",
      description: "Análise para baterias de armazenamento e energia de reserva.",
      href: "/pt/applications/agm-separator-for-energy-storage-battery/"
    }
  ],
  ru: [
    {
      title: "Обзор применений",
      description: "Основные области применения AGM-сепараторов в свинцово-кислотных аккумуляторах.",
      href: "/ru/#applications"
    },
    {
      title: "AGM-сепаратор для аккумуляторов VRLA",
      description: "Согласование сепаратора для герметичных свинцово-кислотных аккумуляторов VRLA.",
      href: "/ru/applications/agm-separator-for-vrla-battery/"
    },
    {
      title: "AGM-сепаратор для аккумуляторов ИБП",
      description: "Согласование характеристик для аккумуляторов ИБП и резервного питания.",
      href: "/ru/applications/agm-separator-for-ups-battery/"
    },
    {
      title: "AGM-сепаратор для мотоциклетных аккумуляторов",
      description: "Согласование размеров и форматов для компактных стартерных аккумуляторов.",
      href: "/ru/applications/agm-separator-for-motorcycle-battery/"
    },
    {
      title: "AGM-сепаратор для накопителей энергии",
      description: "Согласование для систем хранения энергии и резервного питания.",
      href: "/ru/applications/agm-separator-for-energy-storage-battery/"
    }
  ]
} as const;

const applicationsNavEyebrow = {
  en: "Application",
  zh: "应用",
  vi: "Ứng dụng",
  ko: "적용 분야",
  ja: "用途",
  es: "Aplicación",
  pt: "Aplicação",
  ru: "Применение"
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function ApplicationsNavDropdown({
  lang,
  label
}: {
  lang: SiteLocale;
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
