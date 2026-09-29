// The app's monospace face, for IDs inside rebuilt app screens. aift-web loads
// Geist Mono the same way (src/app/layout.tsx) and maps `font-mono` to it.
// Declared here rather than in the help layout so only pages with app screens
// pay for it.
import { Geist, Geist_Mono } from 'next/font/google'

export const appMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

// The app's text face. aift-web maps `--font-sans: var(--font-geist-sans)` and
// Tailwind's preflight puts it on <html>, so every screen's text is Geist
// (`.app-screen` in globals.css). Until 2026-09-29 the app's body was Arial and
// only elements carrying `font-sans` (the keyboard hints under the spreadsheet
// grid, for one) were Geist; PRD app-typeface-geist removed that override.
// Without this font the CSS diff reports
// `fontFamily: app=Geist, "Geist Fallback" help=Inter, ...`.
export const appSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
