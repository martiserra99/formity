import { describe, expect, it } from "vitest";

import type { ConditionValues, FormValues } from "src/types/state/values";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./scope.condition";

describe("ConditionValues", () => {
  describe("getItem", () => {
    it("returns the item at the given `then` position within the given `ConditionValues` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const scope: ConditionValues = {
        type: "condition",
        then: {
          1: item,
        },
        else: {},
      };
      const position: Position = { type: "condition", path: "then", slot: 1 };
      const result = getItem(scope, position);
      expect(result).toBe(item);
    });

    it("returns the item at the given `else` position within the given `ConditionValues` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const scope: ConditionValues = {
        type: "condition",
        then: {},
        else: {
          1: item,
        },
      };
      const position: Position = { type: "condition", path: "else", slot: 1 };
      const result = getItem(scope, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `ConditionValues` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const scope: ConditionValues = {
        type: "condition",
        then: {},
        else: {
          1: item,
        },
      };
      const position: Position = { type: "condition", path: "then", slot: 1 };
      const result = getItem(scope, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given `then` position within the given `ConditionValues` object", () => {
      const scope: ConditionValues = {
        type: "condition",
        then: {},
        else: {},
      };
      const position: Position = { type: "condition", path: "then", slot: 1 };
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(scope, position, item);
      const expected: ConditionValues = {
        type: "condition",
        then: {
          1: item,
        },
        else: {},
      };
      expect(scope).toEqual(expected);
    });

    it("sets the item at the given `else` position within the given `ConditionValues` object", () => {
      const scope: ConditionValues = {
        type: "condition",
        then: {},
        else: {},
      };
      const position: Position = { type: "condition", path: "else", slot: 1 };
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(scope, position, item);
      const expected: ConditionValues = {
        type: "condition",
        then: {},
        else: {
          1: item,
        },
      };
      expect(scope).toEqual(expected);
    });
  });
});
