import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, it } from "node:test"
import rehypeStringify from "../dist/rehype-stringify.closed.js"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")

describe("rehype-stringify closed", () => {
  it("ships a closed artifact with the default export", () => {
    assert.equal(existsSync(resolve(root, "dist/rehype-stringify.closed.js")), true)
    assert.equal(typeof rehypeStringify, "function")
  })
})
