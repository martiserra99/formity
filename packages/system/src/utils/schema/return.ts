import type { ItemSchema, ReturnSchema } from "../../types/schema/static";

export function is(schema: ItemSchema): schema is ReturnSchema {
  return "return" in schema;
}
