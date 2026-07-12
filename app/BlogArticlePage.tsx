"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { articleContent } from "./cms-content";
import { SiteHeader } from "./SiteHeader";
import type { Lang } from "./VikingHome";

type IconProps = { size?: number; className?: string };
type BlogArticleKind =
  | "whatIsAgmSeparator"
  | "keyTechnicalParameters"
  | "howToChooseAgmSeparator"
  | "agmSeparatorManufacturingQualityDelivery"
  | "agmSeparatorPerformanceConsistency"
  | "agmSeparatorExportSupplyReadiness";
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
const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/inquiry";
const staticFormFallback =
  process.env.NEXT_PUBLIC_STATIC_FORM_FALLBACK === "true";
const inquiryEmail =
  process.env.NEXT_PUBLIC_INQUIRY_EMAIL || contactInfo.email;

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
  lang: Lang;
  page?: BlogArticleKind;
}) {
  const [formState, setFormState] = useState<
    "idle" | "error" | "success" | "failure" | "emailFallback"
  >("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const defaultArticle =
    page === "keyTechnicalParameters"
      ? keyTechnicalCopy[lang]
      : page === "howToChooseAgmSeparator"
        ? howToChooseCopy[lang]
        : page === "agmSeparatorManufacturingQualityDelivery"
          ? manufacturingDeliveryCopy[lang]
          : page === "agmSeparatorPerformanceConsistency"
            ? performanceConsistencyCopy[lang]
            : page === "agmSeparatorExportSupplyReadiness"
              ? exportSupplyReadinessCopy[lang]
          : articleCopy[lang];
  const sourceNote =
    page === "agmSeparatorExportSupplyReadiness"
      ? exportSupplySourceCopy[lang]
      : null;
  const t = articleContent(page, lang, defaultArticle);
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
      : ["definition", "function", "parameters"];
  const heroImage =
    "image" in t.hero
      ? t.hero.image
      : {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "Finished AGM separator roll",
          width: 900,
          height: 675
        };

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("form-name", "inquiry");
    formData.set("language", lang);
    formData.set("page_url", window.location.href);
    const required = ["name", "company", "email", "country", "application"];
    const missingRequired = required.some(
      (field) => !String(formData.get(field) || "").trim()
    );

    if (missingRequired) {
      setFormState("error");
      return;
    }

    setIsSubmitting(true);
    setFormState("idle");

    try {
      if (staticFormFallback) {
        const mailto = buildInquiryMailto(formData, lang);
        window.location.href = mailto;
        setFormState("emailFallback");
        form.reset();
        return;
      }

      const response = await fetch(asset(formEndpoint), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(formData as unknown as Record<string, string>)
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setFormState("success");
      form.reset();
    } catch {
      try {
        const mailto = buildInquiryMailto(formData, lang);
        window.location.href = mailto;
        setFormState("emailFallback");
        form.reset();
      } catch {
        setFormState("failure");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-frost text-ink">
      <SiteHeader
        lang={lang}
        homePath={t.homePath}
        languagePath={t.languagePath}
        quoteLabel={t.quote}
      />

      <section className="relative overflow-hidden bg-white px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,110,184,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f5f7fa_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-line bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-signal shadow-sm">
              <Factory size={17} />
              {t.hero.eyebrow}
            </div>
            <h1 className="mt-8 text-5xl font-black leading-[0.98] tracking-normal text-ink sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-ink"
              >
                {t.hero.primary}
                <Send size={18} />
              </a>
              <a
                href="#buyer-checklist"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-6 py-3.5 text-base font-semibold text-ink transition hover:border-signal hover:text-signal"
              >
                {t.hero.secondary}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-md bg-white shadow-industrial">
            <Image
              src={asset(heroImage.src)}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-md border border-line bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
                {lang === "zh" ? "文章目录" : "Article Contents"}
              </p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-graphite">
                {[
                  ...t.sections.map((section, index) => [
                    section.eyebrow,
                    `#${sectionIds[index]}`
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

          <article className="rounded-md border border-line bg-white p-6 shadow-industrial sm:p-10">
            <div className="grid gap-5 text-lg leading-9 text-graphite">
              {t.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-10">
              {t.sections.map((section, index) => (
                <section
                  key={section.eyebrow}
                  id={sectionIds[index]}
                  className="scroll-mt-28 border-t border-line pt-10"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-ink">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-steel">{section.text}</p>
                </section>
              ))}
            </div>

            {page === "keyTechnicalParameters" ? (
              <div className="mt-8 overflow-hidden rounded-md border border-line">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-frost text-ink">
                    <tr>
                      <th className="w-1/3 px-4 py-3 font-bold">
                        {lang === "zh" ? "参数" : "Parameter"}
                      </th>
                      <th className="px-4 py-3 font-bold">
                        {lang === "zh" ? "买家沟通重点" : "Buyer-friendly meaning"}
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
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
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

          <form
            name="inquiry"
            method="POST"
            action={asset(formEndpoint)}
            onSubmit={submitInquiry}
            className="rounded-md bg-white p-5 text-ink shadow-industrial sm:p-7"
          >
            <input type="hidden" name="form-name" value="inquiry" />
            <input type="hidden" name="language" value={lang} />
            <p className="hidden">
              <label>
                Do not fill this out:
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="name" label={t.inquiry.fields.name} placeholder={t.inquiry.placeholders.name} required />
              <Input name="company" label={t.inquiry.fields.company} placeholder={t.inquiry.placeholders.company} required />
              <Input name="email" type="email" label={t.inquiry.fields.email} placeholder={t.inquiry.placeholders.email} required />
              <Input name="country" label={t.inquiry.fields.country} placeholder={t.inquiry.placeholders.country} required />
              <div className="sm:col-span-2">
                <Input
                  name="application"
                  label={t.inquiry.fields.application}
                  placeholder={t.inquiry.placeholders.application}
                  required
                />
              </div>
              <label className="sm:col-span-2">
                <span className="text-sm font-bold text-graphite">
                  {t.inquiry.fields.message}
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder={t.inquiry.placeholders.message}
                  className="mt-2 w-full resize-none rounded-md border border-line bg-frost px-4 py-3 text-sm outline-none transition placeholder:text-steel/70 focus:border-signal focus:bg-white"
                />
              </label>
            </div>

            {formState !== "idle" && (
              <div
                aria-live="polite"
                className={`mt-5 rounded-md px-4 py-3 text-sm font-semibold ${
                  formState === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : formState === "failure"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-amber-50 text-amber-800"
                }`}
              >
                {formState === "success"
                  ? t.inquiry.success
                  : formState === "failure"
                    ? t.inquiry.failure
                    : formState === "emailFallback"
                      ? t.inquiry.emailFallback
                      : t.inquiry.required}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 text-base font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-steel sm:w-auto"
            >
              {isSubmitting ? t.inquiry.submitting : t.inquiry.submit}
              <Send size={18} />
            </button>
          </form>
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
            <div className="mt-6 grid max-w-md gap-4 sm:grid-cols-2">
              {[
                [t.footer.wechat, "/images/qrcode_for_logo.jpg"],
                [t.footer.mobile, "/images/website-logo-180.webp"]
              ].map(([label, src]) => (
                <div key={label} className="rounded-md border border-line bg-frost p-4">
                  <Image
                    src={asset(src)}
                    alt={label}
                    width={180}
                    height={180}
                    loading="lazy"
                    className="mx-auto h-28 w-28 rounded-sm bg-white object-contain"
                  />
                  <p className="mt-3 text-center text-sm font-semibold leading-6 text-graphite">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [lang === "zh" ? "公司" : "Company", [t.nav.company, t.nav.quality]],
              [lang === "zh" ? "产品" : "Products", [t.formats.items[0][0], t.formats.items[1][0]]],
              [lang === "zh" ? "资料" : "Resources", [t.hero.title, t.checklist.title]],
              [lang === "zh" ? "联系" : "Contact", [t.quote, t.inquiry.title]]
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

function Input({
  name,
  label,
  placeholder,
  type = "text",
  required = false
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-sm font-bold text-graphite">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-line bg-frost px-4 py-3 text-sm outline-none transition placeholder:text-steel/70 focus:border-signal focus:bg-white"
      />
    </label>
  );
}

function QuickContactDock({ lang }: { lang: Lang }) {
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
          copied: "已复制"
        }
      : {
          phone: "TEL",
          email: "E-mail",
          copyPhone: "Copy phone",
          copyEmail: "Copy email",
          backTop: "Back to top",
          copied: "Copied"
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
      window.prompt("Copy this contact detail:", value);
      return;
    }

    setCopiedContact(id);
    window.setTimeout(() => {
      setCopiedContact((current) => (current === id ? null : current));
    }, 1800);
  }

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
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
  lang: Lang;
}) {
  const [copied, setCopied] = useState(false);
  const copiedLabel = lang === "zh" ? "已复制" : "Copied";

  async function copyValue() {
    const didCopy = await copyToClipboard(value);

    if (!didCopy) {
      window.prompt("Copy this contact detail:", value);
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
      aria-label={`Copy ${label}: ${value}`}
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

function buildInquiryMailto(formData: FormData, lang: Lang) {
  const labels =
    lang === "zh"
      ? {
          subject: "AGM 隔板资料询盘 - 湖北维京AGM",
          name: "姓名",
          company: "公司",
          email: "邮箱",
          country: "国家/地区",
          application: "电池应用",
          message: "留言"
        }
      : {
          subject: "AGM separator guide inquiry - Viking AGM",
          name: "Name",
          company: "Company",
          email: "Email",
          country: "Country / region",
          application: "Battery application",
          message: "Message"
        };
  const fields = [
    ["name", labels.name],
    ["company", labels.company],
    ["email", labels.email],
    ["country", labels.country],
    ["application", labels.application],
    ["message", labels.message]
  ] as const;
  const body = fields
    .map(([key, label]) => `${label}: ${String(formData.get(key) || "").trim()}`)
    .join("\n");

  return `mailto:${inquiryEmail}?subject=${encodeURIComponent(
    labels.subject
  )}&body=${encodeURIComponent(body)}`;
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
