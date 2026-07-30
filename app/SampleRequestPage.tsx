import Image from "next/image";
import { InquiryForm } from "./InquiryForm";
import type { SiteLocale } from "./locales";
import { SiteHeader } from "./SiteHeader";
import { sampleRequestFaq } from "./sample-request-copy";
import { SocialLinks } from "./SocialLinks";

type IconProps = { size?: number; className?: string };

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const icpLicense = process.env.NEXT_PUBLIC_ICP_LICENSE || "鄂ICP备2026033781号";

const pageCopy = {
  en: {
    homePath: "/",
    languagePath: "/zh/request-agm-separator-sample/",
    eyebrow: "Sample and Specification Review",
    title: "Request an AGM Separator Sample and Specification Match",
    subtitle:
      "Share the battery application and the separator information you already have. Viking AGM can help review the suitable roll or sheet direction before sample or quotation discussion.",
    primary: "Start Sample Request",
    secondary: "Download Technical Capability PDF",
    proof: [
      "Roll and sheet formats",
      "Application-based discussion",
      "Quality and packing requirements"
    ],
    requirements: {
      eyebrow: "Information Checklist",
      title: "What to provide for a useful first review",
      text:
        "You do not need to finalize every parameter before contacting us. Send the available information first, and clearly mark any points that are still under review.",
      items: [
        ["Battery application", "VRLA, UPS, motorcycle, automotive, energy storage or another lead-acid battery application."],
        ["Product form", "Roll material, pre-cut sheets or a request to compare both formats."],
        ["Dimensions", "Target thickness, roll width, sheet height and width, or an existing drawing."],
        ["Technical reference", "Target values, customer standards, test items or an existing separator sample if available."],
        ["Quantity and packing", "Sample quantity, trial or production planning, roll core, labels and packing expectations."]
      ]
    },
    process: {
      eyebrow: "What Happens Next",
      title: "A practical path from inquiry to sample discussion",
      items: [
        ["1", "Application review", "We review the battery application, product form and available specification information."],
        ["2", "Missing-point confirmation", "The team follows up on dimensions, reference samples, test items or packing details that need clarification."],
        ["3", "Next-step discussion", "Both sides discuss a suitable sample, technical review or quotation path based on the confirmed direction."]
      ]
    },
    evidence: {
      eyebrow: "Manufacturing Evidence",
      title: "Review production, inspection and delivery preparation",
      items: [
        {
          title: "Production capability",
          text: "AGM separator production and roll handling support specification and batch-supply discussion.",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "Viking AGM separator production capability"
        },
        {
          title: "Quality inspection",
          text: "Inspection requirements can be confirmed around the customer application and agreed test items.",
          src: "/images/agm-quality-control-1200.webp",
          alt: "AGM separator quality inspection at Viking Technology"
        },
        {
          title: "Packing and delivery",
          text: "Roll, sheet, label and pallet requirements can be reviewed before sample or order arrangement.",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "AGM separator pallet packing prepared for delivery"
        }
      ]
    },
    download: {
      eyebrow: "Buyer Reference",
      title: "Download the Viking AGM technical capability overview",
      text:
        "A concise bilingual reference covering product forms, application discussion, quality checks, packing and the information needed for specification matching.",
      button: "Download PDF"
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions before requesting a sample"
    },
    form: {
      eyebrow: "Start the Discussion",
      title: "Send the information you already have",
      text:
        "Name and contact information are enough to start. Application, product form and dimensions help us prepare a more useful follow-up.",
      hints: [
        "Battery application",
        "Roll or sheet format",
        "Thickness, width or sheet size",
        "Sample, testing and packing needs"
      ],
      message:
        "Optional: battery application, target thickness, roll width or sheet size, sample quantity, technical requirements or packing needs"
    },
    footer:
      "AGM glass fiber separator manufacturing, quality review and supply coordination for lead-acid battery projects."
  },
  zh: {
    homePath: "/zh/",
    languagePath: "/request-agm-separator-sample/",
    eyebrow: "样品与规格评审",
    title: "申请 AGM 隔板样品与规格匹配",
    subtitle:
      "提供您的电池应用及现有隔板信息。湖北维京可在样品或报价沟通前，协助评审适合的卷材、片材及规格方向。",
    primary: "开始申请样品",
    secondary: "下载技术能力 PDF",
    proof: ["卷材与片材形式", "按电池应用沟通", "检测与包装要求确认"],
    requirements: {
      eyebrow: "信息清单",
      title: "首次评审建议提供哪些信息",
      text:
        "联系前不需要把所有参数完全确定。可以先发送已有信息，并清楚标注仍在评估的项目。",
      items: [
        ["电池应用", "VRLA、UPS、摩托车、汽车、储能或其他铅酸电池应用。"],
        ["产品形式", "卷材、预裁切片材，或希望比较两种形式。"],
        ["尺寸信息", "目标厚度、卷材宽度、片材长宽，或现有图纸。"],
        ["技术参考", "已有目标值、客户标准、检测项目或现有隔板样品。"],
        ["数量与包装", "样品数量、试产或量产计划、芯管、标签和包装要求。"]
      ]
    },
    process: {
      eyebrow: "提交后流程",
      title: "从询盘到样品沟通的清晰路径",
      items: [
        ["1", "应用评审", "评审电池应用、产品形式及已有规格信息。"],
        ["2", "补充信息确认", "跟进仍需明确的尺寸、参考样品、检测项目或包装细节。"],
        ["3", "下一步沟通", "根据确认方向，共同讨论适合的样品、技术评审或报价路径。"]
      ]
    },
    evidence: {
      eyebrow: "制造证据",
      title: "查看生产、检测与交付准备",
      items: [
        {
          title: "生产能力",
          text: "AGM 隔板生产与卷材处理能力，支持规格及批次供货沟通。",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "湖北维京 AGM 隔板生产能力"
        },
        {
          title: "质量检测",
          text: "可围绕客户应用和双方约定的检测项目确认质量要求。",
          src: "/images/agm-quality-control-1200.webp",
          alt: "湖北维京 AGM 隔板质量检测"
        },
        {
          title: "包装与交付",
          text: "卷材、片材、标签和托盘要求可在样品或订单安排前评审。",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "AGM 隔板托盘包装与交付准备"
        }
      ]
    },
    download: {
      eyebrow: "采购参考",
      title: "下载维京 AGM 技术能力概览",
      text:
        "中英文简版资料，包含产品形式、应用沟通、质量检查、包装方式及规格匹配所需信息。",
      button: "下载 PDF"
    },
    faq: {
      eyebrow: "常见问题",
      title: "申请样品前的常见问题"
    },
    form: {
      eyebrow: "开始沟通",
      title: "发送您已经掌握的信息",
      text:
        "姓名和联系方式即可开始。补充电池应用、产品形式和尺寸信息，有助于我们准备更有效的后续沟通。",
      hints: ["电池应用", "卷材或片材形式", "厚度、宽度或片材尺寸", "样品、检测和包装需求"],
      message:
        "可选：电池应用、目标厚度、卷材宽度或片材尺寸、样品数量、技术要求或包装需求"
    },
    footer: "面向铅酸电池项目提供 AGM 玻璃纤维隔板制造、质量评审和供货协同。"
  },
  vi: {
    homePath: "/vi/",
    languagePath: "/request-agm-separator-sample/",
    eyebrow: "Đánh giá mẫu và thông số",
    title: "Yêu cầu mẫu tấm ngăn AGM và đối chiếu thông số",
    subtitle:
      "Chia sẻ ứng dụng ắc quy và thông tin tấm ngăn hiện có. Viking AGM có thể hỗ trợ xem xét hướng cuộn hoặc tấm phù hợp trước khi trao đổi mẫu hay báo giá.",
    primary: "Bắt đầu yêu cầu mẫu",
    secondary: "Tải hồ sơ kỹ thuật EN/ZH",
    proof: [
      "Dạng cuộn và dạng tấm",
      "Trao đổi theo ứng dụng",
      "Yêu cầu kiểm tra và đóng gói"
    ],
    requirements: {
      eyebrow: "Danh sách thông tin",
      title: "Nên cung cấp gì cho lần đánh giá đầu tiên",
      text:
        "Bạn không cần hoàn thiện mọi thông số trước khi liên hệ. Hãy gửi thông tin hiện có và đánh dấu rõ những mục vẫn đang xem xét.",
      items: [
        [
          "Ứng dụng ắc quy",
          "VRLA, UPS, xe máy, ô tô, lưu trữ năng lượng hoặc ứng dụng axit-chì khác."
        ],
        [
          "Dạng sản phẩm",
          "Vật liệu dạng cuộn, tấm cắt sẵn hoặc yêu cầu so sánh cả hai dạng."
        ],
        [
          "Kích thước",
          "Độ dày mục tiêu, chiều rộng cuộn, chiều dài và chiều rộng tấm hoặc bản vẽ hiện có."
        ],
        [
          "Tài liệu kỹ thuật",
          "Giá trị mục tiêu, tiêu chuẩn khách hàng, hạng mục thử nghiệm hoặc mẫu tham chiếu nếu có."
        ],
        [
          "Số lượng và đóng gói",
          "Số lượng mẫu, kế hoạch thử hoặc sản xuất, lõi cuộn, nhãn và yêu cầu đóng gói."
        ]
      ]
    },
    process: {
      eyebrow: "Bước tiếp theo",
      title: "Quy trình thực tế từ yêu cầu đến trao đổi mẫu",
      items: [
        [
          "1",
          "Đánh giá ứng dụng",
          "Xem xét ứng dụng ắc quy, dạng sản phẩm và thông tin quy cách hiện có."
        ],
        [
          "2",
          "Xác nhận thông tin còn thiếu",
          "Trao đổi thêm về kích thước, mẫu tham chiếu, hạng mục thử nghiệm hoặc đóng gói cần làm rõ."
        ],
        [
          "3",
          "Trao đổi bước tiếp theo",
          "Hai bên thảo luận hướng mẫu, đánh giá kỹ thuật hoặc báo giá dựa trên nội dung đã xác nhận."
        ]
      ]
    },
    evidence: {
      eyebrow: "Bằng chứng sản xuất",
      title: "Xem sản xuất, kiểm tra và chuẩn bị giao hàng",
      items: [
        {
          title: "Năng lực sản xuất",
          text:
            "Sản xuất tấm ngăn AGM và xử lý cuộn hỗ trợ trao đổi quy cách và cung ứng theo lô.",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "Năng lực sản xuất tấm ngăn AGM của Viking"
        },
        {
          title: "Kiểm tra chất lượng",
          text:
            "Yêu cầu kiểm tra có thể được xác nhận theo ứng dụng và hạng mục đã thống nhất.",
          src: "/images/agm-quality-control-1200.webp",
          alt: "Kiểm tra chất lượng tấm ngăn AGM tại Viking Technology"
        },
        {
          title: "Đóng gói và giao hàng",
          text:
            "Dạng cuộn, tấm, nhãn và pallet có thể được xem xét trước khi sắp xếp mẫu hoặc đơn hàng.",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "Đóng gói pallet tấm ngăn AGM để giao hàng"
        }
      ]
    },
    download: {
      eyebrow: "Tài liệu cho người mua",
      title: "Tải tổng quan năng lực kỹ thuật Viking AGM",
      text:
        "Tài liệu tiếng Anh và tiếng Trung giới thiệu dạng sản phẩm, ứng dụng, kiểm tra chất lượng, đóng gói và thông tin cần thiết để đối chiếu quy cách.",
      button: "Tải PDF EN/ZH"
    },
    faq: {
      eyebrow: "Câu hỏi thường gặp",
      title: "Câu hỏi trước khi yêu cầu mẫu"
    },
    form: {
      eyebrow: "Bắt đầu trao đổi",
      title: "Gửi thông tin bạn đang có",
      text:
        "Họ tên và thông tin liên hệ là đủ để bắt đầu. Ứng dụng, dạng sản phẩm và kích thước giúp chúng tôi chuẩn bị phản hồi phù hợp hơn.",
      hints: [
        "Ứng dụng ắc quy",
        "Dạng cuộn hoặc dạng tấm",
        "Độ dày, chiều rộng hoặc kích thước tấm",
        "Yêu cầu mẫu, thử nghiệm và đóng gói"
      ],
      message:
        "Không bắt buộc: ứng dụng ắc quy, độ dày mục tiêu, chiều rộng cuộn hoặc kích thước tấm, số lượng mẫu, yêu cầu kỹ thuật hoặc đóng gói"
    },
    footer:
      "Sản xuất tấm ngăn sợi thủy tinh AGM, đánh giá chất lượng và phối hợp cung ứng cho các dự án ắc quy axit-chì."
  },
  ko: {
    homePath: "/ko/",
    languagePath: "/",
    eyebrow: "샘플 및 사양 검토",
    title: "AGM 분리막 샘플 및 사양 검토 요청",
    subtitle:
      "배터리 적용 분야와 보유한 분리막 정보를 보내 주세요. Viking AGM이 샘플 또는 견적 협의 전에 적합한 롤·시트 형태와 사양 방향을 함께 검토합니다.",
    primary: "샘플 요청 시작",
    secondary: "영문/중문 기술 자료 다운로드",
    proof: ["롤 및 시트 형태", "적용 분야별 검토", "검사·포장 요구사항 확인"],
    requirements: {
      eyebrow: "정보 체크리스트",
      title: "첫 검토에 필요한 정보",
      text:
        "문의 전에 모든 항목을 확정할 필요는 없습니다. 현재 보유한 정보를 먼저 보내고 검토 중인 항목을 표시해 주세요.",
      items: [
        ["배터리 적용 분야", "VRLA, UPS, 오토바이, 자동차, 에너지 저장 또는 기타 납축전지 적용 분야."],
        ["제품 형태", "롤, 사전 절단 시트 또는 두 형태의 비교 요청."],
        ["치수", "목표 두께, 롤 폭, 시트 가로·세로 또는 기존 도면."],
        ["기술 기준", "목표값, 고객 기준, 시험 항목 또는 보유한 기준 샘플."],
        ["수량 및 포장", "샘플 수량, 시험·양산 계획, 롤 코어, 라벨 및 포장 요구사항."]
      ]
    },
    process: {
      eyebrow: "다음 단계",
      title: "문의부터 샘플 협의까지",
      items: [
        ["1", "적용 분야 검토", "배터리 적용 분야, 제품 형태와 현재 사양 정보를 검토합니다."],
        ["2", "추가 정보 확인", "치수, 기준 샘플, 시험 항목 또는 포장 세부사항을 확인합니다."],
        ["3", "진행 방향 협의", "확인된 내용을 바탕으로 샘플, 기술 검토 또는 견적 진행 방향을 협의합니다."]
      ]
    },
    evidence: {
      eyebrow: "제조 근거",
      title: "생산, 검사 및 출하 준비 확인",
      items: [
        {
          title: "생산 역량",
          text: "AGM 분리막 생산과 롤 취급 설비를 바탕으로 사양 및 배치 공급을 협의합니다.",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "Viking AGM 분리막 생산 설비"
        },
        {
          title: "품질 검사",
          text: "고객 적용 분야와 합의된 시험 항목을 기준으로 검사 요구사항을 확인합니다.",
          src: "/images/agm-quality-control-1200.webp",
          alt: "Viking Technology AGM 분리막 품질 검사"
        },
        {
          title: "포장 및 출하",
          text: "샘플 또는 주문 전에 롤, 시트, 라벨과 팔레트 요구사항을 검토합니다.",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "AGM 분리막 팔레트 포장 및 출하 준비"
        }
      ]
    },
    download: {
      eyebrow: "구매 참고 자료",
      title: "Viking AGM 기술 역량 자료",
      text: "제품 형태, 적용 분야, 품질 검사, 포장과 사양 검토 정보를 담은 영문·중문 자료입니다.",
      button: "영문/중문 PDF 다운로드"
    },
    faq: { eyebrow: "FAQ", title: "샘플 요청 전 자주 묻는 질문" },
    form: {
      eyebrow: "협의 시작",
      title: "현재 보유한 정보를 보내 주세요",
      text: "이름과 연락처만으로 시작할 수 있습니다. 적용 분야, 제품 형태와 치수를 함께 보내면 더 구체적으로 검토할 수 있습니다.",
      hints: ["배터리 적용 분야", "롤 또는 시트 형태", "두께, 폭 또는 시트 크기", "샘플, 시험 및 포장 요구사항"],
      message: "선택: 배터리 적용 분야, 목표 두께, 롤 폭 또는 시트 크기, 샘플 수량, 기술·포장 요구사항"
    },
    footer: "납축전지 프로젝트를 위한 AGM 유리섬유 분리막 제조, 품질 검토 및 공급 협의."
  },
  ja: {
    homePath: "/ja/",
    languagePath: "/",
    eyebrow: "サンプル・仕様確認",
    title: "AGMセパレーターのサンプル・仕様確認依頼",
    subtitle:
      "バッテリー用途と現在お持ちのセパレーター情報をお知らせください。サンプルまたは見積りの前に、適切なロール・シート形状と仕様の方向性を確認します。",
    primary: "サンプル依頼を開始",
    secondary: "英語・中国語の技術資料をダウンロード",
    proof: ["ロール・シート形状", "用途に基づく確認", "検査・梱包要件の確認"],
    requirements: {
      eyebrow: "情報チェックリスト",
      title: "初回確認に必要な情報",
      text: "お問い合わせ前にすべての項目を確定する必要はありません。判明している情報と検討中の項目をお知らせください。",
      items: [
        ["バッテリー用途", "VRLA、UPS、二輪車、自動車、蓄電またはその他の鉛蓄電池用途。"],
        ["製品形状", "ロール、カット済みシート、または両方の比較。"],
        ["寸法", "目標厚さ、ロール幅、シート縦横寸法、または既存図面。"],
        ["技術資料", "目標値、顧客規格、試験項目、または基準サンプル。"],
        ["数量・梱包", "サンプル数量、試作・量産計画、ロールコア、ラベル、梱包要件。"]
      ]
    },
    process: {
      eyebrow: "次のステップ",
      title: "お問い合わせからサンプル協議まで",
      items: [
        ["1", "用途確認", "バッテリー用途、製品形状、現在の仕様情報を確認します。"],
        ["2", "不足情報の確認", "寸法、基準サンプル、試験項目、梱包の詳細を確認します。"],
        ["3", "進め方の協議", "確認内容に基づきサンプル、技術確認、見積りの進め方を協議します。"]
      ]
    },
    evidence: {
      eyebrow: "製造情報",
      title: "生産、検査、出荷準備を確認",
      items: [
        {
          title: "生産能力",
          text: "AGMセパレーターの生産・ロール加工設備をもとに、仕様とロット供給を協議します。",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "Viking AGMセパレーター生産設備"
        },
        {
          title: "品質検査",
          text: "お客様の用途と合意した試験項目に基づいて検査要件を確認します。",
          src: "/images/agm-quality-control-1200.webp",
          alt: "Viking TechnologyのAGMセパレーター品質検査"
        },
        {
          title: "梱包・出荷",
          text: "サンプルまたは注文前にロール、シート、ラベル、パレット要件を確認します。",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "AGMセパレーターのパレット梱包と出荷準備"
        }
      ]
    },
    download: {
      eyebrow: "購買参考資料",
      title: "Viking AGM技術能力概要",
      text: "製品形状、用途、品質検査、梱包、仕様確認に必要な情報をまとめた英語・中国語資料です。",
      button: "英語・中国語PDFをダウンロード"
    },
    faq: { eyebrow: "FAQ", title: "サンプル依頼前のよくある質問" },
    form: {
      eyebrow: "確認を開始",
      title: "現在お持ちの情報をお送りください",
      text: "お名前と連絡先だけでも開始できます。用途、製品形状、寸法があるとより具体的に確認できます。",
      hints: ["バッテリー用途", "ロールまたはシート形状", "厚さ、幅またはシート寸法", "サンプル、試験、梱包要件"],
      message: "任意：バッテリー用途、目標厚さ、ロール幅またはシート寸法、サンプル数量、技術・梱包要件"
    },
    footer: "鉛蓄電池プロジェクト向けAGMガラス繊維セパレーターの製造、品質確認、供給調整。"
  },
  es: {
    homePath: "/es/",
    languagePath: "/",
    eyebrow: "Muestra y revisión de especificaciones",
    title: "Solicite una muestra de separador AGM y revisión de especificaciones",
    subtitle:
      "Comparta la aplicación de la batería y la información disponible del separador. Viking AGM puede ayudarle a revisar el formato en rollo o lámina y la orientación de especificación antes de hablar de muestras o cotización.",
    primary: "Iniciar solicitud de muestra",
    secondary: "Descargar ficha técnica EN/ZH",
    proof: [
      "Formatos en rollo y lámina",
      "Revisión según la aplicación",
      "Requisitos de inspección y empaque"
    ],
    requirements: {
      eyebrow: "Lista de información",
      title: "Qué conviene proporcionar para una primera revisión útil",
      text:
        "No es necesario definir todos los parámetros antes de contactarnos. Envíe la información disponible e indique con claridad los puntos que aún están en revisión.",
      items: [
        ["Aplicación de la batería", "VRLA, UPS, motocicleta, automóvil, almacenamiento de energía u otra aplicación de batería de plomo-ácido."],
        ["Formato del producto", "Material en rollo, láminas precortadas o una solicitud para comparar ambos formatos."],
        ["Dimensiones", "Espesor objetivo, ancho del rollo, largo y ancho de la lámina o un plano existente."],
        ["Referencia técnica", "Valores objetivo, normas del cliente, pruebas requeridas o una muestra de referencia si está disponible."],
        ["Cantidad y empaque", "Cantidad de muestra, plan de prueba o producción, núcleo del rollo, etiquetas y requisitos de empaque."]
      ]
    },
    process: {
      eyebrow: "Siguientes pasos",
      title: "Un proceso claro desde la consulta hasta la muestra",
      items: [
        ["1", "Revisión de la aplicación", "Revisamos la aplicación de la batería, el formato del producto y la información de especificación disponible."],
        ["2", "Confirmación de datos faltantes", "Aclaramos dimensiones, muestras de referencia, pruebas o detalles de empaque que aún deban confirmarse."],
        ["3", "Definición del siguiente paso", "Ambas partes acuerdan la ruta de muestra, revisión técnica o cotización según la información confirmada."]
      ]
    },
    evidence: {
      eyebrow: "Evidencia de fabricación",
      title: "Revise la producción, inspección y preparación de entrega",
      items: [
        {
          title: "Capacidad de producción",
          text: "La producción y el manejo de rollos AGM respaldan la revisión de especificaciones y el suministro por lotes.",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "Capacidad de producción de separadores AGM de Viking"
        },
        {
          title: "Inspección de calidad",
          text: "Los requisitos de inspección pueden confirmarse según la aplicación y las pruebas acordadas.",
          src: "/images/agm-quality-control-1200.webp",
          alt: "Inspección de calidad de separadores AGM en Viking Technology"
        },
        {
          title: "Empaque y entrega",
          text: "Los requisitos de rollo, lámina, etiqueta y pallet pueden revisarse antes de organizar la muestra o el pedido.",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "Empaque en pallets de separadores AGM preparado para entrega"
        }
      ]
    },
    download: {
      eyebrow: "Referencia para compradores",
      title: "Descargue el resumen de capacidad técnica de Viking AGM",
      text: "Documento en inglés y chino sobre formatos, aplicaciones, inspección, empaque y datos necesarios para revisar especificaciones.",
      button: "Descargar PDF EN/ZH"
    },
    faq: { eyebrow: "Preguntas frecuentes", title: "Preguntas antes de solicitar una muestra" },
    form: {
      eyebrow: "Inicie la conversación",
      title: "Envíe la información que ya tiene",
      text: "El nombre y un medio de contacto son suficientes para comenzar. La aplicación, el formato y las dimensiones nos ayudan a preparar una respuesta más útil.",
      hints: ["Aplicación de la batería", "Formato en rollo o lámina", "Espesor, ancho o tamaño de lámina", "Necesidades de muestra, prueba y empaque"],
      message: "Opcional: aplicación, espesor objetivo, ancho del rollo o tamaño de lámina, cantidad de muestra, requisitos técnicos o de empaque"
    },
    footer: "Fabricación de separadores AGM de fibra de vidrio, revisión de calidad y coordinación de suministro para proyectos de baterías de plomo-ácido."
  },
  pt: {
    homePath: "/pt/",
    languagePath: "/",
    eyebrow: "Amostra e análise de especificações",
    title: "Solicite uma amostra de separador AGM e análise de especificações",
    subtitle:
      "Compartilhe a aplicação da bateria e as informações disponíveis do separador. A Viking AGM pode ajudar a analisar o formato em rolo ou folha e a direção da especificação antes da conversa sobre amostra ou cotação.",
    primary: "Iniciar solicitação de amostra",
    secondary: "Baixar material técnico EN/ZH",
    proof: ["Formatos em rolo e folha", "Análise conforme a aplicação", "Requisitos de inspeção e embalagem"],
    requirements: {
      eyebrow: "Lista de informações",
      title: "O que fornecer para uma primeira análise útil",
      text: "Não é necessário definir todos os parâmetros antes do contato. Envie as informações disponíveis e indique claramente os pontos que ainda estão em análise.",
      items: [
        ["Aplicação da bateria", "VRLA, UPS, motocicleta, automóvel, armazenamento de energia ou outra aplicação de bateria chumbo-ácido."],
        ["Formato do produto", "Material em rolo, folhas pré-cortadas ou solicitação para comparar os dois formatos."],
        ["Dimensões", "Espessura desejada, largura do rolo, comprimento e largura da folha ou desenho existente."],
        ["Referência técnica", "Valores desejados, normas do cliente, itens de teste ou amostra de referência, quando disponível."],
        ["Quantidade e embalagem", "Quantidade de amostra, plano de teste ou produção, tubete, etiquetas e requisitos de embalagem."]
      ]
    },
    process: {
      eyebrow: "Próximas etapas",
      title: "Um caminho claro da consulta à conversa sobre amostras",
      items: [
        ["1", "Análise da aplicação", "Analisamos a aplicação da bateria, o formato do produto e as informações de especificação disponíveis."],
        ["2", "Confirmação de dados faltantes", "Alinhamos dimensões, amostras de referência, testes ou detalhes de embalagem que ainda precisam ser confirmados."],
        ["3", "Definição da próxima etapa", "As partes definem o caminho de amostra, análise técnica ou cotação com base nas informações confirmadas."]
      ]
    },
    evidence: {
      eyebrow: "Evidências de fabricação",
      title: "Conheça a produção, a inspeção e a preparação para entrega",
      items: [
        {
          title: "Capacidade de produção",
          text: "A produção e o manuseio de rolos AGM apoiam a análise de especificações e o fornecimento por lotes.",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "Capacidade de produção de separadores AGM da Viking"
        },
        {
          title: "Inspeção de qualidade",
          text: "Os requisitos de inspeção podem ser confirmados conforme a aplicação e os testes acordados.",
          src: "/images/agm-quality-control-1200.webp",
          alt: "Inspeção de qualidade de separadores AGM na Viking Technology"
        },
        {
          title: "Embalagem e entrega",
          text: "Requisitos de rolo, folha, etiqueta e pallet podem ser analisados antes da amostra ou do pedido.",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "Embalagem em pallets de separadores AGM preparada para entrega"
        }
      ]
    },
    download: {
      eyebrow: "Referência para compradores",
      title: "Baixe o resumo de capacidade técnica da Viking AGM",
      text: "Material em inglês e chinês sobre formatos, aplicações, inspeção, embalagem e dados necessários para analisar especificações.",
      button: "Baixar PDF EN/ZH"
    },
    faq: { eyebrow: "Perguntas frequentes", title: "Dúvidas antes de solicitar uma amostra" },
    form: {
      eyebrow: "Inicie a conversa",
      title: "Envie as informações que você já possui",
      text: "Nome e contato são suficientes para começar. Aplicação, formato e dimensões nos ajudam a preparar uma resposta mais útil.",
      hints: ["Aplicação da bateria", "Formato em rolo ou folha", "Espessura, largura ou tamanho da folha", "Necessidades de amostra, teste e embalagem"],
      message: "Opcional: aplicação, espessura desejada, largura do rolo ou tamanho da folha, quantidade de amostra, requisitos técnicos ou de embalagem"
    },
    footer: "Fabricação de separadores AGM de fibra de vidro, análise de qualidade e coordenação de fornecimento para projetos de baterias chumbo-ácido."
  },
  ru: {
    homePath: "/ru/",
    languagePath: "/",
    eyebrow: "Образец и проверка характеристик",
    title: "Запрос образца AGM-сепаратора и проверка характеристик",
    subtitle:
      "Сообщите область применения аккумулятора и имеющиеся данные о сепараторе. Viking AGM поможет предварительно согласовать рулонный или листовой формат и направление спецификации до обсуждения образца или коммерческого предложения.",
    primary: "Начать запрос образца",
    secondary: "Скачать технический обзор EN/ZH",
    proof: ["Рулоны и листы", "Проверка по области применения", "Требования к контролю и упаковке"],
    requirements: {
      eyebrow: "Перечень информации",
      title: "Что предоставить для первичной проверки",
      text: "Необязательно заранее утверждать все параметры. Отправьте имеющиеся данные и укажите пункты, которые еще находятся на рассмотрении.",
      items: [
        ["Область применения", "VRLA, ИБП, мотоцикл, автомобиль, накопление энергии или другое применение свинцово-кислотного аккумулятора."],
        ["Формат продукции", "Рулонный материал, предварительно нарезанные листы или запрос на сравнение двух форматов."],
        ["Размеры", "Целевая толщина, ширина рулона, длина и ширина листа или существующий чертеж."],
        ["Техническая информация", "Целевые значения, стандарты заказчика, перечень испытаний или эталонный образец, если он имеется."],
        ["Количество и упаковка", "Количество образцов, план испытаний или производства, втулка рулона, маркировка и требования к упаковке."]
      ]
    },
    process: {
      eyebrow: "Дальнейшие шаги",
      title: "Понятный путь от запроса до обсуждения образца",
      items: [
        ["1", "Проверка применения", "Мы рассматриваем область применения аккумулятора, формат продукции и имеющиеся данные спецификации."],
        ["2", "Уточнение данных", "Согласовываем размеры, эталонные образцы, испытания и детали упаковки, требующие уточнения."],
        ["3", "Согласование следующего шага", "Стороны определяют порядок предоставления образца, технической проверки или расчета предложения."]
      ]
    },
    evidence: {
      eyebrow: "Производственные подтверждения",
      title: "Производство, контроль и подготовка к поставке",
      items: [
        {
          title: "Производственные возможности",
          text: "Производство AGM-сепараторов и работа с рулонами поддерживают согласование спецификаций и серийных поставок.",
          src: "/images/agm-factory-capability-1200.webp",
          alt: "Производственные возможности Viking AGM"
        },
        {
          title: "Контроль качества",
          text: "Требования к контролю согласуются с учетом области применения и утвержденных испытаний.",
          src: "/images/agm-quality-control-1200.webp",
          alt: "Контроль качества AGM-сепараторов на Viking Technology"
        },
        {
          title: "Упаковка и поставка",
          text: "Требования к рулонам, листам, маркировке и паллетам можно проверить до подготовки образца или заказа.",
          src: "/images/evidence/shipping-pallet-01.webp",
          alt: "Паллетная упаковка AGM-сепараторов для поставки"
        }
      ]
    },
    download: {
      eyebrow: "Материал для закупщика",
      title: "Скачайте обзор технических возможностей Viking AGM",
      text: "Материал на английском и китайском языках о форматах, применении, контроле, упаковке и данных для проверки спецификации.",
      button: "Скачать PDF EN/ZH"
    },
    faq: { eyebrow: "Частые вопросы", title: "Вопросы перед запросом образца" },
    form: {
      eyebrow: "Начать обсуждение",
      title: "Отправьте имеющуюся информацию",
      text: "Для начала достаточно имени и контакта. Область применения, формат и размеры помогут подготовить более предметный ответ.",
      hints: ["Область применения аккумулятора", "Рулонный или листовой формат", "Толщина, ширина или размер листа", "Требования к образцу, испытаниям и упаковке"],
      message: "Необязательно: применение, целевая толщина, ширина рулона или размер листа, количество образцов, технические требования или упаковка"
    },
    footer: "Производство стекловолоконных AGM-сепараторов, проверка качества и координация поставок для свинцово-кислотных аккумуляторов."
  }
} as const;

function asset(path: string) {
  return `${basePath}${path}`;
}

export function SampleRequestPage({ lang }: { lang: SiteLocale }) {
  const t = pageCopy[lang];

  return (
    <main className="min-h-screen overflow-hidden bg-frost text-ink">
      <SiteHeader
        lang={lang}
        homePath={t.homePath}
        languagePath={t.languagePath}
        quoteLabel={
          lang === "zh"
            ? "申请样品"
            : lang === "vi"
              ? "Yêu cầu mẫu"
              : lang === "ko"
                ? "샘플 요청"
                : lang === "ja"
                  ? "サンプル依頼"
                  : lang === "es"
                    ? "Solicitar muestra"
                    : lang === "pt"
                      ? "Solicitar amostra"
                      : lang === "ru"
                        ? "Запросить образец"
                  : "Request Sample"
        }
      />

      <section className="relative overflow-hidden pt-20">
        <Image
          src={asset("/images/agm-hero-production-1600.webp")}
          alt={
            lang === "zh"
              ? "湖北维京 AGM 隔板生产线"
              : lang === "vi"
                ? "Dây chuyền sản xuất tấm ngăn AGM của Viking"
                : lang === "ko"
                  ? "Viking AGM 분리막 생산 라인"
                  : lang === "ja"
                    ? "Viking AGMセパレーター生産ライン"
                    : lang === "es"
                      ? "Línea de producción de separadores AGM de Viking"
                      : lang === "pt"
                        ? "Linha de produção de separadores AGM da Viking"
                        : lang === "ru"
                          ? "Линия производства AGM-сепараторов Viking"
                    : "Viking AGM separator production line"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,32,51,0.96)_0%,rgba(23,32,51,0.88)_48%,rgba(23,32,51,0.34)_100%)]" />
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
              {t.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              {t.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 font-semibold text-white shadow-industrial transition hover:bg-white hover:text-ink"
              >
                {t.primary}
                <ArrowRight size={18} />
              </a>
              <a
                href={asset("/downloads/viking-agm-technical-capability.pdf")}
                download
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white hover:text-ink"
              >
                {t.secondary}
                <DownloadIcon size={18} />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {t.proof.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/8 px-3 py-2 text-sm font-semibold text-white/82"
                >
                  <CheckIcon size={16} className="text-sky-200" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={t.requirements.eyebrow}
              title={t.requirements.title}
            />
            <p className="mt-5 text-base leading-8 text-graphite">
              {t.requirements.text}
            </p>
          </div>
          <div className="grid gap-4">
            {t.requirements.items.map(([title, description], index) => (
              <article
                key={title}
                className="grid gap-4 rounded-md border border-line bg-white p-5 shadow-sm sm:grid-cols-[3rem_1fr]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-signal text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-bold text-ink">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-steel">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {t.process.items.map(([number, title, text]) => (
              <article
                key={number}
                className="rounded-md border border-line bg-frost p-6"
              >
                <span className="text-4xl font-bold text-signal">{number}</span>
                <h2 className="mt-6 text-xl font-bold text-ink">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={t.evidence.eyebrow} title={t.evidence.title} />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {t.evidence.items.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-md border border-line bg-white shadow-sm"
              >
                <Image
                  src={asset(item.src)}
                  alt={item.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  sizes="(min-width: 1024px) 31vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
              {t.download.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight">
              {t.download.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-white/72">
              {t.download.text}
            </p>
          </div>
          <a
            href={asset("/downloads/viking-agm-technical-capability.pdf")}
            download
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 font-semibold text-ink transition hover:bg-signal hover:text-white"
          >
            {t.download.button}
            <DownloadIcon size={18} />
          </a>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div className="grid gap-4">
            {sampleRequestFaq[lang].map(([question, answer]) => (
              <article
                key={question}
                className="rounded-md border border-line bg-frost p-5"
              >
                <h2 className="font-bold text-ink">{question}</h2>
                <p className="mt-2 text-sm leading-7 text-steel">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-ink px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-200">
              {t.form.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              {t.form.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
              {t.form.text}
            </p>
            <div className="mt-8 grid gap-3">
              {t.form.hints.map((hint) => (
                <div
                  key={hint}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/82"
                >
                  <CheckIcon size={17} className="shrink-0 text-sky-200" />
                  {hint}
                </div>
              ))}
            </div>
          </div>
          <InquiryForm
            lang={lang}
            defaultInterestedProduct={
              lang === "zh"
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
                  : "AGM separator sample and specification match"
            }
            messagePlaceholder={t.form.message}
            className="sm:p-8"
          />
        </div>
      </section>

      <footer className="bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={asset("/images/viking-logo-footer-320.webp")}
              alt="Viking Technology logo"
              width={320}
              height={320}
              className="h-16 w-16 object-contain"
            />
            <div>
              <p className="font-bold text-ink">Hubei Viking Technology Co., Ltd.</p>
              <p className="mt-1 text-sm text-steel">{t.footer}</p>
              <SocialLinks lang={lang} />
            </div>
          </div>
          <a
            href={asset(t.homePath)}
            className="inline-flex items-center gap-2 text-sm font-bold text-signal transition hover:text-ink"
          >
            {lang === "zh"
              ? "返回首页"
              : lang === "vi"
                ? "Về trang chủ"
                : lang === "ko"
                  ? "홈으로 돌아가기"
                  : lang === "ja"
                    ? "ホームへ戻る"
                    : lang === "es"
                      ? "Volver al inicio"
                      : lang === "pt"
                        ? "Voltar ao início"
                        : lang === "ru"
                          ? "На главную"
                    : "Back to homepage"}
            <ArrowRight size={16} />
          </a>
        </div>
        <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-3 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Hubei Viking Technology Co., Ltd.</span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition hover:text-signal"
          >
            {icpLicense}
          </a>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
    </div>
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
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function DownloadIcon({ size = 18, className = "" }: IconProps) {
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
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
