import type { Product } from '../types';
import { formatCurrency } from '../utilities/currency';

interface ProductCardProps {
  readonly product: Product;
  readonly onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const initial = product.name.charAt(0).toUpperCase();
  const sizes = product.sizes?.length ? product.sizes : ['One size'];
  const colors = product.colors?.length ? product.colors : ['Standard'];

  return (
    <article className="flex h-full flex-col gap-6 rounded-xl border border-border/60 bg-surface/80 p-6 shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 hover:shadow-primary/40">
      <div className="flex h-40 items-center justify-center rounded-lg bg-primary/15 text-4xl font-semibold text-primary">
        {initial}
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <div className="space-y-2 text-sm text-text-muted">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                Sizes
              </span>
              <span>{sizes.join(' · ')}</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                Colours
              </span>
              <span>{colors.join(', ')}</span>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-white">
            {formatCurrency(product.price)}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-primary-strong focus:outline-none focus:ring focus:ring-primary/60"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

