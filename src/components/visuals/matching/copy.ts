// Text for the invoice-matching illustrations, per locale.
//
// `ui`: the app's own labels, VERBATIM from aift-web messages/<locale>.json,
// keyed by message key so a label change in the app is easy to find here.
// `queue` / `tx`: fictional example data, the same international companies as
// ../approvals/copy.ts (web-checked). The bank texts are deliberately not the
// partner's name without its suffix: that would make both sides the same
// partner, and the pair would be matched automatically, not suggested. The AI
// reasoning is English in every locale because the app's matching prompt
// writes it in English.
// `help`: the help centre's own words (diagram, alt texts), formal register.

import type { Locale } from '@/lib/i18n'

const UI_KEYS = [
  'matching.page.title',
  'matching.page.tab_overview',
  'matching.page.tab_matches',
  'matching.page.tab_partners',
  'matching.page.tab_settlement',
  'matching.history.button',
  'matching.run_button.label_idle',
  'matching.unified_list.section_pending',
  'matching.unified_list.section_approved',
  'matching.unified_list.header_score',
  'matching.unified_list.header_invoice',
  'matching.unified_list.header_transaction',
  'matching.unified_list.header_actions',
  'matching.unified_list.confirm_action',
  'matching.unified_list.reject_action',
  'matching.unified_list.confirm_title',
  'matching.unified_list.reject_title',
  'matching.unified_list.combined_amounts',
  'matching.unified_list.search_placeholder',
  'matching.unified_list.search_aria',
  'matching.suggestion_detail.status_pending',
  'transactions.detail.section_match_payment',
  'transactions.slide_over.ai_suggestions',
  'transactions.slide_over.confirm',
  'transactions.slide_over.dismiss',
  'transactions.slide_over.find_invoice',
  'transactions.slide_over.cancel',
  'transactions.slide_over.search_placeholder_invoice',
  'transactions.slide_over.balance_note',
  'transactions.slide_over.counterparty_separator',
  'transactions.slide_over.counterparty_prefix',
  'transactions.slide_over.issue_date_suffix',
  'transactions.slide_over.mark_no_invoice_placeholder',
  'transactions.slide_over.no_specific_type',
  'transactions.list.status_matched',
  'transactions.list.status_unmatched',
  'labels.score_percent',
] as const

export type UiKey = (typeof UI_KEYS)[number]

/** One pending group on the Matches tab (aift-web MatchGroup, pending only). */
export type QueueGroup = {
  scores: number[]
  invoiceNumber: string
  invoicePartner: string
  invoiceAmount: number
  invoiceCurrency: string
  txPartner: string
  /** ISO date; shown for single-transaction rows. */
  txDate: string
  /** Sum of the group's transaction amounts (absolute), as the app shows it. */
  txAmount: number
  txCurrency: string
}

/** An open invoice in the transaction page's Find invoice list. */
export type OpenInvoice = {
  number: string
  partner: string
  total: number
  /** Open balance, shown only when it differs from the total. */
  balance?: number
  currency: string
  /** ISO date; the app prints it as is. */
  issueDate: string
}

type HelpCopy = {
  alt: { outcomes: string; queue: string; tx: string }
  outcomes: {
    exactTitle: string
    exactNote: string
    aiScore: string
    samePartner: string
    otherPartner: string
    byHand: string
    footnote: string
  }
}

type MatchingCopy = {
  ui: Record<UiKey, string>
  queue: { groups: QueueGroup[]; approvedTotal: number }
  tx: {
    suggestion: { score: number; invoiceNumber: string; partner: string; amount: number; currency: string; reason: string }
    openInvoices: OpenInvoice[]
    types: string[]
  }
  help: HelpCopy
}

// Fill `{name}` placeholders the way next-intl does for these simple strings.
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? `{${k}}`))
}

const HUF_QUEUE: QueueGroup[] = [
  {
    scores: [87],
    invoiceNumber: 'HPK-INV-2026-0398',
    invoicePartner: 'Slatebridge Roofing Ltd.',
    invoiceAmount: 1524000,
    invoiceCurrency: 'HUF',
    txPartner: 'SLATEBRIDGE RFG',
    txDate: '2026-09-18',
    txAmount: 1524000,
    txCurrency: 'HUF',
  },
  {
    scores: [86, 85],
    invoiceNumber: 'HPK-INV-2026-0412',
    invoicePartner: 'Reamwell Office Supplies Ltd.',
    invoiceAmount: 264000,
    invoiceCurrency: 'HUF',
    txPartner: 'REAMWELL OFFICE',
    txDate: '2026-09-15',
    txAmount: 264000,
    txCurrency: 'HUF',
  },
  {
    scores: [85],
    invoiceNumber: 'HPK-INV-2026-0425',
    invoicePartner: 'Gearmont Fleet Services Ltd.',
    invoiceAmount: 94615,
    invoiceCurrency: 'HUF',
    txPartner: 'GEARMONT FLEET',
    txDate: '2026-09-25',
    txAmount: 94615,
    txCurrency: 'HUF',
  },
]

const HUF_TX: MatchingCopy['tx'] = {
  suggestion: {
    score: 87,
    invoiceNumber: 'HPK-INV-2026-0433',
    partner: 'Reamwell Office Supplies Ltd.',
    amount: 58420,
    currency: 'HUF',
    reason:
      'Amount 58,420 HUF equals the invoice balance; 4 days after the invoice date; card text REAMWELL OFFICE 0231 resembles the partner name but is not linked to it',
  },
  openInvoices: [
    { number: 'HPK-INV-2026-0433', partner: 'Reamwell Office Supplies Ltd.', total: 58420, currency: 'HUF', issueDate: '2026-09-10' },
    { number: 'HPK-INV-2026-0398', partner: 'Slatebridge Roofing Ltd.', total: 1524000, balance: 762000, currency: 'HUF', issueDate: '2026-09-02' },
    { number: 'HPK-INV-2026-0425', partner: 'Gearmont Fleet Services Ltd.', total: 94615, currency: 'HUF', issueDate: '2026-09-19' },
  ],
  types: [],
}

export const matchingCopy: Record<Locale, MatchingCopy> = {
  en: {
    ui: {
      'matching.page.title': 'Matching',
      'matching.page.tab_overview': 'Overview',
      'matching.page.tab_matches': 'Matches',
      'matching.page.tab_partners': 'Partners',
      'matching.page.tab_settlement': 'Settlement',
      'matching.history.button': 'History',
      'matching.run_button.label_idle': 'Run Matching',
      'matching.unified_list.section_pending': 'Pending',
      'matching.unified_list.section_approved': 'Approved',
      'matching.unified_list.header_score': 'Score',
      'matching.unified_list.header_invoice': 'Invoice',
      'matching.unified_list.header_transaction': 'Transaction',
      'matching.unified_list.header_actions': 'Actions',
      'matching.unified_list.confirm_action': 'Approve',
      'matching.unified_list.reject_action': 'Reject',
      'matching.unified_list.confirm_title': 'Approve match',
      'matching.unified_list.reject_title': 'Reject match',
      'matching.unified_list.combined_amounts': '{txCount} transactions · {txAmount} · {invCount} invoice · {invAmount}',
      'matching.unified_list.search_placeholder': 'Search by invoice number, partner, or reference…',
      'matching.unified_list.search_aria': 'Search matches',
      'matching.suggestion_detail.status_pending': 'Pending',
      'transactions.detail.section_match_payment': 'Matching & payment',
      'transactions.slide_over.ai_suggestions': 'AI suggestions',
      'transactions.slide_over.confirm': 'Confirm',
      'transactions.slide_over.dismiss': 'Dismiss',
      'transactions.slide_over.find_invoice': 'Find invoice',
      'transactions.slide_over.cancel': 'Cancel',
      'transactions.slide_over.search_placeholder_invoice': 'Search by number, partner…',
      'transactions.slide_over.balance_note': '(balance: {amount})',
      'transactions.slide_over.counterparty_separator': '{name} · ',
      'transactions.slide_over.counterparty_prefix': '· {name}',
      'transactions.slide_over.issue_date_suffix': ' · {date}',
      'transactions.slide_over.mark_no_invoice_placeholder': 'Mark as: no invoice needed…',
      'transactions.slide_over.no_specific_type': 'No specific type',
      'transactions.list.status_matched': 'Matched',
      'transactions.list.status_unmatched': 'Unmatched',
      'labels.score_percent': '{score}%',
    },
    queue: { groups: HUF_QUEUE, approvedTotal: 128 },
    tx: { ...HUF_TX, types: ['Bank fee', 'Salary'] },
    help: {
      alt: {
        outcomes:
          'Diagram of what happens to a bank transaction and a candidate invoice. A payment file line or an exact match is matched with score 100, without AI. An AI score of 90 to 100 is matched. A score of 85 to 89 is matched when both sides are the same partner, otherwise it becomes a pending suggestion. A score below 85 stays unmatched and is linked by hand. Safety checks can still send an automatic match to Pending.',
        queue:
          'The Matching page, Matches tab: three pending suggestions with their scores, invoices, transactions and Approve and Reject buttons, one of them a group of two payments towards one invoice. Numbered markers point to the parts described in the list below.',
        tx: 'The Matching & payment card of an unmatched transaction: an AI suggestion with a score of 87% and Confirm and Dismiss buttons, the Find invoice panel listing three open invoices, and the no-invoice-needed menu. Numbered markers point to the parts described in the list below.',
      },
      outcomes: {
        exactTitle: 'Payment file or exact match',
        exactNote: 'Checked first, without AI',
        aiScore: 'AI score',
        samePartner: 'Same partner',
        otherPartner: 'Different partner',
        byHand: 'Link it by hand',
        footnote: 'Safety checks can still send an automatic match to Pending for review.',
      },
    },
  },
  hu: {
    ui: {
      'matching.page.title': 'Párosítás',
      'matching.page.tab_overview': 'Áttekintés',
      'matching.page.tab_matches': 'Párosítások',
      'matching.page.tab_partners': 'Partnerek',
      'matching.page.tab_settlement': 'Kiegyenlítés',
      'matching.history.button': 'Előzmények',
      'matching.run_button.label_idle': 'Párosítás futtatása',
      'matching.unified_list.section_pending': 'Függőben lévő',
      'matching.unified_list.section_approved': 'Megerősített',
      'matching.unified_list.header_score': 'Pontszám',
      'matching.unified_list.header_invoice': 'Számla',
      'matching.unified_list.header_transaction': 'Tranzakció',
      'matching.unified_list.header_actions': 'Műveletek',
      'matching.unified_list.confirm_action': 'Megerősítés',
      'matching.unified_list.reject_action': 'Elutasítás',
      'matching.unified_list.confirm_title': 'Párosítás megerősítése',
      'matching.unified_list.reject_title': 'Párosítás elutasítása',
      'matching.unified_list.combined_amounts': '{txCount} tranzakció · {txAmount} · {invCount} számla · {invAmount}',
      'matching.unified_list.search_placeholder': 'Keresés számlaszám, partner vagy hivatkozás alapján…',
      'matching.unified_list.search_aria': 'Párosítások keresése',
      'matching.suggestion_detail.status_pending': 'Függőben',
      'transactions.detail.section_match_payment': 'Párosítás & fizetés',
      'transactions.slide_over.ai_suggestions': 'AI javaslatok',
      'transactions.slide_over.confirm': 'Megerősítés',
      'transactions.slide_over.dismiss': 'Elvetés',
      'transactions.slide_over.find_invoice': 'Számla keresése',
      'transactions.slide_over.cancel': 'Mégse',
      'transactions.slide_over.search_placeholder_invoice': 'Keresés szám, partner szerint…',
      'transactions.slide_over.balance_note': '(egyenleg: {amount})',
      'transactions.slide_over.counterparty_separator': '{name} · ',
      'transactions.slide_over.counterparty_prefix': '· {name}',
      'transactions.slide_over.issue_date_suffix': ' · {date}',
      'transactions.slide_over.mark_no_invoice_placeholder': 'Megjelölés mint: nem kell számla…',
      'transactions.slide_over.no_specific_type': 'Nincs konkrét típus',
      'transactions.list.status_matched': 'Párosítva',
      'transactions.list.status_unmatched': 'Nem párosított',
      'labels.score_percent': '{score}%',
    },
    queue: { groups: HUF_QUEUE, approvedTotal: 128 },
    tx: { ...HUF_TX, types: ['Banki díj', 'Bér'] },
    help: {
      alt: {
        outcomes:
          'Ábra arról, mi történik egy banki tranzakcióval és egy szóba jövő számlával. Az utalási fájl sora vagy a pontos egyezés AI nélkül, 100-as pontszámmal párosul. A 90 és 100 közötti AI-pontszám párosul. A 85 és 89 közötti pontszám párosul, ha mindkét oldalon ugyanaz a partner, egyébként függőben lévő javaslat lesz belőle. A 85 alatti pontszám nem párosított marad, és kézzel kell összekapcsolni. A biztonsági ellenőrzések egy automatikus párosítást is visszaküldhetnek a függőben lévők közé.',
        queue:
          'A Párosítás oldal Párosítások füle: három függőben lévő javaslat a pontszámával, a számlával, a tranzakcióval, valamint Megerősítés és Elutasítás gombbal, az egyik két fizetés csoportja egy számlára. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
        tx: 'Egy nem párosított tranzakció Párosítás & fizetés kártyája: egy 87%-os AI-javaslat Megerősítés és Elvetés gombbal, a Számla keresése panel három nyitott számlával, és a „nem kell számla” menü. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
      },
      outcomes: {
        exactTitle: 'Utalási fájl vagy pontos egyezés',
        exactNote: 'Elsőként, AI nélkül',
        aiScore: 'AI-pontszám',
        samePartner: 'Azonos partner',
        otherPartner: 'Más partner',
        byHand: 'Kapcsolja össze kézzel',
        footnote: 'A biztonsági ellenőrzések egy automatikus párosítást is visszaküldhetnek a Függőben lévők közé átnézésre.',
      },
    },
  },
  de: {
    ui: {
      'matching.page.title': 'Zuordnung',
      'matching.page.tab_overview': 'Übersicht',
      'matching.page.tab_matches': 'Zuordnungen',
      'matching.page.tab_partners': 'Partner',
      'matching.page.tab_settlement': 'Ausgleich',
      'matching.history.button': 'Verlauf',
      'matching.run_button.label_idle': 'Zuordnung starten',
      'matching.unified_list.section_pending': 'Ausstehend',
      'matching.unified_list.section_approved': 'Bestätigt',
      'matching.unified_list.header_score': 'Score',
      'matching.unified_list.header_invoice': 'Rechnung',
      'matching.unified_list.header_transaction': 'Transaktion',
      'matching.unified_list.header_actions': 'Aktionen',
      'matching.unified_list.confirm_action': 'Bestätigen',
      'matching.unified_list.reject_action': 'Ablehnen',
      'matching.unified_list.confirm_title': 'Zuordnung bestätigen',
      'matching.unified_list.reject_title': 'Zuordnung ablehnen',
      'matching.unified_list.combined_amounts': '{txCount} Transaktionen · {txAmount} · {invCount} Rechnung · {invAmount}',
      'matching.unified_list.search_placeholder': 'Suche nach Rechnungsnummer, Partner oder Verwendungszweck…',
      'matching.unified_list.search_aria': 'Zuordnungen suchen',
      'matching.suggestion_detail.status_pending': 'Ausstehend',
      'transactions.detail.section_match_payment': 'Zuordnung & Zahlung',
      'transactions.slide_over.ai_suggestions': 'KI-Vorschläge',
      'transactions.slide_over.confirm': 'Bestätigen',
      'transactions.slide_over.dismiss': 'Verwerfen',
      'transactions.slide_over.find_invoice': 'Rechnung suchen',
      'transactions.slide_over.cancel': 'Abbrechen',
      'transactions.slide_over.search_placeholder_invoice': 'Suche nach Nummer, Partner…',
      'transactions.slide_over.balance_note': '(Saldo: {amount})',
      'transactions.slide_over.counterparty_separator': '{name} · ',
      'transactions.slide_over.counterparty_prefix': '· {name}',
      'transactions.slide_over.issue_date_suffix': ' · {date}',
      'transactions.slide_over.mark_no_invoice_placeholder': 'Markieren als: keine Rechnung erforderlich…',
      'transactions.slide_over.no_specific_type': 'Kein bestimmter Typ',
      'transactions.list.status_matched': 'Zugeordnet',
      'transactions.list.status_unmatched': 'Nicht zugeordnet',
      'labels.score_percent': '{score}%',
    },
    queue: {
      groups: [
        {
          scores: [87],
          invoiceNumber: 'BWG-INV-2026-0398',
          invoicePartner: 'Slatebridge Roofing Ltd.',
          invoiceAmount: 6480,
          invoiceCurrency: 'EUR',
          txPartner: 'SLATEBRIDGE RFG',
          txDate: '2026-09-18',
          txAmount: 6480,
          txCurrency: 'EUR',
        },
        {
          scores: [86, 85],
          invoiceNumber: 'BWG-INV-2026-0412',
          invoicePartner: 'Reamwell Office Supplies Ltd.',
          invoiceAmount: 2640,
          invoiceCurrency: 'EUR',
          txPartner: 'REAMWELL OFFICE',
          txDate: '2026-09-15',
          txAmount: 2640,
          txCurrency: 'EUR',
        },
        {
          scores: [85],
          invoiceNumber: 'BWG-INV-2026-0425',
          invoicePartner: 'Gearmont Fleet Services Ltd.',
          invoiceAmount: 386.4,
          invoiceCurrency: 'EUR',
          txPartner: 'GEARMONT FLEET',
          txDate: '2026-09-25',
          txAmount: 386.4,
          txCurrency: 'EUR',
        },
      ],
      approvedTotal: 128,
    },
    tx: {
      suggestion: {
        score: 87,
        invoiceNumber: 'BWG-INV-2026-0433',
        partner: 'Reamwell Office Supplies Ltd.',
        amount: 412.8,
        currency: 'EUR',
        reason:
          'Amount 412.80 EUR equals the invoice balance; 4 days after the invoice date; card text REAMWELL OFFICE 0231 resembles the partner name but is not linked to it',
      },
      openInvoices: [
        { number: 'BWG-INV-2026-0433', partner: 'Reamwell Office Supplies Ltd.', total: 412.8, currency: 'EUR', issueDate: '2026-09-10' },
        { number: 'BWG-INV-2026-0398', partner: 'Slatebridge Roofing Ltd.', total: 6480, balance: 3240, currency: 'EUR', issueDate: '2026-09-02' },
        { number: 'BWG-INV-2026-0425', partner: 'Gearmont Fleet Services Ltd.', total: 386.4, currency: 'EUR', issueDate: '2026-09-19' },
      ],
      types: ['Bankgebühr', 'Gehalt'],
    },
    help: {
      alt: {
        outcomes:
          'Diagramm, was mit einer Banktransaktion und einer infrage kommenden Rechnung geschieht. Eine Zeile aus einer Zahlungsdatei oder ein exakter Treffer wird ohne KI mit dem Score 100 zugeordnet. Ein KI-Score von 90 bis 100 wird zugeordnet. Ein Score von 85 bis 89 wird zugeordnet, wenn beide Seiten derselbe Partner sind, sonst wird er zu einem ausstehenden Vorschlag. Ein Score unter 85 bleibt nicht zugeordnet und wird von Hand verknüpft. Sicherheitsprüfungen können eine automatische Zuordnung trotzdem nach Ausstehend schicken.',
        queue:
          'Die Seite Zuordnung, Tab Zuordnungen: drei ausstehende Vorschläge mit Score, Rechnung, Transaktion sowie den Schaltflächen Bestätigen und Ablehnen, einer davon eine Gruppe aus zwei Zahlungen auf eine Rechnung. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
        tx: 'Die Karte Zuordnung & Zahlung einer nicht zugeordneten Transaktion: ein KI-Vorschlag mit 87 % und den Schaltflächen Bestätigen und Verwerfen, das Fenster Rechnung suchen mit drei offenen Rechnungen und das Menü für „keine Rechnung erforderlich“. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
      },
      outcomes: {
        exactTitle: 'Zahlungsdatei oder exakter Treffer',
        exactNote: 'Zuerst, ohne KI',
        aiScore: 'KI-Score',
        samePartner: 'Derselbe Partner',
        otherPartner: 'Anderer Partner',
        byHand: 'Von Hand verknüpfen',
        footnote: 'Sicherheitsprüfungen können eine automatische Zuordnung trotzdem zur Prüfung nach Ausstehend schicken.',
      },
    },
  },
}
