import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';
import { AuthContext } from '../context/AuthContext.jsx';
import { isValidEmail } from '../utils/validation';
import EyeIcon from '../components/icons/EyeIcon.jsx';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errors = {};

    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!form.password.trim()) {
      errors.password = 'Password is required';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const onSubmit = async e => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="app-shell">
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="page-title">Welcome back 👋</h1>
          <p className="page-subtitle">
            Log in to manage your tasks and stay on track.
          </p>

          <form onSubmit={onSubmit} className="auth-form">
            <div className="input-group">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                inputMode="email"
              />
              {fieldErrors.email && (
                <div className="text-error">{fieldErrors.email}</div>
              )}
            </div>

            <div className="input-group">
              <label className="label" htmlFor="password">
                Password
              </label>
              <div className="input-with-toggle">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={onChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon obscured={!showPassword} />
                </button>
              </div>
              {fieldErrors.password && (
                <div className="text-error">{fieldErrors.password}</div>
              )}
            </div>

            {serverError && (
              <div className="text-error">{serverError}</div>
            )}

            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>

          <div className="auth-footer">
            Don&apos;t have an account?{' '}
            <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
