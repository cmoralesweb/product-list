import { faker } from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ProductMother, createMockCache } from "@/domain/utils/tests";
import { PageClassProvider } from "@/presentation/context/PageClassProvider";
import { ProductListPage } from "./ProductListPage";

function createRepo(products: ReturnType<typeof ProductMother.createList>) {
  return {
    getAll: vi.fn().mockResolvedValue(products),
    getById: vi.fn(),
  };
}

function renderPage(
  repo: ReturnType<typeof createRepo>,
  cache: ReturnType<typeof createMockCache>,
) {
  return render(
    <MemoryRouter>
      <PageClassProvider>
        <ProductListPage productRepo={repo} cache={cache} />
      </PageClassProvider>
    </MemoryRouter>,
  );
}

describe("ProductListPage", () => {
  it("shows spinner while loading", () => {
    const repo = createRepo([]);
    const cache = createMockCache();
    renderPage(repo, cache);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("shows error message and retry on failure", async () => {
    const errorMsg = faker.lorem.sentence();
    const repo = {
      getAll: vi.fn().mockRejectedValue(new Error(errorMsg)),
      getById: vi.fn(),
    };
    const cache = createMockCache();
    renderPage(repo, cache);

    expect(await screen.findByText(errorMsg)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("renders products after successful load", async () => {
    const products = ProductMother.createList(2);
    const repo = createRepo(products);
    const cache = createMockCache();
    renderPage(repo, cache);

    for (const product of products) {
      expect(await screen.findByText(product.model)).toBeInTheDocument();
    }
  });

  it("filters products based on search query", async () => {
    const products = [ProductMother.create(), ProductMother.create()];
    const brandA = products[0].brand;
    const repo = createRepo(products);
    const cache = createMockCache();
    const user = userEvent.setup();
    renderPage(repo, cache);

    expect(await screen.findByText(products[0].model)).toBeInTheDocument();
    expect(screen.getByText(products[1].model)).toBeInTheDocument();

    await user.type(screen.getByRole("searchbox"), brandA);
    await waitFor(() => {
      expect(screen.getByText(products[0].model)).toBeInTheDocument();
      expect(screen.queryByText(products[1].model)).not.toBeInTheDocument();
    });
  });

  it("shows empty state when filter matches nothing", async () => {
    const products = [ProductMother.create()];
    const repo = createRepo(products);
    const cache = createMockCache();
    const user = userEvent.setup();
    renderPage(repo, cache);

    expect(await screen.findByText(products[0].brand)).toBeInTheDocument();

    await user.type(screen.getByRole("searchbox"), "__no_match__");
    await waitFor(() => {
      expect(screen.getByText("No products found.")).toBeInTheDocument();
    });
  });
});
