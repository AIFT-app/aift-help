// Building blocks of the help centre's home page (content/index*.mdx), with the
// page's locale bound so the MDX writes just `<TopicGrid />`. The start paths'
// wording lives in the MDX files, so it is translated with the article; the
// topic cards read their titles and descriptions from src/lib/navigation.ts.

import Link from 'next/link'
import { groupDescription, groupHref, groupTitle, navGroups } from '@/lib/navigation'
import { localizeHref, ui, type Locale } from '@/lib/i18n'
import { SearchHero } from './SearchHero'

/** Two start paths side by side, stacked on a phone. */
function StartPaths({ children }: { children?: React.ReactNode }) {
  return <div className="my-6 grid gap-4 sm:grid-cols-2">{children}</div>
}

/** One start path: a title, then an ordered list of linked steps written in MDX. */
function StartPath({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-zinc-950/10 bg-zinc-50 px-5 py-4 [&_li]:my-1 [&_ol]:mb-0 [&_ol]:mt-2 [&_ol]:pl-5">
      <h3 className="not-prose text-base font-semibold text-zinc-950">{title}</h3>
      {children}
    </section>
  )
}

export function articleCount(count: number, locale: Locale): string {
  const t = ui[locale]
  return `${count} ${count === 1 ? t.articleOne : t.articleMany}`
}

/** One card per sidebar group, linking to the group's page. */
function TopicGrid({ locale }: { locale: Locale }) {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {navGroups.map((group) => (
        <Link
          key={group.id}
          href={localizeHref(groupHref(group), locale)}
          className="flex flex-col gap-1 rounded-xl border border-zinc-950/10 px-4 py-3 transition-colors hover:border-zinc-950/20 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <span className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-semibold text-zinc-950">{groupTitle(group, locale)}</span>
            <span className="shrink-0 text-xs text-zinc-500">{articleCount(group.items.length, locale)}</span>
          </span>
          <span className="text-sm/5 text-zinc-600">{groupDescription(group, locale)}</span>
        </Link>
      ))}
    </div>
  )
}

export function homeComponents(locale: Locale) {
  return {
    StartPaths,
    StartPath,
    SearchHero: () => <SearchHero locale={locale} />,
    TopicGrid: () => <TopicGrid locale={locale} />,
  }
}
