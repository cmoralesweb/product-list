import { useState } from "react";
import { useParams } from "react-router-dom";
import type { CacheService, ProductRepository } from "@/domain/ports";
import { useCart, useProductDetail } from "@/presentation/hooks";
import { useSetPageClass } from "@/presentation/context";
import {
  AddToCartSection,
  ProductDetails,
} from "@/presentation/components/organisms";
import { ErrorMessage, Spinner } from "@/presentation/components/atoms";

interface ProductDetailPageProps {
  readonly productRepo: ProductRepository;
  readonly cache: CacheService;
}

export function ProductDetailPage({
  productRepo,
  cache,
}: ProductDetailPageProps) {
  useSetPageClass("page-product-detail");
  const { id } = useParams<{ id: string }>();
  const { product, loading, error, refetch } = useProductDetail(
    id ?? "",
    productRepo,
    cache,
  );
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  const colors = product?.options?.colors ?? [];
  const storages = product?.options?.storages ?? [];

  const defaultColor = colors[0]?.code ?? null;
  const defaultStorage = storages[0]?.code ?? null;
  const effectiveColor = selectedColor ?? defaultColor;
  const effectiveStorage = selectedStorage ?? defaultStorage;

  if (loading) return <Spinner />;
  if (error || !product)
    return (
      <ErrorMessage message={error ?? "Product not found"} onRetry={refetch} />
    );

  const handleAddToCart = async () => {
    if (effectiveColor === null && effectiveStorage === null) return;
    setAdding(true);
    try {
      await addToCart({
        productId: product.id,
        colorCode: effectiveColor ?? colors[0]?.code,
        storageCode: effectiveStorage ?? storages[0]?.code,
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <ProductDetails product={product} />
      {colors.length > 0 || storages.length > 0 ? (
        <AddToCartSection
          colors={colors}
          storages={storages}
          selectedColor={effectiveColor}
          selectedStorage={effectiveStorage}
          onColorChange={setSelectedColor}
          onStorageChange={setSelectedStorage}
          onAddToCart={handleAddToCart}
          loading={adding}
        />
      ) : null}

      <a href="/" className="back-link">
        Back to all products
      </a>
    </>
  );
}
