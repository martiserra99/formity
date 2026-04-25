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
                      values: () => ({}),
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
            { type: "condition", path: "then", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const form = getForm({
      flow,
      params: {},
      state,
      onNext: () => {},
      onBack: () => {},
      getState: () => state,
      setState: () => {},
    });
    expect(form).toEqual({ hello: "world" });
  });

  it("uses the form values", () => {
    const flow: Flow = [
      {
        form: {
          values: () => ({
            name: ["John", []],
          }),
          render: ({ values }) => ({
            defaultValues: {
              name: values.name,
            },
          }),
        },
      },
    ];
    const state: State = {
      points: [
        {
          path: [{ type: "list", slot: 0 }],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const form = getForm({
      flow,
      params: {},
      state,
      onNext: () => {},
      onBack: () => {},
      getState: () => state,
      setState: () => {},
    });
    expect(form).toEqual({
      defaultValues: {
        name: "John",
      },
    });
  });

  it("uses the params that have been provided", () => {
    const flow: Flow = [
      {
        form: {
          values: () => ({}),
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
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const form = getForm({
      flow,
      params: { hello: "world" },
      state,
      onNext: () => {},
      onBack: () => {},
      getState: () => state,
      setState: () => {},
    });
    expect(form).toEqual({
      hello: "world",
    });
  });
});
