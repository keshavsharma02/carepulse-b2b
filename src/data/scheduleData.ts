import type {
  CalendarEvent,
  ScheduleDoctor,
  ScheduleStats,
  UpcomingAppointment,
} from '../types';

export const scheduleStats: ScheduleStats = {
  todaysVisits: 14,
  newPatients: 6,
  waitlist: 3,
};

export const scheduleDoctors: ScheduleDoctor[] = [
  {
    id: 'dr-chen',
    name: 'Dr. Sarah Chen',
    status: 'Available',
    avatarUrl: 'https://i.pravatar.cc/128?img=5',
  },
  {
    id: 'dr-roe',
    name: 'Dr. Michael Roe',
    status: 'In Consultation',
    avatarUrl: 'https://i.pravatar.cc/128?img=11',
  },
  {
    id: 'dr-petrova',
    name: 'Dr. Elena Petrova',
    status: 'Available',
    avatarUrl: 'https://i.pravatar.cc/128?img=25',
  },
];

/** Demo calendar events keyed by ISO date (YYYY-MM-DD). */
export const calendarEvents: CalendarEvent[] = [
  {
    id: 'ev-1',
    date: '2024-10-07',
    time: '09:00',
    title: 'John Smith',
    tone: 'primary',
  },
  {
    id: 'ev-2',
    date: '2024-10-07',
    time: '14:30',
    title: 'Sarah Jenkins',
    tone: 'emerald',
    patientId: '4',
  },
  {
    id: 'ev-3',
    date: '2024-10-09',
    time: '11:00',
    title: 'Dental Check',
    tone: 'amber',
  },
  {
    id: 'ev-4',
    date: '2024-10-15',
    time: '10:00',
    title: 'Marcus Johnson',
    tone: 'primary',
    patientId: '2',
  },
  {
    id: 'ev-5',
    date: '2024-10-15',
    time: '15:00',
    title: 'Eleanor Rigby',
    tone: 'primary',
    patientId: '1',
  },
];

export const upcomingAppointments: UpcomingAppointment[] = [
  {
    id: 'up-1',
    type: 'FOLLOW-UP',
    timeLabel: '15:00',
    patientName: 'Eleanor Rigby',
    doctorName: 'Dr. Sarah Chen',
    patientId: '1',
  },
  {
    id: 'up-2',
    type: 'CONSULT',
    timeLabel: '16:30',
    patientName: 'Marcus Johnson',
    doctorName: 'Dr. Michael Roe',
    patientId: '2',
  },
  {
    id: 'up-3',
    type: 'URGENT',
    timeLabel: 'Tomorrow',
    patientName: 'Robert Chen',
    doctorName: 'Dr. Elena Petrova',
    patientId: '3',
  },
];

export const getEventsForDate = (isoDate: string) =>
  calendarEvents.filter((event) => event.date === isoDate);

export const formatIsoDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
