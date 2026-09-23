// The itinerary on screen 1 of the guided new-client walk, for the workspaces
// article.
//
// Rebuilt 1:1 from aift-web (feat/guided-walk-tax-id-first, 2026-09-24), class for class:
//   StepMap  src/components/onboarding/guided/StepMap.tsx
// The screen list mirrors SCREENS in src/lib/guided-onboarding.ts. This is the
// only place in the app where the whole route is visible at once, and the only
// place that says per screen whether it is required, which is exactly what the
// article needs to replace a page of prose. Labels come from ./copy.ts.

import type { Locale } from '@/lib/i18n'
import { AppScreen, Figure } from '../kit'
import { SCREENS, onboardingCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// The app lays the map out in a 300px grid track, with a left border and a
// 24px gutter inside it (GuidedShell: grid-cols-[minmax(0,1fr)_300px], the
// aside wrapped in `xl:border-l xl:pl-6`). The screen is that track.
const SCREEN_MIN_WIDTH = 300

/** The walk opens on screen 1, so that is the one marked "now". */
const CURRENT_STEP = 1

export function OnboardingStepMapFigure({ locale, children }: FigureProps) {
  const c = onboardingCopy[locale]
  const k = (name: string) => c.ui[`dashboard.guided.${name}` as keyof typeof c.ui]
  const gates = SCREENS.filter((s) => s.gate).length
  const summary = k('map_summary')
    .replace('{required}', String(gates))
    .replace('{optional}', String(SCREENS.length - gates))

  return (
    <Figure
      alt={c.help.alt}
      art={
        <div className="mx-auto w-[300px]">
          <AppScreen minWidth={SCREEN_MIN_WIDTH}>
            {/* The right column of screen 1, cropped at the grid track's edges. */}
            <div className="border-l border-zinc-100 bg-white py-4 pl-6 dark:border-zinc-800">
              <div data-testid="guided-map">
                <p className="text-[12.5px] font-bold tracking-[0.1em] text-indigo-600 uppercase dark:text-indigo-400">
                  {k('map_heading')}
                </p>
                <p className="mt-1.5 text-[14px]/[1.5] text-zinc-500 dark:text-zinc-400">{summary}</p>

                <ol className="mt-2.5">
                  {SCREENS.map((s, i) => {
                    const isNow = s.step === CURRENT_STEP
                    return (
                      <li
                        key={s.step}
                        className="grid grid-cols-[16px_1fr_auto] items-baseline gap-2.5 border-t border-zinc-100 py-[7px] first:border-t-0 dark:border-zinc-800"
                      >
                        <span
                          className={
                            isNow
                              ? 'text-[13px] font-semibold tabular-nums text-indigo-600 dark:text-indigo-400'
                              : 'text-[13px] tabular-nums text-zinc-400 dark:text-zinc-500'
                          }
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[14.5px] font-medium text-zinc-800 dark:text-zinc-200">
                            {k(`map_${s.step}_title`)}
                          </span>
                          <span className="mt-px block text-[13.5px]/[1.45] text-zinc-500 dark:text-zinc-400">
                            {k(`map_${s.step}_note`)}
                          </span>
                        </span>
                        <Chip
                          label={isNow ? k('map_now') : s.gate ? k('map_required') : k('map_skippable')}
                          tone={isNow ? 'now' : s.gate ? 'required' : 'optional'}
                        />
                      </li>
                    )
                  })}
                </ol>

                <p className="mt-4 border-t border-zinc-100 pt-3 text-[13.5px]/[1.5] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  {k('map_footer')}
                </p>
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

function Chip({ label, tone }: { label: string; tone: 'now' | 'required' | 'optional' }) {
  const base = 'shrink-0 rounded-full px-2 py-px text-[12px] font-semibold whitespace-nowrap'
  const skin =
    tone === 'optional'
      ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
      : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
  return <span className={`${base} ${skin}`}>{label}</span>
}
