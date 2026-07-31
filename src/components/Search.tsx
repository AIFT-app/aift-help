'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, DocumentTextIcon } from '@heroicons/react/20/solid'
import * as Headless from '@headlessui/react'
import { splitLocale, localizeHref, ui, type Locale } from '@/lib/i18n'
import { search, highlight, type Range, type SearchIndex, type SearchResult } from '@/lib/search'

/** Index fetches are cached per locale for the lifetime of the page. */
const cache = new Map<Locale, Promise<SearchIndex>>()

function loadIndex(locale: Locale): Promise<SearchIndex> {
  let pending = cache.get(locale)
  if (!pending) {
    pending = fetch(`/search/${locale}.json`).then((res) => {
      if (!res.ok) throw new Error(`search index ${locale}: ${res.status}`)
      return res.json() as Promise<SearchIndex>
    })
    // Don't cache a rejection — a later open should be able to retry.
    pending.catch(() => cache.delete(locale))
    cache.set(locale, pending)
  }
  return pending
}

function Highlighted({ text, ranges }: { text: string; ranges: Range[] }) {
  return (
    <>
      {highlight(text, ranges).map((part, i) =>
        part.hit ? (
          <mark key={i} className="rounded-sm bg-amber-200/70 text-inherit">
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  )
}

function KeyHint({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-zinc-950/10 bg-white px-1.5 py-0.5 font-sans text-[10px] text-zinc-500">
      {children}
    </kbd>
  )
}

export function Search() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchIndex | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [isMac, setIsMac] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const { locale } = splitLocale(pathname)
  const t = ui[locale]

  // The index is per-locale; drop a stale one when the language changes.
  const loadedLocale = useRef<Locale | null>(null)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform ?? ''))
  }, [])

  // ⌘K / Ctrl+K from anywhere, plus "/" when not already typing in a field.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase()
      if (key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
        return
      }
      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const el = event.target as HTMLElement | null
        const typing =
          el &&
          (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
        if (!typing) {
          event.preventDefault()
          setOpen(true)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const ensureIndex = useCallback(() => {
    if (status === 'loading') return
    if (status === 'ready' && loadedLocale.current === locale) return
    setStatus('loading')
    loadIndex(locale).then(
      (data) => {
        loadedLocale.current = locale
        setIndex(data)
        setStatus('ready')
      },
      () => setStatus('error')
    )
  }, [locale, status])

  // Fetch as soon as the dialog opens, so the first keystroke already has data.
  useEffect(() => {
    if (open) ensureIndex()
  }, [open, ensureIndex])

  const results = useMemo(
    () => (loadedLocale.current === locale ? search(index, query) : []),
    [index, query, locale]
  )

  function close() {
    setOpen(false)
    setQuery('')
  }

  function go(result: SearchResult | null) {
    if (!result) return
    const base = localizeHref(result.slug ? `/${result.slug}` : '/', locale)
    router.push(result.sectionId ? `${base}#${result.sectionId}` : base)
    close()
  }

  const trimmed = query.trim()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        // Warm the index on intent, so results are instant once the dialog opens.
        onPointerEnter={ensureIndex}
        aria-label={t.search}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-950 sm:w-56 sm:justify-between sm:border sm:border-zinc-950/10 sm:bg-zinc-50 sm:hover:bg-white"
      >
        <span className="flex items-center gap-2">
          <MagnifyingGlassIcon className="size-4 shrink-0" />
          <span className="hidden sm:inline">{t.search}</span>
        </span>
        <span className="hidden sm:flex sm:items-center sm:gap-0.5">
          <KeyHint>{isMac ? '⌘' : 'Ctrl'}</KeyHint>
          <KeyHint>K</KeyHint>
        </span>
      </button>

      <Headless.Dialog open={open} onClose={close} className="relative z-50">
        <Headless.DialogBackdrop
          transition
          className="fixed inset-0 bg-zinc-950/25 backdrop-blur-sm transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
        />
        <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Headless.DialogPanel
            transition
            className="mx-auto max-w-2xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-zinc-950/5 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
          >
            <Headless.Combobox<SearchResult | null> immediate onChange={go}>
              <div className="flex items-center border-b border-zinc-950/5 px-4">
                <MagnifyingGlassIcon className="size-5 shrink-0 text-zinc-400" />
                <Headless.ComboboxInput
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.searchPlaceholder}
                  aria-label={t.search}
                  className="h-12 w-full border-0 bg-transparent px-3 text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none"
                />
              </div>

              {status === 'error' ? (
                <p className="px-4 py-8 text-center text-sm text-zinc-500">{t.searchError}</p>
              ) : trimmed === '' ? (
                <p className="px-4 py-8 text-center text-sm text-zinc-500">
                  {status === 'loading' ? t.searchLoading : t.searchEmpty}
                </p>
              ) : results.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-zinc-950">
                    {t.searchNoResults} <span className="font-semibold">“{trimmed}”</span>
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{t.searchNoResultsHint}</p>
                </div>
              ) : (
                <Headless.ComboboxOptions
                  static
                  className="max-h-96 scroll-py-2 overflow-y-auto py-2"
                >
                  {results.map((result) => (
                    <Headless.ComboboxOption
                      key={result.slug + (result.sectionId ?? '')}
                      value={result}
                      className="cursor-pointer px-4 py-2.5 data-focus:bg-zinc-50"
                    >
                      <div className="flex gap-3">
                        <DocumentTextIcon className="mt-0.5 size-4 shrink-0 text-zinc-400" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-zinc-950">
                            <Highlighted text={result.title} ranges={result.titleRanges} />
                            {result.sectionText && (
                              <span className="font-normal text-zinc-500">
                                {' › '}
                                {result.sectionText}
                              </span>
                            )}
                            {result.fallback && (
                              <span className="ml-2 rounded bg-zinc-100 px-1.5 py-0.5 align-middle text-[10px] font-normal text-zinc-500">
                                {t.searchInEnglish}
                              </span>
                            )}
                          </p>
                          {result.snippet && (
                            <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">
                              <Highlighted text={result.snippet} ranges={result.snippetRanges} />
                            </p>
                          )}
                        </div>
                      </div>
                    </Headless.ComboboxOption>
                  ))}
                </Headless.ComboboxOptions>
              )}

              <div className="hidden items-center gap-4 border-t border-zinc-950/5 bg-zinc-50 px-4 py-2 text-[11px] text-zinc-500 sm:flex">
                <span className="flex items-center gap-1">
                  <KeyHint>↑</KeyHint>
                  <KeyHint>↓</KeyHint>
                  {t.searchNavigate}
                </span>
                <span className="flex items-center gap-1">
                  <KeyHint>↵</KeyHint>
                  {t.searchSelect}
                </span>
                <span className="flex items-center gap-1">
                  <KeyHint>esc</KeyHint>
                  {t.searchClose}
                </span>
              </div>
            </Headless.Combobox>
          </Headless.DialogPanel>
        </div>
      </Headless.Dialog>
    </>
  )
}
