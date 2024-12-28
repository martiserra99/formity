import {
  ItemValues,
  ListValues,
  CondValues,
  LoopValues,
  YieldValues,
  ReturnValues,
} from "../values";

export type Yield<Values extends ListValues> = ListData<Values, never> extends [
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
  : Values extends YieldValues
  ? [Data | Values["yield"], "F"]
  : Values extends ReturnValues
  ? [Data, "T"]
  : [Data, "F"];

type ListData<Values extends ListValues, Data> = Values extends [
  infer First,
  ...infer Other
]
  ? First extends ItemValues
    ? Other extends ListValues
      ? ItemData<First, Data> extends [infer Next, infer Return]
        ? Return extends "T"
          ? [Next, "T"]
          : ListData<Other, Next>
        : never
      : never
    : never
  : [Data, "F"];

type CondData<Values extends CondValues, Data> = ListData<
  Values["cond"]["then"],
  Data
> extends [infer ThenNext, infer ThenReturn]
  ? ListData<Values["cond"]["else"], Data> extends [
      infer ElseNext,
      infer ElseReturn
    ]
    ? [ThenReturn, ElseReturn] extends ["T", "T"]
      ? [ThenNext | ElseNext, "T"]
      : [ThenNext | ElseNext, "F"]
    : never
  : never;

type LoopData<Values extends LoopValues, Data> = ListData<
  Values["loop"]["do"],
  Data
> extends [infer Next, unknown]
  ? [Next, "F"]
  : never;
