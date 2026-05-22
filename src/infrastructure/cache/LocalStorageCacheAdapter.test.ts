import { describe, it, expect, beforeEach, vi } from "vitest";
import { faker } from "@faker-js/faker";
import { LocalStorageCacheAdapter } from "@/infrastructure/cache";

describe("LocalStorageCacheAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  it("stores a value", () => {
    const prefix = faker.string.alpha(5) + "_";
    const cache = new LocalStorageCacheAdapter(prefix);
    const key = faker.string.alphanumeric(8);
    const value = { [faker.lorem.word()]: faker.lorem.word() };

    cache.set(key, value, 60_000);

    const raw = localStorage.getItem(prefix + key);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!).data).toEqual(value);
  });

  it("retrieves a stored value", () => {
    const prefix = faker.string.alpha(5) + "_";
    const cache = new LocalStorageCacheAdapter(prefix);
    const key = faker.string.alphanumeric(8);
    const value = { [faker.lorem.word()]: faker.lorem.word() };

    cache.set(key, value, 60_000);
    const result = cache.get(key);

    expect(result).toEqual(value);
  });

  it("returns null when key does not exist", () => {
    const cache = new LocalStorageCacheAdapter();
    expect(cache.get(faker.string.alphanumeric(10))).toBeNull();
  });

  it("returns null after TTL expires", () => {
    const cache = new LocalStorageCacheAdapter("test_");
    const ttl = faker.number.int({ min: 1000, max: 99999 });
    const key = faker.string.alphanumeric(8);

    cache.set(key, faker.lorem.word(), ttl);

    vi.advanceTimersByTime(ttl + 1);

    expect(cache.get(key)).toBeNull();
  });

  it("returns null for corrupted data", () => {
    const cache = new LocalStorageCacheAdapter("test_");
    const key = faker.string.alphanumeric(8);
    localStorage.setItem("test_" + key, faker.lorem.words(3));
    expect(cache.get(key)).toBeNull();
  });
});
