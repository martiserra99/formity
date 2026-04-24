import { describe, expect, it } from "vitest";

import type { ListValues, FormValues } from "src/types/state/values";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./control.list";

describe("ListInputs", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `ListInputs` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: ListValues = {
        type: "list",
        list: {
          1: item,
        },
      };
      const position: Position = { type: "list", slot: 1 };
      const result = getItem(control, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `ListInputs` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: ListValues = {
        type: "list",
        list: {
          0: item,
        },
      };
      const position: Position = { type: "list", slot: 1 };
      const result = getItem(control, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given position within the given `ListInputs` object", () => {
      const control: ListValues = {
        type: "list",
        list: {},
      };
      const position: Position = { type: "list", slot: 1 };
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(control, position, item);
      const expected: ListValues = {
        type: "list",
        list: {
          1: item,
        },
      };
      expect(control).toEqual(expected);
    });
  });
});
