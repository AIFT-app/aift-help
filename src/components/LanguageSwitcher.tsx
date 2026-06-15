'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as Headless from '@headlessui/react'
import { GlobeAltIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { locales, localeNames, splitLocale, localizeHref } from '@/lib/i18n'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const { locale, rest } = splitLocale(pathname)

  return (
    <Headless.Menu as="div" className="relative">
      <Headless.MenuButton className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-zinc-500 transition-colors hover:text-zinc-950">
        <GlobeAltIcon className="size-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <ChevronDownIcon className="size-3.5" />
      </Headless.MenuButton>
      <Headless.MenuItems
        anchor="bottom end"
        className="z-50 mt-1 w-36 rounded-lg border border-zinc-950/10 bg-white py-1 shadow-lg focus:outline-none"
      >
        {locales.map((l) => (
          <Headless.MenuItem key={l}>
            <Link
              href={localizeHref(rest, l)}
              className={clsx(
                'flex items-center justify-between px-3 py-1.5 text-sm data-focus:bg-zinc-950/5',
                l === locale ? 'font-medium text-zinc-950' : 'text-zinc-600'
              )}
            >
              {localeNames[l]}
              {l === locale && <CheckIcon className="size-4" />}
            </Link>
          </Headless.MenuItem>
        ))}
      </Headless.MenuItems>
    </Headless.Menu>
  )
}
