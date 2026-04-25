import { Link } from 'react-router-dom';
import ProductGallery from '../components/organisms/ProductGallery';
import { useProductStore } from '../store/productStore';
import './Home.css';

export default function Home() {
  const setCategory = useProductStore((s) => s.setCategory);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero__content">
          <span className="hero__tag">Nueva colección 2026</span>
          <h1 className="hero__title">La ciencia<br /><em>de tu piel</em></h1>
          <p className="hero__subtitle">
            Formulaciones limpias con ingredientes activos respaldados por la ciencia.
            Resultados reales para una piel más saludable.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn-primary">Explorar productos</Link>
            <Link to="/products" className="btn-ghost">Ver colección →</Link>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80" alt="Skincare hero" />
          </div>
          <div className="hero__badge">
            <span className="badge-number">100%</span>
            <span className="badge-text">Ingredientes<br />limpios</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features container">
        {[
          { icon: '🌿', title: 'Ingredientes limpios', desc: 'Sin parabenos, sulfatos ni fragancias artificiales' },
          { icon: '🔬', title: 'Respaldo científico', desc: 'Formulaciones probadas clínicamente' },
          { icon: '♻️', title: 'Sostenible', desc: 'Empaque reciclable y producción responsable' },
          { icon: '🐰', title: 'Cruelty free', desc: 'Nunca probado en animales, certificado' },
        ].map((f) => (
          <div key={f.title} className="feature-item">
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Product Gallery */}
      <section className="home-gallery container">
        <div className="section-header">
          <h2>Más vendidos</h2>
          <Link to="/products" className="see-all">Ver todos →</Link>
        </div>
        <ProductGallery />
      </section>

      {/* Banner CTA */}
      <section className="cta-banner">
        <div className="cta-banner__inner container">
          <h2>Tu rutina,<br /><em>simplificada</em></h2>
          <p>Descubre qué productos son los ideales para tu tipo de piel.</p>
          <Link to="/products" className="btn-primary light" onClick={() => setCategory('serums')}>
            Explorar serums
          </Link>
        </div>
      </section>
    </main>
  );
}
