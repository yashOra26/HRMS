import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <div className="brand-icon">HR</div>
          <h2>HRMS Portal</h2>
        </div>
        <div className="nav-profile">
          <div className="profile-info">
            <span className="profile-email">{user?.email}</span>
            <span className="profile-role">{user?.role}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="welcome-banner">
          <h1>Welcome, {user?.email?.split('@')[0]}!</h1>
          <p>View your profile, upcoming leaves, and tasks.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon leave-icon">🏖️</div>
            <div className="stat-content">
              <h3>Available Leave Balance</h3>
              <p className="stat-value">12 Days</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon request-icon">📝</div>
            <div className="stat-content">
              <h3>Pending Approvals</h3>
              <p className="stat-value">1</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon team-icon">🏅</div>
            <div className="stat-content">
              <h3>Performance Score</h3>
              <p className="stat-value">4.5/5</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content-grid">
          <div className="content-card quick-actions">
            <div className="card-header">
              <h2>Employee Actions</h2>
            </div>
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">✈️</span>
                Request Leave
              </button>
              <button className="action-btn">
                <span className="action-icon">💸</span>
                View Payslips
              </button>
              <button className="action-btn">
                <span className="action-icon">👤</span>
                My Profile
              </button>
              <button className="action-btn">
                <span className="action-icon">📬</span>
                Inbox
              </button>
            </div>
          </div>
          
          <div className="content-card recent-activity">
            <div className="card-header">
              <h2>My Recent Activity</h2>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot dot-success"></div>
                <div className="activity-details">
                  <p>Leave request approved for next Friday.</p>
                  <span className="activity-time">Yesterday</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot dot-primary"></div>
                <div className="activity-details">
                  <p>Downloaded payslip for October.</p>
                  <span className="activity-time">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
