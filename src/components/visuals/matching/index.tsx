// App screens and a diagram for the invoice-matching article.
//
// The screens are rebuilt 1:1 from aift-web (origin/main, 2026-09-21), class
// for class, with the real Catalyst components from the help mirror:
//   MatchingPage     src/app/(app)/workspaces/[workspaceId]/matching/page.tsx
//                    (page wrapper, header, tab bar) + _components/MatchingHistoryPanel.tsx
//                    and _components/RunMatchingButton.tsx (the two header buttons)
//   PendingSection   matching/_components/UnifiedMatchList.tsx (Pending section,
//                    renderTable, ScoreBadges; the Approved heading below it)
//   MatchPaymentCard transactions/[transactionId]/_components/TransactionDetailV2Client.tsx
//                    (page wrapper, Card) + src/components/transaction/MatchPanel.tsx
//                    (ScorePill, AI suggestions, Find invoice) + NoInvoiceNeededControl.tsx
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts and is fictional.

import { CheckCircleIcon, ChevronDownIcon, MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { ClockIcon } from '@heroicons/react/24/outline'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Heading } from '@/components/catalyst/heading'
import { Select } from '@/components/catalyst/select'
import { formatAmount, formatDate } from '../format'
import { AppScreen, Figure, Pill, Pin } from '../kit'
import { fill, matchingCopy, type QueueGroup } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// ── What happens to a pair (a diagram, not an app screen) ───────────────────

function Arrow() {
  return (
    <svg viewBox="0 0 24 12" className="h-3 w-6 shrink-0 text-zinc-400" fill="none" aria-hidden="true">
      <path d="M1 6h20m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** A score range, in the help centre's own style (not an app element). */
function ScoreChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex min-w-16 justify-center rounded-md bg-white px-2 py-0.5 text-xs font-semibold tabular-nums text-zinc-800 ring-1 ring-zinc-950/10">
      {children}
    </span>
  )
}

/** The outcomes as the app shows them: list pills, and the suggestion's Pending badge. */
function Outcome({ kind, label }: { kind: 'matched' | 'pending' | 'unmatched'; label: string }) {
  return (
    <span className="app-screen contents">
      {kind === 'pending' ? (
        <Badge color="yellow">{label}</Badge>
      ) : (
        <Pill tone={kind === 'matched' ? 'emerald' : 'amber'} size="md">
          {label}
        </Pill>
      )}
    </span>
  )
}

function OutcomeRow({ score, title, note, children }: { score: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <li className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-3">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <ScoreChip>{score}</ScoreChip>
        <span className="text-xs font-medium text-zinc-800">{title}</span>
        {note ? <span className="text-xs text-zinc-500">{note}</span> : null}
      </div>
      <div className="mt-2 flex flex-col gap-1.5 border-t border-zinc-200/70 pt-2">{children}</div>
    </li>
  )
}

function OutcomeLine({ condition, children }: { condition?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {condition ? <span className="text-xs text-zinc-600">{condition}</span> : null}
      <Arrow />
      {children}
    </div>
  )
}

export function MatchingOutcomeFigure({ locale, children }: FigureProps) {
  const c = matchingCopy[locale]
  const h = c.help.outcomes
  const matched = c.ui['transactions.list.status_matched']
  const pending = c.ui['matching.suggestion_detail.status_pending']
  const unmatched = c.ui['transactions.list.status_unmatched']
  return (
    <Figure
      alt={c.help.alt.outcomes}
      art={
        <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
          <ul className="flex flex-col gap-3">
            <OutcomeRow score="100" title={h.exactTitle} note={h.exactNote}>
              <OutcomeLine>
                <Outcome kind="matched" label={matched} />
              </OutcomeLine>
            </OutcomeRow>
            <OutcomeRow score="90-100" title={h.aiScore}>
              <OutcomeLine>
                <Outcome kind="matched" label={matched} />
              </OutcomeLine>
            </OutcomeRow>
            <OutcomeRow score="85-89" title={h.aiScore}>
              <OutcomeLine condition={h.samePartner}>
                <Outcome kind="matched" label={matched} />
              </OutcomeLine>
              <OutcomeLine condition={h.otherPartner}>
                <Outcome kind="pending" label={pending} />
              </OutcomeLine>
            </OutcomeRow>
            <OutcomeRow score="< 85" title={h.aiScore}>
              <OutcomeLine>
                <Outcome kind="unmatched" label={unmatched} />
                <span className="text-xs text-zinc-600">{h.byHand}</span>
              </OutcomeLine>
            </OutcomeRow>
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-lg border border-dashed border-zinc-300 px-3 py-2">
            <span className="text-xs text-zinc-600">{h.footnote}</span>
            <Outcome kind="matched" label={matched} />
            <Arrow />
            <Outcome kind="pending" label={pending} />
          </div>
        </div>
      }
    >
      {children}
    </Figure>
  )
}

// ── The Matching page, Matches tab (page.tsx + UnifiedMatchList.tsx) ────────

const TH = 'py-3 pr-4 text-left text-xs font-medium uppercase tracking-wide text-zinc-500'

function tabClass(active: boolean) {
  return `-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
    active
      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
      : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
  }`
}

function QueueRow({ group, locale, markers }: { group: QueueGroup; locale: Locale; markers: number[] }) {
  const c = matchingCopy[locale]
  const isMulti = group.scores.length > 1
  return (
    <tr className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
      <td className="py-3 pr-4 align-top">
        <div className="flex flex-wrap items-center gap-1">
          {group.scores.map((score, idx) => (
            <Badge key={idx} color={score >= 85 ? 'green' : score >= 60 ? 'yellow' : 'red'}>
              {score}
            </Badge>
          ))}
          {/* Markers stay inside the table: its overflow-x-auto box clips anything outside. */}
          {markers.includes(3) ? <Pin n={3} at="right" cancel="-ml-1" /> : null}
          {markers.includes(4) ? <Pin n={4} at="right" cancel="-ml-1" /> : null}
        </div>
      </td>
      <td className="py-3 pr-4 align-top">
        <div className="text-sm font-medium text-zinc-900 dark:text-white">{group.invoiceNumber}</div>
        <div className="text-xs text-zinc-500">
          {group.invoicePartner} · {formatAmount(group.invoiceAmount, group.invoiceCurrency, locale)}
        </div>
      </td>
      <td className="py-3 pr-4 align-top">
        <div className="text-sm font-medium text-zinc-900 dark:text-white">{group.txPartner}</div>
        <div className="text-xs text-zinc-500">
          {isMulti
            ? fill(c.ui['matching.unified_list.combined_amounts'], {
                txCount: group.scores.length,
                txAmount: formatAmount(group.txAmount, group.txCurrency, locale),
                invCount: 1,
                invAmount: formatAmount(group.invoiceAmount, group.invoiceCurrency, locale),
              })
            : `${formatDate(group.txDate, locale)} · ${formatAmount(group.txAmount, group.txCurrency, locale)}`}
        </div>
      </td>
      <td className="py-3 align-top text-right">
        <div className="flex items-center justify-end gap-2">
          {markers.includes(5) ? <Pin n={5} at="above" cancel="-mr-2" /> : null}
          <button
            className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-50 dark:bg-green-900/20 dark:text-green-400"
            title={c.ui['matching.unified_list.confirm_title']}
          >
            <CheckCircleIcon className="size-4" />
            {c.ui['matching.unified_list.confirm_action']}
          </button>
          <button
            className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-200 disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-400"
            title={c.ui['matching.unified_list.reject_title']}
          >
            <XCircleIcon className="size-4" />
            {c.ui['matching.unified_list.reject_action']}
          </button>
        </div>
      </td>
    </tr>
  )
}

function MatchingPage({ locale }: { locale: Locale }) {
  const c = matchingCopy[locale]
  const ui = c.ui
  const groups = c.queue.groups
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Heading>{ui['matching.page.title']}</Heading>
        <div className="flex items-center gap-2">
          <Pin n={2} at="left" cancel="-mr-2" />
          <div className="relative">
            <Button outline>
              <ClockIcon className="size-4" />
              {ui['matching.history.button']}
            </Button>
          </div>
          <Button outline className="gap-1">
            {ui['matching.run_button.label_idle']}
            <ChevronDownIcon className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mt-6 flex gap-1 border-b border-zinc-200 dark:border-zinc-700">
        <span className={tabClass(false)}>{ui['matching.page.tab_overview']}</span>
        <span className={tabClass(true)}>
          <Pin n={1} at="above" cancel="" />
          {ui['matching.page.tab_matches']}
        </span>
        <span className={tabClass(false)}>{ui['matching.page.tab_partners']}</span>
        <span className={tabClass(false)}>{ui['matching.page.tab_settlement']}</span>
      </div>

      <div className="mt-8">
        <div className="mt-4 space-y-10">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">{ui['matching.unified_list.section_pending']}</h2>
              <Badge color="yellow">{groups.length}</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className={TH}>{ui['matching.unified_list.header_score']}</th>
                    <th className={TH}>{ui['matching.unified_list.header_invoice']}</th>
                    <th className={TH}>{ui['matching.unified_list.header_transaction']}</th>
                    <th className="py-3 text-right text-xs font-medium uppercase tracking-wide text-zinc-500">
                      {ui['matching.unified_list.header_actions']}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {groups.map((group, i) => (
                    <QueueRow
                      key={group.invoiceNumber}
                      group={group}
                      locale={locale}
                      markers={i === 0 ? [3, 5] : group.scores.length > 1 ? [4] : []}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">{ui['matching.unified_list.section_approved']}</h2>
              <Badge color="zinc">{c.queue.approvedTotal}</Badge>
            </div>
            {/* Below the crop line; kept so the heading gets the app's spacing. */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-48">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="search"
                  aria-label={ui['matching.unified_list.search_aria']}
                  placeholder={ui['matching.unified_list.search_placeholder']}
                  defaultValue=""
                  className="w-full rounded-md border border-zinc-300 bg-white py-1.5 pl-8 pr-3 text-sm text-zinc-900 placeholder-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Narrower than this, the queue's table squeezes its columns (invoice numbers
// wrap), so a phone lays it out at this width and zooms, and Enlarge uses it too.
const QUEUE_MIN_WIDTH = 760

export function MatchingQueueFigure({ locale, children }: FigureProps) {
  const c = matchingCopy[locale]
  return (
    <Figure
      alt={c.help.alt.queue}
      bleed
      wide
      zoomable={locale}
      zoomWidth={QUEUE_MIN_WIDTH}
      art={
        <AppScreen minWidth={QUEUE_MIN_WIDTH} clipHeight={556}>
          <MatchingPage locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── The transaction page's Matching & payment card ──────────────────────────

function MatchPaymentCard({ locale }: { locale: Locale }) {
  const c = matchingCopy[locale]
  const ui = c.ui
  const s = c.tx.suggestion
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* TransactionDetailV2Client Card */}
      <section className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
        <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          {ui['transactions.detail.section_match_payment']}
        </h2>
        <div className="mt-3">
          {/* MatchPanel: an unmatched transaction with one suggestion, Find invoice open */}
          <div className="space-y-3">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                {ui['transactions.slide_over.ai_suggestions']}
              </p>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800/50 dark:bg-amber-950/20">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Pin n={1} at="left" cancel="-mr-2" />
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          s.score >= 80
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}
                      >
                        {fill(ui['labels.score_percent'], { score: s.score })}
                      </span>
                      <span className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">{s.invoiceNumber}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>{fill(ui['transactions.slide_over.counterparty_separator'], { name: s.partner })}</span>
                      {formatAmount(s.amount, s.currency, locale)}
                    </div>
                    <p className="mt-1 text-xs italic text-zinc-500 dark:text-zinc-400">{s.reason}</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    className="rounded bg-green-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    {ui['transactions.slide_over.confirm']}
                  </button>
                  <button
                    type="button"
                    className="rounded border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  >
                    {ui['transactions.slide_over.dismiss']}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <Pin n={2} at="left" cancel="" />
                    {ui['transactions.slide_over.find_invoice']}
                  </span>
                  <button type="button" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                    {ui['transactions.slide_over.cancel']}
                  </button>
                </div>
                <input
                  type="text"
                  placeholder={ui['transactions.slide_over.search_placeholder_invoice']}
                  defaultValue=""
                  className="w-full rounded border border-zinc-300 bg-white px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                />
                {c.tx.openInvoices.map((inv, i) => (
                  <button
                    key={inv.number}
                    type="button"
                    className="w-full rounded border border-zinc-200 bg-white px-3 py-2 text-left hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-500 dark:hover:bg-blue-950/20"
                  >
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {i === 1 ? <Pin n={3} at="left" cancel="" /> : null}
                      {inv.number}
                      <span className="ml-2 font-normal text-zinc-500">
                        {fill(ui['transactions.slide_over.counterparty_prefix'], { name: inv.partner })}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatAmount(inv.total, inv.currency, locale)}
                      {inv.balance != null && inv.balance !== inv.total && (
                        <span> {fill(ui['transactions.slide_over.balance_note'], { amount: formatAmount(inv.balance, inv.currency, locale) })}</span>
                      )}
                      <span>{fill(ui['transactions.slide_over.issue_date_suffix'], { date: inv.issueDate })}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* NoInvoiceNeededControl: the mark picker of an unmatched transaction */}
          <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <div className="space-y-2">
              <Select defaultValue="">
                <option value="">{ui['transactions.slide_over.mark_no_invoice_placeholder']}</option>
                <option value="__none__">{ui['transactions.slide_over.no_specific_type']}</option>
                {c.tx.types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export function TransactionMatchFigure({ locale, children }: FigureProps) {
  const c = matchingCopy[locale]
  return (
    <Figure
      alt={c.help.alt.tx}
      bleed
      wide
      zoomable={locale}
      art={
        <AppScreen>
          <MatchPaymentCard locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

