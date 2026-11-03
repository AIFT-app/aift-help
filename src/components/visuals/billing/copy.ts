// Text and data for the billing illustrations (billing).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key. Hungarian
// ones are tegező because the app is. `help` holds the article's own words
// (alt text), magázó in Hungarian like every aift-help article.
//
// Prices are the one public package of PRD billing-single-package (decided
// 2026-11-02): Squirrel, 27 000 Ft / EUR 75 a month with 400 invoices, then
// graduated bands of 88 / 81 / 74 Ft (EUR 0.24 / 0.23 / 0.21) up to 1 500, up
// to 3 000 and above. The price a Hungarian office sees is in forint, every
// other office in euro, so the Hungarian plan picker shows HUF and the other
// two show EUR. The billing-details dialog exists only for Hungarian offices,
// so it shows the forint price in every locale. When the catalogue changes,
// change PLAN. The office name (Tarvesz Könyvelő Kft., web-searched 2026-10-04,
// no business of that name) and the 620 invoices are fictional.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  "org.settings.title",
  "org.settings.billing.heading",
  "org.settings.billing.description",
  "org.settings.billing.picker_heading",
  "org.settings.billing.picker_intro",
  "org.settings.billing.trial_offer",
  "org.settings.billing.recommendation_basis",
  "org.settings.billing.plan_name_assistant_500",
  "org.settings.billing.plan_desc_assistant_500",
  "org.settings.billing.price_suffix",
  "org.settings.billing.included_line_month",
  "org.settings.billing.per_document",
  "org.settings.billing.your_cost_at",
  "org.settings.billing.amount_per_month",
  "org.settings.billing.subscribe",
  "org.settings.billing.picker_footnote",
  "org.settings.billing.band_up_to",
  "org.settings.billing.band_above",
  "org.settings.billing.band_rate",
  "org.settings.billing.long_term",
  "org.settings.billing.talk_to_us",
  "org.settings.billing.legal_links",
  "org.settings.billing.identity_title",
  "org.settings.billing.identity_intro",
  "org.settings.billing.identity_business_name",
  "org.settings.billing.identity_tax_number",
  "org.settings.billing.identity_tax_number_hint",
  "org.settings.billing.identity_cancel",
  "org.settings.billing.identity_continue",
  "org.settings.billing.tax_number_error_eu_vat",
] as const

export type UiKey = (typeof UI_KEYS)[number]

/**
 * One paid band of the graduated overage, as Stripe defines it: `upTo` is the
 * CUMULATIVE count where the band ends (null on the open last band).
 */
export type Band = { upTo: number | null; rate: number }

export type Plan = {
  key: 'assistant_500'
  included: number
  /** Monthly base price in the currency's major unit. */
  month: number
  /** Every paid band above the allowance, in order, rate in the major unit. */
  bands: Band[]
}

type Copy = {
  ui: Record<UiKey, string>
  currency: 'HUF' | 'EUR'
  plan: Plan
  /** The office's busiest recent month, drives the estimate. */
  busiestMonth: number
  office: string
  help: { altPicker: string; altDialog: string }
}

const EUR_PLAN: Plan = {
  key: 'assistant_500',
  included: 400,
  month: 75,
  bands: [
    { upTo: 1500, rate: 0.24 },
    { upTo: 3000, rate: 0.23 },
    { upTo: null, rate: 0.21 },
  ],
}
const HUF_PLAN: Plan = {
  key: 'assistant_500',
  included: 400,
  month: 27000,
  bands: [
    { upTo: 1500, rate: 88 },
    { upTo: 3000, rate: 81 },
    { upTo: null, rate: 74 },
  ],
}

const en: Copy = {
  ui: {
    "org.settings.title": "Organization settings",
    "org.settings.billing.heading": "Billing",
    "org.settings.billing.description": "Manage your office's subscription and invoices.",
    "org.settings.billing.picker_heading": "Choose your plan",
    "org.settings.billing.picker_intro": "One plan for your whole office, with unlimited clients and users.",
    "org.settings.billing.trial_offer": "The plan starts with a 14-day free trial.",
    "org.settings.billing.recommendation_basis": "Estimated from your busiest recent month: <strong>{documents} invoices</strong>.",
    "org.settings.billing.plan_name_assistant_500": "Squirrel",
    "org.settings.billing.plan_desc_assistant_500": "Solo bookkeepers & small firms",
    "org.settings.billing.price_suffix": "/ month",
    "org.settings.billing.included_line_month": "<strong>{count} invoices</strong> / month included",
    "org.settings.billing.per_document": "Per invoice",
    "org.settings.billing.your_cost_at": "Your cost at {documents} invoices / month",
    "org.settings.billing.amount_per_month": "{amount} / month",
    "org.settings.billing.subscribe": "Start 14-day free trial",
    "org.settings.billing.picker_footnote": "Extra invoices are charged in bands: each band's rate applies only to the invoices inside it. You are never cut off. Only invoices count, bank transactions do not. Prices exclude VAT. Firms in Hungary are charged 27% VAT; firms outside Hungary enter their VAT ID at checkout for reverse charge.",
    "org.settings.billing.band_up_to": "Up to {count} invoices",
    "org.settings.billing.band_above": "Above {count} invoices",
    "org.settings.billing.band_rate": "{price} / invoice",
    "org.settings.billing.long_term": "A longer commitment on individual terms is also possible.",
    "org.settings.billing.talk_to_us": "Talk to us →",
    "org.settings.billing.legal_links": "Prices are set out in the <pricing>Price List</pricing>, which forms part of the <terms>Terms of Service</terms>.",
    "org.settings.billing.identity_title": "Billing details",
    "org.settings.billing.identity_intro": "<strong>{plan}</strong> plan, <strong>{price}</strong> + VAT. These details go on your invoice.",
    "org.settings.billing.identity_business_name": "Company name",
    "org.settings.billing.identity_tax_number": "Tax number (adószám)",
    "org.settings.billing.identity_tax_number_hint": "Your Hungarian tax number, 11 digits.",
    "org.settings.billing.identity_cancel": "Cancel",
    "org.settings.billing.identity_continue": "Continue to payment",
    "org.settings.billing.tax_number_error_eu_vat": "This is the EU VAT number. Enter the Hungarian tax number here, 11 digits (12345678-1-23).",
  },
  currency: 'EUR',
  plan: EUR_PLAN,
  busiestMonth: 620,
  office: 'Tarvesz Könyvelő Kft.',
  help: {
    altPicker: "The Billing page of an office that has not subscribed yet, with euro prices: the Choose your plan heading, the line saying the estimate is based on the busiest recent month of 620 invoices, and one package card, Squirrel. The card shows EUR 75 a month, 400 invoices a month included, the three bands above that (up to 1,500 invoices at EUR 0.24, up to 3,000 at EUR 0.23 and above 3,000 at EUR 0.21 per invoice), the cost at 620 invoices a month, and the Start 14-day free trial button. Numbered markers point at the parts the list below describes.",
    altDialog: "The Billing details window a Hungarian office sees before payment: Squirrel plan, HUF 27,000 a month plus VAT; Company name filled in as Tarvesz Könyvelő Kft.; in the Tax number field an EU VAT number, HU12345678, with the red message saying this is the EU VAT number and the 11-digit Hungarian tax number is needed. The Continue to payment button is greyed out. Numbered markers point at the parts the list below describes.",
  },
}

const hu: Copy = {
  ui: {
    "org.settings.title": "Szervezeti beállítások",
    "org.settings.billing.heading": "Számlázás",
    "org.settings.billing.description": "Az iroda előfizetésének és számláinak kezelése.",
    "org.settings.billing.picker_heading": "Válassz csomagot",
    "org.settings.billing.picker_intro": "Egy csomag az egész irodának, korlátlan ügyfél- és felhasználószámmal.",
    "org.settings.billing.trial_offer": "A csomag 14 napos ingyenes próbával indul.",
    "org.settings.billing.recommendation_basis": "A becslés a legforgalmasabb utóbbi hónapod alapján: <strong>{documents} számla</strong>.",
    "org.settings.billing.plan_name_assistant_500": "Mókus",
    "org.settings.billing.plan_desc_assistant_500": "Egyéni könyvelők és kis irodák",
    "org.settings.billing.price_suffix": "/ hó",
    "org.settings.billing.included_line_month": "<strong>{count} számla</strong> / hó benne",
    "org.settings.billing.per_document": "Számlánként",
    "org.settings.billing.your_cost_at": "A költséged {documents} számla / hó mellett",
    "org.settings.billing.amount_per_month": "{amount} / hó",
    "org.settings.billing.subscribe": "14 napos ingyenes próba",
    "org.settings.billing.picker_footnote": "A kereten felüli számlák a feltüntetett sávos díjjal számlázódnak: minden sáv díja csak a sávba eső számlákra vonatkozik. A szolgáltatás nem áll le. Csak a számlák számítanak bele, a banki tranzakciók nem. Az árak áfa nélkül értendők. A magyarországi irodák számláján 27% áfa szerepel; a fordított adózás csak a Magyarországon kívüli irodákra vonatkozik.",
    "org.settings.billing.band_up_to": "{count} számláig",
    "org.settings.billing.band_above": "{count} számla felett",
    "org.settings.billing.band_rate": "{price} / számla",
    "org.settings.billing.long_term": "Hosszabb távú elköteleződést egyedi feltételekkel is vállalunk.",
    "org.settings.billing.talk_to_us": "Beszéljünk →",
    "org.settings.billing.legal_links": "Az árakat a <pricing>Díjszabás</pricing> tartalmazza, amely az <terms>ÁSZF</terms> részét képezi.",
    "org.settings.billing.identity_title": "Számlázási adatok",
    "org.settings.billing.identity_intro": "<strong>{plan}</strong> csomag, <strong>{price}</strong> + áfa. Ezek az adatok kerülnek a számládra.",
    "org.settings.billing.identity_business_name": "Cégnév",
    "org.settings.billing.identity_tax_number": "Adószám",
    "org.settings.billing.identity_tax_number_hint": "A magyar adószám, 11 számjeggyel.",
    "org.settings.billing.identity_cancel": "Mégse",
    "org.settings.billing.identity_continue": "Tovább a fizetéshez",
    "org.settings.billing.tax_number_error_eu_vat": "Ez a közösségi adószám. Itt a magyar adószámot add meg, 11 számjeggyel (12345678-1-23).",
  },
  currency: 'HUF',
  plan: HUF_PLAN,
  busiestMonth: 620,
  office: 'Tarvesz Könyvelő Kft.',
  help: {
    altPicker: "Egy még elő nem fizetett iroda Számlázás oldala: a Válassz csomagot cím, a sor, amely szerint a becslés a legforgalmasabb utóbbi hónap 620 számláján alapul, és egyetlen csomag, a Mókus. A kártyán látszik a havi 27 000 Ft, a havonta benne foglalt 400 számla, az e fölötti három sáv (1 500 számláig 88 Ft, 3 000 számláig 81 Ft, 3 000 számla felett 74 Ft számlánként), a költség havi 620 számlánál, és a 14 napos ingyenes próba gomb. A számozott jelölők az alábbi lista elemeire mutatnak.",
    altDialog: "A Számlázási adatok ablak, amelyet egy magyarországi iroda a fizetés előtt lát: Mókus csomag, 27 000 Ft / hó + áfa; a Cégnév mezőben Tarvesz Könyvelő Kft.; az Adószám mezőben a HU12345678 közösségi adószám, alatta piros üzenet, hogy ez a közösségi adószám, és a 11 számjegyű magyar adószámot kell megadni. A Tovább a fizetéshez gomb szürke. A számozott jelölők az alábbi lista elemeire mutatnak.",
  },
}

const de: Copy = {
  ui: {
    "org.settings.title": "Organisationseinstellungen",
    "org.settings.billing.heading": "Abrechnung",
    "org.settings.billing.description": "Verwalten Sie das Abonnement und die Rechnungen Ihrer Kanzlei.",
    "org.settings.billing.picker_heading": "Wählen Sie Ihren Tarif",
    "org.settings.billing.picker_intro": "Ein Tarif für Ihre ganze Kanzlei, mit unbegrenzt vielen Klienten und Benutzern.",
    "org.settings.billing.trial_offer": "Der Tarif startet mit einer 14-tägigen kostenlosen Testphase.",
    "org.settings.billing.recommendation_basis": "Geschätzt auf Basis Ihres stärksten Monats der letzten Zeit: <strong>{documents} Rechnungen</strong>.",
    "org.settings.billing.plan_name_assistant_500": "Eichhörnchen",
    "org.settings.billing.plan_desc_assistant_500": "Einzelbuchhalter & kleine Kanzleien",
    "org.settings.billing.price_suffix": "/ Monat",
    "org.settings.billing.included_line_month": "<strong>{count} Rechnungen</strong> / Monat inklusive",
    "org.settings.billing.per_document": "Pro Rechnung",
    "org.settings.billing.your_cost_at": "Ihre Kosten bei {documents} Rechnungen / Monat",
    "org.settings.billing.amount_per_month": "{amount} / Monat",
    "org.settings.billing.subscribe": "14 Tage kostenlos testen",
    "org.settings.billing.picker_footnote": "Zusätzliche Rechnungen werden gestaffelt berechnet: der Satz einer Stufe gilt nur für die Rechnungen in dieser Stufe. Es wird nie abgeschaltet. Nur Rechnungen zählen, Banktransaktionen nicht. Preise zzgl. USt. Für Kanzleien in Ungarn werden 27% ungarische USt berechnet; Kanzleien außerhalb Ungarns geben ihre USt-IdNr. beim Checkout für das Reverse-Charge-Verfahren an.",
    "org.settings.billing.band_up_to": "Bis {count} Rechnungen",
    "org.settings.billing.band_above": "Über {count} Rechnungen",
    "org.settings.billing.band_rate": "{price} / Rechnung",
    "org.settings.billing.long_term": "Eine längerfristige Bindung zu individuellen Konditionen ist ebenfalls möglich.",
    "org.settings.billing.talk_to_us": "Sprechen Sie mit uns →",
    "org.settings.billing.legal_links": "Die Preise sind in der <pricing>Preisliste</pricing> festgelegt, die Bestandteil der <terms>Nutzungsbedingungen</terms> ist.",
    "org.settings.billing.identity_title": "Rechnungsdaten",
    "org.settings.billing.identity_intro": "<strong>{plan}</strong>, <strong>{price}</strong> zzgl. MwSt. Diese Angaben erscheinen auf Ihrer Rechnung.",
    "org.settings.billing.identity_business_name": "Firmenname",
    "org.settings.billing.identity_tax_number": "Steuernummer (adószám)",
    "org.settings.billing.identity_tax_number_hint": "Ihre ungarische Steuernummer, 11 Ziffern.",
    "org.settings.billing.identity_cancel": "Abbrechen",
    "org.settings.billing.identity_continue": "Weiter zur Zahlung",
    "org.settings.billing.tax_number_error_eu_vat": "Das ist die EU-USt-IdNr. Geben Sie hier die ungarische Steuernummer ein, 11 Ziffern (12345678-1-23).",
  },
  currency: 'EUR',
  plan: EUR_PLAN,
  busiestMonth: 620,
  office: 'Tarvesz Könyvelő Kft.',
  help: {
    altPicker: "Die Seite Abrechnung einer Kanzlei ohne Abonnement, mit Euro-Preisen: die Überschrift Wählen Sie Ihren Tarif, die Zeile, nach der die Schätzung auf dem stärksten Monat der letzten Zeit mit 620 Rechnungen beruht, und ein Tarif, Eichhörnchen. Die Karte zeigt 75 EUR pro Monat, 400 enthaltene Rechnungen pro Monat, die drei Stufen darüber (bis 1.500 Rechnungen 0,24 EUR, bis 3.000 Rechnungen 0,23 EUR und über 3.000 Rechnungen 0,21 EUR pro Rechnung), die Kosten bei 620 Rechnungen im Monat und die Schaltfläche 14 Tage kostenlos testen. Nummerierte Markierungen zeigen auf die Teile, die die Liste darunter beschreibt.",
    altDialog: "Das Fenster Rechnungsdaten, das eine Kanzlei in Ungarn vor der Zahlung sieht: Tarif Eichhörnchen, 27.000 HUF pro Monat zzgl. MwSt.; Firmenname Tarvesz Könyvelő Kft.; im Feld Steuernummer die EU-USt-IdNr. HU12345678 mit der roten Meldung, dass dies die EU-USt-IdNr. ist und die 11-stellige ungarische Steuernummer verlangt wird. Die Schaltfläche Weiter zur Zahlung ist ausgegraut. Nummerierte Markierungen zeigen auf die Teile, die die Liste darunter beschreibt.",
  },
}

export const billingCopy: Record<Locale, Copy> = { en, hu, de }
