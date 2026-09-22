// Text and data for the company illustrations (master-data-entities).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key (plural-free
// messages only; placeholders are filled with `fill`, plurals are rendered in
// `rendered`). Hungarian ones are tegező because the app is. `help` holds the
// article's own words (diagram labels, alt text, what a user would type),
// magázó in Hungarian like every aift-help article.
//
// The data is FICTIONAL: Halvorn Trading Ltd. is the example company of every
// illustration (web-checked 2026-09-21). The account numbers are invented with
// valid check digits (MBH bank code 103), the same main account as the payment
// file illustration. Never real data.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'nav.master_data.entities',
  'master_data.entities.nav.state_syncing',
  'master_data.entities.tabs.company',
  'master_data.entities.tabs.recognition',
  'master_data.entities.tabs.tax',
  'master_data.entities.tabs.connections',
  'master_data.entities.tabs.messages',
  'master_data.entities.bank_accounts.heading',
  'master_data.entities.bank_accounts.description',
  'master_data.entities.bank_accounts.add_button',
  'master_data.entities.bank_accounts.edit_aria',
  'master_data.entities.bank_accounts.edit_heading',
  'master_data.entities.bank_accounts.remove_aria',
  'master_data.entities.alternative_names.heading',
  'master_data.entities.alternative_names.description',
  'master_data.entities.alternative_names.placeholder',
  'master_data.entities.alternative_names.add',
  'master_data.entities.alternative_names.remove_aria',
  'master_data.entities.matching_context.heading',
  'master_data.entities.matching_context.description',
  'master_data.entities.matching_context.label',
  'master_data.entities.matching_context.placeholder',
  'master_data.entities.matching_context.char_count',
  'master_data.entities.matching_context.save',
  'invoices.labels.entity_needed',
  'master_data.invoice_categories.form.direction_income',
  'master_data.invoice_categories.form.direction_expense',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type CompanyAccount = { name: string; iban: string; domestic: string; currency: string }

type Copy = {
  ui: Record<UiKey, string>
  /** Plural app messages, rendered for the fixture's count. */
  rendered: { statusBankAccounts: string }
  company: { name: string; countryCode: string; countryName: string; flag: string }
  accounts: CompanyAccount[]
  altNames: string[]
  matchingContext: string
  help: {
    match: {
      taxId: string
      taxIdDetail: string
      regNo: string
      regNoDetail: string
      names: string
      namesDetail: string
      ai: string
      aiDetail: string
      direction: string
      directionDetail: string
      footnote: string
    }
    alt: { match: string; recognition: string }
  }
}

// aift-web src/lib/countries.ts names countries in English in every locale.
const COMPANY = { name: 'Halvorn Trading Ltd.', countryCode: 'HU', countryName: 'Hungary', flag: '🇭🇺' }

const ACCOUNTS = (main: string, eur: string): CompanyAccount[] => [
  { name: main, iban: 'HU16103000022039154800000000', domestic: '10300002-20391548', currency: 'HUF' },
  { name: eur, iban: 'HU13103000027204815500000000', domestic: '10300002-72048155', currency: 'EUR' },
]

const ALT_NAMES = ['Halvorn Trading Kft.', 'HALVORN TRADING']

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'nav.master_data.entities': 'Companies',
    'master_data.entities.nav.state_syncing': 'Connected · syncing',
    'master_data.entities.tabs.company': 'Company',
    'master_data.entities.tabs.recognition': 'Recognition',
    'master_data.entities.tabs.tax': 'Tax & VAT',
    'master_data.entities.tabs.connections': 'Connections',
    'master_data.entities.tabs.messages': 'Messages',
    'master_data.entities.bank_accounts.heading': 'Bank accounts',
    'master_data.entities.bank_accounts.description': 'IBANs and account numbers used to match incoming transactions.',
    'master_data.entities.bank_accounts.add_button': 'Add bank account',
    'master_data.entities.bank_accounts.edit_aria': 'Edit bank account on Master data → Bank accounts',
    'master_data.entities.bank_accounts.edit_heading': 'Edit bank account',
    'master_data.entities.bank_accounts.remove_aria': 'Remove bank account',
    'master_data.entities.alternative_names.heading': 'Alternative names',
    'master_data.entities.alternative_names.description': 'Other names this company uses on invoices and bank statements.',
    'master_data.entities.alternative_names.placeholder': 'e.g. WKA Studio',
    'master_data.entities.alternative_names.add': 'Add',
    'master_data.entities.alternative_names.remove_aria': 'Remove alternative name',
    'master_data.entities.matching_context.heading': 'Matching context',
    'master_data.entities.matching_context.description': 'Free-text hints that help AIFT tell which documents belong to this company: alternative spellings, former names, related companies.',
    'master_data.entities.matching_context.label': 'Matching hints',
    'master_data.entities.matching_context.placeholder': 'e.g. Appears on bank statements as WKA STUDIO. Former name: Wolf Kreatív Bt.',
    'master_data.entities.matching_context.char_count': '{count} / {max}',
    'master_data.entities.matching_context.save': 'Save',
    'invoices.labels.entity_needed': 'Company needed',
    'master_data.invoice_categories.form.direction_income': 'Income',
    'master_data.invoice_categories.form.direction_expense': 'Expense',
  },
  rendered: { statusBankAccounts: '2 bank accounts' },
  company: COMPANY,
  accounts: ACCOUNTS('Main account', 'EUR account'),
  altNames: ALT_NAMES,
  matchingContext:
    'Invoices addressed to our warehouse at the industrial park belong to this company. Former name: Halvorn Import Ltd.',
  help: {
    match: {
      taxId: 'Tax number or EU VAT number',
      taxIdDetail: 'The strongest signal: either number identifies the company.',
      regNo: 'Registration number or bank account',
      regNoDetail: "The company's registration number, or one of its own bank accounts printed on the invoice.",
      names: 'Names, email domain, website, representative',
      namesDetail: 'The name or an alternative name, the email domain or website on the invoice, a representative who signed it.',
      ai: 'The AI, with the Matching context',
      aiDetail: 'Only when the signals above do not settle it.',
      direction: 'Direction',
      directionDetail: 'Your company is the seller: income. The buyer: expense. Both sides yours: an expense of the buyer.',
      footnote: 'None of your companies found: the invoice waits for you to choose the company.',
    },
    alt: {
      match:
        'Diagram of how AI Finance Team finds your company on an invoice, from the strongest signal to the weakest: the tax number or EU VAT number, the registration number or a bank account, then names, email domain, website and representatives, and last the AI with the matching context. Whether your company is the seller or the buyer then makes the invoice income or an expense. Without a company found, the invoice is labelled Company needed.',
      recognition:
        'The Recognition tab of the company Halvorn Trading Ltd.: under the name, the NAV status and the number of bank accounts; the five tabs; two bank accounts in HUF and EUR; two alternative names; and the matching context note with its Save button. Numbered markers point to the parts described in the list below.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'nav.master_data.entities': 'Cégek',
    'master_data.entities.nav.state_syncing': 'Csatlakoztatva · szinkronizál',
    'master_data.entities.tabs.company': 'Cégadatok',
    'master_data.entities.tabs.recognition': 'Felismerés',
    'master_data.entities.tabs.tax': 'Adó és ÁFA',
    'master_data.entities.tabs.connections': 'Csatlakozások',
    'master_data.entities.tabs.messages': 'Üzenetek',
    'master_data.entities.bank_accounts.heading': 'Bankszámlák',
    'master_data.entities.bank_accounts.description': 'IBAN-ok és számlaszámok a beérkező tranzakciók párosításához.',
    'master_data.entities.bank_accounts.add_button': 'Bankszámla hozzáadása',
    'master_data.entities.bank_accounts.edit_aria': 'Bankszámla szerkesztése a Törzsadatok → Bankszámlák alatt',
    'master_data.entities.bank_accounts.edit_heading': 'Bankszámla szerkesztése',
    'master_data.entities.bank_accounts.remove_aria': 'Bankszámla eltávolítása',
    'master_data.entities.alternative_names.heading': 'Alternatív nevek',
    'master_data.entities.alternative_names.description': 'Egyéb nevek, amelyeket ez a cég számlákon és bankkivonatokon használ.',
    'master_data.entities.alternative_names.placeholder': 'pl. WKA Studio',
    'master_data.entities.alternative_names.add': 'Hozzáadás',
    'master_data.entities.alternative_names.remove_aria': 'Alternatív név eltávolítása',
    'master_data.entities.matching_context.heading': 'Párosítási környezet',
    'master_data.entities.matching_context.description': 'Szabad szöveges utalások, amelyek segítenek eldönteni, mely dokumentumok tartoznak ehhez a céghez: alternatív írásmódok, korábbi nevek, kapcsolódó cégek.',
    'master_data.entities.matching_context.label': 'Párosítási utalások',
    'master_data.entities.matching_context.placeholder': 'pl. A bankkivonaton WKA STUDIO néven szerepel. Korábbi neve: Wolf Kreatív Bt.',
    'master_data.entities.matching_context.char_count': '{count} / {max}',
    'master_data.entities.matching_context.save': 'Mentés',
    'invoices.labels.entity_needed': 'Cég szükséges',
    'master_data.invoice_categories.form.direction_income': 'Bevétel',
    'master_data.invoice_categories.form.direction_expense': 'Kiadás',
  },
  rendered: { statusBankAccounts: '2 bankszámla' },
  company: COMPANY,
  accounts: ACCOUNTS('Fő számla', 'EUR számla'),
  altNames: ALT_NAMES,
  matchingContext:
    'Az ipari parkban lévő raktárunknak címzett számlák ehhez a céghez tartoznak. Korábbi név: Halvorn Import Ltd.',
  help: {
    match: {
      taxId: 'Adószám vagy közösségi adószám',
      taxIdDetail: 'A legerősebb jel: bármelyik szám azonosítja a céget.',
      regNo: 'Cégjegyzékszám vagy bankszámla',
      regNoDetail: 'A cég cégjegyzékszáma, vagy a számlán szereplő egyik saját bankszámlája.',
      names: 'Nevek, e-mail tartomány, weboldal, képviselő',
      namesDetail: 'A név vagy egy alternatív név, a számlán szereplő e-mail tartomány vagy weboldal, a számlát aláíró képviselő.',
      ai: 'Az AI, a párosítási környezettel',
      aiDetail: 'Csak ha a fenti jelek nem döntik el.',
      direction: 'Irány',
      directionDetail: 'Az Ön cége az eladó: bevétel. A vevő: kiadás. Mindkét fél az Öné: a vevő kiadása.',
      footnote: 'Egyik cégét sem találtuk: a számla arra vár, hogy Ön kiválassza a céget.',
    },
    alt: {
      match:
        'Ábra arról, hogyan találja meg az AI Finance Team az Ön cégét egy számlán, a legerősebb jeltől a leggyengébbig: adószám vagy közösségi adószám, cégjegyzékszám vagy bankszámla, aztán nevek, e-mail tartomány, weboldal és képviselők, végül az AI a párosítási környezettel. Az, hogy az Ön cége az eladó vagy a vevő, dönti el, hogy a számla bevétel vagy kiadás. Ha nem talál céget, a számla a Cég szükséges címkét kapja.',
      recognition:
        'A Halvorn Trading Ltd. cég Felismerés füle: a név alatt a NAV-állapot és a bankszámlák száma; az öt fül; két bankszámla, forintban és euróban; két alternatív név; és a párosítási környezet jegyzete a Mentés gombbal. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'nav.master_data.entities': 'Unternehmen',
    'master_data.entities.nav.state_syncing': 'Verbunden · synchronisiert',
    'master_data.entities.tabs.company': 'Unternehmen',
    'master_data.entities.tabs.recognition': 'Erkennung',
    'master_data.entities.tabs.tax': 'Steuern & USt.',
    'master_data.entities.tabs.connections': 'Verbindungen',
    'master_data.entities.tabs.messages': 'Nachrichten',
    'master_data.entities.bank_accounts.heading': 'Bankkonten',
    'master_data.entities.bank_accounts.description': 'IBANs und Kontonummern zur Zuordnung eingehender Transaktionen.',
    'master_data.entities.bank_accounts.add_button': 'Bankkonto hinzufügen',
    'master_data.entities.bank_accounts.edit_aria': 'Bankkonto unter Stammdaten → Bankkonten bearbeiten',
    'master_data.entities.bank_accounts.edit_heading': 'Bankkonto bearbeiten',
    'master_data.entities.bank_accounts.remove_aria': 'Bankkonto entfernen',
    'master_data.entities.alternative_names.heading': 'Alternative Namen',
    'master_data.entities.alternative_names.description': 'Andere Namen, unter denen dieses Unternehmen auf Rechnungen und Kontoauszügen erscheint.',
    'master_data.entities.alternative_names.placeholder': 'z. B. WKA Studio',
    'master_data.entities.alternative_names.add': 'Hinzufügen',
    'master_data.entities.alternative_names.remove_aria': 'Alternativen Namen entfernen',
    'master_data.entities.matching_context.heading': 'Zuordnungskontext',
    'master_data.entities.matching_context.description': 'Freitext-Hinweise, die helfen zu erkennen, welche Dokumente zu diesem Unternehmen gehören: alternative Schreibweisen, frühere Namen, verbundene Unternehmen.',
    'master_data.entities.matching_context.label': 'Zuordnungshinweise',
    'master_data.entities.matching_context.placeholder': 'z. B. Erscheint auf Kontoauszügen als WKA STUDIO. Früherer Name: Wolf Kreatív Bt.',
    'master_data.entities.matching_context.char_count': '{count} / {max}',
    'master_data.entities.matching_context.save': 'Speichern',
    'invoices.labels.entity_needed': 'Unternehmen benötigt',
    'master_data.invoice_categories.form.direction_income': 'Einnahme',
    'master_data.invoice_categories.form.direction_expense': 'Ausgabe',
  },
  rendered: { statusBankAccounts: '2 Bankkonten' },
  company: COMPANY,
  accounts: ACCOUNTS('Hauptkonto', 'EUR-Konto'),
  altNames: ALT_NAMES,
  matchingContext:
    'Rechnungen an unser Lager im Industriepark gehören zu diesem Unternehmen. Früherer Name: Halvorn Import Ltd.',
  help: {
    match: {
      taxId: 'Steuernummer oder USt-IdNr.',
      taxIdDetail: 'Das stärkste Signal: Jede der beiden Nummern identifiziert das Unternehmen.',
      regNo: 'Firmenbuchnummer oder Bankkonto',
      regNoDetail: 'Die Firmenbuchnummer des Unternehmens oder eines seiner eigenen Bankkonten auf der Rechnung.',
      names: 'Namen, E-Mail-Domain, Website, Vertreter',
      namesDetail: 'Der Name oder ein alternativer Name, die E-Mail-Domain oder Website auf der Rechnung, ein Vertreter, der sie unterschrieben hat.',
      ai: 'Die KI, mit dem Zuordnungskontext',
      aiDetail: 'Nur wenn die Signale darüber es nicht entscheiden.',
      direction: 'Richtung',
      directionDetail: 'Ihr Unternehmen ist der Verkäufer: Einnahme. Der Käufer: Ausgabe. Beide Seiten gehören Ihnen: eine Ausgabe des Käufers.',
      footnote: 'Keines Ihrer Unternehmen gefunden: Die Rechnung wartet darauf, dass Sie das Unternehmen wählen.',
    },
    alt: {
      match:
        'Diagramm, wie AI Finance Team Ihr Unternehmen auf einer Rechnung findet, vom stärksten Signal zum schwächsten: Steuernummer oder USt-IdNr., Firmenbuchnummer oder Bankkonto, dann Namen, E-Mail-Domain, Website und Vertreter und zuletzt die KI mit dem Zuordnungskontext. Ob Ihr Unternehmen Verkäufer oder Käufer ist, macht die Rechnung dann zur Einnahme oder Ausgabe. Ohne gefundenes Unternehmen erhält die Rechnung das Label Unternehmen benötigt.',
      recognition:
        'Der Tab Erkennung des Unternehmens Halvorn Trading Ltd.: unter dem Namen der NAV-Status und die Zahl der Bankkonten; die fünf Tabs; zwei Bankkonten in HUF und EUR; zwei alternative Namen; und die Notiz zum Zuordnungskontext mit der Schaltfläche Speichern. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
    },
  },
}

export const companiesCopy: Record<Locale, Copy> = { en, hu, de }
