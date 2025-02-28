import { describe, expect, it } from "vitest";

import type { Schema } from "src/types/schema/typed";
import type { Form, Cond, Loop, Variables } from "src/types/utils";
import type { State } from "src/types/state/state";

import { getForm } from "./form";

describe("getForm", () => {
  it("renders the form from the schema that is in the current position", () => {
    type Values = [
      Variables<Record<string, unknown>>,
      Cond<{ then: [Loop<[Form<Record<string, never>>]>]; else: [] }>
    ];
    const schema: Schema<
      Record<string, unknown>,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
            { type: "cond", path: "then", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const form = getForm<
      Record<string, unknown>,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(
      state,
      schema,
      {},
      () => {},
      () => {},
      () => state,
      () => {}
    );
    expect(form).toEqual({ hello: "world" });
  });

  it("uses the values from the form defined in the schema", () => {
    type Values = [Form<{ name: string }>];
    const schema: Schema<
      Record<string, unknown>,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const form = getForm<
      Record<string, unknown>,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(
      state,
      schema,
      {},
      () => {},
      () => {},
      () => state,
      () => {}
    );
    expect(form).toEqual({
      defaultValues: {
        name: "John",
      },
    });
  });

  it("uses the params that have been provided", () => {
    type Values = [Form<Record<string, unknown>>];
    type Params = { hello: string };
    const schema: Schema<
      Record<string, unknown>,
      Values,
      Record<string, unknown>,
      Params
    > = [
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
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const form = getForm<
      Record<string, unknown>,
      Values,
      Record<string, unknown>,
      Params
    >(
      state,
      schema,
      { hello: "world" },
      () => {},
      () => {},
      () => state,
      () => {}
    );
    expect(form).toEqual({
      hello: "world",
    });
  });
});
