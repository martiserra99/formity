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
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Struct extends NestStruct
  ? NestFlow<Render, Struct, Inputs, Memory, Params>
  : Struct extends FormStruct
  ? FormFlow<Render, Struct, Memory, Params>
  : Struct extends VariablesStruct
  ? VariablesFlow<Struct, Memory>
  : Struct extends YieldStruct
  ? YieldFlow<Struct, Memory>
  : Struct extends ReturnStruct
  ? ReturnFlow<Struct, Memory>
  : never;

export type NestFlow<
  Render,
  Struct extends ItemStruct,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Struct extends ListStruct
  ? ListFlow<Render, Struct, Inputs, Memory, Params>
  : Struct extends ConditionStruct
  ? ConditionFlow<Render, Struct, Inputs, Memory, Params>
  : Struct extends LoopStruct
  ? LoopFlow<Render, Struct, Inputs, Memory, Params>
  : Struct extends SwitchStruct
  ? SwitchFlow<Render, Struct, Inputs, Memory, Params>
  : Struct extends JumpStruct
  ? JumpFlow<Render, Struct, Inputs, Params>
  : never;

export type ListFlow<
  Render,
  Struct extends ListStruct,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Struct extends [infer Head, ...infer Others]
  ? Head extends ItemStruct
    ? Others extends ListStruct
      ? [
          ItemFlow<Render, Head, Inputs, Memory, Params>,
          ...ListFlow<
            Render,
            Others,
            Inputs,
            Output<Head, Inputs, Memory>,
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
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  condition: {
    if: (inputs: Memory) => boolean;
    then: ListFlow<Render, Struct["condition"]["then"], Inputs, Memory, Params>;
    else: ListFlow<Render, Struct["condition"]["else"], Inputs, Memory, Params>;
  };
};

export type LoopFlow<
  Render,
  Struct extends LoopStruct,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  loop: {
    while: (inputs: Memory) => boolean;
    do: ListFlow<Render, Struct["loop"]["do"], Inputs, Memory, Params>;
  };
};

export type SwitchFlow<
  Render,
  Struct extends SwitchStruct,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  switch: {
    branches: SwitchBranchesFlow<
      Render,
      Struct["switch"]["branches"],
      Inputs,
      Memory,
      Params
    >;
    default: ListFlow<
      Render,
      Struct["switch"]["default"],
      Inputs,
      Memory,
      Params
    >;
  };
};

type SwitchBranchesFlow<
  Render,
  Struct extends ListStruct[],
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Struct extends [infer Head, ...infer Others]
  ? Head extends ListStruct
    ? Others extends ListStruct[]
      ? [
          {
            case: (inputs: Memory) => boolean;
            then: ListFlow<Render, Head, Inputs, Memory, Params>;
          },
          ...SwitchBranchesFlow<Render, Others, Inputs, Memory, Params>,
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
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  form: {
    values: (inputs: Memory) => {
      [K in keyof Struct["form"]["values"]]: [
        Struct["form"]["values"][K],
        PropertyKey[],
      ];
    };
    render: (args: {
      inputs: Memory;
      values: Struct["form"]["values"];
      params: Params;
      onNext: OnNext<Struct["form"]["values"]>;
      onBack: OnBack<Struct["form"]["values"]>;
      onJump: OnJump<Struct["form"]["values"]>;
      getState: GetState<Struct["form"]["values"]>;
      setState: SetState;
    }) => Render;
  };
};

export type VariablesFlow<
  Struct extends VariablesStruct,
  Memory extends Record<string, unknown>,
> = {
  variables: (inputs: Memory) => Struct["variables"];
};

export type YieldFlow<
  Struct extends YieldStruct,
  Memory extends Record<string, unknown>,
> = {
  yield: {
    next: (inputs: Memory) => Struct["yield"]["next"];
    back: (inputs: Memory) => Struct["yield"]["back"];
  };
};

export type ReturnFlow<
  Struct extends ReturnStruct,
  Memory extends Record<string, unknown>,
> = {
  return: (inputs: Memory) => Struct["return"];
};

type Output<
  Struct extends ItemStruct,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = Struct extends FormStruct
  ? FormOutput<Struct, Memory>
  : Struct extends VariablesStruct
  ? VariablesOutput<Struct, Memory>
  : Struct extends ListStruct
  ? ListOutput<Struct, Inputs, Memory>
  : Struct extends ConditionStruct
  ? ConditionOutput<Struct, Inputs, Memory>
  : Struct extends LoopStruct
  ? LoopOutput<Struct, Inputs, Memory>
  : Struct extends SwitchStruct
  ? SwitchOutput<Struct, Inputs, Memory>
  : Struct extends JumpStruct
  ? JumpOutput<Struct, Inputs>
  : Memory;

type FormOutput<
  Struct extends FormStruct,
  Memory extends Record<string, unknown>,
> = Join<Struct["form"]["values"], Memory>;

type VariablesOutput<
  Struct extends VariablesStruct,
  Memory extends Record<string, unknown>,
> = Join<Struct["variables"], Memory>;

type ListOutput<
  Struct extends ListStruct,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = ListContainsJump<Struct> extends true ? Inputs : Memory;

type ConditionOutput<
  Struct extends ConditionStruct,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = BranchesContainsJump<
  [Struct["condition"]["then"], Struct["condition"]["else"]]
> extends true
  ? Inputs
  : Memory;

type LoopOutput<
  Struct extends LoopStruct,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = ListContainsJump<Struct["loop"]["do"]> extends true ? Inputs : Memory;

type SwitchOutput<
  Struct extends SwitchStruct,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = BranchesContainsJump<
  [...Struct["switch"]["branches"], Struct["switch"]["default"]]
> extends true
  ? Inputs
  : Memory;

type JumpOutput<
  Struct extends JumpStruct,
  Inputs extends Record<string, unknown>,
> = Output<Struct["jump"]["at"], Inputs, Inputs>;

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
