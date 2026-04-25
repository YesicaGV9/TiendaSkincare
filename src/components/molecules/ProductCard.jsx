import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="card-overlay">
          <span>Ver detalle</span>
        </div>
      </Link>
      <div className="card-info">
        <span className="card-category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="card-name">{product.name}</h3>
        </Link>
        <div className="card-rating">
          {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
          <span>({product.reviews})</span>
        </div>
        <div className="card-footer">
          <span className="card-price">${product.price.toFixed(2)}</span>
          <button className="card-add" onClick={() => addItem(product)}>
            + Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
