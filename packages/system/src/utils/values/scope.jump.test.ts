import { describe, expect, it } from "vitest";

import type { JumpValues, FormValues } from "src/types/state/values";

import { getItem, setItem } from "./scope.jump";

describe("JumpValues", () => {
  describe("getItem", () => {
    it("returns the item within the given `JumpValues` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const scope: JumpValues = {
        type: "jump",
        item: item,
      };
      const result = getItem(scope);
      expect(result).toBe(item);
    });

    it("returns null when trying to get the item and it doesn't exist in the given `JumpValues` object", () => {
      const scope: JumpValues = {
        type: "jump",
        item: undefined,
      };
      const result = getItem(scope);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item within the given `JumpValues` object", () => {
      const scope: JumpValues = {
        type: "jump",
        item: undefined,
      };
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(scope, item);
      const expected: JumpValues = {
        type: "jump",
        item: item,
      };
      expect(scope).toEqual(expected);
    });
  });
});
