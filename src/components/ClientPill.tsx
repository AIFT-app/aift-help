import { ui, type Locale } from '@/lib/i18n'

/** Marks an article written for the client side too. It hides nothing from anyone. */
export function ClientPill({ locale }: { locale: Locale }) {
  const t = ui[locale]
  return (
    <span
      title={t.forClientsHint}
      // The app's list pill in its blue tone (aift-web label-pills.tsx +
      // label-tones.ts): blue is information, never a call to act.
      className="inline-flex shrink-0 items-center rounded-full bg-blue-100 px-2 py-0.5 text-[11px]/4 font-medium whitespace-nowrap text-blue-800"
    >
      {t.forClients}
    </span>
  )
}
