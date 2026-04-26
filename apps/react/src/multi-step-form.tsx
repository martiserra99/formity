import {
  useFormity,
  Flow,
  Schema,
  OnYield,
  OnReturn,
  State,
} from "@formity/react";

import { FormActions } from "./form-actions";

type Definition = {
  render: { Form: React.FC; step: string };
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
  const { form, ...rest } = useFormity<T>({
    flow,
    onYield,
    onReturn,
    initialState,
  });
  const { step, Form } = form;
  return (
    <FormActions step={step} {...rest}>
      <Form />
    </FormActions>
  );
}
