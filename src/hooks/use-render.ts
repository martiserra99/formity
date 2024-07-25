import { ReactElement, useMemo } from "react";
import { expry, Value, Variables } from "expry";

import { FormResult } from "../types/result";
import { Components, Parameters } from "../types/components";
import { Values } from "../types/form";

export function useRender<T extends Parameters>(
  form: FormResult,
  variables: Variables,
  components: Components<T>
): (values: Values) => ReactElement {
  return useMemo(() => {
    const callback = (value: Value) => {
      const object = value as Record<string, Value>;
      const [key] = Object.keys(object);
      const component = components[key];
      const values = object[key] as T[string];
      return component(values, callback);
    };
    return (values: Values) => {
      const render = expry(form.render, { ...variables, ...values });
      return callback(render);
    };
  }, [form, variables, components]);
}
