import type { Metadata } from "next";
import { seoContent } from "./cms-content";
import { productFaqCopy } from "./seo-faq";
import type { Lang } from "./VikingHome";

export const SITE_URL = "https://www.vikingagm.com";
const PREVIEW_IMAGE = `${SITE_URL}/images/viking-finished-separator-roll-900.webp`;
const SHEETS_PREVIEW_IMAGE = `${SITE_URL}/images/sheets1-900.webp`;
const QUALITY_PREVIEW_IMAGE = `${SITE_URL}/images/agm-quality-control-1200.webp`;
const UPS_APPLICATION_IMAGE = `${SITE_URL}/images/applications/ups-vrla-battery-application-1200.webp`;
const MOTORCYCLE_APPLICATION_IMAGE = `${SITE_URL}/images/applications/motorcycle-vrla-battery-application-1200.webp`;
const ENERGY_STORAGE_APPLICATION_IMAGE = `${SITE_URL}/images/applications/energy-storage-lead-acid-battery-application-1200.webp`;
const HOME_VIDEO_URL = `${SITE_URL}/videos/viking-agm-promo-720p.mp4`;
const HOME_VIDEO_POSTER = `${SITE_URL}/images/viking-agm-promo-poster.webp`;

const homeSeo = {
  en: {
    path: "/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    alternateSiteName: "Hubei Viking AGM",
    title: "AGM Battery Separator Manufacturer | VRLA & Energy Storage | Viking AGM",
    description:
      "Hubei Viking Technology manufactures ISO9001 certified AGM glass fiber separators for VRLA, UPS, motorcycle, automotive and energy storage lead-acid batteries. Request a quote.",
    keywords: [
      "AGM glass fiber separator",
      "AGM battery separator manufacturer",
      "Absorbent Glass Mat separator",
      "VRLA battery separator",
      "lead acid battery separator",
      "Hubei Viking Technology"
    ],
    serviceName: "AGM glass fiber separator manufacturing",
    serviceDescription:
      "AGM separator rolls and sheets for lead-acid battery producers, supported by process control, quality inspection and custom specification discussion."
  },
  zh: {
    path: "/zh/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    alternateSiteName: "维京AGM",
    title: "铅酸电池隔板厂家 | AGM隔板生产厂家 | 湖北维京AGM",
    description:
      "湖北维京科技有限公司专注 AGM 玻璃纤维隔板研发、生产与销售，服务 VRLA、UPS、汽车、摩托车及储能铅酸电池应用。",
    keywords: [
      "AGM 玻璃纤维隔板",
      "AGM 隔板制造商",
      "铅酸电池隔板",
      "VRLA 电池隔板",
      "湖北维京科技",
      "超细玻璃纤维隔板"
    ],
    serviceName: "AGM 玻璃纤维隔板制造",
    serviceDescription:
      "面向铅酸电池生产企业提供 AGM 隔板卷材和片材，支持过程控制、质量检测和定制规格沟通。"
  }
} as const;

const agmSeparatorSeo = {
  en: {
    path: "/products/agm-separator/",
    alternatePath: "/zh/products/agm-separator/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Battery Separator for VRLA Lead-Acid Batteries | Viking AGM",
    description:
      "AGM glass fiber separators for VRLA lead-acid batteries, available in roll or sheet type. Send your thickness, width and battery application for quotation.",
    keywords: [
      "AGM separator",
      "AGM battery separator",
      "AGM glass fiber separator",
      "VRLA battery separator",
      "AGM separator manufacturer"
    ],
    productName: "AGM Separator for VRLA Lead-Acid Batteries",
    serviceDescription:
      "AGM glass fiber separators for VRLA lead-acid batteries, available in roll and sheet formats for customer specification discussion.",
    breadcrumbs: ["Home", "Products", "AGM Separator"]
  },
  zh: {
    path: "/zh/products/agm-separator/",
    alternatePath: "/products/agm-separator/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板制造商 | 湖北维京AGM",
    description:
      "湖北维京AGM提供用于VRLA铅酸电池的AGM玻璃纤维隔板，可按卷材或片材形式沟通。请提供厚度、宽度及电池应用以便报价。",
    keywords: [
      "AGM 隔板",
      "AGM 电池隔板",
      "AGM 玻璃纤维隔板",
      "VRLA 电池隔板",
      "AGM 隔板制造商"
    ],
    productName: "用于 VRLA 铅酸电池的 AGM 隔板",
    serviceDescription:
      "用于 VRLA 铅酸电池的 AGM 玻璃纤维隔板，可按卷材和片材形式与客户沟通规格。",
    breadcrumbs: ["首页", "产品", "AGM 隔板"]
  }
} as const;

const agmSeparatorRollsSeo = {
  en: {
    path: "/products/agm-separator-rolls/",
    alternatePath: "/zh/products/agm-separator-rolls/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Rolls for Battery Production Lines",
    description:
      "AGM separator rolls for VRLA battery production. Custom width, thickness and roll packing can be discussed based on customer requirements.",
    keywords: [
      "AGM separator rolls",
      "AGM separator roll supplier",
      "AGM battery separator rolls",
      "VRLA battery separator rolls",
      "custom AGM separator"
    ],
    productName: "AGM Separator Rolls",
    serviceDescription:
      "Roll-format AGM glass fiber separators for VRLA lead-acid battery production, with width, thickness, roll length, core and packing requirements confirmed according to buyer needs.",
    breadcrumbs: ["Home", "Products", "AGM Separator Rolls"]
  },
  zh: {
    path: "/zh/products/agm-separator-rolls/",
    alternatePath: "/products/agm-separator-rolls/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板卷材 | 湖北维京AGM",
    description:
      "湖北维京AGM提供用于VRLA电池生产的AGM隔板卷材，宽度、厚度和卷材包装方式可根据客户要求沟通确认。",
    keywords: [
      "AGM 隔板卷材",
      "AGM 电池隔板卷材",
      "AGM 玻璃纤维隔板卷材",
      "VRLA 电池隔板卷材",
      "AGM 隔板供应商"
    ],
    productName: "AGM 隔板卷材",
    serviceDescription:
      "用于 VRLA 铅酸电池生产的 AGM 玻璃纤维隔板卷材，宽度、厚度、卷长、芯管和包装要求可按客户需求沟通确认。",
    breadcrumbs: ["首页", "产品", "AGM 隔板卷材"]
  }
} as const;

const agmSeparatorSheetsSeo = {
  en: {
    path: "/products/agm-separator-sheets/",
    alternatePath: "/zh/products/agm-separator-sheets/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Sheets for VRLA Battery Assembly",
    description:
      "Pre-cut AGM separator sheets for VRLA lead-acid battery assembly. Sheet dimensions and thickness should be confirmed by battery design.",
    keywords: [
      "AGM separator sheets",
      "AGM battery separator sheets",
      "VRLA battery separator",
      "pre-cut AGM separator",
      "AGM glass fiber separator sheets"
    ],
    productName: "AGM Separator Sheets",
    serviceDescription:
      "Pre-cut AGM glass fiber separator sheets for VRLA lead-acid battery assembly, with sheet height, width, thickness and packing requirements confirmed according to customer battery design.",
    breadcrumbs: ["Home", "Products", "AGM Separator Sheets"]
  },
  zh: {
    path: "/zh/products/agm-separator-sheets/",
    alternatePath: "/products/agm-separator-sheets/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板片材 | 湖北维京AGM",
    description:
      "湖北维京AGM提供用于VRLA铅酸电池装配的预裁切AGM隔板片材，片材尺寸和厚度可根据电池设计沟通确认。",
    keywords: [
      "AGM 隔板片材",
      "AGM 电池隔板片材",
      "VRLA 电池隔板",
      "预裁切 AGM 隔板",
      "AGM 玻璃纤维隔板片材"
    ],
    productName: "AGM 隔板片材",
    serviceDescription:
      "用于 VRLA 铅酸电池装配的预裁切 AGM 玻璃纤维隔板片材，片材高度、宽度、厚度和包装要求可按客户电池设计沟通确认。",
    breadcrumbs: ["首页", "产品", "AGM 隔板片材"]
  }
} as const;

const agmSeparatorTestingSeo = {
  en: {
    path: "/quality-control/agm-separator-testing/",
    alternatePath: "/zh/quality-control/agm-separator-testing/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Testing and Quality Control",
    description:
      "Understand key AGM separator quality checks, including thickness, basis weight, acid absorption, electrical resistance, porosity and appearance.",
    keywords: [
      "AGM separator testing",
      "AGM separator quality control",
      "battery separator testing",
      "AGM separator inspection",
      "VRLA battery separator quality"
    ],
    pageName: "AGM Separator Testing and Quality Control",
    serviceDescription:
      "AGM separator quality-control discussion covering thickness, basis weight, acid absorption, electrical resistance, porosity, appearance and customer-specific test requirements.",
    breadcrumbs: ["Home", "Quality Control", "AGM Separator Testing"]
  },
  zh: {
    path: "/zh/quality-control/agm-separator-testing/",
    alternatePath: "/quality-control/agm-separator-testing/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板检测与质量控制 | 湖北维京AGM",
    description:
      "了解AGM隔板常见质量检查项目，包括厚度、克重、吸酸性能、电阻、孔隙率和外观等，具体要求可按客户电池设计确认。",
    keywords: [
      "AGM 隔板检测",
      "AGM 隔板质量控制",
      "电池隔板检测",
      "AGM 隔板检验",
      "VRLA 电池隔板质量"
    ],
    pageName: "AGM 隔板检测与质量控制",
    serviceDescription:
      "围绕 AGM 隔板厚度、克重、吸酸性能、电阻、孔隙率、外观和客户特定检测要求开展质量控制沟通。",
    breadcrumbs: ["首页", "质量控制", "AGM 隔板检测"]
  }
} as const;

const agmSeparatorVrlaApplicationSeo = {
  en: {
    path: "/applications/agm-separator-for-vrla-battery/",
    alternatePath: "/zh/applications/agm-separator-for-vrla-battery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator for VRLA Lead-Acid Battery Applications",
    description:
      "AGM separators for VRLA lead-acid batteries used in UPS, telecom, motorcycle, e-bike, energy storage and automotive starting batteries.",
    keywords: [
      "battery separator for VRLA batteries",
      "lead-acid battery separator",
      "VRLA battery separator",
      "AGM separator applications",
      "AGM battery separator"
    ],
    pageName: "AGM Separator for VRLA Battery Applications",
    serviceDescription:
      "Application-focused AGM glass fiber separator discussion for VRLA lead-acid batteries, including UPS, telecom, motorcycle, e-bike, energy storage and automotive starting battery applications.",
    breadcrumbs: ["Home", "Applications", "AGM Separator for VRLA Battery"]
  },
  zh: {
    path: "/zh/applications/agm-separator-for-vrla-battery/",
    alternatePath: "/applications/agm-separator-for-vrla-battery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "VRLA 铅酸电池应用 AGM 隔板 | 湖北维京AGM",
    description:
      "湖北维京AGM提供用于VRLA铅酸电池应用的AGM玻璃纤维隔板，服务UPS、通信、摩托车、电动车、储能和汽车启动电池等应用。",
    keywords: [
      "VRLA 电池隔板",
      "铅酸电池隔板",
      "AGM 隔板应用",
      "AGM 玻璃纤维隔板",
      "湖北维京AGM"
    ],
    pageName: "用于 VRLA 电池应用的 AGM 隔板",
    serviceDescription:
      "面向 VRLA 铅酸电池应用的 AGM 玻璃纤维隔板沟通，覆盖 UPS、通信、摩托车、电动车、储能和汽车启动电池等应用场景。",
    breadcrumbs: ["首页", "应用", "VRLA 电池 AGM 隔板应用"]
  }
} as const;

const agmSeparatorUpsApplicationSeo = {
  en: {
    path: "/applications/agm-separator-for-ups-battery/",
    alternatePath: "/zh/applications/agm-separator-for-ups-battery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator for UPS VRLA Batteries",
    description:
      "AGM separator discussion for UPS, standby power and backup VRLA lead-acid battery production. Send your contact for roll, sheet or specification support.",
    keywords: [
      "AGM separator for UPS battery",
      "UPS VRLA battery separator",
      "standby battery separator",
      "backup power battery separator",
      "AGM battery separator"
    ],
    pageName: "AGM Separator for UPS Battery Applications",
    serviceDescription:
      "Application-focused AGM glass fiber separator discussion for UPS, standby power and backup VRLA lead-acid battery manufacturing.",
    serviceType: "AGM separator for UPS VRLA battery applications",
    image: UPS_APPLICATION_IMAGE,
    breadcrumbs: ["Home", "Applications", "AGM Separator for UPS Battery"]
  },
  zh: {
    path: "/zh/applications/agm-separator-for-ups-battery/",
    alternatePath: "/applications/agm-separator-for-ups-battery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "UPS VRLA 电池 AGM 隔板 | 湖北维京AGM",
    description:
      "面向 UPS、备用电源和后备电源 VRLA 铅酸电池生产，沟通 AGM 隔板卷材、片材和规格要求。",
    keywords: [
      "UPS 电池 AGM 隔板",
      "UPS VRLA 电池隔板",
      "备用电源电池隔板",
      "后备电源电池隔板",
      "AGM 电池隔板"
    ],
    pageName: "用于 UPS 电池应用的 AGM 隔板",
    serviceDescription:
      "面向 UPS、备用电源和后备电源 VRLA 铅酸电池制造的 AGM 玻璃纤维隔板应用沟通。",
    serviceType: "UPS VRLA 电池应用 AGM 隔板",
    image: UPS_APPLICATION_IMAGE,
    breadcrumbs: ["首页", "应用", "UPS 电池 AGM 隔板"]
  }
} as const;

const agmSeparatorMotorcycleApplicationSeo = {
  en: {
    path: "/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/zh/applications/agm-separator-for-motorcycle-battery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator for Motorcycle Starting Batteries",
    description:
      "AGM separator discussion for compact motorcycle VRLA and starting battery production, including roll, sheet and sample requirements.",
    keywords: [
      "AGM separator for motorcycle battery",
      "motorcycle battery separator",
      "motorcycle VRLA battery separator",
      "starter battery separator",
      "AGM separator sheets"
    ],
    pageName: "AGM Separator for Motorcycle Battery Applications",
    serviceDescription:
      "Application-focused AGM glass fiber separator discussion for motorcycle starting batteries and compact VRLA lead-acid battery production.",
    serviceType: "AGM separator for motorcycle battery applications",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["Home", "Applications", "AGM Separator for Motorcycle Battery"]
  },
  zh: {
    path: "/zh/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/applications/agm-separator-for-motorcycle-battery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "摩托车启动电池 AGM 隔板 | 湖北维京AGM",
    description:
      "面向紧凑型摩托车 VRLA 电池和启动电池生产，沟通 AGM 隔板卷材、片材和样品需求。",
    keywords: [
      "摩托车电池 AGM 隔板",
      "摩托车 VRLA 电池隔板",
      "启动电池隔板",
      "AGM 隔板片材",
      "AGM 电池隔板"
    ],
    pageName: "用于摩托车电池应用的 AGM 隔板",
    serviceDescription:
      "面向摩托车启动电池和紧凑型 VRLA 铅酸电池生产的 AGM 玻璃纤维隔板应用沟通。",
    serviceType: "摩托车电池应用 AGM 隔板",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["首页", "应用", "摩托车电池 AGM 隔板"]
  }
} as const;

const agmSeparatorEnergyStorageApplicationSeo = {
  en: {
    path: "/applications/agm-separator-for-energy-storage-battery/",
    alternatePath: "/zh/applications/agm-separator-for-energy-storage-battery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator for Energy Storage Batteries | Viking AGM",
    description:
      "AGM separator discussion for lead-acid energy storage, backup power and reserve power VRLA battery projects.",
    keywords: [
      "AGM separator for energy storage battery",
      "lead acid energy storage battery separator",
      "backup power battery separator",
      "reserve power battery separator",
      "VRLA battery separator"
    ],
    pageName: "AGM Separator for Energy Storage Battery Applications",
    serviceDescription:
      "Application-focused AGM glass fiber separator discussion for lead-acid energy storage, backup power and reserve power VRLA battery projects.",
    serviceType: "AGM separator for lead-acid energy storage battery applications",
    image: ENERGY_STORAGE_APPLICATION_IMAGE,
    breadcrumbs: ["Home", "Applications", "AGM Separator for Energy Storage Battery"]
  },
  zh: {
    path: "/zh/applications/agm-separator-for-energy-storage-battery/",
    alternatePath: "/applications/agm-separator-for-energy-storage-battery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "铅酸储能电池 AGM 隔板 | 湖北维京AGM",
    description:
      "面向铅酸储能、后备电源和备用电源 VRLA 电池项目，沟通 AGM 隔板卷材、片材和规格要求。",
    keywords: [
      "储能电池 AGM 隔板",
      "铅酸储能电池隔板",
      "后备电源电池隔板",
      "备用电源电池隔板",
      "VRLA 电池隔板"
    ],
    pageName: "用于储能电池应用的 AGM 隔板",
    serviceDescription:
      "面向铅酸储能、后备电源和备用电源 VRLA 电池项目的 AGM 玻璃纤维隔板应用沟通。",
    serviceType: "铅酸储能电池应用 AGM 隔板",
    image: ENERGY_STORAGE_APPLICATION_IMAGE,
    breadcrumbs: ["首页", "应用", "储能电池 AGM 隔板"]
  }
} as const;

type ApplicationDetailSeo = {
  path: string;
  locale: string;
  language: string;
  siteName: string;
  title: string;
  description: string;
  keywords: readonly string[];
  pageName: string;
  serviceDescription: string;
  serviceType: string;
  image: string;
  breadcrumbs: readonly string[];
};

const whatIsAgmSeparatorSeo = {
  en: {
    path: "/blog/what-is-agm-separator/",
    alternatePath: "/zh/blog/what-is-agm-separator/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "What Is AGM Separator? A Practical Guide for VRLA Battery Buyers",
    description:
      "Learn what AGM separator is, how it works in VRLA lead-acid batteries and what information buyers should confirm before purchasing.",
    keywords: [
      "what is AGM separator",
      "AGM battery separator",
      "AGM glass fiber separator",
      "VRLA battery separator",
      "Absorbent Glass Mat separator"
    ],
    pageName: "What Is AGM Separator?",
    articleDescription:
      "A practical educational guide explaining AGM separators, their function in VRLA lead-acid batteries, key parameters, roll and sheet formats, and buyer checklist information.",
    breadcrumbs: ["Home", "Resources", "What Is AGM Separator"]
  },
  zh: {
    path: "/zh/blog/what-is-agm-separator/",
    alternatePath: "/blog/what-is-agm-separator/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "什么是 AGM 隔板？VRLA 电池买家实用指南 | 湖北维京AGM",
    description:
      "了解AGM隔板是什么、它在VRLA铅酸电池中的作用，以及采购前应确认的厚度、宽度、吸酸性能、电阻等信息。",
    keywords: [
      "什么是 AGM 隔板",
      "AGM 电池隔板",
      "AGM 玻璃纤维隔板",
      "VRLA 电池隔板",
      "铅酸电池隔板"
    ],
    pageName: "什么是 AGM 隔板？",
    articleDescription:
      "面向 VRLA 铅酸电池买家的 AGM 隔板入门指南，说明隔板定义、电池中的作用、关键参数、卷材片材形式和询价前信息清单。",
    breadcrumbs: ["首页", "资料", "什么是 AGM 隔板"]
  }
} as const;

const keyTechnicalParametersSeo = {
  en: {
    path: "/blog/key-technical-parameters-of-agm-separator/",
    alternatePath: "/zh/blog/key-technical-parameters-of-agm-separator/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "Key Technical Parameters of AGM Separator",
    description:
      "Understand AGM separator thickness, basis weight, acid absorption, electrical resistance, porosity and strength in buyer-friendly language.",
    keywords: [
      "AGM separator thickness",
      "AGM separator basis weight",
      "AGM separator acid absorption",
      "AGM separator electrical resistance",
      "AGM separator technical parameters"
    ],
    pageName: "Key Technical Parameters of AGM Separator",
    articleDescription:
      "A buyer-friendly technical guide explaining AGM separator thickness, basis weight, acid absorption, electrical resistance, porosity and mechanical strength for VRLA lead-acid battery sourcing.",
    breadcrumbs: ["Home", "Resources", "Key Technical Parameters"]
  },
  zh: {
    path: "/zh/blog/key-technical-parameters-of-agm-separator/",
    alternatePath: "/blog/key-technical-parameters-of-agm-separator/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板关键技术参数 | 湖北维京AGM",
    description:
      "了解AGM隔板厚度、克重、吸酸性能、电阻、孔隙率和强度等关键参数，便于采购和技术沟通。",
    keywords: [
      "AGM 隔板厚度",
      "AGM 隔板克重",
      "AGM 隔板吸酸性能",
      "AGM 隔板电阻",
      "AGM 隔板技术参数"
    ],
    pageName: "AGM 隔板关键技术参数",
    articleDescription:
      "面向采购和工程人员的 AGM 隔板技术参数说明，解释厚度、克重、吸酸性能、电阻、孔隙率和机械强度等关键沟通点。",
    breadcrumbs: ["首页", "资料", "AGM 隔板技术参数"]
  }
} as const;

const howToChooseAgmSeparatorSeo = {
  en: {
    path: "/blog/how-to-choose-agm-separator/",
    alternatePath: "/zh/blog/how-to-choose-agm-separator/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "How to Choose AGM Separator for VRLA Batteries",
    description:
      "A practical buyer checklist for choosing AGM separators: thickness, width, roll or sheet type, battery application and quality requirements.",
    keywords: [
      "how to choose AGM separator",
      "custom AGM separator",
      "AGM separator supplier",
      "AGM separator checklist",
      "VRLA battery separator supplier"
    ],
    pageName: "How to Choose AGM Separator",
    articleDescription:
      "A practical buyer checklist for selecting AGM separators by battery application, roll or sheet type, dimensions, technical parameters, samples and quality requirements.",
    breadcrumbs: ["Home", "Resources", "How to Choose AGM Separator"]
  },
  zh: {
    path: "/zh/blog/how-to-choose-agm-separator/",
    alternatePath: "/blog/how-to-choose-agm-separator/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "如何选择 AGM 隔板 | 湖北维京AGM",
    description:
      "AGM隔板买家实用清单：从电池应用、厚度、宽度、卷材或片材形式、技术参数和质量要求出发进行选择。",
    keywords: [
      "如何选择 AGM 隔板",
      "定制 AGM 隔板",
      "AGM 隔板供应商",
      "AGM 隔板询盘清单",
      "VRLA 电池隔板供应商"
    ],
    pageName: "如何选择 AGM 隔板",
    articleDescription:
      "面向买家的 AGM 隔板选择清单，说明如何根据电池应用、卷材或片材形式、尺寸、技术参数、样品和质量要求沟通需求。",
    breadcrumbs: ["首页", "资料", "如何选择 AGM 隔板"]
  }
} as const;

const agmSeparatorManufacturingQualityDeliverySeo = {
  en: {
    path: "/blog/agm-separator-manufacturing-quality-delivery/",
    alternatePath: "/zh/blog/agm-separator-manufacturing-quality-delivery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title:
      "AGM Separator Manufacturing: Production, Quality Control and Reliable Delivery",
    description:
      "See how Hubei Viking manages AGM separator production, inspection and delivery for stable VRLA lead-acid battery separator supply.",
    keywords: [
      "AGM separator manufacturing",
      "AGM separator factory",
      "AGM separator quality control",
      "AGM separator delivery",
      "VRLA battery separator supplier"
    ],
    pageName:
      "AGM Separator Manufacturing: Production, Quality Control and Reliable Delivery",
    articleDescription:
      "A factory-focused article explaining how Hubei Viking manages AGM separator production, quality control and delivery communication for reliable VRLA lead-acid battery separator supply.",
    breadcrumbs: ["Home", "Resources", "AGM Separator Manufacturing"]
  },
  zh: {
    path: "/zh/blog/agm-separator-manufacturing-quality-delivery/",
    alternatePath: "/blog/agm-separator-manufacturing-quality-delivery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "湖北维京 AGM 隔板：生产、检测与稳定交付 | 湖北维京AGM",
    description:
      "了解湖北维京如何围绕 AGM 隔板生产、质量检测和交付配合，为 VRLA 铅酸电池客户提供稳定供应。",
    keywords: [
      "AGM 隔板制造",
      "AGM 隔板工厂",
      "AGM 隔板质量检测",
      "AGM 隔板稳定交付",
      "VRLA 电池隔板供应商"
    ],
    pageName: "湖北维京 AGM 隔板：生产、检测与稳定交付",
    articleDescription:
      "介绍湖北维京如何围绕 AGM 隔板生产、质量控制和交付配合，为 VRLA 铅酸电池客户提供稳定供应。",
    breadcrumbs: ["首页", "资料", "AGM 隔板生产与交付"]
  }
} as const;

const agmSeparatorPerformanceConsistencySeo = {
  en: {
    path: "/blog/agm-separator-performance-consistency/",
    alternatePath: "/zh/blog/agm-separator-performance-consistency/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "Why AGM Separator Consistency Matters for VRLA Batteries | Viking AGM",
    description:
      "Learn why AGM separator conductivity support, fit under compression and batch consistency matter for VRLA lead-acid battery assembly and supply.",
    keywords: [
      "AGM separator consistency",
      "AGM separator selection",
      "AGM separator conductivity",
      "AGM separator quality control",
      "VRLA battery separator supplier"
    ],
    pageName: "Why AGM Separator Consistency Matters for VRLA Batteries",
    articleDescription:
      "A practical buyer guide to AGM separator conductivity support, compression fit and batch consistency for VRLA lead-acid battery projects.",
    breadcrumbs: ["Home", "Resources", "AGM Separator Consistency"]
  },
  zh: {
    path: "/zh/blog/agm-separator-performance-consistency/",
    alternatePath: "/blog/agm-separator-performance-consistency/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板为什么影响电池稳定性？| 湖北维京AGM",
    description:
      "从导通相关表现、受压贴合和批次一致性，了解 AGM 隔板如何影响 VRLA 铅酸电池装配与后续稳定配套。",
    keywords: [
      "AGM 隔板稳定性",
      "AGM 隔板选型",
      "AGM 隔板导通",
      "AGM 隔板批次一致性",
      "VRLA 电池隔板供应商"
    ],
    pageName: "同样是 AGM 隔板，为什么有的电池更稳？",
    articleDescription:
      "面向采购和技术团队，说明 AGM 隔板的导通相关表现、受压贴合和批次一致性为何影响 VRLA 铅酸电池项目的后续配套。",
    breadcrumbs: ["首页", "资料", "AGM 隔板稳定性"]
  }
} as const;

const agmSeparatorExportSupplyReadinessSeo = {
  en: {
    path: "/blog/agm-separator-export-supply-readiness/",
    alternatePath: "/zh/blog/agm-separator-export-supply-readiness/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "Lead-Acid Battery Exports Recovered in May. Is Your AGM Separator Supply Ready?",
    description:
      "May 2026 lead-acid battery export data and a practical buyer guide to AGM separator batch consistency, supply coordination and delivery readiness.",
    keywords: [
      "lead-acid battery export data",
      "AGM separator supply",
      "AGM separator batch consistency",
      "AGM separator delivery",
      "VRLA battery separator supplier"
    ],
    pageName: "Lead-Acid Battery Exports Recovered in May. Is Your AGM Separator Supply Ready?",
    articleDescription:
      "A practical industry article connecting May 2026 lead-acid battery export data with AGM separator batch consistency, supply coordination and delivery readiness for export-oriented battery projects.",
    breadcrumbs: ["Home", "Resources", "AGM Separator Export Supply"]
  },
  zh: {
    path: "/zh/blog/agm-separator-export-supply-readiness/",
    alternatePath: "/blog/agm-separator-export-supply-readiness/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "海外销量回升了，AGM 隔板配套跟得上吗？| 湖北维京AGM",
    description:
      "从 2026 年 5 月铅酸蓄电池出口数据，看 AGM 隔板批次一致性、供货协同和交付准备为何会在出口型项目中变得更重要。",
    keywords: [
      "铅酸蓄电池出口数据",
      "AGM 隔板供应",
      "AGM 隔板批次一致性",
      "AGM 隔板交付",
      "VRLA 电池隔板供应商"
    ],
    pageName: "海外销量回升了，AGM 隔板配套跟得上吗？",
    articleDescription:
      "结合 2026 年 5 月铅酸蓄电池出口数据，面向出口型电池项目说明 AGM 隔板批次一致性、供货协同和交付准备的重要性。",
    breadcrumbs: ["首页", "资料", "AGM 隔板出口配套"]
  }
} as const;

export function buildHomeMetadata(lang: Lang): Metadata {
  const current = seoContent("home", lang, homeSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/",
    zhPath: "/zh/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.serviceName
  });
}

export function buildAgmSeparatorMetadata(lang: Lang): Metadata {
  const current = seoContent("agmSeparator", lang, agmSeparatorSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/products/agm-separator/",
    zhPath: "/zh/products/agm-separator/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.productName
  });
}

export function buildAgmSeparatorRollsMetadata(lang: Lang): Metadata {
  const current = seoContent("agmSeparatorRolls", lang, agmSeparatorRollsSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/products/agm-separator-rolls/",
    zhPath: "/zh/products/agm-separator-rolls/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.productName
  });
}

export function buildAgmSeparatorSheetsMetadata(lang: Lang): Metadata {
  const current = seoContent("agmSeparatorSheets", lang, agmSeparatorSheetsSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/products/agm-separator-sheets/",
    zhPath: "/zh/products/agm-separator-sheets/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.productName,
    image: {
      url: SHEETS_PREVIEW_IMAGE,
      width: 900,
      height: 675
    }
  });
}

export function buildAgmSeparatorTestingMetadata(lang: Lang): Metadata {
  const current = seoContent("agmSeparatorTesting", lang, agmSeparatorTestingSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/quality-control/agm-separator-testing/",
    zhPath: "/zh/quality-control/agm-separator-testing/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 900
    }
  });
}

export function buildAgmSeparatorVrlaApplicationMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmSeparatorVrlaApplication",
    lang,
    agmSeparatorVrlaApplicationSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/applications/agm-separator-for-vrla-battery/",
    zhPath: "/zh/applications/agm-separator-for-vrla-battery/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: PREVIEW_IMAGE,
      width: 900,
      height: 675
    }
  });
}

function buildApplicationDetailMetadata(
  lang: Lang,
  current: ApplicationDetailSeo,
  enPath: string,
  zhPath: string
): Metadata {
  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath,
    zhPath,
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: current.image,
      width: 1200,
      height: 900
    }
  });
}

export function buildAgmSeparatorUpsApplicationMetadata(
  lang: Lang
): Metadata {
  return buildApplicationDetailMetadata(
    lang,
    seoContent(
      "agmSeparatorUpsApplication",
      lang,
      agmSeparatorUpsApplicationSeo[lang]
    ),
    "/applications/agm-separator-for-ups-battery/",
    "/zh/applications/agm-separator-for-ups-battery/"
  );
}

export function buildAgmSeparatorMotorcycleApplicationMetadata(
  lang: Lang
): Metadata {
  return buildApplicationDetailMetadata(
    lang,
    seoContent(
      "agmSeparatorMotorcycleApplication",
      lang,
      agmSeparatorMotorcycleApplicationSeo[lang]
    ),
    "/applications/agm-separator-for-motorcycle-battery/",
    "/zh/applications/agm-separator-for-motorcycle-battery/"
  );
}

export function buildAgmSeparatorEnergyStorageApplicationMetadata(
  lang: Lang
): Metadata {
  return buildApplicationDetailMetadata(
    lang,
    seoContent(
      "agmSeparatorEnergyStorageApplication",
      lang,
      agmSeparatorEnergyStorageApplicationSeo[lang]
    ),
    "/applications/agm-separator-for-energy-storage-battery/",
    "/zh/applications/agm-separator-for-energy-storage-battery/"
  );
}

export function buildWhatIsAgmSeparatorMetadata(lang: Lang): Metadata {
  const current = seoContent("whatIsAgmSeparator", lang, whatIsAgmSeparatorSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/what-is-agm-separator/",
    zhPath: "/zh/blog/what-is-agm-separator/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: PREVIEW_IMAGE,
      width: 900,
      height: 675
    }
  });
}

export function buildKeyTechnicalParametersMetadata(lang: Lang): Metadata {
  const current = seoContent(
    "keyTechnicalParameters",
    lang,
    keyTechnicalParametersSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/key-technical-parameters-of-agm-separator/",
    zhPath: "/zh/blog/key-technical-parameters-of-agm-separator/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 900
    }
  });
}

export function buildHowToChooseAgmSeparatorMetadata(lang: Lang): Metadata {
  const current = seoContent(
    "howToChooseAgmSeparator",
    lang,
    howToChooseAgmSeparatorSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/how-to-choose-agm-separator/",
    zhPath: "/zh/blog/how-to-choose-agm-separator/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: PREVIEW_IMAGE,
      width: 900,
      height: 675
    }
  });
}

export function buildAgmSeparatorManufacturingQualityDeliveryMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmSeparatorManufacturingQualityDelivery",
    lang,
    agmSeparatorManufacturingQualityDeliverySeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/agm-separator-manufacturing-quality-delivery/",
    zhPath: "/zh/blog/agm-separator-manufacturing-quality-delivery/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: `${SITE_URL}/images/agm-hero-production-1600.webp`,
      width: 1600,
      height: 1000
    }
  });
}

export function buildAgmSeparatorPerformanceConsistencyMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmSeparatorPerformanceConsistency",
    lang,
    agmSeparatorPerformanceConsistencySeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/agm-separator-performance-consistency/",
    zhPath: "/zh/blog/agm-separator-performance-consistency/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 900
    }
  });
}

export function buildAgmSeparatorExportSupplyReadinessMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmSeparatorExportSupplyReadiness",
    lang,
    agmSeparatorExportSupplyReadinessSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/agm-separator-export-supply-readiness/",
    zhPath: "/zh/blog/agm-separator-export-supply-readiness/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 900
    }
  });
}

function buildMetadata({
  title,
  description,
  keywords,
  path,
  enPath,
  zhPath,
  locale,
  siteName,
  imageAlt,
  image = {
    url: PREVIEW_IMAGE,
    width: 900,
    height: 675
  }
}: {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  enPath: string;
  zhPath: string;
  locale: string;
  siteName: string;
  imageAlt: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
      languages: {
        en: enPath,
        "zh-CN": zhPath,
        "x-default": enPath
      }
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      title,
      description,
      siteName,
      locale,
      images: [
        {
          url: image.url,
          width: image.width,
          height: image.height,
          alt: imageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url]
    }
  };
}

export function StructuredData({ lang }: { lang: Lang }) {
  const current = seoContent("home", lang, homeSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: current.siteName,
        alternateName: current.alternateSiteName,
        url: SITE_URL,
        inLanguage: current.language,
        publisher: {
          "@id": `${SITE_URL}/#organization`
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#agm-separator-service`,
        name: current.serviceName,
        description: current.serviceDescription,
        serviceType: "AGM glass fiber separator manufacturing",
        image: PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      {
        "@type": "VideoObject",
        "@id": `${url}#factory-overview-video`,
        name:
          lang === "zh"
            ? "1 分钟了解维京 AGM 隔板生产能力"
            : "Watch the 1-minute Viking AGM factory overview",
        description:
          lang === "zh"
            ? "湖北维京 AGM 隔板生产、卷材处理、质量检测和包装出运现场宣传片。"
            : "A one-minute overview of Viking AGM separator production, roll handling, quality control and packing scenes.",
        thumbnailUrl: [HOME_VIDEO_POSTER],
        uploadDate: "2026-07-01T00:00:00+08:00",
        duration: "PT1M3S",
        contentUrl: HOME_VIDEO_URL,
        embedUrl: url,
        inLanguage: current.language,
        publisher: {
          "@id": `${SITE_URL}/#organization`
        }
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorStructuredData({ lang }: { lang: Lang }) {
  const current = seoContent("agmSeparator", lang, agmSeparatorSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.productName,
        description: current.serviceDescription,
        serviceType: "AGM separator manufacturing",
        image: PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#products`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorRollsStructuredData({ lang }: { lang: Lang }) {
  const current = seoContent("agmSeparatorRolls", lang, agmSeparatorRollsSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.productName,
        description: current.serviceDescription,
        serviceType: "AGM separator roll supply",
        image: PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#products`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorSheetsStructuredData({ lang }: { lang: Lang }) {
  const current = seoContent("agmSeparatorSheets", lang, agmSeparatorSheetsSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: SHEETS_PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.productName,
        description: current.serviceDescription,
        serviceType: "AGM separator sheet supply",
        image: SHEETS_PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#products`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorTestingStructuredData({ lang }: { lang: Lang }) {
  const current = seoContent("agmSeparatorTesting", lang, agmSeparatorTestingSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.pageName,
        description: current.serviceDescription,
        serviceType: "AGM separator testing and quality control",
        image: QUALITY_PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#quality`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorVrlaApplicationStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmSeparatorVrlaApplication",
    lang,
    agmSeparatorVrlaApplicationSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.pageName,
        description: current.serviceDescription,
        serviceType: "AGM separator for VRLA lead-acid battery applications",
        image: PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#applications`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

function ApplicationDetailStructuredData({
  lang,
  current
}: {
  lang: Lang;
  current: ApplicationDetailSeo;
}) {
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: current.image,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.pageName,
        description: current.serviceDescription,
        serviceType: current.serviceType,
        image: current.image,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#applications`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorUpsApplicationStructuredData({
  lang
}: {
  lang: Lang;
}) {
  return (
    <ApplicationDetailStructuredData
      lang={lang}
      current={seoContent(
        "agmSeparatorUpsApplication",
        lang,
        agmSeparatorUpsApplicationSeo[lang]
      )}
    />
  );
}

export function AgmSeparatorMotorcycleApplicationStructuredData({
  lang
}: {
  lang: Lang;
}) {
  return (
    <ApplicationDetailStructuredData
      lang={lang}
      current={seoContent(
        "agmSeparatorMotorcycleApplication",
        lang,
        agmSeparatorMotorcycleApplicationSeo[lang]
      )}
    />
  );
}

export function AgmSeparatorEnergyStorageApplicationStructuredData({
  lang
}: {
  lang: Lang;
}) {
  return (
    <ApplicationDetailStructuredData
      lang={lang}
      current={seoContent(
        "agmSeparatorEnergyStorageApplication",
        lang,
        agmSeparatorEnergyStorageApplicationSeo[lang]
      )}
    />
  );
}

export function WhatIsAgmSeparatorStructuredData({ lang }: { lang: Lang }) {
  const current = seoContent("whatIsAgmSeparator", lang, whatIsAgmSeparatorSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: PREVIEW_IMAGE,
        url,
        mainEntityOfPage: {
          "@id": `${url}#webpage`
        },
        author: {
          "@id": `${SITE_URL}/#organization`
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        about: [
          "AGM separator",
          "AGM battery separator",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function KeyTechnicalParametersStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "keyTechnicalParameters",
    lang,
    keyTechnicalParametersSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: QUALITY_PREVIEW_IMAGE,
        url,
        mainEntityOfPage: {
          "@id": `${url}#webpage`
        },
        author: {
          "@id": `${SITE_URL}/#organization`
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        about: [
          "AGM separator technical parameters",
          "AGM separator thickness",
          "AGM separator electrical resistance",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function HowToChooseAgmSeparatorStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "howToChooseAgmSeparator",
    lang,
    howToChooseAgmSeparatorSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: PREVIEW_IMAGE,
        url,
        mainEntityOfPage: {
          "@id": `${url}#webpage`
        },
        author: {
          "@id": `${SITE_URL}/#organization`
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        about: [
          "AGM separator sourcing",
          "custom AGM separator",
          "AGM separator supplier",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorManufacturingQualityDeliveryStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmSeparatorManufacturingQualityDelivery",
    lang,
    agmSeparatorManufacturingQualityDeliverySeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const image = `${SITE_URL}/images/agm-hero-production-1600.webp`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image,
          width: 1600,
          height: 1000
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image,
        url,
        mainEntityOfPage: {
          "@id": `${url}#webpage`
        },
        author: {
          "@id": `${SITE_URL}/#organization`
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        about: [
          "AGM separator manufacturing",
          "AGM separator quality control",
          "AGM separator delivery",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorPerformanceConsistencyStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmSeparatorPerformanceConsistency",
    lang,
    agmSeparatorPerformanceConsistencySeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: QUALITY_PREVIEW_IMAGE,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "AGM separator selection",
          "AGM separator batch consistency",
          "VRLA lead-acid battery assembly"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorExportSupplyReadinessStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmSeparatorExportSupplyReadiness",
    lang,
    agmSeparatorExportSupplyReadinessSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: QUALITY_PREVIEW_IMAGE,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "lead-acid battery exports",
          "AGM separator supply",
          "AGM separator batch consistency",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

function organizationData(lang: Lang, description: string) {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: lang === "zh" ? "湖北维京AGM" : "Viking AGM",
    legalName: "Hubei Viking Technology Co., Ltd.",
    alternateName:
      lang === "zh"
        ? ["湖北维京科技有限公司", "维京AGM", "Viking AGM"]
        : ["Hubei Viking Technology Co., Ltd.", "Hubei Viking AGM", "湖北维京AGM"],
    url: SITE_URL,
    logo: `${SITE_URL}/images/banner-logo-header.webp`,
    email: "vikingsales@vikingagm.com",
    telephone: "+86 18171518528",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86 18171518528",
      email: "vikingsales@vikingagm.com",
      contactType: "sales",
      availableLanguage: ["en", "zh-CN"]
    },
    foundingDate: "2015-12",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ezhou",
      addressRegion: "Hubei",
      addressCountry: "CN"
    },
    description
  };
}

function faqPageData(url: string, lang: Lang) {
  const copy = productFaqCopy[lang];

  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: copy.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
