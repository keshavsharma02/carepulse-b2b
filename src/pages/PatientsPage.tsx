import { Link } from 'react-router-dom';
import {
  EllipsisVertical,
  Eye,
  IdCard,
  LayoutGrid,
  List,
  Plus,
  X,
} from 'lucide-react';
import { usePatientStore } from '../store/patientStore';
import type { Patient } from '../types';

type ConditionPalette = 'indigo' | 'emerald' | 'red' | 'fuchsia' | 'sky' | 'amber';
type AccentTone = 'primary' | 'success' | 'danger';

const conditionPaletteMap: Record<string, ConditionPalette> = {
  'Type 2 Diabetes': 'indigo',
  Hypertension: 'emerald',
  'Cardiac Arrhythmia': 'red',
  Osteoarthritis: 'fuchsia',
};

const statusAccentMap: Record<Patient['status'], AccentTone> = {
  Stable: 'primary',
  Observation: 'success',
  Critical: 'danger',
};

const statusBadgeMap = {
  Stable: 'success',
  Critical: 'error',
  Observation: 'warning',
} as const;

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const getConditionPalette = (condition: string): ConditionPalette =>
  conditionPaletteMap[condition] ?? 'sky';

export const PatientsPage = () => {
  const { patients, searchTerm, setSearchTerm, activeView, setActiveView } = usePatientStore();
  const term = searchTerm.trim().toLowerCase();
  const filteredPatients = patients.filter((patient) => {
    if (!term) return true;
    return (
      patient.name.toLowerCase().includes(term) ||
      patient.code.toLowerCase().includes(term) ||
      patient.primaryCondition.toLowerCase().includes(term)
    );
  });

  return (
    <section className="patients-page">
      <div className="patients-page__header">
        <div className="patients-page__heading">
          <h2 className="patients-page__title">Patient Directory</h2>
          <p className="patients-page__subtitle">
            Manage and view detailed records of all registered patients.
          </p>
        </div>
        <div className="patients-page__actions">
          <div className="view-toggle" role="tablist" aria-label="Patient view">
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'grid'}
              className={`view-toggle__btn ${activeView === 'grid' ? 'is-active' : ''}`}
              onClick={() => setActiveView('grid')}
            >
              <LayoutGrid size={16} />
              Grid
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'list'}
              className={`view-toggle__btn ${activeView === 'list' ? 'is-active' : ''}`}
              onClick={() => setActiveView('list')}
            >
              <List size={16} />
              List
            </button>
          </div>
          <button type="button" className="btn-new-patient">
            <Plus size={16} />
            New Patient
          </button>
        </div>
      </div>

      <div className="patients-page__filters">
        <span className="patients-page__filters-label">Active Filters</span>
        <span className="filter-chip">
          <span>Status: Active</span>
          <button type="button" className="filter-chip__close" aria-label="Clear status filter">
            <X size={12} />
          </button>
        </span>
        {term && (
          <span className="filter-chip filter-chip--accent">
            <span>Search: &ldquo;{searchTerm}&rdquo;</span>
            <button
              type="button"
              className="filter-chip__close"
              aria-label="Clear search filter"
              onClick={() => setSearchTerm('')}
            >
              <X size={12} />
            </button>
          </span>
        )}
        <span className="patients-page__filters-count">
          {filteredPatients.length} of {patients.length} patients
        </span>
      </div>

      {activeView === 'grid' ? (
        <div className="patient-grid">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
          {filteredPatients.length === 0 && (
            <div className="patient-grid__empty">
              No patients match your current filters.
            </div>
          )}
        </div>
      ) : (
        <article className="card patients-list-card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Primary Condition</th>
                <th>Last Visit</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.primaryCondition}</td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <span className={`badge ${statusBadgeMap[patient.status]}`}>{patient.status}</span>
                  </td>
                  <td>
                    <Link to={`/patients/${patient.id}`}>Open Profile</Link>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={5} className="muted" style={{ textAlign: 'center', padding: 24 }}>
                    No patients match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>
      )}
    </section>
  );
};

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const accent = statusAccentMap[patient.status];
  const palette = getConditionPalette(patient.primaryCondition);
  const isUnscheduled = patient.nextAppointment.toLowerCase() === 'unscheduled';

  return (
    <article className={`patient-card patient-card--accent-${accent}`}>
      <div className="patient-card__accent" aria-hidden="true" />
      <div className="patient-card__head">
        <div className="patient-avatar">
          {patient.avatarUrl ? (
            <img src={patient.avatarUrl} alt={`${patient.name} avatar`} />
          ) : (
            <span className="patient-avatar__initials">{getInitials(patient.name)}</span>
          )}
        </div>
        <div className="patient-card__head-info">
          <h3 className="patient-card__name" title={patient.name}>
            {patient.name}
          </h3>
          <div className="patient-card__code">
            <IdCard size={12} />
            <span>{patient.code}</span>
          </div>
        </div>
        <button type="button" className="patient-card__menu" aria-label="Patient actions">
          <EllipsisVertical size={18} />
        </button>
      </div>

      <div className="patient-card__body">
        <div className="patient-card__row">
          <span className="patient-card__row-label">Primary Condition</span>
          <span className={`condition-chip condition-chip--${palette}`}>
            {patient.primaryCondition}
          </span>
        </div>
        <div className="patient-card__row">
          <span className="patient-card__row-label">Last Visit</span>
          <span className="patient-card__row-value patient-card__row-value--strong">
            {patient.lastVisit}
          </span>
        </div>
        <div className="patient-card__row">
          <span className="patient-card__row-label">Next Appt</span>
          <span
            className={`patient-card__row-value ${isUnscheduled ? 'patient-card__row-value--muted' : ''}`}
          >
            {patient.nextAppointment}
          </span>
        </div>
      </div>

      <div className="patient-card__footer">
        <Link to={`/patients/${patient.id}`} className="patient-card__view-btn">
          <Eye size={14} />
          View Details
        </Link>
      </div>
    </article>
  );
};
