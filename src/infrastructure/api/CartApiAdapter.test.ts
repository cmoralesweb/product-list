import { describe, expect, it, vi } from "vitest";
import { faker } from "@faker-js/faker";
import { CartApiAdapter } from "./CartApiAdapter";
import type { HttpClient } from "./httpClient";
import { ProductSelectionMother } from "@/domain/utils/tests/models/productSelectionMother";

describe("CartApiAdapter", () => {
  describe("add", () => {
    it("posts selection to /api/cart", async () => {
      const http = {
        post: vi.fn().mockResolvedValue({ count: faker.number.int() }),
      } as unknown as HttpClient;
      const adapter = new CartApiAdapter(http);

      const selection = ProductSelectionMother.create();
      await adapter.add(selection);

      expect(http.post).toHaveBeenCalledWith("/api/cart", {
        id: selection.productId,
        colorCode: selection.colorCode,
        storageCode: selection.storageCode,
      });
    });

    it("returns cart count from response", async () => {
      const count = faker.number.int({ min: 1, max: 10 });
      const http = {
        post: vi.fn().mockResolvedValue({ count }),
      } as unknown as HttpClient;
      const adapter = new CartApiAdapter(http);

      const result = await adapter.add(ProductSelectionMother.create());

      expect(result).toEqual({ count });
    });

    it("maps productId to id in request body", async () => {
      const http = {
        post: vi.fn().mockResolvedValue({ count: faker.number.int() }),
      } as unknown as HttpClient;
      const adapter = new CartApiAdapter(http);

      const selection = ProductSelectionMother.create();
      await adapter.add(selection);

      expect(http.post).toHaveBeenCalledWith("/api/cart", {
        id: selection.productId,
        colorCode: selection.colorCode,
        storageCode: selection.storageCode,
      });
    });
  });
});
