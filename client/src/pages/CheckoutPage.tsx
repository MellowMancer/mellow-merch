import { useState } from 'react';
import { CartTable } from '../components/CartTable';
import { CheckoutForm } from '../components/CheckoutForm';
import { ReceiptModal } from '../components/ReceiptModal';
import { StatusMessage } from '../components/StatusMessage';
import { useCart } from '../state/CartContext';
import { formatCurrency } from '../utilities/currency';

export default function CheckoutPage() {
  const { items, total, status, error, updateItem, removeItem, checkout } = useCart();
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
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Cart &amp; Checkout</h1>
        <p className="text-text-muted">Review your items, then place your mock order.</p>
      </header>

      {status === 'error' && <StatusMessage status="error" message={error} />}

      {hasItems ? (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            {status === 'loading' && <StatusMessage status="loading" />}
            <CartTable items={items} onUpdateQuantity={updateItem} onRemove={removeItem} />
            <div className="flex items-center justify-end gap-3 text-lg font-semibold text-white">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="space-y-4 rounded-xl border border-border/60 bg-surface p-6 shadow-xl shadow-black/20">
            <h2 className="text-lg font-semibold text-white">Customer Details</h2>
            <CheckoutForm onSubmit={handleCheckout} isSubmitting={status === 'loading'} />
          </div>
        </div>
      ) : (
        <p className="text-sm text-text-muted">Your cart is empty. Add products before checking out.</p>
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

