"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { productContent } from "./cms-content";
import { productFaqCopy } from "./seo-faq";
import { SiteHeader } from "./SiteHeader";
import type { Lang } from "./VikingHome";

export type ProductPageKind =
  | "agmSeparator"
  | "agmSeparatorRolls"
  | "agmSeparatorSheets"
  | "agmSeparatorTesting"
  | "agmSeparatorVrlaApplication"
  | "agmSeparatorUpsApplication"
  | "agmSeparatorMotorcycleApplication"
  | "agmSeparatorEnergyStorageApplication";

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
const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/inquiry";
const icpLicense = process.env.NEXT_PUBLIC_ICP_LICENSE || "鄂ICP备2026033781号";
const staticFormFallback =
  process.env.NEXT_PUBLIC_STATIC_FORM_FALLBACK === "true";
const contactInfo = {
  phone: "+86 18171518528",
  email: "vikingsales@vikingagm.com"
};
const inquiryEmail =
  process.env.NEXT_PUBLIC_INQUIRY_EMAIL || contactInfo.email;

const sharedMessages = {
  en: {
    copied: "Copied",
    copyPhone: "Copy phone number",
    copyEmail: "Copy email address",
    openWechat: "View WeChat QR code",
    backToTop: "Back to top",
    fields: {
      name: "Name",
      contact: "Email / WhatsApp / Phone",
      company: "Company",
      interestedProduct: "Interested Product",
      message: "Message"
    },
    placeholders: {
      name: "Your full name",
      contact: "Email, WhatsApp or phone number",
      company: "Company name",
      interestedProduct: "AGM separator rolls, sheets, or not sure yet"
    }
  },
  zh: {
    copied: "已复制",
    copyPhone: "复制电话号码",
    copyEmail: "复制邮箱地址",
    openWechat: "查看微信二维码",
    backToTop: "返回顶部",
    fields: {
      name: "姓名",
      contact: "微信或手机号",
      company: "公司",
      interestedProduct: "感兴趣产品",
      message: "补充说明"
    },
    placeholders: {
      name: "您的姓名",
      contact: "微信号或手机号",
      company: "公司名称",
      interestedProduct: "AGM 隔板卷材、片材或暂不确定"
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

const leadCaptureCopy = {
  en: {
    heroPrompt:
      "Leave your email or WhatsApp. We will help confirm the right AGM separator specification.",
    formText:
      "Leave your contact information first. Our team will follow up for thickness, width, quantity and application details.",
    checklist: [
      "Name and contact information are enough to start",
      "Our team will help confirm the right specification",
      "Thickness, width and quantity can be discussed later"
    ],
    messagePlaceholder:
      "Optional: battery application, estimated quantity, sample needs or technical questions",
    required: "Please leave your name and contact information before submitting.",
    success:
      "Thank you. We will contact you soon to confirm your AGM separator requirements.",
    emailFallback:
      "Your email client has been opened with the contact details. Please send the email to complete your inquiry.",
    ...productFaqCopy.en
  },
  zh: {
    heroPrompt: "留下微信或手机号，我们会协助确认合适的 AGM 隔板规格。",
    formText:
      "先留下联系方式即可，我们会进一步沟通厚度、宽度、数量和应用需求。",
    checklist: [
      "留下姓名和微信或手机号即可开始沟通",
      "我们会协助确认合适的 AGM 隔板规格",
      "厚度、宽度和数量可以后续沟通"
    ],
    messagePlaceholder: "可选：电池应用、预计数量、样品需求或技术问题",
    required: "请先填写姓名和微信或手机号。",
    success: "感谢您留下联系方式，我们会尽快联系您确认 AGM 隔板需求。",
    emailFallback: "已为您打开邮件客户端并填入联系方式，请发送邮件完成询盘。",
    ...productFaqCopy.zh
  }
} as const;

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
        title: "AGM battery separator parameters buyers usually confirm",
        text:
          "For VRLA lead-acid battery production, AGM separator selection usually starts with thickness, width, basis weight, acid absorption, electrical resistance and handling strength. These values should be reviewed together with the battery application, assembly process and acceptance requirements before order confirmation.",
        items: [
          ["Thickness", "Connected with plate design, compression behavior and assembly process requirements."],
          ["Width or sheet size", "Roll width, slitting direction or pre-cut sheet size can be discussed based on production workflow."],
          ["Basis weight", "Reviewed together with separator structure, electrolyte retention and customer test method."],
          ["Acid absorption", "Discussed according to battery application, electrolyte retention needs and agreed test requirements."],
          ["Electrical resistance", "Reviewed with battery performance targets, test conditions and internal-resistance expectations."],
          ["Porosity and strength", "Porosity, tensile strength and handling performance can be checked for converting and assembly needs."]
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
          ],
          [
            "Raw material and production follow-up",
            "Additional production evidence slot for raw material feeding and line-side process confirmation.",
            "/images/evidence/factory-raw-material-feed-01.webp",
            "AGM separator raw material feeding and production follow-up",
            1200,
            900
          ],
          [
            "Packing and shipment preparation",
            "Additional evidence slot for export packing, pallet handling and shipment preparation.",
            "/images/evidence/shipping-pallet-01.webp",
            "AGM separator packing and shipment preparation",
            1200,
            900
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
        title: "采购 AGM 电池隔板时通常需要确认的参数",
        text:
          "用于 VRLA 铅酸电池生产的 AGM 隔板，通常需要结合厚度、宽度、克重、吸酸性能、电阻和操作强度进行沟通。这些指标应与电池应用、装配工艺和验收要求一起确认。",
        items: [
          ["厚度", "与极板设计、压缩表现和装配工艺要求相关，需要结合电池结构确认。"],
          ["宽度或片材尺寸", "卷材宽度、分切方向或预裁切片材尺寸可根据生产流程沟通。"],
          ["克重", "需结合隔板结构、电解液保持能力和客户测试方法进行评估。"],
          ["吸酸性能", "根据电池应用、电解液保持需求和约定测试要求进行沟通。"],
          ["电阻", "需结合电池性能目标、测试条件和内阻要求进行确认。"],
          ["孔隙率与强度", "孔隙率、拉伸强度和操作性能可围绕分切、转化和装配需求检测。"]
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
          ],
          [
            "原料与生产跟进",
            "新增证据图片位，用于展示原料进入生产线和现场过程确认。",
            "/images/evidence/factory-raw-material-feed-01.webp",
            "AGM 隔板原料进入生产线与生产跟进",
            1200,
            900
          ],
          [
            "包装与出运准备",
            "新增证据图片位，用于展示出口包装、托盘搬运和出运准备。",
            "/images/evidence/shipping-pallet-01.webp",
            "AGM 隔板包装与出运准备",
            1200,
            900
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
          ],
          [
            "Batch roll inventory",
            "Additional evidence slot for finished roll storage and batch supply review.",
            "/images/evidence/agm-separator-roll-warehouse-01.webp",
            "Finished AGM separator rolls in warehouse",
            1200,
            900
          ],
          [
            "Roll end-face condition",
            "Additional evidence slot for winding condition, roll edge and end-face review.",
            "/images/evidence/agm-separator-roll-end-face-01.webp",
            "AGM separator roll end-face condition",
            1200,
            900
          ],
          [
            "Roll packing method",
            "Additional evidence slot for roll protection, labeling, palletizing and export packing.",
            "/images/evidence/agm-separator-roll-packaging-01.webp",
            "AGM separator roll packaging",
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
          ],
          [
            "批量卷材库存",
            "新增证据图片位，用于展示成品卷材仓储和批量供应能力。",
            "/images/evidence/agm-separator-roll-warehouse-01.webp",
            "AGM 隔板成品卷材库存",
            1200,
            900
          ],
          [
            "卷材端面状态",
            "新增证据图片位，用于展示收卷状态、卷边和端面细节。",
            "/images/evidence/agm-separator-roll-end-face-01.webp",
            "AGM 隔板卷材端面状态",
            1200,
            900
          ],
          [
            "卷材包装方式",
            "新增证据图片位，用于展示卷材防护、标签、托盘和出口包装。",
            "/images/evidence/agm-separator-roll-packaging-01.webp",
            "AGM 隔板卷材包装",
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
          ],
          [
            "Sheet edge and thickness detail",
            "Additional evidence slot for sheet edge condition, thickness feel and surface review.",
            "/images/evidence/agm-separator-sheets-detail-01.webp",
            "AGM separator sheet edge and thickness detail",
            1200,
            900
          ],
          [
            "Sheet packing and sample support",
            "Additional evidence slot for sheet packing, sample preparation and small-batch discussion.",
            "/images/evidence/agm-separator-sheets-packaging-01.webp",
            "AGM separator sheet packaging and sample support",
            1200,
            900
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
          ],
          [
            "片材边缘与厚度细节",
            "新增证据图片位，用于展示片材边缘状态、厚度感和表面状态。",
            "/images/evidence/agm-separator-sheets-detail-01.webp",
            "AGM 隔板片材边缘与厚度细节",
            1200,
            900
          ],
          [
            "片材包装与样品支持",
            "新增证据图片位，用于展示片材包装、样品准备和小批量沟通。",
            "/images/evidence/agm-separator-sheets-packaging-01.webp",
            "AGM 隔板片材包装与样品支持",
            1200,
            900
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
  agmSeparatorUpsApplication: {
    en: {
      homePath: "/",
      languagePath: "/zh/applications/agm-separator-for-ups-battery/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "UPS Battery Application",
        title: "AGM Separator for UPS VRLA Batteries",
        subtitle:
          "Application-focused AGM separator discussion for UPS, standby power and backup VRLA lead-acid battery manufacturing.",
        primary: "Discuss UPS Battery Requirements",
        secondary: "Send Contact Information",
        proof: ["UPS and standby power", "Roll or sheet discussion", "Specification support"],
        image: {
          src: "/images/applications/ups-vrla-battery-application-1200.webp",
          alt: "AGM separator discussion for UPS VRLA battery applications",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Application Focus",
        title: "Separator requirements should match UPS battery design and standby use",
        paragraphs: [
          "UPS VRLA batteries are commonly used for standby power and backup systems. Separator discussion should consider the battery structure, expected operating environment and production process.",
          "For UPS battery projects, buyers often review separator thickness, width, acid absorption behavior, electrical resistance and consistency before sample or order confirmation.",
          "If the exact specification is not final, you can leave your contact information first. Our team can help review whether roll material, sheet pieces or a custom discussion is more suitable."
        ]
      },
      parameters: {
        eyebrow: "Specification Discussion",
        title: "Key points for UPS VRLA battery separator sourcing",
        text:
          "UPS battery separator requirements should be confirmed with the customer battery design, test standards and production workflow.",
        items: [
          ["Thickness and width", "Confirmed according to plate design, cell structure and production process."],
          ["Acid absorption", "Reviewed with electrolyte retention needs and customer test methods."],
          ["Electrical resistance", "Discussed together with battery performance and agreed testing conditions."],
          ["Roll or sheet format", "Selected according to line-side feeding, cutting or assembly workflow."],
          ["Batch consistency", "Important for customers planning repeated standby battery production."],
          ["Packing method", "Packing and shipment requirements can be confirmed before order arrangement."]
        ]
      },
      forms: {
        eyebrow: "Product Format",
        title: "Roll and sheet options for UPS battery production",
        items: [
          [
            "AGM separator rolls for production lines",
            "Roll supply can support line-side feeding, slitting and production planning for UPS battery manufacturers.",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM separator rolls for UPS battery production",
            900,
            675
          ],
          [
            "AGM separator sheets for sample review",
            "Pre-cut sheets can support assembly trials, sample comparison and battery model discussion.",
            "/images/sheets1-900.webp",
            "AGM separator sheets for UPS battery sample review",
            900,
            675
          ],
          [
            "UPS standby power application discussion",
            "Application image slot for UPS and backup power battery separator sourcing.",
            "/images/applications/ups-vrla-battery-application-1200.webp",
            "UPS VRLA battery application discussion",
            1200,
            900
          ],
          [
            "Quality testing support",
            "Testing items can be discussed before sample or order arrangement.",
            "/images/evidence/quality-electrical-resistance-test-01.webp",
            "AGM separator electrical resistance testing for UPS battery discussion",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "UPS Battery Uses",
        title: "Common standby power directions buyers discuss",
        items: [
          "UPS backup batteries",
          "Standby power systems",
          "Data center backup power",
          "Security and emergency power",
          "Telecom backup cabinets",
          "Industrial control backup batteries"
        ]
      },
      quality: {
        eyebrow: "Quality Considerations",
        title: "Testing expectations should be confirmed before samples",
        text:
          "UPS battery projects may require stable separator parameters and clear quality communication. Final test items should follow customer requirements.",
        cards: [
          ["Dimensional consistency", "Thickness and width should be reviewed against agreed requirements."],
          ["Absorption and resistance", "Acid absorption and electrical resistance can be discussed with test conditions."],
          ["Sample comparison", "Existing samples, drawings or target values help make discussion more accurate."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with VRLA, product and quality details",
        items: [
          ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"],
          ["AGM Separator Product", "/products/agm-separator/"],
          ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
          ["AGM Separator Sheets", "/products/agm-separator-sheets/"],
          ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your UPS battery separator requirements",
        text:
          "Leave your contact first. We will help confirm the suitable AGM separator specification for UPS or standby battery projects.",
        checklist: ["UPS or standby battery application", "Roll or sheet format", "Target thickness or width if available", "Sample or quantity needs"],
        placeholder:
          "Optional: UPS battery type, roll or sheet need, sample quantity, target thickness or technical questions",
        submit: "Send Contact",
        submitting: "Sending...",
        required: "Please leave your name and contact information before submitting.",
        success:
          "Thank you. We will contact you soon to confirm your AGM separator requirements.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the contact details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/applications/agm-separator-for-ups-battery/",
      quote: "获取报价",
      hero: {
        eyebrow: "UPS 电池应用",
        title: "用于 UPS VRLA 电池的 AGM 隔板",
        subtitle:
          "面向 UPS、备用电源和后备电源 VRLA 铅酸电池生产，沟通 AGM 隔板卷材、片材和规格要求。",
        primary: "沟通 UPS 电池需求",
        secondary: "留下联系方式",
        proof: ["UPS 与备用电源", "卷材或片材沟通", "规格协助确认"],
        image: {
          src: "/images/applications/ups-vrla-battery-application-1200.webp",
          alt: "UPS VRLA 电池应用 AGM 隔板沟通",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "应用重点",
        title: "隔板需求应结合 UPS 电池结构和备用电源场景确认",
        paragraphs: [
          "UPS VRLA 电池常用于备用电源和后备系统。隔板沟通应结合电池结构、使用环境和生产工艺进行。",
          "UPS 电池项目通常会在样品或订单确认前沟通隔板厚度、宽度、吸酸表现、电阻和批次一致性。",
          "如果具体规格尚未确定，也可以先留下联系方式。我们会协助判断更适合沟通卷材、片材还是定制规格。"
        ]
      },
      parameters: {
        eyebrow: "规格沟通",
        title: "UPS VRLA 电池隔板采购的关键沟通点",
        text:
          "UPS 电池隔板要求应结合客户电池设计、测试标准和生产流程确认。",
        items: [
          ["厚度和宽度", "根据极板设计、电池结构和生产工艺确认。"],
          ["吸酸性能", "结合电解液保持需求和客户测试方法沟通。"],
          ["电阻", "与电池性能和约定测试条件共同讨论。"],
          ["卷材或片材形式", "根据连续上料、裁切或装配流程选择。"],
          ["批次一致性", "对持续生产备用电池的客户较为重要。"],
          ["包装方式", "包装和出运要求可在订单安排前确认。"]
        ]
      },
      forms: {
        eyebrow: "产品形式",
        title: "面向 UPS 电池生产的卷材和片材选择",
        items: [
          [
            "用于生产线的 AGM 隔板卷材",
            "卷材供应可支持 UPS 电池生产企业的连续上料、分切和生产计划。",
            "/images/viking-finished-separator-roll-900.webp",
            "用于 UPS 电池生产的 AGM 隔板卷材",
            900,
            675
          ],
          [
            "用于样品评估的 AGM 隔板片材",
            "预裁切片材可支持装配试样、样品对比和电池型号沟通。",
            "/images/sheets1-900.webp",
            "用于 UPS 电池样品评估的 AGM 隔板片材",
            900,
            675
          ],
          [
            "UPS 备用电源应用沟通",
            "用于 UPS 和后备电源电池隔板采购的应用图片位。",
            "/images/applications/ups-vrla-battery-application-1200.webp",
            "UPS VRLA 电池应用沟通",
            1200,
            900
          ],
          [
            "质量检测支持",
            "检测项目可在样品或订单安排前沟通确认。",
            "/images/evidence/quality-electrical-resistance-test-01.webp",
            "UPS 电池隔板电阻检测沟通",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "UPS 电池用途",
        title: "买家常见沟通的备用电源方向",
        items: ["UPS 后备电池", "备用电源系统", "数据中心后备电源", "安防和应急电源", "通信后备机柜", "工业控制备用电池"]
      },
      quality: {
        eyebrow: "质量关注点",
        title: "样品前应确认检测期望",
        text:
          "UPS 电池项目通常关注稳定的隔板参数和清晰的质量沟通。最终检测项目应以客户要求为准。",
        cards: [
          ["尺寸一致性", "厚度和宽度应根据约定要求评估。"],
          ["吸酸与电阻", "吸酸性能和电阻可结合测试条件沟通。"],
          ["样品对比", "现有样品、图纸或目标值有助于提高沟通准确性。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看 VRLA、产品和质量信息",
        items: [
          ["VRLA 电池应用", "/zh/applications/agm-separator-for-vrla-battery/"],
          ["AGM 隔板产品", "/zh/products/agm-separator/"],
          ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
          ["AGM 隔板片材", "/zh/products/agm-separator-sheets/"],
          ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 UPS 电池隔板需求",
        text:
          "先留下联系方式即可，我们会协助确认适合 UPS 或备用电池项目的 AGM 隔板规格。",
        checklist: ["UPS 或备用电池应用", "卷材或片材形式", "已有目标厚度或宽度", "样品或数量需求"],
        placeholder: "可选：UPS 电池类型、卷材或片材需求、样品数量、目标厚度或技术问题",
        submit: "提交联系方式",
        submitting: "发送中...",
        required: "请先填写姓名和微信或手机号。",
        success: "感谢您留下联系方式，我们会尽快联系您确认 AGM 隔板需求。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已为您打开邮件客户端并填入联系方式，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorMotorcycleApplication: {
    en: {
      homePath: "/",
      languagePath: "/zh/applications/agm-separator-for-motorcycle-battery/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "Motorcycle Battery Application",
        title: "AGM Separator for Motorcycle Starting Batteries",
        subtitle:
          "AGM separator discussion for compact motorcycle VRLA and starting battery production, including roll, sheet and sample requirements.",
        primary: "Discuss Motorcycle Battery Needs",
        secondary: "Send Contact Information",
        proof: ["Starting battery application", "Compact battery discussion", "Sample support"],
        image: {
          src: "/images/applications/motorcycle-vrla-battery-application-1200.webp",
          alt: "AGM separator discussion for motorcycle battery applications",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Application Focus",
        title: "Motorcycle batteries need separator discussion around compact structure",
        paragraphs: [
          "Motorcycle starting batteries often use compact internal structures and require separator discussion according to plate size, assembly method and battery model.",
          "For this application, buyers commonly discuss separator thickness, sheet size or roll width, handling performance, acid absorption and electrical resistance.",
          "If the final battery model is still under review, leave your contact first. We can help confirm what information is useful for sample or quotation discussion."
        ]
      },
      parameters: {
        eyebrow: "Specification Discussion",
        title: "Key points for motorcycle battery separator sourcing",
        text:
          "Motorcycle battery separator requirements should be reviewed with the customer battery model, plate design and assembly workflow.",
        items: [
          ["Sheet size or roll width", "Confirmed according to compact battery design and cutting workflow."],
          ["Thickness", "Reviewed with plate spacing, compression and assembly needs."],
          ["Handling strength", "Discussed for cutting, placement and production handling."],
          ["Acid absorption", "Confirmed according to battery design and customer testing method."],
          ["Electrical resistance", "Discussed with target performance and agreed test conditions."],
          ["Sample review", "Sample discussion can start before every parameter is finalized."]
        ]
      },
      forms: {
        eyebrow: "Product Format",
        title: "Separator forms for compact battery assembly",
        items: [
          [
            "Pre-cut sheets for assembly trials",
            "Sheet pieces can support motorcycle battery model review and sample assembly discussion.",
            "/images/sheets1-900.webp",
            "AGM separator sheets for motorcycle battery assembly",
            900,
            675
          ],
          [
            "Roll material for in-house cutting",
            "Roll supply can support customers who cut separator material according to battery model needs.",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM separator roll for motorcycle battery production",
            900,
            675
          ],
          [
            "Motorcycle starting battery application",
            "Application image slot for compact motorcycle VRLA battery separator sourcing.",
            "/images/applications/motorcycle-vrla-battery-application-1200.webp",
            "Motorcycle VRLA battery application discussion",
            1200,
            900
          ],
          [
            "Sheet edge and detail review",
            "Sheet details can be reviewed during sample and specification confirmation.",
            "/images/evidence/agm-separator-sheets-detail-01.webp",
            "AGM separator sheet detail for motorcycle battery discussion",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Motorcycle Battery Uses",
        title: "Common starting battery directions buyers discuss",
        items: ["Motorcycle starting batteries", "Scooter batteries", "Compact VRLA batteries", "Small engine batteries", "Replacement battery production", "Sample model development"]
      },
      quality: {
        eyebrow: "Quality Considerations",
        title: "Compact battery projects need careful size and handling review",
        text:
          "Motorcycle battery separator discussion often starts from dimensions, handling and sample confirmation. Final test items should follow customer requirements.",
        cards: [
          ["Dimension review", "Sheet height, width or roll width should match battery model needs."],
          ["Handling review", "Separator condition during cutting and assembly can be discussed."],
          ["Testing discussion", "Thickness, absorption and resistance can be reviewed with target requirements."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with VRLA, product and quality details",
        items: [
          ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"],
          ["AGM Separator Sheets", "/products/agm-separator-sheets/"],
          ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
          ["AGM Separator Product", "/products/agm-separator/"],
          ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your motorcycle battery separator needs",
        text:
          "Leave your contact first. We will help confirm the suitable AGM separator format for motorcycle battery production or samples.",
        checklist: ["Motorcycle battery model", "Sheet size or roll width if available", "Sample needs", "Production or trial quantity"],
        placeholder:
          "Optional: motorcycle battery model, sheet size, roll width, sample needs or technical questions",
        submit: "Send Contact",
        submitting: "Sending...",
        required: "Please leave your name and contact information before submitting.",
        success:
          "Thank you. We will contact you soon to confirm your AGM separator requirements.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the contact details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/applications/agm-separator-for-motorcycle-battery/",
      quote: "获取报价",
      hero: {
        eyebrow: "摩托车电池应用",
        title: "用于摩托车启动电池的 AGM 隔板",
        subtitle:
          "面向紧凑型摩托车 VRLA 电池和启动电池生产，沟通 AGM 隔板卷材、片材和样品需求。",
        primary: "沟通摩托车电池需求",
        secondary: "留下联系方式",
        proof: ["启动电池应用", "紧凑型电池沟通", "样品沟通支持"],
        image: {
          src: "/images/applications/motorcycle-vrla-battery-application-1200.webp",
          alt: "摩托车电池应用 AGM 隔板沟通",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "应用重点",
        title: "摩托车电池隔板沟通应关注紧凑结构",
        paragraphs: [
          "摩托车启动电池通常结构较紧凑，隔板需求应结合极板尺寸、装配方式和电池型号确认。",
          "该应用下，买家常沟通隔板厚度、片材尺寸或卷材宽度、操作性能、吸酸性能和电阻。",
          "如果最终电池型号仍在评估，也可以先留下联系方式。我们会协助确认样品或报价沟通需要哪些信息。"
        ]
      },
      parameters: {
        eyebrow: "规格沟通",
        title: "摩托车电池隔板采购的关键沟通点",
        text:
          "摩托车电池隔板要求应结合客户电池型号、极板设计和装配流程评估。",
        items: [
          ["片材尺寸或卷材宽度", "根据紧凑型电池设计和裁切流程确认。"],
          ["厚度", "结合极板间距、压缩和装配需求评估。"],
          ["操作强度", "围绕裁切、放置和生产操作进行沟通。"],
          ["吸酸性能", "根据电池设计和客户测试方法确认。"],
          ["电阻", "结合目标性能和约定测试条件沟通。"],
          ["样品评估", "即使参数未完全确定，也可以先开始样品沟通。"]
        ]
      },
      forms: {
        eyebrow: "产品形式",
        title: "面向紧凑型电池装配的隔板形式",
        items: [
          [
            "用于装配试样的预裁切片材",
            "片材可支持摩托车电池型号评估和样品装配沟通。",
            "/images/sheets1-900.webp",
            "用于摩托车电池装配的 AGM 隔板片材",
            900,
            675
          ],
          [
            "用于厂内裁切的卷材",
            "卷材供应可支持客户按电池型号自行裁切隔板材料。",
            "/images/viking-finished-separator-roll-900.webp",
            "用于摩托车电池生产的 AGM 隔板卷材",
            900,
            675
          ],
          [
            "摩托车启动电池应用",
            "用于紧凑型摩托车 VRLA 电池隔板采购的应用图片位。",
            "/images/applications/motorcycle-vrla-battery-application-1200.webp",
            "摩托车 VRLA 电池应用沟通",
            1200,
            900
          ],
          [
            "片材边缘与细节评估",
            "片材细节可在样品和规格确认时评估。",
            "/images/evidence/agm-separator-sheets-detail-01.webp",
            "摩托车电池隔板片材细节沟通",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "摩托车电池用途",
        title: "买家常见沟通的启动电池方向",
        items: ["摩托车启动电池", "踏板车电池", "紧凑型 VRLA 电池", "小型发动机电池", "替换电池生产", "样品型号开发"]
      },
      quality: {
        eyebrow: "质量关注点",
        title: "紧凑型电池项目需要关注尺寸和操作表现",
        text:
          "摩托车电池隔板沟通常从尺寸、操作和样品确认开始。最终检测项目应以客户要求为准。",
        cards: [
          ["尺寸评估", "片材高度、宽度或卷材宽度应匹配电池型号需求。"],
          ["操作评估", "可沟通隔板在裁切和装配过程中的状态。"],
          ["检测沟通", "厚度、吸酸和电阻可结合目标要求评估。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看 VRLA、产品和质量信息",
        items: [
          ["VRLA 电池应用", "/zh/applications/agm-separator-for-vrla-battery/"],
          ["AGM 隔板片材", "/zh/products/agm-separator-sheets/"],
          ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
          ["AGM 隔板产品", "/zh/products/agm-separator/"],
          ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送摩托车电池隔板需求",
        text:
          "先留下联系方式即可，我们会协助确认适合摩托车电池生产或样品的 AGM 隔板形式。",
        checklist: ["摩托车电池型号", "已有片材尺寸或卷材宽度", "样品需求", "试产或生产数量"],
        placeholder: "可选：摩托车电池型号、片材尺寸、卷材宽度、样品需求或技术问题",
        submit: "提交联系方式",
        submitting: "发送中...",
        required: "请先填写姓名和微信或手机号。",
        success: "感谢您留下联系方式，我们会尽快联系您确认 AGM 隔板需求。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已为您打开邮件客户端并填入联系方式，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorEnergyStorageApplication: {
    en: {
      homePath: "/",
      languagePath: "/zh/applications/agm-separator-for-energy-storage-battery/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "Energy Storage Battery Application",
        title: "AGM Separator for Lead-Acid Energy Storage Batteries",
        subtitle:
          "AGM separator discussion for lead-acid energy storage, backup power and reserve power VRLA battery projects.",
        primary: "Discuss Energy Storage Battery Needs",
        secondary: "Send Contact Information",
        proof: ["Backup energy storage", "Stable supply discussion", "Quality review support"],
        image: {
          src: "/images/applications/energy-storage-lead-acid-battery-application-1200.webp",
          alt: "AGM separator discussion for lead-acid energy storage battery applications",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Application Focus",
        title: "Energy storage battery projects need stable separator communication",
        paragraphs: [
          "Lead-acid energy storage and backup power battery projects often require repeated supply, stable specification communication and quality review before sample or order confirmation.",
          "Separator discussion should consider battery design, operating conditions, expected testing items and whether the customer needs roll material, sheet pieces or custom size support.",
          "If the target specification is not final, leave your contact first. We will help confirm the useful information for AGM separator sample or quotation discussion."
        ]
      },
      parameters: {
        eyebrow: "Specification Discussion",
        title: "Key points for energy storage battery separator sourcing",
        text:
          "Energy storage lead-acid battery projects should align separator requirements with battery structure, production workflow and customer quality expectations.",
        items: [
          ["Thickness and basis weight", "Reviewed with battery structure, compression and electrolyte retention needs."],
          ["Acid absorption", "Discussed according to customer testing method and battery design."],
          ["Electrical resistance", "Confirmed together with performance goals and agreed test conditions."],
          ["Consistency", "Important for buyers planning repeated or project-based supply."],
          ["Roll or sheet format", "Selected according to production workflow, cutting and assembly needs."],
          ["Packing and shipment", "Export packing and batch delivery requirements can be discussed before order."]
        ]
      },
      forms: {
        eyebrow: "Product Format",
        title: "Separator supply for backup and storage battery projects",
        items: [
          [
            "Roll supply for repeated production",
            "AGM separator rolls can support customers that need in-house cutting and steady production planning.",
            "/images/evidence/agm-separator-roll-warehouse-01.webp",
            "AGM separator roll supply for energy storage battery production",
            1200,
            900
          ],
          [
            "Sheet supply for samples and assembly",
            "Pre-cut sheets can support battery model review, sample comparison and trial assembly.",
            "/images/sheets1-900.webp",
            "AGM separator sheets for energy storage battery samples",
            900,
            675
          ],
          [
            "Energy storage battery application",
            "Application image slot for lead-acid energy storage and backup power battery separator sourcing.",
            "/images/applications/energy-storage-lead-acid-battery-application-1200.webp",
            "Lead-acid energy storage battery application discussion",
            1200,
            900
          ],
          [
            "Packing and shipment preparation",
            "Packing method and export shipment preparation can be discussed before order arrangement.",
            "/images/evidence/shipping-pallet-01.webp",
            "AGM separator packing for energy storage battery projects",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Energy Storage Uses",
        title: "Common backup and reserve power directions buyers discuss",
        items: ["Lead-acid energy storage batteries", "Backup power batteries", "Reserve power systems", "Telecom backup power", "Solar backup lead-acid batteries", "Industrial standby batteries"]
      },
      quality: {
        eyebrow: "Quality Considerations",
        title: "Stable supply should be supported by clear quality discussion",
        text:
          "Energy storage battery projects may require consistency across batches. Test items and acceptance values should be confirmed according to customer standards.",
        cards: [
          ["Lot-to-lot discussion", "Repeated supply should keep agreed specification communication clear."],
          ["Testing requirements", "Thickness, basis weight, absorption and resistance can be reviewed as required."],
          ["Delivery planning", "Packing, quantity and shipment schedule can be discussed with the order plan."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with VRLA, product and quality details",
        items: [
          ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"],
          ["AGM Separator Product", "/products/agm-separator/"],
          ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
          ["AGM Separator Sheets", "/products/agm-separator-sheets/"],
          ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your energy storage battery separator needs",
        text:
          "Leave your contact first. We will help confirm the suitable AGM separator specification for lead-acid energy storage or backup power projects.",
        checklist: ["Energy storage or backup power application", "Roll or sheet format", "Target specification if available", "Sample or order planning needs"],
        placeholder:
          "Optional: energy storage battery application, roll or sheet need, sample quantity, target specification or technical questions",
        submit: "Send Contact",
        submitting: "Sending...",
        required: "Please leave your name and contact information before submitting.",
        success:
          "Thank you. We will contact you soon to confirm your AGM separator requirements.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the contact details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/applications/agm-separator-for-energy-storage-battery/",
      quote: "获取报价",
      hero: {
        eyebrow: "储能电池应用",
        title: "用于铅酸储能电池的 AGM 隔板",
        subtitle:
          "面向铅酸储能、后备电源和备用电源 VRLA 电池项目，沟通 AGM 隔板卷材、片材和规格要求。",
        primary: "沟通储能电池需求",
        secondary: "留下联系方式",
        proof: ["后备储能应用", "稳定供应沟通", "质量评估支持"],
        image: {
          src: "/images/applications/energy-storage-lead-acid-battery-application-1200.webp",
          alt: "铅酸储能电池应用 AGM 隔板沟通",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "应用重点",
        title: "储能电池项目需要稳定的隔板规格沟通",
        paragraphs: [
          "铅酸储能和后备电源电池项目通常关注持续供货、稳定规格沟通和样品或订单前的质量评估。",
          "隔板沟通应结合电池设计、使用条件、预期检测项目，以及客户需要卷材、片材还是定制尺寸支持。",
          "如果目标规格还未最终确定，也可以先留下联系方式。我们会协助确认 AGM 隔板样品或报价沟通所需信息。"
        ]
      },
      parameters: {
        eyebrow: "规格沟通",
        title: "储能电池隔板采购的关键沟通点",
        text:
          "铅酸储能电池项目应结合电池结构、生产流程和客户质量期望确认隔板要求。",
        items: [
          ["厚度和克重", "结合电池结构、压缩和电解液保持需求评估。"],
          ["吸酸性能", "根据客户测试方法和电池设计沟通。"],
          ["电阻", "结合性能目标和约定测试条件确认。"],
          ["一致性", "对项目型或重复供应买家较为重要。"],
          ["卷材或片材形式", "根据生产流程、裁切和装配需求选择。"],
          ["包装和出运", "出口包装和批量交付要求可在订单前沟通。"]
        ]
      },
      forms: {
        eyebrow: "产品形式",
        title: "面向后备和储能电池项目的隔板供应",
        items: [
          [
            "面向持续生产的卷材供应",
            "AGM 隔板卷材可支持需要厂内裁切和稳定生产计划的客户。",
            "/images/evidence/agm-separator-roll-warehouse-01.webp",
            "用于储能电池生产的 AGM 隔板卷材供应",
            1200,
            900
          ],
          [
            "面向样品和装配的片材供应",
            "预裁切片材可支持电池型号评估、样品对比和试装配。",
            "/images/sheets1-900.webp",
            "用于储能电池样品的 AGM 隔板片材",
            900,
            675
          ],
          [
            "储能电池应用",
            "用于铅酸储能和后备电源电池隔板采购的应用图片位。",
            "/images/applications/energy-storage-lead-acid-battery-application-1200.webp",
            "铅酸储能电池应用沟通",
            1200,
            900
          ],
          [
            "包装与出运准备",
            "包装方式和出口发运准备可在订单安排前沟通。",
            "/images/evidence/shipping-pallet-01.webp",
            "储能电池项目 AGM 隔板包装",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "储能电池用途",
        title: "买家常见沟通的后备和备用电源方向",
        items: ["铅酸储能电池", "后备电源电池", "备用电源系统", "通信后备电源", "太阳能后备铅酸电池", "工业备用电池"]
      },
      quality: {
        eyebrow: "质量关注点",
        title: "稳定供应需要清晰的质量沟通支持",
        text:
          "储能电池项目可能关注不同批次的一致性。测试项目和验收值应根据客户标准确认。",
        cards: [
          ["批次沟通", "重复供应应保持约定规格沟通清晰。"],
          ["检测要求", "厚度、克重、吸酸和电阻可按要求评估。"],
          ["交付计划", "包装、数量和发运周期可结合订单计划沟通。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看 VRLA、产品和质量信息",
        items: [
          ["VRLA 电池应用", "/zh/applications/agm-separator-for-vrla-battery/"],
          ["AGM 隔板产品", "/zh/products/agm-separator/"],
          ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
          ["AGM 隔板片材", "/zh/products/agm-separator-sheets/"],
          ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送储能电池隔板需求",
        text:
          "先留下联系方式即可，我们会协助确认适合铅酸储能或后备电源项目的 AGM 隔板规格。",
        checklist: ["储能或后备电源应用", "卷材或片材形式", "已有目标规格", "样品或订单计划"],
        placeholder: "可选：储能电池应用、卷材或片材需求、样品数量、目标规格或技术问题",
        submit: "提交联系方式",
        submitting: "发送中...",
        required: "请先填写姓名和微信或手机号。",
        success: "感谢您留下联系方式，我们会尽快联系您确认 AGM 隔板需求。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已为您打开邮件客户端并填入联系方式，请发送邮件完成询盘。"
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
          ],
          [
            "Thickness testing",
            "Additional evidence slot for thickness measurement and dimensional stability review.",
            "/images/evidence/quality-thickness-test-01.webp",
            "AGM separator thickness testing",
            1200,
            900
          ],
          [
            "Basis weight testing",
            "Additional evidence slot for basis weight, sample weight and batch consistency review.",
            "/images/evidence/quality-basis-weight-test-01.webp",
            "AGM separator basis weight testing",
            1200,
            900
          ],
          [
            "Acid absorption testing",
            "Additional evidence slot for acid absorption behavior and electrolyte-retention discussion.",
            "/images/evidence/quality-acid-absorption-test-01.webp",
            "AGM separator acid absorption testing",
            1200,
            900
          ],
          [
            "Electrical resistance testing",
            "Additional evidence slot for resistance testing and battery performance requirement review.",
            "/images/evidence/quality-electrical-resistance-test-01.webp",
            "AGM separator electrical resistance testing",
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
          ],
          [
            "厚度检测",
            "新增证据图片位，用于展示厚度测量和尺寸稳定性评估。",
            "/images/evidence/quality-thickness-test-01.webp",
            "AGM 隔板厚度检测",
            1200,
            900
          ],
          [
            "克重检测",
            "新增证据图片位，用于展示克重、样品称量和批次一致性评估。",
            "/images/evidence/quality-basis-weight-test-01.webp",
            "AGM 隔板克重检测",
            1200,
            900
          ],
          [
            "吸酸测试",
            "新增证据图片位，用于展示吸酸表现和电解液保持能力沟通。",
            "/images/evidence/quality-acid-absorption-test-01.webp",
            "AGM 隔板吸酸测试",
            1200,
            900
          ],
          [
            "电阻测试",
            "新增证据图片位，用于展示电阻测试和电池性能要求评估。",
            "/images/evidence/quality-electrical-resistance-test-01.webp",
            "AGM 隔板电阻测试",
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
  const t = productContent(page, lang, content[page][lang]);
  const ui = sharedMessages[lang];
  const lead = leadCaptureCopy[lang];
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
    const required = ["name", "contact"];
    const valid = required.every((field) =>
      String(formData.get(field) || "").trim()
    );

    if (!valid) {
      setFormState("error");
      return;
    }

    formData.set("form-name", "inquiry");
    formData.set("language", lang);
    formData.set("page_url", window.location.href);

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
            <p className="mt-5 inline-flex max-w-2xl items-center gap-2 rounded-md border border-signal/15 bg-white/86 px-4 py-3 text-sm font-bold leading-6 text-graphite shadow-sm">
              <CheckIcon size={17} className="shrink-0 text-signal" />
              {lead.heroPrompt}
            </p>
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

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {lead.faqEyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {lead.faqTitle}
            </h2>
          </div>
          <div className="grid gap-4">
            {lead.faq.map(([question, answer]) => (
              <article key={question} className="rounded-md border border-line bg-white p-5">
                <h3 className="font-bold text-ink">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{answer}</p>
              </article>
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
              {lead.formText}
            </p>
            <div className="mt-8 grid gap-3">
              {lead.checklist.map((item) => (
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
            action={asset(formEndpoint)}
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
              <label className="grid gap-2">
                <span className="font-bold">{ui.fields.name}</span>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder={ui.placeholders.name}
                  className="rounded-md border border-line bg-frost px-4 py-3 outline-none transition focus:border-signal focus:bg-white"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-bold">{ui.fields.contact}</span>
                <input
                  required
                  name="contact"
                  type="text"
                  placeholder={ui.placeholders.contact}
                  className="rounded-md border border-line bg-frost px-4 py-3 outline-none transition focus:border-signal focus:bg-white"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-bold">{ui.fields.company}</span>
                <input
                  name="company"
                  type="text"
                  placeholder={ui.placeholders.company}
                  className="rounded-md border border-line bg-frost px-4 py-3 outline-none transition focus:border-signal focus:bg-white"
                />
              </label>
            </div>
            <label className="mt-5 grid gap-2">
              <span className="font-bold">{ui.fields.interestedProduct}</span>
              <input
                name="interestedProduct"
                type="text"
                placeholder={ui.placeholders.interestedProduct}
                className="rounded-md border border-line bg-frost px-4 py-3 outline-none transition focus:border-signal focus:bg-white"
              />
            </label>
            <label className="mt-5 grid gap-2">
              <span className="font-bold">{ui.fields.message}</span>
              <textarea
                name="message"
                rows={6}
                placeholder={lead.messagePlaceholder}
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
                  ? lead.success
                  : formState === "emailFallback"
                    ? lead.emailFallback
                    : formState === "error"
                      ? lead.required
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
            <p
              id="wechat-qr"
              className="mt-3 scroll-mt-28 text-center text-sm font-semibold text-ink"
            >
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
        <div>
          © 2026 Hubei Viking Technology Co., Ltd. {lang === "zh" ? "保留所有权利。" : "All rights reserved."}
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

  function scrollToWechat() {
    document.getElementById("wechat-qr")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2 sm:bottom-8 sm:right-6">
      <button
        type="button"
        aria-label={ui.openWechat}
        onClick={scrollToWechat}
        className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-signal text-white shadow-industrial transition hover:bg-ink"
      >
        <span className="text-xs font-black">微</span>
        <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-bold text-white shadow-sm group-hover:block group-focus:block">
          {ui.openWechat}
        </span>
      </button>
      <button
        type="button"
        aria-label={`${ui.copyPhone}: ${contactInfo.phone}`}
        onClick={() => copyValue("phone", contactInfo.phone)}
        className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-signal text-white shadow-industrial transition hover:bg-ink"
      >
        <PhoneIcon />
        <span
          className={`pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-bold text-white shadow-sm ${
            copied === "phone" ? "block" : "hidden group-hover:block group-focus:block"
          }`}
        >
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
        <span
          className={`pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-bold text-white shadow-sm ${
            copied === "email" ? "block" : "hidden group-hover:block group-focus:block"
          }`}
        >
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
          contact: "联系方式",
          company: "公司",
          interestedProduct: "感兴趣产品",
          message: "留言"
        }
      : {
          subject: "Viking AGM website inquiry",
          name: "Name",
          contact: "Contact",
          company: "Company",
          interestedProduct: "Interested product",
          message: "Message"
        };
  const lines = [
    `${labels.name}: ${formData.get("name") || ""}`,
    `${labels.contact}: ${formData.get("contact") || ""}`,
    `${labels.company}: ${formData.get("company") || ""}`,
    `${labels.interestedProduct}: ${formData.get("interestedProduct") || ""}`,
    `${labels.message}: ${formData.get("message") || ""}`
  ];

  return `mailto:${inquiryEmail}?subject=${encodeURIComponent(
    labels.subject
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}
