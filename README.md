## Mellow Merch Cart Scaffold

This is a demo project for Nexora's assignment

### Project structure

- `server/` – Express app, REST APIs, MongoDB models, and catalog seeding.
- `client/` – React app with TanStack Router, TailwindCSS styling, and UI screens for browsing, cart, and checkout.
- `dist/` – TypeScript build output for the backend (`npm run build`).

### Getting started

```bash
# Install all dependencies
npm install

# Copy environment template
cp env.example .env

# Start backend only (Express + Vite middleware for SPA)
npm run dev

# Start client only (Vite) from another terminal if desired
npm run client:dev

# Run both watchers together
npm run dev:all
```
`Note: Tailwind CSS has trouble loading when serving the client to the server`

Backend APIs are available under `/api`, while the SPA is served from `/` during development and production (after building the client).

You must provide a `MONGODB_URI` inside `.env` (see `env.example`). If the database is empty, the server seeds an initial catalog automatically on startup.

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

- Replace the static seed with a live catalog source or admin UI.
- Switch the demo cart user to real authentication.
- Expand error handling and add automated tests (Jest, Vitest, or integration tests with Supertest).

