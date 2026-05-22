import { describe, expect, it, vi } from "vitest";
import { AddToCartUseCase } from "@/application/usecases";
import { ProductSelectionMother } from "@/domain/utils/tests/models/productSelectionMother";
import { faker } from "@faker-js/faker";

describe("AddToCartUseCase", () => {
  it("adds to cart and returns count", async () => {
    const count = faker.number.int();
    const selection = ProductSelectionMother.create();
    const repo = { add: vi.fn().mockResolvedValue({ count }) };
    const useCase = new AddToCartUseCase(repo);

    const result = await useCase.execute(selection);

    expect(result).toEqual({ count });
    expect(repo.add).toHaveBeenCalledWith(selection);
  });
});
