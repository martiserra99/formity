import { describe, expect, it } from "vitest";

import type { LoopInputs, FormInputs } from "src/types/state/inputs";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./control.loop";

describe("LoopInputs", () => {
  describe("getItem", () => {
    it("returns the item at the given position within the given `LoopInputs` object", () => {
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: LoopInputs = {
        type: "loop",
        list: {
          1: item,
        },
      };
      const position: Position = { type: "loop", slot: 1 };
      const result = getItem(control, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `LoopInputs` object", () => {
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: LoopInputs = {
        type: "loop",
        list: {
          0: item,
        },
      };
      const position: Position = { type: "loop", slot: 1 };
      const result = getItem(control, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given position within the given `LoopInputs` object", () => {
      const control: LoopInputs = {
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
      setItem(control, position, item);
      const expected: LoopInputs = {
        type: "loop",
        list: {
          1: item,
        },
      };
      expect(control).toEqual(expected);
    });
  });
});
