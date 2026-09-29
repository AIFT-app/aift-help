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
  'approvals.payments.tabs.to_pay',
  'approvals.payments.tabs.files',
  'approvals.payments.subtitle',
  'approvals.payments.proposal_note',
  'approvals.payments.group_lines',
  'approvals.payments.group_total',
  'approvals.payments.select_all',
  'approvals.payments.selected',
  'approvals.payments.col_due',
  'approvals.payments.col_execution',
  'approvals.payments.col_reference',
  'approvals.payments.blocked_title',
  'approvals.payments.blocked_hint',
  'approvals.payments.reason_payee_first_seen',
  'approvals.payments.open_partner',
  'approvals.payments.open_invoice',
  'approvals.payments.workflow.create_one',
  'approvals.payments.workflow.intro',
  'approvals.payments.workflow.file_n',
  'approvals.payments.workflow.step_account',
  'approvals.payments.workflow.step_format',
  'approvals.payments.workflow.summary',
  'approvals.payments.workflow.step_review',
  'approvals.payments.workflow.step_date',
  'approvals.payments.workflow.date_due',
  'approvals.payments.workflow.date_asap',
  'approvals.payments.workflow.date_due_hint',
  'approvals.payments.workflow.one_file_per_account',
  'approvals.payments.workflow.cancel',
  'approvals.payments.format_xlsx',
  'approvals.payments.format_pain001',
  'approvals.payments.format_payord',
  'approvals.payments.bank_hint_documented',
  'approvals.payments.files.back',
  'approvals.payments.files.detail_title',
  'approvals.payments.files.detail_meta',
  'approvals.payments.files.detail_counts',
  'approvals.payments.files.download_again',
  'approvals.payments.files.release_file',
  'approvals.payments.files.line_reference',
  'approvals.payments.files.line_execution',
  'approvals.payments.files.line_transaction',
  'approvals.payments.files.release_line',
  'approvals.payments.files.state_partially_paid',
  'approvals.payments.files.line_status_settled',
  'approvals.payments.files.line_status_included',
  'approvals.payments.filters.due',
  'approvals.payments.filters.account',
  'approvals.payments.filters.account_all',
  'approvals.payments.filters.method',
  'approvals.payments.filters.method_all',
  'approvals.payments.filters.company',
  'approvals.payments.filters.company_all',
  'approvals.payments.filters.search',
  'approvals.payments.filters.status_ready',
  'approvals.payments.filters.status_blocked',
  'approvals.payments.filters.status_filed',
  'list_view_filter.bar.dropdown_all',
  'approvals.payments.filters.method_transfer',
  'approvals.payments.filters.method_other',
  'list_view_filter.bar.dropdown_option',
  'date_filter.all_time',
  'approvals.payee_account.status.confirmed',
  'approvals.payee_account.status.first_seen',
  'approvals.payee_account.registry.confirmed_by_person',
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
  /** Plural messages as the app renders them for one file (ICU `=1`). */
  rendered: { title_one: string; generate_one: string }
  company: string
  /** The paying account's name (entity_bank_accounts.name). */
  accountName: string
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
    alt: { flow: string; page: string; dialog: string; file: string }
  }
}

// Shared by every locale: the file number the diagram and the file page show.
export const FILE_SEQ = 3

/** Payment file #3 on its page: made by Anna Berg, its first line paid. */
export const PAYMENT_FILE = {
  generatedAt: '2026-09-22T09:30:00Z',
  generatedBy: 'Anna Berg',
  format: 'pain001',
  transactionId: 'HT-TXN-2026-0412',
  transactionDate: '2026-09-23',
} as const

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
    'approvals.payments.tabs.to_pay': 'To pay',
    'approvals.payments.tabs.files': 'Payment files',
    'approvals.payments.subtitle': 'Approved, unpaid supplier invoices, grouped by the account that pays them. {count} lines, {blocked} cannot go in yet.',
    'approvals.payments.proposal_note': 'A payment file is a proposal. You import it into your own netbank and sign it there. Money never moves through AI Finance Team. An invoice counts as paid only when the bank transaction arrives and is matched.',
    'approvals.payments.group_lines': '{count} lines',
    'approvals.payments.group_total': 'Total {amount}',
    'approvals.payments.select_all': 'Select all in this group',
    'approvals.payments.selected': '{count} selected',
    'approvals.payments.col_due': 'Due',
    'approvals.payments.col_execution': 'Execution',
    'approvals.payments.col_reference': 'Reference',
    'approvals.payments.blocked_title': 'Cannot be included yet',
    'approvals.payments.blocked_hint': 'These lines need a decision before they can go in a file.',
    'approvals.payments.reason_payee_first_seen': 'First time this supplier\'s account is seen. Confirm it on the partner page.',
    'approvals.payments.open_partner': 'Open partner',
    'approvals.payments.open_invoice': 'Open invoice',
    'approvals.payments.workflow.create_one': 'Create payment file',
    'approvals.payments.workflow.intro': 'Check the paying account, the lines and their payment references, then choose the format and the date. One file is made per paying account.',
    'approvals.payments.workflow.file_n': 'File {n}',
    'approvals.payments.workflow.step_account': 'Pay from',
    'approvals.payments.workflow.step_format': 'Format',
    'approvals.payments.workflow.summary': 'In this file',
    'approvals.payments.workflow.step_review': 'Lines and payment references',
    'approvals.payments.workflow.step_date': 'Execution date',
    'approvals.payments.workflow.date_due': 'On the due date (recommended)',
    'approvals.payments.workflow.date_asap': 'As soon as possible',
    'approvals.payments.workflow.date_due_hint': 'Each transfer is requested for its due date, or the next banking day if that has passed, so nothing is paid early.',
    'approvals.payments.workflow.one_file_per_account': 'Your bank signs each paying account separately, so AI Finance Team makes one file per paying account and currency.',
    'approvals.payments.workflow.cancel': 'Cancel',
    'approvals.payments.format_xlsx': 'Spreadsheet (XLSX), any bank',
    'approvals.payments.format_pain001': 'Bank file (pain.001 XML)',
    'approvals.payments.format_payord': 'Electra file (.HUF)',
    'approvals.payments.bank_hint_documented': '{bank}: pain.001 import documented by the bank, not yet tested with a real file.',
    'approvals.payments.files.back': 'Payment files',
    'approvals.payments.files.detail_title': 'Payment file #{seq}',
    'approvals.payments.files.detail_meta': '{when} by {who} · {account} · {format}',
    'approvals.payments.files.detail_counts': '{settled} paid, {included} waiting, {released} released',
    'approvals.payments.files.download_again': 'Download again',
    'approvals.payments.files.release_file': 'Release file',
    'approvals.payments.files.line_reference': 'Reference',
    'approvals.payments.files.line_execution': 'Execution',
    'approvals.payments.files.line_transaction': 'Bank transaction {id}',
    'approvals.payments.files.release_line': 'Release',
    'approvals.payments.files.state_partially_paid': 'Partially paid',
    'approvals.payments.files.line_status_settled': 'Paid',
    'approvals.payments.files.line_status_included': 'Waiting',
    'approvals.payments.filters.due': 'Due',
    'approvals.payments.filters.account': 'Paying account',
    'approvals.payments.filters.account_all': 'All accounts',
    'approvals.payments.filters.method': 'Payment method',
    'approvals.payments.filters.method_all': 'All methods',
    'approvals.payments.filters.company': 'Company',
    'approvals.payments.filters.company_all': 'All companies',
    'approvals.payments.filters.search': 'Search payee, invoice number, reference',
    'approvals.payments.filters.status_ready': 'Ready',
    'approvals.payments.filters.status_blocked': 'Cannot be included yet',
    'approvals.payments.filters.status_filed': 'In a file',
    'list_view_filter.bar.dropdown_all': '{label}: {allLabel}',
    'approvals.payments.filters.method_transfer': 'Bank transfer or not stated',
    'approvals.payments.filters.method_other': 'Not paid by transfer',
    'list_view_filter.bar.dropdown_option': '{label}: {value}',
    'date_filter.all_time': 'All time',
    'approvals.payee_account.status.confirmed': 'Confirmed',
    'approvals.payee_account.status.first_seen': 'First time seen',
    'approvals.payee_account.registry.confirmed_by_person': 'Confirmed by {name}.',
    'approvals.payments.filed_badge': 'In file #{seq}',
    'approvals.payments.release': 'Release',
    'matching.detail.matched_from_payment_file': 'Matched from payment file #{seq}',
    'invoices.labels.approved': 'Approved',
    'invoices.matching.status_paid': 'Paid',
  },
  rendered: { title_one: 'Create payment file', generate_one: 'Generate and download' },
  company: 'Halvorn Trading Ltd.',
  accountName: 'MBH',
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
        'The To pay tab of the Payment file page: the filter bar, one group for the MBH account of Halvorn Trading Ltd. with three invoices, two of them ticked, and its Create payment file button. Below, the group Cannot be included yet holds one invoice whose supplier account is seen for the first time. Numbered markers point to the parts described in the list below.',
      dialog:
        'The Create payment file window for the two ticked invoices: Pay from the MBH account with its full number, the Format with the bank file preselected, the two lines with their payment references, the Execution date, and the Generate and download button. Numbered markers point to the parts described in the list below.',
      file:
        'The page of payment file #3: Partially paid, one of three lines paid. The paid line links to the bank transaction that proves it; the two waiting lines each have a Release link. Download again and Release file are at the top. Numbered markers point to the parts described in the list below.',
    },
  },
}

// ── Hungarian ───────────────────────────────────────────────────────────────

const hu: Copy = {
  ui: {
    'approvals.payments.title': 'Utalási fájl',
    'approvals.payments.tabs.to_pay': 'Fizetendő',
    'approvals.payments.tabs.files': 'Utalási fájlok',
    'approvals.payments.subtitle': 'Jóváhagyott, még kifizetetlen szállítói számlák, a fizető számla szerint csoportosítva. {count} tétel, {blocked} még nem kerülhet be.',
    'approvals.payments.proposal_note': 'Az utalási fájl javaslat. A saját netbankodba importálod, és ott írod alá. Az AI Finance Teamen keresztül nem mozog pénz. Egy számla akkor számít kifizetettnek, amikor a banki tranzakció megérkezik és párosítjuk.',
    'approvals.payments.group_lines': '{count} tétel',
    'approvals.payments.group_total': 'Összesen {amount}',
    'approvals.payments.select_all': 'Összes kijelölése ebben a csoportban',
    'approvals.payments.selected': '{count} kijelölve',
    'approvals.payments.col_due': 'Határidő',
    'approvals.payments.col_execution': 'Terhelés',
    'approvals.payments.col_reference': 'Közlemény',
    'approvals.payments.blocked_title': 'Még nem kerülhet be',
    'approvals.payments.blocked_hint': 'Ezekhez a tételekhez döntés kell, mielőtt fájlba kerülhetnek.',
    'approvals.payments.reason_payee_first_seen': 'Ez a szállító számlaszáma először látszik. Erősítsd meg a partner oldalán.',
    'approvals.payments.open_partner': 'Partner megnyitása',
    'approvals.payments.open_invoice': 'Számla megnyitása',
    'approvals.payments.workflow.create_one': 'Utalási fájl készítése',
    'approvals.payments.workflow.intro': 'Ellenőrizd a fizető számlát, a tételeket és a közleményeiket, majd válaszd ki a formátumot és a dátumot. Fizető számlánként egy fájl készül.',
    'approvals.payments.workflow.file_n': '{n}. fájl',
    'approvals.payments.workflow.step_account': 'Fizető számla',
    'approvals.payments.workflow.step_format': 'Formátum',
    'approvals.payments.workflow.summary': 'Ebben a fájlban',
    'approvals.payments.workflow.step_review': 'Tételek és közlemények',
    'approvals.payments.workflow.step_date': 'Terhelés napja',
    'approvals.payments.workflow.date_due': 'A határidő napján (javasolt)',
    'approvals.payments.workflow.date_asap': 'A lehető leghamarabb',
    'approvals.payments.workflow.date_due_hint': 'Minden utalás a határidő napjára szól, vagy a következő banki napra, ha az már elmúlt, így semmi nem fizetődik ki korábban.',
    'approvals.payments.workflow.one_file_per_account': 'A bank minden fizető számlát külön ír alá, ezért az AI Finance Team fizető számlánként és devizánként egy fájlt készít.',
    'approvals.payments.workflow.cancel': 'Mégse',
    'approvals.payments.format_xlsx': 'Táblázat (XLSX), bármelyik bankhoz',
    'approvals.payments.format_pain001': 'Banki fájl (pain.001 XML)',
    'approvals.payments.format_payord': 'Electra fájl (.HUF)',
    'approvals.payments.bank_hint_documented': '{bank}: a pain.001 importot a bank dokumentálja, valódi fájllal még nem teszteltük.',
    'approvals.payments.files.back': 'Utalási fájlok',
    'approvals.payments.files.detail_title': '#{seq} utalási fájl',
    'approvals.payments.files.detail_meta': '{when}, {who} · {account} · {format}',
    'approvals.payments.files.detail_counts': '{settled} kifizetve, {included} várakozik, {released} visszavonva',
    'approvals.payments.files.download_again': 'Újra letöltés',
    'approvals.payments.files.release_file': 'Fájl visszavonása',
    'approvals.payments.files.line_reference': 'Közlemény',
    'approvals.payments.files.line_execution': 'Terhelés',
    'approvals.payments.files.line_transaction': 'Banki tranzakció: {id}',
    'approvals.payments.files.release_line': 'Visszavonás',
    'approvals.payments.files.state_partially_paid': 'Részben kifizetve',
    'approvals.payments.files.line_status_settled': 'Kifizetve',
    'approvals.payments.files.line_status_included': 'Várakozik',
    'approvals.payments.filters.due': 'Határidő',
    'approvals.payments.filters.account': 'Fizető számla',
    'approvals.payments.filters.account_all': 'Minden számla',
    'approvals.payments.filters.method': 'Fizetési mód',
    'approvals.payments.filters.method_all': 'Minden mód',
    'approvals.payments.filters.company': 'Cég',
    'approvals.payments.filters.company_all': 'Minden cég',
    'approvals.payments.filters.search': 'Keresés: kedvezményezett, számlaszám, közlemény',
    'approvals.payments.filters.status_ready': 'Fizethető',
    'approvals.payments.filters.status_blocked': 'Még nem kerülhet be',
    'approvals.payments.filters.status_filed': 'Fájlban',
    'list_view_filter.bar.dropdown_all': '{label}: {allLabel}',
    'approvals.payments.filters.method_transfer': 'Átutalás vagy nincs megadva',
    'approvals.payments.filters.method_other': 'Nem átutalásos',
    'list_view_filter.bar.dropdown_option': '{label}: {value}',
    'date_filter.all_time': 'Teljes időszak',
    'approvals.payee_account.status.confirmed': 'Megerősítve',
    'approvals.payee_account.status.first_seen': 'Először látott',
    'approvals.payee_account.registry.confirmed_by_person': 'Megerősítette: {name}.',
    'approvals.payments.filed_badge': '#{seq} fájlban',
    'approvals.payments.release': 'Visszavonás',
    'matching.detail.matched_from_payment_file': 'Párosítva a(z) #{seq} utalási fájl alapján',
    'invoices.labels.approved': 'Jóváhagyva',
    'invoices.matching.status_paid': 'Fizetve',
  },
  rendered: { title_one: 'Utalási fájl készítése', generate_one: 'Elkészítés és letöltés' },
  company: 'Halvorn Trading Ltd.',
  accountName: 'MBH',
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
        'Az Utalási fájl oldal Fizetendő füle: a szűrősáv, a Halvorn Trading Ltd. MBH számlájának csoportja három számlával, kettő kijelölve, és a csoport Utalási fájl készítése gombja. Alatta a Még nem kerülhet be csoportban egy számla, amelynek szállítói számlája először szerepel. A számozott jelölők a lenti lista elemeire mutatnak.',
      dialog:
        'Az Utalási fájl készítése ablak a két kijelölt számlával: a fizető számla (MBH) a teljes számlaszámmal, a formátum, amelyben a banki fájl van előre kiválasztva, a két tétel a közleményével, a teljesítés dátuma és az Elkészítés és letöltés gomb. A számozott jelölők a lenti lista elemeire mutatnak.',
      file:
        'A 3. utalási fájl oldala: Részben kifizetve, három tételből egy kifizetve. A kifizetett tétel a bizonyító banki tranzakcióra mutat; a két várakozó tételnél Visszavonás link van. Felül az Újra letöltés és a Fájl visszavonása gomb. A számozott jelölők a lenti lista elemeire mutatnak.',
    },
  },
}

// ── German ──────────────────────────────────────────────────────────────────

const de: Copy = {
  ui: {
    'approvals.payments.title': 'Zahlungsdatei',
    'approvals.payments.tabs.to_pay': 'Zu zahlen',
    'approvals.payments.tabs.files': 'Zahlungsdateien',
    'approvals.payments.subtitle': 'Freigegebene, noch unbezahlte Lieferantenrechnungen, gruppiert nach dem zahlenden Konto. {count} Positionen, {blocked} können noch nicht aufgenommen werden.',
    'approvals.payments.proposal_note': 'Eine Zahlungsdatei ist ein Vorschlag. Sie importieren sie in Ihr eigenes Onlinebanking und signieren sie dort. Über AI Finance Team fließt nie Geld. Eine Rechnung gilt erst als bezahlt, wenn der Bankumsatz eintrifft und zugeordnet ist.',
    'approvals.payments.group_lines': '{count} Positionen',
    'approvals.payments.group_total': 'Summe {amount}',
    'approvals.payments.select_all': 'Alle in dieser Gruppe auswählen',
    'approvals.payments.selected': '{count} ausgewählt',
    'approvals.payments.col_due': 'Fällig',
    'approvals.payments.col_execution': 'Ausführung',
    'approvals.payments.col_reference': 'Verwendungszweck',
    'approvals.payments.blocked_title': 'Noch nicht aufnehmbar',
    'approvals.payments.blocked_hint': 'Diese Positionen brauchen eine Entscheidung, bevor sie in eine Datei können.',
    'approvals.payments.reason_payee_first_seen': 'Das Konto dieses Lieferanten wird zum ersten Mal gesehen. Bestätigen Sie es auf der Partnerseite.',
    'approvals.payments.open_partner': 'Partner öffnen',
    'approvals.payments.open_invoice': 'Rechnung öffnen',
    'approvals.payments.workflow.create_one': 'Zahlungsdatei erstellen',
    'approvals.payments.workflow.intro': 'Prüfen Sie das Zahlungskonto, die Positionen und ihren Verwendungszweck, und wählen Sie dann Format und Datum. Je Zahlungskonto entsteht eine Datei.',
    'approvals.payments.workflow.file_n': 'Datei {n}',
    'approvals.payments.workflow.step_account': 'Zahlen von',
    'approvals.payments.workflow.step_format': 'Format',
    'approvals.payments.workflow.summary': 'In dieser Datei',
    'approvals.payments.workflow.step_review': 'Positionen und Verwendungszwecke',
    'approvals.payments.workflow.step_date': 'Ausführungsdatum',
    'approvals.payments.workflow.date_due': 'Am Fälligkeitstag (empfohlen)',
    'approvals.payments.workflow.date_asap': 'So bald wie möglich',
    'approvals.payments.workflow.date_due_hint': 'Jede Überweisung wird zum Fälligkeitstag angefordert, oder zum nächsten Bankarbeitstag, wenn dieser vorbei ist; so wird nichts zu früh bezahlt.',
    'approvals.payments.workflow.one_file_per_account': 'Ihre Bank signiert jedes Zahlungskonto einzeln, daher erstellt AI Finance Team je Zahlungskonto und Währung eine Datei.',
    'approvals.payments.workflow.cancel': 'Abbrechen',
    'approvals.payments.format_xlsx': 'Tabelle (XLSX), für jede Bank',
    'approvals.payments.format_pain001': 'Bankdatei (pain.001 XML)',
    'approvals.payments.format_payord': 'Electra-Datei (.HUF)',
    'approvals.payments.bank_hint_documented': '{bank}: pain.001-Import von der Bank dokumentiert, noch nicht mit einer echten Datei getestet.',
    'approvals.payments.files.back': 'Zahlungsdateien',
    'approvals.payments.files.detail_title': 'Zahlungsdatei #{seq}',
    'approvals.payments.files.detail_meta': '{when} von {who} · {account} · {format}',
    'approvals.payments.files.detail_counts': '{settled} bezahlt, {included} wartend, {released} zurückgenommen',
    'approvals.payments.files.download_again': 'Erneut herunterladen',
    'approvals.payments.files.release_file': 'Datei zurücknehmen',
    'approvals.payments.files.line_reference': 'Verwendungszweck',
    'approvals.payments.files.line_execution': 'Ausführung',
    'approvals.payments.files.line_transaction': 'Banktransaktion {id}',
    'approvals.payments.files.release_line': 'Zurücknehmen',
    'approvals.payments.files.state_partially_paid': 'Teilweise bezahlt',
    'approvals.payments.files.line_status_settled': 'Bezahlt',
    'approvals.payments.files.line_status_included': 'Wartet',
    'approvals.payments.filters.due': 'Fällig',
    'approvals.payments.filters.account': 'Zahlungskonto',
    'approvals.payments.filters.account_all': 'Alle Konten',
    'approvals.payments.filters.method': 'Zahlungsart',
    'approvals.payments.filters.method_all': 'Alle Zahlungsarten',
    'approvals.payments.filters.company': 'Unternehmen',
    'approvals.payments.filters.company_all': 'Alle Unternehmen',
    'approvals.payments.filters.search': 'Suche: Empfänger, Rechnungsnummer, Verwendungszweck',
    'approvals.payments.filters.status_ready': 'Bereit',
    'approvals.payments.filters.status_blocked': 'Noch nicht aufnehmbar',
    'approvals.payments.filters.status_filed': 'In einer Datei',
    'list_view_filter.bar.dropdown_all': '{label}: {allLabel}',
    'approvals.payments.filters.method_transfer': 'Überweisung oder nicht angegeben',
    'approvals.payments.filters.method_other': 'Nicht per Überweisung',
    'list_view_filter.bar.dropdown_option': '{label}: {value}',
    'date_filter.all_time': 'Gesamter Zeitraum',
    'approvals.payee_account.status.confirmed': 'Bestätigt',
    'approvals.payee_account.status.first_seen': 'Zum ersten Mal gesehen',
    'approvals.payee_account.registry.confirmed_by_person': 'Bestätigt von {name}.',
    'approvals.payments.filed_badge': 'In Datei #{seq}',
    'approvals.payments.release': 'Zurücknehmen',
    'matching.detail.matched_from_payment_file': 'Zugeordnet aus Zahlungsdatei #{seq}',
    'invoices.labels.approved': 'Freigegeben',
    'invoices.matching.status_paid': 'Bezahlt',
  },
  rendered: { title_one: 'Zahlungsdatei erstellen', generate_one: 'Erstellen und herunterladen' },
  company: 'Halvorn Trading Ltd.',
  accountName: 'MBH',
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
        'Der Reiter Zu zahlen der Seite Zahlungsdatei: die Filterleiste, eine Gruppe für das MBH-Konto der Halvorn Trading Ltd. mit drei Rechnungen, zwei davon ausgewählt, und ihre Schaltfläche Zahlungsdatei erstellen. Darunter die Gruppe Noch nicht aufnehmbar mit einer Rechnung, deren Lieferantenkonto zum ersten Mal vorkommt. Nummerierte Markierungen zeigen auf die Teile, die die Liste darunter beschreibt.',
      dialog:
        'Das Fenster Zahlungsdatei erstellen für die zwei ausgewählten Rechnungen: das zahlende MBH-Konto mit der vollständigen Kontonummer, das Format mit der vorausgewählten Bankdatei, die zwei Positionen mit ihrem Verwendungszweck, das Ausführungsdatum und die Schaltfläche zum Erstellen und Herunterladen. Nummerierte Markierungen zeigen auf die Teile, die die Liste darunter beschreibt.',
      file:
        'Die Seite der Zahlungsdatei #3: Teilweise bezahlt, eine von drei Positionen bezahlt. Die bezahlte Position verweist auf die Banktransaktion, die sie belegt; die zwei wartenden Positionen haben je einen Link Zurücknehmen. Oben stehen Erneut herunterladen und Datei zurücknehmen. Nummerierte Markierungen zeigen auf die Teile, die die Liste darunter beschreibt.',
    },
  },
}

export const paymentsCopy: Record<Locale, Copy> = { en, hu, de }
