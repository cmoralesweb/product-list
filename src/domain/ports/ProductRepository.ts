import type { Product, ProductDetail } from "../models";

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<ProductDetail>;
}
