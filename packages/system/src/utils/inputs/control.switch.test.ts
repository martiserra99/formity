import { describe, expect, it } from "vitest";

import type { SwitchValues, FormValues } from "src/types/state/values";
import type { Position } from "src/types/state/position";

import { getItem, setItem } from "./control.switch";

describe("SwitchInputs", () => {
  describe("getItem", () => {
    it("returns the item at the given branch position within the given `SwitchInputs` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: SwitchValues = {
        type: "switch",
        branches: {
          1: {
            1: item,
          },
        },
        default: {},
      };
      const position: Position = { type: "switch", branch: 1, slot: 1 };
      const result = getItem(control, position);
      expect(result).toBe(item);
    });

    it("returns the item at the given default branch position within the given `SwitchInputs` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: SwitchValues = {
        type: "switch",
        branches: {},
        default: {
          1: item,
        },
      };
      const position: Position = { type: "switch", branch: -1, slot: 1 };
      const result = getItem(control, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a branch position that doesn't exist in the given `SwitchInputs` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: SwitchValues = {
        type: "switch",
        branches: {
          1: {
            1: item,
          },
        },
        default: {},
      };
      const position: Position = { type: "switch", branch: 1, slot: 0 };
      const result = getItem(control, position);
      expect(result).toBe(null);
    });

    it("returns null when trying to get an item from a default branch position that doesn't exist in the given `SwitchInputs` object", () => {
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const control: SwitchValues = {
        type: "switch",
        branches: {},
        default: {
          1: item,
        },
      };
      const position: Position = { type: "switch", branch: -1, slot: 0 };
      const result = getItem(control, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given branch position within the given `SwitchInputs` object", () => {
      const control: SwitchValues = {
        type: "switch",
        branches: {},
        default: {},
      };
      const position: Position = { type: "switch", branch: 1, slot: 1 };
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(control, position, item);
      const expected: SwitchValues = {
        type: "switch",
        branches: {
          1: {
            1: item,
          },
        },
        default: {},
      };
      expect(control).toEqual(expected);
    });

    it("sets the item at the given default branch position within the given `SwitchInputs` object", () => {
      const control: SwitchValues = {
        type: "switch",
        branches: {},
        default: {},
      };
      const position: Position = { type: "switch", branch: -1, slot: 1 };
      const item: FormValues = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(control, position, item);
      const expected: SwitchValues = {
        type: "switch",
        branches: {},
        default: {
          1: item,
        },
      };
      expect(control).toEqual(expected);
    });
  });
});
