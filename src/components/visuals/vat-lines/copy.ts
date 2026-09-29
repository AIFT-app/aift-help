// Labels for the Lines & VAT grid figure, keyed by aift-web message key so a
// drift check can compare them to messages/<locale>.json directly.
//
// Rebuilt 1:1 from aift-web (branch feat/page-layout-sweep, 2026-09-29):
//   src/app/(app)/workspaces/[workspaceId]/invoices/[invoiceId]/(tabs)/
//     _components/MergedLinesVatGrid.tsx
// The `ui` values are copied from that branch's messages/<locale>.json by
// script, never retyped.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'invoices.line_items_table.line_number',
  'invoices.line_items_table.description',
  'invoices.line_items_table.net_only',
  'invoices.line_items_table.vat',
  'invoices.line_items_table.gross',
  'invoices.line_items_table.category',
  'invoices.line_items_table.edited',
  'invoices.line_items_table.confidence_medium',
  'invoices.line_items_table.override_category',
  'invoices.detail.lines.col_vat_elements',
  'invoices.detail.lines.col_vat_code',
  'invoices.detail.lines.elements_collapsed',
  'invoices.detail.lines.toolbar_add_missing',
  'invoices.detail.lines.toolbar_summary',
  'invoices.vat_panel.missing_code',
  'invoices.vat_panel.default_fallback_badge',
  'invoices.vat_panel.default_fallback_tooltip',
  'invoices.vat_panel.mismatch_tooltip',
  'invoices.vat_panel.add_code',
  'invoices.vat_panel.product_group',
  'invoices.vat_panel.rate',
  'invoices.vat_panel.method',
  'invoices.vat_panel.fallback_confirm_button',
  'invoices.vat_panel.advanced',
] as const

export type UiKey = (typeof UI_KEYS)[number]

/** The invoice the lines belong to: the line number's hover title is `<id>/<nn>`. */
export const INVOICE_ID = 'GRM-INV-2026-0042'
export const CURRENCY = 'EUR'

/**
 * Four lines, one per state of the VAT code cell, which is what the article's
 * "Reading The VAT Code Cell" section lists:
 *
 *   resolved  a plain green code chip; the three element selects have moved
 *             into Advanced and the cell says so
 *   default   the workspace default, an amber chip ending in "Default"; still
 *             counts as coded, so the invoice is export-eligible
 *   missing   "- missing -" with "+ Add" beside it, and the three element
 *             selects rendered INLINE, which is the state they show in
 *   mismatch  a resolved code whose elements no longer resolve to it: the chip
 *             stays and a warning triangle appears beside it
 */
export type Line = {
  n: number
  state: 'resolved' | 'default' | 'missing' | 'mismatch'
  net: number
  /** VAT rate percent, or null for a line with no rate resolved. */
  ratePct: number | null
  gross: number
  /** Accounting category code (the category's Code, secondary_value), then name. */
  catCode: string
  /** True where a person overrode the AI's category. */
  edited?: boolean
  /**
   * The AI's confidence where it proposed the category: 'medium' only here
   * (ai_confidence 0.7). Such a line also carries the breathing wrapper.
   */
  confidence?: 'medium'
  /** The resolved VAT code's label, where there is one. */
  code?: string
}

export const LINES: Line[] = [
  { n: 1, state: 'resolved', net: 2400, ratePct: 21, gross: 2904, catCode: '5210', code: 'DOM-21-SERV' },
  { n: 2, state: 'default', net: 84.5, ratePct: 21, gross: 102.25, catCode: '5410', code: 'DOM-21-GOODS', confidence: 'medium' },
  { n: 3, state: 'missing', net: 1150, ratePct: null, gross: 1150, catCode: '5330' },
  { n: 4, state: 'mismatch', net: 320, ratePct: 21, gross: 387.2, catCode: '5610', code: 'DOM-21-SERV', edited: true },
]

type Copy = {
  ui: Record<UiKey, string>
  /** Category names, which are the workspace's own words rather than the app's. */
  categories: Record<string, string>
  /** Line descriptions, translated like the rest of the article. */
  descriptions: Record<number, string>
  /** Strings the app builds from an ICU pattern, rendered out. */
  rendered: { netHeader: string; addMissing: string; summary: string; codingOk: string }
  help: { alt: string }
}

const en: Copy = {
  ui: {
    'invoices.line_items_table.line_number': "#",
    'invoices.line_items_table.description': "Description",
    'invoices.line_items_table.net_only': "Net ({currency})",
    'invoices.line_items_table.vat': "VAT",
    'invoices.line_items_table.gross': "Gross",
    'invoices.line_items_table.category': "Category",
    'invoices.line_items_table.edited': "Edited",
    'invoices.line_items_table.confidence_medium': "Medium",
    'invoices.line_items_table.override_category': "Override category",
    'invoices.detail.lines.col_vat_elements': "P/S · Rate · Method",
    'invoices.detail.lines.col_vat_code': "VAT code",
    'invoices.detail.lines.elements_collapsed': "Resolved: see Advanced",
    'invoices.detail.lines.toolbar_add_missing': "Add missing VAT codes ({count})",
    'invoices.detail.lines.toolbar_summary': "{lines, plural, =1 {# line} other {# lines}} · {missing, plural, =0 {all VAT codes set} =1 {# VAT code missing} other {# VAT codes missing}}",
    'invoices.vat_panel.missing_code': "- missing -",
    'invoices.vat_panel.default_fallback_badge': "Default",
    'invoices.vat_panel.default_fallback_tooltip': "Coded with the workspace default VAT code. Review advised.",
    'invoices.vat_panel.mismatch_tooltip': "This code's elements no longer match the line. Review or re-pick the code.",
    'invoices.vat_panel.add_code': "+ Add",
    'invoices.vat_panel.product_group': "Product / Service",
    'invoices.vat_panel.rate': "Rate",
    'invoices.vat_panel.method': "Method",
    'invoices.vat_panel.fallback_confirm_button': "VAT coding OK ({count})",
    'invoices.vat_panel.advanced': "Advanced",
  },
  categories: { '5210': "Rent", '5410': "Delivery", '5330': "Software", '5610': "Staff welfare" },
  descriptions: {
    1: "Office rent, Dunham Street unit",
    2: "Courier charges",
    3: "Annual software licence",
    4: "Catering, staff event",
  },
  rendered: {
    netHeader: "Net (EUR)",
    addMissing: "Add missing VAT codes (1)",
    summary: "4 lines · 1 VAT code missing",
    codingOk: "VAT coding OK (1)",
  },
  help: { alt: "The Lines & VAT grid with four invoice lines, shown scrolled to the right end of the table. The first line carries a plain code and says its elements are resolved and in Advanced; the second carries an amber code ending in Default; the third reads dash missing dash with an Add link, and its three element dropdowns sit side by side in the row; the fourth carries a code with a warning triangle beside it. Each row ends in an arrow that opens its Advanced part. Above the table, buttons to add the missing codes and to mark the VAT coding reviewed." },
}

const hu: Copy = {
  ui: {
    'invoices.line_items_table.line_number': "#",
    'invoices.line_items_table.description': "Leírás",
    'invoices.line_items_table.net_only': "Nettó ({currency})",
    'invoices.line_items_table.vat': "ÁFA",
    'invoices.line_items_table.gross': "Bruttó",
    'invoices.line_items_table.category': "Kategória",
    'invoices.line_items_table.edited': "Szerkesztve",
    'invoices.line_items_table.confidence_medium': "Közepes",
    'invoices.line_items_table.override_category': "Kategória felülírása",
    'invoices.detail.lines.col_vat_elements': "T/Sz · Kulcs · Mód",
    'invoices.detail.lines.col_vat_code': "ÁFA-kód",
    'invoices.detail.lines.elements_collapsed': "Feloldva: lásd Speciális",
    'invoices.detail.lines.toolbar_add_missing': "Hiányzó ÁFA-kódok hozzáadása ({count})",
    'invoices.detail.lines.toolbar_summary': "{lines, plural, =1 {# tétel} other {# tétel}} · {missing, plural, =0 {minden ÁFA-kód beállítva} =1 {# ÁFA-kód hiányzik} other {# ÁFA-kód hiányzik}}",
    'invoices.vat_panel.missing_code': "- hiányzik -",
    'invoices.vat_panel.default_fallback_badge': "Alapért.",
    'invoices.vat_panel.default_fallback_tooltip': "A munkaterület alapértelmezett áfakódjával kódolva. Ellenőrzés ajánlott.",
    'invoices.vat_panel.mismatch_tooltip': "A kód elemei már nem illeszkednek a sorhoz. Ellenőrizd vagy válassz újra.",
    'invoices.vat_panel.add_code': "+ Hozzáad",
    'invoices.vat_panel.product_group': "Termék / Szolgáltatás",
    'invoices.vat_panel.rate': "Kulcs",
    'invoices.vat_panel.method': "Mód",
    'invoices.vat_panel.fallback_confirm_button': "Áfakódolás rendben ({count})",
    'invoices.vat_panel.advanced': "Speciális",
  },
  categories: { '5210': "Bérleti díj", '5410': "Szállítás", '5330': "Szoftver", '5610': "Munkavállalói juttatás" },
  descriptions: {
    1: "Irodabérlet, Dunham Street-i egység",
    2: "Futárszolgálat díja",
    3: "Éves szoftverlicenc",
    4: "Vendéglátás, munkatársi rendezvény",
  },
  rendered: {
    netHeader: "Nettó (EUR)",
    addMissing: "Hiányzó ÁFA-kódok hozzáadása (1)",
    summary: "4 tétel · 1 ÁFA-kód hiányzik",
    codingOk: "Áfakódolás rendben (1)",
  },
  help: { alt: "A Tételek és ÁFA rács négy számlasorral, a táblázat jobb széléig görgetve. Az első soron sima kód áll, és a cella jelzi, hogy az elemek feloldva a Speciális alatt vannak; a másodikon borostyánszínű kód, a végén az Alapért. szóval; a harmadikon a - hiányzik - felirat, mellette a Hozzáad hivatkozás, és a három elemválasztó egymás mellett a sorban; a negyediken a kód mellett figyelmeztető háromszög. Minden sor végén egy nyíl nyitja ki a sor Speciális részét. A táblázat fölött gomb a hiányzó kódok hozzáadására és egy másik az áfakódolás ellenőrzöttre jelölésére." },
}

const de: Copy = {
  ui: {
    'invoices.line_items_table.line_number': "#",
    'invoices.line_items_table.description': "Beschreibung",
    'invoices.line_items_table.net_only': "Netto ({currency})",
    'invoices.line_items_table.vat': "USt.",
    'invoices.line_items_table.gross': "Brutto",
    'invoices.line_items_table.category': "Kategorie",
    'invoices.line_items_table.edited': "Bearbeitet",
    'invoices.line_items_table.confidence_medium': "Mittel",
    'invoices.line_items_table.override_category': "Kategorie überschreiben",
    'invoices.detail.lines.col_vat_elements': "P/D · Satz · Methode",
    'invoices.detail.lines.col_vat_code': "USt-Code",
    'invoices.detail.lines.elements_collapsed': "Aufgelöst: siehe Erweitert",
    'invoices.detail.lines.toolbar_add_missing': "Fehlende USt-Codes hinzufügen ({count})",
    'invoices.detail.lines.toolbar_summary': "{lines, plural, =1 {# Position} other {# Positionen}} · {missing, plural, =0 {alle USt-Codes gesetzt} =1 {# USt-Code fehlt} other {# USt-Codes fehlen}}",
    'invoices.vat_panel.missing_code': "- fehlt -",
    'invoices.vat_panel.default_fallback_badge': "Standard",
    'invoices.vat_panel.default_fallback_tooltip': "Mit dem Standard-USt-Code des Arbeitsbereichs codiert. Prüfung empfohlen.",
    'invoices.vat_panel.mismatch_tooltip': "Die Elemente dieses Codes passen nicht mehr zur Zeile. Prüfen oder neu wählen.",
    'invoices.vat_panel.add_code': "+ Hinzufügen",
    'invoices.vat_panel.product_group': "Produkt / Leistung",
    'invoices.vat_panel.rate': "Satz",
    'invoices.vat_panel.method': "Methode",
    'invoices.vat_panel.fallback_confirm_button': "USt-Codierung OK ({count})",
    'invoices.vat_panel.advanced': "Erweitert",
  },
  categories: { '5210': "Miete", '5410': "Versand", '5330': "Software", '5610': "Personalleistungen" },
  descriptions: {
    1: "Büromiete, Einheit Dunham Street",
    2: "Kuriergebühren",
    3: "Jährliche Softwarelizenz",
    4: "Bewirtung, Mitarbeiterveranstaltung",
  },
  rendered: {
    netHeader: "Netto (EUR)",
    addMissing: "Fehlende USt-Codes hinzufügen (1)",
    summary: "4 Positionen · 1 USt-Code fehlt",
    codingOk: "USt-Codierung OK (1)",
  },
  help: { alt: "Das Raster Positionen & USt. mit vier Rechnungspositionen, bis zum rechten Ende der Tabelle gescrollt. Die erste trägt einen einfachen Code und den Hinweis, dass ihre Elemente aufgelöst sind und unter Erweitert liegen; die zweite einen bernsteinfarbenen Code, der auf Standard endet; die dritte liest sich als - fehlt - mit einem Hinzufügen-Link, und ihre drei Elementauswahlen stehen nebeneinander in der Zeile; die vierte trägt neben dem Code ein Warndreieck. Jede Zeile endet mit einem Pfeil, der ihren Bereich Erweitert öffnet. Über der Tabelle Schaltflächen, um die fehlenden Codes hinzuzufügen und die USt-Codierung als geprüft zu markieren." },
}

export const vatLinesCopy: Record<Locale, Copy> = { en, hu, de }
