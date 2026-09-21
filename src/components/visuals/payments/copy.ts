// Text and data for the payment-file illustrations (paying-approved-invoices).
//
// `ui` holds the app's own labels, copied VERBATIM from
// aift-web/messages/<locale>.json and keyed by their message key (plural-free
// messages only; placeholders are filled with `fill`). Hungarian ones are
// tegező because the app is. `help` holds the article's own words (diagram
// labels, alt text), magázó in Hungarian like every aift-help article.
//
// The data is FICTIONAL: the same international supplier names as the
// approvals illustrations, plus the paying company Halvorn Trading Ltd.; each
// was checked against a web search on 2026-09-21 and names matching a real
// business were dropped. Hungarian account numbers are invented (valid check
// digits, the bank codes of the banks they stand for); the German version uses
// the published example IBANs of their countries. Never real data.

import type { Locale } from '@/lib/i18n'

export const UI_KEYS = [
  'approvals.payments.title',
  'approvals.payments.subtitle',
  'approvals.payments.show_filed',
  'approvals.payments.proposal_note',
  'approvals.payments.group_lines',
  'approvals.payments.group_total',
  'approvals.payments.format_pick',
  'approvals.payments.format_xlsx',
  'approvals.payments.format_pain001',
  'approvals.payments.format_payord',
  'approvals.payments.download_xlsx',
  'approvals.payments.bank_hint_documented',
  'approvals.payments.select_all',
  'approvals.payments.selected',
  'approvals.payments.col_due',
  'approvals.payments.col_execution',
  'approvals.payee_account.status.confirmed',
  'approvals.payee_account.status.first_seen',
  'approvals.payee_account.registry.confirmed_by_person',
  'approvals.payments.blocked_title',
  'approvals.payments.blocked_hint',
  'approvals.payments.reason_payee_first_seen',
  'approvals.payments.open_partner',
  'approvals.payments.open_invoice',
  'approvals.payments.history_title',
  'approvals.payments.history_empty',
  'approvals.payments.filed_badge',
  'approvals.payments.release',
  'matching.detail.matched_from_payment_file',
  'invoices.labels.approved',
  'invoices.matching.status_paid',
] as const

export type UiKey = (typeof UI_KEYS)[number]

export type PayeeStatus = 'confirmed' | 'first_seen'

/** One line on the payment file page (aift-web PaymentCandidate, the parts shown). */
export type PaymentLine = {
  payee: string
  /** As the app displays it: HU domestic 8-8(-8), a foreign IBAN unspaced. */
  account: string
  status: PayeeStatus
  invoiceNumber: string
  dueDate: string
  executionDate: string
  amount: number
  currency: string
  /** The person who confirmed the payee account. */
  confirmedBy?: string
  selected?: boolean
}

type Copy = {
  ui: Record<UiKey, string>
  company: string
  /** The paying account, displayed as the app does (HU domestic format). */
  payingAccount: string
  /** payment_file_bank_profiles.bank_name of the paying account's bank. */
  bankName: string
  currency: string
  lines: PaymentLine[]
  blocked: PaymentLine[]
  help: {
    flow: {
      approved: string
      approvedDetail: string
      file: string
      fileDetail: string
      netbank: string
      netbankDetail: string
      statement: string
      statementDetail: string
      paid: string
      paidDetail: string
      release: string
    }
    alt: { flow: string; page: string }
  }
}

// Shared by every locale: the file number the diagram shows.
export const FILE_SEQ = 3

// Hungarian domestic accounts (en, hu). First blocks: MBH 103, K&H 104,
// Erste 116, CIB 107, Raiffeisen 120.
const HU_ACCOUNTS = {
  paying: '10300002-20391548',
  reamwell: '10403019-50618279',
  slatebridge: '11600006-33188463',
  gearmont: '10700244-66240918',
  quillmoor: '12011007-42077354',
}

// Published example IBANs (Germany, Austria, the Netherlands, the UK).
const IBAN_ACCOUNTS = {
  reamwell: 'DE89370400440532013000',
  slatebridge: 'AT611904300234573201',
  gearmont: 'NL91ABNA0417164300',
  quillmoor: 'GB29NWBK60161331926819',
}

function lines(currency: string, amounts: [number, number, number, number], accounts: typeof IBAN_ACCOUNTS, blockedCurrency: string) {
  return {
    lines: [
      {
        payee: 'Reamwell Office Supplies Ltd.',
        account: accounts.reamwell,
        status: 'confirmed',
        invoiceNumber: 'RW-2026-1187',
        dueDate: '2026-09-21',
        executionDate: '2026-09-22',
        amount: amounts[0],
        currency,
        confirmedBy: 'Anna Berg',
        selected: true,
      },
      {
        payee: 'Slatebridge Roofing Ltd.',
        account: accounts.slatebridge,
        status: 'confirmed',
        invoiceNumber: 'SBR/2026/0342',
        dueDate: '2026-09-25',
        executionDate: '2026-09-25',
        amount: amounts[1],
        currency,
        confirmedBy: 'David Hart',
        selected: true,
      },
      {
        // Due on a Sunday: the execution date moves to Monday.
        payee: 'Gearmont Fleet Services Ltd.',
        account: accounts.gearmont,
        status: 'confirmed',
        invoiceNumber: 'GFS-26-00918',
        dueDate: '2026-10-04',
        executionDate: '2026-10-05',
        amount: amounts[2],
        currency,
        confirmedBy: 'Anna Berg',
      },
    ] satisfies PaymentLine[],
    blocked: [
      {
        payee: 'Quillmoor Software Ltd.',
        account: accounts.quillmoor,
        status: 'first_seen',
        invoiceNumber: 'QM-INV-4471',
        dueDate: '2026-10-01',
        executionDate: '2026-10-01',
        amount: amounts[3],
        currency: blockedCurrency,
      },
    ] satisfies PaymentLine[],
  }
}

// ── English ─────────────────────────────────────────────────────────────────

const en: Copy = {
  ui: {
    'approvals.payments.title': 'Payment file',
    'approvals.payments.subtitle': 'Approved, unpaid supplier invoices, grouped by the account that pays them. {count} lines, {blocked} cannot go in yet.',
    'approvals.payments.show_filed': 'Show lines already in a file',
    'approvals.payments.proposal_note': 'A payment file is a proposal. You import it into your own netbank and sign it there. Money never moves through AI Finance Team. An invoice counts as paid only when the bank transaction arrives and is matched.',
    'approvals.payments.group_lines': '{count} lines',
    'approvals.payments.group_total': 'Total {amount}',
    'approvals.payments.format_pick': 'Format',
    'approvals.payments.format_xlsx': 'Spreadsheet (XLSX), any bank',
    'approvals.payments.format_pain001': 'Bank file (pain.001 XML)',
    'approvals.payments.format_payord': 'Electra file (.HUF)',
    'approvals.payments.download_xlsx': 'Download list (XLSX)',
    'approvals.payments.bank_hint_documented': '{bank}: pain.001 import documented by the bank, not yet tested with a real file.',
    'approvals.payments.select_all': 'Select all in this group',
    'approvals.payments.selected': '{count} selected',
    'approvals.payments.col_due': 'Due',
    'approvals.payments.col_execution': 'Execution',
    'approvals.payee_account.status.confirmed': 'Confirmed',
    'approvals.payee_account.status.first_seen': 'First time seen',
    'approvals.payee_account.registry.confirmed_by_person': 'Confirmed by {name}.',
    'approvals.payments.blocked_title': 'Cannot be included yet',
    'approvals.payments.blocked_hint': 'These lines need a decision before they can go in a file.',
    'approvals.payments.reason_payee_first_seen': 'First time this supplier\'s account is seen. Confirm it on the partner page.',
    'approvals.payments.open_partner': 'Open partner',
    'approvals.payments.open_invoice': 'Open invoice',
    'approvals.payments.history_title': 'Files',
    'approvals.payments.history_empty': 'No file yet.',
    'approvals.payments.filed_badge': 'In file #{seq}',
    'approvals.payments.release': 'Release',
    'matching.detail.matched_from_payment_file': 'Matched from payment file #{seq}',
    'invoices.labels.approved': 'Approved',
    'invoices.matching.status_paid': 'Paid',
  },
  company: 'Halvorn Trading Ltd.',
  payingAccount: HU_ACCOUNTS.paying,
  bankName: 'MBH Bank Nyrt.',
  currency: 'HUF',
  ...lines('HUF', [186690, 1524000, 94615, 588], HU_ACCOUNTS, 'EUR'),
  help: {
    flow: {
      approved: 'Approval',
      approvedDetail:
        'The invoice appears on the Payment file page. Until its payee account is confirmed, it waits under Cannot be included yet.',
      file: 'Payment file',
      fileDetail: 'You tick the lines and download the list or the bank file. The invoice is now in a numbered file.',
      netbank: 'Your netbank',
      netbankDetail: 'You import the file, check it and sign it there. Money never moves through AI Finance Team.',
      statement: 'Bank statement',
      statementDetail: 'The payment arrives and is matched to its line in the file, without any scoring.',
      paid: 'Invoice status',
      paidDetail: 'Only now does the invoice count as paid.',
      release: 'The transfer never happened? Release the line and the invoice goes back to the list of invoices to pay.',
    },
    alt: {
      flow:
        'Diagram in five steps: the approved invoice appears on the Payment file page; you download a payment file with it; you import and sign the file in your netbank; the payment arrives on the bank statement and is matched to its line; the invoice is paid. A line whose transfer never happened can be released back to the list.',
      page:
        'The Payment file page: one group for Halvorn Trading Ltd. paying from its MBH Bank account, with three invoices, two of them ticked, the Format picker and the Download list (XLSX) button. Below, the group Cannot be included yet holds one invoice whose supplier account is seen for the first time. Numbered markers point to the parts described in the list below.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'approvals.payments.title': 'Utalási fájl',
    'approvals.payments.subtitle': 'Jóváhagyott, még kifizetetlen szállítói számlák, a fizető számla szerint csoportosítva. {count} tétel, {blocked} még nem kerülhet be.',
    'approvals.payments.show_filed': 'Már fájlban lévő tételek mutatása',
    'approvals.payments.proposal_note': 'Az utalási fájl javaslat. A saját netbankodba importálod, és ott írod alá. Az AI Finance Teamen keresztül nem mozog pénz. Egy számla akkor számít kifizetettnek, amikor a banki tranzakció megérkezik és párosítjuk.',
    'approvals.payments.group_lines': '{count} tétel',
    'approvals.payments.group_total': 'Összesen {amount}',
    'approvals.payments.format_pick': 'Formátum',
    'approvals.payments.format_xlsx': 'Táblázat (XLSX), bármelyik bankhoz',
    'approvals.payments.format_pain001': 'Banki fájl (pain.001 XML)',
    'approvals.payments.format_payord': 'Electra fájl (.HUF)',
    'approvals.payments.download_xlsx': 'Lista letöltése (XLSX)',
    'approvals.payments.bank_hint_documented': '{bank}: a pain.001 importot a bank dokumentálja, valódi fájllal még nem teszteltük.',
    'approvals.payments.select_all': 'Összes kijelölése ebben a csoportban',
    'approvals.payments.selected': '{count} kijelölve',
    'approvals.payments.col_due': 'Határidő',
    'approvals.payments.col_execution': 'Terhelés',
    'approvals.payee_account.status.confirmed': 'Megerősítve',
    'approvals.payee_account.status.first_seen': 'Először látott',
    'approvals.payee_account.registry.confirmed_by_person': 'Megerősítette: {name}.',
    'approvals.payments.blocked_title': 'Még nem kerülhet be',
    'approvals.payments.blocked_hint': 'Ezekhez a tételekhez döntés kell, mielőtt fájlba kerülhetnek.',
    'approvals.payments.reason_payee_first_seen': 'Ez a szállító számlaszáma először látszik. Erősítsd meg a partner oldalán.',
    'approvals.payments.open_partner': 'Partner megnyitása',
    'approvals.payments.open_invoice': 'Számla megnyitása',
    'approvals.payments.history_title': 'Fájlok',
    'approvals.payments.history_empty': 'Még nincs fájl.',
    'approvals.payments.filed_badge': '#{seq} fájlban',
    'approvals.payments.release': 'Visszavonás',
    'matching.detail.matched_from_payment_file': 'Párosítva a(z) #{seq} utalási fájl alapján',
    'invoices.labels.approved': 'Jóváhagyva',
    'invoices.matching.status_paid': 'Fizetve',
  },
  company: 'Halvorn Trading Ltd.',
  payingAccount: HU_ACCOUNTS.paying,
  bankName: 'MBH Bank Nyrt.',
  currency: 'HUF',
  ...lines('HUF', [186690, 1524000, 94615, 588], HU_ACCOUNTS, 'EUR'),
  help: {
    flow: {
      approved: 'Jóváhagyás',
      approvedDetail:
        'A számla megjelenik az Utalási fájl oldalon. Amíg a kedvezményezett számlaszámát meg nem erősítik, a Még nem kerülhet be csoportban vár.',
      file: 'Utalási fájl',
      fileDetail: 'Kijelöli a tételeket, és letölti a listát vagy a banki fájlt. A számla ezzel egy sorszámozott fájlba kerül.',
      netbank: 'Az Ön netbankja',
      netbankDetail: 'Ott importálja, ellenőrzi és írja alá a fájlt. Az AI Finance Teamen keresztül nem mozog pénz.',
      statement: 'Bankszámlakivonat',
      statementDetail: 'Megérkezik az utalás, és pontozás nélkül párosítjuk a fájl tételéhez.',
      paid: 'A számla állapota',
      paidDetail: 'A számla csak ekkor számít kifizetettnek.',
      release: 'Az utalás végül nem történt meg? Vonja vissza a tételt, és a számla visszakerül a kifizetendők listájára.',
    },
    alt: {
      flow:
        'Ötlépéses ábra: a jóváhagyott számla megjelenik az Utalási fájl oldalon; Ön utalási fájlt tölt le vele; a fájlt a netbankjában importálja és aláírja; az utalás megjelenik a bankszámlakivonaton, és párosítjuk a tételéhez; a számla kifizetett lesz. Ha egy utalás nem történt meg, a tétel visszavonható a listára.',
      page:
        'Az Utalási fájl oldal: egy csoport a Halvorn Trading Ltd. MBH Bank-számlájáról, három számlával, ebből kettő kijelölve, a Formátum választóval és a Lista letöltése (XLSX) gombbal. Alatta a Még nem kerülhet be csoportban egy számla, amelynek szállítói számlaszáma először látszik. A számozott jelölők az alábbi listában leírt részekre mutatnak.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'approvals.payments.title': 'Zahlungsdatei',
    'approvals.payments.subtitle': 'Freigegebene, noch unbezahlte Lieferantenrechnungen, gruppiert nach dem zahlenden Konto. {count} Positionen, {blocked} können noch nicht aufgenommen werden.',
    'approvals.payments.show_filed': 'Positionen zeigen, die bereits in einer Datei sind',
    'approvals.payments.proposal_note': 'Eine Zahlungsdatei ist ein Vorschlag. Sie importieren sie in Ihr eigenes Onlinebanking und signieren sie dort. Über AI Finance Team fließt nie Geld. Eine Rechnung gilt erst als bezahlt, wenn der Bankumsatz eintrifft und zugeordnet ist.',
    'approvals.payments.group_lines': '{count} Positionen',
    'approvals.payments.group_total': 'Summe {amount}',
    'approvals.payments.format_pick': 'Format',
    'approvals.payments.format_xlsx': 'Tabelle (XLSX), für jede Bank',
    'approvals.payments.format_pain001': 'Bankdatei (pain.001 XML)',
    'approvals.payments.format_payord': 'Electra-Datei (.HUF)',
    'approvals.payments.download_xlsx': 'Liste herunterladen (XLSX)',
    'approvals.payments.bank_hint_documented': '{bank}: pain.001-Import von der Bank dokumentiert, noch nicht mit einer echten Datei getestet.',
    'approvals.payments.select_all': 'Alle in dieser Gruppe auswählen',
    'approvals.payments.selected': '{count} ausgewählt',
    'approvals.payments.col_due': 'Fällig',
    'approvals.payments.col_execution': 'Ausführung',
    'approvals.payee_account.status.confirmed': 'Bestätigt',
    'approvals.payee_account.status.first_seen': 'Zum ersten Mal gesehen',
    'approvals.payee_account.registry.confirmed_by_person': 'Bestätigt von {name}.',
    'approvals.payments.blocked_title': 'Noch nicht aufnehmbar',
    'approvals.payments.blocked_hint': 'Diese Positionen brauchen eine Entscheidung, bevor sie in eine Datei können.',
    'approvals.payments.reason_payee_first_seen': 'Das Konto dieses Lieferanten wird zum ersten Mal gesehen. Bestätigen Sie es auf der Partnerseite.',
    'approvals.payments.open_partner': 'Partner öffnen',
    'approvals.payments.open_invoice': 'Rechnung öffnen',
    'approvals.payments.history_title': 'Dateien',
    'approvals.payments.history_empty': 'Noch keine Datei.',
    'approvals.payments.filed_badge': 'In Datei #{seq}',
    'approvals.payments.release': 'Zurücknehmen',
    'matching.detail.matched_from_payment_file': 'Zugeordnet aus Zahlungsdatei #{seq}',
    'invoices.labels.approved': 'Freigegeben',
    'invoices.matching.status_paid': 'Bezahlt',
  },
  company: 'Halvorn Trading Ltd.',
  payingAccount: HU_ACCOUNTS.paying,
  bankName: 'MBH Bank Nyrt.',
  currency: 'EUR',
  ...lines('EUR', [412.8, 6480, 386.4, 588], IBAN_ACCOUNTS, 'EUR'),
  help: {
    flow: {
      approved: 'Freigabe',
      approvedDetail:
        'Die Rechnung erscheint auf der Seite Zahlungsdatei. Solange das Empfängerkonto nicht bestätigt ist, wartet sie unter Noch nicht aufnehmbar.',
      file: 'Zahlungsdatei',
      fileDetail: 'Sie wählen die Positionen aus und laden die Liste oder die Bankdatei herunter. Die Rechnung steht nun in einer nummerierten Datei.',
      netbank: 'Ihr Onlinebanking',
      netbankDetail: 'Dort importieren, prüfen und signieren Sie die Datei. Über AI Finance Team fließt nie Geld.',
      statement: 'Kontoauszug',
      statementDetail: 'Die Zahlung trifft ein und wird ihrer Position in der Datei zugeordnet, ohne Bewertung.',
      paid: 'Rechnungsstatus',
      paidDetail: 'Erst jetzt gilt die Rechnung als bezahlt.',
      release: 'Die Überweisung kam nie zustande? Nehmen Sie die Position zurück, und die Rechnung kommt zurück auf die Liste der zu zahlenden Rechnungen.',
    },
    alt: {
      flow:
        'Diagramm in fünf Schritten: Die freigegebene Rechnung erscheint auf der Seite Zahlungsdatei; Sie laden eine Zahlungsdatei mit ihr herunter; Sie importieren und signieren die Datei im Onlinebanking; die Zahlung erscheint auf dem Kontoauszug und wird ihrer Position zugeordnet; die Rechnung ist bezahlt. Eine Position, deren Überweisung nie zustande kam, kann auf die Liste zurückgenommen werden.',
      page:
        'Die Seite Zahlungsdatei: eine Gruppe für Halvorn Trading Ltd., die von ihrem Konto bei der MBH Bank zahlt, mit drei Rechnungen, davon zwei ausgewählt, der Formatauswahl und der Schaltfläche Liste herunterladen (XLSX). Darunter die Gruppe Noch nicht aufnehmbar mit einer Rechnung, deren Lieferantenkonto zum ersten Mal gesehen wird. Nummerierte Markierungen zeigen auf die Teile, die in der Liste darunter beschrieben sind.',
    },
  },
}

export const paymentsCopy: Record<Locale, Copy> = { en, hu, de }
