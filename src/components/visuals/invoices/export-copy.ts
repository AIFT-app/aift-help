// Text and data for the "download several invoices at once" illustrations
// (invoices article, PRD invoice-document-export, help slug
// help-invoice-document-export).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json (document_export.* and the few page labels
// around it) and keyed by their message key. Plural (ICU) messages are not in
// `ui`: their output for these numbers is in `rendered`, worked out by hand
// from the same messages. Hungarian app labels are tegező because the app is;
// `help` holds the article's own words (diagram labels, alt text), magázó in
// Hungarian like every aift-help article.
//
// The file names are the output of aift-web src/lib/document-export/naming.ts
// (assignPaths, archiveName) for these rows, run on 2026-11-23, not typed by
// hand. The data is FICTIONAL: the house set of company names used by the
// other illustrations (checked against a web search on 2026-09-21).

import type { Locale } from '@/lib/i18n'
import type { ListRow } from './copy'

export const EXPORT_UI_KEYS = [
  'document_export.button',
  'document_export.title',
  'document_export.scope_period',
  'document_export.period',
  'document_export.direction',
  'document_export.direction_all',
  'document_export.direction_incoming',
  'document_export.direction_outgoing',
  'document_export.company',
  'document_export.company_all',
  'document_export.format',
  'document_export.format_documents_zip',
  'document_export.format_documents_csv',
  'document_export.format_documents_datev',
  'document_export.format_documents_zip_help',
  'document_export.format_documents_datev_help',
  'document_export.pattern',
  'document_export.pattern_tokens',
  'document_export.pattern_preview',
  'document_export.token_internal_id',
  'document_export.token_invoice_number',
  'document_export.token_issue_date',
  'document_export.token_delivery_date',
  'document_export.token_due_date',
  'document_export.token_vat_date',
  'document_export.token_posting_date',
  'document_export.token_partner_name',
  'document_export.token_partner_tax_id',
  'document_export.token_direction',
  'document_export.token_gross',
  'document_export.token_currency',
  'document_export.folders',
  'document_export.folders_none',
  'document_export.folders_month',
  'document_export.folders_direction',
  'document_export.folders_partner',
  'document_export.datev_folder_incoming',
  'document_export.datev_folder_outgoing',
  'document_export.advanced',
  'document_export.ascii',
  'document_export.csv_style',
  'document_export.csv_style_excel',
  'document_export.csv_style_standard',
  'document_export.cancel',
  'document_export.start',
  'document_export.csv_file_name',
  'document_export.csv_document',
  'document_export.csv_internal_id',
  'document_export.csv_invoice_number',
  'document_export.csv_partner_name',
  'document_export.csv_total_gross',
  'document_export.outcome_included',
  'document_export.outcome_no_document',
  'document_export.outcome_download_failed',
  'invoices.list.title',
  'invoices.list.upload_invoices',
  'upload.button.hint_inline',
  'upload.button.hint_tooltip',
  'recategorize.selectedCount',
  'recategorize.clear',
  'recategorize.action',
  'recategorize.selectRow',
  'recategorize.selectAll',
  'vat_tools.approve_action',
  'date_filter.basis_short_issue',
] as const

export type ExportUiKey = (typeof EXPORT_UI_KEYS)[number]

/** The dialog's token chips, in naming.ts TOKENS order. */
export const TOKENS = [
  'internal_id',
  'invoice_number',
  'issue_date',
  'delivery_date',
  'due_date',
  'vat_date',
  'posting_date',
  'partner_name',
  'partner_tax_id',
  'direction',
  'gross',
  'currency',
] as const

/** DEFAULT_PATTERN in aift-web src/lib/document-export/types.ts. */
export const DEFAULT_PATTERN = '{issue_date}_{partner_name}_{invoice_number}'

/** datev.ts DATEV_DEFAULT_FOLDERS: the same in every UI language. */
export const DATEV_FOLDERS = { incoming: 'Eingangsrechnungen', outgoing: 'Ausgangsrechnungen' } as const

/** A list row of the invoices page with its selection state (F1). */
export type PickRow = ListRow & { selected: boolean }

/** A file name in a diagram; `[[...]]` marks the part a rule changed. */
export type Marked = string

/** One line of a ZIP file tree (F4, F6). */
export type TreeLine = { name: string; depth: number; kind: 'zip' | 'folder' | 'pdf' | 'csv' | 'xml' }

/** A CSV row as the reader sees it (five of the 26 columns, keyed by the AIFT ID). */
export type CsvRow = { fileName: string; document: 'included' | 'no_document' | 'download_failed'; internalId: string; invoiceNumber: string; partner: string; gross: string }

type Copy = {
  ui: Record<ExportUiKey, string>
  rendered: {
    selectedCount: string
    summary: string
    summaryMissing: string
    toastProgress: string
    toastDoneFailed: string
  }
  /** formatMonthLong(2026, 10) for the locale (aift-web src/lib/format.ts). */
  october: string
  /** The workspace's two companies (the Company filter shows with more than one). */
  companies: string[]
  currency: string
  pickRows: PickRow[]
  /** previewNames() for the first three rows, keep mode and DATEV mode. */
  previewNames: string[]
  previewNamesDatev: string[]
  patterns: { pattern: string; ascii: boolean; name: Marked; note: string }[]
  invoice: string
  treeFlat: TreeLine[]
  treeMonthly: TreeLine[]
  treeDatev: TreeLine[]
  csvRows: CsvRow[]
  help: {
    patternHead: string
    fileNameHead: string
    asciiOn: string
    flat: string
    monthly: string
    csvHead: string
    csvMore: string
    progress: string
    finished: string
    datevDialog: string
    datevZip: string
    alt: { entry: string; dialog: string; naming: string; zip: string; toasts: string; datev: string }
  }
}

const uiEn: Record<ExportUiKey, string> = {
  'document_export.button': "Download",
  'document_export.title': "Download invoices",
  'document_export.scope_period': "The documents of the period's invoices in one ZIP file, with the invoices' data in a CSV.",
  'document_export.period': "Period",
  'document_export.direction': "Direction",
  'document_export.direction_all': "All",
  'document_export.direction_incoming': "Incoming",
  'document_export.direction_outgoing': "Outgoing",
  'document_export.company': "Company",
  'document_export.company_all': "All companies",
  'document_export.format': "Format",
  'document_export.format_documents_zip': "ZIP (documents + CSV)",
  'document_export.format_documents_csv': "CSV only",
  'document_export.format_documents_datev': "DATEV (Belegtransfer)",
  'document_export.format_documents_zip_help': "The documents named by your pattern, with the invoices' data in a CSV next to them.",
  'document_export.format_documents_datev_help': "A DATEV XML-Schnittstelle online package, to upload to DATEV Unternehmen online with DATEV Belegtransfer.",
  'document_export.pattern': "File name pattern",
  'document_export.pattern_tokens': "Fields for the file name",
  'document_export.pattern_preview': "Files will be named like this (first three):",
  'document_export.token_internal_id': "AIFT ID",
  'document_export.token_invoice_number': "Invoice number",
  'document_export.token_issue_date': "Issue date",
  'document_export.token_delivery_date': "Delivery date",
  'document_export.token_due_date': "Due date",
  'document_export.token_vat_date': "VAT date",
  'document_export.token_posting_date': "Posting date",
  'document_export.token_partner_name': "Partner",
  'document_export.token_partner_tax_id': "Partner tax ID",
  'document_export.token_direction': "Direction",
  'document_export.token_gross': "Gross",
  'document_export.token_currency': "Currency",
  'document_export.folders': "Folders in the ZIP",
  'document_export.folders_none': "None",
  'document_export.folders_month': "By month",
  'document_export.folders_direction': "By direction",
  'document_export.folders_partner': "By partner",
  'document_export.datev_folder_incoming': "DATEV folder: incoming invoices",
  'document_export.datev_folder_outgoing': "DATEV folder: outgoing invoices",
  'document_export.advanced': "Advanced",
  'document_export.ascii': "File names without accents",
  'document_export.csv_style': "CSV format",
  'document_export.csv_style_excel': "Semicolon and decimal comma (for Hungarian and German spreadsheet settings)",
  'document_export.csv_style_standard': "Comma and decimal point (standard)",
  'document_export.cancel': "Cancel",
  'document_export.start': "Download",
  'document_export.csv_file_name': "File name in ZIP",
  'document_export.csv_document': "Document",
  'document_export.csv_internal_id': "AIFT ID",
  'document_export.csv_invoice_number': "Invoice number",
  'document_export.csv_partner_name': "Partner",
  'document_export.csv_total_gross': "Gross",
  'document_export.outcome_included': "Included",
  'document_export.outcome_no_document': "No document",
  'document_export.outcome_download_failed': "Download failed",
  'invoices.list.title': "Invoices",
  'invoices.list.upload_invoices': "Upload invoices",
  'upload.button.hint_inline': "or drop files anywhere on this page",
  'upload.button.hint_tooltip': "Drop multiple files anywhere on this page",
  'recategorize.selectedCount': "{count} selected",
  'recategorize.clear': "Clear",
  'recategorize.action': "Re-categorize",
  'recategorize.selectRow': "Select row",
  'recategorize.selectAll': "Select all",
  'vat_tools.approve_action': "Approve reviewed items",
  'date_filter.basis_short_issue': "Issue",
}

const uiHu: Record<ExportUiKey, string> = {
  'document_export.button': "Letöltés",
  'document_export.title': "Számlák letöltése",
  'document_export.scope_period': "A kiválasztott időszak számláinak dokumentumai egy ZIP-fájlban, a számlák adataival egy CSV-ben.",
  'document_export.period': "Időszak",
  'document_export.direction': "Irány",
  'document_export.direction_all': "Mind",
  'document_export.direction_incoming': "Bejövő",
  'document_export.direction_outgoing': "Kimenő",
  'document_export.company': "Cég",
  'document_export.company_all': "Minden cég",
  'document_export.format': "Formátum",
  'document_export.format_documents_zip': "ZIP (dokumentumok + CSV)",
  'document_export.format_documents_csv': "Csak CSV",
  'document_export.format_documents_datev': "DATEV (Belegtransfer)",
  'document_export.format_documents_zip_help': "A dokumentumok a mintád szerinti néven, mellettük a számlák adatai CSV-ben.",
  'document_export.format_documents_datev_help': "DATEV XML-Schnittstelle online csomag: a DATEV Belegtransfer programmal tölthető fel a DATEV Unternehmen online-ba.",
  'document_export.pattern': "Fájlnév minta",
  'document_export.pattern_tokens': "Mezők a fájlnévhez",
  'document_export.pattern_preview': "Így lesznek elnevezve (az első három):",
  'document_export.token_internal_id': "AIFT azonosító",
  'document_export.token_invoice_number': "Számlaszám",
  'document_export.token_issue_date': "Kiállítás",
  'document_export.token_delivery_date': "Teljesítés",
  'document_export.token_due_date': "Fizetési határidő",
  'document_export.token_vat_date': "ÁFA-dátum",
  'document_export.token_posting_date': "Könyvelési dátum",
  'document_export.token_partner_name': "Partner",
  'document_export.token_partner_tax_id': "Partner adószáma",
  'document_export.token_direction': "Irány",
  'document_export.token_gross': "Bruttó",
  'document_export.token_currency': "Pénznem",
  'document_export.folders': "Mappák a ZIP-ben",
  'document_export.folders_none': "Nincs",
  'document_export.folders_month': "Havonta",
  'document_export.folders_direction': "Irány szerint",
  'document_export.folders_partner': "Partnerenként",
  'document_export.datev_folder_incoming': "DATEV mappa: bejövő számlák",
  'document_export.datev_folder_outgoing': "DATEV mappa: kimenő számlák",
  'document_export.advanced': "Speciális",
  'document_export.ascii': "Ékezetek nélküli fájlnevek",
  'document_export.csv_style': "CSV formátum",
  'document_export.csv_style_excel': "Pontosvessző és tizedesvessző (magyar és német táblázatkezelőhöz)",
  'document_export.csv_style_standard': "Vessző és tizedespont (szabványos)",
  'document_export.cancel': "Mégse",
  'document_export.start': "Letöltés",
  'document_export.csv_file_name': "Fájlnév a ZIP-ben",
  'document_export.csv_document': "Dokumentum",
  'document_export.csv_internal_id': "AIFT azonosító",
  'document_export.csv_invoice_number': "Számlaszám",
  'document_export.csv_partner_name': "Partner",
  'document_export.csv_total_gross': "Bruttó",
  'document_export.outcome_included': "Benne van",
  'document_export.outcome_no_document': "Nincs dokumentum",
  'document_export.outcome_download_failed': "Letöltés sikertelen",
  'invoices.list.title': "Számlák",
  'invoices.list.upload_invoices': "Számlák feltöltése",
  'upload.button.hint_inline': "vagy húzd a fájlokat bárhová az oldalon",
  'upload.button.hint_tooltip': "Húzz több fájlt bárhová az oldalon",
  'recategorize.selectedCount': "{count} kijelölve",
  'recategorize.clear': "Kijelölés megszüntetése",
  'recategorize.action': "Újrakategorizálás",
  'recategorize.selectRow': "Sor kijelölése",
  'recategorize.selectAll': "Összes kijelölése",
  'vat_tools.approve_action': "Ellenőrzött tételek jóváhagyása",
  'date_filter.basis_short_issue': "Számla kelte",
}

const uiDe: Record<ExportUiKey, string> = {
  'document_export.button': "Herunterladen",
  'document_export.title': "Rechnungen herunterladen",
  'document_export.scope_period': "Die Belege der Rechnungen des Zeitraums in einer ZIP-Datei, die Rechnungsdaten in einer CSV.",
  'document_export.period': "Zeitraum",
  'document_export.direction': "Richtung",
  'document_export.direction_all': "Alle",
  'document_export.direction_incoming': "Eingang",
  'document_export.direction_outgoing': "Ausgang",
  'document_export.company': "Unternehmen",
  'document_export.company_all': "Alle Unternehmen",
  'document_export.format': "Format",
  'document_export.format_documents_zip': "ZIP (Belege + CSV)",
  'document_export.format_documents_csv': "Nur CSV",
  'document_export.format_documents_datev': "DATEV (Belegtransfer)",
  'document_export.format_documents_zip_help': "Die Belege nach Ihrem Muster benannt, daneben die Rechnungsdaten als CSV.",
  'document_export.format_documents_datev_help': "Ein Paket für die DATEV XML-Schnittstelle online, mit DATEV Belegtransfer nach DATEV Unternehmen online hochzuladen.",
  'document_export.pattern': "Dateinamen-Muster",
  'document_export.pattern_tokens': "Felder für den Dateinamen",
  'document_export.pattern_preview': "So werden die Dateien benannt (die ersten drei):",
  'document_export.token_internal_id': "AIFT-ID",
  'document_export.token_invoice_number': "Rechnungsnummer",
  'document_export.token_issue_date': "Rechnungsdatum",
  'document_export.token_delivery_date': "Leistungsdatum",
  'document_export.token_due_date': "Fälligkeit",
  'document_export.token_vat_date': "USt-Datum",
  'document_export.token_posting_date': "Buchungsdatum",
  'document_export.token_partner_name': "Partner",
  'document_export.token_partner_tax_id': "Steuernummer des Partners",
  'document_export.token_direction': "Richtung",
  'document_export.token_gross': "Brutto",
  'document_export.token_currency': "Währung",
  'document_export.folders': "Ordner in der ZIP",
  'document_export.folders_none': "Keine",
  'document_export.folders_month': "Nach Monat",
  'document_export.folders_direction': "Nach Richtung",
  'document_export.folders_partner': "Nach Partner",
  'document_export.datev_folder_incoming': "DATEV-Ordner: Eingangsrechnungen",
  'document_export.datev_folder_outgoing': "DATEV-Ordner: Ausgangsrechnungen",
  'document_export.advanced': "Erweitert",
  'document_export.ascii': "Dateinamen ohne Umlaute und Akzente",
  'document_export.csv_style': "CSV-Format",
  'document_export.csv_style_excel': "Semikolon und Dezimalkomma (für deutsche und ungarische Tabellenkalkulation)",
  'document_export.csv_style_standard': "Komma und Dezimalpunkt (Standard)",
  'document_export.cancel': "Abbrechen",
  'document_export.start': "Herunterladen",
  'document_export.csv_file_name': "Dateiname in der ZIP",
  'document_export.csv_document': "Beleg",
  'document_export.csv_internal_id': "AIFT-ID",
  'document_export.csv_invoice_number': "Rechnungsnummer",
  'document_export.csv_partner_name': "Partner",
  'document_export.csv_total_gross': "Brutto",
  'document_export.outcome_included': "Enthalten",
  'document_export.outcome_no_document': "Kein Beleg",
  'document_export.outcome_download_failed': "Download fehlgeschlagen",
  'invoices.list.title': "Rechnungen",
  'invoices.list.upload_invoices': "Rechnungen hochladen",
  'upload.button.hint_inline': "oder Dateien irgendwo auf dieser Seite ablegen",
  'upload.button.hint_tooltip': "Mehrere Dateien irgendwo auf dieser Seite ablegen",
  'recategorize.selectedCount': "{count} ausgewählt",
  'recategorize.clear': "Auswahl aufheben",
  'recategorize.action': "Neu kategorisieren",
  'recategorize.selectRow': "Zeile auswählen",
  'recategorize.selectAll': "Alle auswählen",
  'vat_tools.approve_action': "Geprüfte Einträge freigeben",
  'date_filter.basis_short_issue': "Rechnung",
}


// ── Shared data ─────────────────────────────────────────────────────────────

const ID = { gearmontNav: 'DEMO-INV-2026-0274', quillmoor: 'DEMO-INV-2026-0270', slatebridge: 'DEMO-INV-2026-0261', reamwell: 'DEMO-INV-2026-0255' }

// October 2026 on the invoice list, newest first. Gearmont's invoice came from
// NAV without a document; the other three are ticked.
function pickRows(amounts: [number, number, number, number], currency: string): PickRow[] {
  return [
    { issueDate: '2026-10-15', internalId: ID.gearmontNav, partner: 'Gearmont Fleet Services Ltd.', invoiceNumber: 'GFS-26-01022', labels: ['no_document', 'nav'], direction: 'expense', amount: amounts[0], currency, selected: false },
    { issueDate: '2026-10-12', internalId: ID.quillmoor, partner: 'Quillmoor Software Ltd.', invoiceNumber: 'QS-2026-117', labels: [], direction: 'income', amount: amounts[1], currency, selected: true },
    { issueDate: '2026-10-07', internalId: ID.slatebridge, partner: 'Slatebridge Roofing Ltd.', invoiceNumber: 'SBR/2026/0342', labels: ['approved'], direction: 'expense', amount: amounts[2], currency, selected: true },
    { issueDate: '2026-10-03', internalId: ID.reamwell, partner: 'Reamwell Office Supplies Ltd.', invoiceNumber: 'RW-2026-00418', labels: ['awaiting_approval'], direction: 'expense', amount: amounts[3], currency, selected: true },
  ]
}

const NAME = {
  reamwell: '2026-10-03_Reamwell Office Supplies Ltd._RW-2026-00418.pdf',
  slatebridge: '2026-10-07_Slatebridge Roofing Ltd._SBR-2026-0342.pdf',
  quillmoor: '2026-10-12_Quillmoor Software Ltd._QS-2026-117.pdf',
  gearmont: '2026-09-24_Gearmont Fleet Services Ltd._GFS-26-00931.pdf',
}
const PREVIEW = [NAME.reamwell, NAME.slatebridge, NAME.quillmoor]
const DATEV_BASES = [
  '2026-10-03_Reamwell_Office_Supplies_Ltd._RW-2026-00418',
  '2026-10-07_Slatebridge_Roofing_Ltd._SBR-2026-0342',
  '2026-10-12_Quillmoor_Software_Ltd._QS-2026-117',
]
const PREVIEW_DATEV = DATEV_BASES.map((b) => `${b}.pdf`)

function trees(workspace: string, word: string) {
  const csv = `${word}.csv`
  const flat: TreeLine[] = [
    { name: `${workspace}_2026-09-01_2026-10-31_${word}.zip`, depth: 0, kind: 'zip' },
    { name: NAME.gearmont, depth: 1, kind: 'pdf' },
    { name: NAME.reamwell, depth: 1, kind: 'pdf' },
    { name: NAME.quillmoor, depth: 1, kind: 'pdf' },
    { name: csv, depth: 1, kind: 'csv' },
  ]
  const monthly: TreeLine[] = [
    { name: `${workspace}_2026-09-01_2026-10-31_${word}.zip`, depth: 0, kind: 'zip' },
    { name: '2026-09/', depth: 1, kind: 'folder' },
    { name: NAME.gearmont, depth: 2, kind: 'pdf' },
    { name: '2026-10/', depth: 1, kind: 'folder' },
    { name: NAME.reamwell, depth: 2, kind: 'pdf' },
    { name: NAME.quillmoor, depth: 2, kind: 'pdf' },
    { name: csv, depth: 1, kind: 'csv' },
  ]
  const datev: TreeLine[] = [
    { name: `${workspace}_2026-10-01_2026-10-31_${word}.zip`, depth: 0, kind: 'zip' },
    { name: 'document.xml', depth: 1, kind: 'xml' },
    ...DATEV_BASES.flatMap((b): TreeLine[] => [
      { name: `${b}.pdf`, depth: 1, kind: 'pdf' },
      { name: `${b}.xml`, depth: 1, kind: 'xml' },
    ]),
  ]
  return { treeFlat: flat, treeMonthly: monthly, treeDatev: datev }
}

function csvRows(gross: [string, string, string]): CsvRow[] {
  return [
    { fileName: NAME.reamwell, document: 'included', internalId: ID.reamwell, invoiceNumber: 'RW-2026-00418', partner: 'Reamwell Office Supplies Ltd.', gross: gross[0] },
    { fileName: '', document: 'no_document', internalId: ID.gearmontNav, invoiceNumber: 'GFS-26-01022', partner: 'Gearmont Fleet Services Ltd.', gross: gross[1] },
    { fileName: '', document: 'download_failed', internalId: ID.slatebridge, invoiceNumber: 'SBR/2026/0342', partner: 'Slatebridge Roofing Ltd.', gross: gross[2] },
  ]
}

// naming.ts output for the Slatebridge invoice (SBR/2026/0342, 2026-10-07,
// no due date) under each pattern.
function patterns(word: string, wordAscii: string, notes: [string, string, string, string, string]) {
  return [
    { pattern: DEFAULT_PATTERN, ascii: false, name: '2026-10-07_Slatebridge Roofing Ltd._[[SBR-2026-0342]].pdf', note: notes[0] },
    { pattern: '{internal_id}_{invoice_number}', ascii: false, name: 'DEMO-INV-2026-0261_[[SBR-2026-0342]].pdf', note: notes[1] },
    { pattern: '{issue_date}_{due_date}_{invoice_number}', ascii: false, name: '2026-10-07_SBR-2026-0342.pdf', note: notes[2] },
    { pattern: `{issue_date}_${word}_{invoice_number}`, ascii: false, name: `2026-10-07_${word}_SBR-2026-0342.pdf`, note: notes[3] },
    { pattern: `{issue_date}_${word}_{invoice_number}`, ascii: true, name: `2026-10-07_[[${wordAscii}]]_SBR-2026-0342.pdf`, note: notes[4] },
  ]
}

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: uiEn,
  rendered: {
    selectedCount: '3 selected',
    summary: '245 invoices · 233 documents (55 MB)',
    summaryMissing: '12 invoices have no document (NAV data only): they are in the CSV, not in the ZIP.',
    toastProgress: 'Downloading invoices: 123 / 233',
    toastDoneFailed: 'Done: 231 documents in the ZIP, 2 failed to download (the CSV marks them).',
  },
  october: 'October 2026',
  companies: ['Példa Kft.', 'Példa Szolgáltató Kft.'],
  currency: 'HUF',
  pickRows: pickRows([96520, 2450000, 1524000, 186690], 'HUF'),
  previewNames: PREVIEW,
  previewNamesDatev: PREVIEW_DATEV,
  patterns: patterns('számla', 'szamla', [
    'The default pattern. The slashes of the invoice number become hyphens.',
    'The AIFT ID first, so the files sort in the order they arrived.',
    'This invoice has no due date: the empty field is dropped with one separator.',
    'Free text between the fields, here a Hungarian word.',
    'The same pattern with File names without accents ticked.',
  ]),
  invoice: 'The same invoice in every row: Slatebridge Roofing Ltd., invoice number SBR/2026/0342, issued 2026-10-07, AIFT ID DEMO-INV-2026-0261, no due date.',
  ...trees('Pelda-Kft', 'invoices'),
  csvRows: csvRows(['186690.00', '96520.00', '1524000.00']),
  help: {
    patternHead: 'Pattern',
    fileNameHead: 'File name in the ZIP',
    asciiOn: 'without accents',
    flat: 'Folders: None',
    monthly: 'Folders: By month',
    csvHead: 'invoices.csv, three of its rows (5 of the 26 columns)',
    csvMore: '…',
    progress: 'While it runs',
    finished: 'At the end, with two files that failed',
    datevDialog: 'The dialog with the DATEV format',
    datevZip: 'The DATEV package',
    alt: {
      entry:
        'Two parts of the Invoices page. Top: the page header with the Download button next to Upload invoices. Bottom: the selection bar reading 3 selected, with Clear, Download, Approve reviewed items and Re-categorize, above the invoice list where three of four rows are ticked. Numbered markers point to the parts described in the list below.',
      dialog:
        'The Download invoices dialog: the period October 2026 on the issue date, direction All, company All companies, format ZIP (documents + CSV), the file name pattern with its field chips and the first three file names, folders None, the opened Advanced section with File names without accents and CSV format, and a blue summary: 245 invoices, 233 documents, 55 MB, 12 invoices with NAV data only. Numbered markers point to the parts described in the list below.',
      naming:
        'Five file name patterns for the same invoice, each with the file name it gives. The changed parts are highlighted: the slashes of SBR/2026/0342 become hyphens, an empty due date disappears with its separator, and the accent-free option turns számla into szamla.',
      zip:
        'Two file trees of the same download, one without folders and one with a folder per month, each with the CSV at the root. Below, three rows of the CSV: one invoice with its file name and Included, a NAV-only invoice marked No document, and one marked Download failed, both without a file name.',
      toasts:
        'Two notifications in the bottom-right corner of the app: Downloading invoices: 123 / 233 with a spinner and a Cancel button, and the green Done: 231 documents in the ZIP, 2 failed to download (the CSV marks them).',
      datev:
        'The Download invoices dialog with the DATEV (Belegtransfer) format selected, its explanation, the file name preview without spaces and accents, and the two fields DATEV folder: incoming invoices (Eingangsrechnungen) and DATEV folder: outgoing invoices (Ausgangsrechnungen). Beside it, the DATEV ZIP without folders: document.xml and, for each invoice, a PDF and an XML file of the same name.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: uiHu,
  rendered: {
    selectedCount: '3 kijelölve',
    summary: '245 számla · 233 dokumentum (55 MB)',
    summaryMissing: '12 számlához nincs dokumentum (csak NAV-adat): ezek a CSV-ben szerepelnek, a ZIP-ben nem.',
    toastProgress: 'Számlák letöltése: 123 / 233',
    toastDoneFailed: 'Kész: 231 dokumentum a ZIP-ben, 2 letöltése sikertelen (a CSV jelzi).',
  },
  october: '2026. október',
  companies: ['Példa Kft.', 'Példa Szolgáltató Kft.'],
  currency: 'HUF',
  pickRows: pickRows([96520, 2450000, 1524000, 186690], 'HUF'),
  previewNames: PREVIEW,
  previewNamesDatev: PREVIEW_DATEV,
  patterns: patterns('számla', 'szamla', [
    'Az alapértelmezett minta. A számlaszám perjelei kötőjelek lesznek.',
    'Elöl az AIFT azonosító, így a fájlok érkezési sorrendben állnak.',
    'Ennek a számlának nincs fizetési határideje: az üres mező egy elválasztójellel együtt kimarad.',
    'Szabad szöveg a mezők között.',
    'Ugyanez a minta bejelölt Ékezetek nélküli fájlnevek beállítással.',
  ]),
  invoice: 'Mind az öt sorban ugyanaz a számla: Slatebridge Roofing Ltd., számlaszám SBR/2026/0342, kiállítva 2026-10-07, AIFT azonosító DEMO-INV-2026-0261, fizetési határidő nélkül.',
  ...trees('Pelda-Kft', 'szamlak'),
  csvRows: csvRows(['186690,00', '96520,00', '1524000,00']),
  help: {
    patternHead: 'Minta',
    fileNameHead: 'Fájlnév a ZIP-ben',
    asciiOn: 'ékezetek nélkül',
    flat: 'Mappák: Nincs',
    monthly: 'Mappák: Havonta',
    csvHead: 'szamlak.csv, három sora (a 26 oszlopból 5)',
    csvMore: '…',
    progress: 'Letöltés közben',
    finished: 'A végén, két sikertelen fájllal',
    datevDialog: 'Az ablak DATEV formátummal',
    datevZip: 'A DATEV-csomag',
    alt: {
      entry:
        'A Számlák oldal két része. Fent az oldal fejléce, a Letöltés gomb a Számlák feltöltése mellett. Lent a kijelölési sáv „3 kijelölve” felirattal, Kijelölés megszüntetése, Letöltés, Ellenőrzött tételek jóváhagyása és Újrakategorizálás gombbal, alatta a számlalista, ahol négy sorból három be van jelölve. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
      dialog:
        'A Számlák letöltése ablak: időszak 2026. október számla kelte alapján, irány Mind, cég Minden cég, formátum ZIP (dokumentumok + CSV), a fájlnév minta a mezőgombokkal és az első három fájlnévvel, mappák Nincs, a kinyitott Speciális rész az Ékezetek nélküli fájlnevek és a CSV formátum beállítással, és egy kék összesítő: 245 számla, 233 dokumentum, 55 MB, 12 számla csak NAV-adattal. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
      naming:
        'Öt fájlnév minta ugyanarra a számlára, mindegyik mellett a fájlnév, amelyet ad. A változó részek ki vannak emelve: az SBR/2026/0342 perjelei kötőjelek lesznek, az üres fizetési határidő az elválasztójelével együtt eltűnik, az ékezet nélküli beállítás pedig a „számla” szóból „szamla” lesz.',
      zip:
        'Ugyanannak a letöltésnek két fájlfája, egy mappák nélkül és egy havi mappákkal, mindkettőben a gyökérben a CSV. Alatta a CSV három sora: egy számla a fájlnevével és a „Benne van” jelzéssel, egy csak NAV-adatos számla „Nincs dokumentum”, egy pedig „Letöltés sikertelen” jelzéssel, ez utóbbi kettő fájlnév nélkül.',
      toasts:
        'Két értesítés az alkalmazás jobb alsó sarkában: „Számlák letöltése: 123 / 233” forgó jellel és Mégse gombbal, és a zöld „Kész: 231 dokumentum a ZIP-ben, 2 letöltése sikertelen (a CSV jelzi).”',
      datev:
        'A Számlák letöltése ablak kiválasztott DATEV (Belegtransfer) formátummal, a magyarázatával, a szóközök és ékezetek nélküli fájlnév előnézettel, és a két mezővel: DATEV mappa: bejövő számlák (Eingangsrechnungen) és DATEV mappa: kimenő számlák (Ausgangsrechnungen). Mellette a DATEV ZIP mappák nélkül: document.xml, és számlánként egy azonos nevű PDF és XML fájl.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: uiDe,
  rendered: {
    selectedCount: '3 ausgewählt',
    summary: '245 Rechnungen · 233 Belege (55 MB)',
    summaryMissing: '12 Rechnungen haben keinen Beleg (nur NAV-Daten): Sie stehen in der CSV, nicht in der ZIP.',
    toastProgress: 'Rechnungen herunterladen: 123 / 233',
    toastDoneFailed: 'Fertig: 231 Belege in der ZIP, 2 konnten nicht heruntergeladen werden (die CSV markiert sie).',
  },
  october: 'Oktober 2026',
  companies: ['Beispiel GmbH', 'Beispiel Service GmbH'],
  currency: 'EUR',
  pickRows: pickRows([240, 5400, 6480, 412.8], 'EUR'),
  previewNames: PREVIEW,
  previewNamesDatev: PREVIEW_DATEV,
  patterns: patterns('Beleg_für', 'Beleg_fur', [
    'Das Standardmuster. Die Schrägstriche der Rechnungsnummer werden zu Bindestrichen.',
    'Die AIFT-ID vorne, so stehen die Dateien in der Reihenfolge ihres Eingangs.',
    'Diese Rechnung hat keine Fälligkeit: Das leere Feld fällt mit einem Trennzeichen weg.',
    'Freier Text zwischen den Feldern.',
    'Dasselbe Muster mit Dateinamen ohne Umlaute und Akzente.',
  ]),
  invoice: 'In allen fünf Zeilen dieselbe Rechnung: Slatebridge Roofing Ltd., Rechnungsnummer SBR/2026/0342, ausgestellt am 2026-10-07, AIFT-ID DEMO-INV-2026-0261, ohne Fälligkeit.',
  ...trees('Beispiel-GmbH', 'rechnungen'),
  csvRows: csvRows(['412,80', '240,00', '6480,00']),
  help: {
    patternHead: 'Muster',
    fileNameHead: 'Dateiname in der ZIP',
    asciiOn: 'ohne Umlaute und Akzente',
    flat: 'Ordner: Keine',
    monthly: 'Ordner: Nach Monat',
    csvHead: 'rechnungen.csv, drei ihrer Zeilen (5 der 26 Spalten)',
    csvMore: '…',
    progress: 'Während des Downloads',
    finished: 'Am Ende, mit zwei fehlgeschlagenen Dateien',
    datevDialog: 'Der Dialog mit dem DATEV-Format',
    datevZip: 'Das DATEV-Paket',
    alt: {
      entry:
        'Zwei Teile der Seite Rechnungen. Oben der Seitenkopf mit der Schaltfläche Herunterladen neben Rechnungen hochladen. Unten die Auswahlleiste mit „3 ausgewählt“, Auswahl aufheben, Herunterladen, Geprüfte Einträge freigeben und Neu kategorisieren, darunter die Rechnungsliste, in der drei von vier Zeilen angehakt sind. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
      dialog:
        'Der Dialog Rechnungen herunterladen: Zeitraum Oktober 2026 nach Rechnungsdatum, Richtung Alle, Unternehmen Alle Unternehmen, Format ZIP (Belege + CSV), das Dateinamen-Muster mit seinen Feld-Schaltflächen und den ersten drei Dateinamen, Ordner Keine, der geöffnete Bereich Erweitert mit Dateinamen ohne Umlaute und Akzente und CSV-Format, und eine blaue Zusammenfassung: 245 Rechnungen, 233 Belege, 55 MB, 12 Rechnungen nur mit NAV-Daten. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
      naming:
        'Fünf Dateinamen-Muster für dieselbe Rechnung, jedes mit dem Dateinamen, den es ergibt. Die geänderten Teile sind hervorgehoben: Die Schrägstriche von SBR/2026/0342 werden zu Bindestrichen, eine leere Fälligkeit verschwindet mit ihrem Trennzeichen, und die Option ohne Umlaute macht aus „für“ „fur“.',
      zip:
        'Zwei Dateibäume desselben Downloads, einer ohne Ordner und einer mit einem Ordner pro Monat, jeweils mit der CSV im Stammverzeichnis. Darunter drei Zeilen der CSV: eine Rechnung mit ihrem Dateinamen und Enthalten, eine Rechnung nur mit NAV-Daten mit Kein Beleg und eine mit Download fehlgeschlagen, beide ohne Dateinamen.',
      toasts:
        'Zwei Benachrichtigungen in der rechten unteren Ecke der App: „Rechnungen herunterladen: 123 / 233“ mit Ladesymbol und der Schaltfläche Abbrechen, und das grüne „Fertig: 231 Belege in der ZIP, 2 konnten nicht heruntergeladen werden (die CSV markiert sie).“',
      datev:
        'Der Dialog Rechnungen herunterladen mit dem gewählten Format DATEV (Belegtransfer), seiner Erklärung, der Dateinamen-Vorschau ohne Leerzeichen und Umlaute und den beiden Feldern DATEV-Ordner: Eingangsrechnungen und DATEV-Ordner: Ausgangsrechnungen. Daneben die DATEV-ZIP ohne Ordner: document.xml und je Rechnung eine PDF- und eine XML-Datei mit gleichem Namen.',
    },
  },
}

export const exportCopy: Record<Locale, Copy> = { en, hu, de }
