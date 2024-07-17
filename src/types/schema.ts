import { Expr } from 'expry';

export type Schema = ListSchema;
export type UnitSchema = FlowSchema | ItemSchema;
export type FlowSchema = ListSchema | CondSchema | LoopSchema;
export type ListSchema = UnitSchema[];
export type CondSchema = {
  cond: {
    if: Expr;
    then: ListSchema;
    else: ListSchema;
  };
};
export type LoopSchema = {
  loop: {
    while: Expr;
    do: ListSchema;
  };
};
export type ItemSchema = FormSchema | ReturnSchema | VariablesSchema;
export type FormSchema = {
  form: {
    defaultValues: Expr;
    resolver: Expr;
    render: Expr;
  };
};
export type ReturnSchema = {
  return: Expr;
};
export type VariablesSchema = {
  variables: Expr;
};
