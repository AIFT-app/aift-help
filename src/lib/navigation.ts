import { defaultLocale, type Locale } from './i18n'

/**
 * The help centre's sidebar, grouped by area of the app (PRD
 * help-home-and-navigation). Group names follow the app's own menu, so a
 * reader who is on the Matching page finds the Bank & Matching group.
 *
 * Every article belongs to exactly one group. `audience: 'client'` marks an
 * article written for the client side too (the business whose books these
 * are), shown as a "For clients" pill; it never hides anything from anyone.
 *
 * Keep each entry's slug property on one line, single-quoted, exactly as the
 * entries below spell it: several aift-ops acceptance tests find an article
 * by that literal text.
 */

export type NavItem = {
  title: Record<Locale, string>
  slug: string
  audience?: 'client'
}

export type NavGroup = {
  /** English, used in the group page URL: /topics/<id>. Never rename one. */
  id: string
  title: Record<Locale, string>
  description: Record<Locale, string>
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    id: 'getting-started',
    title: { en: 'Getting Started', hu: 'Első lépések', de: 'Erste Schritte' },
    description: {
      en: 'Workspaces, people and roles, language, and where your data goes.',
      hu: 'Munkaterületek, felhasználók és szerepek, nyelv, és hogy hová kerülnek az adatok.',
      de: 'Arbeitsbereiche, Personen und Rollen, Sprache und wohin Ihre Daten gehen.',
    },
    items: [
      { slug: 'workspaces', title: { en: 'Workspaces', hu: 'Munkaterületek', de: 'Arbeitsbereiche' } },
      {
        slug: 'roles-and-permissions',
        title: { en: 'Roles & Permissions', hu: 'Szerepek és jogosultságok', de: 'Rollen & Berechtigungen' },
      },
      { slug: 'language', title: { en: 'Changing Your Language', hu: 'Nyelv módosítása', de: 'Sprache ändern' } },
      {
        slug: 'ai-and-data',
        title: { en: 'Where Your Data Goes', hu: 'Hová kerülnek az adatai', de: 'Wohin Ihre Daten gehen' },
        audience: 'client',
      },
    ],
  },
  {
    id: 'invoices-and-documents',
    title: { en: 'Invoices & Documents', hu: 'Számlák és dokumentumok', de: 'Rechnungen & Dokumente' },
    description: {
      en: 'How invoices, receipts and contracts arrive, and how to check them.',
      hu: 'Hogyan érkeznek a számlák, bizonylatok és szerződések, és hogyan ellenőrizheti őket.',
      de: 'Wie Rechnungen, Belege und Verträge ankommen und wie Sie sie prüfen.',
    },
    items: [
      { slug: 'invoices', title: { en: 'Working with Invoices', hu: 'Számlák kezelése', de: 'Arbeiten mit Rechnungen' } },
      {
        slug: 'uploading-files',
        title: { en: 'Uploading Files', hu: 'Fájlok feltöltése', de: 'Dateien hochladen' },
        audience: 'client',
      },
      {
        slug: 'email-forwarding',
        title: { en: 'Forwarding Documents by Email', hu: 'Dokumentumok továbbítása e-mailben', de: 'Dokumente per E-Mail weiterleiten' },
        audience: 'client',
      },
      {
        slug: 'nav-online-szamla',
        title: { en: 'NAV Online Számla (Hungary)', hu: 'NAV Online Számla (Magyarország)', de: 'NAV Online Számla (Ungarn)' },
      },
      // Invoice attachments (invoice-attachments): supporting documents on an invoice.
      // The app's tab is "Attachments" / "Mellékletek" / "Anhänge"; the Documents page
      // filter is "Unlinked attachments" / "Nem kapcsolt mellékletek" / "Nicht verknüpfte Anhänge".
      {
        slug: 'invoice-attachments',
        title: { en: 'Invoice Attachments', hu: 'Számlamellékletek', de: 'Rechnungsanhänge' },
        audience: 'client',
      },
      { slug: 'documents', title: { en: 'Documents', hu: 'Dokumentumok', de: 'Dokumente' } },
      // The sidebar entry lagged the article and the app: both already say Missing
      // receipts / Hiányzó bizonylatok (nav.workspace.documents_needed).
      {
        slug: 'documents-needed',
        title: { en: 'Missing Receipts', hu: 'Hiányzó bizonylatok', de: 'Fehlende Belege' },
        audience: 'client',
      },
      {
        slug: 'currency-exchange',
        title: { en: 'Multi-Currency & Exchange Rates', hu: 'Több pénznem és árfolyamok', de: 'Mehrwährung & Wechselkurse' },
      },
    ],
  },
  {
    id: 'bank-and-matching',
    title: { en: 'Bank & Matching', hu: 'Bank és párosítás', de: 'Bank & Zuordnung' },
    description: {
      en: 'Bank connections and statements, and linking each payment to its invoice.',
      hu: 'Bankkapcsolatok és kivonatok, és minden fizetés összekötése a számlájával.',
      de: 'Bankverbindungen und Kontoauszüge, und wie jede Zahlung ihrer Rechnung zugeordnet wird.',
    },
    items: [
      {
        slug: 'bank-accounts',
        title: { en: 'Connecting Bank Accounts', hu: 'Bankszámlák csatlakoztatása', de: 'Bankkonten verbinden' },
        audience: 'client',
      },
      {
        slug: 'bank-statement-upload',
        title: { en: 'Uploading Bank Statements', hu: 'Bankszámlakivonatok feltöltése', de: 'Kontoauszüge hochladen' },
      },
      {
        slug: 'bank-transactions',
        title: { en: 'Bank Transactions', hu: 'Banki tranzakciók', de: 'Banktransaktionen' },
      },
      {
        slug: 'transaction-types',
        title: { en: 'Transaction Types & No Invoice Needed', hu: 'Tranzakciótípusok és „nem kell számla”', de: 'Transaktionstypen & „Keine Rechnung nötig“' },
      },
      {
        slug: 'cash-pool',
        title: {
          en: 'Cash Pool: One Bank Account for Several Companies',
          hu: 'Cash pool: egy bankszámla több cégnek',
          de: 'Cash-Pool: Ein Bankkonto für mehrere Unternehmen',
        },
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
        slug: 'fixed-payment-method',
        title: {
          en: "Fixing a Partner's Payment Method",
          hu: 'A partner fizetési módjának rögzítése',
          de: 'Die Zahlungsart eines Partners festlegen',
        },
      },
    ],
  },
  {
    id: 'approvals-and-payment',
    title: { en: 'Approvals & Payment', hu: 'Jóváhagyás és kifizetés', de: 'Freigaben & Zahlung' },
    description: {
      en: 'Who approves supplier invoices, and how approved invoices get paid.',
      hu: 'Ki hagyja jóvá a szállítói számlákat, és hogyan fizetik ki a jóváhagyottakat.',
      de: 'Wer Lieferantenrechnungen freigibt und wie freigegebene Rechnungen bezahlt werden.',
    },
    items: [
      // Payment approvals (invoice-payment-approval): the approver's article, then
      // the firm-side setup article. The app's sidebar item is "Approvals" /
      // "Jóváhagyások" / "Freigaben" (nav.workspace.approvals).
      {
        slug: 'approving-invoices',
        title: { en: 'Approving Invoices for Payment', hu: 'Számlák jóváhagyása kifizetésre', de: 'Rechnungen zur Zahlung freigeben' },
        audience: 'client',
      },
      {
        slug: 'setting-up-approvals',
        title: { en: 'Setting Up Payment Approvals', hu: 'A kifizetések jóváhagyásának beállítása', de: 'Zahlungsfreigaben einrichten' },
      },
      // Filing and bookkeeping approval (invoice-stage-approvals): the two
      // checkpoints BEFORE payment approval. Both are per-workspace settings
      // that are off by default.
      {
        slug: 'filing-and-bookkeeping-approval',
        title: {
          en: 'Filing and Bookkeeping Approval',
          hu: 'Iktatási és könyvelési jóváhagyás',
          de: 'Erfassungs- und Buchungsfreigabe',
        },
      },
      // Payment file (payment-file-list): the finance admin's article. The app's
      // tab is "Payment file" / "Utalási fájl" / "Zahlungsdatei" (approvals.tabs.payments).
      {
        slug: 'paying-approved-invoices',
        title: { en: 'Paying Approved Invoices', hu: 'Jóváhagyott számlák kifizetése', de: 'Freigegebene Rechnungen bezahlen' },
        audience: 'client',
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
    ],
  },
  {
    id: 'categories',
    title: { en: 'Categories', hu: 'Kategóriák', de: 'Kategorien' },
    description: {
      en: 'How the AI categorises, how it learns from corrections, and your own category lists.',
      hu: 'Hogyan kategorizál az AI, hogyan tanul a javításokból, és a saját kategórialisták.',
      de: 'Wie die KI kategorisiert, wie sie aus Korrekturen lernt, und Ihre eigenen Kategorielisten.',
    },
    items: [
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
    ],
  },
  {
    id: 'vat',
    title: { en: 'VAT', hu: 'ÁFA', de: 'Umsatzsteuer' },
    description: {
      en: 'VAT tables, codes on invoices, VAT groups, the small business exemption and exports.',
      hu: 'ÁFA-táblák, ÁFA-kódok a számlákon, áfacsoportok, alanyi adómentesség és exportok.',
      de: 'USt-Tabellen, Codes auf Rechnungen, USt-Gruppen, Kleinunternehmerregelung und Exporte.',
    },
    items: [
      {
        slug: 'vat-master-data',
        title: { en: 'VAT Master Data', hu: 'ÁFA-törzsadatok', de: 'USt-Stammdaten' },
      },
      {
        slug: 'vat-codes-on-invoices',
        title: { en: 'VAT Codes on Invoices', hu: 'ÁFA-kódok a számlákon', de: 'USt-Codes auf Rechnungen' },
      },
      // VAT groups (nav-vat-group-master-data, vat-group-routing-by-name): the app's page is
      // "VAT groups" / "Áfacsoportok" / "USt-Gruppen" (nav.master_data.vat_groups).
      {
        slug: 'vat-groups',
        title: { en: 'VAT Groups', hu: 'Áfacsoportok', de: 'USt-Gruppen' },
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
      // The app deep-links here from LedgerExportButton: never rename this slug.
      {
        slug: 'vat-in-exports',
        title: { en: 'VAT in Exports', hu: 'ÁFA az exportokban', de: 'USt in Exporten' },
      },
    ],
  },
  {
    id: 'master-data',
    title: { en: 'Master Data', hu: 'Törzsadatok', de: 'Stammdaten' },
    description: {
      en: 'Your companies, their partners, and bulk import from a spreadsheet.',
      hu: 'A cégek, a partnereik, és tömeges importálás táblázatból.',
      de: 'Ihre Unternehmen, deren Partner und der Massenimport aus einer Tabelle.',
    },
    items: [
      { slug: 'master-data-entities', title: { en: 'Managing Companies', hu: 'Cégek kezelése', de: 'Unternehmen verwalten' } },
      { slug: 'partners', title: { en: 'Managing Partners', hu: 'Partnerek kezelése', de: 'Partner verwalten' } },
      {
        slug: 'master-data-import',
        title: { en: 'Importing Master Data', hu: 'Törzsadatok importálása', de: 'Stammdaten importieren' },
      },
    ],
  },
  {
    id: 'reports-and-exports',
    title: { en: 'Reports & Exports', hu: 'Jelentések és exportok', de: 'Berichte & Exporte' },
    description: {
      en: 'Reports, the Ledger, Business Central, and AI assistants that read your books.',
      hu: 'Jelentések, a Főkönyv, a Business Central, és a könyveket olvasó AI-asszisztensek.',
      de: 'Berichte, das Hauptbuch, Business Central und KI-Assistenten, die Ihre Bücher lesen.',
    },
    items: [
      // "Riportok" is the help centre's term. The app's own sidebar says "Jelentések"
      // (nav.workspace.reports); the article quotes that label verbatim where it
      // tells the reader which menu item to click.
      { slug: 'reports', title: { en: 'Reports', hu: 'Jelentések', de: 'Berichte' } },
      { slug: 'ledger', title: { en: 'Ledger', hu: 'Főkönyv', de: 'Hauptbuch' } },
      {
        slug: 'business-central',
        title: {
          en: 'Business Central',
          hu: 'Business Central',
          de: 'Business Central',
        },
      },
      { slug: 'mcp', title: { en: 'AI Assistants (MCP)', hu: 'AI-asszisztensek (MCP)', de: 'KI-Assistenten (MCP)' } },
    ],
  },
  {
    id: 'working-faster',
    title: { en: 'Working Faster', hu: 'Gyorsabb munka', de: 'Schneller arbeiten' },
    description: {
      en: 'The focused period, date shortcuts, the spreadsheet interface, and messages.',
      hu: 'A fókuszált időszak, a gyors dátumbevitel, a táblázatos felület és az üzenetek.',
      de: 'Der fokussierte Zeitraum, Datumskürzel, die Tabellenoberfläche und Nachrichten.',
    },
    items: [
      // Focus mode (focus-mode): the accountant-only working period. The article
      // title IS the app's switch label, "Focused period" / "Fókuszált időszak" /
      // "Fokussierter Zeitraum" (focus.open_label); status rows quote
      // focus.status.* verbatim.
      {
        slug: 'focused-period',
        title: { en: 'Focused Period', hu: 'Fókuszált időszak', de: 'Fokussierter Zeitraum' },
      },
      // Keyboard date entry (keyboard-date-entry): the compact digit forms and the
      // `..` range shorthand. The in-app hint is "Date formats" / "Dátumformátumok"
      // / "Datumsformate" (date_filter.formats_help); every example in the article
      // is executed against aift-web's real parseDateInput/parseDateRangeInput.
      {
        slug: 'date-entry',
        title: { en: 'Fast Date Entry', hu: 'Gyors dátumbevitel', de: 'Schnelle Datumseingabe' },
      },
      // The shared spreadsheet-style grid (SelectionGrid) behind four screens: the
      // import review step, Verify all partners, Bulk archive and a report line's
      // Choose categories. Naming rule (Balázs 2026-09-23): "spreadsheet interface" /
      // "táblázatos felület"; name Excel only for copy and paste.
      {
        slug: 'spreadsheet-interface',
        title: { en: 'Working in the Spreadsheet Interface', hu: 'Munka a táblázatos felületen', de: 'Arbeiten in der Tabellenoberfläche' },
      },
      {
        slug: 'messages',
        title: { en: 'Messages', hu: 'Üzenetek', de: 'Nachrichten' },
        audience: 'client',
      },
    ],
  },
]

/** Every article in sidebar order (groups in order, articles within them). */
export const navigation: NavItem[] = navGroups.flatMap((group) => group.items)

export function navTitle(item: NavItem, locale: Locale): string {
  return item.title[locale] ?? item.title[defaultLocale]
}

export function groupTitle(group: NavGroup, locale: Locale): string {
  return group.title[locale] ?? group.title[defaultLocale]
}

export function groupDescription(group: NavGroup, locale: Locale): string {
  return group.description[locale] ?? group.description[defaultLocale]
}

/** The group an article belongs to, or undefined for the home page. */
export function groupOf(slug: string): NavGroup | undefined {
  return navGroups.find((group) => group.items.some((item) => item.slug === slug))
}

export function findGroup(id: string): NavGroup | undefined {
  return navGroups.find((group) => group.id === id)
}

/** A group's landing page, without a locale prefix: /topics/<id>. */
export function groupHref(group: NavGroup): string {
  return `/topics/${group.id}`
}

/** The articles before and after `slug` in sidebar order, across groups. */
export function neighbours(slug: string): { prev?: NavItem; next?: NavItem } {
  const index = navigation.findIndex((item) => item.slug === slug)
  if (index === -1) return {}
  return { prev: navigation[index - 1], next: navigation[index + 1] }
}
