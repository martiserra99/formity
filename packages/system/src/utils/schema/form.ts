import type { ItemSchema, FormSchema } from "../../types/schema/static";

export function is(schema: ItemSchema): schema is FormSchema {
  return "form" in schema;
}
