#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = resolve(repoRoot, 'assets/template-aidx.html');
const layoutsPath = resolve(repoRoot, 'references/layouts-aidx.md');
const outputPath = resolve(repoRoot, 'examples/aidx-style-c-showcase.html');

const order = Array.from({ length: 10 }, (_, i) => `AIDX-${String(i + 1).padStart(2, '0')}`);
const layoutsMd = readFileSync(layoutsPath, 'utf8');
const sectionMatches = [...layoutsMd.matchAll(/<section class="slide[\s\S]*?<\/section>/g)].map((match) => match[0]);
const byLayout = new Map();

for (const section of sectionMatches) {
  const layout = section.match(/data-layout="([^"]+)"/)?.[1];
  if (layout && !byLayout.has(layout)) byLayout.set(layout, section);
}

let slides = order.map((layout) => {
  const section = byLayout.get(layout);
  if (!section) throw new Error(`Missing ${layout} in ${layoutsPath}`);
  return section;
}).join('\n\n');

const replacements = [
  ['[必填] AI 工程效能高层汇报', 'AIDX 工程效能高层汇报'],
  ['[必填] 用一句话说明本次汇报要解决的问题、决策对象和影响范围。', '从试点验证进入规模化推进,本次汇报聚焦效果、风险、路径和三项决策请求。'],
  ['[必填] 当前最重要的三件事', '试点已验证价值,但规模化依赖治理闭环'],
  ['[必填] 结论一', '效率收益成立'],
  ['[必填] 结论二', '质量收益可观测'],
  ['[必填] 结论三', '治理仍是瓶颈'],
  ['[必填] 是否启动下一阶段规模化试点', '是否批准核心研发域规模化试点'],
  ['[必填] 效能改善已经进入可度量阶段', '效能改善已经进入可度量阶段'],
  ['[必填] 从试点到规模化的四段路径', '从试点到规模化的四段路径'],
  ['[必填] 高风险事项和影响面。', '数据边界未统一,部分场景无法进入标准审计链路。'],
  ['[必填] 中风险事项和缓释动作。', '团队使用习惯差异较大,规模化初期需要强运营支持。'],
  ['[必填] 中风险事项和 owner。', '模型能力波动会影响代码评审稳定性,需要可回退机制。'],
  ['[必填] 需要持续观察的信号。', '成本和调用量进入可控区间,仍需纳入月度经营视图。'],
  ['[必填] 两个阻塞需要管理层介入', '两个阻塞需要管理层介入'],
  ['[必填] AIDX 能力栈支撑三类工程场景', 'AIDX 能力栈支撑三类工程场景'],
  ['[必填] 新模式解决了旧流程的三个断点', 'AIDX 模式解决旧流程的三个断点'],
  ['[必填] 真实工作流已经跑通', '真实工作流已经跑通'],
  ['[必填] 请批准下一阶段规模化试点', '请批准下一阶段规模化试点'],
  ['[必填] 资源或范围决策。', '批准 9 个核心研发域进入 12 周规模化试点。'],
  ['[必填] 跨部门协同或治理决策。', '确认统一工具入口、数据边界和审计责任归属。'],
  ['[必填] 时间窗口和验收口径。', '授权每两周同步效果、风险和成本看板。'],
  ['说明业务影响、当前状态和为什么现在需要关注。', '在 3 个试点域中,需求到合并周期平均下降 21%,重复性评审工作明显减少。'],
  ['说明关键进展、阻塞点或资源需求。', 'AI 辅助检查前置到需求和代码阶段,缺陷外溢率下降,关键风险更早暴露。'],
  ['说明下一步动作和预期收益。', '模型访问、数据边界和审计口径需要统一,否则规模化后难以稳定复制。'],
  ['用一段话说明这项决策的边界、受影响团队、资源投入和错过窗口的代价。', '建议以 9 个核心研发域为边界,用统一工具链、统一审计口径和统一验收指标推进 12 周试点。'],
  ['建议批准方案 A', '建议批准方案 A'],
  ['说明推荐方案的核心理由。', '先扩到核心研发域,保留人工关键节点,用真实交付指标验证。'],
  ['列出需要接受的代价、依赖和风险缓释条件。', '需要冻结工具入口和数据边界,短期会压缩各团队自定义空间。'],
  ['明确批准后的 2-4 周动作。', '两周内完成团队名单、权限矩阵、审计看板和验收口径确认。'],
  ['左侧只放真实阻塞,右侧说明需要谁介入、何时完成、如果不处理的代价。', '短期风险不是模型效果,而是治理口径、审计责任和跨域协同没有同步收敛。'],
  ['这里解释截图证明了什么,不要复述截图里的每个按钮。高层只需要知道证据、影响和下一步。', '样例用内联矢量图模拟工作流截图。正式汇报时替换为真实截图,并保留关键区域、指标和状态。'],
  ['指出截图中的关键区域、指标或状态。', '关注需求进入、AI 检查、人工复核、审计记录四个状态是否形成闭环。'],
];

for (const [from, to] of replacements) {
  slides = slides.replaceAll(from, to);
}

slides = slides
  .replaceAll('12<span class="unit">teams</span>', '9<span class="unit">domains</span>')
  .replaceAll('Q3</div><div class="kpi-note">推进周期', 'H2</div><div class="kpi-note">规模化窗口')
  .replaceAll('30<span class="unit">%</span>', '28<span class="unit">%</span>')
  .replaceAll('目标改善', '交付周期目标改善')
  .replaceAll('汇报人 · 日期', 'Style C AIDX Sample')
  .replaceAll('68<span class="unit">%</span>', '72<span class="unit">%</span>')
  .replaceAll('-24<span class="unit">%</span>', '-21<span class="unit">%</span>')
  .replaceAll('+18<span class="unit">%</span>', '+31<span class="unit">%</span>')
  .replaceAll('核心团队使用率', '试点团队周活使用率')
  .replaceAll('需求交付周期', '需求到合并周期')
  .replaceAll('一次通过率', '一次评审通过率')
  .replaceAll('待处理阻塞', '管理层需介入阻塞')
  .replaceAll('阶段一', '验证价值')
  .replaceAll('阶段二', '统一入口')
  .replaceAll('阶段三', '扩域试点')
  .replaceAll('阶段四', '规模治理')
  .replaceAll('已完成的能力、团队和验证结果。', '完成 3 个研发域试点,沉淀基线指标、最佳实践和失败样本。')
  .replaceAll('当前进行中的任务和依赖。', '收敛工具入口、权限模型、审计日志和知识库同步机制。')
  .replaceAll('需要资源或跨团队协同的部分。', '扩展到 9 个核心研发域,每两周复盘效率、质量和风险。')
  .replaceAll('规模化前必须解除的阻塞。', '上线统一治理看板,明确模型、数据、人工复核和退出机制。')
  .replaceAll('旧模式', '旧工程协作模式')
  .replaceAll('AIDX 模式', 'AIDX 工程模式')
  .replaceAll('上下文散落在文档、IM 和代码仓库。', '上下文散落在需求、IM、文档和代码仓库。')
  .replaceAll('评审质量依赖个人经验。', '评审质量依赖个人经验,难以沉淀组织能力。')
  .replaceAll('风险发现太晚,返工成本高。', '风险发现太晚,跨团队返工成本持续上升。')
  .replaceAll('上下文进入统一工作流。', '上下文进入统一工程工作流,减少重复沟通。')
  .replaceAll('AI 辅助检查标准化。', 'AI 辅助检查标准化,评审口径可复制。')
  .replaceAll('风险前置到需求和代码阶段。', '风险前置到需求和代码阶段,审计链路可追踪。')
  .replace(/\b(\d{2}) \/ 08\b/g, '$1 / 10');

const evidenceFigure = `<figure class="frame-img r-16x10 fit-contain" data-image-slot="aidx-evidence-16x10">
          <svg viewBox="0 0 960 600" role="img" aria-label="AIDX workflow console mockup" style="width:100%;height:100%;display:block;background:#f7f9fc">
            <rect x="0" y="0" width="960" height="600" fill="#f7f9fc"/>
            <rect x="32" y="34" width="896" height="64" fill="#0f172a"/>
            <text x="58" y="75" fill="#e5e7eb" font-family="JetBrains Mono, monospace" font-size="22">AIDX Workflow Console</text>
            <rect x="58" y="134" width="844" height="84" fill="#ffffff" stroke="#d8dde8"/>
            <rect x="58" y="248" width="844" height="84" fill="#ffffff" stroke="#d8dde8"/>
            <rect x="58" y="362" width="844" height="84" fill="#ffffff" stroke="#d8dde8"/>
            <rect x="58" y="476" width="844" height="70" fill="#ffffff" stroke="#d8dde8"/>
            <text x="88" y="168" fill="#063970" font-family="Noto Sans SC, sans-serif" font-size="24">需求进入统一上下文</text>
            <text x="88" y="282" fill="#063970" font-family="Noto Sans SC, sans-serif" font-size="24">AI 检查生成风险清单</text>
            <text x="88" y="396" fill="#063970" font-family="Noto Sans SC, sans-serif" font-size="24">人工复核确认变更边界</text>
            <text x="88" y="520" fill="#063970" font-family="Noto Sans SC, sans-serif" font-size="24">审计日志进入治理看板</text>
            <rect x="650" y="154" width="180" height="32" fill="#dbeafe"/>
            <rect x="650" y="268" width="180" height="32" fill="#dcfce7"/>
            <rect x="650" y="382" width="180" height="32" fill="#fef3c7"/>
            <rect x="650" y="499" width="180" height="32" fill="#dbeafe"/>
            <text x="675" y="177" fill="#063970" font-family="JetBrains Mono, monospace" font-size="18">READY</text>
            <text x="675" y="291" fill="#166534" font-family="JetBrains Mono, monospace" font-size="18">PASSED</text>
            <text x="675" y="405" fill="#92400e" font-family="JetBrains Mono, monospace" font-size="18">REVIEW</text>
            <text x="675" y="522" fill="#063970" font-family="JetBrains Mono, monospace" font-size="18">LOGGED</text>
          </svg>
        </figure>`;

slides = slides
  .replace(/<figure class="frame-img r-16x10 fit-contain">[\s\S]*?<\/figure>/, evidenceFigure)
  .replace('Evidence screenshot · replace image path', 'Evidence screenshot mockup · replace with real AIDX workflow capture')
  .replace('[必填] AIDX 工作流截图', 'AIDX 工作流截图样例');

const output = readFileSync(templatePath, 'utf8')
  .replace('[必填] 替换为 PPT 标题 · AIDX Executive Brief', 'AIDX Style C Showcase · Executive Brief')
  .replace(/<!-- SLIDES_HERE[\s\S]*?-->/, slides);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, output);

console.log(`Wrote ${outputPath}`);
