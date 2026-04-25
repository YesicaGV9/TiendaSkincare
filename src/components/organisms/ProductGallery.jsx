import React from 'react';
import ProductCard from '../molecules/ProductCard';
import './ProductGallery.css';

export default function ProductGallery({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div className="gallery-empty">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
