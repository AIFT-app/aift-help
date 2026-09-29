// The company-register panel, for the company-register-check article.
//
// Labels verbatim from aift-web messages/<locale>.json, keyed by message key
// under `master_data.partners.registry`. Note the HU strings are TEGEZŐ: that
// is the app's own register, and a quoted app label is quoted as the app says
// it, even though the help article around it is magázó.
//
// The partner is fictional (Quillmoor, the house set). The tax numbers and
// accounts are invented and deliberately shaped like real Hungarian ones, so
// the megye code and the account format read correctly.

import type { Locale } from '@/lib/i18n'

export const PARTNER_NAME = 'Quillmoor Software Kft.'
export const OUR_TAX_PREFIX = '12345678-2-'
export const OUR_TAX_SUFFIX = '41'
export const REG_TAX_SUFFIX = '13'
export const REG_ACCOUNT = '12011007-00000000'
export const OUR_ACCOUNT = '10300002-20391548'
export const BANK_NAME = 'Raiffeisen Bank'

type Copy = {
  ui: {
    'master_data.partners.registry.title': string
    'master_data.partners.registry.description': string
    'master_data.partners.registry.revalidate': string
    'master_data.partners.registry.field_legal_name': string
    'master_data.partners.registry.field_tax_number': string
    'master_data.partners.registry.field_address': string
    'master_data.partners.registry.field_accounts': string
    'master_data.partners.registry.severity.high': string
    'master_data.partners.registry.severity.info': string
    'master_data.partners.registry.table.heading': string
    'master_data.partners.registry.table.field': string
    'master_data.partners.registry.table.ours': string
    'master_data.partners.registry.table.register': string
    'master_data.partners.registry.table.action': string
    'master_data.partners.registry.table.matches': string
    'master_data.partners.registry.table.none': string
    'master_data.partners.registry.card.moved_title': string
    'master_data.partners.registry.card.moved_why': string
    'master_data.partners.registry.card.accounts_why': string
    'master_data.partners.registry.action.take_over': string
    'master_data.partners.registry.action.take_over_both': string
    'master_data.partners.registry.action.add': string
    'master_data.partners.registry.action.keep_as_is': string
    'master_data.partners.registry.action.not_now': string
    'master_data.partners.registry.action.go_to_bank_accounts': string
  }
  /** Strings the app builds from an ICU pattern, rendered out. */
  rendered: {
    checkedOn: string
    decisionsHeading: string
    accountsTitle: string
    addIt: string
    accountSince: string
    ourAddress: string
    registerAddress: string
  }
  help: { alt: string }
}

const en: Copy = {
  ui: {
    'master_data.partners.registry.title': 'Company register',
    'master_data.partners.registry.description':
      'What the Hungarian company register says about this partner. Nothing here is changed without you: empty fields are filled in, and anything that differs is listed for you to look at.',
    'master_data.partners.registry.revalidate': 'Revalidate',
    'master_data.partners.registry.field_legal_name': 'Name',
    'master_data.partners.registry.field_tax_number': 'Tax number',
    'master_data.partners.registry.field_address': 'Registered address',
    'master_data.partners.registry.field_accounts': 'Bank accounts',
    'master_data.partners.registry.severity.high': 'Check',
    'master_data.partners.registry.severity.info': 'Info',
    'master_data.partners.registry.table.heading': 'Compared with the register',
    'master_data.partners.registry.table.field': 'Field',
    'master_data.partners.registry.table.ours': 'Ours',
    'master_data.partners.registry.table.register': 'In the register',
    'master_data.partners.registry.table.action': 'Action',
    'master_data.partners.registry.table.matches': 'Matches',
    'master_data.partners.registry.table.none': 'none',
    'master_data.partners.registry.card.moved_title': 'It looks like the company has moved',
    'master_data.partners.registry.card.moved_why':
      'The seat and the tax number both differ. When a company moves its seat to another county, the last two digits of its tax number (the tax office code) change too. The values are in the table below.',
    'master_data.partners.registry.card.accounts_why':
      'An added account stays unconfirmed. It can only go into a payment file after someone who can manage approvals confirms it.',
    'master_data.partners.registry.action.take_over': 'Take over',
    'master_data.partners.registry.action.take_over_both': 'Take over both',
    'master_data.partners.registry.action.add': 'Add',
    'master_data.partners.registry.action.keep_as_is': 'Leave as is',
    'master_data.partners.registry.action.not_now': 'Not now',
    'master_data.partners.registry.action.go_to_bank_accounts': 'Go to bank accounts',
  },
  rendered: {
    checkedOn: 'Checked 2026-09-24 11:12',
    decisionsHeading: '2 decisions waiting',
    accountsTitle: '1 bank account is only in the register',
    addIt: 'Add it',
    accountSince: 'since 2026-04-01',
    ourAddress: '1052 Budapest, Példa utca 4.',
    registerAddress: '9024 Győr, Mintakert utca 18.',
  },
  help: {
    alt: 'The company register panel: two decision cards, one about a company that has moved and one about a bank account only the register lists, above a table comparing our values with the register row by row.',
  },
}

const hu: Copy = {
  ui: {
    'master_data.partners.registry.title': 'Cégjegyzék',
    'master_data.partners.registry.description':
      'Amit a magyar cégjegyzék erről a partnerről mond. Nélküled semmi nem változik: az üres mezőket kitöltjük, az eltéréseket pedig listázzuk, hogy megnézhesd.',
    'master_data.partners.registry.revalidate': 'Újraellenőrzés',
    'master_data.partners.registry.field_legal_name': 'Név',
    'master_data.partners.registry.field_tax_number': 'Adószám',
    'master_data.partners.registry.field_address': 'Székhely',
    'master_data.partners.registry.field_accounts': 'Bankszámlák',
    'master_data.partners.registry.severity.high': 'Ellenőrizd',
    'master_data.partners.registry.severity.info': 'Infó',
    'master_data.partners.registry.table.heading': 'Összevetés a cégjegyzékkel',
    'master_data.partners.registry.table.field': 'Mező',
    'master_data.partners.registry.table.ours': 'Nálunk',
    'master_data.partners.registry.table.register': 'Cégjegyzékben',
    'master_data.partners.registry.table.action': 'Művelet',
    'master_data.partners.registry.table.matches': 'Egyezik',
    'master_data.partners.registry.table.none': 'nincs',
    'master_data.partners.registry.card.moved_title': 'Úgy tűnik, a cég elköltözött',
    'master_data.partners.registry.card.moved_why':
      'A székhely és az adószám is eltér. Ha egy cég másik megyébe viszi a székhelyét, az adószáma utolsó két számjegye (az adóhatóság kódja) is megváltozik. Az értékeket lent, a táblázatban látod.',
    'master_data.partners.registry.card.accounts_why':
      'A hozzáadott számla megerősítetlen marad. Fizetési fájlba csak akkor kerülhet, ha valaki, aki kezelheti a jóváhagyásokat, megerősíti.',
    'master_data.partners.registry.action.take_over': 'Átveszem',
    'master_data.partners.registry.action.take_over_both': 'Mindkettőt átveszem',
    'master_data.partners.registry.action.add': 'Hozzáadom',
    'master_data.partners.registry.action.keep_as_is': 'Így hagyom',
    'master_data.partners.registry.action.not_now': 'Most nem',
    'master_data.partners.registry.action.go_to_bank_accounts': 'Ugrás a bankszámlákhoz',
  },
  rendered: {
    checkedOn: 'Ellenőrizve: 2026-09-24 11:12',
    decisionsHeading: '2 dolog vár döntésre',
    accountsTitle: '1 bankszámla csak a cégjegyzékben szerepel',
    addIt: 'Hozzáadom',
    accountSince: '2026-04-01 óta',
    ourAddress: '1052 Budapest, Példa utca 4.',
    registerAddress: '9024 Győr, Mintakert utca 18.',
  },
  help: {
    alt: 'A cégjegyzék panel: két döntési kártya, egy elköltözött cégről és egy csak a cégjegyzékben szereplő bankszámláról, alattuk pedig a táblázat, amely sorról sorra veti össze a nálunk tárolt adatokat a cégjegyzékkel.',
  },
}

const de: Copy = {
  ui: {
    'master_data.partners.registry.title': 'Firmenregister',
    'master_data.partners.registry.description':
      'Was das ungarische Firmenregister über diesen Partner sagt. Ohne Sie wird nichts geändert: Leere Felder werden ausgefüllt, Abweichungen werden zur Prüfung aufgelistet.',
    'master_data.partners.registry.revalidate': 'Erneut prüfen',
    'master_data.partners.registry.field_legal_name': 'Name',
    'master_data.partners.registry.field_tax_number': 'Steuernummer',
    'master_data.partners.registry.field_address': 'Sitz',
    'master_data.partners.registry.field_accounts': 'Bankkonten',
    'master_data.partners.registry.severity.high': 'Prüfen',
    'master_data.partners.registry.severity.info': 'Info',
    'master_data.partners.registry.table.heading': 'Abgleich mit dem Register',
    'master_data.partners.registry.table.field': 'Feld',
    'master_data.partners.registry.table.ours': 'Bei uns',
    'master_data.partners.registry.table.register': 'Im Register',
    'master_data.partners.registry.table.action': 'Aktion',
    'master_data.partners.registry.table.matches': 'Stimmt überein',
    'master_data.partners.registry.table.none': 'keins',
    'master_data.partners.registry.card.moved_title': 'Das Unternehmen scheint umgezogen zu sein',
    'master_data.partners.registry.card.moved_why':
      'Sitz und Steuernummer weichen beide ab. Verlegt ein Unternehmen seinen Sitz in ein anderes Komitat, ändern sich auch die letzten beiden Ziffern seiner Steuernummer (der Code des Finanzamts). Die Werte stehen unten in der Tabelle.',
    'master_data.partners.registry.card.accounts_why':
      'Ein hinzugefügtes Konto bleibt unbestätigt. In eine Zahlungsdatei kann es erst, wenn jemand mit der Berechtigung für Freigaben es bestätigt.',
    'master_data.partners.registry.action.take_over': 'Übernehmen',
    'master_data.partners.registry.action.take_over_both': 'Beides übernehmen',
    'master_data.partners.registry.action.add': 'Hinzufügen',
    'master_data.partners.registry.action.keep_as_is': 'So lassen',
    'master_data.partners.registry.action.not_now': 'Nicht jetzt',
    'master_data.partners.registry.action.go_to_bank_accounts': 'Zu den Bankkonten',
  },
  rendered: {
    checkedOn: 'Geprüft am 2026-09-24 11:12',
    decisionsHeading: '2 Entscheidungen offen',
    accountsTitle: '1 Bankkonto steht nur im Register',
    addIt: 'Hinzufügen',
    accountSince: 'seit 2026-04-01',
    ourAddress: '1052 Budapest, Példa utca 4.',
    registerAddress: '9024 Győr, Mintakert utca 18.',
  },
  help: {
    alt: 'Das Firmenregister-Panel: zwei Entscheidungskarten, eine zu einem umgezogenen Unternehmen und eine zu einem Bankkonto, das nur im Register steht, darunter die Tabelle, die unsere Werte Zeile für Zeile mit dem Register vergleicht.',
  },
}

export const registryPanelCopy: Record<Locale, Copy> = { en, hu, de }
