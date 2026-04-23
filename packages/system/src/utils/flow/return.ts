import type { ItemFlow, ReturnFlow } from "../../types/flow/model";

/**
 * Type guard for `ReturnSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `ReturnSchema` object.
 */
export function is(schema: ItemFlow): schema is ReturnFlow {
  return "return" in schema;
}
