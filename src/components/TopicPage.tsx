import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { groupDescription, groupTitle, navTitle, type NavGroup } from '@/lib/navigation'
import { getArticleIntro } from '@/lib/content'
import { localizeHref, ui, type Locale } from '@/lib/i18n'
import { articleCount } from './home'
import { ClientPill } from './ClientPill'

/**
 * A group's landing page (/topics/<id>): what the group covers, then every
 * article in it with its opening sentence, so a reader can pick the right one
 * without opening each.
 */
export async function TopicPage({ group, locale }: { group: NavGroup; locale: Locale }) {
  const t = ui[locale]
  const intros = await Promise.all(group.items.map((item) => getArticleIntro(item.slug, locale)))

  return (
    <div className="min-w-0 flex-1 px-6 py-10 sm:px-10">
      <div className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500">
          <Link href={localizeHref('/', locale)} className="hover:text-zinc-950">
            {t.home}
          </Link>
          <ChevronRightIcon aria-hidden="true" className="size-4 text-zinc-300" />
          <span aria-current="page">{groupTitle(group, locale)}</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 max-sm:text-[30px]">{groupTitle(group, locale)}</h1>
        <p className="mt-3 text-lg/7 text-zinc-600">{groupDescription(group, locale)}</p>
        <p className="mt-1 text-sm text-zinc-500">{articleCount(group.items.length, locale)}</p>

        <ul className="mt-8 flex flex-col gap-3">
          {group.items.map((item, i) => (
            <li key={item.slug}>
              <Link
                href={localizeHref(`/${item.slug}`, locale)}
                className="flex flex-col gap-1 rounded-xl border border-zinc-950/10 px-5 py-4 transition-colors hover:border-zinc-950/20 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-semibold text-zinc-950">{navTitle(item, locale)}</span>
                  {item.audience === 'client' && <ClientPill locale={locale} />}
                </span>
                {intros[i] && <span className="text-sm/6 text-zinc-600">{intros[i]}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
