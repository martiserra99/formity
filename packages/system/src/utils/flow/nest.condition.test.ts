import { describe, expect, it } from "vitest";

import type { ConditionFlow, ReturnFlow } from "../../types/flow/plain";
import type { Position } from "src/types/state/position";

import { into, next, at } from "./nest.condition";

describe("ConditionFlow", () => {
  describe("into", () => {
    it("navigates into the `then` path of the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
          ],
          else: [],
        },
      };
      const position = into(flow, {});
      expect(position).toEqual({ type: "condition", path: "then", slot: 0 });
    });

    it("navigates into the `else` path of the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => false,
          then: [],
          else: [
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const position = into(flow, {});
      expect(position).toEqual({ type: "condition", path: "else", slot: 0 });
    });

    it("doesn't navigate into the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [],
          else: [
            {
              form: {
                values: () => ({}),
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
    it("navigates to the next item in the `then` path of the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
          ],
          else: [],
        },
      };
      const current: Position = { type: "condition", path: "then", slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual({ type: "condition", path: "then", slot: 1 });
    });

    it("navigates to the next item in the `else` path of the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [],
          else: [
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const current: Position = { type: "condition", path: "else", slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual({ type: "condition", path: "else", slot: 1 });
    });

    it("doesn't navigate to the next item in the `ConditionFlow` object", () => {
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
          ],
          else: [
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const current: Position = { type: "condition", path: "then", slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual(null);
    });
  });

  describe("at", () => {
    it("retrieves the item at the specified position in the `then` path of the `ConditionFlow` object", () => {
      const item: ReturnFlow = { return: () => ({}) };
      const flow: ConditionFlow = {
        condition: {
          if: () => true,
          then: [{ variables: () => ({}) }, item],
          else: [],
        },
      };
      const position: Position = { type: "condition", path: "then", slot: 1 };
      const result = at(flow, position);
      expect(result).toBe(item);
    });

    it("retrieves the item at the specified position in the `else` path of the `ConditionFlow` object", () => {
      const item: ReturnFlow = { return: () => ({}) };
      const flow: ConditionFlow = {
        condition: {
          if: () => false,
          then: [],
          else: [{ variables: () => ({}) }, item],
        },
      };
      const position: Position = { type: "condition", path: "else", slot: 1 };
      const result = at(flow, position);
      expect(result).toBe(item);
    });
  });
});
