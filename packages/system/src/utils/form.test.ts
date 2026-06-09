import { describe, expect, it } from "vitest";

import type { Flow } from "src/types/flow/plain";
import type { State } from "src/types/state/state";

import { getForm } from "./form";

describe("getForm", () => {
  it("renders the form at the specified position", () => {
    const flow: Flow = [
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
                      fields: () => ({}),
                      render: () => ({
                        hello: "world",
                      }),
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
    const state: State = {
      points: [
        {
          path: [
            { type: "list", slot: 1 },
            { type: "condition", branch: "then", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          values: {},
        },
      ],
      memory: { type: "list", list: {} },
    };
    const form = getForm({
      flow,
      params: {},
      state,
      next: () => {},
      back: () => {},
      jump: () => {},
      getState: () => state,
      setState: () => {},
    });
    expect(form).toEqual({ hello: "world" });
  });

  it("uses the form values", () => {
    const flow: Flow = [
      {
        form: {
          fields: () => ({
            name: ["John", []],
          }),
          render: ({ fields }) => ({
            name: fields.name,
          }),
        },
      },
    ];
    const state: State = {
      points: [
        {
          path: [{ type: "list", slot: 0 }],
          values: {},
        },
      ],
      memory: { type: "list", list: {} },
    };
    const form = getForm({
      flow,
      params: {},
      state,
      next: () => {},
      back: () => {},
      jump: () => {},
      getState: () => state,
      setState: () => {},
    });
    expect(form).toEqual({
      name: "John",
    });
  });

  it("uses the params that have been provided", () => {
    const flow: Flow = [
      {
        form: {
          fields: () => ({}),
          render: ({ params }) => ({
            hello: params.hello,
          }),
        },
      },
    ];
    const state: State = {
      points: [
        {
          path: [{ type: "list", slot: 0 }],
          values: {},
        },
      ],
      memory: { type: "list", list: {} },
    };
    const form = getForm({
      flow,
      params: { hello: "world" },
      state,
      next: () => {},
      back: () => {},
      jump: () => {},
      getState: () => state,
      setState: () => {},
    });
    expect(form).toEqual({
      hello: "world",
    });
  });
});
