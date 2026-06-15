import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticle, getArticleSlugs, extractHeadings } from '@/lib/content'
import { navigation, navTitle } from '@/lib/navigation'
import { ArticleLayout } from '@/components/ArticleLayout'
import { FallbackNotice } from '@/components/FallbackNotice'
import { mdxOptions, mdxComponents } from '@/lib/mdx'
import { defaultLocale, isLocale, prefixedLocales, type Locale } from '@/lib/i18n'

type Params = { path: string[] }

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getArticleSlugs()
  const params: Params[] = []
  // English articles live at the root (the index/home is handled by app/page.tsx).
  for (const slug of slugs) params.push({ path: [slug] })
  // Each non-default locale gets a home page plus every article.
  for (const locale of prefixedLocales) {
    params.push({ path: [locale] })
    for (const slug of slugs) params.push({ path: [locale, slug] })
  }
  return params
}

function parsePath(path: string[]): { locale: Locale; slug: string } {
  if (path.length > 0 && isLocale(path[0]) && path[0] !== defaultLocale) {
    return { locale: path[0], slug: path[1] ?? '' }
  }
  return { locale: defaultLocale, slug: path[0] ?? '' }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { path } = await params
  const { locale, slug } = parsePath(path)
  const item = navigation.find((n) => n.slug === slug)
  return { title: item ? navTitle(item, locale) : slug }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { path } = await params
  const { locale, slug } = parsePath(path)

  // Unknown article slug → 404 (an empty slug is the locale home / index).
  if (slug && !navigation.some((n) => n.slug === slug)) notFound()

  const { content, isFallback } = await getArticle(slug, locale)
  const toc = extractHeadings(content)

  return (
    <ArticleLayout toc={toc} locale={locale}>
      {isFallback && <FallbackNotice locale={locale} />}
      <MDXRemote source={content} options={mdxOptions} components={mdxComponents(locale)} />
    </ArticleLayout>
  )
}
