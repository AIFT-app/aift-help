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
//               DocumentExportButton, BulkApprovalMenu's closed
//               DropdownButton: outline, label, ChevronDownIcon 20/solid)
//   list        ./index.tsx InvoiceTable with the selection column, in a
//               workspace that hides internal IDs (showIds false)
//               (recategorize-ui.tsx RowSelectCheckbox, SelectAllCheckbox);
//               an editor may also upload, so its rows carry the attach
//               button and the ⋯ menu (RowAttachControls) like the list's
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
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import type { Locale } from '@/lib/i18n'
import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/components/catalyst/checkbox'
import { DialogActions, DialogBody } from '@/components/catalyst/dialog'
import { Field, FieldGroup, Label } from '@/components/catalyst/fieldset'
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

/** DocumentExportButton's trigger: outline, one name in both places (D5, D6). */
function ExportButton({ locale }: { locale: Locale }) {
  return <Button outline>{u(locale, 'button')}</Button>
}

/** The invoices page header: PageTitleRow with the button row and the drag hint under it. */
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
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <div className="flex flex-wrap items-start gap-2">
              <div className="order-2 sm:order-1">
                {pin ? <Pin n={pin} at="above" cancel="" /> : null}
                <ExportButton locale={locale} />
              </div>
              <div className="order-1 sm:order-2">
                {/* UploadButton.tsx with showHint={false} */}
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <Button color="blue" title={ui['upload.button.hint_tooltip']}>
                    {ui['invoices.list.upload_invoices']}
                  </Button>
                  <input type="file" multiple className="sr-only" />
                </div>
              </div>
            </div>
            <span className="text-xs text-zinc-400">{ui['upload.button.hint_inline']}</span>
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
        <ExportButton locale={locale} />
        {/* BulkApprovalMenu, closed (invoice-list-bulk-stage-approval) */}
        <Button outline>
          {ui['invoices.bulk_approval.button']}
          <ChevronDownIcon />
        </Button>
        <Button color="blue">{ui['recategorize.action']}</Button>
      </div>
    </div>
  )
}

// The list's floor with a selection column, row controls and these amounts,
// in a workspace that hides internal IDs (the ID line would push the table
// past the article column): 798.15px (en; hu 790, de 748, measured on the real
// table), plus the page's 2rem padding.
const ENTRY_MIN_WIDTH = 832

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
                showIds={false}
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

/** src/components/ui/segmented.tsx with `wrap`, not `inline`, class for class. */
function Segmented({ label, value, options }: { label: string; value: string; options: Array<{ value: string; label: string }> }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={clsx(
        'inline-flex rounded-lg border p-0.5',
        'max-w-full flex-wrap',
        'w-full border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/60',
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            className={clsx(
              'flex-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              active
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

type DialogPins = Partial<Record<'scope' | 'summary' | 'format' | 'names' | 'preview' | 'folders' | 'datevFolders' | 'advanced' | 'start', number>>

/**
 * The Dialog panel of DocumentExportButton, list scope (the list filtered to
 * October and expenses). `datev`: the DATEV format is selected (and offered).
 * `custom`: Egyéni is picked, straight from the default preset, so the
 * builder holds the default pattern.
 */
export function ExportDialogPanel({
  locale,
  datev = false,
  custom = false,
  advancedOpen = false,
  pins = {},
}: {
  locale: Locale
  datev?: boolean
  custom?: boolean
  advancedOpen?: boolean
  pins?: DialogPins
}) {
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
      {/* ListScopeChips */}
      <div className="mt-3">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
          <span>{t('scope_list')}</span>
          {c.chips.map((l) => (
            <span
              key={l}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {l}
            </span>
          ))}
        </div>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {t('scope_hint')}
          {pin('scope')}
        </p>
      </div>
      <DialogBody>
        <div
          className={'rounded-md px-3 py-2 text-sm ' + 'bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-200'}
          aria-live="polite"
          data-testid="document-export-summary"
        >
          <p>
            {c.rendered.summary}
            {pin('summary')}
          </p>
          <p className="mt-1">{c.rendered.summaryMissing}</p>
        </div>

        <FieldGroup className="mt-6">
          <Field>
            <Label>
              {t('format')}
              {pin('format')}
            </Label>
            <div className="mt-2">
              <Segmented label={t('format')} value={format} options={formats.map((f) => ({ value: f, label: t(`format_${f}`) }))} />
            </div>
          </Field>

          <Field>
            <Label>
              {t('file_names')}
              {pin('names')}
            </Label>
            <div className="mt-2">
              <Segmented
                label={t('file_names')}
                value={custom ? 'custom' : 'p1'}
                options={[
                  { value: 'p1', label: t('preset_p1') },
                  { value: 'p2', label: t('token_invoice_number') },
                  { value: 'p3', label: t('token_internal_id') },
                  { value: 'custom', label: t('preset_custom') },
                ]}
              />
            </div>
            {custom ? (
              <div className="mt-3">
                <Input aria-label={t('pattern')} defaultValue={c.customPattern} />
                <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4" role="group" aria-label={t('pattern_tokens')}>
                  {TOKENS.map((tok) => (
                    <button
                      key={tok}
                      type="button"
                      className="truncate rounded-md border border-zinc-950/10 px-2 py-1 text-left text-xs text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      {t('token_insert').replace('{field}', t(`token_${tok}`))}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
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
              <div className="mt-2">
                <Segmented
                  label={t('folders')}
                  value="none"
                  options={(['none', 'month', 'direction', 'partner'] as const).map((l) => ({ value: l, label: t(`folders_${l}`) }))}
                />
              </div>
            </Field>
          )}

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
            </div>
          </details>
        </FieldGroup>
      </DialogBody>
      <DialogActions>
        <Button plain>{t('cancel')}</Button>
        {pins.start ? <Pin n={pins.start} at="above" cancel="-mr-3" /> : null}
        <Button>{c.rendered.startDocuments}</Button>
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
              custom
              advancedOpen
              pins={{ scope: 1, summary: 2, format: 3, names: 4, preview: 5, folders: 6, advanced: 7, start: 8 }}
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

/** An Egyéni pattern as the dialog shows it, with its `[field]` parts tinted. */
function PatternText({ pattern }: { pattern: string }) {
  const parts = pattern.split(/(\[[^\]]+\])/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('[') ? (
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

/** A choice as the dialog's Segmented control draws its selected option. */
function ChoiceChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-white px-2.5 py-1 text-xs font-medium text-zinc-900 shadow-sm ring-1 ring-zinc-200">
      {children}
    </span>
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
                  {p.preset ? (
                    <ChoiceChip>{p.preset}</ChoiceChip>
                  ) : (
                    <>
                      <ChoiceChip>{c.help.customHead}</ChoiceChip>
                      <p className="mt-1.5 break-all font-mono text-xs text-zinc-800">
                        <PatternText pattern={p.pattern ?? ''} />
                      </p>
                    </>
                  )}
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

/** The DATEV finish toast: closeButton and the CSV letöltése action (runner.ts). */
export function DatevDoneToast({ locale, pin }: { locale: Locale; pin?: number }) {
  const c = exportCopy[locale]
  return (
    <li className={clsx(ts.toast, ts.success)} data-sonner-toast="" data-type="success">
      <button type="button" aria-label="Close toast" className={ts.close} data-close-button="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className={ts.icon} data-icon="">
        <SuccessIcon />
      </div>
      <div className={ts.content} data-content="">
        <div className={ts.title} data-title="">
          {c.rendered.toastDoneDatev}
        </div>
      </div>
      <button type="button" className={ts.button} data-button="true" data-action="true">
        {c.ui['document_export.toast_download_csv']}
      </button>
      {pin ? <Pin n={pin} at="right" cancel="-ml-1.5" /> : null}
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
              <ExportDialogPanel locale={locale} datev advancedOpen pins={{ format: 1, preview: 2, datevFolders: 3 }} />
            </div>
          </AppScreen>
          <div inert>
            <FileTree title={c.help.datevZip} lines={c.treeDatev} />
          </div>
          <div className="min-w-0">
            <p className="mb-2 text-xs font-semibold text-zinc-500">{c.help.datevToast}</p>
            <AppScreen minWidth={TOAST_MIN_WIDTH}>
              <div className="flex justify-end bg-white p-6">
                <ol className={ts.toaster} dir="ltr" data-sonner-toaster="true" data-sonner-theme="light">
                  <DatevDoneToast locale={locale} pin={4} />
                </ol>
              </div>
            </AppScreen>
          </div>
        </div>
      }
    >
      {children}
    </Figure>
  )
}
