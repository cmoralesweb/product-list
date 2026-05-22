import { describe, expect, it, vi } from "vitest";
import { GetProductsUseCase } from "@/application/usecases";
import { ProductMother } from "@/domain/utils/tests/models/productMother";
import { createMockCache } from "@/domain/utils/tests/ports/mocks";

function createRepo(products: ReturnType<typeof ProductMother.createList>) {
  return {
    getAll: vi.fn().mockResolvedValue(products),
    getById: vi.fn(),
  };
}

describe("GetProductsUseCase", () => {
  describe("when cache is empty", () => {
    it("returns products from repo", async () => {
      const products = ProductMother.createList(2);
      const repo = createRepo(products);
      const cache = createMockCache();
      const useCase = new GetProductsUseCase(repo, cache);

      const result = await useCase.execute();

      expect(result).toEqual(products);
      expect(repo.getAll).toHaveBeenCalledOnce();
      expect(cache.set).toHaveBeenCalledOnce();
    });
  });

  describe("when cache is not empty", () => {
    it("returns cached products", async () => {
      const cachedProducts = ProductMother.createList(2);
      const repo = createRepo(cachedProducts);
      const cache = createMockCache();
      cache.set("products", cachedProducts, 3600000);

      const useCase = new GetProductsUseCase(repo, cache);
      const result = await useCase.execute();

      expect(result).toEqual(cachedProducts);
      expect(repo.getAll).not.toHaveBeenCalled();
    });
  });
});
