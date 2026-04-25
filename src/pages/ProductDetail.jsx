import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import MainLayout from '../components/templates/MainLayout';
import Button from '../components/atoms/Button';
import Price from '../components/atoms/Price';
import Badge from '../components/atoms/Badge';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getProductById = useProductStore((state) => state.getProductById);
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(parseInt(id));

  if (!product) {
    return (
      <MainLayout>
        <div className="product-not-found">
          <p>Product not found</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    alert(`${quantity} item(s) added to cart!`);
    navigate('/cart');
  };

  return (
    <MainLayout>
      <div className="product-detail">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/')}
          className="back-btn"
        >
          <FiArrowLeft /> Back
        </Button>

        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-detail-info">
            <div className="product-detail-header">
              <h1>{product.title}</h1>
              <Badge variant="accent">{product.category}</Badge>
            </div>

            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-rating">
              <span>⭐ {product.rating?.rate || 4.5}</span>
              <span>{product.rating?.count || 100} reviews</span>
            </div>

            <div className="product-detail-price">
              <Price amount={product.price} />
            </div>

            <div className="product-detail-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>

              <Button
                variant="success"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
              >
                <FiShoppingCart /> Add to Cart
              </Button>

              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </div>

            <div className="product-detail-features">
              <h3>Features</h3>
              <ul>
                <li>Premium quality product</li>
                <li>Fast and free shipping</li>
                <li>30-day money-back guarantee</li>
                <li>Eco-friendly packaging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
