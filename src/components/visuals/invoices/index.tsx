// An app screen and a diagram for the invoices article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-21), class for
// class, with the real Catalyst table from the help mirror:
//   InvoiceTable     src/app/(app)/workspaces/[workspaceId]/invoices/_components/InvoiceListShell.tsx
//                    (the columns and the amber rail) rendered by
//                    src/components/list-view/sortable-table.tsx (tableLayout
//                    fixed) + sortable-header.tsx, party-cell.tsx,
//                    label-pills.tsx, amount-cell.tsx and amount-width.ts
// It is the list of someone who can view but not edit invoices, so it has no
// selection column, and a workspace that does not show internal IDs. Only the
// table is shown, cropped out of the invoices page (max-w-6xl px-4). When one
// of those files changes, re-copy the markup here. Data comes from ./copy.ts
// and is fictional.

import clsx from 'clsx'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import type { Locale } from '@/lib/i18n'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/catalyst/table'
import { fill } from '../approvals/copy'
import { formatAmount } from '../format'
import { AppScreen, Figure, Pill, Pin } from '../kit'
import { StepList, type StepOutcome } from '../StepList'
import { invoicesCopy, LABEL_TONE, type LabelKey, type ListRow } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// sortable-table.tsx HEADER_BASE and ACCENT_CLASS, verbatim.
const HEADER_BASE = 'px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400'
const ACCENT_AMBER = 'shadow-[inset_3px_0_0_#f59e0b] dark:shadow-[inset_3px_0_0_#fbbf24]'

// label-tones.ts AMOUNT_FLOW_CLASSES, for the two flows shown.
const AMOUNT_FLOW = { in: 'text-emerald-700 dark:text-emerald-400', out: 'text-rose-600 dark:text-rose-400' }

/** amount-width.ts amountColumnWidth, verbatim. */
function amountColumnWidth(formattedAmounts: string[]): string {
  const longest = formattedAmounts.reduce((max, s) => Math.max(max, [...s].length), 0)
  const rem = (longest + 2) * 0.525 + 2 + 0.5
  return `${Math.max(7, Math.ceil(rem * 4) / 4)}rem`
}

/** SortableHeader for a column the list is not sorted by (no chevron yet). */
function SortHeader({
  active,
  align = 'left',
  className,
  width,
  marker,
  children,
}: {
  active: boolean
  align?: 'left' | 'right'
  className?: string
  width?: string
  marker?: number
  children: React.ReactNode
}) {
  return (
    <th
      scope="col"
      style={width ? { width } : undefined}
      className={clsx(
        'px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400',
        align === 'right' && 'text-right',
        className,
      )}
    >
      {marker ? <Pin n={marker} at="left" cancel="" /> : null}
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
    </th>
  )
}

function Labels({ labels, locale }: { labels: LabelKey[]; locale: Locale }) {
  const ui = invoicesCopy[locale].ui
  if (labels.length === 0) return <span className="text-zinc-300 dark:text-zinc-600">—</span>
  const visible = labels.slice(0, 3)
  const overflow = labels.length - visible.length
  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map((k) => (
        <Pill key={k} tone={LABEL_TONE[k]}>
          {ui[`invoices.labels.${k}`]}
        </Pill>
      ))}
      {overflow > 0 && (
        <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {fill(ui['invoices.labels.overflow_more'], { count: overflow })}
        </span>
      )}
    </div>
  )
}

function Row({ row, locale }: { row: ListRow; locale: Locale }) {
  const accent = row.labels.some((k) => LABEL_TONE[k] === 'amber')
  const flow = row.direction === 'income' ? 'in' : 'out'
  return (
    <TableRow href="#">
      <TableCell className={clsx('w-[12%]', accent && ACCENT_AMBER)}>
        <span className="block truncate whitespace-nowrap text-zinc-700 dark:text-zinc-300">{row.issueDate}</span>
      </TableCell>
      <TableCell>
        <div className="min-w-0">
          <div className="truncate text-zinc-900 dark:text-zinc-100">{row.partner}</div>
          <div className="truncate text-xs font-medium text-blue-600 dark:text-blue-400">{row.invoiceNumber}</div>
        </div>
      </TableCell>
      <TableCell className="w-[20%]">
        <Labels labels={row.labels} locale={locale} />
      </TableCell>
      <TableCell className="text-right">
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
  return (
    <>
      <style>{`.lv-table-fixed table { table-layout: fixed; width: 100%; }`}</style>
      <div className="lv-table-fixed overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
        <Table>
          <TableHead className="bg-zinc-50 dark:bg-zinc-800/50">
            <tr>
              <SortHeader active className="w-[12%]">
                {ui['list_view.col_date']}
              </SortHeader>
              <th scope="col" className={HEADER_BASE}>
                {ui['list_view.col_counterparty']}
                <Pin n={1} at="right" cancel="" />
              </th>
              <th scope="col" className={clsx(HEADER_BASE, 'w-[20%]')}>
                {ui['list_view.col_labels']}
                <Pin n={2} at="right" cancel="" />
              </th>
              <SortHeader active={false} align="right" width={amountWidth} marker={3}>
                {ui['list_view.col_amount']}
              </SortHeader>
            </tr>
          </TableHead>
          <TableBody>
            {c.rows.map((row) => (
              <Row key={row.invoiceNumber} row={row} locale={locale} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

// Under table-layout fixed the Partner column takes what is left, so at 640px
// the partner names truncate to a few words. Laid out wider on phones, like
// the approval queue.
const LIST_MIN_WIDTH = 768

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
          {/* A crop from the middle of the invoices page (max-w-6xl px-4):
              16px above and below the table. */}
          <div className="mx-auto max-w-6xl px-4 py-4">
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
