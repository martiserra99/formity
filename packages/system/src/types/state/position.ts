/**
 * Position within a nest element of a multi-step form.
 */
export type Position =
  | ListPosition
  | ConditionPosition
  | LoopPosition
  | SwitchPosition
  | JumpPosition
  | ModulePosition;

/**
 * Position within a list.
 */
export type ListPosition = {
  type: "list";
  slot: number;
};

/**
 * Position within a condition.
 */
export type ConditionPosition = {
  type: "condition";
  branch: "then" | "else";
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

/**
 * Position within a module.
 */
export type ModulePosition = {
  type: "module";
};
