import { Value } from "expry";

export type UnitSchemaType = FlowSchemaType | StepSchemaType;

export type FlowSchemaType = ListSchemaType | CondSchemaType | LoopSchemaType;

export type ListSchemaType = UnitSchemaType[];

export type CondSchemaType = {
  cond: {
    if: Value;
    then: ListSchemaType;
    else: ListSchemaType;
  };
};

export type LoopSchemaType = {
  loop: {
    while: Value;
    do: ListSchemaType;
  };
};

export type StepSchemaType = StopSchemaType | VariablesSchemaType;

export type StopSchemaType = FormSchemaType | ReturnSchemaType;

export type FormSchemaType = {
  form: {
    defaultValues: Value;
    resolver: Value;
    render: Value;
  };
};

export type ReturnSchemaType = {
  return: Value;
};

export type VariablesSchemaType = {
  variables: Value;
};
