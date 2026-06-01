import type { Metadata } from "next";
import type { Lang } from "./VikingHome";

export const SITE_URL = "https://www.vikingagm.com";

const seo = {
  en: {
    path: "/",
    locale: "en_US",
    language: "en",
    title:
      "AGM Glass Fiber Separator Manufacturer | Hubei Viking Technology",
    description:
      "Hubei Viking Technology manufactures AGM glass fiber separators for VRLA, UPS, motorcycle, automotive and energy storage lead-acid battery applications.",
    keywords: [
      "AGM glass fiber separator",
      "AGM battery separator manufacturer",
      "Absorbent Glass Mat separator",
      "VRLA battery separator",
      "lead acid battery separator",
      "Hubei Viking Technology"
    ],
    serviceName: "AGM glass fiber separator manufacturing",
    serviceDescription:
      "AGM separator rolls and sheets for lead-acid battery producers, supported by process control, quality inspection and custom specification discussion."
  },
  zh: {
    path: "/zh/",
    locale: "zh_CN",
    language: "zh-CN",
    title: "AGM 玻璃纤维隔板专业制造商 | 湖北维京科技",
    description:
      "湖北维京科技有限公司专注 AGM 玻璃纤维隔板研发、生产与销售，服务 VRLA、UPS、汽车、摩托车及储能铅酸电池应用。",
    keywords: [
      "AGM 玻璃纤维隔板",
      "AGM 隔板制造商",
      "铅酸电池隔板",
      "VRLA 电池隔板",
      "湖北维京科技",
      "超细玻璃纤维隔板"
    ],
    serviceName: "AGM 玻璃纤维隔板制造",
    serviceDescription:
      "面向铅酸电池生产企业提供 AGM 隔板卷材和片材，支持过程控制、质量检测和定制规格沟通。"
  }
} as const;

export function buildHomeMetadata(lang: Lang): Metadata {
  const current = seo[lang];

  return {
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    alternates: {
      canonical: current.path,
      languages: {
        en: "/",
        "zh-CN": "/zh/",
        "x-default": "/"
      }
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${current.path}`,
      title: current.title,
      description: current.description,
      siteName: "Hubei Viking Technology",
      locale: current.locale,
      images: [
        {
          url: `${SITE_URL}/images/agm-hero-production-1600.webp`,
          width: 1600,
          height: 900,
          alt: current.serviceName
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
      images: [`${SITE_URL}/images/agm-hero-production-1600.webp`]
    }
  };
}

export function StructuredData({ lang }: { lang: Lang }) {
  const current = seo[lang];
  const url = `${SITE_URL}${current.path}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Hubei Viking Technology Co., Ltd.",
        alternateName: "湖北维京科技有限公司",
        url: SITE_URL,
        logo: `${SITE_URL}/images/banner-logo-header.webp`,
        email: "vikingsales@vikingagm.com",
        telephone: "+86-18907186665",
        foundingDate: "2015-12",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ezhou",
          addressRegion: "Hubei",
          addressCountry: "CN"
        },
        description: current.description
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Hubei Viking Technology",
        url: SITE_URL,
        inLanguage: current.language,
        publisher: {
          "@id": `${SITE_URL}/#organization`
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#agm-separator-service`,
        name: current.serviceName,
        description: current.serviceDescription,
        serviceType: "AGM glass fiber separator manufacturing",
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
