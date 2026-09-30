'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import {
  BanknotesIcon,
  BoltIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  ReceiptPercentIcon,
  Squares2X2Icon,
  TagIcon,
} from '@heroicons/react/20/solid'
import { SidebarItem, SidebarLabel } from '@/components/catalyst/sidebar'
import { groupOf, groupTitle, navGroups, navTitle } from '@/lib/navigation'
import { splitLocale, localizeHref, ui } from '@/lib/i18n'

// One icon per group, the app's own sidebar icon for that area where it has
// one (aift-web AppSidebar: Invoices, Bank transactions, Approvals, Master
// data, Reports, the workspace picker).
const GROUP_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'getting-started': Squares2X2Icon,
  'invoices-and-documents': DocumentTextIcon,
  'bank-and-matching': BanknotesIcon,
  'approvals-and-payment': ClipboardDocumentCheckIcon,
  categories: TagIcon,
  vat: ReceiptPercentIcon,
  'master-data': BuildingOfficeIcon,
  'reports-and-exports': ChartBarIcon,
  'working-faster': BoltIcon,
}

/** The group whose articles the current page belongs to, if any. */
function currentGroupId(rest: string): string | undefined {
  const [first, second] = rest.replace(/^\/+|\/+$/g, '').split('/')
  if (first === 'topics') return second
  return first ? groupOf(first)?.id : undefined
}

// Built like the app's sidebar: a Catalyst SidebarItem per area, and the
// area's pages as the app's sub-menu leaves (aift-web AppSidebar NavLeafGroup
// and NavLeaf, class for class). Unlike the app, every group can be opened and
// closed: the group of the page being read starts open and follows the reader
// to the next page, and a group toggled by hand keeps that choice for the rest
// of the visit. The "For clients" pill is shown on the topic pages and in each
// article's breadcrumb, not here: in a 256px sidebar it pushed long titles
// onto three lines.
export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { locale, rest } = splitLocale(pathname)
  const t = ui[locale]
  const current = currentGroupId(rest)
  const [toggled, setToggled] = useState<Record<string, boolean>>({})

  const isCurrentHref = (base: string) => rest === base || rest === `${base}/`

  return (
    <nav className="flex flex-col gap-0.5 overflow-y-auto px-3 py-6">
      <SidebarItem href={localizeHref('/', locale)} current={rest === '/'} onClick={onNavigate}>
        <HomeIcon data-slot="icon" />
        <SidebarLabel>{t.home}</SidebarLabel>
      </SidebarItem>

      {navGroups.map((group) => {
        const open = toggled[group.id] ?? group.id === current
        const Icon = GROUP_ICONS[group.id] ?? DocumentTextIcon
        return (
          <div key={group.id} className="flex flex-col gap-0.5">
            <SidebarItem
              current={group.id === current}
              aria-expanded={open}
              onClick={() => setToggled((prev) => ({ ...prev, [group.id]: !open }))}
            >
              <Icon data-slot="icon" />
              {/* Not SidebarLabel: it truncates, and the longer HU/DE group
                  names would lose their end in a 256px column. */}
              <span className="min-w-0 flex-1">{groupTitle(group, locale)}</span>
              <ChevronRightIcon data-slot="icon" className={clsx('transition-transform', open && 'rotate-90')} />
            </SidebarItem>
            {open && (
              <div className="mb-1 ml-2 flex flex-col gap-0.5 border-l border-zinc-200 pl-4">
                {group.items.map((item) => {
                  const active = isCurrentHref(`/${item.slug}`)
                  return (
                    <Link
                      key={item.slug}
                      href={localizeHref(`/${item.slug}`, locale)}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={clsx(
                        'rounded-md px-2 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                        active
                          ? 'bg-zinc-950/5 font-medium text-zinc-950'
                          : 'text-zinc-500 hover:bg-zinc-950/5 hover:text-zinc-700'
                      )}
                    >
                      {navTitle(item, locale)}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
