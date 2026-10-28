# 房车 AGM 电池文章验收

日期：2026-10-28。内容分类：行业与应用。文章标识：`rvAgmStartingHouseDuty`。

## 页面与内容

- 路径：`/blog/rv-agm-batteries-starting-house-power-duty/`，其余语言使用对应语言前缀。
- 英文、中文、越南语、韩语、日语、西班牙语、巴西葡萄牙语、俄语、阿拉伯语均包含六章正文、采购清单、资料来源、相关文章及样品 CTA。
- 区分 AGM 结构和启动、深循环、双用途设计。保留负载时间、瞬时需求、容量测试条件、可用容量、充电兼容性、分组与整电池验证要求。不把第三方型号数据写成所有 AGM 的结果或维京保证。
- 复用文章模板、九语言路由、语言切换和导航；桌面导航每类最多五篇，其余通过查看更多访问。未改动旧文章正文或其相关文章。
- 发布与更新日期为 2026-10-28，未重置其他文章日期。

## 来源核验

- [Trojan：AGM 选型与维护](https://www.trojanbattery.com/trojan-aes-batteries/aes-agm-standard-agm-battery-maintenance)：用途分类和容量条件；不搬用产品寿命宣传值。
- [H&V：AGM Separator](https://www.hollingsworth-vose.com/wp-content/uploads/AGM-Separator.pdf)：隔离、保液和离子传输功能；不搬用其产品曲线与性能值。

## 配图

使用内置 image_gen 工具生成新的 4:3 概念图，优化为 1600 × 1200 WebP。各语言通过现有模板在图内右下角显示本地化 AI 示意图标注。

资源：`public/images/articles/rv-agm-starting-house-duty-hero-1600.webp`。原生成文件保留在 Codex generated_images 目录。正文卷材和片材展示继续使用官网原有图片。

生成提示词：

> Use case: scientific-educational. Create a polished 4:3 landscape editorial illustration for an industrial B2B article about RV AGM batteries: engine starting duty versus sustained house electrical loads. A modern generic motorhome in three-quarter side view in a quiet campsite, with two clearly separated conceptual inset areas: at the front, engine bay and an unbranded dark battery with a small short-pulse motif; at the rear, an unbranded house battery alongside small icons of refrigerator, interior light, water pump and fan with a gentle extended timeline motif. Elegant restrained blue-gray and white palette, subtle warm lighting, clean realistic 3D explanatory illustration. All objects fully within frame with generous margin, no readable labels, no brands, no ratings, no wiring diagram, no exposed acid, no claimed installation instructions. This is a conceptual illustration, not a real customer project or technical design. No text at all; website will overlay a localized AI illustration disclosure inside the lower right corner.

## 验证

- 依次完成 CMS 导出、内容注册校验、公共资源检查和 sitemap 生成。
- 默认 `build:volcengine` 在本机 Turbopack 启动内部进程时遇到端口权限错误。未修改项目构建脚本；改用 `npm run build -- --webpack`，并执行同一生产流程的前置检查、静态后处理和全部静态校验，均通过。
- 全站 405 个 sitemap URL，每种语言 45 页，包括 33 篇文章。全部页面通过语言、RTL、canonical、双向 hreflang、语言精确切换、metadata、结构化数据、内部链接和锚点校验。
- 中文桌面页面图像比例为 648 × 486（4:3），原图 1600 × 1200；浏览器确认目录及样品入口可用。
- 阿拉伯语为本篇次级语言中字符数最长的标题，390px 宽度实测页面宽度与 scrollWidth 均为 390，RTL 正常，无损坏图片。另检查俄语 390px 页面及正文换行，均无横向溢出。
- 从阿拉伯语语言菜单切换俄语后仍停留于对应文章。资料中心“行业与应用”入口可到达新文章；浏览器无错误日志。
- 差异空白检查通过。未改动 API、数据库、CRM、代理或服务器配置；未提交、推送、部署。

本地预览：[中文文章](http://127.0.0.1:4173/zh/blog/rv-agm-batteries-starting-house-power-duty/)。
