import type { Definition } from "../definition";

import type {
  ItemSchema,
  NestSchema,
  ListSchema,
  ConditionSchema,
  LoopSchema,
  SwitchSchema,
  FormSchema,
  YieldSchema,
  ReturnSchema,
  VariablesSchema,
  JumpSchema,
} from "../schema";

import type { OnNext, OnBack, GetState, SetState } from "../form-actions";

/**
 * Defines the structure and behavior of a multi-step form.
 *
 * @template T An object type extending `Definition` with the following properties:
 * - `render` - the type of the rendered output for each form step.
 * - `schema` — the structure of the multi-step form, including the values handled in each phase.
 * - `inputs` — additional values available across all steps of the multi-step form.
 * - `params` — values accessible when rendering each form step.
 */
export type Flow<T extends Definition> = ListFlow<
  T["render"],
  T["schema"],
  T["inputs"],
  T["inputs"],
  T["params"]
>;

export type ItemFlow<
  Render,
  Schema extends ItemSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Schema extends NestSchema
  ? NestFlow<Render, Schema, Inputs, Memory, Params>
  : Schema extends FormSchema
  ? FormFlow<Render, Schema, Memory, Params>
  : Schema extends VariablesSchema
  ? VariablesFlow<Schema, Memory>
  : Schema extends YieldSchema
  ? YieldFlow<Schema, Memory>
  : Schema extends ReturnSchema
  ? ReturnFlow<Schema, Memory>
  : never;

export type NestFlow<
  Render,
  Schema extends ItemSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Schema extends ListSchema
  ? ListFlow<Render, Schema, Inputs, Memory, Params>
  : Schema extends ConditionSchema
  ? ConditionFlow<Render, Schema, Inputs, Memory, Params>
  : Schema extends LoopSchema
  ? LoopFlow<Render, Schema, Inputs, Memory, Params>
  : Schema extends SwitchSchema
  ? SwitchFlow<Render, Schema, Inputs, Memory, Params>
  : Schema extends JumpSchema
  ? JumpFlow<Render, Schema, Inputs, Params>
  : never;

export type ListFlow<
  Render,
  Schema extends ListSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Schema extends [infer Head, ...infer Others]
  ? Head extends ItemSchema
    ? Others extends ListSchema
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
  Schema extends ConditionSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  condition: {
    if: (inputs: Memory) => boolean;
    then: ListFlow<Render, Schema["condition"]["then"], Inputs, Memory, Params>;
    else: ListFlow<Render, Schema["condition"]["else"], Inputs, Memory, Params>;
  };
};

export type LoopFlow<
  Render,
  Schema extends LoopSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  loop: {
    while: (inputs: Memory) => boolean;
    do: ListFlow<Render, Schema["loop"]["do"], Inputs, Memory, Params>;
  };
};

export type SwitchFlow<
  Render,
  Schema extends SwitchSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  switch: {
    branches: SwitchBranchesFlow<
      Render,
      Schema["switch"]["branches"],
      Inputs,
      Memory,
      Params
    >;
    default: ListFlow<
      Render,
      Schema["switch"]["default"],
      Inputs,
      Memory,
      Params
    >;
  };
};

type SwitchBranchesFlow<
  Render,
  Schema extends ListSchema[],
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = Schema extends [infer Head, ...infer Others]
  ? Head extends ListSchema
    ? Others extends ListSchema[]
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
  Schema extends JumpSchema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  jump: {
    id: string;
    at: FormFlow<Render, Schema["jump"]["at"], Inputs, Params>;
  };
};

export type FormFlow<
  Render,
  Schema extends FormSchema,
  Memory extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = {
  form: {
    values: (inputs: Memory) => {
      [K in keyof Schema["form"]["values"]]: [
        Schema["form"]["values"][K],
        PropertyKey[],
      ];
    };
    render: (args: {
      inputs: Memory;
      values: Schema["form"]["values"];
      params: Params;
      onNext: OnNext<Schema["form"]["values"]>;
      onBack: OnBack<Schema["form"]["values"]>;
      getState: GetState<Schema["form"]["values"]>;
      setState: SetState;
    }) => Render;
  };
};

export type VariablesFlow<
  Schema extends VariablesSchema,
  Memory extends Record<string, unknown>,
> = {
  variables: (inputs: Memory) => Schema["variables"];
};

export type YieldFlow<
  Schema extends YieldSchema,
  Memory extends Record<string, unknown>,
> = {
  yield: {
    next: (inputs: Memory) => Schema["yield"]["next"];
    back: (inputs: Memory) => Schema["yield"]["back"];
  };
};

export type ReturnFlow<
  Schema extends ReturnSchema,
  Memory extends Record<string, unknown>,
> = {
  return: (inputs: Memory) => Schema["return"];
};

type Output<
  Schema extends ItemSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = Schema extends FormSchema
  ? FormOutput<Schema, Memory>
  : Schema extends VariablesSchema
  ? VariablesOutput<Schema, Memory>
  : Schema extends ListSchema
  ? ListOutput<Schema, Inputs, Memory>
  : Schema extends ConditionSchema
  ? ConditionOutput<Schema, Inputs, Memory>
  : Schema extends LoopSchema
  ? LoopOutput<Schema, Inputs, Memory>
  : Schema extends SwitchSchema
  ? SwitchOutput<Schema, Inputs, Memory>
  : Schema extends JumpSchema
  ? JumpOutput<Schema, Inputs>
  : Memory;

type FormOutput<
  Schema extends FormSchema,
  Memory extends Record<string, unknown>,
> = Join<Schema["form"]["values"], Memory>;

type VariablesOutput<
  Schema extends VariablesSchema,
  Memory extends Record<string, unknown>,
> = Join<Schema["variables"], Memory>;

type ListOutput<
  Schema extends ListSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = ListContainsJump<Schema> extends true ? Inputs : Memory;

type ConditionOutput<
  Schema extends ConditionSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = BranchesContainsJump<
  [Schema["condition"]["then"], Schema["condition"]["else"]]
> extends true
  ? Inputs
  : Memory;

type LoopOutput<
  Schema extends LoopSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = ListContainsJump<Schema["loop"]["do"]> extends true ? Inputs : Memory;

type SwitchOutput<
  Schema extends SwitchSchema,
  Inputs extends Record<string, unknown>,
  Memory extends Record<string, unknown>,
> = BranchesContainsJump<
  [...Schema["switch"]["branches"], Schema["switch"]["default"]]
> extends true
  ? Inputs
  : Memory;

type JumpOutput<
  Schema extends JumpSchema,
  Inputs extends Record<string, unknown>,
> = Output<Schema["jump"]["at"], Inputs, Inputs>;

type BranchesContainsJump<Series extends ListSchema[]> = Series extends [
  infer Head,
  ...infer Others,
]
  ? Head extends ListSchema
    ? Others extends ListSchema[]
      ? ListContainsJump<Head> extends true
        ? true
        : BranchesContainsJump<Others>
      : never
    : never
  : false;

type ListContainsJump<Schema extends ListSchema> = Schema extends [
  infer Head,
  ...infer Others,
]
  ? Head extends ItemSchema
    ? Others extends ListSchema
      ? Head extends JumpSchema
        ? true
        : ListContainsJump<Others>
      : never
    : never
  : false;

type Join<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
> = Omit<T, keyof U> & U;
