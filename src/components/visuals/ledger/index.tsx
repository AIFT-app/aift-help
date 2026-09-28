// The top of the Ledger: the filter chrome, for the ledger article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28), class for class, in the
// order tabbed-list-view.tsx:124-152 renders them (toolbar, strip, chips, tabs):
//   ledger-filter/NLFilterInput.tsx        the Ask the Ledger bar + submit hint
//   ledger-filter/SearchEngineSelect.tsx   Auto / Exact / Meaning
//   ledger-filter/ledger-strip.tsx         the always-visible strip
//   ledger-filter/ledger-active-chips.tsx  the chip row and Reset all
//   date-range/date-range-filter.tsx       the date trigger (closed)
//   list-view/multi-select-chip-dropdown.tsx  the partner control (closed)
//   list-view/tabbed-list-view.tsx         the five tabs
//
// WHY THIS SCREEN
//
//   The old article invented a "Show filters" button and sent readers to click
//   it. That string exists in all three locale files and is referenced NOWHERE
//   in src - an orphan. The filters are never hidden: the common ones are
//   always on screen and the rest are behind "More filters". One picture
//   settles that, and four other findings with it: there are FIVE tabs and not
//   three, the reset link is "Reset all", and the search bar carries an engine
//   switch whose Meaning setting leads to a page with no export.
//
// A server component: every control is in its resting state, the popovers
// never open, and the screen is `inert`.

import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { AppScreen, Figure, Pin } from '../kit'
import { ACTIVE_TAB, MORE_FILTERS_COUNT, TABS, ledgerFilterCopy } from './copy'

const SCREEN_MIN_WIDTH = 760

/** NLFilterInput.tsx SparkleIcon and SubmitHint, verbatim. */
function SparkleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4 text-blue-500">
      <path d="M10 2l1.6 4.4L16 8l-4.4 1.6L10 14l-1.6-4.4L4 8l4.4-1.6L10 2Z" />
    </svg>
  )
}
function SubmitHint() {
  return (
    <span
      aria-hidden="true"
      className="select-none rounded border border-zinc-200 px-1.5 py-0.5 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-2.5">
        <path d="M14.5 4a.75.75 0 0 1 .75.75v3a3.25 3.25 0 0 1-3.25 3.25H6.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 1 1 1.06 1.06L6.56 9.5H12a1.75 1.75 0 0 0 1.75-1.75v-3A.75.75 0 0 1 14.5 4Z" />
      </svg>
    </span>
  )
}
/** date-range-filter.tsx CalendarGlyph. */
function CalendarGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4 text-zinc-500">
      <path d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.25 2.25 0 0 1 17.5 6.25v9A2.25 2.25 0 0 1 15.25 17.5H4.75A2.25 2.25 0 0 1 2.5 15.25v-9A2.25 2.25 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2ZM4 8v7.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75V8H4Z" />
    </svg>
  )
}
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}
function SlidersIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4 text-zinc-500">
      <path d="M3 5.75A.75.75 0 0 1 3.75 5h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 5.75Zm0 4.5A.75.75 0 0 1 3.75 9.5h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 3 10.25Zm0 4.5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75Z" />
    </svg>
  )
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  )
}

const SELECT_CLASS =
  'rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'

export function LedgerFiltersFigure({
  locale,
  children,
}: {
  locale: Locale
  children?: React.ReactNode
}) {
  const c = ledgerFilterCopy[locale]
  const ui = c.ui
  const engines = [
    ui['ledger_nl.engine_auto'],
    ui['ledger_nl.engine_exact'],
    ui['ledger_nl.engine_meaning'],
  ]

  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          <div className="bg-white p-4">
            {/* ── Ask the Ledger ─────────────────────────────────────────── */}
            <div className="w-full max-w-[720px]">
              <div className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {ui['ledger_nl.label']}
                <Pin n={1} at="right" cancel="" />
              </div>
              <div className={clsx(
                  'flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm transition-colors',
                  'dark:bg-zinc-900',
                  'border-zinc-300 dark:border-zinc-700',
                )}>
                <SparkleIcon />
                <span className="flex-1 text-sm text-zinc-400">
                  {ui['ledger_nl.placeholder_default']}
                </span>
                <SubmitHint />
                <div
                  role="radiogroup"
                  className="flex shrink-0 items-center gap-0.5 rounded-md bg-zinc-100 p-0.5 dark:bg-zinc-800"
                >
                  {engines.map((label, i) => (
                    <span
                      key={label}
                      role="radio"
                      aria-checked={i === 0}
                      className={clsx(
                        'rounded px-2 py-1 text-xs transition-colors',
                        i === 0
                          ? 'bg-white font-medium text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                          : 'text-zinc-500 dark:text-zinc-400',
                      )}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <Pin n={2} at="right" cancel="-ml-2" />
              </div>
            </div>

            {/* ── the strip, always visible ──────────────────────────────── */}
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md bg-zinc-50 p-2 dark:bg-zinc-900/60">
              <span className="inline-flex h-8 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-medium text-zinc-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-zinc-100">
                <CalendarGlyph />
                <span className="font-normal text-zinc-500 dark:text-zinc-400">
                  {ui['date_filter.basis_short_delivery']}
                </span>
                <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
                  ·
                </span>
                <span>{ui['date_filter.rolling_last_30']}</span>
              </span>

              <span className={SELECT_CLASS}>{ui['ledger_explorer.filter_direction_all']}</span>

              <span
                className={clsx(
                  'inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700',
                  'dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300',
                )}
              >
                <span>{c.rendered.partner}</span>
                <ChevronDownIcon className="h-4 w-4 text-zinc-500" />
              </span>

              <div className="ml-auto">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <SlidersIcon />
                  <span>{ui['ledger_explorer.more_filters']}</span>
                  <Badge color="blue" className="ml-0.5">
                    {MORE_FILTERS_COUNT}
                  </Badge>
                  <Pin n={3} at="right" cancel="-ml-1.5" />
                </span>
              </div>
            </div>

            {/* ── active filter chips ────────────────────────────────────── */}
            <div className="flex flex-wrap items-center gap-2 py-2">
              <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                {ui['ledger_explorer.active_filters_label']}
              </span>
              {c.rendered.chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:ring-blue-800"
                >
                  {chip}
                  <span className="rounded-full p-0.5">
                    <XIcon className="size-3" />
                  </span>
                </span>
              ))}
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {ui['ledger_explorer.reset_all']}
                <Pin n={4} at="right" cancel="" />
              </span>
            </div>

            {/* ── the five tabs ──────────────────────────────────────────── */}
            <div role="tablist" className="flex border-b border-zinc-200 dark:border-zinc-700">
              {TABS.map((t) => {
                const isActive = t.key === ACTIVE_TAB
                return (
                  <span
                    key={t.key}
                    role="tab"
                    aria-selected={isActive}
                    className={clsx(
                      '-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-blue-500 text-zinc-950 dark:text-white'
                        : 'border-transparent text-zinc-600 dark:text-zinc-400',
                    )}
                  >
                    <span>{ui[`ledger_explorer.${t.key}` as keyof typeof ui]}</span>
                    <Badge color={isActive ? 'blue' : 'zinc'}>{t.count}</Badge>
                  </span>
                )
              })}
              <Pin n={5} at="right" cancel="" />
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
