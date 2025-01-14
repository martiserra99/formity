import type { OnNext, OnBack, GetState, SetState } from "../controls";

/**
 * Defines the structure and behavior of any element in a multi-step form.
 */
export type ItemSchema =
  | FlowSchema
  | FormSchema
  | YieldSchema
  | ReturnSchema
  | VariablesSchema;

/**
 * Defines the structure and behavior of any flow element in a multi-step form.
 */
export type FlowSchema = ListSchema | CondSchema | LoopSchema | SwitchSchema;

/**
 * Defines the structure and behavior of a list element in a multi-step form.
 */
export type ListSchema = ItemSchema[];

/**
 * Defines the structure and behavior of a condition element in a multi-step form.
 */
export type CondSchema = {
  cond: {
    if: (inputs: object) => boolean;
    then: ListSchema;
    else: ListSchema;
  };
};

/**
 * Defines the structure and behavior of a loop element in a multi-step form.
 */
export type LoopSchema = {
  loop: {
    while: (inputs: object) => boolean;
    do: ListSchema;
  };
};

/**
 * Defines the structure and behavior of a switch element in a multi-step form.
 */
export type SwitchSchema = {
  switch: {
    branches: {
      case: (inputs: object) => boolean;
      then: ListSchema;
    }[];
    default: ListSchema;
  };
};

/**
 * Defines the structure and behavior of a form element in a multi-step form.
 */
export type FormSchema = {
  form: {
    values: (inputs: object) => Record<string, [unknown, PropertyKey[]]>;
    render: (args: {
      inputs: object;
      values: object;
      params: object;
      onNext: OnNext;
      onBack: OnBack;
      getState: GetState;
      setState: SetState;
    }) => unknown;
  };
};

/**
 * Defines the structure and behavior of a yield element in a multi-step form.
 */
export type YieldSchema = {
  yield: (inputs: object) => object;
};

/**
 * Defines the structure and behavior of a return element in a multi-step form.
 */
export type ReturnSchema = {
  return: (inputs: object) => object;
};

/**
 * Defines the structure and behavior of a variables element in a multi-step form.
 */
export type VariablesSchema = {
  variables: (inputs: object) => object;
};
