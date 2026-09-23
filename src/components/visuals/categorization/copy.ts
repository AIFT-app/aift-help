// Text for the confidence-band diagram in the categorising article. All of it
// is this article's own copy (the app never shows these numbers side by side),
// so HU is formal. The band boundaries come from aift-api
// _shared/categorization-threshold.ts and _shared/categorize-line-items.ts,
// read at origin/main on 2026-09-23.
import type { Locale } from '@/lib/i18n'

type Band = { from: string; label: string; tone: 'emerald' | 'amber' | 'zinc' }

type Copy = {
  alt: string
  invoiceTitle: string
  invoiceDetail: string
  cashTitle: string
  cashDetail: string
  direct: string
  invoiceBands: [Band, Band, Band]
  cashBands: [Band, Band, Band]
}

const en: Copy = {
  alt: 'Where a confidence lands: on an invoice line the category is applied from 0.85, only suggested between 0.60 and 0.85, and below 0.60 the invoice is flagged for review. On a bank transaction the category is applied from 0.70, suggested below it, and flagged below 0.60. A learned correction that matches exactly books the record without asking the AI.',
  invoiceTitle: 'An invoice line',
  invoiceDetail: 'The AI reads the line and proposes a category.',
  cashTitle: 'A bank transaction',
  cashDetail: 'A transfer between your own accounts is applied whatever the score.',
  direct: 'A learned correction that matches exactly books the record straight away, without asking the AI at all.',
  invoiceBands: [
    { from: '0.85', label: 'Applied', tone: 'emerald' },
    { from: '0.60', label: 'Suggested only', tone: 'zinc' },
    { from: '0', label: 'Suggested, and the invoice is flagged for review', tone: 'amber' },
  ],
  cashBands: [
    { from: '0.70', label: 'Applied', tone: 'emerald' },
    { from: '0.60', label: 'Suggested only', tone: 'zinc' },
    { from: '0', label: 'Suggested, and the transaction is flagged for review', tone: 'amber' },
  ],
}

const hu: Copy = {
  alt: 'Hová esik a magabiztosság: számlatételnél a kategória 0,85-től kerül rá, 0,60 és 0,85 között csak javaslat, 0,60 alatt pedig a számla ellenőrzésre kerül. Banki tranzakciónál 0,70-től kerül rá a kategória, alatta javaslat, 0,60 alatt ellenőrzésre kerül. A pontosan illeszkedő tanult javítás AI nélkül könyveli a tételt.',
  invoiceTitle: 'Számlatétel',
  invoiceDetail: 'Az AI elolvassa a tételt, és kategóriát javasol.',
  cashTitle: 'Banki tranzakció',
  cashDetail: 'A saját számlák közötti átvezetés a pontszámtól függetlenül megkapja a kategóriát.',
  direct: 'A pontosan illeszkedő tanult javítás azonnal könyveli a tételt, az AI megkérdezése nélkül.',
  invoiceBands: [
    { from: '0,85', label: 'Rákerül', tone: 'emerald' },
    { from: '0,60', label: 'Csak javaslat', tone: 'zinc' },
    { from: '0', label: 'Javaslat, és a számla ellenőrzésre kerül', tone: 'amber' },
  ],
  cashBands: [
    { from: '0,70', label: 'Rákerül', tone: 'emerald' },
    { from: '0,60', label: 'Csak javaslat', tone: 'zinc' },
    { from: '0', label: 'Javaslat, és a tranzakció ellenőrzésre kerül', tone: 'amber' },
  ],
}

const de: Copy = {
  alt: 'Wo eine Konfidenz landet: auf einer Rechnungsposition wird die Kategorie ab 0,85 gesetzt, zwischen 0,60 und 0,85 nur vorgeschlagen, unter 0,60 wird die Rechnung zur Prüfung markiert. Bei einer Banktransaktion wird die Kategorie ab 0,70 gesetzt, darunter vorgeschlagen und unter 0,60 zur Prüfung markiert. Eine exakt passende gelernte Korrektur bucht den Datensatz ohne die KI.',
  invoiceTitle: 'Eine Rechnungsposition',
  invoiceDetail: 'Die KI liest die Position und schlägt eine Kategorie vor.',
  cashTitle: 'Eine Banktransaktion',
  cashDetail: 'Eine Umbuchung zwischen Ihren eigenen Konten wird unabhängig vom Wert gesetzt.',
  direct: 'Eine exakt passende gelernte Korrektur bucht den Datensatz sofort, ganz ohne die KI.',
  invoiceBands: [
    { from: '0,85', label: 'Wird gesetzt', tone: 'emerald' },
    { from: '0,60', label: 'Nur Vorschlag', tone: 'zinc' },
    { from: '0', label: 'Vorschlag, und die Rechnung wird zur Prüfung markiert', tone: 'amber' },
  ],
  cashBands: [
    { from: '0,70', label: 'Wird gesetzt', tone: 'emerald' },
    { from: '0,60', label: 'Nur Vorschlag', tone: 'zinc' },
    { from: '0', label: 'Vorschlag, und die Transaktion wird zur Prüfung markiert', tone: 'amber' },
  ],
}

export const categorizationCopy: Record<Locale, Copy> = { en, hu, de }
