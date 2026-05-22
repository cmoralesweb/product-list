import type { ProductRepository, CacheService } from "@/domain/ports";
import type { Product } from "@/domain/models";

const CACHE_KEY = "products";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export class GetProductsUseCase {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly cache: CacheService,
  ) {}

  async execute(): Promise<Product[]> {
    const cached = this.cache.get<Product[]>(CACHE_KEY);
    if (cached) return cached;

    const products = await this.productRepo.getAll();
    this.cache.set(CACHE_KEY, products, CACHE_TTL);
    return products;
  }
}
