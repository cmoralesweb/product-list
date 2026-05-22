import { describe, it, expect, afterEach, vi } from "vitest";
import { faker } from "@faker-js/faker";
import { HttpClient } from "./httpClient";

describe("HttpClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("get", () => {
    it("makes a GET request to the path appended to baseUrl", async () => {
      const data = { id: faker.string.uuid() };
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(data),
        }),
      );

      const baseUrl = faker.internet.url();
      const path = `/api/${faker.word.noun()}`;
      const result = await new HttpClient(baseUrl).get(path);

      expect(fetch).toHaveBeenCalledWith(`${baseUrl}${path}`);
      expect(result).toEqual(data);
    });

    it("throws on non-ok response with status code", async () => {
      const status = faker.number.int({ min: 400, max: 599 });
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
          status,
        }),
      );

      const path = `/api/${faker.word.noun()}`;

      await expect(
        new HttpClient(faker.internet.url()).get(path),
      ).rejects.toThrow(`GET ${path} failed: ${status}`);
    });
  });

  describe("post", () => {
    it("makes a POST request to the path appended to baseUrl", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({}),
        }),
      );

      const baseUrl = faker.internet.url();
      const path = `/api/${faker.word.noun()}`;
      await new HttpClient(baseUrl).post(path, {});

      expect(fetch).toHaveBeenCalledWith(`${baseUrl}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
    });

    it("sends request body as JSON", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({}),
        }),
      );

      const body = { value: faker.lorem.word() };
      await new HttpClient(faker.internet.url()).post("/api/cart", body);

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ body: JSON.stringify(body) }),
      );
    });

    it("sets Content-Type header to application/json", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({}),
        }),
      );

      await new HttpClient(faker.internet.url()).post("/api/cart", {});

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    it("throws on non-ok response with status code", async () => {
      const status = faker.number.int({ min: 400, max: 599 });
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
          status,
        }),
      );

      const path = `/api/${faker.word.noun()}`;

      await expect(
        new HttpClient(faker.internet.url()).post(path, {}),
      ).rejects.toThrow(`POST ${path} failed: ${status}`);
    });
  });
});
