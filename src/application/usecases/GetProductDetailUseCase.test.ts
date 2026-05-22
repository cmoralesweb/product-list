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
    it("returns product detail from repo", async () => {
      const detail = ProductDetailMother.create();
      const repo = createRepo(detail);
      const cache = createMockCache();
      const useCase = new GetProductDetailUseCase(repo, cache);

      const result = await useCase.execute("1");

      expect(result).toEqual(detail);
    });

    it("passes the given id to repo.getById", async () => {
      const detail = ProductDetailMother.create();
      const repo = createRepo(detail);
      const cache = createMockCache();
      const useCase = new GetProductDetailUseCase(repo, cache);

      await useCase.execute("42");

      expect(repo.getById).toHaveBeenCalledWith("42");
    });

    it("caches the product detail", async () => {
      const detail = ProductDetailMother.create();
      const repo = createRepo(detail);
      const cache = createMockCache();
      const useCase = new GetProductDetailUseCase(repo, cache);

      await useCase.execute("1");

      expect(cache.set).toHaveBeenCalledOnce();
    });
  });

  describe("when cache is not empty", () => {
    it("returns cached product detail", async () => {
      const cachedDetail = ProductDetailMother.create();
      const repo = createRepo(cachedDetail);
      const cache = createMockCache();
      cache.set("product_1", cachedDetail, 3_600_000);

      const result = await new GetProductDetailUseCase(repo, cache).execute(
        "1",
      );

      expect(result).toEqual(cachedDetail);
    });

    it("does not call repo when cache hit", async () => {
      const cachedDetail = ProductDetailMother.create();
      const repo = createRepo(cachedDetail);
      const cache = createMockCache();
      cache.set("product_1", cachedDetail, 3_600_000);

      await new GetProductDetailUseCase(repo, cache).execute("1");

      expect(repo.getById).not.toHaveBeenCalled();
    });
  });
});
