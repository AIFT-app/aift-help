// aift-help copy of aift-web DocumentKindIcon (PRD: document-kind-icons). The one glyph set that says what a document IS,
// family "Papírforma" (Balázs, 2026-11-06): a filled sheet with the kind cut
// out of it. Seven kinds share the sheet; a receipt is a strip with a zigzag
// bottom; a proforma is a dashed outline (not a real document yet).
//
// The cut is a real hole (an SVG mask), not a paint in the card colour, so the
// same glyph sits on a white row, a hovered grey row, a dark card and an amber
// rail without a halo. One mask per instance (useId): a list draws dozens.
//
// Keep in step with aift-web/src/components/document-kind/DocumentKindIcon.tsx:
// the help figure is a 1:1 rebuild of the screen (help-screen-css-diff.mjs).
// Colour comes from `currentColor`: grey in a row (`text-zinc-400
// dark:text-zinc-500`), ink beside a title (`text-zinc-900 dark:text-white`).
// Never a tone and never indigo: a kind is a fact, not a status or the thing
// to act on (aift-ux). `label` is the kind's translated name and is required:
// it is the hover title and the accessible name, so shape never stands alone.

import { useId, type ReactNode } from 'react'
import clsx from 'clsx'
export type DocumentKind =
  | 'invoice'
  | 'purchase_ticket'
  | 'receipt'
  | 'proforma'
  | 'credit_note'
  | 'bank_statement'
  | 'contract'
  | 'supporting_document'
  | 'other'

export type DocumentKindIconSize = 16 | 20 | 24

const SHEET = 'M5.25 2.75H11.5V7.25H16V16.75A1.5 1.5 0 0 1 14.5 18.25H5.5A1.5 1.5 0 0 1 4 16.75V4.25A1.5 1.5 0 0 1 5.25 2.75Z'
const SHEET_CORNER = 'M13 3.1L15.65 5.75H13Z'
const RECEIPT = 'M6 2.75h8v13.5l-1.6-1.25-1.6 1.25-1.6-1.25-1.6 1.25L6 16.25z'
const PROFORMA_SHEET = 'M5.25 2.75h6.25L16 7.25v9.5c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5V4.25c0-.83.67-1.5 1.5-1.5z'
const PROFORMA_FOLD = 'M11.5 2.75v4.5H16'

// A stroke cut out of the body (black inside the mask = transparent).
function Cut({ d, width = 1.5 }: { d: string; width?: number }) {
  return <path d={d} fill="none" stroke="#000" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
}

// The mark per kind, drawn inside the mask over a white body.
const MARKS: Record<Exclude<DocumentKind, 'proforma'>, ReactNode> = {
  invoice: <Cut d="M7 10.75h6M7 13.25h6M7 15.75h3.5" />,
  // A leaf (the produce), its midrib painted back in.
  purchase_ticket: (
    <>
      <path d="M7.25 16.25c0-3.2 2.2-5.35 5.75-5.5-.2 3.55-2.3 5.75-5.75 5.5z" fill="#000" />
      <path d="M7.6 15.9l3-3" fill="none" stroke="#fff" strokeWidth={1.1} strokeLinecap="round" />
    </>
  ),
  receipt: <Cut d="M8.25 6.75h3.5M8.25 9.5h3.5M8.25 12.25h2" />,
  // A return arrow: the amount goes back.
  credit_note: <Cut d="M13 15.25H9.75a1.75 1.75 0 0 1 0-3.5H13M11.5 10.25l1.5 1.5-1.5 1.5" />,
  // Bank pillars under a roof.
  bank_statement: <Cut d="M7 15.75h6M7.75 15.75v-3M10 15.75v-3M12.25 15.75v-3M7 12.5l3-1.75 3 1.75" />,
  // A signature and a seal.
  contract: (
    <>
      <Cut d="M7 15.5c1-1.9 1.9-1.9 2.9 0s1.9 1.9 2.9 0" />
      <circle cx="12.75" cy="11.25" r="1.25" fill="none" stroke="#000" strokeWidth={1.5} />
    </>
  ),
  supporting_document: <Cut d="M8.6 15.9l3.7-3.7a1.45 1.45 0 0 0-2.05-2.05l-3.45 3.45a2.45 2.45 0 0 0 3.46 3.46l3.2-3.2" />,
  other: (
    <g fill="#000">
      <circle cx="7.75" cy="13.25" r=".95" />
      <circle cx="10" cy="13.25" r=".95" />
      <circle cx="12.25" cy="13.25" r=".95" />
    </g>
  ),
}

export function DocumentKindGlyph({
  kind,
  label,
  size = 16,
  className,
  testId,
}: {
  kind: DocumentKind
  /** The kind's translated name: the hover title and the accessible name. */
  label: string
  size?: DocumentKindIconSize
  className?: string
  testId?: string
}) {
  // useId's delimiters are not safe inside url(#…) in every browser.
  const maskId = `dk-${useId().replace(/[^A-Za-z0-9_-]/g, '')}`
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 20 20',
    role: 'img' as const,
    'aria-label': label,
    className: clsx('shrink-0', className),
    'data-testid': testId,
    'data-kind': kind,
  }

  if (kind === 'proforma') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <title>{label}</title>
        <path d={PROFORMA_SHEET} strokeDasharray="2.3 1.7" />
        <path d={PROFORMA_FOLD} />
        <path d="M7 11.25h6M7 13.75h4" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <title>{label}</title>
      <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={20} height={20}>
        {kind === 'receipt' ? (
          <path d={RECEIPT} fill="#fff" />
        ) : (
          <>
            <path d={SHEET} fill="#fff" />
            <path d={SHEET_CORNER} fill="#fff" />
          </>
        )}
        {MARKS[kind]}
      </mask>
      <rect width={20} height={20} fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}
