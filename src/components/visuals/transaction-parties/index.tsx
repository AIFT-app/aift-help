// An app screen for the bank-transactions article: the transaction's Parties
// (Felek) card.
//
// Rebuilt 1:1 from aift-web (origin/main, 2026-10-08, PRD party-preview-panel),
// class for class, with the real Catalyst Badge from the help mirror:
//   the card   src/components/transaction/TransactionFelekCard.tsx
//   the tiles  src/components/detail/PartyTile.tsx (the whole tile is the link,
//              D9 revised 2026-10-08)
// It is a payment out (debit), so our company is the payer on top and the
// partner the payee below, as the viewer who may edit sees it: the Edit link in
// the header, the pickers collapsed (the hidden edit region is kept, empty, so
// the element tree matches the app's). When one of those files changes,
// re-copy the markup here. Data comes from ./copy.ts and is fictional.

import { ArrowDownIcon, ChevronRightIcon, PencilSquareIcon } from '@heroicons/react/16/solid'
import type { Locale } from '@/lib/i18n'
import { Badge } from '@/components/catalyst/badge'
import { AppScreen, Figure, Pin } from '../kit'
import { OUR_ACCOUNT, OUR_COMPANY, PARTNER, PARTNER_IBAN, transactionPartiesCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

// PartyTile.tsx `box` + the link's own classes, verbatim.
const BOX = 'block rounded-xl border px-3 py-2.5'
const BOX_US = 'border-blue-200 bg-blue-50/50 dark:border-blue-500/40 dark:bg-blue-500/5'
const BOX_THEM = 'border-zinc-200 dark:border-zinc-700'
const LINK =
  'transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
const LINK_US = 'hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-500/60 dark:hover:bg-blue-500/10'
const LINK_THEM = 'hover:border-zinc-300 hover:bg-zinc-950/[0.025] dark:hover:border-zinc-600 dark:hover:bg-white/5'
const HEAD = 'flex items-center gap-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-zinc-500'
const OPEN =
  'inline-flex items-center gap-0.5 font-medium normal-case tracking-normal text-blue-600 dark:text-blue-400'
const NAME = 'mt-0.5 line-clamp-2 wrap-anywhere text-sm font-semibold text-zinc-900 dark:text-zinc-100'
const DETAILS = 'mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500'

function Tile({
  us,
  role,
  name,
  details,
  badge,
  openLabel,
  marker,
}: {
  us: boolean
  role: string
  name: string
  details: React.ReactNode
  badge: React.ReactNode
  openLabel: string
  marker: number
}) {
  return (
    <div>
      <a className={`${BOX} ${us ? BOX_US : BOX_THEM} ${LINK} ${us ? LINK_US : LINK_THEM}`}>
        <div className={HEAD}>
          <Pin n={marker} at="left" cancel="-mr-2" />
          <span>{role}</span>
          {badge}
          <span className={OPEN}>
            {openLabel}
            <ChevronRightIcon className="size-3.5" aria-hidden="true" />
          </span>
        </div>
        <div className={NAME} title={name}>
          {name}
        </div>
        <div className={DETAILS}>{details}</div>
      </a>
    </div>
  )
}

export function TransactionPartiesCard({ locale }: { locale: Locale }) {
  const c = transactionPartiesCopy[locale]
  const ui = c.ui
  return (
    <section
      id="tx-felek-card"
      className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900"
    >
      <div className="mb-3 flex items-center">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {ui['transactions.detail.felek.heading']}
        </h2>
        <button
          type="button"
          className="ml-auto inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          <PencilSquareIcon className="size-3.5" />
          {ui['transactions.detail.felek.edit']}
        </button>
        <Pin n={3} at="right" cancel="" />
      </div>

      <Tile
        us
        role={ui['transactions.detail.felek.payer']}
        name={OUR_COMPANY}
        details={
          <span className="tabular-nums">
            {OUR_ACCOUNT}
            <span className="ml-1">{`(${c.nickname})`}</span>
          </span>
        }
        badge={
          <Badge color="blue" className="ml-auto">
            {ui['invoices.assignment.usBadge']}
          </Badge>
        }
        openLabel={ui['record_preview.party_details']}
        marker={1}
      />
      <div className="flex items-center gap-2 py-1.5 pl-5 text-xs text-zinc-400">
        <ArrowDownIcon className="size-3.5" aria-hidden="true" />
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {ui['transactions.slide_over.expense']}
        </span>
      </div>
      <Tile
        us={false}
        role={ui['transactions.detail.felek.payee']}
        name={PARTNER}
        details={<span className="font-mono break-all">{PARTNER_IBAN}</span>}
        badge={
          <span className="ml-auto">
            <Badge color="green">{ui['invoices.detail.felek.verified']}</Badge>
          </span>
        }
        openLabel={ui['record_preview.party_details']}
        marker={2}
      />

      {/* The collapsed edit region (the pickers), as the app renders it. */}
      <div className="mt-3 space-y-3 border-t border-dashed border-zinc-300 pt-3 dark:border-zinc-600 hidden">
        <div>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            {ui['transactions.detail.felek.partner_picker']}
          </p>
        </div>
      </div>
    </section>
  )
}

// The card sits in the left column of the transaction page; laid out at the
// article's own width on a desktop window so phones (zoomed, and the Enlarge
// view) show the same layout.
const CARD_MIN_WIDTH = 640

export function TransactionPartiesFigure({ locale, children }: FigureProps) {
  return (
    <Figure
      alt={transactionPartiesCopy[locale].help.alt}
      bleed
      wide
      zoomable={locale}
      zoomWidth={CARD_MIN_WIDTH}
      art={
        <AppScreen minWidth={CARD_MIN_WIDTH}>
          {/* A crop of the transaction page around the card: 16px each side. */}
          <div className="px-4 py-4">
            <TransactionPartiesCard locale={locale} />
          </div>
        </AppScreen>
      }
    >
      {children}
    </Figure>
  )
}
