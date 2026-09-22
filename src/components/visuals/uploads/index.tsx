// The upload panel, for the uploading-files article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-22), class for class:
//   UploadQueuePanel   src/components/upload-queue/UploadQueuePanel.tsx
//   UploadQueueRow     src/components/upload-queue/UploadQueueRow.tsx
// The panel is `fixed bottom-4 right-4` in the app, so the stage below is a
// transformed box: a transform makes it the containing block of its fixed
// descendants, which keeps the panel's own computed styles identical to the
// app's while placing it inside the figure. Labels come from ./copy.ts; the
// header text ("2 uploading") is built in code by the app, not translated.

import clsx from 'clsx'
import {
  ArrowPathIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import type { Locale } from '@/lib/i18n'
import { AppScreen, Figure } from '../kit'
import { UPLOAD_ROWS, uploadsCopy, type UploadRow } from './copy'

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

  const label =
    row.state === 'extracting'
      ? ui['upload.queue_row.extracting']
      : row.state === 'page'
        ? c.rendered.page
        : row.state === 'extracted'
          ? ui['upload.queue_row.extracted']
          : row.state === 'duplicate'
            ? ui['upload.queue_row.already_exists']
            : row.state === 'wrong_type'
              ? 'Wrong file type'
              : c.rendered.failed

  const KindIcon = row.kind === 'invoice' ? DocumentIcon : BanknotesIcon

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
      <KindIcon className="h-5 w-5 shrink-0 text-zinc-400" />
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
  const header = c.ui['upload_queue.header_with_label'].replace('{label}', c.rendered.header.split('· ')[1])
  return (
    <div
      className="fixed bottom-4 right-4 z-40 w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
      role="region"
      aria-label="Upload queue"
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
          <div className="relative h-[336px] w-full translate-x-0 bg-zinc-50">
            <Panel locale={locale} />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
