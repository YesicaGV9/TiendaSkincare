import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import MainLayout from '../components/templates/MainLayout';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import Price from '../components/atoms/Price';
import Badge from '../components/atoms/Badge';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit-card',
  });

  if (!user) {
    return (
      <MainLayout>
        <div className="checkout-redirect">
          <p>Debes estar registrado para proceder al pago</p>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Ir a Login
          </Button>
        </div>
      </MainLayout>
    );
  }

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="checkout-redirect">
          <p>Tu carrito está vacío</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Continuar Comprando
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode
    ) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate order placement
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setTimeout(() => navigate('/'), 2000);
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <MainLayout>
        <div className="order-success">
          <FiCheckCircle size={80} />
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <p className="order-number">Order #12345</p>
          <p className="redirect-msg">Redirecting to home...</p>
        </div>
      </MainLayout>
    );
  }

  const shippingCost = 0;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  return (
    <MainLayout>
      <div className="checkout-container">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/cart')}
          className="back-btn"
        >
          <FiArrowLeft /> Volver al Carrito
        </Button>

        <h1>Pago</h1>

        <div className="checkout-layout">
          <div className="checkout-form">
            <form onSubmit={handlePlaceOrder}>
              <section className="checkout-section">
                <h2>Información de Envío</h2>
                <div className="form-row">
                <div className="form-group">
                    <label>Nombre Completo</label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ciudad</label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Código Postal</label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="checkout-section">
                <h2>Método de Pago</h2>
                <div className="payment-options">
                  {['credit-card', 'debit-card', 'paypal'].map((method) => (
                    <label key={method} className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                      />
                      <span>
                        {method === 'credit-card'
                          ? '💳 Tarjeta de Crédito'
                          : method === 'debit-card'
                          ? '💳 Tarjeta Débito'
                          : '🅿️ PayPal'}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              <Button
                type="submit"
                variant="success"
                size="lg"
                fullWidth
              >
                Realizar Compra
              </Button>
            </form>
          </div>

          <div className="checkout-summary">
            <div className="summary-card">
              <h2>Resumen de Orden</h2>

              <div className="order-items">
                {items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p className="item-name">{item.title.substring(0, 30)}</p>
                      <p className="item-qty">Cantidad: {item.quantity}</p>
                    </div>
                    <Price amount={item.price * item.quantity} />
                  </div>
                ))}
              </div>

              <hr />

              <div className="summary-details">
                <div className="summary-line">
                  <span>Subtotal:</span>
                  <Price amount={total} />
                </div>
                <div className="summary-line">
                  <span>Envío:</span>
                  <Price amount={shippingCost} />
                </div>
                <div className="summary-line">
                  <span>Impuestos (8%):</span>
                  <Price amount={tax} />
                </div>
                <div className="summary-line total">
                  <span>Total:</span>
                  <Price amount={finalTotal} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
