// App screens and a diagram for the approving-invoices article.
//
// The screens are rebuilt 1:1 from aift-web (staging, 2026-09-23, design
// round 2: invoices are CARDS, not rows), class for class, with the real
// Catalyst components from the help mirror:
//   ApprovalsPage     approvals/layout.tsx + approvals/_components/ApprovalTabs.tsx
//                     (title, the Decisions header link, the queue tab strip)
//   QueueBody / Card  approvals/_components/ApprovalQueue.tsx + Slip.tsx
//                     (+ the checkboxes from src/components/recategorize/recategorize-ui.tsx,
//                     RouteReason from src/components/approvals/RouteReason.tsx)
//   ReasonPanel       Slip.tsx ReasonPanel, open on the card being declined
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
import sl from './slip.module.css'

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

/** The day the fictional screens are "taken": row 1 is one day overdue. */
const FIGURE_TODAY = '2026-09-22'
/** The fictional approver whose queue this is, for the initials disc. */
const ME_INITIALS = 'AB'

// ── The approvals page frame (layout.tsx + ApprovalTabs.tsx) ────────────────

function ApprovalsPage({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const c = approvalsCopy[locale]
  const ui = c.ui
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <Heading>{ui['approvals.title']}</Heading>
        {/* An approver has no Overview link (it is shown to manage_approvals only). */}
        <nav className="flex items-baseline gap-5">
          <span className="text-sm text-zinc-500">{ui['approvals.tabs.decided']}</span>
        </nav>
      </div>
      {/* The checkpoints are off in this workspace, so Payment is the only queue. */}
      <nav className="mt-4 flex gap-1 border-b border-zinc-200 dark:border-zinc-700">
        <span aria-current="page" className="-mb-px border-b-2 border-zinc-950 px-3 py-2 text-sm font-medium text-zinc-950 dark:border-white dark:text-white">
          {ui['approvals.tabs.queue']} <span className="tabular-nums opacity-60">{c.counts.mine}</span>
        </span>
      </nav>
      <div className="mt-6">{children}</div>
    </div>
  )
}

// ── One card (ApprovalQueue.tsx + Slip.tsx) ─────────────────────────────────

function Card({
  row,
  locale,
  selected,
  annotate,
  asking,
}: {
  row: QueueRow
  locale: Locale
  selected: boolean
  annotate: boolean
  /** Draw the decline reason panel open on this card. */
  asking?: boolean
}) {
  const c = approvalsCopy[locale]
  const ui = c.ui
  const overdue = row.dueDate < FIGURE_TODAY
  return (
    <li className="flex">
      <div className={clsx(sl.slip, 'w-full')}>
        <div className={sl.inner}>
          <div className="flex items-start justify-between gap-2.5">
            <div className="min-w-0">
              {annotate ? <Pin n={3} at="above" cancel="-mb-3" /> : null}
              <a className="block truncate text-sm font-semibold text-zinc-950 hover:underline dark:text-white">{row.partner}</a>
              <div className="mt-0.5 truncate font-mono text-xs text-zinc-400">{row.internalId}</div>
            </div>
            <div className="shrink-0 pt-0.5">
              <span className={CELL_HIT}>
                <Checkbox defaultChecked={selected} tabIndex={-1} aria-hidden className="pointer-events-none" />
              </span>
            </div>
          </div>

          <div className="mt-3 flex grow flex-col justify-center gap-2 border-y border-dashed border-zinc-200 py-3 dark:border-zinc-700">
            <div className="flex items-start">
              {annotate ? <Pin n={2} at="left" cancel="" /> : null}
              <p className="line-clamp-2 min-w-0 flex-1 text-sm/5 text-zinc-700 dark:text-zinc-300" title={row.summary}>
                {row.summary}
              </p>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs text-zinc-400">{ui['approvals.slip.to_pay']}</span>
              <span className="tabular-nums text-base font-semibold text-rose-600 dark:text-rose-400">
                {annotate ? <Pin n={6} at="left" cancel="-ml-2" /> : null}
                {formatAmount(row.amount, row.currency, locale)}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs text-zinc-400">{ui['approvals.slip.due']}</span>
              <span
                className={clsx(
                  'text-right text-xs tabular-nums',
                  overdue
                    ? 'font-semibold text-rose-600 dark:text-rose-400'
                    : row.soon
                      ? 'font-semibold text-amber-700 dark:text-amber-400'
                      : 'text-zinc-600 dark:text-zinc-300',
                )}
              >
                {annotate ? <Pin n={4} at="left" cancel="-ml-2" /> : null}
                {`${formatDate(row.dueDate, locale)}, ${row.dueRel}`}
              </span>
            </div>
          </div>

          <div className="mt-2.5 flex min-w-0 items-center gap-2">
            {annotate ? <Pin n={5} at="left" cancel="-mr-1" /> : null}
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[9px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              {ME_INITIALS}
            </span>
            <span className="min-w-0 truncate text-xs text-zinc-600 dark:text-zinc-300">
              {ui['approvals.slip.with_you']}
              <span className="text-zinc-400">
                {' · '}
                {whyText(c, row.why)}
              </span>
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Button color="emerald" className="!px-2.5 !py-1 !text-xs">
              {ui['approvals.queue.approve']}
            </Button>
            <Button outline className="!px-2.5 !py-1 !text-xs">
              {ui['approvals.queue.decline']}
            </Button>
            <Button plain className="!px-2 !py-1 !text-xs">
              {ui['approvals.queue.not_mine']}
            </Button>
          </div>

          {asking ? <ReasonPanel locale={locale} /> : null}
        </div>
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
  asking = null,
}: {
  locale: Locale
  annotate?: boolean
  /** Indexes of ticked cards; any tick shows the selection bar, as in the app. */
  selected?: number[]
  /** Only the selection bar and the cards, for a partial screen. */
  listOnly?: boolean
  /** Index of the card with the decline reason open. */
  asking?: number | null
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

      <label className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-500">
        <span role="checkbox" aria-checked={allOn ? true : someOn ? 'mixed' : false} className={CELL_HIT}>
          <Checkbox defaultChecked={allOn} indeterminate={someOn && !allOn} />
        </span>
        {ui['approvals.queue.select_all']}
      </label>

      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5">
        {c.rows.map((row, i) => (
          <Card
            key={row.internalId}
            row={row}
            locale={locale}
            selected={selected.includes(i)}
            annotate={annotate && i === 0}
            asking={asking === i}
          />
        ))}
      </ul>

      {listOnly ? null : <Text className="mt-4 text-xs">{ui['approvals.queue.unassigned_hint']}</Text>}
    </div>
  )
}

// The cards sit two to a row at this width, which is what a laptop with the
// sidebar open shows. On phones the screens are laid out at this width and
// zoomed, and Enlarge uses it.
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
              the cards where the screenshot is cut. */}
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

// ── Declining (Slip.tsx ReasonPanel, open on the card) ─────────────────────

const DECLINE_ROW = 1
const REASONS = ['wrong_amount', 'work_not_done', 'already_paid', 'not_my_decision'] as const

function ReasonPanel({ locale }: { locale: Locale }) {
  const c = approvalsCopy[locale]
  const ui = c.ui
  return (
    <div className={sl.ask}>
      <div className="text-sm font-semibold text-zinc-950 dark:text-white">{ui['approvals.slip.decline_question']}</div>
      <div className="flex flex-wrap gap-1">
        {REASONS.map((r) => (
          <span
            key={r}
            className="rounded-full border border-zinc-200 px-2 py-0.5 text-[11px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
          >
            {ui[`approvals.queue.reason_${r}`]}
          </span>
        ))}
      </div>
      <textarea
        readOnly
        value={c.help.declineNote}
        aria-label={ui['approvals.slip.reason_placeholder']}
        className="min-h-14 grow resize-none rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs text-zinc-950 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
      />
      <div className="text-[11px] text-zinc-400">{ui['approvals.slip.decline_hint']}</div>
      <div className="flex gap-1.5">
        <Button color="rose" className="!px-2.5 !py-1 !text-xs">
          {ui['approvals.queue.decline']}
        </Button>
        <Button outline className="!px-2.5 !py-1 !text-xs">
          {ui['approvals.slip.cancel']}
        </Button>
      </div>
    </div>
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
        <AppScreen minWidth={QUEUE_MIN_WIDTH} clipHeight={620}>
          <ApprovalsPage locale={locale}>
            <QueueBody locale={locale} asking={DECLINE_ROW} />
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
