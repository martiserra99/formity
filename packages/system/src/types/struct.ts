import type { ModuleSchema } from "./schema";

export type Struct = ListStruct;

export type ItemStruct =
  | FormStruct
  | VariablesStruct
  | YieldStruct
  | ReturnStruct
  | NestStruct;

export type FormStruct = {
  type: "form";
  form: {
    fields: Record<string, unknown>;
  };
};

export type VariablesStruct = {
  type: "variables";
  variables: Record<string, unknown>;
};

export type YieldStruct = {
  type: "yield";
  yield: {
    next: unknown[];
    back: unknown[];
  };
};

export type ReturnStruct = {
  type: "return";
  return: unknown;
};

export type NestStruct =
  | ListStruct
  | ConditionStruct
  | LoopStruct
  | SwitchStruct
  | JumpStruct
  | ModuleStruct;

export type ListStruct = ItemStruct[];

export type ConditionStruct = {
  type: "condition";
  condition: {
    then: ListStruct;
    else: ListStruct;
  };
};

export type LoopStruct = {
  type: "loop";
  loop: {
    do: ListStruct;
  };
};

export type SwitchStruct = {
  type: "switch";
  switch: {
    branches: ListStruct[];
    default: ListStruct;
  };
};

export type JumpStruct = {
  type: "jump";
  jump: {
    at: FormStruct;
  };
};

export type ModuleStruct = {
  type: "module";
  module: ModuleSchema;
};
