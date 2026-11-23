// App screens and diagrams for "Download several invoices at once" in the
// invoices article (PRD invoice-document-export, help slug
// help-invoice-document-export).
//
// The screens are rebuilt 1:1 from aift-web (feat branch of
// invoice-document-export, identical to production on 2026-11-23), class for
// class, with the real Catalyst components from the help mirror:
//   header      src/app/(app)/workspaces/[workspaceId]/invoices/page.tsx (the
//               PageTitleRow actions) + src/components/layout/PageTitleRow.tsx
//               + src/components/upload-queue/UploadButton.tsx
//   bar         src/components/recategorize/recategorize-ui.tsx
//               RecategorizeBulkBar with the extraActions of
//               invoices/_components/InvoiceListShell.tsx (the plain
//               DocumentExportButton, vat-tools-ui.tsx ApproveReviewedButton)
//   list        ./index.tsx InvoiceTable with the selection column
//               (recategorize-ui.tsx RowSelectCheckbox, SelectAllCheckbox)
//   dialog      src/components/document-export/DocumentExportButton.tsx, the
//               Dialog panel (catalyst/dialog.tsx, size 2xl) without the
//               backdrop; the period trigger is
//               src/components/date-range/date-range-filter.tsx (closed)
//   toasts      src/components/document-export/runner.ts (toast.loading with
//               the Mégse action, toast.success) as sonner 2.0.7 draws them,
//               see ./toast.module.css
// The file trees, the naming table and the CSV rows are diagrams: the app has
// no screen for them. Their file names are naming.ts output (./export-copy.ts).
// When one of those files changes, re-copy the markup here.

import clsx from 'clsx'
import { ArchiveBoxIcon, CodeBracketIcon, DocumentIcon, FolderIcon, TableCellsIcon } from '@heroicons/react/16/solid'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { DialogActions, DialogBody } from '@/components/catalyst/dialog'
import { Description, Field, FieldGroup, Label } from '@/components/catalyst/fieldset'
import { Heading } from '@/components/catalyst/heading'
import { Input } from '@/components/catalyst/input'
import { Select } from '@/components/catalyst/select'
import { AppScreen, Figure, Pill, Pin } from '../kit'
import { InvoiceTable } from './index'
import { DATEV_FOLDERS, DEFAULT_PATTERN, exportCopy, TOKENS, type ExportUiKey, type Marked, type TreeLine } from './export-copy'
import ts from './toast.module.css'

type FigureProps = { locale: Locale; children?: React.ReactNode }

const u = (locale: Locale, key: string) => exportCopy[locale].ui[`document_export.${key}` as ExportUiKey]

// ── F1: where it starts ─────────────────────────────────────────────────────

/** The header's period button and the selection bar's plain one (DocumentExportButton). */
function ExportButton({ locale, plain = false }: { locale: Locale; plain?: boolean }) {
  return plain ? <Button plain>{u(locale, 'button')}</Button> : <Button outline>{u(locale, 'button')}</Button>
}

/** The invoices page header: PageTitleRow with the two actions. */
export function HeaderScreen({ locale, pin }: { locale: Locale; pin?: number }) {
  const ui = exportCopy[locale].ui
  return (
    <div data-page-width="full" className="mx-auto max-w-[120rem] px-4 py-8">
      <div className={clsx('flex flex-wrap justify-between gap-x-4 gap-y-3', 'items-center')}>
        <div className="min-w-0 flex-1 basis-56">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Heading>{ui['invoices.list.title']}</Heading>
          </div>
        </div>
        <div className="flex max-w-full flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {pin ? <Pin n={pin} at="above" cancel="-mr-2" /> : null}
            <ExportButton locale={locale} />
            {/* UploadButton.tsx */}
            <div className="flex flex-col items-start sm:items-end gap-1">
              <Button color="blue" title={ui['upload.button.hint_tooltip']}>
                {ui['invoices.list.upload_invoices']}
              </Button>
              <input type="file" multiple className="sr-only" />
              <span className="text-xs text-zinc-400">{ui['upload.button.hint_inline']}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** RecategorizeBulkBar with the invoice list's extra actions. */
export function SelectionBar({ locale, pin }: { locale: Locale; pin?: number }) {
  const c = exportCopy[locale]
  const ui = c.ui
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-900/50 dark:bg-blue-950/30">
      <span className="text-sm text-blue-700 dark:text-blue-300">{c.rendered.selectedCount}</span>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button plain>{ui['recategorize.clear']}</Button>
        {pin ? <Pin n={pin} at="above" cancel="-mr-2" /> : null}
        <ExportButton locale={locale} plain />
        <Button outline>{ui['vat_tools.approve_action']}</Button>
        <Button color="blue">{ui['recategorize.action']}</Button>
      </div>
    </div>
  )
}

// The list's floor with a selection column (./index.tsx LIST_MIN_WIDTH + 2.75rem).
const ENTRY_MIN_WIDTH = 844

export function DocumentExportEntryFigure({ locale, children }: FigureProps) {
  const c = exportCopy[locale]
  return (
    <Figure
      alt={c.help.alt.entry}
      bleed
      wide
      zoomable={locale}
      zoomWidth={ENTRY_MIN_WIDTH}
      art={
        <div className="flex flex-col gap-3">
          <AppScreen minWidth={ENTRY_MIN_WIDTH}>
            <HeaderScreen locale={locale} pin={1} />
          </AppScreen>
          <AppScreen minWidth={ENTRY_MIN_WIDTH}>
            {/* A crop from the middle of the page: the selection bar (the
                list's toolbar slot), then the table. The filter bar and the
                pager that sit between them in the app are left out. */}
            <div className="mx-auto max-w-[120rem] px-4 py-4">
              <SelectionBar locale={locale} pin={2} />
              <InvoiceTable
                locale={locale}
                rows={c.pickRows}
                selected={c.pickRows.map((r) => r.selected)}
                marker={{ row: 1, n: 3 }}
              />
            </div>
          </AppScreen>
        </div>
      }
    >
      {children}
    </Figure>
  )
}

// ── F2 / F6: the dialog ─────────────────────────────────────────────────────

// date-range-filter.tsx CalendarGlyph and GLYPH.chevronDown, verbatim.
function CalendarGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4 text-blue-600 dark:text-blue-400">
      <path
        fillRule="evenodd"
        d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2ZM4.75 5.5c-.69 0-1.25.56-1.25 1.25V8h13V6.75c0-.69-.56-1.25-1.25-1.25H4.75Zm11.75 4h-13v5.75c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9.5Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
const CHEVRON_DOWN = '▾'

/** DateRangeFilter, closed, with the basis shown (showBasis + onBasisChange). */
function PeriodTrigger({ locale }: { locale: Locale }) {
  const c = exportCopy[locale]
  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-expanded={false}
        aria-haspopup="dialog"
        className="inline-flex h-8 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-medium text-zinc-800 hover:bg-blue-100 disabled:opacity-50 dark:border-blue-900 dark:bg-blue-950/40 dark:text-zinc-100 dark:hover:bg-blue-900/40"
      >
        <CalendarGlyph />
        <span className="font-normal text-zinc-500 dark:text-zinc-400">{c.ui['date_filter.basis_short_issue']}</span>
        <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
          ·
        </span>
        <span className="tabular-nums">{c.october}</span>
        <span aria-hidden="true" className="text-xs text-zinc-500">
          {CHEVRON_DOWN}
        </span>
      </button>
    </div>
  )
}

type DialogPins = Partial<Record<'period' | 'direction' | 'format' | 'pattern' | 'preview' | 'folders' | 'datevFolders' | 'advanced' | 'summary' | 'start', number>>

/**
 * The Dialog panel of DocumentExportButton, period scope, in a multi-company
 * workspace. `datev`: the DATEV format is selected (and offered).
 */
export function ExportDialogPanel({ locale, datev = false, advancedOpen = false, pins = {} }: { locale: Locale; datev?: boolean; advancedOpen?: boolean; pins?: DialogPins }) {
  const c = exportCopy[locale]
  const t = (k: string) => u(locale, k)
  const format = datev ? 'documents_datev' : 'documents_zip'
  const formats = datev ? ['documents_zip', 'documents_csv', 'documents_datev'] : ['documents_zip', 'documents_csv']
  const names = datev ? c.previewNamesDatev : c.previewNames
  const pin = (k: keyof DialogPins) => (pins[k] ? <Pin n={pins[k]} at="right" cancel="" /> : null)
  return (
    // The Dialog panel without the backdrop. Its DialogTitle is Headless UI's,
    // which throws outside a Dialog, so the title is the h2 Headless renders,
    // class for class. As in payments/: max-h-[calc(100vh-2rem)] is swapped
    // for max-h-none, because 100vh here is the READER's window.
    <div className="flex max-h-none w-full flex-col rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10 sm:max-w-2xl">
      <h2 className="shrink-0 text-base/6 font-semibold text-zinc-950 dark:text-white">{t('title')}</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{t('scope_period')}</p>
      <DialogBody>
        <FieldGroup>
          <Field>
            <Label>
              {t('period')}
              {pin('period')}
            </Label>
            <div className="mt-2">
              <PeriodTrigger locale={locale} />
            </div>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label>
                {t('direction')}
                {pin('direction')}
              </Label>
              <Select defaultValue="">
                <option value="">{t('direction_all')}</option>
                <option value="expense">{t('direction_incoming')}</option>
                <option value="income">{t('direction_outgoing')}</option>
              </Select>
            </Field>
            <Field>
              <Label>{t('company')}</Label>
              <Select defaultValue="">
                <option value="">{t('company_all')}</option>
                {c.companies.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field>
            <Label>
              {t('format')}
              {pin('format')}
            </Label>
            <Select defaultValue={format}>
              {formats.map((f) => (
                <option key={f} value={f}>
                  {t(`format_${f}`)}
                </option>
              ))}
            </Select>
            <Description>{t(`format_${format}_help`)}</Description>
          </Field>

          <Field>
            <Label>
              {t('pattern')}
              {pin('pattern')}
            </Label>
            <Input defaultValue={DEFAULT_PATTERN} />
            <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={t('pattern_tokens')}>
              {TOKENS.map((tok) => (
                <button
                  key={tok}
                  type="button"
                  className="rounded-md border border-zinc-200 px-2 py-0.5 text-xs text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  {t(`token_${tok}`)}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50" data-testid="document-export-name-preview">
              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {t('pattern_preview')}
                {pin('preview')}
              </p>
              <ul className="mt-1 space-y-0.5">
                {names.map((n) => (
                  <li key={n} className="truncate font-mono text-xs text-zinc-800 dark:text-zinc-200">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Field>

          {datev ? null : (
            <Field>
              <Label>
                {t('folders')}
                {pin('folders')}
              </Label>
              <Select defaultValue="none">
                {(['none', 'month', 'direction', 'partner'] as const).map((l) => (
                  <option key={l} value={l}>
                    {t(`folders_${l}`)}
                  </option>
                ))}
              </Select>
            </Field>
          )}

          {datev ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <Label>
                  {t('datev_folder_incoming')}
                  {pin('datevFolders')}
                </Label>
                <Input defaultValue={DATEV_FOLDERS.incoming} maxLength={40} />
              </Field>
              <Field>
                <Label>{t('datev_folder_outgoing')}</Label>
                <Input defaultValue={DATEV_FOLDERS.outgoing} maxLength={40} />
              </Field>
            </div>
          ) : null}

          <details className="text-sm" open={advancedOpen}>
            <summary className="cursor-pointer text-zinc-600 dark:text-zinc-400">
              {t('advanced')}
              {pin('advanced')}
            </summary>
            <div className="mt-3 space-y-4">
              {datev ? null : (
                <CheckboxField>
                  <Checkbox defaultChecked={false} />
                  <Label>{t('ascii')}</Label>
                </CheckboxField>
              )}
              <Field>
                <Label>{t('csv_style')}</Label>
                <Select defaultValue={locale === 'en' ? 'standard' : 'excel'}>
                  <option value="excel">{t('csv_style_excel')}</option>
                  <option value="standard">{t('csv_style_standard')}</option>
                </Select>
              </Field>
            </div>
          </details>

          <div className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200" aria-live="polite">
            <p>
              {c.rendered.summary}
              {pin('summary')}
            </p>
            <p className="mt-1">{c.rendered.summaryMissing}</p>
          </div>
        </FieldGroup>
      </DialogBody>
      <DialogActions>
        <Button plain>{t('cancel')}</Button>
        {pins.start ? <Pin n={pins.start} at="above" cancel="-mr-3" /> : null}
        <Button>{t('start')}</Button>
      </DialogActions>
    </div>
  )
}

// The 2xl panel (42rem) and the p-4 around it.
const DIALOG_MIN_WIDTH = 704

export function DocumentExportDialogFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={exportCopy[locale].help.alt.dialog}
      wide
      zoomable={locale}
      zoomWidth={DIALOG_MIN_WIDTH}
      art={
        <AppScreen minWidth={DIALOG_MIN_WIDTH}>
          <div className="flex items-center justify-center bg-white p-4">
            <ExportDialogPanel
              locale={locale}
              advancedOpen
              pins={{ period: 1, direction: 2, format: 3, pattern: 4, folders: 5, advanced: 6, summary: 7, start: 8 }}
            />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}

// ── Diagram parts ───────────────────────────────────────────────────────────

/** A file name with the parts a rule changed (`[[...]]`) highlighted. */
function MarkedName({ name }: { name: Marked }) {
  const parts = name.split(/(\[\[[^\]]*\]\])/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('[[') ? (
          <mark key={i} className="rounded-sm bg-amber-100 px-0.5 text-amber-900">
            {p.slice(2, -2)}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

/** A pattern with its `{field}` parts tinted, as typed in the dialog. */
function PatternText({ pattern }: { pattern: string }) {
  const parts = pattern.split(/(\{[a-z_]+\})/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('{') ? (
          <span key={i} className="text-blue-700">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

const TREE_ICON = {
  zip: ArchiveBoxIcon,
  folder: FolderIcon,
  pdf: DocumentIcon,
  csv: TableCellsIcon,
  xml: CodeBracketIcon,
} as const

function FileTree({ title, lines }: { title: string; lines: TreeLine[] }) {
  return (
    <div className="min-w-0 rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10">
      <p className="text-xs font-semibold text-zinc-500">{title}</p>
      <ul className="mt-2 space-y-1">
        {lines.map((l) => {
          const Icon = TREE_ICON[l.kind]
          return (
            <li
              key={`${l.depth}-${l.name}`}
              className={clsx(
                'flex items-start gap-1.5 font-mono text-xs',
                l.depth === 0 ? 'font-semibold text-zinc-900' : 'text-zinc-700',
                l.depth > 0 && 'border-l border-zinc-200',
              )}
              style={{ marginLeft: l.depth > 0 ? `${(l.depth - 1) * 1.25 + 0.5}rem` : undefined, paddingLeft: l.depth > 0 ? '0.625rem' : undefined }}
            >
              <Icon
                aria-hidden="true"
                className={clsx(
                  'mt-px size-3.5 shrink-0',
                  l.kind === 'csv' ? 'text-emerald-600' : l.kind === 'xml' ? 'text-blue-600' : l.kind === 'folder' ? 'text-amber-500' : 'text-zinc-400',
                )}
              />
              <span className="min-w-0 break-all">{l.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ── F3: naming patterns ─────────────────────────────────────────────────────

export function DocumentExportNamingFigure({ locale, children }: FigureProps) {
  const c = exportCopy[locale]
  return (
    <Figure
      alt={c.help.alt.naming}
      art={
        <div inert className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 sm:p-6">
          <p className="text-xs text-zinc-600">{c.invoice}</p>
          <div className="mt-3 hidden grid-cols-2 gap-4 border-b border-zinc-200 pb-1.5 text-xs font-semibold text-zinc-500 sm:grid">
            <span>{c.help.patternHead}</span>
            <span>{c.help.fileNameHead}</span>
          </div>
          <ol className="mt-1 divide-y divide-zinc-100">
            {c.patterns.map((p, i) => (
              <li key={i} className="grid gap-x-4 gap-y-1 py-2.5 sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="break-all font-mono text-xs text-zinc-800">
                    <PatternText pattern={p.pattern} />
                  </p>
                  {p.ascii ? (
                    <span className="mt-1 inline-block">
                      <Pill tone="zinc">{c.help.asciiOn}</Pill>
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="break-all font-mono text-xs text-zinc-900">
                    <span aria-hidden="true" className="mr-1 text-zinc-400 sm:hidden">
                      →
                    </span>
                    <MarkedName name={p.name} />
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{p.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      }
    >
      {children}
    </Figure>
  )
}

// ── F4: what is in the ZIP ──────────────────────────────────────────────────

export function DocumentExportZipFigure({ locale, children }: FigureProps) {
  const c = exportCopy[locale]
  const t = (k: string) => u(locale, k)
  const outcome = { included: t('outcome_included'), no_document: t('outcome_no_document'), download_failed: t('outcome_download_failed') }
  const tone = { included: 'text-emerald-700', no_document: 'text-zinc-600', download_failed: 'text-rose-700' }
  const heads = ['csv_file_name', 'csv_document', 'csv_invoice_number', 'csv_partner_name', 'csv_total_gross'].map(t)
  return (
    <Figure
      alt={c.help.alt.zip}
      art={
        <div inert className="flex flex-col gap-3">
          <div className="grid gap-3">
            <FileTree title={c.help.flat} lines={c.treeFlat} />
            <FileTree title={c.help.monthly} lines={c.treeMonthly} />
          </div>
          <div className="min-w-0 rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-950/10">
            <p className="text-xs font-semibold text-zinc-500">{c.help.csvHead}</p>
            <div className="mt-2">
              <table className="w-full border-collapse text-left font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500">
                    {heads.map((h) => (
                      <th key={h} className="px-2 py-1 font-semibold">
                        {h}
                      </th>
                    ))}
                    <th className="px-2 py-1 font-semibold">{c.help.csvMore}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.csvRows.map((r) => (
                    <tr key={r.internalId} className="border-b border-zinc-100 align-top text-zinc-800">
                      <td className="max-w-[16rem] px-2 py-1 break-all">{r.fileName}</td>
                      <td className={clsx('px-2 py-1 font-semibold whitespace-nowrap', tone[r.document])}>{outcome[r.document]}</td>
                      <td className="px-2 py-1 whitespace-nowrap">{r.invoiceNumber}</td>
                      <td className="px-2 py-1">{r.partner}</td>
                      <td className="px-2 py-1 text-right whitespace-nowrap">{r.gross}</td>
                      <td className="px-2 py-1 text-zinc-400">{c.help.csvMore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </Figure>
  )
}

// ── F5: progress and finish ─────────────────────────────────────────────────

// sonner's spinner, frozen: twelve bars, each 30° on, fading behind the lead.
function Spinner() {
  return (
    <div className={ts.loadingWrapper} data-visible="true">
      <div className={ts.spinner}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={ts.bar}
            style={{ transform: `rotate(${i === 0 ? 0.0001 : i * 30}deg) translate(146%)`, opacity: 0.15 + (0.85 * ((i + 1) % 12)) / 12 }}
          />
        ))}
      </div>
    </div>
  )
}

// sonner's success icon, verbatim.
function SuccessIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function ProgressToast({ locale, pin }: { locale: Locale; pin?: number }) {
  const c = exportCopy[locale]
  return (
    <li className={ts.toast} data-sonner-toast="" data-type="loading">
      <div className={ts.icon} data-icon="">
        <Spinner />
      </div>
      <div className={ts.content} data-content="">
        <div className={ts.title} data-title="">
          {c.rendered.toastProgress}
        </div>
      </div>
      <button type="button" className={ts.button} data-button="true" data-action="true">
        {u(locale, 'cancel')}
      </button>
      {pin ? <Pin n={pin} at="right" cancel="" /> : null}
    </li>
  )
}

export function DoneToast({ locale }: { locale: Locale }) {
  const c = exportCopy[locale]
  return (
    <li className={clsx(ts.toast, ts.success)} data-sonner-toast="" data-type="success">
      <div className={ts.icon} data-icon="">
        <SuccessIcon />
      </div>
      <div className={ts.content} data-content="">
        <div className={ts.title} data-title="">
          {c.rendered.toastDoneFailed}
        </div>
      </div>
    </li>
  )
}

// The toast's width and the toaster's 24px offset on both sides.
const TOAST_MIN_WIDTH = 404

export function DocumentExportToastsFigure({ locale, children }: FigureProps) {
  const c = exportCopy[locale]
  return (
    <Figure
      alt={c.help.alt.toasts}
      art={
        <div className="grid gap-3">
          {[
            { title: c.help.progress, toast: <ProgressToast locale={locale} /> },
            { title: c.help.finished, toast: <DoneToast locale={locale} /> },
          ].map((s) => (
            <div key={s.title} className="min-w-0">
              <p className="mb-2 text-xs font-semibold text-zinc-500">{s.title}</p>
              <AppScreen minWidth={TOAST_MIN_WIDTH}>
                <div className="flex justify-end bg-white p-6">
                  <ol className={ts.toaster} dir="ltr" data-sonner-toaster="true" data-sonner-theme="light">
                    {s.toast}
                  </ol>
                </div>
              </AppScreen>
            </div>
          ))}
        </div>
      }
    >
      {children}
    </Figure>
  )
}

// ── F6: DATEV ───────────────────────────────────────────────────────────────

export function DocumentExportDatevFigure({ locale, children }: FigureProps) {
  const c = exportCopy[locale]
  return (
    <Figure
      alt={c.help.alt.datev}
      wide
      zoomable={locale}
      zoomWidth={DIALOG_MIN_WIDTH}
      art={
        <div className="flex flex-col gap-3">
          <AppScreen minWidth={DIALOG_MIN_WIDTH}>
            <div className="flex items-center justify-center bg-white p-4">
              <ExportDialogPanel locale={locale} datev pins={{ format: 1, preview: 2, datevFolders: 3 }} />
            </div>
          </AppScreen>
          <div inert>
            <FileTree title={c.help.datevZip} lines={c.treeDatev} />
          </div>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
