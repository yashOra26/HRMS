import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'employee' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData);
      if (response.data.success) {
        setStatus({ type: 'success', message: 'Registration successful! Redirecting to login...' });
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.messages || 'An error occurred during registration.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <h1>Create Account</h1>
        <p>Join the HR Management System</p>
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
            minLength={6}
          />
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="auth-footer">
        Already have an account? 
        <Link to="/login">Sign in instead</Link>
      </div>
    </div>
  );
};

export default Register;
