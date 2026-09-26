// Where a forwarded attachment lands, for the email-forwarding article.
//
// Not an app screen: the four destinations never appear together in the
// product, which is exactly why the old article sent readers to the wrong one.
// The destination names are the app's own (./copy.ts, keyed by message key);
// the rest is this article's text, checked against triage-document on
// aift-api origin/main 2026-09-23.

import type { Locale } from '@/lib/i18n'
import { Figure } from '../kit'
import { intakeCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const TONE = {
  // Lands where you expect it to.
  ok: 'bg-emerald-50 text-emerald-800 ring-emerald-600/20',
  // Waits for a person; the two states readers miss.
  wait: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  // Office-side only.
  office: 'bg-zinc-100 text-zinc-700 ring-zinc-600/20',
} as const

export function TriageDestinationsFigure({ locale, children }: FigureProps) {
  const c = intakeCopy[locale]

  return (
    <Figure
      alt={c.alt}
      art={
        <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
          <p className="text-sm font-medium text-zinc-900">{c.heading}</p>

          <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200">
            <div className="grid grid-cols-[1fr_auto] gap-x-3 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
              <span className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">{c.colKind}</span>
              <span className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">{c.colDest}</span>
            </div>
            <ul className="divide-y divide-zinc-100">
              {c.rows.map((row) => (
                <li key={row.kind} className="grid grid-cols-[1fr_auto] items-start gap-x-3 px-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block text-xs font-medium text-zinc-800">{row.kind}</span>
                    <span className="mt-0.5 block text-xs/[1.45] text-zinc-500">{row.note}</span>
                  </span>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${TONE[row.tone]}`}
                  >
                    {row.dest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-3 rounded-lg border border-dashed border-zinc-300 px-3 py-2 text-xs text-zinc-600">
            {c.footnote}
          </p>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
