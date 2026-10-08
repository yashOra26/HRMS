import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
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
          <h1>Welcome back, {user?.email?.split('@')[0]}!</h1>
          <p>Here is what's happening in your organization today.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon team-icon">👥</div>
            <div className="stat-content">
              <h3>Total Employees</h3>
              <p className="stat-value">124</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon leave-icon">🏖️</div>
            <div className="stat-content">
              <h3>On Leave Today</h3>
              <p className="stat-value">8</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon request-icon">📝</div>
            <div className="stat-content">
              <h3>Pending Requests</h3>
              <p className="stat-value">12</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon events-icon">🎉</div>
            <div className="stat-content">
              <h3>Upcoming Events</h3>
              <p className="stat-value">3</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content-grid">
          <div className="content-card recent-activity">
            <div className="card-header">
              <h2>Recent Activity</h2>
              <button className="btn-secondary">View All</button>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot dot-primary"></div>
                <div className="activity-details">
                  <p><strong>Sarah Jenkins</strong> requested PTO for next week.</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot dot-success"></div>
                <div className="activity-details">
                  <p><strong>Michael Chen</strong> submitted performance review.</p>
                  <span className="activity-time">5 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot dot-warning"></div>
                <div className="activity-details">
                  <p><strong>System</strong> generated monthly payroll report.</p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="content-card quick-actions">
            <div className="card-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="actions-grid">
              <button className="action-btn">
                <span className="action-icon">➕</span>
                Add Employee
              </button>
              <button className="action-btn">
                <span className="action-icon">📊</span>
                View Reports
              </button>
              <button className="action-btn">
                <span className="action-icon">⚙️</span>
                Settings
              </button>
              <button className="action-btn">
                <span className="action-icon">📅</span>
                Calendar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
