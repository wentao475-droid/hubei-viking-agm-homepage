"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { SiteHeader } from "./SiteHeader";

export type Lang = "en" | "zh";
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
  | "send"
  | "shield"
  | "top"
  | "truck"
  | "x";

const copy = {
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
      proof: ["AGM glass fiber separator", "Process-controlled production", "Export-ready supply"]
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
        ["Finished separator roll", "AGM separator rolls prepared for battery production and converting lines."],
        ["Separator sheets", "Precision-cut separator sheets for specification review and sample discussion."]
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
      ]
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
      ]
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
      ]
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
        title: "Request a Quote",
        text:
          "Share the separator details your project needs. Thickness, width, roll diameter, quantity, battery application and sample requirements help us respond with a more useful specification discussion.",
        hints: [
          "Target thickness and width",
          "Roll diameter or packing requirement",
          "Quantity, application and sample needs"
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
        application: "VRLA, UPS, motorcycle, automotive...",
        message: "Thickness, width, roll diameter, quantity, sample needs or technical questions"
      },
      submit: "Send Inquiry",
      submitting: "Sending...",
      success:
        "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
      required: "Please complete all required fields before submitting.",
      emailFallback:
        "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry.",
      failure:
        "Sorry, the inquiry could not be sent right now. Please try again later."
    },
    footer: {
      description:
        "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      wechat: "Official WeChat account",
      mobile: "Mobile website",
      columns: {
        Company: ["About Manufacturing", "Quality Control", "Export Support"],
        Products: ["AGM Separator Rolls", "Custom Thickness", "Custom Width"],
        Applications: ["VRLA", "UPS", "Automotive", "Energy Storage"],
        Contact: ["Request a Quote", "Technical Inquiry", "Company Brochure"]
      }
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
      proof: ["AGM 玻璃纤维隔板", "生产过程控制", "具备出口供应能力"]
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
        ["成品隔板卷", "适用于电池生产和转化工序的 AGM 隔板卷材。"],
        ["隔板切片", "用于规格评估、样品沟通和电池装配确认的精切片材。"]
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
      ]
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
      ]
    },
    quality: {
      eyebrow: "质量控制",
      title: "证照、检测与出厂闭环",
      text:
        "质量保障以闭环方式呈现：资质材料、过程检验、成品分析、出厂控制和客户反馈，帮助客户更清楚评估合作基础。",
      items: ["资质材料可供核验", "来料与过程检验", "成品质量分析", "出厂与客户跟进"]
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
        title: "获取报价",
        text:
          "请尽量提供项目所需的隔板信息。厚度、宽度、卷径、数量、电池应用和样品需求越清楚，我们越能给出有效的规格沟通。",
        hints: ["目标厚度与宽度", "卷径或包装要求", "数量、应用与样品需求"],
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
        application: "VRLA、UPS、摩托车、汽车等",
        message: "厚度、宽度、卷径、数量、样品需求或技术问题"
      },
      submit: "发送询盘",
      submitting: "发送中...",
      success: "谢谢，您的询盘信息已收到，我们会尽快评估并回复。",
      required: "请先填写所有必填字段。",
      emailFallback:
        "已为您打开邮件客户端并填入询盘内容，请发送邮件完成询盘。",
      failure: "抱歉，询盘暂时未能发送，请稍后再试。"
    },
    footer: {
      description:
        "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      wechat: "官方微信公众号",
      mobile: "移动官网",
      columns: {
        公司: ["制造能力", "质量控制", "出口支持"],
        产品: ["AGM 隔板卷材", "定制厚度", "定制宽度"],
        应用: ["VRLA", "UPS", "汽车", "储能"],
        联系: ["获取报价", "技术询盘", "公司宣传册"]
      }
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
const Send = makeIcon("send");
const ShieldCheck = makeIcon("shield");
const ArrowUp = makeIcon("top");
const Truck = makeIcon("truck");

const icons = [Layers3, ShieldCheck, BadgeCheck, Factory, PackageCheck];
const applicationIcons = [ShieldCheck, Globe2, Layers3, Truck, Factory];
const capabilityIcons = [Factory, ClipboardCheck, Truck, Layers3];
const whyIcons = [BadgeCheck, Truck, PackageCheck, Globe2];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const contactInfo = {
  phone: "18907186665",
  email: "vikingsales@vikingagm.com"
};
const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/";
const staticFormFallback =
  process.env.NEXT_PUBLIC_STATIC_FORM_FALLBACK === "true";
const inquiryEmail =
  process.env.NEXT_PUBLIC_INQUIRY_EMAIL || contactInfo.email;
const icpLicense = process.env.NEXT_PUBLIC_ICP_LICENSE || "";
const certificationImages = [
  "/images/certification-1-900.webp",
  "/images/certification-2-900.webp",
  "/images/certification-3-900.webp",
  "/images/certification-4-900.webp",
  "/images/certification-5-900.webp"
];
const useEvidenceImagePlaceholders = true;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function VikingHome({ initialLang }: { initialLang: Lang }) {
  const lang = initialLang;
  const [formState, setFormState] = useState<
    "idle" | "error" | "success" | "failure" | "emailFallback"
  >("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = copy[lang];
  const footerColumns = Object.entries(t.footer.columns) as Array<
    [string, readonly string[]]
  >;

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
        throw new Error("Netlify Forms submission failed");
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
        homePath={lang === "zh" ? "/zh/" : "/"}
        languagePath={lang === "en" ? "/zh/" : "/"}
        quoteLabel={t.hero.quote}
      />

      <section className="relative min-h-[720px] pt-20">
        <Image
          src={asset("/images/agm-hero-production-1600.webp")}
          alt="AGM separator production line"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/86 to-white/18" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,247,250,0.25),rgba(245,247,250,0.9))]" />

        <div className="relative mx-auto grid min-h-[640px] max-w-7xl content-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
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
                {t.hero.quote}
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
              src={asset("/images/viking-company-building-900.webp")}
              alt={t.company.imageLabel}
              width={900}
              height={675}
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
          {t.values.images.map(([title, text], index) => (
            <article
              key={title}
              className="overflow-hidden rounded-md border border-line bg-white shadow-sm"
            >
              <Image
                src={asset(
                  index === 0
                    ? "/images/viking-finished-separator-roll-900.webp"
                    : "/images/viking-separator-sheets-900.webp"
                )}
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
                : "/products/agm-separator/"
            )}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-signal bg-white px-5 py-3 text-sm font-bold text-signal transition hover:bg-signal hover:text-white"
          >
            {lang === "zh" ? "了解 AGM 隔板产品" : "Learn more about AGM separator"}
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
            src={asset("/images/manufacturing-process-1400.webp")}
            alt="AGM separator manufacturing process flowchart"
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            note={
              lang === "zh"
                ? "制造流程高清图或重新设计流程图素材位"
                : "Manufacturing workflow visual slot reserved"
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
            src={asset("/images/agm-factory-capability-1200.webp")}
            alt="AGM separator manufacturing floor"
            eyebrow="Hubei Viking Technology"
            title="AGM separator manufacturing and roll finishing"
            note={
              lang === "zh"
                ? "生产线、检测设备与包装现场高清素材位"
                : "Production line, testing and packing image slot reserved"
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
              src={asset("/images/agm-quality-control-1200.webp")}
              alt="AGM separator quality control testing"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 45vw, 100vw"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute right-5 top-5 rounded-md bg-white/92 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <FlaskConical size={18} className="text-signal" />
                QC Process
              </div>
            </div>
          </div>
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

          <form
            name="inquiry"
            method="POST"
            action="/"
            data-netlify="true"
            netlify-honeypot="bot-field"
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
              <Input name="name" label={t.form.fields.name} placeholder={t.form.placeholders.name} required />
              <Input name="company" label={t.form.fields.company} placeholder={t.form.placeholders.company} required />
              <Input name="email" type="email" label={t.form.fields.email} placeholder={t.form.placeholders.email} required />
              <Input name="country" label={t.form.fields.country} placeholder={t.form.placeholders.country} required />
              <div className="sm:col-span-2">
                <Input
                  name="application"
                  label={t.form.fields.application}
                  placeholder={t.form.placeholders.application}
                  required
                />
              </div>
              <label className="sm:col-span-2">
                <span className="text-sm font-bold text-graphite">
                  {t.form.fields.message}
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder={t.form.placeholders.message}
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
                  ? t.form.success
                  : formState === "failure"
                    ? t.form.failure
                    : formState === "emailFallback"
                      ? t.form.emailFallback
                    : t.form.required}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 text-base font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-steel sm:w-auto"
            >
              {isSubmitting ? t.form.submitting : t.form.submit}
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
            <div className="mt-6 grid max-w-md gap-4 sm:grid-cols-2">
              {[
                [t.footer.wechat, "/images/qrcode_for_logo.jpg"],
                [t.footer.mobile, "/images/website-logo-180.webp"]
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
                  <p className="mt-3 text-center text-sm font-semibold leading-6 text-graphite">
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
                  {links.map((link) => (
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
      </footer>
      <QuickContactDock lang={lang} />
    </main>
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

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

function CertificationBanner({ lang }: { lang: Lang }) {
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
          subject: "网站询盘 - 湖北维京科技",
          name: "姓名",
          company: "公司",
          email: "邮箱",
          country: "国家/地区",
          application: "电池应用",
          message: "留言"
        }
      : {
          subject: "Website inquiry - Viking AGM",
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
