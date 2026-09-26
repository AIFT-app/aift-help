// The partner's Rules tab, for the fixed-payment-method article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-23), class for class:
//   the page chrome  src/app/(app)/workspaces/[workspaceId]/master-data/
//                    partners/[partnerId]/layout.tsx (+ _components/
//                    PartnerDetailTabs.tsx)
//   the section      [partnerId]/_components/PartnerFixedPaymentMethodSection.tsx
// The article used to tell readers to scroll the partner page for this
// control, which has been on the Rules tab since the tabbed IA, so the tab
// bar is the point of the picture. Labels come from ./copy.ts.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'master_data.partners.tabs.partner',
  'master_data.partners.tabs.rules',
  'master_data.partners.tabs.recognition',
  'master_data.partners.tabs.history',
  'master_data.partners.tabs.messages',
  'master_data.partners.fixed_payment_method.heading',
  'master_data.partners.fixed_payment_method.description',
  'master_data.partners.fixed_payment_method.method_label',
  'master_data.partners.fixed_payment_method.none',
  'master_data.partners.fixed_payment_method.method_transfer',
  'master_data.partners.fixed_payment_method.method_card',
  'master_data.partners.fixed_payment_method.method_cash',
  'master_data.partners.fixed_payment_method.method_voucher',
  'master_data.partners.fixed_payment_method.method_other',
  'master_data.partners.fixed_payment_method.forward_only_help',
  'master_data.partners.fixed_payment_method.save',
  'master_data.partners.detail.reset',
  'master_data.partners.detail.chip_payment_method',
  'nav.master_data.partners',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = { ui: Record<UiKey, string>; rendered: { chip: string }; help: { alt: string } }

/** Fictional partner, as the house rule requires. */
export const PARTNER = 'Gearmont Fleet Services Ltd.'
export const TABS = ['partner', 'rules', 'recognition', 'history', 'messages'] as const
export const METHODS = ['transfer', 'card', 'cash', 'voucher', 'other'] as const
/** The rule the article's worked example sets. */
export const SELECTED = 'card'


const en: Copy = {
  ui: {
    'master_data.partners.tabs.partner': "Partner",
    'master_data.partners.tabs.rules': "Rules",
    'master_data.partners.tabs.recognition': "Recognition",
    'master_data.partners.tabs.history': "History",
    'master_data.partners.tabs.messages': "Messages",
    'master_data.partners.fixed_payment_method.heading': "Fixed payment method",
    'master_data.partners.fixed_payment_method.description': "Use this payment method for the partner's invoices instead of the one the invoice or NAV states.",
    'master_data.partners.fixed_payment_method.method_label': "Fixed payment method",
    'master_data.partners.fixed_payment_method.none': "None",
    'master_data.partners.fixed_payment_method.method_transfer': "Bank transfer",
    'master_data.partners.fixed_payment_method.method_card': "Bank card",
    'master_data.partners.fixed_payment_method.method_cash': "Cash",
    'master_data.partners.fixed_payment_method.method_voucher': "Voucher",
    'master_data.partners.fixed_payment_method.method_other': "Other",
    'master_data.partners.fixed_payment_method.forward_only_help': "Some suppliers report a card payment as cash, which closes the invoice and keeps it out of matching. Only invoices that arrive after you save this will use it. Invoices already in the system stay as they are - correct those one by one on the invoice itself.",
    'master_data.partners.fixed_payment_method.save': "Save",
    'master_data.partners.detail.reset': "Reset",
    'master_data.partners.detail.chip_payment_method': "Payment: {method}",
    'nav.master_data.partners': "Partners",
  },
  rendered: { chip: "Payment: Bank card" },
  help: { alt: "The partner page with the Rules tab open, the header carrying a Payment chip, and the Fixed payment method section with its dropdown set to Bank card and its forward-only note underneath." },
}

const hu: Copy = {
  ui: {
    'master_data.partners.tabs.partner': "Partner",
    'master_data.partners.tabs.rules': "Szabályok",
    'master_data.partners.tabs.recognition': "Felismerés",
    'master_data.partners.tabs.history': "Előzmények",
    'master_data.partners.tabs.messages': "Üzenetek",
    'master_data.partners.fixed_payment_method.heading': "Rögzített fizetési mód",
    'master_data.partners.fixed_payment_method.description': "A partner számláinál ezt a fizetési módot használjuk a számlán vagy a NAV-adatban szereplő helyett.",
    'master_data.partners.fixed_payment_method.method_label': "Rögzített fizetési mód",
    'master_data.partners.fixed_payment_method.none': "Nincs",
    'master_data.partners.fixed_payment_method.method_transfer': "Átutalás",
    'master_data.partners.fixed_payment_method.method_card': "Bankkártya",
    'master_data.partners.fixed_payment_method.method_cash': "Készpénz",
    'master_data.partners.fixed_payment_method.method_voucher': "Utalvány",
    'master_data.partners.fixed_payment_method.method_other': "Egyéb",
    'master_data.partners.fixed_payment_method.forward_only_help': "Egyes szállítók a bankkártyás fizetést készpénzként jelentik, ami lezárja a számlát és kihagyja a párosításból. Csak a mentés után beérkező számlákra érvényes. A rendszerben már meglévő számlák változatlanok maradnak - azokat egyesével javítsd magán a számlán.",
    'master_data.partners.fixed_payment_method.save': "Mentés",
    'master_data.partners.detail.reset': "Visszaállítás",
    'master_data.partners.detail.chip_payment_method': "Fizetés: {method}",
    'nav.master_data.partners': "Partnerek",
  },
  rendered: { chip: "Fizetés: Bankkártya" },
  help: { alt: "A partner oldala megnyitott Szabályok füllel, a fejlécben Fizetés címkével, és a Rögzített fizetési mód szakasszal, amelynek legördülő menüje Bankkártyára van állítva, alatta a csak előre ható szabályt magyarázó megjegyzéssel." },
}

const de: Copy = {
  ui: {
    'master_data.partners.tabs.partner': "Partner",
    'master_data.partners.tabs.rules': "Regeln",
    'master_data.partners.tabs.recognition': "Erkennung",
    'master_data.partners.tabs.history': "Verlauf",
    'master_data.partners.tabs.messages': "Nachrichten",
    'master_data.partners.fixed_payment_method.heading': "Feste Zahlungsart",
    'master_data.partners.fixed_payment_method.description': "Verwendet für die Rechnungen dieses Partners diese Zahlungsart statt der auf der Rechnung bzw. in NAV angegebenen.",
    'master_data.partners.fixed_payment_method.method_label': "Feste Zahlungsart",
    'master_data.partners.fixed_payment_method.none': "Keine",
    'master_data.partners.fixed_payment_method.method_transfer': "Überweisung",
    'master_data.partners.fixed_payment_method.method_card': "Bankkarte",
    'master_data.partners.fixed_payment_method.method_cash': "Bar",
    'master_data.partners.fixed_payment_method.method_voucher': "Gutschein",
    'master_data.partners.fixed_payment_method.method_other': "Sonstige",
    'master_data.partners.fixed_payment_method.forward_only_help': "Manche Lieferanten melden eine Kartenzahlung als Barzahlung, wodurch die Rechnung geschlossen und vom Abgleich ausgenommen wird. Gilt nur für Rechnungen, die nach dem Speichern eingehen. Bereits vorhandene Rechnungen bleiben unverändert - korrigieren Sie diese einzeln auf der Rechnung selbst.",
    'master_data.partners.fixed_payment_method.save': "Speichern",
    'master_data.partners.detail.reset': "Zurücksetzen",
    'master_data.partners.detail.chip_payment_method': "Zahlung: {method}",
    'nav.master_data.partners': "Partner",
  },
  rendered: { chip: "Zahlung: Bankkarte" },
  help: { alt: "Die Partnerseite mit geöffnetem Reiter Regeln, einem Zahlungs-Chip in der Kopfzeile und dem Abschnitt Feste Zahlungsart, dessen Auswahl auf Bankkarte steht, darunter der Hinweis, dass die Regel nur vorwärts wirkt." },
}

export const partnerRulesCopy: Record<Locale, Copy> = { en, hu, de }
