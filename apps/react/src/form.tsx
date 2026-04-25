import {
  useFormity,
  Flow,
  Schema,
  OnYield,
  OnReturn,
  State,
} from "@formity/react";

interface FormProps<T extends Schema> {
  flow: Flow<T>;
  onYield?: OnYield<Schema>;
  onReturn?: OnReturn<Schema>;
  initialState?: State;
}

export function Form<T extends Schema>({
  flow,
  onYield,
  onReturn,
  initialState,
}: FormProps<T>) {
  return useFormity<T>({ flow, onYield, onReturn, initialState });
}
