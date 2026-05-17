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
        "AGM Separator Manufacturer for Reliable Lead-Acid Battery Performance",
      subtitle:
        "High-quality glass fiber separators for VRLA, UPS, motorcycle, automotive and energy storage batteries.",
      quote: "Request a Quote",
      products: "View Products",
      proof: ["AGM glass fiber separator", "Custom specifications", "Export-ready supply"]
    },
    stats: [
      { value: "VRLA", label: "Battery separator focus" },
      { value: "OEM", label: "Custom roll and sheet support" },
      { value: "QC", label: "Batch inspection and traceability" }
    ],
    values: {
      eyebrow: "Product Value",
      title: "Engineered for consistent battery performance",
      text:
        "Our AGM separators are developed for stable absorption, reliable compression behavior and repeatable performance in lead-acid battery production.",
      items: [
        ["High Absorption", "Fast electrolyte uptake with uniform retention across the separator web."],
        ["Low Electrical Resistance", "Designed to support efficient current flow and battery performance."],
        ["Stable Thickness", "Controlled caliper consistency for reliable plate assembly and compression."],
        ["Strong Tensile Strength", "Robust handling performance for converting, cutting and assembly lines."],
        ["Consistent Quality", "Lot-to-lot control for customers requiring dependable mass production supply."]
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
      title: "Built for stable industrial supply",
      text:
        "From raw glass fiber material preparation to roll finishing and shipment, our process is organized for repeatability, clean handling and export communication.",
      items: [
        ["Production capacity", "Roll-to-roll production planning for ongoing battery separator demand."],
        ["Quality inspection", "Routine checks for key physical and electrical performance indicators."],
        ["Stable supply", "Coordinated scheduling, packaging and shipment support for overseas customers."],
        ["Custom specifications", "Thickness, width, roll format and application-oriented requirements can be discussed."]
      ]
    },
    quality: {
      eyebrow: "Quality Control",
      title: "Controlled from raw material to finished batch",
      text:
        "Quality assurance is managed throughout production so customers can evaluate each batch with clear parameters and consistent communication.",
      items: [
        "Raw material control",
        "In-process inspection",
        "Finished product testing",
        "Batch traceability"
      ]
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
        "Tell us your battery application and separator requirements. Our team will review your request and respond with suitable specifications.",
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
        message: "Target thickness, width, roll size, quantity or technical questions"
      },
      submit: "Send Inquiry",
      success:
        "Thank you. Your inquiry has been received in this demo form state.",
      required: "Please complete all required fields before submitting."
    },
    footer: {
      description:
        "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
      columns: {
        Company: ["About Manufacturing", "Quality Control", "Export Support"],
        Products: ["AGM Separator Rolls", "Custom Thickness", "Custom Width"],
        Applications: ["VRLA", "UPS", "Automotive", "Energy Storage"],
        Contact: ["Request a Quote", "Technical Inquiry", "Sample Discussion"]
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
      title: "可靠铅酸电池性能所需的 AGM 隔板制造商",
      subtitle:
        "为 VRLA、UPS、摩托车、汽车及储能电池提供高品质玻璃纤维 AGM 隔板。",
      quote: "获取报价",
      products: "查看产品",
      proof: ["AGM 玻璃纤维隔板", "支持定制规格", "具备出口供应能力"]
    },
    stats: [
      { value: "VRLA", label: "聚焦铅酸电池隔板" },
      { value: "OEM", label: "支持卷材与片材定制" },
      { value: "QC", label: "批次检测与追溯" }
    ],
    values: {
      eyebrow: "产品价值",
      title: "面向稳定电池性能的材料设计",
      text:
        "我们的 AGM 隔板注重吸液稳定性、装配压缩表现与批量一致性，服务铅酸电池规模化生产。",
      items: [
        ["高吸液性", "电解液吸收速度快，保持能力均匀稳定。"],
        ["低电阻", "有助于电流传导效率和电池性能稳定。"],
        ["厚度稳定", "厚度控制一致，便于极群装配和压缩管理。"],
        ["拉伸强度高", "适合分切、转化及电池装配过程中的材料搬运。"],
        ["品质一致", "通过批次控制满足客户连续生产需求。"]
      ]
    },
    applications: {
      eyebrow: "应用场景",
      title: "服务多个铅酸电池核心应用领域",
      items: ["VRLA 电池", "UPS 电池", "摩托车电池", "汽车电池", "储能系统"]
    },
    factory: {
      eyebrow: "工厂能力",
      title: "面向长期稳定供应的制造体系",
      text:
        "从玻璃纤维原料准备到卷材成品和出货包装，生产流程注重稳定、洁净和可沟通的出口交付。",
      items: [
        ["生产能力", "卷对卷生产计划，支持持续性的电池隔板需求。"],
        ["质量检测", "对关键物理性能和电性能指标进行常规检测。"],
        ["稳定供应", "配合海外客户的订单节奏、包装及出运需求。"],
        ["规格定制", "可沟通厚度、宽度、卷径及不同应用要求。"]
      ]
    },
    quality: {
      eyebrow: "质量控制",
      title: "从原料到成品批次的过程管理",
      text:
        "质量保障贯穿生产全过程，帮助客户以明确参数和稳定沟通评估每一批材料。",
      items: ["原材料控制", "过程检验", "成品测试", "批次追溯"]
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
        "请告诉我们您的电池应用和隔板需求，我们将根据规格、数量和用途进行评估并回复。",
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
        message: "目标厚度、宽度、卷径、数量或技术问题"
      },
      submit: "发送询盘",
      success: "谢谢，演示表单已收到您的询盘信息。",
      required: "请先填写所有必填字段。"
    },
    footer: {
      description:
        "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
      columns: {
        公司: ["制造能力", "质量控制", "出口支持"],
        产品: ["AGM 隔板卷材", "定制厚度", "定制宽度"],
        应用: ["VRLA", "UPS", "汽车", "储能"],
        联系: ["获取报价", "技术询盘", "样品沟通"]
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

function asset(path: string) {
  return `${basePath}${path}`;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "error" | "success">(
    "idle"
  );
  const t = copy[lang];
  const footerColumns = Object.entries(t.footer.columns) as Array<
    [string, readonly string[]]
  >;

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

    setFormState("success");
    form.reset();
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
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-md bg-ink shadow-industrial">
            <Image
              src={asset("/images/agm-factory-capability.png")}
              alt="AGM separator manufacturing floor"
              width={1400}
              height={1049}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/86 to-transparent p-6">
              <p className="max-w-md text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                Hubei Viking Technology
              </p>
              <p className="mt-2 text-xl font-bold text-white">
                AGM separator manufacturing and roll finishing
              </p>
            </div>
          </div>

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
            onSubmit={submitInquiry}
            className="rounded-md bg-white p-5 text-ink shadow-industrial sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="name" label={t.form.fields.name} placeholder={t.form.placeholders.name} />
              <Input name="company" label={t.form.fields.company} placeholder={t.form.placeholders.company} />
              <Input name="email" type="email" label={t.form.fields.email} placeholder={t.form.placeholders.email} />
              <Input name="country" label={t.form.fields.country} placeholder={t.form.placeholders.country} />
              <div className="sm:col-span-2">
                <Input
                  name="application"
                  label={t.form.fields.application}
                  placeholder={t.form.placeholders.application}
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
                className={`mt-5 rounded-md px-4 py-3 text-sm font-semibold ${
                  formState === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-800"
                }`}
              >
                {formState === "success" ? t.form.success : t.form.required}
              </div>
            )}

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 text-base font-semibold text-white transition hover:bg-ink sm:w-auto"
            >
              {t.form.submit}
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

function Input({
  name,
  label,
  placeholder,
  type = "text"
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label>
      <span className="text-sm font-bold text-graphite">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-line bg-frost px-4 py-3 text-sm outline-none transition placeholder:text-steel/70 focus:border-signal focus:bg-white"
      />
    </label>
  );
}
