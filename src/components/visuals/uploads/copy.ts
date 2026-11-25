// Labels for the upload-panel screen, verbatim from aift-web messages/<locale>.json
// (filled by scratchpad/fill-uploads-copy.py), plus this article's own text.
import type { Locale } from '@/lib/i18n'

const UI_KEYS = [
  'upload_queue.header_with_label',
  'upload_queue.summary_uploading',
  'upload_queue.region',
  'upload.queue_row.extracting',
  'upload.queue_row.extracting_page',
  'upload.queue_row.extracted',
  'upload.queue_row.already_exists_as',
  'upload.queue_row.failed_prefix',
  'upload.queue_row.errors.wrong_file_type',
  'upload.queue_row.server_errors.pdf_encrypted',
  'upload.queue_row.retry',
  'upload.queue_row.working_aria',
  'document_kind.invoice',
  'document_kind.bank_statement',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  help: { alt: string }
}

const en: Copy = {
  ui: {
    'upload_queue.header_with_label': 'Uploads · {label}',
    'upload_queue.summary_uploading': '{count} uploading',
    'upload_queue.region': 'Upload queue',
    'upload.queue_row.extracting': 'Extracting…',
    'upload.queue_row.extracting_page': 'Extracting page {current} / {total}',
    'upload.queue_row.extracted': 'Extracted',
    'upload.queue_row.already_exists_as': 'Already uploaded: {invoice}',
    'upload.queue_row.failed_prefix': 'Failed: {message}',
    'upload.queue_row.errors.wrong_file_type': 'Wrong file type',
    'upload.queue_row.server_errors.pdf_encrypted': "Encrypted PDFs aren't supported",
    'upload.queue_row.retry': 'Retry',
    'upload.queue_row.working_aria': 'Working',
    'document_kind.invoice': 'Invoice',
    'document_kind.bank_statement': 'Bank statement',
  },
  help: { alt: 'The upload panel with six files: two still being read, one finished, one already uploaded that names the original invoice, one refused by the browser, and one that failed to read and offers Retry.' },
}

const hu: Copy = {
  ui: {
    'upload_queue.header_with_label': 'Feltöltések · {label}',
    'upload_queue.summary_uploading': '{count} feltöltés folyamatban',
    'upload_queue.region': 'Feltöltési sor',
    'upload.queue_row.extracting': 'Kinyerés…',
    'upload.queue_row.extracting_page': '{current}. / {total}. Oldal kinyerése',
    'upload.queue_row.extracted': 'Kinyerve',
    'upload.queue_row.already_exists_as': 'Már fent van: {invoice}',
    'upload.queue_row.failed_prefix': 'Sikertelen: {message}',
    'upload.queue_row.errors.wrong_file_type': 'Nem támogatott fájltípus',
    'upload.queue_row.server_errors.pdf_encrypted': 'A titkosított PDF-fájlok nem támogatottak',
    'upload.queue_row.retry': 'Újra',
    'upload.queue_row.working_aria': 'Folyamatban',
    'document_kind.invoice': 'Számla',
    'document_kind.bank_statement': 'Bankkivonat',
  },
  help: { alt: 'A feltöltési panel hat fájllal: kettő olvasás alatt, egy kész, egy már fent van, és megnevezi az eredeti számlát, egyet a böngésző utasított vissza, egynek pedig nem sikerült az olvasása, és Újra gombot kínál.' },
}

const de: Copy = {
  ui: {
    'upload_queue.header_with_label': 'Uploads · {label}',
    'upload_queue.summary_uploading': '{count} werden hochgeladen',
    'upload_queue.region': 'Upload-Warteschlange',
    'upload.queue_row.extracting': 'Extrahieren…',
    'upload.queue_row.extracting_page': 'Seite {current} / {total} extrahieren',
    'upload.queue_row.extracted': 'Extrahiert',
    'upload.queue_row.already_exists_as': 'Bereits hochgeladen: {invoice}',
    'upload.queue_row.failed_prefix': 'Fehlgeschlagen: {message}',
    'upload.queue_row.errors.wrong_file_type': 'Nicht unterstützter Dateityp',
    'upload.queue_row.server_errors.pdf_encrypted': 'Verschlüsselte PDF-Dateien werden nicht unterstützt',
    'upload.queue_row.retry': 'Erneut versuchen',
    'upload.queue_row.working_aria': 'In Bearbeitung',
    'document_kind.invoice': 'Rechnung',
    'document_kind.bank_statement': 'Kontoauszug',
  },
  help: { alt: 'Das Upload-Fenster mit sechs Dateien: zwei werden gelesen, eine ist fertig, eine ist bereits hochgeladen und nennt die ursprüngliche Rechnung, eine hat der Browser abgelehnt, und eine konnte nicht gelesen werden und bietet Erneut versuchen an.' },
}

export const uploadsCopy: Record<Locale, Copy> = { en, hu, de }

/** Fills `{name}` placeholders the way next-intl does for these plain strings. */
export function fill(message: string, values: Record<string, string | number>): string {
  return message.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name]))
}

/** In-progress rows, as the header counts them (UploadQueuePanel `summary_uploading`). */
export const IN_PROGRESS_COUNT = 2

/**
 * Height of the figure's stage (the corner of the page behind the panel), per
 * locale. The panel is `fixed bottom-4` with no height of its own, so the stage
 * cannot size to it: this is the panel's measured height (desktop and the 390px
 * Enlarge view; HU and DE wrap the failed row to two lines) plus its 16px bottom
 * offset plus 16px of page above it. At 336px for every locale the panel's
 * header was cut off (2026-11-25). Re-measure when a row or label changes.
 */
export const STAGE_HEIGHT: Record<Locale, number> = { en: 416, hu: 432, de: 448 }

/** The page counter on the statement row. */
export const STATEMENT_PAGE = { current: 4, total: 12 }

/**
 * The rows of the figure. Fictional file names and invoice numbers, as the
 * house rule requires. `duplicateLabel` is what the upload action returns for
 * the original: its invoice number, else its file name.
 */
export const UPLOAD_ROWS = [
  { file: 'reamwell-2026-0417.pdf', kind: 'invoice', state: 'extracting' },
  { file: 'slatebridge-march.pdf', kind: 'statement', state: 'page' },
  { file: 'quillmoor-2026-0288.pdf', kind: 'invoice', state: 'extracted' },
  { file: 'gearmont-2026-0091.pdf', kind: 'invoice', state: 'duplicate', duplicateLabel: 'GM-2026-0091' },
  { file: 'reamwell-contract.docx', kind: 'invoice', state: 'wrong_type' },
  { file: 'gearmont-2026-0092.pdf', kind: 'invoice', state: 'failed' },
] as const

export type UploadRow = (typeof UPLOAD_ROWS)[number]
