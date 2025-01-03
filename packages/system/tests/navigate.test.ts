import { describe, expect, it, vi } from "vitest";

import {
  Schema,
  Form,
  Cond,
  Loop,
  Yield,
  Return,
  Variables,
  Flow,
  initFlow,
} from "../src/index";

describe("initFlow", () => {
  it("initializes the form state with the cursor pointing to the first position", () => {
    type Values = [Form<{ name: string; age: number }>];
    const schema: Schema<null, Values, object, object> = [
      {
        form: {
          values: () => ({
            name: ["John", []],
            age: [30, []],
          }),
          render: () => null,
        },
      },
    ];
    const flow = initFlow<null, Values, object, object>(schema, {}, () => {});
    const expected: Flow = {
      cursors: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });

  it("initializes the form state with the cursor pointing to the last position", () => {
    type Values = [
      Variables<object>,
      Variables<object>,
      Form<{ name: string; age: number }>
    ];
    const schema: Schema<null, Values, object, object> = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        form: {
          values: () => ({
            name: ["John", []],
            age: [30, []],
          }),
          render: () => null,
        },
      },
    ];
    const flow = initFlow<null, Values, object, object>(schema, {}, () => {});
    const expected: Flow = {
      cursors: [{ path: [{ type: "list", slot: 2 }], values: {} }],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });

  it("initializes the form state with the cursor pointing to a deeply nested position from the first position", () => {
    type Values = [
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [Loop<[Form<{ name: string; age: number }>]>];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<null, Values, object, object> = [
      {
        cond: {
          if: () => true,
          then: [
            {
              cond: {
                if: () => false,
                then: [],
                else: [
                  {
                    loop: {
                      while: () => true,
                      do: [
                        {
                          form: {
                            values: () => ({
                              name: ["John", []],
                              age: [30, []],
                            }),
                            render: () => null,
                          },
                        },
                      ],
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
    const flow = initFlow<null, Values, object, object>(schema, {}, () => {});
    const expected: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
            { type: "cond", path: "else", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });

  it("initializes the form state with the cursor pointing to a deeply nested position from the last position", () => {
    type Values = [
      Variables<object>,
      Variables<object>,
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [
              Variables<object>,
              Loop<[Variables<object>, Form<{ name: string; age: number }>]>
            ];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<null, Values, object, object> = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        cond: {
          if: () => true,
          then: [
            {
              cond: {
                if: () => false,
                then: [],
                else: [
                  { variables: () => ({}) },
                  {
                    loop: {
                      while: () => true,
                      do: [
                        { variables: () => ({}) },
                        {
                          form: {
                            values: () => ({
                              name: ["John", []],
                              age: [30, []],
                            }),
                            render: () => null,
                          },
                        },
                      ],
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
    const flow = initFlow<null, Values, object, object>(schema, {}, () => {});
    const expected: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 2 },
            { type: "cond", path: "then", slot: 0 },
            { type: "cond", path: "else", slot: 1 },
            { type: "loop", slot: 1 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });

  it("throws an error when the schema is empty", () => {
    type Values = [];
    const schema: Schema<null, Values, object, object> = [];
    expect(() =>
      initFlow<null, Values, object, object>(schema, {}, () => {})
    ).toThrow();
  });

  it("throws an error if no form can be reached", () => {
    type Values = [
      Variables<object>,
      Variables<object>,
      Cond<{
        then: [
          Cond<{
            then: [Form<{ name: string; age: number }>];
            else: [];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<null, Values, object, object> = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        cond: {
          if: () => true,
          then: [
            {
              cond: {
                if: () => false,
                then: [
                  {
                    form: {
                      values: () => ({
                        name: ["John", []],
                        age: [30, []],
                      }),
                      render: () => null,
                    },
                  },
                ],
                else: [],
              },
            },
          ],
          else: [],
        },
      },
    ];
    expect(() =>
      initFlow<null, Values, object, object>(schema, {}, () => {})
    ).toThrow();
  });

  it("throws an error if it finds a return before a form", () => {
    type Values = [
      Variables<object>,
      Variables<object>,
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [Return<object>];
          }>
        ];
        else: [];
      }>,
      Form<{ name: string; age: number }>
    ];
    const schema: Schema<null, Values, object, object> = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        cond: {
          if: () => true,
          then: [
            {
              cond: {
                if: () => false,
                then: [],
                else: [{ return: () => ({}) }],
              },
            },
          ],
          else: [],
        },
      },
      {
        form: {
          values: () => ({
            name: ["John", []],
            age: [30, []],
          }),
          render: () => null,
        },
      },
    ];
    expect(() =>
      initFlow<null, Values, object, object>(schema, {}, () => {})
    ).toThrow();
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches a form", () => {
    type Values = [
      Yield<{ x: number }>,
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [
              Yield<{ y: number }>,
              Loop<[Form<{ name: string; age: number }>]>
            ];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<null, Values, object, object> = [
      { yield: () => ({ x: 1 }) },
      {
        cond: {
          if: () => true,
          then: [
            {
              cond: {
                if: () => false,
                then: [],
                else: [
                  { yield: () => ({ y: 2 }) },
                  {
                    loop: {
                      while: () => true,
                      do: [
                        {
                          form: {
                            values: () => ({
                              name: ["John", []],
                              age: [30, []],
                            }),
                            render: () => null,
                          },
                        },
                      ],
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
    const onYield = vi.fn();
    initFlow<null, Values, object, object>(schema, {}, onYield);
    expect(onYield).toHaveBeenNthCalledWith(1, { x: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { y: 2 });
  });

  it("generates values every time it encounters a variables element", () => {
    type Values = [
      Variables<{ a: number; b: number }>,
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [
              Variables<{ c: number }>,
              Loop<
                [
                  Variables<{ d: number }>,
                  Variables<{ e: number }>,
                  Form<{ name: string; age: number }>
                ]
              >
            ];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<null, Values, object, object> = [
      { variables: () => ({ a: 1, b: 2 }) },
      {
        cond: {
          if: () => true,
          then: [
            {
              cond: {
                if: () => false,
                then: [],
                else: [
                  { variables: () => ({ c: 3 }) },
                  {
                    loop: {
                      while: () => true,
                      do: [
                        { variables: () => ({ d: 4 }) },
                        { variables: () => ({ e: 5 }) },
                        {
                          form: {
                            values: () => ({
                              name: ["John", []],
                              age: [30, []],
                            }),
                            render: () => null,
                          },
                        },
                      ],
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
    const flow = initFlow<null, Values, object, object>(schema, {}, () => {});
    const expected: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 1 },
            { type: "cond", path: "then", slot: 0 },
            { type: "cond", path: "else", slot: 1 },
            { type: "loop", slot: 2 },
          ],
          values: { a: 1, b: 2, c: 3, d: 4, e: 5 },
        },
      ],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });

  it("initializes the values of the form state with the ones that have been provided", () => {
    type Values = [Form<{ name: string; age: number }>];
    type Inputs = { a: number; b: number };
    const schema: Schema<null, Values, Inputs, object> = [
      {
        form: {
          values: () => ({
            name: ["John", []],
            age: [30, []],
          }),
          render: () => null,
        },
      },
    ];
    const inputs: Inputs = { a: 1, b: 2 };
    const flow = initFlow<null, Values, Inputs, object>(
      schema,
      inputs,
      () => {}
    );
    const expected: Flow = {
      cursors: [{ path: [{ type: "list", slot: 0 }], values: { a: 1, b: 2 } }],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });
});
