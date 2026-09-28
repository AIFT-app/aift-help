// Labels for the focus-chip figure, keyed by aift-web message key so a drift
// check can compare them to messages/<locale>.json directly.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28):
//   src/components/focus/FocusScopeChip.tsx
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'focus.basis_on',
  'focus.period_readonly',
  'date_filter.basis_short_delivery',
  'nav.workspace.invoices',
  'nav.workspace.transactions',
] as const

export type UiKey = (typeof UI_KEYS)[number]

/** FocusScopeChip.tsx GLYPH, verbatim. */
export const GLYPH = { diamond: '◆', caret: '▾', star: '★' } as const

type Copy = {
  ui: Record<UiKey, string>
  /**
   * `focusPeriodLabel` for a focused month, which is `formatMonthLong` —
   * Intl `{month:'long', year:'numeric'}` in the locale's BCP-47 tag. Month
   * NAMES stay localized even though dates are ISO everywhere else.
   */
  rendered: { period: string }
  help: { alt: string }
}

const en: Copy = {
  ui: {
    'focus.basis_on': "on",
    'focus.period_readonly': "Set in the sidebar - one period for every page",
    'date_filter.basis_short_delivery': "Fulfillment",
    'nav.workspace.invoices': "Invoices",
    'nav.workspace.transactions': "Bank transactions",
  },
  rendered: { period: "July 2026" },
  help: { alt: "The same date control in its two shapes. On Invoices it is one blue capsule split by a hairline: a flat label reading a diamond and July 2026, then the only clickable part, reading on Fulfillment with a star and a caret. On Bank transactions the capsule holds the label alone, with nothing to click." },
}

const hu: Copy = {
  ui: {
    'focus.basis_on': "ezen:",
    'focus.period_readonly': "Az oldalsávban állítható - egy időszak minden oldalra",
    'date_filter.basis_short_delivery': "Teljesítés",
    'nav.workspace.invoices': "Számlák",
    'nav.workspace.transactions': "Banki tranzakciók",
  },
  rendered: { period: "2026. július" },
  help: { alt: "Ugyanaz a dátumvezérlő a két alakjában. A Számlák oldalon egy kék kapszula, hajszálvonallal elválasztva: egy sima felirat rombusszal és a 2026. július szöveggel, majd az egyetlen kattintható rész, amelyen az ezen: Teljesítés, egy csillag és egy lefelé mutató jel áll. A Banki tranzakciók oldalon a kapszulában csak a felirat van, kattintható rész nélkül." },
}

const de: Copy = {
  ui: {
    'focus.basis_on': "nach",
    'focus.period_readonly': "In der Seitenleiste einstellbar - ein Zeitraum für alle Seiten",
    'date_filter.basis_short_delivery': "Leistung",
    'nav.workspace.invoices': "Rechnungen",
    'nav.workspace.transactions': "Banktransaktionen",
  },
  rendered: { period: "Juli 2026" },
  help: { alt: "Dasselbe Datumselement in seinen zwei Formen. Auf Rechnungen ist es eine blaue Kapsel, durch eine Haarlinie geteilt: eine schlichte Beschriftung mit Raute und Juli 2026, dann der einzige anklickbare Teil mit nach Leistung, einem Stern und einem Pfeil. Auf Banktransaktionen enthält die Kapsel nur die Beschriftung, ohne etwas Anklickbares." },
}

export const focusChipCopy: Record<Locale, Copy> = { en, hu, de }
