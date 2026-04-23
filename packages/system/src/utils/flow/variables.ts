import type { ItemFlow, VariablesFlow } from "../../types/flow/model";

/**
 * Type guard for `VariablesSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `VariablesSchema` object.
 */
export function is(schema: ItemFlow): schema is VariablesFlow {
  return "variables" in schema;
}
