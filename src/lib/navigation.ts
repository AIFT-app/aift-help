export type NavItem = {
  title: string
  slug: string
}

export const navigation: NavItem[] = [
  { title: 'Home', slug: '' },
  { title: 'Roles & Permissions', slug: 'roles-and-permissions' },
  { title: 'Workspaces', slug: 'workspaces' },
  { title: 'Working with Invoices', slug: 'invoices' },
  { title: 'Multi-Currency & Exchange Rates', slug: 'currency-exchange' },
  { title: 'Managing Entities', slug: 'master-data-entities' },
  { title: 'Managing Partners', slug: 'partners' },
  { title: 'Connecting Bank Accounts', slug: 'bank-accounts' },
  { title: 'Uploading Bank Statements', slug: 'bank-statement-upload' },
  { title: 'Categorising Invoices & Transactions', slug: 'categorization' },
  { title: 'Reports', slug: 'reports' },
]
