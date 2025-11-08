import { useCallback, useEffect, useState } from 'react';
import type { Product } from '../types';
import { productApi } from '../utilities/productApi';

interface UseProductsResult {
  products: Product[];
  status: 'idle' | 'loading' | 'error';
  error?: string;
  refetch: () => Promise<void>;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchProducts = useCallback(async () => {
    setStatus('loading');
    setError(undefined);
    try {
      const items = await productApi.fetchProducts();
      setProducts(items);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to load products');
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    status,
    error,
    refetch: fetchProducts,
  };
}

