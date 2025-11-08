import type { CartSnapshot, CheckoutPayload, Receipt } from '../types';
import { http } from './http';

export const cartApi = {
  async fetchCart(): Promise<CartSnapshot> {
    const response = await http.get<CartSnapshot>('/api/cart');
    return response;
  },
  async addToCart(productId: string, quantity: number): Promise<CartSnapshot> {
    const response = await http.post<{ cart: CartSnapshot }>('/api/cart', { productId, quantity });
    return response.cart;
  },
  async updateCartItem(itemId: string, quantity: number): Promise<CartSnapshot> {
    const response = await http.patch<{ cart: CartSnapshot }>(`/api/cart/${itemId}`, { quantity });
    return response.cart;
  },
  async removeCartItem(itemId: string): Promise<CartSnapshot> {
    const response = await http.delete<{ cart: CartSnapshot }>(`/api/cart/${itemId}`);
    return response.cart;
  },
  async checkout(payload: CheckoutPayload): Promise<{ receipt: Receipt }> {
    return http.post<{ receipt: Receipt }>('/api/checkout', payload);
  },
};

