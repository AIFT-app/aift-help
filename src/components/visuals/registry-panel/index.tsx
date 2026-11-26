// The company-register panel, for the company-register-check article.
//
// Rebuilt 1:1 from aift-web (origin/staging, 2026-11-25), class for class:
//   src/app/(app)/workspaces/[workspaceId]/master-data/partners/[partnerId]/
//     _components/PartnerRegistrySection.tsx — the checked line, the decision
//     cards, the comparison table and its per-row actions.
//   src/lib/registry-review.ts — which differences become which card, and
//     taxNumberDiff(), whose <mark> is what makes the moved tax office code
//     legible at a glance.
//
// WHY THIS SCREEN
//
//   partner-registry-review-ux replaced a flat list of differences with
//   DECISIONS, and the article had to describe the new shape in prose: cards
//   with two buttons each, then a table with an action per row, and the rule
//   that "Leave as is" changes nothing about confirmation. The moved-company
//   card is the one case where the app reasons rather than reports — the seat
//   and the tax number differ together because the tax office code follows the
//   county — and a picture of the two highlighted digits says it faster than
//   the paragraph can.
//
// THE STATE DRAWN is one the database can produce: the register is found and
// lists both accounts, one we hold (Matches) and one we do not (Add), so the
// outcome is Registered. An account WE hold that the register does not list
// always comes with the high "Our account ... is not in the register" card and
// the Not found outcome (_registry_discrepancies), so it is not drawn here.
// "Matches" is said only when the check ran and both sides hold a value
// (registryRowState, PRD partner-registry-gap-fill).
//
// A server component: the buttons carry no handlers and the screen is `inert`.
// Labels come from ./copy.ts, keyed by aift-web message key; the partner is
// fictional.
//
// The aift-web files this figure copies, one `mirrors:` line each. aift-web
// scripts/help-impact.mjs reads them to flag this figure when one changes;
// keep them current when the figure is redrawn (aift-ops/docs/help-drift-guards.md).
// mirrors: src/app/(app)/workspaces/[workspaceId]/master-data/partners/[partnerId]/_components/PartnerRegistrySection.tsx
// mirrors: src/lib/registry-review.ts

import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Subheading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { AppScreen, Figure, Pin } from '../kit'
import {
  BANK_NAME,
  OUR_ACCOUNT,
  OUR_BANK_NAME,
  OUR_TAX_PREFIX,
  OUR_TAX_SUFFIX,
  PARTNER_NAME,
  REG_ACCOUNT,
  REG_TAX_SUFFIX,
  registryPanelCopy,
} from './copy'

const SCREEN_MIN_WIDTH = 760

/**
 * The comparison table's grid, verbatim (REGISTRY_TABLE and REGISTRY_SUBGRID_ROW
 * in the app's PartnerRegistrySection): one grid on the table from `sm` up,
 * every row a subgrid of it, so the columns line up row to row.
 */
const TABLE =
  'mt-2 text-sm sm:grid sm:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)_minmax(8rem,auto)] sm:gap-x-3'
const SUBGRID_ROW = 'sm:col-span-full sm:grid-cols-subgrid'
const ROW = `grid grid-cols-2 gap-x-3 gap-y-1 border-b border-zinc-950/5 py-2.5 ${SUBGRID_ROW} dark:border-white/5`
const ROW_HEADER =
  'col-span-2 font-medium text-zinc-950 sm:col-span-1 sm:font-normal sm:text-zinc-500 dark:text-white sm:dark:text-zinc-400'
const CELL = 'min-w-0 break-words text-zinc-950 dark:text-white'
const CELL_LABEL = 'block text-[11px] uppercase tracking-wide text-zinc-400 sm:hidden'
const ACTION_CELL = 'col-span-2 flex justify-start sm:col-span-1 sm:justify-end'
const SMALL_BTN = '!px-2.5 !py-1 !text-xs'

/** taxNumberDiff()'s <mark>, for the digits that moved. */
function TaxNumber({ prefix, suffix }: { prefix: string; suffix: string }) {
  return (
    <span className="font-mono">
      <span>{prefix}</span>
      <mark className="rounded bg-amber-100 px-0.5 font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
        {suffix}
      </mark>
    </span>
  )
}

export function RegistryPanelFigure({ locale, children }: { locale: Locale; children?: React.ReactNode }) {
  const c = registryPanelCopy[locale]
  const ui = c.ui
  const k = (s: string) => ui[`master_data.partners.registry.${s}` as keyof typeof ui]

  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          {/* 32px above, 16px at the sides: the app's content panel pads 40px
              (SidebarLayout `lg:p-10`); this is the partners crop. */}
          <div className="bg-white px-4 pt-8 pb-4">
            {/* Heading above, content at the full width (page-layout-sweep). */}
            <section id="company-register" className="space-y-6">
              <div className="max-w-2xl">
                <Subheading>{k('title')}</Subheading>
                <Text className="mt-1">{k('description')}</Text>
              </div>

              <div className="min-w-0 space-y-5">
                <div
                  className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-950/5 pb-4 dark:border-white/10"
                  data-registry-outcome="registered"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge color="emerald">{k('outcome_registered')}</Badge>
                      <span className="text-xs text-zinc-500">{c.rendered.checkedOn}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button outline className={SMALL_BTN}>
                      {k('revalidate')}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3" data-registry-decisions="2">
                  <p className="text-sm font-medium text-zinc-950 dark:text-white">
                    {c.rendered.decisionsHeading}
                    {/* After the short heading, in its own empty line. */}
                    <Pin n={1} at="right" cancel="" />
                  </p>

                  <div className="rounded-lg border border-zinc-950/10 p-4 dark:border-white/10" data-decision="moved">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-zinc-950 dark:text-white">{k('card.moved_title')}</p>
                      <Badge color="amber">{k('severity.high')}</Badge>
                      <Pin n={2} at="right" cancel="-ml-2" />
                    </div>
                    <Text className="mt-1 text-xs">{k('card.moved_why')}</Text>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button className={SMALL_BTN}>{k('action.take_over_both')}</Button>
                      <Button outline className={SMALL_BTN}>
                        {k('action.keep_as_is')}
                      </Button>
                      <Pin n={3} at="right" cancel="-ml-2" />
                    </div>
                  </div>

                  <div
                    className="rounded-lg border border-zinc-950/10 p-4 dark:border-white/10"
                    data-decision="accounts_to_add"
                    data-count="1"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-zinc-950 dark:text-white">{c.rendered.accountsTitle}</p>
                      <Badge color="sky">{k('severity.info')}</Badge>
                    </div>
                    <Text className="mt-1 text-xs">{k('card.accounts_why')}</Text>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button className={SMALL_BTN}>{c.rendered.addIt}</Button>
                      <Button outline className={SMALL_BTN}>
                        {k('action.not_now')}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-950 dark:text-white">
                    {k('table.heading')}
                    {/* On the table's own heading: inside a row it landed next
                        to the row below's "Matches". */}
                    <Pin n={4} at="right" cancel="" />
                  </p>
                  <div className={TABLE} role="table" aria-label={k('table.heading')}>
                    <div
                      role="row"
                      className={`hidden gap-x-3 border-b border-zinc-950/10 pb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 sm:grid ${SUBGRID_ROW} dark:border-white/10`}
                    >
                      <span role="columnheader">{k('table.field')}</span>
                      <span role="columnheader">{k('table.ours')}</span>
                      <span role="columnheader">{k('table.register')}</span>
                      <span role="columnheader" className="sr-only">
                        {k('table.action')}
                      </span>
                    </div>

                    {/* Name: agrees. */}
                    <div role="row" data-registry-row="name" className={ROW}>
                      <span role="rowheader" className={ROW_HEADER}>
                        {k('field_legal_name')}
                      </span>
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.ours')}</span>
                        {PARTNER_NAME}
                      </span>
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.register')}</span>
                        {PARTNER_NAME}
                      </span>
                      <span role="cell" className={ACTION_CELL}>
                        <span className="text-xs text-emerald-700 dark:text-emerald-400">{k('table.matches')}</span>
                      </span>
                    </div>

                    {/* Tax number and address: the moved pair, amber. */}
                    <div role="row" data-registry-row="tax_id" className={clsx(ROW, 'bg-amber-50/60 dark:bg-amber-500/5')}>
                      <span role="rowheader" className={ROW_HEADER}>
                        {k('field_tax_number')}
                      </span>
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.ours')}</span>
                        <TaxNumber prefix={OUR_TAX_PREFIX} suffix={OUR_TAX_SUFFIX} />
                      </span>
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.register')}</span>
                        <TaxNumber prefix={OUR_TAX_PREFIX} suffix={REG_TAX_SUFFIX} />
                      </span>
                      <span role="cell" className={ACTION_CELL}>
                        <span className="flex flex-wrap items-center justify-end gap-1.5">
                          <Button outline className={SMALL_BTN}>
                            {k('action.take_over')}
                          </Button>
                          <Button plain className={SMALL_BTN}>
                            {k('action.keep_as_is')}
                          </Button>
                        </span>
                      </span>
                    </div>

                    <div role="row" data-registry-row="address" className={clsx(ROW, 'bg-amber-50/60 dark:bg-amber-500/5')}>
                      <span role="rowheader" className={ROW_HEADER}>
                        {k('field_address')}
                      </span>
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.ours')}</span>
                        {c.rendered.ourAddress}
                      </span>
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.register')}</span>
                        {c.rendered.registerAddress}
                      </span>
                      <span role="cell" className={ACTION_CELL}>
                        <span className="flex flex-wrap items-center justify-end gap-1.5">
                          <Button outline className={SMALL_BTN}>
                            {k('action.take_over')}
                          </Button>
                          <Button plain className={SMALL_BTN}>
                            {k('action.keep_as_is')}
                          </Button>
                        </span>
                      </span>
                    </div>

                    {/* An account only the register lists. */}
                    <div role="row" data-registry-row="reg-account" className={clsx(ROW, 'bg-amber-50/60 dark:bg-amber-500/5')}>
                      <span role="rowheader" className={ROW_HEADER}>
                        {k('field_accounts')}
                      </span>
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.ours')}</span>
                        <span className="italic text-zinc-400">{k('table.none')}</span>
                      </span>
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.register')}</span>
                        <span>
                          <span className="font-mono text-xs">{REG_ACCOUNT}</span>
                          <span className="block text-xs text-zinc-500">
                            {BANK_NAME} · {c.rendered.accountSince}
                          </span>
                        </span>
                      </span>
                      <span role="cell" className={ACTION_CELL}>
                        <span className="flex flex-wrap items-center justify-end gap-1.5">
                          <Button outline className={SMALL_BTN}>
                            {k('action.add')}
                          </Button>
                          <Button plain className={SMALL_BTN}>
                            {k('action.keep_as_is')}
                          </Button>
                        </span>
                      </span>
                    </div>

                    {/* An account both sides hold: the one row that says Matches,
                        because the check ran and both sides hold a value. */}
                    <div role="row" data-registry-row="held-account" className={ROW}>
                      <span role="rowheader" className={ROW_HEADER} />
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.ours')}</span>
                        <span className="font-mono text-xs">{OUR_ACCOUNT}</span>
                      </span>
                      <span role="cell" className={CELL}>
                        <span className={CELL_LABEL}>{k('table.register')}</span>
                        <span>
                          <span className="font-mono text-xs">{OUR_ACCOUNT}</span>
                          <span className="block text-xs text-zinc-500">
                            {OUR_BANK_NAME} · {c.rendered.ourAccountSince}
                          </span>
                        </span>
                      </span>
                      <span role="cell" className={ACTION_CELL}>
                        <span className="text-xs text-emerald-700 dark:text-emerald-400">{k('table.matches')}</span>
                      </span>
                    </div>
                  </div>

                  {/* An <a> without href: same element and classes as the app,
                      and not focusable, which the figure requires. */}
                  <a className="mt-2 inline-block text-xs text-zinc-500 underline">{k('action.go_to_bank_accounts')}</a>
                </div>

                {/* Company details, folded, as the app shows it for any company the
                    register found. */}
                <details className="border-t border-zinc-950/5 pt-3 text-sm dark:border-white/10">
                  <summary className="cursor-pointer font-medium text-zinc-950 dark:text-white">{k('details_heading')}</summary>
                </details>
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
