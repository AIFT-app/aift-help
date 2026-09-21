// A "one state, several outcomes" diagram: a start state on the left, a trunk,
// and one branch per action (action → resulting state → what happens next).
// A branch that returns to the start state says so with a ↩ and the start
// pill instead of a curved arrow, which stays readable when the labels are
// translated and when the diagram stacks on a phone.
//
// Built from HTML, not SVG: SVG text does not wrap, and German labels are
// routinely 40% longer than English ones.

import clsx from 'clsx'
import { ArrowUturnLeftIcon } from '@heroicons/react/16/solid'
import { Button } from '@/components/catalyst/button'
import { Pill, type Tone } from './kit'

export type FlowState = { label: string; tone: Tone }

export type FlowBranch = {
  action: string
  actionKind?: 'emerald' | 'outline' | 'plain'
  result: FlowState | { label: string }
  next: string
  /** A final state reached after `next` (e.g. Paid). */
  end?: FlowState
  /** The branch comes back to the start state. */
  loops?: boolean
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 12" className={clsx('h-3 w-6 shrink-0 text-zinc-400', className)} fill="none" aria-hidden="true">
      <path d="M1 6h20m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** The app's real Catalyst buttons, sized like the approval queue's row actions. */
function ActionButton({ kind, children }: { kind: 'emerald' | 'outline' | 'plain'; children: React.ReactNode }) {
  if (kind === 'emerald') return <Button color="emerald" className="!px-2.5 !py-1 !text-xs">{children}</Button>
  if (kind === 'plain') return <Button plain className="!px-2 !py-1 !text-xs">{children}</Button>
  return <Button outline className="!px-2.5 !py-1 !text-xs">{children}</Button>
}

function Result({ result }: { result: FlowBranch['result'] }) {
  if ('tone' in result) return <Pill tone={result.tone} size="md">{result.label}</Pill>
  return (
    <span className="rounded-md border border-dashed border-zinc-300 bg-white px-2 py-0.5 text-xs font-medium text-zinc-700">
      {result.label}
    </span>
  )
}

function BackTo({ start, backTo }: { start: FlowState; backTo: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
      <ArrowUturnLeftIcon className="size-3.5 text-zinc-500" aria-hidden="true" />
      <span>{backTo}</span>
      <Pill tone={start.tone}>{start.label}</Pill>
    </span>
  )
}

export function StateFlow({
  start,
  branches,
  backTo,
  footnote,
}: {
  start: FlowState
  branches: FlowBranch[]
  /** Words in front of the start pill on a looping branch ("back to"). */
  backTo: string
  /** A transition that is not one of the actions, shown under the diagram. */
  footnote?: string
}) {
  return (
    <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
      <div className="flex flex-col gap-4 @xl:grid @xl:grid-cols-[auto_1.5rem_1fr] @xl:items-center @xl:gap-0">
        <div className="flex justify-start @xl:justify-center">
          <span className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-200">
            <Pill tone={start.tone} size="md">{start.label}</Pill>
          </span>
        </div>
        {/* stub from the start state to the trunk */}
        <div className="hidden h-0.5 bg-zinc-300 @xl:block" />
        <ul className="flex flex-col gap-3">
          {branches.map((b) => (
            <li
              key={b.action}
              className={clsx(
                'relative rounded-lg border border-zinc-200 bg-zinc-50/60 p-3',
                // trunk + stub on wide layouts
                '@xl:ml-5 @xl:before:absolute @xl:before:top-1/2 @xl:before:-left-5 @xl:before:h-0.5 @xl:before:w-5 @xl:before:bg-zinc-300',
                '@xl:after:absolute @xl:after:-top-1.5 @xl:after:-bottom-1.5 @xl:after:-left-5 @xl:after:w-0.5 @xl:after:bg-zinc-300',
                '@xl:first:after:top-1/2 @xl:last:after:bottom-1/2',
              )}
            >
              {/* Line 1: the button and where it lands. Line 2: what happens
                  next. Two fixed lines wrap predictably in every language. */}
              <div className="flex flex-wrap items-center gap-2">
                <ActionButton kind={b.actionKind ?? 'outline'}>{b.action}</ActionButton>
                <Arrow />
                <Result result={b.result} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-zinc-200/70 pt-2">
                <span className="text-xs text-zinc-600">{b.next}</span>
                {b.end ? (
                  <>
                    <Arrow />
                    <Pill tone={b.end.tone} size="md">{b.end.label}</Pill>
                  </>
                ) : null}
                {b.loops ? <BackTo start={start} backTo={backTo} /> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {footnote ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-dashed border-zinc-300 px-3 py-2">
          <span className="text-xs text-zinc-600">{footnote}</span>
          <BackTo start={start} backTo={backTo} />
        </div>
      ) : null}
    </div>
  )
}
