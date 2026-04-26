import React from 'react';
import { Link } from 'react-router-dom';
import './AuthLayout.css';

export default function AuthLayout({ children, title, linkText, linkHref }) {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-card fade-in">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              👗 Importaciones Korean
            </Link>
            <h1>{title}</h1>
          </div>

          <div className="auth-body">{children}</div>

          <div className="auth-footer">
            {linkText && linkHref && (
              <p>
                {linkText === 'Login'
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <Link to={linkHref}>{linkText}</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
