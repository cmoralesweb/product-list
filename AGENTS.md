# AGENTS.md — product-list-front

## Quick start

```sh
pnpm install        # install deps
pnpm dev            # Vite dev server
pnpm build          # tsc -b && vite build (type-check first)
pnpm test           # vitest run (single-run)
pnpm test:watch     # vitest watch mode
pnpm test:coverage  # vitest run with coverage (v8, text + lcov + clover)
pnpm lint           # ESLint flat config on .
pnpm lint:css       # Stylelint on src/**/*.css
```

## Architecture

**Clean Architecture** with 4 layers (dependency direction: domain ← application ← infrastructure ← presentation):

- `src/domain/` — pure models (`Product`, `Cart` types) and ports (interfaces: `ProductRepository`, `CartRepository`,
  `CacheService`)
- `src/application/` — use case classes with a single `execute()` method
- `src/infrastructure/` — API adapters (`ProductApiAdapter`, `CartApiAdapter`), `LocalStorageCacheAdapter`, `HttpClient`
- `src/presentation/` — React UI (atomic design: atoms/molecules/organisms/pages), hooks, context, router, layouts, CSS

**DI**: Dependencies created in `App.tsx` and passed as props — no DI framework.

**Routes** (`react-router-dom` v7, `BrowserRouter`):

- `/` → `ProductListPage`
- `/product/:id` → `ProductDetailPage`

**Entry**: `src/main.tsx` renders `<App />`.

## Conventions

- **CSS `@layer`**: All CSS declarations must be wrapped in an `@layer` rule. Enforced by a custom Stylelint plugin (
  `stylelint-plugin-enforce-layer.js`). Global `@import` order:
  `settings → tools → generic → atoms → molecules → organisms → templates → pages`.
- **CSS custom properties** for theming in `:root` (`src/presentation/styles/settings.css`).
- **`import type`**: Required for type-only imports (`verbatimModuleSyntax: true` in tsconfig).
- **Path alias**: `@/` → `src/`.
- **Immutability**: Prefer pure functions and immutable patterns.

## Testing

- **Vitest** with globals enabled (`describe`, `it`, `expect` available without imports).
- **jsdom** environment, setup via `setupTests.ts` (imports `@testing-library/jest-dom`).
- **Co-located**: `Foo.test.tsx` / `Foo.test.ts` next to `Foo.tsx` / `Foo.ts`.
- **ObjectMother pattern** (`@faker-js/faker`) — always use for model data (no static model mocks):
    - `ProductMother.create(overrides?)` / `ProductMother.createList(count, overrides?)`
    - `ProductDetailMother.create(overrides?)`
    - `CartMother.create(overrides?)` / `ProductSelectionMother.create(overrides?)`
    - All in `src/domain/utils/tests/models/` — barrel exported from `models/index.ts` and `tests/index.ts`.
- **Port mocks** use `vi.fn()` — `createMockCache()` in `src/domain/utils/tests/ports/mocks.ts`. Inline port mocks in
  test files when used in only one place.
- **Avoid hardcoding values** in tests — prefer using `faker` or ObjectMothers for data.
- **Single assertion per test** — tests with "and" in the description are a code smell; split into dedicated tests.
- Use case tests mock ports with `vi.fn()`. Component tests use `@testing-library/react` +
  `@testing-library/user-event`.

## Config & env

- **`VITE_API_BASE_URL`** env var (defaults to `https://itx-frontend-test.onrender.com`).
- **`.env` / `.env.local`** are gitignored.
