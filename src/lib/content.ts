import { readFile, readdir } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export type Heading = { level: number; text: string; id: string }

export async function getArticle(slug: string) {
  const filePath = path.join(contentDir, `${slug || 'index'}.mdx`)
  const raw = await readFile(filePath, 'utf-8')
  const { content, data } = matter(raw)
  return { content, frontmatter: data as Record<string, string> }
}

export async function getArticleSlugs(): Promise<string[]> {
  const files = await readdir(contentDir)
  return files
    .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
    .map((f) => f.replace('.mdx', ''))
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Heading[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    headings.push({ level: match[1].length, text, id })
  }
  return headings
}
