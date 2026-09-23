// Labels for the cash pool section screen, verbatim from aift-web
// messages/<locale>.json (master_data.bank_accounts.cash_pool.*, origin/main
// 2026-09-23), keyed by message key so scratchpad/drift-any.py catches a
// change. `rendered` holds the holder line the app fills in. `help` is this
// article's own text.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'master_data.bank_accounts.cash_pool.section_title',
  'master_data.bank_accounts.cash_pool.section_description',
  'master_data.bank_accounts.cash_pool.account_holder_line',
  'master_data.bank_accounts.cash_pool.save_members',
  'master_data.bank_accounts.cash_pool.change_holder_label',
  'master_data.bank_accounts.cash_pool.change_holder_description',
  'master_data.bank_accounts.cash_pool.change_holder_placeholder',
  'master_data.bank_accounts.cash_pool.change_holder_button',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  rendered: { holder: string }
  help: { alt: string }
}

/** Fictional group, as the house rule requires. */
export const HOLDER = 'Reamwell Holding Ltd.'
export const MEMBERS = [
  { name: 'Slatebridge Roofing Ltd.', ticked: true },
  { name: 'Quillmoor Software Ltd.', ticked: true },
  { name: 'Gearmont Fleet Services Ltd.', ticked: false },
] as const

const en: Copy = {
  ui: {
    'master_data.bank_accounts.cash_pool.section_title': 'Used by other companies (cash pool)',
    'master_data.bank_accounts.cash_pool.section_description': 'Tick the companies whose payments and receipts run through this account. The account stays with its holder; it is not copied under the other companies.',
    'master_data.bank_accounts.cash_pool.account_holder_line': 'Account holder: {name}',
    'master_data.bank_accounts.cash_pool.save_members': 'Save companies',
    'master_data.bank_accounts.cash_pool.change_holder_label': 'Change the account holder',
    'master_data.bank_accounts.cash_pool.change_holder_description': 'The new holder must be one of the companies using the account. The current holder stays on the list.',
    'master_data.bank_accounts.cash_pool.change_holder_placeholder': 'Choose a company',
    'master_data.bank_accounts.cash_pool.change_holder_button': 'Change holder',
  },
  rendered: { holder: `Account holder: ${HOLDER}` },
  help: { alt: 'The cash pool section of a bank account form: the account holder, tick boxes for the other companies of the workspace with two ticked, the Save companies button, and the Change the account holder field.' },
}

const hu: Copy = {
  ui: {
    'master_data.bank_accounts.cash_pool.section_title': 'Más cégek is használják (cash pool)',
    'master_data.bank_accounts.cash_pool.section_description': 'Jelöld be azokat a cégeket, amelyek pénzforgalma ezen a számlán fut. A számla a számlatulajdonosnál marad, a többi cégnél nem jön létre másolat.',
    'master_data.bank_accounts.cash_pool.account_holder_line': 'Számlatulajdonos: {name}',
    'master_data.bank_accounts.cash_pool.save_members': 'Cégek mentése',
    'master_data.bank_accounts.cash_pool.change_holder_label': 'Számlatulajdonos módosítása',
    'master_data.bank_accounts.cash_pool.change_holder_description': 'Az új tulajdonos csak a számlát használó cégek egyike lehet. A jelenlegi tulajdonos a listán marad.',
    'master_data.bank_accounts.cash_pool.change_holder_placeholder': 'Válassz céget',
    'master_data.bank_accounts.cash_pool.change_holder_button': 'Tulajdonos módosítása',
  },
  rendered: { holder: `Számlatulajdonos: ${HOLDER}` },
  help: { alt: 'Egy bankszámla űrlapjának cash pool szakasza: a számlatulajdonos, a munkaterület többi cégének jelölőnégyzetei közül kettő bejelölve, a Cégek mentése gomb és a Számlatulajdonos módosítása mező.' },
}

const de: Copy = {
  ui: {
    'master_data.bank_accounts.cash_pool.section_title': 'Von anderen Unternehmen genutzt (Cash-Pool)',
    'master_data.bank_accounts.cash_pool.section_description': 'Markieren Sie die Unternehmen, deren Zahlungsverkehr über dieses Konto läuft. Das Konto bleibt beim Kontoinhaber und wird bei den anderen Unternehmen nicht kopiert.',
    'master_data.bank_accounts.cash_pool.account_holder_line': 'Kontoinhaber: {name}',
    'master_data.bank_accounts.cash_pool.save_members': 'Unternehmen speichern',
    'master_data.bank_accounts.cash_pool.change_holder_label': 'Kontoinhaber ändern',
    'master_data.bank_accounts.cash_pool.change_holder_description': 'Der neue Inhaber muss eines der Unternehmen sein, die das Konto nutzen. Der bisherige Inhaber bleibt auf der Liste.',
    'master_data.bank_accounts.cash_pool.change_holder_placeholder': 'Unternehmen wählen',
    'master_data.bank_accounts.cash_pool.change_holder_button': 'Inhaber ändern',
  },
  rendered: { holder: `Kontoinhaber: ${HOLDER}` },
  help: { alt: 'Der Cash-Pool-Abschnitt eines Bankkontoformulars: der Kontoinhaber, Kontrollkästchen für die übrigen Unternehmen des Arbeitsbereichs mit zwei markierten, die Schaltfläche Unternehmen speichern und das Feld Kontoinhaber ändern.' },
}

export const cashPoolCopy: Record<Locale, Copy> = { en, hu, de }
