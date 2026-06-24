#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = resolve(repoRoot, 'assets/template-aidx.html');

const AVATAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path d="M 24 4 C 40 4 44 12 44 22 C 44 28 43 33 42 37 C 41 41 39 42 36 40 C 33 38 31 34 30 28 C 29 22 31 18 36 18 C 34 14 30 16 24 16 C 18 16 14 14 12 18 C 17 18 19 22 18 28 C 17 34 15 38 12 40 C 9 42 7 41 6 37 C 5 33 4 28 4 22 C 4 12 8 4 24 4 Z" fill="#3A5ECF" stroke="#3A5ECF" stroke-width="5" stroke-linejoin="round"/>
  <ellipse cx="24" cy="24" rx="14" ry="15" fill="#3A5ECF" stroke="#3A5ECF" stroke-width="5"/>
  <path d="M 24 4 C 40 4 44 12 44 22 C 44 28 43 33 42 37 C 41 41 39 42 36 40 C 33 38 31 34 30 28 C 29 22 31 18 36 18 C 34 14 30 16 24 16 C 18 16 14 14 12 18 C 17 18 19 22 18 28 C 17 34 15 38 12 40 C 9 42 7 41 6 37 C 5 33 4 28 4 22 C 4 12 8 4 24 4 Z" fill="#063970"/>
  <ellipse cx="24" cy="24" rx="14" ry="15" fill="white"/>
  <path d="M 24 4 C 40 4 44 12 44 22 C 38 20 32 16 24 16 C 16 16 10 20 4 22 C 4 12 8 4 24 4 Z" fill="#063970"/>
  <path d="M 14 22 C 15 16 19 13 24 13 C 29 13 33 15 35 19 C 31 18 27 17.5 24 18 C 20 18.5 16 20 14 22 Z" fill="#063970"/>
  <polyline points="16,25 21,28.5 16,32" fill="none" stroke="#063970" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="29" y1="28.5" x2="35" y2="28.5" stroke="#063970" stroke-width="2.8" stroke-linecap="round"/>
</svg>`;

function brandChrome(page, section = 'AIDX REVIEW', total = '10') {
  return `<header class="chrome-min brand-chrome">
    <div class="l"><span class="aidx-brand"><span class="aidx-avatar-mark" aria-hidden="true">${AVATAR}</span><span class="aidx-brand-copy"><span class="aidx-brand-title">AIDX</span><span class="aidx-brand-subtitle">AIDX Review</span></span></span></div>
    <div class="r brand-meta"><span>${section}</span><span class="brand-rule"></span><b>WeBank</b><span>${page} / ${total}</span></div>
  </header>`;
}

function footer(left, right = '<b>AIDX</b> · WeBank') {
  return `<footer class="aidx-footer"><span>${left}</span><span>${right}</span></footer>`;
}

function writeDeck(relativePath, title, slidesHtml) {
  const template = readFileSync(templatePath, 'utf8');
  const output = template
    .replace('[必填] 填写 PPT 标题 · AIDX Review', title)
    .replace(/<!-- SLIDES_HERE[\s\S]*?-->/, slidesHtml);

  if (/\[必填\]|data-layout="AIDX-|class="[^"]*\bstage\b/.test(output)) {
    throw new Error(`${relativePath} contains unresolved placeholders or unsupported AIDX layout markers.`);
  }

  const outputPath = resolve(repoRoot, relativePath);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, output);
  console.log(`Wrote ${outputPath}`);
}

const slides = [
`<section class="slide accent" data-layout="S01" data-animate="cover-reveal">
  <div class="canvas-card">
    ${brandChrome('01', 'CONFIDENTIAL')}
    <div style="flex:1;display:grid;grid-template-rows:auto 1fr auto;gap:4vh">
      <div class="t-meta" data-anim="up">AI Developer Experience · Registered Layouts</div>
      <div data-anim="up" style="align-self:center;display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);gap:5vw;align-items:end">
        <h1 class="h-hero-zh" style="font-size:min(7.8vw,13vh);line-height:1.02;color:var(--text-primary)">AIDX<br>工程效能<br>管理同步</h1>
        <div style="display:flex;flex-direction:column;gap:2vh;border-left:1px solid var(--border-subtle);padding-left:3vw">
          <p class="lead" style="color:var(--text-secondary);max-width:34ch">使用 S01-S22 结构、AIDX 浅色品牌、avatar-terminal 与 WeBank 背书。</p>
          <div class="meta-row"><span>10 Slides</span><span class="dot"></span><span>S01-S22</span><span class="dot"></span><span>Light System</span></div>
        </div>
      </div>
      ${footer('AIDX Showcase')}
    </div>
  </div>
</section>`,

`<section class="slide" data-layout="S02" data-animate="timeline-vertical">
  <div class="canvas-card">
    ${brandChrome('02', 'EXEC SUMMARY')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">结论先行</div>
      <h2 class="h-xl-zh" style="font-size:min(5.2vw,9.2vh)">试点价值成立,下一步取决于治理闭环</h2>
    </div>
    <div class="timeline-v" data-anim="up">
      <div class="tl-node"><span class="dot"></span><span class="yr">Phase 01</span><span class="multi">3<span class="unit">域</span></span><p class="desc">完成核心研发域试点,沉淀效率、质量和审计基线。</p></div>
      <div class="tl-node accent"><span class="dot"></span><span class="yr">Phase 02</span><span class="multi">9<span class="unit">域</span></span><p class="desc">建议扩大到核心研发域,用统一入口和统一指标推进。</p></div>
      <div class="tl-node"><span class="dot"></span><span class="yr">Phase 03</span><span class="multi">12<span class="unit">周</span></span><p class="desc">每两周同步进展、成本、风险和治理动作。</p></div>
    </div>
    <div class="kpi-row-4" data-anim="up">
      <div class="kpi-cell"><div class="lbl">Adoption</div><div class="nb">72<span class="unit">%</span></div><div class="note">试点团队周活</div></div>
      <div class="kpi-cell"><div class="lbl">Lead Time</div><div class="nb">-21<span class="unit">%</span></div><div class="note">需求到合并周期</div></div>
      <div class="kpi-cell"><div class="lbl">Quality</div><div class="nb">+31<span class="unit">%</span></div><div class="note">一次评审通过率</div></div>
      <div class="kpi-cell"><div class="lbl">Ask</div><div class="nb">3</div><div class="note">需要确认事项</div></div>
    </div>
  </div>
</section>`,

`<section class="slide split" data-layout="S03" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="justify-content:space-between">
        ${brandChrome('03', 'DECISION').replace('chrome-min brand-chrome', 'chrome-min brand-chrome tight')}
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh">
          <div class="t-cat accent">需要拍板</div>
          <h2 class="h-xl-zh" style="font-size:min(5.8vw,10vh)">是否启动<br>规模化试点</h2>
        </div>
        ${footer('Recommendation')}
      </div>
      <div class="half" style="justify-content:space-between">
        <div class="t-meta">Recommendation · Tradeoff · Next Step</div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:2.4vh">
          <article class="card-fill" style="padding:2.6vh 2vw"><div class="t-cat accent">Recommendation</div><h3 class="h-md">批准 9 个核心研发域进入 12 周试点</h3></article>
          <article class="card-fill" style="padding:2.6vh 2vw"><div class="t-cat">Tradeoff</div><p class="body">短期收敛自定义空间,换取统一工具入口、数据边界和审计责任。</p></article>
          <article class="card-accent" style="padding:2.6vh 2vw"><div class="t-cat on-dark">Next</div><p class="body" style="color:var(--accent-on)">两周内确认团队名单、权限矩阵、验收指标和治理看板。</p></article>
        </div>
        <div class="t-meta">AIDX · WeBank</div>
      </div>
    </div>
  </div>
</section>`,

`<section class="slide" data-layout="S06" data-animate="tower-grow">
  <div class="canvas-card">
    ${brandChrome('04', 'KPI')}
    <div style="display:grid;grid-template-columns:5fr 7fr;gap:4vw;align-items:end;flex:1">
      <div data-anim="up" style="display:flex;flex-direction:column;gap:2vh;align-self:start">
        <div class="t-cat accent">关键指标</div>
        <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">效能改善已经进入可度量阶段</h2>
        <p class="lead" style="color:var(--text-secondary)">四项指标分别覆盖采用、周期、质量和治理阻塞,用于判断是否具备扩域条件。</p>
      </div>
      <div class="bar-towers" data-anim="up">
        <div class="bar-tower"><div class="cap"></div><div class="body-block h-3"><div class="lbl">Adoption</div><div class="nb">72<span class="unit">%</span></div><div class="sub">周活使用率</div></div></div>
        <div class="bar-tower"><div class="cap"></div><div class="body-block h-2"><div class="lbl">Lead Time</div><div class="nb">-21<span class="unit">%</span></div><div class="sub">交付周期</div></div></div>
        <div class="bar-tower"><div class="cap"></div><div class="body-block h-4 b-accent"><div class="lbl">Quality</div><div class="nb">+31<span class="unit">%</span></div><div class="sub">一次通过率</div></div></div>
        <div class="bar-tower"><div class="cap"></div><div class="body-block h-1"><div class="lbl">Risk</div><div class="nb">2</div><div class="sub">管理层介入</div></div></div>
      </div>
    </div>
    ${footer('KPI Tower')}
  </div>
</section>`,

`<section class="slide grey" data-layout="S08" data-animate="duo-mirror">
  <div class="canvas-card">
    ${brandChrome('05', 'COMPARE')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">方案对比</div>
      <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">AIDX 模式聚焦流程协同的三个断点</h2>
    </div>
    <div class="duo-compare" data-anim="up">
      <div class="col"><div class="col-tag"><span class="num">01</span>Before</div><div class="col-ttl">旧工程协作</div><p class="col-desc">上下文散落在需求、IM、文档和代码仓库,风险发现依赖个人经验。</p><ul class="col-list"><li>评审质量不可复制</li><li>风险后置,返工成本高</li><li>审计链路不完整</li></ul></div>
      <span class="vrule"></span>
      <div class="col accent"><div class="col-tag"><span class="num">02</span>After</div><div class="col-ttl">AIDX 工程模式</div><p class="col-desc">上下文进入统一工作流,AI 检查前置,人工复核和审计记录形成闭环。</p><ul class="col-list"><li>评审口径标准化</li><li>风险前置到需求和代码阶段</li><li>治理看板可追踪</li></ul></div>
    </div>
    ${footer('Before / After')}
  </div>
</section>`,

`<section class="slide" data-layout="S11" data-animate="timeline-walk">
  <div class="canvas-card">
    ${brandChrome('06', 'ROADMAP')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">推进节奏</div>
      <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">从试点到规模化的五段路径</h2>
    </div>
    <div class="timeline-h" data-anim="up">
      <div class="tl-row">
        <div class="th-node up"><span class="dot"></span><span class="label"><span class="yr">W01</span><span class="name">名单确认</span><span class="desc">团队、场景、权限</span></span></div>
        <div class="th-node down"><span class="dot"></span><span class="label"><span class="yr">W02</span><span class="name">入口统一</span><span class="desc">工具链与审计</span></span></div>
        <div class="th-node up accent"><span class="dot"></span><span class="label"><span class="yr">W04</span><span class="name">扩域试点</span><span class="desc">9 个研发域</span></span></div>
        <div class="th-node down"><span class="dot"></span><span class="label"><span class="yr">W08</span><span class="name">风险复盘</span><span class="desc">模型、成本、质量</span></span></div>
        <div class="th-node up"><span class="dot"></span><span class="label"><span class="yr">W12</span><span class="name">验收决策</span><span class="desc">是否常态化</span></span></div>
      </div>
    </div>
    ${footer('Roadmap')}
  </div>
</section>`,

`<section class="slide" data-layout="S17" data-animate="system-diagram">
  <div class="canvas-card">
    ${brandChrome('07', 'ARCHITECTURE')}
    <div style="display:grid;grid-template-columns:5fr 7fr;gap:4vw;flex:1;align-items:center">
      <div data-anim="up" style="display:flex;flex-direction:column;gap:2vh">
        <div class="t-cat accent">能力地图</div>
        <h2 class="h-xl-zh" style="font-size:min(4.8vw,8.2vh)">AIDX 能力栈支撑三类工程场景</h2>
      <p class="lead" style="color:var(--text-secondary)">决策者只需要看到体验层、平台层、治理层的边界和依赖关系。</p>
      </div>
      <div data-anim="up" style="display:grid;grid-template-rows:repeat(3,1fr);gap:1.6vh">
        <div class="card-fill" style="padding:2.2vh 2vw;display:grid;grid-template-columns:10em 1fr;gap:1vw;align-items:center"><div class="t-cat accent">Experience</div><div class="body">IDE Assistant · Code Review · Docs QA · Issue Triage</div></div>
        <div class="card-fill" style="padding:2.2vh 2vw;display:grid;grid-template-columns:10em 1fr;gap:1vw;align-items:center"><div class="t-cat accent">Platform</div><div class="body">Agent Runtime · Tool Gateway · Eval Harness · Policy Guard</div></div>
        <div class="card-accent" style="padding:2.2vh 2vw;display:grid;grid-template-columns:10em 1fr;gap:1vw;align-items:center"><div class="t-cat on-dark">Governance</div><div class="body" style="color:var(--accent-on)">Model Access · Knowledge Base · Audit Log · Security Boundary</div></div>
      </div>
    </div>
    ${footer('Capability Map')}
  </div>
</section>`,

`<section class="slide grey" data-layout="S20" data-animate="stacked-ledger">
  <div class="canvas-card">
    ${brandChrome('08', 'RISK LEDGER')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">风险账单</div>
      <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">两个阻塞需要管理层介入</h2>
    </div>
    <div data-anim="up" style="display:flex;flex-direction:column;margin-top:4vh;border-top:1px solid var(--border-subtle)">
      ${['数据边界未统一|影响审计链路完整性|Owner: 平台治理','工具入口分散|影响规模化运营效率|Owner: 工程平台','模型波动可控|需要回退机制和质量阈值|Owner: AIDX','成本进入观察区|纳入月度经营视图|Owner: 财务/平台'].map((row, i) => {
        const [a, b, c] = row.split('|');
        return `<div class="ledger-row" style="display:grid;grid-template-columns:7em 1fr 18em;gap:2vw;align-items:center;padding:2.2vh 0;border-bottom:1px solid var(--border-subtle)"><div class="ledger-num" style="font-family:var(--sans);font-weight:200;font-size:min(5vw,8vh);letter-spacing:-.04em;color:${i < 2 ? 'var(--accent)' : 'var(--ink)'}">R${i + 1}</div><div><div class="h-md">${a}</div><p class="body" style="color:var(--text-secondary);margin-top:.8vh">${b}</p></div><div class="t-meta">${c}</div></div>`;
      }).join('\n      ')}
    </div>
    ${footer('Risk Ledger')}
  </div>
</section>`,

`<section class="slide" data-layout="S22" data-animate="image-hero">
  <div class="canvas-card" style="padding:0;display:flex;flex-direction:column;overflow:hidden">
    <div data-anim="img" style="position:relative;flex:0 0 60%;overflow:hidden;background:var(--grey-1)" data-image-slot="s22-hero-21x9">
      <div class="frame-img r-21x9" data-image-slot="s22-hero-21x9" style="height:100%;max-height:none;background:linear-gradient(90deg,#ffffff,#eef6ff);display:grid;grid-template-columns:repeat(12,1fr);gap:1px;padding:4vh 5vw">
        ${Array.from({ length: 12 }, (_, i) => `<div style="background:${i % 4 === 0 ? '#dbeafe' : i % 4 === 1 ? '#ffffff' : '#f5f8fc'};border-top:${i === 5 ? '4px solid var(--accent)' : '1px solid var(--border-subtle)'}"></div>`).join('')}
      </div>
      <div style="position:absolute;top:0;left:0;right:0;padding:5.6vh 5vw 0">${brandChrome('09', 'EVIDENCE')}</div>
      <div data-anim="title-block" style="position:absolute;left:5vw;top:12vh;background:var(--paper);padding:3.2vh 3.2vw;max-width:42vw;border:1px solid var(--border-subtle)">
        <div class="t-cat accent">Evidence</div>
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4.8vw,8.4vh);line-height:1;letter-spacing:-.035em;color:var(--text-primary);margin-top:1vh">真实工作流<br>已经跑通</div>
      </div>
    </div>
    <div data-anim="kpi" class="image-hero-body">
      <div style="max-width:48ch;font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.3vw);line-height:1.55;font-weight:400;color:var(--text-primary);letter-spacing:-.005em">这页展示 S22 的 21:9 证据槽位。正式汇报时使用真实工作流截图或产品证据图。</div>
      <div class="image-hero-stats" style="gap:4vw">
        <div style="display:flex;flex-direction:column;gap:.6vh"><div style="height:1px;background:var(--ink)"></div><div class="t-meta">Signal 01</div><div style="font-family:var(--sans);font-weight:200;font-size:min(4.6vw,7.6vh);line-height:.95;letter-spacing:-.04em">4</div><div style="height:1px;background:var(--border-subtle);margin-top:auto"></div><p class="body-sm">流程状态闭环</p></div>
        <div style="display:flex;flex-direction:column;gap:.6vh"><div style="height:1px;background:var(--ink)"></div><div class="t-meta">Signal 02</div><div style="font-family:var(--sans);font-weight:200;font-size:min(4.6vw,7.6vh);line-height:.95;letter-spacing:-.04em">16:10</div><div style="height:1px;background:var(--border-subtle);margin-top:auto"></div><p class="body-sm">截图适配入口</p></div>
        <div style="display:flex;flex-direction:column;gap:.6vh"><div style="height:1px;background:var(--ink)"></div><div class="t-meta">Signal 03</div><div style="font-family:var(--sans);font-weight:200;font-size:min(4.6vw,7.6vh);line-height:.95;letter-spacing:-.04em;color:var(--accent)">21:9</div><div style="height:1px;background:var(--border-subtle);margin-top:auto"></div><p class="body-sm">S22 主图槽位</p></div>
      </div>
    </div>
  </div>
</section>`,

`<section class="slide split" data-layout="S10" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="justify-content:space-between">
        ${brandChrome('10', 'CLOSING').replace('chrome-min brand-chrome', 'chrome-min brand-chrome tight')}
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh">
          <div class="t-cat accent">结尾请求</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-size:min(6.8vw,12vh);line-height:.96;letter-spacing:-.025em;font-weight:200;color:var(--text-primary)">请批准<br>下一阶段<br>规模化试点</h2>
        </div>
        <div class="t-meta">AIDX · WeBank</div>
      </div>
      <div class="half" style="justify-content:space-between">
        <div class="chrome-min"><div class="l">Decision Request</div><div class="r">03 Asks</div></div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:0">
          ${['批准 9 个核心研发域进入 12 周规模化试点','确认统一工具入口、数据边界和审计责任归属','授权每两周同步效果、风险和成本看板'].map((text, i) => `<div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.8vh 0;border-top:1px solid var(--border-subtle);${i === 2 ? 'border-bottom:2px solid var(--accent)' : ''}"><div style="font-family:var(--sans);font-weight:200;font-size:min(4.4vw,7.8vh);line-height:.9;color:${i === 2 ? 'var(--accent)' : 'var(--text-primary)'}">0${i + 1}</div><div><h3 style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(18px,1.8vw);line-height:1.2;letter-spacing:-.015em;color:${i === 2 ? 'var(--accent)' : 'var(--text-primary)'}">${text}</h3><p class="body" style="color:var(--text-secondary);margin-top:1vh">${i === 0 ? '范围与资源决策。' : i === 1 ? '治理与协同决策。' : '节奏与验收决策。'}</p></div></div>`).join('\n          ')}
        </div>
        <div class="t-meta" style="text-align:right">AIDX · WeBank</div>
      </div>
    </div>
  </div>
</section>`,
].join('\n\n');

const governanceSlides = [
`<section class="slide accent" data-layout="S01" data-animate="cover-reveal">
  <div class="canvas-card">
    ${brandChrome('01', 'GOVERNANCE', '08')}
    <div style="flex:1;display:grid;grid-template-rows:auto 1fr auto;gap:4vh">
      <div class="t-meta" data-anim="up">AI Developer Experience · Governance Review</div>
      <div data-anim="up" style="align-self:center;display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);gap:5vw;align-items:end">
        <h1 class="h-hero-zh" style="font-size:min(7.2vw,12vh);line-height:1.02;color:var(--text-primary)">AIDX<br>治理周报</h1>
        <div style="display:flex;flex-direction:column;gap:2vh;border-left:1px solid var(--border-subtle);padding-left:3vw">
          <p class="lead" style="color:var(--text-secondary);max-width:34ch">用于每周向管理层同步采用率、风险、策略变更和需要拍板的治理事项。</p>
          <div class="meta-row"><span>8 Slides</span><span class="dot"></span><span>Risk</span><span class="dot"></span><span>Governance</span></div>
        </div>
      </div>
      ${footer('Governance Review')}
    </div>
  </div>
</section>`,

`<section class="slide" data-layout="S18" data-animate="why-now">
  <div class="canvas-card">
    ${brandChrome('02', 'WHY NOW', '08')}
    <div style="display:grid;grid-template-columns:5fr 7fr;gap:4vw;align-items:end;flex:1">
      <div data-anim="up" style="display:flex;flex-direction:column;gap:2vh;align-self:start">
        <div class="t-cat accent">为什么现在</div>
        <h2 class="h-xl-zh" style="font-size:min(5.4vw,9vh)">AI 工具使用进入扩散期,治理窗口正在收窄</h2>
        <p class="lead" style="color:var(--text-secondary)">采用速度快于统一策略落地速度,需要把入口、权限、审计和成本口径收进同一套运营机制。</p>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.4vw;align-self:stretch">
        ${['入口分散|团队自行接入,体验不一致','权限边界|模型与知识访问口径不统一','成本可见|调用成本缺少业务归因'].map((item, i) => {
          const [title, body] = item.split('|');
          return `<article class="${i === 1 ? 'card-accent' : 'card-fill'}" style="padding:3vh 2vw;display:flex;flex-direction:column;justify-content:space-between"><div class="t-cat ${i === 1 ? 'on-dark' : 'accent'}">0${i + 1}</div><div><h3 class="h-md" style="${i === 1 ? 'color:var(--accent-on)' : ''}">${title}</h3><p class="body" style="margin-top:1.2vh;color:${i === 1 ? 'var(--accent-on)' : 'var(--text-secondary)'}">${body}</p></div></article>`;
        }).join('\n        ')}
      </div>
    </div>
    ${footer('Why Now')}
  </div>
</section>`,

`<section class="slide grey" data-layout="S15" data-animate="matrix-scan">
  <div class="canvas-card">
    ${brandChrome('03', 'CONTROL MATRIX', '08')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">治理矩阵</div>
      <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">四类控制点决定规模化边界</h2>
    </div>
    <div data-anim="up" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.4vw;flex:1;align-items:stretch;margin-top:3vh">
      ${['Access|谁可以用|按角色、项目、密级开通','Data|能访问什么|知识库、代码仓、工单分层','Action|能做什么|生成、修改、提交、发布分级','Audit|留下什么|提示词、输出、人工确认留痕'].map((item, i) => {
        const [label, title, body] = item.split('|');
        return `<article class="card-fill" style="padding:3vh 1.8vw;display:flex;flex-direction:column;gap:2vh;border-top:${i === 2 ? '4px solid var(--accent)' : '1px solid var(--border-subtle)'}"><div class="t-cat accent">${label}</div><h3 class="h-md">${title}</h3><p class="body" style="color:var(--text-secondary)">${body}</p><div style="margin-top:auto;height:1px;background:var(--border-subtle)"></div></article>`;
      }).join('\n      ')}
    </div>
    ${footer('Control Matrix')}
  </div>
</section>`,

`<section class="slide grey" data-layout="S20" data-animate="stacked-ledger">
  <div class="canvas-card">
    ${brandChrome('04', 'RISK LEDGER', '08')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">风险账单</div>
      <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">本周需要关闭三项治理缺口</h2>
    </div>
    <div data-anim="up" style="display:flex;flex-direction:column;margin-top:4vh;border-top:1px solid var(--border-subtle)">
      ${['高密知识误入通用空间|本周冻结新增接入,完成知识库分级|Owner: 安全治理','自动修改缺少二次确认|默认开启人工确认门禁,灰度例外流程|Owner: 工程平台','外部模型成本不可归因|按团队、项目、场景补齐成本标签|Owner: 财务/平台','提示词沉淀不成体系|纳入评测样本和复用资产池|Owner: AIDX'].map((row, i) => {
        const [a, b, c] = row.split('|');
        return `<div class="ledger-row" style="display:grid;grid-template-columns:7em 1fr 18em;gap:2vw;align-items:center;padding:2.2vh 0;border-bottom:1px solid var(--border-subtle)"><div style="font-family:var(--sans);font-weight:200;font-size:min(5vw,8vh);letter-spacing:-.04em;color:${i < 3 ? 'var(--accent)' : 'var(--ink)'}">R${i + 1}</div><div><div class="h-md">${a}</div><p class="body" style="color:var(--text-secondary);margin-top:.8vh">${b}</p></div><div class="t-meta">${c}</div></div>`;
      }).join('\n      ')}
    </div>
    ${footer('Risk Ledger')}
  </div>
</section>`,

`<section class="slide" data-layout="S11" data-animate="timeline-walk">
  <div class="canvas-card">
    ${brandChrome('05', 'ACTION PLAN', '08')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">两周动作</div>
      <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">治理闭环按四个批次推进</h2>
    </div>
    <div class="timeline-h" data-anim="up">
      <div class="tl-row">
        <div class="th-node up"><span class="dot"></span><span class="label"><span class="yr">D01</span><span class="name">冻结新增</span><span class="desc">先控高密入口</span></span></div>
        <div class="th-node down accent"><span class="dot"></span><span class="label"><span class="yr">D03</span><span class="name">补齐分级</span><span class="desc">权限与知识库映射</span></span></div>
        <div class="th-node up"><span class="dot"></span><span class="label"><span class="yr">D07</span><span class="name">上线门禁</span><span class="desc">人工确认默认开启</span></span></div>
        <div class="th-node down"><span class="dot"></span><span class="label"><span class="yr">D14</span><span class="name">周报固化</span><span class="desc">风险和成本看板</span></span></div>
      </div>
    </div>
    ${footer('Action Plan')}
  </div>
</section>`,

`<section class="slide" data-layout="S17" data-animate="system-diagram">
  <div class="canvas-card">
    ${brandChrome('06', 'GOVERNANCE STACK', '08')}
    <div style="display:grid;grid-template-columns:5fr 7fr;gap:4vw;flex:1;align-items:center">
      <div data-anim="up" style="display:flex;flex-direction:column;gap:2vh">
        <div class="t-cat accent">治理架构</div>
        <h2 class="h-xl-zh" style="font-size:min(4.8vw,8.2vh)">把治理做成默认路径,不是事后检查</h2>
        <p class="lead" style="color:var(--text-secondary)">入口、策略、评测、审计四层串联,让每一次 AI 介入都有可追踪的上下文。</p>
      </div>
      <div data-anim="up" style="display:grid;grid-template-rows:repeat(4,1fr);gap:1.2vh">
        ${['统一入口|IDE、Web、工作流统一接入','策略中心|权限、模型、知识、动作边界','评测门禁|质量阈值、红线样本、回退策略','审计看板|使用记录、风险事件、成本归因'].map((item, i) => {
          const [a, b] = item.split('|');
          return `<div class="${i === 1 ? 'card-accent' : 'card-fill'}" style="padding:2vh 2vw;display:grid;grid-template-columns:9em 1fr;gap:1vw;align-items:center"><div class="t-cat ${i === 1 ? 'on-dark' : 'accent'}">Layer 0${i + 1}</div><div><div class="h-md" style="${i === 1 ? 'color:var(--accent-on)' : ''}">${a}</div><p class="body-sm" style="color:${i === 1 ? 'var(--accent-on)' : 'var(--text-secondary)'}">${b}</p></div></div>`;
        }).join('\n        ')}
      </div>
    </div>
    ${footer('Governance Stack')}
  </div>
</section>`,

`<section class="slide" data-layout="S08" data-animate="duo-mirror">
  <div class="canvas-card">
    ${brandChrome('07', 'DECISION', '08')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">管理层取舍</div>
      <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">先收紧入口,再放大能力边界</h2>
    </div>
    <div class="duo-compare" data-anim="up">
      <div class="col"><div class="col-tag"><span class="num">01</span>Option A</div><div class="col-ttl">继续自由接入</div><p class="col-desc">短期体验灵活,但审计、成本和高密数据边界继续分散。</p><ul class="col-list"><li>团队体验差异扩大</li><li>风险发现依赖人工</li><li>治理成本后置</li></ul></div>
      <span class="vrule"></span>
      <div class="col accent"><div class="col-tag"><span class="num">02</span>Option B</div><div class="col-ttl">两周内统一入口</div><p class="col-desc">短期收敛自定义能力,换取规模化时的默认治理路径。</p><ul class="col-list"><li>统一开通和回收</li><li>高密空间先控住</li><li>成本与风险可归因</li></ul></div>
    </div>
    ${footer('Decision Tradeoff')}
  </div>
</section>`,

`<section class="slide split" data-layout="S10" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="justify-content:space-between">
        ${brandChrome('08', 'CLOSING', '08').replace('chrome-min brand-chrome', 'chrome-min brand-chrome tight')}
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh">
          <div class="t-cat accent">结尾请求</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-size:min(6.6vw,11.5vh);line-height:.96;letter-spacing:-.025em;font-weight:200;color:var(--text-primary)">请确认<br>统一入口<br>治理节奏</h2>
        </div>
        <div class="t-meta">AIDX · WeBank</div>
      </div>
      <div class="half" style="justify-content:space-between">
        <div class="chrome-min"><div class="l">Decision Request</div><div class="r">03 Asks</div></div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:0">
          ${['批准两周内完成统一入口收敛','确认高密知识库分级和访问责任人','每周固定同步风险、成本和例外清单'].map((text, i) => `<div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:3vh 0;border-top:1px solid var(--border-subtle);${i === 2 ? 'border-bottom:2px solid var(--accent)' : ''}"><div style="font-family:var(--sans);font-weight:200;font-size:min(4.2vw,7.2vh);line-height:.9;color:${i === 2 ? 'var(--accent)' : 'var(--text-primary)'}">0${i + 1}</div><div><h3 style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(18px,1.8vw);line-height:1.2;letter-spacing:-.015em;color:${i === 2 ? 'var(--accent)' : 'var(--text-primary)'}">${text}</h3><p class="body" style="color:var(--text-secondary);margin-top:1vh">${i === 0 ? '入口决策。' : i === 1 ? '责任决策。' : '节奏决策。'}</p></div></div>`).join('\n          ')}
        </div>
        <div class="t-meta" style="text-align:right">AIDX · WeBank</div>
      </div>
    </div>
  </div>
</section>`,
].join('\n\n');

const productEvidenceSlides = [
`<section class="slide accent" data-layout="S01" data-animate="cover-reveal">
  <div class="canvas-card">
    ${brandChrome('01', 'PRODUCT EVIDENCE', '08')}
    <div style="flex:1;display:grid;grid-template-rows:auto 1fr auto;gap:4vh">
      <div class="t-meta" data-anim="up">AI Developer Experience · Product Evidence</div>
      <div data-anim="up" style="align-self:center;display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);gap:5vw;align-items:end">
        <h1 class="h-hero-zh" style="font-size:min(7.2vw,12vh);line-height:1.02;color:var(--text-primary)">AIDX<br>上线复盘</h1>
        <div style="display:flex;flex-direction:column;gap:2vh;border-left:1px solid var(--border-subtle);padding-left:3vw">
          <p class="lead" style="color:var(--text-secondary);max-width:34ch">用于产品或工作流上线后,用证据截图、指标和用户信号支撑下一轮投入。</p>
          <div class="meta-row"><span>8 Slides</span><span class="dot"></span><span>Evidence</span><span class="dot"></span><span>Launch Review</span></div>
        </div>
      </div>
      ${footer('Product Evidence Review')}
    </div>
  </div>
</section>`,

`<section class="slide" data-layout="S02" data-animate="timeline-vertical">
  <div class="canvas-card">
    ${brandChrome('02', 'EXEC SUMMARY', '08')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">结论先行</div>
      <h2 class="h-xl-zh" style="font-size:min(5.2vw,9.2vh)">上线价值成立,但规模化依赖入口和证据链统一</h2>
    </div>
    <div class="timeline-v" data-anim="up">
      <div class="tl-node"><span class="dot"></span><span class="yr">Signal 01</span><span class="multi">81<span class="unit">%</span></span><p class="desc">目标用户完成首周激活,核心流程可独立跑通。</p></div>
      <div class="tl-node accent"><span class="dot"></span><span class="yr">Signal 02</span><span class="multi">4.6</span></span><p class="desc">满意度高于试点门槛,主要反馈集中在入口和模板复用。</p></div>
      <div class="tl-node"><span class="dot"></span><span class="yr">Signal 03</span><span class="multi">2</span></span><p class="desc">仍有两个上线阻塞需要跨团队协调。</p></div>
    </div>
    <div class="kpi-row-4" data-anim="up">
      <div class="kpi-cell"><div class="lbl">Activation</div><div class="nb">81<span class="unit">%</span></div><div class="note">首周目标用户</div></div>
      <div class="kpi-cell"><div class="lbl">Task Time</div><div class="nb">-34<span class="unit">%</span></div><div class="note">核心任务耗时</div></div>
      <div class="kpi-cell"><div class="lbl">Reuse</div><div class="nb">58<span class="unit">%</span></div><div class="note">模板复用占比</div></div>
      <div class="kpi-cell"><div class="lbl">Blocker</div><div class="nb">2</div><div class="note">跨团队阻塞</div></div>
    </div>
  </div>
</section>`,

`<section class="slide" data-layout="S22" data-animate="image-hero">
  <div class="canvas-card" style="padding:0;display:flex;flex-direction:column;overflow:hidden">
    <div data-anim="img" style="position:relative;flex:0 0 60%;overflow:hidden;background:var(--grey-1)" data-image-slot="s22-hero-21x9">
      <div class="frame-img r-21x9" data-image-slot="s22-hero-21x9" style="height:100%;max-height:none;background:linear-gradient(90deg,#ffffff,#eef6ff);display:grid;grid-template-columns:1.2fr 2fr 1.4fr;gap:1.4vw;padding:5vh 5vw">
        <div style="background:#ffffff;border:1px solid var(--border-subtle);padding:2vh"><div class="t-cat accent">Input</div><div class="body" style="margin-top:2vh">需求摘要<br>接口变更<br>风险提示</div></div>
        <div style="background:#ffffff;border-top:4px solid var(--accent);padding:2vh"><div class="t-cat accent">AIDX Flow</div><div style="height:70%;margin-top:2vh;background:repeating-linear-gradient(to right,#dbeafe 0 10%,#ffffff 10% 20%);border:1px solid var(--border-subtle)"></div></div>
        <div style="background:#ffffff;border:1px solid var(--border-subtle);padding:2vh"><div class="t-cat accent">Output</div><div class="body" style="margin-top:2vh">评审结论<br>任务清单<br>审计记录</div></div>
      </div>
      <div style="position:absolute;top:0;left:0;right:0;padding:5.6vh 5vw 0">${brandChrome('03', 'EVIDENCE', '08')}</div>
      <div data-anim="title-block" style="position:absolute;left:5vw;top:12vh;background:var(--paper);padding:3.2vh 3.2vw;max-width:42vw;border:1px solid var(--border-subtle)">
        <div class="t-cat accent">Evidence Hero</div>
        <div style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(4.8vw,8.4vh);line-height:1;letter-spacing:-.035em;color:var(--text-primary);margin-top:1vh">S22 主图<br>承载真实证据</div>
      </div>
    </div>
    <div data-anim="kpi" class="image-hero-body">
      <div style="max-width:48ch;font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.3vw);line-height:1.55;font-weight:400;color:var(--text-primary);letter-spacing:-.005em">正式交付时使用脱敏后的真实截图或 21:9 证据图,保持输入、流程、输出的完整链路。</div>
      <div class="image-hero-stats" style="gap:4vw">
        <div><div class="t-meta">Proof</div><div class="kpi-big">21:9</div><p class="body-sm">证据主图槽位</p></div>
        <div><div class="t-meta">Scope</div><div class="kpi-big">3</div><p class="body-sm">输入、流程、输出</p></div>
        <div><div class="t-meta">Status</div><div class="kpi-big" style="color:var(--accent)">Live</div><p class="body-sm">接入真实截图</p></div>
      </div>
    </div>
  </div>
</section>`,

`<section class="slide grey" data-layout="S16" data-animate="grid-reveal">
  <div class="canvas-card">
    ${brandChrome('04', 'USER SIGNALS', '08')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">用户信号</div>
      <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">三类证据共同指向继续投入</h2>
    </div>
    <div data-anim="up" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.4vw;flex:1;align-items:stretch;margin-top:3vh">
      ${['行为数据|核心任务从 18 分钟降到 12 分钟,重复操作显著减少','访谈反馈|用户更认可结论摘要和风险解释,希望模板可复用','运营记录|工单咨询集中在权限、入口和历史记录导出'].map((item, i) => {
        const [title, body] = item.split('|');
        return `<article class="${i === 0 ? 'card-accent' : 'card-fill'}" style="padding:3vh 2vw;display:flex;flex-direction:column;justify-content:space-between"><div class="t-cat ${i === 0 ? 'on-dark' : 'accent'}">Signal 0${i + 1}</div><div><h3 class="h-md" style="${i === 0 ? 'color:var(--accent-on)' : ''}">${title}</h3><p class="body" style="margin-top:1.2vh;color:${i === 0 ? 'var(--accent-on)' : 'var(--text-secondary)'}">${body}</p></div><div style="height:1px;background:${i === 0 ? 'rgba(255,255,255,.45)' : 'var(--border-subtle)'}"></div></article>`;
      }).join('\n      ')}
    </div>
    ${footer('User Signals')}
  </div>
</section>`,

`<section class="slide" data-layout="S06" data-animate="tower-grow">
  <div class="canvas-card">
    ${brandChrome('05', 'METRICS', '08')}
    <div style="display:grid;grid-template-columns:5fr 7fr;gap:4vw;align-items:end;flex:1">
      <div data-anim="up" style="display:flex;flex-direction:column;gap:2vh;align-self:start">
        <div class="t-cat accent">上线指标</div>
        <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">核心指标已越过试点门槛</h2>
        <p class="lead" style="color:var(--text-secondary)">用激活、效率、复用和阻塞四项指标判断是否进入下一轮扩面。</p>
      </div>
      <div class="bar-towers" data-anim="up">
        <div class="bar-tower"><div class="cap"></div><div class="body-block h-4 b-accent"><div class="lbl">Activation</div><div class="nb">81<span class="unit">%</span></div><div class="sub">首周激活</div></div></div>
        <div class="bar-tower"><div class="cap"></div><div class="body-block h-3"><div class="lbl">Task Time</div><div class="nb">-34<span class="unit">%</span></div><div class="sub">任务耗时</div></div></div>
        <div class="bar-tower"><div class="cap"></div><div class="body-block h-2"><div class="lbl">Reuse</div><div class="nb">58<span class="unit">%</span></div><div class="sub">模板复用</div></div></div>
        <div class="bar-tower"><div class="cap"></div><div class="body-block h-1"><div class="lbl">Blocker</div><div class="nb">2</div><div class="sub">阻塞项</div></div></div>
      </div>
    </div>
    ${footer('Launch Metrics')}
  </div>
</section>`,

`<section class="slide" data-layout="S14" data-animate="loop-form">
  <div class="canvas-card">
    ${brandChrome('06', 'CLOSED LOOP', '08')}
    <div style="display:grid;grid-template-columns:5fr 7fr;gap:4vw;align-items:center;flex:1">
      <div data-anim="up" style="display:flex;flex-direction:column;gap:2vh">
        <div class="t-cat accent">闭环机制</div>
        <h2 class="h-xl-zh" style="font-size:min(5vw,8.6vh)">上线后反馈必须进入产品迭代闭环</h2>
        <p class="lead" style="color:var(--text-secondary)">证据页不是展示页,而是把真实使用信号转成下一轮优先级。</p>
      </div>
      <div data-anim="up" style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.4vw">
        ${['Collect|采集真实截图、行为数据和访谈反馈','Classify|按价值、风险、频率分层','Decide|进入产品 backlog 或治理清单','Verify|两周后回看指标和用户反馈'].map((item, i) => {
          const [label, body] = item.split('|');
          return `<article class="${i === 2 ? 'card-accent' : 'card-fill'}" style="padding:3vh 2vw;min-height:22vh"><div class="t-cat ${i === 2 ? 'on-dark' : 'accent'}">${label}</div><p class="body" style="margin-top:4vh;color:${i === 2 ? 'var(--accent-on)' : 'var(--text-secondary)'}">${body}</p></article>`;
        }).join('\n        ')}
      </div>
    </div>
    ${footer('Feedback Loop')}
  </div>
</section>`,

`<section class="slide" data-layout="S08" data-animate="duo-mirror">
  <div class="canvas-card">
    ${brandChrome('07', 'TRADEOFF', '08')}
    <div style="display:flex;flex-direction:column;gap:2vh">
      <div class="t-cat accent">下一轮取舍</div>
      <h2 class="h-xl-zh" style="font-size:min(5vw,8.8vh)">优先补强入口体验,暂缓低频能力扩张</h2>
    </div>
    <div class="duo-compare" data-anim="up">
      <div class="col"><div class="col-tag"><span class="num">01</span>Expand Features</div><div class="col-ttl">继续堆能力</div><p class="col-desc">短期能满足长尾需求,但会放大入口分散和学习成本。</p><ul class="col-list"><li>演示效果更完整</li><li>用户路径更复杂</li><li>运营解释成本增加</li></ul></div>
      <span class="vrule"></span>
      <div class="col accent"><div class="col-tag"><span class="num">02</span>Improve Entry</div><div class="col-ttl">先补入口体验</div><p class="col-desc">优先解决权限、模板复用和历史记录,让现有价值稳定复现。</p><ul class="col-list"><li>降低首次使用门槛</li><li>提升模板复用率</li><li>让证据链可追踪</li></ul></div>
    </div>
    ${footer('Product Tradeoff')}
  </div>
</section>`,

`<section class="slide split" data-layout="S10" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="justify-content:space-between">
        ${brandChrome('08', 'CLOSING', '08').replace('chrome-min brand-chrome', 'chrome-min brand-chrome tight')}
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh">
          <div class="t-cat accent">结尾请求</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-size:min(6.6vw,11.5vh);line-height:.96;letter-spacing:-.025em;font-weight:200;color:var(--text-primary)">请批准<br>下一轮<br>产品补强</h2>
        </div>
        <div class="t-meta">AIDX · WeBank</div>
      </div>
      <div class="half" style="justify-content:space-between">
        <div class="chrome-min"><div class="l">Decision Request</div><div class="r">03 Asks</div></div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:0">
          ${['确认入口体验为下一轮最高优先级','批准补齐模板复用、历史记录和权限提示','两周后用激活率、复用率和阻塞项复盘'].map((text, i) => `<div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:3vh 0;border-top:1px solid var(--border-subtle);${i === 2 ? 'border-bottom:2px solid var(--accent)' : ''}"><div style="font-family:var(--sans);font-weight:200;font-size:min(4.2vw,7.2vh);line-height:.9;color:${i === 2 ? 'var(--accent)' : 'var(--text-primary)'}">0${i + 1}</div><div><h3 style="font-family:var(--sans),var(--sans-zh);font-weight:400;font-size:max(18px,1.8vw);line-height:1.2;letter-spacing:-.015em;color:${i === 2 ? 'var(--accent)' : 'var(--text-primary)'}">${text}</h3><p class="body" style="color:var(--text-secondary);margin-top:1vh">${i === 0 ? '优先级决策。' : i === 1 ? '范围决策。' : '验收决策。'}</p></div></div>`).join('\n          ')}
        </div>
        <div class="t-meta" style="text-align:right">AIDX · WeBank</div>
      </div>
    </div>
  </div>
</section>`,
].join('\n\n');

writeDeck('examples/aidx-showcase.html', 'AIDX Showcase · AIDX Review', slides);
writeDeck('examples/aidx-governance-review.html', 'AIDX Governance Review · AIDX Review', governanceSlides);
writeDeck('examples/aidx-product-evidence.html', 'AIDX Product Evidence · AIDX Review', productEvidenceSlides);
