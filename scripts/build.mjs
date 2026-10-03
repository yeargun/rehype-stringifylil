import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {buildPackage} from './compiler-package.mjs'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
await buildPackage({root,
  profiles: [{name:'public', config:'lilscript.toml'}, {name:'closed', config:'lilscript.closed.toml'}],
  aliases: {'rehype-stringify.raw.js':'rehype-stringify.esm.js'},
  assets: [{source:'types/rehype-stringify.d.ts', destination:'rehype-stringify.d.ts'}],
})
