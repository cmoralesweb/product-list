import type { ProductRepository } from "@/domain/ports";
import type { Product, ProductDetail } from "@/domain/models";
import { HttpClient } from "@/infrastructure/api/httpClient";

interface ProductDto {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

interface ProductDetailDto extends ProductDto {
  networkTechnology?: string;
  networkSpeed?: string;
  announced?: string;
  status?: string;
  dimentions?: string;
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
  secondaryCmera?: string[];
  battery?: string;
  colors?: string[];
  options?: {
    colors: { code: number; name: string }[];
    storages: { code: number; name: string }[];
  };
}

export class ProductApiAdapter implements ProductRepository {
  constructor(private readonly http: HttpClient) {}

  async getAll(): Promise<Product[]> {
    const dtos = await this.http.get<ProductDto[]>("/api/product");
    return dtos.map(toProduct);
  }

  async getById(id: string): Promise<ProductDetail> {
    const dto = await this.http.get<ProductDetailDto>(`/api/product/${id}`);
    return toProductDetail(dto);
  }
}

function toProduct(dto: ProductDto): Product {
  return {
    id: dto.id,
    brand: dto.brand,
    model: dto.model,
    price: Number(dto.price),
    imgUrl: dto.imgUrl,
  };
}

function toProductDetail(dto: ProductDetailDto): ProductDetail {
  return {
    id: dto.id,
    brand: dto.brand,
    model: dto.model,
    price: Number(dto.price),
    imgUrl: dto.imgUrl,
    networkTechnology: dto.networkTechnology,
    networkSpeed: dto.networkSpeed,
    announced: dto.announced,
    status: dto.status,
    dimensions: dto.dimentions,
    weight: dto.weight,
    sim: dto.sim,
    displayType: dto.displayType,
    displayResolution: dto.displayResolution,
    displaySize: dto.displaySize,
    os: dto.os,
    cpu: dto.cpu,
    chipset: dto.chipset,
    gpu: dto.gpu,
    externalMemory: dto.externalMemory,
    internalMemory: dto.internalMemory,
    ram: dto.ram,
    primaryCamera: dto.primaryCamera,
    secondaryCamera: dto.secondaryCmera,
    battery: dto.battery,
    colors: dto.colors,
    options: dto.options,
  };
}
