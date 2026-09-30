import { TableOfContents } from './TableOfContents'
import { Breadcrumb, Pager } from './ArticleNav'
import type { Heading } from '@/lib/content'
import { ui, type Locale } from '@/lib/i18n'

export function ArticleLayout({
  children,
  toc,
  locale,
  lang = locale,
  slug,
}: {
  children: React.ReactNode
  toc: Heading[]
  locale: Locale
  /** The language the article text is in: English for a fallback article. */
  lang?: Locale
  /** The article's slug; omitted on the home page, which has no group. */
  slug?: string
}) {
  return (
    <div className="flex min-w-0 flex-1">
      <div className="min-w-0 flex-1 px-6 py-10 sm:px-10">
        <div className="max-w-3xl">
          {slug && <Breadcrumb slug={slug} locale={locale} />}
          <article lang={lang} className="prose prose-zinc max-w-3xl">
            {children}
          </article>
          {slug && <Pager slug={slug} locale={locale} />}
        </div>
      </div>
      <TableOfContents items={toc} label={ui[locale].onThisPage} />
    </div>
  )
}
