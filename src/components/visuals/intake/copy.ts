// Where each kind of forwarded attachment lands, for the email-forwarding
// article.
//
// Destination names are verbatim from aift-web messages/<locale>.json
// (origin/main 2026-09-23), keyed by message key so scratchpad/drift-any.py
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
  },
  heading: 'One email, four destinations',
  colKind: 'What it is classified as',
  colDest: 'Where it goes',
  rows: [
    { kind: 'Invoice, receipt, credit note', dest: 'Invoices', note: 'Read and extracted like any upload.', tone: 'ok' },
    { kind: 'Bank statement', dest: 'Awaiting extractor', note: 'Parked. No badge, no queue: upload it on Bank transactions.', tone: 'wait' },
    { kind: 'Contract, anything else', dest: 'Documents', note: 'Accountant-side only. Not under Needs review.', tone: 'office' },
    { kind: 'Classified with low confidence', dest: 'Needs review', note: 'Flagged for a person, whether or not it also went to extraction.', tone: 'wait' },
  ],
  footnote: 'Nothing is ever sent back to the sender, for success or failure.',
  alt: 'A table of the four places a forwarded attachment can land: Invoices, parked as Awaiting extractor, the accountant-side Documents page, or flagged under Needs review.',
}

const hu: Copy = {
  ui: {
    'nav.workspace.invoices': 'Számlák',
    'nav.workspace.transactions': 'Banki tranzakciók',
    'nav.workspace.documents': 'Dokumentumok',
    'inbox.detail.doc_status_awaiting_extractor': 'Kinyerőre vár',
    'inbox.list.tab_review': 'Áttekintés szükséges',
  },
  heading: 'Egy e-mail, négy végállomás',
  colKind: 'Minek sorolja be a rendszer',
  colDest: 'Hová kerül',
  rows: [
    { kind: 'Számla, nyugta, sztornó számla', dest: 'Számlák', note: 'Ugyanúgy beolvassa és kinyeri, mint bármely feltöltést.', tone: 'ok' },
    { kind: 'Bankkivonat', dest: 'Kinyerőre vár', note: 'Félreteszi. Nincs jelölés, nincs sor: a Banki tranzakciók oldalon töltse fel.', tone: 'wait' },
    { kind: 'Szerződés, bármi más', dest: 'Dokumentumok', note: 'Csak könyvelői oldalon. Nem kerül az Áttekintés szükséges alá.', tone: 'office' },
    { kind: 'Alacsony magabiztossággal besorolva', dest: 'Áttekintés szükséges', note: 'Emberi döntésre jelölve, akkor is, ha kinyerésre is ment.', tone: 'wait' },
  ],
  footnote: 'A feladó soha nem kap visszajelzést, sem sikerről, sem hibáról.',
  alt: 'Táblázat a négy helyről, ahová egy továbbított melléklet kerülhet: Számlák, Kinyerőre vár állapotban félretéve, a könyvelői Dokumentumok oldal, vagy az Áttekintés szükséges alá jelölve.',
}

const de: Copy = {
  ui: {
    'nav.workspace.invoices': 'Rechnungen',
    'nav.workspace.transactions': 'Banktransaktionen',
    'nav.workspace.documents': 'Dokumente',
    'inbox.detail.doc_status_awaiting_extractor': 'Wartet auf Extraktor',
    'inbox.list.tab_review': 'Prüfung erforderlich',
  },
  heading: 'Eine E-Mail, vier Ziele',
  colKind: 'Wie es klassifiziert wird',
  colDest: 'Wohin es geht',
  rows: [
    { kind: 'Rechnung, Beleg, Gutschrift', dest: 'Rechnungen', note: 'Wird gelesen und extrahiert wie jeder Upload.', tone: 'ok' },
    { kind: 'Kontoauszug', dest: 'Wartet auf Extraktor', note: 'Geparkt. Keine Markierung, keine Warteschlange: unter Banktransaktionen hochladen.', tone: 'wait' },
    { kind: 'Vertrag, alles andere', dest: 'Dokumente', note: 'Nur auf Kanzleiseite. Nicht unter Prüfung erforderlich.', tone: 'office' },
    { kind: 'Mit geringer Sicherheit klassifiziert', dest: 'Prüfung erforderlich', note: 'Für eine Person markiert, auch wenn es zusätzlich extrahiert wurde.', tone: 'wait' },
  ],
  footnote: 'An den Absender geht nie eine Rückmeldung, weder bei Erfolg noch bei Fehlern.',
  alt: 'Eine Tabelle der vier Orte, an denen ein weitergeleiteter Anhang landen kann: Rechnungen, geparkt als Wartet auf Extraktor, die kanzleiseitige Seite Dokumente, oder markiert unter Prüfung erforderlich.',
}

export const intakeCopy: Record<Locale, Copy> = { en, hu, de }
