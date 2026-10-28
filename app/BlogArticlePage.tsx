"use client";

import Image from "next/image";
import { useState } from "react";
import { articleContent } from "./cms-content";
import { InquiryForm } from "./InquiryForm";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";
import { FooterQrCodes } from "./FooterQrCodes";
import type { SiteLocale } from "./locales";
import {
  secondaryArticleCopy,
  secondaryResourceData
} from "../content/secondary-resources.mjs";

type IconProps = { size?: number; className?: string };
export type BlogArticleKind =
  | "agmAcidVolumeWetOut"
  | "leadPremiumDemandRestocking"
  | "telecomLeadAcidProcurement"
  | "upsOriginalManufacturerEvidence"
  | "agmVsGemGlassFiber"
  | "earlyLeadAcidElectrodeFormation"
  | "agmSeparatorPressureCharts"
  | "upsBatteryIndividualMonitoring"
  | "agmMaterialDataPredictiveMaintenance"
  | "sodiumIonColdStartAgmComparison"
  | "batteryTechnologyProjectComparison"
  | "whatIsAgmSeparator"
  | "keyTechnicalParameters"
  | "howToChooseAgmSeparator"
  | "agmSeparatorManufacturingQualityDelivery"
  | "agmSeparatorPerformanceConsistency"
  | "agmSeparatorExportSupplyReadiness"
  | "upsVrlaTechnologySelection"
  | "agmGlassFiberVsPvcSeparator"
  | "dataCenterBackupPowerAgmSeparator"
  | "earlyChinaLeadAcidBatteryManufacturing"
  | "agmSeparatorPressureRetention"
  | "agmSeparatorBatchProcessControl"
  | "agmSeparatorSupplyChain"
  | "agmStartStopBatteryProcurement"
  | "agmSeparatorThirdPole"
  | "agmSeparatorEnergyDataDelivery"
  | "en18060BatteryStandard"
  | "dataCenterEvLowVoltageAgm"
  | "aiDataCenterBackupPowerLayers"
  | "agmPastingPaperEnergyValidation"
  | "agmBatteryDamageDemoSafetyTest";
type ArticlePageData = {
  homePath: string;
  languagePath: string;
  quote: string;
  nav: { company: string; quality: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    secondary: string;
    image?: { src: string; alt: string; width: number; height: number; caption?: string };
  };
  intro: string[];
  sections: Array<{ eyebrow: string; title: string; text: string; image?: { src: string; alt: string; width: number; height: number; caption: string } }>;
  parameters: Array<[string, string]>;
  formats: {
    eyebrow: string;
    title: string;
    items: Array<[string, string, string, string]>;
  };
  checklist: { eyebrow: string; title: string; text: string; items: string[] };
  related: { eyebrow: string; title: string; items: Array<[string, string]> };
  inquiry: {
    eyebrow: string;
    title: string;
    text: string;
    checklist: string[];
    placeholders: { message: string };
  };
  footer: { description: string; wechat: string; mobile: string };
  comparison?: {
    eyebrow: string;
    title: string;
    columns: [string, string, string];
    rows: Array<[string, string, string]>;
  };
  timeline?: {
    eyebrow: string;
    title: string;
    note: string;
    items: Array<[string, string]>;
  };
  references?: {
    eyebrow: string;
    title: string;
    text: string;
    items: Array<[string, string]>;
  };
};
type IconName =
  | "arrow"
  | "check"
  | "clipboard"
  | "factory"
  | "layers"
  | "mail"
  | "menu"
  | "phone"
  | "send"
  | "shield"
  | "top"
  | "x";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const icpLicense = process.env.NEXT_PUBLIC_ICP_LICENSE || "鄂ICP备2026033781号";
const contactInfo = {
  phone: "+86 18171518528",
  email: "vikingsales@vikingagm.com"
};

const ArrowRight = makeIcon("arrow");
const CheckCircle2 = makeIcon("check");
const ClipboardCheck = makeIcon("clipboard");
const Factory = makeIcon("factory");
const Layers3 = makeIcon("layers");
const Mail = makeIcon("mail");
const Phone = makeIcon("phone");
const Send = makeIcon("send");
const ShieldCheck = makeIcon("shield");
const ArrowUp = makeIcon("top");

const articleCopy = {
  en: {
    nav: {
      company: "Company",
      products: "Products",
      applications: "Applications",
      quality: "Quality",
      resources: "Resources",
      contact: "Contact"
    },
    language: "中文",
    homePath: "/",
    languagePath: "/zh/blog/what-is-agm-separator/",
    brandName: "Hubei Viking Technology Co., Ltd.",
    quote: "Request a Quote",
    hero: {
      eyebrow: "AGM Separator Guide",
      title: "What Is AGM Separator?",
      subtitle:
        "A practical guide for new buyers, traders and engineers sourcing AGM glass fiber separators for VRLA lead-acid batteries.",
      primary: "Ask for AGM Separator Guide",
      secondary: "Send Your Battery Application",
      image: {
        src: "/images/viking-finished-separator-roll-900.webp",
        alt: "Finished AGM separator roll",
        width: 900,
        height: 675
      }
    },
    intro: [
      "AGM stands for Absorbent Glass Mat. In the battery separator industry, AGM separator usually refers to a glass fiber separator used in VRLA lead-acid batteries.",
      "It is placed between positive and negative plates to prevent direct contact while helping retain electrolyte inside the battery."
    ],
    sections: [
      {
        eyebrow: "Definition",
        title: "AGM separator is a glass fiber battery separator",
        text:
          "AGM separator is designed for valve-regulated lead-acid battery structures where electrolyte is retained in a porous glass fiber mat. It works as both a physical separator and an electrolyte-retention material inside the battery."
      },
      {
        eyebrow: "Battery Function",
        title: "It helps separate plates and retain electrolyte",
        text:
          "Inside a VRLA lead-acid battery, the separator needs to keep positive and negative plates apart while supporting electrolyte distribution. A suitable separator is connected with assembly process, internal resistance and long-term battery performance."
      },
      {
        eyebrow: "Key Parameters",
        title: "Thickness alone is not enough for selection",
        text:
          "Buyers should also consider width, basis weight, acid absorption behavior, electrical resistance, porosity and mechanical strength. These parameters should match the battery design and production process."
      }
    ],
    parameters: [
      ["Thickness", "Connected with plate design, compression and assembly requirements."],
      ["Width or sheet size", "Confirmed according to roll feeding, cutting or direct assembly needs."],
      ["Basis weight", "Reviewed with separator structure and electrolyte-retention expectations."],
      ["Acid absorption", "Discussed according to battery application and test requirements."],
      ["Electrical resistance", "Confirmed with battery performance targets and test conditions."],
      ["Mechanical strength", "Important for roll handling, cutting and assembly processes."]
    ],
    formats: {
      eyebrow: "Roll vs Sheet",
      title: "Choose the supply format according to production workflow",
      items: [
        [
          "AGM separator rolls",
          "Rolls are suitable for continuous production, further slitting and in-house cutting before assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "Finished AGM separator roll"
        ],
        [
          "AGM separator sheets",
          "Sheets are convenient for direct assembly, small batches, sample review and customized battery models.",
          "/images/sheets1-900.webp",
          "AGM separator sheets"
        ]
      ]
    },
    checklist: {
      eyebrow: "Buyer Checklist",
      title: "Information to prepare before asking for quotation",
      text:
        "If you are sourcing AGM separators, prepare these details before sending an inquiry so the specification discussion can move faster.",
      items: [
        "Target thickness",
        "Width or sheet size",
        "Roll or sheet type",
        "Battery application",
        "Required test items",
        "Sample or reference information"
      ]
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with product and quality details",
      items: [
        ["AGM Separator Product", "/products/agm-separator/"],
        ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
        ["AGM Separator Sheets", "/products/agm-separator-sheets/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]
      ]
    },
    inquiry: {
      eyebrow: "Inquiry",
      title: "Send your AGM separator sourcing question",
      text:
        "Share your battery application and target separator information. Our team can discuss roll or sheet format, sample needs and the next step for quotation.",
      checklist: [
        "Battery application or model",
        "Thickness and width or sheet size",
        "Roll or sheet preference",
        "Test items or quality requirements"
      ],
      fields: {
        name: "Name",
        company: "Company",
        email: "Email",
        country: "Country",
        application: "Battery Application",
        message: "Message"
      },
      placeholders: {
        name: "Your full name",
        company: "Company name",
        email: "name@company.com",
        country: "Country / region",
        application: "VRLA, UPS, telecom, motorcycle...",
        message:
          "Battery application, target thickness, width or sheet size, roll/sheet type and required test items"
      },
      submit: "Send Inquiry",
      submitting: "Sending...",
      required: "Please complete all required fields before submitting.",
      success:
        "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      failure:
        "Sorry, the inquiry could not be sent right now. Please try again later.",
      emailFallback:
        "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    footer: {
      description:
        "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      wechat: "Official WeChat account",
      mobile: "Mobile website"
    }
  },
  zh: {
    nav: {
      company: "公司",
      products: "产品",
      applications: "应用",
      quality: "质量",
      resources: "资料",
      contact: "联系"
    },
    language: "EN",
    homePath: "/zh/",
    languagePath: "/blog/what-is-agm-separator/",
    brandName: "湖北维京科技有限公司",
    quote: "获取报价",
    hero: {
      eyebrow: "AGM 隔板指南",
      title: "什么是 AGM 隔板？",
      subtitle:
        "面向新买家、贸易商和工程人员的实用说明，帮助理解 VRLA 铅酸电池中的 AGM 玻璃纤维隔板。",
      primary: "索取 AGM 隔板指南",
      secondary: "发送电池应用信息"
    },
    intro: [
      "AGM 是 Absorbent Glass Mat 的缩写。在电池隔板行业中，AGM 隔板通常指用于 VRLA 铅酸电池的玻璃纤维隔板。",
      "它放置在正负极板之间，用于防止极板直接接触，同时帮助电解液保持在电池结构内部。"
    ],
    sections: [
      {
        eyebrow: "定义",
        title: "AGM 隔板是一种玻璃纤维电池隔板",
        text:
          "AGM 隔板用于阀控式铅酸电池结构，电解液被保持在多孔玻璃纤维毡中。它既是物理隔离材料，也是电池内部的电解液保持材料。"
      },
      {
        eyebrow: "电池中的作用",
        title: "隔离极板并帮助保持电解液",
        text:
          "在 VRLA 铅酸电池中，隔板需要让正负极板保持隔离，同时支持电解液分布。合适的隔板会影响装配工艺、内阻以及长期电池性能。"
      },
      {
        eyebrow: "关键参数",
        title: "选择隔板不能只看厚度",
        text:
          "买家还需要关注宽度、克重、吸酸行为、电阻、孔隙率和机械强度等参数。这些参数应与电池设计和生产工艺匹配。"
      }
    ],
    parameters: [
      ["厚度", "与极板设计、压缩状态和装配要求相关。"],
      ["宽度或片材尺寸", "根据卷材上料、裁切或直接装配需求确认。"],
      ["克重", "需要结合隔板结构和电解液保持需求进行评估。"],
      ["吸酸性能", "根据电池应用和测试要求进行沟通。"],
      ["电阻", "结合电池性能目标和测试条件确认。"],
      ["机械强度", "对卷材搬运、裁切和装配过程很重要。"]
    ],
    formats: {
      eyebrow: "卷材与片材",
      title: "根据生产流程选择供应形式",
      items: [
        [
          "AGM 隔板卷材",
          "卷材适合连续生产、进一步分切以及装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板成品卷"
        ],
        [
          "AGM 隔板片材",
          "片材适合直接装配、小批量需求、样品评估和定制电池型号。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材"
        ]
      ]
    },
    checklist: {
      eyebrow: "买家清单",
      title: "询价前建议准备的信息",
      text:
        "如果您正在采购 AGM 隔板，建议在询盘前准备以下信息，以便更快开展规格沟通。",
      items: [
        "目标厚度",
        "宽度或片材尺寸",
        "卷材或片材形式",
        "电池应用",
        "所需检测项目",
        "样品或参考信息"
      ]
    },
    related: {
      eyebrow: "相关页面",
      title: "继续查看产品和质量信息",
      items: [
        ["AGM 隔板产品", "/zh/products/agm-separator/"],
        ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
        ["AGM 隔板片材", "/zh/products/agm-separator-sheets/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
      ]
    },
    inquiry: {
      eyebrow: "询盘",
      title: "发送 AGM 隔板采购问题",
      text:
        "请提供您的电池应用和目标隔板信息。我们可以围绕卷材或片材形式、样品需求和报价下一步进行沟通。",
      checklist: [
        "电池应用或型号",
        "厚度、宽度或片材尺寸",
        "卷材或片材偏好",
        "检测项目或质量要求"
      ],
      fields: {
        name: "姓名",
        company: "公司",
        email: "邮箱",
        country: "国家/地区",
        application: "电池应用",
        message: "留言"
      },
      placeholders: {
        name: "您的姓名",
        company: "公司名称",
        email: "name@company.com",
        country: "国家或地区",
        application: "VRLA、UPS、通信、摩托车等",
        message: "电池应用、目标厚度、宽度或片材尺寸、卷材/片材形式和所需检测项目"
      },
      submit: "发送询盘",
      submitting: "发送中...",
      required: "请先填写所有必填字段。",
      success: "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      failure: "抱歉，询盘暂时未能发送，请稍后再试。",
      emailFallback:
        "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    footer: {
      description:
        "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      wechat: "官方微信公众号",
      mobile: "移动官网"
    }
  }
} as const;

const keyTechnicalCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/key-technical-parameters-of-agm-separator/",
    brandName: articleCopy.en.brandName,
    quote: "Request a Quote",
    hero: {
      eyebrow: "Technical Parameters",
      title: "Key Technical Parameters of AGM Separator",
      subtitle:
        "A buyer-friendly guide to AGM separator thickness, basis weight, acid absorption, electrical resistance, porosity and mechanical strength.",
      primary: "Send Technical Parameters",
      secondary: "Request Specification Review",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "AGM separator quality control and technical parameter review",
        width: 1200,
        height: 900
      }
    },
    intro: [
      "When evaluating AGM separators, buyers should look at a group of parameters rather than one single number. Thickness, basis weight, acid absorption behavior, electrical resistance, porosity and mechanical strength all affect how the separator works in a VRLA lead-acid battery.",
      "The best specification depends on the customer’s battery design, plate spacing, assembly process and application requirements. Technical values should be reviewed together before sample or order confirmation."
    ],
    sections: [
      {
        eyebrow: "Thickness and Dimensions",
        title: "Thickness and size should match battery design",
        text:
          "Thickness and dimensions are connected with plate spacing, compression, roll feeding, cutting and direct assembly. Buyers should confirm thickness, width or sheet size according to the battery structure and production process."
      },
      {
        eyebrow: "Basis Weight",
        title: "Basis weight helps describe material mass and consistency",
        text:
          "Basis weight is one way to discuss separator material mass and batch consistency. It should be reviewed together with thickness, separator structure and electrolyte-retention expectations."
      },
      {
        eyebrow: "Acid Absorption / Wetting",
        title: "Acid-related behavior is tied to electrolyte retention",
        text:
          "Acid absorption and wetting behavior are related to electrolyte retention and distribution inside the VRLA battery. The exact requirement should follow the customer’s battery design and test method."
      },
      {
        eyebrow: "Electrical Resistance",
        title: "Electrical resistance affects ion movement in electrolyte",
        text:
          "Electrical resistance reflects how the separator affects ion movement through the electrolyte. It should be reviewed with battery performance targets and agreed test conditions."
      },
      {
        eyebrow: "Porosity and Pore Structure",
        title: "Porosity influences electrolyte movement",
        text:
          "Porosity and pore structure influence electrolyte movement and separator function. Buyers should discuss these values together with acid-related behavior and battery application."
      },
      {
        eyebrow: "Mechanical Strength",
        title: "Strength matters during handling, slitting and assembly",
        text:
          "Mechanical strength is important during roll handling, slitting, cutting and battery assembly. The requirement should match the customer’s production workflow and separator format."
      }
    ],
    parameters: [
      ["Thickness", "Connected with plate spacing, compression and assembly requirements."],
      ["Basis weight", "Used to discuss material mass and consistency."],
      ["Acid absorption / wetting", "Related to electrolyte retention and distribution."],
      ["Electrical resistance", "Reviewed with battery performance targets and test conditions."],
      ["Porosity", "Influences electrolyte movement and separator function."],
      ["Mechanical strength", "Important for handling, slitting, cutting and assembly."]
    ],
    formats: {
      eyebrow: "Specification Review",
      title: "Technical parameters should be reviewed together",
      items: [
        [
          "Roll material discussion",
          "Roll format requirements should include width, thickness, production workflow and any target technical parameters.",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM separator roll for technical parameter discussion"
        ],
        [
          "Sheet material discussion",
          "Sheet format requirements should include sheet size, thickness, battery model and sample or drawing reference when available.",
          "/images/sheets1-900.webp",
          "AGM separator sheets for technical parameter discussion"
        ]
      ]
    },
    checklist: {
      eyebrow: "Quotation Information",
      title: "What to send for specification review",
      text:
        "Please send your target separator information so the technical discussion can match the battery design and production process.",
      items: [
        "Required thickness",
        "Width or sheet size",
        "Roll or sheet type",
        "Battery application",
        "Target technical parameters",
        "Sample or drawing reference"
      ]
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with product and quality details",
      items: [
        ["What Is AGM Separator?", "/blog/what-is-agm-separator/"],
        ["AGM Separator Product", "/products/agm-separator/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Send your AGM separator technical parameters",
      text:
        "Share your target thickness, width, roll or sheet type, battery application and technical parameter requirements for review.",
      checklist: [
        "Required thickness and width",
        "Roll or sheet type",
        "Battery application",
        "Target technical parameters"
      ],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        message:
          "Required thickness, width, roll or sheet type, battery application and target technical parameters"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/key-technical-parameters-of-agm-separator/",
    brandName: articleCopy.zh.brandName,
    quote: "获取报价",
    hero: {
      eyebrow: "技术参数",
      title: "AGM 隔板关键技术参数",
      subtitle:
        "用便于采购和技术沟通的语言，说明 AGM 隔板厚度、克重、吸酸/润湿、电阻、孔隙率和机械强度等关键参数。",
      primary: "发送技术参数",
      secondary: "申请规格评审",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "AGM 隔板质量控制与技术参数评审",
        width: 1200,
        height: 900
      }
    },
    intro: [
      "评估 AGM 隔板时，买家不应只看单一数值。厚度、克重、吸酸行为、电阻、孔隙率和机械强度都会影响隔板在 VRLA 铅酸电池中的表现。",
      "合适的规格取决于客户电池设计、极板间距、装配工艺和应用要求。技术参数应在样品或订单确认前共同评审。"
    ],
    sections: [
      {
        eyebrow: "厚度与尺寸",
        title: "厚度和尺寸应匹配电池设计",
        text:
          "厚度和尺寸与极板间距、压缩状态、卷材上料、裁切和直接装配有关。买家应根据电池结构和生产工艺确认厚度、宽度或片材尺寸。"
      },
      {
        eyebrow: "克重",
        title: "克重有助于描述材料质量和一致性",
        text:
          "克重是沟通隔板材料质量和批次一致性的方式之一，应结合厚度、隔板结构和电解液保持需求共同评审。"
      },
      {
        eyebrow: "吸酸 / 润湿",
        title: "吸酸相关表现与电解液保持有关",
        text:
          "吸酸和润湿行为与 VRLA 电池内部电解液保持和分布有关。具体要求应结合客户电池设计和测试方法确认。"
      },
      {
        eyebrow: "电阻",
        title: "电阻影响电解液中的离子移动",
        text:
          "电阻反映隔板对电解液中离子移动的影响，应结合电池性能目标和约定测试条件进行评审。"
      },
      {
        eyebrow: "孔隙率与孔结构",
        title: "孔隙结构影响电解液移动",
        text:
          "孔隙率和孔结构会影响电解液移动和隔板功能，买家应结合吸酸相关表现和电池应用共同沟通。"
      },
      {
        eyebrow: "机械强度",
        title: "强度影响搬运、分切和装配过程",
        text:
          "机械强度对卷材搬运、分切、裁切和电池装配过程很重要，具体要求应匹配客户生产流程和隔板形式。"
      }
    ],
    parameters: [
      ["厚度", "与极板间距、压缩状态和装配要求有关。"],
      ["克重", "用于沟通材料质量和一致性。"],
      ["吸酸 / 润湿", "与电解液保持和分布有关。"],
      ["电阻", "结合电池性能目标和测试条件评审。"],
      ["孔隙率", "影响电解液移动和隔板功能。"],
      ["机械强度", "对搬运、分切、裁切和装配过程很重要。"]
    ],
    formats: {
      eyebrow: "规格评审",
      title: "技术参数应结合整体规格共同评审",
      items: [
        [
          "卷材规格沟通",
          "卷材需求应包含宽度、厚度、生产流程和目标技术参数。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板卷材技术参数沟通"
        ],
        [
          "片材规格沟通",
          "片材需求应包含片材尺寸、厚度、电池型号，以及可提供的样品或图纸参考。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材技术参数沟通"
        ]
      ]
    },
    checklist: {
      eyebrow: "报价信息",
      title: "规格评审前建议提供的信息",
      text:
        "请提供目标隔板信息，便于技术沟通与电池设计和生产工艺匹配。",
      items: [
        "所需厚度",
        "宽度或片材尺寸",
        "卷材或片材形式",
        "电池应用",
        "目标技术参数",
        "样品或图纸参考"
      ]
    },
    related: {
      eyebrow: "相关页面",
      title: "继续查看产品和质量信息",
      items: [
        ["什么是 AGM 隔板？", "/zh/blog/what-is-agm-separator/"],
        ["AGM 隔板产品", "/zh/products/agm-separator/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["VRLA 电池应用", "/zh/applications/agm-separator-for-vrla-battery/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "发送 AGM 隔板技术参数需求",
      text:
        "请提供目标厚度、宽度、卷材或片材形式、电池应用和技术参数要求，便于我们进行规格评审。",
      checklist: [
        "所需厚度和宽度",
        "卷材或片材形式",
        "电池应用",
        "目标技术参数"
      ],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        message:
          "所需厚度、宽度、卷材或片材形式、电池应用和目标技术参数"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const howToChooseCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/how-to-choose-agm-separator/",
    brandName: articleCopy.en.brandName,
    quote: "Request a Quote",
    hero: {
      eyebrow: "Buyer Checklist",
      title: "How to Choose AGM Separator",
      subtitle:
        "A practical checklist for choosing AGM separators by battery application, roll or sheet type, dimensions, technical parameters and quality requirements.",
      primary: "Send Inquiry Checklist",
      secondary: "Request Sample Support",
      image: {
        src: "/images/viking-finished-separator-roll-900.webp",
        alt: "AGM separator roll for supplier selection",
        width: 900,
        height: 675
      }
    },
    intro: [
      "Choosing an AGM separator starts with the battery, not with the separator alone. A UPS battery, telecom battery, motorcycle battery or energy storage battery may require different separator specifications.",
      "A practical sourcing discussion should confirm the product form, dimensions, technical parameters, sample information and quality requirements before quotation or sample arrangement."
    ],
    sections: [
      {
        eyebrow: "Battery Application",
        title: "Start from the battery application",
        text:
          "Different VRLA battery applications can have different plate design, assembly process and performance priorities. Start by telling the supplier whether the separator will be used for UPS, telecom, motorcycle, e-bike, energy storage or another lead-acid battery application."
      },
      {
        eyebrow: "Roll or Sheet Type",
        title: "Confirm whether you need rolls or sheets",
        text:
          "Rolls are usually discussed for continuous production, slitting or in-house cutting. Sheets are convenient for direct assembly, sample review, small batches or customized battery models."
      },
      {
        eyebrow: "Dimensions",
        title: "Confirm thickness, width or sheet size",
        text:
          "Thickness and dimensions should match battery design, plate spacing and production workflow. If an existing separator is already in use, a sample, drawing or specification sheet can help the supplier review the requirement."
      },
      {
        eyebrow: "Technical Parameters",
        title: "Review the technical parameters together",
        text:
          "Basis weight, acid absorption behavior, electrical resistance, porosity and mechanical strength should be reviewed with the battery design and production process rather than as isolated numbers."
      },
      {
        eyebrow: "Samples and Quality Checks",
        title: "Confirm samples and customer-specific quality checks",
        text:
          "For new projects, technical parameters should be confirmed through sample testing and battery design review. Quality checks can be performed according to customer requirements after the test items are agreed."
      }
    ],
    parameters: [
      ["Battery application", "UPS, telecom, motorcycle, e-bike, energy storage or automotive starting battery."],
      ["Product form", "Rolls, sheets or both formats according to production workflow."],
      ["Dimensions", "Thickness, width, sheet size or other drawing-based dimensions."],
      ["Technical parameters", "Basis weight, acid absorption, resistance, porosity and mechanical strength."],
      ["Reference material", "Existing sample, drawing or specification sheet when available."],
      ["Quality requirements", "Customer-required test items and review priorities."]
    ],
    formats: {
      eyebrow: "Roll vs Sheet",
      title: "Choose the supply format according to your production workflow",
      items: [
        [
          "Roll format",
          "Suitable for continuous production, further slitting and in-house cutting before battery assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM separator roll for VRLA battery production"
        ],
        [
          "Sheet format",
          "Useful for direct assembly, sample review, customized battery models and smaller batch discussion.",
          "/images/sheets1-900.webp",
          "AGM separator sheet pieces for battery assembly"
        ]
      ]
    },
    checklist: {
      eyebrow: "Inquiry Form Checklist",
      title: "Prepare these details before asking for quotation",
      text:
        "The clearer the inquiry information, the easier it is to review separator fit and quotation direction.",
      items: [
        "Battery application",
        "Roll or sheet type",
        "Thickness",
        "Width or sheet size",
        "Target technical parameters",
        "Sample or specification reference"
      ]
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with product and technical details",
      items: [
        ["AGM Separator Product", "/products/agm-separator/"],
        ["Key Technical Parameters", "/blog/key-technical-parameters-of-agm-separator/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Send your AGM separator inquiry checklist",
      text:
        "Share your battery application, product form, dimensions and quality requirements so we can discuss the next specification review step.",
      checklist: [
        "Battery application",
        "Roll or sheet type",
        "Thickness and width or sheet size",
        "Quality or sample requirements"
      ],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        message:
          "Battery application, roll or sheet type, thickness, width or sheet size, technical parameters and sample requirements"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/how-to-choose-agm-separator/",
    brandName: articleCopy.zh.brandName,
    quote: "获取报价",
    hero: {
      eyebrow: "买家清单",
      title: "如何选择 AGM 隔板",
      subtitle:
        "从电池应用、卷材或片材形式、尺寸、技术参数和质量要求出发，帮助买家更清晰地沟通 AGM 隔板需求。",
      primary: "发送询盘清单",
      secondary: "申请样品支持",
      image: {
        src: "/images/viking-finished-separator-roll-900.webp",
        alt: "用于供应商沟通的 AGM 隔板卷材",
        width: 900,
        height: 675
      }
    },
    intro: [
      "选择 AGM 隔板应从电池开始，而不是只看隔板本身。UPS 电池、通信电池、摩托车电池或储能电池可能需要不同的隔板规格。",
      "实际采购沟通中，应在报价或样品安排前确认产品形式、尺寸、技术参数、样品信息和质量要求。"
    ],
    sections: [
      {
        eyebrow: "电池应用",
        title: "先从电池应用开始",
        text:
          "不同 VRLA 电池应用在极板设计、装配工艺和性能重点上可能不同。请先说明隔板用于 UPS、通信、摩托车、电动车、储能或其他铅酸电池应用。"
      },
      {
        eyebrow: "卷材或片材",
        title: "确认需要卷材还是片材",
        text:
          "卷材通常用于连续生产、分切或厂内裁切。片材适合直接装配、样品评审、小批量或定制电池型号沟通。"
      },
      {
        eyebrow: "尺寸",
        title: "确认厚度、宽度或片材尺寸",
        text:
          "厚度和尺寸应匹配电池设计、极板间距和生产流程。如果已有隔板在使用，样品、图纸或规格书可帮助供应商评审需求。"
      },
      {
        eyebrow: "技术参数",
        title: "共同评审关键技术参数",
        text:
          "克重、吸酸行为、电阻、孔隙率和机械强度应结合电池设计和生产工艺共同评审，而不是孤立看单个数值。"
      },
      {
        eyebrow: "样品与质量检查",
        title: "确认样品和按客户要求的质量检查",
        text:
          "新项目的技术参数通常需要结合样品测试和电池设计评审确认。质量检查可在测试项目约定后按客户要求进行沟通。"
      }
    ],
    parameters: [
      ["电池应用", "UPS、通信、摩托车、电动车、储能或汽车启动电池。"],
      ["产品形式", "按生产流程确认卷材、片材或两种形式。"],
      ["尺寸", "厚度、宽度、片材尺寸或图纸相关尺寸。"],
      ["技术参数", "克重、吸酸、电阻、孔隙率和机械强度。"],
      ["参考资料", "如有现有样品、图纸或规格书，可一并提供。"],
      ["质量要求", "客户要求的测试项目和评审重点。"]
    ],
    formats: {
      eyebrow: "卷材或片材",
      title: "根据生产流程选择供应形式",
      items: [
        [
          "卷材形式",
          "适用于连续生产、后续分切和电池装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "用于 VRLA 电池生产的 AGM 隔板卷材"
        ],
        [
          "片材形式",
          "适用于直接装配、样品评审、定制电池型号和小批量需求沟通。",
          "/images/sheets1-900.webp",
          "用于电池装配的 AGM 隔板片材"
        ]
      ]
    },
    checklist: {
      eyebrow: "询盘清单",
      title: "报价前建议准备这些信息",
      text:
        "询盘信息越清晰，越有利于供应商评审隔板匹配度和报价方向。",
      items: [
        "电池应用",
        "卷材或片材形式",
        "厚度",
        "宽度或片材尺寸",
        "目标技术参数",
        "样品或规格参考"
      ]
    },
    related: {
      eyebrow: "相关页面",
      title: "继续查看产品和技术信息",
      items: [
        ["AGM 隔板产品", "/zh/products/agm-separator/"],
        ["AGM 隔板技术参数", "/zh/blog/key-technical-parameters-of-agm-separator/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["VRLA 电池应用", "/zh/applications/agm-separator-for-vrla-battery/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "发送 AGM 隔板询盘清单",
      text:
        "请提供电池应用、产品形式、尺寸和质量要求，便于我们沟通下一步规格评审。",
      checklist: [
        "电池应用",
        "卷材或片材形式",
        "厚度和宽度或片材尺寸",
        "质量或样品要求"
      ],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        message:
          "电池应用、卷材或片材形式、厚度、宽度或片材尺寸、技术参数和样品需求"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const manufacturingDeliveryCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/agm-separator-manufacturing-quality-delivery/",
    brandName: articleCopy.en.brandName,
    quote: "Request a Quote",
    hero: {
      eyebrow: "AGM Separator Manufacturing",
      title: "AGM Separator Manufacturing: Production, Quality Control and Reliable Delivery",
      subtitle:
        "How Hubei Viking turns stable AGM separator production, inspection and delivery into everyday manufacturing discipline.",
      primary: "Discuss Separator Requirements",
      secondary: "View Delivery Checklist",
      image: {
        src: "/images/agm-hero-production-1600.webp",
        alt: "AGM separator manufacturing line at Hubei Viking",
        width: 1600,
        height: 1000
      }
    },
    intro: [
      "In the lead-acid battery industry, stability is not a slogan. It is built through daily production control, inspection discipline and reliable delivery follow-up.",
      "Hubei Viking focuses on AGM glass fiber separator manufacturing and serves battery customers with a real factory, stable quality and practical communication."
    ],
    sections: [
      {
        eyebrow: "Company Introduction",
        title: "Focused AGM separator manufacturing for VRLA battery customers",
        text:
          "AGM separators are widely used in VRLA lead-acid batteries, where they separate plates and help absorb and retain electrolyte. For battery producers, the separator is not a simple accessory; it affects assembly fit, stability and batch consistency. Viking keeps its attention on AGM separator manufacturing so the product, production process and service can be improved around practical customer requirements."
      },
      {
        eyebrow: "Real Factory",
        title: "A visible manufacturing base is the starting point of trust",
        text:
          "Manufacturing confidence comes from the site: the factory area, workshop, production line, warehouse and daily operating order. Viking uses real factory scenes and actual production capability as the basis for supplier discussion, so cooperation is supported by visible manufacturing execution rather than brochure language alone."
      },
      {
        eyebrow: "Quality Control",
        title: "Stable quality is the basic respect for B2B customers",
        text:
          "For AGM separators, customers care about specific questions: whether the product is stable, whether batches are consistent, whether dimensions match and whether later production will be easier to manage. Viking pays attention to process details and inspection before delivery, aiming to reduce customer communication cost, trial-and-error cost and concern about batch variation."
      },
      {
        eyebrow: "Reliable Supply",
        title: "Stable supply is the long-term answer",
        text:
          "Long-term cooperation depends not only on one qualified batch, but on repeated delivery discipline. Viking supports specification discussion, roll or sheet format confirmation, packing communication and delivery follow-up so customers can plan procurement and production with fewer uncertainties."
      }
    ],
    parameters: [
      ["Focused product category", "AGM glass fiber separator rolls and sheets for VRLA lead-acid battery applications."],
      ["Manufacturing evidence", "Factory, workshop, roll handling, warehouse and shipment scenes are used for practical supplier review."],
      ["Quality attention", "Process control and inspection help improve consistency before delivery."],
      ["Specification discussion", "Thickness, width, roll format, sheet size, packing and application requirements can be reviewed with customers."],
      ["Delivery communication", "Batch supply, packing method and shipment schedule can be discussed around production needs."],
      ["Practical service", "Communication stays focused on real specifications, application direction and next steps for quotation."]
    ],
    formats: {
      eyebrow: "Production and Delivery Evidence",
      title: "From factory capability to packing follow-up",
      items: [
        [
          "Production and quality control",
          "AGM separator manufacturing requires stable process management and inspection discipline before material is released for customer review or delivery.",
          "/images/agm-quality-control-1200.webp",
          "AGM separator quality control at Hubei Viking"
        ],
        [
          "Roll storage and shipment preparation",
          "Finished rolls and shipment scenes help buyers understand packing, warehouse handling and delivery readiness.",
          "/images/evidence/shipping-pallet-01.webp",
          "AGM separator shipment preparation"
        ]
      ]
    },
    checklist: {
      eyebrow: "Supplier Discussion Checklist",
      title: "Information that helps production and delivery communication",
      text:
        "If you are looking for an AGM separator supplier, these details help both sides confirm the product direction and delivery expectations faster.",
      items: [
        "Battery application",
        "Roll or sheet format",
        "Thickness and width",
        "Target quantity",
        "Packing requirements",
        "Expected delivery schedule"
      ]
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with product, testing and buyer guides",
      items: [
        ["AGM Separator Product", "/products/agm-separator/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["What Is AGM Separator?", "/blog/what-is-agm-separator/"],
        ["How to Choose AGM Separator", "/blog/how-to-choose-agm-separator/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Contact Hubei Viking for AGM separator supply",
      text:
        "Share your application, roll or sheet format, dimensions, quantity and packing needs. Our team can discuss the next step for specification review and quotation.",
      checklist: [
        "AGM separator rolls or sheets",
        "Thickness, width or sheet size",
        "Battery application direction",
        "Packing and delivery requirements"
      ],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        application: "VRLA, UPS, motorcycle, automotive, energy storage...",
        message:
          "Product form, thickness, width or sheet size, quantity, packing and delivery requirements"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/agm-separator-manufacturing-quality-delivery/",
    brandName: articleCopy.zh.brandName,
    quote: "获取报价",
    hero: {
      eyebrow: "AGM 隔板制造",
      title: "湖北维京 AGM 隔板：生产、检测与稳定交付",
      subtitle:
        "一家传统工厂，如何把 AGM 隔板生产、检测与交付中的稳定性做到日常。",
      primary: "沟通隔板需求",
      secondary: "查看交付清单",
      image: {
        src: "/images/agm-hero-production-1600.webp",
        alt: "湖北维京 AGM 隔板生产线",
        width: 1600,
        height: 1000
      }
    },
    intro: [
      "在铅酸蓄电池行业，稳定从来不是一句口号，而是从生产、检测到交付的持续兑现。",
      "湖北维京专注 AGM 玻璃纤维隔板制造，以真实工厂、稳定品质与务实服务，回应每一次合作的信任。"
    ],
    sections: [
      {
        eyebrow: "企业介绍",
        title: "专注 AGM 隔板制造，服务 VRLA 铅酸电池客户",
        text:
          "AGM 隔板广泛应用于 VRLA 阀控式铅酸蓄电池中，承担隔离极板、吸附并保持电解液的重要作用。它不是普通辅材，而是影响电池装配适配性、使用稳定性与一致性的关键部分。湖北维京长期聚焦 AGM 隔板制造，持续围绕客户需求优化产品、生产与服务。"
      },
      {
        eyebrow: "真实工厂",
        title: "真实工厂，是信任的起点",
        text:
          "制造业的底气来自现场。从厂区到车间，从生产线到仓储，每一个环节是否清晰、稳定、有序，都会影响客户对供应商的判断。维京坚持以真实工厂、真实生产、真实交付作为基础，让合作落到看得见的制造能力与执行能力上。"
      },
      {
        eyebrow: "品质稳定",
        title: "品质稳定，是最基本的尊重",
        text:
          "对于 AGM 隔板来说，客户关心的是产品是否稳定、批次是否一致、尺寸是否匹配、后续使用是否更省心。维京重视质量控制，从生产细节管理到检测环节把关，持续关注产品一致性与可靠性，希望把问题尽量解决在交付之前。"
      },
      {
        eyebrow: "稳定供应",
        title: "稳定供应，才是长期的答案",
        text:
          "长期合作依靠的不只是某一次合格，而是一次又一次把交付做到位。维京围绕规格沟通、卷材或片材形式确认、包装方式、批次供应和交付节奏与客户配合，帮助客户减少采购和生产安排中的不确定性。"
      }
    ],
    parameters: [
      ["专注产品", "面向 VRLA 铅酸电池应用的 AGM 玻璃纤维隔板卷材和片材。"],
      ["制造证据", "以厂区、车间、卷材处理、仓储和出运场景支持客户供应商评估。"],
      ["质量关注", "通过过程控制和检测把关，帮助提升交付前的一致性。"],
      ["规格沟通", "可围绕厚度、宽度、卷材形式、片材尺寸、包装和应用要求进行确认。"],
      ["交付配合", "围绕批量供应、包装方式和出运节奏进行实际沟通。"],
      ["务实服务", "沟通聚焦真实规格、应用方向和报价下一步。"]
    ],
    formats: {
      eyebrow: "生产与交付证据",
      title: "从生产能力到包装出运",
      items: [
        [
          "生产与质量控制",
          "AGM 隔板制造需要稳定的过程管理和检测把关，材料放行前应尽量完成必要确认。",
          "/images/agm-quality-control-1200.webp",
          "湖北维京 AGM 隔板质量检测"
        ],
        [
          "卷材仓储与出运准备",
          "成品卷材和出运场景有助于客户了解包装、仓储处理和交付准备情况。",
          "/images/evidence/shipping-pallet-01.webp",
          "AGM 隔板出运准备"
        ]
      ]
    },
    checklist: {
      eyebrow: "供应商沟通清单",
      title: "有助于生产与交付沟通的信息",
      text:
        "如果您正在寻找 AGM 隔板供应商，以下信息可以帮助双方更快确认产品方向和交付预期。",
      items: [
        "电池应用",
        "卷材或片材形式",
        "厚度和宽度",
        "目标数量",
        "包装要求",
        "期望交期"
      ]
    },
    related: {
      eyebrow: "相关页面",
      title: "继续查看产品、检测与采购指南",
      items: [
        ["AGM 隔板产品", "/zh/products/agm-separator/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["什么是 AGM 隔板？", "/zh/blog/what-is-agm-separator/"],
        ["如何选择 AGM 隔板", "/zh/blog/how-to-choose-agm-separator/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "联系湖北维京沟通 AGM 隔板供应",
      text:
        "请提供您的应用方向、卷材或片材形式、尺寸、数量和包装需求，我们可以继续沟通规格评审与报价下一步。",
      checklist: [
        "AGM 隔板卷材或片材",
        "厚度、宽度或片材尺寸",
        "电池应用方向",
        "包装与交付要求"
      ],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        application: "VRLA、UPS、摩托车、汽车、储能等",
        message:
          "产品形式、厚度、宽度或片材尺寸、数量、包装和交付要求"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const performanceConsistencyCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/agm-separator-performance-consistency/",
    brandName: articleCopy.en.brandName,
    quote: "Request a Quote",
    hero: {
      eyebrow: "AGM Separator Selection",
      title: "Why Do Some Lead-Acid Batteries Run More Consistently Than Others?",
      subtitle:
        "For AGM separator sourcing, thickness matters, but conductivity support, fit under compression and batch consistency often decide what happens after samples move into assembly.",
      primary: "Discuss Your Battery Application",
      secondary: "View Buyer Checklist",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "AGM separator quality inspection at Hubei Viking",
        width: 1200,
        height: 900
      }
    },
    intro: [
      "In a VRLA lead-acid battery project, AGM separator is rarely the most expensive material, but it can affect whether assembly runs smoothly, whether batches remain consistent and how much rework a team needs later.",
      "Thickness, price and delivery time are useful starting points. The more important question is whether the separator can be matched consistently to the battery design and production process after sampling moves into volume supply."
    ],
    sections: [
      {
        eyebrow: "Conductivity Support",
        title: "Charging and discharging consistency depends on more than one visible parameter",
        text:
          "AGM separator is both a physical barrier and an electrolyte-retention structure. Its absorption behavior, internal structure and electrical-resistance-related performance need to be evaluated together with the battery design. A sample may be workable with manual adjustment, while continuous assembly can reveal differences in compression, fit and operating consistency."
      },
      {
        eyebrow: "Fit Under Compression",
        title: "Stable fit makes assembly easier to control",
        text:
          "Separator stability affects more than conductivity support. During assembly and later charge-discharge cycles, internal battery components remain under changing pressure and contact conditions. When fit and structural support are less consistent, teams may spend more time adjusting assembly conditions and handling variation."
      },
      {
        eyebrow: "Batch Consistency",
        title: "The real risk in procurement is often variation between batches",
        text:
          "A first sample can meet the target while later batches introduce differences in thickness, dimensions or other agreed characteristics. In volume projects, those differences can increase adjustment work, communication cost and uncertainty in the production line. The value of a separator supplier is not one attractive sample, but repeatable supply within confirmed requirements."
      },
      {
        eyebrow: "Buyer Questions",
        title: "Ask about application matching, not only price",
        text:
          "A practical supplier conversation should cover the battery application, intended separator format, dimensions, test focus, packing and the path from trial samples to volume delivery. These basic questions help buyers understand whether a supplier can support a stable working relationship rather than simply quote one product."
      },
      {
        eyebrow: "Viking Approach",
        title: "The goal is to make the next production step easier",
        text:
          "Hubei Viking focuses on AGM separator supply for VRLA lead-acid battery applications. We can discuss rolls, sheets, thickness, width, sheet size and packing around the actual project. Our attention is not limited to dispatching one batch; it is to make sampling, assembly and later supply coordination clearer and more manageable."
      }
    ],
    parameters: [
      ["Battery application", "Confirm the battery type, production workflow and performance focus before selecting a separator direction."],
      ["Absorption and structure", "Review relevant material behavior with the battery design and agreed test conditions rather than relying on thickness alone."],
      ["Compression and fit", "Discuss plate design, assembly method and the fit expected during continuous production."],
      ["Batch control", "Confirm the key characteristics and acceptable ranges that matter to your line before moving from samples to volume supply."],
      ["Format and packing", "Clarify roll or sheet form, width or sheet size, packing method and handling needs."],
      ["Supply coordination", "Align trial samples, quantity, delivery rhythm and feedback process for the next stage."]
    ],
    formats: {
      eyebrow: "Manufacturing and Inspection",
      title: "Review the factory evidence behind a stable supply discussion",
      items: [
        [
          "Process and quality attention",
          "Production control and inspection provide the practical basis for reviewing consistency before material moves into customer sampling or delivery.",
          "/images/agm-quality-control-1200.webp",
          "AGM separator inspection at Hubei Viking"
        ],
        [
          "Roll handling and shipment readiness",
          "Warehouse and shipment preparation are part of the supply chain discussion, alongside the material specification itself.",
          "/images/evidence/agm-separator-roll-warehouse-01.webp",
          "AGM separator roll warehouse at Hubei Viking"
        ]
      ]
    },
    checklist: {
      eyebrow: "AGM Separator Buyer Checklist",
      title: "Four questions worth confirming before comparing quotations",
      text:
        "A useful comparison looks beyond a single thickness or price. Bring these points into the first supplier discussion to reduce uncertainty later in sampling and volume assembly.",
      items: [
        "Which battery application is this separator intended for?",
        "How will consistency be reviewed from samples to later batches?",
        "Can roll, sheet, dimensions and packing be matched to the assembly process?",
        "How will sampling, feedback and volume delivery be coordinated?"
      ]
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with product and technical information",
      items: [
        ["AGM Separator Product", "/products/agm-separator/"],
        ["Key Technical Parameters", "/blog/key-technical-parameters-of-agm-separator/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["How to Choose AGM Separator", "/blog/how-to-choose-agm-separator/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Discuss AGM separator fit and supply requirements",
      text:
        "Share your battery application, separator format, dimensions, quantity and any test or packing considerations. We can discuss the next step for specification review and quotation.",
      checklist: ["Battery application", "Roll or sheet format", "Dimensions and quantity", "Quality, packing or delivery requirements"],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        application: "VRLA, UPS, motorcycle, automotive, energy storage...",
        message: "Product form, dimensions, application, quantity, quality focus, packing and delivery requirements"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/agm-separator-performance-consistency/",
    brandName: articleCopy.zh.brandName,
    quote: "获取报价",
    hero: {
      eyebrow: "AGM 隔板选型",
      title: "同样是 AGM 隔板，为什么有的电池更稳，有的后期问题更多？",
      subtitle:
        "厚度是基础，但导通相关表现、受压贴合和批次一致性，往往更能决定隔板从打样到批量装配后的实际配套效果。",
      primary: "沟通电池应用",
      secondary: "查看采购清单",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "湖北维京 AGM 隔板质量检测",
        width: 1200,
        height: 900
      }
    },
    intro: [
      "在 VRLA 铅酸电池项目里，AGM 隔板通常不是最贵的材料，却经常影响后续装配顺不顺、批次稳不稳、返工多不多。",
      "厚度、价格和交期是选型的起点，但更需要判断的是：这款隔板能否在样品之后，持续匹配电池设计和实际生产流程。"
    ],
    sections: [
      {
        eyebrow: "导通相关表现",
        title: "充放电是否更顺，不能只看一个可见参数",
        text:
          "AGM 隔板既是隔离层，也是吸附并保持电解液的结构。吸液、内部结构和电阻等相关表现，需要结合电池设计一起评估。样品阶段可以通过人工调整完成装配，不代表连续装配时仍能保持相同的受压、贴合和运行一致性。"
      },
      {
        eyebrow: "受压贴合",
        title: "贴合稳定，装配过程才更容易控制",
        text:
          "隔板稳定性不只影响导通相关表现，也关系到结构贴合。装配过程和后续充放电中，电池内部部件持续处于变化的压力和接触条件下。贴合和结构支撑的一致性不足时，团队往往需要投入更多时间调整装配条件、处理波动。"
      },
      {
        eyebrow: "批次一致性",
        title: "采购真正担心的，往往是后续批次的波动",
        text:
          "第一次样品符合要求，不代表后续批次不会在厚度、尺寸或双方确认的其他关键表现上产生差异。对于批量项目，这类差异会增加调机、沟通和生产安排的不确定性。供应商的价值不在于一次样品好看，而在于能否围绕确认要求持续稳定地供货。"
      },
      {
        eyebrow: "采购沟通",
        title: "比起只问价格，更应该先问应用匹配",
        text:
          "一次务实的供应商沟通，应覆盖电池应用、隔板形式、尺寸、测试关注点、包装，以及从打样走向批量的配合方式。这些问题并不复杂，却能帮助采购和技术团队判断供应商是否能支持长期、稳定的配套关系。"
      },
      {
        eyebrow: "维京关注点",
        title: "目标是让客户的下一步生产更顺畅",
        text:
          "湖北维京专注 VRLA 铅酸电池用 AGM 隔板制造，可围绕卷材、片材、厚度、宽度、片材尺寸和包装方式进行沟通。我们关注的不只是发出一批产品，也希望让客户后续的打样、装配和批量协同更清楚、更易于管理。"
      }
    ],
    parameters: [
      ["电池应用", "选型前先确认电池类型、生产流程和性能关注点。"],
      ["吸液与结构", "结合电池设计和双方确认的测试条件评估相关材料表现，而不只看厚度。"],
      ["受压与贴合", "沟通极板设计、装配方式和连续生产中的贴合要求。"],
      ["批次控制", "从样品走向批量前，确认生产线真正关心的关键特性和可接受范围。"],
      ["形式与包装", "明确卷材或片材、宽度或片材尺寸、包装方式和搬运需求。"],
      ["供货协同", "提前对齐打样、数量、交付节奏和反馈流程。"]
    ],
    formats: {
      eyebrow: "生产与检测",
      title: "用真实制造和检测场景支持稳定供应沟通",
      items: [
        [
          "过程与质量关注",
          "生产过程控制和检测把关，是材料进入客户打样或交付前评估一致性的实际基础。",
          "/images/agm-quality-control-1200.webp",
          "湖北维京 AGM 隔板质量检测"
        ],
        [
          "卷材处理与出运准备",
          "仓储和出运准备也是供应链沟通的一部分，需要与产品规格一起确认。",
          "/images/evidence/agm-separator-roll-warehouse-01.webp",
          "湖北维京 AGM 隔板卷材仓储"
        ]
      ]
    },
    checklist: {
      eyebrow: "AGM 隔板采购清单",
      title: "比较报价前，建议先确认这 4 件事",
      text:
        "有价值的比较不止看单一厚度或单次价格。首次与供应商沟通时先把这些内容说清，可以减少后续打样和批量装配中的不确定性。",
      items: [
        "这款隔板更适合什么电池应用？",
        "从样品到后续批次，一致性如何确认？",
        "卷材、片材、尺寸和包装能否匹配装配流程？",
        "打样、反馈与批量交付如何协同？"
      ]
    },
    related: {
      eyebrow: "相关页面",
      title: "继续查看产品和技术信息",
      items: [
        ["AGM 隔板产品", "/zh/products/agm-separator/"],
        ["AGM 隔板技术参数", "/zh/blog/key-technical-parameters-of-agm-separator/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["如何选择 AGM 隔板", "/zh/blog/how-to-choose-agm-separator/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "沟通 AGM 隔板配套与供货需求",
      text:
        "请提供电池应用、隔板形式、尺寸、数量，以及测试、包装或交付方面的考虑，我们可以继续沟通规格评审与报价下一步。",
      checklist: ["电池应用", "卷材或片材形式", "尺寸与数量", "质量、包装或交付要求"],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        application: "VRLA、UPS、摩托车、汽车、储能等",
        message: "产品形式、尺寸、应用方向、数量、质量关注点、包装和交付要求"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const exportSupplyReadinessCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/agm-separator-export-supply-readiness/",
    brandName: articleCopy.en.brandName,
    quote: "Request a Quote",
    hero: {
      eyebrow: "AGM Separator Supply",
      title: "Lead-Acid Battery Exports Recovered in May. Is Your AGM Separator Supply Ready?",
      subtitle:
        "A May 2026 export rebound is a useful reminder: when order pace changes, delivery coordination, batch consistency and specification communication become more sensitive.",
      primary: "Discuss Supply Requirements",
      secondary: "View Buyer Checklist",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "AGM separator quality inspection at Hubei Viking",
        width: 1200,
        height: 900
      }
    },
    intro: [
      "China exported 20.6522 million lead-acid batteries in May 2026, up 7.73% month on month and 2.8% year on year. From January to May, cumulative exports were 85.9478 million units, down 8.86% year on year.",
      "The data points to a monthly improvement, while the cumulative picture remained under pressure. For battery manufacturers and export-oriented supply chains, this is less a market forecast than a practical reminder to review whether delivery, batch control and technical coordination can keep up when order rhythm changes."
    ],
    sections: [
      {
        eyebrow: "Export Snapshot",
        title: "A monthly recovery does not remove supply-chain pressure",
        text:
          "A positive monthly export movement suggests that overseas demand has not disappeared. At the same time, the year-to-date decline means buyers should read the data with context. When demand becomes less predictable, production teams need to be ready for tighter schedules and more frequent changes in purchasing plans."
      },
      {
        eyebrow: "When Orders Move Faster",
        title: "The first issue to surface is often not price",
        text:
          "When order volume or delivery pace increases, questions that were previously manageable can become operational risks: whether material lead time is dependable, whether later batches remain within agreed requirements, whether specifications are clear and whether a supplier can coordinate quickly when conditions change."
      },
      {
        eyebrow: "Why AGM Separator Matters",
        title: "Separator fit and consistency affect the wider assembly process",
        text:
          "AGM separator is not the most visible battery component, but it is connected with assembly fit, batch consistency and later production stability. Under a steady order rhythm, teams may have time to resolve variation through additional adjustment or communication. Under tighter delivery conditions, the same issues can turn into lower assembly efficiency, more coordination work and greater delivery risk."
      },
      {
        eyebrow: "Export Project Priorities",
        title: "Four supply questions matter before comparing a single quotation",
        text:
          "Export-oriented projects benefit from confirming four basics early: whether batches can be supplied consistently, whether specifications are communicated clearly, whether supply can continue at the required pace and whether the response path is clear if an issue needs attention. These questions are often more useful for long-term planning than a one-time price comparison."
      },
      {
        eyebrow: "Viking Supply Coordination",
        title: "Keep the next production step predictable",
        text:
          "Hubei Viking focuses on AGM separator manufacturing for VRLA lead-acid battery applications. We can discuss rolls, sheets, thickness, width, sheet size and packing based on the actual project. The goal is not only to confirm one available product, but to make batch supply, delivery planning and communication more predictable as requirements develop."
      }
    ],
    parameters: [
      ["May 2026 exports", "20.6522 million lead-acid batteries exported, up 7.73% month on month and 2.8% year on year."],
      ["January-May 2026 exports", "85.9478 million units cumulatively, down 8.86% year on year."],
      ["Batch consistency", "Confirm the characteristics and acceptable ranges that matter before moving from samples to volume supply."],
      ["Specification clarity", "Align roll or sheet type, dimensions, packing and application requirements before delivery pressure increases."],
      ["Supply continuity", "Discuss expected quantity, delivery rhythm and feedback process around the production plan."],
      ["Response coordination", "Agree on a practical communication path for sampling, batch follow-up and exceptions."]
    ],
    formats: {
      eyebrow: "Supply Readiness Evidence",
      title: "Quality review and shipment preparation support export coordination",
      items: [
        [
          "Quality control before delivery",
          "Process control and inspection help create a clearer basis for confirming material requirements before samples or batch deliveries move forward.",
          "/images/agm-quality-control-1200.webp",
          "AGM separator quality control at Hubei Viking"
        ],
        [
          "Warehouse and shipment preparation",
          "Roll handling, packing and shipment readiness are part of the supply discussion alongside the separator specification itself.",
          "/images/evidence/shipping-pallet-01.webp",
          "AGM separator shipment preparation"
        ]
      ]
    },
    checklist: {
      eyebrow: "Export Supply Checklist",
      title: "Four points to confirm before export demand becomes more urgent",
      text:
        "For export-oriented battery projects, use these questions to assess whether an AGM separator supplier can support the next stage of production and delivery planning.",
      items: [
        "Can later batches remain within confirmed requirements?",
        "Are product form, dimensions and packing requirements clear?",
        "Can supply continue at the expected delivery rhythm?",
        "Is there a clear communication path for sampling and batch follow-up?"
      ]
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with product, quality and supply information",
      items: [
        ["AGM Separator Product", "/products/agm-separator/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["Key Technical Parameters", "/blog/key-technical-parameters-of-agm-separator/"],
        ["Production, Quality Control and Delivery", "/blog/agm-separator-manufacturing-quality-delivery/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Discuss AGM separator supply for export-oriented projects",
      text:
        "Share your battery application, separator format, dimensions, quantity, packing and expected delivery schedule. We can discuss the next step for specification review and quotation.",
      checklist: ["Battery application", "Roll or sheet format", "Dimensions and quantity", "Packing and delivery requirements"],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        application: "VRLA, UPS, motorcycle, automotive, energy storage...",
        message: "Product form, dimensions, application, quantity, packing and expected delivery schedule"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/agm-separator-export-supply-readiness/",
    brandName: articleCopy.zh.brandName,
    quote: "获取报价",
    hero: {
      eyebrow: "AGM 隔板供应",
      title: "海外销量回升了，AGM 隔板配套跟得上吗？",
      subtitle:
        "2026 年 5 月出口量环比回升，提醒采购与技术团队：订单节奏变化时，交期、批次一致性和规格沟通会重新变得更敏感。",
      primary: "沟通供货需求",
      secondary: "查看采购清单",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "湖北维京 AGM 隔板质量检测",
        width: 1200,
        height: 900
      }
    },
    intro: [
      "2026 年 5 月，中国铅酸蓄电池出口量为 2065.22 万只，环比上升 7.73%，同比上升 2.8%；1-5 月累计出口量为 8594.78 万只，同比下降 8.86%。",
      "这组数据反映的是单月边际回升，而累计表现仍承压。对电池制造企业和出口配套链路来说，与其将它理解为市场预测，不如把它作为一次供应链复盘：订单节奏变化时，交期、批次控制和技术沟通是否跟得上。"
    ],
    sections: [
      {
        eyebrow: "出口数据",
        title: "单月回升，不等于供应链压力已经消失",
        text:
          "单月出口量的正向变化说明海外需求并未消失，但累计出口同比仍下降，也提醒我们需要结合全年的节奏看待数据。当需求更难预测时，生产和采购团队更要为交期收紧、采购计划调整等情况预留准备。"
      },
      {
        eyebrow: "订单节奏变化",
        title: "最先被放大的，往往不是价格",
        text:
          "订单量或交付节奏加快时，原来还能消化的问题可能迅速变成风险：交期是否可靠、后续批次能否保持在确认范围内、规格沟通是否清楚、供应商能否在条件变化时及时协同。"
      },
      {
        eyebrow: "AGM 隔板配套",
        title: "隔板适配与一致性，会影响更广的装配环节",
        text:
          "AGM 隔板虽然不是电池中最显眼的部分，却关系到装配适配、批次一致性和后续生产稳定性。订单节奏平稳时，一些波动还能靠额外调整和沟通消化；交付更紧时，同样的问题就可能转化为装配效率下降、协同成本上升和更高的交付风险。"
      },
      {
        eyebrow: "出口项目重点",
        title: "比较单次报价前，更值得先确认这 4 件事",
        text:
          "出口型项目应尽早确认四项基础：批次能否稳定供货、规格是否沟通清楚、供货能否按需要的节奏持续，以及出现问题时是否有明确的协同路径。对于长期配套，这些问题通常比一次性的报价比较更有价值。"
      },
      {
        eyebrow: "维京供货配合",
        title: "让下一步生产与交付更可预期",
        text:
          "湖北维京专注 VRLA 铅酸电池用 AGM 隔板制造，可围绕卷材、片材、厚度、宽度、片材尺寸和包装方式进行实际沟通。我们的目标不只是确认某一款产品是否可供，更希望随着项目推进，让批次供应、交期安排和沟通配合保持在可预期范围内。"
      }
    ],
    parameters: [
      ["2026 年 5 月出口", "出口量 2065.22 万只，环比上升 7.73%，同比上升 2.8%。"],
      ["2026 年 1-5 月累计出口", "累计出口量 8594.78 万只，同比下降 8.86%。"],
      ["批次一致性", "从样品走向批量前，确认生产线真正关心的特性和可接受范围。"],
      ["规格清晰度", "在交付压力增加前，对齐卷材或片材、尺寸、包装和应用要求。"],
      ["持续供货", "围绕生产计划沟通目标数量、交付节奏和反馈流程。"],
      ["协同响应", "为打样、批次跟进和异常情况提前建立务实的沟通路径。"]
    ],
    formats: {
      eyebrow: "供应准备证据",
      title: "检测与出运准备，支持出口配套协同",
      items: [
        [
          "交付前的质量确认",
          "过程控制和检测把关，有助于在样品或批量交付前更清楚地确认材料要求。",
          "/images/agm-quality-control-1200.webp",
          "湖北维京 AGM 隔板质量检测"
        ],
        [
          "仓储与出运准备",
          "卷材处理、包装和出运准备，需要与隔板规格一起纳入供应沟通。",
          "/images/evidence/shipping-pallet-01.webp",
          "湖北维京 AGM 隔板出运准备"
        ]
      ]
    },
    checklist: {
      eyebrow: "出口配套清单",
      title: "出口需求变紧前，建议先确认这 4 件事",
      text:
        "对于出口型电池项目，可用这些问题评估 AGM 隔板供应商是否能支持下一阶段的生产与交付安排。",
      items: [
        "后续批次能否保持在确认要求内？",
        "产品形式、尺寸和包装要求是否已沟通清楚？",
        "供货能否按预期交付节奏持续？",
        "打样和批次跟进是否有明确沟通路径？"
      ]
    },
    related: {
      eyebrow: "相关页面",
      title: "继续查看产品、质量与供应信息",
      items: [
        ["AGM 隔板产品", "/zh/products/agm-separator/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["AGM 隔板技术参数", "/zh/blog/key-technical-parameters-of-agm-separator/"],
        ["AGM 隔板生产、检测与交付", "/zh/blog/agm-separator-manufacturing-quality-delivery/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "沟通出口型项目的 AGM 隔板供货需求",
      text:
        "请提供电池应用、隔板形式、尺寸、数量、包装和期望交期，我们可以继续沟通规格评审与报价下一步。",
      checklist: ["电池应用", "卷材或片材形式", "尺寸与数量", "包装与交付要求"],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        application: "VRLA、UPS、摩托车、汽车、储能等",
        message: "产品形式、尺寸、应用方向、数量、包装和期望交期"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const upsVrlaTechnologySelectionCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/why-ups-projects-still-use-vrla-batteries/",
    brandName: articleCopy.en.brandName,
    quote: "Request a Sample",
    hero: {
      eyebrow: "UPS Battery Technology Selection",
      title: "Why Many UPS Projects Still Use VRLA Batteries",
      subtitle:
        "New battery technologies deserve attention, but real UPS projects still depend on system compatibility, maintenance capability, supply continuity and long-term operational control.",
      primary: "Discuss UPS Separator Requirements",
      secondary: "View the Buyer Checklist",
      image: {
        src: "/images/applications/ups-vrla-battery-application-1200.webp",
        alt: "AGM separator roll for UPS VRLA battery applications",
        width: 900,
        height: 675
      }
    },
    intro: [
      "Lithium-ion, sodium-ion and other emerging battery technologies are receiving more attention in UPS projects. Their development does not mean that every existing data-room, backup-power or retrofit project should immediately move away from valve-regulated lead-acid batteries.",
      "The practical decision is not simply which chemistry is newer. Project teams need to review whether the battery system matches the existing UPS, charging strategy, installation space, maintenance capability, replacement process and supply plan."
    ],
    sections: [
      {
        eyebrow: "01 · A Mature System",
        title: "Why VRLA still has a practical role in UPS projects",
        text:
          "Many installed UPS systems, maintenance procedures and replacement plans were developed around VRLA batteries. For these projects, a familiar operating model, established service capability and predictable replacement process can remain valuable. This does not make VRLA the right answer for every project; it explains why technical maturity and implementation risk still matter alongside energy density and new-technology interest."
      },
      {
        eyebrow: "02 · System Compatibility",
        title: "Changing battery chemistry affects more than the battery itself",
        text:
          "A battery-technology change can affect charging logic, battery management, cabinet layout, ventilation, protection settings, maintenance procedures and staff training. New installations may be designed around a different chemistry from the beginning. Retrofit and installed-base projects need a more detailed review because a battery replacement can create changes across the wider UPS system."
      },
      {
        eyebrow: "03 · Operational Stability",
        title: "The useful question is whether the complete system can be operated reliably",
        text:
          "Safety and reliability are system outcomes rather than simple labels attached to one battery chemistry. The technical route, equipment match, installation quality, monitoring, operating environment and maintenance capability all contribute to long-term performance. A project should therefore compare complete operating requirements instead of assuming that either a newer or a more established route is automatically better."
      },
      {
        eyebrow: "04 · AGM Separator Role",
        title: "When a UPS project uses VRLA, separator fit remains important",
        text:
          "In a VRLA battery, the AGM separator helps retain electrolyte, separate the plates and support ionic movement through its porous glass-fiber structure. Its thickness, absorption-related behavior, compression fit and batch consistency need to match the battery design and assembly process. Separator selection should therefore be evaluated together with the battery manufacturer's confirmed technical requirements."
      },
      {
        eyebrow: "05 · Procurement Review",
        title: "UPS battery buyers need more than a thickness and price comparison",
        text:
          "A sample can appear acceptable while later batches create additional adjustment or communication. Before volume supply, procurement and technical teams should confirm the application, roll or sheet format, dimensions, agreed quality characteristics, packing method and batch-control expectations. The objective is not to make one sample look convincing, but to keep later assembly and delivery manageable."
      },
      {
        eyebrow: "06 · Viking Coordination",
        title: "Match the separator to the current UPS battery project",
        text:
          "Hubei Viking manufactures AGM separator rolls and sheets for VRLA lead-acid battery applications. For UPS projects that continue to use VRLA, we can review application information, thickness, width or sheet size, sample requirements, packing and expected supply rhythm. The battery manufacturer remains responsible for final design validation, while our role is to make separator specification and supply communication clearer."
      }
    ],
    parameters: [
      ["UPS system fit", "Confirm the existing UPS, charging approach and battery design before changing the battery system."],
      ["Operating capability", "Review monitoring, maintenance procedures, training and the response path for abnormal conditions."],
      ["Separator specification", "Match thickness, width or sheet size and agreed quality characteristics to the battery design."],
      ["Compression and fit", "Discuss plate design and assembly conditions that affect separator fit under compression."],
      ["Batch consistency", "Define the characteristics and acceptable ranges that matter from sample review to volume supply."],
      ["Supply coordination", "Align product form, packing, quantity, delivery rhythm and technical feedback before batch orders."]
    ],
    formats: {
      eyebrow: "Manufacturing Evidence",
      title: "Production, inspection and delivery all support stable project coordination",
      items: [
        [
          "AGM separator roll production",
          "Roll production and finishing need to follow the confirmed product form, dimensions and handling requirements for the battery project.",
          "/images/cms/agm-separator-ups-application-forms-image-card-1.webp",
          "AGM separator roll production at Hubei Viking"
        ],
        [
          "Quality inspection",
          "Inspection provides a practical basis for reviewing agreed separator characteristics before samples or later batches are supplied.",
          "/images/cms/agm-separator-ups-application-forms-image-card-2.webp",
          "AGM separator quality inspection at Hubei Viking"
        ],
        [
          "Packing and delivery preparation",
          "Packing format, labeling and shipment preparation should be confirmed together with the separator specification.",
          "/images/evidence/shipping-pallet-01.webp",
          "AGM separator packing and shipment preparation"
        ]
      ]
    },
    checklist: {
      eyebrow: "UPS Project Buyer Checklist",
      title: "Six points to confirm when the project continues with VRLA",
      text:
        "Use this checklist to move the discussion from a general product request to a separator specification that can be reviewed against the actual UPS battery project.",
      items: [
        "UPS battery application and model",
        "Target thickness and width or sheet size",
        "Roll or sheet supply format",
        "Required quality characteristics and test conditions",
        "Sample validation and batch-control expectations",
        "Packing, quantity and delivery rhythm"
      ]
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with UPS, VRLA and separator quality information",
      items: [
        ["AGM Separator for UPS Batteries", "/applications/agm-separator-for-ups-battery/"],
        ["AGM Separator for VRLA Batteries", "/applications/agm-separator-for-vrla-battery/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["Why AGM Separator Consistency Matters", "/blog/agm-separator-performance-consistency/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Discuss AGM separator matching for your UPS battery project",
      text:
        "Share the UPS battery application, current separator specification, roll or sheet format, dimensions and sample requirements. We can continue with specification review and supply discussion.",
      checklist: [
        "UPS battery application or model",
        "Current thickness and dimensions",
        "Roll or sheet requirement",
        "Sample, packing and supply expectations"
      ],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        application: "UPS backup battery, data room, telecom backup...",
        message:
          "Current separator specification, roll/sheet format, dimensions, sample quantity, packing and supply requirements"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/why-ups-projects-still-use-vrla-batteries/",
    brandName: articleCopy.zh.brandName,
    quote: "申请样品",
    hero: {
      eyebrow: "UPS 电池技术选型",
      title: "UPS 机房都在谈锂电、钠电，为什么很多项目还在继续用 VRLA？",
      subtitle:
        "新技术路线值得关注，但真实 UPS 项目仍需评估系统匹配、运维能力、供应连续性和长期运行的可控程度。",
      primary: "沟通 UPS 隔板需求",
      secondary: "查看采购确认清单",
      image: {
        src: "/images/applications/ups-vrla-battery-application-1200.webp",
        alt: "用于 UPS VRLA 电池应用的 AGM 隔板卷材",
        width: 900,
        height: 675
      }
    },
    intro: [
      "锂电、钠电及其他新型电池技术正在获得更多 UPS 项目的关注，但这并不意味着所有存量机房、备电改造和既有系统都应立即离开阀控式铅酸电池体系。",
      "真实项目需要判断的并不只是技术路线是否更新，还包括电池体系与现有 UPS、充电策略、安装空间、运维能力、更换流程和供应计划是否匹配。"
    ],
    sections: [
      {
        eyebrow: "01 · 成熟体系",
        title: "为什么 VRLA 在 UPS 项目中仍有现实位置",
        text:
          "许多既有 UPS 系统、维护流程和更换方案本来就是围绕 VRLA 电池建立的。对这些项目来说，熟悉的运行方式、已有服务能力和可预期的更换流程仍具有现实价值。这并不代表 VRLA 适合所有项目，而是说明技术成熟度和实施风险需要与能量密度、新技术关注度一起评估。"
      },
      {
        eyebrow: "02 · 系统匹配",
        title: "切换电池路线影响的不只是电池本身",
        text:
          "电池技术路线变化可能同时影响充电逻辑、电池管理、机柜布局、通风、保护设置、维护流程和人员培训。新建项目可以从设计阶段围绕新体系规划；改造项目和存量系统则需要更细致的评估，因为一次电池替换可能带来整套 UPS 系统的连锁调整。"
      },
      {
        eyebrow: "03 · 运行稳定",
        title: "真正要判断的是整套系统能否长期稳定运行",
        text:
          "安全与可靠性是系统层面的结果，不能只用某一种电池材料来简单概括。技术路线、设备匹配、安装质量、监控能力、运行环境和维护条件都会影响长期表现。因此，项目应比较完整的运行要求，而不是默认更新的路线或更成熟的路线一定更好。"
      },
      {
        eyebrow: "04 · AGM 隔板",
        title: "当 UPS 项目继续使用 VRLA，隔板匹配仍然重要",
        text:
          "在 VRLA 电池中，AGM 隔板通过多孔玻璃纤维结构帮助保持电解液、隔离极板并支持离子传导。其厚度、吸液相关表现、受压贴合和批次一致性需要匹配电池设计与装配工艺，因此隔板选型应结合电池制造商已经确认的技术要求进行评估。"
      },
      {
        eyebrow: "05 · 采购确认",
        title: "UPS 电池采购不能只比较厚度和价格",
        text:
          "样品可以达到初步要求，后续批次却可能增加调整和沟通工作。进入批量供应前，采购和技术团队应确认电池应用、卷材或片材形式、尺寸、双方约定的质量特性、包装方式和批次控制要求。目标不是让一次样品看起来合格，而是让后续装配和交付保持可管理。"
      },
      {
        eyebrow: "06 · 维京配套",
        title: "围绕当前 UPS 电池项目匹配 AGM 隔板",
        text:
          "湖北维京面向 VRLA 铅酸电池应用生产 AGM 隔板卷材和片材。对于继续使用 VRLA 的 UPS 项目，我们可以沟通电池应用、厚度、宽度或片材尺寸、样品要求、包装和预期供货节奏。电池制造商负责最终设计验证，维京的工作是让隔板规格和供应沟通更加清晰。"
      }
    ],
    parameters: [
      ["UPS 系统匹配", "改变电池体系前，确认现有 UPS、充电方式和电池设计是否适配。"],
      ["运行与运维能力", "评估监控、维护流程、人员培训和异常情况的响应方式。"],
      ["隔板规格", "将厚度、宽度或片材尺寸及约定质量特性与电池设计对应。"],
      ["受压与贴合", "沟通极板设计及装配条件对隔板受压贴合的实际要求。"],
      ["批次一致性", "从样品评审到批量供应，明确真正需要控制的特性和接受范围。"],
      ["供货协同", "提前对齐产品形式、包装、数量、交付节奏和技术反馈流程。"]
    ],
    formats: {
      eyebrow: "制造与交付证据",
      title: "生产、检测和交付共同支持稳定的项目协同",
      items: [
        [
          "AGM 隔板卷材生产",
          "卷材生产和整理需要按照项目确认的产品形式、尺寸及搬运要求执行。",
          "/images/cms/agm-separator-ups-application-forms-image-card-1.webp",
          "湖北维京 AGM 隔板卷材生产"
        ],
        [
          "质量检测",
          "检测为样品及后续批次的约定特性评审提供实际依据。",
          "/images/cms/agm-separator-ups-application-forms-image-card-2.webp",
          "湖北维京 AGM 隔板质量检测"
        ],
        [
          "包装与出运准备",
          "包装形式、标签和出运准备应与隔板规格一并确认。",
          "/images/evidence/shipping-pallet-01.webp",
          "AGM 隔板包装与出运准备"
        ]
      ]
    },
    checklist: {
      eyebrow: "UPS 项目采购清单",
      title: "项目继续使用 VRLA 时，建议确认这六点",
      text:
        "通过这份清单，把泛泛的产品询问转化为可以结合实际 UPS 电池项目评审的隔板规格。",
      items: [
        "UPS 电池应用和型号",
        "目标厚度及宽度或片材尺寸",
        "卷材或片材供应形式",
        "质量特性和测试条件",
        "样品验证及批次控制要求",
        "包装、数量和交付节奏"
      ]
    },
    related: {
      eyebrow: "相关页面",
      title: "继续查看 UPS、VRLA 与隔板质量信息",
      items: [
        ["UPS 电池用 AGM 隔板", "/zh/applications/agm-separator-for-ups-battery/"],
        ["VRLA 电池用 AGM 隔板", "/zh/applications/agm-separator-for-vrla-battery/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["AGM 隔板一致性为什么重要", "/zh/blog/agm-separator-performance-consistency/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "沟通 UPS 电池项目的 AGM 隔板匹配需求",
      text:
        "请提供 UPS 电池应用、现有隔板规格、卷材或片材形式、尺寸和样品要求，我们可以继续进行规格评审与供货沟通。",
      checklist: [
        "UPS 电池应用或型号",
        "现有厚度与尺寸",
        "卷材或片材需求",
        "样品、包装和供货要求"
      ],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        application: "UPS 备电、数据机房、通信备电等",
        message: "现有隔板规格、卷材或片材形式、尺寸、样品数量、包装和供货要求"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const agmGlassFiberVsPvcSeparatorCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    brandName: articleCopy.en.brandName,
    quote: "Request a Sample",
    hero: {
      eyebrow: "Battery Separator Selection",
      title: "AGM Glass Fiber vs PVC Battery Separators",
      subtitle:
        "Both separate positive and negative plates, but they support different electrolyte-management, battery-design and assembly requirements.",
      primary: "Discuss Your Battery Design",
      secondary: "Compare the Two Separator Types",
      image: {
        src: "/images/evidence/agm-separator-roll-end-face-01.webp",
        alt: "AGM glass fiber separator roll manufactured by Hubei Viking",
        width: 900,
        height: 675
      }
    },
    intro: [
      "Asking whether AGM or PVC is the better battery separator starts with the wrong comparison. The material route needs to match the battery structure, electrolyte condition and assembly design.",
      "In this article, PVC battery separator means a microporous PVC or PVC-silica separator used in lead-acid batteries, not an ordinary rigid PVC sheet. Hubei Viking manufactures AGM glass fiber separators for VRLA batteries; the PVC discussion is provided to help buyers identify the correct material route."
    ],
    comparison: {
      eyebrow: "Quick Comparison",
      title: "The main differences are connected with the battery system",
      columns: ["Comparison point", "AGM glass fiber separator", "Microporous PVC separator"],
      rows: [
        [
          "Material structure",
          "A porous nonwoven mat mainly formed from ultra-fine glass fibers.",
          "A microporous membrane based on PVC or PVC-silica, often with ribs or a defined surface profile."
        ],
        [
          "Common battery system",
          "VRLA-AGM valve-regulated lead-acid batteries.",
          "Flooded industrial lead-acid batteries and selected gel or application-specific designs."
        ],
        [
          "Electrolyte condition",
          "The separator absorbs and retains the electrolyte.",
          "The electrolyte normally remains free-flowing or is immobilized by a separate gel system."
        ],
        [
          "Primary role",
          "Plate separation, electrolyte retention, ionic transport, oxygen transfer and plate-group constraint.",
          "Plate separation, ionic transport, plate spacing and provision of acid volume between plates."
        ],
        [
          "Assembly focus",
          "Thickness under compression, recovery, absorption behavior and uniformity.",
          "Backweb and overall thickness, rib height and direction, pore structure, wettability and mechanical strength."
        ],
        [
          "Direct replacement",
          "Normally not a direct substitute for PVC without battery-system validation.",
          "Normally not a direct substitute for AGM without battery-system validation."
        ]
      ]
    },
    sections: [
      {
        eyebrow: "01 · Electrolyte Management",
        title: "Start by understanding how the electrolyte is held inside the battery",
        text:
          "In a typical flooded lead-acid battery, the plates are immersed in electrolyte that can move freely. A microporous separator prevents plate contact while retaining ion-conducting paths and the required spacing between electrodes. In a VRLA-AGM battery, the electrolyte is absorbed and immobilized in the porous glass-fiber network, so the separator becomes part of the electrolyte-management system."
      },
      {
        eyebrow: "02 · AGM Structure",
        title: "AGM performance depends on absorption and compression together",
        text:
          "AGM stands for Absorbent Glass Mat. Its fiber network retains electrolyte, supports ionic movement and provides gas pathways used by the VRLA oxygen-recombination process. Once installed between the plates, compression changes separator thickness, contact and local electrolyte distribution. Natural thickness alone is therefore not enough to evaluate fit."
      },
      {
        eyebrow: "03 · PVC Profile",
        title: "Microporous PVC selection depends on pore structure and surface profile",
        text:
          "A microporous PVC separator does not perform the same whole-mat absorption function as AGM, but it still needs chemical resistance and open ionic pathways. Ribs can maintain electrode spacing and acid volume, while profile direction and dimensions affect positioning and assembly. A PVC specification may therefore need backweb thickness, total thickness, rib geometry, porosity, resistance, wettability and delivery format."
      },
      {
        eyebrow: "04 · Replacement Boundary",
        title: "Similar dimensions do not make the two materials interchangeable",
        text:
          "A VRLA-AGM battery is designed around electrolyte quantity, plate-group compression, oxygen recombination and valve-regulated operation. Flooded or gel designs using microporous separators make different assumptions about acid volume, plate spacing and maintenance. Changing separator material can require review of acid filling, group dimensions, housing space, charging conditions and validation tests."
      },
      {
        eyebrow: "05 · Buyer Review",
        title: "Select the separator by following the battery project, not the material name",
        text:
          "First confirm whether the project is VRLA-AGM, flooded or gel. Then define the separator function, assembly process, roll or sheet requirement and the characteristics that must remain stable in later batches. This approach is more useful than comparing one thickness, price or electrical-resistance value without the wider battery design."
      },
      {
        eyebrow: "06 · Viking Coordination",
        title: "For confirmed VRLA-AGM projects, start with specification matching",
        text:
          "Hubei Viking focuses on AGM glass fiber separator rolls and sheets for VRLA lead-acid batteries. When the battery route is confirmed as VRLA-AGM, we can review the application, target thickness, roll width or sheet size, project stage, sample needs and packing requirements before discussing continued supply."
      }
    ],
    parameters: [
      ["Battery system", "Confirm VRLA-AGM, flooded or gel before comparing separator materials."],
      ["Electrolyte condition", "Define whether the separator must retain electrolyte or work with free or gelled acid."],
      ["Assembly process", "Share plate-group design, compression conditions and roll or sheet handling."],
      ["Dimensions", "Provide target thickness, width, sheet size and any existing reference sample."],
      ["Validation stage", "Clarify whether the project is in design, sampling, trial assembly or volume production."],
      ["Batch priorities", "Identify the absorption, fit, handling or consistency concern that matters most."]
    ],
    formats: {
      eyebrow: "Viking AGM Supply Forms",
      title: "Real AGM roll and sheet formats for VRLA battery projects",
      items: [
        [
          "AGM separator rolls",
          "Roll width, thickness, winding and packing should be reviewed against the customer's feeding, slitting or cutting process.",
          "/images/evidence/agm-separator-roll-end-face-01.webp",
          "AGM glass fiber separator roll end face"
        ],
        [
          "AGM separator sheets",
          "Sheet dimensions, edge condition, stacking and packing should match direct assembly and sample-validation needs.",
          "/images/evidence/agm-separator-sheets-detail-01.webp",
          "AGM glass fiber separator sheets"
        ]
      ]
    },
    checklist: {
      eyebrow: "Specification Matching Checklist",
      title: "Prepare six details before requesting an AGM sample",
      text:
        "If the project has confirmed a VRLA-AGM battery structure, these details provide a practical starting point for sample and specification review.",
      items: [
        "Battery application and battery system",
        "Target thickness and reference specification",
        "Roll or sheet requirement",
        "Roll width or sheet dimensions",
        "Current project and validation stage",
        "Main absorption, fit or consistency concern"
      ]
    },
    references: {
      eyebrow: "Technical References",
      title: "Sources used for the material and application comparison",
      text:
        "These references provide background on lead-acid battery separator functions, AGM electrolyte retention and separator-profile considerations.",
      items: [
        [
          "Battery Council International: About Battery Separators",
          "https://batterycouncil.org/battery-facts-and-applications/about-battery-separators/"
        ],
        [
          "Battery Council International: Glossary of Common Battery Terms",
          "https://batterycouncil.org/wp-content/uploads/2024/12/BCIS-101-BCI-Glossary-of-Common-Battery-Terms-012425.pdf"
        ],
        [
          "Journal of Power Sources: Essential characteristics for separators in valve-regulated lead-acid batteries",
          "https://doi.org/10.1016/S0378-7753(02)00315-4"
        ],
        [
          "Journal of Power Sources: Separator profile selection for optimal battery performance",
          "https://www.sciencedirect.com/science/article/abs/pii/S0378775307024421"
        ],
        [
          "The cited company: Industrial lead-acid battery separators",
          "https://amer-sil.com/products/products-separators"
        ]
      ]
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with AGM fundamentals, selection and testing",
      items: [
        ["AGM Separator Product", "/products/agm-separator/"],
        ["What Is an AGM Separator?", "/blog/what-is-agm-separator/"],
        ["How to Choose an AGM Separator", "/blog/how-to-choose-agm-separator/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Confirm the AGM separator specification for your VRLA project",
      text:
        "Share the battery application, target thickness, roll or sheet format, dimensions and current project stage. We can first review whether the requirement matches Viking's AGM separator supply scope.",
      checklist: [
        "VRLA battery application",
        "Target thickness and dimensions",
        "Roll or sheet format",
        "Sample and validation stage"
      ],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        application: "VRLA, UPS, motorcycle, automotive, energy storage...",
        message:
          "Battery system, target thickness, roll/sheet format, width or sheet size, project stage and current technical concern"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    brandName: articleCopy.zh.brandName,
    quote: "申请样品",
    hero: {
      eyebrow: "电池隔板选型",
      title: "AGM 玻璃纤维隔板和 PVC 电池隔板，差别不只在材料",
      subtitle:
        "两者都能隔开正负极板，但进入不同电池结构后，承担的电解液管理、装配和长期配套任务并不相同。",
      primary: "沟通电池设计",
      secondary: "查看两类隔板对比",
      image: {
        src: "/images/evidence/agm-separator-roll-end-face-01.webp",
        alt: "湖北维京生产的 AGM 玻璃纤维隔板卷材",
        width: 900,
        height: 675
      }
    },
    intro: [
      "讨论 AGM 隔板和 PVC 隔板哪个更好，首先要回到电池结构、电解液状态和装配设计。脱离具体项目比较材料名称，很容易把选型方向带偏。",
      "本文所说的 PVC 电池隔板，主要指铅酸电池使用的微孔 PVC 或 PVC-silica 隔板，并非普通硬质 PVC 板材。湖北维京专注 VRLA 电池用 AGM 玻璃纤维隔板，文中的 PVC 内容用于帮助买家识别正确材料路线。"
    ],
    comparison: {
      eyebrow: "快速对比",
      title: "主要差异来自两者服务的电池体系",
      columns: ["对比项", "AGM 玻璃纤维隔板", "微孔 PVC 电池隔板"],
      rows: [
        [
          "材料结构",
          "以超细玻璃纤维构成的多孔无纺材料为主。",
          "以 PVC 或 PVC-silica 体系形成的微孔膜为主，常带筋条或特定表面结构。"
        ],
        [
          "常见电池体系",
          "VRLA-AGM 阀控密封铅酸电池。",
          "富液式工业铅酸电池，也可见于部分胶体或特定设计。"
        ],
        [
          "电解液状态",
          "电解液被隔板吸附并保持。",
          "电解液通常保持自由流动，或由独立胶体体系固定。"
        ],
        [
          "主要作用",
          "隔离、吸液、离子传导、氧传输和极群约束。",
          "隔离、离子传导、保持极板间距和留出极板间酸液空间。"
        ],
        [
          "装配重点",
          "受压后的厚度、回弹、吸液表现和均匀性。",
          "底膜与总厚度、筋条高度和方向、孔结构、润湿性及机械强度。"
        ],
        [
          "直接替换",
          "通常不能在未验证电池系统的情况下直接替换 PVC。",
          "通常不能在未验证电池系统的情况下直接替换 AGM。"
        ]
      ]
    },
    sections: [
      {
        eyebrow: "01 · 电解液管理",
        title: "先看电解液如何保持在电池内部",
        text:
          "典型富液式铅酸电池中，极板浸在可以自由流动的电解液里。微孔隔板阻止极板接触，同时保留离子通道和必要的极板间距。VRLA-AGM 电池中，电解液被玻璃纤维多孔网络吸附并保持，隔板因此成为电解液管理体系的一部分。"
      },
      {
        eyebrow: "02 · AGM 结构",
        title: "AGM 的关键在于吸液与受压状态共同作用",
        text:
          "AGM 是 Absorbent Glass Mat 的缩写。纤维网络用于保持电解液、支持离子移动，并为 VRLA 电池的氧复合过程提供气体通道。隔板装入极群后，受压会改变厚度、接触状态和局部电解液分布，因此只看自然状态厚度不足以判断配套效果。"
      },
      {
        eyebrow: "03 · PVC 型面",
        title: "微孔 PVC 的重点是孔结构与表面型面",
        text:
          "微孔 PVC 不承担 AGM 那样的整体吸液任务，但仍需要耐受电池内部环境并保留离子通道。筋条可以维持极板间距和酸液空间，其方向和尺寸也会影响定位与装配。PVC 规格往往需要同时确认底膜厚度、总厚度、筋条、孔结构、电阻、润湿性和交付形式。"
      },
      {
        eyebrow: "04 · 替换边界",
        title: "尺寸接近，不代表两种材料可以直接互换",
        text:
          "VRLA-AGM 电池围绕加酸量、极群压缩、氧复合和阀控运行设计；使用微孔隔板的富液式或胶体电池，对酸液体积、极板间距和维护方式有不同假设。改变隔板材料可能需要重新确认加酸、极群尺寸、壳体空间、充电条件和验证项目。"
      },
      {
        eyebrow: "05 · 采购确认",
        title: "沿着电池项目选择隔板，而不是只比较材料名称",
        text:
          "首先确认项目属于 VRLA-AGM、富液式还是胶体体系，再明确隔板在设计中的任务、装配流程、卷材或片材要求，以及后续批次必须保持稳定的特性。这样的比较，比脱离电池结构只看一个厚度、价格或电阻数值更有实际意义。"
      },
      {
        eyebrow: "06 · 维京配套",
        title: "已确定 VRLA-AGM 路线的项目，可以先做规格匹配",
        text:
          "湖北维京专注 VRLA 铅酸电池用 AGM 玻璃纤维隔板卷材和片材。项目已确定采用 VRLA-AGM 体系后，可以提供电池应用、目标厚度、卷材宽度或片材尺寸、项目阶段、样品和包装需求，再进一步沟通持续供货。"
      }
    ],
    parameters: [
      ["电池体系", "比较材料前先确认 VRLA-AGM、富液式或胶体结构。"],
      ["电解液状态", "明确隔板是否需要吸附电解液，或与自由、胶体酸液配合。"],
      ["装配流程", "提供极群设计、受压条件及卷材或片材的使用方式。"],
      ["尺寸信息", "提供目标厚度、宽度、片材尺寸及已有参考样品。"],
      ["验证阶段", "说明项目处于设计、打样、试装还是批量生产阶段。"],
      ["批次重点", "明确最关注的吸液、贴合、搬运或一致性问题。"]
    ],
    formats: {
      eyebrow: "维京 AGM 供应形式",
      title: "面向 VRLA 电池项目的真实 AGM 卷材和片材",
      items: [
        [
          "AGM 隔板卷材",
          "卷材宽度、厚度、卷绕和包装应与客户的上料、分切或裁切流程对应。",
          "/images/evidence/agm-separator-roll-end-face-01.webp",
          "AGM 玻璃纤维隔板卷材端面"
        ],
        [
          "AGM 隔板片材",
          "片材尺寸、边缘、堆叠和包装应匹配直接装配与样品验证需求。",
          "/images/evidence/agm-separator-sheets-detail-01.webp",
          "AGM 玻璃纤维隔板片材"
        ]
      ]
    },
    checklist: {
      eyebrow: "规格匹配清单",
      title: "申请 AGM 样品前，建议准备六项信息",
      text:
        "如果项目已经确认采用 VRLA-AGM 电池结构，这些信息可以作为样品和规格评审的实际起点。",
      items: [
        "电池应用和电池体系",
        "目标厚度和参考规格",
        "卷材或片材需求",
        "卷材宽度或片材尺寸",
        "当前项目和验证阶段",
        "主要吸液、贴合或一致性问题"
      ]
    },
    references: {
      eyebrow: "技术参考",
      title: "材料与应用对比的参考资料",
      text:
        "以下资料用于说明铅酸电池隔板功能、AGM 电解液保持和隔板型面的技术背景。",
      items: [
        [
          "Battery Council International：About Battery Separators",
          "https://batterycouncil.org/battery-facts-and-applications/about-battery-separators/"
        ],
        [
          "Battery Council International：电池术语表",
          "https://batterycouncil.org/wp-content/uploads/2024/12/BCIS-101-BCI-Glossary-of-Common-Battery-Terms-012425.pdf"
        ],
        [
          "Journal of Power Sources：VRLA 电池隔板的关键特性",
          "https://doi.org/10.1016/S0378-7753(02)00315-4"
        ],
        [
          "Journal of Power Sources：隔板型面对电池性能的影响",
          "https://www.sciencedirect.com/science/article/abs/pii/S0378775307024421"
        ],
        [
          "所引企业：工业铅酸电池隔板",
          "https://amer-sil.com/products/products-separators"
        ]
      ]
    },
    related: {
      eyebrow: "相关页面",
      title: "继续查看 AGM 基础、选型与检测信息",
      items: [
        ["AGM 隔板产品", "/zh/products/agm-separator/"],
        ["什么是 AGM 隔板？", "/zh/blog/what-is-agm-separator/"],
        ["如何选择 AGM 隔板", "/zh/blog/how-to-choose-agm-separator/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "确认当前 VRLA 项目的 AGM 隔板规格",
      text:
        "请提供电池应用、目标厚度、卷材或片材形式、尺寸和当前项目阶段。我们会先判断需求是否符合维京 AGM 隔板的供应范围。",
      checklist: ["VRLA 电池应用", "目标厚度和尺寸", "卷材或片材形式", "样品和验证阶段"],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        application: "VRLA、UPS、摩托车、汽车、储能等",
        message: "电池体系、目标厚度、卷材或片材、宽度或片材尺寸、项目阶段和当前技术问题"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const dataCenterBackupPowerAgmSeparatorCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/agm-separator-for-data-center-backup-power/",
    brandName: articleCopy.en.brandName,
    quote: "Request a Sample",
    hero: {
      eyebrow: "Data Center Backup Power",
      title: "Data Center Backup Demand Is Growing. What Should AGM Separator Sourcing Review?",
      subtitle:
        "Order growth is only the surface. Inside a VRLA battery, electrolyte retention, compression fit and batch consistency are the changes an AGM separator supply program must be ready to support.",
      primary: "Request a Sample & Specification Match",
      secondary: "View Project Checklist",
      image: {
        src: "/images/applications/ups-vrla-battery-application-1200.webp",
        alt: "VRLA battery backup application for UPS and data centers",
        width: 1200,
        height: 900
      }
    },
    intro: [
      "Data center construction, UPS battery replacement and communications backup projects are creating renewed discussion around the practical role of VRLA lead-acid batteries. For an AGM separator manufacturer, the useful question is not how much electricity a data center consumes, but what battery design the backup system requires.",
      "A separator specification only becomes meaningful after the battery architecture, electrolyte condition, compression design, sample validation and volume assembly process are understood. AGM separator is one functional part of that wider electrochemical and mechanical system."
    ],
    sections: [
      {
        eyebrow: "Demand Signal",
        title: "More data center capacity puts backup-power readiness under review",
        text:
          "Deloitte expects the critical power capacity supporting global data center equipment to approach 96 GW in 2026, nearly double the 2023 level, with AI-related operations potentially consuming more than 40%. This is a demand signal rather than an AGM separator order forecast. Backup architecture, battery technology, system design and validation still sit between capacity growth and separator sourcing."
      },
      {
        eyebrow: "Public Procurement",
        title: "Battery acceptance requirements are becoming more specific",
        text:
          "A UPS battery procurement notice published on March 17, 2026 required new AGM lead-acid batteries rated at no less than 100 Ah, a design float life of at least five years, compliance with YD/T 799-2024, and real-time monitoring of voltage, current, individual battery internal resistance and temperature. These are finished-battery requirements, not an AGM separator specification, but they show the reliability and consistency expected from the complete system."
      },
      {
        eyebrow: "High-Rate Discharge",
        title: "Electrolyte retention and ion pathways need repeatable material behavior",
        text:
          "In a VRLA-AGM battery, electrolyte is mainly retained in the pore network of the glass-fiber separator. Variation in acid absorption, pore structure or electrolyte distribution can make ionic transport and internal-resistance consistency harder to control across cells. Plate formulation, grids, current paths and charging strategy remain equally important; the separator participates in performance but does not determine it alone."
      },
      {
        eyebrow: "Long-Term Float Service",
        title: "Compression after wetting matters more than nominal thickness alone",
        text:
          "The working condition is the separator compressed between plates after electrolyte filling, not a dry sheet lying on a table. Insufficient compression can reduce contact stability, while excessive compression can change pore volume, electrolyte capacity and gas pathways. Published research supports reviewing compression and recovery behavior, but a percentage tested in one battery design should not be applied universally."
      },
      {
        eyebrow: "Oxygen Cycle",
        title: "The separator also provides gas pathways for oxygen recombination",
        text:
          "During charging, oxygen generated at the positive plate must travel through the separator structure to the negative plate and recombine into water. Electrolyte saturation, pore structure and compression therefore need to balance acid retention, ionic conduction and gas transport. Maximizing one property in isolation does not guarantee the right result for the battery."
      },
      {
        eyebrow: "Sample to Volume",
        title: "Batch consistency is where assembly differences become visible",
        text:
          "Roll width and winding condition, sheet dimensions, thickness, basis weight and packing all affect handling and assembly. Small deviations may be adjusted manually during sampling, but repeated variation becomes line adjustment, scrap and specification rework in volume production. A successful first sample is only the start; later batches must continue the same agreed supply logic."
      },
      {
        eyebrow: "Application Fit",
        title: "UPS, telecom backup and energy storage require separate decisions",
        text:
          "UPS projects often emphasize short-duration high-rate discharge and dependable activation after long float service. Telecom backup also considers backup duration, environment and maintenance conditions. Cyclic storage or lead-carbon applications introduce different cycling and electrolyte-management priorities. Battery application, capacity, plate or group dimensions, target compression and roll or sheet requirements should be clear before sampling."
      }
    ],
    parameters: [
      ["Application", "UPS, data center, telecom backup or cyclic energy storage."],
      ["Battery design", "Capacity, plate or group dimensions and float-service conditions."],
      ["Compression", "Target thickness, assembly gap, wet condition and recovery expectations."],
      ["Electrolyte behavior", "Acid absorption, wetting time and the agreed test method."],
      ["Supply format", "Roll width, core and diameter, or finished sheet dimensions."],
      ["Project stage", "Initial sample, pilot assembly or recurring volume supply."]
    ],
    formats: {
      eyebrow: "Manufacturing Evidence",
      title: "Material form, quality review and packing must support the assembly process",
      items: [
        ["AGM separator rolls", "Confirm width, core, roll diameter, winding and handling requirements for the production line.", "/images/viking-finished-separator-roll-900.webp", "Finished AGM separator roll"],
        ["Quality inspection", "Use agreed methods and conditions to compare dimensions and functional characteristics across samples and batches.", "/images/agm-quality-control-1200.webp", "AGM separator quality inspection"],
        ["Packing and shipment", "Packing, moisture protection, identification and pallet handling are part of repeatable supply.", "/images/evidence/shipping-pallet-01.webp", "AGM separator packing and shipment preparation"]
      ]
    },
    checklist: {
      eyebrow: "Project Information",
      title: "Prepare these details before requesting an AGM separator sample",
      text:
        "Clear application and assembly information helps move the discussion from a nominal thickness to a testable separator specification.",
      items: ["Battery application and capacity", "Target thickness and compression design", "Roll width or sheet dimensions", "Test methods and acceptance criteria", "Current sample stage and expected volume"]
    },
    references: {
      eyebrow: "References",
      title: "Public sources and technical scope",
      text:
        "The procurement requirements cited below apply to finished batteries rather than AGM separator specifications. The article is for technical and industry discussion and does not constitute a market forecast or a battery-design recommendation.",
      items: [
        ["Deloitte — AI and data center power demand", "https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2025/genai-power-consumption-creates-need-for-more-sustainable-data-centers.html"],
        ["PLA Procurement — UPS battery purchase notice", "https://www.plap.mil.cn/freecms/site/juncai/ggxx/info/2026/8a1d03e69cd1fb5c019cf579069f769f.html"],
        ["Journal of Power Sources — closed oxygen cycle in VRLA batteries", "https://doi.org/10.1016/S0378-7753(99)00396-1"],
        ["Journal of Power Sources — AGM compression-recovery model", "https://doi.org/10.1016/j.jpowsour.2017.08.055"],
        ["SMM — lead-acid batteries in storage and base-station backup", "https://news.smm.cn/news/103776664"]
      ]
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with application, testing and consistency information",
      items: [
        ["AGM Separator for UPS Batteries", "/applications/agm-separator-for-ups-battery/"],
        ["AGM Separator for Energy Storage", "/applications/agm-separator-for-energy-storage-battery/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["Why AGM Separator Consistency Matters", "/blog/agm-separator-performance-consistency/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Review AGM separator fit for a backup-power battery project",
      text:
        "Share the application, battery capacity, target thickness, compression approach, roll or sheet dimensions and current project stage. We can start by reviewing the practical separator supply format.",
      checklist: ["Application and capacity", "Thickness and compression", "Roll or sheet dimensions", "Sample and volume stage"],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        application: "UPS, data center, telecom backup, energy storage...",
        message: "Battery capacity, target thickness, compression design, roll or sheet dimensions, test method and project stage"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/agm-separator-for-data-center-backup-power/",
    brandName: articleCopy.zh.brandName,
    quote: "申请样品",
    hero: {
      eyebrow: "数据中心备电",
      title: "数据中心备电需求在增长，AGM 隔板配套该看什么？",
      subtitle:
        "订单增长只是表面。真正落到 VRLA 电池内部，吸液、压缩贴合和批次一致性，才是 AGM 隔板需要接住的变化。",
      primary: "申请样品与规格匹配",
      secondary: "查看项目清单",
      image: {
        src: "/images/applications/ups-vrla-battery-application-1200.webp",
        alt: "UPS 与数据中心 VRLA 电池备电应用",
        width: 1200,
        height: 900
      }
    },
    intro: [
      "AI 算力中心持续建设，UPS 电池组更换和扩容项目陆续落地，通信基站后备电源和储能应用也在重新讨论铅酸电池的现实价值。站在 AGM 隔板制造端，更值得关心的不是数据中心增加了多少用电量，而是项目最终需要怎样的 VRLA 电池。",
      "AGM 隔板规格只有放进具体电池结构、压缩设计、样品验证和批量装配流程中才有意义。它参与电池内部的电解液管理、离子传导和氧循环，但不会单独决定整只电池的性能。"
    ],
    sections: [
      {
        eyebrow: "需求信号",
        title: "数据中心容量增长，推动备用电源系统同步评估",
        text:
          "德勤预计，到 2026 年，支撑全球数据中心关键设备运行的电力容量将接近 96GW，较 2023 年接近翻倍；AI 相关运行可能消耗其中超过 40%。这组数据说明备用电源需求值得关注，但不是 AGM 隔板订单预测。电池路线、系统设计、样品测试和批量验证仍是需求落地前必须经过的环节。"
      },
      {
        eyebrow: "公开采购要求",
        title: "终端项目对电池可靠性和状态管理提出了更具体的要求",
        text:
          "2026 年 3 月 17 日发布的一项 UPS 蓄电池采购要求使用全新 AGM 铅酸蓄电池，单只容量不低于 100Ah，设计浮充寿命不低于 5 年，并符合 YD/T 799-2024，同时监测电压、电流、单体内阻和温度。这是终端电池采购要求，并不是 AGM 隔板参数表，但能反映完整系统需要达到的可靠性和一致性目标。"
      },
      {
        eyebrow: "高倍率备电",
        title: "隔板里的电解液和离子通道需要保持可重复的状态",
        text:
          "VRLA-AGM 电池中的电解液主要保存在超细玻璃纤维形成的孔隙中，隔板同时构成正负极之间的离子传导路径。吸液、孔隙结构或电解液分布出现明显差异时，离子传输和内部阻力的一致性更难控制。极板配方、板栅、电流路径和充电制度同样重要，隔板参与其中，但不会单独决定高倍率性能。"
      },
      {
        eyebrow: "长期浮充",
        title: "真正起作用的是吸液受压后的状态，而不只是标称厚度",
        text:
          "压缩不足时，隔板与极板之间的接触和支撑可能不够稳定；压缩过高，又可能改变孔隙、电解液容量和氧气传输通道。相关研究说明压缩与湿态恢复值得被纳入设计评估，但某项研究采用的具体压缩比例不能直接套用到所有电池。容量、极板结构和运行工况不同，需要分别确认合适范围。"
      },
      {
        eyebrow: "氧复合",
        title: "AGM 隔板还承担着内部氧循环需要的气体通道",
        text:
          "充电过程中，正极产生的氧气需要通过隔板结构到达负极，并在那里重新生成水。电解液饱和度、孔隙结构和压缩状态，都会影响氧气传输与复合。隔板需要在保液、导通和气体传输之间形成适合当前电池设计的平衡，而不是把某个单项指标推到最大。"
      },
      {
        eyebrow: "样品到批量",
        title: "最容易拉开差距的是后续批次能否重复装配",
        text:
          "卷材宽度和收卷状态、片材尺寸、厚度、克重与包装方式都会影响上机和装配。打样时可由人工消化的轻微差异，进入连续生产后可能变成调机、返工和材料损耗。第一次样品通过只是起点，后续批次还应尽量延续相同的规格、测试和交付逻辑。"
      },
      {
        eyebrow: "应用匹配",
        title: "UPS、通信备电和储能不能共用一套笼统判断",
        text:
          "UPS 更关注短时高倍率放电和长期浮充后的可靠启动；通信后备电源还要结合备电时长、运行环境和维护条件；循环储能或铅碳应用则有不同的循环与电解液管理重点。SMM 2026 年行业会议议题中也包括铅酸电池在储能与基站后备电源的双轨应用分析。询价前应先说明应用、电池容量、极板或极群尺寸、目标压缩以及卷材或片材需求。"
      }
    ],
    parameters: [
      ["应用场景", "UPS、数据中心、通信基站后备或循环储能。"],
      ["电池设计", "容量、极板或极群尺寸以及浮充工况。"],
      ["压缩设计", "目标厚度、装配间隙、湿态状态和恢复要求。"],
      ["电解液表现", "吸液量、润湿时间及双方确认的测试方法。"],
      ["供货形式", "卷材宽度、纸管和卷径，或成品片材尺寸。"],
      ["项目阶段", "初始样品、试产装配或持续批量供货。"]
    ],
    formats: {
      eyebrow: "制造与交付证据",
      title: "产品形式、质量确认与包装应共同服务装配流程",
      items: [
        ["AGM 隔板卷材", "确认生产线需要的宽度、纸管、卷径、收卷和搬运要求。", "/images/viking-finished-separator-roll-900.webp", "湖北维京 AGM 隔板卷材"],
        ["质量检测", "使用双方确认的方法和条件，对比样品及不同批次的尺寸与功能指标。", "/images/agm-quality-control-1200.webp", "湖北维京 AGM 隔板质量检测"],
        ["包装与出运", "包装、防潮、标识和托盘搬运，也是持续稳定供货的一部分。", "/images/evidence/shipping-pallet-01.webp", "湖北维京 AGM 隔板包装出运"]
      ]
    },
    checklist: {
      eyebrow: "项目资料清单",
      title: "申请 AGM 隔板样品前，建议准备这些信息",
      text:
        "应用与装配信息越清楚，沟通越容易从一个标称厚度进入可测试、可复核的规格。",
      items: ["电池应用和容量", "目标厚度与压缩设计", "卷材宽度或片材尺寸", "测试方法与验收条件", "当前样品阶段和预计数量"]
    },
    references: {
      eyebrow: "参考资料",
      title: "公开来源与适用范围说明",
      text:
        "下列采购要求属于终端电池要求，不等同于 AGM 隔板规格。本文仅用于行业与技术交流，不构成市场预测、经营建议或具体电池设计结论。",
      items: [
        ["Deloitte：AI 与数据中心电力需求", "https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2025/genai-power-consumption-creates-need-for-more-sustainable-data-centers.html"],
        ["军队采购网：UPS 蓄电池采购公告", "https://www.plap.mil.cn/freecms/site/juncai/ggxx/info/2026/8a1d03e69cd1fb5c019cf579069f769f.html"],
        ["Journal of Power Sources：VRLA 电池闭合氧循环研究", "https://doi.org/10.1016/S0378-7753(99)00396-1"],
        ["Journal of Power Sources：AGM 隔板压缩恢复模型", "https://doi.org/10.1016/j.jpowsour.2017.08.055"],
        ["SMM：铅酸电池在储能与基站后备电源的应用议题", "https://news.smm.cn/news/103776664"]
      ]
    },
    related: {
      eyebrow: "相关页面",
      title: "继续查看应用、检测和一致性信息",
      items: [
        ["UPS 电池用 AGM 隔板", "/zh/applications/agm-separator-for-ups-battery/"],
        ["储能电池用 AGM 隔板", "/zh/applications/agm-separator-for-energy-storage-battery/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["AGM 隔板一致性为什么重要", "/zh/blog/agm-separator-performance-consistency/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "确认备电项目的 AGM 隔板配套方式",
      text:
        "请提供应用场景、电池容量、目标厚度、压缩思路、卷材或片材尺寸和当前项目阶段，我们先从隔板的实际供货形式开始确认。",
      checklist: ["应用与容量", "厚度与压缩", "卷材或片材尺寸", "样品与批量阶段"],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        application: "UPS、数据中心、通信备电、储能等",
        message: "电池容量、目标厚度、压缩设计、卷材或片材尺寸、测试方法和当前项目阶段"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const earlyLeadAcidReferenceItems: Array<[string, string]> = [
  ["Shanghai Gazetteer — public mirror of the 1912 record", "https://docs.abwen.com/china/%E4%B8%8A%E6%B5%B7%E9%80%9A%E5%BF%97.pdf"],
  ["SMM — development of lead-acid battery technology in China", "https://news.smm.cn/news/102815366"],
  ["Shenyang Development and Reform Commission — Energy Storage Industry Development Plan", "https://fgw.shenyang.gov.cn/zwgk/fdzdgknr/bmwj/202407/P020240731519907537824.pdf"],
  ["Journal of Power Sources — Aspects of lead/acid battery technology: Separators", "https://doi.org/10.1016/0378-7753(93)80038-Q"],
  ["Lead-Acid Batteries: Science and Technology", "https://www.sciencedirect.com/book/9780444595522/lead-acid-batteries-science-and-technology"],
  ["Journal of Power Sources — Development of the first valve-regulated lead/acid cell", "https://doi.org/10.1016/S0378-7753(96)02516-5"]
];

const earlyChinaLeadAcidBatteryManufacturingCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/how-chinas-earliest-lead-acid-batteries-were-made/",
    brandName: articleCopy.en.brandName,
    quote: "Request Sample",
    hero: {
      eyebrow: "Manufacturing History",
      title: "How China’s Earliest Lead-Acid Batteries Were Made",
      subtitle:
        "From hand-cast grids and wooden separators to modern AGM, more than a century of manufacturing change is contained inside a lead-acid battery.",
      primary: "Request a Sample & Specification Match",
      secondary: "Review the timeline",
      image: {
        src: "/images/agm-hero-production-1600.webp",
        alt: "Modern Viking AGM separator production line",
        width: 1600,
        height: 1000
      }
    },
    intro: [
      "Search for the beginning of lead-acid battery manufacturing in China and several dates appear. The Shanghai Gazetteer records Chinese-owned automotive battery production in 1912, an industry source uses 1921 as an industrial starting point, and an official Shenyang plan describes a specialized factory founded in 1939.",
      "These accounts use different definitions rather than proving one universal ‘first’. This article separates those definitions, explains the early production sequence and follows the separator’s development from wood and microporous materials to AGM. The factory photographs shown here document modern Viking production; they are not historical images."
    ],
    timeline: {
      eyebrow: "Manufacturing Timeline",
      title: "Five milestones, each answering a different historical question",
      note:
        "Company founding, an industry starting point and specialized factory production are different criteria. The dates below should not be read as a single absolute claim.",
      items: [
        ["1912", "The Shanghai Gazetteer records Hu Guoguang founding the China Storage Battery Factory and producing automotive batteries."],
        ["1921", "An industry source uses the Shanghai-based factory as the starting point of China’s lead-acid battery industry."],
        ["1939", "An official Shenyang plan describes the founded Shenyang Storage Battery Factory as a specialized lead-acid battery manufacturing milestone."],
        ["1967–1971", "Microglass-fiber VRLA development began in 1967 and related products entered the market four years later."],
        ["Today", "Mechanized production, agreed test methods and batch management replace one-off manual adjustment."]
      ]
    },
    sections: [
      {
        eyebrow: "Different Definitions",
        title: "Why 1912, 1921 and 1939 do not necessarily conflict",
        text:
          "Early factory history is distributed across local gazetteers, industry reviews and official planning records. One source identifies Chinese-owned automotive battery production, another chooses an industry starting point and a third emphasizes specialized, systematic factory production. The useful conclusion is not a single slogan about the ‘first’ factory, but a sequence in which local production appeared before larger-scale professional manufacturing took shape."
      },
      {
        eyebrow: "Early Materials",
        title: "Hand-cast grids, pasted plates and containers made from wood, rubber or glass",
        text:
          "Historical battery literature describes relatively thick grids, manual or semi-manual pasting, plate treatment, formation and element assembly. Containers could use lined wood, hard rubber or glass. Separators included wood, hard rubber, celluloid and glass. Each separator still had to prevent plate contact while allowing ionic movement, but acid resistance, dimensional consistency and long-term stability were difficult to control together."
      },
      {
        eyebrow: "Process Control",
        title: "The production sequence was familiar, but repeatability depended heavily on experience",
        text:
          "Grids received active material, plates were cured and formed, and positive and negative plates were grouped with separators before electrolyte filling, charging and testing. What differed was the available measurement and control. Natural wooden separators varied in thickness, porosity and strength, so small batches could be selected and trimmed by hand. That approach became impractical as output increased."
      },
      {
        eyebrow: "Industrial Production",
        title: "Specialized factories changed the objective from one usable battery to repeatable batches",
        text:
          "The 1939 Shenyang milestone represents the rise of a more specialized factory system, not proof that earlier production did not exist. As the industry expanded, grid dimensions, mixing, pasting, curing, formation, grouping, acid filling and initial charging increasingly followed equipment-based requirements. Dedicated capacity and discharge testing made consistent delivery for vehicles and industrial equipment more achievable."
      },
      {
        eyebrow: "Separator Evolution",
        title: "From wood and microporous synthetics to a separator that participates in VRLA operation",
        text:
          "The industry adopted microporous rubber, sintered PVC, polyethylene and polypropylene as materials became more controllable and scalable. AGM changed the separator’s role again. In a VRLA-AGM battery, ultrafine glass fibers retain electrolyte, maintain ionic pathways, support oxygen transfer and help hold the plates in the intended compressed state. AGM is therefore part of the internal operating mechanism, not only a physical barrier."
      },
      {
        eyebrow: "Modern Manufacturing",
        title: "Faster lines make material and batch variation more visible",
        text:
          "Modern grid, pasting, curing, assembly, formation and testing processes are increasingly mechanized. A continuous line cannot pause to trim every separator individually. Differences in AGM thickness, basis weight, absorption, compression behavior, roll width or sheet dimensions can create setup changes, inspection and rework. Today the practical requirement is to carry an agreed specification consistently from sample validation into recurring supply."
      }
    ],
    parameters: [
      ["Battery application", "Define the VRLA battery use and operating conditions before selecting a separator."],
      ["Compression design", "Review nominal thickness together with the intended wet and compressed state."],
      ["Roll or sheet dimensions", "Confirm width, core, roll diameter or finished sheet size for the assembly process."],
      ["Test method", "Compare samples and batches using agreed conditions and tolerances."],
      ["Project stage", "Separate initial sample requirements from pilot and recurring volume supply."]
    ],
    formats: {
      eyebrow: "Modern Manufacturing Evidence",
      title: "Current Viking production materials — not historical photographs",
      items: [
        ["AGM separator rolls", "Modern roll production requires controlled width, winding and handling for repeatable assembly.", "/images/viking-finished-separator-roll-900.webp", "Modern Viking AGM separator roll"],
        ["Quality inspection", "Agreed methods help compare dimensions and functional characteristics across samples and batches.", "/images/agm-quality-control-1200.webp", "Modern Viking AGM separator inspection"],
        ["Packing and shipment", "Identification, moisture protection and pallet handling support consistent downstream use.", "/images/evidence/shipping-pallet-01.webp", "Modern Viking AGM separator packing"]
      ]
    },
    checklist: {
      eyebrow: "Specification Review",
      title: "Move from manufacturing history to a testable AGM separator specification",
      text:
        "Modern repeatability starts with the battery design and a shared test basis, not with nominal thickness alone.",
      items: ["VRLA battery application", "Target thickness and compression", "Roll width or sheet dimensions", "Test method and tolerance", "Sample or volume stage"]
    },
    references: {
      eyebrow: "References",
      title: "Historical scope and technical sources",
      text:
        "The sources use different definitions for early manufacturing. The Shanghai Gazetteer is linked through a public mirror. Unverified claims about workforce, hand-cranked formation equipment and annual output are not used as established facts.",
      items: earlyLeadAcidReferenceItems
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with modern AGM manufacturing, testing and specification guidance",
      items: [
        ["AGM Separator Manufacturing, Quality and Delivery", "/blog/agm-separator-manufacturing-quality-delivery/"],
        ["Why AGM Separator Consistency Matters", "/blog/agm-separator-performance-consistency/"],
        ["What Is an AGM Separator?", "/blog/what-is-agm-separator/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Review an AGM separator for your VRLA battery design",
      text:
        "Share the battery application, target thickness, roll or sheet dimensions and current project stage. We can begin with specification matching and sample review.",
      checklist: ["Battery application", "Thickness and compression", "Roll or sheet dimensions", "Sample and volume stage"],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        message: "Battery application, target thickness, compression, roll or sheet dimensions, test method and project stage"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/how-chinas-earliest-lead-acid-batteries-were-made/",
    brandName: articleCopy.zh.brandName,
    quote: "申请样品",
    hero: {
      eyebrow: "制造历史",
      title: "中国早期铅酸蓄电池是怎样制造的？",
      subtitle: "从手工铸造板栅、木质隔板到现代 AGM，一只铅酸蓄电池里浓缩了一个多世纪的制造变化。",
      primary: "申请样品与规格匹配",
      secondary: "查看历史时间线",
      image: {
        src: "/images/agm-hero-production-1600.webp",
        alt: "湖北维京现代 AGM 隔板生产线",
        width: 1600,
        height: 1000
      }
    },
    intro: [
      "查找中国铅酸蓄电池制造的起点，会看到 1912、1921 和 1939 三种说法。上海地方志记载了 1912 年的华资汽车蓄电池生产，行业资料将 1921 年作为产业起点，而沈阳官方规划把 1939 年创办的工厂描述为专业化铅酸蓄电池制造的重要起点。",
      "这些资料采用的是企业创办、行业起点和专业化工厂三种不同标准，并不适合压缩成一个绝对的‘唯一第一’。本文梳理早期制造流程和隔板材料演进。页面中的维京工厂图片均为现代 AGM 生产资料，不是历史影像。"
    ],
    timeline: {
      eyebrow: "制造时间线",
      title: "五个节点，对应不同的历史判断标准",
      note: "企业创办、行业起点和专业化工厂不是同一个概念，下列年份不用于宣称唯一公认的‘第一家’。",
      items: [
        ["1912", "上海地方志记载胡国光创办中国蓄电池厂，并开始生产汽车蓄电池。"],
        ["1921", "行业资料采用上海中国蓄电池厂作为中国铅酸蓄电池产业起点。"],
        ["1939", "沈阳官方规划将当年创办的沈阳蓄电池厂视为专业化制造的重要节点。"],
        ["1967–1971", "采用微玻璃纤维隔板的 VRLA 技术于 1967 年开始开发，相关产品四年后进入市场。"],
        ["今天", "机械化生产、约定检测方法和批次管理取代一次性的人工调整。"]
      ]
    },
    sections: [
      { eyebrow: "不同口径", title: "1912、1921 和 1939 为什么不一定互相冲突", text: "早期工厂史分散在地方志、行业回顾和官方规划中。不同资料分别强调华资汽车蓄电池生产、行业起点和专业化系统生产。更稳妥的理解是：本地制造先在上海出现，随后专业化和规模化工厂体系逐步形成，而不是用一句‘唯一第一’覆盖所有历史口径。" },
      { eyebrow: "早期材料", title: "手工铸造板栅、涂膏极板，以及木材、硬橡胶或玻璃容器", text: "专业资料显示，早期产品常使用较厚板栅，涂膏、极板处理、化成和极群装配远没有今天的连续设备。电池槽可使用衬里的木材、硬橡胶或玻璃，隔板材料包括木材、硬橡胶、赛璐珞和玻璃。隔板同样要阻止极板接触并保持离子通道，但耐酸、尺寸一致和长期稳定很难同时控制。" },
      { eyebrow: "过程控制", title: "基本流程并不陌生，但可重复性高度依赖经验", text: "板栅填入活性物质后，极板经过固化和化成，再与隔板组成极群，随后装槽、加酸、充电和检测。区别在于当时可用的测量和控制手段有限。天然木质隔板的厚度、孔隙和强度存在差异，小批量还能逐片挑选和修整，产量增加后便难以继续依靠这种方式。" },
      { eyebrow: "工业化生产", title: "专业工厂把目标从做出一只可用电池变成连续生产稳定批次", text: "1939 年沈阳的节点代表更专业化的工厂体系出现，并不否认此前已有生产。随着行业发展，板栅尺寸、混膏、涂板、固化、化成、装配、加酸和初充电逐步纳入设备和工艺要求。容量及放电检测也更专门化，工厂开始面对连续批次能否按同一条件装配、测试和交付的问题。" },
      { eyebrow: "隔板演进", title: "从木材和微孔合成材料，到参与 VRLA 内部工作的 AGM", text: "木质隔板之后，行业使用过微孔橡胶、烧结 PVC、聚乙烯和聚丙烯等材料。AGM 再次改变了隔板角色：在 VRLA-AGM 电池中，超细玻璃纤维孔隙吸附电解液、保持离子通道、支持氧气传输，并帮助极板维持设计压缩状态。它不再只是物理阻隔，而是电池内部运行机制的一部分。" },
      { eyebrow: "现代制造", title: "生产线越快，材料和批次波动越容易被放大", text: "现代板栅、涂板、固化、装配、化成和检测越来越机械化。连续生产线无法像早期工人那样逐片修整隔板。AGM 的厚度、克重、吸液、受压表现、卷材宽度或片材尺寸发生波动，都可能带来调机、复检和返工。今天更重要的是把确认后的规格从样品验证持续延续到后续批次。" }
    ],
    parameters: [
      ["电池应用", "先明确 VRLA 电池用途和运行工况，再讨论隔板规格。"],
      ["压缩设计", "把标称厚度与吸液后的受压状态一起评估。"],
      ["卷材或片材尺寸", "确认宽度、纸管、卷径或成品片材尺寸是否适合装配。"],
      ["检测方法", "使用双方约定的条件和公差比较样品及后续批次。"],
      ["项目阶段", "区分初始样品、试产和持续批量供货要求。"]
    ],
    formats: {
      eyebrow: "现代制造资料",
      title: "以下为维京当前生产资料，不是历史影像",
      items: [
        ["AGM 隔板卷材", "现代卷材生产需要稳定控制宽度、收卷和搬运要求。", "/images/viking-finished-separator-roll-900.webp", "湖北维京现代 AGM 隔板卷材"],
        ["质量检测", "按约定方法对比样品和批次的尺寸及功能指标。", "/images/agm-quality-control-1200.webp", "湖北维京现代 AGM 隔板检测"],
        ["包装与出运", "标识、防潮和托盘搬运也是重复稳定使用的一部分。", "/images/evidence/shipping-pallet-01.webp", "湖北维京现代 AGM 隔板包装"]
      ]
    },
    checklist: {
      eyebrow: "规格确认",
      title: "从制造历史回到可测试的 AGM 隔板规格",
      text: "现代批次稳定从电池设计和共同检测基础开始，而不只看一个标称厚度。",
      items: ["VRLA 电池应用", "目标厚度与压缩设计", "卷材宽度或片材尺寸", "检测方法与公差", "样品或批量阶段"]
    },
    references: {
      eyebrow: "参考资料",
      title: "历史口径与技术资料说明",
      text: "不同来源对早期制造采用不同定义。上海地方志链接为公开镜像版本。未经匹配原始厂史证实的工人数、手摇发电机和年产量说法，不作为本文正式事实。",
      items: earlyLeadAcidReferenceItems
    },
    related: {
      eyebrow: "相关页面",
      title: "继续了解现代 AGM 制造、检测与规格选择",
      items: [
        ["AGM 隔板生产、质量与交付", "/zh/blog/agm-separator-manufacturing-quality-delivery/"],
        ["AGM 隔板一致性为什么重要", "/zh/blog/agm-separator-performance-consistency/"],
        ["什么是 AGM 隔板？", "/zh/blog/what-is-agm-separator/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "确认 VRLA 电池设计所需的 AGM 隔板",
      text: "请提供电池应用、目标厚度、卷材或片材尺寸和当前项目阶段，我们可以从规格匹配与样品评审开始沟通。",
      checklist: ["电池应用", "厚度与压缩", "卷材或片材尺寸", "样品与批量阶段"],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        message: "电池应用、目标厚度、压缩设计、卷材或片材尺寸、检测方法和项目阶段"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const pressureRetentionReferenceItems: Array<[string, string]> = [
  ["Public source — Absorbent Glass Mat (AGM) Separator", "https://www.hollingsworth-vose.com/wp-content/uploads/AGM-Separator.pdf"],
  ["Journal of Power Sources — compression and positive active mass performance", "https://doi.org/10.1016/S0378-7753(99)00018-X"],
  ["Journal of Power Sources — characterisation of separator papers for VRLA batteries", "https://doi.org/10.1016/S0378-7753(01)00925-9"]
];

const agmSeparatorPressureRetentionCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/",
    brandName: articleCopy.en.brandName,
    quote: "Request Sample",
    hero: {
      eyebrow: "Compression & Recovery",
      title: "Will an AGM Separator Still Hold Pressure After Filling and Cycling?",
      subtitle:
        "Initial thickness is only the starting point. Wet shrinkage, recovery and residual force after repeated compression are closer to the separator's long-term condition inside a battery.",
      primary: "Request a Sample & Specification Match",
      secondary: "Review the four test stages",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "AGM separator quality inspection and thickness measurement",
        width: 1200,
        height: 800
      }
    },
    intro: [
      "AGM separator sampling often stops at assembly: dry thickness is within tolerance, the plate group fits and initial compression matches the drawing. A battery, however, does not remain dry. Electrolyte filling changes the glass mat, and cycling repeatedly compresses and releases it.",
      "The cited supplier material compares dry, post-filling and post-cycling retention. The useful lesson is methodological: a single incoming thickness value cannot describe long-term support. The cited conditions are comparison examples, not Viking specifications or universal battery-design targets."
    ],
    sections: [
      {
        eyebrow: "Dry Thickness",
        title: "A thickness result only answers the pre-assembly question",
        text:
          "AGM is compressible, so every thickness value needs a measurement pressure. Two materials can show similar thickness at one pressure point while having different compression curves and recovery. The cited company presents a thickness-versus-pressure curve, a 1.25 mm insertion gap at 50 kPa for comparison, and product-table thickness measured at 10 kPa. Without the test pressure, plate thickness, separator layers and assembly gap, nominal thickness does not fully describe the installed state."
      },
      {
        eyebrow: "After Filling",
        title: "Electrolyte filling is the first boundary for pressure change",
        text:
          "Wetting can change interactions within the glass-fiber network, and published studies note that conventional mats may shrink after wetting, reducing plate-group force. A useful record therefore controls acid density, temperature, filling quantity and rest time, then states whether wet thickness or residual force is measured at constant pressure or constant gap. Results obtained under different conditions should not be compared as if they were equivalent."
      },
      {
        eyebrow: "After Cycling",
        title: "Residual force after repeated compression is closer to the working condition",
        text:
          "During battery operation, plates and separator experience structural change and repeated compression. The cited company also shows comparative retention after dry, filling and cycling stages, including a value labelled projected (proxy) after 10,000 cycles. That is a material-level proxy comparison, not a claim that every battery has completed 10,000 charge-discharge cycles. Battery life still depends on plates, grids, acid quantity, temperature, charging regime and assembly design."
      },
      {
        eyebrow: "Reproducible Sampling",
        title: "A useful sample record should connect four stages",
        text:
          "Incoming inspection, assembly, filling and cycling should use traceable conditions. The objective is not to collect the largest possible data table, but to make samples repeatable: record the batch and method, hold the assembly and electrolyte conditions constant, and relate separator retention to capacity, resistance and teardown observations from the complete battery."
      },
      {
        eyebrow: "Specification Coordination",
        title: "Viking starts by aligning the test boundary, not comparing isolated numbers",
        text:
          "For VRLA applications, Viking supplies AGM separator rolls and sheets and can review thickness, width, sheet dimensions and packing. For compression and retention discussions, share the battery application, plate-group structure, design gap, target thickness, measurement pressure and any existing filling or cycling method. Suitability for volume use remains subject to the customer's material and complete-battery validation."
      }
    ],
    parameters: [
      ["Incoming", "Record batch, basis weight, dry thickness and the exact measurement pressure; add a compression curve when comparing materials."],
      ["Assembly", "Record plate thickness, separator layers, design gap, target compression and actual insertion behavior."],
      ["After filling", "Control acid density, temperature, quantity and rest time; state constant-pressure or constant-gap measurement."],
      ["After cycling", "Record wet or dry state, compression limits, cycle count, frequency and temperature, then link retention to battery results."]
    ],
    formats: {
      eyebrow: "Test Evidence",
      title: "Material form, measurement method and battery validation must stay connected",
      items: [
        ["AGM separator rolls", "Roll width, winding and batch identification affect repeatable sampling and line use.", "/images/viking-finished-separator-roll-900.webp", "Viking AGM separator roll"],
        ["Quality inspection", "Thickness and compression results are only comparable when pressure, conditioning and equipment are stated.", "/images/agm-quality-control-1200.webp", "AGM separator quality inspection"],
        ["AGM separator sheets", "Finished sheet dimensions and layer count should match the plate-group and assembly-gap record.", "/images/sheets1-900.webp", "Viking AGM separator sheets"]
      ]
    },
    checklist: {
      eyebrow: "Sample Test Checklist",
      title: "Prepare these conditions before comparing pressure retention",
      text:
        "A shared method is more valuable than an isolated retention percentage because it allows the result to be repeated and related to battery performance.",
      items: ["Thickness measurement pressure", "Plate group and design gap", "Electrolyte and rest conditions", "Constant-pressure or constant-gap method", "Cycle profile and battery-level observations"]
    },
    references: {
      eyebrow: "References",
      title: "Published methods and technical boundaries",
      text:
        "The cited test conditions explain comparison methods. They are not Viking product specifications or universal design values. Compression targets must be verified for the battery structure and operating conditions.",
      items: pressureRetentionReferenceItems
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with technical parameters, testing and consistency",
      items: [
        ["Key Technical Parameters of AGM Separators", "/blog/key-technical-parameters-of-agm-separator/"],
        ["Why AGM Separator Consistency Matters", "/blog/agm-separator-performance-consistency/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["AGM Battery Separators", "/products/agm-separator/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Review compression and pressure-retention requirements",
      text:
        "Share the battery application, plate-group structure, design gap, target thickness, measurement pressure and existing filling or cycling method.",
      checklist: ["Battery application", "Plate group and gap", "Thickness and test pressure", "Filling and cycling method"],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        message: "Battery application, plate-group structure, design gap, target thickness, test pressure, electrolyte and cycling conditions"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/",
    brandName: articleCopy.zh.brandName,
    quote: "申请样品",
    hero: {
      eyebrow: "压缩与回弹",
      title: "隔板装进去没问题，循环以后还能保持压力吗？",
      subtitle: "AGM 隔板的初始厚度只是起点。填酸后的收缩、回弹和循环后的残余压力，才更接近它在电池里的长期状态。",
      primary: "申请样品与规格匹配",
      secondary: "查看四阶段测试清单",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "AGM 隔板质量检测与厚度测量",
        width: 1200,
        height: 800
      }
    },
    intro: [
      "AGM 隔板打样记录常停在装配完成的一刻：干态厚度合格，极群能装进去，初始压缩也在设计范围内。但电池不会一直停在干态。填酸会改变玻璃纤维毡状态，循环还会让隔板反复受压与恢复。",
      "所引企业公开资料把比较延伸到干态、填酸后和循环后的保持状态。这里真正可借鉴的是比较方法，而不是把资料中的条件直接当作维京规格或通用设计值。"
    ],
    sections: [
      { eyebrow: "干态厚度", title: "厚度合格，只回答了装配前的问题", text: "AGM 是可压缩材料，每个厚度值都应注明测试压力。两款材料在一个压力点厚度接近，压缩曲线和卸压恢复仍可能不同。所引企业资料同时展示厚度随压力变化曲线、用于比较的 1.25 mm 装配间隙和 50 kPa 条件，以及产品表中 10 kPa 下的厚度。没有测试压力、极板厚度、隔板层数和设计间隙，单独的标称厚度很难完整描述装入极群后的状态。" },
      { eyebrow: "填酸以后", title: "填酸，是压力变化的第一道分界线", text: "电解液润湿会改变玻璃纤维网络的作用状态，已有研究指出传统玻纤毡湿润后可能收缩，并使板群压力下降。因此记录应统一电解液密度、温度、加液量和静置时间，同时说明采用固定压力还是固定间隙测量湿态厚度或残余压力。条件不同的保持率不能直接横向比较。" },
      { eyebrow: "循环以后", title: "循环后的残余压力，更接近长期工作状态", text: "电池运行中，极板和隔板会经历结构变化与反复压缩。所引企业资料展示干态、填酸后和循环阶段的比较保持率，并给出标注为 projected（proxy）的 10,000 次循环后比较值。它属于材料层面的代理比较，不等于所有电池都完成了 10,000 次实际充放电。整电池寿命仍受极板、板栅、酸量、温度、充电制度和装配结构共同影响。" },
      { eyebrow: "可复现打样", title: "一份有用的打样记录，应把四个阶段连起来", text: "来料、装配、填酸和循环要采用可追溯条件。目标不是一次铺开最大的参数表，而是让样品能够复测：记录批次与方法，固定装配和电解液条件，再把隔板保持状态与整电池容量、内阻变化和拆解观察对应起来。" },
      { eyebrow: "规格协同", title: "维京先对齐测试边界，再比较同一个数值", text: "围绕 VRLA 应用，维京可提供 AGM 隔板卷材和片材，并配合确认厚度、宽度、片材尺寸和包装。涉及压缩与压力保持时，建议提供电池应用、极群结构、设计间隙、目标厚度、测试压力，以及现有填酸或循环方法。是否适合批量使用，仍应以客户材料测试和整电池验证为准。" }
    ],
    parameters: [
      ["来料阶段", "记录批次、克重、干态厚度和对应测试压力；比较材料时可增加压缩曲线。"],
      ["装配阶段", "记录极板厚度、隔板层数、设计间隙、目标压缩和实际插入状态。"],
      ["填酸阶段", "固定酸密度、温度、加液量和静置时间，并注明固定压力或固定间隙。"],
      ["循环阶段", "记录干湿状态、压缩上下限、循环次数、频率和温度，再与整电池结果对应。"]
    ],
    formats: {
      eyebrow: "测试与产品资料",
      title: "产品形式、测试方法与整电池验证应保持关联",
      items: [
        ["AGM 隔板卷材", "卷材宽度、收卷状态和批次标识会影响可复现取样与生产线使用。", "/images/viking-finished-separator-roll-900.webp", "湖北维京 AGM 隔板卷材"],
        ["质量检测", "只有注明压力、预处理和设备条件，厚度与压缩数据才具有可比性。", "/images/agm-quality-control-1200.webp", "湖北维京 AGM 隔板质量检测"],
        ["AGM 隔板片材", "成品片材尺寸和层数应与极群结构及设计间隙记录一致。", "/images/sheets1-900.webp", "湖北维京 AGM 隔板片材"]
      ]
    },
    checklist: {
      eyebrow: "打样测试清单",
      title: "比较压力保持前，先统一这些条件",
      text: "共同测试方法比一个孤立的保持率更有价值，因为结果可以复测，也能和整电池表现对应。",
      items: ["厚度测试压力", "极群结构与设计间隙", "电解液和静置条件", "固定压力或固定间隙方法", "循环条件与整电池观察"]
    },
    references: {
      eyebrow: "资料来源",
      title: "公开方法与适用边界",
      text: "文中测试条件用于说明比较方法，不作为维京产品规格或通用设计值。具体压缩范围需结合电池结构和运行条件验证。",
      items: pressureRetentionReferenceItems
    },
    related: {
      eyebrow: "相关页面",
      title: "继续了解技术参数、检测和批次一致性",
      items: [
        ["AGM 隔板关键技术参数", "/zh/blog/key-technical-parameters-of-agm-separator/"],
        ["AGM 隔板一致性为什么重要", "/zh/blog/agm-separator-performance-consistency/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["AGM 电池隔板", "/zh/products/agm-separator/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "确认压缩与压力保持测试条件",
      text: "请提供电池应用、极群结构、设计间隙、目标厚度、测试压力和已有填酸或循环方法。",
      checklist: ["电池应用", "极群结构与间隙", "厚度与测试压力", "填酸与循环方法"],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        message: "电池应用、极群结构、设计间隙、目标厚度、测试压力、电解液和循环条件"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const batchProcessControlReferenceItems: Array<[string, string]> = [
  [
    "Public source — intelligent manufacturing and full-process quality management",
    "https://www.kstar.com/cn/index.php/news/info/1269.html"
  ]
];

const agmSeparatorBatchProcessControlCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/agm-separator-batch-consistency-and-process-control/",
    brandName: articleCopy.en.brandName,
    quote: "Request Sample",
    hero: {
      eyebrow: "Batch Consistency",
      title: "Why One Passing Test Does Not Prove an AGM Separator Is Ready for Volume Production",
      subtitle:
        "Thickness, basis weight and absorption passing one inspection only describe that sample. Continuous assembly depends on variation between positions, rolls and production batches.",
      primary: "Request a Sample & Specification Match",
      secondary: "Review the audit checklist",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "AGM separator quality inspection at Hubei Viking",
        width: 1200,
        height: 800
      }
    },
    intro: [
      "A first sample can pass inspection and assemble smoothly, while the next batch still requires repeated line adjustment. The issue is not always an out-of-spec result. A single inspection describes a point; volume production exposes variation across time, rolls and sampling positions.",
      "For buyers and quality teams, the useful question is therefore not only whether the reported average passes. It is whether the agreed method can show repeatable performance from roll head to tail and from sample approval through pilot and volume supply."
    ],
    comparison: {
      eyebrow: "Illustrative Data",
      title: "The same average can hide very different dispersion",
      columns: ["Comparison", "Sample set A", "Sample set B"],
      rows: [
        ["Measurements", "1.50 / 1.50 / 1.50 mm", "1.44 / 1.50 / 1.56 mm"],
        ["Average", "1.50 mm", "1.50 mm"],
        ["Range", "0.00 mm", "0.12 mm"],
        ["Interpretation", "All three points coincide in this illustration.", "The same average masks wider point-to-point variation."]
      ]
    },
    sections: [
      {
        eyebrow: "Process Data",
        title: "Downstream manufacturing is already managing consistency with process data",
        text:
          "The cited company's July 2026 manufacturing update describes automated plate lines, robot cast welding, MES and a digital-twin quality platform covering incoming material, processing, finished-product inspection and outgoing verification. This is a downstream battery-company example, not evidence of Viking's production system. The sourcing signal is still relevant: as battery plants manage more of the process digitally, a supplier average and one certificate are no longer enough to explain repeatability."
      },
      {
        eyebrow: "Single Inspection",
        title: "A passing report only answers whether the sampled points crossed the line",
        text:
          "A certificate does not by itself show where the sample came from, whether roll head, middle and tail are similar, or whether another roll and production batch will reproduce the result. Sampling too few fixed positions can miss local movement that later appears during continuous unwinding and assembly. The illustrative thickness values above are not Viking specifications; they simply show why equal averages can carry different process risk."
      },
      {
        eyebrow: "Assembly Impact",
        title: "Separator variation continues into the plate-group assembly process",
        text:
          "Thickness variation changes actual compression within a fixed group gap. Basis-weight and structure variation may correspond to changes in fiber distribution, absorption, porosity and compression behavior. Width, sheet dimensions, roll edges and winding affect line feeding, adjustment and material loss. None of these variables alone determines battery performance, but more stable incoming material removes variables from assembly and failure analysis."
      },
      {
        eyebrow: "Statistical Review",
        title: "Volume readiness requires more than an average",
        text:
          "Average locates the center; maximum, minimum and range show the observed spread; standard deviation and coefficient of variation help compare dispersion; and a time-ordered trend can reveal drift before the pass rate changes. Cp and Cpk are useful only when specification limits are defined, the measurement system is reliable and the process is statistically stable. They cannot be responsibly inferred from a few samples or used instead of battery assembly and performance validation."
      },
      {
        eyebrow: "Sampling Plan",
        title: "Dispersion is only meaningful when sampling locations are documented",
        text:
          "For rolls, a risk-based plan can compare head, middle and tail and, where relevant, positions across the web. Cross-batch work should cover multiple production batches and rolls rather than repeated readings from one roll. Sheet sampling should identify source rolls and slit positions and check whether stacking and packing affect dimensions. Sample, pilot and stable-production frequencies may differ, but every change needs a documented basis."
      },
      {
        eyebrow: "Traceability Review",
        title: "A useful audit asks where an abnormal result came from",
        text:
          "Supplier review can ask how shipment batches, roll or sheet identifiers, production batches, test records and packing records are linked; which properties are checked by roll or batch; and how abnormal data are isolated and reviewed. This is an audit framework, not a claim that Viking currently operates MES or a fully digital traceability platform. Coding, record-retention and sample-retention requirements should be confirmed for the specific project."
      },
      {
        eyebrow: "Viking Coordination",
        title: "Align the volume-evaluation method during the sample stage",
        text:
          "Viking manufactures AGM glass-fiber separator rolls and sheets for VRLA applications and can discuss thickness, width, sheet size and packing. For a project moving toward volume production, share the current specification, priority test items and supplier-audit checklist. We can first align the test method, sampling locations, inspection frequency, acceptance range and required batch identification; suitability remains subject to the customer's material, assembly and complete-battery validation."
      }
    ],
    parameters: [
      ["Average", "Shows where the data center sits, but can conceal movement at the upper and lower ends."],
      ["Range", "Quickly shows the observed span; interpret it with sample size, position and possible outliers."],
      ["Standard deviation & CV", "Describe dispersion and support comparison, provided the method and conditions remain the same."],
      ["Trend, Cp & Cpk", "Use trends to detect drift; use capability indices only after measurement and process stability are established."]
    ],
    formats: {
      eyebrow: "Production Evidence",
      title: "Sampling, inspection and shipment records should describe the same batch",
      items: [
        ["Roll-position sampling", "Identify roll, batch and head/middle/tail positions before comparing dispersion.", "/images/viking-finished-separator-roll-900.webp", "Viking AGM separator roll for position-based sampling"],
        ["Consistent test conditions", "Equipment, conditioning, pressure and sample location must stay consistent for comparable results.", "/images/agm-quality-control-1200.webp", "AGM separator quality inspection"],
        ["Packing and shipment link", "Project-specific coding should connect accepted material with packing and shipment records.", "/images/evidence/shipping-pallet-01.webp", "AGM separator packing and shipment"]
      ]
    },
    checklist: {
      eyebrow: "Supplier Audit Checklist",
      title: "Confirm these boundaries before pilot or volume production",
      text:
        "A shared sampling and acceptance method is more useful than a single attractive report because it makes later batches comparable and exceptions reviewable.",
      items: ["Test method and conditioning", "Roll and cross-web sampling positions", "Inspection frequency by project stage", "Acceptance limits and trend review", "Batch identifiers and exception handling"]
    },
    references: {
      eyebrow: "Reference",
      title: "A downstream example of process-based quality management",
      text:
        "The cited company source describes a battery manufacturer's system and is cited only to illustrate downstream expectations. It does not verify Viking's equipment, MES, traceability scope or record-retention period.",
      items: batchProcessControlReferenceItems
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with consistency, testing and sample evaluation",
      items: [
        ["Why AGM Separator Consistency Matters", "/blog/agm-separator-performance-consistency/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["Key Technical Parameters of AGM Separators", "/blog/key-technical-parameters-of-agm-separator/"],
        ["Request a Sample & Specification Match", "/request-agm-separator-sample/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Review the sampling and acceptance method for volume production",
      text:
        "Share your specification, priority test items, intended sampling locations and supplier-audit checklist so the comparison boundary is clear before pilot production.",
      checklist: ["Application and battery design", "Specification and test method", "Sampling positions and frequency", "Pilot or volume-production stage"],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        message: "Application, specification, priority tests, sampling plan, acceptance limits and current project stage"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/agm-separator-batch-consistency-and-process-control/",
    brandName: articleCopy.zh.brandName,
    quote: "申请样品",
    hero: {
      eyebrow: "批次一致性",
      title: "为什么单次检测合格，不等于 AGM 隔板适合批量生产？",
      subtitle:
        "厚度、克重和吸液量达到要求，只能说明这次抽检过关。连续装配更关心不同批次、不同卷材和同一卷不同位置能否保持稳定。",
      primary: "申请样品与规格匹配",
      secondary: "查看供应商审核清单",
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "湖北维京 AGM 隔板质量检测",
        width: 1200,
        height: 800
      }
    },
    intro: [
      "第一批样品检测合格、装配顺利，第二批参数仍在规格范围内，生产线却开始频繁调整。这类问题不一定来自某个参数不合格，更多时候是单次检测只看到了一个点，没有看到连续生产中的波动。",
      "对采购和质量团队来说，真正要确认的不只是报告平均值是否合格，而是同一评价方法能否覆盖卷头、卷中、卷尾，不同卷材和不同生产批次，并从样品、试产延续到批量阶段。"
    ],
    comparison: {
      eyebrow: "示例数据",
      title: "平均值相同，离散程度可以完全不同",
      columns: ["比较项", "样本 A", "样本 B"],
      rows: [
        ["检测值", "1.50 / 1.50 / 1.50 mm", "1.44 / 1.50 / 1.56 mm"],
        ["平均值", "1.50 mm", "1.50 mm"],
        ["极差", "0.00 mm", "0.12 mm"],
        ["说明", "示例中的三个点完全重合。", "相同平均值掩盖了更大的点位波动。"]
      ]
    },
    sections: [
      {
        eyebrow: "过程数据",
        title: "下游已经开始用过程数据管理一致性",
        text:
          "所引企业 2026 年 7 月发布的制造信息提到自动化极板生产线、机器人铸焊，以及覆盖原料、加工、成品检测和出厂核验的 MES 与数字孪生质控平台。这是下游电池企业的公开案例，不能等同于维京自身的生产体系。但它传递出的采购信号很清楚：当电池厂越来越重视过程数据，上游材料只提供一个平均值和一张合格报告，通常已经不足以解释可重复性。"
      },
      {
        eyebrow: "单次抽检",
        title: "一张合格报告，只能回答这次抽样有没有过线",
        text:
          "合格证无法单独说明样品取自卷材哪个位置，卷头、卷中和卷尾是否接近，也不能证明换一卷或换一个生产批次后仍能复现。如果取样少且位置固定，局部波动可能直到连续放卷和装配时才显现。上方厚度数据仅用于说明统计差异，不代表维京产品规格或公差。"
      },
      {
        eyebrow: "装配影响",
        title: "隔板的波动，会沿着装配过程继续传递",
        text:
          "厚度波动会改变固定极群间隙中的实际压缩状态；克重和结构波动可能对应纤维分布、吸液、孔隙和受压表现差异；宽度、片材尺寸、端面和收卷状态则直接影响放卷、调机和材料损耗。隔板并不单独决定最终电池结果，但上游材料越稳定，电池厂装配和问题排查时面对的变量就越少。"
      },
      {
        eyebrow: "统计评估",
        title: "判断批量稳定，不能只盯着平均值",
        text:
          "平均值说明数据中心位置，最大值、最小值和极差展示已观察到的跨度，标准差与变异系数用于辅助比较离散程度，按时间或批次排列的趋势图则有助于提前发现漂移。只有在规格上下限明确、测量系统可靠且过程处于统计稳定状态时，才适合进一步使用 Cp、Cpk。少量样品计算出的漂亮数值，不能替代装配和整电池验证。"
      },
      {
        eyebrow: "取样方案",
        title: "取样位置不写清，离散度也可能失真",
        text:
          "卷材可以根据项目风险比较卷头、卷中和卷尾，较宽卷材还可关注横向不同位置。跨批次验证应覆盖多个生产批次和多卷产品，而不是把同一卷多测几次当作批次稳定性。片材则要记录来源卷材、分切位置，并确认堆叠和包装后尺寸是否变化。样品、试产和稳定量产阶段可以采用不同频次，但调整依据需要留痕。"
      },
      {
        eyebrow: "追溯审核",
        title: "质量追溯，要能回答异常来自哪一段",
        text:
          "供应商审核可以继续追问出货批次、卷材或片材编号、生产批次、检测记录与包装记录如何关联；哪些参数按卷检测、哪些按批检测；异常数据如何隔离和复核。这是一套审核框架，不代表维京目前已部署 MES 或完整数字化追溯平台。具体批次编码、记录保存和留样要求，应按项目单独确认。"
      },
      {
        eyebrow: "维京配合",
        title: "从样品阶段开始确认批量评价方法",
        text:
          "维京持续专注 VRLA 电池用 AGM 玻璃纤维隔板制造，可提供卷材和片材，并支持厚度、宽度、片材尺寸及包装沟通。准备进入批量的项目，可以提供现行规格书、重点检测项目和供应商审核清单，先共同确认测试方法、取样位置、检测频次、判定范围和批次标识要求。最终是否适合批量使用，仍应以客户的材料、装配和整电池验证为准。"
      }
    ],
    parameters: [
      ["平均值", "说明过程大致落在哪里，但可能掩盖上下两端的波动。"],
      ["最大值、最小值与极差", "快速展示已观察到的跨度，需要结合取样数量、位置和异常值判断。"],
      ["标准差与变异系数", "描述离散程度并辅助跨指标比较，前提是测试方法和条件一致。"],
      ["趋势图、Cp 与 Cpk", "趋势用于发现漂移；过程能力指数应在测量可靠且过程稳定后使用。"]
    ],
    formats: {
      eyebrow: "生产证据",
      title: "取样、检测与出货记录应指向同一批产品",
      items: [
        ["卷材位置取样", "比较离散度前，先明确卷号、批次和卷头、卷中、卷尾位置。", "/images/viking-finished-separator-roll-900.webp", "湖北维京 AGM 隔板卷材位置取样"],
        ["统一检测条件", "设备、预处理、测试压力和取样位置一致，数据才具有可比性。", "/images/agm-quality-control-1200.webp", "湖北维京 AGM 隔板质量检测"],
        ["包装与出货关联", "项目确认的批次标识应能把合格材料与包装、出货记录关联起来。", "/images/evidence/shipping-pallet-01.webp", "湖北维京 AGM 隔板包装与出货"]
      ]
    },
    checklist: {
      eyebrow: "供应商审核清单",
      title: "试产或批量前，先确认这些评价边界",
      text: "共同的取样和判定方法比一张漂亮报告更有价值，因为后续批次可以比较，异常也有依据复核。",
      items: ["测试方法与样品预处理", "卷向与横向取样位置", "不同项目阶段的检测频次", "判定范围与趋势复核", "批次标识与异常处置要求"]
    },
    references: {
      eyebrow: "资料来源",
      title: "下游过程质量管理的公开案例",
      text:
        "所引企业资料用于说明电池制造端的过程管理趋势，不用于证明维京的设备、MES、追溯范围或记录保存周期。",
      items: batchProcessControlReferenceItems
    },
    related: {
      eyebrow: "相关页面",
      title: "继续了解一致性、检测和样品评估",
      items: [
        ["AGM 隔板一致性为什么重要", "/zh/blog/agm-separator-performance-consistency/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["AGM 隔板关键技术参数", "/zh/blog/key-technical-parameters-of-agm-separator/"],
        ["申请样品与规格匹配", "/zh/request-agm-separator-sample/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "确认批量试产的取样与判定方法",
      text: "请提供现行规格书、重点检测项目、计划取样位置和供应商审核清单，先把比较边界确认清楚。",
      checklist: ["电池应用与结构", "规格书与测试方法", "取样位置与检测频次", "试产或批量阶段"],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        message: "电池应用、规格书、重点检测项目、取样方案、判定范围和当前项目阶段"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const agmSeparatorSupplyChainReferenceItems: Array<[string, string]> = [
  [
    "Public source — public company profile",
    "https://www.cz-haixin.com.cn/about.html"
  ],
  [
    "Public source — glass blocks, ultrafine glass fiber wool and AGM separator product information",
    "https://www.huayangagm.com/product/5/"
  ],
  [
    "Public source — public company profile",
    "https://www.ykrijie.com/boluo_company/"
  ],
  [
    "Public source — public AGM separator production-line technical material",
    "https://leochlithium.cn/uploads/ueditor/file/20220708/6379287233502083425967267.pdf"
  ]
];

const agmSeparatorSupplyChainCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/agm-separator-supply-chain-from-glass-block-to-finished-roll/",
    brandName: articleCopy.en.brandName,
    quote: "Request Sample",
    hero: {
      eyebrow: "AGM Supply Chain",
      title: "From Glass Block to Separator: What an AGM Supply Chain Really Involves",
      subtitle:
        "An AGM separator is the visible end of a longer material chain. Fiber condition, wet-laid processing, drying, winding, conversion and records all affect what a battery factory receives.",
      primary: "Request a Sample & Specification Match",
      secondary: "Review the sourcing checklist",
      image: {
        src: "/images/agm-hero-production-1600.webp",
        alt: "Modern AGM separator production equipment at Hubei Viking",
        width: 1600,
        height: 1000
      }
    },
    intro: [
      "An AGM separator may arrive as a finished roll or a cut sheet, but its suitability for VRLA battery production begins earlier. The supply chain normally spans glass preparation, ultrafine fiber conversion, slurry preparation, wet-laid forming, drying, winding, inspection, slitting or sheeting, packing and shipment.",
      "Public company materials in the AGM sector describe parts of this chain, but they should not be read as one universal factory process or as proof of a supplier's quality system. For buyers, the practical issue is whether the material, process controls and delivery records can support the agreed battery design repeatedly."
    ],
    sections: [
      {
        eyebrow: "Starting Material",
        title: "The chain begins before separator making",
        text:
          "AGM separator production depends on a glass composition suitable for conversion into very fine fibers. Public sector materials commonly describe glass blocks or glass feedstock, followed by ultrafine glass fiber wool and AGM separator products. This sequence is useful for understanding the material path, but it does not mean every supplier uses identical glass chemistry, equipment or acceptance criteria. The relevant question is whether incoming material controls and change communication are adequate for the project."
      },
      {
        eyebrow: "Fiber Condition",
        title: "Fine glass fiber must become a controlled furnish",
        text:
          "Before a separator web is formed, fiber preparation and dispersion determine the furnish entering the wet-laid process. Fiber length distribution, clumps, foreign material and moisture condition can change how the web forms and handles later. A buyer does not need to prescribe a supplier's internal recipe, but should align the properties that matter for the battery design and ask how material changes are identified before they reach an approved specification."
      },
      {
        eyebrow: "Wet-Laid Forming",
        title: "A separator web is formed, not simply cut from a fiber roll",
        text:
          "AGM separator is generally made through a wet-laid process in which dispersed glass fibers are formed into a continuous web, then dewatered and dried. Production-line descriptions from the sector refer to pulping, forming, drying and winding stages. The finished material therefore reflects the interaction of fiber furnish and process conditions, not just a nominal thickness printed on a specification sheet."
      },
      {
        eyebrow: "Conversion",
        title: "Drying, winding and cutting are part of the delivered material",
        text:
          "After web formation, drying and winding establish the roll that will later be handled, slit or converted into sheets. Roll width, edge condition, winding quality, core, diameter and sheet dimensions affect feeding and assembly at the battery factory. These conversion details should be agreed as part of the product form, because a material that passes laboratory checks can still create avoidable handling or line-adjustment issues."
      },
      {
        eyebrow: "Quality Boundary",
        title: "Upstream integration is not a substitute for evidence",
        text:
          "A supplier that participates in more upstream stages may have more direct influence over material availability and change control. It does not automatically prove suitable fiber quality, stable separator performance or reliable delivery for a particular battery. Technical evaluation still needs agreed tests, representative samples, batch comparison and complete-battery validation. Buyers should evaluate evidence, not only the number of stages shown in a supply-chain diagram."
      },
      {
        eyebrow: "Traceability",
        title: "A useful supply chain can explain what was delivered",
        text:
          "For pilot and volume work, a practical record chain connects shipment batch, finished roll or sheet identifier, conversion record, production batch and relevant inspection results. The exact depth of traceability should be agreed by project. What matters is that an abnormal assembly result can be investigated with a defined batch boundary instead of relying on a general statement that the material came from the same product family."
      },
      {
        eyebrow: "Viking Coordination",
        title: "Start with the battery design and the delivery form",
        text:
          "Viking manufactures AGM glass-fiber separator rolls and sheets for VRLA battery applications. To begin a useful technical discussion, share the battery application, target thickness, plate-group dimensions, roll or sheet format, packing requirements and current project stage. We can first align the specification boundary and sample information; final suitability remains subject to the customer's material, assembly and complete-battery validation."
      }
    ],
    parameters: [
      ["Starting material", "Ask what project-level material changes require communication and how approved specifications are protected."],
      ["Web formation", "Compare thickness, basis weight, absorption-related behavior and mechanical handling under agreed methods."],
      ["Product conversion", "Confirm roll width, core, diameter, edge condition or sheet dimensions for the intended assembly route."],
      ["Delivery records", "Define the identifiers and inspection records needed to compare samples, pilot material and volume batches."]
    ],
    formats: {
      eyebrow: "Supply-Chain Evidence",
      title: "The delivered separator should connect material, conversion and shipment",
      items: [
        ["Continuous separator web", "A finished roll reflects forming, drying and winding before it is converted for a battery line.", "/images/agm-hero-production-1600.webp", "AGM separator production equipment at Hubei Viking"],
        ["Inspection before release", "Project requirements should define comparable test methods and the records associated with accepted material.", "/images/agm-quality-control-1200.webp", "AGM separator quality inspection at Hubei Viking"],
        ["Rolls, sheets and packing", "Delivery form, identification and packing should match receiving, storage and assembly conditions.", "/images/evidence/shipping-pallet-01.webp", "Packed AGM separator shipment on pallets"]
      ]
    },
    checklist: {
      eyebrow: "Sourcing Checklist",
      title: "Questions that make a supply-chain discussion actionable",
      text:
        "A clear project boundary is more useful than a broad claim about vertical integration. Use these points to connect raw material, separator performance and delivery expectations.",
      items: ["Battery application and plate-group design", "Target thickness and agreed test conditions", "Roll or sheet dimensions and packing", "Sample, pilot and volume batch comparison", "Change communication and required delivery records"]
    },
    references: {
      eyebrow: "Reference Materials",
      title: "Public industry materials used to explain the chain",
      text:
        "These references describe parts of the AGM supply chain or production equipment. They are not used to verify Viking's upstream sources, equipment configuration or quality-system scope. Specific project requirements should be confirmed directly during technical review.",
      items: agmSeparatorSupplyChainReferenceItems
    },
    related: {
      eyebrow: "Related Pages",
      title: "Continue with manufacturing, consistency and specification review",
      items: [
        ["AGM Separator Manufacturing & Delivery", "/blog/agm-separator-manufacturing-quality-delivery/"],
        ["AGM Separator Batch Consistency & Process Control", "/blog/agm-separator-batch-consistency-and-process-control/"],
        ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
        ["Request a Sample & Specification Match", "/request-agm-separator-sample/"]
      ]
    },
    inquiry: {
      ...articleCopy.en.inquiry,
      title: "Review AGM separator supply and conversion requirements",
      text:
        "Share the battery application, target thickness, dimensions, roll or sheet format, packing needs and project stage so the specification discussion starts with a defined delivery boundary.",
      checklist: ["Battery application and dimensions", "Target separator thickness", "Roll or sheet delivery form", "Packing and batch-record requirements"],
      placeholders: {
        ...articleCopy.en.inquiry.placeholders,
        message: "Battery application, target thickness, plate-group dimensions, roll or sheet format, packing requirements and project stage"
      }
    },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/agm-separator-supply-chain-from-glass-block-to-finished-roll/",
    brandName: articleCopy.zh.brandName,
    quote: "申请样品",
    hero: {
      eyebrow: "AGM 供应链",
      title: "从玻璃料块到成品隔板：AGM 隔板供应链到底包含哪些环节？",
      subtitle:
        "一卷或一片成品 AGM 隔板背后，涉及纤维状态、湿法成型、干燥、收卷、分切、包装和记录管理。电池厂最终收到的材料，来自这整条链路的共同作用。",
      primary: "申请样品与规格匹配",
      secondary: "查看采购确认清单",
      image: {
        src: "/images/agm-hero-production-1600.webp",
        alt: "湖北维京现代 AGM 隔板生产设备",
        width: 1600,
        height: 1000
      }
    },
    intro: [
      "AGM 隔板交到电池厂时，可能是一卷卷材，也可能是裁切好的片材。但它是否适合 VRLA 电池生产，判断并不从收货那一刻才开始。通常还要经过玻璃原料、超细玻璃纤维、制浆分散、湿法成型、脱水干燥、收卷、检测、分切或裁片、包装与出货等环节。",
      "行业企业公开资料能够帮助理解这条材料路径，但不能把任何一家企业的流程当成统一行业标准，也不能据此判断另一家供应商的质量能力。对采购团队而言，更实际的问题是：材料、过程控制和交付记录能否持续支撑已确认的电池设计。"
    ],
    sections: [
      {
        eyebrow: "起始材料",
        title: "隔板制造开始于成网之前",
        text:
          "AGM 隔板的生产依赖适合进一步拉制为超细纤维的玻璃组成。行业公开资料中常见玻璃料块或玻璃原料、超细玻璃纤维棉、AGM 隔板等产品环节。这一顺序有助于理解材料来源，但不代表所有供应商采用相同的玻璃配方、设备或验收标准。项目真正需要确认的是，来料控制和材料变更沟通能否满足既定规格。"
      },
      {
        eyebrow: "纤维状态",
        title: "超细玻璃纤维需要先成为可控的成网原料",
        text:
          "在隔板成网之前，纤维制备和分散会影响进入湿法成型环节的浆料状态。纤维长度分布、结团、异物和含水状态，都可能改变后续成网与加工表现。采购方不需要规定供应商的内部配方，但应围绕电池设计确认关键性能，并了解材料变化如何在进入已批准规格前被识别和沟通。"
      },
      {
        eyebrow: "湿法成型",
        title: "AGM 隔板是成网形成的材料，不是从纤维卷上直接裁下来的产品",
        text:
          "AGM 隔板通常通过湿法工艺制造：分散后的玻璃纤维形成连续纤维网，再经过脱水与干燥。行业生产线资料常提到制浆、成型、干燥和收卷等步骤。因此，成品状态来自纤维原料与过程条件的共同作用，而不只是规格书上某一个标称厚度。"
      },
      {
        eyebrow: "后道加工",
        title: "干燥、收卷和裁切也是交付材料的一部分",
        text:
          "成网之后，干燥和收卷形成后续供给、分切或裁片的卷材。卷材宽度、边部状态、收卷质量、纸芯、卷径和片材尺寸都会影响电池厂的上机与装配。它们应当作为产品形式的一部分提前确认，因为一款实验室检测合格的材料，仍可能在现场造成不必要的送料、调机或损耗问题。"
      },
      {
        eyebrow: "质量边界",
        title: "上游环节更多，不等于质量已经得到证明",
        text:
          "供应商参与更多上游环节，可能意味着对材料可得性和变更控制拥有更直接的影响，但这并不能自动证明其纤维质量、隔板表现或对某款电池的交付可靠性。技术评价仍需要统一的测试方法、代表性样品、批次对比和整电池验证。采购应评估可核对的证据，而不只看供应链图上覆盖了多少环节。"
      },
      {
        eyebrow: "追溯与交付",
        title: "有效的供应链需要能解释这批材料从哪里来",
        text:
          "进入试产和批量阶段后，实用的记录链应能把出货批次、成品卷材或片材编号、后道转换记录、生产批次和相关检测结果关联起来。具体追溯深度可按项目约定，但核心是：当电池装配出现异常时，双方能在明确批次边界内排查，而不是只得到“属于同一产品系列”的笼统说法。"
      },
      {
        eyebrow: "维京配合",
        title: "先从电池设计和交付形式开始确认",
        text:
          "维京持续专注于 VRLA 电池用 AGM 玻璃纤维隔板制造，可提供卷材、片材等产品形式。开始沟通时，建议提供电池应用、目标厚度、极群尺寸、卷材或片材形式、包装要求和当前项目阶段。我们会先配合确认规格边界和样品信息；是否适合后续使用，仍应以客户的材料、装配与整电池验证结果为准。"
      }
    ],
    parameters: [
      ["起始材料", "确认哪些项目级材料变更需要沟通，以及已确认规格如何得到持续保护。"],
      ["成网过程", "在统一方法下比较厚度、克重、吸液相关表现和加工强度。"],
      ["产品形式", "按实际装配方式确认卷材宽度、纸芯、卷径、边部状态或片材尺寸。"],
      ["交付记录", "明确样品、试产与批量材料比较所需的编号和检测记录。"]
    ],
    formats: {
      eyebrow: "供应链证据",
      title: "交付的隔板应能连接材料、后道加工和出货信息",
      items: [
        ["连续隔板纤维网", "成品卷材反映了成网、干燥和收卷等过程，之后才进入电池厂的转换与装配。", "/images/agm-hero-production-1600.webp", "湖北维京 AGM 隔板生产设备"],
        ["放行前检测", "项目应先明确可比较的测试方法，以及与合格材料关联的检测记录。", "/images/agm-quality-control-1200.webp", "湖北维京 AGM 隔板质量检测"],
        ["卷材、片材与包装", "产品形式、标识和包装应匹配客户收货、存放和装配条件。", "/images/evidence/shipping-pallet-01.webp", "AGM 隔板包装出货"]
      ]
    },
    checklist: {
      eyebrow: "采购确认清单",
      title: "让供应链讨论真正落到项目上的问题",
      text:
        "与其泛泛讨论是否一体化，更有价值的是把原料、隔板表现和交付要求放进同一套项目边界里确认。",
      items: ["电池应用和极群结构", "目标厚度与统一测试条件", "卷材或片材尺寸及包装", "样品、试产与批量的批次比较", "变更沟通和所需交付记录"]
    },
    references: {
      eyebrow: "参考资料",
      title: "用于说明供应链环节的公开行业资料",
      text:
        "这些资料用于说明 AGM 供应链或生产线中的部分环节，不用于证明维京的上游来源、设备配置或质量体系范围。具体项目要求仍应在技术评审中逐项确认。",
      items: agmSeparatorSupplyChainReferenceItems
    },
    related: {
      eyebrow: "相关页面",
      title: "继续了解生产、批次一致性和规格确认",
      items: [
        ["AGM 隔板生产与交付", "/zh/blog/agm-separator-manufacturing-quality-delivery/"],
        ["AGM 隔板批次一致性与过程控制", "/zh/blog/agm-separator-batch-consistency-and-process-control/"],
        ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"],
        ["申请样品与规格匹配", "/zh/request-agm-separator-sample/"]
      ]
    },
    inquiry: {
      ...articleCopy.zh.inquiry,
      title: "确认 AGM 隔板供应与后道加工要求",
      text:
        "请提供电池应用、目标厚度、尺寸、卷材或片材形式、包装要求和当前项目阶段，让规格沟通从清晰的交付边界开始。",
      checklist: ["电池应用与尺寸", "目标隔板厚度", "卷材或片材交付形式", "包装与批次记录要求"],
      placeholders: {
        ...articleCopy.zh.inquiry.placeholders,
        message: "电池应用、目标厚度、极群尺寸、卷材或片材形式、包装要求和当前项目阶段"
      }
    },
    footer: articleCopy.zh.footer
  }
} as const;

const agmStartStopBatteryProcurementReferenceItems: Array<[string, string]> = [
  ["Public source 2026 Interim Report", "http://static.sse.com.cn/disclosure/listedinfo/announcement/c/new/2026-08-22/601311_20260822_JQ85.pdf"],
  ["Public source — AGM Separator", "https://www.hollingsworth-vose.com/wp-content/uploads/AGM-Separator.pdf"],
  ["Public source — AGM material AGM", "https://info.hollingsworth-vose.com/powerfill"]
];

const agmStartStopBatteryProcurementCopy = {
  en: {
    nav: articleCopy.en.nav,
    language: articleCopy.en.language,
    homePath: "/",
    languagePath: "/zh/blog/agm-start-stop-battery-separator-procurement-guide/",
    brandName: articleCopy.en.brandName,
    quote: "Request a Sample",
    hero: {
      eyebrow: "Automotive AGM Buyer Guide",
      title: "Automotive AGM Start-Stop Batteries: What Separator Buyers Should Confirm",
      subtitle: "A procurement guide to reading a segmented automotive lead-acid market and validating AGM separator conditions for start-stop battery projects.",
      primary: "Request a Sample & Specification Match",
      secondary: "View the procurement checklist",
      image: { src: "/images/agm-quality-control-1200.webp", alt: "AGM separator quality inspection", width: 1200, height: 900 }
    },
    intro: [
      "The cited company's 2026 interim report illustrates why total automotive lead-acid volume should not be used as a direct proxy for every battery segment. The report states that its first-half automotive low-voltage lead-acid battery sales declined year on year, while its AGM start-stop battery sales increased. These figures describe the cited company's reporting scope, not a national or global AGM market forecast.",
      "For battery manufacturers, start-stop demand is not only a volume question. Frequent restarts, electrical loads with the engine off and partial-state-of-charge operation make the validation window more specific. An AGM separator should therefore be evaluated as part of the plate group and complete battery system—not as an isolated guarantee of cycle life or vehicle performance."
    ],
    sections: [
      { eyebrow: "Market signal", title: "Read automotive demand by product segment, not total KVAH alone", text: "The cited company reported 17.99 million KVAH of automotive low-voltage lead-acid battery sales for the first half of 2026, down 6.12% year on year. Its report also disclosed differing movements in OEM, replacement and start-stop products. The useful procurement conclusion is limited: a decline in total volume does not automatically translate into the same change for every separator specification, customer program or battery route." },
      { eyebrow: "Start-stop duty", title: "Start-stop batteries face more than one cranking event", text: "Compared with a conventional starter battery, a start-stop battery can experience repeated engine restarts, engine-off electrical loads, partial-state-of-charge operation and, in some vehicles, regenerative-braking-related charging. AGM and EFB address different levels of duty and recovery requirements. The original battery route and target duty cycle must be confirmed; the two technologies are not automatically interchangeable." },
      { eyebrow: "Separator role", title: "Repeated cycling makes material conditions more visible", text: "In a VRLA-AGM battery, the separator keeps the plates apart, retains electrolyte and provides an ion-transport path. Plate-group compression also affects electrolyte distribution and oxygen-transport conditions. Under repeated discharge and recovery, small differences in wetting, compressed condition or dimensions can become more visible. That does not make the separator the sole determinant of battery performance; plate design, active material, acid quantity, charging strategy and thermal conditions remain part of the same validation system." },
      { eyebrow: "Measurement conditions", title: "A thickness value needs its test pressure", text: "Nominal dry thickness is an incoming-material measurement, not the complete condition inside a filled and compressed battery. The relevant compression range depends on plate thickness, assembly clearance and the design target. For automotive AGM projects, procurement and engineering teams should state the measurement pressure alongside the target thickness and use comparable sample preparation and test methods when comparing suppliers or batches." },
      { eyebrow: "Consistency", title: "Batch variation carries into assembly", text: "Differences in basis weight, thickness under an agreed pressure, dimensions or roll condition may be adjusted during sampling but become more consequential in continuous assembly. They can increase line adjustment, change plate-group condition and raise the cost of quality control. The practical objective is to reproduce the agreed material condition from samples through pilot work and later production batches." },
      { eyebrow: "Procurement checklist", title: "Confirm the same specification across purchasing, engineering and production", text: "Before sampling or introducing an AGM separator, align the original battery route, plate dimensions, separator format, target thickness and test pressure. Also define the acid-filling and formation conditions that require coordination, the planned incoming checks, and the batch-identification, packaging and feedback records expected for sample, pilot and volume material. These checks support—not replace—complete-battery validation." },
      { eyebrow: "Viking coordination", title: "Begin with material conditions that can be tested and reproduced", text: "Viking Technology manufactures AGM glass-fiber separators for VRLA lead-acid battery applications and can discuss rolls or sheets, thickness, width, sheet dimensions and packaging. For automotive AGM programs, we can align material-level conditions such as thickness under an agreed pressure, basis weight, absorption-related testing, dimensions, roll condition and incoming-inspection methods. Dynamic charge acceptance, temperature resistance, cycle life and vehicle compatibility must still be confirmed by the customer through complete battery design and testing." }
    ],
    parameters: [
      ["Battery route", "Confirm the original AGM or EFB route and whether the project serves OEM or replacement use."],
      ["Compression condition", "State target thickness together with measurement pressure, sample state and agreed method."],
      ["Assembly inputs", "Align plate dimensions, roll or sheet format, acid filling and formation conditions."],
      ["Batch evidence", "Define incoming checks, batch identification, packing and feedback records for each project stage."]
    ],
    formats: {
      eyebrow: "Material form and evidence",
      title: "Make the supplied format match the validation plan",
      items: [
        ["AGM separator rolls", "Confirm width, core, roll condition and packing against the customer's feeding and conversion process.", "/images/viking-finished-separator-roll-900.webp", "Finished AGM separator roll"],
        ["Quality review", "Use agreed conditions to compare thickness, basis weight, dimensions and absorption-related results.", "/images/agm-quality-control-1200.webp", "AGM separator quality inspection"],
        ["AGM separator sheets", "Confirm cut size, edge condition and packing when the assembly process uses sheets.", "/images/sheets1-900.webp", "AGM separator sheets"]
      ]
    },
    checklist: { eyebrow: "Buyer checklist", title: "Inputs to share before an automotive AGM separator sample", text: "A defined project boundary helps the material supplier, assembly team and battery test team evaluate the same conditions.", items: ["Original battery route and target application", "Plate dimensions, separator format, target thickness and test pressure", "Acid-filling and formation conditions requiring coordination", "Planned checks for absorption, thickness, dimensions and roll condition", "Batch identification, packaging and feedback procedure"] },
    references: { eyebrow: "Sources and technical boundary", title: "Public materials used for this buyer guide", text: "The cited company's figures are company-specific disclosures and are not used as national or global market-growth rates. The AGM materials below describe technical context only; they do not verify Viking product specifications or guarantee complete-battery results.", items: agmStartStopBatteryProcurementReferenceItems },
    related: { eyebrow: "Related pages", title: "Continue with AGM separator evaluation", items: [["Key AGM Separator Parameters", "/blog/key-technical-parameters-of-agm-separator/"], ["How to Choose an AGM Separator", "/blog/how-to-choose-agm-separator/"], ["AGM Separator Pressure Retention", "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"], ["Request a Sample & Specification Match", "/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.en.inquiry, title: "Discuss an automotive AGM separator specification", text: "Share the battery route, plate dimensions, target thickness and test pressure, preferred roll or sheet format, and the current sample or validation stage.", checklist: ["OEM or replacement application", "Plate dimensions and target separator thickness", "Test pressure and agreed measurement method", "Roll or sheet format, packing and project stage"], placeholders: { ...articleCopy.en.inquiry.placeholders, message: "Battery route, plate dimensions, target thickness and test pressure, roll or sheet format, test conditions and project stage" } },
    footer: articleCopy.en.footer
  },
  zh: {
    nav: articleCopy.zh.nav,
    language: articleCopy.zh.language,
    homePath: "/zh/",
    languagePath: "/blog/agm-start-stop-battery-separator-procurement-guide/",
    brandName: articleCopy.zh.brandName,
    quote: "申请样品",
    hero: {
      eyebrow: "汽车 AGM 采购指南",
      title: "汽车 AGM 启停电池：隔板采购需要确认哪些事项？",
      subtitle: "从细分市场信号到材料验证条件，帮助采购团队为启停电池项目确认 AGM 隔板要求。",
      primary: "申请样品与规格匹配",
      secondary: "查看采购确认清单",
      image: { src: "/images/agm-quality-control-1200.webp", alt: "AGM 隔板质量检测", width: 1200, height: 900 }
    },
    intro: [
      "所引企业 2026 年半年报说明，汽车低压铅酸电池总量不能直接代表每个电池细分市场。该报告显示，其上半年汽车低压铅酸蓄电池销量同比下降，而 AGM 启停电池销量增长。这些数据仅代表所引企业的披露口径，不构成中国、全球或所有 AGM 产品的市场预测。",
      "对电池制造商而言，启停产品不仅是销量问题。频繁启停、发动机熄火时的用电负载以及部分荷电状态运行，使验证边界更加具体。AGM 隔板应在极群和整电池系统中评价，不能被视作单独保证循环寿命或整车性能的材料。"
    ],
    sections: [
      { eyebrow: "市场信号", title: "按产品细分理解需求，而不是只看总 KVAH", text: "所引企业披露，2026 年上半年汽车低压铅酸蓄电池销量为 1799 万 KVAH，同比下降 6.12%。其 OEM、替换市场和启停产品的变化并不相同。对采购而言，合理的结论是有限的：总量下降不自动等同于每一种隔板规格、客户项目或电池路线的需求变化。" },
      { eyebrow: "启停工况", title: "启停电池承受的不只是一次启动电流", text: "相较传统启动电池，启停电池可能面临更频繁的发动机重启、发动机熄火期间的电负载、部分荷电状态运行，以及部分车辆中的制动能量回收充电。AGM 和 EFB 面向不同强度的工况与恢复要求。必须确认原始电池路线和目标工况，二者不应被视为可以自动互换。" },
      { eyebrow: "隔板作用", title: "重复循环会放大材料状态的差异", text: "在 VRLA-AGM 电池中，隔板隔离正负极板、吸收并保持电解液，同时提供离子传输路径。极群压缩也会影响电解液分布和氧传输条件。在反复放电与恢复过程中，润湿、压缩状态或尺寸上的细小差异可能更明显。但隔板并非唯一决定因素，极板设计、活性物质、加酸量、充电策略和热条件仍共同构成验证体系。" },
      { eyebrow: "测量条件", title: "厚度数值必须附带测试压力", text: "标称干态厚度是来料测量，不等于电池填酸和压缩后的实际状态。合适的压缩范围取决于极板厚度、装配间隙和设计目标。汽车 AGM 项目应在目标厚度之外同时明确测量压力，并以可比的样品状态和方法比较不同供应商或批次。" },
      { eyebrow: "批次一致性", title: "材料波动会带入连续装配", text: "克重、规定压力下的厚度、尺寸或卷材状态的差异，在打样中或许可以人工调整，但在连续装配中更容易造成影响，例如增加产线调整、改变极群状态并提高质量控制成本。实际目标是从样品、试产到后续批量，持续复现已确认的材料状态。" },
      { eyebrow: "采购确认", title: "让采购、工程和生产确认同一套规格", text: "打样或导入新的 AGM 隔板前，应统一原始电池路线、极板尺寸、隔板形式、目标厚度与测试压力；还应明确需要与材料供应商协同的加酸和化成条件、来料检查项目，以及样品、试产和批量材料的批次标识、包装和反馈记录。这些工作支持但不能替代整电池验证。" },
      { eyebrow: "维京配合", title: "从可测试、可复现的材料条件开始", text: "维京科技专注于 VRLA 铅酸电池用 AGM 玻璃纤维隔板制造，可沟通卷材或片材、厚度、宽度、片材尺寸和包装。针对汽车 AGM 项目，可围绕规定压力下的厚度、克重、吸液相关测试、尺寸、卷材状态和来料检验方法确认材料层面的条件。动态充电接受能力、耐温性、循环寿命及车辆适配性仍须由客户通过整电池设计与测试确认。" }
    ],
    parameters: [["电池路线", "确认原始 AGM 或 EFB 路线，以及 OEM 或替换市场应用。"], ["压缩条件", "目标厚度应同时说明测量压力、样品状态和统一方法。"], ["装配输入", "统一极板尺寸、卷材或片材形式、加酸和化成条件。"], ["批次证据", "明确各项目阶段的来料检查、批次标识、包装和反馈记录。"]],
    formats: { eyebrow: "供货形式与证据", title: "让交付形式匹配验证计划", items: [["AGM 隔板卷材", "按客户的上料和加工流程确认宽度、纸芯、卷材状态和包装。", "/images/viking-finished-separator-roll-900.webp", "AGM 隔板成品卷"], ["质量评审", "在统一条件下比较厚度、克重、尺寸和吸液相关结果。", "/images/agm-quality-control-1200.webp", "AGM 隔板质量检测"], ["AGM 隔板片材", "当装配使用片材时，确认裁切尺寸、边部状态与包装。", "/images/sheets1-900.webp", "AGM 隔板片材"]] },
    checklist: { eyebrow: "采购清单", title: "汽车 AGM 隔板打样前需要提供的信息", text: "清晰的项目边界有助于材料供应商、装配团队与电池测试团队在同一条件下评价。", items: ["原始电池路线与目标应用", "极板尺寸、隔板形式、目标厚度和测试压力", "需要协同的加酸与化成条件", "吸液、厚度、尺寸和卷材状态的计划检查", "批次标识、包装与反馈流程"] },
    references: { eyebrow: "来源与技术边界", title: "本采购指南使用的公开资料", text: "所引企业数据为公司特定披露，不作为国家或全球市场增长率。以下 AGM 资料仅用于说明技术背景，不用于证明维京产品规格或保证整电池结果。", items: agmStartStopBatteryProcurementReferenceItems },
    related: { eyebrow: "相关页面", title: "继续了解 AGM 隔板评估", items: [["AGM 隔板技术参数", "/zh/blog/key-technical-parameters-of-agm-separator/"], ["如何选择 AGM 隔板", "/zh/blog/how-to-choose-agm-separator/"], ["AGM 隔板填酸与循环后的压力保持", "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"], ["申请样品与规格匹配", "/zh/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.zh.inquiry, title: "沟通汽车 AGM 隔板规格", text: "请提供电池路线、极板尺寸、目标厚度和测试压力、卷材或片材形式，以及当前打样或验证阶段。", checklist: ["OEM 或替换市场应用", "极板尺寸与目标隔板厚度", "测试压力和统一测量方法", "卷材或片材形式、包装和项目阶段"], placeholders: { ...articleCopy.zh.inquiry.placeholders, message: "电池路线、极板尺寸、目标厚度和测试压力、卷材或片材形式、测试条件和项目阶段" } },
    footer: articleCopy.zh.footer
  }
} as const;

const agmSeparatorThirdPoleReferenceItems: Array<[string, string]> = [
  ["CN105006540B — Battery Separator Production System and Production Method", "https://patents.google.com/patent/CN105006540B/zh"],
  ["Sandia National Laboratories — SAND2014-17394B", "https://www.osti.gov/servlets/purl/1502636"],
  ["Public source — AGM Battery Separators", "https://www.hollingsworth-vose.com/products/energy-solutions/agm-lead-battery/"],
  ["Public source — Testing Standards", "https://www.hollingsworth-vose.com/innovation/testing-standards/"]
];

const agmSeparatorThirdPoleCopy = {
  en: {
    homePath: "/", languagePath: "/zh/blog/agm-separator-third-pole-explained/", quote: "Request a Sample",
    nav: { company: "Company", quality: "Quality" },
    hero: { eyebrow: "AGM Separator Guide", title: "The Battery’s ‘Third Pole’: What an AGM Separator Actually Does", subtitle: "Why the expression is a useful metaphor—not a third electrode—and what buyers should verify within a VRLA battery system.", secondary: "Review the technical boundary", image: { src: "/images/agm-quality-control-1200.webp", alt: "AGM separator quality inspection", width: 1200, height: 800 } },
    intro: ["An AGM separator has no terminal and does not generate voltage, yet it is sometimes called the ‘third pole’ of a valve-regulated battery. The expression highlights its importance, but it is not a formal electrochemical classification.", "A more accurate description is a critical working interface: it separates the plates, retains electrolyte, supports ion-transport and oxygen-transport conditions, and contributes to plate-group contact. None of these functions independently determines battery life or power."],
    sections: [
      { eyebrow: "Meaning", title: "A useful metaphor, not a third electrode", text: "CN105006540B uses ‘third pole’ in its background discussion of AGM separators, while its claims concern a separator production system and method. For purchasing and engineering teams, the phrase is best used as a reminder to evaluate the separator in the complete battery—not as a new electrode category." },
      { eyebrow: "Electrical separation", title: "It blocks direct electronic contact while ions move through wetted pores", text: "The separator keeps positive and negative plates from directly touching and reduces internal-short risk. It should not provide a direct electronic path; ions involved in battery reactions move through electrolyte-wetted pores. Resistance therefore needs defined electrolyte, plate and test conditions before it can be interpreted." },
      { eyebrow: "Electrolyte", title: "Glass microfibers retain and distribute electrolyte", text: "In VRLA batteries, the glass-fiber pore structure holds and distributes electrolyte between plates. Higher acid absorption is not automatically better: pore condition, plate absorption demand, acid volume and assembly conditions must be matched to the actual battery design." },
      { eyebrow: "Oxygen pathway", title: "The separator supports oxygen transport but does not complete recombination alone", text: "Partially saturated, connected pores can provide a path for oxygen generated at the positive plate to reach the negative plate, where it participates in water-forming reactions. State of charge, saturation, plate design, compression and temperature also influence this mechanism; separator data alone cannot prove oxygen-recombination performance." },
      { eyebrow: "Compression", title: "Contact and compression are part of the design relationship", text: "Thickness, compressed state and recovery interact with plate dimensions, group construction and assembly pressure. Material results are useful for screening and troubleshooting, but they do not predict complete-battery life from one thickness, absorption or compression value." },
      { eyebrow: "Project review", title: "Validate the separator in the finished battery", text: "Confirm dimensions, material data, acid filling and assembly conditions first; then validate with the agreed complete-battery test plan. Field behavior adds charging strategy, temperature and operating-use effects that a material test cannot reproduce by itself." }
    ],
    parameters: [["Plate separation", "Thickness, dimensions and mechanical condition must support assembly without proving a complete battery structure."], ["Electrolyte retention", "Porosity, basis weight and absorption-related behavior require matching with acid volume and plates."], ["Oxygen-transport conditions", "Pore and liquid-retention state are only one part of gas-management behavior."], ["Contact and compression", "Thickness, compression and recovery must be reviewed with the plate group and assembly method."]],
    formats: { eyebrow: "Supply format", title: "Match the separator form to the battery line", items: [["AGM separator rolls", "Share target width, thickness and roll requirements for the production workflow.", "/images/viking-finished-separator-roll-900.webp", "Finished AGM separator roll"], ["AGM separator sheets", "Share sheet dimensions and assembly conditions for sample discussion.", "/images/sheets1-900.webp", "AGM separator sheets"]] },
    checklist: { eyebrow: "Sample review", title: "Information to share for a relevant evaluation", text: "A separator sample should be discussed with the battery system rather than as an isolated material grade.", items: ["Battery type and plate or group structure", "Target thickness, width or sheet dimensions", "Acid volume, filling and assembly conditions", "Plate-group pressure and agreed test method", "Sample, pilot or mass-production stage"] },
    comparison: { eyebrow: "Function boundary", title: "Four functions that still need complete-battery verification", columns: ["Separator function", "Related material condition", "Verification boundary"], rows: [["Separate plates", "Thickness, dimensions and strength", "Material dimensions do not validate the complete battery structure."], ["Retain electrolyte", "Porosity, basis weight and absorption-related behavior", "More absorption does not replace design matching."], ["Support oxygen transport", "Pore, liquid-retention and compression state", "The separator is not the sole agent of oxygen recombination."], ["Maintain contact", "Thickness, compression and recovery", "Evaluate with plates, pressure and complete-battery testing."]] },
    references: { eyebrow: "Sources and technical boundary", title: "Public materials used for this guide", text: "The patent’s ‘third pole’ wording is treated only as an explanatory expression. The other public materials provide technical context; they do not verify Viking specifications or guarantee battery life, capacity, power or certification.", items: agmSeparatorThirdPoleReferenceItems },
    related: { eyebrow: "Related pages", title: "Continue the AGM separator review", items: [["Key AGM Separator Parameters", "/blog/key-technical-parameters-of-agm-separator/"], ["How to Choose an AGM Separator", "/blog/how-to-choose-agm-separator/"], ["AGM Separator Pressure Retention", "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"], ["Request a Sample & Specification Match", "/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.en.inquiry, title: "Discuss AGM separator conditions for your battery", text: "Share your battery type, plate-group structure, separator specification, assembly pressure and target operating conditions. We can first align the items to be checked and the boundary of complete-battery validation.", checklist: ["Battery application and plate-group structure", "Target thickness, width or sheet size", "Acid filling and assembly conditions", "Test method and project stage"], placeholders: { ...articleCopy.en.inquiry.placeholders, message: "Battery type, plate-group structure, separator dimensions, acid filling, assembly pressure, test conditions and project stage" } },
    footer: articleCopy.en.footer
  },
  zh: {
    homePath: "/zh/", languagePath: "/blog/agm-separator-third-pole-explained/", quote: "申请样品",
    nav: { company: "公司", quality: "质量" },
    hero: { eyebrow: "AGM 隔板指南", title: "电池的“第三极”没有端子：AGM 隔板到底在做什么？", subtitle: "“第三极”只是强调重要性的比喻，不是第三个电极；采购和验证仍应回到完整 VRLA 电池系统。", secondary: "查看技术边界", image: { src: "/images/agm-quality-control-1200.webp", alt: "AGM 隔板质量检查", width: 1200, height: 800 } },
    intro: ["AGM 隔板没有端子，也不产生电压，却常被称为阀控式电池的“第三极”。这个说法能够提示它的重要性，但并非正式的电化学分类。", "更准确地说，它是电池内部的关键工作界面：隔离极板、保持电解液、支持离子与氧气传输条件，并参与极群接触。任何一项功能都不能单独决定电池寿命或功率表现。"],
    sections: [
      { eyebrow: "含义", title: "有用的比喻，不是第三个电极", text: "CN105006540B 在背景技术中使用了“第三极”的表述，但其权利要求针对的是隔板生产系统和方法。对采购与工程团队而言，这个说法更适合用来提醒隔板的重要性，而非把隔板归为新的电极类别。" },
      { eyebrow: "电隔离", title: "阻止电子直接接触，同时让离子在润湿孔隙中迁移", text: "隔板使正负极板避免直接接触，降低内部短路风险。它不应提供电子的直接通路；参与反应的离子通过被电解液润湿的孔隙迁移。因此，电阻必须结合电解液状态、极板设计和测试方法理解。" },
      { eyebrow: "电解液", title: "玻璃微纤维保持并分配电解液", text: "VRLA 电池中，玻璃纤维孔隙结构用于保持和分配极板之间的电解液。吸酸量并非越高越好，还需要与孔隙状态、极板吸液需求、酸量和装配条件相匹配。" },
      { eyebrow: "氧气通道", title: "支持氧气传输，但不独自完成氧复合", text: "部分饱和、连通的孔隙可为正极析出的氧气向负极迁移提供路径，氧气在负极参与生成水的反应。荷电状态、饱和度、极板设计、压缩状态和温度也会影响该机制，不能仅凭隔板参数推断氧复合表现。" },
      { eyebrow: "压缩", title: "贴合和压缩是另一组设计关系", text: "厚度、受压状态和回弹表现会与极板尺寸、极群结构和装配压力相互作用。材料数据可用于筛选和排查，但不能用一个厚度、吸酸或压缩数值推导整电池寿命。" },
      { eyebrow: "项目验证", title: "在完整电池中验证隔板匹配性", text: "先确认尺寸、材料数据、加酸与装配条件，再按双方同意的整电池测试计划验证。现场表现还会叠加充电策略、温度和使用工况，这些都不是单项材料测试能够独立复现的。" }
    ],
    parameters: [["极板隔离", "厚度、尺寸和机械状态应满足装配，但不能单独证明完整电池结构已验证。"], ["电解液保持", "孔隙率、克重和吸酸相关表现需结合酸量与极板匹配。"], ["氧气传输条件", "孔隙、保液和压缩状态只是气体管理行为的一部分。"], ["贴合与压缩", "厚度、压缩和回弹应与极群和装配方法一同确认。"]],
    formats: { eyebrow: "供应形式", title: "让隔板形式适配电池产线", items: [["AGM 隔板卷材", "结合生产流程沟通目标宽度、厚度和卷材要求。", "/images/viking-finished-separator-roll-900.webp", "AGM 隔板成品卷"], ["AGM 隔板片材", "结合片材尺寸和装配条件开展样品沟通。", "/images/sheets1-900.webp", "AGM 隔板片材"]] },
    checklist: { eyebrow: "样品评审", title: "获得相关评估前建议提供的信息", text: "隔板样品应放在电池系统中讨论，而不是作为孤立的材料等级。", items: ["电池类型与极板或极群结构", "目标厚度、宽度或片材尺寸", "酸量、加酸与装配条件", "极群压力和约定测试方法", "样品、试制或批量阶段"] },
    comparison: { eyebrow: "功能边界", title: "四项功能仍需整电池验证", columns: ["隔板功能", "相关材料状态", "验证边界"], rows: [["隔离极板", "厚度、尺寸和强度", "材料尺寸合格不代表完整电池结构已验证。"], ["保持电解液", "孔隙率、克重和吸酸相关表现", "更高吸酸量不能替代设计匹配。"], ["支持氧气传输", "孔隙、保液和压缩状态", "隔板不是氧复合的唯一作用者。"], ["维持贴合", "厚度、压缩和回弹", "需结合极板、压力和整电池测试评估。"]] },
    references: { eyebrow: "来源与技术边界", title: "本指南使用的公开资料", text: "专利中的“第三极”仅作为说明性表达使用。其他公开资料仅提供技术背景，不用于证明维京产品规格，也不构成对电池寿命、容量、功率或认证的保证。", items: agmSeparatorThirdPoleReferenceItems },
    related: { eyebrow: "相关页面", title: "继续了解 AGM 隔板评估", items: [["AGM 隔板技术参数", "/zh/blog/key-technical-parameters-of-agm-separator/"], ["如何选择 AGM 隔板", "/zh/blog/how-to-choose-agm-separator/"], ["AGM 隔板填酸与循环后的压力保持", "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"], ["申请样品与规格匹配", "/zh/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.zh.inquiry, title: "沟通您的 AGM 隔板使用条件", text: "请提供电池类型、极群结构、隔板规格、装配压力和目标工况。我们可先对齐需要检查的项目及后续整电池验证边界。", checklist: ["电池应用与极群结构", "目标厚度、宽度或片材尺寸", "加酸与装配条件", "测试方法与项目阶段"], placeholders: { ...articleCopy.zh.inquiry.placeholders, message: "电池类型、极群结构、隔板尺寸、加酸、装配压力、测试条件和项目阶段" } },
    footer: articleCopy.zh.footer
  }
} as const;

const agmSeparatorEnergyDataReferenceItems: Array<[string, string]> = [
  ["Public source — Energy efficiency across European operations and supply reliability", "https://www.clarios.com/pt/insights/news/news-detail/clarios-energy-efficiency-europe-supply-reliability"]
];

const agmSeparatorEnergyDataDeliveryCopy = {
  en: {
    homePath: "/", languagePath: "/zh/blog/agm-separator-energy-data-and-delivery-risk/", quote: "Request a Sample",
    nav: { company: "Company", quality: "Quality" },
    hero: { eyebrow: "Manufacturing & Quality", title: "A Production Line Saves Energy. Why Might Buyers Care More About Delivery?", subtitle: "Energy data can inform a supplier review only when its operating boundary, output and delivery evidence can be traced.", secondary: "Review the evidence boundary", image: { src: "/images/agm-hero-production-1600.webp", alt: "AGM separator production line", width: 1600, height: 1000 } },
    intro: ["Annual electricity savings can look like an internal efficiency result. For battery buyers, the more practical question is whether the data is traceable and whether it says anything useful about cost exposure, production continuity or delivery risk.", "Energy records can support a supplier questionnaire, but they are not a delivery guarantee, a corporate greenhouse-gas inventory or a product carbon footprint."],
    sections: [
      { eyebrow: "External example", title: "Customers look beyond the electricity saved", text: "The cited company disclosed more than €4 million of EMEA energy-efficiency investment during fiscal year 2025 and annual savings above 8 million kWh at sites in Hanover, Zwickau and Česká Lípa. It linked the projects to reliability and supply security. This is a corporate disclosure, not a third-party audit or an AGM-separator benchmark." },
      { eyebrow: "Boundary", title: "Energy efficiency is a signal, not a delivery promise", text: "Lower unit energy use may reduce exposure to energy-price volatility, but quotations still depend on contracts, product mix, output and purchasing arrangements. Shutdown records, maintenance plans, production schedules and actual delivery performance remain necessary to assess continuity." },
      { eyebrow: "Comparison", title: "Total factory savings rarely compare suppliers directly", text: "Factory totals vary with plant size, output, product mix, period and system boundary. A useful unit-energy comparison needs an agreed functional unit, output, product scope, period, boundary and data source. Production-only data is not equivalent to data that includes utilities, packaging, warehousing or internal transport." },
      { eyebrow: "Line baseline", title: "Start with a defined line or product group", text: "A defined line can connect metering points and periods with qualified output, specifications, yield, loss and shutdown information. The framework below is a suggested starting point, not a claim that Viking has completed a product-level energy baseline or uses every listed field." },
      { eyebrow: "Evidence", title: "Not all energy evidence has the same weight", text: "An estimate shows an intended direction; meter readings show consumption at defined points and periods; invoice cross-checks test broad consistency. Product-level allocation and third-party verification answer narrower questions under an agreed method. These records do not replace one another." },
      { eyebrow: "Customer review", title: "Align scope before requesting supplier energy or carbon data", text: "For an AGM separator project, first clarify the functional unit, system boundary, required fields and version-control expectations. Then review relevant product specifications—such as thickness, width, roll or sheet format—alongside the requested data scope and the actual delivery record." }
    ],
    parameters: [["Electricity", "Metering point, reading period, consumption and corresponding output."], ["Other utilities", "Fuel gas, steam or water scope and metering basis where relevant."], ["Qualified output", "Quantity, specification and period used as the denominator."], ["Yield and shutdowns", "Loss-recording method plus planned or unplanned downtime."], ["Dataset version", "Boundary changes, update date and version for a reviewable record."]],
    formats: { eyebrow: "Supply format", title: "Keep product scope visible in the data request", items: [["AGM separator rolls", "Clarify width, thickness, roll requirements and the relevant production scope.", "/images/viking-finished-separator-roll-900.webp", "Finished AGM separator roll"], ["AGM separator sheets", "Clarify sheet dimensions, assembly use and the relevant product scope.", "/images/sheets1-900.webp", "AGM separator sheets"]] },
    checklist: { eyebrow: "Supplier questionnaire", title: "Items to align before reviewing energy or carbon information", text: "Customer templates and audit formats should take priority. These questions help establish a traceable starting scope.", items: ["Functional unit and product specification", "Reporting period and data source", "Production, utilities, packaging and transport boundary", "Output, yield, loss and shutdown treatment", "Dataset version and required review format"] },
    comparison: { eyebrow: "Evidence hierarchy", title: "What each record can—and cannot—show", columns: ["Evidence level", "What it can show", "What it cannot yet show"], rows: [["Project estimate", "Expected direction and scale of improvement", "Actual savings or improved delivery."], ["Meter readings", "Consumption changes at defined points during an agreed period", "A result for the whole factory or every product."], ["Invoice cross-check", "Whether purchasing records broadly agree with internal readings", "Accurate allocation to one unit of product."], ["Product-level allocation", "Energy use under a defined unit, boundary and allocation method", "A product footprint or third-party conclusion."], ["Third-party verification", "Independent review within the agreed scope", "Operational promises outside that scope."]] },
    references: { eyebrow: "Source and scope", title: "Public disclosure used as a discussion example", text: "The investment, plant locations, annual electricity savings and Hanover waste-heat-recovery details are from the cited company’s September 7, 2026 corporate disclosure. They are not third-party-audited conclusions, an AGM separator industry benchmark or evidence of Viking performance.", items: agmSeparatorEnergyDataReferenceItems },
    related: { eyebrow: "Related pages", title: "Continue the supplier and specification review", items: [["AGM Separator Manufacturing & Delivery", "/blog/agm-separator-manufacturing-quality-delivery/"], ["AGM Separator Batch Consistency & Process Control", "/blog/agm-separator-batch-consistency-and-process-control/"], ["AGM Separator Supply Chain", "/blog/agm-separator-supply-chain-from-glass-block-to-finished-roll/"], ["Request a Sample & Specification Match", "/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.en.inquiry, title: "Align your AGM separator data request", text: "Send your supplier energy or carbon-data template with its functional unit, system boundary and required fields. We can review the requested information scope together with the applicable separator specification.", checklist: ["Battery application and product format", "Thickness, width or sheet dimensions", "Functional unit and reporting period", "System boundary and required data fields"], placeholders: { ...articleCopy.en.inquiry.placeholders, message: "Battery application, separator dimensions, roll or sheet format, functional unit, reporting period, system boundary and required data fields" } },
    footer: articleCopy.en.footer
  },
  zh: {
    homePath: "/zh/", languagePath: "/blog/agm-separator-energy-data-and-delivery-risk/", quote: "申请样品",
    nav: { company: "公司", quality: "质量" },
    hero: { eyebrow: "生产与质量", title: "一条产线节能，客户为什么可能更关心交付？", subtitle: "只有当运行边界、产出和交付证据可追溯时，能耗数据才可能为供应商评估提供参考。", secondary: "查看证据边界", image: { src: "/images/agm-hero-production-1600.webp", alt: "AGM 隔板生产线", width: 1600, height: 1000 } },
    intro: ["年度节电量看似是内部效率结果。对电池买家而言，更实际的问题是：这些数据能否追溯？它们是否能为成本暴露、生产连续性或交付风险提供有用参考？", "能耗记录可以支持供应商问卷，但不等于交付承诺、企业温室气体盘查或产品碳足迹。"],
    sections: [
      { eyebrow: "外部案例", title: "客户看的不只是节省了多少电", text: "所引企业披露，其在 2025 财年对 EMEA 能效项目投资超过 400 万欧元，Hannover、Zwickau 和捷克 Česká Lípa 工厂的年度节电超过 800 万 kWh，并将项目与生产可靠性和供应安全联系起来。这是企业披露，不是第三方审计，也不是 AGM 隔板行业基准。" },
      { eyebrow: "边界", title: "能效是一个信号，不是交付保证", text: "单位能耗降低可能减少对能源价格波动的暴露，但报价仍取决于能源合同、产品结构、产出和采购安排。判断连续性仍需查看停机记录、维护计划、生产排程和实际交付表现。" },
      { eyebrow: "比较", title: "工厂总节约量通常不能直接比较供应商", text: "工厂总量会随规模、产出、产品结构、报告周期和系统边界变化。有效的单位能耗比较需要对齐功能单位、产出、产品范围、周期、边界和数据来源。仅生产环节的数据不等于包含公用工程、包装、仓储或内部运输的数据。" },
      { eyebrow: "产线基线", title: "从已定义的产线或产品组开始", text: "一条已定义的产线可以将计量点和周期与合格产出、规格、良率、损耗和停机信息相连。下列框架仅是建议起点，不代表维京已经完成产品级能耗基线，也不代表采用了每一项字段。" },
      { eyebrow: "证据", title: "不同能耗证据的权重不同", text: "项目估算说明预期方向；仪表读数说明指定计量点和周期的消耗；账单交叉核对检验总体一致性。产品级分配和第三方验证只能在约定方法下回答更窄的问题，各类记录不能相互替代。" },
      { eyebrow: "客户评审", title: "索取能源或碳数据前先对齐范围", text: "AGM 隔板项目应先明确功能单位、系统边界、必填字段和版本控制要求，再将厚度、宽度、卷材或片材等产品规格与所需数据范围、实际交付记录一并评审。" }
    ],
    parameters: [["电力", "计量点、读数周期、消耗量及对应产出。"], ["其他公用工程", "适用时确认燃气、蒸汽或用水范围及计量基础。"], ["合格产出", "作为分母的数量、规格和报告周期。"], ["良率与停机", "损耗记录方法以及计划或非计划停机。"], ["数据版本", "边界变化、更新日期和可复核版本。"]],
    formats: { eyebrow: "供应形式", title: "让数据请求保留产品范围", items: [["AGM 隔板卷材", "明确宽度、厚度、卷材要求和相关生产范围。", "/images/viking-finished-separator-roll-900.webp", "AGM 隔板成品卷"], ["AGM 隔板片材", "明确片材尺寸、装配用途和相关产品范围。", "/images/sheets1-900.webp", "AGM 隔板片材"]] },
    checklist: { eyebrow: "供应商问卷", title: "评审能源或碳信息前需对齐的事项", text: "客户模板和审核格式应优先。以下问题用于建立可追溯的起始范围。", items: ["功能单位和产品规格", "报告周期和数据来源", "生产、公用工程、包装和运输边界", "产出、良率、损耗和停机处理", "数据版本和要求的评审格式"] },
    comparison: { eyebrow: "证据层级", title: "各类记录能够说明什么，又不能说明什么", columns: ["证据层级", "能够说明", "暂不能说明"], rows: [["项目估算", "预期改进方向和规模", "实际节约或交付改善。"], ["仪表读数", "约定周期内指定计量点的消耗变化", "整个工厂或每一种产品的结论。"], ["账单交叉核对", "采购记录是否与内部读数总体一致", "准确分配到单个产品单位。"], ["产品级分配", "在确定功能单位、边界和分配方法下的能耗", "产品足迹或第三方结论。"], ["第三方验证", "约定范围内对数据和方法的独立评审", "范围之外的运营承诺。"]] },
    references: { eyebrow: "来源与范围", title: "作为讨论案例使用的公开披露", text: "投资、工厂地点、年度节电和 Hannover 余热回收信息来自所引企业 2026 年 9 月 7 日的企业披露。这些信息不是第三方审计结论，不是 AGM 隔板行业基准，也不能作为维京表现的证据。", items: agmSeparatorEnergyDataReferenceItems },
    related: { eyebrow: "相关页面", title: "继续开展供应与规格评审", items: [["AGM 隔板生产与交付", "/zh/blog/agm-separator-manufacturing-quality-delivery/"], ["AGM 隔板批次一致性与过程控制", "/zh/blog/agm-separator-batch-consistency-and-process-control/"], ["AGM 隔板供应链", "/zh/blog/agm-separator-supply-chain-from-glass-block-to-finished-roll/"], ["申请样品与规格匹配", "/zh/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.zh.inquiry, title: "对齐您的 AGM 隔板数据请求", text: "请提供供应商能源或碳数据模板，包括功能单位、系统边界和必填字段。我们可将所需信息范围与适用的隔板规格一并评审。", checklist: ["电池应用和产品形式", "厚度、宽度或片材尺寸", "功能单位和报告周期", "系统边界和必填数据字段"], placeholders: { ...articleCopy.zh.inquiry.placeholders, message: "电池应用、隔板尺寸、卷材或片材形式、功能单位、报告周期、系统边界和必填数据字段" } },
    footer: articleCopy.zh.footer
  }
} as const;

const en18060BatteryStandardReferenceItems: Array<[string, string]> = [
  ["Commission Implementing Decision (EU) 2026/2048", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026D2048"],
  ["European Commission — EU Battery Regulation harmonised standards", "https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards/eu-battery-regulation_en"]
];

const en18060BatteryStandardCopy = {
  en: {
    homePath: "/", languagePath: "/zh/blog/en-18060-2025-road-vehicle-battery-standard/", quote: "Request a Sample",
    nav: { company: "Company", quality: "Quality" },
    hero: { eyebrow: "Automotive Battery Standards", title: "Which Vehicle Batteries Does EN 18060:2025 Cover? What Lead-Acid and AGM Suppliers Should Know", subtitle: "The harmonised-standard listing names rechargeable EV modules and batteries for road vehicles across Li-ion, Na-ion, Pb, NiMH and combined chemistries. It does not make those chemistries equivalent or certify an AGM separator by itself.", secondary: "Check the applicability boundary", image: { src: "/images/agm-quality-control-1200.webp", alt: "AGM separator quality-control equipment", width: 1200, height: 900 } },
    intro: ["On 16 September 2026, the Official Journal published Commission Implementing Decision (EU) 2026/2048, which lists EN 18060:2025 in support of Regulation (EU) 2023/1542. The publicly listed title describes performance and durability for rechargeable EV modules and batteries for road vehicles, including Li-ion, Na-ion, Pb, NiMH and combined chemistries.", "This is a scope signal, not a finding that every lead-acid or AGM battery is covered. It does not say that different chemistries use identical tests, thresholds or directly comparable results; nor does it make a battery-material supplier's data a substitute for complete-battery verification."],
    sections: [
      { eyebrow: "Published listing", title: "The decision lists EN 18060:2025 as a harmonised standard", text: "The Commission page identifies Decision (EU) 2026/2048 as a harmonised-standard publication supporting Regulation (EU) 2023/1542. Its public listing supports the standard number, decision date and title-level scope; it is not a replacement for obtaining and reading the standard itself." },
      { eyebrow: "Covered title scope", title: "The listed title includes Pb alongside Li-ion, Na-ion and NiMH", text: "The title refers to rechargeable EV modules and batteries used in road vehicles and names Li-ion, Na-ion, Pb, NiMH and combined chemistries. That wording should not be broadened to every lead-acid product, stationary battery, UPS battery or all AGM batteries. Applicability depends on the regulation, the complete standard and the actual product classification." },
      { eyebrow: "Not one scorecard", title: "A shared framework does not rank chemistries on one scale", text: "Being named in one standard title does not establish that the same performance values, test items, limits or pass conditions apply across chemistries. Do not use the listing to claim that lead, lithium and sodium batteries are being ranked directly against one another." },
      { eyebrow: "AGM evidence boundary", title: "An AGM separator is a system material, not a separately certified battery", text: "EN 18060:2025 is not presented here as an AGM separator standard, and this listing does not establish a separate separator-certification requirement. Separator thickness, basis weight, absorption-related behaviour and resistance data can inform a material discussion, but cannot alone prove capacity, durability, reliability or regulatory conformity of a complete VRLA battery." },
      { eyebrow: "FAQ: applicability", title: "How should a lead-acid battery manufacturer confirm relevance?", text: "Start with the road-vehicle EV module or battery classification, then review the applicable obligations in Regulation (EU) 2023/1542 and the complete EN 18060:2025 text. Record the intended product, chemistry, module or battery level, applicable test scope and the evidence owner. The harmonised-standard listing alone cannot answer every product-specific question." },
      { eyebrow: "Supplier action", title: "Match separator evidence to the battery validation plan", text: "For an automotive AGM project, align the separator specification with the battery maker's target design and validation plan: application, plate-group construction, thickness, width or sheet size, roll or sheet format, assembly conditions and agreed material checks. Keep supplier material records separate from complete-battery validation and any legal or conformity assessment responsibilities." }
    ],
    parameters: [["Product classification", "Road-vehicle rechargeable EV module or battery status; do not infer from chemistry alone."], ["Standard access", "The complete EN 18060:2025 text and the applicable edition or amendments."], ["Battery evidence", "Complete-battery validation scope, method and result ownership."], ["Separator evidence", "Agreed material specification, test method, sample state and batch record."]],
    formats: { eyebrow: "Specification match", title: "Bring the material discussion back to the battery design", items: [["AGM separator rolls", "Discuss width, thickness, roll handling and the intended battery assembly process.", "/images/viking-finished-separator-roll-900.webp", "Finished AGM separator roll"], ["AGM separator sheets", "Discuss sheet dimensions, plate-group assembly and the planned validation stage.", "/images/sheets1-900.webp", "AGM separator sheets"]] },
    checklist: { eyebrow: "Buyer checklist", title: "Information to prepare for a sample and specification match", text: "Use the battery maker's applicable standards and validation plan as the controlling documents. The following details help scope a separator discussion without implying a conformity conclusion.", items: ["Road-vehicle battery product classification and chemistry", "Battery application and plate-group construction", "Target separator thickness, width or sheet dimensions", "Roll or sheet format and assembly conditions", "Agreed material checks, complete-battery validation scope and project stage"] },
    references: { eyebrow: "Official sources checked", title: "Public sources reviewed on 3 October 2026", text: "The EUR-Lex decision and Commission harmonised-standards page support the decision reference, publication context and title-level scope. Neither source is used here to infer unpublished test details, thresholds, pass conditions or a separator certification procedure.", items: en18060BatteryStandardReferenceItems },
    related: { eyebrow: "Related pages", title: "Continue the AGM separator evaluation", items: [["Automotive AGM Start-Stop Battery Separator Guide", "/blog/agm-start-stop-battery-separator-procurement-guide/"], ["AGM Separator Products", "/products/agm-separator/"], ["AGM Separator Testing", "/quality-control/agm-separator-testing/"], ["Request a Sample & Specification Match", "/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.en.inquiry, title: "Request an automotive AGM separator sample and specification match", text: "Share the battery application, product classification, separator dimensions, supply format, assembly conditions and validation stage. We can align the material discussion with your agreed specification; we do not provide a regulatory certification conclusion.", checklist: ["Battery application and classification", "Thickness, width or sheet size", "Roll or sheet format and assembly conditions", "Material checks and complete-battery validation stage"], placeholders: { ...articleCopy.en.inquiry.placeholders, message: "Battery application and classification, separator dimensions, roll or sheet format, assembly conditions, material checks and validation stage" } }, footer: articleCopy.en.footer
  },
  zh: {
    homePath: "/zh/", languagePath: "/blog/en-18060-2025-road-vehicle-battery-standard/", quote: "申请样品",
    nav: { company: "公司", quality: "质量" },
    hero: { eyebrow: "车用电池标准", title: "EN 18060:2025 覆盖哪些车用电池？铅酸与 AGM 供应商应怎样理解", subtitle: "协调标准列名涵盖道路车辆用可充电 EV 模块和电池，包括锂离子、钠离子、铅、镍氢及组合化学体系；这不代表各体系等效，也不代表 AGM 隔板被单独认证。", secondary: "查看适用范围边界", image: { src: "/images/agm-quality-control-1200.webp", alt: "AGM 隔板质量控制设备", width: 1200, height: 900 } },
    intro: ["欧盟官方公报于 2026 年 9 月 16 日刊载欧盟委员会实施决定 (EU) 2026/2048，将 EN 18060:2025 列为支持 Regulation (EU) 2023/1542 的协调标准。其公开列示题名说明，该标准面向道路车辆用可充电 EV 模块和电池的性能与耐久性，涉及 Li-ion、Na-ion、Pb、NiMH 及组合化学体系。", "这是一项范围信息，不是对所有铅酸或 AGM 电池的适用结论；也不说明不同化学体系采用同一测试项目、阈值或可直接横比的结果。材料供应商的数据同样不能替代整电池验证。"],
    sections: [
      { eyebrow: "公开列名", title: "实施决定将 EN 18060:2025 列为协调标准", text: "欧盟委员会协调标准页面将实施决定 (EU) 2026/2048 列为支持 Regulation (EU) 2023/1542 的发布信息。公开资料能够核验标准编号、决定日期和题名层面的范围，但不能替代取得并阅读标准全文。" },
      { eyebrow: "题名范围", title: "题名同时列出 Pb、Li-ion、Na-ion 和 NiMH", text: "题名所述对象是道路车辆用可充电 EV 模块和电池，并列出 Li-ion、Na-ion、Pb、NiMH 及组合化学体系。不应将其扩大为所有铅酸产品、固定式电池、UPS 电池或所有 AGM 电池；具体适用性仍取决于法规、标准全文和产品分类。" },
      { eyebrow: "不是同一把分数尺", title: "纳入同一框架不等于按同一数值排名", text: "多种化学体系被列在同一标准题名中，并不证明它们使用相同的性能数值、试验项目、限值或通过条件，更不能据此宣称铅、锂和钠电池可以直接横向排名。" },
      { eyebrow: "AGM 证据边界", title: "AGM 隔板是系统材料，不是被单独认证的整电池", text: "本文不将 EN 18060:2025 表述为 AGM 隔板标准，公开列名也不能推出隔板需要单独认证。厚度、克重、吸酸相关表现和电阻等材料数据可用于规格沟通，但不能单独证明完整 VRLA 电池的容量、耐久性、可靠性或法规符合性。" },
      { eyebrow: "FAQ：适用性", title: "铅酸电池制造商应如何确认该标准的适用范围？", text: "先确认道路车辆 EV 模块或电池的产品分类，再结合 Regulation (EU) 2023/1542 的适用义务与 EN 18060:2025 全文核对。记录产品、化学体系、模块或电池层级、适用测试范围和证据责任方；仅凭协调标准列名不能得出具体产品结论。" },
      { eyebrow: "供应商行动", title: "让隔板证据匹配整电池验证计划", text: "对车用 AGM 项目，应将隔板规格与电池制造商的目标设计和验证计划对齐：应用、极群结构、厚度、宽度或片材尺寸、卷材或片材形式、装配条件和约定材料检查。材料记录应与整电池验证及法规/符合性责任分开管理。" }
    ],
    parameters: [["产品分类", "道路车辆用可充电 EV 模块或电池状态，不能只按化学体系判断。"], ["标准获取", "EN 18060:2025 全文及适用版本或修订。"], ["电池证据", "整电池验证范围、方法与结果责任方。"], ["隔板证据", "约定材料规格、试验方法、样品状态和批次记录。"]],
    formats: { eyebrow: "规格匹配", title: "把材料沟通落回电池设计", items: [["AGM 隔板卷材", "沟通宽度、厚度、卷材使用和目标电池装配过程。", "/images/viking-finished-separator-roll-900.webp", "AGM 隔板成品卷"], ["AGM 隔板片材", "沟通片材尺寸、极群装配和计划验证阶段。", "/images/sheets1-900.webp", "AGM 隔板片材"]] },
    checklist: { eyebrow: "采购清单", title: "申请样品与规格匹配前应准备的信息", text: "以电池制造商适用的标准和验证计划为准。以下信息用于界定隔板沟通范围，不构成符合性结论。", items: ["道路车辆电池产品分类和化学体系", "电池应用和极群结构", "目标隔板厚度、宽度或片材尺寸", "卷材或片材形式和装配条件", "约定材料检查、整电池验证范围和项目阶段"] },
    references: { eyebrow: "已核验的官方来源", title: "2026 年 10 月 3 日查阅的公开资料", text: "EUR-Lex 决定与欧盟委员会协调标准页面支持决定编号、发布背景和题名层面的范围。本文不根据这些公开资料推断未读取的具体试验项目、阈值、通过条件或隔板认证程序。", items: en18060BatteryStandardReferenceItems },
    related: { eyebrow: "相关页面", title: "继续开展 AGM 隔板评审", items: [["汽车 AGM 启停电池隔板采购指南", "/zh/blog/agm-start-stop-battery-separator-procurement-guide/"], ["AGM 隔板产品", "/zh/products/agm-separator/"], ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"], ["申请样品与规格匹配", "/zh/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.zh.inquiry, title: "申请车用 AGM 隔板样品与规格匹配", text: "请提供电池应用、产品分类、隔板尺寸、供货形式、装配条件和验证阶段。我们可围绕约定规格沟通材料信息；不提供法规认证结论。", checklist: ["电池应用和产品分类", "厚度、宽度或片材尺寸", "卷材或片材形式与装配条件", "材料检查和整电池验证阶段"], placeholders: { ...articleCopy.zh.inquiry.placeholders, message: "电池应用和产品分类、隔板尺寸、卷材或片材形式、装配条件、材料检查和验证阶段" } }, footer: articleCopy.zh.footer
  }
} as const;

const dataCenterEvLowVoltageAgmReferenceItems: Array<[string, string]> = [
  ["Public source at ELBC 2026: Asia's Lead Battery Market", "https://www.leoch.com/newsroom/events/leoch-at-elbc-2026"]
];

const aiDataCenterBackupPowerReferenceItems: Array<[string, string]> = [
  ["Public source —the disclosed system at YOTTA 2026", "https://www.vision-batt.com/en/news/show/6268vahkzaq.html"]
];

const agmPastingPaperReferenceItems: Array<[string, string]> = [
  ["公开产品资料（原始来源）", "https://www.huayangagm.com/product/15.html"]
];

const agmBatteryDamageDemoReferenceItems: Array<[string, string]> = [
  ["Public source —battery demonstration in Minsk, 1 October 2026", "https://www.rostec.ru/en/media/news/rostec-showcases-an-everlasting-batteries-for-civil-and-military-equipment-in-minsk-/"]
];

const agmBatteryDamageDemoSafetyTestCopy = {
  en: {
    homePath: "/", languagePath: "/zh/blog/agm-battery-extreme-damage-demo-vs-safety-test/", quote: "Request AGM Absorption & Wet-State Data",
    nav: { company: "Company", quality: "Quality" },
    hero: { eyebrow: "AGM Battery Safety Test", title: "A Battery Still Powers a Load After Fire, Cutting or Gunfire: Safety Test or Demonstration?", subtitle: "If a punctured battery can still light a lamp, does that make it safer? It shows a phenomenon under one disclosed scenario—not a standardized safety conclusion.", secondary: "Review the evidence boundary", image: { src: "/images/agm-quality-control-1200.webp", alt: "AGM separator laboratory quality checks used to document material test conditions", width: 1200, height: 900 } },
    intro: ["The cited company's official page dated 1 October 2026 presents the cited battery series EFB, AGM and AGEL products. It says the cited battery series AGM batteries were placed in a fish bowl, burnt, drilled, power-sawn and shot through, and that a damaged battery still showed the presence of power. The same page attributes −50 to +50 °C operation and deep-discharge resistance to the product range.", "Every statement above remains a claim by the source company or the manufacturer. The public page does not disclose sample configuration, state of charge, electrical load, duration, temperature rise, leakage quantity, retained capacity, a third-party report or a standard test method. Viking did not participate in the demonstration and does not possess its test results."],
    sections: [
      { eyebrow: "Official disclosure", title: "What disclosed damage demonstration actually shows", text: "The official page describes a specific corporate demonstration involving the cited battery series AGM batteries and several forms of damage. It reports continued presence of power after damage. That observation does not establish intact performance, absence of hazard, certification or the behavior of other AGM, VRLA or lead-acid batteries." },
      { eyebrow: "Missing conditions", title: "The public page omits the conditions needed to reproduce the result", text: "A review cannot reconstruct the sample model and quantity, capacity and age, state of charge, open-circuit voltage, connected load, damage location and dimensions, sequence, test duration, surface and ambient temperature, leakage measurement, voltage and retained-capacity trend, acceptance criteria, laboratory or standard method." },
      { eyebrow: "Three evidence levels", title: "Separate a visual phenomenon from a standardized battery test and a system-safety conclusion", text: "A lamp remaining on or voltage remaining present is a visual observation at one point in time. A standardized battery test defines samples, conditioning, method, duration, instruments and pass/fail metrics. A system-safety conclusion also needs enclosure, wiring, protection, installation, ventilation, operating duty and foreseeable fault scenarios." },
      { eyebrow: "AGM separator boundary", title: "Electrolyte absorption and retention matter, but the separator does not decide battery safety alone", text: "An AGM separator's porous glass-fiber network can absorb and retain electrolyte under defined wetting and compression conditions. The outcome of a damaged battery also depends on plate design, electrolyte quantity, compression, case and valve design, terminals, connections, charging, load and complete-battery construction. Material data are one input, not a safety guarantee." },
      { eyebrow: "Reproducible checklist", title: "Record seven groups of conditions before comparing an extreme-damage result", text: "Identify the sample and control; state of charge; electrical load; damage method, location and geometry; duration; temperature, leakage and retained electrical result; and the governing test method and original report. Without these, a dramatic clip remains a demonstration rather than a repeatable validation package." },
      { eyebrow: "Frequently asked questions", title: "Does an AGM battery still working after cutting or puncture prove it is safe?", text: "No. The cited company case is a company-published demonstration. The public page lacks key test conditions, and continued power does not mean performance remained intact or risk was absent. A safety conclusion needs a defined method, measured thermal, leakage and electrical outcomes, and complete-battery or system evaluation." },
      { eyebrow: "Frequently asked questions", title: "Can an AGM separator alone determine battery safety?", text: "No. The separator is one material input. Absorption, electrolyte retention, wet-state behavior and compression data can support a design review, but plates, acid quantity, enclosure, valve, electrical protection, assembly and complete-battery testing remain necessary." }
    ],
    parameters: [["Sample and control", "Record model, rated capacity, age, quantity, preconditioning and comparison sample."], ["State of charge", "Record SOC, resting voltage, charging history and stabilization time."], ["Load and damage", "Define current or load, tool or projectile, location, dimensions, depth and sequence."], ["Duration and temperature", "Measure from damage initiation to end; log surface, terminal and ambient temperature."], ["Leakage and retained result", "Measure leakage, voltage trend, delivered energy or retained capacity and the acceptance limit."], ["Method and report", "Name the standard or internal method, laboratory, instruments, calibration and original report."]],
    formats: { eyebrow: "Evidence levels", title: "Do not merge three different conclusions", items: [["Observed phenomenon", "A damaged sample still shows voltage or powers a stated load for a stated time.", "/images/applications/ups-vrla-battery-application-1200.webp", "Battery installation illustrating an operating load that must be defined"], ["Standardized battery test", "Samples, conditioning, damage, duration, measurements and acceptance criteria are documented.", "/images/agm-quality-control-1200.webp", "Laboratory quality checks illustrating documented test conditions"], ["System-safety conclusion", "Battery, enclosure, protection, wiring, installation and fault response are evaluated together.", "/images/evidence/quality-electrical-resistance-test-01.webp", "Electrical test setup illustrating a separate system evidence layer"]] },
    checklist: { eyebrow: "Test-review checklist", title: "Conditions required for a reviewable claim", text: "Use the same signed protocol for every sample and control. Report raw observations as well as the acceptance decision.", items: ["Sample model, capacity, age, quantity and control", "State of charge, resting voltage and charging history", "Electrical load before, during and after damage", "Damage method, location, geometry and sequence", "Duration and stop condition", "Temperature, leakage, voltage and retained-capacity change", "Test method, instruments, laboratory and original report"] },
    references: { eyebrow: "Official source checked", title: "The cited company page accessed and archived on 10 October 2026", text: "The product range, temperature and deep-discharge statements, and damage demonstration are attributed only to the cited company and the related company. The page is not a third-party certification or a standardized safety report.", items: agmBatteryDamageDemoReferenceItems },
    related: { eyebrow: "Related technical pages", title: "Continue with existing AGM material and test pages", items: [["What Is an AGM Separator?", "/blog/what-is-agm-separator/"], ["AGM Separator Wet-State Pressure Retention", "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"], ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]] },
    inquiry: { ...articleCopy.en.inquiry, eyebrow: "One test-boundary question", title: "Which boundary do you want to see first: duration, load or retained capacity?", text: "Share the battery design, separator compression and the material test method you need to compare. Viking can provide available AGM separator absorption and wet-state performance information or test explanations; separator data do not guarantee complete-battery safety.", checklist: ["Battery application and construction", "Target separator dimensions and compression", "Absorption or wet-state data needed", "Test method and project stage"], placeholders: { ...articleCopy.en.inquiry.placeholders, message: "Which boundary first—duration, load or retained capacity? Include battery construction, separator compression and the test method to compare." } }, footer: articleCopy.en.footer
  },
  zh: {
    homePath: "/zh/", languagePath: "/blog/agm-battery-extreme-damage-demo-vs-safety-test/", quote: "索取 AGM 隔板吸液与湿态性能资料",
    nav: { company: "公司", quality: "质量" },
    hero: { eyebrow: "AGM 电池安全测试", title: "电池被烧、切、射击还能工作：这是安全测试，还是传播演示？", subtitle: "电池被打穿还能亮灯，就等于它更安全吗？这只能说明某个公开场景下出现了某种现象，不能直接变成标准化安全结论。", secondary: "查看证据边界", image: { src: "/images/agm-quality-control-1200.webp", alt: "用于记录材料测试条件的 AGM 隔板实验室质量检测", width: 1200, height: 900 } },
    intro: ["所引企业官方页面于 2026 年 10 月 1 日展示EFB、AGM 和 AGEL 电池产品。页面称所述电池系列 AGM 电池被放入鱼缸、燃烧、钻孔、电锯切割和小型武器射击后，受损电池仍显示有电；同页还将 −50℃ 至 50℃工作和耐深放归于该产品系列。", "以上均按所引企业或相关企业自述处理。公开页面没有披露样品配置、荷电状态、电气载荷、持续时间、温升、泄漏量、剩余容量、第三方报告或标准测试方法。维京未参与这次演示，也不拥有其测试结果。"],
    sections: [
      { eyebrow: "官方披露", title: "公开损伤演示实际展示了什么", text: "官方页面描述的是所述电池系列 AGM 电池在特定传播项目中的受损现象，并称受损后仍有电。它没有证明性能完整、没有风险、获得认证，也不能代表其他 AGM、VRLA 或铅酸电池会有相同结果。" },
      { eyebrow: "公开条件缺口", title: "页面缺少让结果可复核的关键测试条件", text: "无法从页面还原样品型号与数量、容量与使用状态、荷电状态、开路电压、连接载荷、损伤位置与尺寸、操作顺序、试验时长、表面与环境温度、泄漏测量、电压与剩余容量变化、判定标准、实验室或标准方法。" },
      { eyebrow: "三层证据", title: "区分现象展示、标准化电池测试和系统安全结论", text: "亮灯或仍有电，只是某一时点的现象。标准化电池测试需要明确样品、预处理、方法、时长、仪器和通过指标。系统安全结论还要纳入壳体、布线、保护、安装、通风、运行任务和可预见故障场景。" },
      { eyebrow: "AGM 隔板边界", title: "吸液与保液很重要，但隔板不能单独决定电池安全", text: "AGM 隔板的多孔玻璃纤维网络可在明确的湿润与压缩条件下吸收并保持电解液。受损电池的结果还取决于极板设计、电解液量、压缩、壳体与阀、端子与连接、充电、载荷和整电池结构。材料数据是设计输入，不是安全保证。" },
      { eyebrow: "可复核清单", title: "比较极端损伤结果前，至少记录七类条件", text: "明确样品与对照、荷电状态、电气载荷、损伤方式/位置/几何、持续时间、温度/泄漏/剩余电气结果，以及适用的测试方法与原始报告。缺少这些条件，画面再强烈也仍是演示，不是可重复的验证包。" },
      { eyebrow: "常见问题", title: "AGM 电池被切割或穿刺后还能工作，能证明它安全吗？", text: "不能。所引企业个案是企业发布的演示，公开页面缺少关键测试条件；仍供电也不等于性能完整或没有风险。安全结论需要明确方法、温升、泄漏和电气结果，并结合整电池或系统验证。" },
      { eyebrow: "常见问题", title: "AGM 隔板能否单独决定电池安全？", text: "不能。隔板只是材料输入的一部分。吸液、保液、湿态表现和压力条件可以支持设计评审，但极板、电解液量、壳体、阀、电气保护、装配和整电池测试同样不可缺少。" }
    ],
    parameters: [["样品与对照", "记录型号、额定容量、使用状态、数量、预处理和对照样。"], ["荷电状态", "记录 SOC、静置电压、充电历史和稳定时间。"], ["载荷与损伤", "明确电流或负载、工具或弹体、位置、尺寸、深度和顺序。"], ["持续时间与温度", "从开始损伤记录到结束，并测量表面、端子和环境温度。"], ["泄漏与剩余结果", "测量泄漏量、电压曲线、输出能量或剩余容量及判定限值。"], ["方法与报告", "标明标准或企业方法、实验室、仪器、校准和原始报告。"]],
    formats: { eyebrow: "证据层级", title: "不要把三种不同结论混在一起", items: [["现象展示", "受损样品在明确载荷和时长下仍显示电压或供电。", "/images/applications/ups-vrla-battery-application-1200.webp", "说明载荷必须被定义的电池应用场景"], ["标准化电池测试", "样品、预处理、损伤方式、时长、测量与通过条件均有记录。", "/images/agm-quality-control-1200.webp", "说明测试条件需要记录的实验室质量检查"], ["系统安全结论", "把电池、壳体、保护、布线、安装和故障响应一并验证。", "/images/evidence/quality-electrical-resistance-test-01.webp", "说明系统证据另有层级的电气测试装置"]] },
    checklist: { eyebrow: "测试复核清单", title: "让结论可复核所需的条件", text: "所有样品和对照共用同一份签字试验方案，同时保留原始观察和最终判定。", items: ["样品型号、容量、使用状态、数量与对照", "荷电状态、静置电压与充电历史", "损伤前、过程中和损伤后的电气载荷", "损伤方式、位置、几何与顺序", "持续时间与停止条件", "温度、泄漏、电压和剩余容量变化", "测试方法、仪器、实验室与原始报告"] },
    references: { eyebrow: "已核验官方来源", title: "2026 年 10 月 10 日重新访问并存档所引企业官方页面", text: "产品系列、温度与耐深放说法、极端损伤演示均只归因于所引企业及相关企业。该页面不是第三方认证或标准化安全测试报告。", items: agmBatteryDamageDemoReferenceItems },
    related: { eyebrow: "真实站内链接", title: "继续查看现有 AGM 材料与测试页面", items: [["AGM 隔板是什么", "/zh/blog/what-is-agm-separator/"], ["AGM 隔板注酸与循环后的压力保持", "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"], ["AGM 隔板质量检测", "/zh/quality-control/agm-separator-testing/"]] },
    inquiry: { ...articleCopy.zh.inquiry, eyebrow: "只问一个测试边界", title: "最想先看到哪一项测试边界：时长、载荷，还是剩余容量？", text: "请提供电池结构、隔板压缩条件及希望对照的材料测试方法。维京可沟通现有 AGM 隔板吸液、保液和湿态性能资料或测试说明；隔板数据不保证整电池安全。", checklist: ["电池应用与结构", "目标隔板尺寸与压缩条件", "所需吸液、保液或湿态资料", "测试方法与项目阶段"], placeholders: { ...articleCopy.zh.inquiry.placeholders, message: "最想先看时长、载荷还是剩余容量？请附电池结构、隔板压缩条件和希望对照的测试方法。" } }, footer: articleCopy.zh.footer
  }
} as const;

const agmPastingPaperEnergyValidationCopy = {
  en: {
    homePath: "/", languagePath: "/zh/blog/agm-fiberglass-pasting-paper-drying-energy-validation/", quote: "Request Technical Review",
    nav: { company: "Company", quality: "Quality" },
    hero: { eyebrow: "AGM Fiberglass Pasting Paper", title: "How Much Drying Energy Can One Pasting Paper Save? Do Not Assume the Drying Oven Can Be Switched Off", subtitle: "Changing one paper can switch off the drying oven? That statement is missing at least four conditions: line speed, moisture state, oven and energy boundary, and plate acceptance results.", secondary: "Review the same-line test", image: { src: "/images/agm-quality-control-1200.webp", alt: "AGM material quality-control equipment used for material-level checks", width: 1200, height: 900 } },
    intro: ["A supplier describes an existing AGM fiberglass pasting paper for continuous plate pasting and says it may lower drying-oven temperature or allow the oven to be stopped, while replacing plant-fiber pasting paper. This is the supplier's own product-page claim, not independent test evidence.", "The page gives no energy saving, measurement boundary, line speed, moisture condition, oven setting, comparison trial or plate and battery result. The useful purchasing question is therefore not whether the material name sounds energy-saving, but what a same-line comparison must prove."],
    sections: [
      { eyebrow: "Claim and source", title: "The public statement belongs to a supplier's existing product page", text: "The cited page says the product is used for continuous plate pasting and may reduce drying-oven temperature or stop oven use, and may replace plant-fiber pasting paper. The page does not identify a launch this week, third-party validation or an industry benchmark. Viking does not claim to supply that product or reproduce that result." },
      { eyebrow: "Missing conditions", title: "An oven-temperature statement is not yet an energy result", text: "A defensible comparison needs the coated-plate output, line speed, incoming and outgoing moisture state, oven zones, setpoint and measured temperature, residence time, fuel or electricity boundary, metering interval and normalization method. None of those quantitative conditions appears on the cited page." },
      { eyebrow: "Same-line comparison", title: "Compare energy per accepted output under controlled production conditions", text: "Run the current paper and candidate on the same line with an agreed recipe, plate geometry, paste loading, shift window and production state. Record energy per accepted plate area, mass or count alongside speed, moisture, oven settings, start-stop losses and ambient conditions. Temperature alone may show a process change, but not the net energy saved." },
      { eyebrow: "Plate acceptance", title: "Energy, plate quality and scrap rate require separate evidence", text: "Compare appearance, edge condition, adhesion or shedding indicators, moisture consistency, dimensional or mass consistency and scrap rate using the plant's approved methods. A lower temperature is not a saving if throughput falls, rework rises or accepted output changes." },
      { eyebrow: "Validation boundary", title: "Pasting paper and the AGM main separator are not the same product layer", text: "Pasting paper supports plate manufacture; the AGM main separator serves inside the assembled VRLA battery. A material-level observation cannot by itself prove plate durability, battery capacity, life or field reliability. Plate acceptance and complete-battery validation remain separate gates." },
      { eyebrow: "Before implementation", title: "Freeze four boundaries before evaluating a replacement", text: "Agree the baseline and candidate lot, line speed and paste recipe; define moisture sampling points and oven operating window; define the energy meter and unit-output denominator; and freeze plate acceptance, scrap and downstream battery checks. Without these boundaries, a supplier statement cannot be converted into a plant result." },
      { eyebrow: "Frequently asked questions", title: "Can fiberglass pasting paper reduce lead-acid battery drying-oven energy?", text: "A supplier makes that claim for its existing product, but its public page provides no quantified energy data. Verification requires a same-line comparison covering accepted output, line speed, moisture state, oven temperature and residence time, energy-meter boundary, plate quality and scrap. A single-material claim cannot replace plate acceptance or complete-battery performance validation." }
    ],
    parameters: [["Unit-output energy", "Use the same electricity, gas or steam boundary and normalize by accepted area, mass or plate count."], ["Line speed and output", "Record set speed, actual speed, accepted output, downtime and start-stop losses."], ["Moisture and oven", "Fix sampling points; record incoming/outgoing moisture, zone temperatures and residence time."], ["Plate acceptance", "Use approved appearance, consistency, adhesion or shedding and dimensional checks."], ["Scrap and downstream result", "Separate scrap-rate evidence from complete-battery capacity, life and reliability tests."]],
    formats: { eyebrow: "Same-line evidence", title: "Keep process, quality and battery conclusions in separate evidence layers", items: [["Process record", "Line speed, accepted output, moisture, oven zones, residence time and energy-meter readings.", "/images/agm-hero-production-1600.webp", "Manufacturing process records for a same-line comparison"], ["Material and plate checks", "Evaluate the pasting paper and finished plates with agreed sampling and acceptance methods.", "/images/agm-quality-control-1200.webp", "Quality-control equipment for material-level checks"], ["Complete-battery validation", "Verify downstream battery performance separately after plate acceptance.", "/images/evidence/quality-electrical-resistance-test-01.webp", "Test setup illustrating a separate validation layer"]] },
    checklist: { eyebrow: "Implementation checklist", title: "Inputs to freeze before the trial", text: "Use one signed comparison sheet for the baseline and candidate. Do not change the energy denominator after the run.", items: ["Pasting-line speed, paste recipe and accepted-output definition", "Baseline and candidate paper lot and moisture state", "Oven zones, temperature, residence time and energy boundary", "Plate appearance, consistency and scrap acceptance rules", "Downstream battery validation scope and decision owner"] },
    references: { eyebrow: "Official source checked", title: "Public supplier product page reviewed and archived on 9 October 2026", text: "The continuous-pasting, lower-temperature or stopped-oven, and plant-fiber replacement statements are attributed to the supplier. The page provides no quantified saving or trial conditions and is not evidence of Viking product capability.", items: agmPastingPaperReferenceItems },
    related: { eyebrow: "Related technical pages", title: "Continue with real product, quality and application pages", items: [["AGM Separator for VRLA Batteries", "/applications/agm-separator-for-vrla-battery/"], ["AGM Separator Specifications", "/products/agm-separator/"], ["AGM Separator Testing", "/quality-control/agm-separator-testing/"], ["Request a Sample and Technical Review", "/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.en.inquiry, eyebrow: "One project question", title: "Would you judge this claim by unit-output energy or by oven-temperature change?", text: "Send the pasting-line speed, current oven temperature or energy boundary, material moisture state and plate acceptance requirements for a technical assessment or sample discussion. Viking does not promise the cited competitor product or an energy-saving result.", checklist: ["Pasting-line speed", "Current oven temperature or energy boundary", "Material moisture state", "Plate acceptance requirements"], placeholders: { ...articleCopy.en.inquiry.placeholders, message: "Pasting-line speed, oven temperature or energy boundary, material moisture state and plate acceptance requirements" } }, footer: articleCopy.en.footer
  },
  zh: {
    homePath: "/zh/", languagePath: "/blog/agm-fiberglass-pasting-paper-drying-energy-validation/", quote: "申请技术评估",
    nav: { company: "公司", quality: "质量" },
    hero: { eyebrow: "AGM 玻纤涂板纸", title: "一张涂板纸能省下多少烘干能耗？先别急着相信“停用干燥窑”", subtitle: "换一张纸，就能把干燥窑关掉？这句话至少还缺四个条件：涂板线速度、材料含水状态、窑温与能耗口径，以及极板验收结果。", secondary: "查看同线对照方法", image: { src: "/images/agm-quality-control-1200.webp", alt: "用于材料层检测的 AGM 隔板质量检测场景", width: 1200, height: 900 } },
    intro: ["一份公开供应商产品资料称，一种用于连续涂板的 AGM 玻纤涂板纸可降低干燥窑烘干温度或停止使用干燥窑，并可替代植物纤维类涂板纸。这是企业对其产品的自述，不是第三方实测结论。", "该页面没有给出节能量、测量口径、涂板线速度、材料含水状态、窑温条件、对照试验，也没有给出极板或整电池验证结果。因此，采购和工艺团队真正需要回答的不是材料名称是否“节能”，而是同线对照应怎样证明。"],
    sections: [
      { eyebrow: "主张与来源", title: "公开资料中的节能说法需要哪些证据？", text: "被引用页面称该产品适用于涂板机连续涂板，可降低干燥窑烘干温度或停止使用干燥窑，并可替代植物纤维类涂板纸。页面没有将其列为本周新品，也没有提供第三方验证或行业基准。维京不声明提供该产品，也不承诺复现所述结果。" },
      { eyebrow: "缺失条件", title: "窑温变化还不是节能结果", text: "可审计的比较至少需要合格极板产出、涂板线速度、进出料含水状态、窑段、设定与实测温度、停留时间、用电/燃气/蒸汽边界、计量时间窗和归一化方法。所引用的公开资料没有披露这些量化条件。" },
      { eyebrow: "同线对照", title: "用单位合格产量能耗比较，而不是只看温度", text: "在同一条涂板线上，以约定的配方、极板几何、涂膏量、班次窗口和生产状态运行现行纸与候选纸。同步记录每单位合格面积、质量或片数对应的能耗，以及线速、含水、窑温、启停损失和环境条件。窑温能说明工艺发生变化，却不能单独证明净节能。" },
      { eyebrow: "极板验收", title: "节能、极板质量与报废率要分别取证", text: "按工厂已批准的方法比较极板外观、边缘状态、粘附或掉粉指标、含水一致性、尺寸或质量一致性及报废率。如果产速下降、返工增加或合格产出改变，较低窑温不能直接换算为节能收益。" },
      { eyebrow: "验证边界", title: "涂板纸与 AGM 主隔板不是同一产品层", text: "涂板纸服务于极板制造，AGM 主隔板则用于组装后的 VRLA 电池内部。材料层观察不能单独证明极板耐久、电池容量、寿命或现场可靠性；极板验收与整电池验证仍是两个独立关口。" },
      { eyebrow: "实施前核对", title: "替换前先锁定四类边界", text: "锁定基线与候选材料批次、涂板线速度和铅膏配方；约定含水取样点与窑炉运行窗口；明确能源计量点与单位产量分母；冻结极板验收、报废及后续电池检查。没有这些边界，供应商定性说法不能转化为工厂结果。" },
      { eyebrow: "常见问题", title: "玻纤涂板纸能降低铅酸电池干燥窑能耗吗？", text: "这是供应商对其现有产品的定性主张，但该公开页面没有量化节能数据。判断时需要在同一涂板线上对照单位合格产量、线速、材料含水状态、窑温与停留时间、能源计量边界、极板质量和报废率。单一材料主张不能替代极板验收，也不能替代整电池性能验证。" }
    ],
    parameters: [["单位产量能耗", "统一电、气或蒸汽边界，并按合格面积、质量或片数归一。"], ["线速与产出", "记录设定/实际线速、合格产出、停机及启停损失。"], ["含水与窑温", "锁定取样时点，记录进出料含水、各窑段温度和停留时间。"], ["极板验收", "使用已批准的外观、一致性、粘附/掉粉及尺寸方法。"], ["报废与后续结果", "报废率证据与整电池容量、寿命、可靠性试验分别判断。"]],
    formats: { eyebrow: "同线证据", title: "把工艺、质量和电池结论分成三层", items: [["工艺记录", "记录线速、合格产出、含水、窑段、停留时间和能源表读数。", "/images/agm-hero-production-1600.webp", "用于同线对照的生产过程记录"], ["材料与极板检查", "按约定取样和验收方法检查涂板纸及成品极板。", "/images/agm-quality-control-1200.webp", "用于材料层检查的质量检测设备"], ["整电池验证", "极板验收通过后，另行验证下游电池表现。", "/images/evidence/quality-electrical-resistance-test-01.webp", "表示独立验证层级的检测装置"]] },
    checklist: { eyebrow: "实施前清单", title: "试验前需要锁定的输入", text: "基线与候选材料共用一张签字确认的对照表，试验后不要更换能耗分母。", items: ["涂板线速度、铅膏配方与合格产出定义", "现行纸与候选纸批次及含水状态", "窑段、温度、停留时间与能源计量边界", "极板外观、一致性和报废验收规则", "后续整电池验证范围与决策责任人"] },
    references: { eyebrow: "已核验官方来源", title: "原始产品资料与证据边界", text: "连续涂板、降低窑温或停用干燥窑、替代植物纤维的说法均来自所引用的供应商资料。页面没有量化节能结果或试验条件，也不能证明维京产品能力。", items: agmPastingPaperReferenceItems },
    related: { eyebrow: "真实站内链接", title: "继续查看应用、规格、检测与样品页面", items: [["VRLA 电池 AGM 隔板应用", "/zh/applications/agm-separator-for-vrla-battery/"], ["AGM 隔板产品规格", "/zh/products/agm-separator/"], ["AGM 隔板质量检测", "/zh/quality-control/agm-separator-testing/"], ["申请样品与技术评估", "/zh/request-agm-separator-sample/"]] },
    inquiry: { ...articleCopy.zh.inquiry, eyebrow: "只问一个问题", title: "你们会用单位产量能耗，还是窑温变化来判断这类主张？", text: "请提交涂板线速度、现行窑温或能耗口径、材料含水状态及极板验收要求，用于技术评估或试样沟通。维京不承诺提供竞品所称产品或实现其节能结果。", checklist: ["涂板线速度", "现行窑温或能耗口径", "材料含水状态", "极板验收要求"], placeholders: { ...articleCopy.zh.inquiry.placeholders, message: "涂板线速度、现行窑温或能耗口径、材料含水状态及极板验收要求" } }, footer: articleCopy.zh.footer
  }
} as const;

const aiDataCenterBackupPowerLayersCopy = {
  en: {
    homePath: "/", languagePath: "/zh/blog/ai-data-center-backup-power-1mw-60-seconds/", quote: "Request a Sample",
    nav: { company: "Company", quality: "Quality" },
    hero: { eyebrow: "AI Data Center Backup Power", title: "1 MW for 60 Seconds: Why AI Data Center Backup Power Prioritizes Speed Before Duration", subtitle: "The 1 MW / at least 60-second figure is the cited company’s corporate disclosure for the disclosed system—not an industry benchmark. Backup should be divided by transient, seconds-scale and minutes-scale duty.", secondary: "Review the selection checklist", image: { src: "/images/applications/ups-vrla-battery-application-1200.webp", alt: "Data center backup power battery installation", width: 1200, height: 900 } },
    intro: ["Why would a 1 MW backup system emphasize only 60 seconds? Because power and duration describe a duty, not the sufficiency of an entire facility design.", "The cited company says the disclosed system made its first public appearance at YOTTA 2026. In a five-module configuration, the company states that each cabinet delivers 1 MW rated discharge power and at least 60 seconds of backup at a 1 MW load. Every number and function below remains a company claim, not independent verification."],
    sections: [
      { eyebrow: "Disclosure and boundary", title: "1 MW and 60 seconds describe the disclosed five-module configuration", text: "The cited company describes a hybrid of lithium-ion capacitors (LIC) and lithium iron phosphate (LFP) batteries, direct connection to an 800 V DC busbar (±400 V), and a portfolio that also includes rack-level battery backup units (BBU). The disclosure does not establish an industry standard, prove universal compatibility or show that 60 seconds is sufficient for a data-center site." },
      { eyebrow: "Duty layers", title: "Separate transient response, seconds-scale ride-through and minutes-scale backup", text: "A layered design assigns each timescale a job. Transient support addresses rapid load movement; seconds-scale ride-through may bridge a short transfer or stabilize a bus; longer backup supports the recovery sequence defined by the facility. Response time, power curve, duration, transfer logic, controls and recovery target must be specified together." },
      { eyebrow: "Architecture", title: "LIC, LFP, BBU and conventional UPS/VRLA occupy different positions", text: "LIC may be evaluated for frequent pulse cycling, LFP for stored backup energy, and BBU for protection closer to compute loads. Conventional UPS/VRLA can still have a role where the architecture, high-rate discharge curve, runtime, maintenance method, temperature and complete system validation support it. No chemistry should be assumed to cover every AI load." },
      { eyebrow: "AGM applicability", title: "AGM suitability begins with the battery and system duty", text: "For a short-duration high-rate UPS battery, separator discussions may include thickness, basis weight, acid absorption, electrical resistance, compression response, dimensions and batch consistency. These inputs must be tied to plate design, electrolyte, assembly, charging, thermal conditions and the complete-battery test plan." },
      { eyebrow: "Evidence boundary", title: "AGM separator data cannot prove system-level backup performance", text: "Separator measurements can support material comparison and specification matching. They cannot alone prove capacity, 1 MW output, 60-second runtime, life, safety, compatibility or a customer result. Complete-battery and system tests remain necessary, and Viking does not claim use in or compatibility with the disclosed system." },
      { eyebrow: "FAQ", title: "Four questions buyers ask about layered backup", text: "Why layer backup power? Different timescales perform different jobs. What does 1 MW / 60 seconds mean? Only company-stated capability for the disclosed five-module configuration. Does UPS/VRLA still have a place? Potentially, when architecture and validation support it. Can AGM data prove backup performance? No—separator data cannot replace complete-battery and system validation." }
    ],
    parameters: [["Target power", "State continuous power, pulse power and the time-based load curve."], ["Backup duration", "Separate transient, seconds-scale and minutes-scale requirements."], ["Architecture", "Confirm AC/DC topology, bus voltage, UPS/BBU position, transfer logic and controls."], ["Environment and maintenance", "Provide temperature range, space, cooling, service access and replacement method."], ["Battery structure", "Provide plate-group design, compression, electrolyte and complete-battery validation scope."]],
    formats: { eyebrow: "System evidence", title: "Match each claim to the level that must be tested", items: [["Architecture and duty", "Define response speed, power curve, duration and transfer sequence before selecting a battery route.", "/images/applications/ups-vrla-battery-application-1200.webp", "UPS and data center backup power application"], ["AGM material review", "Compare separator dimensions and material tests only within agreed methods and sample conditions.", "/images/agm-quality-control-1200.webp", "AGM separator testing equipment"], ["Complete validation", "Verify the assembled battery and complete power system against the project duty and environment.", "/images/evidence/quality-electrical-resistance-test-01.webp", "AGM separator electrical resistance test"]] },
    checklist: { eyebrow: "Selection checklist", title: "Inputs to confirm before comparing backup options", text: "Use one duty sheet for all candidate routes. A chemistry label or separator value is not a substitute for a system requirement.", items: ["Target continuous and pulse power curve", "Backup time by transient, seconds and minutes", "Bus voltage, transfer logic and control boundary", "Temperature, cooling and maintenance method", "Battery structure and complete-system validation plan"] },
    references: { eyebrow: "Official source checked", title: "The cited company disclosure archived and reviewed on 8 October 2026", text: "The publication date, debut, product name, 1 MW rating, at least 60 seconds at 1 MW, LIC+LFP design, 800 V DC bus connection and BBU portfolio are attributed to the cited company. They are not third-party validation, industry-wide performance or evidence of Viking compatibility.", items: aiDataCenterBackupPowerReferenceItems },
    related: { eyebrow: "Related technical pages", title: "Continue the architecture and material review", items: [["AGM Separator for Data Center Backup Power", "/blog/agm-separator-for-data-center-backup-power/"], ["AGM Separator for UPS Batteries", "/applications/agm-separator-for-ups-battery/"], ["AGM Separator Specifications", "/products/agm-separator/"], ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]] },
    inquiry: { ...articleCopy.en.inquiry, eyebrow: "One project question", title: "What target power and backup time must your project validate?", text: "Send the target power curve, backup duration, temperature and battery structure for AGM separator specification or sample matching. This does not promise battery or system performance.", checklist: ["Target power and duration", "Temperature range", "Battery and plate-group structure", "Validation stage and test method"], placeholders: { ...articleCopy.en.inquiry.placeholders, message: "Target power curve, backup duration, temperature, battery structure and validation stage" } }, footer: articleCopy.en.footer
  },
  zh: {
    homePath: "/zh/", languagePath: "/blog/ai-data-center-backup-power-1mw-60-seconds/", quote: "申请样品",
    nav: { company: "公司", quality: "质量" },
    hero: { eyebrow: "AI 数据中心备电", title: "1MW 只备 60 秒：AI 数据中心为什么先争“快”，再争“久”？", subtitle: "1MW/至少60秒是公开资料对所述系统的企业披露，不是行业基准；备电应按瞬态、秒级和分钟级任务分层。", secondary: "查看选型清单", image: { src: "/images/applications/ups-vrla-battery-application-1200.webp", alt: "数据中心备用电源电池应用", width: 1200, height: 900 } },
    intro: ["一套 1MW 备电系统为什么只强调 60 秒？因为功率和时长描述的是一项任务，而不是整个机房设计是否充分。", "所引企业称所述系统在 YOTTA 2026 首次公开亮相。企业披露五模块运行配置下单柜额定放电功率 1MW，在 1MW 负载下至少备电 60 秒。本文所有数字和功能均保留企业自述边界，不作为第三方验证。"],
    sections: [
      { eyebrow: "披露与边界", title: "1MW 与 60 秒只描述公开披露中的五模块系统配置", text: "所引企业称其采用 LIC+LFP 混合设计，直连 800V DC 母线（±400V），并展示机架级 BBU。该披露不是行业标准，不能证明普遍兼容，也不能推出 60 秒足以满足某个数据中心项目。" },
      { eyebrow: "任务分层", title: "把瞬态响应、秒级穿越和分钟级后备分开", text: "分层架构让不同时间尺度承担不同任务：瞬态层处理快速负载变化；秒级层可能用于短时切换或母线稳定；更长时后备服务于项目定义的恢复序列。响应速度、功率曲线、时长、切换逻辑、控制和恢复目标必须一起定义。" },
      { eyebrow: "架构定位", title: "LIC、LFP、BBU 与传统 UPS/VRLA 回答不同问题", text: "LIC 可针对频繁脉冲循环评估，LFP 可承担储能后备，BBU 把保护放到更靠近计算负载的位置。传统 UPS/VRLA 在架构、高倍率放电曲线、时长、维护方式、温度及完整系统验证均支持时仍可能有位置。不能推断单一化学体系覆盖全部 AI 负载。" },
      { eyebrow: "AGM 适用条件", title: "AGM 是否适用，要从电池与系统任务开始", text: "高倍率短时 UPS 电池的隔板沟通可包含厚度、克重、吸酸、电阻、压缩响应、尺寸和批次一致性，但这些输入必须与极板设计、电解液、装配、充电、温度及整电池试验计划相连。" },
      { eyebrow: "证据边界", title: "AGM 隔板数据不能证明系统级备电表现", text: "隔板测试可支持材料比较和规格匹配，却不能单独证明容量、1MW 输出、60 秒时长、寿命、安全、兼容性或客户结果。必须进行整电池和系统验证；维京不声明其产品用于或兼容所述系统。" },
      { eyebrow: "FAQ", title: "分层备电的四个常见问题", text: "为什么分层？不同时间尺度承担不同任务。1MW/60秒代表什么？仅代表所引用企业对五模块系统配置的披露。传统 UPS/VRLA 是否仍有位置？可能有，取决于架构与验证。AGM 数据能证明备电表现吗？不能，隔板参数不能替代整电池和系统验证。" }
    ],
    parameters: [["目标功率", "给出连续功率、脉冲功率和随时间变化的负载曲线。"], ["备电时长", "分别定义瞬态、秒级和分钟级要求。"], ["系统架构", "确认 AC/DC 拓扑、母线电压、UPS/BBU 位置、切换逻辑和控制。"], ["环境与维护", "提供温度范围、空间、冷却、维护通道和更换方式。"], ["电池结构", "提供极群、压缩、电解液和整电池验证范围。"]],
    formats: { eyebrow: "系统证据", title: "让每项声明对应应被验证的层级", items: [["架构与任务", "选路线前定义响应速度、功率曲线、时长和切换顺序。", "/images/applications/ups-vrla-battery-application-1200.webp", "UPS 与数据中心备电应用"], ["AGM 材料评审", "仅在约定方法和样品状态下比较隔板尺寸与材料测试。", "/images/agm-quality-control-1200.webp", "AGM 隔板检测设备"], ["完整验证", "按项目任务与环境验证组装电池及完整供电系统。", "/images/evidence/quality-electrical-resistance-test-01.webp", "AGM 隔板电阻测试"]] },
    checklist: { eyebrow: "选型核对清单", title: "比较备电路线前先确认这些输入", text: "所有候选路线使用同一份任务书。化学体系名称或单个隔板参数不能替代系统要求。", items: ["目标连续/脉冲功率曲线", "瞬态、秒级和分钟级时长", "母线电压、切换逻辑和控制边界", "温度、冷却与维护方式", "电池结构和完整系统验证计划"] },
    references: { eyebrow: "已核验官方来源", title: "2026 年 10 月 8 日存档并查阅所引企业官方披露", text: "发布日期、首次公开、产品名、1MW 额定值、1MW 下至少 60 秒、LIC+LFP、800V DC 母线和 BBU 信息均归因于所引企业披露。它们不是第三方验证、行业普遍值或维京兼容性证据。", items: aiDataCenterBackupPowerReferenceItems },
    related: { eyebrow: "相关技术页面", title: "继续核对架构与材料", items: [["数据中心备电 AGM 隔板", "/zh/blog/agm-separator-for-data-center-backup-power/"], ["UPS 电池 AGM 隔板", "/zh/applications/agm-separator-for-ups-battery/"], ["AGM 隔板规格", "/zh/products/agm-separator/"], ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]] },
    inquiry: { ...articleCopy.zh.inquiry, eyebrow: "只问一个项目问题", title: "您的项目目标功率与备电时间是多少？", text: "请同时提交目标功率曲线、备电时长、温度和电池结构，用于 AGM 隔板规格或样品匹配；这不构成电池或系统性能承诺。", checklist: ["目标功率与时长", "温度范围", "电池与极群结构", "验证阶段与测试方法"], placeholders: { ...articleCopy.zh.inquiry.placeholders, message: "目标功率曲线、备电时长、温度、电池结构和验证阶段" } }, footer: articleCopy.zh.footer
  }
} as const;

const dataCenterEvLowVoltageAgmCopy = {
  en: {
    homePath: "/", languagePath: "/zh/blog/why-data-centers-and-electric-vehicles-still-use-lead-acid-low-voltage-power/", quote: "Request a Sample",
    nav: { company: "Company", quality: "Quality" },
    hero: { eyebrow: "Data Center & EV Low-Voltage Power", title: "Why Do AI Data Centers and Electric Vehicles Still Need Lead-Acid Low-Voltage Power?", subtitle: "Data-center backup and EV low-voltage systems have different duties. Their common point is a system-specific need for reliable auxiliary or standby power—not a universal claim for one battery chemistry.", secondary: "Compare the two applications", image: { src: "/images/applications/ups-vrla-battery-application-1200.webp", alt: "VRLA battery backup application", width: 1200, height: 900 } },
    intro: ["At ELBC 2026, the cited company Founder & Chairman Dr. Dong Li described Asia's lead-acid battery market as adapting to demand supported by expanding data-center and telecom infrastructure, and by the continuing low-voltage role of lead-acid in many electric vehicles. This is the cited company's corporate market perspective, not an independent market-size report or a quantified forecast.", "The useful engineering question is not whether lead-acid competes with every energy-storage route. It is whether a given system needs the standby or low-voltage duty that a specified battery architecture is designed to perform. AGM separator selection must then follow the individual battery design and complete-battery validation plan."],
    sections: [
      { eyebrow: "Source boundary", title: "The cited company reports a market perspective, not a quantified demand study", text: "The cited company event recap says its chairman linked new demand patterns in Asia to data-center and telecom infrastructure and to lead-acid's low-voltage role in many EVs. It supplies no market size, growth rate, adoption rate or split by application. This article therefore does not infer a regional forecast, project volume or customer demand from that statement." },
      { eyebrow: "Data center duty", title: "A backup battery is selected around a standby-power system", text: "In a data center or UPS architecture, battery duty can include maintaining standby readiness and providing backup power when the system calls for it. Battery technology, discharge profile, runtime, maintenance approach and site design are system decisions. Not every data center uses the same battery chemistry or VRLA configuration." },
      { eyebrow: "EV duty", title: "An EV low-voltage battery is an auxiliary-system decision", text: "Many electric vehicles retain a low-voltage electrical system, but the battery architecture varies by vehicle, market and manufacturer. A lead-acid AGM battery may be considered for a low-voltage role in some designs; this does not mean every EV uses AGM or lead-acid, nor that it replaces the traction battery." },
      { eyebrow: "Comparison", title: "The two applications share a reliability question, not one universal specification", text: "Data-center backup discussions may focus on standby state, discharge duty, service access and system maintenance. Vehicle discussions may add packaging, temperature exposure, vibration, compression and vehicle electrical integration. For both, material measurements must be tied to the actual battery design, agreed test conditions and complete-battery verification." },
      { eyebrow: "AGM separator boundary", title: "A separator participates in battery performance; it does not decide it alone", text: "AGM separator thickness, basis weight, absorption-related behaviour, electrical resistance, compression response, roll or sheet dimensions and batch records can be discussed for a battery project. Those material details cannot independently demonstrate capacity, life, cost, reliability, vehicle compatibility or UPS performance. Plate design, electrolyte, assembly, charging, temperature and system controls also matter." },
      { eyebrow: "Specification match", title: "Start with the application, structure and target operating conditions", text: "For a sample and specification discussion, identify the application, battery structure, low-voltage or standby duty, target dimensions, roll or sheet format, assembly conditions, relevant temperature or vibration conditions, agreed material checks and complete-battery validation stage. Viking can discuss AGM separator supply specifications; the battery maker and customer remain responsible for complete-battery and system validation." }
    ],
    parameters: [["Application", "Data-center or UPS backup, EV low-voltage system, or another defined battery duty."], ["Battery structure", "Plate-group dimensions, target compression and electrolyte/assembly conditions."], ["Operating conditions", "Standby/discharge duty, temperature, vibration or service conditions relevant to the project."], ["Material evidence", "Agreed dimensions, test method, sample state and batch records."], ["Validation", "Complete-battery and system test scope, result owner and project stage."]],
    formats: { eyebrow: "Application comparison", title: "Use the same sourcing discipline, with different operating questions", items: [["Data center / UPS", "Confirm battery architecture, standby and discharge duty, maintenance approach and project validation plan.", "/images/applications/ups-vrla-battery-application-1200.webp", "VRLA battery backup application"], ["EV low-voltage", "Confirm vehicle battery role, packaging, temperature and vibration conditions, assembly inputs and validation plan.", "/images/viking-finished-separator-roll-900.webp", "Finished AGM separator roll"]] },
    checklist: { eyebrow: "Buyer checklist", title: "Information to provide for AGM separator specification matching", text: "These details scope a material discussion. They do not amount to a promise of battery or system performance.", items: ["Application and defined battery duty", "Battery structure, plate-group dimensions and target compression", "Target thickness, width or sheet dimensions and roll/sheet format", "Operating conditions and agreed material test methods", "Complete-battery validation scope and project stage"] },
    references: { eyebrow: "Official source checked", title: "The cited company ELBC 2026 event recap reviewed on 4 October 2026", text: "The cited company's page supports the attribution to the company spokesperson and the stated corporate view on data centers, telecom infrastructure and EV low-voltage power. It does not provide quantified market data or verify Viking specifications, battery performance, customer relationships or project outcomes.", items: dataCenterEvLowVoltageAgmReferenceItems },
    related: { eyebrow: "Related pages", title: "Continue with application and verification details", items: [["AGM Separator for Data Center Backup Power", "/blog/agm-separator-for-data-center-backup-power/"], ["AGM Separator for UPS Batteries", "/applications/agm-separator-for-ups-battery/"], ["AGM Separator Products", "/products/agm-separator/"], ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]]},
    inquiry: { ...articleCopy.en.inquiry, title: "Request an AGM separator specification match for your application", text: "Select the application and share the battery structure, target operating conditions, dimensions, roll or sheet format and validation stage. We can discuss an AGM separator specification without making a complete-battery or system-performance promise.", checklist: ["Application and battery duty", "Battery structure and target dimensions", "Operating and assembly conditions", "Material checks and validation stage"], placeholders: { ...articleCopy.en.inquiry.placeholders, message: "Application, battery structure, low-voltage or standby duty, dimensions, operating conditions, test method and validation stage" } }, footer: articleCopy.en.footer
  },
  zh: {
    homePath: "/zh/", languagePath: "/blog/why-data-centers-and-electric-vehicles-still-use-lead-acid-low-voltage-power/", quote: "申请样品",
    nav: { company: "公司", quality: "质量" },
    hero: { eyebrow: "数据中心与电动车低压电源", title: "为什么 AI 数据中心和电动车仍可能需要铅酸低压电源？", subtitle: "数据中心备电与电动车低压系统的工作任务不同；共同点是特定系统对可靠辅助或后备电源的需求，而不是对某一种电池路线的普遍判断。", secondary: "比较两个应用", image: { src: "/images/applications/ups-vrla-battery-application-1200.webp", alt: "VRLA 电池备电应用", width: 1200, height: 900 } },
    intro: ["所引企业在 ELBC 2026 的活动回顾中称，其创始人兼董事长将亚洲铅酸电池市场的新需求与数据中心、通信基础设施扩张，以及许多电动车中铅酸作为低压电源的持续角色联系起来。这是所引企业的企业市场观点，不是独立市场规模报告或量化预测。", "工程上更有价值的问题不是铅酸是否与所有储能路线竞争，而是具体系统是否有某种电池结构所承担的后备或低压任务。AGM 隔板选型仍应回到单个电池设计和整电池验证计划。"],
    sections: [{ eyebrow: "来源边界", title: "所引企业披露的是市场观点，不是量化需求研究", text: "活动回顾支持对该企业观点的归因，却没有市场规模、增长率、采用率或分场景数据。本文不据此推导区域预测、项目量或客户需求。" }, { eyebrow: "数据中心任务", title: "后备电池需围绕备用电源系统选型", text: "数据中心或 UPS 架构中的电池可能承担待机准备和系统调用时的后备供电。技术路线、放电曲线、备电时长、维护方式和现场设计均是系统决策，并非所有数据中心采用相同化学体系或 VRLA 配置。" }, { eyebrow: "电动车任务", title: "电动车低压电池是辅助系统架构选择", text: "许多电动车保留低压电气系统，但不同车型、地区和制造商的电池架构并不相同。某些设计可能考虑铅酸 AGM 电池承担低压任务；这不代表所有电动车使用 AGM 或铅酸，也不等于替代动力电池。" }, { eyebrow: "对比", title: "两个场景共享可靠性问题，而不共享一套规格", text: "数据中心备电会关注待机、放电任务、维护和系统验证；车载低压系统还可能关注布置、温度、振动、压缩和电气集成。两者的材料指标都必须联系实际电池设计、约定试验条件和整电池验证。" }, { eyebrow: "AGM 隔板边界", title: "隔板参与电池表现，但不单独决定系统表现", text: "厚度、克重、吸液相关表现、电阻、压缩响应、卷材或片材尺寸和批次记录可用于项目沟通，但不能单独证明容量、寿命、成本、可靠性、车辆适配性或 UPS 表现。极板、电解液、装配、充电、温度和系统控制同样重要。" }, { eyebrow: "规格匹配", title: "从应用、结构和目标工况开始", text: "申请样品前请明确应用、电池结构、低压或备电任务、目标尺寸、卷材或片材形式、装配条件、相关温度或振动条件、约定材料检查和整电池验证阶段。维京可沟通 AGM 隔板供货规格；整电池和系统验证责任仍由电池制造商及客户承担。" }],
    parameters: [["应用", "数据中心或 UPS 后备、电动车低压系统，或其他已定义的电池任务。"], ["电池结构", "极群尺寸、目标压缩和电解液/装配条件。"], ["工况", "与项目相关的待机/放电、温度、振动或维护条件。"], ["材料证据", "约定尺寸、测试方法、样品状态和批次记录。"], ["验证", "整电池与系统测试范围、结果责任方和项目阶段。"]],
    formats: { eyebrow: "应用对比", title: "采用相同的规格沟通纪律，但问题不同", items: [["数据中心 / UPS", "确认电池架构、待机与放电任务、维护方式和项目验证计划。", "/images/applications/ups-vrla-battery-application-1200.webp", "VRLA 电池备电应用"], ["电动车低压", "确认车载电池角色、布置、温度与振动条件、装配输入和验证计划。", "/images/viking-finished-separator-roll-900.webp", "AGM 隔板成品卷"]] },
    checklist: { eyebrow: "采购清单", title: "申请 AGM 隔板规格匹配前请准备", text: "以下信息用于界定材料沟通范围，并非对整电池或系统表现的承诺。", items: ["应用和已定义电池任务", "电池结构、极群尺寸和目标压缩", "目标厚度、宽度或片材尺寸及卷/片形式", "工况和约定材料测试方法", "整电池验证范围和项目阶段"] },
    references: { eyebrow: "已核验官方来源", title: "2026 年 10 月 4 日查阅的所引企业 ELBC 2026 回顾", text: "所引用的企业资料记录了其关于数据中心、通信基础设施和电动车低压电源观点的归因。该页没有提供量化市场数据，也不能证明维京规格、电池表现、客户关系或项目结果。", items: dataCenterEvLowVoltageAgmReferenceItems },
    related: { eyebrow: "相关页面", title: "继续查看应用与验证信息", items: [["数据中心备电 AGM 隔板", "/zh/blog/agm-separator-for-data-center-backup-power/"], ["UPS 电池 AGM 隔板", "/zh/applications/agm-separator-for-ups-battery/"], ["AGM 隔板产品", "/zh/products/agm-separator/"], ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]]},
    inquiry: { ...articleCopy.zh.inquiry, title: "申请与应用匹配的 AGM 隔板规格沟通", text: "请选择应用并提供电池结构、目标工况、尺寸、卷材或片材形式和验证阶段。我们可沟通 AGM 隔板规格，不对整电池或系统表现作出承诺。", checklist: ["应用和电池任务", "电池结构和目标尺寸", "工况与装配条件", "材料检查和验证阶段"], placeholders: { ...articleCopy.zh.inquiry.placeholders, message: "应用、电池结构、低压或备电任务、尺寸、工况、测试方法和验证阶段" } }, footer: articleCopy.zh.footer
  }
} as const;

const batteryTechnologyProjectComparisonCopy = {
  "en": {
    "nav": {
      "company": "Company",
      "products": "Products",
      "applications": "Applications",
      "quality": "Quality",
      "resources": "Resources",
      "contact": "Contact"
    },
    "language": "中文",
    "homePath": "/",
    "languagePath": "/zh/blog/compare-lead-lithium-sodium-batteries-by-project-duty/",
    "brandName": "Hubei Viking Technology Co., Ltd.",
    "quote": "Request a Quote",
    "hero": {
  "eyebrow": "Battery Technology Review",
  "title": "Beyond Lead, Lithium or Sodium: Compare Batteries by Project Duty",
  "subtitle": "Compare battery options through duty, site conditions, safety, recycling, total cost and evidence. Assess AGM separators only within a defined VRLA battery application.",
  "primary": "Ask for AGM Separator Guide",
  "secondary": "Send Your Battery Application",
  "image": {
    "src": "/images/articles/battery-duty-comparison-hero-1600.webp",
    "alt": "AI-generated illustration: Beyond Lead, Lithium or Sodium: Compare Batteries by Project Duty",
    "width": 1600,
    "height": 1200,
    "caption": "AI-generated illustration"
  }
},
    "intro": [
      "Compare battery options through duty, site conditions, safety, recycling, total cost and evidence. Assess AGM separators only within a defined VRLA battery application."
    ],
    "sections": [
      {
        "eyebrow": "Research scope",
        "title": "Broader research does not mean lead research is ending",
        "text": "ELBC 2026 discussed complementary technologies. Batteries International reported a planned CBI expansion in 2027 while retaining lead research. This is media coverage, not a verified CBI governance document or a completed organizational change."
      },
      {
        "eyebrow": "Operating duty",
        "title": "Start with the operating result",
        "text": "Begin with load power and duration, float or cycling duty, temperature, space, charging, controls and maintenance. Compare safety design, monitoring, isolation and incident response within the same system boundary. Verify the local recycling route and responsible parties. Total cost should cover procurement, modifications, operation, maintenance, replacement and recycling; purchase price alone is insufficient."
      },
      {
        "eyebrow": "System architecture",
        "title": "Multiple technologies do not require a hybrid system",
        "text": "A hybrid configuration needs a specific duty-based justification. If one technology satisfies the requirements, extra interfaces and controls may add unnecessary complexity. Validate a combined system only when different duties justify it and controls, interfaces, maintenance and responsibilities can be implemented. This is a project review framework, not a universal ranking of chemistries."
      },
      {
        "eyebrow": "AGM boundary",
        "title": "AGM belongs within a defined VRLA application",
        "text": "AGM is not a chemistry alongside lead, lithium or sodium: it is an absorbent glass mat construction used in VRLA lead-acid batteries. First establish whether the project includes a suitable VRLA duty, such as validated backup or float service. Check charging, temperature, space, maintenance and battery design. A lithium-ion or sodium-ion project does not automatically require AGM separators."
      },
      {
        "eyebrow": "Validation",
        "title": "Use the same inputs and acceptance criteria",
        "text": "Give every candidate the same load profile, operating mode, environment, safety requirements, recycling responsibility and cost boundary. Distinguish material data, sample results, complete-battery validation and operating-system evidence. Define acceptance criteria and the party responsible for each test before treating results as comparable. Material tests alone cannot establish battery life, capacity or system safety."
      },
      {
        "eyebrow": "Viking scope",
        "title": "Viking’s separator scope",
        "text": "Hubei Viking Technology focuses on AGM glass-fiber separators for VRLA lead-acid batteries. Discuss roll or sheet format, thickness, width, sheet dimensions, packaging and agreed sample methods. Final suitability depends on battery design, operating duty and customer validation. Share the application, capacity, target dimensions, test conditions and current sample stage for specification matching."
      }
    ],
    "parameters": [
      [
        "Start with the operating result",
        "Load profile, target power and required duration"
      ],
      [
        "Multiple technologies do not require a hybrid system",
        "Float, cycling or mixed operating mode"
      ],
      [
        "AGM belongs within a defined VRLA application",
        "Temperature, space, installation and maintenance"
      ],
      [
        "Use the same inputs and acceptance criteria",
        "Sample, complete-battery and system acceptance criteria"
      ]
    ],
    "formats": {
      "eyebrow": "Roll vs Sheet",
      "title": "Choose the supply format according to production workflow",
      "items": [
        [
          "AGM separator rolls",
          "Rolls are suitable for continuous production, further slitting and in-house cutting before assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "Finished AGM separator roll"
        ],
        [
          "AGM separator sheets",
          "Sheets are convenient for direct assembly, small batches, sample review and customized battery models.",
          "/images/sheets1-900.webp",
          "AGM separator sheets"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "Buyer Checklist",
      "title": "Common inputs for a technology review",
      "text": "Use the same boundaries for every option.",
      "items": [
        "Load profile, target power and required duration",
        "Float, cycling or mixed operating mode",
        "Temperature, space, installation and maintenance",
        "Safety, monitoring and incident-response requirements",
        "Local recycling route and responsible parties",
        "Procurement, modification, operating and replacement costs",
        "Sample, complete-battery and system acceptance criteria"
      ]
    },
    "related": {
      "eyebrow": "Related Pages",
      "title": "Continue with product and quality details",
      "items": [
        [
          "Why Many UPS Projects Still Use VRLA Batteries",
          "/blog/why-ups-projects-still-use-vrla-batteries/"
        ],
        [
          "What Is AGM Separator?",
          "/blog/what-is-agm-separator/"
        ],
        [
          "Key Technical Parameters of AGM Separator",
          "/blog/key-technical-parameters-of-agm-separator/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "Inquiry",
      "title": "Request a Sample & Specification Match",
      "text": "For an existing VRLA project, send the application, capacity, operating duty, thickness, width or sheet dimensions, test conditions and sample stage. Separator data does not replace complete-battery or system validation.",
      "checklist": [
        "Load profile, target power and required duration",
        "Float, cycling or mixed operating mode",
        "Temperature, space, installation and maintenance",
        "Safety, monitoring and incident-response requirements"
      ],
      "fields": {
        "name": "Name",
        "company": "Company",
        "email": "Email",
        "country": "Country",
        "application": "Battery Application",
        "message": "Message"
      },
      "placeholders": {
        "message": "For an existing VRLA project, send the application, capacity, operating duty, thickness, width or sheet dimensions, test conditions and sample stage. Separator data does not replace complete-battery or system validation."
      },
      "submit": "Send Inquiry",
      "submitting": "Sending...",
      "required": "Please complete all required fields before submitting.",
      "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
      "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "footer": {
      "description": "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      "wechat": "Official WeChat account",
      "mobile": "Mobile website"
    },
    "references": {
      "eyebrow": "Sources and scope",
      "title": "Broader research does not mean lead research is ending",
      "text": "ELBC 2026 discussed complementary technologies. Batteries International reported a planned CBI expansion in 2027 while retaining lead research. This is media coverage, not a verified CBI governance document or a completed organizational change.",
      "items": [
        [
          "ELBC — Lead and Multi-Technology Workshop",
          "https://www.elbcexpo.org/energy-storage-workshop/"
        ],
        [
          "Batteries International — CBI, 2026-09-19",
          "https://www.batteriesinternational.com/news/new-pivot-for-elbc-as-cbi-opens-doors-to-research-for-all-chemistries/"
        ]
      ]
    }
  },
  "zh": {
    "nav": {
      "company": "公司",
      "products": "产品",
      "applications": "应用",
      "quality": "质量",
      "resources": "资料",
      "contact": "联系"
    },
    "language": "EN",
    "homePath": "/zh/",
    "languagePath": "/blog/compare-lead-lithium-sodium-batteries-by-project-duty/",
    "brandName": "湖北维京科技有限公司",
    "quote": "获取报价",
    "hero": {
  "eyebrow": "电池技术方案评审",
  "title": "铅、锂还是钠？从项目工况比较电池方案",
  "subtitle": "从负载任务、现场条件、安全、回收、总成本和验证证据比较电池方案；将 AGM 隔板放回已明确的 VRLA 电池应用中评估。",
  "primary": "索取 AGM 隔板指南",
  "secondary": "发送电池应用信息",
  "image": {
    "src": "/images/articles/battery-duty-comparison-hero-1600.webp",
    "alt": "AI 示意图: 铅、锂还是钠？从项目工况比较电池方案",
    "width": 1600,
    "height": 1200,
    "caption": "AI 示意图"
  }
},
    "intro": [
      "从负载任务、现场条件、安全、回收、总成本和验证证据比较电池方案；将 AGM 隔板放回已明确的 VRLA 电池应用中评估。"
    ],
    "sections": [
      {
        "eyebrow": "研究范围",
        "title": "研究范围扩大，不等于铅电池研究结束",
        "text": "ELBC 2026 讨论了不同电池技术的互补。Batteries International 报道 CBI 计划于 2027 年拓宽研究范围，同时保留铅电池研究。这里引用的是媒体报道，并非已核验的 CBI 治理文件，也不表述为已经完成的组织调整。"
      },
      {
        "eyebrow": "运行任务",
        "title": "先明确项目要获得什么运行结果",
        "text": "先明确负载功率、持续时间、浮充或循环任务，以及温度、空间、充电、控制和维护条件。在同一系统边界下比较安全设计、监测、隔离和事故响应要求，确认当地可验证的回收渠道及责任方。总成本应覆盖采购、系统改造、运行、维护、更换和回收，不能仅看购置价格。"
      },
      {
        "eyebrow": "系统架构",
        "title": "多技术路线，不等于每个项目都要混合系统",
        "text": "混合配置需要具体工况依据。如果一种技术已经满足要求，额外接口和控制可能增加不必要的复杂度。只有不同任务确实需要不同能力，且控制、接口、维护和责任分配可以落地时，才值得进一步验证组合方案。这是一套项目评审框架，不是各种化学体系的通用排名。"
      },
      {
        "eyebrow": "AGM 边界",
        "title": "AGM 必须从 VRLA 应用边界进入比较",
        "text": "AGM 不是与铅、锂、钠并列的电池化学体系，而是 VRLA 铅酸电池采用吸液玻璃纤维毡的结构方式。先确认项目是否包含适合 VRLA 且经过验证的备电或浮充任务，再核对充电、温度、空间、维护和整电池设计。项目采用锂离子或钠离子电池，并不会自动产生 AGM 隔板需求。"
      },
      {
        "eyebrow": "验证依据",
        "title": "统一输入条件和验收标准",
        "text": "所有候选方案都应采用相同的负载曲线、运行模式、环境、安全要求、回收责任和成本边界。明确区分材料数据、样品结果、整电池验证和运行系统证据。比较前约定验收标准与各项测试的责任方。单凭材料测试不能证明电池寿命、容量或系统安全。"
      },
      {
        "eyebrow": "维京范围",
        "title": "维京可以配合的隔板范围",
        "text": "湖北维京科技专注于 VRLA 铅酸电池用 AGM 玻璃纤维隔板，可沟通卷材或片材、厚度、宽度、片材尺寸、包装及约定的样品方法。最终适用性仍取决于电池设计、运行任务和客户验证。申请规格匹配时，请提供应用、容量、目标尺寸、测试条件和当前样品阶段。"
      }
    ],
    "parameters": [
      [
        "先明确项目要获得什么运行结果",
        "负载曲线、目标功率及持续时间"
      ],
      [
        "多技术路线，不等于每个项目都要混合系统",
        "浮充、循环或混合运行模式"
      ],
      [
        "AGM 必须从 VRLA 应用边界进入比较",
        "温度、空间、安装和维护条件"
      ],
      [
        "统一输入条件和验收标准",
        "样品、整电池和系统验收标准"
      ]
    ],
    "formats": {
      "eyebrow": "卷材与片材",
      "title": "根据生产流程选择供应形式",
      "items": [
        [
          "AGM 隔板卷材",
          "卷材适合连续生产、进一步分切以及装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板成品卷"
        ],
        [
          "AGM 隔板片材",
          "片材适合直接装配、小批量需求、样品评估和定制电池型号。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "买家清单",
      "title": "电池技术评审的统一输入",
      "text": "所有候选方案采用相同边界。",
      "items": [
        "负载曲线、目标功率及持续时间",
        "浮充、循环或混合运行模式",
        "温度、空间、安装和维护条件",
        "安全、监测和事故响应要求",
        "当地回收渠道和责任方",
        "采购、改造、运行及更换成本",
        "样品、整电池和系统验收标准"
      ]
    },
    "related": {
      "eyebrow": "相关页面",
      "title": "继续查看产品和质量信息",
      "items": [
        [
          "UPS 机房都在谈锂电、钠电，为什么很多项目还在继续用 VRLA？",
          "/zh/blog/why-ups-projects-still-use-vrla-batteries/"
        ],
        [
          "什么是 AGM 隔板？",
          "/zh/blog/what-is-agm-separator/"
        ],
        [
          "AGM 隔板关键技术参数",
          "/zh/blog/key-technical-parameters-of-agm-separator/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "询盘",
      "title": "申请样品与规格匹配",
      "text": "已有 VRLA 项目请提供应用、容量、运行任务、厚度、宽度或片材尺寸、测试条件和样品阶段。隔板数据不能替代整电池和系统验证。",
      "checklist": [
        "负载曲线、目标功率及持续时间",
        "浮充、循环或混合运行模式",
        "温度、空间、安装和维护条件",
        "安全、监测和事故响应要求"
      ],
      "fields": {
        "name": "姓名",
        "company": "公司",
        "email": "邮箱",
        "country": "国家/地区",
        "application": "电池应用",
        "message": "留言"
      },
      "placeholders": {
        "message": "已有 VRLA 项目请提供应用、容量、运行任务、厚度、宽度或片材尺寸、测试条件和样品阶段。隔板数据不能替代整电池和系统验证。"
      },
      "submit": "发送询盘",
      "submitting": "发送中...",
      "required": "请先填写所有必填字段。",
      "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
      "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "footer": {
      "description": "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      "wechat": "官方微信公众号",
      "mobile": "移动官网"
    },
    "references": {
      "eyebrow": "来源与范围",
      "title": "研究范围扩大，不等于铅电池研究结束",
      "text": "ELBC 2026 讨论了不同电池技术的互补。Batteries International 报道 CBI 计划于 2027 年拓宽研究范围，同时保留铅电池研究。这里引用的是媒体报道，并非已核验的 CBI 治理文件，也不表述为已经完成的组织调整。",
      "items": [
        [
          "ELBC — Lead and Multi-Technology Workshop",
          "https://www.elbcexpo.org/energy-storage-workshop/"
        ],
        [
          "Batteries International — CBI, 2026-09-19",
          "https://www.batteriesinternational.com/news/new-pivot-for-elbc-as-cbi-opens-doors-to-research-for-all-chemistries/"
        ]
      ]
    }
  }
} as const;

const sodiumIonColdStartAgmComparisonCopy = {
  en: {
    ...batteryTechnologyProjectComparisonCopy.en,
  "languagePath": "/zh/blog/sodium-ion-minus-40-cold-start-agm-comparison/",
  "hero": {
  "eyebrow": "Battery Technology Review",
  "title": "−40°C Sodium-Ion Cold Start: What Changes in the AGM Comparison?",
  "subtitle": "What company-reported −40°C sodium-ion cold-start validation means for low-voltage battery selection, and where AGM separator evidence must stop.",
  "primary": "Ask for AGM Separator Guide",
  "secondary": "Send Your Battery Application",
  "image": {
    "src": "/images/articles/sodium-cold-start-hero-1600.webp",
    "alt": "AI-generated illustration: −40°C Sodium-Ion Cold Start: What Changes in the AGM Comparison?",
    "width": 1600,
    "height": 1200,
    "caption": "AI-generated illustration"
  }
},
  "intro": [
    "A new cold-start milestone changes the evidence available to buyers. The useful next step is to define the vehicle’s operating task and compare what each candidate has actually demonstrated."
  ],
  "sections": [
    {
      "eyebrow": "Reported milestone",
      "title": "The announced result and development stage",
      "text": "On September 14, 2026, Clarios, Altris and InoBat reported −40°C cold-cranking validation for their sodium-ion low-voltage, high-power solution. The announcement describes internal testing and customer evaluations, including automotive, commercial-vehicle and off-highway work, and a move toward pilot-scale learning and small-series production readiness."
    },
    {
      "eyebrow": "Evidence boundary",
      "title": "A cold-start result is not a lifecycle conclusion",
      "text": "This is a company-reported milestone, not independent third-party confirmation. It does not demonstrate mass-production readiness, lifecycle cost leadership or suitability for every vehicle and climate. It does not establish that AGM has been replaced. Low-temperature performance should be compared through defined conditions and evidence rather than a fixed technology label."
    },
    {
      "eyebrow": "Purchasing criteria",
      "title": "Compare four dimensions before selecting a battery",
      "text": "Assess lifecycle cost through initial investment, maintenance, replacement and residual value. Review validation maturity against the relevant vehicle and operating conditions. Verify the local recycling route and responsibility. Check supply and after-sales arrangements, including regional delivery, service and fault handling. A staged corporate disclosure alone cannot close these four questions."
    },
    {
      "eyebrow": "Application conditions",
      "title": "Validate the intended vehicle and climate",
      "text": "The −40°C result is relevant to cold regions and specific vehicles; it cannot replace validation for high-temperature operation, cycling, charge acceptance, maintenance support or actual service life. Apply the same discipline to AGM on existing vehicle platforms. The weighting of cost, evidence, recycling and support changes with temperature range, architecture, duty cycle and local conditions."
    },
    {
      "eyebrow": "Material inputs",
      "title": "Separate AGM material data from battery performance",
      "text": "Separator pore structure, electrolyte absorption, thickness, compression state and batch consistency are material inputs that can affect initial assembly conditions and repeatability. Control these inputs during low-temperature and cycling validation of start-stop batteries. They do not prove whole-battery cold-start capability or independently establish system life, cost or after-sales performance."
    },
    {
      "eyebrow": "Project review",
      "title": "Begin separator selection with project conditions",
      "text": "Record material data, battery tests, vehicle validation and field operation separately. Start with the customer’s vehicle type, temperature range, battery architecture and target duty cycle; identify comparable data, existing validation and gaps. Viking can discuss AGM separator roll or sheet format, thickness, width, sample methods and batch consistency for a defined VRLA project. Final suitability requires customer battery and application validation."
    }
  ],
  "parameters": [
    [
      "Lifecycle cost",
      "Initial investment, maintenance, replacement and residual value."
    ],
    [
      "Validation maturity",
      "Vehicle-relevant conditions, methods and available evidence."
    ],
    [
      "Recycling",
      "A verifiable end-of-life route and responsible parties."
    ],
    [
      "Supply and after-sales",
      "Regional delivery, service and fault handling."
    ]
  ],
  "checklist": {
    "eyebrow": "Buyer Checklist",
    "title": "Inputs for a start-stop battery review",
    "text": "Use the same boundaries for every option.",
    "items": [
      "Vehicle type and intended region of use",
      "Temperature range and operating extremes",
      "Battery architecture and target duty cycle",
      "Capacity, separator thickness, width and roll/sheet dimensions",
      "Existing battery, vehicle and field-validation evidence",
      "Test methods, compression conditions and sample stage",
      "Recycling, supply, after-sales responsibility and lifecycle cost"
    ]
  },
  "related": {
    "eyebrow": "Related Pages",
    "title": "Continue with product and quality details",
    "items": [
      [
        "Beyond Lead, Lithium or Sodium: Compare Batteries by Project Duty",
        "/blog/compare-lead-lithium-sodium-batteries-by-project-duty/"
      ],
      [
        "Automotive AGM Start-Stop Batteries: What Separator Buyers Should Confirm",
        "/blog/agm-start-stop-battery-separator-procurement-guide/"
      ],
      [
        "Key Technical Parameters of AGM Separator",
        "/blog/key-technical-parameters-of-agm-separator/"
      ]
    ]
  },
  "inquiry": {
    "eyebrow": "Inquiry",
    "title": "Request a Sample & Specification Match",
    "text": "Share vehicle type, temperature range, battery architecture, target duty cycle, capacity, separator dimensions, test conditions and sample stage for AGM start-stop specification matching.",
    "checklist": [
      "Vehicle type and intended region of use",
      "Temperature range and operating extremes",
      "Battery architecture and target duty cycle",
      "Capacity, separator thickness, width and roll/sheet dimensions"
    ],
    "fields": {
      "name": "Name",
      "company": "Company",
      "email": "Email",
      "country": "Country",
      "application": "Battery Application",
      "message": "Message"
    },
    "placeholders": {
      "message": "Share vehicle type, temperature range, battery architecture, target duty cycle, capacity, separator dimensions, test conditions and sample stage for AGM start-stop specification matching."
    },
    "submit": "Send Inquiry",
    "submitting": "Sending...",
    "required": "Please complete all required fields before submitting.",
    "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
    "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
    "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
  },
  "references": {
    "eyebrow": "Source and validation boundary",
    "title": "Company disclosure reviewed on 18 October 2026",
    "text": "The September 14, 2026 announcement was reviewed on October 18, 2026. Its −40°C result is a company disclosure, not a Viking specification, independent certification or complete lifecycle comparison; detailed test conditions must be obtained for project validation.",
    "items": [
      [
        "Clarios / Altris / InoBat — 2026-09-14",
        "https://www.clarios.com/es/insights/news/news-detail/clarios-altris-and-inobat-advance-sodium-ion-technology"
      ]
    ]
  }

  },
  zh: {
    ...batteryTechnologyProjectComparisonCopy.zh,
  "languagePath": "/blog/sodium-ion-minus-40-cold-start-agm-comparison/",
  "hero": {
  "eyebrow": "电池技术方案评审",
  "title": "钠离子电池 −40°C 冷启动：AGM 方案该如何比较？",
  "subtitle": "解读企业披露的钠离子电池 −40°C 冷启动验证，从全生命周期成本、验证成熟度、回收和售后支持比较低压电池，并厘清 AGM 隔板证据边界。",
  "primary": "索取 AGM 隔板指南",
  "secondary": "发送电池应用信息",
  "image": {
    "src": "/images/articles/sodium-cold-start-hero-1600.webp",
    "alt": "AI 示意图: 钠离子电池 −40°C 冷启动：AGM 方案该如何比较？",
    "width": 1600,
    "height": 1200,
    "caption": "AI 示意图"
  }
},
  "intro": [
    "新的冷启动进展改变了采购团队可以参考的证据。下一步应明确车辆的运行任务，比较各方案实际完成了哪些验证，以及哪些问题仍待确认。"
  ],
  "sections": [
    {
      "eyebrow": "企业披露",
      "title": "公告确认了什么开发进度",
      "text": "2026 年 9 月 14 日，Clarios、Altris 和 InoBat 披露其钠离子低压、高功率方案完成 −40°C 冷启动验证。公告涉及内部测试及客户评估，包括汽车、商用车和非道路应用，并称方案正向中试学习和小批量生产准备推进。"
    },
    {
      "eyebrow": "证据边界",
      "title": "一次冷启动结果不等于全生命周期结论",
      "text": "这是企业披露的阶段进展，并非独立第三方确认，不能据此认定已具备大规模量产条件、全生命周期成本领先，或适用于所有车辆和气候，也不等于 AGM 已被替代。低温表现应依据明确工况与验证证据比较，不能作为某条技术路线的固定标签。"
    },
    {
      "eyebrow": "采购比较",
      "title": "采购前统一四项比较维度",
      "text": "全生命周期成本应综合初始投入、维护、更换及残值；验证成熟度要对应具体车辆和运行条件；回收要确认当地路径和责任方；供货与售后要覆盖使用地区的交付、服务及故障处理。单次阶段性企业公告不能直接回答这四个采购问题。"
    },
    {
      "eyebrow": "应用条件",
      "title": "验证必须对应具体车型与气候",
      "text": "−40°C 结果与寒冷地区及特定车型相关，但不能替代高温、循环、充电接受能力、维护支持或实际寿命验证。AGM 同样应放在既有车型平台、已有验证与真实服务条件中评估。温度范围、电池架构、目标工况和当地条件不同，四个维度的权重也会变化。"
    },
    {
      "eyebrow": "材料输入",
      "title": "AGM 材料数据与整电池表现分开记录",
      "text": "隔板孔结构、吸液、厚度、压缩状态和批次一致性属于可能影响初始装配条件及重复性的材料输入，应在启停电池低温与循环验证中加以控制。这些材料数据不能证明整电池冷启动能力，也不能单独证明低压系统的寿命、成本或售后表现。"
    },
    {
      "eyebrow": "项目评审",
      "title": "从项目条件开始选择隔板",
      "text": "材料数据、电池测试、整车验证和实际运行记录应分层保存。从客户车型、温度范围、电池架构和目标工况开始，明确可比数据、已有验证和待补证据。维京可为已明确的 VRLA 项目沟通 AGM 隔板卷材或片材、厚度、宽度、样品方法及批次一致性；最终适用性仍须由客户完成整电池及应用验证。"
    }
  ],
  "parameters": [
    [
      "全生命周期成本",
      "初始投入、维护、更换和残值。"
    ],
    [
      "验证成熟度",
      "对应车型的工况、方法和已有证据。"
    ],
    [
      "回收",
      "可核实的报废回收路径与责任方。"
    ],
    [
      "供货与售后",
      "使用地区的交付、服务和故障处理。"
    ]
  ],
  "checklist": {
    "eyebrow": "买家清单",
    "title": "启停电池项目评审输入",
    "text": "所有候选方案采用相同边界。",
    "items": [
      "车型及计划使用地区",
      "温度范围与极端工况",
      "电池架构及目标运行任务",
      "容量、隔板厚度、宽度和卷/片尺寸",
      "已有电池、整车和运行验证证据",
      "测试方法、压缩条件及样品阶段",
      "回收、供货、售后责任与全生命周期成本"
    ]
  },
  "related": {
    "eyebrow": "相关页面",
    "title": "继续查看产品和质量信息",
    "items": [
      [
        "铅、锂还是钠？从项目工况比较电池方案",
        "/zh/blog/compare-lead-lithium-sodium-batteries-by-project-duty/"
      ],
      [
        "汽车 AGM 启停电池：隔板采购需要确认哪些事项？",
        "/zh/blog/agm-start-stop-battery-separator-procurement-guide/"
      ],
      [
        "AGM 隔板关键技术参数",
        "/zh/blog/key-technical-parameters-of-agm-separator/"
      ]
    ]
  },
  "inquiry": {
    "eyebrow": "询盘",
    "title": "申请样品与规格匹配",
    "text": "请提供车型、温度范围、电池架构、目标工况、容量、隔板尺寸、测试条件和样品阶段，沟通启停用 AGM 隔板规格。",
    "checklist": [
      "车型及计划使用地区",
      "温度范围与极端工况",
      "电池架构及目标运行任务",
      "容量、隔板厚度、宽度和卷/片尺寸"
    ],
    "fields": {
      "name": "姓名",
      "company": "公司",
      "email": "邮箱",
      "country": "国家/地区",
      "application": "电池应用",
      "message": "留言"
    },
    "placeholders": {
      "message": "请提供车型、温度范围、电池架构、目标工况、容量、隔板尺寸、测试条件和样品阶段，沟通启停用 AGM 隔板规格。"
    },
    "submit": "发送询盘",
    "submitting": "发送中...",
    "required": "请先填写所有必填字段。",
    "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
    "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
    "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
  },
  "references": {
    "eyebrow": "来源与验证边界",
    "title": "2026 年 10 月 18 日核对的企业公告",
    "text": "2026 年 10 月 18 日核对了所引 2026 年 9 月 14 日公告。−40°C 结果属于企业披露，不是维京规格、独立认证或完整生命周期比较；项目验证仍需取得具体测试条件。",
    "items": [
      [
        "Clarios / Altris / InoBat — 2026-09-14",
        "https://www.clarios.com/es/insights/news/news-detail/clarios-altris-and-inobat-advance-sodium-ion-technology"
      ]
    ]
  }

  }
} as const;

const agmMaterialDataPredictiveMaintenanceCopy = {
  en: {
    ...sodiumIonColdStartAgmComparisonCopy.en,
    "languagePath": "/zh/blog/agm-material-data-battery-soh-predictive-maintenance/",
    "hero": {
  "eyebrow": "AGM Material Traceability",
  "title": "Predicting 12V Battery Failure: Where AGM Material Data Fits",
  "subtitle": "Trace AGM batches, whole-battery aging and field records for explainable SOH assessment. Separator consistency is a material input, not a standalone prediction service.",
  "primary": "Ask for AGM Separator Guide",
  "secondary": "Send Your Battery Application",
  "image": {
    "src": "/images/articles/agm-soh-evidence-chain-hero-1600.webp",
    "alt": "AI-generated illustration: Predicting 12V Battery Failure: Where AGM Material Data Fits",
    "width": 1600,
    "height": 1200,
    "caption": "AI-generated illustration"
  }
},
    "intro": [
        "For battery manufacturers and application teams, the useful shift is from collecting isolated curves to explaining why comparable batteries age differently. Start with a common design, duty cycle and traceable records."
    ],
    "sections": [
        {
            "eyebrow": "Fleet-service example",
            "title": "Early warning needs explainable data",
            "text": "Clarios’s September 14, 2026 page describes expanding Battery Manager engagement with European fleets. Connected hardware, cellular communication and cloud analytics provide battery health, state of charge and charging-system information for maintenance decisions. Clarios says results depend on vehicle, duty, environment and maintenance. The page does not disclose an algorithm, sample size or prediction accuracy. This is a Clarios service, not a Viking platform or a promise of an exact failure date."
        },
        {
            "eyebrow": "Material evidence",
            "title": "Trace the starting material conditions",
            "text": "For an AGM battery health assessment—state of health, or SOH—retain separator batch identity, thickness, acid absorption, compression conditions and aging-related changes. These records help engineers check whether batteries of the same design began from comparable material conditions. Record the test method, sample state and measurement conditions alongside each result; an isolated material parameter cannot calculate SOH."
        },
        {
            "eyebrow": "Battery evidence",
            "title": "Link aging results to battery design and test conditions",
            "text": "Whole-battery records should link capacity, internal resistance, charge-discharge behavior and post-cycle changes to battery identity, structure, temperature and the agreed test method. Keep aging stages and dates aligned with the relevant separator batch. Battery tests describe behavior under defined conditions; they are a separate evidence level from separator measurements."
        },
        {
            "eyebrow": "Field evidence",
            "title": "Place field events on the same timeline",
            "text": "Field records should include vehicle type, duty cycle, temperature, charging-system behavior, anomalies and maintenance history. They help determine whether laboratory observations can reasonably explain service performance. A model can operate with incomplete evidence, but interpretation becomes harder. A field anomaly must not automatically be blamed on a separator, and material variation alone cannot predict vehicle failure."
        },
        {
            "eyebrow": "Industry assessment",
            "title": "Consistency may help reduce unexplained variation",
            "text": "Viking’s industry assessment is that consistent starting materials may make comparable battery aging data easier to interpret. This is a rationale for controlling variation, not a demonstrated improvement in a particular model. Unexplained thickness, absorption or compression differences can obscure design, process and operating effects. Retain batch and aging records to support investigation; they do not form a finished predictive-maintenance solution."
        },
        {
            "eyebrow": "Practical records",
            "title": "Build a shared evidence chain before a complex platform",
            "text": "Begin with repeatable fields for batch, key test conditions, battery aging results, field anomalies and maintenance timing. Map them to the same battery structure and target duty cycle, with clear record ownership. Viking does not provide independent battery-health monitoring or SOH calculation. For start-stop and low-voltage AGM batteries, discuss available material and aging records with battery and application teams; material tests cannot replace battery or field validation."
        }
    ],
    "parameters": [
        [
            "Material",
            "Batch identity, thickness, absorption and compression conditions."
        ],
        [
            "Whole battery",
            "Capacity, resistance, cycling results and defined test conditions."
        ],
        [
            "Field operation",
            "Vehicle duty, environment, charging and maintenance history."
        ],
        [
            "Traceability",
            "Battery structure, dates and links across the three levels."
        ]
    ],
    "checklist": {
        "eyebrow": "Buyer Checklist",
        "title": "Records for an aging and failure review",
        "text": "Use the same boundaries for every option.",
        "items": [
            "Battery structure, design revision and target duty cycle",
            "Separator batch, thickness, acid absorption and compression",
            "Sample condition, test method and measurement conditions",
            "Battery identity, capacity, resistance and aging stages",
            "Vehicle, temperature, charging behavior and anomalies",
            "Maintenance events and their dates",
            "Links among material, battery and field records; responsible teams"
        ]
    },
    "related": {
        "eyebrow": "Related Pages",
        "title": "Continue with product and quality details",
        "items": [
            [
                "Why One Passing Test Does Not Prove an AGM Separator Is Ready for Volume Production",
                "/blog/agm-separator-batch-consistency-and-process-control/"
            ],
            [
                "Will an AGM Separator Still Hold Pressure After Filling and Cycling?",
                "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"
            ],
            [
                "Automotive AGM Start-Stop Batteries: What Separator Buyers Should Confirm",
                "/blog/agm-start-stop-battery-separator-procurement-guide/"
            ]
        ]
    },
    "inquiry": {
        "eyebrow": "Inquiry",
        "title": "Request a Sample & Specification Match",
        "text": "Share your battery structure, target duty cycle, separator specifications and available aging records to discuss material evidence for aging and failure analysis. Battery and field validation remain necessary.",
        "checklist": [
            "Battery structure, design revision and target duty cycle",
            "Separator batch, thickness, acid absorption and compression",
            "Sample condition, test method and measurement conditions",
            "Battery identity, capacity, resistance and aging stages"
        ],
        "fields": {
            "name": "Name",
            "company": "Company",
            "email": "Email",
            "country": "Country",
            "application": "Battery Application",
            "message": "Message"
        },
        "placeholders": {
            "message": "Share your battery structure, target duty cycle, separator specifications and available aging records to discuss material evidence for aging and failure analysis. Battery and field validation remain necessary."
        },
        "submit": "Send Inquiry",
        "submitting": "Sending...",
        "required": "Please complete all required fields before submitting.",
        "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
        "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
        "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "references": {
        "eyebrow": "Source and interpretation boundary",
        "title": "Official fleet-service disclosure reviewed on 18 October 2026",
        "text": "Official Clarios disclosure dated September 14, 2026, reviewed October 18, 2026. It supports the fleet-service description and its stated dependencies, not Viking monitoring capability or a quantified model benefit. The material-data framework and possible reduction of unexplained variation are Viking’s industry assessment.",
        "items": [
            [
                "Clarios — Battery Manager, 2026-09-14",
                "https://www.clarios.com/es/insights/news/news-detail/actionable-battery-intelligence-to-european-fleets"
            ]
        ]
    }

  },
  zh: {
    ...sodiumIonColdStartAgmComparisonCopy.zh,
    "languagePath": "/blog/agm-material-data-battery-soh-predictive-maintenance/",
    "hero": {
  "eyebrow": "AGM 材料追溯",
  "title": "预测 12V 电池失效：AGM 材料数据能提供什么？",
  "subtitle": "将 AGM 材料批次、整电池老化结果与现场记录关联，为 SOH 评估提供可解释证据。材料一致性是输入，不能单独预测失效或替代验证。",
  "primary": "索取 AGM 隔板指南",
  "secondary": "发送电池应用信息",
  "image": {
    "src": "/images/articles/agm-soh-evidence-chain-hero-1600.webp",
    "alt": "AI 示意图: 预测 12V 电池失效：AGM 材料数据能提供什么？",
    "width": 1600,
    "height": 1200,
    "caption": "AI 示意图"
  }
},
    "intro": [
        "对电池制造商和应用团队而言，重点是从收集孤立曲线转向解释同类电池为何出现不同老化表现。先统一电池设计和目标工况，再建立可追溯记录。"
    ],
    "sections": [
        {
            "eyebrow": "车队服务案例",
            "title": "早期预警需要可解释的数据",
            "text": "Clarios 于 2026 年 9 月 14 日的官方页面介绍了面向欧洲车队拓展 Battery Manager 的工作。该服务通过车载硬件、蜂窝通信和云端分析提供电池健康、荷电状态与充电系统信息，支持维护决策。Clarios 表明结果受车型、工况、环境和维护影响；页面未公开算法、样本量或预测精度。这是 Clarios 服务，不是维京平台，也不是对准确失效日期的承诺。"
        },
        {
            "eyebrow": "材料证据",
            "title": "材料记录说明起始条件是否可追溯",
            "text": "评估 AGM 电池健康状态（SOH）时，应保留隔板批次、厚度、吸酸、压缩条件及老化相关变化，帮助工程团队判断同一设计的电池是否具有可比的材料起点。结果需要同时记录测试方法、样品状态和测量条件；单个材料参数不能计算 SOH。"
        },
        {
            "eyebrow": "整电池证据",
            "title": "老化结果必须对应结构与测试条件",
            "text": "整电池记录应把容量、内阻、充放电行为和循环后变化关联到电池标识、结构、温度及约定测试方法。老化阶段和时间需能追溯到相关隔板批次。电池试验说明特定条件下的行为，与隔板材料测量属于不同证据层级。"
        },
        {
            "eyebrow": "现场证据",
            "title": "把现场事件放到同一时间线上",
            "text": "现场记录应包含车型、工况、温度、充电系统行为、异常及维护历史，用于判断实验室现象能否合理解释实际服役表现。证据不完整时模型仍可能运行，但解释难度会增加。不能把现场异常自动归因于隔板，也不能仅凭材料波动预测整车失效。"
        },
        {
            "eyebrow": "行业判断",
            "title": "一致性可能帮助减少难以解释的差异",
            "text": "维京的行业判断是：一致的材料起点可能让同类电池老化数据更容易解释。这是控制波动的分析思路，不是特定模型精度改善的实证结论。厚度、吸酸或压缩表现出现无法解释的差异时，可能混淆设计、工艺与工况的影响。应保留批次与老化记录以支持追查，但这些记录不是完整的预测性维护方案。"
        },
        {
            "eyebrow": "记录实践",
            "title": "先建立证据链，再考虑复杂平台",
            "text": "先建立材料批次、关键测试条件、整电池老化、现场异常与维护时点等可重复填写的字段，再映射到同一电池结构和目标工况，并明确记录责任方。维京不提供独立电池健康监测或 SOH 计算服务。启停和低压 AGM 项目可与电池制造及应用团队沟通已有材料与老化记录；材料测试不能代替整电池或现场验证。"
        }
    ],
    "parameters": [
        [
            "材料层",
            "批次标识、厚度、吸酸与压缩条件。"
        ],
        [
            "整电池层",
            "容量、内阻、循环结果及明确测试条件。"
        ],
        [
            "现场层",
            "车辆工况、环境、充电与维护历史。"
        ],
        [
            "追溯关系",
            "电池结构、时间以及三层记录之间的关联。"
        ]
    ],
    "checklist": {
        "eyebrow": "买家清单",
        "title": "老化与失效评审需要哪些记录",
        "text": "所有候选方案采用相同边界。",
        "items": [
            "电池结构、设计版本与目标工况",
            "隔板批次、厚度、吸酸与压缩条件",
            "样品状态、测试方法与测量条件",
            "电池标识、容量、内阻与老化阶段",
            "车型、温度、充电行为与异常",
            "维护事件及时间",
            "材料、整电池与现场记录的关联及责任团队"
        ]
    },
    "related": {
        "eyebrow": "相关页面",
        "title": "继续查看产品和质量信息",
        "items": [
            [
                "为什么单次检测合格，不等于 AGM 隔板适合批量生产？",
                "/zh/blog/agm-separator-batch-consistency-and-process-control/"
            ],
            [
                "隔板装进去没问题，循环以后还能保持压力吗？",
                "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"
            ],
            [
                "汽车 AGM 启停电池：隔板采购需要确认哪些事项？",
                "/zh/blog/agm-start-stop-battery-separator-procurement-guide/"
            ]
        ]
    },
    "inquiry": {
        "eyebrow": "询盘",
        "title": "申请样品与规格匹配",
        "text": "请提供电池结构、目标工况、隔板规格和已有老化记录，沟通老化与失效分析所需的材料证据；整电池和现场验证仍需完成。",
        "checklist": [
            "电池结构、设计版本与目标工况",
            "隔板批次、厚度、吸酸与压缩条件",
            "样品状态、测试方法与测量条件",
            "电池标识、容量、内阻与老化阶段"
        ],
        "fields": {
            "name": "姓名",
            "company": "公司",
            "email": "邮箱",
            "country": "国家/地区",
            "application": "电池应用",
            "message": "留言"
        },
        "placeholders": {
            "message": "请提供电池结构、目标工况、隔板规格和已有老化记录，沟通老化与失效分析所需的材料证据；整电池和现场验证仍需完成。"
        },
        "submit": "发送询盘",
        "submitting": "发送中...",
        "required": "请先填写所有必填字段。",
        "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
        "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
        "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "references": {
        "eyebrow": "来源与分析边界",
        "title": "2026 年 10 月 18 日核对的官方车队服务资料",
        "text": "2026 年 10 月 18 日核对 Clarios 于 2026 年 9 月 14 日发布的官方资料。来源支持其车队服务描述及所列影响因素，不证明维京监测能力或量化模型收益；材料记录框架及减少不可解释差异的可能性属于维京行业判断。",
        "items": [
            [
                "Clarios — Battery Manager, 2026-09-14",
                "https://www.clarios.com/es/insights/news/news-detail/actionable-battery-intelligence-to-european-fleets"
            ]
        ]
    }

  }
} as const;

const agmVsGemGlassFiberCopy = {
  "en": {
    "nav": {
      "company": "Company",
      "products": "Products",
      "applications": "Applications",
      "quality": "Quality",
      "resources": "Resources",
      "contact": "Contact"
    },
    "language": "中文",
    "homePath": "/",
    "languagePath": "/zh/blog/agm-separator-vs-gem-negative-electrode/",
    "brandName": "Hubei Viking Technology Co., Ltd.",
    "quote": "Request a Quote",
    "hero": {
      "eyebrow": "Start with the material’s location",
      "title": "AGM and GEM: Glass Fiber Between the Plates or Inside the Negative Electrode?",
      "subtitle": "AGM separators and GEM use glass fiber in different locations. Compare their functions, design priorities and evidence before reviewing specifications.",
      "primary": "Ask for AGM Separator Guide",
      "secondary": "Send Your Battery Application",
      "image": {
        "src": "/images/articles/agm-vs-gem-hero-1600.webp",
        "alt": "AI-generated illustration: AGM and GEM: Glass Fiber Between the Plates or Inside the Negative Electrode?",
        "width": 1600,
        "height": 1200,
        "caption": "AI-generated illustration"
      }
    },
    "intro": [
      "An AGM separator sits between positive and negative plates. Glass Electrode Material (GEM) enters negative active material and becomes part of the negative-electrode structure. A shared raw-material family does not make their location, function or evaluation conditions the same."
    ],
    "sections": [
      {
        "eyebrow": "Start with the material’s location",
        "title": "Start with the material’s location",
        "text": "An AGM separator sits between positive and negative plates. Glass Electrode Material (GEM) enters negative active material and becomes part of the negative-electrode structure. A shared raw-material family does not make their location, function or evaluation conditions the same."
      },
      {
        "eyebrow": "AGM separators work between the plates",
        "title": "AGM separators work between the plates",
        "text": "In VRLA-AGM batteries, the separator isolates electrodes, retains electrolyte, provides an ion-transport path and participates in the internal oxygen cycle. Evaluate dimensions and basis weight together with absorption, compression, plate contact and batch stability in relation to the battery design."
      },
      {
        "eyebrow": "GEM becomes part of the negative electrode",
        "title": "GEM becomes part of the negative electrode",
        "text": "ArcActive and H&V describe GEM as a glass-fiber-based negative-electrode material forming a three-dimensional support with negative active material, presented as an alternative to a conventional lead grid. H&V says its relatively open pores allow active material to enter. These are developer descriptions, not independently verified Viking results."
      },
      {
        "eyebrow": "Similar fibers do not make materials interchangeable",
        "title": "Similar fibers do not make materials interchangeable",
        "text": "AGM selection follows separator position and battery architecture. GEM evaluation concerns negative-electrode design, integration with active material and manufacturing process. Neither material should be treated as a substitute for the other solely because both use glass fiber. Compare each under its corresponding structural and test conditions."
      },
      {
        "eyebrow": "A reported pilot is not proof of scale",
        "title": "A reported pilot is not proof of scale",
        "text": "ArcActive states that it jointly developed GEM with H&V in 2024. Its undated homepage reports its first pilot-scale containerized storage system operating at Deakin University’s Waurn Ponds microgrid in Australia in collaboration with Origin Zero. This company disclosure reports a pilot; it does not establish large-scale commercialization."
      },
      {
        "eyebrow": "Viking’s product boundary and your next step",
        "title": "Viking’s product boundary and your next step",
        "text": "Viking focuses on AGM separators and can discuss rolls, sheets and dimensional requirements. GEM is discussed only to clarify structural roles; Viking makes no GEM supply, development or performance commitment. First define the material application and battery structure, then review specification compatibility and validation conditions."
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "Roll vs Sheet",
      "title": "Choose the supply format according to production workflow",
      "items": [
        [
          "AGM separator rolls",
          "Rolls are suitable for continuous production, further slitting and in-house cutting before assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "Finished AGM separator roll"
        ],
        [
          "AGM separator sheets",
          "Sheets are convenient for direct assembly, small batches, sample review and customized battery models.",
          "/images/sheets1-900.webp",
          "AGM separator sheets"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "Buyer Checklist",
      "title": "Viking’s product boundary and your next step",
      "text": "Submit your material application, battery structure and separator dimensions to request a sample and specification match. Confirm test conditions for the intended design.",
      "items": [
        "Material position and intended function",
        "VRLA-AGM battery design and application",
        "Separator thickness, width and roll or sheet dimensions",
        "Sample condition, compression, absorption and battery validation"
      ]
    },
    "related": {
      "eyebrow": "Related Pages",
      "title": "Continue with product and quality details",
      "items": [
        [
          "How China’s Earliest Lead-Acid Batteries Were Made",
          "/blog/how-chinas-earliest-lead-acid-batteries-were-made/"
        ],
        [
          "The Battery’s ‘Third Pole’: What an AGM Separator Actually Does",
          "/blog/agm-separator-third-pole-explained/"
        ],
        [
          "What Is AGM Separator?",
          "/blog/what-is-agm-separator/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "Inquiry",
      "title": "Request a Sample & Specification Match",
      "text": "Submit your material application, battery structure and separator dimensions to request a sample and specification match. Confirm test conditions for the intended design.",
      "checklist": [
        "Material position and intended function",
        "VRLA-AGM battery design and application",
        "Separator thickness, width and roll or sheet dimensions",
        "Sample condition, compression, absorption and battery validation"
      ],
      "fields": {
        "name": "Name",
        "company": "Company",
        "email": "Email",
        "country": "Country",
        "application": "Battery Application",
        "message": "Message"
      },
      "placeholders": {
        "message": "Submit your material application, battery structure and separator dimensions to request a sample and specification match. Confirm test conditions for the intended design."
      },
      "submit": "Send Inquiry",
      "submitting": "Sending...",
      "required": "Please complete all required fields before submitting.",
      "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
      "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "footer": {
      "description": "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      "wechat": "Official WeChat account",
      "mobile": "Mobile website"
    },
    "references": {
      "eyebrow": "Public source and scope",
      "title": "Viking’s product boundary and your next step",
      "text": "Public ArcActive and H&V pages reviewed on 24 October 2026. GEM structure and performance statements belong to those publishers and have not been independently verified by Viking. The pilot webpage shows no publication date; the review date is not its announcement date. The hero is an AI concept, not product or test evidence.",
      "items": [
        [
          "ArcActive — Technology",
          "https://www.arcactive.com/technology"
        ],
        [
          "ArcActive — Deakin University",
          "https://www.arcactive.com/"
        ],
        [
          "H&V — GEM",
          "https://www.hollingsworth-vose.com/industries/gem-lead-acid-battery-plate-alternative/"
        ]
      ]
    },
    "comparison": {
      "eyebrow": "Similar fibers do not make materials interchangeable",
      "title": "Similar fibers do not make materials interchangeable",
      "columns": [
        "Comparison",
        "AGM",
        "GEM"
      ],
      "rows": [
        [
          "Location",
          "Between positive and negative plates",
          "Inside negative active material"
        ],
        [
          "Main role",
          "Separation, electrolyte retention and ion transport",
          "Three-dimensional support; an alternative to a lead grid"
        ],
        [
          "Design focus",
          "Separator specification, absorption, compression and battery fit",
          "Negative-electrode integration and manufacturing process"
        ]
      ]
    }
  },
  "zh": {
    "nav": {
      "company": "公司",
      "products": "产品",
      "applications": "应用",
      "quality": "质量",
      "resources": "资料",
      "contact": "联系"
    },
    "language": "EN",
    "homePath": "/zh/",
    "languagePath": "/blog/agm-separator-vs-gem-negative-electrode/",
    "brandName": "湖北维京科技有限公司",
    "quote": "获取报价",
    "hero": {
      "eyebrow": "先问材料位于哪里",
      "title": "AGM 与 GEM：玻璃纤维在极板之间，还是在负极内部？",
      "subtitle": "AGM 隔板与 GEM 都使用玻纤，但所在位置、功能与设计逻辑不同。采购比较应先辨认结构角色，再审阅规格与验证条件。",
      "primary": "索取 AGM 隔板指南",
      "secondary": "发送电池应用信息",
      "image": {
        "src": "/images/articles/agm-vs-gem-hero-1600.webp",
        "alt": "AI 示意图: AGM 与 GEM：玻璃纤维在极板之间，还是在负极内部？",
        "width": 1600,
        "height": 1200,
        "caption": "AI 示意图"
      }
    },
    "intro": [
      "AGM 隔板位于正负极板之间；玻璃电极材料 GEM 则进入负极活性材料内部，成为负极结构的一部分。原料同属玻纤，不代表位置、功能或评价条件相同。"
    ],
    "sections": [
      {
        "eyebrow": "先问材料位于哪里",
        "title": "先问材料位于哪里",
        "text": "AGM 隔板位于正负极板之间；玻璃电极材料 GEM 则进入负极活性材料内部，成为负极结构的一部分。原料同属玻纤，不代表位置、功能或评价条件相同。"
      },
      {
        "eyebrow": "AGM 隔板在极板之间工作",
        "title": "AGM 隔板在极板之间工作",
        "text": "在 VRLA-AGM 电池中，隔板承担电极隔离、保持电解液、提供离子传输通路并参与内部氧循环的作用。评价时应结合电池设计，除尺寸与定量外，还要考虑吸液、压缩、极板接触与批次稳定性。"
      },
      {
        "eyebrow": "GEM 成为负极结构的一部分",
        "title": "GEM 成为负极结构的一部分",
        "text": "ArcActive 与 H&V 将 GEM 描述为负极用玻纤材料，可与负极活性材料形成三维支撑结构，是传统铅栅的一种替代路线。H&V 表示较开放的孔结构允许活性材料进入。这些说法归属于开发方，不是维京独立验证的结果。"
      },
      {
        "eyebrow": "原料相似不代表可以互换",
        "title": "原料相似不代表可以互换",
        "text": "AGM 选型围绕隔板位置与电池架构；GEM 评价涉及负极设计、活性材料结合及制造流程。不能仅因二者都使用玻纤就视为可互换材料，应按各自结构与试验条件比较。"
      },
      {
        "eyebrow": "试点披露不等于规模化商业化",
        "title": "试点披露不等于规模化商业化",
        "text": "ArcActive 表示其与 H&V 于 2024 年共同开发 GEM；其未标注发布日期的首页报告，首套试点规模集装箱储能系统通过与 Origin Zero 合作，已在澳大利亚 Deakin University 的 Waurn Ponds 微电网运行。这是企业试点披露，不能据此认定规模化商业化。"
      },
      {
        "eyebrow": "维京的产品边界与下一步",
        "title": "维京的产品边界与下一步",
        "text": "维京专注 AGM 隔板，可沟通卷材、片材与具体尺寸需求。本文介绍 GEM 仅用于区分结构角色，不构成维京对 GEM 供应、开发或性能的承诺。应先明确材料用途和电池结构，再审阅规格适配及验证条件。"
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "卷材与片材",
      "title": "根据生产流程选择供应形式",
      "items": [
        [
          "AGM 隔板卷材",
          "卷材适合连续生产、进一步分切以及装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板成品卷"
        ],
        [
          "AGM 隔板片材",
          "片材适合直接装配、小批量需求、样品评估和定制电池型号。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "买家清单",
      "title": "维京的产品边界与下一步",
      "text": "请提交材料用途、电池结构与隔板尺寸，申请样品与规格匹配，并确认对应设计的测试条件。",
      "items": [
        "材料位置与目标功能",
        "VRLA-AGM 电池设计及应用",
        "隔板厚度、宽度与卷材或片材尺寸",
        "样品状态、压缩、吸液与整电池验证"
      ]
    },
    "related": {
      "eyebrow": "相关页面",
      "title": "继续查看产品和质量信息",
      "items": [
        [
          "中国早期铅酸蓄电池是怎样制造的？",
          "/zh/blog/how-chinas-earliest-lead-acid-batteries-were-made/"
        ],
        [
          "电池的“第三极”没有端子：AGM 隔板到底在做什么？",
          "/zh/blog/agm-separator-third-pole-explained/"
        ],
        [
          "什么是 AGM 隔板？",
          "/zh/blog/what-is-agm-separator/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "询盘",
      "title": "申请样品与规格匹配",
      "text": "请提交材料用途、电池结构与隔板尺寸，申请样品与规格匹配，并确认对应设计的测试条件。",
      "checklist": [
        "材料位置与目标功能",
        "VRLA-AGM 电池设计及应用",
        "隔板厚度、宽度与卷材或片材尺寸",
        "样品状态、压缩、吸液与整电池验证"
      ],
      "fields": {
        "name": "姓名",
        "company": "公司",
        "email": "邮箱",
        "country": "国家/地区",
        "application": "电池应用",
        "message": "留言"
      },
      "placeholders": {
        "message": "请提交材料用途、电池结构与隔板尺寸，申请样品与规格匹配，并确认对应设计的测试条件。"
      },
      "submit": "发送询盘",
      "submitting": "发送中...",
      "required": "请先填写所有必填字段。",
      "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
      "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "footer": {
      "description": "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      "wechat": "官方微信公众号",
      "mobile": "移动官网"
    },
    "references": {
      "eyebrow": "公开来源与边界",
      "title": "维京的产品边界与下一步",
      "text": "2026 年 10 月 24 日核对 ArcActive 与 H&V 公开页面。GEM 结构与性能说法归属于发布方，维京未独立验证。试点页面未标注发布日期，查阅日不等于公告日。主图为 AI 概念示意，不是产品或测试证据。",
      "items": [
        [
          "ArcActive — Technology",
          "https://www.arcactive.com/technology"
        ],
        [
          "ArcActive — Deakin University",
          "https://www.arcactive.com/"
        ],
        [
          "H&V — GEM",
          "https://www.hollingsworth-vose.com/industries/gem-lead-acid-battery-plate-alternative/"
        ]
      ]
    },
    "comparison": {
      "eyebrow": "原料相似不代表可以互换",
      "title": "原料相似不代表可以互换",
      "columns": [
        "比较项",
        "AGM",
        "GEM"
      ],
      "rows": [
        [
          "所在位置",
          "正负极板之间",
          "负极活性材料内部"
        ],
        [
          "主要作用",
          "电极隔离、保持电解液及离子传输",
          "三维支撑；传统铅栅的一种替代路线"
        ],
        [
          "设计重点",
          "隔板规格、吸液、压缩与电池结构适配",
          "负极材料结合与制造流程"
        ]
      ]
    }
  }
} as const;

const upsOriginalManufacturerEvidenceCopy = {
  "en": {
    "nav": {
      "company": "Company",
      "products": "Products",
      "applications": "Applications",
      "quality": "Quality",
      "resources": "Resources",
      "contact": "Contact"
    },
    "language": "中文",
    "homePath": "/",
    "languagePath": "/zh/blog/ups-battery-original-manufacturer-production-address-evidence/",
    "brandName": "Hubei Viking Technology Co., Ltd.",
    "quote": "Request a Quote",
    "hero": {
      "eyebrow": "Read the project-specific requirement",
      "title": "UPS Battery Procurement: Match the Production Address to Original-Manufacturer Evidence",
      "subtitle": "A Financial News Press notice shows how producer, origin and TLC records must align in one UPS battery procurement. These conditions are project-specific, not a general OEM/ODM policy.",
      "primary": "Ask for AGM Separator Guide",
      "secondary": "Send Your Battery Application",
      "image": {
        "src": "/images/articles/ups-manufacturer-evidence-hero-1600.webp",
        "alt": "AI-generated illustration: UPS Battery Procurement: Match the Production Address to Original-Manufacturer Evidence",
        "width": 1600,
        "height": 1200,
        "caption": "AI-generated illustration"
      }
    },
    "intro": [
      "Financial News Press issued a notice on 9 October 2026 for 64 units of 12V 100Ah valve-regulated sealed lead-acid batteries, including handling, installation, commissioning and old-battery removal. Item 9 requires the bidding brand’s original factory to manufacture the batteries, rejects OEM/ODM-labelled products, and calls for original-manufacturer and origin evidence matching the producer and address on the TLC certificate or test report."
    ],
    "sections": [
      {
        "eyebrow": "Read the project-specific requirement",
        "title": "Read the project-specific requirement",
        "text": "Financial News Press issued a notice on 9 October 2026 for 64 units of 12V 100Ah valve-regulated sealed lead-acid batteries, including handling, installation, commissioning and old-battery removal. Item 9 requires the bidding brand’s original factory to manufacture the batteries, rejects OEM/ODM-labelled products, and calls for original-manufacturer and origin evidence matching the producer and address on the TLC certificate or test report."
      },
      {
        "eyebrow": "Separate the parties and their roles",
        "title": "Separate the parties and their roles",
        "text": "The same item requires the TLC report applicant to be the producer’s legal entity, or its wholly owned subsidiary or branch. List the brand owner, bidder, producer and report applicant separately, even where names coincide. Their relationships must be read against this notice; the brand printed on a battery is not enough to complete the review."
      },
      {
        "eyebrow": "Compare the product and document fields",
        "title": "Compare the product and document fields",
        "text": "Compare brand and model, producer name, production address, origin evidence, TLC certificate or report, and applicant. Check product series, specification and document version together so records for different products or sites are not combined. This is a practical review sequence, not an extra qualification rule introduced by Viking."
      },
      {
        "eyebrow": "Clarify discrepancies before drawing conclusions",
        "title": "Clarify discrepancies before drawing conclusions",
        "text": "A difference in a name, address or corporate relationship does not by itself establish fraud or illegality. Return to the notice definitions and the relevant document fields. If a requirement is ambiguous, request buyer clarification rather than deciding eligibility on either party’s behalf. The notice does not establish a general OEM/ODM rule for every battery purchase."
      },
      {
        "eyebrow": "AGM records provide one material layer of traceability",
        "title": "AGM records provide one material layer of traceability",
        "text": "For a VRLA battery that actually uses AGM, separator batch information may support upstream material traceability. A battery manufacturer may link it to incoming-material, production and complete-battery test records in its quality system. Separator records do not replace complete-battery origin evidence, TLC certification or test reports and cannot alone establish procurement compliance."
      },
      {
        "eyebrow": "Confirm Viking’s current document availability",
        "title": "Confirm Viking’s current document availability",
        "text": "Viking supplies AGM separators for VRLA lead-acid applications. Available batch fields and delivery-record formats must follow the company’s current valid documentation list, with internal confirmation before details are published. Ask for the current available document scope; this article does not promise particular fields, formats or evidence of complete-battery qualification."
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "Roll vs Sheet",
      "title": "Choose the supply format according to production workflow",
      "items": [
        [
          "AGM separator rolls",
          "Rolls are suitable for continuous production, further slitting and in-house cutting before assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "Finished AGM separator roll"
        ],
        [
          "AGM separator sheets",
          "Sheets are convenient for direct assembly, small batches, sample review and customized battery models.",
          "/images/sheets1-900.webp",
          "AGM separator sheets"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "Buyer Checklist",
      "title": "Confirm Viking’s current document availability",
      "text": "Share your battery design, separator requirements and document needs to request a sample and specification match. Contact Viking to confirm the current list of available AGM batch documentation.",
      "items": [
        "Brand, model, series and specification",
        "Producer and production address across the documents",
        "TLC certificate/report, applicant relationship and version",
        "AGM batch-document availability and battery-record linkage"
      ]
    },
    "related": {
      "eyebrow": "Related Pages",
      "title": "Continue with product and quality details",
      "items": [
        [
          "272 Batteries, 272 Monitors: What UPS Procurement Can Tell Us",
          "/blog/ups-battery-272-individual-monitors-batch-traceability/"
        ],
        [
          "Why One Passing Test Does Not Prove an AGM Separator Is Ready for Volume Production",
          "/blog/agm-separator-batch-consistency-and-process-control/"
        ],
        [
          "AGM Separator Manufacturing: Production, Quality Control and Reliable Delivery",
          "/blog/agm-separator-manufacturing-quality-delivery/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "Inquiry",
      "title": "Request a Sample & Specification Match",
      "text": "Share your battery design, separator requirements and document needs to request a sample and specification match. Contact Viking to confirm the current list of available AGM batch documentation.",
      "checklist": [
        "Brand, model, series and specification",
        "Producer and production address across the documents",
        "TLC certificate/report, applicant relationship and version",
        "AGM batch-document availability and battery-record linkage"
      ],
      "fields": {
        "name": "Name",
        "company": "Company",
        "email": "Email",
        "country": "Country",
        "application": "Battery Application",
        "message": "Message"
      },
      "placeholders": {
        "message": "Share your battery design, separator requirements and document needs to request a sample and specification match. Contact Viking to confirm the current list of available AGM batch documentation."
      },
      "submit": "Send Inquiry",
      "submitting": "Sending...",
      "required": "Please complete all required fields before submitting.",
      "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
      "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "footer": {
      "description": "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      "wechat": "Official WeChat account",
      "mobile": "Mobile website"
    },
    "references": {
      "eyebrow": "Public source and scope",
      "title": "Confirm Viking’s current document availability",
      "text": "People’s Bank of China Procurement Platform notice dated 9 October 2026, reviewed on 24 October 2026. The procurement terms describe this buyer’s requirements, not a general OEM/ODM policy, evidence of Viking involvement, or a compliance verdict. VRLA alone does not confirm AGM construction. The hero is an AI concept, not an actual certificate or project photograph.",
      "items": [
        [
          "PBOC — Financial News Press, 2026-10-09",
          "https://jzcg.pbc.gov.cn/freecms/site/rmyh/ggxx/info/2026/2b3536f1205442898a6c826bc16c4830.html?Type=fzjggg&noticeId=318428c1-c38e-11f1-88d4-b4055dfb2cc6&noticeType=001019"
        ]
      ]
    }
  },
  "zh": {
    "nav": {
      "company": "公司",
      "products": "产品",
      "applications": "应用",
      "quality": "质量",
      "resources": "资料",
      "contact": "联系"
    },
    "language": "EN",
    "homePath": "/zh/",
    "languagePath": "/blog/ups-battery-original-manufacturer-production-address-evidence/",
    "brandName": "湖北维京科技有限公司",
    "quote": "获取报价",
    "hero": {
      "eyebrow": "先读该项目的原厂要求",
      "title": "UPS 电池原厂证明怎么核对？把生产地址与泰尔文件对应起来",
      "subtitle": "金融时报社一则采购公告要求生产单位、产地证明与泰尔文件相互对应。这些要求仅适用于该项目，不是通用 OEM／ODM 政策。",
      "primary": "索取 AGM 隔板指南",
      "secondary": "发送电池应用信息",
      "image": {
        "src": "/images/articles/ups-manufacturer-evidence-hero-1600.webp",
        "alt": "AI 示意图: UPS 电池原厂证明怎么核对？把生产地址与泰尔文件对应起来",
        "width": 1600,
        "height": 1200,
        "caption": "AI 示意图"
      }
    },
    "intro": [
      "金融时报社于 2026 年 10 月 9 日发布公告，采购 64 块 12V 100Ah 阀控式密封铅酸蓄电池，含搬运安装、调试和旧电池拆除。第 9 项要求由投标品牌原厂生产，不接受 OEM、ODM 贴牌产品，并提供原厂原产地证明，生产单位及地址须与泰尔证书或检测报告一致。"
    ],
    "sections": [
      {
        "eyebrow": "先读该项目的原厂要求",
        "title": "先读该项目的原厂要求",
        "text": "金融时报社于 2026 年 10 月 9 日发布公告，采购 64 块 12V 100Ah 阀控式密封铅酸蓄电池，含搬运安装、调试和旧电池拆除。第 9 项要求由投标品牌原厂生产，不接受 OEM、ODM 贴牌产品，并提供原厂原产地证明，生产单位及地址须与泰尔证书或检测报告一致。"
      },
      {
        "eyebrow": "把各方主体与角色分开",
        "title": "把各方主体与角色分开",
        "text": "同一条款要求，泰尔检测报告申请单位与生产单位为同一法人机构，或为其全资子公司、分公司。审阅时分别列出品牌方、投标方、生产单位与报告申请单位，即使名称相同也应明确角色。主体关系应按该公告理解，不能只凭电池上的品牌完成核对。"
      },
      {
        "eyebrow": "逐项核对产品和文件字段",
        "title": "逐项核对产品和文件字段",
        "text": "可依次比较品牌型号、生产单位、生产地址、原产地证明、泰尔证书或报告及申请单位，并核对产品系列、规格和文件版本，避免把不同产品或生产地点的记录混用。这是实务审阅顺序，不是维京另设的资格条件。"
      },
      {
        "eyebrow": "出现差异先澄清",
        "title": "出现差异先澄清",
        "text": "名称、地址或企业关系存在差异，本身不能证明造假或违法。应回到采购文件定义及证书、报告的对应字段核查。要求含义不清时，应向采购方提出澄清，不代替买卖双方作资格判定；本公告也不构成所有电池采购的通用 OEM／ODM 规则。"
      },
      {
        "eyebrow": "AGM 记录只覆盖一层材料追溯",
        "title": "AGM 记录只覆盖一层材料追溯",
        "text": "对于确实采用 AGM 设计的 VRLA 电池，隔板批次资料可作为上游材料追溯的一部分，由电池制造商在其质量体系内关联来料、生产和整电池测试记录。隔板记录不能替代整电池原厂产地证明、泰尔证书或检测报告，也不能单独证明采购符合性。"
      },
      {
        "eyebrow": "维京文件范围以当前清单确认为准",
        "title": "维京文件范围以当前清单确认为准",
        "text": "维京供应 VRLA 铅酸电池用 AGM 隔板。可提供的批次字段及交付记录格式，应以公司当前有效文件清单为准，公开具体内容前需内部确认。请联系确认当前可提供的文件范围；本文不承诺特定字段、格式或整电池资格证明。"
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "卷材与片材",
      "title": "根据生产流程选择供应形式",
      "items": [
        [
          "AGM 隔板卷材",
          "卷材适合连续生产、进一步分切以及装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板成品卷"
        ],
        [
          "AGM 隔板片材",
          "片材适合直接装配、小批量需求、样品评估和定制电池型号。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "买家清单",
      "title": "维京文件范围以当前清单确认为准",
      "text": "请提供电池设计、隔板需求和资料需求，申请样品与规格匹配，并联系维京确认当前可提供的 AGM 批次文件清单。",
      "items": [
        "品牌、型号、系列与规格",
        "各文件中的生产单位及生产地址",
        "泰尔文件、申请单位关系及版本",
        "AGM 批次文件范围与电池记录关联"
      ]
    },
    "related": {
      "eyebrow": "相关页面",
      "title": "继续查看产品和质量信息",
      "items": [
        [
          "272 套电池、272 套监测模块：UPS 采购关注什么？",
          "/zh/blog/ups-battery-272-individual-monitors-batch-traceability/"
        ],
        [
          "为什么单次检测合格，不等于 AGM 隔板适合批量生产？",
          "/zh/blog/agm-separator-batch-consistency-and-process-control/"
        ],
        [
          "湖北维京 AGM 隔板：生产、检测与稳定交付",
          "/zh/blog/agm-separator-manufacturing-quality-delivery/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "询盘",
      "title": "申请样品与规格匹配",
      "text": "请提供电池设计、隔板需求和资料需求，申请样品与规格匹配，并联系维京确认当前可提供的 AGM 批次文件清单。",
      "checklist": [
        "品牌、型号、系列与规格",
        "各文件中的生产单位及生产地址",
        "泰尔文件、申请单位关系及版本",
        "AGM 批次文件范围与电池记录关联"
      ],
      "fields": {
        "name": "姓名",
        "company": "公司",
        "email": "邮箱",
        "country": "国家/地区",
        "application": "电池应用",
        "message": "留言"
      },
      "placeholders": {
        "message": "请提供电池设计、隔板需求和资料需求，申请样品与规格匹配，并联系维京确认当前可提供的 AGM 批次文件清单。"
      },
      "submit": "发送询盘",
      "submitting": "发送中...",
      "required": "请先填写所有必填字段。",
      "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
      "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "footer": {
      "description": "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      "wechat": "官方微信公众号",
      "mobile": "移动官网"
    },
    "references": {
      "eyebrow": "公开来源与边界",
      "title": "维京文件范围以当前清单确认为准",
      "text": "来源为中国人民银行采购平台 2026 年 10 月 9 日公告，2026 年 10 月 24 日核对。条款仅说明该采购方要求，不构成通用 OEM／ODM 政策、维京参与项目的证据或符合性判定。VRLA 名称本身不能确认 AGM 结构。主图为 AI 概念示意，不是真实证书或项目照片。",
      "items": [
        [
          "PBOC — Financial News Press, 2026-10-09",
          "https://jzcg.pbc.gov.cn/freecms/site/rmyh/ggxx/info/2026/2b3536f1205442898a6c826bc16c4830.html?Type=fzjggg&noticeId=318428c1-c38e-11f1-88d4-b4055dfb2cc6&noticeType=001019"
        ]
      ]
    }
  }
} as const;

const telecomLeadAcidProcurementCopy = {
  "en": {
    "nav": {
      "company": "Company",
      "products": "Products",
      "applications": "Applications",
      "quality": "Quality",
      "resources": "Resources",
      "contact": "Contact"
    },
    "language": "中文",
    "homePath": "/",
    "languagePath": "/zh/blog/telecom-backup-lead-acid-procurement-2027-2028/",
    "brandName": "Hubei Viking Technology Co., Ltd.",
    "quote": "Request a Quote",
    "hero": {
      "eyebrow": "What Vision disclosed",
      "title": "Telecom Backup Battery Selection: What a 2027–2028 Lead-Acid Procurement Shows",
      "subtitle": "One procurement keeps lead-acid within a specific backup-power program. Selection still needs discharge power, float conditions, system fit and total cost; AGM evidence remains material-level.",
      "primary": "Ask for AGM Separator Guide",
      "secondary": "Send Your Battery Application",
      "image": {
        "src": "/images/articles/telecom-backup-procurement-hero-1600.webp",
        "alt": "AI-generated illustration: Telecom Backup Battery Selection: What a 2027–2028 Lead-Acid Procurement Shows",
        "width": 1600,
        "height": 1200,
        "caption": "AI-generated illustration"
      }
    },
    "intro": [
      "Vision Group disclosed on 11 September 2026 that it was selected for China Mobile’s 2027–2028 centralized procurement of Class I and high-power lead-acid batteries. It reported approximately USD 60 million including racks, transport and related costs, for backup applications including 5G base stations and data centers. The company reported shares of 10.53% and 14.04% respectively, and described eight consecutive years of selection."
    ],
    "sections": [
      {
        "eyebrow": "What Vision disclosed",
        "title": "What Vision disclosed",
        "text": "Vision Group disclosed on 11 September 2026 that it was selected for China Mobile’s 2027–2028 centralized procurement of Class I and high-power lead-acid batteries. It reported approximately USD 60 million including racks, transport and related costs, for backup applications including 5G base stations and data centers. The company reported shares of 10.53% and 14.04% respectively, and described eight consecutive years of selection."
      },
      {
        "eyebrow": "Keep the procurement signal within scope",
        "title": "Keep the procurement signal within scope",
        "text": "The disclosure supports a limited conclusion: lead-acid remains within this particular program’s scope. The shares are category-specific procurement shares reported by Vision, not national market shares. They do not establish market-share growth, cover every base station or undisclosed project, or describe other operators’ decisions. The eight-year statement is also the company’s own account."
      },
      {
        "eyebrow": "Start with short-duration power",
        "title": "Start with short-duration power",
        "text": "A telecom battery may spend most of its service life on float charge but must support the load when utility power fails. Define target discharge power, required backup duration and output across that period before comparing designs. Energy density alone cannot settle whether a battery meets a particular site’s backup duty."
      },
      {
        "eyebrow": "Review float service and system fit",
        "title": "Review float service and system fit",
        "text": "Review float temperature, inspection practice, maintenance capability and replacement or fault-handling conditions. Existing cabinets, charging logic, installation space, recycling arrangements and total cost remain relevant when chemistry changes. Different sites can reach different choices. These are engineering review considerations, not unpublished tender requirements inferred from Vision’s announcement."
      },
      {
        "eyebrow": "Separate battery claims from AGM data",
        "title": "Separate battery claims from AGM data",
        "text": "In an actual VRLA-AGM design, the separator separates plates and supports electrolyte absorption, ion transport and plate-group contact. Under the intended structure and compression, validate thickness, absorption-related behavior, compressed state and batch variation. Separator data alone cannot prove battery output, float life or base-station system reliability; average values are only a starting point."
      },
      {
        "eyebrow": "Turn the signal into technical preparation",
        "title": "Turn the signal into technical preparation",
        "text": "The two-year program offers no separator formula that can be copied into another battery. As technical preparation, review power and duration, float temperature, maintenance, battery structure and separator specifications on one communication sheet. Viking supplies AGM rolls and sheets and can discuss baseline material information. Final suitability still requires complete-battery tests and system validation."
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "Roll vs Sheet",
      "title": "Choose the supply format according to production workflow",
      "items": [
        [
          "AGM separator rolls",
          "Rolls are suitable for continuous production, further slitting and in-house cutting before assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "Finished AGM separator roll"
        ],
        [
          "AGM separator sheets",
          "Sheets are convenient for direct assembly, small batches, sample review and customized battery models.",
          "/images/sheets1-900.webp",
          "AGM separator sheets"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "Buyer Checklist",
      "title": "Turn the signal into technical preparation",
      "text": "Share your telecom VRLA battery design, discharge duty and separator dimensions to request technical data, samples and a specification match. Confirm complete-battery and system validation plans.",
      "items": [
        "Target discharge power and backup duration",
        "Float temperature, maintenance and replacement conditions",
        "Battery structure, cabinet and charging compatibility",
        "Separator dimensions, compression, absorption and batch validation"
      ]
    },
    "related": {
      "eyebrow": "Related Pages",
      "title": "Continue with product and quality details",
      "items": [
        [
          "Why Many UPS Projects Still Use VRLA Batteries",
          "/blog/why-ups-projects-still-use-vrla-batteries/"
        ],
        [
          "Data Center Backup Demand Is Growing. What Should AGM Separator Sourcing Review?",
          "/blog/agm-separator-for-data-center-backup-power/"
        ],
        [
          "Why One Passing Test Does Not Prove an AGM Separator Is Ready for Volume Production",
          "/blog/agm-separator-batch-consistency-and-process-control/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "Inquiry",
      "title": "Request a Sample & Specification Match",
      "text": "Share your telecom VRLA battery design, discharge duty and separator dimensions to request technical data, samples and a specification match. Confirm complete-battery and system validation plans.",
      "checklist": [
        "Target discharge power and backup duration",
        "Float temperature, maintenance and replacement conditions",
        "Battery structure, cabinet and charging compatibility",
        "Separator dimensions, compression, absorption and batch validation"
      ],
      "fields": {
        "name": "Name",
        "company": "Company",
        "email": "Email",
        "country": "Country",
        "application": "Battery Application",
        "message": "Message"
      },
      "placeholders": {
        "message": "Share your telecom VRLA battery design, discharge duty and separator dimensions to request technical data, samples and a specification match. Confirm complete-battery and system validation plans."
      },
      "submit": "Send Inquiry",
      "submitting": "Sending...",
      "required": "Please complete all required fields before submitting.",
      "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
      "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "footer": {
      "description": "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      "wechat": "Official WeChat account",
      "mobile": "Mobile website"
    },
    "references": {
      "eyebrow": "Public source and scope",
      "title": "Turn the signal into technical preparation",
      "text": "Vision corporate disclosure dated 11 September 2026, reviewed on 24 October 2026. Procurement value, category shares, applications and eight-year statement are attributed to Vision. The page does not verify Viking involvement, confirm every procured battery uses AGM or establish national market trends. Engineering considerations here are discussion guidance, not a uniform test standard. AI hero: conceptual, not a project photograph.",
      "items": [
        [
          "Vision — 2026-09-11",
          "https://www.vision-batt.com/en/news/show/4u9b23cf34l.html"
        ]
      ]
    }
  },
  "zh": {
    "nav": {
      "company": "公司",
      "products": "产品",
      "applications": "应用",
      "quality": "质量",
      "resources": "资料",
      "contact": "联系"
    },
    "language": "EN",
    "homePath": "/zh/",
    "languagePath": "/blog/telecom-backup-lead-acid-procurement-2027-2028/",
    "brandName": "湖北维京科技有限公司",
    "quote": "获取报价",
    "hero": {
      "eyebrow": "Vision 披露了什么",
      "title": "通信备电怎么选？从 2027—2028 年铅酸电池采购看评估条件",
      "subtitle": "单一采购说明铅酸仍在该备电项目范围内。选型仍需结合放电功率、浮充条件、系统适配与总成本；AGM 数据只承担材料层面的证据作用。",
      "primary": "索取 AGM 隔板指南",
      "secondary": "发送电池应用信息",
      "image": {
        "src": "/images/articles/telecom-backup-procurement-hero-1600.webp",
        "alt": "AI 示意图: 通信备电怎么选？从 2027—2028 年铅酸电池采购看评估条件",
        "width": 1600,
        "height": 1200,
        "caption": "AI 示意图"
      }
    },
    "intro": [
      "Vision 集团于 2026 年 9 月 11 日披露，入选中国移动 2027—2028 年一类铅酸及高功率铅酸电池集采，报告总合同金额约 6000 万美元，含电池架、运输及相关费用，用于包括 5G 基站和数据中心在内的备电应用。其报告两类份额分别为 10.53% 和 14.04%，并称连续八年入选。"
    ],
    "sections": [
      {
        "eyebrow": "Vision 披露了什么",
        "title": "Vision 披露了什么",
        "text": "Vision 集团于 2026 年 9 月 11 日披露，入选中国移动 2027—2028 年一类铅酸及高功率铅酸电池集采，报告总合同金额约 6000 万美元，含电池架、运输及相关费用，用于包括 5G 基站和数据中心在内的备电应用。其报告两类份额分别为 10.53% 和 14.04%，并称连续八年入选。"
      },
      {
        "eyebrow": "采购信号的结论边界",
        "title": "采购信号的结论边界",
        "text": "该披露只能支持有限结论：铅酸仍在这一具体项目采购范围内。份额是 Vision 报告的分类采购份额，不是全国市场份额，不能证明市场占比上升，也不覆盖所有基站、未披露项目或其他运营商决策。“连续八年”同样属于企业自身表述。"
      },
      {
        "eyebrow": "先明确短时放电功率",
        "title": "先明确短时放电功率",
        "text": "通信电池可能长期处于浮充状态，却需在市电中断时承担负载。比较方案前，应明确目标放电功率、备电时长及整个期间的输出要求。能量密度本身不能决定某方案是否符合具体站点的备电任务。"
      },
      {
        "eyebrow": "一起审阅浮充与系统适配",
        "title": "一起审阅浮充与系统适配",
        "text": "浮充温度、巡检方式、维护能力与更换或故障处理条件需要共同审阅。即使改变电池体系，既有机柜、充电逻辑、安装空间、回收安排和总成本仍然重要，不同站点可能作出不同选择。这些属于工程评估建议，不是由 Vision 公告推断出的未公开招标条件。"
      },
      {
        "eyebrow": "把电池结论与 AGM 数据分开",
        "title": "把电池结论与 AGM 数据分开",
        "text": "在确实采用 VRLA-AGM 的设计中，隔板隔离极板，支持吸液、离子传输及极群接触。应在目标结构和压缩条件下验证厚度、吸液相关表现、受压状态及批次变化。隔板数据不能单独证明电池输出、浮充寿命或基站系统可靠性，平均值只是起点。"
      },
      {
        "eyebrow": "把采购信号转为技术准备",
        "title": "把采购信号转为技术准备",
        "text": "两年采购周期没有提供可复制到其他电池的隔板配方。技术准备可把功率与时长、浮充温度、维护方式、电池结构和隔板规格放入同一沟通表。维京供应 AGM 卷材和片材，可沟通基础材料资料；最终适用性仍需整电池测试与系统验证。"
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "卷材与片材",
      "title": "根据生产流程选择供应形式",
      "items": [
        [
          "AGM 隔板卷材",
          "卷材适合连续生产、进一步分切以及装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板成品卷"
        ],
        [
          "AGM 隔板片材",
          "片材适合直接装配、小批量需求、样品评估和定制电池型号。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "买家清单",
      "title": "把采购信号转为技术准备",
      "text": "请提供通信 VRLA 电池设计、放电工况和隔板尺寸，申请技术资料、样品与规格匹配，并确认整电池及系统验证安排。",
      "items": [
        "目标放电功率与备电时长",
        "浮充温度、维护与更换条件",
        "电池结构、机柜及充电兼容性",
        "隔板尺寸、压缩、吸液与批次验证"
      ]
    },
    "related": {
      "eyebrow": "相关页面",
      "title": "继续查看产品和质量信息",
      "items": [
        [
          "UPS 机房都在谈锂电、钠电，为什么很多项目还在继续用 VRLA？",
          "/zh/blog/why-ups-projects-still-use-vrla-batteries/"
        ],
        [
          "数据中心备电需求在增长，AGM 隔板配套该看什么？",
          "/zh/blog/agm-separator-for-data-center-backup-power/"
        ],
        [
          "为什么单次检测合格，不等于 AGM 隔板适合批量生产？",
          "/zh/blog/agm-separator-batch-consistency-and-process-control/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "询盘",
      "title": "申请样品与规格匹配",
      "text": "请提供通信 VRLA 电池设计、放电工况和隔板尺寸，申请技术资料、样品与规格匹配，并确认整电池及系统验证安排。",
      "checklist": [
        "目标放电功率与备电时长",
        "浮充温度、维护与更换条件",
        "电池结构、机柜及充电兼容性",
        "隔板尺寸、压缩、吸液与批次验证"
      ],
      "fields": {
        "name": "姓名",
        "company": "公司",
        "email": "邮箱",
        "country": "国家/地区",
        "application": "电池应用",
        "message": "留言"
      },
      "placeholders": {
        "message": "请提供通信 VRLA 电池设计、放电工况和隔板尺寸，申请技术资料、样品与规格匹配，并确认整电池及系统验证安排。"
      },
      "submit": "发送询盘",
      "submitting": "发送中...",
      "required": "请先填写所有必填字段。",
      "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
      "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "footer": {
      "description": "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      "wechat": "官方微信公众号",
      "mobile": "移动官网"
    },
    "references": {
      "eyebrow": "公开来源与边界",
      "title": "把采购信号转为技术准备",
      "text": "来源为 Vision 2026 年 9 月 11 日企业披露，2026 年 10 月 24 日核对。金额、分类份额、应用及连续八年说法均归因于 Vision，不证明维京参与项目、全部采购电池采用 AGM 或全国市场趋势。本文工程建议不是统一试验标准。AI 主图为概念示意，不是项目实拍。",
      "items": [
        [
          "Vision — 2026-09-11",
          "https://www.vision-batt.com/en/news/show/4u9b23cf34l.html"
        ]
      ]
    }
  }
} as const;

const leadPremiumDemandRestockingCopy = {
  "en": {
    "nav": {
      "company": "Company",
      "products": "Products",
      "applications": "Applications",
      "quality": "Quality",
      "resources": "Resources",
      "contact": "Contact"
    },
    "language": "中文",
    "homePath": "/",
    "languagePath": "/zh/blog/lead-premium-battery-demand-based-restocking/",
    "brandName": "Hubei Viking Technology Co., Ltd.",
    "quote": "Request a Quote",
    "hero": {
      "eyebrow": "Read the dated market snapshot",
      "title": "Lead Premiums and Cautious Restocking: Check Orders, Inventory and Cash Flow",
      "subtitle": "A September 2026 lead-market snapshot shows why price strength and cautious battery-material purchasing can coexist. AGM supply plans should follow specifications and actual production needs.",
      "primary": "Ask for AGM Separator Guide",
      "secondary": "Send Your Battery Application",
      "image": {
        "src": "/images/articles/lead-premium-restocking-hero-1600.webp",
        "alt": "AI-generated illustration: Lead Premiums and Cautious Restocking: Check Orders, Inventory and Cash Flow",
        "width": 1600,
        "height": 1200,
        "caption": "AI-generated illustration"
      }
    },
    "intro": [
      "Lead prices describe today’s material cost; stock coverage asks when extra purchases will become orders and cash. Review those questions separately before setting AGM quantities."
    ],
    "sections": [
      {
        "eyebrow": "Read the dated market snapshot",
        "title": "Read the dated market snapshot",
        "text": "Yangtze Nonferrous reported on 29 September 2026 that No. 1 lead averaged RMB 16,325 per metric ton, about RMB 60 above the Shanghai Lead 2611 contract. The same commentary described weakening restocking intentions and some downstream battery makers buying mainly for immediate needs. This is a historical market snapshot, not a current quote or a statistical finding about every manufacturer."
      },
      {
        "eyebrow": "A spot premium is not an end-demand measure",
        "title": "A spot premium is not an end-demand measure",
        "text": "A spot premium means the spot price exceeds the cited futures benchmark. It describes a price relationship, not the strength of final demand. Order visibility, finished-goods stock and working capital may lead companies to different purchases under the same price signal. Extra material must eventually become production, customer deliveries and cash."
      },
      {
        "eyebrow": "Review three separate operating accounts",
        "title": "Review three separate operating accounts",
        "text": "The order account covers production needs, delivery schedules and customer visibility. The inventory account includes raw lead or paste, goods in transit, finished batteries and existing coverage. The cash-flow account includes purchasing capacity, payment terms, collections and payments for other materials. These accounts cannot replace one another; price cannot stand in for orders or funding."
      },
      {
        "eyebrow": "Demand-based replenishment is a risk trade-off",
        "title": "Demand-based replenishment is a risk trade-off",
        "text": "Buying to immediate needs does not always mean buying less. It means linking coverage to actual consumption: replenish to schedule when orders are clear and avoid inventory moving ahead of orders when visibility weakens. This is an operating framework, not a universal conclusion from the report. Suppliers may discuss stable specifications, split quantities and delivery windows rather than assume a price rise will cause bulk buying."
      },
      {
        "eyebrow": "AGM separator inventory needs its own logic",
        "title": "AGM separator inventory needs its own logic",
        "text": "AGM separators have a different cost position from lead, so a lead premium does not determine their inventory target. Review exposure to specification changes, batch transitions and cash tied up in stock. Separate stable-consumption specifications from temporary orders, and rolling production needs from materials requiring small-batch assembly validation before volume increases."
      },
      {
        "eyebrow": "Build a phased material plan, not a price bet",
        "title": "Build a phased material plan, not a price bet",
        "text": "One day of market data cannot support a broad price or industry-demand forecast. Viking supplies AGM rolls and sheets; thickness, width, sheet dimensions, packaging, available batch documentation and phased deliveries can be discussed for the project. Align quantities with production and delivery schedules. Any supply or quotation arrangement requires confirmation against actual specifications and project conditions."
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "Roll vs Sheet",
      "title": "Choose the supply format according to production workflow",
      "items": [
        [
          "AGM separator rolls",
          "Rolls are suitable for continuous production, further slitting and in-house cutting before assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "Finished AGM separator roll"
        ],
        [
          "AGM separator sheets",
          "Sheets are convenient for direct assembly, small batches, sample review and customized battery models.",
          "/images/sheets1-900.webp",
          "AGM separator sheets"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "Buyer Checklist",
      "title": "Build a phased material plan, not a price bet",
      "text": "Share your production schedule, AGM dimensions and phased quantities to request samples and a specification match, and discuss a supply and quotation plan for actual consumption.",
      "items": [
        "Confirmed orders, consumption and delivery schedule",
        "Raw material, in-transit and finished-goods coverage",
        "Payment terms, collections and other material payments",
        "AGM specifications, batch changes and proposed split deliveries"
      ]
    },
    "related": {
      "eyebrow": "Related Pages",
      "title": "Continue with product and quality details",
      "items": [
        [
          "Why One Passing Test Does Not Prove an AGM Separator Is Ready for Volume Production",
          "/blog/agm-separator-batch-consistency-and-process-control/"
        ],
        [
          "AGM Separator Manufacturing: Production, Quality Control and Reliable Delivery",
          "/blog/agm-separator-manufacturing-quality-delivery/"
        ],
        [
          "Lead-Acid Battery Exports Recovered in May. Is Your AGM Separator Supply Ready?",
          "/blog/agm-separator-export-supply-readiness/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "Inquiry",
      "title": "Request a Sample & Specification Match",
      "text": "Share your production schedule, AGM dimensions and phased quantities to request samples and a specification match, and discuss a supply and quotation plan for actual consumption.",
      "checklist": [
        "Confirmed orders, consumption and delivery schedule",
        "Raw material, in-transit and finished-goods coverage",
        "Payment terms, collections and other material payments",
        "AGM specifications, batch changes and proposed split deliveries"
      ],
      "fields": {
        "name": "Name",
        "company": "Company",
        "email": "Email",
        "country": "Country",
        "application": "Battery Application",
        "message": "Message"
      },
      "placeholders": {
        "message": "Share your production schedule, AGM dimensions and phased quantities to request samples and a specification match, and discuss a supply and quotation plan for actual consumption."
      },
      "submit": "Send Inquiry",
      "submitting": "Sending...",
      "required": "Please complete all required fields before submitting.",
      "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
      "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "footer": {
      "description": "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      "wechat": "Official WeChat account",
      "mobile": "Mobile website"
    },
    "references": {
      "eyebrow": "Public source and scope",
      "title": "Build a phased material plan, not a price bet",
      "text": "Yangtze Nonferrous market commentary dated 29 September 2026, reviewed on 24 October 2026. Price and restocking descriptions are attributed to that outlet. Its published page does not give a representative survey sample or method; do not treat it as an industry-wide statistic, a current price or a forecast. The operating framework is editorial guidance, not proof of Viking inventory, capacity or delivery commitments. AI illustration, not a real warehouse photograph.",
      "items": [
        [
          "Yangtze Nonferrous — 2026-09-29",
          "https://pb.ccmn.cn/news/ZX018/202609/f39296a023984b088d8302eee0da446b.html"
        ]
      ]
    }
  },
  "zh": {
    "nav": {
      "company": "公司",
      "products": "产品",
      "applications": "应用",
      "quality": "质量",
      "resources": "资料",
      "contact": "联系"
    },
    "language": "EN",
    "homePath": "/zh/",
    "languagePath": "/blog/lead-premium-battery-demand-based-restocking/",
    "brandName": "湖北维京科技有限公司",
    "quote": "获取报价",
    "hero": {
      "eyebrow": "先看清市场快照的日期",
      "title": "铅现货升水，蓄企为何仍谨慎补库？先看订单、库存与现金流",
      "subtitle": "2026 年 9 月的一则铅市快照，说明价格偏强与材料采购谨慎可以并存。AGM 供货计划仍应围绕规格与实际排产需求制定。",
      "primary": "索取 AGM 隔板指南",
      "secondary": "发送电池应用信息",
      "image": {
        "src": "/images/articles/lead-premium-restocking-hero-1600.webp",
        "alt": "AI 示意图: 铅现货升水，蓄企为何仍谨慎补库？先看订单、库存与现金流",
        "width": 1600,
        "height": 1200,
        "caption": "AI 示意图"
      }
    },
    "intro": [
      "铅价回答今天材料有多贵，库存覆盖则追问多买的材料何时变成订单和回款。确定 AGM 数量前，应把这两个问题分开。"
    ],
    "sections": [
      {
        "eyebrow": "先看清市场快照的日期",
        "title": "先看清市场快照的日期",
        "text": "长江有色于 2026 年 9 月 29 日报道，长江现货 1# 铅均价为 16,325 元／吨，对沪铅 2611 合约升水约 60 元／吨。同篇评论描述备货意愿边际转弱、部分下游蓄企主要按刚需购买。这是历史市场快照，不是当前报价，也不是所有电池厂商的统计结论。"
      },
      {
        "eyebrow": "现货升水不是终端需求指标",
        "title": "现货升水不是终端需求指标",
        "text": "现货升水表示现货价格高于所比较的期货基准，反映的是价差关系，不等于终端需求强度。订单可见度、成品库存和营运资金可能让企业在相同价格信号下作出不同采购决定；多买的材料仍需转为生产、交付与回款。"
      },
      {
        "eyebrow": "分开核算三本经营账",
        "title": "分开核算三本经营账",
        "text": "订单账看排产需求、交付计划和客户订单可见度；库存账包括铅锭或铅膏、在途、成品电池及已覆盖生产周期；现金流账看采购资金、账期、回款与其他材料付款。这三本账不能互相替代，价格不能代替订单或资金安排。"
      },
      {
        "eyebrow": "按需补库是在权衡风险",
        "title": "按需补库是在权衡风险",
        "text": "刚需采购并不意味着始终少买，而是让覆盖周期贴近实际消耗：订单清晰时按计划补充，可见度减弱时避免库存跑在订单前面。这是经营评估框架，不是从报道得出的统一结论。供应商可沟通稳定规格、分批数量与交付窗口，不应假设涨价必然带来集中采购。"
      },
      {
        "eyebrow": "AGM 隔板库存要单独判断",
        "title": "AGM 隔板库存要单独判断",
        "text": "AGM 隔板与铅在材料成本中的位置不同，铅升水不能直接决定隔板库存目标。应评估规格变更、批次切换和资金占用，区分稳定消耗规格与临时订单需求，以及可滚动排产材料和放量前需小批量装配验证的材料。"
      },
      {
        "eyebrow": "制定分批材料计划，而非押注价格",
        "title": "制定分批材料计划，而非押注价格",
        "text": "一天的行情不能支持全面的价格或行业需求预测。维京供应 AGM 卷材与片材，可按项目沟通厚度、宽度、片材尺寸、包装、可提供批次资料及分批交付。数量应与排产和交付对齐，具体供货与报价安排仍需结合实际规格及项目条件确认。"
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "卷材与片材",
      "title": "根据生产流程选择供应形式",
      "items": [
        [
          "AGM 隔板卷材",
          "卷材适合连续生产、进一步分切以及装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板成品卷"
        ],
        [
          "AGM 隔板片材",
          "片材适合直接装配、小批量需求、样品评估和定制电池型号。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "买家清单",
      "title": "制定分批材料计划，而非押注价格",
      "text": "请提供排产计划、AGM 尺寸和分批数量，申请样品与规格匹配，并按实际消耗沟通供货与报价方案。",
      "items": [
        "已确认订单、消耗与交付计划",
        "原料、在途及成品覆盖周期",
        "付款账期、回款与其他材料付款",
        "AGM 规格、批次变更与拟定分批数量"
      ]
    },
    "related": {
      "eyebrow": "相关页面",
      "title": "继续查看产品和质量信息",
      "items": [
        [
          "为什么单次检测合格，不等于 AGM 隔板适合批量生产？",
          "/zh/blog/agm-separator-batch-consistency-and-process-control/"
        ],
        [
          "湖北维京 AGM 隔板：生产、检测与稳定交付",
          "/zh/blog/agm-separator-manufacturing-quality-delivery/"
        ],
        [
          "海外销量回升了，AGM 隔板配套跟得上吗？",
          "/zh/blog/agm-separator-export-supply-readiness/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "询盘",
      "title": "申请样品与规格匹配",
      "text": "请提供排产计划、AGM 尺寸和分批数量，申请样品与规格匹配，并按实际消耗沟通供货与报价方案。",
      "checklist": [
        "已确认订单、消耗与交付计划",
        "原料、在途及成品覆盖周期",
        "付款账期、回款与其他材料付款",
        "AGM 规格、批次变更与拟定分批数量"
      ],
      "fields": {
        "name": "姓名",
        "company": "公司",
        "email": "邮箱",
        "country": "国家/地区",
        "application": "电池应用",
        "message": "留言"
      },
      "placeholders": {
        "message": "请提供排产计划、AGM 尺寸和分批数量，申请样品与规格匹配，并按实际消耗沟通供货与报价方案。"
      },
      "submit": "发送询盘",
      "submitting": "发送中...",
      "required": "请先填写所有必填字段。",
      "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
      "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "footer": {
      "description": "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      "wechat": "官方微信公众号",
      "mobile": "移动官网"
    },
    "references": {
      "eyebrow": "公开来源与边界",
      "title": "制定分批材料计划，而非押注价格",
      "text": "来源为长江有色 2026 年 9 月 29 日市场评论，2026 年 10 月 24 日核对。价格和补库描述均归因于该媒体；公开页未给出代表性调查样本或方法，不作为全行业统计、当前价格或预测。经营框架为文章建议，不证明维京库存、产能或交付承诺。AI 配图不是仓库实拍。",
      "items": [
        [
          "Yangtze Nonferrous — 2026-09-29",
          "https://pb.ccmn.cn/news/ZX018/202609/f39296a023984b088d8302eee0da446b.html"
        ]
      ]
    }
  }
} as const;

const agmAcidVolumeWetOutCopy = {
  "en": {
    "nav": {
      "company": "Company",
      "products": "Products",
      "applications": "Applications",
      "quality": "Quality",
      "resources": "Resources",
      "contact": "Contact"
    },
    "language": "中文",
    "homePath": "/",
    "languagePath": "/zh/blog/agm-battery-acid-volume-wet-out-uniformity/",
    "brandName": "Hubei Viking Technology Co., Ltd.",
    "quote": "Request a Quote",
    "hero": {
      "eyebrow": "One quantity cannot answer two questions",
      "title": "AGM Battery Acid Volume and Wet-Out Uniformity Need Separate Checks",
      "subtitle": "Check acid dose, filling process and wet-out results separately, then interpret them together under the same battery structure, process and observation conditions.",
      "primary": "Ask for AGM Separator Guide",
      "secondary": "Send Your Battery Application",
      "image": {
        "src": "/images/articles/agm-acid-volume-wetout-hero-1600.webp",
        "alt": "AI-generated illustration: AGM Battery Acid Volume and Wet-Out Uniformity Need Separate Checks",
        "width": 1600,
        "height": 1200,
        "caption": "AI-generated illustration"
      }
    },
    "intro": [
      "A correct acid dose does not establish uniform internal wetting. Keep quantity, process and distribution evidence distinct so a filling trial answers the question being tested."
    ],
    "sections": [
      {
        "eyebrow": "One quantity cannot answer two questions",
        "title": "One quantity cannot answer two questions",
        "text": "Electrolyte must move through the glass-fiber separator and plate structure. Tall plate groups, indirect flow paths and trapped gas can complicate movement. Metering records show how much acid was delivered, but not its path, the speed of internal wetting or its distribution. Battery structure, separator characteristics and the actual filling process must be considered together."
      },
      {
        "eyebrow": "Keep three records for three purposes",
        "title": "Keep three records for three purposes",
        "text": "Acid-volume records compare delivered dose with the process setting; they do not demonstrate uniformity. Process records capture filling time, equipment program, conditions, abnormal pauses and vacuum stages where used; a completed program or shorter time does not prove full wet-out. Wet-out results require a manufacturer-agreed method under comparable plate-group, acid and observation conditions, documenting different areas and dry or dark spots. Design and production teams define acceptance criteria; this is not a universal test standard."
      },
      {
        "eyebrow": "Attribute the separator example to its supplier",
        "title": "Attribute the separator example to its supplier",
        "text": "H&V describes PowerFill as AGM with surface channels supporting acid flow and trapped-gas release. It reports faster filling, more uniform distribution and fewer dry or dark spots than standard AGM in its own filling tests. These are H&V product statements and reported results, not Viking findings or evidence that every separator performs the same way. The public description alone is not a complete project-specific test protocol."
      },
      {
        "eyebrow": "Control the variable being evaluated",
        "title": "Control the variable being evaluated",
        "text": "For a material trial, use plate groups of the same batch and structure where practical, and keep acid formulation, equipment settings and subsequent rest conditions consistent. When testing a separator surface structure, avoid simultaneous material or equipment changes. When adjusting the process, hold the separator batch fixed. Compare both filling records and wet-out results to reduce incorrect attribution."
      },
      {
        "eyebrow": "Record when and how wet-out is observed",
        "title": "Record when and how wet-out is observed",
        "text": "Record observation time and assessment method. Wet-out immediately after filling can differ from the condition after a defined rest or later production step. If using photographs, area records or an established line method, keep sampling positions and observation conditions consistent. The battery manufacturer defines acceptance against product requirements; no single observation method applies to every project."
      },
      {
        "eyebrow": "Bring the evidence back to the battery design",
        "title": "Bring the evidence back to the battery design",
        "text": "Validate findings within the intended battery structure and process. A standalone absorption value, one fill record or a supplier statement cannot independently establish improved complete-battery capacity, service life or performance. If dose meets the setting but wet-out differs, review the program, gas-release path, plate-group structure and separator surface; if process records changed, first confirm comparability. Final decisions follow the manufacturer’s design validation and quality requirements."
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "Roll vs Sheet",
      "title": "Choose the supply format according to production workflow",
      "items": [
        [
          "AGM separator rolls",
          "Rolls are suitable for continuous production, further slitting and in-house cutting before assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "Finished AGM separator roll"
        ],
        [
          "AGM separator sheets",
          "Sheets are convenient for direct assembly, small batches, sample review and customized battery models.",
          "/images/sheets1-900.webp",
          "AGM separator sheets"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "Buyer Checklist",
      "title": "Bring the evidence back to the battery design",
      "text": "Share your plate-group structure, separator dimensions and current filling conditions to request a sample and specification match, and discuss priorities for a controlled separator trial.",
      "items": [
        "Plate-group structure, dimensions and batch",
        "Acid formulation, equipment settings and vacuum stages if used",
        "Delivered dose, filling time and abnormal pauses",
        "Observation time, sample locations, method and acceptance criteria"
      ]
    },
    "related": {
      "eyebrow": "Related Pages",
      "title": "Continue with product and quality details",
      "items": [
        [
          "Will an AGM Separator Still Hold Pressure After Filling and Cycling?",
          "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"
        ],
        [
          "Key Technical Parameters of AGM Separator",
          "/blog/key-technical-parameters-of-agm-separator/"
        ],
        [
          "Why One Passing Test Does Not Prove an AGM Separator Is Ready for Volume Production",
          "/blog/agm-separator-batch-consistency-and-process-control/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "Inquiry",
      "title": "Request a Sample & Specification Match",
      "text": "Share your plate-group structure, separator dimensions and current filling conditions to request a sample and specification match, and discuss priorities for a controlled separator trial.",
      "checklist": [
        "Plate-group structure, dimensions and batch",
        "Acid formulation, equipment settings and vacuum stages if used",
        "Delivered dose, filling time and abnormal pauses",
        "Observation time, sample locations, method and acceptance criteria"
      ],
      "fields": {
        "name": "Name",
        "company": "Company",
        "email": "Email",
        "country": "Country",
        "application": "Battery Application",
        "message": "Message"
      },
      "placeholders": {
        "message": "Share your plate-group structure, separator dimensions and current filling conditions to request a sample and specification match, and discuss priorities for a controlled separator trial."
      },
      "submit": "Send Inquiry",
      "submitting": "Sending...",
      "required": "Please complete all required fields before submitting.",
      "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
      "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "footer": {
      "description": "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      "wechat": "Official WeChat account",
      "mobile": "Mobile website"
    },
    "references": {
      "eyebrow": "Public source and scope",
      "title": "Bring the evidence back to the battery design",
      "text": "H&V PowerFill product page reviewed on 27 October 2026. Surface-channel and filling-performance descriptions are attributed to H&V, not independently verified Viking results or Viking product capabilities. Controlled comparisons and observation records are an editorial framework, not a uniform industry standard. AI hero: conceptual, not test evidence.",
      "items": [
        [
          "H&V — PowerFill",
          "https://www.hollingsworth-vose.com/powerfill/"
        ]
      ]
    }
  },
  "zh": {
    "nav": {
      "company": "公司",
      "products": "产品",
      "applications": "应用",
      "quality": "质量",
      "resources": "资料",
      "contact": "联系"
    },
    "language": "EN",
    "homePath": "/zh/",
    "languagePath": "/blog/agm-battery-acid-volume-wet-out-uniformity/",
    "brandName": "湖北维京科技有限公司",
    "quote": "获取报价",
    "hero": {
      "eyebrow": "一个数量不能回答两个问题",
      "title": "AGM 电池注酸量与浸润均匀性，为什么要分开检查？",
      "subtitle": "注酸定量、填充过程与浸润结果应分别记录，再在相同电池结构、工艺及观察条件下结合判断。",
      "primary": "索取 AGM 隔板指南",
      "secondary": "发送电池应用信息",
      "image": {
        "src": "/images/articles/agm-acid-volume-wetout-hero-1600.webp",
        "alt": "AI 示意图: AGM 电池注酸量与浸润均匀性，为什么要分开检查？",
        "width": 1600,
        "height": 1200,
        "caption": "AI 示意图"
      }
    },
    "intro": [
      "注酸定量符合设定，仍不能证明内部浸润均匀。把数量、过程与分布证据分开，才能让注酸试验回答真正需要验证的问题。"
    ],
    "sections": [
      {
        "eyebrow": "一个数量不能回答两个问题",
        "title": "一个数量不能回答两个问题",
        "text": "电解液需穿过玻纤隔板与极板结构。极群较高、流路曲折或气体不易排出时，内部迁移会更复杂。计量记录能够说明注入多少酸，但不能完整描述路径、内部浸润速度或分布；电池结构、隔板特征与实际注酸过程应共同考虑。"
      },
      {
        "eyebrow": "三类记录对应三种用途",
        "title": "三类记录对应三种用途",
        "text": "注酸量记录用于比较实际定量与工艺设定，不能直接证明分布均匀。过程记录包括时间、设备程序、条件、异常停顿及适用时的真空阶段；程序完成或用时缩短不等于浸润充分。浸润结果须采用电池制造商约定的方法，在可比极群、酸配方和观察条件下记录不同区域及干斑、暗斑。验收标准由设计和生产团队制定，不是通用试验标准。"
      },
      {
        "eyebrow": "隔板案例要明确供应商归因",
        "title": "隔板案例要明确供应商归因",
        "text": "H&V 将 PowerFill 描述为带表面通道的 AGM，旨在支持酸液流动和滞留气体排出；并称其自身填充试验相较标准 AGM 用时更短、分布更均匀、干斑或暗斑更少。这些是 H&V 的产品表述及报告结果，不是维京结论，也不能推广到所有隔板。仅凭公开说明，无法重建具体项目的完整试验方案。"
      },
      {
        "eyebrow": "控制正在评价的变量",
        "title": "控制正在评价的变量",
        "text": "材料试验可尽量采用同批、同结构极群，保持酸配方、设备设定及后续静置条件一致。评价隔板表面结构时，避免同时改变其他材料或设备参数；调整工艺时，固定隔板批次。应同时比较注酸过程与浸润结果，减少把改善归因于错误变量的风险。"
      },
      {
        "eyebrow": "记录何时、如何观察浸润",
        "title": "记录何时、如何观察浸润",
        "text": "记录观察时点及评估方法。注酸刚结束时的状态，可能与规定静置后或后续工序时不同。采用照片、分区记录或既有产线方法时，应保持取样位置和观察条件一致。由电池制造商按产品要求制定验收条件，不能把某项目方法写成所有项目的要求。"
      },
      {
        "eyebrow": "把证据放回电池设计中验证",
        "title": "把证据放回电池设计中验证",
        "text": "结果需放回目标电池结构与工艺验证。单项吸液值、一次注酸记录或供应商说法，不能独立证明整电池容量、寿命或性能改善。定量符合设定而局部浸润不同，应审阅设备程序、排气路径、极群结构和隔板表面；过程记录也改变时，先确认条件是否可比。最终决定应遵循制造商设计验证与质量要求。"
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "卷材与片材",
      "title": "根据生产流程选择供应形式",
      "items": [
        [
          "AGM 隔板卷材",
          "卷材适合连续生产、进一步分切以及装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板成品卷"
        ],
        [
          "AGM 隔板片材",
          "片材适合直接装配、小批量需求、样品评估和定制电池型号。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "买家清单",
      "title": "把证据放回电池设计中验证",
      "text": "请提供极群结构、隔板尺寸和当前注酸条件，申请样品与规格匹配，沟通隔板受控试验的优先核查项。",
      "items": [
        "极群结构、尺寸与批次",
        "酸配方、设备设定及适用时的真空阶段",
        "实际注酸量、时间与异常停顿",
        "观察时点、取样区域、方法及验收条件"
      ]
    },
    "related": {
      "eyebrow": "相关页面",
      "title": "继续查看产品和质量信息",
      "items": [
        [
          "隔板装进去没问题，循环以后还能保持压力吗？",
          "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"
        ],
        [
          "AGM 隔板关键技术参数",
          "/zh/blog/key-technical-parameters-of-agm-separator/"
        ],
        [
          "为什么单次检测合格，不等于 AGM 隔板适合批量生产？",
          "/zh/blog/agm-separator-batch-consistency-and-process-control/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "询盘",
      "title": "申请样品与规格匹配",
      "text": "请提供极群结构、隔板尺寸和当前注酸条件，申请样品与规格匹配，沟通隔板受控试验的优先核查项。",
      "checklist": [
        "极群结构、尺寸与批次",
        "酸配方、设备设定及适用时的真空阶段",
        "实际注酸量、时间与异常停顿",
        "观察时点、取样区域、方法及验收条件"
      ],
      "fields": {
        "name": "姓名",
        "company": "公司",
        "email": "邮箱",
        "country": "国家/地区",
        "application": "电池应用",
        "message": "留言"
      },
      "placeholders": {
        "message": "请提供极群结构、隔板尺寸和当前注酸条件，申请样品与规格匹配，沟通隔板受控试验的优先核查项。"
      },
      "submit": "发送询盘",
      "submitting": "发送中...",
      "required": "请先填写所有必填字段。",
      "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
      "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "footer": {
      "description": "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      "wechat": "官方微信公众号",
      "mobile": "移动官网"
    },
    "references": {
      "eyebrow": "公开来源与边界",
      "title": "把证据放回电池设计中验证",
      "text": "2026 年 10 月 27 日核对 H&V PowerFill 产品页。表面通道与填充表现均归因于 H&V，不是维京独立验证结果或产品能力。受控比较与观察记录属于文章建议框架，不是统一行业标准。AI 主图为概念示意，不是测试证据。",
      "items": [
        [
          "H&V — PowerFill",
          "https://www.hollingsworth-vose.com/powerfill/"
        ]
      ]
    }
  }
} as const;

const earlyLeadAcidElectrodeFormationCopy = {
  "en": {
    "nav": {
      "company": "Company",
      "products": "Products",
      "applications": "Applications",
      "quality": "Quality",
      "resources": "Resources",
      "contact": "Contact"
    },
    "language": "中文",
    "homePath": "/",
    "languagePath": "/zh/blog/early-lead-acid-battery-electrode-formation/",
    "brandName": "Hubei Viking Technology Co., Ltd.",
    "quote": "Request a Quote",
    "hero": {
      "eyebrow": "Planté demonstrated storage, but formation was slow",
      "title": "Rechargeable Was Only the Beginning: Why Early Lead–Acid Batteries Took So Long to Make",
      "subtitle": "From Planté formation cycles to Faure pasted plates, electrode manufacturing required more than rechargeability. Modern glass-fiber structures also need clear functional boundaries and validation.",
      "primary": "Ask for AGM Separator Guide",
      "secondary": "Send Your Battery Application",
      "image": {
        "src": "/images/articles/early-lead-acid-formation-hero-1600.webp",
        "alt": "AI-generated illustration: Rechargeable Was Only the Beginning: Why Early Lead–Acid Batteries Took So Long to Make",
        "width": 1600,
        "height": 1200,
        "caption": "AI-generated illustration"
      }
    },
    "intro": [
      "The Science Museum Group holds a Planté battery from about 1860 with 20 cells switchable between series and parallel for experimental and laboratory use. Early Planté plates needed repeated charging and discharging to develop active surface material. Rechargeability had been demonstrated; producing practical electrodes efficiently remained a manufacturing challenge."
    ],
    "sections": [
      {
        "eyebrow": "Planté demonstrated storage, but formation was slow",
        "title": "Planté demonstrated storage, but formation was slow",
        "text": "The Science Museum Group holds a Planté battery from about 1860 with 20 cells switchable between series and parallel for experimental and laboratory use. Early Planté plates needed repeated charging and discharging to develop active surface material. Rechargeability had been demonstrated; producing practical electrodes efficiently remained a manufacturing challenge."
      },
      {
        "eyebrow": "Faure put convertible material on the plate first",
        "title": "Faure put convertible material on the plate first",
        "text": "Nature reported on 19 May 1881 that Camille Faure coated lead sheets with red lead, Pb₃O₄, before electrical conversion. Two coated sheets were rolled with felt between them in dilute acid. Charging converted the coatings toward metallic lead at one electrode and lead dioxide at the other. This changed the formation route; electrical treatment was still required. The historical account is not a modern production specification."
      },
      {
        "eyebrow": "A promising structure still needed measurements",
        "title": "A promising structure still needed measurements",
        "text": "In Nature on 16 June 1881, William Thomson said his measurements of charge and discharge energy losses were not yet complete and discussed the influence of operating rates. A new construction can offer a useful manufacturing route, but performance still needs measurements under defined conditions. His account does not establish modern efficiency or test limits."
      },
      {
        "eyebrow": "GEM places glass fiber inside the negative electrode",
        "title": "GEM places glass fiber inside the negative electrode",
        "text": "ArcActive states that it jointly developed Glass Electrode Material (GEM) with H&V in 2024. Developer descriptions place a three-dimensional glass-fiber framework throughout the negative active material, replacing the conventional lead grid and supporting that material. Structural and performance statements belong to the developers and require review against the conditions of specific tests."
      },
      {
        "eyebrow": "An electrode framework is different from an AGM separator",
        "title": "An electrode framework is different from an AGM separator",
        "text": "GEM is described as part of the negative electrode. An AGM separator sits between positive and negative plates, separating electrodes, retaining electrolyte and providing an ion-conduction path. The felt between Faure’s early rolled plates should not be called modern AGM. Faure and GEM illustrate related questions about material placement and support; the sources do not establish direct technical inheritance."
      },
      {
        "eyebrow": "Define the structure before choosing validation",
        "title": "Define the structure before choosing validation",
        "text": "For an AGM discussion, identify battery design, separator position, target thickness, dimensions, sample state and compression or electrolyte conditions. Separate material measurements from complete-battery validation. Viking did not participate in GEM development or supply and has not independently verified its stated performance. No developer claim is presented as a Viking specification or guarantee."
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "Roll vs Sheet",
      "title": "Choose the supply format according to production workflow",
      "items": [
        [
          "AGM separator rolls",
          "Rolls are suitable for continuous production, further slitting and in-house cutting before assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "Finished AGM separator roll"
        ],
        [
          "AGM separator sheets",
          "Sheets are convenient for direct assembly, small batches, sample review and customized battery models.",
          "/images/sheets1-900.webp",
          "AGM separator sheets"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "Buyer Checklist",
      "title": "Define the structure before choosing validation",
      "text": "Share your battery design, separator dimensions and intended test conditions to discuss AGM structure evaluation and a sample specification match.",
      "items": [
        "Battery design and material position",
        "Separator thickness, width and roll or sheet dimensions",
        "Sample state, pressure and electrolyte conditions",
        "Material tests and complete-battery validation"
      ]
    },
    "related": {
      "eyebrow": "Related Pages",
      "title": "Continue with product and quality details",
      "items": [
        [
          "How China’s Earliest Lead-Acid Batteries Were Made",
          "/blog/how-chinas-earliest-lead-acid-batteries-were-made/"
        ],
        [
          "The Battery’s ‘Third Pole’: What an AGM Separator Actually Does",
          "/blog/agm-separator-third-pole-explained/"
        ],
        [
          "What Is AGM Separator?",
          "/blog/what-is-agm-separator/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "Inquiry",
      "title": "Request a Sample & Specification Match",
      "text": "Share your battery design, separator dimensions and intended test conditions to discuss AGM structure evaluation and a sample specification match.",
      "checklist": [
        "Battery design and material position",
        "Separator thickness, width and roll or sheet dimensions",
        "Sample state, pressure and electrolyte conditions",
        "Material tests and complete-battery validation"
      ],
      "fields": {
        "name": "Name",
        "company": "Company",
        "email": "Email",
        "country": "Country",
        "application": "Battery Application",
        "message": "Message"
      },
      "placeholders": {
        "message": "Share your battery design, separator dimensions and intended test conditions to discuss AGM structure evaluation and a sample specification match."
      },
      "submit": "Send Inquiry",
      "submitting": "Sending...",
      "required": "Please complete all required fields before submitting.",
      "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
      "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "footer": {
      "description": "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      "wechat": "Official WeChat account",
      "mobile": "Mobile website"
    },
    "references": {
      "eyebrow": "Public source and scope",
      "title": "Define the structure before choosing validation",
      "text": "Sources reviewed on 24 October 2026: museum collection record, public Nature accounts dated 19 May and 16 June 1881, and ArcActive/H&V developer materials. The illustration is conceptual, not a historical photograph, a product reconstruction or test evidence.",
      "items": [
        [
          "Science Museum Group — Planté, c. 1860",
          "https://collection.sciencemuseumgroup.org.uk/objects/co36401/one-of-the-first-rechargeable-batteries-about-1860-lead-acid-rechargeable-batteries"
        ],
        [
          "Nature — 1881-05-19",
          "https://www.nature.com/articles/024068b0"
        ],
        [
          "Nature — William Thomson, 1881-06-16",
          "https://www.nature.com/articles/024137a0"
        ],
        [
          "ArcActive — GEM",
          "https://www.arcactive.com/technology"
        ],
        [
          "H&V — GEM",
          "https://www.hollingsworth-vose.com/industries/gem-lead-acid-battery-plate-alternative/"
        ]
      ]
    }
  },
  "zh": {
    "nav": {
      "company": "公司",
      "products": "产品",
      "applications": "应用",
      "quality": "质量",
      "resources": "资料",
      "contact": "联系"
    },
    "language": "EN",
    "homePath": "/zh/",
    "languagePath": "/blog/early-lead-acid-battery-electrode-formation/",
    "brandName": "湖北维京科技有限公司",
    "quote": "获取报价",
    "hero": {
      "eyebrow": "Planté 证明可储电，极板化成仍缓慢",
      "title": "能充电只是起点：早期铅酸电池为什么制造缓慢？",
      "subtitle": "从 Planté 反复化成到 Faure 涂膏极板，电极制造的难点不止于可充电。理解现代玻纤结构，也要先区分材料位置、支撑作用与验证条件。",
      "primary": "索取 AGM 隔板指南",
      "secondary": "发送电池应用信息",
      "image": {
        "src": "/images/articles/early-lead-acid-formation-hero-1600.webp",
        "alt": "AI 示意图: 能充电只是起点：早期铅酸电池为什么制造缓慢？",
        "width": 1600,
        "height": 1200,
        "caption": "AI 示意图"
      }
    },
    "intro": [
      "英国科学博物馆集团收藏一套约 1860 年的 Planté 电池，由 20 个单体组成，可切换串联或并联，用于实验与实验室工作。早期 Planté 极板需要反复充放电，逐渐形成表面活性材料。可充电已被证明，如何高效制成实用电极仍是制造难题。"
    ],
    "sections": [
      {
        "eyebrow": "Planté 证明可储电，极板化成仍缓慢",
        "title": "Planté 证明可储电，极板化成仍缓慢",
        "text": "英国科学博物馆集团收藏一套约 1860 年的 Planté 电池，由 20 个单体组成，可切换串联或并联，用于实验与实验室工作。早期 Planté 极板需要反复充放电，逐渐形成表面活性材料。可充电已被证明，如何高效制成实用电极仍是制造难题。"
      },
      {
        "eyebrow": "Faure 先把可转化材料放到极板上",
        "title": "Faure 先把可转化材料放到极板上",
        "text": "1881 年 5 月 19 日《Nature》报道，Camille Faure 在铅片表面涂覆红丹（Pb₃O₄），再进行电化学转化。两片涂覆铅片以毛毡隔开卷成螺旋，浸入稀酸。充电使两侧涂层分别向金属铅和二氧化铅转化。这改变了化成路径，但仍需电处理；不能把这份历史记录当作现代生产规范。"
      },
      {
        "eyebrow": "新结构仍需测量来验证",
        "title": "新结构仍需测量来验证",
        "text": "William Thomson 在 1881 年 6 月 16 日《Nature》中指出，确定充放电能量损失所需的完整测量尚未完成，并讨论运行速率的影响。新结构可以带来有价值的制造路线，但性能仍需在明确条件下测量。这段历史描述不能作为现代效率指标或试验限值。"
      },
      {
        "eyebrow": "GEM 把玻纤放入负极活性材料内部",
        "title": "GEM 把玻纤放入负极活性材料内部",
        "text": "ArcActive 表示，其与 H&V 于 2024 年共同开发玻璃电极材料 GEM。开发方将其描述为贯穿负极活性材料的三维玻纤骨架，用于替代传统铅栅并支撑负极材料。结构与性能说法归属于开发方，需要结合具体试验条件审阅。"
      },
      {
        "eyebrow": "电极骨架与 AGM 隔板位置不同",
        "title": "电极骨架与 AGM 隔板位置不同",
        "text": "GEM 被描述为负极结构的一部分；AGM 隔板则位于正负极板之间，承担电极隔离、保持电解液和提供离子传导通路的作用。Faure 早期卷绕极板间的毛毡不能称为现代 AGM。两种方案体现了不同时期对材料布置与支撑的思考，现有来源不能证明直接技术传承。"
      },
      {
        "eyebrow": "先明确结构，再确定验证条件",
        "title": "先明确结构，再确定验证条件",
        "text": "讨论 AGM 时，先确认电池设计、隔板位置、目标厚度与尺寸、样品状态，以及压力或电解液条件，区分材料检测与整电池验证。维京未参与 GEM 开发或供应，也未独立验证其所述性能。本文不将开发方说法作为维京规格或性能保证。"
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "卷材与片材",
      "title": "根据生产流程选择供应形式",
      "items": [
        [
          "AGM 隔板卷材",
          "卷材适合连续生产、进一步分切以及装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板成品卷"
        ],
        [
          "AGM 隔板片材",
          "片材适合直接装配、小批量需求、样品评估和定制电池型号。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "买家清单",
      "title": "先明确结构，再确定验证条件",
      "text": "请提供电池设计、隔板尺寸与拟定测试条件，沟通 AGM 结构评价及样品规格匹配。",
      "items": [
        "电池设计与材料所在位置",
        "隔板厚度、宽度及卷材或片材尺寸",
        "样品状态、压力与电解液条件",
        "材料检测与整电池验证安排"
      ]
    },
    "related": {
      "eyebrow": "相关页面",
      "title": "继续查看产品和质量信息",
      "items": [
        [
          "中国早期铅酸蓄电池是怎样制造的？",
          "/zh/blog/how-chinas-earliest-lead-acid-batteries-were-made/"
        ],
        [
          "电池的“第三极”没有端子：AGM 隔板到底在做什么？",
          "/zh/blog/agm-separator-third-pole-explained/"
        ],
        [
          "什么是 AGM 隔板？",
          "/zh/blog/what-is-agm-separator/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "询盘",
      "title": "申请样品与规格匹配",
      "text": "请提供电池设计、隔板尺寸与拟定测试条件，沟通 AGM 结构评价及样品规格匹配。",
      "checklist": [
        "电池设计与材料所在位置",
        "隔板厚度、宽度及卷材或片材尺寸",
        "样品状态、压力与电解液条件",
        "材料检测与整电池验证安排"
      ],
      "fields": {
        "name": "姓名",
        "company": "公司",
        "email": "邮箱",
        "country": "国家/地区",
        "application": "电池应用",
        "message": "留言"
      },
      "placeholders": {
        "message": "请提供电池设计、隔板尺寸与拟定测试条件，沟通 AGM 结构评价及样品规格匹配。"
      },
      "submit": "发送询盘",
      "submitting": "发送中...",
      "required": "请先填写所有必填字段。",
      "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
      "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "footer": {
      "description": "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      "wechat": "官方微信公众号",
      "mobile": "移动官网"
    },
    "references": {
      "eyebrow": "公开来源与边界",
      "title": "先明确结构，再确定验证条件",
      "text": "2026 年 10 月 24 日核对博物馆藏品记录、1881 年 5 月 19 日及 6 月 16 日《Nature》公开报道，以及 ArcActive/H&V 开发方资料。配图为概念示意，不是历史照片、产品复原或测试证据。",
      "items": [
        [
          "Science Museum Group — Planté, c. 1860",
          "https://collection.sciencemuseumgroup.org.uk/objects/co36401/one-of-the-first-rechargeable-batteries-about-1860-lead-acid-rechargeable-batteries"
        ],
        [
          "Nature — 1881-05-19",
          "https://www.nature.com/articles/024068b0"
        ],
        [
          "Nature — William Thomson, 1881-06-16",
          "https://www.nature.com/articles/024137a0"
        ],
        [
          "ArcActive — GEM",
          "https://www.arcactive.com/technology"
        ],
        [
          "H&V — GEM",
          "https://www.hollingsworth-vose.com/industries/gem-lead-acid-battery-plate-alternative/"
        ]
      ]
    }
  }
} as const;

const agmSeparatorPressureChartsCopy = {
  "en": {
    "nav": {
      "company": "Company",
      "products": "Products",
      "applications": "Applications",
      "quality": "Quality",
      "resources": "Resources",
      "contact": "Contact"
    },
    "language": "中文",
    "homePath": "/",
    "languagePath": "/zh/blog/reading-agm-separator-pressure-charts/",
    "brandName": "Hubei Viking Technology Co., Ltd.",
    "quote": "Request a Quote",
    "hero": {
      "eyebrow": "Identify the plotted data",
      "title": "Reading AGM Separator Pressure Charts: Endpoints, Guide Lines, and Measured Curves",
      "subtitle": "Two brochure endpoints and a visual guide do not constitute a continuously measured pressure curve. Confirm the data and test conditions before comparing AGM separators.",
      "primary": "Ask for AGM Separator Guide",
      "secondary": "Send Your Battery Application",
      "image": {
        "src": "/images/articles/agm-pressure-charts-hero-1600.webp",
        "alt": "AI-generated illustration: Reading AGM Separator Pressure Charts: Endpoints, Guide Lines, and Measured Curves",
        "width": 1600,
        "height": 1200,
        "caption": "AI-generated illustration"
      }
    },
    "intro": [
      "The two endpoints alone cannot establish thickness or recovery at intermediate pressures, reconstruct complete loading and unloading curves, or predict full-battery service life through two-point interpolation."
    ],
    "sections": [
      {
        "eyebrow": "Identify the plotted data",
        "title": "Identify the plotted data",
        "text": "The AlphaBeta automotive start-stop AGM separator product page presents brochure nominal values alongside design values. Its compression and recovery chart displays approximate values read from the printed brochure at 10 kPa and 100 kPa."
      },
      {
        "eyebrow": "Read the connecting line correctly",
        "title": "Read the connecting line correctly",
        "text": "The straight line between the two displayed points is a visual guide. It does not represent measurements at intermediate pressures. Review endpoint charts separately from continuous measurement records."
      },
      {
        "eyebrow": "Do not interpolate performance",
        "title": "Do not interpolate performance",
        "text": "The two endpoints alone cannot establish thickness or recovery at intermediate pressures, reconstruct complete loading and unloading curves, or predict full-battery service life through two-point interpolation."
      },
      {
        "eyebrow": "Keep endpoints separate from assembly requirements",
        "title": "Keep endpoints separate from assembly requirements",
        "text": "The 10 kPa and 100 kPa values are endpoints on this specific product page, not universal assembly-pressure standards. No intermediate measurement points are listed; this does not establish whether the company has performed other internal tests."
      },
      {
        "eyebrow": "Agree the comparison conditions",
        "title": "Agree the comparison conditions",
        "text": "First specify the target assembly pressure. Then confirm sample condition, loading or unloading process, measurement-point arrangement and repeat-measurement conditions. This is guidance for technical communication, not a uniform industry test standard; agree conditions for the sample and project."
      },
      {
        "eyebrow": "Keep the source in context",
        "title": "Keep the source in context",
        "text": "The parameters and chart description come from a corporate product page and information attributed there to its printed brochure. They are not an independent test report or a new-product announcement published this week. They are not Viking specifications or guaranteed performance."
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "Roll vs Sheet",
      "title": "Choose the supply format according to production workflow",
      "items": [
        [
          "AGM separator rolls",
          "Rolls are suitable for continuous production, further slitting and in-house cutting before assembly.",
          "/images/viking-finished-separator-roll-900.webp",
          "Finished AGM separator roll"
        ],
        [
          "AGM separator sheets",
          "Sheets are convenient for direct assembly, small batches, sample review and customized battery models.",
          "/images/sheets1-900.webp",
          "AGM separator sheets"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "Buyer Checklist",
      "title": "Agree the comparison conditions",
      "text": "First specify the target assembly pressure. Then confirm sample condition, loading or unloading process, measurement-point arrangement and repeat-measurement conditions. This is guidance for technical communication, not a uniform industry test standard; agree conditions for the sample and project.",
      "items": [
        "Target assembly pressure",
        "Sample condition and preparation",
        "Loading or unloading process",
        "Measurement points and repeat conditions"
      ]
    },
    "related": {
      "eyebrow": "Related Pages",
      "title": "Continue with product and quality details",
      "items": [
        [
          "Will an AGM Separator Still Hold Pressure After Filling and Cycling?",
          "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"
        ],
        [
          "Key Technical Parameters of AGM Separator",
          "/blog/key-technical-parameters-of-agm-separator/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "Inquiry",
      "title": "Request a Sample & Specification Match",
      "text": "Submit your target assembly pressure, separator dimensions and sample condition to discuss corresponding test conditions and a sample specification match.",
      "checklist": [
        "Target assembly pressure",
        "Sample condition and preparation",
        "Loading or unloading process",
        "Measurement points and repeat conditions"
      ],
      "fields": {
        "name": "Name",
        "company": "Company",
        "email": "Email",
        "country": "Country",
        "application": "Battery Application",
        "message": "Message"
      },
      "placeholders": {
        "message": "Submit your target assembly pressure, separator dimensions and sample condition to discuss corresponding test conditions and a sample specification match."
      },
      "submit": "Send Inquiry",
      "submitting": "Sending...",
      "required": "Please complete all required fields before submitting.",
      "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
      "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "footer": {
      "description": "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      "wechat": "Official WeChat account",
      "mobile": "Mobile website"
    },
    "references": {
      "eyebrow": "Public source and scope",
      "title": "Keep the source in context",
      "text": "Corporate product page reviewed on 24 October 2026; brochure attribution follows that page. The original printed brochure was not independently reviewed. No intermediate test data or battery-life conclusion is inferred.",
      "items": [
        [
          "AlphaBeta — Identify the plotted data",
          "https://agm-alphabeta.com/zh/products/start-stop/"
        ]
      ]
    }
  },
  "zh": {
    "nav": {
      "company": "公司",
      "products": "产品",
      "applications": "应用",
      "quality": "质量",
      "resources": "资料",
      "contact": "联系"
    },
    "language": "EN",
    "homePath": "/zh/",
    "languagePath": "/blog/reading-agm-separator-pressure-charts/",
    "brandName": "湖北维京科技有限公司",
    "quote": "获取报价",
    "hero": {
      "eyebrow": "先确认图中数据是什么",
      "title": "如何读懂 AGM 隔板压力图：端点、引导线与实测曲线",
      "subtitle": "两个手册端点加一条视觉引导线，并不构成连续实测压力曲线。比较 AGM 隔板前，应先确认数据含义与测试条件。",
      "primary": "索取 AGM 隔板指南",
      "secondary": "发送电池应用信息",
      "image": {
        "src": "/images/articles/agm-pressure-charts-hero-1600.webp",
        "alt": "AI 示意图: 如何读懂 AGM 隔板压力图：端点、引导线与实测曲线",
        "width": 1600,
        "height": 1200,
        "caption": "AI 示意图"
      }
    },
    "intro": [
      "仅凭这两个端点，不能确定中间压力下的厚度或回弹表现，不能重建完整加载与卸载曲线，也不能通过两点插值预测整电池使用寿命。"
    ],
    "sections": [
      {
        "eyebrow": "先确认图中数据是什么",
        "title": "先确认图中数据是什么",
        "text": "AlphaBeta 汽车启停 AGM 隔板产品页并列展示手册标称值与设计值。其压缩与回弹图展示从印刷版产品手册读取的 10 kPa 和 100 kPa 两个压力端点的近似值。"
      },
      {
        "eyebrow": "正确理解端点之间的连线",
        "title": "正确理解端点之间的连线",
        "text": "两端点之间的直线仅作视觉引导，不代表中间压力下的实测数据。阅读时，应将端点图与连续测量记录分别审阅。"
      },
      {
        "eyebrow": "不要用两点插值推断性能",
        "title": "不要用两点插值推断性能",
        "text": "仅凭这两个端点，不能确定中间压力下的厚度或回弹表现，不能重建完整加载与卸载曲线，也不能通过两点插值预测整电池使用寿命。"
      },
      {
        "eyebrow": "端点不等于通用装配要求",
        "title": "端点不等于通用装配要求",
        "text": "10 kPa 与 100 kPa 是这一具体产品页展示的端点，不是通用装配压力标准。页面未列出中间测量点，也不能据此判断该企业是否开展过其他内部测试。"
      },
      {
        "eyebrow": "先约定压力性能比较条件",
        "title": "先约定压力性能比较条件",
        "text": "技术沟通时，先明确目标装配压力，再确认样品状态、加载或卸载过程、测点安排及重复测量条件。这是图表解读与沟通建议，不是统一行业试验标准；测试条件应根据样品与双方约定确认。"
      },
      {
        "eyebrow": "把来源与证据边界说清楚",
        "title": "把来源与证据边界说清楚",
        "text": "参数与图表说明来自企业产品页及该页归因于印刷版产品手册的信息，不是独立测试报告，也不是本周发布的新品公告。这些信息不属于维京产品规格或性能保证。"
      }
    ],
    "parameters": [],
    "formats": {
      "eyebrow": "卷材与片材",
      "title": "根据生产流程选择供应形式",
      "items": [
        [
          "AGM 隔板卷材",
          "卷材适合连续生产、进一步分切以及装配前的厂内裁切。",
          "/images/viking-finished-separator-roll-900.webp",
          "AGM 隔板成品卷"
        ],
        [
          "AGM 隔板片材",
          "片材适合直接装配、小批量需求、样品评估和定制电池型号。",
          "/images/sheets1-900.webp",
          "AGM 隔板片材"
        ]
      ]
    },
    "checklist": {
      "eyebrow": "买家清单",
      "title": "先约定压力性能比较条件",
      "text": "技术沟通时，先明确目标装配压力，再确认样品状态、加载或卸载过程、测点安排及重复测量条件。这是图表解读与沟通建议，不是统一行业试验标准；测试条件应根据样品与双方约定确认。",
      "items": [
        "目标装配压力",
        "样品状态与准备方式",
        "加载或卸载过程",
        "测点安排与重复测量条件"
      ]
    },
    "related": {
      "eyebrow": "相关页面",
      "title": "继续查看产品和质量信息",
      "items": [
        [
          "隔板装进去没问题，循环以后还能保持压力吗？",
          "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/"
        ],
        [
          "AGM 隔板关键技术参数",
          "/zh/blog/key-technical-parameters-of-agm-separator/"
        ]
      ]
    },
    "inquiry": {
      "eyebrow": "询盘",
      "title": "申请样品与规格匹配",
      "text": "请提交目标装配压力、隔板尺寸与样品状态，沟通对应测试条件及样品规格匹配。",
      "checklist": [
        "目标装配压力",
        "样品状态与准备方式",
        "加载或卸载过程",
        "测点安排与重复测量条件"
      ],
      "fields": {
        "name": "姓名",
        "company": "公司",
        "email": "邮箱",
        "country": "国家/地区",
        "application": "电池应用",
        "message": "留言"
      },
      "placeholders": {
        "message": "请提交目标装配压力、隔板尺寸与样品状态，沟通对应测试条件及样品规格匹配。"
      },
      "submit": "发送询盘",
      "submitting": "发送中...",
      "required": "请先填写所有必填字段。",
      "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
      "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "footer": {
      "description": "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      "wechat": "官方微信公众号",
      "mobile": "移动官网"
    },
    "references": {
      "eyebrow": "公开来源与边界",
      "title": "把来源与证据边界说清楚",
      "text": "2026 年 10 月 24 日核对企业产品页；手册归因沿用该页说明，未独立核阅印刷版原件。不据此推断中间压力数据或电池寿命。",
      "items": [
        [
          "AlphaBeta — 先确认图中数据是什么",
          "https://agm-alphabeta.com/zh/products/start-stop/"
        ]
      ]
    }
  }
} as const;

const upsBatteryIndividualMonitoringCopy = {
  en: {
    ...agmMaterialDataPredictiveMaintenanceCopy.en,
    "languagePath": "/zh/blog/ups-battery-272-individual-monitors-batch-traceability/",
    "hero": {
  "eyebrow": "UPS Battery Procurement",
  "title": "272 Batteries, 272 Monitors: What UPS Procurement Can Tell Us",
  "subtitle": "A public UPS replacement notice pairs 272 VRLA batteries with 272 monitoring modules. Review individual readings, service consistency and the limits of AGM material evidence.",
  "primary": "Ask for AGM Separator Guide",
  "secondary": "Send Your Battery Application",
  "image": {
    "src": "/images/articles/ups-individual-monitoring-hero-1600.webp",
    "alt": "AI-generated illustration: 272 Batteries, 272 Monitors: What UPS Procurement Can Tell Us",
    "width": 1600,
    "height": 1200,
    "caption": "AI-generated illustration"
  }
},
    "intro": [
        "One battery, one monitoring point is a useful procurement question. The case highlights the value of observing individual units after installation; it does not establish an industry-wide trend or diagnose the old batteries."
    ],
    "sections": [
  {
    "eyebrow": "Public procurement case",
    "title": "What the September 24 notice lists",
    "text": "The University of Chinese Academy of Sciences UPS replacement notice published on China’s government procurement website on September 24, 2026 lists 272 sets of 12V 250Ah VRLA batteries and 272 individual monitoring modules for internal resistance and voltage. The scope also includes UPS replacement, monitoring deployment, installation and commissioning. These are published requirements, not evidence that work is complete."
  },
  {
    "eyebrow": "Scope boundary",
    "title": "Equal quantities are a procurement requirement, not a field result",
    "text": "The matched quantities are consistent with one monitoring point per battery. The notice does not establish the final wiring, sampling frequency, alarm thresholds, old-battery failure cause or operating results. It specifies VRLA, which alone does not confirm an AGM design. This single case does not show how widely the configuration is adopted or imply a Viking supply relationship."
  },
  {
    "eyebrow": "Monitoring evidence",
    "title": "Individual readings identify questions for investigation",
    "text": "A normal string voltage does not establish that every battery is in the same condition. Individual voltage and internal-resistance records can help identify differences and when they appeared. They are investigation inputs, not a diagnosis. Review connections, charging conditions, temperature and service history alongside string-level charge-discharge behavior and complete-battery tests; no universal alarm threshold is proposed here."
  },
  {
    "eyebrow": "Service consistency",
    "title": "Consistency needs review after delivery",
    "text": "Factory capacity and resistance checks describe a point in time. Float charging, temperature, connections and actual discharge events can change the installed group. Service review should ask whether divergence persists and whether maintenance changes the trend. Comparable records need the same measurement method and operating context; procurement of monitoring hardware alone does not prove a continuous, reliable data history."
  },
  {
    "eyebrow": "AGM material boundary",
    "title": "AGM data supports verification, not system diagnosis",
    "text": "Where the battery actually uses AGM, the separator supports electrolyte retention, ion transport and plate-group contact. Thickness, basis weight, absorption, compression state and batch variation are relevant material inputs. They cannot establish whole-battery resistance, voltage or life. Plates, acid, assembly, welded connections and use conditions also matter. An unusual monitored value cannot be attributed directly to the separator.",
    "image": {
      "src": "/images/evidence/viking-agm-material-thickness-inspection-1600.webp",
      "alt": "Viking technician measuring AGM separator material in the laboratory",
      "width": 1600,
      "height": 900,
      "caption": "Viking laboratory: separator material measurement, not the university UPS project site."
    }
  },
  {
    "eyebrow": "Traceable records",
    "title": "Link site, battery and separator records",
    "text": "Link battery model, serial number, installation position and monitoring point with measurement times and review records. Retain battery manufacturing and test batches, plus separator batch, material data and supply records. Viking supplies AGM rolls and sheets and can discuss thickness, width, sheet dimensions, packaging and available batch documentation for defined VRLA projects. Material records help battery manufacturers investigate; battery and system validation remain necessary."
  }
],
    "parameters": [
        [
            "Site",
            "Map each battery position to its monitoring point."
        ],
        [
            "Operating history",
            "Record individual readings with time and conditions."
        ],
        [
            "Battery",
            "Keep manufacturing identity and complete-battery results."
        ],
        [
            "AGM material",
            "Retain batch identity, methods and specification records."
        ]
    ],
    "checklist": {
        "eyebrow": "Buyer Checklist",
        "title": "Records for a UPS replacement review",
        "text": "Keep operating observations distinct from material and battery evidence.",
        "items": [
            "Battery model, serial number and installation position",
            "Battery-to-monitor mapping and commissioning baseline",
            "Voltage/resistance timestamps, method and review records",
            "Temperature, charging, connections and maintenance history",
            "Battery production batch and complete-battery tests",
            "AGM batch, thickness, basis weight, absorption and compression conditions",
            "Supply records, sample stage and responsible teams"
        ]
    },
    "related": {
        "eyebrow": "Related Pages",
        "title": "Continue with product and quality details",
        "items": [
            [
                "Why Many UPS Projects Still Use VRLA Batteries",
                "/blog/why-ups-projects-still-use-vrla-batteries/"
            ],
            [
                "Predicting 12V Battery Failure: Where AGM Material Data Fits",
                "/blog/agm-material-data-battery-soh-predictive-maintenance/"
            ],
            [
                "Why One Passing Test Does Not Prove an AGM Separator Is Ready for Volume Production",
                "/blog/agm-separator-batch-consistency-and-process-control/"
            ]
        ]
    },
    "inquiry": {
        "eyebrow": "Inquiry",
        "title": "Request a Sample & Specification Match",
        "text": "Share UPS duty, battery design, separator dimensions, test conditions and sample stage to discuss specification matching and available batch-consistency records. Material data does not replace system diagnosis.",
        "checklist": [
            "Battery model, serial number and installation position",
            "Battery-to-monitor mapping and commissioning baseline",
            "Voltage/resistance timestamps, method and review records",
            "Temperature, charging, connections and maintenance history"
        ],
        "fields": {
            "name": "Name",
            "company": "Company",
            "email": "Email",
            "country": "Country",
            "application": "Battery Application",
            "message": "Message"
        },
        "placeholders": {
            "message": "Share UPS duty, battery design, separator dimensions, test conditions and sample stage to discuss specification matching and available batch-consistency records. Material data does not replace system diagnosis."
        },
        "submit": "Send Inquiry",
        "submitting": "Sending...",
        "required": "Please complete all required fields before submitting.",
        "success": "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
        "failure": "Sorry, the inquiry could not be sent right now. Please try again later.",
        "emailFallback": "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
    },
    "references": {
        "eyebrow": "Public source and scope",
        "title": "Procurement notice reviewed on 18 October 2026",
        "text": "Source: September 24, 2026 public notice, project UCAS-ZBB-2026049 (BMCC-ZC26-1049), reviewed October 18, 2026. This article uses the notice summary, not unpublished test details or a completed-project report. It does not infer AGM construction, faults, thresholds or a Viking customer relationship. The laboratory image shows Viking material inspection, not the university site.",
        "items": [
            [
                "UCAS / 中国政府采购网 — 2026-09-24",
                "https://www.ccgp.gov.cn/cggg/zygg/gkzb/202609/t20260924_27395576.htm"
            ]
        ]
    }

  },
  zh: {
    ...agmMaterialDataPredictiveMaintenanceCopy.zh,
    "languagePath": "/blog/ups-battery-272-individual-monitors-batch-traceability/",
    "hero": {
  "eyebrow": "UPS 电池采购",
  "title": "272 套电池、272 套监测模块：UPS 采购关注什么？",
  "subtitle": "以一则 UPS 更换公告为例，区分单体电压与内阻监测、服役一致性和 AGM 材料证据，建立现场、电池与隔板批次的追溯关系。",
  "primary": "索取 AGM 隔板指南",
  "secondary": "发送电池应用信息",
  "image": {
    "src": "/images/articles/ups-individual-monitoring-hero-1600.webp",
    "alt": "AI 示意图: 272 套电池、272 套监测模块：UPS 采购关注什么？",
    "width": 1600,
    "height": 1200,
    "caption": "AI 示意图"
  }
},
    "intro": [
        "一只电池对应一个监测点，是值得关注的采购问题。这个案例提示更换后观察单体状态的价值，但不能据此判断全行业趋势，也不能诊断旧电池故障。"
    ],
    "sections": [
  {
    "eyebrow": "公开采购案例",
    "title": "9 月 24 日公告列出了什么",
    "text": "中国政府采购网于 2026 年 9 月 24 日发布的中国科学院大学 UPS 和电池更换公告，列出 272 套 12V 250Ah 阀控铅酸蓄电池，以及检测单只内阻和电压的 272 套单体监测模块。项目还包含 UPS 主机更换、监控部署、安装与调试。这些是公开采购要求，不代表项目已经实施完成。"
  },
  {
    "eyebrow": "需求边界",
    "title": "数量一一对应，仍是采购需求而非运行结果",
    "text": "两项数量相同，与每只电池配置一个监测点的思路一致。但公告摘要不能确认最终接线、采样频率、报警阈值、旧电池故障原因或运行结果。VRLA 标识本身也不能确认采用 AGM 结构。单个案例不能证明这种配置的行业普及程度，更不能暗示维京参与供货。"
  },
  {
    "eyebrow": "监测证据",
    "title": "单体读数为调查提供入口",
    "text": "整组电压正常，不代表每只电池状态相同。单体电压、内阻及时间记录可帮助发现组内差异和变化时点，但它们只是调查输入，不是诊断。应结合连接、充电条件、温度、服役历史，以及整组充放电表现和整电池测试复核；本文不提出通用报警阈值。"
  },
  {
    "eyebrow": "服役一致性",
    "title": "一致性需要在交付后继续观察",
    "text": "出厂容量和内阻检查描述的是特定时点。安装后的浮充、温度、连接与实际放电事件可能改变电池组状态。服役复核应关注差异是否持续、维护是否改变趋势；可比记录还需要一致的测量方法和工况。采购监测硬件本身不证明已经形成连续、可靠的数据历史。"
  },
  {
    "eyebrow": "AGM 材料边界",
    "title": "AGM 数据支持验证，不能替代系统诊断",
    "text": "只有在电池确实采用 AGM 结构时，隔板才作为吸液保液、离子传输和极群接触的材料输入参与验证。厚度、定量、吸液、压缩状态及批次波动均需关注，但不能替代整电池内阻、电压或寿命结论。极板、酸量、装配、焊接和使用条件同样影响读数，异常不能直接归因于隔板。",
    "image": {
      "src": "/images/evidence/viking-agm-material-thickness-inspection-1600.webp",
      "alt": "维京检测人员在实验室测量 AGM 隔板材料",
      "width": 1600,
      "height": 900,
      "caption": "维京实验室隔板材料测量实拍，非该大学 UPS 项目现场。"
    }
  },
  {
    "eyebrow": "追溯记录",
    "title": "将现场、整电池与隔板记录关联",
    "text": "将电池型号、序列号、安装位置和监测点，与采集时间及复核记录关联；同时保留电池生产批次、整电池测试，以及隔板批次、材料数据和供货记录。维京供应 AGM 卷材与片材，可按明确的 VRLA 项目沟通厚度、宽度、片材尺寸、包装和可提供的批次资料。材料记录帮助电池制造商追查，整电池与系统验证仍需完成。"
  }
],
    "parameters": [
        [
            "现场",
            "将电池位置与监测点一一对应。"
        ],
        [
            "运行历史",
            "读数同时记录时间与工况。"
        ],
        [
            "整电池",
            "保留生产标识与整电池结果。"
        ],
        [
            "AGM 材料",
            "保留批次标识、方法和规格记录。"
        ]
    ],
    "checklist": {
        "eyebrow": "买家清单",
        "title": "UPS 更换项目需要保留的记录",
        "text": "将运行观察与材料、整电池证据分开记录，再建立关联。",
        "items": [
            "电池型号、序列号与安装位置",
            "电池和监测点对应关系及调试基线",
            "电压/内阻的时间、方法与复核记录",
            "温度、充电、连接及维护历史",
            "电池生产批次与整电池测试",
            "AGM 批次、厚度、定量、吸液与压缩条件",
            "供货记录、样品阶段及责任团队"
        ]
    },
    "related": {
        "eyebrow": "相关页面",
        "title": "继续查看产品和质量信息",
        "items": [
            [
                "UPS 机房都在谈锂电、钠电，为什么很多项目还在继续用 VRLA？",
                "/zh/blog/why-ups-projects-still-use-vrla-batteries/"
            ],
            [
                "预测 12V 电池失效：AGM 材料数据能提供什么？",
                "/zh/blog/agm-material-data-battery-soh-predictive-maintenance/"
            ],
            [
                "为什么单次检测合格，不等于 AGM 隔板适合批量生产？",
                "/zh/blog/agm-separator-batch-consistency-and-process-control/"
            ]
        ]
    },
    "inquiry": {
        "eyebrow": "询盘",
        "title": "申请样品与规格匹配",
        "text": "请提供 UPS 任务、电池设计、隔板尺寸、测试条件和样品阶段，沟通规格匹配及可提供的批次一致性记录。材料数据不能替代系统诊断。",
        "checklist": [
            "电池型号、序列号与安装位置",
            "电池和监测点对应关系及调试基线",
            "电压/内阻的时间、方法与复核记录",
            "温度、充电、连接及维护历史"
        ],
        "fields": {
            "name": "姓名",
            "company": "公司",
            "email": "邮箱",
            "country": "国家/地区",
            "application": "电池应用",
            "message": "留言"
        },
        "placeholders": {
            "message": "请提供 UPS 任务、电池设计、隔板尺寸、测试条件和样品阶段，沟通规格匹配及可提供的批次一致性记录。材料数据不能替代系统诊断。"
        },
        "submit": "发送询盘",
        "submitting": "发送中...",
        "required": "请先填写所有必填字段。",
        "success": "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
        "failure": "抱歉，询盘暂时未能发送，请稍后再试。",
        "emailFallback": "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
    },
    "references": {
        "eyebrow": "公开来源与边界",
        "title": "2026 年 10 月 18 日核对的采购公告",
        "text": "2026 年 10 月 18 日核对 2026 年 9 月 24 日公开公告，项目号 UCAS-ZBB-2026049（BMCC-ZC26-1049）。本文使用公告摘要，不推断未读取的测试细节、AGM 结构、故障、阈值或维京客户关系，也不将需求视为竣工结果。配图为维京材料检测，不是该大学项目现场。",
        "items": [
            [
                "UCAS / 中国政府采购网 — 2026-09-24",
                "https://www.ccgp.gov.cn/cggg/zygg/gkzb/202609/t20260924_27395576.htm"
            ]
        ]
    }

  }
} as const;

const exportSupplySourceCopy = {
  en: {
    eyebrow: "Data Source and Note",
    title: "Public trade statistics for industry discussion",
    text:
      "May 2026 lead-acid battery export figures are based on publicly reported customs statistics, cited by Shanghai Metals Market and public market-information republishing. This article is for industry information only and does not constitute a market forecast or business advice.",
    linkLabel: "View public data reference"
  },
  zh: {
    eyebrow: "数据来源与说明",
    title: "用于行业交流的公开贸易数据",
    text:
      "2026 年 5 月铅酸蓄电池出口数据来自公开海关统计，并参考上海有色网相关公开信息及其公开转载内容。本文仅作行业信息交流，不构成市场预测或经营建议。",
    linkLabel: "查看公开数据参考"
  }
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function BlogArticlePage({
  lang,
  page = "whatIsAgmSeparator"
}: {
  lang: SiteLocale;
  page?: BlogArticleKind;
}) {
  const primaryLang = lang === "zh" ? "zh" : "en";
  const secondaryArticle =
    lang === "en" || lang === "zh"
      ? null
      : secondaryArticleCopy[lang][page];
  const defaultArticle: any = secondaryArticle ?? (
    page === "agmVsGemGlassFiber"
      ? agmVsGemGlassFiberCopy[primaryLang]
      : page === "upsOriginalManufacturerEvidence"
      ? upsOriginalManufacturerEvidenceCopy[primaryLang]
      : page === "telecomLeadAcidProcurement"
      ? telecomLeadAcidProcurementCopy[primaryLang]
      : page === "leadPremiumDemandRestocking"
      ? leadPremiumDemandRestockingCopy[primaryLang]
      : page === "agmAcidVolumeWetOut"
      ? agmAcidVolumeWetOutCopy[primaryLang]
      : page === "earlyLeadAcidElectrodeFormation"
      ? earlyLeadAcidElectrodeFormationCopy[primaryLang]
      : page === "agmSeparatorPressureCharts"
      ? agmSeparatorPressureChartsCopy[primaryLang]
      : page === "upsBatteryIndividualMonitoring"
      ? upsBatteryIndividualMonitoringCopy[primaryLang]
      : page === "agmMaterialDataPredictiveMaintenance"
      ? agmMaterialDataPredictiveMaintenanceCopy[primaryLang]
      : page === "sodiumIonColdStartAgmComparison"
      ? sodiumIonColdStartAgmComparisonCopy[primaryLang]
      : page === "batteryTechnologyProjectComparison"
      ? batteryTechnologyProjectComparisonCopy[primaryLang]
      : page === "keyTechnicalParameters"
      ? keyTechnicalCopy[primaryLang]
      : page === "howToChooseAgmSeparator"
        ? howToChooseCopy[primaryLang]
        : page === "agmSeparatorManufacturingQualityDelivery"
          ? manufacturingDeliveryCopy[primaryLang]
          : page === "agmSeparatorPerformanceConsistency"
            ? performanceConsistencyCopy[primaryLang]
            : page === "agmSeparatorExportSupplyReadiness"
              ? exportSupplyReadinessCopy[primaryLang]
              : page === "upsVrlaTechnologySelection"
                ? upsVrlaTechnologySelectionCopy[primaryLang]
                : page === "agmGlassFiberVsPvcSeparator"
                  ? agmGlassFiberVsPvcSeparatorCopy[primaryLang]
                  : page === "dataCenterBackupPowerAgmSeparator"
                    ? dataCenterBackupPowerAgmSeparatorCopy[primaryLang]
                    : page === "earlyChinaLeadAcidBatteryManufacturing"
                      ? earlyChinaLeadAcidBatteryManufacturingCopy[primaryLang]
                      : page === "agmSeparatorPressureRetention"
                        ? agmSeparatorPressureRetentionCopy[primaryLang]
                        : page === "agmSeparatorBatchProcessControl"
                          ? agmSeparatorBatchProcessControlCopy[primaryLang]
                          : page === "agmSeparatorSupplyChain"
                            ? agmSeparatorSupplyChainCopy[primaryLang]
                            : page === "agmStartStopBatteryProcurement"
                              ? agmStartStopBatteryProcurementCopy[primaryLang]
                              : page === "agmSeparatorThirdPole"
                                ? agmSeparatorThirdPoleCopy[primaryLang]
                                : page === "agmSeparatorEnergyDataDelivery"
                                  ? agmSeparatorEnergyDataDeliveryCopy[primaryLang]
                                  : page === "en18060BatteryStandard"
                                    ? en18060BatteryStandardCopy[primaryLang]
                                    : page === "dataCenterEvLowVoltageAgm"
                                      ? dataCenterEvLowVoltageAgmCopy[primaryLang]
                                      : page === "aiDataCenterBackupPowerLayers"
                                        ? aiDataCenterBackupPowerLayersCopy[primaryLang]
                                        : page === "agmPastingPaperEnergyValidation"
                                          ? agmPastingPaperEnergyValidationCopy[primaryLang]
                                        : page === "agmBatteryDamageDemoSafetyTest"
                                          ? agmBatteryDamageDemoSafetyTestCopy[primaryLang]
          : articleCopy[primaryLang]);
  const localizedUi =
    lang === "en"
      ? {
          sample: "Request Sample", sampleTitle: "Request a Sample & Specification Match",
          contents: "Article Contents", parameter: "Parameter", meaning: "Buyer-friendly meaning",
          next: "Sourcing Next Step", sampleText: "Use the buyer checklist to share your application, product form and available dimensions.",
          reference: "Technical Reference", pdfTitle: "Download the Viking AGM Capability PDF",
          pdfText: "Review product forms, quality checks, packing and specification information.",
          company: "Company", product: "Products", resource: "Resources", contact: "Contact", rights: "All rights reserved."
        }
      : lang === "zh"
        ? {
            sample: "申请样品", sampleTitle: "申请样品与规格匹配", contents: "文章目录", parameter: "参数", meaning: "买家沟通重点",
            next: "采购下一步", sampleText: "按清单提供电池应用、产品形式和已有尺寸，开始样品沟通。",
            reference: "技术资料", pdfTitle: "下载维京 AGM 技术能力 PDF", pdfText: "查看产品形式、质量检查、包装和规格沟通要点。",
            company: "公司", product: "产品", resource: "资料", contact: "联系", rights: "保留所有权利。"
          }
        : secondaryResourceData[lang].ui;
  const sourceNote =
    page === "agmSeparatorExportSupplyReadiness"
      ? lang === "en" || lang === "zh"
        ? exportSupplySourceCopy[lang]
        : {
            eyebrow: localizedUi.source,
            title: secondaryResourceData[lang].topics[page].title,
            text: secondaryResourceData[lang].topics[page].intro,
            linkLabel: localizedUi.read
          }
      : null;
  const t = articleContent(page, lang, defaultArticle) as ArticlePageData;
  const sectionIds =
    page === "keyTechnicalParameters"
      ? [
          "thickness",
          "basis-weight",
          "acid-absorption",
          "electrical-resistance",
          "porosity",
          "mechanical-strength"
        ]
      : page === "howToChooseAgmSeparator"
        ? [
            "battery-application",
            "roll-or-sheet",
            "dimensions",
            "technical-parameters",
            "samples-quality"
          ]
        : page === "agmSeparatorManufacturingQualityDelivery"
          ? ["company", "factory", "quality", "delivery"]
          : page === "agmSeparatorPerformanceConsistency"
            ? ["conductivity", "fit", "consistency", "buyer-questions", "viking-approach"]
            : page === "agmSeparatorExportSupplyReadiness"
              ? ["export-snapshot", "order-pace", "agm-supply", "export-priorities", "viking-supply"]
              : page === "upsVrlaTechnologySelection"
                ? ["mature-system", "system-fit", "operational-stability", "separator-role", "procurement-review", "viking-coordination"]
                : page === "agmGlassFiberVsPvcSeparator"
                  ? ["electrolyte-management", "agm-structure", "pvc-profile", "replacement-boundary", "buyer-review", "viking-coordination"]
                  : page === "dataCenterBackupPowerAgmSeparator"
                    ? ["demand-signal", "public-procurement", "high-rate-discharge", "float-compression", "oxygen-cycle", "batch-consistency", "application-fit"]
                    : page === "earlyChinaLeadAcidBatteryManufacturing"
                      ? ["historical-definitions", "early-materials", "process-control", "industrial-production", "separator-evolution", "modern-manufacturing"]
                      : page === "agmSeparatorPressureRetention"
                        ? ["dry-thickness", "after-filling", "after-cycling", "reproducible-record", "viking-coordination"]
                        : page === "agmSeparatorBatchProcessControl"
                          ? ["process-data", "single-sample", "assembly-impact", "statistical-review", "sampling-plan", "traceability", "viking-coordination"]
                          : page === "agmSeparatorSupplyChain"
                            ? ["starting-material", "fiber-condition", "wet-laid-forming", "conversion", "quality-boundary", "traceability", "viking-coordination"]
                            : page === "agmStartStopBatteryProcurement"
                              ? ["market-signal", "start-stop-duty", "separator-role", "measurement-conditions", "consistency", "procurement-checklist", "viking-coordination"]
                              : page === "agmSeparatorThirdPole"
                                ? ["meaning", "electrical-separation", "electrolyte", "oxygen-pathway", "compression", "project-review"]
                                : page === "agmSeparatorEnergyDataDelivery"
                                  ? ["external-example", "boundary", "supplier-comparison", "line-baseline", "evidence", "customer-review"]
                                  : page === "en18060BatteryStandard"
                                    ? ["published-listing", "covered-title-scope", "not-one-scorecard", "agm-evidence-boundary", "faq-applicability", "supplier-action"]
                                    : page === "dataCenterEvLowVoltageAgm"
                                      ? ["source-boundary", "data-center-duty", "ev-duty", "comparison", "agm-separator-boundary", "specification-match"]
                                      : page === "aiDataCenterBackupPowerLayers"
                                        ? ["vision-disclosure", "duty-layers", "architecture", "agm-applicability", "evidence-boundary", "faq"]
                                        : page === "agmPastingPaperEnergyValidation"
                                          ? ["claim-source", "missing-conditions", "same-line-test", "plate-acceptance", "validation-boundary", "implementation-checklist", "faq-geo"]
                                        : page === "agmBatteryDamageDemoSafetyTest"
                                          ? ["official-disclosure", "missing-conditions", "evidence-levels", "agm-separator-boundary", "reviewable-checklist", "faq-damage", "faq-separator"]
      : ["definition", "function", "parameters"];
  const heroImage =
    t.hero.image ?? {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: t.hero.title,
          width: 900,
          height: 675
        };
  const comparison = t.comparison;
  const timeline = t.timeline;

  return (
    <main dir={lang === "ar" ? "rtl" : undefined} className="min-h-screen bg-frost text-ink">
      <SiteHeader
        lang={lang}
        homePath={t.homePath}
        languagePath={t.languagePath}
        quoteLabel={page === "agmBatteryDamageDemoSafetyTest" ? t.quote : localizedUi.sample}
      />

      <section className="relative overflow-hidden bg-white px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,110,184,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f5f7fa_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div className="min-w-0">
            <div className="inline-flex w-full min-w-0 items-start gap-2 rounded-md border border-line bg-white/80 px-4 py-2 text-sm font-bold uppercase leading-5 tracking-[0.16em] text-signal shadow-sm sm:w-auto sm:max-w-full">
              <Factory className="mt-0.5 shrink-0" size={17} />
              <span className="min-w-0 flex-1 whitespace-normal break-words">{t.hero.eyebrow}</span>
            </div>
            <h1 className="mt-8 break-words text-5xl font-black leading-[0.98] tracking-normal text-ink sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex min-h-14 w-full min-w-0 items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 text-center text-base font-semibold leading-6 text-white shadow-sm transition hover:bg-ink sm:w-auto"
              >
                <span className="min-w-0 flex-1 whitespace-normal break-words">{page === "agmBatteryDamageDemoSafetyTest" ? t.quote : localizedUi.sampleTitle}</span>
                <Send className="shrink-0" size={18} />
              </a>
              <a
                href="#buyer-checklist"
                className="inline-flex min-h-14 w-full min-w-0 items-center justify-center gap-2 rounded-md border border-line bg-white px-6 py-3.5 text-center text-base font-semibold leading-6 text-ink transition hover:border-signal hover:text-signal sm:w-auto"
              >
                <span className="min-w-0 flex-1 whitespace-normal break-words">{t.hero.secondary}</span>
                <ArrowRight className="shrink-0" size={18} />
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-md bg-white shadow-industrial">
            <Image
              src={asset(heroImage.src)}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
            {heroImage.caption && (
              <p className="absolute bottom-3 right-3 max-w-[calc(100%-1.5rem)] rounded bg-white/85 px-2 py-1 text-xs leading-5 text-steel">{heroImage.caption}</p>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr]">
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-md border border-line bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
                {localizedUi.contents}
              </p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-graphite">
                {[
                  ...(timeline
                    ? [[timeline.eyebrow, "#timeline"]]
                    : []),
                  ...(comparison
                    ? [[comparison.eyebrow, "#comparison"]]
                    : []),
                  ...t.sections.map((section, index) => [
                    section.eyebrow,
                    `#${sectionIds[index] ?? `section-${index + 1}`}`
                  ]),
                  [t.formats.eyebrow, "#formats"],
                  [t.checklist.eyebrow, "#buyer-checklist"]
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="rounded-md border border-line bg-frost px-4 py-3 transition hover:border-signal hover:text-signal"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <article className="min-w-0 rounded-md border border-line bg-white p-6 shadow-industrial sm:p-10">
            <div className="grid gap-5 text-lg leading-9 text-graphite">
              {t.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {timeline && (
              <section
                id="timeline"
                className="mt-10 scroll-mt-28 border-t border-line pt-10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
                  {timeline.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-ink">
                  {timeline.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-steel">{timeline.note}</p>
                <ol className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  {timeline.items.map(([year, text]) => (
                    <li
                      key={year}
                      className="rounded-md border border-line bg-frost p-5"
                    >
                      <p className="text-xl font-black text-signal">{year}</p>
                      <p className="mt-3 text-sm leading-6 text-steel">{text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {comparison && (
              <section
                id="comparison"
                className="mt-10 scroll-mt-28 border-t border-line pt-10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
                  {comparison.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-ink">
                  {comparison.title}
                </h2>

                <div className="mt-7 hidden overflow-hidden rounded-md border border-line md:block">
                  <table className="w-full table-fixed border-collapse text-left text-sm">
                    <thead className="bg-ink text-white">
                      <tr>
                  {comparison.columns.map((column, index) => (
                          <th
                            key={column}
                            className={`px-4 py-4 font-bold ${
                              index === 0 ? "w-1/4" : ""
                            }`}
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {comparison.rows.map(([point, agm, pvc]) => (
                        <tr key={point} className="align-top">
                          <th className="bg-frost px-4 py-4 font-bold text-ink">
                            {point}
                          </th>
                          <td className="px-4 py-4 leading-6 text-steel">{agm}</td>
                          <td className="px-4 py-4 leading-6 text-steel">{pvc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-7 grid gap-4 md:hidden">
                  {comparison.rows.map(([point, agm, pvc]) => (
                    <article
                      key={point}
                      className="rounded-md border border-line bg-frost p-5"
                    >
                      <h3 className="font-bold text-ink">{point}</h3>
                      <dl className="mt-4 grid gap-4">
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
                            {comparison.columns[1]}
                          </dt>
                          <dd className="mt-2 text-sm leading-6 text-steel">{agm}</dd>
                        </div>
                        <div className="border-t border-line pt-4">
                          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
                            {comparison.columns[2]}
                          </dt>
                          <dd className="mt-2 text-sm leading-6 text-steel">{pvc}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-10 grid gap-10">
              {t.sections.map((section, index) => (
                <section
                  key={section.eyebrow}
                  id={sectionIds[index] ?? `section-${index + 1}`}
                  className="scroll-mt-28 border-t border-line pt-10"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-ink">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-steel">{section.text}</p>
                  {section.image && (
                    <figure className="mt-6">
                      <Image src={asset(section.image.src)} alt={section.image.alt}
                        width={section.image.width} height={section.image.height}
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="h-auto w-full rounded-md" />
                      <figcaption className="mt-2 text-sm leading-6 text-steel">
                        {section.image.caption}
                      </figcaption>
                    </figure>
                  )}
                </section>
              ))}
            </div>

            {page === "keyTechnicalParameters" ? (
              <div className="mt-8 overflow-hidden rounded-md border border-line">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-frost text-ink">
                    <tr>
                      <th className="w-1/3 px-4 py-3 font-bold">
                        {localizedUi.parameter}
                      </th>
                      <th className="px-4 py-3 font-bold">
                        {localizedUi.meaning}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {t.parameters.map(([title, text]) => (
                      <tr key={title} className="bg-white align-top">
                        <td className="px-4 py-4 font-bold text-ink">{title}</td>
                        <td className="px-4 py-4 leading-6 text-steel">{text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {t.parameters.map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-md border border-line bg-frost p-5"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 shrink-0 text-signal" size={18} />
                      <div>
                        <h3 className="font-bold text-ink">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-steel">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

      <section id="formats" className="scroll-mt-28 bg-white px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.formats.eyebrow}
          title={t.formats.title}
        />
        <div
          className={`mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 ${
            page === "upsVrlaTechnologySelection" ||
            page === "dataCenterBackupPowerAgmSeparator" ||
            page === "earlyChinaLeadAcidBatteryManufacturing" ||
            page === "agmSeparatorPressureRetention" ||
            page === "agmSeparatorBatchProcessControl" ||
            page === "agmSeparatorSupplyChain" ||
            page === "aiDataCenterBackupPowerLayers" ||
            page === "agmPastingPaperEnergyValidation" ||
            page === "agmBatteryDamageDemoSafetyTest"
              ? "lg:grid-cols-3"
              : ""
          }`}
        >
          {t.formats.items.map(([title, text, src, alt]) => (
            <article
              key={title}
              className="overflow-hidden rounded-md border border-line bg-white shadow-sm"
            >
              <Image
                src={asset(src)}
                alt={alt}
                width={900}
                height={675}
                sizes="(min-width: 768px) 45vw, 100vw"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-steel">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="buyer-checklist" className="scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.checklist.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.checklist.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-steel">{t.checklist.text}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.checklist.items.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-md border border-line bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-signal text-base font-bold text-white">
                  {index + 1}
                </span>
                <span className="font-bold text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        {sourceNote && (
          <div className="mx-auto mb-20 max-w-5xl rounded-md border border-line bg-frost p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {sourceNote.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-ink">{sourceNote.title}</h2>
            <p className="mt-4 text-sm leading-7 text-steel">{sourceNote.text}</p>
            <a
              href="https://goodsfu.10jqka.com.cn/20260622/c677605919.shtml"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-signal transition hover:text-ink"
            >
              {sourceNote.linkLabel}
              <ArrowRight size={16} />
            </a>
          </div>
        )}
        {t.references && (
          <div className="mx-auto mb-20 max-w-5xl rounded-md border border-line bg-frost p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.references.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-ink">
              {t.references.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-steel">
              {t.references.text}
            </p>
            <ol className="mt-6 grid gap-3">
              {t.references.items.map(([label, href], index) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-md border border-line bg-white px-4 py-3 text-sm font-bold leading-6 text-ink transition hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
                  >
                    <span className="text-signal">{index + 1}.</span>
                    <span>{label}</span>
                    <ArrowRight className="ml-auto mt-1 shrink-0" size={16} />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
        <SectionHeading eyebrow={t.related.eyebrow} title={t.related.title} />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.related.items.map(([title, href]) => (
            <a
              key={href}
              href={asset(href)}
              className="rounded-md border border-line bg-frost p-5 font-bold text-ink transition hover:border-signal hover:text-signal"
            >
              <span>{title}</span>
              <ArrowRight className="mt-4 text-signal" size={18} />
            </a>
          ))}
        </div>
      </section>

      {page !== "aiDataCenterBackupPowerLayers" && page !== "agmPastingPaperEnergyValidation" && page !== "agmBatteryDamageDemoSafetyTest" && <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          <a
            href={asset(
              lang === "en"
                ? "/request-agm-separator-sample/"
                : `/${lang}/request-agm-separator-sample/`
            )}
            className="group rounded-md border border-signal/25 bg-signal p-6 text-white shadow-sm transition hover:bg-ink"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
              {localizedUi.next}
            </p>
            <h2 className="mt-3 text-xl font-bold">
              {localizedUi.sampleTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/75">
              {localizedUi.sampleText}
            </p>
            <ArrowRight
              size={18}
              className="mt-5 transition group-hover:translate-x-1"
            />
          </a>
          <a
            href={asset("/downloads/viking-agm-technical-capability.pdf")}
            download
            className="group rounded-md border border-line bg-white p-6 text-ink transition hover:border-signal"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">
              {localizedUi.reference}
            </p>
            <h2 className="mt-3 text-xl font-bold">
              {localizedUi.pdfTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              {localizedUi.pdfText}
            </p>
            <ArrowRight
              size={18}
              className="mt-5 text-signal transition group-hover:translate-x-1"
            />
          </a>
        </div>
      </section>}

      <section id="contact" className="bg-ink px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div id="inquiry-checklist">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/58">
              {t.inquiry.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              {t.inquiry.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
              {t.inquiry.text}
            </p>
            <div className="mt-6 grid gap-3">
              {t.inquiry.checklist.map((hint) => (
                <div
                  key={hint}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/78"
                >
                  <CheckCircle2 size={16} className="shrink-0 text-white" />
                  {hint}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-md border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 text-white" size={20} />
                <div>
                  <p className="font-bold">Hubei Viking Technology Co., Ltd.</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    AGM Battery Separator / Absorbent Glass Mat Separator
                  </p>
                  <div className="mt-4 grid gap-2 text-sm font-semibold text-white/78">
                    <CopyContactButton label="TEL" value={contactInfo.phone} lang={lang} />
                    <CopyContactButton
                      label="E-mail"
                      value={contactInfo.email}
                      lang={lang}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InquiryForm
            lang={lang}
            defaultInterestedProduct={
              lang === "zh"
                ? "AGM 隔板样品与规格匹配"
                : "AGM separator sample and specification match"
            }
            messagePlaceholder={t.inquiry.placeholders.message}
            submitLabel={page === "agmBatteryDamageDemoSafetyTest" ? t.quote : undefined}
          />
        </div>
      </section>

      <footer className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-white p-2">
                <Image
                  src={asset("/images/viking-logo-footer-320.webp")}
                  alt="Viking Technology logo"
                  width={320}
                  height={320}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <p className="font-bold text-ink">Hubei Viking Technology Co., Ltd.</p>
                <p className="text-sm text-steel">湖北维京科技有限公司</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-steel">
              {t.footer.description}
            </p>
            <SocialLinks lang={lang} />
            <FooterQrCodes
              lang={lang}
              wechatLabel={t.footer.wechat}
              mobileLabel={t.footer.mobile}
              className="mt-6 max-w-md"
            />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [localizedUi.company, [t.nav.company, t.nav.quality]],
              [localizedUi.product, [t.formats.items[0][0], t.formats.items[1][0]]],
              [localizedUi.resource, [t.hero.title, t.checklist.title]],
              [localizedUi.contact, [t.quote, t.inquiry.title]]
            ].map(([title, links]) => (
              <div key={title as string}>
                <h3 className="font-bold text-ink">{title as string}</h3>
                <div className="mt-4 grid gap-2">
                  {(links as readonly string[]).map((link) => (
                    <a
                      key={link}
                      href="#contact"
                      className="text-sm text-steel transition hover:text-signal"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-line pt-6 text-sm text-steel">
          <div>
            © 2026 Hubei Viking Technology Co., Ltd. {localizedUi.rights}
          </div>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex font-semibold transition hover:text-signal"
          >
            {icpLicense}
          </a>
        </div>
      </footer>
      <QuickContactDock lang={lang} />
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-5 text-base leading-8 text-steel">{text}</p>}
    </div>
  );
}

function QuickContactDock({ lang }: { lang: SiteLocale }) {
  const [copiedContact, setCopiedContact] = useState<"phone" | "email" | null>(
    null
  );
  const labels =
    lang === "zh"
      ? {
          phone: "电话",
          email: "邮箱",
          copyPhone: "复制电话",
          copyEmail: "复制邮箱",
          backTop: "返回顶部",
          copied: "已复制",
          copyPrompt: "复制此联系方式："
        }
      : lang !== "en" ? secondaryResourceData[lang].ui : {
          phone: "TEL",
          email: "E-mail",
          copyPhone: "Copy phone",
          copyEmail: "Copy email",
          backTop: "Back to top",
          copied: "Copied",
          copyPrompt: "Copy this contact detail:"
        };
  const items = [
    {
      id: "phone" as const,
      label: labels.phone,
      value: contactInfo.phone,
      aria: `${labels.copyPhone}: ${contactInfo.phone}`,
      Icon: Phone
    },
    {
      id: "email" as const,
      label: labels.email,
      value: contactInfo.email,
      aria: `${labels.copyEmail}: ${contactInfo.email}`,
      Icon: Mail
    }
  ];

  async function copyContact(id: "phone" | "email", value: string) {
    const copied = await copyToClipboard(value);

    if (!copied) {
      window.prompt(labels.copyPrompt, value);
      return;
    }

    setCopiedContact(id);
    window.setTimeout(() => {
      setCopiedContact((current) => (current === id ? null : current));
    }, 1800);
  }

  return (
    <div className="fixed right-4 z-40 hidden flex-col gap-2 sm:top-1/2 sm:flex sm:-translate-y-1/2">
      {items.map(({ id, label, value, aria, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => copyContact(id, value)}
          aria-label={aria}
          className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-signal text-white shadow-industrial transition hover:bg-ink focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ink"
        >
          <span
            className={`pointer-events-none absolute right-14 min-w-max rounded-md bg-ink px-3 py-2 text-xs font-bold text-white shadow-industrial transition ${
              copiedContact === id
                ? "translate-x-0 opacity-100"
                : "hidden translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 sm:block"
            }`}
          >
            {copiedContact === id ? labels.copied : `${label}: ${value}`}
          </span>
          <Icon size={22} />
        </button>
      ))}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={labels.backTop}
        className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-ink text-white shadow-industrial transition hover:bg-signal focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ink"
      >
        <span className="pointer-events-none absolute right-14 hidden min-w-max translate-x-2 rounded-md bg-ink px-3 py-2 text-xs font-bold text-white opacity-0 shadow-industrial transition group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 sm:block">
          {labels.backTop}
        </span>
        <ArrowUp size={22} />
      </button>
    </div>
  );
}

function CopyContactButton({
  label,
  value,
  lang
}: {
  label: string;
  value: string;
  lang: SiteLocale;
}) {
  const [copied, setCopied] = useState(false);
  const copiedLabel = lang === "zh" ? "已复制" : lang === "en" ? "Copied" : secondaryResourceData[lang].ui.copied;
  const promptLabel = lang === "zh" ? "复制此联系方式：" : lang === "en" ? "Copy this contact detail:" : secondaryResourceData[lang].ui.copyPrompt;

  async function copyValue() {
    const didCopy = await copyToClipboard(value);

    if (!didCopy) {
      window.prompt(promptLabel, value);
      return;
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copyValue}
      className="text-left transition hover:text-white focus:outline-none focus:text-white"
      aria-label={`${promptLabel} ${label}: ${value}`}
    >
      {label}: {copied ? copiedLabel : value}
    </button>
  );
}

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

function makeIcon(name: IconName) {
  return function Icon({ size = 20, className = "" }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {iconPath(name)}
      </svg>
    );
  };
}

function iconPath(name: IconName) {
  switch (name) {
    case "arrow":
      return (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      );
    case "check":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.6 2.6L16.5 9" />
        </>
      );
    case "clipboard":
      return (
        <>
          <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" />
          <path d="M9 6h6" />
          <path d="m8 13 2 2 5-5" />
        </>
      );
    case "factory":
      return (
        <>
          <path d="M3 21V9l6 4V9l6 4h6v8H3Z" />
          <path d="M17 13V5h3v8" />
          <path d="M7 17h.01" />
          <path d="M11 17h.01" />
          <path d="M15 17h.01" />
        </>
      );
    case "layers":
      return (
        <>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16 9 5 9-5" />
        </>
      );
    case "mail":
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      );
    case "menu":
      return (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      );
    case "phone":
      return (
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
      );
    case "send":
      return (
        <>
          <path d="m22 2-7 20-4-9-9-4 20-7Z" />
          <path d="M22 2 11 13" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M12 3 5 6v6c0 4 2.8 7.5 7 9 4.2-1.5 7-5 7-9V6l-7-3Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
        </>
      );
    case "top":
      return (
        <>
          <path d="m12 5-7 7" />
          <path d="m12 5 7 7" />
          <path d="M12 5v14" />
        </>
      );
    case "x":
      return (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      );
  }
}
