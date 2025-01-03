import type { ItemSchema, FormSchema } from "../../types/schema/static";

/**
 * Type guard for `FormSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `FormSchema` object.
 */
export function is(schema: ItemSchema): schema is FormSchema {
  return "form" in schema;
}
