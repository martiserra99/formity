import type { Schema } from "../schema";

import type {
  ItemSchema,
  ScopeSchema,
  ListSchema,
  ConditionSchema,
  LoopSchema,
  SwitchSchema,
  YieldSchema,
  ReturnSchema,
  JumpSchema,
} from "../schema";

/**
 * Returns the union of all possible values that can be yielded by a multi-step form.
 */
export type YieldOutput<T extends Schema> = ListData<T, never, false> extends [
  infer U,
  boolean,
]
  ? U
  : never;

type ItemData<Item extends ItemSchema, Data, Flag> = Item extends ScopeSchema
  ? ScopeData<Item, Data, Flag>
  : Item extends YieldSchema
  ? YieldData<Item, Data, Flag>
  : Item extends ReturnSchema
  ? ReturnData<Data>
  : [Data, Flag];

type ScopeData<Scope extends ScopeSchema, Data, Flag> = Scope extends ListSchema
  ? ListData<Scope, Data, Flag>
  : Scope extends ConditionSchema
  ? ConditionData<Scope, Data, Flag>
  : Scope extends LoopSchema
  ? LoopData<Scope, Data, Flag>
  : Scope extends SwitchSchema
  ? SwitchData<Scope, Data, Flag>
  : Scope extends JumpSchema
  ? JumpData<Scope, Data>
  : never;

type ListData<List extends ListSchema, Data, Flag> = List extends [
  infer Item,
  ...infer Rest,
]
  ? Item extends ItemSchema
    ? Rest extends ListSchema
      ? ItemData<Item, Data, Flag> extends [infer NextData, infer NextFlag]
        ? ListData<Rest, NextData, NextFlag>
        : never
      : never
    : never
  : [Data, Flag];

type ConditionData<
  Condition extends ConditionSchema,
  Data,
  Flag,
> = BranchesData<
  [Condition["condition"]["then"], Condition["condition"]["else"]],
  Data,
  Flag
>;

type LoopData<Loop extends LoopSchema, Data, Flag> = ListData<
  Loop["loop"]["do"],
  Data,
  Flag
> extends [infer NextData, boolean]
  ? [NextData, Flag]
  : never;

type SwitchData<Switch extends SwitchSchema, Data, Flag> = BranchesData<
  [...Switch["switch"]["branches"], Switch["switch"]["default"]],
  Data,
  Flag
>;

type JumpData<Jump extends JumpSchema, Data> = ItemData<
  Jump["item"],
  Data,
  false
>;

type BranchesData<
  List extends ListSchema[],
  Data,
  Flag,
  Mark = true,
> = List extends [infer Item, ...infer Rest]
  ? Item extends ListSchema
    ? Rest extends ListSchema[]
      ? ListData<Item, Data, Flag> extends [infer NextData, infer NextMark]
        ? Mark extends false
          ? BranchesData<Rest, NextData, Flag, Mark>
          : BranchesData<Rest, NextData, Flag, NextMark>
        : never
      : never
    : never
  : Mark extends true
  ? [Data, Mark]
  : [Data, Flag];

type YieldData<Yield extends YieldSchema, Data, Flag> = Flag extends false
  ? [
      Data | Yield["yield"]["next"][number] | Yield["yield"]["back"][number],
      Flag,
    ]
  : [Data, Flag];

type ReturnData<Data> = [Data, true];
