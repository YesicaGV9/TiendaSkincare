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
    alert(`${product.title.substring(0, 30)}... ¡agregado al carrito!`);
  };

  return (
    <MainLayout onSearch={handleSearch}>
      <div className="home-container">
        <section className="hero-section">
          <h1>Bienvenido a Importaciones Korean 👗</h1>
          <p>Descubre la moda coreana más trendy y actualizada. Ropa premium de alta calidad directa desde Korea.</p>
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
                <p>No hay productos encontrados para "{searchQuery}"</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('');
                    searchProducts('');
                  }}
                >
                  Limpiar Búsqueda
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
                      Anterior
                    </Button>

                    <div className="page-info">
                      Página {currentPage} de {totalPages}
                    </div>

                    <Button
                      variant="secondary"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Siguiente
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
