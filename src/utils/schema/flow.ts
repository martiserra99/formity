import { Variables } from "expry";

import { FlowSchema, ItemSchema } from "../../types/schema";
import { Position } from "../../types/position";

import { ListSchemaUtils } from "./flow.list";
import { CondSchemaUtils } from "./flow.cond";
import { LoopSchemaUtils } from "./flow.loop";

export const FlowSchemaUtils = {
  is(schema: ItemSchema): schema is FlowSchema {
    return (
      ListSchemaUtils.is(schema) ||
      CondSchemaUtils.is(schema) ||
      LoopSchemaUtils.is(schema)
    );
  },

  find(schema: FlowSchema, path: Position[]): ItemSchema {
    let current: ItemSchema = schema;
    for (const position of path) {
      const flow = current as FlowSchema;
      current = this.at(flow, position);
    }
    return current;
  },

  into(schema: FlowSchema, variables: Variables): Position | null {
    if (ListSchemaUtils.is(schema)) {
      return ListSchemaUtils.into(schema);
    }
    if (CondSchemaUtils.is(schema)) {
      return CondSchemaUtils.into(schema, variables);
    }
    if (LoopSchemaUtils.is(schema)) {
      return LoopSchemaUtils.into(schema, variables);
    }
    throw new Error("Invalid schema");
  },

  next(
    schema: FlowSchema,
    position: Position,
    variables: Variables
  ): Position | null {
    if (ListSchemaUtils.is(schema)) {
      return ListSchemaUtils.next(schema, position);
    }
    if (CondSchemaUtils.is(schema)) {
      return CondSchemaUtils.next(schema, position);
    }
    if (LoopSchemaUtils.is(schema)) {
      return LoopSchemaUtils.next(schema, position, variables);
    }
    throw new Error("Invalid schema");
  },

  at(schema: FlowSchema, position: Position): ItemSchema {
    if (ListSchemaUtils.is(schema)) return ListSchemaUtils.at(schema, position);
    if (CondSchemaUtils.is(schema)) return CondSchemaUtils.at(schema, position);
    if (LoopSchemaUtils.is(schema)) return LoopSchemaUtils.at(schema, position);
    throw new Error("Invalid schema");
  },
};
