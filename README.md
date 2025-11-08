## Mock E-Commerce Cart Scaffold

This project bootstraps a full-stack shopping cart for the Vibe Commerce coding assignment. It includes an Express backend, a React + Vite frontend, and lightweight state management to connect the two.

### Project structure

- `server/` – Express app, REST APIs, in-memory cart store, product catalog seed.
- `client/` – React app with TanStack Router, cart context, and UI screens for browsing, cart, and checkout.
- `dist/` – TypeScript build output for the backend (`npm run build`).

### Getting started

```bash
# Install all dependencies
npm install

# Start backend only (Express + Vite middleware for SPA)
npm run dev

# Start client only (Vite) from another terminal if desired
npm run client:dev

# Run both watchers together
npm run dev:all
```

Backend APIs are available under `/api`, while the SPA is served from `/` during development and production (after building the client).

### Build and lint

```bash
# Compile backend TypeScript
npm run build

# Build the client bundle
npm run client:build

# Lint client code
npm run client:lint
```

### Next steps

- Swap the in-memory cart (`server/services/cartService.ts`) for MongoDB or SQLite persistence.
- Replace the static product catalog with an external API (e.g., Fake Store API) or database seed.
- Expand error handling and add automated tests (Jest, Vitest, or integration tests with Supertest).

