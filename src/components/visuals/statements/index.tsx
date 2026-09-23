// The Statements tab, for the bank-statement-upload article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-23), class for class:
//   StatementsTab  src/app/(app)/workspaces/[workspaceId]/transactions/
//                  _components/StatementsTab.tsx
// Four rows carry most of the article: the transactions ratio, page progress,
// the failed-with-no-account row and its Complete import link, and a pending
// row with its three actions. Labels come from ./copy.ts; the statements are
// fictional.
//
// Buttons and links are rendered as spans: nothing inside a figure may be
// focusable.

import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { AppScreen, Figure } from '../kit'
import { ACCOUNTS, FILES, PROGRESS_PCT, statementsCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// Below the narrowest desktop article column (783px at a 1280px window), so
// the screen renders at 100% on every desktop: 1 CSS px is 1 px, as the house
// rule requires. On a phone the screen lays out at this width and zooms down,
// and Enlarge opens it here at 100%.
const SCREEN_MIN_WIDTH = 760

const TH =
  'px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400'
const TH_RIGHT = `${TH} text-right`

export function StatementsTabFigure({ locale, children }: FigureProps) {
  const c = statementsCopy[locale]
  const k = (name: string) => c.ui[`transactions.statements.${name}` as keyof typeof c.ui]
  const r = c.rendered

  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          {/* Cropped at the tab panel's own edge, as on the app's page. */}
          <div className="bg-white p-4">
            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
                  <tr>
                    <th className={TH}>{k('header_file')}</th>
                    <th className={TH}>{k('header_period')}</th>
                    <th className={TH}>{k('header_account')}</th>
                    <th className={TH_RIGHT}>{k('header_transactions')}</th>
                    <th className={TH_RIGHT}>{k('header_duplicates')}</th>
                    <th className={TH}>{k('header_status_actions')}</th>
                    <th className={TH}>{k('header_uploaded')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {/* Completed: the ratio is the whole point of this row. */}
                  <tr className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400">
                        {FILES.completed}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.periodAug}</td>
                    <td className="px-4 py-3">
                      <span className="text-zinc-600 dark:text-zinc-400">{ACCOUNTS.completed}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-700 dark:text-zinc-300">
                      <span>{r.ratio}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-zinc-400">&mdash;</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color="green">{k('status_completed')}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400">
                      {r.uploadedCompleted}
                    </td>
                  </tr>

                  {/* Extracting: page progress replaces the ratio. */}
                  <tr className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400">
                        {FILES.extracting}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">&mdash;</td>
                    <td className="px-4 py-3">
                      <span className="text-zinc-600 dark:text-zinc-400">{ACCOUNTS.extracting}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-700 dark:text-zinc-300">
                      <div className="space-y-1">
                        <div className="text-xs text-zinc-500">{r.pages}</div>
                        <div className="ml-auto h-1.5 w-16 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all"
                            style={{ width: `${PROGRESS_PCT}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-zinc-400">&mdash;</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color="blue">{k('status_extracting')}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400">
                      {r.uploadedExtracting}
                    </td>
                  </tr>

                  {/* Failed with no account: the row the article's recovery section is about. */}
                  <tr className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400">
                        {FILES.failed}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{r.periodJul}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <span className="text-sm" aria-hidden="true">
                          ⚠
                        </span>
                        <span className="text-xs">{r.unmatched}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-700 dark:text-zinc-300">
                      <span>0 / 41</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-zinc-400">&mdash;</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-start gap-1">
                        <Badge color="red">{k('status_failed')}</Badge>
                        <span className="text-xs text-amber-700 dark:text-amber-400">
                          {r.needsAccount}
                        </span>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          {k('complete_import')}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400">
                      {r.uploadedFailed}
                    </td>
                  </tr>

                  {/* Pending and unmatched: the amber row tint is the app's. */}
                  <tr className="bg-amber-50/40 dark:bg-amber-950/10">
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {FILES.pending}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">&mdash;</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <span className="text-sm" aria-hidden="true">
                          ⚠
                        </span>
                        <span className="text-xs">{r.unmatched}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-700 dark:text-zinc-300">
                      <span className="text-zinc-400">&mdash;</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-zinc-400">&mdash;</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            {k('extract')}
                          </span>
                          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            {k('assign_account')}
                          </span>
                          <span className="text-xs font-medium text-red-500 dark:text-red-400">
                            {k('dismiss')}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400">
                      {r.uploadedPending}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
