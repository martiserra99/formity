import { describe, expect, it } from "vitest";

import type { CondInputs, FormInputs } from "src/types/state/inputs";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./flow.cond";

describe("CondInputs", () => {
  describe("getItem", () => {
    it("returns the item at the given `then` position within the given `CondInputs` object", () => {
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: CondInputs = {
        type: "cond",
        then: {
          1: item,
        },
        else: {},
      };
      const position: Position = { type: "cond", path: "then", slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(item);
    });

    it("returns the item at the given `else` position within the given `CondInputs` object", () => {
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: CondInputs = {
        type: "cond",
        then: {},
        else: {
          1: item,
        },
      };
      const position: Position = { type: "cond", path: "else", slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a position that doesn't exist in the given `CondInputs` object", () => {
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: CondInputs = {
        type: "cond",
        then: {},
        else: {
          1: item,
        },
      };
      const position: Position = { type: "cond", path: "then", slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given `then` position within the given `CondInputs` object", () => {
      const flow: CondInputs = {
        type: "cond",
        then: {},
        else: {},
      };
      const position: Position = { type: "cond", path: "then", slot: 1 };
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(flow, position, item);
      const expected: CondInputs = {
        type: "cond",
        then: {
          1: item,
        },
        else: {},
      };
      expect(flow).toEqual(expected);
    });

    it("sets the item at the given `else` position within the given `CondInputs` object", () => {
      const flow: CondInputs = {
        type: "cond",
        then: {},
        else: {},
      };
      const position: Position = { type: "cond", path: "else", slot: 1 };
      const item: FormInputs = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(flow, position, item);
      const expected: CondInputs = {
        type: "cond",
        then: {},
        else: {
          1: item,
        },
      };
      expect(flow).toEqual(expected);
    });
  });
});
