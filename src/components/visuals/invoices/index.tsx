// An app screen and a diagram for the invoices article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-28,
// list-table-layout; header re-copied 2026-11-23, invoice-list-sort: the
// chevron on the ID, Partner over the invoice number), class for class, with
// the real Catalyst table from the help mirror:
//   InvoiceTable     src/app/(app)/workspaces/[workspaceId]/invoices/_components/InvoiceListShell.tsx
//                    (the columns and the amber rail) rendered by
//                    src/components/list-view/sortable-table.tsx (tableLayout
//                    fluid) + sortable-header.tsx, text-cell.tsx (DateIdCell),
//                    copyable-id.tsx, party-cell.tsx, label-pills.tsx and
//                    label-tones.ts (orderLabelsForDisplay), amount-cell.tsx,
//                    amount-width.ts and column-sizes.ts
//   SourceMark       src/components/list-view/source-mark.tsx (sm), with
//                    invoices/_components/AttachPdfRowAction.tsx in the empty
//                    PDF slot (re-copied 2026-11-25, invoice-source-mark)
//   RowControls      invoices/_components/RowAttachControls.tsx (canAttach) and
//                    AttachmentCount.tsx, at the end of the Amount cell, whose
//                    column is the amount width + 5rem (InvoiceListShell.tsx)
// It is the list of someone who can view and upload but not edit invoices
// (upload_documents without edit_invoices, a client member's default role), so
// it has no selection column but has the attach button in an empty PDF slot
// and the ⋯ menu on every row; in a single-company workspace (no Company
// column) that shows internal IDs. ./export.tsx reuses InvoiceTable with the
// selection column an editor sees (recategorize-ui.tsx RowSelectCheckbox,
// SelectAllCheckbox; column-sizes.ts SELECT_COLUMN_REM); an editor can upload
// too, so the row controls are the same. Only the table is shown, cropped out
// of the invoices page. When one of those files changes, re-copy the markup
// here. Data comes from ./copy.ts and is fictional.
//
// The aift-web files this figure copies, one `mirrors:` line each. aift-web
// scripts/help-impact.mjs reads them to flag this figure when one changes;
// keep them current when the figure is redrawn (aift-ops/docs/help-drift-guards.md).
// mirrors: src/app/(app)/workspaces/[workspaceId]/invoices/_components/AttachPdfRowAction.tsx
// mirrors: src/app/(app)/workspaces/[workspaceId]/invoices/_components/AttachmentCount.tsx
// mirrors: src/app/(app)/workspaces/[workspaceId]/invoices/_components/InvoiceListShell.tsx
// mirrors: src/app/(app)/workspaces/[workspaceId]/invoices/_components/RowAttachControls.tsx
// mirrors: src/app/(app)/workspaces/[workspaceId]/invoices/page.tsx
// mirrors: src/components/date-range/date-range-filter.tsx
// mirrors: src/components/document-export/DocumentExportButton.tsx
// mirrors: src/components/document-export/runner.ts
// mirrors: src/components/layout/PageTitleRow.tsx
// mirrors: src/components/list-view/sortable-table.tsx
// mirrors: src/components/list-view/source-mark.tsx
// mirrors: src/components/recategorize/recategorize-ui.tsx
// mirrors: src/components/ui/segmented.tsx
// mirrors: src/components/upload-queue/UploadButton.tsx
// mirrors: src/lib/document-export/naming.ts
// mirrors: src/lib/document-export/types.ts

import clsx from 'clsx'
import { DocumentKindGlyph } from '../DocumentKindGlyph'
import { ArrowUpTrayIcon, ChevronDownIcon, ClipboardIcon, PaperClipIcon } from '@heroicons/react/16/solid'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Checkbox } from '@/components/catalyst/checkbox'
import { Dropdown, DropdownButton } from '@/components/catalyst/dropdown'
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
const PARTY_FLOOR = '10.5rem'
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

/**
 * sortable-header.tsx SortButton, for a descending or an inactive column.
 * `pin` is a marker placed after the chevron slot, inside the button's own
 * flex row (its gap-1 cancelled), so it stands beside a stacked header line.
 */
function SortButton({ active, align = 'left', pin, children }: { active: boolean; align?: 'left' | 'right'; pin?: React.ReactNode; children: React.ReactNode }) {
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
      {pin}
    </button>
  )
}

/** source-mark.tsx SourceMark (sm), with AttachPdfRowAction in the empty PDF slot. */
function SourceMark({ nav, document, invoiceLabel, locale }: { nav: boolean; document: boolean; invoiceLabel: string; locale: Locale }) {
  const ui = invoicesCopy[locale].ui
  const title = nav && document
    ? ui['invoices.labels.source_both']
    : nav ? ui['invoices.labels.source_nav_only'] : document ? ui['invoices.labels.source_document_only'] : undefined
  const tag = (text: string) => (
    <span className="h-4 w-7 rounded text-[9.5px] inline-flex items-center justify-center font-semibold tracking-[0.03em] text-zinc-600 ring-1 ring-zinc-300 ring-inset dark:text-zinc-300 dark:ring-zinc-600">
      {text}
    </span>
  )
  const empty = <span className="h-4 w-7 rounded text-[9.5px]" aria-hidden="true" />
  return (
    <span className="inline-grid shrink-0 items-center grid-cols-[1.75rem_1.75rem] gap-[3px]" title={title}>
      {title && <span className="sr-only">{title}</span>}
      <span aria-hidden="true" className="inline-flex">{nav ? tag(ui['invoices.labels.source_nav']) : empty}</span>
      {document ? (
        <span aria-hidden="true" className="inline-flex">{tag(ui['invoices.labels.source_document'])}</span>
      ) : (
        <span className="inline-flex">
          {/* AttachPdfRowAction.tsx */}
          <span className="inline-flex shrink-0">
            <button
              type="button"
              title={fill(ui['invoices.list.attach_pdf_title'], { invoice: invoiceLabel })}
              aria-label={fill(ui['invoices.list.attach_pdf_title'], { invoice: invoiceLabel })}
              className="relative inline-flex h-4 w-7 items-center justify-center rounded border border-dashed border-zinc-400 text-zinc-500 before:absolute before:-inset-x-2 before:-inset-y-3.5 before:content-[''] hover:border-solid hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-500 dark:text-zinc-400 dark:hover:border-blue-400 dark:hover:bg-blue-500/15 dark:hover:text-blue-200"
            >
              <ArrowUpTrayIcon className="size-3" aria-hidden="true" />
            </button>
            <input type="file" className="sr-only" tabIndex={-1} />
          </span>
        </span>
      )}
    </span>
  )
}

/** label-pills.tsx LabelPills, with the source mark as its `leading`. */
function Labels({ labels, sources, invoiceLabel, locale }: { labels: LabelKey[]; sources: ListRow['sources']; invoiceLabel: string; locale: Locale }) {
  const ui = invoicesCopy[locale].ui
  const leading = <SourceMark nav={sources.nav} document={sources.document} invoiceLabel={invoiceLabel} locale={locale} />
  if (labels.length === 0) return <div className="flex items-center">{leading}</div>
  const { visible, hidden } = orderLabels(labels)
  const hiddenNames = hidden.map((k) => ui[`invoices.labels.${k}`]).join(', ')
  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="inline-flex min-h-6 shrink-0 items-center">{leading}</span>
      {visible.map((k) => (
        <span
          key={k}
          className={clsx(
            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]/4 font-medium whitespace-nowrap',
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

/**
 * RowAttachControls.tsx for a viewer who may attach (canAttach): the
 * attachment count in its two-digit slot (AttachmentCount.tsx), then the ⋯
 * menu, closed (the figure is inert, so it never opens).
 */
function RowControls({ invoiceLabel, count, locale }: { invoiceLabel: string; count: number; locale: Locale }) {
  const ui = invoicesCopy[locale].ui
  const countLabel = fill(ui['invoices.list.attachment_count'], { count })
  return (
    <span className="inline-flex w-[4.75rem] shrink-0 items-center justify-end gap-1">
      <span hidden data-row-drop="" />
      {count > 0 ? (
        <button
          type="button"
          aria-label={countLabel}
          title={countLabel}
          className="inline-flex w-10 h-8 shrink-0 cursor-pointer items-center justify-end gap-0.5 rounded-md pr-1 text-xs text-zinc-500 tabular-nums hover:bg-zinc-200/70 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
        >
          <PaperClipIcon className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="text-zinc-700 dark:text-zinc-200">{count > 99 ? '99+' : count}</span>
        </button>
      ) : (
        <span className="inline-block w-10 shrink-0" aria-hidden="true" />
      )}
      <span className="inline-flex w-8 shrink-0 justify-center">
        <Dropdown>
          <DropdownButton
            as="button"
            aria-label={fill(ui['invoices.list.row_actions'], { invoice: invoiceLabel })}
            className="inline-flex size-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900 focus:outline-none data-focus:outline-2 data-focus:outline-blue-500 max-sm:-mx-1.5 max-sm:size-11 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
          >
            <EllipsisHorizontalIcon className="size-5" />
          </DropdownButton>
        </Dropdown>
      </span>
      <input type="file" className="sr-only" tabIndex={-1} />
      <input type="file" multiple className="sr-only" tabIndex={-1} />
    </span>
  )
}

// recategorize-ui.tsx CELL_HIT, verbatim (the selection column).
const CELL_HIT =
  '-mx-4 -my-3 flex cursor-pointer items-center justify-center px-4 py-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-blue-500'
// column-sizes.ts SELECT_COLUMN_REM.
const SELECT_COLUMN = '2.75rem'

function Row({ row, locale, marker, selected, showIds }: { row: ListRow; locale: Locale; marker?: number; selected?: boolean; showIds: boolean }) {
  const ui = invoicesCopy[locale].ui
  const accent = row.labels.some((k) => LABEL_TONE[k] === 'amber')
  const flow = row.direction === 'income' ? 'in' : 'out'
  const selectable = selected !== undefined
  return (
    <TableRow href="#" className="group/row">
      {selectable ? (
        // recategorize-ui.tsx RowSelectCheckbox. The amber rail sits on the
        // first cell (sortable-table.tsx renderCells), here the checkbox.
        <TableCell className={clsx(accent && ACCENT_AMBER)}>
          <span role="checkbox" aria-checked={selected} aria-label={ui['recategorize.selectRow']} className={CELL_HIT}>
            <Checkbox checked={selected} tabIndex={-1} aria-hidden className="pointer-events-none" />
          </span>
        </TableCell>
      ) : null}
      <TableCell className={clsx(!selectable && accent && ACCENT_AMBER)}>
        {/* text-cell.tsx DateIdCell */}
        <div className="min-w-0">
          <div className="whitespace-nowrap text-sm text-zinc-700 tabular-nums dark:text-zinc-300">
            {row.issueDate}
            {marker ? <Pin n={marker} at="right" cancel="" /> : null}
          </div>
          {showIds && (
            <div className="mt-0.5">
              <CopyableId value={row.internalId} locale={locale} />
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div style={{ minWidth: PARTY_FLOOR }}>
          {/* party-cell.tsx PartyCell with `leading`: the document-kind glyph
              (document-kind-icons), then the block, invoice number on one line */}
          <div className="flex min-w-0 items-start gap-2">
            <span className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500">
              <DocumentKindGlyph kind="invoice" label={ui['document_kind.invoice']} size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="line-clamp-2 wrap-anywhere text-zinc-900 dark:text-zinc-100" title={row.partner}>
                {row.partner}
              </div>
              <div className="mt-0.5 text-xs truncate font-medium text-blue-600 dark:text-blue-400" title={row.invoiceNumber}>
                {row.invoiceNumber}
              </div>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div style={{ minWidth: STATUS_FLOOR }}>
          <Labels labels={row.labels} sources={row.sources} invoiceLabel={row.invoiceNumber} locale={locale} />
        </div>
      </TableCell>
      <TableCell className={clsx('text-right', STICKY_TD)}>
        {/* InvoiceListShell.tsx amount column: AmountCell, then RowAttachControls */}
        <div className="flex items-center justify-end gap-1">
          {/* amount-cell.tsx AmountCell */}
          <span className="block">
            <span className={clsx('block whitespace-nowrap font-mono text-sm font-medium tabular-nums', AMOUNT_FLOW[flow])}>
              <span aria-hidden="true">
                {flow === 'in' ? '↑' : '↓'}{' '}
              </span>
              {formatAmount(row.amount, row.currency, locale)}
            </span>
          </span>
          <RowControls invoiceLabel={row.invoiceNumber} count={row.attachments ?? 0} locale={locale} />
        </div>
      </TableCell>
    </TableRow>
  )
}

/**
 * The list. Without `selected` it is the list of someone who can view but not
 * edit invoices (no selection column) with the header markers 2-4; with it,
 * an editor's list with those rows ticked and no header markers. `showIds`
 * false is a workspace that does not show internal IDs: no ID line under the
 * date, the date column at its 7rem floor, and the list sorted by date
 * (invoices/page.tsx DEFAULTS), so the date header is a plain SortableHeader.
 */
export function InvoiceTable({
  locale,
  rows,
  selected,
  marker = { row: 0, n: 1 },
  showIds = true,
}: {
  locale: Locale
  rows?: ListRow[]
  selected?: boolean[]
  marker?: { row: number; n: number }
  showIds?: boolean
}) {
  const c = invoicesCopy[locale]
  const ui = c.ui
  const list = rows ?? c.rows
  const headerPins = !selected
  const allOn = !!selected && selected.every(Boolean)
  const someOn = !!selected && selected.some(Boolean)
  // InvoiceListShell.tsx: the longest amount plus the row controls (4.75rem) and their gap.
  const amountWidth = `calc(${amountColumnWidth(list.map((r) => formatAmount(r.amount, r.currency, locale)))} + 5rem)`
  const dateIdWidth = dateIdColumnWidth(showIds ? list.map((r) => r.internalId) : [])
  return (
    <>
      <style>{`.lv-table-fluid table { width: 100%; } .lv-table-fluid th, .lv-table-fluid td { vertical-align: top; } .lv-table-fluid.lv-overflowing .lv-sticky-end { box-shadow: -8px 0 8px -8px rgb(0 0 0 / 0.25); }`}</style>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700 lv-table-fluid">
        <Table>
          <TableHead className="bg-zinc-50 dark:bg-zinc-800/50">
            <tr>
              {selected ? (
                // recategorize-ui.tsx SelectAllCheckbox, in a plain header cell.
                <th scope="col" style={{ width: SELECT_COLUMN }} className={clsx(HEADER_BASE, 'text-left')}>
                  <span role="checkbox" aria-checked={allOn ? true : someOn ? 'mixed' : false} aria-label={ui['recategorize.selectAll']} className={CELL_HIT}>
                    <Checkbox checked={allOn} indeterminate={someOn && !allOn} tabIndex={-1} aria-hidden className="pointer-events-none" />
                  </span>
                </th>
              ) : null}
              <th scope="col" style={{ width: dateIdWidth }} className={clsx(HEADER_BASE, 'text-left')}>
                {showIds ? (
                  // invoice-list-sort: the list opens with the newest ID first.
                  <div className="flex flex-col items-start gap-0.5">
                    <SortButton active={false}>{ui['list_view.col_date']}</SortButton>
                    <SortButton active>{ui['list_view.col_id']}</SortButton>
                  </div>
                ) : (
                  // Without IDs it opens with the newest date first.
                  <SortButton active>{ui['list_view.col_date']}</SortButton>
                )}
              </th>
              <th scope="col" className={clsx(HEADER_BASE, 'text-left')}>
                {/* invoice-list-sort: Partner, with the invoice number on the second line. */}
                <div className="flex flex-col items-start gap-0.5">
                  <SortButton active={false} pin={headerPins ? <Pin n={2} at="right" cancel="-ml-1" /> : undefined}>
                    {ui['list_view.col_counterparty']}
                  </SortButton>
                  <SortButton active={false}>{ui['list_view.col_invoice_number']}</SortButton>
                </div>
              </th>
              <th scope="col" style={{ width: STATUS_SHARE }} className={clsx(HEADER_BASE, 'text-left')}>
                {ui['list_view.col_labels']}
                {headerPins ? <Pin n={3} at="right" cancel="" /> : null}
              </th>
              <th scope="col" style={{ width: amountWidth }} className={clsx(HEADER_BASE, 'text-right', STICKY_TH)}>
                {headerPins ? <Pin n={4} at="left" cancel="" /> : null}
                <SortButton active={false} align="right">
                  {/* The header stands above the amount, not above the controls beside it. */}
                  <span className="pr-20">{ui['list_view.col_amount']}</span>
                </SortButton>
              </th>
            </tr>
          </TableHead>
          <TableBody>
            {list.map((row, i) => (
              <Row
                key={row.invoiceNumber}
                row={row}
                locale={locale}
                marker={i === marker.row ? marker.n : undefined}
                selected={selected ? selected[i] : undefined}
                showIds={showIds}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

// The table's floor (column-sizes.ts) with these IDs and amounts and the row
// controls is 800.02px (en; hu and de 792, measured on the real table), plus the
// page's 2rem padding. Below that the app scrolls the table sideways; the
// figure is laid out at this width instead and zoomed where the article column
// is narrower (816px at a 1280px window, 98%; 848px from 1366px, 100%).
const LIST_MIN_WIDTH = 834

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
            { title: l.arrives, detail: l.arrivesDetail, outcomes: [
              // invoice-source-mark: square ring tags, not label pills.
              { kind: 'source', label: ui['invoices.labels.source_nav'] },
              { kind: 'source', label: ui['invoices.labels.source_document'] },
            ] },
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
