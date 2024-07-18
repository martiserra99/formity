import { UseFormProps } from "react-hook-form";
import { ReactElement } from "react";
import { ExpressionResult } from "expry";

import { RenderValues } from "./form";

export type Result<T extends RenderValues> = FormResult<T> | ReturnResult;

export interface FormResult<T> {
  type: "form";
  defaultValues: UseFormProps["defaultValues"];
  resolver: UseFormProps["resolver"];
  render: (values: T) => ReactElement;
}

export interface ReturnResult {
  type: "return";
  return: ExpressionResult;
}
