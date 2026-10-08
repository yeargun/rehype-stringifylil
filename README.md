# @itslil/rehype-stringify

Official [`rehype-stringify@10.0.1`](https://github.com/rehypejs/rehype) algorithm rewritten in LilScript. API and parity suite 10/10. Not affiliated with upstream.

**Site:** [yeargun.github.io/rehype-stringifylil/](https://yeargun.github.io/rehype-stringifylil/)

```sh
npm install @itslil/rehype-stringify
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. Declared `extern class` keys remain part of the public contract. ESM export names stay so the lane is testable. |

You publish the library lane. `dist/rehype-stringify.closed.js` is diagnostic only.

The LilScript compiler lives next door at `../lilscript`.
The serializer source is shared from the sibling `../hast-util-to-htmllil` checkout so the two packages cannot drift.


## Comparison with the original

See [COMPARISON.md](COMPARISON.md) for current raw-, gzip- and Brotli-objective builds, minified upstream comparisons, build times and validation.
