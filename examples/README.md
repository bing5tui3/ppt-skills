# Examples

这个目录放可直接打开的 HTML 样例。

| File | Style | 内容 |
|---|---|---|
| `aidx-style-c-showcase.html` | Style C AIDX | 10 页高层汇报样例,覆盖 `AIDX-01` 到 `AIDX-10` 全部登记版式 |

重新生成 Style C 样例:

```bash
node scripts/build-aidx-examples.mjs
node scripts/validate-aidx-deck.mjs examples/aidx-style-c-showcase.html
```
