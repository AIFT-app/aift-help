// An app screen and a diagram for the reports article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-22), class for
// class, with the real Catalyst components from the help mirror:
//   the report page   src/app/(app)/workspaces/[workspaceId]/reports/[reportId]/_components/
//                     ReportPage.tsx (plain mode, no drill-down open),
//                     ReportToolbar.tsx, ReportTable.tsx
//   the period        src/components/date-range/date-range-filter.tsx (closed
//                     trigger, no date-basis rail, as reports use it)
//
// ReportDrillDownFigure (origin/main, 2026-11-16, PRD report-cell-drilldown):
//   the table         .../reports/[reportId]/_components/ReportTable.tsx
//                     (matrix mode with its coverage strip, one cell active)
//   the panel         .../reports/[reportId]/_components/DrillDownPanel.tsx
//                     (DrillDownPanel, ReportingLineSection, CategoryRow,
//                     DetailItemRow with the labelling picker)
//   the value picker  src/components/category/CategoryCombobox.tsx (closed,
//                     see ../exports/ClosedCategoryPicker)
//   In the app the panel is a `fixed` overlay on the window's right edge and
//   covers the table's right-hand columns, the clicked Unassigned cell among
//   them, so the figure shows two crops of the same moment: the table with the
//   active cell, and the panel at its natural height (`relative` instead of
//   `fixed inset-y-0 right-0 z-30`, and no slide-in animation, in a 448px crop
//   on the right). Everything else is class for class.
//
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts and is fictional.
//
// The aift-web files this figure copies, one `mirrors:` line each. aift-web
// scripts/help-impact.mjs reads them to flag this figure when one changes;
// keep them current when the figure is redrawn (aift-ops/docs/help-drift-guards.md).
// mirrors: src/app/(app)/workspaces/[workspaceId]/reports/[reportId]/_components/DrillDownPanel.tsx
// mirrors: src/app/(app)/workspaces/[workspaceId]/reports/[reportId]/_components/ReportPage.tsx
// mirrors: src/app/(app)/workspaces/[workspaceId]/reports/[reportId]/_components/ReportTable.tsx
// mirrors: src/app/(app)/workspaces/[workspaceId]/reports/[reportId]/_components/ReportToolbar.tsx
// mirrors: src/components/category/CategoryCombobox.tsx
// mirrors: src/components/date-range/date-range-filter.tsx

import { ChevronDownIcon, ChevronRightIcon, FunnelIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Input } from '@/components/catalyst/input'
import { Select } from '@/components/catalyst/select'
import { ClosedCategoryPicker } from '../exports/ClosedCategoryPicker'
import { formatAmount, formatDate } from '../format'
import { AppScreen, Figure, Marker, Pin } from '../kit'
import { StepList } from '../StepList'
import { DRILL_LINE, reportsCopy, type DrillCategory, type DrillItem } from './copy'

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
            {/* Below, not left: in Geist the Hungarian "Szűrés" button ends
                less than 28px from this button, and a left pin covered it
                (help-marker-audit, 2026-09-29, PRD app-typeface-geist). */}
            <Pin n={5} at="below" cancel="-mr-2" />
            <Button>
              <PencilSquareIcon />
              {ui['reports.toolbar.edit_report']}
            </Button>
          </div>
        </div>
      </div>

      {/* ReportPage.tsx since page-layout-sweep (2026-09-29): the drill-down
          panel is an overlay, so the table wrapper is a plain block. */}
      <div className="mt-6">
        <div className="min-w-0">
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

// ── Drilling into a broken-down report's Unassigned cell ────────────────────

/** next-intl's `{name}` placeholders, filled the same way. */
function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k]))
}

/**
 * A marker for a BLOCK container (a table cell, a padded div), where kit's Pin,
 * a flex item, would open a line box of its own and move the app's layout.
 * Absolutely positioned at its static position, so it takes no space, and like
 * Pin it is `aria-hidden` + `w-0`, so help-screen-css-diff skips it.
 */
function FloatPin({ n, className }: { n: number; className: string }) {
  return (
    <span aria-hidden="true" className="absolute w-0">
      <Marker n={n} className={clsx('absolute', className)} />
    </span>
  )
}

// ReportTable.tsx numCellClass, verbatim.
function numCellClass(v: number | null, isStrong: boolean, muted: boolean): string {
  const neg = v != null && v < 0
  return [
    'py-2 px-3 text-right font-mono text-sm whitespace-nowrap',
    isStrong ? 'font-semibold' : '',
    neg ? 'text-red-600' : muted ? 'text-zinc-400' : 'text-zinc-900 dark:text-zinc-100',
  ].join(' ')
}

/** ReportTable in matrix mode: the report broken down by cost centre, with the
 *  panel open on DRILL_LINE's Unassigned cell. */
function BrokenDownTable({ locale }: { locale: Locale }) {
  const c = reportsCopy[locale]
  const ui = c.ui
  const show = (v: number) => formatAmount(v, c.currency, locale)

  // ReportTable's coverage: reporting lines only, absolute values.
  const total = (cells: number[]) => cells[0] + cells[1] + cells[2]
  const reporting = c.lines.map((l, i) => ({ l, cells: c.breakdown.cells[i] })).filter((x) => !x.l.calculated)
  const activity = reporting.reduce((a, x) => a + Math.abs(total(x.cells)), 0)
  const unassigned = reporting.reduce((a, x) => a + Math.abs(x.cells[2]), 0)
  const coverage = Math.round(((activity - unassigned) / activity) * 100)

  const cellButton = (v: number, active: boolean, pin?: number) => (
    <>
      {pin ? <FloatPin n={pin} className="top-px -left-6" /> : null}
      <button
        type="button"
        title={ui['reports.table.click_to_see_detail']}
        aria-pressed={active}
        className={[
          '-mx-1.5 rounded px-1.5 py-0.5 tabular-nums hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300',
          active ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800' : '',
        ].join(' ')}
      >
        {show(v)}
      </button>
    </>
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-2 pl-4 pr-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {ui['reports.table.col_line']}
              </th>
              {c.breakdown.values.map((name) => (
                <th key={name} className="py-2 px-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span className="block">{name}</span>
                  <button
                    type="button"
                    className="mt-0.5 block w-full text-right text-[10px] font-normal text-zinc-400 hover:text-blue-600 hover:underline focus:text-blue-600 focus:outline-none dark:text-zinc-500 dark:hover:text-blue-400"
                  >
                    {ui['reports.table.col_only_this']}
                  </button>
                </th>
              ))}
              <th className="py-2 px-3 text-right text-xs font-medium text-zinc-400">{ui['reports.table.col_unassigned']}</th>
              <th className="py-2 pl-3 pr-5 text-right text-xs font-medium text-zinc-700 dark:text-zinc-200">
                {ui['reports.table.col_total']}
              </th>
            </tr>
          </thead>
          <tbody>
            {c.lines.map((line, i) => {
              const isCalc = line.calculated
              const [a, b, none] = c.breakdown.cells[i]
              const lineTotal = total(c.breakdown.cells[i])
              const drilled = i === DRILL_LINE
              return (
                <tr
                  key={line.name}
                  className={[
                    'border-b border-zinc-100 last:border-b-0 dark:border-zinc-800',
                    isCalc ? 'border-t-2 border-t-zinc-200 bg-zinc-50 dark:border-t-zinc-700 dark:bg-zinc-800/50' : '',
                    '',
                  ].join(' ')}
                >
                  <td
                    className={[
                      'py-2 pl-4 pr-4 whitespace-nowrap',
                      isCalc ? 'text-sm font-semibold text-zinc-900 dark:text-zinc-100' : 'text-sm text-zinc-600 dark:text-zinc-400',
                    ].join(' ')}
                  >
                    {isCalc ? <span className="mr-1.5 text-xs text-zinc-400">{ui['reports.table.calculated_marker']}</span> : null}
                    {line.name}
                  </td>
                  <td className={numCellClass(a, isCalc, false)}>{cellButton(a, false)}</td>
                  <td className={numCellClass(b, isCalc, false)}>{cellButton(b, false)}</td>
                  <td className={numCellClass(none, isCalc, true)}>{cellButton(none, drilled, drilled ? 1 : undefined)}</td>
                  <td className={numCellClass(lineTotal, true, false)}>{cellButton(lineTotal, false)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-700">
        <span className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
          {fill(ui['reports.table.coverage_pct'], { pct: coverage })}
        </span>
        <span className="h-1.5 w-40 shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <span className="block h-full rounded-full bg-green-600" style={{ width: `${coverage}%` }} />
        </span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {fill(ui['reports.table.coverage_note'], { amount: show(unassigned) })}
        </span>
      </div>
    </div>
  )
}

// DrillDownPanel.tsx DetailItemRow, Invoice report, labelling on (the viewer
// may set the value), every entry with a PDF.
function DrillItemRow({ item, locale, pin }: { item: DrillItem; locale: Locale; pin?: number }) {
  const c = reportsCopy[locale]
  const ui = c.ui
  const isNegative = item.amount < 0
  return (
    <>
      <div className="flex items-start gap-2 py-1.5 pl-2 pr-1 text-xs">
        <div className="w-24 shrink-0 whitespace-nowrap text-zinc-400">{formatDate(item.date, locale)}</div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">{item.partner}</span>
          <span className="text-zinc-400">
            {ui['reports.drill_down.invoice_number_prefix']}
            {item.number}
          </span>
          <span className="truncate text-zinc-400">{item.description}</span>
        </div>
        <div
          className={['shrink-0 tabular-nums font-medium', isNegative ? 'text-red-600' : 'text-zinc-800 dark:text-zinc-200'].join(' ')}
        >
          {formatAmount(item.amount, c.currency, locale)}
        </div>
        <div className="flex shrink-0 flex-col gap-0.5">
          <button className="rounded px-1 py-0.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300">
            {ui['reports.drill_down.pdf']}
          </button>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded px-1 py-0.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
          >
            →
          </a>
        </div>
      </div>
      <div className="pb-2 pl-28 pr-1">
        {pin ? <FloatPin n={pin} className="top-[9px] -left-7" /> : null}
        <ClosedCategoryPicker value={null} placeholder={ui['category_combobox.search_placeholder']} ariaLabel={c.dimension} />
      </div>
    </>
  )
}

// DrillDownPanel.tsx CategoryRow: expanded when it carries its items.
function DrillCategoryRow({ cat, locale, pin }: { cat: DrillCategory; locale: Locale; pin?: number }) {
  const c = reportsCopy[locale]
  const ui = c.ui
  const expanded = cat.items !== undefined
  const isNegative = cat.total < 0
  return (
    <div>
      <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
        <span className="shrink-0 text-zinc-400">
          {expanded ? <ChevronDownIcon className="size-3.5" /> : <ChevronRightIcon className="size-3.5" />}
        </span>
        <span className="flex-1 text-zinc-700 dark:text-zinc-300">{cat.name}</span>
        <span className="shrink-0 text-xs text-zinc-400">{fill(ui['reports.drill_down.items_total'], { total: cat.count })}</span>
        <span
          className={['shrink-0 tabular-nums text-sm font-medium', isNegative ? 'text-red-600' : 'text-zinc-800 dark:text-zinc-200'].join(' ')}
        >
          {formatAmount(cat.total, c.currency, locale)}
        </span>
      </button>
      {expanded && (
        <div className="ml-4 space-y-0.5 border-l border-zinc-100 pl-2 dark:border-zinc-800">
          {cat.items!.map((item) => (
            <DrillItemRow key={item.number} item={item} locale={locale} pin={pin} />
          ))}
        </div>
      )}
    </div>
  )
}

/** DrillDownPanel opened on DRILL_LINE's Unassigned cell, on an Invoice report,
 *  for a viewer who may set the value. */
function DrillPanel({ locale }: { locale: Locale }) {
  const c = reportsCopy[locale]
  const ui = c.ui
  const line = c.lines[DRILL_LINE]
  const value = c.breakdown.cells[DRILL_LINE][2]
  const title = fill(ui['reports.drill_down.cell_header'], { line: line.name, column: ui['reports.table.col_unassigned'] })
  return (
    <aside aria-label={title} className="relative flex w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
        <div className="min-w-0">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
            <Pin n={2} at="right" cancel="" />
          </h2>
          <label className="mt-2 flex flex-col gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              {ui['reports.drill_down.assign_scope_label']}
              <Pin n={3} at="right" cancel="" />
            </span>
            <span className="w-full max-w-80">
              <Select defaultValue="empty_lines">
                <option value="empty_lines">{ui['reports.drill_down.assign_scope_empty_lines']}</option>
                <option value="line">{ui['reports.drill_down.assign_scope_line']}</option>
              </Select>
            </span>
          </label>
        </div>
        <button aria-label={ui['common.close']} className="ml-3 rounded p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
          <XMarkIcon className="size-5" />
        </button>
      </div>

      {/* Body: ReportingLineSection, auto-expanded */}
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <div>
          <button className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <span className="shrink-0 text-zinc-400">
              <ChevronDownIcon className="size-4" />
            </span>
            <span className="flex-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">{line.name}</span>
            <span
              className={['tabular-nums text-sm font-semibold', value < 0 ? 'text-red-600' : 'text-zinc-900 dark:text-zinc-100'].join(' ')}
            >
              {formatAmount(value, c.currency, locale)}
            </span>
          </button>
          <div className="ml-4 space-y-0.5 border-l border-zinc-100 pl-2 dark:border-zinc-800">
            {c.drill.map((cat, i) => (
              <DrillCategoryRow key={cat.name} cat={cat} locale={locale} pin={i === 0 ? 4 : undefined} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

// The narrowest desktop figure (1024px window). The matrix is 754px wide in
// English (734 hu, 734 de at this width), inside the 6px crop; below this
// width phones lay the screen out here and zoom.
const MATRIX_MIN_WIDTH = 768
/** DrillDownPanel's max-w-md. */
const PANEL_WIDTH = 448

export function ReportDrillDownFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={reportsCopy[locale].help.alt.drill}
      bleed
      wide
      zoomable={locale}
      zoomWidth={MATRIX_MIN_WIDTH}
      art={
        <div className="flex flex-col gap-3">
          <AppScreen minWidth={MATRIX_MIN_WIDTH}>
            {/* A tight crop, 6px at the sides: the English table is 754px
                wide and must show at 100% in a 768px figure (1024px window). */}
            <div className="px-1.5 py-2">
              <BrokenDownTable locale={locale} />
            </div>
          </AppScreen>
          <div className="ml-auto w-full max-w-md">
            <AppScreen minWidth={PANEL_WIDTH}>
              <DrillPanel locale={locale} />
            </AppScreen>
          </div>
        </div>
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
