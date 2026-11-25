// The cash pool section of a bank account, for the cash-pool article.
//
// Rebuilt 1:1 from aift-web (origin/staging, 2026-11-25), class for class.
// Since bank-account-edit-drawer the account's edit form opens in the app's
// side drawer, always 512 px wide (edit-drawer-fixed-width), and the cash
// pool section is the last thing in it. The figure is that drawer scrolled to
// its end: the sticky header, the last field of the form, the section and the
// sticky footer.
//   the drawer   src/components/catalyst/edit-drawer.tsx (app-coupled, not in
//                the mirror, so its markup is copied here)
//   the form     src/app/(app)/workspaces/[workspaceId]/master-data/
//                bank-accounts/_components/BankAccountNumbersSection.tsx
//                (BankAccountFormCard: Fieldset, the bank tax ID Field, the
//                Cancel and Save footer)
//   the section  .../bank-accounts/_components/CashPoolSection.tsx
// When one of those files changes, re-copy the markup here.
// It is the one screen a reader cannot find on their own: it exists only in
// an account's edit drawer, and only in a workspace that has more than one
// company. Labels come from ./copy.ts; the data is a fictional group.

import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/catalyst/checkbox'
import { Description, Field, Fieldset, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Select } from '@/components/catalyst/select'
import { AppScreen, Figure } from '../kit'
import { MEMBERS, cashPoolCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

/** The drawer is max-w-lg (512px); the crop is the drawer's width. */
const DRAWER_WIDTH = 512

export function CashPoolSectionFigure({ locale, children }: FigureProps) {
  const c = cashPoolCopy[locale]
  const ui = c.ui
  const k = (name: string) => ui[`master_data.bank_accounts.cash_pool.${name}` as keyof typeof ui]
  const f = (name: string) => ui[`master_data.bank_accounts.numbers_section.${name}` as keyof typeof ui]
  return (
    <Figure
      alt={c.help.alt}
      bleed
      wide
      zoomable={locale}
      zoomWidth={DRAWER_WIDTH}
      art={
        <div className="mx-auto" style={{ maxWidth: DRAWER_WIDTH }}>
          <AppScreen minWidth={DRAWER_WIDTH}>
            {/* edit-drawer.tsx: `fixed inset-y-0 right-0 flex` > DialogPanel. The
                panel's `w-screen max-w-lg` is 512 px in the app; here the stage
                is the drawer's width, so `w-full` gives the same 512 px. */}
            <div className="flex">
              <div className="flex w-full max-w-lg flex-col overflow-y-auto bg-white shadow-xl dark:bg-zinc-900">
                <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-zinc-100 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <button type="button" className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                    {ui['common.edit_drawer.close']}
                  </button>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{f('form_edit_heading')}</span>
                </div>

                <div className="flex flex-1 flex-col">
                  <form>
                    {/* Scrolled to the end: the six fields above the bank tax ID
                        (company, name, IBAN, domestic number, currency, bank name)
                        are out of view under the header. */}
                    <Fieldset className="space-y-4 px-5 py-5">
                      <Field>
                        <Label>{f('bank_tax_id_label')}</Label>
                        <Input readOnly placeholder={f('bank_tax_id_placeholder')} maxLength={40} />
                      </Field>

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
                          {/* Disabled until something changes, as in the app. */}
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
                    </Fieldset>
                  </form>
                </div>

                <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-zinc-100 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <Button plain type="button">
                    {f('cancel')}
                  </Button>
                  <Button type="button">{f('save')}</Button>
                </div>
              </div>
            </div>
          </AppScreen>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
