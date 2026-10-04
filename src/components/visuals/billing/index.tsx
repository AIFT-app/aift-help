// App screens for the billing article.
//
// Rebuilt 1:1 from aift-web (origin/staging 2026-10-04, after
// billing-checkout-hu-tax-id, aift-web#1619), class for class, with the real
// Catalyst components from the help mirror:
//   page shell   src/app/(app)/organization-settings/layout.tsx (max-w-5xl
//                px-4 py-12) + _components/OrgPageHeader.tsx
//   plan picker  _components/BillingSection.tsx, the not-yet-subscribed branch
//                (picker heading to the legal links; the cancelled-checkout
//                notice and the error line are not shown)
//   dialog       _components/CheckoutBillingDialog.tsx, the Dialog panel
//                (catalyst/dialog.tsx, size md) without the backdrop
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts. Verified against the real components rendered with the same data
// (aift-ops/scripts/help-screen-css-diff.mjs).

import { Fragment } from 'react'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { DialogActions, DialogBody } from '@/components/catalyst/dialog'
import { ErrorMessage, Field, FieldGroup, Fieldset, Label } from '@/components/catalyst/fieldset'
import { Heading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Text } from '@/components/catalyst/text'
import { fill } from '../approvals/copy'
import { formatAmount, formatCount, formatPrice } from '../format'
import { AppScreen, Figure, Pin } from '../kit'
import { billingCopy, type Plan } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

/**
 * next-intl's t.rich for the few tags these messages use: <strong>, and the
 * two links of legal_links. Placeholders are filled first.
 */
function rich(template: string, tags: Record<string, (chunk: string, key: number) => React.ReactNode>): React.ReactNode {
  const parts: React.ReactNode[] = []
  const re = /<(\w+)>(.*?)<\/\1>/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(template))) {
    if (m.index > last) parts.push(template.slice(last, m.index))
    const render = tags[m[1]]
    parts.push(render ? render(m[2], i++) : m[2])
    last = m.index + m[0].length
  }
  if (last < template.length) parts.push(template.slice(last))
  return parts.map((p, k) => <Fragment key={k}>{p}</Fragment>)
}

const strong = (chunk: string, key: number) => (
  <strong key={key} className="font-semibold text-gray-900 dark:text-white">
    {chunk}
  </strong>
)

/** aift-web lib/billing-projection: base + every entry above the allowance. */
function projected(plan: Plan, entries: number, overage: number): number {
  return plan.month + Math.max(0, entries - plan.included) * overage
}

/** aift-web intervalSaving, annual against twelve months. */
function savingPercent(plan: Plan): number {
  return Math.round(((plan.month * 12 - plan.year) / (plan.month * 12)) * 100)
}

// ── The plan picker (BillingSection, not yet subscribed) ────────────────────

export function PlanPickerFigure({ locale, children }: FigureProps) {
  const c = billingCopy[locale]
  const ui = c.ui
  const b = (k: string) => ui[`org.settings.billing.${k}` as keyof typeof ui]
  const money = (n: number) => formatAmount(n, c.currency, locale)
  const price = (n: number) => formatPrice(n, c.currency, locale)
  const entries = c.busiestMonth
  // The cheapest projected total at the office's own volume (cheapestTierAt).
  const recommended = c.plans.reduce((best, p) =>
    projected(p, entries, c.overage) < projected(best, entries, c.overage) ? p : best,
  )
  const maxSaving = Math.max(...c.plans.map(savingPercent))
  const largest = Math.max(...c.plans.map((p) => p.included))

  return (
    <Figure
      alt={c.help.altPicker}
      bleed
      wide
      zoomable={locale}
      zoomWidth={PICKER_MIN_WIDTH}
      art={
        <AppScreen minWidth={PICKER_MIN_WIDTH}>
          <div className="mx-auto max-w-5xl px-4 py-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {ui['org.settings.title']}
              </p>
              <Heading className="mt-1">{b('heading')}</Heading>
              <Text className="mt-2">{b('description')}</Text>
            </div>

            <div className="mt-8">
              <section className="mt-6">
                <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{b('picker_heading')}</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  {`${b('picker_intro')} ${b('trial_offer')}`}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div
                    role="radiogroup"
                    aria-label={b('interval_label')}
                    className="inline-flex rounded-full bg-gray-100 p-1 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-white/10"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked="true"
                      className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-gray-900 shadow-sm transition dark:bg-gray-900 dark:text-white"
                    >
                      {b('interval_month')}
                    </button>
                    <button
                      type="button"
                      role="radio"
                      aria-checked="false"
                      className="rounded-full px-4 py-1.5 text-sm font-semibold text-gray-600 transition dark:text-gray-300"
                    >
                      {b('interval_year')}
                    </button>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400">
                    {fill(b('save_up_to'), { percent: maxSaving })}
                  </span>
                  <Pin n={1} at="right" cancel="-ml-3" />
                </div>

                <p className="mt-3 text-sm text-gray-400 dark:text-gray-500">
                  {rich(fill(b('recommendation_basis'), { documents: formatCount(entries, locale) }), { strong })}
                  <Pin n={2} at="right" cancel="" />
                </p>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                  {c.plans.map((p) => {
                    const isRecommended = p.key === recommended.key
                    return (
                      <article
                        key={p.key}
                        className={
                          isRecommended
                            ? 'relative flex flex-col rounded-2xl p-6 ring-2 ring-indigo-600 shadow-xl shadow-indigo-600/10 dark:bg-white/5'
                            : 'relative flex flex-col rounded-2xl p-6 ring-1 ring-gray-200 dark:ring-white/10'
                        }
                      >
                        {isRecommended && (
                          <span className="absolute top-0 left-6 inline-flex -translate-y-1/2 items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                            {b('recommended')}
                          </span>
                        )}

                        <h3 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                          {b(`plan_name_${p.key}`)}
                          {isRecommended ? <Pin n={3} at="right" cancel="" /> : null}
                        </h3>
                        <p className="mt-0.5 min-h-9 text-xs text-gray-500 dark:text-gray-400">{b(`plan_desc_${p.key}`)}</p>

                        <p className="mt-4 flex items-baseline gap-1.5">
                          <span className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{price(p.month)}</span>
                          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{b('price_suffix')}</span>
                        </p>
                        <p className="mt-0.5 min-h-5 text-xs text-gray-500 dark:text-gray-400"></p>

                        <p className="mt-3.5 text-sm text-gray-600 dark:text-gray-300">
                          {rich(fill(b('included_line_month'), { count: formatCount(p.included, locale) }), { strong })}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          {fill(b('then_per_document'), { price: money(c.overage) })}
                        </p>

                        <dl className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-xs dark:border-white/10">
                          <div className="flex justify-between gap-3">
                            <dt className="text-gray-500 dark:text-gray-400">{b('per_document')}</dt>
                            <dd className="whitespace-nowrap tabular-nums text-gray-600 dark:text-gray-300">{money(p.month / p.included)}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500 dark:text-gray-400">
                              {fill(b('your_cost_at'), { documents: formatCount(entries, locale) })}
                              {isRecommended ? <Pin n={4} at="right" cancel="" /> : null}
                            </dt>
                            <dd className="mt-0.5 text-sm font-semibold whitespace-nowrap tabular-nums text-gray-900 dark:text-white">
                              {fill(b('amount_per_month'), { amount: money(projected(p, entries, c.overage)) })}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-auto pt-5">
                          {isRecommended ? <Pin n={5} at="above" cancel="" /> : null}
                          <Button color="indigo" className="w-full">
                            {b('subscribe')}
                          </Button>
                        </div>
                      </article>
                    )
                  })}
                </div>

                <p className="mt-5 text-xs text-gray-400 dark:text-gray-500">{`${b('trial_offer')} ${b('picker_footnote')}`}</p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {fill(b('need_more'), { count: formatCount(largest, locale) })}{' '}
                  <a className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">{b('talk_to_us')}</a>
                </p>
                <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                  {rich(b('legal_links'), {
                    pricing: (chunk, key) => (
                      <a key={key} className="font-medium underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">
                        {chunk}
                      </a>
                    ),
                    terms: (chunk, key) => (
                      <a key={key} className="font-medium underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">
                        {chunk}
                      </a>
                    ),
                  })}
                </p>
              </section>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

/** Three plan cards side by side need this much room before they squeeze. */
const PICKER_MIN_WIDTH = 820

// ── Billing details (CheckoutBillingDialog), the EU-number refusal ──────────

/** The forint plan a Hungarian office sees; the dialog exists only for them. */
const DIALOG_PLAN = { key: 'assistant_2000', month: 99000 } as const
const EU_VAT_EXAMPLE = 'HU12345678'

export function BillingDetailsDialogFigure({ locale, children }: FigureProps) {
  const c = billingCopy[locale]
  const ui = c.ui
  const b = (k: string) => ui[`org.settings.billing.${k}` as keyof typeof ui]
  const priceLabel = `${formatPrice(DIALOG_PLAN.month, 'HUF', locale)} ${b('price_suffix')}`
  return (
    <Figure
      alt={c.help.altDialog}
      wide
      zoomable={locale}
      art={
        <AppScreen>
          <div className="flex items-center justify-center bg-white p-4">
            {/* The Dialog panel without the backdrop. Its DialogTitle is
                Headless UI's, which throws outside a Dialog, so the title is
                the h2 Headless renders, class for class. */}
            <div className="flex max-h-[calc(100vh-2rem)] w-full flex-col rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10 sm:max-w-md">
              <h2 className="shrink-0 text-base/6 font-semibold text-zinc-950 dark:text-white">{b('identity_title')}</h2>
              <Text className="mt-2">
                {rich(fill(b('identity_intro'), { plan: b(`plan_name_${DIALOG_PLAN.key}`), price: priceLabel }), {
                  strong: (chunk, key) => (
                    <strong key={key} className="font-semibold text-zinc-950 dark:text-white">
                      {chunk}
                    </strong>
                  ),
                })}
              </Text>
              <form>
                <DialogBody>
                  <Fieldset>
                    <FieldGroup>
                      <Field>
                        <Label>
                          {b('identity_business_name')}
                          <Pin n={1} at="right" cancel="" />
                        </Label>
                        <Input name="business_name" autoComplete="organization" defaultValue={c.office} />
                      </Field>
                      <Field>
                        <Label>
                          {b('identity_tax_number')}
                          <Pin n={2} at="right" cancel="" />
                        </Label>
                        <Input
                          name="tax_number"
                          inputMode="numeric"
                          autoComplete="off"
                          placeholder="12345678-1-23"
                          className="font-mono"
                          defaultValue={EU_VAT_EXAMPLE}
                          invalid
                        />
                        <ErrorMessage>{b('tax_number_error_eu_vat')}</ErrorMessage>
                      </Field>
                    </FieldGroup>
                  </Fieldset>
                </DialogBody>
                <DialogActions>
                  <Button type="button" outline>
                    {b('identity_cancel')}
                  </Button>
                  <Pin n={3} at="above" cancel="-mr-3" />
                  <Button type="submit" color="indigo" disabled>
                    {b('identity_continue')}
                  </Button>
                </DialogActions>
              </form>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
