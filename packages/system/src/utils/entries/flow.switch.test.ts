import { describe, expect, it } from "vitest";

import type { SwitchEntries, FormEntries } from "src/types/flow/entries";
import type { Position } from "src/types/flow/position";

import { getItem, setItem } from "./flow.switch";

describe("SwitchEntries", () => {
  describe("getItem", () => {
    it("returns the item at the given branch position within the given `SwitchEntries` object", () => {
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: SwitchEntries = {
        type: "switch",
        branches: {
          1: {
            1: item,
          },
        },
        default: {},
      };
      const position: Position = { type: "switch", branch: 1, slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(item);
    });

    it("returns the item at the given default branch position within the given `SwitchEntries` object", () => {
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: SwitchEntries = {
        type: "switch",
        branches: {},
        default: {
          1: item,
        },
      };
      const position: Position = { type: "switch", branch: -1, slot: 1 };
      const result = getItem(flow, position);
      expect(result).toBe(item);
    });

    it("returns null when trying to get an item from a branch position that doesn't exist in the given `SwitchEntries` object", () => {
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: SwitchEntries = {
        type: "switch",
        branches: {
          1: {
            1: item,
          },
        },
        default: {},
      };
      const position: Position = { type: "switch", branch: 1, slot: 0 };
      const result = getItem(flow, position);
      expect(result).toBe(null);
    });

    it("returns null when trying to get an item from a default branch position that doesn't exist in the given `SwitchEntries` object", () => {
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      const flow: SwitchEntries = {
        type: "switch",
        branches: {},
        default: {
          1: item,
        },
      };
      const position: Position = { type: "switch", branch: -1, slot: 0 };
      const result = getItem(flow, position);
      expect(result).toBe(null);
    });
  });

  describe("setItem", () => {
    it("sets the item at the given branch position within the given `SwitchEntries` object", () => {
      const flow: SwitchEntries = {
        type: "switch",
        branches: {},
        default: {},
      };
      const position: Position = { type: "switch", branch: 1, slot: 1 };
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(flow, position, item);
      const expected: SwitchEntries = {
        type: "switch",
        branches: {
          1: {
            1: item,
          },
        },
        default: {},
      };
      expect(flow).toEqual(expected);
    });

    it("sets the item at the given default branch position within the given `SwitchEntries` object", () => {
      const flow: SwitchEntries = {
        type: "switch",
        branches: {},
        default: {},
      };
      const position: Position = { type: "switch", branch: -1, slot: 1 };
      const item: FormEntries = {
        a: {
          data: { here: true, data: 1 },
          keys: {},
        },
      };
      setItem(flow, position, item);
      const expected: SwitchEntries = {
        type: "switch",
        branches: {},
        default: {
          1: item,
        },
      };
      expect(flow).toEqual(expected);
    });
  });
});
