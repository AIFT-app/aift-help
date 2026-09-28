// Labels for the two VAT-setup figures, keyed by aift-web message key so a
// drift check can compare them to messages/<locale>.json directly.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28):
//   the title row   src/app/(app)/workspaces/[workspaceId]/master-data/vat/
//                   layout.tsx + _vat/VatSetupActions.tsx
//   the tab bar     master-data/vat/_components/VatTabs.tsx
//   the dialog      _vat/VatSetupImportDialog.tsx + _vat/VatSetupPreview.tsx
//
// Note the app's own inconsistency, reproduced verbatim: the German page
// heading is "USt.-Codes" with a full stop, and the German tab beside it is
// "USt-Codes" without one. A 1:1 screen quotes what the app renders.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'nav.master_data.vat',
  'nav.master_data.partner_vat_groups',
  'nav.master_data.product_service_vat_groups',
  'nav.master_data.vat_rates',
  'nav.master_data.calculation_methods',
  'nav.master_data.vat_codes',
  'nav.master_data.vat_examples',
  'master_data.vat_setup.export_button',
  'master_data.vat_setup.import_button',
  'master_data.vat_setup.copy_button',
  'master_data.vat_setup.last_import_line',
  'master_data.vat_setup.import_title',
  'master_data.vat_setup.preview_hint_blocked',
  'master_data.vat_setup.back',
  'master_data.vat_setup.confirm_import',
  'master_data.vat_setup.count_new',
  'master_data.vat_setup.count_updated',
  'master_data.vat_setup.count_unchanged',
  'master_data.vat_setup.count_errors',
  'master_data.vat_setup.errors_block_import',
  'master_data.vat_setup.row_n',
  'master_data.vat_setup.sheet.partner_vat_groups',
  'master_data.vat_setup.sheet.product_service_vat_groups',
  'master_data.vat_setup.sheet.vat_rates',
  'master_data.vat_setup.sheet.calculation_methods',
  'master_data.vat_setup.sheet.vat_codes',
  'master_data.vat_setup.error.vat_code_overlap',
] as const

export type UiKey = (typeof UI_KEYS)[number]

/** The five workbook sheets, in the order VatSetupPreview lists them. */
export const SHEETS = [
  'partner_vat_groups',
  'product_service_vat_groups',
  'vat_rates',
  'calculation_methods',
  'vat_codes',
] as const

/** The six tabs the title row sits above (Business Central is conditional). */
export const TABS = [
  'partner_vat_groups',
  'product_service_vat_groups',
  'vat_rates',
  'calculation_methods',
  'vat_codes',
  'vat_examples',
] as const

/** Which tab the screen happens to be on, to make the point that it does not matter. */
export const ACTIVE_TAB = 'vat_codes'

/**
 * The dry run the figure shows: four sheets that would change, and one
 * blocked by the five-element overlap the article calls the most likely real
 * blocker. Counts are invented; the code in `detail` is a fictional code in a
 * fictional workspace's table.
 */
export const DRY_RUN: Record<
  (typeof SHEETS)[number],
  { new: number; updated: number; unchanged: number; errors: number }
> = {
  partner_vat_groups: { new: 2, updated: 1, unchanged: 4, errors: 0 },
  product_service_vat_groups: { new: 3, updated: 0, unchanged: 6, errors: 0 },
  vat_rates: { new: 0, updated: 2, unchanged: 3, errors: 0 },
  calculation_methods: { new: 0, updated: 0, unchanged: 4, errors: 0 },
  vat_codes: { new: 7, updated: 4, unchanged: 11, errors: 1 },
}

export const OVERLAP_ROW = 19
export const OVERLAP_SHEET = 'VAT Codes'
export const OVERLAP_COLUMN = 'Valid from'
/** Fictional code, in the house naming style rather than a real customer's. */
export const OVERLAP_DETAIL = 'DOM-27-SERV'

type Copy = {
  ui: Record<UiKey, string>
  /** Strings the app builds at runtime from an ICU pattern, rendered out. */
  rendered: {
    lastImport: string
    counts: Record<(typeof SHEETS)[number], { new: string; updated: string; unchanged: string; errors?: string }>
    errorsBlock: string
    row: string
    overlap: string
  }
  help: { actionsAlt: string; previewAlt: string }
}

const en: Copy = {
  ui: {
    'nav.master_data.vat': "VAT codes",
    'nav.master_data.partner_vat_groups': "Partner VAT Groups",
    'nav.master_data.product_service_vat_groups': "Product / Service VAT Groups",
    'nav.master_data.vat_rates': "VAT Rates",
    'nav.master_data.calculation_methods': "Calculation Methods",
    'nav.master_data.vat_codes': "VAT Codes",
    'nav.master_data.vat_examples': "VAT Examples",
    'master_data.vat_setup.export_button': "Export VAT Setup",
    'master_data.vat_setup.import_button': "Import VAT Setup",
    'master_data.vat_setup.copy_button': "Copy from workspace…",
    'master_data.vat_setup.last_import_line': "Last import: {date} by {user}",
    'master_data.vat_setup.import_title': "Import VAT setup",
    'master_data.vat_setup.preview_hint_blocked': "The file contains errors - fix them and upload it again. Nothing has been imported.",
    'master_data.vat_setup.back': "Back",
    'master_data.vat_setup.confirm_import': "Confirm import",
    'master_data.vat_setup.count_new': "{count} new",
    'master_data.vat_setup.count_updated': "{count} updated",
    'master_data.vat_setup.count_unchanged': "{count} unchanged",
    'master_data.vat_setup.count_errors': "{count, plural, =1 {1 error} other {# errors}}",
    'master_data.vat_setup.errors_block_import': "{count, plural, =1 {1 error blocks the import} other {# errors block the import}}",
    'master_data.vat_setup.row_n': "Row {n}",
    'master_data.vat_setup.sheet.partner_vat_groups': "Partner VAT Groups",
    'master_data.vat_setup.sheet.product_service_vat_groups': "Product / Service VAT Groups",
    'master_data.vat_setup.sheet.vat_rates': "VAT Rates",
    'master_data.vat_setup.sheet.calculation_methods': "Calculation Methods",
    'master_data.vat_setup.sheet.vat_codes': "VAT Codes",
    'master_data.vat_setup.error.vat_code_overlap': "The active VAT code “{detail}” already covers this five-element combination for an overlapping period. Archive or re-date one of the two.",
  },
  rendered: {
    lastImport: "Last import: 24 Sept 2026 by Rowan Vance",
    counts: {
      partner_vat_groups: { new: "2 new", updated: "1 updated", unchanged: "4 unchanged" },
      product_service_vat_groups: { new: "3 new", updated: "0 updated", unchanged: "6 unchanged" },
      vat_rates: { new: "0 new", updated: "2 updated", unchanged: "3 unchanged" },
      calculation_methods: { new: "0 new", updated: "0 updated", unchanged: "4 unchanged" },
      vat_codes: { new: "7 new", updated: "4 updated", unchanged: "11 unchanged", errors: "1 error" },
    },
    errorsBlock: "1 error blocks the import",
    row: "Row 19",
    overlap: "The active VAT code “DOM-27-SERV” already covers this five-element combination for an overlapping period. Archive or re-date one of the two.",
  },
  help: {
    actionsAlt: "The VAT codes page title row, with Export VAT Setup, Import VAT Setup and Copy from workspace buttons on the right, a Last import line under them, and the six tabs below, with VAT Codes open.",
    previewAlt: "The Import VAT setup dialog at its preview step, listing each of the five sheets with new, updated and unchanged counts, one sheet also showing an error count, and an error panel underneath saying the overlap blocks the import, with Confirm import greyed out.",
  },
}

const hu: Copy = {
  ui: {
    'nav.master_data.vat': "ÁFA-kódok",
    'nav.master_data.partner_vat_groups': "Partner ÁFA-csoportok",
    'nav.master_data.product_service_vat_groups': "Termék / Szolgáltatás ÁFA-csoportok",
    'nav.master_data.vat_rates': "ÁFA-kulcsok",
    'nav.master_data.calculation_methods': "Számítási módok",
    'nav.master_data.vat_codes': "ÁFA-kódok",
    'nav.master_data.vat_examples': "ÁFA-példák",
    'master_data.vat_setup.export_button': "ÁFA-beállítás exportálása",
    'master_data.vat_setup.import_button': "ÁFA-beállítás importálása",
    'master_data.vat_setup.copy_button': "Másolás munkaterületről…",
    'master_data.vat_setup.last_import_line': "Utolsó importálás: {date} – {user}",
    'master_data.vat_setup.import_title': "ÁFA-beállítás importálása",
    'master_data.vat_setup.preview_hint_blocked': "A fájl hibákat tartalmaz - javítsd őket, és töltsd fel újra. Semmi nem lett importálva.",
    'master_data.vat_setup.back': "Vissza",
    'master_data.vat_setup.confirm_import': "Importálás megerősítése",
    'master_data.vat_setup.count_new': "{count} új",
    'master_data.vat_setup.count_updated': "{count} frissített",
    'master_data.vat_setup.count_unchanged': "{count} változatlan",
    'master_data.vat_setup.count_errors': "{count, plural, =1 {1 hiba} other {# hiba}}",
    'master_data.vat_setup.errors_block_import': "{count, plural, =1 {1 hiba akadályozza az importálást} other {# hiba akadályozza az importálást}}",
    'master_data.vat_setup.row_n': "{n}. sor",
    'master_data.vat_setup.sheet.partner_vat_groups': "Partner ÁFA-csoportok",
    'master_data.vat_setup.sheet.product_service_vat_groups': "Termék / Szolgáltatás ÁFA-csoportok",
    'master_data.vat_setup.sheet.vat_rates': "ÁFA-kulcsok",
    'master_data.vat_setup.sheet.calculation_methods': "Számítási módok",
    'master_data.vat_setup.sheet.vat_codes': "ÁFA-kódok",
    'master_data.vat_setup.error.vat_code_overlap': "A(z) „{detail}” aktív ÁFA-kód már lefedi ezt az ötelemű kombinációt átfedő időszakra. Archiváld vagy dátumozd át az egyiket.",
  },
  rendered: {
    lastImport: "Utolsó importálás: 2026. szept. 24. – Rowan Vance",
    counts: {
      partner_vat_groups: { new: "2 új", updated: "1 frissített", unchanged: "4 változatlan" },
      product_service_vat_groups: { new: "3 új", updated: "0 frissített", unchanged: "6 változatlan" },
      vat_rates: { new: "0 új", updated: "2 frissített", unchanged: "3 változatlan" },
      calculation_methods: { new: "0 új", updated: "0 frissített", unchanged: "4 változatlan" },
      vat_codes: { new: "7 új", updated: "4 frissített", unchanged: "11 változatlan", errors: "1 hiba" },
    },
    errorsBlock: "1 hiba akadályozza az importálást",
    row: "19. sor",
    overlap: "A(z) „DOM-27-SERV” aktív ÁFA-kód már lefedi ezt az ötelemű kombinációt átfedő időszakra. Archiváld vagy dátumozd át az egyiket.",
  },
  help: {
    actionsAlt: "Az ÁFA-kódok oldal címsora, jobb oldalon az ÁFA-beállítás exportálása, az ÁFA-beállítás importálása és a Másolás munkaterületről gombbal, alattuk az utolsó importálás sorával, alatta a hat füllel, megnyitott ÁFA-kódok füllel.",
    previewAlt: "Az ÁFA-beállítás importálása párbeszédpanel az előnézeti lépésben: mindegyik munkalap mellett az új, a frissített és a változatlan sorok száma, az egyik munkalapnál hibaszám is, alatta egy hibapanel arról, hogy az átfedés megakadályozza az importálást, az Importálás megerősítése gomb pedig szürke.",
  },
}

const de: Copy = {
  ui: {
    'nav.master_data.vat': "USt.-Codes",
    'nav.master_data.partner_vat_groups': "Partner-USt-Gruppen",
    'nav.master_data.product_service_vat_groups': "Produkt-/Leistungs-USt-Gruppen",
    'nav.master_data.vat_rates': "USt-Sätze",
    'nav.master_data.calculation_methods': "Berechnungsmethoden",
    'nav.master_data.vat_codes': "USt-Codes",
    'nav.master_data.vat_examples': "USt-Beispiele",
    'master_data.vat_setup.export_button': "USt-Einrichtung exportieren",
    'master_data.vat_setup.import_button': "USt-Einrichtung importieren",
    'master_data.vat_setup.copy_button': "Aus Arbeitsbereich kopieren…",
    'master_data.vat_setup.last_import_line': "Letzter Import: {date} von {user}",
    'master_data.vat_setup.import_title': "USt-Einrichtung importieren",
    'master_data.vat_setup.preview_hint_blocked': "Die Datei enthält Fehler - beheben Sie sie und laden Sie die Datei erneut hoch. Es wurde nichts importiert.",
    'master_data.vat_setup.back': "Zurück",
    'master_data.vat_setup.confirm_import': "Import bestätigen",
    'master_data.vat_setup.count_new': "{count} neu",
    'master_data.vat_setup.count_updated': "{count} aktualisiert",
    'master_data.vat_setup.count_unchanged': "{count} unverändert",
    'master_data.vat_setup.count_errors': "{count, plural, =1 {1 Fehler} other {# Fehler}}",
    'master_data.vat_setup.errors_block_import': "{count, plural, =1 {1 Fehler blockiert den Import} other {# Fehler blockieren den Import}}",
    'master_data.vat_setup.row_n': "Zeile {n}",
    'master_data.vat_setup.sheet.partner_vat_groups': "Partner-USt-Gruppen",
    'master_data.vat_setup.sheet.product_service_vat_groups': "Produkt-/Leistungs-USt-Gruppen",
    'master_data.vat_setup.sheet.vat_rates': "USt-Sätze",
    'master_data.vat_setup.sheet.calculation_methods': "Berechnungsmethoden",
    'master_data.vat_setup.sheet.vat_codes': "USt-Codes",
    'master_data.vat_setup.error.vat_code_overlap': "Der aktive USt-Code „{detail}“ deckt diese Fünf-Elemente-Kombination für einen überlappenden Zeitraum bereits ab. Archivieren oder umdatieren Sie einen der beiden.",
  },
  rendered: {
    lastImport: "Letzter Import: 24.09.2026 von Rowan Vance",
    counts: {
      partner_vat_groups: { new: "2 neu", updated: "1 aktualisiert", unchanged: "4 unverändert" },
      product_service_vat_groups: { new: "3 neu", updated: "0 aktualisiert", unchanged: "6 unverändert" },
      vat_rates: { new: "0 neu", updated: "2 aktualisiert", unchanged: "3 unverändert" },
      calculation_methods: { new: "0 neu", updated: "0 aktualisiert", unchanged: "4 unverändert" },
      vat_codes: { new: "7 neu", updated: "4 aktualisiert", unchanged: "11 unverändert", errors: "1 Fehler" },
    },
    errorsBlock: "1 Fehler blockiert den Import",
    row: "Zeile 19",
    overlap: "Der aktive USt-Code „DOM-27-SERV“ deckt diese Fünf-Elemente-Kombination für einen überlappenden Zeitraum bereits ab. Archivieren oder umdatieren Sie einen der beiden.",
  },
  help: {
    actionsAlt: "Die Titelzeile der Seite USt.-Codes, rechts die Schaltflächen USt-Einrichtung exportieren, USt-Einrichtung importieren und Aus Arbeitsbereich kopieren, darunter die Zeile zum letzten Import, darunter die sechs Reiter mit geöffnetem Reiter USt-Codes.",
    previewAlt: "Der Dialog USt-Einrichtung importieren im Vorschauschritt: zu jedem der fünf Blätter die Anzahl neuer, aktualisierter und unveränderter Zeilen, bei einem Blatt zusätzlich eine Fehleranzahl, darunter ein Fehlerbereich mit dem Hinweis, dass die Überlappung den Import blockiert, und die ausgegraute Schaltfläche Import bestätigen.",
  },
}

export const vatSetupCopy: Record<Locale, Copy> = { en, hu, de }
