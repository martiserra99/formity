import type { Schema, ModuleSchema } from "../schema";

import type {
  ItemStruct,
  FormStruct,
  VariablesStruct,
  YieldStruct,
  ReturnStruct,
  NestStruct,
  ListStruct,
  ConditionStruct,
  LoopStruct,
  SwitchStruct,
  JumpStruct,
  ModuleStruct,
} from "../struct";

import type { Next, Back, Jump, GetState, SetState } from "../form-controls";

/**
 * Defines the structure and behavior of a multi-step form.
 *
 * @template T An object type extending `Schema` with the following properties:
 * - `render` - the type of the rendered output for each form step.
 * - `struct` — the structure of the multi-step form, including the values handled in each phase.
 * - `inputs` — values that have been provided with the `inputs` prop.
 * - `params` — values accessible when rendering each form step.
 */
export type Flow<T extends Schema> = ListData<
  T["render"],
  T["struct"],
  T["inputs"],
  T["inputs"],
  T["params"]
> extends [infer Result, ...unknown[]]
  ? Result
  : never;

/**
 * Defines the structure and behavior of a multi-step form module.
 *
 * @template T An object type extending `ModuleSchema` with the following properties:
 * - `render` - the type of the rendered output for each form step.
 * - `struct` — the structure of the module, including the values handled in each phase.
 * - `inputs` — values that have been provided with the `inputs` prop.
 * - `values` — values collected throughout the flow.
 * - `params` — values accessible when rendering each form step.
 */
export type Module<T extends ModuleSchema> = ListData<
  T["render"],
  T["struct"],
  T["inputs"],
  T["values"],
  T["params"]
> extends [infer Result, ...unknown[]]
  ? Result
  : never;

type ItemData<
  Render,
  Struct extends ItemStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = Struct extends FormStruct
  ? FormData<Render, Struct, Values, Params, JumpAt>
  : Struct extends VariablesStruct
  ? VariablesData<Struct, Values, JumpAt>
  : Struct extends YieldStruct
  ? YieldData<Struct, Values, JumpAt>
  : Struct extends ReturnStruct
  ? ReturnData<Struct, Values, JumpAt>
  : Struct extends NestStruct
  ? NestData<Render, Struct, Inputs, Values, Params, JumpAt>
  : never;

type FormData<
  Render,
  Struct extends FormStruct,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = [
  {
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
        next: Next<Struct["form"]["fields"]>;
        back: Back<Struct["form"]["fields"]>;
        jump: Jump<Struct["form"]["fields"]>;
        getState: GetState<Struct["form"]["fields"]>;
        setState: SetState;
      }) => Render;
    };
  },
  Join<Values, Struct["form"]["fields"]>,
  JumpAt,
];

type VariablesData<
  Struct extends VariablesStruct,
  Values extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = [
  {
    variables: (values: Values) => Struct["variables"];
  },
  Join<Values, Struct["variables"]>,
  JumpAt,
];

type YieldData<
  Struct extends YieldStruct,
  Values extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = [
  {
    yield: {
      next: (values: Values) => Struct["yield"]["next"];
      back: (values: Values) => Struct["yield"]["back"];
    };
  },
  Values,
  JumpAt,
];

type ReturnData<
  Struct extends ReturnStruct,
  Values extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = [
  {
    return: (values: Values) => Struct["return"];
  },
  Values,
  JumpAt,
];

type NestData<
  Render,
  Struct extends NestStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = Struct extends ListStruct
  ? ListData<Render, Struct, Inputs, Values, Params, JumpAt>
  : Struct extends ConditionStruct
  ? ConditionData<Render, Struct, Inputs, Values, Params, JumpAt>
  : Struct extends LoopStruct
  ? LoopData<Render, Struct, Inputs, Values, Params, JumpAt>
  : Struct extends SwitchStruct
  ? SwitchData<Render, Struct, Inputs, Values, Params, JumpAt>
  : Struct extends JumpStruct
  ? JumpData<Render, Struct, Inputs, Params>
  : Struct extends ModuleStruct
  ? ModuleData<Render, Struct, Inputs, Values, Params, JumpAt>
  : never;

type ListData<
  Render,
  Struct extends ListStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = Struct extends [infer Leader, ...infer Remain]
  ? Leader extends ItemStruct
    ? Remain extends ListStruct
      ? ItemData<Render, Leader, Inputs, Values, Params, JumpAt> extends [
          infer Leader,
          infer Values,
          infer JumpAt,
        ]
        ? Values extends Record<string, unknown>
          ? JumpAt extends boolean
            ? ListData<Render, Remain, Inputs, Values, Params, JumpAt> extends [
                infer Remain,
                infer Values,
                infer JumpAt,
              ]
              ? Remain extends unknown[]
                ? [[Leader, ...Remain], Values, JumpAt]
                : never
              : never
            : never
          : never
        : never
      : never
    : never
  : [[], Values, JumpAt];

type ConditionData<
  Render,
  Struct extends ConditionStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = ListData<
  Render,
  Struct["condition"]["then"],
  Inputs,
  Values,
  Params
> extends [infer Then, unknown, infer JumpIn]
  ? JumpIn extends boolean
    ? ListData<
        Render,
        Struct["condition"]["else"],
        Inputs,
        Values,
        Params,
        JumpIn
      > extends [infer Else, unknown, infer JumpIn]
      ? [
          {
            condition: {
              if: (values: Values) => boolean;
              then: Then;
              else: Else;
            };
          },
          JumpIn extends true ? Inputs : Values,
          JumpIn extends true ? true : JumpAt,
        ]
      : never
    : never
  : never;

type LoopData<
  Render,
  Struct extends LoopStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = ListData<Render, Struct["loop"]["do"], Inputs, Values, Params> extends [
  infer Result,
  unknown,
  infer JumpIn,
]
  ? [
      {
        loop: {
          while: (values: Values) => boolean;
          do: Result;
        };
      },
      JumpIn extends true ? Inputs : Values,
      JumpIn extends true ? true : JumpAt,
    ]
  : never;

type SwitchData<
  Render,
  Struct extends SwitchStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = SwitchBranchesData<
  Render,
  Struct["switch"]["branches"],
  Inputs,
  Values,
  Params
> extends [infer Branches, infer JumpIn]
  ? JumpIn extends boolean
    ? ListData<
        Render,
        Struct["switch"]["default"],
        Inputs,
        Values,
        Params,
        JumpIn
      > extends [infer Default, unknown, infer JumpIn]
      ? [
          {
            switch: {
              branches: Branches;
              default: Default;
            };
          },
          JumpIn extends true ? Inputs : Values,
          JumpIn extends true ? true : JumpAt,
        ]
      : never
    : never
  : never;

type SwitchBranchesData<
  Render,
  Struct extends ListStruct[],
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = Struct extends [infer Leader, ...infer Remain]
  ? Leader extends ListStruct
    ? Remain extends ListStruct[]
      ? ListData<Render, Leader, Inputs, Values, Params, JumpAt> extends [
          infer Leader,
          unknown,
          infer JumpAt,
        ]
        ? JumpAt extends boolean
          ? SwitchBranchesData<
              Render,
              Remain,
              Inputs,
              Values,
              Params,
              JumpAt
            > extends [infer Remain, infer JumpAt]
            ? Remain extends unknown[]
              ? [
                  [
                    {
                      case: (values: Values) => boolean;
                      then: Leader;
                    },
                    ...Remain,
                  ],
                  JumpAt,
                ]
              : never
            : never
          : never
        : never
      : never
    : never
  : [[], JumpAt];

type JumpData<
  Render,
  Struct extends JumpStruct,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> = FormData<Render, Struct["jump"]["at"], Inputs, Params, true> extends [
  infer Result,
  infer Values,
  infer JumpAt,
]
  ? [
      {
        jump: {
          id: unknown;
          at: Result;
        };
      },
      Values,
      JumpAt,
    ]
  : never;

type ModuleData<
  Render,
  Struct extends ModuleStruct,
  Inputs extends Record<string, unknown>,
  Values extends Record<string, unknown>,
  Params extends Record<string, unknown>,
  JumpAt extends boolean = false,
> = Struct["module"]["render"] extends Render
  ? Inputs extends Struct["module"]["inputs"]
    ? Values extends Struct["module"]["values"]
      ? Params extends Struct["module"]["params"]
        ? ListData<
            Struct["module"]["render"],
            Struct["module"]["struct"],
            Struct["module"]["inputs"],
            Struct["module"]["values"],
            Struct["module"]["params"]
          > extends [infer Result, infer Locals, infer JumpIn]
          ? Locals extends Record<string, unknown>
            ? JumpIn extends true
              ? [{ module: Result }, Locals, JumpIn]
              : [{ module: Result }, Join<Values, Locals>, JumpAt]
            : never
          : never
        : [{ module: never }, Values, JumpAt]
      : [{ module: never }, Values, JumpAt]
    : [{ module: never }, Values, JumpAt]
  : [{ module: never }, Values, JumpAt];

type Join<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
> = Omit<T, keyof U> & U;
