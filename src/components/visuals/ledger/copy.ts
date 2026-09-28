// Labels for the Ledger filter-chrome figure, keyed by aift-web message key.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28):
//   src/components/ledger-filter/NLFilterInput.tsx      (the Ask the Ledger bar)
//   src/components/ledger-filter/SearchEngineSelect.tsx (Auto / Exact / Meaning)
//   src/components/ledger-filter/ledger-strip.tsx       (the always-visible strip)
//   src/components/ledger-filter/ledger-active-chips.tsx(the chip row)
//   src/components/date-range/date-range-filter.tsx     (the date trigger)
//   src/components/list-view/multi-select-chip-dropdown.tsx (the partner control)
//   src/components/list-view/tabbed-list-view.tsx       (the five tabs)
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'ledger_nl.label',
  'ledger_nl.placeholder_default',
  'ledger_nl.engine_auto',
  'ledger_nl.engine_exact',
  'ledger_nl.engine_meaning',
  'ledger_explorer.filter_direction_all',
  'ledger_explorer.filter_partner_short',
  'ledger_explorer.filter_all',
  'ledger_explorer.more_filters',
  'ledger_explorer.reset_all',
  'ledger_explorer.active_filters_label',
  'ledger_explorer.tab_invoice_headers',
  'ledger_explorer.tab_invoice_lines',
  'ledger_explorer.tab_bank_transactions',
  'ledger_explorer.tab_entities',
  'ledger_explorer.tab_partners',
  'date_filter.basis_short_delivery',
  'date_filter.rolling_last_30',
] as const

export type UiKey = (typeof UI_KEYS)[number]

/** The five tabs, in render order, with invented counts. */
export const TABS = [
  { key: 'tab_invoice_headers', count: '128' },
  { key: 'tab_invoice_lines', count: '412' },
  { key: 'tab_bank_transactions', count: '96' },
  { key: 'tab_entities', count: '3' },
  { key: 'tab_partners', count: '64' },
] as const
export const ACTIVE_TAB = 'tab_invoice_headers'

/** One filter set, so the chip row has something to show. */
export const MORE_FILTERS_COUNT = 2

type Copy = {
  ui: Record<UiKey, string>
  /** Strings the app builds from an ICU pattern, rendered out. */
  rendered: { partner: string; chips: string[] }
  help: { alt: string }
}

const en: Copy = {
  ui: {
    'ledger_nl.label': "Ask the Ledger",
    'ledger_nl.placeholder_default': "Describe what you want to see…",
    'ledger_nl.engine_auto': "Auto",
    'ledger_nl.engine_exact': "Exact",
    'ledger_nl.engine_meaning': "Meaning",
    'ledger_explorer.filter_direction_all': "Direction: All",
    'ledger_explorer.filter_partner_short': "Partner",
    'ledger_explorer.filter_all': "All",
    'ledger_explorer.more_filters': "More filters",
    'ledger_explorer.reset_all': "Reset all",
    'ledger_explorer.active_filters_label': "Active filters",
    'ledger_explorer.tab_invoice_headers': "Invoice Headers",
    'ledger_explorer.tab_invoice_lines': "Invoice Lines",
    'ledger_explorer.tab_bank_transactions': "Bank Transactions",
    'ledger_explorer.tab_entities': "Companies",
    'ledger_explorer.tab_partners': "Partners",
    'date_filter.basis_short_delivery': "Fulfillment",
    'date_filter.rolling_last_30': "Last 30 days",
  },
  rendered: { partner: "Partner: All", chips: ["Currency: EUR", "Company: Gearmont"] },
  help: { alt: "The top of the Ledger. An Ask the Ledger bar with a search-engine switch reading Auto, Exact and Meaning; under it a grey strip holding the date control, a Direction select, a Partner picker and a More filters button carrying a count; under that a row of blue filter chips ending in Reset all; and under that the five tabs, Invoice Headers, Invoice Lines, Bank Transactions, Companies and Partners, each with a count, the first one underlined in blue." },
}

const hu: Copy = {
  ui: {
    'ledger_nl.label': "Kérdezd a Főkönyvet",
    'ledger_nl.placeholder_default': "Írd le, mit szeretnél látni…",
    'ledger_nl.engine_auto': "Auto",
    'ledger_nl.engine_exact': "Pontos",
    'ledger_nl.engine_meaning': "Jelentés",
    'ledger_explorer.filter_direction_all': "Irány: Mind",
    'ledger_explorer.filter_partner_short': "Partner",
    'ledger_explorer.filter_all': "Mind",
    'ledger_explorer.more_filters': "További szűrők",
    'ledger_explorer.reset_all': "Összes visszaállítása",
    'ledger_explorer.active_filters_label': "Aktív szűrők",
    'ledger_explorer.tab_invoice_headers': "Számla fejlécek",
    'ledger_explorer.tab_invoice_lines': "Számlatételek",
    'ledger_explorer.tab_bank_transactions': "Banki tranzakciók",
    'ledger_explorer.tab_entities': "Cégek",
    'ledger_explorer.tab_partners': "Partnerek",
    'date_filter.basis_short_delivery': "Teljesítés",
    'date_filter.rolling_last_30': "Utolsó 30 nap",
  },
  rendered: { partner: "Partner: Mind", chips: ["Pénznem: EUR", "Cég: Gearmont"] },
  help: { alt: "A Főkönyv teteje. Egy Kérdezd a Főkönyvet sáv, benne az Auto, Pontos és Jelentés keresőmotor-váltóval; alatta szürke csíkban a dátumvezérlő, egy Irány választó, egy Partner választó és a darabszámot mutató További szűrők gomb; az alatt kék szűrőcímkék sora, a végén az Összes visszaállítása hivatkozással; legalul az öt fül: Számla fejlécek, Számlatételek, Banki tranzakciók, Cégek és Partnerek, mindegyiken darabszámmal, az első kékkel aláhúzva." },
}

const de: Copy = {
  ui: {
    'ledger_nl.label': "Frag das Hauptbuch",
    'ledger_nl.placeholder_default': "Beschreiben Sie, was Sie sehen möchten…",
    'ledger_nl.engine_auto': "Auto",
    'ledger_nl.engine_exact': "Exakt",
    'ledger_nl.engine_meaning': "Bedeutung",
    'ledger_explorer.filter_direction_all': "Richtung: Alle",
    'ledger_explorer.filter_partner_short': "Partner",
    'ledger_explorer.filter_all': "Alle",
    'ledger_explorer.more_filters': "Weitere Filter",
    'ledger_explorer.reset_all': "Alle zurücksetzen",
    'ledger_explorer.active_filters_label': "Aktive Filter",
    'ledger_explorer.tab_invoice_headers': "Rechnungsköpfe",
    'ledger_explorer.tab_invoice_lines': "Rechnungspositionen",
    'ledger_explorer.tab_bank_transactions': "Banktransaktionen",
    'ledger_explorer.tab_entities': "Unternehmen",
    'ledger_explorer.tab_partners': "Partner",
    'date_filter.basis_short_delivery': "Leistung",
    'date_filter.rolling_last_30': "Letzte 30 Tage",
  },
  rendered: { partner: "Partner: Alle", chips: ["Währung: EUR", "Unternehmen: Gearmont"] },
  help: { alt: "Der obere Teil des Hauptbuchs. Eine Leiste Frag das Hauptbuch mit dem Suchmaschinen-Umschalter Auto, Exakt und Bedeutung; darunter ein grauer Streifen mit dem Datumselement, einer Richtungsauswahl, einer Partnerauswahl und der Schaltfläche Weitere Filter mit einer Anzahl; darunter eine Reihe blauer Filter-Chips, die mit Alle zurücksetzen endet; darunter die fünf Reiter Rechnungsköpfe, Rechnungspositionen, Banktransaktionen, Unternehmen und Partner, jeweils mit Anzahl, der erste blau unterstrichen." },
}

export const ledgerFilterCopy: Record<Locale, Copy> = { en, hu, de }
