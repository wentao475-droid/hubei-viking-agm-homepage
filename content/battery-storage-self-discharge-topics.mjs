export const batteryStorageTopics = {
  "zh": {
    "title": "电池没用过也会掉电：从出厂到安装的库存管理",
    "summary": "把储存时间、温度与外部待机负载分别记录，再判断低荷电状态的原因；单次读数不能证明电池缺陷或隔板责任。",
    "sections": [
      [
        "出厂只是时间线的起点",
        "出厂只是时间线的起点",
        "铅酸电池完成生产、检测并入库后，内部化学反应仍在继续，因此即使没有外部负载，荷电状态也可能下降。GS Yuasa 于 2024 年 11 月 1 日发布的库存、销售与退货管理资料说明，内部持续反应会使电池逐渐失去电量，温暖夏季会加快这一过程；该资料面向其经销与售后场景。“没用过”只说明未给外部设备供电，不代表电量一直不变。生产日期、出厂检测和入库记录有助于重建库存时间；同批电池储存时长不同，也需要分别查看。"
      ],
      [
        "补充充电与补液是两件事",
        "补充充电与补液是两件事",
        "维护性补充充电，是使用合适设备并按照该型号厂家的要求恢复电量；补液则是向电池中加入液体，两者不能互相替代。AGM 采用密封阀控结构，荷电状态下降时，不应以撬开电池、加水或注入其他液体应对。检查及充电应依照适用产品文件，由具备相应经验的人员执行。免维护或密封设计降低了日常补水维护需求，并不意味着电池不会自放电。"
      ],
      [
        "库存记录必须同时包含时间和温度",
        "库存记录必须同时包含时间和温度",
        "库存管理不只记录数量，还应保留入库日期、批次、储存环境、定期状态检查和维护历史，以便重建产品经历。检查内容、周期及何时需要补充充电，须来自该型号制造商的文件，不同产品的建议并不相同。例如 Yuasa Battery Inc. 的储存页面针对指定 Powersports AGM 产品给出检查和维护指导，并指出高温会加快自放电；页面未显示明确发布日期。其周期和电压要求不能推广到所有 AGM 或 VRLA 电池。仓库应结合适用文件开展库存轮换和状态检查。"
      ],
      [
        "记录应延续到运输、收货与安装",
        "记录应延续到运输、收货与安装",
        "电池出库后仍会经历运输、临时存放和等待安装。只有“已发货”记录，通常不足以定位状态变化发生在哪一环节。可追溯信息包括型号和批次、生产或发运日期、入出库日期、运输及收货时间、安装日期，以及各阶段检查和补充充电记录。这不是要求每块电池采用同一检查频率，而是保存各次交接中可比较的信息。是否符合储存要求、是否需要进一步测试，应由制造商或该型号的责任人员对照产品文件判断。"
      ],
      [
        "内部自放电与设备待机耗电分开检查",
        "内部自放电与设备待机耗电分开检查",
        "电池接入车辆或系统后，即使设备未运行，控制模块、报警器、通信设备等也可能消耗待机电流。这种外部耗电与内部自放电不同。排查时先确认独立储存还是已接入设备、持续多久，再对照电池与设备记录。发现低荷电状态时，单次读数通常无法定位变化阶段；应按时间顺序核对型号、生产发运日期、温度和时长、运输与安装延迟、连接状态及检查记录，缺失时段明确标为信息缺口。不能仅凭“未使用却读数低”认定电池有缺陷，也不能据此归责隔板。"
      ],
      [
        "整电池维护与隔板匹配的责任边界",
        "整电池维护与隔板匹配的责任边界",
        "储存和交付中的电池状态涉及制造商、经销商、仓库及用户；AGM 隔板则有独立的材料供应和制造质量流程。隔板支持保液并配合极群结构，不能消除整电池自放电，也不能替代库存检查和维护性充电。异常时先收集型号、时间线、储存条件和外部负载信息，再由责任方对照产品记录调查。隔板是否满足约定规格，应依据相应批次材料检验与整电池验证结果，而非端子单次读数。维京提供 AGM 隔板及规格沟通支持，匹配仍需结合电池设计、工况和制造商验证要求。整电池维护遵循其产品文件。"
      ],
      [
        "常见问答 1",
        "新电池没用过，为什么还会掉电？",
        "未使用不代表荷电状态不变。内部自放电仍会发生，储存温度和时间会影响状态；接入设备后的待机耗电需要另行检查。"
      ],
      [
        "常见问答 2",
        "AGM 电池掉电后应当补液吗？",
        "不应以打开密封电池、加水或注液解决掉电。是否需要检查或补充充电，应按具体型号文件由相应人员判断。"
      ],
      [
        "常见问答 3",
        "到货电量低，能证明隔板有问题吗？",
        "不能。先重建储存、运输、安装及连接状态记录；隔板责任需要材料检验和对应批次的电池验证，不能由单次端子读数确定。"
      ]
    ],
    "faq": [
      [
        "新电池没用过，为什么还会掉电？",
        "未使用不代表荷电状态不变。内部自放电仍会发生，储存温度和时间会影响状态；接入设备后的待机耗电需要另行检查。"
      ],
      [
        "AGM 电池掉电后应当补液吗？",
        "不应以打开密封电池、加水或注液解决掉电。是否需要检查或补充充电，应按具体型号文件由相应人员判断。"
      ],
      [
        "到货电量低，能证明隔板有问题吗？",
        "不能。先重建储存、运输、安装及连接状态记录；隔板责任需要材料检验和对应批次的电池验证，不能由单次端子读数确定。"
      ]
    ],
    "checklist": [
      "型号、批次与出厂检测",
      "入出库及安装时间线",
      "温度与检查维护记录",
      "独立储存或连接状态"
    ],
    "intro": "把储存时间、温度与外部待机负载分别记录，再判断低荷电状态的原因；单次读数不能证明电池缺陷或隔板责任。",
    "parameters": [],
    "referenceNote": "来源核验于 2026 年 10 月 31 日。GS Yuasa 资料日期为 2024 年 11 月 1 日；Yuasa Battery Inc. 储存页未见明确发布日期。两者均为其产品或经销场景指导，不构成通用检查周期、电压门槛或所有 AGM/VRLA 电池的维护规定。AI 配图不是检测或实拍证据。"
  },
  "en": {
    "title": "An Unused Battery Can Still Lose Charge: Managing Factory-to-Installation Time",
    "summary": "Separate storage time, temperature and connected standby loads before attributing a low state of charge to a battery defect or AGM separator.",
    "faq": [
      [
        "Why can an unused new battery lose charge?",
        "Unused does not mean an unchanged state of charge. Internal self-discharge continues during storage; time and temperature matter. Any connected standby load must be checked separately."
      ],
      [
        "Should an AGM battery be topped up with fluid after losing charge?",
        "Do not open a sealed AGM battery or add water or another liquid to address charge loss. Inspection and any maintenance charging must follow the instructions for the exact model."
      ],
      [
        "Does a low arrival reading prove a separator defect?",
        "No. Reconstruct storage, transport, installation and connection records first. Separator responsibility requires relevant material inspection and battery-validation evidence, not a single terminal reading."
      ]
    ],
    "checklist": [
      "Model, batch and factory tests",
      "Warehouse and installation timeline",
      "Temperature, checks and maintenance",
      "Independent storage or connected load"
    ],
    "intro": "A battery’s condition can change even when it has never powered equipment. Storage time, temperature and any connected standby load must be separated and documented before a low state of charge is treated as evidence of a defect or attributed to an AGM separator.",
    "sections": [
      [
        "Factory condition is only the start of the timeline",
        "Factory condition is only the start of the timeline",
        "After a lead-acid battery has been manufactured, tested and placed in inventory, internal chemical reactions continue. Its state of charge can therefore decline without an external load.\n\nIn stock-management guidance dated November 1, 2024, GS Yuasa explains that batteries gradually lose charge through ongoing internal chemical reactions and that discharge is faster during warmer summer conditions. The guidance was written for the company’s dealer and after-sales context.\n\n“Never used” only means that the battery has not powered an external device. It does not establish that its state of charge remained unchanged. Production dates, factory test records and warehouse entry dates help show how long each battery has been in inventory. Batteries from the same batch may also require individual review if their storage periods differ."
      ],
      [
        "Charging and adding fluid are different actions",
        "Charging and adding fluid are different actions",
        "A maintenance charge means restoring charge with suitable equipment and according to the battery manufacturer’s instructions for the specific model. Adding fluid means putting liquid into the battery. These actions are not interchangeable.\n\nAGM batteries use a sealed, valve-regulated construction. If their state of charge declines, users should not respond by opening the battery, adding water or introducing another liquid. Any inspection or charging procedure must follow the applicable product documentation and be performed by appropriately experienced personnel."
      ],
      [
        "Storage records need both time and temperature",
        "Storage records need both time and temperature",
        "Battery inventory management should record more than quantities. The entry date, batch, storage environment, periodic condition checks and maintenance history can help a distributor or warehouse team reconstruct what the product experienced.\n\nThe required checks, inspection intervals and conditions for a maintenance charge must come from the battery manufacturer’s documentation for that model. Recommendations are not identical across products.\n\nFor example, a Yuasa Battery Inc. storage page provides inspection and maintenance guidance for specified Powersports AGM batteries and notes that higher storage temperatures accelerate self-discharge. The page does not show a clear publication date. Its intervals and voltage requirements apply to the products covered by that guidance and should not be extended to every AGM or VRLA battery.\n\nA maintenance-free or sealed design reduces routine water-maintenance requirements. It does not stop self-discharge or remove the need for inventory control. Warehouses should manage stock rotation and condition checks against the relevant battery documentation, rather than applying values from another brand or model as a universal rule."
      ],
      [
        "The record should continue through transport and installation",
        "The record should continue through transport and installation",
        "Time continues to pass after a battery leaves the warehouse. Transport, temporary storage and installation scheduling may all affect the delivery timeline.\n\nA record that says only “shipped” is rarely enough to locate the stage at which a change occurred. Useful traceability may include the model and batch, production or dispatch date, warehouse entry and exit dates, transport and receipt times, installation date, and any inspection or maintenance-charge records.\n\nThis does not mean that every battery should follow one inspection frequency. The purpose is to preserve comparable information at each handover. Compliance with storage requirements and the need for further testing should be assessed by the battery manufacturer or personnel responsible for the model, using the applicable product documents."
      ],
      [
        "Internal self-discharge and connected loads require separate checks",
        "Internal self-discharge and connected loads require separate checks",
        "Once a battery is connected to a vehicle or another system, standby electronics may draw current even when the equipment is not operating. Control modules, alarms, communication devices and other standby components are possible examples.\n\nThat external consumption is distinct from the battery’s internal self-discharge. An investigation should first establish whether the battery was stored independently or connected to equipment, how long that condition continued, and what the battery and equipment records show.\n\nWhen a low state of charge is found, a single reading usually cannot identify where the change occurred. Review the model, manufacturing and dispatch dates, storage temperature and duration, transport and installation delay, connection status, and available inspection records in chronological order. Any period without records should be marked as an information gap.\n\nA battery should not be classified as defective solely because it was unused or arrived with a low reading. The same observation also cannot, by itself, assign responsibility to the separator. Charging equipment, procedures and thresholds must be confirmed against the instructions for the specific battery."
      ],
      [
        "Battery maintenance and separator matching are separate responsibilities",
        "Battery maintenance and separator matching are separate responsibilities",
        "Battery condition during storage and delivery involves the battery manufacturer, distributor, warehouse and user. AGM separator control follows a separate material-supply and battery-manufacturing quality process.\n\nThe separator supports electrolyte retention and works with the plate-group structure. It cannot eliminate self-discharge in the complete battery or replace storage checks and maintenance charging. When an inventory or delivery anomaly appears, the first step is to collect the model, timeline, storage conditions and external-load information. The responsible parties can then investigate against the product records.\n\nWhether a separator met an agreed specification should be determined through the material inspection and battery-validation results for the relevant batch. A terminal battery reading alone cannot establish separator responsibility.\n\nViking Technology supplies AGM separators and supports specification discussions with battery manufacturers. Separator matching should reflect the battery design, operating conditions and the manufacturer’s validation requirements. Maintenance of the complete battery remains governed by the relevant battery documentation and responsible battery parties."
      ],
      [
        "FAQ 1",
        "Why can an unused new battery lose charge?",
        "Unused does not mean an unchanged state of charge. Internal self-discharge continues during storage; time and temperature matter. Any connected standby load must be checked separately."
      ],
      [
        "FAQ 2",
        "Should an AGM battery be topped up with fluid after losing charge?",
        "Do not open a sealed AGM battery or add water or another liquid to address charge loss. Inspection and any maintenance charging must follow the instructions for the exact model."
      ],
      [
        "FAQ 3",
        "Does a low arrival reading prove a separator defect?",
        "No. Reconstruct storage, transport, installation and connection records first. Separator responsibility requires relevant material inspection and battery-validation evidence, not a single terminal reading."
      ]
    ],
    "parameters": [],
    "referenceNote": "Sources checked on 31 October 2026. GS Yuasa guidance is dated 1 November 2024; the Yuasa Battery Inc. storage page has no clear publication date. Both address their own products or dealer contexts, not universal inspection intervals, voltage thresholds or maintenance rules for all AGM/VRLA batteries. The AI illustration is not test or site evidence."
  },
  "vi": {
    "title": "Ắc quy chưa dùng vẫn mất điện: quản lý từ xuất xưởng đến lắp đặt",
    "summary": "Ghi riêng thời gian, nhiệt độ lưu kho và tải chờ bên ngoài trước khi quy trạng thái nạp thấp cho lỗi ắc quy hoặc tấm ngăn AGM.",
    "sections": [
      [
        "Xuất xưởng chỉ là đầu dòng thời gian",
        "Xuất xưởng chỉ là đầu dòng thời gian",
        "Sau sản xuất, thử nghiệm và nhập kho, phản ứng hóa học bên trong ắc quy chì vẫn tiếp tục; trạng thái nạp có thể giảm ngay cả khi không có tải ngoài. Hướng dẫn quản lý tồn kho, bán hàng và đổi trả của GS Yuasa ngày 1/11/2024 giải thích sự mất điện dần và ảnh hưởng của mùa hè nóng, trong bối cảnh đại lý và hậu mãi của hãng. Chưa dùng chỉ có nghĩa chưa cấp điện cho thiết bị, không chứng minh điện tích không đổi. Cần ngày sản xuất, thử xuất xưởng và nhập kho; cùng lô nhưng thời gian lưu khác nhau vẫn cần xem riêng."
      ],
      [
        "Nạp bảo dưỡng khác với châm dung dịch",
        "Nạp bảo dưỡng khác với châm dung dịch",
        "Nạp bảo dưỡng khôi phục điện tích bằng thiết bị phù hợp theo tài liệu đúng mẫu ắc quy. Châm dung dịch là đưa chất lỏng vào bình; hai việc không thay thế nhau. AGM có kết cấu kín điều áp van. Không mở bình, thêm nước hay chất lỏng khác để xử lý trạng thái nạp thấp. Kiểm tra và nạp phải theo tài liệu sản phẩm, do người có kinh nghiệm phù hợp thực hiện. Thiết kế kín hoặc miễn bảo dưỡng giảm nhu cầu châm nước thường xuyên, không ngăn tự phóng điện."
      ],
      [
        "Hồ sơ kho cần cả thời gian lẫn nhiệt độ",
        "Hồ sơ kho cần cả thời gian lẫn nhiệt độ",
        "Không chỉ đếm số lượng: lưu ngày nhập, lô, môi trường, kiểm tra định kỳ và lịch sử bảo dưỡng để tái dựng điều kiện sản phẩm. Nội dung, chu kỳ kiểm tra và điều kiện nạp lấy từ tài liệu nhà sản xuất cho đúng mẫu. Trang lưu trữ của Yuasa Battery Inc. hướng dẫn các bình Powersports AGM cụ thể và nêu nhiệt độ cao tăng tự phóng điện; không thấy ngày công bố rõ ràng. Chu kỳ và điện áp đó không áp dụng cho mọi AGM/VRLA. Quản lý luân chuyển kho và tình trạng dựa trên tài liệu liên quan."
      ],
      [
        "Tiếp tục ghi nhận qua vận chuyển và lắp đặt",
        "Tiếp tục ghi nhận qua vận chuyển và lắp đặt",
        "Sau xuất kho còn vận chuyển, lưu tạm và chờ lắp. Chỉ ghi đã giao không đủ xác định giai đoạn thay đổi. Theo dõi mẫu, lô, ngày sản xuất hoặc gửi hàng, nhập/xuất kho, vận chuyển, nhận hàng, lắp đặt và mọi lần kiểm tra, nạp bảo dưỡng. Mục đích là thông tin có thể đối chiếu qua từng bàn giao, không phải áp một tần suất kiểm tra cho mọi bình. Nhà sản xuất hoặc người phụ trách mẫu bình đánh giá việc tuân thủ lưu trữ và nhu cầu thử thêm theo hồ sơ sản phẩm."
      ],
      [
        "Tách tự phóng điện khỏi tải chờ",
        "Tách tự phóng điện khỏi tải chờ",
        "Khi nối vào xe hoặc hệ thống, bộ điều khiển, báo động hay liên lạc có thể tiêu thụ điện dù máy không hoạt động. Đây là tải ngoài, khác phản ứng bên trong. Xác nhận bình lưu độc lập hay đã kết nối, trong bao lâu và hồ sơ thiết bị. Một số đo thấp không xác định được giai đoạn xảy ra; xem theo trình tự thời gian mẫu, sản xuất/gửi hàng, nhiệt độ, thời gian, chậm vận chuyển/lắp, kết nối và kiểm tra. Đánh dấu giai đoạn thiếu dữ liệu. Không kết luận lỗi bình hay trách nhiệm tấm ngăn chỉ vì chưa dùng mà điện thấp."
      ],
      [
        "Bảo dưỡng bình và đối chiếu tấm ngăn là hai trách nhiệm",
        "Bảo dưỡng bình và đối chiếu tấm ngăn là hai trách nhiệm",
        "Tình trạng khi lưu/giao liên quan nhà sản xuất, đại lý, kho và người dùng; tấm ngăn có quy trình chất lượng vật liệu và sản xuất riêng. Tấm ngăn AGM giữ điện dịch và phối hợp cụm bản cực, không loại bỏ tự phóng điện hay thay thế kiểm tra và nạp. Khi bất thường, thu mẫu, dòng thời gian, điều kiện lưu và tải để bên phụ trách điều tra. Đạt quy cách tấm ngăn cần kiểm tra vật liệu và xác nhận ắc quy theo lô, không chỉ số đo cực. Viking hỗ trợ quy cách theo thiết kế, điều kiện vận hành và yêu cầu xác nhận; bảo dưỡng bình vẫn theo tài liệu bình."
      ],
      [
        "Hỏi đáp 1",
        "Vì sao bình mới chưa dùng vẫn mất điện?",
        "Tự phóng điện vẫn xảy ra. Thời gian và nhiệt độ lưu kho ảnh hưởng trạng thái; tải chờ đã kết nối phải kiểm tra riêng."
      ],
      [
        "Hỏi đáp 2",
        "AGM mất điện có cần thêm dung dịch?",
        "Không mở bình kín hoặc thêm nước/chất lỏng để xử lý. Kiểm tra và nạp bảo dưỡng phải theo đúng mẫu."
      ],
      [
        "Hỏi đáp 3",
        "Điện thấp khi nhận hàng chứng minh lỗi tấm ngăn?",
        "Không. Tái dựng lưu kho, vận chuyển, lắp và kết nối; kết luận cần kiểm tra vật liệu và xác nhận bình đúng lô."
      ]
    ],
    "faq": [
      [
        "Vì sao bình mới chưa dùng vẫn mất điện?",
        "Tự phóng điện vẫn xảy ra. Thời gian và nhiệt độ lưu kho ảnh hưởng trạng thái; tải chờ đã kết nối phải kiểm tra riêng."
      ],
      [
        "AGM mất điện có cần thêm dung dịch?",
        "Không mở bình kín hoặc thêm nước/chất lỏng để xử lý. Kiểm tra và nạp bảo dưỡng phải theo đúng mẫu."
      ],
      [
        "Điện thấp khi nhận hàng chứng minh lỗi tấm ngăn?",
        "Không. Tái dựng lưu kho, vận chuyển, lắp và kết nối; kết luận cần kiểm tra vật liệu và xác nhận bình đúng lô."
      ]
    ],
    "checklist": [
      "Mẫu, lô và thử xuất xưởng",
      "Dòng thời gian kho và lắp đặt",
      "Nhiệt độ, kiểm tra và bảo dưỡng",
      "Lưu độc lập hay kết nối"
    ],
    "intro": "Ghi riêng thời gian, nhiệt độ lưu kho và tải chờ bên ngoài trước khi quy trạng thái nạp thấp cho lỗi ắc quy hoặc tấm ngăn AGM.",
    "parameters": [],
    "referenceNote": "Kiểm tra nguồn 31/10/2026. GS Yuasa ghi ngày 1/11/2024; Yuasa Battery Inc. không có ngày rõ ràng. Hướng dẫn cho sản phẩm hoặc đại lý của hãng, không là chu kỳ, ngưỡng điện áp hay quy tắc chung cho AGM/VRLA. Hình AI không phải bằng chứng thử nghiệm."
  },
  "ko": {
    "title": "사용하지 않은 배터리도 방전됩니다: 출고부터 설치까지 관리",
    "summary": "낮은 충전 상태를 배터리 결함이나 AGM 분리막 탓으로 판단하기 전에 보관 시간·온도와 외부 대기 부하를 구분해 기록합니다.",
    "sections": [
      [
        "출고 상태는 시간선의 시작입니다",
        "출고 상태는 시간선의 시작입니다",
        "납축전지는 제조·검사·입고 뒤에도 내부 화학 반응이 계속되어 외부 부하 없이 충전 상태가 낮아질 수 있습니다. GS Yuasa의 2024년 11월 1일 재고·판매·반품 지침은 지속적인 내부 반응과 더운 여름의 빠른 방전을 설명하며 해당 대리점·사후관리 상황을 대상으로 합니다. 미사용은 외부 장비에 전력을 공급하지 않았다는 뜻이지 충전 상태가 그대로라는 뜻은 아닙니다. 생산일, 출고 검사와 입고일을 확인하고, 같은 로트라도 보관 기간이 다르면 개별 검토합니다."
      ],
      [
        "보충 충전과 보액은 다릅니다",
        "보충 충전과 보액은 다릅니다",
        "유지 충전은 해당 모델 지침에 따라 적절한 장비로 충전량을 회복하는 작업이고 보액은 액체를 넣는 작업입니다. 서로 대체할 수 없습니다. AGM은 밀폐형 밸브 조절 구조이므로 충전 상태가 낮다고 케이스를 열거나 물·다른 액체를 넣지 않습니다. 점검과 충전은 제품 문서와 적합한 경험을 가진 인력에 따릅니다. 무보수·밀폐 설계는 일상 보수의 급수 필요를 줄일 뿐 자기방전을 막지는 않습니다."
      ],
      [
        "시간과 온도를 함께 기록합니다",
        "시간과 온도를 함께 기록합니다",
        "재고 수량 외에 입고일, 로트, 보관 환경, 정기 상태 검사와 유지 이력을 남겨 제품이 겪은 조건을 재구성합니다. 검사 내용·주기와 유지 충전 조건은 정확한 모델의 제조사 문서에서 확인해야 합니다. Yuasa Battery Inc. 보관 페이지는 특정 Powersports AGM 제품의 점검·관리를 설명하고 고온의 빠른 자기방전을 언급하지만 명확한 게시일은 없습니다. 그 주기나 전압을 모든 AGM/VRLA에 적용하지 않습니다. 재고 회전과 상태 검사는 해당 문서를 기준으로 합니다."
      ],
      [
        "운송과 설치까지 이력을 이어갑니다",
        "운송과 설치까지 이력을 이어갑니다",
        "출고 뒤 운송, 임시 보관, 설치 대기에도 시간이 흐릅니다. 배송 완료만으로 변화 시점을 찾기는 어렵습니다. 모델·로트, 생산 또는 발송일, 입출고일, 운송·인수·설치일과 검사·충전 이력을 보존합니다. 모든 배터리에 같은 점검 빈도를 정하려는 것이 아니라 인계 단계별 비교 가능한 정보를 남기는 목적입니다. 보관 요구 준수와 추가 시험 필요는 제조사 또는 모델 책임자가 해당 문서로 판단합니다."
      ],
      [
        "자기방전과 연결된 대기 부하를 구분합니다",
        "자기방전과 연결된 대기 부하를 구분합니다",
        "차량·시스템에 연결되면 장비가 정지해도 제어 모듈, 경보·통신 장치가 대기 전류를 소비할 수 있습니다. 외부 소비는 내부 자기방전과 별개입니다. 독립 보관인지 연결 상태인지, 기간과 장비 기록부터 확인합니다. 낮은 한 번의 측정으로 발생 단계를 특정할 수 없습니다. 생산·발송일, 온도·기간, 운송·설치 지연, 연결 및 점검을 시간순으로 검토하고 기록 없는 구간은 정보 공백으로 표시합니다. 미사용 저전압만으로 배터리 결함이나 분리막 책임을 판정하지 않습니다."
      ],
      [
        "배터리 유지와 분리막 적합성은 별도 책임입니다",
        "배터리 유지와 분리막 적합성은 별도 책임입니다",
        "보관·인도 상태에는 제조사, 유통사, 창고와 사용자가 관여하며 AGM 분리막에는 별도 소재 공급·제조 품질 과정이 있습니다. 분리막은 보액과 극군 구조를 지원하지만 완성 배터리 자기방전을 없애거나 점검·유지 충전을 대신하지 않습니다. 이상이 있으면 모델, 시간선, 보관 조건과 외부 부하를 수집해 책임자가 조사합니다. 약정 사양 충족은 해당 로트 소재 검사와 배터리 검증으로 판단하고 단자 한 번 측정으로 정하지 않습니다. Viking의 분리막 협의는 배터리 설계·운전 조건·검증 요구에 따르며 완성 배터리 관리는 해당 제품 문서를 따릅니다."
      ],
      [
        "자주 묻는 질문 1",
        "새 배터리를 쓰지 않아도 방전되나요?",
        "내부 자기방전은 계속됩니다. 보관 시간과 온도를 확인하고 연결된 대기 부하는 별도로 검사합니다."
      ],
      [
        "자주 묻는 질문 2",
        "AGM 충전량이 줄면 물을 보충하나요?",
        "밀폐 배터리를 열거나 물·액체를 넣지 않습니다. 해당 모델 지침으로 점검·유지 충전을 판단합니다."
      ],
      [
        "자주 묻는 질문 3",
        "도착 시 낮은 측정값이 분리막 결함 증거인가요?",
        "아닙니다. 보관·운송·설치·연결 이력을 복원하고 로트별 소재 검사와 배터리 검증이 필요합니다."
      ]
    ],
    "faq": [
      [
        "새 배터리를 쓰지 않아도 방전되나요?",
        "내부 자기방전은 계속됩니다. 보관 시간과 온도를 확인하고 연결된 대기 부하는 별도로 검사합니다."
      ],
      [
        "AGM 충전량이 줄면 물을 보충하나요?",
        "밀폐 배터리를 열거나 물·액체를 넣지 않습니다. 해당 모델 지침으로 점검·유지 충전을 판단합니다."
      ],
      [
        "도착 시 낮은 측정값이 분리막 결함 증거인가요?",
        "아닙니다. 보관·운송·설치·연결 이력을 복원하고 로트별 소재 검사와 배터리 검증이 필요합니다."
      ]
    ],
    "checklist": [
      "모델·로트·출고 시험",
      "창고·설치 시간선",
      "온도·점검·유지 이력",
      "독립 보관 또는 연결 상태"
    ],
    "intro": "낮은 충전 상태를 배터리 결함이나 AGM 분리막 탓으로 판단하기 전에 보관 시간·온도와 외부 대기 부하를 구분해 기록합니다.",
    "parameters": [],
    "referenceNote": "2026년 10월 31일 출처 확인. GS Yuasa 문서는 2024년 11월 1일이며 Yuasa Battery Inc. 페이지는 게시일이 명확하지 않습니다. 각사 제품·대리점용 지침이며 모든 AGM/VRLA의 공통 주기·전압 기준이 아닙니다. AI 그림은 시험 증거가 아닙니다."
  },
  "ja": {
    "title": "未使用の電池も放電する：出荷から設置までの保管管理",
    "summary": "低い充電状態を電池不良やAGMセパレーターに結び付ける前に、保管時間・温度と外部待機負荷を分けて記録します。",
    "sections": [
      [
        "出荷状態は時系列の出発点",
        "出荷状態は時系列の出発点",
        "鉛蓄電池は製造・検査・入庫後も内部反応が続き、外部負荷がなくても充電状態が低下します。GS Yuasaの2024年11月1日付在庫・販売・返品管理資料は、内部反応による電荷減少と暖かい夏の加速を説明しています。同社の販売店・アフターサービス向けの文脈です。未使用は外部機器へ給電していないという意味で、充電状態が変わらない証明ではありません。製造日、出荷検査と入庫日を確認し、同一ロットでも保管期間が違えば個別に検討します。"
      ],
      [
        "補充電と補液は別の作業",
        "補充電と補液は別の作業",
        "維持充電は適合機器とその型番の指示に従って電荷を回復する作業、補液は内部に液体を入れる作業で、相互に代用できません。AGMは密閉型の弁制御構造です。充電状態が低いからといって開封、注水、別の液体の注入で対応しません。点検と充電は製品文書に従い相応の経験を持つ担当者が行います。密閉・メンテナンスフリー設計は日常の補水を減らしますが、自己放電を止めるわけではありません。"
      ],
      [
        "保管記録には時間と温度の両方が必要",
        "保管記録には時間と温度の両方が必要",
        "数量に加え入庫日、ロット、保管環境、定期点検と維持履歴を残し、製品の経験した条件を再構成します。検査内容、間隔、補充電の条件は該当型番のメーカー文書によります。Yuasa Battery Inc.の保管ページは特定のPowersports AGM向けで、高温で自己放電が速くなると説明していますが、明確な公開日はありません。その間隔や電圧を全AGM/VRLAに一般化できません。在庫回転と状態確認は適用文書を基準にします。"
      ],
      [
        "輸送と設置まで記録をつなぐ",
        "輸送と設置まで記録をつなぐ",
        "出庫後にも輸送、一時保管、設置待ちが続きます。出荷済みだけでは変化した段階を特定できません。型番・ロット、製造または発送日、入出庫日、輸送・受領・設置日、点検と維持充電の記録を保ちます。すべての電池に同じ検査頻度を課すためではなく、引き渡しごとに比較可能な情報を残すためです。保管条件への適合や追加試験の必要性は、メーカーまたは型番の責任者が製品文書で判断します。"
      ],
      [
        "自己放電と接続機器の待機消費を分ける",
        "自己放電と接続機器の待機消費を分ける",
        "車両やシステムに接続すると、装置停止中でも制御、警報、通信などが待機電流を消費する場合があります。外部消費は内部自己放電と別です。単独保管か接続済みか、その期間と装置記録を先に確認します。一度の低い測定値で発生段階は特定できません。製造・発送日、保管温度と期間、輸送・設置遅延、接続状態と点検を時系列で確認し、不明期間は情報欠落と明記します。未使用なのに低いという理由だけで電池不良やセパレーター責任とは判断しません。"
      ],
      [
        "電池保守とセパレーター適合の責任範囲",
        "電池保守とセパレーター適合の責任範囲",
        "保管と納入時の状態にはメーカー、販売店、倉庫、使用者が関わり、AGMセパレーターには別の材料供給・製造品質工程があります。保液と極群構造を支えますが、完成電池の自己放電をなくしたり点検・維持充電を代替したりはできません。異常時は型番、時系列、環境、外部負荷を集めて責任者が調査します。合意仕様の充足は該当ロットの材料検査と電池検証で確認し、端子の一度の測定で決めません。Vikingは設計、運転条件、メーカーの検証に沿って仕様を協議します。電池保守はその製品文書に従います。"
      ],
      [
        "よくある質問 1",
        "未使用の新品も充電量が減りますか？",
        "内部の自己放電は続きます。保管時間と温度を確認し、接続した待機負荷は別途調べます。"
      ],
      [
        "よくある質問 2",
        "AGMが放電したら補液しますか？",
        "密閉電池を開けたり水や液体を入れたりしません。型番別の指示で点検と補充電を判断します。"
      ],
      [
        "よくある質問 3",
        "到着時の低い値はセパレーター不良の証拠ですか？",
        "いいえ。保管・輸送・設置・接続の記録を再構成し、該当ロットの材料検査と電池検証が必要です。"
      ]
    ],
    "faq": [
      [
        "未使用の新品も充電量が減りますか？",
        "内部の自己放電は続きます。保管時間と温度を確認し、接続した待機負荷は別途調べます。"
      ],
      [
        "AGMが放電したら補液しますか？",
        "密閉電池を開けたり水や液体を入れたりしません。型番別の指示で点検と補充電を判断します。"
      ],
      [
        "到着時の低い値はセパレーター不良の証拠ですか？",
        "いいえ。保管・輸送・設置・接続の記録を再構成し、該当ロットの材料検査と電池検証が必要です。"
      ]
    ],
    "checklist": [
      "型番・ロット・出荷試験",
      "入出庫と設置の時系列",
      "温度・点検・維持履歴",
      "単独保管か接続済みか"
    ],
    "intro": "低い充電状態を電池不良やAGMセパレーターに結び付ける前に、保管時間・温度と外部待機負荷を分けて記録します。",
    "parameters": [],
    "referenceNote": "出典確認は2026年10月31日。GS Yuasaは2024年11月1日付、Yuasa Battery Inc.には明確な公開日なし。各社の製品・販売店向けで、全AGM/VRLA共通の間隔・電圧基準ではありません。AI図は試験証拠ではありません。"
  },
  "es": {
    "title": "Una batería sin usar también pierde carga: de fábrica a instalación",
    "summary": "Separe tiempo y temperatura de almacenamiento de las cargas externas en espera antes de atribuir una carga baja a un defecto o al separador AGM.",
    "sections": [
      [
        "La salida de fábrica solo inicia la cronología",
        "La salida de fábrica solo inicia la cronología",
        "Las reacciones internas continúan después de fabricar, probar y almacenar una batería de plomo-ácido; su carga puede disminuir sin una carga externa. La guía de GS Yuasa del 1 de noviembre de 2024 explica esa pérdida y su aceleración en verano, dentro de su contexto de distribuidores y posventa. Sin usar significa que no alimentó equipos, no que mantuvo la carga. Fecha de producción, pruebas de fábrica e ingreso al almacén permiten reconstruir el tiempo; baterías del mismo lote pueden necesitar revisión individual si sus períodos difieren."
      ],
      [
        "Recargar y añadir líquido son acciones distintas",
        "Recargar y añadir líquido son acciones distintas",
        "La carga de mantenimiento recupera carga con equipos adecuados y las instrucciones del modelo exacto. Añadir líquido introduce fluido; no son intercambiables. AGM utiliza una construcción sellada regulada por válvula. Una carga baja no se resuelve abriendo la batería, añadiendo agua u otro líquido. Inspección y carga deben seguir la documentación del producto y corresponder a personal con experiencia adecuada. El diseño sellado o libre de mantenimiento reduce la reposición rutinaria de agua, pero no elimina la autodescarga."
      ],
      [
        "Registre tanto tiempo como temperatura",
        "Registre tanto tiempo como temperatura",
        "Además de cantidades, registre ingreso, lote, ambiente, inspecciones y mantenimiento para reconstruir las condiciones. El contenido, los intervalos de inspección y las condiciones de recarga proceden del fabricante para ese modelo. La página de Yuasa Battery Inc. trata determinadas baterías Powersports AGM y señala mayor autodescarga con calor; no muestra fecha de publicación clara. Sus intervalos y voltajes no se extienden a todas las AGM/VRLA. Gestione rotación y condición conforme a la documentación aplicable."
      ],
      [
        "Continúe el registro hasta transporte e instalación",
        "Continúe el registro hasta transporte e instalación",
        "Después del despacho siguen transporte, almacenamiento temporal y espera de instalación. Solo indicar enviado rara vez permite ubicar el cambio. Conserve modelo, lote, fechas de producción o despacho, entrada/salida de almacén, transporte, recepción, instalación e inspecciones y recargas. El fin es información comparable en cada entrega, no imponer una frecuencia única a todas las baterías. El fabricante o responsable del modelo evalúa cumplimiento del almacenamiento y necesidad de pruebas según sus documentos."
      ],
      [
        "Distinga autodescarga y consumo externo en espera",
        "Distinga autodescarga y consumo externo en espera",
        "Conectada a un vehículo o sistema, la batería puede alimentar controles, alarmas y comunicaciones aunque el equipo no opere. Ese consumo externo difiere de la autodescarga interna. Compruebe almacenamiento aislado o conexión, duración y registros del equipo. Una lectura baja no identifica la etapa: revise cronológicamente modelo, fabricación, despacho, temperatura, duración, retrasos de transporte/instalación, conexión e inspecciones. Marque los períodos sin registros como vacíos de información. No declare defecto ni responsabilidad del separador solo porque llegó baja y sin uso."
      ],
      [
        "Mantenimiento y selección del separador tienen límites distintos",
        "Mantenimiento y selección del separador tienen límites distintos",
        "El estado en almacenamiento y entrega involucra fabricante, distribuidor, almacén y usuario; el separador tiene otro proceso de calidad de material y fabricación. AGM retiene electrolito y trabaja con el grupo de placas, sin eliminar autodescarga ni sustituir inspecciones o recarga. Ante anomalías, reúna modelo, cronología, condiciones y carga externa para investigar. Cumplir la especificación del separador exige inspección de material y validación de batería del lote, no una lectura en terminales. Viking apoya especificaciones según diseño, operación y validación del fabricante; el mantenimiento de la batería sigue su documentación."
      ],
      [
        "Preguntas frecuentes 1",
        "¿Por qué pierde carga una batería nueva sin usar?",
        "La autodescarga interna continúa; tiempo y temperatura importan. Compruebe por separado cualquier carga conectada en espera."
      ],
      [
        "Preguntas frecuentes 2",
        "¿Se debe añadir líquido a una AGM descargada?",
        "No abra la batería sellada ni añada agua u otro líquido. Inspección y recarga siguen las instrucciones del modelo exacto."
      ],
      [
        "Preguntas frecuentes 3",
        "¿Una lectura baja al recibirla demuestra un defecto del separador?",
        "No. Reconstruya almacenamiento, transporte, instalación y conexión. Se requieren inspección de material y validación de batería del lote."
      ]
    ],
    "faq": [
      [
        "¿Por qué pierde carga una batería nueva sin usar?",
        "La autodescarga interna continúa; tiempo y temperatura importan. Compruebe por separado cualquier carga conectada en espera."
      ],
      [
        "¿Se debe añadir líquido a una AGM descargada?",
        "No abra la batería sellada ni añada agua u otro líquido. Inspección y recarga siguen las instrucciones del modelo exacto."
      ],
      [
        "¿Una lectura baja al recibirla demuestra un defecto del separador?",
        "No. Reconstruya almacenamiento, transporte, instalación y conexión. Se requieren inspección de material y validación de batería del lote."
      ]
    ],
    "checklist": [
      "Modelo, lote y pruebas de fábrica",
      "Cronología de almacén e instalación",
      "Temperatura, inspecciones y mantenimiento",
      "Almacenamiento aislado o conexión"
    ],
    "intro": "Separe tiempo y temperatura de almacenamiento de las cargas externas en espera antes de atribuir una carga baja a un defecto o al separador AGM.",
    "parameters": [],
    "referenceNote": "Fuentes verificadas el 31 de octubre de 2026. GS Yuasa: 1 de noviembre de 2024; Yuasa Battery Inc.: sin fecha clara. Son guías de sus productos o distribuidores, no intervalos, umbrales ni reglas universales para AGM/VRLA. La imagen de IA no es evidencia de ensayo."
  },
  "pt": {
    "title": "Bateria sem uso também perde carga: da fábrica à instalação",
    "summary": "Separe tempo e temperatura de armazenagem das cargas externas em espera antes de atribuir carga baixa a defeito ou ao separador AGM.",
    "sections": [
      [
        "A saída da fábrica é só o início da linha do tempo",
        "A saída da fábrica é só o início da linha do tempo",
        "As reações químicas internas continuam após fabricação, ensaio e entrada em estoque; a carga pode cair sem consumo externo. A orientação da GS Yuasa de 1º de novembro de 2024 explica a perda gradual e sua aceleração no verão, no contexto de revendedores e pós-venda da empresa. Sem uso significa que não alimentou equipamento, não que a carga ficou igual. Produção, ensaios de fábrica e entrada no depósito ajudam a reconstruir o período. Mesmo lote pode exigir revisão individual quando os tempos de armazenagem diferem."
      ],
      [
        "Recarga e adição de líquido são ações diferentes",
        "Recarga e adição de líquido são ações diferentes",
        "A carga de manutenção recupera carga com equipamento apropriado e instruções do modelo exato. Adicionar líquido introduz fluido; uma ação não substitui a outra. AGM tem construção selada regulada por válvula. Não abra a bateria, coloque água ou outro líquido para resolver carga baixa. Inspeção e carga seguem os documentos do produto e pessoal com experiência adequada. Construção selada ou livre de manutenção reduz reposição rotineira de água, mas não impede autodescarga."
      ],
      [
        "Registre tempo e temperatura de estoque",
        "Registre tempo e temperatura de estoque",
        "Além da quantidade, guarde data de entrada, lote, ambiente, inspeções e manutenção para reconstituir as condições. Conteúdo, periodicidade e condições de recarga vêm da documentação do fabricante para aquele modelo. A página da Yuasa Battery Inc. orienta determinadas baterias Powersports AGM e relaciona calor a maior autodescarga; não há data clara de publicação. Seus intervalos e tensões não valem para todas as AGM/VRLA. Rotação de estoque e verificações precisam seguir o documento aplicável."
      ],
      [
        "Mantenha o histórico até transporte e instalação",
        "Mantenha o histórico até transporte e instalação",
        "Após a saída há transporte, armazenagem temporária e espera de instalação. Apenas enviado raramente localiza a mudança. Preserve modelo, lote, datas de produção ou despacho, entrada/saída, transporte, recebimento, instalação, inspeções e recargas. A finalidade é informação comparável em cada passagem, não uma frequência única para toda bateria. O fabricante ou responsável pelo modelo avalia conformidade de armazenagem e necessidade de novos ensaios usando seus documentos."
      ],
      [
        "Separe autodescarga de consumo externo em espera",
        "Separe autodescarga de consumo externo em espera",
        "Ligada a veículo ou sistema, a bateria pode alimentar módulos, alarmes e comunicação mesmo com equipamento parado. Esse consumo externo difere da autodescarga interna. Verifique se ficou isolada ou conectada, durante quanto tempo e o histórico do equipamento. Uma leitura baixa não identifica a etapa; revise cronologicamente produção, despacho, temperatura, duração, atrasos de transporte/instalação, conexão e inspeções. Marque períodos sem registro como lacunas. Não declare defeito nem responsabilidade do separador só porque a bateria chegou com carga baixa e nunca foi usada."
      ],
      [
        "Manutenção da bateria e seleção do separador são responsabilidades distintas",
        "Manutenção da bateria e seleção do separador são responsabilidades distintas",
        "O estado no estoque e na entrega envolve fabricante, distribuidor, depósito e usuário; o separador tem processo próprio de qualidade de material e fabricação. AGM retém eletrólito e integra a estrutura do grupo de placas, mas não elimina autodescarga nem substitui inspeção ou recarga. Em anomalias, reúna modelo, linha do tempo, condições e carga externa para investigação. A conformidade do separador exige inspeção e validação da bateria do lote, não uma leitura nos terminais. A Viking apoia especificações conforme projeto, operação e validação do fabricante; a manutenção da bateria segue sua documentação."
      ],
      [
        "Perguntas frequentes 1",
        "Por que uma bateria nova sem uso perde carga?",
        "A autodescarga interna continua; tempo e temperatura importam. Verifique separadamente qualquer carga externa em espera."
      ],
      [
        "Perguntas frequentes 2",
        "Uma AGM com pouca carga precisa de líquido?",
        "Não abra a bateria selada nem adicione água ou outro líquido. Inspeção e recarga seguem as instruções do modelo exato."
      ],
      [
        "Perguntas frequentes 3",
        "Leitura baixa na entrega prova defeito do separador?",
        "Não. Reconstitua estoque, transporte, instalação e conexão. São necessárias inspeção de material e validação da bateria do lote."
      ]
    ],
    "faq": [
      [
        "Por que uma bateria nova sem uso perde carga?",
        "A autodescarga interna continua; tempo e temperatura importam. Verifique separadamente qualquer carga externa em espera."
      ],
      [
        "Uma AGM com pouca carga precisa de líquido?",
        "Não abra a bateria selada nem adicione água ou outro líquido. Inspeção e recarga seguem as instruções do modelo exato."
      ],
      [
        "Leitura baixa na entrega prova defeito do separador?",
        "Não. Reconstitua estoque, transporte, instalação e conexão. São necessárias inspeção de material e validação da bateria do lote."
      ]
    ],
    "checklist": [
      "Modelo, lote e ensaios de fábrica",
      "Linha do tempo do estoque à instalação",
      "Temperatura, inspeções e manutenção",
      "Armazenagem isolada ou conexão"
    ],
    "intro": "Separe tempo e temperatura de armazenagem das cargas externas em espera antes de atribuir carga baixa a defeito ou ao separador AGM.",
    "parameters": [],
    "referenceNote": "Fontes verificadas em 31 de outubro de 2026. GS Yuasa: 1º de novembro de 2024; Yuasa Battery Inc.: sem data clara. Orientações para produtos ou revendedores próprios, não intervalos, tensões ou regras universais para AGM/VRLA. A ilustração de IA não é prova de ensaio."
  },
  "ru": {
    "title": "Неиспользованный аккумулятор тоже теряет заряд: от завода до монтажа",
    "summary": "Отделяйте срок и температуру хранения от внешней дежурной нагрузки, прежде чем связывать низкий заряд с дефектом батареи или AGM-сепаратором.",
    "sections": [
      [
        "Заводское состояние — начало хронологии",
        "Заводское состояние — начало хронологии",
        "После изготовления, испытаний и постановки на склад внутренние реакции свинцовой батареи продолжаются; заряд может снижаться без внешней нагрузки. GS Yuasa в руководстве по запасам, продажам и возвратам от 1 ноября 2024 года описывает постепенную потерю заряда и ускорение летом в контексте своих дилеров и сервиса. Не использовалась означает лишь отсутствие питания внешнего устройства, а не неизменность заряда. Даты производства, заводских испытаний и приемки помогают восстановить срок. Даже одна партия требует отдельной оценки при разном времени хранения."
      ],
      [
        "Подзаряд и долив жидкости — разные действия",
        "Подзаряд и долив жидкости — разные действия",
        "Обслуживающий заряд восстанавливает заряд подходящим оборудованием по инструкции конкретной модели. Долив вводит жидкость; это не взаимозаменяемые процедуры. AGM имеет герметизированную клапанно-регулируемую конструкцию. Не вскрывайте батарею, не добавляйте воду или иную жидкость из-за снижения заряда. Проверки и заряд выполняет персонал с соответствующим опытом по документации изделия. Необслуживаемая конструкция уменьшает потребность в регулярном доливе воды, но не останавливает саморазряд."
      ],
      [
        "Для склада нужны срок и температура",
        "Для склада нужны срок и температура",
        "Кроме количества фиксируйте приемку, партию, среду хранения, проверки и обслуживание для восстановления условий. Состав и периодичность проверки, основания подзаряда берут из документации производителя данной модели. Страница Yuasa Battery Inc. относится к определенным Powersports AGM и указывает ускорение саморазряда при нагреве; явной даты публикации нет. Ее интервалы и напряжения нельзя переносить на все AGM/VRLA. Ротацию запасов и контроль состояния ведут по применимым документам."
      ],
      [
        "Продолжайте записи до перевозки и установки",
        "Продолжайте записи до перевозки и установки",
        "После отгрузки идут транспорт, временное хранение и ожидание монтажа. Одного статуса отправлено недостаточно для локализации изменения. Сохраняйте модель, партию, даты изготовления/отправки, приемки/выдачи, перевозки, получения, установки, проверок и подзаряда. Цель — сопоставимые сведения при передаче, а не единая частота проверок для всех батарей. Соблюдение хранения и необходимость испытаний оценивает изготовитель или ответственный за модель по ее документации."
      ],
      [
        "Отделяйте саморазряд от дежурного потребления",
        "Отделяйте саморазряд от дежурного потребления",
        "После подключения к машине или системе модули управления, сигнализация и связь могут потреблять ток при остановленном оборудовании. Это внешнее потребление, отличное от внутреннего саморазряда. Уточните отдельное хранение или подключение, длительность и записи оборудования. Одно низкое показание не определяет этап: проверьте по времени производство, отправку, температуру, срок, транспортные/монтажные задержки, подключения и осмотры. Отсутствующие периоды обозначайте пробелами данных. Нельзя признать дефект или вину сепаратора только по низкому заряду неиспользованной батареи."
      ],
      [
        "Обслуживание батареи и подбор сепаратора имеют разные границы",
        "Обслуживание батареи и подбор сепаратора имеют разные границы",
        "За состояние на складе и при доставке отвечают участники цепочки: изготовитель, дистрибьютор, склад и пользователь; у сепаратора отдельный процесс качества материала и производства. Он удерживает электролит и работает в группе пластин, но не устраняет саморазряд и не заменяет проверки или подзаряд. При отклонении собирают модель, хронологию, условия и нагрузку для расследования. Соответствие сепаратора спецификации подтверждают контролем материала и валидацией батареи партии, не единичным замером клемм. Viking обсуждает параметры по конструкции, режиму и требованиям валидации изготовителя; обслуживание батареи определяется ее документами."
      ],
      [
        "Вопросы и ответы 1",
        "Почему новая батарея теряет заряд без использования?",
        "Внутренний саморазряд продолжается; важны срок и температура. Подключенную дежурную нагрузку проверяют отдельно."
      ],
      [
        "Вопросы и ответы 2",
        "Нужно ли доливать жидкость в разряженную AGM?",
        "Не вскрывайте герметизированную батарею и не добавляйте воду или жидкость. Проверка и подзаряд — по инструкции модели."
      ],
      [
        "Вопросы и ответы 3",
        "Низкое показание при получении доказывает дефект сепаратора?",
        "Нет. Восстановите хранение, перевозку, установку и подключения. Нужны контроль материала и валидация батареи соответствующей партии."
      ]
    ],
    "faq": [
      [
        "Почему новая батарея теряет заряд без использования?",
        "Внутренний саморазряд продолжается; важны срок и температура. Подключенную дежурную нагрузку проверяют отдельно."
      ],
      [
        "Нужно ли доливать жидкость в разряженную AGM?",
        "Не вскрывайте герметизированную батарею и не добавляйте воду или жидкость. Проверка и подзаряд — по инструкции модели."
      ],
      [
        "Низкое показание при получении доказывает дефект сепаратора?",
        "Нет. Восстановите хранение, перевозку, установку и подключения. Нужны контроль материала и валидация батареи соответствующей партии."
      ]
    ],
    "checklist": [
      "Модель, партия, заводские испытания",
      "Хронология склада и установки",
      "Температура, проверки, обслуживание",
      "Отдельное хранение или подключение"
    ],
    "intro": "Отделяйте срок и температуру хранения от внешней дежурной нагрузки, прежде чем связывать низкий заряд с дефектом батареи или AGM-сепаратором.",
    "parameters": [],
    "referenceNote": "Источники проверены 31 октября 2026 года. GS Yuasa: 1 ноября 2024 года; Yuasa Battery Inc.: явной даты нет. Это указания для своих изделий или дилеров, не общие интервалы, напряжения или правила для всех AGM/VRLA. Иллюстрация ИИ не является испытанием."
  },
  "ar": {
    "title": "البطارية غير المستخدمة تفقد الشحن أيضاً: من المصنع إلى التركيب",
    "summary": "افصل مدة التخزين وحرارته عن الأحمال الخارجية في وضع الاستعداد قبل ربط انخفاض الشحن بعيب البطارية أو فاصل AGM.",
    "sections": [
      [
        "حالة المصنع هي بداية التسلسل الزمني",
        "حالة المصنع هي بداية التسلسل الزمني",
        "تستمر التفاعلات الداخلية في بطارية الرصاص الحمضية بعد التصنيع والفحص والتخزين، ولذلك قد تنخفض حالة الشحن من دون حمل خارجي. تشرح إرشادات GS Yuasa للمخزون والمبيعات والمرتجعات بتاريخ 1 نوفمبر 2024 فقد الشحن التدريجي وتسارعه في الصيف الدافئ، ضمن سياق وكلائها وخدمات ما بعد البيع. عدم الاستخدام يعني أنها لم تغذ جهازاً خارجياً، ولا يثبت ثبات الشحن. احفظ تاريخ الإنتاج وفحص المصنع ودخول المخزن، وراجع كل بطارية عند اختلاف مدة التخزين حتى في الدفعة الواحدة."
      ],
      [
        "شحن الصيانة وإضافة السوائل عمليتان مختلفتان",
        "شحن الصيانة وإضافة السوائل عمليتان مختلفتان",
        "يعيد شحن الصيانة الشحنة بمعدات ملائمة وتعليمات الطراز المحدد، بينما تعني إضافة السائل إدخاله إلى البطارية؛ ولا تحل إحداهما محل الأخرى. تستخدم AGM بنية محكمة ومنظمة بصمام. لا تعالج انخفاض الشحن بفتح البطارية أو إضافة الماء أو أي سائل آخر. يتبع الفحص والشحن وثائق المنتج وينفذهما أشخاص ذوو خبرة مناسبة. التصميم المحكم أو الذي لا يحتاج صيانة يقلل احتياج إضافة الماء دورياً، لكنه لا يوقف التفريغ الذاتي."
      ],
      [
        "سجل الوقت ودرجة الحرارة معاً",
        "سجل الوقت ودرجة الحرارة معاً",
        "لا يكفي عد الوحدات؛ احفظ تاريخ الدخول والدفعة وبيئة التخزين والفحوص الدورية والصيانة لإعادة بناء ظروف المنتج. تأتي الفحوص وفتراتها وشروط شحن الصيانة من وثائق الشركة للطراز نفسه. تتناول صفحة Yuasa Battery Inc. بطاريات Powersports AGM محددة وتشير إلى تسارع التفريغ الذاتي مع الحرارة، ولا يظهر تاريخ نشر واضح. لا تعمم فتراتها أو قيم جهدها على كل AGM أو VRLA. أدر تدوير المخزون وفحوص الحالة وفق الوثائق المنطبقة."
      ],
      [
        "يستمر السجل خلال النقل والتركيب",
        "يستمر السجل خلال النقل والتركيب",
        "يمضي الوقت بعد الخروج من المخزن خلال النقل والتخزين المؤقت وانتظار التركيب. عبارة تم الشحن وحدها لا تحدد مرحلة التغير. احفظ الطراز والدفعة وتاريخ الإنتاج أو الإرسال والدخول والخروج والنقل والاستلام والتركيب وفحوص الحالة وشحن الصيانة. الغرض معلومات قابلة للمقارنة عند كل تسليم، وليس فرض وتيرة فحص واحدة. يقيّم المصنع أو المسؤول عن الطراز الالتزام بمتطلبات التخزين والحاجة لاختبارات إضافية وفق وثائق المنتج."
      ],
      [
        "افصل التفريغ الذاتي عن استهلاك الاستعداد",
        "افصل التفريغ الذاتي عن استهلاك الاستعداد",
        "عند التوصيل بمركبة أو نظام قد تسحب وحدات التحكم والإنذار والاتصالات تياراً والجهاز متوقف. هذا حمل خارجي يختلف عن التفريغ الداخلي. حدد أولاً التخزين المنفصل أو حالة التوصيل ومدتها وسجلات المعدات. لا تحدد قراءة منخفضة واحدة المرحلة؛ راجع زمنياً الإنتاج والإرسال والحرارة والمدة وتأخر النقل والتركيب والتوصيل والفحوص. سم الفترات التي تفتقر للسجلات فجوات معلومات. لا تثبت القراءة المنخفضة لبطارية غير مستخدمة وجود عيب أو مسؤولية الفاصل."
      ],
      [
        "صيانة البطارية وملاءمة الفاصل مسؤوليتان منفصلتان",
        "صيانة البطارية وملاءمة الفاصل مسؤوليتان منفصلتان",
        "تشمل حالة التخزين والتسليم المصنع والموزع والمخزن والمستخدم، وللفاصل مسار مستقل لجودة توريد المادة وتصنيع البطارية. يدعم احتجاز الإلكتروليت وبنية مجموعة الألواح، لكنه لا يلغي التفريغ الذاتي ولا يستبدل الفحص أو شحن الصيانة. عند الخلل اجمع الطراز والتسلسل والظروف والحمل الخارجي للتحقيق. تثبت مطابقة الفاصل بفحص المادة والتحقق من بطارية الدفعة، لا بقراءة طرفية واحدة. تدعم Viking مناقشة المواصفات وفق التصميم والتشغيل ومتطلبات تحقق المصنع؛ وتظل صيانة البطارية خاضعة لوثائقها."
      ],
      [
        "أسئلة شائعة 1",
        "لماذا تفقد بطارية جديدة غير مستخدمة شحنتها؟",
        "يستمر التفريغ الذاتي الداخلي، وتتأثر الحالة بالوقت والحرارة. افحص أي حمل استعداد موصول بصورة منفصلة."
      ],
      [
        "أسئلة شائعة 2",
        "هل نضيف سائلاً إلى AGM منخفضة الشحن؟",
        "لا تفتح البطارية المحكمة ولا تضف ماء أو سائلاً. يتبع الفحص وشحن الصيانة تعليمات الطراز المحدد."
      ],
      [
        "أسئلة شائعة 3",
        "هل القراءة المنخفضة عند الاستلام تثبت عيب الفاصل؟",
        "لا. أعد بناء سجلات التخزين والنقل والتركيب والتوصيل. يلزم فحص المادة والتحقق من البطارية للدفعة المعنية."
      ]
    ],
    "faq": [
      [
        "لماذا تفقد بطارية جديدة غير مستخدمة شحنتها؟",
        "يستمر التفريغ الذاتي الداخلي، وتتأثر الحالة بالوقت والحرارة. افحص أي حمل استعداد موصول بصورة منفصلة."
      ],
      [
        "هل نضيف سائلاً إلى AGM منخفضة الشحن؟",
        "لا تفتح البطارية المحكمة ولا تضف ماء أو سائلاً. يتبع الفحص وشحن الصيانة تعليمات الطراز المحدد."
      ],
      [
        "هل القراءة المنخفضة عند الاستلام تثبت عيب الفاصل؟",
        "لا. أعد بناء سجلات التخزين والنقل والتركيب والتوصيل. يلزم فحص المادة والتحقق من البطارية للدفعة المعنية."
      ]
    ],
    "checklist": [
      "الطراز والدفعة وفحص المصنع",
      "تسلسل المخزن والتركيب",
      "الحرارة والفحوص والصيانة",
      "تخزين منفصل أم حمل موصول"
    ],
    "intro": "افصل مدة التخزين وحرارته عن الأحمال الخارجية في وضع الاستعداد قبل ربط انخفاض الشحن بعيب البطارية أو فاصل AGM.",
    "parameters": [],
    "referenceNote": "تحققت المصادر في 31 أكتوبر 2026. إرشادات GS Yuasa بتاريخ 1 نوفمبر 2024؛ صفحة Yuasa Battery Inc. دون تاريخ واضح. تخص منتجات الشركتين أو وكلاءهما، وليست فترات أو حدود جهد أو قواعد عامة لكل AGM/VRLA. رسم الذكاء الاصطناعي ليس دليلاً اختبارياً."
  }
};
