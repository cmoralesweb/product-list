import type { ColorOption, StorageOption } from "@/domain/models";
import { Button } from "@/presentation/components/atoms";
import {
  ColorSelector,
  StorageSelector,
} from "@/presentation/components/molecules";

interface AddToCartSectionProps {
  readonly colors: readonly ColorOption[];
  readonly storages: readonly StorageOption[];
  readonly selectedColor: number | null;
  readonly selectedStorage: number | null;
  readonly onColorChange: (code: number) => void;
  readonly onStorageChange: (code: number) => void;
  readonly onAddToCart: () => void;
  readonly loading?: boolean;
}

export function AddToCartSection({
  colors,
  storages,
  selectedColor,
  selectedStorage,
  onColorChange,
  onStorageChange,
  onAddToCart,
  loading,
}: AddToCartSectionProps) {
  return (
    <form className="add-to-cart">
      <ColorSelector
        options={colors}
        selected={selectedColor}
        onChange={onColorChange}
      />
      <StorageSelector
        options={storages}
        selected={selectedStorage}
        onChange={onStorageChange}
      />
      <Button onClick={onAddToCart} disabled={loading}>
        {loading ? "Adding..." : "Add to Cart"}
      </Button>
    </form>
  );
}
