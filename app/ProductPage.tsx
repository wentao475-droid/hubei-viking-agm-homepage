"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { SiteHeader } from "./SiteHeader";
import type { Lang } from "./VikingHome";

export type ProductPageKind =
  | "agmSeparator"
  | "agmSeparatorRolls"
  | "agmSeparatorSheets"
  | "agmSeparatorTesting"
  | "agmSeparatorVrlaApplication";

type IconProps = { size?: number; className?: string };
type LinkItem = [string, string];
type TextPair = [string, string];
type ImageCard = [string, string, string, string, number, number];

type ProductContent = {
  homePath: string;
  languagePath: string;
  quote: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
    proof: string[];
    image: { src: string; alt: string; width: number; height: number };
  };
  overview: { eyebrow: string; title: string; paragraphs: string[] };
  parameters: { eyebrow: string; title: string; text: string; items: TextPair[] };
  forms: { eyebrow: string; title: string; items: ImageCard[] };
  applications: { eyebrow: string; title: string; items: string[] };
  quality: { eyebrow: string; title: string; text: string; cards: TextPair[] };
  related: { eyebrow: string; title: string; items: LinkItem[] };
  inquiry: {
    eyebrow: string;
    title: string;
    text: string;
    checklist: string[];
    placeholder: string;
    submit: string;
    submitting: string;
    required: string;
    success: string;
    failure: string;
    emailFallback: string;
  };
  footer: { description: string; wechat: string; mobile: string };
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/";
const staticFormFallback =
  process.env.NEXT_PUBLIC_STATIC_FORM_FALLBACK === "true";
const contactInfo = {
  phone: "18907186665",
  email: "vikingsales@vikingagm.com"
};
const inquiryEmail =
  process.env.NEXT_PUBLIC_INQUIRY_EMAIL || contactInfo.email;

const sharedMessages = {
  en: {
    copied: "Copied",
    copyPhone: "Copy phone number",
    copyEmail: "Copy email address",
    backToTop: "Back to top",
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
      application: "VRLA, UPS, telecom, motorcycle..."
    }
  },
  zh: {
    copied: "已复制",
    copyPhone: "复制电话号码",
    copyEmail: "复制邮箱地址",
    backToTop: "返回顶部",
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
      application: "VRLA、UPS、通信、摩托车等"
    }
  }
} as const;

const commonRelated = {
  en: [
    ["AGM Separator Product", "/products/agm-separator/"],
    ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
    ["AGM Separator Sheets", "/products/agm-separator-sheets/"],
    ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
    ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"]
  ] as LinkItem[],
  zh: [
    ["AGM 隔板产品", "/zh/products/agm-separator/"],
    ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
    ["AGM 隔板片材", "/zh/products/agm-separator-sheets/"],
    ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
  ] as LinkItem[]
};

const footerCopy = {
  en: {
    description:
      "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
    wechat: "Official WeChat account",
    mobile: "Mobile website"
  },
  zh: {
    description:
      "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
    wechat: "官方微信公众号",
    mobile: "移动官网"
  }
} as const;

const content: Record<ProductPageKind, Record<Lang, ProductContent>> = {
  agmSeparator: {
    en: {
      homePath: "/",
      languagePath: "/zh/products/agm-separator/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "AGM Separator Product",
        title: "AGM Separator for VRLA Lead-Acid Batteries",
        subtitle:
          "AGM glass fiber separators supplied in roll or sheet format for VRLA lead-acid battery manufacturers and trading partners.",
        primary: "Request AGM Separator Samples",
        secondary: "Send Your Required Specification",
        proof: [
          "Roll and sheet discussion",
          "Customer requirement confirmation",
          "Factory-direct communication"
        ],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "Finished AGM glass fiber separator roll",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "Product Overview",
        title: "A separator material connected with battery design and performance",
        paragraphs: [
          "AGM separator is a glass fiber battery separator used in VRLA lead-acid batteries. It helps separate the positive and negative plates while holding electrolyte inside the battery structure.",
          "For battery manufacturers, a suitable separator is not only a material choice. It is connected with plate design, electrolyte retention, internal resistance, assembly process and long-term battery performance.",
          "We supply AGM glass fiber separators in roll and sheet formats. Thickness, width, sheet size and packing format can be discussed based on the customer’s battery design and production process."
        ]
      },
      parameters: {
        eyebrow: "Key Parameters",
        title: "Technical values confirmed by application and customer requirements",
        text:
          "Technical parameters should be reviewed together with the battery application, production process and acceptance requirements before order confirmation.",
        items: [
          ["Thickness", "Confirmed according to battery plate design and assembly process."],
          ["Width", "Roll width or sheet width can be discussed based on production line requirements."],
          ["Basis weight", "Reviewed together with electrolyte retention and separator structure."],
          ["Acid absorption", "Confirmed according to battery application requirements."],
          ["Electrical resistance", "Reviewed with battery performance and test conditions."],
          ["Porosity and strength", "Porosity, tensile strength and handling performance can be checked as required."]
        ]
      },
      forms: {
        eyebrow: "Product Forms",
        title: "Available for roll and sheet specification discussion",
        items: [
          [
            "AGM separator rolls",
            "Finished separator rolls can be discussed by thickness, width, roll diameter, packing method and production schedule.",
            "/images/viking-finished-separator-roll-900.webp",
            "Finished AGM separator roll",
            900,
            675
          ],
          [
            "AGM separator sheets",
            "Separator sheets can support sample review, specification discussion and customer production requirements.",
            "/images/viking-separator-sheets-900.webp",
            "AGM separator sheets",
            900,
            675
          ]
        ]
      },
      applications: {
        eyebrow: "Applications",
        title: "Used across major VRLA lead-acid battery segments",
        items: [
          "UPS batteries",
          "Telecom batteries",
          "Motorcycle batteries",
          "E-bike batteries",
          "Energy storage batteries",
          "Automotive starting batteries"
        ]
      },
      quality: {
        eyebrow: "Quality Note",
        title: "Checks aligned with confirmed customer requirements",
        text:
          "Quality checks can be performed according to customer requirements. Specific test items and acceptable values should be confirmed before order confirmation.",
        cards: [
          ["Incoming and process review", "Material and process status can be reviewed for order discussion."],
          ["Finished-product checks", "Finished separator parameters can be checked according to agreed items."],
          ["Requirement confirmation", "Acceptance values should be confirmed before production and delivery."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your AGM separator requirements",
        text:
          "If you are developing a new battery model or replacing an existing separator supplier, please send your required thickness, width, roll or sheet type and battery application.",
        checklist: [
          "Target thickness and width",
          "Roll type or sheet size",
          "Battery application and model",
          "Quantity and sample requirements",
          "Special test or packing requirements"
        ],
        placeholder:
          "Thickness, width, roll or sheet type, quantity, sample needs and any required test items",
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
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/products/agm-separator/",
      quote: "获取报价",
      hero: {
        eyebrow: "AGM 隔板产品",
        title: "用于 VRLA 铅酸电池的 AGM 隔板",
        subtitle:
          "面向 VRLA 铅酸电池生产企业和贸易伙伴，提供可按卷材或片材形式沟通的 AGM 玻璃纤维隔板。",
        primary: "申请 AGM 隔板样品",
        secondary: "发送所需规格",
        proof: ["卷材与片材沟通", "按客户要求确认", "工厂直接沟通"],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "AGM 玻璃纤维隔板成品卷",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "产品概览",
        title: "与电池结构和长期性能相关的隔板材料",
        paragraphs: [
          "AGM 隔板是一种用于 VRLA 铅酸电池的玻璃纤维电池隔板，用于隔离正负极板，并在电池结构中保持电解液。",
          "对于电池制造企业而言，合适的隔板不仅是材料选择，也与极板设计、电解液保持、内阻、装配工艺和长期电池性能相关。",
          "我们可提供 AGM 玻璃纤维隔板卷材和片材。厚度、宽度、片材尺寸及包装形式可根据客户电池设计和生产工艺进行沟通。"
        ]
      },
      parameters: {
        eyebrow: "关键参数",
        title: "技术指标根据应用场景和客户要求确认",
        text:
          "技术参数需结合电池应用、生产工艺和验收要求进行评估，并在订单确认前沟通确定。",
        items: [
          ["厚度", "目标厚度根据电池极板设计和装配工艺要求确认。"],
          ["宽度", "卷材宽度或片材宽度可根据客户生产线需求沟通。"],
          ["克重", "克重需结合电解液保持能力和隔板结构进行评估。"],
          ["吸酸性能", "吸酸表现应根据电池应用要求进行确认。"],
          ["电阻", "电阻要求需结合电池性能目标和测试条件沟通。"],
          ["孔隙率与强度", "孔隙率、拉伸强度和操作性能可按要求检测。"]
        ]
      },
      forms: {
        eyebrow: "产品形式",
        title: "支持卷材与片材规格沟通",
        items: [
          [
            "AGM 隔板卷材",
            "成品隔板卷可围绕厚度、宽度、卷径、包装方式和生产计划进行沟通。",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM 隔板成品卷",
            900,
            675
          ],
          [
            "AGM 隔板片材",
            "隔板片材可用于样品确认、规格沟通及客户生产需求讨论。",
            "/images/viking-separator-sheets-900.webp",
            "AGM 隔板片材",
            900,
            675
          ]
        ]
      },
      applications: {
        eyebrow: "应用领域",
        title: "服务主要 VRLA 铅酸电池应用场景",
        items: [
          "UPS 电池",
          "通信电池",
          "摩托车电池",
          "电动自行车电池",
          "储能电池",
          "汽车启动电池"
        ]
      },
      quality: {
        eyebrow: "质量说明",
        title: "检测项目根据确认的客户要求执行",
        text:
          "质量检测可根据客户要求进行。具体测试项目和接受值应在订单确认前沟通确定。",
        cards: [
          ["来料与过程确认", "可围绕原料和过程状态进行订单沟通。"],
          ["成品检测", "成品隔板参数可根据双方确认项目进行检测。"],
          ["要求确认", "验收值应在生产和交付前完成确认。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 AGM 隔板需求",
        text:
          "如果您正在开发新电池型号，或正在评估替换现有隔板供应商，请提供所需厚度、宽度、卷材或片材形式以及电池应用。",
        checklist: [
          "目标厚度和宽度",
          "卷材形式或片材尺寸",
          "电池应用和型号",
          "数量和样品需求",
          "特殊检测或包装要求"
        ],
        placeholder: "厚度、宽度、卷材或片材形式、数量、样品需求及检测项目",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorRolls: {
    en: {
      homePath: "/",
      languagePath: "/zh/products/agm-separator-rolls/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "AGM Separator Rolls",
        title: "AGM Separator Rolls for Battery Production Lines",
        subtitle:
          "Roll-format AGM glass fiber separators for VRLA lead-acid battery production, supporting continuous feeding, slitting and in-house cutting discussions.",
        primary: "Ask for Roll Specification",
        secondary: "Send Roll Requirements",
        proof: [
          "Continuous production support",
          "Roll packing discussion",
          "Customer requirement confirmation"
        ],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "Finished AGM separator roll for battery production",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "Roll Supply",
        title: "Roll format for continuous production and flexible planning",
        paragraphs: [
          "AGM separator rolls are used by battery manufacturers that need continuous material feeding, in-house slitting or sheet cutting before battery assembly.",
          "Compared with pre-cut sheets, roll supply can give production teams more flexibility when arranging line-side handling, inventory planning and specification conversion.",
          "Roll width, thickness, roll length, core requirement and packing method should be discussed according to the customer’s battery design, equipment condition and production process."
        ]
      },
      parameters: {
        eyebrow: "Custom Parameters",
        title: "Roll specifications confirmed before quotation",
        text:
          "Roll requirements are confirmed according to battery application, production handling and packing needs. Specific ranges are reviewed after receiving the buyer’s target specification.",
        items: [
          ["Width", "Discussed according to line feeding, slitting or in-house cutting requirements."],
          ["Thickness", "Confirmed with battery plate design, assembly pressure and application needs."],
          ["Roll length", "Reviewed based on handling, storage and production planning."],
          ["Core requirement", "Core material and inner diameter requirements should be confirmed before order discussion."],
          ["Packing method", "Export packing, moisture protection and handling requirements can be discussed with the buyer."],
          ["Battery application", "VRLA battery type and application help confirm roll specification and testing needs."]
        ]
      },
      forms: {
        eyebrow: "Roll Use Case",
        title: "Designed for production-line handling and further cutting",
        items: [
          [
            "Finished AGM separator roll",
            "Roll supply supports battery factories that require continuous material feeding, further slitting or internal sheet preparation.",
            "/images/viking-finished-separator-roll-900.webp",
            "Finished AGM separator roll",
            900,
            675
          ],
          [
            "Production and roll handling",
            "Workshop capability and roll handling details can be reviewed during specification and packing discussions.",
            "/images/agm-factory-capability-1200.webp",
            "AGM separator production and roll handling",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Production Applications",
        title: "Roll supply for VRLA battery manufacturing workflows",
        items: [
          "Automatic battery assembly lines",
          "Semi-automatic battery assembly",
          "In-house separator cutting",
          "Further slitting preparation",
          "VRLA battery production",
          "Export packing discussion"
        ]
      },
      quality: {
        eyebrow: "Quality Factors",
        title: "Roll condition and handling performance reviewed with customer needs",
        text:
          "For roll-format supply, buyers usually review thickness stability, clean surface, roll condition and mechanical handling performance together with the intended battery application.",
        cards: [
          ["Stable thickness", "Thickness consistency can be checked according to agreed inspection items."],
          ["Clean surface", "Surface condition is reviewed for line-side handling and battery assembly needs."],
          ["Roll condition", "Roll appearance, winding condition and packing requirements can be confirmed before shipment."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your AGM separator roll requirements",
        text:
          "Please share your target width, thickness, roll format, core requirement, packing method and battery application so our team can discuss a practical roll specification with you.",
        checklist: [
          "Target width and thickness",
          "Roll length or roll size",
          "Core and packing requirements",
          "Battery application",
          "Sample or trial order needs"
        ],
        placeholder:
          "Width, thickness, roll length, core requirement, packing method and battery application",
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
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/products/agm-separator-rolls/",
      quote: "获取报价",
      hero: {
        eyebrow: "AGM 隔板卷材",
        title: "用于电池生产线的 AGM 隔板卷材",
        subtitle:
          "面向 VRLA 铅酸电池生产的卷材形式 AGM 玻璃纤维隔板，可围绕连续上料、分切和厂内裁切需求进行沟通。",
        primary: "沟通卷材规格",
        secondary: "发送卷材需求",
        proof: ["支持连续生产", "卷材包装沟通", "按客户要求确认"],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "用于电池生产的 AGM 隔板成品卷",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "卷材供应",
        title: "适合连续生产和灵活计划的卷材形式",
        paragraphs: [
          "AGM 隔板卷材适用于需要连续上料、厂内分切或装配前裁切片材的电池制造企业。",
          "与预裁切片材相比，卷材供应有助于生产团队更灵活安排现场搬运、库存计划和规格转换。",
          "卷材宽度、厚度、卷长、芯管要求和包装方式应根据客户电池设计、设备条件和生产工艺进行沟通确认。"
        ]
      },
      parameters: {
        eyebrow: "定制参数",
        title: "报价前确认卷材规格",
        text:
          "卷材要求需结合电池应用、生产搬运和包装需求确认。具体范围将在收到客户目标规格后沟通评估。",
        items: [
          ["宽度", "根据生产线上料、分切或厂内裁切要求沟通。"],
          ["厚度", "结合电池极板设计、装配压力和应用需求确认。"],
          ["卷长", "可根据搬运、仓储和生产计划评估卷长或卷材尺寸。"],
          ["芯管要求", "芯管材料和内径要求应在订单沟通前确认。"],
          ["包装方式", "出口包装、防潮和搬运要求可与客户沟通。"],
          ["电池应用", "VRLA 电池类型和应用有助于确认卷材规格与检测需求。"]
        ]
      },
      forms: {
        eyebrow: "卷材用途",
        title: "面向生产线搬运与后续裁切",
        items: [
          [
            "AGM 隔板成品卷",
            "卷材供应适合需要连续上料、进一步分切或厂内准备片材的电池工厂。",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM 隔板成品卷",
            900,
            675
          ],
          [
            "生产与卷材处理",
            "车间能力和卷材处理细节可在规格和包装沟通中确认。",
            "/images/agm-factory-capability-1200.webp",
            "AGM 隔板生产与卷材处理",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "生产应用",
        title: "面向 VRLA 电池制造流程的卷材供应",
        items: [
          "自动化电池装配线",
          "半自动电池装配",
          "厂内隔板裁切",
          "后续分切准备",
          "VRLA 电池生产",
          "出口包装沟通"
        ]
      },
      quality: {
        eyebrow: "质量因素",
        title: "卷材状态和搬运性能按客户需求评估",
        text:
          "对于卷材供应，买家通常会结合目标电池应用评估厚度稳定性、表面洁净度、卷材状态和机械搬运性能。",
        cards: [
          ["厚度稳定", "厚度一致性可根据约定检测项目进行检查。"],
          ["表面洁净", "表面状态可结合现场搬运和电池装配需求评估。"],
          ["卷材状态", "卷材外观、收卷状态和包装要求可在发货前确认。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 AGM 隔板卷材需求",
        text:
          "请提供目标宽度、厚度、卷材形式、芯管要求、包装方式和电池应用，便于我们与您沟通实际卷材规格。",
        checklist: [
          "目标宽度和厚度",
          "卷长或卷材尺寸",
          "芯管与包装要求",
          "电池应用",
          "样品或试单需求"
        ],
        placeholder: "宽度、厚度、卷长、芯管要求、包装方式和电池应用",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorSheets: {
    en: {
      homePath: "/",
      languagePath: "/zh/products/agm-separator-sheets/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "AGM Separator Sheets",
        title: "AGM Separator Sheets for VRLA Battery Assembly",
        subtitle:
          "Pre-cut AGM separator sheets for VRLA lead-acid battery assembly. Sheet dimensions and thickness should be confirmed by battery design.",
        primary: "Ask for Sheet Specification",
        secondary: "Send Sheet Requirements",
        proof: ["Pre-cut sheet format", "Sample review support", "Customer design confirmation"],
        image: {
          src: "/images/sheets1-1200.webp",
          alt: "Pre-cut AGM separator sheets",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Sheet Format",
        title: "Ready-to-use pieces for assembly and sample review",
        paragraphs: [
          "AGM separator sheets are pre-cut separator pieces used when customers need direct assembly, sample review or customized battery model discussions.",
          "Sheet height, width, thickness and packing quantity should be confirmed according to the customer’s battery design and assembly process.",
          "This format is useful for buyers who need clear sample comparison, small-batch preparation or direct production-line use."
        ]
      },
      parameters: {
        eyebrow: "Sheet Parameters",
        title: "Dimensions and packing confirmed by battery design",
        text:
          "Sheet requirements are confirmed before quotation. Specific dimensions, tolerances and packing quantities should be based on customer drawings or sample needs.",
        items: [
          ["Height", "Confirmed according to battery model and plate group design."],
          ["Width", "Reviewed with assembly process and separator placement requirements."],
          ["Thickness", "Confirmed with battery design, compression and application needs."],
          ["Packing quantity", "Discussed according to sample, trial or production arrangement."],
          ["Appearance", "Surface and edge condition can be reviewed during sample confirmation."],
          ["Reference sample", "Existing sample or drawing helps speed up specification discussion."]
        ]
      },
      forms: {
        eyebrow: "Sheet Display",
        title: "Cut sheets for direct review and assembly discussion",
        items: [
          [
            "Pre-cut AGM separator sheets",
            "Sheet pieces support direct assembly, sample comparison and customized battery model discussions.",
            "/images/sheets1-900.webp",
            "Pre-cut AGM separator sheets",
            900,
            675
          ],
          [
            "Roll and sheet preparation",
            "Roll material and prepared sheets can be reviewed together when confirming production workflow.",
            "/images/sheets2-cropped-900.webp",
            "AGM separator roll and sheets",
            900,
            675
          ]
        ]
      },
      applications: {
        eyebrow: "Use Cases",
        title: "Sheet supply for assembly, trials and customized models",
        items: [
          "Manual assembly",
          "Small-batch production",
          "Customized battery models",
          "Sample review",
          "Specification comparison",
          "Trading sample preparation"
        ]
      },
      quality: {
        eyebrow: "Key Checks",
        title: "Sheet condition reviewed according to confirmed requirements",
        text:
          "Dimensions, appearance, edge condition and packing expectations should be confirmed before sample or order arrangement.",
        cards: [
          ["Dimensions", "Height, width and thickness can be checked against agreed requirements."],
          ["Appearance", "Surface condition and visible defects can be reviewed during sample confirmation."],
          ["Packing", "Packing quantity and protection method can be discussed before shipment."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your AGM separator sheet requirements",
        text:
          "Please send sheet height, width, thickness, packing quantity, battery model and sample requirements for discussion.",
        checklist: [
          "Sheet height and width",
          "Target thickness",
          "Battery model or application",
          "Packing quantity",
          "Sample or reference information"
        ],
        placeholder:
          "Sheet height, width, thickness, packing quantity, battery model and sample requirements",
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
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/products/agm-separator-sheets/",
      quote: "获取报价",
      hero: {
        eyebrow: "AGM 隔板片材",
        title: "用于 VRLA 电池装配的 AGM 隔板片材",
        subtitle:
          "预裁切 AGM 隔板片材用于 VRLA 铅酸电池装配，片材尺寸和厚度应根据电池设计确认。",
        primary: "沟通片材规格",
        secondary: "发送片材需求",
        proof: ["预裁切片材形式", "支持样品评估", "按客户设计确认"],
        image: {
          src: "/images/sheets1-1200.webp",
          alt: "预裁切 AGM 隔板片材",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "片材形式",
        title: "面向装配和样品评估的预裁切片材",
        paragraphs: [
          "AGM 隔板片材是预裁切的隔板片，适用于客户直接装配、样品评估或定制电池型号沟通。",
          "片材高度、宽度、厚度和包装数量应根据客户电池设计和装配流程确认。",
          "该形式适合需要清晰样品对比、小批量准备或直接生产线使用的买家。"
        ]
      },
      parameters: {
        eyebrow: "片材参数",
        title: "尺寸与包装按电池设计确认",
        text:
          "片材要求应在报价前确认。具体尺寸、公差和包装数量需基于客户图纸或样品需求沟通。",
        items: [
          ["高度", "根据电池型号和极群设计确认。"],
          ["宽度", "结合装配流程和隔板放置要求评估。"],
          ["厚度", "结合电池设计、压缩状态和应用需求确认。"],
          ["包装数量", "根据样品、试单或生产安排沟通。"],
          ["外观", "表面和边缘状态可在样品确认时评估。"],
          ["参考样品", "现有样品或图纸有助于加快规格沟通。"]
        ]
      },
      forms: {
        eyebrow: "片材展示",
        title: "用于直接评估和装配沟通的裁切片材",
        items: [
          [
            "预裁切 AGM 隔板片材",
            "片材支持直接装配、样品对比和定制电池型号沟通。",
            "/images/sheets1-900.webp",
            "预裁切 AGM 隔板片材",
            900,
            675
          ],
          [
            "卷材与片材准备",
            "确认生产流程时，可同时评估卷材和准备好的片材形式。",
            "/images/sheets2-cropped-900.webp",
            "AGM 隔板卷材与片材",
            900,
            675
          ]
        ]
      },
      applications: {
        eyebrow: "使用场景",
        title: "面向装配、试样和定制型号的片材供应",
        items: [
          "手工装配",
          "小批量生产",
          "定制电池型号",
          "样品评估",
          "规格对比",
          "贸易样品准备"
        ]
      },
      quality: {
        eyebrow: "关键检查",
        title: "片材状态按确认要求评估",
        text:
          "尺寸、外观、边缘状态和包装期望应在样品或订单安排前确认。",
        cards: [
          ["尺寸", "高度、宽度和厚度可按约定要求检查。"],
          ["外观", "表面状态和可见缺陷可在样品确认时评估。"],
          ["包装", "包装数量和防护方式可在出运前沟通。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 AGM 隔板片材需求",
        text:
          "请提供片材高度、宽度、厚度、包装数量、电池型号和样品需求，便于我们沟通。",
        checklist: [
          "片材高度和宽度",
          "目标厚度",
          "电池型号或应用",
          "包装数量",
          "样品或参考信息"
        ],
        placeholder: "片材高度、宽度、厚度、包装数量、电池型号和样品需求",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorVrlaApplication: {
    en: {
      homePath: "/",
      languagePath: "/zh/applications/agm-separator-for-vrla-battery/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "VRLA Battery Applications",
        title: "AGM Separator for VRLA Battery Applications",
        subtitle:
          "Application-focused AGM glass fiber separator discussion for VRLA lead-acid batteries used in UPS, telecom, motorcycle, e-bike, energy storage and automotive starting batteries.",
        primary: "Choose Separator by Application",
        secondary: "Send Battery Model Information",
        proof: [
          "VRLA lead-acid battery applications",
          "Roll or sheet specification discussion",
          "Customer requirement confirmation"
        ],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "AGM separator roll for VRLA battery applications",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "VRLA Battery Function",
        title: "How AGM separator supports VRLA lead-acid battery design",
        paragraphs: [
          "AGM separator is placed between positive and negative plates in VRLA lead-acid batteries. It helps prevent direct plate contact while holding electrolyte inside the battery structure.",
          "Different battery applications may require different separator discussions. UPS, telecom, motorcycle, e-bike, energy storage and automotive starting batteries can have different plate design, assembly and operating requirements.",
          "Separator parameters should be confirmed together with battery structure, plate design, assembly process and application environment before quotation or sample arrangement."
        ]
      },
      parameters: {
        eyebrow: "Parameter Selection",
        title: "Specification discussion should start from the battery application",
        text:
          "Thickness, width, basis weight, acid absorption behavior, electrical resistance and product format should be reviewed according to the customer battery design and production process.",
        items: [
          ["Battery structure", "Separator selection should match the internal battery design and plate spacing."],
          ["Plate design", "Plate size and assembly method influence separator thickness, width or sheet size discussion."],
          ["Assembly process", "Roll or sheet format should support the customer production workflow."],
          ["Application environment", "Battery use conditions help define quality and technical review priorities."],
          ["Technical parameters", "Target values should be confirmed according to customer standards and order requirements."],
          ["Sample or drawing reference", "Existing samples or drawings help make specification communication more accurate."]
        ]
      },
      forms: {
        eyebrow: "Application Examples",
        title: "AGM separators for common VRLA lead-acid battery segments",
        items: [
          [
            "Roll and sheet formats for VRLA batteries",
            "AGM separator material can be discussed in roll or sheet form according to the customer battery production workflow.",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM separator roll for VRLA battery applications",
            900,
            675
          ],
          [
            "Specification review and quality discussion",
            "For different battery applications, quality checks and target parameters should be confirmed before sample or order arrangement.",
            "/images/agm-quality-control-1200.webp",
            "AGM separator quality discussion for VRLA battery applications",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "VRLA Battery Segments",
        title: "Application areas buyers commonly discuss",
        items: [
          "UPS batteries",
          "Telecom batteries",
          "Motorcycle batteries",
          "E-bike batteries",
          "Energy storage batteries",
          "Automotive starting batteries"
        ]
      },
      quality: {
        eyebrow: "Before Quotation",
        title: "Send application details before separator specification confirmation",
        text:
          "To support quotation and sample discussion, please provide battery application, separator thickness, roll or sheet type, width or sheet size, technical requirements and available sample or drawing information.",
        cards: [
          ["Battery application", "Share the battery segment, use case and production workflow for specification discussion."],
          ["Separator format", "Confirm whether roll material, sheet pieces or both formats should be reviewed."],
          ["Technical reference", "Provide target parameters, existing samples, drawings or customer standards when available."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your VRLA battery separator application requirements",
        text:
          "Please share the battery application and separator requirements so we can discuss suitable roll or sheet specification details with you.",
        checklist: [
          "Battery application",
          "Separator thickness",
          "Roll or sheet type",
          "Width or sheet size",
          "Technical requirements",
          "Sample or drawing information"
        ],
        placeholder:
          "Battery application, separator thickness, roll or sheet type, width or sheet size, technical requirements and sample/drawing information",
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
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/applications/agm-separator-for-vrla-battery/",
      quote: "获取报价",
      hero: {
        eyebrow: "VRLA 电池应用",
        title: "用于 VRLA 电池应用的 AGM 隔板",
        subtitle:
          "面向 UPS、通信、摩托车、电动车、储能和汽车启动电池等 VRLA 铅酸电池应用，沟通 AGM 玻璃纤维隔板的卷材、片材和规格要求。",
        primary: "按应用沟通隔板需求",
        secondary: "发送电池型号信息",
        proof: ["VRLA 铅酸电池应用", "卷材或片材规格沟通", "按客户要求确认"],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "用于 VRLA 电池应用的 AGM 隔板卷材",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "VRLA 电池功能",
        title: "AGM 隔板在 VRLA 铅酸电池中的作用",
        paragraphs: [
          "AGM 隔板位于 VRLA 铅酸电池正负极板之间，用于帮助隔离极板并在电池结构中保持电解液。",
          "不同电池应用对隔板的关注点可能不同。UPS、通信、摩托车、电动车、储能和汽车启动电池在极板设计、装配方式和使用环境上可能存在差异。",
          "隔板参数应结合电池结构、极板设计、装配工艺和应用环境，在报价或样品安排前与客户要求共同确认。"
        ]
      },
      parameters: {
        eyebrow: "参数选择",
        title: "隔板规格沟通应从电池应用开始",
        text:
          "厚度、宽度、克重、吸酸行为、电阻以及产品形式，应结合客户电池设计和生产工艺进行确认。",
        items: [
          ["电池结构", "隔板选择应匹配电池内部结构和极板间距。"],
          ["极板设计", "极板尺寸和装配方式会影响隔板厚度、宽度或片材尺寸沟通。"],
          ["装配工艺", "卷材或片材形式应服务于客户生产流程。"],
          ["应用环境", "电池使用场景有助于确定质量和技术评审重点。"],
          ["技术参数", "目标值应结合客户标准和订单要求确认。"],
          ["样品或图纸参考", "现有样品或图纸有助于提高规格沟通准确性。"]
        ]
      },
      forms: {
        eyebrow: "应用示例",
        title: "AGM 隔板服务常见 VRLA 铅酸电池应用",
        items: [
          [
            "VRLA 电池卷材与片材形式",
            "AGM 隔板材料可根据客户电池生产流程沟通卷材或片材形式。",
            "/images/viking-finished-separator-roll-900.webp",
            "用于 VRLA 电池应用的 AGM 隔板卷材",
            900,
            675
          ],
          [
            "规格评审与质量沟通",
            "针对不同电池应用，质量检查项目和目标参数应在样品或订单安排前确认。",
            "/images/agm-quality-control-1200.webp",
            "VRLA 电池 AGM 隔板质量沟通",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "VRLA 电池场景",
        title: "买家常见沟通的应用方向",
        items: [
          "UPS 电池",
          "通信电池",
          "摩托车电池",
          "电动车电池",
          "储能电池",
          "汽车启动电池"
        ]
      },
      quality: {
        eyebrow: "报价前信息",
        title: "规格确认前请提供电池应用与隔板需求",
        text:
          "为便于报价和样品沟通，请提供电池应用、隔板厚度、卷材或片材形式、宽度或片材尺寸、技术要求及样品或图纸信息。",
        cards: [
          ["电池应用", "说明电池应用领域、使用场景和生产流程。"],
          ["隔板形式", "确认需要沟通卷材、片材或两种形式。"],
          ["技术参考", "如有目标参数、现有样品、图纸或客户标准，请一并提供。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 VRLA 电池隔板应用需求",
        text:
          "请提供电池应用和隔板需求，便于我们与您沟通合适的卷材或片材规格。",
        checklist: [
          "电池应用",
          "隔板厚度",
          "卷材或片材形式",
          "宽度或片材尺寸",
          "技术要求",
          "样品或图纸信息"
        ],
        placeholder:
          "电池应用、隔板厚度、卷材或片材形式、宽度或片材尺寸、技术要求及样品/图纸信息",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorTesting: {
    en: {
      homePath: "/",
      languagePath: "/zh/quality-control/agm-separator-testing/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "Quality Control",
        title: "AGM Separator Testing and Quality Control",
        subtitle:
          "Quality starts with measurable parameters, clear customer requirements and stable production communication.",
        primary: "Discuss Test Requirements",
        secondary: "Request Sample Evaluation",
        proof: ["Measurable parameters", "Customer-specific requirements", "Sample support"],
        image: {
          src: "/images/agm-quality-control-1200.webp",
          alt: "AGM separator testing and quality control",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Testing Overview",
        title: "Quality should be evaluated through inspection and measurable values",
        paragraphs: [
          "AGM separator quality should be evaluated through both appearance inspection and measurable technical parameters.",
          "A separator needs stable dimensions, suitable acid-related behavior, controlled electrical resistance and reliable mechanical properties for battery production.",
          "The exact test items and acceptable values should be confirmed according to the customer’s battery design and order requirements."
        ]
      },
      parameters: {
        eyebrow: "Test Items",
        title: "Common quality checks discussed before sample or order arrangement",
        text:
          "The following items are common quality communication directions for AGM separator buyers. Final testing requirements should follow customer standards.",
        items: [
          ["Thickness", "Dimensional stability supports plate spacing, compression and assembly consistency."],
          ["Basis weight", "Material weight and consistency help buyers evaluate batch stability."],
          ["Acid absorption", "Acid-related behavior should be reviewed with electrolyte retention and battery design needs."],
          ["Electrical resistance", "Resistance should be confirmed with battery performance targets and test conditions."],
          ["Porosity", "Porosity and pore structure can be discussed with separator function and electrolyte movement."],
          ["Appearance and moisture", "Surface condition, visible defects and moisture can be included in quality review."]
        ]
      },
      forms: {
        eyebrow: "Why It Matters",
        title: "Stable quality reduces assembly and long-term supply risk",
        items: [
          [
            "Specification communication",
            "Stable production and clear technical communication help overseas buyers reduce risk during battery assembly.",
            "/images/agm-quality-control-1200.webp",
            "AGM separator testing and quality control",
            1200,
            900
          ],
          [
            "Production follow-up",
            "Process control, sample evaluation and agreed test items support long-term supply communication.",
            "/images/agm-factory-capability-1200.webp",
            "AGM separator production follow-up",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Customer Requirements",
        title: "Quality checks should match battery design and order needs",
        items: [
          "Battery application",
          "Target test items",
          "Acceptance values",
          "Sample evaluation",
          "Technical standard review",
          "Order requirement confirmation"
        ]
      },
      quality: {
        eyebrow: "Documentation and Sample Support",
        title: "Confirm requirements before sample or order arrangement",
        text:
          "Quality checks can be performed according to customer requirements. Please confirm required test items before sample or order arrangement.",
        cards: [
          ["Sample evaluation", "Samples can be discussed with customer battery model and target requirements."],
          ["Technical standard review", "Customer standards help define test items and acceptable values."],
          ["Order communication", "Testing and document expectations should be confirmed before production."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your testing and quality requirements",
        text:
          "Please share the required test items, target values, battery application and sample needs so we can discuss quality control requirements with you.",
        checklist: [
          "Required test items",
          "Target values or technical standard",
          "Battery application",
          "Sample evaluation needs",
          "Supplier review requirements"
        ],
        placeholder:
          "Required test items, target values, battery application, sample needs and technical standard",
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
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/quality-control/agm-separator-testing/",
      quote: "获取报价",
      hero: {
        eyebrow: "质量控制",
        title: "AGM 隔板检测与质量控制",
        subtitle:
          "质量控制从可测量参数、清晰客户要求和稳定生产沟通开始。",
        primary: "沟通检测要求",
        secondary: "申请样品评估",
        proof: ["可测量参数", "按客户要求确认", "支持样品沟通"],
        image: {
          src: "/images/agm-quality-control-1200.webp",
          alt: "AGM 隔板检测与质量控制",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "检测概览",
        title: "质量应通过外观检查和可测量参数共同评估",
        paragraphs: [
          "AGM 隔板质量应通过外观检查和可测量技术参数共同评估。",
          "隔板需要具备稳定尺寸、合适的吸酸相关表现、受控电阻和可靠机械性能，以满足电池生产需求。",
          "具体检测项目和接受值应根据客户电池设计与订单要求沟通确认。"
        ]
      },
      parameters: {
        eyebrow: "检测项目",
        title: "样品或订单安排前沟通常见质量项目",
        text:
          "以下项目是 AGM 隔板买家常见的质量沟通方向，最终检测要求应结合客户技术标准确认。",
        items: [
          ["厚度", "尺寸稳定性有助于极板间距、装配压力和生产一致性。"],
          ["克重", "材料质量和一致性有助于客户评估批次稳定性。"],
          ["吸酸 / 爬酸表现", "吸酸相关表现需结合电解液保持和电池设计需求评估。"],
          ["电阻", "电阻应结合电池性能目标和测试条件进行确认。"],
          ["孔隙率", "孔隙率和孔结构可结合电解液迁移和隔板功能沟通。"],
          ["外观与含水率", "表面状态、可见缺陷和含水情况可作为质量控制内容。"]
        ]
      },
      forms: {
        eyebrow: "参数意义",
        title: "稳定质量降低装配和长期供货风险",
        items: [
          [
            "规格沟通",
            "稳定生产和清晰技术沟通，有助于海外客户降低电池装配过程中的风险。",
            "/images/agm-quality-control-1200.webp",
            "AGM 隔板检测与质量控制",
            1200,
            900
          ],
          [
            "生产跟进",
            "过程控制、样品评估和约定检测项目支持连续供应沟通。",
            "/images/agm-factory-capability-1200.webp",
            "AGM 隔板生产过程跟进",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "客户要求",
        title: "质量检查与电池设计和订单需求保持一致",
        items: [
          "电池应用",
          "目标检测项目",
          "接受值要求",
          "样品评估",
          "技术标准审核",
          "订单要求确认"
        ]
      },
      quality: {
        eyebrow: "文件与样品支持",
        title: "样品或订单安排前完成要求确认",
        text:
          "质量检查可按客户要求执行，所需检测项目应在样品或订单安排前确认。",
        cards: [
          ["样品评估", "样品可结合客户电池型号和目标要求进行沟通。"],
          ["技术标准审核", "客户提供的技术标准有助于定义检测项目和接受值。"],
          ["订单沟通", "检测和文件期望应在生产前确认。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送检测与质量要求",
        text:
          "请提供所需检测项目、目标值、电池应用和样品需求，便于我们与您沟通质量控制要求。",
        checklist: [
          "所需检测项目",
          "目标值或技术标准",
          "电池应用",
          "样品评估需求",
          "订单或供应商审核要求"
        ],
        placeholder: "检测项目、目标值、电池应用、样品需求和技术标准",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  }
};

function asset(path: string) {
  return `${basePath}${path}`;
}

function CheckIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ArrowRight({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SendIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function FactoryIcon({ size = 17, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21h18" />
      <path d="M4 21V8l6 4V8l6 4V5h4v16" />
      <path d="M7 17h2" />
      <path d="M12 17h2" />
      <path d="M17 17h2" />
    </svg>
  );
}

function PhoneIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function ArrowUp({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function ProductPage({
  lang,
  page = "agmSeparator"
}: {
  lang: Lang;
  page?: ProductPageKind;
}) {
  const t = content[page][lang];
  const ui = sharedMessages[lang];
  const [formState, setFormState] = useState<
    "idle" | "error" | "success" | "failure" | "emailFallback"
  >("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const required = ["name", "company", "email", "country", "application"];
    const valid = required.every((field) =>
      String(formData.get(field) || "").trim()
    );

    if (!valid) {
      setFormState("error");
      return;
    }

    formData.set("form-name", "inquiry");
    formData.set("language", lang);

    if (staticFormFallback) {
      setFormState("idle");
      window.location.href = buildInquiryMailto(formData, lang);
      setFormState("emailFallback");
      return;
    }

    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        body.append(key, value);
      }
    });

    setIsSubmitting(true);
    setFormState("idle");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setFormState("success");
      form.reset();
    } catch {
      setFormState("failure");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-frost text-ink">
      <SiteHeader
        lang={lang}
        homePath={t.homePath}
        languagePath={t.languagePath}
        quoteLabel={t.quote}
      />

      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f5f7fa_45%,rgba(14,110,184,0.10)_100%)]" />
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-md border border-line bg-white/88 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-signal shadow-sm">
              <FactoryIcon size={16} />
              <span className="truncate">{t.hero.eyebrow}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[4rem]">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite sm:text-xl">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 text-base font-semibold text-white shadow-industrial transition hover:bg-ink"
              >
                {t.hero.primary}
                <SendIcon size={18} />
              </a>
              <a
                href="#inquiry-checklist"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/15 bg-white/88 px-6 py-3.5 text-base font-semibold text-ink transition hover:border-signal hover:text-signal"
              >
                {t.hero.secondary}
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              {t.hero.proof.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-md border border-white bg-white/82 px-3 py-2 text-sm font-semibold text-graphite shadow-sm"
                >
                  <CheckIcon size={16} className="text-signal" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-line bg-white p-4 shadow-industrial">
            <Image
              src={asset(t.hero.image.src)}
              alt={t.hero.image.alt}
              width={t.hero.image.width}
              height={t.hero.image.height}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.overview.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.overview.title}
            </h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-graphite">
            {t.overview.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.parameters.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.parameters.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-graphite">
              {t.parameters.text}
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.parameters.items.map(([title, description]) => (
              <div
                key={title}
                className="rounded-md border border-line bg-frost p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-signal/10 text-signal">
                    <CheckIcon size={17} />
                  </span>
                  <h3 className="font-bold text-ink">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-steel">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.forms.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.forms.title}
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {t.forms.items.map(([title, description, src, alt, width, height]) => (
              <article
                key={title}
                className="overflow-hidden rounded-md border border-line bg-white shadow-sm"
              >
                <Image
                  src={asset(src)}
                  alt={alt}
                  width={width}
                  height={height}
                  loading="lazy"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-steel">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="applications" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.applications.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.applications.title}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.applications.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-md border border-line bg-frost p-5 text-base font-semibold text-ink"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-signal text-white">
                  <CheckIcon size={17} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.quality.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.quality.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-graphite">
              {t.quality.text}
            </p>
          </div>
          <div className="grid gap-4">
            {t.quality.cards.map(([title, description]) => (
              <div key={title} className="rounded-md border border-line bg-white p-5">
                <h3 className="font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
            {t.related.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {t.related.title}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {t.related.items.map(([label, href]) => (
              <a
                key={href}
                href={asset(href)}
                className="group rounded-md border border-line bg-frost p-5 font-bold text-ink transition hover:border-signal hover:bg-white hover:text-signal"
              >
                <span>{label}</span>
                <ArrowRight
                  size={16}
                  className="mt-4 transition group-hover:translate-x-1"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-ink px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div id="inquiry-checklist">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
              {t.inquiry.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              {t.inquiry.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/78">
              {t.inquiry.text}
            </p>
            <div className="mt-8 grid gap-3">
              {t.inquiry.checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-md border border-white/12 bg-white/7 p-4 font-semibold"
                >
                  <CheckIcon size={17} className="text-sky-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <form
            name="inquiry"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={submitInquiry}
            className="rounded-md bg-white p-6 text-ink shadow-industrial sm:p-8"
          >
            <input type="hidden" name="form-name" value="inquiry" />
            <input type="hidden" name="language" value={lang} />
            <p className="hidden">
              <label>
                Do not fill this out: <input name="bot-field" />
              </label>
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {(["name", "company", "email", "country"] as const).map((field) => (
                <label key={field} className="grid gap-2">
                  <span className="font-bold">{ui.fields[field]}</span>
                  <input
                    required
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={ui.placeholders[field]}
                    className="rounded-md border border-line bg-frost px-4 py-3 outline-none transition focus:border-signal focus:bg-white"
                  />
                </label>
              ))}
            </div>
            <label className="mt-5 grid gap-2">
              <span className="font-bold">{ui.fields.application}</span>
              <input
                required
                name="application"
                type="text"
                placeholder={ui.placeholders.application}
                className="rounded-md border border-line bg-frost px-4 py-3 outline-none transition focus:border-signal focus:bg-white"
              />
            </label>
            <label className="mt-5 grid gap-2">
              <span className="font-bold">{ui.fields.message}</span>
              <textarea
                name="message"
                rows={6}
                placeholder={t.inquiry.placeholder}
                className="resize-none rounded-md border border-line bg-frost px-4 py-3 outline-none transition focus:border-signal focus:bg-white"
              />
            </label>
            {formState !== "idle" && (
              <div
                className={`mt-5 rounded-md px-4 py-3 text-sm font-semibold ${
                  formState === "success" || formState === "emailFallback"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {formState === "success"
                  ? t.inquiry.success
                  : formState === "emailFallback"
                    ? t.inquiry.emailFallback
                    : formState === "error"
                      ? t.inquiry.required
                      : t.inquiry.failure}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? t.inquiry.submitting : t.inquiry.submit}
              <SendIcon size={18} />
            </button>
          </form>
        </div>
      </section>

      <Footer lang={lang} copy={t.footer} />
      <QuickActions lang={lang} />
    </main>
  );
}

function Footer({
  lang,
  copy
}: {
  lang: Lang;
  copy: ProductContent["footer"];
}) {
  return (
    <footer className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <div className="flex items-start gap-4">
          <Image
            src={asset("/images/viking-logo-footer-320.webp")}
            alt="Viking Technology logo"
            width={320}
            height={320}
            loading="lazy"
            className="h-auto w-36 object-contain"
          />
          <div>
            <h2 className="text-lg font-bold text-ink">
              Hubei Viking Technology Co., Ltd.
            </h2>
            <p className="mt-1 text-sm text-steel">湖北维京科技有限公司</p>
            <p className="mt-4 max-w-xl leading-7 text-graphite">
              {copy.description}
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-frost p-4">
            <Image
              src={asset("/images/qrcode_for_logo.jpg")}
              alt={copy.wechat}
              width={160}
              height={160}
              loading="lazy"
              className="mx-auto h-28 w-28 object-contain"
            />
            <p className="mt-3 text-center text-sm font-semibold text-ink">
              {copy.wechat}
            </p>
          </div>
          <div className="rounded-md border border-line bg-frost p-4">
            <Image
              src={asset("/images/website-logo-180.webp")}
              alt={copy.mobile}
              width={160}
              height={160}
              loading="lazy"
              className="mx-auto h-28 w-28 object-contain"
            />
            <p className="mt-3 text-center text-sm font-semibold text-ink">
              {copy.mobile}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-line pt-6 text-sm text-steel">
        © 2026 Hubei Viking Technology Co., Ltd. {lang === "zh" ? "保留所有权利。" : "All rights reserved."}
      </div>
    </footer>
  );
}

function QuickActions({ lang }: { lang: Lang }) {
  const ui = sharedMessages[lang];
  const [copied, setCopied] = useState<"phone" | "email" | null>(null);

  async function copyValue(type: "phone" | "email", value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      window.prompt(ui.copied, value);
    }
  }

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2 sm:bottom-8 sm:right-6">
      <button
        type="button"
        aria-label={`${ui.copyPhone}: ${contactInfo.phone}`}
        onClick={() => copyValue("phone", contactInfo.phone)}
        className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-signal text-white shadow-industrial transition hover:bg-ink"
      >
        <PhoneIcon />
        <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-bold text-white shadow-sm group-hover:block group-focus:block">
          {copied === "phone" ? ui.copied : contactInfo.phone}
        </span>
      </button>
      <button
        type="button"
        aria-label={`${ui.copyEmail}: ${contactInfo.email}`}
        onClick={() => copyValue("email", contactInfo.email)}
        className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-signal text-white shadow-industrial transition hover:bg-ink"
      >
        <MailIcon />
        <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-bold text-white shadow-sm group-hover:block group-focus:block">
          {copied === "email" ? ui.copied : contactInfo.email}
        </span>
      </button>
      <button
        type="button"
        aria-label={ui.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-12 w-12 items-center justify-center rounded-md bg-ink text-white shadow-industrial transition hover:bg-signal"
      >
        <ArrowUp />
      </button>
    </div>
  );
}

function buildInquiryMailto(formData: FormData, lang: Lang) {
  const labels =
    lang === "zh"
      ? {
          subject: "湖北维京官网询盘",
          name: "姓名",
          company: "公司",
          email: "邮箱",
          country: "国家/地区",
          application: "电池应用",
          message: "留言"
        }
      : {
          subject: "Viking AGM website inquiry",
          name: "Name",
          company: "Company",
          email: "Email",
          country: "Country",
          application: "Battery Application",
          message: "Message"
        };
  const lines = [
    `${labels.name}: ${formData.get("name") || ""}`,
    `${labels.company}: ${formData.get("company") || ""}`,
    `${labels.email}: ${formData.get("email") || ""}`,
    `${labels.country}: ${formData.get("country") || ""}`,
    `${labels.application}: ${formData.get("application") || ""}`,
    `${labels.message}: ${formData.get("message") || ""}`
  ];

  return `mailto:${inquiryEmail}?subject=${encodeURIComponent(
    labels.subject
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}
