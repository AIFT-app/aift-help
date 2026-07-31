// Build-time search index generator.
//
//   node scripts/build-search-index.mjs
//
// The site is a static export on GitHub Pages, so there is no server to query.
// Instead this emits one JSON index per locale into `public/search/`, which the
// search dialog fetches lazily the first time a user opens it.
//
// Locale resolution mirrors `getArticle()` in src/lib/content.ts: a locale index
// uses `<slug>.<locale>.mdx` when it exists and falls back to the English file
// otherwise — so search results always say the same thing the page will.
// Translating an article therefore needs no change here; the index follows.
//
// Run automatically via the `predev` / `prebuild` npm scripts.

import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSlugger } from '../src/lib/slug.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = path.join(root, 'content')
const outDir = path.join(root, 'public', 'search')

const locales = ['en', 'hu', 'de']
const defaultLocale = 'en'

/** Turn MDX prose into the plain text we index and quote in snippets. */
function toPlainText(markdown) {
  return (
    markdown
      // Fenced code: config/JSON noise that makes for unreadable snippets.
      .replace(/^```[\s\S]*?^```/gm, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      // Images before links — an image is a link with a leading `!`.
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      // Table pipes and separator rows.
      .replace(/^\s*\|?[\s:|-]{6,}\|?\s*$/gm, ' ')
      .replace(/\|/g, ' ')
      // Leading block markers: headings, quotes, list bullets, ordered items.
      .replace(/^\s{0,3}#{1,6}\s+/gm, '')
      .replace(/^\s{0,3}>\s?/gm, '')
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      // Inline emphasis / code markers.
      .replace(/`([^`]*)`/g, '$1')
      .replace(/\*\*|__|\*|_/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

/** Split an article into its H1, its H2/H3 sections, and the prose under each. */
function parseArticle(markdown) {
  const slugger = createSlugger()
  const withoutCode = markdown.replace(/^```[\s\S]*?^```/gm, '')

  let title = ''
  const headings = []
  // Prose that appears before the first H2, i.e. the article intro.
  let intro = []
  let current = null

  for (const line of withoutCode.split('\n')) {
    const m = /^(#{1,3})\s+(.+)$/.exec(line)
    if (m) {
      const text = m[2].trim()
      const id = slugger.slug(text)
      if (m[1].length === 1) {
        // The h1 still goes through the slugger so duplicate counting matches.
        if (!title) title = toPlainText(text)
        continue
      }
      current = { text: toPlainText(text), id, body: [] }
      headings.push(current)
      continue
    }
    ;(current ? current.body : intro).push(line)
  }

  return {
    title,
    intro: toPlainText(intro.join('\n')),
    sections: headings.map((h) => ({
      text: h.text,
      id: h.id,
      body: toPlainText(h.body.join('\n')),
    })),
  }
}

async function main() {
  const files = await readdir(contentDir)
  const slugs = files
    .filter((f) => f.endsWith('.mdx'))
    .filter((f) => !/\.(hu|de)\.mdx$/.test(f))
    .map((f) => f.replace(/\.mdx$/, ''))
    .sort()

  await mkdir(outDir, { recursive: true })

  for (const locale of locales) {
    const docs = []
    for (const slug of slugs) {
      let raw
      let translated = true
      if (locale !== defaultLocale) {
        try {
          raw = await readFile(path.join(contentDir, `${slug}.${locale}.mdx`), 'utf-8')
        } catch {
          translated = false
        }
      }
      if (raw === undefined) {
        raw = await readFile(path.join(contentDir, `${slug}.mdx`), 'utf-8')
      }

      const { title, intro, sections } = parseArticle(raw)
      docs.push({
        // `index` is the locale home and lives at `/` (or `/hu`), not `/index`.
        slug: slug === 'index' ? '' : slug,
        title,
        intro,
        sections,
        // English content shown under a non-English locale — the page carries a
        // fallback notice, and results are ranked below real translations.
        fallback: locale !== defaultLocale && !translated,
      })
    }

    const file = path.join(outDir, `${locale}.json`)
    const json = JSON.stringify({ locale, docs })
    await writeFile(file, json, 'utf-8')
    const kb = (Buffer.byteLength(json) / 1024).toFixed(0)
    const fell = docs.filter((d) => d.fallback).length
    console.log(
      `search index: ${locale} — ${docs.length} articles, ${kb} KB` +
        (fell ? ` (${fell} untranslated, indexed in English)` : '')
    )
  }
}

main().catch((err) => {
  console.error('search index generation failed:', err)
  process.exit(1)
})
