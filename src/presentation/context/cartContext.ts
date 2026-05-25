import { createContext } from "react";
import type { ProductSelection } from "@/domain/models";

export interface CartContextValue {
  count: number;
  addToCart: (selection: ProductSelection) => Promise<void>;
}

export const CartContext = createContext<CartContextValue | null>(null);
