import { describe, expect, it, vi } from "vitest";
import { AddToCartUseCase } from "@/application/usecases";
import { ProductSelectionMother } from "@/domain/utils/tests/models/productSelectionMother";
import { faker } from "@faker-js/faker";

describe("AddToCartUseCase", () => {
  it("calls repo.add with the selection", async () => {
    const selection = ProductSelectionMother.create();
    const repo = {
      add: vi.fn().mockResolvedValue({ count: faker.number.int() }),
    };
    const useCase = new AddToCartUseCase(repo);

    await useCase.execute(selection);

    expect(repo.add).toHaveBeenCalledWith(selection);
  });

  it("returns the count from repo", async () => {
    const count = faker.number.int();
    const repo = { add: vi.fn().mockResolvedValue({ count }) };
    const useCase = new AddToCartUseCase(repo);

    const result = await useCase.execute(ProductSelectionMother.create());

    expect(result).toEqual({ count });
  });
});
