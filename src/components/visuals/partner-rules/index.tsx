// The partner's Rules tab, for the fixed-payment-method article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-23), class for class:
//   the page chrome  src/app/(app)/workspaces/[workspaceId]/master-data/
//                    partners/[partnerId]/layout.tsx (+ _components/
//                    PartnerDetailTabs.tsx)
//   the section      [partnerId]/_components/PartnerFixedPaymentMethodSection.tsx
// The article used to tell readers to scroll the partner page for a control
// that has been on the Rules tab since the tabbed IA, so the tab bar is the
// point of the picture. Labels come from ./copy.ts; the partner is fictional.
//
// The section is a server component here, so the Select carries defaultValue
// rather than value/onChange, and Save is disabled because nothing is dirty,
// which is exactly the app's initial state.

import clsx from 'clsx'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Description, Field, Fieldset, Label } from '@/components/catalyst/fieldset'
import { Heading, Subheading } from '@/components/catalyst/heading'
import { Select } from '@/components/catalyst/select'
import { Text } from '@/components/catalyst/text'
import { AppScreen, Figure, Pin } from '../kit'
import { METHODS, PARTNER, SELECTED, TABS, partnerRulesCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const SCREEN_MIN_WIDTH = 760
const ACTIVE_TAB = 'rules'

export function PartnerRulesFigure({ locale, children }: FigureProps) {
  const c = partnerRulesCopy[locale]
  const ui = c.ui
  const f = (k: string) => ui[`master_data.partners.fixed_payment_method.${k}` as keyof typeof ui]

  const tab = (active: boolean) =>
    clsx(
      'whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
      active
        ? 'border-blue-600 text-zinc-950 dark:border-blue-500 dark:text-white'
        : 'border-transparent text-zinc-500 dark:text-zinc-400',
    )

  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          {/* Cropped at the page's own content column, as on the app's page. */}
          <div className="bg-white p-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-1.5 flex items-center gap-1.5 text-sm text-zinc-500">
                <span className="inline-flex items-center gap-1 text-sm text-zinc-500">
                  <ArrowLeftIcon className="size-3.5" />
                  {ui['nav.master_data.partners']}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Heading>{PARTNER}</Heading>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge color="zinc">{c.rendered.chip}</Badge>
                    <Pin n={3} at="right" cancel="" />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-1 border-b border-zinc-200 dark:border-zinc-700">
                  {TABS.map((t) => (
                    <span key={t} aria-current={t === ACTIVE_TAB ? 'page' : undefined} className={tab(t === ACTIVE_TAB)}>
                      {ui[`master_data.partners.tabs.${t}` as keyof typeof ui]}
                    </span>
                  ))}
                  <Pin n={1} at="right" cancel="-ml-6" />
                </nav>
              </div>

              <div className="mt-10">
                <section
                  className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-[1fr_2fr]"
                  data-testid="partner-fixed-payment-method"
                >
                  <div>
                    <Subheading>{f('heading')}</Subheading>
                    <Text className="mt-1">{f('description')}</Text>
                  </div>

                  <Fieldset className="space-y-4">
                    <Field>
                      <Label className="sr-only">{f('method_label')}</Label>
                      <Select defaultValue={SELECTED} data-testid="fixed-payment-method-select">
                        <option value="">{f('none')}</option>
                        {METHODS.map((m) => (
                          <option key={m} value={m}>
                            {f(`method_${m}`)}
                          </option>
                        ))}
                      </Select>
                      <Description data-testid="fixed-payment-method-forward-only">
                        {f('forward_only_help')}
                      </Description>
                      <Pin n={2} at="right" cancel="" />
                    </Field>

                    <div className="flex items-center justify-end gap-2">
                      {/* Nothing is dirty on load, so Reset is absent and Save is disabled. */}
                      <Button disabled>{f('save')}</Button>
                    </div>
                  </Fieldset>
                </section>
              </div>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
