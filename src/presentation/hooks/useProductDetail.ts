import { useState, useEffect } from "react";
import type { ProductDetail } from "@/domain/models";
import type { ProductRepository, CacheService } from "@/domain/ports";
import { GetProductDetailUseCase } from "@/application/usecases";

export function useProductDetail(
  id: string,
  repo: ProductRepository,
  cache: CacheService,
) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  const useCase = new GetProductDetailUseCase(repo, cache);

  const refetch = () => setTrigger((n) => n + 1);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    useCase
      .execute(id)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
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
  }, [id, useCase, trigger]);

  return { product, loading, error, refetch };
}
