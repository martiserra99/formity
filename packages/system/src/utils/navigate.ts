import type { Flow, NestFlow } from "../types/flow/plain";
import type { ListFlow, FormFlow } from "../types/flow/plain";

import type { OnYield, OnReturn } from "../types/handlers/plain";

import type { State } from "../types/state/state";
import type { Point } from "../types/state/point";
import type { Position } from "../types/state/position";
import type { Memory, NestMemory } from "../types/state/memory";

import * as NestFlowUtils from "./flow/nest";
import * as FormFlowUtils from "./flow/form";
import * as YieldFlowUtils from "./flow/yield";
import * as ReturnFlowUtils from "./flow/return";
import * as VariablesFlowUtils from "./flow/variables";

import * as NestMemoryUtils from "./memory/nest";

export function initState(options: {
  flow: Flow;
  onYield: OnYield;
  inputs: Record<string, unknown>;
  history: boolean;
}): State {
  const { flow, onYield, inputs, history } = options;
  const path = initialPath(flow, inputs);
  const points = initialPoints(flow, { path, values: inputs }, onYield);
  if (history) {
    return {
      points,
      memory: { type: "list", list: {} },
    };
  } else {
    return {
      points: [points[points.length - 1]],
      memory: { type: "list", list: {} },
    };
  }
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
  let currentPointValues = point.values;
  let currentPointFlow = NestFlowUtils.find(flow, point.path);
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
      values: currentPointValues,
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
  fields: Record<string, unknown>;
  history: boolean;
}): State {
  const { flow, onYield, onReturn, state, fields, history } = options;
  const point = state.points[state.points.length - 1];
  const array = advanceForm(flow, onYield, onReturn, point, fields);
  const points: Point[] = [...state.points, ...array];
  const memory = updateMemory(flow, state, fields);
  if (history) {
    return { points, memory };
  } else {
    return { points: [points[points.length - 1]], memory };
  }
}

function advanceForm(
  flow: ListFlow,
  onYield: OnYield,
  onReturn: OnReturn,
  point: Point,
  fields: Record<string, unknown>,
): Point[] {
  let currentPoint: Point | null = nextPoint(flow, {
    path: point.path,
    values: { ...point.values, ...fields },
  });
  if (!currentPoint) {
    return [];
  }
  const points: Point[] = [];
  let currentPointValues = currentPoint.values;
  let currentPointFlow = NestFlowUtils.find(flow, currentPoint.path);
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
      values: currentPointValues,
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
  const next = NestFlowUtils.next(nest, current, point.values);
  if (next) {
    return { path: [...path, next], values: point.values };
  }
  return null;
}

function nextPointInsideFlow(flow: ListFlow, point: Point): Point | null {
  const item = NestFlowUtils.find(flow, point.path);
  if (NestFlowUtils.is(item)) {
    const position = NestFlowUtils.into(item, point.values);
    if (position) {
      const path: Position[] = [...point.path, position];
      const next: Point = { path, values: point.values };
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
    return { path: point.path.slice(0, -1), values: point.values };
  }
  return null;
}

export function prevState(options: {
  flow: Flow;
  onYield: OnYield;
  state: State;
  fields: Record<string, unknown>;
}): State {
  const { flow, onYield, state, fields } = options;
  const points = state.points.slice(0, -1);
  while (points.length > 0) {
    const currentPoint = points[points.length - 1];
    const currentPointFlow = NestFlowUtils.find(flow, currentPoint.path);
    if (FormFlowUtils.is(currentPointFlow)) {
      const memory = updateMemory(flow, state, fields);
      return { points, memory };
    }
    if (YieldFlowUtils.is(currentPointFlow)) {
      const listValues = currentPointFlow["yield"]["back"](currentPoint.values);
      listValues.forEach((values) => onYield(values));
    }
    points.pop();
  }
  const memory = updateMemory(flow, state, fields);
  return { points: state.points, memory };
}

export function jumpState(options: {
  flow: Flow;
  state: State;
  fields: Record<string, unknown>;
  history: boolean;
  id: string;
}): State {
  const { flow, state, fields, history, id } = options;
  const point = state.points[state.points.length - 1];
  const array = jumpToForm(flow, point, fields, id);
  const points: Point[] = [...state.points, ...array];
  const memory = updateMemory(flow, state, fields);
  if (history) {
    return { points, memory };
  } else {
    return { points: [points[points.length - 1]], memory };
  }
}

function jumpToForm(
  flow: Flow,
  point: Point,
  fields: Record<string, unknown>,
  id: string,
): Point[] {
  const path = NestFlowUtils.jump(flow, id);
  if (path) {
    return [{ path, values: { ...point.values, ...fields } }];
  } else {
    return [];
  }
}

function updateMemory(
  flow: Flow,
  state: State,
  fields: Record<string, unknown>,
): Memory {
  const point = state.points[state.points.length - 1];
  const path = point.path;
  const formFlow = NestFlowUtils.find(flow, point.path) as FormFlow;
  const formFields = formFlow["form"]["fields"](point.values);
  let memory: NestMemory = state.memory;
  for (const [name, value] of Object.entries(fields)) {
    if (name in formFields) {
      const keys = formFields[name][1];
      memory = NestMemoryUtils.set(memory, path, name, keys, value);
    }
  }
  return memory as Memory;
}
