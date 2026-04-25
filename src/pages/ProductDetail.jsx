import { useParams, Link } from 'react-router-dom';
import { products } from '../mockdata/products';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div className="not-found container">
      <h2>Producto no encontrado</h2>
      <Link to="/products">← Volver al catálogo</Link>
    </div>
  );

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="detail-page container">
      <Link to="/products" className="back-link">← Volver al catálogo</Link>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <div className="detail-rating">
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            <span>{product.rating} · {product.reviews} reseñas</span>
          </div>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>
          <button className={`detail-add ${added ? 'added' : ''}`} onClick={handleAdd}>
            {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
          </button>
          <Link to="/cart" className="detail-cart-link">Ver carrito →</Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related">
          <h2>También te puede gustar</h2>
          <div className="related-grid">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="related-card">
                <img src={p.image} alt={p.name} />
                <div className="related-info">
                  <span>{p.name}</span>
                  <strong>${p.price.toFixed(2)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
