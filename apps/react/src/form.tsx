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

interface FormProps<T extends Schema> {
  flow: Flow<Render, T>;
  onYield?: OnYield<Schema>;
  onReturn?: OnReturn<Schema>;
  initialState?: State;
}

export function Form<T extends Schema>({
  flow,
  onYield,
  onReturn,
  initialState,
}: FormProps<T>): React.ReactNode {
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
