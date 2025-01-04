import { describe, expect, it } from "vitest";

import type { ListSchema } from "src/types/schema/custom";
import type { Form, Cond, Loop, Variables } from "src/types/utils";
import type { Flow } from "src/types/flow/flow";

import { getFlow } from "./flow";

describe("getFlow", () => {
  it("returns the current state of the multi-step form after updating the values of the current form.", () => {
    type Values = [
      Variables<object>,
      Cond<{ then: [Loop<[Form<{ a: number; b: number }>]>]; else: [] }>
    ];
    const schema: ListSchema<object, Values, object, object> = [
      { variables: () => ({}) },
      {
        cond: {
          if: () => true,
          then: [
            {
              loop: {
                while: () => true,
                do: [
                  {
                    form: {
                      values: () => ({
                        a: [0, []],
                        b: [0, []],
                      }),
                      render: () => ({}),
                    },
                  },
                ],
              },
            },
          ],
          else: [],
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 1 },
            { type: "cond", path: "then", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const flow: Flow = getFlow<object, Values, object, object>(
      current,
      schema,
      { a: 1, b: 2 }
    );
    const expected: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 1 },
            { type: "cond", path: "then", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: {
        type: "list",
        list: {
          1: {
            type: "cond",
            then: {
              0: {
                type: "loop",
                list: {
                  0: {
                    a: {
                      data: { here: true, data: 1 },
                      keys: {},
                    },
                    b: {
                      data: { here: true, data: 2 },
                      keys: {},
                    },
                  },
                },
              },
            },
            else: {},
          },
        },
      },
    };
    expect(flow).toEqual(expected);
  });
});
