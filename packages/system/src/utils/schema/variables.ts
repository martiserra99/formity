import type { ItemSchema, VariablesSchema } from "../../types/schema/static";

export function is(schema: ItemSchema): schema is VariablesSchema {
  return "variables" in schema;
}
