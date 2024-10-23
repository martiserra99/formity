import { expry, Variables } from "expry";

import { CondSchema, ItemSchema } from "../../types/schema";
import { CondPosition, Position } from "../../types/position";

export const CondSchemaUtils = {
  is(schema: ItemSchema): schema is CondSchema {
    return "cond" in schema;
  },

  into(schema: CondSchema, variables: Variables): Position | null {
    if (expry(schema.cond.if, variables)) {
      if (schema.cond.then.length > 0) {
        return { type: "cond", branch: "then", index: 0 };
      }
    } else {
      if (schema.cond.else.length > 0) {
        return { type: "cond", branch: "else", index: 0 };
      }
    }
    return null;
  },

  next(schema: CondSchema, position: Position): Position | null {
    const { branch, index } = position as CondPosition;
    if (index < schema.cond[branch].length - 1) {
      return { type: "cond", branch, index: index + 1 };
    }
    return null;
  },

  at(schema: CondSchema, position: Position): ItemSchema {
    const { branch, index } = position as CondPosition;
    return schema.cond[branch][index];
  },
};
