# 铅酸电池补液文章验收

日期：2026-10-28。文章标识：`leadAcidFluidTopUp`；分类：采购指南。

## 内容与接入

- 路径：`/blog/can-adding-fluid-restore-weak-lead-acid-battery/`，其他语言使用对应前缀。
- 英、中、越、韩、日、西、葡、俄、阿九语言均包含五章正文、项目清单、参考资料、相关文章与样品 CTA。
- 内容区分富液式与 AGM/VRLA、具体型号维护要求、容量衰减诊断、异常停用提示及制造商材料匹配。保留原稿的安全边界，不加入开壳、混酸或注液操作步骤。
- [Trojan 维护资料](https://www.trojanbattery.com/trojan-aes-batteries/aes-agm-standard-agm-battery-maintenance)用于其 AES AGM 禁止补水、加酸、添加剂及拆改阀帽的型号要求，以及充电影响；[H&V AGM 概述](https://www.hollingsworth-vose.com/wp-content/uploads/AGM-Separator.pdf)用于材料功能。没有将这些资料当作所有铅酸电池的统一维护规则或 Viking 性能保证。
- 新文章发布、修改和 sitemap 日期均为 2026-10-28；此前文章正文和相关文章经生成前后比较未变，上一篇未提交的房车文章完整保留。
- 同步 CMS、资料中心、导航、精确语言切换、metadata、canonical、hreflang、Open Graph 和结构化数据。导航继续每类最多五篇并保留查看更多。

## 配图

内置 image_gen 生成并修订概念图；最终资源为 `public/images/articles/lead-acid-fluid-topup-hero-1600.webp`，1600 × 1200。图内局部示意已修正为纤维隔板贯穿极板间隙、不出现自由液面；完整闭合电池与未连接的检查工具不构成维修示范。各语言在图内右下角显示本地化 AI 标注。正文卷材、片材卡片继续使用官网原图。

生成提示词：

> Use case: scientific-educational. Create a 4:3 landscape conceptual editorial hero illustration for an industrial B2B article asking whether adding fluid can restore a weak lead-acid battery. Show one intact closed unbranded AGM battery on a clean blue-gray technical workbench, with a clearly conceptual floating inset showing white glass-fiber separator sheets between plates holding electrolyte, no open case or real disassembly. Next to it place a closed model instruction booklet and a diagnostic checklist card with simple nonverbal icons for battery condition, charging equipment, and connections; keep all diagnostic instruments unconnected, no exposed probes on battery. A small separate droplet symbol with a clear red prohibition slash communicates no routine fluid addition to sealed AGM. Do not depict fluid being poured, syringes, acid bottles, tools prying lids, open valve caps, damaged cells, sparks, flames, people, performance numbers, brand logos or readable text. Restrained professional blue-white palette with a small red accent, clean realistic 3D educational style, complete subjects with generous safe margins. No implied repair success or installation instructions. Website will overlay a localized AI-illustration disclosure inside the lower right corner; leave that corner visually quiet.

修订提示词：

> Edit only the circular technical inset above the battery in this image. Remove ALL visible blue free liquid, pools, water level, waves and bubbles from the inset. It depicts an AGM battery, so show gray parallel plates tightly alternating with white fibrous glass mats filling the gaps throughout their whole height, with a subtle uniform very pale blue tint WITHIN THE FIBERS to suggest retained electrolyte. There must be no free liquid layer between plates and no half-filled appearance. It is a conceptual structure illustration, not a real cross section. Preserve the intact closed battery, workbench, manual, checklist, unconnected tools, prohibition-droplet icon, framing, colors, lighting and all other image elements unchanged. No text.

## 验证结果

- 按顺序完成 CMS 导出与内容校验；34 篇文章九语言完整。
- 默认生产命令在本机 Turbopack 内部进程绑定端口时失败；随后用 `npm run build -- --webpack` 完成生产静态构建，并运行同一流程的资源校验、sitemap 生成、静态后处理与全部静态校验。项目构建脚本没有改变。
- sitemap 共 414 个公开 URL，九种语言各 46 页。全部通过语言、RTL、canonical、双向 hreflang、对应内容语言切换、metadata、结构化数据、内部链接与锚点校验。
- 浏览器确认中文桌面标题、4:3 图片、目录跳转和样品入口正常；俄语为本篇次级语言中标题字符数最长的版本，390px 实测 scrollWidth 为 390，标题和图像完整、无损坏图片。
- 俄语菜单切换阿拉伯语后保持当前文章，RTL 与 390px 宽度正常。资料中心采购指南收录新文章并可点击到达。浏览器无错误日志。
- 差异空白检查通过。未改动 API、数据库、CRM、代理或服务器配置，未提交、推送或部署。

[本地中文预览](http://127.0.0.1:4173/zh/blog/can-adding-fluid-restore-weak-lead-acid-battery/)

