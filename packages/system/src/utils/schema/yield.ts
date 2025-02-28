import type { ItemSchema, YieldSchema } from "../../types/schema/model";

/**
 * Type guard for `YieldSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `YieldSchema` object.
 */
export function is(schema: ItemSchema): schema is YieldSchema {
  return "yield" in schema;
}
