import type { ItemSchema, LoopSchema } from "../../types/schema/static";
import type { Position, LoopPosition } from "../../types/flow/position";

/**
 * Type guard for `LoopSchema` objects
 *
 * @param schema An `ItemSchema` object
 * @returns A boolean indicating whether the `schema` is a `LoopSchema` object
 */
export function is(schema: ItemSchema): schema is LoopSchema {
  return "loop" in schema;
}

export function into(schema: LoopSchema, values: object): Position | null {
  if (schema.loop.while(values)) {
    if (schema.loop.do.length > 0) {
      return { type: "loop", slot: 0 };
    }
  }
  return null;
}

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

export function at(schema: LoopSchema, position: Position): ItemSchema {
  const { slot } = position as LoopPosition;
  return schema.loop.do[slot];
}
