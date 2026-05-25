import type { ProductDetail } from "@/domain/models";
import { ProductImage } from "@/presentation/components/atoms";
import { ProductAttributes } from "@/presentation/components/molecules";

interface ProductDetailsProps {
  readonly product: ProductDetail;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <>
      <div className="product-details__image">
        <ProductImage src={product.imgUrl} alt={product.model} />
      </div>
      <div className="product-details__info">
        <h2 className="product-details__title">
          {product.brand} {product.model}
        </h2>
        <span className="product-details__price">
          {product.price ? `${product.price} €` : "—"}
        </span>
        <ProductAttributes product={product} />
      </div>
    </>
  );
}
