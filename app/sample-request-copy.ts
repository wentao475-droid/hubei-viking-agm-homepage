import type { Lang } from "./VikingHome";

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
  ]
} satisfies Record<Lang, string[][]>;
