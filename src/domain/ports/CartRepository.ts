import type { Cart, ProductSelection } from "../models";

export interface CartRepository {
  add(selection: ProductSelection): Promise<Cart>;
}
