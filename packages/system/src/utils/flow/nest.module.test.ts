import { describe, expect, it } from "vitest";

import type { ModuleFlow, ListFlow } from "../../types/flow/plain";

import { into, next, at } from "./nest.module";

describe("ModuleFlow", () => {
  describe("into", () => {
    it("navigates into the `ModuleFlow` object", () => {
      const position = into();
      expect(position).toEqual({ type: "module" });
    });
  });

  describe("next", () => {
    it("doesn't navigate to the next item in the `ModuleFlow` object", () => {
      const position = next();
      expect(position).toEqual(null);
    });
  });

  describe("at", () => {
    it("retrieves the item of the `ModuleFlow` object", () => {
      const item: ListFlow = [
        {
          form: {
            fields: () => ({}),
            render: () => ({}),
          },
        },
      ];
      const flow: ModuleFlow = {
        module: item,
      };
      const result = at(flow);
      expect(result).toBe(item);
    });
  });
});
