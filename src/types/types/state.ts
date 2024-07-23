import { ReactElement } from "react";
import { Value } from "expry";

import { DefaultValues, Resolver, Values } from "../form";

export type Form = {
  type: "form";
  defaultValues: DefaultValues;
  resolver: Resolver;
  render: (values: Values) => ReactElement;
};

export type Return = { type: "return"; return: Value };
