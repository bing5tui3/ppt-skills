# Layouts · AIDX

AIDX 是内部高层汇报模板。它采用 **AIDX locked mode**:正文页只能从登记版式 `AIDX-01` 到 `AIDX-10` 中选择,每页必须写 `data-layout="AIDX-xx"`。

---

## 生成前必读

### A. 固定 1600×900 舞台

每页必须是:

```html
<section class="slide dark" data-layout="AIDX-02">
  <div class="stage">
    ...
  </div>
</section>
```

不要把内容直接放在 `.slide` 下。`.stage` 是固定 1600×900 画布,模板会按浏览器窗口等比缩放。字号、栅格、截图槽位都按这个固定画布设计。

### B. 页面模式

| class | 用途 |
|---|---|
| `slide blue` | 封面、章节开场、结尾请求 |
| `slide dark` | 默认正文页 |
| `slide light` | 截图保真、附录、密集表格 |

### C. AIDX locked mode

- 不允许临时发明新 layout 名称。
- 不允许把所有页面都做成普通卡片页。
- 7-8 页 deck 至少覆盖:封面、执行摘要、关键决策、KPI、风险或路线图、证据或架构、结尾请求。
- 图片必须写 `data-image-slot`,例如 `aidx-evidence-16x10`。
- 左上角品牌标识使用 avatar,不要使用 X 形 logo;真实头像图片必须用相对路径并写 `data-image-slot`。

### D. 中文标题尺度

| 类型 | 字号类 |
|---|---|
| 封面主标题 | `.h-hero` |
| 正文页主标题 | `.h-xl` |
| 卡片或模块标题 | `.h-md` / `.panel-title` |
| 正文说明 | `.body` / `.lead` |

不要靠缩小到 12px 塞内容。放不下时删文案、拆页、换版式。

---

## 版式总览

| Layout | 用途 |
|---|---|
| AIDX-01 Cover | 封面 / 汇报入口 |
| AIDX-02 Executive Summary | 执行摘要 / 三条结论 |
| AIDX-03 Key Decision | 关键决策 / 需要拍板 |
| AIDX-04 KPI Command Strip | KPI / 进展仪表 |
| AIDX-05 Roadmap | 计划 / 阶段推进 |
| AIDX-06 Risk Matrix | 风险 / 阻塞 / 应对 |
| AIDX-07 Architecture Map | 架构 / 能力地图 |
| AIDX-08 Before After | 现状对比 / 方案对比 |
| AIDX-09 Evidence Screenshot | 截图 / 证据 / 案例 |
| AIDX-10 Closing Request | 结尾 / 决策请求 |

---

## 共用品牌头

每页左上角建议使用这个结构:

```html
<div class="brand-lockup">
  <span class="aidx-avatar" aria-hidden="true">AI</span>
  <div><strong>AIDX</strong><br><span>Executive Brief</span></div>
</div>
```

如果要使用真实头像,保留 `.aidx-avatar` 包裹并替换为图片:

```html
<span class="aidx-avatar">
  <img src="images/avatar.png" data-image-slot="aidx-brand-avatar" alt="汇报人头像">
</span>
```

右上角用:

```html
<div class="deck-meta">
  <span>CONFIDENTIAL</span><span class="meta-rule"></span><b>WeBank</b>
</div>
```

---

## AIDX-01 Cover

```html
<section class="slide blue" data-layout="AIDX-01">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>Executive Brief</span></div>
      </div>
      <div class="deck-meta"><span>CONFIDENTIAL</span><span class="meta-rule"></span><b>WeBank</b></div>
    </div>
    <div class="stage-body" style="justify-content:center">
      <div class="kicker" data-anim>AI Developer Experience</div>
      <h1 class="h-hero" data-anim>[必填] AI 工程效能高层汇报</h1>
      <p class="lead" style="margin-top:28px" data-anim>[必填] 用一句话说明本次汇报要解决的问题、决策对象和影响范围。</p>
      <div class="kpi-strip" style="margin-top:54px" data-anim>
        <div class="kpi"><div class="kpi-label">Scope</div><div class="kpi-nb">12<span class="unit">teams</span></div><div class="kpi-note">覆盖范围</div></div>
        <div class="kpi"><div class="kpi-label">Cycle</div><div class="kpi-nb">Q3</div><div class="kpi-note">推进周期</div></div>
        <div class="kpi"><div class="kpi-label">Impact</div><div class="kpi-nb">30<span class="unit">%</span></div><div class="kpi-note">目标改善</div></div>
        <div class="kpi"><div class="kpi-label">Ask</div><div class="kpi-nb">3</div><div class="kpi-note">需决策事项</div></div>
      </div>
    </div>
    <div class="foot"><span>汇报人 · 日期</span><span>01 / 08</span></div>
  </div>
</section>
```

## AIDX-02 Executive Summary

```html
<section class="slide dark" data-layout="AIDX-02">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>Executive Brief</span></div>
      </div>
      <div class="deck-meta"><span>EXEC SUMMARY</span><span class="meta-rule"></span><b>02 / 08</b></div>
    </div>
    <div class="stage-body">
      <div class="kicker" data-anim>结论先行</div>
      <h2 class="h-xl" data-anim>[必填] 当前最重要的三件事</h2>
      <div class="decision-grid" style="margin-top:44px" data-anim>
        <div class="panel accent decision-item">
          <div class="decision-number">01</div>
          <div class="decision-title">[必填] 结论一</div>
          <p class="decision-desc">说明业务影响、当前状态和为什么现在需要关注。</p>
        </div>
        <div class="panel decision-item">
          <div class="decision-number">02</div>
          <div class="decision-title">[必填] 结论二</div>
          <p class="decision-desc">说明关键进展、阻塞点或资源需求。</p>
        </div>
        <div class="panel decision-item">
          <div class="decision-number">03</div>
          <div class="decision-title">[必填] 结论三</div>
          <p class="decision-desc">说明下一步动作和预期收益。</p>
        </div>
      </div>
    </div>
    <div class="foot"><span>Executive Summary</span><span>AIDX</span></div>
  </div>
</section>
```

## AIDX-03 Key Decision

```html
<section class="slide dark" data-layout="AIDX-03">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>Decision</span></div>
      </div>
      <div class="deck-meta"><span>DECISION REQUIRED</span><span class="meta-rule"></span><b>03 / 08</b></div>
    </div>
    <div class="stage-body split">
      <div class="stack-lg" data-anim>
        <div>
          <div class="kicker">需要拍板</div>
          <h2 class="h-xl">[必填] 是否启动下一阶段规模化试点</h2>
        </div>
        <p class="lead">用一段话说明这项决策的边界、受影响团队、资源投入和错过窗口的代价。</p>
      </div>
      <div class="stack" data-anim>
        <div class="panel accent">
          <div class="panel-label">Recommendation</div>
          <div class="h-md">建议批准方案 A</div>
          <p class="body" style="margin-top:14px">说明推荐方案的核心理由。</p>
        </div>
        <div class="panel">
          <div class="panel-label">Tradeoff</div>
          <p class="body">列出需要接受的代价、依赖和风险缓释条件。</p>
        </div>
        <div class="panel cyan">
          <div class="panel-label">Next Step</div>
          <p class="body">明确批准后的 2-4 周动作。</p>
        </div>
      </div>
    </div>
    <div class="foot"><span>Decision Gate</span><span>CONFIDENTIAL</span></div>
  </div>
</section>
```

## AIDX-04 KPI Command Strip

```html
<section class="slide dark" data-layout="AIDX-04">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>KPI</span></div>
      </div>
      <div class="deck-meta"><span>PROGRESS SIGNALS</span><span class="meta-rule"></span><b>04 / 08</b></div>
    </div>
    <div class="stage-body">
      <div class="kicker" data-anim>关键指标</div>
      <h2 class="h-xl" data-anim>[必填] 效能改善已经进入可度量阶段</h2>
      <div class="kpi-strip" style="margin-top:42px" data-anim>
        <div class="kpi"><div class="kpi-label">Adoption</div><div class="kpi-nb">68<span class="unit">%</span></div><div class="kpi-note">核心团队使用率</div></div>
        <div class="kpi"><div class="kpi-label">Lead Time</div><div class="kpi-nb">-24<span class="unit">%</span></div><div class="kpi-note">需求交付周期</div></div>
        <div class="kpi"><div class="kpi-label">Quality</div><div class="kpi-nb">+18<span class="unit">%</span></div><div class="kpi-note">一次通过率</div></div>
        <div class="kpi"><div class="kpi-label">Risk</div><div class="kpi-nb">2</div><div class="kpi-note">待处理阻塞</div></div>
      </div>
      <div class="panel soft" style="margin-top:30px" data-anim>
        <div class="bar-list">
          <div class="bar-row"><span>Platform</span><div class="bar-track"><div class="bar-fill cyan" style="width:76%"></div></div><span>76%</span></div>
          <div class="bar-row"><span>Toolchain</span><div class="bar-track"><div class="bar-fill" style="width:62%"></div></div><span>62%</span></div>
          <div class="bar-row"><span>Governance</span><div class="bar-track"><div class="bar-fill green" style="width:54%"></div></div><span>54%</span></div>
        </div>
      </div>
    </div>
    <div class="foot"><span>KPI Command Strip</span><span>AIDX</span></div>
  </div>
</section>
```

## AIDX-05 Roadmap

```html
<section class="slide dark" data-layout="AIDX-05">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>Roadmap</span></div>
      </div>
      <div class="deck-meta"><span>Q3 EXECUTION</span><span class="meta-rule"></span><b>05 / 08</b></div>
    </div>
    <div class="stage-body">
      <div class="kicker" data-anim>推进节奏</div>
      <h2 class="h-xl" data-anim>[必填] 从试点到规模化的四段路径</h2>
      <div class="roadmap" style="margin-top:42px" data-anim>
        <div class="roadmap-step done"><span class="status ok">Done</span><h3>阶段一</h3><p>已完成的能力、团队和验证结果。</p></div>
        <div class="roadmap-step"><span class="status info">Now</span><h3>阶段二</h3><p>当前进行中的任务和依赖。</p></div>
        <div class="roadmap-step"><span class="status warn">Next</span><h3>阶段三</h3><p>需要资源或跨团队协同的部分。</p></div>
        <div class="roadmap-step risk"><span class="status risk">Risk</span><h3>阶段四</h3><p>规模化前必须解除的阻塞。</p></div>
      </div>
    </div>
    <div class="foot"><span>Roadmap</span><span>CONFIDENTIAL</span></div>
  </div>
</section>
```

## AIDX-06 Risk Matrix

```html
<section class="slide dark" data-layout="AIDX-06">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>Risk</span></div>
      </div>
      <div class="deck-meta"><span>RISK REVIEW</span><span class="meta-rule"></span><b>06 / 08</b></div>
    </div>
    <div class="stage-body split reverse">
      <div class="risk-matrix" data-anim>
        <div class="panel risk risk-card"><span class="status risk">High</span><div class="score">R1</div><p class="body">[必填] 高风险事项和影响面。</p></div>
        <div class="panel risk-card"><span class="status warn">Medium</span><div class="score">R2</div><p class="body">[必填] 中风险事项和缓释动作。</p></div>
        <div class="panel risk-card"><span class="status warn">Medium</span><div class="score">R3</div><p class="body">[必填] 中风险事项和 owner。</p></div>
        <div class="panel cyan risk-card"><span class="status info">Watch</span><div class="score">R4</div><p class="body">[必填] 需要持续观察的信号。</p></div>
      </div>
      <div class="stack-lg" data-anim>
        <div>
          <div class="kicker">风险与缓释</div>
          <h2 class="h-xl">[必填] 两个阻塞需要管理层介入</h2>
        </div>
        <p class="lead">左侧只放真实阻塞,右侧说明需要谁介入、何时完成、如果不处理的代价。</p>
      </div>
    </div>
    <div class="foot"><span>Risk Matrix</span><span>AIDX</span></div>
  </div>
</section>
```

## AIDX-07 Architecture Map

```html
<section class="slide dark" data-layout="AIDX-07">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>Architecture</span></div>
      </div>
      <div class="deck-meta"><span>CAPABILITY MAP</span><span class="meta-rule"></span><b>07 / 08</b></div>
    </div>
    <div class="stage-body">
      <div class="kicker" data-anim>能力地图</div>
      <h2 class="h-xl" data-anim>[必填] AIDX 能力栈支撑三类工程场景</h2>
      <div class="arch-map" style="margin-top:36px" data-anim>
        <div class="arch-layer">
          <div class="arch-label">Experience</div>
          <div class="arch-cells"><div class="arch-cell">IDE Assistant</div><div class="arch-cell">Code Review</div><div class="arch-cell">Docs QA</div><div class="arch-cell">Issue Triage</div></div>
        </div>
        <div class="arch-layer">
          <div class="arch-label">Platform</div>
          <div class="arch-cells"><div class="arch-cell">Agent Runtime</div><div class="arch-cell">Tool Gateway</div><div class="arch-cell">Eval Harness</div><div class="arch-cell">Policy Guard</div></div>
        </div>
        <div class="arch-layer">
          <div class="arch-label">Foundation</div>
          <div class="arch-cells"><div class="arch-cell">Model Access</div><div class="arch-cell">Knowledge Base</div><div class="arch-cell">Audit Log</div><div class="arch-cell">Security</div></div>
        </div>
      </div>
    </div>
    <div class="foot"><span>Architecture Map</span><span>CONFIDENTIAL</span></div>
  </div>
</section>
```

## AIDX-08 Before After

```html
<section class="slide dark" data-layout="AIDX-08">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>Compare</span></div>
      </div>
      <div class="deck-meta"><span>BEFORE / AFTER</span><span class="meta-rule"></span><b>08 / 08</b></div>
    </div>
    <div class="stage-body">
      <div class="kicker" data-anim>对比判断</div>
      <h2 class="h-xl" data-anim>[必填] 新模式解决了旧流程的三个断点</h2>
      <div class="compare" style="margin-top:38px" data-anim>
        <div class="panel">
          <div class="panel-label">Before</div>
          <div class="h-md">旧模式</div>
          <div class="compare-list">
            <div class="compare-row">上下文散落在文档、IM 和代码仓库。</div>
            <div class="compare-row">评审质量依赖个人经验。</div>
            <div class="compare-row">风险发现太晚,返工成本高。</div>
          </div>
        </div>
        <div class="panel accent">
          <div class="panel-label">After</div>
          <div class="h-md">AIDX 模式</div>
          <div class="compare-list">
            <div class="compare-row">上下文进入统一工作流。</div>
            <div class="compare-row">AI 辅助检查标准化。</div>
            <div class="compare-row">风险前置到需求和代码阶段。</div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot"><span>Before After</span><span>AIDX</span></div>
  </div>
</section>
```

## AIDX-09 Evidence Screenshot

```html
<section class="slide light" data-layout="AIDX-09">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>Evidence</span></div>
      </div>
      <div class="deck-meta"><span>SCREENSHOT</span><span class="meta-rule"></span><b>09 / 10</b></div>
    </div>
    <div class="stage-body split">
      <div class="stack-lg" data-anim>
        <div>
          <div class="kicker">证据页</div>
          <h2 class="h-xl">[必填] 真实工作流已经跑通</h2>
        </div>
        <p class="lead">这里解释截图证明了什么,不要复述截图里的每个按钮。高层只需要知道证据、影响和下一步。</p>
        <div class="panel light">
          <div class="panel-label">What to look at</div>
          <p class="body">指出截图中的关键区域、指标或状态。</p>
        </div>
      </div>
      <div data-anim>
        <figure class="frame-img r-16x10 fit-contain">
          <img src="images/09-evidence.png" data-image-slot="aidx-evidence-16x10" alt="[必填] AIDX 工作流截图">
        </figure>
        <figcaption class="img-cap">Evidence screenshot · replace image path</figcaption>
      </div>
    </div>
    <div class="foot"><span>Evidence</span><span>CONFIDENTIAL</span></div>
  </div>
</section>
```

## AIDX-10 Closing Request

```html
<section class="slide blue" data-layout="AIDX-10">
  <div class="stage">
    <div class="chrome">
      <div class="brand-lockup">
        <span class="aidx-avatar" aria-hidden="true">AI</span>
        <div><strong>AIDX</strong><br><span>Executive Brief</span></div>
      </div>
      <div class="deck-meta"><span>DECISION REQUEST</span><span class="meta-rule"></span><b>WeBank</b></div>
    </div>
    <div class="stage-body split">
      <div class="stack-lg" style="justify-content:center" data-anim>
        <div>
          <div class="kicker">结尾请求</div>
          <h2 class="h-hero">[必填] 请批准下一阶段规模化试点</h2>
        </div>
      </div>
      <div class="stack" style="justify-content:center" data-anim>
        <div class="panel accent"><div class="panel-label">Ask 01</div><p class="body">[必填] 资源或范围决策。</p></div>
        <div class="panel"><div class="panel-label">Ask 02</div><p class="body">[必填] 跨部门协同或治理决策。</p></div>
        <div class="panel cyan"><div class="panel-label">Ask 03</div><p class="body">[必填] 时间窗口和验收口径。</p></div>
      </div>
    </div>
    <div class="foot"><span>AIDX · WeBank</span><span>Closing</span></div>
  </div>
</section>
```

---

## 生成后检查

运行:

```bash
node scripts/validate-aidx-deck.mjs path/to/index.html
```

重点确认:

- 每页都有 `data-layout="AIDX-xx"`。
- 每页都有 `.stage`。
- 没有 `/Users/...` 或 `file://` 路径。
- 本地图片都有 `data-image-slot`。
- 没有 emoji。
- 没有把正文塞成小于 14px。
- 7 页以上至少包含一个决策页和一个风险/路线图页。
