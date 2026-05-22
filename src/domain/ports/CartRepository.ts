import type { Cart, ProductSelection } from "@/domain";

export interface CartRepository {
  add(selection: ProductSelection): Promise<Cart>;
}
