import { ReactElement } from "react";
import { Value } from "expry";

import { DefaultValues, Resolver, OnNext, OnBack, Step } from "./form";

export type Result = FormResult | ReturnResult;

export type FormResult = {
  type: "form";
  defaultValues: DefaultValues;
  resolver: Resolver;
  render: (values: {
    step: Step;
    defaultValues: DefaultValues;
    resolver: Resolver;
    onNext: OnNext;
    onBack: OnBack;
  }) => ReactElement;
};

export type ReturnResult = { type: "return"; return: Value };
