import { expry, Variables } from "expry";

import { FormSchema, ItemSchema } from "../../../../types/schema";
import { FormResult } from "../../../../types/result";

export namespace FormSchemaUtils {
  export function is(schema: ItemSchema): schema is FormSchema {
    return "form" in schema;
  }

  export function keys(schema: FormSchema, variables: Variables): (name: string) => string[] {
    const defaultValues = expry(schema.form.defaultValues, variables) as FormResult["defaultValues"];
    return (name: string) => defaultValues[name][1];
  }

  export function result(schema: FormSchema, variables: Variables): FormResult {
    return {
      type: "form",
      defaultValues: expry(schema.form.defaultValues, variables) as FormResult["defaultValues"],
      resolver: expry(schema.form.resolver, variables) as FormResult["resolver"],
      render: schema.form.render as FormResult["render"],
    };
  }
}
