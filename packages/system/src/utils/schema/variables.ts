import type { ItemSchema, VariablesSchema } from "../../types/schema/untyped";

/**
 * Type guard for `VariablesSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `VariablesSchema` object.
 */
export function is(schema: ItemSchema): schema is VariablesSchema {
  return "variables" in schema;
}
