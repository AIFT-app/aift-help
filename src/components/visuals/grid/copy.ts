// Labels for the spreadsheet-interface screen, keyed by their aift-web message
// key so a drift check can compare them against messages/<locale>.json.
//
// Sources: `selection_grid.*` (the shared grid chrome) and
// `master_data_import.*` (the column headers, the Status pill and the Note,
// which belong to the import that hosts the grid).
//
// The rows are an imported list of accounting categories: fictional, and the
// names ARE translated, because a category name is the accountant's own text
// in their own language (the same choice vat-lines/copy.ts makes). The search
// term differs per locale for the same reason — it has to match the same three
// rows in each, or the "1 / 3" counter and the "all 3 matches" button would
// contradict the picture.

import type { Locale } from '@/lib/i18n'

/** One row of the import review. `state` drives how the grid draws it. */
export type GridRow = {
  code: string
  /** The group row it sits under (the first two digits of the code). */
  group: string
  /** 'match' is highlighted, 'dim' is faded by the search, 'locked' cannot be ticked. */
  state: 'match' | 'dim' | 'locked'
  ticked: boolean
  /** The one row carrying the blue selection and the cursor outline. */
  selected?: boolean
  income?: boolean
  /** The numbered marker this row carries, if any. */
  pin?: number
}

/** Six rows in three groups: every state the article names, once. */
export const ROWS: GridRow[] = [
  { code: '5210', group: '52', state: 'match', ticked: true, selected: true, pin: 4 },
  { code: '5220', group: '52', state: 'dim', ticked: true, pin: 5 },
  { code: '5230', group: '52', state: 'locked', ticked: false, pin: 6 },
  { code: '5330', group: '53', state: 'dim', ticked: true },
  { code: '5340', group: '53', state: 'match', ticked: true },
  { code: '9110', group: '91', state: 'dim', ticked: true, income: true },
]

/** `of_listed` per group row: ticked of tickable. 5230 is locked, so 52 is 2 of 2. */
export const GROUPS: Record<string, { on: number; of: number }> = {
  '52': { on: 2, of: 2 },
  '53': { on: 2, of: 2 },
  '91': { on: 1, of: 1 },
}

export const TICKED = 5
export const MATCHES = 3
export const TOTAL_ROWS = 6

type Copy = {
  /** Verbatim from messages/<locale>.json, by key. */
  ui: {
    'selection_grid.shortcuts': string
    'selection_grid.only_matches': string
    'selection_grid.find_prev': string
    'selection_grid.find_next': string
    'selection_grid.find_clear': string
    'selection_grid.select_all': string
    'selection_grid.cancel': string
    'selection_grid.review': string
    'selection_grid.hint_move': string
    'selection_grid.hint_more_rows': string
    'selection_grid.hint_tick': string
    'selection_grid.hint_search': string
    'selection_grid.hint_name': string
    'selection_grid.hint_direction': string
    'selection_grid.keys.shift': string
    'selection_grid.keys.space': string
    'master_data_import.grid.subtitle': string
    'master_data_import.grid.title': string
    'master_data_import.grid.search': string
    'master_data_import.grid.find_placeholder': string
    'master_data_import.grid.locked_title': string
    'master_data_import.grid.col_status': string
    'master_data_import.grid.col_reason': string
    'master_data_import.field.code': string
    'master_data_import.field.name': string
    'master_data_import.field.direction': string
    'master_data_import.direction_summary.label.expense': string
    'master_data_import.direction_summary.label.income': string
    'master_data_import.action.create': string
    'master_data_import.action.skip_exact': string
    'master_data_import.reason.code_exists': string
  }
  /** Strings the app builds from an ICU pattern, rendered out. */
  rendered: {
    untickAllMatches: string
    findCount: string
    statusRow: string
    tickedSummary: string
    filterCode: string
    filterStatus: string
    ofListed: (on: number, of: number) => string
  }
  /** The search term, and the category names it has to match. */
  query: string
  names: Record<string, string>
  help: { alt: string }
}

const en: Copy = {
  ui: {
    'selection_grid.shortcuts': 'Shortcuts',
    'selection_grid.only_matches': 'Matches only',
    'selection_grid.find_prev': 'Previous match',
    'selection_grid.find_next': 'Next match',
    'selection_grid.find_clear': 'Clear the search',
    'selection_grid.select_all': 'Select all',
    'selection_grid.cancel': 'Cancel',
    'selection_grid.review': 'Review',
    'selection_grid.hint_move': 'move',
    'selection_grid.hint_more_rows': 'more rows',
    'selection_grid.hint_tick': 'tick',
    'selection_grid.hint_search': 'or just type: search',
    'selection_grid.hint_name': 'name',
    'selection_grid.hint_direction': 'direction',
    'selection_grid.keys.shift': 'Shift',
    'selection_grid.keys.space': 'Space',
    'master_data_import.grid.subtitle':
      'Works like a spreadsheet. Arrow keys move, Shift and an arrow selects several rows, Space ticks them, F2 edits the name. Search highlights the matches and leaves the other rows where they are. Only ticked rows are created.',
    'master_data_import.grid.title': 'Rows of the file',
    'master_data_import.grid.search': 'Search the rows of the file',
    'master_data_import.grid.find_placeholder': 'Search: start of the code or tax number, or a name',
    'master_data_import.grid.locked_title': 'This row cannot be created. The reason is in the Note column.',
    'master_data_import.grid.col_status': 'Status',
    'master_data_import.grid.col_reason': 'Note',
    'master_data_import.field.code': 'Code',
    'master_data_import.field.name': 'Name',
    'master_data_import.field.direction': 'Direction',
    'master_data_import.direction_summary.label.expense': 'Expense',
    'master_data_import.direction_summary.label.income': 'Income',
    'master_data_import.action.create': 'Create',
    'master_data_import.action.skip_exact': 'Exists',
    'master_data_import.reason.code_exists': 'code already used',
  },
  rendered: {
    untickAllMatches: 'Untick all 3 matches',
    findCount: '1 / 3',
    statusRow: 'Row 1 of 6',
    tickedSummary: '5 rows ticked',
    filterCode: 'Filter: Code',
    filterStatus: 'Filter: Status',
    ofListed: (on, of) => `${on} of ${of}`,
  },
  query: 'office',
  names: {
    '5210': 'Office rent',
    '5220': 'Courier charges',
    '5230': 'Office cleaning',
    '5330': 'Software licences',
    '5340': 'Office supplies',
    '9110': 'Consulting income',
  },
  help: {
    alt: 'The review step of an import: a search term highlights three rows, the others stay in place but faded, one row is selected in blue, five rows are ticked and one grey row cannot be ticked at all.',
  },
}

const hu: Copy = {
  ui: {
    'selection_grid.shortcuts': 'Billentyűk',
    'selection_grid.only_matches': 'Csak a találatok',
    'selection_grid.find_prev': 'Előző találat',
    'selection_grid.find_next': 'Következő találat',
    'selection_grid.find_clear': 'Keresés törlése',
    'selection_grid.select_all': 'Mindet kijelölöm',
    'selection_grid.cancel': 'Mégse',
    'selection_grid.review': 'Átnézem',
    'selection_grid.hint_move': 'mozgás',
    'selection_grid.hint_more_rows': 'több sor',
    'selection_grid.hint_tick': 'pipa',
    'selection_grid.hint_search': 'vagy gépelés: keresés',
    'selection_grid.hint_name': 'név',
    'selection_grid.hint_direction': 'irány',
    'selection_grid.keys.shift': 'Shift',
    'selection_grid.keys.space': 'Szóköz',
    'master_data_import.grid.subtitle':
      'Táblázatos felület: nyilakkal lépkedsz, Shift+nyíllal több sort jelölsz ki, a Szóköz pipál, F2-vel átírod a nevet. A keresés kiemeli a találatokat, a többi sor a helyén marad. Csak a bepipált sorok jönnek létre.',
    'master_data_import.grid.title': 'A fájl sorai',
    'master_data_import.grid.search': 'Keresés a fájl sorai közt',
    'master_data_import.grid.find_placeholder': 'Keresés: kód vagy adószám eleje, vagy név',
    'master_data_import.grid.locked_title': 'Ez a sor nem hozható létre. Az ok a Megjegyzés oszlopban áll.',
    'master_data_import.grid.col_status': 'Állapot',
    'master_data_import.grid.col_reason': 'Megjegyzés',
    'master_data_import.field.code': 'Kód',
    'master_data_import.field.name': 'Név',
    'master_data_import.field.direction': 'Irány',
    'master_data_import.direction_summary.label.expense': 'Kiadás',
    'master_data_import.direction_summary.label.income': 'Bevétel',
    'master_data_import.action.create': 'Létrehozás',
    'master_data_import.action.skip_exact': 'Létezik',
    'master_data_import.reason.code_exists': 'a kód már foglalt',
  },
  rendered: {
    untickAllMatches: 'Mind a(z) 3 találat pipájának levétele',
    findCount: '1 / 3',
    statusRow: '1. sor / 6',
    tickedSummary: '5 sor bepipálva',
    filterCode: 'Szűrés: Kód',
    filterStatus: 'Szűrés: Állapot',
    ofListed: (on, of) => `${on} / ${of}`,
  },
  query: 'iroda',
  names: {
    '5210': 'Irodabérlet',
    '5220': 'Futárszolgálat',
    '5230': 'Irodatakarítás',
    '5330': 'Szoftverlicencek',
    '5340': 'Irodaszer',
    '9110': 'Tanácsadási bevétel',
  },
  help: {
    alt: 'Az import átnézési lépése: a keresés három sort kiemel, a többi a helyén marad, de elhalványul, egy sor kék kijelölést kap, öt sor be van pipálva, egy szürke sor pedig egyáltalán nem pipálható.',
  },
}

const de: Copy = {
  ui: {
    'selection_grid.shortcuts': 'Tastenkürzel',
    'selection_grid.only_matches': 'Nur Treffer',
    'selection_grid.find_prev': 'Vorheriger Treffer',
    'selection_grid.find_next': 'Nächster Treffer',
    'selection_grid.find_clear': 'Suche löschen',
    'selection_grid.select_all': 'Alle auswählen',
    'selection_grid.cancel': 'Abbrechen',
    'selection_grid.review': 'Prüfen',
    'selection_grid.hint_move': 'bewegen',
    'selection_grid.hint_more_rows': 'mehrere Zeilen',
    'selection_grid.hint_tick': 'Haken',
    'selection_grid.hint_search': 'oder einfach tippen: Suche',
    'selection_grid.hint_name': 'Bezeichnung',
    'selection_grid.hint_direction': 'Richtung',
    'selection_grid.keys.shift': 'Umschalt',
    'selection_grid.keys.space': 'Leertaste',
    'master_data_import.grid.subtitle':
      'Funktioniert wie eine Tabellenkalkulation. Pfeiltasten bewegen, Shift und Pfeil wählen mehrere Zeilen, die Leertaste hakt ab, F2 ändert den Namen. Die Suche hebt Treffer hervor und lässt die übrigen Zeilen an ihrem Platz. Nur abgehakte Zeilen werden angelegt.',
    'master_data_import.grid.title': 'Zeilen der Datei',
    'master_data_import.grid.search': 'Zeilen der Datei durchsuchen',
    'master_data_import.grid.find_placeholder': 'Suche: Anfang des Codes oder der Steuernummer, oder ein Name',
    'master_data_import.grid.locked_title': 'Diese Zeile kann nicht angelegt werden. Der Grund steht in der Spalte Hinweis.',
    'master_data_import.grid.col_status': 'Status',
    'master_data_import.grid.col_reason': 'Hinweis',
    'master_data_import.field.code': 'Code',
    'master_data_import.field.name': 'Name',
    'master_data_import.field.direction': 'Richtung',
    'master_data_import.direction_summary.label.expense': 'Ausgabe',
    'master_data_import.direction_summary.label.income': 'Einnahme',
    'master_data_import.action.create': 'Erstellen',
    'master_data_import.action.skip_exact': 'Vorhanden',
    'master_data_import.reason.code_exists': 'Code bereits verwendet',
  },
  rendered: {
    untickAllMatches: 'Bei allen 3 Treffern den Haken entfernen',
    findCount: '1 / 3',
    statusRow: 'Zeile 1 von 6',
    tickedSummary: '5 Zeilen abgehakt',
    filterCode: 'Filter: Code',
    filterStatus: 'Filter: Status',
    ofListed: (on, of) => `${on} von ${of}`,
  },
  query: 'büro',
  names: {
    '5210': 'Büromiete',
    '5220': 'Kurierkosten',
    '5230': 'Büroreinigung',
    '5330': 'Softwarelizenzen',
    '5340': 'Bürobedarf',
    '9110': 'Beratungserlöse',
  },
  help: {
    alt: 'Der Prüfschritt eines Imports: ein Suchbegriff hebt drei Zeilen hervor, die anderen bleiben an ihrem Platz, sind aber ausgegraut, eine Zeile ist blau ausgewählt, fünf Zeilen sind abgehakt und eine graue Zeile lässt sich gar nicht abhaken.',
  },
}

export const gridCopy: Record<Locale, Copy> = { en, hu, de }
