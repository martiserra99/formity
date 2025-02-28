import type { OnNext, OnBack, GetState, SetState } from "../controls";

/**
 * Defines the structure and behavior of a multi-step form.
 */
export type Schema<R = unknown> = ListSchema<R>;

/**
 * Defines the structure and behavior of any element in a multi-step form.
 */
export type ItemSchema<R = unknown> =
  | FlowSchema<R>
  | FormSchema<R>
  | YieldSchema
  | ReturnSchema
  | VariablesSchema;

/**
 * Defines the structure and behavior of any flow element in a multi-step form.
 */
export type FlowSchema<R = unknown> =
  | ListSchema<R>
  | CondSchema<R>
  | LoopSchema<R>
  | SwitchSchema<R>;

/**
 * Defines the structure and behavior of a list element in a multi-step form.
 */
export type ListSchema<R = unknown> = ItemSchema<R>[];

/**
 * Defines the structure and behavior of a condition element in a multi-step form.
 */
export type CondSchema<R = unknown> = {
  cond: {
    if: (inputs: Record<string, unknown>) => boolean;
    then: ListSchema<R>;
    else: ListSchema<R>;
  };
};

/**
 * Defines the structure and behavior of a loop element in a multi-step form.
 */
export type LoopSchema<R = unknown> = {
  loop: {
    while: (inputs: Record<string, unknown>) => boolean;
    do: ListSchema<R>;
  };
};

/**
 * Defines the structure and behavior of a switch element in a multi-step form.
 */
export type SwitchSchema<R = unknown> = {
  switch: {
    branches: {
      case: (inputs: Record<string, unknown>) => boolean;
      then: ListSchema<R>;
    }[];
    default: ListSchema<R>;
  };
};

/**
 * Defines the structure and behavior of a form element in a multi-step form.
 */
export type FormSchema<R = unknown> = {
  form: {
    values: (
      inputs: Record<string, unknown>
    ) => Record<string, [unknown, PropertyKey[]]>;
    render: (args: {
      inputs: Record<string, unknown>;
      values: Record<string, unknown>;
      params: Record<string, unknown>;
      onNext: OnNext;
      onBack: OnBack;
      getState: GetState;
      setState: SetState;
    }) => R;
  };
};

/**
 * Defines the structure and behavior of a yield element in a multi-step form.
 */
export type YieldSchema = {
  yield: {
    next: (inputs: Record<string, unknown>) => unknown[];
    back: (inputs: Record<string, unknown>) => unknown[];
  };
};

/**
 * Defines the structure and behavior of a return element in a multi-step form.
 */
export type ReturnSchema = {
  return: (inputs: Record<string, unknown>) => unknown;
};

/**
 * Defines the structure and behavior of a variables element in a multi-step form.
 */
export type VariablesSchema = {
  variables: (inputs: Record<string, unknown>) => Record<string, unknown>;
};
