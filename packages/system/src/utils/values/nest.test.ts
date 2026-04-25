import { describe, expect, it } from "vitest";

import type { NestValues } from "src/types/state/values";
import type { Position } from "src/types/state/position";

import { get, set } from "./nest";

describe("NestValues", () => {
  describe("get", () => {
    it("returns the value that is in the given `NestValues` object", () => {
      const nest: NestValues = {
        type: "list",
        list: {
          1: {
            type: "condition",
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
        { type: "condition", path: "else", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "y"];
      const defaultValue: unknown = 2;
      const result = get(nest, path, name, keys, defaultValue);
      expect(result).toEqual(1);
    });

    it("returns the default value if the path is not encountered in the given `NestValues` object", () => {
      const nest: NestValues = {
        type: "list",
        list: {
          1: {
            type: "condition",
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
        { type: "condition", path: "then", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "y"];
      const defaultValue: unknown = 2;
      const result = get(nest, path, name, keys, defaultValue);
      expect(result).toEqual(2);
    });

    it("returns the default value if the keys are not encountered in the given `NestValues` object", () => {
      const nest: NestValues = {
        type: "list",
        list: {
          1: {
            type: "condition",
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
        { type: "condition", path: "else", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "z"];
      const defaultValue: unknown = 2;
      const result = get(nest, path, name, keys, defaultValue);
      expect(result).toEqual(2);
    });
  });

  describe("set", () => {
    it("sets the value in the given `NestValues` object", () => {
      const nest: NestValues = { type: "list", list: {} };
      const path: Position[] = [
        { type: "list", slot: 1 },
        { type: "condition", path: "else", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "y"];
      const data: unknown = 1;
      const result = set(nest, path, name, keys, data);
      const expected: NestValues = {
        type: "list",
        list: {
          1: {
            type: "condition",
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
