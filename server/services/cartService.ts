import { randomUUID } from 'node:crypto';
import type { Product } from '../data/products';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface CartLine extends CartItem {
  product: Product;
  lineTotal: number;
}

class CartService {
  private items = new Map<string, CartItem>();

  public list(): CartItem[] {
    return Array.from(this.items.values());
  }

  public get(itemId: string): CartItem | undefined {
    return this.items.get(itemId);
  }

  public add(productId: string, quantity: number): CartItem {
    const existing = Array.from(this.items.values()).find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
      this.items.set(existing.id, existing);
      return existing;
    }

    const item: CartItem = {
      id: randomUUID(),
      productId,
      quantity,
    };

    this.items.set(item.id, item);
    return item;
  }

  public update(itemId: string, quantity: number): CartItem | undefined {
    const item = this.items.get(itemId);
    if (!item) {
      return undefined;
    }

    item.quantity = quantity;

    if (item.quantity <= 0) {
      this.items.delete(itemId);
      return undefined;
    }

    this.items.set(itemId, item);
    return item;
  }

  public remove(itemId: string): boolean {
    return this.items.delete(itemId);
  }

  public clear(): void {
    this.items.clear();
  }
}

export const cartService = new CartService();

export function toCartLines(cartItems: CartItem[], catalog: Product[]): CartLine[] {
  return cartItems
    .map((item) => {
      const product = catalog.find((productRecord) => productRecord.id === item.productId);

      if (!product) {
        return undefined;
      }

      return {
        ...item,
        product,
        lineTotal: Number((product.price * item.quantity).toFixed(2)),
      };
    })
    .filter((entry): entry is CartLine => Boolean(entry));
}

export function calculateCartTotal(cartLines: CartLine[]): number {
  const sum = cartLines.reduce((acc, line) => acc + line.lineTotal, 0);
  return Number(sum.toFixed(2));
}

