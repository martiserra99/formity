/**
 * This type is meant to be extended and is used to define the structure and values of any element in a multi-step form.
 */
export type ItemValues =
  | FlowValues
  | FormValues
  | YieldValues
  | ReturnValues
  | VariablesValues;

/**
 * This type is meant to be extended and is used to define the structure and values of any flow element in a multi-step form.
 */
export type FlowValues = ListValues | CondValues | LoopValues | SwitchValues;

/**
 * This type is meant to be extended and is used to define the structure and values of a list element in a multi-step form.
 */
export type ListValues = ItemValues[];

/**
 * This type is meant to be extended and is used to define the structure and values of a condition element in a multi-step form.
 */
export type CondValues = {
  type: "cond";
  cond: {
    then: ListValues;
    else: ListValues;
  };
};

/**
 * This type is meant to be extended and is used to define the structure and values of a loop element in a multi-step form.
 */
export type LoopValues = {
  type: "loop";
  loop: {
    do: ListValues;
  };
};

/**
 * This type is meant to be extended and is used to define the structure and values of a switch element in a multi-step form.
 */
export type SwitchValues = {
  type: "switch";
  switch: {
    branches: ListValues[];
    default: ListValues;
  };
};

/**
 * This type is meant to be extended and is used to define the values of a form element in a multi-step form.
 */
export type FormValues = {
  type: "form";
  form: object;
};

/**
 * This type is meant to be extended and is used to define the values of a yield element in a multi-step form.
 */
export type YieldValues = {
  type: "yield";
  yield: object;
};

/**
 * This type is meant to be extended and is used to define the values of a return element in a multi-step form.
 */
export type ReturnValues = {
  type: "return";
  return: object;
};

/**
 * This type is meant to be extended and is used to define the values of a variables element in a multi-step form.
 */
export type VariablesValues = {
  type: "variables";
  variables: object;
};
