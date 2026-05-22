import { faker } from "@faker-js/faker";
import type { Cart } from "@/domain/models";

export class CartMother {
  static create(overrides?: Partial<Cart>): Cart {
    return {
      count: faker.number.int({ min: 1, max: 10 }),
      ...overrides,
    };
  }
}
