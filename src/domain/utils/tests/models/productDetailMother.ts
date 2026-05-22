import { faker } from "@faker-js/faker";
import type {
  ColorOption,
  ProductDetail,
  StorageOption,
} from "@/domain/models";
import { ProductMother } from "./productMother";

function createColorOptions(): ColorOption[] {
  const colors = [
    { code: 100, name: "Black" },
    { code: 101, name: "White" },
    { code: 102, name: "Gold" },
    { code: 103, name: "Silver" },
    { code: 104, name: "Blue" },
  ];
  return faker.helpers.arrayElements(colors, { min: 2, max: 4 });
}

function createStorageOptions(): StorageOption[] {
  const storages = [
    { code: 200, name: "64 GB" },
    { code: 201, name: "128 GB" },
    { code: 202, name: "256 GB" },
    { code: 203, name: "512 GB" },
    { code: 204, name: "1 TB" },
  ];
  return faker.helpers.arrayElements(storages, { min: 2, max: 4 });
}

export class ProductDetailMother {
  static create(overrides?: Partial<ProductDetail>): ProductDetail {
    const base = ProductMother.create();
    return {
      ...base,
      networkTechnology: faker.helpers.arrayElement([
        "GSM / HSPA / LTE",
        "GSM / HSPA / LTE / 5G",
      ]),
      networkSpeed: faker.helpers.arrayElement([
        "HSPA 42.2/5.76 Mbps",
        "LTE-A",
        "5G",
      ]),
      announced: faker.date.past({ years: 2 }).getFullYear().toString(),
      status: faker.helpers.arrayElement([
        "Available",
        "Discontinued",
        "Coming soon",
      ]),
      dimensions: `${faker.number.int({ min: 140, max: 170 })} x ${faker.number.int(
        {
          min: 65,
          max: 85,
        },
      )} x ${faker.number.int({ min: 6, max: 10 })} mm`,
      weight: faker.number.int({ min: 140, max: 250 }).toString(),
      sim: faker.helpers.arrayElement([
        "Nano-SIM",
        "eSIM",
        "Nano-SIM + eSIM",
        "Dual SIM",
      ]),
      displayType: faker.helpers.arrayElement([
        "Super Retina XDR OLED",
        "Dynamic AMOLED 2X",
        "LTPO Super Retina XDR OLED",
        "IPS LCD",
      ]),
      displayResolution: `${faker.number.int({ min: 1080, max: 3088 })} x ${faker.number.int(
        {
          min: 2340,
          max: 2800,
        },
      )} pixels`,
      displaySize: `${faker.number.float({ min: 5.4, max: 7, fractionDigits: 1 })}"`,
      os: faker.helpers.arrayElement(["iOS 18", "Android 14", "Android 15"]),
      cpu: faker.helpers.arrayElement([
        "A18 Bionic",
        "Snapdragon 8 Gen 3",
        "Exynos 2400",
        "Tensor G4",
      ]),
      chipset: faker.helpers.arrayElement([
        "Apple A18 Bionic",
        "Qualcomm SM8650-AB Snapdragon 8 Gen 3",
        "Exynos 2400",
        "Google Tensor G4",
      ]),
      gpu: faker.helpers.arrayElement([
        "Apple GPU (5-core)",
        "Adreno 750",
        "Xclipse 940",
        "Mali-G715",
      ]),
      externalMemory: faker.helpers.arrayElement(["No", "microSDXC"]),
      internalMemory: faker.helpers.arrayElements(
        ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"],
        { min: 1, max: 3 },
      ),
      ram: `${faker.helpers.arrayElement(["6", "8", "12", "16"])} GB`,
      primaryCamera: faker.helpers.arrayElements(
        ["12 MP", "48 MP", "50 MP", "108 MP", "200 MP"],
        { min: 1, max: 3 },
      ),
      secondaryCamera: faker.helpers.arrayElements(
        ["12 MP", "16 MP", "32 MP", "48 MP"],
        { min: 1, max: 2 },
      ),
      battery: `${faker.number.int({ min: 3000, max: 6000 })} mAh`,
      colors: faker.helpers.arrayElements(
        ["Black", "White", "Gold", "Silver", "Blue"],
        { min: 2, max: 4 },
      ),
      options: {
        colors: createColorOptions(),
        storages: createStorageOptions(),
      },
      ...overrides,
    };
  }
}
