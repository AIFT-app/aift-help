// Text and data for the partner illustrations (partners).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key (plural-free
// messages only; placeholders are filled with `fill`). Hungarian ones are
// tegező because the app is. `help` holds the article's own words (diagram
// labels, alt text), magázó in Hungarian like every aift-help article.
//
// The data is FICTIONAL: Quillmoor Software Ltd. is the supplier whose account
// is "seen for the first time" in the payment file illustration, the same
// account here "Not confirmed". Hungarian account numbers are invented with
// valid check digits; the German version uses the published UK example IBANs,
// as the payment file illustration does. Never real data.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'nav.master_data.partners',
  'master_data.partners.detail.merge_into',
  'master_data.partners.detail.chip_fixed_invoice_category',
  'master_data.partners.tabs.partner',
  'master_data.partners.tabs.rules',
  'master_data.partners.tabs.recognition',
  'master_data.partners.tabs.history',
  'master_data.partners.tabs.messages',
  'master_data.partners.alternative_names.title',
  'master_data.partners.alternative_names.description',
  'master_data.partners.alternative_names.badgeAuto',
  'master_data.partners.alternative_names.badgeManual',
  'master_data.partners.alternative_names.removeTooltip',
  'master_data.partners.alternative_names.placeholder',
  'master_data.partners.alternative_names.add',
  'master_data.partners.name_patterns.heading',
  'master_data.partners.name_patterns.description',
  'master_data.partners.name_patterns.placeholder',
  'master_data.partners.name_patterns.add',
  'master_data.partners.name_patterns.remove_aria',
  'master_data.partners.name_patterns.helper',
  'master_data.partners.name_patterns.backfill',
  'master_data.partners.bank_accounts.heading',
  'master_data.partners.bank_accounts.description',
  'master_data.partners.bank_accounts.confirmation_rule',
  'master_data.partners.bank_accounts.source_manual',
  'master_data.partners.bank_accounts.source_invoice_extraction',
  'master_data.partners.bank_accounts.confirmed_on',
  'master_data.partners.bank_accounts.unconfirmed',
  'master_data.partners.bank_accounts.confirm',
  'master_data.partners.bank_accounts.remove_aria',
  'master_data.partners.bank_accounts.add_heading',
  'master_data.partners.bank_accounts.account_label',
  'master_data.partners.bank_accounts.account_placeholder',
  'master_data.partners.bank_accounts.currency_label',
  'master_data.partners.bank_accounts.currency_placeholder',
  'master_data.partners.bank_accounts.confirm_on_add',
  'master_data.partners.bank_accounts.add',
  'invoices.labels.unverified',
  'transactions.detail.chip_own_entity',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type AltName = { value: string; origin: 'auto' | 'manual' }
export type PartnerAccount = {
  iban: string
  /** 24 digits for a Hungarian account, shown 8-8(-8); null for a foreign IBAN. */
  domestic: string | null
  currency: string
  source: 'manual' | 'invoice_extraction'
  confirmedAt: string | null
}

export const PARTNER = 'Quillmoor Software Ltd.'
export const ALT_NAMES: AltName[] = [
  { value: 'Quillmoor Software Limited', origin: 'auto' },
  { value: 'QUILLMOOR SOFTWARE', origin: 'auto' },
  { value: 'Quillmoor', origin: 'manual' },
]
/** Stored without the wildcard; the app shows it with a trailing *. */
export const NAME_PATTERNS = ['QUILLMOOR']
export const CONFIRMED_AT = '2026-03-12T09:40:00Z'

const HU_ACCOUNTS: PartnerAccount[] = [
  { iban: 'HU92120110074207735400000000', domestic: '120110074207735400000000', currency: 'EUR', source: 'invoice_extraction', confirmedAt: null },
  { iban: 'HU96120110076038412000000000', domestic: '120110076038412000000000', currency: 'HUF', source: 'manual', confirmedAt: CONFIRMED_AT },
]
const IBAN_ACCOUNTS: PartnerAccount[] = [
  { iban: 'GB29NWBK60161331926819', domestic: null, currency: 'EUR', source: 'invoice_extraction', confirmedAt: null },
  { iban: 'GB82WEST12345698765432', domestic: null, currency: 'EUR', source: 'manual', confirmedAt: CONFIRMED_AT },
]

type Copy = {
  ui: Record<UiKey, string>
  accounts: PartnerAccount[]
  help: {
    flow: {
      taxId: string
      taxIdDetail: string
      names: string
      namesDetail: string
      patterns: string
      patternsDetail: string
      account: string
      accountDetail: string
      matches: string
      matchesDetail: string
      footnote: string
    }
    alt: { flow: string; recognition: string }
  }
}

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'nav.master_data.partners': 'Partners',
    'master_data.partners.detail.merge_into': 'Merge into…',
    'master_data.partners.detail.chip_fixed_invoice_category': 'Fixed invoice category',
    'master_data.partners.tabs.partner': 'Partner',
    'master_data.partners.tabs.rules': 'Rules',
    'master_data.partners.tabs.recognition': 'Recognition',
    'master_data.partners.tabs.history': 'History',
    'master_data.partners.tabs.messages': 'Messages',
    'master_data.partners.alternative_names.title': 'Alternative names',
    'master_data.partners.alternative_names.description': 'All names this partner is identified by - both AI-extracted variants and names you\'ve added manually.',
    'master_data.partners.alternative_names.badgeAuto': 'auto',
    'master_data.partners.alternative_names.badgeManual': 'manual',
    'master_data.partners.alternative_names.removeTooltip': 'Remove? The AI will no longer use this name to identify this partner.',
    'master_data.partners.alternative_names.placeholder': 'e.g. GOOGLE ADS IRL',
    'master_data.partners.alternative_names.add': 'Add alternative name',
    'master_data.partners.name_patterns.heading': 'Name patterns',
    'master_data.partners.name_patterns.description': 'Auto-link varying vendor descriptors, such as card statements, to this partner.',
    'master_data.partners.name_patterns.placeholder': 'e.g. LinkedIn*',
    'master_data.partners.name_patterns.add': 'Add',
    'master_data.partners.name_patterns.remove_aria': 'Remove pattern',
    'master_data.partners.name_patterns.helper': 'Use a trailing * for a prefix: LinkedIn* catches LinkedIn*P3035867117 and LinkedInPreC *34952934.',
    'master_data.partners.name_patterns.backfill': 'Link matching partners now',
    'master_data.partners.bank_accounts.heading': 'Bank accounts',
    'master_data.partners.bank_accounts.description': 'Accounts this partner is paid to. An account read off an invoice or captured from a bank match is a proposal until a person confirms it.',
    'master_data.partners.bank_accounts.confirmation_rule': 'Only a confirmed account can enter a payment file. The first account seen for a supplier, and any account that differs from the confirmed one, needs a person holding Manage approvals to confirm it. This is the invoice fraud control.',
    'master_data.partners.bank_accounts.source_manual': 'typed in',
    'master_data.partners.bank_accounts.source_invoice_extraction': 'read off an invoice',
    'master_data.partners.bank_accounts.confirmed_on': 'Confirmed {date}',
    'master_data.partners.bank_accounts.unconfirmed': 'Not confirmed',
    'master_data.partners.bank_accounts.confirm': 'Confirm',
    'master_data.partners.bank_accounts.remove_aria': 'Remove bank account',
    'master_data.partners.bank_accounts.add_heading': 'Add bank account',
    'master_data.partners.bank_accounts.account_label': 'Account number or IBAN',
    'master_data.partners.bank_accounts.account_placeholder': 'e.g. 11705008-22555890 or HU58 1170 5008 …',
    'master_data.partners.bank_accounts.currency_label': 'Currency (optional)',
    'master_data.partners.bank_accounts.currency_placeholder': 'e.g. HUF',
    'master_data.partners.bank_accounts.confirm_on_add': 'Confirm this account now (I checked it with the supplier)',
    'master_data.partners.bank_accounts.add': 'Add',
    'invoices.labels.unverified': 'Unverified',
    'transactions.detail.chip_own_entity': 'Own company',
  },
  accounts: HU_ACCOUNTS,
  help: {
    flow: {
      taxId: 'Tax number',
      taxIdDetail: 'The same tax number as a known partner links the name to it.',
      names: 'Name or alternative name',
      namesDetail: "The partner's name or one of its alternative names; on a bank transaction, one within a few letters.",
      patterns: 'Name patterns',
      patternsDetail: 'Prefix rules such as LinkedIn* catch names that change every time.',
      account: 'Bank account',
      accountDetail: "An account saved on a verified partner, or one of your own companies' accounts.",
      matches: 'Confirmed matches',
      matchesDetail: 'Confirming a match links an unverified name to the verified partner on the other side.',
      footnote: 'Nothing found: the name stays unverified until someone creates or links a partner.',
    },
    alt: {
      flow:
        "Diagram of how a new name on an invoice or a bank transaction finds its verified partner: by tax number, by name or alternative name, by name pattern, by bank account (a partner's or one of your own companies'), and through confirmed matches. A name nothing recognises stays unverified.",
      recognition:
        'The Recognition tab of the partner Quillmoor Software Ltd.: the header with a Fixed invoice category chip and Merge into…, the five tabs, three alternative names marked auto or manual, the name pattern QUILLMOOR*, and two bank accounts, one Not confirmed with a Confirm button and one confirmed. Numbered markers point to the parts described in the list below.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'nav.master_data.partners': 'Partnerek',
    'master_data.partners.detail.merge_into': 'Összevonás másikkal…',
    'master_data.partners.detail.chip_fixed_invoice_category': 'Rögzített számlakategória',
    'master_data.partners.tabs.partner': 'Partner',
    'master_data.partners.tabs.rules': 'Szabályok',
    'master_data.partners.tabs.recognition': 'Felismerés',
    'master_data.partners.tabs.history': 'Előzmények',
    'master_data.partners.tabs.messages': 'Üzenetek',
    'master_data.partners.alternative_names.title': 'Alternatív nevek',
    'master_data.partners.alternative_names.description': 'Az összes név, amellyel ezt a partnert azonosítják - az AI által kinyert változatok és a kézzel hozzáadott nevek.',
    'master_data.partners.alternative_names.badgeAuto': 'auto',
    'master_data.partners.alternative_names.badgeManual': 'manuális',
    'master_data.partners.alternative_names.removeTooltip': 'Eltávolítod? Az AI a továbbiakban nem fogja használni ezt a nevet a partner azonosításához.',
    'master_data.partners.alternative_names.placeholder': 'pl. GOOGLE ADS IRL',
    'master_data.partners.alternative_names.add': 'Alternatív név hozzáadása',
    'master_data.partners.name_patterns.heading': 'Névminták',
    'master_data.partners.name_patterns.description': 'A partner változó megnevezéseit, például kártyakivonatokon, automatikusan ehhez a partnerhez köti.',
    'master_data.partners.name_patterns.placeholder': 'pl. LinkedIn*',
    'master_data.partners.name_patterns.add': 'Hozzáadás',
    'master_data.partners.name_patterns.remove_aria': 'Minta törlése',
    'master_data.partners.name_patterns.helper': 'Használj záró *-ot előtaghoz: a LinkedIn* elkapja a LinkedIn*P3035867117 és a LinkedInPreC *34952934 formát is.',
    'master_data.partners.name_patterns.backfill': 'Illeszkedő partnerek összekapcsolása most',
    'master_data.partners.bank_accounts.heading': 'Bankszámlák',
    'master_data.partners.bank_accounts.description': 'Számlák, amelyekre ezt a partnert fizeted. A számláról kiolvasott vagy bankos párosításból átvett számlaszám javaslat, amíg valaki meg nem erősíti.',
    'master_data.partners.bank_accounts.confirmation_rule': 'Utalási fájlba csak megerősített számlaszám kerülhet. Egy szállító először látott számlaszámát, és minden olyan számlaszámot, ami eltér a megerősítettől, a Jóváhagyások kezelése joggal rendelkező személynek kell megerősítenie. Ez a számlacsalás elleni védelem.',
    'master_data.partners.bank_accounts.source_manual': 'kézzel rögzítve',
    'master_data.partners.bank_accounts.source_invoice_extraction': 'számláról kiolvasva',
    'master_data.partners.bank_accounts.confirmed_on': 'Megerősítve: {date}',
    'master_data.partners.bank_accounts.unconfirmed': 'Nincs megerősítve',
    'master_data.partners.bank_accounts.confirm': 'Megerősítés',
    'master_data.partners.bank_accounts.remove_aria': 'Bankszámla eltávolítása',
    'master_data.partners.bank_accounts.add_heading': 'Bankszámla hozzáadása',
    'master_data.partners.bank_accounts.account_label': 'Számlaszám vagy IBAN',
    'master_data.partners.bank_accounts.account_placeholder': 'pl. 11705008-22555890 vagy HU58 1170 5008 …',
    'master_data.partners.bank_accounts.currency_label': 'Pénznem (választható)',
    'master_data.partners.bank_accounts.currency_placeholder': 'pl. HUF',
    'master_data.partners.bank_accounts.confirm_on_add': 'Erősítsd meg most (egyeztettem a szállítóval)',
    'master_data.partners.bank_accounts.add': 'Hozzáadás',
    'invoices.labels.unverified': 'Nem ellenőrzött',
    'transactions.detail.chip_own_entity': 'Saját cég',
  },
  accounts: HU_ACCOUNTS,
  help: {
    flow: {
      taxId: 'Adószám',
      taxIdDetail: 'Egy ismert partnerével azonos adószám hozzá köti a nevet.',
      names: 'Név vagy alternatív név',
      namesDetail: 'A partner neve vagy egyik alternatív neve; banki tranzakciónál néhány betű eltéréssel is.',
      patterns: 'Névminták',
      patternsDetail: 'Az olyan előtagszabályok, mint a LinkedIn*, a minden alkalommal változó neveket is elkapják.',
      account: 'Bankszámla',
      accountDetail: 'Egy ellenőrzött partnerre mentett számlaszám, vagy az Ön egyik saját cégének számlája.',
      matches: 'Jóváhagyott párosítások',
      matchesDetail: 'Egy párosítás jóváhagyása a nem ellenőrzött nevet a másik oldalon álló ellenőrzött partnerhez köti.',
      footnote: 'Ha semmi sem ismeri fel, a név nem ellenőrzött marad, amíg valaki partnert nem hoz létre vagy nem kapcsol hozzá.',
    },
    alt: {
      flow:
        'Ábra arról, hogyan találja meg egy számlán vagy banki tranzakción megjelenő új név az ellenőrzött partnerét: adószám, név vagy alternatív név, névminta, bankszámla (egy partneré vagy az Ön egyik saját cégéé) és jóváhagyott párosítások alapján. Az a név, amelyet semmi sem ismer fel, nem ellenőrzött marad.',
      recognition:
        'A Quillmoor Software Ltd. partner Felismerés füle: a fejléc a Rögzített számlakategória jelzéssel és az Összevonás másikkal… gombbal, az öt fül, három auto vagy manuális jelölésű alternatív név, a QUILLMOOR* névminta, és két bankszámla, egy Nincs megerősítve állapotú a Megerősítés gombbal és egy megerősített. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'nav.master_data.partners': 'Partner',
    'master_data.partners.detail.merge_into': 'Zusammenführen mit…',
    'master_data.partners.detail.chip_fixed_invoice_category': 'Feste Rechnungskategorie',
    'master_data.partners.tabs.partner': 'Partner',
    'master_data.partners.tabs.rules': 'Regeln',
    'master_data.partners.tabs.recognition': 'Erkennung',
    'master_data.partners.tabs.history': 'Verlauf',
    'master_data.partners.tabs.messages': 'Nachrichten',
    'master_data.partners.alternative_names.title': 'Alternative Namen',
    'master_data.partners.alternative_names.description': 'Alle Namen, unter denen dieser Partner identifiziert wird - sowohl von der KI extrahierte Varianten als auch manuell hinzugefügte Namen.',
    'master_data.partners.alternative_names.badgeAuto': 'auto',
    'master_data.partners.alternative_names.badgeManual': 'manuell',
    'master_data.partners.alternative_names.removeTooltip': 'Entfernen? Die KI wird diesen Namen nicht mehr zur Identifikation dieses Partners verwenden.',
    'master_data.partners.alternative_names.placeholder': 'z. B. GOOGLE ADS IRL',
    'master_data.partners.alternative_names.add': 'Alternativen Namen hinzufügen',
    'master_data.partners.name_patterns.heading': 'Namensmuster',
    'master_data.partners.name_patterns.description': 'Verknüpft wechselnde Lieferantenbezeichnungen, etwa auf Kartenabrechnungen, automatisch mit diesem Partner.',
    'master_data.partners.name_patterns.placeholder': 'z. B. LinkedIn*',
    'master_data.partners.name_patterns.add': 'Hinzufügen',
    'master_data.partners.name_patterns.remove_aria': 'Muster entfernen',
    'master_data.partners.name_patterns.helper': 'Nutzen Sie ein abschließendes * als Präfix: LinkedIn* erfasst LinkedIn*P3035867117 und LinkedInPreC *34952934.',
    'master_data.partners.name_patterns.backfill': 'Passende Gegenparteien jetzt verknüpfen',
    'master_data.partners.bank_accounts.heading': 'Bankkonten',
    'master_data.partners.bank_accounts.description': 'Konten, auf die dieser Partner bezahlt wird. Ein von einer Rechnung gelesenes oder aus einem Bankabgleich übernommenes Konto ist ein Vorschlag, bis eine Person es bestätigt.',
    'master_data.partners.bank_accounts.confirmation_rule': 'Nur ein bestätigtes Konto kann in eine Zahlungsdatei aufgenommen werden. Das erste für einen Lieferanten gesehene Konto und jedes vom bestätigten abweichende Konto muss eine Person mit der Berechtigung Freigaben verwalten bestätigen. Das ist der Schutz vor Rechnungsbetrug.',
    'master_data.partners.bank_accounts.source_manual': 'manuell erfasst',
    'master_data.partners.bank_accounts.source_invoice_extraction': 'von einer Rechnung gelesen',
    'master_data.partners.bank_accounts.confirmed_on': 'Bestätigt am {date}',
    'master_data.partners.bank_accounts.unconfirmed': 'Nicht bestätigt',
    'master_data.partners.bank_accounts.confirm': 'Bestätigen',
    'master_data.partners.bank_accounts.remove_aria': 'Bankkonto entfernen',
    'master_data.partners.bank_accounts.add_heading': 'Bankkonto hinzufügen',
    'master_data.partners.bank_accounts.account_label': 'Kontonummer oder IBAN',
    'master_data.partners.bank_accounts.account_placeholder': 'z. B. 11705008-22555890 oder HU58 1170 5008 …',
    'master_data.partners.bank_accounts.currency_label': 'Währung (optional)',
    'master_data.partners.bank_accounts.currency_placeholder': 'z. B. HUF',
    'master_data.partners.bank_accounts.confirm_on_add': 'Dieses Konto jetzt bestätigen (mit dem Lieferanten geprüft)',
    'master_data.partners.bank_accounts.add': 'Hinzufügen',
    'invoices.labels.unverified': 'Nicht verifiziert',
    'transactions.detail.chip_own_entity': 'Eigenes Unternehmen',
  },
  accounts: IBAN_ACCOUNTS,
  help: {
    flow: {
      taxId: 'Steuernummer',
      taxIdDetail: 'Dieselbe Steuernummer wie bei einem bekannten Partner verknüpft den Namen mit ihm.',
      names: 'Name oder alternativer Name',
      namesDetail: 'Der Name des Partners oder einer seiner alternativen Namen; bei einer Banktransaktion auch mit wenigen Buchstaben Abweichung.',
      patterns: 'Namensmuster',
      patternsDetail: 'Präfixregeln wie LinkedIn* erfassen Namen, die sich jedes Mal ändern.',
      account: 'Bankkonto',
      accountDetail: 'Ein bei einem verifizierten Partner gespeichertes Konto oder ein Konto eines Ihrer eigenen Unternehmen.',
      matches: 'Bestätigte Zuordnungen',
      matchesDetail: 'Das Bestätigen einer Zuordnung verknüpft einen nicht verifizierten Namen mit dem verifizierten Partner auf der anderen Seite.',
      footnote: 'Nichts gefunden: Der Name bleibt nicht verifiziert, bis jemand einen Partner anlegt oder verknüpft.',
    },
    alt: {
      flow:
        'Diagramm, wie ein neuer Name auf einer Rechnung oder Banktransaktion seinen verifizierten Partner findet: über die Steuernummer, den Namen oder einen alternativen Namen, ein Namensmuster, ein Bankkonto (eines Partners oder eines Ihrer eigenen Unternehmen) und bestätigte Zuordnungen. Ein Name, den nichts erkennt, bleibt nicht verifiziert.',
      recognition:
        'Der Tab Erkennung des Partners Quillmoor Software Ltd.: die Kopfzeile mit dem Hinweis Feste Rechnungskategorie und Zusammenführen mit…, die fünf Tabs, drei alternative Namen, markiert als auto oder manuell, das Namensmuster QUILLMOOR* und zwei Bankkonten, eines Nicht bestätigt mit der Schaltfläche Bestätigen und eines bestätigt. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
    },
  },
}

export const partnersCopy: Record<Locale, Copy> = { en, hu, de }
