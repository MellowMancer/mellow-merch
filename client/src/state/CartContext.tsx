import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, CartSnapshot } from '../types';
import { cartApi } from '../utilities/cartApi';

interface CartState {
  items: CartLine[];
  total: number;
  status: 'idle' | 'loading' | 'error';
  error?: string;
}

interface CartContextValue extends CartState {
  refresh: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  checkout: (payload: { name: string; email: string }) => Promise<CheckoutResult>;
}

interface CheckoutResult {
  receiptId: string;
  total: number;
  createdAt: string;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [state, setState] = useState<CartState>({
    items: [],
    total: 0,
    status: 'idle',
  });

  const applySnapshot = useCallback((snapshot: CartSnapshot) => {
    setState({
      items: snapshot.items,
      total: snapshot.total,
      status: 'idle',
    });
  }, []);

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, status: 'loading', error: undefined }));
    try {
      const snapshot = await cartApi.fetchCart();
      applySnapshot(snapshot);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to load cart',
      }));
    }
  }, [applySnapshot]);

  const addItem = useCallback(
    async (productId: string, quantity = 1) => {
      setState((prev) => ({ ...prev, status: 'loading', error: undefined }));
      try {
        const snapshot = await cartApi.addToCart(productId, quantity);
        applySnapshot(snapshot);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to add item',
        }));
      }
    },
    [applySnapshot],
  );

  const updateItem = useCallback(
    async (itemId: string, quantity: number) => {
      setState((prev) => ({ ...prev, status: 'loading', error: undefined }));
      try {
        const snapshot = await cartApi.updateCartItem(itemId, quantity);
        applySnapshot(snapshot);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to update item',
        }));
      }
    },
    [applySnapshot],
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      setState((prev) => ({ ...prev, status: 'loading', error: undefined }));
      try {
        const snapshot = await cartApi.removeCartItem(itemId);
        applySnapshot(snapshot);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to remove item',
        }));
      }
    },
    [applySnapshot],
  );

  const checkout = useCallback(
    async ({ name, email }: { name: string; email: string }) => {
      setState((prev) => ({ ...prev, status: 'loading', error: undefined }));
      try {
        const result = await cartApi.checkout({ name, email });
        applySnapshot({ items: [], total: 0 });
        return {
          receiptId: result.receipt.id,
          total: result.receipt.total,
          createdAt: result.receipt.createdAt,
        };
      } catch (error) {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error.message : 'Checkout failed',
        }));
        throw error;
      }
    },
    [applySnapshot],
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      refresh,
      addItem,
      updateItem,
      removeItem,
      checkout,
    }),
    [state, refresh, addItem, updateItem, removeItem, checkout],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

