import { expry, Variables, Value } from "expry";

import { FormSchema, ItemSchema } from "../../../../types/schema";
import { FormResult } from "../../../../types/result";
import { FlowFields } from "../../../../types/fields";
import { Position } from "../../../../types/position";
import { Components, Parameters } from "../../../../types/components";
import { Values } from "../../../../types/form";

import { FlowFieldsUtils } from "../../../fields/flow/flow";

type Key = string;
type DefaultValues = Record<string, [Value, Key[]]>;
type Resolver = Record<string, [Value, string][]>;

export namespace FormSchemaUtils {
  export function is(schema: ItemSchema): schema is FormSchema {
    return "form" in schema;
  }

  export function getNameKeys(schema: FormSchema, variables: Variables): (name: string) => Key[] {
    const defaultValues = expry(schema.form.defaultValues, variables) as DefaultValues;
    return (name: string) => defaultValues[name][1];
  }

  export function getResult<T extends Parameters>(
    schema: FormSchema,
    variables: Variables,
    components: Components<T>,
    fields: FlowFields,
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
    fields: FlowFields,
    path: Position[]
  ): FormResult["defaultValues"] {
    const defaultValues = expry(schema.form.defaultValues, variables) as DefaultValues;
    return Object.fromEntries(
      Object.entries(defaultValues).map(([name, [value, keys]]) => {
        return [name, FlowFieldsUtils.get(fields, path, name, keys, value)];
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
    return (values: Values) => {
      const render = expry(schema.form.render, { ...variables, ...values });
      return callback(render);
    };
  }
}
