import type { ProductDetail } from "@/domain/models";

interface ProductAttributesProps {
  readonly product: ProductDetail;
}

const ATTRIBUTES: { label: string; key: keyof ProductDetail }[] = [
  { label: "Brand", key: "brand" },
  { label: "Model", key: "model" },
  { label: "Price", key: "price" },
  { label: "CPU", key: "cpu" },
  { label: "RAM", key: "ram" },
  { label: "OS", key: "os" },
  { label: "Display Resolution", key: "displayResolution" },
  { label: "Battery", key: "battery" },
  { label: "Primary Camera", key: "primaryCamera" },
  { label: "Dimensions", key: "dimensions" },
  { label: "Weight", key: "weight" },
];

export function ProductAttributes({ product }: ProductAttributesProps) {
  return (
    <dl className="product-attributes">
      {ATTRIBUTES.map(({ label, key }) => {
        const value = product[key];
        if (!value) return null;
        const display = Array.isArray(value) ? value.join(", ") : String(value);
        return (
          <>
            <dt>{label}</dt>
            <dd>{display}</dd>
          </>
        );
      })}
    </dl>
  );
}
