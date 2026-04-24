import { describe, expect, it } from "vitest";

import type { JumpFlow, FormFlow } from "../../types/flow/model";

import { into, next, at } from "./scope.jump";

describe("JumpFlow", () => {
  describe("into", () => {
    it("navigates into the `JumpFlow` object", () => {
      const position = into();
      expect(position).toEqual({ type: "jump" });
    });
  });

  describe("next", () => {
    it("doesn't navigate to the next item in the `JumpFlow` object", () => {
      const position = next();
      expect(position).toEqual(null);
    });
  });

  describe("at", () => {
    it("retrieves the item of the `JumpFlow` object", () => {
      const item: FormFlow = {
        form: {
          values: () => ({}),
          render: () => ({}),
        },
      };
      const flow: JumpFlow = {
        jump: {
          id: "A",
          item: item,
        },
      };
      const result = at(flow);
      expect(result).toBe(item);
    });
  });
});
