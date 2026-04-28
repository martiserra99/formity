import {
  useFormity,
  Flow,
  Schema,
  OnYield,
  OnReturn,
  State,
} from "@formity/react";

type Shape = {
  render: React.ReactNode;
  schema: Schema;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};

interface MultiStepFormProps<T extends Shape> {
  flow: Flow<T>;
  onYield?: OnYield<Shape>;
  onReturn?: OnReturn<Shape>;
  initialState?: State;
}

export function MultiStepForm<T extends Shape>({
  flow,
  onYield,
  onReturn,
  initialState,
}: MultiStepFormProps<T>): React.ReactNode {
  return useFormity<T>({ flow, onYield, onReturn, initialState });
}
