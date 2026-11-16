// Text and data for the report illustrations (reports).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key (plural-free
// messages only; a `{placeholder}` template is filled in ./index.tsx the way
// next-intl fills it). Hungarian ones are tegező because the app is. `help` holds
// the article's own words (diagram labels, alt text, the names a user gives a
// report and its lines), magázó in Hungarian like every aift-help article.
//
// The report and its figures are FICTIONAL. On an Invoice report income counts
// as plus and expenses as minus, so the calculated lines add them up.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'reports.toolbar.breadcrumb_reports',
  'reports.toolbar.breadcrumb_separator',
  'reports.toolbar.search_lines_placeholder',
  'reports.toolbar.break_down_by',
  'reports.toolbar.break_down_none',
  'reports.toolbar.filter',
  'reports.toolbar.edit_report',
  'date_filter.rolling_this_year',
  'reports.display.label',
  'reports.display.inherit_base',
  'reports.table.calculated_marker',
  'reports.table.click_to_see_detail',
  'reports.line_row.categories',
  'reports.line_row.formula',
  // The broken-down table and the drill-down panel (ReportDrillDownFigure).
  'reports.table.col_line',
  'reports.table.col_unassigned',
  'reports.table.col_total',
  'reports.table.col_only_this',
  'reports.table.coverage_pct',
  'reports.table.coverage_note',
  'reports.drill_down.cell_header',
  'reports.drill_down.assign_scope_label',
  'reports.drill_down.assign_scope_empty_lines',
  'reports.drill_down.assign_scope_line',
  'reports.drill_down.items_total',
  'reports.drill_down.invoice_number_prefix',
  'reports.drill_down.pdf',
  'category_combobox.search_placeholder',
  'common.close',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type ReportRow = { name: string; calculated: boolean; value: number }

/** One line of the broken-down report: its two cost-centre cells and its
 *  Unassigned cell. The line's Total is their sum. */
export type MatrixCells = [number, number, number]

/** An entry in the drill-down panel: an invoice line with no cost centre. */
export type DrillItem = { date: string; partner: string; number: string; description: string; amount: number }

/** A category in the panel; `items` present = expanded. */
export type DrillCategory = { name: string; count: number; total: number; items?: DrillItem[] }

type Copy = {
  ui: Record<UiKey, string>
  reportName: string
  dimension: string
  currency: string
  lines: ReportRow[]
  /** The breakdown: the list's two values, one cell triple per line. */
  breakdown: { values: [string, string]; cells: MatrixCells[] }
  /** The panel, opened on DRILL_LINE's Unassigned cell. */
  drill: DrillCategory[]
  help: {
    structure: {
      categories: string
      categoriesDetail: string
      lines: string
      linesDetail: string
      calculated: string
      calculatedDetail: string
      report: string
      reportDetail: string
      footnote: string
    }
    alt: { structure: string; page: string; drill: string }
  }
}

function lines(names: string[], v: number[]): ReportRow[] {
  const calc = [false, false, true, false, false, true]
  return names.map((name, i) => ({ name, calculated: calc[i], value: v[i] }))
}

// Revenue, cost of sales, gross profit (Σ), operating costs, personnel costs,
// operating result (Σ): the Σ lines are the sums of the lines above them.
// Under 10 million: the app's amount column (w-40) wraps a longer negative
// HUF amount after its minus sign.
const HUF = [9620000, -4340000, 5280000, -2960000, -1410000, 910000]
const EUR = [486200, -213400, 272800, -129600, -84100, 59100]

// The same lines broken down by cost centre: [first value, second value,
// Unassigned] per line; the Total column is their sum. A Σ line's cells are
// the sums of its operands' cells, as execute_report pivots them.
//
// ⚠️ WIDTH. In HUF these are a tenth of the report page figure's amounts (a
// smaller business, or one month): at full size the English table was 854px
// wide and could not show at 100% in a 768px figure. The EUR amounts are the
// report page figure's own, broken down.
//
// ⚠️ The Unassigned column holds a longer amount (Cost of sales) than the
// drilled cell in every locale, so the drilled cell's right-aligned figure has
// room on its left for marker 1 (help-marker-audit).
// ⚠️ A longer line name or a wider amount makes the table scroll inside its
// box and cuts off Total (Hungarian did with "Személyi jellegű ráfordítások").
const HUF_CELLS: MatrixCells[] = [
  [618000, 294000, 50000],
  [-120000, -210000, -104000],
  [498000, 84000, -54000],
  [-124000, -162200, -9800],
  [-64000, -72000, -5000],
  [310000, -150200, -68800],
]
const EUR_CELLS: MatrixCells[] = [
  [312400, 148600, 25200],
  [-74800, -122100, -16500],
  [237600, 26500, 8700],
  [-62800, -65840, -960],
  [-37200, -44500, -2400],
  [137600, -83840, 5340],
]

/** The line the panel is open on: Operating costs. */
export const DRILL_LINE = 3

// The panel's entries: the help's fictional partners, the same in every
// locale. The categories add up to DRILL_LINE's Unassigned cell.
const ITEM_DATES = ['2026-10-14', '2026-10-02'] as const
const PARTNERS = ['Reamwell Office Supplies Ltd.', 'Quillmoor Software Ltd.'] as const
const NUMBERS = ['RW-2026-0418', 'QS-2026-1187'] as const

function drill(categories: [string, string, string], descriptions: [string, string], amounts: [number, number, number]): DrillCategory[] {
  const item = (i: 0 | 1): DrillItem => ({
    date: ITEM_DATES[i],
    partner: PARTNERS[i],
    number: NUMBERS[i],
    description: descriptions[i],
    amount: amounts[i],
  })
  return [
    { name: categories[0], count: 1, total: amounts[0], items: [item(0)] },
    { name: categories[1], count: 1, total: amounts[1], items: [item(1)] },
    { name: categories[2], count: 3, total: amounts[2] },
  ]
}
const HUF_DRILL: [number, number, number] = [-2450, -4350, -3000]
const EUR_DRILL: [number, number, number] = [-180, -330, -450]

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'reports.toolbar.breadcrumb_reports': 'Reports',
    'reports.toolbar.breadcrumb_separator': '/',
    'reports.toolbar.search_lines_placeholder': 'Search lines…',
    'reports.toolbar.break_down_by': 'Break down by',
    'reports.toolbar.break_down_none': 'No breakdown',
    'reports.toolbar.filter': 'Filter',
    'reports.toolbar.edit_report': 'Edit report',
    'date_filter.rolling_this_year': 'This year',
    'reports.display.label': 'Display currency',
    'reports.display.inherit_base': 'Base currency (default)',
    'reports.table.calculated_marker': 'Σ',
    'reports.table.click_to_see_detail': 'Click to see detail',
    'reports.line_row.categories': 'Categories',
    'reports.line_row.formula': 'Formula',
    'reports.table.col_line': 'Line',
    'reports.table.col_unassigned': 'Unassigned',
    'reports.table.col_total': 'Total',
    'reports.table.col_only_this': 'only this',
    'reports.table.coverage_pct': '{pct}% assigned',
    'reports.table.coverage_note': '{amount} carries no value on this dimension.',
    'reports.drill_down.cell_header': '{line} · {column}',
    'reports.drill_down.assign_scope_label': 'Set the value',
    'reports.drill_down.assign_scope_empty_lines': 'on every line of the invoice without a value',
    'reports.drill_down.assign_scope_line': 'on this line only',
    'reports.drill_down.items_total': '({total})',
    'reports.drill_down.invoice_number_prefix': '#',
    'reports.drill_down.pdf': 'PDF',
    'category_combobox.search_placeholder': 'Search or select…',
    'common.close': 'Close',
  },
  reportName: 'Profit and loss',
  dimension: 'Cost centre',
  currency: 'HUF',
  lines: lines(['Revenue', 'Cost of sales', 'Gross profit', 'Operating costs', 'Personnel costs', 'Operating result'], HUF),
  breakdown: { values: ['Sales', 'Operations'], cells: HUF_CELLS },
  drill: drill(
    ['Office supplies', 'Software', 'Parking'],
    ['Printer paper', 'Project tool licence, October'],
    HUF_DRILL,
  ),
  help: {
    structure: {
      categories: 'Categories',
      categoriesDetail: 'Every invoice line and bank transaction carries a category.',
      lines: 'Reporting lines',
      linesDetail: 'A line adds up its categories for the period. On an Invoice report, income counts as plus and expenses as minus.',
      calculated: 'Calculated lines',
      calculatedDetail: 'A formula over reporting lines, worked out from left to right: Gross profit = Revenue + Cost of sales.',
      report: 'The report',
      reportDetail: 'Runs for the period you pick, optionally filtered or broken down by one of your custom category lists.',
      footnote: 'Expenses are already negative on an Invoice report: add them in a formula, never subtract them.',
    },
    alt: {
      structure:
        'Diagram of how a report is built: categories on invoice lines and bank transactions add up into reporting lines, with income as plus and expenses as minus on an Invoice report; calculated lines combine reporting lines with a formula; the report runs for the period you pick and can be filtered or broken down.',
      page:
        'An Invoice report named Profit and loss for this year: the toolbar with the period, the line search, Break down by, Filter and Edit report; the Display currency selector; and six lines, including the calculated lines Gross profit and Operating result marked with Σ, with the costs in red. Numbered markers point to the parts described in the list below.',
      drill:
        'Two parts of the same Invoice report, broken down by cost centre. Above, the table: one column each for Sales and Operations, then Unassigned and Total, and under it how much of the period carries a value; the Unassigned cell of Operating costs is highlighted. Below, the detail panel it opened, titled Operating costs · Unassigned: Set the value, set to every line of the invoice without a value; the categories behind the cell, two of them expanded to an invoice line each with a value picker under it. Numbered markers point to the parts described in the list below.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'reports.toolbar.breadcrumb_reports': 'Jelentések',
    'reports.toolbar.breadcrumb_separator': '/',
    'reports.toolbar.search_lines_placeholder': 'Sorok keresése…',
    'reports.toolbar.break_down_by': 'Bontás',
    'reports.toolbar.break_down_none': 'Nincs bontás',
    'reports.toolbar.filter': 'Szűrés',
    'reports.toolbar.edit_report': 'Jelentés szerkesztése',
    'date_filter.rolling_this_year': 'Ez az év',
    'reports.display.label': 'Megjelenítési pénznem',
    'reports.display.inherit_base': 'Bázis pénznem (alapértelmezett)',
    'reports.table.calculated_marker': 'Σ',
    'reports.table.click_to_see_detail': 'Kattints a részletekért',
    'reports.line_row.categories': 'Kategóriák',
    'reports.line_row.formula': 'Képlet',
    'reports.table.col_line': 'Sor',
    'reports.table.col_unassigned': 'Nincs hozzárendelve',
    'reports.table.col_total': 'Összesen',
    'reports.table.col_only_this': 'csak ez',
    'reports.table.coverage_pct': '{pct}% hozzárendelve',
    'reports.table.coverage_note': '{amount} nem kapott értéket ezen a dimenzión.',
    'reports.drill_down.cell_header': '{line} · {column}',
    'reports.drill_down.assign_scope_label': 'Érték beállítása',
    'reports.drill_down.assign_scope_empty_lines': 'a számla minden érték nélküli sorára',
    'reports.drill_down.assign_scope_line': 'csak erre a sorra',
    'reports.drill_down.items_total': '({total})',
    'reports.drill_down.invoice_number_prefix': '#',
    'reports.drill_down.pdf': 'PDF',
    'category_combobox.search_placeholder': 'Keresés vagy választás…',
    'common.close': 'Bezárás',
  },
  reportName: 'Eredménykimutatás',
  dimension: 'Költséghely',
  currency: 'HUF',
  lines: lines(['Árbevétel', 'Közvetlen költségek', 'Bruttó eredmény', 'Működési költségek', 'Bérköltségek', 'Üzemi eredmény'], HUF),
  breakdown: { values: ['Értékesítés', 'Üzemeltetés'], cells: HUF_CELLS },
  drill: drill(
    ['Irodaszerek', 'Szoftverek', 'Parkolás'],
    ['Nyomtatópapír', 'Projektkezelő licenc, október'],
    HUF_DRILL,
  ),
  help: {
    structure: {
      categories: 'Kategóriák',
      categoriesDetail: 'Minden számlatétel és banki tranzakció kategóriát kap.',
      lines: 'Jelentéssorok',
      linesDetail: 'Egy sor összeadja a kategóriáit az időszakra. Számla típusú jelentésben a bevétel pluszként, a kiadás mínuszként számít.',
      calculated: 'Számított sorok',
      calculatedDetail: 'Jelentéssorokból álló képlet, balról jobbra számolva: Bruttó eredmény = Árbevétel + Közvetlen költségek.',
      report: 'A jelentés',
      reportDetail: 'A választott időszakra fut, igény szerint szűrve vagy egyik egyéni kategórialistája szerint bontva.',
      footnote: 'Számla típusú jelentésben a kiadás már negatív: képletben adja hozzá, soha ne vonja ki.',
    },
    alt: {
      structure:
        'Ábra arról, hogyan épül fel egy jelentés: a számlatételek és banki tranzakciók kategóriái jelentéssorokba adódnak össze, számla típusú jelentésben a bevétel pluszként, a kiadás mínuszként; a számított sorok képlettel kombinálják a jelentéssorokat; a jelentés a választott időszakra fut, és szűrhető vagy bontható.',
      page:
        'Az Eredménykimutatás nevű számla típusú jelentés erre az évre: az eszköztár az időszakkal, a sorkereséssel, a Bontás, a Szűrés és a Jelentés szerkesztése gombbal; a Megjelenítési pénznem választó; és hat sor, köztük a Σ jellel jelölt Bruttó eredmény és Üzemi eredmény számított sorral, a költségek pirossal. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
      drill:
        'Ugyanannak a költséghely szerint bontott számla típusú jelentésnek két része. Felül a táblázat: egy-egy oszlop az Értékesítésnek és az Üzemeltetésnek, utána a Nincs hozzárendelve és az Összesen, alatta pedig az, hogy az időszak mekkora része kapott értéket; a Működési költségek sor Nincs hozzárendelve cellája ki van emelve. Alul az általa megnyitott részletező panel, címe Működési költségek · Nincs hozzárendelve: az Érték beállítása, a számla minden érték nélküli sorára állítva; a cella mögötti kategóriák, közülük kettő kinyitva egy-egy számlatétellel és alatta az értékválasztóval. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'reports.toolbar.breadcrumb_reports': 'Berichte',
    'reports.toolbar.breadcrumb_separator': '/',
    'reports.toolbar.search_lines_placeholder': 'Zeilen durchsuchen…',
    'reports.toolbar.break_down_by': 'Aufschlüsseln nach',
    'reports.toolbar.break_down_none': 'Keine Aufschlüsselung',
    'reports.toolbar.filter': 'Filter',
    'reports.toolbar.edit_report': 'Bericht bearbeiten',
    'date_filter.rolling_this_year': 'Dieses Jahr',
    'reports.display.label': 'Anzeigewährung',
    'reports.display.inherit_base': 'Basiswährung (Standard)',
    'reports.table.calculated_marker': 'Σ',
    'reports.table.click_to_see_detail': 'Klicken für Details',
    'reports.line_row.categories': 'Kategorien',
    'reports.line_row.formula': 'Formel',
    'reports.table.col_line': 'Zeile',
    'reports.table.col_unassigned': 'Nicht zugeordnet',
    'reports.table.col_total': 'Gesamt',
    'reports.table.col_only_this': 'nur diese',
    'reports.table.coverage_pct': '{pct}% zugeordnet',
    'reports.table.coverage_note': '{amount} trägt keinen Wert auf dieser Dimension.',
    'reports.drill_down.cell_header': '{line} · {column}',
    'reports.drill_down.assign_scope_label': 'Wert setzen',
    'reports.drill_down.assign_scope_empty_lines': 'für alle Zeilen der Rechnung ohne Wert',
    'reports.drill_down.assign_scope_line': 'nur für diese Zeile',
    'reports.drill_down.items_total': '({total})',
    'reports.drill_down.invoice_number_prefix': '#',
    'reports.drill_down.pdf': 'PDF',
    'category_combobox.search_placeholder': 'Suchen oder auswählen…',
    'common.close': 'Schließen',
  },
  reportName: 'Gewinn- und Verlustrechnung',
  dimension: 'Kostenstelle',
  currency: 'EUR',
  lines: lines(['Umsatzerlöse', 'Materialaufwand', 'Rohergebnis', 'Betriebskosten', 'Personalaufwand', 'Betriebsergebnis'], EUR),
  breakdown: { values: ['Vertrieb', 'Betrieb'], cells: EUR_CELLS },
  drill: drill(
    ['Bürobedarf', 'Software', 'Parkgebühren'],
    ['Druckerpapier', 'Lizenz Projekttool, Oktober'],
    EUR_DRILL,
  ),
  help: {
    structure: {
      categories: 'Kategorien',
      categoriesDetail: 'Jede Rechnungsposition und jede Banktransaktion trägt eine Kategorie.',
      lines: 'Berichtszeilen',
      linesDetail: 'Eine Zeile summiert ihre Kategorien für den Zeitraum. In einem Rechnungsbericht zählen Einnahmen als Plus und Ausgaben als Minus.',
      calculated: 'Berechnete Zeilen',
      calculatedDetail: 'Eine Formel aus Berichtszeilen, von links nach rechts berechnet: Rohergebnis = Umsatzerlöse + Materialaufwand.',
      report: 'Der Bericht',
      reportDetail: 'Läuft für den gewählten Zeitraum, auf Wunsch gefiltert oder nach einer Ihrer eigenen Kategorielisten aufgeschlüsselt.',
      footnote: 'Ausgaben sind in einem Rechnungsbericht schon negativ: In einer Formel addieren Sie sie, ziehen sie nie ab.',
    },
    alt: {
      structure:
        'Diagramm, wie ein Bericht aufgebaut ist: Die Kategorien auf Rechnungspositionen und Banktransaktionen summieren sich zu Berichtszeilen, in einem Rechnungsbericht Einnahmen als Plus und Ausgaben als Minus; berechnete Zeilen verbinden Berichtszeilen mit einer Formel; der Bericht läuft für den gewählten Zeitraum und lässt sich filtern oder aufschlüsseln.',
      page:
        'Ein Rechnungsbericht namens Gewinn- und Verlustrechnung für dieses Jahr: die Werkzeugleiste mit dem Zeitraum, der Zeilensuche, Aufschlüsseln nach, Filter und Bericht bearbeiten; die Auswahl der Anzeigewährung; und sechs Zeilen, darunter die mit Σ markierten berechneten Zeilen Rohergebnis und Betriebsergebnis, die Aufwände in Rot. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
      drill:
        'Zwei Teile desselben Rechnungsberichts, nach Kostenstelle aufgeschlüsselt. Oben die Tabelle: je eine Spalte für Vertrieb und Betrieb, dann Nicht zugeordnet und Gesamt, darunter, wie viel des Zeitraums einen Wert trägt; die Zelle Nicht zugeordnet der Betriebskosten ist hervorgehoben. Unten das Detailfenster, das sie geöffnet hat, mit dem Titel Betriebskosten · Nicht zugeordnet: Wert setzen, eingestellt auf alle Zeilen der Rechnung ohne Wert; die Kategorien hinter der Zelle, zwei davon aufgeklappt mit je einer Rechnungsposition und der Wertauswahl darunter. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
    },
  },
}

export const reportsCopy: Record<Locale, Copy> = { en, hu, de }
