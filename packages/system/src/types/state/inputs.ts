/**
 * Union of `FlowInputs` and `FormInputs`.
 */
export type ItemInputs = FlowInputs | FormInputs;

/**
 * Values entered for the forms that are within any flow control structure.
 */
export type FlowInputs = ListInputs | CondInputs | LoopInputs | SwitchInputs;

/**
 * Values entered for the forms that are within a list.
 */
export type ListInputs = {
  type: "list";
  list: { [position: number]: ItemInputs };
};

/**
 * Values entered for the forms that are within a condition.
 */
export type CondInputs = {
  type: "cond";
  then: { [position: number]: ItemInputs };
  else: { [position: number]: ItemInputs };
};

/**
 * Values entered for the forms that are within a loop.
 */
export type LoopInputs = {
  type: "loop";
  list: { [position: number]: ItemInputs };
};

/**
 * Values entered for the forms that are within a switch.
 */
export type SwitchInputs = {
  type: "switch";
  branches: { [position: number]: { [position: number]: ItemInputs } };
  default: { [position: number]: ItemInputs };
};

/**
 * Values entered for a form.
 */
export type FormInputs = { [key: string]: NameInputs };

/**
 * Values entered for a single form value.
 */
export type NameInputs = {
  data: { here: true; data: unknown } | { here: false };
  keys: { [key: PropertyKey]: NameInputs };
};
