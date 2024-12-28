import type { Flow } from "../types/flow/flow";
import type { ListSchema as CustomListSchema } from "../types/schema/custom";
import type { ListSchema, FormSchema } from "../types/schema/static";
import type { ListValues } from "../types/values";
import type { FlowEntries, ListEntries } from "../types/flow/entries";

import * as FlowSchemaUtils from "./schema/flow";
import * as FlowEntriesUtils from "./entries/flow";

export function getFlow<
  Render,
  Values extends ListValues,
  Inputs extends object,
  Params extends object
>(
  flow: Flow,
  schema: CustomListSchema<Render, Values, Inputs, Params>,
  values: object
): Flow {
  const sSchema = schema as ListSchema;
  return internalGetFlow(flow, sSchema, values);
}

function internalGetFlow(flow: Flow, schema: ListSchema, values: object): Flow {
  const cursor = flow.cursors[flow.cursors.length - 1];
  const form = FlowSchemaUtils.find(schema, cursor.path) as FormSchema;
  const vals = form["form"]["values"](cursor.values);
  let curr: FlowEntries = flow.entries;
  for (const [name, value] of Object.entries(values)) {
    const key = name as keyof typeof vals;
    curr = FlowEntriesUtils.set(curr, cursor.path, name, vals[key][1], value);
  }
  return { cursors: flow.cursors, entries: curr as ListEntries };
}
