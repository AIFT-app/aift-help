// The Closing period page: the To do card beside the Closing status card.
//
// Rebuilt 1:1 from aift-web (feat/closing-ux-rework-2 @ eb092fa9, 2026-10-14),
// class for class:
//   src/app/(app)/workspaces/[workspaceId]/closing/[period]/page.tsx  (header, the two columns)
//   src/app/(app)/workspaces/[workspaceId]/closing/_components/ChecksSection.tsx  (To do, Checks)
//   src/app/(app)/workspaces/[workspaceId]/closing/_components/SignOffRail.tsx  (Closing status)
//
// WHY THIS SCREEN
//
//   The article's main claim is the order of the page: what is failing comes
//   first, each with a word for how much it matters, a number with its unit
//   and the finding in a sentence, and the status card says in words why the
//   month cannot close. That is a layout, and a layout is faster seen than
//   read. The screen is at the width of a common laptop window (the page's
//   content is 712 px, the lg two-column layout), cropped below the first rows
//   of the Checks card.
//
// The page has no padding of its own (it sits straight in the app's content
// panel), so the crop keeps the panel's p-6 (catalyst sidebar.tsx below lg) as
// the margin. Everything inside `data-ref-root` is the app's markup, which is
// what help-screen-css-diff compares. The Close period button is disabled, as
// the app renders it while blocking checks are left. Data is fictional.
//
// ⚠️ MARKERS: the cards are not overflow-hidden, so a pin is not clipped, but
// marker 2 and 3 sit in the page margin left of the card, and marker 4 under
// the Open link, where the row is empty. Check them with help-marker-audit in
// all three locales: the row heights change with the language.

import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Heading } from '@/components/catalyst/heading'
import { Text, TextLink } from '@/components/catalyst/text'
import { AppScreen, Figure, Pin } from '../kit'
import { closingCopy, type CheckRow, type TodoRow, type UiKey } from './copy'

const SCREEN_MIN_WIDTH = 760
/** The crop: the header, the To do card, the status card and the first Checks rows. */
const CLIP_HEIGHT = 720

type Ui = Record<UiKey, string>

function TodoItem({ row, ui, annotate }: { row: TodoRow; ui: Ui; annotate: boolean }) {
  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="order-1 w-full text-sm font-medium text-zinc-950 sm:order-2 sm:w-auto dark:text-white">
            {ui[`closing.checks.${row.id}` as UiKey]}
            <span className="text-zinc-600 dark:text-zinc-400">
              {' · '}
              <span className="tabular-nums">{row.count}</span>
            </span>
          </p>
          <span className="order-2 sm:order-1">
            {annotate && <Pin n={2} at="left" cancel="" />}
            <Badge color={row.blocker ? 'red' : 'amber'}>
              {row.blocker ? ui['closing.severity_blocker'] : ui['closing.severity_advisory']}
            </Badge>
          </span>
        </div>
        {row.lines.map((line, i) => (
          <p key={i} className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {annotate && i === 0 && <Pin n={3} at="left" cancel="" />}
            {line}
          </p>
        ))}
      </div>
      <a
        href="#"
        className="whitespace-nowrap text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400"
      >
        {annotate && <Pin n={4} at="below" cancel="" />}
        {ui['closing.check_open']}
      </a>
    </li>
  )
}

function CheckItem({ row, ui }: { row: CheckRow; ui: Ui }) {
  const na = Boolean(row.naReason)
  return (
    <li className="flex items-start gap-3 px-4 py-2">
      <div className="min-w-0 flex-1 text-sm">
        <p>
          <span className="text-zinc-600 dark:text-zinc-400">
            {ui[`closing.groups.${row.group}` as UiKey]}
            {' · '}
          </span>
          <span className={na ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-950 dark:text-white'}>
            {ui[`closing.checks.${row.id}` as UiKey]}
          </span>
          {row.fact && (
            <span className="text-zinc-600 dark:text-zinc-400">
              {' · '}
              {row.fact}
            </span>
          )}
        </p>
        {na && (
          <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">
            <span className="sm:hidden">
              {ui['closing.not_applicable']}
              {' · '}
            </span>
            {row.naReason}
          </p>
        )}
      </div>
      <span className="flex-none text-sm">
        {na ? (
          <span className="hidden text-zinc-600 sm:inline dark:text-zinc-400">{ui['closing.not_applicable']}</span>
        ) : (
          <>
            <span aria-hidden className="font-bold text-emerald-700 dark:text-emerald-400">
              {'✓'}
            </span>
            <span className="sr-only">{ui['closing.check_ok']}</span>
          </>
        )}
      </span>
    </li>
  )
}

function ClosingPeriodScreen({ locale }: { locale: Locale }) {
  const c = closingCopy[locale]
  const ui = c.ui
  const r = c.rendered
  return (
    <div className="bg-white p-6">
      <div data-ref-root className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Text className="text-xs">
              <TextLink href="#">{ui['closing.title']}</TextLink>
            </Text>
            <Heading className="flex items-center gap-2.5">
              {r.period}
              <Badge color="zinc">{ui['closing.status_open']}</Badge>
            </Heading>
            <Text className="mt-0.5 text-sm">{r.subtitle}</Text>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="order-2 min-w-0 flex-[1.9] space-y-4 lg:order-1">
            <div className="space-y-4">
              <section aria-labelledby="closing-todo" className="rounded-xl border border-zinc-950/10 dark:border-white/10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-zinc-950/5 px-4 py-3 dark:border-white/5">
                  <h2 id="closing-todo" className="text-sm font-semibold text-zinc-950 dark:text-white">
                    {ui['closing.todo_title']}
                    <Pin n={1} at="right" cancel="" />
                  </h2>
                  <span className="text-xs tabular-nums text-zinc-600 dark:text-zinc-400">{r.todoTally}</span>
                </div>
                <ul className="divide-y divide-zinc-950/5 dark:divide-white/5">
                  {r.todo.map((row, i) => (
                    // Markers 2 to 4 sit on the second row: it has the unit and two finding lines.
                    <TodoItem key={row.id} row={row} ui={ui} annotate={i === 1} />
                  ))}
                </ul>
              </section>

              <section aria-labelledby="closing-checks" className="rounded-xl border border-zinc-950/10 dark:border-white/10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-zinc-950/5 px-4 py-3 dark:border-white/5">
                  <h2 id="closing-checks" className="text-sm font-semibold text-zinc-950 dark:text-white">
                    {ui['closing.checks_title']}
                  </h2>
                  <span className="text-xs tabular-nums text-zinc-600 dark:text-zinc-400">{r.checksTally}</span>
                </div>
                <ul className="divide-y divide-zinc-950/5 dark:divide-white/5">
                  {r.checks.map((row) => (
                    <CheckItem key={row.id} row={row} ui={ui} />
                  ))}
                </ul>
              </section>
            </div>
          </div>
          <div className="order-1 w-full flex-1 space-y-4 lg:sticky lg:top-6 lg:order-2 lg:max-w-sm">
            <div className="rounded-xl border border-zinc-950/10 dark:border-white/10">
              <div className="border-b border-zinc-950/5 px-4 py-3 dark:border-white/5">
                <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">{ui['closing.signoff_title']}</h4>
              </div>
              <div className="space-y-1.5 px-4 py-3 text-sm">
                <p className="pb-1 text-base font-semibold text-zinc-950 dark:text-white">
                  {ui['closing.signoff_not_ready']}
                  <Pin n={5} at="right" cancel="" />
                </p>
                <div className="flex justify-between gap-2">
                  <span className="text-zinc-600 dark:text-zinc-300">{ui['closing.signoff_auto']}</span>
                  <span className="font-semibold tabular-nums">{r.rail.auto}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-zinc-600 dark:text-zinc-300">{ui['closing.signoff_blockers']}</span>
                  <span className="font-semibold tabular-nums text-red-700 dark:text-red-400">{r.rail.blockers}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-zinc-600 dark:text-zinc-300">{ui['closing.signoff_advisories']}</span>
                  <span className="font-semibold tabular-nums text-amber-700 dark:text-amber-400">{r.rail.advisories}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-zinc-600 dark:text-zinc-300">{ui['closing.signoff_manual']}</span>
                  <span className="font-semibold tabular-nums">{r.rail.manual}</span>
                </div>
                <div className="pt-2">
                  <Button className="w-full" disabled>
                    {ui['closing.close_cta']}
                  </Button>
                </div>
                <p className="pt-1 text-sm text-zinc-600 dark:text-zinc-400">{r.rail.left}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ClosingPeriodFigure({ locale, children }: { locale: Locale; children?: React.ReactNode }) {
  return (
    <Figure
      alt={closingCopy[locale].help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH} clipHeight={CLIP_HEIGHT}>
          <ClosingPeriodScreen locale={locale} />
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
