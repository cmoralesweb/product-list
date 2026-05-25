import { faker } from "@faker-js/faker";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { CartContext } from "@/presentation/context/cartContext";
import { useCart } from "./useCart";

describe("useCart", () => {
  it("returns the cart context value when inside CartProvider", () => {
    const count = faker.number.int({ min: 1, max: 99 });
    const addToCart = vi.fn();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartContext.Provider value={{ count, addToCart }}>
        {children}
      </CartContext.Provider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.count).toBe(count);
    expect(result.current.addToCart).toBe(addToCart);
  });

  it("throws when used outside CartProvider", () => {
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used within CartProvider",
    );
  });
});
