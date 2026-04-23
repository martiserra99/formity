import type { Schema } from "../schema";

import type {
  ItemSchema,
  ListSchema,
  ConditionSchema,
  LoopSchema,
  SwitchSchema,
  YieldSchema,
  ReturnSchema,
} from "../schema";

/**
 * Returns the union of all possible values that can be yielded by a multi-step form.
 */
export type YieldOutput<T extends Schema> = ListData<T, never> extends [
  infer U,
  unknown,
]
  ? U
  : never;

type ItemData<T extends ItemSchema, U> = T extends ListSchema
  ? ListData<T, U>
  : T extends ConditionSchema
  ? CondData<T, U>
  : T extends LoopSchema
  ? LoopData<T, U>
  : T extends SwitchSchema
  ? SwitchData<T, U>
  : T extends YieldSchema
  ? YieldData<T, U>
  : T extends ReturnSchema
  ? [U, true]
  : [U, false];

type ListData<T extends ListSchema, U> = T extends [infer V, ...infer W]
  ? V extends ItemSchema
    ? W extends ListSchema
      ? ItemData<V, U> extends [infer X, infer Y]
        ? Y extends true
          ? [X, true]
          : ListData<W, X>
        : never
      : never
    : never
  : [U, false];

type CondData<T extends ConditionSchema, U> = BranchesData<
  [T["cond"]["then"], T["cond"]["else"]],
  U
>;

type LoopData<T extends LoopSchema, U> = ListData<T["loop"]["do"], U> extends [
  infer V,
  unknown,
]
  ? [V, false]
  : never;

type SwitchData<T extends SwitchSchema, U> = BranchesData<
  [...T["switch"]["branches"], T["switch"]["default"]],
  U
>;

type YieldData<T extends YieldSchema, U> = [
  U | T["yield"]["next"][number] | T["yield"]["back"][number],
  false,
];

type BranchesData<T extends ListSchema[], U, V = true> = T extends [
  infer W,
  ...infer X,
]
  ? W extends ListSchema
    ? X extends ListSchema[]
      ? ListData<W, U> extends [infer Y, infer Z]
        ? V extends false
          ? BranchesData<X, Y, false>
          : BranchesData<X, Y, Z>
        : never
      : never
    : never
  : [U, V];
