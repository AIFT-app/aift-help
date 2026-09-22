// An app screen and a diagram for the partners article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-22), class for
// class, with the real Catalyst components from the help mirror:
//   the partner page  src/app/(app)/workspaces/[workspaceId]/master-data/partners/[partnerId]/layout.tsx
//                     (+ src/components/return-context/back-link.tsx,
//                     _components/PartnerDetailActions.tsx, _components/PartnerDetailTabs.tsx)
//   Recognition tab   [partnerId]/recognition/page.tsx with, from [partnerId]/_components/:
//                       AlternativeNamesSection.tsx, PartnerNamePatternsSection.tsx,
//                       PartnerBankAccountsSection.tsx (as someone holding both
//                       Edit master data and Manage approvals sees it)
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts and is fictional.

import clsx from 'clsx'
import { ArrowLeftIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { Divider } from '@/components/catalyst/divider'
import { Field, Fieldset, Label } from '@/components/catalyst/fieldset'
import { Heading, Subheading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Text } from '@/components/catalyst/text'
import { fill } from '../approvals/copy'
import { formatDateTime } from '../format'
import { AppScreen, Figure, Pin } from '../kit'
import { StepList } from '../StepList'
import { ALT_NAMES, NAME_PATTERNS, PARTNER, partnersCopy, type PartnerAccount } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

/** aift-web src/lib/hu-bank-account.ts bankAccountDisplay, verbatim. */
function bankAccountDisplay(digits: string): string {
  if (/^[0-9]{24}$/.test(digits)) {
    if (digits.slice(16, 24) === '00000000') return `${digits.slice(0, 8)}-${digits.slice(8, 16)}`
    return `${digits.slice(0, 8)}-${digits.slice(8, 16)}-${digits.slice(16, 24)}`
  }
  if (/^[0-9]{16}$/.test(digits)) return `${digits.slice(0, 8)}-${digits.slice(8, 16)}`
  return digits
}

const TABS = ['partner', 'rules', 'recognition', 'history', 'messages'] as const
const ACTIVE_TAB = 'recognition'

/**
 * The page is long: the crop ends inside the "Add bank account" form under the
 * accounts, the way a screenshot of the top of the tab would.
 */
export const PARTNER_CLIP_HEIGHT = 1130

function AccountRow({ acc, locale, marker }: { acc: PartnerAccount; locale: Locale; marker?: number }) {
  const ui = partnersCopy[locale].ui
  const b = (k: string) => ui[`master_data.partners.bank_accounts.${k}` as keyof typeof ui]
  const confirmed = Boolean(acc.confirmedAt)
  const source = acc.source === 'manual' ? b('source_manual') : b('source_invoice_extraction')
  return (
    <li className="flex items-start gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-sm text-zinc-900 dark:text-zinc-100">{acc.domestic ? bankAccountDisplay(acc.domestic) : acc.iban}</p>
        {acc.domestic && <p className="font-mono text-xs text-zinc-500">{acc.iban}</p>}
        <p className="mt-0.5 text-xs text-zinc-500">{[acc.currency, source].filter(Boolean).join(' · ')}</p>
        <p className="mt-0.5 text-xs">
          {confirmed ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
              <CheckIcon className="size-3" aria-hidden />
              {fill(b('confirmed_on'), { date: formatDateTime(acc.confirmedAt ?? '', locale) })}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
              {b('unconfirmed')}
            </span>
          )}
          {marker === 5 ? <Pin n={5} at="right" cancel="" /> : null}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {!confirmed && (
          <>
            {marker === 4 ? <Pin n={4} at="left" cancel="-mr-2" /> : null}
            <Button outline className="!px-2.5 !py-1 !text-xs">
              {b('confirm')}
            </Button>
          </>
        )}
        <button type="button" className="text-zinc-400 transition-colors hover:text-red-500" aria-label={b('remove_aria')}>
          <XMarkIcon className="size-4" />
        </button>
      </div>
    </li>
  )
}

function PartnerPage({ locale }: { locale: Locale }) {
  const c = partnersCopy[locale]
  const ui = c.ui
  const an = (k: string) => ui[`master_data.partners.alternative_names.${k}` as keyof typeof ui]
  const np = (k: string) => ui[`master_data.partners.name_patterns.${k}` as keyof typeof ui]
  const b = (k: string) => ui[`master_data.partners.bank_accounts.${k}` as keyof typeof ui]
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
          {ui['nav.master_data.partners']}
        </a>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Heading>{PARTNER}</Heading>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge color="zinc">{ui['master_data.partners.detail.chip_fixed_invoice_category']}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button plain>{ui['master_data.partners.detail.merge_into']}</Button>
        </div>
      </div>

      <div className="mt-8">
        <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-1 border-b border-zinc-200 dark:border-zinc-700">
          {TABS.map((t) => (
            <a key={t} aria-current={t === ACTIVE_TAB ? 'page' : undefined} className={tab(t === ACTIVE_TAB)}>
              {ui[`master_data.partners.tabs.${t}`]}
            </a>
          ))}
          <Pin n={1} at="right" cancel="-ml-6" />
        </nav>
      </div>

      <div className="mt-10">
        {/* AlternativeNamesSection */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-[1fr_2fr]" aria-label={an('title')}>
          <div>
            <Subheading>
              {an('title')}
              <Pin n={2} at="right" cancel="" />
            </Subheading>
            <Text className="mt-1">{an('description')}</Text>
          </div>
          <div className="space-y-4">
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
              {ALT_NAMES.map((entry) => (
                <li key={entry.value} className="flex items-center gap-3 px-4 py-3">
                  <span className="flex-1 min-w-0 text-sm text-zinc-900 dark:text-zinc-100">{entry.value}</span>
                  <span
                    className={[
                      'shrink-0 rounded px-1.5 py-0.5 text-xs font-medium',
                      entry.origin === 'auto'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300'
                        : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
                    ].join(' ')}
                  >
                    {entry.origin === 'auto' ? an('badgeAuto') : an('badgeManual')}
                  </span>
                  <button
                    title={an('removeTooltip')}
                    aria-label={an('removeTooltip')}
                    className="shrink-0 text-zinc-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 transition-colors"
                  >
                    <XMarkIcon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Input readOnly value="" placeholder={an('placeholder')} className="flex-1" />
              <Button disabled>{an('add')}</Button>
            </div>
          </div>
        </section>

        <Divider className="my-10" />

        {/* PartnerNamePatternsSection */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-[1fr_2fr]">
          <div>
            <Subheading>
              {np('heading')}
              <Pin n={3} at="right" cancel="" />
            </Subheading>
            <Text className="mt-1">{np('description')}</Text>
          </div>
          <div className="space-y-4">
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {NAME_PATTERNS.map((p) => (
                <li key={p} className="flex items-center gap-2 py-2.5">
                  <span className="flex-1 font-mono text-sm text-zinc-900 dark:text-zinc-100">{`${p}*`}</span>
                  <button className="shrink-0 text-zinc-400 hover:text-red-500 transition-colors" aria-label={np('remove_aria')}>
                    <XMarkIcon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Input readOnly value="" placeholder={np('placeholder')} className="flex-1" />
              <Button disabled>{np('add')}</Button>
            </div>
            <Text className="text-xs">{np('helper')}</Text>
            <Button outline>{np('backfill')}</Button>
          </div>
        </section>

        <Divider className="my-10" />

        {/* PartnerBankAccountsSection */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-[1fr_2fr]">
          <div>
            <Subheading>{b('heading')}</Subheading>
            <Text className="mt-1">{b('description')}</Text>
            <Text className="mt-2 text-xs">{b('confirmation_rule')}</Text>
          </div>
          <div className="space-y-4">
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {c.accounts.map((acc, i) => (
                <AccountRow key={acc.iban} acc={acc} locale={locale} marker={i === 0 ? 4 : 5} />
              ))}
            </ul>
            <Fieldset className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{b('add_heading')}</p>
              <Field>
                <Label>{b('account_label')}</Label>
                <Input readOnly value="" placeholder={b('account_placeholder')} />
              </Field>
              <Field>
                <Label>{b('currency_label')}</Label>
                <Input readOnly value="" placeholder={b('currency_placeholder')} maxLength={3} />
              </Field>
              <CheckboxField>
                <Checkbox />
                <Label>{b('confirm_on_add')}</Label>
              </CheckboxField>
              <div className="flex justify-end">
                <Button disabled>{b('add')}</Button>
              </div>
            </Fieldset>
          </div>
        </section>
      </div>
    </div>
  )
}

export function PartnerRecognitionFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={partnersCopy[locale].help.alt.recognition}
      bleed
      wide
      zoomable={locale}
      art={
        <AppScreen clipHeight={PARTNER_CLIP_HEIGHT}>
          {/* The partner page has no padding of its own (the app's content
              panel pads it): cut 32px above, 16px at the sides. */}
          <div className="px-4 py-8">
            <PartnerPage locale={locale} />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── How a name finds its partner (a diagram, not an app screen) ─────────────

export function PartnerRecognitionFlowFigure({ locale, children }: FigureProps) {
  const c = partnersCopy[locale]
  const ui = c.ui
  const f = c.help.flow
  return (
    <Figure
      alt={c.help.alt.flow}
      art={
        <StepList
          steps={[
            { title: f.taxId, detail: f.taxIdDetail },
            {
              title: f.names,
              detail: f.namesDetail,
              outcomes: [{ kind: 'text', label: ui['master_data.partners.alternative_names.badgeAuto'] }],
            },
            { title: f.patterns, detail: f.patternsDetail },
            {
              title: f.account,
              detail: f.accountDetail,
              outcomes: [{ kind: 'text', label: ui['transactions.detail.chip_own_entity'] }],
            },
            { title: f.matches, detail: f.matchesDetail },
          ]}
          footnote={{ text: f.footnote, outcomes: [{ kind: 'pill', tone: 'zinc', label: ui['invoices.labels.unverified'] }] }}
        />
      }
    >
      {children}
    </Figure>
  )
}
