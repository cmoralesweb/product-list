import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "@/presentation/context/cartContext";
import { Header } from "./Header";

function renderWithProviders(count: number, path: string = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CartContext.Provider value={{ count, addToCart: vi.fn() }}>
        <Header />
      </CartContext.Provider>
    </MemoryRouter>,
  );
}

describe("Header", () => {
  it("renders the store logo link", () => {
    renderWithProviders(0);
    expect(screen.getByText("Store")).toBeInTheDocument();
  });

  it("renders breadcrumbs with Products as first item", () => {
    renderWithProviders(0);
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("renders cart link with aria-label", () => {
    const count = faker.number.int({ min: 1, max: 99 });
    renderWithProviders(count);
    expect(
      screen.getByLabelText(`Cart with ${count} items`),
    ).toBeInTheDocument();
  });

  it("does not render badge when count is 0", () => {
    const { container } = renderWithProviders(0);
    expect(container.querySelector(".badge")).not.toBeInTheDocument();
  });

  it("renders badge when count is greater than 0", () => {
    const count = faker.number.int({ min: 1, max: 99 });
    renderWithProviders(count);
    expect(screen.getByText(String(count))).toBeInTheDocument();
  });

  it("renders Product Detail breadcrumb on product page", () => {
    renderWithProviders(0, "/product/1");
    expect(screen.getByText("Product Detail")).toBeInTheDocument();
  });

  it("renders skip link", () => {
    renderWithProviders(0);
    expect(screen.getByText("Skip to content")).toBeInTheDocument();
  });
});
