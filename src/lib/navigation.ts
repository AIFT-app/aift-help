export type NavItem = {
  title: string
  slug: string
}

export const navigation: NavItem[] = [
  { title: 'Home', slug: '' },
  { title: 'Roles & Permissions', slug: 'roles-and-permissions' },
  { title: 'Working with Invoices', slug: 'invoices' },
  { title: 'Multi-Currency & Exchange Rates', slug: 'currency-exchange' },
  { title: 'Managing Entities', slug: 'master-data-entities' },
  { title: 'Connecting Bank Accounts', slug: 'bank-accounts' },
  { title: 'Categorising Invoices & Transactions', slug: 'categorization' },
]
