// Text and data for the billing illustrations (billing).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key. Hungarian
// ones are tegező because the app is. `help` holds the article's own words
// (alt text), magázó in Hungarian like every aift-help article.
//
// Prices are the live Stripe catalogue on 2026-10-04 (base prices and the
// EUR 0.21 / 75 Ft overage): the price a Hungarian office sees is in forint,
// every other office in euro, so the Hungarian plan picker shows HUF and the other
// two show EUR. The billing-details dialog exists only for Hungarian offices,
// so it shows the forint price in every locale. When the catalogue changes, change PLANS. The office name
// (Tarvesz Könyvelő Kft., web-searched 2026-10-04, no business of that name)
// and the 1 840 entries are fictional.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  "org.settings.title",
  "org.settings.billing.heading",
  "org.settings.billing.description",
  "org.settings.billing.picker_heading",
  "org.settings.billing.picker_intro",
  "org.settings.billing.trial_offer",
  "org.settings.billing.interval_label",
  "org.settings.billing.interval_month",
  "org.settings.billing.interval_year",
  "org.settings.billing.save_up_to",
  "org.settings.billing.recommendation_basis",
  "org.settings.billing.recommended",
  "org.settings.billing.plan_name_assistant_500",
  "org.settings.billing.plan_name_assistant_2000",
  "org.settings.billing.plan_name_assistant_5000",
  "org.settings.billing.plan_desc_assistant_500",
  "org.settings.billing.plan_desc_assistant_2000",
  "org.settings.billing.plan_desc_assistant_5000",
  "org.settings.billing.price_suffix",
  "org.settings.billing.included_line_month",
  "org.settings.billing.then_per_document",
  "org.settings.billing.per_document",
  "org.settings.billing.your_cost_at",
  "org.settings.billing.amount_per_month",
  "org.settings.billing.subscribe",
  "org.settings.billing.picker_footnote",
  "org.settings.billing.need_more",
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

export type Plan = {
  key: 'assistant_500' | 'assistant_2000' | 'assistant_5000'
  included: number
  /** Monthly base price in the currency's major unit. */
  month: number
  /** Annual base price, used for the per-tier saving. */
  year: number
}

type Copy = {
  ui: Record<UiKey, string>
  currency: 'HUF' | 'EUR'
  plans: Plan[]
  /** Price per entry above the allowance, major unit. */
  overage: number
  /** The office's busiest recent month, drives the recommendation. */
  busiestMonth: number
  office: string
  help: { altPicker: string; altDialog: string }
}

const EUR_PLANS: Plan[] = [
  { key: 'assistant_500', included: 500, month: 75, year: 780 },
  { key: 'assistant_2000', included: 2000, month: 275, year: 2820 },
  { key: 'assistant_5000', included: 5000, month: 650, year: 6660 },
]
const HUF_PLANS: Plan[] = [
  { key: 'assistant_500', included: 500, month: 27000, year: 280800 },
  { key: 'assistant_2000', included: 2000, month: 99000, year: 1015200 },
  { key: 'assistant_5000', included: 5000, month: 234000, year: 2397600 },
]

const en: Copy = {
  ui: {
    "org.settings.title": "Organization settings",
    "org.settings.billing.heading": "Billing",
    "org.settings.billing.description": "Manage your office's subscription and invoices.",
    "org.settings.billing.picker_heading": "Choose your plan",
    "org.settings.billing.picker_intro": "One plan for your whole office, with unlimited clients and users.",
    "org.settings.billing.trial_offer": "Every plan starts with a 14-day free trial.",
    "org.settings.billing.interval_label": "Billing interval",
    "org.settings.billing.interval_month": "Monthly",
    "org.settings.billing.interval_year": "Annual",
    "org.settings.billing.save_up_to": "Save up to {percent}%",
    "org.settings.billing.recommendation_basis": "Recommended for you based on your busiest recent month: <strong>{documents} entries</strong>.",
    "org.settings.billing.recommended": "Best for you",
    "org.settings.billing.plan_name_assistant_500": "Squirrel",
    "org.settings.billing.plan_name_assistant_2000": "Beaver",
    "org.settings.billing.plan_name_assistant_5000": "Bear",
    "org.settings.billing.plan_desc_assistant_500": "Solo bookkeepers & small firms",
    "org.settings.billing.plan_desc_assistant_2000": "Growing practices, 10-30 clients",
    "org.settings.billing.plan_desc_assistant_5000": "High-volume & multi-office firms",
    "org.settings.billing.price_suffix": "/ month",
    "org.settings.billing.included_line_month": "<strong>{count} entries</strong> / month included",
    "org.settings.billing.then_per_document": "then {price} / entry",
    "org.settings.billing.per_document": "Per entry",
    "org.settings.billing.your_cost_at": "Your cost at {documents} entries / month",
    "org.settings.billing.amount_per_month": "{amount} / month",
    "org.settings.billing.subscribe": "Start 14-day free trial",
    "org.settings.billing.picker_footnote": "Extra entries are charged at the rate shown; you are never cut off. Prices exclude VAT. Firms in Hungary are charged 27% VAT; firms outside Hungary enter their VAT ID at checkout for reverse charge.",
    "org.settings.billing.need_more": "Need more than {count} entries a month?",
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
  plans: EUR_PLANS,
  overage: 0.21,
  busiestMonth: 1840,
  office: 'Tarvesz Könyvelő Kft.',
  help: {
    altPicker: "The Billing page of an office that has not subscribed yet, with euro prices: the Choose your plan heading, the Monthly and Annual switch with the up-to-15% saving, the line saying the recommendation is based on the busiest recent month of 1,840 entries, and three plan cards (Squirrel, Beaver, Bear). Beaver carries the Best for you badge; each card shows its price, the entries included, the price per entry above that, the cost at 1,840 entries a month, and the Start 14-day free trial button. Numbered markers point at the parts the list below describes.",
    altDialog: "The Billing details window a Hungarian office sees before payment: Beaver plan, HUF 99,000 a month plus VAT; Company name filled in as Tarvesz Könyvelő Kft.; in the Tax number field an EU VAT number, HU12345678, with the red message saying this is the EU VAT number and the 11-digit Hungarian tax number is needed. The Continue to payment button is greyed out. Numbered markers point at the parts the list below describes.",
  },
}

const hu: Copy = {
  ui: {
    "org.settings.title": "Szervezeti beállítások",
    "org.settings.billing.heading": "Számlázás",
    "org.settings.billing.description": "Az iroda előfizetésének és számláinak kezelése.",
    "org.settings.billing.picker_heading": "Válassz csomagot",
    "org.settings.billing.picker_intro": "Egy csomag az egész irodának, korlátlan ügyfél- és felhasználószámmal.",
    "org.settings.billing.trial_offer": "Minden csomag 14 napos ingyenes próbával indul.",
    "org.settings.billing.interval_label": "Számlázási ciklus",
    "org.settings.billing.interval_month": "Havi",
    "org.settings.billing.interval_year": "Éves",
    "org.settings.billing.save_up_to": "Akár {percent}% megtakarítás",
    "org.settings.billing.recommendation_basis": "Ajánlatunk a legforgalmasabb utóbbi hónapod alapján: <strong>{documents} tétel</strong>.",
    "org.settings.billing.recommended": "Neked ajánlott",
    "org.settings.billing.plan_name_assistant_500": "Mókus",
    "org.settings.billing.plan_name_assistant_2000": "Hód",
    "org.settings.billing.plan_name_assistant_5000": "Medve",
    "org.settings.billing.plan_desc_assistant_500": "Egyéni könyvelők és kis irodák",
    "org.settings.billing.plan_desc_assistant_2000": "Növekvő irodák, 10-30 ügyfél",
    "org.settings.billing.plan_desc_assistant_5000": "Nagy volumenű és több irodás cégek",
    "org.settings.billing.price_suffix": "/ hó",
    "org.settings.billing.included_line_month": "<strong>{count} tétel</strong> / hó benne",
    "org.settings.billing.then_per_document": "utána {price} / tétel",
    "org.settings.billing.per_document": "Tételenként",
    "org.settings.billing.your_cost_at": "A költséged {documents} tétel / hó mellett",
    "org.settings.billing.amount_per_month": "{amount} / hó",
    "org.settings.billing.subscribe": "14 napos ingyenes próba",
    "org.settings.billing.picker_footnote": "A kereten felüli tételek a feltüntetett díjjal számlázódnak; a szolgáltatás nem áll le. Az árak áfa nélkül értendők. A magyarországi irodák számláján 27% áfa szerepel; a fordított adózás csak a Magyarországon kívüli irodákra vonatkozik.",
    "org.settings.billing.need_more": "Több mint {count} tétel havonta?",
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
  plans: HUF_PLANS,
  overage: 75,
  busiestMonth: 1840,
  office: 'Tarvesz Könyvelő Kft.',
  help: {
    altPicker: "Egy még elő nem fizetett iroda Számlázás oldala: a Válassz csomagot cím, a Havi és Éves kapcsoló az akár 15%-os megtakarítással, a sor, amely szerint az ajánlat a legforgalmasabb utóbbi hónap 1 840 tételén alapul, és három csomag (Mókus, Hód, Medve). A Hód kártyán a Neked ajánlott jelölés áll; minden kártyán látszik a havidíj, a benne foglalt tételek száma, a kereten felüli tételár, a költség havi 1 840 tételnél, és a 14 napos ingyenes próba gomb. A számozott jelölők az alábbi lista elemeire mutatnak.",
    altDialog: "A Számlázási adatok ablak, amelyet egy magyarországi iroda a fizetés előtt lát: Hód csomag, 99 000 Ft / hó + áfa; a Cégnév mezőben Tarvesz Könyvelő Kft.; az Adószám mezőben a HU12345678 közösségi adószám, alatta piros üzenet, hogy ez a közösségi adószám, és a 11 számjegyű magyar adószámot kell megadni. A Tovább a fizetéshez gomb szürke. A számozott jelölők az alábbi lista elemeire mutatnak.",
  },
}

const de: Copy = {
  ui: {
    "org.settings.title": "Organisationseinstellungen",
    "org.settings.billing.heading": "Abrechnung",
    "org.settings.billing.description": "Verwalten Sie das Abonnement und die Rechnungen Ihrer Kanzlei.",
    "org.settings.billing.picker_heading": "Wählen Sie Ihren Tarif",
    "org.settings.billing.picker_intro": "Ein Tarif für Ihre ganze Kanzlei, mit unbegrenzt vielen Klienten und Benutzern.",
    "org.settings.billing.trial_offer": "Jeder Tarif startet mit einer 14-tägigen kostenlosen Testphase.",
    "org.settings.billing.interval_label": "Abrechnungsintervall",
    "org.settings.billing.interval_month": "Monatlich",
    "org.settings.billing.interval_year": "Jährlich",
    "org.settings.billing.save_up_to": "Bis zu {percent}% sparen",
    "org.settings.billing.recommendation_basis": "Empfohlen auf Basis Ihres stärksten Monats der letzten Zeit: <strong>{documents} Belege</strong>.",
    "org.settings.billing.recommended": "Für Sie am besten",
    "org.settings.billing.plan_name_assistant_500": "Eichhörnchen",
    "org.settings.billing.plan_name_assistant_2000": "Biber",
    "org.settings.billing.plan_name_assistant_5000": "Bär",
    "org.settings.billing.plan_desc_assistant_500": "Einzelbuchhalter & kleine Kanzleien",
    "org.settings.billing.plan_desc_assistant_2000": "Wachsende Kanzleien, 10-30 Klienten",
    "org.settings.billing.plan_desc_assistant_5000": "Kanzleien mit hohem Volumen & mehreren Standorten",
    "org.settings.billing.price_suffix": "/ Monat",
    "org.settings.billing.included_line_month": "<strong>{count} Belege</strong> / Monat inklusive",
    "org.settings.billing.then_per_document": "danach {price} / Beleg",
    "org.settings.billing.per_document": "Pro Beleg",
    "org.settings.billing.your_cost_at": "Ihre Kosten bei {documents} Belegen / Monat",
    "org.settings.billing.amount_per_month": "{amount} / Monat",
    "org.settings.billing.subscribe": "14 Tage kostenlos testen",
    "org.settings.billing.picker_footnote": "Zusätzliche Belege werden zum angegebenen Satz berechnet; es wird nie abgeschaltet. Preise zzgl. USt. Für Kanzleien in Ungarn werden 27% ungarische USt berechnet; Kanzleien außerhalb Ungarns geben ihre USt-IdNr. beim Checkout für das Reverse-Charge-Verfahren an.",
    "org.settings.billing.need_more": "Mehr als {count} Belege pro Monat?",
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
  plans: EUR_PLANS,
  overage: 0.21,
  busiestMonth: 1840,
  office: 'Tarvesz Könyvelő Kft.',
  help: {
    altPicker: "Die Seite Abrechnung einer Kanzlei ohne Abonnement: die Überschrift Wählen Sie Ihren Tarif, der Schalter Monatlich und Jährlich mit bis zu 15% Ersparnis, die Zeile, nach der die Empfehlung auf dem stärksten Monat der letzten Zeit mit 1.840 Belegen beruht, und drei Tarife (Eichhörnchen, Biber, Bär). Biber trägt die Markierung Für Sie am besten; jede Karte zeigt den Preis, die enthaltenen Belege, den Preis je weiterem Beleg, die Kosten bei 1.840 Belegen im Monat und die Schaltfläche 14 Tage kostenlos testen. Nummerierte Markierungen zeigen auf die Teile, die die Liste darunter beschreibt.",
    altDialog: "Das Fenster Rechnungsdaten, das eine Kanzlei in Ungarn vor der Zahlung sieht: Tarif Biber, 99.000 HUF pro Monat zzgl. MwSt.; Firmenname Tarvesz Könyvelő Kft.; im Feld Steuernummer die EU-USt-IdNr. HU12345678 mit der roten Meldung, dass dies die EU-USt-IdNr. ist und die 11-stellige ungarische Steuernummer verlangt wird. Die Schaltfläche Weiter zur Zahlung ist ausgegraut. Nummerierte Markierungen zeigen auf die Teile, die die Liste darunter beschreibt.",
  },
}

export const billingCopy: Record<Locale, Copy> = { en, hu, de }
