import { describe, expect, it } from "vitest";

import type { JumpValues, FormValues } from "src/types/state/values";

import { getItem, setItem } from "./nest.jump";

describe("JumpValues", () => {
  describe("getItem", () => {
    it("returns the item within the given `JumpValues` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: JumpValues = {
        type: "jump",
        at: item,
      };
      const result = getItem(nest);
      expect(result).toBe(item);
    });

    it("returns null when trying to get the item and it doesn't exist in the given `JumpValues` object", () => {
      const nest: JumpValues = {
        type: "jump",
        at: undefined,
      };
      const result = getItem(nest);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item within the given `JumpValues` object", () => {
      const nest: JumpValues = {
        type: "jump",
        at: undefined,
      };
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(nest, item);
      const expected: JumpValues = {
        type: "jump",
        at: item,
      };
      expect(nest).toEqual(expected);
    });
  });
});
