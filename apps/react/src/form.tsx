import {
  Formity,
  Schema,
  Values,
  OnYield,
  OnReturn,
  State,
} from "@formity/react";

interface FormProps<T extends Values> {
  schema: Schema<T>;
  onYield?: OnYield<Values>;
  onReturn?: OnReturn<Values>;
  initialState?: State;
}

export function Form<T extends Values>({
  schema,
  onYield,
  onReturn,
  initialState,
}: FormProps<T>) {
  return (
    <Formity<T>
      schema={schema}
      onYield={onYield}
      onReturn={onReturn}
      initialState={initialState}
    />
  );
}
