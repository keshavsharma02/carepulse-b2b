import {
  ArrowDown,
  ArrowUp,
  Brain,
  CalendarDays,
  CreditCard,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  HeartPulse,
  Info,
  Pill,
  Scale,
  ShieldCheck,
  Star,
  TrendingUp,
} from 'lucide-react';
import {
  complianceAudits,
  financialReports,
  matchesReportSearch,
  patientOutcomeMetrics,
  reportsSummary,
} from '../data/reportsData';
import { useReportsStore } from '../store/reportsStore';
import type {
  ComplianceAudit,
  FinancialReportStatus,
  OutcomeMetricTone,
  OutcomeTrendDirection,
} from '../types';

const financialStatusClass: Record<FinancialReportStatus, string> = {
  Finalized: 'reports-status--finalized',
  'Pending Audit': 'reports-status--pending',
};

const outcomeIconMap = {
  tertiary: HeartPulse,
  secondary: Pill,
  primary: Brain,
} as const;

const outcomeToneClass: Record<OutcomeMetricTone, string> = {
  tertiary: 'reports-outcome-icon--tertiary',
  secondary: 'reports-outcome-icon--secondary',
  primary: 'reports-outcome-icon--primary',
};

const outcomeValueClass: Record<OutcomeMetricTone, string> = {
  tertiary: 'reports-outcome-value--tertiary',
  secondary: 'reports-outcome-value--secondary',
  primary: 'reports-outcome-value--primary',
};

const OutcomeTrend = ({
  direction,
  label,
}: {
  direction: OutcomeTrendDirection;
  label: string;
}) => {
  if (direction === 'up') {
    return (
      <span className="reports-outcome-trend reports-outcome-trend--up">
        <ArrowUp size={14} />
        {label}
      </span>
    );
  }
  if (direction === 'down') {
    return (
      <span className="reports-outcome-trend reports-outcome-trend--down">
        <ArrowDown size={14} />
        {label}
      </span>
    );
  }
  return (
    <span className="reports-outcome-trend reports-outcome-trend--neutral">
      <Star size={12} />
      ({label})
    </span>
  );
};

const ComplianceAction = ({ audit }: { audit: ComplianceAudit }) => {
  if (audit.status === 'scheduled') {
    return (
      <button type="button" className="reports-audit-btn reports-audit-btn--disabled" disabled>
        Pending
      </button>
    );
  }

  return (
    <button type="button" className="reports-audit-btn">
      Report PDF
    </button>
  );
};

export const ReportsPage = () => {
  const searchTerm = useReportsStore((state) => state.searchTerm);

  const filteredFinancial = financialReports.filter((row) =>
    matchesReportSearch(
      searchTerm,
      row.billingCycle,
      row.revenue,
      String(row.claimsProcessed),
      row.status,
    ),
  );

  const filteredOutcomes = patientOutcomeMetrics.filter((metric) =>
    matchesReportSearch(searchTerm, metric.title, metric.department, metric.value),
  );

  const filteredCompliance = complianceAudits.filter((audit) =>
    matchesReportSearch(searchTerm, audit.title, audit.dateLabel),
  );

  return (
    <section className="reports-page">
      <header className="reports-header">
        <div>
          <h1 className="reports-title">Reports &amp; Analytics</h1>
          <p className="reports-subtitle">
            Comprehensive health system data and financial auditing
          </p>
        </div>
        <div className="reports-toolbar">
          <div className="reports-toolbar__range">
            <CalendarDays size={18} />
            <span>{reportsSummary.dateRangeLabel}</span>
          </div>
          <button type="button" className="reports-toolbar__filter">
            <Filter size={16} />
            More Filters
          </button>
          <button type="button" className="btn primary reports-export-btn">
            <Download size={16} />
            Export All
          </button>
        </div>
      </header>

      <div className="reports-grid">
        <article className="reports-card reports-card--financial">
          <div className="reports-card__head">
            <div className="reports-card__title">
              <CreditCard size={20} />
              <h2>Financial Reports</h2>
            </div>
            <div className="reports-card__actions">
              <button type="button" className="reports-icon-btn" aria-label="Export CSV">
                <FileSpreadsheet size={18} />
              </button>
              <button type="button" className="reports-icon-btn" aria-label="Export PDF">
                <FileText size={18} />
              </button>
            </div>
          </div>
          <div className="reports-table-wrap">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Billing Cycle</th>
                  <th>Revenue</th>
                  <th>Claims Processed</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFinancial.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="reports-empty">
                      No financial reports match your search.
                    </td>
                  </tr>
                ) : (
                  filteredFinancial.map((row, index) => (
                    <tr key={row.id} className={index === 1 ? 'is-alt' : undefined}>
                      <td className="reports-table__strong">{row.billingCycle}</td>
                      <td>{row.revenue}</td>
                      <td>{row.claimsProcessed.toLocaleString()}</td>
                      <td>
                        <span className={`reports-status ${financialStatusClass[row.status]}`}>
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <button type="button" className="reports-link-btn">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>

        <div className="reports-metrics">
          <article className="reports-metric-card reports-metric-card--revenue">
            <div>
              <p className="reports-metric-label">Total Revenue YTD</p>
              <p className="reports-metric-value">{reportsSummary.totalRevenueYtd}</p>
            </div>
            <p className="reports-metric-trend">
              <TrendingUp size={18} />
              {reportsSummary.revenueYoyChange}
            </p>
          </article>
          <article className="reports-metric-card reports-metric-card--efficiency">
            <p className="reports-metric-label reports-metric-label--muted">Processing Efficiency</p>
            <p className="reports-metric-value reports-metric-value--dark">
              {reportsSummary.processingEfficiency}%
            </p>
            <div className="reports-progress">
              <div
                className="reports-progress__bar"
                style={{ width: `${reportsSummary.processingEfficiency}%` }}
              />
            </div>
            <p className="reports-metric-note">
              Clinical workflow optimization goal: {reportsSummary.processingGoal}%
            </p>
          </article>
        </div>

        <article className="reports-card">
          <div className="reports-card__head">
            <div className="reports-card__title">
              <HeartPulse size={20} className="reports-icon-tertiary" />
              <h2>Patient Outcome Analytics</h2>
            </div>
            <button type="button" className="reports-chip-btn">
              FULL DATASET
            </button>
          </div>
          <ul className="reports-outcome-list">
            {filteredOutcomes.length === 0 ? (
              <li className="reports-empty">No outcome metrics match your search.</li>
            ) : (
              filteredOutcomes.map((metric) => {
                const Icon = outcomeIconMap[metric.tone];
                return (
                  <li className="reports-outcome-row" key={metric.id}>
                    <div className={`reports-outcome-icon ${outcomeToneClass[metric.tone]}`}>
                      <Icon size={22} />
                    </div>
                    <div className="reports-outcome-body">
                      <h3>{metric.title}</h3>
                      <p>{metric.department}</p>
                    </div>
                    <div className="reports-outcome-stats">
                      <p className={`reports-outcome-value ${outcomeValueClass[metric.tone]}`}>
                        {metric.value}
                      </p>
                      <OutcomeTrend direction={metric.trendDirection} label={metric.trendLabel} />
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </article>

        <article className="reports-card">
          <div className="reports-card__head">
            <div className="reports-card__title">
              <Scale size={20} />
              <h2>Compliance Audits</h2>
            </div>
            <div className="reports-hipaa">
              <ShieldCheck size={16} />
              HIPAA COMPLIANT
            </div>
          </div>
          <ul className="reports-audit-list">
            {filteredCompliance.length === 0 ? (
              <li className="reports-empty">No compliance audits match your search.</li>
            ) : (
              filteredCompliance.map((audit) => (
                <li className="reports-audit-row" key={audit.id}>
                  <div className="reports-audit-row__info">
                    <span
                      className={`reports-audit-dot ${audit.status === 'scheduled' ? 'is-pending' : ''}`}
                      aria-hidden
                    />
                    <div>
                      <p className="reports-audit-title">{audit.title}</p>
                      <p className="reports-audit-date">{audit.dateLabel}</p>
                    </div>
                  </div>
                  <ComplianceAction audit={audit} />
                </li>
              ))
            )}
          </ul>
          <div className="reports-milestone">
            <Info size={20} />
            <p>
              <strong>Next Milestone:</strong> Your organization&apos;s quarterly regulatory
              alignment check is due in 12 days. Please ensure all clinicians have signed the new
              privacy addendum.
            </p>
          </div>
        </article>
      </div>

      <footer className="reports-footer">
        <p>© 2023 CarePulse Health Systems. All rights reserved.</p>
        <nav className="reports-footer__links" aria-label="Legal links">
          <a href="#data-policy">Data Policy</a>
          <a href="#hipaa">HIPAA Statement</a>
          <a href="#status">System Status</a>
        </nav>
      </footer>
    </section>
  );
};
