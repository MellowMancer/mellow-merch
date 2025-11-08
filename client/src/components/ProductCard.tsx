import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image" aria-hidden="true">
        <img src={product.image} alt="" />
      </div>
      <div className="product-card__body">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-card__footer">
          <span className="product-card__price">INR {product.price.toFixed(2)}</span>
          <button type="button" onClick={() => onAddToCart(product)} className="button">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

