import { create } from 'zustand';
import { koreanClothingProducts } from '../mockdata/koreanClothing';

export const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  searchQuery: '',
  selectedCategory: 'all',
  currentPage: 1,
  productsPerPage: 6,
  categories: ['Sudaderas', 'Pantalones', 'Camisetas', 'Blusas', 'Faldas', 'Suéteres', 'Shorts', 'Pijamas', 'Accesorios', 'Chaquetas', 'Vestidos', 'Abrigos', 'Tops'],
  loading: false,
  error: null,

  // Load mock products
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      // Simular un pequeño delay como si fuera una API
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ products: koreanClothingProducts, filteredProducts: koreanClothingProducts, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Search products
  searchProducts: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    const products = get().products;
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
    );
    set({ filteredProducts: filtered });
  },

  // Filter by category
  filterByCategory: (category) => {
    set({ selectedCategory: category, currentPage: 1 });
    const products = get().products;
    const searchQuery = get().searchQuery;

    let filtered = products;

    if (category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    set({ filteredProducts: filtered });
  },

  // Set current page
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  // Get paginated products
  getPaginatedProducts: () => {
    const { filteredProducts, currentPage, productsPerPage } = get();
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  },

  // Get total pages
  getTotalPages: () => {
    const { filteredProducts, productsPerPage } = get();
    return Math.ceil(filteredProducts.length / productsPerPage);
  },

  // Get single product
  getProductById: (id) => {
    const product = get().products.find((p) => p.id === id);
    return product;
  },
}));
