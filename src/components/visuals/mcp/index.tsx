// The MCP consent screen, for the mcp article.
//
// Rebuilt 1:1 from aift-web src/app/mcp/consent/page.tsx (origin/main,
// 2026-09-22), class for class: the page is a server component that needs a
// session and an OAuth client, so it cannot be rendered in a reference page
// the way the other screens are. Its markup is plain Tailwind, no Catalyst,
// so the classes below are copied verbatim and checked against the source by
// scratchpad/check-consent-classes.mjs. Labels come from ./copy.ts.
//
// The page centres the card in the viewport (`min-h-screen`); the figure
// shows the card alone, which is what the reader has to recognise.

import type { Locale } from '@/lib/i18n'
import { AppScreen, Figure, Pin } from '../kit'
import { mcpCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const SCREEN_MIN_WIDTH = 448

function Scope({ label, desc, checked, pin }: { label: string; desc: string; checked: boolean; pin: number }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
      <Pin n={pin} at="left" cancel="" />
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="mt-0.5 size-4 accent-zinc-900 dark:accent-zinc-100"
      />
      <span>
        <span className="block font-medium text-zinc-900 dark:text-zinc-100">{label}</span>
        <span className="mt-0.5 block">{desc}</span>
      </span>
    </label>
  )
}

export function McpConsentFigure({ locale, children }: FigureProps) {
  const c = mcpCopy[locale]
  const ui = c.ui
  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          <div className="bg-white px-6 py-8">
            <div className="mx-auto max-w-md">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">{ui['mcp_consent.title']}</h2>

                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{c.rendered.intro}</p>

                <div className="mt-5 flex flex-col gap-3">
                  <Scope label={ui['mcp_consent.scope_read_label']} desc={ui['mcp_consent.scope_read_desc']} checked pin={1} />
                  <Scope label={ui['mcp_consent.scope_write_label']} desc={ui['mcp_consent.scope_write_desc']} checked={false} pin={2} />

                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{ui['mcp_consent.no_money_movement']}</p>

                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{c.rendered.signedIn}</p>

                  <div className="mt-4 flex flex-col gap-2">
                    {/* Real buttons, as in the app: AppScreen is inert, so
                        nothing here is focusable or clickable. */}
                    <button
                      type="button"
                      className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                    >
                      <Pin n={3} at="left" cancel="" />
                      {ui['mcp_consent.approve']}
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      {ui['mcp_consent.deny']}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
