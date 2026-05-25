import { faker } from "@faker-js/faker";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductImage } from "./ProductImage";

describe("ProductImage", () => {
  it("renders an image with the given src and alt", () => {
    const src = faker.image.urlPicsumPhotos();
    const alt = faker.lorem.word();
    render(<ProductImage src={src} alt={alt} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", src);
    expect(img).toHaveAttribute("alt", alt);
  });

  it("renders fallback when image errors", () => {
    const alt = faker.lorem.word();
    render(<ProductImage src="invalid.jpg" alt={alt} />);
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(screen.getByText(alt.charAt(0).toUpperCase())).toBeInTheDocument();
  });

  it("applies additional className", () => {
    const cls = faker.lorem.word();
    render(<ProductImage src="img.jpg" alt="P" className={cls} />);
    expect(screen.getByRole("img")).toHaveClass(cls);
  });

  it("sets loading lazy on image", () => {
    render(<ProductImage src="img.jpg" alt="P" />);
    expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
  });
});
