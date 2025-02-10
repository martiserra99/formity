import { describe, expect, it } from "vitest";

import type { ListSchema, ReturnSchema } from "../../types/schema/untyped";
import type { Position } from "src/types/state/position";

import { find } from "./flow";

describe("FlowSchema", () => {
  describe("find", () => {
    it("returns the item at the given path within the given schema", () => {
      const item: ReturnSchema = { return: () => ({}) };
      const schema: ListSchema = [
        { variables: () => ({}) },
        {
          cond: {
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
        { type: "cond", path: "then", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const result = find(schema, path);
      expect(result).toBe(item);
    });
  });
});
