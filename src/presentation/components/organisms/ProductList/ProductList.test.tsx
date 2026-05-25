import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductMother } from "@/domain/utils/tests";
import { ProductList } from "./ProductList";

function renderWithRouter(
  products: ReturnType<typeof ProductMother.createList>,
) {
  return render(
    <MemoryRouter>
      <ProductList products={products} />
    </MemoryRouter>,
  );
}

describe("ProductList", () => {
  it("renders a list of products", () => {
    const count = faker.number.int({ min: 2, max: 5 });
    const products = ProductMother.createList(count);
    renderWithRouter(products);
    for (const product of products) {
      expect(screen.getByText(product.model)).toBeInTheDocument();
    }
  });

  it("renders empty message when no products", () => {
    renderWithRouter([]);
    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  it("renders the correct number of product cards", () => {
    const count = faker.number.int({ min: 2, max: 5 });
    const products = ProductMother.createList(count);
    const { container } = renderWithRouter(products);
    expect(container.querySelectorAll(".product-card")).toHaveLength(count);
  });
});
