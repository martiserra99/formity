/**
 * Represents a position within a flow control structure of a multi-step form. This can be a list, a conditional, a loop, or a switch.
 */
export type Position =
  | ListPosition
  | ConditionPosition
  | LoopPosition
  | SwitchPosition;

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
export type ConditionPosition = {
  type: "condition";
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

/**
 * Represents a position within a switch.
 */
export type SwitchPosition = {
  type: "switch";
  branch: number;
  slot: number;
};
