// Which language wins, for the language article.
//
// A diagram, not an app screen: the order lives in code
// (src/i18n/pre-auth-locale.ts), never on one screen, so there is nothing to
// rebuild 1:1. StepList is the house shape for an ordered fallback chain.
//
// WHY THIS FIGURE
//
//   The article explains the chain twice and in two places — the signed-out
//   order in one section, the browser-beats-your-account rule in another — and
//   a reader hitting "the app is not in the language I saved" has to join them
//   up. The ladder is the join: the browser's copy is simply the first rung.

import type { Locale } from '@/lib/i18n'
import { Figure } from '../kit'
import { StepList } from '../StepList'
import { languageCopy } from './copy'

export function LanguageLadderFigure({ locale, children }: { locale: Locale; children?: React.ReactNode }) {
  const c = languageCopy[locale]
  return (
    <Figure
      alt={c.alt}
      art={<StepList steps={c.steps.map((s) => ({ title: s.title, detail: s.detail }))} footnote={{ text: c.footnote }} />}
    >
      {children}
    </Figure>
  )
}
