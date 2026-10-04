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

/**
 * A date the way the app's formatDate renders it: `YYYY-MM-DD` in every locale
 * since iso-date-display (2026-09-28). `locale` stays so call sites keep
 * mirroring the app's signature.
 */
export function formatDate(iso: string, locale: Locale): string {
  void locale
  return iso.slice(0, 10)
}

/**
 * A timestamp the way the app's formatDateTime renders it: `YYYY-MM-DD HH:mm`,
 * 24-hour. The app formats in the viewer's timezone; the help pages are
 * rendered at build time, so the illustrations pin the office's timezone to
 * stay the same wherever they build.
 */
export function formatDateTime(iso: string, locale: Locale): string {
  void locale
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: 'Europe/Budapest',
    })
      .formatToParts(new Date(iso))
      .map((p) => [p.type, p.value]),
  )
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`
}

/** aift-web formatPrice: a whole plan price, no decimals ("27 000 Ft", "€75"). */
export function formatPrice(amount: number, currency: string, locale: Locale): string {
  return new Intl.NumberFormat(BCP47[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: 'always',
  } as Intl.NumberFormatOptions).format(amount)
}

/** aift-web formatCount: an integer count with grouping ("1 840"). */
export function formatCount(count: number, locale: Locale): string {
  return new Intl.NumberFormat(BCP47[locale], { maximumFractionDigits: 0, useGrouping: 'always' } as Intl.NumberFormatOptions).format(count)
}
