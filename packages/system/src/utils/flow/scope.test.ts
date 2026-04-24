import { describe, expect, it } from "vitest";

import type { ListFlow, ReturnFlow } from "../../types/flow/plain";
import type { Position } from "src/types/state/position";

import { find } from "./scope";

describe("ScopeFlow", () => {
  describe("find", () => {
    it("returns the item at the given path within the given flow", () => {
      const item: ReturnFlow = { return: () => ({}) };
      const flow: ListFlow = [
        { variables: () => ({}) },
        {
          condition: {
            if: () => true,
            then: [
              {
                loop: {
                  while: () => true,
                  do: [item],
                },
              },
            ],
            else: [],
          },
        },
      ];
      const path: Position[] = [
        { type: "list", slot: 1 },
        { type: "condition", path: "then", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const result = find(flow, path);
      expect(result).toBe(item);
    });
  });
});
