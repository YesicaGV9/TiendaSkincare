import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import SearchBar from '../molecules/SearchBar';
import Badge from '../atoms/Badge';
import { useState } from 'react';
import './Header.css';

export default function Header({ onSearch }) {
  const getCartCount = useCartStore((state) => state.getCartCount);
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container container flex-between">
        <Link to="/" className="logo">
          🌸 Skincare Shop
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <div className="search-section">
            <SearchBar onChange={(e) => onSearch(e.target.value)} />
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>

          <div className="nav-icons">
            {user ? (
              <>
                <div className="user-info">
                  <FiUser size={20} />
                  <span>{user.name}</span>
                </div>
                <button
                  className="logout-btn"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <FiLogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link-btn">
                  Login
                </Link>
                <Link to="/register" className="nav-link-btn">
                  Register
                </Link>
              </>
            )}

            <Link to="/cart" className="cart-icon">
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <Badge variant="danger" className="cart-badge">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
