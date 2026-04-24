/**
 * Position within an element of a multi-step form.
 */
export type Position = ControlPosition | JumpPosition;

/**
 * Position within a flow control structure.
 */
export type ControlPosition =
  | ListPosition
  | ConditionPosition
  | LoopPosition
  | SwitchPosition;

/**
 * Position within a list.
 */
export type ListPosition = {
  type: "list";
  slot: number;
};

/**
 * Position within a conditional.
 */
export type ConditionPosition = {
  type: "condition";
  path: "then" | "else";
  slot: number;
};

/**
 * Position within a loop.
 */
export type LoopPosition = {
  type: "loop";
  slot: number;
};

/**
 * Position within a switch.
 */
export type SwitchPosition = {
  type: "switch";
  branch: number;
  slot: number;
};

/**
 * Position within a jump.
 */
export type JumpPosition = {
  type: "jump";
};
