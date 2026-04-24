import type { Schema } from "../types/schema";

import type { Flow as TypedFlow } from "../types/flow/typed";
import type { Flow, ScopeFlow } from "../types/flow/model";
import type { ListFlow, FormFlow } from "../types/flow/model";

import type { OnYield as TypedOnYield } from "../types/handlers/typed";
import type { OnReturn as TypedOnReturn } from "../types/handlers/typed";
import type { OnYield, OnReturn } from "../types/handlers/model";

import type { State } from "../types/state/state";
import type { Point } from "../types/state/point";
import type { Position } from "../types/state/position";
import type { Values, ScopeValues } from "../types/state/values";

import * as ControlFlowUtils from "./flow/scope";
import * as FormFlowUtils from "./flow/form";
import * as YieldFlowUtils from "./flow/yield";
import * as ReturnFlowUtils from "./flow/return";
import * as VariablesFlowUtils from "./flow/variables";

import * as FlowInputsUtils from "./values/scope";

/**
 * Initializes the multi-step form and returns its initial state, including a point
 * pointing to the first form step. If no form step is found, or if a return operation
 * is encountered before reaching a form, an error is thrown.
 *
 * During traversal of the multi-step form, the `onYield` callback is triggered whenever
 * a yield operation is encountered, allowing for intermediate values to be processed.
 *
 * @param flow The `Flow` object that defines the structure and behavior of the multi-step form.
 * @param values An object containing the initial input values for the multi-step form.
 * @param onYield A callback function triggered when the multi-step form yields values.
 * @returns The initial state of the form as a `State` object.
 *
 * @throws An error if no form step is found or if a return operation is encountered before a form step.
 */
export function initState<
  T,
  U extends Schema,
  V extends Record<string, unknown>,
  W extends Record<string, unknown>,
>(flow: TypedFlow<T, U, V, W>, onYield: TypedOnYield<U>, values: V): State {
  const _flow = flow as Flow;
  const _values = values as Record<string, unknown>;
  const _onYield = onYield as OnYield;
  return _getInitialState(_flow, _values, _onYield);
}

function _getInitialState(
  flow: Flow,
  values: Record<string, unknown>,
  onYield: OnYield,
): State {
  const path = initialPath(flow, values);
  const points = initialPoints(flow, { path, inputs: values }, onYield);
  return { points, values: { type: "list", list: {} } };
}

function initialPath(
  flow: ListFlow,
  values: Record<string, unknown>,
): Position[] {
  const path = initialPathOrNull(flow, values);
  if (path) return path;
  throw new Error("Invalid flow");
}

function initialPathOrNull(
  flow: ScopeFlow,
  values: Record<string, unknown>,
): Position[] | null {
  let position = ControlFlowUtils.into(flow, values);
  while (position) {
    const path = initialPathFromPosition(flow, position, values);
    if (path) return path;
    position = ControlFlowUtils.next(flow, position, values);
  }
  return null;
}

function initialPathFromPosition(
  flow: ScopeFlow,
  position: Position,
  values: Record<string, unknown>,
): Position[] | null {
  const item = ControlFlowUtils.find(flow, [position]);
  if (ControlFlowUtils.is(item)) {
    const path = initialPathOrNull(item, values);
    if (path) return [position, ...path];
    else return null;
  }
  return [position];
}

function initialPoints(
  flow: ListFlow,
  point: Point,
  onYield: OnYield,
): Point[] {
  const points = [];
  let currentPoint: Point | null = point;
  let currentPointValues = point.inputs;
  let currentPointFlow = ControlFlowUtils.find(flow, point.path);
  while (!FormFlowUtils.is(currentPointFlow)) {
    if (ReturnFlowUtils.is(currentPointFlow)) {
      throw new Error("Invalid flow");
    } else if (YieldFlowUtils.is(currentPointFlow)) {
      const listValues = currentPointFlow["yield"]["next"](currentPointValues);
      listValues.forEach((values) => onYield(values));
      points.push(currentPoint);
    } else if (VariablesFlowUtils.is(currentPointFlow)) {
      const variables = currentPointFlow["variables"](currentPointValues);
      currentPointValues = { ...currentPointValues, ...variables };
    }
    currentPoint = nextPoint(flow, {
      path: currentPoint.path,
      inputs: currentPointValues,
    });
    if (!currentPoint) {
      throw new Error("Invalid flow");
    }
    currentPointFlow = ControlFlowUtils.find(flow, currentPoint.path);
  }
  points.push(currentPoint);
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
 * @param flow The `Flow` object representing the multi-step form.
 * @param values An object containing the generated values within the multi-step form.
 * @param onYield A callback function triggered when the multi-step form yields values.
 * @param onReturn A callback function triggered when the multi-step form returns values.
 * @returns The updated state of the multi-step form.
 */
export function nextState<
  T,
  U extends Schema,
  V extends Record<string, unknown>,
  W extends Record<string, unknown>,
>(
  flow: TypedFlow<T, U, V, W>,
  onYield: TypedOnYield<U>,
  onReturn: TypedOnReturn<U>,
  state: State,
  values: Record<string, unknown>,
): State {
  const _flow = flow as Flow;
  const _onYield = onYield as OnYield;
  const _onReturn = onReturn as OnReturn;
  return _getNextState(state, _flow, values, _onYield, _onReturn);
}

function _getNextState(
  state: State,
  flow: Flow,
  values: Record<string, unknown>,
  onYield: OnYield,
  onReturn: OnReturn,
): State {
  const point = state.points[state.points.length - 1];
  const points = advanceForm(flow, point, values, onYield, onReturn);
  const inputs = updateInputs(state, flow, values);
  return { points: [...state.points, ...points], values: inputs };
}

function advanceForm(
  flow: ListFlow,
  point: Point,
  values: Record<string, unknown>,
  onYield: OnYield,
  onReturn: OnReturn,
): Point[] {
  let currentPoint: Point | null = nextPoint(flow, {
    path: point.path,
    inputs: { ...point.inputs, ...values },
  });
  if (!currentPoint) {
    return [];
  }
  const points: Point[] = [];
  let currentPointValues = currentPoint.inputs;
  let currentPointFlow = ControlFlowUtils.find(flow, currentPoint.path);
  while (!FormFlowUtils.is(currentPointFlow)) {
    if (ReturnFlowUtils.is(currentPointFlow)) {
      const values = currentPointFlow["return"](currentPointValues);
      onReturn(values);
      return [];
    } else if (YieldFlowUtils.is(currentPointFlow)) {
      const listValues = currentPointFlow["yield"]["next"](currentPointValues);
      listValues.forEach((values) => onYield(values));
      points.push(currentPoint);
    } else if (VariablesFlowUtils.is(currentPointFlow)) {
      const variables = currentPointFlow["variables"](currentPointValues);
      currentPointValues = { ...currentPointValues, ...variables };
    }
    currentPoint = nextPoint(flow, {
      path: currentPoint.path,
      inputs: currentPointValues,
    });
    if (!currentPoint) {
      return [];
    }
    currentPointFlow = ControlFlowUtils.find(flow, currentPoint.path);
  }
  points.push(currentPoint);
  return points;
}

function nextPoint(flow: ListFlow, point: Point): Point | null {
  const next = nextPointInFlow(flow, point);
  if (next) return next;
  const over = overPoint(point);
  if (over) return nextPoint(flow, over);
  return null;
}

function nextPointInFlow(flow: ListFlow, point: Point): Point | null {
  const next = nextPointInSameFlow(flow, point);
  if (next) {
    const into = nextPointInsideFlow(flow, next);
    if (into) return into;
    return nextPointInFlow(flow, next);
  }
  return null;
}

function nextPointInSameFlow(flow: ListFlow, point: Point): Point | null {
  const path = point.path.slice(0, -1);
  const control = ControlFlowUtils.find(flow, path) as ScopeFlow;
  const current = point.path[point.path.length - 1];
  const next = ControlFlowUtils.next(control, current, point.inputs);
  if (next) {
    return { path: [...path, next], inputs: point.inputs };
  }
  return null;
}

function nextPointInsideFlow(flow: ListFlow, point: Point): Point | null {
  const item = ControlFlowUtils.find(flow, point.path);
  if (ControlFlowUtils.is(item)) {
    const position = ControlFlowUtils.into(item, point.inputs);
    if (position) {
      const path = [...point.path, position];
      const next = { path, inputs: point.inputs };
      const into = nextPointInsideFlow(flow, next);
      if (into) return into;
      return nextPointInFlow(flow, next);
    }
    return null;
  }
  return point;
}

function overPoint(point: Point): Point | null {
  if (point.path.length > 1) {
    return { path: point.path.slice(0, -1), inputs: point.inputs };
  }
  return null;
}

/**
 * Navigates to the previous form step of the multi-step form and returns the updated state.
 * If there is no previous form step, the returned state contains the current form step.
 *
 * @param state The current state of the multi-step form.
 * @param flow The `Flow` object representing the multi-step form.
 * @param values An object containing the generated values within the multi-step form.
 * @returns The updated state of the multi-step form.
 */
export function prevState<
  T,
  U extends Schema,
  V extends Record<string, unknown>,
  W extends Record<string, unknown>,
>(
  flow: TypedFlow<T, U, V, W>,
  onYield: TypedOnYield<U>,
  state: State,
  values: Record<string, unknown>,
): State {
  const _flow = flow as Flow;
  const _onYield = onYield as OnYield;
  return _getPreviousState(state, _flow, values, _onYield);
}

function _getPreviousState(
  state: State,
  flow: Flow,
  values: Record<string, unknown>,
  onYield: OnYield,
): State {
  const points = state.points.slice(0, -1);
  while (points.length > 0) {
    const currentPoint = points[points.length - 1];
    const currentPointFlow = ControlFlowUtils.find(flow, currentPoint.path);
    if (FormFlowUtils.is(currentPointFlow)) {
      const inputs = updateInputs(state, flow, values);
      return { points, values: inputs };
    }
    if (YieldFlowUtils.is(currentPointFlow)) {
      const listValues = currentPointFlow["yield"]["back"](currentPoint.inputs);
      listValues.forEach((values) => onYield(values));
    }
    points.pop();
  }
  const inputs = updateInputs(state, flow, values);
  return { points: state.points, values: inputs };
}

function updateInputs(
  state: State,
  flow: Flow,
  values: Record<string, unknown>,
): Values {
  const point = state.points[state.points.length - 1];
  const formFlow = ControlFlowUtils.find(flow, point.path) as FormFlow;
  const formValues = formFlow["form"]["values"](point.inputs);
  let inputs: ScopeValues = state.values;
  for (const [name, value] of Object.entries(values)) {
    if (name in formValues) {
      const keys = formValues[name][1];
      const path = point.path;
      inputs = FlowInputsUtils.set(inputs, path, name, keys, value);
    }
  }
  return inputs as Values;
}
