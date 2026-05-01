import { describe, expect, it } from "vitest";

import type { ConditionMemory, FormMemory } from "src/types/state/memory";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./nest.condition";

describe("ConditionMemory", () => {
  describe("getItem", () => {
    it("returns the item at the given `then` position within the given `ConditionMemory` object", () => {
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: ConditionMemory = {
        type: "condition",
        then: {
          1: item,
        },
        else: {},
      };
      const position: Position = { type: "condition", branch: "then", slot: 1 };
      const result = getItem(nest, position);
      expect(result).toBe(item);
    });

    it("returns the item at the given `else` position within the given `ConditionMemory` object", () => {
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: ConditionMemory = {
        type: "condition",
        then: {},
        else: {
          1: item,
        },
      };
      const position: Position = { type: "condition", branch: "else", slot: 1 };
      const result = getItem(nest, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `ConditionMemory` object", () => {
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: ConditionMemory = {
        type: "condition",
        then: {},
        else: {
          1: item,
        },
      };
      const position: Position = { type: "condition", branch: "then", slot: 1 };
      const result = getItem(nest, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given `then` position within the given `ConditionMemory` object", () => {
      const nest: ConditionMemory = {
        type: "condition",
        then: {},
        else: {},
      };
      const position: Position = { type: "condition", branch: "then", slot: 1 };
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(nest, position, item);
      const expected: ConditionMemory = {
        type: "condition",
        then: {
          1: item,
        },
        else: {},
      };
      expect(nest).toEqual(expected);
    });

    it("sets the item at the given `else` position within the given `ConditionMemory` object", () => {
      const nest: ConditionMemory = {
        type: "condition",
        then: {},
        else: {},
      };
      const position: Position = { type: "condition", branch: "else", slot: 1 };
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(nest, position, item);
      const expected: ConditionMemory = {
        type: "condition",
        then: {},
        else: {
          1: item,
        },
      };
      expect(nest).toEqual(expected);
    });
  });
});
