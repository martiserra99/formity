/**
 * Union of `FlowEntries` and `FormEntries`.
 */
export type ItemEntries = FlowEntries | FormEntries;

/**
 * Values entered for the forms that are within any flow control structure.
 */
export type FlowEntries =
  | ListEntries
  | CondEntries
  | LoopEntries
  | SwitchEntries;

/**
 * Values entered for the forms that are within a list.
 */
export type ListEntries = {
  type: "list";
  list: { [position: number]: ItemEntries };
};

/**
 * Values entered for the forms that are within a condition.
 */
export type CondEntries = {
  type: "cond";
  then: { [position: number]: ItemEntries };
  else: { [position: number]: ItemEntries };
};

/**
 * Values entered for the forms that are within a loop.
 */
export type LoopEntries = {
  type: "loop";
  list: { [position: number]: ItemEntries };
};

/**
 * Values entered for the forms that are within a switch.
 */
export type SwitchEntries = {
  type: "switch";
  branches: { [position: number]: { [position: number]: ItemEntries } };
  default: { [position: number]: ItemEntries };
};

/**
 * Values entered for a form.
 */
export type FormEntries = { [key: string]: NameEntries };

/**
 * Values entered for a single form value.
 */
export type NameEntries = {
  data: { here: true; data: unknown } | { here: false };
  keys: { [key: PropertyKey]: NameEntries };
};
