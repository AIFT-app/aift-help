// Labels for the settlement netting figure. `ui` is the app's own strip label,
// verbatim from aift-web messages/<locale>.json (matching.settlement.*,
// origin/main 2026-09-23), keyed by message key so drift-any.py catches a
// change. `help` is this article's own text: HU is formal.
import type { Locale } from '@/lib/i18n'

export const UI_KEYS = ['matching.settlement.nets_to_zero'] as const

export type UiKey = (typeof UI_KEYS)[number]

type Copy = {
  ui: Record<UiKey, string>
  help: {
    alt: string
    paymentSide: string
    invoiceSide: string
    payment: string
    invoice: string
    credit: string
    creditNote: string
  }
}

const en: Copy = {
  ui: { 'matching.settlement.nets_to_zero': 'Nets to zero' },
  help: {
    alt: 'One payment of 238,118 on the left settles an invoice of 251,771 together with a credit note of 13,653 on the right, because the credit note counts as a negative amount.',
    paymentSide: 'What arrived',
    invoiceSide: 'What it settles',
    payment: 'Payment',
    invoice: 'Invoice',
    credit: 'Credit note',
    creditNote: 'Counts as a negative amount, because it reduces what the payment has to cover.',
  },
}

const hu: Copy = {
  ui: { 'matching.settlement.nets_to_zero': 'Kiegyenlítve' },
  help: {
    alt: 'Egy 238 118 összegű kifizetés a bal oldalon egy 251 771 összegű számlát és egy 13 653 összegű jóváíró számlát egyenlít ki, mert a jóváírás negatív összegként számít.',
    paymentSide: 'Ami beérkezett',
    invoiceSide: 'Amit kiegyenlít',
    payment: 'Kifizetés',
    invoice: 'Számla',
    credit: 'Jóváíró számla',
    creditNote: 'Negatív összegként számít, mert csökkenti azt, amit a kifizetésnek fedeznie kell.',
  },
}

const de: Copy = {
  ui: { 'matching.settlement.nets_to_zero': 'Geht auf null auf' },
  help: {
    alt: 'Eine Zahlung über 238.118 auf der linken Seite gleicht rechts eine Rechnung über 251.771 zusammen mit einer Gutschrift über 13.653 aus, weil die Gutschrift als negativer Betrag zählt.',
    paymentSide: 'Was eingegangen ist',
    invoiceSide: 'Was damit ausgeglichen wird',
    payment: 'Zahlung',
    invoice: 'Rechnung',
    credit: 'Gutschrift',
    creditNote: 'Zählt als negativer Betrag, weil sie verringert, was die Zahlung abdecken muss.',
  },
}

export const settlementCopy: Record<Locale, Copy> = { en, hu, de }
