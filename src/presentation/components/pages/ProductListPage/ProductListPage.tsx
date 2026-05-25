import { useState } from "react";
import type { CacheService, ProductRepository } from "@/domain/ports";
import { useDebounce, useProducts } from "@/presentation/hooks";
import { SearchInput } from "@/presentation/components/molecules";
import { ProductList } from "@/presentation/components/organisms";
import { ErrorMessage, Spinner } from "@/presentation/components/atoms";
import { useSetPageClass } from "@/presentation/context";

interface ProductListPageProps {
  readonly productRepo: ProductRepository;
  readonly cache: CacheService;
}

export function ProductListPage({ productRepo, cache }: ProductListPageProps) {
  useSetPageClass("product-list-page");
  const { products, loading, error, refetch } = useProducts(productRepo, cache);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const filtered = debouncedQuery
    ? products.filter(
        (p) =>
          p.brand.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.model.toLowerCase().includes(debouncedQuery.toLowerCase()),
      )
    : products;

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <>
      <h1 className={"page-title"}>Products</h1>
      <SearchInput value={query} onChange={setQuery} />
      <ProductList products={filtered} />
    </>
  );
}
