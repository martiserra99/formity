import type { State } from "../types/state/state";
import type { Point } from "../types/state/point";
import type { Position } from "../types/state/position";
import type { ListInputs, FlowInputs } from "../types/state/inputs";

import type { ListSchema as TypedListSchema } from "../types/schema/typed";
import type { OnYield as TypedOnYield } from "../types/handlers/typed";
import type { OnReturn as TypedOnReturn } from "../types/handlers/typed";

import type {
  ListSchema,
  FlowSchema,
  FormSchema,
} from "../types/schema/untyped";
import type { OnYield, OnReturn } from "../types/handlers/untyped";

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
  const points = initialPoints(schema, { path, values }, onYield);
  return { points, inputs: { type: "list", list: {} } };
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

function initialPoints(
  schema: ListSchema,
  point: Point,
  onYield: OnYield
): Point[] {
  const points = [];
  let currPoint: Point | null = point;
  let currPointValues = point.values;
  let currPointSchema = FlowSchemaUtils.find(schema, point.path);
  while (!FormSchemaUtils.is(currPointSchema)) {
    if (ReturnSchemaUtils.is(currPointSchema)) {
      throw new Error("Invalid schema");
    } else if (YieldSchemaUtils.is(currPointSchema)) {
      const listValues = currPointSchema["yield"]["next"](currPointValues);
      listValues.forEach((values) => onYield(values));
      points.push(currPoint);
    } else if (VariablesSchemaUtils.is(currPointSchema)) {
      const variables = currPointSchema["variables"](currPointValues);
      currPointValues = { ...currPointValues, ...variables };
    }
    currPoint = nextPoint(schema, {
      path: currPoint.path,
      values: currPointValues,
    });
    if (!currPoint) {
      throw new Error("Invalid schema");
    }
    currPointSchema = FlowSchemaUtils.find(schema, currPoint.path);
  }
  points.push(currPoint);
  return points;
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
  const point = state.points[state.points.length - 1];
  const points = advanceForm(schema, point, values, onYield, onReturn);
  const inputs = updateInputs(state, schema, values);
  return { points: [...state.points, ...points], inputs };
}

function advanceForm(
  schema: ListSchema,
  point: Point,
  values: object,
  onYield: OnYield,
  onReturn: OnReturn
): Point[] {
  let currPoint: Point | null = nextPoint(schema, {
    path: point.path,
    values: { ...point.values, ...values },
  });
  if (!currPoint) {
    return [];
  }
  const points: Point[] = [];
  let currPointValues = currPoint.values;
  let currPointSchema = FlowSchemaUtils.find(schema, currPoint.path);
  while (!FormSchemaUtils.is(currPointSchema)) {
    if (ReturnSchemaUtils.is(currPointSchema)) {
      const values = currPointSchema["return"](currPointValues);
      onReturn(values);
      return [];
    } else if (YieldSchemaUtils.is(currPointSchema)) {
      const listValues = currPointSchema["yield"]["next"](currPointValues);
      listValues.forEach((values) => onYield(values));
      points.push(currPoint);
    } else if (VariablesSchemaUtils.is(currPointSchema)) {
      const variables = currPointSchema["variables"](currPointValues);
      currPointValues = { ...currPointValues, ...variables };
    }
    currPoint = nextPoint(schema, {
      path: currPoint.path,
      values: currPointValues,
    });
    if (!currPoint) {
      return [];
    }
    currPointSchema = FlowSchemaUtils.find(schema, currPoint.path);
  }
  points.push(currPoint);
  return points;
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
  values: object,
  onYield: TypedOnYield<Values>
): State {
  const _schema = schema as ListSchema;
  const _onYield = onYield as OnYield;
  return _prevState(state, _schema, values, _onYield);
}

function _prevState(
  state: State,
  schema: ListSchema,
  values: object,
  onYield: OnYield
): State {
  const points = state.points.slice(0, -1);
  while (points.length > 0) {
    const currPoint = points[points.length - 1];
    const currPointSchema = FlowSchemaUtils.find(schema, currPoint.path);
    if (FormSchemaUtils.is(currPointSchema)) {
      const inputs = updateInputs(state, schema, values);
      return { points, inputs };
    }
    if (YieldSchemaUtils.is(currPointSchema)) {
      const listValues = currPointSchema["yield"]["back"](currPoint.values);
      listValues.forEach((values) => onYield(values));
    }
    points.pop();
  }
  const inputs = updateInputs(state, schema, values);
  return { points: state.points, inputs };
}

function updateInputs(
  state: State,
  schema: ListSchema,
  values: object
): ListInputs {
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
  return inputs as ListInputs;
}
