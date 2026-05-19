import type { Kpi, Patient, TrendPoint } from '../types';

export const kpis: Kpi[] = [
  { label: 'Total Patients', value: '12,485', trend: '+4.2% from last month' },
  { label: 'Appointments Today', value: '342', trend: '95% utilization rate' },
  { label: 'Monthly Revenue', value: '$1.2M', trend: '+8.5% year-over-year' },
];

export const trendData: TrendPoint[] = [
  { day: 'Mon', admissions: 34, discharges: 20 },
  { day: 'Tue', admissions: 45, discharges: 35 },
  { day: 'Wed', admissions: 22, discharges: 18 },
  { day: 'Thu', admissions: 74, discharges: 52 },
  { day: 'Fri', admissions: 60, discharges: 48 },
  { day: 'Sat', admissions: 108, discharges: 72 },
  { day: 'Sun', admissions: 91, discharges: 66 },
];

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Eleanor Rigby',
    code: 'PT-8924A',
    primaryCondition: 'Type 2 Diabetes',
    lastVisit: 'Oct 12, 2023',
    nextAppointment: 'Nov 15, 2023',
    status: 'Stable',
    avatarUrl: 'https://i.pravatar.cc/128?img=47',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    code: 'PT-7712C',
    primaryCondition: 'Hypertension',
    lastVisit: 'Oct 05, 2023',
    nextAppointment: 'Unscheduled',
    status: 'Observation',
  },
  {
    id: '3',
    name: 'Robert Chen',
    code: 'PT-9011B',
    primaryCondition: 'Cardiac Arrhythmia',
    lastVisit: 'Oct 20, 2023',
    nextAppointment: 'Oct 27, 2023',
    status: 'Critical',
    avatarUrl: 'https://i.pravatar.cc/128?img=12',
  },
  {
    id: '4',
    name: 'Sarah Jenkins',
    code: 'PT-2245F',
    primaryCondition: 'Osteoarthritis',
    lastVisit: 'Sep 15, 2023',
    nextAppointment: 'Dec 02, 2023',
    status: 'Stable',
    avatarUrl: 'https://i.pravatar.cc/128?img=20',
  },
];
