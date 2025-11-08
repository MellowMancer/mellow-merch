import {
  Link,
  Outlet,
  RouterProvider,
  createRoute,
  createRouter,
  createRootRoute,
} from '@tanstack/react-router';
import { useCart } from './state/CartContext';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import { formatCurrency } from './utilities/currency';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ProductsPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const routeTree = rootRoute.addChildren([productsRoute, checkoutRoute]);
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

function Header() {
  const { items, total } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-primary text-slate-950 shadow-lg shadow-primary/30">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold tracking-wide">
          Mello
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-4 text-sm font-medium">
          <Link
            to="/"
            className="rounded-full px-3 py-2 transition-colors hover:bg-primary-strong hover:text-slate-950"
          >
            Products
          </Link>
          <Link
            to="/checkout"
            className="rounded-full px-3 py-2 transition-colors hover:bg-primary-strong hover:text-slate-950"
          >
            Cart &amp; Checkout
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-slate-900/10 px-2 py-1 text-xs font-semibold text-slate-900">
              {count} • {formatCurrency(total)}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
