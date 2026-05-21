"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type Lang = "en" | "zh";
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
  | "send"
  | "shield"
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
      title:
        "Hubei Viking AGM Glass Fiber Separator Manufacturing",
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
      title: "A real manufacturing base behind every inquiry",
      text:
        "Hubei Viking Technology operates with a visible office and manufacturing base, documented qualification materials and a process-driven supply system for AGM separator customers.",
      imageLabel: "Hubei Viking Technology office and manufacturing base",
      cards: [
        ["Visible company presence", "Office and manufacturing facilities give customers a clearer view of the supplier behind each inquiry."],
        ["Documented qualifications", "Business license and certification materials are available to support buyer due diligence."],
        ["Process-based communication", "A clear workflow supports technical discussion from raw material selection through quality analysis and customer follow-up."]
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
      failure:
        "Sorry, the inquiry could not be sent right now. Please try again later."
    },
    footer: {
      description:
        "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
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
      title: "湖北维京 AGM 玻璃纤维隔板制造",
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
      title: "询盘背后是真实的制造基地",
      text:
        "湖北维京科技拥有可见的办公与制造基地、可供核验的资质材料，以及面向 AGM 隔板客户的过程化供应体系。",
      imageLabel: "湖北维京科技办公及制造基地",
      cards: [
        ["公司实体可见", "办公与制造设施帮助客户更清楚了解询盘背后的供应商主体。"],
        ["资质材料可查", "营业执照和认证材料可用于客户尽调和供应商审核。"],
        ["流程沟通明确", "清晰的流程体系支持从原料选择到质量分析、客户跟进的技术沟通。"]
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
      failure: "抱歉，询盘暂时未能发送，请稍后再试。"
    },
    footer: {
      description:
        "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
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
const Menu = makeIcon("menu");
const PackageCheck = makeIcon("package");
const Send = makeIcon("send");
const ShieldCheck = makeIcon("shield");
const Truck = makeIcon("truck");
const X = makeIcon("x");

const icons = [Layers3, ShieldCheck, BadgeCheck, Factory, PackageCheck];
const applicationIcons = [ShieldCheck, Globe2, Layers3, Truck, Factory];
const capabilityIcons = [Factory, ClipboardCheck, Truck, Layers3];
const whyIcons = [BadgeCheck, Truck, PackageCheck, Globe2];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const useEvidenceImagePlaceholders = true;

function asset(path: string) {
  return `${basePath}${path}`;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<
    "idle" | "error" | "success" | "failure"
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

    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        body.append(key, value);
      }
    });

    setIsSubmitting(true);
    setFormState("idle");

    try {
      const response = await fetch("/__forms.html", {
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

  const navItems = [
    [t.nav.company, "#company"],
    [t.nav.products, "#products"],
    [t.nav.applications, "#applications"],
    [t.nav.quality, "#quality"],
    [t.nav.contact, "#contact"]
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-frost text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/25 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ink text-sm font-bold text-white">
              VK
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink sm:text-base">
                Hubei Viking Technology Co., Ltd.
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.18em] text-steel">
                AGM Separator
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-graphite transition hover:text-signal"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-graphite transition hover:border-signal hover:text-signal"
            >
              {t.language}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ink"
            >
              {t.hero.quote}
              <ArrowRight size={16} />
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-ink lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-line bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-graphite hover:bg-frost"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setLang(lang === "en" ? "zh" : "en")}
                  className="flex-1 rounded-md border border-line px-3 py-2 text-sm font-semibold"
                >
                  {t.language}
                </button>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-md bg-signal px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  {t.hero.quote}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="relative min-h-[720px] pt-20">
        <Image
          src={asset("/images/agm-hero-production.png")}
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
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.06] text-ink sm:text-5xl lg:text-6xl">
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
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.company.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.company.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-steel">{t.company.text}</p>
            <div className="mt-8 grid gap-4">
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

          <EvidenceImageSlot
            src={asset("/images/viking-company-building.jpg")}
            alt={t.company.imageLabel}
            eyebrow="Hubei Viking Technology"
            title={t.company.imageLabel}
            note={
              lang === "zh"
                ? "厂区与办公楼高清素材位已预留"
                : "Factory and office image slot reserved"
            }
            replacement="public/images/viking-company-building.jpg"
            icon="factory"
            showImage
          />
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
                    ? "/images/viking-finished-separator-roll.jpg"
                    : "/images/viking-separator-sheets.jpg"
                )}
                alt={title}
                width={1400}
                height={1000}
                sizes="(min-width: 768px) 50vw, 100vw"
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
            src={asset("/images/viking-manufacturing-process.svg")}
            alt="AGM separator manufacturing process flowchart"
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            note={
              lang === "zh"
                ? "制造流程高清图或重新设计流程图素材位"
                : "Manufacturing workflow visual slot reserved"
            }
            replacement="public/images/viking-manufacturing-process.svg"
            icon="clipboard"
            showImage
            wide
          />
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <EvidenceImageSlot
            src={asset("/images/agm-factory-capability.png")}
            alt="AGM separator manufacturing floor"
            eyebrow="Hubei Viking Technology"
            title="AGM separator manufacturing and roll finishing"
            note={
              lang === "zh"
                ? "生产线、检测设备与包装现场高清素材位"
                : "Production line, testing and packing image slot reserved"
            }
            replacement="public/images/agm-factory-capability.png"
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
              src={asset("/images/agm-quality-control.png")}
              alt="AGM separator quality control testing"
              width={1456}
              height={1088}
              sizes="(min-width: 1024px) 45vw, 100vw"
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
          <EvidenceImageSlot
            src={asset("/images/viking-certification-evidence.jpg")}
            alt="Hubei Viking certificate and compliance materials"
            eyebrow={t.certifications.eyebrow}
            title={t.certifications.title}
            note={
              lang === "zh"
                ? "营业执照、认证证书与资质文件高清素材位"
                : "License, certificate and compliance image slot reserved"
            }
            replacement="public/images/viking-certification-evidence.jpg"
            icon="badge"
          />

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
                </div>
              </div>
            </div>
          </div>

          <form
            name="inquiry"
            method="POST"
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
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-sm font-bold text-white">
                VK
              </span>
              <div>
                <p className="font-bold text-ink">Hubei Viking Technology Co., Ltd.</p>
                <p className="text-sm text-steel">湖北维京科技有限公司</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-steel">
              {t.footer.description}
            </p>
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
    </main>
  );
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
  wide = false
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
          unoptimized={src.endsWith(".svg")}
          className={`${wide ? "aspect-[7/5]" : "aspect-[4/3]"} w-full object-cover`}
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
