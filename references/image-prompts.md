# AIDX Image Prompts

Use these prompts when generating visuals for an AIDX executive brief. AIDX visuals must prove a conclusion, explain a system, clarify a risk, or support a decision. Do not generate decorative "AI atmosphere" images.

## Global Rules

- Visual anchor: AIDX internal executive briefing, dark command center, terminal texture, bank-grade restraint.
- Colors: AIDX dark surfaces, grayscale, `#3A5ECF`, `#063970`, `#5DADE2`, plus small status colors for risk or progress.
- Geometry: straight rectangular modules, thin lines, compact labels, no 3D, no cartoon, no neon glow.
- Language follows the deck language. Chinese deck uses Chinese labels; English deck uses English labels.
- Do not add fake logos, watermarks, page numbers, browser chrome, slide titles, or decorative frames.
- Outputs should be clean visual assets, not a full slide with header/footer.
- Match the target slot before generating: `16:10` for evidence screenshots, `16:9` for architecture/KPI/risk visuals, `21:9` for social cover headers.

## Type 1 · Evidence Screenshot Adaptation

Use for AIDX-09 or any page where the screenshot is evidence. Preserve real content whenever possible.

```text
Adapt this product/workflow screenshot into a 16:10 evidence visual for an AIDX executive briefing. Preserve the real UI content, key text, metrics, and status indicators. Use a clean light canvas or restrained dark command-center support surface with clear margins. Do not crop important information. Do not add logos, titles, page numbers, browser chrome, or decorative frames. Output only the evidence visual.
```

If sensitive information is present:

```text
Adapt this screenshot into a 16:10 AIDX evidence visual. Preserve layout, key workflow states, and metric relationships, but mask names, account identifiers, customer data, tokens, and private URLs. Use AIDX blue/cyan only for subtle emphasis. Output only the evidence visual.
```

## Type 2 · Architecture Capability Map

Use for AIDX-07 or technical review pages.

```text
Create a 16:9 AIDX architecture capability map showing how [platform layer], [capability layer], and [experience layer] connect. Use a dark command-center visual system with AIDX blue and cyan highlights, straight rectangular modules, thin connector lines, and short Chinese labels. Keep the diagram readable for executives: show boundaries, dependencies, and risk points, not low-level implementation detail. No 3D, no neon, no cartoon, no fake logos, no slide title, no page frame.
```

## Type 3 · Risk and Decision Graphic

Use for AIDX-03, AIDX-06, or decision review material.

```text
Create a 16:9 AIDX decision graphic about [decision/risk/tradeoff]. The visual should contain 3-4 straight rectangular information modules, status colors for priority, concise Chinese labels, and a clear hierarchy from recommendation to risk to next action. Use a restrained dark executive briefing style with AIDX blue/cyan highlights. No complex background, no neon, no 3D, no people, no fake logos, no slide title or decorative frame.
```

## Type 4 · KPI Data Visual

Use as a supplemental image for AIDX-04 or a report cover.

```text
Create a 16:9 AIDX KPI data visual for an executive briefing. Core metrics: [metric A], [metric B], [metric C]. Show large readable numbers, compact trend bars, short Chinese annotations, and subtle status indicators. Use dark panels, fixed grid structure, AIDX blue/cyan highlights, and bank-grade restraint. Do not make it look like a generic SaaS dashboard screenshot. No logos, no page header, no title, no page number, no decorative frame.
```

## Type 5 · Social Cover / Briefing Cover

Use for WeChat 21:9 covers, 1:1 share cards, Xiaohongshu 3:4 covers, video thumbnails, or presentation posters.

```text
Create an AIDX executive briefing cover visual for [topic]. Use a dark command-center background, subtle terminal grid, AIDX blue/cyan signal lines, and one clear focal structure representing [core idea]. Leave clean space for a title overlay. Style should feel like an internal AI technology executive brief for AIDX / WeBank: restrained, precise, high-trust, not cyberpunk. No text, no logos, no watermark, no people, no 3D mascot. Aspect ratio: [21:9 / 1:1 / 3:4 / 16:9].
```

## Type 6 · Workflow Proof Diagram

Use when the deck needs to show a process without relying on a real screenshot.

```text
Create a 16:9 AIDX workflow proof diagram showing [step 1] -> [step 2] -> [step 3] -> [audit/result]. Use four horizontal modules, thin connectors, small status tags, and concise Chinese labels. Dark executive command-center style, AIDX blue/cyan highlights, minimal status colors. The diagram should prove operational readiness, not decorate the page. No logos, no page title, no slide shell.
```

## Negative Prompt

Avoid: cyberpunk city, robot, humanoid AI, purple-blue glow, hologram, rounded SaaS cards, cartoon, 3D objects, fake brand logos, random code text, decorative bokeh, stock-photo people, unreadable microtext, page headers, page footers, slide numbers, watermarks.
