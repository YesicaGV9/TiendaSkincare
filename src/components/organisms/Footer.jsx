import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <div className="footer__logo">✦ Lumière</div>
          <p>Skincare de calidad para una piel radiante. Formulaciones limpias, resultados reales.</p>
        </div>
        <div className="footer__links">
          <h4>Tienda</h4>
          <Link to="/">Inicio</Link>
          <Link to="/products">Todos los productos</Link>
          <Link to="/cart">Carrito</Link>
        </div>
        <div className="footer__links">
          <h4>Cuenta</h4>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarse</Link>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2026 Lumière Skincare. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
