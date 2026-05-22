import type { ProductRepository, CacheService } from "@/domain/ports";
import type { ProductDetail } from "@/domain/models";

const CACHE_TTL = 60 * 60 * 1000;

export class GetProductDetailUseCase {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly cache: CacheService,
  ) {}

  async execute(id: string): Promise<ProductDetail> {
    const cacheKey = `product_${id}`;
    const cached = this.cache.get<ProductDetail>(cacheKey);
    if (cached) return cached;

    const detail = await this.productRepo.getById(id);
    this.cache.set(cacheKey, detail, CACHE_TTL);
    return detail;
  }
}
