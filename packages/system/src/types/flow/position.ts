/**
 * Represents a position within a flow control structure of a multi-step form. This can be a list, a conditional, or a loop.
 */
export type Position = ListPosition | CondPosition | LoopPosition;

/**
 * Represents a position within a list.
 */
export type ListPosition = {
  type: "list";
  slot: number;
};

/**
 * Represents a position within a conditional.
 */
export type CondPosition = {
  type: "cond";
  path: "then" | "else";
  slot: number;
};

/**
 * Represents a position within a loop.
 */
export type LoopPosition = {
  type: "loop";
  slot: number;
};
