import { describe, expect, it } from "vitest";

import type { FlowEntries } from "src/types/flow/entries";
import type { Position } from "src/types/flow/position";

import { get, set } from "./flow";

describe("FlowEntries", () => {
  describe("get", () => {
    it("returns the value that is in the given `FlowEntries` object", () => {
      const flow: FlowEntries = {
        type: "list",
        list: {
          1: {
            type: "cond",
            then: {},
            else: {
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
                  },
                },
              },
            },
          },
        },
      };
      const path: Position[] = [
        { type: "list", slot: 1 },
        { type: "cond", path: "else", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "y"];
      const defaultValue: unknown = 2;
      const result = get(flow, path, name, keys, defaultValue);
      expect(result).toEqual(1);
    });

    it("returns the default value if the path is not encountered in the given `FlowEntries` object", () => {
      const flow: FlowEntries = {
        type: "list",
        list: {
          1: {
            type: "cond",
            then: {},
            else: {
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
                  },
                },
              },
            },
          },
        },
      };
      const path: Position[] = [
        { type: "list", slot: 1 },
        { type: "cond", path: "then", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "y"];
      const defaultValue: unknown = 2;
      const result = get(flow, path, name, keys, defaultValue);
      expect(result).toEqual(2);
    });

    it("returns the default value if the keys are not encountered in the given `FlowEntries` object", () => {
      const flow: FlowEntries = {
        type: "list",
        list: {
          1: {
            type: "cond",
            then: {},
            else: {
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
                  },
                },
              },
            },
          },
        },
      };
      const path: Position[] = [
        { type: "list", slot: 1 },
        { type: "cond", path: "else", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "z"];
      const defaultValue: unknown = 2;
      const result = get(flow, path, name, keys, defaultValue);
      expect(result).toEqual(2);
    });
  });

  describe("set", () => {
    it("sets the value in the given `FlowEntries` object", () => {
      const flow: FlowEntries = { type: "list", list: {} };
      const path: Position[] = [
        { type: "list", slot: 1 },
        { type: "cond", path: "else", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "y"];
      const data: unknown = 1;
      const result = set(flow, path, name, keys, data);
      const expected: FlowEntries = {
        type: "list",
        list: {
          1: {
            type: "cond",
            then: {},
            else: {
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
                  },
                },
              },
            },
          },
        },
      };
      expect(result).toEqual(expected);
    });
  });
});
