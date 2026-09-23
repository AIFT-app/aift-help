// Where a confidence lands, for the categorising article.
//
// Not an app screen: the app never shows the two taxonomies' thresholds
// together, and four numbers in prose do not survive a reading. The bands are
// the real ones (aift-api _shared/categorization-threshold.ts and
// _shared/categorize-line-items.ts, origin/main 2026-09-23).

import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Figure, Pill } from '../kit'
import { categorizationCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const TONE_BAR: Record<'emerald' | 'amber' | 'zinc', string> = {
  emerald: 'bg-emerald-500/70',
  amber: 'bg-amber-400/70',
  zinc: 'bg-zinc-300',
}

function Scale({
  title,
  detail,
  bands,
}: {
  title: string
  detail: string
  bands: readonly { from: string; label: string; tone: 'emerald' | 'amber' | 'zinc' }[]
}) {
  return (
    <div className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50/60 p-3">
      <p className="text-sm font-medium text-zinc-900">{title}</p>
      <p className="mt-0.5 text-xs text-zinc-600">{detail}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {bands.map((b) => (
          <li key={b.from} className="flex items-start gap-3">
            <span className="app-screen w-10 shrink-0 pt-0.5 text-right font-mono text-xs tabular-nums text-zinc-500">
              {b.from}
            </span>
            <span className={clsx('mt-1.5 h-2 w-6 shrink-0 rounded-full', TONE_BAR[b.tone])} aria-hidden="true" />
            <span className="flex-1 text-xs text-zinc-700">{b.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CategorizationBandsFigure({ locale, children }: FigureProps) {
  const c = categorizationCopy[locale]
  return (
    <Figure
      alt={c.alt}
      art={
        <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
          <div className="flex flex-col gap-3 @xl:flex-row">
            <Scale title={c.invoiceTitle} detail={c.invoiceDetail} bands={c.invoiceBands} />
            <Scale title={c.cashTitle} detail={c.cashDetail} bands={c.cashBands} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-dashed border-zinc-300 px-3 py-2">
            <span className="app-screen contents">
              <Pill tone="blue" size="md">
                0.98
              </Pill>
            </span>
            <span className="flex-1 text-xs text-zinc-600">{c.direct}</span>
          </div>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
