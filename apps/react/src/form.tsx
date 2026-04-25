import {
  useFormity,
  Flow,
  Schema,
  OnYield,
  OnReturn,
  State,
} from "@formity/react";

import { MultiStep } from "./multi-step";

interface FormProps<T extends Schema> {
  flow: Flow<{ Form: React.FC; step: string }, T>;
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
  const { form, onNext, onBack, getState, setState } = useFormity<
    {
      Form: React.FC;
      step: string;
    },
    T
  >({
    flow,
    onYield,
    onReturn,
    initialState,
  });
  const { step, Form } = form;
  return (
    <MultiStep
      step={step}
      onNext={onNext}
      onBack={onBack}
      getState={getState}
      setState={setState}
    >
      <Form />
    </MultiStep>
  );
}
