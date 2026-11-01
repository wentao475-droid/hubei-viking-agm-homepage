# AGM 保液与安装姿态文章验收

日期：2026-10-31。新增 `/blog/agm-electrolyte-retention-battery-installation-orientation/`，制造与质量分类，九语言同步登记。发布日期、更新时间及 sitemap lastmod 均为当天，保留其他文章日期。

## 内容与来源

五节正文：保液不等于安装批准；倾斜、侧面、背面与倒置的区别；完整安装条件；替换型号确认；整电池验证边界。新增三个可见问答，覆盖能否倒置、侧放是否包含倒置、短期无漏液能否证明安全。

核验 [Yuasa Battery FAQ](https://www.yuasabatteries.com/resources/faqs/) 的安装姿态条目：其说明多数应用直立、部分应用倾斜或背面平放，且不同型号存在不同安装限制。页面未见明确发布日期，核验日为 2026-10-31。文章不提供通用角度、试验时长或合格门槛，不构成所有品牌或所有型号的许可，不将隔板材料性能描述为整电池安装认证。

SEO 置于 metadata、canonical、双向 hreflang、Open Graph，以及 WebPage、BlogPosting、BreadcrumbList、FAQPage。正文无独立 SEO 文案或关键词区。九语言每页三个可见问题和答案与 FAQPage 逐条一致。

## 图片

使用内置 image_gen 新生成并检查，优化文件为 `public/images/articles/agm-battery-orientation-hero-1600.webp`，1600×1200。呈现直立密封电池、纤维孔隙保液的放大示意及带问号的姿态草图，没有给出获准角度或试验结果。图片右下角沿用九语言 AI 说明，不作为实拍或试验证据。正文沿用现有卷材和片材图片。

原图：`/Users/vea/.codex/generated_images/01a086b9-de72-75c0-949e-86239616bb59/exec-41082533-2bca-4820-9e34-a4bedc45d3d5.png`。

## 验证结果

- CMS 导出、内容登记及公共资源检查通过，38 篇文章，九语言。
- `build:volcengine` 的默认 Turbopack 再现本机创建子进程/绑定端口的权限错误；同一生产流水线改用 `next build --webpack` 后编译、TypeScript、静态生成、postprocess 与 verify:static 全部通过。未改构建或服务器配置。
- 全站 450 个 sitemap 页面，每语言 50 页。HTML 语言、RTL、canonical、双向 hreflang、精确语言切换、元数据、结构化数据、内部链接与锚点全部通过。
- 对新文章九语言逐页额外检查：三个可见问答与 FAQPage 相同，问答锚点完整，SEO 无可见区块，主图指向本篇资源。
- 中文桌面 1280×960：页面宽度 1280，无横向溢出；标题、4:3 首图、AI 说明正常。自指 canonical 正确，10 个 hreflang（九语言及 x-default）。问答目录到达 `#faq-inversion`；申请样品到达 `#contact`，表单存在。
- 俄语为次级语言最长标题（67 字符），390×844：页面宽度 390，无横向溢出，标题和按钮可换行，主图自然尺寸 1600×1200、展示约 358×269。
- `git diff --check` 通过。保留之前未提交的 100Ah 与库存自放电文章；未改 API、后台、数据库；未提交、推送或部署。

截图：`/tmp/viking-orientation-desktop.png`、`/tmp/viking-orientation-qa.png`、`/tmp/viking-orientation-ru-mobile.png`。

## 技能更新

已修改 `/Users/vea/.codex/skills/viking-website-content/SKILL.md` 与其 `references/content-standard.md`：技术文章默认有可见本地化问答；SEO 仅内置，正文不展示 SEO 优化说明区；FAQPage 与可见问答一致，并纳入验收。技能校验通过。校验器需要的 PyYAML 安装在 `/tmp/viking-skill-yaml`，未修改项目依赖。

## 最终图片提示词

Use case: scientific-educational. Generate a premium industrial B2B 4:3 editorial conceptual illustration about AGM electrolyte retention NOT automatically permitting inverted battery installation. On a clean navy/white engineering workbench show one intact unbranded sealed upright lead-acid battery with protected terminals, a separate magnified porous glass-fiber mat sample holding tiny blue liquid droplets through capillary pores, and a technical clipboard with blank approval checklist. In background, faint blueprint silhouettes of tilted and side-mounted batteries with question-mark symbols, no inverted physical battery, no checkmarks approving orientations. Clear visual distinction between material property and finished product approval. Realistic 3D diagram style, no people, no fluid pouring, leaks, open battery, sparks, labels, letters, numerical angle limits or brand logos. No text anywhere; leave lower-right quiet for localized AI illustration overlay by website. Important subjects comfortably within safe margins, 1600x1200 composition.
