import type {
  ConditionStruct,
  LoopStruct,
  SwitchStruct,
  JumpStruct,
  FormStruct,
  VariablesStruct,
  YieldStruct,
  ReturnStruct,
} from "../struct";

import type {
  ConditionFlow,
  LoopFlow,
  SwitchFlow,
  JumpFlow,
  FormFlow,
  VariablesFlow,
  YieldFlow,
  ReturnFlow,
} from "../flow/typed";

type ConditionSchema = {
  render: unknown;
  struct: ConditionStruct;
  inputs: Record<string, unknown>;
  memory: Record<string, unknown>;
  params: Record<string, unknown>;
};

export type Condition<T extends ConditionSchema> = ConditionFlow<
  T["render"],
  T["struct"],
  T["inputs"],
  T["memory"],
  T["params"]
>;

type LoopSchema = {
  render: unknown;
  struct: LoopStruct;
  inputs: Record<string, unknown>;
  memory: Record<string, unknown>;
  params: Record<string, unknown>;
};

export type Loop<T extends LoopSchema> = LoopFlow<
  T["render"],
  T["struct"],
  T["inputs"],
  T["memory"],
  T["params"]
>;

type SwitchSchema = {
  render: unknown;
  struct: SwitchStruct;
  inputs: Record<string, unknown>;
  memory: Record<string, unknown>;
  params: Record<string, unknown>;
};

export type Switch<T extends SwitchSchema> = SwitchFlow<
  T["render"],
  T["struct"],
  T["inputs"],
  T["memory"],
  T["params"]
>;

type JumpSchema = {
  render: unknown;
  struct: JumpStruct;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};

export type Jump<T extends JumpSchema> = JumpFlow<
  T["render"],
  T["struct"],
  T["inputs"],
  T["params"]
>;

type FormSchema = {
  render: unknown;
  struct: FormStruct;
  memory: Record<string, unknown>;
  params: Record<string, unknown>;
};

export type Form<T extends FormSchema> = FormFlow<
  T["render"],
  T["struct"],
  T["memory"],
  T["params"]
>;

type VariablesSchema = {
  struct: VariablesStruct;
  memory: Record<string, unknown>;
};

export type Variables<T extends VariablesSchema> = VariablesFlow<
  T["struct"],
  T["memory"]
>;

type YieldSchema = {
  struct: YieldStruct;
  memory: Record<string, unknown>;
};

export type Yield<T extends YieldSchema> = YieldFlow<T["struct"], T["memory"]>;

type ReturnSchema = {
  struct: ReturnStruct;
  memory: Record<string, unknown>;
};

export type Return<T extends ReturnSchema> = ReturnFlow<
  T["struct"],
  T["memory"]
>;
