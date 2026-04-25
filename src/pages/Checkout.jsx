import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import './Checkout.css';

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    card: '',
  });

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = total >= 50 ? 0 : 5.99;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.card) {
      alert('Por favor completa todos los campos.');
      return;
    }
    clearCart();
    setDone(true);
    setTimeout(() => navigate('/'), 4000);
  };

  if (done) return (
    <main className="checkout-success container">
      <div className="success-box">
        <div className="success-icon">✓</div>
        <h2>¡Compra realizada!</h2>
        <p>Gracias por tu compra. Recibirás un correo de confirmación pronto.</p>
        <p className="redirect-note">Redirigiendo a inicio...</p>
        <Link to="/" className="btn-primary">Volver al inicio</Link>
      </div>
    </main>
  );

  if (items.length === 0) return (
    <main className="checkout-empty container">
      <h2>No hay productos en el carrito</h2>
      <Link to="/products">Ir a productos →</Link>
    </main>
  );

  return (
    <main className="checkout-page container">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        {/* Form */}
        <div className="checkout-form">
          <section className="form-section">
            <h2>Datos de contacto</h2>
            <div className="form-grid">
              <div className="form-field">
                <label>Nombre completo</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Ana García" />
              </div>
              <div className="form-field">
                <label>Correo electrónico</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ana@email.com" />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Dirección de envío</h2>
            <div className="form-field full">
              <label>Dirección</label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Calle 123, Apto 4" />
            </div>
            <div className="form-field">
              <label>Ciudad</label>
              <input name="city" value={form.city} onChange={handleChange} placeholder="Medellín" />
            </div>
          </section>

          <section className="form-section">
            <h2>Pago</h2>
            <div className="form-field full">
              <label>Número de tarjeta (simulado)</label>
              <input
                name="card"
                value={form.card}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <p className="form-note">🔒 Pago simulado · No se realizan cargos reales</p>
          </section>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Resumen del pedido</h2>
          <div className="summary-items">
            {items.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item__info">
                  <span>{item.name}</span>
                  <small>Cantidad: {item.quantity}</small>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="sum-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="sum-row"><span>Envío</span><span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="sum-row final"><span>Total</span><span>${(total + shipping).toFixed(2)}</span></div>
          </div>
          <button className="btn-pay" onClick={handleSubmit}>
            Confirmar compra · ${(total + shipping).toFixed(2)}
          </button>
          <Link to="/cart" className="back-to-cart">← Editar carrito</Link>
        </div>
      </div>
    </main>
  );
}
