# 并联均流文章验收

日期：2026-11-06。新增 `/blog/parallel-battery-current-sharing-measurement-layers/`，制造与质量分类，九语言同日登记，发布日期、更新时间及 sitemap lastmod 为当天。

五个正文主题覆盖分流、外部往返路径、整电池内阻、隔板材料相关电阻与调查记录。新增三个可见本地化问答。修正原稿中实际端子必然同电压的表述：理想公共节点共享母线参考，实际端子存在路径压降。V = IR 与 P = I²R 限于电阻近似恒定情形；不凭材料数据预测支路电流或替代整电池、整系统验证。

来源核验于 2026-11-06：
- [Victron：Batteries in series or parallel](https://www.victronenergy.com/knowledge-articles/2026/10/23/batteries-in-series-or-parallel)，页面标注 2026-10-23。
- [Victron：Wiring Unlimited，§3.3](https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/battery-bank-wiring.html)，未确认原始发布日期。

两者为系统连接参考，不是维京试验、隔板规格或材料责任证明。记录型号、批次、服役时间、温度、荷电状态、支路电流、单体电压/内阻、路径与方法，结论限定于相应测量层级。

SEO 仅内置 metadata、canonical、双向 hreflang、Open Graph 及 WebPage/BlogPosting/BreadcrumbList/FAQPage，正文不展示独立 SEO 优化区；九语言可见问答与 FAQPage 一致。

## 图片

内置 image_gen 生成并检查。原图 `/Users/vea/.codex/generated_images/01a086b9-de72-75c0-949e-86239616bb59/exec-7fdef55f-01a0-45da-baf8-68bdaaaaa2a5.png`；最终资源 `public/images/articles/parallel-battery-current-sharing-hero-1600.webp`，1600×1200。概念呈现并联支路及三层测量，不是接线施工图或试验证据，沿用九语言右下角 AI 标注。正文复用既有产品图片。

## 验证

- CMS 导出、内容登记、资源检查通过；40 篇文章，九语言。
- 默认 build:volcengine 的 Turbopack 再现本机绑定端口权限错误；同一生产流程以 next build --webpack 编译、TypeScript、静态导出后，postprocess 与 verify:static 全部通过。未改构建配置。
- 全站 468 个 sitemap 页面，每语言 52 页；语言、RTL、canonical、双向 hreflang、精确切换、元数据、结构化数据、内部链接与锚点通过。
- 新文章九语言逐页检查三个问答与 FAQPage 一致、问答锚点存在、实际日期正确、正文无 SEO 专区。
- 中文桌面 1280×960：页面宽度 1280，无横向溢出，4:3 图片与 AI 标签正常，canonical 正确、10 个 hreflang。目录到达 #faq-voltage，样品入口到达 #contact，表单存在。
- 最长次级标题俄语（77 字符），390×844：页面宽度 390，无横向溢出，标题与按钮正常换行；图片自然尺寸 1600×1200，展示约 358×269。
- git diff --check 通过。开始时工作区干净；未改 API、后台、数据库、服务器配置；未提交、推送或部署。

截图：`/tmp/viking-parallel-desktop.png`、`/tmp/viking-parallel-ru-mobile.png`。

## 最终图片提示词

Scientific educational 4:3 industrial editorial illustration, clean navy white palette. Three identical unbranded sealed AGM batteries upright on an engineering bench, conceptual parallel branches connected via protected covered busbars, equal voltage symbolic shared node and unequal branch-current visual arrows of different widths, no numeric values. Distinct inset layers: external cable and contact path with thermometer symbol, complete-battery measurement with non-numeric meter, separate porous glass-fiber separator sample with blue electrolyte motif. Clearly conceptual visual, no claimed real experiment, no performance guarantees, no sparks or exposed dangerous manipulation, no words letters logos or numbers. Calm realistic 3D technical style, complete subjects safe margins, lower-right clear for localized AI label overlay. 1600x1200 landscape.
