import { faker } from "@faker-js/faker";
import type { Product } from "@/domain/models";

export class ProductMother {
  static create(overrides?: Partial<Product>): Product {
    return {
      id: faker.string.uuid(),
      brand: faker.company.name(),
      model: faker.commerce.productName(),
      price: faker.number.int({ min: 50, max: 2000 }),
      imgUrl: faker.image.urlPicsumPhotos(),
      ...overrides,
    };
  }

  static createList(count: number, overrides?: Partial<Product>): Product[] {
    return Array.from({ length: count }, () => ProductMother.create(overrides));
  }
}
