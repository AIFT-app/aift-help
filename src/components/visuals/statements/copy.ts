// Labels for the Statements tab screen, verbatim from aift-web
// messages/<locale>.json (transactions.statements.*, origin/main 2026-09-23),
// keyed by message key so scratchpad/drift-any.py catches a change.
// `rendered` holds the lines the app fills placeholders into; `help` is this
// article's own text.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'transactions.statements.header_file',
  'transactions.statements.header_period',
  'transactions.statements.header_account',
  'transactions.statements.header_transactions',
  'transactions.statements.header_duplicates',
  'transactions.statements.header_status_actions',
  'transactions.statements.header_uploaded',
  'transactions.statements.status_completed',
  'transactions.statements.status_extracting',
  'transactions.statements.status_failed',
  'transactions.statements.status_pending',
  'transactions.statements.pages_progress',
  'transactions.statements.transactions_ratio',
  'transactions.statements.unmatched_with_number',
  'transactions.statements.needs_bank_account_with_number',
  'transactions.statements.complete_import',
  'transactions.statements.extract',
  'transactions.statements.assign_account',
  'transactions.statements.dismiss',
  'transactions.statements.today',
  'transactions.statements.yesterday',
  'transactions.statements.days_ago',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  rendered: {
    periodAug: string
    periodJul: string
    ratio: string
    pages: string
    unmatched: string
    needsAccount: string
    uploadedCompleted: string
    uploadedExtracting: string
    uploadedFailed: string
    uploadedPending: string
  }
  help: { alt: string }
}

/** Fictional statements, as the house rule requires. */
export const ACCOUNT_UNMATCHED = '99999999-11111111-22222222'
export const FILES = {
  completed: 'Reamwell-2026-08.pdf',
  extracting: 'Slatebridge-2026-08.pdf',
  failed: 'Quillmoor-2026-07.pdf',
  pending: 'Gearmont-2026-08.pdf',
} as const
export const ACCOUNTS = {
  completed: 'Reamwell HUF current',
  extracting: 'Slatebridge EUR',
} as const
/** 3 of 12 pages, as the bar's width. */
export const PROGRESS_PCT = 25


const en: Copy = {
  ui: {
    'transactions.statements.header_file': "File",
    'transactions.statements.header_period': "Period",
    'transactions.statements.header_account': "Account",
    'transactions.statements.header_transactions': "Transactions",
    'transactions.statements.header_duplicates': "Duplicates",
    'transactions.statements.header_status_actions': "Status / Actions",
    'transactions.statements.header_uploaded': "Uploaded",
    'transactions.statements.status_completed': "Completed",
    'transactions.statements.status_extracting': "Extracting",
    'transactions.statements.status_failed': "Failed",
    'transactions.statements.status_pending': "Pending",
    'transactions.statements.pages_progress': "{processed} / {total} pages",
    'transactions.statements.transactions_ratio': "{inserted} / {extracted}",
    'transactions.statements.unmatched_with_number': "{number} - unmatched",
    'transactions.statements.needs_bank_account_with_number': "No bank account found for {number}. Add it, then complete the import.",
    'transactions.statements.complete_import': "Complete import",
    'transactions.statements.extract': "Extract",
    'transactions.statements.assign_account': "Assign account",
    'transactions.statements.dismiss': "Dismiss",
    'transactions.statements.today': "Today",
    'transactions.statements.yesterday': "Yesterday",
    'transactions.statements.days_ago': "{days} days ago",
  },
  rendered: {
    "periodAug": "1 Aug 2026 – 31 Aug 2026",
    "periodJul": "1 Jul 2026 – 31 Jul 2026",
    "ratio": "24 / 26",
    "pages": "3 / 12 pages",
    "unmatched": "99999999-11111111-22222222 - unmatched",
    "needsAccount": "No bank account found for 99999999-11111111-22222222. Add it, then complete the import.",
    "uploadedCompleted": "Yesterday",
    "uploadedExtracting": "Today",
    "uploadedFailed": "2 days ago",
    "uploadedPending": "Today"
  },
  help: { alt: "The Statements tab: four uploaded bank statements in a table, one completed with a 24 of 26 transactions ratio, one extracting with page progress, one failed with no bank account found and a Complete import link, and one pending with Extract, Assign account and Dismiss." },
}

const hu: Copy = {
  ui: {
    'transactions.statements.header_file': "Fájl",
    'transactions.statements.header_period': "Időszak",
    'transactions.statements.header_account': "Számla",
    'transactions.statements.header_transactions': "Tranzakciók",
    'transactions.statements.header_duplicates': "Duplikációk",
    'transactions.statements.header_status_actions': "Állapot / Műveletek",
    'transactions.statements.header_uploaded': "Feltöltve",
    'transactions.statements.status_completed': "Kész",
    'transactions.statements.status_extracting': "Kinyerés",
    'transactions.statements.status_failed': "Sikertelen",
    'transactions.statements.status_pending': "Függőben",
    'transactions.statements.pages_progress': "{processed} / {total} oldal",
    'transactions.statements.transactions_ratio': "{inserted} / {extracted}",
    'transactions.statements.unmatched_with_number': "{number} - nem párosított",
    'transactions.statements.needs_bank_account_with_number': "Nincs bankszámla ehhez: {number}. Vedd fel, majd fejezd be az importálást.",
    'transactions.statements.complete_import': "Importálás befejezése",
    'transactions.statements.extract': "Kinyerés",
    'transactions.statements.assign_account': "Számla hozzárendelése",
    'transactions.statements.dismiss': "Elvetés",
    'transactions.statements.today': "Ma",
    'transactions.statements.yesterday': "Tegnap",
    'transactions.statements.days_ago': "{days} napja",
  },
  rendered: {
    "periodAug": "2026. aug. 1. – 2026. aug. 31.",
    "periodJul": "2026. júl. 1. – 2026. júl. 31.",
    "ratio": "24 / 26",
    "pages": "3 / 12 oldal",
    "unmatched": "99999999-11111111-22222222 - nem párosított",
    "needsAccount": "Nincs bankszámla ehhez: 99999999-11111111-22222222. Vedd fel, majd fejezd be az importálást.",
    "uploadedCompleted": "Tegnap",
    "uploadedExtracting": "Ma",
    "uploadedFailed": "2 napja",
    "uploadedPending": "Ma"
  },
  help: { alt: "A Bankkivonatok fül: négy feltöltött bankkivonat egy táblázatban, az egyik kész 26-ból 24 tranzakcióval, az egyik kinyerés alatt oldaljelzővel, az egyik sikertelen, mert nincs hozzá bankszámla, és Importálás befejezése hivatkozással, az egyik pedig függőben, Kinyerés, Számla hozzárendelése és Elvetés gombokkal." },
}

const de: Copy = {
  ui: {
    'transactions.statements.header_file': "Datei",
    'transactions.statements.header_period': "Zeitraum",
    'transactions.statements.header_account': "Konto",
    'transactions.statements.header_transactions': "Transaktionen",
    'transactions.statements.header_duplicates': "Duplikate",
    'transactions.statements.header_status_actions': "Status / Aktionen",
    'transactions.statements.header_uploaded': "Hochgeladen",
    'transactions.statements.status_completed': "Abgeschlossen",
    'transactions.statements.status_extracting': "Extrahieren",
    'transactions.statements.status_failed': "Fehlgeschlagen",
    'transactions.statements.status_pending': "Ausstehend",
    'transactions.statements.pages_progress': "{processed} / {total} Seiten",
    'transactions.statements.transactions_ratio': "{inserted} / {extracted}",
    'transactions.statements.unmatched_with_number': "{number} - nicht zugeordnet",
    'transactions.statements.needs_bank_account_with_number': "Kein Bankkonto für {number} gefunden. Legen Sie es an und schließen Sie den Import ab.",
    'transactions.statements.complete_import': "Import abschließen",
    'transactions.statements.extract': "Extrahieren",
    'transactions.statements.assign_account': "Konto zuweisen",
    'transactions.statements.dismiss': "Verwerfen",
    'transactions.statements.today': "Heute",
    'transactions.statements.yesterday': "Gestern",
    'transactions.statements.days_ago': "vor {days} Tagen",
  },
  rendered: {
    "periodAug": "1. Aug. 2026 – 31. Aug. 2026",
    "periodJul": "1. Juli 2026 – 31. Juli 2026",
    "ratio": "24 / 26",
    "pages": "3 / 12 Seiten",
    "unmatched": "99999999-11111111-22222222 - nicht zugeordnet",
    "needsAccount": "Kein Bankkonto für 99999999-11111111-22222222 gefunden. Legen Sie es an und schließen Sie den Import ab.",
    "uploadedCompleted": "Gestern",
    "uploadedExtracting": "Heute",
    "uploadedFailed": "vor 2 Tagen",
    "uploadedPending": "Heute"
  },
  help: { alt: "Der Reiter Kontoauszüge: vier hochgeladene Kontoauszüge in einer Tabelle, einer abgeschlossen mit 24 von 26 Transaktionen, einer in Extraktion mit Seitenfortschritt, einer fehlgeschlagen ohne gefundenes Bankkonto und mit dem Link Import abschließen, und einer ausstehend mit Extrahieren, Konto zuweisen und Verwerfen." },
}

export const statementsCopy: Record<Locale, Copy> = { en, hu, de }
