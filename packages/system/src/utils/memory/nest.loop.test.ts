import { describe, expect, it } from "vitest";

import type { LoopMemory, FormMemory } from "src/types/state/memory";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./nest.loop";

describe("LoopMemory", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `LoopMemory` object", () => {
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: LoopMemory = {
        type: "loop",
        do: {
          1: item,
        },
      };
      const position: Position = { type: "loop", slot: 1 };
      const result = getItem(nest, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `LoopMemory` object", () => {
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: LoopMemory = {
        type: "loop",
        do: {
          0: item,
        },
      };
      const position: Position = { type: "loop", slot: 1 };
      const result = getItem(nest, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given position within the given `LoopMemory` object", () => {
      const nest: LoopMemory = {
        type: "loop",
        do: {},
      };
      const position: Position = { type: "loop", slot: 1 };
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(nest, position, item);
      const expected: LoopMemory = {
        type: "loop",
        do: {
          1: item,
        },
      };
      expect(nest).toEqual(expected);
    });
  });
});
