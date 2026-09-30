'use client'

import { useId, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { groupOf, groupTitle, navGroups, navTitle } from '@/lib/navigation'
import { splitLocale, localizeHref, ui } from '@/lib/i18n'

/** The group whose articles the current page belongs to, if any. */
function currentGroupId(rest: string): string | undefined {
  const [first, second] = rest.replace(/^\/+|\/+$/g, '').split('/')
  if (first === 'topics') return second
  return first ? groupOf(first)?.id : undefined
}

// Groups fold open and closed. The "For clients" pill is shown on the topic
// pages and in each article's breadcrumb, not here: in a 256px sidebar it
// pushed long titles onto three lines.
//
// The group of the page being read starts open and follows the reader to the
// next page; a group the reader opened or closed by hand keeps that choice for
// the rest of the visit.
export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { locale, rest } = splitLocale(pathname)
  const t = ui[locale]
  const current = currentGroupId(rest)
  const [toggled, setToggled] = useState<Record<string, boolean>>({})
  // The sidebar renders twice (desktop column and phone drawer): ids must differ.
  const idPrefix = useId()

  const isCurrentHref = (base: string) => rest === base || rest === `${base}/`

  return (
    <nav className="flex flex-col gap-0.5 overflow-y-auto px-3 py-6">
      <SidebarLink href={localizeHref('/', locale)} current={rest === '/'} onNavigate={onNavigate}>
        {t.home}
      </SidebarLink>

      <div className="mt-2 flex flex-col gap-0.5">
        {navGroups.map((group) => {
          const open = toggled[group.id] ?? group.id === current
          const panelId = `${idPrefix}-${group.id}`
          return (
            <div key={group.id}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setToggled((prev) => ({ ...prev, [group.id]: !open }))}
                className={clsx(
                  'flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold transition-colors hover:bg-zinc-950/5',
                  group.id === current ? 'text-zinc-950' : 'text-zinc-700'
                )}
              >
                <span>{groupTitle(group, locale)}</span>
                <ChevronRightIcon
                  aria-hidden="true"
                  className={clsx('size-4 shrink-0 text-zinc-400 transition-transform', open && 'rotate-90')}
                />
              </button>
              <div id={panelId} hidden={!open} className="mb-2 mt-0.5 flex flex-col gap-0.5 pl-3">
                {group.items.map((item) => (
                  <SidebarLink
                    key={item.slug}
                    href={localizeHref(`/${item.slug}`, locale)}
                    current={isCurrentHref(`/${item.slug}`)}
                    onNavigate={onNavigate}
                  >
                    {navTitle(item, locale)}
                  </SidebarLink>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

function SidebarLink({
  href,
  current,
  onNavigate,
  children,
}: {
  href: string
  current: boolean
  onNavigate?: () => void
  children: React.ReactNode
}) {
  return (
    <span className="relative">
      {current && <span className="absolute inset-y-0.5 -left-3 w-0.5 rounded-full bg-zinc-950" />}
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={current ? 'page' : undefined}
        className={clsx(
          'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors',
          current ? 'bg-zinc-950/5 text-zinc-950' : 'text-zinc-600 hover:bg-zinc-950/5 hover:text-zinc-950'
        )}
      >
        {children}
      </Link>
    </span>
  )
}
