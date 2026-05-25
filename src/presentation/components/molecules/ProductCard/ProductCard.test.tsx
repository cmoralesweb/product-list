import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductMother } from "@/domain/utils/tests";
import { ProductCard } from "./ProductCard";

function renderWithRouter(product: ReturnType<typeof ProductMother.create>) {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>,
  );
}

describe("ProductCard", () => {
  it("renders the brand and model", () => {
    const product = ProductMother.create();
    renderWithRouter(product);
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByText(product.model)).toBeInTheDocument();
  });

  it("renders the price with euro symbol", () => {
    const product = ProductMother.create();
    renderWithRouter(product);
    expect(screen.getByText(`${product.price} €`)).toBeInTheDocument();
  });

  it("renders a dash when price is 0", () => {
    const product = ProductMother.create({ price: 0 });
    renderWithRouter(product);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    const product = ProductMother.create();
    renderWithRouter(product);
    const link = screen.getByText(product.model).closest("a");
    expect(link).toHaveAttribute("href", `/product/${product.id}`);
  });

  it("renders the product image", () => {
    const product = ProductMother.create();
    const { container } = renderWithRouter(product);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", product.imgUrl);
  });
});
