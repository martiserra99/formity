/**
 * These types represent a position within the flow of a multi-step form.
 * The flow refers to the execution path of the multi-step form, which can be a list,
 * a conditional, or a loop.
 */

export type Position = ListPosition | CondPosition | LoopPosition;

export type ListPosition = {
  type: "list";
  slot: number;
};

export type CondPosition = {
  type: "cond";
  path: "then" | "else";
  slot: number;
};

export type LoopPosition = {
  type: "loop";
  slot: number;
};
