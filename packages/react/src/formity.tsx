import type { Flow, Schema, State, OnYield, OnReturn } from "@formity/system";

import { useFormity } from "./use-formity";

interface Options<T extends Schema<React.ReactNode>> {
  flow: Flow<T>;
  inputs?: T["inputs"];
  params?: T["params"];
  history?: boolean;
  initialState?: State;
  onYield?: OnYield<T>;
  onReturn?: OnReturn<T>;
}

export function Formity<T extends Schema<React.ReactNode>>(
  options: Options<T>,
) {
  return useFormity<T>(options);
}
