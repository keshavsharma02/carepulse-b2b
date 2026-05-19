import {
  Calendar,
  FileText,
  Plus,
  Printer,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { reportsSummary } from '../data/reportsData';

type SummaryCard = {
  label: string;
  value: string;
  trend: string;
  trendTone: 'positive' | 'neutral' | 'critical';
  icon: typeof Users;
  accent: string;
  to?: string;
};

const summaryCards: SummaryCard[] = [
  {
    label: 'Active Patients',
    value: '1,284',
    trend: '+12% this month',
    trendTone: 'positive',
    icon: UserPlus,
    accent: '#0369a1',
  },
  {
    label: 'Appointments Today',
    value: '42',
    trend: '8 remaining',
    trendTone: 'positive',
    icon: Calendar,
    accent: '#0369a1',
  },
  {
    label: 'Pending Reports',
    value: String(reportsSummary.pendingReportsCount),
    trend: `${reportsSummary.criticalReportsCount} critical`,
    trendTone: 'critical',
    icon: FileText,
    accent: '#0369a1',
    to: '/reports',
  },
];

type ActivityRow = {
  initials: string;
  name: string;
  patientId: string;
  activity: string;
  status: 'Reviewed' | 'Urgent' | 'Processing' | 'Success';
  time: string;
};

const activityRows: ActivityRow[] = [
  {
    initials: 'EJ',
    name: 'Elena Jameson',
    patientId: '#8821-A',
    activity: 'Blood Work Results uploaded',
    status: 'Reviewed',
    time: '12 mins ago',
  },
  {
    initials: 'MR',
    name: 'Marcus Reed',
    patientId: '#4312-C',
    activity: 'Prescription refill requested',
    status: 'Urgent',
    time: '45 mins ago',
  },
  {
    initials: 'SW',
    name: 'Sarah Waters',
    patientId: '#9011-B',
    activity: 'Check-in for Cardiac Rehab',
    status: 'Processing',
    time: '1 hour ago',
  },
  {
    initials: 'DB',
    name: 'David Brooks',
    patientId: '#5542-D',
    activity: 'Initial consultation completed',
    status: 'Success',
    time: '2 hours ago',
  },
];

const statusToneMap: Record<ActivityRow['status'], string> = {
  Reviewed: 'success',
  Success: 'success',
  Urgent: 'error',
  Processing: 'info',
};

type StaffingMetric = {
  label: string;
  current: number;
  total: number;
  tone: 'primary' | 'secondary';
};

const staffingMetrics: StaffingMetric[] = [
  { label: 'Nurses on Duty', current: 12, total: 14, tone: 'primary' },
  { label: 'Clinicians Active', current: 8, total: 10, tone: 'secondary' },
  { label: 'Support Staff', current: 5, total: 6, tone: 'primary' },
];

const shiftLeaders = [
  { name: 'Dr. Sarah Chen', initials: 'SC', tag: 'ON-CALL', tagTone: 'success' as const },
  { name: 'Nurse Robert Wilson', initials: 'RW', tag: 'NIGHT SHIFT', tagTone: 'muted' as const },
];

export const DashboardPage = () => {
  return (
    <section className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <h1 className="dashboard-welcome-title">Welcome back, Dr. Miller</h1>
          <p className="dashboard-welcome-subtitle">
            Here is what's happening in your clinic today.
          </p>
        </div>
        <div className="dashboard-welcome-actions">
          <Link className="btn primary dashboard-cta" to="/schedule">
            <Plus size={16} />
            New Appointment
          </Link>
          <Link className="btn ghost dashboard-cta" to="/schedule">
            <Printer size={16} />
            Daily Schedule
          </Link>
        </div>
      </div>

      <div className="dashboard-summary">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          const inner = (
            <>
              <div className="dashboard-summary-bg" aria-hidden>
                <Icon size={96} strokeWidth={1.5} />
              </div>
              <div className="dashboard-summary-head">
                <Icon size={18} />
                <span>{card.label}</span>
              </div>
              <div className="dashboard-summary-value-row">
                <span className="dashboard-summary-value">{card.value}</span>
                <span className={`dashboard-summary-trend ${card.trendTone}`}>{card.trend}</span>
              </div>
            </>
          );

          return card.to ? (
            <Link
              className="dashboard-summary-card dashboard-summary-card--link"
              key={card.label}
              to={card.to}
            >
              {inner}
            </Link>
          ) : (
            <article className="dashboard-summary-card" key={card.label}>
              {inner}
            </article>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <article className="dashboard-card dashboard-activity">
          <div className="dashboard-card-head">
            <h3>Recent Patient Activity</h3>
            <button className="dashboard-link" type="button">
              View All
            </button>
          </div>
          <div className="dashboard-activity-table-wrap">
            <table className="dashboard-activity-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Activity</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {activityRows.map((row) => (
                  <tr key={row.patientId}>
                    <td>
                      <div className="dashboard-patient-cell">
                        <div className="dashboard-avatar">{row.initials}</div>
                        <div>
                          <p className="dashboard-patient-name">{row.name}</p>
                          <p className="dashboard-patient-id">ID: {row.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td>{row.activity}</td>
                    <td>
                      <span className={`dashboard-status ${statusToneMap[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="dashboard-muted">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="dashboard-card dashboard-staffing">
          <div className="dashboard-card-head">
            <h3>Staffing Overview</h3>
          </div>
          <div className="dashboard-staffing-body">
            <div className="dashboard-staffing-metrics">
              {staffingMetrics.map((metric) => {
                const percent = Math.round((metric.current / metric.total) * 100);
                return (
                  <div className="dashboard-staffing-item" key={metric.label}>
                    <div className="dashboard-staffing-label">
                      <span>{metric.label}</span>
                      <span className={`dashboard-staffing-count ${metric.tone}`}>
                        {metric.current} / {metric.total}
                      </span>
                    </div>
                    <div className="dashboard-progress">
                      <div
                        className={`dashboard-progress-bar ${metric.tone}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="dashboard-shift-leaders">
              <p className="dashboard-section-label">Shift Leaders</p>
              <div className="dashboard-leader-list">
                {shiftLeaders.map((leader) => (
                  <div className="dashboard-leader-row" key={leader.name}>
                    <div className="dashboard-leader-avatar">{leader.initials}</div>
                    <span className="dashboard-leader-name">{leader.name}</span>
                    <span className={`dashboard-leader-tag ${leader.tagTone}`}>{leader.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="dashboard-insights">
        <div className="dashboard-insights-content">
          <div className="dashboard-insights-head">
            <Sparkles size={18} />
            <h4>Smart Insights</h4>
          </div>
          <p>
            Based on last week's patient data, we recommend opening two additional appointment slots
            on Tuesday mornings to accommodate the surge in pediatric visits.
          </p>
        </div>
        <div className="dashboard-insights-actions">
          <button className="btn dashboard-insights-apply" type="button">
            Apply Schedule Change
          </button>
          <button className="btn dashboard-insights-dismiss" type="button">
            Dismiss
          </button>
        </div>
      </div>
    </section>
  );
};
