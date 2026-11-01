# VRLA、AGM 与 GEL 文章验收

日期：2026-11-01。新增文章 `/blog/vrla-agm-gel-battery-structures-separator-matching/`，采购指南分类，九语言同步。发布日期、更新时间、sitemap lastmod 均为本日，保留既有文章日期和未提交改动。

## 内容及技术边界

七个主题：VRLA 类别；AGM 毛细保液；GEL 胶体固定；功能不等于材料互换；名称不决定性能排名；材料沟通前的结构确认；维京支持范围。新增三个可见本地化问答，与每页 FAQPage 对应。保留原稿英文主要内容，去除原始 Markdown 强调标记；其他语言保留相同主题、证据范围及 CTA。

来源核验于 2026-11-01，均未确认原始发布日期：
- [Victron Energy：Gel and AGM Batteries](https://www.victronenergy.com/upload/documents/Datasheet-GEL-and-AGM-Batteries-EN.pdf)，仅使用第 1–3 节的类别、阀门排气、毛细保液与胶体结构描述。其产品性能陈述不扩展为通用排名。
- [Battery Council International：About Battery Separators](https://batterycouncil.org/battery-facts-and-applications/about-battery-separators/)，用于电极隔离、离子传输、结构随技术变化及胶体电池分隔组件的说明。

不宣称 GEL 没有分隔组件，不按电压或外形直接判断可互换，不把某种材料永不用于其他设计作为绝对规则。材料功能不等于维京产品认证或成品寿命、性能保证。维京范围为 AGM 玻璃纤维隔板及规格沟通，不表示生产完整 GEL 电池。

## SEO 与图片

SEO 仅内置于元数据、canonical、完整 reciprocal hreflang、Open Graph、WebPage/BlogPosting/BreadcrumbList/FAQPage；正文无单独 SEO 文案或关键词区。问答作为正常读者内容可见。

内置 image_gen 新生成主题首图，原图为 `/Users/vea/.codex/generated_images/01a086b9-de72-75c0-949e-86239616bb59/exec-79b503ff-0907-4812-b5b9-810ebd48f00a.png`。最终文件 `public/images/articles/vrla-agm-gel-structures-hero-1600.webp`，1600×1200。两款概念电池并列，前方分别为纤维保液与胶体固定示意，没有性能高低结论。沿用右下角九语言 AI 标签，不作为实拍、检测或产品规格证据。正文沿用现有卷材和片材图片。

## 验证结果

- CMS 导出、内容登记与资源检查通过；39 篇文章，九语言。
- 默认 `build:volcengine` 的 Turbopack 再现本机子进程绑定端口权限错误；使用同一生产流水线的 `next build --webpack` 完成编译、TypeScript、静态生成，随后 postprocess 和 verify:static 均通过。未修改构建配置。
- 全站 459 个 sitemap 页面，每语言 51 页。语言、RTL、canonical、双向 hreflang、精确语言切换、元数据、结构化数据、内部链接和锚点全部通过。
- 新文章九语言逐页检查：三条可见问答与 FAQPage 一致、锚点存在、SEO 无可见说明区、实际发布日期正确；英文无残留 Markdown 强调标记。
- 中文 1280×960 桌面端：页面宽度 1280，无横向溢出；主图 1600×1200、4:3 比例及 AI 标签正常。canonical 正确，10 个 hreflang（九语言与 x-default）。问答目录跳转至 `#faq-vrla`；申请样品到达 `#contact`，表单存在。
- 西班牙语为最长次级标题（58 字符），390×844 手机端：页面宽度 390，无横向溢出，标题和按钮正常换行；主图展示约 358×269。
- `git diff --check` 通过。未修改 API、后台、数据库或服务器配置；未提交、推送或部署。

截图：`/tmp/viking-vrla-agm-gel-desktop.png`、`/tmp/viking-vrla-agm-gel-qa.png`、`/tmp/viking-vrla-agm-gel-es-mobile.png`。

## 最终图片提示词

Use case: scientific-educational. Create a premium industrial B2B editorial 4:3 illustration for an article explaining VRLA is the parent category and AGM and GEL have different internal electrolyte immobilization structures. Clean navy white engineering tabletop. Two intact unbranded sealed lead-acid batteries side by side under a subtle shared abstract parent bracket, neither visually superior. In front of the left battery a separate magnified glass-fiber porous mat sample with subtle blue electrolyte capillary retention, in front of right a separate translucent blue gel sample with thin separator sheet beside it. Clearly conceptual material sample comparison, not open operating batteries or a real test. Blueprint visual hierarchy and precise industrial lighting, realistic 3D diagram. No words, letters, brand marks, voltage or performance values, awards, checkmarks, guarantees, pourable acid, sparks, people or leaking batteries. Safe margins, all subjects fully visible; leave bottom-right quiet for website's localized AI illustration overlay. Landscape 1600x1200 composition.
