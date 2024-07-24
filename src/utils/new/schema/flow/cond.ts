import { expry, Variables } from "expry";

import { ItemSchema, CondSchema } from "../../../../types/new/schema";
import { Position, CondPosition } from "../../../../types/new/flow/position";

export namespace CondSchemaUtils {
  export function is(schema: ItemSchema): schema is CondSchema {
    return "cond" in schema;
  }

  export function into(schema: CondSchema, variables: Variables): Position | null {
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
  }

  export function next(schema: CondSchema, position: Position): Position | null {
    const { branch, index } = position as CondPosition;
    if (index < schema.cond[branch].length - 1) {
      return { type: "cond", branch, index: index + 1 };
    }
    return null;
  }

  export function at(schema: CondSchema, position: Position): ItemSchema {
    const { branch, index } = position as CondPosition;
    return schema.cond[branch][index];
  }
}
