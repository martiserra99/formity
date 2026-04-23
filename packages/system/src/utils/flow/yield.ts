import type { ItemFlow, YieldFlow } from "../../types/flow/model";

/**
 * Type guard for `YieldSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `YieldSchema` object.
 */
export function is(schema: ItemFlow): schema is YieldFlow {
  return "yield" in schema;
}
