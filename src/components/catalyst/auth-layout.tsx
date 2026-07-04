import type React from 'react'
import { LanguagePicker } from '@/components/shared/LanguagePicker'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col bg-white p-2 dark:bg-zinc-950">
      <div className="relative flex grow items-start justify-center overflow-y-auto rounded-2xl p-6 pt-[12vh] lg:p-10 lg:pt-[14vh] dark:bg-zinc-950">
        {/* Animated background haze. overflow-hidden clips the blobs to the
            card's bounds — they bleed past the edges (e.g. haze-blob-2 sits at
            bottom:-160/right:-140) and, left unclipped, that bleed becomes
            scrollable overflow in the overflow-y-auto parent, producing a
            phantom scrollbar even when the card fits. Clipping it removes the
            scroll without changing the at-rest visual. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* violet → indigo, top-left */}
          <div
            className="haze-blob haze-blob-1"
            style={{
              width: 620,
              height: 620,
              top: -200,
              left: -180,
              background: 'radial-gradient(circle, rgba(139,92,246,0.26) 0%, rgba(99,102,241,0.16) 50%, transparent 72%)',
            }}
          />
          {/* pink → purple, bottom-right */}
          <div
            className="haze-blob haze-blob-2"
            style={{
              width: 540,
              height: 540,
              bottom: -160,
              right: -140,
              background: 'radial-gradient(circle, rgba(236,72,153,0.22) 0%, rgba(167,139,250,0.14) 50%, transparent 72%)',
            }}
          />
          {/* sky → violet, top-right */}
          <div
            className="haze-blob haze-blob-3"
            style={{
              width: 460,
              height: 460,
              top: -100,
              right: -100,
              background: 'radial-gradient(circle, rgba(56,189,248,0.20) 0%, rgba(139,92,246,0.13) 55%, transparent 72%)',
            }}
          />
          {/* peach → pink, bottom-left */}
          <div
            className="haze-blob haze-blob-4"
            style={{
              width: 400,
              height: 400,
              bottom: -80,
              left: -80,
              background: 'radial-gradient(circle, rgba(253,186,116,0.19) 0%, rgba(249,168,212,0.16) 55%, transparent 72%)',
            }}
          />
          {/* soft violet, mid-right */}
          <div
            className="haze-blob haze-blob-5"
            style={{
              width: 320,
              height: 320,
              top: '40%',
              right: '6%',
              background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Glass card */}
        <div className="relative w-full max-w-sm rounded-2xl bg-white/75 px-8 py-10 shadow-2xl ring-1 ring-zinc-950/[0.06] backdrop-blur-xl dark:bg-zinc-900/70 dark:ring-white/10">
          {/* Pre-auth language picker, top-right (PRD: pre-auth-locale). */}
          <div className="mb-6">
            <LanguagePicker />
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}
