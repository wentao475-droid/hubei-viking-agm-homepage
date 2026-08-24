"use client";

import { FormEvent, useEffect, useState } from "react";
import type { SiteLocale } from "./locales";
import { thermalInsulationPaperFormCopy } from "../content/thermal-insulation-paper.mjs";

type InquiryFormProps = {
  lang: SiteLocale;
  className?: string;
  defaultApplication?: string;
  defaultInterestedProduct?: string;
  messagePlaceholder?: string;
  variant?: "agm" | "thermalInsulation";
};

type FormState = "idle" | "error" | "success" | "failure" | "emailFallback";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/inquiry";
const staticFormFallback =
  process.env.NEXT_PUBLIC_STATIC_FORM_FALLBACK === "true";
const inquiryEmail =
  process.env.NEXT_PUBLIC_INQUIRY_EMAIL || "vikingsales@vikingagm.com";
const inquiryPhone = "+86 18171518528";

const copy = {
  en: {
    fields: {
      name: "Name",
      contact: "Email / WhatsApp / Phone",
      company: "Company",
      country: "Country / Region",
      application: "Battery Application",
      interestedProduct: "Product Format",
      message: "Specification or Sample Notes"
    },
    placeholders: {
      name: "Your full name",
      contact: "Email, WhatsApp or phone number",
      company: "Company name (optional)",
      country: "Country or region (optional)",
      application: "Select a battery application (optional)",
      interestedProduct: "Select a product format (optional)",
      message:
        "Optional: thickness, width, sheet size, quantity, sample or test requirements"
    },
    options: {
      applications: [
        ["UPS / standby power", "UPS / Standby power"],
        ["Energy storage battery", "Energy storage battery"],
        ["Motorcycle battery", "Motorcycle starting battery"],
        ["Automotive starting battery", "Automotive starting battery"],
        ["Telecom backup power", "Telecom backup power"],
        ["E-bike battery", "E-bike / light electric vehicle"],
        ["Other VRLA lead-acid battery", "Other VRLA lead-acid battery"],
        ["Not sure", "Not sure yet"]
      ],
      productFormats: [
        ["AGM separator rolls", "AGM separator rolls"],
        ["AGM separator sheets", "AGM separator sheets"],
        ["Rolls and sheets", "Rolls and sheets"],
        ["Not sure", "Not sure yet"]
      ]
    },
    submit: "Request Sample & Specification Match",
    submitting: "Sending...",
    required: "Please enter your name and at least one contact method.",
    success:
      "Thank you. Your request has been saved and our team will contact you to confirm the next step.",
    failure:
      "The online form could not be sent. Contact us directly by email or phone.",
    emailFallback:
      "Your email client has been opened. Send the prepared email to complete your request.",
    email: "Email us",
    phone: "Call or message",
    subject: "AGM separator sample and specification request - Viking AGM"
  },
  zh: {
    fields: {
      name: "姓名",
      contact: "邮箱 / 微信 / 手机号",
      company: "公司",
      country: "国家或地区",
      application: "电池应用",
      interestedProduct: "产品形式",
      message: "规格或样品说明"
    },
    placeholders: {
      name: "您的姓名",
      contact: "邮箱、微信号或手机号",
      company: "公司名称（选填）",
      country: "国家或地区（选填）",
      application: "请选择电池应用（选填）",
      interestedProduct: "请选择产品形式（选填）",
      message: "选填：厚度、宽度、片材尺寸、数量、样品或检测需求"
    },
    options: {
      applications: [
        ["UPS / standby power", "UPS / 备用电源"],
        ["Energy storage battery", "储能电池"],
        ["Motorcycle battery", "摩托车启动电池"],
        ["Automotive starting battery", "汽车启动电池"],
        ["Telecom backup power", "通信后备电源"],
        ["E-bike battery", "电动车电池"],
        ["Other VRLA lead-acid battery", "其他 VRLA 铅酸电池"],
        ["Not sure", "暂不确定"]
      ],
      productFormats: [
        ["AGM separator rolls", "AGM 隔板卷材"],
        ["AGM separator sheets", "AGM 隔板片材"],
        ["Rolls and sheets", "卷材和片材"],
        ["Not sure", "暂不确定"]
      ]
    },
    submit: "申请样品与规格匹配",
    submitting: "发送中...",
    required: "请填写姓名和至少一种联系方式。",
    success: "提交成功。我们会联系您确认样品和规格沟通的下一步。",
    failure: "在线表单暂时无法发送，请直接通过邮箱或电话联系我们。",
    emailFallback: "已打开邮件客户端，请发送已准备好的邮件完成申请。",
    email: "发送邮件",
    phone: "电话或消息联系",
    subject: "AGM 隔板样品与规格匹配申请 - 湖北维京"
  },
  vi: {
    fields: {
      name: "Họ và tên",
      contact: "Email / WhatsApp / Điện thoại",
      company: "Công ty",
      country: "Quốc gia / Khu vực",
      application: "Ứng dụng ắc quy",
      interestedProduct: "Dạng sản phẩm",
      message: "Thông số hoặc yêu cầu mẫu"
    },
    placeholders: {
      name: "Họ và tên của bạn",
      contact: "Email, WhatsApp hoặc số điện thoại",
      company: "Tên công ty (không bắt buộc)",
      country: "Quốc gia hoặc khu vực (không bắt buộc)",
      application: "Chọn ứng dụng ắc quy (không bắt buộc)",
      interestedProduct: "Chọn dạng sản phẩm (không bắt buộc)",
      message:
        "Không bắt buộc: độ dày, chiều rộng, kích thước tấm, số lượng, yêu cầu mẫu hoặc thử nghiệm"
    },
    options: {
      applications: [
        ["UPS / standby power", "UPS / Nguồn điện dự phòng"],
        ["Energy storage battery", "Ắc quy lưu trữ năng lượng"],
        ["Motorcycle battery", "Ắc quy khởi động xe máy"],
        ["Automotive starting battery", "Ắc quy khởi động ô tô"],
        ["Telecom backup power", "Nguồn dự phòng viễn thông"],
        ["E-bike battery", "Ắc quy xe điện nhẹ"],
        ["Other VRLA lead-acid battery", "Ắc quy axit-chì VRLA khác"],
        ["Not sure", "Chưa xác định"]
      ],
      productFormats: [
        ["AGM separator rolls", "Tấm ngăn AGM dạng cuộn"],
        ["AGM separator sheets", "Tấm ngăn AGM dạng tấm"],
        ["Rolls and sheets", "Dạng cuộn và dạng tấm"],
        ["Not sure", "Chưa xác định"]
      ]
    },
    submit: "Yêu cầu mẫu và đối chiếu thông số",
    submitting: "Đang gửi...",
    required: "Vui lòng nhập họ tên và ít nhất một phương thức liên hệ.",
    success:
      "Cảm ơn bạn. Yêu cầu đã được lưu và đội ngũ của chúng tôi sẽ liên hệ để xác nhận bước tiếp theo.",
    failure:
      "Không thể gửi biểu mẫu trực tuyến. Vui lòng liên hệ trực tiếp qua email hoặc điện thoại.",
    emailFallback:
      "Ứng dụng email đã được mở. Vui lòng gửi email đã chuẩn bị để hoàn tất yêu cầu.",
    email: "Gửi email",
    phone: "Gọi điện hoặc nhắn tin",
    subject: "Yêu cầu mẫu và đối chiếu thông số tấm ngăn AGM - Viking AGM"
  },
  ko: {
    fields: {
      name: "이름",
      contact: "이메일 / WhatsApp / 전화번호",
      company: "회사명",
      country: "국가 / 지역",
      application: "배터리 적용 분야",
      interestedProduct: "제품 형태",
      message: "사양 또는 샘플 요청 사항"
    },
    placeholders: {
      name: "이름을 입력해 주세요",
      contact: "이메일, WhatsApp 또는 전화번호",
      company: "회사명 (선택)",
      country: "국가 또는 지역 (선택)",
      application: "배터리 적용 분야 선택 (선택)",
      interestedProduct: "제품 형태 선택 (선택)",
      message: "선택: 두께, 폭, 시트 규격, 수량, 샘플 또는 시험 요구사항"
    },
    options: {
      applications: [
        ["UPS / standby power", "UPS / 비상 전원"],
        ["Energy storage battery", "에너지 저장 배터리"],
        ["Motorcycle battery", "오토바이 시동 배터리"],
        ["Automotive starting battery", "자동차 시동 배터리"],
        ["Telecom backup power", "통신 백업 전원"],
        ["E-bike battery", "전기 이륜차 배터리"],
        ["Other VRLA lead-acid battery", "기타 VRLA 납축전지"],
        ["Not sure", "미정"]
      ],
      productFormats: [
        ["AGM separator rolls", "AGM 분리막 롤"],
        ["AGM separator sheets", "AGM 분리막 시트"],
        ["Rolls and sheets", "롤 및 시트"],
        ["Not sure", "미정"]
      ]
    },
    submit: "샘플 및 사양 검토 요청",
    submitting: "전송 중...",
    required: "이름과 하나 이상의 연락처를 입력해 주세요.",
    success:
      "요청이 접수되었습니다. 샘플 및 사양 확인을 위해 담당자가 연락드리겠습니다.",
    failure:
      "온라인 양식을 전송할 수 없습니다. 이메일 또는 전화로 직접 문의해 주세요.",
    emailFallback:
      "이메일 프로그램이 열렸습니다. 준비된 이메일을 전송해 요청을 완료해 주세요.",
    email: "이메일 보내기",
    phone: "전화 또는 메시지",
    subject: "AGM 분리막 샘플 및 사양 검토 요청 - Viking AGM"
  },
  ja: {
    fields: {
      name: "お名前",
      contact: "メール / WhatsApp / 電話番号",
      company: "会社名",
      country: "国・地域",
      application: "バッテリー用途",
      interestedProduct: "製品形状",
      message: "仕様・サンプルに関するご要望"
    },
    placeholders: {
      name: "お名前を入力してください",
      contact: "メール、WhatsAppまたは電話番号",
      company: "会社名（任意）",
      country: "国または地域（任意）",
      application: "バッテリー用途を選択（任意）",
      interestedProduct: "製品形状を選択（任意）",
      message: "任意：厚さ、幅、シート寸法、数量、サンプル・試験要件"
    },
    options: {
      applications: [
        ["UPS / standby power", "UPS / 非常用電源"],
        ["Energy storage battery", "蓄電池"],
        ["Motorcycle battery", "二輪車始動用バッテリー"],
        ["Automotive starting battery", "自動車始動用バッテリー"],
        ["Telecom backup power", "通信バックアップ電源"],
        ["E-bike battery", "電動二輪車用バッテリー"],
        ["Other VRLA lead-acid battery", "その他のVRLA鉛蓄電池"],
        ["Not sure", "未定"]
      ],
      productFormats: [
        ["AGM separator rolls", "AGMセパレーター ロール"],
        ["AGM separator sheets", "AGMセパレーター シート"],
        ["Rolls and sheets", "ロール・シート"],
        ["Not sure", "未定"]
      ]
    },
    submit: "サンプル・仕様確認を依頼",
    submitting: "送信中...",
    required: "お名前と1つ以上の連絡先を入力してください。",
    success:
      "ご依頼を受け付けました。サンプルと仕様確認のため担当者よりご連絡します。",
    failure:
      "オンラインフォームを送信できませんでした。メールまたは電話で直接お問い合わせください。",
    emailFallback:
      "メールアプリを開きました。作成済みのメールを送信して依頼を完了してください。",
    email: "メールを送る",
    phone: "電話・メッセージ",
    subject: "AGMセパレーターのサンプル・仕様確認依頼 - Viking AGM"
  },
  es: {
    fields: {
      name: "Nombre",
      contact: "Email / WhatsApp / Teléfono",
      company: "Empresa",
      country: "País / Región",
      application: "Aplicación de la batería",
      interestedProduct: "Formato del producto",
      message: "Notas sobre especificaciones o muestras"
    },
    placeholders: {
      name: "Nombre completo",
      contact: "Email, WhatsApp o número de teléfono",
      company: "Nombre de la empresa (opcional)",
      country: "País o región (opcional)",
      application: "Seleccione una aplicación (opcional)",
      interestedProduct: "Seleccione un formato (opcional)",
      message:
        "Opcional: espesor, ancho, tamaño de lámina, cantidad y requisitos de muestra o ensayo"
    },
    options: {
      applications: [
        ["UPS / standby power", "UPS / Energía de respaldo"],
        ["Energy storage battery", "Batería de almacenamiento de energía"],
        ["Motorcycle battery", "Batería de arranque para motocicleta"],
        ["Automotive starting battery", "Batería de arranque automotriz"],
        ["Telecom backup power", "Respaldo para telecomunicaciones"],
        ["E-bike battery", "Batería para vehículo eléctrico ligero"],
        ["Other VRLA lead-acid battery", "Otra batería de plomo-ácido VRLA"],
        ["Not sure", "Aún no definido"]
      ],
      productFormats: [
        ["AGM separator rolls", "Separador AGM en rollos"],
        ["AGM separator sheets", "Separador AGM en láminas"],
        ["Rolls and sheets", "Rollos y láminas"],
        ["Not sure", "Aún no definido"]
      ]
    },
    submit: "Solicitar una muestra y revisión de especificaciones",
    submitting: "Enviando...",
    required: "Ingrese su nombre y al menos un medio de contacto.",
    success:
      "Gracias. Guardamos su solicitud y nuestro equipo se comunicará para confirmar el siguiente paso.",
    failure:
      "No fue posible enviar el formulario. Contáctenos directamente por email o teléfono.",
    emailFallback:
      "Se abrió su aplicación de email. Envíe el mensaje preparado para completar la solicitud.",
    email: "Enviar email",
    phone: "Llamar o enviar mensaje",
    subject:
      "Solicitud de muestra y revisión de especificaciones AGM - Viking AGM"
  },
  pt: {
    fields: {
      name: "Nome",
      contact: "E-mail / WhatsApp / Telefone",
      company: "Empresa",
      country: "País / Região",
      application: "Aplicação da bateria",
      interestedProduct: "Formato do produto",
      message: "Observações sobre especificação ou amostra"
    },
    placeholders: {
      name: "Nome completo",
      contact: "E-mail, WhatsApp ou número de telefone",
      company: "Nome da empresa (opcional)",
      country: "País ou região (opcional)",
      application: "Selecione uma aplicação (opcional)",
      interestedProduct: "Selecione um formato (opcional)",
      message:
        "Opcional: espessura, largura, tamanho da folha, quantidade e requisitos de amostra ou ensaio"
    },
    options: {
      applications: [
        ["UPS / standby power", "UPS / Energia de reserva"],
        ["Energy storage battery", "Bateria de armazenamento de energia"],
        ["Motorcycle battery", "Bateria de partida para motocicleta"],
        ["Automotive starting battery", "Bateria de partida automotiva"],
        ["Telecom backup power", "Energia de reserva para telecomunicações"],
        ["E-bike battery", "Bateria para veículo elétrico leve"],
        ["Other VRLA lead-acid battery", "Outra bateria chumbo-ácido VRLA"],
        ["Not sure", "Ainda não definido"]
      ],
      productFormats: [
        ["AGM separator rolls", "Separador AGM em rolos"],
        ["AGM separator sheets", "Separador AGM em folhas"],
        ["Rolls and sheets", "Rolos e folhas"],
        ["Not sure", "Ainda não definido"]
      ]
    },
    submit: "Solicitar amostra e análise de especificações",
    submitting: "Enviando...",
    required: "Informe seu nome e pelo menos um meio de contato.",
    success:
      "Obrigado. Sua solicitação foi registrada e nossa equipe entrará em contato para confirmar a próxima etapa.",
    failure:
      "Não foi possível enviar o formulário. Entre em contato diretamente por e-mail ou telefone.",
    emailFallback:
      "Seu aplicativo de e-mail foi aberto. Envie a mensagem preparada para concluir a solicitação.",
    email: "Enviar e-mail",
    phone: "Ligar ou enviar mensagem",
    subject:
      "Solicitação de amostra e análise de especificações AGM - Viking AGM"
  },
  ru: {
    fields: {
      name: "Имя",
      contact: "Email / WhatsApp / Телефон",
      company: "Компания",
      country: "Страна / Регион",
      application: "Назначение аккумулятора",
      interestedProduct: "Формат продукции",
      message: "Требования к характеристикам или образцу"
    },
    placeholders: {
      name: "Ваше имя",
      contact: "Email, WhatsApp или номер телефона",
      company: "Название компании (необязательно)",
      country: "Страна или регион (необязательно)",
      application: "Выберите назначение (необязательно)",
      interestedProduct: "Выберите формат (необязательно)",
      message:
        "Необязательно: толщина, ширина, размер листа, количество, требования к образцу или испытаниям"
    },
    options: {
      applications: [
        ["UPS / standby power", "ИБП / резервное питание"],
        ["Energy storage battery", "Аккумулятор для хранения энергии"],
        ["Motorcycle battery", "Стартерный аккумулятор для мотоцикла"],
        ["Automotive starting battery", "Автомобильный стартерный аккумулятор"],
        ["Telecom backup power", "Резервное питание для телекоммуникаций"],
        ["E-bike battery", "Аккумулятор для лёгкого электротранспорта"],
        ["Other VRLA lead-acid battery", "Другой свинцово-кислотный аккумулятор VRLA"],
        ["Not sure", "Пока не определено"]
      ],
      productFormats: [
        ["AGM separator rolls", "AGM-сепаратор в рулонах"],
        ["AGM separator sheets", "AGM-сепаратор в листах"],
        ["Rolls and sheets", "Рулоны и листы"],
        ["Not sure", "Пока не определено"]
      ]
    },
    submit: "Запросить образец и проверку характеристик",
    submitting: "Отправка...",
    required: "Укажите имя и хотя бы один способ связи.",
    success:
      "Спасибо. Ваш запрос сохранён, и наша команда свяжется с вами для согласования следующего шага.",
    failure:
      "Не удалось отправить онлайн-форму. Свяжитесь с нами напрямую по email или телефону.",
    emailFallback:
      "Открыта почтовая программа. Отправьте подготовленное письмо, чтобы завершить запрос.",
    email: "Написать по email",
    phone: "Позвонить или отправить сообщение",
    subject:
      "Запрос образца и проверка характеристик AGM-сепаратора - Viking AGM"
  },
  ar: {
    fields: { name: "الاسم", contact: "البريد الإلكتروني / واتساب / الهاتف", company: "الشركة", country: "الدولة / المنطقة", application: "تطبيق البطارية", interestedProduct: "شكل المنتج", message: "ملاحظات المواصفات أو العينة" },
    placeholders: {
      name: "الاسم الكامل", contact: "البريد الإلكتروني أو واتساب أو رقم الهاتف", company: "اسم الشركة (اختياري)", country: "الدولة أو المنطقة (اختياري)", application: "اختر تطبيق البطارية (اختياري)", interestedProduct: "اختر شكل المنتج (اختياري)", message: "اختياري: السمك أو العرض أو مقاس اللوح أو الكمية أو متطلبات العينة أو الاختبار"
    },
    options: {
      applications: [["UPS / standby power", "UPS / طاقة احتياطية"], ["Energy storage battery", "بطارية تخزين الطاقة"], ["Motorcycle battery", "بطارية بدء تشغيل الدراجة النارية"], ["Automotive starting battery", "بطارية بدء تشغيل السيارات"], ["Telecom backup power", "طاقة احتياطية للاتصالات"], ["E-bike battery", "بطارية دراجة كهربائية"], ["Other VRLA lead-acid battery", "بطارية رصاصية حمضية VRLA أخرى"], ["Not sure", "غير محدد بعد"]],
      productFormats: [["AGM separator rolls", "لفائف فاصل AGM"], ["AGM separator sheets", "ألواح فاصل AGM"], ["Rolls and sheets", "لفائف وألواح"], ["Not sure", "غير محدد بعد"]]
    },
    submit: "طلب عينة ومطابقة المواصفات", submitting: "جارٍ الإرسال...", required: "يرجى إدخال الاسم وطريقة اتصال واحدة على الأقل.",
    success: "شكراً لكم. تم حفظ طلبكم وسيتواصل فريقنا لتأكيد الخطوة التالية.",
    failure: "تعذر إرسال النموذج عبر الإنترنت. يرجى التواصل معنا مباشرة بالبريد الإلكتروني أو الهاتف.",
    emailFallback: "تم فتح برنامج البريد الإلكتروني. أرسلوا الرسالة المعدة لإكمال الطلب.",
    email: "راسلونا بالبريد", phone: "اتصال أو رسالة", subject: "طلب عينة ومطابقة مواصفات فاصل AGM - Viking AGM"
  }
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function InquiryForm({
  lang,
  className = "",
  defaultApplication = "",
  defaultInterestedProduct = "",
  messagePlaceholder,
  variant = "agm"
}: InquiryFormProps) {
  const baseCopy = copy[lang];
  const thermalCopy = thermalInsulationPaperFormCopy[lang];
  const t =
    variant === "thermalInsulation"
      ? {
          ...baseCopy,
          fields: {
            ...baseCopy.fields,
            application: thermalCopy.applicationLabel,
            interestedProduct: thermalCopy.productLabel,
            message: thermalCopy.messageLabel
          },
          placeholders: {
            ...baseCopy.placeholders,
            application: thermalCopy.applicationPlaceholder,
            interestedProduct: thermalCopy.productPlaceholder,
            message: thermalCopy.messagePlaceholder
          },
          options: {
            applications: thermalCopy.applications,
            productFormats: thermalCopy.formats
          },
          submit: thermalCopy.submit,
          subject: thermalCopy.subject
        }
      : baseCopy;
  const [formState, setFormState] = useState<FormState>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fallbackMailto, setFallbackMailto] = useState(
    `mailto:${inquiryEmail}?subject=${encodeURIComponent(t.subject)}`
  );

  useEffect(() => {
    ensureFirstTouch();
  }, []);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const valid = ["name", "contact"].every((field) =>
      String(formData.get(field) || "").trim()
    );

    if (!valid) {
      setFormState("error");
      return;
    }

    appendAttribution(formData, lang);
    const mailto = buildInquiryMailto(formData, lang, variant);
    setFallbackMailto(mailto);

    if (staticFormFallback) {
      window.location.href = mailto;
      setFormState("emailFallback");
      return;
    }

    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        body.append(key, value);
      }
    });

    setIsSubmitting(true);
    setFormState("idle");

    try {
      const response = await fetch(asset(formEndpoint), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });

      if (!response.ok) {
        throw new Error("Inquiry submission failed");
      }

      setFormState("success");
      form.reset();
    } catch {
      setFormState("failure");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      name="inquiry"
      method="POST"
      action={asset(formEndpoint)}
      onSubmit={submitInquiry}
      className={`rounded-md bg-white p-5 text-ink shadow-industrial sm:p-7 ${className}`}
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
        <Field
          name="name"
          label={t.fields.name}
          placeholder={t.placeholders.name}
          required
        />
        <Field
          name="contact"
          label={t.fields.contact}
          placeholder={t.placeholders.contact}
          required
          direction="ltr"
        />
        <Field
          name="company"
          label={t.fields.company}
          placeholder={t.placeholders.company}
        />
        <Field
          name="country"
          label={t.fields.country}
          placeholder={t.placeholders.country}
        />
        <SelectField
          name="application"
          label={t.fields.application}
          placeholder={t.placeholders.application}
          options={t.options.applications}
          defaultValue={resolveApplicationDefault(defaultApplication)}
        />
        <SelectField
          name="interestedProduct"
          label={t.fields.interestedProduct}
          placeholder={t.placeholders.interestedProduct}
          options={t.options.productFormats}
          defaultValue={resolveProductFormatDefault(defaultInterestedProduct)}
        />
        <label className="sm:col-span-2">
          <span className="text-sm font-bold text-graphite">{t.fields.message}</span>
          <textarea
            name="message"
            rows={5}
            placeholder={messagePlaceholder || t.placeholders.message}
            dir="auto"
            className="mt-2 w-full resize-none rounded-md border border-line bg-frost px-4 py-3 text-sm outline-none transition placeholder:text-steel/70 focus:border-signal focus:bg-white"
          />
        </label>
      </div>

      {formState !== "idle" && (
        <div
          aria-live="polite"
          className={`mt-5 rounded-md px-4 py-3 text-sm font-semibold ${
            formState === "success" || formState === "emailFallback"
              ? "bg-emerald-50 text-emerald-700"
              : formState === "failure"
                ? "bg-rose-50 text-rose-700"
                : "bg-amber-50 text-amber-800"
          }`}
        >
          {formState === "success"
            ? t.success
            : formState === "failure"
              ? t.failure
              : formState === "emailFallback"
                ? t.emailFallback
                : t.required}
          {formState === "failure" && (
            <div className="mt-3 flex flex-wrap gap-3">
              <a className="underline underline-offset-4" href={fallbackMailto}>
                {t.email}
              </a>
              <a
                className="underline underline-offset-4"
                href={`tel:${inquiryPhone.replace(/\s+/g, "")}`}
              >
                {t.phone}: {inquiryPhone}
              </a>
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-signal px-6 py-3.5 text-base font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-steel sm:w-auto"
      >
        {isSubmitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  defaultValue,
  required = false,
  direction = "auto"
}: {
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  required?: boolean;
  direction?: "auto" | "ltr";
}) {
  return (
    <label>
      <span className="text-sm font-bold text-graphite">{label}</span>
      <input
        name={name}
        type="text"
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        dir={direction}
        className="mt-2 w-full rounded-md border border-line bg-frost px-4 py-3 text-sm outline-none transition placeholder:text-steel/70 focus:border-signal focus:bg-white"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  placeholder,
  options,
  defaultValue = ""
}: {
  name: string;
  label: string;
  placeholder: string;
  options: ReadonlyArray<readonly [value: string, label: string]>;
  defaultValue?: string;
}) {
  return (
    <label>
      <span className="text-sm font-bold text-graphite">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        dir="auto"
        className="mt-2 w-full cursor-pointer rounded-md border border-line bg-frost px-4 py-3 text-sm text-ink outline-none transition focus:border-signal focus:bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map(([value, optionLabel]) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function resolveApplicationDefault(value: string) {
  const normalized = value.toLowerCase();

  if (
    normalized.includes("ups") ||
    normalized.includes("备用") ||
    normalized.includes("dự phòng") ||
    normalized.includes("respaldo") ||
    normalized.includes("backup") ||
    normalized.includes("резерв")
  ) {
    return "UPS / standby power";
  }
  if (
    normalized.includes("energy storage") ||
    normalized.includes("储能") ||
    normalized.includes("lưu trữ") ||
    normalized.includes("almacenamiento") ||
    normalized.includes("armazenamento") ||
    normalized.includes("накоплен")
  ) {
    return "Energy storage battery";
  }
  if (
    normalized.includes("motorcycle") ||
    normalized.includes("摩托") ||
    normalized.includes("xe máy") ||
    normalized.includes("motocic") ||
    normalized.includes("мотоцикл")
  ) {
    return "Motorcycle battery";
  }
  if (
    normalized.includes("automotive") ||
    normalized.includes("汽车") ||
    normalized.includes("ô tô") ||
    normalized.includes("automotr") ||
    normalized.includes("automotiv") ||
    normalized.includes("автомоб")
  ) {
    return "Automotive starting battery";
  }
  if (
    normalized.includes("telecom") ||
    normalized.includes("通信") ||
    normalized.includes("viễn thông") ||
    normalized.includes("телеком")
  ) {
    return "Telecom backup power";
  }
  if (
    normalized.includes("e-bike") ||
    normalized.includes("electric vehicle") ||
    normalized.includes("电动车") ||
    normalized.includes("xe điện") ||
    normalized.includes("bicicleta eléctrica") ||
    normalized.includes("bicicleta elétrica") ||
    normalized.includes("электровелосип")
  ) {
    return "E-bike battery";
  }
  if (
    normalized.includes("vrla") ||
    normalized.includes("铅酸") ||
    normalized.includes("plomo") ||
    normalized.includes("chumbo") ||
    normalized.includes("свинц")
  ) {
    return "Other VRLA lead-acid battery";
  }
  if (
    normalized.includes("not sure") ||
    normalized.includes("暂不确定") ||
    normalized.includes("chưa xác định") ||
    normalized.includes("por definir") ||
    normalized.includes("a definir") ||
    normalized.includes("не определ")
  ) {
    return "Not sure";
  }

  return "";
}

function resolveProductFormatDefault(value: string) {
  const normalized = value.toLowerCase();
  const includesRoll =
    normalized.includes("roll") ||
    normalized.includes("卷材") ||
    normalized.includes("cuộn") ||
    normalized.includes("rollo") ||
    normalized.includes("rolo") ||
    normalized.includes("рулон");
  const includesSheet =
    normalized.includes("sheet") ||
    normalized.includes("片材") ||
    normalized.includes("tấm") ||
    normalized.includes("lámina") ||
    normalized.includes("folha") ||
    normalized.includes("лист");

  if (includesRoll && includesSheet) {
    return "Rolls and sheets";
  }
  if (includesRoll) {
    return "AGM separator rolls";
  }
  if (includesSheet) {
    return "AGM separator sheets";
  }
  if (
    normalized.includes("not sure") ||
    normalized.includes("暂不确定") ||
    normalized.includes("chưa xác định") ||
    normalized.includes("por definir") ||
    normalized.includes("a definir") ||
    normalized.includes("не определ")
  ) {
    return "Not sure";
  }

  return "";
}

function appendAttribution(formData: FormData, lang: SiteLocale) {
  const currentUrl = new URL(window.location.href);
  const firstTouch = ensureFirstTouch();

  formData.set("form-name", "inquiry");
  formData.set("language", lang);
  formData.set("page_url", currentUrl.href);

  for (const key of [
    "landing_page",
    "referrer",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term"
  ]) {
    formData.set(key, firstTouch[key] || "");
  }
}

function ensureFirstTouch() {
  const currentUrl = new URL(window.location.href);
  const storageKey = "viking_agm_first_touch";
  let firstTouch: Record<string, string> = {};

  try {
    const saved = window.sessionStorage.getItem(storageKey);
    if (saved) {
      firstTouch = JSON.parse(saved) as Record<string, string>;
    } else {
      firstTouch = {
        landing_page: currentUrl.href,
        referrer: document.referrer || "",
        utm_source: currentUrl.searchParams.get("utm_source") || "",
        utm_medium: currentUrl.searchParams.get("utm_medium") || "",
        utm_campaign: currentUrl.searchParams.get("utm_campaign") || "",
        utm_content: currentUrl.searchParams.get("utm_content") || "",
        utm_term: currentUrl.searchParams.get("utm_term") || ""
      };
      window.sessionStorage.setItem(storageKey, JSON.stringify(firstTouch));
    }
  } catch {
    firstTouch = {
      landing_page: currentUrl.href,
      referrer: document.referrer || ""
    };
  }

  return firstTouch;
}

function buildInquiryMailto(
  formData: FormData,
  lang: SiteLocale,
  variant: InquiryFormProps["variant"] = "agm"
) {
  const baseCopy = copy[lang];
  const thermalCopy = thermalInsulationPaperFormCopy[lang];
  const t =
    variant === "thermalInsulation"
      ? {
          ...baseCopy,
          fields: {
            ...baseCopy.fields,
            application: thermalCopy.applicationLabel,
            interestedProduct: thermalCopy.productLabel,
            message: thermalCopy.messageLabel
          },
          subject: thermalCopy.subject
        }
      : baseCopy;
  const labels = t.fields;
  const fields = [
    ["name", labels.name],
    ["contact", labels.contact],
    ["company", labels.company],
    ["country", labels.country],
    ["application", labels.application],
    ["interestedProduct", labels.interestedProduct],
    ["message", labels.message]
  ] as const;
  const body = fields
    .map(([key, label]) => `${label}: ${String(formData.get(key) || "").trim()}`)
    .join("\n");

  return `mailto:${inquiryEmail}?subject=${encodeURIComponent(
    t.subject
  )}&body=${encodeURIComponent(body)}`;
}
