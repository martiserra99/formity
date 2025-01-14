import { describe, expect, it } from "vitest";

import type { FormInputs } from "src/types/state/inputs";

import { get, set } from "./form";

describe("FormInputs", () => {
  describe("get", () => {
    it("returns the value that is in the given `FormInputs` object", () => {
      const form: FormInputs = {
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
      };
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "y"];
      const defaultValue: unknown = 2;
      const result = get(form, name, keys, defaultValue);
      expect(result).toEqual(1);
    });

    it("returns the default value if the keys are not encountered in the given `FormInputs` object", () => {
      const form: FormInputs = {
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
      };
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "z"];
      const defaultValue: unknown = 2;
      const result = get(form, name, keys, defaultValue);
      expect(result).toEqual(2);
    });
  });

  describe("set", () => {
    it("sets the value in the given `FormInputs` object", () => {
      const flow: FormInputs = {};
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "y"];
      const data: unknown = 1;
      const result = set(flow, name, keys, data);
      const expected: FormInputs = {
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
      };
      expect(result).toEqual(expected);
    });
  });
});
