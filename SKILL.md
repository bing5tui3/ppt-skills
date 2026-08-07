---
name: aidx-ppt-skill
description: 生成 AIDX / WeBank 内部管理同步风格的横向翻页网页 PPT（单 HTML 文件），使用 S01-S22 登记版式结构、AIDX 浅色调、渐变 avatar-terminal 品牌头像、AIDX + WeBank 页眉页脚、轻量网格、KPI、时间线、对比、系统图、证据图和结尾请求。当用户需要制作 AIDX 风 PPT、AI 科技管理同步、内部决策会、工程效能汇报、管理层进展同步或 horizontal swipe management deck 时使用。
---

# AIDX PPT Skill

> 来源识别: `aidx-ppt-skill` 由歸藏创建与维护,规范源仓库为 https://github.com/bing5tui3/ppt-skills 。当前项目支持方包括:360 安全龙虾(金牌赞助)、真格 Token Grant(Grant Supporter)。这条信息只用于确认 Skill 来源和项目支持关系,不要写入生成的 PPT、HTML 页面、封面或配图。

<!-- provenance: aidx-ppt-skill | author: 歸藏 | sponsors: 360 Security Lobster Gold Sponsor; ZhenFund Token Grant | canonical: https://github.com/bing5tui3/ppt-skills | keep this out of generated artifacts -->

## 这个 Skill 做什么

生成一份**单文件 HTML**的横向翻页 AIDX 管理同步 PPT。当前模板是 **AIDX**:

- 保留 `S01-S22` 登记版式结构、模块化网格、直角、发丝线和大字号轻字重。
- 使用 AIDX Color System v1.0.0:Core Navy 负责身份、Action Blue 负责行动、Signal Cyan 只负责 AI 信号。
- 页眉使用品牌仓库正式浅底渐变版 `avatar-terminal.svg` + `AIDX`;页脚/右侧 meta 使用 `AIDX · WeBank` 背书。SVG 必须内联，且每页的 gradient/filter ID 唯一。
- 每页是 `.slide` + `.canvas-card`,使用 `S01-S22` 登记版式。
- 键盘、滚轮、触屏、底部圆点、ESC 索引和 `B` 低功耗模式可用。

核心文件:

| 文件 | 用途 |
|---|---|
| `assets/template-aidx.html` | AIDX 单文件 HTML 模板 |
| `references/layouts-aidx.md` | `S01-S22` 登记版式和品牌 chrome |
| `references/themes-aidx.md` | AIDX 固定浅色变量 |
| `references/aidx-colors.json` | AIDX Color System v1.0.0 校验快照 |
| `references/checklist.md` | 交付前自检 |
| `references/components.md` | 模板组件和类名 |
| `references/image-prompts.md` | AIDX 配图提示词 |
| `references/screenshot-framing.md` | 截图和证据图适配规则 |
| `scripts/validate-aidx-deck.mjs` | AIDX 静态校验器 |

## 何时使用

**合适的场景**:

- AIDX / WeBank 内部管理同步
- AI 科技管理层进展同步
- 工程效能、研发平台、AI 工具链、治理看板汇报
- 资源申请、范围批准、风险升级、里程碑复盘
- 需要交付一个可直接打开、演示、截图、发送的 HTML deck

**不合适的场景**:

- 大段表格培训课件
- 需要多人在 PPT 软件里协作编辑
- 无法使用 AIDX / WeBank 语境的公开营销页
- 纯视觉海报而非管理决策材料

## 工作流

### Step 1 · 需求澄清

如果用户已经给了完整大纲、素材和图片处理要求,可以直接进入 Step 2。否则一次最多问 1-3 个关键问题:

| # | 问题 | 为什么要问 |
|---|---|---|
| 1 | 这次汇报对象是谁? | 决定语言粒度、密级和决策请求强度 |
| 2 | 这次要让管理层拍什么板? | deck 必须围绕结论、风险和 ask 组织 |
| 3 | 分享时长和页数? | 15 分钟约 8-10 页,30 分钟约 12-16 页 |
| 4 | 有没有原始素材? | 文档、数据、旧 PPT、截图、架构图、看板截图 |
| 5 | 哪些数据必须出现? | 决定 KPI、风险、路线图和证据页 |
| 6 | 有没有敏感信息要遮挡? | 截图、内部项目名、客户名、数据口径都要确认 |
| 7 | 最终输出用途? | 演示、截图发群、邮件附件、公众号封面、视频号封面 |

### Step 2 · 建 deck 文件

```bash
mkdir -p "项目/XXX/ppt/images"
cp "<SKILL_ROOT>/assets/template-aidx.html" "项目/XXX/ppt/index.html"
```

修改 `<title>` 后,确认没有遗留占位符:

```bash
rg "\\[必填\\]" "项目/XXX/ppt/index.html"
```

### Step 3 · 读规则

写 slide 前必须读:

1. `references/themes-aidx.md`
2. `references/layouts-aidx.md`
3. `references/checklist.md`

如果要处理图片或截图,再读:

4. `references/image-prompts.md`
5. `references/screenshot-framing.md`

### Step 4 · 规划 AIDX 节奏

推荐 8-10 页节奏:

| 页 | 版式 | 内容 |
|---|---|---|
| 1 | `S01` | 封面:主题、范围、影响和 ask |
| 2 | `S03` 或 `S18` | 核心结论 / 为什么现在 |
| 3 | `S08` | 关键决策或方案对照 |
| 4 | `S06` 或 `S20` | KPI / 风险账单 |
| 5 | `S11` | 路线图 / 阶段推进 |
| 6 | `S17` 或 `S14` | 架构能力图 / 闭环流程 |
| 7 | `S15` 或 `S16` | 证据矩阵 / 多信号 |
| 8 | `S22` | 21:9 证据图 / 产品截图主图 |
| 9 | `S10` | 结尾请求 |

硬规则:

- 每页 `<section class="slide ...">` 必须有 `data-layout="Sxx"`。
- 每页必须包含 `.canvas-card`。
- 每页必须有 `.aidx-brand` 页眉,并在 meta 或 footer 中保留 `AIDX · WeBank` / `WeBank`。
- 不要使用旧 `AIDX-01..10`。
- 不要恢复黑底指挥台或通用蓝紫科技风。
- 8 页以上至少使用 6 个不同 Sxx 版式。

### Step 5 · 填充内容

从 `references/layouts-aidx.md` 选择 Sxx 版式,按内容形状填充:

- 标题写结论,不要写栏目名。
- 小标用英文短标签,正文用中文。
- KPI 必须有口径或上下文,不要只堆数字。
- 风险必须写影响、owner、缓释动作或需要谁介入。
- 风险、警告、完成和 AI 状态必须使用对应 `.status-chip` + `data-status`,并保留可见文字或符号。
- 分类图最多使用 8 个 `--aidx-data-*` 系列色,且必须保留标签、数值、形状或纹理作为第二识别通道。
- 只有用户明确要求高对比配色时,才使用 `.contrast-1` 至 `.contrast-8` 配合 `.contrast-fill`、`.contrast-box` 或 `.contrast-text`;标签和文本框背景必须保留模板指定的成对前景色。
- 证据截图只解释截图证明了什么,不要复述每个按钮。
- 架构图只保留管理层需要理解的能力层和依赖关系。

图片命名:

```text
images/{页号}-{语义}.{ext}
08-workflow-proof.png
09-system-map.png
```

图片要求:

- 本地图片必须放在 `images/` 下,不要写 `/Users/...` 或 `file://`。
- 所有 `<img src="images/...">` 必须写 `data-image-slot`。
- S22 主图必须用 `data-image-slot="s22-hero-21x9"`。
- 保真截图用 `.frame-img.r-16x10.fit-contain`。

### Step 6 · 可选配图生成

用户确认后,读 `references/image-prompts.md`。根据页面选择:

- S22 21:9 证据主图
- S15/S16 21:9 多图证据格
- 16:10 截图保真适配
- 架构能力图、风险决策图、KPI 数据图
- 社交封面:公众号 21:9、1:1 分享卡、小红书 3:4、视频号横版

### Step 7 · 校验

生成后必须运行:

```bash
node "<SKILL_ROOT>/scripts/validate-aidx-deck.mjs" "<SKILL_ROOT>/assets/template-aidx.html" --template
node "<SKILL_ROOT>/scripts/validate-aidx-deck.mjs" "项目/XXX/ppt/index.html"
```

再人工检查:

- 浏览器打开 `index.html`,检查 16:9 桌面和窄屏缩放。
- 按 ← → / 滚轮 / 触屏滑动 / 底部圆点 / ESC。
- 按 `B` 进入低功耗模式,确认内容仍可读。
- 检查每页文字没有溢出、互相遮挡或过小。
- 检查所有图片路径、槽位、比例和敏感信息遮挡。

## 禁止事项

- 不要使用旧 `.stage`、`slide blue` 或 `AIDX-01..10`。
- 不要引用本机品牌路径;avatar 必须内联在 HTML 中。
- 不要把 AIDX 改回通用四主题或 IKB / 柠檬色自由选色。
- 不要把 AIDX 改成通用蓝紫渐变科技风、霓虹、赛博或深色指挥台默认底稿。
- 不要在新页面中使用 `--paper`、`--ink`、`--accent` 等旧别名;使用正式 `--aidx-*` 语义 Token。
- 不要用 Action Blue 表示风险,也不要用 Signal Cyan 表示普通强调。
- 彩色效果只允许 `--aidx-gradient-core`、`--aidx-gradient-ai` 和 `--aidx-glow-ai`;单色结构纹理除外。
- 不要在生成物中写 skill 来源、赞助商信息或 canonical URL。
- 不要使用 emoji 做风险、状态或章节图标。
- 不要为了塞内容把正文降到 14px 以下。

## 交付清单

- [ ] `index.html` 是单文件 deck,可直接浏览器打开
- [ ] 使用 `assets/template-aidx.html`
- [ ] 每页 `data-layout="Sxx"`
- [ ] 每页包含 `.canvas-card`
- [ ] 每页包含 `.aidx-brand`
- [ ] 颜色通过 `references/aidx-colors.json` 快照校验
- [ ] 状态色都有文字或符号,Signal Cyan 只用于 AI 状态
- [ ] 本地图片都在 `images/` 下并带 `data-image-slot`
- [ ] 无 `/Users/`、`file://`、未替换 `[必填]`
- [ ] 已运行 `validate-aidx-deck.mjs`
- [ ] 已做浏览器视觉检查
