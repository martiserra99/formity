import { ReactElement } from "react";
import { Value } from "expry";

import { DefaultValues, Resolver, Values } from "../form";

export type StepResult = FormResult | ReturnResult;

export type FormResult = {
  type: "form";
  defaultValues: DefaultValues;
  resolver: Resolver;
  render: (values: Values) => ReactElement;
};

export type ReturnResult = { type: "return"; return: Value };
