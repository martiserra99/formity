import { describe, expect, it } from "vitest";

import type { CondSchema, ReturnSchema } from "../../types/schema/model";
import type { Position } from "src/types/state/position";

import { into, next, at } from "./flow.cond";

describe("CondSchema", () => {
  describe("into", () => {
    it("navigates into the `then` path of the `CondSchema` object", () => {
      const schema: CondSchema = {
        cond: {
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
      const position = into(schema, {});
      expect(position).toEqual({ type: "cond", path: "then", slot: 0 });
    });

    it("navigates into the `else` path of the `CondSchema` object", () => {
      const schema: CondSchema = {
        cond: {
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
      const position = into(schema, {});
      expect(position).toEqual({ type: "cond", path: "else", slot: 0 });
    });

    it("doesn't navigate into the `CondSchema` object", () => {
      const schema: CondSchema = {
        cond: {
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
      const position = into(schema, {});
      expect(position).toEqual(null);
    });
  });

  describe("next", () => {
    it("navigates to the next item in the `then` path of the `CondSchema` object", () => {
      const schema: CondSchema = {
        cond: {
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
      const current: Position = { type: "cond", path: "then", slot: 0 };
      const position = next(schema, current);
      expect(position).toEqual({ type: "cond", path: "then", slot: 1 });
    });

    it("navigates to the next item in the `else` path of the `CondSchema` object", () => {
      const schema: CondSchema = {
        cond: {
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
      const current: Position = { type: "cond", path: "else", slot: 0 };
      const position = next(schema, current);
      expect(position).toEqual({ type: "cond", path: "else", slot: 1 });
    });

    it("doesn't navigate to the next item in the `CondSchema` object", () => {
      const schema: CondSchema = {
        cond: {
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
      const current: Position = { type: "cond", path: "then", slot: 0 };
      const position = next(schema, current);
      expect(position).toEqual(null);
    });
  });

  describe("at", () => {
    it("retrieves the item at the specified position in the `then` path of the `CondSchema` object", () => {
      const item: ReturnSchema = { return: () => ({}) };
      const schema: CondSchema = {
        cond: {
          if: () => true,
          then: [{ variables: () => ({}) }, item],
          else: [],
        },
      };
      const position: Position = { type: "cond", path: "then", slot: 1 };
      const result = at(schema, position);
      expect(result).toBe(item);
    });

    it("retrieves the item at the specified position in the `else` path of the `CondSchema` object", () => {
      const item: ReturnSchema = { return: () => ({}) };
      const schema: CondSchema = {
        cond: {
          if: () => false,
          then: [],
          else: [{ variables: () => ({}) }, item],
        },
      };
      const position: Position = { type: "cond", path: "else", slot: 1 };
      const result = at(schema, position);
      expect(result).toBe(item);
    });
  });
});
