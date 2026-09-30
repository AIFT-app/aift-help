// Text and data for the bank transaction list illustration (bank-transactions).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key. Hungarian
// ones are tegező because the app is. `help` holds the article's own words
// (alt text), magázó in Hungarian like every aift-help article.
//
// The data is FICTIONAL: the same international company names as the other
// illustrations (Halvorn Trading Ltd. is the example company itself, so its
// row is a transfer between its own accounts), and the category names and
// codes of the grid illustration where they overlap. The Quillmoor and
// Slatebridge rows pay the invoices of the invoice list illustration. Never
// real data.

import type { Locale } from '@/lib/i18n'
import type { Tone } from '../kit'

export const UI_KEYS = [
  'list_view.col_date',
  'list_view.col_counterparty',
  'list_view.col_labels',
  'list_view.col_category',
  'list_view.col_amount',
  'transactions.list.status_no_invoice',
  'transactions.list.status_duplicate',
  'transactions.list.status_unmatched',
  'transactions.list.status_matched',
  'transactions.list.status_bank_feed',
  'transactions.list.status_statement',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type LabelKey = 'no_invoice' | 'duplicate' | 'unmatched' | 'matched' | 'bank_feed' | 'statement'

// aift-web transactions/_components/TransactionListShell.tsx
// resolveTransactionLabels tones.
export const LABEL_TONE: Record<LabelKey, Tone> = {
  no_invoice: 'blue',
  duplicate: 'amber',
  unmatched: 'amber',
  matched: 'emerald',
  bank_feed: 'zinc',
  statement: 'zinc',
}

/** One row of the transaction list (aift-web Transaction, the parts shown). */
export type ListRow = {
  bookingDate: string
  partner: string
  description: string
  /** In resolveTransactionLabels order. */
  labels: LabelKey[]
  /** Signed: positive is money in. */
  amount: number
  currency: string
  category: string
  /** The category's ledger code (categories.secondary_value). */
  code: string
}

type RowText = { description: string; category: string }

type Copy = {
  ui: Record<UiKey, string>
  rows: ListRow[]
  help: { alt: string }
}

// Sorted like the list's default: booking date, newest first. The base
// currency is HUF in en and hu, EUR in de.
function rows(amounts: [number, number, number, number, number], currency: string, text: RowText[]): ListRow[] {
  return [
    {
      bookingDate: '2026-09-16',
      partner: 'Slatebridge Roofing Ltd.',
      description: text[0].description,
      labels: ['matched', 'statement'],
      amount: amounts[0],
      currency,
      category: text[0].category,
      code: '5240',
    },
    {
      bookingDate: '2026-09-15',
      partner: 'Quillmoor Software Ltd.',
      description: text[1].description,
      labels: ['matched', 'bank_feed'],
      amount: amounts[1],
      currency,
      category: text[1].category,
      code: '9110',
    },
    {
      bookingDate: '2026-09-14',
      partner: 'Reamwell Office Supplies Ltd.',
      description: text[2].description,
      labels: ['unmatched', 'bank_feed', 'statement'],
      amount: amounts[2],
      currency,
      category: text[2].category,
      code: '5340',
    },
    {
      bookingDate: '2026-09-12',
      partner: 'Halvorn Trading Ltd.',
      description: text[3].description,
      labels: ['no_invoice', 'bank_feed'],
      amount: amounts[3],
      currency,
      category: text[3].category,
      code: '3890',
    },
    {
      bookingDate: '2026-09-11',
      partner: 'Gearmont Fleet Services Ltd.',
      description: text[4].description,
      labels: ['duplicate', 'unmatched', 'statement'],
      amount: amounts[4],
      currency,
      category: text[4].category,
      code: '5120',
    },
  ]
}

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'list_view.col_date': 'Date',
    'list_view.col_counterparty': 'Partner',
    'list_view.col_labels': 'Labels',
    'list_view.col_category': 'Category',
    'list_view.col_amount': 'Amount',
    'transactions.list.status_no_invoice': 'No invoice',
    'transactions.list.status_duplicate': 'Duplicate',
    'transactions.list.status_unmatched': 'Unmatched',
    'transactions.list.status_matched': 'Matched',
    'transactions.list.status_bank_feed': 'Bank feed',
    'transactions.list.status_statement': 'Statement',
  },
  rows: rows([-1524000, 2450000, -38450, -250000, -62300], 'HUF', [
    { description: 'Invoice SBR/2026/0342', category: 'Repairs and maintenance' },
    { description: 'Payment of invoice HT-2026-0217', category: 'Consulting income' },
    { description: 'Card purchase REAMWELL WEBSHOP BUDAPEST HU, card ****4411, 2026-09-13', category: 'Office supplies' },
    { description: 'Transfer to savings account', category: 'Internal transfers' },
    { description: 'Fuel card top-up', category: 'Fuel' },
  ]),
  help: {
    alt:
      'The bank transaction list with five transactions, newest first: the booking date, the partner with the bank description under it on up to two lines, label pills with the ones that need action first, the ledger code of the category followed by its name, and the amount, green with an up arrow for money in and red with a down arrow for money out. Two rows have an amber left edge. Numbered markers point to the parts described in the list below.',
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'list_view.col_date': 'Dátum',
    'list_view.col_counterparty': 'Partner',
    'list_view.col_labels': 'Címkék',
    'list_view.col_category': 'Kategória',
    'list_view.col_amount': 'Összeg',
    'transactions.list.status_no_invoice': 'Nincs számla',
    'transactions.list.status_duplicate': 'Duplikáció',
    'transactions.list.status_unmatched': 'Nem párosított',
    'transactions.list.status_matched': 'Párosítva',
    'transactions.list.status_bank_feed': 'Banki forrás',
    'transactions.list.status_statement': 'Bankkivonat',
  },
  rows: rows([-1524000, 2450000, -38450, -250000, -62300], 'HUF', [
    { description: 'SBR/2026/0342 számla', category: 'Javítás és karbantartás' },
    { description: 'HT-2026-0217 számla kiegyenlítése', category: 'Tanácsadási bevétel' },
    { description: 'Kártyás vásárlás REAMWELL WEBSHOP BUDAPEST HU, kártya ****4411, 2026-09-13', category: 'Irodaszer' },
    { description: 'Átvezetés a megtakarítási számlára', category: 'Átvezetések' },
    { description: 'Üzemanyagkártya feltöltése', category: 'Üzemanyag' },
  ]),
  help: {
    alt:
      'A banki tranzakciók listája öt tranzakcióval, a legújabb elöl: a könyvelés dátuma, a partner alatta a bank leírásával legfeljebb két sorban, a címkék elöl a teendőt jelzőkkel, a kategória főkönyvi száma, utána a neve, és az összeg, bejövő pénznél zöld, felfelé mutató nyíllal, kimenőnél piros, lefelé mutató nyíllal. Két sor bal szélén borostyánsárga szegély van. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'list_view.col_date': 'Datum',
    'list_view.col_counterparty': 'Partner',
    'list_view.col_labels': 'Labels',
    'list_view.col_category': 'Kategorie',
    'list_view.col_amount': 'Betrag',
    'transactions.list.status_no_invoice': 'Keine Rechnung',
    'transactions.list.status_duplicate': 'Duplikat',
    'transactions.list.status_unmatched': 'Nicht zugeordnet',
    'transactions.list.status_matched': 'Zugeordnet',
    'transactions.list.status_bank_feed': 'Bank-Feed',
    'transactions.list.status_statement': 'Auszug',
  },
  rows: rows([-6480, 5400, -96.4, -2500, -158.2], 'EUR', [
    { description: 'Rechnung SBR/2026/0342', category: 'Reparatur und Instandhaltung' },
    { description: 'Zahlung Rechnung HT-2026-0217', category: 'Beratungserlöse' },
    { description: 'Kartenzahlung REAMWELL WEBSHOP BUDAPEST HU, Karte ****4411, 2026-09-13', category: 'Bürobedarf' },
    { description: 'Übertrag auf das Sparkonto', category: 'Umbuchungen' },
    { description: 'Aufladung der Tankkarte', category: 'Kraftstoff' },
  ]),
  help: {
    alt:
      'Die Liste der Banktransaktionen mit fünf Transaktionen, die neueste zuerst: das Buchungsdatum, der Partner mit der Beschreibung der Bank darunter auf bis zu zwei Zeilen, Labels mit denen zuerst, die eine Aktion brauchen, das Sachkonto der Kategorie, gefolgt von ihrem Namen, und der Betrag, grün mit Pfeil nach oben für Geldeingang und rot mit Pfeil nach unten für Geldausgang. Zwei Zeilen haben einen gelben linken Rand. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
  },
}

export const bankTransactionsCopy: Record<Locale, Copy> = { en, hu, de }
