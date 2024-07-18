import { Expression } from 'expry';

export type Schema = ListSchema;
export type UnitSchema = FlowSchema | ItemSchema;
export type FlowSchema = ListSchema | CondSchema | LoopSchema;
export type ListSchema = UnitSchema[];
export type CondSchema = {
  cond: {
    if: Expression;
    then: ListSchema;
    else: ListSchema;
  };
};
export type LoopSchema = {
  loop: {
    while: Expression;
    do: ListSchema;
  };
};
export type ItemSchema = FormSchema | ReturnSchema | VariablesSchema;
export type FormSchema = {
  form: {
    defaultValues: Expression;
    resolver: Expression;
    render: Expression;
  };
};
export type ReturnSchema = {
  return: Expression;
};
export type VariablesSchema = {
  variables: Expression;
};
