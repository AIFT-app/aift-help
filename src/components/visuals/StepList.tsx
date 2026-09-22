// A numbered sequence: what happens first, then next. Each step can carry the
// app's own pills or badges as outcomes, so the diagram names states exactly
// the way the screens do. For a mostly linear flow (payment, invoice
// lifecycle) or an ordered fallback chain (approval routing); StateFlow is
// the shape for one state with several outcomes.
//
// Built from HTML, not SVG, so translated labels wrap (German runs ~40%
// longer), and it stacks the same way on a phone. The step numbers are zinc:
// violet belongs to annotation markers on app screens.

import { Badge } from '@/components/catalyst/badge'
import { Pill, type Tone } from './kit'

export type StepOutcome =
  | { kind: 'pill'; tone: Tone; label: string }
  | { kind: 'badge'; color: 'yellow' | 'zinc'; label: string }
  | { kind: 'text'; label: string }

export type Step = { title: string; detail?: string; outcomes?: StepOutcome[] }

function Outcome({ o }: { o: StepOutcome }) {
  if (o.kind === 'text') {
    return (
      <span className="rounded-md border border-dashed border-zinc-300 bg-white px-2 py-0.5 text-xs font-medium text-zinc-700">
        {o.label}
      </span>
    )
  }
  // App elements use the app's fonts, like the app screens.
  return (
    <span className="app-screen contents">
      {o.kind === 'badge' ? (
        <Badge color={o.color}>{o.label}</Badge>
      ) : (
        <Pill tone={o.tone} size="md">
          {o.label}
        </Pill>
      )}
    </span>
  )
}

export function StepList({ steps, footnote }: { steps: Step[]; footnote?: { text: string; outcomes?: StepOutcome[] } }) {
  return (
    <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
      <ol className="flex flex-col gap-3">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span className="mt-2.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold tabular-nums text-white">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-zinc-50/60 px-3 py-2.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                <span className="text-sm font-medium text-zinc-900">{s.title}</span>
                {s.outcomes?.map((o) => <Outcome key={o.label} o={o} />)}
              </div>
              {s.detail ? <p className="mt-1 text-xs text-zinc-600">{s.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>
      {footnote ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 rounded-lg border border-dashed border-zinc-300 px-3 py-2">
          <span className="text-xs text-zinc-600">{footnote.text}</span>
          {footnote.outcomes?.map((o) => <Outcome key={o.label} o={o} />)}
        </div>
      ) : null}
    </div>
  )
}
