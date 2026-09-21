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
// Server components except ScaledStage and ZoomFigure. The screens are
// `inert`, so the real Catalyst buttons, checkboxes and switches inside them
// are never focusable.

import clsx from 'clsx'
import { ui, type Locale } from '@/lib/i18n'
import { appMono } from './fonts'
import { ScaledStage } from './ScaledStage'
import { ZoomFigure } from './ZoomFigure'

/** Below this figure width a screen is zoomed down (see AppScreen). */
const SCREEN_MIN_WIDTH = 640

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
  wide = false,
  zoomable,
}: {
  alt: string
  children?: React.ReactNode
  art: React.ReactNode
  /** Drop the grey backdrop, for art that brings its own frame. */
  bleed?: boolean
  /**
   * Extend the art into the article column's side padding (ArticleLayout:
   * px-6 / sm:px-10), so an app screen shown at 100% gets the most width the
   * page has without overlapping the table of contents. The caption stays on
   * the text column.
   */
  wide?: boolean
  /**
   * For app screens: on phones, where the screen is zoomed down, an "Enlarge"
   * control opens it full screen at 100% (ZoomFigure). Pass the page locale
   * for the control's labels.
   */
  zoomable?: Locale
}) {
  return (
    <figure className="not-prose my-8 @container">
      <div
        className={clsx(
          'relative overflow-hidden rounded-2xl',
          bleed ? '' : 'bg-zinc-100/70 p-2 ring-1 ring-zinc-950/5 sm:p-4',
          wide && '-mx-6 sm:-mx-10',
        )}
      >
        <div role="img" aria-label={alt}>
          {art}
        </div>
        {zoomable ? (
          <ZoomFigure alt={alt} enlarge={ui[zoomable].enlarge} close={ui[zoomable].enlargeClose} width={SCREEN_MIN_WIDTH}>
            {art}
          </ZoomFigure>
        ) : null}
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
 * A part of an app page, like a tightly cropped screenshot, at 100% scale.
 * The crop edge is the inner edge of the app's white content panel
 * (aift-web SidebarLayout), so everything inside, including the page's own
 * layout padding (e.g. approvals/layout.tsx `px-4 py-8`), is the app's markup
 * and the app's numbers. The screen is `inert` and scopes the app's fonts and
 * inherited text styles (.app-screen in globals.css).
 *
 * `minWidth`: below this figure width (phones) the screen is laid out at
 * `minWidth` and zoomed to fit instead of reflowing into a phone layout, and a
 * `zoomable` Figure offers it full screen at 100%. Inside the screen `sm:`
 * always applies (globals.css), so a phone shows the desktop screen.
 */
export function AppScreen({
  minWidth = SCREEN_MIN_WIDTH,
  clipHeight,
  overlay,
  children,
}: {
  minWidth?: number
  /** Crop the screen to this height (px at 100%), like a partial screenshot. */
  clipHeight?: number
  /** Drawn over the whole screen, e.g. a modal dialog with its backdrop. */
  overlay?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      inert
      className={clsx('app-screen overflow-hidden rounded-xl bg-white antialiased ring-1 ring-zinc-950/10', appMono.variable)}
    >
      <ScaledStage minWidth={minWidth}>
        <div className="relative overflow-hidden" style={clipHeight ? { height: clipHeight } : undefined}>
          {children}
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
 * the marker floating outside the text line (left, right, above or below it).
 * `cancel` is the negative margin matching the parent's gap, e.g. "-mr-1.5".
 */
export function Pin({ n, at = 'above', cancel }: { n: number; at?: 'left' | 'right' | 'above' | 'below'; cancel: string }) {
  return (
    <span aria-hidden="true" className={clsx('relative w-0 shrink-0 self-stretch', cancel)}>
      <Marker
        n={n}
        className={clsx(
          'absolute',
          at === 'left' && 'top-1/2 -left-7 -translate-y-1/2',
          at === 'right' && 'top-1/2 left-2 -translate-y-1/2',
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
