import type { ItemSchema, YieldSchema } from "../../types/schema/static";

export function is(schema: ItemSchema): schema is YieldSchema {
  return "yield" in schema;
}
