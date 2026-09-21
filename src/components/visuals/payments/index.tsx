// An app screen and a diagram for the paying-approved-invoices article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-21), class for
// class, with the real Catalyst components from the help mirror:
//   PaymentFilePage   src/app/(app)/workspaces/[workspaceId]/payments/page.tsx
//                     + payments/_components/PaymentFilePage.tsx (the page,
//                     one group, LineRow, BlockedRow; cropped above Files)
//   pill / evidence   src/components/approvals/PayeeAccountPill.tsx
//                     + src/components/approvals/PayeeConfirmationLine.tsx
// The page shows the workspace without the company register check, so the
// evidence line is the person who confirmed the account. When one of those
// files changes, re-copy the markup here. Data comes from ./copy.ts and is
// fictional.

import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { Label } from '@/components/catalyst/fieldset'
import { Heading } from '@/components/catalyst/heading'
import { Select } from '@/components/catalyst/select'
import { Text } from '@/components/catalyst/text'
import { fill } from '../approvals/copy'
import { formatAmount, formatDate } from '../format'
import { AppScreen, Figure, Pill, Pin, type Tone } from '../kit'
import { StepList } from '../StepList'
import { FILE_SEQ, paymentsCopy, type PaymentLine, type PayeeStatus } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// aift-web src/lib/payee-account.ts PAYEE_ACCOUNT_TONE, for the two states shown.
const PAYEE_TONE: Record<PayeeStatus, Tone> = { confirmed: 'emerald', first_seen: 'amber' }

/** PayeeAccountPill, size sm (the kit's Pill is the same markup). */
function PayeePill({ status, locale }: { status: PayeeStatus; locale: Locale }) {
  return <Pill tone={PAYEE_TONE[status]}>{paymentsCopy[locale].ui[`approvals.payee_account.status.${status}`]}</Pill>
}

function LineRow({ line, locale, annotate }: { line: PaymentLine; locale: Locale; annotate: boolean }) {
  const ui = paymentsCopy[locale].ui
  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <Checkbox defaultChecked={line.selected} className="mt-1" />
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
          {annotate ? <Pin n={3} at="right" cancel="-ml-2" /> : null}
        </p>
        {line.confirmedBy ? (
          <span className="mt-1 block text-xs text-zinc-500">
            {fill(ui['approvals.payee_account.registry.confirmed_by_person'], { name: line.confirmedBy })}
            {annotate ? <Pin n={2} at="right" cancel="" /> : null}
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

function PaymentFilePage({ locale }: { locale: Locale }) {
  const c = paymentsCopy[locale]
  const ui = c.ui
  const total = c.lines.reduce((s, l) => s + l.amount, 0)
  const picked = c.lines.filter((l) => l.selected)
  const pickedTotal = picked.reduce((s, l) => s + l.amount, 0)
  const allOn = picked.length === c.lines.length
  // The default format is the spreadsheet; MBH lists all three for HUF (payord
  // is HUF only). The hint is the bank's, whatever the format.
  const formats = c.currency === 'HUF' ? (['xlsx', 'pain001', 'payord'] as const) : (['xlsx', 'pain001'] as const)
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Heading>{ui['approvals.payments.title']}</Heading>
      <div className="mt-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Text>{fill(ui['approvals.payments.subtitle'], { count: c.lines.length, blocked: c.blocked.length })}</Text>
            <a
              className={clsx(
                'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium',
                'border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800',
              )}
            >
              {ui['approvals.payments.show_filed']}
            </a>
          </div>

          <p className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-300">
            {ui['approvals.payments.proposal_note']}
          </p>

          <section className="mt-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-700 dark:bg-zinc-900/40">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                  {c.company}
                  <span className="ml-2 font-mono text-xs font-normal text-zinc-500">{c.payingAccount}</span>
                </p>
                <p className="text-xs text-zinc-500">
                  {fill(ui['approvals.payments.group_lines'], { count: c.lines.length })} ·{' '}
                  {fill(ui['approvals.payments.group_total'], { amount: formatAmount(total, c.currency, locale) })}
                  {/* Not after the account: in German the Format picker starts right there. */}
                  <Pin n={1} at="right" cancel="" />
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Pin n={4} at="left" cancel="-mr-2" />
                <label className="flex items-center gap-2 text-xs text-zinc-500">
                  {ui['approvals.payments.format_pick']}
                  <Select defaultValue="xlsx" className="!w-56">
                    {formats.map((f) => (
                      <option key={f} value={f}>
                        {ui[`approvals.payments.format_${f}`]}
                      </option>
                    ))}
                  </Select>
                </label>
                <Button>{ui['approvals.payments.download_xlsx']}</Button>
              </div>
            </header>

            <p className="border-b border-zinc-200 px-4 py-1.5 text-xs text-zinc-500 dark:border-zinc-700">
              {fill(ui['approvals.payments.bank_hint_documented'], { bank: c.bankName })}
            </p>

            <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-700">
              <CheckboxField>
                <Checkbox defaultChecked={allOn} />
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
    </div>
  )
}

// The line rows wrap their date meta line below this width, and the group
// header drops the Format picker onto its own line: lay out at this width on
// phones and zoom, like the approval queue.
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
          <PaymentFilePage locale={locale} />
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
