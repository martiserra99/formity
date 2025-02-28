import { describe, expect, it } from "vitest";

import type { LoopSchema, ReturnSchema } from "../../types/schema/model";
import type { Position } from "src/types/state/position";

import { into, next, at } from "./flow.loop";

describe("LoopSchema", () => {
  describe("into", () => {
    it("navigates into the `LoopSchema` object", () => {
      const schema: LoopSchema = {
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
      const position = into(schema, {});
      expect(position).toEqual({ type: "loop", slot: 0 });
    });

    it("doesn't navigate into the `LoopSchema` object if the condition is false", () => {
      const schema: LoopSchema = {
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
      const position = into(schema, {});
      expect(position).toEqual(null);
    });

    it("doesn't navigate into the `LoopSchema` object if there are no items", () => {
      const schema: LoopSchema = {
        loop: {
          while: () => true,
          do: [],
        },
      };
      const position = into(schema, {});
      expect(position).toEqual(null);
    });
  });

  describe("next", () => {
    it("navigates to the next item in the `LoopSchema` object", () => {
      const schema: LoopSchema = {
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
      const position = next(schema, current, {});
      expect(position).toEqual({ type: "loop", slot: 1 });
    });

    it("navigates to the first item in the `LoopSchema` object", () => {
      const schema: LoopSchema = {
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
      const position = next(schema, current, {});
      expect(position).toEqual({ type: "loop", slot: 0 });
    });

    it("doesn't navigate to the next item in the `LoopSchema` object", () => {
      const schema: LoopSchema = {
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
      const position = next(schema, current, {});
      expect(position).toEqual(null);
    });
  });
});

describe("at", () => {
  it("retrieves the item at the specified position in the `LoopSchema` object", () => {
    const item: ReturnSchema = { return: () => ({}) };
    const schema: LoopSchema = {
      loop: {
        while: () => true,
        do: [{ variables: () => ({}) }, item],
      },
    };
    const position: Position = { type: "loop", slot: 1 };
    const result = at(schema, position);
    expect(result).toBe(item);
  });
});
