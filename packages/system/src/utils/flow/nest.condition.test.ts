import { describe, expect, it } from "vitest";

import type { ConditionFlow, ReturnFlow } from "../../types/flow/plain";
import type { Position } from "src/types/state/position";

import { into, next, at } from "./nest.condition";

describe("ConditionFlow", () => {
  describe("into", () => {
    it("navigates into the `then` branch of the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
          ],
          else: [],
        },
      };
      const position = into(flow, {});
      console.log("position", position);
      expect(position).toEqual({ type: "condition", branch: "then", slot: 0 });
    });

    it("navigates into the `else` branch of the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => false,
          then: [],
          else: [
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const position = into(flow, {});
      expect(position).toEqual({ type: "condition", branch: "else", slot: 0 });
    });

    it("doesn't navigate into the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [],
          else: [
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const position = into(flow, {});
      expect(position).toEqual(null);
    });
  });

  describe("next", () => {
    it("navigates to the next item in the `then` branch of the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
          ],
          else: [],
        },
      };
      const current: Position = { type: "condition", branch: "then", slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual({ type: "condition", branch: "then", slot: 1 });
    });

    it("navigates to the next item in the `else` branch of the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [],
          else: [
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const current: Position = { type: "condition", branch: "else", slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual({ type: "condition", branch: "else", slot: 1 });
    });

    it("doesn't navigate to the next item in the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
          ],
          else: [
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const current: Position = { type: "condition", branch: "then", slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual(null);
    });
  });

  describe("at", () => {
    it("retrieves the item at the specified position in the `then` branch of the `ConditionFlow` object", () => {
      const item: ReturnFlow = { return: () => ({}) };
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [{ variables: () => ({}) }, item],
          else: [],
        },
      };
      const position: Position = { type: "condition", branch: "then", slot: 1 };
      const result = at(flow, position);
      expect(result).toBe(item);
    });

    it("retrieves the item at the specified position in the `else` branch of the `ConditionFlow` object", () => {
      const item: ReturnFlow = { return: () => ({}) };
      const flow: ConditionFlow = {
        condition: {
          if: () => false,
          then: [],
          else: [{ variables: () => ({}) }, item],
        },
      };
      const position: Position = { type: "condition", branch: "else", slot: 1 };
      const result = at(flow, position);
      expect(result).toBe(item);
    });
  });
});
