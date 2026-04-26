import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import MainLayout from '../components/templates/MainLayout';
import Button from '../components/atoms/Button';
import Price from '../components/atoms/Price';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import './Cart.css';

export default function Cart() {
  const { items, removeItem, updateQuantity, calculateTotal, total } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Por favor inicia sesión primero');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <MainLayout>
      <div className="cart-container">
        <div className="cart-header">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/')}
            className="back-btn"
          >
            <FiArrowLeft /> Continuar Comprando
          </Button>
          <h1>Carrito de Compras</h1>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <Link to="/" className="btn btn-primary">
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="cart-item">
                      <td className="product-name">
                        <img src={item.image} alt={item.title} />
                        <span>{item.title.substring(0, 40)}...</span>
                      </td>
                      <td>
                        <Price amount={item.price} />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, parseInt(e.target.value))
                          }
                          className="quantity-input"
                        />
                      </td>
                      <td>
                        <Price amount={item.price * item.quantity} />
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleRemoveItem(item.id)}
                          title="Remove item"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h2>Resumen de Orden</h2>
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <Price amount={total} />
                </div>
                <div className="summary-line">
                  <span>Envío:</span>
                  <Price amount={0} />
                </div>
                <div className="summary-line">
                  <span>Impuestos:</span>
                  <Price amount={total * 0.08} />
                </div>
                <hr />
                <div className="summary-line total">
                  <span>Total:</span>
                  <Price amount={total * 1.08} />
                </div>
                <Button
                  variant="success"
                  size="lg"
                  fullWidth
                  onClick={handleCheckout}
                >
                  Proceder al Pago
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
