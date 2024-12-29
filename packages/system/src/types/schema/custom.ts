import type {
  ItemValues,
  FlowValues,
  ListValues,
  CondValues,
  LoopValues,
  FormValues,
  YieldValues,
  ReturnValues,
  VariablesValues,
} from "../values";

import type { OnNext, OnBack, GetFlow, SetFlow } from "../callbacks";

export type ItemSchema<
  Render,
  Values extends ItemValues,
  Inputs extends object,
  Params extends object
> = Values extends FlowValues
  ? FlowSchema<Render, Values, Inputs, Params>
  : Values extends FormValues
  ? FormSchema<Render, Values, Inputs, Params>
  : Values extends YieldValues
  ? YieldSchema<Values, Inputs>
  : Values extends ReturnValues
  ? ReturnSchema<Values, Inputs>
  : Values extends VariablesValues
  ? VariablesSchema<Values, Inputs>
  : never;

export type FlowSchema<
  Render,
  Values extends FlowValues,
  Inputs extends object,
  Params extends object
> = Values extends ListValues
  ? ListSchema<Render, Values, Inputs, Params>
  : Values extends CondValues
  ? CondSchema<Render, Values, Inputs, Params>
  : Values extends LoopValues
  ? LoopSchema<Render, Values, Inputs, Params>
  : never;

export type ListSchema<
  Render,
  Values extends ListValues,
  Inputs extends object,
  Params extends object
> = Values extends [infer First, ...infer Other]
  ? First extends ItemValues
    ? Other extends ListValues
      ? [
          ItemSchema<Render, First, Inputs, Params>,
          ...ListSchema<Render, Other, Merge<Inputs, ItemOutput<First>>, Params>
        ]
      : never
    : never
  : [];

export type CondSchema<
  Render,
  Values extends CondValues,
  Inputs extends object,
  Params extends object
> = {
  cond: {
    if: (inputs: Inputs) => boolean;
    then: ListSchema<Render, Values["cond"]["then"], Inputs, Params>;
    else: ListSchema<Render, Values["cond"]["else"], Inputs, Params>;
  };
};

export type LoopSchema<
  Render,
  Values extends LoopValues,
  Inputs extends object,
  Params extends object
> = {
  loop: {
    while: (inputs: Inputs) => boolean;
    do: ListSchema<Render, Values["loop"]["do"], Inputs, Params>;
  };
};

export type FormSchema<
  Render,
  Values extends FormValues,
  Inputs extends object,
  Params extends object
> = {
  form: {
    values: (inputs: Inputs) => {
      [K in keyof Values["form"]]: [Values["form"][K], PropertyKey[]];
    };
    render: (args: {
      inputs: Inputs;
      values: Values["form"];
      params: Params;
      onNext: OnNext;
      onBack: OnBack;
      getFlow: GetFlow;
      setFlow: SetFlow;
    }) => Render;
  };
};

export type YieldSchema<Values extends YieldValues, Inputs extends object> = {
  yield: (inputs: Inputs) => Values["yield"];
};

export type ReturnSchema<Values extends ReturnValues, Inputs extends object> = {
  return: (inputs: Inputs) => Values["return"];
};

export type VariablesSchema<
  Values extends VariablesValues,
  Inputs extends object
> = {
  variables: (inputs: Inputs) => Values["variables"];
};

type Merge<T extends object, U extends object> = Omit<T, keyof U> & U;

type ItemOutput<Values extends ItemValues> = Values extends FormValues
  ? FormOutput<Values>
  : Values extends VariablesValues
  ? VariablesOutput<Values>
  : object;

type FormOutput<Values extends FormValues> = Values["form"];
type VariablesOutput<Values extends VariablesValues> = Values["variables"];
