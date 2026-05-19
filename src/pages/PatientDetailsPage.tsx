import { Link, useParams } from 'react-router-dom';
import { usePatientStore } from '../store/patientStore';

export const PatientDetailsPage = () => {
  const { patientId } = useParams();
  const patient = usePatientStore((state) =>
    state.patients.find((entry) => entry.id === patientId),
  );

  if (!patient) {
    return (
      <section className="card" style={{ marginTop: 16 }}>
        <h2>Patient not found</h2>
        <Link to="/patients">Back to patient directory</Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">{patient.name}</h1>
      <p className="page-subtitle">{patient.code}</p>

      <article className="card">
        <p><strong>Primary Condition:</strong> {patient.primaryCondition}</p>
        <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
        <p><strong>Next Appointment:</strong> {patient.nextAppointment}</p>
        <p><strong>Care Notes:</strong> Continue medication adherence and weekly vitals logging.</p>
      </article>

      <div style={{ marginTop: 16 }}>
        <Link to="/patients" className="btn secondary">
          Back to directory
        </Link>
      </div>
    </section>
  );
};
