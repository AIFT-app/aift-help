// The Lines & VAT grid, for the vat-codes-on-invoices article.
//
// Rebuilt 1:1 from aift-web (branch feat/page-layout-sweep, 2026-09-29, PRD
// page-layout-sweep, up to commit 868033b0), class for class:
//   src/app/(app)/workspaces/[workspaceId]/invoices/[invoiceId]/(tabs)/
//     _components/MergedLinesVatGrid.tsx: the toolbar, the table head, the row
//     cells, CategoryCell's resting state, ElementSelects (inline, flex-wrap:
//     side by side with room, 2 + 1 or stacked without) and SELECT_CLASS with
//     its inline twins.
//
// WHY THIS SCREEN
//
//   The article's "Reading The VAT Code Cell" section lists four things the
//   cell can say, and the difference between them is entirely visual: a plain
//   chip, an amber chip ending in "Default", "- missing -" beside an "+ Add"
//   link, and a chip with a warning triangle. It also has to explain what the
//   article calls the single most confusing behaviour on the screen: the three
//   element dropdowns are only shown while the line is UNRESOLVED, and move
//   into the row's Advanced part (opened by the arrow at the end of the row)
//   once a code resolves. One picture with all four lines together says
//   both at once.
//
// WHY THE TABLE IS SHOWN SCROLLED TO ITS RIGHT END
//
//   With this figure's fixture the grid is 812px wide at its narrowest (en;
//   hu 858, de 829; measured 2026-09-29 on commit 868033b0, element selects
//   stacked). The widest cell floors are the nowrap "DOM-21-GOODS · Default"
//   chip and the 10.75rem elements cell. In the app the lines tab lifts the
//   page's width cap and the table fits from about a 1280px window; in an
//   article column (816px at most, a 784px scroll box inside the page's own
//   16px padding) it cannot, and in the app at that width the scroll box
//   scrolls sideways. Zooming a desktop screen to fit is ruled out (see the
//   aift-help CLAUDE.md), so the figure shows the app at the figure's width
//   with the table scrolled to its right end: the columns the article is
//   about (category, elements, VAT code, the Advanced arrow) at 100%, the
//   line number and the start of each description off to the left, exactly
//   as a user who scrolled right sees them.
//
//   That is the ONLY deviation from the app's markup: `dir="rtl"` on the
//   scroll box (which puts its initial scroll position at the right end) and
//   `dir="ltr"` on the table (so nothing inside changes). Neither is a CSS
//   property the diff compares, and the computed style of every element
//   matches the app's. Re-measure when the component or the fixture changes:
//   if the narrowest table fits the 784px box in every locale, drop the two
//   `dir` attributes and the caption's sentence about scrolling.
//
//   On phones the Enlarge view is ENLARGE_WIDTH wide, which fits the whole
//   table in every locale (hu needs 890px), with the selects on two rows as
//   in the app at common window widths, so there the reader sees every column.
//
// MARKERS
//
//   The scroll box is `overflow-x: auto`, which makes its vertical overflow
//   clip too: a marker placed above a header cell is cut off by the box. The
//   2026-09-28 figure put markers 2 and 3 there and they never showed
//   (help-marker-audit only looks for overflow hidden/clip, so it passed).
//   Markers 2 and 3 now hang BELOW the start of their header labels, inside
//   the box, over the header's bottom border.
//
// A server component: the selects carry defaultValue rather than value/onChange
// and the buttons no handlers; the screen is `inert` regardless. The category
// picker's resting state is a label plus badges and the pencil, so
// CategoryCombobox (which only mounts while editing) is deliberately not
// reproduced. Labels come from ./copy.ts, keyed by aift-web message key; the
// invoice is fictional.

import { ChevronRightIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { AppScreen, Figure, Pin } from '../kit'
import { formatAmount } from '../format'
import { CURRENCY, INVOICE_ID, LINES, vatLinesCopy } from './copy'

/** Below this figure width (phones) the screen is laid out here and zoomed. */
const SCREEN_MIN_WIDTH = 760
/** The Enlarge view's width: the whole table fits in every locale (hu needs 890). */
const ENLARGE_WIDTH = 1000

/** The app's empty-value placeholder, an em dash, built from its code point. */
const EMPTY = String.fromCharCode(0x2014)

/** MergedLinesVatGrid.tsx SELECT_CLASS, INLINE_SELECT, INLINE_WIDE and INLINE_NARROW, verbatim. */
const SELECT_CLASS =
  'block w-full rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-900 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'
const INLINE_SELECT = SELECT_CLASS.replace('block w-full ', 'block w-0 ')
const INLINE_WIDE = 'min-w-[10rem] flex-[1.4_1_0%]'
const INLINE_NARROW = 'min-w-[7.25rem] flex-[1_1_0%]'

const TH = 'pb-2 pr-3 text-xs font-medium uppercase tracking-wide text-zinc-500'
const TH_RIGHT = 'pb-2 pr-3 text-right text-xs font-medium uppercase tracking-wide text-zinc-500'

/** CategoryCell's `label`, for a category a person or the AI has confirmed. */
function CategoryLabel({ name }: { name: string }) {
  return <span className="line-clamp-2 min-w-0 wrap-anywhere text-xs text-zinc-900 dark:text-zinc-100">{name}</span>
}

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
      zoomWidth={ENLARGE_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          {/* 32px above, 16px at the sides: the app's content panel pads 40px
              (SidebarLayout `lg:p-10`), and a 16px top crop left the `above`
              marker on the toolbar sliced by the screen's overflow-hidden. */}
          <div className="bg-white px-4 pt-8 pb-4">
            <section>
              {/* Bulk affordances + summary. */}
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  {c.rendered.addMissing}
                </button>
                {/* `left` here sat inside the button, over its "(n)" count. */}
                <Pin n={1} at="above" cancel="-ml-3" />
                <button
                  type="button"
                  className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-100 disabled:opacity-50 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30"
                >
                  {c.rendered.codingOk}
                </button>
                <span className="ml-auto text-xs text-zinc-500">{c.rendered.summary}</span>
              </div>

              {/* dir: the figure's scrolled-to-the-end state, see the header. */}
              <div className="relative overflow-x-auto" dir="rtl">
                <table className="w-full text-left" dir="ltr">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className={`w-12 ${TH}`}>{ui['invoices.line_items_table.line_number']}</th>
                      <th className={TH}>{ui['invoices.line_items_table.description']}</th>
                      <th className={TH_RIGHT}>
                        {c.rendered.netHeader}
                      </th>
                      <th className={TH_RIGHT}>
                        {ui['invoices.line_items_table.gross']}
                      </th>
                      <th className={TH}>
                        {/* ConfidenceLabel: an unstyled span while nothing breathes. */}
                        <span>{ui['invoices.line_items_table.category']}</span>
                      </th>
                      {/* Below, not above: above is outside the scroll box,
                          which clips it (see the header). */}
                      <th className={`w-[26rem] ${TH}`}>
                        <Pin n={2} at="below" cancel="" />
                        {ui['invoices.detail.lines.col_vat_elements']}
                      </th>
                      <th className={TH}>
                        <Pin n={3} at="below" cancel="" />
                        {ui['invoices.detail.lines.col_vat_code']}
                      </th>
                      <th className="w-10 pb-2">
                        <span className="sr-only">{ui['invoices.vat_panel.advanced']}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {LINES.map((line) => {
                      const resolved = line.state !== 'missing'
                      const nn = String(line.n).padStart(2, '0')
                      const name = c.categories[line.catCode]
                      return (
                        <tr key={line.n} className="border-b border-zinc-100 dark:border-zinc-800 align-top">
                          {/* The line's number; the full friendly ID is on hover. */}
                          <td className="py-3 pr-3">
                            <span
                              title={`${INVOICE_ID}/${nn}`}
                              className="font-mono text-xs tabular-nums text-zinc-400"
                            >
                              {nn}
                            </span>
                          </td>
                          <td className="min-w-[8rem] py-3 pr-3 text-sm text-zinc-900 wrap-anywhere dark:text-zinc-100">
                            {c.descriptions[line.n]}
                          </td>
                          <td className="whitespace-nowrap py-3 pr-3 text-right text-sm tabular-nums text-zinc-700 dark:text-zinc-300">
                            {formatAmount(line.net, CURRENCY, locale)}
                            {/* The VAT rate sits under the net amount. */}
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {ui['invoices.line_items_table.vat']}{' '}
                              {line.ratePct != null ? `${line.ratePct}%` : EMPTY}
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-3 pr-3 text-right text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                            {formatAmount(line.gross, CURRENCY, locale)}
                          </td>

                          {/* CategoryCell, resting state: the name, then a row
                              with the Code, the confidence, Edited and the pencil. */}
                          <td className="min-w-[8rem] py-3 pr-3">
                            <div className="flex flex-col gap-1">
                              {/* CategoryCell wraps the label in VerifyOnInteract
                                  when the line carries an AI signal: an unstyled
                                  span that only attaches handlers. */}
                              {line.confidence ? (
                                <span data-field-path={`line_items.l${line.n}.category`} data-breathing="false">
                                  <CategoryLabel name={name} />
                                </span>
                              ) : (
                                <CategoryLabel name={name} />
                              )}
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
                                  {line.catCode}
                                </span>
                                {line.confidence === 'medium' && (
                                  <Badge color="yellow" className="text-xs">
                                    {ui['invoices.line_items_table.confidence_medium']}
                                  </Badge>
                                )}
                                {line.edited && (
                                  <Badge color="zinc" className="text-xs">
                                    {ui['invoices.line_items_table.edited']}
                                  </Badge>
                                )}
                                <button
                                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                  title={ui['invoices.line_items_table.override_category']}
                                  aria-label={ui['invoices.line_items_table.override_category']}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* VAT elements: inline while unresolved (flex-wrap, so
                              they wrap in a narrow column); gone into Advanced
                              once resolved. */}
                          <td className="min-w-[10.75rem] py-3 pr-3">
                            {resolved ? (
                              <span className="text-xs text-zinc-400">
                                {ui['invoices.detail.lines.elements_collapsed']}
                              </span>
                            ) : (
                              <div className="flex flex-wrap gap-1">
                                <select
                                  aria-label={ui['invoices.vat_panel.product_group']}
                                  defaultValue=""
                                  className={`${INLINE_SELECT} ${INLINE_WIDE}`}
                                >
                                  <option value="">{ui['invoices.vat_panel.product_group']}</option>
                                </select>
                                <select
                                  aria-label={ui['invoices.vat_panel.rate']}
                                  defaultValue=""
                                  className={`${INLINE_SELECT} ${INLINE_NARROW}`}
                                >
                                  <option value="">{ui['invoices.vat_panel.rate']}</option>
                                </select>
                                <select
                                  aria-label={ui['invoices.vat_panel.method']}
                                  defaultValue=""
                                  className={`${INLINE_SELECT} ${INLINE_NARROW}`}
                                >
                                  <option value="">{ui['invoices.vat_panel.method']}</option>
                                </select>
                              </div>
                            )}
                          </td>

                          {/* The resolved code chip, or "- missing -". */}
                          <td className="py-3 pr-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {resolved ? (
                                line.state === 'default' ? (
                                  <span
                                    title={ui['invoices.vat_panel.default_fallback_tooltip']}
                                    className="whitespace-nowrap rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300"
                                  >
                                    {line.code} · {ui['invoices.vat_panel.default_fallback_badge']}
                                  </span>
                                ) : (
                                  <span className="whitespace-nowrap rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                    {line.code}
                                  </span>
                                )
                              ) : (
                                <span className="whitespace-nowrap rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-xs text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300">
                                  {ui['invoices.vat_panel.missing_code']}
                                </span>
                              )}
                              {line.state === 'mismatch' && (
                                <span title={ui['invoices.vat_panel.mismatch_tooltip']}>
                                  <ExclamationTriangleIcon className="size-4 text-amber-500" />
                                </span>
                              )}
                              {!resolved && (
                                <button
                                  type="button"
                                  className="whitespace-nowrap text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                  {ui['invoices.vat_panel.add_code']}
                                </button>
                              )}
                            </div>
                          </td>

                          {/* The Advanced arrow: icon only, the word is its tooltip. */}
                          <td className="py-3 text-right">
                            <button
                              type="button"
                              aria-expanded={false}
                              aria-label={ui['invoices.vat_panel.advanced']}
                              title={ui['invoices.vat_panel.advanced']}
                              className="inline-flex size-6 items-center justify-center rounded text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                            >
                              <ChevronRightIcon className="size-4 transition-transform" />
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
