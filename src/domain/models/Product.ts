export interface Product {
  id: string;
  brand: string;
  model: string;
  price: number;
  imgUrl: string;
}

export interface ColorOption {
  code: number;
  name: string;
}

export interface StorageOption {
  code: number;
  name: string;
}

export interface ProductOptions {
  colors: ColorOption[];
  storages: StorageOption[];
}

export function getColors(options: ProductOptions | undefined): ColorOption[] {
  return options?.colors ?? [];
}

export function getStorages(
  options: ProductOptions | undefined,
): StorageOption[] {
  return options?.storages ?? [];
}

export function getDefaultColorCode(
  options: ProductOptions | undefined,
): number | null {
  return getColors(options)[0]?.code ?? null;
}

export function getDefaultStorageCode(
  options: ProductOptions | undefined,
): number | null {
  return getStorages(options)[0]?.code ?? null;
}

export interface ProductDetail extends Product {
  networkTechnology?: string;
  networkSpeed?: string;
  announced?: string;
  status?: string;
  dimensions?: string;
  weight?: string;
  sim?: string;
  displayType?: string;
  displayResolution?: string;
  displaySize?: string;
  os?: string;
  cpu?: string;
  chipset?: string;
  gpu?: string;
  externalMemory?: string;
  internalMemory?: string[];
  ram?: string;
  primaryCamera?: string[];
  secondaryCamera?: string[];
  battery?: string;
  colors?: string[];
  options?: ProductOptions;
}
