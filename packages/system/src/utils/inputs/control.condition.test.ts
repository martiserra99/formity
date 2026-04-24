import { describe, expect, it } from "vitest";

import type { ConditionValues, FormValues } from "src/types/state/values";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./control.condition";

describe("ConditionInputs", () => {
  describe("getItem", () => {
    it("returns the item at the given `then` position within the given `ConditionInputs` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: ConditionValues = {
        type: "condition",
        then: {
          1: item,
        },
        else: {},
      };
      const position: Position = { type: "condition", path: "then", slot: 1 };
      const result = getItem(control, position);
      expect(result).toBe(item);
    });

    it("returns the item at the given `else` position within the given `ConditionInputs` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: ConditionValues = {
        type: "condition",
        then: {},
        else: {
          1: item,
        },
      };
      const position: Position = { type: "condition", path: "else", slot: 1 };
      const result = getItem(control, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `ConditionInputs` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: ConditionValues = {
        type: "condition",
        then: {},
        else: {
          1: item,
        },
      };
      const position: Position = { type: "condition", path: "then", slot: 1 };
      const result = getItem(control, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given `then` position within the given `ConditionInputs` object", () => {
      const control: ConditionValues = {
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
      setItem(control, position, item);
      const expected: ConditionValues = {
        type: "condition",
        then: {
          1: item,
        },
        else: {},
      };
      expect(control).toEqual(expected);
    });

    it("sets the item at the given `else` position within the given `ConditionInputs` object", () => {
      const control: ConditionValues = {
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
      setItem(control, position, item);
      const expected: ConditionValues = {
        type: "condition",
        then: {},
        else: {
          1: item,
        },
      };
      expect(control).toEqual(expected);
    });
  });
});
