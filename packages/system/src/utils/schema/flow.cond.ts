import type { ItemSchema, CondSchema } from "../../types/schema/model";
import type { Position, CondPosition } from "../../types/state/position";

/**
 * Type guard for `CondSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `CondSchema` object.
 */
export function is(schema: ItemSchema): schema is CondSchema {
  return "cond" in schema;
}

/**
 * Returns the initial position for the given `CondSchema` object if there is an initial position, otherwise it returns `null`.
 *
 * @param schema A `CondSchema` object.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position.
 */
export function into(
  schema: CondSchema,
  values: Record<string, unknown>
): Position | null {
  if (schema.cond.if(values)) {
    if (schema.cond.then.length > 0) {
      return { type: "cond", path: "then", slot: 0 };
    }
  } else {
    if (schema.cond.else.length > 0) {
      return { type: "cond", path: "else", slot: 0 };
    }
  }
  return null;
}

/**
 * Returns the next position for the given `CondSchema` object if there is a next position, otherwise it returns `null`.
 *
 * @param schema A `CondSchema` object.
 * @param position A `Position` object representing the current position.
 * @returns A `Position` object representing the next position, or `null` if there is no next position.
 */
export function next(schema: CondSchema, position: Position): Position | null {
  const { path, slot } = position as CondPosition;
  if (slot < schema.cond[path].length - 1) {
    return { type: "cond", path, slot: slot + 1 };
  }
  return null;
}

/**
 * Returns the `ItemSchema` object at the given position within the given `CondSchema` object.
 *
 * @param schema The `CondSchema` object.
 * @param position The position within the `CondSchema` object.
 * @returns The `ItemSchema` object at the given position within the `CondSchema` object.
 */
export function at(schema: CondSchema, position: Position): ItemSchema {
  const { path, slot } = position as CondPosition;
  return schema.cond[path][slot];
}
