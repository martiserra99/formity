import { expry, Variables } from "expry";

import { LoopSchema, ItemSchema } from "../../../../../types/new/schema";
import { LoopPosition, Position } from "../../../../../types/new/flow/position";

export namespace LoopSchemaUtils {
  export function is(schema: ItemSchema): schema is LoopSchema {
    return "loop" in schema;
  }

  export function into(schema: LoopSchema, variables: Variables): Position | null {
    if (expry(schema.loop.while, variables)) {
      if (schema.loop.do.length > 0) return { type: "loop", index: 0 };
    }
    return null;
  }

  export function next(schema: LoopSchema, position: Position, variables: Variables): Position | null {
    const { index } = position as LoopPosition;
    if (index < schema.loop.do.length - 1) return { type: "loop", index: index + 1 };
    if (expry(schema.loop.while, variables)) return { type: "loop", index: 0 };
    return null;
  }

  export function at(schema: LoopSchema, position: Position): ItemSchema {
    const { index } = position as LoopPosition;
    return schema.loop.do[index];
  }
}
