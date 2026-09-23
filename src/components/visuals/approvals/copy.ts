// Text and data for the payment-approval illustrations (approving-invoices).
//
// Two kinds of text live here, and they follow different rules:
//
//   ui       The app's own labels, copied VERBATIM from
//            aift-web/messages/<locale>.json and keyed by their message key,
//            so a drawing says exactly what the screen says and a parity check
//            can compare the two. These are the app's strings: Hungarian ones
//            are tegező because the app is (the help centre's own prose is
//            magázó; see `help` below). Only plural-free messages go here.
//   help     Words that belong to the help article, not the app: diagram
//            labels, alt text, rendered plurals. Hungarian here is magázó,
//            like every other aift-help article.
//
// The data is FICTIONAL. Supplier names are international and the same in
// every locale (Reamwell Office Supplies, Slatebridge Roofing, Quillmoor
// Software, Gearmont Fleet Services); each was checked against a web search
// on 2026-09-21 and candidates matching a real business were dropped. Do not
// swap in names from a real workspace, a demo account, or a customer
// conversation.

import type { Locale } from '@/lib/i18n'
import type { Tone } from '../kit'

export const UI_KEYS = [
  'approvals.title',
  'approvals.tabs.queue',
  'approvals.tabs.decided',
  'approvals.queue.chip_mine',
  'approvals.queue.chip_unassigned',
  'approvals.queue.chip_all_awaiting',
  'approvals.queue.chip_due_week',
  'approvals.queue.col_what',
  'approvals.queue.approve',
  'approvals.queue.decline',
  'approvals.queue.not_mine',
  'approvals.queue.select_all',
  'approvals.queue.bulk_approve',
  'approvals.queue.bulk_clear',
  'approvals.queue.decline_title',
  'approvals.queue.decline_body',
  'approvals.queue.decline_payee',
  'approvals.queue.decline_amount',
  'approvals.queue.decline_due',
  'approvals.queue.reason_wrong_amount',
  'approvals.queue.reason_work_not_done',
  'approvals.queue.reason_already_paid',
  'approvals.queue.reason_not_my_decision',
  'approvals.queue.decline_cancel',
  'approvals.queue.decline_confirm',
  'approvals.slip.to_pay',
  'approvals.slip.due',
  'approvals.slip.with_you',
  'approvals.slip.decline_question',
  'approvals.slip.decline_hint',
  'approvals.slip.reason_placeholder',
  'approvals.slip.cancel',
  'approvals.why.rule_partner',
  'approvals.why.rule_category',
  'approvals.why.learned',
  'approvals.why.fallback',
  'approvals.state.awaiting',
  'approvals.state.approved',
  'approvals.state.declined',
  'invoices.matching.status_paid',
  'settings.notifications.approval_new_items_row_title',
  'settings.notifications.approval_morning_row_title',
  'settings.notifications.approval_due_soon_row_title',
  'settings.notifications.approval_declined_row_title',
  'approvals.queue.unassigned_hint',
  'settings.notifications.approvals_section_title',
  'settings.notifications.approvals_section_desc',
  'settings.notifications.approval_new_items_row_desc',
  'settings.notifications.approval_morning_row_desc',
  'settings.notifications.approval_due_soon_row_desc',
  'settings.notifications.approval_declined_row_desc',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type WhyReason =
  | { key: 'approvals.why.rule_partner'; partner: string }
  | { key: 'approvals.why.rule_category'; category: string }
  | { key: 'approvals.why.learned'; partner: string; count: number }
  | { key: 'approvals.why.fallback' }

export type QueueRow = {
  summary: string
  partner: string
  internalId: string
  dueDate: string
  /** The app's due_in / overdue_by message, already pluralised. */
  dueRel: string
  /** Due within 7 days or overdue: the app draws an amber stripe on the row. */
  soon: boolean
  amount: number
  currency: string
  why: WhyReason
}

type Copy = {
  ui: Record<UiKey, string>
  rows: QueueRow[]
  counts: { mine: number; unassigned: number; allAwaiting: number; dueWeek: number }
  help: {
    /** approvals.queue.subtitle_window with days = 14, count = 4. */
    subtitle: string
    /** approvals.queue.bulk_selected with count = 2. */
    bulkSelected: string
    declineNote: string
    lifecycle: {
      approvedNext: string
      declinedNext: string
      notMineResult: string
      notMineNext: string
      resetNote: string
      backTo: string
    }
    alt: { queue: string; bulk: string; decline: string; lifecycle: string; emails: string }
  }
}

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'approvals.title': 'Approvals',
    'approvals.tabs.queue': 'Payment',
    'approvals.tabs.decided': 'Decisions',
    'approvals.queue.chip_mine': 'Assigned to me',
    'approvals.queue.chip_unassigned': 'Unassigned',
    'approvals.queue.chip_all_awaiting': 'All awaiting',
    'approvals.queue.chip_due_week': 'Due this week',
    'approvals.queue.col_what': 'What you are approving',
    'approvals.queue.approve': 'Approve',
    'approvals.queue.decline': 'Decline',
    'approvals.queue.not_mine': 'Not mine',
    'approvals.queue.select_all': 'Select all I can decide',
    'approvals.queue.bulk_approve': 'Approve selected',
    'approvals.queue.bulk_clear': 'Clear',
    'approvals.queue.decline_title': 'Decline payment',
    'approvals.queue.decline_body': 'The invoice stays booked. Your note goes to the finance admin and onto the invoice.',
    'approvals.queue.decline_payee': 'Payee',
    'approvals.queue.decline_amount': 'Amount',
    'approvals.queue.decline_due': 'Due',
    'approvals.queue.reason_wrong_amount': 'Wrong amount',
    'approvals.queue.reason_work_not_done': 'Work not done yet',
    'approvals.queue.reason_already_paid': 'Already paid',
    'approvals.queue.reason_not_my_decision': 'Not my decision',
    'approvals.queue.decline_cancel': 'Cancel',
    'approvals.queue.decline_confirm': 'Decline',
    'approvals.slip.to_pay': 'To pay',
    'approvals.slip.due': 'Due',
    'approvals.slip.with_you': 'With you',
    'approvals.slip.decline_question': 'Why are you declining it?',
    'approvals.slip.decline_hint': 'Final. The finance admin and Decisions will see it.',
    'approvals.slip.reason_placeholder': 'Reason (required)',
    'approvals.slip.cancel': 'Cancel',
    'approvals.why.rule_partner': 'Rule: invoices from {partner} go to you',
    'approvals.why.rule_category': 'Rule: {category} goes to you',
    'approvals.why.learned': 'Learned: the last {count} invoices from {partner} went to you',
    'approvals.why.fallback': 'Fallback approver',
    'approvals.state.awaiting': 'Awaiting approval',
    'approvals.state.approved': 'Approved',
    'approvals.state.declined': 'Declined',
    'invoices.matching.status_paid': 'Paid',
    'settings.notifications.approval_new_items_row_title': 'New invoices to approve',
    'settings.notifications.approval_morning_row_title': 'Morning list',
    'settings.notifications.approval_due_soon_row_title': 'Due-soon reminder',
    'settings.notifications.approval_declined_row_title': 'Declined invoices',
    'approvals.queue.unassigned_hint': 'Unassigned invoices are visible to every approver. Anything you do not recognise: use "Not mine" and it goes back to the finance admin.',
    'settings.notifications.approvals_section_title': 'Payment approvals',
    'settings.notifications.approvals_section_desc': 'Emails about supplier invoices waiting for your approval. Only companies where approvals are switched on send them.',
    'settings.notifications.approval_new_items_row_desc': 'One email when invoices are assigned to you, at the earliest 30 minutes after the first one, at most 2 a day.',
    'settings.notifications.approval_morning_row_desc': 'On working days at 08:00, your queue for the day. Nothing waiting, no email.',
    'settings.notifications.approval_due_soon_row_desc': 'On working days at 15:00, invoices due within 2 days that still wait for you. One reminder per invoice.',
    'settings.notifications.approval_declined_row_desc': 'For finance admins: an approver declined an invoice, with their note.',
  },
  rows: [
    {
      summary: 'Office supplies and printer paper',
      partner: 'Reamwell Office Supplies Ltd.',
      internalId: 'HPK-INV-2026-0412',
      dueDate: '2026-09-21',
      dueRel: '1 day overdue',
      soon: true,
      amount: 186690,
      currency: 'HUF',
      why: { key: 'approvals.why.rule_partner', partner: 'Reamwell Office Supplies Ltd.' },
    },
    {
      summary: 'Warehouse roof repair, 2nd instalment',
      partner: 'Slatebridge Roofing Ltd.',
      internalId: 'HPK-INV-2026-0398',
      dueDate: '2026-09-25',
      dueRel: 'in 3 days',
      soon: true,
      amount: 1524000,
      currency: 'HUF',
      why: { key: 'approvals.why.rule_category', category: 'Maintenance and repairs' },
    },
    {
      summary: 'Design software, annual licence',
      partner: 'Quillmoor Software Ltd.',
      internalId: 'HPK-INV-2026-0421',
      dueDate: '2026-10-01',
      dueRel: 'in 9 days',
      soon: false,
      amount: 588,
      currency: 'EUR',
      why: { key: 'approvals.why.learned', partner: 'Quillmoor Software Ltd.', count: 3 },
    },
    {
      summary: 'Company car service and brake pads',
      partner: 'Gearmont Fleet Services Ltd.',
      internalId: 'HPK-INV-2026-0425',
      dueDate: '2026-10-04',
      dueRel: 'in 12 days',
      soon: false,
      amount: 94615,
      currency: 'HUF',
      why: { key: 'approvals.why.fallback' },
    },
  ],
  counts: { mine: 4, unassigned: 1, allAwaiting: 7, dueWeek: 2 },
  help: {
    subtitle: 'Due in the next 14 days, assigned to you. 4 waiting.',
    bulkSelected: '2 selected',
    declineNote: 'Work not done yet. The second stage of the roof repair starts next week.',
    lifecycle: {
      approvedNext: 'The bank payment arrives and is matched',
      declinedNext: 'The finance admin settles it with the supplier and can reopen it',
      notMineResult: 'Back to the finance admin',
      notMineNext: 'They assign it to the right person',
      resetNote: 'If the amount or the supplier of an approved invoice changes, the approval resets.',
      backTo: 'back to',
    },
    alt: {
      queue:
        'The Payment list: four supplier invoices assigned to you as cards, sorted by due date, each with Approve, Decline and Not mine buttons. Numbered markers point to the parts described in the list below.',
      bulk: 'The approval queue with two invoices ticked: the dark selection bar shows how many are selected, their total in each currency, and the Approve selected button.',
      decline:
        'The roof repair card with its decline question open: four quick reasons, the reason Work not done yet written in, and the Decline and Cancel buttons.',
      lifecycle:
        'Diagram of what happens after a decision. Approve: the invoice is Approved, then Paid once the bank payment is matched. Decline: the invoice is Declined and waits for the finance admin, who can reopen it. Not mine: it goes back to the finance admin, who assigns it again. A change to the amount or supplier of an approved invoice sends it back to Awaiting approval.',
      emails:
        'The Payment approvals section of Account, Notifications: four emails, each with its own switch, all switched on. Each row says when the email arrives.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'approvals.title': 'Jóváhagyások',
    'approvals.tabs.queue': 'Kifizetés',
    'approvals.tabs.decided': 'Döntések',
    'approvals.queue.chip_mine': 'Nekem kiosztva',
    'approvals.queue.chip_unassigned': 'Kiosztatlan',
    'approvals.queue.chip_all_awaiting': 'Minden várakozó',
    'approvals.queue.chip_due_week': 'Ezen a héten esedékes',
    'approvals.queue.col_what': 'Amit jóváhagysz',
    'approvals.queue.approve': 'Jóváhagyom',
    'approvals.queue.decline': 'Elutasítom',
    'approvals.queue.not_mine': 'Nem az enyém',
    'approvals.queue.select_all': 'Minden eldönthető kijelölése',
    'approvals.queue.bulk_approve': 'Kijelöltek jóváhagyása',
    'approvals.queue.bulk_clear': 'Kijelölés megszüntetése',
    'approvals.queue.decline_title': 'Kifizetés elutasítása',
    'approvals.queue.decline_body': 'A számla könyvelve marad. A megjegyzésed a pénzügyi adminisztrátorhoz és a számlára kerül.',
    'approvals.queue.decline_payee': 'Kedvezményezett',
    'approvals.queue.decline_amount': 'Összeg',
    'approvals.queue.decline_due': 'Esedékes',
    'approvals.queue.reason_wrong_amount': 'Rossz összeg',
    'approvals.queue.reason_work_not_done': 'A munka még nincs kész',
    'approvals.queue.reason_already_paid': 'Már ki van fizetve',
    'approvals.queue.reason_not_my_decision': 'Nem az én döntésem',
    'approvals.queue.decline_cancel': 'Mégse',
    'approvals.queue.decline_confirm': 'Elutasítom',
    'approvals.slip.to_pay': 'Fizetendő',
    'approvals.slip.due': 'Határidő',
    'approvals.slip.with_you': 'Nálad',
    'approvals.slip.decline_question': 'Miért utasítod el?',
    'approvals.slip.decline_hint': 'Végleges. A pénzügyi adminisztrátor és a Döntések is látja.',
    'approvals.slip.reason_placeholder': 'Indoklás (kötelező)',
    'approvals.slip.cancel': 'Mégse',
    'approvals.why.rule_partner': 'Szabály: {partner} számlái hozzád kerülnek',
    'approvals.why.rule_category': 'Szabály: {category} hozzád kerül',
    'approvals.why.learned': 'Tanult: a(z) {partner} utolsó {count} számlája hozzád került',
    'approvals.why.fallback': 'Alapértelmezett jóváhagyó',
    'approvals.state.awaiting': 'Jóváhagyásra vár',
    'approvals.state.approved': 'Jóváhagyva',
    'approvals.state.declined': 'Elutasítva',
    'invoices.matching.status_paid': 'Fizetve',
    'settings.notifications.approval_new_items_row_title': 'Új jóváhagyandó számlák',
    'settings.notifications.approval_morning_row_title': 'Reggeli lista',
    'settings.notifications.approval_due_soon_row_title': 'Határidő-emlékeztető',
    'settings.notifications.approval_declined_row_title': 'Elutasított számlák',
    'approvals.queue.unassigned_hint': 'A kiosztatlan számlákat minden jóváhagyó látja. Amit nem ismersz fel: a "Nem az enyém" gombbal visszakerül a pénzügyi adminisztrátorhoz.',
    'settings.notifications.approvals_section_title': 'Kifizetések jóváhagyása',
    'settings.notifications.approvals_section_desc': 'E-mailek a jóváhagyásodra váró szállítói számlákról. Csak olyan cég küld ilyet, ahol a jóváhagyás be van kapcsolva.',
    'settings.notifications.approval_new_items_row_desc': 'Egy e-mail, amikor számlák kerülnek hozzád, legkorábban 30 perccel az első után, naponta legfeljebb 2.',
    'settings.notifications.approval_morning_row_desc': 'Munkanapokon 8:00-kor a napi listád. Ha semmi nem vár rád, nincs e-mail.',
    'settings.notifications.approval_due_soon_row_desc': 'Munkanapokon 15:00-kor a két napon belül esedékes, még rád váró számlák. Számlánként egy emlékeztető.',
    'settings.notifications.approval_declined_row_desc': 'Pénzügyi adminisztrátoroknak: egy jóváhagyó elutasított egy számlát, az indoklásával.',
  },
  rows: [
    {
      summary: 'Irodaszer és nyomtatópapír',
      partner: 'Reamwell Office Supplies Ltd.',
      internalId: 'HPK-INV-2026-0412',
      dueDate: '2026-09-21',
      dueRel: '1 napja lejárt',
      soon: true,
      amount: 186690,
      currency: 'HUF',
      why: { key: 'approvals.why.rule_partner', partner: 'Reamwell Office Supplies Ltd.' },
    },
    {
      summary: 'Raktártető javítása, 2. részszámla',
      partner: 'Slatebridge Roofing Ltd.',
      internalId: 'HPK-INV-2026-0398',
      dueDate: '2026-09-25',
      dueRel: '3 nap múlva',
      soon: true,
      amount: 1524000,
      currency: 'HUF',
      why: { key: 'approvals.why.rule_category', category: 'Karbantartás és javítás' },
    },
    {
      summary: 'Tervezőszoftver, éves licenc',
      partner: 'Quillmoor Software Ltd.',
      internalId: 'HPK-INV-2026-0421',
      dueDate: '2026-10-01',
      dueRel: '9 nap múlva',
      soon: false,
      amount: 588,
      currency: 'EUR',
      why: { key: 'approvals.why.learned', partner: 'Quillmoor Software Ltd.', count: 3 },
    },
    {
      summary: 'Céges autó szervize, fékbetétcsere',
      partner: 'Gearmont Fleet Services Ltd.',
      internalId: 'HPK-INV-2026-0425',
      dueDate: '2026-10-04',
      dueRel: '12 nap múlva',
      soon: false,
      amount: 94615,
      currency: 'HUF',
      why: { key: 'approvals.why.fallback' },
    },
  ],
  counts: { mine: 4, unassigned: 1, allAwaiting: 7, dueWeek: 2 },
  help: {
    subtitle: 'A következő 14 napban esedékes, neked kiosztva. 4 vár.',
    bulkSelected: '2 kijelölve',
    declineNote: 'A munka még nincs kész. A tetőjavítás második szakasza jövő héten kezdődik.',
    lifecycle: {
      approvedNext: 'Megérkezik és párosítódik a banki kifizetés',
      declinedNext: 'A pénzügyi admin tisztázza a szállítóval, és újranyithatja',
      notMineResult: 'Vissza a pénzügyi adminhoz',
      notMineNext: 'Ő osztja ki a megfelelő személynek',
      resetNote: 'Ha egy jóváhagyott számla összege vagy szállítója megváltozik, a jóváhagyás visszaáll.',
      backTo: 'vissza:',
    },
    alt: {
      queue:
        'A Kifizetés lista: négy Önnek kiosztott szállítói számla kártyákon, esedékesség szerint rendezve, mindegyiken Jóváhagyom, Elutasítom és Nem az enyém gombbal. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
      bulk: 'A jóváhagyási lista két bejelölt számlával: a sötét kijelölősáv mutatja, hány számla van kijelölve, mennyi az összegük pénznemenként, és a Kijelöltek jóváhagyása gombot.',
      decline:
        'A tetőjavítás kártyája nyitott elutasítási kérdéssel: négy gyors indok, beírva A munka még nincs kész indok, és az Elutasítom és Mégse gomb.',
      lifecycle:
        'Ábra arról, mi történik a döntés után. Jóváhagyás: a számla Jóváhagyva állapotba kerül, majd Fizetve lesz, amint a banki kifizetés párosítódik. Elutasítás: a számla Elutasítva állapotban a pénzügyi adminra vár, aki újranyithatja. Nem az enyém: visszakerül a pénzügyi adminhoz, aki újra kiosztja. Ha egy jóváhagyott számla összege vagy szállítója megváltozik, visszakerül Jóváhagyásra vár állapotba.',
      emails:
        'A Fiók, Értesítések oldal Kifizetések jóváhagyása szakasza: négy e-mail, mindegyik saját kapcsolóval, mind bekapcsolva. Minden sor megmondja, mikor érkezik az e-mail.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'approvals.title': 'Freigaben',
    'approvals.tabs.queue': 'Zahlung',
    'approvals.tabs.decided': 'Entscheidungen',
    'approvals.queue.chip_mine': 'Mir zugewiesen',
    'approvals.queue.chip_unassigned': 'Nicht zugewiesen',
    'approvals.queue.chip_all_awaiting': 'Alle ausstehenden',
    'approvals.queue.chip_due_week': 'Diese Woche fällig',
    'approvals.queue.col_what': 'Was Sie freigeben',
    'approvals.queue.approve': 'Freigeben',
    'approvals.queue.decline': 'Ablehnen',
    'approvals.queue.not_mine': 'Nicht meins',
    'approvals.queue.select_all': 'Alle entscheidbaren auswählen',
    'approvals.queue.bulk_approve': 'Auswahl freigeben',
    'approvals.queue.bulk_clear': 'Auswahl aufheben',
    'approvals.queue.decline_title': 'Zahlung ablehnen',
    'approvals.queue.decline_body': 'Die Rechnung bleibt gebucht. Ihre Notiz geht an den Finanzadmin und auf die Rechnung.',
    'approvals.queue.decline_payee': 'Empfänger',
    'approvals.queue.decline_amount': 'Betrag',
    'approvals.queue.decline_due': 'Fällig',
    'approvals.queue.reason_wrong_amount': 'Falscher Betrag',
    'approvals.queue.reason_work_not_done': 'Leistung noch nicht erbracht',
    'approvals.queue.reason_already_paid': 'Bereits bezahlt',
    'approvals.queue.reason_not_my_decision': 'Nicht meine Entscheidung',
    'approvals.queue.decline_cancel': 'Abbrechen',
    'approvals.queue.decline_confirm': 'Ablehnen',
    'approvals.slip.to_pay': 'Zu zahlen',
    'approvals.slip.due': 'Fällig',
    'approvals.slip.with_you': 'Bei Ihnen',
    'approvals.slip.decline_question': 'Warum lehnen Sie sie ab?',
    'approvals.slip.decline_hint': 'Endgültig. Die Finanzadministration und Entscheidungen sehen das.',
    'approvals.slip.reason_placeholder': 'Begründung (Pflicht)',
    'approvals.slip.cancel': 'Abbrechen',
    'approvals.why.rule_partner': 'Regel: Rechnungen von {partner} gehen an Sie',
    'approvals.why.rule_category': 'Regel: {category} geht an Sie',
    'approvals.why.learned': 'Gelernt: die letzten {count} Rechnungen von {partner} gingen an Sie',
    'approvals.why.fallback': 'Standard-Freigeber',
    'approvals.state.awaiting': 'Freigabe ausstehend',
    'approvals.state.approved': 'Freigegeben',
    'approvals.state.declined': 'Abgelehnt',
    'invoices.matching.status_paid': 'Bezahlt',
    'settings.notifications.approval_new_items_row_title': 'Neue Rechnungen zur Freigabe',
    'settings.notifications.approval_morning_row_title': 'Morgenliste',
    'settings.notifications.approval_due_soon_row_title': 'Fälligkeitserinnerung',
    'settings.notifications.approval_declined_row_title': 'Abgelehnte Rechnungen',
    'approvals.queue.unassigned_hint': 'Nicht zugewiesene Rechnungen sehen alle Freigeber. Was Sie nicht erkennen: mit "Nicht meins" geht es zurück an den Finanzadmin.',
    'settings.notifications.approvals_section_title': 'Zahlungsfreigaben',
    'settings.notifications.approvals_section_desc': 'E-Mails zu Lieferantenrechnungen, die auf Ihre Freigabe warten. Nur Unternehmen mit eingeschalteter Freigabe senden sie.',
    'settings.notifications.approval_new_items_row_desc': 'Eine E-Mail, wenn Ihnen Rechnungen zugewiesen werden, frühestens 30 Minuten nach der ersten, höchstens 2 am Tag.',
    'settings.notifications.approval_morning_row_desc': 'An Arbeitstagen um 8:00 Ihre Liste für den Tag. Wartet nichts, kommt keine E-Mail.',
    'settings.notifications.approval_due_soon_row_desc': 'An Arbeitstagen um 15:00 die in 2 Tagen fälligen Rechnungen, die noch auf Sie warten. Eine Erinnerung pro Rechnung.',
    'settings.notifications.approval_declined_row_desc': 'Für Finanzadmins: ein Freigeber hat eine Rechnung abgelehnt, mit Begründung.',
  },
  rows: [
    {
      summary: 'Büromaterial und Druckerpapier',
      partner: 'Reamwell Office Supplies Ltd.',
      internalId: 'BWG-INV-2026-0412',
      dueDate: '2026-09-21',
      dueRel: '1 Tag überfällig',
      soon: true,
      amount: 412.8,
      currency: 'EUR',
      why: { key: 'approvals.why.rule_partner', partner: 'Reamwell Office Supplies Ltd.' },
    },
    {
      summary: 'Dachreparatur Lager, 2. Teilrechnung',
      partner: 'Slatebridge Roofing Ltd.',
      internalId: 'BWG-INV-2026-0398',
      dueDate: '2026-09-25',
      dueRel: 'in 3 Tagen',
      soon: true,
      amount: 6480,
      currency: 'EUR',
      why: { key: 'approvals.why.rule_category', category: 'Instandhaltung und Reparaturen' },
    },
    {
      summary: 'Designsoftware, Jahreslizenz',
      partner: 'Quillmoor Software Ltd.',
      internalId: 'BWG-INV-2026-0421',
      dueDate: '2026-10-01',
      dueRel: 'in 9 Tagen',
      soon: false,
      amount: 588,
      currency: 'EUR',
      why: { key: 'approvals.why.learned', partner: 'Quillmoor Software Ltd.', count: 3 },
    },
    {
      summary: 'Firmenwagen: Service und Bremsbeläge',
      partner: 'Gearmont Fleet Services Ltd.',
      internalId: 'BWG-INV-2026-0425',
      dueDate: '2026-10-04',
      dueRel: 'in 12 Tagen',
      soon: false,
      amount: 386.4,
      currency: 'EUR',
      why: { key: 'approvals.why.fallback' },
    },
  ],
  counts: { mine: 4, unassigned: 1, allAwaiting: 7, dueWeek: 2 },
  help: {
    subtitle: 'Fällig in den nächsten 14 Tagen, Ihnen zugewiesen. 4 wartend.',
    bulkSelected: '2 ausgewählt',
    declineNote: 'Leistung noch nicht erbracht. Der zweite Abschnitt der Dachreparatur beginnt nächste Woche.',
    lifecycle: {
      approvedNext: 'Die Bankzahlung kommt an und wird abgeglichen',
      declinedNext: 'Der Finanzadmin klärt es mit dem Lieferanten und kann sie erneut öffnen',
      notMineResult: 'Zurück an den Finanzadmin',
      notMineNext: 'Der Finanzadmin weist sie der richtigen Person zu',
      resetNote: 'Ändern sich Betrag oder Lieferant einer freigegebenen Rechnung, wird die Freigabe zurückgesetzt.',
      backTo: 'zurück zu',
    },
    alt: {
      queue:
        'Die Liste Zahlung: vier Ihnen zugewiesene Lieferantenrechnungen als Karten, nach Fälligkeit sortiert, jede mit den Schaltflächen Freigeben, Ablehnen und Nicht meins. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
      bulk: 'Die Freigabeliste mit zwei markierten Rechnungen: die dunkle Auswahlleiste zeigt, wie viele ausgewählt sind, ihre Summe je Währung und die Schaltfläche Auswahl freigeben.',
      decline:
        'Die Karte der Dachreparatur mit offener Ablehnungsfrage: vier Schnellgründe, die eingetragene Begründung Leistung noch nicht erbracht und die Schaltflächen Ablehnen und Abbrechen.',
      lifecycle:
        'Diagramm, was nach einer Entscheidung passiert. Freigeben: die Rechnung ist Freigegeben und wird Bezahlt, sobald die Bankzahlung abgeglichen ist. Ablehnen: die Rechnung ist Abgelehnt und wartet auf den Finanzadmin, der sie erneut öffnen kann. Nicht meins: sie geht zurück an den Finanzadmin, der sie neu zuweist. Ändern sich Betrag oder Lieferant einer freigegebenen Rechnung, geht sie zurück zu Freigabe ausstehend.',
      emails:
        'Der Abschnitt Zahlungsfreigaben unter Konto, Benachrichtigungen: vier E-Mails, jede mit eigenem Schalter, alle eingeschaltet. Jede Zeile sagt, wann die E-Mail kommt.',
    },
  },
}

export const approvalsCopy: Record<Locale, Copy> = { en, hu, de }

/** Fill `{name}` placeholders in a plural-free app message. */
export function fill(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(params[k] ?? `{${k}}`))
}

export function whyText(copy: Copy, why: WhyReason): string {
  const { key, ...params } = why
  return fill(copy.ui[key], params)
}

export const STATE_TONE: Record<'awaiting' | 'approved' | 'declined' | 'paid', Tone> = {
  // aift-web src/lib/approvals.ts APPROVAL_STATE_TONE; paid is emerald like
  // every other "resolved" label.
  awaiting: 'amber',
  approved: 'emerald',
  declined: 'blue',
  paid: 'emerald',
}
