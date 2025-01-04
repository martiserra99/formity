import { describe, expect, it } from "vitest";

import type { ListSchema, ReturnSchema } from "../../types/schema/static";
import type { Position } from "src/types/flow/position";

import { into, next, at } from "./flow.list";

describe("ListSchema", () => {
  describe("into", () => {
    it("navigates into the `ListSchema` object", () => {
      const schema: ListSchema = [
        {
          form: {
            values: () => ({}),
            render: () => ({}),
          },
        },
      ];
      const position = into(schema);
      expect(position).toEqual({ type: "list", slot: 0 });
    });

    it("doesn't navigate into the `ListSchema` object", () => {
      const schema: ListSchema = [];
      const position = into(schema);
      expect(position).toEqual(null);
    });
  });

  describe("next", () => {
    it("navigates to the next item in the `ListSchema` object", () => {
      const schema: ListSchema = [
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
      ];
      const current: Position = { type: "list", slot: 0 };
      const position = next(schema, current);
      expect(position).toEqual({ type: "list", slot: 1 });
    });

    it("doesn't navigate to the next item in the `ListSchema` object", () => {
      const schema: ListSchema = [
        {
          form: {
            values: () => ({}),
            render: () => ({}),
          },
        },
      ];
      const current: Position = { type: "list", slot: 0 };
      const position = next(schema, current);
      expect(position).toEqual(null);
    });
  });
});

describe("at", () => {
  it("retrieves the item at the specified position in the `ListSchema` object", () => {
    const item: ReturnSchema = { return: () => ({}) };
    const schema: ListSchema = [{ variables: () => ({}) }, item];
    const position: Position = { type: "list", slot: 1 };
    const result = at(schema, position);
    expect(result).toEqual(item);
  });
});
