import Image from "next/image";
import type { SiteLocale } from "./locales";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const serviceLabels: Record<SiteLocale, string> = {
  en: "Official WeChat customer service",
  zh: "官方微信客服",
  vi: "Chăm sóc khách hàng chính thức qua WeChat",
  ko: "공식 WeChat 고객 지원",
  ja: "公式WeChatカスタマーサポート",
  es: "Atención oficial al cliente por WeChat",
  pt: "Atendimento oficial pelo WeChat",
  ru: "Официальная поддержка в WeChat",
  ar: "خدمة العملاء الرسمية عبر WeChat"
};

export function FooterQrCodes({
  lang,
  wechatLabel,
  mobileLabel,
  wechatAnchor = false,
  className = ""
}: {
  lang: SiteLocale;
  wechatLabel: string;
  mobileLabel: string;
  wechatAnchor?: boolean;
  className?: string;
}) {
  const cards = [
    { label: wechatLabel, src: "/images/qrcode_for_logo.jpg", width: 180, height: 180 },
    { label: serviceLabels[lang], src: "/images/wechat-customer-service-qr.jpg", width: 668, height: 687 },
    { label: mobileLabel, src: "/images/website-logo-180.webp", width: 180, height: 180 }
  ];

  return (
    <div className={`grid gap-4 sm:grid-cols-3 ${className}`.trim()}>
      {cards.map(({ label, src, width, height }, index) => (
        <div key={src} className="min-w-0 rounded-md border border-line bg-frost p-3">
          <Image
            src={`${basePath}${src}`}
            alt={label}
            width={width}
            height={height}
            unoptimized
            loading="lazy"
            className="mx-auto h-28 w-28 max-w-full bg-white object-contain"
          />
          <p
            id={wechatAnchor && index === 0 ? "wechat-qr" : undefined}
            className="mt-3 scroll-mt-28 break-words text-center text-sm font-semibold leading-6 text-graphite"
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
