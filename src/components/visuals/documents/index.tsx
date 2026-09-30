// The Documents list, for the documents article.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-09-28), class for class:
//   src/app/(app)/workspaces/[workspaceId]/documents/_components/DocumentsList.tsx
//
// WHY THIS SCREEN
//
//   Four of the article's corrections are things you see rather than read: the
//   type badge carries the AI's own free-text `document_type`, UNTRANSLATED, so
//   it reads in the document's language whatever the interface language is; a
//   duplicate is filed inline under its original rather than set aside, with
//   its summary replaced by what it duplicates; confidence is its own column;
//   and the rows are rows, not cards. The old article described a page that
//   looked different in all four respects.
//
//   Building it found a fifth thing, and corrected the article: the free-text
//   label only ever reaches the badge for a document that is NOT a contract.
//   triage-document writes the AI's finer label ("lease", "nda") into
//   `document_type` and the coarse class into `kind`, and the badge reads
//   `kind === 'contract' ? t('type.contract') : document_type || t('type.other')`
//   — so every contract renders the translated word and its finer label is
//   dropped. Row 1 is that case on purpose: the AI called it a lease, the badge
//   says Contract. Row 2 is a document that is not a contract, so its German
//   label survives into an English or Hungarian interface.
//
// MARKER PLACEMENT: the row list is `overflow-hidden`, so a marker that
// reaches past the edge of a cell or past the first or last row is clipped.
// Every Pin inside the list therefore sits after a line in the wide first
// column, and points at its ROW; the legend names the column it is about.
//
// A server component, so the rows are anchors without href and the Upload
// button carries no handler; the screen is `inert` regardless. Labels come from
// ./copy.ts, keyed by aift-web message key; every document is fictional.

import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Heading } from '@/components/catalyst/heading'
import { AppScreen, Figure, Pin } from '../kit'
import { ACTIVE_FILTER, DUPLICATE_COUNT, FILTERS, ROWS, documentsCopy } from './copy'

const SCREEN_MIN_WIDTH = 760

/** DocumentsList.tsx statusBadge(), for the three statuses this screen shows. */
const STATUS_COLOR = { ready: 'lime', review: 'amber', processing: 'zinc' } as const

/** Which row carries which numbered marker. */
const PIN_ON_ROW: Record<string, number> = {
  'GRM-DOC-2026-0117': 3,
  'GRM-DOC-2026-0115': 4,
  'GRM-DOC-2026-0114': 5,
}

export function DocumentsListFigure({
  locale,
  children,
}: {
  locale: Locale
  children?: React.ReactNode
}) {
  const c = documentsCopy[locale]
  const ui = c.ui

  return (
    <Figure
      alt={c.help.alt}
      wide
      zoomable={locale}
      zoomWidth={SCREEN_MIN_WIDTH}
      art={
        <AppScreen minWidth={SCREEN_MIN_WIDTH}>
          <div className="bg-white p-4">
            <div>
              {/* aift-web PageTitleRow (components/layout), class for class. */}
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                <div className="min-w-0 flex-1 basis-56">
                  <Heading>{ui['documents.title']}</Heading>
                </div>
                {/* `above` would put the marker outside the screen's top edge,
                    which AppScreen clips; `left` drops it into the flex gap. */}
                <Pin n={1} at="left" cancel="-mr-4" />
                <div className="flex max-w-full flex-wrap items-center gap-2">
                  <Button>{ui['documents.upload']}</Button>
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {ui['documents.description']}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {FILTERS.map((f) => (
                  <a
                    key={f}
                    className={
                      f === ACTIVE_FILTER
                        ? 'flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-white'
                        : 'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-zinc-500 dark:text-zinc-400'
                    }
                  >
                    {ui[`documents.filter.${f}` as keyof typeof ui]}
                    {f === 'duplicates' && DUPLICATE_COUNT > 0 && (
                      <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-400/15 dark:text-amber-300">
                        {DUPLICATE_COUNT}
                      </span>
                    )}
                    {f === 'duplicates' ? <Pin n={2} at="right" cancel="-ml-2" /> : null}
                  </a>
                ))}
              </div>

              <div className="mt-4">
                <ul className="divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                  {ROWS.map((d) => {
                    const isDup = !!d.duplicateOf
                    // DocumentsList.tsx, verbatim: a CONTRACT always renders the
                    // translated label and the AI's finer `document_type` is
                    // dropped; only a non-contract shows the AI's own words.
                    const typeLabel =
                      d.kind === 'contract'
                        ? ui['documents.type.contract']
                        : d.type || ui['documents.type.other']
                    const meta = [
                      ui[`documents.source.${d.source}` as keyof typeof ui],
                      d.mime,
                      d.size,
                      d.lang,
                    ].join(' · ')
                    const pin = PIN_ON_ROW[d.internalId]
                    return (
                      <li key={d.internalId}>
                        <a className="grid grid-cols-[1fr_88px_56px_72px] items-center gap-3 p-4">
                          <div className="min-w-0">
                            <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                              {d.internalId}
                              {pin ? <Pin n={pin} at="right" cancel="" /> : null}
                            </div>
                            <div className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                              {d.fileName}
                            </div>
                            {isDup ? (
                              <div className="truncate text-xs text-amber-700 dark:text-amber-400">
                                {c.rendered.duplicateOf}
                              </div>
                            ) : c.summaries[d.internalId] ? (
                              <div className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                                {c.summaries[d.internalId]}
                              </div>
                            ) : null}
                            <div className="mt-0.5 truncate text-xs text-zinc-400 dark:text-zinc-500">
                              {meta}
                            </div>
                          </div>
                          <div>
                            <Badge color={d.kind === 'contract' ? 'purple' : 'zinc'}>
                              {typeLabel}
                            </Badge>
                          </div>
                          <div className="text-right text-sm tabular-nums text-zinc-600 dark:text-zinc-300">
                            {d.pct ?? '—'}
                          </div>
                          <div className="text-right">
                            {isDup ? (
                              <Badge color="amber">{ui['documents.duplicate_label']}</Badge>
                            ) : (
                              <Badge color={STATUS_COLOR[d.status]}>
                                {ui[`documents.status.${d.status}` as keyof typeof ui]}
                              </Badge>
                            )}
                          </div>
                        </a>
                      </li>
                    )
                  })}
                </ul>
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
