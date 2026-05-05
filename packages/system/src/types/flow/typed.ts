import type { Schema } from "../schema";

import type {
  ItemStruct,
  NestStruct,
  ListStruct,
  ConditionStruct,
  LoopStruct,
  SwitchStruct,
  FormStruct,
  YieldStruct,
  ReturnStruct,
  VariablesStruct,
  JumpStruct,
} from "../struct";

import type {
  OnNext,
  OnBack,
  OnJump,
  GetState,
  SetState,
} from "../form-controls";

/**
 * Defines the structure and behavior of a multi-step form.
 *
 * @template T An object type extending `Schema` with the following properties:
 * - `render` - the type of the rendered output for each form step.
 * - `struct` — the structure of the multi-step form, including the values handled in each phase.
 * - `inputs` — additional values available across all steps of the multi-step form.
 * - `params` — values accessible when rendering each form step.
 */
export type Flow<T extends Schema> = ListFlow<
  T["render"],
  T["struct"],
  T["inputs"],
  T["inputs"],
  T["params"]
>;

export type ItemFlow<
  Render,
  Struct extends ItemStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Struct extends NestStruct
  ? NestFlow<Render, Struct, Inputs, Values, Params>
  : Struct extends FormStruct
  ? FormFlow<Render, Struct, Values, Params>
  : Struct extends VariablesStruct
  ? VariablesFlow<Struct, Values>
  : Struct extends YieldStruct
  ? YieldFlow<Struct, Values>
  : Struct extends ReturnStruct
  ? ReturnFlow<Struct, Values>
  : never;

export type NestFlow<
  Render,
  Struct extends ItemStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Struct extends ListStruct
  ? ListFlow<Render, Struct, Inputs, Values, Params>
  : Struct extends ConditionStruct
  ? ConditionFlow<Render, Struct, Inputs, Values, Params>
  : Struct extends LoopStruct
  ? LoopFlow<Render, Struct, Inputs, Values, Params>
  : Struct extends SwitchStruct
  ? SwitchFlow<Render, Struct, Inputs, Values, Params>
  : Struct extends JumpStruct
  ? JumpFlow<Render, Struct, Inputs, Params>
  : never;

export type ListFlow<
  Render,
  Struct extends ListStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Struct extends [infer Head, ...infer Others]
  ? Head extends ItemStruct
    ? Others extends ListStruct
      ? [
          ItemFlow<Render, Head, Inputs, Values, Params>,
          ...ListFlow<
            Render,
            Others,
            Inputs,
            Output<Head, Inputs, Values>,
            Params
          >,
        ]
      : never
    : never
  : [];

export type ConditionFlow<
  Render,
  Struct extends ConditionStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  condition: {
    if: (values: Values) => boolean;
    then: ListFlow<Render, Struct["condition"]["then"], Inputs, Values, Params>;
    else: ListFlow<Render, Struct["condition"]["else"], Inputs, Values, Params>;
  };
};

export type LoopFlow<
  Render,
  Struct extends LoopStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  loop: {
    while: (values: Values) => boolean;
    do: ListFlow<Render, Struct["loop"]["do"], Inputs, Values, Params>;
  };
};

export type SwitchFlow<
  Render,
  Struct extends SwitchStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  switch: {
    branches: SwitchBranchesFlow<
      Render,
      Struct["switch"]["branches"],
      Inputs,
      Values,
      Params
    >;
    default: ListFlow<
      Render,
      Struct["switch"]["default"],
      Inputs,
      Values,
      Params
    >;
  };
};

type SwitchBranchesFlow<
  Render,
  Struct extends ListStruct[],
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Struct extends [infer Head, ...infer Others]
  ? Head extends ListStruct
    ? Others extends ListStruct[]
      ? [
          {
            case: (values: Values) => boolean;
            then: ListFlow<Render, Head, Inputs, Values, Params>;
          },
          ...SwitchBranchesFlow<Render, Others, Inputs, Values, Params>,
        ]
      : never
    : never
  : [];

export type JumpFlow<
  Render,
  Struct extends JumpStruct,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  jump: {
    id: string;
    at: FormFlow<Render, Struct["jump"]["at"], Inputs, Params>;
  };
};

export type FormFlow<
  Render,
  Struct extends FormStruct,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  form: {
    fields: (values: Values) => {
      [K in keyof Struct["form"]["fields"]]: [
        Struct["form"]["fields"][K],
        PropertyKey[],
      ];
    };
    render: (args: {
      fields: Struct["form"]["fields"];
      values: Values;
      params: Params;
      onNext: OnNext<Struct["form"]["fields"]>;
      onBack: OnBack<Struct["form"]["fields"]>;
      onJump: OnJump<Struct["form"]["fields"]>;
      getState: GetState<Struct["form"]["fields"]>;
      setState: SetState;
    }) => Render;
  };
};

export type VariablesFlow<
  Struct extends VariablesStruct,
  Values extends Record<string, unknown>,
> = {
  variables: (values: Values) => Struct["variables"];
};

export type YieldFlow<
  Struct extends YieldStruct,
  Values extends Record<string, unknown>,
> = {
  yield: {
    next: (values: Values) => Struct["yield"]["next"];
    back: (values: Values) => Struct["yield"]["back"];
  };
};

export type ReturnFlow<
  Struct extends ReturnStruct,
  Values extends Record<string, unknown>,
> = {
  return: (values: Values) => Struct["return"];
};

type Output<
  Struct extends ItemStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
> = Struct extends FormStruct
  ? FormOutput<Struct, Values>
  : Struct extends VariablesStruct
  ? VariablesOutput<Struct, Values>
  : Struct extends ListStruct
  ? ListOutput<Struct, Inputs, Values>
  : Struct extends ConditionStruct
  ? ConditionOutput<Struct, Inputs, Values>
  : Struct extends LoopStruct
  ? LoopOutput<Struct, Inputs, Values>
  : Struct extends SwitchStruct
  ? SwitchOutput<Struct, Inputs, Values>
  : Struct extends JumpStruct
  ? JumpOutput<Struct, Inputs>
  : Values;

type FormOutput<
  Struct extends FormStruct,
  Values extends Record<string, unknown>,
> = Join<Struct["form"]["fields"], Values>;

type VariablesOutput<
  Struct extends VariablesStruct,
  Values extends Record<string, unknown>,
> = Join<Struct["variables"], Values>;

type ListOutput<
  Struct extends ListStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
> = ListContainsJump<Struct> extends true ? Inputs : Values;

type ConditionOutput<
  Struct extends ConditionStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
> = BranchesContainsJump<
  [Struct["condition"]["then"], Struct["condition"]["else"]]
> extends true
  ? Inputs
  : Values;

type LoopOutput<
  Struct extends LoopStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
> = ListContainsJump<Struct["loop"]["do"]> extends true ? Inputs : Values;

type SwitchOutput<
  Struct extends SwitchStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
> = BranchesContainsJump<
  [...Struct["switch"]["branches"], Struct["switch"]["default"]]
> extends true
  ? Inputs
  : Values;

type JumpOutput<
  Struct extends JumpStruct,
  Inputs extends Record<string, unknown>,
> = FormOutput<Struct["jump"]["at"], Inputs>;

type BranchesContainsJump<Series extends ListStruct[]> = Series extends [
  infer Head,
  ...infer Others,
]
  ? Head extends ListStruct
    ? Others extends ListStruct[]
      ? ListContainsJump<Head> extends true
        ? true
        : BranchesContainsJump<Others>
      : never
    : never
  : false;

type ListContainsJump<Struct extends ListStruct> = Struct extends [
  infer Head,
  ...infer Others,
]
  ? Head extends ItemStruct
    ? Others extends ListStruct
      ? Head extends JumpStruct
        ? true
        : ListContainsJump<Others>
      : never
    : never
  : false;

type Join<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
> = Omit<T, keyof U> & U;
