"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { homeContent } from "./cms-content";
import { InquiryForm } from "./InquiryForm";
import type { Lang, SiteLocale } from "./locales";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";

export type { Lang } from "./locales";
type IconProps = { size?: number; className?: string };
type IconName =
  | "arrow"
  | "badge"
  | "check"
  | "clipboard"
  | "factory"
  | "flask"
  | "globe"
  | "layers"
  | "mail"
  | "menu"
  | "package"
  | "phone"
  | "play"
  | "send"
  | "shield"
  | "top"
  | "truck"
  | "x";
type FooterLink = readonly [string, string];

const baseCopy = {
  en: {
    nav: {
      company: "Company",
      products: "Products",
      applications: "Applications",
      quality: "Quality",
      contact: "Contact"
    },
    language: "中文",
    hero: {
      badge: "Hubei Viking Technology Co., Ltd.",
      title: [
        "Professional AGM Glass Fiber",
        "Separator Manufacturer"
      ],
      subtitle:
        "Focused manufacturing and stable supply of AGM glass fiber separators for lead-acid battery producers.",
      quote: "Request a Quote",
      products: "View Products",
      proof: ["AGM glass fiber separator", "Process-controlled production", "Export-ready supply"],
      image: {
        src: "/images/agm-hero-production-1600.webp",
        alt: "AGM separator production line",
        width: 1600,
        height: 1000
      }
    },
    video: {
      eyebrow: "Factory Overview",
      title: "Watch the 1-minute Viking AGM factory overview",
      text:
        "A quick look at AGM separator production, roll handling, quality control and packing scenes for buyer review.",
      duration: "1 min factory video",
      play: "Play video",
      close: "Close video",
      aria: "Play Viking AGM factory overview video"
    },
    stats: [
      { value: "AGM", label: "Glass fiber separator manufacturing" },
      { value: "OEM", label: "Custom roll and sheet discussion" },
      { value: "QC", label: "Inspection and process follow-up" }
    ],
    company: {
      eyebrow: "Company at a Glance",
      title: "A technology-driven AGM separator manufacturer in Hubei",
      text: [
        "Hubei Viking Technology Co., Ltd. was established in December 2015 with registered capital of RMB 30 million. The company is located in Ezhou Economic and Technological Development Zone, Hubei Province, covering about 65 mu, and focuses on the research, production and sales of ultra-fine glass fiber separators.",
        "The company mainly produces AGM separator products, with an annual capacity of about 4,000 tons. It operates multiple advanced AGM separator production lines in China and is equipped with process control, inspection and quality management systems.",
        "Viking Technology has passed ISO9001:2015 quality management system certification. Products can be customized according to customer requirements and are widely used in lead-acid battery applications."
      ],
      imageLabel: "Hubei Viking Technology office and manufacturing base",
      image: {
        src: "/images/viking-company-building-900.webp",
        alt: "Hubei Viking Technology office and manufacturing base",
        width: 900,
        height: 675
      },
      cards: [
        ["Established in 2015", "Registered capital of RMB 30 million and a long-term focus on AGM separator manufacturing."],
        ["65 mu production site", "Located in Ezhou Economic and Technological Development Zone, Hubei Province."],
        ["About 4,000 tons annual capacity", "Multiple AGM separator production lines support stable batch supply."],
        ["ISO9001:2015 certified", "Quality management system certification supports customer supplier review."],
        ["Custom production", "Separator products can be produced according to customer specifications and application needs."]
      ]
    },
    values: {
      eyebrow: "Product Value",
      title: "Engineered for consistent battery performance",
      text:
        "Our AGM separators are developed for stable absorption, reliable compression behavior and repeatable performance, supported by process control from raw material review to finished-product release.",
      items: [
        ["High Absorption", "Fast electrolyte uptake with uniform retention across the separator web."],
        ["Low Electrical Resistance", "Designed to support efficient current flow and battery performance."],
        ["Stable Thickness", "Controlled caliper consistency for reliable plate assembly and compression."],
        ["Strong Tensile Strength", "Robust handling performance for converting, cutting and assembly lines."],
        ["Consistent Quality", "Lot-to-lot control for customers requiring dependable mass production supply."]
      ],
      images: [
        ["Finished separator roll", "AGM separator rolls prepared for battery production and converting lines.", "/images/viking-finished-separator-roll-900.webp"],
        ["Separator sheets", "Precision-cut separator sheets for specification review and sample discussion.", "/images/viking-separator-sheets-900.webp"]
      ]
    },
    applications: {
      eyebrow: "Applications",
      title: "Supplying separator material for major lead-acid battery segments",
      items: [
        "VRLA Batteries",
        "UPS Batteries",
        "Motorcycle Batteries",
        "Automotive Batteries",
        "Energy Storage Systems"
      ]
    },
    factory: {
      eyebrow: "Manufacturing Capability",
      title: "Production evidence buyers can inspect",
      text:
        "Workshop equipment, line-side monitoring and roll handling capabilities give overseas customers a clear view of how separator material is produced, checked and prepared for shipment.",
      items: [
        ["Roll-to-roll production", "Manufacturing scenes support discussions around continuous separator supply."],
        ["Line-side monitoring", "Equipment and production readings make process follow-up more concrete."],
        ["Packaging and shipment", "Finished rolls can be discussed by size, packing method and export schedule."],
        ["Custom specifications", "Thickness, width, roll format and application-oriented requirements can be reviewed."]
      ],
      image: {
        src: "/images/agm-factory-capability-1200.webp",
        alt: "AGM separator manufacturing floor",
        width: 1200,
        height: 900
      }
    },
    process: {
      eyebrow: "Manufacturing Process",
      title: "From raw material selection to customer follow-up",
      text:
        "The manufacturing workflow connects raw material selection, pulp preparation, forming, inspection, quality analysis and customer follow-up in one controlled process.",
      steps: [
        "Raw material selection",
        "Incoming inspection",
        "Fiber and water treatment",
        "Pulp preparation",
        "Forming, drying and compounding",
        "Slitting and fixing",
        "Quality analysis",
        "Product release",
        "Customer follow-up"
      ],
      image: {
        src: "/images/manufacturing-process-1400.webp",
        alt: "AGM separator manufacturing process flowchart",
        width: 1400,
        height: 1000
      }
    },
    quality: {
      eyebrow: "Quality Control",
      title: "Certificate, inspection and release workflow",
      text:
        "Quality assurance is presented as a closed loop: documented qualifications, process inspection, finished-product analysis, release control and customer feedback.",
      items: [
        "Certificate materials available for review",
        "Incoming and in-process checks",
        "Finished-product quality analysis",
        "Release and customer follow-up"
      ],
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "AGM separator quality control testing",
        width: 1200,
        height: 900
      }
    },
    certifications: {
      eyebrow: "Certifications & Compliance",
      title: "Qualification materials for buyer due diligence",
      text:
        "Business license and certification materials are available for buyer review. Detailed certificate names, numbers and validity dates can be confirmed with the original documents on request.",
      items: [
        "Business license material",
        "Management-system certification material",
        "Product or enterprise recognition material",
        "Detailed documents available on request"
      ],
      note: "Original documents can be provided for certificate detail confirmation during supplier review."
    },
    why: {
      eyebrow: "Why Choose Us",
      title: "A practical manufacturing partner for overseas battery companies",
      items: [
        ["Experienced manufacturer", "Focused on AGM separator materials for lead-acid battery applications."],
        ["Stable lead time", "Production and packing schedules aligned with repeat export orders."],
        ["OEM / custom support", "Specification discussion for battery type, process needs and roll formats."],
        ["Export-ready communication", "Clear technical and commercial responses for international buyers."]
      ]
    },
    form: {
        eyebrow: "Inquiry",
        title: "Leave Your Contact",
        text:
          "Leave your contact information first. Our team will follow up for thickness, width, quantity and application details.",
        hints: [
          "Email, WhatsApp or phone is enough to start",
          "Our team will help confirm the right specification",
          "Thickness, width and quantity can be discussed later"
        ],
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
        interestedProduct: "AGM separator rolls, sheets, or not sure yet",
        message: "Optional: battery application, quantity, sample needs or technical questions"
      },
      submit: "Send Contact",
      submitting: "Sending...",
      success:
        "Thank you. We will contact you soon to confirm your AGM separator requirements.",
      required: "Please leave your name and contact information before submitting.",
      emailFallback:
        "Your email client has been opened with the contact details. Please send the email to complete your inquiry.",
      failure:
        "Sorry, the inquiry could not be sent right now. Please try again later."
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common questions before requesting AGM separator support",
      items: [
        [
          "Can you customize AGM separator thickness or width?",
          "Yes. Thickness, width, roll format and sheet size can be discussed according to the customer battery design and production process."
        ],
        [
          "Do you provide samples before bulk orders?",
          "Sample discussion is available after confirming the product form, target application and basic specification direction."
        ],
        [
          "Which battery applications do your AGM separators support?",
          "Our AGM glass fiber separators are discussed for VRLA, UPS, motorcycle, automotive and energy storage lead-acid battery applications."
        ],
        [
          "What information should I send for a quotation?",
          "Battery application, roll or sheet format, target thickness, width or sheet size, estimated quantity and test requirements are helpful."
        ]
      ]
    },
    footer: {
      description:
        "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      wechat: "Official WeChat account",
      mobile: "Mobile website",
      columns: {
        Company: [
          ["About Manufacturing", "/#company"],
          ["Quality Control", "/quality-control/agm-separator-testing/"],
          ["Export Support", "/#contact"]
        ],
        Products: [
          ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
          ["Custom Thickness", "/products/agm-separator/"],
          ["Custom Width", "/products/agm-separator/"]
        ],
        Applications: [
          ["VRLA", "/applications/agm-separator-for-vrla-battery/"],
          ["UPS", "/applications/agm-separator-for-ups-battery/"],
          ["Automotive", "/applications/agm-separator-for-vrla-battery/"],
          ["Energy Storage", "/applications/agm-separator-for-energy-storage-battery/"]
        ],
        Contact: [
          ["Request a Sample", "/request-agm-separator-sample/"],
          ["Technical Inquiry", "/#contact"],
          ["Technical Capability PDF", "/downloads/viking-agm-technical-capability.pdf"]
        ]
      },
      logo: {
        src: "/images/viking-logo-footer-320.webp",
        alt: "Viking Technology logo",
        width: 320,
        height: 320
      },
      qrImages: [
        ["Official WeChat account", "/images/qrcode_for_logo.jpg"],
        ["Mobile website", "/images/website-logo-180.webp"]
      ]
    }
  },
  zh: {
    nav: {
      company: "公司",
      products: "产品",
      applications: "应用",
      quality: "质量",
      contact: "联系"
    },
    language: "EN",
    hero: {
      badge: "湖北维京科技有限公司",
      title: ["AGM 玻璃纤维隔板", "专业制造商"],
      subtitle:
        "专注为铅酸电池生产企业提供 AGM 玻璃纤维隔板制造与稳定供货。",
      quote: "获取报价",
      products: "查看产品",
      proof: ["AGM 玻璃纤维隔板", "生产过程控制", "具备出口供应能力"],
      image: {
        src: "/images/agm-hero-production-1600.webp",
        alt: "AGM 隔板生产线",
        width: 1600,
        height: 1000
      }
    },
    video: {
      eyebrow: "工厂视频",
      title: "1 分钟了解维京 AGM 隔板生产能力",
      text:
        "快速查看 AGM 隔板生产、卷材处理、质量检测和包装出运等现场画面，便于客户初步了解工厂能力。",
      duration: "1 分钟工厂宣传片",
      play: "播放视频",
      close: "关闭视频",
      aria: "播放维京 AGM 工厂宣传片"
    },
    stats: [
      { value: "AGM", label: "玻璃纤维隔板制造" },
      { value: "OEM", label: "支持卷材规格沟通" },
      { value: "QC", label: "检测与过程跟进" }
    ],
    company: {
      eyebrow: "公司概览",
      title: "专注超细玻璃纤维隔板的科技型企业",
      text: [
        "湖北维京科技有限公司成立于2015年12月，注册资本3000万元，位于湖北省鄂州市经济技术开发区，占地面积65亩，是一家专注于超细玻璃纤维隔板研发、生产与销售的科技型企业。",
        "公司主要生产各类AGM隔板产品，年产能约4000吨，拥有多条国内先进的AGM隔板生产线，并配备完善的过程控制、检测检验和质量管理体系。公司已通过ISO9001:2015质量管理体系认证，产品可根据客户需求进行定制化生产，广泛服务于铅酸蓄电池相关应用领域。",
        "维京科技始终坚持以客户满意为核心，以稳定品质、准时交付和持续改进为目标，致力于为客户提供可靠的产品与高效的服务，成为客户值得信赖的长期合作伙伴。"
      ],
      imageLabel: "湖北维京科技办公及制造基地",
      image: {
        src: "/images/viking-company-building-900.webp",
        alt: "湖北维京科技办公及制造基地",
        width: 900,
        height: 675
      },
      cards: [
        ["2015年成立", "注册资本3000万元，长期专注AGM隔板相关产品。"],
        ["65亩厂区", "位于湖北省鄂州市经济技术开发区。"],
        ["约4000吨年产能", "多条国内先进AGM隔板生产线支撑稳定供货。"],
        ["ISO9001:2015", "已通过质量管理体系认证，支持客户供应商审核。"],
        ["定制化生产", "可根据客户需求进行规格和应用场景适配。"]
      ]
    },
    values: {
      eyebrow: "产品价值",
      title: "面向稳定电池性能的材料设计",
      text:
        "我们的 AGM 隔板注重吸液稳定性、装配压缩表现与批量一致性，并通过从原料审核到成品放行的过程控制支撑稳定供货。",
      items: [
        ["高吸液性", "电解液吸收速度快，保持能力均匀稳定。"],
        ["低电阻", "有助于电流传导效率和电池性能稳定。"],
        ["厚度稳定", "厚度控制一致，便于极群装配和压缩管理。"],
        ["拉伸强度高", "适合分切、转化及电池装配过程中的材料搬运。"],
        ["品质一致", "通过批次控制满足客户连续生产需求。"]
      ],
      images: [
        ["成品隔板卷", "适用于电池生产和转化工序的 AGM 隔板卷材。", "/images/viking-finished-separator-roll-900.webp"],
        ["隔板切片", "用于规格评估、样品沟通和电池装配确认的精切片材。", "/images/viking-separator-sheets-900.webp"]
      ]
    },
    applications: {
      eyebrow: "应用场景",
      title: "服务多个铅酸电池核心应用领域",
      items: ["VRLA 电池", "UPS 电池", "摩托车电池", "汽车电池", "储能系统"]
    },
    factory: {
      eyebrow: "工厂能力",
      title: "客户可查看的生产证据",
      text:
        "车间设备、现场过程监控和卷材处理能力，让海外客户更直观了解隔板材料的生产、检测与出运准备过程。",
      items: [
        ["卷对卷生产", "生产场景支持持续性隔板供应沟通。"],
        ["现场过程监控", "设备与生产读数让过程跟进更具体。"],
        ["包装与出运", "可围绕卷径、包装方式和出口节奏进行确认。"],
        ["规格定制", "可沟通厚度、宽度、卷径及不同应用要求。"]
      ],
      image: {
        src: "/images/agm-factory-capability-1200.webp",
        alt: "AGM 隔板生产车间",
        width: 1200,
        height: 900
      }
    },
    process: {
      eyebrow: "制造流程",
      title: "从原料选择到客户跟进",
      text:
        "制造流程连接原料选择、制浆、成型、检验、质量分析与客户跟进，形成可沟通、可追踪的生产控制路径。",
      steps: [
        "原料选择",
        "来料检验",
        "纤维与水处理",
        "制浆准备",
        "成型、烘干与复合",
        "分切与固定",
        "质量分析",
        "产品出厂",
        "客户跟进"
      ],
      image: {
        src: "/images/manufacturing-process-1400.webp",
        alt: "AGM 隔板制造流程图",
        width: 1400,
        height: 1000
      }
    },
    quality: {
      eyebrow: "质量控制",
      title: "证照、检测与出厂闭环",
      text:
        "质量保障以闭环方式呈现：资质材料、过程检验、成品分析、出厂控制和客户反馈，帮助客户更清楚评估合作基础。",
      items: ["资质材料可供核验", "来料与过程检验", "成品质量分析", "出厂与客户跟进"],
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "AGM 隔板质量检测",
        width: 1200,
        height: 900
      }
    },
    certifications: {
      eyebrow: "资质认证",
      title: "支持客户尽调的资质材料",
      text:
        "公司可提供营业执照及认证材料用于客户尽调；证书名称、编号和有效期以原始文件确认为准。",
      items: ["营业执照材料", "管理体系认证材料", "产品或企业认定材料", "详细文件可按需提供"],
      note: "客户进行供应商审核时，可进一步确认原始文件中的证书细节。"
    },
    why: {
      eyebrow: "选择我们",
      title: "面向海外电池企业的务实制造合作伙伴",
      items: [
        ["制造经验", "专注铅酸电池 AGM 隔板材料应用。"],
        ["交期稳定", "生产与包装计划匹配重复出口订单需求。"],
        ["OEM / 定制支持", "围绕电池类型、工艺需求和卷材规格沟通方案。"],
        ["出口沟通能力", "为国际买家提供清晰的技术与商务响应。"]
      ]
    },
      form: {
        eyebrow: "询盘",
        title: "留下联系方式",
        text:
          "先留下联系方式即可，我们会进一步沟通厚度、宽度、数量和应用需求。",
        hints: ["微信或手机号即可开始沟通", "我们会协助确认合适的 AGM 隔板规格", "厚度、宽度和数量可后续沟通"],
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
        interestedProduct: "AGM 隔板卷材、片材或暂不确定",
        message: "可选：电池应用、数量、样品需求或技术问题"
      },
      submit: "提交联系方式",
      submitting: "发送中...",
      success: "感谢您留下联系方式，我们会尽快联系您确认 AGM 隔板需求。",
      required: "请先填写姓名和微信或手机号。",
      emailFallback:
        "已为您打开邮件客户端并填入联系方式，请发送邮件完成询盘。",
      failure: "抱歉，询盘暂时未能发送，请稍后再试。"
    },
    faq: {
      eyebrow: "常见问题",
      title: "询价 AGM 隔板前的常见问题",
      items: [
        [
          "是否可以定制 AGM 隔板厚度或宽度？",
          "可以。厚度、宽度、卷材形式和片材尺寸都可以结合客户电池设计和生产工艺沟通。"
        ],
        [
          "批量采购前是否可以沟通样品？",
          "可以在确认产品形式、目标应用和基本规格方向后进行样品沟通。"
        ],
        [
          "AGM 隔板适用于哪些电池应用？",
          "可围绕 VRLA、UPS、摩托车、汽车启动和储能等铅酸电池应用沟通 AGM 玻璃纤维隔板。"
        ],
        [
          "询价时需要提供哪些信息？",
          "电池应用、卷材或片材形式、目标厚度、宽度或片材尺寸、预计数量和检测要求会有帮助。"
        ]
      ]
    },
    footer: {
      description:
        "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      wechat: "官方微信公众号",
      mobile: "移动官网",
      columns: {
        公司: [
          ["制造能力", "/zh/#company"],
          ["质量控制", "/zh/quality-control/agm-separator-testing/"],
          ["出口支持", "/zh/#contact"]
        ],
        产品: [
          ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
          ["定制厚度", "/zh/products/agm-separator/"],
          ["定制宽度", "/zh/products/agm-separator/"]
        ],
        应用: [
          ["VRLA", "/zh/applications/agm-separator-for-vrla-battery/"],
          ["UPS", "/zh/applications/agm-separator-for-ups-battery/"],
          ["汽车", "/zh/applications/agm-separator-for-vrla-battery/"],
          ["储能", "/zh/applications/agm-separator-for-energy-storage-battery/"]
        ],
        联系: [
          ["申请样品", "/zh/request-agm-separator-sample/"],
          ["技术询盘", "/zh/#contact"],
          ["技术能力 PDF", "/downloads/viking-agm-technical-capability.pdf"]
        ]
      },
      logo: {
        src: "/images/viking-logo-footer-320.webp",
        alt: "维京科技 logo",
        width: 320,
        height: 320
      },
      qrImages: [
        ["官方微信公众号", "/images/qrcode_for_logo.jpg"],
        ["移动官网", "/images/website-logo-180.webp"]
      ]
    }
  },
  vi: {
    nav: {
      company: "Công ty",
      products: "Sản phẩm",
      applications: "Ứng dụng",
      quality: "Chất lượng",
      contact: "Liên hệ"
    },
    language: "EN",
    hero: {
      badge: "Viking AGM · Nhà sản xuất",
      title: ["Nhà sản xuất chuyên nghiệp", "tấm ngăn sợi thủy tinh AGM"],
      subtitle:
        "Tập trung sản xuất và cung cấp ổn định tấm ngăn sợi thủy tinh AGM cho các nhà sản xuất ắc quy axit-chì.",
      quote: "Yêu cầu báo giá",
      products: "Xem sản phẩm",
      proof: [
        "Tấm ngăn sợi thủy tinh AGM",
        "Kiểm soát quy trình sản xuất",
        "Hỗ trợ cung ứng xuất khẩu"
      ],
      image: {
        src: "/images/agm-hero-production-1600.webp",
        alt: "Dây chuyền sản xuất tấm ngăn AGM",
        width: 1600,
        height: 1000
      }
    },
    video: {
      eyebrow: "Tổng quan nhà máy",
      title: "Xem nhà máy Viking AGM trong 1 phút",
      text:
        "Hình ảnh thực tế về sản xuất tấm ngăn AGM, xử lý cuộn, kiểm tra chất lượng và chuẩn bị đóng gói để người mua đánh giá.",
      duration: "Video nhà máy 1 phút",
      play: "Phát video",
      close: "Đóng video",
      aria: "Phát video tổng quan nhà máy Viking AGM"
    },
    stats: [
      { value: "AGM", label: "Sản xuất tấm ngăn sợi thủy tinh" },
      { value: "OEM", label: "Trao đổi quy cách cuộn và tấm" },
      { value: "QC", label: "Kiểm tra và theo dõi quy trình" }
    ],
    company: {
      eyebrow: "Tổng quan công ty",
      title: "Nhà sản xuất tấm ngăn AGM định hướng công nghệ tại Hồ Bắc",
      text: [
        "Công ty TNHH Công nghệ Hubei Viking được thành lập vào tháng 12 năm 2015 với vốn đăng ký 30 triệu NDT. Nhà máy đặt tại Khu phát triển kinh tế và công nghệ Ngạc Châu, tỉnh Hồ Bắc, trên diện tích khoảng 65 mẫu Trung Quốc, tập trung nghiên cứu, sản xuất và kinh doanh tấm ngăn sợi thủy tinh siêu mịn.",
        "Công ty chủ yếu sản xuất các sản phẩm tấm ngăn AGM với công suất hằng năm khoảng 4.000 tấn. Nhiều dây chuyền sản xuất AGM cùng hệ thống kiểm soát quy trình, kiểm tra và quản lý chất lượng hỗ trợ cung ứng theo lô.",
        "Viking Technology đã đạt chứng nhận hệ thống quản lý chất lượng ISO9001:2015. Quy cách sản phẩm có thể được trao đổi theo yêu cầu khách hàng và ứng dụng ắc quy axit-chì."
      ],
      imageLabel: "Văn phòng và cơ sở sản xuất của Hubei Viking Technology",
      image: {
        src: "/images/viking-company-building-900.webp",
        alt: "Văn phòng và cơ sở sản xuất của Hubei Viking Technology",
        width: 900,
        height: 675
      },
      cards: [
        [
          "Thành lập năm 2015",
          "Vốn đăng ký 30 triệu NDT và tập trung lâu dài vào sản xuất tấm ngăn AGM."
        ],
        [
          "Khu sản xuất khoảng 65 mẫu",
          "Đặt tại Khu phát triển kinh tế và công nghệ Ngạc Châu, tỉnh Hồ Bắc."
        ],
        [
          "Công suất khoảng 4.000 tấn/năm",
          "Nhiều dây chuyền sản xuất AGM hỗ trợ cung ứng ổn định theo lô."
        ],
        [
          "Chứng nhận ISO9001:2015",
          "Hệ thống quản lý chất lượng hỗ trợ quá trình đánh giá nhà cung cấp."
        ],
        [
          "Sản xuất theo quy cách",
          "Có thể trao đổi độ dày, chiều rộng và dạng sản phẩm theo ứng dụng."
        ]
      ]
    },
    values: {
      eyebrow: "Giá trị sản phẩm",
      title: "Hướng đến hiệu suất ắc quy ổn định",
      text:
        "Tấm ngăn AGM được phát triển với trọng tâm là khả năng hút axit, đặc tính nén và tính nhất quán giữa các lô, được hỗ trợ bằng kiểm soát từ nguyên liệu đến khi xuất xưởng.",
      items: [
        [
          "Khả năng hút axit cao",
          "Hấp thụ điện phân nhanh và giữ phân bố tương đối đồng đều trên vật liệu."
        ],
        [
          "Điện trở thấp",
          "Được thiết kế để hỗ trợ dẫn dòng và hiệu suất của ắc quy."
        ],
        [
          "Độ dày ổn định",
          "Kiểm soát độ dày giúp lắp ráp bản cực và quản lý độ nén."
        ],
        [
          "Độ bền kéo phù hợp",
          "Hỗ trợ quá trình xẻ cuộn, cắt và lắp ráp trên dây chuyền."
        ],
        [
          "Chất lượng nhất quán",
          "Kiểm soát giữa các lô cho nhu cầu sản xuất hàng loạt."
        ]
      ],
      images: [
        [
          "Cuộn tấm ngăn thành phẩm",
          "Cuộn AGM chuẩn bị cho dây chuyền sản xuất và gia công ắc quy.",
          "/images/viking-finished-separator-roll-900.webp"
        ],
        [
          "Tấm ngăn cắt sẵn",
          "Tấm cắt theo quy cách để đánh giá mẫu và trao đổi lắp ráp.",
          "/images/viking-separator-sheets-900.webp"
        ]
      ]
    },
    applications: {
      eyebrow: "Ứng dụng",
      title: "Vật liệu tấm ngăn cho các phân khúc ắc quy axit-chì chính",
      items: [
        "Ắc quy VRLA",
        "Ắc quy UPS",
        "Ắc quy xe máy",
        "Ắc quy khởi động ô tô",
        "Hệ thống lưu trữ năng lượng"
      ]
    },
    factory: {
      eyebrow: "Năng lực sản xuất",
      title: "Bằng chứng sản xuất để người mua đánh giá",
      text:
        "Thiết bị xưởng, theo dõi trên dây chuyền và năng lực xử lý cuộn giúp khách hàng hiểu rõ hơn cách vật liệu được sản xuất, kiểm tra và chuẩn bị giao hàng.",
      items: [
        [
          "Sản xuất liên tục dạng cuộn",
          "Hình ảnh dây chuyền hỗ trợ trao đổi về cung ứng vật liệu liên tục."
        ],
        [
          "Theo dõi tại dây chuyền",
          "Thiết bị và thông số sản xuất giúp việc theo dõi quy trình cụ thể hơn."
        ],
        [
          "Đóng gói và giao hàng",
          "Có thể trao đổi kích thước cuộn, phương án đóng gói và lịch xuất hàng."
        ],
        [
          "Quy cách theo yêu cầu",
          "Có thể xem xét độ dày, chiều rộng, dạng cuộn và yêu cầu theo ứng dụng."
        ]
      ],
      image: {
        src: "/images/agm-factory-capability-1200.webp",
        alt: "Xưởng sản xuất tấm ngăn AGM",
        width: 1200,
        height: 900
      }
    },
    process: {
      eyebrow: "Quy trình sản xuất",
      title: "Từ lựa chọn nguyên liệu đến theo dõi khách hàng",
      text:
        "Quy trình kết nối lựa chọn nguyên liệu, chuẩn bị bột sợi, tạo hình, kiểm tra, phân tích chất lượng và theo dõi khách hàng.",
      steps: [
        "Lựa chọn nguyên liệu",
        "Kiểm tra đầu vào",
        "Xử lý sợi và nước",
        "Chuẩn bị bột sợi",
        "Tạo hình, sấy và ghép",
        "Xẻ cuộn và cố định",
        "Phân tích chất lượng",
        "Xuất xưởng",
        "Theo dõi khách hàng"
      ],
      image: {
        src: "/images/manufacturing-process-1400.webp",
        alt: "Sơ đồ quy trình sản xuất tấm ngăn AGM",
        width: 1400,
        height: 1000
      }
    },
    quality: {
      eyebrow: "Kiểm soát chất lượng",
      title: "Chứng nhận, kiểm tra và quy trình xuất xưởng",
      text:
        "Bảo đảm chất lượng gồm tài liệu chứng nhận, kiểm tra trong quá trình, phân tích thành phẩm, kiểm soát xuất xưởng và phản hồi khách hàng.",
      items: [
        "Tài liệu chứng nhận để đánh giá",
        "Kiểm tra đầu vào và trong quá trình",
        "Phân tích chất lượng thành phẩm",
        "Xuất xưởng và theo dõi khách hàng"
      ],
      image: {
        src: "/images/agm-quality-control-1200.webp",
        alt: "Kiểm tra chất lượng tấm ngăn AGM",
        width: 1200,
        height: 900
      }
    },
    certifications: {
      eyebrow: "Chứng nhận và tuân thủ",
      title: "Tài liệu phục vụ đánh giá nhà cung cấp",
      text:
        "Giấy phép kinh doanh và tài liệu chứng nhận có thể được cung cấp để người mua đánh giá. Tên, số và thời hạn cụ thể được xác nhận theo tài liệu gốc.",
      items: [
        "Tài liệu giấy phép kinh doanh",
        "Tài liệu chứng nhận hệ thống quản lý",
        "Tài liệu công nhận sản phẩm hoặc doanh nghiệp",
        "Tài liệu chi tiết theo yêu cầu"
      ],
      note:
        "Tài liệu gốc có thể được cung cấp để xác nhận chi tiết trong quá trình đánh giá nhà cung cấp."
    },
    why: {
      eyebrow: "Vì sao chọn chúng tôi",
      title: "Đối tác sản xuất thực tế cho doanh nghiệp ắc quy quốc tế",
      items: [
        [
          "Kinh nghiệm sản xuất",
          "Tập trung vào vật liệu tấm ngăn AGM cho ứng dụng ắc quy axit-chì."
        ],
        [
          "Kế hoạch giao hàng",
          "Lịch sản xuất và đóng gói được trao đổi theo nhu cầu đơn hàng."
        ],
        [
          "Hỗ trợ OEM / quy cách riêng",
          "Trao đổi theo loại ắc quy, quy trình và dạng cuộn."
        ],
        [
          "Giao tiếp xuất khẩu",
          "Phản hồi kỹ thuật và thương mại rõ ràng cho người mua quốc tế."
        ]
      ]
    },
    form: {
      eyebrow: "Yêu cầu",
      title: "Để lại thông tin liên hệ",
      text:
        "Bạn chỉ cần để lại thông tin liên hệ. Đội ngũ sẽ tiếp tục trao đổi về độ dày, chiều rộng, số lượng và ứng dụng.",
      hints: [
        "Email, WhatsApp hoặc điện thoại là đủ để bắt đầu",
        "Chúng tôi hỗ trợ xác nhận quy cách phù hợp",
        "Độ dày, chiều rộng và số lượng có thể trao đổi sau"
      ],
      fields: {
        name: "Họ và tên",
        contact: "Email / WhatsApp / Điện thoại",
        company: "Công ty",
        interestedProduct: "Sản phẩm quan tâm",
        message: "Nội dung"
      },
      placeholders: {
        name: "Họ và tên của bạn",
        contact: "Email, WhatsApp hoặc số điện thoại",
        company: "Tên công ty",
        interestedProduct: "Tấm ngăn AGM dạng cuộn, dạng tấm hoặc chưa xác định",
        message:
          "Không bắt buộc: ứng dụng ắc quy, số lượng, yêu cầu mẫu hoặc câu hỏi kỹ thuật"
      },
      submit: "Gửi thông tin liên hệ",
      submitting: "Đang gửi...",
      success:
        "Cảm ơn bạn. Chúng tôi sẽ liên hệ để xác nhận yêu cầu tấm ngăn AGM.",
      required: "Vui lòng nhập họ tên và thông tin liên hệ.",
      emailFallback:
        "Ứng dụng email đã được mở với thông tin đã chuẩn bị. Vui lòng gửi email để hoàn tất.",
      failure:
        "Hiện không thể gửi yêu cầu. Vui lòng thử lại sau hoặc liên hệ trực tiếp."
    },
    faq: {
      eyebrow: "Câu hỏi thường gặp",
      title: "Các câu hỏi trước khi yêu cầu hỗ trợ tấm ngăn AGM",
      items: [
        [
          "Có thể trao đổi độ dày hoặc chiều rộng theo yêu cầu không?",
          "Có. Độ dày, chiều rộng, dạng cuộn và kích thước tấm có thể được xem xét theo thiết kế ắc quy và quy trình sản xuất."
        ],
        [
          "Có thể yêu cầu mẫu trước đơn hàng số lượng lớn không?",
          "Có thể trao đổi mẫu sau khi xác nhận dạng sản phẩm, ứng dụng và hướng quy cách cơ bản."
        ],
        [
          "Tấm ngăn AGM phù hợp với những ứng dụng nào?",
          "Có thể trao đổi cho ắc quy axit-chì VRLA, UPS, xe máy, khởi động ô tô và lưu trữ năng lượng."
        ],
        [
          "Cần cung cấp thông tin gì để nhận báo giá?",
          "Ứng dụng, dạng cuộn hoặc tấm, độ dày, chiều rộng hoặc kích thước tấm, số lượng dự kiến và yêu cầu thử nghiệm sẽ hữu ích."
        ]
      ]
    },
    footer: {
      description:
        "Nhà sản xuất tấm ngăn sợi thủy tinh AGM phục vụ các nhà sản xuất và đối tác thương mại ắc quy axit-chì.",
      wechat: "Tài khoản WeChat chính thức",
      mobile: "Website di động",
      columns: {
        "Công ty": [
          ["Giới thiệu sản xuất", "/vi/#company"],
          ["Liên hệ", "/vi/#contact"]
        ],
        "Sản phẩm": [
          ["Tấm ngăn AGM", "/vi/products/agm-separator/"],
          ["Dạng cuộn và tấm", "/vi/products/agm-separator/"]
        ],
        "Ứng dụng": [
          [
            "Ắc quy xe máy",
            "/vi/applications/agm-separator-for-motorcycle-battery/"
          ]
        ],
        "Liên hệ": [
          ["Yêu cầu mẫu", "/vi/request-agm-separator-sample/"],
          ["Yêu cầu kỹ thuật", "/vi/#contact"],
          [
            "Hồ sơ kỹ thuật EN/ZH",
            "/downloads/viking-agm-technical-capability.pdf"
          ]
        ]
      },
      logo: {
        src: "/images/viking-logo-footer-320.webp",
        alt: "Logo Viking Technology",
        width: 320,
        height: 320
      },
      qrImages: [
        ["Tài khoản WeChat chính thức", "/images/qrcode_for_logo.jpg"],
        ["Website di động", "/images/website-logo-180.webp"]
      ]
    }
  }
} as const;

const copy = {
  ...baseCopy,
  ko: {
    ...baseCopy.en,
    nav: {
      company: "회사",
      products: "제품",
      applications: "적용 분야",
      quality: "품질",
      contact: "문의"
    },
    language: "한국어",
    hero: {
      ...baseCopy.en.hero,
      badge: "Viking AGM · 제조업체",
      title: ["전문 AGM 유리섬유", "분리막 제조업체"],
      subtitle:
        "납축전지 제조업체를 위한 AGM 유리섬유 분리막의 안정적인 생산과 공급에 집중합니다.",
      quote: "견적 요청",
      products: "제품 보기",
      proof: ["AGM 유리섬유 분리막", "공정 관리 생산", "수출 공급 지원"],
      image: {
        ...baseCopy.en.hero.image,
        alt: "AGM 분리막 생산 라인"
      }
    },
    video: {
      eyebrow: "공장 소개",
      title: "1분으로 보는 Viking AGM 공장",
      text:
        "AGM 분리막 생산, 롤 취급, 품질 검사와 포장 준비 과정을 실제 영상으로 확인할 수 있습니다.",
      duration: "1분 공장 영상",
      play: "영상 재생",
      close: "영상 닫기",
      aria: "Viking AGM 공장 소개 영상 재생"
    },
    stats: [
      { value: "AGM", label: "유리섬유 분리막 제조" },
      { value: "OEM", label: "롤 및 시트 사양 협의" },
      { value: "QC", label: "공정 검사 및 추적" }
    ],
    company: {
      ...baseCopy.en.company,
      eyebrow: "회사 소개",
      title: "후베이 소재 기술 기반 AGM 분리막 제조업체",
      text: [
        "후베이 바이킹 테크놀로지는 2015년 12월에 설립되었으며 등록 자본금은 3천만 위안입니다. 후베이성 어저우 경제기술개발구에 약 65무 규모의 생산 시설을 두고 초미세 유리섬유 분리막의 연구, 제조 및 판매에 집중합니다.",
        "주요 제품은 AGM 분리막이며 연간 생산 능력은 약 4,000톤입니다. 여러 AGM 생산 라인과 공정 관리, 검사 및 품질 관리 시스템을 통해 배치 공급을 지원합니다.",
        "Viking Technology는 ISO9001:2015 품질경영시스템 인증을 취득했습니다. 제품 사양은 고객 요구사항과 납축전지 적용 분야에 따라 협의할 수 있습니다."
      ],
      imageLabel: "Hubei Viking Technology 사무실 및 생산 시설",
      image: {
        ...baseCopy.en.company.image,
        alt: "Hubei Viking Technology 사무실 및 생산 시설"
      },
      cards: [
        ["2015년 설립", "등록 자본금 3천만 위안, AGM 분리막 제조에 지속적으로 집중."],
        ["약 65무 생산 부지", "후베이성 어저우 경제기술개발구에 위치."],
        ["연간 약 4,000톤", "여러 AGM 생산 라인이 안정적인 배치 공급을 지원."],
        ["ISO9001:2015", "공급업체 평가를 지원하는 품질경영시스템."],
        ["사양 협의 생산", "적용 분야에 따라 두께, 폭과 제품 형태를 협의."]
      ]
    },
    values: {
      ...baseCopy.en.values,
      eyebrow: "제품 가치",
      title: "안정적인 배터리 성능을 위한 소재",
      text:
        "원료부터 출하까지의 관리로 산 흡수 성능, 압축 특성 및 배치 간 일관성을 확인합니다.",
      items: [
        ["높은 산 흡수 성능", "전해액을 빠르게 흡수하고 소재 내부에 비교적 균일하게 유지합니다."],
        ["낮은 전기 저항", "배터리의 전도와 성능을 지원하도록 설계됩니다."],
        ["안정적인 두께", "두께 관리는 극판 조립과 압축 조건 관리에 도움이 됩니다."],
        ["적절한 인장 강도", "슬리팅, 절단 및 생산 라인 조립 공정을 지원합니다."],
        ["배치 일관성", "양산 요구를 위한 배치 간 품질 관리를 수행합니다."]
      ],
      images: [
        ["완성 분리막 롤", "배터리 생산 및 가공을 위해 준비된 AGM 롤.", "/images/viking-finished-separator-roll-900.webp"],
        ["사전 절단 시트", "샘플 평가와 조립 협의를 위한 규격 시트.", "/images/viking-separator-sheets-900.webp"]
      ]
    },
    applications: {
      eyebrow: "적용 분야",
      title: "주요 납축전지 분야용 분리막 소재",
      items: ["VRLA 배터리", "UPS 배터리", "오토바이 배터리", "자동차 시동 배터리", "에너지 저장 시스템"]
    },
    factory: {
      ...baseCopy.en.factory,
      eyebrow: "생산 역량",
      title: "구매자가 확인할 수 있는 제조 근거",
      text:
        "생산 설비, 라인 모니터링과 롤 취급 역량을 통해 소재의 생산, 검사 및 출하 준비 과정을 확인할 수 있습니다.",
      items: [
        ["연속 롤 생산", "연속 소재 공급을 위한 생산 라인을 확인할 수 있습니다."],
        ["라인 모니터링", "생산 설비와 공정 항목을 통해 공정 추적을 구체화합니다."],
        ["포장 및 출하", "롤 크기, 포장 방식과 출하 일정을 협의할 수 있습니다."],
        ["맞춤 사양", "두께, 폭, 롤 형태와 적용 요구사항을 검토할 수 있습니다."]
      ],
      image: {
        ...baseCopy.en.factory.image,
        alt: "AGM 분리막 생산 작업장"
      }
    },
    process: {
      ...baseCopy.en.process,
      eyebrow: "제조 공정",
      title: "원료 선정부터 고객 후속 관리까지",
      text:
        "원료 선정, 펄프 준비, 성형, 검사, 품질 분석과 고객 후속 관리를 연결하는 생산 공정입니다.",
      steps: ["원료 선정", "입고 검사", "섬유·수처리", "펄프 준비", "성형·건조·결합", "슬리팅 및 고정", "품질 분석", "출하", "고객 후속 관리"],
      image: {
        ...baseCopy.en.process.image,
        alt: "AGM 분리막 제조 공정"
      }
    },
    quality: {
      ...baseCopy.en.quality,
      eyebrow: "품질 관리",
      title: "인증, 검사 및 출하 관리",
      text:
        "인증 문서, 공정 검사, 완제품 분석, 출하 관리와 고객 피드백을 품질 관리에 포함합니다.",
      items: ["평가용 인증 문서", "입고 및 공정 검사", "완제품 품질 분석", "출하 및 고객 후속 관리"],
      image: {
        ...baseCopy.en.quality.image,
        alt: "AGM 분리막 품질 검사"
      }
    },
    certifications: {
      eyebrow: "인증 및 준수",
      title: "공급업체 평가용 문서",
      text:
        "사업자 등록 및 인증 문서를 구매자 평가 목적으로 제공할 수 있습니다. 명칭, 번호와 유효기간은 원본 문서로 확인합니다.",
      items: ["사업자 등록 문서", "경영시스템 인증 문서", "제품 또는 기업 인정 문서", "요청에 따른 세부 문서"],
      note: "공급업체 평가 과정에서 원본 문서로 세부 내용을 확인할 수 있습니다."
    },
    why: {
      eyebrow: "Viking AGM을 선택하는 이유",
      title: "글로벌 배터리 기업을 위한 실질적인 제조 파트너",
      items: [
        ["제조 경험", "납축전지용 AGM 분리막 소재에 집중합니다."],
        ["납품 계획", "주문 요구에 따라 생산 및 포장 일정을 협의합니다."],
        ["OEM / 사양 지원", "배터리 종류, 공정과 롤 형태에 따라 협의합니다."],
        ["수출 커뮤니케이션", "해외 구매자를 위한 명확한 기술·상업 대응을 제공합니다."]
      ]
    },
    form: {
      ...baseCopy.en.form,
      eyebrow: "문의",
      title: "연락처를 남겨 주세요",
      text: "연락처만 남겨도 시작할 수 있습니다. 두께, 폭, 수량 및 적용 분야는 후속 협의합니다.",
      hints: ["이메일, WhatsApp 또는 전화번호로 시작", "적합한 사양 검토 지원", "두께, 폭, 수량은 후속 협의"],
      fields: {
        name: "이름",
        contact: "이메일 / WhatsApp / 전화번호",
        company: "회사명",
        interestedProduct: "관심 제품",
        message: "요청사항"
      },
      placeholders: {
        name: "이름",
        contact: "이메일, WhatsApp 또는 전화번호",
        company: "회사명",
        interestedProduct: "AGM 분리막 롤, 시트 또는 미정",
        message: "선택: 배터리 적용 분야, 수량, 샘플 또는 기술 문의"
      },
      submit: "연락처 보내기",
      submitting: "전송 중...",
      success: "감사합니다. AGM 분리막 요구사항 확인을 위해 연락드리겠습니다.",
      required: "이름과 연락처를 입력해 주세요.",
      emailFallback: "이메일 프로그램이 열렸습니다. 준비된 이메일을 전송해 주세요.",
      failure: "현재 요청을 전송할 수 없습니다. 잠시 후 다시 시도하거나 직접 문의해 주세요."
    },
    faq: {
      eyebrow: "자주 묻는 질문",
      title: "AGM 분리막 문의 전 확인 사항",
      items: [
        ["두께나 폭을 맞춤 협의할 수 있나요?", "네. 배터리 설계와 생산 공정에 따라 두께, 폭, 롤 형태 및 시트 크기를 검토할 수 있습니다."],
        ["대량 주문 전에 샘플을 요청할 수 있나요?", "제품 형태, 적용 분야와 기본 사양을 확인한 후 샘플을 협의할 수 있습니다."],
        ["어떤 배터리에 AGM 분리막을 적용할 수 있나요?", "VRLA, UPS, 오토바이, 자동차 시동 및 에너지 저장용 납축전지를 협의할 수 있습니다."],
        ["견적 요청에 필요한 정보는 무엇인가요?", "적용 분야, 롤 또는 시트 형태, 두께, 폭 또는 시트 크기, 예상 수량과 시험 요구사항이 도움이 됩니다."]
      ]
    },
    footer: {
      ...baseCopy.en.footer,
      description: "납축전지 제조업체와 무역 파트너를 위한 AGM 유리섬유 분리막 제조업체.",
      wechat: "공식 WeChat 계정",
      mobile: "모바일 웹사이트",
      columns: {
        "회사": [["제조 소개", "/ko/#company"], ["문의", "/ko/#contact"]],
        "제품": [["AGM 분리막", "/ko/products/agm-separator/"], ["롤 및 시트", "/ko/products/agm-separator/"]],
        "문의": [["샘플 요청", "/ko/request-agm-separator-sample/"], ["기술 문의", "/ko/#contact"], ["영문/중문 기술 자료", "/downloads/viking-agm-technical-capability.pdf"]]
      },
      logo: {
        ...baseCopy.en.footer.logo,
        alt: "Viking Technology 로고"
      },
      qrImages: [
        ["공식 WeChat 계정", "/images/qrcode_for_logo.jpg"],
        ["모바일 웹사이트", "/images/website-logo-180.webp"]
      ]
    }
  },
  ja: {
    ...baseCopy.en,
    nav: {
      company: "会社",
      products: "製品",
      applications: "用途",
      quality: "品質",
      contact: "お問い合わせ"
    },
    language: "日本語",
    hero: {
      ...baseCopy.en.hero,
      badge: "Viking AGM・メーカー",
      title: ["AGMガラス繊維", "セパレーターメーカー"],
      subtitle:
        "鉛蓄電池メーカー向けAGMガラス繊維セパレーターの安定生産と供給に取り組んでいます。",
      quote: "見積り依頼",
      products: "製品を見る",
      proof: ["AGMガラス繊維セパレーター", "工程管理された生産", "輸出供給対応"],
      image: {
        ...baseCopy.en.hero.image,
        alt: "AGMセパレーター生産ライン"
      }
    },
    video: {
      eyebrow: "工場概要",
      title: "1分で見るViking AGM工場",
      text:
        "AGMセパレーターの生産、ロール加工、品質検査、梱包準備を実際の映像でご確認いただけます。",
      duration: "1分工場動画",
      play: "動画を再生",
      close: "動画を閉じる",
      aria: "Viking AGM工場紹介動画を再生"
    },
    stats: [
      { value: "AGM", label: "ガラス繊維セパレーター製造" },
      { value: "OEM", label: "ロール・シート仕様協議" },
      { value: "QC", label: "工程検査・追跡" }
    ],
    company: {
      ...baseCopy.en.company,
      eyebrow: "会社概要",
      title: "湖北省の技術志向AGMセパレーターメーカー",
      text: [
        "湖北維京科技有限公司は2015年12月に設立され、登録資本金は3,000万元です。湖北省鄂州経済技術開発区に約65ムーの生産施設を構え、超微細ガラス繊維セパレーターの研究、製造、販売に取り組んでいます。",
        "主力製品はAGMセパレーターで、年間生産能力は約4,000トンです。複数のAGM生産ラインと工程管理、検査、品質管理体制によりロット供給を支えます。",
        "Viking TechnologyはISO9001:2015品質マネジメントシステム認証を取得しています。製品仕様はお客様の要件と鉛蓄電池用途に応じて協議できます。"
      ],
      imageLabel: "Hubei Viking Technologyの事務所・生産施設",
      image: {
        ...baseCopy.en.company.image,
        alt: "Hubei Viking Technologyの事務所・生産施設"
      },
      cards: [
        ["2015年設立", "登録資本金3,000万元、AGMセパレーター製造に継続して注力。"],
        ["約65ムーの生産用地", "湖北省鄂州経済技術開発区に所在。"],
        ["年間約4,000トン", "複数のAGM生産ラインで安定したロット供給を支援。"],
        ["ISO9001:2015", "サプライヤー評価を支える品質マネジメントシステム。"],
        ["仕様協議生産", "用途に応じて厚さ、幅、製品形状を協議。"]
      ]
    },
    values: {
      ...baseCopy.en.values,
      eyebrow: "製品価値",
      title: "安定したバッテリー性能を支える材料",
      text: "原料から出荷までの管理により、吸液性能、圧縮特性、ロット間の一貫性を確認します。",
      items: [
        ["高い吸液性能", "電解液を素早く吸収し、材料内に比較的均一に保持します。"],
        ["低い電気抵抗", "バッテリーの導電性と性能を支えるよう設計します。"],
        ["安定した厚さ", "厚さ管理は極板組立と圧縮条件の管理に役立ちます。"],
        ["適切な引張強度", "スリット、裁断、組立工程を支えます。"],
        ["ロット一貫性", "量産要求に対応するロット間品質管理を行います。"]
      ],
      images: [
        ["完成セパレーターロール", "バッテリー生産・加工向けに準備したAGMロール。", "/images/viking-finished-separator-roll-900.webp"],
        ["カット済みシート", "サンプル評価と組立確認用の規格シート。", "/images/viking-separator-sheets-900.webp"]
      ]
    },
    applications: {
      eyebrow: "用途",
      title: "主要鉛蓄電池分野向けセパレーター材料",
      items: ["VRLAバッテリー", "UPSバッテリー", "二輪車用バッテリー", "自動車始動用バッテリー", "蓄電システム"]
    },
    factory: {
      ...baseCopy.en.factory,
      eyebrow: "生産能力",
      title: "購買評価に役立つ製造情報",
      text:
        "生産設備、ライン監視、ロール加工能力を通じて、材料の生産、検査、出荷準備をご確認いただけます。",
      items: [
        ["連続ロール生産", "連続材料供給向けの生産ラインを確認できます。"],
        ["ライン監視", "生産設備と工程項目により工程追跡を具体化します。"],
        ["梱包・出荷", "ロール寸法、梱包方法、出荷日程を協議できます。"],
        ["仕様対応", "厚さ、幅、ロール形状、用途要件を確認できます。"]
      ],
      image: {
        ...baseCopy.en.factory.image,
        alt: "AGMセパレーター生産工場"
      }
    },
    process: {
      ...baseCopy.en.process,
      eyebrow: "製造工程",
      title: "原料選定から顧客フォローまで",
      text: "原料選定、パルプ準備、成形、検査、品質分析、顧客フォローをつなぐ製造工程です。",
      steps: ["原料選定", "受入検査", "繊維・水処理", "パルプ準備", "成形・乾燥・結合", "スリット・固定", "品質分析", "出荷", "顧客フォロー"],
      image: {
        ...baseCopy.en.process.image,
        alt: "AGMセパレーター製造工程"
      }
    },
    quality: {
      ...baseCopy.en.quality,
      eyebrow: "品質管理",
      title: "認証、検査、出荷管理",
      text: "認証文書、工程検査、完成品分析、出荷管理、顧客フィードバックを品質管理に含めます。",
      items: ["評価用認証文書", "受入・工程検査", "完成品品質分析", "出荷・顧客フォロー"],
      image: {
        ...baseCopy.en.quality.image,
        alt: "AGMセパレーター品質検査"
      }
    },
    certifications: {
      eyebrow: "認証・コンプライアンス",
      title: "サプライヤー評価用文書",
      text:
        "営業許可・認証文書は購買評価用に提供できます。名称、番号、有効期限は原本で確認します。",
      items: ["営業許可文書", "マネジメントシステム認証", "製品・企業認定文書", "要望に応じた詳細文書"],
      note: "サプライヤー評価時に原本文書で詳細をご確認いただけます。"
    },
    why: {
      eyebrow: "Viking AGMを選ぶ理由",
      title: "海外バッテリー企業のための実務的な製造パートナー",
      items: [
        ["製造経験", "鉛蓄電池用AGMセパレーター材料に注力。"],
        ["納品計画", "注文要件に応じて生産・梱包日程を協議。"],
        ["OEM・仕様対応", "バッテリー種類、工程、ロール形状に応じて協議。"],
        ["輸出コミュニケーション", "海外購買向けに明確な技術・商務対応を提供。"]
      ]
    },
    form: {
      ...baseCopy.en.form,
      eyebrow: "お問い合わせ",
      title: "連絡先をお知らせください",
      text: "連絡先だけでも開始できます。厚さ、幅、数量、用途はその後確認します。",
      hints: ["メール、WhatsApp、電話番号で開始", "適切な仕様確認を支援", "厚さ、幅、数量は後から協議"],
      fields: {
        name: "お名前",
        contact: "メール / WhatsApp / 電話番号",
        company: "会社名",
        interestedProduct: "ご希望の製品",
        message: "ご要望"
      },
      placeholders: {
        name: "お名前",
        contact: "メール、WhatsAppまたは電話番号",
        company: "会社名",
        interestedProduct: "AGMセパレーターのロール、シート、または未定",
        message: "任意：バッテリー用途、数量、サンプル・技術に関するご質問"
      },
      submit: "連絡先を送信",
      submitting: "送信中...",
      success: "ありがとうございます。AGMセパレーター要件の確認のためご連絡します。",
      required: "お名前と連絡先を入力してください。",
      emailFallback: "メールアプリを開きました。作成済みのメールを送信してください。",
      failure: "現在リクエストを送信できません。後ほど再試行するか直接お問い合わせください。"
    },
    faq: {
      eyebrow: "よくある質問",
      title: "AGMセパレーターお問い合わせ前の確認事項",
      items: [
        ["厚さや幅はカスタム対応できますか？", "はい。バッテリー設計と生産工程に応じて厚さ、幅、ロール形状、シート寸法を確認できます。"],
        ["量産前にサンプルを依頼できますか？", "製品形状、用途、基本仕様を確認したうえでサンプルについて協議できます。"],
        ["AGMセパレーターはどの用途に使用できますか？", "VRLA、UPS、二輪車、自動車始動、蓄電用の鉛蓄電池について協議できます。"],
        ["見積りに必要な情報は何ですか？", "用途、ロール・シート形状、厚さ、幅またはシート寸法、予定数量、試験要件があると確認が進みます。"]
      ]
    },
    footer: {
      ...baseCopy.en.footer,
      description: "鉛蓄電池メーカーと商社向けのAGMガラス繊維セパレーター製造会社。",
      wechat: "公式WeChatアカウント",
      mobile: "モバイルサイト",
      columns: {
        "会社": [["製造概要", "/ja/#company"], ["お問い合わせ", "/ja/#contact"]],
        "製品": [["AGMセパレーター", "/ja/products/agm-separator/"], ["ロール・シート", "/ja/products/agm-separator/"]],
        "お問い合わせ": [["サンプル依頼", "/ja/request-agm-separator-sample/"], ["技術相談", "/ja/#contact"], ["英語・中国語技術資料", "/downloads/viking-agm-technical-capability.pdf"]]
      },
      logo: {
        ...baseCopy.en.footer.logo,
        alt: "Viking Technologyロゴ"
      },
      qrImages: [
        ["公式WeChatアカウント", "/images/qrcode_for_logo.jpg"],
        ["モバイルサイト", "/images/website-logo-180.webp"]
      ]
    }
  }
} as const;

const ArrowRight = makeIcon("arrow");
const BadgeCheck = makeIcon("badge");
const CheckCircle2 = makeIcon("check");
const ClipboardCheck = makeIcon("clipboard");
const Factory = makeIcon("factory");
const FlaskConical = makeIcon("flask");
const Globe2 = makeIcon("globe");
const Layers3 = makeIcon("layers");
const Mail = makeIcon("mail");
const PackageCheck = makeIcon("package");
const Phone = makeIcon("phone");
const Play = makeIcon("play");
const Send = makeIcon("send");
const ShieldCheck = makeIcon("shield");
const ArrowUp = makeIcon("top");
const Truck = makeIcon("truck");
const X = makeIcon("x");

const icons = [Layers3, ShieldCheck, BadgeCheck, Factory, PackageCheck];
const applicationIcons = [ShieldCheck, Globe2, Layers3, Truck, Factory];
const capabilityIcons = [Factory, ClipboardCheck, Truck, Layers3];
const whyIcons = [BadgeCheck, Truck, PackageCheck, Globe2];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const contactInfo = {
  phone: "+86 18171518528",
  email: "vikingsales@vikingagm.com"
};
const icpLicense = process.env.NEXT_PUBLIC_ICP_LICENSE || "鄂ICP备2026033781号";
const certificationImages = [
  "/images/certification-1-900.webp",
  "/images/certification-2-900.webp",
  "/images/certification-3-900.webp",
  "/images/certification-4-900.webp",
  "/images/certification-5-900.webp"
];
const useEvidenceImagePlaceholders = true;
const promoVideo = {
  desktop: "/videos/viking-agm-promo-720p.mp4",
  mobile: "/videos/viking-agm-promo-480p.mp4",
  poster: "/images/viking-agm-promo-poster.webp"
};

function asset(path: string) {
  return `${basePath}${path}`;
}

function localeText(
  lang: SiteLocale,
  en: string,
  zh: string,
  vi: string,
  ko = en,
  ja = en
) {
  return lang === "zh"
    ? zh
    : lang === "vi"
      ? vi
      : lang === "ko"
        ? ko
        : lang === "ja"
          ? ja
          : en;
}

export function VikingHome({ initialLang }: { initialLang: SiteLocale }) {
  const lang = initialLang;
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = homeContent(lang, copy[lang]);
  const footerColumns = Object.entries(t.footer.columns) as Array<
    [string, readonly FooterLink[]]
  >;

  function closeVideo() {
    videoRef.current?.pause();
    setIsVideoOpen(false);
  }

  useEffect(() => {
    if (!isVideoOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        videoRef.current?.pause();
        setIsVideoOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <main className="min-h-screen overflow-hidden bg-frost text-ink">
      <SiteHeader
        lang={lang}
        homePath={
          lang === "en" ? "/" : `/${lang}/`
        }
        languagePath={lang === "en" ? "/zh/" : "/"}
        quoteLabel={localeText(
          lang,
          "Request Sample",
          "申请样品",
          "Yêu cầu mẫu",
          "샘플 요청",
          "サンプル依頼"
        )}
      />

      <section className="relative min-h-[720px] pt-20">
        <Image
          src={asset(t.hero.image.src)}
          alt={t.hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/86 to-white/18" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,247,250,0.25),rgba(245,247,250,0.9))]" />

        <div className="relative mx-auto grid min-h-[640px] max-w-7xl content-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="min-w-0 max-w-3xl">
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-md border border-line bg-white/88 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-signal shadow-sm">
              <Factory size={16} />
              <span className="truncate">{t.hero.badge}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[4rem]">
              <span className="block">{t.hero.title[0]}</span>
              <span className="mt-2 block text-[0.74em] font-extrabold leading-[1.12] text-ink sm:text-[0.82em] lg:text-[0.88em]">
                {t.hero.title[1]}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite sm:text-xl">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 text-base font-semibold text-white shadow-industrial transition hover:bg-ink"
              >
                {localeText(
                  lang,
                  "Request a Sample & Specification Match",
                  "申请样品与规格匹配",
                  "Yêu cầu mẫu và đối chiếu thông số",
                  "샘플 및 사양 검토 요청",
                  "サンプル・仕様確認を依頼"
                )}
                <Send size={18} />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/15 bg-white/88 px-6 py-3.5 text-base font-semibold text-ink transition hover:border-signal hover:text-signal"
              >
                {t.hero.products}
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              {t.hero.proof.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-md border border-white bg-white/82 px-3 py-2 text-sm font-semibold text-graphite shadow-sm"
                >
                  <CheckCircle2 size={16} className="text-signal" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="company" className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-md border border-line bg-white p-4 shadow-industrial md:grid-cols-3">
          {t.stats.map((item) => (
            <div key={item.label} className="rounded-md bg-frost px-5 py-5">
              <div className="text-2xl font-bold text-signal">{item.value}</div>
              <div className="mt-1 text-sm font-semibold text-graphite">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-md border border-line bg-white shadow-industrial lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.video.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.video.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-steel">{t.video.text}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                aria-label={t.video.aria}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-ink"
              >
                <Play size={17} />
                {t.video.play}
              </button>
              <span className="rounded-md border border-line bg-frost px-3 py-2 text-sm font-semibold text-graphite">
                {t.video.duration}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            aria-label={t.video.aria}
            className="group relative aspect-video overflow-hidden bg-white text-left lg:self-center"
          >
            <Image
              src={asset(promoVideo.poster)}
              alt={t.video.title}
              fill
              sizes="(min-width: 1024px) 54vw, 100vw"
              loading="lazy"
              className="object-contain transition duration-500 group-hover:scale-[1.01]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/18 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-3 rounded-md border border-white/70 bg-white/92 px-4 py-3 text-sm font-bold text-ink shadow-sm transition group-hover:bg-signal group-hover:text-white sm:bottom-5 sm:left-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-signal text-white group-hover:bg-white group-hover:text-signal">
                <Play size={18} />
              </span>
              {t.video.play}
            </span>
          </button>
        </div>
      </section>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/82 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.video.title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeVideo();
            }
          }}
        >
          <div className="relative w-full max-w-5xl rounded-md border border-white/15 bg-ink p-3 shadow-industrial sm:p-4">
            <button
              type="button"
              onClick={closeVideo}
              aria-label={t.video.close}
              className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-ink"
            >
              <X size={20} />
            </button>
            <video
              ref={videoRef}
              poster={asset(promoVideo.poster)}
              controls
              preload="metadata"
              playsInline
              autoPlay
              className="aspect-video w-full rounded-md bg-black"
            >
              <source
                media="(max-width: 767px)"
                src={asset(promoVideo.mobile)}
                type="video/mp4"
              />
              <source src={asset(promoVideo.desktop)} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.company.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.company.title}
            </h2>
            <div className="mt-5 grid gap-4">
              {t.company.text.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-steel">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {t.company.cards.map(([title, text]) => (
                <article
                  key={title}
                  className="rounded-md border border-line bg-white p-5 shadow-sm"
                >
                  <h3 className="font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-steel">{text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-line bg-white p-4 shadow-industrial">
            <Image
              src={asset(t.company.image.src)}
              alt={t.company.image.alt}
              width={t.company.image.width}
              height={t.company.image.height}
              sizes="(min-width: 1024px) 42vw, 100vw"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {(
                lang === "zh"
                  ? [
                      ["2015", "成立时间"],
                      ["65亩", "厂区面积"],
                      ["4000吨", "年产能约"],
                      ["ISO9001", "质量体系"]
                    ]
                  : lang === "vi"
                    ? [
                        ["2015", "Thành lập"],
                        ["65 mẫu", "Khu sản xuất"],
                        ["4.000 tấn", "Công suất năm"],
                        ["ISO9001", "Hệ thống chất lượng"]
                      ]
                    : lang === "ko"
                      ? [
                          ["2015", "설립"],
                          ["65무", "생산 부지"],
                          ["4,000톤", "연간 생산 능력"],
                          ["ISO9001", "품질 시스템"]
                        ]
                      : lang === "ja"
                        ? [
                            ["2015", "設立"],
                            ["65ムー", "生産用地"],
                            ["4,000トン", "年間生産能力"],
                            ["ISO9001", "品質システム"]
                          ]
                    : [
                      ["2015", "Established"],
                      ["65 mu", "Production site"],
                      ["4,000 tons", "Annual capacity"],
                      ["ISO9001", "Quality system"]
                    ]
              ).map(([value, label]) => (
                <div key={label} className="rounded-md bg-frost p-4">
                  <div className="text-xl font-bold text-signal">{value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-graphite">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.values.eyebrow}
          title={t.values.title}
          text={t.values.text}
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-5">
          {t.values.items.map(([title, text], index) => {
            const Icon = icons[index];
            return (
              <article
                key={title}
                className="rounded-md border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-industrial"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-signal/10 text-signal">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel">{text}</p>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-2">
          {t.values.images.map(([title, text, src]) => (
            <article
              key={title}
              className="overflow-hidden rounded-md border border-line bg-white shadow-sm"
            >
              <Image
                src={asset(src)}
                alt={title}
                width={900}
                height={675}
                sizes="(min-width: 768px) 50vw, 100vw"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl justify-center">
          <a
            href={asset(
              lang === "zh"
                ? "/zh/products/agm-separator/"
                : lang === "vi"
                  ? "/vi/products/agm-separator/"
                  : lang === "ko"
                    ? "/ko/products/agm-separator/"
                    : lang === "ja"
                      ? "/ja/products/agm-separator/"
                  : "/products/agm-separator/"
            )}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-signal bg-white px-5 py-3 text-sm font-bold text-signal transition hover:bg-signal hover:text-white"
          >
            {localeText(
              lang,
              "Learn more about AGM separator",
              "了解 AGM 隔板产品",
              "Tìm hiểu sản phẩm tấm ngăn AGM",
              "AGM 분리막 제품 보기",
              "AGMセパレーター製品を見る"
            )}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section
        id="applications"
        className="border-y border-line bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionHeading
          eyebrow={t.applications.eyebrow}
          title={t.applications.title}
        />
        <div className="mx-auto mt-10 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.applications.items.map((item, index) => {
            const Icon = applicationIcons[index];
            return (
              <div
                key={item}
                className="flex min-h-32 items-center gap-4 rounded-md border border-line bg-frost p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-copper shadow-sm">
                  <Icon size={22} />
                </div>
                <div className="text-base font-bold text-ink">{item}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.process.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.process.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-steel">{t.process.text}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.process.steps.map((step, index) => (
                <div
                  key={step}
                  className="flex min-h-20 items-center gap-4 rounded-md border border-line bg-white p-4 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-signal text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold leading-6 text-ink">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <EvidenceImageSlot
            src={asset(t.process.image.src)}
            alt={t.process.image.alt}
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            note={
              localeText(
                lang,
                "AGM separator manufacturing workflow",
                "AGM 隔板制造流程",
                "Quy trình sản xuất tấm ngăn AGM",
                "AGM 분리막 제조 공정",
                "AGMセパレーター製造工程"
              )
            }
            replacement="public/images/manufacturing-process-1400.webp"
            icon="clipboard"
            showImage
            wide
            contain
          />
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <EvidenceImageSlot
            src={asset(t.factory.image.src)}
            alt={t.factory.image.alt}
            eyebrow="Hubei Viking Technology"
            title="AGM separator manufacturing and roll finishing"
            note={
              localeText(
                lang,
                "AGM separator production and roll-finishing operations",
                "AGM 隔板生产与卷材后处理现场",
                "Sản xuất và hoàn thiện cuộn tấm ngăn AGM",
                "AGM 분리막 생산 및 롤 마감 공정",
                "AGMセパレーター生産・ロール仕上げ工程"
              )
            }
            replacement="public/images/agm-factory-capability-1200.webp"
            icon="factory"
            showImage
            wide
          />

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.factory.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.factory.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-steel">{t.factory.text}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {t.factory.items.map(([title, text], index) => {
                const Icon = capabilityIcons[index];
                return (
                  <div key={title} className="rounded-md border border-line bg-white p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-frost text-signal">
                      <Icon size={21} />
                    </div>
                    <h3 className="font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-steel">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="quality"
        className="border-y border-line bg-white px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.quality.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.quality.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-steel">{t.quality.text}</p>
            <div className="mt-8 grid gap-3">
              {t.quality.items.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-md border border-line bg-frost p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-signal shadow-sm">
                    {index + 1}
                  </span>
                  <span className="font-bold text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-md bg-ink shadow-industrial">
            <Image
              src={asset(t.quality.image.src)}
              alt={t.quality.image.alt}
              width={t.quality.image.width}
              height={t.quality.image.height}
              sizes="(min-width: 1024px) 45vw, 100vw"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute right-5 top-5 rounded-md bg-white/92 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <FlaskConical size={18} className="text-signal" />
                {localeText(
                  lang,
                  "QC Process",
                  "质量检测流程",
                  "Quy trình kiểm tra",
                  "품질 검사 공정",
                  "品質検査工程"
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={localeText(
            lang,
            "Evidence Details",
            "现场证据",
            "Bằng chứng thực tế",
            "현장 근거",
            "現場情報"
          )}
          title={localeText(
            lang,
            "Production, testing and shipment evidence",
            "生产、检测与包装现场",
            "Sản xuất, kiểm tra và chuẩn bị giao hàng",
            "생산, 검사 및 출하 근거",
            "生産、検査、出荷の実例"
          )}
          text={localeText(
            lang,
            "These images show raw-material feeding, roll finishing, thickness inspection and shipment preparation in the manufacturing workflow.",
            "以下图片展示原料上料、卷材后处理、厚度检测和包装出运等实际环节。",
            "Các hình ảnh cho thấy quá trình cấp nguyên liệu, hoàn thiện cuộn, kiểm tra độ dày và chuẩn bị đóng gói giao hàng.",
            "원료 투입, 롤 마감, 두께 검사와 출하 준비의 실제 공정을 보여 줍니다.",
            "原料投入、ロール仕上げ、厚さ検査、出荷準備の実工程を示しています。"
          )}
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {(
            lang === "zh"
              ? [
                  [
                    "原料进入生产线",
                    "原料准备和上料按生产安排进入制造流程。",
                    "/images/evidence/factory-raw-material-feed-01.webp",
                    "AGM 隔板原料进入生产线"
                  ],
                  [
                    "收卷与后处理",
                    "卷材完成收卷后进入分切、整理和后续规格处理。",
                    "/images/evidence/factory-roll-finishing-01.webp",
                    "AGM 隔板收卷与后处理"
                  ],
                  [
                    "厚度检测",
                    "厚度检测用于核对隔板尺寸状态，并按客户确认的要求记录检测结果。",
                    "/images/evidence/quality-thickness-test-01.webp",
                    "AGM 隔板厚度检测"
                  ],
                  [
                    "包装与出运",
                    "产品按确认的卷材或片材形式完成包装，并进行托盘和出运准备。",
                    "/images/evidence/shipping-pallet-01.webp",
                    "AGM 隔板包装与出运"
                  ]
                ]
              : lang === "vi"
                ? [
                    [
                      "Cấp nguyên liệu",
                      "Nguyên liệu đã chuẩn bị được đưa vào quy trình theo kế hoạch sản xuất.",
                      "/images/evidence/factory-raw-material-feed-01.webp",
                      "Cấp nguyên liệu cho dây chuyền tấm ngăn AGM"
                    ],
                    [
                      "Hoàn thiện cuộn",
                      "Cuộn thành phẩm được chuyển qua công đoạn cuốn, xẻ và xử lý quy cách.",
                      "/images/evidence/factory-roll-finishing-01.webp",
                      "Hoàn thiện cuộn tấm ngăn AGM"
                    ],
                    [
                      "Kiểm tra độ dày",
                      "Kiểm tra độ dày giúp đối chiếu kích thước với yêu cầu đã xác nhận.",
                      "/images/evidence/quality-thickness-test-01.webp",
                      "Kiểm tra độ dày tấm ngăn AGM"
                    ],
                    [
                      "Đóng gói và giao hàng",
                      "Cuộn hoặc tấm được đóng gói theo dạng đã thống nhất và chuẩn bị lên pallet.",
                      "/images/evidence/shipping-pallet-01.webp",
                      "Đóng gói và giao hàng tấm ngăn AGM"
                    ]
                  ]
                : lang === "ko"
                  ? [
                      [
                        "원료 투입",
                        "준비된 원료가 생산 계획에 따라 제조 공정에 투입됩니다.",
                        "/images/evidence/factory-raw-material-feed-01.webp",
                        "AGM 분리막 원료 투입"
                      ],
                      [
                        "롤 마감",
                        "완성된 롤은 권취, 슬리팅 및 사양 처리 공정을 거칩니다.",
                        "/images/evidence/factory-roll-finishing-01.webp",
                        "AGM 분리막 롤 마감"
                      ],
                      [
                        "두께 검사",
                        "고객과 확인한 요구사항에 따라 치수 상태를 확인합니다.",
                        "/images/evidence/quality-thickness-test-01.webp",
                        "AGM 분리막 두께 검사"
                      ],
                      [
                        "포장 및 출하",
                        "롤 또는 시트를 합의한 형태로 포장하고 팔레트 출하를 준비합니다.",
                        "/images/evidence/shipping-pallet-01.webp",
                        "AGM 분리막 포장 및 출하"
                      ]
                    ]
                  : lang === "ja"
                    ? [
                        [
                          "原料投入",
                          "準備した原料を生産計画に沿って製造工程へ投入します。",
                          "/images/evidence/factory-raw-material-feed-01.webp",
                          "AGMセパレーターの原料投入"
                        ],
                        [
                          "ロール仕上げ",
                          "完成ロールは巻取り、スリット、仕様加工工程へ進みます。",
                          "/images/evidence/factory-roll-finishing-01.webp",
                          "AGMセパレーターのロール仕上げ"
                        ],
                        [
                          "厚さ検査",
                          "顧客と確認した要件に基づいて寸法状態を確認します。",
                          "/images/evidence/quality-thickness-test-01.webp",
                          "AGMセパレーターの厚さ検査"
                        ],
                        [
                          "梱包・出荷",
                          "ロールまたはシートを合意した形状で梱包し、パレット出荷を準備します。",
                          "/images/evidence/shipping-pallet-01.webp",
                          "AGMセパレーターの梱包と出荷"
                        ]
                      ]
                : [
                  [
                    "Raw material feed",
                    "Prepared raw materials enter the manufacturing workflow according to the production plan.",
                    "/images/evidence/factory-raw-material-feed-01.webp",
                    "AGM separator raw material feeding"
                  ],
                  [
                    "Roll finishing",
                    "Finished rolls move through winding, slitting and specification handling.",
                    "/images/evidence/factory-roll-finishing-01.webp",
                    "AGM separator roll finishing"
                  ],
                  [
                    "Thickness inspection",
                    "Thickness checks help verify dimensional condition against the requirements confirmed with the customer.",
                    "/images/evidence/quality-thickness-test-01.webp",
                    "AGM separator thickness testing"
                  ],
                  [
                    "Packing and shipment",
                    "Rolls or sheets are packed to the confirmed format and prepared for palletized shipment.",
                    "/images/evidence/shipping-pallet-01.webp",
                    "AGM separator packing and shipment"
                  ]
                ]
          ).map(([title, text, src, alt]) => (
            <article
              key={title}
              className="overflow-hidden rounded-md border border-line bg-white shadow-sm"
            >
              <Image
                src={asset(src)}
                alt={alt}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <CertificationBanner lang={lang} />

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.certifications.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.certifications.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-steel">
              {t.certifications.text}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.certifications.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-md border border-line bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-signal" />
                  <span className="text-sm font-bold leading-6 text-ink">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-900">
              {t.certifications.note}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.why.eyebrow}
          title={t.why.title}
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map(([title, text], index) => {
            const Icon = whyIcons[index];
            return (
              <article key={title} className="rounded-md bg-ink p-6 text-white">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/72">{text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.faq.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.faq.title}
            </h2>
          </div>
          <div className="grid gap-4">
            {t.faq.items.map(([question, answer]) => (
              <article
                key={question}
                className="rounded-md border border-line bg-frost p-5"
              >
                <h3 className="font-bold text-ink">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-ink px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/58">
              {t.form.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              {t.form.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
              {t.form.text}
            </p>
            <div className="mt-6 grid gap-3">
              {t.form.hints.map((hint) => (
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
                    <CopyContactButton
                      label="TEL"
                      value={contactInfo.phone}
                      lang={lang}
                    />
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
                : lang === "vi"
                  ? "Yêu cầu mẫu và đối chiếu thông số tấm ngăn AGM"
                  : lang === "ko"
                    ? "AGM 분리막 샘플 및 사양 검토"
                    : lang === "ja"
                      ? "AGMセパレーターのサンプル・仕様確認"
                  : "AGM separator sample and specification match"
            }
            messagePlaceholder={t.form.placeholders.message}
          />
        </div>
      </section>

      <footer className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-white p-2">
                <Image
                  src={asset(t.footer.logo.src)}
                  alt={t.footer.logo.alt}
                  width={t.footer.logo.width}
                  height={t.footer.logo.height}
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
            {icpLicense && (
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-steel transition hover:text-signal"
              >
                {icpLicense}
              </a>
            )}
            <SocialLinks lang={lang} />
            <div className="mt-6 grid max-w-md gap-4 sm:grid-cols-2">
              {[
                ...t.footer.qrImages
              ].map(([label, src]) => (
                <div
                  key={label}
                  className="rounded-md border border-line bg-frost p-4"
                >
                  <Image
                    src={asset(src)}
                    alt={label}
                    width={180}
                    height={180}
                    loading="lazy"
                    className="mx-auto h-28 w-28 rounded-sm bg-white object-contain"
                  />
                  <p
                    id={src === "/images/qrcode_for_logo.jpg" ? "wechat-qr" : undefined}
                    className="mt-3 scroll-mt-28 text-center text-sm font-semibold leading-6 text-graphite"
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold text-ink">{title}</h3>
                <div className="mt-4 grid gap-2">
                  {links.map(([label, href]) => (
                    <a
                      key={`${title}-${label}`}
                      href={asset(href)}
                      className="text-sm text-steel transition hover:text-signal"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
      <QuickContactDock lang={lang} />
    </main>
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
          wechat: "微信",
          email: "邮箱",
          copyPhone: "复制电话",
          openWechat: "查看微信二维码",
          copyEmail: "复制邮箱",
          backTop: "返回顶部",
          copied: "已复制"
        }
      : lang === "vi"
        ? {
            phone: "Điện thoại",
            wechat: "WeChat",
            email: "Email",
            copyPhone: "Sao chép số điện thoại",
            openWechat: "Xem mã QR WeChat",
            copyEmail: "Sao chép email",
            backTop: "Về đầu trang",
            copied: "Đã sao chép"
          }
        : lang === "ko"
          ? {
              phone: "전화",
              wechat: "WeChat",
              email: "이메일",
              copyPhone: "전화번호 복사",
              openWechat: "WeChat QR 코드 보기",
              copyEmail: "이메일 복사",
              backTop: "맨 위로",
              copied: "복사됨"
            }
          : lang === "ja"
            ? {
                phone: "電話",
                wechat: "WeChat",
                email: "メール",
                copyPhone: "電話番号をコピー",
                openWechat: "WeChat QRコードを表示",
                copyEmail: "メールをコピー",
                backTop: "ページ上部へ",
                copied: "コピーしました"
              }
        : {
          phone: "TEL",
          wechat: "WeChat",
          email: "E-mail",
          copyPhone: "Copy phone",
          openWechat: "View WeChat QR code",
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

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToWechat() {
    document.getElementById("wechat-qr")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  return (
    <div className="fixed bottom-5 right-4 z-40 hidden flex-col gap-2 sm:top-1/2 sm:flex sm:-translate-y-1/2">
      <button
        type="button"
        onClick={scrollToWechat}
        aria-label={labels.openWechat}
        className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-signal text-white shadow-industrial transition hover:bg-ink focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ink"
      >
        <span className="pointer-events-none absolute right-14 hidden min-w-max translate-x-2 rounded-md bg-ink px-3 py-2 text-xs font-bold text-white opacity-0 shadow-industrial transition group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 sm:block">
          {labels.openWechat}
        </span>
        <span className="text-xs font-black">{lang === "zh" ? "微" : "W"}</span>
      </button>
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
        onClick={scrollToTop}
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

function CertificationBanner({ lang }: { lang: SiteLocale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = certificationImages[activeIndex];
  const labels =
    lang === "zh"
      ? {
          previous: "上一张资质材料",
          next: "下一张资质材料",
          item: "资质材料",
          counter: "张"
        }
      : lang === "vi"
        ? {
            previous: "Tài liệu trước",
            next: "Tài liệu tiếp theo",
            item: "Tài liệu chứng nhận",
            counter: "trên"
          }
        : lang === "ko"
          ? {
              previous: "이전 인증 자료",
              next: "다음 인증 자료",
              item: "인증 자료",
              counter: "/"
            }
          : lang === "ja"
            ? {
                previous: "前の認証資料",
                next: "次の認証資料",
                item: "認証資料",
                counter: "/"
              }
        : {
          previous: "Previous qualification material",
          next: "Next qualification material",
          item: "Qualification material",
          counter: "of"
        };

  function showPrevious() {
    setActiveIndex((index) =>
      index === 0 ? certificationImages.length - 1 : index - 1
    );
  }

  function showNext() {
    setActiveIndex((index) =>
      index === certificationImages.length - 1 ? 0 : index + 1
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-line bg-white shadow-industrial">
      <div className="relative bg-frost p-4">
        <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-md bg-white">
          <Image
            src={asset(activeImage)}
            alt={`${labels.item} ${activeIndex + 1}`}
            width={900}
            height={1200}
            sizes="(min-width: 1024px) 45vw, 100vw"
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
        <button
          type="button"
          onClick={showPrevious}
          aria-label={labels.previous}
          className="absolute left-7 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-ink/86 text-2xl font-bold leading-none text-white shadow-sm transition hover:bg-signal focus:outline-none focus:ring-2 focus:ring-white"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label={labels.next}
          className="absolute right-7 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-ink/86 text-2xl font-bold leading-none text-white shadow-sm transition hover:bg-signal focus:outline-none focus:ring-2 focus:ring-white"
        >
          ›
        </button>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex gap-2">
          {certificationImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${labels.item} ${index + 1}`}
              className={`h-2.5 rounded-full transition ${
                index === activeIndex ? "w-8 bg-signal" : "w-2.5 bg-line"
              }`}
            />
          ))}
        </div>
        <p className="text-sm font-semibold text-steel">
          {lang === "zh"
            ? `${activeIndex + 1} / ${certificationImages.length} ${labels.counter}`
            : lang === "ko" || lang === "ja"
              ? `${activeIndex + 1} / ${certificationImages.length}`
              : `${activeIndex + 1} ${labels.counter} ${certificationImages.length}`}
        </p>
      </div>
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
  const copiedLabel = localeText(
    lang,
    "Copied",
    "已复制",
    "Đã sao chép",
    "복사됨",
    "コピーしました"
  );

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
    case "badge":
      return (
        <>
          <path d="M12 3 4.5 6v6c0 4.4 3 7.8 7.5 9 4.5-1.2 7.5-4.6 7.5-9V6L12 3Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
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
    case "flask":
      return (
        <>
          <path d="M9 3h6" />
          <path d="M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" />
          <path d="M8 15h8" />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
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
    case "package":
      return (
        <>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M4 7.5 12 12l8-4.5" />
          <path d="M12 12v9" />
          <path d="m8.5 15 1.5 1.5 3.5-4" />
        </>
      );
    case "phone":
      return (
        <>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
        </>
      );
    case "play":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m10 8 6 4-6 4V8Z" />
        </>
      );
    case "send":
      return (
        <>
          <path d="m22 2-7 20-4-9-9-4 20-7Z" />
          <path d="M22 2 11 13" />
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
    case "shield":
      return (
        <>
          <path d="M12 3 5 6v6c0 4 2.8 7.5 7 9 4.2-1.5 7-5 7-9V6l-7-3Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
        </>
      );
    case "truck":
      return (
        <>
          <path d="M3 7h11v9H3V7Z" />
          <path d="M14 10h4l3 3v3h-7v-6Z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
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

function EvidenceImageSlot({
  src,
  alt,
  eyebrow,
  title,
  note,
  replacement,
  icon,
  showImage = false,
  wide = false,
  contain = false
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  note: string;
  replacement: string;
  icon: IconName;
  showImage?: boolean;
  wide?: boolean;
  contain?: boolean;
}) {
  const SlotIcon = makeIcon(icon);

  if (showImage || !useEvidenceImagePlaceholders) {
    return (
      <div className="overflow-hidden rounded-md bg-ink shadow-industrial">
        <Image
          src={src}
          alt={alt}
          width={wide ? 1400 : 1200}
          height={wide ? 1000 : 900}
          sizes="(min-width: 1024px) 45vw, 100vw"
          loading="lazy"
          unoptimized={src.endsWith(".svg")}
          className={`${
            wide ? (contain ? "aspect-[16/9]" : "aspect-[7/5]") : "aspect-[4/3]"
          } w-full ${contain ? "bg-white object-contain" : "object-cover"}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex ${
        wide ? "aspect-[7/5]" : "aspect-[4/3]"
      } min-h-80 overflow-hidden rounded-md border border-dashed border-steel/35 bg-[linear-gradient(135deg,#111827_0%,#1f2937_45%,#334155_100%)] p-6 shadow-industrial`}
    >
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white">
        <SlotIcon size={26} />
      </div>
      <div className="relative mt-auto max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/62">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
          {title}
        </h3>
        <p className="mt-4 text-sm font-semibold leading-6 text-white/74">
          {note}
        </p>
        <p className="mt-4 inline-flex max-w-full rounded-md border border-white/12 bg-white/10 px-3 py-2 text-xs font-semibold text-white/58">
          <span className="truncate">{replacement}</span>
        </p>
      </div>
    </div>
  );
}
