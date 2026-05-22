import { faker } from "@faker-js/faker";
import type { ProductSelection } from "@/domain/models";

export class ProductSelectionMother {
  static create(overrides?: Partial<ProductSelection>): ProductSelection {
    return {
      productId: faker.string.uuid(),
      colorCode: faker.helpers.arrayElement([100, 101, 102, 103, 104]),
      storageCode: faker.helpers.arrayElement([200, 201, 202, 203, 204]),
      ...overrides,
    };
  }
}
