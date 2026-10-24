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
  "id": "early-lead-acid-battery-electrode-formation",
  "category": "manufacturingQuality",
  "publishedAt": "2026-10-24",
  "title": {
    "en": "Rechargeable Was Only the Beginning: Why Early Lead–Acid Batteries Took So Long to Make",
    "zh": "能充电只是起点：早期铅酸电池为什么制造缓慢？"
  },
  "description": {
    "en": "From Planté formation cycles to Faure pasted plates, electrode manufacturing required more than rechargeability. Modern glass-fiber structures also need clear functional boundaries and validation.",
    "zh": "从 Planté 反复化成到 Faure 涂膏极板，电极制造的难点不止于可充电。理解现代玻纤结构，也要先区分材料位置、支撑作用与验证条件。"
  },
  "href": {
    "en": "/blog/early-lead-acid-battery-electrode-formation/",
    "zh": "/zh/blog/early-lead-acid-battery-electrode-formation/"
  }
},
{
  "id": "reading-agm-separator-pressure-charts",
  "category": "buyerGuides",
  "publishedAt": "2026-10-24",
  "title": {
    "en": "Reading AGM Separator Pressure Charts: Endpoints, Guide Lines, and Measured Curves",
    "zh": "如何读懂 AGM 隔板压力图：端点、引导线与实测曲线"
  },
  "description": {
    "en": "Two brochure endpoints and a visual guide do not constitute a continuously measured pressure curve. Confirm the data and test conditions before comparing AGM separators.",
    "zh": "两个手册端点加一条视觉引导线，并不构成连续实测压力曲线。比较 AGM 隔板前，应先确认数据含义与测试条件。"
  },
  "href": {
    "en": "/blog/reading-agm-separator-pressure-charts/",
    "zh": "/zh/blog/reading-agm-separator-pressure-charts/"
  }
},
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
    id: "agm-start-stop-battery-procurement",
    category: "buyerGuides",
    publishedAt: "2026-09-10",
    title: {
      en: "Automotive AGM Start-Stop Battery Separator Guide",
      zh: "汽车 AGM 启停电池隔板采购指南"
    },
    description: {
      en: "What to confirm for separator validation: test pressure, assembly inputs and batch evidence.",
      zh: "从测试压力、装配输入到批次证据，确认隔板验证所需的材料条件。"
    },
    href: {
      en: "/blog/agm-start-stop-battery-separator-procurement-guide/",
      zh: "/zh/blog/agm-start-stop-battery-separator-procurement-guide/"
    }
  },
  {
    id: "agm-separator-third-pole",
    category: "buyerGuides",
    publishedAt: "2026-09-13",
    title: {
      en: "The AGM Separator ‘Third Pole’ Explained",
      zh: "AGM 隔板“第三极”到底是什么？"
    },
    description: {
      en: "Understand plate separation, electrolyte retention, oxygen-pathway conditions and complete-battery verification boundaries.",
      zh: "了解极板隔离、电解液保持、氧气通道条件以及整电池验证边界。"
    },
    href: {
      en: "/blog/agm-separator-third-pole-explained/",
      zh: "/zh/blog/agm-separator-third-pole-explained/"
    }
  },
  {
    id: "agm-separator-energy-data-delivery",
    category: "manufacturingQuality",
    publishedAt: "2026-09-18",
    title: {
      en: "AGM Separator Supplier Energy Data & Delivery Risk",
      zh: "AGM 隔板供应商能耗数据与交付风险"
    },
    description: {
      en: "How to read energy records alongside output, shutdown and data-boundary evidence in a supplier review.",
      zh: "在供应商评审中，如何结合产出、停机与数据边界理解能耗记录。"
    },
    href: {
      en: "/blog/agm-separator-energy-data-and-delivery-risk/",
      zh: "/zh/blog/agm-separator-energy-data-and-delivery-risk/"
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
  },
  {
    id: "en-18060-2025-road-vehicle-battery-standard",
    category: "industryApplications",
    publishedAt: "2026-10-03",
    title: {
      en: "EN 18060:2025: Which Vehicle Batteries Does It Cover?",
      zh: "EN 18060:2025 覆盖哪些车用电池？"
    },
    description: {
      en: "What the harmonised-standard listing says about road-vehicle EV batteries, Pb and the AGM separator evidence boundary.",
      zh: "解读协调标准列名对道路车辆 EV 电池、Pb 与 AGM 隔板证据边界的含义。"
    },
    href: {
      en: "/blog/en-18060-2025-road-vehicle-battery-standard/",
      zh: "/zh/blog/en-18060-2025-road-vehicle-battery-standard/"
    }
  },
  {
    id: "data-center-ev-low-voltage-lead-acid",
    category: "industryApplications",
    publishedAt: "2026-10-04",
    title: {
      en: "Why Data Centers and EVs Still Use Lead-Acid Low-Voltage Power",
      zh: "为什么数据中心和电动车仍可能使用铅酸低压电源？"
    },
    description: {
      en: "Compare data-center backup and EV low-voltage duties, with a clear boundary around所引企业's corporate market perspective.",
      zh: "比较数据中心备电与电动车低压任务，并明确所引企业企业市场观点的证据边界。"
    },
    href: {
      en: "/blog/why-data-centers-and-electric-vehicles-still-use-lead-acid-low-voltage-power/",
      zh: "/zh/blog/why-data-centers-and-electric-vehicles-still-use-lead-acid-low-voltage-power/"
    }
  },
  {
    id: "ai-data-center-backup-power-layers",
    category: "industryApplications",
    publishedAt: "2026-10-08",
    title: {
      en: "1 MW for 60 Seconds: AI Data Center Backup Power",
      zh: "1MW 只备 60 秒：AI 数据中心为什么先争快？"
    },
    description: {
      en: "How transient, seconds-scale and minutes-scale backup duties differ, with explicit boundaries around所引企业’s所述系统 disclosure.",
      zh: "以所引企业所述系统企业披露为案例，说明瞬态、秒级与分钟级备电任务及 AGM 证据边界。"
    },
    href: {
      en: "/blog/ai-data-center-backup-power-1mw-60-seconds/",
      zh: "/zh/blog/ai-data-center-backup-power-1mw-60-seconds/"
    }
  },
  {
    id: "agm-pasting-paper-energy-validation",
    category: "manufacturingQuality",
    publishedAt: "2026-10-09",
    title: {
      en: "AGM Pasting Paper: How to Validate Drying-Energy Claims",
      zh: "一张涂板纸能省下多少烘干能耗？"
    },
    description: {
      en: "How to test a fiberglass pasting-paper drying claim using same-line energy, moisture, plate-quality and battery-validation boundaries.",
      zh: "用同线单位产量能耗、含水、极板质量与整电池边界，验证 AGM 玻纤涂板纸节能主张。"
    },
    href: {
      en: "/blog/agm-fiberglass-pasting-paper-drying-energy-validation/",
      zh: "/zh/blog/agm-fiberglass-pasting-paper-drying-energy-validation/"
    }
  },
  {
    id: "agm-battery-damage-demo-safety-test",
    category: "industryApplications",
    publishedAt: "2026-10-10",
    title: {
      en: "AGM Battery Damage Demo vs Safety Test",
      zh: "电池被烧、切、射击还能工作：安全测试还是传播演示？"
    },
    description: {
      en: "Use sample, load, duration, temperature, leakage, retained capacity and method boundaries to separate a damage demonstration from safety validation.",
      zh: "用样品、载荷、时长、温升、泄漏、剩余容量与方法边界，区分极端演示和标准化安全验证。"
    },
    href: {
      en: "/blog/agm-battery-extreme-damage-demo-vs-safety-test/",
      zh: "/zh/blog/agm-battery-extreme-damage-demo-vs-safety-test/"
    }
  },
  {
  "id": "compare-lead-lithium-sodium-batteries-by-project-duty",
  "category": "industryApplications",
  "publishedAt": "2026-10-17",
  "title": {
    "en": "Beyond Lead, Lithium or Sodium: Compare Batteries by Project Duty",
    "zh": "铅、锂还是钠？从项目工况比较电池方案"
  },
  "description": {
    "en": "Compare battery options through duty, site conditions, safety, recycling, total cost and evidence. Assess AGM separators only within a defined VRLA battery application.",
    "zh": "从负载任务、现场条件、安全、回收、总成本和验证证据比较电池方案；将 AGM 隔板放回已明确的 VRLA 电池应用中评估。"
  },
  "href": {
    "en": "/blog/compare-lead-lithium-sodium-batteries-by-project-duty/",
    "zh": "/zh/blog/compare-lead-lithium-sodium-batteries-by-project-duty/"
  }
},
  {
  "id": "sodium-ion-minus-40-cold-start-agm-comparison",
  "category": "industryApplications",
  "publishedAt": "2026-10-18",
  "title": {
    "en": "−40°C Sodium-Ion Cold Start: What Changes in the AGM Comparison?",
    "zh": "钠离子电池 −40°C 冷启动：AGM 方案该如何比较？"
  },
  "description": {
    "en": "What company-reported −40°C sodium-ion cold-start validation means for low-voltage battery selection, and where AGM separator evidence must stop.",
    "zh": "解读企业披露的钠离子电池 −40°C 冷启动验证，从全生命周期成本、验证成熟度、回收和售后支持比较低压电池，并厘清 AGM 隔板证据边界。"
  },
  "href": {
    "en": "/blog/sodium-ion-minus-40-cold-start-agm-comparison/",
    "zh": "/zh/blog/sodium-ion-minus-40-cold-start-agm-comparison/"
  }
},
  {
  "id": "agm-material-data-battery-soh-predictive-maintenance",
  "category": "manufacturingQuality",
  "publishedAt": "2026-10-18",
  "title": {
    "en": "Predicting 12V Battery Failure: Where AGM Material Data Fits",
    "zh": "预测 12V 电池失效：AGM 材料数据能提供什么？"
  },
  "description": {
    "en": "Trace AGM batches, whole-battery aging and field records for explainable SOH assessment. Separator consistency is a material input, not a standalone prediction service.",
    "zh": "将 AGM 材料批次、整电池老化结果与现场记录关联，为 SOH 评估提供可解释证据。材料一致性是输入，不能单独预测失效或替代验证。"
  },
  "href": {
    "en": "/blog/agm-material-data-battery-soh-predictive-maintenance/",
    "zh": "/zh/blog/agm-material-data-battery-soh-predictive-maintenance/"
  }
},
  {
  "id": "ups-battery-272-individual-monitors-batch-traceability",
  "category": "industryApplications",
  "publishedAt": "2026-10-18",
  "title": {
    "en": "272 Batteries, 272 Monitors: What UPS Procurement Can Tell Us",
    "zh": "272 套电池、272 套监测模块：UPS 采购关注什么？"
  },
  "description": {
    "en": "A public UPS replacement notice pairs 272 VRLA batteries with 272 monitoring modules. Review individual readings, service consistency and the limits of AGM material evidence.",
    "zh": "以一则 UPS 更换公告为例，区分单体电压与内阻监测、服役一致性和 AGM 材料证据，建立现场、电池与隔板批次的追溯关系。"
  },
  "href": {
    "en": "/blog/ups-battery-272-individual-monitors-batch-traceability/",
    "zh": "/zh/blog/ups-battery-272-individual-monitors-batch-traceability/"
  }
}
];

const articleKindById: Record<string, string> = {
  "early-lead-acid-battery-electrode-formation": "earlyLeadAcidElectrodeFormation",
  "reading-agm-separator-pressure-charts": "agmSeparatorPressureCharts",
  "ups-battery-272-individual-monitors-batch-traceability": "upsBatteryIndividualMonitoring",
  "agm-material-data-battery-soh-predictive-maintenance": "agmMaterialDataPredictiveMaintenance",
  "sodium-ion-minus-40-cold-start-agm-comparison": "sodiumIonColdStartAgmComparison",
  "compare-lead-lithium-sodium-batteries-by-project-duty": "batteryTechnologyProjectComparison",
  "agm-separator-supply-chain": "agmSeparatorSupplyChain",
  "agm-start-stop-battery-procurement": "agmStartStopBatteryProcurement",
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
  "agm-separator-batch-process-control": "agmSeparatorBatchProcessControl",
  "agm-separator-third-pole": "agmSeparatorThirdPole",
  "agm-separator-energy-data-delivery": "agmSeparatorEnergyDataDelivery"
  ,"en-18060-2025-road-vehicle-battery-standard": "en18060BatteryStandard"
  ,"data-center-ev-low-voltage-lead-acid": "dataCenterEvLowVoltageAgm"
  ,"ai-data-center-backup-power-layers": "aiDataCenterBackupPowerLayers"
  ,"agm-pasting-paper-energy-validation": "agmPastingPaperEnergyValidation"
  ,"agm-battery-damage-demo-safety-test": "agmBatteryDamageDemoSafetyTest"
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
