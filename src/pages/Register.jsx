import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    clearError();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      alert('Por favor completa todos los campos');
      return;
    }
    const ok = register(form.name, form.email, form.password);
    if (ok) navigate('/');
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">✦ Lumière</div>
        <h1>Crea tu cuenta</h1>
        <p className="auth-sub">Únete a la comunidad Lumière</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-field">
          <label>Nombre completo</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Ana García" />
        </div>
        <div className="auth-field">
          <label>Correo electrónico</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" />
        </div>
        <div className="auth-field">
          <label>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" />
        </div>

        <button className="auth-btn" onClick={handleSubmit}>Crear cuenta</button>

        <p className="auth-switch">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}
