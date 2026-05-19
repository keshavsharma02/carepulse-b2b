import {
  Bell,
  CalendarDays,
  ChartLine,
  FileBarChart,
  LayoutDashboard,
  Settings,
  User,
  Users,
} from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { triggerLocalNotification } from '../../services/notifications';
import { useAuthStore } from '../../store/authStore';
import { usePatientStore } from '../../store/patientStore';
import { useReportsStore } from '../../store/reportsStore';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Schedule', to: '/schedule', icon: <CalendarDays size={18} /> },
  { label: 'Patients', to: '/patients', icon: <Users size={18} /> },
  { label: 'Reports', to: '/reports', icon: <FileBarChart size={18} /> },
  { label: 'Analytics', to: '/analytics', icon: <ChartLine size={18} /> },
];

export const AppLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();
  const isReportsRoute = location.pathname.startsWith('/reports');
  const patientSearchTerm = usePatientStore((state) => state.searchTerm);
  const setPatientSearchTerm = usePatientStore((state) => state.setSearchTerm);
  const reportsSearchTerm = useReportsStore((state) => state.searchTerm);
  const setReportsSearchTerm = useReportsStore((state) => state.setSearchTerm);
  const navigate = useNavigate();
  const searchTerm = isReportsRoute ? reportsSearchTerm : patientSearchTerm;
  const setSearchTerm = isReportsRoute ? setReportsSearchTerm : setPatientSearchTerm;
  const searchPlaceholder = isReportsRoute
    ? 'Search reports, metrics, or patients...'
    : 'Search patients by name, ID, or condition...';

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">CarePulse</div>
        <div className="brand-sub">Healthcare SAAS</div>
        <nav className="nav-list">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span style={{ marginRight: 8, verticalAlign: 'text-top' }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="btn secondary" onClick={handleLogout} type="button">
          Logout
        </button>
      </aside>

      <main className="shell-content">
        <header className="topbar">
          <input
            className="search-input topbar-search-input"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className="topbar-actions">
            <button className="topbar-icon-btn" onClick={triggerLocalNotification} type="button">
              <Bell size={18} />
            </button>
            <button className="topbar-icon-btn" type="button">
              <Settings size={18} />
            </button>
            <button className="topbar-profile-btn" type="button" aria-label="Open profile">
              <User size={16} />
            </button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};
