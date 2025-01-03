/**
 * The `ListSchema` type represents the overall structure and behavior of a multi-step form
 * by defining an array of steps, each described by an `ItemSchema`.
 */

import type { OnNext, OnBack, GetFlow, SetFlow } from "../callbacks";

export type ItemSchema =
  | FlowSchema
  | FormSchema
  | YieldSchema
  | ReturnSchema
  | VariablesSchema;

export type FlowSchema = ListSchema | CondSchema | LoopSchema;

export type ListSchema = ItemSchema[];

export type CondSchema = {
  cond: {
    if: (inputs: object) => boolean;
    then: ListSchema;
    else: ListSchema;
  };
};

export type LoopSchema = {
  loop: {
    while: (inputs: object) => boolean;
    do: ListSchema;
  };
};

export type FormSchema = {
  form: {
    values: (inputs: object) => Record<string, [unknown, PropertyKey[]]>;
    render: (args: {
      inputs: object;
      values: object;
      params: object;
      onNext: OnNext;
      onBack: OnBack;
      getFlow: GetFlow;
      setFlow: SetFlow;
    }) => unknown;
  };
};

export type YieldSchema = {
  yield: (inputs: object) => object;
};

export type ReturnSchema = {
  return: (inputs: object) => object;
};

export type VariablesSchema = {
  variables: (inputs: object) => object;
};
