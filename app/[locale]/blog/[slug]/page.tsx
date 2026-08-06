import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BlogArticlePage,
  type BlogArticleKind
} from "../../../BlogArticlePage";
import {
  buildSecondaryArticleMetadata,
  SecondaryArticleStructuredData
} from "../../../seo";
import type { SiteLocale } from "../../../locales";
import {
  articleDefinitions,
  articleKinds,
  secondaryResourceLocales
} from "../../../../content/secondary-resources.mjs";

type SecondaryLocale = Exclude<SiteLocale, "en" | "zh">;

const kindBySlug = Object.fromEntries(
  articleKinds.map((kind) => [articleDefinitions[kind][0], kind])
) as Record<string, BlogArticleKind>;

export const dynamicParams = false;

export function generateStaticParams() {
  return secondaryResourceLocales.flatMap((locale) =>
    articleKinds.map((kind) => ({
      locale,
      slug: articleDefinitions[kind][0]
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const kind = kindBySlug[slug];
  if (!isSecondaryLocale(locale) || !kind) notFound();
  return buildSecondaryArticleMetadata(locale, kind);
}

export default async function Page({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const kind = kindBySlug[slug];
  if (!isSecondaryLocale(locale) || !kind) notFound();

  return (
    <>
      <SecondaryArticleStructuredData lang={locale} kind={kind} />
      <BlogArticlePage lang={locale} page={kind} />
    </>
  );
}

function isSecondaryLocale(locale: string): locale is SecondaryLocale {
  return secondaryResourceLocales.includes(locale);
}
