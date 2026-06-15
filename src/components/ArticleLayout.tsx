import { TableOfContents } from './TableOfContents'
import type { Heading } from '@/lib/content'
import { ui, type Locale } from '@/lib/i18n'

export function ArticleLayout({
  children,
  toc,
  locale,
}: {
  children: React.ReactNode
  toc: Heading[]
  locale: Locale
}) {
  return (
    <div className="flex min-w-0 flex-1">
      <div className="min-w-0 flex-1 px-6 py-10 sm:px-10">
        <article className="prose prose-zinc max-w-3xl">
          {children}
        </article>
      </div>
      <TableOfContents items={toc} label={ui[locale].onThisPage} />
    </div>
  )
}
