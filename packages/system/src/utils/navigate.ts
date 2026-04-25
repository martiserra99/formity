import type { Flow, NestFlow } from "../types/flow/plain";
import type { ListFlow, FormFlow } from "../types/flow/plain";

import type { OnYield, OnReturn } from "../types/handlers/plain";

import type { State } from "../types/state/state";
import type { Point } from "../types/state/point";
import type { Position } from "../types/state/position";
import type { Values, NestValues } from "../types/state/values";

import * as NestFlowUtils from "./flow/nest";
import * as FormFlowUtils from "./flow/form";
import * as YieldFlowUtils from "./flow/yield";
import * as ReturnFlowUtils from "./flow/return";
import * as VariablesFlowUtils from "./flow/variables";

import * as FlowInputsUtils from "./values/nest";

export function initState(options: {
  flow: Flow;
  onYield: OnYield;
  inputs: Record<string, unknown>;
}): State {
  const { flow, onYield, inputs } = options;
  const path = initialPath(flow, inputs);
  const points = initialPoints(flow, { path, inputs }, onYield);
  return { points, values: { type: "list", list: {} } };
}

function initialPath(
  flow: ListFlow,
  inputs: Record<string, unknown>,
): Position[] {
  const path = initialPathOrNull(flow, inputs);
  if (path) return path;
  throw new Error("Invalid flow");
}

function initialPathOrNull(
  flow: NestFlow,
  inputs: Record<string, unknown>,
): Position[] | null {
  let position = NestFlowUtils.into(flow, inputs);
  while (position) {
    const path = initialPathFromPosition(flow, position, inputs);
    if (path) return path;
    position = NestFlowUtils.next(flow, position, inputs);
  }
  return null;
}

function initialPathFromPosition(
  flow: NestFlow,
  position: Position,
  inputs: Record<string, unknown>,
): Position[] | null {
  const item = NestFlowUtils.find(flow, [position]);
  if (NestFlowUtils.is(item)) {
    const path = initialPathOrNull(item, inputs);
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
  let currentPointInputs = point.inputs;
  let currentPointFlow = NestFlowUtils.find(flow, point.path);
  while (!FormFlowUtils.is(currentPointFlow)) {
    if (ReturnFlowUtils.is(currentPointFlow)) {
      throw new Error("Invalid flow");
    } else if (YieldFlowUtils.is(currentPointFlow)) {
      const listValues = currentPointFlow["yield"]["next"](currentPointInputs);
      listValues.forEach((values) => onYield(values));
      points.push(currentPoint);
    } else if (VariablesFlowUtils.is(currentPointFlow)) {
      const variables = currentPointFlow["variables"](currentPointInputs);
      currentPointInputs = { ...currentPointInputs, ...variables };
    }
    currentPoint = nextPoint(flow, {
      path: currentPoint.path,
      inputs: currentPointInputs,
    });
    if (!currentPoint) {
      throw new Error("Invalid flow");
    }
    currentPointFlow = NestFlowUtils.find(flow, currentPoint.path);
  }
  points.push(currentPoint);
  return points;
}

export function nextState(options: {
  flow: Flow;
  onYield: OnYield;
  onReturn: OnReturn;
  state: State;
  values: Record<string, unknown>;
}): State {
  const { flow, onYield, onReturn, state, values } = options;
  const point = state.points[state.points.length - 1];
  const points = advanceForm(flow, onYield, onReturn, point, values);
  const stateValues = updateStateValues(flow, state, values);
  return { points: [...state.points, ...points], values: stateValues };
}

function advanceForm(
  flow: ListFlow,
  onYield: OnYield,
  onReturn: OnReturn,
  point: Point,
  inputs: Record<string, unknown>,
): Point[] {
  let currentPoint: Point | null = nextPoint(flow, {
    path: point.path,
    inputs: { ...point.inputs, ...inputs },
  });
  if (!currentPoint) {
    return [];
  }
  const points: Point[] = [];
  let currentPointInputs = currentPoint.inputs;
  let currentPointFlow = NestFlowUtils.find(flow, currentPoint.path);
  while (!FormFlowUtils.is(currentPointFlow)) {
    if (ReturnFlowUtils.is(currentPointFlow)) {
      const values = currentPointFlow["return"](currentPointInputs);
      onReturn(values);
      return [];
    } else if (YieldFlowUtils.is(currentPointFlow)) {
      const listValues = currentPointFlow["yield"]["next"](currentPointInputs);
      listValues.forEach((values) => onYield(values));
      points.push(currentPoint);
    } else if (VariablesFlowUtils.is(currentPointFlow)) {
      const variables = currentPointFlow["variables"](currentPointInputs);
      currentPointInputs = { ...currentPointInputs, ...variables };
    }
    currentPoint = nextPoint(flow, {
      path: currentPoint.path,
      inputs: currentPointInputs,
    });
    if (!currentPoint) {
      return [];
    }
    currentPointFlow = NestFlowUtils.find(flow, currentPoint.path);
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
  const nest = NestFlowUtils.find(flow, path) as NestFlow;
  const current = point.path[point.path.length - 1];
  const next = NestFlowUtils.next(nest, current, point.inputs);
  if (next) {
    return { path: [...path, next], inputs: point.inputs };
  }
  return null;
}

function nextPointInsideFlow(flow: ListFlow, point: Point): Point | null {
  const item = NestFlowUtils.find(flow, point.path);
  if (NestFlowUtils.is(item)) {
    const position = NestFlowUtils.into(item, point.inputs);
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

export function prevState(options: {
  flow: Flow;
  onYield: OnYield;
  state: State;
  values: Record<string, unknown>;
}): State {
  const { flow, onYield, state, values } = options;
  const points = state.points.slice(0, -1);
  while (points.length > 0) {
    const currentPoint = points[points.length - 1];
    const currentPointFlow = NestFlowUtils.find(flow, currentPoint.path);
    if (FormFlowUtils.is(currentPointFlow)) {
      const stateValues = updateStateValues(flow, state, values);
      return { points, values: stateValues };
    }
    if (YieldFlowUtils.is(currentPointFlow)) {
      const listValues = currentPointFlow["yield"]["back"](currentPoint.inputs);
      listValues.forEach((values) => onYield(values));
    }
    points.pop();
  }
  const stateValues = updateStateValues(flow, state, values);
  return { points: state.points, values: stateValues };
}

function updateStateValues(
  flow: Flow,
  state: State,
  values: Record<string, unknown>,
): Values {
  const point = state.points[state.points.length - 1];
  const path = point.path;
  const formFlow = NestFlowUtils.find(flow, point.path) as FormFlow;
  const formValues = formFlow["form"]["values"](point.inputs);
  let stateValues: NestValues = state.values;
  for (const [name, value] of Object.entries(values)) {
    if (name in formValues) {
      const keys = formValues[name][1];
      stateValues = FlowInputsUtils.set(stateValues, path, name, keys, value);
    }
  }
  return stateValues as Values;
}
