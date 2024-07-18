import { UseFormProps } from "react-hook-form";
import { ReactElement } from "react";
import { ExpressionResult, ExpressionValue } from "expry";

export type RenderValues = Record<string, ExpressionValue>;

export type FormData = ExpressionResult;

export interface FormProps<T extends RenderValues> {
  defaultValues: UseFormProps["defaultValues"];
  resolver: UseFormProps["resolver"];
  render: (values: T) => ReactElement;
  onSubmit: (data: FormData) => void;
  onBack: (data: FormData) => void;
}
