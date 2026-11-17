// The PDF split dialog, for the uploading-files article.
//
// Rebuilt 1:1 from aift-web (feat/upload-pdf-page-split-build, 2026-11-17),
// class for class:
//   WideImportDialog  src/components/business-central/WideImportDialog.tsx (the panel)
//   PdfSplitDialog    src/components/upload-queue/PdfSplitDialog.tsx (everything inside)
// Fixture: two scanned PDFs dropped together, 38 and 44 pages, the first one
// selected, every page a separate invoice, pages 9, 22 and 31 found blank. The
// blank scan has finished, so the confirm button is enabled.
//
// The screen is the dialog as a window 800 px tall shows it: the app's panel
// height is h-[min(900px,calc(100vh-2rem))], which there computes to 768 px,
// so the figure writes h-[768px] (100vh inside a figure would be the reader's
// window, not the screen's). That is the one class that differs from the app.
// The file and remove buttons are spans (the figure is inert); computed CSS
// then differs from the app only in text-align on the icon-only remove box.
// Verified 2026-11-17 against the real dialog at a 784x800 window, HU: 273
// elements, every other computed property identical.
//
// ⚠️ MARKERS: 1 left of the selected file's remove button, 2 right of the
// first mode (in the 28 px gap to the next one; above it would be clipped by
// the body's overflow-hidden border), 3 left of the footer count, 4 right of the blank-pages line, 5 above the
// confirm button. None sits on a blank page: those are opacity-40 in the app,
// and a marker inside one would be dimmed with it.

import clsx from 'clsx'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Select } from '@/components/catalyst/select'
import { AppScreen, Figure, Pin } from '../kit'
import { BLANK_THUMB, TICKET_THUMB } from './split-thumbs'

const SCREEN_HEIGHT = 800

type Copy = {
  title: string
  subtitle: string
  files: { name: string; meta: string; option: string }[]
  filesLabel: string
  fileSelectLabel: string
  removeFile: string
  modeGroup: string
  modeEach: string
  everyPrefix: string
  everySuffix: string
  everyLabel: string
  modeRanges: string
  tagBlank: string
  groupLeftOut: string
  summaryCount: string
  summaryBilling: string
  summaryBlank: string
  cancel: string
  confirm: string
  alt: string
}

// Labels verbatim from aift-web messages/<locale>.json (upload.pdf_split.*),
// with the fixture's numbers filled in as the app's ICU formatting renders them.
export const splitCopy: Record<Locale, Copy> = {
  en: {
    title: 'Split PDF into invoices',
    subtitle: 'These PDFs have more than 10 pages. Choose where each new invoice starts.',
    files: [
      { name: 'Scanned_tickets_A.pdf', meta: '38 pages · 35 invoices', option: 'Scanned_tickets_A.pdf (38 pages)' },
      { name: 'Scanned_tickets_B.pdf', meta: '44 pages · 44 invoices', option: 'Scanned_tickets_B.pdf (44 pages)' },
    ],
    filesLabel: 'Files',
    fileSelectLabel: 'File',
    removeFile: 'Remove from the list',
    modeGroup: 'How to split',
    modeEach: 'Every page is a separate invoice',
    everyPrefix: 'Every',
    everySuffix: 'pages per invoice',
    everyLabel: 'Pages per invoice',
    modeRanges: 'Custom page ranges',
    tagBlank: 'Blank',
    groupLeftOut: 'left out',
    summaryCount: '79 invoices will be created.',
    summaryBilling: 'Each one counts as one invoice for billing.',
    summaryBlank: '3 blank pages are left out.',
    cancel: 'Cancel',
    confirm: 'Upload 79 invoices',
    alt: 'The split dialog with two scanned PDFs: a file list on the left, the split mode and the page thumbnails of the first file on the right, a blank page marked Blank and left out, and a footer saying 79 invoices will be created.',
  },
  hu: {
    title: 'PDF szétbontása számlákra',
    subtitle: 'Ezek a PDF-ek hosszabbak 10 oldalnál. Válaszd ki, hol kezdődik egy új számla.',
    files: [
      { name: 'Szkennelt_jegyek_A.pdf', meta: '38 oldal · 35 számla', option: 'Szkennelt_jegyek_A.pdf (38 oldal)' },
      { name: 'Szkennelt_jegyek_B.pdf', meta: '44 oldal · 44 számla', option: 'Szkennelt_jegyek_B.pdf (44 oldal)' },
    ],
    filesLabel: 'Fájlok',
    fileSelectLabel: 'Fájl',
    removeFile: 'Kivétel a listából',
    modeGroup: 'Szétbontás módja',
    modeEach: 'Minden oldal külön számla',
    everyPrefix: 'Számlánként',
    everySuffix: 'oldal',
    everyLabel: 'Oldalak száma számlánként',
    modeRanges: 'Saját oldaltartományok',
    tagBlank: 'Üres',
    groupLeftOut: 'kimarad',
    summaryCount: '79 számla jön létre.',
    summaryBilling: 'A díjazásban mindegyik egy számlának számít.',
    summaryBlank: '3 üres oldalt kihagyunk.',
    cancel: 'Mégse',
    confirm: '79 számla feltöltése',
    alt: 'A szétbontó ablak két szkennelt PDF-fel: bal oldalt a fájlok, jobbra a szétbontás módja és az első fájl oldalainak bélyegképei, egy üres oldal „Üres” jelöléssel kihagyva, alul pedig: 79 számla jön létre.',
  },
  de: {
    title: 'PDF in Rechnungen aufteilen',
    subtitle: 'Diese PDFs haben mehr als 10 Seiten. Wählen Sie, wo eine neue Rechnung beginnt.',
    files: [
      { name: 'Scan_Belege_A.pdf', meta: '38 Seiten · 35 Rechnungen', option: 'Scan_Belege_A.pdf (38 Seiten)' },
      { name: 'Scan_Belege_B.pdf', meta: '44 Seiten · 44 Rechnungen', option: 'Scan_Belege_B.pdf (44 Seiten)' },
    ],
    filesLabel: 'Dateien',
    fileSelectLabel: 'Datei',
    removeFile: 'Aus der Liste entfernen',
    modeGroup: 'Art der Aufteilung',
    modeEach: 'Jede Seite ist eine eigene Rechnung',
    everyPrefix: 'Je Rechnung',
    everySuffix: 'Seiten',
    everyLabel: 'Seiten je Rechnung',
    modeRanges: 'Eigene Seitenbereiche',
    tagBlank: 'Leer',
    groupLeftOut: 'entfällt',
    summaryCount: '79 Rechnungen werden angelegt.',
    summaryBilling: 'Für die Abrechnung zählt jede als eine Rechnung.',
    summaryBlank: '3 leere Seiten werden ausgelassen.',
    cancel: 'Abbrechen',
    confirm: '79 Rechnungen hochladen',
    alt: 'Der Aufteilungsdialog mit zwei gescannten PDFs: links die Dateien, rechts die Art der Aufteilung und die Seitenvorschau der ersten Datei, eine leere Seite als Leer markiert und ausgelassen, unten: 79 Rechnungen werden angelegt.',
  },
}

const PAGES = 38
const BLANKS = new Set([9, 22, 31])

function pageLabel(p: number): string {
  return `_p${String(p).padStart(2, '0')}`
}

function Thumb({ page, blank, tag }: { page: number; blank: boolean; tag: string | null }) {
  return (
    <div className="relative flex aspect-[1/1.414] w-[76px] items-center justify-center overflow-hidden rounded-[3px] border border-zinc-300 bg-white sm:w-[84px] dark:border-zinc-500 dark:bg-zinc-200 cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={blank ? BLANK_THUMB : TICKET_THUMB} alt="" className="max-h-full max-w-full object-contain" draggable={false} />
      <span className="absolute right-1 bottom-0.5 font-mono text-[9px] text-zinc-500 tabular-nums">{page}</span>
      {tag && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-700 px-1.5 py-0.5 text-[10.5px] leading-none font-semibold whitespace-nowrap text-white">
          {tag}
        </span>
      )}
    </div>
  )
}

function Dialog({ locale }: { locale: Locale }) {
  const c = splitCopy[locale]
  return (
    <div className="flex w-full flex-col rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10 sm:max-w-6xl h-[768px]">
      <h2 className="shrink-0 text-base/6 font-semibold text-zinc-950 dark:text-white">{c.title}</h2>
      <p className="mt-1 hidden text-sm text-zinc-600 sm:block dark:text-zinc-300">{c.subtitle}</p>

      <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-4 sm:grid sm:grid-cols-[260px_1fr] sm:overflow-hidden sm:rounded-xl sm:border sm:border-zinc-200 sm:dark:border-zinc-700">
        <ul aria-label={c.filesLabel} className="hidden overflow-y-auto border-r border-zinc-200 bg-zinc-50 sm:block dark:border-zinc-700 dark:bg-zinc-800/40">
          {c.files.map((f, i) => (
            <li
              key={f.name}
              className={clsx(
                'flex items-start gap-2 border-b border-zinc-100 dark:border-zinc-800',
                i === 0 && 'bg-zinc-100 shadow-[inset_3px_0_0_var(--color-indigo-600)] dark:bg-zinc-800 dark:shadow-[inset_3px_0_0_var(--color-indigo-400)]',
              )}
            >
              <span className="min-w-0 flex-1 px-3 py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                <span className="block truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100" title={f.name}>
                  {f.name}
                </span>
                <span className="block text-xs text-zinc-500 tabular-nums dark:text-zinc-400">{f.meta}</span>
              </span>
              {i === 0 && <Pin n={1} at="left" cancel="-ml-2" />}
              <span title={c.removeFile} className="mt-2 mr-2 shrink-0 rounded p-0.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                <XMarkIcon className="size-4" aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>

        <Select className="mb-1 sm:hidden" aria-label={c.fileSelectLabel} defaultValue="0">
          {c.files.map((f, i) => (
            <option key={f.name} value={String(i)}>
              {f.option}
            </option>
          ))}
        </Select>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div
            role="radiogroup"
            aria-label={c.modeGroup}
            className="flex flex-col gap-2.5 border-b border-zinc-200 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:px-4 dark:border-zinc-700"
          >
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <input type="radio" name="pdf-split-mode-figure" defaultChecked readOnly />
              {c.modeEach}
              <Pin n={2} at="right" cancel="-ml-2" />
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <input type="radio" name="pdf-split-mode-figure" readOnly />
              {c.everyPrefix}
              <input
                type="number"
                inputMode="numeric"
                min={2}
                max={10}
                defaultValue={2}
                readOnly
                aria-label={c.everyLabel}
                className="w-14 rounded-md border border-zinc-300 bg-white px-1.5 py-0.5 text-sm text-zinc-900 tabular-nums dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
              />
              {c.everySuffix}
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <input type="radio" name="pdf-split-mode-figure" readOnly />
              {c.modeRanges}
            </label>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto py-3 sm:p-4">
            <div className="flex flex-wrap content-start gap-x-2.5 gap-y-3 sm:gap-x-3.5 sm:gap-y-4">
              {Array.from({ length: PAGES }, (_, i) => i + 1).map((p) =>
                BLANKS.has(p) ? (
                  <div key={`o${p}`} className="flex flex-col gap-1 opacity-40">
                    <div className="flex gap-1">
                      <Thumb page={p} blank tag={c.tagBlank} />
                    </div>
                    <span className="text-center font-mono text-[11px] leading-tight text-zinc-400 dark:text-zinc-500">{c.groupLeftOut}</span>
                  </div>
                ) : (
                  <div key={`p${p}`} className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <Thumb page={p} blank={false} tag={null} />
                    </div>
                    <span className="text-center font-mono text-[11px] leading-tight text-zinc-500 tabular-nums dark:text-zinc-400">
                      {pageLabel(p)}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex shrink-0 flex-col items-stretch gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          <Pin n={3} at="left" cancel="" />
          <span className="font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">{c.summaryCount}</span> {c.summaryBilling}
          <br />
          <span className="tabular-nums">{c.summaryBlank}</span>
          <Pin n={4} at="right" cancel="" />
        </p>
        <div className="flex shrink-0 flex-col-reverse gap-3 sm:flex-row">
          <Button outline className="w-full sm:w-auto">
            {c.cancel}
          </Button>
          <Pin n={5} at="above" cancel="-mr-3" />
          <Button className="w-full sm:w-auto">{c.confirm}</Button>
        </div>
      </div>
    </div>
  )
}

export function PdfSplitDialogFigure({ locale, children }: { locale: Locale; children?: React.ReactNode }) {
  const c = splitCopy[locale]
  return (
    <Figure
      alt={c.alt}
      wide
      zoomable={locale}
      art={
        <AppScreen>
          {/* The app's backdrop (WideImportDialog): bg-black/30 over the page,
              the panel centred with p-4. */}
          <div className="relative bg-zinc-50" style={{ height: SCREEN_HEIGHT }}>
            <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Dialog locale={locale} />
            </div>
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
