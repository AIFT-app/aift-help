export type NavItem = {
  title: string
  slug: string
}

export const navigation: NavItem[] = [
  { title: 'Home', slug: '' },
  { title: 'Roles & Permissions', slug: 'roles-and-permissions' },
  { title: 'Workspaces', slug: 'workspaces' },
  { title: 'Working with Invoices', slug: 'invoices' },
  { title: 'Uploading Files', slug: 'uploading-files' },
  { title: 'Forwarding Documents by Email', slug: 'email-forwarding' },
  { title: 'Multi-Currency & Exchange Rates', slug: 'currency-exchange' },
  { title: 'Managing Entities', slug: 'master-data-entities' },
  { title: 'NAV Online Számla (Hungary)', slug: 'nav-online-szamla' },
  { title: 'Managing Partners', slug: 'partners' },
  { title: 'Connecting Bank Accounts', slug: 'bank-accounts' },
  { title: 'Uploading Bank Statements', slug: 'bank-statement-upload' },
  { title: 'Transaction Types & No Invoice Needed', slug: 'transaction-types' },
  { title: 'Invoice Matching', slug: 'invoice-matching' },
  { title: 'Categorising Invoices & Transactions', slug: 'categorization' },
  { title: 'Reports', slug: 'reports' },
  { title: 'Ledger Explorer', slug: 'ledger' },
  { title: 'Messages', slug: 'messages' },
  { title: 'AI Assistants (MCP)', slug: 'mcp' },
  { title: 'Changing Your Language', slug: 'language' },
]
