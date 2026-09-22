import { defaultLocale, type Locale } from './i18n'

export type NavItem = {
  title: Record<Locale, string>
  slug: string
}

export const navigation: NavItem[] = [
  { slug: '', title: { en: 'Home', hu: 'Kezdőlap', de: 'Startseite' } },
  {
    slug: 'roles-and-permissions',
    title: { en: 'Roles & Permissions', hu: 'Szerepek és jogosultságok', de: 'Rollen & Berechtigungen' },
  },
  { slug: 'workspaces', title: { en: 'Workspaces', hu: 'Munkaterületek', de: 'Arbeitsbereiche' } },
  { slug: 'invoices', title: { en: 'Working with Invoices', hu: 'Számlák kezelése', de: 'Arbeiten mit Rechnungen' } },
  { slug: 'uploading-files', title: { en: 'Uploading Files', hu: 'Fájlok feltöltése', de: 'Dateien hochladen' } },
  {
    slug: 'email-forwarding',
    title: { en: 'Forwarding Documents by Email', hu: 'Dokumentumok továbbítása e-mailben', de: 'Dokumente per E-Mail weiterleiten' },
  },
  { slug: 'documents', title: { en: 'Documents', hu: 'Dokumentumok', de: 'Dokumente' } },
  // The sidebar entry lagged the article and the app: both already say Missing
  // receipts / Hiányzó bizonylatok (nav.workspace.documents_needed).
  {
    slug: 'documents-needed',
    title: { en: 'Missing Receipts', hu: 'Hiányzó bizonylatok', de: 'Fehlende Belege' },
  },
  {
    slug: 'currency-exchange',
    title: { en: 'Multi-Currency & Exchange Rates', hu: 'Több pénznem és árfolyamok', de: 'Mehrwährung & Wechselkurse' },
  },
  { slug: 'master-data-entities', title: { en: 'Managing Companies', hu: 'Cégek kezelése', de: 'Unternehmen verwalten' } },
  {
    slug: 'nav-online-szamla',
    title: { en: 'NAV Online Számla (Hungary)', hu: 'NAV Online Számla (Magyarország)', de: 'NAV Online Számla (Ungarn)' },
  },
  // VAT groups (nav-vat-group-master-data, vat-group-routing-by-name): the app's page is
  // "VAT groups" / "Áfacsoportok" / "USt-Gruppen" (nav.master_data.vat_groups).
  {
    slug: 'vat-groups',
    title: { en: 'VAT Groups', hu: 'Áfacsoportok', de: 'USt-Gruppen' },
  },
  { slug: 'partners', title: { en: 'Managing Partners', hu: 'Partnerek kezelése', de: 'Partner verwalten' } },
  // Payment approvals (invoice-payment-approval): the approver's article, then
  // the firm-side setup article. The app's sidebar item is "Approvals" /
  // "Jóváhagyások" / "Freigaben" (nav.workspace.approvals).
  {
    slug: 'approving-invoices',
    title: { en: 'Approving Invoices for Payment', hu: 'Számlák jóváhagyása kifizetésre', de: 'Rechnungen zur Zahlung freigeben' },
  },
  {
    slug: 'setting-up-approvals',
    title: { en: 'Setting Up Payment Approvals', hu: 'A kifizetések jóváhagyásának beállítása', de: 'Zahlungsfreigaben einrichten' },
  },
  // Payment file (payment-file-list): the finance admin's article. The app's
  // tab is "Payment file" / "Utalási fájl" / "Zahlungsdatei" (approvals.tabs.payments).
  {
    slug: 'paying-approved-invoices',
    title: { en: 'Paying Approved Invoices', hu: 'Jóváhagyott számlák kifizetése', de: 'Freigegebene Rechnungen bezahlen' },
  },
  // Company register check (partner-registry-validation): evidence on the payee
  // account of a supplier invoice. The app's section is "Company register" /
  // "Cégjegyzék" / "Firmenregister".
  {
    slug: 'company-register-check',
    title: {
      en: 'Checking Suppliers Against the Company Register',
      hu: 'Szállítók ellenőrzése a cégjegyzékben',
      de: 'Lieferanten im Firmenregister prüfen',
    },
  },
  {
    slug: 'fixed-payment-method',
    title: {
      en: "Fixing a Partner's Payment Method",
      hu: 'A partner fizetési módjának rögzítése',
      de: 'Die Zahlungsart eines Partners festlegen',
    },
  },
  {
    slug: 'master-data-import',
    title: { en: 'Importing Master Data', hu: 'Törzsadatok importálása', de: 'Stammdaten importieren' },
  },
  {
    slug: 'bank-accounts',
    title: { en: 'Connecting Bank Accounts', hu: 'Bankszámlák csatlakoztatása', de: 'Bankkonten verbinden' },
  },
  {
    slug: 'cash-pool',
    title: {
      en: 'Cash Pool: One Bank Account for Several Companies',
      hu: 'Cash pool: egy bankszámla több cégnek',
      de: 'Cash-Pool: Ein Bankkonto für mehrere Unternehmen',
    },
  },
  {
    slug: 'bank-statement-upload',
    title: { en: 'Uploading Bank Statements', hu: 'Bankszámlakivonatok feltöltése', de: 'Kontoauszüge hochladen' },
  },
  {
    slug: 'transaction-types',
    title: { en: 'Transaction Types & No Invoice Needed', hu: 'Tranzakciótípusok és „nem kell számla”', de: 'Transaktionstypen & „Keine Rechnung nötig“' },
  },
  { slug: 'invoice-matching', title: { en: 'Invoice Matching', hu: 'Számlák párosítása', de: 'Rechnungsabgleich' } },
  {
    slug: 'settlement',
    title: {
      en: 'Settling Partner Balances',
      hu: 'Folyószámla kiegyenlítése',
      de: 'Partnersalden ausgleichen',
    },
  },
  {
    slug: 'categorization',
    title: { en: 'Categorising Invoices & Transactions', hu: 'Számlák és tranzakciók kategorizálása', de: 'Rechnungen & Transaktionen kategorisieren' },
  },
  {
    slug: 'categorization-examples',
    title: { en: 'How AIFT Learns Your Categories', hu: 'Hogyan tanulja meg az AIFT a kategóriáit', de: 'Wie AIFT Ihre Kategorien lernt' },
  },
  {
    slug: 'custom-categories',
    title: { en: 'Custom Categories', hu: 'Egyéni kategóriák', de: 'Eigene Kategorien' },
  },
  {
    slug: 'vat-master-data',
    title: { en: 'VAT Master Data', hu: 'ÁFA-törzsadatok', de: 'USt-Stammdaten' },
  },
  {
    slug: 'vat-codes-on-invoices',
    title: { en: 'VAT Codes on Invoices', hu: 'ÁFA-kódok a számlákon', de: 'USt-Codes auf Rechnungen' },
  },
  {
    slug: 'vat-in-exports',
    title: { en: 'VAT in Exports', hu: 'ÁFA az exportokban', de: 'USt in Exporten' },
  },
  {
    slug: 'small-business-exemption',
    title: {
      en: 'Small Business VAT Exemption',
      hu: 'Alanyi adómentesség',
      de: 'Kleinunternehmerbefreiung',
    },
  },
  {
    slug: 'vat-setup-import-export',
    title: {
      en: 'Importing, Exporting & Copying Your VAT Setup',
      hu: 'ÁFA-beállítás importálása, exportálása és másolása',
      de: 'USt-Einrichtung importieren, exportieren & kopieren',
    },
  },
  // "Riportok" is the help centre's term. The app's own sidebar says "Jelentések"
  // (nav.workspace.reports) — the article quotes that label verbatim where it
  // tells the reader which menu item to click.
  { slug: 'reports', title: { en: 'Reports', hu: 'Jelentések', de: 'Berichte' } },
  { slug: 'ledger', title: { en: 'Ledger Explorer', hu: 'Főkönyvi kivonat', de: 'Hauptbuch-Explorer' } },
  // Keyboard date entry (keyboard-date-entry): the compact digit forms and the
  // `..` range shorthand. The in-app hint is "Date formats" / "Dátumformátumok"
  // / "Datumsformate" (date_filter.formats_help); every example in the article
  // is executed against aift-web's real parseDateInput/parseDateRangeInput.
  {
    slug: 'date-entry',
    title: { en: 'Fast Date Entry', hu: 'Gyors dátumbevitel', de: 'Schnelle Datumseingabe' },
  },
  // Focus mode (focus-mode): the accountant-only working period. The article
  // title IS the app's switch label, "Focused period" / "Fókuszált időszak" /
  // "Fokussierter Zeitraum" (focus.open_label); status rows quote
  // focus.status.* verbatim.
  {
    slug: 'focused-period',
    title: { en: 'Focused Period', hu: 'Fókuszált időszak', de: 'Fokussierter Zeitraum' },
  },
  { slug: 'messages', title: { en: 'Messages', hu: 'Üzenetek', de: 'Nachrichten' } },
  { slug: 'mcp', title: { en: 'AI Assistants (MCP)', hu: 'AI-asszisztensek (MCP)', de: 'KI-Assistenten (MCP)' } },
  {
    slug: 'business-central',
    title: {
      en: 'Connecting Business Central',
      hu: 'A Business Central összekötése',
      de: 'Business Central verbinden',
    },
  },
  {
    slug: 'ai-and-data',
    title: { en: 'Where Your Data Goes', hu: 'Hová kerülnek az adatai', de: 'Wohin Ihre Daten gehen' },
  },
  { slug: 'language', title: { en: 'Changing Your Language', hu: 'Nyelv módosítása', de: 'Sprache ändern' } },
]

export function navTitle(item: NavItem, locale: Locale): string {
  return item.title[locale] ?? item.title[defaultLocale]
}
