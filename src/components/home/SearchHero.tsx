'use client'

import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ui, type Locale } from '@/lib/i18n'
import { OPEN_SEARCH_EVENT } from '@/components/Search'

/**
 * The home page's search box. It opens the same search dialog as the header
 * button and the ⌘K / "/" shortcuts, so there is one search, not two.
 */
export function SearchHero({ locale }: { locale: Locale }) {
  const t = ui[locale]
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform ?? ''))
  }, [])

  return (
    <div className="not-prose my-8">
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}
        className="flex w-full items-center gap-3 rounded-xl border border-zinc-950/10 bg-white px-4 py-3 text-left text-base text-zinc-500 shadow-sm transition-colors hover:border-zinc-950/20 sm:text-sm"
      >
        <MagnifyingGlassIcon aria-hidden="true" className="size-5 shrink-0 text-zinc-400" />
        <span className="min-w-0 flex-1 truncate">{t.searchPlaceholder}</span>
        <kbd className="hidden shrink-0 rounded border border-zinc-950/10 px-1.5 font-sans text-xs text-zinc-400 sm:inline">
          {isMac ? '⌘K' : 'Ctrl K'}
        </kbd>
      </button>
    </div>
  )
}
