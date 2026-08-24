export const thermalInsulationPaperLocales = [
  "en",
  "zh",
  "vi",
  "ko",
  "ja",
  "es",
  "pt",
  "ru",
  "ar"
];

const localeMeta = {
  en: { prefix: "", html: "en", og: "en_US", site: "Viking AGM" },
  zh: { prefix: "/zh", html: "zh-CN", og: "zh_CN", site: "湖北维京AGM" },
  vi: { prefix: "/vi", html: "vi-VN", og: "vi_VN", site: "Viking AGM Việt Nam" },
  ko: { prefix: "/ko", html: "ko-KR", og: "ko_KR", site: "Viking AGM" },
  ja: { prefix: "/ja", html: "ja-JP", og: "ja_JP", site: "Viking AGM" },
  es: { prefix: "/es", html: "es", og: "es_LA", site: "Viking AGM" },
  pt: { prefix: "/pt", html: "pt-BR", og: "pt_BR", site: "Viking AGM" },
  ru: { prefix: "/ru", html: "ru-RU", og: "ru_RU", site: "Viking AGM" },
  ar: { prefix: "/ar", html: "ar", og: "ar", site: "Viking AGM" }
};

const copy = {
  en: {
    eyebrow: "Industrial Glass Fiber Material",
    title: "Glass Fiber Thermal Insulation Paper",
    subtitle: "Rolls, sheets and custom-cut parts for industrial thermal insulation. Specifications are reviewed against the buyer's application, operating temperature and test standard.",
    heroProof: ["Roll and sheet formats", "Specification review before quotation", "Sample validation support"],
    overviewTitle: "A lightweight glass fiber material for thermal separation and insulation",
    overview: [
      "Glass fiber thermal insulation paper is a nonwoven industrial material made from fine glass fibers. It can be supplied in rolls, sheets or custom-cut parts for equipment insulation, heat barriers and component separation.",
      "This product is not an AGM battery separator. The material structure, binder system, tensile requirement and acceptance tests should be confirmed according to the intended industrial application.",
      "Operating temperature, flame behavior and electrical insulation performance are not inferred from appearance alone. Required ratings must be supported by the agreed test method and sample evaluation."
    ],
    parametersTitle: "Information to confirm before sample preparation",
    parametersText: "A useful review starts with the application and test method, not a single thickness value. Send a drawing, reference sample or target specification when available.",
    parameters: [
      ["Thickness", "Confirm the target value, tolerance and measuring pressure or method."],
      ["Basis weight", "Review mass per unit area together with density, handling and insulation needs."],
      ["Binder content", "The binder system affects handling, flexibility and temperature performance."],
      ["Tensile strength", "Specify direction, specimen width and test method for meaningful comparison."],
      ["Thermal or fire requirement", "State the operating temperature, exposure time and required certification or standard."],
      ["Dimensions and packing", "Confirm roll width, roll length, core, sheet size, cut shape and moisture-protective packing."]
    ],
    formsTitle: "Roll, sheet and converting formats",
    forms: [
      ["Glass fiber paper rolls", "Roll supply can be reviewed by thickness, width, length, core, winding condition and packing."],
      ["Glass fiber insulation sheets", "Sheets can be supplied for sample review, manual assembly or direct placement."],
      ["Custom-cut parts", "Rectangles and other cut shapes can be discussed against drawings and dimensional tolerances."],
      ["Packing and batch supply", "Packing, labels, storage protection and repeat-order consistency are confirmed before production."]
    ],
    applicationsTitle: "Typical application directions to discuss",
    applications: ["Electrical equipment insulation", "Industrial heating equipment", "Fire-rated doors and partitions", "Battery-pack thermal barriers", "Appliance heat shielding", "Custom industrial insulation parts"],
    qualityTitle: "Performance claims follow agreed tests, not product appearance",
    qualityText: "The quotation and sample record should identify the test method, target value and acceptance criteria. We do not apply AGM separator data or another supplier's fire rating to this product.",
    quality: [
      ["Material identification", "Confirm fiber composition, binder system and whether a coating or lamination is required."],
      ["Dimensional checks", "Thickness, basis weight, width and cut size can be checked using agreed methods."],
      ["Application validation", "Temperature, flame, dielectric or chemical-resistance requirements should be verified for the actual use case."]
    ],
    relatedTitle: "Continue with factory and purchasing information",
    inquiryTitle: "Send your insulation-paper specification",
    inquiryText: "Share the application, thickness, basis weight, roll or sheet dimensions, temperature or fire standard, quantity and any current sample or drawing.",
    checklist: ["End use and installation position", "Target thickness and basis weight", "Roll, sheet or custom-cut dimensions", "Operating temperature and exposure time", "Required standard, sample or drawing"],
    placeholder: "Application, thickness, basis weight, dimensions, temperature or fire standard, quantity and reference sample",
    footer: "Glass fiber material manufacturing and converting discussions for industrial insulation applications.",
    faqTitle: "Glass fiber insulation paper questions",
    faq: [
      ["Is this the same as an AGM battery separator?", "No. Both may use glass fibers, but their material design, binder, mechanical requirements and test methods differ. Please identify the actual application before comparing specifications."],
      ["Can you quote from thickness alone?", "Thickness is not enough for a reliable comparison. Basis weight, binder, tensile method, dimensions, operating conditions and required standards should also be confirmed."],
      ["Can it be supplied in rolls and sheets?", "Rolls, sheets and custom-cut parts can be discussed after dimensions, tolerances, handling and packing requirements are reviewed."],
      ["What fire or temperature rating does it have?", "The applicable rating depends on material formulation and the requested test standard. We confirm claims only after the standard and sample test requirements are agreed."]
    ],
    form: {
      applicationLabel: "Industrial Application", applicationPlaceholder: "Select an application (optional)",
      productLabel: "Supply Format", productPlaceholder: "Select a format (optional)", messageLabel: "Specification or Sample Notes",
      messagePlaceholder: "Optional: thickness, basis weight, width, temperature or fire standard, quantity and test method",
      submit: "Request an Insulation Paper Sample", subject: "Glass fiber thermal insulation paper inquiry - Viking",
      applications: [["Electrical equipment insulation", "Electrical equipment insulation"], ["Industrial heating equipment", "Industrial heating equipment"], ["Fire-rated door / partition", "Fire-rated door / partition"], ["Battery pack thermal barrier", "Battery pack thermal barrier"], ["Appliance heat shielding", "Appliance heat shielding"], ["Custom industrial insulation", "Custom industrial insulation"], ["Not sure", "Not sure yet"]],
      formats: [["Glass fiber insulation paper rolls", "Glass fiber insulation paper rolls"], ["Glass fiber insulation paper sheets", "Glass fiber insulation paper sheets"], ["Custom-cut insulation parts", "Custom-cut insulation parts"], ["Rolls and sheets", "Rolls and sheets"], ["Not sure", "Not sure yet"]]
    }
  },
  zh: {
    eyebrow: "工业玻璃纤维材料", title: "玻璃纤维隔热纸", subtitle: "面向工业隔热、热屏障和部件分隔应用，可沟通卷材、片材及定制裁切件。规格需结合实际用途、工作温度和测试标准确认。",
    heroProof: ["卷材与片材形式", "报价前确认规格", "支持样品验证"],
    overviewTitle: "用于隔热与热分隔的轻质玻璃纤维材料",
    overview: ["玻璃纤维隔热纸是由细玻璃纤维构成的工业非织造材料，可按卷材、片材或定制裁切件供应，用于设备隔热、热屏障及部件之间的热分隔。", "该产品不是 AGM 电池隔板。两者虽然都可能使用玻璃纤维，但材料结构、粘结体系、强度要求和验收方法不同，不能直接套用参数。", "工作温度、阻燃或防火表现、电气绝缘性能不能仅凭外观判断。需要声明的等级应以双方确认的测试方法和样品验证结果为依据。"],
    parametersTitle: "准备样品前需要确认的信息", parametersText: "有效的规格沟通应从应用和测试方法开始，而不是只比较厚度。如有现有样品、图纸、TDS 或 COA，建议一并提供。",
    parameters: [["厚度", "确认目标值、公差，以及测量压力或测试方法。"], ["克重", "结合密度、操作强度和隔热需求评估单位面积质量。"], ["粘结剂含量", "粘结体系会影响操作性、柔韧性和温度表现。"], ["拉伸强度", "需要明确方向、试样宽度和测试方法，数据才可比较。"], ["耐温或防火要求", "提供工作温度、持续时间，以及需要满足的认证或标准。"], ["尺寸与包装", "确认卷宽、卷长、芯管、片材尺寸、裁切形状及防潮包装要求。"]],
    formsTitle: "卷材、片材与裁切形式", forms: [["玻璃纤维隔热纸卷材", "卷材可围绕厚度、宽度、卷长、芯管、收卷状态和包装方式沟通。"], ["玻璃纤维隔热纸片材", "片材适合样品验证、手工装配或直接铺设使用。"], ["定制裁切件", "可根据图纸和尺寸公差沟通矩形片材或其他裁切形状。"], ["包装与批次供应", "生产前确认包装、标签、存储防护和重复订单的一致性要求。"]],
    applicationsTitle: "可沟通的典型应用方向", applications: ["电气设备隔热", "工业加热设备", "防火门与隔断", "电池包热屏障", "家电隔热防护", "定制工业隔热件"],
    qualityTitle: "性能声明以约定测试为准，不凭外观推定", qualityText: "报价和样品记录应明确测试方法、目标值和验收标准。不会把 AGM 隔板参数或其他供应商的防火等级直接套用到本产品。",
    quality: [["材料确认", "确认纤维组成、粘结体系，以及是否需要涂层或复合。"], ["尺寸检查", "按约定方法检查厚度、克重、宽度和裁切尺寸。"], ["应用验证", "耐温、阻燃、电气或耐化学要求应结合真实使用场景验证。"]],
    relatedTitle: "继续查看工厂与采购信息", inquiryTitle: "发送隔热纸规格需求", inquiryText: "请提供用途、厚度、克重、卷材或片材尺寸、耐温或防火标准、数量，以及现有样品或图纸。",
    checklist: ["最终用途与安装位置", "目标厚度和克重", "卷材、片材或裁切尺寸", "工作温度和持续时间", "标准、样品或图纸"], placeholder: "用途、厚度、克重、尺寸、耐温或防火标准、数量及参考样品",
    footer: "面向工业隔热应用的玻璃纤维材料制造与裁切配套沟通。", faqTitle: "玻璃纤维隔热纸常见问题",
    faq: [["它和 AGM 电池隔板一样吗？", "不一样。两者都可能使用玻璃纤维，但材料设计、粘结剂、机械要求和测试方法不同。比较规格前应先确认真实用途。"], ["只提供厚度可以报价吗？", "厚度不足以完成可靠匹配，还应确认克重、粘结剂、拉伸测试方法、尺寸、工况及标准。"], ["可以提供卷材和片材吗？", "可以沟通卷材、片材和定制裁切件，具体需确认尺寸、公差、操作和包装要求。"], ["产品的防火或耐温等级是多少？", "适用等级取决于材料配方和指定测试标准。只有在标准与样品测试要求确认后，才会确认相应性能声明。"]],
    form: { applicationLabel: "工业应用", applicationPlaceholder: "请选择应用（选填）", productLabel: "供应形式", productPlaceholder: "请选择形式（选填）", messageLabel: "规格或样品说明", messagePlaceholder: "选填：厚度、克重、宽度、耐温或防火标准、数量和测试方法", submit: "申请隔热纸样品", subject: "玻璃纤维隔热纸询盘 - 湖北维京", applications: [["Electrical equipment insulation", "电气设备隔热"], ["Industrial heating equipment", "工业加热设备"], ["Fire-rated door / partition", "防火门 / 隔断"], ["Battery pack thermal barrier", "电池包热屏障"], ["Appliance heat shielding", "家电隔热防护"], ["Custom industrial insulation", "定制工业隔热"], ["Not sure", "暂不确定"]], formats: [["Glass fiber insulation paper rolls", "玻璃纤维隔热纸卷材"], ["Glass fiber insulation paper sheets", "玻璃纤维隔热纸片材"], ["Custom-cut insulation parts", "定制裁切隔热件"], ["Rolls and sheets", "卷材和片材"], ["Not sure", "暂不确定"]] }
  },
  vi: {
    eyebrow: "Vật liệu sợi thủy tinh công nghiệp", title: "Giấy cách nhiệt sợi thủy tinh", subtitle: "Dạng cuộn, tấm và chi tiết cắt theo yêu cầu cho ứng dụng cách nhiệt công nghiệp. Thông số được xem xét theo ứng dụng, nhiệt độ và tiêu chuẩn thử nghiệm.", heroProof: ["Dạng cuộn và tấm", "Xác nhận thông số trước báo giá", "Hỗ trợ đánh giá mẫu"],
    overviewTitle: "Vật liệu sợi thủy tinh nhẹ cho cách nhiệt và ngăn nhiệt", overview: ["Giấy cách nhiệt sợi thủy tinh là vật liệu không dệt dùng cho thiết bị, lớp chắn nhiệt và phân cách linh kiện.", "Sản phẩm này không phải tấm ngăn ắc quy AGM. Cấu trúc, chất kết dính, độ bền và phương pháp thử phải theo đúng ứng dụng.", "Không suy luận cấp chịu nhiệt hoặc chống cháy từ ngoại quan; mọi tuyên bố phải dựa trên tiêu chuẩn và thử mẫu đã thống nhất."],
    parametersTitle: "Thông tin cần xác nhận trước khi làm mẫu", parametersText: "Vui lòng cung cấp ứng dụng, phương pháp thử, bản vẽ, mẫu hoặc TDS/COA hiện có.", parameters: [["Độ dày", "Xác nhận giá trị, dung sai và phương pháp đo."], ["Định lượng", "Đánh giá cùng mật độ, khả năng thao tác và cách nhiệt."], ["Hàm lượng chất kết dính", "Ảnh hưởng đến độ mềm, thao tác và hiệu suất nhiệt."], ["Độ bền kéo", "Nêu hướng, bề rộng mẫu và phương pháp thử."], ["Yêu cầu nhiệt hoặc cháy", "Nêu nhiệt độ, thời gian và tiêu chuẩn cần đạt."], ["Kích thước và đóng gói", "Xác nhận chiều rộng, chiều dài, lõi, kích thước tấm và bao bì."]],
    formsTitle: "Dạng cuộn, tấm và cắt theo yêu cầu", forms: [["Cuộn giấy sợi thủy tinh", "Trao đổi độ dày, chiều rộng, chiều dài, lõi và đóng gói."], ["Tấm cách nhiệt sợi thủy tinh", "Phù hợp đánh giá mẫu và lắp đặt trực tiếp."], ["Chi tiết cắt theo yêu cầu", "Cắt theo bản vẽ và dung sai kích thước."], ["Đóng gói và cung ứng theo lô", "Xác nhận nhãn, bảo quản và tính nhất quán trước sản xuất."]],
    applicationsTitle: "Hướng ứng dụng có thể trao đổi", applications: ["Cách nhiệt thiết bị điện", "Thiết bị gia nhiệt công nghiệp", "Cửa và vách chống cháy", "Lớp chắn nhiệt bộ pin", "Che chắn nhiệt gia dụng", "Chi tiết cách nhiệt tùy chỉnh"],
    qualityTitle: "Hiệu suất phải theo thử nghiệm đã thỏa thuận", qualityText: "Không áp dụng dữ liệu tấm ngăn AGM hoặc cấp chống cháy của nhà cung cấp khác cho sản phẩm này.", quality: [["Xác nhận vật liệu", "Xác nhận thành phần sợi, chất kết dính và lớp phủ."], ["Kiểm tra kích thước", "Kiểm tra độ dày, định lượng, chiều rộng và kích thước cắt."], ["Xác nhận ứng dụng", "Thử yêu cầu nhiệt, cháy, điện hoặc hóa chất theo điều kiện thực tế."]],
    relatedTitle: "Xem thêm thông tin nhà máy và mua hàng", inquiryTitle: "Gửi thông số giấy cách nhiệt", inquiryText: "Gửi ứng dụng, độ dày, định lượng, kích thước, tiêu chuẩn nhiệt/cháy, số lượng và mẫu hoặc bản vẽ.", checklist: ["Ứng dụng và vị trí lắp đặt", "Độ dày và định lượng", "Kích thước cuộn, tấm hoặc chi tiết", "Nhiệt độ và thời gian", "Tiêu chuẩn, mẫu hoặc bản vẽ"], placeholder: "Ứng dụng, độ dày, định lượng, kích thước, tiêu chuẩn, số lượng và mẫu", footer: "Vật liệu sợi thủy tinh và gia công cho ứng dụng cách nhiệt công nghiệp.", faqTitle: "Câu hỏi về giấy cách nhiệt sợi thủy tinh",
    faq: [["Có giống tấm ngăn AGM không?", "Không. Thiết kế vật liệu, chất kết dính, yêu cầu cơ học và phép thử khác nhau."], ["Chỉ có độ dày có báo giá được không?", "Cần thêm định lượng, chất kết dính, phương pháp kéo, kích thước và tiêu chuẩn."], ["Có dạng cuộn và tấm không?", "Có thể trao đổi dạng cuộn, tấm và chi tiết cắt theo yêu cầu."], ["Cấp chịu nhiệt hoặc chống cháy là gì?", "Phụ thuộc công thức và tiêu chuẩn thử được chỉ định; cần xác nhận bằng mẫu."]],
    form: { applicationLabel: "Ứng dụng công nghiệp", applicationPlaceholder: "Chọn ứng dụng (không bắt buộc)", productLabel: "Dạng cung cấp", productPlaceholder: "Chọn dạng (không bắt buộc)", messageLabel: "Thông số hoặc yêu cầu mẫu", messagePlaceholder: "Độ dày, định lượng, kích thước, tiêu chuẩn nhiệt/cháy, số lượng", submit: "Yêu cầu mẫu giấy cách nhiệt", subject: "Yêu cầu giấy cách nhiệt sợi thủy tinh - Viking", applications: [["Electrical equipment insulation", "Cách nhiệt thiết bị điện"], ["Industrial heating equipment", "Thiết bị gia nhiệt công nghiệp"], ["Fire-rated door / partition", "Cửa / vách chống cháy"], ["Battery pack thermal barrier", "Lớp chắn nhiệt bộ pin"], ["Custom industrial insulation", "Cách nhiệt công nghiệp tùy chỉnh"], ["Not sure", "Chưa xác định"]], formats: [["Glass fiber insulation paper rolls", "Cuộn giấy cách nhiệt"], ["Glass fiber insulation paper sheets", "Tấm cách nhiệt"], ["Custom-cut insulation parts", "Chi tiết cắt theo yêu cầu"], ["Rolls and sheets", "Cuộn và tấm"], ["Not sure", "Chưa xác định"]] }
  },
  ko: {
    eyebrow: "산업용 유리섬유 소재", title: "유리섬유 단열지", subtitle: "산업용 단열, 열 차단 및 부품 분리용 롤, 시트와 맞춤 재단품입니다. 용도, 온도 및 시험 규격에 따라 사양을 검토합니다.", heroProof: ["롤 및 시트", "견적 전 사양 확인", "샘플 검토 지원"], overviewTitle: "단열과 열 분리를 위한 경량 유리섬유 소재", overview: ["유리섬유 단열지는 장비 단열, 열 차단 및 부품 분리에 사용하는 부직포 산업 소재입니다.", "이 제품은 AGM 배터리 분리막과 다릅니다. 재료 구조, 바인더, 강도와 시험 방법은 실제 용도에 맞춰야 합니다.", "외관만으로 내열 또는 난연 등급을 판단하지 않으며, 합의된 규격과 샘플 시험으로 확인합니다."], parametersTitle: "샘플 전 확인 정보", parametersText: "용도, 시험 방법, 도면, 기존 샘플 또는 TDS/COA를 보내 주세요.", parameters: [["두께", "목표값, 공차 및 측정 방법을 확인합니다."], ["평량", "밀도, 취급성과 단열 요구를 함께 검토합니다."], ["바인더 함량", "유연성, 취급성과 열 특성에 영향을 줍니다."], ["인장 강도", "방향, 시편 폭과 시험 방법을 명시합니다."], ["내열/난연 요구", "온도, 노출 시간과 요구 규격을 알려 주세요."], ["치수와 포장", "폭, 길이, 코어, 시트 크기, 재단 및 포장을 확인합니다."]], formsTitle: "롤, 시트 및 맞춤 재단", forms: [["유리섬유 단열지 롤", "두께, 폭, 길이, 코어와 포장을 검토합니다."], ["유리섬유 단열 시트", "샘플 검토와 직접 조립에 적합합니다."], ["맞춤 재단품", "도면과 치수 공차에 따라 검토합니다."], ["포장 및 로트 공급", "라벨, 보관 보호와 반복 주문 일관성을 확인합니다."]], applicationsTitle: "협의 가능한 적용 분야", applications: ["전기 장비 단열", "산업용 가열 장비", "방화문 및 칸막이", "배터리 팩 열 차단", "가전 열 차폐", "맞춤 산업 단열 부품"], qualityTitle: "성능은 합의된 시험으로 확인합니다", qualityText: "AGM 분리막 데이터나 타사 방화 등급을 이 제품에 그대로 적용하지 않습니다.", quality: [["소재 확인", "섬유, 바인더와 코팅 필요 여부를 확인합니다."], ["치수 검사", "두께, 평량, 폭과 재단 치수를 검사합니다."], ["용도 검증", "실제 조건에서 내열, 난연, 전기 또는 내화학 요구를 확인합니다."]], relatedTitle: "공장 및 구매 정보", inquiryTitle: "단열지 사양 보내기", inquiryText: "용도, 두께, 평량, 치수, 내열/난연 규격, 수량과 샘플 또는 도면을 보내 주세요.", checklist: ["최종 용도와 설치 위치", "두께와 평량", "롤/시트/재단 치수", "온도와 노출 시간", "규격, 샘플 또는 도면"], placeholder: "용도, 두께, 평량, 치수, 규격, 수량과 샘플", footer: "산업용 단열을 위한 유리섬유 소재 제조 및 가공 협의.", faqTitle: "유리섬유 단열지 FAQ", faq: [["AGM 분리막과 같은 제품인가요?", "아닙니다. 재료 설계, 바인더, 기계적 요구와 시험 방법이 다릅니다."], ["두께만으로 견적이 가능한가요?", "평량, 바인더, 인장 시험, 치수, 사용 조건과 규격이 필요합니다."], ["롤과 시트 공급이 가능한가요?", "롤, 시트 및 맞춤 재단품을 협의할 수 있습니다."], ["내열/난연 등급은 무엇인가요?", "배합과 지정 시험 규격에 따라 달라지며 샘플 시험으로 확인합니다."]], form: { applicationLabel: "산업 적용", applicationPlaceholder: "적용 분야 선택 (선택)", productLabel: "공급 형태", productPlaceholder: "형태 선택 (선택)", messageLabel: "사양 또는 샘플 요청", messagePlaceholder: "두께, 평량, 치수, 내열/난연 규격, 수량", submit: "단열지 샘플 요청", subject: "유리섬유 단열지 문의 - Viking", applications: [["Electrical equipment insulation", "전기 장비 단열"], ["Industrial heating equipment", "산업용 가열 장비"], ["Fire-rated door / partition", "방화문 / 칸막이"], ["Battery pack thermal barrier", "배터리 팩 열 차단"], ["Custom industrial insulation", "맞춤 산업 단열"], ["Not sure", "미정"]], formats: [["Glass fiber insulation paper rolls", "유리섬유 단열지 롤"], ["Glass fiber insulation paper sheets", "유리섬유 단열 시트"], ["Custom-cut insulation parts", "맞춤 재단품"], ["Rolls and sheets", "롤 및 시트"], ["Not sure", "미정"]] }
  },
  ja: {
    eyebrow: "産業用ガラス繊維材料", title: "ガラス繊維断熱紙", subtitle: "産業用断熱、遮熱、部品分離向けのロール、シート、カット品。用途、温度、試験規格に合わせて仕様を確認します。", heroProof: ["ロール・シート", "見積前の仕様確認", "サンプル評価対応"], overviewTitle: "断熱と熱分離に用いる軽量ガラス繊維材料", overview: ["ガラス繊維断熱紙は、設備断熱、遮熱、部品分離に使用する不織布系の産業材料です。", "AGMバッテリーセパレーターとは異なります。材料構造、バインダー、強度、試験方法を用途ごとに確認する必要があります。", "外観のみで耐熱・難燃等級を判断せず、合意した規格とサンプル試験で確認します。"], parametersTitle: "サンプル前に確認する情報", parametersText: "用途、試験方法、図面、既存サンプル、TDS/COAをご提示ください。", parameters: [["厚さ", "目標値、公差、測定方法を確認します。"], ["坪量", "密度、取扱性、断熱要件と合わせて確認します。"], ["バインダー含有量", "柔軟性、取扱性、熱特性に影響します。"], ["引張強度", "方向、試験片幅、試験方法を明記します。"], ["耐熱・難燃要件", "温度、時間、必要規格をご提示ください。"], ["寸法・梱包", "幅、長さ、芯、シート寸法、カット、梱包を確認します。"]], formsTitle: "ロール、シート、カット形状", forms: [["ガラス繊維断熱紙ロール", "厚さ、幅、長さ、芯、巻き状態、梱包を確認します。"], ["ガラス繊維断熱シート", "サンプル評価や直接組立に使用できます。"], ["カスタムカット品", "図面と寸法公差に合わせて検討します。"], ["梱包・ロット供給", "ラベル、保管保護、継続注文の一貫性を確認します。"]], applicationsTitle: "ご相談可能な用途", applications: ["電気機器の断熱", "産業用加熱設備", "防火扉・間仕切り", "バッテリーパック遮熱", "家電の遮熱", "産業用カスタム断熱部品"], qualityTitle: "性能は合意した試験で確認", qualityText: "AGMセパレーターのデータや他社の防火等級を本製品に転用しません。", quality: [["材料確認", "繊維、バインダー、コーティングの要否を確認します。"], ["寸法検査", "厚さ、坪量、幅、カット寸法を確認します。"], ["用途評価", "実条件で耐熱、難燃、電気、耐薬品要件を評価します。"]], relatedTitle: "工場・購買情報を見る", inquiryTitle: "断熱紙仕様を送信", inquiryText: "用途、厚さ、坪量、寸法、耐熱/難燃規格、数量、サンプルまたは図面をご提示ください。", checklist: ["用途と設置位置", "厚さと坪量", "ロール/シート/カット寸法", "温度と時間", "規格、サンプル、図面"], placeholder: "用途、厚さ、坪量、寸法、規格、数量、サンプル", footer: "産業用断熱向けガラス繊維材料の製造・加工相談。", faqTitle: "ガラス繊維断熱紙 FAQ", faq: [["AGMセパレーターと同じですか？", "異なります。材料設計、バインダー、機械特性、試験方法が異なります。"], ["厚さだけで見積できますか？", "坪量、バインダー、引張試験、寸法、使用条件、規格も必要です。"], ["ロールとシートに対応しますか？", "ロール、シート、カスタムカット品をご相談いただけます。"], ["耐熱・難燃等級は？", "配合と指定試験規格により異なり、サンプル試験で確認します。"]], form: { applicationLabel: "産業用途", applicationPlaceholder: "用途を選択（任意）", productLabel: "供給形状", productPlaceholder: "形状を選択（任意）", messageLabel: "仕様・サンプル要件", messagePlaceholder: "厚さ、坪量、寸法、耐熱/難燃規格、数量", submit: "断熱紙サンプルを依頼", subject: "ガラス繊維断熱紙のお問い合わせ - Viking", applications: [["Electrical equipment insulation", "電気機器の断熱"], ["Industrial heating equipment", "産業用加熱設備"], ["Fire-rated door / partition", "防火扉 / 間仕切り"], ["Battery pack thermal barrier", "バッテリーパック遮熱"], ["Custom industrial insulation", "産業用カスタム断熱"], ["Not sure", "未定"]], formats: [["Glass fiber insulation paper rolls", "ガラス繊維断熱紙ロール"], ["Glass fiber insulation paper sheets", "ガラス繊維断熱シート"], ["Custom-cut insulation parts", "カスタムカット品"], ["Rolls and sheets", "ロール・シート"], ["Not sure", "未定"]] }
  },
  es: {
    eyebrow: "Material industrial de fibra de vidrio", title: "Papel aislante térmico de fibra de vidrio", subtitle: "Rollos, láminas y piezas cortadas para aislamiento industrial. Revisamos la especificación según aplicación, temperatura y norma de ensayo.", heroProof: ["Rollos y láminas", "Revisión antes de cotizar", "Validación de muestras"], overviewTitle: "Material ligero para aislamiento y separación térmica", overview: ["Es un material no tejido de fibra de vidrio para aislamiento de equipos, barreras térmicas y separación de componentes.", "No es un separador AGM de batería. La estructura, el aglutinante, la resistencia y los ensayos deben corresponder a la aplicación real.", "La apariencia no determina la temperatura ni la clasificación al fuego; deben verificarse con la norma y la muestra acordadas."], parametersTitle: "Datos necesarios antes de preparar muestras", parametersText: "Envíe la aplicación, método de ensayo, plano, muestra o TDS/COA disponible.", parameters: [["Espesor", "Confirme valor, tolerancia y método de medición."], ["Gramaje", "Revíselo con densidad, manejo y aislamiento."], ["Contenido de aglutinante", "Afecta flexibilidad, manejo y desempeño térmico."], ["Resistencia a la tracción", "Indique dirección, ancho de probeta y método."], ["Requisito térmico o de fuego", "Indique temperatura, tiempo y norma."], ["Dimensiones y embalaje", "Confirme ancho, largo, núcleo, lámina, corte y embalaje."]], formsTitle: "Rollos, láminas y corte a medida", forms: [["Rollos de papel de fibra de vidrio", "Revisión de espesor, ancho, largo, núcleo y embalaje."], ["Láminas aislantes", "Para muestras, montaje manual o colocación directa."], ["Piezas cortadas a medida", "Según plano y tolerancias dimensionales."], ["Embalaje y suministro por lotes", "Se confirman etiquetas, protección y consistencia."]], applicationsTitle: "Aplicaciones para revisar", applications: ["Aislamiento de equipos eléctricos", "Equipos de calentamiento industrial", "Puertas y divisiones resistentes al fuego", "Barreras térmicas para baterías", "Protección térmica de electrodomésticos", "Piezas aislantes industriales"], qualityTitle: "El desempeño se confirma con ensayos acordados", qualityText: "No aplicamos datos AGM ni clasificaciones de fuego de otros proveedores a este producto.", quality: [["Identificación del material", "Confirme fibra, aglutinante y recubrimiento."], ["Control dimensional", "Espesor, gramaje, ancho y corte."], ["Validación de aplicación", "Ensayos térmicos, de fuego, eléctricos o químicos según uso."]], relatedTitle: "Información de fábrica y compra", inquiryTitle: "Envíe su especificación", inquiryText: "Comparta aplicación, espesor, gramaje, dimensiones, norma térmica/de fuego, cantidad y muestra o plano.", checklist: ["Uso y posición", "Espesor y gramaje", "Dimensiones", "Temperatura y tiempo", "Norma, muestra o plano"], placeholder: "Aplicación, espesor, gramaje, dimensiones, norma, cantidad y muestra", footer: "Materiales de fibra de vidrio y conversión para aislamiento industrial.", faqTitle: "Preguntas sobre papel aislante", faq: [["¿Es igual a un separador AGM?", "No. El diseño, aglutinante, requisitos mecánicos y ensayos son diferentes."], ["¿Se cotiza solo con el espesor?", "También se requieren gramaje, aglutinante, ensayo de tracción, dimensiones y norma."], ["¿Se ofrece en rollos y láminas?", "Se pueden revisar rollos, láminas y piezas cortadas."], ["¿Qué clasificación térmica o de fuego tiene?", "Depende de la formulación y la norma indicada; se confirma con muestras."]], form: { applicationLabel: "Aplicación industrial", applicationPlaceholder: "Seleccione una aplicación (opcional)", productLabel: "Formato de suministro", productPlaceholder: "Seleccione un formato (opcional)", messageLabel: "Especificación o muestra", messagePlaceholder: "Espesor, gramaje, dimensiones, norma térmica/de fuego y cantidad", submit: "Solicitar muestra de papel aislante", subject: "Consulta de papel aislante de fibra de vidrio - Viking", applications: [["Electrical equipment insulation", "Aislamiento de equipos eléctricos"], ["Industrial heating equipment", "Equipo de calentamiento industrial"], ["Fire-rated door / partition", "Puerta / división resistente al fuego"], ["Battery pack thermal barrier", "Barrera térmica para baterías"], ["Custom industrial insulation", "Aislamiento industrial a medida"], ["Not sure", "Aún no definido"]], formats: [["Glass fiber insulation paper rolls", "Rollos de papel aislante"], ["Glass fiber insulation paper sheets", "Láminas aislantes"], ["Custom-cut insulation parts", "Piezas cortadas"], ["Rolls and sheets", "Rollos y láminas"], ["Not sure", "Aún no definido"]] }
  },
  pt: {
    eyebrow: "Material industrial de fibra de vidro", title: "Papel de isolamento térmico de fibra de vidro", subtitle: "Rolos, folhas e peças cortadas para isolamento industrial. A especificação é analisada conforme aplicação, temperatura e norma de ensaio.", heroProof: ["Rolos e folhas", "Análise antes da cotação", "Validação de amostras"], overviewTitle: "Material leve para isolamento e separação térmica", overview: ["Material não tecido de fibra de vidro para isolamento de equipamentos, barreiras térmicas e separação de componentes.", "Não é um separador AGM de bateria. Estrutura, ligante, resistência e ensaios devem corresponder à aplicação real.", "A aparência não determina classe térmica ou de fogo; a confirmação depende da norma e da amostra acordadas."], parametersTitle: "Dados para preparar a amostra", parametersText: "Envie aplicação, método, desenho, amostra ou TDS/COA disponível.", parameters: [["Espessura", "Confirme valor, tolerância e método de medição."], ["Gramatura", "Analise com densidade, manuseio e isolamento."], ["Teor de ligante", "Afeta flexibilidade, manuseio e desempenho térmico."], ["Resistência à tração", "Informe direção, largura do corpo de prova e método."], ["Requisito térmico ou de fogo", "Informe temperatura, tempo e norma."], ["Dimensões e embalagem", "Confirme largura, comprimento, tubete, folha, corte e embalagem."]], formsTitle: "Rolos, folhas e corte sob medida", forms: [["Rolos de papel de fibra de vidro", "Análise de espessura, largura, comprimento, tubete e embalagem."], ["Folhas isolantes", "Para amostras, montagem manual ou aplicação direta."], ["Peças cortadas", "Conforme desenho e tolerâncias."], ["Embalagem e lotes", "Confirmamos etiquetas, proteção e consistência."]], applicationsTitle: "Aplicações para análise", applications: ["Isolamento de equipamentos elétricos", "Equipamentos de aquecimento industrial", "Portas e divisórias corta-fogo", "Barreiras térmicas para baterias", "Proteção térmica de eletrodomésticos", "Peças isolantes industriais"], qualityTitle: "O desempenho segue ensaios acordados", qualityText: "Não aplicamos dados de AGM ou classe de fogo de outro fornecedor a este produto.", quality: [["Identificação do material", "Fibra, ligante e necessidade de revestimento."], ["Controle dimensional", "Espessura, gramatura, largura e corte."], ["Validação da aplicação", "Ensaios térmicos, de fogo, elétricos ou químicos conforme o uso."]], relatedTitle: "Informações de fábrica e compra", inquiryTitle: "Envie sua especificação", inquiryText: "Compartilhe aplicação, espessura, gramatura, dimensões, norma térmica/de fogo, quantidade e amostra ou desenho.", checklist: ["Uso e posição", "Espessura e gramatura", "Dimensões", "Temperatura e tempo", "Norma, amostra ou desenho"], placeholder: "Aplicação, espessura, gramatura, dimensões, norma, quantidade e amostra", footer: "Materiais de fibra de vidro e conversão para isolamento industrial.", faqTitle: "Perguntas sobre papel de isolamento", faq: [["É igual ao separador AGM?", "Não. Projeto, ligante, requisitos mecânicos e ensaios são diferentes."], ["É possível cotar só pela espessura?", "Também precisamos de gramatura, ligante, tração, dimensões e norma."], ["Há rolos e folhas?", "Podemos analisar rolos, folhas e peças cortadas."], ["Qual é a classe térmica ou de fogo?", "Depende da formulação e da norma indicada; confirmamos por amostra."]], form: { applicationLabel: "Aplicação industrial", applicationPlaceholder: "Selecione uma aplicação (opcional)", productLabel: "Formato de fornecimento", productPlaceholder: "Selecione um formato (opcional)", messageLabel: "Especificação ou amostra", messagePlaceholder: "Espessura, gramatura, dimensões, norma térmica/de fogo e quantidade", submit: "Solicitar amostra de papel isolante", subject: "Consulta de papel isolante de fibra de vidro - Viking", applications: [["Electrical equipment insulation", "Isolamento de equipamentos elétricos"], ["Industrial heating equipment", "Equipamento de aquecimento industrial"], ["Fire-rated door / partition", "Porta / divisória corta-fogo"], ["Battery pack thermal barrier", "Barreira térmica para baterias"], ["Custom industrial insulation", "Isolamento industrial personalizado"], ["Not sure", "Ainda não definido"]], formats: [["Glass fiber insulation paper rolls", "Rolos de papel isolante"], ["Glass fiber insulation paper sheets", "Folhas isolantes"], ["Custom-cut insulation parts", "Peças cortadas"], ["Rolls and sheets", "Rolos e folhas"], ["Not sure", "Ainda não definido"]] }
  },
  ru: {
    eyebrow: "Промышленный стекловолоконный материал", title: "Теплоизоляционная бумага из стекловолокна", subtitle: "Рулоны, листы и детали по чертежу для промышленной теплоизоляции. Характеристики согласуются по применению, температуре и методу испытаний.", heroProof: ["Рулоны и листы", "Проверка ТЗ до расчета", "Поддержка испытания образцов"], overviewTitle: "Легкий материал для теплоизоляции и теплового разделения", overview: ["Нетканый стекловолоконный материал для изоляции оборудования, тепловых барьеров и разделения компонентов.", "Это не AGM-сепаратор аккумулятора. Структура, связующее, прочность и методы испытаний зависят от фактического применения.", "Температурный или огнестойкий класс нельзя определять по внешнему виду; он подтверждается согласованным стандартом и образцом."], parametersTitle: "Данные до изготовления образца", parametersText: "Предоставьте применение, метод испытаний, чертеж, образец или TDS/COA.", parameters: [["Толщина", "Укажите значение, допуск и метод измерения."], ["Поверхностная плотность", "Оценивается вместе с плотностью, обработкой и изоляцией."], ["Содержание связующего", "Влияет на гибкость, обработку и тепловые свойства."], ["Прочность на растяжение", "Укажите направление, ширину образца и метод."], ["Тепловые/огневые требования", "Укажите температуру, время и стандарт."], ["Размеры и упаковка", "Укажите ширину, длину, втулку, листы, раскрой и упаковку."]], formsTitle: "Рулоны, листы и раскрой", forms: [["Рулоны стекловолоконной бумаги", "Согласование толщины, ширины, длины, втулки и упаковки."], ["Теплоизоляционные листы", "Для образцов, ручной сборки или прямой укладки."], ["Детали по чертежу", "Раскрой по чертежу и допускам."], ["Упаковка и партии", "Согласование маркировки, защиты и повторяемости."]], applicationsTitle: "Области применения для обсуждения", applications: ["Изоляция электрооборудования", "Промышленное нагревательное оборудование", "Противопожарные двери и перегородки", "Тепловые барьеры батарейных модулей", "Теплозащита бытовой техники", "Промышленные изоляционные детали"], qualityTitle: "Характеристики подтверждаются согласованными испытаниями", qualityText: "Данные AGM или огнестойкость другого поставщика не переносятся на этот продукт.", quality: [["Идентификация материала", "Волокно, связующее и необходимость покрытия."], ["Контроль размеров", "Толщина, плотность, ширина и раскрой."], ["Проверка применения", "Тепловые, огневые, электрические или химические испытания по условиям эксплуатации."]], relatedTitle: "Информация о производстве и закупке", inquiryTitle: "Отправьте техническое задание", inquiryText: "Укажите применение, толщину, плотность, размеры, тепловой/огневой стандарт, количество и образец или чертеж.", checklist: ["Назначение и место установки", "Толщина и плотность", "Размеры", "Температура и время", "Стандарт, образец или чертеж"], placeholder: "Применение, толщина, плотность, размеры, стандарт, количество и образец", footer: "Стекловолоконные материалы и раскрой для промышленной теплоизоляции.", faqTitle: "Вопросы о теплоизоляционной бумаге", faq: [["Это AGM-сепаратор?", "Нет. Конструкция, связующее, механические требования и испытания различаются."], ["Можно рассчитать только по толщине?", "Нужны также плотность, связующее, метод растяжения, размеры и стандарт."], ["Есть рулоны и листы?", "Обсуждаются рулоны, листы и детали по чертежу."], ["Какой температурный или огневой класс?", "Зависит от состава и стандарта; подтверждается испытанием образца."]], form: { applicationLabel: "Промышленное применение", applicationPlaceholder: "Выберите применение (необязательно)", productLabel: "Форма поставки", productPlaceholder: "Выберите форму (необязательно)", messageLabel: "Техническое задание или образец", messagePlaceholder: "Толщина, плотность, размеры, тепловой/огневой стандарт и количество", submit: "Запросить образец теплоизоляции", subject: "Запрос теплоизоляционной бумаги из стекловолокна - Viking", applications: [["Electrical equipment insulation", "Изоляция электрооборудования"], ["Industrial heating equipment", "Промышленное нагревательное оборудование"], ["Fire-rated door / partition", "Противопожарная дверь / перегородка"], ["Battery pack thermal barrier", "Тепловой барьер батарейного модуля"], ["Custom industrial insulation", "Промышленная изоляция по ТЗ"], ["Not sure", "Пока не определено"]], formats: [["Glass fiber insulation paper rolls", "Рулоны теплоизоляционной бумаги"], ["Glass fiber insulation paper sheets", "Теплоизоляционные листы"], ["Custom-cut insulation parts", "Детали по чертежу"], ["Rolls and sheets", "Рулоны и листы"], ["Not sure", "Пока не определено"]] }
  }
};

copy.ar = {
  ...copy.en,
  eyebrow: "مادة صناعية من الألياف الزجاجية",
  title: "ورق عزل حراري من الألياف الزجاجية",
  subtitle: "لفائف وألواح وقطع حسب الطلب للعزل الحراري الصناعي. تُراجع المواصفات وفق التطبيق ودرجة الحرارة ومعيار الاختبار.",
  heroProof: ["لفائف وألواح", "مراجعة المواصفات قبل العرض", "دعم التحقق بالعينة"],
  overviewTitle: "مادة خفيفة للعزل والفصل الحراري",
  overview: ["ورق العزل الحراري من الألياف الزجاجية مادة صناعية غير منسوجة تستخدم لعزل المعدات والحواجز الحرارية وفصل المكونات.", "هذا المنتج ليس فاصل بطارية AGM. يجب تأكيد البنية والمواد الرابطة ومتطلبات الشد والاختبارات حسب التطبيق الصناعي.", "لا تُستنتج درجة الحرارة أو مقاومة اللهب أو العزل الكهربائي من المظهر فقط؛ يجب إثباتها بطريقة الاختبار والعينة المتفق عليها."],
  parametersTitle: "معلومات يجب تأكيدها قبل إعداد العينة",
  parametersText: "تبدأ المراجعة المفيدة من التطبيق وطريقة الاختبار، لا من قيمة سماكة واحدة فقط.",
  parameters: [["السماكة", "حدد القيمة المستهدفة والتفاوت وطريقة القياس."], ["الوزن المساحي", "يُراجع مع الكثافة واحتياجات المناولة والعزل."], ["المادة الرابطة", "تؤثر في المناولة والمرونة والأداء الحراري."], ["قوة الشد", "حدد الاتجاه وعرض العينة وطريقة الاختبار."], ["المتطلبات الحرارية أو مقاومة الحريق", "اذكر درجة الحرارة ومدة التعرض والمعيار المطلوب."], ["الأبعاد والتعبئة", "أكد عرض وطول اللفافة واللب وحجم اللوح والقطع والتعبئة."]],
  formsTitle: "لفائف وألواح وقطع محولة",
  forms: [["لفائف ورق الألياف الزجاجية", "تُراجع السماكة والعرض والطول واللب وحالة اللف والتعبئة."], ["ألواح عزل من الألياف الزجاجية", "للعينات أو التجميع اليدوي أو الاستخدام المباشر."], ["قطع حسب الطلب", "تُناقش الأشكال والأبعاد وفق الرسومات والتفاوتات."], ["التعبئة والتوريد الدفعي", "تُؤكد الملصقات والحماية واتساق الطلبات المتكررة."]],
  applicationsTitle: "اتجاهات تطبيق للمناقشة",
  applications: ["عزل المعدات الكهربائية", "معدات التسخين الصناعي", "الأبواب والقواطع المقاومة للحريق", "حواجز حرارية لحزم البطاريات", "حماية الأجهزة من الحرارة", "أجزاء عزل صناعية مخصصة"],
  qualityTitle: "مطالبات الأداء تتبع الاختبارات المتفق عليها",
  qualityText: "لا ننقل بيانات فواصل AGM أو درجة حريق لمورد آخر إلى هذا المنتج.",
  quality: [["تحديد المادة", "تأكيد تركيب الألياف والمادة الرابطة والحاجة إلى طلاء أو تصفيح."], ["فحص الأبعاد", "السماكة والوزن المساحي والعرض وحجم القطع بطرق متفق عليها."], ["التحقق من التطبيق", "تُراجع متطلبات الحرارة أو اللهب أو العزل أو المقاومة الكيميائية وفق الاستخدام الفعلي."]],
  relatedTitle: "تابع إلى معلومات المصنع والشراء",
  inquiryTitle: "أرسل مواصفات ورق العزل",
  inquiryText: "شارك التطبيق والسماكة والوزن المساحي وأبعاد اللفائف أو الألواح ومعيار الحرارة أو الحريق والكمية والعينة أو الرسم.",
  checklist: ["الاستخدام وموضع التركيب", "السماكة والوزن المساحي", "الأبعاد", "درجة الحرارة والمدة", "المعيار أو العينة أو الرسم"],
  placeholder: "التطبيق والسماكة والوزن المساحي والأبعاد والمعيار والكمية والعينة",
  footer: "تصنيع مواد الألياف الزجاجية ومناقشة التحويل لتطبيقات العزل الصناعي.",
  faqTitle: "أسئلة عن ورق العزل من الألياف الزجاجية",
  faq: [["هل هو فاصل بطارية AGM؟", "لا. تختلف البنية والمادة الرابطة والمتطلبات الميكانيكية وطرق الاختبار."], ["هل يمكن العرض بالسماكة فقط؟", "يلزم أيضًا الوزن المساحي والمادة الرابطة والشد والأبعاد والمعيار."], ["هل تتوفر لفائف وألواح؟", "يمكن مناقشة اللفائف والألواح والقطع حسب الطلب."], ["ما درجة الحرارة أو الحريق؟", "تعتمد على التركيب والمعيار وتؤكد بالعينة والاختبار."]],
  form: { ...copy.en.form, applicationLabel: "التطبيق الصناعي", applicationPlaceholder: "اختر تطبيقًا (اختياري)", productLabel: "شكل التوريد", productPlaceholder: "اختر الشكل (اختياري)", messageLabel: "المواصفة أو العينة", messagePlaceholder: "السماكة والوزن المساحي والأبعاد ومعيار الحرارة أو الحريق والكمية", submit: "اطلب عينة ورق العزل", subject: "استفسار عن ورق عزل من الألياف الزجاجية - Viking", applications: [["Electrical equipment insulation", "عزل المعدات الكهربائية"], ["Industrial heating equipment", "معدات التسخين الصناعي"], ["Fire-rated door / partition", "باب أو قاطع مقاوم للحريق"], ["Battery pack thermal barrier", "حاجز حراري لحزمة بطارية"], ["Custom industrial insulation", "عزل صناعي مخصص"], ["Not sure", "لم يتحدد بعد"]], formats: [["Glass fiber insulation paper rolls", "لفائف ورق العزل"], ["Glass fiber insulation paper sheets", "ألواح ورق العزل"], ["Custom-cut insulation parts", "قطع عزل حسب الطلب"], ["Rolls and sheets", "لفائف وألواح"], ["Not sure", "لم يتحدد بعد"]] }
};

const formImages = [
  ["/images/capability/agm-roll-finished.jpg", 1600, 1200],
  ["/images/capability/agm-sheets-stacked.jpg", 1600, 1200],
  ["/images/capability/agm-sheets-cutting.jpg", 1600, 1200],
  ["/images/capability/finished-goods.jpg", 1600, 1200]
];

function pathFor(locale) {
  return `${localeMeta[locale].prefix}/products/glass-fiber-thermal-insulation-paper/`;
}

function relatedFor(locale) {
  if (locale === "ar") {
    return [["فواصل AGM", "/ar/products/agm-separator/"], ["لفائف AGM", "/ar/products/agm-separator-rolls/"], ["فحص الجودة", "/ar/quality-control/agm-separator-testing/"], ["طلب عينة", "/ar/request-agm-separator-sample/"], ["نبذة عن الشركة", "/ar/#company"]];
  }
  const prefix = localeMeta[locale].prefix;
  const labels = {
    en: ["AGM separator products", "AGM separator rolls", "Quality control", "Technical resources", "Company overview"],
    zh: ["AGM 隔板产品", "AGM 隔板卷材", "质量检测", "技术资料", "公司介绍"],
    vi: ["Tấm ngăn AGM", "Cuộn AGM", "Kiểm soát chất lượng", "Tài liệu", "Công ty"],
    ko: ["AGM 분리막", "AGM 롤", "품질 관리", "기술 자료", "회사 소개"],
    ja: ["AGMセパレーター", "AGMロール", "品質管理", "技術資料", "会社情報"],
    es: ["Separadores AGM", "Rollos AGM", "Control de calidad", "Recursos", "Empresa"],
    pt: ["Separadores AGM", "Rolos AGM", "Controle de qualidade", "Recursos", "Empresa"],
    ru: ["AGM-сепараторы", "Рулоны AGM", "Контроль качества", "Материалы", "О компании"]
  }[locale];
  return [
    [labels[0], `${prefix}/products/agm-separator/`],
    [labels[1], `${prefix}/products/agm-separator-rolls/`],
    [labels[2], `${prefix}/quality-control/agm-separator-testing/`],
    [labels[3], `${prefix}/resources/`],
    [labels[4], `${prefix ? `${prefix}/` : "/"}#company`]
  ];
}

export const thermalInsulationPaperContent = Object.fromEntries(
  thermalInsulationPaperLocales.map((locale) => {
    const t = copy[locale];
    const path = pathFor(locale);
    return [locale, {
      homePath: localeMeta[locale].prefix ? `${localeMeta[locale].prefix}/` : "/",
      languagePath: locale === "zh" ? "/products/glass-fiber-thermal-insulation-paper/" : "/zh/products/glass-fiber-thermal-insulation-paper/",
      quote: t.form.submit,
      hero: { eyebrow: t.eyebrow, title: t.title, subtitle: t.subtitle, primary: t.form.submit, secondary: t.inquiryTitle, proof: t.heroProof, image: { src: formImages[0][0], alt: t.forms[0][0], width: formImages[0][1], height: formImages[0][2] } },
      overview: { eyebrow: t.eyebrow, title: t.overviewTitle, paragraphs: t.overview },
      parameters: { eyebrow: t.parametersTitle, title: t.parametersTitle, text: t.parametersText, items: t.parameters },
      forms: { eyebrow: t.formsTitle, title: t.formsTitle, items: t.forms.map((item, index) => [item[0], item[1], formImages[index][0], item[0], formImages[index][1], formImages[index][2]]) },
      applications: { eyebrow: t.applicationsTitle, title: t.applicationsTitle, items: t.applications },
      quality: { eyebrow: t.qualityTitle, title: t.qualityTitle, text: t.qualityText, cards: t.quality },
      related: { eyebrow: t.relatedTitle, title: t.relatedTitle, items: relatedFor(locale) },
      inquiry: { eyebrow: t.inquiryTitle, title: t.inquiryTitle, text: t.inquiryText, checklist: t.checklist, placeholder: t.placeholder, submit: t.form.submit, submitting: "...", required: "", success: "", failure: "", emailFallback: "" },
      footer: { description: t.footer, wechat: "WeChat", mobile: "Viking AGM" },
      path
    }];
  })
);

export const thermalInsulationPaperLeadCopy = Object.fromEntries(
  thermalInsulationPaperLocales.map((locale) => {
    const t = copy[locale];
    return [locale, {
      heroPrompt: t.inquiryText,
      formText: t.inquiryText,
      checklist: t.checklist,
      faqEyebrow: t.eyebrow,
      faqTitle: t.faqTitle,
      faq: t.faq,
      messagePlaceholder: t.placeholder
    }];
  })
);

export const thermalInsulationPaperFormCopy = Object.fromEntries(
  thermalInsulationPaperLocales.map((locale) => [locale, copy[locale].form])
);

const seoTitles = {
  en: "Glass Fiber Thermal Insulation Paper Rolls & Sheets | Viking",
  zh: "玻璃纤维隔热纸厂家｜卷材、片材与规格匹配｜湖北维京",
  vi: "Giấy cách nhiệt sợi thủy tinh dạng cuộn và tấm | Viking",
  ko: "유리섬유 단열지 롤·시트 | Viking",
  ja: "ガラス繊維断熱紙 ロール・シート | Viking",
  es: "Papel aislante térmico de fibra de vidrio | Viking",
  pt: "Papel de isolamento térmico de fibra de vidro | Viking",
  ru: "Теплоизоляционная бумага из стекловолокна | Viking"
  ,ar: "ورق عزل حراري من الألياف الزجاجية | Viking AGM"
};

export const thermalInsulationPaperSeo = Object.fromEntries(
  thermalInsulationPaperLocales.map((locale) => {
    const t = copy[locale];
    return [locale, {
      path: pathFor(locale), locale: localeMeta[locale].og, language: localeMeta[locale].html,
      siteName: localeMeta[locale].site, title: seoTitles[locale], description: t.subtitle,
      keywords: [t.title, t.forms[0][0], t.forms[1][0], t.applications[0], "glass fiber thermal insulation paper"],
      productName: t.title, serviceDescription: t.inquiryText,
      breadcrumbs: [locale === "zh" ? "首页" : "Home", locale === "zh" ? "产品" : "Products", t.title]
    }];
  })
);
