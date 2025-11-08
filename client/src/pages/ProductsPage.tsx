import { ProductCard } from '../components/ProductCard';
import { StatusMessage } from '../components/StatusMessage';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../state/CartContext';

export default function ProductsPage() {
  const { products, status, error } = useProducts();
  const { addItem, status: cartStatus } = useCart();

  const isLoading = status === 'loading';
  const isCartMutating = cartStatus === 'loading';

  return (
    <section className="products-page">
      <header className="page-header">
        <h1>Catalog</h1>
        <p>Choose your favorites from our mock inventory.</p>
      </header>

      {status === 'error' && <StatusMessage status="error" message={error} />}

      <div className="product-grid" aria-busy={isLoading}>
        {isLoading && <StatusMessage status="loading" />}
        {!isLoading &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addItem(product.id, 1)}
            />
          ))}
      </div>

      {isCartMutating && <StatusMessage status="loading" />}
    </section>
  );
}

