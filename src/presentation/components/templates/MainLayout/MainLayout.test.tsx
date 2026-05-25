import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartContext } from "@/presentation/context/cartContext";
import { PageClassContext } from "@/presentation/context/pageClassContext";
import { MainLayout } from "./MainLayout";

function renderWithProviders(pageClass: string = "") {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <CartContext.Provider value={{ count: 0, addToCart: vi.fn() }}>
        <PageClassContext.Provider value={{ pageClass, setPageClass: vi.fn() }}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<p>Page content</p>} />
            </Route>
          </Routes>
        </PageClassContext.Provider>
      </CartContext.Provider>
    </MemoryRouter>,
  );
}

describe("MainLayout", () => {
  it("renders the header", () => {
    renderWithProviders();
    expect(screen.getByText("Store")).toBeInTheDocument();
  });

  it("renders outlet content", () => {
    renderWithProviders();
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("applies pageClass to layout container", () => {
    const pageClass = faker.lorem.slug();
    const { container } = renderWithProviders(pageClass);
    expect(container.firstChild).toHaveClass(pageClass);
  });
});
