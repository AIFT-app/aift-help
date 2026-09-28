// Two screens for the vat-setup-import-export article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28), class for class:
//   the title row   src/app/(app)/workspaces/[workspaceId]/master-data/vat/
//                   layout.tsx + _vat/VatSetupActions.tsx
//   the tab bar     master-data/vat/_components/VatTabs.tsx
//   the dialog      _vat/VatSetupImportDialog.tsx (preview step)
//   the preview     _vat/VatSetupPreview.tsx
//
// WHY THESE TWO
//
//   The article's first section answers a spatial question — where the three
//   buttons are — and the old article got it wrong, saying they sat "on any of
//   the five tabs" when they are in the page's TITLE ROW and there are six
//   tabs. Prose can only assert that; one screen settles it.
//
//   The second is the moment the reader is most anxious: the dry run. The
//   article spends its longest paragraphs on "nothing has been written yet",
//   and the picture shows the per-sheet counts, an error that blocks, and the
//   Confirm button greyed out because of it.
//
// Both are server components, so the file input and the buttons carry no
// handlers; the screen is `inert`, so nothing in it is focusable anyway. The
// tab bar's real component reads usePathname, which a static screen cannot,
// so the active tab is the ACTIVE_TAB constant. Labels come from ./copy.ts,
// keyed by aift-web message key; the counts and the workspace are fictional.

import clsx from 'clsx'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { DialogActions, DialogBody } from '@/components/catalyst/dialog'
import { Heading } from '@/components/catalyst/heading'
import { Text } from '@/components/catalyst/text'
import { AppScreen, Figure, Pin } from '../kit'
import { ACTIVE_TAB, DRY_RUN, OVERLAP_COLUMN, OVERLAP_SHEET, SHEETS, TABS, vatSetupCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const SCREEN_MIN_WIDTH = 760

/** VatTabs.tsx, verbatim. */
function tabClass(active: boolean) {
  return clsx(
    'whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors',
    active
      ? 'border-blue-600 text-zinc-950 dark:border-blue-500 dark:text-white'
      : 'border-transparent text-zinc-500 dark:text-zinc-400',
  )
}

/**
 * The VAT codes page title row: the three whole-setup actions and the tab bar
 * they sit above. One mount in vat/layout.tsx covers every tab, which is the
 * point of the picture.
 */
export function VatSetupActionsFigure({ locale, children }: FigureProps) {
  const c = vatSetupCopy[locale]
  const ui = c.ui

  return (
    <Figure
      alt={c.help.actionsAlt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          {/* The app's content panel pads 40px (SidebarLayout's `lg:p-10`), so
              a 16px top crop under-shows it AND leaves the `above` markers on
              the title row with 16px of room for an 18px pin: they were being
              sliced by the screen's own overflow-hidden. 32px above, 16px at
              the sides, the same crop the partners screen takes. */}
          <div className="bg-white px-4 pt-8 pb-4">
            {/* master-data/vat/layout.tsx */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <Heading>{ui['nav.master_data.vat']}</Heading>
                {/* _vat/VatSetupActions.tsx */}
                <div className="flex flex-col items-end gap-1">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <Pin n={1} at="above" cancel="-mr-2" />
                    <Button outline>{ui['master_data.vat_setup.export_button']}</Button>
                    <Pin n={2} at="above" cancel="-mr-2" />
                    <Button outline>{ui['master_data.vat_setup.import_button']}</Button>
                    <Pin n={3} at="above" cancel="-mr-2" />
                    <Button outline>{ui['master_data.vat_setup.copy_button']}</Button>
                  </div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {c.rendered.lastImport}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                {/* vat/_components/VatTabs.tsx */}
                <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-1 border-b border-zinc-200 dark:border-zinc-700">
                  {TABS.map((t) => (
                    <span
                      key={t}
                      aria-current={t === ACTIVE_TAB ? 'page' : undefined}
                      className={tabClass(t === ACTIVE_TAB)}
                    >
                      {ui[`nav.master_data.${t}` as keyof typeof ui]}
                    </span>
                  ))}
                  <Pin n={4} at="right" cancel="-ml-6" />
                </nav>
              </div>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

/**
 * The import dialog at its preview step: per-sheet counts, the error that
 * blocks, and Confirm disabled. The dialog is drawn as the app's Dialog panel
 * would appear over the page, cropped to the panel itself, because the figure
 * is about the dialog rather than what is behind it.
 */
export function VatSetupPreviewFigure({ locale, children }: FigureProps) {
  const c = vatSetupCopy[locale]
  const ui = c.ui
  const counts = c.rendered.counts

  return (
    <Figure
      alt={c.help.previewAlt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          <div className="bg-white p-4">
            {/* DialogPanel (catalyst/dialog.tsx, size 2xl), without the
                backdrop and the centring wrapper: the crop is the panel. Its
                own DialogTitle is Headless UI's, which throws outside a Dialog,
                so the title is the h2 Headless renders, class for class. */}
            <div className="mx-auto flex max-h-[calc(100vh-2rem)] w-full flex-col rounded-2xl bg-white p-6 shadow-xl sm:max-w-2xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10">
              <h2 className="shrink-0 text-base/6 font-semibold text-zinc-950 dark:text-white">
                {ui['master_data.vat_setup.import_title']}
              </h2>
              <DialogBody>
                <Text className="mb-4">{ui['master_data.vat_setup.preview_hint_blocked']}</Text>

                {/* _vat/VatSetupPreview.tsx */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    {SHEETS.map((sheet) => {
                      const n = DRY_RUN[sheet]
                      const r = counts[sheet]
                      return (
                        <div key={sheet} className="flex flex-wrap items-center gap-2">
                          <span className="w-56 truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {ui[`master_data.vat_setup.sheet.${sheet}` as keyof typeof ui]}
                          </span>
                          <Badge color="green">{r.new}</Badge>
                          <Badge color="blue">{r.updated}</Badge>
                          <Badge color="zinc">{r.unchanged}</Badge>
                          {n.errors > 0 && r.errors ? <Badge color="red">{r.errors}</Badge> : null}
                          {/* After the badges, in the row's empty tail: `above`
                              landed it on the badges of the row above. */}
                          {sheet === 'vat_codes' ? <Pin n={5} at="right" cancel="-ml-2" /> : null}
                        </div>
                      )
                    })}
                  </div>

                  <div>
                    <Text className="mb-1 font-medium text-red-600 dark:text-red-400">
                      {c.rendered.errorsBlock}
                    </Text>
                    <div className="max-h-56 overflow-y-auto rounded-lg border border-red-200 dark:border-red-900/60">
                      <div className="border-b border-red-100 px-3 py-1.5 text-sm last:border-0 dark:border-red-900/40">
                        <span className="font-medium">{OVERLAP_SHEET}</span>
                        <span className="text-zinc-500"> · {c.rendered.row}</span>
                        <span className="text-zinc-500"> · {OVERLAP_COLUMN}</span>
                        <span className="ml-2 text-red-700 dark:text-red-400">
                          {c.rendered.overlap}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogBody>

              <DialogActions>
                <Button plain>{ui['master_data.vat_setup.back']}</Button>
                <Pin n={6} at="above" cancel="-mr-3" />
                <Button disabled>{ui['master_data.vat_setup.confirm_import']}</Button>
              </DialogActions>
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
