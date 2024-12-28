import type { ItemSchema, ListSchema } from "../../types/schema/static";
import type { Position, ListPosition } from "../../types/flow/position";

export function is(schema: ItemSchema): schema is ListSchema {
  return Array.isArray(schema);
}

export function into(schema: ListSchema): Position | null {
  if (schema.length > 0) {
    return { type: "list", slot: 0 };
  }
  return null;
}

export function next(schema: ListSchema, position: Position): Position | null {
  const { slot } = position as ListPosition;
  if (slot < schema.length - 1) {
    return { type: "list", slot: slot + 1 };
  }
  return null;
}

export function at(schema: ListSchema, position: Position): ItemSchema {
  const { slot } = position as ListPosition;
  return schema[slot];
}
