import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

function renderWithRouter(items: { label: string; path?: string }[]) {
  return render(
    <MemoryRouter>
      <Breadcrumbs items={items} />
    </MemoryRouter>,
  );
}

describe("Breadcrumbs", () => {
  it("renders all items", () => {
    const items = [
      { label: faker.lorem.word(), path: "/" },
      { label: faker.lorem.word() },
    ];
    renderWithRouter(items);
    for (const item of items) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it("renders link for non-last items with path", () => {
    const items = [
      { label: faker.lorem.word(), path: "/" },
      { label: faker.lorem.word() },
    ];
    renderWithRouter(items);
    const link = screen.getByText(items[0].label);
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders last item as plain text with aria-current", () => {
    const items = [
      { label: faker.lorem.word(), path: "/" },
      { label: faker.lorem.word() },
    ];
    renderWithRouter(items);
    const last = screen.getByText(items[1].label);
    expect(last.tagName).toBe("SPAN");
    expect(last).toHaveAttribute("aria-current", "page");
  });

  it("renders separator between items", () => {
    const items = [
      { label: faker.lorem.word(), path: "/" },
      { label: faker.lorem.word() },
    ];
    renderWithRouter(items);
    const sep = document.querySelector(".breadcrumbs__sep");
    expect(sep).toBeInTheDocument();
  });

  it("has navigation role with breadcrumb label", () => {
    renderWithRouter([{ label: faker.lorem.word(), path: "/" }]);
    expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
  });
});
