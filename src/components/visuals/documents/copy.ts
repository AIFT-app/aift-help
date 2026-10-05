// Labels for the Documents list figure, keyed by aift-web message key so a
// drift check can compare them to messages/<locale>.json directly.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28); filters and description
// re-synced 2026-10-05 (invoice-attachments-review-fixes):
//   src/app/(app)/workspaces/[workspaceId]/documents/_components/DocumentsList.tsx
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'documents.title',
  'documents.description',
  'documents.upload',
  'documents.filter.all',
  'documents.filter.contracts',
  'documents.filter.other',
  'documents.filter.review',
  'documents.filter.duplicates',
  'documents.filter.attachments',
  'documents.status.ready',
  'documents.status.review',
  'documents.status.processing',
  'documents.type.contract',
  'documents.type.other',
  'documents.duplicate_of',
  'documents.duplicate_label',
  'documents.source.email',
  'documents.source.upload',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export const FILTERS = ['all', 'contracts', 'other', 'review', 'duplicates', 'attachments'] as const
export const ACTIVE_FILTER = 'all'
export const DUPLICATE_COUNT = 1

/**
 * Five fictional rows, each carrying one of the article's corrections.
 *
 * 1  A lease. The AI wrote `lease` into `document_type`, and the badge still
 *    says Contract, because `kind` is `contract`: the finer label is dropped
 *    for every contract (backlog `documents-contract-drops-the-finer-type`).
 * 2  A German chart of accounts. `kind` is `other`, so the AI's own word
 *    survives to the badge, UNTRANSLATED, in every interface language.
 * 3  A contract the first pass was unsure about: status Review.
 * 4  A second copy of row 1, filed inline under its original with the summary
 *    replaced by what it duplicates, not set aside on its own page.
 * 5  A PDF holding several documents scanned together: parked on Processing
 *    for good, which is the catch-all badge the article warns about.
 *
 * `type` is the raw `document_type` the AI wrote; `kind` decides the badge
 * colour (purple for a contract) AND, for a contract, the label itself.
 */
export type Row = {
  internalId: string
  fileName: string
  /** The AI's free-text document_type, or null to fall back to the kind label. */
  type: string | null
  kind: 'contract' | 'other'
  status: 'ready' | 'review' | 'processing'
  /** Percent as the app prints it, or null for no confidence at all. */
  pct: string | null
  source: 'email' | 'upload'
  mime: string
  size: string
  /** Detected document language, uppercased as the app does. */
  lang: string
  duplicateOf?: string
}

export const ROWS: Row[] = [
  {
    internalId: 'GRM-DOC-2026-0118',
    fileName: 'Reamwell-office-lease-2026.pdf',
    type: 'lease',
    kind: 'contract',
    status: 'ready',
    pct: '94%',
    source: 'email',
    mime: 'PDF',
    size: '1.2 MB',
    lang: 'EN',
  },
  {
    internalId: 'GRM-DOC-2026-0117',
    fileName: 'Slatebridge-Kontenrahmen.pdf',
    type: 'Kontenrahmen',
    kind: 'other',
    status: 'ready',
    pct: '88%',
    source: 'upload',
    mime: 'PDF',
    size: '340 KB',
    lang: 'DE',
  },
  {
    internalId: 'GRM-DOC-2026-0116',
    fileName: 'Quillmoor-master-services-agreement.pdf',
    type: null,
    kind: 'contract',
    status: 'review',
    pct: '61%',
    source: 'email',
    mime: 'PDF',
    size: '780 KB',
    lang: 'EN',
  },
  {
    internalId: 'GRM-DOC-2026-0115',
    fileName: 'Reamwell-office-lease-2026 (1).pdf',
    type: 'lease',
    kind: 'contract',
    status: 'ready',
    pct: null,
    source: 'email',
    mime: 'PDF',
    size: '1.2 MB',
    lang: 'EN',
    duplicateOf: 'GRM-DOC-2026-0118',
  },
  {
    internalId: 'GRM-DOC-2026-0114',
    fileName: 'Gearmont-scanned-batch.pdf',
    type: null,
    kind: 'other',
    status: 'processing',
    pct: null,
    source: 'upload',
    mime: 'PDF',
    size: '4.6 MB',
    lang: 'EN',
  },
]

type Copy = {
  ui: Record<UiKey, string>
  /** Per-row prose the figure shows, translated like the rest of the article. */
  summaries: Record<string, string>
  /** documents.duplicate_of with its {id} filled in. */
  rendered: { duplicateOf: string }
  help: { alt: string }
}

const en: Copy = {
  ui: {
    'documents.title': "Documents",
    'documents.description': "Contracts, invoice attachments and other documents that aren't invoices or bank statements. Forward them by email, or upload them here.",
    'documents.upload': "Upload",
    'documents.filter.all': "All",
    'documents.filter.contracts': "Contracts",
    'documents.filter.other': "Other",
    'documents.filter.review': "Needs review",
    'documents.filter.duplicates': "Duplicates",
    'documents.filter.attachments': "Unlinked attachments",
    'documents.status.ready': "Ready",
    'documents.status.review': "Review",
    'documents.status.processing': "Processing",
    'documents.type.contract': "Contract",
    'documents.type.other': "Other",
    'documents.duplicate_of': "Duplicate of {id}",
    'documents.duplicate_label': "Duplicate",
    'documents.source.email': "Email",
    'documents.source.upload': "Upload",
  },
  summaries: {
    'GRM-DOC-2026-0118': "Five-year lease for the Dunham Street unit, with a rent review in year three.",
    'GRM-DOC-2026-0117': "A German chart of accounts, listing cost groups and their numbers.",
    'GRM-DOC-2026-0116': "A services agreement; the parties and the term are stated, the fee schedule is an annex.",
  },
  rendered: { duplicateOf: "Duplicate of GRM-DOC-2026-0118" },
  help: { alt: "The Documents list: six filters with a count on Duplicates, then five rows, each with its reference, file name, one-line summary, source and size, a type badge, a confidence percentage and a status badge. One badge reads Kontenrahmen, in the document's own language; the contracts read Contract. One row is marked a duplicate of an earlier one, and the last row sits on Processing." },
}

const hu: Copy = {
  ui: {
    'documents.title': "Dokumentumok",
    'documents.description': "Szerződések, számlamellékletek és egyéb dokumentumok, amelyek nem számlák vagy bankkivonatok. Továbbítsd őket e-mailben, vagy töltsd fel itt.",
    'documents.upload': "Feltöltés",
    'documents.filter.all': "Mind",
    'documents.filter.contracts': "Szerződések",
    'documents.filter.other': "Egyéb",
    'documents.filter.review': "Ellenőrzendő",
    'documents.filter.duplicates': "Duplikátumok",
    'documents.filter.attachments': "Nem kapcsolt mellékletek",
    'documents.status.ready': "Kész",
    'documents.status.review': "Ellenőrzés",
    'documents.status.processing': "Feldolgozás",
    'documents.type.contract': "Szerződés",
    'documents.type.other': "Egyéb",
    'documents.duplicate_of': "{id} duplikátuma",
    'documents.duplicate_label': "Duplikátum",
    'documents.source.email': "E-mail",
    'documents.source.upload': "Feltöltés",
  },
  summaries: {
    'GRM-DOC-2026-0118': "Ötéves bérleti szerződés a Dunham Street-i egységre, a harmadik évben bérleti díj felülvizsgálattal.",
    'GRM-DOC-2026-0117': "Német számlatükör, a költségcsoportok és azok számainak felsorolásával.",
    'GRM-DOC-2026-0116': "Szolgáltatási szerződés; a felek és a futamidő szerepel benne, a díjszabás melléklet.",
  },
  rendered: { duplicateOf: "GRM-DOC-2026-0118 duplikátuma" },
  help: { alt: "A Dokumentumok lista: hat szűrő, a Duplikátumokon darabszámmal, majd öt sor, mindegyikben a hivatkozási szám, a fájlnév, egy egysoros összefoglaló, a forrás és a méret, egy típuscímke, egy magabiztossági százalék és egy állapotcímke. Az egyik címke Kontenrahmen, a dokumentum saját nyelvén; a szerződéseken Szerződés áll. Egy sor egy korábbi duplikátumaként van megjelölve, az utolsó sor pedig Feldolgozás állapotban áll." },
}

const de: Copy = {
  ui: {
    'documents.title': "Dokumente",
    'documents.description': "Verträge, Rechnungsanhänge und andere Dokumente, die keine Rechnungen oder Kontoauszüge sind. Leiten Sie sie per E-Mail weiter oder laden Sie sie hier hoch.",
    'documents.upload': "Hochladen",
    'documents.filter.all': "Alle",
    'documents.filter.contracts': "Verträge",
    'documents.filter.other': "Andere",
    'documents.filter.review': "Zu prüfen",
    'documents.filter.duplicates': "Duplikate",
    'documents.filter.attachments': "Nicht verknüpfte Anhänge",
    'documents.status.ready': "Bereit",
    'documents.status.review': "Prüfen",
    'documents.status.processing': "Verarbeitung",
    'documents.type.contract': "Vertrag",
    'documents.type.other': "Andere",
    'documents.duplicate_of': "Duplikat von {id}",
    'documents.duplicate_label': "Duplikat",
    'documents.source.email': "E-Mail",
    'documents.source.upload': "Upload",
  },
  summaries: {
    'GRM-DOC-2026-0118': "Fünfjähriger Mietvertrag für die Einheit in der Dunham Street, mit Mietanpassung im dritten Jahr.",
    'GRM-DOC-2026-0117': "Ein deutscher Kontenrahmen mit den Kostengruppen und ihren Nummern.",
    'GRM-DOC-2026-0116': "Ein Dienstleistungsvertrag; Parteien und Laufzeit sind genannt, die Preisliste ist eine Anlage.",
  },
  rendered: { duplicateOf: "Duplikat von GRM-DOC-2026-0118" },
  help: { alt: "Die Dokumentenliste: sechs Filter, bei Duplikate mit einer Anzahl, darunter fünf Zeilen mit Referenz, Dateiname, einer einzeiligen Zusammenfassung, Quelle und Größe, einem Typ-Badge, einem Konfidenzwert in Prozent und einem Status-Badge. Ein Badge steht in der Sprache des Dokuments, Kontenrahmen; bei den Verträgen steht Vertrag. Eine Zeile ist als Duplikat einer früheren markiert, und die letzte Zeile steht auf Verarbeitung." },
}

export const documentsCopy: Record<Locale, Copy> = { en, hu, de }
