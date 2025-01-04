import { describe, expect, it } from "vitest";

import {
  Schema,
  Variables,
  Form,
  Cond,
  Loop,
  Flow,
  getForm,
} from "../src/index";

describe("getForm", () => {
  it("renders the form from the schema that is in the current position", () => {
    type Values = [
      Variables<object>,
      Cond<{ then: [Loop<[Form<object>]>]; else: [] }>
    ];
    const schema: Schema<object, Values, object, object> = [
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
    const flow: Flow = {
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
    const form = getForm<object, Values, object, object>(
      flow,
      schema,
      {},
      () => {},
      () => {},
      () => flow,
      () => {}
    );
    expect(form).toEqual({ hello: "world" });
  });

  it("uses the values from the form defined in the schema", () => {
    type Values = [Form<{ name: string }>];
    const schema: Schema<object, Values, object, object> = [
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
    const flow: Flow = {
      cursors: [
        {
          path: [{ type: "list", slot: 0 }],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const form = getForm<object, Values, object, object>(
      flow,
      schema,
      {},
      () => {},
      () => {},
      () => flow,
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
    const schema: Schema<object, Values, object, Params> = [
      {
        form: {
          values: () => ({}),
          render: ({ params }) => ({
            hello: params.hello,
          }),
        },
      },
    ];
    const flow: Flow = {
      cursors: [
        {
          path: [{ type: "list", slot: 0 }],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const form = getForm<object, Values, object, Params>(
      flow,
      schema,
      { hello: "world" },
      () => {},
      () => {},
      () => flow,
      () => {}
    );
    expect(form).toEqual({
      hello: "world",
    });
  });
});
