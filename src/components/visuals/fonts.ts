// The app's two faces. aift-web loads them the same way (src/app/layout.tsx).
// Since 2026-09-30 they are also the help site's own type: layout.tsx sets
// both variables on <html> and globals.css maps font-sans / font-mono to them
// (PRD help-home-and-navigation D1). AppScreen sets them on .app-screen too,
// which is harmless now and keeps a screen right if the site font changes.
//
// The monospace face, for IDs inside rebuilt app screens and for code.
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
