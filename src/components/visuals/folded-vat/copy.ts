// Labels for the folded-VAT diagram. The column names are the export file's
// own headers, which are ENGLISH IN EVERY LOCALE — the Ledger export's headers
// never follow the reader's language (see the language article). So
// `netExported`, `vatDeductible`, `net` and `vat` are deliberately not
// translated; only the prose around them is.

import type { Locale } from '@/lib/i18n'

type Copy = {
  setting: string
  onTheInvoice: string
  inTheExport: string
  /** Export column headers: English in every locale, by design. */
  net: string
  vat: string
  netExported: string
  vatDeductible: string
  moves: string
  conserved: string
  alt: string
}

const COLUMNS = {
  net: 'Net Amount',
  vat: 'VAT Amount',
  netExported: 'Net Amount Exported',
  vatDeductible: 'VAT Amount Deductible',
}

const en: Copy = {
  ...COLUMNS,
  setting: 'A line that is 50% non-deductible, on the default setting (Native for 100% only).',
  onTheInvoice: 'On the invoice',
  inTheExport: 'In the export',
  moves: '13.50 moves',
  conserved: 'Nothing is invented: the gross is 127.00 either way, and the VAT still adds up. The non-deductible half has moved out of the VAT column and into the net.',
  alt: 'An invoice line of 100.00 net and 27.00 VAT becomes 113.50 net and 13.50 VAT in the export: the non-deductible 13.50 moves from the VAT column into the net.',
}

const hu: Copy = {
  ...COLUMNS,
  setting: 'Egy 50%-ban le nem vonható tétel, az alapbeállításon (Natív csak 100%-nál).',
  onTheInvoice: 'A számlán',
  inTheExport: 'Az exportban',
  moves: '13,50 átkerül',
  conserved: 'Semmi nem keletkezik: a bruttó így is, úgy is 127,00, és az áfa is kijön. A le nem vonható fele átkerült az áfaoszlopból a nettóba.',
  alt: 'Egy 100,00 nettó és 27,00 áfa értékű számlatétel az exportban 113,50 nettóra és 13,50 áfára változik: a le nem vonható 13,50 az áfaoszlopból a nettóba kerül át.',
}

const de: Copy = {
  ...COLUMNS,
  setting: 'Eine zu 50% nicht abziehbare Zeile, in der Standardeinstellung (Nativ nur bei 100%).',
  onTheInvoice: 'Auf der Rechnung',
  inTheExport: 'Im Export',
  moves: '13,50 wandern',
  conserved: 'Nichts wird erfunden: der Bruttobetrag ist so oder so 127,00, und die Umsatzsteuer geht weiterhin auf. Die nicht abziehbare Hälfte ist aus der Steuerspalte in den Nettobetrag gewandert.',
  alt: 'Eine Rechnungszeile mit 100,00 netto und 27,00 Umsatzsteuer wird im Export zu 113,50 netto und 13,50 Umsatzsteuer: die nicht abziehbaren 13,50 wandern aus der Steuerspalte in den Nettobetrag.',
}

export const foldedVatCopy: Record<Locale, Copy> = { en, hu, de }
