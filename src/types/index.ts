export type PatientStatus = 'Stable' | 'Critical' | 'Observation';

export interface Patient {
  id: string;
  name: string;
  code: string;
  primaryCondition: string;
  lastVisit: string;
  nextAppointment: string;
  status: PatientStatus;
  avatarUrl?: string;
}

export interface Kpi {
  label: string;
  value: string;
  trend: string;
}

export interface TrendPoint {
  day: string;
  admissions: number;
  discharges: number;
}

export type AppointmentType = 'FOLLOW-UP' | 'CONSULT' | 'URGENT' | 'CHECKUP';

export type CalendarEventTone = 'primary' | 'emerald' | 'amber';

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  tone: CalendarEventTone;
  patientId?: string;
}

export interface UpcomingAppointment {
  id: string;
  type: AppointmentType;
  timeLabel: string;
  patientName: string;
  doctorName: string;
  patientId?: string;
}

export type DoctorStatus = 'Available' | 'In Consultation' | 'Unavailable';

export interface ScheduleDoctor {
  id: string;
  name: string;
  status: DoctorStatus;
  avatarUrl: string;
}

export interface ScheduleStats {
  todaysVisits: number;
  newPatients: number;
  waitlist: number;
}

export type FinancialReportStatus = 'Finalized' | 'Pending Audit';

export interface FinancialReport {
  id: string;
  billingCycle: string;
  revenue: string;
  claimsProcessed: number;
  status: FinancialReportStatus;
}

export type OutcomeMetricTone = 'tertiary' | 'secondary' | 'primary';

export type OutcomeTrendDirection = 'up' | 'down' | 'neutral';

export interface PatientOutcomeMetric {
  id: string;
  title: string;
  department: string;
  value: string;
  trendLabel: string;
  trendDirection: OutcomeTrendDirection;
  tone: OutcomeMetricTone;
}

export type ComplianceAuditStatus = 'completed' | 'scheduled';

export interface ComplianceAudit {
  id: string;
  title: string;
  dateLabel: string;
  status: ComplianceAuditStatus;
}

export interface ReportsSummary {
  totalRevenueYtd: string;
  revenueYoyChange: string;
  processingEfficiency: number;
  processingGoal: number;
  dateRangeLabel: string;
  pendingReportsCount: number;
  criticalReportsCount: number;
}
