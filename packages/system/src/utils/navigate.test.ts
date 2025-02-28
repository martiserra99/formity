import { describe, expect, it, vi } from "vitest";

import type { Schema } from "src/types/schema/typed";
import type {
  Form,
  Cond,
  Loop,
  Yield,
  Return,
  Variables,
} from "src/types/utils";
import type { State } from "src/types/state/state";

import { getInitialState, getNextState, getPreviousState } from "./navigate";

describe("getInitialState", () => {
  it("initializes the form state with the point pointing to the first position", () => {
    type Values = [Form<Record<string, never>>];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const state = getInitialState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(schema, {}, () => {});
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("initializes the form state with the point pointing to the last position", () => {
    type Values = [
      Variables<Record<string, unknown>>,
      Variables<Record<string, unknown>>,
      Form<Record<string, never>>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const state = getInitialState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(schema, {}, () => {});
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 2 }], values: {} }],
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("initializes the form state with the point pointing to a deeply nested position from the first position", () => {
    type Values = [
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [Loop<[Form<Record<string, never>>]>];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const state = getInitialState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(schema, {}, () => {});
    const expected: State = {
      points: [
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
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("initializes the form state with the point pointing to a deeply nested position from the last position", () => {
    type Values = [
      Variables<Record<string, unknown>>,
      Variables<Record<string, unknown>>,
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [
              Variables<Record<string, unknown>>,
              Loop<
                [
                  Variables<Record<string, unknown>>,
                  Form<Record<string, never>>
                ]
              >
            ];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const state = getInitialState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(schema, {}, () => {});
    const expected: State = {
      points: [
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
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("throws an error when the schema is empty", () => {
    type Values = [];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [];
    expect(() =>
      getInitialState<
        null,
        Values,
        Record<string, unknown>,
        Record<string, unknown>
      >(schema, {}, () => {})
    ).toThrow();
  });

  it("throws an error if no form can be reached", () => {
    type Values = [
      Variables<Record<string, unknown>>,
      Variables<Record<string, unknown>>,
      Cond<{
        then: [
          Cond<{
            then: [Form<Record<string, never>>];
            else: [];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
      getInitialState<
        null,
        Values,
        Record<string, unknown>,
        Record<string, unknown>
      >(schema, {}, () => {})
    ).toThrow();
  });

  it("throws an error if it finds a return before a form", () => {
    type Values = [
      Variables<Record<string, unknown>>,
      Variables<Record<string, unknown>>,
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [Return<null>];
          }>
        ];
        else: [];
      }>,
      Form<Record<string, never>>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
                else: [{ return: () => null }],
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
      getInitialState<
        null,
        Values,
        Record<string, unknown>,
        Record<string, unknown>
      >(schema, {}, () => {})
    ).toThrow();
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches a form", () => {
    type Values = [
      Yield<{
        next: [{ an: number }, { bn: number }];
        back: [{ ab: number }, { bb: number }];
      }>,
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [
              Yield<{
                next: [{ cn: number }];
                back: [{ cb: number }];
              }>,
              Loop<[Form<Record<string, never>>]>
            ];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
      {
        yield: {
          next: () => [{ an: 1 }, { bn: 2 }],
          back: () => [{ ab: 1 }, { bb: 2 }],
        },
      },
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
                    yield: {
                      next: () => [{ cn: 3 }],
                      back: () => [{ cb: 3 }],
                    },
                  },
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
    getInitialState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(schema, {}, onYield);
    expect(onYield).toHaveBeenNthCalledWith(1, { an: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { bn: 2 });
    expect(onYield).toHaveBeenNthCalledWith(3, { cn: 3 });
    expect(onYield).not.toHaveBeenCalledWith({ ab: 1 });
    expect(onYield).not.toHaveBeenCalledWith({ bb: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ cb: 3 });
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
                  Form<Record<string, never>>
                ]
              >
            ];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const state = getInitialState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(schema, {}, () => {});
    const expected: State = {
      points: [
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
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("initializes the values of the form state with the ones that have been provided", () => {
    type Values = [Form<Record<string, never>>];
    type Inputs = { a: number; b: number };
    const schema: Schema<null, Values, Inputs, Record<string, unknown>> = [
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const inputs: Inputs = { a: 1, b: 2 };
    const state = getInitialState<
      null,
      Values,
      Inputs,
      Record<string, unknown>
    >(schema, inputs, () => {});
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], values: { a: 1, b: 2 } }],
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });
});

describe("getNextState", () => {
  it("navigates to the form that is next to the current one", () => {
    type Values = [Form<Record<string, never>>, Form<Record<string, never>>];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const current: State = {
      points: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      inputs: { type: "list", list: {} },
    };
    const state = getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: State = {
      points: [
        { path: [{ type: "list", slot: 0 }], values: {} },
        { path: [{ type: "list", slot: 1 }], values: {} },
      ],
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("navigates to the form that is next to the current one within the same flow element", () => {
    type Values = [
      Loop<
        [
          Cond<{ then: [Form<Record<string, never>>]; else: [] }>,
          Form<Record<string, never>>
        ]
      >
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 1 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const state = getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: State = {
      points: [
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
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("navigates to the form that is next to the current one outside the current flow element", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<Record<string, never>>]; else: [] }>]>,
      Cond<{ then: []; else: [Form<Record<string, never>>] }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const next = getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: State = {
      points: [
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
      inputs: { type: "list", list: {} },
    };
    expect(next).toEqual(expected);
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches a form", () => {
    type Values = [
      Loop<
        [
          Cond<{
            then: [
              Form<Record<string, never>>,
              Yield<{
                next: [{ an: number }, { bn: number }];
                back: [{ ab: number }, { bb: number }];
              }>
            ];
            else: [];
          }>
        ]
      >,
      Yield<{ next: [{ cn: number }]; back: [{ cb: number }] }>,
      Cond<{
        then: [];
        else: [
          Yield<{ next: [{ dn: number }]; back: [{ db: number }] }>,
          Form<Record<string, never>>
        ];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
                  {
                    yield: {
                      next: () => [{ an: 1 }, { bn: 2 }],
                      back: () => [{ ab: 1 }, { bb: 2 }],
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
        yield: {
          next: () => [{ cn: 3 }],
          back: () => [{ cb: 3 }],
        },
      },
      {
        cond: {
          if: () => false,
          then: [],
          else: [
            {
              yield: {
                next: () => [{ dn: 4 }],
                back: () => [{ db: 4 }],
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
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const onYield = vi.fn();
    getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(current, schema, {}, onYield, () => {});
    expect(onYield).toHaveBeenNthCalledWith(1, { an: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { bn: 2 });
    expect(onYield).toHaveBeenNthCalledWith(3, { cn: 3 });
    expect(onYield).toHaveBeenNthCalledWith(4, { dn: 4 });
    expect(onYield).not.toHaveBeenCalledWith({ ab: 1 });
    expect(onYield).not.toHaveBeenCalledWith({ bb: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ cb: 3 });
    expect(onYield).not.toHaveBeenCalledWith({ db: 4 });
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches a return", () => {
    type Values = [
      Loop<
        [
          Cond<{
            then: [
              Form<Record<string, never>>,
              Yield<{
                next: [{ an: number }, { bn: number }];
                back: [{ ab: number }, { bb: number }];
              }>
            ];
            else: [];
          }>
        ]
      >,
      Yield<{ next: [{ cn: number }]; back: [{ cb: number }] }>,
      Cond<{
        then: [];
        else: [
          Yield<{ next: [{ dn: number }]; back: [{ db: number }] }>,
          Return<null>
        ];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
                  {
                    yield: {
                      next: () => [{ an: 1 }, { bn: 2 }],
                      back: () => [{ ab: 1 }, { bb: 2 }],
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
        yield: {
          next: () => [{ cn: 3 }],
          back: () => [{ cb: 3 }],
        },
      },
      {
        cond: {
          if: () => false,
          then: [],
          else: [
            {
              yield: {
                next: () => [{ dn: 4 }],
                back: () => [{ db: 4 }],
              },
            },
            { return: () => null },
          ],
        },
      },
    ];
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const onYield = vi.fn();
    getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(current, schema, {}, onYield, () => {});
    expect(onYield).toHaveBeenNthCalledWith(1, { an: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { bn: 2 });
    expect(onYield).toHaveBeenNthCalledWith(3, { cn: 3 });
    expect(onYield).toHaveBeenNthCalledWith(4, { dn: 4 });
    expect(onYield).not.toHaveBeenCalledWith({ ab: 1 });
    expect(onYield).not.toHaveBeenCalledWith({ bb: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ cb: 3 });
    expect(onYield).not.toHaveBeenCalledWith({ db: 4 });
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches the end of the schema", () => {
    type Values = [
      Loop<
        [
          Cond<{
            then: [
              Form<Record<string, never>>,
              Yield<{
                next: [{ an: number }, { bn: number }];
                back: [{ ab: number }, { bb: number }];
              }>
            ];
            else: [];
          }>
        ]
      >,
      Yield<{ next: [{ cn: number }]; back: [{ cb: number }] }>,
      Cond<{
        then: [];
        else: [Yield<{ next: [{ dn: number }]; back: [{ db: number }] }>];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
                  {
                    yield: {
                      next: () => [{ an: 1 }, { bn: 2 }],
                      back: () => [{ ab: 1 }, { bb: 2 }],
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
        yield: {
          next: () => [{ cn: 3 }],
          back: () => [{ cb: 3 }],
        },
      },
      {
        cond: {
          if: () => false,
          then: [],
          else: [
            {
              yield: {
                next: () => [{ dn: 4 }],
                back: () => [{ db: 4 }],
              },
            },
          ],
        },
      },
    ];
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const onYield = vi.fn();
    getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(current, schema, {}, onYield, () => {});
    expect(onYield).toHaveBeenNthCalledWith(1, { an: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { bn: 2 });
    expect(onYield).toHaveBeenNthCalledWith(3, { cn: 3 });
    expect(onYield).toHaveBeenNthCalledWith(4, { dn: 4 });
    expect(onYield).not.toHaveBeenCalledWith({ ab: 1 });
    expect(onYield).not.toHaveBeenCalledWith({ bb: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ cb: 3 });
    expect(onYield).not.toHaveBeenCalledWith({ db: 4 });
  });

  it("calls the onReturn callback with the appropriate values when a return is encountered", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<Record<string, never>>]; else: [] }>]>,
      Cond<{ then: []; else: [Return<{ a: number; b: number }>] }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const onReturn = vi.fn();
    getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(current, schema, {}, () => {}, onReturn);
    expect(onReturn).toHaveBeenCalledWith({ a: 1, b: 2 });
  });

  it("doesn't navigate to any form that is after a return", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<Record<string, never>>]; else: [] }>]>,
      Cond<{ then: []; else: [Return<null>] }>,
      Form<Record<string, never>>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
          else: [{ return: () => null }],
        },
      },
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const next = getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    expect(next).toEqual(expected);
  });

  it("doesn't navigate to any other form if the current form is the last one", () => {
    type Values = [
      Loop<[Cond<{ then: [Form<Record<string, never>>]; else: [] }>]>,
      Cond<{ then: []; else: [] }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const next = getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(
      current,
      schema,
      {},
      () => {},
      () => {}
    );
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    expect(next).toEqual(expected);
  });

  it("generates new values from the current form when navigating to the next step", () => {
    type Values = [Form<{ a: number; b: number }>, Form<Record<string, never>>];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const current: State = {
      points: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      inputs: { type: "list", list: {} },
    };
    const state = getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(
      current,
      schema,
      { a: 1, b: 2 },
      () => {},
      () => {}
    );
    const expected: State = {
      points: [
        { path: [{ type: "list", slot: 0 }], values: {} },
        { path: [{ type: "list", slot: 1 }], values: { a: 1, b: 2 } },
      ],
      inputs: {
        type: "list",
        list: {
          0: {
            a: { data: { here: true, data: 1 }, keys: {} },
            b: { data: { here: true, data: 2 }, keys: {} },
          },
        },
      },
    };
    expect(state).toEqual(expected);
  });

  it("saves the current form values when navigating to the next step", () => {
    type Values = [
      Loop<[Form<{ a: number; b: number }>]>,
      Form<Record<string, never>>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    const state = getNextState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(
      current,
      schema,
      { a: 1, b: 2 },
      () => {},
      () => {}
    );
    const expected: State = {
      points: [
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
      inputs: {
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
    expect(state).toEqual(expected);
  });
});

describe("getPreviousState", () => {
  it("navigates to the form that is previous to the current one", () => {
    type Values = [Form<Record<string, never>>, Form<Record<string, never>>];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const current: State = {
      points: [
        { path: [{ type: "list", slot: 0 }], values: {} },
        { path: [{ type: "list", slot: 1 }], values: {} },
      ],
      inputs: { type: "list", list: {} },
    };
    const state = getPreviousState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(current, schema, {}, () => {});
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("doesn't navigate to any other form if the current form is the first one", () => {
    type Values = [Form<Record<string, never>>];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const current: State = {
      points: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      inputs: { type: "list", list: {} },
    };
    const state = getPreviousState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(current, schema, {}, () => {});
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      inputs: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("saves the current form values when navigating to the previous step", () => {
    type Values = [Form<{ a: number }>, Form<{ b: number }>];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
    const current: State = {
      points: [
        { path: [{ type: "list", slot: 0 }], values: {} },
        { path: [{ type: "list", slot: 1 }], values: { a: 1 } },
      ],
      inputs: {
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
    const state = getPreviousState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(current, schema, { b: 2 }, () => {});
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], values: {} }],
      inputs: {
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
    expect(state).toEqual(expected);
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches the start of the schema", () => {
    type Values = [
      Yield<{
        next: [{ an: number }, { bn: number }];
        back: [{ ab: number }, { bb: number }];
      }>,
      Cond<{
        then: [
          Cond<{
            then: [];
            else: [
              Yield<{
                next: [{ cn: number }];
                back: [{ cb: number }];
              }>,
              Loop<[Form<Record<string, never>>]>
            ];
          }>
        ];
        else: [];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
      {
        yield: {
          next: () => [{ an: 1 }, { bn: 2 }],
          back: () => [{ ab: 1 }, { bb: 2 }],
        },
      },
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
                    yield: {
                      next: () => [{ cn: 3 }],
                      back: () => [{ cb: 3 }],
                    },
                  },
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
    const current: State = {
      points: [
        { path: [{ type: "list", slot: 0 }], values: {} },
        {
          path: [
            { type: "list", slot: 1 },
            { type: "cond", path: "then", slot: 0 },
            { type: "cond", path: "else", slot: 0 },
          ],
          values: {},
        },
        {
          path: [
            { type: "list", slot: 1 },
            { type: "cond", path: "then", slot: 0 },
            { type: "cond", path: "else", slot: 1 },
            { type: "loop", slot: 0 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    getPreviousState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(current, schema, {}, onYield);
    expect(onYield).toHaveBeenNthCalledWith(1, { cb: 3 });
    expect(onYield).toHaveBeenNthCalledWith(2, { ab: 1 });
    expect(onYield).toHaveBeenNthCalledWith(3, { bb: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ an: 1 });
    expect(onYield).not.toHaveBeenCalledWith({ bn: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ cn: 3 });
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches the previous form", () => {
    type Values = [
      Loop<
        [
          Cond<{
            then: [
              Form<Record<string, never>>,
              Yield<{
                next: [{ an: number }, { bn: number }];
                back: [{ ab: number }, { bb: number }];
              }>
            ];
            else: [];
          }>
        ]
      >,
      Yield<{ next: [{ cn: number }]; back: [{ cb: number }] }>,
      Cond<{
        then: [];
        else: [
          Yield<{ next: [{ dn: number }]; back: [{ db: number }] }>,
          Form<Record<string, never>>
        ];
      }>
    ];
    const schema: Schema<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    > = [
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
                  {
                    yield: {
                      next: () => [{ an: 1 }, { bn: 2 }],
                      back: () => [{ ab: 1 }, { bb: 2 }],
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
        yield: {
          next: () => [{ cn: 3 }],
          back: () => [{ cb: 3 }],
        },
      },
      {
        cond: {
          if: () => false,
          then: [],
          else: [
            {
              yield: {
                next: () => [{ dn: 4 }],
                back: () => [{ db: 4 }],
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
    const onYield = vi.fn();
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "cond", path: "then", slot: 1 },
          ],
          values: {},
        },
        {
          path: [{ type: "list", slot: 1 }],
          values: {},
        },
        {
          path: [
            { type: "list", slot: 2 },
            { type: "cond", path: "else", slot: 0 },
          ],
          values: {},
        },
        {
          path: [
            { type: "list", slot: 2 },
            { type: "cond", path: "else", slot: 1 },
          ],
          values: {},
        },
      ],
      inputs: { type: "list", list: {} },
    };
    getPreviousState<
      null,
      Values,
      Record<string, unknown>,
      Record<string, unknown>
    >(current, schema, {}, onYield);
    expect(onYield).toHaveBeenNthCalledWith(1, { db: 4 });
    expect(onYield).toHaveBeenNthCalledWith(2, { cb: 3 });
    expect(onYield).toHaveBeenNthCalledWith(3, { ab: 1 });
    expect(onYield).toHaveBeenNthCalledWith(4, { bb: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ an: 1 });
    expect(onYield).not.toHaveBeenCalledWith({ bn: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ cn: 3 });
    expect(onYield).not.toHaveBeenCalledWith({ dn: 4 });
  });
});
