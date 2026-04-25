import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    clearError();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const ok = login(form.email, form.password);
    if (ok) navigate('/');
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">✦ Lumière</div>
        <h1>Bienvenida de vuelta</h1>
        <p className="auth-sub">Inicia sesión en tu cuenta</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-field">
          <label>Correo electrónico</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" />
        </div>
        <div className="auth-field">
          <label>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
        </div>

        <button className="auth-btn" onClick={handleSubmit}>Iniciar sesión</button>

        <div className="auth-hint">
          <p>Demo: <strong>ana@email.com</strong> / <strong>123456</strong></p>
        </div>

        <p className="auth-switch">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </main>
  );
}
