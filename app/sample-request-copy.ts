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
  ],
  ko: [
    [
      "모든 사양이 확정되기 전에 샘플을 요청할 수 있나요?",
      "네. 배터리 적용 분야, 롤 또는 시트 선호 형태와 확인된 치수부터 보내 주세요. 나머지 사양은 후속 검토에서 확인할 수 있습니다."
    ],
    [
      "사양 검토에 필요한 정보는 무엇인가요?",
      "배터리 적용 분야, 목표 두께, 롤 폭 또는 시트 크기, 제품 형태, 도면이나 기준 샘플, 시험 항목이 도움이 됩니다."
    ],
    [
      "샘플 단계에서 포장 요구사항도 협의할 수 있나요?",
      "네. 롤 코어, 시트 포장, 라벨 등 포장 요구사항을 제품 사양과 함께 협의할 수 있습니다."
    ],
    [
      "양식을 제출하면 생산 주문이 확정되나요?",
      "아닙니다. 적용 분야와 사양 방향, 적절한 다음 단계를 확인하기 위한 기술 및 상업 협의가 시작됩니다."
    ]
  ],
  ja: [
    [
      "すべての仕様が確定する前でもサンプルを依頼できますか？",
      "はい。バッテリー用途、ロールまたはシートの希望形状、判明している寸法からお知らせください。残りの仕様はその後の確認で整理できます。"
    ],
    [
      "仕様確認に役立つ情報は何ですか？",
      "バッテリー用途、目標厚さ、ロール幅またはシート寸法、製品形状、図面・基準サンプル、試験項目があると確認が進みやすくなります。"
    ],
    [
      "サンプルと同時に梱包要件も相談できますか？",
      "はい。ロールコア、シート梱包、ラベルなどの要件を製品仕様とあわせて確認できます。"
    ],
    [
      "フォーム送信で生産注文が確定しますか？",
      "いいえ。用途、仕様の方向性、適切な次のステップを双方で確認するための技術・商談を開始するものです。"
    ]
  ]
} satisfies Record<SiteLocale, string[][]>;
