import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { CacheService, ProductRepository } from "@/domain/ports";
import { MainLayout } from "@/presentation/components/templates/MainLayout";
import {
  CartPage,
  ProductDetailPage,
  ProductListPage,
} from "@/presentation/components/pages";

interface AppRouterProps {
  readonly productRepo: ProductRepository;
  readonly cache: CacheService;
}

export function AppRouter({ productRepo, cache }: AppRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            index
            element={
              <ProductListPage productRepo={productRepo} cache={cache} />
            }
          />
          <Route
            path="product/:id"
            element={
              <ProductDetailPage productRepo={productRepo} cache={cache} />
            }
          />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
