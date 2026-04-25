import { useProductStore } from '../../store/productStore';
import ProductCard from '../molecules/ProductCard';
import Pagination from '../atoms/Pagination';
import CategoryFilter from '../atoms/CategoryFilter';
import './ProductGallery.css';

export default function ProductGallery() {
  const store = useProductStore();
  const paginated = store.paginated;
  const filtered = store.filtered;
  const totalPages = store.totalPages;

  return (
    <section className="gallery">
      <CategoryFilter active={store.category} onChange={store.setCategory} />

      <div className="gallery__meta">
        <p>{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {paginated.length === 0 ? (
        <div className="gallery__empty">
          <p>No se encontraron productos.</p>
        </div>
      ) : (
        <div className="gallery__grid">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Pagination page={store.page} totalPages={totalPages} onPage={store.setPage} />
    </section>
  );
}
