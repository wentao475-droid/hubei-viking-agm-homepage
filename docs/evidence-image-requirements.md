# 第一阶段证据增强图片需求说明

目标：补强网站的真实工厂证据，让海外 B2B 买家快速判断 Viking AGM 是实际生产厂家，并能看到产品、生产、质检、包装和资质依据。

## 1. 当前已有图片

目前网站已有以下可用素材：

- 厂房/公司：`viking-company-building-900.webp`
- 生产能力/车间：`agm-factory-capability-1200.webp`、`agm-hero-production-1600.webp`
- 生产流程：`manufacturing-process-1400.webp`、`viking-manufacturing-process.svg`
- 质检：`agm-quality-control-1200.webp`
- 卷材产品：`viking-finished-separator-roll-900.webp`
- 片材产品：`viking-separator-sheets-900.webp`、`sheets1-*`、`sheets2-*`
- 证书：`certification-1-900.webp` 到 `certification-5-900.webp`
- Logo/二维码：`banner-logo-header.webp`、`viking-logo-footer-320.webp`、`qrcode_for_logo.jpg`

这些图片可以支撑第一版，但还不够完整。下一步建议补拍/补充下面这些图片。

重要说明：上面这些已经在网站中使用的图片暂时不用重拍、也不用改名。第一阶段只需要优先补充下面“新增占位图片清单”里的文件。后续拿到真实照片后，把同名 `.webp` 文件替换到 `public/images/evidence/` 即可，页面代码不需要再改。

## 2. 新增占位图片清单

以下文件已经预留在 `public/images/evidence/`。当前先用现有素材生成临时占位图，后续请按同名文件替换真实图片。

| 文件路径 | 建议尺寸 | 比例 | 用途 | 使用页面 | 替换说明 |
| --- | --- | --- | --- | --- | --- |
| `public/images/evidence/factory-raw-material-feed-01.webp` | 1200×900 px | 4:3 | 原料进入生产线、上料、生产前端状态 | 首页、AGM Separator 总产品页 | 拍摄原料准备或进入生产线的真实画面，同名替换 |
| `public/images/evidence/factory-roll-finishing-01.webp` | 1200×900 px | 4:3 | 收卷、分切、卷材后处理现场 | 首页 | 拍摄收卷或后处理工序，同名替换 |
| `public/images/evidence/agm-separator-roll-warehouse-01.webp` | 1200×900 px | 4:3 | 批量卷材库存、成品卷材摆放 | Rolls 页面 | 拍摄多卷成品整齐摆放或仓储场景，同名替换 |
| `public/images/evidence/agm-separator-roll-end-face-01.webp` | 1200×900 px | 4:3 | 卷材端面、卷绕状态、边缘状态 | Rolls 页面 | 拍摄卷材端面近景，同名替换 |
| `public/images/evidence/agm-separator-roll-packaging-01.webp` | 1200×900 px | 4:3 | 卷材包装、防护、标签、托盘 | Rolls 页面 | 拍摄包装完成或包装过程，同名替换；客户信息需遮挡 |
| `public/images/evidence/agm-separator-sheets-detail-01.webp` | 1200×900 px | 4:3 | 片材边缘、厚度感、表面状态 | Sheets 页面 | 拍摄片材边缘或厚度近景，同名替换 |
| `public/images/evidence/agm-separator-sheets-packaging-01.webp` | 1200×900 px | 4:3 | 片材包装、样品、小批量准备 | Sheets 页面 | 拍摄片材包装或样品准备，同名替换 |
| `public/images/evidence/quality-thickness-test-01.webp` | 1200×900 px | 4:3 | 厚度检测、尺寸稳定性评估 | 首页、Quality Control 页面 | 拍摄厚度检测设备和样品，同名替换 |
| `public/images/evidence/quality-basis-weight-test-01.webp` | 1200×900 px | 4:3 | 克重/基重检测、样品称量 | Quality Control 页面 | 拍摄称量或基重测试过程，同名替换 |
| `public/images/evidence/quality-acid-absorption-test-01.webp` | 1200×900 px | 4:3 | 吸酸测试、电解液保持相关测试 | Quality Control 页面 | 拍摄吸酸相关测试过程，同名替换 |
| `public/images/evidence/quality-electrical-resistance-test-01.webp` | 1200×900 px | 4:3 | 电阻测试、性能要求评估 | Quality Control 页面 | 拍摄电阻测试设备和样品，同名替换 |
| `public/images/evidence/shipping-pallet-01.webp` | 1200×900 px | 4:3 | 托盘、缠膜、纸箱、发货准备 | 首页、AGM Separator 总产品页 | 拍摄包装发货或托盘准备场景，同名替换 |

## 3. 优先级最高：必须补充

### A. 生产线真实工作图

用途：
- 首页生产证据模块
- `/products/agm-separator/`
- `/factory/agm-separator-manufacturing/` 后续页面

需要图片：
- AGM 隔板生产线全景，能看到设备连续生产状态
- 原料进入生产线的画面
- 湿法/成型/干燥/收卷等关键工序画面，如果方便拍摄
- 工人操作设备或检查产线的画面

拍摄要求：
- 横图优先，建议 16:9
- 光线清楚，不要过暗
- 画面中尽量有设备、材料、人员或生产状态
- 避免只拍空车间

建议数量：4-6 张。

### B. 卷材细节图

用途：
- `/products/agm-separator-rolls/`
- 首页产品证据区
- 询盘转化区

需要图片：
- 单卷 AGM separator roll 正面图
- 多卷成品整齐摆放图
- 卷材端面细节，能看到卷绕状态
- 卷材包装前后对比
- 外包装、标签、托盘或装箱图

拍摄要求：
- 产品占画面主体
- 背景尽量干净
- 至少一张图能体现批量供货能力
- 如果标签包含敏感客户信息，需要遮挡

建议数量：5-8 张。

### C. 片材细节图

用途：
- `/products/agm-separator-sheets/`
- 产品对比模块
- 样品支持说明

需要图片：
- AGM separator sheets 整齐叠放图
- 单片片材平铺图
- 片材边缘/厚度近景
- 片材包装图
- 样品包装或小批量出样图

拍摄要求：
- 展示片材平整度、边缘状态、尺寸感
- 可放尺子或参照物，但不要让画面太杂
- 背景干净，避免杂乱桌面

建议数量：4-6 张。

### D. 质检设备和检测过程图

用途：
- `/quality-control/agm-separator-testing/`
- 后续 `/quality-control/agm-separator-inspection-process/`
- 首页质量证据模块

需要图片：
- 厚度检测
- 克重/基重检测
- 吸酸性能相关测试
- 电阻测试
- 外观检查
- 实验室或质检台全景

拍摄要求：
- 尽量拍到设备、样品和操作动作
- 如果设备屏幕有数值，可以拍清楚，但避免泄露客户订单信息
- 每个核心检测项目至少一张图

建议数量：6-10 张。

### E. 证书高清图

用途：
- 首页资质模块
- 质量控制页
- 后续 `/quality-control/certifications/`

需要图片：
- ISO9001 证书高清正面图
- 营业执照或公司资质文件，如果适合公开展示
- 产品/企业荣誉证书
- 检测或认证相关资料

拍摄要求：
- 尽量提供扫描件或高清正面照片
- 文件边缘完整，不要倾斜严重
- 若证书编号、有效期可公开，建议保留
- 若有敏感信息，先确认是否需要打码

建议数量：3-8 张。

## 4. 第二优先级：建议补充

### F. 包装和出货图

用途：
- 产品页增强信任
- 联系/询盘区域
- 后续 FAQ：packing、shipping、sample support

需要图片：
- 卷材包装完成图
- 片材包装完成图
- 纸箱、托盘、缠膜、标签
- 仓库待发货图
- 装柜或物流交接图

建议数量：4-6 张。

### G. 工厂外观和团队图

用途：
- 首页公司模块
- About/Factory 后续页面

需要图片：
- 公司门头/厂房外观
- 办公楼或厂区入口
- 车间入口
- 团队工作场景，不一定需要正面合影

建议数量：3-5 张。

### H. 原材料和半成品图

用途：
- 生产流程说明
- 工艺可信度增强

需要图片：
- 玻璃纤维原料或相关原材料
- 半成品状态
- 生产过程中的材料状态

建议数量：3-5 张。

## 5. 拍摄通用要求

- 优先横图，新增占位图片统一按 4:3，建议最终文件尺寸为 1200×900 px。
- 原图尽量大于 1600px 宽，方便后期裁切。
- 不要加水印、滤镜、贴纸或文字。
- 不要用微信压缩过的小图，尽量发送原图。
- 画面要真实、清楚、明亮。
- 避免出现客户名称、订单号、价格、个人手机号等敏感信息。
- 同一场景多拍几张，方便选择最稳的一张。

## 6. 文件命名建议

收集图片时建议直接使用上面表格中的文件名。如果先收到 JPG/PNG 原图，最终上线前再转为同名 `.webp`。

示例命名：

- `factory-raw-material-feed-01.webp`
- `factory-roll-finishing-01.webp`
- `agm-separator-roll-warehouse-01.webp`
- `agm-separator-roll-packaging-01.webp`
- `agm-separator-sheets-detail-01.webp`
- `quality-thickness-test-01.webp`
- `quality-electrical-resistance-test-01.webp`
- `shipping-pallet-01.webp`

后续上线前再统一转换成 `.webp` 并压缩。

## 7. 第一阶段建议上线位置

拿到图片后，第一阶段建议优先更新这些位置：

- 首页：新增原料、收卷、具体检测、包装发货证据位，已有主图不动。
- AGM Separator 总产品页：新增原料生产和包装发货证据位。
- Rolls 页面：新增批量卷材、端面细节、卷材包装证据位。
- Sheets 页面：新增片材细节、片材包装/样品证据位。
- Quality Control 页面：新增厚度、克重、吸酸、电阻检测证据位。

## 8. 最小交付清单

如果时间有限，先按新增占位图片清单准备 12 张即可：

- 生产/工序：2 张
- 卷材产品：3 张
- 片材产品：2 张
- 质检设备/过程：4 张
- 包装/发货：1 张

这批图片足够替换当前第一阶段新增的证据占位图。已有线上图片不用重拍，除非后续你想整体升级视觉素材。
