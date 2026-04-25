import ProductGallery from '../components/organisms/ProductGallery';
import { useProductStore } from '../store/productStore';
import './Products.css';

export default function Products() {
  const { search, setSearch } = useProductStore();

  return (
    <main className="products-page container">
      <div className="products-header">
        <h1>Todos los productos</h1>
        <div className="products-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar en el catálogo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <ProductGallery />
    </main>
  );
}
