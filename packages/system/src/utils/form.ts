import type { Values } from "../types/values";

import type { Schema as TypedSchema } from "../types/schema/typed";
import type { Schema, FormSchema } from "../types/schema/model";

import type { State } from "../types/state/state";

import type { OnNext, OnBack, GetState, SetState } from "../types/controls";

import * as FlowSchemaUtils from "./schema/flow";
import * as FlowInputsUtils from "./inputs/flow";

/**
 * Returns the rendered form for the current step of the multi-step form.
 *
 * @param state The current state of the multi-step form.
 * @param schema The `Schema` object representing the multi-step form.
 * @param params An object containing the parameters for the form.
 * @param onNext A callback function used to navigate to the next step of the multi-step form.
 * @param onBack A callback function used to navigate to the previous step of the multi-step form.
 * @param getState A callback function used to get the current state of the multi-step form.
 * @param setState A callback function used to set the current state of the multi-step form.
 * @returns The rendered form for the current step of the multi-step form.
 */
export function getForm<
  R,
  V extends Values,
  I extends object,
  P extends object
>(
  state: State,
  schema: TypedSchema<R, V, I, P>,
  params: P,
  onNext: OnNext,
  onBack: OnBack,
  getState: GetState,
  setState: SetState
): R {
  const _schema = schema as Schema;
  const _params = params as object;
  return _getForm(
    state,
    _schema,
    _params,
    onNext,
    onBack,
    getState,
    setState
  ) as R;
}

function _getForm(
  state: State,
  schema: Schema,
  params: object,
  onNext: OnNext,
  onBack: OnBack,
  getState: GetState,
  setState: SetState
): unknown {
  const point = state.points[state.points.length - 1];
  const form = FlowSchemaUtils.find(schema, point.path) as FormSchema;
  const inputs = point.values;
  const values = Object.fromEntries(
    Object.entries(form["form"]["values"](point.values)).map(
      ([name, [value, keys]]) => {
        return [
          name,
          FlowInputsUtils.get(state.inputs, point.path, name, keys, value),
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
    getState,
    setState,
  });
}
