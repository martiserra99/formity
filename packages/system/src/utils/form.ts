import type { State } from "../types/state/state";
import type { ListSchema as TypedListSchema } from "../types/schema/typed";
import type { ListSchema, FormSchema } from "../types/schema/basic";
import type { ListValues } from "../types/values";
import type { OnNext, OnBack, GetState, SetState } from "../types/controls";

import * as FlowSchemaUtils from "./schema/flow";
import * as FlowInputsUtils from "./inputs/flow";

/**
 * Returns the rendered form for the current step of the multi-step form.
 *
 * @param state The current state of the multi-step form.
 * @param schema The `ListSchema` object representing the multi-step form.
 * @param params An object containing the parameters for the form.
 * @param onNext A callback function used to navigate to the next step of the multi-step form.
 * @param onBack A callback function used to navigate to the previous step of the multi-step form.
 * @param getState A callback function used to get the current state of the multi-step form.
 * @param setState A callback function used to set the current state of the multi-step form.
 * @returns The rendered form for the current step of the multi-step form.
 */
export function getForm<
  Render,
  Values extends ListValues,
  Inputs extends object,
  Params extends object
>(
  state: State,
  schema: TypedListSchema<Render, Values, Inputs, Params>,
  params: Params,
  onNext: OnNext,
  onBack: OnBack,
  getState: GetState,
  setState: SetState
): Render {
  const basicSchema = schema as ListSchema;
  const basicParams = params as object;
  return basicGetForm(
    state,
    basicSchema,
    basicParams,
    onNext,
    onBack,
    getState,
    setState
  ) as Render;
}

function basicGetForm(
  state: State,
  schema: ListSchema,
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
