import { describe, expect, it } from "vitest";

import type { ListValues, FormValues } from "src/types/state/values";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./scope.list";

describe("ListValues", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `ListValues` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const scope: ListValues = {
        type: "list",
        list: {
          1: item,
        },
      };
      const position: Position = { type: "list", slot: 1 };
      const result = getItem(scope, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `ListValues` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const scope: ListValues = {
        type: "list",
        list: {
          0: item,
        },
      };
      const position: Position = { type: "list", slot: 1 };
      const result = getItem(scope, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given position within the given `ListValues` object", () => {
      const scope: ListValues = {
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
      setItem(scope, position, item);
      const expected: ListValues = {
        type: "list",
        list: {
          1: item,
        },
      };
      expect(scope).toEqual(expected);
    });
  });
});
