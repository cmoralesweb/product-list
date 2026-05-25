import { render, screen } from "@testing-library/react";
import { ProductDetailMother } from "@/domain/utils/tests";
import { ProductDetails } from "./ProductDetails";

describe("ProductDetails", () => {
  it("renders the product brand and model as title", () => {
    const product = ProductDetailMother.create();
    render(<ProductDetails product={product} />);
    expect(
      screen.getByText(`${product.brand} ${product.model}`),
    ).toBeInTheDocument();
  });

  it("renders the price with euro symbol", () => {
    const product = ProductDetailMother.create();
    render(<ProductDetails product={product} />);
    expect(screen.getByText(`${product.price} €`)).toBeInTheDocument();
  });

  it("renders the product image", () => {
    const product = ProductDetailMother.create();
    render(<ProductDetails product={product} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", product.imgUrl);
  });

  it("renders product attributes", () => {
    const product = ProductDetailMother.create();
    render(<ProductDetails product={product} />);
    expect(screen.getByText(product.brand)).toBeInTheDocument();
  });
});
