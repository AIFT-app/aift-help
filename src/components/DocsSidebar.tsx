'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { navigation, navTitle } from '@/lib/navigation'
import { splitLocale, localizeHref } from '@/lib/i18n'

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { locale, rest } = splitLocale(pathname)

  return (
    <nav className="flex flex-col gap-0.5 overflow-y-auto px-3 py-6">
      {navigation.map((item) => {
        const base = item.slug ? `/${item.slug}` : '/'
        const href = localizeHref(base, locale)
        const isCurrent = item.slug
          ? rest === `/${item.slug}` || rest === `/${item.slug}/`
          : rest === '/'

        return (
          <span key={item.slug} className="relative">
            {isCurrent && (
              <span className="absolute inset-y-0.5 -left-3 w-0.5 rounded-full bg-zinc-950" />
            )}
            <Link
              href={href}
              onClick={onNavigate}
              className={clsx(
                'flex w-full items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors',
                isCurrent
                  ? 'bg-zinc-950/5 text-zinc-950'
                  : 'text-zinc-600 hover:bg-zinc-950/5 hover:text-zinc-950'
              )}
            >
              {navTitle(item, locale)}
            </Link>
          </span>
        )
      })}
    </nav>
  )
}
