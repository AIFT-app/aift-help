import { ui, type Locale } from '@/lib/i18n'

export function FallbackNotice({ locale }: { locale: Locale }) {
  return (
    <div className="not-prose mb-8 rounded-lg border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      {ui[locale].fallbackNotice}
    </div>
  )
}
