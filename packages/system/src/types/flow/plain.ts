import type {
  OnNext,
  OnBack,
  OnJump,
  GetState,
  SetState,
} from "../form-controls";

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
    if: (values: Record<string, unknown>) => boolean;
    then: ListFlow<Render>;
    else: ListFlow<Render>;
  };
};

export type LoopFlow<Render = unknown> = {
  loop: {
    while: (values: Record<string, unknown>) => boolean;
    do: ListFlow<Render>;
  };
};

export type SwitchFlow<Render = unknown> = {
  switch: {
    branches: {
      case: (values: Record<string, unknown>) => boolean;
      then: ListFlow<Render>;
    }[];
    default: ListFlow<Render>;
  };
};

export type JumpFlow<Render = unknown> = {
  jump: {
    id: unknown;
    at: ItemFlow<Render>;
  };
};

export type FormFlow<Render = unknown> = {
  form: {
    fields: (
      values: Record<string, unknown>,
    ) => Record<string, [unknown, PropertyKey[]]>;
    render: (args: {
      fields: Record<string, unknown>;
      values: Record<string, unknown>;
      params: Record<string, unknown>;
      onNext: OnNext<Record<string, unknown>>;
      onBack: OnBack<Record<string, unknown>>;
      onJump: OnJump<Record<string, unknown>>;
      getState: GetState<Record<string, unknown>>;
      setState: SetState;
    }) => Render;
  };
};

export type VariablesFlow = {
  variables: (values: Record<string, unknown>) => Record<string, unknown>;
};

export type YieldFlow = {
  yield: {
    next: (values: Record<string, unknown>) => unknown[];
    back: (values: Record<string, unknown>) => unknown[];
  };
};

export type ReturnFlow = {
  return: (values: Record<string, unknown>) => unknown;
};
