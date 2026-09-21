// Amount and date formatting for illustrations, mirroring aift-web's
// src/lib/format.ts so a drawn screen shows numbers exactly the way the app
// does: 2 decimals for every currency (HUF included), grouping at every
// magnitude, and the app's locale → BCP-47 mapping (en is en-GB).

import type { Locale } from '@/lib/i18n'

const BCP47: Record<Locale, string> = { en: 'en-GB', hu: 'hu-HU', de: 'de-DE' }

export function formatAmount(amount: number, currency: string, locale: Locale): string {
  return new Intl.NumberFormat(BCP47[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: 'always',
  } as Intl.NumberFormatOptions).format(amount)
}

/** An ISO date (YYYY-MM-DD) the way the app's formatDate renders it. */
export function formatDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(BCP47[locale], {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
