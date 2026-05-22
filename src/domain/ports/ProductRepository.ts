import type { Product, ProductDetail } from "@/domain";

export interface ProductRepository {
  getAll(): Promise<Product[]>;

  getById(id: string): Promise<ProductDetail>;
}
