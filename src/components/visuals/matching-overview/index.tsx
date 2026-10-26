// The Matching page's Overview tab: the period, the five tiles, the trend chart.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-10-26), class for class:
//   src/app/(app)/workspaces/[workspaceId]/matching/_components/MatchingOverview.tsx
//   src/app/(app)/workspaces/[workspaceId]/matching/_components/OverviewTrendChart.tsx
//     (the SVG geometry is the component's own arithmetic, copied; the metric
//      is "Amount", nothing hovered, no comparison window)
//   src/app/(app)/workspaces/[workspaceId]/matching/_components/ExportButton.tsx
//   src/components/date-range/date-range-filter.tsx (the closed trigger)
//
// WHY THIS SCREEN
//
//   The section's two claims a reader cannot get from prose fast are the tile
//   row (five numbers, one of which ignores the period) and the chart's layers:
//   blue auto, grey by hand, amber still open, the red backlog line. Both are
//   what the tab looks like the first time.
//
// The page has its own padding (px-8 at lg, py-8), so the crop keeps the
// content panel's p-6 plus that padding; everything inside `data-ref-root` is
// the app's MatchingOverview, which is what help-screen-css-diff compares. The
// tab strip and page title above it are left out. Data is fictional and
// consistent with itself: the still-open segments add up to the Unmatched tile,
// the backlog line ends at that same total, and 178 of 217 is the 82% shown.
//
// ⚠️ MARKERS: 1 right of the date trigger, 2 and 3 right of a tile's count, 4
// right of the chart heading, 5 above the backlog legend entry. The legend
// wraps differently per language; check with help-marker-audit in all three.

import { ArrowDownTrayIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Heading, Subheading } from '@/components/catalyst/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import { AppScreen, Figure, Pin } from '../kit'
import { LEDGER_PARTNER, matchingOverviewCopy, partnerLedgerCopy, SERIES, type Tile } from './copy'

const SCREEN_MIN_WIDTH = 760

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

const TONE: Record<Tile['tone'], string> = {
  amber: 'text-amber-600 dark:text-amber-400',
  green: 'text-green-600 dark:text-green-400',
  zinc: 'text-zinc-600 dark:text-zinc-400',
}

// ── OverviewTrendChart, static: metric "amount", nothing active ─────────────
const W = 760
const H = 240
const PAD_L = 46
const PAD_R = 12
const PAD_T = 18
const PAD_B = 40
const PLOT_W = W - PAD_L - PAD_R
const PLOT_H = H - PAD_T - PAD_B

function TrendChart({ locale }: { locale: Locale }) {
  const c = matchingOverviewCopy[locale]
  const rows = SERIES
  const rawMax = Math.max(...rows.map((r) => r.matched + r.open), ...rows.map((r) => r.backlog), 1)
  const max = rawMax
  const slot = PLOT_W / rows.length
  const barW = Math.max(3, Math.min(42, slot * 0.62))
  const baseY = PAD_T + PLOT_H
  const yOf = (v: number) => baseY - PLOT_H * (v / max)

  return (
    <div className="relative">
      <div className="mb-3 flex justify-end">
        <div
          className="inline-flex overflow-hidden rounded-md border border-zinc-300 text-xs dark:border-zinc-600"
          role="group"
          aria-label={c.metricLabel}
        >
          {c.metric.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={i === 0}
              className={`px-2.5 py-1 font-medium transition-colors ${
                i === 0
                  ? 'bg-blue-600 text-white'
                  : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={c.heading}>
        {[0.25, 0.5, 0.75, 1].map((f, fi) => (
          <g key={f}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={yOf(max * f)}
              y2={yOf(max * f)}
              className="stroke-zinc-200 dark:stroke-zinc-700"
              strokeWidth={1}
              strokeDasharray="3 4"
            />
            <text x={PAD_L - 8} y={yOf(max * f) + 3} textAnchor="end" className="fill-zinc-400 text-[9px] tabular-nums">
              {c.yLabels[fi]}
            </text>
          </g>
        ))}

        <line
          x1={PAD_L}
          x2={W - PAD_R}
          y1={baseY}
          y2={baseY}
          className="stroke-zinc-300 dark:stroke-zinc-600"
          strokeWidth={1}
        />

        <polyline
          points={rows
            .map((r, i) => {
              const cx = PAD_L + i * slot + slot / 2
              return `${cx},${baseY - PLOT_H * (r.backlog / max)}`
            })
            .join(' ')}
          fill="none"
          className="stroke-rose-500 dark:stroke-rose-400"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {rows.map((r, i) => {
          const cx = PAD_L + i * slot + slot / 2
          const x = cx - barW / 2
          const v = r.matched
          const h = Math.max(2, PLOT_H * (v / max))
          const y = baseY - h
          const hAuto = PLOT_H * (r.auto / max)
          const open = r.open
          return (
            <a key={i} href="#" className="cursor-pointer outline-none">
              <rect x={PAD_L + i * slot} y={PAD_T} width={slot} height={PLOT_H} className="fill-transparent" />
              <rect x={x} y={y} width={barW} height={h} rx={Math.min(3, barW / 2)} className="fill-zinc-400 dark:fill-zinc-500" />
              {open > 0 && (
                <rect
                  x={x}
                  y={baseY - h - PLOT_H * (open / max)}
                  width={barW}
                  height={PLOT_H * (open / max)}
                  rx={Math.min(3, barW / 2)}
                  className="fill-amber-500/90"
                />
              )}
              {hAuto > 0 && <rect x={x} y={baseY - hAuto} width={barW} height={hAuto} className="fill-blue-600" />}
              <text
                x={cx}
                y={baseY - h - PLOT_H * (open / max) - 5}
                textAnchor="middle"
                className="fill-zinc-500 text-[10px] tabular-nums"
              >
                {c.values[i]}
              </text>
              {r.runs > 0 && (
                <line
                  x1={cx - Math.min(barW, 14) / 2}
                  x2={cx + Math.min(barW, 14) / 2}
                  y1={baseY + 4}
                  y2={baseY + 4}
                  className="stroke-teal-600 dark:stroke-teal-400"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              )}
              <>
                <text x={cx} y={baseY + 18} textAnchor="middle" className="fill-zinc-500 text-[10px]">
                  {c.ticks[i]}
                </text>
                {i === 0 && (
                  <text x={cx} y={baseY + 29} textAnchor="middle" className="fill-zinc-400 text-[9px] tabular-nums">
                    {c.year}
                  </text>
                )}
              </>
            </a>
          )
        })}
      </svg>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-blue-600" />
          {c.legend.auto}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-zinc-400 dark:bg-zinc-500" />
          {c.legend.manual}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-500/90" />
          {c.legend.open}
        </span>
        <Pin n={5} at="above" cancel="-mr-4" />
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-3.5 bg-rose-500 dark:bg-rose-400" />
          {c.legend.backlog}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-3.5 bg-teal-600 dark:bg-teal-400" />
          {c.legend.runs}
        </span>
      </div>

      <div className="sr-only">
        <table>
          <caption>{c.heading}</caption>
          <thead>
            <tr>
              {c.table.th.map((th) => (
                <th key={th} scope="col">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MatchingOverviewScreen({ locale }: { locale: Locale }) {
  const c = matchingOverviewCopy[locale]
  return (
    <div className="bg-white p-6">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div data-ref-root className="space-y-8">
          <div className="relative inline-block">
              <button
                type="button"
                aria-expanded={false}
                aria-haspopup="dialog"
                className="inline-flex h-8 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-medium text-zinc-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900 dark:bg-blue-950/40 dark:text-zinc-100 dark:hover:bg-blue-900/40"
              >
                <CalendarGlyph />
                <span className="tabular-nums">{c.date}</span>
                <span aria-hidden="true" className="text-xs text-zinc-500">
                  {CHEVRON_DOWN}
              </span>
            </button>
            <Pin n={1} at="right" cancel="" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {c.tiles.map((t, i) => (
              <a
                key={t.label}
                href="#"
                className="flex flex-col rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:hover:border-zinc-600"
              >
                <p className="min-h-8 text-xs font-medium uppercase tracking-wide text-zinc-500">{t.label}</p>
                <div className="mt-auto pt-2">
                  <p className={`text-2xl font-semibold ${TONE[t.tone]}`}>
                    {t.count}
                    {i === 0 && <Pin n={2} at="right" cancel="" />}
                    {i === 3 && <Pin n={3} at="right" cancel="" />}
                  </p>
                  <p className="mt-1 min-h-4 text-xs text-zinc-500">{t.sub}</p>
                </div>
              </a>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Subheading>
                {c.heading}
                <Pin n={4} at="right" cancel="" />
              </Subheading>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-zinc-300 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <ArrowDownTrayIcon className="size-4" />
                {c.exportLabel}
              </button>
            </div>
            <div className="mt-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
              <TrendChart locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type FigureProps = { locale: Locale; children?: React.ReactNode }

export function MatchingOverviewFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={matchingOverviewCopy[locale].alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          <MatchingOverviewScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── A partner's ledger page ─────────────────────────────────────────────────
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-10-26), class for class:
//   src/app/(app)/workspaces/[workspaceId]/matching/partners/[partnerId]/page.tsx
//   src/components/layout/PageTitleRow.tsx (align center)
//   src/app/(app)/workspaces/[workspaceId]/matching/_components/ExportButton.tsx
//
// ⚠️ CROPPED UNDER THE OPEN ITEMS / ALL DOCUMENTS TABS. The Open items table
// below them needs 795px (de) at its natural width against the 704px the help
// column gives the page at 100%, so every ID and date wraps onto two lines.
// The article's list describes that table instead.
//
// MARKERS: 1 right of the back link, 2 left of Export, 3 right of the net
// balance, 4 right of the Aging heading, 5 right of the second tab.

function PartnerLedgerScreen({ locale }: { locale: Locale }) {
  const c = partnerLedgerCopy[locale]
  return (
    <div className="bg-white p-6">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
          {c.back}
        </a>
        <Pin n={1} at="right" cancel="" />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="min-w-0 flex-1 basis-56">
            <Heading>{LEDGER_PARTNER}</Heading>
          </div>
          <div className="flex max-w-full flex-wrap items-center gap-2">
            <Pin n={2} at="left" cancel="-mr-2" />
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md border border-zinc-300 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <ArrowDownTrayIcon className="size-4" />
              {c.exportLabel}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">EUR</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">
              {c.net}
              <Pin n={3} at="right" cancel="" />
            </p>
            <dl className="mt-3 space-y-1 text-xs text-zinc-500">
              {c.totals.map(([label, value]) => (
                <div key={label} className="flex justify-between"><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </div>
        </div>

        <Subheading className="mt-8">
          {c.agingTitle}
          <Pin n={4} at="right" cancel="" />
        </Subheading>
        <div className="mt-3">
          <Table>
            <TableHead>
              <TableRow>
                {c.agingHead.map((h, i) => (
                  <TableHeader key={h} className={i === 0 ? undefined : 'text-right'}>{h}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {c.agingRow.map((v, i) => (
                  <TableCell key={i} className={i === 0 ? 'font-medium' : 'text-right'}>{v}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-1 border-b border-zinc-200 dark:border-zinc-700">
          {c.tabs.map((label, i) => (
            <a
              key={label}
              href="#"
              className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium ${
                i === 0
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              {label}
            </a>
          ))}
          <Pin n={5} at="right" cancel="-ml-1" />
        </div>
      </div>
    </div>
  )
}

export function PartnerLedgerFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={partnerLedgerCopy[locale].alt}
      wide
      zoomable={locale}
      art={
        <AppScreen>
          <PartnerLedgerScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
