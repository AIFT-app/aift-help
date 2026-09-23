// The two approvals a Business Central connection needs, for the
// business-central article.
//
// A timeline rather than an app screen: the article's core idea is that two
// different people act, in order, and that the connection sits in a named
// state between them. The state pills are the app's own labels
// (aift-web settings.business_central.state_*, origin/main 2026-09-22).

import type { Locale } from '@/lib/i18n'
import { Figure } from '../kit'
import { StepList } from '../StepList'
import { bcCopy } from './copy'

type FigureProps = { locale: Locale; children?: React.ReactNode }

export function BusinessCentralApprovalsFigure({ locale, children }: FigureProps) {
  const c = bcCopy[locale]
  const s = c.help.steps
  return (
    <Figure
      alt={c.help.alt}
      art={
        <StepList
          steps={[
            {
              title: s.link,
              detail: s.linkDetail,
              outcomes: [{ kind: 'pill', tone: 'amber', label: c.ui.state_awaiting_microsoft }],
            },
            {
              title: s.microsoft,
              detail: s.microsoftDetail,
              outcomes: [{ kind: 'pill', tone: 'amber', label: c.ui.state_awaiting_business_central }],
            },
            {
              title: s.register,
              detail: s.registerDetail,
              outcomes: [{ kind: 'pill', tone: 'emerald', label: c.ui.state_connected }],
            },
          ]}
          footnote={{ text: s.error, outcomes: [{ kind: 'pill', tone: 'zinc', label: c.ui.state_error }] }}
        />
      }
    >
      {children}
    </Figure>
  )
}
