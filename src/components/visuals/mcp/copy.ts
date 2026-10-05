// Labels for the MCP consent screen, verbatim from aift-web messages/<locale>.json
// (mcp_consent.*, origin/main 2026-09-22; scope_write_desc updated 2026-10-05
// by mcp-consent-write-scope-copy), keyed by message key so
// scratchpad/drift-any.py catches a change in the app. `rendered` holds the two
// strings the page fills in at run time. `help` is this article's own text.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'mcp_consent.title',
  'mcp_consent.intro',
  'mcp_consent.scope_read_label',
  'mcp_consent.scope_read_desc',
  'mcp_consent.scope_write_label',
  'mcp_consent.scope_write_desc',
  'mcp_consent.no_money_movement',
  'mcp_consent.signed_in_as',
  'mcp_consent.approve',
  'mcp_consent.deny',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  rendered: { intro: string; signedIn: string }
  help: { alt: string }
}

/** Fictional, as the house rule requires: nobody's real address. */
const EMAIL = 'j.moreau@quillmoor.example'
const CLIENT = 'Claude'

const en: Copy = {
  ui: {
    'mcp_consent.title': 'Connect to AIFT',
    'mcp_consent.intro': '{client} is requesting access to your AIFT workspaces.',
    'mcp_consent.scope_read_label': 'Read your books',
    'mcp_consent.scope_read_desc': 'View workspaces, invoices, bank transactions, categories, reports, partners, and companies. No changes are made.',
    'mcp_consent.scope_write_label': 'Make changes',
    'mcp_consent.scope_write_desc': "Mark and unmark bank transactions as “no invoice needed”, categorize invoices and transactions, confirm and undo matches, edit an invoice's direction, partner or company, and link or verify partners. Every change is logged with its before and after values.",
    'mcp_consent.no_money_movement': 'This connection cannot move money, transfer funds, or change account credentials. Only bookkeeping data.',
    'mcp_consent.signed_in_as': 'Signed in as {email}',
    'mcp_consent.approve': 'Allow',
    'mcp_consent.deny': 'Cancel',
  },
  rendered: {
    intro: `${CLIENT} is requesting access to your AIFT workspaces.`,
    signedIn: `Signed in as ${EMAIL}`,
  },
  help: { alt: 'The consent screen: a card titled Connect to AIFT with two tick boxes, Read your books and Make changes, a note that the connection cannot move money, and the Allow and Cancel buttons.' },
}

const hu: Copy = {
  ui: {
    'mcp_consent.title': 'Kapcsolódás az AIFT-hez',
    'mcp_consent.intro': '{client} hozzáférést kér az AIFT munkaterületeihez.',
    'mcp_consent.scope_read_label': 'Adatok olvasása',
    'mcp_consent.scope_read_desc': 'Munkaterületek, számlák, banki tételek, kategóriák, riportok, partnerek és cégek megtekintése. Módosítás nem történik.',
    'mcp_consent.scope_write_label': 'Módosítások végrehajtása',
    'mcp_consent.scope_write_desc': 'Banki tételek „nem kell számla” jelölése és a jelölés visszavonása, számlák és banki tételek kategorizálása, párosítások megerősítése és visszavonása, a számla irányának, partnerének vagy cégének szerkesztése, valamint partnerek összekötése vagy ellenőrzése. Minden módosítás a módosítás előtti és utáni értékkel együtt naplóba kerül.',
    'mcp_consent.no_money_movement': 'Ez a kapcsolat nem mozgathat pénzt, nem indíthat utalást és nem módosíthat banki hozzáférési adatokat. Csak könyvelési adatokon dolgozik.',
    'mcp_consent.signed_in_as': 'Bejelentkezve: {email}',
    'mcp_consent.approve': 'Engedélyezés',
    'mcp_consent.deny': 'Mégse',
  },
  rendered: {
    intro: `${CLIENT} hozzáférést kér az AIFT munkaterületeihez.`,
    signedIn: `Bejelentkezve: ${EMAIL}`,
  },
  help: { alt: 'A hozzájárulási képernyő: a Kapcsolódás az AIFT-hez című kártyán két jelölőnégyzet, az Adatok olvasása és a Módosítások végrehajtása, egy megjegyzés arról, hogy a kapcsolat nem mozgathat pénzt, valamint az Engedélyezés és a Mégse gomb.' },
}

const de: Copy = {
  ui: {
    'mcp_consent.title': 'Mit AIFT verbinden',
    'mcp_consent.intro': '{client} möchte Zugriff auf Ihre AIFT-Arbeitsbereiche.',
    'mcp_consent.scope_read_label': 'Daten lesen',
    'mcp_consent.scope_read_desc': 'Arbeitsbereiche, Rechnungen, Banktransaktionen, Kategorien, Berichte, Partner und Unternehmen ansehen. Keine Änderungen.',
    'mcp_consent.scope_write_label': 'Änderungen vornehmen',
    'mcp_consent.scope_write_desc': 'Banktransaktionen als „Keine Rechnung erforderlich“ markieren und die Markierung aufheben, Rechnungen und Banktransaktionen kategorisieren, Zuordnungen bestätigen und rückgängig machen, Richtung, Partner oder Unternehmen einer Rechnung bearbeiten sowie Partner verknüpfen oder verifizieren. Jede Änderung wird mit ihren Werten vorher und nachher protokolliert.',
    'mcp_consent.no_money_movement': 'Diese Verbindung kann kein Geld bewegen, keine Überweisungen tätigen und keine Bank-Zugangsdaten ändern. Nur Buchhaltungsdaten.',
    'mcp_consent.signed_in_as': 'Angemeldet als {email}',
    'mcp_consent.approve': 'Erlauben',
    'mcp_consent.deny': 'Abbrechen',
  },
  rendered: {
    intro: `${CLIENT} möchte Zugriff auf Ihre AIFT-Arbeitsbereiche.`,
    signedIn: `Angemeldet als ${EMAIL}`,
  },
  help: { alt: 'Der Zustimmungsbildschirm: eine Karte mit dem Titel Mit AIFT verbinden, zwei Kontrollkästchen, Daten lesen und Änderungen vornehmen, ein Hinweis, dass die Verbindung kein Geld bewegen kann, sowie die Schaltflächen Erlauben und Abbrechen.' },
}

export const mcpCopy: Record<Locale, Copy> = { en, hu, de }
