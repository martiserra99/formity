import { describe, expect, it } from "vitest";

import type { ListInputs, FormInputs } from "src/types/state/inputs";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./flow.list";

describe("ListInputs", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `ListInputs` object", () => {
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: ListInputs = {
        type: "list",
        list: {
          1: item,
        },
      };
      const position: Position = { type: "list", slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `ListInputs` object", () => {
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: ListInputs = {
        type: "list",
        list: {
          0: item,
        },
      };
      const position: Position = { type: "list", slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given position within the given `ListInputs` object", () => {
      const flow: ListInputs = {
        type: "list",
        list: {},
      };
      const position: Position = { type: "list", slot: 1 };
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(flow, position, item);
      const expected: ListInputs = {
        type: "list",
        list: {
          1: item,
        },
      };
      expect(flow).toEqual(expected);
    });
  });
});
