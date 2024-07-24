import { Value } from "expry";

export type ItemSchema = FlowSchema | StepSchema | VariablesSchema;

export type FlowSchema = ListSchema | CondSchema | LoopSchema;

export type ListSchema = ItemSchema[];

export type CondSchema = {
  cond: {
    if: Value;
    then: ListSchema;
    else: ListSchema;
  };
};

export type LoopSchema = {
  loop: {
    while: Value;
    do: ListSchema;
  };
};

export type StepSchema = FormSchema | ReturnSchema;

export type FormSchema = {
  form: {
    defaultValues: Value;
    resolver: Value;
    render: Value;
  };
};

export type ReturnSchema = {
  return: Value;
};

export type VariablesSchema = {
  variables: Value;
};
