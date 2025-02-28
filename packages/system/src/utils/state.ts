import type { Values } from "../types/values";

import type { Schema as TypedSchema } from "../types/schema/typed";
import type { Schema, FormSchema } from "../types/schema/model";

import type { State } from "../types/state/state";
import type { Inputs, FlowInputs } from "../types/state/inputs";

import * as FlowSchemaUtils from "./schema/flow";
import * as FlowInputsUtils from "./inputs/flow";

/**
 * Returns the current state of the multi-step form after updating the values of the current form.
 *
 * @param state The current state of the multi-step form.
 * @param schema The `Schema` object representing the multi-step form.
 * @param values An object containing the values of the current form.
 * @returns The current state of the multi-step form after updating the values of the current form.
 */
export function getState<
  R,
  V extends Values,
  I extends Record<string, unknown>,
  P extends Record<string, unknown>
>(
  state: State,
  schema: TypedSchema<R, V, I, P>,
  values: Record<string, unknown>
): State {
  const _schema = schema as Schema;
  return _getState(state, _schema, values);
}

function _getState(
  state: State,
  schema: Schema,
  values: Record<string, unknown>
): State {
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
  return { points: state.points, inputs: inputs as Inputs };
}
