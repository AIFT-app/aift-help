// An app screen and a diagram for the setting-up-approvals article.
//
// The screen is rebuilt 1:1 from aift-web (origin/main, 2026-09-21), class for
// class, with the real Catalyst components from the help mirror:
//   the column         src/app/(app)/workspaces/[workspaceId]/settings/layout.tsx
//   Routing section    src/components/settings/SettingsSection.tsx and
//                      SettingsPanel.tsx (variant list), holding, from
//                      settings/approvals/_components/:
//                        RoutingRulesEditor.tsx  (SortableRuleRow, the sentence, Add rule)
//                        NoRuleMatches.tsx + SettingRow.tsx
//                        ApplyRulesButton.tsx
// When one of those files changes, re-copy the markup here. Data comes from
// ./copy.ts and is fictional.

import { Bars3Icon } from '@heroicons/react/16/solid'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Select } from '@/components/catalyst/select'
import { Switch } from '@/components/catalyst/switch'
import { Text } from '@/components/catalyst/text'
import { fill } from '../approvals/copy'
import { formatAmount } from '../format'
import { AppScreen, Figure, Pin } from '../kit'
import { StepList } from '../StepList'
import { approvalSetupCopy, APPROVERS, BASE_CURRENCY, type Rule } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

/** RoutingRulesEditor `sentence()`, for the parts these rules use. */
function sentence(r: Rule, locale: Locale): string {
  const ui = approvalSetupCopy[locale].ui
  const parts = [r.partner ? fill(ui['approvals.settings.sentence_partner'], { partner: r.partner }) : ui['approvals.settings.sentence_any']]
  if (r.category) parts.push(fill(ui['approvals.settings.sentence_category'], { category: r.category }))
  const min = r.amountMin != null ? formatAmount(r.amountMin, BASE_CURRENCY, locale) : null
  const max = r.amountMax != null ? formatAmount(r.amountMax, BASE_CURRENCY, locale) : null
  if (min) parts.push(fill(ui['approvals.settings.sentence_above'], { min }))
  else if (max) parts.push(fill(ui['approvals.settings.sentence_below'], { max }))
  const tail = r.approver
    ? fill(ui['approvals.settings.sentence_go_to'], { name: r.approver })
    : ui['approvals.settings.sentence_no_approval']
  return `${parts.join(' ')} ${tail}`
}

// Which rule row carries which marker.
const HANDLE_MARKER_ROW = 1
const SENTENCE_MARKERS: Record<number, number> = { 0: 2, 2: 3 }

function RuleRow({ rule, index, locale }: { rule: Rule; index: number; locale: Locale }) {
  const marker = SENTENCE_MARKERS[index]
  return (
    <div className="flex items-center gap-3 bg-white px-6 py-4 dark:bg-zinc-900">
      {index === HANDLE_MARKER_ROW ? <Pin n={1} at="above" cancel="-mr-3" /> : null}
      <button
        type="button"
        aria-label={approvalSetupCopy[locale].ui['approvals.settings.reorder_rule']}
        className="shrink-0 cursor-grab touch-none rounded p-1 text-zinc-400 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:cursor-not-allowed dark:hover:text-zinc-200 dark:focus-visible:ring-white"
      >
        <Bars3Icon className="size-4" />
      </button>
      <span className="w-5 shrink-0 tabular-nums text-sm text-zinc-400">{index + 1}</span>
      <button
        type="button"
        className="min-w-0 flex-1 rounded text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-white"
      >
        <span className="block text-sm font-medium text-zinc-950 hover:underline dark:text-white">
          {sentence(rule, locale)}
          {marker ? <Pin n={marker} at="right" cancel="" /> : null}
        </span>
        {rule.note ? <span className="mt-1 block text-sm text-zinc-500 dark:text-zinc-400">{rule.note}</span> : null}
      </button>
    </div>
  )
}

/** SettingRow.tsx */
function SettingRow({ id, label, help, children }: { id: string; label: string; help: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 px-6 py-4">
      <div className="min-w-0">
        <p id={id} className="text-sm font-medium text-zinc-950 dark:text-white">
          {label}
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{help}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

const PANEL_LIST =
  'divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-700'

function RoutingSection({ locale }: { locale: Locale }) {
  const c = approvalSetupCopy[locale]
  const ui = c.ui
  return (
    <section className="mt-10 first:mt-0">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base/7 font-semibold text-zinc-950 dark:text-white">{ui['approvals.settings.section_rules']}</h2>
      </div>
      <Text className="mt-1">{ui['approvals.settings.rules_hint']}</Text>
      <div className="mt-4">
        {/* RoutingRulesEditor */}
        <div>
          <div className={PANEL_LIST}>
            {c.rules.map((r, i) => (
              <RuleRow key={i} rule={r} index={i} locale={locale} />
            ))}
            {/* @dnd-kit's DndContext renders its screen-reader instructions and
                live region here, after the rows (its HiddenText and LiveRegion
                styles), so in the app the last rule keeps its divider too. */}
            <div style={{ display: 'none' }} />
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                margin: -1,
                border: 0,
                padding: 0,
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                clipPath: 'inset(100%)',
                whiteSpace: 'nowrap',
              }}
            />
          </div>
          <div className="mt-3">
            <Button outline>{ui['approvals.settings.add_rule']}</Button>
          </div>
        </div>

        {/* NoRuleMatches */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">
            {ui['approvals.settings.tail_title']}
            <Pin n={4} at="right" cancel="" />
          </h3>
          <div className="mt-2">
            <div className={PANEL_LIST}>
              <SettingRow
                id="default-needs"
                label={ui['approvals.settings.default_needs_label']}
                help={ui['approvals.settings.default_needs_help']}
              >
                <Switch defaultChecked aria-labelledby="default-needs" />
              </SettingRow>
              <SettingRow id="fallback" label={ui['approvals.settings.fallback_label']} help={ui['approvals.settings.fallback_help']}>
                <Select defaultValue="" aria-labelledby="fallback" className="w-56">
                  <option value="">{ui['approvals.settings.fallback_none']}</option>
                  {APPROVERS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </Select>
              </SettingRow>
            </div>
          </div>
        </div>

        {/* ApplyRulesButton */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {ui['approvals.settings.apply_rules_help']}
            <Pin n={5} at="right" cancel="" />
          </p>
          <Button outline>{ui['approvals.settings.apply_rules']}</Button>
        </div>
      </div>
    </section>
  )
}

export function ApprovalRulesFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={approvalSetupCopy[locale].help.alt.rules}
      bleed
      wide
      zoomable={locale}
      art={
        <AppScreen>
          {/* The settings column (settings/layout.tsx: max-w-3xl, no padding of
              its own; the app's content panel pads it). Cut 32px above and
              below the section, 16px at the sides, like the other crops. */}
          <div className="px-4 py-8">
            <div className="mx-auto max-w-3xl">
              <RoutingSection locale={locale} />
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── How an invoice finds its approver (a diagram, not an app screen) ────────

export function RoutingLadderFigure({ locale, children }: FigureProps) {
  const c = approvalSetupCopy[locale]
  const ui = c.ui
  const l = c.help.ladder
  const approver = { kind: 'text', label: ui['approvals.settings.outcome_approver'] } as const
  const noApproval = { kind: 'text', label: ui['approvals.settings.outcome_no_approval'] } as const
  return (
    <Figure
      alt={c.help.alt.ladder}
      art={
        <StepList
          steps={[
            { title: l.rules, detail: l.rulesDetail, outcomes: [approver, noApproval] },
            { title: l.learned, detail: l.learnedDetail, outcomes: [approver, noApproval] },
            { title: l.policy, detail: l.policyDetail, outcomes: [noApproval] },
            { title: l.fallback, detail: l.fallbackDetail, outcomes: [approver] },
            { title: l.ai, detail: l.aiDetail, outcomes: [approver] },
            {
              title: l.needsYou,
              detail: l.needsYouDetail,
              outcomes: [{ kind: 'pill', tone: 'amber', label: ui['approvals.overview.needs_you'] }],
            },
          ]}
          footnote={{ text: l.footnote }}
        />
      }
    >
      {children}
    </Figure>
  )
}
