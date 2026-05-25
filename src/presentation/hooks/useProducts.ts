import { useEffect, useState } from "react";
import type { Product } from "@/domain/models";
import type { CacheService, ProductRepository } from "@/domain/ports";
import { GetProductsUseCase } from "@/application/usecases";

export function useProducts(repo: ProductRepository, cache: CacheService) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  const useCase = new GetProductsUseCase(repo, cache);

  const refetch = () => setTrigger((n) => n + 1);

  useEffect(() => {
    let cancelled = false;

    useCase
      .execute()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setLoading(false);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [useCase, trigger]);

  return { products, loading, error, refetch };
}
