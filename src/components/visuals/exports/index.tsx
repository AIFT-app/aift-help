// The two office exports beside the Ledger: RLB's "Fix before export" panel and
// the HessynKettős page after an export.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-10-26), class for class:
//   src/app/(app)/workspaces/[workspaceId]/exports/rlb/_components/RlbFixBeforeExportPanel.tsx
//     (the drawer, its Section / ReasonChip / RecordHeader and the four gap cards)
//   src/components/category/CategoryCombobox.tsx (closed, see ClosedCategoryPicker)
//   src/app/(app)/workspaces/[workspaceId]/exports/hessyn-kettos/page.tsx
//   src/app/(app)/workspaces/[workspaceId]/exports/hessyn-kettos/_components/HessynGlAccountsCard.tsx
//   src/app/(app)/workspaces/[workspaceId]/exports/hessyn-kettos/_components/HessynExportControls.tsx
//   src/components/date-range/date-range-filter.tsx (the closed trigger)
//
// WHY THESE TWO SCREENS
//
//   The RLB page itself is the Ledger's filters and tabs, which the Ledger
//   figure already shows. What is RLB's own is the readiness check, and the
//   panel shows in one picture the four things RLB cannot import and the fix
//   for each. HessynKettős is one small page; shown after an export, it also
//   carries the line that says what was left out of the file.
//
// THE DRAWER is the app's full-screen overlay: the dimmed backdrop and the
// 576px panel on the right, at the height its content takes (906px in all
// three languages), so the footer sits under the last card as it does on a
// window of that height. It was opened from Review & fix, so the first section
// carries the app's highlight ring.
//
// A server component: every control is in its resting state and the screens
// are `inert`.
//
// ⚠️ MARKERS: RLB 1 inside the progress label, 2 to 5 right of each section's
// count badge, 6 above Export now. HessynKettős 1 inside the GL accounts
// heading, 2 right of Export CSV, 3 at the end of the result line.

import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Heading, Subheading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Text } from '@/components/catalyst/text'
import { AppScreen, Figure, Pin } from '../kit'
import { ClosedCategoryPicker } from './ClosedCategoryPicker'
import { FIX_RECORDS, HESSYN_ACCOUNTS, fixCopy, hessynCopy } from './copy'

// ── RLB: Fix before export ──────────────────────────────────────────────────

const DRAWER_HEIGHT = 906

function Section({
  title,
  highlight,
  pin,
  children,
}: {
  title: string
  highlight?: boolean
  pin: number
  children: React.ReactNode
}) {
  return (
    <section className={highlight ? 'scroll-mt-2 rounded-lg ring-2 ring-blue-400/40' : undefined}>
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{title}</h3>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
          1
        </span>
        <Pin n={pin} at="right" cancel="-ml-2" />
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  )
}

function ReasonChip({ label }: { label: string }) {
  return (
    <span className="inline-flex whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
      {label}
    </span>
  )
}

function RecordHeader({
  id,
  invoiceNumber,
  meta,
  amount,
  chip,
}: {
  id: string
  invoiceNumber?: string
  meta: string
  amount: string
  chip: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="min-w-0">
        <div className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            {invoiceNumber || id}
          </span>
          {invoiceNumber && (
            <span className="shrink-0 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">{id}</span>
          )}
        </div>
        <div className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">{meta}</div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="whitespace-nowrap text-xs font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">{amount}</span>
        {chip}
      </div>
    </div>
  )
}

function FixPanelScreen({ locale }: { locale: Locale }) {
  const c = fixCopy[locale]
  const r = FIX_RECORDS
  return (
    <div className="relative" style={{ height: DRAWER_HEIGHT }}>
      <div className="absolute inset-0 z-50">
        <button type="button" aria-label={c.footer[1]} className="absolute inset-0 cursor-default bg-zinc-900/40" />
        <div className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-white shadow-2xl dark:bg-zinc-900">
          {/* header */}
          <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
            <div className="flex items-start gap-3">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{c.subtitle}</p>
              </div>
              <button
                type="button"
                aria-label={c.footer[1]}
                className="ml-auto rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {c.progress[0]}
                  <Pin n={1} at="right" cancel="" />
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">{c.progress[1]}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div className="h-full rounded-full bg-blue-500" style={{ width: '33%' }} />
              </div>
            </div>
          </div>

          {/* body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-6">
              <Section title={c.sections[0]} highlight pin={2}>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <RecordHeader
                    id={r.inv.id}
                    invoiceNumber={r.inv.number}
                    meta={r.inv.meta}
                    amount={c.inv.amount}
                    chip={<ReasonChip label={c.inv.chip} />}
                  />
                  <ul className="mt-2 space-y-3 border-t border-zinc-100 pt-2 dark:border-zinc-800">
                    <li>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-zinc-700 dark:text-zinc-300">
                          {c.inv.line[0]} · {c.inv.line[1]}
                        </span>
                        <span className="ml-auto text-[11px] tabular-nums text-zinc-500 dark:text-zinc-400">
                          {c.inv.lineAmount}
                        </span>
                      </div>
                      <div className="mt-1.5">
                        <ClosedCategoryPicker value={c.inv.category} placeholder={c.inv.placeholder} ariaLabel={c.categoryAria} />
                      </div>
                      <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                        {c.inv.linkLead}
                        <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                          {c.inv.link}
                        </a>
                      </p>
                    </li>
                  </ul>
                </div>
              </Section>

              <Section title={c.sections[1]} pin={3}>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <RecordHeader id={r.bank.id} meta={r.bank.meta} amount={c.bank.amount} chip={<ReasonChip label={c.bank.chip} />} />
                  <div className="mt-2">
                    <ClosedCategoryPicker value={null} placeholder={c.bank.placeholder} ariaLabel={c.categoryAria} />
                  </div>
                </div>
              </Section>

              <Section title={c.sections[2]} pin={4}>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <RecordHeader
                    id={r.fx.id}
                    invoiceNumber={r.fx.number}
                    meta={r.fx.meta}
                    amount={c.fx.amount}
                    chip={<ReasonChip label={c.fx.chip} />}
                  />
                  <p className="mt-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">{c.fx.hint}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">{c.fx.label}</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      readOnly
                      value=""
                      placeholder="402,50"
                      aria-label={c.fx.label}
                      className="w-28 rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 font-mono text-xs tabular-nums text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                    <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">{c.fx.unit}</span>
                    <button
                      type="button"
                      className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                    >
                      {c.fx.save}
                    </button>
                  </div>
                </div>
              </Section>

              <Section title={c.sections[3]} pin={5}>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <RecordHeader
                    id={r.vat.id}
                    invoiceNumber={r.vat.number}
                    meta={r.vat.meta}
                    amount={c.vat.amount}
                    chip={<ReasonChip label={c.vat.chip} />}
                  />
                  <ul className="mt-2 space-y-1 border-t border-zinc-100 pt-2 dark:border-zinc-800">
                    <li className="flex items-baseline gap-2 text-[11px]">
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {c.vat.line[0]} · {c.vat.line[1]}
                      </span>
                      <span className="ml-auto tabular-nums text-zinc-500 dark:text-zinc-400">{c.vat.compare}</span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="mt-2 rounded-md border border-blue-600 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/40"
                  >
                    {c.vat.button}
                  </button>
                </div>
              </Section>
            </div>
          </div>

          {/* footer */}
          <div className="flex items-center gap-3 border-t border-zinc-200 px-5 py-3 dark:border-zinc-800">
            <span className="flex-1 text-xs text-zinc-500 dark:text-zinc-400">{c.footer[0]}</span>
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {c.footer[1]}
            </button>
            <button
              type="button"
              disabled
              className="rounded-md bg-blue-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {c.footer[2]}
            </button>
            <Pin n={6} at="above" cancel="-ml-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

type FigureProps = { locale: Locale; children?: React.ReactNode }

export function RlbFixPanelFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={fixCopy[locale].alt}
      wide
      zoomable={locale}
      art={
        <AppScreen>
          <FixPanelScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── HessynKettős ────────────────────────────────────────────────────────────

// date-range-filter.tsx CalendarGlyph, verbatim.
function CalendarGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4 text-blue-600 dark:text-blue-400">
      <path
        fillRule="evenodd"
        d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2ZM4.75 5.5c-.69 0-1.25.56-1.25 1.25V8h13V6.75c0-.69-.56-1.25-1.25-1.25H4.75Zm11.75 4h-13v5.75c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9.5Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const CHEVRON_DOWN = '▾'

function HessynScreen({ locale }: { locale: Locale }) {
  const c = hessynCopy[locale]
  const fields: [string, string][] = [
    [c.glCustomer, HESSYN_ACCOUNTS[0]],
    [c.glSalesVat, HESSYN_ACCOUNTS[1]],
  ]
  return (
    <div className="bg-white p-6">
      <div className="mx-auto max-w-screen-lg px-4 py-8">
        <Heading>{c.title}</Heading>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{c.subtitle}</p>

        <Divider className="my-6" />

        <div className="grid gap-6">
          <section className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-700">
            <Subheading className="!text-base">
              {c.glTitle}
              <Pin n={1} at="right" cancel="" />
            </Subheading>
            <Text className="mt-1">{c.glHint}</Text>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {fields.map(([label, value]) => (
                <label key={label} className="block">
                  <span className="mb-1 block text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
                  <Input value={value} readOnly />
                </label>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button outline>{c.glSave}</Button>
            </div>
          </section>

          <section className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-700">
            <Subheading className="!text-base">{c.exportTitle}</Subheading>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <div className="relative inline-block">
                <button
                  type="button"
                  aria-expanded={false}
                  aria-haspopup="dialog"
                  className="inline-flex h-8 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-medium text-zinc-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900 dark:bg-blue-950/40 dark:text-zinc-100 dark:hover:bg-blue-900/40"
                >
                  <CalendarGlyph />
                  <span className="tabular-nums">{c.date}</span>
                  <span aria-hidden="true" className="text-xs text-zinc-500">
                    {CHEVRON_DOWN}
                  </span>
                </button>
              </div>
              <Button color="blue">{c.exportButton}</Button>
              <Pin n={2} at="right" cancel="-ml-3" />
            </div>

            <div className="mt-3">
              <Text>
                {c.done}
                <Pin n={3} at="right" cancel="" />
              </Text>
              <ul className="mt-1 list-disc pl-5 text-sm text-amber-700 dark:text-amber-300">
                {c.advisories.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export function HessynExportFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={hessynCopy[locale].alt}
      wide
      zoomable={locale}
      art={
        <AppScreen>
          <HessynScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
