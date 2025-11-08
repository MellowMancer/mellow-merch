import { formatCurrency } from '../utilities/currency';

interface ReceiptModalProps {
  readonly receiptId: string;
  readonly total: number;
  readonly createdAt: string;
  readonly onClose: () => void;
}

export function ReceiptModal({ receiptId, total, createdAt, onClose }: ReceiptModalProps) {
  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close receipt"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />
      <div className="relative z-10 flex min-h-full items-center justify-center p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="receipt-title"
          className="w-full max-w-md space-y-4 rounded-2xl border border-border/60 bg-surface p-6 text-center shadow-2xl shadow-primary/30"
        >
          <h2 id="receipt-title" className="text-2xl font-semibold text-white">
            Order confirmed
          </h2>
          <p className="text-sm text-text-muted">
            Thank you! Your order <strong className="font-semibold text-white">{receiptId}</strong>{' '}
            was placed successfully on {new Date(createdAt).toLocaleString()}.
          </p>
          <p className="text-lg font-semibold text-white">
            Total charged: {formatCurrency(total)}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-primary-strong focus:outline-none focus:ring focus:ring-primary/60"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

