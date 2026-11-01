# 100Ah、C10 与 C20 文章验收

完成整理：2026-10-30。页面发布与修改日期保留实际制作日 2026-10-29。

- 分类：采购指南。路径：`/blog/100ah-battery-c10-c20-capacity-comparison/`，九语言同步，含阿拉伯语。
- 五章覆盖时率与 C-rate 区别、测试条件、比较表的记录要求、额定/实验室/现场数据与 AGM 验证边界。
- 保留 100Ah÷20h=5A 和 100Ah÷10h=10A 的条件限定，不用于同一电池容量保证或通用换算。
- [Sacred Sun 官网](https://sacredsun.cn/)核对 SP 的 5–33Ah（C20,25°C）和 38–250Ah（C10,25°C），仅作为对应产品资料；[Trojan 资料](https://www.trojanbattery.com/trojan-aes-batteries/aes-agm-standard-agm-battery-maintenance)用于说明容量随电流变化。均非 Viking 测试。
- 新主图为内置 image_gen 生成的概念图，资源 `public/images/articles/battery-capacity-hour-rates-hero-1600.webp`，1600 × 1200。本地化 AI 标注位于图内右下角，正文沿用官网卷材和片材图。
- 已完成 CMS 导出、内容校验、生产静态构建与后处理。默认 Turbopack 遇到本机权限错误，改用 Webpack 完成同一验证流程，未改构建脚本。
- 全站 432 个 sitemap URL，各语言 48 页、36 篇文章。语言、RTL、canonical、双向 hreflang、语言切换、metadata、结构化数据、内部链接及锚点全部检查通过。
- 浏览器验收中文桌面、标题字符数最长的次级语言阿拉伯语 390px；无横向溢出（scrollWidth=390），RTL 正常。目录与样品入口可用，中文 canonical 与 10 个语言 alternate 正常。
- 差异空白检查通过；未改动 API、数据库、后台或服务器配置，未提交、推送或部署。

生成提示词：

> Create a polished 4:3 scientific educational editorial illustration for a B2B article about comparing two 100Ah lead-acid battery ratings under different hour rates. Two intact unbranded identical dark batteries on a clean blue gray laboratory planning desk, each accompanied by a separate test-condition document and different clock dial symbol; a shared checklist with abstract icons for temperature, endpoint voltage and constant current or constant power. No cables connected, no experimental claims, no graphs showing invented data. Restrained industrial white and blue 3D illustration, all subjects fully inside frame with generous margins. No readable text, numbers, logos or certification badges. Leave lower right quiet for website localized AI-illustration overlay. Conceptual comparison only, not real test evidence.

[本地预览](http://127.0.0.1:4173/zh/blog/100ah-battery-c10-c20-capacity-comparison/)

