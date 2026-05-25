import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import { CartProvider } from "./CartProvider";
import { createMockCache } from "@/domain/utils/tests/ports/mocks";

const selection = {
  productId: faker.string.uuid(),
  colorCode: faker.number.int(),
  storageCode: faker.number.int(),
};

function TestComponent() {
  const ctx = useContext(CartContext);
  if (!ctx) return <p>No context</p>;
  return (
    <div>
      <span data-testid="count">{ctx.count}</span>
      <button onClick={() => ctx.addToCart(selection)}>Add</button>
    </div>
  );
}

describe("CartProvider", () => {
  it("provides initial count of 0", () => {
    const cartRepo = { add: vi.fn() };
    const cache = createMockCache();
    render(
      <CartProvider cartRepo={cartRepo} cache={cache}>
        <TestComponent />
      </CartProvider>,
    );
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("updates count after addToCart", async () => {
    const newCount = faker.number.int({ min: 1, max: 10 });
    const cartRepo = {
      add: vi.fn().mockResolvedValue({ count: newCount }),
    };
    const cache = createMockCache();
    const user = userEvent.setup();
    render(
      <CartProvider cartRepo={cartRepo} cache={cache}>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByTestId("count")).toHaveTextContent(String(newCount));
  });

  it("calls cartRepo.add with selection", async () => {
    const cartRepo = {
      add: vi.fn().mockResolvedValue({ count: 1 }),
    };
    const cache = createMockCache();
    const user = userEvent.setup();
    render(
      <CartProvider cartRepo={cartRepo} cache={cache}>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(cartRepo.add).toHaveBeenCalledWith(selection);
  });

  it("restores count from cache on mount", () => {
    const cachedCount = faker.number.int({ min: 1, max: 10 });
    const cartRepo = { add: vi.fn() };
    const cache = createMockCache();
    cache.set("cart_count", cachedCount, 86_400_000);

    render(
      <CartProvider cartRepo={cartRepo} cache={cache}>
        <TestComponent />
      </CartProvider>,
    );
    expect(screen.getByTestId("count")).toHaveTextContent(String(cachedCount));
  });

  it("persists count to cache after addToCart", async () => {
    const newCount = faker.number.int({ min: 1, max: 10 });
    const cartRepo = {
      add: vi.fn().mockResolvedValue({ count: newCount }),
    };
    const cache = createMockCache();
    const user = userEvent.setup();
    render(
      <CartProvider cartRepo={cartRepo} cache={cache}>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(cache.get<number>("cart_count")).toBe(newCount);
  });
});
