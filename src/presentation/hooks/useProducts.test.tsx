import { renderHook, waitFor } from "@testing-library/react";
import { ProductMother, createMockCache } from "@/domain/utils/tests";
import { useProducts } from "./useProducts";

function createRepo(products: ReturnType<typeof ProductMother.createList>) {
  return {
    getAll: vi.fn().mockResolvedValue(products),
    getById: vi.fn(),
  };
}

describe("useProducts", () => {
  it("returns products after successful fetch", async () => {
    const products = ProductMother.createList(2);
    const repo = createRepo(products);
    const cache = createMockCache();

    const { result } = renderHook(() => useProducts(repo, cache));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toEqual(products);
    expect(result.current.error).toBeNull();
  });

  it("sets error on fetch failure", async () => {
    const repo = {
      getAll: vi.fn().mockRejectedValue(new Error("API error")),
      getById: vi.fn(),
    };
    const cache = createMockCache();

    const { result } = renderHook(() => useProducts(repo, cache));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("API error");
    expect(result.current.products).toEqual([]);
  });

  it("starts with loading true", () => {
    const repo = createRepo([]);
    const cache = createMockCache();

    const { result } = renderHook(() => useProducts(repo, cache));
    expect(result.current.loading).toBe(true);
  });

  it("exposes a refetch function", () => {
    const repo = createRepo([]);
    const cache = createMockCache();

    const { result } = renderHook(() => useProducts(repo, cache));

    expect(result.current.refetch).toBeInstanceOf(Function);
  });
});
