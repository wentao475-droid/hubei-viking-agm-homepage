import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourcesHubPage } from "../../ResourcesHubPage";
import {
  buildResourcesHubMetadata,
  ResourcesHubStructuredData
} from "../../seo";
import type { SiteLocale } from "../../locales";
import { secondaryResourceLocales } from "../../../content/secondary-resources.mjs";

type SecondaryLocale = Exclude<SiteLocale, "en" | "zh">;

export const dynamicParams = false;

export function generateStaticParams() {
  return secondaryResourceLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSecondaryLocale(locale)) notFound();
  return buildResourcesHubMetadata(locale);
}

export default async function Page({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSecondaryLocale(locale)) notFound();

  return (
    <>
      <ResourcesHubStructuredData lang={locale} />
      <ResourcesHubPage lang={locale} />
    </>
  );
}

function isSecondaryLocale(locale: string): locale is SecondaryLocale {
  return secondaryResourceLocales.includes(locale);
}
