// The two rates a foreign-currency document can carry, for the multi-currency
// article.
//
// Not an app screen: the two rates never appear side by side in the product,
// which is exactly why readers confuse them. Everything here is this article's
// own text (./copy.ts), checked against the app's behaviour on origin/main.

import type { Locale } from '@/lib/i18n'
import { Figure } from '../kit'
import { currencyCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

function Column({
  title,
  subtitle,
  rows,
  labels,
  accent,
}: {
  title: string
  subtitle: string
  rows: readonly string[]
  labels: readonly string[]
  accent: 'blue' | 'amber'
}) {
  return (
    <div className="flex-1 overflow-hidden rounded-lg border border-zinc-200">
      <div className={accent === 'blue' ? 'bg-blue-50/70 px-3 py-2' : 'bg-amber-50/70 px-3 py-2'}>
        <p className="text-sm font-medium text-zinc-900">{title}</p>
        <p className="mt-0.5 text-xs text-zinc-600">{subtitle}</p>
      </div>
      <dl className="divide-y divide-zinc-200">
        {rows.map((row, i) => (
          <div key={labels[i]} className="px-3 py-2">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">{labels[i]}</dt>
            <dd className="mt-0.5 text-xs text-zinc-700">{row}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function TwoRatesFigure({ locale, children }: FigureProps) {
  const c = currencyCopy[locale]
  return (
    <Figure
      alt={c.alt}
      art={
        <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
          <div className="flex flex-col gap-3 @xl:flex-row">
            <Column title={c.base.title} subtitle={c.base.subtitle} rows={c.base.rows} labels={c.labels} accent="blue" />
            <Column
              title={c.booking.title}
              subtitle={c.booking.subtitle}
              rows={c.booking.rows}
              labels={c.labels}
              accent="amber"
            />
          </div>
          <p className="mt-3 text-xs text-zinc-600">{c.footnote}</p>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
