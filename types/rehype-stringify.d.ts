import type {Root} from "hast"
import type {Plugin} from "unified"

export interface CharacterReferences {
  omitOptionalSemicolons?: boolean
  useNamedReferences?: boolean
  useShortestReferences?: boolean
}

type Quote = '"' | "'"
type Space = "html" | "svg"

export interface Options {
  allowDangerousCharacters?: boolean | null
  allowDangerousHtml?: boolean | null
  allowParseErrors?: boolean | null
  bogusComments?: boolean | null
  characterReferences?: CharacterReferences | null
  closeEmptyElements?: boolean | null
  closeSelfClosing?: boolean | null
  collapseEmptyAttributes?: boolean | null
  omitOptionalTags?: boolean | null
  preferUnquoted?: boolean | null
  quote?: Quote | null
  quoteSmart?: boolean | null
  space?: Space | null
  tightAttributes?: boolean | null
  tightCommaSeparatedLists?: boolean | null
  tightDoctype?: boolean | null
  tightSelfClosing?: boolean | null
  upperDoctype?: boolean | null
  voids?: ReadonlyArray<string> | null
}

declare const rehypeStringify: Plugin<
  [(Options | null | undefined)?],
  Root,
  string
>
export default rehypeStringify

declare module "unified" {
  interface Settings extends Options {}
}
