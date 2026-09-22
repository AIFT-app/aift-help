// Text and data for the report illustrations (reports).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key (plural-free
// messages only). Hungarian ones are tegező because the app is. `help` holds
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
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type ReportRow = { name: string; calculated: boolean; value: number }

type Copy = {
  ui: Record<UiKey, string>
  reportName: string
  dimension: string
  currency: string
  lines: ReportRow[]
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
    alt: { structure: string; page: string }
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
  },
  reportName: 'Profit and loss',
  dimension: 'Cost centre',
  currency: 'HUF',
  lines: lines(['Revenue', 'Cost of sales', 'Gross profit', 'Operating costs', 'Personnel costs', 'Operating result'], HUF),
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
  },
  reportName: 'Eredménykimutatás',
  dimension: 'Költséghely',
  currency: 'HUF',
  lines: lines(['Árbevétel', 'Közvetlen költségek', 'Bruttó eredmény', 'Működési költségek', 'Személyi jellegű ráfordítások', 'Üzemi eredmény'], HUF),
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
  },
  reportName: 'Gewinn- und Verlustrechnung',
  dimension: 'Kostenstelle',
  currency: 'EUR',
  lines: lines(['Umsatzerlöse', 'Materialaufwand', 'Rohergebnis', 'Betriebskosten', 'Personalaufwand', 'Betriebsergebnis'], EUR),
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
    },
  },
}

export const reportsCopy: Record<Locale, Copy> = { en, hu, de }
