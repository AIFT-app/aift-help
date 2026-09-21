// Illustrations available to every article, with the page's locale bound so
// an MDX file writes just `<ApprovalQueueFigure>caption</ApprovalQueueFigure>`.
// Register a new illustration here to make it usable in content/*.mdx.

import type { Locale } from '@/lib/i18n'
import {
  ApprovalBulkBarFigure,
  ApprovalEmailsFigure,
  ApprovalLifecycleFigure,
  ApprovalQueueFigure,
  DeclineDialogFigure,
} from './approvals'
import { MatchingOutcomeFigure, MatchingQueueFigure, TransactionMatchFigure } from './matching'
import { PaymentFileFigure, PaymentFlowFigure } from './payments'
import { ApprovalRulesFigure, RoutingLadderFigure } from './approval-setup'
import { InvoiceLifecycleFigure, InvoiceListFigure } from './invoices'

type WithLocale = { locale: Locale; children?: React.ReactNode }

const FIGURES: Record<string, (props: WithLocale) => React.ReactNode> = {
  ApprovalQueueFigure,
  ApprovalBulkBarFigure,
  DeclineDialogFigure,
  ApprovalLifecycleFigure,
  ApprovalEmailsFigure,
  MatchingOutcomeFigure,
  MatchingQueueFigure,
  TransactionMatchFigure,
  PaymentFlowFigure,
  PaymentFileFigure,
  ApprovalRulesFigure,
  RoutingLadderFigure,
  InvoiceLifecycleFigure,
  InvoiceListFigure,
}

export function visualComponents(locale: Locale) {
  return Object.fromEntries(
    Object.entries(FIGURES).map(([name, Figure]) => [
      name,
      ({ children }: { children?: React.ReactNode }) => <Figure locale={locale}>{children}</Figure>,
    ]),
  )
}
