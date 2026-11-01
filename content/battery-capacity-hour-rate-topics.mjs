export const batteryCapacityHourRateTopics = {
  "vi": {
    "title": "Hai ắc quy 100Ah có thể không so sánh trực tiếp được",
    "summary": "Đối chiếu thời gian định mức, nhiệt độ, điện áp cuối và cách xả; dữ liệu tấm ngăn không thay thế thử ắc quy hoàn chỉnh.",
    "intro": "Đối chiếu thời gian định mức, nhiệt độ, điện áp cuối và cách xả; dữ liệu tấm ngăn không thay thế thử ắc quy hoàn chỉnh.",
    "sections": [
      [
        "Thời gian và C-rate",
        "Thời gian và C-rate",
        "C10 và C20 là dung lượng ở chế độ 10 giờ và 20 giờ, không phải cấp chất lượng hay số lần xả. 100Ah÷20h=5A và 100Ah÷10h=10A chỉ tính dòng danh định theo từng định mức. Không chứng minh cùng một bình cho 100Ah ở cả hai chế độ, không có tỷ lệ chuyển đổi chung. Dòng, thiết kế và điều kiện kết thúc đều ảnh hưởng dung lượng. Phân biệt với 1C hay 0.5C biểu thị dòng theo dung lượng định mức; đọc đúng ngữ cảnh."
      ],
      [
        "Điều kiện của mẫu",
        "Điều kiện của mẫu",
        "Sacred Sun công bố SP 5–33Ah ở C20,25°C và 38–250Ah ở C10,25°C, chỉ cho sản phẩm liên quan. Không áp dụng cho mọi hãng. Kiểm tra nhiệt độ và điện áp ngắt, vì thay đổi giới hạn có thể đổi kết quả. Xả dòng không đổi và công suất không đổi khác nhau. UPS còn cần điện áp hệ thống, công suất và thời gian thực tế. Trojan giải thích dung lượng thay đổi theo dòng, không xác lập một thời gian định mức làm chuẩn chung."
      ],
      [
        "Bảng so sánh",
        "Bảng so sánh",
        "Lập bảng gồm Ah và thời gian định mức, nhiệt độ, điện áp cuối, cách xả, dòng hoặc công suất, mẫu bình, đối tượng và cơ sở thử. Nếu khác điều kiện, yêu cầu bảng xả và ghi chú trước khi kết luận; tải công suất lớn ngắn hạn cần dữ liệu công suất tương ứng. Truy ngược số Ah đơn lẻ về bảng, chú thích, tiêu đề hàng cột và đơn vị; xác nhận nền điện áp. Không mặc định điều kiện bị thiếu giống tài liệu còn lại."
      ],
      [
        "Ba loại dữ liệu",
        "Ba loại dữ liệu",
        "Định mức mô tả cơ sở sản phẩm; báo cáo phòng thử ứng với một mẫu và điều kiện; dữ liệu hiện trường còn phụ thuộc tải, môi trường, trạng thái và thời gian dùng. Ghi nguồn và ngày thử khi so sánh. Một lần đo thực tế không định nghĩa lại quy cách. Tách câu hỏi định mức trong điều kiện thử khỏi dòng hoặc công suất thiết bị cần; câu thứ hai cần yêu cầu hệ thống và dữ liệu ứng dụng của hãng, không chỉ một số Ah."
      ],
      [
        "Xác nhận tấm ngăn",
        "Xác nhận tấm ngăn",
        "Tấm ngăn AGM giữ điện dịch, hỗ trợ chuyển ion và cấu trúc cụm bản cực. Đánh giá quy cách và tính ổn định trong thiết kế, quy trình và phép thử mục tiêu. Một chỉ tiêu vật liệu không quy đổi thành Ah hay chứng minh hiệu suất C10/C20 hoặc công suất. Bản cực, axit, cấu trúc và lắp ráp cũng ảnh hưởng; kết luận cần thử đúng mẫu bình. Gửi Viking điều kiện dung lượng, nhiệt độ, điện áp cuối, cách tải, độ dày và kích thước để đối chiếu mẫu theo thiết kế và xác nhận."
      ]
    ],
    "parameters": [],
    "checklist": [
      "Thời gian và C-rate",
      "Điều kiện của mẫu",
      "Bảng so sánh",
      "Ba loại dữ liệu",
      "Xác nhận tấm ngăn"
    ],
    "inquiry": [
      "Yêu cầu mẫu và đối chiếu thông số",
      "Đối chiếu thời gian định mức, nhiệt độ, điện áp cuối và cách xả; dữ liệu tấm ngăn không thay thế thử ắc quy hoàn chỉnh."
    ],
    "referenceNote": "Nguồn kiểm tra 29/10/2026. Phạm vi SP và 25°C chỉ thuộc Sacred Sun. Trojan hỗ trợ quan hệ dòng và dung lượng, không tỷ lệ chuyển đổi chung. Không phải thử nghiệm Viking. Hình AI không là bằng chứng thử."
  },
  "ko": {
    "title": "같은 100Ah라도 C10과 C20은 바로 비교할 수 없습니다",
    "summary": "시간율, 온도, 종지 전압과 방전 방식을 맞춰 비교하세요. 분리막 자료는 완성 배터리 시험을 대신하지 않습니다.",
    "intro": "시간율, 온도, 종지 전압과 방전 방식을 맞춰 비교하세요. 분리막 자료는 완성 배터리 시험을 대신하지 않습니다.",
    "sections": [
      [
        "시간율과 C-rate",
        "시간율과 C-rate",
        "C10과 C20은 10시간율과 20시간율 용량이며 품질 등급이나 방전 횟수가 아닙니다. 100Ah÷20h=5A, 100Ah÷10h=10A는 각 정격에서 명목 전류를 계산한 예입니다. 같은 배터리가 두 조건에서 모두 100Ah를 낸다는 증거나 보편 환산비가 아닙니다. 전류, 설계와 종료 조건이 실제 용량에 영향을 줍니다. 정격 대비 전류인 1C·0.5C와 구분하고 항목과 문맥을 확인합니다."
      ],
      [
        "모델별 조건",
        "모델별 조건",
        "Sacred Sun SP 자료는 5–33Ah를 C20,25°C, 38–250Ah를 C10,25°C로 표시합니다. 해당 제품 자료이지 모든 브랜드의 규칙은 아닙니다. 온도와 종지 전압도 확인하며 다른 종료 조건은 결과를 바꿀 수 있습니다. 정전류와 정전력 부하는 다릅니다. UPS는 시스템 전압, 전력과 시간까지 확인해야 합니다. Trojan의 설명은 용량이 전류에 따라 변함을 뒷받침할 뿐 특정 시간율을 보편 표준으로 정하지 않습니다."
      ],
      [
        "비교표",
        "비교표",
        "Ah와 시간율, 시험 온도, 종지 전압, 방전 방법과 전류·전력, 모델, 시험 대상과 근거를 한 표에 모읍니다. 조건이 다르면 방전표와 주석을 확보한 뒤 결론을 냅니다. 단시간 고출력은 해당 전력 자료로 검토합니다. 단일 용량 수치는 표·각주·방법, 전압 체계, 행·열 제목과 단위를 추적합니다. 누락된 조건을 다른 문서와 같다고 가정하지 않습니다."
      ],
      [
        "세 종류 데이터",
        "세 종류 데이터",
        "정격은 제품의 표시 기준, 시험실 보고서는 특정 시료와 조건, 현장 값은 부하·환경·상태·사용 시간의 영향까지 반영합니다. 출처와 시험 날짜를 표시하고 한 번의 현장 측정으로 규격을 다시 정의하지 않습니다. 표준 조건 정격과 실제 시스템이 요구하는 전류·전력은 별개 질문입니다. 후자는 장비 요구와 제조사의 응용 자료가 필요하며 Ah 하나로 전체 계산을 대체하지 않습니다."
      ],
      [
        "분리막 검증",
        "분리막 검증",
        "AGM 분리막은 보액, 이온 이동과 극군 구조에 관여합니다. 사양과 일관성을 목표 구조·공정·시험에서 평가합니다. 소재 한 지표를 Ah로 환산하거나 C10/C20·전력 성능 증명으로 삼지 않습니다. 극판, 산, 구조와 조립도 영향을 주므로 해당 모델의 완성 배터리 시험이 필요합니다. Viking에 용량 조건, 온도, 종지 전압, 부하 방식, 두께와 치수를 보내 설계 및 검증에 맞춰 협의하세요."
      ]
    ],
    "parameters": [],
    "checklist": [
      "시간율과 C-rate",
      "모델별 조건",
      "비교표",
      "세 종류 데이터",
      "분리막 검증"
    ],
    "inquiry": [
      "샘플 및 규격 매칭 요청",
      "시간율, 온도, 종지 전압과 방전 방식을 맞춰 비교하세요. 분리막 자료는 완성 배터리 시험을 대신하지 않습니다."
    ],
    "referenceNote": "2026년 10월 29일 확인. SP 범위와 25°C는 Sacred Sun 해당 제품만 의미합니다. Trojan 자료는 전류 의존성을 설명하며 보편 환산법이 아닙니다. Viking 시험 또는 AI 시험 증거가 아닙니다."
  },
  "ja": {
    "title": "同じ100AhでもC10とC20は直接比較できません",
    "summary": "時間率、温度、終止電圧、放電方式をそろえて比較します。セパレーターの資料は完成電池の試験を代替しません。",
    "intro": "時間率、温度、終止電圧、放電方式をそろえて比較します。セパレーターの資料は完成電池の試験を代替しません。",
    "sections": [
      [
        "時間率とC-rate",
        "時間率とC-rate",
        "C10とC20は10時間率と20時間率の容量で、品質等級や放電回数ではありません。100Ah÷20h=5A、100Ah÷10h=10Aは各定格での公称電流の計算例です。同一電池が両条件で100Ahを出す証明でも、共通換算比でもありません。電流、設計、終了条件が実容量に影響します。定格に対する電流を示す1C・0.5Cとは区別し、項目と文脈を読みます。"
      ],
      [
        "モデル別条件",
        "モデル別条件",
        "Sacred SunのSP資料は5–33AhをC20,25°C、38–250AhをC10,25°Cと表示します。当該製品の仕様であり全メーカーの規則ではありません。温度と終止電圧も確認し、終了条件の違いによる結果の差を考慮します。定電流と定電力は負荷特性が異なり、UPSでは系統電圧、電力、時間も必要です。Trojanの説明は容量の電流依存を支持し、特定時間率を世界共通標準とはしていません。"
      ],
      [
        "比較表",
        "比較表",
        "Ahと時間率、温度、終止電圧、放電方法と電流・電力、型番、試験対象と根拠を一表にまとめます。条件が違えば放電表と注記を求めてから判断します。短時間高出力には対応する電力データを使います。容量だけを転記せず表、脚注、方法、電圧体系、行列の見出しと単位まで追跡します。欠落条件を別資料と同じと仮定しません。"
      ],
      [
        "三種類のデータ",
        "三種類のデータ",
        "定格は製品の表示根拠、試験報告は特定試料と条件、現場値は負荷、環境、状態、使用期間にも影響されます。出典と試験日を明記し、一度の現場測定で製品仕様を再定義しません。標準条件での定格と、実システムが必要とする電流・電力を別に問います。後者は機器要求とメーカーの応用資料が必要で、Ah一つで全体計算を置き換えられません。"
      ],
      [
        "セパレーター検証",
        "セパレーター検証",
        "AGMセパレーターは保液、イオン移動、極群の構造に関与します。仕様と一貫性を目標構造、工程、試験で検証します。材料の一指標はAhへの換算やC10/C20・電力性能の証明にはなりません。極板、酸、構造、組立も影響するため当該型番の完成電池試験が必要です。Vikingへ容量条件、温度、終止電圧、負荷方式、厚さと寸法を共有し、設計と検証に合わせて相談してください。"
      ]
    ],
    "parameters": [],
    "checklist": [
      "時間率とC-rate",
      "モデル別条件",
      "比較表",
      "三種類のデータ",
      "セパレーター検証"
    ],
    "inquiry": [
      "サンプルと仕様の照合を依頼",
      "時間率、温度、終止電圧、放電方式をそろえて比較します。セパレーターの資料は完成電池の試験を代替しません。"
    ],
    "referenceNote": "2026年10月29日確認。SPの範囲と25°CはSacred Sunの該当製品限定です。Trojanは電流依存の説明で共通換算則ではありません。Viking試験ではなくAI図は証拠ではありません。"
  },
  "es": {
    "title": "Dos baterías de 100Ah no siempre son comparables",
    "summary": "Alinee tasa horaria, temperatura, tensión final y método de descarga; los datos del separador no sustituyen ensayos de batería completa.",
    "intro": "Alinee tasa horaria, temperatura, tensión final y método de descarga; los datos del separador no sustituyen ensayos de batería completa.",
    "sections": [
      [
        "Tasa horaria y C-rate",
        "Tasa horaria y C-rate",
        "C10 y C20 indican capacidad a 10 y 20 horas, no calidad ni número de descargas. 100Ah÷20h=5A y 100Ah÷10h=10A calculan corrientes nominales de sus respectivas condiciones. No prueban que una misma batería entregue 100Ah en ambas ni permiten una conversión universal. Corriente, diseño y terminación afectan la capacidad. Distinga estas tasas de 1C o 0.5C, corrientes relativas a la capacidad nominal; revise campo y contexto."
      ],
      [
        "Condiciones del modelo",
        "Condiciones del modelo",
        "Sacred Sun publica SP 5–33Ah a C20,25°C y 38–250Ah a C10,25°C: son datos de esos productos, no de todas las marcas. Revise temperatura y tensión de corte; distintos límites pueden dar distintos resultados. Corriente y potencia constantes son cargas diferentes. UPS exige además tensión del sistema, potencia y duración. Trojan explica la dependencia de Ah con la corriente, sin establecer una tasa horaria universal."
      ],
      [
        "Tabla comparativa",
        "Tabla comparativa",
        "Reúna en una tabla Ah y tasa, temperatura, corte, método y corriente o potencia, modelo, objeto y base del ensayo. Si difieren condiciones, solicite tablas de descarga y notas antes de concluir. Para alta potencia breve use los datos correspondientes. Rastree la cifra hasta tabla, notas, método, plataforma de tensión, encabezados y unidades. No suponga que un dato omitido coincide con el otro documento."
      ],
      [
        "Tres tipos de datos",
        "Tres tipos de datos",
        "El nominal expresa la base del producto; el laboratorio mide una muestra bajo condiciones; el campo también depende de carga, ambiente, estado y antigüedad. Identifique fuente y fecha y no redefina la especificación por una lectura. Separe el valor nominal en sus condiciones de la corriente o potencia real necesaria. La segunda cuestión requiere datos de aplicación del fabricante y requisitos del equipo, no solo Ah."
      ],
      [
        "Validación del separador",
        "Validación del separador",
        "El separador AGM interviene en retención de electrolito, transporte iónico y estructura de placas. Evalúe especificación y consistencia con diseño, proceso y prueba. Una propiedad no se convierte en Ah ni demuestra C10/C20 o potencia. Placas, ácido, construcción y montaje también importan: valide la batería del modelo. Envíe a Viking condiciones de capacidad, temperatura, corte, carga, espesor y dimensiones para ajustar muestras según diseño y validación."
      ]
    ],
    "parameters": [],
    "checklist": [
      "Tasa horaria y C-rate",
      "Condiciones del modelo",
      "Tabla comparativa",
      "Tres tipos de datos",
      "Validación del separador"
    ],
    "inquiry": [
      "Solicitar muestras y ajuste de especificaciones",
      "Alinee tasa horaria, temperatura, tensión final y método de descarga; los datos del separador no sustituyen ensayos de batería completa."
    ],
    "referenceNote": "Fuentes verificadas el 29 de octubre de 2026. Rangos SP y 25°C corresponden a Sacred Sun. Trojan respalda dependencia con corriente, no una conversión universal. No son ensayos Viking; la imagen AI no es evidencia."
  },
  "pt": {
    "title": "Duas baterias de 100Ah podem não ser comparáveis",
    "summary": "Alinhe regime horário, temperatura, tensão final e método de descarga; dados do separador não substituem testes da bateria completa.",
    "intro": "Alinhe regime horário, temperatura, tensão final e método de descarga; dados do separador não substituem testes da bateria completa.",
    "sections": [
      [
        "Regime horário e C-rate",
        "Regime horário e C-rate",
        "C10 e C20 são capacidades em 10 e 20 horas, não classes de qualidade ou quantidades de descargas. 100Ah÷20h=5A e 100Ah÷10h=10A calculam correntes nominais nas respectivas condições. Não provam que a mesma bateria entrega 100Ah em ambas nem fornecem conversão universal. Corrente, projeto e término afetam a capacidade. Diferencie de 1C ou 0.5C, correntes relativas à capacidade nominal, lendo campo e contexto."
      ],
      [
        "Condições do modelo",
        "Condições do modelo",
        "A Sacred Sun publica SP 5–33Ah em C20,25°C e 38–250Ah em C10,25°C, apenas para esses produtos. Não generalize para outras marcas. Confira temperatura e tensão de corte: limites diferentes podem mudar resultados. Corrente constante e potência constante têm cargas distintas. UPS requer ainda tensão, potência e duração do sistema. A Trojan explica a dependência dos Ah com a corrente, sem estabelecer regime universal."
      ],
      [
        "Tabela comparativa",
        "Tabela comparativa",
        "Reúna Ah e regime, temperatura, corte, método e corrente ou potência, modelo, objeto e base do ensaio numa tabela. Se as condições diferirem, solicite tabelas de descarga e notas antes de concluir. Alta potência breve exige dados correspondentes. Rastreie a cifra até tabela, rodapés, método, plataforma de tensão, cabeçalhos e unidades. Não presuma que condição omitida coincide com outro documento."
      ],
      [
        "Três tipos de dados",
        "Três tipos de dados",
        "O nominal descreve a base do produto; o laboratório registra amostra e condições; o campo depende também de carga, ambiente, estado e tempo em uso. Identifique fonte e data, sem redefinir especificações por uma leitura. Separe valor nominal em condições de teste da corrente ou potência exigida pelo equipamento. A segunda pergunta precisa de requisitos e dados de aplicação do fabricante, não apenas Ah."
      ],
      [
        "Validação do separador",
        "Validação do separador",
        "O separador AGM participa da retenção, transporte iônico e estrutura das placas. Avalie especificação e consistência no projeto, processo e teste alvo. Uma propriedade não vira Ah nem comprova C10/C20 ou potência. Placas, ácido, construção e montagem também influem; valide a bateria do modelo. Envie à Viking condições de capacidade, temperatura, corte, carga, espessura e dimensões para adequar amostras ao projeto e à validação."
      ]
    ],
    "parameters": [],
    "checklist": [
      "Regime horário e C-rate",
      "Condições do modelo",
      "Tabela comparativa",
      "Três tipos de dados",
      "Validação do separador"
    ],
    "inquiry": [
      "Solicitar amostras e adequação de especificações",
      "Alinhe regime horário, temperatura, tensão final e método de descarga; dados do separador não substituem testes da bateria completa."
    ],
    "referenceNote": "Fontes verificadas em 29 de outubro de 2026. Faixas SP e 25°C são da Sacred Sun. Trojan explica dependência da corrente, não conversão universal. Não são testes Viking; imagem AI não é evidência."
  },
  "ru": {
    "title": "Две батареи 100А·ч не всегда можно сравнивать напрямую",
    "summary": "Согласуйте часовой режим, температуру, конечное напряжение и способ разряда; данные сепаратора не заменяют испытания батареи.",
    "intro": "Согласуйте часовой режим, температуру, конечное напряжение и способ разряда; данные сепаратора не заменяют испытания батареи.",
    "sections": [
      [
        "Часовой режим и C-rate",
        "Часовой режим и C-rate",
        "C10 и C20 обозначают ёмкость при 10- и 20-часовом режиме, не качество и не число разрядов. 100Ah÷20h=5A и 100Ah÷10h=10A — расчёты номинальных токов для соответствующих условий. Они не доказывают 100А·ч одной батареи в обоих режимах и не дают универсального пересчёта. Влияют ток, конструкция и завершение испытания. Отличайте от 1C и 0.5C — тока относительно номинальной ёмкости, учитывая поле и контекст."
      ],
      [
        "Условия модели",
        "Условия модели",
        "Sacred Sun указывает SP 5–33Ah при C20,25°C и 38–250Ah при C10,25°C только для соответствующих изделий. Не переносите на все марки. Проверяйте температуру и конечное напряжение: разные границы меняют результат. Постоянные ток и мощность различаются. Для UPS нужны также напряжение системы, мощность и время. Trojan подтверждает зависимость ёмкости от тока, а не универсальность одного режима."
      ],
      [
        "Таблица сравнения",
        "Таблица сравнения",
        "Сведите в таблицу ёмкость и режим, температуру, конечное напряжение, метод и ток либо мощность, модель, объект и основание испытаний. При разных условиях запросите разрядные таблицы и примечания до вывода. Короткая высокая мощность требует соответствующих данных. Проверяйте сноски, метод, напряжение, заголовки строк и столбцов, единицы. Отсутствующее условие нельзя считать совпадающим с другим документом."
      ],
      [
        "Три вида данных",
        "Три вида данных",
        "Номинал описывает основу характеристики, лаборатория — конкретный образец и условия, поле — также нагрузку, среду, состояние и срок службы. Указывайте источник и дату, не меняйте спецификацию по одному полевому показанию. Разделяйте номинал в условиях испытания и реальный ток либо мощность оборудования. Второе требует требований системы и прикладных данных изготовителя, не одного значения А·ч."
      ],
      [
        "Проверка сепаратора",
        "Проверка сепаратора",
        "AGM-сепаратор участвует в удержании электролита, ионном переносе и структуре блока. Проверяйте спецификацию и стабильность в целевой конструкции, процессе и испытании. Один показатель не переводится в А·ч и не доказывает C10/C20 либо мощность. Пластины, кислота, конструкция и сборка тоже влияют: нужна проверка полной батареи модели. Передайте Viking режим, температуру, конечное напряжение, нагрузку, толщину и размеры для подбора по проекту и валидации."
      ]
    ],
    "parameters": [],
    "checklist": [
      "Часовой режим и C-rate",
      "Условия модели",
      "Таблица сравнения",
      "Три вида данных",
      "Проверка сепаратора"
    ],
    "inquiry": [
      "Запросить образцы и согласовать спецификацию",
      "Согласуйте часовой режим, температуру, конечное напряжение и способ разряда; данные сепаратора не заменяют испытания батареи."
    ],
    "referenceNote": "Проверено 29 октября 2026 года. Диапазоны SP и 25°C относятся к Sacred Sun. Trojan поясняет зависимость от тока, не универсальный пересчёт. Это не испытания Viking; AI не является доказательством."
  },
  "ar": {
    "title": "قد لا تكون بطاريتان بسعة 100Ah قابلتين للمقارنة المباشرة",
    "summary": "وحّد معدل الساعات والحرارة وجهد النهاية وطريقة التفريغ؛ بيانات الفاصل لا تستبدل اختبار البطارية الكاملة.",
    "intro": "وحّد معدل الساعات والحرارة وجهد النهاية وطريقة التفريغ؛ بيانات الفاصل لا تستبدل اختبار البطارية الكاملة.",
    "sections": [
      [
        "معدل الساعات وC-rate",
        "معدل الساعات وC-rate",
        "يشير C10 وC20 إلى سعة بعشر وعشرين ساعة، لا درجة جودة ولا عدد التفريغات. 100Ah÷20h=5A و100Ah÷10h=10A حسابان لتيار اسمي في شرطين منفصلين. لا يثبتان أن البطارية نفسها تعطي 100Ah في الحالتين ولا نسبة تحويل عامة. يؤثر التيار والتصميم ونهاية الاختبار في السعة. ميّز ذلك عن 1C و0.5C اللذين يصفان التيار نسبة إلى السعة الاسمية وفق الحقل والسياق."
      ],
      [
        "شروط الطراز",
        "شروط الطراز",
        "تذكر Sacred Sun لسلسلة SP نطاق 5–33Ah عند C20,25°C و38–250Ah عند C10,25°C للمنتجات المعنية فقط. لا تعمم على كل العلامات. تحقق من الحرارة وجهد القطع؛ اختلاف الحدود قد يغير النتيجة. التيار الثابت والقدرة الثابتة حملان مختلفان. تحتاج UPS أيضاً جهد النظام وقدرته ومدة التفريغ. تدعم Trojan اعتماد السعة على التيار لا اعتبار معدل واحد معياراً عاماً."
      ],
      [
        "جدول المقارنة",
        "جدول المقارنة",
        "اجمع السعة ومعدلها والحرارة وجهد النهاية والطريقة والتيار أو القدرة والطراز وعينة الاختبار وأساسه في جدول. إذا اختلفت الشروط اطلب جداول التفريغ والملاحظات قبل الحكم. تتطلب القدرة العالية القصيرة بياناتها الخاصة. تتبع الرقم إلى الجدول والحواشي والطريقة ومنصة الجهد وعناوين الصفوف والأعمدة والوحدات. لا تفترض أن الشرط الناقص مطابق للوثيقة الأخرى."
      ],
      [
        "ثلاثة أنواع بيانات",
        "ثلاثة أنواع بيانات",
        "تصف القيمة الاسمية أساس المنتج، والمختبر عينة وظروفاً محددة، والبيانات الميدانية تتأثر بالحمل والبيئة والحالة ومدة الخدمة. سجل المصدر والتاريخ ولا تعد تعريف المواصفة بقراءة واحدة. افصل السعة ضمن شروط الاختبار عن التيار أو القدرة المطلوبة فعلياً؛ تحتاج الثانية متطلبات المعدات وبيانات المصنع التطبيقية، لا رقم Ah منفرداً."
      ],
      [
        "التحقق من الفاصل",
        "التحقق من الفاصل",
        "يشارك فاصل AGM في الاحتفاظ بالإلكتروليت ونقل الأيونات وبنية الألواح. تحقق من المواصفات والثبات ضمن التصميم والعملية والاختبار المستهدف. لا يتحول مؤشر مادة منفرد إلى Ah ولا يثبت أداء C10/C20 أو القدرة. تؤثر الألواح والحمض والبنية والتجميع أيضاً؛ يلزم اختبار الطراز الكامل. أرسل إلى Viking ظروف السعة والحرارة وجهد النهاية والحمل والسماكة والأبعاد للمطابقة وفق التصميم والتحقق."
      ]
    ],
    "parameters": [],
    "checklist": [
      "معدل الساعات وC-rate",
      "شروط الطراز",
      "جدول المقارنة",
      "ثلاثة أنواع بيانات",
      "التحقق من الفاصل"
    ],
    "inquiry": [
      "اطلب عينات ومطابقة المواصفات",
      "وحّد معدل الساعات والحرارة وجهد النهاية وطريقة التفريغ؛ بيانات الفاصل لا تستبدل اختبار البطارية الكاملة."
    ],
    "referenceNote": "فحصت المصادر في 29 أكتوبر 2026. نطاق SP و25°C خاصان بـ Sacred Sun. تشرح Trojan اعتماد السعة على التيار لا تحويلاً عاماً. ليست اختبارات Viking ورسم AI ليس دليلاً."
  }
};
