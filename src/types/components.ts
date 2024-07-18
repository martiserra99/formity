import { ReactElement } from "react";
import { ExpressionResult } from "expry";

export type ComponentsParams = Record<string, Record<string, ExpressionResult>>;

export type ComponentsType<T extends ComponentsParams> = {
  [K in keyof T]: (values: T[K], render: (component: ExpressionResult) => ReactElement) => ReactElement;
};
