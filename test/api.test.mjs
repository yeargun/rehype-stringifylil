import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, it } from "node:test"
import * as library from "../dist/rehype-stringify.esm.js"
import officialRehypeStringify from "../site/official.js"

const { default: rehypeStringify } = library

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")

const paragraph = {
  type: "element",
  tagName: "p",
  properties: {},
  children: [{ type: "text", value: "hi" }],
}

function processor(settings = {}) {
  return {
    data(key) {
      assert.equal(key, "settings")
      return settings
    },
  }
}

describe("rehype-stringify", () => {
  it("exports only the default plugin", () => {
    assert.equal(typeof rehypeStringify, "function")
    assert.deepEqual(Object.keys(library), ["default"])
  })

  it("compiles a paragraph hast node to html", () => {
    const proc = processor()
    rehypeStringify.call(proc)
    const html = proc.compiler(paragraph)
    assert.match(String(html), /<p>/)
    assert.match(String(html), /hi/)
  })

  it("emits input type from properties", () => {
    const proc = processor()
    rehypeStringify.call(proc)
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
    const proc = processor()
    rehypeStringify.call(proc)
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

  it("merges processor settings before explicit options", () => {
    const proc = processor({ quote: "'", upperDoctype: true })
    rehypeStringify.call(proc, { quote: '"' })
    assert.equal(
      proc.compiler({ type: "element", tagName: "i", properties: { title: "x" }, children: [] }),
      '<i title="x"></i>',
    )
    assert.equal(proc.compiler({ type: "doctype" }), "<!DOCTYPE html>")
  })

  it("passes all character-reference options to the serializer", () => {
    const tree = {
      type: "element",
      tagName: "i",
      properties: { title: '"&' },
      children: [{ type: "text", value: "<&" }],
    }
    const cases = [
      [{ useNamedReferences: true }, '<i title="&quot;&amp;">&lt;&amp;</i>'],
      [{ useShortestReferences: true }, '<i title="&#34;&#38;">&lt;&#38;</i>'],
      [{ omitOptionalSemicolons: true }, '<i title="&#x22&#x26;">&#x3C&#x26;</i>'],
      [
        { useNamedReferences: true, omitOptionalSemicolons: true },
        '<i title="&quot&amp;">&lt;&amp</i>',
      ],
      [
        { useShortestReferences: true, omitOptionalSemicolons: true },
        '<i title="&#34&#38;">&#60&amp</i>',
      ],
    ]
    for (const [characterReferences, expected] of cases) {
      const proc = processor()
      const official = processor()
      rehypeStringify.call(proc, { characterReferences })
      officialRehypeStringify.call(official, { characterReferences })
      assert.equal(proc.compiler(tree), expected)
      assert.equal(proc.compiler(tree), official.compiler(tree))
    }
  })

  it("copies own settings without prototype pollution", () => {
    const inherited = Object.create({ allowDangerousHtml: true })
    const options = JSON.parse('{"__proto__":{"allowDangerousHtml":true}}')
    const proc = processor(inherited)
    rehypeStringify.call(proc, options)
    assert.equal(proc.compiler({ type: "raw", value: "<i>" }), "&#x3C;i>")
  })
})
