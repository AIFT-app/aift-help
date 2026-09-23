// Text for the two-rates diagram in the multi-currency article. All of it is
// this article's own copy (the app never shows the two rates side by side), so
// HU is formal. The facts come from aift-db 20260711120000_statutory_reporting_fx.sql,
// 20260711130000_reporting_fx_rate_sources.sql and aift-api fx-refresh, read at
// origin/main on 2026-09-23.
import type { Locale } from '@/lib/i18n'

type Column = {
  title: string
  subtitle: string
  rows: [string, string, string, string]
}

type Copy = {
  alt: string
  labels: [string, string, string, string]
  base: Column
  booking: Column
  footnote: string
}

const en: Copy = {
  alt: 'The two rates a foreign-currency document can carry, side by side: the base conversion from the ECB on the fulfillment date, written into every amount and never editable, and the HUF booking rate from the ECB or the MNB on the date basis you choose, stored as a rate only and editable by hand.',
  labels: ['What it is for', 'Rate date', 'Source', 'Can you set it by hand?'],
  base: {
    title: 'The base conversion',
    subtitle: 'Used everywhere in the product',
    rows: [
      'Lists, reports, the ledger',
      'Fulfillment date, else the issue date',
      'European Central Bank',
      'No. Base amounts are written by the system',
    ],
  },
  booking: {
    title: 'The HUF booking rate',
    subtitle: 'Only where VAT is reported in Hungary',
    rows: [
      'Statutory booking and the RLB export',
      'The date basis set in Currency & FX',
      'ECB or MNB, your choice',
      'Yes, per document, until you set it back to automatic',
    ],
  },
  footnote: 'A workspace whose base currency is already the forint needs only the first one.',
}

const hu: Copy = {
  alt: 'A két árfolyam, amelyet egy devizás bizonylat hordozhat, egymás mellett: a bázisátváltás az EKB-tól a teljesítés dátumán, amely minden összegbe beíródik és nem szerkeszthető, valamint a forintos könyvelési árfolyam az EKB-tól vagy az MNB-től a beállított dátumalapon, amely csak árfolyamként tárolódik és kézzel megadható.',
  labels: ['Mire szolgál', 'Árfolyam dátuma', 'Forrás', 'Megadható kézzel?'],
  base: {
    title: 'A bázisátváltás',
    subtitle: 'A termék minden pontján ezt látja',
    rows: [
      'Listák, jelentések, főkönyv',
      'A teljesítés dátuma, ennek hiányában a kiállításé',
      'Európai Központi Bank',
      'Nem. A bázisösszegeket a rendszer írja',
    ],
  },
  booking: {
    title: 'A forintos könyvelési árfolyam',
    subtitle: 'Csak ott, ahol az áfabevallás magyar',
    rows: [
      'A jogszabályi könyvelés és az RLB-export',
      'A Pénznem és árfolyam alatt beállított dátumalap',
      'EKB vagy MNB, az Ön választása szerint',
      'Igen, bizonylatonként, amíg vissza nem állítja automatikusra',
    ],
  },
  footnote: 'Ahol a munkaterület bázis pénzneme eleve a forint, ott csak az első kell.',
}

const de: Copy = {
  alt: 'Die zwei Kurse, die ein Fremdwährungsbeleg tragen kann, nebeneinander: die Basisumrechnung der EZB zum Leistungsdatum, die in jeden Betrag geschrieben wird und nicht editierbar ist, und der HUF-Buchungskurs von EZB oder MNB zum eingestellten Datum, der nur als Kurs gespeichert und von Hand gesetzt werden kann.',
  labels: ['Wofür', 'Kursdatum', 'Quelle', 'Von Hand setzbar?'],
  base: {
    title: 'Die Basisumrechnung',
    subtitle: 'Überall im Produkt sichtbar',
    rows: [
      'Listen, Berichte, Hauptbuch',
      'Leistungsdatum, sonst das Rechnungsdatum',
      'Europäische Zentralbank',
      'Nein. Die Basisbeträge schreibt das System',
    ],
  },
  booking: {
    title: 'Der HUF-Buchungskurs',
    subtitle: 'Nur wo die USt in Ungarn gemeldet wird',
    rows: [
      'Gesetzliche Buchung und der RLB-Export',
      'Das unter Währung & FX gewählte Datum',
      'EZB oder MNB, nach Ihrer Wahl',
      'Ja, pro Beleg, bis Sie zurück auf automatisch stellen',
    ],
  },
  footnote: 'Ein Arbeitsbereich, dessen Basiswährung bereits der Forint ist, braucht nur den ersten.',
}

export const currencyCopy: Record<Locale, Copy> = { en, hu, de }
