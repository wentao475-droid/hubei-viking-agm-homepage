"use client";

import Image from "next/image";
import { useState } from "react";
import { articleContent } from "./cms-content";
import { InquiryForm } from "./InquiryForm";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";
import type { Lang } from "./VikingHome";

type IconProps = { size?: number; className?: string };
type BlogArticleKind =
  | "whatIsAgmSeparator"
  | "keyTechnicalParameters"
  | "howToChooseAgmSeparator"
  | "agmSeparatorManufacturingQualityDelivery"
  | "agmSeparatorPerformanceConsistency"
  | "agmSeparatorExportSupplyReadiness"
  | "upsVrlaTechnologySelection"
  | "agmGlassFiberVsPvcSeparator";
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
          "Amer-Sil: Industrial lead-acid battery separators",
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
          "Amer-Sil：工业铅酸电池隔板",
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
              : page === "upsVrlaTechnologySelection"
                ? upsVrlaTechnologySelectionCopy[lang]
                : page === "agmGlassFiberVsPvcSeparator"
                  ? agmGlassFiberVsPvcSeparatorCopy[lang]
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
              : page === "upsVrlaTechnologySelection"
                ? ["mature-system", "system-fit", "operational-stability", "separator-role", "procurement-review", "viking-coordination"]
                : page === "agmGlassFiberVsPvcSeparator"
                  ? ["electrolyte-management", "agm-structure", "pvc-profile", "replacement-boundary", "buyer-review", "viking-coordination"]
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

  return (
    <main className="min-h-screen bg-frost text-ink">
      <SiteHeader
        lang={lang}
        homePath={t.homePath}
        languagePath={t.languagePath}
        quoteLabel={lang === "zh" ? "申请样品" : "Request Sample"}
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
                {lang === "zh"
                  ? "申请样品与规格匹配"
                  : "Request a Sample & Specification Match"}
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
                  ...("comparison" in t
                    ? [[t.comparison.eyebrow, "#comparison"]]
                    : []),
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

            {"comparison" in t && (
              <section
                id="comparison"
                className="mt-10 scroll-mt-28 border-t border-line pt-10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
                  {t.comparison.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-ink">
                  {t.comparison.title}
                </h2>

                <div className="mt-7 hidden overflow-hidden rounded-md border border-line md:block">
                  <table className="w-full table-fixed border-collapse text-left text-sm">
                    <thead className="bg-ink text-white">
                      <tr>
                        {t.comparison.columns.map((column, index) => (
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
                      {t.comparison.rows.map(([point, agm, pvc]) => (
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
                  {t.comparison.rows.map(([point, agm, pvc]) => (
                    <article
                      key={point}
                      className="rounded-md border border-line bg-frost p-5"
                    >
                      <h3 className="font-bold text-ink">{point}</h3>
                      <dl className="mt-4 grid gap-4">
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
                            {t.comparison.columns[1]}
                          </dt>
                          <dd className="mt-2 text-sm leading-6 text-steel">{agm}</dd>
                        </div>
                        <div className="border-t border-line pt-4">
                          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
                            {t.comparison.columns[2]}
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
        <div
          className={`mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 ${
            page === "upsVrlaTechnologySelection" ? "lg:grid-cols-3" : ""
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
        {"references" in t && (
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

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          <a
            href={asset(
              lang === "zh"
                ? "/zh/request-agm-separator-sample/"
                : "/request-agm-separator-sample/"
            )}
            className="group rounded-md border border-signal/25 bg-signal p-6 text-white shadow-sm transition hover:bg-ink"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
              {lang === "zh" ? "采购下一步" : "Sourcing Next Step"}
            </p>
            <h2 className="mt-3 text-xl font-bold">
              {lang === "zh"
                ? "申请样品与规格匹配"
                : "Request a Sample & Specification Match"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/75">
              {lang === "zh"
                ? "按清单提供电池应用、产品形式和已有尺寸，开始样品沟通。"
                : "Use the buyer checklist to share your application, product form and available dimensions."}
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
              {lang === "zh" ? "技术资料" : "Technical Reference"}
            </p>
            <h2 className="mt-3 text-xl font-bold">
              {lang === "zh"
                ? "下载维京 AGM 技术能力 PDF"
                : "Download the Viking AGM Capability PDF"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              {lang === "zh"
                ? "查看产品形式、质量检查、包装和规格沟通要点。"
                : "Review product forms, quality checks, packing and specification information."}
            </p>
            <ArrowRight
              size={18}
              className="mt-5 text-signal transition group-hover:translate-x-1"
            />
          </a>
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

          <InquiryForm
            lang={lang}
            defaultInterestedProduct={
              lang === "zh"
                ? "AGM 隔板样品与规格匹配"
                : "AGM separator sample and specification match"
            }
            messagePlaceholder={t.inquiry.placeholders.message}
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
