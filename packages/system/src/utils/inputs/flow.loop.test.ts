import { describe, expect, it } from "vitest";

import type { LoopInputs, FormInputs } from "src/types/state/inputs";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./flow.loop";

describe("LoopInputs", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `LoopInputs` object", () => {
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: LoopInputs = {
        type: "loop",
        list: {
          1: item,
        },
      };
      const position: Position = { type: "loop", slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `LoopInputs` object", () => {
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: LoopInputs = {
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
    it("sets the item at the given position within the given `LoopInputs` object", () => {
      const flow: LoopInputs = {
        type: "loop",
        list: {},
      };
      const position: Position = { type: "loop", slot: 1 };
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(flow, position, item);
      const expected: LoopInputs = {
        type: "loop",
        list: {
          1: item,
        },
      };
      expect(flow).toEqual(expected);
    });
  });
});
