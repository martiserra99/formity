import { ReactElement } from "react";
import { UseFormProps } from "react-hook-form";
import { Value, Variables } from "expry";

export type Result = FormResult | ReturnResult | VariablesResult;

export type FormResult = {
  type: "form";
  defaultValues: UseFormProps["defaultValues"];
  resolver: UseFormProps["resolver"];
  render: (values: Variables) => ReactElement;
};

export type ReturnResult = { type: "return"; return: Value };

export type VariablesResult = { type: "variables"; variables: Variables };
