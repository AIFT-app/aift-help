// The cash pool section of a bank account form, for the cash-pool article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-23), class for class:
//   CashPoolSection  src/app/(app)/workspaces/[workspaceId]/master-data/
//                    bank-accounts/_components/CashPoolSection.tsx
// It is the one screen a reader cannot find on their own: it exists only
// inside an account's edit form, and only in a workspace that has more than
// one company. Labels come from ./copy.ts; the data is a fictional group.

import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/catalyst/checkbox'
import { Description, Field, Label } from '@/components/catalyst/fieldset'
import { Select } from '@/components/catalyst/select'
import { AppScreen, Figure } from '../kit'
import { MEMBERS, cashPoolCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const SCREEN_MIN_WIDTH = 704

export function CashPoolSectionFigure({ locale, children }: FigureProps) {
  const c = cashPoolCopy[locale]
  const ui = c.ui
  const k = (name: string) => ui[`master_data.bank_accounts.cash_pool.${name}` as keyof typeof ui]
  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          {/* The form card's own padding is the crop, as on the app's page. */}
          <div className="bg-white p-4">
            <div
              className="space-y-4 rounded-lg border border-zinc-200 p-4 dark:border-white/10"
              data-testid="cash-pool-section"
            >
              <div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{k('section_title')}</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{k('section_description')}</p>
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.rendered.holder}</p>

              <CheckboxGroup>
                {MEMBERS.map((m) => (
                  <CheckboxField key={m.name}>
                    <Checkbox defaultChecked={m.ticked} />
                    <Label>{m.name}</Label>
                  </CheckboxField>
                ))}
              </CheckboxGroup>
              <div className="flex justify-end">
                {/* Disabled until something changes, as on the app's form. */}
                <Button type="button" disabled>
                  {k('save_members')}
                </Button>
              </div>

              <Field>
                <Label>{k('change_holder_label')}</Label>
                <Description>{k('change_holder_description')}</Description>
                <div className="mt-2 flex gap-2">
                  <Select defaultValue="">
                    <option value="">{k('change_holder_placeholder')}</option>
                    {MEMBERS.filter((m) => m.ticked).map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </Select>
                  <Button type="button" outline disabled>
                    {k('change_holder_button')}
                  </Button>
                </div>
              </Field>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
