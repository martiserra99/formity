import { describe, expect, it } from "vitest";

import type { LoopFlow, ReturnFlow } from "../../types/flow/model";
import type { Position } from "src/types/state/position";

import { into, next, at } from "./scope.loop";

describe("LoopFlow", () => {
  describe("into", () => {
    it("navigates into the `LoopFlow` object", () => {
      const flow: LoopFlow = {
        loop: {
          while: () => true,
          do: [
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
      expect(position).toEqual({ type: "loop", slot: 0 });
    });

    it("doesn't navigate into the `LoopFlow` object if the condition is false", () => {
      const flow: LoopFlow = {
        loop: {
          while: () => false,
          do: [
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

    it("doesn't navigate into the `LoopFlow` object if there are no items", () => {
      const flow: LoopFlow = {
        loop: {
          while: () => true,
          do: [],
        },
      };
      const position = into(flow, {});
      expect(position).toEqual(null);
    });
  });

  describe("next", () => {
    it("navigates to the next item in the `LoopFlow` object", () => {
      const flow: LoopFlow = {
        loop: {
          while: () => true,
          do: [
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
      const current: Position = { type: "loop", slot: 0 };
      const position = next(flow, current, {});
      expect(position).toEqual({ type: "loop", slot: 1 });
    });

    it("navigates to the first item in the `LoopFlow` object", () => {
      const flow: LoopFlow = {
        loop: {
          while: () => true,
          do: [
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
      const current: Position = { type: "loop", slot: 1 };
      const position = next(flow, current, {});
      expect(position).toEqual({ type: "loop", slot: 0 });
    });

    it("doesn't navigate to the next item in the `LoopFlow` object", () => {
      const flow: LoopFlow = {
        loop: {
          while: () => false,
          do: [
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
      const current: Position = { type: "loop", slot: 1 };
      const position = next(flow, current, {});
      expect(position).toEqual(null);
    });
  });
});

describe("at", () => {
  it("retrieves the item at the specified position in the `LoopFlow` object", () => {
    const item: ReturnFlow = { return: () => ({}) };
    const flow: LoopFlow = {
      loop: {
        while: () => true,
        do: [{ variables: () => ({}) }, item],
      },
    };
    const position: Position = { type: "loop", slot: 1 };
    const result = at(flow, position);
    expect(result).toBe(item);
  });
});
