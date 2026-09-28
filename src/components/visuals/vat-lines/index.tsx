// The Lines & VAT grid, for the vat-codes-on-invoices article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28), class for class:
//   src/app/(app)/workspaces/[workspaceId]/invoices/[invoiceId]/(tabs)/
//     _components/MergedLinesVatGrid.tsx — the toolbar, the table head, the row
//     cells, CategoryCell's resting state, ElementSelects and SELECT_CLASS.
//
// WHY THIS SCREEN
//
//   The article's "Reading The VAT Code Cell" section lists four things the
//   cell can say, and the difference between them is entirely visual: a plain
//   chip, an amber chip ending in "Default", "- missing -" beside an "+ Add"
//   link, and a chip with a warning triangle. It also has to explain what the
//   article calls the single most confusing behaviour on the screen — the three
//   element dropdowns are only shown while the line is UNRESOLVED, and vanish
//   into Advanced once a code resolves. One picture with all four lines side by
//   side says both at once.
//
// A server component: the selects carry defaultValue rather than value/onChange
// and the buttons no handlers; the screen is `inert` regardless. The category
// picker's resting state is a label plus badges, so CategoryCombobox (which
// only mounts while editing) is deliberately not reproduced. Labels come from
// ./copy.ts, keyed by aift-web message key; the invoice is fictional.

import { ChevronRightIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { AppScreen, Figure, Pin } from '../kit'
import { formatAmount } from '../format'
import { CURRENCY, INVOICE_ID, LINES, vatLinesCopy } from './copy'

const SCREEN_MIN_WIDTH = 760

/** MergedLinesVatGrid.tsx SELECT_CLASS, verbatim. */
const SELECT_CLASS =
  'block w-full rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'

const TH = 'pb-2 pr-3 text-xs font-medium uppercase tracking-wide text-zinc-500'

/** CategoryCell's `label`, for a category a person or the AI has confirmed. */
function CategoryLabel({ code, name }: { code: string; name: string }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1">
      <span className="text-xs text-zinc-400">{code}</span>
      <span className="text-xs text-zinc-900 dark:text-zinc-100">{name}</span>
    </span>
  )
}
const TH_RIGHT = `${TH} text-right`

export function VatLinesGridFigure({
  locale,
  children,
}: {
  locale: Locale
  children?: React.ReactNode
}) {
  const c = vatLinesCopy[locale]
  const ui = c.ui

  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          <div className="bg-white p-4">
            <section>
              {/* Bulk affordances + summary. */}
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-600 dark:text-zinc-200"
                >
                  {c.rendered.addMissing}
                </button>
                <Pin n={1} at="left" cancel="-ml-3" />
                <button
                  type="button"
                  className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300"
                >
                  {c.rendered.codingOk}
                </button>
                <span className="ml-auto text-xs text-zinc-500">{c.rendered.summary}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className={TH}>{ui['invoices.line_items_table.line_number']}</th>
                      <th className={TH}>{ui['invoices.line_items_table.description']}</th>
                      <th className={TH_RIGHT}>{c.rendered.netHeader}</th>
                      <th className={TH_RIGHT}>{ui['invoices.line_items_table.vat']}</th>
                      <th className={TH_RIGHT}>{ui['invoices.line_items_table.gross']}</th>
                      <th className={TH}>
                        <span>{ui['invoices.line_items_table.category']}</span>
                      </th>
                      <th className={TH}>
                        {ui['invoices.detail.lines.col_vat_elements']}
                        <Pin n={2} at="right" cancel="" />
                      </th>
                      <th className={TH}>
                        {ui['invoices.detail.lines.col_vat_code']}
                        <Pin n={3} at="right" cancel="" />
                      </th>
                      <th className="pb-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {LINES.map((line) => {
                      const resolved = line.state !== 'missing'
                      const subId = `${INVOICE_ID}/${String(line.n).padStart(2, '0')}`
                      return (
                        <tr
                          key={line.n}
                          className="border-b border-zinc-100 align-top dark:border-zinc-800"
                        >
                          <td className="py-3 pr-3">
                            <span className="select-all font-mono text-xs text-zinc-400">
                              {subId}
                            </span>
                          </td>
                          <td className="py-3 pr-3 text-sm text-zinc-900 dark:text-zinc-100">
                            {c.descriptions[line.n]}
                          </td>
                          <td className="py-3 pr-3 text-right text-sm text-zinc-700 dark:text-zinc-300">
                            {formatAmount(line.net, CURRENCY, locale)}
                          </td>
                          <td className="py-3 pr-3 text-right text-sm text-zinc-500">
                            {line.ratePct != null ? `${line.ratePct}%` : '—'}
                          </td>
                          <td className="py-3 pr-3 text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {formatAmount(line.gross, CURRENCY, locale)}
                          </td>

                          {/* CategoryCell, resting state. */}
                          <td className="py-3 pr-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {/* CategoryCell wraps the label in VerifyOnInteract
                                    when the line carries an AI signal: an unstyled
                                    span that only attaches handlers. */}
                                {line.confidence ? (
                                  <span data-field-path={`line_items.l${line.n}.category`} data-breathing="false">
                                    <CategoryLabel code={line.catCode} name={c.categories[line.catCode]} />
                                  </span>
                                ) : (
                                  <CategoryLabel code={line.catCode} name={c.categories[line.catCode]} />
                                )}
                                {line.edited && (
                                  <Badge color="zinc" className="text-xs">
                                    {ui['invoices.line_items_table.edited']}
                                  </Badge>
                                )}
                              </div>
                              {line.confidence === 'medium' && (
                                <Badge color="yellow" className="text-xs">
                                  {ui['invoices.line_items_table.confidence_medium']}
                                </Badge>
                              )}
                            </div>
                          </td>

                          {/* VAT elements — inline while unresolved, gone once resolved. */}
                          <td className="min-w-[9rem] py-3 pr-3">
                            {resolved ? (
                              <span className="text-xs text-zinc-400">
                                {ui['invoices.detail.lines.elements_collapsed']}
                              </span>
                            ) : (
                              <div className="flex flex-col gap-1">
                                <select
                                  aria-label={ui['invoices.vat_panel.product_group']}
                                  defaultValue=""
                                  className={SELECT_CLASS}
                                >
                                  <option value="">
                                    {ui['invoices.vat_panel.product_group']}
                                  </option>
                                </select>
                                <select
                                  aria-label={ui['invoices.vat_panel.rate']}
                                  defaultValue=""
                                  className={SELECT_CLASS}
                                >
                                  <option value="">{ui['invoices.vat_panel.rate']}</option>
                                </select>
                                <select
                                  aria-label={ui['invoices.vat_panel.method']}
                                  defaultValue=""
                                  className={SELECT_CLASS}
                                >
                                  <option value="">{ui['invoices.vat_panel.method']}</option>
                                </select>
                              </div>
                            )}
                          </td>

                          {/* The resolved code chip, or "- missing -". */}
                          <td className="py-3 pr-3">
                            <div className="flex items-center gap-1.5">
                              {resolved ? (
                                line.state === 'default' ? (
                                  <span className="rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300">
                                    {line.code} · {ui['invoices.vat_panel.default_fallback_badge']}
                                  </span>
                                ) : (
                                  <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                    {line.code}
                                  </span>
                                )
                              ) : (
                                <span className="rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs whitespace-nowrap text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300">
                                  {ui['invoices.vat_panel.missing_code']}
                                </span>
                              )}
                              {line.state === 'mismatch' && (
                                <span>
                                  <ExclamationTriangleIcon className="size-4 text-amber-500" />
                                </span>
                              )}
                              {!resolved && (
                                <button
                                  type="button"
                                  className="text-xs font-medium text-blue-600"
                                >
                                  {ui['invoices.vat_panel.add_code']}
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <button
                              type="button"
                              aria-expanded={false}
                              className="flex items-center gap-0.5 text-xs whitespace-nowrap text-zinc-400 dark:hover:text-zinc-300"
                            >
                              <ChevronRightIcon className="size-3.5 transition-transform" />
                              {ui['invoices.vat_panel.advanced']}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
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
