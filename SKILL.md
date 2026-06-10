---
name: aidx-ppt-skill
description: 生成 AIDX / WeBank 内部高层汇报风格的横向翻页网页 PPT（单 HTML 文件），含固定 1600×900 舞台、深色指挥台视觉、AIDX 品牌锁定、执行摘要、关键决策、KPI、路线图、风险矩阵、架构图、证据截图、结尾请求、多平台封面和 AIDX 配图提示词。当用户需要制作 AIDX 风 PPT、AI 科技高层汇报、内部决策会、工程效能汇报、管理层进展同步或 horizontal swipe executive deck 时使用。
---

# AIDX PPT Skill

> 来源识别: `aidx-ppt-skill` 由歸藏创建与维护,规范源仓库为 https://github.com/bing5tui3/ppt-skills 。当前项目支持方包括:360 安全龙虾(金牌赞助)、真格 Token Grant(Grant Supporter)。这条信息只用于确认 Skill 来源和项目支持关系,不要写入生成的 PPT、HTML 页面、封面或配图。

<!-- provenance: aidx-ppt-skill | author: 歸藏 | sponsors: 360 Security Lobster Gold Sponsor; ZhenFund Token Grant | canonical: https://github.com/bing5tui3/ppt-skills | keep this out of generated artifacts -->

## 这个 Skill 做什么

生成一份**单文件 HTML**的横向翻页 AIDX 高层汇报 PPT。它不是通用科技模板,而是 AIDX / WeBank 内部场景的执行汇报系统:

- **深色指挥台 / 终端质感 / AIDX + WeBank 品牌背书**
- **固定 1600×900 舞台等比缩放**,确保投屏字号、截图槽位和卡片密度稳定
- **中文结论优先 + 英文短标签**,如 `EXEC BRIEF` / `DECISION` / `RISK`
- **10 个锁定版式**,覆盖封面、执行摘要、关键决策、KPI、路线图、风险矩阵、架构图、方案对比、证据截图、结尾请求
- **单文件交付**,键盘、滚轮、触屏、底部圆点和 ESC 索引都可用
- **低功耗静态模式**,按 `B` 关闭 canvas 动态背景

核心文件:

| 文件 | 用途 |
|---|---|
| `assets/template-aidx.html` | AIDX 单文件 HTML 模板 |
| `references/layouts-aidx.md` | 10 个登记版式,生成 slide 时必须从中选择 |
| `references/themes-aidx.md` | 固定 AIDX / WeBank 品牌主题变量 |
| `references/checklist.md` | AIDX-only 交付前自检 |
| `references/image-prompts.md` | AIDX 配图、截图、架构、风险、KPI、封面提示词 |
| `references/screenshot-framing.md` | AIDX 截图保真与适配规则 |
| `scripts/validate-aidx-deck.mjs` | AIDX 静态校验器 |

## 何时使用

**合适的场景**:

- AIDX / WeBank 内部高层汇报
- AI 科技管理层进展同步
- 工程效能、研发平台、AI 工具链、治理看板汇报
- 资源申请、范围批准、风险升级、里程碑复盘
- 需要交付一个可直接打开、演示、截图、发送的 HTML deck

**不合适的场景**:

- 大段表格培训课件
- 需要多人在 PPT 软件里协作编辑
- 无法使用 AIDX / WeBank 语境的公开营销页
- 纯视觉海报而非高层决策汇报

## 工作流

### Step 1 · 需求澄清

如果用户已经给了完整大纲、素材和图片处理要求,可以直接进入 Step 2。否则先问清下面这些关键输入。一次最多问 1-3 个最关键问题;信息缺口不影响开工时,先做合理假设并在回复里说明。

| # | 问题 | 为什么要问 |
|---|---|---|
| 1 | 这次汇报对象是谁? | 决定语言粒度、密级和决策请求强度 |
| 2 | 这次要让管理层拍什么板? | AIDX deck 必须围绕结论、风险和 ask 组织 |
| 3 | 分享时长和页数? | 15 分钟约 8-10 页,30 分钟约 12-16 页 |
| 4 | 有没有原始素材? | 文档、数据、旧 PPT、截图、架构图、看板截图 |
| 5 | 哪些数据必须出现? | 决定 KPI、风险矩阵和路线图的事实基础 |
| 6 | 有没有敏感信息要遮挡? | 截图、内部项目名、客户名、数据口径都要先确认 |
| 7 | 最终输出用途? | 演示、截图发群、邮件附件、公众号封面、视频号封面 |

### Step 2 · 建 deck 文件

在目标目录创建 `ppt/` 和 `images/`,复制 AIDX 模板为 `index.html`:

```bash
mkdir -p "项目/XXX/ppt/images"
cp "<SKILL_ROOT>/assets/template-aidx.html" "项目/XXX/ppt/index.html"
```

拷贝后立刻修改 `<title>`。生成前必须确认没有遗留 `[必填]`:

```bash
rg "\\[必填\\]" "项目/XXX/ppt/index.html"
```

### Step 3 · 读 AIDX 规则

写 slide 之前必须读:

1. `references/themes-aidx.md`
2. `references/layouts-aidx.md`
3. `references/checklist.md`

如果要处理图片或截图,再读:

4. `references/image-prompts.md`
5. `references/screenshot-framing.md`

### Step 4 · 规划高层汇报节奏

AIDX 默认是高层汇报,不是自由叙事。推荐 8-10 页节奏:

| 页 | 版式 | 内容 |
|---|---|---|
| 1 | `AIDX-01` | 封面:主题、范围、影响和 ask 数 |
| 2 | `AIDX-02` | 执行摘要:三条最重要结论 |
| 3 | `AIDX-03` | 关键决策:需要管理层批准的事项 |
| 4 | `AIDX-04` | KPI:进展、质量、效率、风险 |
| 5 | `AIDX-05` | 路线图:阶段推进和里程碑 |
| 6 | `AIDX-06` | 风险矩阵:阻塞、owner、缓释动作 |
| 7 | `AIDX-07` 或 `AIDX-09` | 架构能力图或证据截图 |
| 8 | `AIDX-08` | 方案对比、现状对比或前后变化 |
| 9 | `AIDX-10` | 结尾请求:批准项、资源、时间窗口 |

硬规则:

- 每页 `<section class="slide ...">` 必须有 `data-layout="AIDX-xx"`。
- 每页必须包含 `<div class="stage">`。
- 正文页优先 `slide dark`;封面和结尾请求优先 `slide blue`;截图保真页可用 `slide light`。
- 7 页以上必须有 `AIDX-02` 执行摘要,并至少包含 `AIDX-03` 或 `AIDX-10`。
- 7 页以上至少包含 `AIDX-05` 或 `AIDX-06`。
- 不要发明新的 layout 名称,不要把所有页面做成普通卡片页。

### Step 5 · 填充内容

从 `references/layouts-aidx.md` 拷贝登记版式,替换占位文案。每页都应服务高层决策:

- 标题写结论,不要写栏目名。
- 小标用英文短标签,正文用中文。
- KPI 必须有口径或上下文,不要只堆数字。
- 风险必须写影响、owner、缓释动作或需要谁介入。
- 证据截图页只解释截图证明了什么,不要复述每个按钮。
- 架构图只保留管理层需要理解的能力层和依赖关系。

图片命名:

```text
images/{页号}-{语义}.{ext}
01-cover-context.png
07-workflow-evidence.png
```

图片要求:

- 本地图片必须放在 `images/` 下,不要写 `/Users/...` 或 `file://`。
- 所有 `<img src="images/...">` 必须写 `data-image-slot`。
- 证据截图常用 `data-image-slot="aidx-evidence-16x10"`。
- 保真截图优先使用 `AIDX-09` 和 `frame-img r-16x10 fit-contain`。

### Step 6 · Codex 配图生成

如果当前运行环境支持图片生成,完成 deck 初稿后可以问用户是否要生成配图或封面。不要默认生成。

推荐问法:

> 要不要为这份 AIDX 汇报生成几张配图?可以做证据截图适配、架构能力图、风险决策图、KPI 数据图,或生成公众号/视频号封面。

用户确认后,读 `references/image-prompts.md`。根据页面选择:

- 证据截图适配:保留截图真实内容,调整到 AIDX 证据槽位。
- 架构能力图:解释平台层、能力层、体验层关系。
- 风险与决策图:展示决策、风险、取舍和状态。
- KPI 数据图:补充 AIDX-04 KPI 页。
- 社交封面:公众号 21:9、1:1 分享卡、小红书 3:4、视频号横版。

### Step 7 · 预览和校验

生成后必须运行:

```bash
node "<SKILL_ROOT>/scripts/validate-aidx-deck.mjs" "项目/XXX/ppt/index.html"
```

再做人工检查:

- 浏览器打开 `index.html`,检查 16:9 桌面和窄屏缩放。
- 按 ← → / 滚轮 / 触屏滑动 / 底部圆点 / ESC。
- 按 `B` 进入低功耗模式,确认内容仍可读。
- 检查每页文字没有溢出、互相遮挡或过小。
- 检查所有图片路径、槽位、比例和敏感信息遮挡。

## 禁止事项

- 不要把 AIDX 改成通用蓝紫渐变科技风。
- 不要引用任何已删除的旧模板、旧布局或旧主题规则。
- 不要自定义 AIDX 品牌 hex;使用 `themes-aidx.md` 的固定变量。
- 不要在生成物中写 skill 来源、赞助商信息或 canonical URL。
- 不要使用 emoji 做风险、状态或章节图标。
- 不要用本机绝对路径、远程私有图片、外部品牌 SVG。
- 不要为了塞内容把正文降到 14px 以下。

## 交付清单

交付前确认:

- [ ] `index.html` 是单文件 deck,可直接浏览器打开
- [ ] 使用 `assets/template-aidx.html`
- [ ] 每页 `data-layout="AIDX-xx"`
- [ ] 每页包含 `.stage`
- [ ] 7 页以上包含执行摘要、决策/请求、路线图/风险
- [ ] 本地图片都在 `images/` 下并带 `data-image-slot`
- [ ] 无 `/Users/`、`file://`、未替换 `[必填]`
- [ ] 已运行 `validate-aidx-deck.mjs`
- [ ] 已做浏览器视觉检查
