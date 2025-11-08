import { CartTable } from '../components/CartTable';
import { StatusMessage } from '../components/StatusMessage';
import { useCart } from '../state/CartContext';

export default function CartPage() {
  const { items, total, status, error, updateItem, removeItem } = useCart();

  return (
    <section className="cart-page">
      <header className="page-header">
        <h1>Your Cart</h1>
        <p>Review items before checkout.</p>
      </header>

      {status === 'error' && <StatusMessage status="error" message={error} />}
      {status === 'loading' && <StatusMessage status="loading" />}

      <CartTable items={items} onUpdateQuantity={updateItem} onRemove={removeItem} />

      <footer className="cart-page__summary">
        <span>Total</span>
        <strong>INR {total.toFixed(2)}</strong>
      </footer>
    </section>
  );
}

