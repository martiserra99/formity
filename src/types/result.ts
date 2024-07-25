import { Value } from "expry";

export type Result = FormResult | ReturnResult;

export type FormResult = {
  type: "form";
  defaultValues: Record<string, [Value, string[]]>;
  resolver: Record<string, [Value, string][]>;
  render: Value;
};

export type ReturnResult = { type: "return"; return: Value };
