import { ReactElement } from "react";
import { Value } from "expry";

export type Parameters = Record<string, Record<string, Value>>;

export type Components<T extends Parameters> = {
  [K in keyof T]: (values: T[K], render: (value: Value) => ReactElement) => ReactElement;
};
