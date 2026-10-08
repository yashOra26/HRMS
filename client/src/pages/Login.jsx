import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);
      if (response.data.success) {
        setStatus({ type: 'success', message: 'Login successful! Redirecting...' });
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        // Redirect to appropriate dashboard based on role
        login(response.data.data.user, response.data.data.token);
        if (response.data.data.user.role === 'admin') {
          setTimeout(() => navigate('/admin-dashboard'), 1500);
        } else {
          setTimeout(() => navigate('/employee-dashboard'), 1500);
        } 
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.messages || 'An error occurred during login.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <h1>Welcome Back</h1>
        <p>Sign in to your account to continue</p>
      </div>

      {status.message && (
        <div className={status.type === 'error' ? 'error-message' : 'success-message'} style={{ marginBottom: '1.5rem' }}>
          {status.message}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="auth-footer">
        Don't have an account? 
        <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
};

export default Login;
