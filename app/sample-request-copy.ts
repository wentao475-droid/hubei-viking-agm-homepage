import type { SiteLocale } from "./locales";

export const sampleRequestFaq = {
  en: [
    [
      "Can I request a sample before every parameter is finalized?",
      "Yes. Start with the battery application, roll or sheet preference and any known dimensions. The remaining specification points can be reviewed during follow-up."
    ],
    [
      "What information helps with specification matching?",
      "Battery application, target thickness, roll width or sheet size, product form, available drawings or reference samples and expected test items are useful."
    ],
    [
      "Can packing requirements be discussed with the sample?",
      "Yes. Roll cores, sheet packing, labels and other packing requirements can be discussed together with the product specification."
    ],
    [
      "Does submitting this form confirm a production order?",
      "No. It starts a technical and commercial discussion so both sides can confirm the application, specification direction and suitable next step."
    ]
  ],
  zh: [
    [
      "参数还没有完全确定，可以先申请样品吗？",
      "可以。先提供电池应用、卷材或片材偏好及已知尺寸，其他规格要点可在后续沟通中共同确认。"
    ],
    [
      "哪些信息有助于进行规格匹配？",
      "电池应用、目标厚度、卷材宽度或片材尺寸、产品形式、现有图纸或参考样品，以及期望检测项目都会有帮助。"
    ],
    [
      "样品阶段可以一起沟通包装要求吗？",
      "可以。卷材芯管、片材包装、标签及其他包装要求，可与产品规格一起沟通确认。"
    ],
    [
      "提交表单是否代表确认生产订单？",
      "不是。提交后将进入技术和商务沟通，用于确认应用、规格方向及合适的下一步安排。"
    ]
  ],
  vi: [
    [
      "Tôi có thể yêu cầu mẫu khi chưa hoàn thiện mọi thông số không?",
      "Có. Hãy bắt đầu với ứng dụng ắc quy, lựa chọn dạng cuộn hoặc tấm và các kích thước đã biết. Những thông số còn lại có thể được xem xét trong quá trình trao đổi."
    ],
    [
      "Thông tin nào hữu ích cho việc đối chiếu quy cách?",
      "Ứng dụng ắc quy, độ dày mục tiêu, chiều rộng cuộn hoặc kích thước tấm, dạng sản phẩm, bản vẽ hoặc mẫu tham chiếu và hạng mục thử nghiệm đều hữu ích."
    ],
    [
      "Có thể trao đổi yêu cầu đóng gói cùng với mẫu không?",
      "Có. Lõi cuộn, đóng gói tấm, nhãn và các yêu cầu đóng gói khác có thể được trao đổi cùng quy cách sản phẩm."
    ],
    [
      "Gửi biểu mẫu có nghĩa là xác nhận đơn hàng sản xuất không?",
      "Không. Biểu mẫu bắt đầu quá trình trao đổi kỹ thuật và thương mại để hai bên xác nhận ứng dụng, hướng quy cách và bước tiếp theo phù hợp."
    ]
  ]
} satisfies Record<SiteLocale, string[][]>;
