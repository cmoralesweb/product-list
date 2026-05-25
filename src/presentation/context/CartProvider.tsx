import { useState, type ReactNode } from "react";
import { CartContext } from "@/presentation/context/cartContext";
import { AddToCartUseCase } from "@/application/usecases";
import type { CartRepository, CacheService } from "@/domain/ports";
import type { ProductSelection } from "@/domain/models";

const CART_COUNT_KEY = "cart_count";
const CART_COUNT_TTL_MS = 86_400_000;

export function CartProvider({
  children,
  cartRepo,
  cache,
}: {
  children: ReactNode;
  cartRepo: CartRepository;
  cache: CacheService;
}) {
  const [count, setCount] = useState(
    () => cache.get<number>(CART_COUNT_KEY) ?? 0,
  );
  const addToCartUseCase = new AddToCartUseCase(cartRepo);

  const addToCart = async (selection: ProductSelection) => {
    const result = await addToCartUseCase.execute(selection);
    setCount(result.count);
    cache.set(CART_COUNT_KEY, result.count, CART_COUNT_TTL_MS);
  };

  return (
    <CartContext.Provider value={{ count, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
