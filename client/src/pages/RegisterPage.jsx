import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';
import { isValidEmail } from '../utils/validation';
import EyeIcon from '../components/icons/EyeIcon.jsx';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errors = {};

    if (!form.username.trim()) {
      errors.username = 'Username is required';
    } else if (form.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

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
    if (success) setSuccess('');
  };

  const onSubmit = async e => {
    e.preventDefault();
    setServerError('');
    setSuccess('');

    if (!validate()) return;

    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setSuccess(data.message || 'Registered successfully!');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="app-shell">
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="page-title">Create your account ✨</h1>
          <p className="page-subtitle">
            Sign up to start organizing your tasks beautifully.
          </p>

          <form onSubmit={onSubmit} className="auth-form">
            <div className="input-group">
              <label className="label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                className="input"
                placeholder="Your name"
                value={form.username}
                onChange={onChange}
              />
              {fieldErrors.username && (
                <div className="text-error">{fieldErrors.username}</div>
              )}
            </div>

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
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={onChange}
                  autoComplete="new-password"
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
            {success && (
              <div className="text-success">{success}</div>
            )}

            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
