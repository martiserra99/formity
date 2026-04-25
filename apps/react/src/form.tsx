import {
  useFormity,
  Flow,
  Schema,
  OnYield,
  OnReturn,
  State,
} from "@formity/react";
import React from "react";

interface FormProps<T extends Schema> {
  flow: Flow<React.ReactNode, T>;
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
  const { form } = useFormity<React.ReactNode, T>({
    flow,
    onYield,
    onReturn,
    initialState,
  });
  return form;
}
