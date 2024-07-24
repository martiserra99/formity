import { Variables } from "expry";

import { FlowSchema, ItemSchema } from "../../../../types/new/schema";
import { Position } from "../../../../types/new/flow/position";

import { ListSchemaUtils } from "./list";
import { CondSchemaUtils } from "./cond";
import { LoopSchemaUtils } from "./loop";

export namespace FlowSchemaUtils {
  export function find(schema: FlowSchema, path: Position[]): ItemSchema {
    let current: ItemSchema = schema;
    for (const position of path) {
      const flow = current as FlowSchema;
      current = at(flow, position);
    }
    return current;
  }

  export function into(schema: FlowSchema, variables: Variables): Position | null {
    if (ListSchemaUtils.is(schema)) return ListSchemaUtils.into(schema);
    if (CondSchemaUtils.is(schema)) return CondSchemaUtils.into(schema, variables);
    if (LoopSchemaUtils.is(schema)) return LoopSchemaUtils.into(schema, variables);
    throw new Error("Invalid schema");
  }

  export function next(schema: FlowSchema, position: Position, variables: Variables): Position | null {
    if (ListSchemaUtils.is(schema)) return ListSchemaUtils.next(schema, position);
    if (CondSchemaUtils.is(schema)) return CondSchemaUtils.next(schema, position);
    if (LoopSchemaUtils.is(schema)) return LoopSchemaUtils.next(schema, position, variables);
    throw new Error("Invalid schema");
  }

  function at(schema: FlowSchema, position: Position): ItemSchema {
    if (ListSchemaUtils.is(schema)) return ListSchemaUtils.at(schema, position);
    if (CondSchemaUtils.is(schema)) return CondSchemaUtils.at(schema, position);
    if (LoopSchemaUtils.is(schema)) return LoopSchemaUtils.at(schema, position);
    throw new Error("Invalid schema");
  }
}
