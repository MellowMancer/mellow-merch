interface ReceiptModalProps {
  receiptId: string;
  total: number;
  createdAt: string;
  onClose: () => void;
}

export function ReceiptModal({ receiptId, total, createdAt, onClose }: ReceiptModalProps) {
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
      <div className="modal__content">
        <h2 id="receipt-title">Order confirmed</h2>
        <p className="modal__body">
          Thank you! Your order <strong>{receiptId}</strong> was placed successfully on{' '}
          {new Date(createdAt).toLocaleString()}.
        </p>
        <p className="modal__total">
          Total charged: <strong>INR {total.toFixed(2)}</strong>
        </p>
        <button type="button" className="button button--primary" onClick={onClose}>
          Close
        </button>
      </div>
      <button type="button" className="modal__backdrop" onClick={onClose} aria-label="Close" />
    </div>
  );
}

