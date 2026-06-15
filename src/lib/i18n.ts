// Localization config for the help center.
//
// English is the default and lives at the root (`/invoices`). Hungarian and
// German live under a locale prefix (`/hu/invoices`, `/de/invoices`). Any
// article without a translation falls back to its English content with a
// notice, so no link ever 404s.

export const locales = ['en', 'hu', 'de'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

// Native names, shown in the language switcher (never translated).
export const localeNames: Record<Locale, string> = {
  en: 'English',
  hu: 'Magyar',
  de: 'Deutsch',
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** The non-default locales (the ones that get a URL prefix). */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale)

/**
 * Split a pathname into its locale and the rest.
 *   "/invoices"      → { locale: 'en', rest: '/invoices' }
 *   "/hu/invoices"   → { locale: 'hu', rest: '/invoices' }
 *   "/hu"            → { locale: 'hu', rest: '/' }
 */
export function splitLocale(pathname: string): { locale: Locale; rest: string } {
  const segments = pathname.replace(/^\/+/, '').split('/')
  const first = segments[0] ?? ''
  if (isLocale(first) && first !== defaultLocale) {
    const rest = '/' + segments.slice(1).join('/')
    return { locale: first, rest: rest === '/' ? '/' : rest.replace(/\/$/, '') }
  }
  return { locale: defaultLocale, rest: pathname === '' ? '/' : pathname }
}

/** Prefix an internal href with a locale (no-op for English). */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/')) return href // external / anchor — leave alone
  if (locale === defaultLocale) return href
  // Avoid double-prefixing.
  const { rest } = splitLocale(href)
  return rest === '/' ? `/${locale}` : `/${locale}${rest}`
}

// Small UI-chrome strings (the article bodies are translated as MDX files;
// these are the surrounding labels).
export const ui: Record<Locale, Record<string, string>> = {
  en: {
    helpSuffix: 'Help',
    backToApp: 'Back to app',
    onThisPage: 'On this page',
    navigation: 'Navigation',
    openNav: 'Open navigation',
    closeNav: 'Close navigation',
    language: 'Language',
    fallbackNotice:
      'This article isn’t available in your language yet — showing the English version.',
  },
  hu: {
    helpSuffix: 'Súgó',
    backToApp: 'Vissza az alkalmazáshoz',
    onThisPage: 'Ezen az oldalon',
    navigation: 'Navigáció',
    openNav: 'Navigáció megnyitása',
    closeNav: 'Navigáció bezárása',
    language: 'Nyelv',
    fallbackNotice:
      'Ez a cikk még nem érhető el magyarul — az angol változatot mutatjuk.',
  },
  de: {
    helpSuffix: 'Hilfe',
    backToApp: 'Zurück zur App',
    onThisPage: 'Auf dieser Seite',
    navigation: 'Navigation',
    openNav: 'Navigation öffnen',
    closeNav: 'Navigation schließen',
    language: 'Sprache',
    fallbackNotice:
      'Dieser Artikel ist noch nicht auf Deutsch verfügbar — wir zeigen die englische Fassung.',
  },
}
