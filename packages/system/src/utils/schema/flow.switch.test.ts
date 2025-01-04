import { describe, expect, it } from "vitest";

import type { SwitchSchema, ReturnSchema } from "../../types/schema/static";
import type { Position } from "src/types/flow/position";

import { into, next, at } from "./flow.switch";

describe("SwitchSchema", () => {
  describe("into", () => {
    it("navigates into a branch of the `SwitchSchema` object", () => {
      const schema: SwitchSchema = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
            {
              case: () => true,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
            {
              case: () => true,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
          ],
          default: [],
        },
      };
      const position = into(schema, {});
      expect(position).toEqual({ type: "switch", branch: 1, slot: 0 });
    });

    it("navigates into the default branch of the `SwitchSchema` object", () => {
      const schema: SwitchSchema = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
            {
              case: () => false,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
          ],
          default: [
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
      expect(position).toEqual({ type: "switch", branch: -1, slot: 0 });
    });

    it("doesn't navigate into the `SwitchSchema` object", () => {
      const schema: SwitchSchema = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
            {
              case: () => true,
              then: [],
            },
            {
              case: () => true,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
          ],
          default: [
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
    it("navigates to the next item in a branch of the `SwitchSchema` object", () => {
      const schema: SwitchSchema = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [],
            },
            {
              case: () => true,
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
            },
          ],
          default: [],
        },
      };
      const current: Position = { type: "switch", branch: 1, slot: 0 };
      const position = next(schema, current);
      expect(position).toEqual({ type: "switch", branch: 1, slot: 1 });
    });

    it("navigates to the next item in the default branch of the `SwitchSchema` object", () => {
      const schema: SwitchSchema = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [],
            },
            {
              case: () => false,
              then: [],
            },
          ],
          default: [
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
      const current: Position = { type: "switch", branch: -1, slot: 0 };
      const position = next(schema, current);
      expect(position).toEqual({ type: "switch", branch: -1, slot: 1 });
    });

    it("doesn't navigate to the next item in the `SwitchSchema` object within a branch", () => {
      const schema: SwitchSchema = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [],
            },
            {
              case: () => true,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
            {
              case: () => true,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
          ],
          default: [
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const current: Position = { type: "switch", branch: 1, slot: 0 };
      const position = next(schema, current);
      expect(position).toEqual(null);
    });

    it("doesn't navigate to the next item in the `SwitchSchema` object within the default branch", () => {
      const schema: SwitchSchema = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [],
            },
            {
              case: () => false,
              then: [],
            },
          ],
          default: [
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const current: Position = { type: "switch", branch: -1, slot: 0 };
      const position = next(schema, current);
      expect(position).toEqual(null);
    });
  });

  describe("at", () => {
    it("retrieves the item at the specified position in a branch of the `SwitchSchema` object", () => {
      const item: ReturnSchema = { return: () => ({}) };
      const schema: SwitchSchema = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
            {
              case: () => true,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
                item,
              ],
            },
            {
              case: () => true,
              then: [
                {
                  form: {
                    values: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
          ],
          default: [],
        },
      };
      const position: Position = { type: "switch", branch: 1, slot: 1 };
      const result = at(schema, position);
      expect(result).toBe(item);
    });

    it("retrieves the item at the specified position in the default branch of the `SwitchSchema` object", () => {
      const item: ReturnSchema = { return: () => ({}) };
      const schema: SwitchSchema = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [],
            },
            {
              case: () => false,
              then: [],
            },
          ],
          default: [
            {
              form: {
                values: () => ({}),
                render: () => ({}),
              },
            },
            item,
          ],
        },
      };
      const position: Position = { type: "switch", branch: -1, slot: 1 };
      const result = at(schema, position);
      expect(result).toBe(item);
    });
  });
});
