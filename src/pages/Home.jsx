import React, { useState, useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import MainLayout from '../components/templates/MainLayout';
import ProductGallery from '../components/organisms/ProductGallery';
import ProductFilter from '../components/molecules/ProductFilter';
import Button from '../components/atoms/Button';
import './Home.css';

export default function Home() {
  const {
    products,
    filteredProducts,
    categories,
    currentPage,
    searchProducts,
    filterByCategory,
    selectedCategory,
    setCurrentPage,
    getPaginatedProducts,
    getTotalPages,
  } = useProductStore();

  const addItem = useCartStore((state) => state.addItem);
  const [searchQuery, setSearchQuery] = useState('');

  const paginatedProducts = getPaginatedProducts();
  const totalPages = getTotalPages();

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchProducts(query);
  };

  const handleAddToCart = (product) => {
    addItem(product, 1);
    alert(`${product.title.substring(0, 30)}... added to cart!`);
  };

  return (
    <MainLayout onSearch={handleSearch}>
      <div className="home-container">
        <section className="hero-section">
          <h1>Welcome to Skincare Shop 🌸</h1>
          <p>Discover premium Korean skincare products for your beauty routine</p>
        </section>

        <div className="home-layout">
          <aside className="sidebar">
            <ProductFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={filterByCategory}
            />
          </aside>

          <main className="main-section">
            {filteredProducts.length === 0 && searchQuery && (
              <div className="no-results">
                <p>No products found for "{searchQuery}"</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('');
                    searchProducts('');
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}

            {paginatedProducts.length > 0 && (
              <>
                <ProductGallery
                  products={paginatedProducts}
                  onAddToCart={handleAddToCart}
                />

                {totalPages > 1 && (
                  <div className="pagination">
                    <Button
                      variant="secondary"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    <div className="page-info">
                      Page {currentPage} of {totalPages}
                    </div>

                    <Button
                      variant="secondary"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
