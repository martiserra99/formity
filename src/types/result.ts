import { ReactElement } from "react";
import { Value } from "expry";

import { DefaultValues, Resolver, OnNext, OnBack, Key } from "./form";

export type Result = FormResult | ReturnResult;

export type FormResult = {
  type: "form";
  defaultValues: DefaultValues;
  resolver: Resolver;
  render: (values: {
    defaultValues: DefaultValues;
    resolver: Resolver;
    onNext: OnNext;
    onBack: OnBack;
    key: Key;
  }) => ReactElement;
};

export type ReturnResult = { type: "return"; return: Value };
