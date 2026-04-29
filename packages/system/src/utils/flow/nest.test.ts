import { describe, expect, it } from "vitest";

import type { ListFlow, ReturnFlow } from "../../types/flow/plain";
import type { Position } from "src/types/state/position";

import { find, jump } from "./nest";

describe("NestFlow", () => {
  describe("find", () => {
    it("returns the item at the given path within the given flow", () => {
      const item: ReturnFlow = { return: () => ({}) };
      const flow: ListFlow = [
        { variables: () => ({}) },
        {
          condition: {
            if: () => true,
            then: [
              {
                loop: {
                  while: () => true,
                  do: [item],
                },
              },
            ],
            else: [],
          },
        },
      ];
      const path: Position[] = [
        { type: "list", slot: 1 },
        { type: "condition", branch: "then", slot: 0 },
        { type: "loop", slot: 0 },
      ];
      const result = find(flow, path);
      expect(result).toBe(item);
    });
  });

  describe("jump", () => {
    it("returns the path to the form element with the given id", () => {
      const flow: ListFlow = [
        { variables: () => ({}) },
        { form: { values: () => ({}), render: () => ({}) } },
        {
          condition: {
            if: () => true,
            then: [
              { form: { values: () => ({}), render: () => ({}) } },
              {
                loop: {
                  while: () => true,
                  do: [
                    { variables: () => ({}) },
                    { form: { values: () => ({}), render: () => ({}) } },
                    {
                      jump: {
                        id: "target",
                        at: {
                          form: { values: () => ({}), render: () => ({}) },
                        },
                      },
                    },
                  ],
                },
              },
            ],
            else: [
              { variables: () => ({}) },
              {
                switch: {
                  branches: [
                    {
                      case: () => true,
                      then: [
                        { form: { values: () => ({}), render: () => ({}) } },
                      ],
                    },
                  ],
                  default: [
                    { form: { values: () => ({}), render: () => ({}) } },
                  ],
                },
              },
            ],
          },
        },
      ];
      const path = jump(flow, "target");
      expect(path).toEqual([
        { type: "list", slot: 2 },
        { type: "condition", branch: "then", slot: 1 },
        { type: "loop", slot: 2 },
        { type: "jump" },
      ]);
    });
  });
});
