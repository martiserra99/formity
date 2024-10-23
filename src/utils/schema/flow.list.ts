import { ListSchema, ItemSchema } from "../../types/schema";
import { ListPosition, Position } from "../../types/position";

export const ListSchemaUtils = {
  is(schema: ItemSchema): schema is ListSchema {
    return Array.isArray(schema);
  },

  into(schema: ListSchema): Position | null {
    if (schema.length > 0) return { type: "list", index: 0 };
    return null;
  },

  next(schema: ListSchema, position: Position): Position | null {
    const { index } = position as ListPosition;
    if (index < schema.length - 1) return { type: "list", index: index + 1 };
    return null;
  },

  at(schema: ListSchema, position: Position): ItemSchema {
    const { index } = position as ListPosition;
    return schema[index];
  },
};
