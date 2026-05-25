import { renderHook, waitFor } from "@testing-library/react";
import { ProductDetailMother, createMockCache } from "@/domain/utils/tests";
import { useProductDetail } from "./useProductDetail";

function createRepo(detail: ReturnType<typeof ProductDetailMother.create>) {
  return {
    getAll: vi.fn(),
    getById: vi.fn().mockResolvedValue(detail),
  };
}

describe("useProductDetail", () => {
  it("returns product after successful fetch", async () => {
    const detail = ProductDetailMother.create({ id: "1" });
    const repo = createRepo(detail);
    const cache = createMockCache();

    const { result } = renderHook(() => useProductDetail("1", repo, cache));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.product).toEqual(detail);
    expect(result.current.error).toBeNull();
  });

  it("sets error on fetch failure", async () => {
    const repo = {
      getAll: vi.fn(),
      getById: vi.fn().mockRejectedValue(new Error("Not found")),
    };
    const cache = createMockCache();

    const { result } = renderHook(() => useProductDetail("1", repo, cache));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Not found");
    expect(result.current.product).toBeNull();
  });

  it("starts with loading true", () => {
    const repo = createRepo(ProductDetailMother.create());
    const cache = createMockCache();

    const { result } = renderHook(() => useProductDetail("1", repo, cache));
    expect(result.current.loading).toBe(true);
  });

  it("does not fetch when id is empty", () => {
    const repo = createRepo(ProductDetailMother.create());
    const cache = createMockCache();

    renderHook(() => useProductDetail("", repo, cache));

    expect(repo.getById).not.toHaveBeenCalled();
  });

  it("exposes a refetch function", () => {
    const repo = createRepo(ProductDetailMother.create());
    const cache = createMockCache();

    const { result } = renderHook(() => useProductDetail("1", repo, cache));

    expect(result.current.refetch).toBeInstanceOf(Function);
  });
});
