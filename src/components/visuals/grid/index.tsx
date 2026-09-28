// The spreadsheet interface, for the spreadsheet-interface article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28), class for class:
//   src/components/selection-grid/SelectionGrid.tsx — the subtitle row, the
//     search box, the match counter and its buttons, the Matches only switch,
//     the grid frame, the sticky header, the group rows, RowViewInner and its
//     four states, the amber match marks, the status line and the footer.
//   src/components/master-data-import/import-grid/ImportGrid.tsx — the column
//     set of the accounting-categories import (code / name / direction /
//     status / note) and its 900px minWidth.
//
// WHY THIS SCREEN
//
//   The article's hardest idea is that SELECTED and TICKED are two different
//   things, and its second hardest is that a search FADES the rows that do not
//   match instead of hiding them. Both are purely visual: no paragraph can
//   show a blue row next to a ticked row next to a faded one. One frame can,
//   and it carries the rest of the chrome the article names for free — the
//   match counter, the tick-all-matches toggle, the Matches only switch, the
//   group rows, the status line inside the table's bottom edge and the ticked
//   count below it.
//
// ⚠️ THE TABLE IS DELIBERATELY CUT AT THE RIGHT EDGE. The grid's inner width
// is `min-width: 900px` inside an `overflow-auto` box, so below 900 the app
// scrolls it sideways rather than squeezing the name column. The figure is
// narrower than that, exactly as the app is in a narrow window, so the Note
// column runs off the edge. That is the app's own behaviour, not a crop.
//
// ⚠️ MARKERS GO BESIDE THE APP'S ELEMENTS, NEVER INSIDE ONE. Every row here is
// `overflow-hidden` by way of `truncate` cells, which clips a Pin, and a Pin's
// negative margin placed inside one of the app's elements shrinks it. The
// computed-CSS diff cannot catch either fault (it skips the pins on both
// sides); `aift-ops/scripts/help-marker-audit.mjs` is what checks them.
//
// A server component: nothing is interactive and the screen is `inert`. The
// Matches only switch is Catalyst's, which is Headless UI and needs a client,
// so its markup is rendered directly, class for class, the way DialogTitle is
// handled in vat-setup/. Labels come from ./copy.ts, keyed by message key; the
// categories are fictional.

import { Fragment } from 'react'
import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { AppScreen, Figure, Pin } from '../kit'
import { GROUPS, ROWS, gridCopy, type GridRow } from './copy'

const SCREEN_MIN_WIDTH = 760

/** SelectionGrid.tsx Kbd, verbatim. */
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mx-px inline-block min-w-5 rounded border border-b-2 border-zinc-950/10 bg-zinc-100 px-1 text-center font-sans text-[11px]/[18px] font-medium text-zinc-700 dark:border-white/15 dark:bg-zinc-800 dark:text-zinc-300">
      {children}
    </kbd>
  )
}

/** SelectionGrid.tsx Check, verbatim. */
function Check({ on, label, disabled }: { on: boolean; label: string; disabled?: boolean }) {
  return (
    <span
      role="checkbox"
      aria-checked={on}
      aria-disabled={disabled}
      aria-label={label}
      className={clsx(
        'relative block size-4 flex-none rounded',
        disabled && 'opacity-35',
        on ? 'bg-zinc-900 dark:bg-zinc-500' : 'bg-white ring-1 ring-inset ring-zinc-400 dark:bg-zinc-800 dark:ring-zinc-500',
      )}
    >
      {on && <span className="absolute left-[5.5px] top-[2.5px] h-[9px] w-[5px] rotate-45 border-b-2 border-r-2 border-white" />}
    </span>
  )
}

/** The chevron SelectionGrid.tsx draws for the filter, direction and find buttons. */
function Chevron({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="m2 3.5 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const FILTER_BTN =
  'grid size-5 flex-none place-items-center rounded bg-white text-zinc-500 ring-1 ring-inset ring-zinc-950/10 hover:text-zinc-950 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-white/15 dark:hover:text-white'
const FIND_BTN =
  'grid size-[26px] place-items-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white'
const HEAD_CELL = 'flex items-center gap-1 whitespace-nowrap border-r border-zinc-950/5 px-2.5 last:border-r-0 dark:border-white/5'
const TEMPLATE = '44px 128px minmax(220px,1fr) 136px 128px minmax(160px,1fr)'
const GROUP_TEMPLATE = '44px minmax(0,1fr) 108px'

/** Headless UI's hidden form field, on the wrapper and on both inputs. */
const HIDDEN_FIELD: React.CSSProperties = {
  position: 'fixed',
  top: 1,
  left: 1,
  width: 1,
  height: 0,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
  display: 'none',
}

/** The name cell's `<mark>` around the part the search matched. */
function Highlighted({ name, query }: { name: string; query: string }) {
  const at = name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())
  if (at < 0) return <>{name}</>
  return (
    <>
      {name.slice(0, at)}
      <mark className="rounded-sm bg-amber-200 text-zinc-950 dark:bg-amber-700 dark:text-white">{name.slice(at, at + query.length)}</mark>
      {name.slice(at + query.length)}
    </>
  )
}

export function SelectionGridFigure({ locale, children }: { locale: Locale; children?: React.ReactNode }) {
  const c = gridCopy[locale]
  const ui = c.ui
  const seen = new Set<string>()

  function Row({ row }: { row: GridRow }) {
    const name = c.names[row.code]
    const locked = row.state === 'locked'
    const faded = row.state !== 'match'
    const cell = clsx(
      'flex min-w-0 items-center border-r border-zinc-950/5 px-2.5 last:border-r-0 dark:border-white/5',
      faded && 'text-zinc-400 dark:text-zinc-500',
    )
    return (
      <div
        role="row"
        aria-selected={row.selected ?? false}
        style={{ gridTemplateColumns: TEMPLATE, height: 32 }}
        className={clsx(
          'group/row relative grid cursor-default select-none items-stretch border-b border-zinc-950/5 text-[13px] text-zinc-950 dark:border-white/5 dark:text-white',
          row.selected ? 'bg-blue-50 dark:bg-blue-950' : 'bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800',
          row.selected &&
            'z-[1] outline outline-1 -outline-offset-1 outline-zinc-400 group-data-[active]/grid:outline-2 group-data-[active]/grid:-outline-offset-2 group-data-[active]/grid:outline-blue-600',
        )}
      >
        <div
          role="gridcell"
          data-cell="tick"
          title={locked ? ui['master_data_import.grid.locked_title'] : undefined}
          className={clsx(cell, 'justify-center !px-0', locked ? 'cursor-not-allowed' : 'cursor-pointer', row.state === 'dim' && 'opacity-60')}
        >
          <Check on={row.ticked} label={name} disabled={locked} />
        </div>
        <div role="gridcell" data-cell="number" className={clsx(cell, 'whitespace-nowrap font-mono text-[12.5px] tabular-nums')}>
          {row.code}
        </div>
        <div role="gridcell" data-cell="name" className={clsx(cell, 'gap-2')}>
          <span className={clsx('min-w-0 truncate', row.ticked && 'font-medium')} title={name}>
            <Highlighted name={name} query={c.query} />
          </span>
          {/* In the name column's empty tail: inside the row, clear of the
              app's text, and the only place in a row with room. */}
          {row.pin ? <Pin n={row.pin} at="right" cancel="-ml-2" /> : null}
        </div>
        <div role="gridcell" data-cell="direction" className={clsx(cell, 'justify-between gap-1.5 whitespace-nowrap')}>
          <span className="truncate">
            {row.income
              ? ui['master_data_import.direction_summary.label.income']
              : ui['master_data_import.direction_summary.label.expense']}
          </span>
          <span
            aria-hidden
            className={clsx(
              'grid size-[18px] flex-none place-items-center rounded bg-white text-zinc-500 ring-1 ring-inset ring-zinc-950/10 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-white/15',
              // Only the cursor row shows it at rest; the others reveal it on hover.
              row.selected ? 'opacity-100' : 'opacity-0 group-hover/row:opacity-100',
            )}
          >
            <Chevron />
          </span>
        </div>
        <div role="gridcell" className={cell}>
          <span
            className={clsx(
              'truncate rounded px-1.5 text-[11.5px] font-medium',
              locked ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
            )}
          >
            {locked ? ui['master_data_import.action.skip_exact'] : ui['master_data_import.action.create']}
          </span>
        </div>
        <div role="gridcell" className={clsx(cell, !faded && 'text-zinc-500 dark:text-zinc-400')}>
          <span className="truncate">{locked ? ui['master_data_import.reason.code_exists'] : ''}</span>
        </div>
      </div>
    )
  }

  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
        <div className="bg-white p-4">
          <div className="flex min-h-0 flex-1 flex-col gap-3" style={{ height: 570 }}>
            <div className="flex min-h-0 flex-1 flex-col gap-3.5">
              {/* Subtitle + the Shortcuts button. */}
              <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
                <p className="min-w-0 flex-1 basis-80 text-[13px] text-zinc-500 dark:text-zinc-400">
                  {ui['master_data_import.grid.subtitle']}
                </p>
                <Button outline>
                  {ui['selection_grid.shortcuts']} <Kbd>?</Kbd>
                </Button>
              </div>

              {/* The search that never hides, and the one switch that does. */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
                {/* `below`, not `above`: the subtitle wraps across the full
                    width, so `above` would put these three on its text. */}
                <Pin n={1} at="below" cancel="-mr-2.5" />
                <div className="relative flex h-[34px] min-w-0 max-w-[520px] flex-1 basis-72 items-center rounded-lg bg-white pl-8 ring-1 ring-inset ring-zinc-950/10 focus-within:ring-2 focus-within:ring-blue-600 dark:bg-zinc-800 dark:ring-white/15">
                  <svg
                    className="absolute left-2.5 top-[9px] text-zinc-500 dark:text-zinc-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <circle cx="7" cy="7" r="4.5" />
                    <path d="m10.5 10.5 3 3" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    role="searchbox"
                    readOnly
                    tabIndex={-1}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label={ui['master_data_import.grid.search']}
                    placeholder={ui['master_data_import.grid.find_placeholder']}
                    value={c.query}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white"
                  />
                  <span className="whitespace-nowrap px-1.5 text-[12.5px] tabular-nums text-zinc-500 dark:text-zinc-400">
                    {c.rendered.findCount}
                  </span>
                  <span aria-hidden title={ui['selection_grid.find_prev']} className={FIND_BTN}>
                    <span className="rotate-180">
                      <Chevron />
                    </span>
                  </span>
                  <span aria-hidden title={ui['selection_grid.find_next']} className={FIND_BTN}>
                    <Chevron />
                  </span>
                  <span aria-hidden title={ui['selection_grid.find_clear']} className={clsx('mr-1 text-[15px]', FIND_BTN)}>
                    ×
                  </span>
                </div>
                <Pin n={2} at="below" cancel="-mr-2.5" />
                <Button outline>{c.rendered.untickAllMatches}</Button>
                <Pin n={3} at="below" cancel="-mr-2.5" />
                <div className="flex items-center gap-2">
                  {/* Catalyst Switch is Headless UI, which needs a client; this
                      is the markup it renders in the off state, class for class. */}
                  <span
                    role="switch"
                    aria-checked={false}
                    aria-label={ui['selection_grid.only_matches']}
                    className="group relative isolate inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition duration-200 ease-in-out bg-zinc-200 ring-1 ring-black/5 ring-inset dark:bg-white/10 dark:ring-white/15"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none relative inline-block size-4 rounded-full translate-x-0 transition duration-200 ease-in-out bg-white shadow-sm ring-1 ring-black/5"
                    />
                  </span>
                  <span className="cursor-pointer whitespace-nowrap text-[13px] text-zinc-700 dark:text-zinc-300">
                    {ui['selection_grid.only_matches']}
                  </span>
                  {/* Headless UI also renders this hidden form pair. */}
                  <span hidden style={HIDDEN_FIELD}>
                    <input hidden readOnly type="hidden" style={HIDDEN_FIELD} />
                    <input hidden readOnly type="checkbox" value="on" name="selection-grid-only-matches" style={HIDDEN_FIELD} />
                  </span>
                </div>
              </div>

              {/* The grid. */}
              <div
                data-active=""
                className="group/grid relative flex min-h-40 flex-1 flex-col overflow-hidden rounded-lg border border-zinc-950/10 dark:border-white/10"
              >
                <div role="grid" aria-label={ui['master_data_import.grid.title']} className="relative flex-1 overflow-auto overscroll-contain outline-none">
                  <div style={{ minWidth: 900 }}>
                    <div
                      role="row"
                      style={{ gridTemplateColumns: TEMPLATE, height: 34 }}
                      className="sticky top-0 z-[4] grid items-stretch border-b border-zinc-950/10 bg-zinc-50 text-xs font-medium text-zinc-500 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      <div role="columnheader" title={ui['selection_grid.select_all']} className={clsx(HEAD_CELL, 'cursor-pointer justify-center !px-0')}>
                        <Check on label={ui['selection_grid.select_all']} />
                      </div>
                      <div role="columnheader" aria-sort="ascending" className={HEAD_CELL}>
                        <span className="flex h-full min-w-0 flex-1 items-center gap-1">
                          <span className="truncate">{ui['master_data_import.field.code']}</span>
                          <span className="text-[9px] text-zinc-950 dark:text-white">▲</span>
                        </span>
                        <span aria-hidden title={c.rendered.filterCode} className={FILTER_BTN}>
                          <Chevron />
                        </span>
                      </div>
                      <div role="columnheader" aria-sort="none" className={HEAD_CELL}>
                        <span className="flex h-full min-w-0 flex-1 items-center gap-1">
                          <span className="truncate">{ui['master_data_import.field.name']}</span>
                        </span>
                      </div>
                      <div role="columnheader" aria-sort="none" className={HEAD_CELL}>
                        <span className="flex h-full min-w-0 flex-1 items-center gap-1">
                          <span className="truncate">{ui['master_data_import.field.direction']}</span>
                        </span>
                      </div>
                      <div role="columnheader" aria-sort="none" className={HEAD_CELL}>
                        <span className="flex h-full min-w-0 flex-1 items-center gap-1">
                          <span className="truncate">{ui['master_data_import.grid.col_status']}</span>
                        </span>
                        <span aria-hidden title={c.rendered.filterStatus} className={FILTER_BTN}>
                          <Chevron />
                        </span>
                      </div>
                      <div role="columnheader" aria-sort="none" className={HEAD_CELL}>
                        <span className="flex h-full min-w-0 flex-1 items-center gap-1">
                          <span className="truncate">{ui['master_data_import.grid.col_reason']}</span>
                        </span>
                      </div>
                    </div>

                    <div data-grid-body="true">
                      {ROWS.map((row) => {
                        const first = !seen.has(row.group)
                        seen.add(row.group)
                        const g = GROUPS[row.group]
                        return (
                          // A Fragment, not a <div>: the app renders the group
                          // row and the data rows as flat siblings of the grid
                          // body, and a wrapper is a structure difference.
                          <Fragment key={row.code}>
                            {first && (
                              <div
                                role="row"
                                style={{ gridTemplateColumns: GROUP_TEMPLATE, height: 32, top: 34 }}
                                className="sticky z-[2] grid cursor-default select-none items-stretch border-b border-zinc-950/10 text-[12.5px] font-semibold text-zinc-950 dark:border-white/10 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                              >
                                <div data-cell="tick" className="flex cursor-pointer items-center justify-center">
                                  <Check on label={row.group} />
                                </div>
                                <div className="flex min-w-0 items-center px-2.5">
                                  <span className="mr-2 font-mono font-medium text-zinc-500 dark:text-zinc-400">{row.group}</span>
                                  <span className="truncate" />
                                </div>
                                <div className="flex items-center justify-end px-2.5 font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
                                  {c.rendered.ofListed(g.on, g.of)}
                                </div>
                              </div>
                            )}
                            <Row row={row} />
                          </Fragment>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Where the matches are in the whole list. */}
                <div aria-hidden="true" className="pointer-events-none absolute bottom-[29px] right-0 w-2" style={{ top: 34 }}>
                  {['9.09%', '27.27%', '54.55%'].map((top) => (
                    <span key={top} className="pointer-events-auto absolute right-px h-[3px] w-1.5 cursor-pointer rounded-sm bg-amber-400" style={{ top }} />
                  ))}
                </div>

                <div className="flex min-h-[29px] flex-none flex-wrap justify-between gap-x-4 gap-y-0.5 border-t border-zinc-950/10 bg-zinc-50 px-2.5 py-[5px] text-xs text-zinc-500 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400">
                  <span>
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd> {ui['selection_grid.hint_move']} · <Kbd>{ui['selection_grid.keys.shift']}</Kbd>+<Kbd>↓</Kbd>{' '}
                    {ui['selection_grid.hint_more_rows']} · <Kbd>{ui['selection_grid.keys.space']}</Kbd> {ui['selection_grid.hint_tick']} ·{' '}
                    <Kbd>⌘</Kbd>+<Kbd>F</Kbd> {ui['selection_grid.hint_search']} · <Kbd>F2</Kbd> {ui['selection_grid.hint_name']} ·{' '}
                    <Kbd>⌥</Kbd>+<Kbd>↓</Kbd> {ui['selection_grid.hint_direction']}
                  </span>
                  <span className="whitespace-nowrap tabular-nums">{c.rendered.statusRow}</span>
                </div>
              </div>

              {/* The footer is the grid root's FOURTH child, separated by its
                  gap-3.5 — not a sibling of the root. */}
              <div className="flex flex-none flex-wrap items-center gap-x-3 gap-y-2">
                <span className="mr-auto text-sm text-zinc-500 dark:text-zinc-400">{c.rendered.tickedSummary}</span>
                {/* On the footer, not on the status line above: that line's key
                    hints fill its whole width in all three locales. */}
                <Pin n={7} at="left" cancel="-mr-3" />
                <Button plain>{ui['selection_grid.cancel']}</Button>
                <Button>{ui['selection_grid.review']}</Button>
              </div>
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
