import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import {
  getColors,
  getDefaultColorCode,
  getDefaultStorageCode,
  getStorages,
} from "@/domain/models";

const code1 = faker.number.int();
const code2 = faker.number.int();
const code3 = faker.number.int();

const colors = [
  { code: code1, name: "Black" },
  { code: code2, name: "White" },
];
const storages = [{ code: code3, name: "128 GB" }];

const populatedOptions = { colors, storages };

describe("getColors", () => {
  it("returns colors when options exist", () => {
    expect(getColors(populatedOptions)).toEqual(colors);
  });

  it("returns empty array when options is undefined", () => {
    expect(getColors(undefined)).toEqual([]);
  });

  it("returns empty array when options has no colors", () => {
    expect(getColors({ colors: [], storages: [] })).toEqual([]);
  });
});

describe("getStorages", () => {
  it("returns storages when options exist", () => {
    expect(getStorages(populatedOptions)).toEqual(storages);
  });

  it("returns empty array when options is undefined", () => {
    expect(getStorages(undefined)).toEqual([]);
  });

  it("returns empty array when options has no storages", () => {
    expect(getStorages({ colors: [], storages: [] })).toEqual([]);
  });
});

describe("getDefaultColorCode", () => {
  it("returns first color code when colors exist", () => {
    expect(getDefaultColorCode(populatedOptions)).toBe(code1);
  });

  it("returns null when options is undefined", () => {
    expect(getDefaultColorCode(undefined)).toBeNull();
  });

  it("returns null when colors array is empty", () => {
    expect(getDefaultColorCode({ colors: [], storages: [] })).toBeNull();
  });
});

describe("getDefaultStorageCode", () => {
  it("returns first storage code when storages exist", () => {
    expect(getDefaultStorageCode(populatedOptions)).toBe(code3);
  });

  it("returns null when options is undefined", () => {
    expect(getDefaultStorageCode(undefined)).toBeNull();
  });

  it("returns null when storages array is empty", () => {
    expect(getDefaultStorageCode({ colors: [], storages: [] })).toBeNull();
  });
});
