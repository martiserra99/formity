import { Expression } from "expry";

export type UnitSchemaType = FlowSchemaType | ItemSchemaType;

export type FlowSchemaType = ListSchemaType | CondSchemaType | LoopSchemaType;

export type ListSchemaType = UnitSchemaType[];

export type CondSchemaType = {
  cond: {
    if: Expression;
    then: ListSchemaType;
    else: ListSchemaType;
  };
};

export type LoopSchemaType = {
  loop: {
    while: Expression;
    do: ListSchemaType;
  };
};

export type ItemSchemaType = FormSchemaType | ReturnSchemaType | VariablesSchemaType;

export type FormSchemaType = {
  form: {
    defaultValues: Expression;
    resolver: Expression;
    render: Expression;
  };
};

export type ReturnSchemaType = {
  return: Expression;
};

export type VariablesSchemaType = {
  variables: Expression;
};
