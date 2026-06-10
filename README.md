# aidx-ppt-skill · AIDX 高层汇报网页 PPT

![GitHub stars](https://img.shields.io/github/stars/bing5tui3/ppt-skills?style=flat-square)
![License](https://img.shields.io/github/license/bing5tui3/ppt-skills?style=flat-square)
![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![HTML Deck](https://img.shields.io/badge/HTML-Deck-0A7CFF?style=flat-square)
![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)
[![由真格 Token Grant 资助](https://img.shields.io/static/v1?label=%E7%94%B1%E7%9C%9F%E6%A0%BC%20Token%20Grant&message=%E8%B5%84%E5%8A%A9&color=FF4D00&style=flat-square)](https://zhenfund.feishu.cn/share/base/form/shrcn1lAANF659o7EpWnxlR1VOh?sessionid=)
![360 安全龙虾金牌赞助](https://img.shields.io/static/v1?label=360%E5%AE%89%E5%85%A8%E9%BE%99%E8%99%BE&message=%E9%87%91%E7%89%8C%E8%B5%9E%E5%8A%A9&color=1677FF&style=flat-square)

> English version: [README.en.md](./README.en.md)

`aidx-ppt-skill` 是一个适配 Claude Code / Codex 等 Agent 环境的网页 PPT skill,用于生成 **AIDX / WeBank 内部高层汇报风格**的单文件 HTML 横向翻页 deck、PPT 配图和多平台封面。

它的核心气质是深色指挥台、终端质感、AIDX 主品牌 + WeBank 背书、结论优先。它不是通用科技模板,而是为 AI 科技高层汇报、工程效能汇报、内部决策会、资源申请、风险升级和路线图同步设计的单一风格系统。

> 由 [歸藏](https://x.com/op7418) 在多次线下分享和内部汇报迭代中沉淀而成。赞助与支持信息见 [SPONSORS.md](./SPONSORS.md)。

## 效果展示

**AIDX Cover**

![AIDX cover preview](./assets/readme/aidx-cover.webp)

**AIDX Executive Summary**

![AIDX executive summary preview](./assets/readme/aidx-executive-summary.webp)

样例: [AIDX Showcase](./examples/aidx-showcase.html) - 10 页,覆盖 `AIDX-01` 到 `AIDX-10` 全部登记版式。

## 30 秒开始

```bash
npx skills add https://github.com/bing5tui3/ppt-skills --skill aidx-ppt-skill
```

也可以直接把这段话发给有 shell 权限的 AI Agent:

```text
帮我安装 aidx-ppt-skill。请把 https://github.com/bing5tui3/ppt-skills 克隆到 ~/.claude/skills/aidx-ppt-skill,安装完成后检查 SKILL.md、assets/、references/ 是否存在。
```

已经安装过的话,用这段话更新:

```text
帮我更新 aidx-ppt-skill。请进入 ~/.claude/skills/aidx-ppt-skill 执行 git pull,然后告诉我当前最新 commit。
```

安装后直接对 Agent 说:

```text
帮我基于这份材料做一份 AIDX 高层汇报 PPT,控制在 8-10 页,需要执行摘要、风险矩阵、路线图和结尾决策请求。
```

也可以试这些请求:

```text
把这份工程效能复盘做成 AIDX 管理层汇报。
把这张产品截图适配成 AIDX-09 的 16:10 证据图。
基于这份汇报的核心结论,生成一张公众号 21:9 封面。
```

## 赞助与支持

<a href="./SPONSORS.md">
  <img src="https://github.com/user-attachments/assets/5b0c22c8-aff4-4219-900d-6af8604c57a8" alt="360 安全龙虾金牌赞助" width="100%">
</a>

`aidx-ppt-skill` 的持续迭代获得 **360 安全龙虾** 金牌赞助和 [真格 Token Grant](https://zhenfund.feishu.cn/share/base/form/shrcn1lAANF659o7EpWnxlR1VOh?sessionid=) 支持。更多信息见 [SPONSORS.md](./SPONSORS.md)。

## 你能得到什么

- **AIDX 单一视觉系统**:深色指挥台、终端质感、银行级克制、结论优先
- **横向左右翻页**:键盘 ← → / 滚轮 / 触屏滑动 / 底部圆点 / ESC 索引
- **10 种 AIDX 锁定版式**:封面、执行摘要、关键决策、KPI、路线图、风险矩阵、架构图、对比、证据截图、结尾请求
- **固定品牌主题**:AIDX 主色、WeBank 背书、深色默认、浅色截图页
- **Codex 可选配图流程**:证据截图适配、架构能力图、风险决策图、KPI 数据图、社交封面
- **多平台封面**:公众号 21:9、公众号分享卡 1:1、小红书 3:4、视频号横版等
- **低性能静态模式**:按 `B` 可关闭 canvas 动画,动态内容退回静态背景
- **单文件 HTML**:不需要构建、不需要服务器,浏览器直接打开
- **AIDX 校验器**:检查登记版式、`.stage`、图片槽位、本机路径、长 deck 结构和旧模板引用

## 适合 / 不适合

**合适**:AIDX / WeBank 内部高层汇报、AI 科技管理层进展同步、工程效能汇报、研发平台治理、资源申请、风险升级、路线图复盘。

**不合适**:大段表格培训课件、需要多人协作编辑的原生 PPT、无 AIDX / WeBank 语境的公开营销页。

## 常见使用场景

| 任务 | 推荐方式 |
|------|---------|
| 管理层进展汇报 | 先写 3 条执行摘要,再用 KPI、风险和路线图支撑 |
| 资源申请 / 范围批准 | 使用 `AIDX-03` 关键决策和 `AIDX-10` 结尾请求 |
| 工程效能复盘 | 使用 `AIDX-04` KPI、`AIDX-06` 风险矩阵、`AIDX-07` 架构能力图 |
| 产品或工作流截图 | 使用 `AIDX-09` 16:10 证据截图页,保留真实内容 |
| 多平台封面 | 从同一份内容生成公众号、分享卡、小红书、视频号封面 |
| 截图统一风格 | 按 `references/screenshot-framing.md` 做保真适配 |

## 为什么是 HTML PPT

- **更适合 Agent 生成和修改**:HTML / CSS 是文本,Agent 能直接读、改、验证。
- **表现力比 Markdown 更高**:可以做精细排版、空间定位、动画、交互和响应式封面。
- **交付更轻**:单文件 HTML 可以直接打开、演示、发送、截图。
- **更容易做质量控制**:AIDX 校验器可以检查版式、图片槽位、`.stage`、本机路径和旧模板引用。
- **更适合视觉内容链路**:同一套 AIDX 规则能覆盖 PPT、配图、封面和截图再设计。

## 平台支持

| 平台 | 状态 | 说明 |
|------|------|------|
| Claude Code | 支持 | 原生 Skill 工作流,适合生成和迭代 HTML deck |
| Codex | 支持 | 适合生成 PPT、调用图片生成能力、做浏览器视觉检查 |
| Cursor / 其他本地 Agent | 可用 | 需要能读写文件并执行 shell 命令 |
| 普通 Chatbot | 不推荐 | 没有文件系统和浏览器预览时,很难稳定生成完整 deck |

## 安装

### 方式一:一行命令安装

```bash
npx skills add https://github.com/bing5tui3/ppt-skills --skill aidx-ppt-skill
```

### 方式二:把下面这段话直接发给 AI

> 帮我安装 `aidx-ppt-skill` 这个 Claude Code skill。请按下面步骤做:
>
> 1. 确保 `~/.claude/skills/` 目录存在(不存在就创建)
> 2. 执行 `git clone https://github.com/bing5tui3/ppt-skills.git ~/.claude/skills/aidx-ppt-skill`
> 3. 验证:`ls ~/.claude/skills/aidx-ppt-skill/` 应该看到 `SKILL.md`、`assets/`、`references/`

手动安装命令:

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/bing5tui3/ppt-skills.git ~/.claude/skills/aidx-ppt-skill
```

## 使用流程

1. **澄清目标**:汇报对象、决策请求、页数、素材、敏感信息。
2. **复制模板**:`assets/template-aidx.html` 到目标目录 `ppt/index.html`。
3. **读取规则**:`themes-aidx.md`、`layouts-aidx.md`、`checklist.md`。
4. **规划版式**:优先覆盖执行摘要、关键决策、KPI、路线图、风险和证据。
5. **填充内容**:标题写结论,KPI 写口径,风险写 owner 和缓释动作。
6. **处理图片**:所有本地图片放入 `images/`,写 `data-image-slot`。
7. **运行校验**:`node scripts/validate-aidx-deck.mjs path/to/index.html`。
8. **浏览器预览**:检查翻页、低功耗模式、截图槽位和文字溢出。

## AIDX 版式

| Layout | 用途 |
|---|---|
| `AIDX-01` | Cover / 汇报入口 |
| `AIDX-02` | Executive Summary / 三条结论 |
| `AIDX-03` | Key Decision / 需要拍板 |
| `AIDX-04` | KPI Command Strip / 进展仪表 |
| `AIDX-05` | Roadmap / 阶段推进 |
| `AIDX-06` | Risk Matrix / 阻塞与应对 |
| `AIDX-07` | Architecture Map / 能力地图 |
| `AIDX-08` | Before After / 方案对比 |
| `AIDX-09` | Evidence Screenshot / 证据截图 |
| `AIDX-10` | Closing Request / 决策请求 |

## 文件结构

```text
aidx-ppt-skill/
├── SKILL.md
├── README.md
├── README.en.md
├── assets/
│   ├── template-aidx.html
│   ├── motion.min.js
│   └── readme/
│       ├── aidx-cover.webp
│       └── aidx-executive-summary.webp
├── examples/
│   ├── README.md
│   └── aidx-showcase.html
├── scripts/
│   ├── build-aidx-examples.mjs
│   └── validate-aidx-deck.mjs
└── references/
    ├── checklist.md
    ├── components.md
    ├── image-prompts.md
    ├── layouts-aidx.md
    ├── screenshot-framing.md
    └── themes-aidx.md
```

## 开发与校验

重新生成示例:

```bash
node scripts/build-aidx-examples.mjs
```

校验任意 AIDX deck:

```bash
node scripts/validate-aidx-deck.mjs examples/aidx-showcase.html
```

旧模板残留检查已经内置在 AIDX 校验器中;提交前运行校验即可。

## License

本项目使用 [GNU Affero General Public License v3.0](./LICENSE)。
