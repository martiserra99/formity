import type { OnNext, OnBack, GetState, SetState } from "../controls";

/**
 * Defines the structure and behavior of a multi-step form.
 */
export type Schema<T = unknown> = ListSchema<T>;

/**
 * Defines the structure and behavior of any element in a multi-step form.
 */
export type ItemSchema<T = unknown> =
  | FlowSchema<T>
  | FormSchema<T>
  | YieldSchema
  | ReturnSchema
  | VariablesSchema;

/**
 * Defines the structure and behavior of any flow element in a multi-step form.
 */
export type FlowSchema<T = unknown> =
  | ListSchema<T>
  | CondSchema<T>
  | LoopSchema<T>
  | SwitchSchema<T>;

/**
 * Defines the structure and behavior of a list element in a multi-step form.
 */
export type ListSchema<T = unknown> = ItemSchema<T>[];

/**
 * Defines the structure and behavior of a condition element in a multi-step form.
 */
export type CondSchema<T = unknown> = {
  cond: {
    if: (inputs: object) => boolean;
    then: ListSchema<T>;
    else: ListSchema<T>;
  };
};

/**
 * Defines the structure and behavior of a loop element in a multi-step form.
 */
export type LoopSchema<T = unknown> = {
  loop: {
    while: (inputs: object) => boolean;
    do: ListSchema<T>;
  };
};

/**
 * Defines the structure and behavior of a switch element in a multi-step form.
 */
export type SwitchSchema<T = unknown> = {
  switch: {
    branches: {
      case: (inputs: object) => boolean;
      then: ListSchema<T>;
    }[];
    default: ListSchema<T>;
  };
};

/**
 * Defines the structure and behavior of a form element in a multi-step form.
 */
export type FormSchema<T = unknown> = {
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
    }) => T;
  };
};

/**
 * Defines the structure and behavior of a yield element in a multi-step form.
 */
export type YieldSchema = {
  yield: {
    next: (inputs: object) => object[];
    back: (inputs: object) => object[];
  };
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
