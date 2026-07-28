export type FaqLang = "en" | "zh" | "vi";

export const productFaqCopy = {
  en: {
    faqEyebrow: "FAQ",
    faqTitle: "You can contact us before the specification is final",
    faq: [
      [
        "Do I need to know the exact specification before contacting you?",
        "No. You can leave your contact information first. Our team can help review thickness, width, format and application details."
      ],
      [
        "Do you provide samples?",
        "Sample discussion is available after confirming the product form and basic application."
      ],
      [
        "Can you customize thickness or width?",
        "Thickness, width, roll format and sheet size can be discussed according to customer requirements."
      ],
      [
        "What information helps you reply faster?",
        "Product type, battery application and estimated quantity are helpful, but they are not required for first contact."
      ]
    ]
  },
  zh: {
    faqEyebrow: "常见问题",
    faqTitle: "不清楚具体规格，也可以先联系",
    faq: [
      [
        "不清楚具体规格可以联系吗？",
        "可以。您只需留下微信或手机号，我们会根据电池应用、产品形式和使用需求，协助确认合适的 AGM 隔板规格。"
      ],
      [
        "是否提供样品？",
        "可以根据产品形式和基本应用需求进行样品沟通。"
      ],
      [
        "是否可以定制厚度或宽度？",
        "厚度、宽度、卷材形式和片材尺寸都可以根据客户需求沟通。"
      ],
      [
        "哪些信息有助于更快回复？",
        "产品形式、电池应用和预计数量会有帮助，但首次联系时不是必填。"
      ]
    ]
  },
  vi: {
    faqEyebrow: "Câu hỏi thường gặp",
    faqTitle: "Có thể liên hệ trước khi hoàn thiện quy cách",
    faq: [
      [
        "Tôi có cần biết chính xác quy cách trước khi liên hệ không?",
        "Không. Bạn có thể để lại thông tin liên hệ trước. Đội ngũ của chúng tôi sẽ hỗ trợ xem xét độ dày, chiều rộng, dạng sản phẩm và ứng dụng."
      ],
      [
        "Có cung cấp mẫu không?",
        "Có thể trao đổi mẫu sau khi xác nhận dạng sản phẩm và ứng dụng cơ bản."
      ],
      [
        "Có thể trao đổi độ dày hoặc chiều rộng theo yêu cầu không?",
        "Độ dày, chiều rộng, dạng cuộn và kích thước tấm có thể được trao đổi theo yêu cầu của khách hàng."
      ],
      [
        "Thông tin nào giúp nhận phản hồi nhanh hơn?",
        "Dạng sản phẩm, ứng dụng ắc quy và số lượng dự kiến sẽ hữu ích nhưng không bắt buộc trong lần liên hệ đầu tiên."
      ]
    ]
  }
} as const;
