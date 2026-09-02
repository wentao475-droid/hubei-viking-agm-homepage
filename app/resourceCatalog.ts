import type { Lang } from "./VikingHome";
import type { SiteLocale } from "./locales";
import {
  articleDefinitions,
  secondaryResourceData,
  secondaryResourceLocales
} from "../content/secondary-resources.mjs";

export type ResourceLang = SiteLocale;

export type ResourceCategory =
  | "buyerGuides"
  | "manufacturingQuality"
  | "industryApplications";

type LocalizedText = Record<Lang, string> & Partial<Record<SiteLocale, string>>;

type LocalizedHref = Record<Lang, string> & Partial<Record<SiteLocale, string>>;

export type ResourceAction = {
  id: "sample" | "capabilityPdf";
  title: LocalizedText;
  description: LocalizedText;
  href: LocalizedHref;
  external?: boolean;
};

export type ResourceArticle = {
  id: string;
  category: ResourceCategory;
  publishedAt: string;
  title: LocalizedText;
  description: LocalizedText;
  href: LocalizedHref;
};

export const resourceCategoryOrder: ResourceCategory[] = [
  "buyerGuides",
  "manufacturingQuality",
  "industryApplications"
];

export const resourceCategoryCopy: Record<
  ResourceCategory,
  {
    title: LocalizedText;
    description: LocalizedText;
  }
> = {
  buyerGuides: {
    title: {
      en: "Buyer Guides",
      zh: "采购指南"
    },
    description: {
      en: "AGM separator fundamentals, technical parameters and specification selection.",
      zh: "了解 AGM 隔板基础、技术参数与规格选择方法。"
    }
  },
  manufacturingQuality: {
    title: {
      en: "Manufacturing & Quality",
      zh: "生产与质量"
    },
    description: {
      en: "Production, inspection, batch consistency and delivery coordination.",
      zh: "了解生产、检测、批次一致性和交付协同。"
    }
  },
  industryApplications: {
    title: {
      en: "Industry & Applications",
      zh: "行业与应用"
    },
    description: {
      en: "Practical supply and application decisions for battery projects.",
      zh: "面向电池项目的行业观察与应用决策参考。"
    }
  }
};

export const resourceActions: ResourceAction[] = [
  {
    id: "sample",
    title: {
      en: "Request a Sample & Specification Match",
      zh: "申请样品与规格匹配"
    },
    description: {
      en: "Share your battery application, dimensions and roll or sheet requirements.",
      zh: "提供电池应用、尺寸及卷材或片材需求，开始规格评审。"
    },
    href: {
      en: "/request-agm-separator-sample/",
      zh: "/zh/request-agm-separator-sample/"
    }
  },
  {
    id: "capabilityPdf",
    title: {
      en: "Technical Capability PDF",
      zh: "技术能力 PDF"
    },
    description: {
      en: "Download a bilingual overview of product forms, quality checks and packing.",
      zh: "下载包含产品形式、质量检查和包装说明的中英文资料。"
    },
    href: {
      en: "/downloads/viking-agm-technical-capability.pdf",
      zh: "/downloads/viking-agm-technical-capability.pdf"
    }
  }
];

export const resourceArticles: ResourceArticle[] = [
  {
    id: "what-is-agm-separator",
    category: "buyerGuides",
    publishedAt: "2026-06-11",
    title: {
      en: "What Is an AGM Separator?",
      zh: "什么是 AGM 隔板？"
    },
    description: {
      en: "A practical introduction for VRLA lead-acid battery buyers.",
      zh: "面向 VRLA 铅酸电池买家的实用入门说明。"
    },
    href: {
      en: "/blog/what-is-agm-separator/",
      zh: "/zh/blog/what-is-agm-separator/"
    }
  },
  {
    id: "key-technical-parameters",
    category: "buyerGuides",
    publishedAt: "2026-06-13",
    title: {
      en: "Key AGM Separator Parameters",
      zh: "AGM 隔板技术参数"
    },
    description: {
      en: "Thickness, basis weight, acid absorption, resistance, porosity and strength.",
      zh: "厚度、克重、吸酸性能、电阻、孔隙率和强度说明。"
    },
    href: {
      en: "/blog/key-technical-parameters-of-agm-separator/",
      zh: "/zh/blog/key-technical-parameters-of-agm-separator/"
    }
  },
  {
    id: "how-to-choose-agm-separator",
    category: "buyerGuides",
    publishedAt: "2026-06-13",
    title: {
      en: "How to Choose an AGM Separator",
      zh: "如何选择 AGM 隔板"
    },
    description: {
      en: "A buyer checklist for discussing separator requirements and suppliers.",
      zh: "面向买家的隔板需求沟通和供应商比较清单。"
    },
    href: {
      en: "/blog/how-to-choose-agm-separator/",
      zh: "/zh/blog/how-to-choose-agm-separator/"
    }
  },
  {
    id: "agm-glass-fiber-vs-pvc-separator",
    category: "buyerGuides",
    publishedAt: "2026-07-26",
    title: {
      en: "AGM Glass Fiber vs PVC Separators",
      zh: "AGM 玻璃纤维隔板与 PVC 隔板"
    },
    description: {
      en: "Compare battery systems, electrolyte conditions, assembly requirements and replacement boundaries.",
      zh: "对比电池体系、电解液状态、装配要求和材料替换边界。"
    },
    href: {
      en: "/blog/agm-glass-fiber-vs-pvc-battery-separator/",
      zh: "/zh/blog/agm-glass-fiber-vs-pvc-battery-separator/"
    }
  },
  {
    id: "manufacturing-quality-delivery",
    category: "manufacturingQuality",
    publishedAt: "2026-07-07",
    title: {
      en: "AGM Separator Manufacturing & Delivery",
      zh: "AGM 隔板生产与交付"
    },
    description: {
      en: "Production, quality control and reliable delivery at Hubei Viking.",
      zh: "湖北维京的生产、检测与稳定交付说明。"
    },
    href: {
      en: "/blog/agm-separator-manufacturing-quality-delivery/",
      zh: "/zh/blog/agm-separator-manufacturing-quality-delivery/"
    }
  },
  {
    id: "performance-consistency",
    category: "manufacturingQuality",
    publishedAt: "2026-07-10",
    title: {
      en: "Why AGM Separator Consistency Matters",
      zh: "AGM 隔板为什么影响电池稳定性？"
    },
    description: {
      en: "Conductivity support, compression fit and batch consistency for VRLA projects.",
      zh: "从导通相关表现、受压贴合和批次一致性进行判断。"
    },
    href: {
      en: "/blog/agm-separator-performance-consistency/",
      zh: "/zh/blog/agm-separator-performance-consistency/"
    }
  },
  {
    id: "export-supply-readiness",
    category: "industryApplications",
    publishedAt: "2026-07-11",
    title: {
      en: "AGM Separator Supply for Export Projects",
      zh: "出口项目的 AGM 隔板配套"
    },
    description: {
      en: "Export data and practical supply-readiness questions for battery projects.",
      zh: "从出口数据看批次一致性、供货协同和交付准备。"
    },
    href: {
      en: "/blog/agm-separator-export-supply-readiness/",
      zh: "/zh/blog/agm-separator-export-supply-readiness/"
    }
  },
  {
    id: "ups-vrla-selection",
    category: "industryApplications",
    publishedAt: "2026-07-23",
    title: {
      en: "Why UPS Projects Still Use VRLA",
      zh: "为什么 UPS 项目仍在使用 VRLA？"
    },
    description: {
      en: "System compatibility, operating requirements and AGM separator selection.",
      zh: "从系统匹配、运维条件和 AGM 隔板选型进行判断。"
    },
    href: {
      en: "/blog/why-ups-projects-still-use-vrla-batteries/",
      zh: "/zh/blog/why-ups-projects-still-use-vrla-batteries/"
    }
  },
  {
    id: "data-center-backup-power",
    category: "industryApplications",
    publishedAt: "2026-08-07",
    title: {
      en: "AGM Separators for Data Center Backup Power",
      zh: "数据中心备电与 AGM 隔板配套"
    },
    description: {
      en: "AGM separator requirements for UPS, data center and telecom backup power projects.",
      zh: "从吸液、压缩贴合、氧复合和批次一致性理解备电项目的隔板要求。"
    },
    href: {
      en: "/blog/agm-separator-for-data-center-backup-power/",
      zh: "/zh/blog/agm-separator-for-data-center-backup-power/"
    }
  },
  {
    id: "early-lead-acid-manufacturing-history",
    category: "manufacturingQuality",
    publishedAt: "2026-08-11",
    title: {
      en: "How China’s Earliest Lead-Acid Batteries Were Made",
      zh: "中国早期铅酸蓄电池是怎样制造的？"
    },
    description: {
      en: "From hand-cast grids and early separators to industrial production and modern AGM batch control.",
      zh: "从手工铸造板栅和早期隔板材料，了解专业化生产与现代 AGM 批次控制的演进。"
    },
    href: {
      en: "/blog/how-chinas-earliest-lead-acid-batteries-were-made/",
      zh: "/zh/blog/how-chinas-earliest-lead-acid-batteries-were-made/"
    }
  },
  {
    id: "agm-separator-pressure-retention",
    category: "manufacturingQuality",
    publishedAt: "2026-08-12",
    title: {
      en: "AGM Separator Pressure Retention After Filling and Cycling",
      zh: "AGM 隔板填酸与循环后的压力保持"
    },
    description: {
      en: "How to compare dry thickness, wet shrinkage, recovery and residual force with reproducible test conditions.",
      zh: "从干态厚度、湿态收缩、回弹和残余压力，建立可复现的四阶段打样记录。"
    },
    href: {
      en: "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/",
      zh: "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"
    }
  },
  {
    id: "agm-separator-batch-process-control",
    category: "manufacturingQuality",
    publishedAt: "2026-08-12",
    title: {
      en: "AGM Separator Batch Consistency & Process Control",
      zh: "AGM 隔板批次一致性与过程控制"
    },
    description: {
      en: "How sampling positions, dispersion, trends and traceability support volume-production evaluation.",
      zh: "从取样位置、离散程度、趋势和追溯审核判断 AGM 隔板批量稳定性。"
    },
    href: {
      en: "/blog/agm-separator-batch-consistency-and-process-control/",
      zh: "/zh/blog/agm-separator-batch-consistency-and-process-control/"
    }
  },
  {
    id: "agm-separator-supply-chain",
    category: "manufacturingQuality",
    publishedAt: "2026-09-01",
    title: {
      en: "From Glass Block to Separator: AGM Supply Chain Guide",
      zh: "从玻璃料块到成品隔板：AGM 隔板供应链指南"
    },
    description: {
      en: "A practical look at glass feedstock, ultrafine fiber, wet-laid forming, conversion, inspection and delivery records.",
      zh: "从玻璃原料、超细玻璃纤维、湿法成型到后道加工、检测与出货记录，理解隔板交付背后的链路。"
    },
    href: {
      en: "/blog/agm-separator-supply-chain-from-glass-block-to-finished-roll/",
      zh: "/zh/blog/agm-separator-supply-chain-from-glass-block-to-finished-roll/"
    }
  }
];

const articleKindById: Record<string, string> = {
  "what-is-agm-separator": "whatIsAgmSeparator",
  "key-technical-parameters": "keyTechnicalParameters",
  "how-to-choose-agm-separator": "howToChooseAgmSeparator",
  "agm-glass-fiber-vs-pvc-separator": "agmGlassFiberVsPvcSeparator",
  "manufacturing-quality-delivery": "agmSeparatorManufacturingQualityDelivery",
  "performance-consistency": "agmSeparatorPerformanceConsistency",
  "export-supply-readiness": "agmSeparatorExportSupplyReadiness",
  "ups-vrla-selection": "upsVrlaTechnologySelection",
  "data-center-backup-power": "dataCenterBackupPowerAgmSeparator",
  "early-lead-acid-manufacturing-history": "earlyChinaLeadAcidBatteryManufacturing",
  "agm-separator-pressure-retention": "agmSeparatorPressureRetention",
  "agm-separator-batch-process-control": "agmSeparatorBatchProcessControl"
};

for (const locale of secondaryResourceLocales as SiteLocale[]) {
  const localeData = secondaryResourceData[locale];

  for (const category of resourceCategoryOrder) {
    resourceCategoryCopy[category].title[locale] = localeData.categories[category][0];
    resourceCategoryCopy[category].description[locale] = localeData.categories[category][1];
  }

  for (const action of resourceActions) {
    action.title[locale] = localeData.actions[action.id][0];
    action.description[locale] = localeData.actions[action.id][1];
    action.href[locale] =
      action.id === "sample"
        ? `/${locale}/request-agm-separator-sample/`
        : "/downloads/viking-agm-technical-capability.pdf";
  }

  for (const article of resourceArticles) {
    const kind = articleKindById[article.id];
    if (!kind) continue;
    const slug = articleDefinitions[kind][0];
    article.title[locale] = localeData.topics[kind].title;
    article.description[locale] = localeData.topics[kind].summary;
    article.href[locale] = `/${locale}/blog/${slug}/`;
  }
}

export function localizeText(value: LocalizedText, lang: ResourceLang) {
  return value[lang] ?? value.en;
}

export function localizeHref(value: LocalizedHref, lang: ResourceLang) {
  return value[lang] ?? value.en;
}

export function getResourcesPath(lang: ResourceLang) {
  return lang === "en" ? "/resources/" : `/${lang}/resources/`;
}

export function getResourceCategoryPath(
  category: ResourceCategory,
  lang: ResourceLang
) {
  return `${getResourcesPath(lang)}#${category}`;
}

export function getArticlesByCategory(
  category: ResourceCategory,
  lang?: ResourceLang
) {
  return resourceArticles
    .filter(
      (article) => article.category === category && (!lang || Boolean(article.href[lang]))
    )
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}
