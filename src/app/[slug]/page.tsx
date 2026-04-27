import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { getArticle, getArticleSlugs, extractHeadings } from '@/lib/content'
import { ArticleLayout } from '@/components/ArticleLayout'
import { navigation } from '@/lib/navigation'

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-light' }],
    ] as never,
  },
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = navigation.find((n) => n.slug === slug)
  return { title: item?.title ?? slug }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { content } = await getArticle(slug)
  const toc = extractHeadings(content)

  return (
    <ArticleLayout toc={toc}>
      <MDXRemote source={content} options={mdxOptions} />
    </ArticleLayout>
  )
}
