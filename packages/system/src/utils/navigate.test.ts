import { describe, expect, it, vi } from "vitest";

import type { ListSchema } from "src/types/schema/custom";
import type {
  Form,
  Cond,
  Loop,
  Yield,
  Return,
  Variables,
} from "src/types/utils";
import type { Flow } from "src/types/flow/flow";

import { initFlow, nextFlow, prevFlow } from "./navigate";

describe("initFlow", () => {
  it("initializes the form state with the cursor pointing to the first position", () => {
    type Values = [Form<object>];
    const schema: ListSchema<null, Values, object, object> = [
      {
        form: {
          values: () => ({}),
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
    type Values = [Variables<object>, Variables<object>, Form<object>];
    const schema: ListSchema<null, Values, object, object> = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        form: {
          values: () => ({}),
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
            else: [Loop<[Form<object>]>];
          }>
        ];
        else: [];
      }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
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
                            values: () => ({}),
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
            else: [Variables<object>, Loop<[Variables<object>, Form<object>]>];
          }>
        ];
        else: [];
      }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
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
                            values: () => ({}),
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
    const schema: ListSchema<null, Values, object, object> = [];
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
            then: [Form<object>];
            else: [];
          }>
        ];
        else: [];
      }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
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
                      values: () => ({}),
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
      Form<object>
    ];
    const schema: ListSchema<null, Values, object, object> = [
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
          values: () => ({}),
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
            else: [Yield<{ y: number }>, Loop<[Form<object>]>];
          }>
        ];
        else: [];
      }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
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
                            values: () => ({}),
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
                  Form<object>
                ]
              >
            ];
          }>
        ];
        else: [];
      }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
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
                            values: () => ({}),
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
    type Values = [Form<object>];
    type Inputs = { a: number; b: number };
    const schema: ListSchema<null, Values, Inputs, object> = [
      {
        form: {
          values: () => ({}),
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

describe("nextFlow", () => {
  it("navigates to the form that is next to the current one", () => {
    type Values = [Form<object>, Form<object>];
    const schema: ListSchema<null, Values, object, object> = [
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const current: Flow = {
      cursors: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      entries: { type: "list", list: {} },
    };
    const flow = nextFlow<null, Values, object, object>(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: Flow = {
      cursors: [
        { path: [{ type: "list", slot: 0 }], values: {} },
        { path: [{ type: "list", slot: 1 }], values: {} },
      ],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });

  it("navigates to the form that is next to the current one within the same flow element", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<object>]; else: [] }>, Form<object>]>
    ];
    const schema: ListSchema<null, Values, object, object> = [
      {
        loop: {
          while: () => true,
          do: [
            {
              cond: {
                if: () => true,
                then: [
                  {
                    form: {
                      values: () => ({}),
                      render: () => null,
                    },
                  },
                ],
                else: [],
              },
            },
            {
              form: {
                values: () => ({}),
                render: () => null,
              },
            },
          ],
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 1 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const flow = nextFlow<null, Values, object, object>(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 1 },
          ],
          values: {},
        },
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });

  it("navigates to the form that is next to the current one outside the current flow element", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<object>]; else: [] }>]>,
      Cond<{ then: []; else: [Form<object>] }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
      {
        loop: {
          while: () => false,
          do: [
            {
              cond: {
                if: () => true,
                then: [
                  {
                    form: {
                      values: () => ({}),
                      render: () => null,
                    },
                  },
                ],
                else: [],
              },
            },
          ],
        },
      },
      {
        cond: {
          if: () => false,
          then: [],
          else: [
            {
              form: {
                values: () => ({}),
                render: () => null,
              },
            },
          ],
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const next = nextFlow<null, Values, object, object>(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
        {
          path: [
            { type: "list", slot: 1 },
            { type: "cond", path: "else", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    expect(next).toEqual(expected);
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches a form", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<object>, Yield<{ a: number }>]; else: [] }>]>,
      Yield<{ b: number }>,
      Cond<{ then: []; else: [Yield<{ c: number }>, Form<object>] }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
      {
        loop: {
          while: () => false,
          do: [
            {
              cond: {
                if: () => true,
                then: [
                  {
                    form: {
                      values: () => ({}),
                      render: () => null,
                    },
                  },
                  { yield: () => ({ a: 1 }) },
                ],
                else: [],
              },
            },
          ],
        },
      },
      { yield: () => ({ b: 2 }) },
      {
        cond: {
          if: () => false,
          then: [],
          else: [
            { yield: () => ({ c: 3 }) },
            {
              form: {
                values: () => ({}),
                render: () => null,
              },
            },
          ],
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const onYield = vi.fn();
    nextFlow<null, Values, object, object>(
      current,
      schema,
      {},
      onYield,
      () => {}
    );
    expect(onYield).toHaveBeenNthCalledWith(1, { a: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { b: 2 });
    expect(onYield).toHaveBeenNthCalledWith(3, { c: 3 });
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches a return", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<object>, Yield<{ a: number }>]; else: [] }>]>,
      Yield<{ b: number }>,
      Cond<{ then: []; else: [Yield<{ c: number }>, Return<object>] }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
      {
        loop: {
          while: () => false,
          do: [
            {
              cond: {
                if: () => true,
                then: [
                  {
                    form: {
                      values: () => ({}),
                      render: () => null,
                    },
                  },
                  { yield: () => ({ a: 1 }) },
                ],
                else: [],
              },
            },
          ],
        },
      },
      { yield: () => ({ b: 2 }) },
      {
        cond: {
          if: () => false,
          then: [],
          else: [{ yield: () => ({ c: 3 }) }, { return: () => ({}) }],
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const onYield = vi.fn();
    nextFlow<null, Values, object, object>(
      current,
      schema,
      {},
      onYield,
      () => {}
    );
    expect(onYield).toHaveBeenNthCalledWith(1, { a: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { b: 2 });
    expect(onYield).toHaveBeenNthCalledWith(3, { c: 3 });
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches the end of the schema", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<object>, Yield<{ a: number }>]; else: [] }>]>,
      Yield<{ b: number }>,
      Cond<{ then: []; else: [Yield<{ c: number }>] }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
      {
        loop: {
          while: () => false,
          do: [
            {
              cond: {
                if: () => true,
                then: [
                  {
                    form: {
                      values: () => ({}),
                      render: () => null,
                    },
                  },
                  { yield: () => ({ a: 1 }) },
                ],
                else: [],
              },
            },
          ],
        },
      },
      { yield: () => ({ b: 2 }) },
      {
        cond: {
          if: () => false,
          then: [],
          else: [{ yield: () => ({ c: 3 }) }],
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const onYield = vi.fn();
    nextFlow<null, Values, object, object>(
      current,
      schema,
      {},
      onYield,
      () => {}
    );
    expect(onYield).toHaveBeenNthCalledWith(1, { a: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { b: 2 });
    expect(onYield).toHaveBeenNthCalledWith(3, { c: 3 });
  });

  it("calls the onReturn callback with the appropriate values when a return is encountered", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<object>]; else: [] }>]>,
      Cond<{ then: []; else: [Return<{ a: number; b: number }>] }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
      {
        loop: {
          while: () => false,
          do: [
            {
              cond: {
                if: () => true,
                then: [
                  {
                    form: {
                      values: () => ({}),
                      render: () => null,
                    },
                  },
                ],
                else: [],
              },
            },
          ],
        },
      },

      {
        cond: {
          if: () => false,
          then: [],
          else: [{ return: () => ({ a: 1, b: 2 }) }],
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const onReturn = vi.fn();
    nextFlow<null, Values, object, object>(
      current,
      schema,
      {},
      () => {},
      onReturn
    );
    expect(onReturn).toBeCalledWith({ a: 1, b: 2 });
  });

  it("doesn't navigate to any form that is after a return", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<object>]; else: [] }>]>,
      Cond<{ then: []; else: [Return<object>] }>,
      Form<object>
    ];
    const schema: ListSchema<null, Values, object, object> = [
      {
        loop: {
          while: () => false,
          do: [
            {
              cond: {
                if: () => true,
                then: [
                  {
                    form: {
                      values: () => ({}),
                      render: () => null,
                    },
                  },
                ],
                else: [],
              },
            },
          ],
        },
      },
      {
        cond: {
          if: () => false,
          then: [],
          else: [{ return: () => ({}) }],
        },
      },
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const next = nextFlow<null, Values, object, object>(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    expect(next).toEqual(expected);
  });

  it("doesn't navigate to any other form if the current form is the last one", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<object>]; else: [] }>]>,
      Cond<{ then: []; else: [] }>
    ];
    const schema: ListSchema<null, Values, object, object> = [
      {
        loop: {
          while: () => false,
          do: [
            {
              cond: {
                if: () => true,
                then: [
                  {
                    form: {
                      values: () => ({}),
                      render: () => null,
                    },
                  },
                ],
                else: [],
              },
            },
          ],
        },
      },
      {
        cond: {
          if: () => false,
          then: [],
          else: [],
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const next = nextFlow<null, Values, object, object>(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    expect(next).toEqual(expected);
  });

  it("generates new values from the current form when navigating to the next step", () => {
    type Values = [Form<{ a: number; b: number }>, Form<object>];
    const schema: ListSchema<null, Values, object, object> = [
      {
        form: {
          values: () => ({
            a: [0, []],
            b: [0, []],
          }),
          render: () => null,
        },
      },
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const current: Flow = {
      cursors: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      entries: { type: "list", list: {} },
    };
    const flow = nextFlow<null, Values, object, object>(
      current,
      schema,
      { a: 1, b: 2 },
      () => {},
      () => {}
    );
    const expected: Flow = {
      cursors: [
        { path: [{ type: "list", slot: 0 }], values: {} },
        { path: [{ type: "list", slot: 1 }], values: { a: 1, b: 2 } },
      ],
      entries: {
        type: "list",
        list: {
          0: {
            a: { data: { here: true, data: 1 }, keys: {} },
            b: { data: { here: true, data: 2 }, keys: {} },
          },
        },
      },
    };
    expect(flow).toEqual(expected);
  });

  it("saves the current form values when navigating to the next step", () => {
    type Values = [Loop<[Form<{ a: number; b: number }>]>, Form<object>];
    const schema: ListSchema<null, Values, object, object> = [
      {
        loop: {
          while: () => false,
          do: [
            {
              form: {
                values: () => ({
                  a: [0, ["x", "y"]],
                  b: [0, ["x", "y"]],
                }),
                render: () => null,
              },
            },
          ],
        },
      },
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const current: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          values: {},
        },
      ],
      entries: { type: "list", list: {} },
    };
    const flow = nextFlow<null, Values, object, object>(
      current,
      schema,
      { a: 1, b: 2 },
      () => {},
      () => {}
    );
    const expected: Flow = {
      cursors: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          values: {},
        },
        {
          path: [{ type: "list", slot: 1 }],
          values: { a: 1, b: 2 },
        },
      ],
      entries: {
        type: "list",
        list: {
          0: {
            type: "loop",
            list: {
              0: {
                a: {
                  data: { here: false },
                  keys: {
                    x: {
                      data: { here: false },
                      keys: {
                        y: {
                          data: { here: true, data: 1 },
                          keys: {},
                        },
                      },
                    },
                  },
                },
                b: {
                  data: { here: false },
                  keys: {
                    x: {
                      data: { here: false },
                      keys: {
                        y: {
                          data: { here: true, data: 2 },
                          keys: {},
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    expect(flow).toEqual(expected);
  });
});

describe("prevFlow", () => {
  it("navigates to the form that is previous to the current one", () => {
    type Values = [Form<object>, Form<object>];
    const schema: ListSchema<null, Values, object, object> = [
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const current: Flow = {
      cursors: [
        { path: [{ type: "list", slot: 0 }], values: {} },
        { path: [{ type: "list", slot: 1 }], values: {} },
      ],
      entries: { type: "list", list: {} },
    };
    const flow = prevFlow<null, Values, object, object>(current, schema, {});
    const expected: Flow = {
      cursors: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });

  it("doesn't navigate to any other form if the current form is the first one", () => {
    type Values = [Form<object>];
    const schema: ListSchema<null, Values, object, object> = [
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const current: Flow = {
      cursors: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      entries: { type: "list", list: {} },
    };
    const flow = prevFlow<null, Values, object, object>(current, schema, {});
    const expected: Flow = {
      cursors: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      entries: { type: "list", list: {} },
    };
    expect(flow).toEqual(expected);
  });

  it("saves the current form values when navigating to the previous step", () => {
    type Values = [Form<{ a: number }>, Form<{ b: number }>];
    const schema: ListSchema<null, Values, object, object> = [
      {
        form: {
          values: () => ({
            a: [0, []],
          }),
          render: () => null,
        },
      },
      {
        form: {
          values: () => ({
            b: [0, []],
          }),
          render: () => null,
        },
      },
    ];
    const current: Flow = {
      cursors: [
        { path: [{ type: "list", slot: 0 }], values: {} },
        { path: [{ type: "list", slot: 1 }], values: { a: 1 } },
      ],
      entries: {
        type: "list",
        list: {
          0: {
            a: {
              data: { here: true, data: 1 },
              keys: {},
            },
          },
        },
      },
    };
    const flow = prevFlow<null, Values, object, object>(current, schema, {
      b: 2,
    });
    const expected: Flow = {
      cursors: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      entries: {
        type: "list",
        list: {
          0: {
            a: {
              data: { here: true, data: 1 },
              keys: {},
            },
          },
          1: {
            b: {
              data: { here: true, data: 2 },
              keys: {},
            },
          },
        },
      },
    };
    expect(flow).toEqual(expected);
  });
});
