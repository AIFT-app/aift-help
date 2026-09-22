// An app screen and a diagram for the transaction-types article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-22), class for
// class, with the real Catalyst components from the help mirror. It is a crop
// of the type editor, the drawer that slides in from the right over the types
// list, cropped to the drawer itself:
//   the drawer   src/components/catalyst/edit-drawer.tsx (app-coupled, not in
//                the mirror, so its markup is copied here)
//   the form     src/app/(app)/workspaces/[workspaceId]/master-data/transaction-types/
//                _components/TransactionTypeForm.tsx + PatternEditor.tsx
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts and is fictional.

import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { Description, Field, Fieldset, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Select } from '@/components/catalyst/select'
import { fill } from '../approvals/copy'
import { AppScreen, Figure, Pin } from '../kit'
import { StepList } from '../StepList'
import { AI_SCORE, PATTERNS, TYPE_DESCRIPTION, TYPE_NAME, transactionTypesCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

/** The drawer is max-w-lg (512px); the crop is the drawer's width. */
const DRAWER_WIDTH = 512
/**
 * The drawer is as tall as the window. This crop is a window just tall enough
 * for the form in every locale, so the sticky footer sits under the form, as
 * it does on a laptop.
 */
export const DRAWER_HEIGHT = 1250

/**
 * Catalyst's Description (catalyst/fieldset.tsx), for the one that sits outside
 * a Field. In the app the drawer's Dialog gives Headless UI the description
 * context it needs; this crop has no dialog, so it renders the same markup
 * (Headless.Description is a <p>) directly.
 */
function LooseDescription({ children }: { children: React.ReactNode }) {
  return (
    <p data-slot="description" className="text-base/6 text-zinc-500 data-disabled:opacity-50 sm:text-sm/6 dark:text-zinc-400">
      {children}
    </p>
  )
}

const FIELDS = ['description', 'counterparty_name', 'reference'] as const
const MODES = ['contains', 'starts_with', 'exact'] as const
const BINDING_MODES = ['bank', 'fixed'] as const

function EditorDrawer({ locale }: { locale: Locale }) {
  const c = transactionTypesCopy[locale]
  const ui = c.ui
  const form = (k: string) => ui[`master_data.transaction_types.form.${k}` as keyof typeof ui]
  const pat = (k: string) => ui[`master_data.transaction_types.patterns.${k}` as keyof typeof ui]
  return (
    // edit-drawer.tsx: `fixed inset-y-0 right-0 flex` > DialogPanel
    <div className="flex" style={{ height: DRAWER_HEIGHT }}>
      <div className="flex w-full max-w-lg flex-col overflow-y-auto bg-white shadow-xl dark:bg-zinc-900">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <button type="button" className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
            {ui['common.edit_drawer.close']}
          </button>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{form('edit_title')}</span>
        </div>

        <div className="flex flex-1 flex-col">
          <form className="flex flex-1 flex-col gap-5 px-5 py-5">
            <Fieldset className="space-y-5">
              <Field>
                <Label>{form('name_label')}</Label>
                <Input readOnly value={TYPE_NAME} placeholder={form('name_placeholder')} />
                <Description>{ui['defaults.systemDefaultHint']}</Description>
              </Field>

              <Field>
                <Label>
                  {form('description_label')}
                  <Pin n={1} at="right" cancel="" />
                </Label>
                <Description>{form('description_help')}</Description>
                <span
                  data-slot="control"
                  className="relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500"
                >
                  <textarea
                    readOnly
                    value={TYPE_DESCRIPTION}
                    placeholder={form('description_placeholder')}
                    rows={3}
                    className="relative block w-full appearance-none rounded-lg px-[calc(var(--spacing,0.25rem)*3.5-1px)] py-[calc(var(--spacing,0.25rem)*2.5-1px)] sm:px-[calc(var(--spacing,0.25rem)*3-1px)] sm:py-[calc(var(--spacing,0.25rem)*1.5-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none resize-none dark:text-zinc-100"
                  />
                </span>
              </Field>

              <CheckboxField>
                <Checkbox defaultChecked />
                <Label>{form('active_label')}</Label>
                <Description>{form('active_help')}</Description>
              </CheckboxField>
            </Fieldset>

            <div className="border-t border-zinc-100 dark:border-zinc-800" />

            <Fieldset className="space-y-4">
              <CheckboxField>
                <Checkbox defaultChecked />
                <Label>
                  {form('partner_enable_label')}
                  <Pin n={2} at="right" cancel="" />
                </Label>
                <Description>{form('partner_section_help')}</Description>
              </CheckboxField>

              <div className="space-y-4 pl-7">
                <div
                  role="radiogroup"
                  aria-label={form('partner_section_label')}
                  className="inline-flex rounded-lg border border-zinc-950/10 p-0.5 dark:border-white/10"
                >
                  {BINDING_MODES.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      role="radio"
                      aria-checked={mode === 'bank'}
                      className={
                        mode === 'bank'
                          ? 'rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-900'
                          : 'rounded-md px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                      }
                    >
                      {form(`partner_mode_${mode}`)}
                    </button>
                  ))}
                </div>
                <LooseDescription>{form('partner_mode_bank_help')}</LooseDescription>
              </div>
            </Fieldset>

            <div className="border-t border-zinc-100 dark:border-zinc-800" />

            {/* PatternEditor */}
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {pat('heading')}
                <Pin n={3} at="right" cancel="" />
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{pat('description')}</p>

              <div className="space-y-3">
                {PATTERNS.map((p) => (
                  <div key={p.value} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Select defaultValue={p.field} className="flex-1">
                        {FIELDS.map((f) => (
                          <option key={f} value={f}>
                            {pat(`field_${f}`)}
                          </option>
                        ))}
                      </Select>
                      <Select defaultValue={p.mode} className="flex-1">
                        {MODES.map((m) => (
                          <option key={m} value={m}>
                            {pat(`mode_${m}`)}
                          </option>
                        ))}
                      </Select>
                      <button
                        type="button"
                        className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 text-lg leading-none"
                        aria-label={pat('remove_aria')}
                      >
                        ×
                      </button>
                    </div>
                    <Input readOnly value={p.value} placeholder={pat('value_placeholder')} />
                  </div>
                ))}
              </div>

              <Button plain type="button" className="text-sm">
                {pat('add_pattern')}
              </Button>

              <div className="rounded-md bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">
                {c.rendered.matchCount}
                <Pin n={4} at="right" cancel="" />
              </div>
            </div>
          </form>
        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-zinc-100 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <Button plain type="button">
            {form('cancel')}
          </Button>
          <Button type="submit">{form('save_changes')}</Button>
        </div>
      </div>
    </div>
  )
}

export function TransactionTypeEditorFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={transactionTypesCopy[locale].help.alt.editor}
      bleed
      wide
      zoomable={locale}
      zoomWidth={DRAWER_WIDTH}
      art={
        <div className="mx-auto" style={{ maxWidth: DRAWER_WIDTH }}>
          <AppScreen minWidth={DRAWER_WIDTH}>
            <EditorDrawer locale={locale} />
          </AppScreen>
        </div>
      }
    >
      {children}
    </Figure>
  )
}

// ── How a transaction gets its type (a diagram, not an app screen) ──────────

export function TransactionTypeFlowFigure({ locale, children }: FigureProps) {
  const c = transactionTypesCopy[locale]
  const ui = c.ui
  const f = c.help.flow
  return (
    <Figure
      alt={c.help.alt.flow}
      art={
        <StepList
          steps={[
            {
              title: f.patterns,
              detail: f.patternsDetail,
              outcomes: [{ kind: 'text', label: ui['transactions.slide_over.matched_by_pattern'] }],
            },
            {
              title: f.partner,
              detail: f.partnerDetail,
              outcomes: [{ kind: 'text', label: ui['transactions.detail.chip_own_entity'] }],
            },
            {
              title: f.ai,
              detail: f.aiDetail,
              outcomes: [
                {
                  kind: 'text',
                  label: fill(ui['transactions.slide_over.matched_by_ai'], {
                    label: ui['transactions.slide_over.confidence_medium'],
                    score: AI_SCORE,
                  }),
                },
              ],
            },
            {
              title: f.person,
              detail: f.personDetail,
              outcomes: [{ kind: 'text', label: ui['transactions.slide_over.marked_manually'] }],
            },
          ]}
          footnote={{ text: f.footnote, outcomes: [{ kind: 'text', label: ui['transactions.slide_over.undo_mark_unmatched'] }] }}
        />
      }
    >
      {children}
    </Figure>
  )
}
