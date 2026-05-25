import { faker } from "@faker-js/faker";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { createMockCache, ProductDetailMother } from "@/domain/utils/tests";
import type { CartContextValue } from "@/presentation/context/cartContext";
import { CartContext } from "@/presentation/context/cartContext";
import { PageClassProvider } from "@/presentation/context/PageClassProvider";
import { ProductDetailPage } from "./ProductDetailPage";

function createRepo(detail: ReturnType<typeof ProductDetailMother.create>) {
  return {
    getAll: vi.fn(),
    getById: vi.fn().mockResolvedValue(detail),
  };
}

function renderPage(
  repo: ReturnType<typeof createRepo>,
  cache: ReturnType<typeof createMockCache>,
  addToCart: CartContextValue["addToCart"] = vi.fn(),
) {
  return render(
    <MemoryRouter initialEntries={["/product/1"]}>
      <CartContext.Provider value={{ count: 0, addToCart }}>
        <PageClassProvider>
          <Routes>
            <Route
              path="product/:id"
              element={<ProductDetailPage productRepo={repo} cache={cache} />}
            />
          </Routes>
        </PageClassProvider>
      </CartContext.Provider>
    </MemoryRouter>,
  );
}

describe("ProductDetailPage", () => {
  afterEach(cleanup);

  describe("on loading state", () => {
    it("shows spinner while loading", () => {
      const repo = createRepo(ProductDetailMother.create());
      const cache = createMockCache();
      renderPage(repo, cache);
      expect(screen.getByLabelText("Loading")).toBeInTheDocument();
    });
  });

  describe("on error state", () => {
    it("shows error message and retry on failure", async () => {
      const errorMsg = faker.lorem.sentence();
      const repo = {
        getAll: vi.fn(),
        getById: vi.fn().mockRejectedValue(new Error(errorMsg)),
      };
      const cache = createMockCache();
      renderPage(repo, cache);

      expect(await screen.findByText(errorMsg)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });
  });

  describe("on successful load", () => {
    let detail: ReturnType<typeof ProductDetailMother.create>;

    beforeEach(() => {
      detail = ProductDetailMother.create();
      const repo = createRepo(detail);
      const cache = createMockCache();
      renderPage(repo, cache);
    });

    it("shows link to go back to products list", async () => {
      const link = await screen.findByRole("link", {
        name: "Back to all products",
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });

    it("renders product details", async () => {
      expect(
        await screen.findByText(`${detail.brand} ${detail.model}`),
      ).toBeInTheDocument();
      expect(screen.getByText(`${detail.price} €`)).toBeInTheDocument();
    });

    it("renders add-to-cart section with color and storage selectors", async () => {
      expect(
        await screen.findByRole("button", { name: "Add to Cart" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Color")).toBeInTheDocument();
      expect(screen.getByText("Storage")).toBeInTheDocument();
    });
  });

  describe("add to cart interaction", () => {
    it("calls addToCart when add-to-cart button is clicked", async () => {
      const addToCart = vi.fn().mockResolvedValue(undefined);
      const detail = ProductDetailMother.create({
        options: {
          colors: [{ code: 100, name: "Black" }],
          storages: [{ code: 200, name: "128 GB" }],
        },
      });
      const repo = createRepo(detail);
      const cache = createMockCache();
      const user = userEvent.setup();
      renderPage(repo, cache, addToCart);

      expect(
        await screen.findByRole("button", { name: "Add to Cart" }),
      ).toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: "Add to Cart" }));
      expect(addToCart).toHaveBeenCalledOnce();
    });
  });
});
