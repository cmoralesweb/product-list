import { Link } from "react-router-dom";
import type { Product } from "@/domain/models";
import { ProductImage } from "@/presentation/components/atoms";

interface ProductCardProps {
  readonly product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <ProductImage src={product.imgUrl} alt="" />
      <div className="product-card__info">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__model">
          <Link to={`/product/${product.id}`}>{product.model}</Link>
        </h3>
        <span className="product-card__price">
          {product.price ? `${product.price} €` : "—"}
        </span>
      </div>
    </article>
  );
}
