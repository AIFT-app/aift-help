import { readFile, readdir } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, type Locale } from './i18n'
import { createSlugger } from './slug.mjs'

const contentDir = path.join(process.cwd(), 'content')

export type Heading = { level: number; text: string; id: string }

/**
 * Load an article in the requested locale. Falls back to the English file when
 * no translation exists; `isFallback` is true in that case so the page can show
 * a notice.
 */
export async function getArticle(slug: string, locale: Locale = defaultLocale) {
  const base = slug || 'index'

  if (locale !== defaultLocale) {
    try {
      const raw = await readFile(
        path.join(contentDir, `${base}.${locale}.mdx`),
        'utf-8'
      )
      const { content, data } = matter(raw)
      return { content, frontmatter: data as Record<string, string>, isFallback: false }
    } catch {
      // No translation — fall through to English.
    }
  }

  const raw = await readFile(path.join(contentDir, `${base}.mdx`), 'utf-8')
  const { content, data } = matter(raw)
  return {
    content,
    frontmatter: data as Record<string, string>,
    isFallback: locale !== defaultLocale,
  }
}

/** Base article slugs (English filenames), excluding `index` and locale variants. */
export async function getArticleSlugs(): Promise<string[]> {
  const files = await readdir(contentDir)
  return files
    .filter((f) => f.endsWith('.mdx'))
    .filter((f) => !/\.(hu|de)\.mdx$/.test(f))
    .filter((f) => f !== 'index.mdx')
    .map((f) => f.replace('.mdx', ''))
}

/** Blank out fenced code blocks so `# comment` lines never look like headings. */
export function stripCodeFences(content: string): string {
  return content.replace(/^```[\s\S]*?^```/gm, '')
}

export function extractHeadings(content: string): Heading[] {
  // The slugger must see every heading in document order, including the h1 it
  // doesn't emit, because rehype-slug counts duplicates across the whole page.
  const slugger = createSlugger()
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: Heading[] = []
  let match
  while ((match = headingRegex.exec(stripCodeFences(content))) !== null) {
    const text = match[2].trim()
    const id = slugger.slug(text)
    const level = match[1].length
    if (level > 1) headings.push({ level, text, id })
  }
  return headings
}

/**
 * An article's opening paragraph as plain text, for the topic pages: the
 * first prose paragraph after the H1, with links, emphasis and code markers
 * dropped. Illustration tags and import lines are skipped. Long intros are cut
 * at a word boundary.
 */
export async function getArticleIntro(slug: string, locale: Locale, maxLength = 220): Promise<string> {
  const { content } = await getArticle(slug, locale)
  const paragraphs = stripCodeFences(content).split(/\n\s*\n/)
  const prose = paragraphs
    .map((block) => block.trim())
    .find((block) => block && !/^(#|<|import |export |\||>|[-*+] |\d+\. )/.test(block))
  if (!prose) return ''
  const text = prose
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*|__|\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}
