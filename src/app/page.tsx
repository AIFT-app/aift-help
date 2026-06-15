import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticle, extractHeadings } from '@/lib/content'
import { ArticleLayout } from '@/components/ArticleLayout'
import { mdxOptions, mdxComponents } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function HomePage() {
  const { content } = await getArticle('', 'en')
  const toc = extractHeadings(content)

  return (
    <ArticleLayout toc={toc} locale="en">
      <MDXRemote source={content} options={mdxOptions} components={mdxComponents('en')} />
    </ArticleLayout>
  )
}
