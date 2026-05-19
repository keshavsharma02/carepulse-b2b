import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  CalendarPlus,
  Plus,
  Stethoscope,
  UserSearch,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  formatIsoDate,
  getEventsForDate,
  scheduleDoctors,
  scheduleStats,
  upcomingAppointments,
} from '../data/scheduleData';
import { useScheduleStore } from '../store/scheduleStore';
import type {
  AppointmentType,
  CalendarEvent,
  CalendarEventTone,
  DoctorStatus,
} from '../types';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const summaryCards = [
  {
    label: "Today's Visits",
    value: String(scheduleStats.todaysVisits),
    icon: CalendarCheck,
    iconClass: 'schedule-stat-icon--primary',
  },
  {
    label: 'New Patients',
    value: String(scheduleStats.newPatients),
    icon: UserSearch,
    iconClass: 'schedule-stat-icon--secondary',
  },
  {
    label: 'Waitlist',
    value: String(scheduleStats.waitlist),
    icon: Clock,
    iconClass: 'schedule-stat-icon--muted',
  },
] as const;

const appointmentTypeClass: Record<AppointmentType, string> = {
  'FOLLOW-UP': 'schedule-appt-tag--followup',
  CONSULT: 'schedule-appt-tag--consult',
  URGENT: 'schedule-appt-tag--urgent',
  CHECKUP: 'schedule-appt-tag--followup',
};

const eventToneClass: Record<CalendarEventTone, string> = {
  primary: 'schedule-cal-event--primary',
  emerald: 'schedule-cal-event--emerald',
  amber: 'schedule-cal-event--amber',
};

const doctorStatusClass: Record<DoctorStatus, string> = {
  Available: 'schedule-doctor-status--available',
  'In Consultation': 'schedule-doctor-status--busy',
  Unavailable: 'schedule-doctor-status--offline',
};

const doctorDotClass: Record<DoctorStatus, string> = {
  Available: 'schedule-doctor-dot--available',
  'In Consultation': 'schedule-doctor-dot--busy',
  Unavailable: 'schedule-doctor-dot--offline',
};

type CalendarCell = {
  date: Date;
  inCurrentMonth: boolean;
  isToday: boolean;
  iso: string;
};

const buildMonthGrid = (viewDate: Date, today: Date): CalendarCell[] => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return {
      date,
      inCurrentMonth: date.getMonth() === month,
      isToday:
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate(),
      iso: formatIsoDate(date),
    };
  });
};

const buildWeekCells = (viewDate: Date, today: Date): CalendarCell[] => {
  const inSameMonthAsToday =
    viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() === today.getMonth();
  const anchor = inSameMonthAsToday
    ? today
    : new Date(viewDate.getFullYear(), viewDate.getMonth(), 15);
  const weekStart = new Date(anchor);
  weekStart.setDate(anchor.getDate() - anchor.getDay());

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return {
      date,
      inCurrentMonth: date.getMonth() === viewDate.getMonth(),
      isToday:
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate(),
      iso: formatIsoDate(date),
    };
  });
};

const isDemoHighlightDay = (cell: CalendarCell, highlightTodayInGrid: boolean) =>
  !highlightTodayInGrid &&
  cell.inCurrentMonth &&
  cell.date.getDate() === 15 &&
  cell.date.getMonth() === 9 &&
  cell.date.getFullYear() === 2024;

const CalendarEventChip = ({
  event,
  showToday,
}: {
  event: CalendarEvent;
  showToday: boolean;
}) => {
  const className = `schedule-cal-event ${eventToneClass[event.tone]} ${showToday && event.tone === 'primary' ? 'is-today-event' : ''}`;
  const label = `${event.time} - ${event.title}`;

  if (event.patientId) {
    return (
      <Link to={`/patients/${event.patientId}`} className={`schedule-cal-event-link ${className}`}>
        {label}
      </Link>
    );
  }

  return <span className={className}>{label}</span>;
};

export const SchedulePage = () => {
  const { viewDate, viewMode, setViewMode, goToToday, goToPreviousMonth, goToNextMonth } =
    useScheduleStore();

  const today = new Date();
  const monthLabel = `${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
  const monthCells = buildMonthGrid(viewDate, today);
  const weekCells = buildWeekCells(viewDate, today);
  const highlightTodayInGrid = monthCells.some((cell) => cell.isToday);

  return (
    <section className="schedule-page">
      <div className="schedule-page__grid">
        <div className="schedule-page__main">
          <div className="schedule-stats">
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className="schedule-stat-card" key={card.label}>
                  <div className={`schedule-stat-icon ${card.iconClass}`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="schedule-stat-label">{card.label}</p>
                    <h3 className="schedule-stat-value">{card.value}</h3>
                  </div>
                </article>
              );
            })}
          </div>

          <article className="schedule-calendar">
            <div className="schedule-calendar__toolbar">
              <div className="schedule-calendar__nav">
                <h2 className="schedule-calendar__title">{monthLabel}</h2>
                <div className="schedule-calendar__arrows">
                  <button
                    type="button"
                    className="schedule-icon-btn"
                    onClick={goToPreviousMonth}
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="schedule-icon-btn"
                    onClick={goToNextMonth}
                    aria-label="Next month"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <button type="button" className="btn ghost schedule-today-btn" onClick={goToToday}>
                  Today
                </button>
              </div>

              <div className="schedule-calendar__actions">
                <div className="schedule-view-toggle" role="tablist" aria-label="Calendar view">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={viewMode === 'monthly'}
                    className={`schedule-view-toggle__btn ${viewMode === 'monthly' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={viewMode === 'weekly'}
                    className={`schedule-view-toggle__btn ${viewMode === 'weekly' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('weekly')}
                  >
                    Weekly
                  </button>
                </div>
                <button type="button" className="btn primary schedule-new-btn">
                  <Plus size={16} />
                  New Appointment
                </button>
              </div>
            </div>

            {viewMode === 'monthly' ? (
              <div className="schedule-calendar-grid">
                {WEEKDAYS.map((day) => (
                  <div className="schedule-calendar-weekday" key={day}>
                    {day}
                  </div>
                ))}
                {monthCells.map((cell) => {
                  const events = getEventsForDate(cell.iso);
                  const showToday = cell.isToday || isDemoHighlightDay(cell, highlightTodayInGrid);

                  return (
                    <div
                      key={cell.iso}
                      className={[
                        'schedule-calendar-day',
                        !cell.inCurrentMonth && 'is-outside',
                        showToday && 'is-today',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <span className="schedule-calendar-day__num">{cell.date.getDate()}</span>
                      {events.length > 0 && (
                        <div className="schedule-calendar-day__events">
                          {events.map((event) => (
                            <CalendarEventChip key={event.id} event={event} showToday={showToday} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="schedule-weekly">
                <p className="schedule-weekly__hint">
                  Week of{' '}
                  {weekCells[0].date.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <div className="schedule-weekly-list">
                  {weekCells.map((cell) => {
                    const events = getEventsForDate(cell.iso);
                    const showToday = cell.isToday || isDemoHighlightDay(cell, highlightTodayInGrid);

                    return (
                      <div
                        className={`schedule-weekly-row ${showToday ? 'is-today' : ''}`}
                        key={cell.iso}
                      >
                        <div className="schedule-weekly-row__date">
                          <span>{WEEKDAYS[cell.date.getDay()]}</span>
                          <strong>{cell.date.getDate()}</strong>
                        </div>
                        <div className="schedule-weekly-row__events">
                          {events.length === 0 ? (
                            <span className="schedule-weekly-empty">No appointments</span>
                          ) : (
                            events.map((event) => (
                              <CalendarEventChip
                                key={event.id}
                                event={event}
                                showToday={showToday}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </article>
        </div>

        <aside className="schedule-page__aside">
          <article className="schedule-panel">
            <h4 className="schedule-panel__title">
              <Stethoscope size={18} />
              Doctor Availability
            </h4>
            <ul className="schedule-doctor-list">
              {scheduleDoctors.map((doctor) => (
                <li
                  className={`schedule-doctor-row ${doctor.status === 'In Consultation' ? 'is-muted' : ''}`}
                  key={doctor.id}
                >
                  <div className="schedule-doctor-row__info">
                    <img
                      src={doctor.avatarUrl}
                      alt={doctor.name}
                      className="schedule-doctor-avatar"
                    />
                    <div>
                      <p className="schedule-doctor-name">{doctor.name}</p>
                      <p className={`schedule-doctor-status ${doctorStatusClass[doctor.status]}`}>
                        {doctor.status}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`schedule-doctor-dot ${doctorDotClass[doctor.status]}`}
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          </article>

          <article className="schedule-panel schedule-panel--grow">
            <div className="schedule-panel__head">
              <h4 className="schedule-panel__title schedule-panel__title--plain">Upcoming</h4>
              <button type="button" className="schedule-link-btn">
                View All
              </button>
            </div>
            <ul className="schedule-upcoming-list">
              {upcomingAppointments.map((appt) => (
                <li key={appt.id}>
                  {appt.patientId ? (
                    <Link to={`/patients/${appt.patientId}`} className="schedule-upcoming-card">
                      <ScheduleUpcomingCardContent appt={appt} />
                    </Link>
                  ) : (
                    <div className="schedule-upcoming-card">
                      <ScheduleUpcomingCardContent appt={appt} />
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="schedule-weather">
              <div className="schedule-weather__top">
                <CloudRain size={28} />
                <div>
                  <p className="schedule-weather__temp">18°C</p>
                  <p className="schedule-weather__desc">Light Rain</p>
                </div>
              </div>
              <p className="schedule-weather__note">
                Plan for traffic. Typical commute to clinic: 25 mins.
              </p>
            </div>
          </article>
        </aside>
      </div>

      <button type="button" className="schedule-fab" aria-label="Edit calendar">
        <CalendarPlus size={26} />
      </button>
    </section>
  );
};

type UpcomingProps = {
  appt: (typeof upcomingAppointments)[number];
};

const ScheduleUpcomingCardContent = ({ appt }: UpcomingProps) => (
  <>
    <div className="schedule-upcoming-card__head">
      <span className={`schedule-appt-tag ${appointmentTypeClass[appt.type]}`}>{appt.type}</span>
      <span className="schedule-upcoming-time">{appt.timeLabel}</span>
    </div>
    <p className="schedule-upcoming-name">{appt.patientName}</p>
    <p className="schedule-upcoming-doctor">
      <Stethoscope size={14} />
      {appt.doctorName}
    </p>
  </>
);
