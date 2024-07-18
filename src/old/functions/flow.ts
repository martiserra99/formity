import { expry, Variables } from 'expry';

import {
  Position,
  ListPosition,
  CondPosition,
  LoopPosition,
} from '../types/position';

import {
  UnitSchema,
  FlowSchema,
  ListSchema,
  CondSchema,
  LoopSchema,
} from '../types/schema';

const listUtils = (flow: ListSchema) => ({
  navigateNext(position: Position): Position | null {
    const [_, index] = position as ListPosition;
    if (index < flow.length - 1) return ['list', index + 1];
    return null;
  },
  navigateInto(): Position | null {
    if (flow.length > 0) return ['list', 0];
    return null;
  },
  getChild(position: Position): UnitSchema {
    const [_, index] = position as ListPosition;
    return flow[index];
  },
});

const condUtils = (flow: CondSchema) => ({
  navigateNext(position: Position): Position | null {
    const [_, [branch, index]] = position as CondPosition;
    if (index < flow.cond[branch].length - 1) {
      return ['cond', [branch, index + 1]];
    }
    return null;
  },
  navigateInto(vars: Variables): Position | null {
    if (expry(flow.cond.if, vars)) {
      if (flow.cond.then.length > 0) {
        return ['cond', ['then', 0]];
      }
    } else {
      if (flow.cond.else.length > 0) {
        return ['cond', ['else', 0]];
      }
    }
    return null;
  },
  getChild(position: Position): UnitSchema {
    const [_, [branch, index]] = position as CondPosition;
    return flow.cond[branch][index];
  },
});

const loopUtils = (flow: LoopSchema) => ({
  navigateNext(position: Position, vars: Variables): Position | null {
    const [_, index] = position as LoopPosition;
    if (index < flow.loop.do.length - 1) return ['loop', index + 1];
    if (expry(flow.loop.while, vars)) return ['loop', 0];
    return null;
  },
  navigateInto(vars: Variables): Position | null {
    if (expry(flow.loop.while, vars)) {
      if (flow.loop.do.length > 0) return ['loop', 0];
    }
    return null;
  },
  getChild(position: Position): UnitSchema {
    const [_, index] = position as LoopPosition;
    return flow.loop.do[index];
  },
});

function flowUtils(flow: FlowSchema) {
  if (Array.isArray(flow)) return listUtils(flow);
  if ('cond' in flow) return condUtils(flow);
  if ('loop' in flow) return loopUtils(flow);
  throw new Error('Invalid flow schema');
}

export function navigateNext(
  flow: FlowSchema,
  position: Position,
  vars: Variables
) {
  return flowUtils(flow).navigateNext(position, vars);
}

export function navigateInto(flow: FlowSchema, vars: Variables) {
  return flowUtils(flow).navigateInto(vars);
}

export function getChild(flow: FlowSchema, position: Position) {
  return flowUtils(flow).getChild(position);
}
