import {
  useFormity,
  Flow,
  Schema,
  OnYield,
  OnReturn,
  State,
} from "@formity/react";

import { FormActions } from "./form-actions";

import type { Render } from "./render";

interface MultiStepFormProps<T extends Schema> {
  flow: Flow<Render, T>;
  onYield?: OnYield<Schema>;
  onReturn?: OnReturn<Schema>;
  initialState?: State;
}

export function MultiStepForm<T extends Schema>({
  flow,
  onYield,
  onReturn,
  initialState,
}: MultiStepFormProps<T>): React.ReactNode {
  const { form, ...rest } = useFormity<Render, T>({
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
