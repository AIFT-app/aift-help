import { ui, type Locale } from '@/lib/i18n'

/** Marks an article written for the client side too. It hides nothing from anyone. */
export function ClientPill({ locale }: { locale: Locale }) {
  const t = ui[locale]
  return (
    <span
      title={t.forClientsHint}
      className="inline-flex shrink-0 items-center rounded-full bg-indigo-50 px-1.5 py-0.5 text-[11px] font-medium leading-none text-indigo-700"
    >
      {t.forClients}
    </span>
  )
}
