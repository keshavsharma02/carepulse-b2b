import type {
  ComplianceAudit,
  FinancialReport,
  PatientOutcomeMetric,
  ReportsSummary,
} from '../types';

export const reportsSummary: ReportsSummary = {
  totalRevenueYtd: '$4.2M',
  revenueYoyChange: '+12.4% vs last year',
  processingEfficiency: 98.2,
  processingGoal: 95,
  dateRangeLabel: 'Oct 1, 2023 - Oct 31, 2023',
  pendingReportsCount: 15,
  criticalReportsCount: 4,
};

export const financialReports: FinancialReport[] = [
  {
    id: 'fin-1',
    billingCycle: 'October 2023 - Week 4',
    revenue: '$142,550.00',
    claimsProcessed: 1240,
    status: 'Finalized',
  },
  {
    id: 'fin-2',
    billingCycle: 'October 2023 - Week 3',
    revenue: '$128,400.00',
    claimsProcessed: 1105,
    status: 'Finalized',
  },
  {
    id: 'fin-3',
    billingCycle: 'October 2023 - Week 2',
    revenue: '$155,210.00',
    claimsProcessed: 1390,
    status: 'Pending Audit',
  },
];

export const patientOutcomeMetrics: PatientOutcomeMetric[] = [
  {
    id: 'out-1',
    title: 'Recovery Rate - Post Op',
    department: 'General Surgery Dept.',
    value: '94%',
    trendLabel: '2.1%',
    trendDirection: 'up',
    tone: 'tertiary',
  },
  {
    id: 'out-2',
    title: 'Treatment Adherence',
    department: 'Chronic Care Program',
    value: '88%',
    trendLabel: '0.5%',
    trendDirection: 'down',
    tone: 'secondary',
  },
  {
    id: 'out-3',
    title: 'Patient Satisfaction Index',
    department: 'Annual Aggregated Score',
    value: '4.8',
    trendLabel: 'Top 5%',
    trendDirection: 'neutral',
    tone: 'primary',
  },
];

export const complianceAudits: ComplianceAudit[] = [
  {
    id: 'cmp-1',
    title: 'Annual Security Review 2023',
    dateLabel: 'Completed on Oct 12, 2023',
    status: 'completed',
  },
  {
    id: 'cmp-2',
    title: 'Access Control Audit',
    dateLabel: 'Completed on Sept 28, 2023',
    status: 'completed',
  },
  {
    id: 'cmp-3',
    title: 'Patient Data Encryption Check',
    dateLabel: 'Scheduled for Nov 15, 2023',
    status: 'scheduled',
  },
  {
    id: 'cmp-4',
    title: 'Audit Log Integrity Scan',
    dateLabel: 'Completed on Sept 14, 2023',
    status: 'completed',
  },
];

export const matchesReportSearch = (query: string, ...parts: string[]) => {
  const term = query.trim().toLowerCase();
  if (!term) return true;
  return parts.some((part) => part.toLowerCase().includes(term));
};
