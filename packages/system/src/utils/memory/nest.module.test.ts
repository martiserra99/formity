import { describe, expect, it } from "vitest";

import type { ModuleMemory, FormMemory } from "src/types/state/memory";

import { getItem, setItem } from "./nest.module";

describe("ModuleMemory", () => {
  describe("getItem", () => {
    it("returns the item within the given `ModuleMemory` object", () => {
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: ModuleMemory = {
        type: "module",
        module: item,
      };
      const result = getItem(nest);
      expect(result).toBe(item);
    });

    it("returns null when trying to get the item and it doesn't exist in the given `ModuleMemory` object", () => {
      const nest: ModuleMemory = {
        type: "module",
        module: undefined,
      };
      const result = getItem(nest);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item within the given `ModuleMemory` object", () => {
      const nest: ModuleMemory = {
        type: "module",
        module: undefined,
      };
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(nest, item);
      const expected: ModuleMemory = {
        type: "module",
        module: item,
      };
      expect(nest).toEqual(expected);
    });
  });
});
