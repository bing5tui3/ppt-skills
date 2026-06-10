# AIDX 主题规范

AIDX 是内部专用高层汇报风格。它服务于 AI 科技高层汇报,不是通用科技模板。

核心气质:深色指挥台、终端质感、银行级克制、结论优先。

---

## 使用方法

1. 使用 `assets/template-aidx.html`
2. 保持默认 `:root` 变量,不要自定义 hex
3. 只有在需要浅色附录、截图保真、密集表格时,页面使用 `<section class="slide light">`
4. 正文页默认使用 `<section class="slide dark">`
5. 重要封面或收束页可使用 `<section class="slide blue">`

---

## 固定品牌主题

```css
--aidx-bg:#0F0F11;
--aidx-bg-deep:#0d0d1a;
--aidx-panel:#16161A;
--aidx-panel-2:#1d1d24;
--aidx-line:#242428;
--aidx-line-strong:#3a3a42;
--aidx-text:#F0F0F4;
--aidx-muted:#959597;
--aidx-helper:#828286;
--aidx-blue:#3A5ECF;
--aidx-navy:#063970;
--aidx-cyan:#5DADE2;
--aidx-purple:#2a2a4e;
--aidx-green:#98c379;
--aidx-yellow:#e6c07b;
--aidx-red:#e06c75;
--aidx-paper:#f5f7fb;
--aidx-paper-line:#d8dde8;
--aidx-paper-text:#101216;
--aidx-paper-muted:#56606f;
```

## 页面模式

| 模式 | class | 用途 |
|---|---|---|
| 深色默认 | `slide dark` | 高层汇报正文、结论、风险、路线图、架构 |
| 蓝色封面 | `slide blue` | 封面、章节开场、结尾请求决策 |
| 浅色附录 | `slide light` | 截图保真、表格、附录、审计材料 |

## 品牌露出规则

- AIDX 是主品牌,WeBank 是背书品牌。
- 封面 AIDX 主露出,WeBank 放右上或页脚背书。
- 正文页左上保留 AIDX avatar 小标或 `AIDX EXEC BRIEF`;不要使用 X 形 logo。
- 右上放密级、日期、页码、汇报对象等元信息。
- 不要每页放大 logo。正文页标识应是导航层,不是装饰层。
- avatar 可使用 `.aidx-avatar` 字母头像,或 `images/avatar.png` 这类相对路径图片并标注 `data-image-slot="aidx-brand-avatar"`。
- 不要引用 `/Users/.../brand/*.svg`。模板和页面必须保持单 HTML 可发送。

## 排版规则

- 中文为主,英文只做系统标签和短元信息。
- 大标题、结论、风险、决策项必须用中文。
- `AIDX`、`WeBank`、`EXEC BRIEF`、`DECISION`、`RISK` 等保留英文短标签。
- 不做整页中英双语,避免高层汇报过密。
- 字体使用系统 `SF Pro / Pretendard / Noto Sans SC / PingFang SC`;代码和状态标签使用 `JetBrains Mono / SF Mono`。

## 禁止事项

- 不允许自定义 hex。
- 不允许霓虹满屏、赛博装饰、发光边框堆叠。
- 不允许大面积紫蓝渐变当背景。
- 不允许把品牌 SVG 作为本机路径引用。
- 不允许用 emoji 做状态、风险或章节图标。
- 不允许正文页为了“科技感”牺牲可读性。

## 推荐节奏

8 页高层汇报建议:

| 页 | 模式 | 版式 |
|---|---|---|
| 1 | `blue` | AIDX-01 封面 |
| 2 | `dark` | AIDX-02 执行摘要 |
| 3 | `dark` | AIDX-03 关键决策 |
| 4 | `dark` | AIDX-04 KPI 指挥条 |
| 5 | `dark` | AIDX-05 路线图 |
| 6 | `dark` | AIDX-06 风险矩阵 |
| 7 | `light` | AIDX-09 证据截图 |
| 8 | `blue` | AIDX-10 结尾请求 |

如果内容是技术评审,把 AIDX-09 换成 AIDX-07 架构能力图。
