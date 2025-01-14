import type { State } from "../types/state/state";
import type { ListSchema as TypedListSchema } from "../types/schema/typed";
import type { ListSchema, FormSchema } from "../types/schema/basic";
import type { ListValues } from "../types/values";
import type { FlowInputs, ListInputs } from "../types/state/inputs";

import * as FlowSchemaUtils from "./schema/flow";
import * as FlowInputsUtils from "./inputs/flow";

/**
 * Returns the current state of the multi-step form after updating the values of the current form.
 *
 * @param state The current state of the multi-step form.
 * @param schema The `ListSchema` object representing the multi-step form.
 * @param values An object containing the values of the current form.
 * @returns The current state of the multi-step form after updating the values of the current form.
 */
export function getState<
  Render,
  Values extends ListValues,
  Inputs extends object,
  Params extends object
>(
  state: State,
  schema: TypedListSchema<Render, Values, Inputs, Params>,
  values: object
): State {
  const basicSchema = schema as ListSchema;
  return basicGetState(state, basicSchema, values);
}

function basicGetState(
  state: State,
  schema: ListSchema,
  values: object
): State {
  const last = state.points[state.points.length - 1];
  const form = FlowSchemaUtils.find(schema, last.path) as FormSchema;
  const vals = form["form"]["values"](last.values);
  let curr: FlowInputs = state.inputs;
  for (const [name, value] of Object.entries(values)) {
    const key = name as keyof typeof vals;
    curr = FlowInputsUtils.set(curr, last.path, name, vals[key][1], value);
  }
  return { points: state.points, inputs: curr as ListInputs };
}
