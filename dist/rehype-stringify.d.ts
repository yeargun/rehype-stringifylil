export interface Options {
  allowDangerousHtml?: boolean
}

export interface CompilerHost {
  compiler?: (tree: unknown, file?: unknown) => string
  data?: (key?: string, value?: unknown) => unknown
}

export function rehypeStringify(this: CompilerHost, options?: Options): void
export default rehypeStringify
