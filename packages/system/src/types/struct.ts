/**
 * This type is meant to be extended and is used to define the structure of a multi-step form.
 */
export type Struct = ListStruct;

/**
 * This type is meant to be extended and is used to define the structure of an element in a multi-step form.
 */
export type ItemStruct =
  | FormStruct
  | VariablesStruct
  | YieldStruct
  | ReturnStruct
  | NestStruct;

/**
 * This type is meant to be extended and is used to define the structure of a form element in a multi-step form.
 */
export type FormStruct = {
  type: "form";
  form: {
    fields: Record<string, unknown>;
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a variables element in a multi-step form.
 */
export type VariablesStruct = {
  type: "variables";
  variables: Record<string, unknown>;
};

/**
 * This type is meant to be extended and is used to define the structure of a yield element in a multi-step form.
 */
export type YieldStruct = {
  type: "yield";
  yield: {
    next: unknown[];
    back: unknown[];
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a return element in a multi-step form.
 */
export type ReturnStruct = {
  type: "return";
  return: unknown;
};

/**
 * This type is meant to be extended and is used to define the structure of a nest element in a multi-step form.
 */
export type NestStruct =
  | ListStruct
  | ConditionStruct
  | LoopStruct
  | SwitchStruct
  | JumpStruct;

/**
 * This type is meant to be extended and is used to define the structure of a list element in a multi-step form.
 */
export type ListStruct = ItemStruct[];

/**
 * This type is meant to be extended and is used to define the structure of a condition element in a multi-step form.
 */
export type ConditionStruct = {
  type: "condition";
  condition: {
    then: ListStruct;
    else: ListStruct;
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a loop element in a multi-step form.
 */
export type LoopStruct = {
  type: "loop";
  loop: {
    do: ListStruct;
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a switch element in a multi-step form.
 */
export type SwitchStruct = {
  type: "switch";
  switch: {
    branches: ListStruct[];
    default: ListStruct;
  };
};

/**
 * This type is meant to be extended and is used to define the structure of a jump element in a multi-step form.
 */
export type JumpStruct = {
  type: "jump";
  jump: {
    at: FormStruct;
  };
};
