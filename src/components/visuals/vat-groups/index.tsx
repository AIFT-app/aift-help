// The step strip and tab bar at the top of a VAT group page, for the
// vat-groups article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-23), class for class:
//   GroupStepStrip  src/app/(app)/workspaces/[workspaceId]/master-data/
//                   vat-groups/[groupId]/_components/GroupStepStrip.tsx
//   the tab <nav>   .../vat-groups/[groupId]/page.tsx
// It is the page's orientation device: it says which of the three steps is
// finished and what is left in each, which is the one thing prose keeps
// having to restate. Labels come from ./copy.ts; the group is fictional.
//
// The links are rendered as spans: nothing inside a figure may be focusable.

import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { CheckIcon } from '@heroicons/react/16/solid'
import { AppScreen, Figure } from '../kit'
import { FIXTURE, vatGroupsCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// Below the narrowest desktop article column (783px at a 1280px window), so
// the screen renders at 100% on every desktop: 1 CSS px is 1 px, as the house
// rule requires. On a phone the screen lays out at this width and zooms down,
// and Enlarge opens it here at 100%.
const SCREEN_MIN_WIDTH = 760

export function VatGroupStepsFigure({ locale, children }: FigureProps) {
  const c = vatGroupsCopy[locale]
  const k = (name: string) => c.ui[`master_data.vat_groups.${name}` as keyof typeof c.ui]
  const r = c.rendered

  const tabs = [
    { key: 'connection', waiting: 0, active: false },
    { key: 'members', waiting: FIXTURE.members.unlinked, active: true },
    { key: 'routing', waiting: FIXTURE.routing.decisions, active: false },
  ] as const

  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          {/* Cropped at the page's own content padding, below the group header. */}
          <div className="bg-white px-4 pt-1 pb-4">
            <ol
              aria-label={k('steps_label')}
              className="mt-5 grid grid-cols-1 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 sm:grid-cols-3 dark:border-zinc-700 dark:bg-zinc-800/50"
              data-testid="vat-group-steps"
            >
              <Step n={1} done title={k('tab_connection')}>
                <Line>{k('step_connection_syncing')}</Line>
                <Line>{r.lastSync}</Line>
              </Step>

              <Step n={2} done={false} title={k('tab_members')}>
                <Line>{r.membersSummary}</Line>
                <Line warn>{r.membersWaiting}</Line>
              </Step>

              <Step n={3} done={false} title={k('tab_routing')}>
                <Line>{r.routingInvoices}</Line>
                <Line warn>{r.routingWaiting}</Line>
              </Step>
            </ol>

            <nav className="mt-6 flex flex-wrap gap-6 border-b border-zinc-200 dark:border-zinc-700">
              {tabs.map((tb) => (
                <span
                  key={tb.key}
                  data-testid={`vat-group-tab-${tb.key}`}
                  className={
                    '-mb-px border-b-2 px-0.5 pb-3 text-sm font-medium transition-colors ' +
                    (tb.active
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-zinc-500 dark:text-zinc-400')
                  }
                >
                  {k(`tab_${tb.key}`)}
                  {tb.waiting > 0 && (
                    <Badge color="amber" className="ml-1.5">
                      {tb.waiting}
                    </Badge>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

function Step({
  n,
  done,
  title,
  children,
}: {
  n: number
  done: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <li
      className="flex items-start gap-3 border-b border-zinc-200 px-4 py-3 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 dark:border-zinc-700"
      data-testid={`vat-group-step-${n}`}
      data-done={done}
    >
      <span
        className={
          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ' +
          (done
            ? 'bg-green-600 text-white dark:bg-green-500'
            : 'border border-amber-500 text-amber-700 dark:text-amber-400')
        }
      >
        {done ? <CheckIcon className="size-3.5" /> : n}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-semibold text-zinc-950 dark:text-white">{title}</span>
        {children}
      </div>
    </li>
  )
}

function Line({ warn, children }: { warn?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={
        'text-xs ' + (warn ? 'text-amber-700 dark:text-amber-400' : 'text-zinc-500 dark:text-zinc-400')
      }
    >
      {children}
    </span>
  )
}
