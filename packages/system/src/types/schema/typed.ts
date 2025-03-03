import type { Values } from "../values";

import type {
  ItemValues,
  FlowValues,
  ListValues,
  CondValues,
  LoopValues,
  SwitchValues,
  FormValues,
  YieldValues,
  ReturnValues,
  VariablesValues,
} from "../values";

import type { OnNext, OnBack, GetState, SetState } from "../controls";

/**
 * Defines the structure and behavior of a multi-step form.
 *
 * @template R The type of the rendered output for each form step. This can vary depending on
 * the framework; for example, in React, it would typically be `ReactNode`.
 *
 * @template V A type extending `Values` that defines the structure of the multi-step form,
 * including the values handled in each phase.
 *
 * @template I An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 *
 * @template P An object type defining the values accessible when rendering each form step in
 * the multi-step process.
 */
export type Schema<
  R,
  V extends Values,
  I extends object = object,
  P extends object = object
> = ListSchema<R, V, I, P>;

/**
 * Defines the structure and behavior of any element in a multi-step form.
 *
 * @template Render The type of the rendered output for each form step. This can vary depending on
 * the framework; for example, in React, it would typically be `ReactNode`.
 *
 * @template Values A type extending `ItemValues` that defines the structure of the multi-step form,
 * including the values handled in each phase.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 *
 * @template Params An object type defining the values accessible when rendering each form step in
 * the multi-step process.
 */
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

/**
 * Defines the structure and behavior of any flow element in a multi-step form.
 *
 * @template Render The type of the rendered output for each form step. This can vary depending on
 * the framework; for example, in React, it would typically be `ReactNode`.
 *
 * @template Values A type extending `FlowValues` that defines the structure of the multi-step form,
 * including the values handled in each phase.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 *
 * @template Params An object type defining the values accessible when rendering each form step in
 * the multi-step process.
 */
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
  : Values extends SwitchValues
  ? SwitchSchema<Render, Values, Inputs, Params>
  : never;

/**
 * Defines the structure and behavior of a list element in a multi-step form.
 *
 * @template Render The type of the rendered output for each form step. This can vary depending on
 * the framework; for example, in React, it would typically be `ReactNode`.
 *
 * @template Values A type extending `ListValues` that defines the structure of the multi-step form,
 * including the values handled in each phase.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 *
 * @template Params An object type defining the values accessible when rendering each form step in
 * the multi-step process.
 */
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
          ...ListSchema<Render, Other, Join<Inputs, ItemOutput<First>>, Params>
        ]
      : never
    : never
  : [];

/**
 * Defines the structure and behavior of a condition element in a multi-step form.
 *
 * @template Render The type of the rendered output for each form step. This can vary depending on
 * the framework; for example, in React, it would typically be `ReactNode`.
 *
 * @template Values A type extending `CondValues` that defines the structure of the multi-step form,
 * including the values handled in each phase.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 *
 * @template Params An object type defining the values accessible when rendering each form step in
 * the multi-step process.
 */
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

/**
 * Defines the structure and behavior of a loop element in a multi-step form.
 *
 * @template Render The type of the rendered output for each form step. This can vary depending on
 * the framework; for example, in React, it would typically be `ReactNode`.
 *
 * @template Values A type extending `LoopValues` that defines the structure of the multi-step form,
 * including the values handled in each phase.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 *
 * @template Params An object type defining the values accessible when rendering each form step in
 * the multi-step process.
 */
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

/**
 * Defines the structure and behavior of a switch element in a multi-step form.
 *
 * @template Render The type of the rendered output for each form step. This can vary depending on
 * the framework; for example, in React, it would typically be `ReactNode`.
 *
 * @template Values A type extending `SwitchValues` that defines the structure of the multi-step
 * form, including the values handled in each phase.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 *
 * @template Params An object type defining the values accessible when rendering each form step in
 * the multi-step process.
 */
export type SwitchSchema<
  Render,
  Values extends SwitchValues,
  Inputs extends object,
  Params extends object
> = {
  switch: {
    branches: SwitchBranchesSchema<
      Render,
      Values["switch"]["branches"],
      Inputs,
      Params
    >;
    default: ListSchema<Render, Values["switch"]["default"], Inputs, Params>;
  };
};

type SwitchBranchesSchema<
  Render,
  Values extends ListValues[],
  Inputs extends object,
  Params extends object
> = Values extends [infer First, ...infer Other]
  ? First extends ListValues
    ? Other extends ListValues[]
      ? [
          {
            case: (inputs: Inputs) => boolean;
            then: ListSchema<Render, First, Inputs, Params>;
          },
          ...SwitchBranchesSchema<Render, Other, Inputs, Params>
        ]
      : never
    : never
  : [];

/**
 * Defines the structure and behavior of a form element in a multi-step form.
 *
 * @template Render The type of the rendered output for each form step. This can vary depending on
 * the framework; for example, in React, it would typically be `ReactNode`.
 *
 * @template Values A type extending `FormValues` that defines the values of the form element.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 *
 * @template Params An object type defining the values accessible when rendering each form step in
 * the multi-step process.
 */
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
      getState: GetState;
      setState: SetState;
    }) => Render;
  };
};

/**
 * Defines the structure and behavior of a yield element in a multi-step form.
 *
 * @template Values A type extending `YieldValues` that defines the values of the yield element.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 */
export type YieldSchema<Values extends YieldValues, Inputs extends object> = {
  yield: {
    next: (inputs: Inputs) => Values["yield"]["next"];
    back: (inputs: Inputs) => Values["yield"]["back"];
  };
};

/**
 * Defines the structure and behavior of a return element in a multi-step form.
 *
 * @template Values A type extending `ReturnValues` that defines the values of the return element.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 */
export type ReturnSchema<Values extends ReturnValues, Inputs extends object> = {
  return: (inputs: Inputs) => Values["return"];
};

/**
 * Defines the structure and behavior of a variables element in a multi-step form.
 *
 * @template Values A type extending `VariablesValues` that defines the values of the variables element.
 *
 * @template Inputs An object type representing additional values available during form execution,
 * beyond those generated by the multi-step form itself.
 */
export type VariablesSchema<
  Values extends VariablesValues,
  Inputs extends object
> = {
  variables: (inputs: Inputs) => Values["variables"];
};

type Join<T extends object, U extends object> = Omit<T, keyof U> & U;

type ItemOutput<Values extends ItemValues> = Values extends FormValues
  ? FormOutput<Values>
  : Values extends VariablesValues
  ? VariablesOutput<Values>
  : object;

type FormOutput<Values extends FormValues> = Values["form"];
type VariablesOutput<Values extends VariablesValues> = Values["variables"];
