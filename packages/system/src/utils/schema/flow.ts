import type { ItemSchema, FlowSchema } from "../../types/schema/static";
import type { Position } from "../../types/flow/position";

import * as ListSchemaUtils from "./flow.list";
import * as CondSchemaUtils from "./flow.cond";
import * as LoopSchemaUtils from "./flow.loop";

/**
 * Type guard for `FlowSchema` objects
 *
 * @param schema An `ItemSchema` object
 * @returns A boolean indicating whether the `schema` is a `FlowSchema` object
 */
export function is(schema: ItemSchema): schema is FlowSchema {
  return (
    ListSchemaUtils.is(schema) ||
    CondSchemaUtils.is(schema) ||
    LoopSchemaUtils.is(schema)
  );
}

/**
 * Returns the initial position for the given `FlowSchema` object if there is an initial position, otherwise it returns `null`.
 *
 * @param schema A `FlowSchema` object
 * @param values An object containing the generated values within the multi-step form
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position
 */
export function into(schema: FlowSchema, values: object): Position | null {
  if (ListSchemaUtils.is(schema)) {
    return ListSchemaUtils.into(schema);
  }
  if (CondSchemaUtils.is(schema)) {
    return CondSchemaUtils.into(schema, values);
  }
  if (LoopSchemaUtils.is(schema)) {
    return LoopSchemaUtils.into(schema, values);
  }
  throw new Error("Invalid schema");
}

/**
 * Returns the next position for the given `FlowSchema` object if there is a next position, otherwise it returns `null`.
 *
 * @param schema A `FlowSchema` object
 * @param position A `Position` object representing the current position
 * @param values An object containing the generated values within the multi-step form
 * @returns A `Position` object representing the next position, or `null` if there is no next position
 */
export function next(
  schema: FlowSchema,
  position: Position,
  values: object
): Position | null {
  if (ListSchemaUtils.is(schema)) {
    return ListSchemaUtils.next(schema, position);
  }
  if (CondSchemaUtils.is(schema)) {
    return CondSchemaUtils.next(schema, position);
  }
  if (LoopSchemaUtils.is(schema)) {
    return LoopSchemaUtils.next(schema, position, values);
  }
  throw new Error("Invalid schema");
}

export function at(schema: FlowSchema, position: Position): ItemSchema {
  if (ListSchemaUtils.is(schema)) {
    return ListSchemaUtils.at(schema, position);
  }
  if (CondSchemaUtils.is(schema)) {
    return CondSchemaUtils.at(schema, position);
  }
  if (LoopSchemaUtils.is(schema)) {
    return LoopSchemaUtils.at(schema, position);
  }
  throw new Error("Invalid schema");
}

export function find(schema: FlowSchema, path: Position[]) {
  let current: ItemSchema = schema;
  for (const position of path) {
    const flow = current as FlowSchema;
    current = at(flow, position);
  }
  return current;
}
