import type { ItemSchema, ReturnSchema } from "../../types/schema/basic";

/**
 * Type guard for `ReturnSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `ReturnSchema` object.
 */
export function is(schema: ItemSchema): schema is ReturnSchema {
  return "return" in schema;
}
