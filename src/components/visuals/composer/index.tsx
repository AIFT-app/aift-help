// The message composer, for the messages article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28), class for class:
//   src/app/(app)/_components/SubjectCommentsPanel.tsx:270-352 (the composer)
//   src/app/(app)/_components/ChipEditor.tsx (the editor and CHIP_CLASS)
// The recipient field ("To" / "Címzett") from aift-web origin/staging
// bc0f137d, 2026-11-04 (PRD message-recipients): SubjectCommentsPanel.tsx,
// the block under "Recipient field (PRD message-recipients)", class for
// class. Headless UI's Popover renders a div and PopoverButton a button,
// so both are written as those elements here; the picker panel stays closed.
// The "only the recipients" box under the field from aift-web
// feat/message-groups-and-privacy (2026-11-05, PRD message-groups-and-privacy):
// the CheckboxField under the recipient field, unticked, class for class.
//
// WHY THIS SCREEN
//
//   Three controls sit within a few pixels of each other and behave
//   differently, which the article's prose got two-thirds wrong:
//
//     Suggested: chips   one tap, arrive ALREADY FILLED, accounting side only
//     Use a template…    everyone, both sides, and it does NOT prefill
//     Draft with AI      accounting side only, streams a draft
//
//   The dropdown's onChange is `applyTemplate(e.target.value)` with no prefill
//   argument; only the chips pass one. So a template taken from the dropdown
//   arrives with every `{token}` still a chip, and `canSend` checks length
//   only - nothing stops you sending "tax_id_on_invoice" to a client. That is
//   what the picture is for.
//
// A server component: the Select carries defaultValue, the editor is a plain
// div rather than contentEditable, and nothing is focusable inside an `inert`
// screen anyway.

import { ChevronDownIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { Label } from '@/components/catalyst/fieldset'
import { Select } from '@/components/catalyst/select'
import { AppScreen, Figure, Pin } from '../kit'
import { CHIPS, composerCopy } from './copy'

const SCREEN_MIN_WIDTH = 760

/** ChipEditor.tsx CHIP_CLASS, verbatim. */
const CHIP_CLASS =
  'placeholder-chip inline-block rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100'

export function MessageComposerFigure({
  locale,
  children,
}: {
  locale: Locale
  children?: React.ReactNode
}) {
  const c = composerCopy[locale]
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
            <div className="mt-4 space-y-2">
              {/* Suggested chips - accountant side, and the only ones that prefill. */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-zinc-500">
                  {ui['comments.thread.suggested_label']}
                </span>
                <Pin n={1} at="above" cancel="-ml-2" />
                <button
                  type="button"
                  className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
                >
                  {ui['comments.templates.invoice.tax_id_mismatch.label']}
                </button>
                <button
                  type="button"
                  className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
                >
                  {ui['comments.templates.invoice.date_unclear.label']}
                </button>
              </div>

              {/* The recipient field, holding one person (both sides get it). */}
              <div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-2">
                  <span className="text-sm font-medium text-zinc-700 after:content-[':'] sm:pt-3 dark:text-zinc-300">
                    {ui['comments.thread.recipient_label']}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute inset-0 flex items-center justify-between gap-2 rounded-lg border border-zinc-950/10 bg-white px-3 text-left text-sm text-zinc-500 hover:border-zinc-950/20 focus:outline-none data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-blue-500 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-white/20"
                      >
                        <span className="truncate" />
                        <ChevronDownIcon className="size-4 shrink-0" aria-hidden="true" />
                      </button>
                      <div className="pointer-events-none relative flex min-h-11 flex-wrap items-center gap-1.5 py-1.5 pl-2 pr-9">
                        <span className="pointer-events-auto inline-flex max-w-full items-center gap-0.5 rounded-md bg-zinc-100 py-0.5 pl-2 pr-0.5 text-sm text-zinc-900 dark:bg-white/10 dark:text-white">
                          <span className="truncate">{c.recipient}</span>
                          <button
                            type="button"
                            aria-label={ui['comments.thread.recipient_remove'].replace('{name}', c.recipient)}
                            className="relative rounded p-1 text-zinc-500 before:absolute before:-inset-2.5 hover:text-zinc-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500 dark:text-zinc-400 dark:hover:text-white"
                          >
                            <XMarkIcon className="size-4" aria-hidden="true" />
                          </button>
                        </span>
                        {/* Beside the token, in the field's empty middle; cancels the gap-1.5. */}
                        <Pin n={2} at="right" cancel="-ml-1.5" />
                      </div>
                    </div>
                    {/* Shown once somebody is named; unticked, the message stays readable by everyone. */}
                    <div className="flex items-center">
                      <CheckboxField className="mt-2">
                        <Checkbox checked={false} />
                        <Label>{ui['comments.thread.private_label']}</Label>
                      </CheckboxField>
                      <Pin n={5} at="right" cancel="" />
                    </div>
                  </div>
                </div>
              </div>

              {/* The plain picker (everyone) + the AI draft (accountant side). */}
              <div className="flex items-center gap-2">
                <Select aria-label={ui['comments.thread.use_template']} className="flex-1" defaultValue="">
                  <option value="">{ui['comments.thread.use_template']}</option>
                </Select>
                {/* `above` would put this on top of the Suggested: label in the
                    row above; `left` drops it into the select's empty right end. */}
                <Pin n={3} at="left" cancel="-mr-2" />
                <Pin n={4} at="above" cancel="-mr-2" />
                <Button outline>
                  <SparklesIcon data-slot="icon" className="size-4" aria-hidden="true" />
                  {ui['comments.thread.draft_ai']}
                </Button>
              </div>

              {/* ChipEditor, holding a template taken from the dropdown: the
                  placeholders are still chips, showing their token names. */}
              <div
                role="textbox"
                aria-label={ui['comments.thread.reply_placeholder']}
                aria-multiline="true"
                className="min-h-[8rem] w-full rounded-lg border border-zinc-950/10 bg-transparent px-3.5 py-2.5 text-sm whitespace-pre-wrap text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {c.body.lead}
                <span className={CHIP_CLASS}>{CHIPS[0]}</span>
                {c.body.mid}
                <span className={CHIP_CLASS}>{CHIPS[1]}</span>
                {c.body.tail}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  {ui['comments.templates.placeholder_hint']}
                </span>
                <Button color="dark">{ui['comments.thread.send']}</Button>
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
