import type { Metadata } from "next";
import { seoContent } from "./cms-content";
import { productFaqCopy } from "./seo-faq";
import { sampleRequestFaq } from "./sample-request-copy";
import { socialProfileUrls } from "./SocialLinks";
import {
  getResourcesPath,
  localizeHref,
  localizeText,
  resourceArticles
} from "./resourceCatalog";
import { localeHomePaths } from "./locales";
import type { Lang, SiteLocale } from "./locales";
import {
  articleDefinitions,
  buildSecondaryArticleSeo,
  secondaryResourceData
} from "../content/secondary-resources.mjs";
import {
  thermalInsulationPaperLeadCopy,
  thermalInsulationPaperSeo
} from "../content/thermal-insulation-paper.mjs";
import type { BlogArticleKind } from "./BlogArticlePage";

type ApplicationLocale = SiteLocale;

export const SITE_URL = "https://www.vikingagm.com";
const PREVIEW_IMAGE = `${SITE_URL}/images/viking-finished-separator-roll-900.webp`;
const AGM_ROLL_END_FACE_IMAGE = `${SITE_URL}/images/evidence/agm-separator-roll-end-face-01.webp`;
const SHEETS_PREVIEW_IMAGE = `${SITE_URL}/images/sheets1-900.webp`;
const THERMAL_INSULATION_PAPER_IMAGE = `${SITE_URL}/images/capability/agm-roll-finished.jpg`;
const QUALITY_PREVIEW_IMAGE = `${SITE_URL}/images/agm-quality-control-1200.webp`;
const UPS_APPLICATION_IMAGE = `${SITE_URL}/images/applications/ups-vrla-battery-application-1200.webp`;
const MOTORCYCLE_APPLICATION_IMAGE = `${SITE_URL}/images/applications/motorcycle-vrla-battery-application-1200.webp`;
const ENERGY_STORAGE_APPLICATION_IMAGE = `${SITE_URL}/images/applications/energy-storage-lead-acid-battery-application-1200.webp`;
const HOME_VIDEO_URL = `${SITE_URL}/videos/viking-agm-promo-720p.mp4`;
const HOME_VIDEO_POSTER = `${SITE_URL}/images/viking-agm-promo-poster.webp`;

const homeSeo = {
  en: {
    path: "/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    alternateSiteName: "Hubei Viking AGM",
    title: "AGM Battery Separator Manufacturer | VRLA & Energy Storage | Viking AGM",
    description:
      "Hubei Viking Technology manufactures ISO9001 certified AGM glass fiber separators for VRLA, UPS, motorcycle, automotive and energy storage lead-acid batteries. Request a quote.",
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
    siteName: "湖北维京AGM",
    alternateSiteName: "维京AGM",
    title: "铅酸电池隔板厂家 | AGM隔板生产厂家 | 湖北维京AGM",
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
  },
  vi: {
    path: "/vi/",
    locale: "vi_VN",
    language: "vi-VN",
    siteName: "Viking AGM",
    alternateSiteName: "Hubei Viking AGM",
    title: "Nhà sản xuất tấm ngăn AGM cho ắc quy VRLA | Viking AGM",
    description:
      "Viking AGM sản xuất tấm ngăn sợi thủy tinh AGM dạng cuộn và tấm cho ắc quy VRLA, UPS, xe máy và lưu trữ năng lượng. Gửi yêu cầu để đối chiếu thông số.",
    keywords: [
      "tấm ngăn AGM",
      "nhà sản xuất tấm ngăn AGM",
      "tấm ngăn sợi thủy tinh AGM",
      "tấm ngăn ắc quy VRLA",
      "tấm ngăn ắc quy chì axit"
    ],
    serviceName: "Sản xuất tấm ngăn sợi thủy tinh AGM",
    serviceDescription:
      "Cung cấp tấm ngăn AGM dạng cuộn và dạng tấm cho nhà sản xuất ắc quy chì axit, hỗ trợ xác nhận quy cách, kiểm soát chất lượng và yêu cầu đóng gói."
  },
  ko: {
    path: "/ko/",
    locale: "ko_KR",
    language: "ko-KR",
    siteName: "Viking AGM",
    alternateSiteName: "Hubei Viking AGM",
    title: "VRLA 배터리용 AGM 분리막 제조업체 | Viking AGM",
    description:
      "Viking AGM은 VRLA, UPS, 오토바이 및 에너지 저장용 납축전지에 사용하는 유리섬유 AGM 분리막을 롤과 시트 형태로 생산합니다. 샘플과 사양 검토를 요청하세요.",
    keywords: [
      "AGM 분리막",
      "AGM 분리막 제조업체",
      "유리섬유 AGM 분리막",
      "VRLA 배터리 분리막",
      "납축전지 분리막"
    ],
    serviceName: "유리섬유 AGM 분리막 제조",
    serviceDescription:
      "납축전지 제조사를 위한 롤 및 시트형 AGM 분리막을 공급하며 사양 확인, 품질 검사와 포장 요구사항 검토를 지원합니다."
  },
  ja: {
    path: "/ja/",
    locale: "ja_JP",
    language: "ja-JP",
    siteName: "Viking AGM",
    alternateSiteName: "Hubei Viking AGM",
    title: "VRLAバッテリー用AGMセパレーターメーカー | Viking AGM",
    description:
      "Viking AGMは、VRLA、UPS、二輪車、蓄電用途の鉛蓄電池向けガラス繊維AGMセパレーターをロール・シートで製造しています。サンプルと仕様確認をご依頼ください。",
    keywords: [
      "AGMセパレーター",
      "AGMセパレーターメーカー",
      "ガラス繊維AGMセパレーター",
      "VRLAバッテリーセパレーター",
      "鉛蓄電池セパレーター"
    ],
    serviceName: "ガラス繊維AGMセパレーター製造",
    serviceDescription:
      "鉛蓄電池メーカー向けにロール・シート形状のAGMセパレーターを提供し、仕様確認、品質検査、梱包要件の検討を支援します。"
  },
  es: {
    path: "/es/",
    locale: "es_LA",
    language: "es",
    siteName: "Viking AGM",
    alternateSiteName: "Hubei Viking AGM",
    title: "Fabricante de separadores AGM para baterías VRLA | Viking AGM",
    description:
      "Viking AGM fabrica separadores de fibra de vidrio AGM en rollos y láminas para baterías VRLA, UPS, motocicletas y almacenamiento de energía.",
    keywords: [
      "separador AGM",
      "fabricante de separadores AGM",
      "separador de fibra de vidrio AGM",
      "separador para baterías VRLA",
      "separador para baterías de plomo ácido"
    ],
    serviceName: "Fabricación de separadores AGM de fibra de vidrio",
    serviceDescription:
      "Separadores AGM en rollos y láminas para fabricantes de baterías de plomo-ácido, con revisión de especificaciones, calidad y embalaje."
  },
  pt: {
    path: "/pt/",
    locale: "pt_BR",
    language: "pt-BR",
    siteName: "Viking AGM",
    alternateSiteName: "Hubei Viking AGM",
    title: "Fabricante de separadores AGM para baterias VRLA | Viking AGM",
    description:
      "A Viking AGM fabrica separadores de fibra de vidro AGM em rolos e folhas para baterias VRLA, UPS, motocicletas e armazenamento de energia.",
    keywords: [
      "separador AGM",
      "fabricante de separadores AGM",
      "separador de fibra de vidro AGM",
      "separador para baterias VRLA",
      "separador para baterias chumbo ácido"
    ],
    serviceName: "Fabricação de separadores AGM de fibra de vidro",
    serviceDescription:
      "Separadores AGM em rolos e folhas para fabricantes de baterias chumbo-ácido, com análise de especificações, qualidade e embalagem."
  },
  ru: {
    path: "/ru/",
    locale: "ru_RU",
    language: "ru-RU",
    siteName: "Viking AGM",
    alternateSiteName: "Hubei Viking AGM",
    title: "Производитель AGM-сепараторов для аккумуляторов VRLA | Viking AGM",
    description:
      "Viking AGM производит стекловолоконные AGM-сепараторы в рулонах и листах для аккумуляторов VRLA, ИБП, мототехники и систем накопления энергии.",
    keywords: [
      "AGM сепаратор",
      "производитель AGM сепараторов",
      "стекловолоконный AGM сепаратор",
      "сепаратор для аккумуляторов VRLA",
      "сепаратор для свинцово кислотных аккумуляторов"
    ],
    serviceName: "Производство стекловолоконных AGM-сепараторов",
    serviceDescription:
      "AGM-сепараторы в рулонах и листах для производителей свинцово-кислотных аккумуляторов с проверкой спецификаций, качества и упаковки."
  }
} as const;

const resourcesHubSeo = {
  en: {
    path: "/resources/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Buyer Guides & Technical Resources | Viking AGM",
    description:
      "Browse AGM separator buyer guides, technical parameters, manufacturing notes and VRLA battery application articles from Hubei Viking.",
    keywords: [
      "AGM separator resources",
      "AGM separator buyer guide",
      "AGM separator technical parameters",
      "VRLA battery separator guide",
      "AGM separator manufacturing"
    ],
    pageName: "AGM Separator Resource Center",
    breadcrumbs: ["Home", "Resources"]
  },
  zh: {
    path: "/zh/resources/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板采购指南与技术资料中心 | 湖北维京AGM",
    description:
      "集中查看 AGM 隔板采购指南、技术参数、生产质量说明和 VRLA 铅酸电池应用文章。",
    keywords: [
      "AGM 隔板资料",
      "AGM 隔板采购指南",
      "AGM 隔板技术参数",
      "VRLA 电池隔板",
      "AGM 隔板生产"
    ],
    pageName: "AGM 隔板资料中心",
    breadcrumbs: ["首页", "资料中心"]
  }
} as const;

const sampleRequestSeo = {
  en: {
    path: "/request-agm-separator-sample/",
    alternatePath: "/zh/request-agm-separator-sample/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "Request AGM Separator Samples and Specification Matching | Viking AGM",
    description:
      "Request AGM separator samples for VRLA, UPS, motorcycle, automotive and energy storage batteries. Share your application, thickness, width and roll or sheet requirements.",
    keywords: [
      "AGM separator sample",
      "AGM separator specification matching",
      "VRLA battery separator sample",
      "AGM separator rolls and sheets",
      "AGM separator manufacturer"
    ],
    pageName: "AGM Separator Sample and Specification Matching",
    serviceDescription:
      "Application-based review of AGM separator roll or sheet requirements before sample, technical review or quotation discussion.",
    breadcrumbs: ["Home", "Request AGM Separator Sample"]
  },
  zh: {
    path: "/zh/request-agm-separator-sample/",
    alternatePath: "/request-agm-separator-sample/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "申请 AGM 隔板样品与规格匹配 | 湖北维京AGM",
    description:
      "申请用于 VRLA、UPS、摩托车、汽车和储能电池的 AGM 隔板样品。可提供电池应用、厚度、宽度及卷材或片材需求。",
    keywords: [
      "AGM 隔板样品",
      "AGM 隔板规格匹配",
      "VRLA 电池隔板样品",
      "AGM 隔板卷材片材",
      "AGM 隔板制造商"
    ],
    pageName: "AGM 隔板样品与规格匹配",
    serviceDescription:
      "在样品、技术评审或报价沟通前，按电池应用评审 AGM 隔板卷材或片材需求。",
    breadcrumbs: ["首页", "申请 AGM 隔板样品"]
  },
  vi: {
    path: "/vi/request-agm-separator-sample/",
    alternatePath: "/request-agm-separator-sample/",
    locale: "vi_VN",
    language: "vi-VN",
    siteName: "Viking AGM",
    title: "Yêu cầu mẫu tấm ngăn AGM và đối chiếu thông số | Viking AGM",
    description:
      "Yêu cầu mẫu tấm ngăn AGM cho ắc quy VRLA, UPS và xe máy. Cung cấp ứng dụng, độ dày, chiều rộng và yêu cầu dạng cuộn hoặc dạng tấm.",
    keywords: [
      "mẫu tấm ngăn AGM",
      "đối chiếu thông số tấm ngăn AGM",
      "mẫu tấm ngăn ắc quy VRLA",
      "tấm ngăn AGM dạng cuộn",
      "tấm ngăn AGM dạng tấm"
    ],
    pageName: "Mẫu tấm ngăn AGM và đối chiếu thông số",
    serviceDescription:
      "Xem xét yêu cầu tấm ngăn AGM dạng cuộn hoặc dạng tấm theo ứng dụng trước khi gửi mẫu, trao đổi kỹ thuật hoặc báo giá.",
    breadcrumbs: ["Trang chủ", "Yêu cầu mẫu tấm ngăn AGM"]
  },
  ko: {
    path: "/ko/request-agm-separator-sample/",
    alternatePath: "/request-agm-separator-sample/",
    locale: "ko_KR",
    language: "ko-KR",
    siteName: "Viking AGM",
    title: "AGM 분리막 샘플 및 사양 검토 요청 | Viking AGM",
    description:
      "VRLA, UPS 및 오토바이 배터리용 AGM 분리막 샘플을 요청하세요. 적용 분야, 두께, 폭, 롤 또는 시트 요구사항을 보내 주시면 사양을 검토합니다.",
    keywords: [
      "AGM 분리막 샘플",
      "AGM 분리막 사양 검토",
      "VRLA 배터리 분리막 샘플",
      "AGM 분리막 롤",
      "AGM 분리막 시트"
    ],
    pageName: "AGM 분리막 샘플 및 사양 검토",
    serviceDescription:
      "샘플, 기술 검토 또는 견적 상담 전에 배터리 적용 분야에 맞춰 AGM 분리막 롤 또는 시트 요구사항을 검토합니다.",
    breadcrumbs: ["홈", "AGM 분리막 샘플 요청"]
  },
  ja: {
    path: "/ja/request-agm-separator-sample/",
    alternatePath: "/request-agm-separator-sample/",
    locale: "ja_JP",
    language: "ja-JP",
    siteName: "Viking AGM",
    title: "AGMセパレーターのサンプル・仕様確認依頼 | Viking AGM",
    description:
      "VRLA、UPS、二輪車用バッテリー向けAGMセパレーターのサンプルをご依頼いただけます。用途、厚さ、幅、ロールまたはシートの要件をご共有ください。",
    keywords: [
      "AGMセパレーターサンプル",
      "AGMセパレーター仕様確認",
      "VRLAバッテリーセパレーターサンプル",
      "AGMセパレーターロール",
      "AGMセパレーターシート"
    ],
    pageName: "AGMセパレーターのサンプル・仕様確認",
    serviceDescription:
      "サンプル、技術確認、見積相談の前に、バッテリー用途に基づいてAGMセパレーターのロールまたはシート要件を確認します。",
    breadcrumbs: ["ホーム", "AGMセパレーターのサンプル依頼"]
  },
  es: {
    path: "/es/request-agm-separator-sample/",
    alternatePath: "/request-agm-separator-sample/",
    locale: "es_LA",
    language: "es",
    siteName: "Viking AGM",
    title: "Solicite una muestra y revisión de especificaciones AGM | Viking AGM",
    description:
      "Solicite muestras de separador AGM para baterías VRLA. Comparta aplicación, espesor, ancho y requisitos de rollo o lámina.",
    keywords: [
      "muestra de separador AGM",
      "especificaciones de separador AGM",
      "muestra para batería VRLA",
      "separador AGM en rollo",
      "separador AGM en lámina"
    ],
    pageName: "Muestra de separador AGM y revisión de especificaciones",
    serviceDescription:
      "Revisión de requisitos de separadores AGM en rollo o lámina según la aplicación antes de muestras, evaluación técnica o cotización.",
    breadcrumbs: ["Inicio", "Solicitar muestra de separador AGM"]
  },
  pt: {
    path: "/pt/request-agm-separator-sample/",
    alternatePath: "/request-agm-separator-sample/",
    locale: "pt_BR",
    language: "pt-BR",
    siteName: "Viking AGM",
    title: "Solicite uma amostra e análise de especificações AGM | Viking AGM",
    description:
      "Solicite amostras de separador AGM para baterias VRLA. Informe aplicação, espessura, largura e requisitos de rolo ou folha.",
    keywords: [
      "amostra de separador AGM",
      "especificações de separador AGM",
      "amostra para bateria VRLA",
      "separador AGM em rolo",
      "separador AGM em folha"
    ],
    pageName: "Amostra de separador AGM e análise de especificações",
    serviceDescription:
      "Análise dos requisitos de separadores AGM em rolo ou folha conforme a aplicação antes de amostras, avaliação técnica ou cotação.",
    breadcrumbs: ["Início", "Solicitar amostra de separador AGM"]
  },
  ru: {
    path: "/ru/request-agm-separator-sample/",
    alternatePath: "/request-agm-separator-sample/",
    locale: "ru_RU",
    language: "ru-RU",
    siteName: "Viking AGM",
    title: "Запрос образца и проверка характеристик AGM-сепаратора | Viking AGM",
    description:
      "Запросите образцы AGM-сепаратора для аккумуляторов VRLA. Укажите применение, толщину, ширину и требования к рулонам или листам.",
    keywords: [
      "образец AGM сепаратора",
      "характеристики AGM сепаратора",
      "образец сепаратора VRLA",
      "AGM сепаратор в рулонах",
      "AGM сепаратор в листах"
    ],
    pageName: "Образец AGM-сепаратора и проверка характеристик",
    serviceDescription:
      "Проверка требований к AGM-сепараторам в рулонах или листах по области применения до предоставления образцов, технической оценки или расчета цены.",
    breadcrumbs: ["Главная", "Запрос образца AGM-сепаратора"]
  }
} as const;

const agmSeparatorSeo = {
  en: {
    path: "/products/agm-separator/",
    alternatePath: "/zh/products/agm-separator/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Battery Separator for VRLA Lead-Acid Batteries | Viking AGM",
    description:
      "AGM glass fiber separators for VRLA lead-acid batteries, available in roll or sheet type. Send your thickness, width and battery application for quotation.",
    keywords: [
      "AGM separator",
      "AGM battery separator",
      "AGM glass fiber separator",
      "VRLA battery separator",
      "AGM separator manufacturer"
    ],
    productName: "AGM Separator for VRLA Lead-Acid Batteries",
    serviceDescription:
      "AGM glass fiber separators for VRLA lead-acid batteries, available in roll and sheet formats for customer specification discussion.",
    breadcrumbs: ["Home", "Products", "AGM Separator"]
  },
  zh: {
    path: "/zh/products/agm-separator/",
    alternatePath: "/products/agm-separator/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板制造商 | 湖北维京AGM",
    description:
      "湖北维京AGM提供用于VRLA铅酸电池的AGM玻璃纤维隔板，可按卷材或片材形式沟通。请提供厚度、宽度及电池应用以便报价。",
    keywords: [
      "AGM 隔板",
      "AGM 电池隔板",
      "AGM 玻璃纤维隔板",
      "VRLA 电池隔板",
      "AGM 隔板制造商"
    ],
    productName: "用于 VRLA 铅酸电池的 AGM 隔板",
    serviceDescription:
      "用于 VRLA 铅酸电池的 AGM 玻璃纤维隔板，可按卷材和片材形式与客户沟通规格。",
    breadcrumbs: ["首页", "产品", "AGM 隔板"]
  },
  vi: {
    path: "/vi/products/agm-separator/",
    alternatePath: "/products/agm-separator/",
    locale: "vi_VN",
    language: "vi-VN",
    siteName: "Viking AGM",
    title: "Tấm ngăn sợi thủy tinh AGM cho ắc quy VRLA | Viking AGM",
    description:
      "Tấm ngăn sợi thủy tinh AGM cho ắc quy chì axit VRLA, có dạng cuộn và dạng tấm. Gửi độ dày, chiều rộng và ứng dụng để đối chiếu thông số.",
    keywords: [
      "tấm ngăn AGM",
      "tấm ngăn ắc quy AGM",
      "tấm ngăn sợi thủy tinh AGM",
      "tấm ngăn ắc quy VRLA",
      "nhà sản xuất tấm ngăn AGM"
    ],
    productName: "Tấm ngăn AGM cho ắc quy chì axit VRLA",
    serviceDescription:
      "Tấm ngăn sợi thủy tinh AGM dạng cuộn và dạng tấm cho ắc quy chì axit VRLA, hỗ trợ đối chiếu thông số theo yêu cầu của khách hàng.",
    breadcrumbs: ["Trang chủ", "Sản phẩm", "Tấm ngăn AGM"]
  },
  ko: {
    path: "/ko/products/agm-separator/",
    alternatePath: "/products/agm-separator/",
    locale: "ko_KR",
    language: "ko-KR",
    siteName: "Viking AGM",
    title: "VRLA 납축전지용 유리섬유 AGM 분리막 | Viking AGM",
    description:
      "VRLA 납축전지용 유리섬유 AGM 분리막을 롤과 시트 형태로 제공합니다. 두께, 폭, 배터리 적용 분야를 보내 주시면 사양을 검토합니다.",
    keywords: [
      "AGM 분리막",
      "AGM 배터리 분리막",
      "유리섬유 AGM 분리막",
      "VRLA 배터리 분리막",
      "AGM 분리막 제조업체"
    ],
    productName: "VRLA 납축전지용 AGM 분리막",
    serviceDescription:
      "고객 요구사항 검토를 위한 롤 및 시트 형태의 VRLA 납축전지용 유리섬유 AGM 분리막입니다.",
    breadcrumbs: ["홈", "제품", "AGM 분리막"]
  },
  ja: {
    path: "/ja/products/agm-separator/",
    alternatePath: "/products/agm-separator/",
    locale: "ja_JP",
    language: "ja-JP",
    siteName: "Viking AGM",
    title: "VRLA鉛蓄電池用ガラス繊維AGMセパレーター | Viking AGM",
    description:
      "VRLA鉛蓄電池用のガラス繊維AGMセパレーターをロール・シート形状で提供します。厚さ、幅、バッテリー用途をご共有ください。",
    keywords: [
      "AGMセパレーター",
      "AGMバッテリーセパレーター",
      "ガラス繊維AGMセパレーター",
      "VRLAバッテリーセパレーター",
      "AGMセパレーターメーカー"
    ],
    productName: "VRLA鉛蓄電池用AGMセパレーター",
    serviceDescription:
      "顧客仕様の確認に対応する、ロール・シート形状のVRLA鉛蓄電池用ガラス繊維AGMセパレーターです。",
    breadcrumbs: ["ホーム", "製品", "AGMセパレーター"]
  },
  es: {
    path: "/es/products/agm-separator/",
    alternatePath: "/products/agm-separator/",
    locale: "es_LA",
    language: "es",
    siteName: "Viking AGM",
    title: "Separador AGM de fibra de vidrio para baterías VRLA | Viking AGM",
    description:
      "Separadores AGM de fibra de vidrio en rollos y láminas para baterías VRLA. Envíe el espesor, ancho y aplicación para revisar especificaciones.",
    keywords: [
      "separador AGM",
      "separador para batería AGM",
      "separador AGM de fibra de vidrio",
      "separador para batería VRLA",
      "fabricante de separadores AGM"
    ],
    productName: "Separador AGM para baterías VRLA de plomo-ácido",
    serviceDescription:
      "Separadores AGM de fibra de vidrio en rollos y láminas para baterías VRLA, con revisión de especificaciones del cliente.",
    breadcrumbs: ["Inicio", "Productos", "Separador AGM"]
  },
  pt: {
    path: "/pt/products/agm-separator/",
    alternatePath: "/products/agm-separator/",
    locale: "pt_BR",
    language: "pt-BR",
    siteName: "Viking AGM",
    title: "Separador AGM de fibra de vidro para baterias VRLA | Viking AGM",
    description:
      "Separadores AGM de fibra de vidro em rolos e folhas para baterias VRLA. Envie espessura, largura e aplicação para análise das especificações.",
    keywords: [
      "separador AGM",
      "separador para bateria AGM",
      "separador AGM de fibra de vidro",
      "separador para bateria VRLA",
      "fabricante de separadores AGM"
    ],
    productName: "Separador AGM para baterias VRLA chumbo-ácido",
    serviceDescription:
      "Separadores AGM de fibra de vidro em rolos e folhas para baterias VRLA, com análise das especificações do cliente.",
    breadcrumbs: ["Início", "Produtos", "Separador AGM"]
  },
  ru: {
    path: "/ru/products/agm-separator/",
    alternatePath: "/products/agm-separator/",
    locale: "ru_RU",
    language: "ru-RU",
    siteName: "Viking AGM",
    title: "Стекловолоконный AGM-сепаратор для аккумуляторов VRLA | Viking AGM",
    description:
      "Стекловолоконные AGM-сепараторы в рулонах и листах для аккумуляторов VRLA. Укажите толщину, ширину и применение для проверки спецификации.",
    keywords: [
      "AGM сепаратор",
      "сепаратор для AGM аккумулятора",
      "стекловолоконный AGM сепаратор",
      "сепаратор для аккумулятора VRLA",
      "производитель AGM сепараторов"
    ],
    productName: "AGM-сепаратор для свинцово-кислотных аккумуляторов VRLA",
    serviceDescription:
      "Стекловолоконные AGM-сепараторы в рулонах и листах для аккумуляторов VRLA с проверкой требований заказчика.",
    breadcrumbs: ["Главная", "Продукция", "AGM-сепаратор"]
  }
} as const;

const secondaryProductDetailSeo = {
  rolls: {
    vi: {
      path: "/vi/products/agm-separator-rolls/", alternatePath: "/products/agm-separator-rolls/", locale: "vi_VN", language: "vi-VN", siteName: "Viking AGM",
      title: "Cuộn tấm ngăn AGM cho sản xuất ắc quy VRLA | Viking AGM",
      description: "Cuộn tấm ngăn AGM cho dây chuyền ắc quy VRLA. Có thể trao đổi chiều rộng, độ dày, lõi, đường kính cuộn và đóng gói.",
      keywords: ["cuộn tấm ngăn AGM", "nhà cung cấp tấm ngăn AGM", "tấm ngăn ắc quy VRLA dạng cuộn", "tấm ngăn sợi thủy tinh AGM"],
      productName: "Cuộn tấm ngăn AGM", serviceDescription: "Tấm ngăn sợi thủy tinh AGM dạng cuộn cho sản xuất ắc quy VRLA, với quy cách và đóng gói được xác nhận theo nhu cầu khách hàng.", breadcrumbs: ["Trang chủ", "Sản phẩm", "Tấm ngăn AGM dạng cuộn"]
    },
    ko: {
      path: "/ko/products/agm-separator-rolls/", alternatePath: "/products/agm-separator-rolls/", locale: "ko_KR", language: "ko-KR", siteName: "Viking AGM",
      title: "VRLA 배터리 생산용 AGM 분리막 롤 | Viking AGM",
      description: "VRLA 배터리 생산용 AGM 분리막 롤. 폭, 두께, 코어, 롤 직경과 포장 요구사항을 협의할 수 있습니다.",
      keywords: ["AGM 분리막 롤", "AGM 롤 공급업체", "VRLA 배터리 분리막", "유리섬유 AGM 분리막"],
      productName: "AGM 분리막 롤", serviceDescription: "VRLA 납축전지 생산용 유리섬유 AGM 롤 소재로 폭, 두께, 코어, 롤 규격과 포장을 고객 요구에 맞춰 확인합니다.", breadcrumbs: ["홈", "제품", "AGM 분리막 롤"]
    },
    ja: {
      path: "/ja/products/agm-separator-rolls/", alternatePath: "/products/agm-separator-rolls/", locale: "ja_JP", language: "ja-JP", siteName: "Viking AGM",
      title: "VRLA電池生産用AGMセパレーターロール | Viking AGM",
      description: "VRLA電池生産向けAGMセパレーターロール。幅、厚さ、紙管、ロール径、梱包要件を確認できます。",
      keywords: ["AGMセパレーターロール", "AGMロール供給", "VRLA電池セパレーター", "ガラス繊維AGMセパレーター"],
      productName: "AGMセパレーターロール", serviceDescription: "VRLA鉛蓄電池生産用のガラス繊維AGMロール材。幅、厚さ、紙管、ロール仕様、梱包を要件に合わせて確認します。", breadcrumbs: ["ホーム", "製品", "AGMセパレーターロール"]
    },
    es: {
      path: "/es/products/agm-separator-rolls/", alternatePath: "/products/agm-separator-rolls/", locale: "es_LA", language: "es", siteName: "Viking AGM",
      title: "Rollos de separador AGM para baterías VRLA | Viking AGM",
      description: "Rollos de separador AGM para producción de baterías VRLA. Se revisan ancho, espesor, núcleo, diámetro y embalaje.",
      keywords: ["rollos de separador AGM", "proveedor de separador AGM", "separador para baterías VRLA", "separador AGM de fibra de vidrio"],
      productName: "Rollos de separador AGM", serviceDescription: "Separadores AGM de fibra de vidrio en rollo para baterías VRLA, con especificaciones y embalaje revisados según el comprador.", breadcrumbs: ["Inicio", "Productos", "Rollos AGM"]
    },
    pt: {
      path: "/pt/products/agm-separator-rolls/", alternatePath: "/products/agm-separator-rolls/", locale: "pt_BR", language: "pt-BR", siteName: "Viking AGM",
      title: "Rolos de separador AGM para baterias VRLA | Viking AGM",
      description: "Rolos de separador AGM para produção de baterias VRLA. Largura, espessura, núcleo, diâmetro e embalagem podem ser analisados.",
      keywords: ["rolos de separador AGM", "fornecedor de separador AGM", "separador para baterias VRLA", "separador AGM de fibra de vidro"],
      productName: "Rolos de separador AGM", serviceDescription: "Separadores AGM de fibra de vidro em rolo para baterias VRLA, com especificações e embalagem analisadas conforme o comprador.", breadcrumbs: ["Início", "Produtos", "Rolos AGM"]
    },
    ru: {
      path: "/ru/products/agm-separator-rolls/", alternatePath: "/products/agm-separator-rolls/", locale: "ru_RU", language: "ru-RU", siteName: "Viking AGM",
      title: "Рулоны AGM-сепаратора для аккумуляторов VRLA | Viking AGM",
      description: "Рулоны AGM-сепаратора для производства аккумуляторов VRLA. Согласование ширины, толщины, втулки, диаметра и упаковки.",
      keywords: ["рулоны AGM сепаратора", "поставщик AGM сепаратора", "сепаратор для VRLA", "стекловолоконный AGM сепаратор"],
      productName: "Рулоны AGM-сепаратора", serviceDescription: "Стекловолоконный AGM-сепаратор в рулонах для производства VRLA с согласованием спецификации и упаковки.", breadcrumbs: ["Главная", "Продукция", "Рулоны AGM"]
    }
  },
  sheets: {
    vi: {
      path: "/vi/products/agm-separator-sheets/", alternatePath: "/products/agm-separator-sheets/", locale: "vi_VN", language: "vi-VN", siteName: "Viking AGM",
      title: "Tấm ngăn AGM cắt sẵn cho lắp ráp ắc quy VRLA | Viking AGM",
      description: "Tấm ngăn AGM cắt sẵn cho lắp ráp ắc quy VRLA. Kích thước, độ dày, dung sai và đóng gói được xác nhận theo thiết kế ắc quy.",
      keywords: ["tấm ngăn AGM dạng tấm", "tấm ngăn AGM cắt sẵn", "tấm ngăn ắc quy VRLA", "tấm ngăn sợi thủy tinh AGM"],
      productName: "Tấm ngăn AGM cắt sẵn", serviceDescription: "Tấm ngăn AGM cắt theo kích thước cho lắp ráp ắc quy VRLA, với quy cách và đóng gói được xác nhận theo thiết kế khách hàng.", breadcrumbs: ["Trang chủ", "Sản phẩm", "Tấm ngăn AGM dạng tấm"]
    },
    ko: {
      path: "/ko/products/agm-separator-sheets/", alternatePath: "/products/agm-separator-sheets/", locale: "ko_KR", language: "ko-KR", siteName: "Viking AGM",
      title: "VRLA 배터리 조립용 AGM 분리막 시트 | Viking AGM",
      description: "VRLA 배터리 조립용 사전 절단 AGM 시트. 치수, 두께, 공차와 포장 요구사항을 배터리 설계에 맞춰 확인합니다.",
      keywords: ["AGM 분리막 시트", "사전 절단 AGM 분리막", "VRLA 배터리 분리막", "유리섬유 AGM 시트"],
      productName: "AGM 분리막 시트", serviceDescription: "VRLA 배터리 조립용 사전 절단 유리섬유 AGM 시트로 치수와 포장을 고객 설계에 맞춰 확인합니다.", breadcrumbs: ["홈", "제품", "AGM 분리막 시트"]
    },
    ja: {
      path: "/ja/products/agm-separator-sheets/", alternatePath: "/products/agm-separator-sheets/", locale: "ja_JP", language: "ja-JP", siteName: "Viking AGM",
      title: "VRLA電池組立用AGMセパレーターシート | Viking AGM",
      description: "VRLA電池組立向けカット済みAGMシート。寸法、厚さ、公差、梱包要件を電池設計に合わせて確認します。",
      keywords: ["AGMセパレーターシート", "カット済みAGMセパレーター", "VRLA電池セパレーター", "ガラス繊維AGMシート"],
      productName: "AGMセパレーターシート", serviceDescription: "VRLA電池組立用のカット済みガラス繊維AGMシート。寸法と梱包をお客様設計に合わせて確認します。", breadcrumbs: ["ホーム", "製品", "AGMセパレーターシート"]
    },
    es: {
      path: "/es/products/agm-separator-sheets/", alternatePath: "/products/agm-separator-sheets/", locale: "es_LA", language: "es", siteName: "Viking AGM",
      title: "Láminas de separador AGM para montaje VRLA | Viking AGM",
      description: "Láminas AGM precortadas para montaje de baterías VRLA. Dimensiones, espesor, tolerancia y embalaje se revisan según el diseño.",
      keywords: ["láminas de separador AGM", "separador AGM precortado", "separador para baterías VRLA", "láminas AGM de fibra de vidrio"],
      productName: "Láminas de separador AGM", serviceDescription: "Láminas AGM precortadas para montaje de baterías VRLA, con dimensiones y embalaje revisados según el diseño del cliente.", breadcrumbs: ["Inicio", "Productos", "Láminas AGM"]
    },
    pt: {
      path: "/pt/products/agm-separator-sheets/", alternatePath: "/products/agm-separator-sheets/", locale: "pt_BR", language: "pt-BR", siteName: "Viking AGM",
      title: "Folhas de separador AGM para montagem VRLA | Viking AGM",
      description: "Folhas AGM pré-cortadas para montagem de baterias VRLA. Dimensões, espessura, tolerância e embalagem são analisadas conforme o projeto.",
      keywords: ["folhas de separador AGM", "separador AGM pré-cortado", "separador para baterias VRLA", "folhas AGM de fibra de vidro"],
      productName: "Folhas de separador AGM", serviceDescription: "Folhas AGM pré-cortadas para montagem de baterias VRLA, com dimensões e embalagem analisadas conforme o projeto do cliente.", breadcrumbs: ["Início", "Produtos", "Folhas AGM"]
    },
    ru: {
      path: "/ru/products/agm-separator-sheets/", alternatePath: "/products/agm-separator-sheets/", locale: "ru_RU", language: "ru-RU", siteName: "Viking AGM",
      title: "Листы AGM-сепаратора для сборки аккумуляторов VRLA | Viking AGM",
      description: "Нарезанные листы AGM для сборки VRLA. Размеры, толщина, допуск и упаковка согласуются по конструкции аккумулятора.",
      keywords: ["листы AGM сепаратора", "нарезанный AGM сепаратор", "сепаратор для VRLA", "стекловолоконные листы AGM"],
      productName: "Листы AGM-сепаратора", serviceDescription: "Нарезанные листы AGM для сборки аккумуляторов VRLA с согласованием размеров и упаковки по конструкции заказчика.", breadcrumbs: ["Главная", "Продукция", "Листы AGM"]
    }
  },
  testing: {
    vi: {
      path: "/vi/quality-control/agm-separator-testing/", alternatePath: "/quality-control/agm-separator-testing/", locale: "vi_VN", language: "vi-VN", siteName: "Viking AGM",
      title: "Kiểm tra và kiểm soát chất lượng tấm ngăn AGM | Viking AGM",
      description: "Các hạng mục kiểm tra tấm ngăn AGM gồm độ dày, định lượng, hút axit, điện trở, độ rỗng và ngoại quan theo yêu cầu khách hàng.",
      keywords: ["kiểm tra tấm ngăn AGM", "kiểm soát chất lượng AGM", "kiểm tra tấm ngăn ắc quy", "chất lượng tấm ngăn VRLA"],
      pageName: "Kiểm tra và kiểm soát chất lượng tấm ngăn AGM", serviceDescription: "Trao đổi kiểm tra độ dày, định lượng, hút axit, điện trở và ngoại quan tấm ngăn AGM theo yêu cầu khách hàng.", breadcrumbs: ["Trang chủ", "Chất lượng", "Kiểm tra tấm ngăn AGM"]
    },
    ko: {
      path: "/ko/quality-control/agm-separator-testing/", alternatePath: "/quality-control/agm-separator-testing/", locale: "ko_KR", language: "ko-KR", siteName: "Viking AGM",
      title: "AGM 분리막 시험 및 품질 관리 | Viking AGM",
      description: "고객 요구사항에 따라 AGM 분리막 두께, 평량, 산 흡수, 전기 저항, 기공률과 외관 품질을 확인합니다.",
      keywords: ["AGM 분리막 시험", "AGM 품질 관리", "배터리 분리막 검사", "VRLA 분리막 품질"],
      pageName: "AGM 분리막 시험 및 품질 관리", serviceDescription: "고객 요구사항에 따른 AGM 분리막 두께, 평량, 산 흡수, 전기 저항 및 외관 검사 협의.", breadcrumbs: ["홈", "품질", "AGM 분리막 시험"]
    },
    ja: {
      path: "/ja/quality-control/agm-separator-testing/", alternatePath: "/quality-control/agm-separator-testing/", locale: "ja_JP", language: "ja-JP", siteName: "Viking AGM",
      title: "AGMセパレーター試験・品質管理 | Viking AGM",
      description: "お客様の要件に基づき、AGMセパレーターの厚さ、坪量、吸液、電気抵抗、気孔率、外観を確認します。",
      keywords: ["AGMセパレーター試験", "AGM品質管理", "電池セパレーター検査", "VRLAセパレーター品質"],
      pageName: "AGMセパレーター試験・品質管理", serviceDescription: "お客様要件に基づくAGMセパレーターの厚さ、坪量、吸液、電気抵抗、外観検査の確認。", breadcrumbs: ["ホーム", "品質", "AGMセパレーター試験"]
    },
    es: {
      path: "/es/quality-control/agm-separator-testing/", alternatePath: "/quality-control/agm-separator-testing/", locale: "es_LA", language: "es", siteName: "Viking AGM",
      title: "Ensayos y control de calidad de separadores AGM | Viking AGM",
      description: "Ensayos de espesor, gramaje, absorción de ácido, resistencia eléctrica, porosidad y apariencia según requisitos del cliente.",
      keywords: ["ensayos de separadores AGM", "control de calidad AGM", "inspección de separador de batería", "calidad de separador VRLA"],
      pageName: "Ensayos y control de calidad de separadores AGM", serviceDescription: "Revisión de espesor, gramaje, absorción, resistencia y apariencia de separadores AGM según requisitos del cliente.", breadcrumbs: ["Inicio", "Calidad", "Ensayos AGM"]
    },
    pt: {
      path: "/pt/quality-control/agm-separator-testing/", alternatePath: "/quality-control/agm-separator-testing/", locale: "pt_BR", language: "pt-BR", siteName: "Viking AGM",
      title: "Ensaios e controle de qualidade de separadores AGM | Viking AGM",
      description: "Ensaios de espessura, gramatura, absorção de ácido, resistência elétrica, porosidade e aparência conforme os requisitos do cliente.",
      keywords: ["ensaios de separadores AGM", "controle de qualidade AGM", "inspeção de separador de bateria", "qualidade de separador VRLA"],
      pageName: "Ensaios e controle de qualidade de separadores AGM", serviceDescription: "Análise de espessura, gramatura, absorção, resistência e aparência de separadores AGM conforme requisitos do cliente.", breadcrumbs: ["Início", "Qualidade", "Ensaios AGM"]
    },
    ru: {
      path: "/ru/quality-control/agm-separator-testing/", alternatePath: "/quality-control/agm-separator-testing/", locale: "ru_RU", language: "ru-RU", siteName: "Viking AGM",
      title: "Испытания и контроль качества AGM-сепараторов | Viking AGM",
      description: "Испытания толщины, плотности, впитывания кислоты, электрического сопротивления, пористости и внешнего вида по требованиям заказчика.",
      keywords: ["испытания AGM сепаратора", "контроль качества AGM", "проверка сепаратора аккумулятора", "качество сепаратора VRLA"],
      pageName: "Испытания и контроль качества AGM-сепараторов", serviceDescription: "Проверка толщины, плотности, впитывания, сопротивления и внешнего вида AGM-сепараторов по требованиям заказчика.", breadcrumbs: ["Главная", "Качество", "Испытания AGM"]
    }
  }
} as const;

const agmSeparatorRollsSeo = {
  en: {
    path: "/products/agm-separator-rolls/",
    alternatePath: "/zh/products/agm-separator-rolls/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Rolls for Battery Production Lines",
    description:
      "AGM separator rolls for VRLA battery production. Custom width, thickness and roll packing can be discussed based on customer requirements.",
    keywords: [
      "AGM separator rolls",
      "AGM separator roll supplier",
      "AGM battery separator rolls",
      "VRLA battery separator rolls",
      "custom AGM separator"
    ],
    productName: "AGM Separator Rolls",
    serviceDescription:
      "Roll-format AGM glass fiber separators for VRLA lead-acid battery production, with width, thickness, roll length, core and packing requirements confirmed according to buyer needs.",
    breadcrumbs: ["Home", "Products", "AGM Separator Rolls"]
  },
  zh: {
    path: "/zh/products/agm-separator-rolls/",
    alternatePath: "/products/agm-separator-rolls/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板卷材 | 湖北维京AGM",
    description:
      "湖北维京AGM提供用于VRLA电池生产的AGM隔板卷材，宽度、厚度和卷材包装方式可根据客户要求沟通确认。",
    keywords: [
      "AGM 隔板卷材",
      "AGM 电池隔板卷材",
      "AGM 玻璃纤维隔板卷材",
      "VRLA 电池隔板卷材",
      "AGM 隔板供应商"
    ],
    productName: "AGM 隔板卷材",
    serviceDescription:
      "用于 VRLA 铅酸电池生产的 AGM 玻璃纤维隔板卷材，宽度、厚度、卷长、芯管和包装要求可按客户需求沟通确认。",
    breadcrumbs: ["首页", "产品", "AGM 隔板卷材"]
  },
  ...secondaryProductDetailSeo.rolls
} as const;

const agmSeparatorSheetsSeo = {
  en: {
    path: "/products/agm-separator-sheets/",
    alternatePath: "/zh/products/agm-separator-sheets/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Sheets for VRLA Battery Assembly",
    description:
      "Pre-cut AGM separator sheets for VRLA lead-acid battery assembly. Sheet dimensions and thickness should be confirmed by battery design.",
    keywords: [
      "AGM separator sheets",
      "AGM battery separator sheets",
      "VRLA battery separator",
      "pre-cut AGM separator",
      "AGM glass fiber separator sheets"
    ],
    productName: "AGM Separator Sheets",
    serviceDescription:
      "Pre-cut AGM glass fiber separator sheets for VRLA lead-acid battery assembly, with sheet height, width, thickness and packing requirements confirmed according to customer battery design.",
    breadcrumbs: ["Home", "Products", "AGM Separator Sheets"]
  },
  zh: {
    path: "/zh/products/agm-separator-sheets/",
    alternatePath: "/products/agm-separator-sheets/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板片材 | 湖北维京AGM",
    description:
      "湖北维京AGM提供用于VRLA铅酸电池装配的预裁切AGM隔板片材，片材尺寸和厚度可根据电池设计沟通确认。",
    keywords: [
      "AGM 隔板片材",
      "AGM 电池隔板片材",
      "VRLA 电池隔板",
      "预裁切 AGM 隔板",
      "AGM 玻璃纤维隔板片材"
    ],
    productName: "AGM 隔板片材",
    serviceDescription:
      "用于 VRLA 铅酸电池装配的预裁切 AGM 玻璃纤维隔板片材，片材高度、宽度、厚度和包装要求可按客户电池设计沟通确认。",
    breadcrumbs: ["首页", "产品", "AGM 隔板片材"]
  },
  ...secondaryProductDetailSeo.sheets
} as const;

const agmSeparatorTestingSeo = {
  en: {
    path: "/quality-control/agm-separator-testing/",
    alternatePath: "/zh/quality-control/agm-separator-testing/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Testing and Quality Control",
    description:
      "Understand key AGM separator quality checks, including thickness, basis weight, acid absorption, electrical resistance, porosity and appearance.",
    keywords: [
      "AGM separator testing",
      "AGM separator quality control",
      "battery separator testing",
      "AGM separator inspection",
      "VRLA battery separator quality"
    ],
    pageName: "AGM Separator Testing and Quality Control",
    serviceDescription:
      "AGM separator quality-control discussion covering thickness, basis weight, acid absorption, electrical resistance, porosity, appearance and customer-specific test requirements.",
    breadcrumbs: ["Home", "Quality Control", "AGM Separator Testing"]
  },
  zh: {
    path: "/zh/quality-control/agm-separator-testing/",
    alternatePath: "/quality-control/agm-separator-testing/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板检测与质量控制 | 湖北维京AGM",
    description:
      "了解AGM隔板常见质量检查项目，包括厚度、克重、吸酸性能、电阻、孔隙率和外观等，具体要求可按客户电池设计确认。",
    keywords: [
      "AGM 隔板检测",
      "AGM 隔板质量控制",
      "电池隔板检测",
      "AGM 隔板检验",
      "VRLA 电池隔板质量"
    ],
    pageName: "AGM 隔板检测与质量控制",
    serviceDescription:
      "围绕 AGM 隔板厚度、克重、吸酸性能、电阻、孔隙率、外观和客户特定检测要求开展质量控制沟通。",
    breadcrumbs: ["首页", "质量控制", "AGM 隔板检测"]
  },
  ...secondaryProductDetailSeo.testing
} as const;

const secondaryApplicationSeo = {
  vrla: {
    vi: {
      path: "/vi/applications/agm-separator-for-vrla-battery/",
      alternatePath: "/applications/agm-separator-for-vrla-battery/",
      locale: "vi_VN",
      language: "vi-VN",
      siteName: "Viking AGM",
      title: "Tấm ngăn AGM cho ắc quy VRLA | Viking AGM",
      description: "Tấm ngăn sợi thủy tinh AGM cho ắc quy chì axit VRLA kín khí. Trao đổi dạng cuộn, dạng tấm, độ dày, chiều rộng và yêu cầu mẫu.",
      keywords: ["tấm ngăn AGM cho ắc quy VRLA","tấm ngăn ắc quy chì axit","tấm ngăn sợi thủy tinh AGM"],
      pageName: "Tấm ngăn AGM cho ứng dụng ắc quy VRLA",
      serviceDescription: "Đối chiếu tấm ngăn sợi thủy tinh AGM cho sản xuất ắc quy chì axit VRLA kín khí.",
      serviceType: "Tấm ngăn AGM cho ắc quy VRLA",
      image: PREVIEW_IMAGE,
      breadcrumbs: ["Trang chủ","Ứng dụng","Tấm ngăn AGM cho ắc quy VRLA"]
    },
    ko: {
      path: "/ko/applications/agm-separator-for-vrla-battery/",
      alternatePath: "/applications/agm-separator-for-vrla-battery/",
      locale: "ko_KR",
      language: "ko-KR",
      siteName: "Viking AGM",
      title: "VRLA 배터리용 AGM 분리막 | Viking AGM",
      description: "밀폐형 VRLA 납축전지용 유리섬유 AGM 분리막입니다. 롤, 시트, 두께, 폭과 샘플 요구사항을 검토합니다.",
      keywords: ["VRLA 배터리 AGM 분리막","납축전지 분리막","유리섬유 AGM 분리막"],
      pageName: "VRLA 배터리용 AGM 분리막",
      serviceDescription: "밀폐형 VRLA 납축전지 생산을 위한 유리섬유 AGM 분리막 사양 및 샘플 검토.",
      serviceType: "VRLA 배터리용 AGM 분리막",
      image: PREVIEW_IMAGE,
      breadcrumbs: ["홈","적용 분야","VRLA 배터리용 AGM 분리막"]
    },
    ja: {
      path: "/ja/applications/agm-separator-for-vrla-battery/",
      alternatePath: "/applications/agm-separator-for-vrla-battery/",
      locale: "ja_JP",
      language: "ja-JP",
      siteName: "Viking AGM",
      title: "VRLAバッテリー用AGMセパレーター | Viking AGM",
      description: "密閉形VRLA鉛蓄電池向けガラス繊維AGMセパレーター。ロール、シート、厚さ、幅、サンプル要件を確認します。",
      keywords: ["VRLAバッテリー AGMセパレーター","鉛蓄電池 セパレーター","ガラス繊維 AGMセパレーター"],
      pageName: "VRLAバッテリー用AGMセパレーター",
      serviceDescription: "密閉形VRLA鉛蓄電池生産向けガラス繊維AGMセパレーターの仕様・サンプル確認。",
      serviceType: "VRLAバッテリー用AGMセパレーター",
      image: PREVIEW_IMAGE,
      breadcrumbs: ["ホーム","用途","VRLAバッテリー用AGMセパレーター"]
    },
    es: {
      path: "/es/applications/agm-separator-for-vrla-battery/",
      alternatePath: "/applications/agm-separator-for-vrla-battery/",
      locale: "es_LA",
      language: "es",
      siteName: "Viking AGM",
      title: "Separador AGM para baterías VRLA | Viking AGM",
      description: "Separador AGM de fibra de vidrio para baterías VRLA selladas de plomo-ácido. Revise rollos, láminas, espesor, ancho y muestras.",
      keywords: ["separador AGM para baterías VRLA","separador de batería de plomo-ácido","separador AGM de fibra de vidrio"],
      pageName: "Separador AGM para aplicaciones VRLA",
      serviceDescription: "Revisión de separadores AGM de fibra de vidrio para producir baterías VRLA selladas de plomo-ácido.",
      serviceType: "Separador AGM para baterías VRLA",
      image: PREVIEW_IMAGE,
      breadcrumbs: ["Inicio","Aplicaciones","Separador AGM para baterías VRLA"]
    },
    pt: {
      path: "/pt/applications/agm-separator-for-vrla-battery/",
      alternatePath: "/applications/agm-separator-for-vrla-battery/",
      locale: "pt_BR",
      language: "pt-BR",
      siteName: "Viking AGM",
      title: "Separador AGM para baterias VRLA | Viking AGM",
      description: "Separador AGM de fibra de vidro para baterias VRLA seladas chumbo-ácido. Analise rolos, folhas, espessura, largura e amostras.",
      keywords: ["separador AGM para baterias VRLA","separador de bateria chumbo-ácido","separador AGM de fibra de vidro"],
      pageName: "Separador AGM para aplicações VRLA",
      serviceDescription: "Análise de separadores AGM de fibra de vidro para produção de baterias VRLA seladas chumbo-ácido.",
      serviceType: "Separador AGM para baterias VRLA",
      image: PREVIEW_IMAGE,
      breadcrumbs: ["Início","Aplicações","Separador AGM para baterias VRLA"]
    },
    ru: {
      path: "/ru/applications/agm-separator-for-vrla-battery/",
      alternatePath: "/applications/agm-separator-for-vrla-battery/",
      locale: "ru_RU",
      language: "ru-RU",
      siteName: "Viking AGM",
      title: "AGM-сепаратор для аккумуляторов VRLA | Viking AGM",
      description: "Стекловолоконный AGM-сепаратор для герметичных свинцово-кислотных аккумуляторов VRLA. Согласование рулонов, листов и образцов.",
      keywords: ["AGM сепаратор для VRLA","сепаратор свинцово-кислотного аккумулятора","стекловолоконный AGM сепаратор"],
      pageName: "AGM-сепаратор для применения в VRLA",
      serviceDescription: "Согласование стекловолоконного AGM-сепаратора для производства герметичных аккумуляторов VRLA.",
      serviceType: "AGM-сепаратор для VRLA",
      image: PREVIEW_IMAGE,
      breadcrumbs: ["Главная","Применение","AGM-сепаратор для VRLA"]
    },
  },
  ups: {
    vi: {
      path: "/vi/applications/agm-separator-for-ups-battery/",
      alternatePath: "/applications/agm-separator-for-ups-battery/",
      locale: "vi_VN",
      language: "vi-VN",
      siteName: "Viking AGM",
      title: "Tấm ngăn AGM cho ắc quy UPS và nguồn dự phòng | Viking AGM",
      description: "Tấm ngăn AGM cho ắc quy VRLA dùng trong UPS, nguồn chờ và nguồn dự phòng. Trao đổi dạng cuộn, tấm và thông số mẫu.",
      keywords: ["tấm ngăn AGM cho ắc quy UPS","tấm ngăn ắc quy nguồn dự phòng","tấm ngăn UPS VRLA"],
      pageName: "Tấm ngăn AGM cho ứng dụng ắc quy UPS",
      serviceDescription: "Đối chiếu tấm ngăn sợi thủy tinh AGM cho ắc quy UPS, nguồn chờ và nguồn dự phòng VRLA.",
      serviceType: "Tấm ngăn AGM cho ắc quy UPS",
      image: UPS_APPLICATION_IMAGE,
      breadcrumbs: ["Trang chủ","Ứng dụng","Tấm ngăn AGM cho ắc quy UPS"]
    },
    ko: {
      path: "/ko/applications/agm-separator-for-ups-battery/",
      alternatePath: "/applications/agm-separator-for-ups-battery/",
      locale: "ko_KR",
      language: "ko-KR",
      siteName: "Viking AGM",
      title: "UPS 배터리용 AGM 분리막 | Viking AGM",
      description: "UPS, 대기전원 및 백업 전원용 VRLA 납축전지 AGM 분리막입니다. 롤, 시트와 샘플 사양을 검토합니다.",
      keywords: ["UPS 배터리 AGM 분리막","UPS VRLA 분리막","백업 전원 배터리 분리막"],
      pageName: "UPS 배터리용 AGM 분리막",
      serviceDescription: "UPS, 대기전원 및 백업 전원용 VRLA 납축전지를 위한 유리섬유 AGM 분리막 검토.",
      serviceType: "UPS 배터리용 AGM 분리막",
      image: UPS_APPLICATION_IMAGE,
      breadcrumbs: ["홈","적용 분야","UPS 배터리용 AGM 분리막"]
    },
    ja: {
      path: "/ja/applications/agm-separator-for-ups-battery/",
      alternatePath: "/applications/agm-separator-for-ups-battery/",
      locale: "ja_JP",
      language: "ja-JP",
      siteName: "Viking AGM",
      title: "UPSバッテリー用AGMセパレーター | Viking AGM",
      description: "UPS、待機電源、バックアップ電源用VRLA鉛蓄電池向けAGMセパレーター。ロール、シート、サンプル仕様を確認します。",
      keywords: ["UPSバッテリー AGMセパレーター","UPS VRLA セパレーター","バックアップ電源 セパレーター"],
      pageName: "UPSバッテリー用AGMセパレーター",
      serviceDescription: "UPS・待機電源・バックアップ電源用VRLA鉛蓄電池向けガラス繊維AGMセパレーターの確認。",
      serviceType: "UPSバッテリー用AGMセパレーター",
      image: UPS_APPLICATION_IMAGE,
      breadcrumbs: ["ホーム","用途","UPSバッテリー用AGMセパレーター"]
    },
    es: {
      path: "/es/applications/agm-separator-for-ups-battery/",
      alternatePath: "/applications/agm-separator-for-ups-battery/",
      locale: "es_LA",
      language: "es",
      siteName: "Viking AGM",
      title: "Separador AGM para baterías UPS y de respaldo | Viking AGM",
      description: "Separador AGM para baterías VRLA de UPS, energía de reserva y respaldo. Revise rollos, láminas y especificaciones de muestra.",
      keywords: ["separador AGM para batería UPS","separador UPS VRLA","separador de batería de respaldo"],
      pageName: "Separador AGM para aplicaciones UPS",
      serviceDescription: "Revisión de separadores AGM de fibra de vidrio para baterías VRLA de UPS y energía de respaldo.",
      serviceType: "Separador AGM para baterías UPS",
      image: UPS_APPLICATION_IMAGE,
      breadcrumbs: ["Inicio","Aplicaciones","Separador AGM para baterías UPS"]
    },
    pt: {
      path: "/pt/applications/agm-separator-for-ups-battery/",
      alternatePath: "/applications/agm-separator-for-ups-battery/",
      locale: "pt_BR",
      language: "pt-BR",
      siteName: "Viking AGM",
      title: "Separador AGM para baterias UPS e de reserva | Viking AGM",
      description: "Separador AGM para baterias VRLA de UPS, energia de reserva e backup. Analise rolos, folhas e especificações de amostra.",
      keywords: ["separador AGM para bateria UPS","separador UPS VRLA","separador de bateria de reserva"],
      pageName: "Separador AGM para aplicações UPS",
      serviceDescription: "Análise de separadores AGM de fibra de vidro para baterias VRLA de UPS e energia de reserva.",
      serviceType: "Separador AGM para baterias UPS",
      image: UPS_APPLICATION_IMAGE,
      breadcrumbs: ["Início","Aplicações","Separador AGM para baterias UPS"]
    },
    ru: {
      path: "/ru/applications/agm-separator-for-ups-battery/",
      alternatePath: "/applications/agm-separator-for-ups-battery/",
      locale: "ru_RU",
      language: "ru-RU",
      siteName: "Viking AGM",
      title: "AGM-сепаратор для аккумуляторов ИБП | Viking AGM",
      description: "AGM-сепаратор для аккумуляторов VRLA в ИБП и системах резервного питания. Согласование рулонов, листов и образцов.",
      keywords: ["AGM сепаратор для ИБП","сепаратор UPS VRLA","сепаратор аккумулятора резервного питания"],
      pageName: "AGM-сепаратор для применения в ИБП",
      serviceDescription: "Согласование стекловолоконного AGM-сепаратора для VRLA-аккумуляторов ИБП и резервного питания.",
      serviceType: "AGM-сепаратор для ИБП",
      image: UPS_APPLICATION_IMAGE,
      breadcrumbs: ["Главная","Применение","AGM-сепаратор для ИБП"]
    },
  },
  energy: {
    vi: {
      path: "/vi/applications/agm-separator-for-energy-storage-battery/",
      alternatePath: "/applications/agm-separator-for-energy-storage-battery/",
      locale: "vi_VN",
      language: "vi-VN",
      siteName: "Viking AGM",
      title: "Tấm ngăn AGM cho ắc quy lưu trữ năng lượng | Viking AGM",
      description: "Tấm ngăn AGM cho ắc quy chì axit lưu trữ năng lượng, nguồn dự phòng và nguồn chờ. Trao đổi dạng cuộn, tấm và thông số mẫu.",
      keywords: ["tấm ngăn AGM cho ắc quy lưu trữ năng lượng","tấm ngăn ắc quy chì axit lưu trữ","tấm ngăn nguồn dự phòng"],
      pageName: "Tấm ngăn AGM cho ứng dụng lưu trữ năng lượng",
      serviceDescription: "Đối chiếu tấm ngăn sợi thủy tinh AGM cho ắc quy chì axit lưu trữ và nguồn dự phòng.",
      serviceType: "Tấm ngăn AGM cho lưu trữ năng lượng",
      image: ENERGY_STORAGE_APPLICATION_IMAGE,
      breadcrumbs: ["Trang chủ","Ứng dụng","Tấm ngăn AGM cho lưu trữ năng lượng"]
    },
    ko: {
      path: "/ko/applications/agm-separator-for-energy-storage-battery/",
      alternatePath: "/applications/agm-separator-for-energy-storage-battery/",
      locale: "ko_KR",
      language: "ko-KR",
      siteName: "Viking AGM",
      title: "에너지 저장 배터리용 AGM 분리막 | Viking AGM",
      description: "납축전지 에너지 저장, 백업 및 대기전원용 VRLA 배터리 AGM 분리막입니다. 롤, 시트와 샘플 사양을 검토합니다.",
      keywords: ["에너지 저장 배터리 AGM 분리막","납축전지 저장 분리막","백업 전원 분리막"],
      pageName: "에너지 저장 배터리용 AGM 분리막",
      serviceDescription: "납축전지 에너지 저장 및 백업 전원용 유리섬유 AGM 분리막 사양 검토.",
      serviceType: "에너지 저장용 AGM 분리막",
      image: ENERGY_STORAGE_APPLICATION_IMAGE,
      breadcrumbs: ["홈","적용 분야","에너지 저장용 AGM 분리막"]
    },
    ja: {
      path: "/ja/applications/agm-separator-for-energy-storage-battery/",
      alternatePath: "/applications/agm-separator-for-energy-storage-battery/",
      locale: "ja_JP",
      language: "ja-JP",
      siteName: "Viking AGM",
      title: "蓄電用バッテリー向けAGMセパレーター | Viking AGM",
      description: "鉛蓄電池の蓄電、バックアップ、待機電源用途向けAGMセパレーター。ロール、シート、サンプル仕様を確認します。",
      keywords: ["蓄電池 AGMセパレーター","鉛蓄電池 蓄電 セパレーター","バックアップ電源 セパレーター"],
      pageName: "蓄電用バッテリー向けAGMセパレーター",
      serviceDescription: "鉛蓄電池の蓄電・バックアップ電源用途向けガラス繊維AGMセパレーターの仕様確認。",
      serviceType: "蓄電用AGMセパレーター",
      image: ENERGY_STORAGE_APPLICATION_IMAGE,
      breadcrumbs: ["ホーム","用途","蓄電用AGMセパレーター"]
    },
    es: {
      path: "/es/applications/agm-separator-for-energy-storage-battery/",
      alternatePath: "/applications/agm-separator-for-energy-storage-battery/",
      locale: "es_LA",
      language: "es",
      siteName: "Viking AGM",
      title: "Separador AGM para baterías de almacenamiento de energía | Viking AGM",
      description: "Separador AGM para baterías VRLA de almacenamiento de energía, respaldo y reserva. Revise rollos, láminas y muestras.",
      keywords: ["separador AGM para almacenamiento de energía","separador de batería de plomo para almacenamiento","separador de energía de respaldo"],
      pageName: "Separador AGM para almacenamiento de energía",
      serviceDescription: "Revisión de separadores AGM de fibra de vidrio para baterías de plomo de almacenamiento y respaldo.",
      serviceType: "Separador AGM para almacenamiento",
      image: ENERGY_STORAGE_APPLICATION_IMAGE,
      breadcrumbs: ["Inicio","Aplicaciones","Separador AGM para almacenamiento"]
    },
    pt: {
      path: "/pt/applications/agm-separator-for-energy-storage-battery/",
      alternatePath: "/applications/agm-separator-for-energy-storage-battery/",
      locale: "pt_BR",
      language: "pt-BR",
      siteName: "Viking AGM",
      title: "Separador AGM para baterias de armazenamento de energia | Viking AGM",
      description: "Separador AGM para baterias VRLA de armazenamento, backup e reserva. Analise rolos, folhas e especificações de amostra.",
      keywords: ["separador AGM para armazenamento de energia","separador de bateria chumbo-ácido para armazenamento","separador de energia de reserva"],
      pageName: "Separador AGM para armazenamento de energia",
      serviceDescription: "Análise de separadores AGM de fibra de vidro para baterias chumbo-ácido de armazenamento e backup.",
      serviceType: "Separador AGM para armazenamento",
      image: ENERGY_STORAGE_APPLICATION_IMAGE,
      breadcrumbs: ["Início","Aplicações","Separador AGM para armazenamento"]
    },
    ru: {
      path: "/ru/applications/agm-separator-for-energy-storage-battery/",
      alternatePath: "/applications/agm-separator-for-energy-storage-battery/",
      locale: "ru_RU",
      language: "ru-RU",
      siteName: "Viking AGM",
      title: "AGM-сепаратор для аккумуляторов систем хранения энергии | Viking AGM",
      description: "AGM-сепаратор для свинцово-кислотных VRLA-аккумуляторов систем хранения и резервного питания. Согласование рулонов, листов и образцов.",
      keywords: ["AGM сепаратор для хранения энергии","сепаратор свинцового накопительного аккумулятора","сепаратор резервного питания"],
      pageName: "AGM-сепаратор для систем хранения энергии",
      serviceDescription: "Согласование стекловолоконного AGM-сепаратора для свинцовых аккумуляторов хранения и резервного питания.",
      serviceType: "AGM-сепаратор для хранения энергии",
      image: ENERGY_STORAGE_APPLICATION_IMAGE,
      breadcrumbs: ["Главная","Применение","AGM-сепаратор для хранения энергии"]
    },
  },
} as const;

const agmSeparatorVrlaApplicationSeo = {
  en: {
    path: "/applications/agm-separator-for-vrla-battery/",
    alternatePath: "/zh/applications/agm-separator-for-vrla-battery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator for VRLA Lead-Acid Battery Applications",
    description:
      "AGM separators for VRLA lead-acid batteries used in UPS, telecom, motorcycle, e-bike, energy storage and automotive starting batteries.",
    keywords: [
      "battery separator for VRLA batteries",
      "lead-acid battery separator",
      "VRLA battery separator",
      "AGM separator applications",
      "AGM battery separator"
    ],
    pageName: "AGM Separator for VRLA Battery Applications",
    serviceDescription:
      "Application-focused AGM glass fiber separator discussion for VRLA lead-acid batteries, including UPS, telecom, motorcycle, e-bike, energy storage and automotive starting battery applications.",
    serviceType: "AGM separator for VRLA lead-acid battery applications",
    image: PREVIEW_IMAGE,
    breadcrumbs: ["Home", "Applications", "AGM Separator for VRLA Battery"]
  },
  zh: {
    path: "/zh/applications/agm-separator-for-vrla-battery/",
    alternatePath: "/applications/agm-separator-for-vrla-battery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "VRLA 铅酸电池应用 AGM 隔板 | 湖北维京AGM",
    description:
      "湖北维京AGM提供用于VRLA铅酸电池应用的AGM玻璃纤维隔板，服务UPS、通信、摩托车、电动车、储能和汽车启动电池等应用。",
    keywords: [
      "VRLA 电池隔板",
      "铅酸电池隔板",
      "AGM 隔板应用",
      "AGM 玻璃纤维隔板",
      "湖北维京AGM"
    ],
    pageName: "用于 VRLA 电池应用的 AGM 隔板",
    serviceDescription:
      "面向 VRLA 铅酸电池应用的 AGM 玻璃纤维隔板沟通，覆盖 UPS、通信、摩托车、电动车、储能和汽车启动电池等应用场景。",
    serviceType: "VRLA 铅酸电池应用 AGM 隔板",
    image: PREVIEW_IMAGE,
    breadcrumbs: ["首页", "应用", "VRLA 电池 AGM 隔板应用"]
  },
  ...secondaryApplicationSeo.vrla
} as const;

const agmSeparatorUpsApplicationSeo = {
  en: {
    path: "/applications/agm-separator-for-ups-battery/",
    alternatePath: "/zh/applications/agm-separator-for-ups-battery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator for UPS VRLA Batteries",
    description:
      "AGM separator discussion for UPS, standby power and backup VRLA lead-acid battery production. Send your contact for roll, sheet or specification support.",
    keywords: [
      "AGM separator for UPS battery",
      "UPS VRLA battery separator",
      "standby battery separator",
      "backup power battery separator",
      "AGM battery separator"
    ],
    pageName: "AGM Separator for UPS Battery Applications",
    serviceDescription:
      "Application-focused AGM glass fiber separator discussion for UPS, standby power and backup VRLA lead-acid battery manufacturing.",
    serviceType: "AGM separator for UPS VRLA battery applications",
    image: UPS_APPLICATION_IMAGE,
    breadcrumbs: ["Home", "Applications", "AGM Separator for UPS Battery"]
  },
  zh: {
    path: "/zh/applications/agm-separator-for-ups-battery/",
    alternatePath: "/applications/agm-separator-for-ups-battery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "UPS VRLA 电池 AGM 隔板 | 湖北维京AGM",
    description:
      "面向 UPS、备用电源和后备电源 VRLA 铅酸电池生产，沟通 AGM 隔板卷材、片材和规格要求。",
    keywords: [
      "UPS 电池 AGM 隔板",
      "UPS VRLA 电池隔板",
      "备用电源电池隔板",
      "后备电源电池隔板",
      "AGM 电池隔板"
    ],
    pageName: "用于 UPS 电池应用的 AGM 隔板",
    serviceDescription:
      "面向 UPS、备用电源和后备电源 VRLA 铅酸电池制造的 AGM 玻璃纤维隔板应用沟通。",
    serviceType: "UPS VRLA 电池应用 AGM 隔板",
    image: UPS_APPLICATION_IMAGE,
    breadcrumbs: ["首页", "应用", "UPS 电池 AGM 隔板"]
  },
  ...secondaryApplicationSeo.ups
} as const;

const agmSeparatorMotorcycleApplicationSeo = {
  en: {
    path: "/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/zh/applications/agm-separator-for-motorcycle-battery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator for Motorcycle Starting Batteries",
    description:
      "AGM separator discussion for compact motorcycle VRLA and starting battery production, including roll, sheet and sample requirements.",
    keywords: [
      "AGM separator for motorcycle battery",
      "motorcycle battery separator",
      "motorcycle VRLA battery separator",
      "starter battery separator",
      "AGM separator sheets"
    ],
    pageName: "AGM Separator for Motorcycle Battery Applications",
    serviceDescription:
      "Application-focused AGM glass fiber separator discussion for motorcycle starting batteries and compact VRLA lead-acid battery production.",
    serviceType: "AGM separator for motorcycle battery applications",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["Home", "Applications", "AGM Separator for Motorcycle Battery"]
  },
  zh: {
    path: "/zh/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/applications/agm-separator-for-motorcycle-battery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "摩托车启动电池 AGM 隔板 | 湖北维京AGM",
    description:
      "面向紧凑型摩托车 VRLA 电池和启动电池生产，沟通 AGM 隔板卷材、片材和样品需求。",
    keywords: [
      "摩托车电池 AGM 隔板",
      "摩托车 VRLA 电池隔板",
      "启动电池隔板",
      "AGM 隔板片材",
      "AGM 电池隔板"
    ],
    pageName: "用于摩托车电池应用的 AGM 隔板",
    serviceDescription:
      "面向摩托车启动电池和紧凑型 VRLA 铅酸电池生产的 AGM 玻璃纤维隔板应用沟通。",
    serviceType: "摩托车电池应用 AGM 隔板",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["首页", "应用", "摩托车电池 AGM 隔板"]
  },
  vi: {
    path: "/vi/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/applications/agm-separator-for-motorcycle-battery/",
    locale: "vi_VN",
    language: "vi-VN",
    siteName: "Viking AGM",
    title: "Tấm ngăn AGM cho ắc quy xe máy | Viking AGM",
    description:
      "Tấm ngăn AGM cho ắc quy khởi động xe máy và ắc quy VRLA nhỏ gọn, hỗ trợ xác nhận dạng cuộn, dạng tấm, kích thước và yêu cầu mẫu.",
    keywords: [
      "tấm ngăn AGM cho ắc quy xe máy",
      "tấm ngăn ắc quy xe máy",
      "tấm ngăn ắc quy VRLA xe máy",
      "tấm ngăn ắc quy khởi động",
      "tấm ngăn AGM dạng tấm"
    ],
    pageName: "Tấm ngăn AGM cho ứng dụng ắc quy xe máy",
    serviceDescription:
      "Đối chiếu tấm ngăn sợi thủy tinh AGM cho ắc quy khởi động xe máy và sản xuất ắc quy chì axit VRLA nhỏ gọn.",
    serviceType: "Tấm ngăn AGM cho ứng dụng ắc quy xe máy",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["Trang chủ", "Ứng dụng", "Tấm ngăn AGM cho ắc quy xe máy"]
  },
  ko: {
    path: "/ko/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/applications/agm-separator-for-motorcycle-battery/",
    locale: "ko_KR",
    language: "ko-KR",
    siteName: "Viking AGM",
    title: "오토바이 배터리용 AGM 분리막 | Viking AGM",
    description: "소형 오토바이 시동용 VRLA 배터리를 위한 AGM 분리막 롤, 시트, 치수 및 샘플 요구사항을 검토합니다.",
    keywords: ["오토바이 배터리 AGM 분리막", "오토바이 배터리 분리막", "VRLA 배터리 분리막", "시동 배터리 분리막", "AGM 분리막 시트"],
    pageName: "오토바이 시동 배터리용 AGM 분리막",
    serviceDescription: "소형 오토바이 시동용 VRLA 납축전지 생산을 위한 AGM 유리섬유 분리막 사양 및 샘플 검토.",
    serviceType: "오토바이 배터리용 AGM 분리막",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["홈", "적용 분야", "오토바이 배터리용 AGM 분리막"]
  },
  ja: {
    path: "/ja/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/applications/agm-separator-for-motorcycle-battery/",
    locale: "ja_JP",
    language: "ja-JP",
    siteName: "Viking AGM",
    title: "二輪車用バッテリー向けAGMセパレーター | Viking AGM",
    description: "小型二輪車始動用VRLAバッテリー向けに、AGMセパレーターのロール、シート、寸法、サンプル要件を確認します。",
    keywords: ["二輪車 バッテリー AGM セパレーター", "二輪車用バッテリー セパレーター", "VRLA セパレーター", "始動用バッテリー セパレーター", "AGM セパレーター シート"],
    pageName: "二輪車始動用バッテリー向けAGMセパレーター",
    serviceDescription: "小型二輪車始動用VRLA鉛蓄電池向けAGMガラス繊維セパレーターの仕様・サンプル確認。",
    serviceType: "二輪車用バッテリー向けAGMセパレーター",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["ホーム", "用途", "二輪車用AGMセパレーター"]
  },
  es: {
    path: "/es/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/applications/agm-separator-for-motorcycle-battery/",
    locale: "es_LA",
    language: "es",
    siteName: "Viking AGM",
    title: "Separador AGM para baterías de motocicleta | Viking AGM",
    description: "Separadores AGM para baterías VRLA compactas de arranque de motocicleta: rollos, láminas, medidas y evaluación de muestras.",
    keywords: ["separador AGM para batería de motocicleta", "separador de batería de motocicleta", "separador VRLA", "separador de batería de arranque", "láminas AGM"],
    pageName: "Separador AGM para baterías de arranque de motocicleta",
    serviceDescription: "Revisión de especificaciones y muestras de separador AGM de fibra de vidrio para baterías VRLA compactas de motocicleta.",
    serviceType: "Separador AGM para baterías de motocicleta",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["Inicio", "Aplicaciones", "Separador AGM para motocicleta"]
  },
  pt: {
    path: "/pt/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/applications/agm-separator-for-motorcycle-battery/",
    locale: "pt_BR",
    language: "pt-BR",
    siteName: "Viking AGM",
    title: "Separador AGM para baterias de motocicletas | Viking AGM",
    description: "Separadores AGM para baterias VRLA compactas de partida de motocicletas: rolos, folhas, medidas e avaliação de amostras.",
    keywords: ["separador AGM para bateria de motocicleta", "separador de bateria de motocicleta", "separador VRLA", "separador de bateria de partida", "folhas AGM"],
    pageName: "Separador AGM para baterias de partida de motocicletas",
    serviceDescription: "Análise de especificações e amostras de separador AGM de fibra de vidro para baterias VRLA compactas de motocicletas.",
    serviceType: "Separador AGM para baterias de motocicletas",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["Início", "Aplicações", "Separador AGM para motocicletas"]
  },
  ru: {
    path: "/ru/applications/agm-separator-for-motorcycle-battery/",
    alternatePath: "/applications/agm-separator-for-motorcycle-battery/",
    locale: "ru_RU",
    language: "ru-RU",
    siteName: "Viking AGM",
    title: "AGM-сепаратор для мотоциклетных аккумуляторов | Viking AGM",
    description: "AGM-сепараторы для компактных стартерных VRLA-аккумуляторов мотоциклов: рулоны, листы, размеры и оценка образцов.",
    keywords: ["AGM-сепаратор для мотоциклетного аккумулятора", "сепаратор мотоциклетного аккумулятора", "сепаратор VRLA", "сепаратор стартерного аккумулятора", "листы AGM"],
    pageName: "AGM-сепаратор для стартерных аккумуляторов мотоциклов",
    serviceDescription: "Согласование спецификаций и образцов стекловолоконного AGM-сепаратора для компактных мотоциклетных VRLA-аккумуляторов.",
    serviceType: "AGM-сепаратор для мотоциклетных аккумуляторов",
    image: MOTORCYCLE_APPLICATION_IMAGE,
    breadcrumbs: ["Главная", "Применение", "AGM-сепаратор для мотоциклов"]
  }
} as const;

const agmSeparatorEnergyStorageApplicationSeo = {
  en: {
    path: "/applications/agm-separator-for-energy-storage-battery/",
    alternatePath: "/zh/applications/agm-separator-for-energy-storage-battery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator for Energy Storage Batteries | Viking AGM",
    description:
      "AGM separator discussion for lead-acid energy storage, backup power and reserve power VRLA battery projects.",
    keywords: [
      "AGM separator for energy storage battery",
      "lead acid energy storage battery separator",
      "backup power battery separator",
      "reserve power battery separator",
      "VRLA battery separator"
    ],
    pageName: "AGM Separator for Energy Storage Battery Applications",
    serviceDescription:
      "Application-focused AGM glass fiber separator discussion for lead-acid energy storage, backup power and reserve power VRLA battery projects.",
    serviceType: "AGM separator for lead-acid energy storage battery applications",
    image: ENERGY_STORAGE_APPLICATION_IMAGE,
    breadcrumbs: ["Home", "Applications", "AGM Separator for Energy Storage Battery"]
  },
  zh: {
    path: "/zh/applications/agm-separator-for-energy-storage-battery/",
    alternatePath: "/applications/agm-separator-for-energy-storage-battery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "铅酸储能电池 AGM 隔板 | 湖北维京AGM",
    description:
      "面向铅酸储能、后备电源和备用电源 VRLA 电池项目，沟通 AGM 隔板卷材、片材和规格要求。",
    keywords: [
      "储能电池 AGM 隔板",
      "铅酸储能电池隔板",
      "后备电源电池隔板",
      "备用电源电池隔板",
      "VRLA 电池隔板"
    ],
    pageName: "用于储能电池应用的 AGM 隔板",
    serviceDescription:
      "面向铅酸储能、后备电源和备用电源 VRLA 电池项目的 AGM 玻璃纤维隔板应用沟通。",
    serviceType: "铅酸储能电池应用 AGM 隔板",
    image: ENERGY_STORAGE_APPLICATION_IMAGE,
    breadcrumbs: ["首页", "应用", "储能电池 AGM 隔板"]
  },
  ...secondaryApplicationSeo.energy
} as const;

type ApplicationDetailSeo = {
  path: string;
  locale: string;
  language: string;
  siteName: string;
  title: string;
  description: string;
  keywords: readonly string[];
  pageName: string;
  serviceDescription: string;
  serviceType: string;
  image: string;
  breadcrumbs: readonly string[];
};

const whatIsAgmSeparatorSeo = {
  en: {
    path: "/blog/what-is-agm-separator/",
    alternatePath: "/zh/blog/what-is-agm-separator/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "What Is AGM Separator? A Practical Guide for VRLA Battery Buyers",
    description:
      "Learn what AGM separator is, how it works in VRLA lead-acid batteries and what information buyers should confirm before purchasing.",
    keywords: [
      "what is AGM separator",
      "AGM battery separator",
      "AGM glass fiber separator",
      "VRLA battery separator",
      "Absorbent Glass Mat separator"
    ],
    pageName: "What Is AGM Separator?",
    articleDescription:
      "A practical educational guide explaining AGM separators, their function in VRLA lead-acid batteries, key parameters, roll and sheet formats, and buyer checklist information.",
    breadcrumbs: ["Home", "Resources", "What Is AGM Separator"]
  },
  zh: {
    path: "/zh/blog/what-is-agm-separator/",
    alternatePath: "/blog/what-is-agm-separator/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "什么是 AGM 隔板？VRLA 电池买家实用指南 | 湖北维京AGM",
    description:
      "了解AGM隔板是什么、它在VRLA铅酸电池中的作用，以及采购前应确认的厚度、宽度、吸酸性能、电阻等信息。",
    keywords: [
      "什么是 AGM 隔板",
      "AGM 电池隔板",
      "AGM 玻璃纤维隔板",
      "VRLA 电池隔板",
      "铅酸电池隔板"
    ],
    pageName: "什么是 AGM 隔板？",
    articleDescription:
      "面向 VRLA 铅酸电池买家的 AGM 隔板入门指南，说明隔板定义、电池中的作用、关键参数、卷材片材形式和询价前信息清单。",
    breadcrumbs: ["首页", "资料", "什么是 AGM 隔板"]
  }
} as const;

const keyTechnicalParametersSeo = {
  en: {
    path: "/blog/key-technical-parameters-of-agm-separator/",
    alternatePath: "/zh/blog/key-technical-parameters-of-agm-separator/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "Key Technical Parameters of AGM Separator",
    description:
      "Understand AGM separator thickness, basis weight, acid absorption, electrical resistance, porosity and strength in buyer-friendly language.",
    keywords: [
      "AGM separator thickness",
      "AGM separator basis weight",
      "AGM separator acid absorption",
      "AGM separator electrical resistance",
      "AGM separator technical parameters"
    ],
    pageName: "Key Technical Parameters of AGM Separator",
    articleDescription:
      "A buyer-friendly technical guide explaining AGM separator thickness, basis weight, acid absorption, electrical resistance, porosity and mechanical strength for VRLA lead-acid battery sourcing.",
    breadcrumbs: ["Home", "Resources", "Key Technical Parameters"]
  },
  zh: {
    path: "/zh/blog/key-technical-parameters-of-agm-separator/",
    alternatePath: "/blog/key-technical-parameters-of-agm-separator/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板关键技术参数 | 湖北维京AGM",
    description:
      "了解AGM隔板厚度、克重、吸酸性能、电阻、孔隙率和强度等关键参数，便于采购和技术沟通。",
    keywords: [
      "AGM 隔板厚度",
      "AGM 隔板克重",
      "AGM 隔板吸酸性能",
      "AGM 隔板电阻",
      "AGM 隔板技术参数"
    ],
    pageName: "AGM 隔板关键技术参数",
    articleDescription:
      "面向采购和工程人员的 AGM 隔板技术参数说明，解释厚度、克重、吸酸性能、电阻、孔隙率和机械强度等关键沟通点。",
    breadcrumbs: ["首页", "资料", "AGM 隔板技术参数"]
  }
} as const;

const howToChooseAgmSeparatorSeo = {
  en: {
    path: "/blog/how-to-choose-agm-separator/",
    alternatePath: "/zh/blog/how-to-choose-agm-separator/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "How to Choose AGM Separator for VRLA Batteries",
    description:
      "A practical buyer checklist for choosing AGM separators: thickness, width, roll or sheet type, battery application and quality requirements.",
    keywords: [
      "how to choose AGM separator",
      "custom AGM separator",
      "AGM separator supplier",
      "AGM separator checklist",
      "VRLA battery separator supplier"
    ],
    pageName: "How to Choose AGM Separator",
    articleDescription:
      "A practical buyer checklist for selecting AGM separators by battery application, roll or sheet type, dimensions, technical parameters, samples and quality requirements.",
    breadcrumbs: ["Home", "Resources", "How to Choose AGM Separator"]
  },
  zh: {
    path: "/zh/blog/how-to-choose-agm-separator/",
    alternatePath: "/blog/how-to-choose-agm-separator/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "如何选择 AGM 隔板 | 湖北维京AGM",
    description:
      "AGM隔板买家实用清单：从电池应用、厚度、宽度、卷材或片材形式、技术参数和质量要求出发进行选择。",
    keywords: [
      "如何选择 AGM 隔板",
      "定制 AGM 隔板",
      "AGM 隔板供应商",
      "AGM 隔板询盘清单",
      "VRLA 电池隔板供应商"
    ],
    pageName: "如何选择 AGM 隔板",
    articleDescription:
      "面向买家的 AGM 隔板选择清单，说明如何根据电池应用、卷材或片材形式、尺寸、技术参数、样品和质量要求沟通需求。",
    breadcrumbs: ["首页", "资料", "如何选择 AGM 隔板"]
  }
} as const;

const agmSeparatorManufacturingQualityDeliverySeo = {
  en: {
    path: "/blog/agm-separator-manufacturing-quality-delivery/",
    alternatePath: "/zh/blog/agm-separator-manufacturing-quality-delivery/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title:
      "AGM Separator Manufacturing: Production, Quality Control and Reliable Delivery",
    description:
      "See how Hubei Viking manages AGM separator production, inspection and delivery for stable VRLA lead-acid battery separator supply.",
    keywords: [
      "AGM separator manufacturing",
      "AGM separator factory",
      "AGM separator quality control",
      "AGM separator delivery",
      "VRLA battery separator supplier"
    ],
    pageName:
      "AGM Separator Manufacturing: Production, Quality Control and Reliable Delivery",
    articleDescription:
      "A factory-focused article explaining how Hubei Viking manages AGM separator production, quality control and delivery communication for reliable VRLA lead-acid battery separator supply.",
    breadcrumbs: ["Home", "Resources", "AGM Separator Manufacturing"]
  },
  zh: {
    path: "/zh/blog/agm-separator-manufacturing-quality-delivery/",
    alternatePath: "/blog/agm-separator-manufacturing-quality-delivery/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "湖北维京 AGM 隔板：生产、检测与稳定交付 | 湖北维京AGM",
    description:
      "了解湖北维京如何围绕 AGM 隔板生产、质量检测和交付配合，为 VRLA 铅酸电池客户提供稳定供应。",
    keywords: [
      "AGM 隔板制造",
      "AGM 隔板工厂",
      "AGM 隔板质量检测",
      "AGM 隔板稳定交付",
      "VRLA 电池隔板供应商"
    ],
    pageName: "湖北维京 AGM 隔板：生产、检测与稳定交付",
    articleDescription:
      "介绍湖北维京如何围绕 AGM 隔板生产、质量控制和交付配合，为 VRLA 铅酸电池客户提供稳定供应。",
    breadcrumbs: ["首页", "资料", "AGM 隔板生产与交付"]
  }
} as const;

const agmSeparatorPerformanceConsistencySeo = {
  en: {
    path: "/blog/agm-separator-performance-consistency/",
    alternatePath: "/zh/blog/agm-separator-performance-consistency/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "Why AGM Separator Consistency Matters for VRLA Batteries | Viking AGM",
    description:
      "Learn why AGM separator conductivity support, fit under compression and batch consistency matter for VRLA lead-acid battery assembly and supply.",
    keywords: [
      "AGM separator consistency",
      "AGM separator selection",
      "AGM separator conductivity",
      "AGM separator quality control",
      "VRLA battery separator supplier"
    ],
    pageName: "Why AGM Separator Consistency Matters for VRLA Batteries",
    articleDescription:
      "A practical buyer guide to AGM separator conductivity support, compression fit and batch consistency for VRLA lead-acid battery projects.",
    breadcrumbs: ["Home", "Resources", "AGM Separator Consistency"]
  },
  zh: {
    path: "/zh/blog/agm-separator-performance-consistency/",
    alternatePath: "/blog/agm-separator-performance-consistency/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板为什么影响电池稳定性？| 湖北维京AGM",
    description:
      "从导通相关表现、受压贴合和批次一致性，了解 AGM 隔板如何影响 VRLA 铅酸电池装配与后续稳定配套。",
    keywords: [
      "AGM 隔板稳定性",
      "AGM 隔板选型",
      "AGM 隔板导通",
      "AGM 隔板批次一致性",
      "VRLA 电池隔板供应商"
    ],
    pageName: "同样是 AGM 隔板，为什么有的电池更稳？",
    articleDescription:
      "面向采购和技术团队，说明 AGM 隔板的导通相关表现、受压贴合和批次一致性为何影响 VRLA 铅酸电池项目的后续配套。",
    breadcrumbs: ["首页", "资料", "AGM 隔板稳定性"]
  }
} as const;

const agmSeparatorExportSupplyReadinessSeo = {
  en: {
    path: "/blog/agm-separator-export-supply-readiness/",
    alternatePath: "/zh/blog/agm-separator-export-supply-readiness/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "Lead-Acid Battery Exports Recovered in May. Is Your AGM Separator Supply Ready?",
    description:
      "May 2026 lead-acid battery export data and a practical buyer guide to AGM separator batch consistency, supply coordination and delivery readiness.",
    keywords: [
      "lead-acid battery export data",
      "AGM separator supply",
      "AGM separator batch consistency",
      "AGM separator delivery",
      "VRLA battery separator supplier"
    ],
    pageName: "Lead-Acid Battery Exports Recovered in May. Is Your AGM Separator Supply Ready?",
    articleDescription:
      "A practical industry article connecting May 2026 lead-acid battery export data with AGM separator batch consistency, supply coordination and delivery readiness for export-oriented battery projects.",
    breadcrumbs: ["Home", "Resources", "AGM Separator Export Supply"]
  },
  zh: {
    path: "/zh/blog/agm-separator-export-supply-readiness/",
    alternatePath: "/blog/agm-separator-export-supply-readiness/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "海外销量回升了，AGM 隔板配套跟得上吗？| 湖北维京AGM",
    description:
      "从 2026 年 5 月铅酸蓄电池出口数据，看 AGM 隔板批次一致性、供货协同和交付准备为何会在出口型项目中变得更重要。",
    keywords: [
      "铅酸蓄电池出口数据",
      "AGM 隔板供应",
      "AGM 隔板批次一致性",
      "AGM 隔板交付",
      "VRLA 电池隔板供应商"
    ],
    pageName: "海外销量回升了，AGM 隔板配套跟得上吗？",
    articleDescription:
      "结合 2026 年 5 月铅酸蓄电池出口数据，面向出口型电池项目说明 AGM 隔板批次一致性、供货协同和交付准备的重要性。",
    breadcrumbs: ["首页", "资料", "AGM 隔板出口配套"]
  }
} as const;

const upsVrlaTechnologySelectionSeo = {
  en: {
    path: "/blog/why-ups-projects-still-use-vrla-batteries/",
    alternatePath: "/zh/blog/why-ups-projects-still-use-vrla-batteries/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "Why Many UPS Projects Still Use VRLA Batteries | Viking AGM",
    description:
      "A practical UPS battery selection guide covering VRLA system compatibility, operating requirements and AGM separator specification matching.",
    keywords: [
      "UPS VRLA battery selection",
      "AGM separator for UPS battery",
      "UPS backup battery",
      "VRLA battery system compatibility",
      "AGM separator supplier"
    ],
    pageName: "Why Many UPS Projects Still Use VRLA Batteries",
    articleDescription:
      "A technology-neutral guide for UPS battery project teams reviewing VRLA system compatibility, operating requirements and AGM separator specification matching.",
    breadcrumbs: ["Home", "Resources", "UPS VRLA Battery Selection"]
  },
  zh: {
    path: "/zh/blog/why-ups-projects-still-use-vrla-batteries/",
    alternatePath: "/blog/why-ups-projects-still-use-vrla-batteries/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "UPS 机房为什么仍在使用 VRLA 铅酸电池？| 湖北维京AGM",
    description:
      "从系统匹配、运维能力和长期稳定性，了解部分 UPS 项目继续使用 VRLA 电池时为何仍需重视 AGM 隔板规格与批次一致性。",
    keywords: [
      "UPS VRLA 电池选型",
      "UPS 电池 AGM 隔板",
      "UPS 备用电源电池",
      "VRLA 电池系统匹配",
      "AGM 隔板供应商"
    ],
    pageName: "UPS 机房为什么仍在使用 VRLA 铅酸电池？",
    articleDescription:
      "面向 UPS 电池项目采购和技术团队，从系统匹配、运维条件与长期稳定性说明 VRLA 技术路线及 AGM 隔板规格确认要点。",
    breadcrumbs: ["首页", "资料", "UPS VRLA 电池选型"]
  }
} as const;

const dataCenterBackupPowerAgmSeparatorSeo = {
  en: {
    path: "/blog/agm-separator-for-data-center-backup-power/",
    alternatePath: "/zh/blog/agm-separator-for-data-center-backup-power/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Requirements for Data Center Backup Power | Viking AGM",
    description:
      "How AGM separator absorption, compression, oxygen transport and batch consistency support VRLA batteries for data center, UPS and telecom backup power.",
    keywords: [
      "AGM separator for data center backup power",
      "UPS VRLA battery separator",
      "telecom backup battery AGM separator",
      "AGM separator compression",
      "VRLA battery batch consistency"
    ],
    pageName: "AGM Separator Requirements for Data Center Backup Power",
    articleDescription:
      "A technical buyer guide to AGM separator absorption, compression, oxygen transport and batch consistency for data center, UPS and telecom VRLA backup power projects.",
    breadcrumbs: ["Home", "Resources", "Data Center Backup Power AGM Separators"]
  },
  zh: {
    path: "/zh/blog/agm-separator-for-data-center-backup-power/",
    alternatePath: "/blog/agm-separator-for-data-center-backup-power/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "数据中心备电需求增长，AGM 隔板配套该看什么？| 湖北维京AGM",
    description:
      "从吸液、压缩贴合、氧复合和批次一致性，了解数据中心、UPS 与通信备电 VRLA 电池项目应如何确认 AGM 隔板规格。",
    keywords: [
      "数据中心备电 AGM 隔板",
      "UPS VRLA 电池隔板",
      "通信后备电源 AGM 隔板",
      "AGM 隔板压缩",
      "VRLA 电池批次一致性"
    ],
    pageName: "数据中心备电需求增长，AGM 隔板配套该看什么？",
    articleDescription:
      "面向数据中心、UPS 和通信备电项目，从吸液、压缩贴合、氧复合与批次一致性说明 AGM 隔板规格确认要点。",
    breadcrumbs: ["首页", "资料", "数据中心备电 AGM 隔板"]
  }
} as const;

const earlyChinaLeadAcidBatteryManufacturingSeo = {
  en: {
    path: "/blog/how-chinas-earliest-lead-acid-batteries-were-made/",
    alternatePath: "/zh/blog/how-chinas-earliest-lead-acid-batteries-were-made/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "How China’s Earliest Lead-Acid Batteries Were Made | Viking AGM",
    description:
      "A sourced history of China’s early lead-acid battery manufacturing, from hand-cast grids and wooden separators to industrial production and modern AGM.",
    keywords: [
      "early lead-acid battery manufacturing China",
      "lead-acid battery history China",
      "wooden battery separator",
      "AGM separator history",
      "VRLA AGM manufacturing"
    ],
    pageName: "How China’s Earliest Lead-Acid Batteries Were Made",
    articleDescription:
      "A source-aware account of early Chinese lead-acid battery production, separator material evolution and the move toward repeatable modern AGM manufacturing.",
    breadcrumbs: ["Home", "Resources", "Early Lead-Acid Battery Manufacturing in China"]
  },
  zh: {
    path: "/zh/blog/how-chinas-earliest-lead-acid-batteries-were-made/",
    alternatePath: "/blog/how-chinas-earliest-lead-acid-batteries-were-made/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "中国早期铅酸蓄电池是怎样制造的？| 湖北维京AGM",
    description:
      "从手工铸造板栅、木质隔板到专业化工厂和现代 AGM，梳理中国早期铅酸蓄电池制造及隔板材料演进。",
    keywords: [
      "中国铅酸蓄电池制造史",
      "早期铅酸电池生产",
      "木质电池隔板",
      "AGM 隔板历史",
      "VRLA AGM 制造"
    ],
    pageName: "中国早期铅酸蓄电池是怎样制造的？",
    articleDescription:
      "以不同历史口径梳理中国早期铅酸蓄电池生产、隔板材料演进和现代 AGM 批次制造要求。",
    breadcrumbs: ["首页", "资料", "中国早期铅酸蓄电池制造史"]
  }
} as const;

const agmSeparatorPressureRetentionSeo = {
  en: {
    path: "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/",
    alternatePath: "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Pressure Retention After Filling and Cycling | Viking AGM",
    description:
      "Learn how test pressure, wet shrinkage, compression recovery and residual force affect AGM separator evaluation after acid filling and cycling.",
    keywords: [
      "AGM separator pressure retention",
      "AGM separator compression recovery",
      "AGM wet thickness",
      "VRLA separator cycling test",
      "AGM separator test pressure"
    ],
    pageName: "Will an AGM Separator Still Hold Pressure After Filling and Cycling?",
    articleDescription:
      "A practical guide to dry thickness, wet compression, residual force and reproducible four-stage testing for AGM separators in VRLA batteries.",
    breadcrumbs: ["Home", "Resources", "AGM Separator Pressure Retention"]
  },
  zh: {
    path: "/zh/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/",
    alternatePath: "/blog/agm-separator-pressure-retention-after-acid-filling-and-cycling/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板填酸与循环后的压力保持怎么评估？| 湖北维京AGM",
    description:
      "从测试压力、湿态收缩、压缩回弹和循环后残余压力，了解 AGM 隔板四阶段打样记录与整电池验证边界。",
    keywords: [
      "AGM 隔板压力保持",
      "AGM 隔板压缩回弹",
      "AGM 隔板湿态厚度",
      "VRLA 隔板循环测试",
      "AGM 隔板测试压力"
    ],
    pageName: "隔板装进去没问题，循环以后还能保持压力吗？",
    articleDescription:
      "面向 VRLA 电池打样，从干态厚度、填酸、循环和可复现记录说明 AGM 隔板压力保持的评估方法与适用边界。",
    breadcrumbs: ["首页", "资料", "AGM 隔板压力保持"]
  }
} as const;

const agmSeparatorBatchProcessControlSeo = {
  en: {
    path: "/blog/agm-separator-batch-consistency-and-process-control/",
    alternatePath: "/zh/blog/agm-separator-batch-consistency-and-process-control/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Separator Batch Consistency and Process Control | Viking AGM",
    description:
      "Learn why one passing AGM separator test does not prove volume readiness, and how sampling, dispersion, trends and traceability support batch evaluation.",
    keywords: [
      "AGM separator batch consistency",
      "AGM separator process control",
      "AGM separator sampling plan",
      "AGM separator Cp Cpk",
      "AGM separator supplier audit"
    ],
    pageName: "Why One Passing Test Does Not Prove AGM Separator Volume Readiness",
    articleDescription:
      "A buyer-focused guide to sample dispersion, roll-position sampling, process trends, capability indices and traceability questions for AGM separator volume production.",
    breadcrumbs: ["Home", "Resources", "AGM Separator Batch Consistency"]
  },
  zh: {
    path: "/zh/blog/agm-separator-batch-consistency-and-process-control/",
    alternatePath: "/blog/agm-separator-batch-consistency-and-process-control/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 隔板单次检测合格，为什么不等于批量稳定？| 湖北维京AGM",
    description:
      "从平均值、极差、标准差、趋势、取样位置和批次追溯，了解 AGM 隔板从样品合格到批量稳定的评价方法。",
    keywords: [
      "AGM 隔板批次一致性",
      "AGM 隔板过程控制",
      "AGM 隔板取样方案",
      "AGM 隔板 Cp Cpk",
      "AGM 隔板供应商审核"
    ],
    pageName: "为什么单次检测合格，不等于 AGM 隔板适合批量生产？",
    articleDescription:
      "面向采购与质量团队，从数据离散、卷材取样、趋势、过程能力和追溯审核说明 AGM 隔板批量评价方法。",
    breadcrumbs: ["首页", "资料", "AGM 隔板批次一致性"]
  }
} as const;

const agmGlassFiberVsPvcSeparatorSeo = {
  en: {
    path: "/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    alternatePath: "/zh/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    locale: "en_US",
    language: "en",
    siteName: "Viking AGM",
    title: "AGM Glass Fiber vs PVC Battery Separators | Viking AGM",
    description:
      "Compare AGM glass fiber and microporous PVC battery separators by battery design, electrolyte management, assembly requirements and sourcing fit.",
    keywords: [
      "AGM glass fiber separator",
      "PVC battery separator",
      "microporous PVC separator",
      "VRLA AGM battery separator",
      "flooded lead-acid battery separator",
      "battery separator comparison"
    ],
    pageName: "AGM Glass Fiber vs PVC Battery Separators",
    articleDescription:
      "A practical buyer guide comparing AGM glass fiber and microporous PVC battery separators by electrolyte condition, battery structure, assembly requirements and replacement boundaries.",
    breadcrumbs: ["Home", "Resources", "AGM vs PVC Battery Separators"]
  },
  zh: {
    path: "/zh/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    alternatePath: "/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    locale: "zh_CN",
    language: "zh-CN",
    siteName: "湖北维京AGM",
    title: "AGM 玻璃纤维隔板和 PVC 电池隔板有什么区别？| 湖北维京AGM",
    description:
      "从电池结构、电解液状态、装配要求和选型边界，对比 AGM 玻璃纤维隔板与微孔 PVC 电池隔板的主要区别。",
    keywords: [
      "AGM 玻璃纤维隔板",
      "PVC 电池隔板",
      "微孔 PVC 隔板",
      "VRLA AGM 电池隔板",
      "富液式铅酸电池隔板",
      "电池隔板对比"
    ],
    pageName: "AGM 玻璃纤维隔板和 PVC 电池隔板有什么区别？",
    articleDescription:
      "面向采购和技术团队，从电解液状态、电池结构、装配要求与替换边界，对比 AGM 玻璃纤维隔板和微孔 PVC 电池隔板。",
    breadcrumbs: ["首页", "资料", "AGM 与 PVC 电池隔板对比"]
  }
} as const;

export function buildHomeMetadata(lang: SiteLocale): Metadata {
  const current = seoContent("home", lang, homeSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/",
    zhPath: "/zh/",
    viPath: "/vi/",
    koPath: "/ko/",
    jaPath: "/ja/",
    esPath: "/es/",
    ptPath: "/pt/",
    ruPath: "/ru/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.serviceName
  });
}

function secondaryResourcesHubSeo(lang: Exclude<SiteLocale, Lang>) {
  const data = secondaryResourceData[lang];
  return {
    path: `/${lang}/resources/`,
    locale: data.meta.og,
    language: data.meta.hreflang,
    siteName: data.meta.site,
    title: `${data.hub.title} | Viking AGM`,
    description: data.hub.subtitle,
    keywords: ["AGM separator", "VRLA", data.nav.resources, data.nav.quality],
    pageName: data.hub.title,
    breadcrumbs: [data.nav.company, data.nav.resources]
  };
}

export function buildResourcesHubMetadata(lang: SiteLocale): Metadata {
  const current =
    lang === "en" || lang === "zh"
      ? resourcesHubSeo[lang]
      : secondaryResourcesHubSeo(lang);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/resources/",
    zhPath: "/zh/resources/",
    viPath: "/vi/resources/",
    koPath: "/ko/resources/",
    jaPath: "/ja/resources/",
    esPath: "/es/resources/",
    ptPath: "/pt/resources/",
    ruPath: "/ru/resources/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: `${SITE_URL}/images/agm-hero-production-1600.webp`,
      width: 1600,
      height: 1000
    }
  });
}

function articleLocalePaths(kind: BlogArticleKind) {
  const slug = articleDefinitions[kind][0];
  return {
    enPath: `/blog/${slug}/`,
    zhPath: `/zh/blog/${slug}/`,
    viPath: `/vi/blog/${slug}/`,
    koPath: `/ko/blog/${slug}/`,
    jaPath: `/ja/blog/${slug}/`,
    esPath: `/es/blog/${slug}/`,
    ptPath: `/pt/blog/${slug}/`,
    ruPath: `/ru/blog/${slug}/`
  };
}

export function buildSecondaryArticleMetadata(
  lang: Exclude<SiteLocale, Lang>,
  kind: BlogArticleKind
): Metadata {
  const current = buildSecondaryArticleSeo(lang, kind);
  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: current.keywords,
    path: current.path,
    ...articleLocalePaths(kind),
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: `${SITE_URL}/images/agm-hero-production-1600.webp`,
      width: 1600,
      height: 1000
    }
  });
}

export function buildSampleRequestMetadata(lang: SiteLocale): Metadata {
  const current = sampleRequestSeo[lang];

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/request-agm-separator-sample/",
    zhPath: "/zh/request-agm-separator-sample/",
    viPath: "/vi/request-agm-separator-sample/",
    koPath: "/ko/request-agm-separator-sample/",
    jaPath: "/ja/request-agm-separator-sample/",
    esPath: "/es/request-agm-separator-sample/",
    ptPath: "/pt/request-agm-separator-sample/",
    ruPath: "/ru/request-agm-separator-sample/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: `${SITE_URL}/images/agm-hero-production-1600.webp`,
      width: 1600,
      height: 1000
    }
  });
}

export function buildAgmSeparatorMetadata(lang: SiteLocale): Metadata {
  const current = seoContent("agmSeparator", lang, agmSeparatorSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/products/agm-separator/",
    zhPath: "/zh/products/agm-separator/",
    viPath: "/vi/products/agm-separator/",
    koPath: "/ko/products/agm-separator/",
    jaPath: "/ja/products/agm-separator/",
    esPath: "/es/products/agm-separator/",
    ptPath: "/pt/products/agm-separator/",
    ruPath: "/ru/products/agm-separator/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.productName
  });
}

export function buildAgmSeparatorRollsMetadata(lang: SiteLocale): Metadata {
  const current = seoContent("agmSeparatorRolls", lang, agmSeparatorRollsSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/products/agm-separator-rolls/",
    zhPath: "/zh/products/agm-separator-rolls/",
    viPath: "/vi/products/agm-separator-rolls/",
    koPath: "/ko/products/agm-separator-rolls/",
    jaPath: "/ja/products/agm-separator-rolls/",
    esPath: "/es/products/agm-separator-rolls/",
    ptPath: "/pt/products/agm-separator-rolls/",
    ruPath: "/ru/products/agm-separator-rolls/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.productName
  });
}

export function buildAgmSeparatorSheetsMetadata(lang: SiteLocale): Metadata {
  const current = seoContent("agmSeparatorSheets", lang, agmSeparatorSheetsSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/products/agm-separator-sheets/",
    zhPath: "/zh/products/agm-separator-sheets/",
    viPath: "/vi/products/agm-separator-sheets/",
    koPath: "/ko/products/agm-separator-sheets/",
    jaPath: "/ja/products/agm-separator-sheets/",
    esPath: "/es/products/agm-separator-sheets/",
    ptPath: "/pt/products/agm-separator-sheets/",
    ruPath: "/ru/products/agm-separator-sheets/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.productName,
    image: {
      url: SHEETS_PREVIEW_IMAGE,
      width: 900,
      height: 675
    }
  });
}

export function buildGlassFiberThermalInsulationPaperMetadata(
  lang: SiteLocale
): Metadata {
  const current = seoContent(
    "glassFiberThermalInsulationPaper",
    lang,
    thermalInsulationPaperSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/products/glass-fiber-thermal-insulation-paper/",
    zhPath: "/zh/products/glass-fiber-thermal-insulation-paper/",
    viPath: "/vi/products/glass-fiber-thermal-insulation-paper/",
    koPath: "/ko/products/glass-fiber-thermal-insulation-paper/",
    jaPath: "/ja/products/glass-fiber-thermal-insulation-paper/",
    esPath: "/es/products/glass-fiber-thermal-insulation-paper/",
    ptPath: "/pt/products/glass-fiber-thermal-insulation-paper/",
    ruPath: "/ru/products/glass-fiber-thermal-insulation-paper/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.productName,
    image: {
      url: THERMAL_INSULATION_PAPER_IMAGE,
      width: 1600,
      height: 1200
    }
  });
}

export function buildAgmSeparatorTestingMetadata(lang: SiteLocale): Metadata {
  const current = seoContent("agmSeparatorTesting", lang, agmSeparatorTestingSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/quality-control/agm-separator-testing/",
    zhPath: "/zh/quality-control/agm-separator-testing/",
    viPath: "/vi/quality-control/agm-separator-testing/",
    koPath: "/ko/quality-control/agm-separator-testing/",
    jaPath: "/ja/quality-control/agm-separator-testing/",
    esPath: "/es/quality-control/agm-separator-testing/",
    ptPath: "/pt/quality-control/agm-separator-testing/",
    ruPath: "/ru/quality-control/agm-separator-testing/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 900
    }
  });
}

export function buildAgmSeparatorVrlaApplicationMetadata(
  lang: ApplicationLocale
): Metadata {
  const current = seoContent(
    "agmSeparatorVrlaApplication",
    lang,
    agmSeparatorVrlaApplicationSeo[lang]
  );

  return buildApplicationDetailMetadata(
    lang,
    current,
    "/applications/agm-separator-for-vrla-battery/",
    "/zh/applications/agm-separator-for-vrla-battery/",
    "/vi/applications/agm-separator-for-vrla-battery/",
    "/ko/applications/agm-separator-for-vrla-battery/",
    "/ja/applications/agm-separator-for-vrla-battery/",
    "/es/applications/agm-separator-for-vrla-battery/",
    "/pt/applications/agm-separator-for-vrla-battery/",
    "/ru/applications/agm-separator-for-vrla-battery/"
  );
}

function buildApplicationDetailMetadata(
  lang: SiteLocale,
  current: ApplicationDetailSeo,
  enPath: string,
  zhPath: string,
  viPath?: string,
  koPath?: string,
  jaPath?: string,
  esPath?: string,
  ptPath?: string,
  ruPath?: string
): Metadata {
  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath,
    zhPath,
    viPath,
    koPath,
    jaPath,
    esPath,
    ptPath,
    ruPath,
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: current.image,
      width: 1200,
      height: 900
    }
  });
}

export function buildAgmSeparatorUpsApplicationMetadata(
  lang: ApplicationLocale
): Metadata {
  return buildApplicationDetailMetadata(
    lang,
    seoContent(
      "agmSeparatorUpsApplication",
      lang,
      agmSeparatorUpsApplicationSeo[lang]
    ),
    "/applications/agm-separator-for-ups-battery/",
    "/zh/applications/agm-separator-for-ups-battery/",
    "/vi/applications/agm-separator-for-ups-battery/",
    "/ko/applications/agm-separator-for-ups-battery/",
    "/ja/applications/agm-separator-for-ups-battery/",
    "/es/applications/agm-separator-for-ups-battery/",
    "/pt/applications/agm-separator-for-ups-battery/",
    "/ru/applications/agm-separator-for-ups-battery/"
  );
}

export function buildAgmSeparatorMotorcycleApplicationMetadata(
  lang: ApplicationLocale
): Metadata {
  return buildApplicationDetailMetadata(
    lang,
    seoContent(
      "agmSeparatorMotorcycleApplication",
      lang,
      agmSeparatorMotorcycleApplicationSeo[lang]
    ),
    "/applications/agm-separator-for-motorcycle-battery/",
    "/zh/applications/agm-separator-for-motorcycle-battery/",
    "/vi/applications/agm-separator-for-motorcycle-battery/",
    "/ko/applications/agm-separator-for-motorcycle-battery/",
    "/ja/applications/agm-separator-for-motorcycle-battery/",
    "/es/applications/agm-separator-for-motorcycle-battery/",
    "/pt/applications/agm-separator-for-motorcycle-battery/",
    "/ru/applications/agm-separator-for-motorcycle-battery/"
  );
}

export function buildAgmSeparatorEnergyStorageApplicationMetadata(
  lang: ApplicationLocale
): Metadata {
  return buildApplicationDetailMetadata(
    lang,
    seoContent(
      "agmSeparatorEnergyStorageApplication",
      lang,
      agmSeparatorEnergyStorageApplicationSeo[lang]
    ),
    "/applications/agm-separator-for-energy-storage-battery/",
    "/zh/applications/agm-separator-for-energy-storage-battery/",
    "/vi/applications/agm-separator-for-energy-storage-battery/",
    "/ko/applications/agm-separator-for-energy-storage-battery/",
    "/ja/applications/agm-separator-for-energy-storage-battery/",
    "/es/applications/agm-separator-for-energy-storage-battery/",
    "/pt/applications/agm-separator-for-energy-storage-battery/",
    "/ru/applications/agm-separator-for-energy-storage-battery/"
  );
}

export function buildWhatIsAgmSeparatorMetadata(lang: Lang): Metadata {
  const current = seoContent("whatIsAgmSeparator", lang, whatIsAgmSeparatorSeo[lang]);

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/what-is-agm-separator/",
    zhPath: "/zh/blog/what-is-agm-separator/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: PREVIEW_IMAGE,
      width: 900,
      height: 675
    }
  });
}

export function buildKeyTechnicalParametersMetadata(lang: Lang): Metadata {
  const current = seoContent(
    "keyTechnicalParameters",
    lang,
    keyTechnicalParametersSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/key-technical-parameters-of-agm-separator/",
    zhPath: "/zh/blog/key-technical-parameters-of-agm-separator/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 900
    }
  });
}

export function buildHowToChooseAgmSeparatorMetadata(lang: Lang): Metadata {
  const current = seoContent(
    "howToChooseAgmSeparator",
    lang,
    howToChooseAgmSeparatorSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/how-to-choose-agm-separator/",
    zhPath: "/zh/blog/how-to-choose-agm-separator/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: PREVIEW_IMAGE,
      width: 900,
      height: 675
    }
  });
}

export function buildAgmSeparatorManufacturingQualityDeliveryMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmSeparatorManufacturingQualityDelivery",
    lang,
    agmSeparatorManufacturingQualityDeliverySeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/agm-separator-manufacturing-quality-delivery/",
    zhPath: "/zh/blog/agm-separator-manufacturing-quality-delivery/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: `${SITE_URL}/images/agm-hero-production-1600.webp`,
      width: 1600,
      height: 1000
    }
  });
}

export function buildAgmSeparatorPerformanceConsistencyMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmSeparatorPerformanceConsistency",
    lang,
    agmSeparatorPerformanceConsistencySeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/agm-separator-performance-consistency/",
    zhPath: "/zh/blog/agm-separator-performance-consistency/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 900
    }
  });
}

export function buildAgmSeparatorExportSupplyReadinessMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmSeparatorExportSupplyReadiness",
    lang,
    agmSeparatorExportSupplyReadinessSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/agm-separator-export-supply-readiness/",
    zhPath: "/zh/blog/agm-separator-export-supply-readiness/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 900
    }
  });
}

export function buildUpsVrlaTechnologySelectionMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "upsVrlaTechnologySelection",
    lang,
    upsVrlaTechnologySelectionSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/why-ups-projects-still-use-vrla-batteries/",
    zhPath: "/zh/blog/why-ups-projects-still-use-vrla-batteries/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: UPS_APPLICATION_IMAGE,
      width: 900,
      height: 675
    }
  });
}

export function buildDataCenterBackupPowerAgmSeparatorMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "dataCenterBackupPowerAgmSeparator",
    lang,
    dataCenterBackupPowerAgmSeparatorSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    ...articleLocalePaths("dataCenterBackupPowerAgmSeparator"),
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: UPS_APPLICATION_IMAGE,
      width: 1200,
      height: 900
    }
  });
}

export function buildEarlyChinaLeadAcidBatteryManufacturingMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "earlyChinaLeadAcidBatteryManufacturing",
    lang,
    earlyChinaLeadAcidBatteryManufacturingSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    ...articleLocalePaths("earlyChinaLeadAcidBatteryManufacturing"),
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: `${SITE_URL}/images/agm-hero-production-1600.webp`,
      width: 1600,
      height: 1000
    }
  });
}

export function buildAgmSeparatorPressureRetentionMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmSeparatorPressureRetention",
    lang,
    agmSeparatorPressureRetentionSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    ...articleLocalePaths("agmSeparatorPressureRetention"),
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 800
    }
  });
}

export function buildAgmSeparatorBatchProcessControlMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmSeparatorBatchProcessControl",
    lang,
    agmSeparatorBatchProcessControlSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    ...articleLocalePaths("agmSeparatorBatchProcessControl"),
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: QUALITY_PREVIEW_IMAGE,
      width: 1200,
      height: 800
    }
  });
}

export function buildAgmGlassFiberVsPvcSeparatorMetadata(
  lang: Lang
): Metadata {
  const current = seoContent(
    "agmGlassFiberVsPvcSeparator",
    lang,
    agmGlassFiberVsPvcSeparatorSeo[lang]
  );

  return buildMetadata({
    title: current.title,
    description: current.description,
    keywords: [...current.keywords],
    path: current.path,
    enPath: "/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    zhPath: "/zh/blog/agm-glass-fiber-vs-pvc-battery-separator/",
    locale: current.locale,
    siteName: current.siteName,
    imageAlt: current.pageName,
    image: {
      url: AGM_ROLL_END_FACE_IMAGE,
      width: 900,
      height: 675
    }
  });
}

function buildMetadata({
  title,
  description,
  keywords,
  path,
  enPath,
  zhPath,
  viPath,
  koPath,
  jaPath,
  esPath,
  ptPath,
  ruPath,
  locale,
  siteName,
  imageAlt,
  image = {
    url: PREVIEW_IMAGE,
    width: 900,
    height: 675
  }
}: {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  enPath: string;
  zhPath: string;
  viPath?: string;
  koPath?: string;
  jaPath?: string;
  esPath?: string;
  ptPath?: string;
  ruPath?: string;
  locale: string;
  siteName: string;
  imageAlt: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
      languages: {
        en: enPath,
        "zh-CN": zhPath,
        ...(viPath ? { "vi-VN": viPath } : {}),
        ...(koPath ? { "ko-KR": koPath } : {}),
        ...(jaPath ? { "ja-JP": jaPath } : {}),
        ...(esPath ? { es: esPath } : {}),
        ...(ptPath ? { "pt-BR": ptPath } : {}),
        ...(ruPath ? { "ru-RU": ruPath } : {}),
        "x-default": enPath
      }
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      title,
      description,
      siteName,
      locale,
      images: [
        {
          url: image.url,
          width: image.width,
          height: image.height,
          alt: imageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url]
    }
  };
}

export function StructuredData({ lang }: { lang: SiteLocale }) {
  const current = seoContent("home", lang, homeSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: current.siteName,
        alternateName: current.alternateSiteName,
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
        image: PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      {
        "@type": "VideoObject",
        "@id": `${url}#factory-overview-video`,
        name:
          lang === "zh"
            ? "1 分钟了解维京 AGM 隔板生产能力"
            : lang === "vi"
              ? "Tổng quan 1 phút về nhà máy tấm ngăn AGM Viking"
              : lang === "ko"
                ? "1분 만에 보는 Viking AGM 분리막 생산"
                : lang === "ja"
                  ? "1分で見るViking AGMセパレーター生産"
                  : lang === "es"
                    ? "Conozca la producción de separadores Viking AGM en 1 minuto"
                    : lang === "pt"
                      ? "Conheça a produção de separadores Viking AGM em 1 minuto"
                      : lang === "ru"
                        ? "Производство AGM-сепараторов Viking за 1 минуту"
                        : "Watch the 1-minute Viking AGM factory overview",
        description:
          lang === "zh"
            ? "湖北维京 AGM 隔板生产、卷材处理、质量检测和包装出运现场宣传片。"
            : lang === "vi"
              ? "Video một phút giới thiệu sản xuất tấm ngăn AGM, xử lý cuộn, kiểm soát chất lượng và đóng gói tại Viking AGM."
              : lang === "ko"
                ? "Viking AGM의 분리막 생산, 롤 처리, 품질 검사와 포장 현장을 소개하는 1분 영상입니다."
                : lang === "ja"
                  ? "Viking AGMのセパレーター生産、ロール加工、品質検査、梱包現場を紹介する1分動画です。"
                  : lang === "es"
                    ? "Video de un minuto sobre producción, manejo de rollos, control de calidad y embalaje de separadores Viking AGM."
                    : lang === "pt"
                      ? "Vídeo de um minuto sobre produção, manuseio de rolos, controle de qualidade e embalagem de separadores Viking AGM."
                      : lang === "ru"
                        ? "Минутный обзор производства, обработки рулонов, контроля качества и упаковки AGM-сепараторов Viking."
                        : "A one-minute overview of Viking AGM separator production, roll handling, quality control and packing scenes.",
        thumbnailUrl: [HOME_VIDEO_POSTER],
        uploadDate: "2026-07-01T00:00:00+08:00",
        duration: "PT1M3S",
        contentUrl: HOME_VIDEO_URL,
        embedUrl: url,
        inLanguage: current.language,
        publisher: {
          "@id": `${SITE_URL}/#organization`
        }
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function SampleRequestStructuredData({ lang }: { lang: SiteLocale }) {
  const current = sampleRequestSeo[lang];
  const url = `${SITE_URL}${current.path}`;
  const homePath = localeHomePaths[lang];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/agm-hero-production-1600.webp`,
          width: 1600,
          height: 1000
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#sample-service`,
        name: current.pageName,
        description: current.serviceDescription,
        serviceType: "AGM separator sample and specification review",
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: sampleRequestFaq[lang].map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: (current.breadcrumbs as readonly string[]).map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item: index === 0 ? `${SITE_URL}${homePath}` : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorStructuredData({ lang }: { lang: SiteLocale }) {
  const current = seoContent("agmSeparator", lang, agmSeparatorSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = localeHomePaths[lang];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.productName,
        description: current.serviceDescription,
        serviceType: "AGM separator manufacturing",
        image: PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: (current.breadcrumbs as readonly string[]).map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#products`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorRollsStructuredData({ lang }: { lang: SiteLocale }) {
  const current = seoContent("agmSeparatorRolls", lang, agmSeparatorRollsSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = localeHomePaths[lang];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.productName,
        description: current.serviceDescription,
        serviceType: "AGM separator roll supply",
        image: PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#products`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorSheetsStructuredData({ lang }: { lang: SiteLocale }) {
  const current = seoContent("agmSeparatorSheets", lang, agmSeparatorSheetsSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = localeHomePaths[lang];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: SHEETS_PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.productName,
        description: current.serviceDescription,
        serviceType: "AGM separator sheet supply",
        image: SHEETS_PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#products`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function GlassFiberThermalInsulationPaperStructuredData({
  lang
}: {
  lang: SiteLocale;
}) {
  const current = seoContent(
    "glassFiberThermalInsulationPaper",
    lang,
    thermalInsulationPaperSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = localeHomePaths[lang];
  const faq = thermalInsulationPaperLeadCopy[lang].faq as Array<
    readonly [string, string]
  >;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: THERMAL_INSULATION_PAPER_IMAGE,
          width: 1600,
          height: 1200
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.productName,
        description: current.serviceDescription,
        serviceType: "Glass fiber thermal insulation paper supply",
        image: THERMAL_INSULATION_PAPER_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: (current.breadcrumbs as string[]).map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#products`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorTestingStructuredData({ lang }: { lang: SiteLocale }) {
  const current = seoContent("agmSeparatorTesting", lang, agmSeparatorTestingSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = localeHomePaths[lang];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.pageName,
        description: current.serviceDescription,
        serviceType: "AGM separator testing and quality control",
        image: QUALITY_PREVIEW_IMAGE,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#quality`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorVrlaApplicationStructuredData({
  lang
}: {
  lang: ApplicationLocale;
}) {
  return (
    <ApplicationDetailStructuredData
      lang={lang}
      current={seoContent(
        "agmSeparatorVrlaApplication",
        lang,
        agmSeparatorVrlaApplicationSeo[lang]
      )}
    />
  );
}

function ApplicationDetailStructuredData({
  lang,
  current
}: {
  lang: SiteLocale;
  current: ApplicationDetailSeo;
}) {
  const url = `${SITE_URL}${current.path}`;
  const homePath = localeHomePaths[lang];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: current.image,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: current.pageName,
        description: current.serviceDescription,
        serviceType: current.serviceType,
        image: current.image,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: "Worldwide",
        url,
        inLanguage: current.language
      },
      faqPageData(url, lang),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${homePath}#applications`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorUpsApplicationStructuredData({
  lang
}: {
  lang: ApplicationLocale;
}) {
  return (
    <ApplicationDetailStructuredData
      lang={lang}
      current={seoContent(
        "agmSeparatorUpsApplication",
        lang,
        agmSeparatorUpsApplicationSeo[lang]
      )}
    />
  );
}

export function AgmSeparatorMotorcycleApplicationStructuredData({
  lang
}: {
  lang: ApplicationLocale;
}) {
  return (
    <ApplicationDetailStructuredData
      lang={lang}
      current={seoContent(
        "agmSeparatorMotorcycleApplication",
        lang,
        agmSeparatorMotorcycleApplicationSeo[lang]
      )}
    />
  );
}

export function AgmSeparatorEnergyStorageApplicationStructuredData({
  lang
}: {
  lang: ApplicationLocale;
}) {
  return (
    <ApplicationDetailStructuredData
      lang={lang}
      current={seoContent(
        "agmSeparatorEnergyStorageApplication",
        lang,
        agmSeparatorEnergyStorageApplicationSeo[lang]
      )}
    />
  );
}

export function WhatIsAgmSeparatorStructuredData({ lang }: { lang: Lang }) {
  const current = seoContent("whatIsAgmSeparator", lang, whatIsAgmSeparatorSeo[lang]);
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: PREVIEW_IMAGE,
        url,
        mainEntityOfPage: {
          "@id": `${url}#webpage`
        },
        author: {
          "@id": `${SITE_URL}/#organization`
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        about: [
          "AGM separator",
          "AGM battery separator",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function KeyTechnicalParametersStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "keyTechnicalParameters",
    lang,
    keyTechnicalParametersSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: QUALITY_PREVIEW_IMAGE,
        url,
        mainEntityOfPage: {
          "@id": `${url}#webpage`
        },
        author: {
          "@id": `${SITE_URL}/#organization`
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        about: [
          "AGM separator technical parameters",
          "AGM separator thickness",
          "AGM separator electrical resistance",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function HowToChooseAgmSeparatorStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "howToChooseAgmSeparator",
    lang,
    howToChooseAgmSeparatorSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: PREVIEW_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: PREVIEW_IMAGE,
        url,
        mainEntityOfPage: {
          "@id": `${url}#webpage`
        },
        author: {
          "@id": `${SITE_URL}/#organization`
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        about: [
          "AGM separator sourcing",
          "custom AGM separator",
          "AGM separator supplier",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorManufacturingQualityDeliveryStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmSeparatorManufacturingQualityDelivery",
    lang,
    agmSeparatorManufacturingQualityDeliverySeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const image = `${SITE_URL}/images/agm-hero-production-1600.webp`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image,
          width: 1600,
          height: 1000
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image,
        url,
        mainEntityOfPage: {
          "@id": `${url}#webpage`
        },
        author: {
          "@id": `${SITE_URL}/#organization`
        },
        publisher: {
          "@id": `${SITE_URL}/#organization`
        },
        about: [
          "AGM separator manufacturing",
          "AGM separator quality control",
          "AGM separator delivery",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorPerformanceConsistencyStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmSeparatorPerformanceConsistency",
    lang,
    agmSeparatorPerformanceConsistencySeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: QUALITY_PREVIEW_IMAGE,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "AGM separator selection",
          "AGM separator batch consistency",
          "VRLA lead-acid battery assembly"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorExportSupplyReadinessStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmSeparatorExportSupplyReadiness",
    lang,
    agmSeparatorExportSupplyReadinessSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: QUALITY_PREVIEW_IMAGE,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "lead-acid battery exports",
          "AGM separator supply",
          "AGM separator batch consistency",
          "VRLA lead-acid battery"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function UpsVrlaTechnologySelectionStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "upsVrlaTechnologySelection",
    lang,
    upsVrlaTechnologySelectionSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: UPS_APPLICATION_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: UPS_APPLICATION_IMAGE,
        url,
        datePublished: "2026-07-23",
        dateModified: "2026-07-23",
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "UPS battery technology selection",
          "VRLA lead-acid batteries",
          "AGM separator for UPS batteries",
          "AGM separator specification matching"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function DataCenterBackupPowerAgmSeparatorStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "dataCenterBackupPowerAgmSeparator",
    lang,
    dataCenterBackupPowerAgmSeparatorSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: UPS_APPLICATION_IMAGE,
          width: 1200,
          height: 900
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: UPS_APPLICATION_IMAGE,
        url,
        datePublished: "2026-08-07",
        dateModified: "2026-08-07",
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "data center backup power",
          "UPS VRLA batteries",
          "telecom backup power",
          "AGM separator specification matching"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function EarlyChinaLeadAcidBatteryManufacturingStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "earlyChinaLeadAcidBatteryManufacturing",
    lang,
    earlyChinaLeadAcidBatteryManufacturingSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const image = `${SITE_URL}/images/agm-hero-production-1600.webp`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image,
          width: 1600,
          height: 1000
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image,
        url,
        datePublished: "2026-08-11",
        dateModified: "2026-08-11",
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "history of lead-acid battery manufacturing in China",
          "battery separator material history",
          "AGM separator manufacturing",
          "VRLA lead-acid batteries"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorPressureRetentionStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmSeparatorPressureRetention",
    lang,
    agmSeparatorPressureRetentionSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 800
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: QUALITY_PREVIEW_IMAGE,
        url,
        datePublished: "2026-08-12",
        dateModified: "2026-08-12",
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "AGM separator pressure retention",
          "compression recovery after acid filling",
          "VRLA battery separator cycling test",
          "AGM separator test pressure"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmSeparatorBatchProcessControlStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmSeparatorBatchProcessControl",
    lang,
    agmSeparatorBatchProcessControlSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: QUALITY_PREVIEW_IMAGE,
          width: 1200,
          height: 800
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: QUALITY_PREVIEW_IMAGE,
        url,
        datePublished: "2026-08-12",
        dateModified: "2026-08-12",
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "AGM separator batch consistency",
          "AGM separator process control",
          "sampling and statistical process review",
          "VRLA battery supplier audit"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function AgmGlassFiberVsPvcSeparatorStructuredData({
  lang
}: {
  lang: Lang;
}) {
  const current = seoContent(
    "agmGlassFiberVsPvcSeparator",
    lang,
    agmGlassFiberVsPvcSeparatorSeo[lang]
  );
  const url = `${SITE_URL}${current.path}`;
  const homePath = lang === "zh" ? "/zh/" : "/";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.title,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: AGM_ROLL_END_FACE_IMAGE,
          width: 900,
          height: 675
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        name: current.pageName,
        description: current.articleDescription,
        image: AGM_ROLL_END_FACE_IMAGE,
        url,
        datePublished: "2026-07-26",
        dateModified: "2026-07-26",
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [
          "AGM glass fiber battery separators",
          "microporous PVC battery separators",
          "VRLA lead-acid batteries",
          "flooded lead-acid batteries",
          "battery separator selection"
        ],
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${homePath}`
              : index === 1
                ? `${SITE_URL}${getResourcesPath(lang)}`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function ResourcesHubStructuredData({ lang }: { lang: SiteLocale }) {
  const current =
    lang === "en" || lang === "zh"
      ? resourcesHubSeo[lang]
      : secondaryResourcesHubSeo(lang);
  const url = `${SITE_URL}${current.path}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: current.pageName,
        description: current.description,
        inLanguage: current.language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`
        },
        mainEntity: {
          "@id": `${url}#resources`
        }
      },
      {
        "@type": "ItemList",
        "@id": `${url}#resources`,
        name: current.pageName,
        numberOfItems: resourceArticles.length,
        itemListElement: resourceArticles.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}${localizeHref(article.href, lang)}`,
          name: localizeText(article.title, lang)
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: current.breadcrumbs.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${localeHomePaths[lang]}`
              : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

export function SecondaryArticleStructuredData({
  lang,
  kind
}: {
  lang: Exclude<SiteLocale, Lang>;
  kind: BlogArticleKind;
}) {
  const current = buildSecondaryArticleSeo(lang, kind);
  const url = `${SITE_URL}${current.path}`;
  const published = articleDefinitions[kind][2];
  const modified = articleDefinitions[kind][3] ?? "2026-08-05";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationData(lang, current.description),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.pageName,
        description: current.description,
        inLanguage: current.language,
        isPartOf: { "@id": `${SITE_URL}/#website` }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        headline: current.pageName,
        description: current.articleDescription,
        url,
        datePublished: published,
        dateModified: modified,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: current.language
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: (current.breadcrumbs as string[]).map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          item:
            index === 0
              ? `${SITE_URL}${localeHomePaths[lang]}`
              : index === 1
                ? `${SITE_URL}/${lang}/resources/`
                : url
        }))
      }
    ]
  };

  return <JsonLd data={data} />;
}

function organizationData(lang: SiteLocale, description: string) {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: lang === "zh" ? "湖北维京AGM" : "Viking AGM",
    legalName: "Hubei Viking Technology Co., Ltd.",
    alternateName:
      lang === "zh"
        ? ["湖北维京科技有限公司", "维京AGM", "Viking AGM"]
        : lang === "vi"
          ? ["Hubei Viking Technology Co., Ltd.", "Viking AGM Việt Nam", "湖北维京AGM"]
          : lang === "ko"
            ? ["Hubei Viking Technology Co., Ltd.", "Viking AGM Korea", "湖北维京AGM"]
            : lang === "ja"
              ? ["Hubei Viking Technology Co., Ltd.", "Viking AGM Japan", "湖北維京AGM"]
              : ["Hubei Viking Technology Co., Ltd.", "Hubei Viking AGM", "湖北维京AGM"],
    url: SITE_URL,
    logo: `${SITE_URL}/images/banner-logo-header.webp`,
    sameAs: [socialProfileUrls.tiktok, socialProfileUrls.linkedin],
    email: "vikingsales@vikingagm.com",
    telephone: "+86 18171518528",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86 18171518528",
      email: "vikingsales@vikingagm.com",
      contactType: "sales",
      availableLanguage: [
        "en",
        "zh-CN",
        "vi-VN",
        "ko-KR",
        "ja-JP",
        "es",
        "pt-BR",
        "ru-RU"
      ]
    },
    foundingDate: "2015-12",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ezhou",
      addressRegion: "Hubei",
      addressCountry: "CN"
    },
    description
  };
}

function faqPageData(url: string, lang: SiteLocale) {
  const copy = productFaqCopy[lang];

  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: copy.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
