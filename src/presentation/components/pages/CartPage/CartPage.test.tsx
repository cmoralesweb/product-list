import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PageClassProvider } from "@/presentation/context/PageClassProvider";
import { CartPage } from "./CartPage";

function renderPage() {
  return render(
    <MemoryRouter>
      <PageClassProvider>
        <CartPage />
      </PageClassProvider>
    </MemoryRouter>,
  );
}

describe("CartPage", () => {
  it("renders the page title", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();
  });

  it("shows the coming soon message", () => {
    renderPage();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });
});
