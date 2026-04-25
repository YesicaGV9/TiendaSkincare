import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import './Cart.css';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) return (
    <main className="cart-empty container">
      <div className="cart-empty__inner">
        <div className="empty-icon">🛍</div>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega algunos productos para comenzar.</p>
        <Link to="/products" className="btn-primary">Explorar productos</Link>
      </div>
    </main>
  );

  return (
    <main className="cart-page container">
      <div className="cart-header">
        <h1>Mi carrito</h1>
        <button className="clear-btn" onClick={clearCart}>Vaciar carrito</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item__info">
                <span className="item-category">{item.category}</span>
                <h3><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="cart-item__qty">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumen</h2>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Envío</span>
            <span>{total >= 50 ? 'Gratis' : '$5.99'}</span>
          </div>
          {total < 50 && (
            <p className="free-shipping-note">Agrega ${(50 - total).toFixed(2)} más para envío gratis</p>
          )}
          <div className="summary-line total">
            <span>Total</span>
            <span>${(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-checkout">Proceder al checkout →</Link>
          <Link to="/products" className="continue-link">← Seguir comprando</Link>
        </div>
      </div>
    </main>
  );
}
