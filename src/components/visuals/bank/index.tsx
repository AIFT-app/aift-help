// The life of a bank connection, for the bank-accounts article.
//
// A timeline rather than an app screen: what changes at each point is the
// status badge on the connection card AND which buttons exist, and the app
// never shows those side by side. The status badges are the app's own
// ConnectionStatusBadge: Catalyst Badge, same colours, same labels (aift-web
// BankConnectionCard.tsx and messages master_data.bank_accounts.connection_card.
// status_*, origin/main 2026-11-25), rendered with the app's fonts by StepList.

import type { Locale } from '@/lib/i18n'
import { Figure } from '../kit'
import { StepList } from '../StepList'
import { bankCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

export function BankConsentLifecycleFigure({ locale, children }: FigureProps) {
  const c = bankCopy[locale]
  const s = c.help.steps
  return (
    <Figure
      alt={c.help.alt}
      art={
        <StepList
          steps={[
            {
              title: s.connect,
              detail: s.connectDetail,
              outcomes: [{ kind: 'badge', color: 'green', label: c.ui['status_active'] }],
            },
            { title: s.sync, detail: s.syncDetail },
            {
              title: s.warning,
              detail: s.warningDetail,
              outcomes: [{ kind: 'badge', color: 'amber', label: c.rendered.expiresIn }],
            },
            {
              title: s.expired,
              detail: s.expiredDetail,
              outcomes: [{ kind: 'badge', color: 'red', label: c.ui['status_expired'] }],
            },
            {
              title: s.renew,
              detail: s.renewDetail,
              outcomes: [{ kind: 'badge', color: 'green', label: c.ui['status_active'] }],
            },
          ]}
          footnote={{
            text: s.disconnect,
            outcomes: [{ kind: 'badge', color: 'zinc', label: c.ui['status_disconnected'] }],
          }}
        />
      }
    >
      {children}
    </Figure>
  )
}
