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
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. Public and extern property names are preserved; eligible internal owned properties may be mangled. ESM export names stay so the lane is testable. |

You publish the library lane. `dist/rehype-stringify.closed.js` is diagnostic only.

The LilScript compiler lives next door at `../lilscript`.
The serializer source is shared from the sibling `../hast-util-to-htmllil` checkout so the two packages cannot drift.


## Comparison with the original

See [COMPARISON.md](COMPARISON.md) for current size and build-time comparisons against minified upstream.

[Download the checked repository package](https://yeargun.github.io/rehype-stringifylil/downloads/package.tgz) · [Package files, hashes and validation](https://yeargun.github.io/rehype-stringifylil/package-build.json). npm publication is independent.
