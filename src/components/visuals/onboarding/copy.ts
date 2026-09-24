// Labels for the guided new-client walk's itinerary, verbatim from aift-web
// messages/<locale>.json (dashboard.guided.*, feat/guided-walk-tax-id-first 2026-09-24), keyed by
// message key so scratchpad/drift-any.py catches a change. `help` is this
// article's own text.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'dashboard.guided.map_heading',
  'dashboard.guided.map_summary',
  'dashboard.guided.map_now',
  'dashboard.guided.map_required',
  'dashboard.guided.map_skippable',
  'dashboard.guided.map_footer',
  'dashboard.guided.map_1_title',
  'dashboard.guided.map_1_note',
  'dashboard.guided.map_3_title',
  'dashboard.guided.map_3_note',
  'dashboard.guided.map_4_title',
  'dashboard.guided.map_4_note',
  'dashboard.guided.map_5_title',
  'dashboard.guided.map_5_note',
  'dashboard.guided.map_6_title',
  'dashboard.guided.map_6_note',
  'dashboard.guided.map_7_title',
  'dashboard.guided.map_7_note',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  help: { alt: string }
}

/**
 * Mirrors SCREENS in aift-web src/lib/guided-onboarding.ts. `step` is the
 * app's screen id, which keeps a gap at 2 since guided-walk-tax-id-first merged
 * screens 1 and 2; the figure shows the position (1 to 6), as the app does.
 */
export const SCREENS = [
  { step: 1, gate: true },
  { step: 3, gate: false },
  { step: 4, gate: false },
  { step: 5, gate: true },
  { step: 6, gate: false },
  { step: 7, gate: false },
] as const


const en: Copy = {
  ui: {
    'dashboard.guided.map_heading': "What's ahead",
    'dashboard.guided.map_summary': "{required} steps are required, {optional} can be skipped.",
    'dashboard.guided.map_now': "now",
    'dashboard.guided.map_required': "required",
    'dashboard.guided.map_skippable': "optional",
    'dashboard.guided.map_footer': "You can call us at any point along the way. The number stays with you the whole time.",
    'dashboard.guided.map_1_title': "The client company",
    'dashboard.guided.map_1_note': "Tax number, company name and country. For a Hungarian company the register fills in the rest.",
    'dashboard.guided.map_3_title': "Bank accounts",
    'dashboard.guided.map_3_note': "The company's account numbers. Bank transactions arrive on these.",
    'dashboard.guided.map_4_title': "Categories",
    'dashboard.guided.map_4_note': "Your office's own list, or ours for now.",
    'dashboard.guided.map_5_title': "Data sources",
    'dashboard.guided.map_5_note': "NAV Online Invoice, bank connection, e-mail inbox.",
    'dashboard.guided.map_6_title': "Export",
    'dashboard.guided.map_6_note': "RLB-60 or HessynKettős, with general ledger numbers.",
    'dashboard.guided.map_7_title': "People",
    'dashboard.guided.map_7_note': "Colleagues and the client, each with their own role.",
  },
  help: { alt: "The itinerary shown on the first screen of the new-client walk: six numbered screens, each with a one-line note, marked required or optional." },
}

const hu: Copy = {
  ui: {
    'dashboard.guided.map_heading': "Ez vár rád",
    'dashboard.guided.map_summary': "{required} lépés kötelező, {optional} kihagyható.",
    'dashboard.guided.map_now': "most",
    'dashboard.guided.map_required': "kötelező",
    'dashboard.guided.map_skippable': "kihagyható",
    'dashboard.guided.map_footer': "Menet közben bármikor felhívhatsz minket. A szám végig ott marad.",
    'dashboard.guided.map_1_title': "Az ügyfél cég",
    'dashboard.guided.map_1_note': "Adószám, cégnév és ország. Magyar cégnél a többit a cégjegyzékből töltjük ki.",
    'dashboard.guided.map_3_title': "Bankszámlák",
    'dashboard.guided.map_3_note': "A cég számlaszámai. Ezekre érkeznek a banki tételek.",
    'dashboard.guided.map_4_title': "Kategóriák",
    'dashboard.guided.map_4_note': "Az iroda saját kontírozási listája, vagy egyelőre a miénk.",
    'dashboard.guided.map_5_title': "Adatforrások",
    'dashboard.guided.map_5_note': "NAV Online Számla, bankkapcsolat, e-mail postafiók.",
    'dashboard.guided.map_6_title': "Export",
    'dashboard.guided.map_6_note': "RLB-60 vagy HessynKettős, főkönyvi számokkal.",
    'dashboard.guided.map_7_title': "Emberek",
    'dashboard.guided.map_7_note': "A kollégák és az ügyfél, mindenki a saját szerepével.",
  },
  help: { alt: "Az új ügyfél beállítási folyamatának első képernyőjén látható útiterv: hat számozott képernyő, mindegyik egysoros megjegyzéssel, kötelező vagy kihagyható jelöléssel." },
}

const de: Copy = {
  ui: {
    'dashboard.guided.map_heading': "Das kommt",
    'dashboard.guided.map_summary': "{required} Schritte sind erforderlich, {optional} können übersprungen werden.",
    'dashboard.guided.map_now': "jetzt",
    'dashboard.guided.map_required': "erforderlich",
    'dashboard.guided.map_skippable': "optional",
    'dashboard.guided.map_footer': "Sie können uns jederzeit anrufen. Die Nummer bleibt die ganze Zeit sichtbar.",
    'dashboard.guided.map_1_title': "Das Mandantenunternehmen",
    'dashboard.guided.map_1_note': "Steuernummer, Firmenname und Land. Bei einem ungarischen Unternehmen füllt das Firmenregister den Rest aus.",
    'dashboard.guided.map_3_title': "Bankkonten",
    'dashboard.guided.map_3_note': "Die Kontonummern des Unternehmens. Darauf kommen die Bankbewegungen an.",
    'dashboard.guided.map_4_title': "Kategorien",
    'dashboard.guided.map_4_note': "Die eigene Liste Ihrer Kanzlei, oder vorerst unsere.",
    'dashboard.guided.map_5_title': "Datenquellen",
    'dashboard.guided.map_5_note': "NAV Online-Rechnung, Bankverbindung, E-Mail-Postfach.",
    'dashboard.guided.map_6_title': "Export",
    'dashboard.guided.map_6_note': "RLB-60 oder HessynKettős, mit Sachkontonummern.",
    'dashboard.guided.map_7_title': "Personen",
    'dashboard.guided.map_7_note': "Die Kolleginnen und Kollegen und der Mandant, jeweils mit eigener Rolle.",
  },
  help: { alt: "Der Fahrplan auf dem ersten Bildschirm der Einrichtung eines neuen Mandanten: sechs nummerierte Bildschirme, jeder mit einer einzeiligen Notiz, als erforderlich oder optional markiert." },
}

export const onboardingCopy: Record<Locale, Copy> = { en, hu, de }
