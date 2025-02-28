import type { ItemSchema, ListSchema } from "../../types/schema/model";
import type { Position, ListPosition } from "../../types/state/position";

/**
 * Type guard for `ListSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `ListSchema` object.
 */
export function is(schema: ItemSchema): schema is ListSchema {
  return Array.isArray(schema);
}

/**
 * Returns the initial position for the given `ListSchema` object if there is an initial position, otherwise it returns `null`.
 *
 * @param schema A `ListSchema` object.
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position.
 */
export function into(schema: ListSchema): Position | null {
  if (schema.length > 0) {
    return { type: "list", slot: 0 };
  }
  return null;
}

/**
 * Returns the next position for the given `ListSchema` object if there is a next position, otherwise it returns `null`.
 *
 * @param schema A `ListSchema` object.
 * @param position A `Position` object representing the current position.
 * @returns A `Position` object representing the next position, or `null` if there is no next position.
 */
export function next(schema: ListSchema, position: Position): Position | null {
  const { slot } = position as ListPosition;
  if (slot < schema.length - 1) {
    return { type: "list", slot: slot + 1 };
  }
  return null;
}

/**
 * Returns the `ItemSchema` object at the given position within the given `ListSchema` object.
 *
 * @param schema The `ListSchema` object.
 * @param position The position within the `ListSchema` object.
 * @returns The `ItemSchema` object at the given position within the `ListSchema` object.
 */
export function at(schema: ListSchema, position: Position): ItemSchema {
  const { slot } = position as ListPosition;
  return schema[slot];
}
