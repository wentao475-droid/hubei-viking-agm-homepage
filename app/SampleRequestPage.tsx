import Image from "next/image";
import { InquiryForm } from "./InquiryForm";
import { SiteHeader } from "./SiteHeader";
import { sampleRequestFaq } from "./sample-request-copy";
import type { Lang } from "./VikingHome";

type IconProps = { size?: number; className?: string };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const icpLicense = process.env.NEXT_PUBLIC_ICP_LICENSE || "鄂ICP备2026033781号";

const pageCopy = {
  en: {
    homePath: "/",
    languagePath: "/zh/request-agm-separator-sample/",
    eyebrow: "Sample and Specification Review",
    title: "Request an AGM Separator Sample and Specification Match",
    subtitle:
      "Share the battery application and the separator information you already have. Viking AGM can help review the suitable roll or sheet direction before sample or quotation discussion.",
    primary: "Start Sample Request",
    secondary: "Download Technical Capability PDF",
    proof: [
      "Roll and sheet formats",
      "Application-based discussion",
      "Quality and packing requirements"
    ],
    requirements: {
      eyebrow: "Information Checklist",
      title: "What to provide for a useful first review",
      text:
        "You do not need to finalize every parameter before contacting us. Send the available information first, and clearly mark any points that are still under review.",
      items: [
        ["Battery application", "VRLA, UPS, motorcycle, automotive, energy storage or another lead-acid battery application."],
        ["Product form", "Roll material, pre-cut sheets or a request to compare both formats."],
        ["Dimensions", "Target thickness, roll width, sheet height and width, or an existing drawing."],
        ["Technical reference", "Target values, customer standards, test items or an existing separator sample if available."],
        ["Quantity and packing", "Sample quantity, trial or production planning, roll core, labels and packing expectations."]
      ]
    },
    process: {
      eyebrow: "What Happens Next",
      title: "A practical path from inquiry to sample discussion",
      items: [
        ["1", "Application review", "We review the battery application, product form and available specification information."],
        ["2", "Missing-point confirmation", "The team follows up on dimensions, reference samples, test items or packing details that need clarification."],
        ["3", "Next-step discussion", "Both sides discuss a suitable sample, technical review or quotation path based on the confirmed direction."]
      ]
    },
    evidence: {
      eyebrow: "Manufacturing Evidence",
      title: "Review production, inspection and delivery preparation",
      items: [
        {
          title: "Production capability",
          text: "AGM separator production and roll handling support specification and batch-supply discussion.",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "Viking AGM separator production capability"
        },
        {
          title: "Quality inspection",
          text: "Inspection requirements can be confirmed around the customer application and agreed test items.",
          src: "/images/agm-quality-control-1200.webp",
          alt: "AGM separator quality inspection at Viking Technology"
        },
        {
          title: "Packing and delivery",
          text: "Roll, sheet, label and pallet requirements can be reviewed before sample or order arrangement.",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "AGM separator pallet packing prepared for delivery"
        }
      ]
    },
    download: {
      eyebrow: "Buyer Reference",
      title: "Download the Viking AGM technical capability overview",
      text:
        "A concise bilingual reference covering product forms, application discussion, quality checks, packing and the information needed for specification matching.",
      button: "Download PDF"
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions before requesting a sample"
    },
    form: {
      eyebrow: "Start the Discussion",
      title: "Send the information you already have",
      text:
        "Name and contact information are enough to start. Application, product form and dimensions help us prepare a more useful follow-up.",
      hints: [
        "Battery application",
        "Roll or sheet format",
        "Thickness, width or sheet size",
        "Sample, testing and packing needs"
      ],
      message:
        "Optional: battery application, target thickness, roll width or sheet size, sample quantity, technical requirements or packing needs"
    },
    footer:
      "AGM glass fiber separator manufacturing, quality review and supply coordination for lead-acid battery projects."
  },
  zh: {
    homePath: "/zh/",
    languagePath: "/request-agm-separator-sample/",
    eyebrow: "样品与规格评审",
    title: "申请 AGM 隔板样品与规格匹配",
    subtitle:
      "提供您的电池应用及现有隔板信息。湖北维京可在样品或报价沟通前，协助评审适合的卷材、片材及规格方向。",
    primary: "开始申请样品",
    secondary: "下载技术能力 PDF",
    proof: ["卷材与片材形式", "按电池应用沟通", "检测与包装要求确认"],
    requirements: {
      eyebrow: "信息清单",
      title: "首次评审建议提供哪些信息",
      text:
        "联系前不需要把所有参数完全确定。可以先发送已有信息，并清楚标注仍在评估的项目。",
      items: [
        ["电池应用", "VRLA、UPS、摩托车、汽车、储能或其他铅酸电池应用。"],
        ["产品形式", "卷材、预裁切片材，或希望比较两种形式。"],
        ["尺寸信息", "目标厚度、卷材宽度、片材长宽，或现有图纸。"],
        ["技术参考", "已有目标值、客户标准、检测项目或现有隔板样品。"],
        ["数量与包装", "样品数量、试产或量产计划、芯管、标签和包装要求。"]
      ]
    },
    process: {
      eyebrow: "提交后流程",
      title: "从询盘到样品沟通的清晰路径",
      items: [
        ["1", "应用评审", "评审电池应用、产品形式及已有规格信息。"],
        ["2", "补充信息确认", "跟进仍需明确的尺寸、参考样品、检测项目或包装细节。"],
        ["3", "下一步沟通", "根据确认方向，共同讨论适合的样品、技术评审或报价路径。"]
      ]
    },
    evidence: {
      eyebrow: "制造证据",
      title: "查看生产、检测与交付准备",
      items: [
        {
          title: "生产能力",
          text: "AGM 隔板生产与卷材处理能力，支持规格及批次供货沟通。",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "湖北维京 AGM 隔板生产能力"
        },
        {
          title: "质量检测",
          text: "可围绕客户应用和双方约定的检测项目确认质量要求。",
          src: "/images/agm-quality-control-1200.webp",
          alt: "湖北维京 AGM 隔板质量检测"
        },
        {
          title: "包装与交付",
          text: "卷材、片材、标签和托盘要求可在样品或订单安排前评审。",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "AGM 隔板托盘包装与交付准备"
        }
      ]
    },
    download: {
      eyebrow: "采购参考",
      title: "下载维京 AGM 技术能力概览",
      text:
        "中英文简版资料，包含产品形式、应用沟通、质量检查、包装方式及规格匹配所需信息。",
      button: "下载 PDF"
    },
    faq: {
      eyebrow: "常见问题",
      title: "申请样品前的常见问题"
    },
    form: {
      eyebrow: "开始沟通",
      title: "发送您已经掌握的信息",
      text:
        "姓名和联系方式即可开始。补充电池应用、产品形式和尺寸信息，有助于我们准备更有效的后续沟通。",
      hints: ["电池应用", "卷材或片材形式", "厚度、宽度或片材尺寸", "样品、检测和包装需求"],
      message:
        "可选：电池应用、目标厚度、卷材宽度或片材尺寸、样品数量、技术要求或包装需求"
    },
    footer: "面向铅酸电池项目提供 AGM 玻璃纤维隔板制造、质量评审和供货协同。"
  }
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function SampleRequestPage({ lang }: { lang: Lang }) {
  const t = pageCopy[lang];

  return (
    <main className="min-h-screen overflow-hidden bg-frost text-ink">
      <SiteHeader
        lang={lang}
        homePath={t.homePath}
        languagePath={t.languagePath}
        quoteLabel={lang === "zh" ? "申请样品" : "Request Sample"}
      />

      <section className="relative overflow-hidden pt-20">
        <Image
          src={asset("/images/agm-hero-production-1600.webp")}
          alt={
            lang === "zh"
              ? "湖北维京 AGM 隔板生产线"
              : "Viking AGM separator production line"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,32,51,0.96)_0%,rgba(23,32,51,0.88)_48%,rgba(23,32,51,0.34)_100%)]" />
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
              {t.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              {t.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 font-semibold text-white shadow-industrial transition hover:bg-white hover:text-ink"
              >
                {t.primary}
                <ArrowRight size={18} />
              </a>
              <a
                href={asset("/downloads/viking-agm-technical-capability.pdf")}
                download
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white hover:text-ink"
              >
                {t.secondary}
                <DownloadIcon size={18} />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {t.proof.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/8 px-3 py-2 text-sm font-semibold text-white/82"
                >
                  <CheckIcon size={16} className="text-sky-200" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={t.requirements.eyebrow}
              title={t.requirements.title}
            />
            <p className="mt-5 text-base leading-8 text-graphite">
              {t.requirements.text}
            </p>
          </div>
          <div className="grid gap-4">
            {t.requirements.items.map(([title, description], index) => (
              <article
                key={title}
                className="grid gap-4 rounded-md border border-line bg-white p-5 shadow-sm sm:grid-cols-[3rem_1fr]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-signal text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-bold text-ink">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-steel">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {t.process.items.map(([number, title, text]) => (
              <article
                key={number}
                className="rounded-md border border-line bg-frost p-6"
              >
                <span className="text-4xl font-bold text-signal">{number}</span>
                <h2 className="mt-6 text-xl font-bold text-ink">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={t.evidence.eyebrow} title={t.evidence.title} />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {t.evidence.items.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-md border border-line bg-white shadow-sm"
              >
                <Image
                  src={asset(item.src)}
                  alt={item.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  sizes="(min-width: 1024px) 31vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
              {t.download.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight">
              {t.download.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/72">
              {t.download.text}
            </p>
          </div>
          <a
            href={asset("/downloads/viking-agm-technical-capability.pdf")}
            download
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 font-semibold text-ink transition hover:bg-signal hover:text-white"
          >
            {t.download.button}
            <DownloadIcon size={18} />
          </a>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div className="grid gap-4">
            {sampleRequestFaq[lang].map(([question, answer]) => (
              <article
                key={question}
                className="rounded-md border border-line bg-frost p-5"
              >
                <h2 className="font-bold text-ink">{question}</h2>
                <p className="mt-2 text-sm leading-7 text-steel">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-ink px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
              {t.form.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              {t.form.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
              {t.form.text}
            </p>
            <div className="mt-8 grid gap-3">
              {t.form.hints.map((hint) => (
                <div
                  key={hint}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/82"
                >
                  <CheckIcon size={17} className="shrink-0 text-sky-200" />
                  {hint}
                </div>
              ))}
            </div>
          </div>
          <InquiryForm
            lang={lang}
            defaultInterestedProduct={
              lang === "zh"
                ? "AGM 隔板样品与规格匹配"
                : "AGM separator sample and specification match"
            }
            messagePlaceholder={t.form.message}
            className="sm:p-8"
          />
        </div>
      </section>

      <footer className="bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={asset("/images/viking-logo-footer-320.webp")}
              alt="Viking Technology logo"
              width={320}
              height={320}
              className="h-16 w-16 object-contain"
            />
            <div>
              <p className="font-bold text-ink">Hubei Viking Technology Co., Ltd.</p>
              <p className="mt-1 text-sm text-steel">{t.footer}</p>
            </div>
          </div>
          <a
            href={asset(t.homePath)}
            className="inline-flex items-center gap-2 text-sm font-bold text-signal transition hover:text-ink"
          >
            {lang === "zh" ? "返回首页" : "Back to homepage"}
            <ArrowRight size={16} />
          </a>
        </div>
        <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-3 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Hubei Viking Technology Co., Ltd.</span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition hover:text-signal"
          >
            {icpLicense}
          </a>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
    </div>
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
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function DownloadIcon({ size = 18, className = "" }: IconProps) {
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
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
