import {
  Link,
  Outlet,
  RouterProvider,
  createRoute,
  createRouter,
  createRootRoute,
} from '@tanstack/react-router';
import './App.css';
import { useCart } from './state/CartContext';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ProductsPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const routeTree = rootRoute.addChildren([productsRoute, cartRoute, checkoutRoute]);
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function RootLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-shell__main">
        <Outlet />
      </main>
    </div>
  );
}

function Header() {
  const { items, total } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/" className="app-header__brand">
          Vibe Cart
        </Link>
        <nav aria-label="Primary navigation">
          <Link to="/" className="app-header__link">
            Products
          </Link>
          <Link to="/cart" className="app-header__link">
            Cart <span className="badge">{count}</span>
          </Link>
          <Link to="/checkout" className="app-header__link">
            Checkout <span className="badge">INR {total.toFixed(2)}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
