// Illustrations for the approving-invoices article. Each one is drawn from
// the app's real screen (aift-web approvals/_components/ApprovalQueue.tsx,
// components/approvals/DeclineDialog.tsx) and quotes its real labels via
// ./copy.ts. When those components change shape, change these too.

import clsx from 'clsx'
import { EnvelopeIcon } from '@heroicons/react/16/solid'
import type { Locale } from '@/lib/i18n'
import { formatAmount, formatDate } from '../format'
import { AppWindow, Checkbox, Chip, FakeButton, FakeDialog, Figure, Marker } from '../kit'
import { StateFlow } from '../StateFlow'
import { approvalsCopy, STATE_TONE, whyText, type QueueRow } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// ── The queue ───────────────────────────────────────────────────────────────

function QueueRowView({
  row,
  locale,
  annotate,
  selected = false,
}: {
  row: QueueRow
  locale: Locale
  annotate: boolean
  selected?: boolean
}) {
  const c = approvalsCopy[locale]
  return (
    <li
      className={clsx(
        'flex flex-col gap-2 px-3 py-2.5 @min-[42rem]:flex-row @min-[42rem]:items-start @min-[42rem]:gap-3',
        row.soon && 'shadow-[inset_3px_0_0_#f59e0b]',
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="pt-0.5">
          <Checkbox checked={selected} />
        </div>
        <div className="min-w-0 flex-1">
          {/* The app truncates the summary to one line. A help drawing must
              keep the headline readable in three languages at every width, so
              it wraps to at most two lines beside the amount, and below 42rem
              the amount and buttons stack under it. */}
          <div className="flex flex-col gap-0.5 @min-[42rem]:flex-row @min-[42rem]:items-baseline @min-[42rem]:gap-3">
            <span className="flex min-w-0 flex-1 items-center gap-1.5">
              {annotate ? <Marker n={2} /> : null}
              <span className="min-w-0 text-sm font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-2 @min-[42rem]:line-clamp-2">
                {row.summary}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5">
              <span className="tabular-nums text-sm font-semibold text-rose-600">
                {formatAmount(row.amount, row.currency, locale)}
              </span>
              {annotate ? <Marker n={6} /> : null}
            </span>
          </div>
          {/* The app truncates this line; the drawing lets it wrap so the
              reason stays readable at the article's width. */}
          <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-zinc-500">
            {annotate ? <Marker n={3} /> : null}
            <span>{row.partner}</span>
            <span className="font-mono">{row.internalId}</span>
            {annotate ? <Marker n={4} /> : null}
            <span className={clsx('whitespace-nowrap tabular-nums', row.soon && 'font-semibold text-amber-700')}>
              {formatDate(row.dueDate, locale)} · {row.dueRel}
            </span>
            {annotate ? <Marker n={5} /> : null}
            <span className="text-zinc-600">{whyText(c, row.why)}</span>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-1.5 pl-7 @min-[42rem]:justify-end @min-[42rem]:pl-0">
        <FakeButton kind="emerald" small>
          {c.ui['approvals.queue.approve']}
        </FakeButton>
        <FakeButton kind="outline" small>
          {c.ui['approvals.queue.decline']}
        </FakeButton>
        <FakeButton kind="plain" small>
          {c.ui['approvals.queue.not_mine']}
        </FakeButton>
      </div>
    </li>
  )
}

export function ApprovalQueueFigure({ locale, children }: FigureProps) {
  const c = approvalsCopy[locale]
  const ui = c.ui
  return (
    <Figure
      alt={c.help.alt.queue}
      art={
        <AppWindow>
          <p className="text-lg/7 font-semibold text-zinc-950">{ui['approvals.title']}</p>
          <div className="mt-3 flex gap-1 border-b border-zinc-200">
            <span className="-mb-px border-b-2 border-zinc-950 px-3 py-2 text-sm font-medium text-zinc-950">
              {ui['approvals.tabs.queue']}
            </span>
            <span className="-mb-px border-b-2 border-transparent px-3 py-2 text-sm font-medium text-zinc-500">
              {ui['approvals.tabs.decided']}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">{c.help.subtitle}</p>
            <span className="hidden w-48 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-400 @2xl:block">
              {ui['approvals.queue.col_what']}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Marker n={1} />
            <Chip active count={c.counts.mine}>
              {ui['approvals.queue.chip_mine']}
            </Chip>
            <Chip count={c.counts.unassigned}>{ui['approvals.queue.chip_unassigned']}</Chip>
            <Chip count={c.counts.allAwaiting}>{ui['approvals.queue.chip_all_awaiting']}</Chip>
            <Chip count={c.counts.dueWeek}>{ui['approvals.queue.chip_due_week']}</Chip>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
            <div className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-500">
              <Checkbox />
              <span>{ui['approvals.queue.select_all']}</span>
            </div>
            <ul className="divide-y divide-zinc-200">
              {c.rows.map((row, i) => (
                <QueueRowView key={row.internalId} row={row} locale={locale} annotate={i === 0} />
              ))}
            </ul>
          </div>
        </AppWindow>
      }
    >
      {children}
    </Figure>
  )
}

// ── Approving several at once ───────────────────────────────────────────────

const BULK_ROWS = [0, 2]

export function ApprovalBulkBarFigure({ locale, children }: FigureProps) {
  const c = approvalsCopy[locale]
  const picked = BULK_ROWS.map((i) => c.rows[i])
  const byCurrency = new Map<string, number>()
  for (const r of picked) byCurrency.set(r.currency, (byCurrency.get(r.currency) ?? 0) + r.amount)
  const total = [...byCurrency].map(([ccy, amt]) => formatAmount(amt, ccy, locale)).join(' + ')
  return (
    <Figure
      alt={c.help.alt.bulk}
      art={
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm text-white shadow-lg">
          <span>{c.help.bulkSelected}</span>
          <span className="tabular-nums font-semibold">{total}</span>
          <span className="flex-1" />
          <span className="px-2 font-semibold text-white">{c.ui['approvals.queue.bulk_clear']}</span>
          <FakeButton kind="emerald">{c.ui['approvals.queue.bulk_approve']}</FakeButton>
        </div>
      }
    >
      {children}
    </Figure>
  )
}

// ── Declining ───────────────────────────────────────────────────────────────

const DECLINE_ROW = 1
const REASONS = ['wrong_amount', 'work_not_done', 'already_paid', 'not_my_decision'] as const
const PICKED_REASON = 'work_not_done'

export function DeclineDialogFigure({ locale, children }: FigureProps) {
  const c = approvalsCopy[locale]
  const ui = c.ui
  const row = c.rows[DECLINE_ROW]
  return (
    <Figure
      alt={c.help.alt.decline}
      bleed
      art={
        <FakeDialog
          title={ui['approvals.queue.decline_title']}
          actions={
            <>
              <FakeButton kind="plain">{ui['approvals.queue.decline_cancel']}</FakeButton>
              <FakeButton kind="dark">{ui['approvals.queue.decline_confirm']}</FakeButton>
            </>
          }
        >
          <p className="text-sm/6 text-zinc-500">{ui['approvals.queue.decline_body']}</p>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-zinc-500">{ui['approvals.queue.decline_payee']}</dt>
            <dd className="text-zinc-950">{row.partner}</dd>
            <dt className="text-zinc-500">{ui['approvals.queue.decline_amount']}</dt>
            <dd className="tabular-nums text-zinc-950">{formatAmount(row.amount, row.currency, locale)}</dd>
            <dt className="text-zinc-500">{ui['approvals.queue.decline_due']}</dt>
            <dd className="text-zinc-950">{formatDate(row.dueDate, locale)}</dd>
          </dl>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {REASONS.map((r) => (
              <span
                key={r}
                className={clsx(
                  'rounded-full border px-3 py-1 text-xs font-medium',
                  r === PICKED_REASON ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 text-zinc-700',
                )}
              >
                {ui[`approvals.queue.reason_${r}`]}
              </span>
            ))}
          </div>
          <div className="mt-3 min-h-18 rounded-lg border border-blue-500 px-3 py-2 text-sm text-zinc-950 ring-1 ring-blue-500">
            {c.help.declineNote}
          </div>
        </FakeDialog>
      }
    >
      {children}
    </Figure>
  )
}

// ── After the decision ──────────────────────────────────────────────────────

export function ApprovalLifecycleFigure({ locale, children }: FigureProps) {
  const c = approvalsCopy[locale]
  const ui = c.ui
  const l = c.help.lifecycle
  return (
    <Figure
      alt={c.help.alt.lifecycle}
      art={
        <StateFlow
          start={{ label: ui['approvals.state.awaiting'], tone: STATE_TONE.awaiting }}
          backTo={l.backTo}
          footnote={l.resetNote}
          branches={[
            {
              action: ui['approvals.queue.approve'],
              actionKind: 'emerald',
              result: { label: ui['approvals.state.approved'], tone: STATE_TONE.approved },
              next: l.approvedNext,
              end: { label: ui['invoices.matching.status_paid'], tone: STATE_TONE.paid },
            },
            {
              action: ui['approvals.queue.decline'],
              result: { label: ui['approvals.state.declined'], tone: STATE_TONE.declined },
              next: l.declinedNext,
              loops: true,
            },
            {
              action: ui['approvals.queue.not_mine'],
              actionKind: 'plain',
              result: { label: l.notMineResult },
              next: l.notMineNext,
              loops: true,
            },
          ]}
        />
      }
    >
      {children}
    </Figure>
  )
}

// ── Emails ──────────────────────────────────────────────────────────────────

// Hours shown on the working-day track, and where an event sits on it.
const DAY_START = 7.5
const DAY_END = 15.5
const pos = (h: number) => `${((h - DAY_START) / (DAY_END - DAY_START)) * 100}%`
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15]

function MailDot({ at, hollow = false }: { at: number; hollow?: boolean }) {
  return (
    <span
      className={clsx(
        'absolute top-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ring-4 ring-white',
        hollow ? 'border-2 border-zinc-400 bg-white' : 'bg-zinc-900 text-white',
      )}
      style={{ left: pos(at) }}
    >
      {hollow ? null : <EnvelopeIcon className="size-3.5" aria-hidden="true" />}
    </span>
  )
}

function Lane({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10">
      <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">{title}</p>
      {children}
    </div>
  )
}

function Track({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-3 mt-5 h-6">
      <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-zinc-200" />
      {HOURS.map((h) => (
        <span key={h} className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-zinc-300" style={{ left: pos(h) }} />
      ))}
      {children}
    </div>
  )
}

export function ApprovalEmailsFigure({ locale, children }: FigureProps) {
  const c = approvalsCopy[locale]
  const ui = c.ui
  const e = c.help.emails
  return (
    <Figure
      alt={c.help.alt.emails}
      art={
        <div className="space-y-3">
          <Lane title={e.everyDay}>
            <Track>
              <MailDot at={8} />
              <MailDot at={15} />
            </Track>
            <div className="relative mx-3 h-5 font-mono text-xs text-zinc-500">
              <span className="absolute top-1 -translate-x-1/2" style={{ left: pos(8) }}>
                {e.morningTime}
              </span>
              <span className="absolute top-1 -translate-x-1/2" style={{ left: pos(15) }}>
                {e.dueSoonTime}
              </span>
            </div>
            <div className="mt-2 flex justify-between gap-4 text-xs">
              <div className="max-w-[45%]">
                <p className="font-semibold text-zinc-950">{ui['settings.notifications.approval_morning_row_title']}</p>
                <p className="mt-0.5 text-zinc-600">{e.morningDesc}</p>
              </div>
              <div className="max-w-[45%] text-right">
                <p className="font-semibold text-zinc-950">{ui['settings.notifications.approval_due_soon_row_title']}</p>
                <p className="mt-0.5 text-zinc-600">{e.dueSoonDesc}</p>
              </div>
            </div>
          </Lane>
          <div className="grid gap-3 @xl:grid-cols-[3fr_2fr]">
            <Lane title={e.onAssign}>
              <div className="relative mx-3 mt-5 h-6">
                <div className="absolute top-1/2 right-[12%] left-[12%] h-0.5 -translate-y-1/2 border-t-2 border-dashed border-zinc-300" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[160%] rounded bg-zinc-100 px-1.5 text-[10px] font-semibold text-zinc-600">
                  {e.wait}
                </span>
                <span className="absolute top-1/2 left-[12%] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-400 bg-white" />
                <MailDot at={DAY_START + (DAY_END - DAY_START) * 0.88} />
              </div>
              <div className="mt-3 flex justify-between gap-4 text-xs">
                <p className="max-w-[45%] text-zinc-600">{e.firstInvoice}</p>
                <div className="max-w-[55%] text-right">
                  <p className="font-semibold text-zinc-950">{ui['settings.notifications.approval_new_items_row_title']}</p>
                  <p className="mt-0.5 text-zinc-600">{e.newItemsDesc}</p>
                </div>
              </div>
            </Lane>
            <Lane title={e.forAdmins}>
              <div className="mt-3 flex items-start gap-2.5 text-xs">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                  <EnvelopeIcon className="size-3.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-zinc-950">{ui['settings.notifications.approval_declined_row_title']}</p>
                  <p className="mt-0.5 text-zinc-600">{e.declinedDesc}</p>
                </div>
              </div>
            </Lane>
          </div>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
