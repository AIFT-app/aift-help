// Text and data for the invoice illustrations (invoices).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key (plural-free
// messages only; placeholders are filled with `fill`). Hungarian ones are
// tegező because the app is. `help` holds the article's own words (diagram
// labels, alt text), magázó in Hungarian like every aift-help article.
//
// The data is FICTIONAL: the same international company names as the other
// illustrations, each checked against a web search on 2026-09-21. Never real
// data.

import type { Locale } from '@/lib/i18n'
import type { Tone } from '../kit'

export const UI_KEYS = [
  'list_view.col_date',
  'list_view.col_counterparty',
  'list_view.col_labels',
  'list_view.col_amount',
  'invoices.labels.overflow_more',
  'invoices.labels.nav',
  'invoices.labels.review',
  'invoices.labels.entity_needed',
  'invoices.labels.pick_direction',
  'invoices.labels.fx_pending',
  'invoices.labels.duplicate',
  'invoices.labels.unverified',
  'invoices.labels.no_document',
  'invoices.labels.vat_incomplete',
  'invoices.labels.storno_cancelled',
  'invoices.labels.awaiting_approval',
  'invoices.labels.approved',
  'invoices.list.status_rejected',
  'invoices.matching.status_paid',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type LabelKey =
  | 'nav'
  | 'review'
  | 'entity_needed'
  | 'pick_direction'
  | 'fx_pending'
  | 'duplicate'
  | 'unverified'
  | 'no_document'
  | 'vat_incomplete'
  | 'storno_cancelled'
  | 'awaiting_approval'
  | 'approved'

// aift-web invoices/_components/invoice-row.ts resolveInvoiceLabels tones.
export const LABEL_TONE: Record<LabelKey, Tone> = {
  nav: 'blue',
  review: 'amber',
  entity_needed: 'amber',
  pick_direction: 'blue',
  fx_pending: 'amber',
  duplicate: 'amber',
  unverified: 'zinc',
  no_document: 'zinc',
  vat_incomplete: 'amber',
  storno_cancelled: 'zinc',
  awaiting_approval: 'amber',
  approved: 'emerald',
}

/** One row of the invoice list (aift-web InvoiceRow, the parts shown). */
export type ListRow = {
  issueDate: string
  partner: string
  invoiceNumber: string
  /** In resolveInvoiceLabels order. */
  labels: LabelKey[]
  direction: 'income' | 'expense'
  amount: number
  currency: string
}

type Copy = {
  ui: Record<UiKey, string>
  rows: ListRow[]
  help: {
    lifecycle: {
      arrives: string
      arrivesDetail: string
      extraction: string
      extractionDetail: string
      duplicates: string
      duplicatesDetail: string
      company: string
      companyDetail: string
      coding: string
      codingDetail: string
      approval: string
      approvalDetail: string
      paid: string
      paidDetail: string
      footnote: string
    }
    alt: { lifecycle: string; list: string }
  }
}

// Sorted like the list's default: issue date, newest first. The base currency
// is HUF in en and hu, EUR in de, so the one invoice waiting for an exchange
// rate is in the other currency.
function rows(amounts: [number, number, number, number], currency: string, foreign: string): ListRow[] {
  return [
    {
      issueDate: '2026-09-14',
      partner: 'Reamwell Office Supplies Ltd.',
      invoiceNumber: 'RW-2026-1204',
      labels: ['awaiting_approval'],
      direction: 'expense',
      amount: amounts[0],
      currency,
    },
    {
      issueDate: '2026-09-12',
      partner: 'Slatebridge Roofing Ltd.',
      invoiceNumber: 'SBR/2026/0342',
      labels: ['nav', 'unverified', 'no_document', 'approved'],
      direction: 'expense',
      amount: amounts[1],
      currency,
    },
    {
      issueDate: '2026-09-10',
      partner: 'Quillmoor Software Ltd.',
      invoiceNumber: 'HT-2026-0217',
      labels: [],
      direction: 'income',
      amount: amounts[2],
      currency,
    },
    {
      issueDate: '2026-09-08',
      partner: 'Gearmont Fleet Services Ltd.',
      invoiceNumber: 'GFS-26-00931',
      labels: ['review', 'fx_pending'],
      direction: 'expense',
      amount: amounts[3],
      currency: foreign,
    },
  ]
}

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'list_view.col_date': 'Date',
    'list_view.col_counterparty': 'Partner',
    'list_view.col_labels': 'Labels',
    'list_view.col_amount': 'Amount',
    'invoices.labels.overflow_more': '+{count}',
    'invoices.labels.nav': 'NAV',
    'invoices.labels.review': 'Review',
    'invoices.labels.entity_needed': 'Company needed',
    'invoices.labels.pick_direction': 'Pick direction',
    'invoices.labels.fx_pending': 'FX pending',
    'invoices.labels.duplicate': 'Duplicate',
    'invoices.labels.unverified': 'Unverified',
    'invoices.labels.no_document': 'No PDF',
    'invoices.labels.vat_incomplete': 'VAT codes incomplete',
    'invoices.labels.storno_cancelled': 'Cancelled',
    'invoices.labels.awaiting_approval': 'Awaiting approval',
    'invoices.labels.approved': 'Approved',
    'invoices.list.status_rejected': 'Rejected',
    'invoices.matching.status_paid': 'Paid',
  },
  rows: rows([186690, 1524000, 2450000, 1240], 'HUF', 'EUR'),
  help: {
    lifecycle: {
      arrives: 'Arrives',
      arrivesDetail: 'Uploaded, forwarded by email, or reported to NAV Online Számla, which arrives without a PDF.',
      extraction: 'Extraction',
      extractionDetail: 'Claude reads the header, the parties, the amounts and the line items. Below 80% completeness, or a failed read, the invoice needs review.',
      duplicates: 'Duplicate check',
      duplicatesDetail: 'An identical file is caught on upload and not read again. After extraction, the same number, issue date, gross amount and currency as another invoice also makes it a duplicate, hidden under the original.',
      company: 'Company and direction',
      companyDetail: 'Your company as the seller makes it income, as the buyer an expense.',
      coding: 'Partner, categories and VAT codes',
      codingDetail: 'Suggested once the direction is known.',
      approval: 'Payment approval',
      approvalDetail: 'Supplier invoices, where payment approvals are switched on.',
      paid: 'Matched to the bank',
      paidDetail: 'The bank transaction is matched to the invoice.',
      footnote: 'At any step an invoice can be rejected, when it is not for any of your companies, or cancelled by a storno invoice.',
    },
    alt: {
      lifecycle:
        'Diagram of an invoice in seven steps: it arrives by upload, email or from NAV; it is extracted; it is checked for duplicates; the company and the direction are found; the partner, categories and VAT codes are suggested; a supplier invoice goes through payment approval; the bank transaction is matched and the invoice is paid. Each step shows the labels the app gives an invoice there.',
      list:
        'The invoice list with four invoices, newest first: date, partner with the invoice number, label pills and the amount, red with a down arrow for expenses and green with an up arrow for income. Two rows have an amber left edge. Numbered markers point to the columns described in the list below.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'list_view.col_date': 'Dátum',
    'list_view.col_counterparty': 'Partner',
    'list_view.col_labels': 'Címkék',
    'list_view.col_amount': 'Összeg',
    'invoices.labels.overflow_more': '+{count}',
    'invoices.labels.nav': 'NAV',
    'invoices.labels.review': 'Ellenőrzés',
    'invoices.labels.entity_needed': 'Cég szükséges',
    'invoices.labels.pick_direction': 'Válassz irányt',
    'invoices.labels.fx_pending': 'Árfolyam függő',
    'invoices.labels.duplicate': 'Duplikáció',
    'invoices.labels.unverified': 'Nem ellenőrzött',
    'invoices.labels.no_document': 'Nincs PDF',
    'invoices.labels.vat_incomplete': 'Hiányos ÁFA-kódok',
    'invoices.labels.storno_cancelled': 'Sztornózva',
    'invoices.labels.awaiting_approval': 'Jóváhagyásra vár',
    'invoices.labels.approved': 'Jóváhagyva',
    'invoices.list.status_rejected': 'Elutasítva',
    'invoices.matching.status_paid': 'Fizetve',
  },
  rows: rows([186690, 1524000, 2450000, 1240], 'HUF', 'EUR'),
  help: {
    lifecycle: {
      arrives: 'Beérkezés',
      arrivesDetail: 'Feltöltéssel, e-mailes továbbítással, vagy a NAV Online Számlából, amely PDF nélkül érkezik.',
      extraction: 'Adatkinyerés',
      extractionDetail: 'Claude kiolvassa a fejlécet, a feleket, az összegeket és a tételeket. 80% alatti teljességnél vagy sikertelen olvasásnál a számla ellenőrzést igényel.',
      duplicates: 'Duplikáció-ellenőrzés',
      duplicatesDetail: 'Az azonos fájlt már feltöltéskor kiszűrjük, és nem olvassuk be újra. Kinyerés után a másik számlával azonos szám, kiállítási dátum, bruttó összeg és pénznem is duplikációt jelent, amelyet az eredeti alá rejtünk.',
      company: 'Cég és irány',
      companyDetail: 'Ha az Ön cége az eladó, a számla bevétel, ha a vevő, kiadás.',
      coding: 'Partner, kategóriák és ÁFA-kódok',
      codingDetail: 'Az irány ismeretében javasoljuk őket.',
      approval: 'Kifizetési jóváhagyás',
      approvalDetail: 'Szállítói számláknál, ahol a kifizetési jóváhagyás be van kapcsolva.',
      paid: 'Párosítás a bankkal',
      paidDetail: 'A banki tranzakciót párosítjuk a számlához.',
      footnote: 'Bármelyik lépésnél elutasítható a számla, ha egyik cégéhez sem tartozik, vagy sztornózhatja egy sztornószámla.',
    },
    alt: {
      lifecycle:
        'Ábra egy számla hét lépéséről: feltöltéssel, e-mailben vagy a NAV-ból érkezik; kinyerjük az adatait; ellenőrizzük, nem duplikáció-e; megállapítjuk a céget és az irányt; javasoljuk a partnert, a kategóriákat és az ÁFA-kódokat; a szállítói számla kifizetési jóváhagyáson megy át; a banki tranzakció párosításával a számla kifizetett lesz. Minden lépésnél látszanak a címkék, amelyeket az alkalmazás ott ad a számlának.',
      list:
        'A számlalista négy számlával, a legújabb elöl: dátum, partner a számlaszámmal, címkék és az összeg, kiadásnál piros, lefelé mutató nyíllal, bevételnél zöld, felfelé mutató nyíllal. Két sor bal szélén borostyánsárga szegély van. A számozott jelölők az alábbi listában leírt oszlopokra mutatnak.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'list_view.col_date': 'Datum',
    'list_view.col_counterparty': 'Partner',
    'list_view.col_labels': 'Labels',
    'list_view.col_amount': 'Betrag',
    'invoices.labels.overflow_more': '+{count}',
    'invoices.labels.nav': 'NAV',
    'invoices.labels.review': 'Prüfen',
    'invoices.labels.entity_needed': 'Unternehmen benötigt',
    'invoices.labels.pick_direction': 'Richtung wählen',
    'invoices.labels.fx_pending': 'FX ausstehend',
    'invoices.labels.duplicate': 'Duplikat',
    'invoices.labels.unverified': 'Nicht verifiziert',
    'invoices.labels.no_document': 'Kein PDF',
    'invoices.labels.vat_incomplete': 'USt-Codes unvollständig',
    'invoices.labels.storno_cancelled': 'Storniert',
    'invoices.labels.awaiting_approval': 'Freigabe ausstehend',
    'invoices.labels.approved': 'Freigegeben',
    'invoices.list.status_rejected': 'Abgelehnt',
    'invoices.matching.status_paid': 'Bezahlt',
  },
  rows: rows([412.8, 6480, 5400, 94615], 'EUR', 'HUF'),
  help: {
    lifecycle: {
      arrives: 'Eingang',
      arrivesDetail: 'Hochgeladen, per E-Mail weitergeleitet oder aus NAV Online Számla, von dort ohne PDF.',
      extraction: 'Extraktion',
      extractionDetail: 'Claude liest Kopf, Parteien, Beträge und Positionen. Unter 80 % Vollständigkeit oder wenn das Lesen fehlschlägt, braucht die Rechnung eine Prüfung.',
      duplicates: 'Duplikatprüfung',
      duplicatesDetail: 'Eine identische Datei wird schon beim Hochladen erkannt und nicht erneut gelesen. Nach der Extraktion macht auch dieselbe Nummer, dasselbe Rechnungsdatum, derselbe Bruttobetrag und dieselbe Währung wie bei einer anderen Rechnung sie zum Duplikat, das unter dem Original ausgeblendet wird.',
      company: 'Unternehmen und Richtung',
      companyDetail: 'Ist Ihr Unternehmen der Verkäufer, ist die Rechnung eine Einnahme, ist es der Käufer, eine Ausgabe.',
      coding: 'Partner, Kategorien und USt-Codes',
      codingDetail: 'Werden vorgeschlagen, sobald die Richtung feststeht.',
      approval: 'Zahlungsfreigabe',
      approvalDetail: 'Lieferantenrechnungen, wo Zahlungsfreigaben eingeschaltet sind.',
      paid: 'Zuordnung zur Bank',
      paidDetail: 'Die Banktransaktion wird der Rechnung zugeordnet.',
      footnote: 'In jedem Schritt kann eine Rechnung abgelehnt werden, wenn sie zu keinem Ihrer Unternehmen gehört, oder durch eine Stornorechnung storniert werden.',
    },
    alt: {
      lifecycle:
        'Diagramm einer Rechnung in sieben Schritten: Sie trifft per Upload, E-Mail oder aus NAV ein; sie wird extrahiert; sie wird auf Duplikate geprüft; Unternehmen und Richtung werden ermittelt; Partner, Kategorien und USt-Codes werden vorgeschlagen; eine Lieferantenrechnung durchläuft die Zahlungsfreigabe; die Banktransaktion wird zugeordnet und die Rechnung ist bezahlt. Jeder Schritt zeigt die Labels, die die App einer Rechnung dort gibt.',
      list:
        'Die Rechnungsliste mit vier Rechnungen, die neueste zuerst: Datum, Partner mit der Rechnungsnummer, Labels und der Betrag, rot mit Pfeil nach unten für Ausgaben und grün mit Pfeil nach oben für Einnahmen. Zwei Zeilen haben einen gelben linken Rand. Nummerierte Markierungen zeigen auf die Spalten, die in der Liste darunter beschrieben sind.',
    },
  },
}

export const invoicesCopy: Record<Locale, Copy> = { en, hu, de }
