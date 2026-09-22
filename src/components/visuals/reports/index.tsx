// An app screen and a diagram for the reports article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-22), class for
// class, with the real Catalyst components from the help mirror:
//   the report page   src/app/(app)/workspaces/[workspaceId]/reports/[reportId]/_components/
//                     ReportPage.tsx (plain mode, no drill-down open),
//                     ReportToolbar.tsx, ReportTable.tsx
//   the period        src/components/date-range/date-range-filter.tsx (closed
//                     trigger, no date-basis rail, as reports use it)
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts and is fictional.

import { FunnelIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/catalyst/input'
import { formatAmount } from '../format'
import { AppScreen, Figure, Pin } from '../kit'
import { StepList } from '../StepList'
import { reportsCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// date-range-filter.tsx CalendarGlyph and GLYPH.chevronDown, verbatim.
function CalendarGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4 text-blue-600 dark:text-blue-400">
      <path
        fillRule="evenodd"
        d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2ZM4.75 5.5c-.69 0-1.25.56-1.25 1.25V8h13V6.75c0-.69-.56-1.25-1.25-1.25H4.75Zm11.75 4h-13v5.75c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9.5Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
const CHEVRON_DOWN = '▾'

// Which lines carry a marker.
const LINE_MARKERS: Record<number, number> = { 0: 3, 2: 4 }

function ReportPage({ locale }: { locale: Locale }) {
  const c = reportsCopy[locale]
  const ui = c.ui
  return (
    <div className="flex min-h-0 flex-col">
      {/* ReportToolbar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <a className="hover:text-zinc-700 dark:hover:text-zinc-300">{ui['reports.toolbar.breadcrumb_reports']}</a>
          <span>{ui['reports.toolbar.breadcrumb_separator']}</span>
          <span className="text-zinc-900 dark:text-zinc-100">{c.reportName}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative inline-block">
            <button
              type="button"
              aria-expanded={false}
              aria-haspopup="dialog"
              className="inline-flex h-8 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-medium text-zinc-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900 dark:bg-blue-950/40 dark:text-zinc-100 dark:hover:bg-blue-900/40"
            >
              <CalendarGlyph />
              <span className="tabular-nums">{ui['date_filter.rolling_this_year']}</span>
              <span aria-hidden="true" className="text-xs text-zinc-500">
                {CHEVRON_DOWN}
              </span>
            </button>
          </div>
          <Pin n={1} at="below" cancel="-ml-2" />

          <div className="w-44">
            <Input readOnly value="" placeholder={ui['reports.toolbar.search_lines_placeholder']} />
          </div>

          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-xs text-zinc-500">{ui['reports.toolbar.break_down_by']}</span>
            <select
              defaultValue=""
              className="rounded-lg border border-zinc-400 bg-white px-2.5 py-1.5 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-500"
            >
              <option value="">{ui['reports.toolbar.break_down_none']}</option>
              <option value="d1">{c.dimension}</option>
            </select>
          </div>
          <Pin n={2} at="below" cancel="-ml-2" />

          {/* Headless Popover: a div around the PopoverButton. */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={false}
              className={[
                'inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500',
                'border border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200',
              ].join(' ')}
            >
              <FunnelIcon className="size-3.5" />
              {ui['reports.toolbar.filter']}
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Pin n={5} at="left" cancel="-mr-2" />
            <Button>
              <PencilSquareIcon />
              {ui['reports.toolbar.edit_report']}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-6">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
            <label className="flex items-center gap-1.5">
              <span>{ui['reports.display.label']}</span>
              <select
                defaultValue=""
                className="rounded-lg border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-800"
              >
                <option value="">{ui['reports.display.inherit_base']}</option>
              </select>
            </label>
          </div>

          {/* ReportTable, plain mode */}
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
            <table className="w-full">
              <tbody>
                {c.lines.map((line, i) => {
                  const isNegative = line.value < 0
                  const marker = LINE_MARKERS[i]
                  return (
                    <tr
                      key={line.name}
                      className={[
                        'border-b border-zinc-100 last:border-b-0 cursor-pointer transition-opacity dark:border-zinc-800',
                        line.calculated
                          ? 'border-t-2 border-t-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-t-zinc-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800'
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
                        '',
                        '',
                      ].join(' ')}
                      title={ui['reports.table.click_to_see_detail']}
                    >
                      <td className={['py-2 pr-4', line.calculated ? 'pl-4' : 'pl-8'].join(' ')}>
                        <span
                          className={[
                            line.calculated
                              ? 'text-sm font-semibold text-zinc-900 dark:text-zinc-100'
                              : 'text-sm text-zinc-600 dark:text-zinc-400',
                            '',
                          ].join(' ')}
                        >
                          {line.calculated ? (
                            <span className="mr-1.5 text-xs text-zinc-400">{ui['reports.table.calculated_marker']}</span>
                          ) : null}
                          {line.name}
                          {marker ? <Pin n={marker} at="right" cancel="" /> : null}
                        </span>
                      </td>
                      <td
                        className={[
                          'w-40 py-2 pl-4 pr-5 text-right font-mono text-sm',
                          line.calculated ? 'font-semibold' : '',
                          isNegative ? 'text-red-600' : 'text-zinc-900 dark:text-zinc-100',
                        ].join(' ')}
                      >
                        {formatAmount(line.value, c.currency, locale)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// The toolbar wraps onto two lines below this width.
const REPORT_MIN_WIDTH = 768

export function ReportPageFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={reportsCopy[locale].help.alt.page}
      bleed
      wide
      zoomable={locale}
      zoomWidth={REPORT_MIN_WIDTH}
      art={
        <AppScreen minWidth={REPORT_MIN_WIDTH}>
          {/* The report page has no padding of its own (the app's content panel
              pads it): cut 32px above and below, 16px at the sides. */}
          <div className="px-4 py-8">
            <ReportPage locale={locale} />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── How a report is built (a diagram, not an app screen) ────────────────────

export function ReportStructureFigure({ locale, children }: FigureProps) {
  const c = reportsCopy[locale]
  const ui = c.ui
  const s = c.help.structure
  return (
    <Figure
      alt={c.help.alt.structure}
      art={
        <StepList
          steps={[
            { title: s.categories, detail: s.categoriesDetail },
            { title: s.lines, detail: s.linesDetail, outcomes: [{ kind: 'text', label: ui['reports.line_row.categories'] }] },
            {
              title: s.calculated,
              detail: s.calculatedDetail,
              outcomes: [
                { kind: 'text', label: ui['reports.table.calculated_marker'] },
                { kind: 'text', label: ui['reports.line_row.formula'] },
              ],
            },
            { title: s.report, detail: s.reportDetail, outcomes: [{ kind: 'text', label: ui['reports.toolbar.break_down_by'] }] },
          ]}
          footnote={{ text: s.footnote }}
        />
      }
    >
      {children}
    </Figure>
  )
}
