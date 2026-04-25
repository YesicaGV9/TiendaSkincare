import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  searchQuery: '',
  selectedCategory: 'all',
  currentPage: 1,
  productsPerPage: 6,
  categories: ['Cleansers', 'Toners', 'Essences', 'Serums', 'Masks', 'Moisturizers'],
  loading: false,
  error: null,

  // Fetch products from FakeStore API
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=20');
      const data = await response.json();
      // Transform products as skincare items
      const transformedProducts = data.map((product) => ({
        ...product,
        category: product.category === 'electronics' ? 'Serums' : 'Moisturizers',
        skintype: ['All Types', 'Oily', 'Dry', 'Combination'][Math.floor(Math.random() * 4)],
      }));
      set({ products: transformedProducts, filteredProducts: transformedProducts, loading: false });
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
