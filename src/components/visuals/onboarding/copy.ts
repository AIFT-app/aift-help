// Labels for the guided new-client walk's itinerary, verbatim from aift-web
// messages/<locale>.json (dashboard.guided.*, origin/main 2026-09-23), keyed by
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
  'dashboard.guided.map_2_title',
  'dashboard.guided.map_2_note',
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

/** Mirrors SCREENS in aift-web src/lib/guided-onboarding.ts (origin/main). */
export const SCREENS = [
  { step: 1, gate: true },
  { step: 2, gate: true },
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
    'dashboard.guided.map_1_title': "Workspace",
    'dashboard.guided.map_1_note': "A name and a country. They decide the base currency and the time zone.",
    'dashboard.guided.map_2_title': "The first company",
    'dashboard.guided.map_2_note': "Company name and tax number. Incoming invoices are matched to it.",
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
  help: { alt: "The itinerary shown on the first screen of the new-client walk: seven numbered screens, each with a one-line note, marked required or optional." },
}

const hu: Copy = {
  ui: {
    'dashboard.guided.map_heading': "Ez vár rád",
    'dashboard.guided.map_summary': "{required} lépés kötelező, {optional} kihagyható.",
    'dashboard.guided.map_now': "most",
    'dashboard.guided.map_required': "kötelező",
    'dashboard.guided.map_skippable': "kihagyható",
    'dashboard.guided.map_footer': "Menet közben bármikor felhívhatsz minket. A szám végig ott marad.",
    'dashboard.guided.map_1_title': "Munkaterület",
    'dashboard.guided.map_1_note': "Név és ország. Ebből lesz az alap pénznem és az időzóna.",
    'dashboard.guided.map_2_title': "Az első cég",
    'dashboard.guided.map_2_note': "Cégnév és adószám. Ehhez kötjük a beérkező számlákat.",
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
  help: { alt: "Az új ügyfél beállítási folyamatának első képernyőjén látható útiterv: hét számozott képernyő, mindegyik egysoros megjegyzéssel, kötelező vagy kihagyható jelöléssel." },
}

const de: Copy = {
  ui: {
    'dashboard.guided.map_heading': "Das kommt",
    'dashboard.guided.map_summary': "{required} Schritte sind erforderlich, {optional} können übersprungen werden.",
    'dashboard.guided.map_now': "jetzt",
    'dashboard.guided.map_required': "erforderlich",
    'dashboard.guided.map_skippable': "optional",
    'dashboard.guided.map_footer': "Sie können uns jederzeit anrufen. Die Nummer bleibt die ganze Zeit sichtbar.",
    'dashboard.guided.map_1_title': "Arbeitsbereich",
    'dashboard.guided.map_1_note': "Name und Land. Daraus ergeben sich Basiswährung und Zeitzone.",
    'dashboard.guided.map_2_title': "Das erste Unternehmen",
    'dashboard.guided.map_2_note': "Firmenname und Steuernummer. Daran werden eingehende Rechnungen zugeordnet.",
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
  help: { alt: "Der Fahrplan auf dem ersten Bildschirm der Einrichtung eines neuen Mandanten: sieben nummerierte Bildschirme, jeder mit einer einzeiligen Notiz, als erforderlich oder optional markiert." },
}

export const onboardingCopy: Record<Locale, Copy> = { en, hu, de }
