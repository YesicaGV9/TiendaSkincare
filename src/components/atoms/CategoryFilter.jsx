import { categories } from '../../mockdata/products';
import './CategoryFilter.css';

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`cat-btn ${active === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat === 'all' ? 'Todos' : cat}
        </button>
      ))}
    </div>
  );
}
