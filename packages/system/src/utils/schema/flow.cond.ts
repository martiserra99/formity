import type { ItemSchema, CondSchema } from "../../types/schema/static";
import type { Position, CondPosition } from "../../types/flow/position";

/**
 * Type guard for `CondSchema` objects
 *
 * @param schema An `ItemSchema` object
 * @returns A boolean indicating whether the `schema` is a `CondSchema` object
 */
export function is(schema: ItemSchema): schema is CondSchema {
  return "cond" in schema;
}

export function into(schema: CondSchema, values: object): Position | null {
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

export function next(schema: CondSchema, position: Position): Position | null {
  const { path, slot } = position as CondPosition;
  if (slot < schema.cond[path].length - 1) {
    return { type: "cond", path, slot: slot + 1 };
  }
  return null;
}

export function at(schema: CondSchema, position: Position): ItemSchema {
  const { path, slot } = position as CondPosition;
  return schema.cond[path][slot];
}
