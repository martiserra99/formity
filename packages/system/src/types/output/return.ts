import type { Values } from "../values";

import type {
  ItemValues,
  ListValues,
  CondValues,
  LoopValues,
  SwitchValues,
  ReturnValues,
} from "../values";

/**
 * Returns the union of all possible values that can be returned by a multi-step form.
 */
export type ReturnOutput<T extends Values> = ListData<T, never> extends [
  infer U,
  unknown,
]
  ? U
  : never;

type ItemData<T extends ItemValues, U> = T extends ListValues
  ? ListData<T, U>
  : T extends CondValues
  ? CondData<T, U>
  : T extends LoopValues
  ? LoopData<T, U>
  : T extends SwitchValues
  ? SwitchData<T, U>
  : T extends ReturnValues
  ? [U | T["return"], true]
  : [U, false];

type ListData<T extends ListValues, U> = T extends [infer V, ...infer W]
  ? V extends ItemValues
    ? W extends ListValues
      ? ItemData<V, U> extends [infer X, infer Y]
        ? Y extends true
          ? [X, true]
          : ListData<W, X>
        : never
      : never
    : never
  : [U, false];

type CondData<T extends CondValues, U> = BranchesData<
  [T["cond"]["then"], T["cond"]["else"]],
  U
>;

type LoopData<T extends LoopValues, U> = ListData<T["loop"]["do"], U> extends [
  infer V,
  unknown,
]
  ? [V, false]
  : never;

type SwitchData<T extends SwitchValues, U> = BranchesData<
  [...T["switch"]["branches"], T["switch"]["default"]],
  U
>;

type BranchesData<T extends ListValues[], U, V = true> = T extends [
  infer W,
  ...infer X,
]
  ? W extends ListValues
    ? X extends ListValues[]
      ? ListData<W, U> extends [infer Y, infer Z]
        ? V extends false
          ? BranchesData<X, Y, false>
          : BranchesData<X, Y, Z>
        : never
      : never
    : never
  : [U, V];
