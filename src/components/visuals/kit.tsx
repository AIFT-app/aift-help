// Building blocks for app screens and diagrams in help articles.
//
// App screens are REBUILT 1:1 from aift-web, not drawn: they render the same
// Catalyst components (src/components/catalyst, a byte-identical mirror of the
// app's, verified by the manifest) and copy the app's own markup class for
// class, in the app's fonts (see .app-screen in globals.css). Each screen file
// names the aift-web source it mirrors; when that source changes, re-copy.
// They are coded rather than screenshots so they translate with the article,
// never show customer data, and change in a text diff. Data is fictional.
//
// Server components except ScaledStage; the screens are `inert`, so the real
// Catalyst buttons, checkboxes and switches inside them are never focusable.

import clsx from 'clsx'
import { appMono } from './fonts'
import { ScaledStage } from './ScaledStage'

// ── Figure ──────────────────────────────────────────────────────────────────

/**
 * A framed illustration with a caption. `alt` is what a screen reader hears
 * instead of the picture (`role="img"`). `children` is the visible caption,
 * written in the article's MDX so it is translated and searchable.
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
        className={clsx('overflow-hidden rounded-2xl', bleed ? '' : 'bg-zinc-100/70 p-2 ring-1 ring-zinc-950/5 sm:p-4')}
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

// ── App screens ─────────────────────────────────────────────────────────────

/**
 * The app's page at a real window size: the zinc ground and the white content
 * panel of aift-web's SidebarLayout (src/components/catalyst/sidebar.tsx, the
 * `<main>` panel), laid out at `width` px and zoomed to fit the article.
 * 836 = the panel at a 1100px browser window (1100 - 256 sidebar - 8 gutter).
 */
export function AppScreen({
  width = 836,
  clipHeight,
  overlay,
  children,
}: {
  width?: number
  /** Crop the screen to this height (px, before zoom), like a partial screenshot. */
  clipHeight?: number
  /** Drawn over the whole screen, e.g. a modal dialog with its backdrop. */
  overlay?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      inert
      className={clsx('app-screen overflow-hidden rounded-xl bg-zinc-100 antialiased ring-1 ring-zinc-950/10', appMono.variable)}
    >
      <ScaledStage width={width}>
        <div className="relative overflow-hidden p-2" style={clipHeight ? { height: clipHeight } : undefined}>
          {/* The app's DESKTOP panel classes without their `lg:` prefix: the screen is
              always shown as the app looks at desktop size, whatever the reader's
              window. (Catalyst's own `sm:` text sizes still follow the viewport, so
              on a phone the text inside is a touch larger than in the app.) */}
          <div className="grow rounded-2xl bg-white p-10 shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
            {children}
          </div>
          {overlay}
        </div>
      </ScaledStage>
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
        'inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-violet-600 font-sans text-[10px] font-bold text-white shadow-sm ring-2 ring-white',
        className,
      )}
    >
      {n}
    </span>
  )
}

/**
 * A marker pinned to the next element WITHOUT changing the app's layout: a
 * zero-width flex item whose negative margin cancels the container's gap, with
 * the marker floating outside the text line (left, above or below it).
 * `cancel` is the negative margin matching the parent's gap, e.g. "-mr-1.5".
 */
export function Pin({ n, at = 'above', cancel }: { n: number; at?: 'left' | 'above' | 'below'; cancel: string }) {
  return (
    <span aria-hidden="true" className={clsx('relative w-0 shrink-0 self-stretch', cancel)}>
      <Marker
        n={n}
        className={clsx(
          'absolute',
          at === 'left' && 'top-1/2 -left-7 -translate-y-1/2',
          at === 'above' && 'bottom-full left-0 mb-px -translate-x-1/2',
          at === 'below' && 'top-full left-0 mt-px -translate-x-1/2',
        )}
      />
    </span>
  )
}

// ── The app's label pill ────────────────────────────────────────────────────

export type Tone = 'amber' | 'emerald' | 'blue' | 'zinc'

// aift-web src/components/list-view/label-tones.ts LABEL_TONE_CLASSES, verbatim.
const TONE: Record<Tone, string> = {
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
  emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  zinc: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
}

/** aift-web src/components/approvals/ApprovalStatePill.tsx markup. */
export function Pill({ tone, children, size = 'sm' }: { tone: Tone; children: React.ReactNode; size?: 'sm' | 'md' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
        TONE[tone],
      )}
    >
      {children}
    </span>
  )
}
