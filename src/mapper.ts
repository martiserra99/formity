import { expry, Expry } from 'expry';

import { Spot, ListSpot, CondSpot, LoopSpot } from './core/types/spot';

import {
  FlowSchema,
  ListSchema,
  CondSchema,
  LoopSchema,
  Schema,
} from './core/types/schema';

type Vars = Record<string, Expry>;

const listUtils = (flow: ListSchema) => ({
  navigateNext(spot: Spot): Spot | null {
    const [_, index] = spot as ListSpot;
    if (index < flow.length - 1) return ['list', index + 1];
    return null;
  },
  navigateInto(): Spot | null {
    if (flow.length > 0) return ['list', 0];
    return null;
  },
  getChild(spot: Spot): Schema {
    const [_, index] = spot as ListSpot;
    return flow[index];
  },
});

const condUtils = (flow: CondSchema) => ({
  navigateNext(spot: Spot): Spot | null {
    const [_, [branch, index]] = spot as CondSpot;
    if (index < flow.cond[branch].length - 1) {
      return ['cond', [branch, index + 1]];
    }
    return null;
  },
  navigateInto(vars: Vars): Spot | null {
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
  getChild(spot: Spot): Schema {
    const [_, [branch, index]] = spot as CondSpot;
    return flow.cond[branch][index];
  },
});

const loopUtils = (flow: LoopSchema) => ({
  navigateNext(spot: Spot, vars: Vars): Spot | null {
    const [_, index] = spot as LoopSpot;
    if (index < flow.loop.do.length - 1) return ['loop', index + 1];
    if (expry(flow.loop.while, vars)) return ['loop', 0];
    return null;
  },
  navigateInto(vars: Vars): Spot | null {
    if (expry(flow.loop.while, vars)) {
      if (flow.loop.do.length > 0) return ['loop', 0];
    }
    return null;
  },
  getChild(spot: Spot): Schema {
    const [_, index] = spot as LoopSpot;
    return flow.loop.do[index];
  },
});

function flowUtils(flow: FlowSchema) {
  if (Array.isArray(flow)) return listUtils(flow);
  if ('cond' in flow) return condUtils(flow);
  if ('loop' in flow) return loopUtils(flow);
  throw new Error('Invalid flow schema');
}

export function navigateNext(flow: FlowSchema, spot: Spot, vars: Vars) {
  return flowUtils(flow).navigateNext(spot, vars);
}

export function navigateInto(flow: FlowSchema, vars: Vars) {
  return flowUtils(flow).navigateInto(vars);
}

export function getChild(flow: FlowSchema, spot: Spot) {
  return flowUtils(flow).getChild(spot);
}
