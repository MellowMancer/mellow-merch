import { useState } from 'react';
import type { FormEvent } from 'react';

interface CheckoutFormProps {
  onSubmit: (payload: { name: string; email: string }) => Promise<void>;
  isSubmitting: boolean;
}

export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ name, email });
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="checkout-name">Name</label>
        <input
          id="checkout-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="checkout-email">Email</label>
        <input
          id="checkout-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <button type="submit" className="button button--primary" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}

