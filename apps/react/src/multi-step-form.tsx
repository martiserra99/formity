import {
  useFormity,
  Flow,
  Schema,
  OnYield,
  OnReturn,
  State,
} from "@formity/react";

type Definition = {
  render: React.ReactNode;
  schema: Schema;
  inputs: Record<string, unknown>;
  params: Record<string, unknown>;
};

interface MultiStepFormProps<T extends Definition> {
  flow: Flow<T>;
  onYield?: OnYield<Definition>;
  onReturn?: OnReturn<Definition>;
  initialState?: State;
}

export function MultiStepForm<T extends Definition>({
  flow,
  onYield,
  onReturn,
  initialState,
}: MultiStepFormProps<T>): React.ReactNode {
  return useFormity<T>({
    flow,
    onYield,
    onReturn,
    initialState,
  });
}
