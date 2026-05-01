import { describe, expect, it } from "vitest";

import type { JumpMemory, FormMemory } from "src/types/state/memory";

import { getItem, setItem } from "./nest.jump";

describe("JumpMemory", () => {
  describe("getItem", () => {
    it("returns the item within the given `JumpMemory` object", () => {
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const nest: JumpMemory = {
        type: "jump",
        at: item,
      };
      const result = getItem(nest);
      expect(result).toBe(item);
    });

    it("returns null when trying to get the item and it doesn't exist in the given `JumpMemory` object", () => {
      const nest: JumpMemory = {
        type: "jump",
        at: undefined,
      };
      const result = getItem(nest);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item within the given `JumpMemory` object", () => {
      const nest: JumpMemory = {
        type: "jump",
        at: undefined,
      };
      const item: FormMemory = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(nest, item);
      const expected: JumpMemory = {
        type: "jump",
        at: item,
      };
      expect(nest).toEqual(expected);
    });
  });
});
