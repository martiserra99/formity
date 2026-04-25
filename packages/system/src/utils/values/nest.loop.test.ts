import { describe, expect, it } from "vitest";

import type { LoopValues, FormValues } from "src/types/state/values";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./nest.loop";

describe("LoopValues", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `LoopValues` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: LoopValues = {
        type: "loop",
        list: {
          1: item,
        },
      };
      const position: Position = { type: "loop", slot: 1 };
      const result = getItem(nest, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `LoopValues` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: LoopValues = {
        type: "loop",
        list: {
          0: item,
        },
      };
      const position: Position = { type: "loop", slot: 1 };
      const result = getItem(nest, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given position within the given `LoopValues` object", () => {
      const nest: LoopValues = {
        type: "loop",
        list: {},
      };
      const position: Position = { type: "loop", slot: 1 };
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(nest, position, item);
      const expected: LoopValues = {
        type: "loop",
        list: {
          1: item,
        },
      };
      expect(nest).toEqual(expected);
    });
  });
});
