// "Folded in" makes the exported net LARGER, for the vat-in-exports article.
//
// A diagram, not an app screen: these are columns in an export file, which no
// screen shows. Built from HTML rather than SVG so the translated labels wrap
// and it stacks on a phone, the same rule StepList follows.
//
// The arithmetic is aift-api `_shared/vat-export.ts`, computeNonDeductibility(),
// read at origin/main on 2026-09-28:
//
//   preRoll  →  nonDed     = round2(vat * pct / 100)
//               deductible = round2(vat - nonDed)     // residual, so VAT is conserved
//               netExported = round2(net + nonDed)
//
// with its two stated invariants, which are what the picture is really about:
//   vatDeductible + vatNonDeductible === vat      (the VAT is conserved)
//   netExported  + vatDeductible    === net + vat (the gross is conserved)
//
// So 100.00 + 27.00 at 50% gives 113.50 + 13.50: the gross is still 127.00 and
// nothing is invented — an amount has moved from one column into another.
//
// ⚠️ The mode matters and the figure says which one it shows. On the default
// (`native_100_only`) a PARTLY non-deductible line is folded in and a fully
// non-deductible one is not; `pre_roll_always` folds both; `native_full` folds
// neither. Picking the partial case on the default keeps the figure true for
// the setting almost every workspace is on.

import type { Locale } from '@/lib/i18n'
import { Figure } from '../kit'
import { foldedVatCopy } from './copy'

function Amount({ label, value, tone = 'plain' }: { label: string; value: string; tone?: 'plain' | 'moved' }) {
  return (
    <div
      className={
        tone === 'moved'
          ? 'rounded-lg border border-amber-300 bg-amber-50 px-3 py-2'
          : 'rounded-lg border border-zinc-200 bg-white px-3 py-2'
      }
    >
      <div className={tone === 'moved' ? 'text-xs font-medium text-amber-800' : 'text-xs font-medium text-zinc-500'}>{label}</div>
      <div
        className={
          tone === 'moved'
            ? 'font-mono text-base font-semibold tabular-nums text-amber-900'
            : 'font-mono text-base font-semibold tabular-nums text-zinc-900'
        }
      >
        {value}
      </div>
    </div>
  )
}

export function FoldedVatFigure({ locale, children }: { locale: Locale; children?: React.ReactNode }) {
  const c = foldedVatCopy[locale]
  return (
    <Figure
      alt={c.alt}
      art={
        <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
          <p className="text-sm font-medium text-zinc-700">{c.setting}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">{c.onTheInvoice}</p>
              <div className="space-y-2">
                <Amount label={c.net} value="100.00" />
                <Amount label={c.vat} value="27.00" />
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto w-fit rounded-full border border-dashed border-amber-400 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                {c.moves}
              </div>
              <div aria-hidden className="mt-1 text-lg text-zinc-400 sm:mt-2">
                <span className="hidden sm:inline">→</span>
                <span className="sm:hidden">↓</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">{c.inTheExport}</p>
              <div className="space-y-2">
                <Amount label={c.netExported} value="113.50" tone="moved" />
                <Amount label={c.vatDeductible} value="13.50" />
              </div>
            </div>
          </div>

          <p className="mt-4 border-t border-zinc-200 pt-3 text-xs text-zinc-500">{c.conserved}</p>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
