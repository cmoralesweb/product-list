import { describe, expect, it, vi } from "vitest";
import { GetProductDetailUseCase } from "@/application/usecases";
import { ProductDetailMother } from "@/domain/utils/tests/models/productDetailMother";
import { createMockCache } from "@/domain/utils/tests/ports/mocks";

function createRepo(detail: ReturnType<typeof ProductDetailMother.create>) {
  return {
    getAll: vi.fn(),
    getById: vi.fn().mockResolvedValue(detail),
  };
}

describe("GetProductDetailUseCase", () => {
  describe("when cache is empty", () => {
    it("returns product detail from repo and caches it", async () => {
      const detail = ProductDetailMother.create();
      const repo = createRepo(detail);
      const cache = createMockCache();
      const useCase = new GetProductDetailUseCase(repo, cache);

      const result = await useCase.execute("1");

      expect(result).toEqual(detail);
      expect(repo.getById).toHaveBeenCalledWith("1");
      expect(cache.set).toHaveBeenCalledOnce();
    });
  });

  describe("when cache is not empty", () => {
    it("returns cached product detail without calling repo", async () => {
      const cachedDetail = ProductDetailMother.create();
      const repo = createRepo(cachedDetail);
      const cache = createMockCache();
      cache.set("product_1", cachedDetail, 3_600_000);

      const useCase = new GetProductDetailUseCase(repo, cache);
      const result = await useCase.execute("1");

      expect(result).toEqual(cachedDetail);
      expect(repo.getById).not.toHaveBeenCalled();
    });
  });
});
