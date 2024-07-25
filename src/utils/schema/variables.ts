import { expry, Variables } from "expry";

import { VariablesSchema, ItemSchema } from "../../types/schema";

export namespace VariablesSchemaUtils {
  export function is(schema: ItemSchema): schema is VariablesSchema {
    return "variables" in schema;
  }

  export function variables(schema: VariablesSchema, variables: Variables): Variables {
    return expry(schema.variables, variables) as Variables;
  }
}
