import { describe, expect, it } from "vitest";

import type { ListFlow, ReturnFlow } from "../../types/flow/plain";
import type { Position } from "src/types/state/position";

import { into, next, at } from "./nest.list";

describe("ListFlow", () => {
  describe("into", () => {
    it("navigates into the `ListFlow` object", () => {
      const flow: ListFlow = [
        {
          form: {
            fields: () => ({}),
            render: () => ({}),
          },
        },
      ];
      const position = into(flow);
      expect(position).toEqual({ type: "list", slot: 0 });
    });

    it("doesn't navigate into the `ListFlow` object", () => {
      const flow: ListFlow = [];
      const position = into(flow);
      expect(position).toEqual(null);
    });
  });

  describe("next", () => {
    it("navigates to the next item in the `ListFlow` object", () => {
      const flow: ListFlow = [
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
      ];
      const current: Position = { type: "list", slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual({ type: "list", slot: 1 });
    });

    it("doesn't navigate to the next item in the `ListFlow` object", () => {
      const flow: ListFlow = [
        {
          form: {
            fields: () => ({}),
            render: () => ({}),
          },
        },
      ];
      const current: Position = { type: "list", slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual(null);
    });
  });
});

describe("at", () => {
  it("retrieves the item at the specified position in the `ListFlow` object", () => {
    const item: ReturnFlow = { return: () => ({}) };
    const flow: ListFlow = [{ variables: () => ({}) }, item];
    const position: Position = { type: "list", slot: 1 };
    const result = at(flow, position);
    expect(result).toBe(item);
  });
});
