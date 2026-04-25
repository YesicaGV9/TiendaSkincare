import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import Price from '../atoms/Price';
import Badge from '../atoms/Badge';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card fade-in">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
        <div className="product-overlay">
          <Link to={`/product/${product.id}`} className="btn-icon">
            <FiEye size={20} />
          </Link>
          <button className="btn-icon" onClick={() => onAddToCart(product)}>
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
      
      <div className="product-body">
        <div className="product-header">
          <h3 className="product-title">{product.title.substring(0, 50)}...</h3>
          <Badge variant="accent">{product.category}</Badge>
        </div>
        
        <p className="product-description">{product.description?.substring(0, 60)}...</p>
        
        <div className="product-footer">
          <Price amount={product.price} />
          <Badge variant="default">{product.rating?.rate || 4.5} ⭐</Badge>
        </div>
      </div>
    </div>
  );
}
