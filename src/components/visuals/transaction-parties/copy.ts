// Text and data for the transaction Parties card illustration (bank-transactions).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key. Hungarian
// ones are tegező because the app is. `help` holds the article's own words
// (alt text), magázó in Hungarian like every aift-help
// article.
//
// The data is FICTIONAL: Halvorn Trading Ltd. is the example company of the
// other illustrations and Quillmoor Software Ltd. the partner it pays in the
// bank transaction list. The account numbers are made up. Never real data.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'transactions.detail.felek.heading',
  'transactions.detail.felek.edit',
  'transactions.detail.felek.payer',
  'transactions.detail.felek.payee',
  'transactions.detail.felek.partner_picker',
  'invoices.detail.felek.verified',
  'invoices.assignment.usBadge',
  'record_preview.party_details',
  'transactions.slide_over.expense',
] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  /** Our account's nickname, shown in brackets after the number. */
  nickname: string
  help: { alt: string }
}

export const OUR_COMPANY = 'Halvorn Trading Ltd.'
export const OUR_ACCOUNT = '11600006-20384419'
export const PARTNER = 'Quillmoor Software Ltd.'
export const PARTNER_IBAN = 'HU58117050082255589000000000'

export const transactionPartiesCopy: Record<Locale, Copy> = {
  en: {
    ui: {
      'transactions.detail.felek.heading': 'Parties',
      'transactions.detail.felek.edit': 'Edit',
      'transactions.detail.felek.payer': 'Payer',
      'transactions.detail.felek.payee': 'Payee',
      'transactions.detail.felek.partner_picker': 'Partner',
      'invoices.detail.felek.verified': 'Verified',
      'invoices.assignment.usBadge': 'US',
      'record_preview.party_details': 'Details',
      'transactions.slide_over.expense': 'Expense',
    },
    nickname: 'Main HUF account',
    help: {
      alt: 'The Parties card of an outgoing bank transfer: Halvorn Trading Ltd. on top as the payer, with the full number of the bank account it was paid from, then the Expense direction, then the verified partner Quillmoor Software Ltd. as the payee. Each tile shows Details, and an Edit link sits in the card header.'
    },
  },
  hu: {
    ui: {
      'transactions.detail.felek.heading': 'Felek',
      'transactions.detail.felek.edit': 'Módosítás',
      'transactions.detail.felek.payer': 'Fizető',
      'transactions.detail.felek.payee': 'Kedvezményezett',
      'transactions.detail.felek.partner_picker': 'Partner',
      'invoices.detail.felek.verified': 'Hitelesített',
      'invoices.assignment.usBadge': 'MI',
      'record_preview.party_details': 'Részletek',
      'transactions.slide_over.expense': 'Kiadás',
    },
    nickname: 'Fő HUF számla',
    help: {
      alt: 'Egy kimenő utalás Felek kártyája: felül fizetőként a Halvorn Trading Ltd., annak a bankszámlának a teljes számával, amelyről fizetett, alatta a Kiadás irány, majd kedvezményezettként a hitelesített Quillmoor Software Ltd. partner. Mindkét mezőn a Részletek látható, a kártya fejlécében a Módosítás.'
    },
  },
  de: {
    ui: {
      'transactions.detail.felek.heading': 'Parteien',
      'transactions.detail.felek.edit': 'Bearbeiten',
      'transactions.detail.felek.payer': 'Zahler',
      'transactions.detail.felek.payee': 'Empfänger',
      'transactions.detail.felek.partner_picker': 'Partner',
      'invoices.detail.felek.verified': 'Verifiziert',
      'invoices.assignment.usBadge': 'WIR',
      'record_preview.party_details': 'Details',
      'transactions.slide_over.expense': 'Ausgabe',
    },
    nickname: 'HUF-Hauptkonto',
    help: {
      alt: 'Die Karte Parteien einer ausgehenden Überweisung: oben Halvorn Trading Ltd. als Zahler, mit der vollständigen Nummer des Bankkontos, von dem gezahlt wurde, darunter die Richtung Ausgabe, dann der verifizierte Partner Quillmoor Software Ltd. als Empfänger. Jedes Feld zeigt Details, im Kartenkopf steht Bearbeiten.'
    },
  },
}
