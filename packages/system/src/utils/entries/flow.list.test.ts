import { describe, expect, it } from "vitest";

import type { ListEntries, FormEntries } from "src/types/flow/entries";
import type { Position } from "src/types/flow/position";

import { getItem, setItem } from "./flow.list";

describe("ListEntries", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `ListEntries` object", () => {
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: ListEntries = {
        type: "list",
        list: {
          1: item,
        },
      };
      const position: Position = { type: "list", slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `ListEntries` object", () => {
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: ListEntries = {
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
    it("sets the item at the given position within the given `ListEntries` object", () => {
      const flow: ListEntries = {
        type: "list",
        list: {},
      };
      const position: Position = { type: "list", slot: 1 };
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(flow, position, item);
      const expected: ListEntries = {
        type: "list",
        list: {
          1: item,
        },
      };
      expect(flow).toEqual(expected);
    });
  });
});
