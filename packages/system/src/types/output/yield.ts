import type { Schema } from "../schema";

import type {
  ItemStruct,
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

/**
 * Returns the union of all possible values that can be yielded by a multi-step form.
 */
export type YieldOutput<T extends Schema> = ListData<
  T["struct"],
  never,
  false
> extends [infer U, boolean]
  ? U
  : never;

type ItemData<Item extends ItemStruct, Data, Flag> = Item extends YieldStruct
  ? YieldData<Item, Data, Flag>
  : Item extends ReturnStruct
  ? ReturnData<Data>
  : Item extends NestStruct
  ? NestData<Item, Data, Flag>
  : [Data, Flag];

type YieldData<Yield extends YieldStruct, Data, Flag> = Flag extends false
  ? [
      Data | Yield["yield"]["next"][number] | Yield["yield"]["back"][number],
      Flag,
    ]
  : [Data, Flag];

type ReturnData<Data> = [Data, true];

type NestData<Nest extends NestStruct, Data, Flag> = Nest extends ListStruct
  ? ListData<Nest, Data, Flag>
  : Nest extends ConditionStruct
  ? ConditionData<Nest, Data, Flag>
  : Nest extends LoopStruct
  ? LoopData<Nest, Data, Flag>
  : Nest extends SwitchStruct
  ? SwitchData<Nest, Data, Flag>
  : Nest extends JumpStruct
  ? JumpData<Nest, Data>
  : Nest extends ModuleStruct
  ? ModuleData<Nest, Data, Flag>
  : never;

type ListData<List extends ListStruct, Data, Flag> = List extends [
  infer Item,
  ...infer Rest,
]
  ? Item extends ItemStruct
    ? Rest extends ListStruct
      ? ItemData<Item, Data, Flag> extends [infer NextData, infer NextFlag]
        ? ListData<Rest, NextData, NextFlag>
        : never
      : never
    : never
  : [Data, Flag];

type ConditionData<
  Condition extends ConditionStruct,
  Data,
  Flag,
> = BranchesData<
  [Condition["condition"]["then"], Condition["condition"]["else"]],
  Data,
  Flag
>;

type LoopData<Loop extends LoopStruct, Data, Flag> = ListData<
  Loop["loop"]["do"],
  Data,
  Flag
> extends [infer NextData, boolean]
  ? [NextData, Flag]
  : never;

type SwitchData<Switch extends SwitchStruct, Data, Flag> = BranchesData<
  [...Switch["switch"]["branches"], Switch["switch"]["default"]],
  Data,
  Flag
>;

type JumpData<Jump extends JumpStruct, Data> = ListData<
  Jump["jump"]["at"],
  Data,
  false
>;

type ModuleData<Module extends ModuleStruct, Data, Flag> = ListData<
  Module["module"]["struct"],
  Data,
  Flag
>;

type BranchesData<
  List extends ListStruct[],
  Data,
  Flag,
  Mark = true,
> = List extends [infer Item, ...infer Rest]
  ? Item extends ListStruct
    ? Rest extends ListStruct[]
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
