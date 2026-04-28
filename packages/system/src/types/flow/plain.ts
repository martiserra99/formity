import type { OnNext, OnBack, GetState, SetState } from "../form-controls";

export type Flow<Render = unknown> = ListFlow<Render>;

export type ItemFlow<Render = unknown> =
  | NestFlow<Render>
  | FormFlow<Render>
  | VariablesFlow
  | YieldFlow
  | ReturnFlow;

export type NestFlow<Render = unknown> =
  | ListFlow<Render>
  | ConditionFlow<Render>
  | LoopFlow<Render>
  | SwitchFlow<Render>
  | JumpFlow<Render>;

export type ListFlow<Render = unknown> = ItemFlow<Render>[];

export type ConditionFlow<Render = unknown> = {
  condition: {
    if: (inputs: Record<string, unknown>) => boolean;
    then: ListFlow<Render>;
    else: ListFlow<Render>;
  };
};

export type LoopFlow<Render = unknown> = {
  loop: {
    while: (inputs: Record<string, unknown>) => boolean;
    do: ListFlow<Render>;
  };
};

export type SwitchFlow<Render = unknown> = {
  switch: {
    branches: {
      case: (inputs: Record<string, unknown>) => boolean;
      then: ListFlow<Render>;
    }[];
    default: ListFlow<Render>;
  };
};

export type JumpFlow<Render = unknown> = {
  jump: {
    id: string;
    at: FormFlow<Render>;
  };
};

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

export type VariablesFlow = {
  variables: (inputs: Record<string, unknown>) => Record<string, unknown>;
};

export type YieldFlow = {
  yield: {
    next: (inputs: Record<string, unknown>) => unknown[];
    back: (inputs: Record<string, unknown>) => unknown[];
  };
};

export type ReturnFlow = {
  return: (inputs: Record<string, unknown>) => unknown;
};
