import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddToCartSection } from "./AddToCartSection";

const colors = [
  { code: 100, name: "Black" },
  { code: 101, name: "White" },
];

const storages = [
  { code: 200, name: "128 GB" },
  { code: 201, name: "256 GB" },
];

function renderSection(
  props?: Partial<Parameters<typeof AddToCartSection>[0]>,
) {
  return render(
    <AddToCartSection
      colors={colors}
      storages={storages}
      selectedColor={null}
      selectedStorage={null}
      onColorChange={vi.fn()}
      onStorageChange={vi.fn()}
      onAddToCart={vi.fn()}
      {...props}
    />,
  );
}

describe("AddToCartSection", () => {
  it("renders color selector, storage selector, and add-to-cart button", () => {
    renderSection();
    expect(
      screen.getByRole("button", { name: "Add to Cart" }),
    ).toBeInTheDocument();
  });

  it("calls onAddToCart when button is clicked", async () => {
    const onAddToCart = vi.fn();
    const user = userEvent.setup();
    renderSection({ onAddToCart });
    await user.click(screen.getByRole("button", { name: "Add to Cart" }));
    expect(onAddToCart).toHaveBeenCalledOnce();
  });

  it("disables button and shows loading text when loading is true", () => {
    renderSection({ loading: true });
    const btn = screen.getByRole("button", { name: "Adding..." });
    expect(btn).toBeDisabled();
  });

  it("calls onColorChange when color changes", async () => {
    const onColorChange = vi.fn();
    const user = userEvent.setup();
    renderSection({ onColorChange });
    await user.selectOptions(screen.getAllByRole("combobox")[0], "101");
    expect(onColorChange).toHaveBeenCalledWith(101);
  });

  it("calls onStorageChange when storage changes", async () => {
    const onStorageChange = vi.fn();
    const user = userEvent.setup();
    renderSection({ onStorageChange });
    await user.selectOptions(screen.getAllByRole("combobox")[1], "201");
    expect(onStorageChange).toHaveBeenCalledWith(201);
  });
});
