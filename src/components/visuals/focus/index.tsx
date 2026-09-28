// The date control on a focused page, in its two real shapes.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28), class for class:
//   src/components/focus/FocusScopeChip.tsx
//
// WHY THIS SCREEN
//
//   The focused-period article's worst error was telling readers this control
//   opens the period picker. It does not: the period half is a <span> with a
//   title tooltip, and the component says so in its own comment - "Not a
//   control: no caret, no hover, no button… It was briefly a second picker,
//   which nested a popover inside a popover and rendered as a scroll box. A
//   label cannot do that." An acceptance test (focus-mode T4) fails the build
//   if anyone adds a control back.
//
//   So the question a reader actually arrives with - "where do I change the
//   date on this page?" - is answered by showing which half is a button and
//   which is not, side by side. Prose cannot do that in one glance.
//
//   ⚠️ The component's FILE HEADER contradicts its own implementation: lines
//   11-16 still describe the period half as opening the picker. That stale
//   comment is what mis-sold the article. Read the render, not the header.
//
// The basis half's ★ means "this is the workspace default"; losing the star is
// itself the deviation signal, which is why the figure keeps it. A server
// component: the popover never opens, and the screen is `inert` regardless.

import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { AppScreen, Figure, Pin } from '../kit'
import { GLYPH, focusChipCopy } from './copy'

const SCREEN_MIN_WIDTH = 760

/** FocusScopeChip.tsx, verbatim. `showBasis` is the only difference between the two. */
function Chip({
  period,
  basisOn,
  basis,
  showBasis,
  readonlyTitle,
  pin,
}: {
  period: string
  basisOn: string
  basis: string
  showBasis: boolean
  readonlyTitle: string
  pin?: number
}) {
  return (
    <div className="inline-flex h-9 items-stretch overflow-hidden rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40">
      <span
        title={readonlyTitle}
        className="flex items-center gap-1.5 px-3 text-[13px] font-semibold tracking-tight text-blue-700 dark:text-blue-300"
      >
        <span aria-hidden className="text-[10px]">
          {GLYPH.diamond}
        </span>
        {period}
        {/* the parent is flex with gap-1.5, so the pin must cancel one gap */}
        {pin ? <Pin n={pin} at="right" cancel="-ml-1.5" /> : null}
      </span>

      {showBasis && (
        <>
          <span className="w-px bg-blue-200 dark:bg-blue-900" aria-hidden />
          {/* Popover renders a div; PopoverButton renders a button. The basis
              half is the one control here, so it stays a real button. */}
          <div className="relative flex">
            <button
              type="button"
              className={clsx(
                'flex items-center gap-1.5 px-3 text-[13px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500',
                'text-blue-700 hover:bg-blue-100/70 dark:text-blue-300 dark:hover:bg-blue-900/40',
              )}
            >
              <span className="font-normal opacity-70">{basisOn}</span>
              {basis}
              <span aria-hidden className="text-[10px] opacity-60">
                {GLYPH.star}
              </span>
              <span aria-hidden className="text-[9px] opacity-60">
                {GLYPH.caret}
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export function FocusChipFigure({
  locale,
  children,
}: {
  locale: Locale
  children?: React.ReactNode
}) {
  const c = focusChipCopy[locale]
  const ui = c.ui

  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          <div className="bg-white p-4">
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-xs font-medium tracking-wide text-zinc-400 uppercase">
                  {ui['nav.workspace.invoices']}
                </p>
                <Chip
                  period={c.rendered.period}
                  basisOn={ui['focus.basis_on']}
                  basis={ui['date_filter.basis_short_delivery']}
                  showBasis
                  readonlyTitle={ui['focus.period_readonly']}
                  pin={1}
                />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium tracking-wide text-zinc-400 uppercase">
                  {ui['nav.workspace.transactions']}
                </p>
                <Chip
                  period={c.rendered.period}
                  basisOn={ui['focus.basis_on']}
                  basis={ui['date_filter.basis_short_delivery']}
                  showBasis={false}
                  readonlyTitle={ui['focus.period_readonly']}
                  pin={2}
                />
              </div>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
