// Building blocks for the help centre's coded illustrations.
//
// Why drawings instead of screenshots: they are translated with the article,
// never show customer data, stay sharp at any size, and change in a normal
// text diff when the app changes. The price is fidelity, so every drawing
// quotes the app's real labels (aift-web/messages/<locale>.json) and copies
// its colours and layout, and the data is fictional.
//
// LIGHT ONLY, ON PURPOSE. The help site has no dark theme (the body is always
// white), but Tailwind's `dark:` variant follows the OS setting. The Catalyst
// mirror carries `dark:` classes, so a Catalyst badge would turn dark on a
// white page for anyone whose OS is in dark mode. These primitives therefore
// copy the app's LIGHT styles and never use `dark:`.
//
// Server components only: no state, no handlers, zero client JavaScript.

import clsx from 'clsx'

// ── Figure ──────────────────────────────────────────────────────────────────

/**
 * A framed illustration with a caption. `alt` is what a screen reader hears
 * instead of the drawing (the drawing is `role="img"`, so its fake buttons and
 * labels are not read out one by one). `children` is the visible caption,
 * written in the article's MDX so it is translated and searchable with the
 * rest of the text.
 */
export function Figure({
  alt,
  children,
  art,
  bleed = false,
}: {
  alt: string
  children?: React.ReactNode
  art: React.ReactNode
  /** Drop the grey backdrop, for art that brings its own frame. */
  bleed?: boolean
}) {
  return (
    <figure className="not-prose my-8 @container">
      <div
        role="img"
        aria-label={alt}
        className={clsx(
          'overflow-hidden rounded-2xl',
          bleed ? '' : 'bg-zinc-100/70 p-2 ring-1 ring-zinc-950/5 sm:p-4',
        )}
      >
        {art}
      </div>
      {children ? (
        <figcaption className="mt-3 text-sm/6 text-zinc-500 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-zinc-700">
          {children}
        </figcaption>
      ) : null}
    </figure>
  )
}

// ── App window ──────────────────────────────────────────────────────────────

/** Browser-style window chrome around a drawn app screen. */
export function AppWindow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-950/10', className)}>
      <div className="flex items-center gap-1.5 border-b border-zinc-950/5 bg-zinc-50 px-3 py-2">
        <span className="size-2.5 rounded-full bg-zinc-300" />
        <span className="size-2.5 rounded-full bg-zinc-300" />
        <span className="size-2.5 rounded-full bg-zinc-300" />
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  )
}

// ── Annotation markers ──────────────────────────────────────────────────────

/**
 * A numbered callout. Violet on purpose: the app's own palette uses amber,
 * emerald, blue, zinc and rose for meaning, so an annotation must be a colour
 * the real screen never shows or it reads as part of the UI.
 */
export function Marker({ n, className }: { n: number; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[11px] font-bold text-white shadow-sm ring-2 ring-white',
        className,
      )}
    >
      {n}
    </span>
  )
}

// ── UI pieces (the app's light styles) ─────────────────────────────────────

export type Tone = 'amber' | 'emerald' | 'blue' | 'zinc'

// aift-web src/components/list-view/label-tones.ts, light half.
const TONE: Record<Tone, string> = {
  amber: 'bg-amber-100 text-amber-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  blue: 'bg-blue-100 text-blue-800',
  zinc: 'bg-zinc-100 text-zinc-700',
}

export function Pill({ tone, children, size = 'sm' }: { tone: Tone; children: React.ReactNode; size?: 'sm' | 'md' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium whitespace-nowrap',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
        TONE[tone],
      )}
    >
      {children}
    </span>
  )
}

type ButtonKind = 'emerald' | 'outline' | 'plain' | 'dark'

const BUTTON: Record<ButtonKind, string> = {
  emerald: 'bg-emerald-600 text-white shadow-sm',
  outline: 'bg-white text-zinc-950 ring-1 ring-zinc-950/15',
  plain: 'text-zinc-700',
  dark: 'bg-zinc-900 text-white shadow-sm',
}

/** Looks like a button, is a span: a drawing must not put dead controls in the tab order. */
export function FakeButton({
  kind,
  children,
  small = false,
  disabled = false,
}: {
  kind: ButtonKind
  children: React.ReactNode
  small?: boolean
  disabled?: boolean
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap',
        small ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-2 text-sm',
        BUTTON[kind],
        disabled && 'opacity-50',
      )}
    >
      {children}
    </span>
  )
}

/** The rounded filter chip the app uses above lists (active = filled). */
export function Chip({ active = false, children, count }: { active?: boolean; children: React.ReactNode; count?: number }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap',
        active ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 text-zinc-600',
      )}
    >
      {children}
      {count !== undefined ? <span className="tabular-nums opacity-70">{count}</span> : null}
    </span>
  )
}

export function Checkbox({ checked = false }: { checked?: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex size-4 shrink-0 items-center justify-center rounded border',
        checked ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300 bg-white',
      )}
    >
      {checked ? (
        <svg viewBox="0 0 12 12" className="size-3 text-white" fill="none" aria-hidden="true">
          <path d="M3 6l2 2 4-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </span>
  )
}

/** A dialog panel over a dimmed page, for drawing modal steps. */
export function FakeDialog({ title, children, actions }: { title: string; children: React.ReactNode; actions: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-zinc-950/15 p-3 sm:p-8">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-5 shadow-lg ring-1 ring-zinc-950/10 sm:p-6">
        <p className="text-base/6 font-semibold text-zinc-950">{title}</p>
        <div className="mt-2">{children}</div>
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">{actions}</div>
      </div>
    </div>
  )
}
