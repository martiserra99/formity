import { describe, expect, it } from "vitest";

import type { ListMemory, FormMemory } from "src/types/state/memory";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./nest.list";

describe("ListMemory", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `ListMemory` object", () => {
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: ListMemory = {
        type: "list",
        list: {
          1: item,
        },
      };
      const position: Position = { type: "list", slot: 1 };
      const result = getItem(nest, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `ListMemory` object", () => {
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: ListMemory = {
        type: "list",
        list: {
          0: item,
        },
      };
      const position: Position = { type: "list", slot: 1 };
      const result = getItem(nest, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given position within the given `ListMemory` object", () => {
      const nest: ListMemory = {
        type: "list",
        list: {},
      };
      const position: Position = { type: "list", slot: 1 };
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(nest, position, item);
      const expected: ListMemory = {
        type: "list",
        list: {
          1: item,
        },
      };
      expect(nest).toEqual(expected);
    });
  });
});
