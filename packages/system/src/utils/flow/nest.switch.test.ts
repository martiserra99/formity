import { describe, expect, it } from "vitest";

import type { SwitchFlow, ReturnFlow } from "../../types/flow/plain";
import type { Position } from "src/types/state/position";

import { into, next, at } from "./nest.switch";

describe("SwitchFlow", () => {
  describe("into", () => {
    it("navigates into a branch of the `SwitchFlow` object", () => {
      const flow: SwitchFlow = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [
                {
                  form: {
                    fields: () => ({}),
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
                    fields: () => ({}),
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
                    fields: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
          ],
          default: [],
        },
      };
      const position = into(flow, {});
      expect(position).toEqual({ type: "switch", branch: 1, slot: 0 });
    });

    it("navigates into the default branch of the `SwitchFlow` object", () => {
      const flow: SwitchFlow = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [
                {
                  form: {
                    fields: () => ({}),
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
                    fields: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
          ],
          default: [
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
      expect(position).toEqual({ type: "switch", branch: -1, slot: 0 });
    });

    it("doesn't navigate into the `SwitchFlow` object", () => {
      const flow: SwitchFlow = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [
                {
                  form: {
                    fields: () => ({}),
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
                    fields: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
          ],
          default: [
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
    it("navigates to the next item in a branch of the `SwitchFlow` object", () => {
      const flow: SwitchFlow = {
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
          ],
          default: [],
        },
      };
      const current: Position = { type: "switch", branch: 1, slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual({ type: "switch", branch: 1, slot: 1 });
    });

    it("navigates to the next item in the default branch of the `SwitchFlow` object", () => {
      const flow: SwitchFlow = {
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
      const current: Position = { type: "switch", branch: -1, slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual({ type: "switch", branch: -1, slot: 1 });
    });

    it("doesn't navigate to the next item in the `SwitchFlow` object within a branch", () => {
      const flow: SwitchFlow = {
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
                    fields: () => ({}),
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
                    fields: () => ({}),
                    render: () => ({}),
                  },
                },
              ],
            },
          ],
          default: [
            {
              form: {
                fields: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const current: Position = { type: "switch", branch: 1, slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual(null);
    });

    it("doesn't navigate to the next item in the `SwitchFlow` object within the default branch", () => {
      const flow: SwitchFlow = {
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
                fields: () => ({}),
                render: () => ({}),
              },
            },
          ],
        },
      };
      const current: Position = { type: "switch", branch: -1, slot: 0 };
      const position = next(flow, current);
      expect(position).toEqual(null);
    });
  });

  describe("at", () => {
    it("retrieves the item at the specified position in a branch of the `SwitchFlow` object", () => {
      const item: ReturnFlow = { return: () => ({}) };
      const flow: SwitchFlow = {
        switch: {
          branches: [
            {
              case: () => false,
              then: [
                {
                  form: {
                    fields: () => ({}),
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
                    fields: () => ({}),
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
                    fields: () => ({}),
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
      const result = at(flow, position);
      expect(result).toBe(item);
    });

    it("retrieves the item at the specified position in the default branch of the `SwitchFlow` object", () => {
      const item: ReturnFlow = { return: () => ({}) };
      const flow: SwitchFlow = {
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
                fields: () => ({}),
                render: () => ({}),
              },
            },
            item,
          ],
        },
      };
      const position: Position = { type: "switch", branch: -1, slot: 1 };
      const result = at(flow, position);
      expect(result).toBe(item);
    });
  });
});
