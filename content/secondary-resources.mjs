import { additionalResourceTopics } from "./additional-resource-topics.mjs";
import { arabicResourceData } from "./arabic-resources.mjs";
import { completeResourceSections, completedResourceKinds } from "./resource-section-completions.mjs";
import { resourceComparisons } from "./resource-comparisons.mjs";

export const secondaryResourceLocales = ["vi", "ko", "ja", "es", "pt", "ru", "ar"];

export const articleKinds = [
  "whatIsAgmSeparator",
  "keyTechnicalParameters",
  "howToChooseAgmSeparator",
  "agmGlassFiberVsPvcSeparator",
  "agmSeparatorManufacturingQualityDelivery",
  "agmSeparatorPerformanceConsistency",
  "agmSeparatorExportSupplyReadiness",
  "upsVrlaTechnologySelection",
  "dataCenterBackupPowerAgmSeparator",
  "earlyChinaLeadAcidBatteryManufacturing",
  "agmSeparatorPressureRetention",
  "agmSeparatorBatchProcessControl",
  "agmSeparatorThirdPole",
  "agmSeparatorEnergyDataDelivery",
  "en18060BatteryStandard",
  "dataCenterEvLowVoltageAgm",
  "aiDataCenterBackupPowerLayers",
  "agmPastingPaperEnergyValidation",
  "agmSeparatorSupplyChain",
  "agmStartStopBatteryProcurement"
];

export const articleDefinitions = {
  agmPastingPaperEnergyValidation: ["agm-fiberglass-pasting-paper-drying-energy-validation", "manufacturingQuality", "2026-10-09", "2026-10-09"],
  aiDataCenterBackupPowerLayers: ["ai-data-center-backup-power-1mw-60-seconds", "industryApplications", "2026-10-08", "2026-10-08"],
  agmSeparatorSupplyChain: ["agm-separator-supply-chain-from-glass-block-to-finished-roll", "manufacturingQuality", "2026-09-01", "2026-10-03"],
  agmStartStopBatteryProcurement: ["agm-start-stop-battery-separator-procurement-guide", "buyerGuides", "2026-09-10", "2026-10-03"],
  dataCenterEvLowVoltageAgm: ["why-data-centers-and-electric-vehicles-still-use-lead-acid-low-voltage-power", "industryApplications", "2026-10-04", "2026-10-04"],
  whatIsAgmSeparator: ["what-is-agm-separator", "buyerGuides", "2026-06-11"],
  keyTechnicalParameters: ["key-technical-parameters-of-agm-separator", "buyerGuides", "2026-06-13"],
  howToChooseAgmSeparator: ["how-to-choose-agm-separator", "buyerGuides", "2026-06-13"],
  agmGlassFiberVsPvcSeparator: ["agm-glass-fiber-vs-pvc-battery-separator", "buyerGuides", "2026-07-26"],
  agmSeparatorManufacturingQualityDelivery: ["agm-separator-manufacturing-quality-delivery", "manufacturingQuality", "2026-07-07"],
  agmSeparatorPerformanceConsistency: ["agm-separator-performance-consistency", "manufacturingQuality", "2026-07-10"],
  agmSeparatorExportSupplyReadiness: ["agm-separator-export-supply-readiness", "industryApplications", "2026-07-11"],
  upsVrlaTechnologySelection: ["why-ups-projects-still-use-vrla-batteries", "industryApplications", "2026-07-23"],
  dataCenterBackupPowerAgmSeparator: ["agm-separator-for-data-center-backup-power", "industryApplications", "2026-08-07", "2026-08-07"],
  earlyChinaLeadAcidBatteryManufacturing: ["how-chinas-earliest-lead-acid-batteries-were-made", "manufacturingQuality", "2026-08-11", "2026-08-11"],
  agmSeparatorPressureRetention: ["agm-separator-pressure-retention-after-acid-filling-and-cycling", "manufacturingQuality", "2026-08-12", "2026-08-12"],
  agmSeparatorBatchProcessControl: ["agm-separator-batch-consistency-and-process-control", "manufacturingQuality", "2026-08-12", "2026-08-12"],
  agmSeparatorThirdPole: ["agm-separator-third-pole-explained", "buyerGuides", "2026-09-13", "2026-09-13"],
  agmSeparatorEnergyDataDelivery: ["agm-separator-energy-data-and-delivery-risk", "manufacturingQuality", "2026-09-18", "2026-09-18"]
  ,en18060BatteryStandard: ["en-18060-2025-road-vehicle-battery-standard", "industryApplications", "2026-10-03", "2026-10-03"]
};

const images = {
  agmPastingPaperEnergyValidation: ["/images/agm-quality-control-1200.webp", 1200, 900],
  aiDataCenterBackupPowerLayers: ["/images/applications/ups-vrla-battery-application-1200.webp", 1200, 900],
  agmSeparatorSupplyChain: ["/images/agm-hero-production-1600.webp", 1600, 1000],
  agmStartStopBatteryProcurement: ["/images/agm-quality-control-1200.webp", 1200, 900],
  whatIsAgmSeparator: ["/images/viking-finished-separator-roll-900.webp", 900, 675],
  keyTechnicalParameters: ["/images/agm-quality-control-1200.webp", 1200, 900],
  howToChooseAgmSeparator: ["/images/viking-finished-separator-roll-900.webp", 900, 675],
  agmGlassFiberVsPvcSeparator: ["/images/viking-finished-separator-roll-900.webp", 900, 675],
  agmSeparatorManufacturingQualityDelivery: ["/images/agm-hero-production-1600.webp", 1600, 1000],
  agmSeparatorPerformanceConsistency: ["/images/agm-quality-control-1200.webp", 1200, 900],
  agmSeparatorExportSupplyReadiness: ["/images/evidence/shipping-pallet-01.webp", 1200, 900],
  upsVrlaTechnologySelection: ["/images/applications/ups-vrla-battery-application-1200.webp", 1200, 900],
  dataCenterBackupPowerAgmSeparator: ["/images/applications/ups-vrla-battery-application-1200.webp", 1200, 900],
  dataCenterEvLowVoltageAgm: ["/images/applications/ups-vrla-battery-application-1200.webp", 1200, 900],
  earlyChinaLeadAcidBatteryManufacturing: ["/images/agm-hero-production-1600.webp", 1600, 1000],
  agmSeparatorPressureRetention: ["/images/agm-quality-control-1200.webp", 1200, 800],
  agmSeparatorBatchProcessControl: ["/images/agm-quality-control-1200.webp", 1200, 800],
  agmSeparatorThirdPole: ["/images/agm-quality-control-1200.webp", 1200, 800],
  agmSeparatorEnergyDataDelivery: ["/images/agm-hero-production-1600.webp", 1600, 1000]
  ,en18060BatteryStandard: ["/images/agm-quality-control-1200.webp", 1200, 900]
};

export const secondaryResourceData = {
  vi: {
    meta: { html: "vi", hreflang: "vi-VN", og: "vi_VN", site: "Viking AGM Việt Nam" },
    nav: { company: "Công ty", products: "Sản phẩm", quality: "Chất lượng", resources: "Tài liệu", applications: "Ứng dụng", contact: "Liên hệ" },
    ui: {
      sample: "Yêu cầu mẫu", contents: "Mục lục bài viết", next: "Bước tiếp theo cho mua hàng",
      sampleTitle: "Yêu cầu mẫu và đối chiếu thông số", sampleText: "Gửi ứng dụng ắc quy, dạng cuộn hoặc tấm và kích thước hiện có để bắt đầu trao đổi kỹ thuật.",
      reference: "Tài liệu kỹ thuật", pdfTitle: "Tải hồ sơ năng lực Viking AGM (EN/ZH)", pdfText: "Tài liệu song ngữ Anh/Trung về dạng sản phẩm, kiểm tra chất lượng, đóng gói và thông số.",
      company: "Công ty", product: "Sản phẩm", resource: "Tài liệu", contact: "Liên hệ", rights: "Bảo lưu mọi quyền.",
      article: "Bài viết", read: "Đọc bài viết", download: "Tải tài liệu", source: "Nguồn dữ liệu và lưu ý"
    },
    hub: {
      eyebrow: "Trung tâm tài liệu tấm ngăn AGM", title: "Tài liệu kỹ thuật dành cho đội ngũ mua hàng tấm ngăn AGM",
      subtitle: "Hướng dẫn thực tế về thông số, sản xuất, chất lượng và ứng dụng giúp chuẩn bị yêu cầu kỹ thuật, mẫu thử và trao đổi với nhà cung cấp.",
      count: "8 bài viết kỹ thuật", actionEyebrow: "Bắt đầu trao đổi mua hàng", actionTitle: "Từ nghiên cứu đến đối chiếu thông số",
      actionText: "Chia sẻ thông tin hiện có hoặc tải hồ sơ năng lực EN/ZH trước khi liên hệ đội ngũ của chúng tôi.",
      libraryEyebrow: "Thư viện tài liệu", libraryTitle: "Duyệt theo chủ đề mua hàng", closingEyebrow: "Bước tiếp theo",
      closingTitle: "Cần hỗ trợ đối chiếu thông số tấm ngăn AGM?", closingText: "Gửi ứng dụng ắc quy, dạng cuộn hoặc tấm và kích thước hiện có để tiếp tục trao đổi kỹ thuật.",
      productLink: "Xem sản phẩm tấm ngăn AGM", footer: "Sản xuất tấm ngăn sợi thủy tinh AGM, đánh giá chất lượng và phối hợp cung ứng cho dự án ắc quy chì-axit."
    },
    categories: {
      buyerGuides: ["Hướng dẫn mua hàng", "Kiến thức cơ bản, thông số kỹ thuật và cách lựa chọn tấm ngăn AGM."],
      manufacturingQuality: ["Sản xuất và chất lượng", "Quy trình sản xuất, kiểm tra, tính nhất quán theo lô và phối hợp giao hàng."],
      industryApplications: ["Ngành và ứng dụng", "Quyết định cung ứng và ứng dụng thực tế cho các dự án ắc quy."]
    },
    actions: {
      sample: ["Yêu cầu mẫu và đối chiếu thông số", "Gửi ứng dụng ắc quy, kích thước và yêu cầu dạng cuộn hoặc tấm."],
      capabilityPdf: ["Hồ sơ năng lực kỹ thuật EN/ZH", "Tải tài liệu Anh/Trung về dạng sản phẩm, kiểm tra chất lượng và đóng gói."]
    },
    common: {
      guide: "Hướng dẫn kỹ thuật AGM", secondary: "Xem danh sách kiểm tra mua hàng", formatsEyebrow: "Dạng cung cấp", formatsTitle: "Chọn dạng cuộn hoặc tấm theo quy trình sản xuất",
      roll: ["Tấm ngăn AGM dạng cuộn", "Phù hợp dây chuyền liên tục, chia cuộn hoặc cắt nội bộ trước khi lắp ráp."],
      sheet: ["Tấm ngăn AGM dạng tấm", "Phù hợp khi cần kích thước cắt sẵn để đơn giản hóa khâu chuẩn bị lắp ráp."],
      checklistEyebrow: "Kiểm tra mua hàng", checklistTitle: "Xác nhận yêu cầu trước khi lấy mẫu", checklistText: "Thông tin rõ ràng giúp đánh giá mẫu và trao đổi thông số hiệu quả hơn.",
      relatedEyebrow: "Tài liệu liên quan", relatedTitle: "Tiếp tục đánh giá sản phẩm và nhà cung cấp",
      inquiryEyebrow: "Trao đổi thông số", inquiryTitle: "Gửi yêu cầu ứng dụng và kích thước", inquiryText: "Chia sẻ thông tin bạn đã có. Chúng tôi sẽ trao đổi về dạng sản phẩm, mẫu thử và khả năng phối hợp.",
      inquiryChecklist: ["Ứng dụng và loại ắc quy", "Độ dày, chiều rộng hoặc kích thước tấm", "Dạng cuộn hoặc tấm và yêu cầu đóng gói"],
      placeholder: "Mô tả ứng dụng, thông số mục tiêu, số lượng mẫu hoặc yêu cầu đóng gói.",
      footer: "Tấm ngăn sợi thủy tinh AGM dạng cuộn và tấm cho nhà sản xuất ắc quy VRLA.", wechat: "Theo dõi tài khoản WeChat của Viking AGM", mobile: "Truy cập trang web Viking AGM trên điện thoại"
    },
    topics: {
      whatIsAgmSeparator: {
        title: "Tấm ngăn AGM là gì?", summary: "Giới thiệu thực tế về tấm ngăn sợi thủy tinh hấp thụ dùng trong ắc quy chì-axit VRLA.",
        intro: "AGM là viết tắt của Absorbent Glass Mat. Vật liệu xốp này nằm giữa bản cực dương và âm, vừa ngăn tiếp xúc trực tiếp vừa giữ chất điện phân.",
        sections: [["Định nghĩa", "Tấm ngăn AGM là vật liệu sợi thủy tinh xốp", "Cấu trúc sợi thủy tinh được thiết kế cho ắc quy VRLA, nơi chất điện phân được giữ trong mạng lỗ rỗng thay vì chảy tự do."], ["Chức năng", "Tách bản cực và hỗ trợ phân bố axit", "Tấm ngăn phải duy trì khoảng cách điện, giữ chất điện phân và tạo điều kiện cho vận chuyển ion trong điều kiện nén của bộ bản cực."], ["Lựa chọn", "Không thể chỉ dựa vào độ dày", "Chiều rộng, khối lượng riêng theo diện tích, khả năng hút axit, điện trở, độ rỗng và độ bền cần phù hợp với thiết kế ắc quy và quy trình lắp ráp."]],
        parameters: [["Độ dày", "Liên quan đến thiết kế bản cực, mức nén và khe lắp ráp."], ["Khổ rộng hoặc kích thước tấm", "Xác nhận theo cấp liệu cuộn, cắt hoặc lắp trực tiếp."], ["Khả năng hút axit", "Đánh giá theo ứng dụng và phương pháp thử đã thống nhất."], ["Điện trở và độ bền", "Cần cân bằng hiệu suất điện với khả năng xử lý trong sản xuất."]],
        checklist: ["Loại ắc quy VRLA", "Độ dày và dung sai", "Dạng cuộn hoặc tấm", "Phương pháp thử và điều kiện nén"]
      },
      keyTechnicalParameters: {
        title: "Các thông số kỹ thuật chính của tấm ngăn AGM", summary: "Cách đọc độ dày, khối lượng riêng, hút axit, điện trở, độ rỗng và độ bền khi so sánh mẫu.",
        intro: "Một con số riêng lẻ không mô tả đầy đủ khả năng phù hợp. Các thông số phải được xem cùng thiết kế bản cực, lượng axit và điều kiện nén.",
        sections: [["Kích thước", "Độ dày và khối lượng riêng phải được xem cùng nhau", "Độ dày ảnh hưởng khe lắp và nén; khối lượng riêng phản ánh lượng vật liệu trên một diện tích. Cần thống nhất phương pháp đo."], ["Chất điện phân", "Hút axit và độ cao mao dẫn phản ánh hành vi thấm ướt", "Tốc độ và lượng axit được giữ cần phù hợp quy trình châm axit và cấu trúc bộ bản cực."], ["Hiệu suất", "Điện trở, độ rỗng và độ bền tạo thành một cân bằng", "Điện trở thấp là quan trọng, nhưng vật liệu cũng phải chịu cuộn, cắt và lắp ráp mà không mất tính nhất quán."], ["So sánh", "Yêu cầu điều kiện thử giống nhau", "Kết quả từ phương pháp, áp lực hoặc chuẩn bị mẫu khác nhau không nên được so trực tiếp."]],
        parameters: [["Độ dày", "Ghi rõ áp lực đo, dung sai và trạng thái mẫu."], ["Khối lượng riêng", "So sánh cùng độ dày danh nghĩa và cấu trúc vật liệu."], ["Hút axit", "Xác nhận loại axit, thời gian và cách tính."], ["Điện trở", "Thống nhất thiết bị, trạng thái thấm và điều kiện thử."]],
        checklist: ["Tiêu chuẩn và phương pháp thử", "Dung sai theo lô", "Điều kiện nén", "Mẫu đại diện cho sản xuất hàng loạt"]
      },
      howToChooseAgmSeparator: {
        title: "Cách lựa chọn tấm ngăn AGM", summary: "Danh sách kiểm tra giúp đội ngũ mua hàng chuyển từ tên sản phẩm sang yêu cầu ứng dụng có thể xác minh.",
        intro: "Lựa chọn bắt đầu từ ứng dụng ắc quy và quy trình lắp ráp, không phải từ bảng giá. Mẫu phù hợp cần được đánh giá trong điều kiện thực tế của khách hàng.",
        sections: [["Ứng dụng", "Xác định loại ắc quy và mục tiêu vận hành", "UPS, xe máy, ô tô và lưu trữ năng lượng có thiết kế, nhịp sản xuất và yêu cầu độ bền khác nhau."], ["Dạng sản phẩm", "Chọn cuộn hoặc tấm theo dây chuyền", "Khổ cuộn, đường kính, lõi giấy, kích thước tấm và cách đóng gói ảnh hưởng trực tiếp đến thao tác."], ["Thông số", "Xác nhận kích thước cùng các chỉ tiêu chức năng", "Độ dày, khối lượng riêng, hút axit, điện trở và độ bền cần được trao đổi như một bộ yêu cầu."], ["Xác minh", "Dùng mẫu và dữ liệu theo lô để giảm rủi ro", "Đánh giá mẫu, kiểm tra khả năng lắp ráp và thống nhất cách quản lý thay đổi trước khi mua hàng loạt."]],
        parameters: [["Ứng dụng ắc quy", "Nêu loại VRLA, kích thước và mục tiêu sử dụng."], ["Kích thước", "Cung cấp độ dày, khổ rộng hoặc kích thước tấm cùng dung sai."], ["Dạng giao hàng", "Xác nhận cuộn/tấm, lõi, đường kính cuộn và đóng gói."], ["Tiêu chí chấp nhận", "Thống nhất phép thử, mẫu chuẩn và hồ sơ lô."]],
        checklist: ["Ứng dụng và cấu trúc bản cực", "Thông số và dung sai", "Yêu cầu cuộn/tấm", "Kế hoạch mẫu và đánh giá hàng loạt"]
      },
      agmGlassFiberVsPvcSeparator: {
        title: "Tấm ngăn sợi thủy tinh AGM và tấm ngăn PVC khác nhau thế nào?", summary: "So sánh cấu trúc vật liệu, trạng thái chất điện phân, vai trò lắp ráp và giới hạn thay thế.",
        intro: "AGM và PVC phục vụ các kiến trúc ắc quy chì-axit khác nhau. Việc chọn vật liệu phải bắt đầu từ hệ thống ắc quy, không phải từ tên gọi chung 'tấm ngăn'.",
        sections: [["Quản lý điện phân", "AGM giữ axit trong mạng sợi", "Trong VRLA-AGM, mạng sợi thủy tinh hấp thụ và phân bố chất điện phân dưới điều kiện nén."], ["Cấu trúc PVC", "PVC vi xốp duy trì khoảng cách trong hệ thống khác", "Tấm PVC thường dựa vào lỗ vi mô và gân để tách bản cực trong thiết kế có điều kiện điện phân và cơ khí khác."], ["Lắp ráp", "Hai vật liệu có ưu tiên cơ khí khác nhau", "AGM chú trọng hút axit và tiếp xúc nén; PVC chú trọng hình dạng, độ cứng, gân và độ bền xuyên thủng."], ["Giới hạn", "Không nên thay thế trực tiếp", "Thay đổi vật liệu có thể làm thay đổi lượng axit, khoảng cách bản cực, nén, điện trở và quy trình lắp ráp; cần thiết kế và xác minh lại."]],
        parameters: [["Hệ thống ắc quy", "Xác nhận VRLA-AGM hay thiết kế dùng tấm vi xốp."], ["Trạng thái điện phân", "Xác định axit được giữ trong sợi hay tồn tại tự do hơn."], ["Cấu trúc lắp ráp", "Xem xét nén, gân, khoảng cách và cách cố định bản cực."], ["Thay thế", "Chỉ thực hiện sau đánh giá thiết kế và thử nghiệm đầy đủ."]],
        checklist: ["Kiến trúc ắc quy", "Trạng thái chất điện phân", "Yêu cầu nén hoặc gân", "Kế hoạch xác minh khi đổi vật liệu"]
      },
      agmSeparatorManufacturingQualityDelivery: {
        title: "Sản xuất, kiểm soát chất lượng và giao hàng tấm ngăn AGM", summary: "Cách một quy trình rõ ràng biến yêu cầu kỹ thuật thành sản phẩm ổn định và giao hàng có thể phối hợp.",
        intro: "Đối với khách hàng B2B, niềm tin đến từ hiện trường sản xuất, kiểm tra nhất quán và thông tin giao hàng rõ ràng, không chỉ từ một mẫu đẹp.",
        sections: [["Nhà máy", "Năng lực phải được thể hiện bằng quy trình thực tế", "Chuẩn bị nguyên liệu, tạo tấm, sấy, cuộn hoặc cắt và đóng gói cần được tổ chức thành luồng có kiểm soát."], ["Chất lượng", "Kiểm tra phải gắn với thông số đã thống nhất", "Kích thước, khối lượng riêng, hút axit, điện trở và độ bền cần có phương pháp thử và tiêu chí chấp nhận rõ ràng."], ["Tính nhất quán", "Quản lý lô quan trọng hơn một kết quả riêng lẻ", "Mẫu ban đầu, dữ liệu sản xuất và thay đổi quy trình cần được liên kết để giảm biến động giữa các lô."], ["Giao hàng", "Đóng gói và thông tin lô là một phần của sản phẩm", "Dạng cuộn/tấm, nhãn, bảo vệ ẩm, pallet và lịch giao cần phù hợp với quy trình nhận hàng của khách hàng."]],
        parameters: [["Xác nhận trước sản xuất", "Đóng băng kích thước, dung sai và yêu cầu thử."], ["Kiểm tra trong quá trình", "Theo dõi các biến số ảnh hưởng đến độ dày và cấu trúc."], ["Hồ sơ lô", "Liên kết kết quả kiểm tra với lô giao hàng."], ["Đóng gói", "Bảo vệ sản phẩm và hỗ trợ nhận dạng tại kho."]],
        checklist: ["Bản thông số đã phê duyệt", "Phương pháp kiểm tra thống nhất", "Mã lô và hồ sơ", "Kế hoạch đóng gói và giao hàng"]
      },
      agmSeparatorPerformanceConsistency: {
        title: "Vì sao tính nhất quán của tấm ngăn AGM quan trọng?", summary: "Độ thấm ướt, tiếp xúc nén và biến động theo lô có thể ảnh hưởng đến lắp ráp và hiệu suất VRLA.",
        intro: "Hai mẫu có độ dày danh nghĩa giống nhau vẫn có thể hoạt động khác nhau nếu cấu trúc, hút axit hoặc khả năng chịu nén không ổn định.",
        sections: [["Thấm ướt", "Phân bố axit ổn định hỗ trợ đường dẫn ion", "Biến động cấu trúc và hút axit có thể tạo khác biệt về thời gian thấm, lượng axit giữ và trạng thái ban đầu."], ["Tiếp xúc", "Khả năng duy trì nén ảnh hưởng giao diện bản cực", "Tấm ngăn phải phù hợp khe lắp và duy trì tiếp xúc trong điều kiện vận hành mà không gây khó khăn cho lắp ráp."], ["Theo lô", "Sản xuất hàng loạt làm lộ biến động mà mẫu nhỏ có thể che giấu", "Sai khác về độ dày, khối lượng riêng hoặc kích thước có thể tăng điều chỉnh dây chuyền và giảm tính lặp lại."], ["Đánh giá", "Cần kết hợp dữ liệu vật liệu và thử nghiệm lắp ráp", "So sánh COA, mẫu theo lô và kết quả trên dây chuyền giúp xác định nguyên nhân và giới hạn chấp nhận."]],
        parameters: [["Độ đồng đều độ dày", "Kiểm tra nhiều vị trí và xu hướng theo cuộn/lô."], ["Khối lượng riêng", "Theo dõi cùng độ dày để hiểu cấu trúc vật liệu."], ["Thấm axit", "So sánh thời gian, lượng hấp thụ và điều kiện thử."], ["Kích thước giao hàng", "Theo dõi khổ rộng, mép cắt và độ ổn định cuộn."]],
        checklist: ["Dữ liệu nhiều vị trí", "Mẫu từ nhiều lô", "Kết quả lắp ráp thực tế", "Quy trình xử lý thay đổi"]
      },
      agmSeparatorExportSupplyReadiness: {
        title: "Chuẩn bị nguồn cung tấm ngăn AGM cho dự án xuất khẩu", summary: "Khi nhịp đơn hàng thay đổi, giao tiếp thông số, tính nhất quán và năng lực giao hàng trở nên nhạy cảm hơn.",
        intro: "Dữ liệu thương mại là tín hiệu tham khảo, không phải dự báo. Đối với đội ngũ mua hàng, câu hỏi thực tế là chuỗi cung ứng có duy trì được chất lượng khi sản lượng tăng hay không.",
        sections: [["Nhịp đơn hàng", "Khối lượng tăng làm lộ điểm nghẽn", "Thời gian xác nhận, nguyên liệu, năng lực kiểm tra và kế hoạch đóng gói cần được rà soát trước khi đơn hàng tăng tốc."], ["Thông số", "Dự án xuất khẩu cần hồ sơ rõ ràng", "Tên sản phẩm, đơn vị, dung sai, phương pháp thử, nhãn và phiên bản tài liệu phải được hai bên hiểu giống nhau."], ["Tính nhất quán", "Khách hàng cần khả năng lặp lại qua nhiều lô", "Kế hoạch lấy mẫu, hồ sơ lô và quy trình thay đổi giúp giảm rủi ro khi vận chuyển và sản xuất ở khoảng cách xa."], ["Giao hàng", "Lịch và đóng gói phải phù hợp chuỗi logistics", "Độ ẩm, bảo vệ mép, pallet, đánh dấu và chứng từ cần được xác nhận theo yêu cầu dự án."]],
        parameters: [["Dự báo nhu cầu", "Chia sẻ phạm vi và nhịp đơn hàng thay vì chỉ một ngày giao."], ["Bản thông số", "Kiểm soát phiên bản, đơn vị và dung sai."], ["Hồ sơ chất lượng", "Thống nhất COA, mẫu lưu và truy xuất lô."], ["Đóng gói xuất khẩu", "Xác nhận nhãn, pallet, bảo vệ và chứng từ."]],
        checklist: ["Dự báo và lịch giao", "Thông số có kiểm soát phiên bản", "Hồ sơ lô", "Kế hoạch đóng gói và xử lý bất thường"]
      },
      upsVrlaTechnologySelection: {
        title: "Vì sao nhiều dự án UPS vẫn sử dụng ắc quy VRLA?", summary: "Sự trưởng thành của hệ thống, khả năng tương thích, vận hành và nguồn cung vẫn quyết định lựa chọn thực tế.",
        intro: "Công nghệ mới đáng được đánh giá, nhưng thay đổi hệ thống lưu điện không chỉ là đổi loại ắc quy. Dự án phải xem xét bộ sạc, không gian, vận hành, bảo trì và rủi ro chuyển đổi.",
        sections: [["Hệ thống hiện hữu", "VRLA vẫn phù hợp với nhiều hệ thống đã được xác minh", "Thiết bị sạc, tủ, quy trình bảo trì và phụ tùng hiện có tạo thành một hệ sinh thái mà dự án phải tính đến."], ["Lựa chọn kỹ thuật", "Không có một công nghệ tối ưu cho mọi dự án", "Mật độ năng lượng, chi phí vòng đời, năng lực vận hành, an toàn hệ thống và độ tin cậy của nguồn cung phải được đánh giá cùng nhau."], ["Vai trò AGM", "Trong VRLA-AGM, tấm ngăn là thành phần chức năng", "Tấm ngăn giữ chất điện phân, hỗ trợ vận chuyển ion, duy trì tiếp xúc nén và ảnh hưởng khả năng lắp ráp ổn định."], ["Mua hàng", "Thông số và tính nhất quán quan trọng hơn tên sản phẩm", "Đội ngũ cần xác nhận độ dày, kích thước, hút axit, điện trở, dạng giao hàng và khả năng duy trì qua nhiều lô."]],
        parameters: [["Thiết kế UPS", "Xác nhận điện áp, chế độ dự phòng và cấu hình ắc quy."], ["Cấu trúc VRLA", "Xác nhận bản cực, mức nén và lượng axit."], ["Dạng tấm ngăn", "Chọn cuộn hoặc tấm theo quy trình lắp ráp."], ["Duy trì nguồn cung", "Đánh giá mẫu, hồ sơ lô và kế hoạch giao hàng."]],
        checklist: ["Khả năng tương thích hệ thống", "Điều kiện vận hành", "Thông số tấm ngăn AGM", "Xác minh mẫu và hàng loạt"]
      }
    }
  }
};

secondaryResourceData.vi.comparison = {
  eyebrow: "So sánh vật liệu",
  title: "AGM và PVC phục vụ các cấu trúc ắc quy khác nhau",
  columns: ["Điểm so sánh", "Sợi thủy tinh AGM", "PVC vi xốp"],
  rows: [
    ["Hệ thống điển hình", "Ắc quy VRLA-AGM", "Thiết kế chì-axit dùng tấm vi xốp"],
    ["Chất điện phân", "Được giữ trong mạng sợi", "Thường tự do hơn quanh tấm có gân"],
    ["Trọng tâm lắp ráp", "Hút axit và tiếp xúc nén", "Khoảng cách, độ cứng và gân"],
    ["Thay thế trực tiếp", "Không khuyến nghị nếu chưa thiết kế và thử lại", "Không khuyến nghị nếu chưa thiết kế và thử lại"]
  ]
};
secondaryResourceData.vi.references = {
  eyebrow: "Tài liệu tham khảo",
  title: "Nguồn đọc thêm về cấu trúc tấm ngăn ắc quy",
  text: "Các nguồn dưới đây cung cấp bối cảnh kỹ thuật. Yêu cầu cuối cùng phải dựa trên thiết kế và phương pháp thử của dự án.",
  items: [
    ["Battery Council International — kiến thức về ắc quy chì-axit", "https://batterycouncil.org/"],
    ["Journal of Power Sources — nghiên cứu về vật liệu và ắc quy", "https://www.sciencedirect.com/journal/journal-of-power-sources"]
  ]
};

const topicConceptMap = {
  whatIsAgmSeparator: ["definition", "function", "selection"],
  keyTechnicalParameters: ["dimensions", "acid", "resistance", "testing"],
  howToChooseAgmSeparator: ["application", "format", "specification", "verification"],
  agmGlassFiberVsPvcSeparator: ["agm", "pvc", "assembly", "replacement"],
  agmSeparatorManufacturingQualityDelivery: ["factory", "quality", "batch", "delivery"],
  agmSeparatorPerformanceConsistency: ["wetting", "compression", "batch", "verification"],
  agmSeparatorExportSupplyReadiness: ["forecast", "specification", "batch", "logistics"],
  upsVrlaTechnologySelection: ["system", "technology", "agmRole", "procurement"]
};

function makeTemplatedLocale(config) {
  const topics = Object.fromEntries(
    Object.entries(config.topicMeta).map(([kind, meta]) => {
      const keys = topicConceptMap[kind];
      const sections = keys.map((key) => config.concepts[key]);
      return [kind, {
        title: meta[0],
        summary: meta[1],
        intro: meta[2],
        sections: sections.map(([eyebrow, title, text]) => [eyebrow, title, text]),
        parameters: sections.map(([, title, text]) => [title, text]),
        checklist: sections.map(([, title]) => title)
      }];
    })
  );

  return {
    meta: config.meta,
    nav: config.nav,
    ui: config.ui,
    hub: config.hub,
    categories: config.categories,
    actions: config.actions,
    common: config.common,
    topics,
    comparison: config.comparison,
    references: config.references
  };
}

Object.assign(secondaryResourceData, {
  ko: makeTemplatedLocale({
    meta: { html: "ko", hreflang: "ko-KR", og: "ko_KR", site: "Viking AGM Korea" },
    nav: { company: "회사", products: "제품", quality: "품질", resources: "자료", applications: "응용 분야", contact: "문의" },
    ui: { sample: "샘플 요청", contents: "글 목차", next: "구매 다음 단계", sampleTitle: "샘플 및 사양 검토 요청", sampleText: "배터리 용도, 롤 또는 시트 형태와 보유 치수를 보내 주시면 기술 검토를 시작할 수 있습니다.", reference: "기술 자료", pdfTitle: "Viking AGM 기술 역량 PDF 다운로드 (EN/ZH)", pdfText: "제품 형태, 품질 검사, 포장 및 사양 협의를 설명하는 영문/중문 자료입니다.", company: "회사", product: "제품", resource: "자료", contact: "문의", rights: "모든 권리 보유.", article: "기술 글", read: "글 읽기", download: "다운로드", source: "데이터 출처 및 안내" },
    hub: { eyebrow: "AGM 분리막 자료 센터", title: "AGM 분리막 구매·기술팀을 위한 실무 자료", subtitle: "사양 작성, 샘플 평가 및 공급업체 협의를 준비할 수 있도록 기술 파라미터, 제조, 품질과 응용 정보를 제공합니다.", count: "기술 글 8편", actionEyebrow: "구매 협의 시작", actionTitle: "자료 검토에서 사양 매칭까지", actionText: "현재 확보한 요구사항을 보내거나 문의 전에 EN/ZH 기술 역량 자료를 확인하십시오.", libraryEyebrow: "자료 라이브러리", libraryTitle: "구매 주제별로 보기", closingEyebrow: "다음 단계", closingTitle: "AGM 분리막 사양 매칭이 필요하십니까?", closingText: "배터리 용도, 롤/시트 형태와 현재 치수를 보내 주시면 기술 협의를 이어갈 수 있습니다.", productLink: "AGM 분리막 제품 보기", footer: "납축전지 프로젝트를 위한 AGM 유리섬유 분리막 제조, 품질 검토 및 공급 협업." },
    categories: { buyerGuides: ["구매 가이드", "AGM 분리막의 기초, 기술 파라미터와 사양 선택."], manufacturingQuality: ["제조 및 품질", "생산, 검사, 로트 일관성과 납품 협업."], industryApplications: ["산업 및 응용", "배터리 프로젝트의 공급과 응용 의사결정."] },
    actions: { sample: ["샘플 및 사양 검토 요청", "배터리 용도, 치수와 롤 또는 시트 요구사항을 공유하십시오."], capabilityPdf: ["기술 역량 PDF (EN/ZH)", "제품 형태, 품질 검사와 포장을 설명하는 영문/중문 자료입니다."] },
    common: { guide: "AGM 분리막 기술 가이드", secondary: "구매 체크리스트 보기", formatsEyebrow: "공급 형태", formatsTitle: "생산 공정에 맞는 롤 또는 시트 선택", roll: ["AGM 분리막 롤", "연속 생산, 슬리팅 또는 조립 전 사내 절단에 적합합니다."], sheet: ["AGM 분리막 시트", "절단된 규격으로 공급하여 조립 준비를 단순화할 때 적합합니다."], checklistEyebrow: "구매 확인", checklistTitle: "샘플 전에 요구사항 확인", checklistText: "명확한 정보는 샘플 평가와 사양 협의를 더 효율적으로 만듭니다.", relatedEyebrow: "관련 자료", relatedTitle: "제품 및 공급업체 평가 계속하기", inquiryEyebrow: "사양 협의", inquiryTitle: "용도와 치수 요구사항을 보내 주세요", inquiryText: "현재 보유한 정보를 공유하면 제품 형태, 샘플과 공급 가능성을 함께 검토할 수 있습니다.", inquiryChecklist: ["배터리 용도와 형식", "두께, 폭 또는 시트 치수", "롤/시트 및 포장 요구사항"], placeholder: "용도, 목표 사양, 샘플 수량 또는 포장 요구사항을 적어 주세요.", footer: "VRLA 배터리 제조사를 위한 롤 및 시트형 AGM 유리섬유 분리막.", wechat: "Viking AGM WeChat 공식 계정", mobile: "모바일에서 Viking AGM 웹사이트 방문" },
    topicMeta: {
      whatIsAgmSeparator: ["AGM 분리막이란 무엇입니까?", "VRLA 납축전지에 사용되는 흡수성 유리섬유 분리막의 실무 안내.", "AGM은 Absorbent Glass Mat의 약자입니다. 다공성 유리섬유 매트가 양극과 음극을 분리하고 전해액을 내부에 유지합니다."],
      keyTechnicalParameters: ["AGM 분리막의 핵심 기술 파라미터", "두께, 평량, 산 흡수, 전기 저항, 기공률과 강도를 함께 읽는 방법.", "단일 수치만으로 적합성을 판단할 수 없습니다. 파라미터는 극판 설계, 전해액량과 압축 조건과 함께 검토해야 합니다."],
      howToChooseAgmSeparator: ["AGM 분리막 선택 방법", "제품명에서 검증 가능한 응용 요구사항으로 전환하는 구매 체크리스트.", "선택은 가격표가 아니라 배터리 용도와 조립 공정에서 시작합니다. 실제 조건에서 샘플을 검증해야 합니다."],
      agmGlassFiberVsPvcSeparator: ["AGM 유리섬유와 PVC 배터리 분리막 비교", "재료 구조, 전해액 상태, 조립 역할과 대체 한계를 비교합니다.", "AGM과 PVC는 서로 다른 납축전지 구조를 위한 재료입니다. 분리막이라는 이름만으로 직접 대체해서는 안 됩니다."],
      agmSeparatorManufacturingQualityDelivery: ["AGM 분리막 제조, 품질 관리 및 납품", "명확한 공정이 사양을 안정적인 제품과 추적 가능한 납품으로 전환하는 방법.", "B2B 신뢰는 한 번의 좋은 샘플보다 실제 생산, 일관된 검사와 명확한 납품 정보에서 형성됩니다."],
      agmSeparatorPerformanceConsistency: ["AGM 분리막 일관성이 중요한 이유", "젖음, 압축 접촉과 로트 변동이 VRLA 조립 및 성능에 미치는 영향.", "명목 두께가 같아도 구조, 산 흡수와 압축 거동이 불안정하면 조립과 배터리 결과가 달라질 수 있습니다."],
      agmSeparatorExportSupplyReadiness: ["수출 프로젝트를 위한 AGM 분리막 공급 준비", "주문 속도가 바뀔 때 사양 소통, 로트 일관성과 납품 역량을 점검합니다.", "무역 데이터는 참고 신호일 뿐 예측이 아닙니다. 구매팀은 물량 증가 시에도 공급망이 품질을 유지할 수 있는지 확인해야 합니다."],
      upsVrlaTechnologySelection: ["많은 UPS 프로젝트가 여전히 VRLA를 사용하는 이유", "시스템 성숙도, 호환성, 운영과 공급망이 실제 기술 선택을 좌우합니다.", "새 기술을 평가할 필요는 있지만 UPS 에너지 저장 체계 변경은 배터리만 바꾸는 일이 아닙니다. 충전기, 공간, 유지보수와 전환 위험을 함께 봐야 합니다."]
    },
    concepts: {
      definition: ["정의", "AGM은 다공성 유리섬유 분리막입니다", "VRLA 구조에서 유리섬유 네트워크가 전해액을 유지하며 극판의 직접 접촉을 막습니다."], function: ["기능", "극판 분리와 전해액 분포를 지원합니다", "절연, 산 유지와 이온 이동이 극판군의 압축 조건에서 함께 작동해야 합니다."], selection: ["선택", "두께만으로는 충분하지 않습니다", "폭, 평량, 산 흡수, 저항, 기공률과 강도를 배터리 설계에 맞춰야 합니다."], dimensions: ["치수", "두께와 평량을 함께 검토합니다", "측정 압력과 허용오차를 통일해야 샘플과 로트를 올바르게 비교할 수 있습니다."], acid: ["전해액", "산 흡수와 모세관 거동을 확인합니다", "흡수량과 젖음 속도는 주액 공정과 극판 구조에 맞아야 합니다."], resistance: ["성능", "저항, 기공률과 강도는 균형이 필요합니다", "전기 성능과 롤 취급, 절단 및 조립 내구성을 동시에 확인해야 합니다."], testing: ["시험", "동일한 조건에서 결과를 비교합니다", "시험 방법, 압력, 산 조건과 시료 준비가 다르면 수치를 직접 비교할 수 없습니다."], application: ["응용", "배터리 용도와 운전 목표를 먼저 정의합니다", "UPS, 이륜차, 자동차와 에너지 저장은 설계와 생산 요구가 다릅니다."], format: ["형태", "라인에 맞는 롤 또는 시트를 선택합니다", "롤 폭, 직경, 코어, 시트 치수와 포장은 작업성과 손실에 영향을 줍니다."], specification: ["사양", "치수와 기능 파라미터를 한 세트로 확인합니다", "두께, 평량, 흡수, 저항과 강도를 함께 합의해야 합니다."], verification: ["검증", "샘플과 로트 데이터로 위험을 줄입니다", "조립 평가, 승인 샘플과 변경 관리 기준을 양산 전에 정해야 합니다."], agm: ["AGM 구조", "유리섬유 네트워크가 산을 유지합니다", "VRLA-AGM에서는 흡수성과 압축 접촉이 핵심입니다."], pvc: ["PVC 구조", "미세다공 PVC는 다른 간격 구조를 사용합니다", "리브, 강성, 천공 저항이 다른 전해액 및 기계 설계에 맞춰집니다."], assembly: ["조립", "두 재료의 기계적 우선순위가 다릅니다", "AGM은 흡수와 압축, PVC는 간격, 리브와 강성이 중심입니다."], replacement: ["대체 한계", "직접 대체하지 않아야 합니다", "재료 변경은 산량, 간격, 압축, 저항과 공정을 바꾸므로 재설계와 시험이 필요합니다."], factory: ["공장", "역량은 실제 공정으로 입증됩니다", "원료 준비, 성형, 건조, 권취/절단과 포장이 관리된 흐름을 이뤄야 합니다."], quality: ["품질", "검사는 합의된 사양과 연결되어야 합니다", "치수와 기능 파라미터에는 명확한 시험 방법과 합격 기준이 필요합니다."], batch: ["로트", "한 번의 결과보다 로트 관리가 중요합니다", "승인 샘플, 생산 데이터와 변경 이력을 연결해 로트 변동을 줄입니다."], delivery: ["납품", "포장과 로트 정보도 제품의 일부입니다", "라벨, 방습, 팔레트와 일정은 고객의 입고 공정에 맞아야 합니다."], wetting: ["젖음", "안정적인 산 분포가 이온 경로를 지원합니다", "구조와 흡수 변동은 젖음 시간과 초기 상태 차이로 이어질 수 있습니다."], compression: ["압축", "압축 유지가 극판 접촉에 영향을 줍니다", "조립성을 해치지 않으면서 설계된 간격과 접촉을 유지해야 합니다."], forecast: ["수요 계획", "물량 증가는 공급 병목을 드러냅니다", "원료, 시험 능력과 포장 계획을 주문 증가 전에 검토해야 합니다."], logistics: ["물류", "일정과 포장은 운송 체계에 맞아야 합니다", "방습, 모서리 보호, 팔레트, 표시와 서류를 사전에 확인합니다."], system: ["기존 시스템", "검증된 VRLA 체계에는 현실적 가치가 있습니다", "충전기, 캐비닛, 유지보수와 예비품을 포함한 전체 생태계를 고려해야 합니다."], technology: ["기술 선택", "모든 프로젝트에 하나의 최적 기술은 없습니다", "밀도, 수명주기 비용, 운영 역량, 시스템 안전과 공급 신뢰성을 함께 평가합니다."], agmRole: ["AGM 역할", "VRLA-AGM에서 분리막은 기능 부품입니다", "전해액 유지, 이온 이동, 압축 접촉과 조립 일관성을 지원합니다."], procurement: ["구매", "제품명보다 사양과 일관성이 중요합니다", "치수, 흡수, 저항, 공급 형태와 다로트 반복성을 확인해야 합니다."]
    },
    comparison: { eyebrow: "재료 비교", title: "AGM과 PVC는 서로 다른 배터리 구조를 위한 재료입니다", columns: ["비교 항목", "AGM 유리섬유", "미세다공 PVC"], rows: [["대표 시스템", "VRLA-AGM", "미세다공 분리막을 쓰는 납축전지"], ["전해액", "섬유 네트워크에 유지", "리브 주변에서 더 자유로운 상태"], ["조립 초점", "흡수와 압축 접촉", "간격, 강성 및 리브"], ["직접 대체", "재설계와 시험 전에는 권장하지 않음", "재설계와 시험 전에는 권장하지 않음"]] },
    references: { eyebrow: "참고 자료", title: "배터리 분리막 구조에 대한 추가 자료", text: "최종 요구사항은 프로젝트 설계와 합의된 시험 방법에 따라야 합니다.", items: [["Battery Council International", "https://batterycouncil.org/"], ["Journal of Power Sources", "https://www.sciencedirect.com/journal/journal-of-power-sources"]] }
  })
});

Object.assign(secondaryResourceData, {
  pt: makeTemplatedLocale({
    meta: { html: "pt-BR", hreflang: "pt-BR", og: "pt_BR", site: "Viking AGM Brasil" },
    nav: { company: "Empresa", products: "Produtos", quality: "Qualidade", resources: "Recursos", applications: "Aplicações", contact: "Contato" },
    ui: { sample: "Solicitar amostra", contents: "Conteúdo do artigo", next: "Próxima etapa de compra", sampleTitle: "Solicitar amostra e análise de especificações", sampleText: "Envie a aplicação, o formato em rolo ou folha e as dimensões disponíveis para iniciar a análise técnica.", reference: "Referência técnica", pdfTitle: "Baixar capacidade técnica Viking AGM (EN/ZH)", pdfText: "Documento em inglês e chinês sobre formatos, controle de qualidade, embalagem e especificações.", company: "Empresa", product: "Produtos", resource: "Recursos", contact: "Contato", rights: "Todos os direitos reservados.", article: "Artigo", read: "Ler artigo", download: "Baixar", source: "Fonte de dados e observação" },
    hub: { eyebrow: "Centro de recursos de separadores AGM", title: "Recursos técnicos para compradores de separadores AGM", subtitle: "Guias práticos sobre parâmetros, fabricação, qualidade e aplicações para preparar especificações, amostras e conversas com fornecedores.", count: "8 artigos técnicos", actionEyebrow: "Iniciar uma conversa de compra", actionTitle: "Da pesquisa à análise de especificações", actionText: "Compartilhe as informações disponíveis ou consulte o PDF técnico EN/ZH antes de falar com nossa equipe.", libraryEyebrow: "Biblioteca de recursos", libraryTitle: "Explorar por tema de compra", closingEyebrow: "Próxima etapa", closingTitle: "Precisa analisar uma especificação de separador AGM?", closingText: "Envie a aplicação, o formato em rolo ou folha e as dimensões disponíveis para continuar a conversa técnica.", productLink: "Ver produtos de separador AGM", footer: "Fabricação de separadores AGM de fibra de vidro, análise de qualidade e coordenação de fornecimento para projetos de baterias chumbo-ácido." },
    categories: { buyerGuides: ["Guias de compra", "Fundamentos, parâmetros técnicos e seleção de especificações AGM."], manufacturingQuality: ["Fabricação e qualidade", "Produção, inspeção, consistência de lote e coordenação de entrega."], industryApplications: ["Indústria e aplicações", "Decisões práticas de fornecimento e aplicação para projetos de baterias."] },
    actions: { sample: ["Solicitar amostra e análise de especificações", "Compartilhe aplicação, dimensões e requisitos de rolo ou folha."], capabilityPdf: ["PDF de capacidade técnica EN/ZH", "Documento em inglês e chinês sobre formatos, controles e embalagem."] },
    common: { guide: "Guia técnico de separadores AGM", secondary: "Ver checklist de compra", formatsEyebrow: "Formato de fornecimento", formatsTitle: "Escolher rolo ou folha conforme o processo", roll: ["Rolos de separador AGM", "Adequados para produção contínua, corte longitudinal ou corte interno antes da montagem."], sheet: ["Folhas de separador AGM", "Adequadas quando dimensões pré-cortadas simplificam a preparação da montagem."], checklistEyebrow: "Análise de compra", checklistTitle: "Confirmar requisitos antes da amostra", checklistText: "Informações claras tornam a avaliação de amostras e especificações mais eficiente.", relatedEyebrow: "Recursos relacionados", relatedTitle: "Continuar a avaliação de produto e fornecedor", inquiryEyebrow: "Conversa técnica", inquiryTitle: "Envie sua aplicação e dimensões", inquiryText: "Compartilhe o que já possui para analisarmos formato, amostras e capacidade de fornecimento.", inquiryChecklist: ["Aplicação e tipo de bateria", "Espessura, largura ou tamanho da folha", "Rolo/folha e requisitos de embalagem"], placeholder: "Descreva aplicação, especificações-alvo, quantidade de amostras ou embalagem.", footer: "Separadores AGM de fibra de vidro em rolos e folhas para fabricantes de baterias VRLA.", wechat: "Conta oficial Viking AGM no WeChat", mobile: "Visitar o site Viking AGM pelo celular" },
    topicMeta: {
      whatIsAgmSeparator: ["O que é um separador AGM?", "Introdução prática ao separador de fibra de vidro absorvente para baterias VRLA.", "AGM significa Absorbent Glass Mat. A rede porosa separa as placas e mantém o eletrólito no interior."], keyTechnicalParameters: ["Principais parâmetros técnicos do separador AGM", "Como avaliar espessura, gramatura, absorção de ácido, resistência, porosidade e força.", "Um valor isolado não define adequação; os parâmetros devem ser relacionados às placas, ao ácido e à compressão."], howToChooseAgmSeparator: ["Como escolher um separador AGM", "Checklist para transformar um nome de produto em requisitos verificáveis de aplicação.", "A seleção começa pela aplicação e pelo processo de montagem e deve ser confirmada com amostras em condições reais."], agmGlassFiberVsPvcSeparator: ["Separadores AGM de fibra de vidro versus PVC", "Comparação de estrutura, eletrólito, montagem e limites de substituição.", "AGM e PVC atendem arquiteturas diferentes de baterias chumbo-ácido e não devem ser trocados apenas pelo nome."], agmSeparatorManufacturingQualityDelivery: ["Fabricação, qualidade e entrega de separadores AGM", "Como um processo claro converte especificações em produto estável e entrega rastreável.", "A confiança B2B vem da produção real, inspeção consistente e informações claras de entrega."], agmSeparatorPerformanceConsistency: ["Por que a consistência do separador AGM importa", "Molhabilidade, compressão e variação por lote influenciam montagem e desempenho VRLA.", "Materiais com a mesma espessura nominal podem reagir de modo diferente quando estrutura, absorção ou compressão variam."], agmSeparatorExportSupplyReadiness: ["Preparação de fornecimento AGM para projetos de exportação", "Revisar comunicação, consistência e entrega quando o ritmo de pedidos muda.", "Dados comerciais são referência, não previsão; o foco é manter qualidade quando o volume aumenta."], upsVrlaTechnologySelection: ["Por que muitos projetos UPS ainda usam baterias VRLA", "Maturidade, compatibilidade, operação e fornecimento determinam a escolha prática.", "Mudar a tecnologia de backup envolve carregadores, espaço, manutenção e risco de transição, não apenas outra bateria."]
    },
    concepts: {
      definition: ["Definição", "AGM é um separador poroso de fibra de vidro", "Em VRLA, a rede mantém o eletrólito e impede contato direto entre placas."], function: ["Função", "Separa placas e distribui eletrólito", "Isolamento, retenção de ácido e transporte iônico devem funcionar sob compressão."], selection: ["Seleção", "A espessura não é suficiente", "Largura, gramatura, absorção, resistência, porosidade e força devem corresponder ao projeto."], dimensions: ["Dimensões", "Analisar espessura e gramatura juntas", "Padronizar pressão de medição e tolerâncias para comparar amostras e lotes."], acid: ["Eletrólito", "Confirmar absorção e capilaridade", "Quantidade e velocidade de molhabilidade devem combinar com enchimento e placas."], resistance: ["Desempenho", "Equilibrar resistência, porosidade e força", "Verificar função elétrica e manuseio em bobinamento, corte e montagem."], testing: ["Ensaio", "Comparar nas mesmas condições", "Método, pressão, ácido e preparo diferentes não geram números comparáveis."], application: ["Aplicação", "Definir bateria e objetivo operacional", "UPS, motocicleta, automóvel e armazenamento têm requisitos distintos."], format: ["Formato", "Escolher rolo ou folha conforme a linha", "Largura, diâmetro, tubete, tamanho da folha e embalagem afetam a operação."], specification: ["Especificação", "Confirmar dimensão e função como conjunto", "Acordar espessura, gramatura, absorção, resistência e força."], verification: ["Verificação", "Reduzir risco com amostras e dados de lote", "Definir montagem, amostra aprovada e controle de mudanças antes da série."], agm: ["Estrutura AGM", "A fibra de vidro mantém o ácido", "Em VRLA-AGM, absorção e contato comprimido são essenciais."], pvc: ["Estrutura PVC", "PVC microporoso usa outro desenho de separação", "Nervuras, rigidez e resistência à perfuração atendem outra arquitetura."], assembly: ["Montagem", "Os materiais têm prioridades mecânicas diferentes", "AGM prioriza absorção e compressão; PVC, espaçamento, nervuras e rigidez."], replacement: ["Limite de substituição", "Não substituir diretamente", "A troca altera ácido, espaçamento, compressão, resistência e processo; requer redesenho e testes."], factory: ["Fábrica", "A capacidade aparece no processo real", "Matéria-prima, formação, secagem, bobinamento/corte e embalagem devem ser controlados."], quality: ["Qualidade", "Ligar inspeção à especificação", "Dimensões e função precisam de métodos e critérios de aceitação claros."], batch: ["Lote", "A gestão de lotes vale mais que um resultado isolado", "Conectar amostra aprovada, produção e mudanças reduz variação."], delivery: ["Entrega", "Embalagem e identificação fazem parte do produto", "Etiquetas, umidade, paletes e cronograma devem combinar com o recebimento."], wetting: ["Molhabilidade", "Distribuição estável de ácido favorece o transporte iônico", "Variações de estrutura e absorção alteram tempos e condição inicial."], compression: ["Compressão", "Manter compressão afeta o contato com as placas", "É preciso preservar espaçamento e contato sem dificultar a montagem."], forecast: ["Planejamento", "Maior volume revela gargalos", "Revisar matéria-prima, ensaios e embalagem antes da aceleração."], logistics: ["Logística", "Alinhar cronograma e embalagem ao transporte", "Confirmar umidade, proteção de borda, palete, marcação e documentos."], system: ["Sistema existente", "Sistemas VRLA validados mantêm valor prático", "Considerar carregadores, gabinetes, manutenção e peças como conjunto."], technology: ["Escolha tecnológica", "Não há uma tecnologia ideal para todos", "Avaliar densidade, custo de ciclo, operação, segurança e fornecimento."], agmRole: ["Papel do AGM", "Em VRLA-AGM o separador é funcional", "Mantém ácido, auxilia íons, contato comprimido e consistência de montagem."], procurement: ["Compra", "Especificação e consistência importam mais que o nome", "Confirmar dimensões, absorção, resistência, formato e repetibilidade."]
    },
    comparison: { eyebrow: "Comparação de materiais", title: "AGM e PVC correspondem a arquiteturas diferentes", columns: ["Aspecto", "Fibra de vidro AGM", "PVC microporoso"], rows: [["Sistema típico", "VRLA-AGM", "Chumbo-ácido com separador microporoso"], ["Eletrólito", "Retido na fibra", "Mais livre junto às nervuras"], ["Montagem", "Absorção e compressão", "Espaçamento, rigidez e nervuras"], ["Substituição", "Não sem redesenho e testes", "Não sem redesenho e testes"]] },
    references: { eyebrow: "Referências", title: "Leituras sobre separadores de baterias", text: "Os requisitos finais dependem do projeto e do método de ensaio acordado.", items: [["Battery Council International", "https://batterycouncil.org/"], ["Journal of Power Sources", "https://www.sciencedirect.com/journal/journal-of-power-sources"]] }
  }),
  ru: makeTemplatedLocale({
    meta: { html: "ru", hreflang: "ru-RU", og: "ru_RU", site: "Viking AGM" },
    nav: { company: "Компания", products: "Продукция", quality: "Качество", resources: "Материалы", applications: "Применение", contact: "Контакты" },
    ui: { sample: "Запросить образец", contents: "Содержание статьи", next: "Следующий шаг закупки", sampleTitle: "Запросить образец и проверку характеристик", sampleText: "Укажите применение, формат рулона или листа и имеющиеся размеры для начала технической проверки.", reference: "Технические материалы", pdfTitle: "Скачать технический профиль Viking AGM (EN/ZH)", pdfText: "Документ на английском и китайском о формах продукции, контроле качества, упаковке и характеристиках.", company: "Компания", product: "Продукция", resource: "Материалы", contact: "Контакты", rights: "Все права защищены.", article: "Статья", read: "Читать", download: "Скачать", source: "Источник данных и примечание" },
    hub: { eyebrow: "Центр материалов по AGM-сепараторам", title: "Технические материалы для закупщиков AGM-сепараторов", subtitle: "Практические руководства по параметрам, производству, качеству и применению для подготовки спецификаций, образцов и переговоров с поставщиком.", count: "8 технических статей", actionEyebrow: "Начать обсуждение закупки", actionTitle: "От изучения к проверке спецификации", actionText: "Перед обращением передайте имеющиеся требования или ознакомьтесь с техническим PDF на EN/ZH.", libraryEyebrow: "Библиотека", libraryTitle: "Материалы по темам закупки", closingEyebrow: "Следующий шаг", closingTitle: "Нужна проверка спецификации AGM-сепаратора?", closingText: "Пришлите применение батареи, формат рулона/листа и имеющиеся размеры для продолжения технического обсуждения.", productLink: "Посмотреть AGM-сепараторы", footer: "Производство стекловолоконных AGM-сепараторов, проверка качества и координация поставок для свинцово-кислотных батарей." },
    categories: { buyerGuides: ["Руководства для закупщиков", "Основы AGM, технические параметры и выбор спецификации."], manufacturingQuality: ["Производство и качество", "Производство, испытания, стабильность партий и поставка."], industryApplications: ["Отрасли и применение", "Практические решения по применению и снабжению проектов."] },
    actions: { sample: ["Запросить образец и проверку характеристик", "Укажите применение, размеры и требования к рулону или листу."], capabilityPdf: ["Технический PDF EN/ZH", "Документ на английском и китайском о продукции, контроле и упаковке."] },
    common: { guide: "Техническое руководство по AGM", secondary: "Смотреть чек-лист закупки", formatsEyebrow: "Форма поставки", formatsTitle: "Выберите рулон или лист по процессу производства", roll: ["AGM-сепаратор в рулонах", "Для непрерывного производства, продольной резки или внутреннего раскроя перед сборкой."], sheet: ["AGM-сепаратор в листах", "Для поставки готовых размеров и упрощения подготовки к сборке."], checklistEyebrow: "Проверка закупки", checklistTitle: "Подтвердите требования до заказа образца", checklistText: "Чёткая информация повышает эффективность оценки образца и согласования спецификации.", relatedEyebrow: "Связанные материалы", relatedTitle: "Продолжить оценку продукции и поставщика", inquiryEyebrow: "Обсуждение спецификации", inquiryTitle: "Отправьте данные о применении и размерах", inquiryText: "Передайте имеющуюся информацию для проверки формы продукции, образцов и возможностей поставки.", inquiryChecklist: ["Применение и тип батареи", "Толщина, ширина или размер листа", "Рулон/лист и требования к упаковке"], placeholder: "Опишите применение, целевые параметры, количество образцов или упаковку.", footer: "Стекловолоконные AGM-сепараторы в рулонах и листах для производителей VRLA-батарей.", wechat: "Официальный аккаунт Viking AGM в WeChat", mobile: "Открыть сайт Viking AGM на телефоне" },
    topicMeta: {
      whatIsAgmSeparator: ["Что такое AGM-сепаратор?", "Практическое введение в абсорбирующий стекловолоконный сепаратор для VRLA-батарей.", "AGM означает Absorbent Glass Mat. Пористый материал разделяет пластины и удерживает электролит."], keyTechnicalParameters: ["Ключевые технические параметры AGM-сепаратора", "Как оценивать толщину, массу, поглощение кислоты, сопротивление, пористость и прочность.", "Один показатель не определяет пригодность: параметры рассматривают вместе с пластинами, кислотой и сжатием."], howToChooseAgmSeparator: ["Как выбрать AGM-сепаратор", "Чек-лист для перевода названия продукта в проверяемые требования применения.", "Выбор начинается с применения и сборочного процесса и подтверждается образцами в реальных условиях."], agmGlassFiberVsPvcSeparator: ["Стекловолоконный AGM и ПВХ-сепаратор", "Сравнение структуры, электролита, сборки и границ замены.", "AGM и ПВХ предназначены для разных конструкций свинцово-кислотных батарей и не заменяются только по названию."], agmSeparatorManufacturingQualityDelivery: ["Производство, качество и поставка AGM-сепараторов", "Как управляемый процесс превращает спецификацию в стабильный продукт и прослеживаемую поставку.", "Доверие B2B создают реальное производство, стабильный контроль и понятные данные о поставке."], agmSeparatorPerformanceConsistency: ["Почему важна стабильность AGM-сепаратора", "Смачивание, сжатие и разброс партий влияют на сборку и работу VRLA.", "Материалы одинаковой номинальной толщины ведут себя по-разному при изменении структуры, поглощения или сжатия."], agmSeparatorExportSupplyReadiness: ["Готовность поставок AGM для экспортных проектов", "Проверка коммуникации, стабильности партий и поставки при изменении темпа заказов.", "Торговая статистика — ориентир, а не прогноз; важнее сохранить качество при росте объёма."], upsVrlaTechnologySelection: ["Почему многие проекты UPS продолжают использовать VRLA", "Зрелость, совместимость, эксплуатация и снабжение определяют практический выбор.", "Смена технологии резерва затрагивает зарядные устройства, пространство, обслуживание и риски перехода, а не только батарею."]
    },
    concepts: {
      definition: ["Определение", "AGM — пористый стекловолоконный сепаратор", "В VRLA волокнистая сеть удерживает электролит и исключает прямой контакт пластин."], function: ["Функция", "Разделяет пластины и распределяет электролит", "Изоляция, удержание кислоты и перенос ионов должны работать под сжатием."], selection: ["Выбор", "Одной толщины недостаточно", "Ширина, масса, поглощение, сопротивление, пористость и прочность должны соответствовать конструкции."], dimensions: ["Размеры", "Оценивайте толщину вместе с массой", "Согласуйте давление измерения и допуски для сравнения образцов и партий."], acid: ["Электролит", "Проверьте поглощение и капиллярность", "Объём и скорость смачивания должны соответствовать заливке и пластинам."], resistance: ["Характеристики", "Нужен баланс сопротивления, пористости и прочности", "Проверьте электрическую функцию и стойкость при намотке, резке и сборке."], testing: ["Испытания", "Сравнивайте в одинаковых условиях", "Разные методы, давление, кислота и подготовка не дают сопоставимых чисел."], application: ["Применение", "Сначала определите тип батареи и режим", "UPS, мотоциклы, автомобили и накопители предъявляют разные требования."], format: ["Форма", "Выберите рулон или лист под линию", "Ширина, диаметр, втулка, размер листа и упаковка влияют на процесс."], specification: ["Спецификация", "Согласуйте размеры и функцию как единый набор", "Фиксируйте толщину, массу, поглощение, сопротивление и прочность."], verification: ["Проверка", "Снижайте риск образцами и данными партий", "До серии определите сборочную проверку, эталон и управление изменениями."], agm: ["Структура AGM", "Стекловолокно удерживает кислоту", "Для VRLA-AGM важны поглощение и контакт под сжатием."], pvc: ["Структура ПВХ", "Микропористый ПВХ использует другую схему зазора", "Рёбра, жёсткость и стойкость к проколу рассчитаны на другую конструкцию."], assembly: ["Сборка", "Механические приоритеты материалов различаются", "AGM — поглощение и сжатие; ПВХ — зазор, рёбра и жёсткость."], replacement: ["Граница замены", "Не заменяйте напрямую", "Смена материала меняет кислоту, зазор, сжатие, сопротивление и процесс; нужны перерасчёт и испытания."], factory: ["Производство", "Возможности подтверждает реальный процесс", "Сырьё, формование, сушка, намотка/резка и упаковка должны контролироваться."], quality: ["Качество", "Свяжите контроль со спецификацией", "Для размеров и функций нужны ясные методы и критерии приёмки."], batch: ["Партия", "Управление партиями важнее одного результата", "Связь эталона, производственных данных и изменений снижает разброс."], delivery: ["Поставка", "Упаковка и идентификация — часть продукта", "Маркировка, защита от влаги, палеты и график должны соответствовать приёмке."], wetting: ["Смачивание", "Стабильное распределение кислоты поддерживает ионный перенос", "Изменения структуры и поглощения влияют на время и начальное состояние."], compression: ["Сжатие", "Сохранение сжатия влияет на контакт пластин", "Нужно сохранять зазор и контакт без ухудшения сборки."], forecast: ["Планирование", "Рост объёма выявляет узкие места", "Проверьте сырьё, испытания и упаковку до ускорения заказов."], logistics: ["Логистика", "Согласуйте график и упаковку с перевозкой", "Проверьте влагозащиту, края, палеты, маркировку и документы."], system: ["Действующая система", "Проверенные VRLA-системы сохраняют практическую ценность", "Учитывайте зарядные устройства, шкафы, обслуживание и запасные части."], technology: ["Выбор технологии", "Нет одной технологии для всех проектов", "Оценивайте плотность, стоимость цикла, эксплуатацию, безопасность и снабжение."], agmRole: ["Роль AGM", "В VRLA-AGM сепаратор является функциональным элементом", "Он удерживает кислоту, поддерживает ионы, контакт и стабильность сборки."], procurement: ["Закупка", "Спецификация и стабильность важнее названия", "Проверьте размеры, поглощение, сопротивление, форму и повторяемость партий."]
    },
    comparison: { eyebrow: "Сравнение материалов", title: "AGM и ПВХ предназначены для разных конструкций", columns: ["Параметр", "Стекловолоконный AGM", "Микропористый ПВХ"], rows: [["Типичная система", "VRLA-AGM", "Свинцово-кислотная с микропористым сепаратором"], ["Электролит", "Удерживается волокном", "Более свободен около рёбер"], ["Сборка", "Поглощение и сжатие", "Зазор, жёсткость и рёбра"], ["Замена", "Только после перерасчёта и испытаний", "Только после перерасчёта и испытаний"]] },
    references: { eyebrow: "Справочные материалы", title: "Источники о конструкции сепараторов", text: "Окончательные требования определяются конструкцией проекта и согласованным методом испытаний.", items: [["Battery Council International", "https://batterycouncil.org/"], ["Journal of Power Sources", "https://www.sciencedirect.com/journal/journal-of-power-sources"]] }
  })
});

Object.assign(secondaryResourceData, {
  ja: makeTemplatedLocale({
    meta: { html: "ja", hreflang: "ja-JP", og: "ja_JP", site: "Viking AGM Japan" },
    nav: { company: "会社", products: "製品", quality: "品質", resources: "資料", applications: "用途", contact: "お問い合わせ" },
    ui: { sample: "サンプル依頼", contents: "記事目次", next: "購買の次のステップ", sampleTitle: "サンプル・仕様確認を依頼", sampleText: "電池用途、ロール／シート形状、既存寸法を共有いただくと技術確認を開始できます。", reference: "技術資料", pdfTitle: "Viking AGM 技術能力 PDF（EN/ZH）", pdfText: "製品形状、品質検査、梱包、仕様確認をまとめた英語・中国語資料です。", company: "会社", product: "製品", resource: "資料", contact: "お問い合わせ", rights: "無断転載を禁じます。", article: "技術記事", read: "記事を読む", download: "ダウンロード", source: "データ出典と注記" },
    hub: { eyebrow: "AGMセパレーター資料センター", title: "AGMセパレーターの購買・技術担当者向け実務資料", subtitle: "仕様作成、サンプル評価、サプライヤー協議に役立つ技術特性、製造、品質、用途情報をまとめています。", count: "技術記事 8件", actionEyebrow: "購買相談を始める", actionTitle: "情報収集から仕様照合へ", actionText: "現在の要求事項を共有するか、お問い合わせ前に EN/ZH 技術能力資料をご確認ください。", libraryEyebrow: "資料ライブラリー", libraryTitle: "購買テーマ別に見る", closingEyebrow: "次のステップ", closingTitle: "AGMセパレーターの仕様照合が必要ですか？", closingText: "電池用途、ロール／シート形状、既存寸法をお送りいただければ技術相談を進められます。", productLink: "AGMセパレーター製品を見る", footer: "鉛蓄電池プロジェクト向けAGMガラス繊維セパレーターの製造、品質確認、供給調整。" },
    categories: { buyerGuides: ["購買ガイド", "AGMセパレーターの基礎、技術特性、仕様選定。"], manufacturingQuality: ["製造・品質", "生産、検査、ロット一貫性、納入調整。"], industryApplications: ["業界・用途", "電池プロジェクトにおける供給と用途判断。"] },
    actions: { sample: ["サンプル・仕様確認を依頼", "電池用途、寸法、ロールまたはシートの要求を共有してください。"], capabilityPdf: ["技術能力 PDF（EN/ZH）", "製品形状、品質検査、梱包をまとめた英語・中国語資料です。"] },
    common: { guide: "AGMセパレーター技術ガイド", secondary: "購買チェックリストを見る", formatsEyebrow: "供給形状", formatsTitle: "生産工程に合わせてロールまたはシートを選択", roll: ["AGMセパレーターロール", "連続生産、スリット、組立前の社内裁断に適しています。"], sheet: ["AGMセパレーターシート", "裁断済み寸法で供給し、組立準備を簡素化する場合に適しています。"], checklistEyebrow: "購買確認", checklistTitle: "サンプル前に要求事項を確認", checklistText: "情報を明確にすると、サンプル評価と仕様協議が効率化します。", relatedEyebrow: "関連資料", relatedTitle: "製品・サプライヤー評価を続ける", inquiryEyebrow: "仕様相談", inquiryTitle: "用途と寸法要求をお送りください", inquiryText: "現在お持ちの情報から製品形状、サンプル、供給可否を確認します。", inquiryChecklist: ["電池用途と形式", "厚さ、幅またはシート寸法", "ロール／シートと梱包要求"], placeholder: "用途、目標仕様、サンプル数量、梱包要求をご記入ください。", footer: "VRLA電池メーカー向けロール・シート形状のAGMガラス繊維セパレーター。", wechat: "Viking AGM WeChat公式アカウント", mobile: "モバイルでViking AGMサイトを表示" },
    topicMeta: {
      whatIsAgmSeparator: ["AGMセパレーターとは？", "VRLA鉛蓄電池に使用される吸収性ガラス繊維セパレーターの実務解説。", "AGMはAbsorbent Glass Matの略です。多孔質ガラス繊維マットが正負極を隔離し、電解液を保持します。"],
      keyTechnicalParameters: ["AGMセパレーターの主要技術特性", "厚さ、坪量、吸酸、電気抵抗、空孔率、強度を総合的に読む方法。", "単一数値だけでは適合性を判断できません。極板設計、液量、圧縮条件と合わせて確認します。"],
      howToChooseAgmSeparator: ["AGMセパレーターの選び方", "製品名から検証可能な用途要求へ整理する購買チェックリスト。", "選定は価格表ではなく電池用途と組立工程から始まり、実機条件でのサンプル検証が必要です。"],
      agmGlassFiberVsPvcSeparator: ["AGMガラス繊維とPVC電池セパレーターの違い", "材料構造、電解液状態、組立上の役割、置換限界を比較します。", "AGMとPVCは異なる鉛蓄電池構造に使われるため、単に『セパレーター』として直接置換すべきではありません。"],
      agmSeparatorManufacturingQualityDelivery: ["AGMセパレーターの製造・品質管理・納入", "明確な工程が仕様を安定製品と追跡可能な納入へつなげる仕組み。", "B2Bの信頼は一回の良好なサンプルではなく、実生産、一貫した検査、明確な納入情報で形成されます。"],
      agmSeparatorPerformanceConsistency: ["AGMセパレーターの一貫性が重要な理由", "濡れ、圧縮接触、ロット変動がVRLAの組立と性能に与える影響。", "公称厚さが同じでも、構造、吸酸、圧縮挙動が不安定なら組立性と電池結果は変わります。"],
      agmSeparatorExportSupplyReadiness: ["輸出プロジェクト向けAGMセパレーター供給準備", "受注速度の変化に備え、仕様伝達、ロット一貫性、納入能力を確認します。", "貿易データは参考情報であり予測ではありません。増産時にも品質を維持できる供給体制かを確認します。"],
      upsVrlaTechnologySelection: ["多くのUPSプロジェクトが今もVRLAを採用する理由", "システム成熟度、互換性、運用、供給体制が現実の技術選択を左右します。", "新技術の評価は重要ですが、UPSの蓄電方式変更は電池交換だけではなく、充電器、空間、保守、移行リスクを伴います。"]
    },
    concepts: {
      definition: ["定義", "AGMは多孔質ガラス繊維セパレーターです", "VRLA構造で繊維網が電解液を保持し、極板同士の直接接触を防ぎます。"], function: ["機能", "極板隔離と電解液分布を支えます", "絶縁、保液、イオン移動が極板群の圧縮条件で機能する必要があります。"], selection: ["選定", "厚さだけでは判断できません", "幅、坪量、吸酸、抵抗、空孔率、強度を電池設計に合わせます。"], dimensions: ["寸法", "厚さと坪量を併せて確認します", "測定圧と公差を統一してサンプルとロットを比較します。"], acid: ["電解液", "吸酸量と毛細管挙動を確認します", "吸収量と濡れ速度は注液工程と極板構造に適合させます。"], resistance: ["性能", "抵抗、空孔率、強度の均衡が必要です", "電気性能と巻取り、裁断、組立時の耐久性を同時に確認します。"], testing: ["試験", "同一条件で数値を比較します", "試験法、圧力、酸条件、試料調製が異なる結果は直接比較できません。"], application: ["用途", "電池用途と運転目標を先に定義します", "UPS、二輪、車載、蓄電では設計と生産要求が異なります。"], format: ["形状", "ラインに合うロールまたはシートを選びます", "ロール幅、径、紙管、シート寸法、梱包が作業性と歩留まりに影響します。"], specification: ["仕様", "寸法と機能特性を一式で確認します", "厚さ、坪量、吸酸、抵抗、強度を同時に合意します。"], verification: ["検証", "サンプルとロットデータでリスクを下げます", "量産前に組立評価、承認見本、変更管理を定めます。"], agm: ["AGM構造", "ガラス繊維網が酸を保持します", "VRLA-AGMでは吸収性と圧縮接触が中心です。"], pvc: ["PVC構造", "微多孔PVCは別の間隔設計を使います", "リブ、剛性、耐突刺し性が異なる機械・電解液条件に対応します。"], assembly: ["組立", "両材料の機械的重点は異なります", "AGMは吸収と圧縮、PVCは間隔、リブ、剛性が中心です。"], replacement: ["置換限界", "直接置換は避けます", "材料変更は液量、間隔、圧縮、抵抗、工程を変えるため再設計と試験が必要です。"], factory: ["工場", "能力は実工程で示されます", "原料準備、成形、乾燥、巻取り／裁断、梱包を管理された流れにします。"], quality: ["品質", "検査を合意仕様に結び付けます", "寸法・機能特性には明確な試験法と合否基準が必要です。"], batch: ["ロット", "単発結果よりロット管理が重要です", "承認見本、製造データ、変更履歴をつなぎ変動を抑えます。"], delivery: ["納入", "梱包とロット情報も製品の一部です", "ラベル、防湿、パレット、日程を顧客の受入工程に合わせます。"], wetting: ["濡れ", "安定した酸分布がイオン経路を支えます", "構造と吸収の変動は濡れ時間と初期状態の差になります。"], compression: ["圧縮", "圧縮保持が極板接触に影響します", "組立性を損なわず設計間隔と接触を維持する必要があります。"], forecast: ["需要計画", "数量増加は供給ボトルネックを顕在化します", "原料、検査能力、梱包計画を受注増加前に確認します。"], logistics: ["物流", "日程と梱包を輸送体系に合わせます", "防湿、端部保護、パレット、表示、書類を事前確認します。"], system: ["既存システム", "検証済みVRLA体系には実用価値があります", "充電器、キャビネット、保守、予備品を含む全体を考慮します。"], technology: ["技術選択", "全案件に共通の最適技術はありません", "密度、ライフサイクル費用、運用能力、安全、供給信頼性を総合評価します。"], agmRole: ["AGMの役割", "VRLA-AGMでセパレーターは機能部材です", "保液、イオン移動、圧縮接触、組立一貫性を支えます。"], procurement: ["購買", "名称より仕様と一貫性が重要です", "寸法、吸収、抵抗、供給形状、複数ロットの再現性を確認します。"]
    },
    comparison: { eyebrow: "材料比較", title: "AGMとPVCは異なる電池構造向けです", columns: ["比較項目", "AGMガラス繊維", "微多孔PVC"], rows: [["代表システム", "VRLA-AGM", "微多孔セパレーターを使う鉛蓄電池"], ["電解液", "繊維網内に保持", "リブ周辺でより自由な状態"], ["組立重点", "吸収と圧縮接触", "間隔、剛性、リブ"], ["直接置換", "再設計・試験前は非推奨", "再設計・試験前は非推奨"]] },
    references: { eyebrow: "参考資料", title: "電池セパレーター構造の追加資料", text: "最終要求はプロジェクト設計と合意済み試験法に基づきます。", items: [["Battery Council International", "https://batterycouncil.org/"], ["Journal of Power Sources", "https://www.sciencedirect.com/journal/journal-of-power-sources"]] }
  }),
  es: makeTemplatedLocale({
    meta: { html: "es", hreflang: "es", og: "es_LA", site: "Viking AGM" },
    nav: { company: "Empresa", products: "Productos", quality: "Calidad", resources: "Recursos", applications: "Aplicaciones", contact: "Contacto" },
    ui: { sample: "Solicitar muestra", contents: "Contenido del artículo", next: "Siguiente paso de compra", sampleTitle: "Solicitar muestra y revisión de especificaciones", sampleText: "Comparta la aplicación, el formato en rollo o lámina y las dimensiones disponibles para iniciar la revisión técnica.", reference: "Referencia técnica", pdfTitle: "Descargar capacidad técnica Viking AGM (EN/ZH)", pdfText: "Documento en inglés y chino sobre formatos, controles de calidad, embalaje y especificaciones.", company: "Empresa", product: "Productos", resource: "Recursos", contact: "Contacto", rights: "Todos los derechos reservados.", article: "Artículo", read: "Leer artículo", download: "Descargar", source: "Fuente de datos y nota" },
    hub: { eyebrow: "Centro de recursos de separadores AGM", title: "Recursos técnicos para compradores de separadores AGM", subtitle: "Guías prácticas sobre parámetros, fabricación, calidad y aplicaciones para preparar especificaciones, muestras y conversaciones con proveedores.", count: "8 artículos técnicos", actionEyebrow: "Iniciar una conversación de compra", actionTitle: "De la investigación a la revisión de especificaciones", actionText: "Comparta la información disponible o revise el PDF técnico EN/ZH antes de contactar a nuestro equipo.", libraryEyebrow: "Biblioteca de recursos", libraryTitle: "Explorar por tema de compra", closingEyebrow: "Siguiente paso", closingTitle: "¿Necesita revisar una especificación de separador AGM?", closingText: "Envíe la aplicación, el formato en rollo o lámina y las dimensiones disponibles para continuar la conversación técnica.", productLink: "Ver productos de separador AGM", footer: "Fabricación de separadores AGM de fibra de vidrio, revisión de calidad y coordinación de suministro para proyectos de baterías de plomo-ácido." },
    categories: { buyerGuides: ["Guías de compra", "Fundamentos, parámetros técnicos y selección de especificaciones AGM."], manufacturingQuality: ["Fabricación y calidad", "Producción, inspección, consistencia de lote y coordinación de entregas."], industryApplications: ["Industria y aplicaciones", "Decisiones prácticas de suministro y aplicación para proyectos de baterías."] },
    actions: { sample: ["Solicitar muestra y revisión de especificaciones", "Comparta la aplicación, dimensiones y requisitos de rollo o lámina."], capabilityPdf: ["PDF de capacidad técnica EN/ZH", "Documento en inglés y chino sobre formatos, controles y embalaje."] },
    common: { guide: "Guía técnica de separadores AGM", secondary: "Ver lista de compra", formatsEyebrow: "Formato de suministro", formatsTitle: "Elegir rollo o lámina según el proceso", roll: ["Rollos de separador AGM", "Adecuados para producción continua, corte longitudinal o corte interno antes del montaje."], sheet: ["Láminas de separador AGM", "Adecuadas cuando se requieren dimensiones precortadas para simplificar el montaje."], checklistEyebrow: "Revisión de compra", checklistTitle: "Confirmar requisitos antes de la muestra", checklistText: "La información clara mejora la evaluación de muestras y la revisión de especificaciones.", relatedEyebrow: "Recursos relacionados", relatedTitle: "Continuar la evaluación de producto y proveedor", inquiryEyebrow: "Conversación técnica", inquiryTitle: "Envíe su aplicación y dimensiones", inquiryText: "Comparta la información disponible para revisar formato, muestras y capacidad de suministro.", inquiryChecklist: ["Aplicación y tipo de batería", "Espesor, ancho o tamaño de lámina", "Rollo/lámina y requisitos de embalaje"], placeholder: "Describa aplicación, especificaciones objetivo, cantidad de muestras o embalaje.", footer: "Separadores AGM de fibra de vidrio en rollos y láminas para fabricantes de baterías VRLA.", wechat: "Cuenta oficial de Viking AGM en WeChat", mobile: "Visitar Viking AGM desde el móvil" },
    topicMeta: {
      whatIsAgmSeparator: ["¿Qué es un separador AGM?", "Introducción práctica al separador de fibra de vidrio absorbente para baterías VRLA.", "AGM significa Absorbent Glass Mat. La red porosa separa las placas positiva y negativa y retiene el electrolito."], keyTechnicalParameters: ["Parámetros técnicos clave del separador AGM", "Cómo revisar espesor, gramaje, absorción de ácido, resistencia, porosidad y fuerza.", "Un valor aislado no define la compatibilidad; los parámetros deben relacionarse con placas, ácido y compresión."], howToChooseAgmSeparator: ["Cómo elegir un separador AGM", "Lista para convertir un nombre de producto en requisitos verificables de aplicación.", "La selección empieza por la aplicación y el proceso de montaje, y se confirma con muestras en condiciones reales."], agmGlassFiberVsPvcSeparator: ["Separadores AGM de fibra de vidrio frente a PVC", "Comparación de estructura, electrolito, montaje y límites de sustitución.", "AGM y PVC sirven a arquitecturas diferentes de baterías de plomo-ácido y no deben sustituirse por nombre."], agmSeparatorManufacturingQualityDelivery: ["Fabricación, calidad y entrega de separadores AGM", "Cómo un proceso claro convierte especificaciones en producto estable y entrega trazable.", "La confianza B2B nace de producción real, inspección consistente e información clara de entrega."], agmSeparatorPerformanceConsistency: ["Por qué importa la consistencia del separador AGM", "La humectación, la compresión y la variación por lote afectan montaje y desempeño VRLA.", "Dos materiales con el mismo espesor nominal pueden comportarse distinto si varían estructura, absorción o compresión."], agmSeparatorExportSupplyReadiness: ["Preparación de suministro AGM para proyectos de exportación", "Revisar comunicación, consistencia y entrega cuando cambia el ritmo de pedidos.", "Los datos comerciales son una referencia, no una previsión; la prioridad es mantener calidad al aumentar volumen."], upsVrlaTechnologySelection: ["Por qué muchos proyectos UPS siguen usando baterías VRLA", "Madurez, compatibilidad, operación y suministro determinan la elección real.", "Cambiar la tecnología de respaldo implica cargadores, espacio, mantenimiento y riesgo de transición, no solo otra batería."]
    },
    concepts: {
      definition: ["Definición", "AGM es un separador poroso de fibra de vidrio", "En VRLA, la red retiene electrolito y evita el contacto directo entre placas."], function: ["Función", "Separa placas y distribuye electrolito", "Aislamiento, retención de ácido y transporte iónico deben funcionar bajo compresión."], selection: ["Selección", "El espesor no es suficiente", "Ancho, gramaje, absorción, resistencia, porosidad y fuerza deben corresponder al diseño."], dimensions: ["Dimensiones", "Revisar espesor y gramaje juntos", "Unificar presión de medición y tolerancias para comparar muestras y lotes."], acid: ["Electrolito", "Confirmar absorción y capilaridad", "Cantidad y velocidad de humectación deben adaptarse al llenado y las placas."], resistance: ["Desempeño", "Equilibrar resistencia, porosidad y fuerza", "Verificar función eléctrica y manejo durante bobinado, corte y montaje."], testing: ["Ensayo", "Comparar bajo las mismas condiciones", "Método, presión, ácido y preparación distintos no producen cifras directamente comparables."], application: ["Aplicación", "Definir batería y objetivo de operación", "UPS, motocicleta, automóvil y almacenamiento tienen requisitos diferentes."], format: ["Formato", "Elegir rollo o lámina según la línea", "Ancho, diámetro, núcleo, tamaño de lámina y embalaje afectan la operación."], specification: ["Especificación", "Confirmar dimensiones y función como conjunto", "Acordar espesor, gramaje, absorción, resistencia y fuerza."], verification: ["Verificación", "Reducir riesgo con muestras y datos de lote", "Definir montaje, muestra aprobada y control de cambios antes de serie."], agm: ["Estructura AGM", "La fibra de vidrio retiene el ácido", "En VRLA-AGM son clave la absorción y el contacto comprimido."], pvc: ["Estructura PVC", "El PVC microporoso usa otro diseño de separación", "Nervaduras, rigidez y resistencia a perforación responden a otra arquitectura."], assembly: ["Montaje", "Los materiales tienen prioridades mecánicas distintas", "AGM prioriza absorción y compresión; PVC, separación, nervaduras y rigidez."], replacement: ["Límite de sustitución", "No sustituir directamente", "Cambiar material modifica ácido, separación, compresión, resistencia y proceso; exige rediseño y ensayo."], factory: ["Fábrica", "La capacidad se demuestra en el proceso", "Materia prima, formación, secado, bobinado/corte y embalaje deben estar controlados."], quality: ["Calidad", "Vincular inspección con especificación", "Dimensiones y función necesitan métodos y criterios de aceptación claros."], batch: ["Lote", "La gestión de lotes supera un resultado aislado", "Conectar muestra aprobada, datos de producción y cambios reduce variación."], delivery: ["Entrega", "Embalaje e identificación forman parte del producto", "Etiquetas, humedad, palés y calendario deben encajar con la recepción."], wetting: ["Humectación", "La distribución estable de ácido favorece el transporte iónico", "Variaciones de estructura y absorción cambian tiempos y estado inicial."], compression: ["Compresión", "Mantener compresión afecta el contacto con placas", "Debe conservar separación y contacto sin dificultar el montaje."], forecast: ["Planificación", "El mayor volumen revela cuellos de suministro", "Revisar materias primas, ensayos y embalaje antes de acelerar pedidos."], logistics: ["Logística", "Alinear calendario y embalaje con el transporte", "Confirmar humedad, protección de bordes, palé, marcado y documentos."], system: ["Sistema existente", "Los sistemas VRLA validados conservan valor", "Considerar cargadores, gabinetes, mantenimiento y repuestos como un conjunto."], technology: ["Elección tecnológica", "No existe una tecnología óptima para todos", "Evaluar densidad, coste de ciclo, operación, seguridad y suministro."], agmRole: ["Papel de AGM", "En VRLA-AGM el separador es funcional", "Retiene ácido, facilita iones, mantiene contacto y consistencia de montaje."], procurement: ["Compra", "La especificación y consistencia importan más que el nombre", "Confirmar dimensiones, absorción, resistencia, formato y repetibilidad."]
    },
    comparison: { eyebrow: "Comparación de materiales", title: "AGM y PVC corresponden a arquitecturas diferentes", columns: ["Aspecto", "Fibra de vidrio AGM", "PVC microporoso"], rows: [["Sistema típico", "VRLA-AGM", "Plomo-ácido con separador microporoso"], ["Electrolito", "Retenido en la fibra", "Más libre alrededor de nervaduras"], ["Montaje", "Absorción y compresión", "Separación, rigidez y nervaduras"], ["Sustitución", "No sin rediseño y ensayo", "No sin rediseño y ensayo"]] },
    references: { eyebrow: "Referencias", title: "Lecturas sobre separadores de baterías", text: "Los requisitos finales dependen del diseño y del método de ensayo acordado.", items: [["Battery Council International", "https://batterycouncil.org/"], ["Journal of Power Sources", "https://www.sciencedirect.com/journal/journal-of-power-sources"]] }
  })
});

const earlyLeadAcidManufacturingTopics = {
  vi: {
    title: "Những ắc quy chì-axit đầu tiên tại Trung Quốc được sản xuất như thế nào?",
    summary: "Từ lưới cực đúc thủ công và tấm ngăn gỗ đến AGM hiện đại: cách vật liệu, thiết bị và kiểm soát lô đã thay đổi hơn một thế kỷ.",
    intro: "Các mốc 1912, 1921 và 1939 xuất hiện trong những nguồn tư liệu khác nhau vì chúng mô tả các khái niệm khác nhau: sản xuất do người Trung Quốc vận hành, điểm khởi đầu của ngành và nhà máy chuyên môn hóa. Vì vậy cần xác định rõ tiêu chí trước khi nói đến ‘đầu tiên’.",
    sections: [
      ["Ba mốc lịch sử", "1912, 1921 và 1939 không nhất thiết mâu thuẫn", "Địa chí Thượng Hải ghi nhận hoạt động sản xuất ắc quy ô tô do doanh nghiệp Trung Quốc tổ chức từ năm 1912; tài liệu ngành dùng năm 1921 làm điểm khởi đầu; còn quy hoạch chính thức của Thẩm Dương gọi nhà máy thành lập năm 1939 là nhà máy ắc quy chì-axit đầu tiên. Mỗi nguồn đang dùng một phạm vi khác nhau."],
      ["Sản xuất ban đầu", "Lưới cực dày và nhiều công đoạn phụ thuộc vào tay nghề", "Lưới cực thường được đúc thủ công; trát cao, xử lý bản cực, hóa thành và lắp bộ cực chưa có thiết bị liên tục như ngày nay. Thùng có thể dùng gỗ lót, cao su cứng hoặc thủy tinh, còn tấm ngăn gồm gỗ, cao su cứng, celluloid và thủy tinh."],
      ["Kiểm soát quá trình", "Trình tự quen thuộc nhưng khả năng đo lường còn hạn chế", "Đúc lưới, trát cao, đóng rắn, hóa thành, ghép bản cực, châm điện phân và thử nghiệm đã tạo thành chuỗi sản xuất cơ bản. Tuy nhiên độ đồng đều, độ khô và mức hóa thành còn phụ thuộc nhiều vào kinh nghiệm của người vận hành."],
      ["Công nghiệp hóa", "Sản xuất chuyên môn hóa chuyển mục tiêu sang khả năng lặp lại", "Khi thiết bị và phương pháp thử được chuẩn hóa hơn, nhà máy không chỉ cần làm ra một bình dùng được mà phải duy trì kích thước, lắp ráp, hiệu suất và lịch giao giữa nhiều lô."],
      ["Tiến hóa tấm ngăn", "Từ gỗ đến vật liệu vi xốp và sợi thủy tinh AGM", "Sau tấm ngăn gỗ, ngành sử dụng cao su vi xốp, PVC thiêu kết, PE và PP để kiểm soát tốt hơn độ bền axit, cơ tính và lỗ rỗng. Từ cuối thập niên 1960, giấy sợi thủy tinh siêu mịn trở thành nền tảng của hệ VRLA-AGM."],
      ["Sản xuất hiện đại", "Tốc độ dây chuyền càng cao, sai khác vật liệu càng dễ lộ rõ", "Trong sản xuất hiện đại, độ dày, định lượng, hút chất lỏng, nén, khổ cuộn và kích thước tấm phải được kiểm soát theo lô. Hình ảnh trên trang là tư liệu sản xuất AGM hiện đại của Viking, không phải ảnh lịch sử."]
    ],
    parameters: [["1912", "Sản xuất ắc quy ô tô do doanh nghiệp Trung Quốc tại Thượng Hải theo địa chí."], ["1921", "Mốc khởi đầu ngành được một tài liệu ngành sử dụng."], ["1939", "Mốc nhà máy chuyên môn hóa theo tài liệu chính thức của Thẩm Dương."], ["1967–1971", "Phát triển pin VRLA dùng giấy sợi thủy tinh siêu mịn và đưa sản phẩm ra thị trường."], ["Hiện nay", "Sản xuất cơ giới hóa, kiểm tra và quản lý nhất quán theo lô."]],
    checklist: ["Ứng dụng ắc quy VRLA", "Độ dày và trạng thái nén mục tiêu", "Khổ cuộn hoặc kích thước tấm", "Phương pháp thử và dung sai", "Giai đoạn mẫu hoặc sản xuất hàng loạt"]
  },
  ko: {
    title: "중국의 초기 납축전지는 어떻게 만들어졌을까요?",
    summary: "수작업 주조 그리드와 목재 분리막에서 현대 AGM까지, 한 세기 넘는 소재·설비·로트 관리의 변화를 살펴봅니다.",
    intro: "1912년, 1921년, 1939년이라는 연도는 서로 다른 ‘최초’의 정의에서 나옵니다. 중국계 생산의 시작, 산업의 출발점, 전문 공장 생산을 구분해야 초기 역사를 정확히 이해할 수 있습니다.",
    sections: [
      ["세 가지 연도", "1912·1921·1939는 반드시 모순되는 기록이 아닙니다", "상하이 지방지는 1912년 중국계 자동차용 축전지 생산을 기록하고, 산업 자료는 1921년을 산업의 시작으로 보며, 선양의 공식 계획은 1939년 설립 공장을 최초의 납축전지 공장으로 설명합니다. 각 자료의 범위가 다릅니다."],
      ["초기 제조", "두꺼운 수작업 그리드와 숙련자 중심의 공정", "그리드는 손으로 주조되는 경우가 많았고 도포, 극판 처리, 화성, 극군 조립은 오늘날의 연속 설비와 거리가 있었습니다. 용기는 라이닝 목재, 경질 고무, 유리를 사용했고 분리막은 목재, 경질 고무, 셀룰로이드, 유리 등이었습니다."],
      ["공정 관리", "기본 순서는 익숙했지만 측정과 제어는 제한적이었습니다", "그리드, 활물질, 숙성, 화성, 극판 조립, 전해액 주입, 시험이라는 기본 흐름은 존재했습니다. 다만 균일도, 건조와 화성 완성도는 작업자의 경험에 크게 의존했습니다."],
      ["산업화", "전문 공장 생산은 반복 가능성을 목표로 바꾸었습니다", "설비와 시험법이 표준화되면서 한 개의 사용 가능한 전지를 만드는 것만으로는 부족해졌습니다. 여러 로트에서 치수, 조립성, 성능과 납기를 반복해야 했습니다."],
      ["분리막 변화", "목재에서 미세다공 소재와 AGM 유리섬유로", "목재 이후 미세다공 고무, 소결 PVC, PE와 PP가 내산성, 강도와 기공 구조 제어를 개선했습니다. 1960년대 후반부터 초미세 유리섬유 종이가 VRLA-AGM 구조의 기반이 되었습니다."],
      ["현대 생산", "라인이 빨라질수록 소재 편차는 더 잘 드러납니다", "현대 생산에서는 두께, 평량, 흡액, 압축, 롤 폭과 시트 치수를 로트별로 관리해야 합니다. 페이지의 사진은 Viking의 현대 AGM 생산 자료이며 역사 사진이 아닙니다."]
    ],
    parameters: [["1912", "지방지에 기록된 상하이 중국계 자동차용 축전지 생산."], ["1921", "산업 자료가 제시하는 중국 납축전지 산업의 출발점."], ["1939", "선양 공식 자료의 전문 납축전지 공장 이정표."], ["1967–1971", "초미세 유리섬유 기반 VRLA 개발과 시장 출시."], ["현재", "기계화 생산, 검사 및 로트 일관성 관리."]],
    checklist: ["VRLA 배터리 용도", "목표 두께와 압축 상태", "롤 폭 또는 시트 치수", "시험법과 공차", "샘플 또는 양산 단계"]
  },
  ja: {
    title: "中国初期の鉛蓄電池はどのように製造されたのか",
    summary: "手鋳造グリッドと木製セパレーターから現代のAGMまで、100年以上にわたる材料・設備・ロット管理の変化をたどります。",
    intro: "1912年、1921年、1939年という記録は、華資による生産、産業の起点、専門工場という異なる基準を示しています。『最初』を論じる前に定義を分ける必要があります。",
    sections: [
      ["三つの年代", "1912年・1921年・1939年は必ずしも矛盾しません", "上海の地方誌は1912年の華資による自動車用蓄電池生産を記録し、業界資料は1921年を産業の起点とし、瀋陽の公式計画は1939年設立の工場を最初の鉛蓄電池工場としています。それぞれ対象範囲が異なります。"],
      ["初期製造", "厚い手鋳造グリッドと技能依存の工程", "グリッドは手作業で鋳造され、ペースト充填、極板処理、化成、群組立は現在の連続設備とは大きく異なりました。槽には内張り木材、硬質ゴム、ガラス、セパレーターには木材、硬質ゴム、セルロイド、ガラスなどが使われました。"],
      ["工程管理", "基本工程は似ていても測定と制御は限定的でした", "グリッド、活物質、熟成、化成、極板群、注液、試験という流れはありましたが、均一性、乾燥、化成状態は作業者の経験に大きく左右されました。"],
      ["工業化", "専門工場は目標を再現性へ変えました", "設備と試験が標準化されると、一個の使用可能な電池を作るだけでは不十分になり、複数ロットで寸法、組立性、性能、納期を再現する必要が生まれました。"],
      ["セパレーターの進化", "木材から微多孔材料、AGMガラス繊維へ", "木材の後、微多孔ゴム、焼結PVC、PE、PPが耐酸性、強度、空孔制御を改善しました。1960年代後半には極細ガラス繊維紙がVRLA-AGMの基盤となりました。"],
      ["現代製造", "高速ラインほど材料差が顕在化します", "現代では厚さ、坪量、吸液、圧縮、ロール幅、シート寸法をロット単位で管理します。掲載写真はVikingの現代AGM生産資料であり、歴史写真ではありません。"]
    ],
    parameters: [["1912", "地方誌が記録する上海での華資自動車用蓄電池生産。"], ["1921", "業界資料が採用する中国鉛蓄電池産業の起点。"], ["1939", "瀋陽公式資料における専門工場の節目。"], ["1967–1971", "極細ガラス繊維VRLAの開発と市場投入。"], ["現在", "機械化生産、検査、ロット一貫性管理。"]],
    checklist: ["VRLA電池用途", "目標厚さと圧縮状態", "ロール幅またはシート寸法", "試験法と公差", "サンプルまたは量産段階"]
  },
  es: {
    title: "Cómo se fabricaron las primeras baterías de plomo-ácido en China",
    summary: "De rejillas coladas a mano y separadores de madera al AGM moderno: más de un siglo de cambios en materiales, equipos y control de lotes.",
    intro: "Los años 1912, 1921 y 1939 responden a definiciones distintas: producción de capital chino, inicio de una industria y fabricación especializada en fábrica. Hay que definir ‘primera’ antes de comparar las fechas.",
    sections: [
      ["Tres fechas", "1912, 1921 y 1939 no son necesariamente contradictorios", "La gaceta de Shanghái registra producción china de baterías automotrices en 1912; una fuente sectorial usa 1921 como inicio de la industria; y un plan oficial de Shenyang describe la fábrica fundada en 1939 como la primera fábrica de baterías de plomo-ácido. El alcance de cada fuente es diferente."],
      ["Fabricación inicial", "Rejillas gruesas coladas a mano y procesos dependientes del oficio", "Las rejillas solían colarse manualmente. El empastado, tratamiento, formación y montaje estaban lejos de las líneas continuas actuales. Se usaban recipientes de madera revestida, caucho duro o vidrio, y separadores de madera, caucho duro, celuloide o vidrio."],
      ["Control del proceso", "La secuencia era reconocible, pero la medición era limitada", "Rejilla, material activo, curado, formación, agrupado, llenado y prueba ya formaban una secuencia básica. La uniformidad, el secado y la formación dependían en gran medida de la experiencia del operario."],
      ["Industrialización", "La fábrica especializada cambió el objetivo hacia la repetibilidad", "Con equipos y ensayos más normalizados ya no bastaba producir una batería utilizable. Dimensiones, montaje, desempeño y entrega debían repetirse entre lotes."],
      ["Evolución del separador", "De la madera a materiales microporosos y fibra de vidrio AGM", "Después de la madera se adoptaron caucho microporoso, PVC sinterizado, PE y PP para controlar mejor resistencia al ácido, fuerza y poros. Desde finales de los años sesenta, el papel de microfibra de vidrio sustentó la arquitectura VRLA-AGM."],
      ["Producción moderna", "Una línea más rápida hace más visible la variación", "Espesor, gramaje, absorción, compresión, ancho de rollo y dimensiones de lámina se controlan por lote. Las imágenes de la página muestran producción AGM moderna de Viking; no son fotografías históricas."]
    ],
    parameters: [["1912", "Producción china de baterías automotrices registrada en una gaceta local."], ["1921", "Inicio sectorial empleado por una fuente de la industria."], ["1939", "Hito de fábrica especializada en una fuente oficial de Shenyang."], ["1967–1971", "Desarrollo y lanzamiento de VRLA con microfibra de vidrio."], ["Actualidad", "Producción mecanizada, inspección y consistencia por lotes."]],
    checklist: ["Aplicación de la batería VRLA", "Espesor y compresión objetivo", "Ancho de rollo o tamaño de lámina", "Método de ensayo y tolerancias", "Etapa de muestra o producción"]
  },
  pt: {
    title: "Como foram fabricadas as primeiras baterias chumbo-ácido da China",
    summary: "De grades fundidas à mão e separadores de madeira ao AGM moderno: mais de um século de mudanças em materiais, equipamentos e controle de lotes.",
    intro: "Os anos 1912, 1921 e 1939 representam critérios diferentes: produção de capital chinês, início da indústria e fabricação especializada. É preciso definir ‘primeira’ antes de comparar as datas.",
    sections: [
      ["Três datas", "1912, 1921 e 1939 não são necessariamente registros conflitantes", "A crônica de Xangai registra produção chinesa de baterias automotivas em 1912; uma fonte setorial usa 1921 como início da indústria; e um plano oficial de Shenyang chama a fábrica fundada em 1939 de primeira fábrica de baterias chumbo-ácido. Cada fonte usa um escopo diferente."],
      ["Fabricação inicial", "Grades grossas fundidas à mão e processos dependentes da experiência", "As grades eram frequentemente fundidas manualmente. Empastamento, tratamento, formação e montagem ainda estavam longe das linhas contínuas atuais. Recipientes podiam usar madeira revestida, borracha dura ou vidro; separadores incluíam madeira, borracha dura, celuloide e vidro."],
      ["Controle de processo", "A sequência era familiar, mas a medição era limitada", "Grade, material ativo, cura, formação, agrupamento, enchimento e teste formavam a lógica básica. Uniformidade, secagem e formação dependiam muito da experiência do operador."],
      ["Industrialização", "A fábrica especializada mudou o objetivo para repetibilidade", "Com equipamentos e ensaios mais padronizados, produzir uma bateria utilizável deixou de ser suficiente. Dimensões, montagem, desempenho e entrega precisavam se repetir entre lotes."],
      ["Evolução do separador", "Da madeira a materiais microporosos e fibra de vidro AGM", "Depois da madeira vieram borracha microporosa, PVC sinterizado, PE e PP, com melhor controle de resistência ao ácido, força e poros. No fim dos anos 1960, o papel de microfibra de vidro passou a sustentar a arquitetura VRLA-AGM."],
      ["Produção moderna", "Linhas mais rápidas tornam a variação mais visível", "Espessura, gramatura, absorção, compressão, largura do rolo e dimensões das folhas são controladas por lote. As imagens mostram a produção AGM moderna da Viking e não são fotografias históricas."]
    ],
    parameters: [["1912", "Produção chinesa de baterias automotivas registrada em crônica local."], ["1921", "Marco inicial usado por uma fonte setorial."], ["1939", "Marco de fábrica especializada em fonte oficial de Shenyang."], ["1967–1971", "Desenvolvimento e lançamento do VRLA com microfibra de vidro."], ["Hoje", "Produção mecanizada, inspeção e consistência entre lotes."]],
    checklist: ["Aplicação da bateria VRLA", "Espessura e compressão alvo", "Largura do rolo ou tamanho da folha", "Método de teste e tolerâncias", "Etapa de amostra ou produção"]
  },
  ru: {
    title: "Как производились первые свинцово-кислотные аккумуляторы в Китае",
    summary: "От ручного литья решёток и деревянных сепараторов до современного AGM: более века изменений материалов, оборудования и контроля партий.",
    intro: "Даты 1912, 1921 и 1939 относятся к разным определениям: китайское производство, начало отрасли и специализированный завод. Перед сравнением дат необходимо определить, что считается ‘первым’.",
    sections: [
      ["Три даты", "1912, 1921 и 1939 годы не обязательно противоречат друг другу", "Шанхайская хроника фиксирует китайское производство автомобильных аккумуляторов в 1912 году; отраслевой источник считает 1921 год началом отрасли; официальный план Шэньяна называет предприятие 1939 года первым заводом свинцово-кислотных аккумуляторов. Источники используют разные рамки."],
      ["Раннее производство", "Толстые литые вручную решётки и зависимость от мастерства", "Решётки часто отливали вручную, а намазка, обработка пластин, формирование и сборка ещё не выполнялись на непрерывных линиях. Корпуса делали из футерованного дерева, твёрдой резины или стекла, сепараторы — из дерева, твёрдой резины, целлулоида и стекла."],
      ["Управление процессом", "Последовательность была знакомой, но измерения оставались ограниченными", "Решётка, активная масса, сушка, формирование, сборка блока, заливка электролита и испытание уже составляли базовый процесс. Однородность и полнота операций во многом зависели от опыта рабочих."],
      ["Индустриализация", "Специализированный завод перенёс цель на повторяемость", "По мере стандартизации оборудования и испытаний стало недостаточно изготовить один работоспособный аккумулятор. Размеры, сборка, характеристики и поставка должны были повторяться от партии к партии."],
      ["Эволюция сепаратора", "От дерева к микропористым материалам и стекловолокну AGM", "После дерева применялись микропористая резина, спечённый ПВХ, ПЭ и ПП с более управляемой кислотостойкостью, прочностью и порами. В конце 1960-х микростекловолоконная бумага стала основой VRLA-AGM."],
      ["Современное производство", "Высокая скорость линии быстрее выявляет разброс материала", "Толщина, поверхностная плотность, впитывание, сжатие, ширина рулона и размеры листа контролируются по партиям. Изображения показывают современное производство AGM компании Viking и не являются историческими фотографиями."]
    ],
    parameters: [["1912", "Китайское производство автомобильных аккумуляторов по местной хронике."], ["1921", "Отраслевая дата начала производства по отраслевому источнику."], ["1939", "Веха специализированного завода по официальному документу Шэньяна."], ["1967–1971", "Разработка и вывод на рынок VRLA с микростекловолокном."], ["Сегодня", "Механизированное производство, контроль и стабильность партий."]],
    checklist: ["Применение батареи VRLA", "Целевая толщина и сжатие", "Ширина рулона или размер листа", "Метод испытаний и допуски", "Этап образца или серийного производства"]
  }
};

const pressureRetentionTopics = {
  vi: {
    title: "Tấm ngăn AGM còn giữ áp lực sau châm axit và chu kỳ không?",
    summary: "Độ dày ban đầu chỉ là điểm xuất phát; co ngót khi ướt, khả năng hồi phục và lực còn lại mới gần với trạng thái làm việc lâu dài trong ắc quy.",
    intro: "Mẫu AGM thường được đánh giá khi còn khô và vừa lắp xong, nhưng sau châm axit và chu kỳ, mạng sợi thủy tinh tiếp tục thay đổi. Vì vậy cần theo dõi cùng một mẫu qua nhiều giai đoạn thay vì chỉ so một giá trị độ dày.",
    sections: [
      ["Độ dày khô", "Độ dày phải luôn đi kèm áp lực đo", "AGM là vật liệu nén được. Hai mẫu có thể gần nhau tại một điểm áp lực nhưng có đường cong nén và hồi phục khác nhau. Tài liệu H&V dùng các điều kiện 1,25 mm/50 kPa và độ dày tại 10 kPa để minh họa cách so sánh; đây không phải thông số chung cho mọi thiết kế."],
      ["Sau châm axit", "Làm ướt là ranh giới đầu tiên của thay đổi lực", "Điện phân làm thay đổi tương tác giữa các sợi và có thể gây co ngót. Cần cố định mật độ, nhiệt độ, lượng axit, thời gian nghỉ và nêu rõ phép đo ở áp lực cố định hay khe hở cố định."],
      ["Sau chu kỳ", "Lực còn lại phản ánh trạng thái lâu dài tốt hơn", "So sánh proxy của vật liệu sau chu kỳ giúp sàng lọc khả năng cơ học nhưng không thay thế thử nghiệm ắc quy. Tuổi thọ còn phụ thuộc bản cực, lưới, lượng axit, nhiệt độ, chế độ sạc và kết cấu lắp ráp."],
      ["Hồ sơ có thể lặp lại", "Kết nối bốn giai đoạn trong cùng một phương pháp", "Ghi nhận đầu vào, lắp ráp, châm axit và chu kỳ với điều kiện truy xuất được, rồi liên hệ độ giữ lực với dung lượng, nội trở và quan sát tháo rời của ắc quy."],
      ["Phối hợp thông số", "Viking thống nhất ranh giới thử trước khi so số liệu", "Hãy cung cấp ứng dụng, kết cấu bộ cực, khe hở, độ dày mục tiêu, áp lực đo và phương pháp châm axit hoặc chu kỳ. Việc dùng cho sản xuất hàng loạt vẫn cần khách hàng xác nhận bằng thử vật liệu và ắc quy hoàn chỉnh."]
    ],
    parameters: [["Đầu vào", "Lô, định lượng, độ dày khô và áp lực đo."], ["Lắp ráp", "Bản cực, số lớp, khe hở và mức nén mục tiêu."], ["Châm axit", "Mật độ, nhiệt độ, lượng axit, thời gian nghỉ và phương pháp đo."], ["Chu kỳ", "Trạng thái khô/ướt, giới hạn nén, số chu kỳ, tần số và nhiệt độ."]],
    checklist: ["Áp lực đo độ dày", "Kết cấu bộ cực và khe hở", "Điều kiện điện phân", "Áp lực cố định hoặc khe hở cố định", "Chu kỳ và kết quả ắc quy"]
  },
  ko: {
    title: "AGM 분리막은 주액과 사이클 후에도 압력을 유지할까요?",
    summary: "초기 두께는 시작점입니다. 습윤 수축, 회복과 잔류 압력이 배터리 내부의 장기 상태에 더 가깝습니다.",
    intro: "AGM 샘플 평가는 건식 두께와 초기 조립에서 끝나기 쉽지만, 전해액 주입과 반복 사이클 후 유리섬유 매트의 상태는 달라집니다. 동일한 샘플을 단계별로 비교해야 합니다.",
    sections: [
      ["건식 두께", "두께 값에는 측정 압력이 필요합니다", "AGM은 압축성 소재입니다. 한 압력점에서 두께가 같아도 압축 곡선과 회복은 다를 수 있습니다. H&V의 1.25 mm/50 kPa 비교 조건과 10 kPa 두께 표시는 방법 예시이며 보편 설계값이 아닙니다."],
      ["주액 후", "습윤은 압력 변화의 첫 경계입니다", "전해액은 섬유 사이 상호작용을 바꾸고 수축을 일으킬 수 있습니다. 산 밀도, 온도, 주입량, 안정 시간을 고정하고 일정 압력 또는 일정 간극 중 어떤 방법인지 밝혀야 합니다."],
      ["사이클 후", "잔류 압력이 장기 작동 상태에 더 가깝습니다", "소재의 proxy 사이클 압축 비교는 기계적 유지력을 선별하지만 완성 배터리 시험을 대신하지 않습니다. 수명은 극판, 그리드, 산량, 온도, 충전과 조립 설계에도 좌우됩니다."],
      ["재현 가능한 기록", "네 단계를 하나의 시험 체계로 연결합니다", "입고, 조립, 주액, 사이클 조건을 추적 가능하게 기록하고 유지 상태를 배터리 용량, 내부저항과 해체 관찰에 연결합니다."],
      ["사양 협의", "Viking은 수치를 비교하기 전에 시험 경계를 맞춥니다", "배터리 용도, 극군 구조, 설계 간극, 목표 두께, 측정 압력과 주액·사이클 방법을 공유해 주세요. 양산 적합성은 고객의 소재 및 완성 배터리 검증이 필요합니다."]
    ],
    parameters: [["입고", "로트, 평량, 건식 두께와 측정 압력."], ["조립", "극판 두께, 분리막 층수, 간극과 목표 압축."], ["주액", "산 밀도, 온도, 주입량, 안정 시간과 측정 방식."], ["사이클", "건·습 상태, 압축 범위, 횟수, 주파수와 온도."]],
    checklist: ["두께 측정 압력", "극군과 설계 간극", "전해액 조건", "일정 압력 또는 일정 간극", "사이클 및 배터리 결과"]
  },
  ja: {
    title: "AGMセパレーターは注液・サイクル後も圧力を保持できるか",
    summary: "初期厚さは出発点です。湿潤収縮、回復、残留圧力の方が電池内部の長期状態に近い指標です。",
    intro: "AGMの評価は乾燥厚さと初期組立で終わりがちですが、注液と繰返しサイクルでガラス繊維マットは変化します。同一試料を段階的に追跡する必要があります。",
    sections: [
      ["乾燥厚さ", "厚さには測定圧力の明記が必要です", "AGMは圧縮性材料です。一点の厚さが近くても圧縮曲線と回復は異なります。H&Vの1.25 mm/50 kPa比較条件と10 kPa厚さは方法の例であり、共通設計値ではありません。"],
      ["注液後", "湿潤は圧力変化の最初の境界です", "電解液は繊維間の状態を変え、収縮を生じさせる場合があります。酸密度、温度、注液量、静置時間を固定し、一定圧力か一定間隙かを明示します。"],
      ["サイクル後", "残留圧力は長期使用状態により近い指標です", "材料のproxyサイクル比較は機械保持性の選別に使えますが、完成電池試験の代替ではありません。寿命は極板、グリッド、酸量、温度、充電条件、組立にも依存します。"],
      ["再現可能な記録", "四段階を同じ試験系で結びます", "受入、組立、注液、サイクルの条件を追跡可能にし、保持状態を容量、内部抵抗、解体観察と対応させます。"],
      ["仕様調整", "Vikingは数値比較の前に試験境界を合わせます", "用途、極群構造、設計間隙、目標厚さ、測定圧力、注液・サイクル方法をご提示ください。量産適合性は材料試験と完成電池検証で確認します。"]
    ],
    parameters: [["受入", "ロット、坪量、乾燥厚さ、測定圧力。"], ["組立", "極板厚さ、層数、間隙、目標圧縮。"], ["注液", "酸密度、温度、量、静置時間、測定方式。"], ["サイクル", "乾湿状態、圧縮範囲、回数、周波数、温度。"]],
    checklist: ["厚さ測定圧力", "極群と設計間隙", "電解液条件", "一定圧力または一定間隙", "サイクルと電池結果"]
  },
  es: {
    title: "¿Mantiene presión el separador AGM después del llenado y los ciclos?",
    summary: "El espesor inicial es solo el punto de partida; la contracción húmeda, la recuperación y la fuerza residual describen mejor su estado a largo plazo.",
    intro: "La evaluación suele terminar con el espesor en seco y el montaje inicial, pero el llenado de ácido y los ciclos cambian la manta de fibra de vidrio. Conviene seguir la misma muestra en varias etapas.",
    sections: [
      ["Espesor en seco", "Todo espesor necesita una presión de medición", "AGM es compresible. Dos materiales pueden coincidir en un punto y diferir en su curva y recuperación. Las condiciones 1,25 mm/50 kPa y el espesor a 10 kPa de H&V ilustran métodos comparativos, no valores universales."],
      ["Después del llenado", "La humectación es el primer límite del cambio de presión", "El electrolito modifica la interacción de las fibras y puede producir contracción. Deben fijarse densidad, temperatura, cantidad, reposo y si la medición se realiza a presión o separación constante."],
      ["Después de los ciclos", "La fuerza residual se acerca más al estado de servicio", "Una comparación proxy de ciclos sirve para filtrar la retención mecánica, pero no sustituye el ensayo de batería. La vida también depende de placas, rejillas, ácido, temperatura, carga y montaje."],
      ["Registro reproducible", "Conectar cuatro etapas con el mismo método", "Registrar recepción, montaje, llenado y ciclos con condiciones trazables, y relacionar la retención con capacidad, resistencia interna y desmontaje de la batería."],
      ["Coordinación", "Viking alinea primero el método de prueba", "Comparta aplicación, grupo de placas, separación, espesor objetivo, presión de medición y método de llenado o ciclos. La aptitud para serie debe confirmarse con ensayos del cliente."]
    ],
    parameters: [["Recepción", "Lote, gramaje, espesor en seco y presión."], ["Montaje", "Placas, capas, separación y compresión objetivo."], ["Llenado", "Densidad, temperatura, cantidad, reposo y método."], ["Ciclos", "Estado seco/húmedo, límites, número, frecuencia y temperatura."]],
    checklist: ["Presión de espesor", "Grupo de placas y separación", "Condiciones del electrolito", "Presión o separación constante", "Ciclos y resultados de batería"]
  },
  pt: {
    title: "O separador AGM mantém pressão após enchimento e ciclagem?",
    summary: "A espessura inicial é apenas o começo; contração úmida, recuperação e força residual representam melhor a condição de longo prazo.",
    intro: "A avaliação costuma parar na espessura seca e na montagem inicial, mas o enchimento com ácido e os ciclos alteram a manta de fibra de vidro. A mesma amostra deve ser acompanhada por etapas.",
    sections: [
      ["Espessura seca", "Toda espessura precisa da pressão de medição", "AGM é compressível. Materiais próximos em um ponto podem ter curvas e recuperação diferentes. As condições 1,25 mm/50 kPa e a espessura a 10 kPa da H&V ilustram comparação, não valores universais."],
      ["Após enchimento", "O umedecimento é a primeira fronteira da mudança de pressão", "O eletrólito altera a interação das fibras e pode causar retração. Fixe densidade, temperatura, volume, repouso e informe se o ensaio usa pressão ou vão constante."],
      ["Após ciclagem", "A força residual se aproxima mais da condição de serviço", "Um ensaio proxy de ciclagem compara retenção mecânica, mas não substitui a bateria completa. Vida também depende de placas, grades, ácido, temperatura, carga e montagem."],
      ["Registro reproduzível", "Conectar quatro etapas pelo mesmo método", "Registre recebimento, montagem, enchimento e ciclos com condições rastreáveis e relacione a retenção à capacidade, resistência interna e desmontagem."],
      ["Coordenação", "A Viking alinha primeiro o limite do ensaio", "Informe aplicação, grupo de placas, vão, espessura alvo, pressão e método de enchimento ou ciclagem. A aprovação para série depende dos testes do cliente."]
    ],
    parameters: [["Recebimento", "Lote, gramatura, espessura seca e pressão."], ["Montagem", "Placas, camadas, vão e compressão alvo."], ["Enchimento", "Densidade, temperatura, volume, repouso e método."], ["Ciclagem", "Estado seco/úmido, limites, ciclos, frequência e temperatura."]],
    checklist: ["Pressão de espessura", "Grupo de placas e vão", "Condições do eletrólito", "Pressão ou vão constante", "Ciclos e resultados da bateria"]
  },
  ru: {
    title: "Сохраняет ли AGM-сепаратор давление после заливки и циклирования?",
    summary: "Начальная толщина — лишь отправная точка; влажная усадка, восстановление и остаточное усилие лучше отражают длительное состояние в аккумуляторе.",
    intro: "Оценка AGM часто заканчивается сухой толщиной и первичной сборкой, но заливка электролита и циклы меняют стекловолоконный мат. Один образец следует отслеживать на нескольких этапах.",
    sections: [
      ["Сухая толщина", "Толщина должна указываться вместе с давлением измерения", "AGM сжимаем. Материалы могут совпадать в одной точке, но различаться кривой и восстановлением. Условия H&V 1,25 мм/50 кПа и толщина при 10 кПа показывают метод сравнения, а не универсальные значения."],
      ["После заливки", "Смачивание — первая граница изменения усилия", "Электролит меняет взаимодействие волокон и может вызывать усадку. Нужно фиксировать плотность, температуру, объём, выдержку и указывать постоянное давление или постоянный зазор."],
      ["После циклов", "Остаточное усилие ближе к рабочему состоянию", "Proxy-циклирование материала помогает сравнить механическое удержание, но не заменяет испытание батареи. Ресурс зависит также от пластин, решёток, кислоты, температуры, заряда и сборки."],
      ["Воспроизводимая запись", "Связать четыре этапа единым методом", "Условия входного контроля, сборки, заливки и циклов должны быть прослеживаемыми, а удержание — сопоставлено с ёмкостью, сопротивлением и разборкой батареи."],
      ["Согласование", "Viking сначала согласует границы испытания", "Сообщите применение, конструкцию блока, зазор, целевую толщину, давление и метод заливки или циклов. Серийная пригодность подтверждается испытаниями клиента."]
    ],
    parameters: [["Входной контроль", "Партия, плотность, сухая толщина и давление."], ["Сборка", "Пластины, слои, зазор и целевое сжатие."], ["Заливка", "Плотность, температура, объём, выдержка и метод."], ["Циклы", "Сухое/влажное состояние, пределы, число, частота и температура."]],
    checklist: ["Давление измерения", "Блок пластин и зазор", "Условия электролита", "Постоянное давление или зазор", "Циклы и результаты батареи"]
  }
};

const pressureRetentionReferenceCopy = {
  vi: ["Tài liệu tham khảo", "Phương pháp công khai và giới hạn áp dụng", "Điều kiện được trích dẫn dùng để minh họa phương pháp so sánh, không phải thông số Viking hoặc giá trị thiết kế chung."],
  ko: ["참고 자료", "공개 시험법과 적용 경계", "인용 조건은 비교 방법을 설명하며 Viking 제품 사양이나 보편 설계값이 아닙니다."],
  ja: ["参考資料", "公開試験法と適用範囲", "引用条件は比較方法の説明であり、Viking仕様または共通設計値ではありません。"],
  es: ["Referencias", "Métodos publicados y límites", "Las condiciones citadas explican métodos de comparación; no son especificaciones Viking ni valores universales."],
  pt: ["Referências", "Métodos publicados e limites", "As condições citadas explicam métodos de comparação; não são especificações Viking nem valores universais."],
  ru: ["Источники", "Опубликованные методы и границы", "Условия приведены для объяснения сравнения и не являются спецификацией Viking или универсальными значениями."]
};

const pressureRetentionReferenceItems = [
  ["Hollingsworth & Vose — Absorbent Glass Mat (AGM) Separator", "https://www.hollingsworth-vose.com/wp-content/uploads/AGM-Separator.pdf"],
  ["Journal of Power Sources — compression and positive active mass performance", "https://doi.org/10.1016/S0378-7753(99)00018-X"],
  ["Journal of Power Sources — characterisation of separator papers for VRLA batteries", "https://doi.org/10.1016/S0378-7753(01)00925-9"]
];

const batchProcessControlTopics = {
  vi: {
    title: "Vì sao một lần kiểm tra đạt không chứng minh tấm ngăn AGM sẵn sàng cho sản xuất hàng loạt?",
    summary: "Giá trị trung bình đạt yêu cầu chỉ mô tả mẫu đã lấy; sản xuất liên tục cần độ ổn định giữa vị trí, cuộn và lô.",
    intro: "Mẫu đầu có thể đạt và lắp ráp thuận lợi, nhưng lô sau vẫn buộc dây chuyền điều chỉnh. Đánh giá hàng loạt phải nhìn độ phân tán và xu hướng, không chỉ một chứng nhận đạt.",
    sections: [
      ["Dữ liệu quá trình", "Khách hàng hạ nguồn đang quản lý tính nhất quán bằng dữ liệu quá trình", "Thông tin sản xuất tháng 7/2026 của KSTAR nêu dây chuyền bản cực tự động, hàn đúc robot, MES và nền tảng chất lượng digital twin. Đây là ví dụ của nhà sản xuất ắc quy, không phải bằng chứng về hệ thống Viking; nó cho thấy một giá trị trung bình không đủ giải thích khả năng lặp lại."],
      ["Kiểm tra đơn", "Một báo cáo đạt chỉ trả lời các điểm đã lấy mẫu", "Báo cáo không tự chứng minh đầu, giữa và cuối cuộn gần nhau hay cuộn và lô tiếp theo sẽ lặp lại. Ít điểm lấy mẫu cố định có thể bỏ sót dao động chỉ xuất hiện khi chạy liên tục."],
      ["Ảnh hưởng lắp ráp", "Dao động vật liệu tiếp tục truyền vào cụm bản cực", "Độ dày làm thay đổi nén; định lượng và cấu trúc liên quan đến phân bố sợi, hút axit và lỗ rỗng; khổ rộng, mép và độ cuốn ảnh hưởng cấp liệu và tổn hao. Tấm ngăn không quyết định một mình kết quả ắc quy, nhưng vật liệu ổn định giúp giảm biến số."],
      ["Đánh giá thống kê", "Không thể chỉ nhìn giá trị trung bình", "Trung bình cho biết tâm dữ liệu; min, max và khoảng biến thiên cho biết độ trải; độ lệch chuẩn và hệ số biến thiên hỗ trợ so sánh; biểu đồ xu hướng giúp phát hiện trôi. Cp/Cpk chỉ có ý nghĩa khi hệ đo đáng tin cậy và quá trình đã ổn định."],
      ["Kế hoạch lấy mẫu", "Không ghi vị trí thì độ phân tán có thể bị hiểu sai", "Theo rủi ro, hãy so đầu, giữa, cuối cuộn và cả vị trí ngang với cuộn rộng. Đánh giá giữa lô phải bao phủ nhiều cuộn và lô; với tấm, cần ghi cuộn nguồn, vị trí xẻ và ảnh hưởng của xếp chồng, đóng gói."],
      ["Đánh giá truy xuất", "Truy xuất hữu ích phải chỉ ra đoạn phát sinh bất thường", "Hồ sơ nên liên kết lô giao hàng, mã cuộn hoặc tấm, lô sản xuất, kiểm tra và đóng gói. Đây là khung đánh giá, không phải tuyên bố Viking có MES hay nền tảng truy xuất số đầy đủ."],
      ["Phối hợp Viking", "Thống nhất phương pháp đánh giá ngay từ giai đoạn mẫu", "Hãy gửi quy cách, chỉ tiêu trọng yếu và danh sách đánh giá nhà cung cấp. Hai bên có thể thống nhất phương pháp, vị trí, tần suất, giới hạn và mã lô; quyết định dùng hàng loạt vẫn dựa trên xác nhận vật liệu, lắp ráp và ắc quy của khách hàng."]
    ],
    parameters: [["Trung bình", "Cho biết tâm nhưng có thể che dao động hai đầu."], ["Khoảng biến thiên", "Cho biết độ trải quan sát được; cần xem cùng số lượng và vị trí mẫu."], ["Độ lệch chuẩn & CV", "Mô tả phân tán khi phương pháp thử không đổi."], ["Xu hướng, Cp & Cpk", "Dùng xu hướng tìm trôi; chỉ dùng chỉ số năng lực sau khi quá trình ổn định."]],
    checklist: ["Phương pháp thử và tiền xử lý", "Vị trí dọc và ngang cuộn", "Tần suất theo giai đoạn dự án", "Giới hạn và xem xét xu hướng", "Mã lô và xử lý bất thường"]
  },
  ko: {
    title: "한 번의 합격 시험만으로 AGM 분리막의 양산 적합성을 판단할 수 없는 이유",
    summary: "평균값 합격은 채취한 시료만 설명합니다. 연속 조립에는 위치·롤·생산 로트 간 반복성이 필요합니다.",
    intro: "첫 샘플이 합격하고 조립도 원활해도 다음 로트에서 라인 조정이 늘 수 있습니다. 양산 평가는 한 장의 성적서보다 산포와 추세를 확인해야 합니다.",
    sections: [
      ["공정 데이터", "하류 제조사는 공정 데이터로 일관성을 관리합니다", "KSTAR의 2026년 7월 자료는 자동 극판 라인, 로봇 주조 용접, MES와 디지털 트윈 품질 플랫폼을 설명합니다. 이는 배터리 업체 사례이며 Viking 시스템의 증거가 아닙니다. 다만 평균값 하나로 반복성을 설명하기 어렵다는 구매 신호를 보여 줍니다."],
      ["단일 검사", "합격 성적서는 채취 지점의 통과 여부만 답합니다", "롤의 시작·중간·끝이 비슷한지, 다음 롤과 로트가 재현되는지는 별도 확인이 필요합니다. 적은 고정 지점만 검사하면 연속 권출 때 나타나는 국부 변동을 놓칠 수 있습니다."],
      ["조립 영향", "분리막 변동은 극군 조립으로 이어집니다", "두께는 실제 압축을, 평량과 구조는 섬유 분포·흡액·기공·압축 거동을, 폭과 권취는 공급성과 손실을 바꿀 수 있습니다. 분리막만으로 배터리 성능이 결정되지는 않지만 안정된 소재는 분석 변수를 줄입니다."],
      ["통계 검토", "평균값만으로 양산 안정성을 판단할 수 없습니다", "평균은 중심, 최소·최대·범위는 관찰 폭, 표준편차와 변동계수는 산포를 보여 줍니다. 시계열 추세는 이동을 조기에 찾습니다. Cp/Cpk는 규격, 측정 신뢰성과 통계적 안정이 확보된 뒤에만 사용해야 합니다."],
      ["샘플링 계획", "채취 위치가 없으면 산포도 왜곡될 수 있습니다", "위험에 따라 롤 시작·중간·끝과 폭 방향을 비교합니다. 로트 평가는 여러 생산 로트와 롤을 포함하고, 시트는 원롤과 슬리팅 위치, 적층·포장 후 치수 변화를 기록해야 합니다."],
      ["추적성 검토", "유용한 추적성은 이상이 발생한 구간을 답해야 합니다", "출하 로트, 롤·시트 ID, 생산 로트, 시험 및 포장 기록의 연결을 검토합니다. 이는 감사 프레임이며 Viking이 MES나 완전한 디지털 추적 플랫폼을 운영한다는 주장이 아닙니다."],
      ["Viking 협의", "샘플 단계에서 양산 평가 방법을 맞춥니다", "현행 규격서, 핵심 시험 항목과 공급업체 감사 목록을 공유해 주세요. 방법, 위치, 빈도, 판정 범위와 로트 표시를 먼저 맞추며, 양산 적합성은 고객의 소재·조립·완성 배터리 검증으로 확인합니다."]
    ],
    parameters: [["평균", "중심을 보여 주지만 양 끝의 변동을 숨길 수 있습니다."], ["범위", "관찰 폭을 빠르게 보여 주며 시료 수와 위치를 함께 봅니다."], ["표준편차 & CV", "동일한 시험 조건에서 산포를 설명합니다."], ["추세, Cp & Cpk", "추세로 이동을 찾고 공정 안정 후 능력지수를 사용합니다."]],
    checklist: ["시험법과 전처리", "롤 길이·폭 방향 위치", "단계별 검사 빈도", "판정 범위와 추세 검토", "로트 ID와 이상 처리"]
  },
  ja: {
    title: "一回の合格試験だけではAGMセパレーターの量産適性を判断できない理由",
    summary: "平均値の合格は採取した試料を示すだけです。連続組立には位置、ロール、製造ロット間の再現性が必要です。",
    intro: "初回サンプルが合格し組立も順調でも、次ロットでライン調整が増えることがあります。量産評価では一枚の合格書より、ばらつきと推移を確認します。",
    sections: [
      ["工程データ", "下流メーカーは工程データで一貫性を管理しています", "KSTARの2026年7月資料は自動極板ライン、ロボット鋳焊、MES、デジタルツイン品質管理を紹介しています。これは電池メーカーの事例でありVikingの設備を示すものではありませんが、平均値だけでは再現性を説明できないという調達側の変化を示します。"],
      ["単回検査", "合格報告は採取点が基準を通ったことだけを示します", "ロール先端・中央・後端が近いか、次のロールやロットで再現できるかは別の問題です。少数の固定点だけでは、連続巻出し時の局部変動を見落とす可能性があります。"],
      ["組立への影響", "材料の変動は極群組立へ伝わります", "厚さは実圧縮、坪量と構造は繊維分布・吸液・空孔・圧縮挙動、幅と巻姿は供給と損失に影響します。セパレーター単独で電池性能は決まりませんが、材料が安定すれば解析変数を減らせます。"],
      ["統計評価", "平均値だけを見ても量産安定性は分かりません", "平均は中心、最小・最大・レンジは広がり、標準偏差と変動係数は散らばりを示します。時系列グラフはドリフトの早期発見に有効です。Cp/Cpkは規格、測定信頼性、統計的安定がそろった後に使用します。"],
      ["サンプリング", "採取位置が不明ではばらつきも歪みます", "リスクに応じて先端・中央・後端と幅方向を比較します。ロット評価は複数ロット・ロールを含め、シートは元ロール、スリット位置、積層・包装後の寸法を記録します。"],
      ["トレーサビリティ", "異常がどの工程から来たかを答えられることが重要です", "出荷ロット、ロール・シートID、製造ロット、検査・包装記録の関連を確認します。これは監査の枠組みであり、VikingがMESや完全なデジタル追跡を運用しているという主張ではありません。"],
      ["Vikingの対応", "サンプル段階から量産評価方法を合わせます", "現行仕様書、重点試験、供給者監査リストをご提示ください。方法、位置、頻度、判定範囲、ロット表示を合わせ、量産適性はお客様の材料・組立・完成電池検証で確認します。"]
    ],
    parameters: [["平均", "中心を示しますが両端の変動を隠すことがあります。"], ["レンジ", "観察幅を示し、試料数と位置を併せて判断します。"], ["標準偏差・CV", "同一試験条件で散らばりを表します。"], ["推移・Cp・Cpk", "推移でドリフトを検出し、安定後に工程能力を評価します。"]],
    checklist: ["試験法と前処理", "ロール長手・幅方向の位置", "段階別の検査頻度", "判定範囲と推移レビュー", "ロットIDと異常処置"]
  },
  es: {
    title: "Por qué una prueba aprobada no demuestra que un separador AGM esté listo para producción en serie",
    summary: "Un promedio conforme solo describe la muestra tomada; la producción continua exige repetibilidad entre posiciones, rollos y lotes.",
    intro: "La primera muestra puede aprobar y montarse bien, mientras el lote siguiente obliga a ajustar la línea. La evaluación en serie debe mirar dispersión y tendencia, no solo un certificado.",
    sections: [
      ["Datos de proceso", "Los fabricantes de baterías ya gestionan la consistencia con datos", "La publicación de KSTAR de julio de 2026 describe líneas automáticas de placas, soldadura robotizada, MES y control digital twin. Es un ejemplo del fabricante de baterías, no una prueba del sistema de Viking; sí muestra por qué un promedio aislado ya no explica la repetibilidad."],
      ["Inspección puntual", "Un informe conforme solo responde por los puntos muestreados", "No demuestra que cabeza, centro y cola del rollo sean similares ni que otro rollo o lote repita el resultado. Pocos puntos fijos pueden omitir variaciones que aparecen durante el desbobinado continuo."],
      ["Impacto en montaje", "La variación del separador continúa en el grupo de placas", "El espesor cambia la compresión; el gramaje y la estructura se relacionan con fibras, absorción, poros y respuesta mecánica; ancho, bordes y bobinado afectan alimentación y desperdicio. El separador no determina solo la batería, pero reduce variables si es estable."],
      ["Revisión estadística", "La estabilidad de serie requiere más que el promedio", "Promedio, mínimo, máximo y rango describen centro y amplitud; desviación estándar y CV ayudan a comparar dispersión; la tendencia detecta deriva. Cp/Cpk solo debe usarse con límites definidos, medición fiable y proceso estadísticamente estable."],
      ["Plan de muestreo", "Sin ubicación documentada, la dispersión puede engañar", "Según el riesgo, compare cabeza, centro, cola y posiciones transversales. La verificación entre lotes debe incluir varios lotes y rollos; las hojas deben conservar su rollo de origen, posición de corte y cambio dimensional tras apilado o embalaje."],
      ["Trazabilidad", "Una auditoría útil pregunta de dónde surgió la anomalía", "Revise la relación entre lote de envío, ID de rollo u hoja, lote de producción, ensayo y embalaje. Es un marco de auditoría, no una afirmación de que Viking disponga de MES o trazabilidad digital completa."],
      ["Coordinación Viking", "Alinear el método de evaluación desde la muestra", "Comparta especificación, ensayos prioritarios y lista de auditoría. Podemos alinear método, posiciones, frecuencia, límites e identificación; la aptitud en serie depende de la validación de material, montaje y batería del cliente."]
    ],
    parameters: [["Promedio", "Sitúa el centro, pero puede ocultar variación en los extremos."], ["Rango", "Muestra la amplitud observada junto con cantidad y posición de muestras."], ["Desviación estándar y CV", "Describen dispersión bajo condiciones de ensayo constantes."], ["Tendencia, Cp y Cpk", "La tendencia detecta deriva; la capacidad se usa después de estabilizar el proceso."]],
    checklist: ["Método y acondicionamiento", "Posiciones longitudinales y transversales", "Frecuencia por etapa", "Límites y revisión de tendencia", "Identificación y tratamiento de anomalías"]
  },
  pt: {
    title: "Por que um teste aprovado não comprova que o separador AGM está pronto para produção em série",
    summary: "Uma média conforme descreve apenas a amostra; a produção contínua exige repetibilidade entre posições, rolos e lotes.",
    intro: "A primeira amostra pode aprovar e montar bem, enquanto o lote seguinte exige ajustes. A avaliação em série precisa observar dispersão e tendência, não apenas um certificado.",
    sections: [
      ["Dados de processo", "A indústria de baterias já gerencia consistência com dados", "A publicação da KSTAR de julho de 2026 descreve linhas automáticas de placas, soldagem robotizada, MES e qualidade digital twin. É um exemplo do fabricante de baterias, não prova do sistema Viking; mostra por que uma média isolada não explica repetibilidade."],
      ["Inspeção pontual", "Um relatório aprovado responde apenas pelos pontos amostrados", "Ele não demonstra que início, meio e fim do rolo são próximos ou que outro rolo e lote repetirão o resultado. Poucos pontos fixos podem perder variações que aparecem no desenrolamento contínuo."],
      ["Impacto na montagem", "A variação do separador segue para o grupo de placas", "Espessura altera compressão; gramatura e estrutura se relacionam a fibras, absorção, poros e resposta mecânica; largura, bordas e bobinamento afetam alimentação e perdas. O separador não define sozinho a bateria, mas material estável reduz variáveis."],
      ["Revisão estatística", "A estabilidade em série exige mais que a média", "Média, mínimo, máximo e amplitude descrevem centro e dispersão; desvio padrão e CV ajudam a comparar; tendências mostram deriva. Cp/Cpk só deve ser usado com limites definidos, medição confiável e processo estatisticamente estável."],
      ["Plano de amostragem", "Sem posição documentada, a dispersão pode enganar", "Conforme o risco, compare início, meio, fim e posições transversais. A verificação entre lotes deve incluir vários lotes e rolos; folhas devem registrar rolo de origem, corte e alteração após empilhamento ou embalagem."],
      ["Rastreabilidade", "Uma auditoria útil pergunta onde surgiu a anomalia", "Verifique a ligação entre lote de envio, ID do rolo ou folha, produção, ensaio e embalagem. É um roteiro de auditoria, não uma afirmação de MES ou rastreabilidade digital completa na Viking."],
      ["Coordenação Viking", "Alinhar o método desde a amostra", "Envie especificação, ensaios prioritários e lista de auditoria. Podemos alinhar método, posições, frequência, limites e identificação; a aptidão em série depende da validação do cliente."]
    ],
    parameters: [["Média", "Localiza o centro, mas pode ocultar variação nas extremidades."], ["Amplitude", "Mostra a faixa observada junto com quantidade e posição de amostras."], ["Desvio padrão e CV", "Descrevem dispersão sob condições de teste constantes."], ["Tendência, Cp e Cpk", "Use tendência para deriva e capacidade só após estabilidade."]],
    checklist: ["Método e condicionamento", "Posições longitudinais e transversais", "Frequência por etapa", "Limites e tendência", "Identificação e tratamento de anomalias"]
  },
  ru: {
    title: "Почему одного теста недостаточно для серийного производства AGM-сепаратора",
    summary: "Соответствие среднего значения описывает только выборку; непрерывная сборка требует повторяемости по позициям, рулонам и партиям.",
    intro: "Первый образец может пройти контроль и хорошо собраться, а следующая партия потребует переналадки линии. Для серии важны разброс и тренд, а не только один сертификат.",
    sections: [
      ["Данные процесса", "Производители батарей уже управляют стабильностью по данным", "Публикация KSTAR июля 2026 года описывает автоматические линии пластин, роботизированную сварку, MES и digital twin контроля качества. Это пример производителя батарей, а не подтверждение системы Viking; он показывает, почему одного среднего недостаточно для оценки повторяемости."],
      ["Разовая проверка", "Протокол отвечает только за отобранные точки", "Он не доказывает близость начала, середины и конца рулона или повторяемость следующего рулона и партии. Малое число фиксированных точек может пропустить локальные колебания, заметные при непрерывной размотке."],
      ["Влияние на сборку", "Разброс сепаратора передаётся в блок пластин", "Толщина меняет сжатие; поверхностная плотность и структура связаны с волокнами, впитыванием, порами и механикой; ширина, кромка и намотка влияют на подачу и отходы. Сепаратор не определяет батарею один, но стабильный материал уменьшает число переменных."],
      ["Статистическая оценка", "Для серийной стабильности среднего недостаточно", "Среднее показывает центр, минимум, максимум и размах — ширину, стандартное отклонение и CV — рассеяние, тренд — смещение. Cp/Cpk применяют только при заданных пределах, надёжном измерении и статистически стабильном процессе."],
      ["План отбора", "Без места отбора разброс может быть искажён", "По риску сравнивают начало, середину, конец и поперечные позиции. Межпартийная оценка должна включать несколько партий и рулонов; для листов фиксируют исходный рулон, место резки и изменения после укладки и упаковки."],
      ["Прослеживаемость", "Полезный аудит отвечает, где возникло отклонение", "Проверяют связь отгрузочной партии, ID рулона или листов, производственной партии, испытаний и упаковки. Это схема аудита, а не заявление о наличии у Viking MES или полной цифровой прослеживаемости."],
      ["Работа с Viking", "Метод серийной оценки согласуют на этапе образца", "Передайте спецификацию, приоритетные испытания и аудит-лист. Можно согласовать метод, позиции, частоту, пределы и маркировку; пригодность для серии подтверждается испытаниями материала, сборки и батареи у клиента."]
    ],
    parameters: [["Среднее", "Показывает центр, но может скрыть крайние колебания."], ["Размах", "Показывает наблюдаемую ширину с учётом числа и места проб."], ["Стандартное отклонение и CV", "Описывают разброс при неизменных условиях испытаний."], ["Тренд, Cp и Cpk", "Тренд выявляет дрейф; способность оценивают после стабилизации."]],
    checklist: ["Метод и кондиционирование", "Продольные и поперечные позиции", "Частота по этапам", "Пределы и анализ тренда", "ID партии и работа с отклонениями"]
  }
};

const batchProcessControlReferenceCopy = {
  vi: ["Tài liệu tham khảo", "Ví dụ công khai về quản lý chất lượng theo quá trình", "Nguồn KSTAR mô tả nhà sản xuất ắc quy và không xác nhận thiết bị, MES hay phạm vi truy xuất của Viking."],
  ko: ["참고 자료", "공정 기반 품질 관리의 공개 사례", "KSTAR 자료는 배터리 제조사 사례이며 Viking의 설비, MES 또는 추적 범위를 입증하지 않습니다."],
  ja: ["参考資料", "工程品質管理の公開事例", "KSTAR資料は電池メーカーの事例であり、Vikingの設備、MES、追跡範囲を証明するものではありません。"],
  es: ["Referencia", "Ejemplo público de calidad basada en procesos", "La fuente KSTAR describe a un fabricante de baterías y no verifica equipos, MES ni trazabilidad de Viking."],
  pt: ["Referência", "Exemplo público de qualidade baseada em processo", "A fonte KSTAR descreve um fabricante de baterias e não comprova equipamentos, MES ou rastreabilidade da Viking."],
  ru: ["Источник", "Открытый пример процессного управления качеством", "Источник KSTAR описывает производителя батарей и не подтверждает оборудование, MES или прослеживаемость Viking."]
};

const batchProcessControlReferenceItems = [["KSTAR — intelligent manufacturing and full-process quality management", "https://www.kstar.com/cn/index.php/news/info/1269.html"]];

const batchProcessControlComparison = {
  vi: ["Dữ liệu minh họa", "Cùng trung bình, độ phân tán khác", ["So sánh", "Mẫu A", "Mẫu B"]],
  ko: ["예시 데이터", "같은 평균, 다른 산포", ["비교", "시료 A", "시료 B"]],
  ja: ["例示データ", "同じ平均でも異なるばらつき", ["比較", "試料A", "試料B"]],
  es: ["Datos ilustrativos", "Mismo promedio, distinta dispersión", ["Comparación", "Muestra A", "Muestra B"]],
  pt: ["Dados ilustrativos", "Mesma média, dispersão diferente", ["Comparação", "Amostra A", "Amostra B"]],
  ru: ["Пример данных", "Одинаковое среднее, разный разброс", ["Сравнение", "Выборка A", "Выборка B"]]
};

const batchProcessControlComparisonRows = {
  vi: [["Các phép đo", "1.50 / 1.50 / 1.50 mm", "1.44 / 1.50 / 1.56 mm"], ["Trung bình", "1.50 mm", "1.50 mm"], ["Khoảng biến thiên", "0.00 mm", "0.12 mm"]],
  ko: [["측정값", "1.50 / 1.50 / 1.50 mm", "1.44 / 1.50 / 1.56 mm"], ["평균", "1.50 mm", "1.50 mm"], ["범위", "0.00 mm", "0.12 mm"]],
  ja: [["測定値", "1.50 / 1.50 / 1.50 mm", "1.44 / 1.50 / 1.56 mm"], ["平均", "1.50 mm", "1.50 mm"], ["範囲", "0.00 mm", "0.12 mm"]],
  es: [["Mediciones", "1.50 / 1.50 / 1.50 mm", "1.44 / 1.50 / 1.56 mm"], ["Promedio", "1.50 mm", "1.50 mm"], ["Rango", "0.00 mm", "0.12 mm"]],
  pt: [["Medições", "1.50 / 1.50 / 1.50 mm", "1.44 / 1.50 / 1.56 mm"], ["Média", "1.50 mm", "1.50 mm"], ["Amplitude", "0.00 mm", "0.12 mm"]],
  ru: [["Измерения", "1.50 / 1.50 / 1.50 mm", "1.44 / 1.50 / 1.56 mm"], ["Среднее", "1.50 mm", "1.50 mm"], ["Размах", "0.00 mm", "0.12 mm"]]
};

const earlyLeadAcidTimelineCopy = {
  vi: ["Mốc sản xuất", "Năm mốc cho các định nghĩa khác nhau", "Các mốc dưới đây không khẳng định một đáp án duy nhất cho khái niệm ‘đầu tiên’."],
  ko: ["제조 연표", "서로 다른 정의를 보여 주는 다섯 이정표", "아래 연도는 하나의 절대적인 ‘최초’를 주장하지 않습니다."],
  ja: ["製造年表", "異なる定義を示す五つの節目", "以下の年代は単一の絶対的な『最初』を主張するものではありません。"],
  es: ["Cronología industrial", "Cinco hitos con definiciones diferentes", "Estas fechas no pretenden establecer una única respuesta absoluta a la palabra ‘primera’."],
  pt: ["Linha do tempo", "Cinco marcos com definições diferentes", "As datas não estabelecem uma única resposta absoluta para a palavra ‘primeira’."],
  ru: ["Хронология производства", "Пять вех с разными определениями", "Эти даты не устанавливают единственный абсолютный ответ на вопрос о ‘первом’ производстве."]
};

const earlyLeadAcidReferenceCopy = {
  vi: ["Tài liệu tham khảo", "Nguồn lịch sử và kỹ thuật", "Nguồn sử dụng các định nghĩa khác nhau về hoạt động sản xuất ban đầu. Bản địa chí Thượng Hải được liên kết qua bản sao công khai."],
  ko: ["참고 자료", "역사 및 기술 자료", "초기 제조를 설명하는 기준은 출처마다 다릅니다. 상하이 지방지는 공개 미러를 통해 연결됩니다."],
  ja: ["参考資料", "歴史・技術資料", "初期製造の定義は資料ごとに異なります。上海地方誌は公開ミラーへのリンクです。"],
  es: ["Referencias", "Fuentes históricas y técnicas", "Las fuentes utilizan definiciones distintas para la producción inicial. La gaceta de Shanghái se enlaza mediante una copia pública."],
  pt: ["Referências", "Fontes históricas e técnicas", "As fontes usam definições diferentes para a produção inicial. A crônica de Xangai é vinculada por meio de uma cópia pública."],
  ru: ["Источники", "Исторические и технические материалы", "Источники используют разные определения раннего производства. Шанхайская хроника доступна по ссылке на публичную копию."]
};

const earlyLeadAcidReferenceItems = [
  ["Shanghai Gazetteer — public mirror of the 1912 record", "https://docs.abwen.com/china/%E4%B8%8A%E6%B5%B7%E9%80%9A%E5%BF%97.pdf"],
  ["SMM — development of lead-acid battery technology in China", "https://news.smm.cn/news/102815366"],
  ["Shenyang Development and Reform Commission — Energy Storage Industry Development Plan", "https://fgw.shenyang.gov.cn/zwgk/fdzdgknr/bmwj/202407/P020240731519907537824.pdf"],
  ["Journal of Power Sources — Aspects of lead/acid battery technology: Separators", "https://doi.org/10.1016/0378-7753(93)80038-Q"],
  ["Lead-Acid Batteries: Science and Technology", "https://www.sciencedirect.com/book/9780444595522/lead-acid-batteries-science-and-technology"],
  ["Journal of Power Sources — Development of the first valve-regulated lead/acid cell", "https://doi.org/10.1016/S0378-7753(96)02516-5"]
];

const dataCenterBackupPowerTopics = {
  vi: {
    title: "Nguồn điện dự phòng trung tâm dữ liệu đang tăng: cần xem gì ở tấm ngăn AGM?",
    summary: "Hướng dẫn cho dự án UPS, trung tâm dữ liệu và viễn thông về khả năng giữ axit, nén tiếp xúc, chu trình oxy và tính nhất quán của tấm ngăn AGM.",
    intro: "Nhu cầu điện dự phòng tăng không tự động trở thành đơn hàng tấm ngăn. Với hệ VRLA-AGM, yêu cầu cuối cùng vẫn phải đi qua thiết kế ắc quy, thử mẫu và lắp ráp hàng loạt.",
    sections: [
      ["Tín hiệu nhu cầu", "Công suất trung tâm dữ liệu tăng kéo theo việc rà soát hệ thống dự phòng", "Deloitte dự báo công suất điện quan trọng của trung tâm dữ liệu toàn cầu có thể đạt gần 96 GW vào năm 2026, trong đó hoạt động AI có thể dùng hơn 40%. Đây là bối cảnh nhu cầu, không phải dự báo đơn hàng AGM."],
      ["Yêu cầu công khai", "Đơn mua UPS cho thấy tiêu chí nghiệm thu ngày càng cụ thể", "Một thông báo mua sắm tháng 3/2026 yêu cầu ắc quy AGM mới từ 100 Ah, tuổi thọ nạp nổi thiết kế ít nhất 5 năm, phù hợp YD/T 799-2024 và theo dõi điện áp, dòng điện, nội trở cùng nhiệt độ từng bình. Đây là yêu cầu cho ắc quy hoàn chỉnh, không phải bảng thông số tấm ngăn."],
      ["Phóng điện tốc độ cao", "Điện phân và đường dẫn ion phải ổn định", "Trong VRLA-AGM, axit được giữ trong mạng sợi thủy tinh. Sự khác nhau về hút axit, lỗ rỗng hoặc phân bố điện phân có thể làm việc kiểm soát truyền ion và nội trở giữa các bình khó hơn; tấm ngăn là một phần của hệ thống chứ không quyết định hiệu suất một mình."],
      ["Nạp nổi dài hạn", "Trạng thái nén sau khi hút axit quan trọng hơn độ dày danh nghĩa", "Nén quá thấp có thể làm tiếp xúc thiếu ổn định; nén quá cao có thể thay đổi lỗ rỗng, lượng điện phân và đường khí. Phạm vi phù hợp phải được xác nhận theo bản cực, dung lượng và điều kiện vận hành cụ thể."],
      ["Chu trình oxy", "Tấm ngăn cũng tạo đường khí cho tái hợp oxy", "Oxy sinh ra ở bản cực dương cần đi qua cấu trúc tấm ngăn đến bản cực âm để tái tạo nước. Độ bão hòa điện phân, cấu trúc lỗ và nén phải cân bằng giữa giữ axit, dẫn ion và truyền khí."],
      ["Từ mẫu đến lô", "Tính nhất quán quyết định khả năng lặp lại trong lắp ráp", "Khổ cuộn, trạng thái cuộn, kích thước tấm, độ dày, định lượng và đóng gói đều ảnh hưởng đến vận hành dây chuyền. Mẫu đạt yêu cầu chỉ là bước đầu; các lô sau cần tiếp tục theo cùng logic đã xác nhận."],
      ["Khác biệt ứng dụng", "UPS, viễn thông và lưu trữ năng lượng không dùng chung một kết luận", "UPS thường nhấn mạnh phóng điện tốc độ cao và khởi động tin cậy sau thời gian nạp nổi; viễn thông còn phụ thuộc thời gian dự phòng và môi trường; ứng dụng chu kỳ cần đánh giá riêng về chu kỳ và quản lý điện phân."]
    ],
    parameters: [["Ứng dụng", "UPS, trung tâm dữ liệu, trạm viễn thông hoặc lưu trữ chu kỳ."], ["Thiết kế ắc quy", "Dung lượng, kích thước bản cực hoặc bộ bản cực và điều kiện nạp nổi."], ["Nén", "Độ dày mục tiêu, khe lắp, trạng thái ướt và yêu cầu phục hồi."], ["Điện phân", "Khả năng hút, thời gian thấm và phương pháp thử đã thống nhất."], ["Dạng giao hàng", "Khổ cuộn, lõi, đường kính hoặc kích thước tấm."], ["Giai đoạn dự án", "Mẫu, thử sản xuất hay cung ứng hàng loạt."]],
    checklist: ["Ứng dụng và dung lượng ắc quy", "Độ dày và thiết kế nén", "Khổ cuộn hoặc kích thước tấm", "Phương pháp thử và tiêu chí chấp nhận", "Giai đoạn mẫu và kế hoạch sản lượng"]
  },
  ko: {
    title: "데이터센터 백업 전력 수요 증가: AGM 분리막은 무엇을 확인해야 합니까?",
    summary: "UPS·데이터센터·통신 백업용 VRLA 프로젝트에서 산 유지, 압축 접촉, 산소 순환과 로트 일관성을 검토하는 실무 안내입니다.",
    intro: "백업 전력 수요 증가는 곧바로 분리막 주문을 의미하지 않습니다. VRLA-AGM 프로젝트에서는 배터리 설계, 샘플 검증과 양산 조립을 거쳐야 실제 사양이 결정됩니다.",
    sections: [
      ["수요 신호", "데이터센터 용량 증가는 백업 시스템 검토로 이어집니다", "Deloitte는 2026년 전 세계 데이터센터 핵심 전력 용량이 약 96 GW에 이르고 AI 운영이 40% 이상을 사용할 수 있다고 전망합니다. 이는 시장 배경이지 AGM 주문 예측은 아닙니다."],
      ["공개 조달", "UPS 배터리의 검수 요구가 구체화되고 있습니다", "2026년 3월 한 조달 공고는 100 Ah 이상 신규 AGM 납축전지, 5년 이상의 설계 부동충전 수명, YD/T 799-2024 준수와 단전지 전압·전류·내부저항·온도 모니터링을 요구했습니다. 이는 완성 배터리 요구이지 분리막 사양표가 아닙니다."],
      ["고율 방전", "전해액과 이온 경로의 일관성이 필요합니다", "VRLA-AGM에서는 산이 유리섬유 기공에 유지됩니다. 흡액, 기공 구조와 산 분포가 달라지면 이온 이동과 내부저항의 일관성 관리가 어려워질 수 있습니다. 분리막은 시스템의 한 요소이며 단독으로 출력을 결정하지 않습니다."],
      ["장기 부동충전", "습윤 후 압축 상태는 명목 두께보다 중요합니다", "압축이 부족하면 극판 접촉이 불안정할 수 있고 과도하면 기공, 전해액량과 기체 통로가 달라질 수 있습니다. 적정 범위는 용량, 극판 구조와 운전 조건별로 검증해야 합니다."],
      ["산소 순환", "분리막은 산소 재결합을 위한 기체 통로도 제공합니다", "양극에서 발생한 산소는 분리막을 통해 음극으로 이동해 물로 재결합합니다. 전해액 포화도, 기공 구조와 압축은 산 유지, 이온 이동과 기체 전달 사이에서 균형을 이뤄야 합니다."],
      ["샘플에서 양산", "로트 일관성이 조립 재현성을 좌우합니다", "롤 폭과 권취 상태, 시트 치수, 두께, 평량과 포장은 생산라인 작업성에 직접 연결됩니다. 첫 샘플 승인은 시작일 뿐이며 후속 로트도 합의된 조건을 유지해야 합니다."],
      ["용도 차이", "UPS·통신 백업·에너지저장은 같은 기준으로 판단할 수 없습니다", "UPS는 고율 방전과 장기 부동충전 후 신뢰성을 중시하고, 통신 백업은 백업 시간과 환경을 함께 보며, 사이클 저장은 별도의 순환 성능과 전해액 관리 검토가 필요합니다."]
    ],
    parameters: [["응용", "UPS, 데이터센터, 통신 기지국 또는 사이클 저장."], ["배터리 설계", "용량, 극판/극군 치수와 부동충전 조건."], ["압축", "목표 두께, 조립 간격, 습윤 상태와 회복 요구."], ["전해액", "흡액량, 젖음 시간과 합의된 시험법."], ["공급 형태", "롤 폭, 코어, 직경 또는 시트 치수."], ["프로젝트 단계", "샘플, 시험 생산 또는 양산 공급."]],
    checklist: ["배터리 용도와 용량", "두께 및 압축 설계", "롤 폭 또는 시트 치수", "시험법과 합격 기준", "샘플 단계와 예상 수량"]
  },
  ja: {
    title: "データセンターのバックアップ電源需要増加：AGMセパレーターで確認すべき点",
    summary: "UPS、データセンター、通信バックアップ向けVRLAで、保液、圧縮接触、酸素循環、ロット一貫性を確認する実務ガイドです。",
    intro: "バックアップ電源需要の増加が、そのままセパレーター注文になるわけではありません。VRLA-AGMでは電池設計、サンプル評価、量産組立を経て実際の仕様が決まります。",
    sections: [
      ["需要シグナル", "データセンター容量の増加はバックアップ設備の再評価につながります", "Deloitteは2026年の世界のデータセンター重要電力容量を約96 GW、AI運用の消費を40%以上と予測しています。これは需要背景であり、AGM受注予測ではありません。"],
      ["公開調達", "UPS蓄電池の検収条件はより具体的です", "2026年3月の調達公告では、100 Ah以上の新品AGM鉛蓄電池、5年以上の設計浮動充電寿命、YD/T 799-2024適合、単電池の電圧・電流・内部抵抗・温度監視が求められました。完成電池の要求であり、セパレーター仕様ではありません。"],
      ["高率放電", "電解液とイオン経路の一貫性が必要です", "VRLA-AGMでは酸がガラス繊維の空孔に保持されます。吸液、空孔構造、酸分布の差はイオン移動と内部抵抗のばらつき管理を難しくします。ただしセパレーターだけで高率性能が決まるわけではありません。"],
      ["長期浮動充電", "湿潤後の圧縮状態は公称厚さ以上に重要です", "圧縮不足は接触を不安定にし、過圧縮は空孔、電解液量、ガス通路を変える可能性があります。適正範囲は容量、極板構造、運転条件ごとに確認します。"],
      ["酸素循環", "セパレーターは酸素再結合のガス通路も担います", "正極で発生した酸素はセパレーターを通って負極へ移動し水に戻ります。電解液飽和度、空孔構造、圧縮を保液、イオン移動、ガス輸送の間で釣り合わせます。"],
      ["サンプルから量産", "ロット一貫性が組立再現性を左右します", "ロール幅と巻姿、シート寸法、厚さ、坪量、梱包はライン作業性に直結します。初回サンプルの合格後も、後続ロットで同じ条件を維持する必要があります。"],
      ["用途差", "UPS、通信バックアップ、蓄電を同じ基準で判断しません", "UPSは高率放電と長期浮動充電後の確実な起動、通信はバックアップ時間と環境、サイクル蓄電は循環条件と電解液管理を個別に確認します。"]
    ],
    parameters: [["用途", "UPS、データセンター、通信基地局、サイクル蓄電。"], ["電池設計", "容量、極板／極群寸法、浮動充電条件。"], ["圧縮", "目標厚さ、組立間隔、湿潤状態、回復要求。"], ["電解液", "吸液量、濡れ時間、合意済み試験法。"], ["供給形状", "ロール幅、紙管、径、またはシート寸法。"], ["案件段階", "サンプル、試作、量産供給。"]],
    checklist: ["電池用途と容量", "厚さと圧縮設計", "ロール幅またはシート寸法", "試験法と合格基準", "サンプル段階と想定数量"]
  },
  es: {
    title: "Crece la demanda de respaldo para centros de datos: ¿qué revisar en el separador AGM?",
    summary: "Guía para proyectos VRLA de UPS, centros de datos y telecomunicaciones sobre retención de ácido, compresión, ciclo de oxígeno y consistencia de lote.",
    intro: "El crecimiento del respaldo eléctrico no se convierte automáticamente en pedidos de separadores. En VRLA-AGM, la especificación pasa por el diseño de batería, la validación de muestras y el montaje en serie.",
    sections: [
      ["Señal de demanda", "Más capacidad de centros de datos obliga a revisar el respaldo", "Deloitte estima que la capacidad eléctrica crítica de centros de datos podría acercarse a 96 GW en 2026 y que la operación de IA podría consumir más del 40%. Es contexto de demanda, no una previsión de pedidos AGM."],
      ["Compra pública", "Los requisitos de aceptación para baterías UPS son más específicos", "Una compra publicada en marzo de 2026 exigió baterías AGM nuevas de al menos 100 Ah, vida de flotación de diseño mínima de cinco años, conformidad con YD/T 799-2024 y monitoreo de voltaje, corriente, resistencia interna y temperatura por unidad. Son requisitos de la batería terminada, no del separador."],
      ["Alta descarga", "El electrolito y las vías iónicas deben ser consistentes", "En VRLA-AGM el ácido queda retenido en los poros de la fibra. Variaciones en absorción, porosidad o distribución pueden dificultar el control de transporte iónico y resistencia interna. El separador participa en el sistema, pero no determina solo el desempeño."],
      ["Flotación prolongada", "La compresión húmeda importa más que el espesor nominal", "Una compresión insuficiente puede reducir la estabilidad del contacto; una excesiva puede modificar poros, volumen de electrolito y pasos de gas. El rango debe validarse para la capacidad, placas y régimen de trabajo concretos."],
      ["Ciclo de oxígeno", "El separador también aporta vías de gas para la recombinación", "El oxígeno generado en la placa positiva debe atravesar el separador y recombinarse en la negativa. Saturación, porosidad y compresión equilibran retención de ácido, conducción iónica y transporte de gas."],
      ["De muestra a serie", "La consistencia de lote define la repetibilidad del montaje", "Ancho y bobinado, dimensiones de lámina, espesor, gramaje y embalaje afectan la línea. Aprobar la primera muestra es solo el comienzo; los lotes posteriores deben conservar la lógica acordada."],
      ["Aplicaciones distintas", "UPS, telecomunicaciones y almacenamiento no usan un criterio único", "UPS prioriza descarga de alta potencia y arranque fiable tras flotación; telecomunicaciones añade autonomía y ambiente; el almacenamiento cíclico requiere revisar ciclos y gestión del electrolito."]
    ],
    parameters: [["Aplicación", "UPS, centro de datos, telecomunicaciones o almacenamiento cíclico."], ["Diseño de batería", "Capacidad, dimensiones de placas/grupo y régimen de flotación."], ["Compresión", "Espesor objetivo, espacio de montaje, estado húmedo y recuperación."], ["Electrolito", "Absorción, tiempo de humectación y método de ensayo acordado."], ["Formato", "Ancho, núcleo y diámetro de rollo o tamaño de lámina."], ["Etapa", "Muestra, prueba piloto o suministro en serie."]],
    checklist: ["Aplicación y capacidad", "Espesor y diseño de compresión", "Ancho de rollo o tamaño de lámina", "Método de ensayo y aceptación", "Etapa de muestra y volumen esperado"]
  },
  pt: {
    title: "A demanda de backup para data centers cresce: o que avaliar no separador AGM?",
    summary: "Guia para projetos VRLA de UPS, data centers e telecom sobre retenção de ácido, compressão, ciclo de oxigênio e consistência entre lotes.",
    intro: "O crescimento da energia de backup não vira automaticamente pedido de separador. Em VRLA-AGM, a especificação passa pelo projeto da bateria, validação de amostras e montagem em volume.",
    sections: [
      ["Sinal de demanda", "Mais capacidade de data centers exige revisão do backup", "A Deloitte estima que a capacidade elétrica crítica global de data centers pode chegar perto de 96 GW em 2026 e que operações de IA podem consumir mais de 40%. É contexto de demanda, não previsão de pedidos AGM."],
      ["Compra pública", "Os requisitos de aceitação de baterias UPS estão mais específicos", "Uma compra publicada em março de 2026 exigiu baterias AGM novas de pelo menos 100 Ah, vida de flutuação projetada mínima de cinco anos, conformidade com YD/T 799-2024 e monitoramento de tensão, corrente, resistência interna e temperatura por unidade. São requisitos da bateria, não do separador."],
      ["Alta descarga", "Eletrólito e caminhos iônicos precisam ser consistentes", "Em VRLA-AGM o ácido fica retido nos poros da fibra. Variações de absorção, porosidade ou distribuição dificultam controlar transporte iônico e resistência interna. O separador participa do sistema, mas não define sozinho o desempenho."],
      ["Flutuação prolongada", "A compressão após molhamento importa mais que a espessura nominal", "Compressão insuficiente pode reduzir a estabilidade do contato; compressão excessiva pode alterar poros, volume de eletrólito e passagem de gás. A faixa deve ser validada para capacidade, placas e regime de operação."],
      ["Ciclo de oxigênio", "O separador também fornece caminhos de gás para recombinação", "O oxigênio da placa positiva atravessa o separador e se recombina na negativa. Saturação, porosidade e compressão equilibram retenção de ácido, condução iônica e transporte de gás."],
      ["Da amostra ao volume", "A consistência entre lotes determina a repetibilidade da montagem", "Largura e bobinamento, dimensões de folha, espessura, gramatura e embalagem afetam a linha. Aprovar a primeira amostra é apenas o início; lotes seguintes devem manter a lógica acordada."],
      ["Aplicações diferentes", "UPS, telecom e armazenamento não usam um único critério", "UPS prioriza descarga de alta potência e partida confiável após flutuação; telecom inclui autonomia e ambiente; armazenamento cíclico exige avaliação separada de ciclos e eletrólito."]
    ],
    parameters: [["Aplicação", "UPS, data center, telecom ou armazenamento cíclico."], ["Projeto da bateria", "Capacidade, dimensões de placas/grupo e regime de flutuação."], ["Compressão", "Espessura alvo, espaço de montagem, condição úmida e recuperação."], ["Eletrólito", "Absorção, tempo de molhamento e método de teste acordado."], ["Formato", "Largura, tubete e diâmetro do rolo ou tamanho da folha."], ["Etapa", "Amostra, piloto ou fornecimento em volume."]],
    checklist: ["Aplicação e capacidade", "Espessura e projeto de compressão", "Largura de rolo ou tamanho de folha", "Método de teste e aceitação", "Etapa de amostra e volume esperado"]
  },
  ru: {
    title: "Растёт спрос на резервное питание ЦОД: что проверять в AGM-сепараторе?",
    summary: "Практическое руководство для VRLA-проектов UPS, ЦОД и связи по удержанию электролита, сжатию, кислородному циклу и стабильности партий AGM.",
    intro: "Рост резервной мощности не превращается автоматически в заказ сепараторов. В VRLA-AGM спецификация проходит через конструкцию батареи, проверку образцов и серийную сборку.",
    sections: [
      ["Сигнал спроса", "Рост мощности ЦОД требует пересмотра резервных систем", "Deloitte ожидает, что критическая электрическая мощность мировых ЦОД приблизится к 96 ГВт в 2026 году, а ИИ-операции могут потреблять свыше 40%. Это контекст спроса, а не прогноз заказов AGM."],
      ["Открытая закупка", "Требования к приёмке UPS-батарей становятся конкретнее", "Закупка марта 2026 года требовала новые AGM-батареи не менее 100 А·ч, расчётный срок службы в буферном режиме не менее пяти лет, соответствие YD/T 799-2024 и мониторинг напряжения, тока, внутреннего сопротивления и температуры каждого блока. Это требования к батарее, не к сепаратору."],
      ["Высокая мощность", "Электролит и ионные пути должны быть стабильными", "В VRLA-AGM кислота удерживается в порах стекловолокна. Различия в поглощении, пористости и распределении усложняют контроль ионного переноса и внутреннего сопротивления. Сепаратор участвует в системе, но не определяет характеристики самостоятельно."],
      ["Длительный буфер", "Сжатие во влажном состоянии важнее номинальной толщины", "Недостаточное сжатие может ухудшить стабильность контакта, избыточное — изменить поры, объём электролита и газовые каналы. Диапазон подтверждают для конкретной ёмкости, пластин и режима эксплуатации."],
      ["Кислородный цикл", "Сепаратор создаёт газовые пути для рекомбинации", "Кислород от положительной пластины проходит через сепаратор и рекомбинирует на отрицательной. Насыщение, пористость и сжатие балансируют удержание кислоты, ионную проводимость и перенос газа."],
      ["От образца к серии", "Стабильность партий определяет повторяемость сборки", "Ширина и намотка рулона, размер листа, толщина, масса на площадь и упаковка влияют на линию. Одобрение первого образца — начало; последующие партии должны сохранять согласованные условия."],
      ["Разные применения", "UPS, связь и накопление нельзя оценивать одним критерием", "UPS требует высокой мощности и надёжного запуска после буферного режима; связь учитывает длительность резерва и среду; циклическое накопление требует отдельной оценки циклов и электролита."]
    ],
    parameters: [["Применение", "UPS, ЦОД, телеком или циклическое накопление."], ["Конструкция", "Ёмкость, размеры пластин/блока и буферный режим."], ["Сжатие", "Целевая толщина, монтажный зазор, влажное состояние и восстановление."], ["Электролит", "Поглощение, время смачивания и согласованный метод испытания."], ["Формат", "Ширина, втулка и диаметр рулона или размер листа."], ["Этап", "Образец, пилот или серийная поставка."]],
    checklist: ["Применение и ёмкость", "Толщина и проектное сжатие", "Ширина рулона или размер листа", "Метод испытания и приёмка", "Этап образца и ожидаемый объём"]
  }
};

const dataCenterReferences = {
  vi: ["Tài liệu tham khảo", "Nguồn công khai và phạm vi áp dụng", "Yêu cầu mua sắm áp dụng cho ắc quy hoàn chỉnh, không phải thông số tấm ngăn; nội dung chỉ phục vụ trao đổi kỹ thuật, không phải dự báo thị trường."],
  ko: ["참고 자료", "공개 자료와 적용 범위", "조달 요구는 완성 배터리에 대한 것이며 분리막 사양이 아닙니다. 본문은 기술 논의를 위한 것으로 시장 전망이 아닙니다."],
  ja: ["参考資料", "公開情報と適用範囲", "調達条件は完成電池向けでありセパレーター仕様ではありません。本記事は技術検討用で、市場予測ではありません。"],
  es: ["Referencias", "Fuentes públicas y alcance", "Los requisitos de compra corresponden a baterías terminadas, no a una especificación del separador. El artículo es informativo y no constituye una previsión de mercado."],
  pt: ["Referências", "Fontes públicas e escopo", "Os requisitos de compra são da bateria completa, não uma especificação do separador. O artigo é informativo e não constitui previsão de mercado."],
  ru: ["Источники", "Открытые данные и область применения", "Закупочные требования относятся к готовым батареям, а не к спецификации сепаратора. Материал предназначен для технического обсуждения и не является прогнозом рынка."]
};

const dataCenterReferenceItems = [
  ["Deloitte — AI and data center power demand", "https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2025/genai-power-consumption-creates-need-for-more-sustainable-data-centers.html"],
  ["PLA Procurement — UPS battery purchase notice", "https://www.plap.mil.cn/freecms/site/juncai/ggxx/info/2026/8a1d03e69cd1fb5c019cf579069f769f.html"],
  ["Journal of Power Sources — closed oxygen cycle in VRLA batteries", "https://doi.org/10.1016/S0378-7753(99)00396-1"],
  ["Journal of Power Sources — AGM compression-recovery model", "https://doi.org/10.1016/j.jpowsour.2017.08.055"],
  ["SMM — lead-acid batteries in storage and base-station backup", "https://news.smm.cn/news/103776664"]
];

const thirdPoleTopics = {
  vi: { title: "‘Cực thứ ba’ của ắc quy là gì? Tấm ngăn AGM thực sự làm gì?", summary: "‘Cực thứ ba’ chỉ là phép ẩn dụ. Tấm ngăn AGM phải được đánh giá cùng toàn bộ hệ VRLA về cách ly bản cực, giữ điện phân, đường oxy và nén.", intro: "Tấm ngăn AGM không có đầu cực và không tạo điện áp. Nó là giao diện làm việc quan trọng giữa các bản cực, không phải điện cực thứ ba.", sections: [["Ý nghĩa", "Ẩn dụ hữu ích, không phải điện cực thứ ba", "Cụm từ này nhấn mạnh tầm quan trọng của tấm ngăn; không phải phân loại điện hóa chính thức."], ["Cách ly", "Ngăn tiếp xúc điện tử trực tiếp", "Tấm ngăn giữ hai bản cực tách nhau, còn ion di chuyển qua các lỗ đã thấm điện phân."], ["Điện phân", "Sợi thủy tinh giữ và phân phối axit", "Độ hấp thụ cần phù hợp với lỗ rỗng, lượng axit, bản cực và điều kiện lắp ráp."], ["Oxy", "Hỗ trợ đường vận chuyển oxy", "Lỗ liên thông và trạng thái bão hòa một phần chỉ là một phần của cơ chế tái hợp oxy."], ["Nén", "Tiếp xúc và nén cần được phối hợp", "Độ dày và trạng thái nén phải được xem cùng nhóm bản cực và phương pháp lắp ráp."], ["Xác nhận", "Kiểm tra trong ắc quy hoàn chỉnh", "Dữ liệu vật liệu hỗ trợ sàng lọc; thử nghiệm ắc quy hoàn chỉnh mới xác nhận mức phù hợp."]], parameters: [["Cách ly bản cực", "Độ dày, kích thước và trạng thái cơ học."], ["Giữ điện phân", "Độ rỗng, định lượng và đặc tính liên quan đến hấp thụ."], ["Đường oxy", "Lỗ rỗng, trạng thái giữ chất lỏng và nén."], ["Tiếp xúc", "Độ dày, nén và hồi phục."]], checklist: ["Loại ắc quy và cấu trúc nhóm bản cực", "Độ dày, chiều rộng hoặc kích thước tấm", "Lượng axit và điều kiện lắp ráp", "Áp lực nhóm bản cực và phương pháp thử", "Giai đoạn mẫu hoặc sản xuất"] },
  ko: { title: "배터리의 ‘제3극’이란? AGM 분리막이 실제로 하는 일", summary: "‘제3극’은 비유일 뿐입니다. AGM 분리막은 판 분리, 전해액 유지, 산소 통로 및 압축 상태를 VRLA 배터리 전체에서 검증해야 합니다.", intro: "AGM 분리막에는 단자가 없고 전압을 만들지 않습니다. 이는 제3 전극이 아니라 극판 사이의 중요한 작동 인터페이스입니다.", sections: [["의미", "유용한 비유이지 제3 전극은 아님", "이 표현은 분리막의 중요성을 강조하지만 공식 전기화학 분류는 아닙니다."], ["절연", "직접 전자 접촉 방지", "분리막은 양·음극판의 직접 접촉을 막고, 이온은 전해액으로 젖은 기공을 통해 이동합니다."], ["전해액", "유리 미세섬유가 전해액을 유지·분배", "흡액량은 기공, 산량, 극판 및 조립 조건과 함께 맞춰야 합니다."], ["산소", "산소 이동 조건 지원", "연결 기공과 부분 포화는 산소 재결합 조건의 한 요소일 뿐입니다."], ["압축", "접촉과 압축의 조화", "두께와 압축 상태는 극군 구조 및 조립 방법과 함께 검토해야 합니다."], ["검증", "완성 배터리에서 확인", "소재 데이터는 선별에 도움이 되지만 적합성은 완성 배터리 시험으로 확인합니다."]], parameters: [["극판 분리", "두께, 치수 및 기계적 상태."], ["전해액 유지", "공극률, 평량 및 흡액 관련 거동."], ["산소 통로", "기공, 액 보유 상태 및 압축."], ["접촉", "두께, 압축 및 회복."]], checklist: ["배터리 종류와 극군 구조", "목표 두께·폭 또는 시트 치수", "산량과 조립 조건", "극군 압력 및 시험 방법", "샘플 또는 양산 단계"] },
  ja: { title: "電池の「第三極」とは？AGM セパレーターの実際の役割", summary: "「第三極」は比喩です。AGM セパレーターは極板分離、電解液保持、酸素経路、圧縮状態を VRLA 電池全体で評価する必要があります。", intro: "AGM セパレーターには端子がなく、電圧も発生させません。第三の電極ではなく、極板間の重要な機能界面です。", sections: [["意味", "有用な比喩であり第三電極ではない", "この表現は重要性を示しますが、正式な電気化学分類ではありません。"], ["分離", "直接の電子接触を防ぐ", "セパレーターは極板の接触を防ぎ、イオンは電解液で濡れた孔を通って移動します。"], ["電解液", "ガラス微細繊維が電解液を保持・分配", "吸液性は孔構造、酸量、極板、組立条件と合わせて検討します。"], ["酸素", "酸素移動の条件を支える", "連通孔と部分飽和は酸素再結合条件の一部にすぎません。"], ["圧縮", "接触と圧縮の整合", "厚さと圧縮状態は極群構造・組立方法とともに確認します。"], ["検証", "完成電池で検証する", "材料データは選定を助けますが、適合性は完成電池試験で確認します。"]], parameters: [["極板分離", "厚さ、寸法、機械的状態。"], ["電解液保持", "空隙率、坪量、吸液関連特性。"], ["酸素経路", "孔構造、保液状態、圧縮。"], ["接触", "厚さ、圧縮、復元性。"]], checklist: ["電池種と極群構造", "目標厚さ・幅またはシート寸法", "酸量と組立条件", "極群圧力と試験方法", "サンプルまたは量産段階"] },
  es: { title: "¿Qué es el ‘tercer polo’ de una batería? La función real del separador AGM", summary: "El ‘tercer polo’ es una metáfora. El separador AGM debe evaluarse en la batería VRLA completa: separación de placas, retención de electrolito, vías de oxígeno y compresión.", intro: "El separador AGM no tiene terminal ni produce voltaje. Es una interfaz de trabajo importante entre placas, no un tercer electrodo.", sections: [["Significado", "Una metáfora útil, no un tercer electrodo", "La expresión destaca la importancia del separador, pero no es una clasificación electroquímica formal."], ["Separación", "Evita el contacto electrónico directo", "Mantiene separadas las placas y los iones migran por poros humedecidos con electrolito."], ["Electrolito", "Las microfibras retienen y distribuyen ácido", "La absorción debe ajustarse a poros, volumen de ácido, placas y montaje."], ["Oxígeno", "Apoya condiciones de transporte de oxígeno", "Los poros conectados y la saturación parcial son solo una parte de la recombinación."], ["Compresión", "El contacto y la compresión deben coincidir", "Espesor y compresión se revisan con el grupo de placas y el método de montaje."], ["Validación", "Confirmar en la batería completa", "Los datos de material ayudan a seleccionar; la validación de la batería completa confirma la compatibilidad."]], parameters: [["Separación de placas", "Espesor, dimensiones y condición mecánica."], ["Retención de electrolito", "Porosidad, gramaje y comportamiento de absorción."], ["Vía de oxígeno", "Poros, estado de líquido y compresión."], ["Contacto", "Espesor, compresión y recuperación."]], checklist: ["Tipo de batería y estructura del grupo", "Espesor, ancho o tamaño de lámina", "Volumen de ácido y montaje", "Presión del grupo y método de ensayo", "Etapa de muestra o producción"] },
  pt: { title: "O que é o ‘terceiro polo’ da bateria? A função real do separador AGM", summary: "‘Terceiro polo’ é uma metáfora. O separador AGM deve ser avaliado na bateria VRLA completa: separação de placas, retenção de eletrólito, vias de oxigênio e compressão.", intro: "O separador AGM não tem terminal e não produz tensão. É uma interface funcional importante entre as placas, não um terceiro eletrodo.", sections: [["Significado", "Metáfora útil, não terceiro eletrodo", "A expressão destaca a importância do separador, mas não é uma classificação eletroquímica formal."], ["Separação", "Evita contato eletrônico direto", "Mantém as placas separadas; íons migram por poros umedecidos pelo eletrólito."], ["Eletrólito", "Microfibras retêm e distribuem ácido", "A absorção deve corresponder a poros, volume de ácido, placas e montagem."], ["Oxigênio", "Apoia condições para transporte de oxigênio", "Poros conectados e saturação parcial são apenas parte da recombinação."], ["Compressão", "Contato e compressão devem combinar", "Espessura e compressão são avaliadas com o grupo de placas e a montagem."], ["Validação", "Confirmar na bateria completa", "Dados do material ajudam na triagem; o ensaio da bateria completa confirma a compatibilidade."]], parameters: [["Separação de placas", "Espessura, dimensões e condição mecânica."], ["Retenção de eletrólito", "Porosidade, gramatura e comportamento de absorção."], ["Via de oxigênio", "Poros, retenção de líquido e compressão."], ["Contato", "Espessura, compressão e recuperação."]], checklist: ["Tipo de bateria e grupo de placas", "Espessura, largura ou tamanho de folha", "Volume de ácido e montagem", "Pressão do grupo e método de ensaio", "Fase de amostra ou produção"] },
  ru: { title: "«Третий полюс» батареи: что на самом деле делает AGM-сепаратор?", summary: "«Третий полюс» — это метафора. AGM-сепаратор оценивают в полной VRLA-батарее: разделение пластин, удержание электролита, пути кислорода и сжатие.", intro: "У AGM-сепаратора нет вывода и он не создаёт напряжение. Это важный рабочий интерфейс между пластинами, а не третий электрод.", sections: [["Смысл", "Полезная метафора, но не третий электрод", "Выражение подчёркивает важность сепаратора, но не является формальной электрохимической классификацией."], ["Разделение", "Предотвращает прямой электронный контакт", "Сепаратор разделяет пластины, а ионы перемещаются по смоченным электролитом порам."], ["Электролит", "Микроволокна удерживают и распределяют кислоту", "Поглощение должно соответствовать порам, объёму кислоты, пластинам и сборке."], ["Кислород", "Поддерживает условия переноса кислорода", "Связанные поры и частичное насыщение — лишь часть рекомбинации кислорода."], ["Сжатие", "Контакт и сжатие должны быть согласованы", "Толщину и сжатие проверяют вместе с блоком пластин и способом сборки."], ["Проверка", "Подтверждать в готовой батарее", "Данные материала помогают отбору; совместимость подтверждает испытание полной батареи."]], parameters: [["Разделение пластин", "Толщина, размеры и механическое состояние."], ["Удержание электролита", "Пористость, масса на площадь и поглощение."], ["Путь кислорода", "Поры, удержание жидкости и сжатие."], ["Контакт", "Толщина, сжатие и восстановление."]], checklist: ["Тип батареи и конструкция блока", "Толщина, ширина или размер листа", "Объём кислоты и условия сборки", "Давление блока и метод испытаний", "Стадия образца или серийного выпуска"] }
};

const thirdPoleReferenceItems = [
  ["CN105006540B — Battery Separator Production System and Production Method", "https://patents.google.com/patent/CN105006540B/zh"],
  ["Sandia National Laboratories — SAND2014-17394B", "https://www.osti.gov/servlets/purl/1502636"],
  ["Hollingsworth & Vose — AGM Battery Separators", "https://www.hollingsworth-vose.com/products/energy-solutions/agm-lead-battery/"],
  ["Hollingsworth & Vose — Testing Standards", "https://www.hollingsworth-vose.com/innovation/testing-standards/"]
];

const thirdPoleReferenceNotes = {
  vi: "Tài liệu công khai chỉ cung cấp bối cảnh kỹ thuật. Chúng không xác nhận thông số Viking hoặc bảo đảm kết quả của ắc quy hoàn chỉnh.",
  ko: "공개 자료는 기술적 배경만 제공합니다. Viking 사양이나 완성 배터리 결과를 보증하지 않습니다.",
  ja: "公開資料は技術的背景のみを示します。Viking の仕様や完成電池の結果を保証するものではありません。",
  es: "Los materiales públicos solo aportan contexto técnico. No verifican especificaciones de Viking ni garantizan resultados de la batería completa.",
  pt: "Os materiais públicos fornecem apenas contexto técnico. Não confirmam especificações da Viking nem garantem resultados da bateria completa.",
  ru: "Открытые материалы дают только технический контекст. Они не подтверждают спецификации Viking и не гарантируют результаты готовой батареи."
};

const energyDataDeliveryTopics = {
  vi: { title: "Dây chuyền tiết kiệm năng lượng: vì sao khách hàng quan tâm hơn đến giao hàng?", summary: "Dữ liệu năng lượng chỉ hỗ trợ đánh giá nhà cung cấp khi ranh giới, sản lượng, thời gian dừng máy và phiên bản dữ liệu có thể truy xuất.", intro: "Tiết kiệm điện không phải cam kết giao hàng, kiểm kê phát thải doanh nghiệp hay dấu chân carbon sản phẩm.", sections: [["Ví dụ", "Tiết kiệm năng lượng là dữ liệu doanh nghiệp", "Clarios công bố đầu tư và tiết kiệm điện tại các nhà máy EMEA; đây là công bố doanh nghiệp, không phải chuẩn ngành AGM hay bằng chứng về Viking."], ["Ranh giới", "Hiệu quả không bảo đảm giao hàng", "Hợp đồng năng lượng, cơ cấu sản phẩm, bảo trì, lịch sản xuất và giao hàng thực tế vẫn quyết định tính liên tục."], ["So sánh", "Tổng tiết kiệm của nhà máy khó so sánh", "Cần thống nhất đơn vị chức năng, sản lượng, phạm vi sản phẩm, kỳ báo cáo, ranh giới và nguồn dữ liệu."], ["Đường cơ sở", "Bắt đầu từ một dây chuyền xác định", "Kết nối điểm đo với sản lượng đạt, quy cách, tỷ lệ hao hụt và thời gian dừng máy."], ["Bằng chứng", "Mỗi loại bằng chứng có giới hạn", "Ước tính, số đọc công tơ, đối chiếu hóa đơn, phân bổ sản phẩm và xác minh độc lập trả lời các câu hỏi khác nhau."], ["Đánh giá", "Thống nhất phạm vi trước", "Xác định đơn vị chức năng, ranh giới và trường dữ liệu trước khi đánh giá yêu cầu cùng quy cách tấm ngăn."]], parameters: [["Điện", "Điểm đo, kỳ đọc, tiêu thụ và sản lượng tương ứng."], ["Tiện ích khác", "Khí, hơi hoặc nước và cơ sở đo khi phù hợp."], ["Sản lượng đạt", "Số lượng, quy cách và kỳ làm mẫu số."], ["Hao hụt và dừng máy", "Phương pháp ghi nhận và dừng có kế hoạch/không kế hoạch."], ["Phiên bản", "Thay đổi ranh giới, ngày cập nhật và phiên bản."]], checklist: ["Đơn vị chức năng và quy cách", "Kỳ báo cáo và nguồn dữ liệu", "Ranh giới sản xuất, tiện ích, đóng gói, vận tải", "Sản lượng, hao hụt và dừng máy", "Phiên bản và mẫu đánh giá"] },
  ko: { title: "생산라인이 에너지를 절감하면 구매자는 왜 납기를 더 볼까?", summary: "에너지 데이터는 경계, 생산량, 정지 시간과 데이터 버전을 추적할 수 있을 때만 공급업체 평가에 도움이 됩니다.", intro: "에너지 절감은 납기 약속, 기업 배출량 인벤토리 또는 제품 탄소발자국이 아닙니다.", sections: [["사례", "에너지 절감은 기업 공시 데이터", "Clarios의 EMEA 투자·절감은 기업 공시이며 AGM 산업 기준이나 Viking 성과의 증거가 아닙니다."], ["경계", "효율이 납기를 보장하지 않음", "에너지 계약, 제품 구성, 유지보수, 생산 일정과 실제 납기 기록이 연속성을 판단합니다."], ["비교", "공장 총절감은 직접 비교하기 어려움", "기능 단위, 생산량, 제품 범위, 기간, 경계와 데이터 출처를 맞춰야 합니다."], ["기준선", "정의된 라인부터 시작", "계량 지점을 양품 생산량, 사양, 수율, 손실 및 정지 시간과 연결합니다."], ["증거", "증거마다 한계가 다름", "추정치, 계량값, 청구서 대조, 제품 배분 및 독립 검증은 서로 다른 질문에 답합니다."], ["검토", "먼저 범위를 맞춤", "분리막 사양과 함께 기능 단위, 경계 및 필요 필드를 먼저 정합니다."]], parameters: [["전력", "계량 지점, 기간, 소비량 및 해당 생산량."], ["기타 유틸리티", "해당 시 가스·증기·물의 범위와 계량 기준."], ["양품 생산량", "분모가 되는 수량, 사양 및 기간."], ["수율·정지", "손실 기록과 계획/비계획 정지."], ["버전", "경계 변경, 갱신일 및 버전."]], checklist: ["기능 단위와 사양", "보고 기간과 데이터 출처", "생산·유틸리티·포장·운송 경계", "생산량·손실·정지 처리", "버전과 검토 양식"] },
  ja: { title: "生産ラインが省エネ化すると、なぜ顧客は納入をより重視するのか", summary: "エネルギーデータは、境界・生産量・停止時間・データ版が追跡できる場合にのみ、サプライヤー評価の参考になります。", intro: "省エネは納入保証、企業GHGインベントリ、製品カーボンフットプリントではありません。", sections: [["事例", "省エネは企業開示データ", "ClariosのEMEA投資・節電は企業開示であり、AGM業界ベンチマークやVikingの実績証明ではありません。"], ["境界", "効率は納入を保証しない", "エネルギー契約、製品構成、保全、計画、実納入記録が継続性の判断に必要です。"], ["比較", "工場総節電は直接比較しにくい", "機能単位、生産量、製品範囲、期間、境界、データ源を揃える必要があります。"], ["基準線", "定義したラインから始める", "計量点を良品量、仕様、歩留まり、損失、停止時間に結び付けます。"], ["証拠", "証拠ごとに限界が異なる", "見積り、計量値、請求書照合、製品配分、第三者確認は別の問いに答えます。"], ["レビュー", "先に範囲を合わせる", "分離膜仕様とともに機能単位、境界、必要項目を明確にします。"]], parameters: [["電力", "計量点、期間、消費量、対応する生産量。"], ["その他ユーティリティ", "必要に応じたガス・蒸気・水の範囲と計量基準。"], ["良品生産量", "分母となる数量、仕様、期間。"], ["歩留まり・停止", "損失記録と計画／非計画停止。"], ["版", "境界変更、更新日、版。"]], checklist: ["機能単位と仕様", "報告期間とデータ源", "生産・ユーティリティ・包装・輸送境界", "生産量・損失・停止の扱い", "版とレビュー様式"] },
  es: { title: "Una línea ahorra energía: ¿por qué al comprador le puede importar más la entrega?", summary: "Los datos energéticos solo ayudan a evaluar a un proveedor cuando el límite, la producción, las paradas y la versión son trazables.", intro: "El ahorro de energía no es una promesa de entrega, un inventario corporativo de GEI ni una huella de carbono de producto.", sections: [["Ejemplo", "El ahorro energético es una divulgación corporativa", "La inversión y el ahorro de Clarios en EMEA son una divulgación corporativa, no un referente AGM ni evidencia de Viking."], ["Límite", "La eficiencia no garantiza la entrega", "Contratos de energía, mezcla de productos, mantenimiento, programación y entregas reales siguen determinando la continuidad."], ["Comparación", "El ahorro total de fábrica no compara proveedores", "Hay que alinear unidad funcional, producción, alcance, periodo, límite y fuente de datos."], ["Línea base", "Empezar por una línea definida", "Vincular puntos de medición con producción conforme, especificaciones, rendimiento, pérdidas y paradas."], ["Evidencia", "Cada evidencia tiene límites", "Estimaciones, medidores, facturas, asignación de producto y verificación independiente responden preguntas distintas."], ["Revisión", "Alinear el alcance primero", "Definir unidad funcional, límite y campos necesarios junto con la especificación del separador."]], parameters: [["Electricidad", "Punto de medición, periodo, consumo y producción correspondiente."], ["Otros servicios", "Alcance y base de medición de gas, vapor o agua."], ["Producción conforme", "Cantidad, especificación y periodo del denominador."], ["Rendimiento y paradas", "Registro de pérdidas y paradas planificadas/no planificadas."], ["Versión", "Cambios de límite, fecha de actualización y versión."]], checklist: ["Unidad funcional y especificación", "Periodo y fuente de datos", "Límite de producción, servicios, embalaje y transporte", "Producción, pérdidas y paradas", "Versión y formato de revisión"] },
  pt: { title: "Uma linha economiza energia: por que o cliente pode se importar mais com a entrega?", summary: "Dados de energia ajudam a avaliar fornecedores apenas quando limite, produção, paradas e versão são rastreáveis.", intro: "Economia de energia não é promessa de entrega, inventário corporativo de GEE nem pegada de carbono de produto.", sections: [["Exemplo", "Economia é divulgação corporativa", "O investimento e a economia da Clarios em EMEA são divulgação corporativa, não referência AGM nem evidência da Viking."], ["Limite", "Eficiência não garante entrega", "Contratos de energia, mix de produtos, manutenção, programação e entregas reais ainda determinam continuidade."], ["Comparação", "Economia total da fábrica não compara fornecedores", "É preciso alinhar unidade funcional, produção, escopo, período, limite e fonte de dados."], ["Linha de base", "Começar por uma linha definida", "Ligar pontos de medição à produção aprovada, especificações, rendimento, perdas e paradas."], ["Evidência", "Cada evidência tem limites", "Estimativas, medidores, faturas, alocação de produto e verificação independente respondem perguntas diferentes."], ["Revisão", "Alinhar o escopo primeiro", "Definir unidade funcional, limite e campos necessários junto com a especificação do separador."]], parameters: [["Eletricidade", "Ponto de medição, período, consumo e produção correspondente."], ["Outras utilidades", "Escopo e base de medição de gás, vapor ou água."], ["Produção aprovada", "Quantidade, especificação e período do denominador."], ["Rendimento e paradas", "Registro de perdas e paradas planejadas/não planejadas."], ["Versão", "Mudanças de limite, data de atualização e versão."]], checklist: ["Unidade funcional e especificação", "Período e fonte de dados", "Limite de produção, utilidades, embalagem e transporte", "Produção, perdas e paradas", "Versão e formato de revisão"] },
  ru: { title: "Линия экономит энергию: почему покупателя может больше волновать поставка?", summary: "Энергетические данные помогают оценке поставщика только при прослеживаемых границе, выпуске, простоях и версии набора данных.", intro: "Экономия энергии не является обещанием поставки, корпоративным инвентарём выбросов или углеродным следом продукта.", sections: [["Пример", "Экономия энергии — корпоративное раскрытие", "Инвестиции и экономия Clarios в EMEA — корпоративное раскрытие, а не AGM-бенчмарк и не доказательство показателей Viking."], ["Граница", "Эффективность не гарантирует поставку", "Энергоконтракты, ассортимент, обслуживание, график и фактические поставки определяют непрерывность."], ["Сравнение", "Суммарная экономия завода не сравнивает поставщиков", "Нужно согласовать функциональную единицу, выпуск, ассортимент, период, границу и источник данных."], ["Базовая линия", "Начинать с определённой линии", "Связать точки учёта с годным выпуском, спецификацией, выходом, потерями и простоями."], ["Доказательства", "У каждого вида доказательств есть границы", "Оценки, счётчики, счета, распределение по продукту и независимая проверка отвечают на разные вопросы."], ["Проверка", "Сначала согласовать охват", "Определить функциональную единицу, границу и нужные поля вместе со спецификацией сепаратора."]], parameters: [["Электричество", "Точка учёта, период, потребление и соответствующий выпуск."], ["Прочие ресурсы", "Границы и основа учёта газа, пара или воды."], ["Годный выпуск", "Количество, спецификация и период для знаменателя."], ["Выход и простои", "Учёт потерь и плановых/внеплановых простоев."], ["Версия", "Изменения границы, дата обновления и версия."]], checklist: ["Функциональная единица и спецификация", "Период и источник данных", "Граница производства, ресурсов, упаковки и транспорта", "Выпуск, потери и простои", "Версия и формат проверки"] }
};

const energyDataDeliveryReferenceItems = [["Clarios — Energy efficiency across European operations and supply reliability", "https://www.clarios.com/pt/insights/news/news-detail/clarios-energy-efficiency-europe-supply-reliability"]];
const energyDataDeliveryReferenceNotes = {
  vi: "Thông tin đầu tư, địa điểm và tiết kiệm điện là công bố doanh nghiệp Clarios, không phải kiểm toán độc lập, chuẩn ngành AGM hay bằng chứng về Viking.",
  ko: "투자·공장·절감 정보는 Clarios의 기업 공시이며 독립 감사, AGM 산업 기준 또는 Viking 성과의 증거가 아닙니다.",
  ja: "投資・工場・節電情報はClariosの企業開示であり、第三者監査、AGM業界基準、Vikingの実績証明ではありません。",
  es: "La inversión, plantas y ahorro son divulgación corporativa de Clarios, no una auditoría independiente, un referente AGM ni evidencia de Viking.",
  pt: "O investimento, as plantas e a economia são divulgação corporativa da Clarios, não auditoria independente, referência AGM ou evidência da Viking.",
  ru: "Инвестиции, заводы и экономия — корпоративное раскрытие Clarios, а не независимый аудит, AGM-бенчмарк или доказательство показателей Viking."
};

const en18060BatteryStandardTopics = {
  vi: { title: "EN 18060:2025 bao phủ những pin xe đường bộ nào? Nhà cung cấp ắc quy chì và AGM cần hiểu gì?", summary: "Danh mục tiêu chuẩn hài hòa nêu mô-đun và pin EV sạc lại dùng cho xe đường bộ, gồm Li-ion, Na-ion, Pb, NiMH và hóa học kết hợp; điều đó không đồng nghĩa AGM được chứng nhận riêng.", intro: "Quyết định (EU) 2026/2048 liệt kê EN 18060:2025 để hỗ trợ Regulation (EU) 2023/1542. Phạm vi ở cấp tiêu đề không tự xác nhận mọi pin chì-axit, AGM, UPS hoặc pin tĩnh là áp dụng.", sections: [["Danh mục", "Tiêu chuẩn hài hòa được công bố", "Trang Ủy ban châu Âu nêu Quyết định (EU) 2026/2048. Hãy đọc toàn văn tiêu chuẩn trước khi kết luận về sản phẩm."], ["Phạm vi", "Pb được nêu cùng các hóa học khác", "Tiêu đề nói về mô-đun và pin EV sạc lại cho xe đường bộ, gồm Li-ion, Na-ion, Pb, NiMH và hóa học kết hợp."], ["So sánh", "Không phải một thước điểm chung", "Danh mục chung không chứng minh các hóa học dùng cùng phép thử, ngưỡng hoặc kết quả có thể so sánh trực tiếp."], ["AGM", "Tấm ngăn không phải pin được chứng nhận riêng", "Dữ liệu vật liệu AGM không thay thế xác nhận pin hoàn chỉnh, và danh mục không phải tiêu chuẩn chứng nhận riêng cho tấm ngăn."], ["FAQ", "Nhà sản xuất xác nhận áp dụng thế nào?", "Xác định phân loại mô-đun hoặc pin EV xe đường bộ, nghĩa vụ quy định, toàn văn EN 18060:2025 và kế hoạch xác nhận pin hoàn chỉnh."], ["Hành động", "Đối chiếu dữ liệu tấm ngăn với kế hoạch pin", "Cùng thống nhất ứng dụng, cấu trúc nhóm bản cực, kích thước, dạng cuộn hoặc tấm, điều kiện lắp ráp và phạm vi xác nhận."]], parameters: [["Phân loại", "Mô-đun hoặc pin EV sạc lại cho xe đường bộ."], ["Văn bản", "Toàn văn EN 18060:2025 và phiên bản áp dụng."], ["Xác nhận", "Phạm vi và trách nhiệm thử pin hoàn chỉnh."], ["Tấm ngăn", "Thông số, phương pháp, trạng thái mẫu và hồ sơ lô."]], checklist: ["Phân loại sản phẩm và hóa học", "Ứng dụng pin và cấu trúc bản cực", "Độ dày, chiều rộng hoặc kích thước tấm", "Dạng cuộn/tấm và điều kiện lắp ráp", "Phạm vi xác nhận pin hoàn chỉnh và giai đoạn dự án"] },
  ko: { title: "EN 18060:2025는 어떤 도로 차량 배터리를 포괄하나? 납산·AGM 공급업체가 알아야 할 점", summary: "조화 표준의 제목은 Li-ion, Na-ion, Pb, NiMH 및 복합 화학계를 포함한 도로 차량용 충전식 EV 모듈·배터리를 말합니다. 이것이 AGM 분리막의 별도 인증을 뜻하지는 않습니다.", intro: "결정 (EU) 2026/2048은 Regulation (EU) 2023/1542를 지원하는 EN 18060:2025를 열거합니다. 제목 수준의 범위는 모든 납산, AGM, UPS 또는 고정식 배터리에 대한 적용 판정이 아닙니다.", sections: [["공개 목록", "조화 표준이 공표됨", "유럽위원회 페이지는 결정 (EU) 2026/2048을 제시합니다. 제품 결론 전 표준 전문을 검토해야 합니다."], ["범위", "Pb가 다른 화학계와 함께 열거됨", "제목은 Li-ion, Na-ion, Pb, NiMH 및 복합 화학계의 도로 차량용 충전식 EV 모듈·배터리를 말합니다."], ["비교", "하나의 점수표가 아님", "공통 제목이 동일 시험, 한계값 또는 직접 비교 가능한 결과를 뜻하지는 않습니다."], ["AGM", "분리막은 별도 인증된 배터리가 아님", "AGM 소재 데이터는 완성 배터리 검증을 대체하지 않으며 목록은 분리막 단독 인증 표준이 아닙니다."], ["FAQ", "납산 제조사는 어떻게 확인하나?", "도로 차량 EV 모듈·배터리 분류, 규정 의무, EN 18060:2025 전문과 완성 배터리 검증 계획을 확인합니다."], ["조치", "분리막 증거를 배터리 계획과 맞춤", "용도, 극군 구조, 치수, 롤·시트 형태, 조립 조건 및 검증 범위를 합의합니다."]], parameters: [["분류", "도로 차량용 충전식 EV 모듈 또는 배터리."], ["표준", "EN 18060:2025 전문 및 적용 판."], ["검증", "완성 배터리 시험 범위와 책임."], ["분리막", "사양, 방법, 시료 상태와 배치 기록."]], checklist: ["제품 분류와 화학계", "배터리 용도와 극군 구조", "두께·폭 또는 시트 치수", "롤/시트와 조립 조건", "완성 배터리 검증 범위와 프로젝트 단계"] },
  ja: { title: "EN 18060:2025 はどの道路車両用電池を対象とするか：鉛蓄電池・AGM 供給者の確認点", summary: "整合規格の題名は、Li-ion、Na-ion、Pb、NiMH、複合化学系を含む道路車両用の充電式 EV モジュール・電池を示します。AGM セパレーター単独の認証を意味しません。", intro: "決定 (EU) 2026/2048 は Regulation (EU) 2023/1542 を支援する EN 18060:2025 を掲載しています。題名の範囲だけで、すべての鉛蓄電池、AGM、UPS、定置用電池への適用は判断できません。", sections: [["掲載", "整合規格として公表", "欧州委員会ページは決定 (EU) 2026/2048 を示します。製品結論の前に規格本文を確認します。"], ["範囲", "Pb は他の化学系と併記", "題名は Li-ion、Na-ion、Pb、NiMH、複合化学系の道路車両用充電式 EV モジュール・電池を対象とします。"], ["比較", "共通の採点表ではない", "同じ題名にあることは、同一試験、閾値、または直接比較可能な結果を示しません。"], ["AGM", "セパレーターは単独認証される電池ではない", "AGM 材料データは完成電池の検証を代替せず、掲載はセパレーター単独認証規格ではありません。"], ["FAQ", "鉛蓄電池メーカーはどう確認するか", "道路車両 EV モジュール・電池の分類、規制上の義務、EN 18060:2025 本文、完成電池検証計画を確認します。"], ["対応", "セパレーター証拠を電池計画と整合", "用途、極群構造、寸法、ロール・シート、組立条件、検証範囲をそろえます。"]], parameters: [["分類", "道路車両用充電式 EV モジュールまたは電池。"], ["規格", "EN 18060:2025 本文と適用版。"], ["検証", "完成電池試験の範囲と責任。"], ["セパレーター", "仕様、方法、試料状態、ロット記録。"]], checklist: ["製品分類と化学系", "電池用途と極群構造", "厚さ・幅またはシート寸法", "ロール/シートと組立条件", "完成電池検証範囲とプロジェクト段階"] },
  es: { title: "¿Qué baterías de vehículos cubre EN 18060:2025? Lo que deben entender proveedores de plomo-ácido y AGM", summary: "El título de la norma armonizada nombra módulos y baterías EV recargables para vehículos de carretera, incluidos Li-ion, Na-ion, Pb, NiMH y químicas combinadas; no certifica por separado al separador AGM.", intro: "La Decisión (UE) 2026/2048 lista EN 18060:2025 en apoyo del Reglamento (UE) 2023/1542. El alcance del título no confirma la aplicabilidad a toda batería de plomo-ácido, AGM, UPS o estacionaria.", sections: [["Listado", "La norma armonizada se publicó", "La página de la Comisión identifica la Decisión (UE) 2026/2048. Revise el texto completo antes de concluir sobre un producto."], ["Alcance", "Pb figura junto a otras químicas", "El título se refiere a módulos y baterías EV recargables para vehículos de carretera, con Li-ion, Na-ion, Pb, NiMH y químicas combinadas."], ["Comparación", "No es una sola escala", "Un título común no demuestra ensayos, umbrales ni resultados directamente comparables."], ["AGM", "El separador no es una batería certificada por separado", "Los datos de material AGM no sustituyen la validación de la batería completa, y el listado no es una norma de certificación individual del separador."], ["FAQ", "¿Cómo confirma la relevancia un fabricante?", "Confirme la clasificación del módulo o batería EV de carretera, obligaciones regulatorias, el texto de EN 18060:2025 y el plan de validación de batería completa."], ["Acción", "Alinear evidencia del separador y plan de batería", "Alinee aplicación, grupo de placas, dimensiones, formato de rollo o lámina, montaje y alcance de validación."]], parameters: [["Clasificación", "Módulo o batería EV recargable para vehículo de carretera."], ["Norma", "Texto completo y edición aplicable de EN 18060:2025."], ["Validación", "Alcance y responsable de los ensayos de batería completa."], ["Separador", "Especificación, método, estado de muestra y registro de lote."]], checklist: ["Clasificación y química del producto", "Aplicación y grupo de placas", "Espesor, ancho o tamaño de lámina", "Rollo/lámina y montaje", "Alcance de validación de batería completa y fase del proyecto"] },
  pt: { title: "Quais baterias de veículos EN 18060:2025 cobre? O que fornecedores de chumbo-ácido e AGM devem entender", summary: "O título da norma harmonizada cita módulos e baterias EV recarregáveis para veículos rodoviários, incluindo Li-ion, Na-ion, Pb, NiMH e químicas combinadas; isso não certifica o separador AGM isoladamente.", intro: "A Decisão (UE) 2026/2048 lista a EN 18060:2025 em apoio ao Regulamento (UE) 2023/1542. O escopo do título não confirma aplicação a toda bateria chumbo-ácido, AGM, UPS ou estacionária.", sections: [["Listagem", "A norma harmonizada foi publicada", "A página da Comissão identifica a Decisão (UE) 2026/2048. Leia a norma completa antes de concluir sobre um produto."], ["Escopo", "Pb aparece com outras químicas", "O título trata de módulos e baterias EV recarregáveis para veículos rodoviários com Li-ion, Na-ion, Pb, NiMH e químicas combinadas."], ["Comparação", "Não é uma única régua", "Um título comum não prova ensaios, limites ou resultados diretamente comparáveis."], ["AGM", "O separador não é uma bateria certificada isoladamente", "Dados do material AGM não substituem validação da bateria completa, e a listagem não é norma de certificação individual do separador."], ["FAQ", "Como o fabricante confirma a relevância?", "Confirme a classificação do módulo ou bateria EV rodoviária, obrigações regulatórias, o texto da EN 18060:2025 e o plano de validação da bateria completa."], ["Ação", "Alinhar evidência do separador ao plano da bateria", "Alinhe aplicação, grupo de placas, dimensões, formato em rolo ou folha, montagem e escopo de validação."]], parameters: [["Classificação", "Módulo ou bateria EV recarregável para veículo rodoviário."], ["Norma", "Texto completo e edição aplicável da EN 18060:2025."], ["Validação", "Escopo e responsável pelos ensaios da bateria completa."], ["Separador", "Especificação, método, estado da amostra e registro de lote."]], checklist: ["Classificação e química do produto", "Aplicação e grupo de placas", "Espessura, largura ou dimensão da folha", "Rolo/folha e montagem", "Escopo de validação da bateria completa e fase do projeto"] },
  ru: { title: "Какие автомобильные батареи охватывает EN 18060:2025: что важно поставщикам свинцово-кислотных батарей и AGM", summary: "Название гармонизированного стандарта указывает перезаряжаемые EV-модули и батареи для дорожных транспортных средств, включая Li-ion, Na-ion, Pb, NiMH и комбинированные химии; оно не сертифицирует AGM-сепаратор отдельно.", intro: "Решение (ЕС) 2026/2048 включает EN 18060:2025 в поддержку Регламента (ЕС) 2023/1542. Уровень названия не подтверждает применимость ко всем свинцово-кислотным, AGM, ИБП или стационарным батареям.", sections: [["Публикация", "Гармонизированный стандарт опубликован", "Страница Комиссии указывает Решение (ЕС) 2026/2048. Перед выводом по продукту изучите полный текст стандарта."], ["Охват", "Pb указан наряду с другими химиями", "Название относится к перезаряжаемым EV-модулям и батареям для дорожных транспортных средств с Li-ion, Na-ion, Pb, NiMH и комбинированными химиями."], ["Сравнение", "Это не единая шкала", "Общее название не доказывает одинаковые испытания, пороги или прямо сопоставимые результаты."], ["AGM", "Сепаратор не является отдельно сертифицированной батареей", "Данные AGM-материала не заменяют проверку готовой батареи, а перечень не является стандартом отдельной сертификации сепаратора."], ["FAQ", "Как изготовителю подтвердить применимость?", "Подтвердите классификацию дорожного EV-модуля или батареи, регуляторные обязанности, текст EN 18060:2025 и план проверки готовой батареи."], ["Действие", "Согласовать доказательства по сепаратору с планом батареи", "Согласуйте применение, конструкцию блока пластин, размеры, рулон или лист, сборку и границы проверки."]], parameters: [["Классификация", "Перезаряжаемый EV-модуль или батарея для дорожного транспорта."], ["Стандарт", "Полный текст EN 18060:2025 и применяемая редакция."], ["Проверка", "Объём и ответственный за испытания готовой батареи."], ["Сепаратор", "Спецификация, метод, состояние образца и запись партии."]], checklist: ["Классификация и химия продукта", "Применение батареи и блок пластин", "Толщина, ширина или размер листа", "Рулон/лист и условия сборки", "Объём проверки готовой батареи и стадия проекта"] }
};

const dataCenterEvLowVoltageAgmTopics = {
  vi: { title: "Vì sao trung tâm dữ liệu AI và xe điện vẫn có thể cần nguồn điện áp thấp axit-chì?", summary: "Nguồn dự phòng trung tâm dữ liệu và hệ thống điện áp thấp EV có nhiệm vụ khác nhau; việc chọn AGM phải theo thiết kế pin và xác nhận pin hoàn chỉnh.", intro: "LEOCH tại ELBC 2026 nêu quan điểm doanh nghiệp rằng nhu cầu axit-chì ở châu Á được hỗ trợ bởi hạ tầng trung tâm dữ liệu, viễn thông và vai trò nguồn điện áp thấp trong nhiều EV. Đây không phải báo cáo quy mô thị trường độc lập hay dự báo định lượng.", sections: [["Nguồn", "Quan điểm doanh nghiệp, không phải dự báo thị trường", "Trang LEOCH xác nhận sự quy thuộc quan điểm này nhưng không nêu quy mô, tốc độ tăng, tỷ lệ sử dụng hay số liệu theo ứng dụng. Không suy ra nhu cầu dự án hoặc dự báo khu vực từ tuyên bố đó."], ["Trung tâm dữ liệu", "Pin dự phòng được chọn theo hệ thống", "Trong kiến trúc trung tâm dữ liệu hoặc UPS, pin phục vụ trạng thái sẵn sàng và cấp nguồn khi hệ thống yêu cầu. Công nghệ, thời lượng, bảo trì và xác nhận là quyết định của hệ thống; không phải mọi trung tâm dữ liệu dùng cùng hóa học hoặc VRLA."], ["EV", "Pin điện áp thấp là quyết định hệ thống phụ trợ", "Nhiều EV giữ hệ thống điện áp thấp nhưng kiến trúc khác theo xe, thị trường và nhà sản xuất. AGM axit-chì có thể phù hợp cho một số thiết kế, không có nghĩa mọi EV dùng AGM hay nó thay pin kéo."], ["So sánh", "Cùng câu hỏi độ tin cậy, không cùng một thông số", "Dự phòng tập trung vào trạng thái chờ, xả và bảo trì; xe có thể thêm nhiệt độ, rung, nén và tích hợp điện. Cả hai cần điều kiện thử đã thống nhất và xác nhận pin hoàn chỉnh."], ["AGM", "Tấm ngăn là một phần của hệ thống", "Độ dày, định lượng, hấp thụ, điện trở, phản ứng nén và hồ sơ lô hỗ trợ trao đổi vật liệu nhưng không tự chứng minh dung lượng, tuổi thọ, độ tin cậy hay hiệu năng hệ thống."], ["Hành động", "Bắt đầu từ ứng dụng và điều kiện mục tiêu", "Nêu ứng dụng, cấu trúc pin, nhiệm vụ dự phòng hoặc điện áp thấp, kích thước, dạng cuộn/tấm, điều kiện lắp ráp, kiểm tra vật liệu và giai đoạn xác nhận pin hoàn chỉnh."]], parameters: [["Ứng dụng", "Dự phòng trung tâm dữ liệu/UPS, điện áp thấp EV hoặc nhiệm vụ pin đã xác định."], ["Cấu trúc", "Kích thước nhóm bản cực, nén và điều kiện lắp ráp."], ["Xác nhận", "Phạm vi thử pin hoàn chỉnh và giai đoạn dự án."]], checklist: ["Ứng dụng và nhiệm vụ pin", "Cấu trúc pin và kích thước", "Điều kiện vận hành và lắp ráp", "Kiểm tra vật liệu và giai đoạn xác nhận"] },
  ko: { title: "AI 데이터센터와 전기차에 납산 저전압 전원이 여전히 필요할 수 있는 이유", summary: "데이터센터 백업과 EV 저전압 시스템은 임무가 다르며 AGM 선정은 개별 배터리 설계와 완성 배터리 검증에 맞춰야 합니다.", intro: "LEOCH는 ELBC 2026에서 아시아 납산 시장 수요가 데이터센터·통신 인프라와 많은 EV의 저전압 전원 역할로 뒷받침된다는 기업 관점을 밝혔습니다. 이는 독립 시장규모 보고서나 정량 전망이 아닙니다.", sections: [["출처", "기업 관점이며 시장 예측이 아님", "LEOCH 페이지는 이 관점의 귀속을 뒷받침하지만 시장 규모, 성장률, 채택률이나 용도별 수치를 제공하지 않습니다."], ["데이터센터", "백업 배터리는 시스템 기준으로 선정", "데이터센터·UPS에서는 대기 준비와 필요 시 백업 공급이 배터리 임무가 될 수 있습니다. 기술, 방전, 유지보수와 검증은 시스템 결정이며 모든 데이터센터가 같은 화학계나 VRLA를 쓰지 않습니다."], ["EV", "저전압 배터리는 보조 시스템 선택", "많은 EV에 저전압 시스템이 있지만 차종·시장·제조사마다 구조가 다릅니다. 일부 설계에서 납산 AGM을 고려할 수 있으나 모든 EV가 AGM을 쓴다는 뜻도, 구동 배터리를 대체한다는 뜻도 아닙니다."], ["비교", "같은 신뢰성 질문, 다른 사양", "백업은 대기·방전·정비를, 차량은 온도·진동·압축·전기 통합도 검토할 수 있습니다. 두 경우 모두 합의된 시험과 완성 배터리 검증이 필요합니다."], ["AGM", "분리막은 시스템의 한 부분", "두께, 평량, 흡수, 저항, 압축 반응과 로트 기록은 자재 협의에 쓰이지만 용량, 수명, 신뢰성이나 시스템 성능을 단독으로 증명하지 않습니다."], ["실행", "용도와 목표 조건부터 확인", "용도, 배터리 구조, 저전압·백업 임무, 치수, 롤·시트, 조립 조건, 자재 확인과 완성 배터리 검증 단계를 공유합니다."]], parameters: [["용도", "데이터센터/UPS 백업, EV 저전압 또는 정의된 배터리 임무."], ["구조", "극판군 치수, 압축과 조립 조건."], ["검증", "완성 배터리 시험 범위와 프로젝트 단계."]], checklist: ["용도와 배터리 임무", "배터리 구조와 치수", "운전·조립 조건", "자재 확인과 검증 단계"] },
  ja: { title: "AIデータセンターと電気自動車で鉛蓄電池の低電圧電源が残る理由", summary: "データセンターのバックアップとEV低電圧系は役割が異なり、AGMの選定は個別の電池設計と完成電池の検証に合わせます。", intro: "LEOCHはELBC 2026で、アジアの鉛蓄電池需要をデータセンター・通信インフラと多くのEVの低電圧電源の役割が支えるという企業見解を示しました。独立した市場規模報告や定量予測ではありません。", sections: [["出典", "企業見解であり市場予測ではない", "LEOCHページは発言の帰属を確認しますが、市場規模、成長率、採用率、用途別数量は示していません。"], ["データセンター", "バックアップ電池はシステムに合わせて選定", "データセンターやUPSでは待機性と必要時のバックアップ給電が任務となります。技術、放電、保守、検証はシステムの決定で、全施設が同じ化学系やVRLAを採用するわけではありません。"], ["EV", "低電圧電池は補機システムの選択", "多くのEVに低電圧系がありますが、構成は車種・地域・メーカーで異なります。一部で鉛蓄電池AGMを検討しても、全EVへの適用や駆動電池の代替を意味しません。"], ["比較", "信頼性の問いは共通、仕様は共通でない", "バックアップでは待機・放電・保守を、車載では温度、振動、圧縮、電装統合も確認します。いずれも合意済み試験と完成電池検証が必要です。"], ["AGM", "セパレーターはシステムの一部", "厚さ、坪量、吸収、抵抗、圧縮応答、ロット記録は材料協議に使えますが、容量、寿命、信頼性、システム性能を単独で証明しません。"], ["次の段階", "用途と目標条件から開始", "用途、電池構造、低電圧・バックアップ任務、寸法、ロール・シート、組立条件、材料確認、完成電池検証段階を共有してください。"]], parameters: [["用途", "データセンター/UPSバックアップ、EV低電圧または定義済みの電池任務。"], ["構造", "極板群寸法、圧縮、組立条件。"], ["検証", "完成電池試験の範囲と案件段階。"]], checklist: ["用途と電池任務", "電池構造と寸法", "運転・組立条件", "材料確認と検証段階"] },
  es: { title: "Por qué los centros de datos con IA y los vehículos eléctricos aún pueden necesitar energía de baja tensión de plomo-ácido", summary: "El respaldo del centro de datos y el sistema de baja tensión del VE cumplen tareas distintas; la selección AGM debe seguir el diseño de batería y la validación de batería completa.", intro: "En ELBC 2026, LEOCH expuso su perspectiva corporativa: la demanda asiática de plomo-ácido recibe apoyo de infraestructura de centros de datos y telecomunicaciones, y del papel de baja tensión en muchos VE. No es un informe independiente de tamaño de mercado ni un pronóstico cuantificado.", sections: [["Fuente", "Perspectiva corporativa, no previsión de mercado", "La página de LEOCH respalda la atribución, pero no aporta tamaño de mercado, crecimiento, adopción ni datos por aplicación."], ["Centro de datos", "La batería de respaldo se selecciona para un sistema", "En un centro de datos o UPS, la batería puede mantener preparación de reserva y alimentar cuando el sistema lo necesita. Tecnología, descarga, mantenimiento y validación son decisiones del sistema; no todos usan la misma química ni VRLA."], ["VE", "La batería de baja tensión es una decisión auxiliar", "Muchos VE mantienen un sistema de baja tensión, pero la arquitectura varía por vehículo, región y fabricante. AGM de plomo-ácido puede considerarse en algunos diseños, sin que todos los VE la usen ni que sustituya a la batería de tracción."], ["Comparación", "La pregunta de fiabilidad es común; la especificación no", "El respaldo revisa espera, descarga y mantenimiento; el vehículo puede añadir temperatura, vibración, compresión e integración eléctrica. Ambos requieren ensayos acordados y validación de batería completa."], ["AGM", "El separador es parte del sistema", "Espesor, gramaje, absorción, resistencia, respuesta a compresión y registros de lote apoyan la conversación de material, pero no prueban por sí solos capacidad, vida útil, fiabilidad o desempeño del sistema."], ["Acción", "Empezar por aplicación y condiciones objetivo", "Comparta aplicación, estructura de batería, función de respaldo o baja tensión, dimensiones, formato, montaje, controles de material y etapa de validación completa."]], parameters: [["Aplicación", "Respaldo de centro de datos/UPS, baja tensión de VE u otra función definida."], ["Estructura", "Dimensiones del grupo de placas, compresión y montaje."], ["Validación", "Alcance de ensayos de batería completa y etapa del proyecto."]], checklist: ["Aplicación y función", "Estructura y dimensiones", "Condiciones de uso y montaje", "Controles de material y validación"] },
  pt: { title: "Por que data centers de IA e veículos elétricos ainda podem precisar de energia de baixa tensão com chumbo-ácido", summary: "O backup de data center e o sistema de baixa tensão do VE têm funções diferentes; a seleção de AGM deve seguir o projeto da bateria e sua validação completa.", intro: "No ELBC 2026, a LEOCH apresentou a visão corporativa de que a demanda asiática por chumbo-ácido é apoiada por infraestrutura de data centers e telecomunicações e pelo papel de baixa tensão em muitos VEs. Não é relatório independente de mercado nem previsão quantitativa.", sections: [["Fonte", "Visão corporativa, não previsão de mercado", "A página da LEOCH sustenta a atribuição, mas não traz tamanho de mercado, crescimento, adoção ou dados por aplicação."], ["Data center", "A bateria de backup é selecionada para o sistema", "Em data center ou UPS, a bateria pode manter prontidão e fornecer backup quando acionada. Tecnologia, descarga, manutenção e validação são decisões do sistema; nem todo data center usa a mesma química ou VRLA."], ["VE", "Bateria de baixa tensão é uma decisão auxiliar", "Muitos VEs mantêm um sistema de baixa tensão, mas a arquitetura varia por veículo, mercado e fabricante. AGM chumbo-ácido pode ser considerada em alguns projetos, sem significar uso em todos os VEs ou substituição da bateria de tração."], ["Comparação", "A questão de confiabilidade é comum; a especificação não", "Backup examina espera, descarga e manutenção; veículos podem acrescentar temperatura, vibração, compressão e integração elétrica. Ambos exigem ensaios acordados e validação da bateria completa."], ["AGM", "O separador é parte do sistema", "Espessura, gramatura, absorção, resistência, resposta à compressão e registros de lote ajudam na conversa de material, mas não comprovam isoladamente capacidade, vida, confiabilidade ou desempenho do sistema."], ["Ação", "Começar pela aplicação e condições alvo", "Informe aplicação, estrutura da bateria, função de backup ou baixa tensão, dimensões, formato, montagem, controles de material e etapa de validação completa."]], parameters: [["Aplicação", "Backup de data center/UPS, baixa tensão de VE ou função definida."], ["Estrutura", "Dimensões do grupo de placas, compressão e montagem."], ["Validação", "Escopo de ensaios da bateria completa e etapa do projeto."]], checklist: ["Aplicação e função", "Estrutura e dimensões", "Condições de uso e montagem", "Controles de material e validação"] },
  ru: { title: "Почему центрам обработки данных с ИИ и электромобилям всё ещё может требоваться низковольтное питание от свинцово-кислотных батарей", summary: "Резерв ЦОД и низковольтная система электромобиля выполняют разные задачи; AGM выбирают по конструкции батареи и проверке готовой батареи.", intro: "На ELBC 2026 компания LEOCH представила корпоративную точку зрения: спрос на свинцово-кислотные батареи в Азии поддерживают инфраструктура ЦОД и связи, а также низковольтная роль в ряде электромобилей. Это не независимый отчёт о рынке и не количественный прогноз.", sections: [["Источник", "Корпоративная точка зрения, а не прогноз рынка", "Страница LEOCH подтверждает атрибуцию, но не содержит размер рынка, темпы роста, проникновение или данные по применениям."], ["ЦОД", "Резервную батарею выбирают для системы", "В ЦОД или UPS батарея может сохранять готовность и подавать резервное питание по запросу системы. Технология, разряд, обслуживание и проверка — системные решения; не все ЦОД используют одинаковую химию или VRLA."], ["Электромобиль", "Низковольтная батарея — решение вспомогательной системы", "Многие электромобили имеют низковольтную систему, но архитектура различается по модели, рынку и изготовителю. Свинцово-кислотная AGM может рассматриваться в отдельных конструкциях, но это не означает её применение во всех EV или замену тяговой батареи."], ["Сравнение", "Вопрос надёжности общий, спецификация — нет", "Резерв требует проверки ожидания, разряда и обслуживания; автомобиль добавляет температуру, вибрацию, сжатие и интеграцию. В обоих случаях нужны согласованные испытания и проверка готовой батареи."], ["AGM", "Сепаратор — часть системы", "Толщина, масса, поглощение, сопротивление, реакция на сжатие и записи партии помогают обсуждать материал, но сами по себе не доказывают ёмкость, срок службы, надёжность или работу системы."], ["Действие", "Начинать с применения и целевых условий", "Укажите применение, конструкцию батареи, функцию резерва или низкого напряжения, размеры, формат, сборку, проверки материала и этап валидации готовой батареи."]], parameters: [["Применение", "Резерв ЦОД/UPS, низкое напряжение EV или заданная функция батареи."], ["Конструкция", "Размеры блока пластин, сжатие и сборка."], ["Проверка", "Объём испытаний готовой батареи и стадия проекта."]], checklist: ["Применение и функция", "Конструкция и размеры", "Условия работы и сборки", "Проверки материала и валидация"] }
};

const secondaryHubCounts = {
  vi: "15 bài viết kỹ thuật", ko: "기술 글 15편", ja: "技術記事 15件",
  es: "15 artículos técnicos", pt: "15 artigos técnicos", ru: "15 технических статей"
};

for (const locale of secondaryResourceLocales.filter((locale) => locale !== "ar")) {
  secondaryResourceData[locale].topics.dataCenterBackupPowerAgmSeparator = dataCenterBackupPowerTopics[locale];
  secondaryResourceData[locale].topics.earlyChinaLeadAcidBatteryManufacturing = earlyLeadAcidManufacturingTopics[locale];
  secondaryResourceData[locale].topics.agmSeparatorPressureRetention = pressureRetentionTopics[locale];
  secondaryResourceData[locale].topics.agmSeparatorBatchProcessControl = batchProcessControlTopics[locale];
  secondaryResourceData[locale].topics.agmSeparatorThirdPole = thirdPoleTopics[locale];
  secondaryResourceData[locale].topics.agmSeparatorEnergyDataDelivery = energyDataDeliveryTopics[locale];
  secondaryResourceData[locale].topics.en18060BatteryStandard = en18060BatteryStandardTopics[locale];
  secondaryResourceData[locale].topics.dataCenterEvLowVoltageAgm = dataCenterEvLowVoltageAgmTopics[locale];
  secondaryResourceData[locale].energyDataDeliveryReferences = {
    eyebrow: secondaryResourceData[locale].ui.reference,
    title: energyDataDeliveryTopics[locale].title,
    text: energyDataDeliveryReferenceNotes[locale],
    items: energyDataDeliveryReferenceItems
  };
  secondaryResourceData[locale].thirdPoleReferences = {
    eyebrow: secondaryResourceData[locale].ui.reference,
    title: thirdPoleTopics[locale].title,
    text: thirdPoleReferenceNotes[locale],
    items: thirdPoleReferenceItems
  };
  secondaryResourceData[locale].dataCenterReferences = {
    eyebrow: dataCenterReferences[locale][0],
    title: dataCenterReferences[locale][1],
    text: dataCenterReferences[locale][2],
    items: dataCenterReferenceItems
  };
  secondaryResourceData[locale].earlyLeadAcidTimeline = {
    eyebrow: earlyLeadAcidTimelineCopy[locale][0],
    title: earlyLeadAcidTimelineCopy[locale][1],
    note: earlyLeadAcidTimelineCopy[locale][2],
    items: earlyLeadAcidManufacturingTopics[locale].parameters
  };
  secondaryResourceData[locale].earlyLeadAcidReferences = {
    eyebrow: earlyLeadAcidReferenceCopy[locale][0],
    title: earlyLeadAcidReferenceCopy[locale][1],
    text: earlyLeadAcidReferenceCopy[locale][2],
    items: earlyLeadAcidReferenceItems
  };
  secondaryResourceData[locale].pressureRetentionReferences = {
    eyebrow: pressureRetentionReferenceCopy[locale][0],
    title: pressureRetentionReferenceCopy[locale][1],
    text: pressureRetentionReferenceCopy[locale][2],
    items: pressureRetentionReferenceItems
  };
  secondaryResourceData[locale].batchProcessControlReferences = {
    eyebrow: batchProcessControlReferenceCopy[locale][0],
    title: batchProcessControlReferenceCopy[locale][1],
    text: batchProcessControlReferenceCopy[locale][2],
    items: batchProcessControlReferenceItems
  };
  secondaryResourceData[locale].batchProcessControlComparison = {
    eyebrow: batchProcessControlComparison[locale][0],
    title: batchProcessControlComparison[locale][1],
    columns: batchProcessControlComparison[locale][2],
    rows: batchProcessControlComparisonRows[locale]
  };
  secondaryResourceData[locale].hub.count = secondaryHubCounts[locale];
}

secondaryResourceData.ar = arabicResourceData;
secondaryResourceData.ar.topics.dataCenterEvLowVoltageAgm = {
  title: "لماذا قد تحتاج مراكز بيانات الذكاء الاصطناعي والمركبات الكهربائية إلى طاقة رصاصية حمضية منخفضة الجهد؟",
  summary: "تختلف مهمة النسخ الاحتياطي لمركز البيانات عن نظام الجهد المنخفض في المركبة الكهربائية؛ ويجب أن يتبع اختيار AGM تصميم البطارية والتحقق من البطارية الكاملة.",
  intro: "في ELBC 2026 عرضت LEOCH وجهة نظر مؤسسية تربط الطلب الآسيوي على بطاريات الرصاص الحمضية ببنية مراكز البيانات والاتصالات وبالدور منخفض الجهد في كثير من المركبات الكهربائية. هذه ليست دراسة مستقلة لحجم السوق أو توقعاً كمياً.",
  sections: [["المصدر", "وجهة نظر مؤسسية وليست توقعاً للسوق", "تؤكد صفحة LEOCH نسبة هذا الرأي، لكنها لا تقدم حجم السوق أو معدل النمو أو بيانات حسب التطبيق."], ["مركز البيانات", "تُختار بطارية النسخ الاحتياطي للنظام", "قد تحافظ البطارية في مركز البيانات أو UPS على الجاهزية وتوفر القدرة عند طلب النظام. التقنية والتفريغ والصيانة والتحقق قرارات نظامية، ولا تستخدم كل المراكز الكيمياء أو VRLA نفسها."], ["المركبة الكهربائية", "بطارية الجهد المنخفض قرار لنظام مساعد", "تحتفظ كثير من المركبات الكهربائية بنظام منخفض الجهد، لكن البنية تختلف حسب المركبة والسوق والمصنع. قد يُنظر إلى AGM الرصاصي الحمضي في بعض التصاميم، وهذا لا يعني استخدامها في كل مركبة أو استبدال بطارية الجر."], ["المقارنة", "سؤال الموثوقية مشترك والمواصفة ليست كذلك", "يراجع النسخ الاحتياطي الجاهزية والتفريغ والصيانة؛ وقد تضيف المركبة الحرارة والاهتزاز والضغط والتكامل الكهربائي. يحتاج كلاهما إلى اختبارات متفق عليها وتحقق من البطارية الكاملة."], ["AGM", "الفاصل جزء من النظام", "يساعد السمك والوزن والامتصاص والمقاومة واستجابة الضغط وسجلات الدفعات في نقاش المادة، لكنها لا تثبت وحدها السعة أو العمر أو موثوقية النظام."], ["الإجراء", "ابدأ بالتطبيق والظروف المستهدفة", "شارك التطبيق وبنية البطارية ومهمة النسخ الاحتياطي أو الجهد المنخفض والأبعاد والشكل وظروف التجميع وفحوص المادة ومرحلة التحقق من البطارية الكاملة."]],
  parameters: [["التطبيق", "نسخ احتياطي لمركز بيانات/UPS أو جهد منخفض للمركبة أو مهمة بطارية محددة."], ["البنية", "أبعاد مجموعة الألواح والضغط وظروف التجميع."], ["التحقق", "نطاق اختبار البطارية الكاملة ومرحلة المشروع."]],
  checklist: ["التطبيق ومهمة البطارية", "بنية البطارية والأبعاد", "ظروف التشغيل والتجميع", "فحوص المادة ومرحلة التحقق"]
};

const aiBackupPowerTopics = {
  vi: {
    title: "1 MW trong 60 giây: Vì sao nguồn dự phòng trung tâm dữ liệu AI ưu tiên tốc độ trước thời lượng?",
    summary: "Con số 1 MW/tối thiểu 60 giây là công bố của Vision Group cho LiLic Sidecar, không phải chuẩn ngành; nguồn dự phòng phải được phân lớp theo nhiệm vụ tức thời, giây và phút.",
    intro: "Vision Group cho biết LiLic Sidecar lần đầu xuất hiện công khai tại YOTTA 2026. Theo công bố của hãng, cấu hình năm mô-đun trong một tủ có công suất phóng định mức 1 MW và dự phòng ít nhất 60 giây ở tải 1 MW.",
    sections: [["Móc 3 giây", "Vì sao một hệ 1 MW chỉ nhấn mạnh 60 giây?", "Vì công suất và thời lượng mô tả một nhiệm vụ cụ thể. Một tầng phản ứng nhanh có thể xử lý biến động hoặc khoảng chuyển tiếp ngắn; nó không tự chứng minh rằng 60 giây đủ cho cả phòng máy."], ["Công bố và ranh giới", "Đây là số liệu doanh nghiệp cho LiLic Sidecar", "Vision mô tả thiết kế lai LIC+LFP, nối trực tiếp thanh cái DC 800 V (±400 V), đồng thời giới thiệu BBU cấp rack. Các chức năng, tương thích và con số đều là tự công bố, chưa phải xác minh độc lập."], ["Phân lớp nhiệm vụ", "Tách phản ứng tức thời, dự phòng theo giây và theo phút", "Mỗi tầng phải được xác định bằng tốc độ phản ứng, đường cong công suất, thời lượng, chuyển mạch, điều khiển và mục tiêu khôi phục. Các tầng có thể phối hợp nhưng không thay thế nhau chỉ vì cùng được gọi là dự phòng."], ["Định vị công nghệ", "LIC, LFP, BBU và UPS/VRLA giải quyết các câu hỏi khác nhau", "LIC có thể được chọn cho chu kỳ xung; LFP có thể đóng góp năng lượng dự phòng; BBU đưa bảo vệ gần tải. UPS/VRLA vẫn có thể phù hợp trong kiến trúc đã xác minh với nhiệm vụ phóng, bảo trì và điều kiện môi trường rõ ràng."], ["Ranh giới AGM", "Dữ liệu tấm ngăn không chứng minh hiệu suất hệ thống", "Độ dày, khối lượng định lượng, hấp thụ axit, điện trở và phản ứng nén hỗ trợ khớp vật liệu. Chúng không thể tự chứng minh công suất, thời lượng, dung lượng, tuổi thọ, an toàn hoặc tương thích của pin và hệ thống."], ["FAQ", "Những gì cần xác nhận trước khi chọn", "Vì sao phân lớp? Vì các thang thời gian có nhiệm vụ khác nhau. 1 MW/60 giây nghĩa là gì? Chỉ là mức Vision công bố cho cấu hình nêu trên. UPS/VRLA còn vị trí không? Có thể, nếu phù hợp kiến trúc và được xác minh. Dữ liệu AGM có đủ không? Không; cần thử pin hoàn chỉnh và hệ thống."]],
    parameters: [["Công suất mục tiêu", "Nêu công suất liên tục, xung và đường cong theo thời gian."], ["Thời lượng", "Tách yêu cầu tức thời, giây và phút."], ["Kiến trúc", "Xác nhận AC/DC, bus, UPS/BBU, chuyển mạch và điều khiển."], ["Môi trường", "Nhiệt độ, không gian, làm mát, bảo trì và thay thế."], ["Cấu trúc pin", "Cấu trúc bản cực, nén, điện phân và phạm vi thử pin hoàn chỉnh."]],
    checklist: ["Công suất và đường cong tải mục tiêu", "Thời gian dự phòng theo từng tầng", "Nhiệt độ và phương án bảo trì", "Cấu trúc pin và điều kiện lắp ráp", "Kế hoạch thử pin hoàn chỉnh và hệ thống"],
    inquiry: ["Đối chiếu mẫu và thông số AGM", "Công suất và thời gian dự phòng mục tiêu của dự án là bao nhiêu? Hãy gửi thêm nhiệt độ và cấu trúc pin để trao đổi thông số hoặc mẫu tấm ngăn; việc thử pin và hệ thống hoàn chỉnh vẫn bắt buộc."]
  },
  ko: {
    title: "1 MW를 60초 동안: AI 데이터센터 백업 전원이 지속시간보다 속도를 먼저 보는 이유",
    summary: "1 MW/최소 60초는 Vision Group의 LiLic Sidecar에 대한 기업 공개 수치이며 업계 표준이 아니다. 백업 전원은 순간·초·분 단위 임무로 구분해야 한다.",
    intro: "Vision Group은 YOTTA 2026에서 LiLic Sidecar를 처음 공개했다고 밝혔다. 회사에 따르면 5모듈 구성의 캐비닛은 정격 방전전력 1 MW, 1 MW 부하에서 최소 60초 백업을 제공한다.",
    sections: [["3초 질문", "왜 1 MW 시스템이 60초만 강조하는가?", "전력과 시간은 특정 임무를 설명한다. 빠른 계층은 부하 변동이나 짧은 전환 구간을 담당할 수 있지만, 60초가 전체 데이터센터에 충분하다는 증거는 아니다."], ["공개 범위", "LiLic Sidecar에 한정된 기업 주장", "Vision은 LIC+LFP 하이브리드, 800 V DC(±400 V) 버스 직접 연결, 랙급 BBU를 설명한다. 수치와 기능, 호환성은 모두 회사 설명이며 독립 검증이 아니다."], ["임무 분리", "순간 응답, 초 단위, 분 단위 백업을 구분", "응답 속도, 전력 곡선, 지속시간, 전환, 제어와 복구 목표를 계층별로 정해야 한다. 모두 백업이라는 이유만으로 서로 대체되지는 않는다."], ["기술 위치", "LIC, LFP, BBU와 UPS/VRLA는 서로 다른 질문에 답한다", "LIC는 반복 펄스에, LFP는 백업 에너지에, BBU는 부하 인접 보호에 검토될 수 있다. UPS/VRLA도 방전 임무, 유지보수와 환경이 명확하고 검증된 아키텍처에서는 여전히 선택지가 될 수 있다."], ["AGM 경계", "분리막 데이터만으로 시스템 성능을 증명할 수 없다", "두께, 평량, 산 흡수, 전기저항과 압축 반응은 소재 매칭에 쓰인다. 배터리나 시스템의 전력, 지속시간, 용량, 수명, 안전 또는 호환성을 단독으로 입증하지 못한다."], ["FAQ", "선정 전 무엇을 확인해야 하는가", "왜 계층화하는가? 시간대별 임무가 다르기 때문이다. 1 MW/60초는 무엇인가? 해당 구성에 대한 Vision의 수치다. UPS/VRLA는 남는가? 아키텍처 적합성과 검증에 달렸다. AGM 데이터로 충분한가? 아니다. 완성 배터리와 시스템 시험이 필요하다."]],
    parameters: [["목표 전력", "연속·펄스 전력과 시간별 곡선."], ["지속시간", "순간·초·분 단위 요구를 분리."], ["아키텍처", "AC/DC, 버스, UPS/BBU, 전환과 제어."], ["환경", "온도, 공간, 냉각, 정비와 교체."], ["배터리 구조", "극군, 압축, 전해액과 완성 배터리 시험 범위."]],
    checklist: ["목표 전력과 부하 곡선", "계층별 백업 시간", "온도와 유지보수 방식", "배터리 구조와 조립 조건", "완성 배터리·시스템 검증 계획"],
    inquiry: ["AGM 시료 및 사양 매칭", "프로젝트의 목표 전력과 백업 시간은 얼마입니까? 온도와 배터리 구조도 보내 주시면 분리막 사양 또는 시료를 검토할 수 있습니다. 완성 배터리와 시스템 검증은 별도로 필요합니다."]
  },
  ja: {
    title: "1 MWを60秒：AIデータセンターのバックアップ電源が時間より速さを先に問う理由",
    summary: "1 MW・最低60秒はVision GroupによるLiLic Sidecarの企業開示値であり業界標準ではない。瞬時、秒、分の役割ごとにバックアップを分けて考える必要がある。",
    intro: "Vision GroupはYOTTA 2026でLiLic Sidecarを初公開したと発表した。同社によれば、5モジュール構成の1キャビネットは定格放電電力1 MW、1 MW負荷で最低60秒のバックアップを提供する。",
    sections: [["3秒の問い", "なぜ1 MWのシステムが60秒だけを強調するのか", "電力と時間は特定の任務を示す。高速層は負荷変動や短い切替時間を担えるが、60秒で設備全体に十分だとは証明しない。"], ["開示の境界", "LiLic Sidecarに関する企業主張", "VisionはLIC+LFPハイブリッド、800 V DC（±400 V）バスへの直結、ラック側BBUを説明している。数値、機能、互換性は企業開示であり独立検証ではない。"], ["役割分担", "瞬時、秒単位、分単位を分ける", "応答速度、出力曲線、継続時間、切替、制御、復旧目標を層ごとに定義する。同じバックアップという名称だけで相互代替はできない。"], ["技術の位置", "LIC、LFP、BBUとUPS/VRLAは別の課題に対応する", "LICはパルスサイクル、LFPはバックアップエネルギー、BBUは負荷近傍の保護に検討される。UPS/VRLAも放電任務、保守、環境が明確で検証済みの構成なら選択肢になり得る。"], ["AGMの境界", "セパレーター値だけではシステム性能を証明できない", "厚さ、坪量、吸酸、電気抵抗、圧縮応答は材料照合に使えるが、電池・システムの出力、時間、容量、寿命、安全性、互換性を単独では証明しない。"], ["FAQ", "選定前に確認すること", "なぜ階層化するのか。時間軸ごとに任務が違うため。1 MW/60秒とは、当該構成についてVisionが公表した値。UPS/VRLAに役割はあるか。構成適合と検証次第である。AGMデータだけで十分か。いいえ、完成電池とシステム試験が必要である。"]],
    parameters: [["目標出力", "連続・パルス出力と時間曲線。"], ["継続時間", "瞬時・秒・分の要件を分離。"], ["構成", "AC/DC、バス、UPS/BBU、切替と制御。"], ["環境", "温度、空間、冷却、保守と交換。"], ["電池構造", "極板群、圧縮、電解液、完成電池試験範囲。"]],
    checklist: ["目標出力と負荷曲線", "層ごとのバックアップ時間", "温度と保守方式", "電池構造と組立条件", "完成電池・システム検証計画"],
    inquiry: ["AGMサンプルと仕様照合", "プロジェクトの目標出力とバックアップ時間は何ですか？ 温度と電池構造も共有いただければ、セパレーター仕様またはサンプルを照合できます。完成電池とシステム検証は別途必要です。"]
  },
  es: {
    title: "1 MW durante 60 segundos: por qué el respaldo de centros de datos de IA prioriza primero la rapidez",
    summary: "1 MW durante al menos 60 segundos es una divulgación corporativa de Vision Group sobre LiLic Sidecar, no una norma sectorial; el respaldo debe separarse en tareas transitorias, de segundos y de minutos.",
    intro: "Vision Group afirma que LiLic Sidecar debutó públicamente en YOTTA 2026. Según la empresa, un gabinete con cinco módulos entrega 1 MW de potencia nominal de descarga y al menos 60 segundos de respaldo con una carga de 1 MW.",
    sections: [["Gancho", "¿Por qué un sistema de 1 MW destaca solo 60 segundos?", "Porque potencia y duración describen una tarea concreta. Una capa rápida puede cubrir fluctuaciones o una transición breve; no demuestra que 60 segundos basten para todo el centro de datos."], ["Límite de la fuente", "Es una cifra de empresa para LiLic Sidecar", "Vision describe un híbrido LIC+LFP, conexión directa a un bus de CC de 800 V (±400 V) y BBU a nivel de rack. Cifras, funciones y compatibilidad son declaraciones corporativas, no verificación independiente."], ["Capas", "Separar respuesta transitoria, segundos y minutos", "Cada capa necesita velocidad de respuesta, curva de potencia, duración, transferencia, control y objetivo de recuperación definidos. No son intercambiables solo por llamarse respaldo."], ["Posición técnica", "LIC, LFP, BBU y UPS/VRLA responden a tareas distintas", "LIC puede evaluarse para pulsos; LFP para energía de respaldo; BBU acerca la protección a la carga. UPS/VRLA puede conservar un lugar si la arquitectura, descarga, mantenimiento y entorno se verifican."], ["Límite AGM", "Los datos del separador no prueban el sistema", "Espesor, gramaje, absorción, resistencia eléctrica y respuesta a compresión ayudan a cotejar materiales. No prueban por sí solos potencia, autonomía, capacidad, vida, seguridad o compatibilidad de la batería y el sistema."], ["FAQ", "Qué confirmar antes de seleccionar", "¿Por qué usar capas? Porque cada escala temporal tiene una misión. ¿Qué significa 1 MW/60 s? Solo la cifra de Vision para esa configuración. ¿Sigue habiendo lugar para UPS/VRLA? Depende de arquitectura y validación. ¿Bastan datos AGM? No; hacen falta pruebas de batería completa y sistema."]],
    parameters: [["Potencia objetivo", "Potencia continua, de pulso y curva temporal."], ["Duración", "Separar requisitos transitorios, de segundos y minutos."], ["Arquitectura", "CA/CC, bus, UPS/BBU, transferencia y control."], ["Entorno", "Temperatura, espacio, refrigeración, mantenimiento y reemplazo."], ["Batería", "Grupo de placas, compresión, electrolito y pruebas completas."]],
    checklist: ["Potencia objetivo y curva de carga", "Tiempo por cada capa", "Temperatura y mantenimiento", "Estructura de batería y montaje", "Plan de validación de batería y sistema"],
    inquiry: ["Muestra AGM y cotejo de especificación", "¿Qué potencia objetivo y tiempo de respaldo debe cumplir su proyecto? Envíe también temperatura y estructura de batería para cotejar una especificación o muestra; siguen siendo obligatorias las pruebas de batería completa y sistema."]
  },
  pt: {
    title: "1 MW por 60 segundos: por que o backup de data centers de IA prioriza primeiro a velocidade",
    summary: "1 MW por pelo menos 60 segundos é uma divulgação corporativa da Vision Group sobre o LiLic Sidecar, não um padrão do setor; o backup deve ser dividido em tarefas transitórias, de segundos e de minutos.",
    intro: "A Vision Group afirma que o LiLic Sidecar fez sua primeira aparição pública na YOTTA 2026. Segundo a empresa, um gabinete com cinco módulos fornece 1 MW de potência nominal de descarga e pelo menos 60 segundos de backup sob carga de 1 MW.",
    sections: [["Gancho", "Por que um sistema de 1 MW destaca apenas 60 segundos?", "Porque potência e duração descrevem uma tarefa específica. Uma camada rápida pode cobrir flutuações ou uma transição curta; isso não prova que 60 segundos bastem para todo o data center."], ["Limite da fonte", "É um número corporativo do LiLic Sidecar", "A Vision descreve um híbrido LIC+LFP, conexão direta a um barramento CC de 800 V (±400 V) e BBU em nível de rack. Números, funções e compatibilidade são alegações da empresa, não verificação independente."], ["Camadas", "Separar resposta transitória, segundos e minutos", "Cada camada exige velocidade de resposta, curva de potência, duração, transferência, controle e objetivo de recuperação definidos. Não são intercambiáveis apenas por serem chamadas de backup."], ["Posicionamento", "LIC, LFP, BBU e UPS/VRLA atendem tarefas diferentes", "LIC pode ser avaliado para pulsos; LFP para energia de backup; BBU aproxima a proteção da carga. UPS/VRLA ainda pode ter lugar quando arquitetura, descarga, manutenção e ambiente forem compatíveis e validados."], ["Limite AGM", "Dados do separador não comprovam o sistema", "Espessura, gramatura, absorção, resistência elétrica e resposta à compressão ajudam no pareamento do material. Sozinhos, não comprovam potência, autonomia, capacidade, vida útil, segurança ou compatibilidade da bateria e do sistema."], ["FAQ", "O que confirmar antes da seleção", "Por que usar camadas? Porque cada escala de tempo tem uma missão. O que significa 1 MW/60 s? Apenas o valor divulgado pela Vision para essa configuração. UPS/VRLA ainda tem espaço? Depende da arquitetura e validação. Dados AGM bastam? Não; são necessários testes da bateria completa e do sistema."]],
    parameters: [["Potência-alvo", "Potência contínua, de pulso e curva no tempo."], ["Duração", "Separar requisitos transitórios, de segundos e minutos."], ["Arquitetura", "CA/CC, barramento, UPS/BBU, transferência e controle."], ["Ambiente", "Temperatura, espaço, refrigeração, manutenção e substituição."], ["Bateria", "Grupo de placas, compressão, eletrólito e testes completos."]],
    checklist: ["Potência-alvo e curva de carga", "Tempo por camada", "Temperatura e manutenção", "Estrutura da bateria e montagem", "Plano de validação da bateria e do sistema"],
    inquiry: ["Amostra AGM e pareamento de especificação", "Qual potência-alvo e tempo de backup o seu projeto precisa validar? Envie também temperatura e estrutura da bateria para parear uma especificação ou amostra; os testes da bateria completa e do sistema continuam necessários."]
  },
  ru: {
    title: "1 МВт на 60 секунд: почему резервное питание ИИ-ЦОД сначала требует скорости",
    summary: "1 МВт минимум на 60 секунд — корпоративное заявление Vision Group о LiLic Sidecar, а не отраслевой норматив; резерв следует делить на мгновенные, секундные и минутные задачи.",
    intro: "Vision Group заявила, что LiLic Sidecar впервые публично показали на YOTTA 2026. По данным компании, шкаф в пяти-модульной конфигурации имеет номинальную мощность разряда 1 МВт и обеспечивает не менее 60 секунд резерва при нагрузке 1 МВт.",
    sections: [["Вопрос за 3 секунды", "Почему система 1 МВт подчёркивает только 60 секунд?", "Потому что мощность и длительность описывают конкретную задачу. Быстрый уровень может покрывать колебания или короткий переход, но не доказывает достаточность 60 секунд для всего ЦОД."], ["Граница источника", "Это корпоративные данные о LiLic Sidecar", "Vision описывает гибрид LIC+LFP, прямое подключение к шине 800 В DC (±400 В) и стоечные BBU. Числа, функции и совместимость заявлены компанией и не являются независимой проверкой."], ["Разделение задач", "Отделить мгновенную реакцию, секунды и минуты", "Для каждого уровня задают скорость реакции, кривую мощности, длительность, переключение, управление и цель восстановления. Они не взаимозаменяемы только потому, что относятся к резерву."], ["Роль технологий", "LIC, LFP, BBU и UPS/VRLA решают разные задачи", "LIC может рассматриваться для импульсов, LFP — для энергии резерва, BBU — для защиты ближе к нагрузке. UPS/VRLA может оставаться вариантом при совместимой и проверенной архитектуре, режиме разряда, обслуживании и среде."], ["Граница AGM", "Данные сепаратора не доказывают характеристики системы", "Толщина, масса на площадь, впитывание кислоты, сопротивление и сжатие помогают сопоставлять материал. Они отдельно не доказывают мощность, время, ёмкость, срок службы, безопасность или совместимость батареи и системы."], ["FAQ", "Что проверить до выбора", "Зачем уровни? Масштабы времени имеют разные задачи. Что значит 1 МВт/60 с? Только показатель Vision для указанной конфигурации. Есть ли место UPS/VRLA? Зависит от архитектуры и проверки. Достаточно ли данных AGM? Нет, нужны испытания батареи и системы."]],
    parameters: [["Целевая мощность", "Непрерывная и импульсная мощность, кривая во времени."], ["Длительность", "Разделить мгновенные, секундные и минутные требования."], ["Архитектура", "AC/DC, шина, UPS/BBU, переключение и управление."], ["Среда", "Температура, место, охлаждение, обслуживание и замена."], ["Батарея", "Группа пластин, сжатие, электролит и полные испытания."]],
    checklist: ["Целевая мощность и кривая нагрузки", "Время каждого уровня", "Температура и обслуживание", "Конструкция батареи и сборка", "План проверки батареи и системы"],
    inquiry: ["Образец AGM и подбор спецификации", "Какую целевую мощность и время резерва должен подтвердить ваш проект? Передайте также температуру и конструкцию батареи для подбора спецификации или образца; испытания батареи и системы остаются обязательными."]
  },
  ar: {
    title: "1 ميجاواط لمدة 60 ثانية: لماذا تعطي طاقة احتياط مراكز بيانات الذكاء الاصطناعي الأولوية للسرعة؟",
    summary: "رقم 1 ميجاواط لمدة لا تقل عن 60 ثانية هو إفصاح من Vision Group عن LiLic Sidecar وليس معياراً صناعياً؛ يجب تقسيم الاحتياط إلى مهام لحظية وبالثواني وبالدقائق.",
    intro: "تقول Vision Group إن LiLic Sidecar ظهر علناً لأول مرة في YOTTA 2026. ووفقاً للشركة، توفر الخزانة ذات الوحدات الخمس قدرة تفريغ اسمية 1 ميجاواط واحتياطاً لا يقل عن 60 ثانية عند حمل 1 ميجاواط.",
    sections: [["سؤال سريع", "لماذا يبرز نظام 1 ميجاواط مدة 60 ثانية فقط؟", "لأن القدرة والمدة تصفان مهمة محددة. قد تغطي طبقة سريعة تقلب الحمل أو انتقالاً قصيراً، لكنها لا تثبت أن 60 ثانية تكفي لمركز البيانات كله."], ["حدود المصدر", "هذه بيانات شركة عن LiLic Sidecar", "تصف Vision تصميماً هجيناً LIC+LFP واتصالاً مباشراً بناقل 800V DC ‏(±400V) ووحدات BBU قرب الرف. الأرقام والوظائف والتوافق إفصاحات شركة وليست تحققاً مستقلاً."], ["طبقات المهمة", "افصل الاستجابة اللحظية والثواني والدقائق", "يجب تحديد سرعة الاستجابة ومنحنى القدرة والمدة والتحويل والتحكم وهدف الاستعادة لكل طبقة. لا تتبادل الأدوار لمجرد أنها جميعاً احتياط."], ["موقع التقنيات", "LIC وLFP وBBU وUPS/VRLA لمهام مختلفة", "قد يُدرس LIC للنبضات، وLFP لطاقة الاحتياط، وBBU للحماية قرب الحمل. ويمكن أن يبقى UPS/VRLA خياراً إذا كانت البنية ومهمة التفريغ والصيانة والبيئة متوافقة ومتحققاً منها."], ["حد AGM", "بيانات الفاصل لا تثبت أداء النظام", "تساعد السماكة والوزن والامتصاص والمقاومة واستجابة الضغط في مطابقة المادة، لكنها لا تثبت وحدها قدرة البطارية أو مدتها أو سعتها أو عمرها أو سلامتها أو توافق النظام."], ["الأسئلة الشائعة", "ما الذي يجب تأكيده قبل الاختيار؟", "لماذا الطبقات؟ لأن لكل نطاق زمني مهمة. ماذا يعني 1 ميجاواط/60 ثانية؟ رقم Vision لهذه البنية فقط. هل يبقى دور UPS/VRLA؟ يعتمد على البنية والتحقق. هل تكفي بيانات AGM؟ لا، يلزم اختبار البطارية والنظام الكاملين."]],
    parameters: [["القدرة المستهدفة", "القدرة المستمرة والنبضية والمنحنى الزمني."], ["المدة", "فصل المتطلبات اللحظية والثواني والدقائق."], ["البنية", "AC/DC والناقل وUPS/BBU والتحويل والتحكم."], ["البيئة", "الحرارة والمساحة والتبريد والصيانة والاستبدال."], ["البطارية", "مجموعة الألواح والضغط والإلكتروليت واختبار البطارية الكاملة."]],
    checklist: ["القدرة ومنحنى الحمل", "زمن كل طبقة", "الحرارة وطريقة الصيانة", "بنية البطارية وظروف التجميع", "خطة تحقق البطارية والنظام"],
    inquiry: ["مطابقة عينة ومواصفة AGM", "ما القدرة المستهدفة وزمن الاحتياط اللذان يجب أن يتحقق منهما مشروعك؟ أرسل أيضاً درجة الحرارة وبنية البطارية لمناقشة مواصفة أو عينة فاصل؛ ويبقى اختبار البطارية والنظام الكاملين ضرورياً."]
  }
};

for (const [locale, topic] of Object.entries(aiBackupPowerTopics)) {
  secondaryResourceData[locale].topics.aiDataCenterBackupPowerLayers = topic;
}

const agmPastingPaperEnergyTopics = {
  vi: {
    title: "Giấy trát bản cực sợi thủy tinh AGM tiết kiệm bao nhiêu năng lượng sấy?",
    summary: "Tuyên bố giảm nhiệt độ hoặc ngừng lò sấy phải được kiểm chứng trên cùng dây chuyền theo năng lượng trên sản lượng đạt, tốc độ, độ ẩm và chất lượng bản cực.",
    intro: "Huayang đưa ra tuyên bố này cho một sản phẩm hiện có, nhưng trang công khai không có số liệu tiết kiệm hay điều kiện thử nghiệm. Đây không phải bằng chứng độc lập hoặc cam kết của Viking.",
    sections: [["Nguồn", "Đây là tuyên bố trên trang sản phẩm của Huayang", "Trang nói sản phẩm dùng cho trát bản cực liên tục, có thể giảm nhiệt độ hoặc ngừng lò sấy và thay giấy sợi thực vật. Không có chuẩn ngành hay thử nghiệm bên thứ ba."], ["Điều kiện thiếu", "Nhiệt độ lò chưa phải kết quả năng lượng", "Cần tốc độ dây chuyền, sản lượng đạt, trạng thái ẩm, vùng lò, thời gian lưu, ranh giới đo điện/khí/hơi và mẫu số chuẩn hóa."], ["Đối chứng cùng dây chuyền", "So sánh năng lượng trên sản lượng đạt", "Chạy giấy hiện tại và giấy ứng viên trên cùng dây chuyền, cùng công thức, hình học bản cực, lượng hồ và cửa sổ sản xuất; ghi năng lượng cùng tốc độ, độ ẩm và tổn thất dừng-khởi động."], ["Nghiệm thu bản cực", "Chất lượng và phế phẩm cần bằng chứng riêng", "Đánh giá ngoại quan, mép, độ bám hoặc rơi bột, độ đồng đều ẩm, kích thước/khối lượng và tỷ lệ phế theo phương pháp nhà máy phê duyệt."], ["Ranh giới", "Giấy trát bản cực không phải tấm ngăn AGM chính", "Quan sát ở cấp vật liệu không chứng minh độ bền bản cực, dung lượng, tuổi thọ hoặc độ tin cậy của ắc quy; vẫn cần nghiệm thu bản cực và thử ắc quy hoàn chỉnh."], ["Trước khi áp dụng", "Khóa điều kiện trước khi thay thế", "Khóa lô vật liệu, tốc độ và công thức; điểm lấy mẫu ẩm và cửa sổ lò; đồng hồ và mẫu số năng lượng; tiêu chí bản cực, phế phẩm và kiểm tra ắc quy sau đó."], ["FAQ", "Giấy trát bản cực sợi thủy tinh có giảm năng lượng lò sấy không?", "Đây là tuyên bố của Huayang nhưng trang không có dữ liệu định lượng. Cần đối chứng cùng dây chuyền về sản lượng đạt, tốc độ, độ ẩm, lò, năng lượng, chất lượng và phế phẩm; tuyên bố vật liệu không thay thế kiểm chứng bản cực và ắc quy."]],
    parameters: [["Năng lượng trên sản lượng", "Cùng ranh giới điện, khí hoặc hơi và cùng mẫu số sản lượng đạt."], ["Tốc độ và sản lượng", "Ghi tốc độ đặt/thực tế, sản lượng đạt và tổn thất dừng máy."], ["Độ ẩm và lò", "Cố định điểm lấy mẫu, nhiệt độ vùng và thời gian lưu."], ["Nghiệm thu bản cực", "Dùng tiêu chí ngoại quan, độ đồng đều và độ bám đã phê duyệt."], ["Phế phẩm và ắc quy", "Tách bằng chứng phế phẩm khỏi thử nghiệm ắc quy hoàn chỉnh."]],
    checklist: ["Tốc độ dây chuyền và công thức hồ", "Lô giấy và trạng thái ẩm", "Nhiệt độ, thời gian lưu và ranh giới năng lượng", "Tiêu chí bản cực và phế phẩm", "Phạm vi thử ắc quy hoàn chỉnh"],
    inquiry: ["Đánh giá kỹ thuật giấy trát bản cực AGM", "Bạn sẽ đánh giá tuyên bố này bằng năng lượng trên sản lượng hay bằng thay đổi nhiệt độ lò? Gửi tốc độ dây chuyền, ranh giới năng lượng, trạng thái ẩm và yêu cầu nghiệm thu bản cực."]
  },
  ko: {
    title: "AGM 유리섬유 페이스팅 페이퍼는 건조 에너지를 얼마나 줄일 수 있나?",
    summary: "건조로 온도 저감 또는 정지 주장은 동일 라인에서 합격 생산량당 에너지, 속도, 수분, 극판 품질로 검증해야 합니다.",
    intro: "화양은 기존 제품에 대해 이 주장을 하지만 공개 페이지에는 절감량이나 시험 조건이 없습니다. 독립 검증도 Viking의 약속도 아닙니다.",
    sections: [["출처", "화양 기존 제품 페이지의 기업 주장입니다", "페이지는 연속 페이스팅, 건조로 온도 저감 또는 정지, 식물섬유 페이퍼 대체를 말하지만 제3자 시험이나 산업 기준은 제시하지 않습니다."], ["누락 조건", "로 온도 변화는 에너지 결과가 아닙니다", "라인 속도, 합격 생산량, 수분 상태, 로 구간과 체류시간, 전기·가스·증기 계측 경계와 정규화 기준이 필요합니다."], ["동일 라인 비교", "합격 생산량당 에너지를 비교합니다", "현행재와 후보재를 같은 라인, 배합, 극판 형상, 페이스트 도포량과 생산 창에서 운전하고 에너지와 속도·수분·기동 손실을 함께 기록합니다."], ["극판 승인", "품질과 폐기율은 별도 증거가 필요합니다", "승인된 방법으로 외관, 가장자리, 부착 또는 분진, 수분 균일성, 치수·질량과 폐기율을 비교합니다."], ["경계", "페이스팅 페이퍼와 AGM 주 분리막은 다른 층입니다", "재료 관찰만으로 극판 내구성이나 배터리 용량·수명·신뢰성을 입증할 수 없으며 극판 승인과 완성 배터리 검증이 필요합니다."], ["도입 전", "교체 전에 조건을 고정합니다", "재료 로트·속도·배합, 수분 채취점·로 운전창, 에너지 계기·분모, 극판 승인·폐기 및 후속 배터리 검사를 고정합니다."], ["FAQ", "유리섬유 페이스팅 페이퍼가 건조로 에너지를 줄일 수 있습니까?", "화양의 주장이나 정량 데이터는 없습니다. 동일 라인에서 합격 생산량, 속도, 수분, 로, 에너지, 품질, 폐기율을 비교해야 하며 재료 주장은 극판과 완성 배터리 검증을 대신하지 못합니다."]],
    parameters: [["단위 생산량 에너지", "동일한 전기·가스·증기 경계와 합격 생산량 분모를 사용합니다."], ["속도와 생산량", "설정/실제 속도, 합격 생산량, 정지 손실을 기록합니다."], ["수분과 건조로", "채취점, 구간 온도, 체류시간을 고정합니다."], ["극판 승인", "승인된 외관·균일성·부착 기준을 사용합니다."], ["폐기와 배터리", "폐기율과 완성 배터리 시험을 분리합니다."]],
    checklist: ["라인 속도와 페이스트 배합", "페이퍼 로트와 수분 상태", "로 온도·체류시간·에너지 경계", "극판과 폐기 승인 기준", "완성 배터리 검증 범위"],
    inquiry: ["AGM 페이스팅 페이퍼 기술 검토", "이 주장을 단위 생산량 에너지로 판단합니까, 로 온도 변화로 판단합니까? 라인 속도, 에너지 경계, 수분 상태와 극판 승인 요구를 보내 주십시오."]
  },
  ja: {
    title: "AGMガラス繊維ペースティング紙で乾燥エネルギーはどれだけ減るのか",
    summary: "乾燥炉の温度低下・停止という主張は、同一ラインで良品当たりエネルギー、速度、水分、極板品質を比較して検証します。",
    intro: "華陽は既存製品についてこの主張を掲載していますが、公開ページに節減量や試験条件はありません。第三者検証でもVikingの保証でもありません。",
    sections: [["出典", "華陽の既存製品ページにある企業主張です", "連続ペースティング、乾燥炉温度の低下または停止、植物繊維紙の代替を述べていますが、第三者試験や業界基準は示していません。"], ["不足条件", "炉温の変化だけではエネルギー結果になりません", "ライン速度、良品量、水分状態、炉ゾーンと滞留時間、電気・ガス・蒸気の計量境界、正規化方法が必要です。"], ["同一ライン比較", "良品単位当たりエネルギーを比較する", "現行紙と候補紙を同じライン、配合、極板形状、ペースト量、運転窓で流し、エネルギーと速度、水分、起動停止損失を記録します。"], ["極板受入", "品質と廃棄率は別々に証明する", "承認済み方法で外観、端部、付着・粉落ち、水分均一性、寸法・質量、廃棄率を比較します。"], ["境界", "ペースティング紙とAGM主セパレーターは同じ製品ではありません", "材料レベルの観察だけで極板耐久性や電池容量、寿命、信頼性は証明できず、極板受入と完成電池検証が必要です。"], ["導入前", "置換前に条件を固定する", "材料ロット・速度・配合、水分採取点・炉運転窓、エネルギー計器・分母、極板受入・廃棄と後工程電池検査を固定します。"], ["FAQ", "ガラス繊維ペースティング紙は乾燥炉エネルギーを減らせますか？", "華陽の企業主張ですが定量データはありません。同一ラインで良品量、速度、水分、炉条件、エネルギー、品質、廃棄率を比較し、材料主張とは別に極板と完成電池を検証します。"]],
    parameters: [["良品単位エネルギー", "同じ電気・ガス・蒸気境界と良品分母を使います。"], ["速度と生産量", "設定/実速度、良品量、停止損失を記録します。"], ["水分と炉", "採取点、ゾーン温度、滞留時間を固定します。"], ["極板受入", "承認済みの外観、均一性、付着基準を使います。"], ["廃棄と電池", "廃棄率と完成電池試験を分けます。"]],
    checklist: ["ライン速度とペースト配合", "紙ロットと水分状態", "炉温・滞留時間・エネルギー境界", "極板と廃棄の受入基準", "完成電池の検証範囲"],
    inquiry: ["AGMペースティング紙の技術評価", "この主張を良品単位エネルギーで判断しますか、それとも炉温変化で判断しますか？ ライン速度、エネルギー境界、水分状態、極板受入要件をお送りください。"]
  },
  es: {
    title: "¿Cuánta energía de secado puede ahorrar un papel de empastado AGM de fibra de vidrio?",
    summary: "La reducción de temperatura o parada del horno debe validarse en la misma línea con energía por producción aceptada, velocidad, humedad y calidad de placa.",
    intro: "Huayang formula esta afirmación para un producto existente, pero su página pública no aporta ahorro cuantificado ni condiciones de ensayo. No es una verificación independiente ni una promesa de Viking.",
    sections: [["Fuente", "Es una afirmación de la página de producto de Huayang", "La página menciona empastado continuo, menor temperatura o parada del horno y sustitución del papel vegetal, sin ensayo de terceros ni referencia sectorial."], ["Condiciones ausentes", "La temperatura del horno aún no es un resultado energético", "Se necesitan velocidad, producción aceptada, humedad, zonas y residencia del horno, frontera de electricidad/gas/vapor y método de normalización."], ["Comparación en la misma línea", "Compare energía por producción aceptada", "Ejecute el papel actual y el candidato en la misma línea, receta, geometría, carga de pasta y ventana de producción; registre energía junto con velocidad, humedad y pérdidas de arranque-parada."], ["Aceptación de placa", "Calidad y rechazo requieren evidencia separada", "Compare apariencia, bordes, adhesión o desprendimiento, uniformidad de humedad, dimensión o masa y rechazo con métodos aprobados."], ["Límite", "El papel de empastado no es el separador AGM principal", "Una observación del material no demuestra durabilidad de placa, capacidad, vida o fiabilidad de batería; siguen siendo necesarias la aceptación de placa y la validación de batería completa."], ["Antes de implantar", "Congele las condiciones antes de sustituir", "Fije lote, velocidad y receta; muestreo de humedad y ventana del horno; medidor y denominador energético; aceptación de placa, rechazo y pruebas posteriores de batería."], ["FAQ", "¿El papel de empastado de fibra de vidrio reduce la energía del horno?", "Es una afirmación de Huayang sin datos cuantificados. Se necesita comparación en la misma línea de producción aceptada, velocidad, humedad, horno, energía, calidad y rechazo; la afirmación del material no sustituye validar placa y batería."]],
    parameters: [["Energía por producción", "Use la misma frontera de electricidad, gas o vapor y el mismo denominador aceptado."], ["Velocidad y producción", "Registre velocidad fijada/real, producción aceptada y pérdidas por parada."], ["Humedad y horno", "Fije puntos de muestreo, temperaturas de zona y residencia."], ["Aceptación de placa", "Use criterios aprobados de apariencia, uniformidad y adhesión."], ["Rechazo y batería", "Separe el rechazo de los ensayos de batería completa."]],
    checklist: ["Velocidad y receta de pasta", "Lote de papel y humedad", "Temperatura, residencia y frontera energética", "Criterios de placa y rechazo", "Alcance de validación de batería"],
    inquiry: ["Evaluación técnica del papel de empastado AGM", "¿Juzgarán la afirmación por energía por producción o por cambio de temperatura? Envíen velocidad, frontera energética, humedad y requisitos de aceptación de placa."]
  },
  pt: {
    title: "Quanta energia de secagem um papel de empastamento AGM de fibra de vidro pode economizar?",
    summary: "A alegação de reduzir a temperatura ou desligar o forno deve ser validada na mesma linha por energia por produção aprovada, velocidade, umidade e qualidade da placa.",
    intro: "A Huayang faz essa alegação para um produto existente, mas a página pública não traz economia quantificada nem condições de ensaio. Não é validação independente nem promessa da Viking.",
    sections: [["Fonte", "É uma alegação da página de produto da Huayang", "A página cita empastamento contínuo, menor temperatura ou desligamento do forno e substituição do papel vegetal, sem ensaio de terceiros ou referência setorial."], ["Condições ausentes", "Temperatura do forno ainda não é resultado energético", "São necessários velocidade, produção aprovada, umidade, zonas e residência do forno, fronteira de eletricidade/gás/vapor e método de normalização."], ["Comparação na mesma linha", "Compare energia por produção aprovada", "Rode o papel atual e o candidato na mesma linha, receita, geometria, carga de pasta e janela de produção; registre energia com velocidade, umidade e perdas de partida/parada."], ["Aceitação da placa", "Qualidade e refugo exigem evidências separadas", "Compare aparência, bordas, aderência ou desprendimento, uniformidade de umidade, dimensão ou massa e refugo com métodos aprovados."], ["Limite", "Papel de empastamento não é o separador AGM principal", "Uma observação do material não prova durabilidade da placa, capacidade, vida ou confiabilidade da bateria; continuam necessários aceitação da placa e validação da bateria completa."], ["Antes de implementar", "Congele as condições antes da substituição", "Fixe lote, velocidade e receita; pontos de umidade e janela do forno; medidor e denominador energético; aceitação da placa, refugo e testes posteriores de bateria."], ["FAQ", "O papel de empastamento de fibra de vidro reduz a energia do forno?", "É uma alegação da Huayang sem dados quantificados. Exige comparação na mesma linha de produção aprovada, velocidade, umidade, forno, energia, qualidade e refugo; a alegação do material não substitui validar placa e bateria."]],
    parameters: [["Energia por produção", "Use a mesma fronteira de eletricidade, gás ou vapor e o mesmo denominador aprovado."], ["Velocidade e produção", "Registre velocidade definida/real, produção aprovada e perdas por parada."], ["Umidade e forno", "Fixe pontos de amostragem, temperaturas de zona e residência."], ["Aceitação da placa", "Use critérios aprovados de aparência, uniformidade e aderência."], ["Refugo e bateria", "Separe refugo dos testes de bateria completa."]],
    checklist: ["Velocidade e receita da pasta", "Lote de papel e umidade", "Temperatura, residência e fronteira energética", "Critérios de placa e refugo", "Escopo de validação da bateria"],
    inquiry: ["Avaliação técnica do papel de empastamento AGM", "Vocês julgarão a alegação por energia por produção ou por mudança de temperatura? Enviem velocidade, fronteira energética, umidade e requisitos de aceitação da placa."]
  },
  ru: {
    title: "Сколько энергии сушки может сэкономить стекловолоконная пастировочная бумага AGM?",
    summary: "Заявление о снижении температуры или отключении сушильной печи проверяют на одной линии по энергии на годную продукцию, скорости, влажности и качеству пластин.",
    intro: "Huayang заявляет это для существующего продукта, но открытая страница не содержит величины экономии или условий испытания. Это не независимая проверка и не обещание Viking.",
    sections: [["Источник", "Это корпоративное заявление на странице Huayang", "Страница говорит о непрерывном пастировании, снижении температуры или отключении печи и замене растительной бумаги, но не приводит независимых испытаний или отраслевой нормы."], ["Недостающие условия", "Температура печи еще не является энергетическим результатом", "Нужны скорость, годный выпуск, влажность, зоны и время пребывания, границы учета электричества/газа/пара и нормализация."], ["Сравнение на одной линии", "Сравнивайте энергию на годный выпуск", "Текущую и кандидатную бумагу прогоняют на одной линии с одинаковыми рецептурой, геометрией, загрузкой пасты и окном работы; фиксируют энергию, скорость, влажность и потери пуска-остановки."], ["Приемка пластин", "Качество и брак требуют отдельных доказательств", "По утвержденным методам сравнивают внешний вид, края, адгезию или осыпание, равномерность влажности, размеры/массу и процент брака."], ["Граница", "Пастировочная бумага не является основным AGM-сепаратором", "Наблюдение материала не доказывает долговечность пластин, емкость, ресурс или надежность батареи; нужны приемка пластин и проверка готовой батареи."], ["До внедрения", "Зафиксируйте условия до замены", "Закрепите партии, скорость и рецептуру; точки влажности и окно печи; счетчик и знаменатель энергии; приемку пластин, брак и последующие испытания батареи."], ["FAQ", "Снижает ли стекловолоконная пастировочная бумага энергию сушильной печи?", "Это заявление Huayang без количественных данных. Нужно сравнение на одной линии по годному выпуску, скорости, влажности, печи, энергии, качеству и браку; заявление материала не заменяет проверку пластин и батареи."]],
    parameters: [["Энергия на выпуск", "Одинаковые границы электричества, газа или пара и знаменатель годной продукции."], ["Скорость и выпуск", "Фиксируйте заданную/фактическую скорость, годный выпуск и потери остановок."], ["Влажность и печь", "Зафиксируйте точки отбора, температуры зон и время пребывания."], ["Приемка пластин", "Используйте утвержденные критерии внешнего вида, однородности и адгезии."], ["Брак и батарея", "Отделяйте процент брака от испытаний готовой батареи."]],
    checklist: ["Скорость линии и рецептура пасты", "Партия бумаги и влажность", "Температура, время и граница энергии", "Критерии пластин и брака", "Объем проверки готовой батареи"],
    inquiry: ["Техническая оценка пастировочной бумаги AGM", "Вы оцениваете заявление по энергии на выпуск или по изменению температуры? Передайте скорость, границу энергии, влажность и требования приемки пластин."]
  },
  ar: {
    title: "كم من طاقة التجفيف يمكن أن يوفره ورق طلاء AGM المصنوع من الألياف الزجاجية؟",
    summary: "يجب التحقق من ادعاء خفض حرارة فرن التجفيف أو إيقافه على الخط نفسه وفق الطاقة لكل إنتاج مقبول والسرعة والرطوبة وجودة اللوح.",
    intro: "تطرح Huayang هذا الادعاء لمنتج قائم، لكن الصفحة العامة لا تقدم مقدار توفير أو شروط اختبار. وهو ليس تحققاً مستقلاً ولا وعداً من Viking.",
    sections: [["المصدر", "هذا ادعاء شركة في صفحة منتج Huayang", "تذكر الصفحة الطلاء المستمر وخفض الحرارة أو إيقاف الفرن واستبدال الورق النباتي، من دون اختبار طرف ثالث أو معيار صناعي."], ["الشروط الناقصة", "تغير حرارة الفرن ليس نتيجة طاقة بعد", "يلزم تحديد سرعة الخط والإنتاج المقبول والرطوبة ومناطق الفرن وزمن المكوث وحدود قياس الكهرباء أو الغاز أو البخار وطريقة التطبيع."], ["مقارنة على الخط نفسه", "قارن الطاقة لكل إنتاج مقبول", "شغّل الورق الحالي والمرشح على الخط والوصفة وهندسة اللوح وكمية المعجون ونافذة الإنتاج نفسها، وسجل الطاقة مع السرعة والرطوبة وخسائر البدء والتوقف."], ["قبول اللوح", "الجودة والهالك يحتاجان دليلاً منفصلاً", "قارن المظهر والحواف والالتصاق أو التساقط وتجانس الرطوبة والأبعاد أو الكتلة ونسبة الهالك بطرق المصنع المعتمدة."], ["الحد", "ورق الطلاء ليس فاصل AGM الرئيسي", "ملاحظة المادة لا تثبت متانة اللوح أو سعة البطارية أو عمرها أو موثوقيتها؛ يلزم قبول اللوح والتحقق من البطارية الكاملة."], ["قبل التطبيق", "ثبّت الشروط قبل الاستبدال", "ثبّت الدفعات والسرعة والوصفة؛ نقاط الرطوبة ونافذة الفرن؛ العداد ومقام الطاقة؛ قبول اللوح والهالك واختبارات البطارية اللاحقة."], ["الأسئلة الشائعة", "هل يخفض ورق الطلاء الزجاجي طاقة فرن التجفيف؟", "هو ادعاء Huayang بلا بيانات كمية. يلزم اختبار على الخط نفسه للإنتاج المقبول والسرعة والرطوبة والفرن والطاقة والجودة والهالك؛ ولا يغني ادعاء المادة عن تحقق اللوح والبطارية."]],
    parameters: [["الطاقة لكل إنتاج", "استخدم حدود الكهرباء أو الغاز أو البخار نفسها ومقام الإنتاج المقبول نفسه."], ["السرعة والإنتاج", "سجل السرعة المضبوطة والفعلية والإنتاج المقبول وخسائر التوقف."], ["الرطوبة والفرن", "ثبّت نقاط العينات وحرارة المناطق وزمن المكوث."], ["قبول اللوح", "استخدم معايير المظهر والتجانس والالتصاق المعتمدة."], ["الهالك والبطارية", "افصل نسبة الهالك عن اختبار البطارية الكاملة."]],
    checklist: ["سرعة الخط ووصفة المعجون", "دفعة الورق وحالة الرطوبة", "الحرارة وزمن المكوث وحدود الطاقة", "معايير اللوح والهالك", "نطاق تحقق البطارية الكاملة"],
    inquiry: ["تقييم تقني لورق طلاء AGM", "هل تحكمون على الادعاء بالطاقة لكل إنتاج أم بتغير حرارة الفرن؟ أرسلوا سرعة الخط وحدود الطاقة والرطوبة ومتطلبات قبول اللوح."]
  }
};

for (const [locale, topic] of Object.entries(agmPastingPaperEnergyTopics)) {
  secondaryResourceData[locale].topics.agmPastingPaperEnergyValidation = topic;
}

const supplyChainReferences = [
  ["Changzhou Haixin", "https://www.cz-haixin.com.cn/about.html"],
  ["Huayang Industrial", "https://www.huayangagm.com/product/5/"],
  ["Yingkou Rijie", "https://www.ykrijie.com/boluo_company/"],
  ["Leoch", "https://leochlithium.cn/uploads/ueditor/file/20220708/6379287233502083425967267.pdf"]
];
const automotiveReferences = [
  ["Camel Group — 2026", "http://static.sse.com.cn/disclosure/listedinfo/announcement/c/new/2026-08-22/601311_20260822_JQ85.pdf"],
  ["Hollingsworth & Vose — AGM", "https://www.hollingsworth-vose.com/wp-content/uploads/AGM-Separator.pdf"],
  ["Hollingsworth & Vose — PowerFill AGM", "https://info.hollingsworth-vose.com/powerfill"]
];
for (const [locale, editions] of Object.entries(additionalResourceTopics)) {
  for (const [edition, kind] of [["supply", "agmSeparatorSupplyChain"], ["automotive", "agmStartStopBatteryProcurement"]]) {
    const [title, summary, sections, checklist, referenceNote] = editions[edition];
    secondaryResourceData[locale].topics[kind] = {
      title, summary, intro: summary, sections, checklist, referenceNote,
      parameters: sections.slice(0, 4).map(([, title, text]) => [title, text])
    };
  }
}

completeResourceSections(secondaryResourceData);

const articleCountLabels = {
  vi: "bài viết kỹ thuật", ko: "개의 기술 자료", ja: "件の技術記事", es: "artículos técnicos", pt: "artigos técnicos", ru: "технических статей", ar: "مقالاً فنياً"
};
const contactLabels = {
  vi: ["Điện thoại", "Email", "Sao chép số điện thoại", "Sao chép email", "Về đầu trang", "Đã sao chép", "Sao chép thông tin liên hệ:", "Xem thêm"],
  ko: ["전화", "이메일", "전화번호 복사", "이메일 복사", "맨 위로", "복사됨", "연락처를 복사하세요:", "더 보기"],
  ja: ["電話", "メール", "電話番号をコピー", "メールをコピー", "ページ先頭へ", "コピーしました", "連絡先をコピーしてください：", "もっと見る"],
  es: ["Teléfono", "Correo", "Copiar teléfono", "Copiar correo", "Volver arriba", "Copiado", "Copie este dato de contacto:", "Ver más"],
  pt: ["Telefone", "E-mail", "Copiar telefone", "Copiar e-mail", "Voltar ao topo", "Copiado", "Copie este contato:", "Ver mais"],
  ru: ["Телефон", "Почта", "Скопировать телефон", "Скопировать почту", "Наверх", "Скопировано", "Скопируйте контакт:", "Смотреть ещё"],
  ar: ["الهاتف", "البريد الإلكتروني", "نسخ الهاتف", "نسخ البريد الإلكتروني", "العودة للأعلى", "تم النسخ", "انسخ بيانات التواصل:", "عرض المزيد"]
};
for (const locale of secondaryResourceLocales) {
  secondaryResourceData[locale].hub.count = `${articleKinds.length} ${articleCountLabels[locale]}`;
  const [phone, email, copyPhone, copyEmail, backTop, copied, copyPrompt, viewMore] = contactLabels[locale];
  Object.assign(secondaryResourceData[locale].ui, { phone, email, copyPhone, copyEmail, backTop, copied, copyPrompt, viewMore });
}

const arabicReferenceNote = "توضح المصادر السياق الفني ولا تثبت مواصفات Viking أو اعتماد المنتج أو أداء البطارية. تُراجع الأرقام وشروطها في المصدر ولا تُعمم على جميع المواد والتطبيقات.";
const arabicReferences = {
  agmGlassFiberVsPvcSeparator: secondaryResourceData.vi.references.items,
  dataCenterBackupPowerAgmSeparator: dataCenterReferenceItems,
  earlyChinaLeadAcidBatteryManufacturing: earlyLeadAcidReferenceItems,
  agmSeparatorPressureRetention: pressureRetentionReferenceItems,
  agmSeparatorBatchProcessControl: batchProcessControlReferenceItems,
  agmSeparatorThirdPole: thirdPoleReferenceItems,
  agmSeparatorEnergyDataDelivery: energyDataDeliveryReferenceItems,
  agmSeparatorSupplyChain: supplyChainReferences,
  agmStartStopBatteryProcurement: automotiveReferences,
  en18060BatteryStandard: [
    ["القرار التنفيذي (EU) 2026/2048", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026D2048"],
    ["المفوضية الأوروبية — المعايير المنسقة للبطاريات", "https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards/eu-battery-regulation_en"]
  ],
  dataCenterEvLowVoltageAgm: [["LEOCH at ELBC 2026", "https://www.leoch.com/newsroom/events/leoch-at-elbc-2026"]],
  aiDataCenterBackupPowerLayers: [["Vision Group — LiLic Sidecar at YOTTA 2026", "https://www.vision-batt.com/en/news/show/6268vahkzaq.html"]],
  agmPastingPaperEnergyValidation: [["Huayang — Orange Series AGM Separator", "https://www.huayangagm.com/product/15.html"]]
};

function articleImage(kind, title) {
  const [src, width, height] = images[kind];
  return { src, alt: title, width, height };
}

function route(locale, kind) {
  return `/${locale}/blog/${articleDefinitions[kind][0]}/`;
}

function buildArticle(locale, kind, localeData) {
  const topic = localeData.topics[kind];
  const common = localeData.common;
  const definitions = Object.entries(articleDefinitions);
  const relatedKinds = kind === "dataCenterBackupPowerAgmSeparator"
    ? ["upsVrlaTechnologySelection", "agmSeparatorPerformanceConsistency", "keyTechnicalParameters", "agmSeparatorManufacturingQualityDelivery"]
    : kind === "aiDataCenterBackupPowerLayers"
      ? ["dataCenterBackupPowerAgmSeparator", "upsVrlaTechnologySelection", "keyTechnicalParameters", "agmSeparatorPerformanceConsistency"]
    : kind === "agmPastingPaperEnergyValidation"
      ? ["agmSeparatorEnergyDataDelivery", "agmSeparatorPerformanceConsistency", "keyTechnicalParameters", "agmSeparatorManufacturingQualityDelivery"]
    : kind === "dataCenterEvLowVoltageAgm"
      ? ["dataCenterBackupPowerAgmSeparator", "upsVrlaTechnologySelection", "agmStartStopBatteryProcurement", "keyTechnicalParameters"]
    : definitions.map(([candidate]) => candidate).filter((candidate) => candidate !== kind).slice(0, 4);
  const related = definitions
    .filter(([candidate]) => relatedKinds.includes(candidate))
    .map(([candidate]) => [localeData.topics[candidate].title, route(locale, candidate)]);

  const result = {
    nav: localeData.nav,
    language: locale.toUpperCase(),
    homePath: `/${locale}/`,
    languagePath: `/blog/${articleDefinitions[kind][0]}/`,
    brandName: "Hubei Viking Technology Co., Ltd.",
    quote: localeData.ui.sample,
    hero: {
      eyebrow: common.guide,
      title: topic.title,
      subtitle: topic.summary,
      primary: localeData.ui.sampleTitle,
      secondary: common.secondary,
      image: articleImage(kind, topic.title)
    },
    intro: [...new Set([topic.intro, topic.summary])],
    sections: topic.sections.map(([eyebrow, title, text]) => ({ eyebrow, title, text })),
    parameters: topic.parameters,
    formats: {
      eyebrow: common.formatsEyebrow,
      title: common.formatsTitle,
      items: [
        [common.roll[0], common.roll[1], "/images/viking-finished-separator-roll-900.webp", common.roll[0]],
        [common.sheet[0], common.sheet[1], "/images/sheets1-900.webp", common.sheet[0]]
      ]
    },
    checklist: {
      eyebrow: common.checklistEyebrow,
      title: common.checklistTitle,
      text: common.checklistText,
      items: topic.checklist
    },
    related: { eyebrow: common.relatedEyebrow, title: common.relatedTitle, items: related },
    inquiry: topic.inquiry ? {
      eyebrow: common.inquiryEyebrow,
      title: topic.inquiry[0],
      text: topic.inquiry[1],
      checklist: topic.checklist.slice(0, 4),
      placeholders: { message: topic.checklist.join(", ") }
    } : {
      eyebrow: common.inquiryEyebrow,
      title: common.inquiryTitle,
      text: common.inquiryText,
      checklist: common.inquiryChecklist,
      placeholders: { message: common.placeholder }
    },
    footer: { description: common.footer, wechat: common.wechat, mobile: common.mobile }
  };

  if (kind === "agmGlassFiberVsPvcSeparator") {
    result.comparison = localeData.comparison;
    result.references = localeData.references;
  }

  if (kind === "dataCenterBackupPowerAgmSeparator") {
    result.references = localeData.dataCenterReferences;
    result.formats = {
      eyebrow: common.formatsEyebrow,
      title: common.formatsTitle,
      items: [
        [common.roll[0], common.roll[1], "/images/viking-finished-separator-roll-900.webp", common.roll[0]],
        [localeData.nav.quality, common.checklistText, "/images/agm-quality-control-1200.webp", localeData.nav.quality],
        [common.sheet[0], common.sheet[1], "/images/evidence/shipping-pallet-01.webp", common.sheet[0]]
      ]
    };
  }

  if (kind === "dataCenterEvLowVoltageAgm") {
    result.references = {
      eyebrow: localeData.ui.reference,
      title: topic.title,
      text: topic.intro,
      items: [["LEOCH at ELBC 2026", "https://www.leoch.com/newsroom/events/leoch-at-elbc-2026"]]
    };
  }

  if (kind === "aiDataCenterBackupPowerLayers") {
    result.references = {
      eyebrow: localeData.ui.reference,
      title: topic.title,
      text: topic.intro,
      items: [["Vision Group — LiLic Sidecar at YOTTA 2026", "https://www.vision-batt.com/en/news/show/6268vahkzaq.html"]]
    };
  }

  if (kind === "agmPastingPaperEnergyValidation") {
    result.references = {
      eyebrow: localeData.ui.reference,
      title: topic.title,
      text: topic.intro,
      items: [["Huayang — Orange Series AGM Separator", "https://www.huayangagm.com/product/15.html"]]
    };
    result.formats = {
      eyebrow: common.formatsEyebrow,
      title: topic.sections[2][1],
      items: [
        [topic.parameters[0][0], topic.parameters[0][1], "/images/agm-hero-production-1600.webp", topic.parameters[0][0]],
        [topic.parameters[3][0], topic.parameters[3][1], "/images/agm-quality-control-1200.webp", topic.parameters[3][0]],
        [topic.parameters[4][0], topic.parameters[4][1], "/images/evidence/quality-electrical-resistance-test-01.webp", topic.parameters[4][0]]
      ]
    };
  }

  if (kind === "earlyChinaLeadAcidBatteryManufacturing") {
    result.timeline = localeData.earlyLeadAcidTimeline;
    result.references = localeData.earlyLeadAcidReferences;
    result.formats = {
      eyebrow: common.formatsEyebrow,
      title: common.formatsTitle,
      items: [
        [common.roll[0], common.roll[1], "/images/viking-finished-separator-roll-900.webp", common.roll[0]],
        [localeData.nav.quality, common.checklistText, "/images/agm-quality-control-1200.webp", localeData.nav.quality],
        [common.sheet[0], common.sheet[1], "/images/evidence/shipping-pallet-01.webp", common.sheet[0]]
      ]
    };
  }

  if (kind === "agmSeparatorPressureRetention") {
    result.references = localeData.pressureRetentionReferences;
    result.formats = {
      eyebrow: common.formatsEyebrow,
      title: common.formatsTitle,
      items: [
        [common.roll[0], common.roll[1], "/images/viking-finished-separator-roll-900.webp", common.roll[0]],
        [localeData.nav.quality, common.checklistText, "/images/agm-quality-control-1200.webp", localeData.nav.quality],
        [common.sheet[0], common.sheet[1], "/images/sheets1-900.webp", common.sheet[0]]
      ]
    };
  }

  if (kind === "agmSeparatorBatchProcessControl") {
    result.comparison = localeData.batchProcessControlComparison;
    result.references = localeData.batchProcessControlReferences;
    result.formats = {
      eyebrow: common.formatsEyebrow,
      title: common.formatsTitle,
      items: [
        [common.roll[0], common.roll[1], "/images/viking-finished-separator-roll-900.webp", common.roll[0]],
        [localeData.nav.quality, common.checklistText, "/images/agm-quality-control-1200.webp", localeData.nav.quality],
        [common.sheet[0], common.sheet[1], "/images/evidence/shipping-pallet-01.webp", common.sheet[0]]
      ]
    };
  }

  if (kind === "agmSeparatorThirdPole") {
    const [eyebrow, title, columns, rows] = resourceComparisons[locale][0];
    result.comparison = { eyebrow, title, columns, rows };
    result.references = localeData.thirdPoleReferences;
  }

  if (kind === "agmSeparatorEnergyDataDelivery") {
    const [eyebrow, title, columns, rows] = resourceComparisons[locale][1];
    result.comparison = { eyebrow, title, columns, rows };
    result.references = localeData.energyDataDeliveryReferences;
  }

  if (kind === "agmSeparatorSupplyChain" || kind === "agmStartStopBatteryProcurement") {
    result.references = {
      eyebrow: localeData.ui.reference, title: topic.title,
      text: topic.referenceNote || arabicReferenceNote,
      items: kind === "agmSeparatorSupplyChain" ? supplyChainReferences : automotiveReferences
    };
  }
  if (kind === "en18060BatteryStandard") {
    result.references = {
      eyebrow: localeData.ui.reference, title: topic.title, text: topic.intro,
      items: [["(EU) 2026/2048", "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026D2048"], ["(EU) 2023/1542 — EN 18060:2025", "https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards/eu-battery-regulation_en"]]
    };
  }
  if (locale === "ar" && arabicReferences[kind]) {
    result.references = {
      eyebrow: localeData.ui.reference, title: "المصادر وحدود الاستدلال",
      text: kind === "agmStartStopBatteryProcurement"
        ? "أرقام Camel Group خاصة بتقرير الشركة وليست معدلات وطنية أو عالمية. المراجع الفنية لا تثبت مواصفات Viking ولا تضمن نتائج البطارية."
        : kind === "agmSeparatorSupplyChain"
          ? "تصف المصادر أجزاء من سلسلة التوريد ولا تثبت مصادر مواد Viking أو معداتها أو نطاق نظام الجودة."
          : arabicReferenceNote,
      items: arabicReferences[kind].map(([label, url], index) => [locale === "ar" && kind !== "en18060BatteryStandard" ? `المصدر ${index + 1} — ${new URL(url).hostname}` : label, url])
    };
  }

  return result;
}

export function buildSecondaryArticleCopy(data = secondaryResourceData) {
  return Object.fromEntries(
    secondaryResourceLocales.map((locale) => [
      locale,
      Object.fromEntries(articleKinds.map((kind) => [kind, buildArticle(locale, kind, data[locale])]))
    ])
  );
}

export const secondaryArticleCopy = buildSecondaryArticleCopy();

export function buildSecondaryArticleSeo(locale, kind) {
  const localeData = secondaryResourceData[locale];
  const topic = localeData.topics[kind];
  return {
    path: route(locale, kind),
    locale: localeData.meta.og,
    language: localeData.meta.hreflang,
    siteName: localeData.meta.site,
    title: `${topic.title} | Viking AGM`,
    description: topic.summary,
    keywords: [topic.title, "AGM separator", "VRLA", "Viking AGM"],
    pageName: topic.title,
    articleDescription: topic.summary,
    breadcrumbs: [localeData.nav.company, localeData.nav.resources, topic.title],
    datePublished: articleDefinitions[kind][2],
    dateModified: locale === "ar" || completedResourceKinds.includes(kind) || ["agmSeparatorSupplyChain", "agmStartStopBatteryProcurement", "agmSeparatorThirdPole", "agmSeparatorEnergyDataDelivery", "en18060BatteryStandard"].includes(kind)
      ? "2026-10-04" : articleDefinitions[kind][3] ?? "2026-08-05"
  };
}
