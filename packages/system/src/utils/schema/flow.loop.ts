import type { ItemSchema, LoopSchema } from "../../types/schema/basic";
import type { Position, LoopPosition } from "../../types/state/position";

/**
 * Type guard for `LoopSchema` objects.
 *
 * @param schema An `ItemSchema` object.
 * @returns A boolean indicating whether the `schema` is a `LoopSchema` object.
 */
export function is(schema: ItemSchema): schema is LoopSchema {
  return "loop" in schema;
}

/**
 * Returns the initial position for the given `LoopSchema` object if there is an initial position, otherwise it returns `null`.
 *
 * @param schema A `LoopSchema` object.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position.
 */
export function into(schema: LoopSchema, values: object): Position | null {
  if (schema.loop.while(values)) {
    if (schema.loop.do.length > 0) {
      return { type: "loop", slot: 0 };
    }
  }
  return null;
}

/**
 * Returns the next position for the given `LoopSchema` object if there is a next position, otherwise it returns `null`.
 *
 * @param schema A `LoopSchema` object.
 * @param position A `Position` object representing the current position.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the next position, or `null` if there is no next position.
 */
export function next(
  schema: LoopSchema,
  position: Position,
  values: object
): Position | null {
  const { slot } = position as LoopPosition;
  if (slot < schema.loop.do.length - 1) {
    return { type: "loop", slot: slot + 1 };
  }
  if (schema.loop.while(values)) {
    return { type: "loop", slot: 0 };
  }
  return null;
}

/**
 * Returns the `ItemSchema` object at the given position within the given `LoopSchema` object.
 *
 * @param schema The `LoopSchema` object.
 * @param position The position within the `LoopSchema` object.
 * @returns The `ItemSchema` object at the given position within the `LoopSchema` object.
 */
export function at(schema: LoopSchema, position: Position): ItemSchema {
  const { slot } = position as LoopPosition;
  return schema.loop.do[slot];
}
