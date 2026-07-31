// Heading-anchor slugs.
//
// `rehype-slug` (via github-slugger) stamps the `id` on every rendered heading.
// The table of contents and the search results both need to predict those ids
// so their `#anchor` links actually land. This module is the single
// implementation both sides use — it is plain ESM (not TS) so the Node build
// script in `scripts/` and the app code can share it.
//
// The rules mirror github-slugger exactly:
//   lowercase → trim → drop punctuation/symbols (keeping letters, digits,
//   combining marks, `_` and `-`) → every remaining space becomes a hyphen.
//
// Note it does NOT collapse runs of whitespace: "Két kódoszlop — és" loses the
// em dash but keeps both surrounding spaces, yielding `két-kódoszlop--és`.
// Accented letters are preserved (`\p{L}`), which is what the old English-only
// `[^a-z0-9]` filter got wrong for Hungarian and German headings.

/**
 * Slugify one heading. Prefer `createSlugger()` when slugging a whole document,
 * so repeated headings get the same `-1`, `-2` suffixes rehype-slug assigns.
 * @param {string} text
 * @returns {string}
 */
export function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\p{M}\p{Zs}_-]/gu, '')
    .replace(/ /g, '-')
}

/**
 * A stateful slugger for a single document. github-slugger disambiguates
 * repeated headings by appending `-1`, `-2`, … to every occurrence after the
 * first, so the slugger must see a document's headings in order.
 * @returns {{ slug: (text: string) => string }}
 */
export function createSlugger() {
  /** @type {Map<string, number>} */
  const seen = new Map()
  return {
    slug(text) {
      const base = slugifyHeading(text)
      const count = seen.get(base)
      if (count === undefined) {
        seen.set(base, 0)
        return base
      }
      const next = count + 1
      seen.set(base, next)
      return `${base}-${next}`
    },
  }
}
