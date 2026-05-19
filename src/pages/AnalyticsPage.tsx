import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { trendData } from '../data/mockData';
import { CalendarDays, Download, MoreVertical } from 'lucide-react';

type MetricCard = {
  title: string;
  value: string;
  extraValue?: string;
  subtext: string;
  icon: string;
  accent: 'positive' | 'neutral';
};

const metricCards: MetricCard[] = [
  {
    title: 'Total Patients',
    value: '12,485',
    subtext: '+4.2% from last month',
    icon: '👥',
    accent: 'positive',
  },
  {
    title: 'Appointments Today',
    value: '342',
    extraValue: '/ 360 capacity',
    subtext: '95% utilization rate',
    icon: '📅',
    accent: 'neutral',
  },
  {
    title: 'Monthly Revenue',
    value: '$1.2M',
    subtext: '+8.5% year-over-year',
    icon: '💳',
    accent: 'positive',
  },
] ;

const departmentRevenue = [
  { name: 'Cardiology', value: 420 },
  { name: 'Neurology', value: 310 },
  { name: 'Orthopedics', value: 280 },
  { name: 'Pediatrics', value: 190 },
];

export const AnalyticsPage = () => {
  return (
    <section className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1 className="page-title">Analytics Overview</h1>
          <p className="page-subtitle">
            Monitor key performance indicators and facility metrics.
          </p>
        </div>
        <div className="analytics-header-actions">
          <button className="btn secondary analytics-action-btn" type="button">
            <CalendarDays size={16} />
            Last 30 Days
          </button>
          <button className="btn primary analytics-action-btn" type="button">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="analytics-kpis">
        {metricCards.map((metric) => (
          <article className="card analytics-kpi-card" key={metric.title}>
            <div className="analytics-kpi-head">
              <span className="analytics-kpi-icon" aria-hidden>
                {metric.icon}
              </span>
              <h3>{metric.title}</h3>
            </div>
            <div className="analytics-kpi-value-row">
              <p className="kpi-value">{metric.value}</p>
              {metric.extraValue ? <span>{metric.extraValue}</span> : null}
            </div>
            <span className={`analytics-chip ${metric.accent}`}>{metric.subtext}</span>
          </article>
        ))}
      </div>

      <div className="analytics-charts">
        <article className="card analytics-chart-main">
          <div className="analytics-card-head">
            <div>
              <h3>Patient Volume Trends</h3>
              <p>Daily admissions vs discharges</p>
            </div>
            <button className="analytics-icon-btn" type="button" aria-label="Open chart options">
              <MoreVertical size={16} />
            </button>
          </div>
          <div className="analytics-chart-area">
            <ResponsiveContainer>
              <LineChart data={trendData} margin={{ top: 8, right: 10, left: -12, bottom: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="admissions" stroke="#00507d" strokeWidth={3} />
                <Line type="monotone" dataKey="discharges" stroke="#007167" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="card analytics-chart-side">
          <div className="analytics-card-head">
            <h3>Revenue by Dept</h3>
          </div>
          <div className="analytics-chart-area">
            <ResponsiveContainer>
              <BarChart data={departmentRevenue} layout="vertical" margin={{ left: 24, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#334155', fontSize: 12 }} width={90} />
                <Tooltip formatter={(value) => [`$${Number(value ?? 0)}k`, 'Revenue']} />
                <Bar dataKey="value" radius={[6, 6, 6, 6]} fill="#00507d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      <article className="card analytics-indicators">
        <div className="analytics-card-head">
          <h3>Critical System Indicators</h3>
          <button className="analytics-link-btn" type="button">
            View Full Report
          </button>
        </div>
        <div className="analytics-table-wrap">
          <table className="table analytics-table">
            <thead>
              <tr>
                <th>Metric Name</th>
                <th>Current Status</th>
                <th>Variance</th>
                <th style={{ textAlign: 'right' }}>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ER Wait Time Average</td>
                <td>
                  <span className="badge success">Optimal (&lt; 15 mins)</span>
                </td>
                <td className="analytics-good">-2.5 mins</td>
                <td style={{ textAlign: 'right' }}>10:45 AM</td>
              </tr>
              <tr>
                <td>ICU Bed Availability</td>
                <td>
                  <span className="badge error">Critical (2 beds left)</span>
                </td>
                <td className="analytics-bad">-4 beds</td>
                <td style={{ textAlign: 'right' }}>10:30 AM</td>
              </tr>
              <tr>
                <td>Staffing Ratio (Nurses)</td>
                <td>
                  <span className="badge warning">Stable (1:4)</span>
                </td>
                <td className="muted">No change</td>
                <td style={{ textAlign: 'right' }}>09:00 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};
