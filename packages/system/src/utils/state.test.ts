import { describe, expect, it } from "vitest";

import type { Flow } from "src/types/flow/typed";
import type { Form, Condition, Loop, Variables } from "src/types/utils";
import type { State } from "src/types/state/state";

import { syncState } from "./state";

describe("getState", () => {
  it("returns the current state of the multi-step form after updating the values of the current form.", () => {
    type Schema = [
      Variables<Record<string, unknown>>,
      Condition<{ then: [Loop<[Form<{ a: number; b: number }>]>]; else: [] }>,
    ];
    const flow: Flow<
      Record<string, unknown>,
      Schema,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
      { variables: () => ({}) },
      {
        condition: {
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
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 1 },
            { type: "condition", path: "then", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const state: State = syncState<
      Record<string, unknown>,
      Schema,
      Record<string, unknown>,
      Record<string, unknown>
    >(flow, current, { a: 1, b: 2 });
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 1 },
            { type: "condition", path: "then", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: {
        type: "list",
        list: {
          1: {
            type: "condition",
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
    expect(state).toEqual(expected);
  });
});
