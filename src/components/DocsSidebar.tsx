'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { navigation } from '@/lib/navigation'

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-0.5 overflow-y-auto px-3 py-6">
      {navigation.map((item) => {
        const href = item.slug ? `/${item.slug}/` : '/'
        const isCurrent = item.slug
          ? pathname === `/${item.slug}` || pathname === `/${item.slug}/`
          : pathname === '/'

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
              {item.title}
            </Link>
          </span>
        )
      })}
    </nav>
  )
}
