// Labels for the upload-panel screen, verbatim from aift-web messages/<locale>.json
// (filled by scratchpad/fill-ui2.py), plus this article's own text.
import type { Locale } from '@/lib/i18n'

const UI_KEYS = [
  'upload_queue.header_with_label',
  'upload.queue_row.extracting',
  'upload.queue_row.extracting_page',
  'upload.queue_row.extracted',
  'upload.queue_row.already_exists',
  'upload.queue_row.failed_prefix',
  'upload.queue_row.retry',
  'upload.queue_row.working_aria',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  /** Pre-rendered strings the app builds in code, not from a message. */
  rendered: { header: string; page: string; failed: string }
  help: { alt: string }
}

const en: Copy = {
  ui: {
    'upload_queue.header_with_label': 'Uploads · {label}',
    'upload.queue_row.extracting': 'Extracting…',
    'upload.queue_row.extracting_page': 'Extracting page {current} / {total}',
    'upload.queue_row.extracted': 'Extracted',
    'upload.queue_row.already_exists': 'Already exists',
    'upload.queue_row.failed_prefix': 'Failed: {message}',
    'upload.queue_row.retry': 'Retry',
    'upload.queue_row.working_aria': 'Working',
  },
  rendered: {
    header: 'Uploads · 2 uploading',
    page: 'Extracting page 4 / 12',
    failed: 'Failed: Unsupported file type: image/heic',
  },
  help: { alt: 'The upload panel with six files: two still being read, one finished, one already in the workspace, one refused by the browser, and one that failed to read and offers Retry.' },
}

const hu: Copy = {
  ui: {
    'upload_queue.header_with_label': 'Feltöltések · {label}',
    'upload.queue_row.extracting': 'Kinyerés…',
    'upload.queue_row.extracting_page': '{current}. / {total}. Oldal kinyerése',
    'upload.queue_row.extracted': 'Kinyerve',
    'upload.queue_row.already_exists': 'Már létezik',
    'upload.queue_row.failed_prefix': 'Sikertelen: {message}',
    'upload.queue_row.retry': 'Újra',
    'upload.queue_row.working_aria': 'Folyamatban',
  },
  rendered: {
    header: 'Feltöltések · 2 uploading',
    page: '4. / 12. Oldal kinyerése',
    failed: 'Sikertelen: Unsupported file type: image/heic',
  },
  help: { alt: 'A feltöltési panel hat fájllal: kettő olvasás alatt, egy kész, egy már a munkaterületen van, egyet a böngésző utasított vissza, egynek pedig nem sikerült az olvasása, és Újra gombot kínál.' },
}

const de: Copy = {
  ui: {
    'upload_queue.header_with_label': 'Uploads · {label}',
    'upload.queue_row.extracting': 'Extrahieren…',
    'upload.queue_row.extracting_page': 'Seite {current} / {total} extrahieren',
    'upload.queue_row.extracted': 'Extrahiert',
    'upload.queue_row.already_exists': 'Bereits vorhanden',
    'upload.queue_row.failed_prefix': 'Fehlgeschlagen: {message}',
    'upload.queue_row.retry': 'Erneut versuchen',
    'upload.queue_row.working_aria': 'In Bearbeitung',
  },
  rendered: {
    header: 'Uploads · 2 uploading',
    page: 'Seite 4 / 12 extrahieren',
    failed: 'Fehlgeschlagen: Unsupported file type: image/heic',
  },
  help: { alt: 'Das Upload-Fenster mit sechs Dateien: zwei werden gelesen, eine ist fertig, eine liegt bereits im Arbeitsbereich, eine hat der Browser abgelehnt, und eine konnte nicht gelesen werden und bietet Erneut versuchen an.' },
}

export const uploadsCopy: Record<Locale, Copy> = { en, hu, de }

/** The rows of the figure. Fictional file names, as the house rule requires. */
export const UPLOAD_ROWS = [
  { file: 'reamwell-2026-0417.pdf', kind: 'invoice', state: 'extracting' },
  { file: 'slatebridge-march.pdf', kind: 'statement', state: 'page' },
  { file: 'quillmoor-2026-0288.pdf', kind: 'invoice', state: 'extracted' },
  { file: 'gearmont-2026-0091.pdf', kind: 'invoice', state: 'duplicate' },
  { file: 'scan-0042.heic', kind: 'invoice', state: 'wrong_type' },
  { file: 'gearmont-2026-0092.pdf', kind: 'invoice', state: 'failed' },
] as const

export type UploadRow = (typeof UPLOAD_ROWS)[number]
