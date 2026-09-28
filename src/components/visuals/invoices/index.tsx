// An app screen and a diagram for the invoices article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-28,
// list-table-layout), class for class, with the real Catalyst table from the
// help mirror:
//   InvoiceTable     src/app/(app)/workspaces/[workspaceId]/invoices/_components/InvoiceListShell.tsx
//                    (the columns and the amber rail) rendered by
//                    src/components/list-view/sortable-table.tsx (tableLayout
//                    fluid) + sortable-header.tsx, text-cell.tsx (DateIdCell),
//                    copyable-id.tsx, party-cell.tsx, label-pills.tsx and
//                    label-tones.ts (orderLabelsForDisplay), amount-cell.tsx,
//                    amount-width.ts and column-sizes.ts
// It is the list of someone who can view but not edit invoices, so it has no
// selection column, in a single-company workspace (no Company column) that
// shows internal IDs. Only the table is shown, cropped out of the invoices
// page. When one of those files changes, re-copy the markup here. Data comes
// from ./copy.ts and is fictional.

import clsx from 'clsx'
import { ChevronDownIcon, ClipboardIcon } from '@heroicons/react/16/solid'
import type { Locale } from '@/lib/i18n'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/catalyst/table'
import { fill } from '../approvals/copy'
import { formatAmount } from '../format'
import { AppScreen, Figure, Pin, type Tone } from '../kit'
import { StepList, type StepOutcome } from '../StepList'
import { invoicesCopy, LABEL_TONE, type LabelKey, type ListRow } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// sortable-header.tsx HEADER_BASE and sortable-table.tsx ACCENT_CLASS and
// STICKY_TH / STICKY_TD, verbatim. Header alignment is always explicit
// (headerAlign): a <th> centres by default.
const HEADER_BASE = 'px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400'
const ACCENT_AMBER = 'shadow-[inset_3px_0_0_#f59e0b] dark:shadow-[inset_3px_0_0_#fbbf24]'
const STICKY_BASE = 'lv-sticky-end sticky right-0 z-10'
const STICKY_TH = `${STICKY_BASE} bg-zinc-50 dark:bg-[#1f1f22]`
const STICKY_TD = `${STICKY_BASE} bg-white group-hover/row:bg-zinc-50 dark:bg-zinc-900 dark:group-hover/row:bg-[#1f1f22]`

// label-tones.ts LABEL_TONE_CLASSES, AMOUNT_FLOW_CLASSES (the two flows shown)
// and TONE_PRIORITY, verbatim.
const LABEL_TONE_CLASSES: Record<Tone, string> = {
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
  emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  zinc: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
}
const AMOUNT_FLOW = { in: 'text-emerald-700 dark:text-emerald-400', out: 'text-rose-600 dark:text-rose-400' }
const TONE_PRIORITY: readonly Tone[] = ['amber', 'emerald', 'blue', 'zinc']

// column-sizes.ts: the Party and invoice Status floors, the Status share.
const PARTY_FLOOR = '11.5rem'
const STATUS_FLOOR = '9rem'
const STATUS_SHARE = '20%'

// The lists' empty-value placeholder (an em dash, from its code point, as in
// aift-web text-cell.tsx).
const EMPTY = String.fromCharCode(0x2014)

/** amount-width.ts amountColumnWidth, verbatim. */
function amountColumnWidth(formattedAmounts: string[]): string {
  const longest = formattedAmounts.reduce((max, s) => Math.max(max, [...s].length), 0)
  const rem = (longest + 2) * 0.525 + 2 + 0.5
  return `${Math.max(7, Math.ceil(rem * 4) / 4)}rem`
}

/** column-sizes.ts dateIdColumnWidth, verbatim. */
function dateIdColumnWidth(ids: string[]): string {
  const longest = ids.reduce((max, s) => Math.max(max, [...s].length), 0)
  if (longest === 0) return '7rem'
  const rem = longest * 0.45 + 1 + 2 + 0.25
  return `${Math.max(7, Math.ceil(rem * 4) / 4)}rem`
}

/** label-tones.ts orderLabelsForDisplay, verbatim (cap 3). */
function orderLabels(keys: LabelKey[], max = 3): { visible: LabelKey[]; hidden: LabelKey[] } {
  const rank = (k: LabelKey) => TONE_PRIORITY.indexOf(LABEL_TONE[k])
  const ordered = keys
    .map((k, i) => ({ k, i }))
    .sort((a, b) => rank(a.k) - rank(b.k) || a.i - b.i)
    .map((x) => x.k)
  const actions = ordered.filter((k) => LABEL_TONE[k] === 'amber').length
  const cap = Math.max(max, actions)
  const keep = ordered.length === cap + 1 ? ordered.length : cap
  return { visible: ordered.slice(0, keep), hidden: ordered.slice(keep) }
}

/** sortable-header.tsx SortButton, for a descending or an inactive column. */
function SortButton({ active, align = 'left', children }: { active: boolean; align?: 'left' | 'right'; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={clsx(
        'group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide',
        'hover:text-zinc-700 dark:hover:text-zinc-200',
        active ? 'text-zinc-700 dark:text-zinc-200' : 'text-zinc-500 dark:text-zinc-400',
        align === 'right' && 'flex-row-reverse',
      )}
    >
      <span>{children}</span>
      {active ? (
        <ChevronDownIcon className="h-3.5 w-3.5" />
      ) : (
        <span className="inline-block h-3.5 w-3.5 opacity-0 group-hover:opacity-30" />
      )}
    </button>
  )
}

/** label-pills.tsx LabelPills. */
function Labels({ labels, locale }: { labels: LabelKey[]; locale: Locale }) {
  const ui = invoicesCopy[locale].ui
  if (labels.length === 0) return <span className="text-zinc-300 dark:text-zinc-600">{EMPTY}</span>
  const { visible, hidden } = orderLabels(labels)
  const hiddenNames = hidden.map((k) => ui[`invoices.labels.${k}`]).join(', ')
  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map((k) => (
        <span
          key={k}
          className={clsx(
            'inline-flex items-center rounded-full px-2 py-0.5 text-[11px]/4 font-medium whitespace-nowrap',
            LABEL_TONE_CLASSES[LABEL_TONE[k]],
          )}
        >
          {ui[`invoices.labels.${k}`]}
        </span>
      ))}
      {hidden.length > 0 && (
        <span
          title={hiddenNames}
          aria-label={hiddenNames}
          className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[11px]/4 font-medium whitespace-nowrap text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
        >
          {fill(ui['invoices.labels.overflow_more'], { count: hidden.length })}
        </span>
      )}
    </div>
  )
}

/** copyable-id.tsx CopyableId, not yet copied. */
function CopyableId({ value, locale }: { value: string; locale: Locale }) {
  const label = fill(invoicesCopy[locale].ui['list_view.copy_id'], { id: value })
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className="group/id inline-flex max-w-full items-center gap-1 rounded font-mono text-xs tabular-nums whitespace-nowrap text-zinc-400 hover:text-zinc-700 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-blue-500 dark:hover:text-zinc-200"
    >
      <span>{value}</span>
      <ClipboardIcon
        className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/id:opacity-70 group-focus-visible/id:opacity-70"
        aria-hidden="true"
      />
    </button>
  )
}

function Row({ row, locale, marker }: { row: ListRow; locale: Locale; marker?: number }) {
  const accent = row.labels.some((k) => LABEL_TONE[k] === 'amber')
  const flow = row.direction === 'income' ? 'in' : 'out'
  return (
    <TableRow href="#" className="group/row">
      <TableCell className={clsx(accent && ACCENT_AMBER)}>
        {/* text-cell.tsx DateIdCell */}
        <div className="min-w-0">
          <div className="whitespace-nowrap text-sm text-zinc-700 tabular-nums dark:text-zinc-300">
            {row.issueDate}
            {marker ? <Pin n={marker} at="right" cancel="" /> : null}
          </div>
          <div className="mt-0.5">
            <CopyableId value={row.internalId} locale={locale} />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div style={{ minWidth: PARTY_FLOOR }}>
          {/* party-cell.tsx PartyCell, invoice number on one line */}
          <div className="min-w-0">
            <div className="line-clamp-2 wrap-anywhere text-zinc-900 dark:text-zinc-100" title={row.partner}>
              {row.partner}
            </div>
            <div className="mt-0.5 text-xs truncate font-medium text-blue-600 dark:text-blue-400" title={row.invoiceNumber}>
              {row.invoiceNumber}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div style={{ minWidth: STATUS_FLOOR }}>
          <Labels labels={row.labels} locale={locale} />
        </div>
      </TableCell>
      <TableCell className={clsx('text-right', STICKY_TD)}>
        {/* amount-cell.tsx AmountCell */}
        <span className="block">
          <span className={clsx('block whitespace-nowrap font-mono text-sm font-medium tabular-nums', AMOUNT_FLOW[flow])}>
            <span aria-hidden="true">
              {flow === 'in' ? '↑' : '↓'}{' '}
            </span>
            {formatAmount(row.amount, row.currency, locale)}
          </span>
        </span>
      </TableCell>
    </TableRow>
  )
}

function InvoiceTable({ locale }: { locale: Locale }) {
  const c = invoicesCopy[locale]
  const ui = c.ui
  const amountWidth = amountColumnWidth(c.rows.map((r) => formatAmount(r.amount, r.currency, locale)))
  const dateIdWidth = dateIdColumnWidth(c.rows.map((r) => r.internalId))
  return (
    <>
      <style>{`.lv-table-fluid table { width: 100%; } .lv-table-fluid th, .lv-table-fluid td { vertical-align: top; } .lv-table-fluid.lv-overflowing .lv-sticky-end { box-shadow: -8px 0 8px -8px rgb(0 0 0 / 0.25); }`}</style>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700 lv-table-fluid">
        <Table>
          <TableHead className="bg-zinc-50 dark:bg-zinc-800/50">
            <tr>
              <th scope="col" style={{ width: dateIdWidth }} className={clsx(HEADER_BASE, 'text-left')}>
                <div className="flex flex-col items-start gap-0.5">
                  <SortButton active>{ui['list_view.col_date']}</SortButton>
                  <SortButton active={false}>{ui['list_view.col_id']}</SortButton>
                </div>
              </th>
              <th scope="col" className={clsx(HEADER_BASE, 'text-left')}>
                {ui['list_view.col_counterparty']}
                <Pin n={2} at="right" cancel="" />
              </th>
              <th scope="col" style={{ width: STATUS_SHARE }} className={clsx(HEADER_BASE, 'text-left')}>
                {ui['list_view.col_labels']}
                <Pin n={3} at="right" cancel="" />
              </th>
              <th scope="col" style={{ width: amountWidth }} className={clsx(HEADER_BASE, 'text-right', STICKY_TH)}>
                <Pin n={4} at="left" cancel="" />
                <SortButton active={false} align="right">
                  {ui['list_view.col_amount']}
                </SortButton>
              </th>
            </tr>
          </TableHead>
          <TableBody>
            {c.rows.map((row, i) => (
              <Row key={row.invoiceNumber} row={row} locale={locale} marker={i === 0 ? 1 : undefined} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

// The table's floor (column-sizes.ts) with these IDs and amounts is about
// 47.5rem, plus the page's 2rem padding. Below that the app scrolls the table
// sideways; the figure is laid out at this width instead and zoomed on phones.
const LIST_MIN_WIDTH = 800

export function InvoiceListFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={invoicesCopy[locale].help.alt.list}
      bleed
      wide
      zoomable={locale}
      zoomWidth={LIST_MIN_WIDTH}
      art={
        <AppScreen minWidth={LIST_MIN_WIDTH}>
          {/* A crop from the middle of the invoices page (full width,
              max-w-[120rem] px-4): 16px above and below the table. */}
          <div className="mx-auto max-w-[120rem] px-4 py-4">
            <InvoiceTable locale={locale} />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── The way of an invoice (a diagram, not an app screen) ────────────────────

export function InvoiceLifecycleFigure({ locale, children }: FigureProps) {
  const c = invoicesCopy[locale]
  const ui = c.ui
  const l = c.help.lifecycle
  const label = (k: LabelKey): StepOutcome => ({ kind: 'pill', tone: LABEL_TONE[k], label: ui[`invoices.labels.${k}`] })
  return (
    <Figure
      alt={c.help.alt.lifecycle}
      art={
        <StepList
          steps={[
            { title: l.arrives, detail: l.arrivesDetail, outcomes: [label('nav'), label('no_document')] },
            { title: l.extraction, detail: l.extractionDetail, outcomes: [label('review')] },
            { title: l.duplicates, detail: l.duplicatesDetail, outcomes: [label('duplicate')] },
            { title: l.company, detail: l.companyDetail, outcomes: [label('entity_needed'), label('pick_direction')] },
            { title: l.coding, detail: l.codingDetail, outcomes: [label('unverified'), label('vat_incomplete')] },
            { title: l.approval, detail: l.approvalDetail, outcomes: [label('awaiting_approval'), label('approved')] },
            {
              title: l.paid,
              detail: l.paidDetail,
              outcomes: [{ kind: 'pill', tone: 'emerald', label: ui['invoices.matching.status_paid'] }],
            },
          ]}
          footnote={{
            text: l.footnote,
            outcomes: [{ kind: 'text', label: ui['invoices.list.status_rejected'] }, label('storno_cancelled')],
          }}
        />
      }
    >
      {children}
    </Figure>
  )
}
