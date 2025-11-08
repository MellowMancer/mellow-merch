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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 text-sm">
        <label
          htmlFor="checkout-name"
          className="text-xs font-semibold uppercase tracking-wide text-text-muted"
        >
          Name
        </label>
        <input
          id="checkout-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-lg border border-border/60 bg-surface/70 px-3 py-2 text-sm text-white shadow-inner focus:border-primary focus:outline-none focus:ring focus:ring-primary/40"
        />
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <label
          htmlFor="checkout-email"
          className="text-xs font-semibold uppercase tracking-wide text-text-muted"
        >
          Email
        </label>
        <input
          id="checkout-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-lg border border-border/60 bg-surface/70 px-3 py-2 text-sm text-white shadow-inner focus:border-primary focus:outline-none focus:ring focus:ring-primary/40"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-primary-strong focus:outline-none focus:ring focus:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}

