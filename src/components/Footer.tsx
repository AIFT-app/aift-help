'use client'

import { usePathname } from 'next/navigation'
import { splitLocale } from '@/lib/i18n'

const LEGAL = [
  { slug: 'privacy', label: { en: 'Privacy', hu: 'Adatkezelés', de: 'Datenschutz' } },
  { slug: 'terms', label: { en: 'Terms', hu: 'ÁSZF', de: 'Nutzungsbedingungen' } },
  { slug: 'imprint', label: { en: 'Imprint', hu: 'Impresszum', de: 'Impressum' } },
] as const

// The legal documents live on the app, not here, so these are absolute links
// carrying ?lang= so the reader lands in their own language.
//
// ⚠️ A client component reading the pathname, not a prop: the root layout is
// locale-agnostic (one layout serves /, /hu/* and /de/*), so there is nothing
// to pass down. Same approach the language switcher already takes.
//
// A German audience needs an Impressum reachable within two clicks (§5 DDG).
// This is the second click, and it is on every page of the help centre.
export function Footer() {
  const { locale } = splitLocale(usePathname())

  return (
    <footer className="border-t border-zinc-950/5">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-5 lg:pl-72">
        <p className="text-sm text-zinc-500">© 2026 AI Finance Team</p>
        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {LEGAL.map((doc) => (
            <a
              key={doc.slug}
              href={`https://aift.aifinance.team/legal/${doc.slug}?lang=${locale}`}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-950"
            >
              {doc.label[locale]}
            </a>
          ))}
          <a
            href="mailto:support@aifinance.team"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-950"
          >
            support@aifinance.team
          </a>
        </nav>
      </div>
    </footer>
  )
}
