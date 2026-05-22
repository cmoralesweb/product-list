import { describe, it, expect, vi } from "vitest";
import { faker } from "@faker-js/faker";
import { ProductApiAdapter } from "./ProductApiAdapter";
import type { HttpClient } from "./httpClient";

describe("ProductApiAdapter", () => {
  describe("getAll", () => {
    it("returns mapped products from DTOs", async () => {
      const brand = faker.company.name();
      const model = faker.commerce.productName();
      const price = faker.commerce.price();
      const priceNum = Number(price);
      const dtos = [
        {
          id: faker.string.uuid(),
          brand,
          model,
          price,
          imgUrl: faker.image.urlPicsumPhotos(),
        },
      ];
      const http = {
        get: vi.fn().mockResolvedValue(dtos),
      } as unknown as HttpClient;
      const adapter = new ProductApiAdapter(http);

      const result = await adapter.getAll();

      expect(http.get).toHaveBeenCalledWith("/api/product");
      expect(result).toEqual([
        {
          id: dtos[0].id,
          brand,
          model,
          price: priceNum,
          imgUrl: dtos[0].imgUrl,
        },
      ]);
    });

    it("returns empty array when no products", async () => {
      const http = {
        get: vi.fn().mockResolvedValue([]),
      } as unknown as HttpClient;
      const adapter = new ProductApiAdapter(http);

      const result = await adapter.getAll();

      expect(result).toEqual([]);
    });

    it("converts price from string to number", async () => {
      const price = faker.commerce.price({ min: 100, max: 2000 });
      const priceNum = Number(price);
      const dtos = [
        {
          id: faker.string.uuid(),
          brand: faker.company.name(),
          model: faker.commerce.productName(),
          price,
          imgUrl: faker.image.urlPicsumPhotos(),
        },
      ];
      const http = {
        get: vi.fn().mockResolvedValue(dtos),
      } as unknown as HttpClient;
      const adapter = new ProductApiAdapter(http);

      const [product] = await adapter.getAll();

      expect(product.price).toBe(priceNum);
    });
  });

  describe("getById", () => {
    it("returns mapped product detail from DTO", async () => {
      const id = faker.string.uuid();
      const dto = {
        id,
        brand: faker.company.name(),
        model: faker.commerce.productName(),
        price: faker.commerce.price({ min: 100, max: 2000 }),
        imgUrl: faker.image.urlPicsumPhotos(),
        cpu: faker.lorem.words(2),
        ram: `${faker.number.int({ min: 4, max: 16 })} GB`,
        os: faker.lorem.words(2),
      };
      const http = {
        get: vi.fn().mockResolvedValue(dto),
      } as unknown as HttpClient;
      const adapter = new ProductApiAdapter(http);

      const result = await adapter.getById(id);

      expect(http.get).toHaveBeenCalledWith(`/api/product/${id}`);
      expect(result.cpu).toBe(dto.cpu);
      expect(result.ram).toBe(dto.ram);
      expect(result.os).toBe(dto.os);
    });

    it("passes the given id in the request path", async () => {
      const id = faker.string.uuid();
      const dto = {
        id,
        brand: faker.company.name(),
        model: faker.commerce.productName(),
        price: faker.commerce.price({ min: 100, max: 2000 }),
        imgUrl: faker.image.urlPicsumPhotos(),
      };
      const http = {
        get: vi.fn().mockResolvedValue(dto),
      } as unknown as HttpClient;
      const adapter = new ProductApiAdapter(http);

      await adapter.getById(id);

      expect(http.get).toHaveBeenCalledWith(`/api/product/${id}`);
    });

    it("maps DTO typo 'dimentions' to 'dimensions'", async () => {
      const dimensions = `${faker.number.int({ min: 140, max: 170 })} x ${faker.number.int({ min: 65, max: 85 })} x ${faker.number.int({ min: 6, max: 10 })} mm`;
      const dto = {
        id: faker.string.uuid(),
        brand: faker.company.name(),
        model: faker.commerce.productName(),
        price: faker.commerce.price({ min: 100, max: 2000 }),
        imgUrl: faker.image.urlPicsumPhotos(),
        dimentions: dimensions,
      };
      const http = {
        get: vi.fn().mockResolvedValue(dto),
      } as unknown as HttpClient;
      const adapter = new ProductApiAdapter(http);

      const result = await adapter.getById(dto.id);

      expect(result.dimensions).toBe(dimensions);
    });

    it("maps DTO typo 'secondaryCmera' to 'secondaryCamera'", async () => {
      const secondaryCamera = Array.from(
        { length: faker.number.int({ min: 1, max: 3 }) },
        () => `${faker.number.int({ min: 8, max: 48 })} MP`,
      );
      const dto = {
        id: faker.string.uuid(),
        brand: faker.company.name(),
        model: faker.commerce.productName(),
        price: faker.commerce.price({ min: 100, max: 2000 }),
        imgUrl: faker.image.urlPicsumPhotos(),
        secondaryCmera: secondaryCamera,
      };
      const http = {
        get: vi.fn().mockResolvedValue(dto),
      } as unknown as HttpClient;
      const adapter = new ProductApiAdapter(http);

      const result = await adapter.getById(dto.id);

      expect(result.secondaryCamera).toEqual(secondaryCamera);
    });

    it("includes optional fields when present in DTO", async () => {
      const dto = {
        id: faker.string.uuid(),
        brand: faker.company.name(),
        model: faker.commerce.productName(),
        price: faker.commerce.price({ min: 100, max: 2000 }),
        imgUrl: faker.image.urlPicsumPhotos(),
        networkTechnology: faker.lorem.words(2),
        announced: faker.date.past({ years: 3 }).getFullYear().toString(),
        status: faker.helpers.arrayElement(["Available", "Coming soon"]),
        options: {
          colors: [
            {
              code: faker.number.int({ min: 100, max: 199 }),
              name: faker.color.human(),
            },
          ],
          storages: [
            {
              code: faker.number.int({ min: 200, max: 299 }),
              name: `${faker.number.int({ min: 64, max: 512 })} GB`,
            },
          ],
        },
      };
      const http = {
        get: vi.fn().mockResolvedValue(dto),
      } as unknown as HttpClient;
      const adapter = new ProductApiAdapter(http);

      const result = await adapter.getById(dto.id);

      expect(result.networkTechnology).toBe(dto.networkTechnology);
      expect(result.announced).toBe(dto.announced);
      expect(result.status).toBe(dto.status);
      expect(result.options).toEqual(dto.options);
    });
  });
});
