import { describe, expect, it } from "vitest";

import type { ListSchema } from "src/types/schema/typed";
import type { Form, Cond, Loop, Variables } from "src/types/utils";
import type { State } from "src/types/state/state";

import { getForm } from "./form";

describe("getForm", () => {
  it("renders the form from the schema that is in the current position", () => {
    type Values = [
      Variables<object>,
      Cond<{ then: [Loop<[Form<object>]>]; else: [] }>
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
    const form = getForm<object, Values, object, object>(
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
    const schema: ListSchema<object, Values, object, object> = [
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
    const form = getForm<object, Values, object, object>(
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
    type Values = [Form<object>];
    type Params = { hello: string };
    const schema: ListSchema<object, Values, object, Params> = [
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
    const form = getForm<object, Values, object, Params>(
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
