import { describe, expect, it, vi } from "vitest";

import type { Flow } from "src/types/flow/plain";
import type { State } from "src/types/state/state";

import { initState, nextState, prevState } from "./navigate";

describe("initState", () => {
  it("initializes the form state with the point pointing to the first position", () => {
    const flow: Flow = [
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const state = initState({ flow, onYield: () => {}, inputs: {} });
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], inputs: {} }],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("initializes the form state with the point pointing to the last position", () => {
    const flow: Flow = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const state = initState({ flow, onYield: () => {}, inputs: {} });
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 2 }], inputs: {} }],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("initializes the form state with the point pointing to a deeply nested position from the first position", () => {
    const flow: Flow = [
      {
        condition: {
          if: () => true,
          then: [
            {
              condition: {
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
    const state = initState({ flow, onYield: () => {}, inputs: {} });
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "condition", branch: "then", slot: 0 },
            { type: "condition", branch: "else", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("initializes the form state with the point pointing to a deeply nested position from the last position", () => {
    const flow: Flow = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        condition: {
          if: () => true,
          then: [
            {
              condition: {
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
    const state = initState({ flow, onYield: () => {}, inputs: {} });
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 2 },
            { type: "condition", branch: "then", slot: 0 },
            { type: "condition", branch: "else", slot: 1 },
            { type: "loop", slot: 1 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("throws an error when the flow is empty", () => {
    const flow: Flow = [];
    expect(() => initState({ flow, onYield: () => {}, inputs: {} })).toThrow();
  });

  it("throws an error if no form can be reached", () => {
    const flow: Flow = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        condition: {
          if: () => true,
          then: [
            {
              condition: {
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
    expect(() => initState({ flow, onYield: () => {}, inputs: {} })).toThrow();
  });

  it("throws an error if it finds a return before a form", () => {
    const flow: Flow = [
      { variables: () => ({}) },
      { variables: () => ({}) },
      {
        condition: {
          if: () => true,
          then: [
            {
              condition: {
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
    expect(() => initState({ flow, onYield: () => {}, inputs: {} })).toThrow();
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches a form", () => {
    const flow: Flow = [
      {
        yield: {
          next: () => [{ an: 1 }, { bn: 2 }],
          back: () => [{ ab: 1 }, { bb: 2 }],
        },
      },
      {
        condition: {
          if: () => true,
          then: [
            {
              condition: {
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
    initState({ flow, onYield, inputs: {} });
    expect(onYield).toHaveBeenNthCalledWith(1, { an: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { bn: 2 });
    expect(onYield).toHaveBeenNthCalledWith(3, { cn: 3 });
    expect(onYield).not.toHaveBeenCalledWith({ ab: 1 });
    expect(onYield).not.toHaveBeenCalledWith({ bb: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ cb: 3 });
  });

  it("generates values every time it encounters a variables element", () => {
    const flow: Flow = [
      { variables: () => ({ a: 1, b: 2 }) },
      {
        condition: {
          if: () => true,
          then: [
            {
              condition: {
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
    const state = initState({ flow, onYield: () => {}, inputs: {} });
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 1 },
            { type: "condition", branch: "then", slot: 0 },
            { type: "condition", branch: "else", slot: 1 },
            { type: "loop", slot: 2 },
          ],
          inputs: { a: 1, b: 2, c: 3, d: 4, e: 5 },
        },
      ],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("initializes the values of the form state with the ones that have been provided", () => {
    const flow: Flow = [
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const state = initState({
      flow,
      onYield: () => {},
      inputs: { a: 1, b: 2 },
    });
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], inputs: { a: 1, b: 2 } }],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });
});

describe("nextState", () => {
  it("navigates to the form that is next to the current one", () => {
    const flow: Flow = [
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
      points: [{ path: [{ type: "list", slot: 0 }], inputs: {} }],
      values: { type: "list", list: {} },
    };
    const state = nextState({
      flow,
      onYield: () => {},
      onReturn: () => {},
      state: current,
      values: {},
      history: true,
    });
    const expected: State = {
      points: [
        { path: [{ type: "list", slot: 0 }], inputs: {} },
        { path: [{ type: "list", slot: 1 }], inputs: {} },
      ],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("navigates to the form that is next to the current one within the same flow element", () => {
    const flow: Flow = [
      {
        loop: {
          while: () => true,
          do: [
            {
              condition: {
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
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const state = nextState({
      flow,
      onYield: () => {},
      onReturn: () => {},
      state: current,
      values: {},
      history: true,
    });
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 1 },
          ],
          inputs: {},
        },
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("navigates to the form that is next to the current one outside the current flow element", () => {
    const flow: Flow = [
      {
        loop: {
          while: () => false,
          do: [
            {
              condition: {
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
        condition: {
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
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const next = nextState({
      flow,
      onYield: () => {},
      onReturn: () => {},
      state: current,
      values: {},
      history: true,
    });
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
        {
          path: [
            { type: "list", slot: 1 },
            { type: "condition", branch: "else", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    expect(next).toEqual(expected);
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches a form", () => {
    const flow: Flow = [
      {
        loop: {
          while: () => false,
          do: [
            {
              condition: {
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
        condition: {
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
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const onYield = vi.fn();
    nextState({
      flow,
      onYield,
      onReturn: () => {},
      state: current,
      values: {},
      history: true,
    });
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
    const flow: Flow = [
      {
        loop: {
          while: () => false,
          do: [
            {
              condition: {
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
        condition: {
          if: () => false,
          then: [],
          else: [
            {
              yield: {
                next: () => [{ dn: 4 }],
                back: () => [{ db: 4 }],
              },
            },
            { return: () => ({}) },
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
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const onYield = vi.fn();
    nextState({
      flow,
      onYield,
      onReturn: () => {},
      state: current,
      values: {},
      history: true,
    });
    expect(onYield).toHaveBeenNthCalledWith(1, { an: 1 });
    expect(onYield).toHaveBeenNthCalledWith(2, { bn: 2 });
    expect(onYield).toHaveBeenNthCalledWith(3, { cn: 3 });
    expect(onYield).toHaveBeenNthCalledWith(4, { dn: 4 });
    expect(onYield).not.toHaveBeenCalledWith({ ab: 1 });
    expect(onYield).not.toHaveBeenCalledWith({ bb: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ cb: 3 });
    expect(onYield).not.toHaveBeenCalledWith({ db: 4 });
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches the end of the flow", () => {
    const flow: Flow = [
      {
        loop: {
          while: () => false,
          do: [
            {
              condition: {
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
        condition: {
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
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const onYield = vi.fn();
    nextState({
      flow,
      onYield,
      onReturn: () => {},
      state: current,
      values: {},
      history: true,
    });
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
    const flow: Flow = [
      {
        loop: {
          while: () => false,
          do: [
            {
              condition: {
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
        condition: {
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
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const onReturn = vi.fn();
    nextState({
      flow,
      onYield: () => {},
      onReturn,
      state: current,
      values: {},
      history: true,
    });
    expect(onReturn).toHaveBeenCalledWith({ a: 1, b: 2 });
  });

  it("doesn't navigate to any form that is after a return", () => {
    const flow: Flow = [
      {
        loop: {
          while: () => false,
          do: [
            {
              condition: {
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
        condition: {
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
    const current: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const next = nextState({
      flow,
      onYield: () => {},
      onReturn: () => {},
      state: current,
      values: {},
      history: true,
    });
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    expect(next).toEqual(expected);
  });

  it("doesn't navigate to any other form if the current form is the last one", () => {
    const flow: Flow = [
      {
        loop: {
          while: () => false,
          do: [
            {
              condition: {
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
        condition: {
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
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const next = nextState({
      flow,
      onYield: () => {},
      onReturn: () => {},
      state: current,
      values: {},
      history: true,
    });
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
            { type: "condition", branch: "then", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    expect(next).toEqual(expected);
  });

  it("generates new values from the current form when navigating to the next step", () => {
    const flow: Flow = [
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
      points: [{ path: [{ type: "list", slot: 0 }], inputs: {} }],
      values: { type: "list", list: {} },
    };
    const state = nextState({
      flow,
      onYield: () => {},
      onReturn: () => {},
      state: current,
      values: { a: 1, b: 2 },
      history: true,
    });
    const expected: State = {
      points: [
        { path: [{ type: "list", slot: 0 }], inputs: {} },
        { path: [{ type: "list", slot: 1 }], inputs: { a: 1, b: 2 } },
      ],
      values: {
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
    const flow: Flow = [
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
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    const state = nextState({
      flow,
      onYield: () => {},
      onReturn: () => {},
      state: current,
      values: { a: 1, b: 2 },
      history: true,
    });
    const expected: State = {
      points: [
        {
          path: [
            { type: "list", slot: 0 },
            { type: "loop", slot: 0 },
          ],
          inputs: {},
        },
        {
          path: [{ type: "list", slot: 1 }],
          inputs: { a: 1, b: 2 },
        },
      ],
      values: {
        type: "list",
        list: {
          0: {
            type: "loop",
            do: {
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

describe("prevState", () => {
  it("navigates to the form that is previous to the current one", () => {
    const flow: Flow = [
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
        { path: [{ type: "list", slot: 0 }], inputs: {} },
        { path: [{ type: "list", slot: 1 }], inputs: {} },
      ],
      values: { type: "list", list: {} },
    };
    const state = prevState({
      flow,
      onYield: () => {},
      state: current,
      values: {},
    });
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], inputs: {} }],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("doesn't navigate to any other form if the current form is the first one", () => {
    const flow: Flow = [
      {
        form: {
          values: () => ({}),
          render: () => null,
        },
      },
    ];
    const current: State = {
      points: [{ path: [{ type: "list", slot: 0 }], inputs: {} }],
      values: { type: "list", list: {} },
    };
    const state = prevState({
      flow,
      onYield: () => {},
      state: current,
      values: {},
    });
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], inputs: {} }],
      values: { type: "list", list: {} },
    };
    expect(state).toEqual(expected);
  });

  it("saves the current form values when navigating to the previous step", () => {
    const flow: Flow = [
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
        { path: [{ type: "list", slot: 0 }], inputs: {} },
        { path: [{ type: "list", slot: 1 }], inputs: { a: 1 } },
      ],
      values: {
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
    const state = prevState({
      flow,
      onYield: () => {},
      state: current,
      values: { b: 2 },
    });
    const expected: State = {
      points: [{ path: [{ type: "list", slot: 0 }], inputs: {} }],
      values: {
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

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches the start of the flow", () => {
    const flow: Flow = [
      {
        yield: {
          next: () => [{ an: 1 }, { bn: 2 }],
          back: () => [{ ab: 1 }, { bb: 2 }],
        },
      },
      {
        condition: {
          if: () => true,
          then: [
            {
              condition: {
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
        { path: [{ type: "list", slot: 0 }], inputs: {} },
        {
          path: [
            { type: "list", slot: 1 },
            { type: "condition", branch: "then", slot: 0 },
            { type: "condition", branch: "else", slot: 0 },
          ],
          inputs: {},
        },
        {
          path: [
            { type: "list", slot: 1 },
            { type: "condition", branch: "then", slot: 0 },
            { type: "condition", branch: "else", slot: 1 },
            { type: "loop", slot: 0 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    prevState({ flow, onYield, state: current, values: {} });
    expect(onYield).toHaveBeenNthCalledWith(1, { cb: 3 });
    expect(onYield).toHaveBeenNthCalledWith(2, { ab: 1 });
    expect(onYield).toHaveBeenNthCalledWith(3, { bb: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ an: 1 });
    expect(onYield).not.toHaveBeenCalledWith({ bn: 2 });
    expect(onYield).not.toHaveBeenCalledWith({ cn: 3 });
  });

  it("calls the onYield callback with the appropriate values every time values are yielded until it reaches the previous form", () => {
    const flow: Flow = [
      {
        loop: {
          while: () => false,
          do: [
            {
              condition: {
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
        condition: {
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
            { type: "condition", branch: "then", slot: 1 },
          ],
          inputs: {},
        },
        {
          path: [{ type: "list", slot: 1 }],
          inputs: {},
        },
        {
          path: [
            { type: "list", slot: 2 },
            { type: "condition", branch: "else", slot: 0 },
          ],
          inputs: {},
        },
        {
          path: [
            { type: "list", slot: 2 },
            { type: "condition", branch: "else", slot: 1 },
          ],
          inputs: {},
        },
      ],
      values: { type: "list", list: {} },
    };
    prevState({ flow, onYield, state: current, values: {} });
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
