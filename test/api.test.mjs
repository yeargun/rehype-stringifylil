import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, it } from "node:test"
import rehypeStringify, { rehypeStringify as named } from "../dist/rehype-stringify.esm.js"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")

const paragraph = {
  type: "element",
  tagName: "p",
  properties: {},
  children: [{ type: "text", value: "hi" }],
}

describe("rehype-stringify", () => {
  it("exports the plugin as default and named", () => {
    assert.equal(typeof rehypeStringify, "function")
    assert.equal(named, rehypeStringify)
  })

  it("compiles a paragraph hast node to html", () => {
    const proc = {}
    named.call(proc)
    const html = proc.compiler(paragraph)
    assert.match(String(html), /<p>/)
    assert.match(String(html), /hi/)
  })

  it("emits input type from properties", () => {
    const proc = {}
    named.call(proc)
    const html = proc.compiler({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", disabled: true, checked: true },
      children: [],
    })
    assert.match(String(html), /type="checkbox"/)
    assert.match(String(html), /disabled/)
    assert.match(String(html), /checked/)
  })

  it("escapes text and joins className arrays", () => {
    const proc = {}
    named.call(proc)
    const html = proc.compiler({
      type: "element",
      tagName: "span",
      properties: { className: ["math", "math-inline"] },
      children: [{ type: "text", value: "a<b" }],
    })
    assert.match(String(html), /class="math math-inline"/)
    assert.match(String(html), /a&#x3C;b/)
  })

  it("keeps pinned keys in the library artifact", () => {
    const src = readFileSync(resolve(root, "dist/rehype-stringify.esm.js"), "utf8")
    assert.match(src, /allowDangerousHtml/)
    assert.match(src, /compiler/)
    assert.match(src, /className/)
    assert.match(src, /type/)
  })
})
