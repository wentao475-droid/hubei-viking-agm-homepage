"use client";

import Image from "next/image";
import { useState } from "react";
import { productContent } from "./cms-content";
import { InquiryForm } from "./InquiryForm";
import type { Lang, SiteLocale } from "./locales";
import { productFaqCopy } from "./seo-faq";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";
import {
  thermalInsulationPaperContent,
  thermalInsulationPaperLeadCopy
} from "../content/thermal-insulation-paper.mjs";

export type ProductPageKind =
  | "agmSeparator"
  | "agmSeparatorRolls"
  | "agmSeparatorSheets"
  | "glassFiberThermalInsulationPaper"
  | "agmSeparatorTesting"
  | "agmSeparatorVrlaApplication"
  | "agmSeparatorUpsApplication"
  | "agmSeparatorMotorcycleApplication"
  | "agmSeparatorEnergyStorageApplication";

type IconProps = { size?: number; className?: string };
type LinkItem = [string, string];
type TextPair = [string, string];
type ImageCard = [string, string, string, string, number, number];

type ProductContent = {
  homePath: string;
  languagePath: string;
  quote: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
    proof: string[];
    image: { src: string; alt: string; width: number; height: number };
  };
  overview: { eyebrow: string; title: string; paragraphs: string[] };
  parameters: { eyebrow: string; title: string; text: string; items: TextPair[] };
  forms: { eyebrow: string; title: string; items: ImageCard[] };
  applications: { eyebrow: string; title: string; items: string[] };
  quality: { eyebrow: string; title: string; text: string; cards: TextPair[] };
  related: { eyebrow: string; title: string; items: LinkItem[] };
  inquiry: {
    eyebrow: string;
    title: string;
    text: string;
    checklist: string[];
    placeholder: string;
    submit: string;
    submitting: string;
    required: string;
    success: string;
    failure: string;
    emailFallback: string;
  };
  footer: { description: string; wechat: string; mobile: string };
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const icpLicense = process.env.NEXT_PUBLIC_ICP_LICENSE || "鄂ICP备2026033781号";
const contactInfo = {
  phone: "+86 18171518528",
  email: "vikingsales@vikingagm.com"
};

const sharedMessages = {
  en: {
    copied: "Copied",
    copyPhone: "Copy phone number",
    copyEmail: "Copy email address",
    openWechat: "View WeChat QR code",
    backToTop: "Back to top",
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
      interestedProduct: "AGM separator rolls, sheets, or not sure yet"
    }
  },
  zh: {
    copied: "已复制",
    copyPhone: "复制电话号码",
    copyEmail: "复制邮箱地址",
    openWechat: "查看微信二维码",
    backToTop: "返回顶部",
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
      interestedProduct: "AGM 隔板卷材、片材或暂不确定"
    }
  },
  vi: {
    copied: "Đã sao chép",
    copyPhone: "Sao chép số điện thoại",
    copyEmail: "Sao chép email",
    openWechat: "Xem mã QR WeChat",
    backToTop: "Về đầu trang",
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
      interestedProduct: "Tấm ngăn AGM dạng cuộn, dạng tấm hoặc chưa xác định"
    }
  },
  ko: {
    copied: "복사됨",
    copyPhone: "전화번호 복사",
    copyEmail: "이메일 주소 복사",
    openWechat: "WeChat QR 코드 보기",
    backToTop: "맨 위로",
    fields: {
      name: "이름",
      contact: "이메일 / WhatsApp / 전화번호",
      company: "회사명",
      interestedProduct: "관심 제품",
      message: "추가 요청사항"
    },
    placeholders: {
      name: "이름을 입력해 주세요",
      contact: "이메일, WhatsApp 또는 전화번호",
      company: "회사명",
      interestedProduct: "AGM 분리막 롤, 시트 또는 미정"
    }
  },
  ja: {
    copied: "コピーしました",
    copyPhone: "電話番号をコピー",
    copyEmail: "メールアドレスをコピー",
    openWechat: "WeChat QRコードを表示",
    backToTop: "ページ上部へ",
    fields: {
      name: "お名前",
      contact: "メール / WhatsApp / 電話番号",
      company: "会社名",
      interestedProduct: "ご希望の製品",
      message: "追加情報"
    },
    placeholders: {
      name: "お名前を入力してください",
      contact: "メール、WhatsAppまたは電話番号",
      company: "会社名",
      interestedProduct: "AGMセパレーターのロール、シート、または未定"
    }
  },
  es: {
    copied: "Copiado",
    copyPhone: "Copiar número de teléfono",
    copyEmail: "Copiar correo electrónico",
    openWechat: "Ver código QR de WeChat",
    backToTop: "Volver arriba",
    fields: {
      name: "Nombre",
      contact: "Correo / WhatsApp / Teléfono",
      company: "Empresa",
      interestedProduct: "Producto de interés",
      message: "Información adicional"
    },
    placeholders: {
      name: "Nombre completo",
      contact: "Correo, WhatsApp o teléfono",
      company: "Nombre de la empresa",
      interestedProduct: "Separador AGM en rollo, lámina o por definir"
    }
  },
  pt: {
    copied: "Copiado",
    copyPhone: "Copiar número de telefone",
    copyEmail: "Copiar e-mail",
    openWechat: "Ver QR code do WeChat",
    backToTop: "Voltar ao topo",
    fields: {
      name: "Nome",
      contact: "E-mail / WhatsApp / Telefone",
      company: "Empresa",
      interestedProduct: "Produto de interesse",
      message: "Informações adicionais"
    },
    placeholders: {
      name: "Nome completo",
      contact: "E-mail, WhatsApp ou telefone",
      company: "Nome da empresa",
      interestedProduct: "Separador AGM em rolo, folha ou a definir"
    }
  },
  ru: {
    copied: "Скопировано",
    copyPhone: "Скопировать номер телефона",
    copyEmail: "Скопировать адрес электронной почты",
    openWechat: "Показать QR-код WeChat",
    backToTop: "Наверх",
    fields: {
      name: "Имя",
      contact: "Email / WhatsApp / Телефон",
      company: "Компания",
      interestedProduct: "Интересующий продукт",
      message: "Дополнительная информация"
    },
    placeholders: {
      name: "Ваше имя",
      contact: "Email, WhatsApp или телефон",
      company: "Название компании",
      interestedProduct: "AGM-сепаратор в рулонах, листах или пока не определено"
    }
  }
} as const;

const commonRelated = {
  en: [
    ["AGM Separator Product", "/products/agm-separator/"],
    ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
    ["AGM Separator Sheets", "/products/agm-separator-sheets/"],
    ["AGM Separator Testing", "/quality-control/agm-separator-testing/"],
    ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"]
  ] as LinkItem[],
  zh: [
    ["AGM 隔板产品", "/zh/products/agm-separator/"],
    ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
    ["AGM 隔板片材", "/zh/products/agm-separator-sheets/"],
    ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
  ] as LinkItem[],
  vi: [
    ["Sản phẩm tấm ngăn AGM", "/vi/products/agm-separator/"],
    ["Tấm ngăn AGM dạng cuộn", "/vi/products/agm-separator-rolls/"],
    ["Tấm ngăn AGM dạng tấm", "/vi/products/agm-separator-sheets/"],
    ["Kiểm tra tấm ngăn AGM", "/vi/quality-control/agm-separator-testing/"],
    ["Ứng dụng ắc quy VRLA", "/vi/applications/agm-separator-for-vrla-battery/"],
    ["Ứng dụng ắc quy UPS", "/vi/applications/agm-separator-for-ups-battery/"],
    [
      "Ứng dụng ắc quy xe máy",
      "/vi/applications/agm-separator-for-motorcycle-battery/"
    ],
    ["Ứng dụng ắc quy lưu trữ năng lượng", "/vi/applications/agm-separator-for-energy-storage-battery/"],
    ["Yêu cầu mẫu", "/vi/request-agm-separator-sample/"]
  ] as LinkItem[],
  ko: [
    ["AGM 분리막 제품", "/ko/products/agm-separator/"],
    ["AGM 분리막 롤", "/ko/products/agm-separator-rolls/"],
    ["AGM 분리막 시트", "/ko/products/agm-separator-sheets/"],
    ["AGM 분리막 시험", "/ko/quality-control/agm-separator-testing/"],
    ["VRLA 배터리 적용", "/ko/applications/agm-separator-for-vrla-battery/"],
    ["UPS 배터리 적용", "/ko/applications/agm-separator-for-ups-battery/"],
    [
      "오토바이 배터리 적용",
      "/ko/applications/agm-separator-for-motorcycle-battery/"
    ],
    ["에너지 저장 배터리 적용", "/ko/applications/agm-separator-for-energy-storage-battery/"],
    ["샘플 및 사양 검토 요청", "/ko/request-agm-separator-sample/"]
  ] as LinkItem[],
  ja: [
    ["AGMセパレーター製品", "/ja/products/agm-separator/"],
    ["AGMセパレーター ロール", "/ja/products/agm-separator-rolls/"],
    ["AGMセパレーター シート", "/ja/products/agm-separator-sheets/"],
    ["AGMセパレーター試験", "/ja/quality-control/agm-separator-testing/"],
    ["VRLAバッテリー用途", "/ja/applications/agm-separator-for-vrla-battery/"],
    ["UPSバッテリー用途", "/ja/applications/agm-separator-for-ups-battery/"],
    [
      "二輪車用バッテリー用途",
      "/ja/applications/agm-separator-for-motorcycle-battery/"
    ],
    ["蓄電用バッテリー用途", "/ja/applications/agm-separator-for-energy-storage-battery/"],
    ["サンプル・仕様確認依頼", "/ja/request-agm-separator-sample/"]
  ] as LinkItem[],
  es: [
    ["Separador AGM", "/es/products/agm-separator/"],
    ["Rollos de separador AGM", "/es/products/agm-separator-rolls/"],
    ["Láminas de separador AGM", "/es/products/agm-separator-sheets/"],
    ["Ensayos de separadores AGM", "/es/quality-control/agm-separator-testing/"],
    ["Aplicaciones de baterías VRLA", "/es/applications/agm-separator-for-vrla-battery/"],
    ["Aplicaciones de baterías UPS", "/es/applications/agm-separator-for-ups-battery/"],
    [
      "Aplicación para baterías de motocicleta",
      "/es/applications/agm-separator-for-motorcycle-battery/"
    ],
    ["Aplicaciones de almacenamiento de energía", "/es/applications/agm-separator-for-energy-storage-battery/"],
    ["Solicitar muestra y revisar especificaciones", "/es/request-agm-separator-sample/"]
  ] as LinkItem[],
  pt: [
    ["Separador AGM", "/pt/products/agm-separator/"],
    ["Rolos de separador AGM", "/pt/products/agm-separator-rolls/"],
    ["Folhas de separador AGM", "/pt/products/agm-separator-sheets/"],
    ["Ensaios de separadores AGM", "/pt/quality-control/agm-separator-testing/"],
    ["Aplicações em baterias VRLA", "/pt/applications/agm-separator-for-vrla-battery/"],
    ["Aplicações em baterias UPS", "/pt/applications/agm-separator-for-ups-battery/"],
    [
      "Aplicação em baterias de motocicletas",
      "/pt/applications/agm-separator-for-motorcycle-battery/"
    ],
    ["Aplicações de armazenamento de energia", "/pt/applications/agm-separator-for-energy-storage-battery/"],
    ["Solicitar amostra e analisar especificações", "/pt/request-agm-separator-sample/"]
  ] as LinkItem[],
  ru: [
    ["AGM-сепаратор", "/ru/products/agm-separator/"],
    ["Рулоны AGM-сепаратора", "/ru/products/agm-separator-rolls/"],
    ["Листы AGM-сепаратора", "/ru/products/agm-separator-sheets/"],
    ["Испытания AGM-сепаратора", "/ru/quality-control/agm-separator-testing/"],
    ["Применение в VRLA-аккумуляторах", "/ru/applications/agm-separator-for-vrla-battery/"],
    ["Применение в аккумуляторах ИБП", "/ru/applications/agm-separator-for-ups-battery/"],
    [
      "Применение в мотоциклетных аккумуляторах",
      "/ru/applications/agm-separator-for-motorcycle-battery/"
    ],
    ["Применение в накопителях энергии", "/ru/applications/agm-separator-for-energy-storage-battery/"],
    ["Запросить образец и проверку характеристик", "/ru/request-agm-separator-sample/"]
  ] as LinkItem[]
};

const leadCaptureCopy = {
  en: {
    heroPrompt:
      "Leave your email or WhatsApp. We will help confirm the right AGM separator specification.",
    formText:
      "Leave your contact information first. Our team will follow up for thickness, width, quantity and application details.",
    checklist: [
      "Name and contact information are enough to start",
      "Our team will help confirm the right specification",
      "Thickness, width and quantity can be discussed later"
    ],
    messagePlaceholder:
      "Optional: battery application, estimated quantity, sample needs or technical questions",
    required: "Please leave your name and contact information before submitting.",
    success:
      "Thank you. We will contact you soon to confirm your AGM separator requirements.",
    emailFallback:
      "Your email client has been opened with the contact details. Please send the email to complete your inquiry.",
    ...productFaqCopy.en
  },
  zh: {
    heroPrompt: "留下微信或手机号，我们会协助确认合适的 AGM 隔板规格。",
    formText:
      "先留下联系方式即可，我们会进一步沟通厚度、宽度、数量和应用需求。",
    checklist: [
      "留下姓名和微信或手机号即可开始沟通",
      "我们会协助确认合适的 AGM 隔板规格",
      "厚度、宽度和数量可以后续沟通"
    ],
    messagePlaceholder: "可选：电池应用、预计数量、样品需求或技术问题",
    required: "请先填写姓名和微信或手机号。",
    success: "感谢您留下联系方式，我们会尽快联系您确认 AGM 隔板需求。",
    emailFallback: "已为您打开邮件客户端并填入联系方式，请发送邮件完成询盘。",
    ...productFaqCopy.zh
  },
  vi: {
    heroPrompt:
      "Để lại email, WhatsApp hoặc số điện thoại. Chúng tôi sẽ hỗ trợ xác nhận quy cách tấm ngăn AGM phù hợp.",
    formText:
      "Hãy để lại thông tin liên hệ trước. Đội ngũ sẽ tiếp tục trao đổi về độ dày, chiều rộng, số lượng và ứng dụng.",
    checklist: [
      "Họ tên và thông tin liên hệ là đủ để bắt đầu",
      "Chúng tôi hỗ trợ xác nhận quy cách phù hợp",
      "Độ dày, chiều rộng và số lượng có thể trao đổi sau"
    ],
    messagePlaceholder:
      "Không bắt buộc: ứng dụng ắc quy, số lượng dự kiến, yêu cầu mẫu hoặc câu hỏi kỹ thuật",
    required: "Vui lòng nhập họ tên và thông tin liên hệ.",
    success:
      "Cảm ơn bạn. Chúng tôi sẽ liên hệ để xác nhận yêu cầu tấm ngăn AGM.",
    emailFallback:
      "Ứng dụng email đã được mở với thông tin liên hệ. Vui lòng gửi email để hoàn tất yêu cầu.",
    ...productFaqCopy.vi
  },
  ko: {
    heroPrompt:
      "이메일, WhatsApp 또는 전화번호를 남겨 주세요. 적합한 AGM 분리막 사양을 함께 검토합니다.",
    formText:
      "연락처를 먼저 남겨 주세요. 두께, 폭, 수량 및 적용 분야를 후속 확인합니다.",
    checklist: [
      "이름과 연락처만으로 시작할 수 있습니다",
      "적합한 사양 검토를 지원합니다",
      "두께, 폭 및 수량은 후속 협의가 가능합니다"
    ],
    messagePlaceholder:
      "선택: 배터리 적용 분야, 예상 수량, 샘플 또는 기술 문의",
    required: "이름과 연락처를 입력해 주세요.",
    success: "감사합니다. AGM 분리막 요구사항 확인을 위해 연락드리겠습니다.",
    emailFallback:
      "이메일 프로그램이 열렸습니다. 준비된 이메일을 전송해 문의를 완료해 주세요.",
    ...productFaqCopy.ko
  },
  ja: {
    heroPrompt:
      "メール、WhatsAppまたは電話番号をお知らせください。適切なAGMセパレーター仕様を確認します。",
    formText:
      "まずは連絡先をお知らせください。厚さ、幅、数量、用途をその後確認します。",
    checklist: [
      "お名前と連絡先だけでも開始できます",
      "適切な仕様の確認をサポートします",
      "厚さ、幅、数量はその後協議できます"
    ],
    messagePlaceholder:
      "任意：バッテリー用途、予定数量、サンプル・技術に関するご質問",
    required: "お名前と連絡先を入力してください。",
    success: "ありがとうございます。AGMセパレーター要件の確認のためご連絡します。",
    emailFallback:
      "メールアプリを開きました。作成済みのメールを送信してお問い合わせを完了してください。",
    ...productFaqCopy.ja
  },
  es: {
    heroPrompt:
      "Deje su correo, WhatsApp o teléfono. Le ayudaremos a confirmar la especificación adecuada del separador AGM.",
    formText:
      "Envíe primero sus datos de contacto. Nuestro equipo confirmará después el espesor, ancho, cantidad y aplicación.",
    checklist: [
      "Su nombre y contacto son suficientes para comenzar",
      "Le ayudamos a revisar la especificación adecuada",
      "El espesor, ancho y volumen pueden definirse después"
    ],
    messagePlaceholder:
      "Opcional: aplicación de la batería, cantidad estimada, muestra o consulta técnica",
    required: "Ingrese su nombre y datos de contacto.",
    success:
      "Gracias. Nos pondremos en contacto para confirmar sus requisitos de separador AGM.",
    emailFallback:
      "Se abrió su aplicación de correo con los datos preparados. Envíe el mensaje para completar la consulta.",
    ...productFaqCopy.es
  },
  pt: {
    heroPrompt:
      "Deixe seu e-mail, WhatsApp ou telefone. Ajudaremos a confirmar a especificação adequada do separador AGM.",
    formText:
      "Envie primeiro seus dados de contato. Nossa equipe confirmará depois espessura, largura, quantidade e aplicação.",
    checklist: [
      "Nome e contato são suficientes para começar",
      "Ajudamos a analisar a especificação adequada",
      "Espessura, largura e volume podem ser definidos depois"
    ],
    messagePlaceholder:
      "Opcional: aplicação da bateria, quantidade estimada, amostra ou dúvida técnica",
    required: "Informe seu nome e dados de contato.",
    success:
      "Obrigado. Entraremos em contato para confirmar os requisitos do separador AGM.",
    emailFallback:
      "Seu aplicativo de e-mail foi aberto com os dados preparados. Envie a mensagem para concluir a consulta.",
    ...productFaqCopy.pt
  },
  ru: {
    heroPrompt:
      "Оставьте email, WhatsApp или телефон. Мы поможем уточнить подходящие характеристики AGM-сепаратора.",
    formText:
      "Сначала оставьте контактные данные. Затем наша команда уточнит толщину, ширину, объем и область применения.",
    checklist: [
      "Для начала достаточно имени и контакта",
      "Мы поможем проверить подходящую спецификацию",
      "Толщину, ширину и объем можно согласовать позже"
    ],
    messagePlaceholder:
      "Необязательно: применение аккумулятора, объем, образец или технический вопрос",
    required: "Укажите имя и контактные данные.",
    success:
      "Спасибо. Мы свяжемся с вами, чтобы уточнить требования к AGM-сепаратору.",
    emailFallback:
      "Открыто почтовое приложение с подготовленными данными. Отправьте письмо, чтобы завершить запрос.",
    ...productFaqCopy.ru
  }
} as const;

const footerCopy = {
  en: {
    description:
      "AGM glass fiber separator manufacturer serving lead-acid battery producers and trading partners worldwide.",
    wechat: "Official WeChat account",
    mobile: "Mobile website"
  },
  zh: {
    description:
      "AGM 玻璃纤维隔板制造商，服务全球铅酸电池生产企业和贸易合作伙伴。",
    wechat: "官方微信公众号",
    mobile: "移动官网"
  },
  vi: {
    description:
      "Nhà sản xuất tấm ngăn sợi thủy tinh AGM phục vụ các nhà sản xuất và đối tác thương mại ắc quy axit-chì.",
    wechat: "Tài khoản WeChat chính thức",
    mobile: "Website di động"
  },
  ko: {
    description:
      "납축전지 제조업체와 무역 파트너를 위한 AGM 유리섬유 분리막 제조업체.",
    wechat: "공식 WeChat 계정",
    mobile: "모바일 웹사이트"
  },
  ja: {
    description:
      "鉛蓄電池メーカーと商社向けのAGMガラス繊維セパレーター製造会社。",
    wechat: "公式WeChatアカウント",
    mobile: "モバイルサイト"
  },
  es: {
    description:
      "Fabricante de separadores de fibra de vidrio AGM para productores de baterías de plomo-ácido y socios comerciales.",
    wechat: "Cuenta oficial de WeChat",
    mobile: "Sitio web móvil"
  },
  pt: {
    description:
      "Fabricante de separadores de fibra de vidro AGM para produtores de baterias chumbo-ácido e parceiros comerciais.",
    wechat: "Conta oficial do WeChat",
    mobile: "Site móvel"
  },
  ru: {
    description:
      "Производитель стекловолоконных AGM-сепараторов для производителей свинцово-кислотных аккумуляторов и торговых партнеров.",
    wechat: "Официальный аккаунт WeChat",
    mobile: "Мобильная версия сайта"
  }
} as const;

const content: Record<
  Exclude<ProductPageKind, "glassFiberThermalInsulationPaper">,
  Record<Lang, ProductContent>
> = {
  agmSeparator: {
    en: {
      homePath: "/",
      languagePath: "/zh/products/agm-separator/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "AGM Separator Product",
        title: "AGM Separator for VRLA Lead-Acid Batteries",
        subtitle:
          "AGM glass fiber separators supplied in roll or sheet format for VRLA lead-acid battery manufacturers and trading partners.",
        primary: "Request AGM Separator Samples",
        secondary: "Send Your Required Specification",
        proof: [
          "Roll and sheet discussion",
          "Customer requirement confirmation",
          "Factory-direct communication"
        ],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "Finished AGM glass fiber separator roll",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "Product Overview",
        title: "A separator material connected with battery design and performance",
        paragraphs: [
          "AGM separator is a glass fiber battery separator used in VRLA lead-acid batteries. It helps separate the positive and negative plates while holding electrolyte inside the battery structure.",
          "For battery manufacturers, a suitable separator is not only a material choice. It is connected with plate design, electrolyte retention, internal resistance, assembly process and long-term battery performance.",
          "We supply AGM glass fiber separators in roll and sheet formats. Thickness, width, sheet size and packing format can be discussed based on the customer’s battery design and production process."
        ]
      },
      parameters: {
        eyebrow: "Key Parameters",
        title: "AGM battery separator parameters buyers usually confirm",
        text:
          "For VRLA lead-acid battery production, AGM separator selection usually starts with thickness, width, basis weight, acid absorption, electrical resistance and handling strength. These values should be reviewed together with the battery application, assembly process and acceptance requirements before order confirmation.",
        items: [
          ["Thickness", "Connected with plate design, compression behavior and assembly process requirements."],
          ["Width or sheet size", "Roll width, slitting direction or pre-cut sheet size can be discussed based on production workflow."],
          ["Basis weight", "Reviewed together with separator structure, electrolyte retention and customer test method."],
          ["Acid absorption", "Discussed according to battery application, electrolyte retention needs and agreed test requirements."],
          ["Electrical resistance", "Reviewed with battery performance targets, test conditions and internal-resistance expectations."],
          ["Porosity and strength", "Porosity, tensile strength and handling performance can be checked for converting and assembly needs."]
        ]
      },
      forms: {
        eyebrow: "Product Forms",
        title: "Available for roll and sheet specification discussion",
        items: [
          [
            "AGM separator rolls",
            "Finished separator rolls can be discussed by thickness, width, roll diameter, packing method and production schedule.",
            "/images/viking-finished-separator-roll-900.webp",
            "Finished AGM separator roll",
            900,
            675
          ],
          [
            "AGM separator sheets",
            "Separator sheets can support sample review, specification discussion and customer production requirements.",
            "/images/viking-separator-sheets-900.webp",
            "AGM separator sheets",
            900,
            675
          ],
          [
            "Raw material and production follow-up",
            "Additional production evidence slot for raw material feeding and line-side process confirmation.",
            "/images/evidence/factory-raw-material-feed-01.webp",
            "AGM separator raw material feeding and production follow-up",
            1200,
            900
          ],
          [
            "Packing and shipment preparation",
            "Additional evidence slot for export packing, pallet handling and shipment preparation.",
            "/images/evidence/shipping-pallet-01.webp",
            "AGM separator packing and shipment preparation",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Applications",
        title: "Used across major VRLA lead-acid battery segments",
        items: [
          "UPS batteries",
          "Telecom batteries",
          "Motorcycle batteries",
          "E-bike batteries",
          "Energy storage batteries",
          "Automotive starting batteries"
        ]
      },
      quality: {
        eyebrow: "Quality Note",
        title: "Checks aligned with confirmed customer requirements",
        text:
          "Quality checks can be performed according to customer requirements. Specific test items and acceptable values should be confirmed before order confirmation.",
        cards: [
          ["Incoming and process review", "Material and process status can be reviewed for order discussion."],
          ["Finished-product checks", "Finished separator parameters can be checked according to agreed items."],
          ["Requirement confirmation", "Acceptance values should be confirmed before production and delivery."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your AGM separator requirements",
        text:
          "If you are developing a new battery model or replacing an existing separator supplier, please send your required thickness, width, roll or sheet type and battery application.",
        checklist: [
          "Target thickness and width",
          "Roll type or sheet size",
          "Battery application and model",
          "Quantity and sample requirements",
          "Special test or packing requirements"
        ],
        placeholder:
          "Thickness, width, roll or sheet type, quantity, sample needs and any required test items",
        submit: "Send Inquiry",
        submitting: "Sending...",
        required: "Please complete all required fields before submitting.",
        success:
          "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/products/agm-separator/",
      quote: "获取报价",
      hero: {
        eyebrow: "AGM 隔板产品",
        title: "用于 VRLA 铅酸电池的 AGM 隔板",
        subtitle:
          "面向 VRLA 铅酸电池生产企业和贸易伙伴，提供可按卷材或片材形式沟通的 AGM 玻璃纤维隔板。",
        primary: "申请 AGM 隔板样品",
        secondary: "发送所需规格",
        proof: ["卷材与片材沟通", "按客户要求确认", "工厂直接沟通"],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "AGM 玻璃纤维隔板成品卷",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "产品概览",
        title: "与电池结构和长期性能相关的隔板材料",
        paragraphs: [
          "AGM 隔板是一种用于 VRLA 铅酸电池的玻璃纤维电池隔板，用于隔离正负极板，并在电池结构中保持电解液。",
          "对于电池制造企业而言，合适的隔板不仅是材料选择，也与极板设计、电解液保持、内阻、装配工艺和长期电池性能相关。",
          "我们可提供 AGM 玻璃纤维隔板卷材和片材。厚度、宽度、片材尺寸及包装形式可根据客户电池设计和生产工艺进行沟通。"
        ]
      },
      parameters: {
        eyebrow: "关键参数",
        title: "采购 AGM 电池隔板时通常需要确认的参数",
        text:
          "用于 VRLA 铅酸电池生产的 AGM 隔板，通常需要结合厚度、宽度、克重、吸酸性能、电阻和操作强度进行沟通。这些指标应与电池应用、装配工艺和验收要求一起确认。",
        items: [
          ["厚度", "与极板设计、压缩表现和装配工艺要求相关，需要结合电池结构确认。"],
          ["宽度或片材尺寸", "卷材宽度、分切方向或预裁切片材尺寸可根据生产流程沟通。"],
          ["克重", "需结合隔板结构、电解液保持能力和客户测试方法进行评估。"],
          ["吸酸性能", "根据电池应用、电解液保持需求和约定测试要求进行沟通。"],
          ["电阻", "需结合电池性能目标、测试条件和内阻要求进行确认。"],
          ["孔隙率与强度", "孔隙率、拉伸强度和操作性能可围绕分切、转化和装配需求检测。"]
        ]
      },
      forms: {
        eyebrow: "产品形式",
        title: "支持卷材与片材规格沟通",
        items: [
          [
            "AGM 隔板卷材",
            "成品隔板卷可围绕厚度、宽度、卷径、包装方式和生产计划进行沟通。",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM 隔板成品卷",
            900,
            675
          ],
          [
            "AGM 隔板片材",
            "隔板片材可用于样品确认、规格沟通及客户生产需求讨论。",
            "/images/viking-separator-sheets-900.webp",
            "AGM 隔板片材",
            900,
            675
          ],
          [
            "原料与生产跟进",
            "新增证据图片位，用于展示原料进入生产线和现场过程确认。",
            "/images/evidence/factory-raw-material-feed-01.webp",
            "AGM 隔板原料进入生产线与生产跟进",
            1200,
            900
          ],
          [
            "包装与出运准备",
            "新增证据图片位，用于展示出口包装、托盘搬运和出运准备。",
            "/images/evidence/shipping-pallet-01.webp",
            "AGM 隔板包装与出运准备",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "应用领域",
        title: "服务主要 VRLA 铅酸电池应用场景",
        items: [
          "UPS 电池",
          "通信电池",
          "摩托车电池",
          "电动自行车电池",
          "储能电池",
          "汽车启动电池"
        ]
      },
      quality: {
        eyebrow: "质量说明",
        title: "检测项目根据确认的客户要求执行",
        text:
          "质量检测可根据客户要求进行。具体测试项目和接受值应在订单确认前沟通确定。",
        cards: [
          ["来料与过程确认", "可围绕原料和过程状态进行订单沟通。"],
          ["成品检测", "成品隔板参数可根据双方确认项目进行检测。"],
          ["要求确认", "验收值应在生产和交付前完成确认。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 AGM 隔板需求",
        text:
          "如果您正在开发新电池型号，或正在评估替换现有隔板供应商，请提供所需厚度、宽度、卷材或片材形式以及电池应用。",
        checklist: [
          "目标厚度和宽度",
          "卷材形式或片材尺寸",
          "电池应用和型号",
          "数量和样品需求",
          "特殊检测或包装要求"
        ],
        placeholder: "厚度、宽度、卷材或片材形式、数量、样品需求及检测项目",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorRolls: {
    en: {
      homePath: "/",
      languagePath: "/zh/products/agm-separator-rolls/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "AGM Separator Rolls",
        title: "AGM Separator Rolls for Battery Production Lines",
        subtitle:
          "Roll-format AGM glass fiber separators for VRLA lead-acid battery production, supporting continuous feeding, slitting and in-house cutting discussions.",
        primary: "Ask for Roll Specification",
        secondary: "Send Roll Requirements",
        proof: [
          "Continuous production support",
          "Roll packing discussion",
          "Customer requirement confirmation"
        ],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "Finished AGM separator roll for battery production",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "Roll Supply",
        title: "Roll format for continuous production and flexible planning",
        paragraphs: [
          "AGM separator rolls are used by battery manufacturers that need continuous material feeding, in-house slitting or sheet cutting before battery assembly.",
          "Compared with pre-cut sheets, roll supply can give production teams more flexibility when arranging line-side handling, inventory planning and specification conversion.",
          "Roll width, thickness, roll length, core requirement and packing method should be discussed according to the customer’s battery design, equipment condition and production process."
        ]
      },
      parameters: {
        eyebrow: "Custom Parameters",
        title: "Roll specifications confirmed before quotation",
        text:
          "Roll requirements are confirmed according to battery application, production handling and packing needs. Specific ranges are reviewed after receiving the buyer’s target specification.",
        items: [
          ["Width", "Discussed according to line feeding, slitting or in-house cutting requirements."],
          ["Thickness", "Confirmed with battery plate design, assembly pressure and application needs."],
          ["Roll length", "Reviewed based on handling, storage and production planning."],
          ["Core requirement", "Core material and inner diameter requirements should be confirmed before order discussion."],
          ["Packing method", "Export packing, moisture protection and handling requirements can be discussed with the buyer."],
          ["Battery application", "VRLA battery type and application help confirm roll specification and testing needs."]
        ]
      },
      forms: {
        eyebrow: "Roll Use Case",
        title: "Designed for production-line handling and further cutting",
        items: [
          [
            "Finished AGM separator roll",
            "Roll supply supports battery factories that require continuous material feeding, further slitting or internal sheet preparation.",
            "/images/viking-finished-separator-roll-900.webp",
            "Finished AGM separator roll",
            900,
            675
          ],
          [
            "Production and roll handling",
            "Workshop capability and roll handling details can be reviewed during specification and packing discussions.",
            "/images/agm-factory-capability-1200.webp",
            "AGM separator production and roll handling",
            1200,
            900
          ],
          [
            "Batch roll inventory",
            "Additional evidence slot for finished roll storage and batch supply review.",
            "/images/evidence/agm-separator-roll-warehouse-01.webp",
            "Finished AGM separator rolls in warehouse",
            1200,
            900
          ],
          [
            "Roll end-face condition",
            "Additional evidence slot for winding condition, roll edge and end-face review.",
            "/images/evidence/agm-separator-roll-end-face-01.webp",
            "AGM separator roll end-face condition",
            1200,
            900
          ],
          [
            "Roll packing method",
            "Additional evidence slot for roll protection, labeling, palletizing and export packing.",
            "/images/evidence/agm-separator-roll-packaging-01.webp",
            "AGM separator roll packaging",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Production Applications",
        title: "Roll supply for VRLA battery manufacturing workflows",
        items: [
          "Automatic battery assembly lines",
          "Semi-automatic battery assembly",
          "In-house separator cutting",
          "Further slitting preparation",
          "VRLA battery production",
          "Export packing discussion"
        ]
      },
      quality: {
        eyebrow: "Quality Factors",
        title: "Roll condition and handling performance reviewed with customer needs",
        text:
          "For roll-format supply, buyers usually review thickness stability, clean surface, roll condition and mechanical handling performance together with the intended battery application.",
        cards: [
          ["Stable thickness", "Thickness consistency can be checked according to agreed inspection items."],
          ["Clean surface", "Surface condition is reviewed for line-side handling and battery assembly needs."],
          ["Roll condition", "Roll appearance, winding condition and packing requirements can be confirmed before shipment."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your AGM separator roll requirements",
        text:
          "Please share your target width, thickness, roll format, core requirement, packing method and battery application so our team can discuss a practical roll specification with you.",
        checklist: [
          "Target width and thickness",
          "Roll length or roll size",
          "Core and packing requirements",
          "Battery application",
          "Sample or trial order needs"
        ],
        placeholder:
          "Width, thickness, roll length, core requirement, packing method and battery application",
        submit: "Send Inquiry",
        submitting: "Sending...",
        required: "Please complete all required fields before submitting.",
        success:
          "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/products/agm-separator-rolls/",
      quote: "获取报价",
      hero: {
        eyebrow: "AGM 隔板卷材",
        title: "用于电池生产线的 AGM 隔板卷材",
        subtitle:
          "面向 VRLA 铅酸电池生产的卷材形式 AGM 玻璃纤维隔板，可围绕连续上料、分切和厂内裁切需求进行沟通。",
        primary: "沟通卷材规格",
        secondary: "发送卷材需求",
        proof: ["支持连续生产", "卷材包装沟通", "按客户要求确认"],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "用于电池生产的 AGM 隔板成品卷",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "卷材供应",
        title: "适合连续生产和灵活计划的卷材形式",
        paragraphs: [
          "AGM 隔板卷材适用于需要连续上料、厂内分切或装配前裁切片材的电池制造企业。",
          "与预裁切片材相比，卷材供应有助于生产团队更灵活安排现场搬运、库存计划和规格转换。",
          "卷材宽度、厚度、卷长、芯管要求和包装方式应根据客户电池设计、设备条件和生产工艺进行沟通确认。"
        ]
      },
      parameters: {
        eyebrow: "定制参数",
        title: "报价前确认卷材规格",
        text:
          "卷材要求需结合电池应用、生产搬运和包装需求确认。具体范围将在收到客户目标规格后沟通评估。",
        items: [
          ["宽度", "根据生产线上料、分切或厂内裁切要求沟通。"],
          ["厚度", "结合电池极板设计、装配压力和应用需求确认。"],
          ["卷长", "可根据搬运、仓储和生产计划评估卷长或卷材尺寸。"],
          ["芯管要求", "芯管材料和内径要求应在订单沟通前确认。"],
          ["包装方式", "出口包装、防潮和搬运要求可与客户沟通。"],
          ["电池应用", "VRLA 电池类型和应用有助于确认卷材规格与检测需求。"]
        ]
      },
      forms: {
        eyebrow: "卷材用途",
        title: "面向生产线搬运与后续裁切",
        items: [
          [
            "AGM 隔板成品卷",
            "卷材供应适合需要连续上料、进一步分切或厂内准备片材的电池工厂。",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM 隔板成品卷",
            900,
            675
          ],
          [
            "生产与卷材处理",
            "车间能力和卷材处理细节可在规格和包装沟通中确认。",
            "/images/agm-factory-capability-1200.webp",
            "AGM 隔板生产与卷材处理",
            1200,
            900
          ],
          [
            "批量卷材库存",
            "新增证据图片位，用于展示成品卷材仓储和批量供应能力。",
            "/images/evidence/agm-separator-roll-warehouse-01.webp",
            "AGM 隔板成品卷材库存",
            1200,
            900
          ],
          [
            "卷材端面状态",
            "新增证据图片位，用于展示收卷状态、卷边和端面细节。",
            "/images/evidence/agm-separator-roll-end-face-01.webp",
            "AGM 隔板卷材端面状态",
            1200,
            900
          ],
          [
            "卷材包装方式",
            "新增证据图片位，用于展示卷材防护、标签、托盘和出口包装。",
            "/images/evidence/agm-separator-roll-packaging-01.webp",
            "AGM 隔板卷材包装",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "生产应用",
        title: "面向 VRLA 电池制造流程的卷材供应",
        items: [
          "自动化电池装配线",
          "半自动电池装配",
          "厂内隔板裁切",
          "后续分切准备",
          "VRLA 电池生产",
          "出口包装沟通"
        ]
      },
      quality: {
        eyebrow: "质量因素",
        title: "卷材状态和搬运性能按客户需求评估",
        text:
          "对于卷材供应，买家通常会结合目标电池应用评估厚度稳定性、表面洁净度、卷材状态和机械搬运性能。",
        cards: [
          ["厚度稳定", "厚度一致性可根据约定检测项目进行检查。"],
          ["表面洁净", "表面状态可结合现场搬运和电池装配需求评估。"],
          ["卷材状态", "卷材外观、收卷状态和包装要求可在发货前确认。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 AGM 隔板卷材需求",
        text:
          "请提供目标宽度、厚度、卷材形式、芯管要求、包装方式和电池应用，便于我们与您沟通实际卷材规格。",
        checklist: [
          "目标宽度和厚度",
          "卷长或卷材尺寸",
          "芯管与包装要求",
          "电池应用",
          "样品或试单需求"
        ],
        placeholder: "宽度、厚度、卷长、芯管要求、包装方式和电池应用",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorSheets: {
    en: {
      homePath: "/",
      languagePath: "/zh/products/agm-separator-sheets/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "AGM Separator Sheets",
        title: "AGM Separator Sheets for VRLA Battery Assembly",
        subtitle:
          "Pre-cut AGM separator sheets for VRLA lead-acid battery assembly. Sheet dimensions and thickness should be confirmed by battery design.",
        primary: "Ask for Sheet Specification",
        secondary: "Send Sheet Requirements",
        proof: ["Pre-cut sheet format", "Sample review support", "Customer design confirmation"],
        image: {
          src: "/images/sheets1-1200.webp",
          alt: "Pre-cut AGM separator sheets",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Sheet Format",
        title: "Ready-to-use pieces for assembly and sample review",
        paragraphs: [
          "AGM separator sheets are pre-cut separator pieces used when customers need direct assembly, sample review or customized battery model discussions.",
          "Sheet height, width, thickness and packing quantity should be confirmed according to the customer’s battery design and assembly process.",
          "This format is useful for buyers who need clear sample comparison, small-batch preparation or direct production-line use."
        ]
      },
      parameters: {
        eyebrow: "Sheet Parameters",
        title: "Dimensions and packing confirmed by battery design",
        text:
          "Sheet requirements are confirmed before quotation. Specific dimensions, tolerances and packing quantities should be based on customer drawings or sample needs.",
        items: [
          ["Height", "Confirmed according to battery model and plate group design."],
          ["Width", "Reviewed with assembly process and separator placement requirements."],
          ["Thickness", "Confirmed with battery design, compression and application needs."],
          ["Packing quantity", "Discussed according to sample, trial or production arrangement."],
          ["Appearance", "Surface and edge condition can be reviewed during sample confirmation."],
          ["Reference sample", "Existing sample or drawing helps speed up specification discussion."]
        ]
      },
      forms: {
        eyebrow: "Sheet Display",
        title: "Cut sheets for direct review and assembly discussion",
        items: [
          [
            "Pre-cut AGM separator sheets",
            "Sheet pieces support direct assembly, sample comparison and customized battery model discussions.",
            "/images/sheets1-900.webp",
            "Pre-cut AGM separator sheets",
            900,
            675
          ],
          [
            "Roll and sheet preparation",
            "Roll material and prepared sheets can be reviewed together when confirming production workflow.",
            "/images/sheets2-cropped-900.webp",
            "AGM separator roll and sheets",
            900,
            675
          ],
          [
            "Sheet edge and thickness detail",
            "Additional evidence slot for sheet edge condition, thickness feel and surface review.",
            "/images/evidence/agm-separator-sheets-detail-01.webp",
            "AGM separator sheet edge and thickness detail",
            1200,
            900
          ],
          [
            "Sheet packing and sample support",
            "Additional evidence slot for sheet packing, sample preparation and small-batch discussion.",
            "/images/evidence/agm-separator-sheets-packaging-01.webp",
            "AGM separator sheet packaging and sample support",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Use Cases",
        title: "Sheet supply for assembly, trials and customized models",
        items: [
          "Manual assembly",
          "Small-batch production",
          "Customized battery models",
          "Sample review",
          "Specification comparison",
          "Trading sample preparation"
        ]
      },
      quality: {
        eyebrow: "Key Checks",
        title: "Sheet condition reviewed according to confirmed requirements",
        text:
          "Dimensions, appearance, edge condition and packing expectations should be confirmed before sample or order arrangement.",
        cards: [
          ["Dimensions", "Height, width and thickness can be checked against agreed requirements."],
          ["Appearance", "Surface condition and visible defects can be reviewed during sample confirmation."],
          ["Packing", "Packing quantity and protection method can be discussed before shipment."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your AGM separator sheet requirements",
        text:
          "Please send sheet height, width, thickness, packing quantity, battery model and sample requirements for discussion.",
        checklist: [
          "Sheet height and width",
          "Target thickness",
          "Battery model or application",
          "Packing quantity",
          "Sample or reference information"
        ],
        placeholder:
          "Sheet height, width, thickness, packing quantity, battery model and sample requirements",
        submit: "Send Inquiry",
        submitting: "Sending...",
        required: "Please complete all required fields before submitting.",
        success:
          "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/products/agm-separator-sheets/",
      quote: "获取报价",
      hero: {
        eyebrow: "AGM 隔板片材",
        title: "用于 VRLA 电池装配的 AGM 隔板片材",
        subtitle:
          "预裁切 AGM 隔板片材用于 VRLA 铅酸电池装配，片材尺寸和厚度应根据电池设计确认。",
        primary: "沟通片材规格",
        secondary: "发送片材需求",
        proof: ["预裁切片材形式", "支持样品评估", "按客户设计确认"],
        image: {
          src: "/images/sheets1-1200.webp",
          alt: "预裁切 AGM 隔板片材",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "片材形式",
        title: "面向装配和样品评估的预裁切片材",
        paragraphs: [
          "AGM 隔板片材是预裁切的隔板片，适用于客户直接装配、样品评估或定制电池型号沟通。",
          "片材高度、宽度、厚度和包装数量应根据客户电池设计和装配流程确认。",
          "该形式适合需要清晰样品对比、小批量准备或直接生产线使用的买家。"
        ]
      },
      parameters: {
        eyebrow: "片材参数",
        title: "尺寸与包装按电池设计确认",
        text:
          "片材要求应在报价前确认。具体尺寸、公差和包装数量需基于客户图纸或样品需求沟通。",
        items: [
          ["高度", "根据电池型号和极群设计确认。"],
          ["宽度", "结合装配流程和隔板放置要求评估。"],
          ["厚度", "结合电池设计、压缩状态和应用需求确认。"],
          ["包装数量", "根据样品、试单或生产安排沟通。"],
          ["外观", "表面和边缘状态可在样品确认时评估。"],
          ["参考样品", "现有样品或图纸有助于加快规格沟通。"]
        ]
      },
      forms: {
        eyebrow: "片材展示",
        title: "用于直接评估和装配沟通的裁切片材",
        items: [
          [
            "预裁切 AGM 隔板片材",
            "片材支持直接装配、样品对比和定制电池型号沟通。",
            "/images/sheets1-900.webp",
            "预裁切 AGM 隔板片材",
            900,
            675
          ],
          [
            "卷材与片材准备",
            "确认生产流程时，可同时评估卷材和准备好的片材形式。",
            "/images/sheets2-cropped-900.webp",
            "AGM 隔板卷材与片材",
            900,
            675
          ],
          [
            "片材边缘与厚度细节",
            "新增证据图片位，用于展示片材边缘状态、厚度感和表面状态。",
            "/images/evidence/agm-separator-sheets-detail-01.webp",
            "AGM 隔板片材边缘与厚度细节",
            1200,
            900
          ],
          [
            "片材包装与样品支持",
            "新增证据图片位，用于展示片材包装、样品准备和小批量沟通。",
            "/images/evidence/agm-separator-sheets-packaging-01.webp",
            "AGM 隔板片材包装与样品支持",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "使用场景",
        title: "面向装配、试样和定制型号的片材供应",
        items: [
          "手工装配",
          "小批量生产",
          "定制电池型号",
          "样品评估",
          "规格对比",
          "贸易样品准备"
        ]
      },
      quality: {
        eyebrow: "关键检查",
        title: "片材状态按确认要求评估",
        text:
          "尺寸、外观、边缘状态和包装期望应在样品或订单安排前确认。",
        cards: [
          ["尺寸", "高度、宽度和厚度可按约定要求检查。"],
          ["外观", "表面状态和可见缺陷可在样品确认时评估。"],
          ["包装", "包装数量和防护方式可在出运前沟通。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 AGM 隔板片材需求",
        text:
          "请提供片材高度、宽度、厚度、包装数量、电池型号和样品需求，便于我们沟通。",
        checklist: [
          "片材高度和宽度",
          "目标厚度",
          "电池型号或应用",
          "包装数量",
          "样品或参考信息"
        ],
        placeholder: "片材高度、宽度、厚度、包装数量、电池型号和样品需求",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorVrlaApplication: {
    en: {
      homePath: "/",
      languagePath: "/zh/applications/agm-separator-for-vrla-battery/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "VRLA Battery Applications",
        title: "AGM Separator for VRLA Battery Applications",
        subtitle:
          "Application-focused AGM glass fiber separator discussion for VRLA lead-acid batteries used in UPS, telecom, motorcycle, e-bike, energy storage and automotive starting batteries.",
        primary: "Choose Separator by Application",
        secondary: "Send Battery Model Information",
        proof: [
          "VRLA lead-acid battery applications",
          "Roll or sheet specification discussion",
          "Customer requirement confirmation"
        ],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "AGM separator roll for VRLA battery applications",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "VRLA Battery Function",
        title: "How AGM separator supports VRLA lead-acid battery design",
        paragraphs: [
          "AGM separator is placed between positive and negative plates in VRLA lead-acid batteries. It helps prevent direct plate contact while holding electrolyte inside the battery structure.",
          "Different battery applications may require different separator discussions. UPS, telecom, motorcycle, e-bike, energy storage and automotive starting batteries can have different plate design, assembly and operating requirements.",
          "Separator parameters should be confirmed together with battery structure, plate design, assembly process and application environment before quotation or sample arrangement."
        ]
      },
      parameters: {
        eyebrow: "Parameter Selection",
        title: "Specification discussion should start from the battery application",
        text:
          "Thickness, width, basis weight, acid absorption behavior, electrical resistance and product format should be reviewed according to the customer battery design and production process.",
        items: [
          ["Battery structure", "Separator selection should match the internal battery design and plate spacing."],
          ["Plate design", "Plate size and assembly method influence separator thickness, width or sheet size discussion."],
          ["Assembly process", "Roll or sheet format should support the customer production workflow."],
          ["Application environment", "Battery use conditions help define quality and technical review priorities."],
          ["Technical parameters", "Target values should be confirmed according to customer standards and order requirements."],
          ["Sample or drawing reference", "Existing samples or drawings help make specification communication more accurate."]
        ]
      },
      forms: {
        eyebrow: "Application Examples",
        title: "AGM separators for common VRLA lead-acid battery segments",
        items: [
          [
            "Roll and sheet formats for VRLA batteries",
            "AGM separator material can be discussed in roll or sheet form according to the customer battery production workflow.",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM separator roll for VRLA battery applications",
            900,
            675
          ],
          [
            "Specification review and quality discussion",
            "For different battery applications, quality checks and target parameters should be confirmed before sample or order arrangement.",
            "/images/agm-quality-control-1200.webp",
            "AGM separator quality discussion for VRLA battery applications",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "VRLA Battery Segments",
        title: "Application areas buyers commonly discuss",
        items: [
          "UPS batteries",
          "Telecom batteries",
          "Motorcycle batteries",
          "E-bike batteries",
          "Energy storage batteries",
          "Automotive starting batteries"
        ]
      },
      quality: {
        eyebrow: "Before Quotation",
        title: "Send application details before separator specification confirmation",
        text:
          "To support quotation and sample discussion, please provide battery application, separator thickness, roll or sheet type, width or sheet size, technical requirements and available sample or drawing information.",
        cards: [
          ["Battery application", "Share the battery segment, use case and production workflow for specification discussion."],
          ["Separator format", "Confirm whether roll material, sheet pieces or both formats should be reviewed."],
          ["Technical reference", "Provide target parameters, existing samples, drawings or customer standards when available."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your VRLA battery separator application requirements",
        text:
          "Please share the battery application and separator requirements so we can discuss suitable roll or sheet specification details with you.",
        checklist: [
          "Battery application",
          "Separator thickness",
          "Roll or sheet type",
          "Width or sheet size",
          "Technical requirements",
          "Sample or drawing information"
        ],
        placeholder:
          "Battery application, separator thickness, roll or sheet type, width or sheet size, technical requirements and sample/drawing information",
        submit: "Send Inquiry",
        submitting: "Sending...",
        required: "Please complete all required fields before submitting.",
        success:
          "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/applications/agm-separator-for-vrla-battery/",
      quote: "获取报价",
      hero: {
        eyebrow: "VRLA 电池应用",
        title: "用于 VRLA 电池应用的 AGM 隔板",
        subtitle:
          "面向 UPS、通信、摩托车、电动车、储能和汽车启动电池等 VRLA 铅酸电池应用，沟通 AGM 玻璃纤维隔板的卷材、片材和规格要求。",
        primary: "按应用沟通隔板需求",
        secondary: "发送电池型号信息",
        proof: ["VRLA 铅酸电池应用", "卷材或片材规格沟通", "按客户要求确认"],
        image: {
          src: "/images/viking-finished-separator-roll-900.webp",
          alt: "用于 VRLA 电池应用的 AGM 隔板卷材",
          width: 900,
          height: 675
        }
      },
      overview: {
        eyebrow: "VRLA 电池功能",
        title: "AGM 隔板在 VRLA 铅酸电池中的作用",
        paragraphs: [
          "AGM 隔板位于 VRLA 铅酸电池正负极板之间，用于帮助隔离极板并在电池结构中保持电解液。",
          "不同电池应用对隔板的关注点可能不同。UPS、通信、摩托车、电动车、储能和汽车启动电池在极板设计、装配方式和使用环境上可能存在差异。",
          "隔板参数应结合电池结构、极板设计、装配工艺和应用环境，在报价或样品安排前与客户要求共同确认。"
        ]
      },
      parameters: {
        eyebrow: "参数选择",
        title: "隔板规格沟通应从电池应用开始",
        text:
          "厚度、宽度、克重、吸酸行为、电阻以及产品形式，应结合客户电池设计和生产工艺进行确认。",
        items: [
          ["电池结构", "隔板选择应匹配电池内部结构和极板间距。"],
          ["极板设计", "极板尺寸和装配方式会影响隔板厚度、宽度或片材尺寸沟通。"],
          ["装配工艺", "卷材或片材形式应服务于客户生产流程。"],
          ["应用环境", "电池使用场景有助于确定质量和技术评审重点。"],
          ["技术参数", "目标值应结合客户标准和订单要求确认。"],
          ["样品或图纸参考", "现有样品或图纸有助于提高规格沟通准确性。"]
        ]
      },
      forms: {
        eyebrow: "应用示例",
        title: "AGM 隔板服务常见 VRLA 铅酸电池应用",
        items: [
          [
            "VRLA 电池卷材与片材形式",
            "AGM 隔板材料可根据客户电池生产流程沟通卷材或片材形式。",
            "/images/viking-finished-separator-roll-900.webp",
            "用于 VRLA 电池应用的 AGM 隔板卷材",
            900,
            675
          ],
          [
            "规格评审与质量沟通",
            "针对不同电池应用，质量检查项目和目标参数应在样品或订单安排前确认。",
            "/images/agm-quality-control-1200.webp",
            "VRLA 电池 AGM 隔板质量沟通",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "VRLA 电池场景",
        title: "买家常见沟通的应用方向",
        items: [
          "UPS 电池",
          "通信电池",
          "摩托车电池",
          "电动车电池",
          "储能电池",
          "汽车启动电池"
        ]
      },
      quality: {
        eyebrow: "报价前信息",
        title: "规格确认前请提供电池应用与隔板需求",
        text:
          "为便于报价和样品沟通，请提供电池应用、隔板厚度、卷材或片材形式、宽度或片材尺寸、技术要求及样品或图纸信息。",
        cards: [
          ["电池应用", "说明电池应用领域、使用场景和生产流程。"],
          ["隔板形式", "确认需要沟通卷材、片材或两种形式。"],
          ["技术参考", "如有目标参数、现有样品、图纸或客户标准，请一并提供。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 VRLA 电池隔板应用需求",
        text:
          "请提供电池应用和隔板需求，便于我们与您沟通合适的卷材或片材规格。",
        checklist: [
          "电池应用",
          "隔板厚度",
          "卷材或片材形式",
          "宽度或片材尺寸",
          "技术要求",
          "样品或图纸信息"
        ],
        placeholder:
          "电池应用、隔板厚度、卷材或片材形式、宽度或片材尺寸、技术要求及样品/图纸信息",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorUpsApplication: {
    en: {
      homePath: "/",
      languagePath: "/zh/applications/agm-separator-for-ups-battery/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "UPS Battery Application",
        title: "AGM Separator for UPS VRLA Batteries",
        subtitle:
          "Application-focused AGM separator discussion for UPS, standby power and backup VRLA lead-acid battery manufacturing.",
        primary: "Discuss UPS Battery Requirements",
        secondary: "Send Contact Information",
        proof: ["UPS and standby power", "Roll or sheet discussion", "Specification support"],
        image: {
          src: "/images/applications/ups-vrla-battery-application-1200.webp",
          alt: "AGM separator discussion for UPS VRLA battery applications",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Application Focus",
        title: "Separator requirements should match UPS battery design and standby use",
        paragraphs: [
          "UPS VRLA batteries are commonly used for standby power and backup systems. Separator discussion should consider the battery structure, expected operating environment and production process.",
          "For UPS battery projects, buyers often review separator thickness, width, acid absorption behavior, electrical resistance and consistency before sample or order confirmation.",
          "If the exact specification is not final, you can leave your contact information first. Our team can help review whether roll material, sheet pieces or a custom discussion is more suitable."
        ]
      },
      parameters: {
        eyebrow: "Specification Discussion",
        title: "Key points for UPS VRLA battery separator sourcing",
        text:
          "UPS battery separator requirements should be confirmed with the customer battery design, test standards and production workflow.",
        items: [
          ["Thickness and width", "Confirmed according to plate design, cell structure and production process."],
          ["Acid absorption", "Reviewed with electrolyte retention needs and customer test methods."],
          ["Electrical resistance", "Discussed together with battery performance and agreed testing conditions."],
          ["Roll or sheet format", "Selected according to line-side feeding, cutting or assembly workflow."],
          ["Batch consistency", "Important for customers planning repeated standby battery production."],
          ["Packing method", "Packing and shipment requirements can be confirmed before order arrangement."]
        ]
      },
      forms: {
        eyebrow: "Product Format",
        title: "Roll and sheet options for UPS battery production",
        items: [
          [
            "AGM separator rolls for production lines",
            "Roll supply can support line-side feeding, slitting and production planning for UPS battery manufacturers.",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM separator rolls for UPS battery production",
            900,
            675
          ],
          [
            "AGM separator sheets for sample review",
            "Pre-cut sheets can support assembly trials, sample comparison and battery model discussion.",
            "/images/sheets1-900.webp",
            "AGM separator sheets for UPS battery sample review",
            900,
            675
          ],
          [
            "UPS standby power application discussion",
            "Application image slot for UPS and backup power battery separator sourcing.",
            "/images/applications/ups-vrla-battery-application-1200.webp",
            "UPS VRLA battery application discussion",
            1200,
            900
          ],
          [
            "Quality testing support",
            "Testing items can be discussed before sample or order arrangement.",
            "/images/evidence/quality-electrical-resistance-test-01.webp",
            "AGM separator electrical resistance testing for UPS battery discussion",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "UPS Battery Uses",
        title: "Common standby power directions buyers discuss",
        items: [
          "UPS backup batteries",
          "Standby power systems",
          "Data center backup power",
          "Security and emergency power",
          "Telecom backup cabinets",
          "Industrial control backup batteries"
        ]
      },
      quality: {
        eyebrow: "Quality Considerations",
        title: "Testing expectations should be confirmed before samples",
        text:
          "UPS battery projects may require stable separator parameters and clear quality communication. Final test items should follow customer requirements.",
        cards: [
          ["Dimensional consistency", "Thickness and width should be reviewed against agreed requirements."],
          ["Absorption and resistance", "Acid absorption and electrical resistance can be discussed with test conditions."],
          ["Sample comparison", "Existing samples, drawings or target values help make discussion more accurate."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with VRLA, product and quality details",
        items: [
          ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"],
          ["AGM Separator Product", "/products/agm-separator/"],
          ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
          ["AGM Separator Sheets", "/products/agm-separator-sheets/"],
          ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your UPS battery separator requirements",
        text:
          "Leave your contact first. We will help confirm the suitable AGM separator specification for UPS or standby battery projects.",
        checklist: ["UPS or standby battery application", "Roll or sheet format", "Target thickness or width if available", "Sample or quantity needs"],
        placeholder:
          "Optional: UPS battery type, roll or sheet need, sample quantity, target thickness or technical questions",
        submit: "Send Contact",
        submitting: "Sending...",
        required: "Please leave your name and contact information before submitting.",
        success:
          "Thank you. We will contact you soon to confirm your AGM separator requirements.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the contact details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/applications/agm-separator-for-ups-battery/",
      quote: "获取报价",
      hero: {
        eyebrow: "UPS 电池应用",
        title: "用于 UPS VRLA 电池的 AGM 隔板",
        subtitle:
          "面向 UPS、备用电源和后备电源 VRLA 铅酸电池生产，沟通 AGM 隔板卷材、片材和规格要求。",
        primary: "沟通 UPS 电池需求",
        secondary: "留下联系方式",
        proof: ["UPS 与备用电源", "卷材或片材沟通", "规格协助确认"],
        image: {
          src: "/images/applications/ups-vrla-battery-application-1200.webp",
          alt: "UPS VRLA 电池应用 AGM 隔板沟通",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "应用重点",
        title: "隔板需求应结合 UPS 电池结构和备用电源场景确认",
        paragraphs: [
          "UPS VRLA 电池常用于备用电源和后备系统。隔板沟通应结合电池结构、使用环境和生产工艺进行。",
          "UPS 电池项目通常会在样品或订单确认前沟通隔板厚度、宽度、吸酸表现、电阻和批次一致性。",
          "如果具体规格尚未确定，也可以先留下联系方式。我们会协助判断更适合沟通卷材、片材还是定制规格。"
        ]
      },
      parameters: {
        eyebrow: "规格沟通",
        title: "UPS VRLA 电池隔板采购的关键沟通点",
        text:
          "UPS 电池隔板要求应结合客户电池设计、测试标准和生产流程确认。",
        items: [
          ["厚度和宽度", "根据极板设计、电池结构和生产工艺确认。"],
          ["吸酸性能", "结合电解液保持需求和客户测试方法沟通。"],
          ["电阻", "与电池性能和约定测试条件共同讨论。"],
          ["卷材或片材形式", "根据连续上料、裁切或装配流程选择。"],
          ["批次一致性", "对持续生产备用电池的客户较为重要。"],
          ["包装方式", "包装和出运要求可在订单安排前确认。"]
        ]
      },
      forms: {
        eyebrow: "产品形式",
        title: "面向 UPS 电池生产的卷材和片材选择",
        items: [
          [
            "用于生产线的 AGM 隔板卷材",
            "卷材供应可支持 UPS 电池生产企业的连续上料、分切和生产计划。",
            "/images/viking-finished-separator-roll-900.webp",
            "用于 UPS 电池生产的 AGM 隔板卷材",
            900,
            675
          ],
          [
            "用于样品评估的 AGM 隔板片材",
            "预裁切片材可支持装配试样、样品对比和电池型号沟通。",
            "/images/sheets1-900.webp",
            "用于 UPS 电池样品评估的 AGM 隔板片材",
            900,
            675
          ],
          [
            "UPS 备用电源应用沟通",
            "用于 UPS 和后备电源电池隔板采购的应用图片位。",
            "/images/applications/ups-vrla-battery-application-1200.webp",
            "UPS VRLA 电池应用沟通",
            1200,
            900
          ],
          [
            "质量检测支持",
            "检测项目可在样品或订单安排前沟通确认。",
            "/images/evidence/quality-electrical-resistance-test-01.webp",
            "UPS 电池隔板电阻检测沟通",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "UPS 电池用途",
        title: "买家常见沟通的备用电源方向",
        items: ["UPS 后备电池", "备用电源系统", "数据中心后备电源", "安防和应急电源", "通信后备机柜", "工业控制备用电池"]
      },
      quality: {
        eyebrow: "质量关注点",
        title: "样品前应确认检测期望",
        text:
          "UPS 电池项目通常关注稳定的隔板参数和清晰的质量沟通。最终检测项目应以客户要求为准。",
        cards: [
          ["尺寸一致性", "厚度和宽度应根据约定要求评估。"],
          ["吸酸与电阻", "吸酸性能和电阻可结合测试条件沟通。"],
          ["样品对比", "现有样品、图纸或目标值有助于提高沟通准确性。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看 VRLA、产品和质量信息",
        items: [
          ["VRLA 电池应用", "/zh/applications/agm-separator-for-vrla-battery/"],
          ["AGM 隔板产品", "/zh/products/agm-separator/"],
          ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
          ["AGM 隔板片材", "/zh/products/agm-separator-sheets/"],
          ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送 UPS 电池隔板需求",
        text:
          "先留下联系方式即可，我们会协助确认适合 UPS 或备用电池项目的 AGM 隔板规格。",
        checklist: ["UPS 或备用电池应用", "卷材或片材形式", "已有目标厚度或宽度", "样品或数量需求"],
        placeholder: "可选：UPS 电池类型、卷材或片材需求、样品数量、目标厚度或技术问题",
        submit: "提交联系方式",
        submitting: "发送中...",
        required: "请先填写姓名和微信或手机号。",
        success: "感谢您留下联系方式，我们会尽快联系您确认 AGM 隔板需求。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已为您打开邮件客户端并填入联系方式，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorMotorcycleApplication: {
    en: {
      homePath: "/",
      languagePath: "/zh/applications/agm-separator-for-motorcycle-battery/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "Motorcycle Battery Application",
        title: "AGM Separator for Motorcycle Starting Batteries",
        subtitle:
          "AGM separator discussion for compact motorcycle VRLA and starting battery production, including roll, sheet and sample requirements.",
        primary: "Discuss Motorcycle Battery Needs",
        secondary: "Send Contact Information",
        proof: ["Starting battery application", "Compact battery discussion", "Sample support"],
        image: {
          src: "/images/applications/motorcycle-vrla-battery-application-1200.webp",
          alt: "AGM separator discussion for motorcycle battery applications",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Application Focus",
        title: "Motorcycle batteries need separator discussion around compact structure",
        paragraphs: [
          "Motorcycle starting batteries often use compact internal structures and require separator discussion according to plate size, assembly method and battery model.",
          "For this application, buyers commonly discuss separator thickness, sheet size or roll width, handling performance, acid absorption and electrical resistance.",
          "If the final battery model is still under review, leave your contact first. We can help confirm what information is useful for sample or quotation discussion."
        ]
      },
      parameters: {
        eyebrow: "Specification Discussion",
        title: "Key points for motorcycle battery separator sourcing",
        text:
          "Motorcycle battery separator requirements should be reviewed with the customer battery model, plate design and assembly workflow.",
        items: [
          ["Sheet size or roll width", "Confirmed according to compact battery design and cutting workflow."],
          ["Thickness", "Reviewed with plate spacing, compression and assembly needs."],
          ["Handling strength", "Discussed for cutting, placement and production handling."],
          ["Acid absorption", "Confirmed according to battery design and customer testing method."],
          ["Electrical resistance", "Discussed with target performance and agreed test conditions."],
          ["Sample review", "Sample discussion can start before every parameter is finalized."]
        ]
      },
      forms: {
        eyebrow: "Product Format",
        title: "Separator forms for compact battery assembly",
        items: [
          [
            "Pre-cut sheets for assembly trials",
            "Sheet pieces can support motorcycle battery model review and sample assembly discussion.",
            "/images/sheets1-900.webp",
            "AGM separator sheets for motorcycle battery assembly",
            900,
            675
          ],
          [
            "Roll material for in-house cutting",
            "Roll supply can support customers who cut separator material according to battery model needs.",
            "/images/viking-finished-separator-roll-900.webp",
            "AGM separator roll for motorcycle battery production",
            900,
            675
          ],
          [
            "Motorcycle starting battery application",
            "Application image slot for compact motorcycle VRLA battery separator sourcing.",
            "/images/applications/motorcycle-vrla-battery-application-1200.webp",
            "Motorcycle VRLA battery application discussion",
            1200,
            900
          ],
          [
            "Sheet edge and detail review",
            "Sheet details can be reviewed during sample and specification confirmation.",
            "/images/evidence/agm-separator-sheets-detail-01.webp",
            "AGM separator sheet detail for motorcycle battery discussion",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Motorcycle Battery Uses",
        title: "Common starting battery directions buyers discuss",
        items: ["Motorcycle starting batteries", "Scooter batteries", "Compact VRLA batteries", "Small engine batteries", "Replacement battery production", "Sample model development"]
      },
      quality: {
        eyebrow: "Quality Considerations",
        title: "Compact battery projects need careful size and handling review",
        text:
          "Motorcycle battery separator discussion often starts from dimensions, handling and sample confirmation. Final test items should follow customer requirements.",
        cards: [
          ["Dimension review", "Sheet height, width or roll width should match battery model needs."],
          ["Handling review", "Separator condition during cutting and assembly can be discussed."],
          ["Testing discussion", "Thickness, absorption and resistance can be reviewed with target requirements."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with VRLA, product and quality details",
        items: [
          ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"],
          ["AGM Separator Sheets", "/products/agm-separator-sheets/"],
          ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
          ["AGM Separator Product", "/products/agm-separator/"],
          ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your motorcycle battery separator needs",
        text:
          "Leave your contact first. We will help confirm the suitable AGM separator format for motorcycle battery production or samples.",
        checklist: ["Motorcycle battery model", "Sheet size or roll width if available", "Sample needs", "Production or trial quantity"],
        placeholder:
          "Optional: motorcycle battery model, sheet size, roll width, sample needs or technical questions",
        submit: "Send Contact",
        submitting: "Sending...",
        required: "Please leave your name and contact information before submitting.",
        success:
          "Thank you. We will contact you soon to confirm your AGM separator requirements.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the contact details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/applications/agm-separator-for-motorcycle-battery/",
      quote: "获取报价",
      hero: {
        eyebrow: "摩托车电池应用",
        title: "用于摩托车启动电池的 AGM 隔板",
        subtitle:
          "面向紧凑型摩托车 VRLA 电池和启动电池生产，沟通 AGM 隔板卷材、片材和样品需求。",
        primary: "沟通摩托车电池需求",
        secondary: "留下联系方式",
        proof: ["启动电池应用", "紧凑型电池沟通", "样品沟通支持"],
        image: {
          src: "/images/applications/motorcycle-vrla-battery-application-1200.webp",
          alt: "摩托车电池应用 AGM 隔板沟通",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "应用重点",
        title: "摩托车电池隔板沟通应关注紧凑结构",
        paragraphs: [
          "摩托车启动电池通常结构较紧凑，隔板需求应结合极板尺寸、装配方式和电池型号确认。",
          "该应用下，买家常沟通隔板厚度、片材尺寸或卷材宽度、操作性能、吸酸性能和电阻。",
          "如果最终电池型号仍在评估，也可以先留下联系方式。我们会协助确认样品或报价沟通需要哪些信息。"
        ]
      },
      parameters: {
        eyebrow: "规格沟通",
        title: "摩托车电池隔板采购的关键沟通点",
        text:
          "摩托车电池隔板要求应结合客户电池型号、极板设计和装配流程评估。",
        items: [
          ["片材尺寸或卷材宽度", "根据紧凑型电池设计和裁切流程确认。"],
          ["厚度", "结合极板间距、压缩和装配需求评估。"],
          ["操作强度", "围绕裁切、放置和生产操作进行沟通。"],
          ["吸酸性能", "根据电池设计和客户测试方法确认。"],
          ["电阻", "结合目标性能和约定测试条件沟通。"],
          ["样品评估", "即使参数未完全确定，也可以先开始样品沟通。"]
        ]
      },
      forms: {
        eyebrow: "产品形式",
        title: "面向紧凑型电池装配的隔板形式",
        items: [
          [
            "用于装配试样的预裁切片材",
            "片材可支持摩托车电池型号评估和样品装配沟通。",
            "/images/sheets1-900.webp",
            "用于摩托车电池装配的 AGM 隔板片材",
            900,
            675
          ],
          [
            "用于厂内裁切的卷材",
            "卷材供应可支持客户按电池型号自行裁切隔板材料。",
            "/images/viking-finished-separator-roll-900.webp",
            "用于摩托车电池生产的 AGM 隔板卷材",
            900,
            675
          ],
          [
            "摩托车启动电池应用",
            "用于紧凑型摩托车 VRLA 电池隔板采购的应用图片位。",
            "/images/applications/motorcycle-vrla-battery-application-1200.webp",
            "摩托车 VRLA 电池应用沟通",
            1200,
            900
          ],
          [
            "片材边缘与细节评估",
            "片材细节可在样品和规格确认时评估。",
            "/images/evidence/agm-separator-sheets-detail-01.webp",
            "摩托车电池隔板片材细节沟通",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "摩托车电池用途",
        title: "买家常见沟通的启动电池方向",
        items: ["摩托车启动电池", "踏板车电池", "紧凑型 VRLA 电池", "小型发动机电池", "替换电池生产", "样品型号开发"]
      },
      quality: {
        eyebrow: "质量关注点",
        title: "紧凑型电池项目需要关注尺寸和操作表现",
        text:
          "摩托车电池隔板沟通常从尺寸、操作和样品确认开始。最终检测项目应以客户要求为准。",
        cards: [
          ["尺寸评估", "片材高度、宽度或卷材宽度应匹配电池型号需求。"],
          ["操作评估", "可沟通隔板在裁切和装配过程中的状态。"],
          ["检测沟通", "厚度、吸酸和电阻可结合目标要求评估。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看 VRLA、产品和质量信息",
        items: [
          ["VRLA 电池应用", "/zh/applications/agm-separator-for-vrla-battery/"],
          ["AGM 隔板片材", "/zh/products/agm-separator-sheets/"],
          ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
          ["AGM 隔板产品", "/zh/products/agm-separator/"],
          ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送摩托车电池隔板需求",
        text:
          "先留下联系方式即可，我们会协助确认适合摩托车电池生产或样品的 AGM 隔板形式。",
        checklist: ["摩托车电池型号", "已有片材尺寸或卷材宽度", "样品需求", "试产或生产数量"],
        placeholder: "可选：摩托车电池型号、片材尺寸、卷材宽度、样品需求或技术问题",
        submit: "提交联系方式",
        submitting: "发送中...",
        required: "请先填写姓名和微信或手机号。",
        success: "感谢您留下联系方式，我们会尽快联系您确认 AGM 隔板需求。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已为您打开邮件客户端并填入联系方式，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorEnergyStorageApplication: {
    en: {
      homePath: "/",
      languagePath: "/zh/applications/agm-separator-for-energy-storage-battery/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "Energy Storage Battery Application",
        title: "AGM Separator for Lead-Acid Energy Storage Batteries",
        subtitle:
          "AGM separator discussion for lead-acid energy storage, backup power and reserve power VRLA battery projects.",
        primary: "Discuss Energy Storage Battery Needs",
        secondary: "Send Contact Information",
        proof: ["Backup energy storage", "Stable supply discussion", "Quality review support"],
        image: {
          src: "/images/applications/energy-storage-lead-acid-battery-application-1200.webp",
          alt: "AGM separator discussion for lead-acid energy storage battery applications",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Application Focus",
        title: "Energy storage battery projects need stable separator communication",
        paragraphs: [
          "Lead-acid energy storage and backup power battery projects often require repeated supply, stable specification communication and quality review before sample or order confirmation.",
          "Separator discussion should consider battery design, operating conditions, expected testing items and whether the customer needs roll material, sheet pieces or custom size support.",
          "If the target specification is not final, leave your contact first. We will help confirm the useful information for AGM separator sample or quotation discussion."
        ]
      },
      parameters: {
        eyebrow: "Specification Discussion",
        title: "Key points for energy storage battery separator sourcing",
        text:
          "Energy storage lead-acid battery projects should align separator requirements with battery structure, production workflow and customer quality expectations.",
        items: [
          ["Thickness and basis weight", "Reviewed with battery structure, compression and electrolyte retention needs."],
          ["Acid absorption", "Discussed according to customer testing method and battery design."],
          ["Electrical resistance", "Confirmed together with performance goals and agreed test conditions."],
          ["Consistency", "Important for buyers planning repeated or project-based supply."],
          ["Roll or sheet format", "Selected according to production workflow, cutting and assembly needs."],
          ["Packing and shipment", "Export packing and batch delivery requirements can be discussed before order."]
        ]
      },
      forms: {
        eyebrow: "Product Format",
        title: "Separator supply for backup and storage battery projects",
        items: [
          [
            "Roll supply for repeated production",
            "AGM separator rolls can support customers that need in-house cutting and steady production planning.",
            "/images/evidence/agm-separator-roll-warehouse-01.webp",
            "AGM separator roll supply for energy storage battery production",
            1200,
            900
          ],
          [
            "Sheet supply for samples and assembly",
            "Pre-cut sheets can support battery model review, sample comparison and trial assembly.",
            "/images/sheets1-900.webp",
            "AGM separator sheets for energy storage battery samples",
            900,
            675
          ],
          [
            "Energy storage battery application",
            "Application image slot for lead-acid energy storage and backup power battery separator sourcing.",
            "/images/applications/energy-storage-lead-acid-battery-application-1200.webp",
            "Lead-acid energy storage battery application discussion",
            1200,
            900
          ],
          [
            "Packing and shipment preparation",
            "Packing method and export shipment preparation can be discussed before order arrangement.",
            "/images/evidence/shipping-pallet-01.webp",
            "AGM separator packing for energy storage battery projects",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Energy Storage Uses",
        title: "Common backup and reserve power directions buyers discuss",
        items: ["Lead-acid energy storage batteries", "Backup power batteries", "Reserve power systems", "Telecom backup power", "Solar backup lead-acid batteries", "Industrial standby batteries"]
      },
      quality: {
        eyebrow: "Quality Considerations",
        title: "Stable supply should be supported by clear quality discussion",
        text:
          "Energy storage battery projects may require consistency across batches. Test items and acceptance values should be confirmed according to customer standards.",
        cards: [
          ["Lot-to-lot discussion", "Repeated supply should keep agreed specification communication clear."],
          ["Testing requirements", "Thickness, basis weight, absorption and resistance can be reviewed as required."],
          ["Delivery planning", "Packing, quantity and shipment schedule can be discussed with the order plan."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with VRLA, product and quality details",
        items: [
          ["VRLA Battery Applications", "/applications/agm-separator-for-vrla-battery/"],
          ["AGM Separator Product", "/products/agm-separator/"],
          ["AGM Separator Rolls", "/products/agm-separator-rolls/"],
          ["AGM Separator Sheets", "/products/agm-separator-sheets/"],
          ["AGM Separator Testing", "/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your energy storage battery separator needs",
        text:
          "Leave your contact first. We will help confirm the suitable AGM separator specification for lead-acid energy storage or backup power projects.",
        checklist: ["Energy storage or backup power application", "Roll or sheet format", "Target specification if available", "Sample or order planning needs"],
        placeholder:
          "Optional: energy storage battery application, roll or sheet need, sample quantity, target specification or technical questions",
        submit: "Send Contact",
        submitting: "Sending...",
        required: "Please leave your name and contact information before submitting.",
        success:
          "Thank you. We will contact you soon to confirm your AGM separator requirements.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the contact details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/applications/agm-separator-for-energy-storage-battery/",
      quote: "获取报价",
      hero: {
        eyebrow: "储能电池应用",
        title: "用于铅酸储能电池的 AGM 隔板",
        subtitle:
          "面向铅酸储能、后备电源和备用电源 VRLA 电池项目，沟通 AGM 隔板卷材、片材和规格要求。",
        primary: "沟通储能电池需求",
        secondary: "留下联系方式",
        proof: ["后备储能应用", "稳定供应沟通", "质量评估支持"],
        image: {
          src: "/images/applications/energy-storage-lead-acid-battery-application-1200.webp",
          alt: "铅酸储能电池应用 AGM 隔板沟通",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "应用重点",
        title: "储能电池项目需要稳定的隔板规格沟通",
        paragraphs: [
          "铅酸储能和后备电源电池项目通常关注持续供货、稳定规格沟通和样品或订单前的质量评估。",
          "隔板沟通应结合电池设计、使用条件、预期检测项目，以及客户需要卷材、片材还是定制尺寸支持。",
          "如果目标规格还未最终确定，也可以先留下联系方式。我们会协助确认 AGM 隔板样品或报价沟通所需信息。"
        ]
      },
      parameters: {
        eyebrow: "规格沟通",
        title: "储能电池隔板采购的关键沟通点",
        text:
          "铅酸储能电池项目应结合电池结构、生产流程和客户质量期望确认隔板要求。",
        items: [
          ["厚度和克重", "结合电池结构、压缩和电解液保持需求评估。"],
          ["吸酸性能", "根据客户测试方法和电池设计沟通。"],
          ["电阻", "结合性能目标和约定测试条件确认。"],
          ["一致性", "对项目型或重复供应买家较为重要。"],
          ["卷材或片材形式", "根据生产流程、裁切和装配需求选择。"],
          ["包装和出运", "出口包装和批量交付要求可在订单前沟通。"]
        ]
      },
      forms: {
        eyebrow: "产品形式",
        title: "面向后备和储能电池项目的隔板供应",
        items: [
          [
            "面向持续生产的卷材供应",
            "AGM 隔板卷材可支持需要厂内裁切和稳定生产计划的客户。",
            "/images/evidence/agm-separator-roll-warehouse-01.webp",
            "用于储能电池生产的 AGM 隔板卷材供应",
            1200,
            900
          ],
          [
            "面向样品和装配的片材供应",
            "预裁切片材可支持电池型号评估、样品对比和试装配。",
            "/images/sheets1-900.webp",
            "用于储能电池样品的 AGM 隔板片材",
            900,
            675
          ],
          [
            "储能电池应用",
            "用于铅酸储能和后备电源电池隔板采购的应用图片位。",
            "/images/applications/energy-storage-lead-acid-battery-application-1200.webp",
            "铅酸储能电池应用沟通",
            1200,
            900
          ],
          [
            "包装与出运准备",
            "包装方式和出口发运准备可在订单安排前沟通。",
            "/images/evidence/shipping-pallet-01.webp",
            "储能电池项目 AGM 隔板包装",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "储能电池用途",
        title: "买家常见沟通的后备和备用电源方向",
        items: ["铅酸储能电池", "后备电源电池", "备用电源系统", "通信后备电源", "太阳能后备铅酸电池", "工业备用电池"]
      },
      quality: {
        eyebrow: "质量关注点",
        title: "稳定供应需要清晰的质量沟通支持",
        text:
          "储能电池项目可能关注不同批次的一致性。测试项目和验收值应根据客户标准确认。",
        cards: [
          ["批次沟通", "重复供应应保持约定规格沟通清晰。"],
          ["检测要求", "厚度、克重、吸酸和电阻可按要求评估。"],
          ["交付计划", "包装、数量和发运周期可结合订单计划沟通。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看 VRLA、产品和质量信息",
        items: [
          ["VRLA 电池应用", "/zh/applications/agm-separator-for-vrla-battery/"],
          ["AGM 隔板产品", "/zh/products/agm-separator/"],
          ["AGM 隔板卷材", "/zh/products/agm-separator-rolls/"],
          ["AGM 隔板片材", "/zh/products/agm-separator-sheets/"],
          ["AGM 隔板检测", "/zh/quality-control/agm-separator-testing/"]
        ]
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送储能电池隔板需求",
        text:
          "先留下联系方式即可，我们会协助确认适合铅酸储能或后备电源项目的 AGM 隔板规格。",
        checklist: ["储能或后备电源应用", "卷材或片材形式", "已有目标规格", "样品或订单计划"],
        placeholder: "可选：储能电池应用、卷材或片材需求、样品数量、目标规格或技术问题",
        submit: "提交联系方式",
        submitting: "发送中...",
        required: "请先填写姓名和微信或手机号。",
        success: "感谢您留下联系方式，我们会尽快联系您确认 AGM 隔板需求。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已为您打开邮件客户端并填入联系方式，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  },
  agmSeparatorTesting: {
    en: {
      homePath: "/",
      languagePath: "/zh/quality-control/agm-separator-testing/",
      quote: "Request a Quote",
      hero: {
        eyebrow: "Quality Control",
        title: "AGM Separator Testing and Quality Control",
        subtitle:
          "Quality starts with measurable parameters, clear customer requirements and stable production communication.",
        primary: "Discuss Test Requirements",
        secondary: "Request Sample Evaluation",
        proof: ["Measurable parameters", "Customer-specific requirements", "Sample support"],
        image: {
          src: "/images/agm-quality-control-1200.webp",
          alt: "AGM separator testing and quality control",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "Testing Overview",
        title: "Quality should be evaluated through inspection and measurable values",
        paragraphs: [
          "AGM separator quality should be evaluated through both appearance inspection and measurable technical parameters.",
          "A separator needs stable dimensions, suitable acid-related behavior, controlled electrical resistance and reliable mechanical properties for battery production.",
          "The exact test items and acceptable values should be confirmed according to the customer’s battery design and order requirements."
        ]
      },
      parameters: {
        eyebrow: "Test Items",
        title: "Common quality checks discussed before sample or order arrangement",
        text:
          "The following items are common quality communication directions for AGM separator buyers. Final testing requirements should follow customer standards.",
        items: [
          ["Thickness", "Dimensional stability supports plate spacing, compression and assembly consistency."],
          ["Basis weight", "Material weight and consistency help buyers evaluate batch stability."],
          ["Acid absorption", "Acid-related behavior should be reviewed with electrolyte retention and battery design needs."],
          ["Electrical resistance", "Resistance should be confirmed with battery performance targets and test conditions."],
          ["Porosity", "Porosity and pore structure can be discussed with separator function and electrolyte movement."],
          ["Appearance and moisture", "Surface condition, visible defects and moisture can be included in quality review."]
        ]
      },
      forms: {
        eyebrow: "Why It Matters",
        title: "Stable quality reduces assembly and long-term supply risk",
        items: [
          [
            "Specification communication",
            "Stable production and clear technical communication help overseas buyers reduce risk during battery assembly.",
            "/images/agm-quality-control-1200.webp",
            "AGM separator testing and quality control",
            1200,
            900
          ],
          [
            "Production follow-up",
            "Process control, sample evaluation and agreed test items support long-term supply communication.",
            "/images/agm-factory-capability-1200.webp",
            "AGM separator production follow-up",
            1200,
            900
          ],
          [
            "Thickness testing",
            "Additional evidence slot for thickness measurement and dimensional stability review.",
            "/images/evidence/quality-thickness-test-01.webp",
            "AGM separator thickness testing",
            1200,
            900
          ],
          [
            "Basis weight testing",
            "Additional evidence slot for basis weight, sample weight and batch consistency review.",
            "/images/evidence/quality-basis-weight-test-01.webp",
            "AGM separator basis weight testing",
            1200,
            900
          ],
          [
            "Acid absorption testing",
            "Additional evidence slot for acid absorption behavior and electrolyte-retention discussion.",
            "/images/evidence/quality-acid-absorption-test-01.webp",
            "AGM separator acid absorption testing",
            1200,
            900
          ],
          [
            "Electrical resistance testing",
            "Additional evidence slot for resistance testing and battery performance requirement review.",
            "/images/evidence/quality-electrical-resistance-test-01.webp",
            "AGM separator electrical resistance testing",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "Customer Requirements",
        title: "Quality checks should match battery design and order needs",
        items: [
          "Battery application",
          "Target test items",
          "Acceptance values",
          "Sample evaluation",
          "Technical standard review",
          "Order requirement confirmation"
        ]
      },
      quality: {
        eyebrow: "Documentation and Sample Support",
        title: "Confirm requirements before sample or order arrangement",
        text:
          "Quality checks can be performed according to customer requirements. Please confirm required test items before sample or order arrangement.",
        cards: [
          ["Sample evaluation", "Samples can be discussed with customer battery model and target requirements."],
          ["Technical standard review", "Customer standards help define test items and acceptable values."],
          ["Order communication", "Testing and document expectations should be confirmed before production."]
        ]
      },
      related: {
        eyebrow: "Related Pages",
        title: "Continue with product and quality details",
        items: commonRelated.en
      },
      inquiry: {
        eyebrow: "Inquiry",
        title: "Send your testing and quality requirements",
        text:
          "Please share the required test items, target values, battery application and sample needs so we can discuss quality control requirements with you.",
        checklist: [
          "Required test items",
          "Target values or technical standard",
          "Battery application",
          "Sample evaluation needs",
          "Supplier review requirements"
        ],
        placeholder:
          "Required test items, target values, battery application, sample needs and technical standard",
        submit: "Send Inquiry",
        submitting: "Sending...",
        required: "Please complete all required fields before submitting.",
        success:
          "Thank you. Your inquiry has been received. Our team will review it and respond soon.",
        failure:
          "Sorry, the inquiry could not be sent right now. Please try again later.",
        emailFallback:
          "Your email client has been opened with the inquiry details. Please send the email to complete your inquiry."
      },
      footer: footerCopy.en
    },
    zh: {
      homePath: "/zh/",
      languagePath: "/quality-control/agm-separator-testing/",
      quote: "获取报价",
      hero: {
        eyebrow: "质量控制",
        title: "AGM 隔板检测与质量控制",
        subtitle:
          "质量控制从可测量参数、清晰客户要求和稳定生产沟通开始。",
        primary: "沟通检测要求",
        secondary: "申请样品评估",
        proof: ["可测量参数", "按客户要求确认", "支持样品沟通"],
        image: {
          src: "/images/agm-quality-control-1200.webp",
          alt: "AGM 隔板检测与质量控制",
          width: 1200,
          height: 900
        }
      },
      overview: {
        eyebrow: "检测概览",
        title: "质量应通过外观检查和可测量参数共同评估",
        paragraphs: [
          "AGM 隔板质量应通过外观检查和可测量技术参数共同评估。",
          "隔板需要具备稳定尺寸、合适的吸酸相关表现、受控电阻和可靠机械性能，以满足电池生产需求。",
          "具体检测项目和接受值应根据客户电池设计与订单要求沟通确认。"
        ]
      },
      parameters: {
        eyebrow: "检测项目",
        title: "样品或订单安排前沟通常见质量项目",
        text:
          "以下项目是 AGM 隔板买家常见的质量沟通方向，最终检测要求应结合客户技术标准确认。",
        items: [
          ["厚度", "尺寸稳定性有助于极板间距、装配压力和生产一致性。"],
          ["克重", "材料质量和一致性有助于客户评估批次稳定性。"],
          ["吸酸 / 爬酸表现", "吸酸相关表现需结合电解液保持和电池设计需求评估。"],
          ["电阻", "电阻应结合电池性能目标和测试条件进行确认。"],
          ["孔隙率", "孔隙率和孔结构可结合电解液迁移和隔板功能沟通。"],
          ["外观与含水率", "表面状态、可见缺陷和含水情况可作为质量控制内容。"]
        ]
      },
      forms: {
        eyebrow: "参数意义",
        title: "稳定质量降低装配和长期供货风险",
        items: [
          [
            "规格沟通",
            "稳定生产和清晰技术沟通，有助于海外客户降低电池装配过程中的风险。",
            "/images/agm-quality-control-1200.webp",
            "AGM 隔板检测与质量控制",
            1200,
            900
          ],
          [
            "生产跟进",
            "过程控制、样品评估和约定检测项目支持连续供应沟通。",
            "/images/agm-factory-capability-1200.webp",
            "AGM 隔板生产过程跟进",
            1200,
            900
          ],
          [
            "厚度检测",
            "新增证据图片位，用于展示厚度测量和尺寸稳定性评估。",
            "/images/evidence/quality-thickness-test-01.webp",
            "AGM 隔板厚度检测",
            1200,
            900
          ],
          [
            "克重检测",
            "新增证据图片位，用于展示克重、样品称量和批次一致性评估。",
            "/images/evidence/quality-basis-weight-test-01.webp",
            "AGM 隔板克重检测",
            1200,
            900
          ],
          [
            "吸酸测试",
            "新增证据图片位，用于展示吸酸表现和电解液保持能力沟通。",
            "/images/evidence/quality-acid-absorption-test-01.webp",
            "AGM 隔板吸酸测试",
            1200,
            900
          ],
          [
            "电阻测试",
            "新增证据图片位，用于展示电阻测试和电池性能要求评估。",
            "/images/evidence/quality-electrical-resistance-test-01.webp",
            "AGM 隔板电阻测试",
            1200,
            900
          ]
        ]
      },
      applications: {
        eyebrow: "客户要求",
        title: "质量检查与电池设计和订单需求保持一致",
        items: [
          "电池应用",
          "目标检测项目",
          "接受值要求",
          "样品评估",
          "技术标准审核",
          "订单要求确认"
        ]
      },
      quality: {
        eyebrow: "文件与样品支持",
        title: "样品或订单安排前完成要求确认",
        text:
          "质量检查可按客户要求执行，所需检测项目应在样品或订单安排前确认。",
        cards: [
          ["样品评估", "样品可结合客户电池型号和目标要求进行沟通。"],
          ["技术标准审核", "客户提供的技术标准有助于定义检测项目和接受值。"],
          ["订单沟通", "检测和文件期望应在生产前确认。"]
        ]
      },
      related: {
        eyebrow: "相关页面",
        title: "继续查看产品和质量信息",
        items: commonRelated.zh
      },
      inquiry: {
        eyebrow: "询盘",
        title: "发送检测与质量要求",
        text:
          "请提供所需检测项目、目标值、电池应用和样品需求，便于我们与您沟通质量控制要求。",
        checklist: [
          "所需检测项目",
          "目标值或技术标准",
          "电池应用",
          "样品评估需求",
          "订单或供应商审核要求"
        ],
        placeholder: "检测项目、目标值、电池应用、样品需求和技术标准",
        submit: "发送询盘",
        submitting: "发送中...",
        required: "请完整填写必填字段后再提交。",
        success: "感谢您的询盘。我们已收到信息，将尽快查看并回复。",
        failure: "抱歉，询盘暂时未能发送，请稍后再试。",
        emailFallback:
          "已打开邮件客户端并填入询盘内容，请发送邮件完成询盘。"
      },
      footer: footerCopy.zh
    }
  }
};

const viContent: Partial<Record<ProductPageKind, ProductContent>> = {
  agmSeparator: {
    homePath: "/vi/",
    languagePath: "/products/agm-separator/",
    quote: "Yêu cầu báo giá",
    hero: {
      eyebrow: "Sản phẩm tấm ngăn AGM",
      title: "Tấm ngăn sợi thủy tinh AGM cho ắc quy VRLA",
      subtitle:
        "Tấm ngăn AGM dạng cuộn hoặc tấm cho các nhà sản xuất và đối tác thương mại ắc quy axit-chì VRLA.",
      primary: "Yêu cầu mẫu tấm ngăn AGM",
      secondary: "Gửi quy cách cần thiết",
      proof: [
        "Trao đổi dạng cuộn và tấm",
        "Xác nhận theo yêu cầu khách hàng",
        "Liên hệ trực tiếp với nhà máy"
      ],
      image: {
        src: "/images/viking-finished-separator-roll-900.webp",
        alt: "Cuộn tấm ngăn sợi thủy tinh AGM thành phẩm",
        width: 900,
        height: 675
      }
    },
    overview: {
      eyebrow: "Tổng quan sản phẩm",
      title: "Vật liệu tấm ngăn gắn với thiết kế và hiệu suất ắc quy",
      paragraphs: [
        "Tấm ngăn AGM là vật liệu sợi thủy tinh dùng trong ắc quy axit-chì VRLA. Vật liệu giúp cách ly bản cực dương và âm, đồng thời giữ chất điện phân trong cấu trúc ắc quy.",
        "Đối với nhà sản xuất ắc quy, lựa chọn tấm ngăn liên quan đến thiết kế bản cực, khả năng giữ điện phân, điện trở trong, quy trình lắp ráp và hiệu suất lâu dài.",
        "Chúng tôi cung cấp dạng cuộn và tấm. Độ dày, chiều rộng, kích thước tấm và đóng gói có thể được trao đổi theo thiết kế ắc quy và quy trình sản xuất."
      ]
    },
    parameters: {
      eyebrow: "Thông số chính",
      title: "Các thông số người mua thường cần xác nhận",
      text:
        "Việc lựa chọn tấm ngăn AGM cho ắc quy VRLA thường xem xét đồng thời độ dày, chiều rộng, định lượng, khả năng hút axit, điện trở và độ bền thao tác.",
      items: [
        ["Độ dày", "Cần được xem xét cùng khoảng cách bản cực, độ nén và yêu cầu lắp ráp."],
        ["Chiều rộng hoặc kích thước tấm", "Có thể trao đổi chiều rộng cuộn, hướng xẻ hoặc kích thước cắt sẵn."],
        ["Định lượng", "Được đánh giá cùng cấu trúc vật liệu, khả năng giữ điện phân và phương pháp thử."],
        ["Khả năng hút axit", "Xác nhận theo ứng dụng, nhu cầu giữ điện phân và điều kiện thử đã thống nhất."],
        ["Điện trở", "Xem xét với mục tiêu hiệu suất ắc quy và điều kiện thử."],
        ["Độ rỗng và độ bền", "Có thể kiểm tra theo nhu cầu gia công, cắt và lắp ráp."]
      ]
    },
    forms: {
      eyebrow: "Dạng sản phẩm",
      title: "Có thể trao đổi quy cách dạng cuộn và dạng tấm",
      items: [
        [
          "Tấm ngăn AGM dạng cuộn",
          "Có thể trao đổi độ dày, chiều rộng, đường kính cuộn, cách đóng gói và kế hoạch sản xuất.",
          "/images/viking-finished-separator-roll-900.webp",
          "Cuộn tấm ngăn AGM thành phẩm",
          900,
          675
        ],
        [
          "Tấm ngăn AGM dạng tấm",
          "Tấm cắt sẵn hỗ trợ đánh giá mẫu, xác nhận quy cách và yêu cầu lắp ráp.",
          "/images/viking-separator-sheets-900.webp",
          "Tấm ngăn AGM cắt sẵn",
          900,
          675
        ],
        [
          "Theo dõi sản xuất",
          "Hình ảnh nguyên liệu và dây chuyền giúp trao đổi cụ thể hơn về quá trình sản xuất.",
          "/images/evidence/factory-raw-material-feed-01.webp",
          "Nguyên liệu tấm ngăn AGM vào dây chuyền",
          1200,
          900
        ],
        [
          "Chuẩn bị đóng gói và giao hàng",
          "Có thể xem xét cách đóng gói, pallet và chuẩn bị xuất hàng.",
          "/images/evidence/shipping-pallet-01.webp",
          "Đóng gói và chuẩn bị giao tấm ngăn AGM",
          1200,
          900
        ]
      ]
    },
    applications: {
      eyebrow: "Ứng dụng",
      title: "Dùng cho các phân khúc ắc quy axit-chì VRLA chính",
      items: [
        "Ắc quy UPS",
        "Nguồn dự phòng viễn thông",
        "Ắc quy xe máy",
        "Ắc quy khởi động ô tô",
        "Ắc quy lưu trữ năng lượng"
      ]
    },
    quality: {
      eyebrow: "Ghi chú chất lượng",
      title: "Hạng mục kiểm tra theo yêu cầu đã xác nhận",
      text:
        "Hạng mục thử nghiệm và giá trị chấp nhận cần được hai bên xác nhận trước khi sản xuất và giao hàng.",
      cards: [
        ["Kiểm tra đầu vào và quy trình", "Tình trạng vật liệu và quy trình có thể được xem xét khi trao đổi đơn hàng."],
        ["Kiểm tra thành phẩm", "Các thông số thành phẩm được kiểm tra theo hạng mục đã thống nhất."],
        ["Xác nhận yêu cầu", "Giá trị chấp nhận cần được xác nhận trước khi sản xuất."]
      ]
    },
    related: {
      eyebrow: "Trang liên quan",
      title: "Tiếp tục xem ứng dụng và yêu cầu mẫu",
      items: commonRelated.vi
    },
    inquiry: {
      eyebrow: "Yêu cầu",
      title: "Gửi yêu cầu tấm ngăn AGM của bạn",
      text:
        "Nếu bạn đang phát triển mẫu ắc quy mới hoặc đánh giá nhà cung cấp, hãy gửi độ dày, chiều rộng, dạng cuộn hoặc tấm và ứng dụng.",
      checklist: [
        "Độ dày và chiều rộng mục tiêu",
        "Dạng cuộn hoặc kích thước tấm",
        "Ứng dụng và mẫu ắc quy",
        "Số lượng và yêu cầu mẫu",
        "Yêu cầu thử nghiệm hoặc đóng gói"
      ],
      placeholder:
        "Độ dày, chiều rộng, dạng cuộn hoặc tấm, số lượng, yêu cầu mẫu và thử nghiệm",
      submit: "Gửi yêu cầu",
      submitting: "Đang gửi...",
      required: "Vui lòng nhập họ tên và thông tin liên hệ.",
      success: "Cảm ơn bạn. Chúng tôi sẽ xem xét và liên hệ lại.",
      failure: "Hiện không thể gửi yêu cầu. Vui lòng thử lại sau.",
      emailFallback:
        "Ứng dụng email đã được mở với nội dung yêu cầu. Vui lòng gửi email để hoàn tất."
    },
    footer: footerCopy.vi
  },
  agmSeparatorMotorcycleApplication: {
    homePath: "/vi/",
    languagePath: "/applications/agm-separator-for-motorcycle-battery/",
    quote: "Yêu cầu báo giá",
    hero: {
      eyebrow: "Ứng dụng ắc quy xe máy",
      title: "Tấm ngăn AGM cho ắc quy khởi động xe máy",
      subtitle:
        "Trao đổi tấm ngăn AGM cho ắc quy VRLA xe máy có cấu trúc nhỏ gọn, bao gồm dạng cuộn, dạng tấm và yêu cầu mẫu.",
      primary: "Trao đổi nhu cầu ắc quy xe máy",
      secondary: "Gửi thông tin liên hệ",
      proof: [
        "Ứng dụng ắc quy khởi động",
        "Đối chiếu kích thước nhỏ gọn",
        "Hỗ trợ trao đổi mẫu"
      ],
      image: {
        src: "/images/applications/motorcycle-vrla-battery-application-1200.webp",
        alt: "Tấm ngăn AGM cho ứng dụng ắc quy xe máy",
        width: 1200,
        height: 900
      }
    },
    overview: {
      eyebrow: "Trọng tâm ứng dụng",
      title: "Ắc quy xe máy cần đối chiếu tấm ngăn theo cấu trúc nhỏ gọn",
      paragraphs: [
        "Ắc quy khởi động xe máy thường có cấu trúc bên trong nhỏ gọn. Yêu cầu tấm ngăn cần được xác nhận theo kích thước bản cực, phương pháp lắp ráp và mẫu ắc quy.",
        "Người mua thường trao đổi về độ dày, kích thước tấm hoặc chiều rộng cuộn, độ bền thao tác, khả năng hút axit và điện trở.",
        "Nếu mẫu ắc quy cuối cùng vẫn đang được xem xét, bạn có thể gửi thông tin liên hệ trước để xác nhận dữ liệu cần thiết cho mẫu hoặc báo giá."
      ]
    },
    parameters: {
      eyebrow: "Trao đổi quy cách",
      title: "Điểm cần xác nhận khi mua tấm ngăn cho ắc quy xe máy",
      text:
        "Yêu cầu cần được xem xét cùng mẫu ắc quy, thiết kế bản cực và quy trình lắp ráp của khách hàng.",
      items: [
        ["Kích thước tấm hoặc chiều rộng cuộn", "Xác nhận theo thiết kế nhỏ gọn và quy trình cắt."],
        ["Độ dày", "Xem xét theo khoảng cách bản cực, độ nén và nhu cầu lắp ráp."],
        ["Độ bền thao tác", "Trao đổi cho quá trình cắt, đặt tấm và sản xuất."],
        ["Khả năng hút axit", "Xác nhận theo thiết kế ắc quy và phương pháp thử."],
        ["Điện trở", "Trao đổi theo mục tiêu hiệu suất và điều kiện thử."],
        ["Đánh giá mẫu", "Có thể bắt đầu trao đổi mẫu trước khi hoàn thiện mọi thông số."]
      ]
    },
    forms: {
      eyebrow: "Dạng sản phẩm",
      title: "Dạng tấm ngăn cho lắp ráp ắc quy nhỏ gọn",
      items: [
        [
          "Tấm cắt sẵn cho lắp ráp thử",
          "Tấm cắt sẵn hỗ trợ đánh giá mẫu ắc quy xe máy và lắp ráp thử.",
          "/images/sheets1-900.webp",
          "Tấm ngăn AGM cho lắp ráp ắc quy xe máy",
          900,
          675
        ],
        [
          "Cuộn cho khách hàng tự cắt",
          "Dạng cuộn phù hợp với khách hàng cắt vật liệu theo nhu cầu mẫu ắc quy.",
          "/images/viking-finished-separator-roll-900.webp",
          "Cuộn tấm ngăn AGM cho sản xuất ắc quy xe máy",
          900,
          675
        ],
        [
          "Ứng dụng ắc quy khởi động xe máy",
          "Hình ảnh ứng dụng hỗ trợ trao đổi về cấu trúc ắc quy VRLA nhỏ gọn.",
          "/images/applications/motorcycle-vrla-battery-application-1200.webp",
          "Ứng dụng ắc quy xe máy VRLA",
          1200,
          900
        ],
        [
          "Chi tiết mép tấm",
          "Chi tiết tấm có thể được xem xét trong quá trình xác nhận mẫu và quy cách.",
          "/images/evidence/agm-separator-sheets-detail-01.webp",
          "Chi tiết tấm ngăn AGM cho ắc quy xe máy",
          1200,
          900
        ]
      ]
    },
    applications: {
      eyebrow: "Ứng dụng xe máy",
      title: "Các hướng ắc quy khởi động thường được trao đổi",
      items: [
        "Ắc quy khởi động xe máy",
        "Ắc quy xe tay ga",
        "Ắc quy VRLA nhỏ gọn",
        "Ắc quy động cơ nhỏ",
        "Sản xuất ắc quy thay thế",
        "Phát triển mẫu thử"
      ]
    },
    quality: {
      eyebrow: "Yếu tố chất lượng",
      title: "Dự án nhỏ gọn cần xem xét kỹ kích thước và thao tác",
      text:
        "Trao đổi thường bắt đầu từ kích thước, khả năng thao tác và xác nhận mẫu. Hạng mục thử nghiệm cuối cùng theo yêu cầu khách hàng.",
      cards: [
        ["Xem xét kích thước", "Chiều dài, chiều rộng tấm hoặc chiều rộng cuộn cần phù hợp mẫu ắc quy."],
        ["Xem xét thao tác", "Có thể trao đổi tình trạng tấm ngăn trong quá trình cắt và lắp ráp."],
        ["Trao đổi thử nghiệm", "Độ dày, khả năng hút axit và điện trở được xem xét theo yêu cầu mục tiêu."]
      ]
    },
    related: {
      eyebrow: "Trang liên quan",
      title: "Tiếp tục xem sản phẩm và yêu cầu mẫu",
      items: commonRelated.vi
    },
    inquiry: {
      eyebrow: "Yêu cầu",
      title: "Gửi nhu cầu tấm ngăn cho ắc quy xe máy",
      text:
        "Để lại thông tin liên hệ. Chúng tôi sẽ hỗ trợ xác nhận dạng AGM phù hợp cho sản xuất hoặc thử mẫu ắc quy xe máy.",
      checklist: [
        "Mẫu ắc quy xe máy",
        "Kích thước tấm hoặc chiều rộng cuộn nếu có",
        "Yêu cầu mẫu",
        "Số lượng thử hoặc sản xuất"
      ],
      placeholder:
        "Không bắt buộc: mẫu ắc quy, kích thước tấm, chiều rộng cuộn, yêu cầu mẫu hoặc câu hỏi kỹ thuật",
      submit: "Gửi thông tin liên hệ",
      submitting: "Đang gửi...",
      required: "Vui lòng nhập họ tên và thông tin liên hệ.",
      success: "Cảm ơn bạn. Chúng tôi sẽ liên hệ để xác nhận yêu cầu.",
      failure: "Hiện không thể gửi yêu cầu. Vui lòng thử lại sau.",
      emailFallback:
        "Ứng dụng email đã được mở với thông tin liên hệ. Vui lòng gửi email để hoàn tất."
    },
    footer: footerCopy.vi
  }
};

const koContent: Partial<Record<ProductPageKind, ProductContent>> = {
  agmSeparator: {
    homePath: "/ko/",
    languagePath: "/",
    quote: "샘플 요청",
    hero: {
      eyebrow: "AGM 분리막 제품",
      title: "VRLA 납축전지용 유리섬유 AGM 분리막",
      subtitle:
        "VRLA 납축전지 제조업체와 무역 파트너를 위한 롤 및 시트 형태의 AGM 분리막.",
      primary: "AGM 분리막 샘플 요청",
      secondary: "사양 정보 보내기",
      proof: ["롤 및 시트 협의", "고객 요구사항 검토", "공장과 직접 소통"],
      image: {
        src: "/images/viking-finished-separator-roll-900.webp",
        alt: "완성된 AGM 유리섬유 분리막 롤",
        width: 900,
        height: 675
      }
    },
    overview: {
      eyebrow: "제품 개요",
      title: "배터리 설계와 성능에 연결되는 분리막 소재",
      paragraphs: [
        "AGM 분리막은 VRLA 납축전지에 사용되는 유리섬유 소재입니다. 양극과 음극을 분리하면서 전해액을 배터리 구조 내부에 유지합니다.",
        "배터리 제조업체의 분리막 선택은 극판 설계, 전해액 유지, 내부 저항, 조립 공정 및 장기 성능과 관련됩니다.",
        "롤과 시트 형태를 공급합니다. 두께, 폭, 시트 크기와 포장은 배터리 설계 및 생산 공정에 따라 협의할 수 있습니다."
      ]
    },
    parameters: {
      eyebrow: "주요 사양",
      title: "구매자가 일반적으로 확인하는 항목",
      text:
        "VRLA 배터리용 AGM 분리막은 두께, 폭, 평량, 산 흡수 성능, 전기 저항과 취급 강도를 함께 검토해야 합니다.",
      items: [
        ["두께", "극판 간격, 압축 조건과 조립 요구사항을 함께 검토합니다."],
        ["폭 또는 시트 크기", "롤 폭, 슬리팅 방향 또는 사전 절단 치수를 협의할 수 있습니다."],
        ["평량", "소재 구조, 전해액 유지 성능과 시험 방법을 함께 검토합니다."],
        ["산 흡수 성능", "적용 분야, 전해액 유지 요구와 합의된 시험 조건에 따라 확인합니다."],
        ["전기 저항", "배터리 성능 목표 및 시험 조건과 함께 검토합니다."],
        ["기공률 및 강도", "가공, 절단 및 조립 요구사항에 따라 확인할 수 있습니다."]
      ]
    },
    forms: {
      eyebrow: "제품 형태",
      title: "롤 및 시트 사양 협의",
      items: [
        ["AGM 분리막 롤", "두께, 폭, 롤 지름, 포장 및 생산 계획을 협의할 수 있습니다.", "/images/viking-finished-separator-roll-900.webp", "완성된 AGM 분리막 롤", 900, 675],
        ["AGM 분리막 시트", "사전 절단 시트는 샘플 평가, 사양 확인과 조립 검토를 지원합니다.", "/images/viking-separator-sheets-900.webp", "사전 절단 AGM 분리막 시트", 900, 675],
        ["생산 공정 확인", "원료와 생산 라인 이미지를 바탕으로 제조 공정을 구체적으로 협의합니다.", "/images/evidence/factory-raw-material-feed-01.webp", "AGM 분리막 원료 투입 공정", 1200, 900],
        ["포장 및 출하 준비", "포장 방식, 팔레트와 출하 준비를 주문 전에 검토할 수 있습니다.", "/images/evidence/shipping-pallet-01.webp", "AGM 분리막 포장 및 출하 준비", 1200, 900]
      ]
    },
    applications: {
      eyebrow: "적용 분야",
      title: "주요 VRLA 납축전지 적용 분야",
      items: ["UPS 배터리", "통신 백업 전원", "오토바이 배터리", "자동차 시동 배터리", "에너지 저장 배터리"]
    },
    quality: {
      eyebrow: "품질 확인",
      title: "합의된 요구사항에 따른 검사",
      text: "시험 항목과 허용 기준은 생산 및 출하 전에 양측이 확인해야 합니다.",
      cards: [
        ["원료 및 공정 검사", "주문 협의 시 소재 상태와 공정 관리 항목을 검토할 수 있습니다."],
        ["완제품 검사", "합의된 항목에 따라 완제품 사양을 검사합니다."],
        ["요구사항 확인", "생산 전에 시험 방법과 허용 기준을 확인합니다."]
      ]
    },
    related: {
      eyebrow: "관련 페이지",
      title: "제품 및 샘플 요청 보기",
      items: commonRelated.ko
    },
    inquiry: {
      eyebrow: "문의",
      title: "AGM 분리막 요구사항을 보내 주세요",
      text: "새 배터리 샘플을 개발하거나 공급업체를 평가 중이라면 두께, 폭, 롤·시트 형태와 적용 분야를 알려 주세요.",
      checklist: ["목표 두께와 폭", "롤 또는 시트 크기", "배터리 적용 분야와 모델", "수량 및 샘플 요구", "시험 또는 포장 요구사항"],
      placeholder: "두께, 폭, 롤 또는 시트 형태, 수량, 샘플 및 시험 요구사항",
      submit: "요구사항 보내기",
      submitting: "전송 중...",
      required: "이름과 연락처를 입력해 주세요.",
      success: "감사합니다. 내용을 검토한 후 연락드리겠습니다.",
      failure: "현재 요청을 전송할 수 없습니다. 잠시 후 다시 시도해 주세요.",
      emailFallback: "이메일 프로그램이 열렸습니다. 준비된 이메일을 전송해 주세요."
    },
    footer: footerCopy.ko
  }
};

const jaContent: Partial<Record<ProductPageKind, ProductContent>> = {
  agmSeparator: {
    homePath: "/ja/",
    languagePath: "/",
    quote: "サンプル依頼",
    hero: {
      eyebrow: "AGMセパレーター製品",
      title: "VRLA鉛蓄電池用ガラス繊維AGMセパレーター",
      subtitle:
        "VRLA鉛蓄電池メーカーと商社向けのロール・シート形状AGMセパレーター。",
      primary: "AGMセパレーターのサンプル依頼",
      secondary: "仕様情報を送る",
      proof: ["ロール・シート対応", "顧客要件の確認", "工場との直接連絡"],
      image: {
        src: "/images/viking-finished-separator-roll-900.webp",
        alt: "完成したAGMガラス繊維セパレーターロール",
        width: 900,
        height: 675
      }
    },
    overview: {
      eyebrow: "製品概要",
      title: "バッテリー設計と性能に関わるセパレーター材料",
      paragraphs: [
        "AGMセパレーターはVRLA鉛蓄電池に使用するガラス繊維材料です。正極と負極を隔離しながら、電解液をバッテリー内部に保持します。",
        "セパレーター選定は極板設計、電解液保持、内部抵抗、組立工程、長期性能に関係します。",
        "ロールとシート形状を供給します。厚さ、幅、シート寸法、梱包はバッテリー設計と生産工程に応じて協議できます。"
      ]
    },
    parameters: {
      eyebrow: "主要仕様",
      title: "購買時に確認される主な項目",
      text:
        "VRLAバッテリー用AGMセパレーターは、厚さ、幅、坪量、吸液性能、電気抵抗、取扱強度をあわせて確認します。",
      items: [
        ["厚さ", "極板間隔、圧縮条件、組立要件とあわせて確認します。"],
        ["幅・シート寸法", "ロール幅、スリット方向、カット済み寸法を協議できます。"],
        ["坪量", "材料構造、電解液保持性能、試験方法とあわせて評価します。"],
        ["吸液性能", "用途、電解液保持要件、合意した試験条件に基づいて確認します。"],
        ["電気抵抗", "バッテリー性能目標と試験条件にあわせて確認します。"],
        ["空隙率・強度", "加工、裁断、組立要件に応じて確認できます。"]
      ]
    },
    forms: {
      eyebrow: "製品形状",
      title: "ロール・シート仕様に対応",
      items: [
        ["AGMセパレーター ロール", "厚さ、幅、ロール径、梱包、生産計画を協議できます。", "/images/viking-finished-separator-roll-900.webp", "完成したAGMセパレーターロール", 900, 675],
        ["AGMセパレーター シート", "カット済みシートはサンプル評価、仕様確認、組立確認に使用できます。", "/images/viking-separator-sheets-900.webp", "カット済みAGMセパレーターシート", 900, 675],
        ["生産工程の確認", "原料と生産ラインの写真をもとに製造工程を具体的に確認できます。", "/images/evidence/factory-raw-material-feed-01.webp", "AGMセパレーター原料の投入工程", 1200, 900],
        ["梱包・出荷準備", "梱包方法、パレット、出荷準備を注文前に確認できます。", "/images/evidence/shipping-pallet-01.webp", "AGMセパレーターの梱包と出荷準備", 1200, 900]
      ]
    },
    applications: {
      eyebrow: "用途",
      title: "主なVRLA鉛蓄電池用途",
      items: ["UPSバッテリー", "通信バックアップ電源", "二輪車用バッテリー", "自動車始動用バッテリー", "蓄電池"]
    },
    quality: {
      eyebrow: "品質確認",
      title: "合意した要件に基づく検査",
      text: "試験項目と受入基準は生産・出荷前に双方で確認します。",
      cards: [
        ["原料・工程検査", "受注協議時に材料状態と工程管理項目を確認できます。"],
        ["完成品検査", "合意した項目に基づいて完成品仕様を検査します。"],
        ["要件確認", "生産前に試験方法と受入基準を確認します。"]
      ]
    },
    related: {
      eyebrow: "関連ページ",
      title: "製品とサンプル依頼を確認",
      items: commonRelated.ja
    },
    inquiry: {
      eyebrow: "お問い合わせ",
      title: "AGMセパレーター要件をお送りください",
      text: "新しいバッテリーサンプルの開発やサプライヤー評価では、厚さ、幅、ロール・シート形状、用途をお知らせください。",
      checklist: ["目標厚さ・幅", "ロールまたはシート寸法", "バッテリー用途・型式", "数量・サンプル要件", "試験・梱包要件"],
      placeholder: "厚さ、幅、ロールまたはシート形状、数量、サンプル・試験要件",
      submit: "要件を送信",
      submitting: "送信中...",
      required: "お名前と連絡先を入力してください。",
      success: "ありがとうございます。内容を確認してご連絡します。",
      failure: "現在リクエストを送信できません。しばらくしてから再度お試しください。",
      emailFallback: "メールアプリを開きました。作成済みのメールを送信してください。"
    },
    footer: footerCopy.ja
  }
};

const additionalAgmContent: Record<"es" | "pt" | "ru", ProductContent> = {
  es: {
    homePath: "/es/",
    languagePath: "/",
    quote: "Solicitar muestra",
    hero: {
      eyebrow: "Producto separador AGM",
      title: "Separador AGM de fibra de vidrio para baterías VRLA",
      subtitle:
        "Separadores AGM en rollo o lámina para fabricantes y socios comerciales de baterías VRLA de plomo-ácido.",
      primary: "Solicitar muestras de separador AGM",
      secondary: "Enviar especificaciones",
      proof: [
        "Formatos en rollo y lámina",
        "Revisión según requisitos del cliente",
        "Comunicación directa con fábrica"
      ],
      image: {
        src: "/images/viking-finished-separator-roll-900.webp",
        alt: "Rollo terminado de separador AGM de fibra de vidrio",
        width: 900,
        height: 675
      }
    },
    overview: {
      eyebrow: "Descripción del producto",
      title: "Un material separador vinculado al diseño y rendimiento de la batería",
      paragraphs: [
        "El separador AGM es un material de fibra de vidrio utilizado en baterías VRLA de plomo-ácido. Separa las placas positiva y negativa y retiene el electrolito dentro de la estructura de la batería.",
        "Para un fabricante de baterías, la selección del separador está relacionada con el diseño de placas, la retención de electrolito, la resistencia interna, el montaje y el rendimiento a largo plazo.",
        "Suministramos rollos y láminas. El espesor, ancho, tamaño de lámina y embalaje se revisan según el diseño de la batería y el proceso de producción."
      ]
    },
    parameters: {
      eyebrow: "Especificaciones clave",
      title: "Parámetros que el comprador suele confirmar",
      text:
        "La selección de un separador AGM para baterías VRLA requiere revisar en conjunto espesor, ancho, gramaje, absorción de ácido, resistencia eléctrica y resistencia de manipulación.",
      items: [
        ["Espesor", "Se revisa con la separación de placas, la compresión y los requisitos de montaje."],
        ["Ancho o tamaño de lámina", "Se pueden acordar ancho de rollo, dirección de corte o dimensiones precortadas."],
        ["Gramaje", "Se evalúa junto con la estructura, la retención de electrolito y el método de ensayo."],
        ["Absorción de ácido", "Se confirma según la aplicación y las condiciones de ensayo acordadas."],
        ["Resistencia eléctrica", "Se revisa con los objetivos de rendimiento y las condiciones de ensayo."],
        ["Porosidad y resistencia", "Se pueden comprobar según los requisitos de conversión, corte y montaje."]
      ]
    },
    forms: {
      eyebrow: "Formatos de producto",
      title: "Especificaciones disponibles en rollo y lámina",
      items: [
        ["Rollos AGM", "Se pueden revisar espesor, ancho, diámetro, embalaje y plan de producción.", "/images/viking-finished-separator-roll-900.webp", "Rollo terminado de separador AGM", 900, 675],
        ["Láminas AGM", "Las láminas precortadas facilitan muestras, confirmación de especificaciones y pruebas de montaje.", "/images/viking-separator-sheets-900.webp", "Láminas precortadas de separador AGM", 900, 675],
        ["Proceso de producción", "Las imágenes de materia prima y línea permiten una revisión más concreta del proceso.", "/images/evidence/factory-raw-material-feed-01.webp", "Alimentación de materia prima para separadores AGM", 1200, 900],
        ["Embalaje y despacho", "El método de embalaje, los pallets y la preparación de envío pueden revisarse antes del pedido.", "/images/evidence/shipping-pallet-01.webp", "Embalaje y preparación de envío de separadores AGM", 1200, 900]
      ]
    },
    applications: {
      eyebrow: "Aplicaciones",
      title: "Principales aplicaciones de baterías VRLA",
      items: ["Baterías UPS", "Respaldo de telecomunicaciones", "Baterías para motocicleta", "Baterías de arranque automotriz", "Almacenamiento de energía"]
    },
    quality: {
      eyebrow: "Revisión de calidad",
      title: "Inspección según requisitos acordados",
      text: "Las partidas de ensayo y los criterios de aceptación se confirman antes de producir y despachar.",
      cards: [
        ["Materia prima y proceso", "El estado del material y los puntos de control se revisan durante la consulta."],
        ["Producto terminado", "Las especificaciones finales se inspeccionan según los puntos acordados."],
        ["Confirmación de requisitos", "Los métodos de ensayo y criterios de aceptación se acuerdan antes de producir."]
      ]
    },
    related: {
      eyebrow: "Páginas relacionadas",
      title: "Ver producto y solicitud de muestra",
      items: commonRelated.es
    },
    inquiry: {
      eyebrow: "Consulta",
      title: "Envíe sus requisitos de separador AGM",
      text: "Para desarrollar una muestra o evaluar un proveedor, comparta espesor, ancho, formato en rollo o lámina y aplicación.",
      checklist: ["Espesor y ancho objetivo", "Rollo o tamaño de lámina", "Aplicación y modelo de batería", "Cantidad y requisitos de muestra", "Ensayo o embalaje"],
      placeholder: "Espesor, ancho, formato, cantidad, muestra y requisitos de ensayo",
      submit: "Enviar requisitos",
      submitting: "Enviando...",
      required: "Ingrese su nombre y datos de contacto.",
      success: "Gracias. Revisaremos la información y nos pondremos en contacto.",
      failure: "No se pudo enviar la solicitud. Inténtelo de nuevo más tarde.",
      emailFallback: "Se abrió su aplicación de correo. Envíe el mensaje preparado."
    },
    footer: footerCopy.es
  },
  pt: {
    homePath: "/pt/",
    languagePath: "/",
    quote: "Solicitar amostra",
    hero: {
      eyebrow: "Produto separador AGM",
      title: "Separador AGM de fibra de vidro para baterias VRLA",
      subtitle:
        "Separadores AGM em rolo ou folha para fabricantes e parceiros comerciais de baterias VRLA chumbo-ácido.",
      primary: "Solicitar amostras de separador AGM",
      secondary: "Enviar especificações",
      proof: ["Formatos em rolo e folha", "Análise conforme requisitos do cliente", "Contato direto com a fábrica"],
      image: {
        src: "/images/viking-finished-separator-roll-900.webp",
        alt: "Rolo acabado de separador AGM de fibra de vidro",
        width: 900,
        height: 675
      }
    },
    overview: {
      eyebrow: "Visão geral do produto",
      title: "Um material separador ligado ao projeto e ao desempenho da bateria",
      paragraphs: [
        "O separador AGM é um material de fibra de vidro usado em baterias VRLA chumbo-ácido. Ele separa as placas positiva e negativa e retém o eletrólito na estrutura da bateria.",
        "Para fabricantes de baterias, a seleção do separador está relacionada ao projeto das placas, retenção de eletrólito, resistência interna, montagem e desempenho de longo prazo.",
        "Fornecemos rolos e folhas. Espessura, largura, dimensões e embalagem são analisadas conforme o projeto da bateria e o processo produtivo."
      ]
    },
    parameters: {
      eyebrow: "Especificações principais",
      title: "Parâmetros que o comprador normalmente confirma",
      text:
        "A seleção de um separador AGM para baterias VRLA exige analisar em conjunto espessura, largura, gramatura, absorção de ácido, resistência elétrica e resistência ao manuseio.",
      items: [
        ["Espessura", "Analisada com espaçamento das placas, compressão e requisitos de montagem."],
        ["Largura ou dimensão da folha", "Podem ser definidos largura do rolo, direção de corte e tamanho pré-cortado."],
        ["Gramatura", "Avaliada com a estrutura, retenção de eletrólito e método de ensaio."],
        ["Absorção de ácido", "Confirmada conforme a aplicação e as condições de ensaio acordadas."],
        ["Resistência elétrica", "Analisada com os objetivos de desempenho e condições de ensaio."],
        ["Porosidade e resistência", "Podem ser verificadas conforme conversão, corte e montagem."]
      ]
    },
    forms: {
      eyebrow: "Formatos do produto",
      title: "Especificações em rolo e folha",
      items: [
        ["Rolos AGM", "Espessura, largura, diâmetro, embalagem e planejamento de produção podem ser analisados.", "/images/viking-finished-separator-roll-900.webp", "Rolo acabado de separador AGM", 900, 675],
        ["Folhas AGM", "Folhas pré-cortadas apoiam amostras, confirmação de especificações e testes de montagem.", "/images/viking-separator-sheets-900.webp", "Folhas pré-cortadas de separador AGM", 900, 675],
        ["Processo de produção", "Imagens de matéria-prima e da linha ajudam a tornar a análise do processo mais concreta.", "/images/evidence/factory-raw-material-feed-01.webp", "Alimentação de matéria-prima para separadores AGM", 1200, 900],
        ["Embalagem e expedição", "Método de embalagem, pallets e preparação do envio podem ser analisados antes do pedido.", "/images/evidence/shipping-pallet-01.webp", "Embalagem e preparação do envio de separadores AGM", 1200, 900]
      ]
    },
    applications: {
      eyebrow: "Aplicações",
      title: "Principais aplicações de baterias VRLA",
      items: ["Baterias UPS", "Backup de telecomunicações", "Baterias para motocicletas", "Baterias de partida automotiva", "Armazenamento de energia"]
    },
    quality: {
      eyebrow: "Análise de qualidade",
      title: "Inspeção conforme os requisitos acordados",
      text: "Os itens de ensaio e critérios de aceitação são confirmados antes da produção e expedição.",
      cards: [
        ["Matéria-prima e processo", "A condição do material e os pontos de controle são analisados durante a consulta."],
        ["Produto acabado", "As especificações finais são inspecionadas conforme os itens acordados."],
        ["Confirmação de requisitos", "Métodos de ensaio e critérios de aceitação são definidos antes da produção."]
      ]
    },
    related: {
      eyebrow: "Páginas relacionadas",
      title: "Veja o produto e solicite uma amostra",
      items: commonRelated.pt
    },
    inquiry: {
      eyebrow: "Consulta",
      title: "Envie seus requisitos de separador AGM",
      text: "Para desenvolver uma amostra ou avaliar um fornecedor, informe espessura, largura, formato em rolo ou folha e aplicação.",
      checklist: ["Espessura e largura desejadas", "Rolo ou dimensão da folha", "Aplicação e modelo de bateria", "Quantidade e amostras", "Ensaios ou embalagem"],
      placeholder: "Espessura, largura, formato, quantidade, amostra e requisitos de ensaio",
      submit: "Enviar requisitos",
      submitting: "Enviando...",
      required: "Informe seu nome e dados de contato.",
      success: "Obrigado. Analisaremos as informações e entraremos em contato.",
      failure: "Não foi possível enviar a solicitação. Tente novamente mais tarde.",
      emailFallback: "Seu aplicativo de e-mail foi aberto. Envie a mensagem preparada."
    },
    footer: footerCopy.pt
  },
  ru: {
    homePath: "/ru/",
    languagePath: "/",
    quote: "Запросить образец",
    hero: {
      eyebrow: "AGM-сепараторы",
      title: "Стекловолоконный AGM-сепаратор для аккумуляторов VRLA",
      subtitle:
        "AGM-сепараторы в рулонах и листах для производителей и торговых партнеров по свинцово-кислотным аккумуляторам VRLA.",
      primary: "Запросить образцы AGM-сепаратора",
      secondary: "Отправить характеристики",
      proof: ["Рулоны и листы", "Проверка требований заказчика", "Прямая связь с заводом"],
      image: {
        src: "/images/viking-finished-separator-roll-900.webp",
        alt: "Готовый рулон стекловолоконного AGM-сепаратора",
        width: 900,
        height: 675
      }
    },
    overview: {
      eyebrow: "О продукте",
      title: "Материал сепаратора, связанный с конструкцией и характеристиками аккумулятора",
      paragraphs: [
        "AGM-сепаратор — стекловолоконный материал для свинцово-кислотных аккумуляторов VRLA. Он разделяет положительные и отрицательные пластины и удерживает электролит внутри аккумулятора.",
        "Для производителя выбор сепаратора связан с конструкцией пластин, удержанием электролита, внутренним сопротивлением, сборкой и долговременной работой.",
        "Мы поставляем рулоны и листы. Толщина, ширина, размер листа и упаковка согласуются с конструкцией аккумулятора и производственным процессом."
      ]
    },
    parameters: {
      eyebrow: "Основные характеристики",
      title: "Параметры, которые обычно уточняет покупатель",
      text:
        "При выборе AGM-сепаратора для VRLA одновременно оценивают толщину, ширину, поверхностную плотность, поглощение кислоты, электрическое сопротивление и прочность при обработке.",
      items: [
        ["Толщина", "Рассматривается вместе с зазором пластин, сжатием и требованиями к сборке."],
        ["Ширина или размер листа", "Можно согласовать ширину рулона, направление резки и размеры листов."],
        ["Поверхностная плотность", "Оценивается вместе со структурой, удержанием электролита и методом испытаний."],
        ["Поглощение кислоты", "Подтверждается по применению и согласованным условиям испытаний."],
        ["Электрическое сопротивление", "Рассматривается с целевыми характеристиками и условиями испытаний."],
        ["Пористость и прочность", "Проверяются с учетом переработки, резки и сборки."]
      ]
    },
    forms: {
      eyebrow: "Формы поставки",
      title: "Характеристики рулонов и листов под заказ",
      items: [
        ["Рулоны AGM", "Можно согласовать толщину, ширину, диаметр рулона, упаковку и план производства.", "/images/viking-finished-separator-roll-900.webp", "Готовый рулон AGM-сепаратора", 900, 675],
        ["Листы AGM", "Предварительно нарезанные листы подходят для образцов, проверки спецификаций и сборки.", "/images/viking-separator-sheets-900.webp", "Нарезанные листы AGM-сепаратора", 900, 675],
        ["Производственный процесс", "Фотографии сырья и линии помогают предметно обсудить процесс изготовления.", "/images/evidence/factory-raw-material-feed-01.webp", "Подача сырья для AGM-сепараторов", 1200, 900],
        ["Упаковка и отгрузка", "Способ упаковки, паллеты и подготовку к отправке можно согласовать до заказа.", "/images/evidence/shipping-pallet-01.webp", "Упаковка и подготовка AGM-сепараторов к отгрузке", 1200, 900]
      ]
    },
    applications: {
      eyebrow: "Применение",
      title: "Основные области применения аккумуляторов VRLA",
      items: ["Аккумуляторы для ИБП", "Резервное питание телекоммуникаций", "Мотоциклетные аккумуляторы", "Автомобильные стартерные аккумуляторы", "Накопление энергии"]
    },
    quality: {
      eyebrow: "Контроль качества",
      title: "Проверка по согласованным требованиям",
      text: "Показатели испытаний и критерии приемки подтверждаются до производства и отгрузки.",
      cards: [
        ["Сырье и процесс", "Состояние материала и контрольные точки обсуждаются при согласовании заказа."],
        ["Готовая продукция", "Характеристики готового продукта проверяются по согласованным показателям."],
        ["Подтверждение требований", "Методы испытаний и критерии приемки согласуются до производства."]
      ]
    },
    related: {
      eyebrow: "Связанные страницы",
      title: "Посмотреть продукт и запросить образец",
      items: commonRelated.ru
    },
    inquiry: {
      eyebrow: "Запрос",
      title: "Отправьте требования к AGM-сепаратору",
      text: "Для разработки образца или оценки поставщика укажите толщину, ширину, форму рулона или листа и применение.",
      checklist: ["Целевая толщина и ширина", "Рулон или размер листа", "Применение и модель аккумулятора", "Объем и образцы", "Испытания или упаковка"],
      placeholder: "Толщина, ширина, форма, объем, образец и требования к испытаниям",
      submit: "Отправить требования",
      submitting: "Отправка...",
      required: "Укажите имя и контактные данные.",
      success: "Спасибо. Мы проверим информацию и свяжемся с вами.",
      failure: "Не удалось отправить запрос. Повторите попытку позже.",
      emailFallback: "Открыто почтовое приложение. Отправьте подготовленное письмо."
    },
    footer: footerCopy.ru
  }
};

type SecondaryDetailLocale = "vi" | "ko" | "ja" | "es" | "pt" | "ru";
type SecondaryDetailKind =
  | "agmSeparatorRolls"
  | "agmSeparatorSheets"
  | "agmSeparatorTesting";

type DetailPageCopy = {
  hero: [string, string, string, string];
  proof: string[];
  overview: [string, string, string];
  parameters: [string, string];
  formsTitle: string;
  inquiry: [string, string];
};

type SecondaryDetailCopy = {
  rolls: DetailPageCopy;
  sheets: DetailPageCopy;
  testing: DetailPageCopy & {
    testCards: Array<[string, string, string]>;
  };
};

const secondaryDetailCopy: Record<SecondaryDetailLocale, SecondaryDetailCopy> = {
  vi: {
    rolls: {
      hero: ["Tấm ngăn AGM dạng cuộn", "Cuộn tấm ngăn AGM cho dây chuyền sản xuất ắc quy", "Vật liệu sợi thủy tinh AGM dạng cuộn cho xẻ cuộn, cắt tại nhà máy và sản xuất ắc quy VRLA.", "Yêu cầu mẫu cuộn AGM"],
      proof: ["Trao đổi chiều rộng và độ dày", "Xác nhận lõi và đường kính cuộn", "Đóng gói theo yêu cầu"],
      overview: ["Dạng cuộn hỗ trợ sản xuất và cắt liên tục", "Cuộn AGM phù hợp với nhà sản xuất tự xẻ hoặc cắt vật liệu theo thiết kế bản cực và quy trình lắp ráp.", "Chiều rộng, độ dày, chiều dài, lõi, đường kính và đóng gói cần được xác nhận trước khi làm mẫu hoặc sản xuất."],
      parameters: ["Thông tin cần xác nhận cho cuộn AGM", "Hãy gửi chiều rộng, độ dày, đường kính hoặc chiều dài cuộn, kích thước lõi và yêu cầu đóng gói."],
      formsTitle: "Cuộn thành phẩm, sản xuất và đóng gói",
      inquiry: ["Gửi yêu cầu cuộn AGM", "Chia sẻ chiều rộng, độ dày, lõi, đường kính, số lượng và ứng dụng ắc quy để bắt đầu trao đổi."]
    },
    sheets: {
      hero: ["Tấm ngăn AGM dạng tấm", "Tấm ngăn AGM cắt sẵn cho lắp ráp ắc quy VRLA", "Tấm sợi thủy tinh AGM cắt theo kích thước để đánh giá mẫu và lắp ráp ắc quy.", "Yêu cầu mẫu tấm AGM"],
      proof: ["Trao đổi chiều dài và chiều rộng", "Đối chiếu độ dày", "Đóng gói tấm cắt sẵn"],
      overview: ["Tấm cắt sẵn cần phù hợp với thiết kế bản cực", "Kích thước tấm AGM phải được đối chiếu với bản cực, khoảng cách lắp ráp và phương pháp đặt tấm của khách hàng.", "Nên xác nhận chiều dài, chiều rộng, độ dày, số lượng mỗi gói và yêu cầu thao tác trước khi sản xuất."],
      parameters: ["Thông tin cần xác nhận cho tấm AGM", "Hãy gửi kích thước tấm, độ dày, dung sai, số lượng và yêu cầu đóng gói hoặc đánh giá mẫu."],
      formsTitle: "Tấm cắt sẵn, chi tiết cạnh và đóng gói",
      inquiry: ["Gửi yêu cầu tấm AGM", "Chia sẻ kích thước, độ dày, số lượng, mẫu ắc quy và yêu cầu đóng gói để xác nhận khả năng phù hợp."]
    },
    testing: {
      hero: ["Kiểm tra và kiểm soát chất lượng", "Kiểm tra chất lượng tấm ngăn AGM", "Trao đổi các hạng mục kiểm tra như độ dày, định lượng, hút axit, điện trở và ngoại quan theo yêu cầu khách hàng.", "Gửi yêu cầu kiểm tra"],
      proof: ["Kiểm tra thông số có thể đo", "Xác nhận phương pháp thử", "Đánh giá theo yêu cầu khách hàng"],
      overview: ["Chất lượng cần được xác nhận bằng ngoại quan và dữ liệu", "Độ ổn định của tấm ngăn AGM liên quan đến vật liệu, quy trình, kích thước và các thông số thử đã thống nhất.", "Hạng mục thử, điều kiện, phương pháp và giá trị chấp nhận cần được xác nhận trước khi làm mẫu hoặc đặt hàng."],
      parameters: ["Các hạng mục kiểm tra thường được trao đổi", "Độ dày, định lượng, hút axit, điện trở, độ rỗng, độ bền và ngoại quan được xem xét theo tiêu chuẩn khách hàng."],
      formsTitle: "Hình ảnh kiểm tra chất lượng thực tế",
      inquiry: ["Gửi tiêu chuẩn và yêu cầu kiểm tra", "Chia sẻ hạng mục thử, giá trị mục tiêu, phương pháp, ứng dụng ắc quy và nhu cầu mẫu."],
      testCards: [
        ["Kiểm tra độ dày", "Xác nhận độ dày và độ ổn định kích thước theo phương pháp đã thống nhất.", "Kiểm tra độ dày tấm ngăn AGM"],
        ["Kiểm tra định lượng", "Đánh giá khối lượng trên đơn vị diện tích và tính nhất quán của vật liệu.", "Kiểm tra định lượng tấm ngăn AGM"],
        ["Kiểm tra hút axit", "Trao đổi khả năng hút và giữ điện phân theo điều kiện thử.", "Kiểm tra khả năng hút axit tấm ngăn AGM"],
        ["Kiểm tra điện trở", "Xem xét điện trở theo mục tiêu hiệu suất và phương pháp của khách hàng.", "Kiểm tra điện trở tấm ngăn AGM"]
      ]
    }
  },
  ko: {
    rolls: {
      hero: ["AGM 분리막 롤", "배터리 생산 라인용 AGM 분리막 롤", "VRLA 배터리 생산, 슬리팅 및 사내 절단을 위한 유리섬유 AGM 롤 소재입니다.", "AGM 롤 샘플 요청"],
      proof: ["폭과 두께 협의", "코어와 롤 직경 확인", "포장 요구사항 검토"],
      overview: ["연속 생산과 절단 공정에 맞춘 롤 공급", "AGM 롤은 고객이 배터리 설계와 조립 공정에 맞춰 직접 슬리팅하거나 절단하는 생산 방식에 적합합니다.", "샘플 또는 생산 전에 폭, 두께, 길이, 코어, 롤 직경과 포장 방식을 확인합니다."],
      parameters: ["AGM 롤 사양 확인 항목", "폭, 두께, 롤 길이 또는 직경, 코어 크기, 수량과 포장 요구사항을 보내 주세요."],
      formsTitle: "완성 롤, 생산 및 포장 확인",
      inquiry: ["AGM 롤 요구사항 보내기", "폭, 두께, 코어, 롤 직경, 수량과 배터리 적용 분야를 공유해 주세요."]
    },
    sheets: {
      hero: ["AGM 분리막 시트", "VRLA 배터리 조립용 사전 절단 AGM 시트", "배터리 샘플 평가와 조립을 위해 지정 치수로 절단한 유리섬유 AGM 시트입니다.", "AGM 시트 샘플 요청"],
      proof: ["길이와 폭 협의", "두께 확인", "사전 절단 포장"],
      overview: ["사전 절단 시트는 극판 설계와 맞아야 합니다", "AGM 시트 치수는 극판 크기, 조립 간격과 고객의 시트 배치 방식에 맞춰 확인해야 합니다.", "생산 전에 길이, 폭, 두께, 포장 수량과 취급 요구사항을 확인합니다."],
      parameters: ["AGM 시트 사양 확인 항목", "시트 치수, 두께, 공차, 수량, 포장 및 샘플 평가 요구사항을 보내 주세요."],
      formsTitle: "절단 시트, 가장자리 및 포장 확인",
      inquiry: ["AGM 시트 요구사항 보내기", "치수, 두께, 수량, 배터리 모델과 포장 요구사항을 공유해 주세요."]
    },
    testing: {
      hero: ["시험 및 품질 관리", "AGM 분리막 시험과 품질 관리", "고객 요구사항에 따라 두께, 평량, 산 흡수, 전기 저항 및 외관 검사를 협의합니다.", "시험 요구사항 보내기"],
      proof: ["측정 가능한 품질 항목", "시험 방법 사전 확인", "고객 기준 검토"],
      overview: ["품질은 외관과 측정 데이터로 확인해야 합니다", "AGM 분리막의 안정성은 원료, 공정, 치수와 합의된 시험 항목에 연결됩니다.", "샘플 또는 주문 전에 시험 항목, 조건, 방법과 합격 기준을 확인해야 합니다."],
      parameters: ["일반적으로 협의하는 시험 항목", "두께, 평량, 산 흡수, 전기 저항, 기공률, 강도와 외관을 고객 기준에 따라 검토합니다."],
      formsTitle: "실제 품질 검사 장면",
      inquiry: ["시험 기준과 요구사항 보내기", "시험 항목, 목표값, 방법, 배터리 적용 분야와 샘플 요구사항을 공유해 주세요."],
      testCards: [
        ["두께 측정", "합의된 방법에 따라 두께와 치수 안정성을 확인합니다.", "AGM 분리막 두께 측정"],
        ["평량 측정", "단위 면적당 중량과 소재 일관성을 평가합니다.", "AGM 분리막 평량 측정"],
        ["산 흡수 시험", "시험 조건에 따른 전해액 흡수와 유지 성능을 검토합니다.", "AGM 분리막 산 흡수 시험"],
        ["전기 저항 시험", "배터리 성능 목표와 고객 시험 방법에 따라 검토합니다.", "AGM 분리막 전기 저항 시험"]
      ]
    }
  },
  ja: {
    rolls: {
      hero: ["AGMセパレーター ロール", "電池生産ライン向けAGMセパレーターロール", "VRLA電池生産、スリット、社内裁断向けのガラス繊維AGMロール材です。", "AGMロールサンプルを依頼"],
      proof: ["幅・厚さの確認", "紙管・ロール径の確認", "梱包要件の確認"],
      overview: ["連続生産と裁断工程に対応するロール供給", "AGMロールは、電池設計と組立工程に合わせてお客様がスリット・裁断する生産方式に適しています。", "サンプルまたは生産前に、幅、厚さ、長さ、紙管、ロール径、梱包方法を確認します。"],
      parameters: ["AGMロールで確認する仕様", "幅、厚さ、ロール長または径、紙管寸法、数量、梱包要件をご提示ください。"],
      formsTitle: "完成ロール、生産、梱包の確認",
      inquiry: ["AGMロール要件を送信", "幅、厚さ、紙管、ロール径、数量、バッテリー用途をお知らせください。"]
    },
    sheets: {
      hero: ["AGMセパレーター シート", "VRLA電池組立用カット済みAGMシート", "バッテリーサンプル評価と組立向けに指定寸法へ裁断したガラス繊維AGMシートです。", "AGMシートサンプルを依頼"],
      proof: ["長さ・幅の確認", "厚さの確認", "カットシート梱包"],
      overview: ["カット済みシートは極板設計との適合が重要です", "AGMシート寸法は、極板サイズ、組立間隔、お客様の配置方法に合わせて確認します。", "生産前に長さ、幅、厚さ、梱包数量、取扱要件を確認します。"],
      parameters: ["AGMシートで確認する仕様", "シート寸法、厚さ、公差、数量、梱包、サンプル評価要件をご提示ください。"],
      formsTitle: "カットシート、端部、梱包の確認",
      inquiry: ["AGMシート要件を送信", "寸法、厚さ、数量、バッテリー型式、梱包要件をお知らせください。"]
    },
    testing: {
      hero: ["試験・品質管理", "AGMセパレーターの試験と品質管理", "お客様の要件に基づき、厚さ、坪量、吸液、電気抵抗、外観検査を確認します。", "試験要件を送信"],
      proof: ["測定可能な品質項目", "試験方法の事前確認", "お客様基準の確認"],
      overview: ["品質は外観と測定データの両面で確認", "AGMセパレーターの安定性は、原料、工程、寸法、合意した試験項目に関係します。", "サンプル・注文前に試験項目、条件、方法、合格基準を確認します。"],
      parameters: ["一般的に確認する試験項目", "厚さ、坪量、吸液、電気抵抗、気孔率、強度、外観をお客様基準に合わせて確認します。"],
      formsTitle: "実際の品質検査",
      inquiry: ["試験基準と要件を送信", "試験項目、目標値、方法、バッテリー用途、サンプル要件をご提示ください。"],
      testCards: [
        ["厚さ測定", "合意した方法で厚さと寸法安定性を確認します。", "AGMセパレーター厚さ測定"],
        ["坪量測定", "単位面積当たりの質量と材料の均一性を評価します。", "AGMセパレーター坪量測定"],
        ["吸液試験", "試験条件に基づき電解液の吸収・保持を確認します。", "AGMセパレーター吸液試験"],
        ["電気抵抗試験", "電池性能目標とお客様の方法に基づき確認します。", "AGMセパレーター電気抵抗試験"]
      ]
    }
  },
  es: {
    rolls: {
      hero: ["Rollos de separador AGM", "Rollos AGM para líneas de producción de baterías", "Material AGM de fibra de vidrio en rollo para corte longitudinal, conversión interna y fabricación de baterías VRLA.", "Solicitar muestra de rollo AGM"],
      proof: ["Revisión de ancho y espesor", "Confirmación de núcleo y diámetro", "Embalaje según requisitos"],
      overview: ["Suministro en rollo para producción y corte continuos", "Los rollos AGM son adecuados cuando el fabricante corta o convierte el material según el diseño de placas y el proceso de montaje.", "Antes de la muestra o producción se confirman ancho, espesor, longitud, núcleo, diámetro y embalaje."],
      parameters: ["Datos necesarios para un rollo AGM", "Comparta ancho, espesor, longitud o diámetro, núcleo, cantidad y requisitos de embalaje."],
      formsTitle: "Rollo terminado, producción y embalaje",
      inquiry: ["Enviar requisitos del rollo AGM", "Comparta ancho, espesor, núcleo, diámetro, cantidad y aplicación de la batería."]
    },
    sheets: {
      hero: ["Láminas de separador AGM", "Láminas AGM precortadas para montaje de baterías VRLA", "Láminas AGM de fibra de vidrio cortadas a medida para evaluar muestras y montar baterías.", "Solicitar muestra de lámina AGM"],
      proof: ["Revisión de largo y ancho", "Confirmación de espesor", "Embalaje de piezas cortadas"],
      overview: ["La lámina precortada debe corresponder al diseño de placas", "Las dimensiones se revisan con el tamaño de las placas, el espacio de montaje y el método de colocación del cliente.", "Antes de producir se confirman largo, ancho, espesor, cantidad por paquete y requisitos de manipulación."],
      parameters: ["Datos necesarios para láminas AGM", "Comparta dimensiones, espesor, tolerancia, cantidad y requisitos de embalaje o evaluación."],
      formsTitle: "Láminas cortadas, bordes y embalaje",
      inquiry: ["Enviar requisitos de láminas AGM", "Comparta medidas, espesor, cantidad, modelo de batería y requisitos de embalaje."]
    },
    testing: {
      hero: ["Ensayos y control de calidad", "Ensayos y control de calidad de separadores AGM", "Revisión de espesor, gramaje, absorción de ácido, resistencia eléctrica y apariencia según requisitos del cliente.", "Enviar requisitos de ensayo"],
      proof: ["Parámetros medibles", "Métodos de ensayo acordados", "Revisión según criterios del cliente"],
      overview: ["La calidad se confirma con apariencia y datos medibles", "La estabilidad del separador AGM depende de materia prima, proceso, dimensiones y ensayos acordados.", "Antes de una muestra o pedido se confirman partidas, condiciones, métodos y criterios de aceptación."],
      parameters: ["Ensayos que suelen revisarse", "Espesor, gramaje, absorción, resistencia, porosidad, resistencia mecánica y apariencia se revisan según la norma del cliente."],
      formsTitle: "Escenas reales de control de calidad",
      inquiry: ["Enviar norma y requisitos de ensayo", "Comparta partidas, valores objetivo, método, aplicación de la batería y requisitos de muestra."],
      testCards: [
        ["Medición de espesor", "Confirma espesor y estabilidad dimensional con el método acordado.", "Medición de espesor de separador AGM"],
        ["Medición de gramaje", "Evalúa masa por unidad de superficie y uniformidad del material.", "Medición de gramaje de separador AGM"],
        ["Ensayo de absorción de ácido", "Revisa absorción y retención del electrolito bajo condiciones definidas.", "Ensayo de absorción de ácido de separador AGM"],
        ["Ensayo de resistencia eléctrica", "Se revisa según el objetivo de la batería y el método del cliente.", "Ensayo de resistencia eléctrica de separador AGM"]
      ]
    }
  },
  pt: {
    rolls: {
      hero: ["Rolos de separador AGM", "Rolos AGM para linhas de produção de baterias", "Material AGM de fibra de vidro em rolo para corte longitudinal, conversão interna e fabricação de baterias VRLA.", "Solicitar amostra de rolo AGM"],
      proof: ["Análise de largura e espessura", "Confirmação de núcleo e diâmetro", "Embalagem conforme requisitos"],
      overview: ["Fornecimento em rolo para produção e corte contínuos", "Rolos AGM são adequados quando o fabricante corta ou converte o material conforme o projeto das placas e o processo de montagem.", "Antes da amostra ou produção, confirmamos largura, espessura, comprimento, núcleo, diâmetro e embalagem."],
      parameters: ["Dados necessários para rolos AGM", "Informe largura, espessura, comprimento ou diâmetro, núcleo, quantidade e requisitos de embalagem."],
      formsTitle: "Rolo acabado, produção e embalagem",
      inquiry: ["Enviar requisitos do rolo AGM", "Compartilhe largura, espessura, núcleo, diâmetro, quantidade e aplicação da bateria."]
    },
    sheets: {
      hero: ["Folhas de separador AGM", "Folhas AGM pré-cortadas para montagem de baterias VRLA", "Folhas AGM de fibra de vidro cortadas nas dimensões solicitadas para amostras e montagem.", "Solicitar amostra de folha AGM"],
      proof: ["Análise de comprimento e largura", "Confirmação de espessura", "Embalagem de peças cortadas"],
      overview: ["A folha pré-cortada deve corresponder ao projeto das placas", "As dimensões são analisadas com o tamanho das placas, o espaço de montagem e o método de colocação do cliente.", "Antes da produção, confirmamos comprimento, largura, espessura, quantidade por pacote e requisitos de manuseio."],
      parameters: ["Dados necessários para folhas AGM", "Informe dimensões, espessura, tolerância, quantidade e requisitos de embalagem ou avaliação."],
      formsTitle: "Folhas cortadas, bordas e embalagem",
      inquiry: ["Enviar requisitos das folhas AGM", "Compartilhe medidas, espessura, quantidade, modelo da bateria e requisitos de embalagem."]
    },
    testing: {
      hero: ["Ensaios e controle de qualidade", "Ensaios e controle de qualidade de separadores AGM", "Análise de espessura, gramatura, absorção de ácido, resistência elétrica e aparência conforme os requisitos do cliente.", "Enviar requisitos de ensaio"],
      proof: ["Parâmetros mensuráveis", "Métodos de ensaio acordados", "Análise conforme critérios do cliente"],
      overview: ["A qualidade é confirmada por aparência e dados mensuráveis", "A estabilidade do separador AGM depende da matéria-prima, processo, dimensões e ensaios acordados.", "Antes da amostra ou pedido, confirmamos itens, condições, métodos e critérios de aceitação."],
      parameters: ["Ensaios normalmente analisados", "Espessura, gramatura, absorção, resistência, porosidade, resistência mecânica e aparência são analisadas conforme a norma do cliente."],
      formsTitle: "Cenas reais de controle de qualidade",
      inquiry: ["Enviar norma e requisitos de ensaio", "Compartilhe itens, valores-alvo, método, aplicação da bateria e requisitos de amostra."],
      testCards: [
        ["Medição de espessura", "Confirma a espessura e a estabilidade dimensional pelo método acordado.", "Medição de espessura do separador AGM"],
        ["Medição de gramatura", "Avalia massa por unidade de área e uniformidade do material.", "Medição de gramatura do separador AGM"],
        ["Ensaio de absorção de ácido", "Analisa absorção e retenção de eletrólito sob condições definidas.", "Ensaio de absorção de ácido do separador AGM"],
        ["Ensaio de resistência elétrica", "Analisado conforme o objetivo da bateria e o método do cliente.", "Ensaio de resistência elétrica do separador AGM"]
      ]
    }
  },
  ru: {
    rolls: {
      hero: ["Рулоны AGM-сепаратора", "Рулонный AGM-сепаратор для линий производства аккумуляторов", "Стекловолоконный материал AGM в рулонах для продольной резки, внутренней переработки и выпуска аккумуляторов VRLA.", "Запросить образец рулона AGM"],
      proof: ["Согласование ширины и толщины", "Проверка втулки и диаметра", "Упаковка по требованиям"],
      overview: ["Рулоны для непрерывного производства и резки", "Рулоны AGM подходят производителям, которые режут материал по конструкции пластин и процессу сборки.", "До изготовления образца или партии согласуются ширина, толщина, длина, втулка, диаметр и упаковка."],
      parameters: ["Данные для согласования рулона AGM", "Укажите ширину, толщину, длину или диаметр, размер втулки, объем и требования к упаковке."],
      formsTitle: "Готовые рулоны, производство и упаковка",
      inquiry: ["Отправить требования к рулону AGM", "Укажите ширину, толщину, втулку, диаметр, количество и применение аккумулятора."]
    },
    sheets: {
      hero: ["Листы AGM-сепаратора", "Нарезанные листы AGM для сборки аккумуляторов VRLA", "Стекловолоконные листы AGM заданного размера для оценки образцов и сборки аккумуляторов.", "Запросить образец листа AGM"],
      proof: ["Согласование длины и ширины", "Проверка толщины", "Упаковка нарезанных листов"],
      overview: ["Размер листа должен соответствовать конструкции пластин", "Размеры листа AGM проверяются по пластинам, сборочному зазору и способу укладки у заказчика.", "До производства согласуются длина, ширина, толщина, количество в упаковке и требования к обработке."],
      parameters: ["Данные для согласования листов AGM", "Укажите размеры листа, толщину, допуск, количество, упаковку и требования к образцам."],
      formsTitle: "Нарезанные листы, кромки и упаковка",
      inquiry: ["Отправить требования к листам AGM", "Укажите размеры, толщину, количество, модель аккумулятора и требования к упаковке."]
    },
    testing: {
      hero: ["Испытания и контроль качества", "Испытания и контроль качества AGM-сепараторов", "Согласование толщины, поверхностной плотности, впитывания кислоты, электрического сопротивления и внешнего вида.", "Отправить требования к испытаниям"],
      proof: ["Измеряемые показатели", "Согласованные методики", "Проверка по критериям заказчика"],
      overview: ["Качество подтверждается внешним видом и измерениями", "Стабильность AGM-сепаратора связана с сырьем, процессом, размерами и согласованными испытаниями.", "До образца или заказа подтверждаются показатели, условия, методы и критерии приемки."],
      parameters: ["Обычно согласуемые испытания", "Толщина, плотность, впитывание, сопротивление, пористость, прочность и внешний вид проверяются по стандарту заказчика."],
      formsTitle: "Фактические операции контроля качества",
      inquiry: ["Отправить стандарт и требования", "Укажите показатели, целевые значения, методику, применение аккумулятора и требования к образцу."],
      testCards: [
        ["Измерение толщины", "Подтверждает толщину и стабильность размеров согласованным методом.", "Измерение толщины AGM-сепаратора"],
        ["Измерение поверхностной плотности", "Оценивает массу на единицу площади и однородность материала.", "Измерение плотности AGM-сепаратора"],
        ["Испытание впитывания кислоты", "Проверяет впитывание и удержание электролита в заданных условиях.", "Испытание впитывания кислоты AGM-сепаратора"],
        ["Испытание электрического сопротивления", "Проводится по целям аккумулятора и методике заказчика.", "Испытание сопротивления AGM-сепаратора"]
      ]
    }
  }
};

const detailFormImages = {
  rolls: [
    ["/images/viking-finished-separator-roll-900.webp", 900, 675],
    ["/images/evidence/agm-separator-roll-warehouse-01.webp", 1200, 900],
    ["/images/evidence/agm-separator-roll-end-face-01.webp", 1200, 900],
    ["/images/evidence/agm-separator-roll-packaging-01.webp", 1200, 900]
  ],
  sheets: [
    ["/images/viking-separator-sheets-900.webp", 900, 675],
    ["/images/sheets1-900.webp", 900, 675],
    ["/images/evidence/agm-separator-sheets-detail-01.webp", 1200, 900],
    ["/images/evidence/agm-separator-sheets-packaging-01.webp", 1200, 900]
  ],
  testing: [
    ["/images/evidence/quality-thickness-test-01.webp", 1200, 900],
    ["/images/evidence/quality-basis-weight-test-01.webp", 1200, 900],
    ["/images/evidence/quality-acid-absorption-test-01.webp", 1200, 900],
    ["/images/evidence/quality-electrical-resistance-test-01.webp", 1200, 900]
  ]
} as const;

function buildSecondaryDetailContent(
  lang: SecondaryDetailLocale,
  kind: SecondaryDetailKind,
  base: ProductContent,
  copy: DetailPageCopy & { testCards?: Array<[string, string, string]> }
): ProductContent {
  const variant = kind === "agmSeparatorRolls" ? "rolls" : kind === "agmSeparatorSheets" ? "sheets" : "testing";
  const path = kind === "agmSeparatorTesting" ? "/quality-control/agm-separator-testing/" : kind === "agmSeparatorRolls" ? "/products/agm-separator-rolls/" : "/products/agm-separator-sheets/";
  const heroImage = kind === "agmSeparatorTesting"
    ? ["/images/agm-quality-control-1200.webp", 1200, 900] as const
    : detailFormImages[variant][0];
  const forms = kind === "agmSeparatorTesting" && copy.testCards
    ? copy.testCards.map(([title, text, alt], index) => [title, text, detailFormImages.testing[index][0], alt, detailFormImages.testing[index][1], detailFormImages.testing[index][2]] as ImageCard)
    : base.forms.items.map(([title, text, , alt], index) => [title, text, detailFormImages[variant][index][0], alt, detailFormImages[variant][index][1], detailFormImages[variant][index][2]] as ImageCard);

  return {
    ...base,
    languagePath: path,
    hero: {
      eyebrow: copy.hero[0],
      title: copy.hero[1],
      subtitle: copy.hero[2],
      primary: copy.hero[3],
      secondary: base.hero.secondary,
      proof: copy.proof,
      image: { src: heroImage[0], alt: copy.hero[1], width: heroImage[1], height: heroImage[2] }
    },
    overview: { eyebrow: base.overview.eyebrow, title: copy.overview[0], paragraphs: [copy.overview[1], copy.overview[2]] },
    parameters: { eyebrow: base.parameters.eyebrow, title: copy.parameters[0], text: copy.parameters[1], items: base.parameters.items },
    forms: { eyebrow: base.forms.eyebrow, title: copy.formsTitle, items: forms },
    related: { ...base.related, items: commonRelated[lang] },
    inquiry: { ...base.inquiry, title: copy.inquiry[0], text: copy.inquiry[1] }
  };
}

const secondaryBaseContent: Record<SecondaryDetailLocale, ProductContent> = {
  vi: viContent.agmSeparator!,
  ko: koContent.agmSeparator!,
  ja: jaContent.agmSeparator!,
  es: additionalAgmContent.es,
  pt: additionalAgmContent.pt,
  ru: additionalAgmContent.ru
};

const secondaryDetailContent = Object.fromEntries(
  (Object.keys(secondaryDetailCopy) as SecondaryDetailLocale[]).map((lang) => {
    const copy = secondaryDetailCopy[lang];
    const base = secondaryBaseContent[lang];
    return [lang, {
      agmSeparatorRolls: buildSecondaryDetailContent(lang, "agmSeparatorRolls", base, copy.rolls),
      agmSeparatorSheets: buildSecondaryDetailContent(lang, "agmSeparatorSheets", base, copy.sheets),
      agmSeparatorTesting: buildSecondaryDetailContent(lang, "agmSeparatorTesting", base, copy.testing)
    }];
  })
) as Record<SecondaryDetailLocale, Record<SecondaryDetailKind, ProductContent>>;

type SecondaryApplicationKind =
  | "agmSeparatorVrlaApplication"
  | "agmSeparatorUpsApplication"
  | "agmSeparatorEnergyStorageApplication";

type SecondaryApplicationPageCopy = {
  hero: [string, string, string, string];
  proof: string[];
  overview: [string, string, string];
  parameters: [string, string];
  formsTitle: string;
  applications: [string, string[]];
  inquiry: [string, string, string];
};

const secondaryApplicationCopy: Record<
  SecondaryDetailLocale,
  Record<SecondaryApplicationKind, SecondaryApplicationPageCopy>
> = {
  vi: {
    agmSeparatorVrlaApplication: {
      hero: ["Ứng dụng ắc quy VRLA", "Tấm ngăn AGM cho ắc quy chì axit VRLA", "Trao đổi vật liệu tấm ngăn AGM theo cấu trúc ắc quy, bản cực, quy trình lắp ráp và điều kiện sử dụng.", "Đối chiếu ứng dụng và quy cách"],
      proof: ["Ứng dụng VRLA", "Dạng cuộn hoặc tấm", "Hỗ trợ xác nhận mẫu"],
      overview: ["Tấm ngăn cần phù hợp với thiết kế ắc quy VRLA", "Tấm ngăn AGM nằm giữa bản cực dương và âm, giúp giữ chất điện phân trong cấu trúc ắc quy và hạn chế tiếp xúc trực tiếp giữa các bản cực.", "UPS, viễn thông, xe máy, lưu trữ năng lượng và các ứng dụng khởi động có thể yêu cầu cách trao đổi quy cách khác nhau."],
      parameters: ["Bắt đầu từ cấu trúc ắc quy và quy trình lắp ráp", "Độ dày, chiều rộng, định lượng, khả năng hút axit, điện trở và dạng sản phẩm cần được xem xét cùng thiết kế của khách hàng."],
      formsTitle: "Dạng cuộn, dạng tấm và xác nhận ứng dụng VRLA",
      applications: ["Các phân khúc VRLA thường được trao đổi", ["Ắc quy UPS", "Ắc quy viễn thông", "Ắc quy xe máy", "Ắc quy lưu trữ năng lượng", "Ắc quy dự phòng", "Ắc quy khởi động"]],
      inquiry: ["Gửi yêu cầu ứng dụng VRLA", "Cung cấp ứng dụng, độ dày, chiều rộng, dạng cuộn hoặc tấm và tiêu chuẩn thử nếu có.", "Ứng dụng ắc quy, cấu trúc bản cực, độ dày, chiều rộng, dạng sản phẩm và yêu cầu mẫu"]
    },
    agmSeparatorUpsApplication: {
      hero: ["Ứng dụng ắc quy UPS", "Tấm ngăn AGM cho ắc quy UPS VRLA", "Trao đổi tấm ngăn AGM cho hệ thống UPS, nguồn dự phòng và ắc quy VRLA chế độ chờ.", "Trao đổi nhu cầu ắc quy UPS"],
      proof: ["UPS và nguồn dự phòng", "Đối chiếu quy cách", "Theo dõi tính nhất quán"],
      overview: ["Yêu cầu tấm ngăn cần phù hợp với thiết kế UPS và chế độ chờ", "Dự án ắc quy UPS thường xem xét cấu trúc ắc quy, điều kiện vận hành và quy trình sản xuất trước khi xác nhận mẫu.", "Người mua thường trao đổi về độ dày, chiều rộng, khả năng hút axit, điện trở và tính nhất quán giữa các lô."],
      parameters: ["Các điểm cần xác nhận cho ắc quy UPS", "Quy cách cuối cùng cần được đối chiếu với thiết kế bản cực, phương pháp thử và quy trình lắp ráp của khách hàng."],
      formsTitle: "Dạng cuộn và tấm cho sản xuất ắc quy UPS",
      applications: ["Các hướng nguồn dự phòng thường gặp", ["Ắc quy UPS dự phòng", "Trung tâm dữ liệu", "Nguồn khẩn cấp", "Tủ viễn thông", "Điều khiển công nghiệp", "Hệ thống nguồn chế độ chờ"]],
      inquiry: ["Gửi yêu cầu tấm ngăn cho ắc quy UPS", "Chúng tôi sẽ hỗ trợ đối chiếu dạng cuộn, dạng tấm và thông tin quy cách cần thiết.", "Thiết kế ắc quy UPS, độ dày, chiều rộng, dạng sản phẩm, số lượng mẫu và yêu cầu thử"]
    },
    agmSeparatorEnergyStorageApplication: {
      hero: ["Ứng dụng lưu trữ năng lượng", "Tấm ngăn AGM cho ắc quy chì axit lưu trữ năng lượng", "Trao đổi tấm ngăn AGM cho hệ thống lưu trữ, nguồn dự phòng và ắc quy VRLA dự trữ.", "Trao đổi nhu cầu lưu trữ năng lượng"],
      proof: ["Nguồn lưu trữ và dự phòng", "Trao đổi cung ứng ổn định", "Hỗ trợ kiểm tra chất lượng"],
      overview: ["Dự án lưu trữ cần trao đổi quy cách và cung ứng rõ ràng", "Các dự án ắc quy lưu trữ và nguồn dự phòng thường cần cung ứng lặp lại, xác nhận quy cách ổn định và kiểm tra chất lượng trước khi đặt hàng.", "Yêu cầu tấm ngăn nên được xem xét theo cấu trúc ắc quy, điều kiện vận hành, hạng mục thử và dạng cuộn hoặc tấm."],
      parameters: ["Các điểm cần xác nhận cho ắc quy lưu trữ", "Độ dày, định lượng, hút axit, điện trở, tính nhất quán, đóng gói và kế hoạch giao hàng cần theo tiêu chuẩn của khách hàng."],
      formsTitle: "Dạng tấm ngăn cho dự án lưu trữ và nguồn dự phòng",
      applications: ["Các hướng lưu trữ và nguồn dự phòng", ["Ắc quy lưu trữ chì axit", "Nguồn dự phòng", "Nguồn dự trữ", "Nguồn viễn thông", "Hệ thống năng lượng mặt trời dự phòng", "Ắc quy công nghiệp chế độ chờ"]],
      inquiry: ["Gửi yêu cầu tấm ngăn cho ắc quy lưu trữ", "Cung cấp quy cách, dạng sản phẩm, số lượng, đóng gói và kế hoạch mẫu hoặc đơn hàng nếu có.", "Ứng dụng lưu trữ, độ dày, chiều rộng, dạng cuộn hoặc tấm, số lượng, thử nghiệm và đóng gói"]
    }
  },
  ko: {
    agmSeparatorVrlaApplication: {
      hero: ["VRLA 배터리 적용", "VRLA 납축전지용 AGM 분리막", "배터리 구조, 극판 설계, 조립 공정 및 사용 조건에 맞춰 AGM 분리막 사양을 검토합니다.", "적용 분야 및 사양 검토"],
      proof: ["VRLA 적용", "롤 또는 시트", "샘플 검토 지원"],
      overview: ["AGM 분리막은 VRLA 배터리 설계와 맞아야 합니다", "AGM 분리막은 양극판과 음극판 사이에서 직접 접촉을 방지하고 배터리 구조 내 전해액 유지에 기여합니다.", "UPS, 통신, 오토바이, 에너지 저장 및 시동용 배터리는 서로 다른 사양 검토가 필요할 수 있습니다."],
      parameters: ["배터리 구조와 조립 공정에서 사양 검토를 시작합니다", "두께, 폭, 평량, 산 흡수, 전기 저항 및 제품 형태를 고객 설계와 함께 확인해야 합니다."],
      formsTitle: "VRLA 적용을 위한 롤, 시트 및 샘플 검토",
      applications: ["주요 VRLA 적용 분야", ["UPS 배터리", "통신용 배터리", "오토바이 배터리", "에너지 저장 배터리", "예비 전원 배터리", "시동용 배터리"]],
      inquiry: ["VRLA 적용 요구사항 보내기", "적용 분야, 두께, 폭, 롤 또는 시트 형태와 시험 기준을 보내 주세요.", "배터리 적용, 극판 구조, 두께, 폭, 제품 형태 및 샘플 요구사항"]
    },
    agmSeparatorUpsApplication: {
      hero: ["UPS 배터리 적용", "UPS VRLA 배터리용 AGM 분리막", "UPS, 대기 전원 및 백업용 VRLA 배터리 생산을 위한 AGM 분리막을 검토합니다.", "UPS 배터리 요구사항 상담"],
      proof: ["UPS 및 대기 전원", "사양 검토", "배치 일관성 확인"],
      overview: ["분리막 요구사항은 UPS 설계와 대기 운전에 맞아야 합니다", "UPS 배터리 프로젝트에서는 샘플 확인 전에 배터리 구조, 운전 환경 및 생산 공정을 함께 검토합니다.", "구매자는 일반적으로 두께, 폭, 산 흡수, 전기 저항 및 로트 간 일관성을 확인합니다."],
      parameters: ["UPS 배터리 조달 시 확인할 항목", "최종 사양은 극판 설계, 시험 방법 및 고객 조립 공정에 맞춰 확인해야 합니다."],
      formsTitle: "UPS 배터리 생산을 위한 롤 및 시트",
      applications: ["주요 대기 전원 적용", ["UPS 백업 배터리", "데이터센터", "비상 전원", "통신 캐비닛", "산업 제어", "대기 전원 시스템"]],
      inquiry: ["UPS 배터리 분리막 요구사항 보내기", "롤, 시트 및 필요한 사양 정보를 함께 검토합니다.", "UPS 배터리 설계, 두께, 폭, 제품 형태, 샘플 수량 및 시험 요구사항"]
    },
    agmSeparatorEnergyStorageApplication: {
      hero: ["에너지 저장 배터리 적용", "납축 에너지 저장 배터리용 AGM 분리막", "에너지 저장, 백업 전원 및 예비 전원용 VRLA 배터리 프로젝트를 위한 AGM 분리막을 검토합니다.", "에너지 저장 요구사항 상담"],
      proof: ["저장 및 백업 전원", "안정 공급 검토", "품질 검토 지원"],
      overview: ["에너지 저장 프로젝트에는 명확한 사양과 공급 협의가 필요합니다", "납축 에너지 저장 및 백업 전원 프로젝트는 반복 공급, 안정적인 사양 확인과 주문 전 품질 검토가 중요합니다.", "배터리 구조, 운전 조건, 시험 항목 및 롤 또는 시트 요구사항을 함께 확인해야 합니다."],
      parameters: ["에너지 저장 배터리 조달 시 확인할 항목", "두께, 평량, 산 흡수, 전기 저항, 일관성, 포장 및 납품 계획은 고객 기준에 맞춰야 합니다."],
      formsTitle: "에너지 저장 및 백업 프로젝트용 분리막 형태",
      applications: ["주요 저장 및 예비 전원 적용", ["납축 에너지 저장", "백업 전원", "예비 전원", "통신 백업", "태양광 백업", "산업용 대기 배터리"]],
      inquiry: ["에너지 저장 배터리 분리막 요구사항 보내기", "사양, 제품 형태, 수량, 포장과 샘플 또는 주문 계획을 보내 주세요.", "저장 적용, 두께, 폭, 롤 또는 시트, 수량, 시험 및 포장 요구사항"]
    }
  },
  ja: {
    agmSeparatorVrlaApplication: {
      hero: ["VRLAバッテリー用途", "VRLA鉛蓄電池用AGMセパレーター", "バッテリー構造、極板設計、組立工程、使用条件に合わせてAGMセパレーター仕様を確認します。", "用途と仕様を確認"],
      proof: ["VRLA用途", "ロール・シート", "サンプル確認対応"],
      overview: ["AGMセパレーターはVRLAバッテリー設計との適合が必要です", "AGMセパレーターは正極板と負極板の間に配置され、直接接触を防ぎながら電解液保持を支えます。", "UPS、通信、二輪車、蓄電、始動用バッテリーでは、仕様確認の重点が異なる場合があります。"],
      parameters: ["バッテリー構造と組立工程から仕様を確認", "厚さ、幅、坪量、吸液性、電気抵抗、製品形態を顧客設計と合わせて確認します。"],
      formsTitle: "VRLA用途向けロール、シート、サンプル確認",
      applications: ["主なVRLA用途", ["UPSバッテリー", "通信用バッテリー", "二輪車用バッテリー", "蓄電用バッテリー", "バックアップ電源", "始動用バッテリー"]],
      inquiry: ["VRLA用途の要件を送信", "用途、厚さ、幅、ロール・シート形態、試験基準をご連絡ください。", "バッテリー用途、極板構造、厚さ、幅、製品形態、サンプル要件"]
    },
    agmSeparatorUpsApplication: {
      hero: ["UPSバッテリー用途", "UPS VRLAバッテリー用AGMセパレーター", "UPS、待機電源、バックアップ用VRLA鉛蓄電池向けAGMセパレーターを確認します。", "UPSバッテリー要件を相談"],
      proof: ["UPS・待機電源", "仕様確認", "ロット一貫性の確認"],
      overview: ["セパレーター要件はUPS設計と待機運用に合わせます", "UPSバッテリープロジェクトでは、サンプル確認前にバッテリー構造、運用環境、生産工程を検討します。", "厚さ、幅、吸液性、電気抵抗、ロット間の一貫性が主な確認項目です。"],
      parameters: ["UPSバッテリー調達時の確認項目", "最終仕様は極板設計、試験方法、顧客の組立工程に合わせて確認します。"],
      formsTitle: "UPSバッテリー生産向けロール・シート",
      applications: ["主な待機電源用途", ["UPSバックアップ", "データセンター", "非常用電源", "通信キャビネット", "産業制御", "待機電源システム"]],
      inquiry: ["UPSバッテリー用セパレーター要件を送信", "ロール、シート、必要な仕様情報を確認します。", "UPS設計、厚さ、幅、製品形態、サンプル数量、試験要件"]
    },
    agmSeparatorEnergyStorageApplication: {
      hero: ["蓄電用バッテリー用途", "鉛蓄電池式エネルギー貯蔵向けAGMセパレーター", "蓄電、バックアップ、予備電源用VRLAバッテリープロジェクト向けに仕様を確認します。", "蓄電用途の要件を相談"],
      proof: ["蓄電・バックアップ", "安定供給の確認", "品質確認対応"],
      overview: ["蓄電プロジェクトには明確な仕様と供給協議が必要です", "鉛蓄電池式蓄電・バックアップ案件では、継続供給、安定した仕様確認、発注前の品質協議が重要です。", "バッテリー構造、運用条件、試験項目、ロール・シート要件を合わせて確認します。"],
      parameters: ["蓄電用バッテリー調達時の確認項目", "厚さ、坪量、吸液性、電気抵抗、一貫性、梱包、納入計画を顧客基準に合わせます。"],
      formsTitle: "蓄電・バックアップ案件向け製品形態",
      applications: ["主な蓄電・予備電源用途", ["鉛蓄電池式蓄電", "バックアップ電源", "予備電源", "通信バックアップ", "太陽光バックアップ", "産業用待機バッテリー"]],
      inquiry: ["蓄電用バッテリーの要件を送信", "仕様、製品形態、数量、梱包、サンプルまたは発注計画をご連絡ください。", "蓄電用途、厚さ、幅、ロール・シート、数量、試験、梱包要件"]
    }
  },
  es: {
    agmSeparatorVrlaApplication: {
      hero: ["Aplicaciones VRLA", "Separador AGM para baterías VRLA de plomo-ácido", "Revisión del separador según la estructura de la batería, las placas, el proceso de montaje y las condiciones de uso.", "Revisar aplicación y especificación"],
      proof: ["Aplicaciones VRLA", "Rollos o láminas", "Evaluación de muestras"],
      overview: ["El separador debe corresponder al diseño de la batería VRLA", "El separador AGM se coloca entre las placas positivas y negativas, ayuda a evitar el contacto directo y mantiene el electrolito dentro de la estructura.", "UPS, telecomunicaciones, motocicletas, almacenamiento y arranque pueden requerir revisiones de especificación diferentes."],
      parameters: ["La revisión comienza con la estructura y el montaje", "Espesor, ancho, gramaje, absorción de ácido, resistencia eléctrica y formato deben revisarse con el diseño del cliente."],
      formsTitle: "Rollos, láminas y evaluación para aplicaciones VRLA",
      applications: ["Segmentos VRLA habituales", ["Baterías UPS", "Baterías de telecomunicaciones", "Baterías de motocicleta", "Baterías de almacenamiento", "Energía de respaldo", "Baterías de arranque"]],
      inquiry: ["Enviar requisitos de la aplicación VRLA", "Indique la aplicación, el espesor, el ancho, el formato y los criterios de ensayo disponibles.", "Aplicación, estructura de placas, espesor, ancho, formato y requisitos de muestra"]
    },
    agmSeparatorUpsApplication: {
      hero: ["Aplicación en baterías UPS", "Separador AGM para baterías UPS VRLA", "Revisión para baterías UPS, sistemas de espera y respaldo de energía con tecnología VRLA.", "Revisar requisitos de baterías UPS"],
      proof: ["UPS y respaldo", "Revisión de especificaciones", "Consistencia por lote"],
      overview: ["Los requisitos deben corresponder al diseño UPS y al servicio de espera", "Los proyectos UPS suelen revisar la estructura de la batería, el entorno operativo y el proceso de producción antes de confirmar muestras.", "Espesor, ancho, absorción de ácido, resistencia eléctrica y consistencia entre lotes son puntos habituales."],
      parameters: ["Puntos para comprar separadores de baterías UPS", "La especificación final debe confirmarse con el diseño de placas, el método de ensayo y el proceso de montaje del cliente."],
      formsTitle: "Rollos y láminas para producción de baterías UPS",
      applications: ["Usos habituales de respaldo", ["Baterías UPS", "Centros de datos", "Energía de emergencia", "Gabinetes de telecomunicaciones", "Control industrial", "Sistemas de espera"]],
      inquiry: ["Enviar requisitos del separador para UPS", "Ayudamos a revisar el formato en rollo o lámina y la información técnica necesaria.", "Diseño UPS, espesor, ancho, formato, cantidad de muestras y requisitos de ensayo"]
    },
    agmSeparatorEnergyStorageApplication: {
      hero: ["Aplicación en almacenamiento", "Separador AGM para baterías de almacenamiento de energía", "Revisión para proyectos VRLA de almacenamiento, respaldo y reserva de energía con baterías de plomo-ácido.", "Revisar requisitos de almacenamiento"],
      proof: ["Almacenamiento y respaldo", "Suministro estable", "Revisión de calidad"],
      overview: ["Los proyectos de almacenamiento necesitan especificaciones y suministro claros", "Estos proyectos suelen requerir suministro repetido, comunicación estable de especificaciones y revisión de calidad antes del pedido.", "Deben considerarse la estructura, las condiciones de operación, los ensayos y el formato en rollo o lámina."],
      parameters: ["Puntos para comprar separadores de almacenamiento", "Espesor, gramaje, absorción, resistencia, consistencia, embalaje y entrega deben alinearse con la norma del cliente."],
      formsTitle: "Formatos para proyectos de almacenamiento y respaldo",
      applications: ["Usos habituales de almacenamiento y reserva", ["Almacenamiento con plomo-ácido", "Energía de respaldo", "Energía de reserva", "Respaldo de telecomunicaciones", "Respaldo solar", "Baterías industriales de espera"]],
      inquiry: ["Enviar requisitos para baterías de almacenamiento", "Indique especificación, formato, cantidad, embalaje y plan de muestras o pedido.", "Aplicación, espesor, ancho, rollo o lámina, cantidad, ensayos y embalaje"]
    }
  },
  pt: {
    agmSeparatorVrlaApplication: {
      hero: ["Aplicações VRLA", "Separador AGM para baterias VRLA chumbo-ácido", "Análise do separador conforme a estrutura da bateria, placas, processo de montagem e condições de uso.", "Analisar aplicação e especificação"],
      proof: ["Aplicações VRLA", "Rolos ou folhas", "Avaliação de amostras"],
      overview: ["O separador deve corresponder ao projeto da bateria VRLA", "O separador AGM fica entre as placas positivas e negativas, ajuda a evitar contato direto e mantém o eletrólito na estrutura.", "UPS, telecomunicações, motocicletas, armazenamento e partida podem exigir análises de especificação diferentes."],
      parameters: ["A análise começa pela estrutura e montagem", "Espessura, largura, gramatura, absorção de ácido, resistência elétrica e formato devem ser avaliados com o projeto do cliente."],
      formsTitle: "Rolos, folhas e avaliação para aplicações VRLA",
      applications: ["Segmentos VRLA comuns", ["Baterias UPS", "Baterias de telecomunicações", "Baterias de motocicletas", "Baterias de armazenamento", "Energia de backup", "Baterias de partida"]],
      inquiry: ["Enviar requisitos da aplicação VRLA", "Informe aplicação, espessura, largura, formato e critérios de ensaio disponíveis.", "Aplicação, estrutura das placas, espessura, largura, formato e requisitos de amostra"]
    },
    agmSeparatorUpsApplication: {
      hero: ["Aplicação em baterias UPS", "Separador AGM para baterias UPS VRLA", "Análise para baterias UPS, sistemas de espera e backup de energia com tecnologia VRLA.", "Analisar requisitos de baterias UPS"],
      proof: ["UPS e backup", "Análise de especificações", "Consistência por lote"],
      overview: ["Os requisitos devem corresponder ao projeto UPS e ao serviço de espera", "Projetos UPS normalmente analisam estrutura da bateria, ambiente operacional e processo de produção antes de confirmar amostras.", "Espessura, largura, absorção de ácido, resistência elétrica e consistência entre lotes são pontos comuns."],
      parameters: ["Pontos para comprar separadores de baterias UPS", "A especificação final deve ser confirmada com o projeto das placas, método de ensaio e processo de montagem do cliente."],
      formsTitle: "Rolos e folhas para produção de baterias UPS",
      applications: ["Usos comuns de backup", ["Baterias UPS", "Data centers", "Energia de emergência", "Gabinetes de telecomunicações", "Controle industrial", "Sistemas de espera"]],
      inquiry: ["Enviar requisitos do separador para UPS", "Ajudamos a analisar rolos, folhas e as informações técnicas necessárias.", "Projeto UPS, espessura, largura, formato, quantidade de amostras e requisitos de ensaio"]
    },
    agmSeparatorEnergyStorageApplication: {
      hero: ["Aplicação em armazenamento", "Separador AGM para baterias de armazenamento de energia", "Análise para projetos VRLA de armazenamento, backup e reserva de energia com baterias chumbo-ácido.", "Analisar requisitos de armazenamento"],
      proof: ["Armazenamento e backup", "Fornecimento estável", "Análise de qualidade"],
      overview: ["Projetos de armazenamento precisam de especificações e fornecimento claros", "Esses projetos costumam exigir fornecimento repetido, comunicação estável de especificações e análise de qualidade antes do pedido.", "Estrutura, condições de operação, ensaios e formato em rolo ou folha devem ser considerados."],
      parameters: ["Pontos para comprar separadores de armazenamento", "Espessura, gramatura, absorção, resistência, consistência, embalagem e entrega devem seguir a norma do cliente."],
      formsTitle: "Formatos para projetos de armazenamento e backup",
      applications: ["Usos comuns de armazenamento e reserva", ["Armazenamento chumbo-ácido", "Energia de backup", "Energia de reserva", "Backup de telecomunicações", "Backup solar", "Baterias industriais de espera"]],
      inquiry: ["Enviar requisitos para baterias de armazenamento", "Informe especificação, formato, quantidade, embalagem e plano de amostra ou pedido.", "Aplicação, espessura, largura, rolo ou folha, quantidade, ensaios e embalagem"]
    }
  },
  ru: {
    agmSeparatorVrlaApplication: {
      hero: ["Применение VRLA", "AGM-сепаратор для свинцово-кислотных VRLA-аккумуляторов", "Согласование сепаратора с конструкцией аккумулятора, пластинами, процессом сборки и условиями эксплуатации.", "Согласовать применение и характеристики"],
      proof: ["Применение VRLA", "Рулоны или листы", "Оценка образцов"],
      overview: ["Сепаратор должен соответствовать конструкции VRLA-аккумулятора", "AGM-сепаратор размещается между положительными и отрицательными пластинами, предотвращает прямой контакт и удерживает электролит в структуре.", "ИБП, связь, мотоциклы, накопители энергии и стартерные системы могут требовать разного подхода к характеристикам."],
      parameters: ["Согласование начинается с конструкции и сборки", "Толщина, ширина, масса на единицу площади, впитывание кислоты, сопротивление и формат проверяются с учетом проекта клиента."],
      formsTitle: "Рулоны, листы и оценка для VRLA",
      applications: ["Основные сегменты VRLA", ["Аккумуляторы ИБП", "Телекоммуникационные аккумуляторы", "Мотоциклетные аккумуляторы", "Накопители энергии", "Резервное питание", "Стартерные аккумуляторы"]],
      inquiry: ["Отправить требования к применению VRLA", "Укажите применение, толщину, ширину, формат и доступные критерии испытаний.", "Применение, конструкция пластин, толщина, ширина, формат и требования к образцам"]
    },
    agmSeparatorUpsApplication: {
      hero: ["Применение в ИБП", "AGM-сепаратор для VRLA-аккумуляторов ИБП", "Согласование для аккумуляторов ИБП, систем дежурного и резервного питания.", "Обсудить требования к ИБП"],
      proof: ["ИБП и резервное питание", "Согласование характеристик", "Стабильность партий"],
      overview: ["Требования должны соответствовать конструкции ИБП и дежурному режиму", "В проектах ИБП до подтверждения образцов учитывают конструкцию аккумулятора, условия эксплуатации и производственный процесс.", "Обычно проверяют толщину, ширину, впитывание кислоты, электрическое сопротивление и стабильность между партиями."],
      parameters: ["Что подтвердить при закупке сепаратора для ИБП", "Итоговые характеристики согласуют с конструкцией пластин, методом испытаний и процессом сборки клиента."],
      formsTitle: "Рулоны и листы для производства аккумуляторов ИБП",
      applications: ["Основные области резервного питания", ["Аккумуляторы ИБП", "Центры обработки данных", "Аварийное питание", "Телекоммуникационные шкафы", "Промышленное управление", "Дежурные системы"]],
      inquiry: ["Отправить требования к сепаратору для ИБП", "Мы поможем согласовать рулоны, листы и необходимые технические данные.", "Конструкция ИБП, толщина, ширина, формат, количество образцов и испытания"]
    },
    agmSeparatorEnergyStorageApplication: {
      hero: ["Применение в накопителях", "AGM-сепаратор для свинцово-кислотных накопителей энергии", "Согласование для VRLA-проектов накопления, резервного и аварийного питания.", "Обсудить требования к накопителям"],
      proof: ["Накопление и резерв", "Стабильные поставки", "Проверка качества"],
      overview: ["Проектам накопления нужны четкие характеристики и поставки", "Для таких проектов важны повторные поставки, стабильное согласование характеристик и проверка качества до заказа.", "Учитываются конструкция, условия эксплуатации, испытания и поставка в рулонах или листах."],
      parameters: ["Что подтвердить при закупке для накопителей", "Толщина, масса, впитывание, сопротивление, стабильность, упаковка и поставка должны соответствовать стандартам клиента."],
      formsTitle: "Форматы для проектов накопления и резерва",
      applications: ["Основные системы накопления и резерва", ["Свинцово-кислотные накопители", "Резервное питание", "Аварийный резерв", "Резерв связи", "Солнечные системы", "Промышленные дежурные аккумуляторы"]],
      inquiry: ["Отправить требования к накопителю энергии", "Укажите характеристики, формат, количество, упаковку и план образцов или заказа.", "Применение, толщина, ширина, рулон или лист, количество, испытания и упаковка"]
    }
  }
};

const secondaryApplicationImages: Record<
  SecondaryApplicationKind,
  readonly [string, number, number]
> = {
  agmSeparatorVrlaApplication: ["/images/viking-finished-separator-roll-900.webp", 900, 675],
  agmSeparatorUpsApplication: ["/images/applications/ups-vrla-battery-application-1200.webp", 1200, 900],
  agmSeparatorEnergyStorageApplication: ["/images/applications/energy-storage-lead-acid-battery-application-1200.webp", 1200, 900]
};

const secondaryApplicationPaths: Record<SecondaryApplicationKind, string> = {
  agmSeparatorVrlaApplication: "/applications/agm-separator-for-vrla-battery/",
  agmSeparatorUpsApplication: "/applications/agm-separator-for-ups-battery/",
  agmSeparatorEnergyStorageApplication: "/applications/agm-separator-for-energy-storage-battery/"
};

function buildSecondaryApplicationContent(
  lang: SecondaryDetailLocale,
  kind: SecondaryApplicationKind,
  base: ProductContent,
  copy: SecondaryApplicationPageCopy
): ProductContent {
  const image = secondaryApplicationImages[kind];
  const baseForms = base.forms.items.slice(0, 2);
  const forms: ImageCard[] = [
    ...baseForms,
    [copy.hero[1], copy.overview[1], image[0], copy.hero[1], image[1], image[2]],
    [base.quality.title, base.quality.text, "/images/agm-quality-control-1200.webp", base.quality.title, 1200, 900]
  ];

  return {
    ...base,
    homePath: `/${lang}/`,
    languagePath: secondaryApplicationPaths[kind],
    hero: {
      eyebrow: copy.hero[0],
      title: copy.hero[1],
      subtitle: copy.hero[2],
      primary: copy.hero[3],
      secondary: base.hero.secondary,
      proof: copy.proof,
      image: { src: image[0], alt: copy.hero[1], width: image[1], height: image[2] }
    },
    overview: {
      eyebrow: base.overview.eyebrow,
      title: copy.overview[0],
      paragraphs: [copy.overview[1], copy.overview[2]]
    },
    parameters: {
      eyebrow: base.parameters.eyebrow,
      title: copy.parameters[0],
      text: copy.parameters[1],
      items: base.parameters.items
    },
    forms: { eyebrow: base.forms.eyebrow, title: copy.formsTitle, items: forms },
    applications: {
      eyebrow: base.applications.eyebrow,
      title: copy.applications[0],
      items: copy.applications[1]
    },
    related: { ...base.related, items: commonRelated[lang] },
    inquiry: {
      ...base.inquiry,
      title: copy.inquiry[0],
      text: copy.inquiry[1],
      placeholder: copy.inquiry[2]
    }
  };
}

const secondaryApplicationContent = Object.fromEntries(
  (Object.keys(secondaryApplicationCopy) as SecondaryDetailLocale[]).map((lang) => [
    lang,
    Object.fromEntries(
      (Object.keys(secondaryApplicationCopy[lang]) as SecondaryApplicationKind[]).map((kind) => [
        kind,
        buildSecondaryApplicationContent(
          lang,
          kind,
          secondaryBaseContent[lang],
          secondaryApplicationCopy[lang][kind]
        )
      ])
    )
  ])
) as Record<SecondaryDetailLocale, Record<SecondaryApplicationKind, ProductContent>>;

type AdditionalMotorcycleLocale = "ko" | "ja" | "es" | "pt" | "ru";

type MotorcycleApplicationCopy = {
  quote: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  proof: string[];
  imageAlt: string;
  overview: [string, string, string, string];
  parameters: [string, string, string, TextPair[]];
  forms: [string, string, Array<[string, string, string]>];
  applications: [string, string, string[]];
  quality: [string, string, string, TextPair[]];
  related: [string, string];
  inquiry: {
    eyebrow: string;
    title: string;
    text: string;
    checklist: string[];
    placeholder: string;
    submit: string;
    submitting: string;
    required: string;
    success: string;
    failure: string;
    emailFallback: string;
  };
};

const motorcycleApplicationCopy: Record<
  AdditionalMotorcycleLocale,
  MotorcycleApplicationCopy
> = {
  ko: {
    quote: "샘플 요청",
    eyebrow: "오토바이 배터리 적용",
    title: "오토바이 시동 배터리용 AGM 분리막",
    subtitle: "소형 VRLA 오토바이 배터리용 AGM 분리막의 롤, 시트 및 샘플 사양을 검토합니다.",
    primary: "배터리 요구사항 상담",
    secondary: "사양 정보 보내기",
    proof: ["시동 배터리 적용", "소형 치수 검토", "샘플 협의 지원"],
    imageAlt: "오토바이 시동 배터리용 AGM 분리막",
    overview: [
      "적용 분야",
      "소형 배터리 구조에 맞춘 분리막 검토",
      "오토바이 시동 배터리는 내부 공간이 작기 때문에 극판 치수, 조립 방식 및 배터리 샘플에 따라 분리막을 확인해야 합니다.",
      "구매자는 일반적으로 두께, 시트 크기 또는 롤 폭, 취급 강도, 산 흡수 성능과 전기 저항을 함께 검토합니다."
    ],
    parameters: [
      "사양 검토",
      "구매 전 확인할 주요 항목",
      "요구사항은 배터리 샘플, 극판 설계 및 고객의 조립 공정과 함께 검토합니다.",
      [
        ["시트 크기 또는 롤 폭", "소형 설계와 절단 공정에 맞춰 확인합니다."],
        ["두께", "극판 간격, 압축 조건 및 조립 요구사항과 함께 검토합니다."],
        ["산 흡수 성능", "배터리 설계와 합의된 시험 방법에 따라 확인합니다."],
        ["샘플 평가", "전체 사양 확정 전에도 샘플 협의를 시작할 수 있습니다."]
      ]
    ],
    forms: [
      "제품 형태",
      "소형 배터리 조립을 위한 롤 및 시트",
      [
        ["시험 조립용 재단 시트", "배터리 샘플 평가와 시험 조립에 사용할 수 있습니다.", "오토바이 배터리 조립용 AGM 분리막 시트"],
        ["고객 절단용 롤", "고객의 배터리 설계에 맞춰 절단할 수 있는 롤 형태입니다.", "오토바이 배터리 생산용 AGM 분리막 롤"],
        ["시동 배터리 적용", "소형 VRLA 배터리 구조와 적용 조건을 함께 검토합니다.", "오토바이 VRLA 배터리 적용"],
        ["시트 가장자리 확인", "샘플 및 사양 확인 과정에서 시트 상태를 검토할 수 있습니다.", "오토바이 배터리용 AGM 분리막 시트 상세"]
      ]
    ],
    applications: ["오토바이 적용", "주요 시동 배터리 적용", ["오토바이 시동 배터리", "스쿠터 배터리", "소형 VRLA 배터리", "시험 샘플 개발"]],
    quality: ["품질 검토", "소형 배터리에서는 치수와 취급성이 중요합니다", "최종 시험 항목은 고객 요구사항과 합의된 시험 방법에 따릅니다.", [["치수 검토", "시트 길이와 폭 또는 롤 폭을 배터리 샘플에 맞춰 확인합니다."], ["취급성 검토", "절단 및 조립 과정의 분리막 상태를 협의할 수 있습니다."], ["시험 항목 협의", "두께, 산 흡수 성능과 전기 저항을 목표 요구사항에 따라 검토합니다."]]],
    related: ["관련 페이지", "제품 및 샘플 요청 계속 보기"],
    inquiry: {
      eyebrow: "문의",
      title: "오토바이 배터리용 분리막 요구사항을 보내 주세요",
      text: "연락처와 배터리 모델을 남겨 주시면 생산 또는 샘플 평가에 적합한 AGM 분리막 형태를 함께 확인합니다.",
      checklist: ["오토바이 배터리 모델", "시트 크기 또는 롤 폭", "샘플 요구사항", "시험 또는 생산 수량"],
      placeholder: "배터리 모델, 시트 크기, 롤 폭, 샘플 또는 기술 요구사항",
      submit: "요구사항 보내기",
      submitting: "전송 중...",
      required: "이름과 연락처를 입력해 주세요.",
      success: "감사합니다. 요구사항 확인을 위해 연락드리겠습니다.",
      failure: "현재 요청을 전송할 수 없습니다. 잠시 후 다시 시도해 주세요.",
      emailFallback: "이메일 프로그램이 열렸습니다. 준비된 이메일을 전송해 주세요."
    }
  },
  ja: {
    quote: "サンプル依頼",
    eyebrow: "二輪車用バッテリー用途",
    title: "二輪車始動用バッテリー向けAGMセパレーター",
    subtitle: "小型VRLA二輪車用バッテリー向けに、ロール、シート、サンプル仕様を確認します。",
    primary: "バッテリー要件を相談",
    secondary: "仕様情報を送る",
    proof: ["始動用バッテリー", "小型寸法の確認", "サンプル相談"],
    imageAlt: "二輪車始動用バッテリー向けAGMセパレーター",
    overview: ["用途の要点", "小型バッテリー構造に合わせたセパレーター確認", "二輪車始動用バッテリーは内部構造が小型で、極板寸法、組立方法、バッテリーサンプルに合わせた確認が必要です。", "購買時には厚さ、シート寸法またはロール幅、取扱強度、吸液性能、電気抵抗をあわせて確認します。"],
    parameters: ["仕様確認", "購入前に確認する主な項目", "要件はバッテリーサンプル、極板設計、組立工程とあわせて確認します。", [["シート寸法・ロール幅", "小型設計と裁断工程に合わせて確認します。"], ["厚さ", "極板間隔、圧縮条件、組立要件とあわせて確認します。"], ["吸液性能", "バッテリー設計と合意した試験方法に基づき確認します。"], ["サンプル評価", "全仕様の確定前でもサンプル相談を開始できます。"]]],
    forms: ["製品形状", "小型バッテリー組立向けロール・シート", [["試作組立用カットシート", "バッテリーサンプル評価と試作組立に使用できます。", "二輪車用バッテリー組立向けAGMセパレーターシート"], ["お客様で裁断するロール", "バッテリー設計に合わせて裁断できるロール形状です。", "二輪車用バッテリー生産向けAGMセパレーターロール"], ["始動用バッテリー用途", "小型VRLAバッテリーの構造と用途条件を確認します。", "二輪車用VRLAバッテリー用途"], ["シート端部の確認", "サンプル・仕様確認時にシート状態を確認できます。", "二輪車用AGMセパレーターシート詳細"]]],
    applications: ["二輪車用途", "主な始動用バッテリー用途", ["二輪車始動用バッテリー", "スクーター用バッテリー", "小型VRLAバッテリー", "試作サンプル開発"]],
    quality: ["品質確認", "小型バッテリーでは寸法と取扱性を重視", "最終試験項目はお客様の要件と合意した試験方法に基づきます。", [["寸法確認", "シート長さ・幅またはロール幅をバッテリーサンプルに合わせます。"], ["取扱性確認", "裁断・組立工程でのセパレーター状態を協議できます。"], ["試験項目の協議", "厚さ、吸液性能、電気抵抗を目標要件に合わせて確認します。"]]],
    related: ["関連ページ", "製品とサンプル依頼を見る"],
    inquiry: { eyebrow: "お問い合わせ", title: "二輪車用バッテリーのセパレーター要件をお送りください", text: "連絡先とバッテリー型式から、生産またはサンプル評価に適したAGMセパレーター形状を確認します。", checklist: ["二輪車用バッテリー型式", "シート寸法またはロール幅", "サンプル要件", "試験または生産数量"], placeholder: "バッテリー型式、シート寸法、ロール幅、サンプル・技術要件", submit: "要件を送信", submitting: "送信中...", required: "お名前と連絡先を入力してください。", success: "ありがとうございます。要件確認のためご連絡します。", failure: "現在リクエストを送信できません。しばらくしてから再度お試しください。", emailFallback: "メールアプリを開きました。作成済みのメールを送信してください。" }
  },
  es: {
    quote: "Solicitar muestra",
    eyebrow: "Aplicación en motocicletas",
    title: "Separador AGM para baterías de arranque de motocicleta",
    subtitle: "Revisión de separadores AGM en rollo, lámina y muestra para baterías VRLA compactas de motocicleta.",
    primary: "Revisar requisitos de la batería",
    secondary: "Enviar especificaciones",
    proof: ["Baterías de arranque", "Revisión de medidas compactas", "Soporte para muestras"],
    imageAlt: "Separador AGM para batería de arranque de motocicleta",
    overview: ["Enfoque de aplicación", "El separador debe corresponder a la estructura compacta", "Las baterías de arranque de motocicleta suelen tener una estructura interna compacta. El separador debe revisarse según las placas, el montaje y la muestra de batería.", "Los compradores suelen confirmar espesor, tamaño de lámina o ancho de rollo, resistencia de manipulación, absorción de ácido y resistencia eléctrica."],
    parameters: ["Revisión de especificaciones", "Puntos que conviene confirmar antes de comprar", "Los requisitos se revisan con la muestra de batería, el diseño de placas y el proceso de montaje del cliente.", [["Tamaño de lámina o ancho de rollo", "Se confirma según el diseño compacto y el proceso de corte."], ["Espesor", "Se revisa con la separación de placas, la compresión y el montaje."], ["Absorción de ácido", "Se confirma según el diseño y el método de ensayo acordado."], ["Evaluación de muestra", "La conversación puede comenzar antes de cerrar toda la especificación."]]],
    forms: ["Formatos", "Rollos y láminas para montaje compacto", [["Láminas cortadas para pruebas", "Permiten evaluar muestras y realizar montajes de prueba.", "Láminas AGM para baterías de motocicleta"], ["Rollos para corte del cliente", "Formato en rollo para cortar según el diseño de la batería.", "Rollo AGM para producir baterías de motocicleta"], ["Aplicación de batería de arranque", "Ayuda a revisar la estructura de una batería VRLA compacta.", "Aplicación VRLA para motocicleta"], ["Detalle del borde de la lámina", "El estado de la lámina puede revisarse durante la confirmación de muestra.", "Detalle de lámina AGM para motocicleta"]]],
    applications: ["Aplicación", "Baterías de arranque que suelen revisarse", ["Baterías de motocicleta", "Baterías de scooter", "Baterías VRLA compactas", "Desarrollo de muestras"]],
    quality: ["Factores de calidad", "Las medidas y la manipulación requieren atención", "Los ensayos finales dependen de los requisitos y métodos acordados.", [["Revisión dimensional", "Largo y ancho de lámina o ancho de rollo se comparan con la muestra."], ["Revisión de manipulación", "Se puede revisar el comportamiento durante corte y montaje."], ["Ensayos acordados", "Espesor, absorción y resistencia eléctrica se revisan según el objetivo."]]],
    related: ["Páginas relacionadas", "Continuar con producto y muestra"],
    inquiry: { eyebrow: "Consulta", title: "Envíe sus requisitos para batería de motocicleta", text: "Comparta sus datos y el modelo de batería para revisar el formato AGM adecuado para muestra o producción.", checklist: ["Modelo de batería", "Tamaño de lámina o ancho de rollo", "Requisitos de muestra", "Cantidad de prueba o producción"], placeholder: "Modelo, medidas, ancho de rollo, muestra o consulta técnica", submit: "Enviar requisitos", submitting: "Enviando...", required: "Ingrese su nombre y datos de contacto.", success: "Gracias. Nos pondremos en contacto para revisar los requisitos.", failure: "No se puede enviar la solicitud ahora. Inténtelo de nuevo más tarde.", emailFallback: "Se abrió su aplicación de correo. Envíe el mensaje preparado para completar la consulta." }
  },
  pt: {
    quote: "Solicitar amostra",
    eyebrow: "Aplicação em motocicletas",
    title: "Separador AGM para baterias de partida de motocicletas",
    subtitle: "Análise de separadores AGM em rolo, folha e amostra para baterias VRLA compactas de motocicletas.",
    primary: "Analisar requisitos da bateria",
    secondary: "Enviar especificações",
    proof: ["Baterias de partida", "Análise de medidas compactas", "Suporte para amostras"],
    imageAlt: "Separador AGM para bateria de partida de motocicleta",
    overview: ["Foco da aplicação", "O separador deve corresponder à estrutura compacta", "Baterias de partida de motocicletas geralmente possuem estrutura interna compacta. O separador deve ser analisado conforme placas, montagem e amostra da bateria.", "Compradores normalmente confirmam espessura, tamanho da folha ou largura do rolo, resistência ao manuseio, absorção de ácido e resistência elétrica."],
    parameters: ["Análise de especificações", "Pontos a confirmar antes da compra", "Os requisitos são analisados com a amostra da bateria, o projeto das placas e o processo de montagem do cliente.", [["Tamanho da folha ou largura do rolo", "Confirmado conforme o projeto compacto e o processo de corte."], ["Espessura", "Analisada com o espaçamento das placas, compressão e montagem."], ["Absorção de ácido", "Confirmada conforme o projeto e o método de ensaio acordado."], ["Avaliação de amostra", "A conversa pode começar antes de fechar toda a especificação."]]],
    forms: ["Formatos", "Rolos e folhas para montagem compacta", [["Folhas cortadas para testes", "Apoiam avaliação de amostras e montagem experimental.", "Folhas AGM para baterias de motocicletas"], ["Rolos para corte pelo cliente", "Formato em rolo para corte conforme o projeto da bateria.", "Rolo AGM para produzir baterias de motocicletas"], ["Aplicação em bateria de partida", "Ajuda a analisar a estrutura de uma bateria VRLA compacta.", "Aplicação VRLA para motocicleta"], ["Detalhe da borda da folha", "A condição da folha pode ser analisada durante a confirmação da amostra.", "Detalhe de folha AGM para motocicleta"]]],
    applications: ["Aplicação", "Baterias de partida normalmente analisadas", ["Baterias de motocicletas", "Baterias de scooters", "Baterias VRLA compactas", "Desenvolvimento de amostras"]],
    quality: ["Fatores de qualidade", "Medidas e manuseio exigem atenção", "Os ensaios finais dependem dos requisitos e métodos acordados.", [["Análise dimensional", "Comprimento e largura da folha ou do rolo são comparados com a amostra."], ["Análise de manuseio", "O comportamento durante corte e montagem pode ser analisado."], ["Ensaios acordados", "Espessura, absorção e resistência elétrica são analisadas conforme a meta."]]],
    related: ["Páginas relacionadas", "Continuar para produto e amostra"],
    inquiry: { eyebrow: "Consulta", title: "Envie os requisitos da bateria de motocicleta", text: "Compartilhe seus dados e o modelo da bateria para analisar o formato AGM adequado para amostra ou produção.", checklist: ["Modelo da bateria", "Tamanho da folha ou largura do rolo", "Requisitos da amostra", "Quantidade de teste ou produção"], placeholder: "Modelo, medidas, largura do rolo, amostra ou dúvida técnica", submit: "Enviar requisitos", submitting: "Enviando...", required: "Informe seu nome e dados de contato.", success: "Obrigado. Entraremos em contato para analisar os requisitos.", failure: "Não foi possível enviar agora. Tente novamente mais tarde.", emailFallback: "Seu aplicativo de e-mail foi aberto. Envie a mensagem preparada para concluir a consulta." }
  },
  ru: {
    quote: "Запросить образец",
    eyebrow: "Мотоциклетные аккумуляторы",
    title: "AGM-сепаратор для стартерных аккумуляторов мотоциклов",
    subtitle: "Согласование рулонных, листовых и образцовых AGM-сепараторов для компактных VRLA-аккумуляторов.",
    primary: "Обсудить требования",
    secondary: "Отправить спецификацию",
    proof: ["Стартерные аккумуляторы", "Проверка компактных размеров", "Поддержка образцов"],
    imageAlt: "AGM-сепаратор для стартерного аккумулятора мотоцикла",
    overview: ["Особенности применения", "Сепаратор должен соответствовать компактной конструкции", "Стартерные аккумуляторы мотоциклов обычно имеют компактную внутреннюю конструкцию. Сепаратор согласуют с пластинами, способом сборки и образцом аккумулятора.", "Покупатели обычно проверяют толщину, размер листа или ширину рулона, прочность при обработке, впитывание кислоты и электрическое сопротивление."],
    parameters: ["Согласование спецификации", "Что проверить перед закупкой", "Требования рассматриваются вместе с образцом аккумулятора, конструкцией пластин и процессом сборки заказчика.", [["Размер листа или ширина рулона", "Проверяется по компактной конструкции и процессу резки."], ["Толщина", "Рассматривается с зазором пластин, сжатием и сборкой."], ["Впитывание кислоты", "Проверяется по конструкции и согласованной методике испытаний."], ["Оценка образца", "Обсуждение можно начать до утверждения всей спецификации."]]],
    forms: ["Форматы продукции", "Рулоны и листы для компактной сборки", [["Нарезанные листы для испытаний", "Подходят для оценки образцов и пробной сборки.", "Листы AGM для мотоциклетных аккумуляторов"], ["Рулоны для резки заказчиком", "Рулонный формат для резки по конструкции аккумулятора.", "Рулон AGM для мотоциклетных аккумуляторов"], ["Применение в стартерной батарее", "Помогает обсудить конструкцию компактного VRLA-аккумулятора.", "Применение VRLA в мотоцикле"], ["Деталь кромки листа", "Состояние листа проверяется при согласовании образца.", "Деталь листового AGM-сепаратора"]]],
    applications: ["Применение", "Типичные стартерные аккумуляторы", ["Стартерные аккумуляторы мотоциклов", "Аккумуляторы скутеров", "Компактные VRLA-аккумуляторы", "Разработка образцов"]],
    quality: ["Факторы качества", "Размеры и обработка требуют внимания", "Окончательные испытания зависят от согласованных требований и методов.", [["Проверка размеров", "Длина и ширина листа или ширина рулона сопоставляются с образцом."], ["Проверка обработки", "Можно обсудить поведение материала при резке и сборке."], ["Согласованные испытания", "Толщина, впитывание и сопротивление проверяются по целевым требованиям."]]],
    related: ["Связанные страницы", "Перейти к продукции и запросу образца"],
    inquiry: { eyebrow: "Запрос", title: "Отправьте требования к мотоциклетному аккумулятору", text: "Укажите контакты и модель аккумулятора, чтобы согласовать формат AGM для образца или производства.", checklist: ["Модель аккумулятора", "Размер листа или ширина рулона", "Требования к образцу", "Количество для испытаний или производства"], placeholder: "Модель, размеры, ширина рулона, образец или технический вопрос", submit: "Отправить требования", submitting: "Отправка...", required: "Укажите имя и контактные данные.", success: "Спасибо. Мы свяжемся с вами для уточнения требований.", failure: "Сейчас запрос отправить невозможно. Повторите попытку позже.", emailFallback: "Открыто почтовое приложение. Отправьте подготовленное письмо, чтобы завершить запрос." }
  }
};

const motorcycleFormImages = [
  ["/images/sheets1-900.webp", 900, 675],
  ["/images/viking-finished-separator-roll-900.webp", 900, 675],
  ["/images/applications/motorcycle-vrla-battery-application-1200.webp", 1200, 900],
  ["/images/evidence/agm-separator-sheets-detail-01.webp", 1200, 900]
] as const;

function buildMotorcycleApplicationContent(
  lang: AdditionalMotorcycleLocale,
  copy: MotorcycleApplicationCopy
): ProductContent {
  return {
    homePath: `/${lang}/`,
    languagePath: "/applications/agm-separator-for-motorcycle-battery/",
    quote: copy.quote,
    hero: {
      eyebrow: copy.eyebrow,
      title: copy.title,
      subtitle: copy.subtitle,
      primary: copy.primary,
      secondary: copy.secondary,
      proof: copy.proof,
      image: { src: motorcycleFormImages[2][0], alt: copy.imageAlt, width: 1200, height: 900 }
    },
    overview: { eyebrow: copy.overview[0], title: copy.overview[1], paragraphs: [copy.overview[2], copy.overview[3]] },
    parameters: { eyebrow: copy.parameters[0], title: copy.parameters[1], text: copy.parameters[2], items: copy.parameters[3] },
    forms: {
      eyebrow: copy.forms[0],
      title: copy.forms[1],
      items: copy.forms[2].map(([title, text, alt], index) => [title, text, motorcycleFormImages[index][0], alt, motorcycleFormImages[index][1], motorcycleFormImages[index][2]])
    },
    applications: { eyebrow: copy.applications[0], title: copy.applications[1], items: copy.applications[2] },
    quality: { eyebrow: copy.quality[0], title: copy.quality[1], text: copy.quality[2], cards: copy.quality[3] },
    related: { eyebrow: copy.related[0], title: copy.related[1], items: commonRelated[lang] },
    inquiry: copy.inquiry,
    footer: footerCopy[lang]
  };
}

const additionalMotorcycleContent = Object.fromEntries(
  Object.entries(motorcycleApplicationCopy).map(([lang, copy]) => [
    lang,
    buildMotorcycleApplicationContent(lang as AdditionalMotorcycleLocale, copy)
  ])
) as Record<AdditionalMotorcycleLocale, ProductContent>;

function asset(path: string) {
  return `${basePath}${path}`;
}

function localeText(
  lang: SiteLocale,
  en: string,
  zh: string,
  vi: string,
  ko = en,
  ja = en,
  es = en,
  pt = en,
  ru = en
) {
  return lang === "zh"
    ? zh
    : lang === "vi"
      ? vi
      : lang === "ko"
        ? ko
        : lang === "ja"
          ? ja
          : lang === "es"
            ? es
            : lang === "pt"
              ? pt
              : lang === "ru"
                ? ru
                : en;
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
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

function SendIcon({ size = 18, className = "" }: IconProps) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function FactoryIcon({ size = 17, className = "" }: IconProps) {
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
      <path d="M3 21h18" />
      <path d="M4 21V8l6 4V8l6 4V5h4v16" />
      <path d="M7 17h2" />
      <path d="M12 17h2" />
      <path d="M17 17h2" />
    </svg>
  );
}

function PhoneIcon({ size = 20, className = "" }: IconProps) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon({ size = 20, className = "" }: IconProps) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function ArrowUp({ size = 20, className = "" }: IconProps) {
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
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function ProductPage({
  lang,
  page = "agmSeparator"
}: {
  lang: SiteLocale;
  page?: ProductPageKind;
}) {
  const thermalPaperPage = page === "glassFiberThermalInsulationPaper";
  const agmPage = page as Exclude<
    ProductPageKind,
    "glassFiberThermalInsulationPaper"
  >;
  const localizedDetail =
    lang !== "en" &&
    lang !== "zh" &&
    (page === "agmSeparatorRolls" ||
      page === "agmSeparatorSheets" ||
      page === "agmSeparatorTesting")
      ? secondaryDetailContent[lang][page]
      : undefined;
  const localizedApplication =
    lang !== "en" &&
    lang !== "zh" &&
    (page === "agmSeparatorVrlaApplication" ||
      page === "agmSeparatorUpsApplication" ||
      page === "agmSeparatorEnergyStorageApplication")
      ? secondaryApplicationContent[lang][page]
      : undefined;
  const defaults =
    (thermalPaperPage
      ? (thermalInsulationPaperContent[lang] as ProductContent)
      : undefined) ??
    localizedDetail ??
    localizedApplication ??
    (lang === "vi"
      ? viContent[agmPage]
      : lang === "ko"
        ? koContent[agmPage] ??
          (page === "agmSeparatorMotorcycleApplication"
            ? additionalMotorcycleContent.ko
            : undefined)
        : lang === "ja"
          ? jaContent[agmPage] ??
            (page === "agmSeparatorMotorcycleApplication"
              ? additionalMotorcycleContent.ja
              : undefined)
          : lang === "es" || lang === "pt" || lang === "ru"
            ? page === "agmSeparator"
              ? additionalAgmContent[lang]
              : page === "agmSeparatorMotorcycleApplication"
                ? additionalMotorcycleContent[lang]
                : undefined
            : content[agmPage][lang as Lang]);

  if (!defaults) {
    throw new Error(`Missing ${lang} content for product page "${page}"`);
  }

  const t = productContent(page, lang, defaults);
  const lead = (thermalPaperPage
    ? thermalInsulationPaperLeadCopy[lang]
    : leadCaptureCopy[lang]) as (typeof leadCaptureCopy)[SiteLocale];
  const applicationPage = page.endsWith("Application");
  const defaultProduct = thermalPaperPage
    ? "Glass fiber thermal insulation paper"
    : page === "agmSeparatorRolls"
      ? lang === "zh"
        ? "AGM 隔板卷材"
        : lang === "vi"
          ? "Tấm ngăn AGM dạng cuộn"
          : lang === "ko"
            ? "AGM 분리막 롤"
            : lang === "ja"
              ? "AGMセパレーター ロール"
          : "AGM separator rolls"
      : page === "agmSeparatorSheets"
        ? lang === "zh"
          ? "AGM 隔板片材"
          : lang === "vi"
            ? "Tấm ngăn AGM dạng tấm"
            : lang === "ko"
              ? "AGM 분리막 시트"
              : lang === "ja"
                ? "AGMセパレーター シート"
            : "AGM separator sheets"
        : lang === "zh"
          ? "AGM 隔板样品与规格匹配"
          : lang === "vi"
            ? "Yêu cầu mẫu và đối chiếu thông số tấm ngăn AGM"
            : lang === "ko"
              ? "AGM 분리막 샘플 및 사양 검토"
              : lang === "ja"
                ? "AGMセパレーターのサンプル・仕様確認"
                : lang === "es"
                  ? "Muestra de separador AGM y revisión de especificaciones"
                  : lang === "pt"
                    ? "Amostra de separador AGM e análise de especificações"
                    : lang === "ru"
                      ? "Образец AGM-сепаратора и проверка характеристик"
            : "AGM separator sample and specification match";

  return (
    <main className="min-h-screen overflow-hidden bg-frost text-ink">
      <SiteHeader
        lang={lang}
        homePath={t.homePath}
        languagePath={t.languagePath}
        quoteLabel={localeText(
          lang,
          "Request Sample",
          "申请样品",
          "Yêu cầu mẫu",
          "샘플 요청",
          "サンプル依頼",
          "Solicitar muestra",
          "Solicitar amostra",
          "Запросить образец"
        )}
      />

      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#ffffff_0%,#f5f7fa_45%,rgba(14,110,184,0.10)_100%)]" />
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-md border border-line bg-white/88 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-signal shadow-sm">
              <FactoryIcon size={16} />
              <span className="truncate">{t.hero.eyebrow}</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[4rem]">
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
                {localeText(
                  lang,
                  "Request a Sample & Specification Match",
                  "申请样品与规格匹配",
                  "Yêu cầu mẫu và đối chiếu thông số",
                  "샘플 및 사양 검토 요청",
                  "サンプル・仕様確認を依頼",
                  "Solicitar una muestra y revisión de especificaciones",
                  "Solicitar amostra e análise de especificações",
                  "Запросить образец и проверку характеристик"
                )}
                <SendIcon size={18} />
              </a>
              <a
                href="#inquiry-checklist"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/15 bg-white/88 px-6 py-3.5 text-base font-semibold text-ink transition hover:border-signal hover:text-signal"
              >
                {t.hero.secondary}
                <ArrowRight size={18} />
              </a>
            </div>
            <p className="mt-5 inline-flex max-w-2xl items-center gap-2 rounded-md border border-signal/15 bg-white/86 px-4 py-3 text-sm font-bold leading-6 text-graphite shadow-sm">
              <CheckIcon size={17} className="shrink-0 text-signal" />
              {lead.heroPrompt}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {t.hero.proof.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-md border border-white bg-white/82 px-3 py-2 text-sm font-semibold text-graphite shadow-sm"
                >
                  <CheckIcon size={16} className="text-signal" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-line bg-white p-4 shadow-industrial">
            <Image
              src={asset(t.hero.image.src)}
              alt={t.hero.image.alt}
              width={t.hero.image.width}
              height={t.hero.image.height}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.overview.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.overview.title}
            </h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-graphite">
            {t.overview.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.parameters.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.parameters.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-graphite">
              {t.parameters.text}
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.parameters.items.map(([title, description]) => (
              <div
                key={title}
                className="rounded-md border border-line bg-frost p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-signal/10 text-signal">
                    <CheckIcon size={17} />
                  </span>
                  <h3 className="font-bold text-ink">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-steel">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.forms.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.forms.title}
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {t.forms.items.map(([title, description, src, alt, width, height]) => (
              <article
                key={title}
                className="overflow-hidden rounded-md border border-line bg-white shadow-sm"
              >
                <Image
                  src={asset(src)}
                  alt={alt}
                  width={width}
                  height={height}
                  loading="lazy"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-steel">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="applications" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.applications.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.applications.title}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.applications.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-md border border-line bg-frost p-5 text-base font-semibold text-ink"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-signal text-white">
                  <CheckIcon size={17} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {t.quality.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {t.quality.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-graphite">
              {t.quality.text}
            </p>
          </div>
          <div className="grid gap-4">
            {t.quality.cards.map(([title, description]) => (
              <div key={title} className="rounded-md border border-line bg-white p-5">
                <h3 className="font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
            {t.related.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {t.related.title}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {t.related.items.map(([label, href]) => (
              <a
                key={href}
                href={asset(href)}
                className="group rounded-md border border-line bg-frost p-5 font-bold text-ink transition hover:border-signal hover:bg-white hover:text-signal"
              >
                <span>{label}</span>
                <ArrowRight
                  size={16}
                  className="mt-4 transition group-hover:translate-x-1"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
              {lead.faqEyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {lead.faqTitle}
            </h2>
          </div>
          <div className="grid gap-4">
            {lead.faq.map(([question, answer]) => (
              <article key={question} className="rounded-md border border-line bg-white p-5">
                <h3 className="font-bold text-ink">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {!thermalPaperPage && (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <a
            href={asset(
              lang === "zh"
                ? "/zh/request-agm-separator-sample/"
                : lang === "vi"
                  ? "/vi/request-agm-separator-sample/"
                  : lang === "ko"
                    ? "/ko/request-agm-separator-sample/"
                    : lang === "ja"
                      ? "/ja/request-agm-separator-sample/"
                      : lang === "es"
                        ? "/es/request-agm-separator-sample/"
                        : lang === "pt"
                          ? "/pt/request-agm-separator-sample/"
                          : lang === "ru"
                            ? "/ru/request-agm-separator-sample/"
                            : "/request-agm-separator-sample/"
            )}
            className="group rounded-md border border-signal/25 bg-signal p-6 text-white shadow-sm transition hover:bg-ink"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
              {localeText(
                lang,
                "Next Step",
                "下一步",
                "Bước tiếp theo",
                "다음 단계",
                "次のステップ",
                "Siguiente paso",
                "Próximo passo",
                "Следующий шаг"
              )}
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              {localeText(
                lang,
                "Request a Sample & Specification Match",
                "申请样品与规格匹配",
                "Yêu cầu mẫu và đối chiếu thông số",
                "샘플 및 사양 검토 요청",
                "サンプル・仕様確認を依頼",
                "Solicitar una muestra y revisión de especificaciones",
                "Solicitar amostra e análise de especificações",
                "Запросить образец и проверку характеристик"
              )}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/75">
              {localeText(
                lang,
                "Review the information checklist, sample discussion path and production evidence.",
                "查看需要准备的信息、样品沟通流程和真实生产检测证据。",
                "Xem danh sách thông tin, quy trình trao đổi mẫu và bằng chứng sản xuất.",
                "필요 정보, 샘플 협의 절차와 생산 근거를 확인하세요.",
                "必要情報、サンプル協議の流れ、製造情報をご確認ください。",
                "Revise la información necesaria, el proceso de muestras y la evidencia de producción.",
                "Veja as informações necessárias, o processo de amostras e as evidências de produção.",
                "Ознакомьтесь с перечнем данных, процессом обсуждения образцов и производственными материалами."
              )}
            </p>
            <ArrowRight
              size={18}
              className="mt-5 transition group-hover:translate-x-1"
            />
          </a>
          <a
            href={asset("/downloads/viking-agm-technical-capability.pdf")}
            download
            className="group rounded-md border border-line bg-frost p-6 text-ink transition hover:border-signal hover:bg-white"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal">
              {localeText(
                lang,
                "Buyer Reference",
                "采购资料",
                "Tài liệu người mua",
                "구매 참고 자료",
                "購買参考資料",
                "Material para compradores",
                "Material para compradores",
                "Материалы для покупателя"
              )}
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              {localeText(
                lang,
                "Download the Viking AGM Capability PDF",
                "下载维京 AGM 技术能力 PDF",
                "Tải hồ sơ năng lực Viking AGM (EN/ZH)",
                "Viking AGM 영문/중문 PDF 다운로드",
                "Viking AGM英語・中国語PDFをダウンロード",
                "Descargar ficha técnica Viking AGM (EN/ZH)",
                "Baixar ficha técnica Viking AGM (EN/ZH)",
                "Скачать технический обзор Viking AGM (EN/ZH)"
              )}
            </h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              {localeText(
                lang,
                "A bilingual overview of product forms, application discussion, quality checks and packing.",
                "中英文资料，包含产品形式、应用沟通、质量检查和包装说明。",
                "Tài liệu tiếng Anh và tiếng Trung về dạng sản phẩm, ứng dụng, kiểm tra chất lượng và đóng gói.",
                "제품 형태, 적용 분야, 품질 검사와 포장을 소개하는 영문·중문 자료입니다.",
                "製品形状、用途、品質検査、梱包をまとめた英語・中国語資料です。",
                "Documento en inglés y chino sobre formatos, aplicaciones, controles de calidad y embalaje.",
                "Documento em inglês e chinês sobre formatos, aplicações, controles de qualidade e embalagem.",
                "Материал на английском и китайском языках о формах поставки, применении, контроле качества и упаковке."
              )}
            </p>
            <ArrowRight
              size={18}
              className="mt-5 text-signal transition group-hover:translate-x-1"
            />
          </a>
          </div>
        </section>
      )}

      <section id="contact" className="bg-ink px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div id="inquiry-checklist">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
              {t.inquiry.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              {t.inquiry.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/78">
              {lead.formText}
            </p>
            <div className="mt-8 grid gap-3">
              {lead.checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-md border border-white/12 bg-white/7 p-4 font-semibold"
                >
                  <CheckIcon size={17} className="text-sky-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <InquiryForm
            lang={lang}
            variant={thermalPaperPage ? "thermalInsulation" : "agm"}
            defaultApplication={applicationPage ? t.hero.title : ""}
            defaultInterestedProduct={defaultProduct}
            messagePlaceholder={lead.messagePlaceholder}
            className="sm:p-8"
          />
        </div>
      </section>

      <Footer lang={lang} copy={t.footer} />
      <QuickActions lang={lang} />
    </main>
  );
}

function Footer({
  lang,
  copy
}: {
  lang: SiteLocale;
  copy: ProductContent["footer"];
}) {
  return (
    <footer className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-start">
        <div className="flex items-start gap-4">
          <Image
            src={asset("/images/viking-logo-footer-320.webp")}
            alt="Viking Technology logo"
            width={320}
            height={320}
            loading="lazy"
            className="h-auto w-36 object-contain"
          />
          <div>
            <h2 className="text-lg font-bold text-ink">
              Hubei Viking Technology Co., Ltd.
            </h2>
            <p className="mt-1 text-sm text-steel">湖北维京科技有限公司</p>
            <p className="mt-4 max-w-xl leading-7 text-graphite">
              {copy.description}
            </p>
            <SocialLinks lang={lang} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-frost p-4">
            <Image
              src={asset("/images/qrcode_for_logo.jpg")}
              alt={copy.wechat}
              width={160}
              height={160}
              loading="lazy"
              className="mx-auto h-28 w-28 object-contain"
            />
            <p
              id="wechat-qr"
              className="mt-3 scroll-mt-28 text-center text-sm font-semibold text-ink"
            >
              {copy.wechat}
            </p>
          </div>
          <div className="rounded-md border border-line bg-frost p-4">
            <Image
              src={asset("/images/website-logo-180.webp")}
              alt={copy.mobile}
              width={160}
              height={160}
              loading="lazy"
              className="mx-auto h-28 w-28 object-contain"
            />
            <p className="mt-3 text-center text-sm font-semibold text-ink">
              {copy.mobile}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-line pt-6 text-sm text-steel">
        <div>
          © 2026 Hubei Viking Technology Co., Ltd.{" "}
          {localeText(
            lang,
            "All rights reserved.",
            "保留所有权利。",
            "Bảo lưu mọi quyền.",
            "모든 권리 보유.",
            "All rights reserved.",
            "Todos los derechos reservados.",
            "Todos os direitos reservados.",
            "Все права защищены."
          )}
        </div>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex font-semibold transition hover:text-signal"
        >
          {icpLicense}
        </a>
      </div>
    </footer>
  );
}

function QuickActions({ lang }: { lang: SiteLocale }) {
  const ui = sharedMessages[lang];
  const [copied, setCopied] = useState<"phone" | "email" | null>(null);

  async function copyValue(type: "phone" | "email", value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      window.prompt(ui.copied, value);
    }
  }

  function scrollToWechat() {
    document.getElementById("wechat-qr")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  return (
    <div className="fixed bottom-5 right-4 z-40 hidden flex-col gap-2 sm:bottom-8 sm:right-6 sm:flex">
      <button
        type="button"
        aria-label={ui.openWechat}
        onClick={scrollToWechat}
        className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-signal text-white shadow-industrial transition hover:bg-ink"
      >
        <span className="text-xs font-black">微</span>
        <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-bold text-white shadow-sm group-hover:block group-focus:block">
          {ui.openWechat}
        </span>
      </button>
      <button
        type="button"
        aria-label={`${ui.copyPhone}: ${contactInfo.phone}`}
        onClick={() => copyValue("phone", contactInfo.phone)}
        className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-signal text-white shadow-industrial transition hover:bg-ink"
      >
        <PhoneIcon />
        <span
          className={`pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-bold text-white shadow-sm ${
            copied === "phone" ? "block" : "hidden group-hover:block group-focus:block"
          }`}
        >
          {copied === "phone" ? ui.copied : contactInfo.phone}
        </span>
      </button>
      <button
        type="button"
        aria-label={`${ui.copyEmail}: ${contactInfo.email}`}
        onClick={() => copyValue("email", contactInfo.email)}
        className="group relative flex h-12 w-12 items-center justify-center rounded-md bg-signal text-white shadow-industrial transition hover:bg-ink"
      >
        <MailIcon />
        <span
          className={`pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-bold text-white shadow-sm ${
            copied === "email" ? "block" : "hidden group-hover:block group-focus:block"
          }`}
        >
          {copied === "email" ? ui.copied : contactInfo.email}
        </span>
      </button>
      <button
        type="button"
        aria-label={ui.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-12 w-12 items-center justify-center rounded-md bg-ink text-white shadow-industrial transition hover:bg-signal"
      >
        <ArrowUp />
      </button>
    </div>
  );
}
