import type { Product } from "@/domain/models";
import { ProductCard } from "@/presentation/components/molecules";

interface ProductGridProps {
  readonly products: readonly Product[];
}

export function ProductList({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="product-list__empty">No products found.</p>;
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard key={product.id} product={product} />
        </li>
      ))}
    </ul>
  );
}
