> English version: [README.en.md](./README.en.md)

`aidx-ppt-skill` 是一个适配 Claude Code / Codex 等 Agent 环境的网页 PPT skill,用于生成 **AIDX / WeBank 内部管理同步风格**的单文件 HTML 横向翻页 deck、PPT 配图和多平台封面。

当前模板是 **AIDX**:使用 `S01-S22` 登记版式结构、AIDX Color System v1.0.0、浅底渐变版 `avatar-terminal` 品牌头像、AIDX + WeBank 页眉页脚和轻量网格。

## 效果展示

**AIDX Cover**

![AIDX cover preview](./assets/readme/aidx-cover.png)

**AIDX Summary Page**

![AIDX summary preview](./assets/readme/aidx-summary.png)

样例: [AIDX Showcase](./examples/aidx-showcase.html)、[Governance Review](./examples/aidx-governance-review.html)、[Product Evidence](./examples/aidx-product-evidence.html) - 覆盖管理同步、治理周报、产品证据复盘等场景。

## 30 秒开始

```bash
npx skills add https://github.com/bing5tui3/ppt-skills --skill aidx-ppt-skill
```

安装后直接对 Agent 说:

```text
帮我基于这份材料做一份 AIDX 管理同步 PPT,控制在 8-10 页,需要执行摘要、风险、路线图和结尾决策请求。
```

也可以试这些请求:

```text
把这份工程效能复盘做成 AIDX 管理层汇报。
把这张产品截图适配成 S22 的 21:9 证据图。
基于这份汇报的核心结论,生成一张公众号 21:9 封面。
```

## 你能得到什么

- **AIDX 单一视觉系统**:白底浅色、轻量网格、AIDX blue/navy、银行级克制
- **品牌语义色**:Core Navy 负责身份、Action Blue 负责行动、Signal Cyan 只用于 AI 信号
- **状态与图表规范**:成功、警告、风险、信息、AI 状态强制语义映射;分类图最多八色
- **22 个登记版式**:`S01-S22`,覆盖封面、时间线、KPI、对比、系统图、证据图、结尾请求
- **AIDX 品牌锁定**:内联正式浅底渐变版 `avatar-terminal.svg`,页眉 AIDX,页脚或 meta 使用 `AIDX · WeBank`
- **横向左右翻页**:键盘 ← → / 滚轮 / 触屏滑动 / 底部圆点 / ESC 索引
- **低性能静态模式**:按 `B` 可关闭 canvas 动画
- **单文件 HTML**:不需要构建、不需要服务器,浏览器直接打开
- **AIDX 校验器**:检查 `Sxx`、`.canvas-card`、品牌色快照、状态语义、图片槽位、本机路径和结构一致性

## 适合 / 不适合

**合适**:AIDX / WeBank 内部管理同步、AI 科技管理层进展同步、工程效能汇报、研发平台治理、资源申请、风险升级、路线图复盘。

**不合适**:大段表格培训课件、需要多人协作编辑的原生 PPT、无 AIDX / WeBank 语境的公开营销页。

## 常见使用场景

| 任务 | 推荐方式 |
|------|---------|
| 管理层进展汇报 | 用 `S03/S18` 写核心结论,再用 KPI、风险和路线图支撑 |
| 资源申请 / 范围批准 | 用 `S08` 表达取舍,用 `S10` 收束请求 |
| 工程效能复盘 | 用 `S06/S20` 展示指标,用 `S11` 展示路线图 |
| 架构 / 能力地图 | 用 `S17` 或 `S14`,只保留管理层需要理解的层级 |
| 产品或工作流截图 | 用 `S22` 21:9 证据主图或 16:10 保真截图槽位 |
| 多平台封面 | 从同一份内容生成公众号、分享卡、小红书、视频号封面 |

## 使用流程

1. **澄清目标**:汇报对象、决策请求、页数、素材、敏感信息。
2. **复制模板**:`assets/template-aidx.html` 到目标目录 `ppt/index.html`。
3. **读取规则**:`themes-aidx.md`、`layouts-aidx.md`、`checklist.md`。
4. **规划版式**:从 `S01-S22` 中选择,8 页以上至少使用 6 个不同 Sxx。
5. **填充内容**:标题写结论,KPI 写口径,风险写 owner 和缓释动作。
6. **处理图片**:所有本地图片放入 `images/`,写 `data-image-slot`;S22 使用 `s22-hero-21x9`。
7. **运行校验**:`node scripts/validate-aidx-deck.mjs path/to/index.html`。
8. **浏览器预览**:检查翻页、低功耗模式、证据槽位和文字溢出。

## AIDX 版式

| 范围 | 用途 |
|---|---|
| `S01-S03` | 封面、结论、强陈述 |
| `S04-S08` | 六格、三层、KPI 塔、条形图、双轨对照 |
| `S09-S12` | 点阵宣言、结尾、横向时间线、章节收束 |
| `S13-S18` | 三力卡、闭环、矩阵、微卡、系统图、Why Now |
| `S19-S22` | 四卡、KPI 账单、规格说明、证据图主视觉 |

## 文件结构

```text
aidx-ppt-skill/
├── SKILL.md
├── assets/template-aidx.html
├── examples/
│   ├── aidx-showcase.html
│   ├── aidx-governance-review.html
│   └── aidx-product-evidence.html
├── scripts/
│   ├── build-aidx-examples.mjs
│   └── validate-aidx-deck.mjs
└── references/
    ├── aidx-colors.json
    ├── checklist.md
    ├── components.md
    ├── image-prompts.md
    ├── layouts-aidx.md
    ├── screenshot-framing.md
    └── themes-aidx.md
```

## 开发与校验

重新生成全部示例:

```bash
node scripts/build-aidx-examples.mjs
```

校验模板颜色是否与品牌快照一致:

```bash
node scripts/validate-aidx-deck.mjs assets/template-aidx.html --template
```

校验全部示例:

```bash
for f in examples/*.html; do node scripts/validate-aidx-deck.mjs "$f"; done
```

## License

本项目使用 [GNU Affero General Public License v3.0](./LICENSE)。
