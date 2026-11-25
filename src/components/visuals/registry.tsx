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
import { MatchingOverviewFigure, PartnerLedgerFigure } from './matching-overview'
import { HessynExportFigure, RlbFixPanelFigure } from './exports'
import {
  AccountNotificationsFigure,
  AccountProfileFigure,
  AccountSecurityFigure,
  RecoveryCodesFigure,
  SecondStepFigure,
  SupportAccessFigure,
} from './account'
import { CreateFileDialogFigure, PaymentFileDetailFigure, PaymentFileFigure, PaymentFlowFigure } from './payments'
import { ApprovalRulesFigure, RoutingLadderFigure } from './approval-setup'
import { InvoiceLifecycleFigure, InvoiceListFigure } from './invoices'
import {
  DocumentExportDatevFigure,
  DocumentExportDialogFigure,
  DocumentExportEntryFigure,
  DocumentExportNamingFigure,
  DocumentExportToastsFigure,
  DocumentExportZipFigure,
} from './invoices/export'
import { CompanyMatchFigure, CompanyRecognitionFigure } from './companies'
import { TransactionTypeEditorFigure, TransactionTypeFlowFigure } from './transaction-types'
import { ReportDrillDownFigure, ReportPageFigure, ReportStructureFigure } from './reports'
import { AccessDecisionFigure, RolesTabFigure } from './roles'
import { PartnerBankAccountsFigure, PartnerRecognitionFigure, PartnerRecognitionFlowFigure } from './partners'
import { UploadPanelFigure } from './uploads'
import { PdfSplitDialogFigure } from './uploads/split'
import { BankConsentLifecycleFigure } from './bank'
import { BusinessCentralApprovalsFigure } from './business-central'
import { McpConsentFigure } from './mcp'
import { ClaudeSkillsSectionFigure } from './claude-skills'
import { SettlementNettingFigure } from './settlement'
import { CashPoolSectionFigure } from './cash-pool'
import { CategorizationBandsFigure } from './categorization'
import { TwoRatesFigure } from './currency'
import { OnboardingStepMapFigure } from './onboarding'
import { VatGroupStepsFigure } from './vat-groups'
import { StatementsTabFigure } from './statements'
import { BankTransactionListFigure } from './bank-transactions'
import { TransactionPartiesFigure } from './transaction-parties'
import { TriageDestinationsFigure } from './intake'
import { PartnerRulesFigure } from './partner-rules'
import { VatSetupActionsFigure, VatSetupPreviewFigure } from './vat-setup'
import { DocumentsListFigure } from './documents'
import { VatLinesGridFigure } from './vat-lines'
import { FocusChipFigure } from './focus'
import { ClosingPeriodFigure } from './closing'
import { MessageComposerFigure } from './composer'
import { LedgerFiltersFigure } from './ledger'
import { SelectionGridFigure } from './grid'
import { LanguageLadderFigure } from './language'
import { RegistryPanelFigure } from './registry-panel'
import { FoldedVatFigure } from './folded-vat'
import { BillingDetailsDialogFigure, PlanPickerFigure } from './billing'
import { MissionControlRulesFigure, MissionControlTopFigure } from './mission-control'

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
  MatchingOverviewFigure,
  PartnerLedgerFigure,
  RlbFixPanelFigure,
  HessynExportFigure,
  AccountProfileFigure,
  AccountSecurityFigure,
  RecoveryCodesFigure,
  SecondStepFigure,
  AccountNotificationsFigure,
  SupportAccessFigure,
  PaymentFlowFigure,
  PaymentFileFigure,
  CreateFileDialogFigure,
  PaymentFileDetailFigure,
  ApprovalRulesFigure,
  RoutingLadderFigure,
  InvoiceLifecycleFigure,
  InvoiceListFigure,
  DocumentExportEntryFigure,
  DocumentExportDialogFigure,
  DocumentExportNamingFigure,
  DocumentExportZipFigure,
  DocumentExportToastsFigure,
  DocumentExportDatevFigure,
  CompanyMatchFigure,
  CompanyRecognitionFigure,
  TransactionTypeFlowFigure,
  TransactionTypeEditorFigure,
  ReportStructureFigure,
  ReportPageFigure,
  ReportDrillDownFigure,
  AccessDecisionFigure,
  RolesTabFigure,
  PartnerRecognitionFlowFigure,
  PartnerRecognitionFigure,
  PartnerBankAccountsFigure,
  UploadPanelFigure,
  PdfSplitDialogFigure,
  BankConsentLifecycleFigure,
  BusinessCentralApprovalsFigure,
  McpConsentFigure,
  ClaudeSkillsSectionFigure,
  SettlementNettingFigure,
  CashPoolSectionFigure,
  CategorizationBandsFigure,
  TwoRatesFigure,
  OnboardingStepMapFigure,
  VatGroupStepsFigure,
  StatementsTabFigure,
  BankTransactionListFigure,
  TransactionPartiesFigure,
  TriageDestinationsFigure,
  PartnerRulesFigure,
  VatSetupActionsFigure,
  VatSetupPreviewFigure,
  DocumentsListFigure,
  VatLinesGridFigure,
  FocusChipFigure,
  ClosingPeriodFigure,
  MessageComposerFigure,
  LedgerFiltersFigure,
  SelectionGridFigure,
  LanguageLadderFigure,
  RegistryPanelFigure,
  FoldedVatFigure,
  PlanPickerFigure,
  BillingDetailsDialogFigure,
  MissionControlTopFigure,
  MissionControlRulesFigure,
}

export function visualComponents(locale: Locale) {
  return Object.fromEntries(
    Object.entries(FIGURES).map(([name, Figure]) => [
      name,
      ({ children }: { children?: React.ReactNode }) => <Figure locale={locale}>{children}</Figure>,
    ]),
  )
}
