# 未使用电池自放电文章验收

日期：2026-10-31。新文章 `/blog/unused-battery-self-discharge-storage-installation/`，归入制造与质量。英文、中文、越南语、韩语、日语、西班牙语、葡萄牙语、俄语和阿拉伯语同日登记。

## 内容与证据

保留原稿六个主题：出厂时间线、充电与补液、时间与温度、运输安装交接、自放电与外部待机负载、材料与整电池责任边界。新增三条可见问答；九语言的 FAQPage 问答与可见正文逐条一致。保留具体型号文档优先的边界，不提供通用检查周期、补充充电电压或自放电速率，不凭单次读数判断隔板责任。

官方来源核验于 2026-10-31：
- [GS Yuasa：库存、销售与退货](https://www.gs-yuasa.eu/en-de/info-hub/how-to-manage-stock-sales-and-returns-yuasa)，页面日期 2024-11-01，面向其经销与售后场景。
- [Yuasa Battery Inc.：电池维护与储存](https://www.yuasabatteries.com/resources/guides/battery-maintenance-storage/)，未见明确发布日期，涉及特定 Powersports AGM 产品。

SEO 仅内置于 title/description、canonical、双向 hreflang、Open Graph、WebPage/BlogPosting/BreadcrumbList/FAQPage 中。正文未增加 SEO 文案区。发布日期和更新时间均为 2026-10-31，未改动其他文章日期。

## 图片

使用内置 image_gen 新生成，输出优化为 `public/images/articles/battery-storage-self-discharge-hero-1600.webp`，1600×1200。图示库存电池、时间温度与外部负载的区别，不是实拍或测试证据。复用右下角九语言 AI 说明覆盖层。移动硬盘素材库未用于主图，正文沿用现有卷材和片材图片。

原生成图片：`/Users/vea/.codex/generated_images/01a086b9-de72-75c0-949e-86239616bb59/exec-bc607099-5079-45e5-a73c-13df3abd7318.png`

## 验证

- CMS 导出、内容登记、公共资源检查、sitemap 生成通过。37 篇文章 × 9 语言。
- 默认 `npm run build:volcengine` 在本机遇到既有 Turbopack 创建子进程/绑定端口权限错误。使用同一生产流水线的 `next build --webpack` 通过编译、TypeScript、静态生成，再完成 postprocess、verify:static；没有修改构建配置。
- 全站 441 个 sitemap 页面，每语言 49 页。语言、RTL、canonical、双向 hreflang、精确语言切换、元数据、结构化数据、内部链接与锚点检查全部通过。
- 新文章额外逐语言检查：三个可见问答与 FAQPage 内容相同、问答锚点完整、无可见 SEO 区。
- 浏览器中文 1280px 桌面端：标题、4:3 图片和 AI 标签正常，页面宽度 1280，无横向溢出；问答目录正确到达 `#faq-unused`，申请样品到达 `#contact` 且表单存在。自指 canonical 正确，10 个 hreflang（九语言与 x-default）。
- 俄语是次级语言最长标题，390×844 实测页面宽度 390，无横向溢出；标题、按钮正常换行，图片自然尺寸 1600×1200、展示约 358×269，问答目录正确。
- `git diff --check` 通过。保留开始前未提交的 100Ah 文章改动；未修改 API、后台、数据库或服务器配置；未提交、推送或部署。

截图：`/tmp/viking-battery-storage-desktop.png`、`/tmp/viking-battery-storage-qa.png`、`/tmp/viking-battery-storage-ru-mobile.png`。

## 最终图片提示词

Use case: scientific-educational. Create a polished industrial B2B editorial conceptual illustration for an article about an unused AGM lead-acid battery losing charge during warehouse storage and transit before installation. Landscape 4:3 composition, clean realistic 3D illustration, restrained navy blue and white palette. An intact unbranded sealed battery in foreground on warehouse shelf, a clipboard with blank rows, subtle calendar, thermometer and clock icons, background shipping boxes and installation handover station. Show two visually separate subtle paths for internal time/temperature effects and external standby electronics load, without implying a test result. Keep terminals unconnected and protected in the warehouse. No fluid, open case, sparks, numerical voltage/charge promises or brand marks. No text anywhere; leave bottom-right quiet for localized AI illustration overlay supplied by the website. All important objects within safe margins.

