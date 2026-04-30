import {
  useFormity,
  Flow,
  Struct,
  OnYield,
  OnReturn,
  State,
} from "@formity/react";

type Schema = {
  render: React.ReactNode;
  struct: Struct;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};

interface MultiStepFormProps<T extends Schema> {
  flow: Flow<T>;
  onYield?: OnYield<T>;
  onReturn?: OnReturn<T>;
  initialState?: State;
}

export function MultiStepForm<T extends Schema>({
  flow,
  onYield,
  onReturn,
  initialState,
}: MultiStepFormProps<T>): React.ReactNode {
  return useFormity<T>({ flow, onYield, onReturn, initialState });
}
