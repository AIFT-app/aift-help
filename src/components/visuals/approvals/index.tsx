// App screens and a diagram for the approving-invoices article.
//
// The screens are rebuilt 1:1 from aift-web (origin/main, 2026-09-21; the
// decline dialog's body re-copied 2026-09-22), class
// for class, with the real Catalyst components from the help mirror:
//   ApprovalsPage     src/app/(app)/workspaces/[workspaceId]/approvals/layout.tsx
//                     + approvals/_components/ApprovalTabs.tsx
//   QueueBody / Row   approvals/_components/ApprovalQueue.tsx (+ CELL_HIT and the
//                     row checkboxes from src/components/recategorize/recategorize-ui.tsx,
//                     RouteReason from src/components/approvals/RouteReason.tsx)
//   DeclineOverlay    src/components/approvals/DeclineDialog.tsx inside the panel
//                     and backdrop of src/components/catalyst/dialog.tsx
//   Emails figure     src/app/(app)/account/notifications/NotificationsForm.tsx
//                     (approvals section, ToggleRow) + src/components/settings/SettingsPanel.tsx
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts and is fictional.

import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Checkbox } from '@/components/catalyst/checkbox'
import { Heading } from '@/components/catalyst/heading'
import { Switch } from '@/components/catalyst/switch'
import { Text } from '@/components/catalyst/text'
import { formatAmount, formatDate } from '../format'
import { AppScreen, Figure, Pin } from '../kit'
import { StateFlow } from '../StateFlow'
import { approvalsCopy, STATE_TONE, whyText, type QueueRow } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// recategorize-ui.tsx CELL_HIT, verbatim.
const CELL_HIT =
  '-mx-4 -my-3 flex cursor-pointer items-center justify-center px-4 py-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-blue-500'

const CHIPS = [
  ['approvals.queue.chip_mine', 'mine'],
  ['approvals.queue.chip_unassigned', 'unassigned'],
  ['approvals.queue.chip_all_awaiting', 'allAwaiting'],
  ['approvals.queue.chip_due_week', 'dueWeek'],
] as const

// ── The approvals page frame (layout.tsx + ApprovalTabs.tsx) ────────────────

function ApprovalsPage({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const ui = approvalsCopy[locale].ui
  const tab = (current: boolean) =>
    clsx(
      '-mb-px border-b-2 px-3 py-2 text-sm font-medium',
      current
        ? 'border-zinc-950 text-zinc-950 dark:border-white dark:text-white'
        : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
    )
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Heading>{ui['approvals.title']}</Heading>
      {/* An approver has no Overview tab (it is shown to manage_approvals only). */}
      <nav className="mt-4 flex gap-1 border-b border-zinc-200 dark:border-zinc-700">
        <span aria-current="page" className={tab(true)}>
          {ui['approvals.tabs.queue']}
        </span>
        <span className={tab(false)}>{ui['approvals.tabs.decided']}</span>
      </nav>
      <div className="mt-6">{children}</div>
    </div>
  )
}

// ── The queue (ApprovalQueue.tsx) ───────────────────────────────────────────

function Row({ row, locale, selected, annotate }: { row: QueueRow; locale: Locale; selected: boolean; annotate: boolean }) {
  const c = approvalsCopy[locale]
  return (
    <li className={clsx('flex items-start gap-3 px-3 py-2.5', row.soon && 'shadow-[inset_3px_0_0_#f59e0b]')}>
      <div className="w-4 shrink-0 pt-0.5">
        <span className={CELL_HIT}>
          <Checkbox defaultChecked={selected} tabIndex={-1} aria-hidden className="pointer-events-none" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          {annotate ? <Pin n={2} at="above" cancel="-mr-3" /> : null}
          <a
            title={row.summary}
            className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-950 hover:underline dark:text-white"
          >
            {row.summary}
          </a>
          {annotate ? <Pin n={6} at="above" cancel="-mr-3" /> : null}
          <span className="shrink-0 tabular-nums text-sm font-semibold text-rose-600 dark:text-rose-400">
            {formatAmount(row.amount, row.currency, locale)}
          </span>
        </div>
        <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-zinc-500">
          {annotate ? <Pin n={3} at="below" cancel="-mr-1.5" /> : null}
          <span className="truncate">{row.partner}</span>
          <span className="shrink-0 font-mono">{row.internalId}</span>
          {annotate ? <Pin n={4} at="below" cancel="-mr-1.5" /> : null}
          <span
            className={clsx(
              'shrink-0 whitespace-nowrap tabular-nums',
              row.soon && 'font-semibold text-amber-700 dark:text-amber-400',
            )}
          >
            {`${formatDate(row.dueDate, locale)} · ${row.dueRel}`}
          </span>
          {annotate ? <Pin n={5} at="below" cancel="-mr-1.5" /> : null}
          <span className="min-w-0 truncate text-zinc-600 dark:text-zinc-300">
            <span>{whyText(c, row.why)}</span>
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
        <Button color="emerald" className="!px-2.5 !py-1 !text-xs">
          {c.ui['approvals.queue.approve']}
        </Button>
        <Button outline className="!px-2.5 !py-1 !text-xs">
          {c.ui['approvals.queue.decline']}
        </Button>
        <Button plain className="!px-2 !py-1 !text-xs">
          {c.ui['approvals.queue.not_mine']}
        </Button>
      </div>
    </li>
  )
}

/** Sum per currency, sorted by code: aift-web src/lib/approvals.ts totalsByCurrency. */
function totals(rows: QueueRow[], locale: Locale): string {
  const m = new Map<string, number>()
  for (const r of rows) m.set(r.currency, (m.get(r.currency) ?? 0) + r.amount)
  return [...m.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([ccy, amt]) => formatAmount(amt, ccy, locale))
    .join(' + ')
}

function QueueBody({
  locale,
  annotate = false,
  selected = [],
  listOnly = false,
}: {
  locale: Locale
  annotate?: boolean
  /** Indexes of ticked rows; any tick shows the selection bar, as in the app. */
  selected?: number[]
  /** Only the selection bar and the list, for a partial screen. */
  listOnly?: boolean
}) {
  const c = approvalsCopy[locale]
  const ui = c.ui
  const picked = c.rows.filter((_, i) => selected.includes(i))
  const allOn = picked.length === c.rows.length
  const someOn = picked.length > 0
  return (
    <div>
      {listOnly ? null : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Text>{c.help.subtitle}</Text>
            <form>
              <input
                type="search"
                readOnly
                placeholder={ui['approvals.queue.col_what']}
                aria-label={ui['approvals.queue.col_what']}
                className="w-56 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-600 dark:bg-zinc-900"
              />
            </form>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {CHIPS.map(([key, count], i) => (
              <span
                key={key}
                className={clsx(
                  'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium',
                  i === 0
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900'
                    : 'border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800',
                )}
              >
                {ui[key]}
                <span className="tabular-nums opacity-70">{c.counts[count]}</span>
              </span>
            ))}
            {annotate ? <Pin n={1} at="right" cancel="-ml-2" /> : null}
          </div>
        </>
      )}

      {someOn ? (
        <div className="sticky top-2 z-10 mt-4 flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
          <span>{c.help.bulkSelected}</span>
          <span className="tabular-nums font-semibold">{totals(picked, locale)}</span>
          <span className="flex-1" />
          <Button plain className="!text-white dark:!text-zinc-900">
            {ui['approvals.queue.bulk_clear']}
          </Button>
          <Button color="emerald">{ui['approvals.queue.bulk_approve']}</Button>
        </div>
      ) : null}

      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40">
          <span role="checkbox" aria-checked={allOn ? true : someOn ? 'mixed' : false} className={CELL_HIT}>
            <Checkbox defaultChecked={allOn} indeterminate={someOn && !allOn} />
          </span>
          <span>{ui['approvals.queue.select_all']}</span>
        </div>
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
          {c.rows.map((row, i) => (
            <Row key={row.internalId} row={row} locale={locale} selected={selected.includes(i)} annotate={annotate && i === 0} />
          ))}
        </ul>
      </div>

      {listOnly ? null : <Text className="mt-4 text-xs">{ui['approvals.queue.unassigned_hint']}</Text>}
    </div>
  )
}

// The queue row is not responsive in the app: narrower than this, its buttons
// cover the due date and the summary truncates to a few letters. So on phones
// the queue screens are laid out at this width and zoomed, and Enlarge uses it.
const QUEUE_MIN_WIDTH = 768

export function ApprovalQueueFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={approvalsCopy[locale].help.alt.queue}
      bleed
      wide
      zoomable={locale}
      zoomWidth={QUEUE_MIN_WIDTH}
      art={
        <AppScreen minWidth={QUEUE_MIN_WIDTH}>
          <ApprovalsPage locale={locale}>
            <QueueBody locale={locale} annotate />
          </ApprovalsPage>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── Approving several at once ───────────────────────────────────────────────

const BULK_ROWS = [0, 2]

export function ApprovalBulkBarFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={approvalsCopy[locale].help.alt.bulk}
      bleed
      wide
      zoomable={locale}
      zoomWidth={QUEUE_MIN_WIDTH}
      art={
        <AppScreen minWidth={QUEUE_MIN_WIDTH}>
          {/* A crop from the middle of the page: the layout's px-4, and 16px below
              the list where the screenshot is cut. */}
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <QueueBody locale={locale} selected={BULK_ROWS} listOnly />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── Declining (DeclineDialog.tsx in catalyst/dialog.tsx) ────────────────────

const DECLINE_ROW = 1
const REASONS = ['wrong_amount', 'work_not_done', 'already_paid', 'not_my_decision'] as const
const PICKED_REASON = 'work_not_done'

function DeclineOverlay({ locale }: { locale: Locale }) {
  const c = approvalsCopy[locale]
  const ui = c.ui
  const row = c.rows[DECLINE_ROW]
  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      {/* Centering container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="flex max-h-[calc(100vh-2rem)] w-full flex-col rounded-2xl bg-white p-6 shadow-xl sm:max-w-md dark:bg-zinc-900 dark:ring-1 dark:ring-white/10">
          <h2 className="shrink-0 text-base/6 font-semibold text-zinc-950 dark:text-white">
            {ui['approvals.queue.decline_title']}
          </h2>
          {/* DialogBody: the clip room keeps focus rings visible (aift-web #1350). */}
          <div className="mt-2.5 min-h-0 flex-1 overflow-y-auto -mx-1.5 px-1.5 pt-1.5 -mb-1.5 pb-1.5">
            <Text>{ui['approvals.queue.decline_body']}</Text>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="text-zinc-500">{ui['approvals.queue.decline_payee']}</dt>
              <dd className="text-zinc-950 dark:text-white">{row.partner}</dd>
              <dt className="text-zinc-500">{ui['approvals.queue.decline_amount']}</dt>
              <dd className="tabular-nums text-zinc-950 dark:text-white">{formatAmount(row.amount, row.currency, locale)}</dd>
              <dt className="text-zinc-500">{ui['approvals.queue.decline_due']}</dt>
              <dd className="text-zinc-950 dark:text-white">{formatDate(row.dueDate, locale)}</dd>
            </dl>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {REASONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={clsx(
                    'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                    r === PICKED_REASON
                      ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900'
                      : 'border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800',
                  )}
                >
                  {ui[`approvals.queue.reason_${r}`]}
                </button>
              ))}
            </div>
            <textarea
              readOnly
              value={c.help.declineNote}
              rows={3}
              className="mt-3 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
            />
          </div>
          <div className="mt-6 shrink-0 flex flex-col-reverse items-center justify-end gap-3 sm:flex-row">
            <Button plain>{ui['approvals.queue.decline_cancel']}</Button>
            <Button color="dark/zinc">{ui['approvals.queue.decline_confirm']}</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function DeclineDialogFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={approvalsCopy[locale].help.alt.decline}
      bleed
      wide
      zoomable={locale}
      zoomWidth={QUEUE_MIN_WIDTH}
      art={
        <AppScreen minWidth={QUEUE_MIN_WIDTH} clipHeight={520} overlay={<DeclineOverlay locale={locale} />}>
          <ApprovalsPage locale={locale}>
            <QueueBody locale={locale} />
          </ApprovalsPage>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── After the decision (a diagram, not an app screen) ───────────────────────

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

// ── Emails (Account, Notifications: the approvals section) ──────────────────

const EMAIL_ROWS = [
  ['settings.notifications.approval_new_items_row_title', 'settings.notifications.approval_new_items_row_desc'],
  ['settings.notifications.approval_morning_row_title', 'settings.notifications.approval_morning_row_desc'],
  ['settings.notifications.approval_due_soon_row_title', 'settings.notifications.approval_due_soon_row_desc'],
  ['settings.notifications.approval_declined_row_title', 'settings.notifications.approval_declined_row_desc'],
] as const

export function ApprovalEmailsFigure({ locale, children }: FigureProps) {
  const ui = approvalsCopy[locale].ui
  return (
    <Figure
      alt={approvalsCopy[locale].help.alt.emails}
      bleed
      wide
      zoomable={locale}
      art={
        <AppScreen>
          {/* The account layout's column (account/layout.tsx: max-w-3xl px-4), cut
              32px above and below the section. */}
          <div className="mx-auto max-w-3xl px-4 py-8">
            <section>
              <h2 className="text-base/7 font-semibold text-zinc-950 dark:text-white">
                {ui['settings.notifications.approvals_section_title']}
              </h2>
              <Text className="mt-1">{ui['settings.notifications.approvals_section_desc']}</Text>
              <div className="mt-4">
                <div className="divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-700">
                  {EMAIL_ROWS.map(([title, desc]) => (
                    <div key={title} className="flex items-start gap-4 px-6 py-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-950 dark:text-white">{ui[title]}</p>
                        <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">{ui[desc]}</p>
                      </div>
                      <Switch defaultChecked className="mt-0.5" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
