import { describe, expect, it } from "vitest";

import type { FormValues } from "src/types/state/values";

import { get, set } from "./form";

describe("FormValues", () => {
  describe("get", () => {
    it("returns the value that is in the given `FormValues` object", () => {
      const form: FormValues = {
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

    it("returns the default value if the keys are not encountered in the given `FormValues` object", () => {
      const form: FormValues = {
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
    it("sets the value in the given `FormValues` object", () => {
      const form: FormValues = {};
      const name: string = "a";
      const keys: PropertyKey[] = ["x", "y"];
      const data: unknown = 1;
      const result = set(form, name, keys, data);
      const expected: FormValues = {
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
