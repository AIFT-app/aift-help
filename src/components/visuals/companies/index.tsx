// An app screen and a diagram for the master-data-entities (Companies) article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-22), class for
// class, with the real Catalyst components from the help mirror:
//   the company page  src/app/(app)/workspaces/[workspaceId]/master-data/entities/[entityId]/layout.tsx
//                     (+ src/components/return-context/back-link.tsx and
//                     [entityId]/_components/EntityDetailTabs.tsx)
//   Recognition tab   [entityId]/recognition/page.tsx with, from entities/_components/:
//                       EntityBankAccountsSection.tsx, EntityAlternativeNamesSection.tsx,
//                       MatchingContextEditor.tsx (+ src/components/ui/textarea.tsx)
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts and is fictional.

import clsx from 'clsx'
import { ArrowLeftIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Field, Fieldset, Label } from '@/components/catalyst/fieldset'
import { Heading, Subheading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Text } from '@/components/catalyst/text'
import { fill } from '../approvals/copy'
import { AppScreen, Figure, Pin } from '../kit'
import { StepList } from '../StepList'
import { companiesCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

/** aift-web src/lib/entity-validation.ts formatIbanDisplay, verbatim. */
function formatIbanDisplay(iban: string): string {
  const clean = iban.replace(/\s+/g, '').toUpperCase()
  return clean.match(/.{1,4}/g)?.join(' ') ?? clean
}

const TABS = ['company', 'recognition', 'tax', 'connections', 'messages'] as const
const ACTIVE_TAB = 'recognition'
const MATCHING_CONTEXT_MAX = 1000

/** src/components/ui/textarea.tsx (the app's Catalyst-styled textarea), verbatim. */
function Textarea({ value, rows, placeholder }: { value: string; rows: number; placeholder: string }) {
  return (
    <span
      data-slot="control"
      className={clsx([
        'relative block w-full',
        'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm',
        'dark:before:hidden',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500',
        'has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none',
      ])}
    >
      <textarea
        readOnly
        value={value}
        rows={rows}
        placeholder={placeholder}
        className={clsx([
          'relative block h-full w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
          'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
          'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
          'bg-transparent dark:bg-white/5',
          'focus:outline-hidden',
          'data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-600 dark:data-invalid:data-hover:border-red-600',
          'disabled:border-zinc-950/20 dark:disabled:border-white/15 dark:disabled:bg-white/2.5 dark:data-hover:disabled:border-white/15',
          'resize-y',
        ])}
      />
    </span>
  )
}

function CompanyPage({ locale }: { locale: Locale }) {
  const c = companiesCopy[locale]
  const ui = c.ui
  const tab = (active: boolean) =>
    clsx(
      'whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
      active
        ? 'border-blue-600 text-zinc-950 dark:border-blue-500 dark:text-white'
        : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200',
    )
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-1.5 flex items-center gap-1.5 text-sm text-zinc-500">
        <a className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          <ArrowLeftIcon className="size-3.5" />
          {ui['nav.master_data.entities']}
        </a>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Heading>{c.company.name}</Heading>
          </div>
          <p className="mt-1 text-sm text-zinc-500">{`${c.company.flag} ${c.company.countryName}`}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge color="green">{ui['master_data.entities.nav.state_syncing']}</Badge>
            <Badge color="zinc">{c.rendered.statusBankAccounts}</Badge>
            <Pin n={2} at="right" cancel="-ml-2" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-1 border-b border-zinc-200 dark:border-zinc-700">
          {TABS.map((t) => (
            <a key={t} aria-current={t === ACTIVE_TAB ? 'page' : undefined} className={tab(t === ACTIVE_TAB)}>
              {ui[`master_data.entities.tabs.${t}`]}
            </a>
          ))}
          <Pin n={1} at="right" cancel="-ml-6" />
        </nav>
      </div>

      <div className="mt-10">
        {/* EntityBankAccountsSection */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-[1fr_2fr]">
          <div>
            <Subheading>
              {ui['master_data.entities.bank_accounts.heading']}
              <Pin n={3} at="right" cancel="" />
            </Subheading>
            <Text className="mt-1">{ui['master_data.entities.bank_accounts.description']}</Text>
          </div>
          <div className="space-y-4">
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {c.accounts.map((acc) => (
                <li key={acc.iban} className="flex items-start gap-3 py-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{acc.name}</p>
                    <p className="font-mono text-sm text-zinc-900 dark:text-zinc-100">{formatIbanDisplay(acc.iban)}</p>
                    <p className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{acc.domestic}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-zinc-500">{acc.currency}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
                    aria-label={ui['master_data.entities.bank_accounts.edit_aria']}
                    title={ui['master_data.entities.bank_accounts.edit_heading']}
                  >
                    <PencilSquareIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="shrink-0 text-zinc-400 transition-colors hover:text-red-500"
                    aria-label={ui['master_data.entities.bank_accounts.remove_aria']}
                  >
                    <XMarkIcon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <Button outline>{ui['master_data.entities.bank_accounts.add_button']}</Button>
            </div>
          </div>
        </section>

        <Divider className="my-10" />

        {/* EntityAlternativeNamesSection */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-[1fr_2fr]">
          <div>
            <Subheading>
              {ui['master_data.entities.alternative_names.heading']}
              <Pin n={4} at="right" cancel="" />
            </Subheading>
            <Text className="mt-1">{ui['master_data.entities.alternative_names.description']}</Text>
          </div>
          <div className="space-y-4">
            <ul className="divide-y divide-zinc-100 dark:divide-white/10">
              {c.altNames.map((name) => (
                <li key={name} className="flex items-center gap-2 py-2.5">
                  <span className="flex-1 text-sm text-zinc-900 dark:text-white">{name}</span>
                  <button
                    className="shrink-0 text-zinc-400 hover:text-red-500 transition-colors"
                    aria-label={ui['master_data.entities.alternative_names.remove_aria']}
                  >
                    <XMarkIcon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Input readOnly value="" placeholder={ui['master_data.entities.alternative_names.placeholder']} className="flex-1" />
              <Button disabled>{ui['master_data.entities.alternative_names.add']}</Button>
            </div>
          </div>
        </section>

        <Divider className="my-10" />

        {/* MatchingContextEditor */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-[1fr_2fr]">
          <div>
            <Subheading>
              {ui['master_data.entities.matching_context.heading']}
              <Pin n={5} at="right" cancel="" />
            </Subheading>
            <Text className="mt-1">{ui['master_data.entities.matching_context.description']}</Text>
          </div>
          <Fieldset>
            <Field>
              <Label>{ui['master_data.entities.matching_context.label']}</Label>
              <Textarea value={c.matchingContext} rows={5} placeholder={ui['master_data.entities.matching_context.placeholder']} />
              <div className={['mt-1 text-right text-xs', 'text-zinc-400'].join(' ')}>
                {fill(ui['master_data.entities.matching_context.char_count'], {
                  count: c.matchingContext.length,
                  max: MATCHING_CONTEXT_MAX,
                })}
              </div>
            </Field>
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button disabled>{ui['master_data.entities.matching_context.save']}</Button>
            </div>
          </Fieldset>
        </section>
      </div>
    </div>
  )
}

export function CompanyRecognitionFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={companiesCopy[locale].help.alt.recognition}
      bleed
      wide
      zoomable={locale}
      art={
        <AppScreen>
          {/* The company page has no padding of its own (the app's content
              panel pads it): cut 32px above and below, 16px at the sides. */}
          <div className="px-4 py-8">
            <CompanyPage locale={locale} />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── How an invoice finds its company (a diagram, not an app screen) ─────────

export function CompanyMatchFigure({ locale, children }: FigureProps) {
  const c = companiesCopy[locale]
  const ui = c.ui
  const m = c.help.match
  return (
    <Figure
      alt={c.help.alt.match}
      art={
        <StepList
          steps={[
            { title: m.taxId, detail: m.taxIdDetail },
            { title: m.regNo, detail: m.regNoDetail },
            { title: m.names, detail: m.namesDetail },
            { title: m.ai, detail: m.aiDetail },
            {
              title: m.direction,
              detail: m.directionDetail,
              outcomes: [
                { kind: 'text', label: ui['master_data.invoice_categories.form.direction_income'] },
                { kind: 'text', label: ui['master_data.invoice_categories.form.direction_expense'] },
              ],
            },
          ]}
          footnote={{ text: m.footnote, outcomes: [{ kind: 'pill', tone: 'amber', label: ui['invoices.labels.entity_needed'] }] }}
        />
      }
    >
      {children}
    </Figure>
  )
}
