import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticle, getArticleSlugs, extractHeadings } from '@/lib/content'
import { findGroup, groupTitle, navGroups, navigation, navTitle } from '@/lib/navigation'
import { ArticleLayout } from '@/components/ArticleLayout'
import { FallbackNotice } from '@/components/FallbackNotice'
import { TopicPage } from '@/components/TopicPage'
import { mdxOptions, mdxComponents } from '@/lib/mdx'
import { defaultLocale, isLocale, prefixedLocales, ui, type Locale } from '@/lib/i18n'

type Params = { path: string[] }

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getArticleSlugs()
  const topics = navGroups.map((group) => ['topics', group.id])
  const params: Params[] = []
  // English articles live at the root (the index/home is handled by app/page.tsx).
  for (const slug of slugs) params.push({ path: [slug] })
  for (const topic of topics) params.push({ path: topic })
  // Each non-default locale gets a home page, every article and every topic page.
  for (const locale of prefixedLocales) {
    params.push({ path: [locale] })
    for (const slug of slugs) params.push({ path: [locale, slug] })
    for (const topic of topics) params.push({ path: [locale, ...topic] })
  }
  return params
}

/**
 * `/<slug>`, `/<locale>/<slug>`, and the topic pages `/topics/<id>` and
 * `/<locale>/topics/<id>`. `topic` is set only for a topic page.
 */
function parsePath(path: string[]): { locale: Locale; slug: string; topic?: string } {
  const prefixed = path.length > 0 && isLocale(path[0]) && path[0] !== defaultLocale
  const locale = prefixed ? (path[0] as Locale) : defaultLocale
  const rest = prefixed ? path.slice(1) : path
  if (rest[0] === 'topics' && rest.length === 2) return { locale, slug: '', topic: rest[1] }
  return { locale, slug: rest.length === 1 ? rest[0] : rest.length === 0 ? '' : rest.join('/') }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { path } = await params
  const { locale, slug, topic } = parsePath(path)
  if (topic) {
    const group = findGroup(topic)
    return { title: group ? groupTitle(group, locale) : topic }
  }
  if (!slug) return { title: ui[locale].home }
  const item = navigation.find((n) => n.slug === slug)
  return { title: item ? navTitle(item, locale) : slug }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { path } = await params
  const { locale, slug, topic } = parsePath(path)

  if (topic) {
    const group = findGroup(topic)
    if (!group) notFound()
    return <TopicPage group={group} locale={locale} />
  }

  // Unknown article slug → 404 (an empty slug is the locale home / index).
  if (slug && !navigation.some((n) => n.slug === slug)) notFound()

  const { content, isFallback } = await getArticle(slug, locale)
  // The home page has no table of contents: it is a launch pad, not an article.
  const toc = slug ? extractHeadings(content) : []

  return (
    <ArticleLayout
      toc={toc}
      locale={locale}
      lang={isFallback ? defaultLocale : locale}
      slug={slug || undefined}
    >
      {isFallback && <FallbackNotice locale={locale} />}
      <MDXRemote source={content} options={mdxOptions} components={mdxComponents(locale)} />
    </ArticleLayout>
  )
}
