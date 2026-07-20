"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Lang } from "./VikingHome";

type InquiryFormProps = {
  lang: Lang;
  className?: string;
  defaultApplication?: string;
  defaultInterestedProduct?: string;
  messagePlaceholder?: string;
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
      application: "UPS, energy storage, motorcycle, VRLA...",
      interestedProduct: "Rolls, sheets, or not sure yet",
      message:
        "Optional: thickness, width, sheet size, quantity, sample or test requirements"
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
      application: "UPS、储能、摩托车、VRLA 等",
      interestedProduct: "卷材、片材或暂不确定",
      message: "选填：厚度、宽度、片材尺寸、数量、样品或检测需求"
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
  messagePlaceholder
}: InquiryFormProps) {
  const t = copy[lang];
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
    const mailto = buildInquiryMailto(formData, lang);
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
        <Field
          name="application"
          label={t.fields.application}
          placeholder={t.placeholders.application}
          defaultValue={defaultApplication}
        />
        <Field
          name="interestedProduct"
          label={t.fields.interestedProduct}
          placeholder={t.placeholders.interestedProduct}
          defaultValue={defaultInterestedProduct}
        />
        <label className="sm:col-span-2">
          <span className="text-sm font-bold text-graphite">{t.fields.message}</span>
          <textarea
            name="message"
            rows={5}
            placeholder={messagePlaceholder || t.placeholders.message}
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
  required = false
}: {
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  required?: boolean;
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
        className="mt-2 w-full rounded-md border border-line bg-frost px-4 py-3 text-sm outline-none transition placeholder:text-steel/70 focus:border-signal focus:bg-white"
      />
    </label>
  );
}

function appendAttribution(formData: FormData, lang: Lang) {
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

function buildInquiryMailto(formData: FormData, lang: Lang) {
  const t = copy[lang];
  const labels =
    lang === "zh"
      ? {
          name: "姓名",
          contact: "联系方式",
          company: "公司",
          country: "国家或地区",
          application: "电池应用",
          interestedProduct: "产品形式",
          message: "规格或样品说明"
        }
      : {
          name: "Name",
          contact: "Contact",
          company: "Company",
          country: "Country / Region",
          application: "Battery application",
          interestedProduct: "Product format",
          message: "Specification or sample notes"
        };
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
