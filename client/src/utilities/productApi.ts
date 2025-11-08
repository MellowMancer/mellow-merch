import type { Product } from '../types';
import { http } from './http';

export const productApi = {
  async fetchProducts(): Promise<Product[]> {
    const response = await http.get<{ products: Product[] }>('/api/products');
    return response.products;
  },
};

