import { useState } from 'react';
import { CheckoutForm } from '../components/CheckoutForm';
import { ReceiptModal } from '../components/ReceiptModal';
import { StatusMessage } from '../components/StatusMessage';
import { useCart } from '../state/CartContext';

export default function CheckoutPage() {
  const { items, total, status, error, checkout } = useCart();
  const [receipt, setReceipt] = useState<{
    id: string;
    total: number;
    createdAt: string;
  } | null>(null);

  const handleCheckout = async (payload: { name: string; email: string }) => {
    const result = await checkout(payload);
    setReceipt({ id: result.receiptId, total: result.total, createdAt: result.createdAt });
  };

  const hasItems = items.length > 0;

  return (
    <section className="checkout-page">
      <header className="page-header">
        <h1>Checkout</h1>
        <p>Enter your details to receive a mock receipt.</p>
      </header>

      {!hasItems && <p>Your cart is empty. Add products before checking out.</p>}

      {status === 'error' && <StatusMessage status="error" message={error} />}
      {status === 'loading' && <StatusMessage status="loading" />}

      {hasItems && (
        <>
          <div className="checkout-page__summary">
            <h2>Order Summary</h2>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <strong>INR {item.lineTotal.toFixed(2)}</strong>
                </li>
              ))}
            </ul>
            <div className="checkout-page__total">
              <span>Total</span>
              <strong>INR {total.toFixed(2)}</strong>
            </div>
          </div>
          <CheckoutForm onSubmit={handleCheckout} isSubmitting={status === 'loading'} />
        </>
      )}

      {receipt && (
        <ReceiptModal
          receiptId={receipt.id}
          total={receipt.total}
          createdAt={receipt.createdAt}
          onClose={() => setReceipt(null)}
        />
      )}
    </section>
  );
}

