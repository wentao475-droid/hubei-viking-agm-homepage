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
  | "howToChooseAgmSeparator";
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
  phone: "18171518528",
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
        : articleCopy[lang];
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
