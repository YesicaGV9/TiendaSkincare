import { create } from 'zustand';
import { products as allProducts } from '../mockdata/products';

export const useProductStore = create((set, get) => ({
  products: allProducts,
  search: '',
  category: 'all',
  page: 1,
  perPage: 8,

  setSearch: (search) => set({ search, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setPage: (page) => set({ page }),

  get filtered() {
    const { products, search, category } = get();
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'all' || p.category === category;
      return matchSearch && matchCat;
    });
  },

  get paginated() {
    const { page, perPage } = get();
    const filtered = get().filtered;
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  },

  get totalPages() {
    return Math.ceil(get().filtered.length / get().perPage);
  },
}));
