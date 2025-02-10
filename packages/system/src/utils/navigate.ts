import type { State } from "../types/state/state";
import type { Point } from "../types/state/point";
import type { Position } from "../types/state/position";
import type { ListInputs, FlowInputs } from "../types/state/inputs";

import type { ListSchema as TypedListSchema } from "../types/schema/typed";
import type { OnYield as TypedOnYield } from "../types/handlers/typed";
import type { OnReturn as TypedOnReturn } from "../types/handlers/typed";

import type { ListSchema, FlowSchema, FormSchema } from "../types/schema/basic";
import type { OnYield, OnReturn } from "../types/handlers/basic";

import type { ListValues } from "../types/values";

import * as FlowSchemaUtils from "./schema/flow";
import * as FormSchemaUtils from "./schema/form";
import * as YieldSchemaUtils from "./schema/yield";
import * as ReturnSchemaUtils from "./schema/return";
import * as VariablesSchemaUtils from "./schema/variables";

import * as FlowInputsUtils from "./inputs/flow";

/**
 * Initializes the multi-step form and returns its initial state, including a point
 * pointing to the first form step. If no form step is found, or if a return operation
 * is encountered before reaching a form, an error is thrown.
 *
 * During traversal of the multi-step form, the `onYield` callback is triggered whenever
 * a yield operation is encountered, allowing for intermediate values to be processed.
 *
 * @param schema The `ListSchema` object that defines the structure and behavior of the multi-step form.
 * @param values An object containing the initial input values for the multi-step form.
 * @param onYield A callback function triggered when the multi-step form yields values.
 * @returns The initial state of the form as a `Flow` object.
 *
 * @throws An error if no form step is found or if a return operation is encountered before a form step.
 */
export function initState<
  Render,
  Values extends ListValues,
  Inputs extends object,
  Params extends object
>(
  schema: TypedListSchema<Render, Values, Inputs, Params>,
  values: Inputs,
  onYield: TypedOnYield<Values>
): State {
  const _schema = schema as ListSchema;
  const _values = values as object;
  const _onYield = onYield as OnYield;
  return _initState(_schema, _values, _onYield);
}

function _initState(
  schema: ListSchema,
  values: object,
  onYield: OnYield
): State {
  const path = initialPath(schema, values);
  const form = initialForm(schema, { path, values }, onYield);
  return { points: [form], inputs: { type: "list", list: {} } };
}

function initialPath(schema: ListSchema, values: object): Position[] {
  const path = initialPathOrNull(schema, values);
  if (path) return path;
  throw new Error("Invalid schema");
}

function initialPathOrNull(
  schema: FlowSchema,
  values: object
): Position[] | null {
  let position = FlowSchemaUtils.into(schema, values);
  while (position) {
    const path = initialPathFromPosition(schema, position, values);
    if (path) return path;
    position = FlowSchemaUtils.next(schema, position, values);
  }
  return null;
}

function initialPathFromPosition(
  schema: FlowSchema,
  position: Position,
  values: object
): Position[] | null {
  const item = FlowSchemaUtils.find(schema, [position]);
  if (FlowSchemaUtils.is(item)) {
    const path = initialPathOrNull(item, values);
    if (path) return [position, ...path];
    else return null;
  }
  return [position];
}

function initialForm(
  schema: ListSchema,
  point: Point,
  onYield: OnYield
): Point {
  let currentPoint: Point | null = point;
  let currentValues = currentPoint.values;
  let currentSchema = FlowSchemaUtils.find(schema, currentPoint.path);
  while (!FormSchemaUtils.is(currentSchema)) {
    if (ReturnSchemaUtils.is(currentSchema)) {
      throw new Error("Invalid schema");
    } else if (YieldSchemaUtils.is(currentSchema)) {
      const values = currentSchema["yield"]["next"](currentValues);
      onYield(values);
    } else if (VariablesSchemaUtils.is(currentSchema)) {
      const variables = currentSchema["variables"](currentValues);
      currentValues = { ...currentValues, ...variables };
    }
    currentPoint = nextPoint(schema, {
      path: currentPoint.path,
      values: currentValues,
    });
    if (!currentPoint) {
      throw new Error("Invalid schema");
    }
    currentSchema = FlowSchemaUtils.find(schema, currentPoint.path);
  }
  return currentPoint;
}

/**
 * Navigates to the next form step of the multi-step form and returns the updated state.
 * If there is no next form step, the returned state contains the current form step.
 *
 * The `onYield` callback is triggered whenever a yield operation is encountered during traversal,
 * allowing for intermediate values to be processed.
 *
 * The `onReturn` callback is triggered whenever a return operation is encountered during traversal,
 * allowing for final values to be processed.
 *
 * @param state The current state of the multi-step form.
 * @param schema The `ListSchema` object representing the multi-step form.
 * @param values An object containing the generated values within the multi-step form.
 * @param onYield A callback function triggered when the multi-step form yields values.
 * @param onReturn A callback function triggered when the multi-step form returns values.
 * @returns The updated state of the multi-step form.
 */
export function nextState<
  Render,
  Values extends ListValues,
  Inputs extends object,
  Params extends object
>(
  state: State,
  schema: TypedListSchema<Render, Values, Inputs, Params>,
  values: object,
  onYield: TypedOnYield<Values>,
  onReturn: TypedOnReturn<Values>
): State {
  const _schema = schema as ListSchema;
  const _onYield = onYield as OnYield;
  const _onReturn = onReturn as OnReturn;
  return _nextState(state, _schema, values, _onYield, _onReturn);
}

function _nextState(
  state: State,
  schema: ListSchema,
  values: object,
  onYield: OnYield,
  onReturn: OnReturn
): State {
  const lastPoint = state.points[state.points.length - 1];
  const nextPoint = advanceForm(schema, lastPoint, values, onYield, onReturn);
  const points = nextPoint ? [...state.points, nextPoint] : state.points;
  const inputs = updateInputs(state, schema, values);
  return { points, inputs };
}

function advanceForm(
  schema: ListSchema,
  point: Point,
  values: object,
  onYield: OnYield,
  onReturn: OnReturn
): Point | null {
  let currentPoint: Point | null = nextPoint(schema, {
    path: point.path,
    values: { ...point.values, ...values },
  });
  if (!currentPoint) {
    return null;
  }
  let currentValues = currentPoint.values;
  let currentSchema = FlowSchemaUtils.find(schema, currentPoint.path);
  while (!FormSchemaUtils.is(currentSchema)) {
    if (ReturnSchemaUtils.is(currentSchema)) {
      const values = currentSchema["return"](currentValues);
      onReturn(values);
      return null;
    } else if (YieldSchemaUtils.is(currentSchema)) {
      const values = currentSchema["yield"]["next"](currentValues);
      onYield(values);
    } else if (VariablesSchemaUtils.is(currentSchema)) {
      const variables = currentSchema["variables"](currentValues);
      currentValues = { ...currentValues, ...variables };
    }
    currentPoint = nextPoint(schema, {
      path: currentPoint.path,
      values: currentValues,
    });
    if (!currentPoint) {
      return null;
    }
    currentSchema = FlowSchemaUtils.find(schema, currentPoint.path);
  }
  return currentPoint;
}

function nextPoint(schema: ListSchema, point: Point): Point | null {
  const next = nextPointInFlow(schema, point);
  if (next) return next;
  const over = overPoint(point);
  if (over) return nextPoint(schema, over);
  return null;
}

function nextPointInFlow(schema: ListSchema, point: Point): Point | null {
  const next = nextPointInSameFlow(schema, point);
  if (next) {
    const into = nextPointInsideFlow(schema, next);
    if (into) return into;
    return nextPointInFlow(schema, next);
  }
  return null;
}

function nextPointInSameFlow(schema: ListSchema, point: Point): Point | null {
  const path = point.path.slice(0, -1);
  const flow = FlowSchemaUtils.find(schema, path) as FlowSchema;
  const curr = point.path[point.path.length - 1];
  const next = FlowSchemaUtils.next(flow, curr, point.values);
  if (next) {
    return { path: [...path, next], values: point.values };
  }
  return null;
}

function nextPointInsideFlow(schema: ListSchema, point: Point): Point | null {
  const item = FlowSchemaUtils.find(schema, point.path);
  if (FlowSchemaUtils.is(item)) {
    const position = FlowSchemaUtils.into(item, point.values);
    if (position) {
      const path = [...point.path, position];
      const next = { path, values: point.values };
      const into = nextPointInsideFlow(schema, next);
      if (into) return into;
      return nextPointInFlow(schema, next);
    }
    return null;
  }
  return point;
}

function overPoint(point: Point): Point | null {
  if (point.path.length > 1) {
    return { path: point.path.slice(0, -1), values: point.values };
  }
  return null;
}

/**
 * Navigates to the previous form step of the multi-step form and returns the updated state.
 * If there is no previous form step, the returned state contains the current form step.
 *
 * @param state The current state of the multi-step form.
 * @param schema The `ListSchema` object representing the multi-step form.
 * @param values An object containing the generated values within the multi-step form.
 * @returns The updated state of the multi-step form.
 */
export function prevState<
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
  return _prevState(state, _schema, values);
}

function _prevState(state: State, schema: ListSchema, values: object): State {
  const current = state.points;
  const points = current.length > 1 ? current.slice(0, -1) : current;
  const inputs = updateInputs(state, schema, values);
  return { points, inputs };
}

function updateInputs(
  state: State,
  schema: ListSchema,
  values: object
): ListInputs {
  const last = state.points[state.points.length - 1];
  const form = FlowSchemaUtils.find(schema, last.path) as FormSchema;
  const vals = form["form"]["values"](last.values);
  let curr: FlowInputs = state.inputs;
  for (const [name, value] of Object.entries(values)) {
    const key = name as keyof typeof vals;
    curr = FlowInputsUtils.set(curr, last.path, name, vals[key][1], value);
  }
  return curr as ListInputs;
}
