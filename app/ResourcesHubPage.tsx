import Image from "next/image";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";
import {
  getArticlesByCategory,
  localizeHref,
  localizeText,
  resourceActions,
  resourceArticles,
  resourceCategoryCopy,
  resourceCategoryOrder
} from "./resourceCatalog";
import type { SiteLocale } from "./locales";
import { secondaryResourceData } from "../content/secondary-resources.mjs";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const icpLicense =
  process.env.NEXT_PUBLIC_ICP_LICENSE || "鄂ICP备2026033781号";

const pageCopy = {
  en: {
    homePath: "/",
    languagePath: "/zh/resources/",
    quoteLabel: "Request Sample",
    eyebrow: "AGM Separator Resource Center",
    title: "Technical Resources for AGM Separator Buyers",
    subtitle:
      "Use practical buyer guides, manufacturing notes and application articles to prepare specifications, samples and supplier discussions.",
    countLabel: `${resourceArticles.length} bilingual technical articles`,
    actionEyebrow: "Start a purchasing discussion",
    actionTitle: "Move from research to specification matching",
    actionText:
      "Share the information you already have, or download a concise capability overview before contacting our team.",
    libraryEyebrow: "Resource library",
    libraryTitle: "Browse by purchasing topic",
    articleLabel: "Article",
    readLabel: "Read article",
    closingEyebrow: "Next step",
    closingTitle: "Need help matching an AGM separator specification?",
    closingText:
      "Send your battery application, roll or sheet format and available dimensions. We can continue the technical discussion from there.",
    closingPrimary: "Request a Sample & Specification Match",
    closingSecondary: "View AGM Separator Products",
    footer:
      "AGM glass fiber separator manufacturing, quality review and supply coordination for lead-acid battery projects.",
    backHome: "Back to homepage"
  },
  zh: {
    homePath: "/zh/",
    languagePath: "/resources/",
    quoteLabel: "申请样品",
    eyebrow: "AGM 隔板资料中心",
    title: "面向 AGM 隔板采购与技术团队的实用资料",
    subtitle:
      "通过采购指南、生产质量说明和应用文章，为规格确认、样品评估及供应商沟通做好准备。",
    countLabel: `${resourceArticles.length} 篇中英文技术文章`,
    actionEyebrow: "开始采购沟通",
    actionTitle: "从资料了解进入规格匹配",
    actionText:
      "可以先提供已经掌握的需求，也可以下载技术能力概览，再与我们沟通具体规格。",
    libraryEyebrow: "资料库",
    libraryTitle: "按采购主题查看",
    articleLabel: "文章",
    readLabel: "查看文章",
    closingEyebrow: "下一步",
    closingTitle: "需要协助匹配 AGM 隔板规格？",
    closingText:
      "提供电池应用、卷材或片材形式以及已有尺寸信息，即可开始进一步技术沟通。",
    closingPrimary: "申请样品与规格匹配",
    closingSecondary: "查看 AGM 隔板产品",
    footer:
      "面向铅酸电池项目提供 AGM 玻璃纤维隔板制造、质量评审和供货协同。",
    backHome: "返回首页"
  }
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

function formatDate(date: string, lang: SiteLocale) {
  if (lang === "zh") {
    const [year, month, day] = date.split("-");
    return `${year}年${Number(month)}月${Number(day)}日`;
  }

  const dateLocales: Record<SiteLocale, string> = {
    en: "en-US", zh: "zh-CN", vi: "vi-VN", ko: "ko-KR",
    ja: "ja-JP", es: "es", pt: "pt-BR", ru: "ru-RU", ar: "ar"
  };
  return new Intl.DateTimeFormat(dateLocales[lang], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00Z`));
}

export function ResourcesHubPage({ lang }: { lang: SiteLocale }) {
  const t: any =
    lang === "en" || lang === "zh"
      ? pageCopy[lang]
      : {
          homePath: `/${lang}/`, languagePath: "/resources/",
          quoteLabel: secondaryResourceData[lang].ui.sample,
          eyebrow: secondaryResourceData[lang].hub.eyebrow,
          title: secondaryResourceData[lang].hub.title,
          subtitle: secondaryResourceData[lang].hub.subtitle,
          countLabel: secondaryResourceData[lang].hub.count,
          actionEyebrow: secondaryResourceData[lang].hub.actionEyebrow,
          actionTitle: secondaryResourceData[lang].hub.actionTitle,
          actionText: secondaryResourceData[lang].hub.actionText,
          libraryEyebrow: secondaryResourceData[lang].hub.libraryEyebrow,
          libraryTitle: secondaryResourceData[lang].hub.libraryTitle,
          articleLabel: secondaryResourceData[lang].ui.article,
          readLabel: secondaryResourceData[lang].ui.read,
          closingEyebrow: secondaryResourceData[lang].hub.closingEyebrow,
          closingTitle: secondaryResourceData[lang].hub.closingTitle,
          closingText: secondaryResourceData[lang].hub.closingText,
          closingPrimary: secondaryResourceData[lang].ui.sampleTitle,
          closingSecondary: secondaryResourceData[lang].hub.productLink,
          footer: secondaryResourceData[lang].hub.footer,
          backHome: secondaryResourceData[lang].nav.company
        };

  return (
    <main className="min-h-screen overflow-hidden bg-frost text-ink">
      <SiteHeader
        lang={lang}
        homePath={t.homePath}
        languagePath={t.languagePath}
        quoteLabel={t.quoteLabel}
      />

      <section className="bg-ink px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            {t.subtitle}
          </p>
          <div className="mt-8 inline-flex rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/72">
            {t.countLabel}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
                {t.actionEyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                {t.actionTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-graphite">
                {t.actionText}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {resourceActions.map((action, index) => (
                <a
                  key={action.id}
                  href={asset(localizeHref(action.href, lang))}
                  className={`group flex min-h-48 flex-col justify-between rounded-md border p-6 transition focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 ${
                    index === 0
                      ? "border-signal bg-signal text-white shadow-industrial"
                      : "border-line bg-white text-ink hover:border-signal/40"
                  }`}
                >
                  <span>
                    <span
                      className={`text-xs font-bold uppercase tracking-[0.16em] ${
                        index === 0 ? "text-sky-100" : "text-signal"
                      }`}
                    >
                      {index === 0
                        ? lang === "en" ? "Sample & specification" : lang === "zh" ? "样品与规格" : secondaryResourceData[lang].ui.sample
                        : lang === "en" ? "Download" : lang === "zh" ? "下载资料" : secondaryResourceData[lang].ui.download}
                    </span>
                    <span className="mt-4 block text-xl font-bold leading-7">
                      {localizeText(action.title, lang)}
                    </span>
                    <span
                      className={`mt-3 block text-sm leading-7 ${
                        index === 0 ? "text-white/72" : "text-steel"
                      }`}
                    >
                      {localizeText(action.description, lang)}
                    </span>
                  </span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                    {index === 0
                      ? t.closingPrimary
                      : localizeText(action.title, lang)}
                    <span
                      aria-hidden="true"
                      className="transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
            {t.libraryEyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            {t.libraryTitle}
          </h2>

          <div className="mt-14 divide-y divide-line border-y border-line">
            {resourceCategoryOrder.map((category) => (
              <section
                key={category}
                id={category}
                className="scroll-mt-28 py-12"
              >
                <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
                  <div>
                    <h2 className="text-2xl font-bold text-ink">
                      {localizeText(resourceCategoryCopy[category].title, lang)}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-steel">
                      {localizeText(
                        resourceCategoryCopy[category].description,
                        lang
                      )}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {getArticlesByCategory(category, lang).map((article) => (
                      <a
                        key={article.id}
                        href={asset(localizeHref(article.href, lang))}
                        className="group grid gap-4 rounded-md border border-line bg-frost p-5 transition hover:border-signal/35 hover:bg-white focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 sm:grid-cols-[1fr_auto] sm:items-center"
                      >
                        <span>
                          <span className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-signal">
                            {t.articleLabel}
                            <span className="h-1 w-1 rounded-full bg-line" />
                            <time dateTime={article.publishedAt}>
                              {formatDate(article.publishedAt, lang)}
                            </time>
                          </span>
                          <span className="mt-3 block text-lg font-bold leading-7 text-ink transition group-hover:text-signal">
                            {localizeText(article.title, lang)}
                          </span>
                          <span className="mt-2 block text-sm leading-7 text-steel">
                            {localizeText(article.description, lang)}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-signal">
                          {t.readLabel}
                          <span
                            aria-hidden="true"
                            className="transition group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-frost px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-l-4 border-signal bg-white p-7 shadow-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.closingEyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight">
              {t.closingTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-graphite">
              {t.closingText}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={asset(localizeHref(resourceActions[0].href, lang))}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 text-sm font-bold text-white transition hover:bg-ink"
            >
              {t.closingPrimary}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={asset(
                lang === "en"
                  ? "/products/agm-separator/"
                  : `/${lang}/products/agm-separator/`
              )}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-6 py-3.5 text-sm font-bold text-ink transition hover:border-signal hover:text-signal"
            >
              {t.closingSecondary}
              <span aria-hidden="true">→</span>
            </a>
          </div>
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
              <p className="font-bold text-ink">
                Hubei Viking Technology Co., Ltd.
              </p>
              <p className="mt-1 text-sm text-steel">{t.footer}</p>
              <SocialLinks lang={lang} />
            </div>
          </div>
          <a
            href={asset(t.homePath)}
            className="inline-flex items-center gap-2 text-sm font-bold text-signal transition hover:text-ink"
          >
            {t.backHome}
            <span aria-hidden="true">→</span>
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
