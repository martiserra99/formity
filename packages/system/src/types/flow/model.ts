import type { OnNext, OnBack, GetState, SetState } from "../render";

/**
 * Defines the structure and behavior of the multi-step form.
 */
export type Flow<T = unknown> = ListFlow<T>;

/**
 * Defines the structure and behavior of any element in a multi-step form.
 */
export type ItemFlow<Render = unknown> =
  | ControlFlow<Render>
  | FormFlow<Render>
  | YieldFlow
  | ReturnFlow
  | VariablesFlow;

/**
 * Defines the structure and behavior of any control element in a multi-step form.
 */
export type ControlFlow<Render = unknown> =
  | ListFlow<Render>
  | ConditionFlow<Render>
  | LoopFlow<Render>
  | SwitchFlow<Render>;

/**
 * Defines the structure and behavior of a list element in a multi-step form.
 */
export type ListFlow<Render = unknown> = ItemFlow<Render>[];

/**
 * Defines the structure and behavior of a condition element in a multi-step form.
 */
export type ConditionFlow<Render = unknown> = {
  condition: {
    if: (inputs: Record<string, unknown>) => boolean;
    then: ListFlow<Render>;
    else: ListFlow<Render>;
  };
};

/**
 * Defines the structure and behavior of a loop element in a multi-step form.
 */
export type LoopFlow<Render = unknown> = {
  loop: {
    while: (inputs: Record<string, unknown>) => boolean;
    do: ListFlow<Render>;
  };
};

/**
 * Defines the structure and behavior of a switch element in a multi-step form.
 */
export type SwitchFlow<Render = unknown> = {
  switch: {
    branches: {
      case: (inputs: Record<string, unknown>) => boolean;
      then: ListFlow<Render>;
    }[];
    default: ListFlow<Render>;
  };
};

/**
 * Defines the structure and behavior of a form element in a multi-step form.
 */
export type FormFlow<Render = unknown> = {
  form: {
    values: (
      inputs: Record<string, unknown>,
    ) => Record<string, [unknown, PropertyKey[]]>;
    render: (args: {
      inputs: Record<string, unknown>;
      values: Record<string, unknown>;
      params: Record<string, unknown>;
      onNext: OnNext<Record<string, unknown>>;
      onBack: OnBack<Record<string, unknown>>;
      getState: GetState<Record<string, unknown>>;
      setState: SetState;
    }) => Render;
  };
};

/**
 * Defines the structure and behavior of a yield element in a multi-step form.
 */
export type YieldFlow = {
  yield: {
    next: (inputs: Record<string, unknown>) => unknown[];
    back: (inputs: Record<string, unknown>) => unknown[];
  };
};

/**
 * Defines the structure and behavior of a return element in a multi-step form.
 */
export type ReturnFlow = {
  return: (inputs: Record<string, unknown>) => unknown;
};

/**
 * Defines the structure and behavior of a variables element in a multi-step form.
 */
export type VariablesFlow = {
  variables: (inputs: Record<string, unknown>) => Record<string, unknown>;
};
