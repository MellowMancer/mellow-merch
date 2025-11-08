import type { CartLine } from '../types';

interface CartTableProps {
  readonly items: CartLine[];
  readonly onUpdateQuantity: (itemId: string, quantity: number) => void;
  readonly onRemove: (itemId: string) => void;
}

export function CartTable({ items, onUpdateQuantity, onRemove }: CartTableProps) {
  if (items.length === 0) {
    return <p>Your cart is empty. Start by adding a product.</p>;
  }

  return (
    <table className="cart-table">
      <thead className="cart-table__header">
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col" className="sr-only">
            Remove
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr className="cart-table__row" key={item.id}>
            <td>
              <h4>{item.product.name}</h4>
              <p>{item.product.description}</p>
            </td>
            <td>INR {item.product.price.toFixed(2)}</td>
            <td>
              <div className="cart-table__quantity">
                <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) => onUpdateQuantity(item.id, Number(event.target.value))}
                />
                <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
            </td>
            <td>INR {item.lineTotal.toFixed(2)}</td>
            <td>
              <button type="button" className="link" onClick={() => onRemove(item.id)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

