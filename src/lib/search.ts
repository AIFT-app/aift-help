// Client-side search over the per-locale JSON indexes in `public/search/`.
//
// The site is a static export, so all matching happens in the browser. The
// corpus is small (26 articles, ~170 KB of text per locale) and the index is
// fetched lazily on first use, so a straightforward scan beats pulling in a
// search library — and it lets us fold accents, which matters a lot here:
// Hungarian readers routinely type `afa` for ÁFA and `szamla` for számla, and
// German readers type `ruckerstattung` / `strasse` for Rückerstattung / Straße.

export type IndexedSection = { text: string; id: string; body: string }

export type IndexedDoc = {
  slug: string
  title: string
  intro: string
  sections: IndexedSection[]
  fallback: boolean
}

export type SearchIndex = { locale: string; docs: IndexedDoc[] }

/** A contiguous run of matched characters, in original-string coordinates. */
export type Range = { start: number; end: number }

export type SearchResult = {
  slug: string
  title: string
  titleRanges: Range[]
  /** Heading to deep-link to, when a section matched better than the intro. */
  sectionId?: string
  sectionText?: string
  snippet: string
  snippetRanges: Range[]
  fallback: boolean
  score: number
}

// Field weights. A title hit should always outrank a body hit.
const W_TITLE = 12
const W_SECTION = 5
const W_INTRO = 2
const W_BODY = 1

// Articles shown in English under a non-English locale rank slightly lower, so
// a real translation wins whenever both match.
const FALLBACK_PENALTY = 0.85

const SNIPPET_RADIUS = 90
const MAX_RESULTS = 10

/**
 * Case- and accent-fold `text`, returning the folded string alongside a map
 * from each folded character back to its index in the original.
 *
 * The map is what makes highlighting correct: folding is not length-preserving
 * (`ß` becomes `ss`, and NFD decomposition splits `á` into `a` + a combining
 * accent that we then drop), so a match range found in folded coordinates has
 * to be translated back before we can slice the text the user actually sees.
 */
function foldWithMap(text: string): { folded: string; map: number[] } {
  let folded = ''
  const map: number[] = []

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    // Expand the few characters whose lowercase form is multi-character before
    // falling back to decomposition.
    const expanded = ch === 'ß' || ch === 'ẞ' ? 'ss' : ch.toLowerCase()
    const stripped = expanded.normalize('NFD').replace(/\p{M}+/gu, '')
    // A character that is *only* a combining mark folds away entirely.
    for (const out of stripped) {
      folded += out
      map.push(i)
    }
  }

  return { folded, map }
}

function fold(text: string): string {
  return foldWithMap(text).folded
}

/** Split a query into folded terms, longest first so highlights nest sensibly. */
export function parseQuery(query: string): string[] {
  return Array.from(
    new Set(
      fold(query)
        .split(/[^\p{L}\p{N}]+/u)
        .filter((t) => t.length > 0)
    )
  )
}

function isWordBoundary(folded: string, index: number): boolean {
  if (index === 0) return true
  return !/[\p{L}\p{N}]/u.test(folded[index - 1])
}

/**
 * Every occurrence of `term` in `folded`, with a flag for whether it starts at
 * a word boundary. Matching is substring-based so "rechnung" still finds
 * "Rechnungsabgleich", but boundary hits score higher.
 */
function findOccurrences(folded: string, term: string) {
  const hits: { index: number; boundary: boolean }[] = []
  let from = 0
  for (;;) {
    const at = folded.indexOf(term, from)
    if (at === -1) break
    hits.push({ index: at, boundary: isWordBoundary(folded, at) })
    from = at + 1
  }
  return hits
}

type FieldMatch = { score: number; ranges: Range[] }

/**
 * Score `terms` against one field. Returns null unless *every* term is present,
 * so multi-word queries narrow results instead of widening them.
 */
function matchField(text: string, terms: string[], weight: number): FieldMatch | null {
  if (!text) return null
  const { folded, map } = foldWithMap(text)
  const ranges: Range[] = []
  let score = 0

  for (const term of terms) {
    const hits = findOccurrences(folded, term)
    if (hits.length === 0) return null

    // A word-boundary hit is worth more than one buried mid-word, and the
    // longer the term the more informative the match.
    const boundary = hits.some((h) => h.boundary)
    score += weight * term.length * (boundary ? 1 : 0.4)

    for (const hit of hits) {
      const start = map[hit.index]
      const lastFolded = hit.index + term.length - 1
      // `map` holds the first original index of each folded char; the end of
      // the range is one past the original character that produced the last.
      const end = (map[lastFolded] ?? map[map.length - 1]) + 1
      ranges.push({ start, end })
    }
  }

  return { score, ranges: mergeRanges(ranges) }
}

/** Merge overlapping/adjacent ranges so highlight spans don't nest or repeat. */
function mergeRanges(ranges: Range[]): Range[] {
  if (ranges.length === 0) return []
  const sorted = [...ranges].sort((a, b) => a.start - b.start)
  const merged: Range[] = [sorted[0]]
  for (const r of sorted.slice(1)) {
    const last = merged[merged.length - 1]
    if (r.start <= last.end) last.end = Math.max(last.end, r.end)
    else merged.push({ ...r })
  }
  return merged
}

/**
 * Cut a readable window around the first match, snapping to word edges and
 * shifting the highlight ranges into snippet coordinates.
 */
function buildSnippet(text: string, ranges: Range[]): { snippet: string; ranges: Range[] } {
  if (!text) return { snippet: '', ranges: [] }
  const first = ranges[0]
  if (!first) {
    const head = text.slice(0, SNIPPET_RADIUS * 2)
    return { snippet: head + (text.length > head.length ? '…' : ''), ranges: [] }
  }

  let start = Math.max(0, first.start - SNIPPET_RADIUS)
  let end = Math.min(text.length, first.start + SNIPPET_RADIUS)

  // Avoid starting or ending mid-word.
  if (start > 0) {
    const space = text.indexOf(' ', start)
    if (space !== -1 && space < first.start) start = space + 1
  }
  if (end < text.length) {
    const space = text.lastIndexOf(' ', end)
    if (space > first.end) end = space
  }

  const prefix = start > 0 ? '…' : ''
  const suffix = end < text.length ? '…' : ''
  const snippet = prefix + text.slice(start, end) + suffix

  const shifted = ranges
    .filter((r) => r.end > start && r.start < end)
    .map((r) => ({
      start: Math.max(0, r.start - start) + prefix.length,
      end: Math.min(end - start, r.end - start) + prefix.length,
    }))

  return { snippet, ranges: shifted }
}

/** Rank every article in `index` against `query`. */
export function search(index: SearchIndex | null, query: string): SearchResult[] {
  if (!index) return []
  const terms = parseQuery(query)
  if (terms.length === 0) return []

  const results: SearchResult[] = []

  for (const doc of index.docs) {
    const title = matchField(doc.title, terms, W_TITLE)
    const intro = matchField(doc.intro, terms, W_INTRO)

    // Best single section — that's what we deep-link to and quote.
    let bestSection: { section: IndexedSection; heading: FieldMatch | null; body: FieldMatch | null; score: number } | null = null
    for (const section of doc.sections) {
      const heading = matchField(section.text, terms, W_SECTION)
      const body = matchField(section.body, terms, W_BODY)
      if (!heading && !body) continue
      const score = (heading?.score ?? 0) + (body?.score ?? 0)
      if (!bestSection || score > bestSection.score) {
        bestSection = { section, heading, body, score }
      }
    }

    // A doc qualifies if any single field matched every term.
    if (!title && !intro && !bestSection) continue

    let score = (title?.score ?? 0) + (intro?.score ?? 0) + (bestSection?.score ?? 0)
    if (doc.fallback) score *= FALLBACK_PENALTY

    // Quote whichever field gives the most useful context: a matching section
    // body, else the section heading's own text, else the intro.
    let snippetSource = ''
    let snippetRanges: Range[] = []
    if (bestSection?.body) {
      snippetSource = bestSection.section.body
      snippetRanges = bestSection.body.ranges
    } else if (intro) {
      snippetSource = doc.intro
      snippetRanges = intro.ranges
    } else if (bestSection) {
      snippetSource = bestSection.section.body || doc.intro
    } else {
      snippetSource = doc.intro
    }

    const { snippet, ranges } = buildSnippet(snippetSource, snippetRanges)

    results.push({
      slug: doc.slug,
      title: doc.title,
      titleRanges: title?.ranges ?? [],
      sectionId: bestSection && !title ? bestSection.section.id : undefined,
      sectionText: bestSection && !title ? bestSection.section.text : undefined,
      snippet,
      snippetRanges: ranges,
      fallback: doc.fallback,
      score,
    })
  }

  return results.sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS)
}

/** Split `text` into alternating plain/highlighted chunks for rendering. */
export function highlight(text: string, ranges: Range[]): { text: string; hit: boolean }[] {
  if (ranges.length === 0) return [{ text, hit: false }]
  const parts: { text: string; hit: boolean }[] = []
  let cursor = 0
  for (const r of ranges) {
    if (r.start > cursor) parts.push({ text: text.slice(cursor, r.start), hit: false })
    parts.push({ text: text.slice(r.start, r.end), hit: true })
    cursor = r.end
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false })
  return parts
}
