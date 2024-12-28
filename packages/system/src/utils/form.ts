import type { Flow } from "../types/flow/flow";
import type { ListSchema as CustomListSchema } from "../types/schema/custom";
import type { ListSchema, FormSchema } from "../types/schema/static";
import type { ListValues } from "../types/values";
import type { OnNext, OnBack, GetFlow, SetFlow } from "../types/callbacks";

import * as FlowSchemaUtils from "./schema/flow";
import * as FlowEntriesUtils from "./entries/flow";

export function getForm<
  Render,
  Values extends ListValues,
  Inputs extends object,
  Params extends object
>(
  flow: Flow,
  schema: CustomListSchema<Render, Values, Inputs, Params>,
  params: Params,
  onNext: OnNext,
  onBack: OnBack,
  getFlow: GetFlow,
  setFlow: SetFlow
): Render {
  const sSchema = schema as ListSchema;
  const sParams = params as object;
  return internalGetForm(
    flow,
    sSchema,
    sParams,
    onNext,
    onBack,
    getFlow,
    setFlow
  ) as Render;
}

function internalGetForm(
  flow: Flow,
  schema: ListSchema,
  params: object,
  onNext: OnNext,
  onBack: OnBack,
  getFlow: GetFlow,
  setFlow: SetFlow
): unknown {
  const cursor = flow.cursors[flow.cursors.length - 1];
  const form = FlowSchemaUtils.find(schema, cursor.path) as FormSchema;
  const inputs = cursor.values;
  const values = Object.fromEntries(
    Object.entries(form["form"]["values"](cursor.values)).map(
      ([name, [value, keys]]) => {
        return [
          name,
          FlowEntriesUtils.get(flow.entries, cursor.path, name, keys, value),
        ];
      }
    )
  );
  return form["form"]["render"]({
    inputs,
    values,
    params,
    onNext,
    onBack,
    getFlow,
    setFlow,
  });
}
