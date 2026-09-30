import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { groupHref, groupOf, groupTitle, navTitle, neighbours } from '@/lib/navigation'
import { localizeHref, ui, type Locale } from '@/lib/i18n'
import { ClientPill } from './ClientPill'

/** "Home › Group" above an article, linking back up to the group's page. */
export function Breadcrumb({ slug, locale }: { slug: string; locale: Locale }) {
  const group = groupOf(slug)
  if (!group) return null
  const t = ui[locale]
  const item = group.items.find((i) => i.slug === slug)
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-zinc-500">
      <Link href={localizeHref('/', locale)} className="hover:text-zinc-950">
        {t.home}
      </Link>
      <ChevronRightIcon aria-hidden="true" className="size-4 text-zinc-300" />
      <Link href={localizeHref(groupHref(group), locale)} className="hover:text-zinc-950">
        {groupTitle(group, locale)}
      </Link>
      {item?.audience === 'client' && (
        <span className="ml-1.5">
          <ClientPill locale={locale} />
        </span>
      )}
    </nav>
  )
}

/** Previous and next article in sidebar order, at the end of an article. */
export function Pager({ slug, locale }: { slug: string; locale: Locale }) {
  const { prev, next } = neighbours(slug)
  if (!prev && !next) return null
  const t = ui[locale]
  return (
    <nav aria-label={`${t.previous} / ${t.next}`} className="mt-16 grid gap-3 border-t border-zinc-950/5 pt-6 sm:grid-cols-2">
      {prev ? (
        <PagerLink slug={prev.slug} label={t.previous} title={navTitle(prev, locale)} locale={locale} dir="prev" />
      ) : (
        <span />
      )}
      {next && <PagerLink slug={next.slug} label={t.next} title={navTitle(next, locale)} locale={locale} dir="next" />}
    </nav>
  )
}

function PagerLink({
  slug,
  label,
  title,
  locale,
  dir,
}: {
  slug: string
  label: string
  title: string
  locale: Locale
  dir: 'prev' | 'next'
}) {
  const group = groupOf(slug)
  const Icon = dir === 'prev' ? ChevronLeftIcon : ChevronRightIcon
  return (
    <Link
      href={localizeHref(`/${slug}`, locale)}
      className={
        'flex flex-col gap-0.5 rounded-xl border border-zinc-950/10 px-4 py-3 transition-colors hover:border-zinc-950/20 hover:bg-zinc-50 ' +
        (dir === 'next' ? 'sm:items-end sm:text-right' : '')
      }
    >
      <span className="flex items-center gap-1 text-xs text-zinc-500">
        {dir === 'prev' && <Icon aria-hidden="true" className="size-3.5" />}
        {label}
        {group && <span className="text-zinc-400">· {groupTitle(group, locale)}</span>}
        {dir === 'next' && <Icon aria-hidden="true" className="size-3.5" />}
      </span>
      <span className="text-sm font-medium text-zinc-950">{title}</span>
    </Link>
  )
}
