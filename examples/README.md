# Examples

| File | Style | Description |
|---|---|---|
| `aidx-showcase.html` | AIDX | 10-page management review sample covering KPI, roadmap, risk, system map, evidence, and closing ask |
| `aidx-governance-review.html` | AIDX | 8-page governance review sample for weekly risk, access, policy, and decision updates |
| `aidx-product-evidence.html` | AIDX | 8-page launch review sample focused on product evidence, screenshot slots, metrics, and next-round asks |

Regenerate all examples:

```bash
node scripts/build-aidx-examples.mjs
```

Validate all examples:

```bash
for f in examples/*.html; do node scripts/validate-aidx-deck.mjs "$f"; done
```
