// Mission control: the top of the page, and where a row goes.
//
// MissionControlTopFigure is an app screen, rebuilt 1:1 from aift-web
// (origin/main, 2026-10-26), class for class:
//   src/app/(app)/mission-control/_components/MissionControlClient.tsx
//   (the header, the overview banner, KpiTile, the filter tray)
//
// WHY ONLY THE TOP
//
//   The page's queue below the filters is a fixed-track table (min-w 720px,
//   the action column alone is 232px). At the help column's width (768px of
//   content) the item column is about 140px, so every row's description is cut
//   off, exactly as the app shows it in a window that narrow. A figure whose
//   rows read "VAT…" teaches nothing, and zooming a desktop screen to fit is
//   what made earlier figures look wrong. So the screen stops under the
//   filters, and the rules that decide which section a row lands in are a
//   diagram instead (MissionControlRulesFigure), which is what the reader
//   actually needs from the queue (Tamás, 2026-10-26).
//
// The page sits straight in the app's content panel, so the crop keeps the
// panel's p-6 as the margin. Everything inside `data-ref-root` is the app's
// markup, which is what help-screen-css-diff compares. The selected type pill
// is "All", as on a fresh page; no tile is selected. Data is fictional.
//
// ⚠️ MARKERS: 1 sits in the page margin left of the banner, 2 and 3 to the
// right of a tile's number, 4 and 5 above the filter tray. The tiles' label
// lines wrap differently per language, so check them with help-marker-audit
// in all three locales.

import clsx from 'clsx'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Heading } from '@/components/catalyst/heading'
import { Input, InputGroup } from '@/components/catalyst/input'
import { Select } from '@/components/catalyst/select'
import { AppScreen, Figure, Pin } from '../kit'
import { missionControlCopy, type Tile } from './copy'

const SCREEN_MIN_WIDTH = 760
/** The help centre's recurring fictional clients (feedback: help visuals use fictional names). */
const CLIENTS = ['Quillmoor Kft.', 'Reamwell Kft.', 'Slatebridge Kft.']

function KpiTile({ tile, pin }: { tile: Tile; pin?: number }) {
  const num =
    tile.tone === 'amber'
      ? 'text-amber-600 dark:text-amber-400'
      : tile.tone === 'blue'
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-zinc-700 dark:text-zinc-300'
  return (
    <a
      href="#"
      className={clsx(
        'flex min-h-27 cursor-pointer flex-col rounded-xl border p-4 text-left transition hover:shadow-sm',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600',
      )}
    >
      <span className="min-h-7.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {tile.label}
      </span>
      <span className={clsx('mt-auto text-2xl font-semibold tabular-nums', num)}>
        {tile.value}
        {pin && <Pin n={pin} at="right" cancel="" />}
      </span>
      <span className="mt-0.5 min-h-4 text-[11.5px] text-zinc-500 dark:text-zinc-400">{tile.sub}</span>
    </a>
  )
}

function MissionControlTopScreen({ locale }: { locale: Locale }) {
  const s = missionControlCopy[locale].screen
  return (
    <div className="bg-white p-6">
      <div data-ref-root className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Heading>{s.title}</Heading>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{s.subtitle}</p>
          </div>
        </div>

        <p className="mt-5 rounded-xl border border-zinc-100 bg-zinc-50 px-5 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300">
          <Pin n={1} at="left" cancel="" />
          {s.banner}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {s.tiles.map((tile, i) => (
            <KpiTile key={tile.label} tile={tile} pin={i === 0 ? 2 : i === 1 ? 3 : undefined} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
          <Pin n={4} at="above" cancel="-mr-2" />
          <div className="inline-flex flex-wrap items-center gap-0.5 rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-700 dark:bg-zinc-900">
            {s.pills.map((p, i) => (
              <button
                key={p}
                type="button"
                className={clsx(
                  'rounded-md px-2.5 py-1 text-xs font-medium',
                  i === 0
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200'
                    : 'text-zinc-600 hover:bg-zinc-950/5 dark:text-zinc-400 dark:hover:bg-white/5',
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <Pin n={5} at="above" cancel="-mr-2" />
          <Select defaultValue="" className="max-w-52" aria-label={s.allClients}>
            <option value="">{s.allClients}</option>
            {/* The clients that have rows, sorted by name (fictional). */}
            {CLIENTS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          <div className="min-w-48 max-w-80 flex-1">
            <InputGroup>
              <MagnifyingGlassIcon data-slot="icon" />
              <Input type="search" readOnly value="" placeholder={s.search} aria-label={s.search} />
            </InputGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

type FigureProps = { locale: Locale; children?: React.ReactNode }

export function MissionControlTopFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={missionControlCopy[locale].alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          <MissionControlTopScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── Where a row goes ────────────────────────────────────────────────────────
//
// Not an app screen: the rules live in get_mission_control (SQL), and the page
// never states them. The two section titles are the app's own labels; the
// amber/zinc tones are the page's (amber = needs a human today, zinc = can
// wait), so the diagram reads like the page it explains.

function Column({ title, rows, tone }: { title: string; rows: string[]; tone: 'amber' | 'zinc' }) {
  return (
    <div
      className={clsx(
        'flex-1 rounded-lg border p-3',
        tone === 'amber' ? 'border-amber-200 bg-amber-50/60' : 'border-zinc-200 bg-zinc-50/60',
      )}
    >
      <p className={clsx('text-sm font-semibold', tone === 'amber' ? 'text-amber-800' : 'text-zinc-700')}>{title}</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {rows.map((r) => (
          <li key={r} className="flex items-start gap-2 text-xs text-zinc-700">
            <span
              aria-hidden="true"
              className={clsx('mt-1.5 size-1.5 shrink-0 rounded-full', tone === 'amber' ? 'bg-amber-400' : 'bg-zinc-400')}
            />
            <span className="flex-1">{r}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MissionControlRulesFigure({ locale, children }: FigureProps) {
  const r = missionControlCopy[locale].rules
  return (
    <Figure
      alt={r.alt}
      art={
        <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
          <div className="flex flex-col gap-3 @xl:flex-row">
            <Column title={r.today} rows={r.todayRows} tone="amber" />
            <Column title={r.later} rows={r.laterRows} tone="zinc" />
          </div>
          <p className="mt-4 rounded-lg border border-dashed border-zinc-300 px-3 py-2 text-xs text-zinc-600">{r.order}</p>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
