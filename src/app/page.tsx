import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { getArticle, extractHeadings } from '@/lib/content'
import { ArticleLayout } from '@/components/ArticleLayout'

export const metadata: Metadata = {
  title: 'Home',
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-light' }],
    ] as never,
  },
}

export default async function HomePage() {
  const { content } = await getArticle('')
  const toc = extractHeadings(content)

  return (
    <ArticleLayout toc={toc}>
      <MDXRemote source={content} options={mdxOptions} />
    </ArticleLayout>
  )
}
