import { useState } from "react";

interface ProductImageProps {
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
}

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [error, setError] = useState(false);

  return error ? (
    <div className={`product-image product-image--fallback ${className}`}>
      <span>{alt.charAt(0).toUpperCase()}</span>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={`product-image ${className}`}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}
