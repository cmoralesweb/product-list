# Mobile Store — Product List Frontend

A mobile phone e-commerce storefront built with React, TypeScript, and Vite. Users can browse phones, search/filter by brand or model, view detailed specifications, select color/storage options, and add items to a cart.

## Architecture

**Clean Architecture** with 4 layers — dependency flows inward:

```
domain ← application ← infrastructure ← presentation
```

| Layer | Directory | Responsibility |
|---|---|---|
| **Domain** | `src/domain/` | Pure models (`Product`, `Cart`) and port interfaces (`ProductRepository`, `CartRepository`, `CacheService`) |
| **Application** | `src/application/` | Use case classes with a single `execute()` method, orchestrating ports |
| **Infrastructure** | `src/infrastructure/` | API adapters (`ProductApiAdapter`, `CartApiAdapter`), `LocalStorageCacheAdapter`, `HttpClient` |
| **Presentation** | `src/presentation/` | React UI following Atomic Design (atoms → molecules → organisms → templates → pages), hooks, context, router, CSS |

**DI**: Dependencies are created in `App.tsx` and passed as props — no DI framework.

## Quick Start

```sh
pnpm install       # Install dependencies
pnpm dev           # Start Vite dev server with HMR
pnpm build         # tsc -b && vite build (type-check first)
pnpm test          # vitest run (single run)
pnpm test:watch    # vitest watch mode
pnpm lint          # ESLint flat config on .
pnpm lint:css      # Stylelint on src/**/*.css
```

## Configuration

- **`VITE_API_BASE_URL`** — API base URL (defaults to `https://itx-frontend-test.onrender.com`). Set via `.env.local` or environment.

## Routes

| Route | Page | Description |
|---|---|---|
| `/` | `ProductListPage` | Search input + grid of product cards with debounced filtering |
| `/product/:id` | `ProductDetailPage` | Full product detail with specs, color/storage selectors, add-to-cart |

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript 6 | Type checking |
| Vite 8 | Bundler & dev server |
| Vitest 4 | Unit & component testing |
| react-router-dom 7 | Client-side routing |
| ESLint 10 | JS/TS linting |
| Stylelint | CSS linting (enforces `@layer` rules) |
| pnpm | Package manager |

## Testing

Tests are co-located with source files (`Foo.test.tsx` beside `Foo.tsx`). Shared mocks live in `src/domain/utils/tests/`. Vitest globals are enabled (`describe`/`it`/`expect` without imports) with a jsdom environment.

## Project Structure

```
src/
├── domain/           # Pure business logic (models, ports)
├── application/      # Use cases
├── infrastructure/   # API adapters, cache, HTTP client
└── presentation/     # React components, hooks, context, router, styles
```
