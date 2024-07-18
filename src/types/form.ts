import { UseFormProps } from "react-hook-form";
import { ReactElement } from "react";
import { ExpressionResult, ExpressionValue } from "expry";

export type FormRenderValues = Record<string, ExpressionValue>;

export type FormData = ExpressionResult;

export interface FormProps<T extends FormRenderValues> {
  defaultValues: UseFormProps["defaultValues"];
  resolver: UseFormProps["resolver"];
  render: (values: T) => ReactElement;
  onSubmit: (data: FormData) => void;
  onBack: (data: FormData) => void;
}
