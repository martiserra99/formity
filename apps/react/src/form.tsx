import {
  Formity,
  Schema,
  Values,
  OnYield,
  OnReturn,
  Flow,
} from "@formity/react";

interface FormProps<T extends Values> {
  schema: Schema<T>;
  onYield?: OnYield<Values>;
  onReturn?: OnReturn<Values>;
  initialFlow?: Flow;
}

export function Form<T extends Values>({
  schema,
  onYield,
  onReturn,
  initialFlow,
}: FormProps<T>) {
  return (
    <Formity<T>
      schema={schema}
      onYield={onYield}
      onReturn={onReturn}
      initialFlow={initialFlow}
    />
  );
}
