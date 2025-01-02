/**
 * The `ListSchema` type accepts a generic parameter that must extend `ListValues`.
 *
 * `ListValues` is an array containing `ItemValues`, which is a union of specific types:
 * `FlowValues`, `FormValues`, `YieldValues`, `ReturnValues`, and `VariablesValues`.
 *
 * By extending `ListValues`, we can define the structure of a multi-step form,
 * with the values used in each step.
 */

export type ItemValues =
  | FlowValues
  | FormValues
  | YieldValues
  | ReturnValues
  | VariablesValues;

export type FlowValues = ListValues | CondValues | LoopValues;

export type ListValues = ItemValues[];

export type CondValues = {
  type: "cond";
  cond: {
    then: ListValues;
    else: ListValues;
  };
};

export type LoopValues = {
  type: "loop";
  loop: {
    do: ListValues;
  };
};

export type FormValues = {
  type: "form";
  form: object;
};

export type YieldValues = {
  type: "yield";
  yield: object;
};

export type ReturnValues = {
  type: "return";
  return: object;
};

export type VariablesValues = {
  type: "variables";
  variables: object;
};
