import type { CartLine } from '../types';
import { formatCurrency } from '../utilities/currency';

interface CartTableProps {
  readonly items: CartLine[];
  readonly onUpdateQuantity: (itemId: string, quantity: number) => void;
  readonly onRemove: (itemId: string) => void;
}

export function CartTable({ items, onUpdateQuantity, onRemove }: CartTableProps) {
  if (items.length === 0) {
    return <p className="text-sm text-text-muted">Your cart is empty. Start by adding a product.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-surface">
      <table className="min-w-full divide-y divide-border/60 text-sm">
        <thead className="bg-surface/80 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
          <tr>
            <th scope="col" className="px-4 py-3">
              Item
            </th>
            <th scope="col" className="px-4 py-3">
              Price
            </th>
            <th scope="col" className="px-4 py-3">
              Quantity
            </th>
            <th scope="col" className="px-4 py-3">
              Total
            </th>
            <th scope="col" className="px-4 py-3 text-right">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {items.map((item) => {
            const sizes = item.product.sizes?.length ? item.product.sizes : ['One size'];
            const colors = item.product.colors?.length ? item.product.colors : ['Standard'];

            return (
              <tr key={item.id} className="hover:bg-surface/60">
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <h4 className="text-base font-semibold text-white">{item.product.name}</h4>
                    <p className="text-xs text-text-muted">{item.product.description}</p>
                    <p className="text-xs text-text-muted">
                      <span className="font-medium text-white/80">Sizes:</span> {sizes.join(' · ')}
                    </p>
                    <p className="text-xs text-text-muted">
                      <span className="font-medium text-white/80">Colours:</span> {colors.join(', ')}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4 font-medium text-white">
                  {formatCurrency(item.product.price)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-surface/70 text-lg leading-none text-white transition hover:bg-primary/20"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => onUpdateQuantity(item.id, Number(event.target.value))}
                      className="w-14 rounded-md border border-border/60 bg-surface/70 px-2 py-1 text-center text-sm text-white focus:border-primary focus:outline-none focus:ring focus:ring-primary/40"
                    />
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-surface/70 text-lg leading-none text-white transition hover:bg-primary/20"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 font-semibold text-white">
                  {formatCurrency(item.lineTotal)}
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    type="button"
                    className="text-sm font-semibold text-danger transition hover:text-danger/80"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

