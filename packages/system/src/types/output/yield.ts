import type { Values } from "../values";

import type {
  ItemValues,
  ListValues,
  CondValues,
  LoopValues,
  SwitchValues,
  YieldValues,
  ReturnValues,
} from "../values";

/**
 * Returns the union of all possible values that can be yielded by a multi-step form.
 */
export type YieldOutput<V extends Values> = ListData<V, never> extends [
  infer Next,
  unknown
]
  ? Next
  : never;

type ItemData<Values extends ItemValues, Data> = Values extends ListValues
  ? ListData<Values, Data>
  : Values extends CondValues
  ? CondData<Values, Data>
  : Values extends LoopValues
  ? LoopData<Values, Data>
  : Values extends SwitchValues
  ? SwitchData<Values, Data>
  : Values extends YieldValues
  ? YieldData<Values, Data>
  : Values extends ReturnValues
  ? [Data, true]
  : [Data, false];

type ListData<Values extends ListValues, Data> = Values extends [
  infer First,
  ...infer Other
]
  ? First extends ItemValues
    ? Other extends ListValues
      ? ItemData<First, Data> extends [infer Next, infer Return]
        ? Return extends true
          ? [Next, true]
          : ListData<Other, Next>
        : never
      : never
    : never
  : [Data, false];

type CondData<Values extends CondValues, Data> = RoutesData<
  [Values["cond"]["then"], Values["cond"]["else"]],
  Data
>;

type LoopData<Values extends LoopValues, Data> = ListData<
  Values["loop"]["do"],
  Data
> extends [infer Next, unknown]
  ? [Next, false]
  : never;

type SwitchData<Values extends SwitchValues, Data> = RoutesData<
  [...Values["switch"]["branches"], Values["switch"]["default"]],
  Data
>;

type YieldData<Values extends YieldValues, Data> = [
  Data | Values["yield"]["next"][number] | Values["yield"]["back"][number],
  false
];

type RoutesData<
  Values extends ListValues[],
  Data,
  RoutesReturn = true
> = Values extends [infer First, ...infer Other]
  ? First extends ListValues
    ? Other extends ListValues[]
      ? ListData<First, Data> extends [infer Next, infer Return]
        ? RoutesReturn extends false
          ? RoutesData<Other, Next, false>
          : RoutesData<Other, Next, Return>
        : never
      : never
    : never
  : [Data, RoutesReturn];
