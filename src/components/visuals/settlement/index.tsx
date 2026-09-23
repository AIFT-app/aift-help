// How a credit note nets against an invoice, for the settlement article.
//
// Not an app screen: the workbench shows this as two columns of ticked rows
// and a running total, and the arithmetic is what readers get wrong. The
// amounts are formatted by the app's own formatter (../format) so they read
// exactly as they do in the product, and the "Nets to zero" pill is the app's
// own label from ./copy.ts.

import type { Locale } from '@/lib/i18n'
import { formatAmount } from '../format'
import { Figure, Pill } from '../kit'
import { settlementCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const PAYMENT = 238118
const INVOICE = 251771
const CREDIT = -13653
const CURRENCY = 'HUF'

function Amount({ value, locale, strong }: { value: number; locale: Locale; strong?: boolean }) {
  return (
    <span
      className={[
        'app-screen font-mono text-sm tabular-nums',
        strong ? 'font-semibold text-zinc-900' : 'text-zinc-700',
        value < 0 ? 'text-red-700' : '',
      ].join(' ')}
    >
      {formatAmount(value, CURRENCY, locale)}
    </span>
  )
}

function Row({ label, value, locale, note }: { label: string; value: number; locale: Locale; note?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg border border-zinc-200 bg-zinc-50/60 px-3 py-2">
      <span className="text-sm text-zinc-700">{label}</span>
      <Amount value={value} locale={locale} />
      {note ? <span className="w-full text-xs text-zinc-500">{note}</span> : null}
    </div>
  )
}

export function SettlementNettingFigure({ locale, children }: FigureProps) {
  const c = settlementCopy[locale]
  const h = c.help
  return (
    <Figure
      alt={h.alt}
      art={
        <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
          <div className="flex flex-col gap-4 @xl:flex-row @xl:items-stretch">
            {/* The payment */}
            <div className="flex-1">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">{h.paymentSide}</p>
              <div className="flex h-[calc(100%-1.75rem)] flex-col justify-center rounded-lg border border-zinc-300 bg-white px-3 py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-zinc-700">{h.payment}</span>
                  <Amount value={PAYMENT} locale={locale} strong />
                </div>
              </div>
            </div>

            {/* The documents it covers */}
            <div className="flex-1">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">{h.invoiceSide}</p>
              <div className="flex flex-col gap-2">
                <Row label={h.invoice} value={INVOICE} locale={locale} />
                <Row label={h.credit} value={CREDIT} locale={locale} note={h.creditNote} />
              </div>
            </div>
          </div>

          {/* The arithmetic, spelled out */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-zinc-200 pt-3">
            <span className="app-screen font-mono text-sm tabular-nums text-zinc-700">
              {formatAmount(INVOICE, CURRENCY, locale)} {'−'} {formatAmount(-CREDIT, CURRENCY, locale)} ={' '}
              {formatAmount(PAYMENT, CURRENCY, locale)}
            </span>
            <span className="app-screen contents">
              <Pill tone="emerald" size="md">
                {c.ui['matching.settlement.nets_to_zero']}
              </Pill>
            </span>
          </div>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
