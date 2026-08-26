# @itslil/rehype-stringify

Official [`rehype-stringify@10.0.1`](https://github.com/rehypejs/rehype) algorithms rewritten in LilScript. Official test suite 7/7. Not affiliated with upstream.

**Site:** [yeargun.github.io/rehype-stringifylil/](https://yeargun.github.io/rehype-stringifylil/)

```sh
npm install @itslil/rehype-stringify
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. `extern class` keys may mangle. ESM export names stay so the lane is testable. |

You publish the library lane. The closed artifact is `dist/rehype-stringify.closed.js`.

The LilScript compiler lives next door at `../lilscript`.
