import { expry, Variables, Value } from "expry";

import { FormSchema, StepSchema } from "../../../../types/new/schema";
import { FormResult } from "../../../../types/new/flow/result";
import { ListFields } from "../../../../types/new/flow/fields";
import { Position } from "../../../../types/new/flow/position";
import { Components, Parameters } from "../../../../types/new/components";

type Key = string | number;
type DefaultValues = Record<string, [Value, Key[]]>;
type Resolver = Record<string, [Value, string][]>;

export namespace FormSchemaUtils {
  export function is(schema: StepSchema): schema is FormSchema {
    return "form" in schema;
  }

  export function getState<T extends Parameters>(
    schema: FormSchema,
    variables: Variables,
    components: Components<T>,
    fields: ListFields,
    path: Position[]
  ): FormResult {
    return {
      type: "form",
      defaultValues: getDefaultValues(schema, variables, fields, path),
      resolver: getResolver(schema, variables),
      render: getRender(schema, variables, components),
    };
  }

  function getDefaultValues(
    schema: FormSchema,
    variables: Variables,
    _fields: ListFields,
    _path: Position[]
  ): FormResult["defaultValues"] {
    const defaultValues = expry(schema.form.defaultValues, variables) as DefaultValues;
    return Object.fromEntries(
      Object.entries(defaultValues).map(([name, [value, _]]) => {
        return [name, value];
      })
    );
  }

  function getResolver(schema: FormSchema, variables: Variables): FormResult["resolver"] {
    const resolver = expry(schema.form.resolver, variables) as Resolver;
    return (values: Variables) => {
      const errors: Record<string, { type: string; message: string }> = {};
      for (const [name, validations] of Object.entries(resolver)) {
        const error = validations.find(([expr]) => !expry(expr, values));
        if (error) errors[name] = { type: "validation", message: error[1] };
      }
      return { values, errors };
    };
  }

  function getRender<T extends Parameters>(
    schema: FormSchema,
    variables: Variables,
    components: Components<T>
  ): FormResult["render"] {
    const callback = (value: Value) => {
      const object = value as Record<string, Value>;
      const [key] = Object.keys(object);
      const component = components[key];
      const values = object[key] as T[string];
      return component(values, callback);
    };
    return (values: Variables) => {
      const render = expry(schema.form.render, { ...variables, ...values });
      return callback(render);
    };
  }
}
