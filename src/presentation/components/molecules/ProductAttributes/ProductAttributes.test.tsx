import { render, screen } from "@testing-library/react";
import { ProductDetailMother } from "@/domain/utils/tests";
import { ProductAttributes } from "./ProductAttributes";

describe("ProductAttributes", () => {
  it("renders known attributes from the product", () => {
    const product = ProductDetailMother.create();
    render(<ProductAttributes product={product} />);
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByText(product.model)).toBeInTheDocument();
    expect(screen.getByText(String(product.price))).toBeInTheDocument();
  });

  it("skips attributes with falsy values", () => {
    const product = ProductDetailMother.create({
      cpu: "",
      ram: undefined as unknown as string,
    });
    render(<ProductAttributes product={product} />);
    expect(screen.queryByText("CPU")).not.toBeInTheDocument();
    expect(screen.queryByText("RAM")).not.toBeInTheDocument();
  });

  it("renders array values as comma-separated", () => {
    const product = ProductDetailMother.create({
      primaryCamera: ["12 MP", "48 MP"],
    });
    render(<ProductAttributes product={product} />);
    expect(screen.getByText("12 MP, 48 MP")).toBeInTheDocument();
  });

  it("renders attribute labels", () => {
    const product = ProductDetailMother.create();
    render(<ProductAttributes product={product} />);
    expect(screen.getByText("Brand")).toBeInTheDocument();
  });
});
