import type { CartRepository } from "@/domain/ports";
import type { Cart, ProductSelection } from "@/domain/models";

export class AddToCartUseCase {
  constructor(private readonly cartRepo: CartRepository) {}

  async execute(selection: ProductSelection): Promise<Cart> {
    return this.cartRepo.add(selection);
  }
}
