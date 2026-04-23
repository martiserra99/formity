import type { ItemFlow, FormFlow } from "../../types/flow/model";

/**
 * Type guard for `FormSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `FormSchema` object.
 */
export function is(schema: ItemFlow): schema is FormFlow {
  return "form" in schema;
}
