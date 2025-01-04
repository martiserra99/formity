import { describe, expect, it } from "vitest";

import type { LoopEntries, FormEntries } from "src/types/flow/entries";
import type { Position } from "src/types/flow/position";

import { getItem, setItem } from "./flow.loop";

describe("LoopEntries", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `LoopEntries` object", () => {
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: LoopEntries = {
        type: "loop",
        list: {
          1: item,
        },
      };
      const position: Position = { type: "loop", slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `LoopEntries` object", () => {
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: LoopEntries = {
        type: "loop",
        list: {
          0: item,
        },
      };
      const position: Position = { type: "loop", slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given position within the given `LoopEntries` object", () => {
      const flow: LoopEntries = {
        type: "loop",
        list: {},
      };
      const position: Position = { type: "loop", slot: 1 };
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(flow, position, item);
      const expected: LoopEntries = {
        type: "loop",
        list: {
          1: item,
        },
      };
      expect(flow).toEqual(expected);
    });
  });
});
