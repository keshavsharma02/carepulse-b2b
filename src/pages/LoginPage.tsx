import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isFirebaseConfigured } from '../firebase';
import { useAuthStore } from '../store/authStore';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const authError = useAuthStore((state) => state.authError);
  const clearError = useAuthStore((state) => state.clearError);
  const [email, setEmail] = useState('dr.smith@carepulse.org');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    if (!email || !password) {
      setFormError('Email and password are required.');
      return;
    }
    setFormError('');
    await login(email, password);
    const nextPath = (location.state as { from?: string } | null)?.from ?? '/dashboard';
    if (!useAuthStore.getState().authError) {
      navigate(nextPath, { replace: true });
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-hero">
        <h1 style={{ maxWidth: 460, marginTop: 0 }}>
          Secure, intuitive healthcare administration.
        </h1>
        <p className="muted" style={{ maxWidth: 500 }}>
          Access your organization analytics, patient records, and scheduling from a unified,
          HIPAA-compliant platform.
        </p>
      </section>

      <section className="auth-form-panel">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: 4 }}>Sign In</h2>
          <p className="muted" style={{ marginBottom: 20 }}>
            Enter your credentials to access your dashboard.
          </p>

          <label>
            Work Email
            <input
              className="input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label style={{ display: 'block', marginTop: 14 }}>
            Password
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {(formError || authError) && <p className="error-text">{formError || authError}</p>}
          {!isFirebaseConfigured && (
            <p className="muted" style={{ fontSize: 12, marginTop: 8 }}>
              Demo mode: password is `demo1234` if Firebase env vars are not set.
            </p>
          )}

          <button type="submit" className="btn primary" style={{ width: '100%', marginTop: 18 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </section>
    </div>
  );
};
