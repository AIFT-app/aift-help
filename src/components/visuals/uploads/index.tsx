// The upload panel, for the uploading-files article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-22; the duplicate row, the
// refused and failed rows and the header re-checked against origin/staging,
// 2026-11-25, PRD reupload-of-archived-invoice), class for class:
//   UploadQueuePanel   src/components/upload-queue/UploadQueuePanel.tsx
//   UploadQueueRow     src/components/upload-queue/UploadQueueRow.tsx
// The panel is `fixed bottom-4 right-4` in the app, so the stage below is a
// transformed box: a transform makes it the containing block of its fixed
// descendants, which keeps the panel's own computed styles identical to the
// app's while placing it inside the figure. Labels come from ./copy.ts.
//
// The aift-web files this figure copies, one `mirrors:` line each. aift-web
// scripts/help-impact.mjs reads them to flag this figure when one changes;
// keep them current when the figure is redrawn (aift-ops/docs/help-drift-guards.md).
// mirrors: src/components/business-central/WideImportDialog.tsx
// mirrors: src/components/upload-queue/PdfSplitDialog.tsx
// mirrors: src/components/upload-queue/UploadQueuePanel.tsx
// mirrors: src/components/upload-queue/UploadQueueRow.tsx
// mirrors: src/lib/upload-queue/pdf-pages.ts

import clsx from 'clsx'
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { DocumentKindGlyph } from '../DocumentKindGlyph'
import type { Locale } from '@/lib/i18n'
import { AppScreen, Figure } from '../kit'
import { IN_PROGRESS_COUNT, STAGE_HEIGHT, STATEMENT_PAGE, UPLOAD_ROWS, fill, uploadsCopy, type UploadRow } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const SCREEN_MIN_WIDTH = 448

function Row({ row, locale }: { row: UploadRow; locale: Locale }) {
  const c = uploadsCopy[locale]
  const ui = c.ui
  const isFailed = row.state === 'wrong_type' || row.state === 'failed'
  const isSuccess = row.state === 'extracted'
  const isInfo = row.state === 'duplicate'
  const showSpinner = row.state === 'extracting' || row.state === 'page'
  const showRetry = row.state === 'failed'

  // The same branches as UploadQueueRow's useRowLabel: a duplicate names the
  // original (`already_exists_as`), a browser refusal is an error code, and
  // extract-invoice's English failure sentence is translated
  // (serverErrorFromMessage) inside `failed_prefix`.
  const label =
    row.state === 'extracting'
      ? ui['upload.queue_row.extracting']
      : row.state === 'page'
        ? fill(ui['upload.queue_row.extracting_page'], STATEMENT_PAGE)
        : row.state === 'extracted'
          ? ui['upload.queue_row.extracted']
          : row.state === 'duplicate'
            ? fill(ui['upload.queue_row.already_exists_as'], { invoice: row.duplicateLabel })
            : row.state === 'wrong_type'
              ? ui['upload.queue_row.errors.wrong_file_type']
              : fill(ui['upload.queue_row.failed_prefix'], {
                  message: ui['upload.queue_row.server_errors.pdf_encrypted'],
                })

  // document-kind-icons: UploadQueueRow draws the kind glyph for a document row.
  const documentKind = row.kind === 'invoice' ? 'invoice' : 'bank_statement'

  const containerClasses = [
    'flex items-center gap-3 px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0',
    isFailed ? 'bg-red-50/40 dark:bg-red-950/10' : '',
    isSuccess ? 'bg-green-50/40 dark:bg-green-950/10' : '',
    isInfo ? 'bg-blue-50/40 dark:bg-blue-950/10' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const labelClasses = [
    'text-xs mt-0.5',
    isFailed ? 'text-red-700 dark:text-red-300' : '',
    isSuccess ? 'text-green-700 dark:text-green-300' : '',
    isInfo ? 'text-blue-700 dark:text-blue-300' : '',
    !isFailed && !isSuccess && !isInfo ? 'text-zinc-500 dark:text-zinc-400' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <DocumentKindGlyph kind={documentKind} label={ui[`document_kind.${documentKind}`]} size={20} className="text-zinc-400 dark:text-zinc-500" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100" title={row.file}>
          {row.file}
        </p>
        <p className={labelClasses}>{label}</p>
      </div>
      {showSpinner && (
        <div
          role="status"
          aria-label={ui['upload.queue_row.working_aria']}
          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-700 dark:border-zinc-600 dark:border-t-zinc-300"
        />
      )}
      {isSuccess && !showSpinner && (
        <CheckCircleIcon className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
      )}
      {isInfo && (
        <InformationCircleIcon className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
      )}
      {isFailed && !showRetry && (
        <XCircleIcon className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
      )}
      {showRetry && (
        <span className="inline-flex items-center gap-1 rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
          <ArrowPathIcon className="h-3 w-3" aria-hidden="true" />
          {ui['upload.queue_row.retry']}
        </span>
      )}
    </>
  )

  // A finished row is a link in the app; the figure is inert, so it is a div
  // carrying the same classes, including the link's hover pair.
  const clickable = isSuccess || isInfo
  return (
    <div className={clsx(containerClasses, clickable && 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60')}>{inner}</div>
  )
}

function Panel({ locale }: { locale: Locale }) {
  const c = uploadsCopy[locale]
  const header = fill(c.ui['upload_queue.header_with_label'], {
    label: fill(c.ui['upload_queue.summary_uploading'], { count: IN_PROGRESS_COUNT }),
  })
  return (
    <div
      className="fixed bottom-4 right-4 z-40 w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
      role="region"
      aria-label={c.ui['upload_queue.region']}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/60">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{header}</p>
        <div className="flex items-center gap-1">
          <span className="rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200">
            <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="max-h-[50vh] overflow-y-auto">
        {UPLOAD_ROWS.map((row) => (
          <Row key={row.file} row={row} locale={locale} />
        ))}
      </div>
    </div>
  )
}

export function UploadPanelFigure({ locale, children }: FigureProps) {
  const c = uploadsCopy[locale]
  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          {/* A transform makes this box the containing block of the panel,
              which is `fixed` in the app, so the panel keeps the app's own
              computed styles while sitting inside the figure. */}
          <div className="relative w-full translate-x-0 bg-zinc-50" style={{ height: STAGE_HEIGHT[locale] }}>
            <Panel locale={locale} />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
