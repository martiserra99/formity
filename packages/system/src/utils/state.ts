import type { State } from "../types/state/state";
import type { ListSchema as TypedListSchema } from "../types/schema/typed";
import type { ListSchema, FormSchema } from "../types/schema/untyped";
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
  const _schema = schema as ListSchema;
  return _getState(state, _schema, values);
}

function _getState(state: State, schema: ListSchema, values: object): State {
  const point = state.points[state.points.length - 1];
  const formSchema = FlowSchemaUtils.find(schema, point.path) as FormSchema;
  const formValues = formSchema["form"]["values"](point.values);
  let inputs: FlowInputs = state.inputs;
  for (const [name, value] of Object.entries(values)) {
    if (name in formValues) {
      const keys = formValues[name][1];
      const path = point.path;
      inputs = FlowInputsUtils.set(inputs, path, name, keys, value);
    }
  }
  return { points: state.points, inputs: inputs as ListInputs };
}
