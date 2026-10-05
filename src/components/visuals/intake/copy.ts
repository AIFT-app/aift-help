// Where each kind of forwarded attachment lands, for the email-forwarding
// article.
//
// Destination names are verbatim from aift-web messages/<locale>.json
// (origin/main 2026-09-23; the two attachment labels from aift-web
// feat/invoice-attachments, PRD invoice-attachments), keyed by message key so scratchpad/drift-any.py
// catches a change. The kind names and the notes are this article's own text:
// the classifier's categories have no user-facing label of their own outside
// the reclassify control, and the notes describe behaviour, not UI.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'nav.workspace.invoices',
  'nav.workspace.transactions',
  'nav.workspace.documents',
  'inbox.detail.doc_status_awaiting_extractor',
  'inbox.list.tab_review',
  'invoices.detail.tabs.attachments',
  'documents.filter.attachments',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Row = { kind: string; dest: string; note: string; tone: 'ok' | 'wait' | 'office' }

type Copy = {
  ui: Record<UiKey, string>
  heading: string
  colKind: string
  colDest: string
  rows: readonly Row[]
  footnote: string
  alt: string
}

const en: Copy = {
  ui: {
    'nav.workspace.invoices': 'Invoices',
    'nav.workspace.transactions': 'Bank transactions',
    'nav.workspace.documents': 'Documents',
    'inbox.detail.doc_status_awaiting_extractor': 'Awaiting extractor',
    'inbox.list.tab_review': 'Needs review',
    'invoices.detail.tabs.attachments': 'Attachments',
    'documents.filter.attachments': 'Unlinked attachments',
  },
  heading: 'One email, five destinations',
  colKind: 'What it is classified as',
  colDest: 'Where it goes',
  rows: [
    { kind: 'Invoice, receipt, credit note', dest: 'Invoices', note: 'Read and extracted like any upload.', tone: 'ok' },
    { kind: 'Supporting document, Excel or Word file', dest: 'Attachments', note: 'Timesheets, certificates, delivery notes, card-terminal slips. Linked to the invoice if the email holds exactly one; otherwise it waits under Unlinked attachments on Documents.', tone: 'ok' },
    { kind: 'Bank statement', dest: 'Awaiting extractor', note: 'Parked. No badge, no queue: upload it on Bank transactions.', tone: 'wait' },
    { kind: 'Contract, anything else', dest: 'Documents', note: 'Accountant-side only. Not under Needs review.', tone: 'office' },
    { kind: 'Classified with low confidence', dest: 'Needs review', note: 'Flagged for a person, whether or not it also went to extraction.', tone: 'wait' },
  ],
  footnote: 'Nothing is ever sent back to the sender, for success or failure.',
  alt: 'A table of the five places a forwarded attachment can land: Invoices, the invoice Attachments tab or Unlinked attachments for supporting documents, parked as Awaiting extractor, the accountant-side Documents page, or flagged under Needs review.',
}

const hu: Copy = {
  ui: {
    'nav.workspace.invoices': 'Számlák',
    'nav.workspace.transactions': 'Banki tranzakciók',
    'nav.workspace.documents': 'Dokumentumok',
    'inbox.detail.doc_status_awaiting_extractor': 'Kinyerőre vár',
    'inbox.list.tab_review': 'Áttekintés szükséges',
    'invoices.detail.tabs.attachments': 'Mellékletek',
    'documents.filter.attachments': 'Nem kapcsolt mellékletek',
  },
  heading: 'Egy e-mail, öt végállomás',
  colKind: 'Minek sorolja be a rendszer',
  colDest: 'Hová kerül',
  rows: [
    { kind: 'Számla, nyugta, sztornó számla', dest: 'Számlák', note: 'Ugyanúgy beolvassa és kinyeri, mint bármely feltöltést.', tone: 'ok' },
    { kind: 'Alátámasztó dokumentum, Excel- vagy Word-fájl', dest: 'Mellékletek', note: 'Munkaidő-kimutatás, teljesítésigazolás, szállítólevél, kártyaterminál-bizonylat. Ha az e-mailben pontosan egy számla van, ahhoz kapcsolja; különben a Dokumentumok oldalon, a Nem kapcsolt mellékletek között várakozik.', tone: 'ok' },
    { kind: 'Bankkivonat', dest: 'Kinyerőre vár', note: 'Félreteszi. Nincs jelölés, nincs sor: a Banki tranzakciók oldalon töltse fel.', tone: 'wait' },
    { kind: 'Szerződés, bármi más', dest: 'Dokumentumok', note: 'Csak könyvelői oldalon. Nem kerül az Áttekintés szükséges alá.', tone: 'office' },
    { kind: 'Alacsony magabiztossággal besorolva', dest: 'Áttekintés szükséges', note: 'Emberi döntésre jelölve, akkor is, ha kinyerésre is ment.', tone: 'wait' },
  ],
  footnote: 'A feladó soha nem kap visszajelzést, sem sikerről, sem hibáról.',
  alt: 'Táblázat az öt helyről, ahová egy továbbított melléklet kerülhet: Számlák, alátámasztó dokumentumként a számla Mellékletek füle vagy a Nem kapcsolt mellékletek, Kinyerőre vár állapotban félretéve, a könyvelői Dokumentumok oldal, vagy az Áttekintés szükséges alá jelölve.',
}

const de: Copy = {
  ui: {
    'nav.workspace.invoices': 'Rechnungen',
    'nav.workspace.transactions': 'Banktransaktionen',
    'nav.workspace.documents': 'Dokumente',
    'inbox.detail.doc_status_awaiting_extractor': 'Wartet auf Extraktor',
    'inbox.list.tab_review': 'Prüfung erforderlich',
    'invoices.detail.tabs.attachments': 'Anhänge',
    'documents.filter.attachments': 'Nicht verknüpfte Anhänge',
  },
  heading: 'Eine E-Mail, fünf Ziele',
  colKind: 'Wie es klassifiziert wird',
  colDest: 'Wohin es geht',
  rows: [
    { kind: 'Rechnung, Beleg, Gutschrift', dest: 'Rechnungen', note: 'Wird gelesen und extrahiert wie jeder Upload.', tone: 'ok' },
    { kind: 'Nachweisdokument, Excel- oder Word-Datei', dest: 'Anhänge', note: 'Stundenzettel, Leistungsnachweise, Lieferscheine, Kartenterminal-Belege. Mit der Rechnung verknüpft, wenn die E-Mail genau eine enthält; sonst wartet es unter Nicht verknüpfte Anhänge auf der Seite Dokumente.', tone: 'ok' },
    { kind: 'Kontoauszug', dest: 'Wartet auf Extraktor', note: 'Geparkt. Keine Markierung, keine Warteschlange: unter Banktransaktionen hochladen.', tone: 'wait' },
    { kind: 'Vertrag, alles andere', dest: 'Dokumente', note: 'Nur auf Kanzleiseite. Nicht unter Prüfung erforderlich.', tone: 'office' },
    { kind: 'Mit geringer Sicherheit klassifiziert', dest: 'Prüfung erforderlich', note: 'Für eine Person markiert, auch wenn es zusätzlich extrahiert wurde.', tone: 'wait' },
  ],
  footnote: 'An den Absender geht nie eine Rückmeldung, weder bei Erfolg noch bei Fehlern.',
  alt: 'Eine Tabelle der fünf Orte, an denen ein weitergeleiteter Anhang landen kann: Rechnungen, als Nachweisdokument der Reiter Anhänge der Rechnung oder Nicht verknüpfte Anhänge, geparkt als Wartet auf Extraktor, die kanzleiseitige Seite Dokumente, oder markiert unter Prüfung erforderlich.',
}

export const intakeCopy: Record<Locale, Copy> = { en, hu, de }
