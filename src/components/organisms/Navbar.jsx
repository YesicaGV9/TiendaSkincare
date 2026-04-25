import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useProductStore } from '../../store/productStore';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const { user, logout } = useAuthStore();
  const { search, setSearch } = useProductStore();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value) navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="logo-symbol">✦</span>
          <span>Lumière</span>
        </Link>

        <div className="navbar__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="navbar__actions">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/products" className="nav-link">Productos</Link>
          {user ? (
            <div className="navbar__user">
              <span className="user-name">Hola, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="btn-logout">Salir</button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">Cuenta</Link>
          )}
          <Link to="/cart" className="cart-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Productos</Link>
          {user ? (
            <button onClick={() => { logout(); setMenuOpen(false); }}>Cerrar sesión</button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Mi cuenta</Link>
          )}
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Carrito ({count})</Link>
        </div>
      )}
    </nav>
  );
}
