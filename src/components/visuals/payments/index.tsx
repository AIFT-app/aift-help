// App screens and a diagram for the paying-approved-invoices article.
//
// The screens are rebuilt 1:1 from aift-web (origin/main, 2026-09-29, after
// payment-file-workflow), class for class, with the real Catalyst components
// from the help mirror:
//   header + tabs   src/app/(app)/workspaces/[workspaceId]/payments/layout.tsx
//                   + payments/_components/PaymentsTabs.tsx
//   filter bar      src/components/list-view/filter-bar.tsx (at rest, the To
//                   pay config of payments/page.tsx) and
//                   src/components/date-range/date-range-filter.tsx (trigger)
//   To pay          payments/_components/PaymentFilePage.tsx (the page, one
//                   group, LineRow, BlockedRow; cropped above the format hint)
//   pill / evidence src/components/approvals/PayeeAccountPill.tsx
//                   + src/components/approvals/PayeeConfirmationLine.tsx
//   dialog          payments/_components/CreatePaymentFileDialog.tsx, the
//                   Dialog panel (catalyst/dialog.tsx, size 2xl) without the
//                   backdrop, cropped to the panel
//   file page       payments/_components/PaymentFileDetailView.tsx
//                   + PaymentFileStateBadge.tsx
// The workspace has no company register check, so the evidence line is the
// person who confirmed the account. When one of those files changes, re-copy
// the markup here. Data comes from ./copy.ts and is fictional. Verified against
// the real components rendered with the same data (help-screen-css-diff.mjs).

import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { DialogActions, DialogBody } from '@/components/catalyst/dialog'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Heading, Subheading } from '@/components/catalyst/heading'
import { Select } from '@/components/catalyst/select'
import { Text } from '@/components/catalyst/text'
import { fill } from '../approvals/copy'
import { formatAmount, formatDate, formatDateTime } from '../format'
import { AppScreen, Figure, Pill, Pin, type Tone } from '../kit'
import { StepList } from '../StepList'
import { FILE_SEQ, PAYMENT_FILE, paymentsCopy, type PaymentLine, type PayeeStatus } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// aift-web src/lib/payee-account.ts PAYEE_ACCOUNT_TONE, for the two states shown.
const PAYEE_TONE: Record<PayeeStatus, Tone> = { confirmed: 'emerald', first_seen: 'amber' }

/** PayeeAccountPill, size sm (the kit's Pill is the same markup). */
function PayeePill({ status, locale }: { status: PayeeStatus; locale: Locale }) {
  return <Pill tone={PAYEE_TONE[status]}>{paymentsCopy[locale].ui[`approvals.payee_account.status.${status}`]}</Pill>
}

/**
 * aift-web src/lib/own-bank-account-label.ts fullAccountNumber, for the two
 * shapes shown: a Hungarian 8-8 number unchanged, an IBAN grouped by four.
 */
function fullNumber(account: string): string {
  return /^[A-Z]{2}\d/.test(account) ? (account.match(/.{1,4}/g) ?? [account]).join(' ') : account
}

// ── The Payments header and its two tabs (layout.tsx + PaymentsTabs.tsx) ────

const TAB_BASE = 'inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors'
const TAB_ACTIVE = 'border-blue-600 text-zinc-950 dark:border-blue-500 dark:text-white'
const TAB_IDLE =
  'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200'

function PaymentsPage({
  locale,
  active,
  annotateTabs,
  children,
}: {
  locale: Locale
  active: 'to_pay' | 'files'
  annotateTabs?: boolean
  children: React.ReactNode
}) {
  const ui = paymentsCopy[locale].ui
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Heading>{ui['approvals.payments.title']}</Heading>
      <div className="mt-6">
        <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-1 border-b border-zinc-200 dark:border-zinc-700">
          {(['to_pay', 'files'] as const).map((tab) => (
            <a
              key={tab}
              aria-current={tab === active ? 'page' : undefined}
              className={clsx(TAB_BASE, tab === active ? TAB_ACTIVE : TAB_IDLE)}
            >
              {ui[`approvals.payments.tabs.${tab}`]}
            </a>
          ))}
          {annotateTabs ? <Pin n={1} at="right" cancel="-ml-6" /> : null}
        </nav>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}

// ── The filter bar at rest (filter-bar.tsx, To pay config) ──────────────────

const FILTER_SELECT =
  'rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
const PILL_ON =
  'inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
const PILL_OFF =
  'inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'

function PillX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="-mr-0.5 h-3 w-3 opacity-70">
      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
    </svg>
  )
}

function FilterBar({ locale }: { locale: Locale }) {
  const c = paymentsCopy[locale]
  const ui = c.ui
  const all = (label: string, allLabel: string) => fill(ui['list_view_filter.bar.dropdown_all'], { label, allLabel })
  const opt = (label: string, value: string) => fill(ui['list_view_filter.bar.dropdown_option'], { label, value })
  const f = (k: string) => ui[`approvals.payments.filters.${k}` as keyof typeof ui]
  return (
    <div className="rounded-md bg-zinc-50 p-2 dark:bg-zinc-900/60">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{f('due')}</span>
        <div className="relative inline-block">
          <button
            type="button"
            aria-expanded="false"
            aria-haspopup="dialog"
            className="inline-flex h-8 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-medium text-zinc-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900 dark:bg-blue-950/40 dark:text-zinc-100 dark:hover:bg-blue-900/40"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4 text-blue-600 dark:text-blue-400">
              <path
                fillRule="evenodd"
                d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2ZM4.75 5.5c-.69 0-1.25.56-1.25 1.25V8h13V6.75c0-.69-.56-1.25-1.25-1.25H4.75Zm11.75 4h-13v5.75c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="tabular-nums">{ui['date_filter.all_time']}</span>
            <span aria-hidden="true" className="text-xs text-zinc-500">
              ▾
            </span>
          </button>
        </div>
        <select className={FILTER_SELECT} defaultValue="">
          <option value="">{all(f('account'), f('account_all'))}</option>
          <option value="acct-1">{opt(f('account'), `${c.accountName} · ${c.payingAccount}`)}</option>
        </select>
        <select className={FILTER_SELECT} defaultValue="">
          <option value="">{all(f('method'), f('method_all'))}</option>
          <option value="transfer">{opt(f('method'), f('method_transfer'))}</option>
          <option value="other">{opt(f('method'), f('method_other'))}</option>
        </select>
        <div className="relative inline-block">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <span>{all(f('company'), f('company_all'))}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="h-4 w-4 text-zinc-500">
              <path
                fillRule="evenodd"
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="relative max-w-[360px] flex-1 min-w-[220px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            readOnly
            placeholder={f('search')}
            className="w-full rounded-md border border-zinc-300 bg-white pl-8 pr-8 py-1.5 text-sm placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            value=""
          />
        </div>
        <div role="group" className="inline-flex flex-wrap items-center gap-0.5 rounded-md border border-zinc-200 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900">
          <button type="button" aria-pressed="true" className={PILL_ON}>
            <span>{f('status_ready')}</span>
            <PillX />
          </button>
          <button type="button" aria-pressed="true" className={PILL_ON}>
            <span>{f('status_blocked')}</span>
            <PillX />
          </button>
          <button type="button" aria-pressed="false" className={PILL_OFF}>
            <span>{f('status_filed')}</span>
          </button>
        </div>
        <Pin n={2} at="right" cancel="-ml-2" />
      </div>
    </div>
  )
}

// ── To pay (PaymentFilePage.tsx) ─────────────────────────────────────────────

function LineRow({ line, locale, annotate }: { line: PaymentLine; locale: Locale; annotate: boolean }) {
  const ui = paymentsCopy[locale].ui
  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <Checkbox checked={!!line.selected} className="mt-1" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="truncate text-sm font-medium text-zinc-950 dark:text-white">{line.payee}</p>
          <p className="tabular-nums text-sm font-semibold text-rose-600 dark:text-rose-400">
            {formatAmount(line.amount, line.currency, locale)}
          </p>
        </div>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-zinc-500">
          <span className="font-mono">{line.account}</span>
          <PayeePill status={line.status} locale={locale} />
          <span>·</span>
          <a className="underline-offset-2 hover:underline">{line.invoiceNumber}</a>
          <span>·</span>
          <span>
            {ui['approvals.payments.col_due']} {formatDate(line.dueDate, locale)}
          </span>
          <span>·</span>
          <span>
            {ui['approvals.payments.col_execution']} {formatDate(line.executionDate, locale)}
          </span>
          <span>·</span>
          <span data-testid="payment-line-reference">
            {ui['approvals.payments.col_reference']} <span className="font-mono">{line.invoiceNumber}</span>
          </span>
          {annotate ? <Pin n={4} at="right" cancel="-ml-2" /> : null}
        </p>
        {line.confirmedBy ? (
          <span className="mt-1 block text-xs text-zinc-500" data-confirmed-source="human">
            {fill(ui['approvals.payee_account.registry.confirmed_by_person'], { name: line.confirmedBy })}
          </span>
        ) : null}
      </div>
    </li>
  )
}

function BlockedRow({ line, locale }: { line: PaymentLine; locale: Locale }) {
  const ui = paymentsCopy[locale].ui
  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <p className="truncate text-sm font-medium text-zinc-950 dark:text-white">{line.payee}</p>
          <p className="tabular-nums text-sm font-semibold text-rose-600 dark:text-rose-400">
            {formatAmount(line.amount, line.currency, locale)}
          </p>
        </div>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-zinc-500">
          <span className="font-mono">{line.account}</span>
          <PayeePill status={line.status} locale={locale} />
          <span>·</span>
          <a className="underline-offset-2 hover:underline">{line.invoiceNumber}</a>
          <span>·</span>
          <span>
            {ui['approvals.payments.col_due']} {formatDate(line.dueDate, locale)}
          </span>
        </p>
        <p className="mt-1 text-xs text-amber-800 dark:text-amber-200">{ui['approvals.payments.reason_payee_first_seen']}</p>
        <p className="mt-1 flex gap-3 text-xs">
          <a className="underline-offset-2 hover:underline">{ui['approvals.payments.open_partner']}</a>
          <a className="underline-offset-2 hover:underline">{ui['approvals.payments.open_invoice']}</a>
        </p>
      </div>
    </li>
  )
}

function ToPayBody({ locale }: { locale: Locale }) {
  const c = paymentsCopy[locale]
  const ui = c.ui
  const total = c.lines.reduce((s, l) => s + l.amount, 0)
  const picked = c.lines.filter((l) => l.selected)
  const pickedTotal = picked.reduce((s, l) => s + l.amount, 0)
  return (
    <div className="space-y-4">
      <FilterBar locale={locale} />
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Text>{fill(ui['approvals.payments.subtitle'], { count: c.lines.length, blocked: c.blocked.length })}</Text>
          <Button data-testid="create-files-for-selected">{ui['approvals.payments.workflow.create_one']}</Button>
        </div>

        <p className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-300">
          {ui['approvals.payments.proposal_note']}
        </p>

        <section className="mt-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-900/40">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-950 dark:text-white" title={c.payingAccount}>
                {c.accountName}
                <span className="ml-2 font-mono text-xs font-normal text-zinc-600 dark:text-zinc-400">{c.payingAccount}</span>
                <Pin n={3} at="right" cancel="" />
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {c.company} · {c.currency} · {fill(ui['approvals.payments.group_lines'], { count: c.lines.length })} ·{' '}
                {fill(ui['approvals.payments.group_total'], { amount: formatAmount(total, c.currency, locale) })}
              </p>
            </div>
            <Button outline>{ui['approvals.payments.workflow.create_one']}</Button>
          </header>

          <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-700">
            <CheckboxField>
              <Checkbox checked={false} />
              <Label className="!text-xs">{ui['approvals.payments.select_all']}</Label>
            </CheckboxField>
            {picked.length > 0 && (
              <span className="tabular-nums">
                {fill(ui['approvals.payments.selected'], { count: picked.length })} · {formatAmount(pickedTotal, c.currency, locale)}
              </span>
            )}
          </div>

          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {c.lines.map((l, i) => (
              <LineRow key={l.invoiceNumber} line={l} locale={locale} annotate={i === 0} />
            ))}
          </ul>
        </section>

        <section className="mt-5 overflow-hidden rounded-xl border border-amber-200 dark:border-amber-900/50">
          <header className="border-b border-amber-200 bg-amber-50 px-4 py-2.5 dark:border-amber-900/50 dark:bg-amber-900/20">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              {ui['approvals.payments.blocked_title']}
              <Pin n={5} at="right" cancel="" />
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-300">{ui['approvals.payments.blocked_hint']}</p>
          </header>
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {c.blocked.map((l) => (
              <BlockedRow key={l.invoiceNumber} line={l} locale={locale} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

// Line rows wrap their meta line below this width, and the filter bar wraps
// onto a third row: lay out at this width on phones and zoom.
const PAYMENT_MIN_WIDTH = 768

export function PaymentFileFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={paymentsCopy[locale].help.alt.page}
      bleed
      wide
      zoomable={locale}
      zoomWidth={PAYMENT_MIN_WIDTH}
      art={
        <AppScreen minWidth={PAYMENT_MIN_WIDTH}>
          <PaymentsPage locale={locale} active="to_pay" annotateTabs>
            <ToPayBody locale={locale} />
          </PaymentsPage>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── Create payment file (CreatePaymentFileDialog.tsx) ────────────────────────

export function CreateFileDialogFigure({ locale, children }: FigureProps) {
  const c = paymentsCopy[locale]
  const ui = c.ui
  const w = (k: string) => ui[`approvals.payments.workflow.${k}` as keyof typeof ui]
  const picked = c.lines.filter((l) => l.selected)
  const total = picked.reduce((s, l) => s + l.amount, 0)
  // MBH lists all three formats for HUF (payord is HUF only); the bank file is
  // the one this account produced last time, so it is preselected.
  const formats = c.currency === 'HUF' ? (['xlsx', 'pain001', 'payord'] as const) : (['xlsx', 'pain001'] as const)
  return (
    <Figure
      alt={c.help.alt.dialog}
      wide
      zoomable={locale}
      zoomWidth={PAYMENT_MIN_WIDTH}
      art={
        <AppScreen minWidth={PAYMENT_MIN_WIDTH}>
          <div className="flex items-center justify-center bg-white p-4">
            {/* The Dialog panel without the backdrop. Its DialogTitle is
                Headless UI's, which throws outside a Dialog, so the title is
                the h2 Headless renders, class for class. ONE deliberate
                difference: the app's max-h-[calc(100vh-2rem)] is swapped for
                max-h-none, because 100vh here is the READER's window, and on a
                short one the body would scroll and cut the Execution date
                off. The figure shows the panel as a tall screen does. */}
            <div className="flex max-h-none w-full flex-col rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10 sm:max-w-2xl">
              <h2 className="shrink-0 text-base/6 font-semibold text-zinc-950 dark:text-white">{c.rendered.title_one}</h2>
              <DialogBody className="space-y-6">
                <Text>{w('intro')}</Text>

                <section className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700" data-testid="create-file-group">
                  <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                    {fill(w('file_n'), { n: 1 })} · {c.company} · {c.currency}
                  </p>

                  <div className="mt-3 grid gap-4 sm:grid-cols-3">
                    <Field>
                      <Label>{w('step_account')}</Label>
                      <Select defaultValue="acct-1" aria-describedby="acct-num">
                        <option value="acct-1" title={c.payingAccount}>
                          {c.accountName}
                        </option>
                      </Select>
                      <p id="acct-num" className="mt-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                        {c.payingAccount}
                        <Pin n={1} at="right" cancel="" />
                      </p>
                    </Field>
                    <Field>
                      <Label>
                        {w('step_format')}
                        <Pin n={2} at="right" cancel="" />
                      </Label>
                      <Select defaultValue="pain001">
                        {formats.map((f) => (
                          <option key={f} value={f}>
                            {ui[`approvals.payments.format_${f}`]}
                          </option>
                        ))}
                      </Select>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {fill(ui['approvals.payments.bank_hint_documented'], { bank: c.bankName })}
                      </p>
                    </Field>
                    <div>
                      <p className="text-sm font-medium text-zinc-950 dark:text-white">{w('summary')}</p>
                      <p className="mt-2 text-sm tabular-nums text-zinc-700 dark:text-zinc-300">
                        {fill(ui['approvals.payments.group_lines'], { count: picked.length })} · {formatAmount(total, c.currency, locale)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-medium text-zinc-950 dark:text-white">
                    {w('step_review')}
                    <Pin n={3} at="right" cancel="" />
                  </p>
                  <ul className="mt-2 max-h-56 divide-y divide-zinc-100 overflow-y-auto rounded-lg border border-zinc-200 text-xs dark:divide-zinc-800 dark:border-zinc-700">
                    {picked.map((l) => (
                      <li key={l.invoiceNumber} className="flex flex-wrap items-baseline justify-between gap-x-3 px-3 py-1.5">
                        <span className="min-w-0 truncate text-zinc-900 dark:text-zinc-100">{l.payee}</span>
                        <span className="font-mono text-zinc-600 dark:text-zinc-400">{l.invoiceNumber}</span>
                        <span className="tabular-nums text-zinc-900 dark:text-zinc-100">{formatAmount(l.amount, l.currency, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <Field>
                  <Label>
                    {w('step_date')}
                    <Pin n={4} at="right" cancel="" />
                  </Label>
                  <Select defaultValue="due_or_today">
                    <option value="due_or_today">{w('date_due')}</option>
                    <option value="today">{w('date_asap')}</option>
                  </Select>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{w('date_due_hint')}</p>
                </Field>

                <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-300">
                  {w('one_file_per_account')}
                </p>
              </DialogBody>
              <DialogActions>
                <Button plain>{w('cancel')}</Button>
                <Pin n={5} at="above" cancel="-mr-3" />
                <Button>{c.rendered.generate_one}</Button>
              </DialogActions>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── One payment file (PaymentFileDetailView.tsx) ─────────────────────────────

const STATUS_P = 'mt-1 flex flex-wrap items-center gap-2 text-xs'

export function PaymentFileDetailFigure({ locale, children }: FigureProps) {
  const c = paymentsCopy[locale]
  const ui = c.ui
  const fl = (k: string) => ui[`approvals.payments.files.${k}` as keyof typeof ui]
  const lines = c.lines
  const total = lines.reduce((s, l) => s + l.amount, 0)
  return (
    <Figure
      alt={c.help.alt.file}
      bleed
      wide
      zoomable={locale}
      zoomWidth={PAYMENT_MIN_WIDTH}
      art={
        <AppScreen minWidth={PAYMENT_MIN_WIDTH}>
          <PaymentsPage locale={locale} active="files">
            <div>
              <a className="text-sm text-zinc-600 hover:underline dark:text-zinc-400">{fl('back')}</a>
              <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <Subheading>{fill(fl('detail_title'), { seq: FILE_SEQ })}</Subheading>
                    <Badge color="blue" data-testid="payment-file-state-partially_paid">
                      {fl('state_partially_paid')}
                    </Badge>
                  </div>
                  <Text className="mt-1">
                    {fill(fl('detail_meta'), {
                      when: formatDateTime(PAYMENT_FILE.generatedAt, locale),
                      who: PAYMENT_FILE.generatedBy,
                      account: `${c.accountName} · ${c.payingAccount}`,
                      format: ui['approvals.payments.format_pain001'],
                    })}
                  </Text>
                  <Text className="mt-1">
                    {fill(fl('detail_counts'), { settled: 1, included: lines.length - 1, released: 0 })} ·{' '}
                    {formatAmount(total, c.currency, locale)}
                    <Pin n={1} at="right" cancel="" />
                  </Text>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button plain>{fl('download_again')}</Button>
                  {/* Between the buttons, pointing into the gap above the
                      lines: after them it hangs past the screen's right edge,
                      and before them it leaves the screen when the row wraps. */}
                  <Pin n={2} at="below" cancel="-mr-2" />
                  <Button plain>{fl('release_file')}</Button>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-700">
                {lines.map((l, i) => (
                  <li key={l.invoiceNumber} className="flex flex-wrap items-start gap-3 px-4 py-3" data-testid="payment-file-line">
                    <span className="w-8 text-xs tabular-nums text-zinc-600 dark:text-zinc-400">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <p className="truncate text-sm font-medium text-zinc-950 dark:text-white">{l.payee}</p>
                        <p className="tabular-nums text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {formatAmount(l.amount, l.currency, locale)}
                        </p>
                      </div>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <span className="font-mono">{fullNumber(l.account)}</span>
                        <span>·</span>
                        <a className="underline-offset-2 hover:underline">{l.invoiceNumber}</a>
                        <span>·</span>
                        <span>
                          {fl('line_reference')} <span className="font-mono">{l.invoiceNumber}</span>
                        </span>
                        <span>·</span>
                        <span>
                          {fl('line_execution')} {formatDate(l.executionDate, locale)}
                        </span>
                      </p>
                      {i === 0 ? (
                        <p className={STATUS_P}>
                          <Badge color="emerald">{fl('line_status_settled')}</Badge>
                          <a className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400">
                            {fill(fl('line_transaction'), { id: PAYMENT_FILE.transactionId })}
                            {` · ${formatDate(PAYMENT_FILE.transactionDate, locale)}`}
                          </a>
                          <Pin n={3} at="right" cancel="-ml-2" />
                        </p>
                      ) : (
                        <p className={STATUS_P}>
                          <Badge color="zinc">{fl('line_status_included')}</Badge>
                          <button
                            type="button"
                            className="font-medium text-zinc-700 underline underline-offset-2 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                          >
                            {fl('release_line')}
                          </button>
                          {i === 1 ? <Pin n={4} at="right" cancel="-ml-2" /> : null}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </PaymentsPage>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── From approval to paid (a diagram, not an app screen) ────────────────────

export function PaymentFlowFigure({ locale, children }: FigureProps) {
  const c = paymentsCopy[locale]
  const ui = c.ui
  const f = c.help.flow
  return (
    <Figure
      alt={c.help.alt.flow}
      art={
        <StepList
          steps={[
            {
              title: f.approved,
              detail: f.approvedDetail,
              outcomes: [{ kind: 'pill', tone: 'emerald', label: ui['invoices.labels.approved'] }],
            },
            {
              title: f.file,
              detail: f.fileDetail,
              outcomes: [{ kind: 'pill', tone: 'zinc', label: fill(ui['approvals.payments.filed_badge'], { seq: FILE_SEQ }) }],
            },
            { title: f.netbank, detail: f.netbankDetail },
            {
              title: f.statement,
              detail: f.statementDetail,
              outcomes: [{ kind: 'text', label: fill(ui['matching.detail.matched_from_payment_file'], { seq: FILE_SEQ }) }],
            },
            {
              title: f.paid,
              detail: f.paidDetail,
              outcomes: [{ kind: 'pill', tone: 'emerald', label: ui['invoices.matching.status_paid'] }],
            },
          ]}
          footnote={{ text: f.release, outcomes: [{ kind: 'text', label: ui['approvals.payments.release'] }] }}
        />
      }
    >
      {children}
    </Figure>
  )
}
